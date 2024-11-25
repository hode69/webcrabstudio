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


window.onload = function openNavbar() {
    const toggleNavbar = document.querySelector(".toggle-navbar");
    const toggleNavbarIcon = document.querySelector(".toggle-navbar i");
    const dropdownMenu = document.querySelector(".dropdown-menu");    
    console.log(document.querySelector(".toggle-navbar"));
    
    toggleNavbar.onclick = function openNavbar() {
        dropdownMenu.classList.toggle("open");
        const isOpen = dropdownMenu.classList.contains("open");
    
        toggleNavbarIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    };
};


