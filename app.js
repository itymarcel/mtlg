const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const isProduction = process.env.NODE_ENV === 'production';
console.log('is production? : ', isProduction);
console.log('process env db IP: ', process.env.DATABASE_URL);
let poolConfig = {};
if (isProduction) {
  poolConfig = {
    connectionString: process.env.DATABASE_URL
  }
} else {
  poolConfig = {
    host: 'ec2-54-216-202-161.eu-west-1.compute.amazonaws.com',
    port: 5432,
    user: 'kseusygevtwtuy',
    password: '42954951e9b6ac1334290d30c5c5ec4a0df994a4d041008f8c4906b94dd512a9',
    database: 'd85erku0kd3ru9',
    ssl: { rejectUnauthorized: false }
  }
}

const { Pool } = require('pg');
const pool = new Pool(poolConfig);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const getMaterials = (request, response) => {
    console.log('inside get materials: ', pool);
    pool.connect(function(err, client, done) {
        if (err) {
          console.log(err);
        } else {
          client.query('SELECT * FROM materials', (error, results) => {
              if (error) {
                throw error
              }
              console.log(results);
              response.status(200).json(results.rows);
          });
        }
    });
}


app.get('/', getMaterials);



app.listen(isProduction ? process.env.PORT : 3000, () => {
  console.log(`Server listening`, pool);
});