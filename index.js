// window.alert("Note: This site is currently under construction!");

/*let zipcode;

document.getElementById("cityZipSearchBtn").onclick = function() {
    zipcode = document.getElementById("zipcode").value;
    console.log(zipcode);
}*/

//Curent date and time
updateTime();
setInterval(updateTime, 1000);

function updateTime(){
    let date = new Date();
    date = date.toLocaleString();
    currentDateTime.innerHTML = `Today is:  ${date}`;
}

//Conversion of temperatures
document.getElementById("submitButton").onclick = function() {
    
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
}




//PLAY BELOW
//
const element = document.getElementById("myDiv");
element.onmousedown = doSomething;
element.onmouseup = doSomethingElse;
function doSomething(){
    element.style.backgroundColor = "red";
}
function doSomethingElse(){
    element.style.backgroundColor = "lightgreen";
}

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