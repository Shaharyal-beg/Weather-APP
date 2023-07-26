import React, { useEffect, useState } from 'react'
import './style.css'
import SearchIcon from '@mui/icons-material/Search';
import Sunny from './Images/sunny.jpg'
import cloudy from './Images/cloudy.png'
import rain from './Images/raining.jpg'
import clear from './Images/clear-sky.jpg'
import humidity from './Images/humidity.jpg'
import axios from 'axios';

const Home = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [data, setData] = useState({
        celcius: 10,
        name: 'london',
        humidity: 12,
        speed: 2,
        image: Sunny,
    })

    const handleClick = e => {
        if (name !== '') {
            const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=100c1be17aeb216ee85cf6184ed80989&unit=metric`;
            axios.get(apiURL)
                .then(res => {
                    let imagePath = '';
                    if (res.data.weather[0].main == 'Clouds') { imagePath = cloudy }
                    else if (res.data.weather[0].main == 'Sunny') { imagePath = Sunny }
                    else if (res.data.weather[0].main == 'Clear') { imagePath = clear }
                    else if (res.data.weather[0].main == 'Rain') { imagePath = rain }
                    else{imagePath= humidity}
                    console.log(res.data)
                    setData({
                        ...data, celcius: res.data.main.temp, name: res.data.name,
                        humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagePath
                    })
                    setError('')
                })
                .catch(err =>{
                    if(err.response.status == 404){
                        setError("Invalid City Name")
                    }
                    else{setError('');}
                 console.log(err)});
        }
    }



    return (
        <div className='container'>
            <div className='weather'>
                <div className='search'>
                    <input type='text' placeholder='Enter Your City' onChange={e => setName(e.target.value)} />
                    <button onClick={handleClick}><SearchIcon /></button>
                </div>
                <div className='error'>
                    <p style={{color:'red',fontWeight:600,fontSize:'20px'}}>{error}</p>
                </div>
                <div className='weather-info'>
                    <img src={data.image} />
                    <h1>{data.celcius}°C</h1>
                    <h2>{data.name}</h2>
                    <div className='details'>
                        <div className='col'>
                            <img src={Sunny} alt='#' />
                            <p>{data.humidity}%</p>
                            <p>Humidity</p>
                        </div>
                        <div className='col'>
                            <img src={Sunny} alt='#' />
                            <p>{data.speed} km/h</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home