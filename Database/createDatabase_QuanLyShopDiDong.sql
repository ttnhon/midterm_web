create database QuanLyShopDiDong;
use QuanLyShopDiDong;
create table SANPHAM
(
	MaSP int primary key AUTO_INCREMENT, 
    TenSP varchar(50),
    Gia int,
    
    SoLuongCon int,				 # Số lượng sản phẩm còn
    SoLuongDaBan int,			 # Số lượng đã bán
    
    AnhDaiDien varchar(100),     # Link ảnh đại diện cho sản phẩm
    
    XuatXu varchar(30),			 # Xuất xứ
    Loai int,					 # 0: smartphone    1: tablet
    HangSanXuat int,			 # Hãng sản xuất
    
    ManHinh varchar(50),		 # Thông tin màn hình
    HeDieuHanh varchar(20),		 # Hệ điều hành
    CameraSau float,			 # Kích thước camera sau
    CameraTruoc float,			 # Kích thước camera trước
    CPU_ varchar(20),			 # Thông tin CPU
    RAM_ float,					 # Dung lượng RAM
    BoNhoTrong float,			 # Dung lượng ROM
    BoNhoNgoai int,				 # Dung lượng Bộ nhớ ngoài
    TheSim varchar(30),			 # Thông tin sim hỗ trợ
    DungLuongPin int,			 # Dung lược pin
    MoTa text,					 # Mô tả sản phẩm
    
    LuotXem int,				 #Lượt xem sản phẩm
    NgayNhap datetime,		#Ngày nhập hàng
    
    FOREIGN KEY (Loai) REFERENCES LOAISANPHAM(MaLoai),
    FOREIGN KEY (HangSanXuat) REFERENCES HANGSANXUAT(MaHSX)
);
create table HINHANH
(
	MaSP int,				
    DuongDan varchar(100),		 # Link dẫn đến ảnh
    primary key(MaSP, DuongDan),
    
    FOREIGN KEY (MaSP) REFERENCES SANPHAM(MaSP)
);
create table LOAISANPHAM
(
	MaLoai int primary key AUTO_INCREMENT,
    TenLoai varchar(50),		 
    MoTa text
);
create table HANGSANXUAT
(
	MaHSX int primary key AUTO_INCREMENT,
    TenHSX varchar(50),
    MoTa text
);
create table KHACHHANG
(
	MaKH int primary key AUTO_INCREMENT,
    TenKH varchar(50),
    GioiTinh smallint,
    DiaChi varchar(200),
    SoDienThoai varchar(20),
    Email varchar(50),
    TaiKhoan varchar(30),
    MatKhau varchar(33)
);
create table GIOHANG
(	
	MaKH int,
    MaSP int,
    SoLuong int,
    
    primary key(MaKH, MaSP),
    FOREIGN KEY (MaKH) REFERENCES KHACHHANG(MaKH),
    FOREIGN KEY (MaSP) REFERENCES SANPHAM(MaSP)
);

create table DONHANG
(
	MaDon int primary key AUTO_INCREMENT,
	MaKH int,
    NgayMua datetime,
    TinhTrang smallint,		#0: Chờ xác nhận từ chủ shop	1:Chờ lấy hàng  	2: Đang giao hàng	3: Đã giao
    
    primary key(MaDon),
    FOREIGN KEY (MaKH) REFERENCES KHACHHANG(MaKH)
);

create table CHITIETDONHANG
(
	MaDon int,
    MaSP int,
    SoLuong int,
    
    primary key(MaDon,MaSP),
    FOREIGN KEY (MaDon) REFERENCES DONHANG(MaDon),
    FOREIGN KEY (MaSP) REFERENCES SANPHAM(MaSP)
);
