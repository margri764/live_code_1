import jwt from 'jsonwebtoken';

const generateToken = async ( email ) => {

    // le estoy diciendo q dure un Mes
    const expiresIn = 60 * 60 * 24  * 30;

    const payload = { email };

    try {
        const token = jwt.sign( payload , process.env.SECRETORPRIVATEKEY, { expiresIn })

        return token;
        
    } catch (error) {

        console.log("ERROR generateToken: ",error);
    }

}

export { generateToken }