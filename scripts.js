console.log("hello");
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

getGeolocation();

const data = {};

async function getData() {
  console.log(coords);
  const options = { method: "GET" };
  const geo = await getGeolocation();
  const { latitude, longitude } = geo;

  if (!coords.latitude && !data.longitude) {
    console.log("no coords");
    fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=${keys.WEATHER_API_KEY}`,
      options
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  } else {
    console.log("yes coords");
    fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${coords.latitude},${coords.longitude}&apikey=${keys.WEATHER_API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
}

getData();
