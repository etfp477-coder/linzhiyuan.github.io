/* ============================================================
   main.js · 个人主页共享脚本
   功能：
     1. 汉堡菜单开合（移动端导航）
     2. 当前 section 导航高亮（IntersectionObserver）
     3. 回到顶部按钮：滚动显示 / 点击平滑回顶
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. 汉堡菜单 ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('siteNav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hamburger.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
    });

    // 点击导航链接后自动收起菜单（移动端）
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. 当前 section 导航高亮 ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.site-nav .nav-link');

  if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(function (link) {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === '#' + id
              );
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }  // 视口中间一段判定当前 section
    );

    sections.forEach(function (sec) { observer.observe(sec); });
  }

  /* ---------- 3. 回到顶部 ---------- */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    // 滚动超过 400px 才显示按钮
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
