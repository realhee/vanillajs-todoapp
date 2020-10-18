const weather = document.querySelector(".js-weather");

const API_KEY = "38cb84355b7ad3bb3676b3b9e6b11d39";
const COORDS = 'coords';

// 여기서 fetch 함수는 requests 함수와 같은 역할
function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,//: latitude,
        longitude//: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

// 위치정보 획득에 실패하면 실행하는 함수.
function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

// 로컬 스토리지에 정보가 없으면 요청
function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();