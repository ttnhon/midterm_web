var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'select * from HANGSANXUAT';
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from HANGSANXUAT where MaHSX = ${id}`;
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

exports.loadHSXByCat = (catId) => {
    var sql = `select distinct hsx.MaHSX, hsx.TenHSX, sp.Loai from hangsanxuat hsx, sanpham sp where sp.Loai = ${catId} and hsx.MaHSX = sp.HangSanXuat`;
    return db.load(sql);
}

exports.add = (c) => {
    var sql = `insert into HANGSANXUAT(TenHSX,MoTa) values('${c.TenHSX}','${c.MoTa}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from HANGSANXUAT where MaHSX = ${id}`;
    return db.save(sql);
}

exports.update = (c) => {
    var sql = `update HANGSANXUAT set TenHSX = '${c.TenHSX}', MoTa = '${c.MoTa}' where MaHSX = ${c.MaHSX}`;
    return db.save(sql);
}
