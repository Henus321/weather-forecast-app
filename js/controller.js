const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current_weather=true&windspeed_unit=ms&timeformat=unixtime`;

async function getData() {
  const responce = await fetch(API_URL);
  const data = await responce.json();

  console.log(data);
}

getData();
