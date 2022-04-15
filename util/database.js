const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

//const sequelize = new Sequelize('node-complete', 'root', 'shubhamdangi', {dialect: 'mysql', host:'localhost'});

const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USERNAME , process.env.DB_PASSWORD, {dialect: 'mysql', host: process.env.DB_HOST });


module.exports = sequelize;

/*DB_NAME = 'ecommerceDB'
DB_USERNAME = 'sdangi23'
DB_PASSWORD = 'shubhamdangi123'
DB_HOST = 'ecommercedatabase.cyrorjbk5rja.us-east-1.rds.amazonaws.com'*/

/* 
DB_NAME = node-complete
DB_USERNAME = root
DB_PASSWORD = shubhamdangi
DB_HOST = localhost
*/
