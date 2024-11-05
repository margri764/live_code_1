import { Router } from 'express';


import { requireToken } from "../middlewares/require_token.middleware.js";
import { adminRole } from '../middlewares/check-role.middleware.js'


const router =  Router();

router.post('/createUser',[
    requireToken,
    adminRole
], createUser);  

// router.get('/getProductById/:id',[
//     requireToken,
//     userRole
// ], getProductById);  


export default router;
