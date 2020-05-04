const   express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        cors = require('cors'),
        compression = require('compression'),
        passport = require('passport'),
        LocalStrategy = require('passport-local'),
        User = require('./models/user.schema'),
        seedDB = require('./seed');
        Items = require('./models/shopping-item.schema');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/grocery-us");

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res) => {
    res.locals.currentUser = req.user;
});

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: "I love Masumah",
    resave: "false",
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');

app.post('/register/newuser', (req, res) => {
    const user = {
        name: req.body.name,
        address1: req.body.address1,
        address2: req.body.address2,
        towncity: req.body.towncity,
        postcode: req.body.postcode,
        username: req.body.email,
    }
    
    User.register(user, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
        } else {
            req.login(user, function(err) {
                if (err) { return next(err); }
                return res.json(user);
              });
        }
    })
})

app.get('/logout', (req, res) => {
    console.log(req);
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/items', (req, res) => {
    Items.find({}, (err, allItems) => {
        if (err) {
            console.log(err)
        } else {
            return res.json(allItems);
        }
    })
})

app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    
    Items.findById(id, (err, item) => {
        if(err){
            console.log(err)
        } else {
            return res.json(item);
        }
    })
})

app.listen(4000, () => {
    console.log("Server is running...");
});