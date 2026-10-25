(() => {
  const shell = document.querySelector('.portfolio-shell');
  const themeToggle = document.querySelector('[data-theme-toggle]');

  const palettes = {
    '#a9cdec': {
      light: { blue: '#a9cdec', deep: '#4d7ca8', soft: '#e3eefa', hair: '#d2e3f2', block: '#c6ddf2', canvas: '#f7fafd', card: '#ffffff' },
      dark: { blue: '#7fa8cd', deep: '#9cc3e8', soft: '#1f2a36', hair: '#2a3744', block: '#22303e', canvas: '#11161c', card: '#181f27' }
    },
    '#b3b8e8': {
      light: { blue: '#b3b8e8', deep: '#5d63a8', soft: '#e8e9f8', hair: '#d8daf0', block: '#cdd1f1', canvas: '#f8f8fd', card: '#ffffff' },
      dark: { blue: '#8b90cf', deep: '#aeb4ef', soft: '#232637', hair: '#2f3247', block: '#282b41', canvas: '#13141b', card: '#1a1b27' }
    },
    '#9fd4cd': {
      light: { blue: '#9fd4cd', deep: '#48887f', soft: '#e0f1ef', hair: '#cfe6e3', block: '#c3e6e1', canvas: '#f6fbfa', card: '#ffffff' },
      dark: { blue: '#76aaa3', deep: '#a6dad2', soft: '#1d2c29', hair: '#293c38', block: '#213430', canvas: '#0f1715', card: '#161f1d' }
    }
  };

  const accent = shell ? (shell.dataset.accent || '#a9cdec') : '#a9cdec';
  const canvasTone = shell ? (shell.dataset.canvasTone || 'pale') : 'pale';

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('pf-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('title', theme === 'dark' ? '화이트 테마로 바꾸기' : '다크 테마로 바꾸기');
    }

    const set = palettes[accent] || palettes['#a9cdec'];
    const palette = set[theme];
    const style = document.body.style;
    style.setProperty('--blue', palette.blue);
    style.setProperty('--blue-deep', palette.deep);
    style.setProperty('--blue-soft', palette.soft);
    style.setProperty('--blue-hair', palette.hair);
    style.setProperty('--blue-block', palette.block);
    style.setProperty('--card', palette.card);
    style.setProperty('--canvas', theme === 'light' && canvasTone === 'white' ? '#ffffff' : palette.canvas);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  }
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

  if (shell) {
    document.querySelectorAll('.stack img').forEach((img) => {
      img.addEventListener('error', () => img.remove());
    });
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
  }

  // Projects 하위 메뉴는 CSS가 hover/focus를 맡고, 여기서는 터치와 Escape만 처리한다.
  const navGroup = document.querySelector('[data-topnav-group]');
  if (navGroup) {
    const trigger = navGroup.querySelector('[data-topnav-trigger]');
    const setOpen = (open) => {
      navGroup.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    };
    navGroup.addEventListener('mouseenter', () => trigger.setAttribute('aria-expanded', 'true'));
    navGroup.addEventListener('mouseleave', () => setOpen(false));
    trigger.addEventListener('click', (event) => {
      // 터치에서는 첫 탭으로 메뉴를 열고, 두 번째 탭에서 Projects 구역으로 이동한다.
      if (!window.matchMedia('(hover: none)').matches) return;
      if (!navGroup.classList.contains('is-open')) {
        event.preventDefault();
        setOpen(true);
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });
    document.addEventListener('click', (event) => {
      if (!navGroup.contains(event.target)) setOpen(false);
    });
  }

  const navLinks = [...document.querySelectorAll('.topnav-bar .topnav-link')];
  const navIds = navLinks.map((link) => (link.getAttribute('href') || '').split('#')[1]).filter(Boolean);
  // 내비에 있는 구역만 따진다. 그 아래 구역(GitHub·Experience…)을 보는 동안에는
  // 바로 위 내비 항목이 선택된 채로 남는다.
  const sections = [...document.querySelectorAll('section[id]')].filter((section) => navIds.includes(section.id));
  if (sections.length && navLinks.length) {
    // 상단 바 바로 아래(120px)를 기준선으로 두고, 그 선을 지난 마지막 구역을 현재 위치로 본다.
    const LINE = 120;
    let last = '';
    const sync = () => {
      let current = sections[0];
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= LINE) current = section;
      });
      if (current.id === last) return;
      last = current.id;
      navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        link.classList.toggle('active', href.endsWith(`#${current.id}`));
      });
    };
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }
})();
