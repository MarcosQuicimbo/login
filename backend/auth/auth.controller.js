const User = require('./auth.dao'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
const SECRET_KEY = 'secretkey123456'; 

exports.createUser = (req,res,next)=>{//registro de un usuario
    const newUser = { //recopero los datos de front 
        name: req.body.name, 
        email: req.body.email, 
        password: bcrypt.hashSync(req.body.password)
    }
    //guardo los datos de user 
    //a modo de promesa
    User.create(newUser,(err, user)=>{
        if (err && err.code ==11000) return res.status(409).send('email already exist');
        if(err) return res.status(500).send('Server error'); 
        const expiresIn = 24*60*60; //regla de expiración
        const accessToken = jwt.sign({id:user.id},
            SECRET_KEY,{
                expiresIn:expiresIn
            });
            const dataUser = {
                name: user.name, 
                email:user.email, 
                accessToken: accessToken, 
                expiresIn: expiresIn
            }

            //response hacia el front
        res.send({dataUser});//respondo hacia el user si todo va bien 
    });
}

exports.loginUser = (req,res,next)=>{//login del user 
    const userData={
        email: req.body.email, 
        password:req.body.password
    }
    //buscon el DB si existe 
    User.findOne({email:userData.email}, (err, user)=>{//devuel ve a modo de promesa si existe un error o si me da el user 
        if(err) return res.status(500).send('Server error!');
        if(!user){
            //email does not exist 
            res.status(409).send({message:'Something is wrong'});
        }else{
            const resultPassword = bcrypt.compareSync(userData.password, user.password);//descodifico //devuleve un boolan si conside o no 
            if(resultPassword){
                const expiresIn = 24 * 60 * 60; 
                const accessToken = jwt.sign({id:user.id}, SECRET_KEY,{expiresIn:expiresIn});
                const dataUser = {
                    name: user.name, 
                    email:user.email, 
                    accessToken: accessToken, 
                    expiresIn: expiresIn
                }
                res.send({dataUser})
            }else{
                //password wrong 
                res.status(409).send({message:'something in wrong'})
            }
        }
    });
}