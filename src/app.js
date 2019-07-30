const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location  利用.hbs后缀文件建立动态网页
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', { 
        title: 'HELP',
        helptext: 'This is some helpful text.',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me ',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'need a address!'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({error})
            }
            
            forecast(latitude, longitude, (error,forecastData) => {
                if (error) {
                    return res.send(error)
                }

                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
            })
        }) 
    }
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.send({
            error: 'Your must provide a search term'
        })
    } else {
        console.log(req.query.search)
        res.send({
            products: []
        })
    }
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help articale not found',
        title: '404',
        name: 'Andrew Mead'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Andrew Mead'
    })
})

//  app.coms
//  app.com/help
//  app.com/about
//  app.com/whether

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})