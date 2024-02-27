import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';


export const WeatherApp = () => {

    const api_key = process.env.REACT_APP_WEATHER_API_KEY;

    const [weathericon,setWeathericon] = useState(cloud_icon);

    const search = async () =>{
        const element = document.getElementsByClassName("cityinput");
        if(element[0].value===""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
        let response = await fetch(url);
        let result = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-percent");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location"); 
        
        
        humidity[0].innerHTML= result.main.humidity +" %";
        wind[0].innerHTML =Math.floor (result.wind.speed)+" km/h";
        temperature[0].innerHTML = Math.floor(result.main.temp)+"°c";
        location[0].innerHTML = result.name;

        if (result.weather[0].icon === "01d" || result.weather[0].icon === "01n" ){
            setWeathericon(clear_icon);
        } else if(result.weather[0].icon === "02d" || result.weather[0].icon === "02n" ){
            setWeathericon(cloud_icon);
        } else if (result.weather[0].icon === "03d" || result.weather[0].icon === "03n" ){
            setWeathericon(drizzle_icon);
        }else if (result.weather[0].icon === "04d" || result.weather[0].icon === "04n"){
            setWeathericon(drizzle_icon);
        } else if (result.weather[0].icon === "09d" || result.weather[0].icon === "09n" ){
            setWeathericon(rain_icon);
        } else if(result.weather[0].icon === "10d" || result.weather[0].icon === "10n"){
            setWeathericon(snow_icon);
        } else {
            setWeathericon(clear_icon)
        }
        
    }




  return (
<div className='container'>
<div className="top-bar">
<input type='text' className='cityinput' placeholder='Search' />
<div onClick={()=>{search()}} className="search-icon">
    <img src={search_icon} alt='' />
</div>
</div>
<div className="weather-image">
    <img src={weathericon} alt='' />
</div>
<div className="weather-temp">24°c</div>
<div className="weather-location">London</div>
<div className="data-container">
    <div className="element">
        <img src={humidity_icon} alt='' className='icon' />
        <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
        </div>
    </div>
    <div className="element">
        <img src={wind_icon} alt='' className='icon' />
        <div className="data">
            <div className="wind-percent">18km/h</div>
            <div className="text">Wind Speed</div>
</div>
</div>
</div>
    </div>
    
  )
}

export default WeatherApp;