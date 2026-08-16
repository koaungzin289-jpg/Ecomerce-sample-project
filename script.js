// main start
const mainPage = document.querySelectorAll("section");
const changePage = (e) => {
  const id = e.target.dataset.page;
  mainPage.forEach((page) => {
    page.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
};
// main end
// navbar slider start
const slider = document.querySelector(".slider");
const navItem = document.getElementsByClassName("nav-item");
const handleChange = (e) => {
  const targetTab = e.target;
  slider.style.left = targetTab.offsetLeft + "px";
  slider.style.width = targetTab.offsetWidth + "px";
};
for (let i = 0; i < navItem.length; i++) {
  navItem[i].addEventListener("click", (e) => {
    handleChange(e);
    changePage(e);
  });
  if (i === 0) {
    slider.style.left = navItem[i].offsetLeft + "px";
    slider.style.width = navItem[i].offsetWidth + "px";
  }
}

// navbar slide end

// carousel start
const carousels = document.querySelectorAll(".carousel-container");
carousels.forEach((carousel) => {
  const carouselInner = carousel.querySelector(".carousel-inner");
  const originalSlides = carousel.querySelectorAll(".carousel-item");
  const dots = carousel.querySelectorAll(".dot");
  const totalSlides = originalSlides.length;
  const firstClone = originalSlides[0].cloneNode(true);
  carouselInner.append(firstClone);
  const lastClone = originalSlides[totalSlides - 1].cloneNode(true);
  carouselInner.insertBefore(lastClone, originalSlides[0]);

  // assign current index
  let currentIndex = 1;
  let isMoving = false;
  let slideWidth = 100;
  carouselInner.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
  const updateDot = () => {
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
    let dotIndex = currentIndex - 1;

    if (dotIndex === totalSlides) {
      dotIndex = 0;
    }
    if (dotIndex < 0) {
      dotIndex = dots.length - 1;
    }
    dots[dotIndex].classList.add("active");
  };
  const showSlide = () => {
    if (isMoving) return;
    isMoving = true;
    carouselInner.style.transition = "all 0.5s ease-in-out";
    carouselInner.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    updateDot();
  };
  // update dot

  // button
  const nextButton = carousel.querySelector(".next");
  const prevButton = carousel.querySelector(".prev");
  nextButton.addEventListener("click", () => {
    currentIndex++;
    showSlide();
  });

  prevButton.addEventListener("click", () => {
    currentIndex--;
    showSlide();
  });
  carouselInner.addEventListener("transitionend", () => {
    isMoving = false;
    if (currentIndex >= totalSlides + 1) {
      currentIndex = 1;
      carouselInner.style.transition = "none";
      carouselInner.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    }
    if (currentIndex === 0) {
      currentIndex = totalSlides;
      carouselInner.style.transition = "none";
      carouselInner.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    }
  });
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", () => {
      currentIndex = i + 1;
      showSlide();
    });
  }
});
