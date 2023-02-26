const mongoose = require('mongoose')
const Schema = mongoose.Schema; 
//mongoose.set('useCreateIndex',true)
mongoose.set('strictQuery', false);
const userSchema = new Schema({
    name: {
        type: String, 
        require: true, 
        trim: true
    },
    email: {//propiedad 
        type: String, //atributos
        require: true, 
        trim: true, 
        unique: true, 
    },
    password:{
        type:String, 
        require: true, 
        trim: true
    }
}, {
    timestamps: true //guarda en la colleción la fecha de creación y actualizacion 
});

module.exports = userSchema; 