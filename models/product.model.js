import  {Schema, model} from 'mongoose';


const ProductSchema = Schema({

      name: {
        type: String,
        default: ''
      },
      
      stock: {
        type: Number,
        default: 0
      },

      isOnSale: {
        type: Boolean,
        default: false,
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

ProductSchema.methods.toJSON = function(){
    const {__v, _id, ...product} = this.toObject();
    product.idproduct = _id

    return product; 
}

export default model('Product', ProductSchema);