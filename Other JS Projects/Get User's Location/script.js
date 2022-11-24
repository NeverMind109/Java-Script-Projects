const locationBtn = document.querySelector(".location-btn");

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    locationBtn.innerText = "Allow to detect location";
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    locationBtn.innerText = "Your browser doesn't support ";
  }
});

function onSuccess(position) {
  locationBtn.innerText = "Detecting your location...";
  let { latitude, longitude } = position.coords;
  const apiKey = "YOUR-API-KEY";
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
  )
    .then((resp) => resp.json())
    .then((result) => {
      let allDetails = result.results[0].components;
      let { county, postcode, country } = allDetails;
      locationBtn.innerText = `${county} ${postcode}, ${country}`;
      console.table(allDetails);
    })
    .catch(() => (locationBtn.innerText = "Something went wrong"));
}

function onError(error) {
  if (error.code == 1) {
    locationBtn.innerText = "You denied the request";
  } else if (error.code == 2) {
    locationBtn.innerText = "Location is not available";
  } else {
    locationBtn.innerText = "Something went wrong";
  }
  locationBtn.setAttribute("disabled", "true");
}
