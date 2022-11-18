const galleryImages = document.querySelectorAll(".gallery__image");
const previewEl = document.querySelector(".preview");
const shadowEl = document.querySelector(".shadow");
const previewSlides = document.querySelector(".preview__slides");
const closeBtn = document.querySelector(".preview__close");
const prevSlideBtn = document.querySelector(".preview__slide--prev");
const nextSlideBtn = document.querySelector(".preview__slide--next");
const currentImgNum = document.querySelector(".preview__current-img");
const totalImgNum = document.querySelector(".preview__total-img");

function openGallery(idx) {
  totalImgNum.innerText = galleryImages.length;
  currentImgNum.innerText = idx + 1;
  generateImg(idx);
  let newIdx = idx;

  prevSlideBtn.addEventListener("click", () => {
    newIdx--;
    if (newIdx < 0) {
      newIdx = galleryImages.length - 1;
    }
    generateImg(newIdx);
    currentImgNum.innerText = newIdx + 1;
  });

  nextSlideBtn.addEventListener("click", () => {
    newIdx++;
    if (newIdx > galleryImages.length - 1) {
      newIdx = 0;
    }
    generateImg(newIdx);
    currentImgNum.innerText = newIdx + 1;
  });
}

function generateImg(idx) {
  const item = galleryImages[idx];

  const selectedImageURL = item.querySelector(".gallery__img").src;
  const previewElImg = document.createElement("img");
  previewElImg.classList.add("preview__img");
  previewElImg.src = selectedImageURL;
  if (previewSlides.querySelector(".preview__img")) {
    previewSlides.removeChild(previewSlides.querySelector(".preview__img"));
  }
  previewSlides.appendChild(previewElImg);
}

document.addEventListener("DOMContentLoaded", () => {
  galleryImages.forEach((el, idx) => {
    el.addEventListener("click", () => {
      openGallery(idx);
      previewEl.classList.add("show");
      shadowEl.style.display = "block";
      document.body.style.overflow = "hidden";
    });

    closeBtn.addEventListener("click", () => {
      previewEl.classList.remove("show");
      shadowEl.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });
});
