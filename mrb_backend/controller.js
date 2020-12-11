'use strict';
var crypto = require('crypto');

var jwt = require('jsonwebtoken');

var response = require('./res');
var connection = require('./conn');

exports.users = function(req, res) {
    connection.query('SELECT * FROM user', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.login = function(req, res) {
    connection.query('SELECT * FROM user WHERE user = ?', [req.body.username], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            var password = 'mrb'+req.body.password+'king';
            var hash = crypto.createHash('md5').update(password).digest('hex');
            if (hash === rows[0].password){
                var token = jwt.sign({ 
                    id_user: rows[0].id_user,
                    user: rows[0].user,
                    is_admin: rows[0].is_admin,
                    display_nm: rows[0].display_nm
                  }, 'mrbking', { expiresIn: '20m' });
                response.ok(token, res)
            } else{
                response.fail("Gagal", res)
            }
        }
    });
};

exports.profile = function(req, res) {
    if(req.user){
        response.ok(req.user, res)
    } else{
        response.fail("Gagal profile", res)
    }
};

exports.ruang = function(req, res) {
    connection.query('SELECT * FROM ruang', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.snack = function(req, res) {
    connection.query('SELECT * FROM snack', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.transaksi = function(req, res) {
    connection.query('SELECT t.id_transaksi, t.tgl, r.nm_ruang, u.display_nm, t.activity, s.nm_snack, t.additional FROM transaksi t JOIN `user` u ON t.id_user = u.id_user JOIN ruang r ON t.id_ruang = r.id_ruang JOIN snack s ON t.id_snack = s.id_snack', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.id = function(req, res) {
    connection.query('SELECT * FROM user WHERE id = ?', [req.query.id], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

exports.findUsers = function(req, res) {
    var user_id = req.params.user_id;

    connection.query('SELECT * FROM user where id = ?',
    [ user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createUsers = function(req, res) {
    var user = req.body.user;
    var password = req.body.password;
    var display_nm = req.body.display_nm;
    var email = req.body.email;
    var cost_center = req.body.cost_center;

    connection.query('INSERT INTO user (user, password, display_nm, email, cost_center) values (?,?,?,?,?)',
    [ user, password, display_nm, email, cost_center ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
            response.fail("Gagal menambahkan user!", res)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};

exports.createTransaksi = function(req, res) {
    var tgl = req.body.tgl;
    var id_ruang = req.body.id_ruang;
    var id_user = req.body.id_user;
    var activity = req.body.activity;
    var id_snack = req.body.id_snack;
    var additional = req.body.additional;
    var id_transaksi = req.body.id_transaksi;

    connection.query('INSERT INTO transaksi (tgl, id_ruang, id_user, activity, id_snack, additional) values (?,?,?,?,?,?)',
    [ tgl, id_ruang, id_user, activity, id_snack, additional ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
            response.fail("Gagal menambahkan transaksi!", res)
        } else{
            response.ok("Berhasil menambahkan transaksi!", res)
        }
    });
};

exports.updateUsers = function(req, res) {
    var id_user = req.body.id_user;
    var user = req.body.user;
    var password = req.body.password;
    var display_nm = req.body.display_nm;
    var email = req.body.email;
    var cost_center = req.body.cost_center;

    connection.query('UPDATE user SET user = ?, password = ?, display_nm = ?, email = ?, cost_center = ? WHERE id_user = ?',
    [ user, password, display_nm, email, cost_center, id_user ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
            response.fail("Gagal merubah user!", res)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.updateTransaksi = function(req, res) {
    var tgl = req.body.tgl;
    var id_ruang = req.body.id_ruang;
    var id_user = req.body.id_user;
    var activity = req.body.activity;
    var id_snack = req.body.id_snack;
    var additional = req.body.additional;
    var id_transaksi = req.body.id_transaksi;

    connection.query('UPDATE transaksi SET tgl = ?, id_ruang = ?, id_user = ?, activity = ?, id_snack = ?, additional = ? WHERE id_transaksi = ?',
    [ tgl, id_ruang, id_user, activity, id_snack, additional, id_transaksi ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
            response.fail("Gagal merubah user!", res)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteUsers = function(req, res) {
    var id_user_id = req.body.id_user;

    connection.query('DELETE FROM user WHERE id_user = ?',
    [ id_user ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
            response.fail("Gagal menghapus user!", res)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};

exports.deleteTransaksi = function(req, res) {
    var id_transaksi = req.body.id_transaksi;

    connection.query('DELETE FROM transaksi WHERE id_transaksi = ?',
    [ id_transaksi ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
            response.fail("Gagal menghapus transaksi!", res)
        } else{
            response.ok("Berhasil menghapus transaksi!", res)
        }
    });
};
