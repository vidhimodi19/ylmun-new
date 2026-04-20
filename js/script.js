
window.addEventListener("scroll", function () {
    const header = document.querySelector(".main-header");
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 50);
});

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(
        '.navbar a[href^="#"], .apply-btn[href^="#"]'
    );

    links.forEach((link) => {
        link.addEventListener("click", function (event) {
            const targetSelector = this.getAttribute("href");
            if (!targetSelector || targetSelector === "#") return;

            const target = document.querySelector(targetSelector);
            if (!target) return;

            event.preventDefault();

            const topBar = document.querySelector(".top-bar");
            const header = document.querySelector(".main-header");
            const offset =
                (topBar ? topBar.offsetHeight : 0) +
                (header ? header.offsetHeight : 0) +
                8;

            const targetTop =
                target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: Math.max(targetTop, 0),
                behavior: "smooth",
            });

            const navbarMenu = document.getElementById("navbarMenu");
            if (navbarMenu && navbarMenu.classList.contains("show") && window.bootstrap) {
                const collapse =
                    bootstrap.Collapse.getOrCreateInstance(navbarMenu);
                collapse.hide();
            }
        });
    });

    const navbarMenu = document.getElementById("navbarMenu");
    if (navbarMenu) {
        navbarMenu.addEventListener("show.bs.collapse", function () {
            document.body.classList.add("menu-open");
        });

        navbarMenu.addEventListener("hidden.bs.collapse", function () {
            document.body.classList.remove("menu-open");
        });
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduceMotion = reduceMotionQuery.matches;

    const revealSelectors = [
        ".hero-content > *",
        ".hero-bottom-pattern",
        "section .container > *",
        "section .row > *",
        "section .col-lg-1, section .col-lg-2, section .col-lg-3, section .col-lg-4, section .col-lg-5, section .col-lg-6, section .col-lg-7, section .col-lg-8, section .col-lg-9, section .col-lg-10, section .col-lg-11, section .col-lg-12",
        "section .col-md-1, section .col-md-2, section .col-md-3, section .col-md-4, section .col-md-5, section .col-md-6, section .col-md-7, section .col-md-8, section .col-md-9, section .col-md-10, section .col-md-11, section .col-md-12",
        ".sec-title",
        ".gradient-head",
        ".table-wrap",
        ".table-note",
        ".info-box",
        ".benefit-card",
        ".mentor-card",
        ".highlight-card",
        ".competition-card",
        ".card-box",
        ".syllabus-item",
        ".syllabus-row",
        ".syllabus-row-body",
        ".award-item",
        ".summit-hover-card",
        ".finals-award-item",
        ".contact-info-card",
        ".contact-form-card",
        ".contact-side-card",
        ".faq-card",
        "section h1, section h2, section h3, section h4, section h5, section h6",
        "section p, section li, section a.btn, section img",
        ".mymun-footer .footer-col",
    ];

    const revealTargets = [...new Set([...document.querySelectorAll(revealSelectors.join(", "))])];
    if (!revealTargets.length) return;

    revealTargets.forEach((el, index) => {
        el.classList.add("reveal-on-scroll");
        el.style.setProperty("--reveal-delay", `${(index % 6) * 70}ms`);

        if (index % 3 === 1) el.classList.add("reveal-left");
        if (index % 3 === 2) el.classList.add("reveal-right");
        if (index % 7 === 0) el.classList.add("reveal-zoom");
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealTargets.forEach((el) => el.classList.add("reveal-in"));
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("reveal-in");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -10% 0px",
        }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
});
