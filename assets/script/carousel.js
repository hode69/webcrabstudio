const carousel = document.querySelector(".container5-carousel");
const firstDiv = carousel.querySelectorAll(".carousel-item")[0];
const carouselBtn = document.querySelectorAll(".carousel-button i");

let firstDivWidth = firstDiv.clientWidth + 14;
let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

const showHideButton = () => {
    carouselBtn[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    carouselBtn[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

carouselBtn.forEach(btn =>{
    btn.addEventListener("click", () => {
        if(btn.id == "prev"){
            carousel.scrollLeft -= firstDivWidth;
        }
        else{
            carousel.scrollLeft += firstDivWidth;
        }

        setTimeout(() => showHideButton(),100);
    })
});