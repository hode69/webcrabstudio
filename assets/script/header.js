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

    if (!toggleNavbar) {
        console.error("Toggle navbar not found!");
        return;
    }
    else {
        console.log("Toggle Navbar:", toggleNavbar);

    }

    const toggleMenu = function () {
        if (!toggleNavbar) {
            alert("Toggle navbar element is missing!");
        } else {
            dropdownMenu.classList.toggle("open");
            const isOpen = dropdownMenu.classList.contains("open");
            toggleNavbarIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
        }
    };

    // Use matchMedia to ensure it only works on smaller screens
    function windowMode() {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        if (mediaQuery.matches) {
            console.log("Media query matched. Mobile mode.");
            toggleNavbar.addEventListener("pointerdown", toggleMenu);
        } else {
            console.log("Media query did not match. Desktop mode.");
        }
    }

    window.addEventListener("resize", windowMode);
    windowMode(); // Initial mode check
};




