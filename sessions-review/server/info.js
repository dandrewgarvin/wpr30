require('dotenv').config()

const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , session = require('express-session')
    , port = 3009
    , checkUser = require('./middleware/checkUser')


const app = express();

// ===== TOP LEVEL MIDDLEWARE ===== //
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// ===== CUSTOM MIDDLEWARE ===== //

// 
app.use( checkUser )


// ===== ENDPOINTS ===== //

app.get('/demo/test/:id', (req, res) => {
    //               ^
    //       > - - - ^
    //       ^
    // THIS ID IS REQUIRED. IF I DONT HAVE IT, MY ENDPOINT DOESNT GET HIT
    if (+req.session.user.id === +req.params.id){
        console.log('/demo/test/:id hit -- HAS PARAMS', req.params.id)


        // WHAT THE CLIENT TYPES: axios.get('http://localhost:3001/demo/test/0?info=all').then(...)
        //                                                                        ^
        //        > - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ^
        //        ^
        // THIS QUERY IS OPTIONAL. MY ENDPOINT WILL STILL WORK EVEN IF I DONT INCLUDE THIS SEARCH TERM
        if (req.query.info && req.query.info === 'all'){
            return res.status(200).send(`${req.session.user}\n\n THIS RESPONSE COMES FROM OUR QUERY`);
        }


        res.status(200).send(`Welcome back, ${req.session.user.first}!\n\nTHIS RESPONSE HAS PARAMS`);
    }
})

app.get('/demo/test', (req, res) => {

    // THIS ENDPOINT IS HIT IF THERE IS NO PARAMETERS SENT IN THE URL FROM THE CLIENT
    console.log('/demo/test hit -- NO PARAMS')
    res.status(200).send(`${req.session.user}\n\nTHIS RESPONSE HAS NO PARAMS`);
})





app.listen(port, () => {
    console.log('listening on port ' + port)
})