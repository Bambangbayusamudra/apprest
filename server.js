const express = require('express');  // memanggil express js
const bodyParser = require('body-parser');   // memanggil libary body-parser

var morgan = require('morgan');
const app = express();   //fungsi secara global untuk memanggil express js


//parse aplication/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//panggil routes
var routes = require('./routes');
routes(app);

// daftarkan menu rotes dari index
app.use('/auth', require('./middleware'));

 app.listen(3000, () =>{
    console.log('server started on port 3000'); 
 });
