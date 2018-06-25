var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'select * from CHITIETDONHANG';
    return db.load(sql);
}

exports.single = (oID, pID) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from CHITIETDONHANG where MaDon = ${oID} and MaSP = ${pID}`;
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

exports.firstOrderDetail = (oID) => {
    return new Promise((resolve, reject) => {
        var sql = `select ctdh.MaDon, sp.MaSP, ctdh.SoLuong, sp.TenSP, sp.Gia from chitietdonhang ctdh, sanpham sp
                where ctdh.MaSP = sp.MaSP and ctdh.MaDon = ${oID} limit 1}`;
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

exports.loadOrderDetail = (oID) => {
    var sql = `select ctdh.MaDon, sp.MaSP, ctdh.SoLuong, sp.TenSP, sp.Gia, sp.AnhDaiDien from chitietdonhang ctdh, sanpham sp
                where ctdh.MaSP = sp.MaSP and ctdh.MaDon = ${oID}`;
    return db.load(sql);
}

exports.add = (c) => {
    var sql = `insert into CHITIETDONHANG(MaDon,MaSP,SoLuong) values(${c.MaDon},${c.MaSP},${c.SoLuong})`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from CHITIETDONHANG where MaDon = ${id}`;
    return db.save(sql);
}

exports.updateProductNumber = (c) => {
    var sql = `update CHITIETDONHANG set SoLuong = '${c.SoLuong}' where MaDon = ${c.MaDon}`;
    return db.save(sql);
}
