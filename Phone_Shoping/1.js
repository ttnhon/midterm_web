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
	 $('.nut_dangnhap').click(function(){
	 	alert("abcd");
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
