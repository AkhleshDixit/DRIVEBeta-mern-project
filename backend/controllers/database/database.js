const mongoose = require('mongoose');

const database = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then((result) => {
        console.log("connection done");
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = database