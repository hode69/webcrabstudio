const carouselBtn = document.querySelectorAll(".carousel-button i");
const carousel = document.querySelector(".container5-carousel");

const showHideButton = (e) => {
  const carouselItem = e.target.querySelectorAll(".carousel-item");
  // get the first element in the carousel-item node list 
  // and get its BoundingClientRect
  const firstItemRect = carouselItem[0].getBoundingClientRect();
  // get the last element in the carousel-item node list
  // using carouselItem[carouselItem.length-1]
  // and get its BoundingClientRect
  const lastItemRect = carouselItem[carouselItem.length - 1].getBoundingClientRect();
  // parents boundingClientRect()
  const contRect = e.target.getBoundingClientRect();
  // compare the windows scrollX position + the position of the element rect.left position
  // in relation to the parent elements rect.left position
  firstItemRect.left + window.scrollX >= contRect.left ?
    carouselBtn[0].style.display = "none" :
    carouselBtn[0].style.display = "block";
  // use Math.floor to round to lowest whole
  // get the last elements rect left + its width + window scrollX position and compare
  // to the parents rect.left + rect.width
  Math.floor(lastItemRect.left + lastItemRect.width + window.scrollX) <= contRect.left + contRect.width ?
    carouselBtn[1].style.display = "none" :
    carouselBtn[1].style.display = "block";
}

const slideElement = (e) => {
  // moved the following three variables into btn event scope
  const firstDiv = carousel.querySelectorAll(".carousel-item")[0];
  let firstDivWidth = firstDiv.clientWidth + 14;
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  if (e.target.id == "prev") {
    carousel.scrollLeft -= firstDivWidth;
  } else {
    carousel.scrollLeft += firstDivWidth;
  }
}

carouselBtn.forEach(btn => {
  btn.addEventListener("click", slideElement);
});

// eventListener for scroll on the parent element
carousel.addEventListener('scroll', showHideButton);