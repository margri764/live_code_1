import dotenv from 'dotenv';
dotenv.config();

//enviroment
export const NODE_ENV = process.env.NODE_ENV

//ports
export const PORT = process.env.NODE_ENV === 'production' ? ( 4000 ) : ( 3000);

export const MONGODB = process.env.MONGODB 

export const SECRETORPRIVATEKEY = process.env.SECRETORPRIVATEKEY 