const COUNTRIES = [
  "Afghanistan",
  "Algeria",
  "Argentina",
  "Australia",
  "Bangladesh",
  "Belgium",
  "Bhutan",
  "Brazil",
  "Canada",
  "China",
  "Denmark",
  "Ethiopia",
  "Finland",
  "France",
  "Germany",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Italy",
  "Japan",
  "Malaysia",
  "Maldives",
  "Mexico",
  "Morocco",
  "Nepal",
  "Netherlands",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Peru",
  "Russia",
  "Romania",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "Uganda",
  "Ukraine",
  "United States",
  "United Kingdom",
  "Vietnam",
];

const select = document.querySelector(".select");
const selectBtn = document.querySelector(".select__btn");
const selectList = document.querySelector(".select__list");
const selectBtnText = document.querySelector(".select__text");
const selectInput = document.querySelector(".select__input");

function addCountry(currentCountryName) {
  selectList.innerHTML = "";
  COUNTRIES.forEach((country) => {
    if (currentCountryName && currentCountryName == country) {
      let li = `<li class="select__item selected">${country}</li>`;
      selectList.insertAdjacentHTML("beforeend", li);
    } else {
      let li = `<li class="select__item">${country}</li>`;
      selectList.insertAdjacentHTML("beforeend", li);
    }
  });
}

addCountry();

selectBtn.addEventListener("click", () => {
  select.classList.toggle("active");
});

selectInput.addEventListener("keyup", () => {
  let arr = [];
  let searchedVal = selectInput.value.toLowerCase();
  arr = COUNTRIES.filter((data) => {
    return data.toLowerCase().startsWith(searchedVal);
  })
    .map((data) => `<li class="select__item">${data}</li>`)
    .join("");
  selectList.innerHTML = arr ? arr : `<p>Oops! Country not found</p>`;
});

selectList.addEventListener("click", (e) => {
  let currentCountry = e.target;
  if (currentCountry.classList.contains("select__item")) {
    selectBtnText.innerText = currentCountry.innerText;
    select.classList.remove("active");
    selectInput.value = "";
    addCountry(currentCountry.innerText);
  }
});
