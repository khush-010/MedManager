require('dotenv').config();

const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const path = require('path');

const session = require("express-session")
const flash = require('connect-flash');

const cookieParser = require('cookie-parser')
app.use(cookieParser());
const {restrictToLoggedInUserOnly} = require('./middlewares/auth')

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(flash());
app.use(express.json())

const {connectMongo} = require("./connect")
connectMongo(process.env.MONGO_URL);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs')

app.use(function (req, res, next){
    res.locals.success = req.flash('success');
    res.locals.info = req.flash('info');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});



const welcomeRoutes = require("./routes/welcomeRoutes")
const authRoutes = require('./routes/authRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const inventoryRoutes = require('./routes/inventoryRoutes')
const billingRoutes = require('./routes/billingRoutes')
const salesRoutes = require('./routes/salesRoutes');

app.use('/',welcomeRoutes)
app.use('/',authRoutes)
app.use('/',restrictToLoggedInUserOnly,dashboardRoutes)
app.use('/',restrictToLoggedInUserOnly,inventoryRoutes)
app.use('/',restrictToLoggedInUserOnly,billingRoutes) 
app.use('/',restrictToLoggedInUserOnly,salesRoutes)

app.listen(port,()=>{
    console.log("SERVER STARTED!!!!");
})