import React, { useState } from 'react'
import "./Main.css"
import search from "./assets/search.png"
import cloud from "./assets/cloud.png"
import humidity from "./assets/humidity.png"
import wind from "./assets/wind.png"
import clear from "./assets/clear.png"
import axios from 'axios'
import rain from "./assets/rain.png"
import drizzle from "./assets/drizzle.png"
import snow from "./assets/snow.png"


function Home() {
    const [data,setData]= useState({
        celcius: 26,
        name: "Pune",
        humidity: 23,
        speed: 2,
        image: cloud
    })

    const[name, setName]= useState('');
    const[error, setError] = useState('');
   
    
    const handleClick=() =>{
        if(name!==""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a2273e14f9474e8a259df41a75fcaf82&&units=metric`;
            axios
            .get(apiUrl)
            .then(res => {
                let imagePath= cloud;
                if(res.data.weather[0].main == "Clouds"){
                    imagePath= cloud
                } else if (res.data.weather[0].main == "Clear"){
                    imagePath= clear
                } else if (res.data.weather[0].main == "Rain"){
                    imagePath= rain
                } else if (res.data.weather[0].main == "Drizzle"){
                    imagePath= drizzle
                } else if (res.data.weather[0].main == "snow"){
                    imagePath= snow
                } else {
                    imagePath= cloud
                }

                console.log(res.data);
                setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, 
                image: imagePath})
            })
            .catch( err => {
                if(err.response.status == 404){
                    setError("Invalid City Name")
                } else{
                    setError('');
                }
                console.log(err)});
            }
        
    }
  return (
    <div className='container'>
        <div className="weather">
            <div className="search">
                <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)}/>
                <button><img src={search} onClick={handleClick} alt='Image which contain Search icon'/></button>
            </div>
            <div className="error">
                <p>{error}</p>
            </div>

            <div className="climate">
                <img src={data.image} className='icon'  alt=''/>
                <h1>{Math.round(data.celcius)}°C</h1>
                <h2>{data.name}</h2>
                <div className="details">
                    <div className="col">
                        <img src={humidity} alt=''/>
                        <div className='humidity'>
                            <p>{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                        
                    <div className="col">
                    <img src={wind} alt=''/>
                    <div className='wind'>
                        <p>{Math.round(data.speed)} km/hr</p>
                        <p>Wind</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
   
  )
}

export default Home