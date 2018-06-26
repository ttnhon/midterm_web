var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'select * from DONHANG order by NgayMua desc';
    return db.load(sql);
}

exports.loadAllByCustomerID = (id) => {
    var sql = `select dh.MaDon as MaDon, dh.NgayMua as NgayMua, dh.TinhTrang as TinhTrang from DONHANG dh where MaKH = ${id} ORDER BY dh.NgayMua DESC`;
    return db.load(sql);
}

exports.countByCustomerID = (id) => {
    var sql = `select count(*) as total from DONHANG where MaKH = ${id} ORDER BY NgayMua DESC`;
    return db.load(sql);
}

exports.countProducts = (maKH) => {
    var sql = `select dh.MaDon, count(ctdh.MaSP) as total from DONHANG dh join chitietdonhang ctdh on dh.MaDon = ctdh.MaDon
             where dh.MaKH = ${maKH} GROUP BY dh.MaDon ORDER BY dh.NgayMua DESC `;
    return db.load(sql);
}

exports.firstOrderDetail = (maKH) => {
    var sql = `select sp.TenSP as TenSP from chitietdonhang ctdh, sanpham sp, donhang dh
                where dh.MaDon = ctdh.MaDon and ctdh.MaSP = sp.MaSP and dh.MaKH = ${maKH} 
                and sp.MaSP = (select min(ctdh2.MaSP) from chitietdonhang ctdh2 where ctdh2.MaDon = ctdh.MaDon)
                ORDER BY dh.NgayMua DESC`;
    return db.load(sql);
}

exports.singleByCustomerID = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select MaDon, NgayMua, TinhTrang from DONHANG where MaKH = ${id} ORDER BY NgayMua DESC`;
        return db.load(sql);
    });
}

exports.loadOne = (oId) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from donhang where MaDon = ${oId}`;
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

exports.updateTinhTrang = (id, status) => {
    var sql = `update DONHANG set TinhTrang = ${status} where MaDon = ${id}`;
    return db.save(sql);
} 