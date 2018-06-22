//var restrict = require('../middle-wares/restrict');
var express = require('express'),
	SHA256 = require('crypto-js/sha256'),
    moment = require('moment');

var router = express.Router();

var accountRepo = require('../repos/KhachHangRepo');

var restrict = require('../middle-wares/restrict');

router.post('/register', (req, res) => {
    var user = {
    	TenKH: req.body.fullname,
    	GioiTinh: req.body.rbGioiTinh,
    	DiaChi: req.body.address,
    	SoDienThoai: req.body.phonenumber,
    	Email: req.body.email,
    	TaiKhoan: req.body.username,
    	MatKhau: SHA256(req.body.rawPWD).toString()
    };

    accountRepo.add(user).then(value => {
        var vm = {
            isSuccess: value.affectedRows
        }
        res.render('account/register',vm);
    });
});

router.post('/logout', (req, res) => {
    req.session.isLogged = false;
    req.session.user = null;
    // req.session.cart = [];
    res.redirect(req.headers.referer);
});

router.get('/register', (req, res) => {
    res.render('account/register');
});

router.get('/login', (req, res) => {
    res.render('account/login');
});

router.post('/login', (req, res) => {
    var passwordTemp = SHA256(req.body.txtPassword).toString();
    var user = {
        username: req.body.txtUsername,
        password: passwordTemp.substr(0,33)
    };
    accountRepo.login(user).then(rows => {
        if (rows.length > 0) {
            req.session.isLogged = true;
            req.session.user = rows[0];
            req.session.cart = [];
            var url = '/';
            if (req.query.retUrl) {
                url = req.query.retUrl;
            }
            res.redirect(url);
        } else {
            var vm = {
                showError: true,
                errorMsg: 'Login failed' +" "+ rows.length
            };

            res.render('account/login', vm);
        }
    });
});

router.get('/profile', restrict, (req, res) => {
    res.render('account/profile');
});

router.post('/logout', (req, res) => {
    console.log("Dang xuat!");
    req.session.isLogged = false;
    req.session.user = null;
    // req.session.cart = [];
    res.redirect(req.headers.referer);
});

module.exports = router;