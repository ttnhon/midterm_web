$(function(){

	 $("#searchbtn").on('click',function() {
		$('div.tieude_page').css('display','none');
		$('div[class *= col-lg-3][id!=apple]').css('display','none');
		var text = $('#searchtxt').text();

		return false;
	});
	 $('.nav-dangnhap').click(function(){
	 	$('.manhinh_dangky').removeClass('ra');
	 	$('.manhinh_dangnhap').addClass('ra');
	 	return false; 
	 });
	 $('.nav-dangky').click(function(){
	 	$('.manhinh_dangnhap').removeClass('ra');
	 	$('.manhinh_dangky').addClass('ra');
	 	return false; 
	 });
	 $('.dong_dangnhap').click(function(){
	 	$('.manhinh_dangnhap').removeClass('ra');
	 	$('.manhinh_dangky').removeClass('ra');
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

	 $('.nut_dangnhap').click(function(){
	 	signin = true;
	 	$('.manhinh_dangnhap').removeClass('ra');
	 	SigningIn();
	 });
	 $('.sanpham').click(function(){
	 	window.location.href="Chitiet.html";
	 });
	 $('#hApple').click(function(){
		document.getElementById("hMotorola").style.textDecoration = "none";
		document.getElementById("hSamsung").style.textDecoration = "none";
		document.getElementById("hSony").style.textDecoration = "none";
		document.getElementById("hVivo").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=apple]').css('display','none');
		document.getElementById("hApple").style.textDecoration = "underline";
	 });
	 $('#hMotorola').click(function(){
	 	document.getElementById("hApple").style.textDecoration = "none";
		document.getElementById("hSamsung").style.textDecoration = "none";
		document.getElementById("hSony").style.textDecoration = "none";
		document.getElementById("hVivo").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=motorola]').css('display','none');
		document.getElementById("hMotorola").style.textDecoration = "underline";
	 });
	 $('#hSamsung').click(function(){
	 	document.getElementById("hApple").style.textDecoration = "none";
		document.getElementById("hMotorola").style.textDecoration = "none";
		document.getElementById("hSony").style.textDecoration = "none";
		document.getElementById("hVivo").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=samsung]').css('display','none');
		document.getElementById("hSamsung").style.textDecoration = "underline";
	 });
	 $('#hSony').click(function(){
	 	document.getElementById("hApple").style.textDecoration = "none";
		document.getElementById("hSamsung").style.textDecoration = "none";
		document.getElementById("hMotorola").style.textDecoration = "none";
		document.getElementById("hVivo").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=sony]').css('display','none');
		document.getElementById("hSony").style.textDecoration = "underline";
	 });
	 $('#hVivo').click(function(){
	 	document.getElementById("hApple").style.textDecoration = "none";
		document.getElementById("hSamsung").style.textDecoration = "none";
		document.getElementById("hSony").style.textDecoration = "none";
		document.getElementById("hMotorola").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=vivo]').css('display','none');
		document.getElementById("hVivo").style.textDecoration = "underline";
	 });
	 $('#hTabHuawei').click(function(){
	 	document.getElementById("hTabApple").style.textDecoration = "none";
		document.getElementById("hTabSamsung").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=huawei]').css('display','none');
		document.getElementById("hTabHuawei").style.textDecoration = "underline";
	 });
	 $('#hTabApple').click(function(){
	 	document.getElementById("hTabHuawei").style.textDecoration = "none";
		document.getElementById("hTabSamsung").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=apple]').css('display','none');
		document.getElementById("hTabApple").style.textDecoration = "underline";
	 });
	 $('#hTabSamsung').click(function(){
	 	document.getElementById("hTabApple").style.textDecoration = "none";
		document.getElementById("hTabHuawei").style.textDecoration = "none";
		$('div[class *= col-lg-3]').css('display','block');
		$('div[class *= col-lg-3][id!=samsung]').css('display','none');
		document.getElementById("hTabSamsung").style.textDecoration = "underline";
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
var signin = false;
var SigningIn = function() {
	if(signin) {
		$('.nav-dangky').css('display','none');
		$('.nav-dangnhap').css('display','none');
		$('.dropdown').css('display','block');
	}	
};

window.onload