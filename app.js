const express = require('express');
const router = express.Router();
const cors = require('cors');

const config = require('./config');
const app = express();

app.use(config.bodyParser.urlencoded({extended: true}));
app.use(config.bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/* ---------- ROUTES --------- */
const getMaterials = require('./controller/materials/getmaterials');

app.use('/materials', getMaterials);


app.listen(config.isProduction ? process.env.PORT : 4000, () => {
  console.log(`Server listening`);
});