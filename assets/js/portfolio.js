(() => {
  const shell = document.querySelector('.portfolio-shell');
  const themeButtons = document.querySelectorAll('.theme-btn');

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
  const githubUser = shell ? shell.dataset.githubUser : null;

  function updateGithub(set, theme, palette) {
    if (!githubUser) return;
    const hex = (color) => color.replace('#', '');
    const ink = theme === 'dark' ? 'e6ecf3' : '2e3640';
    const dim = theme === 'dark' ? '98a5b3' : '5b6674';
    const graph = document.getElementById('gh-graph');
    const stats = document.getElementById('gh-stats-img');
    const streak = document.getElementById('gh-streak-img');

    if (graph) {
      graph.src = `https://ghchart.rshah.org/${hex(set.light.deep)}/${githubUser}`;
    }
    if (stats) {
      stats.src = `https://github-readme-stats.vercel.app/api?username=${githubUser}&show_icons=true&hide_border=true&bg_color=00000000&title_color=${hex(palette.deep)}&text_color=${ink}&icon_color=${hex(palette.blue)}&ring_color=${hex(palette.deep)}`;
    }
    if (streak) {
      streak.src = `https://streak-stats.demolab.com?user=${githubUser}&hide_border=true&background=00000000&ring=${hex(palette.deep)}&fire=${hex(palette.deep)}&currStreakLabel=${hex(palette.deep)}&sideLabels=${ink}&currStreakNum=${ink}&sideNums=${ink}&dates=${dim}`;
    }
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('pf-theme', theme);
    themeButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.theme === theme);
    });

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
    updateGithub(set, theme, palette);
  }

  if (themeButtons.length) {
    themeButtons.forEach((button) => {
      button.addEventListener('click', () => applyTheme(button.dataset.theme));
    });
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }

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

  const sbToggle = document.querySelector('.sb-toggle');
  if (sbToggle) {
    // transform된 aside 밖으로 이동 — fixed 포지셔닝이 부모 transform에 영향받지 않도록
    document.body.appendChild(sbToggle);
    const SB_KEY = 'pf-sidebar-collapsed';
    if (localStorage.getItem(SB_KEY) === '1') {
      document.body.classList.add('sidebar-collapsed');
    }
    sbToggle.addEventListener('click', () => {
      const collapsed = document.body.classList.toggle('sidebar-collapsed');
      localStorage.setItem(SB_KEY, collapsed ? '1' : '0');
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sb-nav a');
  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach((section) => navObserver.observe(section));
  }
})();
