var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'select * from GIOHANG';
    return db.load(sql);
}

//Lấy toàn bộ giỏ hàng của 1 khách hàng
exports.loadAllByCustomerID = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from GIOHANG where MaKH = ${id}`;
        return db.load(sql);
    });
}

exports.loadAllByProductID = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from GIOHANG where MaSP = ${id}`;
        return db.load(sql);
    });
}

exports.add = (c) => {
    var sql = `insert into GIOHANG(MaKH,MaSP,SoLuong) values(${c.MaKH},${c.MaSP},${c.SoLuong})`;
    return db.save(sql);
}

//Xóa sản phầm A trong toàn bộ giỏ hàng của khách (sản phẩm đã bán hết)
exports.deleteOneProduct = (id) => {
    var sql = `delete from GIOHANG where MaSP = ${pID}`;
    return db.save(sql);
}

//Xóa một sản phẩm trong giỏ hàng của khách
exports.deleteOneCustomerProduct = (cID,pID) => {
    var sql = `delete from GIOHANG where MaKH = ${cID} and MaSP = ${pID}`;
    return db.save(sql);
}

exports.update = (c) => {
    var sql = `update GIOHANG set MaSP = ${c.MaSP}, SoLuong = ${c.SoLuong} where MaKH = ${c.MaKH}`;
    return db.save(sql);
}
