// ===== DEPENDANCIES ===== //

require('dotenv').config()

const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , session = require('express-session')
    , port = 3009
    , checkUser = require('./middleware/checkUser')


const app = express();


var store = {
    shirts: {
        first: {
            color: 'red',
            size: 'm'
        },
        second: {
            color: 'blue',
            size: 'm'
        }
    },
    pants: {
        first: {
            type: 'jeans',
            color: 'blue'
        },
        second: {
            type: 'capris',
            color: 'white'
        }
    }
}

// ===== TOP LEVEL MIDDLEWARE ===== //

app.use(bodyParser.json());
app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// ===== CUSTOM MIDDLEWARE ===== //

app.use( checkUser )


// ===== ENDPOINTS ===== //



app.get('/store', (req, res) => {
    console.log('hit store')

    if (req.query.search && req.query.search == 'pants'){
        return res.status(200).send(store.pants);
    }

    if (req.query.search && req.query.search == 'shirts'){
        return res.status(200).send(store.shirts);
    }

    if (req.query.color && req.query.color == 'red'){
        var returned = []
        for (var type in store){
            for (var prop in type){
                if (prop.color === 'red'){
                    returned.push(prop)
                }
            }
        }
    }

    res.status(200).send(returned);
})

app.get('/demo/test/:id', (req, res) => {

    // REQUIRED ID
    if (+req.session.user.id === +req.params.id){
        console.log('/demo/test/:id hit -- HAS PARAMS', req.params.id)


        // OPTIONAL QUERY
        if (req.query.info && req.query.info === 'all'){
            return res.status(200).send(`${req.session.user}\n\n THIS RESPONSE COMES FROM OUR QUERY`);
        }

        res.status(200).send(`Welcome back, ${req.session.user.first}!\n\nTHIS RESPONSE HAS PARAMS`);
    }
})


app.get('/demo/test', (req, res) => {

    if (req.session.user.userType !== 'admin') {
        return res.status(401).send('incorrect user type');
    }
    
    // DIFFERENT ENDPOINT. NO ID OR QUERY
    console.log('/demo/test hit -- NO PARAMS')
    res.status(200).send(req.session.user);
})




// ===== APP LISTEN ===== //

app.listen(port, () => {
    console.log('listening on port ' + port)
})