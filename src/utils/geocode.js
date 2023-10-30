const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoieWFsaWdhbCIsImEiOiJjbG9iOHhsc20wcmxxMnBxcDc4cHVrZzF2In0.uVBBMBGK-bUNG1HN5NnMVg`
    request({url:url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to web service.", undefined)
        }else if(!body.features || body.features.length === 0){
            callback("Unable to find location. Try another search.", undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode