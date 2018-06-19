var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'select * from HINHANH';
    return db.load(sql);
}

exports.loadAllByProductID = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from HINHANH where MaSP = ${id}`;
        return db.load(sql);
    });
}

exports.add = (ha) => {
    var sql = `insert into HINHANH(MaSP,DuongDan) values(${ha.MaSP},'${ha.DuongDan}')`;
    return db.save(sql);
}

exports.deleteByProductID = (id) => {
    var sql = `delete from HINHANH where MaSP = ${id}`;
    return db.save(sql);
}
exports.deleteByProductLink = (link) => {
    var sql = `delete from HINHANH where DuongDan = '${link}'`;
    return db.save(sql);
}

exports.update = (ha) => {
    var sql = `update HINHANH set DuongDan = '${ha.DuongDan}' where MaSP = ${c.MaSP}`;
    return db.save(sql);
}
