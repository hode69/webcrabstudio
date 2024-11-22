const carouselWrapper = document.querySelector('.carousel-wrapper');
const carouselItems = document.querySelectorAll('.carousel-item');
const nextButton = document.getElementById('car-next');
const prevButton = document.getElementById('car-prev');
const itemLength = carouselItems.length;
const perView = 3;
let totalScroll = 0;
const delay = 2000;

carouselWrapper.style.setProperty('--per-view', perView);

// Duplicate the first and last items for seamless looping
for (let i = 0; i < perView; i++) {
  carouselWrapper.insertAdjacentHTML('beforeend', carouselItems[i].outerHTML); // Clone first items
}
for (let i = itemLength - perView; i < itemLength; i++) {
  carouselWrapper.insertAdjacentHTML('afterbegin', carouselItems[i].outerHTML); // Clone last items
}

// Initialize the scroll position to the first real item
const itemWidth = document.querySelector('.carousel-item').offsetWidth + 16;
carouselWrapper.style.left = `-${perView * itemWidth}px`;

let autoScroll = setInterval(scrollToNext, delay);

// Scroll to the next item
function scrollToNext() {
  totalScroll++;
  carouselWrapper.style.transition = '.3s'; // Enable smooth transition
  carouselWrapper.style.left = `-${(perView + totalScroll) * itemWidth}px`;

  // Reset to the beginning after the last real item
  if (totalScroll >= itemLength) {
    setTimeout(() => {
      carouselWrapper.style.transition = '0s'; // Disable transition for instant reset
      totalScroll = 0; // Reset the scroll counter
      carouselWrapper.style.left = `-${perView * itemWidth}px`;
    }, 300); // Wait for the smooth transition to complete
  }
}

// Scroll to the previous item
function scrollToPrev() {
  totalScroll--;
  carouselWrapper.style.transition = '.3s'; // Enable smooth transition
  carouselWrapper.style.left = `-${(perView + totalScroll) * itemWidth}px`;

  // Reset to the end after the first real item
  if (totalScroll < 0) {
    setTimeout(() => {
      carouselWrapper.style.transition = '0s'; // Disable transition for instant reset
      totalScroll = itemLength - 1; // Reset the scroll counter to the last real item
      carouselWrapper.style.left = `-${(perView + totalScroll) * itemWidth}px`;
    }, 300); // Wait for the smooth transition to complete
  }
}

// Pause auto-scroll on hover
carouselWrapper.addEventListener('mouseenter', () => {
  clearInterval(autoScroll);
});

carouselWrapper.addEventListener('mouseleave', () => {
  autoScroll = setInterval(scrollToNext, delay);
});

// Pause auto-scroll when hovering over buttons
[nextButton, prevButton].forEach(button => {
  button.addEventListener('mouseenter', () => {
    clearInterval(autoScroll); // Pause auto-scroll
  });
  button.addEventListener('mouseleave', () => {
    autoScroll = setInterval(scrollToNext, delay); // Resume auto-scroll
  });
});

// Add event listeners for Next and Prev buttons
nextButton.addEventListener('click', () => {
  clearInterval(autoScroll); // Pause auto-scroll
  scrollToNext();
});

prevButton.addEventListener('click', () => {
  clearInterval(autoScroll); // Pause auto-scroll
  scrollToPrev();
});
