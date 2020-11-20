const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const isProduction = process.env.NODE_ENV === 'production'
console.log('is production: ', isProduction);


const conStr = isProduction ? process.env.DATABASE_URL : "postgres://kseusygevtwtuy:42954951e9b6ac1334290d30c5c5ec4a0df994a4d041008f8c4906b94dd512a9@ec2-54-216-202-161.eu-west-1.compute.amazonaws.com:5432/d85erku0kd3ru9?ssl=true";
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: "postgres://kseusygevtwtuy:42954951e9b6ac1334290d30c5c5ec4a0df994a4d041008f8c4906b94dd512a9@ec2-54-216-202-161.eu-west-1.compute.amazonaws.com:5432/d85erku0kd3ru9?ssl=true"
});
console.log(pool);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const getMaterials = (request, response) => {
    console.log('get materials', pool);
    pool.connect(function(err, client, done) {
        console.log('connected');
        client.query('SELECT * FROM materials', (error, results) => {
            if (error) {
              throw error
            }
            console.log(results);
            response.status(200).json(results.rows);
        });
    });
}


app
  .route('/materials')
  // GET endpoint
  .get(getMaterials)



app.listen(isProduction ? process.env.PORT : 3000, () => {
  console.log(`Server listening`)
});