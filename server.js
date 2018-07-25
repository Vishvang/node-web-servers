const express = require('express');

// Load handlebars
const hbs = require('hbs');

var app = express();

// Expres Middleware enable us to configure how your app works without configuring manually using
// fucntion of exp object expresss.static inside middleware function app.us
// export.static takes the absolute path to folder we want to serve 
// __dirname store the path to our project direcotry 
app.use(express.static(__dirname + '/public'));

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
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to Node.js Webserver Demo'
    })
});


app.get('/about', (req, res) => {
    //console.log('About page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
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
app.listen(3000, ()=>{
    console.log('server is up on to port 3000');
});