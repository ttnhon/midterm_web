$(function(){

	 $('#xoa_sanpham_1').click(function xoaSanpham(){
	 	document.getElementById("so_sanpham").innerHTML = 0;
	 	$('#noidung_page').remove();
	 	$('.thanhtoan').remove();
	 	$('.div-thanhtoan').remove();
	 });

	 $('.dong_dangnhap').click(function(){
	 	 $('#loginModal').modal('hide');
	 	return false; 
	 });

	 $("#btn-tangsl").click(function(){
	 	var soluong = document.getElementById("_soluong").value;
	 	soluong = 1 + parseInt(soluong);
	 	document.getElementById("_soluong").setAttribute('value',soluong);
	 	var tongtien1 = document.getElementById("dongia_1").innerHTML;
	 	var tongtien = "";

	 	for (var i = tongtien1.length - 1; i >= 0; i--) {
	 		if(tongtien1[i]!= "," && tongtien1[i]!= "₫")
	 			tongtien = tongtien1[i] + tongtien;
	 	}
	 	tongtien = parseInt(tongtien) * soluong;
	 	tongtien = tongtien.toString();
	 	var tongtien_ghi = "₫";
	 	var temp = 1;
	 	for (var i = tongtien.length - 1; i >= 0; i--) {
	 		tongtien_ghi = tongtien[i] + tongtien_ghi;
	 		if(temp == 3)
	 		{
	 			tongtien_ghi = "," + tongtien_ghi;
	 			temp = 0;
	 		}
	 		temp = temp + 1;
	 	}
	 	if(tongtien_ghi[0]==",")
	 	{
	 		tongtien_ghi = tongtien_ghi.replace(',', '');
	 	}
	 	document.getElementById("thanhtien_1").innerHTML = tongtien_ghi;
	 	document.getElementById("tong_tien").innerHTML =tongtien_ghi;
	 });
	 $("#btn-giamsl").click(function(){
	 	var soluong = document.getElementById("_soluong").value;
	 	soluong = parseInt(soluong);
	 	if(soluong <= 1)
	 		return;
	 	soluong = soluong - 1;
	 	document.getElementById("_soluong").setAttribute('value',soluong);

	 	var tongtien1 = document.getElementById("dongia_1").innerHTML;
	 	var tongtien = "";

	 	for (var i = tongtien1.length - 1; i >= 0; i--) {
	 		if(tongtien1[i]!= "," && tongtien1[i]!= "₫")
	 			tongtien = tongtien1[i] + tongtien;
	 	}
	 	tongtien = parseInt(tongtien) * soluong;
	 	tongtien = tongtien.toString();
	 	var tongtien_ghi = "₫";
	 	var temp = 1;
	 	for (var i = tongtien.length - 1; i >= 0; i--) {
	 		tongtien_ghi = tongtien[i] + tongtien_ghi;
	 		if(temp == 3)
	 		{
	 			tongtien_ghi = "," + tongtien_ghi;
	 			temp = 0;
	 		}
	 		temp = temp + 1;
	 	}
	 	if(tongtien_ghi[0]==",")
	 	{
	 		tongtien_ghi = tongtien_ghi.replace(',', '');
	 	}
	 	document.getElementById("thanhtien_1").innerHTML = tongtien_ghi;
	 	document.getElementById("tong_tien").innerHTML =tongtien_ghi;

	 });

	 $("#nut_dathang").click(function(){
	 	$('.div-thanhtoan').removeClass('an_div');
	 });

	 $('.nut_dangnhap').click(function(){
	 	var username = document.getElementById("txtUserName").value;
	 	if(username=="admin")
	 	{
	 		window.location.href="Dashboard.html";
	 		return false;
	 	}
	 	sessionStorage.setItem("signined", "true");
	 	sessionStorage.setItem("user_name", username);
	 });
	 $('#nut_xacnhanmua').click(function(){
	 	var a = document.getElementById("hoten").value;
	 	var b = document.getElementById("sdt").value;
	 	var c = document.getElementById("diachi").value;
	 	if (a=="" || b=="" || c == "") { return;}
	 	$('#modal_muahang_thanhcong').modal('toggle');
		$('#modal_muahang_thanhcong').modal('show');
		document.getElementById("so_sanpham").innerHTML = 0;
	 	$('#noidung_page').remove();
	 	$('.thanhtoan').remove();
	 	$('.div-thanhtoan').remove();
		//return false;
	 });
	 
	 $('.xemlichsu').click(function(){
	 	window.location.href="Lichsu.html";
	 });
	 $('.giohang').click(function(){
	 	window.location.href="Giohang.html";
	 });
	 $('.capnhatthongtin').click(function(){
	 	window.location.href="Capnhatthongtin.html";
	 })
	
	 // $('.sanpham').click(function(){
	 // 	window.location.href="Chitiet.html";
	 // });
	 $('.muangay').click(function(){
	 	window.location.href="Giohang.html";
	 });
	 $('#hApple').click(function(){
		document.getElementById("hMotorola").style.textDecoration = "none";
		document.getElementById("hSamsung").style.textDecoration = "none";
		document.getElementById("hSony").style.textDecoration = "none";
		document.getElementById("hVivo").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=apple]').css('display','none');
		document.getElementById("hApple").style.textDecoration = "underline";
		$('.phantrang').css('display','none');
	 });
	 $('#hMotorola').click(function(){
	 	document.getElementById("hApple").style.textDecoration = "none";
		document.getElementById("hSamsung").style.textDecoration = "none";
		document.getElementById("hSony").style.textDecoration = "none";
		document.getElementById("hVivo").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=motorola]').css('display','none');
		document.getElementById("hMotorola").style.textDecoration = "underline";
		$('.phantrang').css('display','none');
	 });
	 $('#hSamsung').click(function(){
	 	document.getElementById("hApple").style.textDecoration = "none";
		document.getElementById("hMotorola").style.textDecoration = "none";
		document.getElementById("hSony").style.textDecoration = "none";
		document.getElementById("hVivo").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=samsung]').css('display','none');
		document.getElementById("hSamsung").style.textDecoration = "underline";
		$('.phantrang').css('display','none');
	 });
	 $('#hSony').click(function(){
	 	document.getElementById("hApple").style.textDecoration = "none";
		document.getElementById("hSamsung").style.textDecoration = "none";
		document.getElementById("hMotorola").style.textDecoration = "none";
		document.getElementById("hVivo").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=sony]').css('display','none');
		document.getElementById("hSony").style.textDecoration = "underline";
		$('.phantrang').css('display','none');
	 });
	 $('#hVivo').click(function(){
	 	document.getElementById("hApple").style.textDecoration = "none";
		document.getElementById("hSamsung").style.textDecoration = "none";
		document.getElementById("hSony").style.textDecoration = "none";
		document.getElementById("hMotorola").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=vivo]').css('display','none');
		document.getElementById("hVivo").style.textDecoration = "underline";
		$('.phantrang').css('display','none');
	 });
	 $('#hTabHuawei').click(function(){
	 	document.getElementById("hTabApple").style.textDecoration = "none";
		document.getElementById("hTabSamsung").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=huawei]').css('display','none');
		document.getElementById("hTabHuawei").style.textDecoration = "underline";
		$('.phantrang').css('display','none');
	 });
	 $('#hTabApple').click(function(){
	 	document.getElementById("hTabHuawei").style.textDecoration = "none";
		document.getElementById("hTabSamsung").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=apple]').css('display','none');
		document.getElementById("hTabApple").style.textDecoration = "underline";
		$('.phantrang').css('display','none');
	 });
	 $('#hTabSamsung').click(function(){
	 	document.getElementById("hTabApple").style.textDecoration = "none";
		document.getElementById("hTabHuawei").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=samsung]').css('display','none');
		document.getElementById("hTabSamsung").style.textDecoration = "underline";
		$('.phantrang').css('display','none');
	 });
	$('.list-group-item').on('click', function() {
		var $this = $(this);
		$('.active').removeClass('active');
		$this.toggleClass('active');
		switch(this.id) {
			case "1":
				$('.qlsanpham').css('display','block');
				$('.qlloaisanpham').css('display','none');
				$('.qlnhasanxuat').css('display','none');
				$('.qldonhang').css('display','none');
				break;
			case "2":
				$('.qlsanpham').css('display','none');
				$('.qlloaisanpham').css('display','block');
				$('.qlnhasanxuat').css('display','none');
				$('.qldonhang').css('display','none');
				break;
			case "3":
				$('.qlsanpham').css('display','nonee');
				$('.qlloaisanpham').css('display','none');
				$('.qlnhasanxuat').css('display','block');
				$('.qldonhang').css('display','none');
				break;
			case "4":
				$('.qlsanpham').css('display','none');
				$('.qlloaisanpham').css('display','none');
				$('.qlnhasanxuat').css('display','none');
				$('.qldonhang').css('display','block');
				break;
		}
	});
	$('.tinhtrangopt').change(function(){
		var val = $(this).val();
		switch(val) {
			case "1":
				$(this).parents('div.donhang-item').attr('id','chuagiao');
				break;
			case "2":
				$(this).parents('div.donhang-item').attr('id','danggiao');
				break;
			case "3":
				$(this).parents('div.donhang-item').attr('id','dagiao');
				break;
		}
	});
	
}) 

function showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
  }
}
var SigningIn = function() {
	var signin =  sessionStorage.getItem("signined");
	if(signin) {
		$('.nav-dangky').css('display','none');
		$('.nav-dangnhap').css('display','none');
		$('.dropdown').css('display','block');
		document.getElementById("userName").innerHTML =sessionStorage.getItem("user_name");
	}
	else
	{
		$('.nav-dangky').css('display','block');
		$('.nav-dangnhap').css('display','block');
		$('.nav-taikhoan>.dropdown').css('display','none');
	}
};

function changeimg(clicked_img) {
		var a = document.getElementById(clicked_img).src;
		document.getElementById('img0').src = a;
	}
