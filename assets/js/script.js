//DOM ELEMENT
let searchBtn = document.querySelector("#search-button");
let searchInput = document.querySelector("#search-input");
let todayWeather = document.querySelector("#today");
let listOfCities = document.querySelector(".list-of-city");
let currentWeather = document.querySelector(".container");
let weatherForecast = document.querySelector("#forecast");
let forcast = document.querySelector("#variousForecast")

let apiKey = "f4c9518fc9bfcf20e6accc10273d3d66";
let variousCities = [];

getCities();

// check the local storage
function getCities() {

    let cities = JSON.parse(localStorage.getItem("variousCities"));


    if (cities) {
        variousCities = cities;
    }


    buildCities(variousCities);
}

function buildCities(city) {
    listOfCities.innerHTML = "";

    for (let i = 0; i < city.length; i++) {
        const cities = city[i];

        let citiesBtn = document.createElement("li");
        citiesBtn.innerHTML = cities;

        listOfCities.prepend(citiesBtn)

    }

}

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();

    let cities = searchInput.value;

    exploreWeatherSearch(cities);

    if (!variousCities.includes(cities)) {
        variousCities.push(cities);
        cityStorage();
    }

    function cityStorage() {
        localStorage.setItem("variousCities", JSON.stringify(variousCities));
        console.log(localStorage);

    }
    buildCities(variousCities);


});

listOfCities.addEventListener("click", function (event) {
    if (event.target.matches("li")) {
        console.log(event.target);
        let nameOfCity = event.target.textContent;
        console.log(nameOfCity);
        exploreWeatherSearch(nameOfCity);
    }
});

function exploreWeatherSearch(choiceOfCity) {

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${choiceOfCity}&limit=5&appid=` +
        apiKey)
        .then((response) => response.json())
        .then((city) => {
            let firstCity = city[0];
            console.log(firstCity);
            console.log(firstCity.lat);
            console.log(firstCity.lon);


            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&units=metric&appid=` +
                apiKey);
        })

        .then((response) => response.json())
        .then((cityData) => {
            console.log(cityData);
            displayWeather(cityData);

        });
}


function displayWeather(weatherDetails) {

    let nameOfCity = weatherDetails.city.name;
    let icons = weatherDetails.list[0].weather[0].icon;
    let iconsURL = `http://openweathermap.org/img/wn/${icons}@2x.png`;
    let windSpeed = weatherDetails.list[0].wind.speed;
    let humidity = weatherDetails.list[0].main.humidity;
    let temp = weatherDetails.list[0].main.temp

    console.log(nameOfCity);
    currentWeather.innerHTML = ` <h1>${nameOfCity} (${moment(weatherDetails.dt).format("DD/MM/YYYY")})
            <img src='${iconsURL}'></h1>
            <p>Temp: ${temp} &#8451</p>
            <p>Wind: ${windSpeed} KPH</p>
            <p>Humidity ${humidity} &#37</p>`;
    todayWeather.append(currentWeather);


    weatherDetails.forEach((day, index) => {

        if (index > 0) {
            
            forcast.innerHTML = `<div class="card" style="width: 18rem;" id="list-of-forecast">
            <div class="card-body">
            <h5 class="card-title">${moment(day.dt * 1000).format("DD/MM/YYYY")}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${`http://openweathermap.org/img/wn/${icons}@2x.png`}</h6>
            <p class="card-text">Temp: ${temp} &#8451</p>
            <p class="card-text">Wind: ${windSpeed} KPH</p>
            <p class="card-text">Humidity ${humidity} &#37</p>
            </div>
            </div>`

            
        }
        weatherForecast.append(forcast);
    });
   

}



