import { useEffect, useState } from "react"
import weatherService from "../services/weather"

const Weather = ({ city }) => {

    const [weather, setWeather] = useState([]);

    useEffect(() => {
        weatherService.getCurrentWeatherByCoordinates(city)
                        .then(  returnData => setWeather(returnData))
    }, [])
    
    if (!weather.main) return null

    const { main: { temp }, wind: { speed }, weather: [{ icon }] } = weather;
    
    return (
        <>                     
            <h2>Weather in { city }</h2>
            
            <div>temperature { temp } Celsius</div>
            <img
            alt="weather icon"
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          />
          <div>wind {speed} m/s</div>
        </>
    )

}

export default Weather