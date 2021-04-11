const path=require('path')
const express=require('express')
const hbs=require('hbs')// for partial
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')





const app=express()
const port=process.env.PORT || 3000
//Define paths for express config

app.use(express.static(path.join(__dirname,'../public')))//setup static directory to server

const viewsPath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialpath)
app.get('',(req,res)=>{

    res.render('index',{
        title:'weather app',
        name:'mansi'
    })
})
app.get('/about',(req,res)=>{

    res.render('about',{
        title:'About me',
        name:'Mansi'
    })
})
app.get('/help',(req,res)=>{

    res.render('help',{
        helptext:'This is some helpful text',
        title:'Help',
        name:'Mansi'
    })
})
app.get('/weather',(req,res)=>{
if(!req.query.address)
{
    return res.send({
        error:'must provide an address'
    })

}
geocode(req.query.address,(error,{latitude,longitude,location}={
    
})=>{
if(error)
{
    return res.send({error})
}
forecast(latitude,longitude,(error,forecastdata)=>{
if(error){
    return res.send({error})
}
res.send({
    forecast:forecastdata,
    location,
    address:req.query.address
})

})
})
//     res.send({
// forecast:'It is snowing',
// Location :'Vidisha',
// address:req.query.address
//     })
})
app.get('/products',(req,res)=>{
if(!req.query.search)
{
   return res.send({
        error:'must provide search item'
    })
}
console.log(req.query.search)

    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Mansi',
        ERROR:'help article not found'
    })

})

app.get('*',(req,res)=>{//here * means that doesnot match that we provided


    res.render('404',{
        title:'404',
        name:'Mansi',
        ERROR:'Page not found'
    })
})




app.listen(port,()=>{
    console.log('listen on port no ' + port)
})
