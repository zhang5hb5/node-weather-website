const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2304de93a80ff8e00195fd7e36076357/' + latitude + ',' + longitude + '?lang=zh&units=si'
    request({url, json: true},(error,{ body }) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,  body.daily.data[0].summary + '最高温度为：' + body.daily.data[0].temperatureHigh + "，最低温度为："+  body.daily.data[0].temperatureLow + '。现在是:'+ body.currently.temperature + '℃   降水概率为' + body.currently.precipProbability)
        }
    })

}

module.exports = forecast