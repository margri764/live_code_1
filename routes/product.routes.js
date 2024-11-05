import { Router } from 'express';

import { createProduct, getAllProducts, getProductById } from "../controllers/product.controllers.js";
import { requireToken } from "../middlewares/require_token.middleware.js";
import { userRole } from '../middlewares/check-role.middleware.js'


const router =  Router();

router.post('/createProduct',[
    requireToken,
    userRole
], createProduct);  

router.get('/getProductById/:id',[
    requireToken,
    userRole
], getProductById);  

router.get('/getAllProducts',[
    requireToken,
    userRole
], getAllProducts);  


export default router;
