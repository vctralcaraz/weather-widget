import { keys } from "./env.js";

const coords = {
    latitude: null,
    longitude: null,
};

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        coords.latitude = position.coords.latitude;
        coords.longitude = position.coords.longitude;
        console.log(position);
    });
}

const data = {};

function getData() {
    console.log(coords);
    if (!coords.latitude && !data.longitude) {
        console.log("no coords");
        fetch(
            `https://api.openweathermap.org/data/3.0/onecall?q=Moreno Valley,CA&appid=${keys.WEATHER_API_KEY}`
        )
            .then((response) => response.json())
            .then((json) => console.log(json));
    } else {
        console.log("yes coords");
        fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.latitude}&lon=${coords.longitude}&appid=${keys.WEATHER_API_KEY}`
        )
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
}

getData();
