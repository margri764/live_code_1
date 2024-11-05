
import bcryptjs from 'bcryptjs'; 
import { generateToken } from '../helpers/generate_token.js' 
import { User  } from '../models/index.js';



const login = async (req, res = response) => {

    try{

      const { email, password } = req.body;

      const user = await User.findOne( {email} )
      
      if(!user){
          return res.status(403).json({
              success: false,
              message: "Invalid access"
          })
          
      }
      const checkPassword = bcryptjs.compareSync(password, user.password)
      if(!checkPassword){
          return res.status(403).json({
            success: false,
            message: "Invalid access"
          })
      }

      const token = await generateToken(email);
     
       return res.status(200).json({
          success: true,
          token,
          user
      })

    
    } catch (error) {
      console.log('Error desde Login:', error);

      let errorMessage = 'Surgió un error inesperado. Intente mas tarde';

      res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
};

const signUp = async (req, res) => {

    try {
  
      const {email, password, ...rest} = req.body;


      const isUser = await User.findOne({email:email})


      if(isUser){
        return res.status(400).json({
          success: false,
          message: "Ya se encuentra un usuario con ese email"
        });
      }

      const salt = await bcryptjs.genSalt(10);

      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = {
        ...rest,
        email,
        password: hashedPassword

      }

      const user = new User( newUser );
  
      await user.save();
  
      return res.status(200).json({
        success: true,
        user
      });
  
    } catch (error) {
  
      console.log('signUp Error: ', error);
      let errorMessage = 'Surgió un error inesperado. Intente mas tarde';
  
      return res.status(500).json({
      success: false,
      error: errorMessage
      });
    }
};


  

  export { login, signUp }