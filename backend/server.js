const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDatabase = require('./controllers/database/database');
const path = require('path');

//setting up config file
dotenv.config({ path: `backend/config/config.env` });

//setting up loacalStorage
if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

//connecting database
connectDatabase();

//setting up template engine
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

//setting up static folders/files
app.use('/backend/assets',express.static(__dirname + '/assets'));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setting up routes
app.use('/', require('./routes/account'));
app.use('/', require('./routes/user'));

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


app.listen(process.env.PORT, console.log(`listening on ${process.env.PORT} in ${process.env.NODE_ENV} mode.`));