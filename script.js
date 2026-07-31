const carouselInner = document.querySelector(".carousel-inner");
const originalSlides = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");
const totalSlides = originalSlides.length;
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");

let firstClone = originalSlides[0].cloneNode(true);
carouselInner.append(firstClone);
let lastClone = originalSlides[totalSlides - 1].cloneNode(true);
carouselInner.insertBefore(lastClone, originalSlides[0]);

let slides = document.querySelectorAll(".carousel-item");
let slideWidth = 100;
let currentIndex = 1;
let isMoving = false;
carouselInner.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

// update dots
function updateDots() {
  let activeIndex = currentIndex - 1;
  if (activeIndex >= totalSlides) {
    activeIndex = 0;
  }
  if (activeIndex < 0) {
    activeIndex = totalSlides - 1;
  }
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });
  dots[activeIndex].classList.add("active");
}
// show slide
function showSlides() {
  carouselInner.style.transition = "transform 0.5s ease-in-out";
  carouselInner.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
  updateDots();
}
// next/prev
function moveSlides(direction) {
  if (isMoving) return;
  isMoving = true;
  currentIndex += direction;
  showSlides();
}

// Dot click
function currentSlide(number) {
  if (isMoving) return;
  isMoving = true;
  currentIndex = number;
  showSlides();
  console.log(currentIndex);
}
// infinite loop
carouselInner.addEventListener("transitionend", () => {
  carouselInner.style.transition = "none";
  isMoving = false;
  if (currentIndex === slides.length - 1) {
    currentIndex = 1;
    carouselInner.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
  }
  if (currentIndex === 0) {
    currentIndex = totalSlides;
    carouselInner.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
  }
});
setInterval(() => {
  moveSlides(1);
}, 3000);
