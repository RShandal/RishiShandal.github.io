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

        //Background image based on device size, parsed to get image related to search
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