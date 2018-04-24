$(function(){
	 $("#searchbtn").on('click',function() {
		$('div.tieude_page').css('display','none');
		$('div[class *= col-lg-3][id!=iphone]').css('display','none');
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

	 $("#nut_dathang").click(function(){
	 	$('.div-thanhtoan').removeClass('an_div');
	 });
})  
