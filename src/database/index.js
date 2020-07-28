const Sequelize = require('sequelize');
const dbconfig = require('../config/database');

const User = require('../models/User');
const Address = require('../models/Address');

const connection = new Sequelize(dbconfig);

User.init(connection);
Address.init(connection);

Address.associate(connection.models);

module.exports = connection;
