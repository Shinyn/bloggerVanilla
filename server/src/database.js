const dotenv = require("dotenv").config();
const mysql = require("mysql2");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};

exports.pool = mysql.createPool(config);
