require('dotenv').config()
const app = require('express')()
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , port = 3005


app.use(bodyParser.json())
app.use(cors())

// Order matters. Setup session first, then passport.initialize, then passport.session
app.use(session({
    secret: 'alksfjasldfk',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

// Auth0Strategy is a constructor, so we use the 'new' keyword
passport.use(new Auth0Strategy({
    domain: process.env.AUTH_CLIENT_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: 'http://localhost:3005/auth/callback',
}, function (accessToken, refreshToken, extraParams, profile, done) {
    // null === errors | profile moves to next part of passport
    console.log(profile)
    done(null, profile)
}))

// serializeUser is hit after they have been authenticated, but before they get routed to the callback URL
passport.serializeUser(function(profile, done){
    done(null, profile)
})

// deserializeUser is hit every time the user hits an endpoint, and it verifies that the user is valid
passport.deserializeUser(function(profile, done){
    done(null, profile)
})

// the 'auth0' string that is being passed in, is the strategy that we're using. If we were using the facebook strategy, this would change accordingly
app.get('/auth', passport.authenticate('auth0'))

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/success',
    failureRedirect: '/auth'
}))

app.listen(port, _=> console.log(`Listening on port ${port}`))
