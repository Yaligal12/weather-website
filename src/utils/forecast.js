const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=dc88867921d827faed21002e939ad049&query=${longitude},${latitude}`

    request({url:url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to web sevices.", undefined)
        }else if(body.error){
            callback("Unable to find location.", undefined)
        }else{
            callback(undefined,{
                degree: body.current.temperature,
                description: body.current.weather_descriptions[0],
                feels: body.current.feelslike,
                time: body.current.observation_time,
                uv: body.current.uv_index
            } )
        }
    })

}

module.exports = forecast