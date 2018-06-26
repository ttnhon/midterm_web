var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from sanpham';
    return db.load(sql);
}

exports.loadSingle = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from sanpham where MaSP = ${id}`;
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
        var sql = `select * from sanpham where TenSP = '${name}'`;
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

exports.searchbyTag = (tagName,name,offset) => {
    var sql='';
    if(tagName === "Loai")
    {
        sql = `select * from sanpham sp join loaisanpham lsp on sp.Loai = lsp.MaLoai where lsp.TenLoai like '%${name}%' limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    }
    else if (tagName === "HangSanXuat")
    {
        sql = `select * from sanpham sp join hangsanxuat hsx on sp.HangSanXuat = hsx.MaHSX where hsx.TenHSX like '%${name}%' limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    }
    else
    {
        sql = `select * from sanpham where ${tagName} like '%${name}%' limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    }
    return db.load(sql);
}

exports.countSearchbyTag = (tagName,name) => {
    var sql='';
    if(tagName === "Loai")
    {
        sql = `select count(*) as total from sanpham sp join loaisanpham lsp on sp.Loai = lsp.MaLoai where lsp.TenLoai like '%${name}%'`;
    }
    else if (tagName === "HangSanXuat")
    {
        sql = `select count(*) as total from sanpham sp join hangsanxuat hsx on sp.HangSanXuat = hsx.MaHSX where hsx.TenHSX like '%${name}%'`;
    }
    else
    {
        sql = `select count(*) as total from sanpham where ${tagName} like '%${name}%'`;
    }
    return db.load(sql);
}

exports.loadMoiNhat = () => {
    var sql= `select * from sanpham order by NgayNhap desc limit ${config.SO_SP_MOINHAT} offset 0`;
    return db.load(sql);
}
exports.loadBanChayNhat = () => {
    var sql= `select * from sanpham order by SoLuongDaBan desc limit ${config.SO_SP_BANCHAYNHAT} offset 0`;
    return db.load(sql);
}
exports.loadXemNhieuNhat = () => {
    var sql= `select * from sanpham order by LuotXem desc limit ${config.SO_SP_XEMNHIEUNHAT} offset 0`;
    return db.load(sql);
}

exports.loadAllByCat = (catId, offset) => {
    var sql = `select * from sanpham where Loai = ${catId} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}
exports.countByCat = (catId) => {
    var sql = `select count(*) as total from sanpham where Loai = ${catId}`;
    return db.load(sql);
}

exports.loadAllByCatAndByProd = (catId, maHSX, offset) => {
    var sql = `select * from sanpham where Loai = ${catId} and HangSanXuat = ${maHSX} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}
exports.countByCatAndByProd = (catId, maHSX) => {
    var sql = `select count(*) as total from sanpham where Loai = ${catId} and HangSanXuat = ${maHSX}`;
    return db.load(sql);
}

exports.loadHinhAnh = (maSp) => {
    var sql = `select * from hinhanh where MaSP = ${maSp}`;
    return db.load(sql);
}
exports.loadSpCungLoai = (maSp, catId) => {
    var sql = `select * from sanpham where MaSp != ${maSp} and Loai = ${catId} ORDER BY RAND() limit ${config.SP_CUNGLOAI}
     offset 0`;
     return db.load(sql);
}
exports.loadSpCungNSX = (maSp, maHSX) => {
    var sql = `select * from sanpham where MaSp != ${maSp} and HangSanXuat = ${maHSX} ORDER BY RAND() 
    limit ${config.SP_CUNGNSX} offset 0`;
     return db.load(sql);
}

exports.add = (sp) => {
    var sql = `insert into sanpham(TenSP,Gia,SoLuongCon,SoLuongDaBan,AnhDaiDien,XuatXu,Loai,HangSanXuat,ManHinh,HeDieuHanh,CameraSau,CameraTruoc,CPU_,RAM_,BoNhoTrong,BoNhoNgoai,TheSim,DungLuongPin,MoTa) values('${sp.TenSP}',${sp.Gia},${sp.SoLuongCon},${sp.SoLuongDaBan},'${sp.AnhDaiDien}','${sp.XuatXu}',${sp.Loai},${sp.HangSanXuat},'${sp.ManHinh}','${sp.HeDieuHanh}',${sp.CameraSau},${sp.CameraTruoc},'${sp.CPU_}',${sp.RAM_},${sp.BoNhoTrong},${sp.BoNhoNgoai},'${sp.TheSim}',${sp.DungLuongPin},'${sp.MoTa}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from sanpham where MaSp = ${id}`;
    return db.save(sql);
}

exports.update = (sp) => {
    var sql = `update sanpham set TenSP = '${sp.TenSP}',Gia = ${sp.Gia},SoLuongCon = ${sp.SoLuongCon},SoLuongDaBan = ${sp.SoLuongDaBan},AnhDaiDien = '${sp.AnhDaiDien}',XuatXu = '${sp.XuatXu}',Loai = ${sp.Loai},HangSanXuat = ${sp.HangSanXuat},ManHinh = '${sp.ManHinh}',HeDieuHanh = '${sp.HeDieuHanh}',CameraSau = ${sp.CameraSau},CameraTruoc = ${sp.CameraTruoc},CPU_ = '${sp.CPU_}',RAM_ = ${sp.RAM_},BoNhoTrong = ${sp.BoNhoTrong},BoNhoNgoai = ${sp.BoNhoNgoai},TheSim = '${sp.TheSim}',DungLuongPin = ${sp.DungLuongPin},MoTa = '${sp.MoTa}' where MaSP = ${sp.MaSP}`;
    return db.save(sql);
}

exports.updateLuotXem = (proId, luotXem) => {
    var sql = `update sanpham set LuotXem = ${luotXem} where MaSP = ${proId}`;
    return db.save(sql);
}

exports.updateSoLuongCon = (proId, SoLuongCon) => {
    var sql = `update sanpham set SoLuongCon = ${SoLuongCon} where MaSP = ${proId}`;
    return db.save(sql);
}

exports.updateSoLuongDaBan = (proId, SoLuongDaBan) => {
    var sql = `update sanpham set SoLuongDaBan = ${SoLuongDaBan} where MaSP = ${proId}`;
    return db.save(sql);
}