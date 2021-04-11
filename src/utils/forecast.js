const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=56cc1f54fdc64023f6f0706ab8b06526&query=' + latitude + ',' + longitude + '&units=f'
    request({url,json:true},(error,{body})=>{
        //console.log
        if(error){
            callback('Unable to connect to weather services',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location',undefined)
        }
        else{
           // console.log(body.current.cloudcover)
            callback(undefined, body.current.weather_descriptions[0]+'  . It is currently '+ body.current.temperature +' degrees out.It feels like ' + body.current.feelslike + '  degrees out . The humidity is'+ body.current.humidity+ '%')
        }

    })

}
module.exports=forecast