var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'select * from DONHANG order by NgayMua desc';
    return db.load(sql);
}

exports.loadAllByCustomerID = (id) => {
    var sql = `select distinct dh.MaDon as MaDon, dh.NgayMua as NgayMua,dh.TinhTrang as TinhTrang,count(dh.MaDon) as SoLuongSP, sp.TenSP as SanPhamDau
                from DONHANG dh join chitietdonhang ctdh on dh.MaDon = ctdh.MaDon 
                join sanpham sp on ctdh.MaSP = sp.MaSP where MaKH = ${id} ORDER BY dh.NgayMua DESC`;
    return db.load(sql);
}

exports.countByCustomerID = (id) => {
    var sql = `select count(*) as total from DONHANG where MaKH = ${id} ORDER BY NgayMua DESC`;
    return db.load(sql);
}

exports.countProducts = (maDon) => {
    var sql = `select count(*) as total from DONHANG dh join chitietdonhang ctdh on dh.MaDon = ctdh.MaDon
                where MaDon = ${maDon} ORDER BY NgayMua DESC`;
    return db.load(sql);
}


exports.singleByCustomerID = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select MaDon, NgayMua, TinhTrang from DONHANG where MaKH = ${id} ORDER BY NgayMua DESC`;
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

exports.updateTinhTrang = (id, status) => {
    var sql = `update DONHANG set TinhTrang = ${status} where MaDon = ${id}`;
    return db.save(sql);
} 