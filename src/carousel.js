const backButton = document.querySelector(".back-button");
const fwdButton = document.querySelector(".forward-button");
const container = document.querySelector(".container");
const carousel = document.querySelector(".carousel");
const step = container.clientWidth;
// const currPos = document.querySelector(".currentpos");

fwdButton.addEventListener("click", (e) => {
  carousel.style.transform = "translateX(-500px)";
});

backButton.addEventListener("click", (e) => {
  carousel.style.transform = "translateX(0px)";
});
