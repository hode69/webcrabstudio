const carouselWrapper = document.querySelector('.carousel-wrapper');
const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const nextButton = document.getElementById('car-next');
const prevButton = document.getElementById('car-prev');
let itemLength = carouselItems.length;
let perView = calculatePerView();
let totalScroll = 0;
const delay = 2000;

// Function to calculate perView based on window width
function calculatePerView() {
  if (window.innerWidth > 1000) {
    return 3;
  } else if (window.innerWidth > 768) {
    return 2;
  } else {
    return 1;
  }
}

// Function to calculate the item width dynamically
function calculateItemWidth() {
  return document.querySelector('.carousel-item').offsetWidth + 16; // Adjust for margin or padding
}

// Function to update carousel layout on resize
function updateCarousel() {
  perView = calculatePerView();
  carouselWrapper.style.setProperty('--per-view', perView);

  // Clear and recreate the carousel items with clones
  carouselWrapper.innerHTML = ''; 
  carouselItems.forEach(item => carouselWrapper.appendChild(item.cloneNode(true)));
  for (let i = 0; i < perView; i++) {
    carouselWrapper.insertAdjacentHTML('beforeend', carouselItems[i].outerHTML); // Clone first items
  }
  for (let i = itemLength - perView; i < itemLength; i++) {
    carouselWrapper.insertAdjacentHTML('afterbegin', carouselItems[i].outerHTML); // Clone last items
  }

  // Reset the scroll position
  const itemWidth = calculateItemWidth();
  carouselWrapper.style.left = `-${perView * itemWidth}px`;
  totalScroll = 0; // Reset scroll count
}

// Scroll to the next item
function scrollToNext() {
  totalScroll++;
  const itemWidth = calculateItemWidth();
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
  const itemWidth = calculateItemWidth();
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

// Add resize listener to adjust carousel on window resize
window.addEventListener('resize', updateCarousel);

// Initialize carousel layout
updateCarousel();

// Start auto-scroll
let autoScroll = setInterval(scrollToNext, delay);
