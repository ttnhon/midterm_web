var express = require('express');
var cartRepo = require('../repos/GioHangRepo'),
    productRepo = require('../repos/SanPhamRepo');

var router = express.Router();

var restrict = require('../middle-wares/restrict');

router.get('/', restrict, (req, res) => {
	//Lấy dữ liệu của từng sản phẩm về
	console.log("Đã vào trang giỏ hàng");
	//console.log(req.session.cart);
    var listProduct = [];
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i].MaSP;
        var p = productRepo.loadSingle(cartItem);
        listProduct.push(p);
    }
    //console.log(listProduct);
    var items = [];
    Promise.all(listProduct).then(result => {
    	var tongtien = 0;
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i];
            var item = {
                SanPham: pro,							//Sản phẩm
                SoLuong: req.session.cart[i].SoLuong,//Số lượng
                ThanhTien: pro.Gia * req.session.cart[i].SoLuong//Tổng tiền
            };
            items.push(item);//Đẩy vào listItem
            tongtien +=item.ThanhTien;
        }

        var vm = {
        	soluong: items.length,
        	tongtien: tongtien,
            items: items
        };
        res.render('cart/index', vm);
    });
});

router.post('/add', restrict, (req, res) => {
	var proid = -1;
	var pos = -1;
	var cartItem = {
		MaKH: +req.session.user.MaKH,
		MaSP: +req.body.masanpham,
	}
	var listProduct = req.session.cart;
	console.log(listProduct);
	for (var i = listProduct.length - 1; i >= 0; i--) {
		var masp = +listProduct[i].MaSP;
		if(cartItem.MaSP === masp)
		{
			proid = masp;
			pos = i;
		}
	}
	if(proid > -1)
	{
		var soluong = +listProduct[pos].SoLuong + 1;
		cartItem.SoLuong = soluong;
		cartRepo.updateSoLuong(cartItem).then(value => {
			if(value.changedRows > 0)
			{
				//Cập nhật lại session giỏ hàng
				req.session.cart[pos].SoLuong = cartItem.SoLuong;
			}
			res.redirect("/cart");
		});
	}
	else
	{
		cartItem.SoLuong = 1;
		cartRepo.add(cartItem).then(value => {
			if(value.affectedRows>0)
			{
				//Cập nhật lại session giỏ hàng
				var newcartItem ={
					MaSP: +cartItem.MaSP,
					SoLuong: 1
				}
				console.log(value);
				req.session.cart.push(newcartItem);
			}
			
			res.redirect("/cart");
		});
	}
});
router.post('/remove', (req, res) => {
	var cID = req.session.user.MaKH;
	var pID = +req.body.ProID;
    cartRepo.deleteOneCustomerProduct(cID, pID).then(value => {
    	if(value.affectedRows !== 0)
    	{
    		var pos = -1;
	    	for (var i = req.session.cart.length - 1; i >= 0; i--) {
	    		var pid = +req.session.cart[i].MaSP;
	    		if(pid === pID)
	    			pos = i;
	    	}
	    	if(pos >- 1)
	    	{
	    		req.session.cart.splice(pos,1);
	    	}
    	}
    	res.redirect("/cart");
    });
});

router.post('/decrease', (req, res) => {
	var cID = req.session.user.MaKH;
	var pID = +req.body.ProIDD;
	var qItem = +req.body.QuantityD - 1;
	var cartItem = {
		MaKH: cID,
		MaSP: pID,
		SoLuong: qItem
	}
	cartRepo.updateSoLuong(cartItem).then(value => {
		if(value.changedRows > 0)
		{
			for (var i = req.session.cart.length - 1; i >= 0; i--) {
	    		var pid = +req.session.cart[i].MaSP;
	    		if(pid === pID)
	    			req.session.cart[i].SoLuong = cartItem.SoLuong;
	    	}
		}
		res.redirect("/cart");
	});
});

router.post('/increase', (req, res) => {
	var cID = req.session.user.MaKH;
	var pID = +req.body.ProIDI;
	var qItem = +req.body.QuantityI + 1;
	console.log(pID);
	console.log(qItem);
	var cartItem = {
		MaKH: cID,
		MaSP: pID,
		SoLuong: qItem
	}
	console.log(cartItem);
	cartRepo.updateSoLuong(cartItem).then(value => {
		if(value.changedRows > 0)
		{
			for (var i = req.session.cart.length - 1; i >= 0; i--) {
	    		var pid = +req.session.cart[i].MaSP;
	    		if(pid === pID)
	    			req.session.cart[i].SoLuong = cartItem.SoLuong;
	    	}
		}
		res.redirect("/cart");
	});
});


module.exports = router;