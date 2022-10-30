const rangeSliderInput = document.querySelectorAll(".range-slider__input");
const rangeSliderValue = document.querySelectorAll(
  ".range-slider__input-value"
);
const progress = document.querySelector(".range-slider__progress");

let priceGap = 1000;

rangeSliderInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minValue = parseInt(rangeSliderInput[0].value);
    let maxValue = parseInt(rangeSliderInput[1].value);

    if (maxValue - minValue < priceGap) {
      if (e.target.dataset.id === "range-min-input") {
        rangeSliderInput[0].value = maxValue - priceGap;
      } else {
        rangeSliderInput[1].value = minValue + priceGap;
      }
    } else {
      rangeSliderValue[0].value = minValue;
      rangeSliderValue[1].value = maxValue;
      progress.style.left = (minValue / rangeSliderInput[0].max) * 100 + "%";
      progress.style.right =
        100 - (maxValue / rangeSliderInput[1].max) * 100 + "%";
    }
  });
});

rangeSliderValue.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minValue = parseInt(rangeSliderValue[0].value);
    let maxValue = parseInt(rangeSliderValue[1].value);

    if (maxValue - minValue >= priceGap && maxValue <= 10000) {
      if (e.target.dataset.id === "range-min-value") {
        rangeSliderInput[0].value = minValue;
        progress.style.left = (minValue / rangeSliderInput[0].max) * 100 + "%";
      } else {
        rangeSliderInput[1].value = maxValue;
        progress.style.right =
          100 - (maxValue / rangeSliderInput[1].max) * 100 + "%";
      }
    }
  });
});
