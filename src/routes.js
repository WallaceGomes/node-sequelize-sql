const express = require('express');
const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const TechController = require('./controllers/TechController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.post('/users/:user_id/address', AddressController.store);
routes.get('/users/:user_id/address', AddressController.index);

routes.post('/users/:user_id/techs', TechController.store);
routes.get('/users/:user_id/techs', TechController.index);
routes.delete('/users/:user_id/techs', TechController.delete);



module.exports= routes;
