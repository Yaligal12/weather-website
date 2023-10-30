const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Yali Gal'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Yali Gal'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        name: 'Yali Gal',
        title: 'Help',
        message: 'This is the message!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(req.query.address,(error, {longtitude, latitude, location} = {}) => {
        if(longtitude){
            forecast(longtitude, latitude, (error, {degree, description,feels}) => {
                if(degree){
                    return res.send({
                        forecast: "In "+ location + " It is " + degree + " degrees, it feels like "+feels+" degrees and it is "+description+".",
                        location: location
                    })
                }else{
                    return res.send({error})
                }
            })
        }else{
            return res.send({error})
        }
    })
})

app.get('/product', (req, res) => {
    if (!req.query.name){
        return res.send({
            error : 'You must provide a name'
        })
    }
    console.log(req.query.name)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: '404',
        name: 'Yali Gal',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title: '404',
        name: 'Yali Gal',
        message: 'Page not found.'
    })
})
 
app.listen(3000)