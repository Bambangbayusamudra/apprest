const jwt = require('jsonwebtoken');
const connection = require('../koneksi');
var mysql = require('mysql');
const config = require('../config/secret');

function verifikasi(){
    return function(req, rest, next){
        // var role = req.body.role;
        // cek authorization header
        var get = {
            user_id: req.body.user_id,
            access_token: req.body.access_token,
        }
        var tokenWithBearer = req.headers.authorization;
        var query = "SELECT ??=? FROM ?? WHERE ??=? ";
        var table = ["user_id",get.user_id , "akses_token", "access_token", get.access_token];
        query = mysql.format(query,table);
        connection.query(query,function(rows){ 
            if(tokenWithBearer){
                var token = tokenWithBearer.split(' ')[1];
                //veritfikasi
                jwt.verify(token, config.secret, function(err,decoded){
                    if(err){
                        return rest.status(401).send({auth:false, message:'Token tidak terdaftar!'});
                    }else{
                        if(query){
                            req.auth = decoded;
                            next();
                        }else{
                            return rest.status(401).send({auth:false, message:'gagal mengotorisasi role anda!'});
                        }
                    }
                });
            }else{
                return rest.status(401).send({auth:false, message:'Token tidak tersedia!'});
            }
        });
    }
}

module.exports = verifikasi;