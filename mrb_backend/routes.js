'use strict';

var jwt = require('jsonwebtoken');
var response = require('./res');

module.exports = function(app) {
    var todoList = require('./controller');

    var cekLogin = function (req, res, next) {
        try {
            var token = req.get('authorization') || req.body.token || req.query.token
            var decoded = jwt.verify(token, 'mrbking');
            req.user = decoded
            console.log(decoded)
            next()
        } catch (error) {
            response.faillogin('Belum login', res)
        }      
    }

    var cekAdmin = function (req, res, next) {
        if (req.user.is_admin === 1) {
            next()
        } else {
            response.fail('Bukan admin', res)
        }
    }

    app.route('/')
        .get(todoList.index);

    app.route('/users')
        .get(todoList.users);

    app.route('/login')
        .post(todoList.login);
    
    app.route('/profile')
        .get(cekLogin, todoList.profile);

    app.route('/ruang')
        .get(cekLogin, todoList.ruang);
    
    app.route('/snack')
        .get(cekLogin, todoList.snack);

    app.route('/transaksi')
        .get(cekLogin, cekAdmin, todoList.transaksi);

    app.route('/id')
        .get(todoList.id);

    app.route('/users/:user_id')
        .get(todoList.findUsers);

    app.route('/users')
        .post(todoList.createUsers);

    app.route('/users')
        .put(todoList.updateUsers);
        
    app.route('/transaksi')
        .post(cekLogin, cekAdmin, todoList.createTransaksi);
    
    app.route('/transaksi')
        .put(cekLogin, cekAdmin, todoList.updateTransaksi);
    
    app.route('/users')
        .delete(todoList.deleteUsers);

    app.route('/transaksi')
        .post(cekLogin, cekAdmin, todoList.deleteTransaksi);
};