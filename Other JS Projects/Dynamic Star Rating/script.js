const ratingStars = document.querySelectorAll(".rating__star");

ratingStars.forEach((star, idx1) => {
  star.addEventListener("click", () => {
    ratingStars.forEach((star, idx2) => {
      idx1 >= idx2
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
  });
});
