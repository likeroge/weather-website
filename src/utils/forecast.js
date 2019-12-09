const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/dcbddcbe62f7ef0caa20bd95a03b4bb9/'+latitude + ','+longitude

    request({url:url, json: true}, (err, response)=>{
        if(err){
            callback('Unable to connect to wx service', undefined)        
        } else if (response.body.error){
            callback('Unable to find location. Try another request', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + ((response.body.currently.temperature-32)/1.8).toFixed(2) + ' degress out. This high today is '+ ((response.body.daily.data[0].temperatureHigh-32)/1.8).toFixed(2)+' with a low of '+ ((response.body.daily.data[0].temperatureLow-32)/1.8).toFixed(2) +'. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast