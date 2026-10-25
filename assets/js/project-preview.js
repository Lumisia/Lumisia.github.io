(() => {
  // Keep the detail links usable when dialogs or JavaScript are unavailable.
  if (typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;

  document.querySelectorAll('.project-preview').forEach((dialog) => {
    const trigger = document.querySelector(`[data-project-open="${dialog.id}"]`);
    if (!trigger) return;
    const summary = dialog.querySelector('[data-preview-summary]');
    const gallery = dialog.querySelector('[data-preview-gallery]');
    const tabs = [...dialog.querySelectorAll('[role="tab"]')];
    const panels = [...dialog.querySelectorAll('[role="tabpanel"]')];
    const slides = [...dialog.querySelectorAll('[data-gallery-slide]')];
    const pickers = [...dialog.querySelectorAll('[data-gallery-index]')];
    const galleryOpen = dialog.querySelector('[data-gallery-open]');
    const galleryBack = dialog.querySelector('[data-gallery-back]');
    let slideIndex = 0;
    let summaryScroll = 0;

    function selectTab(index, focus = false) {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      if (focus) tabs[index].focus();
    }

    function selectSlide(index) {
      slideIndex = Math.max(0, Math.min(index, slides.length - 1));
      slides.forEach((slide, i) => {
        slide.hidden = i !== slideIndex;
        if (i === slideIndex) {
          const image = slide.querySelector('[data-gallery-image]');
          if (!image.getAttribute('src')) image.src = image.dataset.src;
        }
      });
      pickers.forEach((picker, i) => picker.setAttribute('aria-pressed', String(i === slideIndex)));
      const caption = dialog.querySelector('[data-gallery-caption]');
      if (caption) caption.textContent = slides[slideIndex].dataset.caption || '';
      dialog.querySelector('[data-gallery-prev]').disabled = slideIndex === 0;
      dialog.querySelector('[data-gallery-next]').disabled = slideIndex === slides.length - 1;
    }

    function showSummary(focus = false) {
      if (gallery) gallery.hidden = true;
      summary.hidden = false;
      dialog.setAttribute('aria-labelledby', `${dialog.id}-title`);
      dialog.classList.remove('is-gallery');
      if (focus && galleryOpen) {
        galleryOpen.focus({ preventScroll: true });
        dialog.scrollTop = summaryScroll;
      }
    }

    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', dialog.id);
    trigger.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      showSummary();
      selectTab(0);
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add('preview-open');
    });

    dialog.querySelector('[data-preview-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      document.body.classList.remove('preview-open');
      trigger.focus({ preventScroll: true });
    });
    // A click on the backdrop closes the dialog; dragging from its contents does not.
    let startedOnBackdrop = false;
    const outside = (event) => {
      const rect = dialog.getBoundingClientRect();
      return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    };
    dialog.addEventListener('pointerdown', (event) => {
      startedOnBackdrop = event.target === dialog && outside(event);
    });
    dialog.addEventListener('click', (event) => {
      if (startedOnBackdrop && event.target === dialog && outside(event)) dialog.close();
      startedOnBackdrop = false;
    });
    dialog.addEventListener('cancel', (event) => {
      if (gallery && !gallery.hidden) {
        event.preventDefault();
        showSummary(true);
      }
    });

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(index));
      tab.addEventListener('keydown', (event) => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          selectTab(next, true);
        }
      });
    });

    if (!gallery) return;
    galleryOpen.addEventListener('click', () => {
      summaryScroll = dialog.scrollTop;
      summary.hidden = true;
      gallery.hidden = false;
      dialog.classList.add('is-gallery');
      dialog.setAttribute('aria-labelledby', `${dialog.id}-gallery-title`);
      selectSlide(0);
      dialog.scrollTop = 0;
      galleryBack.focus({ preventScroll: true });
    });
    galleryBack.addEventListener('click', () => showSummary(true));
    dialog.querySelector('[data-gallery-prev]').addEventListener('click', () => selectSlide(slideIndex - 1));
    dialog.querySelector('[data-gallery-next]').addEventListener('click', () => selectSlide(slideIndex + 1));
    pickers.forEach((picker, index) => picker.addEventListener('click', () => selectSlide(index)));
    gallery.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      selectSlide(slideIndex + (event.key === 'ArrowRight' ? 1 : -1));
      if (event.target.closest('[data-gallery-index]')) {
        pickers[slideIndex].focus({ preventScroll: true });
      }
    });
  });
})();
