const fs = require('fs');

const express = require('express');

// Load handlebars
const hbs = require('hbs');

// process.env is an object which stores all of our environment variable as key value pairs.  
// Heroku is goin to set one of the environemtn variable name PORT
const port = process.env.PORT || 3000;

var app = express();

app.use((req, res, next) => {
    console.log('Inside of the middleware function.');
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.');
        }
    });
    next(); // letting the server process the request down below.
});

    // This middleware stopes everything after it from executing
    // app.use((req, res, next) => {
    //     res.render('maintenance.hbs');
    // });

// Teach express how to read from static directory by calling appp.use we register middleware and we provide midddleware function whihc we want to use
// Expres Middleware enable us to configure how your app works without configuring manually using
// fucntion of exp object expresss.static inside middleware function app.us
// export.static takes the absolute path to folder we want to serve // __dirname store the path to our project direcotry
// we have to move its order- to make public file to private during maintenance mode and 
// to let execute the express maintenance middleware to execute before it.
app.use(express.static(__dirname + '/public')); 

// setup the file to let know the handlebars that we want to add support for partial.
hbs.registerPartials(__dirname + '/views/partials');

// Handlebar Helpers - register func to run to dynamically creat some output
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// we can pass arg to helper function
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// tells express what engine we had like to use and we pass it in second arg
app.set('view engine', 'hbs');

// route configuration
app.get('/',(req, res) => {
    // render some html using express
    // res.send('<h1>Hello Express</h1>');

    // res.send() going to respond back to req
    // res.send({
    //     name: 'Vishvang',
    //     age:25,
    //     likes: ['painting','cycling']
    // });

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Node.js Webserver Demo'
        // currentYear: new Date().getFullYear()
    })
});

// This are req handler
app.get('/about', (req, res) => {
    //console.log('About page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
        // currentYear: new Date().getFullYear()
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        projectMessage: 'Portfolio Page Here'
    });
});

// bad - send back json with errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to handle request'
    });
});

// By calling this we let app to start listening to req
// here, we are using local port 3000
app.listen(port, ()=>{
    console.log(`server is up on to port ${port}`);
});