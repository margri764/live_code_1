


export const userRole= ( req, res, next )=>{
 


    if(!req.userAuth){
        return res.status(400).json({
            message: 'Validar token primero'
        })
    }

    const { role  } = req.userAuth;

    if(!role){
        return res.status(401).json({
            message: "Es necesario asignar un role"
        });
    }

    if(role && role !== 'user' ){
        return res.status(401).json({
            message: "Sin autorización (user)"
        });
    }

    next();
}

export const adminRole= ( req, res, next )=>{

    if(!req.userAuth){
        return res.status(400).json({
            message: 'Validar token primero'
        })
    }

    const { role  } = req.userAuth;

    if(!role){
        return res.status(401).json({
            message: "Es necesario asignar un role"
        });
    }

    if(role && role === 'user' ){
        return res.status(401).json({
            message: "Sin autorización (admin)"
        });
    }

    next();
}

