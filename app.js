const   express = require('express'),
        app = express(),
        dotenv = require("dotenv"),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        cors = require('cors'),
        compression = require('compression'),
        passport = require('passport'),
        LocalStrategy = require('passport-local'),
        session = require('client-sessions'),
        path = require('path'),
        User = require('./models/user.schema'),
        Items = require('./models/shopping-item.schema');

// ESSENTIAL DEPENDENCIES
app.set('view engine', 'ejs');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
        
app.use(session({
    cookieName: 'session',
    secret: 'I love Masumah',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

// MONGOOSE CONFIG
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/grocery-us");
//

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: "Phineas and Ferb",
    resave: "false",
    saveUninitialized: false
}));
  
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
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

    User.register(user, req.body.password, (err, regUser) => {
        if(err) {
            console.log(err);
        } else {
            req.login(regUser, function(err) {
                if (err) { return (err); }
                req.session.user = regUser;
                return res.json(regUser);
              });
        }
    })
})

app.post(
    '/login/user',
    passport.authenticate('local'),
    (req, res) => {
        var user = req.user;
        req.session.user = user;
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

app.post('/items/:id/add', (req, res) => {
    const item = req.body.item;

    User.findById(req.session.user._id, (err, foundUser) => {
        if(err){
            console.log(err)
        } else {
            const existingCartItem = foundUser.cartItems.find(
                cartItem => cartItem._id === item._id)

            if(!existingCartItem){
                item.quantity = 1
                User.findOneAndUpdate({ _id: req.user._id }, { $push: { cartItems: item  } }, (error, success) => {
                        if (error) {
                            console.log(error);
                        } else {
                            return res.json(item)
                        }
                    });
            } else {
                User.updateOne({"cartItems._id": item._id}, { $inc: {'cartItems.$.quantity': 1}}, (err, success) => {
                    if(err){
                        console.log(err)
                    } else {
                        return res.json(item)
                    }
                })
            }
        }
    })
})

app.post('/items/:id/remove', (req, res) => {
    const item = req.body.item;

    User.findById(req.session.user._id, (err, foundUser) => {
        if(err){
            console.log(err)
        } else {
            const existingCartItem = foundUser.cartItems.find(
                cartItem => cartItem._id === item._id)

            if(!existingCartItem.quantity === 1){
                User.findOneAndUpdate({ _id: req.user._id }, { $pull: { cartItems: item  } }, (error, success) => {
                        if (error) {
                            console.log(error);
                        } else {
                            return res.json(item)
                        }
                    });
            } else {
                User.updateOne({"cartItems._id": item._id}, { $inc: {'cartItems.$.quantity': -1}}, (err, success) => {
                    if(err){
                        console.log(err)
                    } else {
                        return res.json(item)
                    }
                })
            }
        }
    })
})

app.post('/items/:id/clear', (req, res) => {
    const item = req.body.item

    User.findOneAndUpdate({ _id: req.user._id }, { $pull: { cartItems: item  } }, (error, success) => {
        if (error) {
            console.log(error);
        } else {
            return res.json(item)
        }
    });
})

app.post('/create-checkout-session', async (req, res) => {
    const { total } = req.body
    const stripe = require('stripe')(process.env.SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            amount: (total * 100).toFixed(),
            quantity: 1,
            currency: 'gbp',
            name: 'cart'
        }],
        mode: 'payment',
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000/basket'
    });
    res.send({
        sessionId: session.id
    })
});
//

dotenv.config()

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT)
})