const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 8080

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'build')

// Setup handlebars engine and views location
// app.set('view engine', 'hbs')
// app.set('views', viewsPath)
// hbs.registerPartials(partialsPath)

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../build')))
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
  })
}

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.static('public'))
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// app.get('/', (req, res) => {
//   // res.sendFile(path.join(__dirname, '../../frontend/weather-app/public' , 'build', 'index.html'))
//   res.send('lol')
// })

// app.get('/about', (req,res) => {
//     res.send('hey')
// })

// app.get('/help', (req,res) => {
//     res.render('help', {
//         title:'Help',
//         helpText:'This is some helpful text',
//         name:'Filip'
//     })
// })

app.get('/weather/:address', (req, res) => {
  const address = req.params.address
  if (!address) {
    return res.send({
      error: 'You must provide an address!',
    })
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error: 'EH VRE' })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: 'EEEEEEEEEJ' })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      })
    })
  })
})

// app.get('/products',(req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error:'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })

// app.get('/help/*' , (req,res) => {
//     res.render('404', {
//         title:'404',
//         name:'Filip',
//         errorMessage:'Help article not found'
//     })
// })

// app.get('*', (req, res) => {
//     res.render('404', {
//         title:'404',
//         name:'Filip',
//         errorMessage:'Page not found'
//     })
// })

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
