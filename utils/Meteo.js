export class MeteoAPI {
    static async fetchWeatherFromCoords(coords) {

        const url = 'https://api.open-meteo.com/v1/forecast?' + new URLSearchParams({
            latitude: coords.lat,
            longitude: coords.lng,
            daily: ["weather_code", "temperature_2m_max", "sunrise", "sunset", "wind_speed_10m_max"],
            timezone: 'auto',
            current_weather: 'true'
        })

        const res = await fetch(url);
        return res.json()
    }

    static interpretWeather(weatherCode) {
        return MeteoAPI.WEATHER_INTERPRETATIONS.find(interpretation => interpretation.codes.includes(weatherCode));
    }

    static WEATHER_INTERPRETATIONS = [
        {
            codes: [0],
            label: 'Sunny',
            image: require('../assets/images/sun.png')
        },
        {
            codes: [1, 2, 3, 45, 48],
            label: 'Cloudy',
            image: require('../assets/images/clouds.png')
        },
        {
            codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 85, 86],
            label: 'Rainy',
            image: require('../assets/images/rain.png')
        },
        {
            codes: [71, 73, 75, 77],
            label: 'Snowy',
            image: require('../assets/images/snow.png')
        },
        {
            codes: [96, 99],
            label: 'Thunderstorm',
            image: require('../assets/images/thunder.png')
        }
    ]
}