var express = require('express');
var sanphamRepo = require('../repos/SanPhamRepo');
var hansanxuaRepo = require('../repos/HangSanXuatRepo.js');
var config = require('../config/config');

var router = express.Router();

router.get('/byCat/:catId', (req, res) => {
	var catId = req.params.catId;
	var p1 = sanphamRepo.loadAllByCat(catId);
    var p2 = sanphamRepo.countByCat(catId);
    var p3 = hansanxuaRepo.loadHSXByCat(catId);
    Promise.all([p1, p2, p3]).then(([pRows, countRows, pRowsHSX]) => {
    	var vm = {
            products: pRows,
            hangSX: pRowsHSX,
            noProducts: pRows.length === 0
        };
        res.render('product/byCat',vm);
    });
});

router.get('/byCat/:catId/:maHSX', (req, res) => {
	var catId = req.params.catId;
	var maHSX = req.params.maHSX;
	console.log(catId);
	console.log(maHSX);
});

module.exports = router;