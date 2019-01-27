const express = require('express');
const app = express();
const path = require('path');

const port = process.env.NODE_PORT || 5555;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(
    path.join(__dirname, 'public')
));
app.enable('trust proxy');

// current_ip will hold the ip address of the home network
var current_ip = '';

app.get('/', (req, res) => {
    res.render('index', {
        current_ip: current_ip
    });
});

app.get('/redirect', (req, res) => {
    if (current_ip.length) {
        res.redirect("http://" + current_ip);
    } else {
        res.send("No ip, program.");
    }
});

app.post('/', (req, res) => {
    // grab the remote client ip address and store in current_ip
    current_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.send("Updated to " + req.ip);
});

app.listen(port, () => console.log(`running on ${port}`));
