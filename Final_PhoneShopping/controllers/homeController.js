var express = require('express');
var sanphamRepo = require('../repos/SanPhamRepo');
var config = require('../config/config');

var router = express.Router();

router.get('/', (req, res) => {
    var tieuchi = req.query.tieuchi;
    var key = req.query.key;
    var page = req.query.page;

    if (!page) {
        page = 1;
    }

    if (key === undefined || tieuchi === undefined) {
        tieuchi = 'TenSp';
        key = '';
    }

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
        var offset = (page - 1) * config.PRODUCTS_PER_PAGE;
        var p1 = sanphamRepo.searchbyTag(tieuchi, key, offset);
        var p2 = sanphamRepo.countSearchbyTag(tieuchi, key);

        Promise.all([tieuchi, key, p1, p2]).then(([Tieuchi, Key, pRows, countRows]) => {
            var total = countRows[0].total;
            var nPages = Math.ceil(total / config.PRODUCTS_PER_PAGE);

            var numbers = [];
            
            for (i = 1; i <= nPages; i++) {
                numbers.push({
                value: i,
                isCurPage: i === +page,
                isMinPage: i === 1,
                isMaxPage: i === nPages,
                tagSearch: Tieuchi,
                keySearch: Key
            });
            }
            var next = page;
            next++;
            var pre = page - 1;
            var vm = {
                countResult: countRows[0].total,
                TagSearch: Tieuchi,
                KeySearch: Key,
                products: pRows,
                noProducts: pRows.length === 0,
                preValue: pre,
                nextValue: next,
                isCurrent: page == 1,
                isMaxPages: page == nPages,
                page_numbers: numbers
            };

            res.render('home/search', vm);
        });
    }
});

module.exports = router;