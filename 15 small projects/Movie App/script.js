const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=*api_key*&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=*api_key*&query=";

const moviesContainer = document.querySelector(".movies-container");
const search = document.getElementById("search");
const searchForm = document.getElementById("search-form");

// initial movies
getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showMovies(respData.results);
}

function showMovies(movies) {
  moviesContainer.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img class="movie-img" src="${IMGPATH + poster_path}" alt="${title}">
      <div class="movie-info" href="#">
        <h3 class="movie-title">${title}</h3>
        <span class="movie-rate ${getClassByRate(
          vote_average
        )}">${vote_average}</span>
      </div>
      <div class="movie-overview">
      <span class="movie-subtitle">Overview:</span>
      ${overview}</div>
    `;
    moviesContainer.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote > 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = search.value;

  if (searchValue) {
    getMovies(SEARCHAPI + searchValue);

    search.value = "";
  }
});
