//lógica de negocio 
const mongoose = require('mongoose'); 
const authSchema = require('./auth.model'); 

authSchema.statics = {
    create: function(data, cb){
        const user = new this(data)
        user.save(cb); //creaa el user 
    }, 
    login: function(query, cb){
        this.find(query, cb);//encuentra el user 
    }
}
const authModel = mongoose.model('Users', authSchema);//como se va  a llamar en la DB 
module.exports = authModel; 
