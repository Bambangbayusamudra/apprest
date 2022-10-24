'use strict';

var response = require('./res');
var connection = require('./konecksi');

exports.index = function(req,res){
    response.ok("Aplikasi REST API Berjalan")
};