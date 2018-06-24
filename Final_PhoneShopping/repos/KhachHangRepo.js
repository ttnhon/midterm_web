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
exports.loadSingleByUserAccount = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from KHACHHANG where TaiKhoan = '${id}'`;
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

exports.isExistUserAccount = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from KHACHHANG where TaiKhoan = '${id}'`;
        db.load(sql).then(rows => {
            if (rows.length > 0) {
                resolve(1);
            } else {
                resolve(0);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.checkPassWord = (user) => {
    var sql = `select * from KHACHHANG where MaKH = '${user.MaKH}' and MatKhau = '${user.MatKhau}'`;
    return db.load(sql);
}
exports.checkEmail = (user) => {
    var sql = `select * from KHACHHANG where MaKH = '${user.MaKH}' and Email = '${user.Email}'`;
    return db.load(sql);
}
exports.checkAddress = (user) => {
    var sql = `select * from KHACHHANG where MaKH = '${user.MaKH}' and DiaChi = '${user.DiaChi}'`;
    return db.load(sql);
}
exports.checkPhoneNumber = (user) => {
    var sql = `select * from KHACHHANG where MaKH = '${user.MaKH}' and SoDienThoai = '${user.SoDienThoai}'`;
    return db.load(sql);
}

exports.login = (user) => {
    var sql = `select * from KHACHHANG where TaiKhoan = '${user.username}' and MatKhau = '${user.password}'`;
    return db.load(sql);
}



exports.updatePassWord = (user) => {
    var sql = `update KHACHHANG set MatKhau = '${user.MatKhau}' where MaKH = ${user.MaKH}`;
    return db.save(sql);
}

exports.updateEmail = (user) => {
    var sql = `update KHACHHANG set Email = '${user.Email}' where MaKH = ${user.MaKH}`;
    return db.save(sql);
}

exports.updateAddress = (user) => {
    var sql = `update KHACHHANG set DiaChi = '${user.DiaChi}' where MaKH = ${user.MaKH}`;
    return db.save(sql);
}

exports.updatePhoneNumber = (user) => {
    var sql = `update KHACHHANG set SoDienThoai = '${user.SoDienThoai}' where MaKH = ${user.MaKH}`;
    return db.save(sql);
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
