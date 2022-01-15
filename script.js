"use strict";

const nav = document.querySelector(".nav");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const scrollToTop = document.querySelector(".top--scroll");
const header = document.querySelector(".header");
const nav_link = document.querySelector(".about_nav_link");
const modalS = document.querySelector(".signup");
const modalL = document.querySelector(".login");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const login_btn = document.querySelector(".login_nav_link");
const tabs = document.querySelectorAll(".features--block");
const tabsContainer = document.querySelector(".features");
const tabsContent = document.querySelectorAll(".operations__content");
const signUpBtn = document.querySelector(".signup_btn");
const icons = document.querySelector(".icons");

// Modal window
const openModal = function (e) {
  e.preventDefault(), modalS.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modalS.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalS.classList.contains("hidden")) {
    closeModal();
  }
});

//SMOOTH SCROLLING

nav_link.addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

scrollToTop.addEventListener("click", function (e) {
  header.scrollIntoView({ behavior: "smooth" });
});

//////////////////////////////////////////////////////////////////

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".features--block"); // with closest e can dinamically select the specific element we need to work on

  // GUARD CLASS THAT WILL PREVENT NULL
  if (!clicked) return; //if clicked is a falsy value then the further code will not gey executed and the function will return immidiately

  // remove tab
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  //activate tab
  clicked.classList.add("operations__tab--active");

  // activate the content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// menu fade animation

const handleHover = function (e, opacity) {
  // console.log(this);
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const sibling = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    sibling.forEach((el) => {
      if (el !== link) el.style.opacity = opacity;
    });
    // logo.style.opacity = opacity;
  }
};

nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

const navHight = nav.getBoundingClientRect().height;
// console.log(navHight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHight}px`, // visual margin //  the nav comes at the point where the space between the header and section 1 starting is equal to nav hight
});

headerObserver.observe(header);

// reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return; // Guard class
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//SLIDER
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
// slider.style.overflow = "visible";
// console.log(slides);
const transX = slides.forEach(
  (s, i) => (s.style.transform = `translateX(${100 * i}%)`)
); // 0% 100% 200% 300%

let curSlide = 0;
const maxSlides = slides.length;

// NEXT SLIDe

const nextSlide = function () {
  if (curSlide === maxSlides - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  ); // curslide = 1 -100% 0% 100% 200%
  setTimeout(nextSlide, 6000); // Change image every 6 seconds
};

nextSlide();

/// to main.html
signUpBtn.addEventListener("click", function () {
  location.href = "main.html";
});

//hide icons
icons.style.opacity = 0;

function open_modal() {
  modalL.classList.remove("hidden");
  overlay.classList.remove("hidden"); //removes the specified class from the given class
}

for (let i = 0; i < login_btn.length; i++)
  login_btn[i].addEventListener("click", open_modal); //we simplay define the function over here

function close_modal() {
  modalL.classList.add("hidden");
  overlay.classList.add("hidden");
}

btnCloseModal.addEventListener("click", close_modal); //we dont write it like a function call because it will simply call the function and not do what we expect it to do

overlay.addEventListener("click", close_modal);
