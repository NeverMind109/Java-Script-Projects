const searchForm = document.querySelector(".app__search-form");
const searchInput = document.querySelector(".app__search");
const appResult = document.querySelector(".app__result");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const countryName = searchInput.value;
  let URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

  fetch(URL)
    .then((resp) => resp.json())
    .then((data) => {
      appResult.innerHTML = `
        <img class='app__country-flag' src='${data[0].flags.svg}' alt='${
        data[0].name.common
      } Flag' />
        <h2 class='app__country-name'>${data[0].name.common}</h2>
        <div class ='app__country-content'>
            <div class='app__country-info'>
                <h3 class='app__country-category'>Capital:</h3>
                <span class='app__country-value'>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class ='app__country-content'>
            <div class='app__country-info'>
                <h3 class='app__country-category'>Continent:</h3>
                <span class='app__country-value'>${data[0].continents[0]}</span>
            </div>
        </div>
        <div class ='app__country-content'>
            <div class='app__country-info'>
                <h3 class='app__country-category'>Area:</h3>
                <span class='app__country-value'>${data[0].area.toLocaleString()} km<sup>2</sup></span>
            </div>
        </div>
        <div class ='app__country-content'>
            <div class='app__country-info'>
                <h3 class='app__country-category'>Population:</h3>
                <span class='app__country-value'>${data[0].population.toLocaleString()}</span>
            </div>
        </div>
        <div class ='app__country-content'>
            <div class='app__country-info'>
                <h3 class='app__country-category'>Currency:</h3>
                <span class='app__country-value'>${
                  data[0].currencies[Object.keys(data[0].currencies)].name
                } - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>
            <div class ='app__country-content'>
            <div class='app__country-info'>
                <h3 class='app__country-category'>Common Languages:</h3>
                <span class='app__country-value'>${Object.values(
                  data[0].languages
                )
                  .toString()
                  .split(",")
                  .join(", ")}</span>
            </div>
        </div>
      `;
    })
    .catch((err) => {
      if (countryName.length == 0) {
        appResult.innerHTML = `<p class='app__country-err'>The input field cannot be empty</p>`;
        console.log(err);
      } else {
        appResult.innerHTML = `<p class='app__country-err'>Please enter a valid country name</p>`;
        console.log(err);
      }
    });
  searchInput.value = "";
});
