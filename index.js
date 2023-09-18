/*Last Updated
const lastUpdate = document.querySelector("#lastUpdate");
if (Date.parse(document.lastModified) != 0){
    lastUpdate.textContent = `(Last updated:  ${document.lastModified})`;
}*/

//Curent date and time
updateTime();
setInterval(updateTime, 1000);

function updateTime(){
    let date = new Date();
    date = date.toLocaleString();
    currentDateTime.innerHTML = `Today is:  ${date}`;
}

//Weather API
let weather = {
    "apiKey": "c4efac29ddb8465ea2330101231409",
    fetchWeather: function(city) {
        fetch("https://api.weatherapi.com/v1/current.json?key=c4efac29ddb8465ea2330101231409&q="
        + city)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name, region } = data.location;
        const { temp_f, wind_mph, humidity } = data.current;
        const { text, icon } = data.current.condition;

        document.querySelector(".city").innerHTML = `Weather in ${name}, ${region}`;
        document.querySelector(".temperature").innerHTML = `${Math.round(temp_f)}°F`;
        document.querySelector(".icon").src = icon;
        document.querySelector(".description").innerHTML = text;
        document.querySelector(".humidity").innerHTML = `Humidity: ${Math.round(humidity)}%`;
        document.querySelector(".wind").innerHTML = `Wind Speed: ${Math.round(wind_mph)} mph`;

        //Background image based on device size
        const screenWidth = document.documentElement.clientWidth;
        const screenHeight = document.documentElement.clientHeight;
        document.body.style.backgroundImage = 
            "url('https://source.unsplash.com/" + screenWidth + "x" + screenHeight + "/?" + name + "')";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".searchBar").value);
    },
};

document.querySelector(".searchBar").addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        weather.search()
    }
});

//default search
weather.fetchWeather("New York");



//Conversion of temperatures
/* document.getElementById("submitButton").onclick = function() {
    
    let temp;

    if(document.getElementById("cButton").checked) {
        temp = document.getElementById("tempBox").value;
        temp = Number(temp);
        temp = toCelsius(temp);
        document.getElementById("tempLabel").innerHTML = temp + "°C";
    }
    else if(document.getElementById("fButton").checked){
        temp = document.getElementById("tempBox").value;
        temp = Number(temp);
        temp = toFahrenheit(temp);
        document.getElementById("tempLabel").innerHTML = temp + "°F";
    }
    else{
        document.getElementById("tempLabel").innerHTML = "Please select a unit of conversion!";
    }


}
function toCelsius(temp){
    return (temp - 32) * (5/9);
}
function toFahrenheit(temp){
    return temp * 9 / 5 + 32;
}*/


/*  Simple drawing using canvas API
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

context.strokeStyle = "purple";
context.lineWidth = 10;
context.beginPath();
context.moveTo(0, 0);
context.lineTo(250, 250);
context.lineTo(250, 500);
context.moveTo(500, 0);
context.lineTo(250, 250);
context.stroke();
*/

/* DRAW TRIANGLE
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

context.strokeStyle = "blue";
context.lineWidth = 2;
context.beginPath();
context.moveTo(250, 250);
context.lineTo(200, 250); //bottom left
context.lineTo(300, 250); // bottom right
context.moveTo(200, 250);
context.lineTo(250, 150); // bottom left to top center
context.moveTo(300, 250);
context.lineTo(250, 150);
context.stroke();
*/

/*DRAW RECTANGLE
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

context.fillStyle = "blue";
context.fillRect(0, 0, 250, 250);
context.strokeRect(0, 0, 350, 250);
*/

/*TEXT IN CANVAS
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

context.fillStyle = "lightblue";
context.strokeStyle = "darkblue";
context.lineWidth = 10;
context.beginPath();
context.arc(250, 250, 200, 0, 2 * Math.PI);
context.stroke();
context.fill();

context.font = "50px MV Boli";
context.fillStyle = "grey";
context.textAlign = "center";
context.fillText("You win!", canvas.width / 2, canvas.height / 2);
*/

/* COOKIES
function setCookie(name, value, daysToLive){
    const date = new Date();
    date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}
function deleteCookie(name){
    setCookie(name, null, null);
}
function getCookie(name){
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let result = null;

    cArray.forEach(element => {
        if(element.indexOf(name) == 0){
            result = element.substring(name.length + 1)
        }
    })
    return result;
}*/