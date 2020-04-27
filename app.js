const   express = require('express'),
        app = express(),
        router = express.Router(),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose');

const Items = require("./models/shopping-item.schema")

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/grocery-us");

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send("Hello World")
});

app.get('/fresh-produce', (req, res) => {
    Items.find({}, (err, allItems) => {
        if(err){
            console.log(err)
        } else {
            res.render('fresh-produce', {items: allItems})
        }
    });
});

app.listen(4000, () => {
    console.log("Server is running...");
});