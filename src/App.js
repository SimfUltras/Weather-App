import React from 'react';
import Form from './components/form';
import Info from './components/info';
import Weather from './components/weather';

const API_KEY = '1a0e49474c689831e8e8946fe53e0e6d';

class App extends React.Component {

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        pressure: undefined,
        error: undefined
    }

    gettingWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;


        if (city) {
            const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            const data = await api_url.json();

            let sunset = data.sys.sunset;
            let date = new Date();
            date.setTime(sunset);
            let sunset_date= date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            
            let sunrise = data.sys.sunrise;
            let dateOfSunrise = new Date();
            dateOfSunrise.setTime(sunrise);
            let sunrise_date= dateOfSunrise.getHours() + ':' + dateOfSunrise.getMinutes() + ':' + dateOfSunrise.getSeconds();


            this.setState({
                temp: data.main.temp,
                city: data.name,
                country: data.sys.country,
                sunrise: sunrise_date,
                sunset: sunset_date,
                pressure: data.main.pressure,
                error: undefined
            });
        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                sunrise: undefined,
                sunset: undefined,
                pressure: undefined,
                error: 'Select city'
            });
        }
    }


    render() {
        return (
            <div>
                <Info />
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                    temp={this.state.temp}
                    city={this.state.city}
                    country={this.state.country}
                    sunrise={this.state.sunrise}
                    sunset={this.state.sunset}
                    pressure={this.state.pressure}
                    error={this.state.error}
                />
            </div>
        )
    }
}

export default App;  
