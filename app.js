const express = require('express')
const morgan = require('morgan')

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://milkeyroise:KgaugeloTladi333@cluster0.9vez7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// register view engine
app.set('view engine', 'ejs')

// listen for requests 
app.listen(3000)

// middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Loren ipsum dolor sit anet consectetur'},
        {title: 'Mario finds stars', snippet: 'Loren ipsum dolor sit anet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Loren ipsum dolor sit anet consectetur'},
    ];
    //res.send('<p>home page</p>')
    res.render('index', { title: 'Home', blogs })
})

app.get('/about', (req, res) => {
    //res.sendFile('./views/about.html' , { root: __dirname })
    res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' })
})

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// 404 page
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404', { title: '404' })
})