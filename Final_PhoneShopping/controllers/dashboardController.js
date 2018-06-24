var express = require('express');
var hansanxuaRepo = require('../repos/HangSanXuatRepo');
var loaisanphamRepo = require('../repos/LoaiSanPhamRepo');
var donhangRepo = require('../repos/DonHangRepo');
var chitietdonhangRepo = require('../repos/ChiTietDonHangRepo');
var router = express.Router();

router.get('/', (req, res) => {
	res.redirect('/dashboard/products');
});

router.get('/products', (req, res) => {
	if(req.session.isLogged === false || req.session.user.TaiKhoan !== "admin"){
        res.render('error/index');
    }
    else {
        res.redirect('/dashboard/producers');
    }
});

router.get('/categories', (req, res) => {
    if(req.session.isLogged === false || req.session.user.TaiKhoan !== "admin"){
        res.render('error/index');
    }
    else {
	loaisanphamRepo.loadAll().then(rows => {
        var vm = {
            categories: rows,
            type: "category"
        };
        res.render('dashboard/dashboardCategories',vm);
    });
}
});

router.get('/categories/add', (req, res) => {
    if(req.session.isLogged === false || req.session.user.TaiKhoan !== "admin"){
        res.render('error/index');
    }
    else {
    var vm = {
        showAlert: false
    };
    res.render('dashboard/addCategory', vm);
}
});
router.post('/categories/add', (req, res) => {
   loaisanphamRepo.add(req.body).then(value => {
        var vm = {
            showAlert: true
        };
        res.render('dashboard/addCategory', vm);
    }).catch(err => {
        res.end('fail');
    });
});
router.get('/categories/edit', (req, res) => {
    if(req.session.isLogged === false || req.session.user.TaiKhoan !== "admin"){
        res.render('error/index');
    }
    else {
    var maLoai = req.query.id;
    loaisanphamRepo.single(maLoai).then(row => {
        var vm = {
            category: row,
            showAlert: false
        };
        res.render('dashboard/editCategory', vm);
    });
}
});
router.post('/categories/edit', (req, res) => {
    loaisanphamRepo.update(req.body).then(value => {
        var vm = {
            category: req.body,
            showAlert: true
        };
        res.render('dashboard/editCategory', vm);
    }).catch(err => {
        res.end('fail');
    });
});

router.get('/producers', (req, res) => {
    if(req.session.isLogged === false || req.session.user.TaiKhoan !== "admin"){
        res.render('error/index');
    }
    else {
    	hansanxuaRepo.loadAll().then(rows => {
    		var vm = {
    			producers: rows,
    			type: "producer"
    		};
    		res.render('dashboard/dashboardProducer', vm);
    	});
    }
});
router.get('/producers/add', (req, res) => {
    if(req.session.isLogged === false || req.session.user.TaiKhoan !== "admin"){
        res.render('error/index');
    }
    else {
        var vm = {
            showAlert: false
        };
        res.render('dashboard/addProducer', vm);
    }
});
router.post('/producers/add', (req, res) => {
    hansanxuaRepo.add(req.body).then(value => {
    	var vm = {
            showAlert: true
        };
        res.render('dashboard/addProducer', vm);
    }).catch(err => {
        res.end('fail');
    });
});
router.get('/producers/edit', (req, res) => {
	if(req.session.isLogged === false || req.session.user.TaiKhoan !== "admin"){
        res.render('error/index');
    }
    else {
    var maHSX = req.query.id;
	hansanxuaRepo.single(maHSX).then(row => {
		var vm = {
			producer: row,
			showAlert: false
		};
		res.render('dashboard/editProducer', vm);
	});
}
});
router.post('/producers/edit', (req, res) => {
    hansanxuaRepo.update(req.body).then(value => {
    	var vm = {
    		producer: req.body,
            showAlert: true
        };
        res.render('dashboard/editProducer', vm);
    }).catch(err => {
        res.end('fail');
    });
});

router.get('/orders', (req, res) => {
	if(req.session.isLogged === false || req.session.user.TaiKhoan !== "admin"){
        res.render('error/index');
    }
    else {
        donhangRepo.loadAll().then(rows => {
            var vm = {
                type: "order",
                orders: rows,
                noOrder: rows.length ===0
            };
            res.render('dashboard/dashboardOrders', vm);
        });
    }
});
router.post('/orders', (req, res) => {
    donhangRepo.updateTinhTrang(req.body.MaDon, req.body.TinhTrang).then(value => {
        res.redirect('/dashboard/orders');
    }).catch(err => {
        res.end('fail');
    });
});

module.exports = router;