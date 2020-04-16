const axios = require('axios')

const forecast = (lati, longi, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=678ee617ce2765d8902d0be9de88ae6b&query=${lati},${longi}`
    axios.get(url)
        .then(({ data }) => {
            if (data.error) {
                callback(undefined, "Unable to find location!")
            } else {
                callback(`${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees - Humadity: ${data.current.humidity} - Wind Speed: ${data.current.wind_speed}`, undefined)
            }
        })
        .catch(() => callback(undefined, "Unable to connect to forecast service!"))
}

module.exports = forecast