const apiUrl = '/weather';

document.getElementById("searchButton").addEventListener("click", () => {
  const city = document.getElementById("city").value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

document.getElementById("city").addEventListener("keypress", function(event) {
  if (event.key === 'Enter') {
    document.getElementById("searchButton").click();
  }
});

function getWeather(city) {
  const weatherInfo = document.getElementById("weatherInfo");
  const loader = document.getElementById("loader");

  loader.style.display = "block";
  weatherInfo.style.display = "none";


  fetch(`${apiUrl}?city=${encodeURIComponent(city)}`)
    .then(res => res.json())
    .then(data => {
      loader.style.display = "none";
      if (data.cod === 200) {
	document.getElementById("city").value = "";
	
	weatherInfo.style.display = "grid";
	weatherInfo.classList.remove("fade-in");
	void weatherInfo.offsetWidth;
	weatherInfo.classList.add("fade-in");

	localStorage.setItem("lastCity", city);

        document.getElementById("cityName").innerHTML =`<i class="fas fa-location-dot"></i> ${data.name}`;
	document.getElementById("temperature").innerHTML = `<i class="fas fa-temperature-half"></i> ${data.main.temp}°C`;
	document.getElementById("condition").innerHTML = `<i class="fas fa-cloud-sun"></i> ${data.weather[0].description}`;
	document.getElementById("humidity").innerHTML = `<i class="fas fa-droplet"></i> ${data.main.humidity}%`;
	document.getElementById("wind").innerHTML = `<i class="fas fa-wind"></i> ${data.wind.speed} km/h`;
      } else {
	alert(data.error || "City not found.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Something went wrong");
    });
}

document.getElementById("clearButton").addEventListener("click", () => {
  localStorage.removeItem("lastCity");
  document.getElementById("weatherInfo").style.display = "none";
  document.getElementById("city").value = "";
});

window.addEventListener("DOMContentLoaded", () => {
  const savedCity = localStorage.getItem("lastCity");
  if (savedCity) {
    getWeather(savedCity);
  }
});
