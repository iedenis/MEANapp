const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const app = express();
const port = 3000;
require('./config/passport')(passport);

mongoose.connect(config.database, { useNewUrlParser: true }, (error) => {
    if (error) console.log('there is a problem with connection');
    else console.log('db is connected')
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

const users = require('./routes/users');


app.get('/', (req, res, next) => {
    res.send("Denis");
})

app.use('/users', users);


app.listen(port, () => {
    console.log("Server started on port " + port);

})