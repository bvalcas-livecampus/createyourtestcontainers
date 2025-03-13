require('dotenv').config();
const { Pool } = require('pg');
const logger = require('@local/simply-logger');
const { EmojisKeys } = require('@local/simply-logger/dist/types');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const connect = async () => new Promise((resolve, reject) => pool.connect((err, client, done) => {
  if (err) {
    logger.error(`Error connecting to database: ${err}`);
    reject(err);
  } else {
    logger.info(`Successfully connected to database at ${process.env.DB_HOST}:${process.env.DB_PORT}`, EmojisKeys.SUCCESS);
    resolve();
  }
}));

const close = async () => new Promise((resolve, reject) => pool.end((err) => {
  if (err) {
    logger.error(`Error closing database connection: ${err}`);
    reject(err);
  } else {
    logger.info('Database connection closed', EmojisKeys.SUCCESS);
    resolve();
  }
}));

module.exports = {
  default: pool,
  connect,
  close
};