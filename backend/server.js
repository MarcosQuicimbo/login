//que la app acceda al back , como estoy desde otro puerto no tendré acceso, tendré un problema de cors 

'use strict'
const cors = require('cors');
const authRoutes = require('./auth/auth.routes');
const express = require('express');//viene de la dependencia de express 
const app = express();
const router = express.Router(); 
const properties = require('./config/properties')
const DB = require('./config/db')

const bodyParser = require('body-parser'); 
const bodyParserJSON = bodyParser.json();
const bodyParserURLendoced = bodyParser.urlencoded({extended:true});

app.use(cors());
app.use(bodyParserJSON) 
app.use(bodyParserURLendoced);
//inti DB
DB();
authRoutes(router);
app.use('/api', router);
router.get('/', (req,res)=>{
    res.send('hellow from home');
});
app.use(router);
app.listen(properties.PORT, ()=>console.log(`server running on port ${properties.PORT} `));
