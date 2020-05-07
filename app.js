const   express = require('express'),
        app = express(),
        port = 5000,
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        cors = require('cors'),
        compression = require('compression'),
        passport = require('passport'),
        LocalStrategy = require('passport-local'),
        User = require('./models/user.schema'),
        Items = require('./models/shopping-item.schema');

// MONGOOSE CONFIG
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/grocery-us");
//

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
//

// ESSENTIAL DEPENDENCIES
app.set('view engine', 'ejs');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//

// ROUTES
app.get('/logout', (req, res) => {
    req.logout();
    return res;
})

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
                if (err) { return (err); }
                return res.json(user);
              });
        }
    })
})

app.post(
    '/login/user',
    passport.authenticate('local'),
    (req, res) => {
        var user = req.user;
        return res.json(user);
    }
)

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
//

app.listen(port, () => {
    console.log('Server running')
})