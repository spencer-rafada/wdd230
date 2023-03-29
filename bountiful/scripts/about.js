import Navbar from "./Navbar.js";

const nav = new Navbar();

let imagesToLoad = document.querySelectorAll(`img[data-src]`);

const loadImages = (img) => {
  img.setAttribute("src", img.getAttribute("data-src"));
  img.onload = () => {
    img.removeAttribute("data-src");
  };
};

const callback = (items, observer) => {
  items.forEach((item) => {
    if (item.isIntersecting) {
      loadImages(item.target);
      observer.unobserve(item.target);
    }
  });
};

const options = {
  threshold: 0.1,
};

const observer = new IntersectionObserver(callback, options);

imagesToLoad.forEach((img) => {
  observer.observe(img);
});
