
window.addEventListener("scroll", function () {
    const header = document.querySelector(".main-header");
    header.classList.toggle("scrolled", window.scrollY > 50);
});