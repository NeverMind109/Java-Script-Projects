// const faqs = document.querySelectorAll(".faq");

// faqs.forEach((faq) => {
//     const btn = faq.querySelector(".faq-toggle");
//     btn.addEventListener("click", function (e) {
//         faq.classList.toggle("active");
//     });
// });

const toggles = document.querySelectorAll(".faq-toggle");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggle.parentNode.classList.toggle("active");
  });
});
