//var restrict = require('../middle-wares/restrict');
function encode_utf8(s){
    return unescape( encodeURIComponent( s ) );
}( '\u4e0a\u6d77' )
var express = require('express'),
	SHA256 = require('crypto-js/sha256'),
    moment = require('moment');

var router = express.Router();

var accountRepo = require('../repos/KhachHangRepo'),
    cartRepo = require('../repos/GioHangRepo'),
    donhangRepo = require('../repos/DonHangRepo.js'),
    chitietdonhangRepo=require('../repos/ChiTietDonHangRepo.js');

var restrict = require('../middle-wares/restrict');

router.post('/register', (req, res) => {
    accountRepo.isExistUserAccount(req.body.username).then(value => {
        //console.log(value);
        if(value!==1)
        {
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
        }
        else
        {
            var vm = {
                isSuccess: -1,
                TenKH: req.body.fullname,
                GioiTinh: req.body.rbGioiTinh,
                DiaChi: req.body.address,
                SoDienThoai: req.body.phonenumber,
                Email: req.body.email,
                //TaiKhoan: req.body.username
                //MatKhau: req.body.rawPWD,
            }
            res.render('account/register',vm);
        }
    });
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
        password: passwordTemp
    };
    accountRepo.login(user).then(rows => {
        if (rows.length > 0) {
            req.session.isLogged = true;
            req.session.user = rows[0];
            var userID = req.session.user.MaKH;
            var cart = [];
            cartRepo.loadAllByCustomerID(userID).then(value => {
                for (var i = value.length - 1; i >= 0; i--) {
                    var item = {
                        MaSP: value[i].MaSP,
                        SoLuong: value[i].SoLuong
                    }
                    //console.log(item);
                    cart.push(item);
                }
                req.session.cart = cart;
                var url = '/';
                if (req.query.retUrl) {
                    url = req.query.retUrl;
                }
                if(user.username === "admin") {
                    res.redirect('/dashboard');
                }
                else {
                    res.redirect(url);
                }
            });
        } 
        else {
            var vm = {
                showError: true,
                errorMsg: 'Sai tài khoản hoặc mật khẩu'
            };

            res.render('account/login', vm);
        }
    });
});

router.get('/profile', restrict, (req, res) => {
    var clone = req.session.user;
    clone.MatKhau = "**********";
    if(clone.GioiTinh)
        clone.GioiTinh = "Nam";
    else 
        clone.GioiTinh = "Nữ";
    clone.SoDienThoai = clone.SoDienThoai.substring(0,clone.SoDienThoai.length-4)+"****";
    clone.Email = "****"+clone.Email.slice(4);
    var user ={
        view: clone
    }
    res.render('account/profile',user);
});

router.post('/changePassWord', (req, res) => {
    var id = req.session.user.MaKH;
    var oldPassword = SHA256(req.body.oldPW).toString();
    var user = {
        MaKH: id,
        MatKhau: oldPassword
    }
    accountRepo.checkPassWord(user).then(rows => {
        if (rows.length > 0) {
            var newPassword = SHA256(req.body.newPW).toString();
            user.MatKhau = newPassword;
            accountRepo.updatePassWord(user).then(value =>
            {
                req.session.user.MatKhau = newPassword;
                var vm = {
                        showMsg: true,
                        Msg: 'Thay đổi mật khẩu thành công'
                };
                var clone = req.session.user;
                clone.MatKhau = "**********";
                if(clone.GioiTinh)
                    clone.GioiTinh = "Nam";
                else 
                    clone.GioiTinh = "Nữ";
                clone.SoDienThoai = clone.SoDienThoai.substring(0,clone.SoDienThoai.length-4)+"****";
                clone.Email = "****"+clone.Email.slice(4);
                vm.view = clone;
                res.render('account/profile',vm);
            });
        } 
        else {
            var vm = {
                showMsg: true,
                Msg: 'Sai mật khẩu gốc'
            };
            var clone = req.session.user;
            clone.MatKhau = "**********";
            if(clone.GioiTinh)
                clone.GioiTinh = "Nam";
            else 
                clone.GioiTinh = "Nữ";
            clone.SoDienThoai = clone.SoDienThoai.substring(0,clone.SoDienThoai.length-4)+"****";
            clone.Email = "****"+clone.Email.slice(4);
            vm.view = clone;
            res.render('account/profile', vm);
        }
    });
});

router.post('/changeAddress', (req, res) => {
    var id = req.session.user.MaKH;
    var newAddress = req.body.newAddress;
    var user = {
        MaKH: id,
        DiaChi: newAddress
    }
    accountRepo.updateAddress(user).then(value =>
    {
        req.session.user.DiaChi = newAddress;
        var vm = {
                showMsg: true,
                Msg: 'Thay đổi địa chỉ thành công'
        };
        var clone = req.session.user;
        clone.MatKhau = "**********";
        if(clone.GioiTinh)
            clone.GioiTinh = "Nam";
        else 
            clone.GioiTinh = "Nữ";
        clone.SoDienThoai = clone.SoDienThoai.substring(0,clone.SoDienThoai.length-4)+"****";
        clone.Email = "****"+clone.Email.slice(4);
        vm.view = clone;
        res.render('account/profile',vm);
    });

});

router.post('/changeEmail', (req, res) => {
    var id = req.session.user.MaKH;
    var user = {
        MaKH: id,
        Email: req.body.oldEmail
    }
    accountRepo.checkEmail(user).then(rows => {
        if (rows.length > 0) {
            var newEmail = req.body.newEmail;
            user.Email = newEmail;
            accountRepo.updateEmail(user).then(value =>
            {
                req.session.user.Email = newEmail;
                var vm = {
                        showMsg: true,
                        Msg: 'Thay đổi Email thành công'
                };
                var clone = req.session.user;
                clone.MatKhau = "**********";
                if(clone.GioiTinh)
                    clone.GioiTinh = "Nam";
                else 
                    clone.GioiTinh = "Nữ";
                clone.SoDienThoai = clone.SoDienThoai.substring(0,clone.SoDienThoai.length-4)+"****";
                clone.Email = "****"+clone.Email.slice(4);
                vm.view = clone;
                res.render('account/profile',vm);
            });
        } 
        else {
            var vm = {
                showMsg: true,
                Msg: 'Sai địa chỉ email gốc'
            };
            var clone = req.session.user;
            clone.MatKhau = "**********";
            if(clone.GioiTinh)
                clone.GioiTinh = "Nam";
            else 
                clone.GioiTinh = "Nữ";
            clone.SoDienThoai = clone.SoDienThoai.substring(0,clone.SoDienThoai.length-4)+"****";
            clone.Email = "****"+clone.Email.slice(4);
            vm.view = clone;
            res.render('account/profile', vm);
        }
    });
});

router.post('/changePhoneNumber', (req, res) => {
    var id = req.session.user.MaKH;
    var user = {
        MaKH: id,
        SoDienThoai: req.body.oldPN
    }
    accountRepo.checkPhoneNumber(user).then(rows => {
        if (rows.length > 0) {
            var newPN = req.body.newPN;
            user.SoDienThoai = newPN;
            accountRepo.updatePhoneNumber(user).then(value =>
            {
                req.session.user.SoDienThoai = newPN;
                var vm = {
                        showMsg: true,
                        Msg: 'Thay đổi số điện thoại thành công',
                };
                var clone = req.session.user;
                clone.MatKhau = "**********";
                if(clone.GioiTinh)
                    clone.GioiTinh = "Nam";
                else 
                    clone.GioiTinh = "Nữ";
                clone.SoDienThoai = clone.SoDienThoai.substring(0,clone.SoDienThoai.length-4)+"****";
                clone.Email = "****"+clone.Email.slice(4);
                vm.view = clone;
                res.render('account/profile',vm);
            });
        } 
        else {
            var vm = {
                showMsg: true,
                Msg: 'Sai số điện thoại gốc'
            };
            var clone = req.session.user;
            clone.MatKhau = "**********";
            if(clone.GioiTinh)
                clone.GioiTinh = "Nam";
            else 
                clone.GioiTinh = "Nữ";
            clone.SoDienThoai = clone.SoDienThoai.substring(0,clone.SoDienThoai.length-4)+"****";
            clone.Email = "****"+clone.Email.slice(4);
            vm.view = clone;
            res.render('account/profile', vm);
        }
    });
});

router.get('/history', (req,res) => {
    var id = req.session.user.MaKH;
    var p1 = donhangRepo.loadAllByCustomerID(id);
    Promise.all([p1]).then(([pRows]) => {
        var dh=[];
        for(i=0;i<pRows.length;i++)
        {
            console.log(pRows[i].SoLuongSP);
            dh.push({
                MaDon:pRows[i].MaDon,
                NgayMua:pRows[i].NgayMua,
                TinhTrang:pRows[i].TinhTrang,
                SanPhamDau: pRows[i].SanPhamDau,
                SoLuongSP: pRows[i].SoLuongSP,
                isLessThanOne: pRows[i].SoLuongSP <= 1 
            });
        }
        var vm ={
            donhang: dh,
        };
        res.render('account/history',vm);
    });

});

router.post('/logout', (req, res) => {
    console.log("Dang xuat!");
    req.session.isLogged = false;
    req.session.user = null;
    req.session.cart = [];
    //res.redirect("/home")
    res.redirect(req.headers.referer);
});

module.exports = router;