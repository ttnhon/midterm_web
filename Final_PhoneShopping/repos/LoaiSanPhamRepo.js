var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from loaisanpham';
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from loaisanpham where MaLoai = ${id}`;
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.add = (c) => {
    var sql = `insert into LOAISANPHAM(TenLoai,MoTa) values('${c.TenLoai}','${c.MoTa}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from LOAISANPHAM where MaLoai = ${id}`;
    return db.save(sql);
}

exports.update = (c) => {
    var sql = `update LOAISANPHAM set TenLoai = '${c.TenLoai}', MoTa = '${c.MoTa}' where CatID = ${c.CatId}`;
    return db.save(sql);
}
