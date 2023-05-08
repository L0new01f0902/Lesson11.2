const searchInput = document.getElementById("search-input");
const temp = document.getElementById("degree")
const humidity = document.getElementById("humidity");
const city_name = document.getElementById("city-name");
const weather_icon = document.getElementById("weather-icon");
const API_KEY = '0d8bbe9f553479a5b11480b3b1bbaf7d';
const loginbutton = document.getElementById("loginbutton");
const signupbutton = document.getElementById("signupbutton");
const loginName = [];
const loginPassword = [];
const username = [];
localStorage.setItem("login-name", loginName);
localStorage.setItem("login-password", loginPassword);
localStorage.setItem("username", username);
document.addEventListener("change", (event) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&appid=${`73f5f9cae2bcf7c7aaa39544902dd7cc`}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            city_name.innerHTML = data.name || DEFAULT_VALUE;
            weather_icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` || DEFAULT_VALUE;
            temp.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;  
            humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;     
        }).catch(err => err.message);
});
loginbutton.addEventListener("click", login);
signupbutton.addEventListener("click", signup);
function signup(){
    let form_email = document.getElementById("email").value;
    let form_name = document.getElementById("name").value;
    let form_password = document.getElementById("password").value;
    let form_repeat_password = document.getElementById("repeat-password").value;
    console.log(form_email);
    console.log(form_password);
    console.log(form_name);
    console.log(form_repeat_password);
    if (form_password.length <= 8) {
        alert("Password must be at least 8 characters long");
    } else if (form_password == form_repeat_password && ValidateEmail(form_email)){
        if (!form_name) {
            alert("Please provide your name");
        } else {
            alert("Register successful");
            loginName.splice(0, 0, form_email);
            loginPassword.splice(0, 0, form_password);
            username.splice(0, 0, form_name);
            window.open("/index.html");
        }
    } else if(form_password != form_repeat_password){
        alert("Register failed due to incorrect password");
    } else if(!ValidateEmail(form_email)){
        alert("Register falied due to invalid email");
    }
}
function ValidateEmail(register_email){
    const regex_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex_pattern.test(register_email)) 
    {
        console.log("true");
        return true;
    } else {
        console.log("false");
        return false;
    }
}
function checkPassword(){
    let login_password = document.getElementById("password").value;
    for(let i = 0; i < loginPassword.length; i++){
        if(loginPassword[i] == login_password){
            return true;
        }
        else{
            return false;
        }
    }
}
function checkLoginEmail(){
    let login_email = document.getElementById("email").value;
    for(let i = 0; i < loginPassword.length; i++){
        if(loginName[i] == login_email){
            return true;
        }
        else{
            return false;
        }
    }
}
function login(){
    if(checkLoginEmail == true && checkPassword == true){
        alert("Login successful");
    }
    else if(checkLoginEmail == false){
        alert("Please check your email")
    }
    else{
        alert("Please check your password")
    }
}
function getLocationName(){
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(function(position) {
        // Get the latitude and longitude from the position object
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        // Make a request to the OpenWeatherMap API to get the name of the closest city
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
          .then(response => response.json())
          .then((data) => {
            // Update the city name element with the name of the closest city
            city_name.innerHTML = data.name;
          })
          .catch(err => console.log(err.message));
      });
    } else {
      // Geolocation is not supported by the browser
      console.log("Geolocation is not supported by this browser.");
    }
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async position => {
    const { latitude, longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data); // Weather information for the user's location
    } catch (error) {
      console.error(error);
    }
  }, error => {
    console.error(error);
  });
}
getLocationName.addEventListener('load', document);