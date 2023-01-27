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
   