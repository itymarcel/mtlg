const { Pool } = require('pg');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const isProduction = process.env.NODE_ENV === 'production';

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

const pool = new Pool(poolConfig);


module.exports = {
  pool: pool,
  bodyParser: bodyParser,
  isProduction: isProduction
}

