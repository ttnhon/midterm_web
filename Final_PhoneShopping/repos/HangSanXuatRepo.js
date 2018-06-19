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

exports.add = (c) => {
    var sql = `insert into HANGSANXUAT(TenHSX,MoTa) values('${c.TenHSX}'.'${c.MoTa}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from HANGSANXUAT where MaHSX = ${id}`;
    return db.save(sql);
}

exports.update = (c) => {
    var sql = `update HANGSANXUAT set TenHSX = '${c.TeHSX}',MoTa = '${c.MoTa}'  where MaHSX = ${c.MaHSX}`;
    return db.save(sql);
}
