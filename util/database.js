const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'shubhamdangi', {dialect: 'mysql', host:'localhost'});

module.exports = sequelize;