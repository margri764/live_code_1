

import { User, Product } from '../models/index.js';


export const createProduct = async (req, res) => {

    try {
  
      const {name, ...rest} = req.body;


      const isProduct = await Product.findOne({name })


      if(isProduct){
        return res.status(400).json({
          success: false,
          message: "Ya se encuentra un producto con ese nombre"
        });
      }
  

      const newProduct = {
        ...rest,
        name
      }

      const product = new Product( newProduct );
  
      await product.save();
  
      return res.status(200).json({
        success: true,
        product
      });
  
    } catch (error) {
  
      console.log('createProduct Error: ', error);
      let errorMessage = 'Surgió un error inesperado. Intente mas tarde';
  
      return res.status(500).json({
      success: false,
      error: errorMessage
      });
    }
};

export const getProductById = async (req, res) =>{

  try {
  
    const id = req.params.id;

    const product = await Product.findById(id)

    if(!product){
      return res.status(404).json({
        success: false,
        message: `El producto con id ${id} no existe en nuestra base de datos`
      });
    }

    return res.status(200).json({
      success: true,
      product
    });

  } catch (error) {

    console.log('getProductById Error: ', error);
    let errorMessage = 'Surgió un error inesperado. Intente mas tarde';

    return res.status(500).json({
    success: false,
    error: errorMessage
    });
  }
  
}

export const getAllProducts = async (req, res) => {
  try {
    const { p = 1, r = 10 } = req.query;

    const [total, products] = await Promise.all([
      Product.countDocuments({ state: true }),
      Product.find({ state: true })
        .skip(Math.max(Number(p) - 1, 0) * Number(r))
        .limit(Number(r))
        .lean(),
    ]);

    const productsWithId = products.map(({ _id, __v, ...product }) => ({
      ...product,
      idproduct: _id
    }));
    

    const pagination = {
      curr_page: Number(p),
      total_reg: total,
      total_pages: Math.ceil(total / r),
      page_size: Number(r),
    };

    // Cambiar URL de la página siguiente
    if (Number(p) < pagination.total_pages) {
      pagination.next_page_uri = `/api/product?p=${Number(p) + 1}&r=${r}`;
    }


    res.json({
      success: true,
      products:productsWithId,
      pagination,
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};
