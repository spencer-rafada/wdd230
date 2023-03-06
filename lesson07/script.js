let imagesToLoad = document.querySelectorAll(`img[data-src]`);

const loadImages = (img) => {
  img.setAttribute("src", img.getAttribute("data-src"));
  img.onload = () => {
    img.removeAttribute("data-src");
  };
};

// intersection observer
const callback = (items, observer) => {
  items.forEach((item) => {
    if (item.isIntersecting) {
      loadImages(item.target);
      observer.unobserve(item.target);
    }
  });
};

// Set up options
const options = {
  threshold: 0.1,
};

// observer
const observer = new IntersectionObserver(callback, options);

// Register each image with intersection observer
imagesToLoad.forEach((img) => {
  observer.observe(img);
});
