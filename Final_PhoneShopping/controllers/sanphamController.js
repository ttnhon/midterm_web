var express = require('express');
var sanphamRepo = require('../repos/SanPhamRepo');
var hansanxuaRepo = require('../repos/HangSanXuatRepo');
var loaisanphamRepo = require('../repos/LoaiSanPhamRepo');
var config = require('../config/config');

var router = express.Router();

router.get('/byCat/:catId', (req, res) => {
    var catId = req.params.catId;

    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var catName;
    loaisanphamRepo.single(catId).then(row => {
        catName = row.TenLoai;
    });

    var p1 = sanphamRepo.loadAllByCat(catId, offset);
    var p2 = sanphamRepo.countByCat(catId);
    var p3 = hansanxuaRepo.loadHSXByCat(catId);
    Promise.all([p1, p2, p3]).then(([pRows, countRows, pRowsHSX]) => {
        var total = countRows[0].total;
        var nPages = Math.ceil(total / config.PRODUCTS_PER_PAGE);

        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page,
                isMinPage: i === 1,
                isMaxPage: i === nPages
            });
        }

        var next = page;
        next++;
        var pre = page - 1;
        var vm = {
            CatId: catId,
            CatName: catName,
            products: pRows,
            hangSX: pRowsHSX,
            noProducts: pRows.length === 0,
            preValue: pre,
            nextValue: next,
            isCurrent: page == 1,
            isMaxPages: page == nPages,
            page_numbers: numbers
        };
        res.render('product/byCat',vm);
    });
});

router.get('/byCat/:catId/:maHSX', (req, res) => {
    var catId = req.params.catId;
    var maHSX = req.params.maHSX;
    
    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;
    var catName;
    loaisanphamRepo.single(catId).then(row => {
        catName = row.TenLoai;
    });

    var p1 = sanphamRepo.loadAllByCatAndByProd(catId, maHSX, offset);
    var p2 = sanphamRepo.countByCatAndByProd(catId, maHSX);
    var p3 = hansanxuaRepo.loadHSXByCat(catId);
    Promise.all([p1, p2, p3]).then(([pRows, countRows, pRowsHSX]) => {
        var total = countRows[0].total;
        var nPages = Math.ceil(total / config.PRODUCTS_PER_PAGE);

        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page,
                isMinPage: i === 1,
                isMaxPage: i === nPages
            });
        }

        var next = page;
        next++;
        var pre = page - 1;

        var vm = {
            CatId: catId,
            CatName: catName,
            MaHSX: maHSX,
            products: pRows,
            hangSX: pRowsHSX,
            noProducts: pRows.length === 0,
            preValue: pre,
            nextValue: next,
            isCurrent: page == 1,
            isMaxPages: page == nPages,
            page_numbers: numbers
        };
        res.render('product/byCat',vm);
    });
});

router.get('/detail/:proId', (req, res) => {
    var proId = req.params.proId;
    sanphamRepo.loadSingle(proId).then(row => {
        if (row) {
            var luotXemMoi = row.LuotXem + 1;
            row.LuotXem++;
            sanphamRepo.updateLuotXem(row.MaSP, luotXemMoi);
            var p1 = sanphamRepo.loadHinhAnh(proId);
            var p2 = sanphamRepo.loadSpCungLoai(proId, row.Loai);
            var p3 = sanphamRepo.loadSpCungNSX(proId, row.HangSanXuat);
            var p4 = loaisanphamRepo.single(row.Loai);
            var p5 = hansanxuaRepo.single(row.HangSanXuat);
            Promise.all([p1, p2, p3, p4, p5]).then(([pRows1, pRows2, pRows3, pRows4, pRows5]) => {
                var vm = {
                    product: row,
                    hinhAnh: pRows1,
                    spCungLoai: pRows2,
                    spCungNSX: pRows3,
                    Loai: pRows4.TenLoai,
                    HSX: pRows5.TenHSX
                }
                res.render('product/detail', vm);
            });
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
