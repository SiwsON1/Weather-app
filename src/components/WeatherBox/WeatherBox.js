import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
import { useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback (city => {
    setPending(true);
    setError(false);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=69f270200b6fe2e65d6813a80b615667&units=metric`)
      .then(res => {
        if(res.status === 200) {
          return res.json()
            .then(data => {
              const weatherData = {
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
                
            };
            setPending(false);
            setCity(weatherData.city)
            setTemp(weatherData.temp)
            setIcon(weatherData.icon)
            setDescription(weatherData.description)
      
            })
          } else {
            setError(true);
          }
      });
      }, []);

  
  return (
    <section>
      <PickCity action = {handleCityChange} />
      {(city && (pending===false)) &&  <WeatherSummary icon={icon} temp={temp} city={city} description={description} />}
      {error===false &&(pending===true) &&<Loader />}
      {error===true && <ErrorBox>There is no such City !</ErrorBox>}
    </section>
  )
};

export default WeatherBox;