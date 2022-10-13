const mealsEl = document.getElementById("meals");
const favourites = document.getElementById("fav-meals");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
const mealPopup = document.getElementById("popup");
const popupCloseBtn = document.getElementById("popup-close");
const popupInfoEl = document.getElementById("popup-info");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

async function getMealsBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const respData = await resp.json();
  const meals = respData.meals;

  return meals;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
    <div class="meal-header">
    ${random ? '<span class="random"> Random Recipe </span>' : ""}
        <img class="meal-img"
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
    </div>
    <div class="meal-body">
        <h4 class="meal-name">${mealData.strMeal}</h4>
        <button class="favourite-btn">
            <i class="fas fa-heart"></i>
        </button>
    </div>
`;

  meal.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.classList.contains("fa-heart")) {
      const btn = e.target.parentElement;

      if (btn.classList.contains("active")) {
        removeMealLS(mealData.idMeal);
        btn.classList.remove("active");
      } else {
        addMealLS(mealData.idMeal);
        btn.classList.add("active");
      }
      fetchFavMeals();
    } else {
      showPopupInfo(mealData);
    }
  });

  mealsEl.appendChild(meal);
}

function addMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  favourites.innerHTML = "";
  const mealIds = getMealsLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    let meal = await getMealById(mealId);
    addMealFav(meal);
  }
}

function addMealFav(mealData) {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
    <img class="fav-img" src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>
    <span class="fav-name">${mealData.strMeal}</span>
    <div class="fav-delete">
        <i class="fas fa-window-close"></i>
    </div>
  `;

  favMeal.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-window-close")) {
      removeMealLS(mealData.idMeal);
      fetchFavMeals();
    } else {
      showPopupInfo(mealData);
    }
  });

  favourites.appendChild(favMeal);
}

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  mealsEl.innerHTML = "";

  const value = searchTerm.value;
  const meals = await getMealsBySearch(value);

  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  } else {
    mealsEl.innerHTML = `<p class="meals-error">No matching results</p>`;
  }

  searchTerm.innerText = "";
});

function showPopupInfo(mealData) {
  popupInfoEl.innerHTML = "";
  const popupEl = document.createElement("div");

  //   get ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} : ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }

  popupEl.innerHTML = `
        <h1 class="popup-title">${mealData.strMeal}</h1>
        <img class="popup-img" src="${mealData.strMealThumb}" alt="${
    mealData.strMeal
  }" />
        <h3 class="popup-subtitle">Ingredients:</h3>
        <ul class="popup-ingredients">
            ${ingredients
              .map(
                (ing, idx) =>
                  `<li>${idx + 1}. ${ing[0].toLocaleUpperCase()}${ing.slice(
                    1
                  )}</li>`
              )
              .join("")}
        </ul>
        <p class="popup-descr">${mealData.strInstructions}</p>
    `;

  popupInfoEl.appendChild(popupEl);
  mealPopup.classList.remove("hidden");
}

popupCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});
