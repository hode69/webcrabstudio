window.onload = function () {
    let toggleNavbar = document.querySelector(".toggle-navbar");
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

    windowMode(); // Initial mode check
    window.addEventListener("resize", windowMode);

    // setTimeout(function () {
    //     console.log("Checking toggleNavbar after 500ms delay.");
    //     if (!toggleNavbar) {
    //         console.error("Toggle navbar still not found after delay!");
    //     } else {
    //         console.log("Toggle navbar exists after delay.");
    //     }
    // }, 1000); // Delay to let mobile browsers stabilize the render
};