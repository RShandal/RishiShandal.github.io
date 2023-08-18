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
