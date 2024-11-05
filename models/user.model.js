import  {Schema, model} from 'mongoose';

const UserSchema = Schema({

      fullName: {
        type: String,
        default: ''
      },
      
      password: {
        type: String,
        default: ''
      },

      email: {
        type: String,
        default: '',
        unique: true,
        sparse: true
      },

      contact_info: {
        street_address: String,  
        city: String,            
        state: String,          
        postal_code: String,     
        country: String         
      },

      role: {
        type: String,
        default: 'USER_ROLE',
        enum: ['user', 'admin', 'webmaster']
      },
     
      status: {
        type: String,
        default: 'active'
      },
      
      state: {
        type: Boolean,
        default: true
      }
    
    
    }, { timestamps:true}
);

UserSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject();
    return user; 
}


export default model('User', UserSchema);