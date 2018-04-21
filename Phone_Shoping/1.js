$("#searchbtn").on('click',function() {
	$('div.tieude_page').css('display','none');
	$('div[class *= col-lg-3][id!=iphone]').css('display','none');
	var text = $('#searchtxt').text();

	return false;
})