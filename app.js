const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongoDB
const dbURI = "mongodb+srv://milkeyroise:KgaugeloTladi333@cluster0.9vez7.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(`${dbURI}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    //res.sendFile('./views/about.html' , { root: __dirname })
    res.render('about', { title: 'About' })
})

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
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