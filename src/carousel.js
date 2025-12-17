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

  setTimeout(
    console.log(`matrix: ${matrix}; values: ${values}; step: ${step}`),
    600
  );
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

function paintTheDot() {
  const x = getX();
  const dotsContainer = document.querySelector(".dots-container");
  const dots = dotsContainer.querySelectorAll("div");

  // Reset all dots
  dots.forEach((dot) => (dot.style.opacity = "0.4"));

  // Calculate which slide is active (0-indexed)
  const step = Math.round(container.getBoundingClientRect().width);
  const activeIndex = Math.round(-x / step);
  console.log(`step: ${step}, activeIndex: ${activeIndex}`);

  // Highlight active dot
  if (dots[activeIndex]) {
    dots[activeIndex].style.opacity = "0.7";
  }
}

paintTheDot();

function rotateSlides() {
  let x = getX();
  const dotsContainer = document.querySelector(".dots-container");
  const dots = dotsContainer.querySelectorAll("div");
  const activeIndex = Math.round(-x / step);
  if (activeIndex === 4) {
    setX(0);
  } else {
    setX(getX() - step);
  }
  setTimeout(paintTheDot, 600);
}

setInterval(rotateSlides, 5000);

fwdButton.addEventListener("click", () => {
  setX(getX() - step);
  setTimeout(paintTheDot, 600);
});

backButton.addEventListener("click", () => {
  setX(getX() + step);
  setTimeout(paintTheDot, 600);
});
