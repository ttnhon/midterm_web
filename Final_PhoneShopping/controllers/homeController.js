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

module.exports = router;