var express = require('express');
var hansanxuaRepo = require('../repos/HangSanXuatRepo.js');

var router = express.Router();

router.get('/', (req, res) => {
	res.redirect('/dashboard/products');
});

router.get('/products', (req, res) => {
	
});

router.get('/categories', (req, res) => {
	
});

router.get('/producers', (req, res) => {
	hansanxuaRepo.loadAll().then(rows => {
		var vm = {
			producers: rows,
			type: "producer"
		};
		res.render('dashboard/dashboardProducer', vm);
	});
});
router.get('/producers/add', (req, res) => {
    var vm = {
        showAlert: false
    };
    res.render('dashboard/addProducer', vm);
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
	var maHSX = req.query.id;
	hansanxuaRepo.single(maHSX).then(row => {
		var vm = {
			producer: row,
			showAlert: false
		};
		res.render('dashboard/editProducer', vm);
	});
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
	
});

module.exports = router;