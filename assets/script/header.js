var header = document.getElementById('page-header');
window.onscroll = function(e) {
    if (window.scrollY >5) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
};