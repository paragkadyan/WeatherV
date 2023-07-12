//http://api.weatherapi.com/v1/current.json?key=ea42e66ce6c948399a7165502231107&q=dubai


const container = document.querySelector(".container" );
const search = document.querySelector(".search-box button" );
const weatherBox = document.querySelector(".weather-box" );
const weatherDetails = document.querySelector(".weather-details" );
const error404 = document.querySelector(".not-found" );

search.addEventListener("click", () => {
    const apikey = "ea42e66ce6c948399a7165502231107";
    const city = document.querySelector(".search-box input").value;

    if(city === ""){
        return;
    }
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`).then(Response => Response.json()).then(json => {

    if (json.error && json.error.code === 1006) {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
    }

    error404.style.display = "none";
    error404.classList.remove("fadeIn");

    weatherBox.querySelector("img").src = `https:${json.current.condition.icon}`;

    
    const temperature = document.querySelector('.weather-box .temp');
    const description = document.querySelector('.weather-box .desc');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');


    temperature.innerHTML = `${parseInt(json.current.temp_c)}<span>°C</span>`;
    description.innerHTML = `${json.current.condition.text}`;
    humidity.innerHTML = `${json.current.humidity}%`;
    wind.innerHTML = `${parseInt(json.current.wind_kph)}Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
    })
})