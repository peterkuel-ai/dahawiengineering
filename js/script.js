document.addEventListener("DOMContentLoaded", () => {
    const revealSelectors = [
        'section',
        'header',
        '.featured-item',
        '.services-item',
        '.about-left',
        '.about-right',
        '.purpose-card',
        '.value-card',
        '.test-item',
        '.blog-item',
        '.contact-card',
        '.contact-left',
        '.contact-right',
        '.faq-item',
        '.facts-item',
        '.footer-item',
        '.title-wrap',
        '.hero-actions',
        '.contact-cta'
    ];

    const revealTargets = Array.from(new Set(
        revealSelectors.flatMap(selector => Array.from(document.querySelectorAll(selector)))
    ));

    revealTargets.forEach((item, index) => {
        const bounds = item.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const screenQuarter = window.innerWidth * 0.25;

        if (item.tagName === 'HEADER' || item.tagName === 'SECTION') {
            item.classList.add('reveal-up');
        } else if (centerX < screenQuarter) {
            item.classList.add('reveal-left');
        } else if (centerX > window.innerWidth - screenQuarter) {
            item.classList.add('reveal-right');
        } else {
            item.classList.add('reveal-up');
        }

        item.style.setProperty('--reveal-delay', `${Math.min(index * 35, 280)}ms`);
        item.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -90px 0px'
    });

    document.querySelectorAll('.reveal').forEach(item => observer.observe(item));

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const revealFallback = () => {
        document.querySelectorAll('.reveal:not(.active)').forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight - 120 && rect.bottom > 0) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealFallback, { passive: true });
    revealFallback();
});
const navbarDiv = document.querySelector('.navbar');
const navbarCollapseDiv = document.getElementById('navbar-collapse');
const navbarShowBtn = document.getElementById('navbar-show-btn');
const navbarCloseBtn = document.getElementById('navbar-close-btn');
const themeToggle = document.getElementById('theme-toggle');
const languageToggle = document.getElementById('language-toggle');

const translations = {
  en: {
    documentTitle: 'Dahawi Engineering | Electrical Infrastructure Specialists',
    common: {
      'a[href="index.html"]': 'Home',
      'a[href="about.html"]': 'About Us',
      'a[href="gallery.html"]': 'Services',
      'a[href="blog.html"]': 'Portfolio',
      'a[href="faq.html"]': 'FAQ',
      'a[href="contact.html"]': 'Contact',
      '.footer-row .footer-item a[href="index.html"]': 'Home',
      '.footer-row .footer-item a[href="about.html"]': 'About',
      '.footer-row .footer-item a[href="gallery.html"]': 'Gallery',
      '.footer-row .footer-item a[href="blog.html"]': 'Blog',
      '.footer-row .footer-item a[href="contact.html"]': 'Contact',
      '#theme-toggle span': 'Dark Mode',
      '#language-toggle span': 'العربية',
      '.subscribe-form h2': 'Contact Directly',
      '.footer-bottom p:nth-child(1)': '© 2026 Dahawi Engineering. All rights reserved.',
      '.footer-bottom p:nth-child(2)': 'Your partner in electrical infrastructure excellence'
    },
    'index.html': {
      documentTitle: 'Dahawi Engineering | Electrical Infrastructure Specialists',
      'header .header-title h1': 'Dahawi Engineering Co. Ltd',
      'header .header-title p': 'Specialists in electrical infrastructure execution, distribution substation construction, network operation, and maintenance for reliable energy systems.',
      '.hero-actions a.btn': 'Contact Us',
      '.hero-actions a.btn-outline': 'Learn More',
      '#featured .sm-title': 'integrated support for power infrastructure',
      '#featured .lg-title': 'project focus areas',
      '#services .sm-title': 'professional services for energy networks',
      '#services .lg-title': 'our services',
      '#testimonials .sm-title': 'how we deliver dependable projects',
      '#testimonials .lg-title': 'our commitments'
    },
    'about.html': {
      documentTitle: 'About | Dahawi Engineering',
      'header .header-title h1': 'About Dahawi Engineering',
      'header .header-title p': 'We plan, build, operate, and maintain electrical infrastructure that keeps energy moving safely and reliably.',
      '#about .sm-title': 'built for dependable energy networks',
      '#about .lg-title': 'our engineering story',
      '#capabilities .sm-title': 'what we bring to every project',
      '#capabilities .lg-title': 'core capabilities',
      '#facts .sm-title': 'our work is measured by reliability',
      '#facts .lg-title': 'company strengths'
    },
    'contact.html': {
      documentTitle: 'Contact | Dahawi Engineering',
      'header .header-title h1': 'Contact Dahawi Engineering',
      'header .header-title p': 'Talk to our team about electrical infrastructure projects, substation works, network maintenance, and reliable engineering support.',
      '#contact .sm-title': 'project inquiries and support',
      '#contact .lg-title': 'get in touch',
      '.contact-form label[for="name"]': 'Full Name',
      '.contact-form label[for="email"]': 'Email Address',
      '.contact-form label[for="phone"]': 'Phone Number',
      '.contact-form label[for="service"]': 'Service Required',
      '.contact-form label[for="message"]': 'Project Details',
      '.contact-form input#name': { attr: 'placeholder', value: 'Your full name' },
      '.contact-form input#email': { attr: 'placeholder', value: 'you@example.com' },
      '.contact-form input#phone': { attr: 'placeholder', value: '+254 700 000 000' },
      '.contact-form textarea#message': { attr: 'placeholder', value: 'Tell us about your project, location, and timeline.' },
      '.contact-submit': 'Send Message',
      '.contact-cta span': 'Need a project discussion?',
      '.contact-cta p': 'Send your inquiry and our engineering team will review the scope, timeline, and technical requirements.',
      '.contact-cta a.btn': 'Email Us Now'
    },
    'faq.html': {
      documentTitle: 'FAQ | Dahawi Engineering | Electrical Infrastructure Specialists',
      'header .header-title h1': 'Frequently Asked Questions',
      'header .header-title p': 'Find answers to common questions about our electrical infrastructure services and expertise.',
      '.faq-title .sm-title': 'quick answers',
      '.faq-title .lg-title': 'Common Questions'
    },
    'gallery.html': {
      documentTitle: 'Services | Dahawi Engineering',
      'header .header-title h1': 'Services',
      'header .header-title p': 'Explore the services we provide for electrical infrastructure, power systems, and energy network support.',
      '.title-wrap .sm-title': 'service portfolio',
      '.title-wrap .lg-title': 'project gallery'
    },
    'blog.html': {
      documentTitle: 'Portfolio | Dahawi Engineering',
      'header .header-title h1': 'Portfolio',
      'header .header-title p': 'Explore our portfolio and recent work in electrical infrastructure and energy systems.',
      '.title-wrap .sm-title': 'read these blog for information',
      '.title-wrap .lg-title': 'recent blog',
      '.blog-item-bottom a[href="#"]': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit?'
    }
  },
  ar: {
    documentTitle: 'دحاوي للهندسة | متخصصون في البنية التحتية الكهربائية',
    common: {
      'a[href="index.html"]': 'الرئيسية',
      'a[href="about.html"]': 'من نحن',
      'a[href="gallery.html"]': 'الخدمات',
      'a[href="blog.html"]': 'نماذجنا',
      'a[href="faq.html"]': 'الأسئلة',
      'a[href="contact.html"]': 'اتصل بنا',
      '.footer-row .footer-item a[href="index.html"]': 'الرئيسية',
      '.footer-row .footer-item a[href="about.html"]': 'من نحن',
      '.footer-row .footer-item a[href="gallery.html"]': 'المعرض',
      '.footer-row .footer-item a[href="blog.html"]': 'المدونة',
      '.footer-row .footer-item a[href="contact.html"]': 'اتصل بنا',
      '#theme-toggle span': 'الوضع الفاتح',
      '#language-toggle span': 'English',
      '.subscribe-form h2': 'اتصل مباشرة',
      '.footer-bottom p:nth-child(1)': '© 2026 دحاوي للهندسة. جميع الحقوق محفوظة.',
      '.footer-bottom p:nth-child(2)': 'شريكك في التميز في البنية التحتية الكهربائية'
    },
    'index.html': {
      documentTitle: 'دحاوي للهندسة | متخصصون في البنية التحتية الكهربائية',
      'header .header-title h1': 'شركة دحاوي للهندسة',
      'header .header-title p': 'متخصصون في تنفيذ البنية التحتية الكهربائية وبناء المحطات الفرعية وتشغيل الشبكات والصيانة لأنظمة طاقة موثوقة.',
      '.hero-actions a.btn': 'اتصل بنا',
      '.hero-actions a.btn-outline': 'تعرف أكثر',
      '#featured .sm-title': 'دعم متكامل لبنية الطاقة التحتية',
      '#featured .lg-title': 'مجالات التركيز في المشروع',
      '#services .sm-title': 'خدمات احترافية لشبكات الطاقة',
      '#services .lg-title': 'خدماتنا',
      '#testimonials .sm-title': 'كيف نقدم مشاريع موثوقة',
      '#testimonials .lg-title': 'التزاماتنا'
    },
    'about.html': {
      documentTitle: 'من نحن | دحاوي للهندسة',
      'header .header-title h1': 'عن دحاوي للهندسة',
      'header .header-title p': 'نخطط ونبني ونشغل ونصون البنية التحتية الكهربائية التي تبقي الطاقة متدفقة بأمان وموثوقية.',
      '#about .sm-title': 'مصممون لشبكات طاقة موثوقة',
      '#about .lg-title': 'قصة هندسية',
      '#capabilities .sm-title': 'ما نضيفه لكل مشروع',
      '#capabilities .lg-title': 'القدرات الأساسية',
      '#facts .sm-title': 'يُقاس عملنا بالاعتمادية',
      '#facts .lg-title': 'نقاط القوة في الشركة'
    },
    'contact.html': {
      documentTitle: 'اتصل | دحاوي للهندسة',
      'header .header-title h1': 'اتصل بدحاوي للهندسة',
      'header .header-title p': 'تواصل مع فريقنا حول مشاريع البنية التحتية الكهربائية، أعمال المحطات الفرعية، صيانة الشبكات، والدعم الهندسي الموثوق.',
      '#contact .sm-title': 'استفسارات المشاريع والدعم',
      '#contact .lg-title': 'تواصل معنا',
      '.contact-form label[for="name"]': 'الاسم الكامل',
      '.contact-form label[for="email"]': 'البريد الإلكتروني',
      '.contact-form label[for="phone"]': 'رقم الهاتف',
      '.contact-form label[for="service"]': 'الخدمة المطلوبة',
      '.contact-form label[for="message"]': 'تفاصيل المشروع',
      '.contact-form input#name': { attr: 'placeholder', value: 'اسمك الكامل' },
      '.contact-form input#email': { attr: 'placeholder', value: 'you@example.com' },
      '.contact-form input#phone': { attr: 'placeholder', value: '+254 700 000 000' },
      '.contact-form textarea#message': { attr: 'placeholder', value: 'أخبرنا عن مشروعك وموقعك والجدول الزمني.' },
      '.contact-submit': 'إرسال الرسالة',
      '.contact-cta span': 'هل تحتاج لمناقشة مشروع؟',
      '.contact-cta p': 'أرسل استفسارك وسيراجع فريقنا الهندسي النطاق والجدول الزمني والمتطلبات التقنية.',
      '.contact-cta a.btn': 'أرسل لنا الآن'
    },
    'faq.html': {
      documentTitle: 'الأسئلة | دحاوي للهندسة | متخصصون في البنية التحتية الكهربائية',
      'header .header-title h1': 'الأسئلة المتكررة',
      'header .header-title p': 'اعثر على إجابات للأسئلة الشائعة حول خدماتنا في البنية التحتية الكهربائية وخبرتنا.',
      '.faq-title .sm-title': 'إجابات سريعة',
      '.faq-title .lg-title': 'الأسئلة الشائعة'
    },
    'gallery.html': {
      documentTitle: 'الخدمات | دحاوي للهندسة',
      'header .header-title h1': 'الخدمات',
      'header .header-title p': 'اكتشف الخدمات التي نقدمها للبنية التحتية الكهربائية وأنظمة الطاقة ودعم الشبكات.',
      '.title-wrap .sm-title': 'محفظة الخدمات',
      '.title-wrap .lg-title': 'معرض المشاريع'
    },
    'blog.html': {
      documentTitle: 'نماذجنا | دحاوي للهندسة',
      'header .header-title h1': 'نماذجنا',
      'header .header-title p': 'استعرض نماذجنا وأعمالنا الأخيرة في مجال البنية التحتية الكهربائية وأنظمة الطاقة.',
      '.title-wrap .sm-title': 'اقرأ هذه المقالات للمعلومات',
      '.title-wrap .lg-title': 'المدونة الأخيرة',
      '.blog-item-bottom a[href="#"]': 'لوريم إيبسوم دولور سيت أميت كونسيكتيتور أديبيسسينغ إليت؟'
    }
  }
};

const pageName = window.location.pathname.split('/').pop() || 'index.html';

function setActiveNavLink() {
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === pageName);
  });
}

setActiveNavLink();

function setTheme(theme) {
  document.body.classList.toggle('theme-dark', theme === 'dark');
  localStorage.setItem('siteTheme', theme);
  if (themeToggle) {
    themeToggle.querySelector('span').textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }
}

function setLanguage(lang) {
  document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', lang === 'ar');
  localStorage.setItem('siteLanguage', lang);
  if (languageToggle) {
    languageToggle.querySelector('span').textContent = lang === 'ar' ? 'English' : 'العربية';
  }
  applyTranslations(lang);
}

function applyTranslations(lang) {
  const langData = translations[lang];
  if (!langData) return;

  const pageData = langData[pageName] || {};
  const common = langData.common || {};

  if (pageData.documentTitle) {
    document.title = pageData.documentTitle;
  } else if (langData.documentTitle) {
    document.title = langData.documentTitle;
  }

  const applyMap = (map) => {
    Object.entries(map).forEach(([selector, value]) => {
      if (selector === 'documentTitle') return;
      document.querySelectorAll(selector).forEach((element) => {
        if (typeof value === 'object' && value.attr) {
          element.setAttribute(value.attr, value.value);
        } else {
          element.textContent = value;
        }
      });
    });
  };

  applyMap(common);
  applyMap(pageData);
}

window.addEventListener('scroll', () => {
  if (!navbarDiv) return;
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    navbarDiv.classList.add('navbar-cng');
  } else {
    navbarDiv.classList.remove('navbar-cng');
  }
});

if (navbarShowBtn && navbarCollapseDiv) {
  navbarShowBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.add('navbar-collapse-rmw');
  });
}

if (navbarCloseBtn && navbarCollapseDiv) {
  navbarCloseBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
  });
}

document.addEventListener('click', (e) => {
  if (!navbarCollapseDiv) return;
  const target = e.target;
  if (
    target.id !== 'navbar-collapse' &&
    target.id !== 'navbar-show-btn' &&
    target.parentElement?.id !== 'navbar-show-btn' &&
    target.closest('#navbar-collapse') === null
  ) {
    navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
  }
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = localStorage.getItem('siteTheme') === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

if (languageToggle) {
  languageToggle.addEventListener('click', () => {
    const current = localStorage.getItem('siteLanguage') === 'ar' ? 'ar' : 'en';
    setLanguage(current === 'ar' ? 'en' : 'ar');
  });
}

let resizeTimer;
window.addEventListener('resize', () => {
  document.body.classList.add('resize-animation-stopper');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('resize-animation-stopper');
  }, 400);
});

function initFaqAccordion() {
  const faqItems = Array.from(document.querySelectorAll('.faq-item'));
  const faqQuestions = Array.from(document.querySelectorAll('.faq-question'));

  if (faqItems.length === 0 || faqQuestions.length === 0) {
    return;
  }

  function closeAllFaqs() {
    faqItems.forEach(item => {
      item.classList.remove('active');
      const ans = item.querySelector('.faq-answer');
      if (ans) ans.style.maxHeight = null;
      const q = item.querySelector('.faq-question');
      if (q) q.setAttribute('aria-expanded', 'false');
    });
  }

  faqQuestions.forEach((question, index) => {
    const faqItem = question.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const answerId = answer?.id || `faq-answer-${index + 1}`;

    question.setAttribute('role', 'button');
    question.setAttribute('tabindex', '0');
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('aria-controls', answerId);

    if (answer && !answer.id) {
      answer.id = answerId;
    }

    const toggle = () => {
      const isOpen = faqItem.classList.contains('active');

      if (!isOpen) {
        closeAllFaqs();
        faqItem.classList.add('active');
        if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
        question.setAttribute('aria-expanded', 'true');
      } else {
        faqItem.classList.remove('active');
        if (answer) answer.style.maxHeight = null;
        question.setAttribute('aria-expanded', 'false');
      }
    };

    question.addEventListener('click', toggle);
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  const first = faqItems[0];
  const firstAnswer = first.querySelector('.faq-answer');
  const firstQuestion = first.querySelector('.faq-question');

  first.classList.add('active');
  if (firstAnswer) firstAnswer.style.maxHeight = `${firstAnswer.scrollHeight}px`;
  if (firstQuestion) firstQuestion.setAttribute('aria-expanded', 'true');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFaqAccordion);
} else {
  initFaqAccordion();
}

(function initializeSite() {
  const savedTheme = localStorage.getItem('siteTheme') === 'dark' ? 'dark' : 'light';
  const savedLanguage = localStorage.getItem('siteLanguage') === 'ar' ? 'ar' : 'en';
  setTheme(savedTheme);
  setLanguage(savedLanguage);
})();
