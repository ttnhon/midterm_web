var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'select * from KHACHHANG';
    return db.load(sql);
}

exports.loadSingle = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from KHACHHANG where MaKH = ${id}`;
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

exports.login = (user) => {
    var sql = `select * from KHACHHANG where TaiKhoan = '${user.username}' and MatKhau = '${user.password}'`;
    return db.load(sql);
}

exports.add = (kh) => {
    var sql = `insert into KHACHHANG(TenKH,GioiTinh,DiaChi,SoDienThoai,Email,TaiKhoan,MatKhau) values('${kh.TenKH}',${kh.GioiTinh},'${kh.DiaChi}','${kh.SoDienThoai}','${kh.Email}','${kh.TaiKhoan}','${kh.MatKhau}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from KHACHHANG where MaKH = ${id}`;
    return db.save(sql);
}

exports.deleteByTenTaiKhoan = (username) => {
    var sql = `delete from KHACHHANG where TenTaiKhoan = '${username}'`;
    return db.save(sql);
}

exports.update = (c) => {
    var sql = `update KHACHHANG set TenKH = '${kh.TenKH}',GioiTinh = ${kh.GioiTinh},DiaChi = '${kh.DiaChi}',SoDienThoai = '${kh.SoDienThoai}',Email = '${kh.Email}',TaiKhoan = '${kh.TaiKhoan}',MatKhau = '${kh.MatKhau}' where MaKH = ${c.MaKH}`;
    return db.save(sql);
}
