const backButton = document.querySelector(".back-button");
const fwdButton = document.querySelector(".forward-button");
const container = document.querySelector(".container");
const carousel = document.querySelector(".carousel");
const step = 500;
// const step = Math.round(container.getBoundingClientRect().width);

function getX() {
  const style = window.getComputedStyle(carousel);
  const matrix = style.transform;
  if (matrix === "none") return 0;

  const values = matrix.split("(")[1].split(")")[0].split(",");

  console.log(`matrix: ${matrix}; values: ${values}; step: ${step}`);
  if (matrix.startsWith("matrix3d")) {
    return parseFloat(values[12]) || 0;
  } else return parseFloat(values[4]) || 0;
}

function setX(x) {
  const minX = -(carousel.clientWidth - container.clientWidth);
  const maxX = 0;
  x = Math.max(minX, Math.min(maxX, Math.round(x)));
  carousel.style.transform = `translateX(${x}px)`;
}

fwdButton.addEventListener("click", () => {
  setX(getX() - step);
});

backButton.addEventListener("click", () => {
  setX(getX() + step);
});
