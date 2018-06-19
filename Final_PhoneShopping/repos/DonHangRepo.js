var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'select * from DONHANG';
    return db.load(sql);
}

exports.singleByCustomerID = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from DONHANG where MaKH = ${id} ORDER BY NgayMua DESC`;
        return db.load(sql);
    });
}

exports.add = (c) => {
    var sql = `insert into DONHANG(MaKH,NgayMua,TinhTrang) values(${c.MaKH},'${c.NgayMua}',${c.TinhTrang})`;
    return db.save(sql);
}
//Xóa theo mã đơn
exports.deleteByOrderID = (id) => {
    var sql = `delete from DONHANG where MaDon = ${id}`;
    return db.save(sql);
}

//Xóa theo mã khách hàng
exports.deleteByCustomerID = (id) => {
    var sql = `delete from DONHANG where MaKH = ${id}`;
    return db.save(sql);
}

exports.update = (c) => {
    var sql = `update DONHANG set MaKH = ${c.MaKH}, NgayMua = '${c.NgayMua}', TinhTrang = ${c.TinhTrang} where MaDon = ${c.MaDon}`;
    return db.save(sql);
}
