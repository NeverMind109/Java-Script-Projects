const sliderDividerLine = document.getElementById("slider-conparison-divider");
const sliderDragLine = document.querySelector(".slider__drag-line");
const secondImage = document.querySelector(".slider__image-second");

sliderDividerLine.addEventListener("input", () => {
  const silderValue = sliderDividerLine.value;
  sliderDragLine.style.left = silderValue + "%";
  secondImage.style.width = silderValue + "%";
});
