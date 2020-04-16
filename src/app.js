const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Create Express Aplication
const app = express()
const port = process.env.PORT || 3000

// Define paths for express config.
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


// Setup handlers for HTTP GET requests

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Ahmed Usama"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Ahmed Usama"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Ahmed Usama"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: "You must provide an address" })
    }
    geocode(req.query.search, ({ latitude, longitude, location } = {}, error) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (forecast, error) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: "You must provide a search term" })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Ahmed Usama",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Ahmed Usama",
        message: "Page not found"
    })
})

// Start up the server & has it listen at port 3000
app.listen(port, () => {
    console.log(`Server is up on port ${port} ...`)
})

