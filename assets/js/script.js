//DOM ELEMENT
let searchBtn = document.querySelector("#search-button");
let searchInput = document.querySelector("search-input");
let todayWeather = document.querySelector("#today");
let listOfCities = document.querySelector(".list-of-city");

    
let apiKey = "f4c9518fc9bfcf20e6accc10273d3d66";
let variousCities = [];

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();

    let cities = searchInput.value;

    weatherSearch(cities);

    if (!variousCities.includes(cities)) {
        variousCities.push(city);
        cityStorage();
    }

    function cityStorage() {
        localStorage.setItem("variousCities", JSON.stringify(variousCities));
        console.log(localStorage);
        
    }
    buildCities(variousCities);

    
});

function buildCities(city) {
    listOfCities.innerHTML ="";

    for (let i = 0; i < city.length; i++) {
        const cities = city[i];

        let citiesBtn = document.createElement("li");
        citiesBtn.innerHTML = cities;

        listOfCities.prepend(citiesBtn)
        
    }
    
}

function renderWeather(weatherDetails) {
    // city title
    let nameOfCity = weatherDetails.city.name;
    let icons = weatherDetails.list[0].weather[0].icon;
    let iconsURL = `http://openweathermap.org/img/wn/${icons}@2x.png`;
  
    console.log(cityTitle);
    let details = ` <h1>${nameOfCity} (${moment(weatherDetails.dt).format("DD/MM/YYYY")})
    <img src='${iconsURL}'></h1>
    <p>Temp: ${weatherDetails.list[0].main.temp} &#8451</p>
    <p>Wind</p>
    <p>Humidity</p>`;
  
    todayWeather.innerHTML = details;
  }
   