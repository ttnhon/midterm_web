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

})  
