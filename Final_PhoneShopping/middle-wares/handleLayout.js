var loaispRepo = require('../repos/LoaiSanPhamRepo');

module.exports = (req, res, next) => {
	loaispRepo.loadAll().then(rows => {
		res.locals.layoutVM = {
			loaiSp = rows
		};
		next();
	});
};