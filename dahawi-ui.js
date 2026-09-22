/* ============================================================
   DAHAWI ENGINEERING — Unified UI Script
   ------------------------------------------------------------
   Includes:
   • Scroll Reveal
   • Counter Animation
   • FAQ Accordion
   • Navbar Scroll State
   • Back to Top
   • Mobile Navigation
   • Active Navigation Link
   • Dynamic Footer Injection
   • Footer Language Sync
   • Footer Animation

   Include on every page:
   <script src="dahawi-ui.js"></script>

   Place just before </body>
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     1. SCROLL REVEAL
     ============================================================ */

  var revealEls = document.querySelectorAll('.reveal-up');

  if ('IntersectionObserver' in window) {

    var revealObserver = new IntersectionObserver(function (entries) {

      entries.forEach(function (entry) {

        if (!entry.isIntersecting) return;

        entry.target.classList.add('active');

        revealObserver.unobserve(entry.target);

      });

    }, {
      threshold: 0.05
    });

    revealEls.forEach(function (el) {

      var rect = el.getBoundingClientRect();

      /* Elements already visible on first load */
      if (rect.top < window.innerHeight) {

        el.classList.add(
          'active',
          'reveal-instant'
        );

      } else {

        revealObserver.observe(el);

      }

    });

  } else {

    /* Fallback for older browsers */
    revealEls.forEach(function (el) {
      el.classList.add('active');
    });

  }


  /* ============================================================
     2. COUNTER ANIMATION
     ------------------------------------------------------------
     Usage:
     <strong data-target="250">0</strong>

     Optional:
     <strong data-target="250" data-suffix="+">0</strong>
     ============================================================ */

  function animateCounter(el) {

    var target = parseInt(
      el.dataset.target,
      10
    );

    if (isNaN(target)) return;

    var suffix =
      el.dataset.suffix || '';

    var duration = 1400;

    var startTime = null;


    function animate(timestamp) {

      if (!startTime) {
        startTime = timestamp;
      }

      var elapsed =
        timestamp - startTime;

      var progress =
        Math.min(
          elapsed / duration,
          1
        );


      /* easeOutCubic */

      var eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );


      var current =
        Math.floor(
          eased * target
        );


      el.textContent =
        current.toLocaleString() +
        suffix;


      if (progress < 1) {

        requestAnimationFrame(animate);

      } else {

        el.textContent =
          target.toLocaleString() +
          suffix;

      }

    }


    requestAnimationFrame(animate);

  }


  if ('IntersectionObserver' in window) {

    var counterObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (!entry.isIntersecting) return;

            animateCounter(entry.target);

            counterObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.5
        }
      );


    document
      .querySelectorAll('[data-target]')
      .forEach(function (el) {

        counterObserver.observe(el);

      });

  }


  /* ============================================================
     3. FAQ ACCORDION
     ------------------------------------------------------------
     Event delegation prevents duplicate listeners and also
     supports dynamically inserted FAQ items.
     ============================================================ */

  document.addEventListener(
    'click',
    function (event) {

      var question =
        event.target.closest(
          '.faq-question'
        );

      if (!question) return;


      var item =
        question.closest(
          '.faq-item'
        );

      if (!item) return;


      var isOpen =
        item.classList.contains(
          'open'
        );


      document
        .querySelectorAll(
          '.faq-item.open'
        )
        .forEach(function (openItem) {

          openItem.classList.remove(
            'open'
          );

        });


      if (!isOpen) {

        item.classList.add(
          'open'
        );

      }

    }
  );


  /* ============================================================
     4. FAQ KEYBOARD ACCESSIBILITY
     ============================================================ */

  document.addEventListener(
    'keydown',
    function (event) {

      if (
        event.key !== 'Enter' &&
        event.key !== ' '
      ) {
        return;
      }


      var activeElement =
        document.activeElement;


      if (!activeElement) return;


      var question =
        activeElement.closest(
          '.faq-question'
        );


      if (!question) return;


      event.preventDefault();

      question.click();

    }
  );


  /* ============================================================
     5. NAVBAR SCROLL STATE
     ------------------------------------------------------------
     CSS should use:
     .navbar.navbar-scrolled
     ============================================================ */

  var navbar =
    document.querySelector(
      '.navbar'
    );


  if (navbar) {

    function updateNavbar() {

      navbar.classList.toggle(
        'navbar-scrolled',
        window.scrollY > 40
      );

    }


    window.addEventListener(
      'scroll',
      updateNavbar,
      {
        passive: true
      }
    );


    /* Apply immediately on page load */
    updateNavbar();

  }


  /* ============================================================
     6. BACK TO TOP
     ============================================================ */

  var backToTop =
    document.getElementById(
      'btt-btn'
    );


  if (!backToTop) {

    backToTop =
      document.createElement(
        'button'
      );

    backToTop.id =
      'btt-btn';

    backToTop.type =
      'button';

    backToTop.setAttribute(
      'aria-label',
      'Back to top'
    );

    backToTop.innerHTML =
      '<i class="fa-solid fa-chevron-up" aria-hidden="true"></i>';

    document.body.appendChild(
      backToTop
    );

  }


  function updateBackToTop() {

    backToTop.classList.toggle(
      'visible',
      window.scrollY > 400
    );

  }


  window.addEventListener(
    'scroll',
    updateBackToTop,
    {
      passive: true
    }
  );


  updateBackToTop();


  backToTop.addEventListener(
    'click',
    function () {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }
  );


  /* ============================================================
     7. MOBILE NAVIGATION
     ============================================================ */

  var navCollapse =
    document.getElementById(
      'navbar-collapse'
    );

  var showBtn =
    document.getElementById(
      'navbar-show-btn'
    );

  var closeBtn =
    document.getElementById(
      'navbar-close-btn'
    );


  function openMenu() {

    if (!navCollapse) return;

    navCollapse.classList.add(
      'open'
    );

    document.body.style.overflow =
      'hidden';

  }


  function closeMenu() {

    if (!navCollapse) return;

    navCollapse.classList.remove(
      'open'
    );

    document.body.style.overflow =
      '';

  }


  if (
    showBtn &&
    navCollapse
  ) {

    showBtn.addEventListener(
      'click',
      openMenu
    );

  }


  if (
    closeBtn &&
    navCollapse
  ) {

    closeBtn.addEventListener(
      'click',
      closeMenu
    );

  }


  if (navCollapse) {

    navCollapse
      .querySelectorAll(
        '.nav-link'
      )
      .forEach(function (link) {

        link.addEventListener(
          'click',
          closeMenu
        );

      });

  }


  document.addEventListener(
    'keydown',
    function (event) {

      if (
        event.key === 'Escape'
      ) {

        closeMenu();

      }

    }
  );


  /* ============================================================
     8. ACTIVE NAVIGATION LINK
     ============================================================ */

  var currentPage =
    window.location.pathname
      .split('/')
      .pop() ||
    'index.html';


  document
    .querySelectorAll(
      '.nav-link'
    )
    .forEach(function (link) {

      var href =
        (
          link.getAttribute(
            'href'
          ) || ''
        )
        .split('/')
        .pop();


      if (
        href &&
        href === currentPage
      ) {

        link.classList.add(
          'active'
        );

      }

    });


  /* ============================================================
     9. FOOTER HTML
     ============================================================ */

  var FOOTER_HTML = `

<footer class="py-4">

  <div class="container footer-row">

    <!-- BRAND -->
    <div class="footer-item">

      <a
        class="site-brand"
        href="index.html"
        aria-label="Dahawi Engineering"
      >
        <span class="brand-en">
          Dahawi<span>Engineering</span>
        </span>

        <span class="brand-ar">
          ضحوي<span> الهندسيّة</span>
        </span>
      </a>


      <p
        class="text"
        data-en="Dahawi Engineering delivers electrical infrastructure construction, operation, and maintenance services for reliable energy networks."
        data-ar="تقدم ضحوي الهندسيّة خدمات إنشاء وتشغيل وصيانة البنية التحتية الكهربائية لشبكات الطاقة الموثوقة."
      >
        Dahawi Engineering delivers electrical infrastructure construction,
        operation, and maintenance services for reliable energy networks.
      </p>

    </div>


    <!-- QUICK LINKS -->
    <div class="footer-item quick-links">

      <h2
        data-en="Quick Links"
        data-ar="روابط سريعة"
      >
        Quick Links
      </h2>


      <ul class="quick-links-list">

        <li>
          <a
            href="index.html"
            data-en="Home"
            data-ar="الرئيسية"
          >
            Home
          </a>
        </li>


        <li>
          <a
            href="about.html"
            data-en="About Us"
            data-ar="من نحن"
          >
            About Us
          </a>
        </li>


        <li>
          <a
            href="services.html"
            data-en="Gallery"
            data-ar="معرض الأعمال"
          >
            Gallery
          </a>
        </li>


        <li>
          <a
            href="portfolio.html"
            data-en="Blog"
            data-ar="المدونة"
          >
            Blog
          </a>
        </li>


        <li>
          <a
            href="news-activities.html"
            data-en="News &amp; Activities"
            data-ar="الأخبار والأنشطة"
          >
            News &amp; Activities
          </a>
        </li>


        <li>
          <a
            href="faq.html"
            data-en="FAQ"
            data-ar="الأسئلة الشائعة"
          >
            FAQ
          </a>
        </li>


        <li>
          <a
            href="contact.html"
            data-en="Contact"
            data-ar="تواصل معنا"
          >
            Contact
          </a>
        </li>

      </ul>

    </div>


    <!-- SOCIAL -->
    <div class="footer-item follow-us">

      <h2
        data-en="Follow us on:"
        data-ar="تابعنا على:"
      >
        Follow us on:
      </h2>


      <ul class="social-links">

        <li>
          <a
            href="#"
            aria-label="Facebook"
          >
            <i
              class="fab fa-facebook-f"
              aria-hidden="true"
            ></i>
          </a>
        </li>


        <li>
          <a
            href="#"
            aria-label="Instagram"
          >
            <i
              class="fab fa-instagram"
              aria-hidden="true"
            ></i>
          </a>
        </li>


        <li>
          <a
            href="#"
            aria-label="X / Twitter"
          >
            <i
              class="fab fa-x-twitter"
              aria-hidden="true"
            ></i>
          </a>
        </li>


        <li>
          <a
            href="#"
            aria-label="LinkedIn"
          >
            <i
              class="fab fa-linkedin-in"
              aria-hidden="true"
            ></i>
          </a>
        </li>

      </ul>

    </div>


    <!-- CONTACT -->
    <div class="footer-item contact">

      <h2
        data-en="Contact Directly"
        data-ar="تواصل مباشرة"
      >
        Contact Directly
      </h2>


      <p class="text">

        <span
          data-en="Email:"
          data-ar="البريد:"
        >
          Email:
        </span>

        <a
          href="mailto:info@dahawiengineering.com"
        >
          info@dahawiengineering.com
        </a>

      </p>


      <p class="text">

        <span
          data-en="Phone:"
          data-ar="هاتف:"
        >
          Phone:
        </span>

        <a
          href="tel:+256762460923"
        >
          +256 762 460 923
        </a>

      </p>


      <p class="text">

        <span
          data-en="Phone:"
          data-ar="هاتف:"
        >
          Phone:
        </span>

        <a
          href="tel:+249912194405"
        >
          +249 912 194 405
        </a>

      </p>

    </div>

  </div>

</footer>


<section class="footer-bottom">

  <div class="container">

    <p
      data-en="© 2026 Dahawi Engineering. All rights reserved."
      data-ar="© 2026 ضحوي الهندسيّة. جميع الحقوق محفوظة."
    >
      © 2026 Dahawi Engineering. All rights reserved.
    </p>


    <p
      data-en="Your partner in electrical infrastructure excellence"
      data-ar="شريككم في التميز بالبنية التحتية الكهربائية"
    >
      Your partner in electrical infrastructure excellence
    </p>

  </div>

</section>

`;


  /* ============================================================
     10. FOOTER INJECTION
     ------------------------------------------------------------
     Each HTML page should contain:

     <div id="site-footer"></div>
     ============================================================ */

  var footerPlaceholder =
    document.getElementById(
      'site-footer'
    );


  if (footerPlaceholder) {

    footerPlaceholder.outerHTML =
      FOOTER_HTML;

  }


  /* ============================================================
     11. FOOTER LANGUAGE
     ============================================================ */

  function applyFooterLanguage(
    lang
  ) {

    if (
      lang !== 'ar' &&
      lang !== 'en'
    ) {

      lang = 'en';

    }


    document
      .querySelectorAll(
        'footer [data-ar], footer [data-en], .footer-bottom [data-ar], .footer-bottom [data-en]'
      )
      .forEach(function (element) {

        var value =
          element.getAttribute(
            'data-' + lang
          );


        if (value !== null) {

          /*
           * Footer content is currently
           * plain text, so textContent is
           * safer than innerHTML.
           */
          element.textContent =
            value;

        }

      });

  }


  /* ============================================================
     12. INITIAL FOOTER LANGUAGE
     ============================================================ */

  var initialLanguage =
    localStorage.getItem(
      'dahawi-lang'
    ) ||
    document.documentElement
      .getAttribute('lang') ||
    'en';


  applyFooterLanguage(
    initialLanguage
  );


  /* ============================================================
     13. WATCH LANGUAGE CHANGES
     ============================================================ */

  if (
    'MutationObserver' in window
  ) {

    var languageObserver =
      new MutationObserver(
        function (mutations) {

          mutations.forEach(
            function (mutation) {

              if (
                mutation.attributeName ===
                'lang'
              ) {

                applyFooterLanguage(
                  document.documentElement
                    .getAttribute('lang') ||
                  'en'
                );

              }

            }
          );

        }
      );


    languageObserver.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ['lang']
      }
    );

  }


  /* ============================================================
     14. CUSTOM LANGUAGE EVENT
     ------------------------------------------------------------
     Compatible with:

     window.dispatchEvent(
       new CustomEvent(
         'dahawi:langchange',
         {
           detail: { lang: 'ar' }
         }
       )
     );
     ============================================================ */

  window.addEventListener(
    'dahawi:langchange',
    function (event) {

      if (
        event.detail &&
        event.detail.lang
      ) {

        applyFooterLanguage(
          event.detail.lang
        );

      }

    }
  );


  /* ============================================================
     15. FOOTER ANIMATION
     ------------------------------------------------------------ */

  var footer =
    document.querySelector(
      'footer'
    );

  var footerBottom =
    document.querySelector(
      '.footer-bottom'
    );


  if (footer) {

    footer.classList.add(
      'footer-animate'
    );


    if (footerBottom) {

      footerBottom.classList.add(
        'footer-bottom-animate'
      );

    }


    if (
      'IntersectionObserver' in window
    ) {

      var footerShown =
        false;


      /*
       * Safety fallback.
       * Prevents footer from remaining hidden
       * indefinitely.
       */

      var footerFallbackTimer =
        setTimeout(
          function () {

            if (footerShown) return;

            footerShown = true;

            footer.classList.add(
              'footer-visible'
            );


            if (footerBottom) {

              footerBottom.classList.add(
                'footer-bottom-visible'
              );

            }

          },
          3000
        );


      var footerObserver =
        new IntersectionObserver(
          function (entries) {

            entries.forEach(
              function (entry) {

                if (
                  !entry.isIntersecting ||
                  footerShown
                ) {

                  return;

                }


                footerShown = true;

                clearTimeout(
                  footerFallbackTimer
                );


                footer.classList.add(
                  'footer-visible'
                );


                if (footerBottom) {

                  footerBottom.classList.add(
                    'footer-bottom-visible'
                  );

                }


                footerObserver.unobserve(
                  entry.target
                );

              }
            );

          },
          {
            threshold: 0.05
          }
        );


      footerObserver.observe(
        footer
      );


    } else {

      /* Old-browser fallback */

      footer.classList.add(
        'footer-visible'
      );


      if (footerBottom) {

        footerBottom.classList.add(
          'footer-bottom-visible'
        );

      }

    }

  }

})();