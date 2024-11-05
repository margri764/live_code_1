import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import {dbConnection}  from '../db/config.db.js';
dotenv.config();

import { PORT } from '../config.js';

//routes
import authRoutes from '../routes/auth.routes.js';
import productRoutes from '../routes/product.routes.js';

class Server{

    constructor(){
        this.app = express();
        this.port = PORT
        this.initialize();

    }

    async initialize() {
        
        try {
            await dbConnection();

            // Configurar cron jobs

            // Configurar middlewares y rutas
            this.middlewares();
            this.routes();
        } catch (error) {
            console.error('Error initializing server del cron job:', error);
        }
    }


    middlewares(){
        
        this.app.use(cors());
        
        this.app.use (express.json());

        this.app.use(express.static('public'));

    }    

    routes(){
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/product', productRoutes);
        
        
        this.app.get('*', (req, res) => { 
            
        const __dirname = path.resolve(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1'));
        
        const indexPath = path.resolve(__dirname, '../../public/index.html');
        res.sendFile( indexPath )
        });
        }

    listen(){
        this.app.listen(this.port)
        console.log(`Servidor corriendo en puerto, ${this.port}, (${process.env.NODE_ENV})`)

    }

}

export default Server ;