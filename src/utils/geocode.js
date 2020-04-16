const axios = require('axios')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW9hOTciLCJhIjoiY2s4bXJ3d2JvMDRwaTNucDNsNHk2dG1uaiJ9.TByTucTw1btSAJK-E-sKKg&limit=1`
    axios.get(url)
        .then(({ data }) => {
            if (data.features.length === 0) {
                callback(undefined, "Unable to find location, try another search")
            } else {
                callback({
                    latitude: data.features[0].center[1],
                    longitude: data.features[0].center[0],
                    location: data.features[0].place_name
                }, undefined)
            }
        })
        .catch(() => callback(undefined, "Unable to connect to location services!"))
}

module.exports = geocode
