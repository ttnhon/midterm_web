var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'select * from SANPHAM';
    return db.load(sql);
}

exports.loadSingle = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from SANPHAM where MaSP = ${id}`;
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

exports.loadSingleByName = (name) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from SANPHAM where TenSP = '${name}'`;
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

exports.add = (sp) => {
    var sql = `insert into SANPHAM(TenSP,Gia,SoLuongCon,SoLuongDaBan,AnhDaiDien,XuatXu,Loai,HangSanXuat,ManHinh,HeDieuHanh,CameraSau,CameraTruoc,CPU_,RAM_,BoNhoTrong,BoNhoNgoai,TheSim,DungLuongPin,MoTa) values('${sp.TenSP}',${sp.Gia},${sp.SoLuongCon},${sp.SoLuongDaBan},'${sp.AnhDaiDien}','${sp.XuatXu}',${sp.Loai},${sp.HangSanXuat},'${sp.ManHinh}','${sp.HeDieuHanh}',${sp.CameraSau},${sp.CameraTruoc},'${sp.CPU_}',${sp.RAM_},${sp.BoNhoTrong},${sp.BoNhoNgoai},'${sp.TheSim}',${sp.DungLuongPin},'${sp.MoTa}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from SANPHAM where MaSp = ${id}`;
    return db.save(sql);
}

exports.update = (c) => {
    var sql = `update SANPHAM set TenSP = '${sp.TenSP}',Gia = ${sp.Gia},SoLuongCon = ${sp.SoLuongCon},SoLuongDaBan = ${sp.SoLuongDaBan},AnhDaiDien = '${sp.AnhDaiDien}',XuatXu = '${sp.XuatXu}',Loai = ${sp.Loai},HangSanXuat = ${sp.HangSanXuat},ManHinh = '${sp.ManHinh}',HeDieuHanh = '${sp.HeDieuHanh}',CameraSau = ${sp.CameraSau},CameraTruoc = ${sp.CameraTruoc},CPU_ = '${sp.CPU_}',RAM_ = ${sp.RAM_},BoNhoTrong = ${sp.BoNhoTrong},BoNhoNgoai = ${sp.BoNhoNgoai},TheSim = '${sp.TheSim}',DungLuongPin = ${sp.DungLuongPin},MoTa = '${sp.MoTa}' where MaSp = ${sp.MaSP}`;
    return db.save(sql);
}
