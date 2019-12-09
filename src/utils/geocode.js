const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibGlrZXJvZ2UiLCJhIjoiY2szdTZ2dm92MDlvYTNtcHNlZXNyOW9uZyJ9.Tiz_SXOtTEP0Mqf2jFenQA&limit=1'

    request({url: url, json: true}, (err, response)=>{
        if(err){
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length===0){
            callback('Uneble to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
};

module.exports = geocode