var express = require('express');
var sanphamRepo = require('../repos/SanPhamRepo');

var router = express.Router();

router.get('/', (req, res) => {
	var moiNhat = sanphamRepo.loadMoiNhat();
	var banChayNhat = sanphamRepo.loadBanChayNhat();
	var xemNhieuNhat = sanphamRepo.loadXemNhieuNhat();
	Promise.all([moiNhat, banChayNhat, xemNhieuNhat]).then(([pRows1, pRows2, pRows3]) => {
		var vm = {
			spMoiNhat: pRows1,
			spBanChayNhat: pRows2,
			spXemNhieuNhat: pRows3
		};

	    res.render('home/index', vm);
	});
	
});

router.get('/home',(req,res) => {
	var tieuchi = req.query.tieuchi;
	var searchkey = req.query.key;

	console.log(tieuchi);
	console.log(searchkey);

	/*var p1 = sanphamRepo.searchbyTag(tieuchi,searchkey);
	var p2 = sanphamRepo.countSearchbyTag(tieuchi,seachkey);

	Promise.all([tieuchi,searchkey,p1,p2]).then(([Tieuchi,Key,pRows,countRows]) => {
		var vm = {
			countResult: countRows,
			TagSearch: Tieuchi,
			KeySearch: Key,
			products: pRows,
			noProducts: pRows.length === 0
		};

		res.render('home/search',vm);
	});*/

});
module.exports = router;