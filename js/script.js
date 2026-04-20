
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
});
