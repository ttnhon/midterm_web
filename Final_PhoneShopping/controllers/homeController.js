var express = require('express');
var sanphamRepo = require('../repos/SanPhamRepo');

var router = express.Router();

router.get('/', (req, res) => {
    var tieuchi = req.query.tieuchi;
    var key = req.query.key;
    if (key === undefined || tieuchi === undefined) {
        tieuchi = 'TenSp';
        key = '';
    }

    console.log(tieuchi);
    console.log(key);

    if (key === '') {
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
    } else {
        var p1 = sanphamRepo.searchbyTag(tieuchi, key);
        var p2 = sanphamRepo.countSearchbyTag(tieuchi, key);

        Promise.all([tieuchi, key, p1, p2]).then(([Tieuchi, Key, pRows, countRows]) => {
            var vm = {
                countResult: countRows[0].total,
                TagSearch: Tieuchi,
                KeySearch: Key,
                products: pRows,
                noProducts: pRows.length === 0
            };

            res.render('home/search', vm);
        });
    }
});

module.exports = router;