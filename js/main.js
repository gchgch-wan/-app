/* ============================================================
   FitPro - 主要 JavaScript 交互逻辑
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- DOM 缓存 ---
  const header = document.getElementById('header');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  const coursesGrid = document.getElementById('courses-grid');
  const filterBtns = document.querySelectorAll('.filter__btn');

  const billingToggle = document.getElementById('billing-toggle');
  const priceAmounts = document.querySelectorAll('.price__amount');
  const toggleLabels = document.querySelectorAll('.toggle__label');

  const faqQuestions = document.querySelectorAll('.faq__question');

  const countdownEl = document.getElementById('countdown');

  /* ============================================================
     1. 移动端菜单
     ============================================================ */
  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    navToggle.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');

    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-label', '打开菜单');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  /* ============================================================
     2. 课程筛选
     ============================================================ */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.dataset.filter;
      const cards = coursesGrid.querySelectorAll('.course-card');

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category.includes(filter)) {
          card.style.display = '';
          // Add entrance animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = '';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ============================================================
     3. 价格切换（月付 ↔ 年付）
     ============================================================ */
  let isYearly = false;

  billingToggle.addEventListener('click', function () {
    isYearly = !isYearly;
    this.setAttribute('aria-pressed', isYearly);

    // Update toggle labels
    toggleLabels.forEach(label => label.classList.toggle('active'));

    // Animate price change
    priceAmounts.forEach(el => {
      const monthPrice = el.dataset.month;
      const yearPrice = el.dataset.year;
      const targetPrice = isYearly ? yearPrice : monthPrice;

      // Simple count-up/down animation
      animatePrice(el, targetPrice);
    });
  });

  function animatePrice(el, target) {
    const start = parseInt(el.textContent) || 0;
    const end = parseInt(target);
    if (start === end) return;

    const duration = 400;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  /* ============================================================
     4. FAQ 手风琴
     ============================================================ */
  faqQuestions.forEach(question => {
    question.addEventListener('click', function () {
      const isOpen = this.getAttribute('aria-expanded') === 'true';

      // Close all
      faqQuestions.forEach(q => q.setAttribute('aria-expanded', 'false'));

      // Open clicked (if it wasn't already open)
      if (!isOpen) {
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ============================================================
     5. 倒计时器
     ============================================================ */
  function updateCountdown() {
    // Set countdown end: 3 days from page load
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + 3);
    endTime.setHours(23, 59, 59, 999);

    function tick() {
      const now = new Date();
      const diff = endTime - now;

      if (diff <= 0 && countdownEl) {
        countdownEl.textContent = '00天 00时 00分 00秒';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = n => String(n).padStart(2, '0');

      if (countdownEl) {
        countdownEl.textContent = `${pad(days)}天 ${pad(hours)}时 ${pad(minutes)}分 ${pad(seconds)}秒`;
      }
    }

    tick();
    setInterval(tick, 1000);
  }

  if (countdownEl) {
    updateCountdown();
  }

  /* ============================================================
     6. 导航栏滚动效果
     ============================================================ */
  let lastScrollY = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    // Header shadow on scroll
    if (scrollY > 50) {
      header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      header.style.boxShadow = '';
    }

    // Update active nav link based on scroll position
    let currentSection = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (scrollY >= top) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ============================================================
     7. 滚动渐入动画（Intersection Observer）
     ============================================================ */
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and sections
  const animatableElements = document.querySelectorAll(
    '.course-card, .transform-card, .pricing-card, .testimonial-card, .learning__step'
  );

  animatableElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  /* ============================================================
     8. 平滑滚动（针对动态链接）
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================================
     9. 键盘无障碍
     ============================================================ */
  document.addEventListener('keydown', function (e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-label', '打开菜单');
      navToggle.focus();
    }
  });

  console.log('💪 FitPro 网站已就绪！');
  console.log('   - 移动端菜单 ✓');
  console.log('   - 课程筛选 ✓');
  console.log('   - 价格切换 ✓');
  console.log('   - FAQ手风琴 ✓');
  console.log('   - 倒计时 ✓');
  console.log('   - 滚动动画 ✓');
});
