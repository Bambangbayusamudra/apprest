const express = require('express');  // memanggil express js
const bodyParser = require('body-parser');   // memanggil libary body-parser
const app = express();   //fungsi secara global untuk memanggil express js


//parse aplication/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//panggil routes
var routes = require('./routes');
routes(app);

 app.listen(3000, () =>{
    console.log('server started on port'); 
 });
