const request = require('request')

// //Geocoding 获取经纬度
// //Address -> Lat/Long -> Weather

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)  + '.json?limit=1&access_token=pk.eyJ1IjoieGZ6aGFuZyIsImEiOiJjanZmYTA5aGswYWw0NDNxbDJlbnk1djVwIn0.kgzzm5w0OaFR317v6MWkDg'

    request({url, json: true},(error, { body }) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode