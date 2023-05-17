const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thuesday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
const time1 = document.getElementById('time');
const date1 = document.getElementById('date');
const currentweatheritem1 = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const country1 = document.getElementById('country');
const weatherforecast1 = document.getElementById('weather-forecast');
const currenttemp1 = document.getElementById('current-temp');

//const Api_key = '...'//

setInterval(()=>{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12 = hour >=13 ? hour %12: hour
    const minute = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'
    
    time1.innerHTML = hoursIn12 +':' + minute+ ' ' +`<span id="am-pm">${ampm}</span>`
    date1.innerHTML = days[day] + ',' + date + ' ' + months[month]

},1000);


getweatherdata()
function getweatherdata() {
    navigator.geolocation.getCurrentPosition((success) => {
        let {latitude, longitude} = success.coords;
        // round the results to the nearest tenth decimal place//
        let rounded_lat = Math.round(latitude * 10) / 10;
        let rounded_long = Math.round(longitude * 10) / 10;
        console.log("Original longitude: " + longitude);
        console.log("Rounded longitude: " + rounded_long);
        console.log("Original latitude: " + latitude);
        console.log("Rounded longitude: " + rounded_lat);
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${rounded_lat}&lon=${rounded_long}&exclude=hourly,minutely&units=metric&appid=${Api_key}`).then(res => res.json()).then(data => {console.log(data); showweatherdata(data);})
    })
}

function showweatherdata(data){
let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
currentweatheritem1.innerHTML = 
`<div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}%</div>
</div>
<div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
</div>
<div class="weather-item">
    <div>Wind Speed</div>
    <div>${wind_speed}</div>
</div>
<div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise*1000).format('hh:mm a')}</div>
</div>
<div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset*1000).format('hh:mm a')}</div>
</div>`;


let {dt, temp, feels_like} = data.current;
currenttemp1.innerHTML = `
    <div class="today-weather-forecast-item">
        <div class="day">Today- ${window.moment(dt*1000).format('dd')}</div>
        <div class="temp">Temp- ${temp}&#176; C </div>
        <div class="temp">Feels like- ${feels_like}&#176; C </div>
    </div>
`

let otherdayforcast = ''
    data.daily.forEach((day, idx) => {
    if(idx == 0){

    }else{
        otherdayforcast += `
        <div class="weather-forecast-item">
            <div class="day">${window.moment(day.dt*1000).format('dd')}</div>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="temp">Night- ${day.temp.night}&#176; C </div>
            <div class="temp">Day- ${day.temp.day}&#176; C </div>
    </div>
        
        ` 
    }
})
 
weatherforecast1.innerHTML = otherdayforcast;

}


