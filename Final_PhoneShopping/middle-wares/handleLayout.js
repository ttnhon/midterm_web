var loaispRepo = require('../repos/LoaiSanPhamRepo');
var giohangRepo = require('../repos/GioHangRepo');
module.exports = (req, res, next) => {
	loaispRepo.loadAll().then(rows => {
		res.locals.layoutVM = {
			loaiSp: rows
		};
		next();
	});
};

module.exports = (req, res, next) => {

	if (req.session.isLogged === undefined) {
		req.session.isLogged = false;
	}

    res.locals.layoutVM = {
        isLogged: req.session.isLogged,
        curUser: req.session.user,
    };
    next();
};