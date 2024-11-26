// boxshadow header
var header = document.getElementById('page-header');
window.onscroll = function(e) {
    if (window.scrollY >5) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
};

// navbar


window.onload = function () {
    const toggleNavbar = document.querySelector(".toggle-navbar");
    const toggleNavbarIcon = document.querySelector(".toggle-navbar i");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    // if (!toggleNavbar) {
    //     console.log("yes");
    // }else {
    //     console.log("none");
    // }

    const toggleMenu = function () {
        dropdownMenu.classList.toggle("open");
        // alert("cok");
        const isOpen = dropdownMenu.classList.contains("open");
        toggleNavbarIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    };

    // toggleNavbar.addEventListener("click", toggleMenu);
    // toggleNavbar.addEventListener("touchstart", toggleMenu);
    toggleNavbar.addEventListener("pointerdown", toggleMenu);
};



