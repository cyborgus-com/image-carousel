const backButton = document.querySelector(".back-button");
const fwdButton = document.querySelector(".forward-button");
const container = document.querySelector(".container");
const carousel = document.querySelector(".carousel");
const step = container.clientWidth;
// const currPos = document.querySelector(".currentpos");

function getX() {
  const style = window.getComputedStyle(carousel);
  const matrix = style.transform;
  if (matrix === "none") return 0;

  const values = matrix.split("(")[1].split(")")[0].split(",");
  //   return parseFloat(values[4]) || 0;
  if (matrix.startsWith("matrix3d")) {
    return parseFloat(values[12]) || 0;
  } else return parseFloat(values[4]) || 0;
}

function setX(x) {
  const minX = -(carousel.clientWidth - container.clientWidth);
  const maxX = 0;
  x = Math.max(minX, Math.min(maxX, x));
  carousel.style.transform = `translateX(${x}px)`;
}

fwdButton.addEventListener("click", () => {
  //   carousel.style.transform = "translateX(-500px)";
  setX(getX() - step);
});

backButton.addEventListener("click", () => {
  //   carousel.style.transform = "translateX(0px)";
  setX(getX() + step);
});
