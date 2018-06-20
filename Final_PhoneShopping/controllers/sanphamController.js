var express = require('express');
var sanphamRepo = require('../repos/SanPhamRepo');
var config = require('../config/config');

var router = express.Router();

router.get('/byCat/:catId', (req, res) => {
	var catId = req.params.catId;
	var p1 = sanphamRepo.loadAllByCat(catId);
    var p2 = sanphamRepo.countByCat(catId);
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
    	var vm = {
            products: pRows,
            noProducts: pRows.length === 0
        };
        res.render('product/byCat',vm);
    });
});

module.exports = router;