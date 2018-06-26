var express = require('express');
var cartRepo = require('../repos/GioHangRepo'),
    productRepo = require('../repos/SanPhamRepo'),
    billRepo = require('../repos/DonHangRepo'),
    billdetailRepo = require('../repos/ChiTietDonHangRepo'),
    moment = require('moment');

var router = express.Router();

var restrict = require('../middle-wares/restrict'),
	restrictAddCart = require('../middle-wares/restrictAddCart')

router.get('/', restrict, (req, res) => {
	//Lấy dữ liệu của từng sản phẩm về
	console.log("Đã vào trang giỏ hàng");
	console.log(req.session.cart);
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
            items: items,
            user: req.session.user
        };
        res.render('cart/index', vm);
    });
});

router.post('/add', restrictAddCart, (req, res) => {
	var proid = -1;
	var pos = -1;
	var cartItem = {
		MaKH: +req.session.user.MaKH,
		MaSP: +req.body.masanpham,
	}
	var listProduct = req.session.cart;
	//console.log(listProduct);
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
				//console.log(value);
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

async function AddProductDetails(cartItem,idbill,userID){
	console.log("them vao chi tiet don hang");
	var q_value = await productRepo.loadSingle(cartItem.MaSP);
	if(q_value)
	{
		var quantity = q_value.SoLuongCon;
		//nếu số lượng mua > số lượng hàng tồn
		if(cartItem.SoLuong <= quantity)
		{
			//Cập nhật số lượng tồn và số lượng đã bán
			var newQuantity = quantity - cartItem.SoLuong;
			var newBought = q_value.SoLuongDaBan + cartItem.SoLuong;
			productRepo.updateSoLuongCon(cartItem.MaSP,newQuantity);
			productRepo.updateSoLuongDaBan(cartItem.MaSP,newBought);
			//Tạo chi tiết đơn
			var billdetail = {
				MaDon: idbill,
				MaSP: cartItem.MaSP,
				SoLuong: cartItem.SoLuong
			}
			var result = await billdetailRepo.add(billdetail);
			console.log("Da them 1 sam pham vao chi tiet hoa don");
			var value = await cartRepo.deleteOneCustomerProduct(userID, cartItem.MaSP);
			console.log("Đã xóa 1 sản phẩm khỏi giỏ hàng");
		}
	}//end if
	return 1;
};

router.post('/buy',async (req, res) => {
	console.log("Đã vào mua hàng");
	var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
	//Tạo modal bill
	var bill = {
		MaKH: req.session.user.MaKH,
		NgayMua: date,
		TinhTrang: 0,
		TenNguoiNhan: req.body.hoten,
		DiaChiNhan: req.body.diachi,
		SDT: req.body.sdt,
		GhiChu: req.body.ghichu
	}
	//Tạo bill
	var addbill = await billRepo.add(bill);
		//Nếu tạo thành công
	if(addbill.affectedRows !== 0)
		{
			//Lấy mã bill vừa tạo
			var billid = await billRepo.getBillID(bill.MaKH,bill.NgayMua);
			if(billid.length>0)
			{
				var idbill = billid[0].MaDon;
				var numCart = req.session.cart.length;
				//Duyệt giỏ hàng
				for (var i = numCart - 1; i >= 0; i--) {
					var cartItem = req.session.cart[i];
					var test = AddProductDetails(cartItem,idbill,bill.MaKH);
					req.session.cart.pop();
				}//end for
			}//end if lấy mã bill thành công
		}// end if tạo bill thành công
	res.redirect("/cart");
});


module.exports = router;