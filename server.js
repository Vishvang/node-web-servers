const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => {
    // res.send('<h1>Hello Express</h1>');
    res.send({
        name: 'Vishvang',
        age:25,
        likes: ['painting','cycling']
    });
});

// bad - send back json with errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to handle request'
    });
});

app.listen(3000);