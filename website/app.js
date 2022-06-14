// Personal API Key for OpenWeatherMap API
const apiKey = "22fbdc568457dfc8b0b23c49fbe080e9";
const unit = "&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generateData);

// Function called by event listener
async function generateData() {
  const zipCode = document.getElementById("zip").value;
  const userResponse = document.getElementById("feelings").value;

  const instanceDate = new Date();
  const date =
    instanceDate.getMonth() +
    "." +
    instanceDate.getDate() +
    "." +
    instanceDate.getFullYear();

  const temp = await getTempFromOpenWeatherMap(baseURL, zipCode, apiKey, unit);

  const post = await postData("userPost", {
    temperature: temp,
    date,
    userResponse,
  });

  const newDataAndUpdateUI = await getEndpointDataAndUpdateUI("getNewPost");
}

// Function to GET Web API Data
async function getTempFromOpenWeatherMap(baseURL, zipCode, apiKey, unit) {
  const res = await fetch(
    `${baseURL}?zip=${zipCode},us&appid=${apiKey}${unit}`
  );

  try {
    const data = await res.json();
    return data.main.temp;
  } catch (error) {
    console.log("getTempFromOpenWeatherMap error", error);
  }
}

// Function to POST data
async function postData(
  path = "",
  data = { temperature: 0, date: "", userResponse: "" }
) {
  const res = await fetch(path, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("postData error", error);
  }
}

// Function to GET Project Data and update UI
async function getEndpointDataAndUpdateUI(path) {
  const res = await fetch(path);

  try {
    const data = await res.json();
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("temp").innerHTML = data.temperature;
    document.getElementById("content").innerHTML = data.userResponse;
    return data;
  } catch (error) {
    console.log("getTempFromOpenWeatherMap error", error);
  }
}
