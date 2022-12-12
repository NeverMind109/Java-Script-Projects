const searchInput = document.querySelector(".app__search");
const searchBtn = document.querySelector(".app__btn");
const appResults = document.querySelector(".app__cocktail");

const URL = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";

const getInfo = () => {
  const inputValue = searchInput.value;
  if (inputValue.length == 0) {
    appResults.innerHTML = `<h3 class='app__message'>Input field cannot be empty</h3>`;
  }
  fetch(URL + inputValue)
    .then((response) =>
      response.json().then((data) => {
        searchInput.value = "";
        const drink = data.drinks[0];

        let count = 1;
        let ingredients = [];
        for (let i in drink) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && drink[i]) {
            ingredient = drink[i];
            if (drink[`strMeasure` + count]) {
              measure = drink[`strMeasure` + count];
            } else {
              measure = "";
            }
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }

          appResults.innerHTML = `
                <img class='app__cocktail-img' src=${drink.strDrinkThumb} alt=${drink.strDrink} />
                <h2 class='app__cocktail-title'>${drink.strDrink}</h2>
                <h3 class='app__cocktail-subtitle'>Ingredients:</h3>
                <ul class='app__cocktail-ingredients'>
                    
                </ul>
                <h3 class='app__cocktail-subtitle'>Instructions:</h3>
                <p class='app__cocktail-instructions'>${drink.strInstructions}</p>
            `;

          const cocktailIngredients = document.querySelector(
            ".app__cocktail-ingredients"
          );
          ingredients.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.classList.add("app__cocktail-ingredient");
            listItem.innerText = item;
            cocktailIngredients.appendChild(listItem);
          });
        }
      })
    )
    .catch(() => {
      appResults.innerHTML = `<h3 class='app__message'>Please enter a valid input</h3>`;
    });
};

window.addEventListener("load", getInfo);
searchBtn.addEventListener("click", getInfo);
