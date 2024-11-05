import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        
        console.log('base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la db');
    }
};
