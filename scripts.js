import { keys } from "./env.js";

const coords = {
    latitude: null,
    longitude: null,
};

function getGeolocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            coords.latitude = position.coords.latitude;
            coords.longitude = position.coords.longitude;
        });
    }
}

function addTwoNums(a, b) {
    return a + b;
}
// getGeolocation();

let data = {};

async function getData() {
    console.log(coords);
    const options = { method: "GET" };
    const geo = await getGeolocation();
    const dch = {
        latitude: "34.0553",
        longitude: "118.2498",
    };

    if (!coords.latitude && !data.longitude) {
        // console.log("no coords");
        fetch(
            `https://api.tomorrow.io/v4/weather/forecast?location=${dch.latitude},${dch.longitude}&apikey=${keys.WEATHER_API_KEY}`,
            options
        )
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                data = json;
            });
    } else {
        // console.log("yes coords");
        fetch(
            `https://api.tomorrow.io/v4/weather/forecast?location=${coords.latitude},${coords.longitude}&apikey=${keys.WEATHER_API_KEY}`,
            options
        )
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                data = json;
            });
    }
}

function setWeather(data) {
    console.log(data);
    if (data) {
        console.log(data);
        const card = document.querySelector(".card");
        card.innerHTML = data;
    }
}

getData();
setWeather(data);
