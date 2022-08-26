import express from 'express';
import authJwt from '../controllers/api/middlewares/authJwt';
import admin from './api/admin.routes';
import auth from './api/auth.routes';
import category from './api/category.routes';
import products from './api/product.routes';
import users from './api/user.routes';





const routes = express.Router();



routes.use('/auth', auth);
routes.use('/users' ,authJwt.verifyToken, users);
routes.use('/admin',[authJwt.verifyToken, authJwt.isModeratorOrAdmin], admin);



    export default routes;