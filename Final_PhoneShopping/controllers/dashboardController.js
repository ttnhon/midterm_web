var express = require('express');
var sanphamRepo = require('../repos/SanPhamRepo');
var hinhanhRepo = require('../repos/HinhAnhRepo');
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
        sanphamRepo.loadAll().then(rows => {
            var vm = {
                products: rows,
                type: "product"
            };
            res.render('dashboard/dashboardProducts',vm);
        });
    }
});
router.get('/products/edit', (req, res) => {
    if(req.session.isLogged === false || req.session.user.TaiKhoan !== "admin"){
        res.render('error/index');
    }
    else {
        var maSP = req.query.id;
        var p1 = sanphamRepo.loadSingle(maSP);
        var p2 = hinhanhRepo.loadAllByProductID(maSP);
        Promise.all([p1, p2]).then(([row, pRows]) => {
            var p3 = loaisanphamRepo.loadAll();
            var p4 = hansanxuaRepo.loadAll();
            Promise.all([p3, p4]).then(([loai, nsx]) => {
                var vm = {
                    product: row,
                    hinhAnh: pRows,
                    loaiSP: loai,
                    NSX: nsx,
                    showAlert: false
                };
                res.render('dashboard/editProduct', vm);
            });
            
        });
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
router.get('/orders/:oId', (req, res) => {
    if(req.session.isLogged === false || req.session.user.TaiKhoan !== "admin"){
        res.render('error/index');
    }
    else {
        var oId = req.params.oId;
        var p1 = donhangRepo.loadOne(oId);
        var p2 = chitietdonhangRepo.loadOrderDetail(oId);
        Promise.all([p1, p2]).then(([pRows1, pRows2]) => {
            var tongTien = 0;
            var items = [];
            var tinhTrang;
            if(pRows1[0].TinhTrang === 0)
                tinhTrang = "Chưa giao hàng";
            if(pRows1[0].TinhTrang === 1)
                tinhTrang = "Đang giao hàng";
            if(pRows1[0].TinhTrang === 2)
                tinhTrang = "Đã giao hàng";
            for(i=0;i<pRows2.length;i++) {
                var product = pRows2[i];
                var item = {
                    AnhDaiDien: product.AnhDaiDien,
                    MaSP: product.MaSP,
                    TenSP: product.TenSP,
                    Gia: product.Gia,
                    SoLuong: product.SoLuong,
                    ThanhTien: product.Gia*product.SoLuong
                };
                items.push(item);
                tongTien+=item.ThanhTien;
            }

            var vm = {
                Order: pRows1[0],
                TinhTrang: tinhTrang,
                Details: items,
                TongTien: tongTien
            };
            res.render('dashboard/orderDetails', vm);
        }); 
    }
});

module.exports = router;