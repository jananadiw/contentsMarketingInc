var isMobile = isMobile();
$(document).ready(function(){
	var req_note_num;
	if(isMobile){
		req_note_num=3;
	}else{
		req_note_num=4;
	}
	requestHome(req_note_num,req_note_num);
});
$(".bxslider li img").load(function(){
	if(isMobile)
  		$('.bxslider li img').css('height',$('.bxslider li img').width());
	}).each(function() {
  		if(this.complete) $(this).load();
  	});
$(window).resize(function(){
	$('.video_icon').css('bottom',$('.thread span').height()+30);
	$('.video_icon').css('left',$('.thread span').width()*1/15);
});
function requestHome(t_note_num,b_note_num){
	$.get("https://dietnote.net/api/v11/home/",{today_note_num:t_note_num,bf_note_num:b_note_num},function(data){
		//console.log(data);
		setUpView(data);
	},"json");
}
/*function requestFeeds(id,e_num){
	$.get("https://dietnote.net/api/v11/home/feeds/",{anchor:id,direction:0,rec_editor_num:e_num},function(data){
		setUpSecondView(data);
	},"json");
}*/
function setUpView(data){
	//top banner 
	var banner = data.banner;
	var bannerId = banner.id;
	var bannerPic = banner.picture_url;
	$('.t_banner').append("<img class='bannerImg' src='"+bannerPic+"'/><p class='pid'>"+bannerId+"</p>");
	
	//thread list
	var threadList = data.threadlist;
	
	for(var i=0; i <12; i++){
		var t_url = threadList[i].crop_picture_url;
		var t_id = threadList[i].id;
		var title = threadList[i].title;
		var y_url = threadList[i].youtube_url;

		var appendHtmlText = "";
		var appendPlayBtn="";
		if(y_url){
			appendPlayBtn = "<img class='video_icon' src='images/video_icon.png'/>";
		}
		appendHtmlText ="<td>"
						+"<img class='t_img' src='"+t_url+"'>"
						+"<span>"+title+"</span>"
						+"<p class='pid'>"+t_id+"</p>"
						+appendPlayBtn
						+"</td>";

		if(isMobile){
			if(i<4){
				if(i%2==0){
					$('#thread1').append($('<tr>'));
				}
				$('#thread1 tr:last').append(appendHtmlText);
			}else if(i<8){
				if(i%2==0){
					$('#thread2').append($('<tr>'));
				}
				$('#thread2 tr:last').append(appendHtmlText);	
			}else{
				if(i%2==0){
					$('#thread3').append($('<tr>'));
				}
				$('#thread3 tr:last').append(appendHtmlText);	
			}
		}else{
			if(i<6){
				if(i%3==0){
					$('#thread1').append($('<tr>'));
				}
				$('#thread1 tr:last').append(appendHtmlText);
			}else{
				if(i%3==0){
					$('#thread2').append($('<tr>'));
				}
				$('#thread2 tr:last').append(appendHtmlText);	
			}
		}
	}
	//today note
	var today_note = data.today_notelist;
	for(var i=0; i < today_note.length; i++){
		var content = today_note[i].content;
		var id = today_note[i].id;
		var pic = today_note[i].picture_url;
		var title = today_note[i].title;
		pic = changeCropToThumbnail(pic);

		var appendHtmlText = "<div class = 'today_note_contents'>"
							+"<img class =tNote_img src='"+pic+"'/>"
							+"<div class = 'cTextArea1'>"
							+"<div class='title'>"+title+"</div>"
							+"<div class='content'>"+content+"</div>"
							+"</div>"
							+"<p class ='pid'>"+id+"</p>"
							+"</div>";
		$('.today_note').append(appendHtmlText);
	}
	//dano sister pick
	var dano_pick = data.danoshop_area1.product_list;
	var dano_pick_title = data.danoshop_area1.title;
	$('.dano_pick .main-title-text').text(dano_pick_title);
	for(var i =0; i < dano_pick.length;i++){
		var name = dano_pick[i].name;
		var link = dano_pick[i].link;
		var pic = dano_pick[i].picture_url; 
		var desc = dano_pick[i].description;

		var appendHtmlText = "<div style='background-image:url("+pic+");' class ='dano_pick_contents'>"
							+"<a href='"+link+"'>"
							+"<img class='img_shadow' src='/images/hot_topic_danoshop_shadow.png'/>"
							+"<p class='title'>"+name+"</p>"
							+"<p class ='description'>"+desc+"</p>"
							+"</a>";
		$('.dano_pick').append(appendHtmlText);
	}
	//danoshop special link 
	var danoshop_special = data.link_banner;
	var link = danoshop_special.link;
	var pic = danoshop_special.picture_url;
	var appendHtmlText = "<a href = '"+link+"'>"
						+"<img src= '"+pic+"'/>"
						+"</a>";
	$('.dano_special').append(appendHtmlText);
	
	//danoshop weekly choice
	var danoshop_item = data.danoshop_area2.product_list;
	//console.log(danoshop_item.length)
	for(var i =0; i<danoshop_item.length;i++){
		var name = danoshop_item[i].name;
		var link = danoshop_item[i].link;
		var pic = danoshop_item[i].picture_url; 
		var desc = danoshop_item[i].description;

		var appendHtmlText = "<li>"
							+"<a href ='"+link+"'>"
							+"<img src='"+pic+"'/>"
							+"<p class='title'>"+name+"</p>"
							//+"<p class ='description'>"+desc+"</p>"
							+"</a></li>";
		$('.bxslider').append(appendHtmlText);
	}
	var appendGotoDanoText = "<li style='background-color:#f6f6f6;' id='goToShop'>"
							+"<a href ='http://www.danoshop.net' target='_blank'>"
							+"<p style='text-align:center; margin-top:30%;color:#7a7a7a;'>다노샵</p>"
							+"<p style='text-align:center; color:#7a7a7a;'>바로가기</p>"
							+"<p class ='title'></p>"
							+"</a></li>";
	$('.bxslider').append(appendGotoDanoText);
	//set bxslider
	var minSlide;
	var maxSlide;
	if(isMobile){
		minSlide=3;
		maxSlide=4;
	}else{
		minSlide=4;
		maxSlide=5;
	}
	$('.bxslider').bxSlider({
		minSlides:minSlide,
		maxSlides:maxSlide,
		slideWidth: 200,
		slideMargine: 0,
		pager:false,
		nextSelector: '#slider-next',
  		prevSelector: '#slider-prev',
  		infiniteLoop: false, 
  		auto: true,
  		nextText:'<img src="images/pick_arrow_right.png" height="25px" width="25px"/>',
  		prevText:'<img src="images/pick_arrow_left.png" height="25px" width="25px"/>'
	});

	//dano change 
	var dano_change= data.bf_notelist;
	for(var i =0 ; i < dano_change.length; i++){
		var content = dano_change[i].content;
		var id = dano_change[i].id;
		var pic = dano_change[i].picture_url;
		var title = dano_change[i].title;
		pic = changeCropToThumbnail(pic);
		var appendHtmlText = "<div class='dano_change_contents'>"
							+"<img src='"+pic+"'/>"
							+"<div class = 'cTextArea1'>"
							+"<p class='pid'>"+id+"</p>"
							+"<div class='title'>"+title+"</div>"
							+"<div class='content'>"+content+"</div>"
							+"</div>"
							+"</div>";
		$('.dano_change').append(appendHtmlText);
	}

	//dano editor
	var editor_num;
	if(isMobile){
		editor_num=3;
	}else{
		editor_num=4;
	}
	requestFeeds(threadList[11].id,editor_num);
}
function setUpSecondView(data){
	var threadList = data.threadlist;
	for(var i=0; i <12; i++){
		var t_url = threadList[i].crop_picture_url;
		var t_id = threadList[i].id;
		var title = threadList[i].title;
		var y_url = threadList[i].youtube_url;

		var appendHtmlText = "";
		var appendPlayBtn="";
		if(y_url){
			appendPlayBtn = "<img class='video_icon' src='images/video_icon.png'/>";
		}
		appendHtmlText ="<td>"
						+"<img class='t_img' src='"+t_url+"'>"
						+"<span>"+title+"</span>"
						+"<p class='pid'>"+t_id+"</p>"
						+appendPlayBtn
						+"</td>";
		if(isMobile){
			if(i<4){
				if(i%2==0){
					$('#thread4').append($('<tr>'));
				}
				$('#thread4 tr:last').append(appendHtmlText);
			}
		}else{
			if(i<6){
				if(i%3==0){
					$('#thread3').append($('<tr>'));
				}
				$('#thread3 tr:last').append(appendHtmlText);
			}else{
				if(i%3==0){
					$('#thread4').append($('<tr>'));
				}
				$('#thread4 tr:last').append(appendHtmlText);	
			}
		}
	}
	var danoEditor = data.rec_editorlist;
	var editorShow;
	if(isMobile){
		editorShow = 1;
	}else{
		editorShow = danoEditor.length;
	}
	for(var i=0; i < editorShow; i++){
		var id = danoEditor[i].id;
		var intro = danoEditor[i].introduction;
		var name = danoEditor[i].name;
		var pic = danoEditor[i].profile_pic;

		var appendHtmlText="<div class ='editor'>"
							+"<img class ='circular' src='"+pic+"'/>"
							+"<span class='eName'>"+name+"</span>"
							+"<span class= 'intro'>"+intro+"</span>"
							+"<p class='pid'>"+id+"</p>"
							+"<img class='editor_follow'src='/images/btn_follow.png'/>"
							+"</div>";
		$('.dano_editor').append(appendHtmlText);
	}

	setCss();
	addClickEvent();
}
function setCss(){
	var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	if(isMobile){

		$('.thread td').css('height',screenWidth/2);
		$('.thread td:last-child').show();
		$('.thread td span').css('height',screenWidth/7);
		
		$('.tNote_img').css('width',80); 
		$('.tNote_img').css('height',80); 
		$('.today_note_contents').css('height',95);
		
		
		$('.dano_change_contents img').css('width',80);
		$('.dano_change_contents img').css('height',80);
		$('.dano_change_contents').css('height',95);

		//$('.dano_pick_contents').css('height',screenWidth*1/3-5);
		//$('.dano_pick_contents').css('margin-bottom',3);
		//$('.dano_pick_contents:first').css('height',screenWidth*2/3);
		//$('.dano_pick_contents:first').css('margin-bottom',5);
		//$('.dano_pick_contents').eq(2).css('margin-bottom',8);
		//$('.dano_pick').css('height',$('.dano_pick_contents:first').height()+25+$('.dano_pick_contents:first p').height());
		//console.log($('.dano_pick_contents:first p').height());
		$('.editor').css('height',screenWidth*5/9);

		$('#slider-prev').hide();
		$('#slider-next').hide();
		
		$('.video_icon').width(24);
		$('.video_icon').height(24);
		$('.video_icon').css('bottom',$('.thread span').height()+20);
		$('.video_icon').css('left',$('.thread span').width()*1/15);
	}else{
		$('.video_icon').width(26);
		$('.video_icon').height(26);
		$('.video_icon').css('bottom',$('.thread span').height()+30);
		$('.video_icon').css('left',$('.thread span').width()*1/15);
	}
	
}
function addClickEvent(){
	$('.bannerImg').css('cursor','pointer');
	$('.thread td').css('cursor','pointer');
	$('.thread td').css('cursor','pointer');
	$('.today_note_contents').css('cursor','pointer');
	$('.dano_change_contents').css('cursor','pointer');
	$('.editor_follow').css('cursor','pointer');
	$('.thread td').on('click',function(){
		var pid = $(this).find('.pid').text();
		window.location.href=addParams('/tip.html',pid);
	});
	$('.today_note_contents').on('click',function(){
		var pid = $(this).find('.pid').text();
		window.location.href=addParams('/note.html',pid);
	});
	$('.dano_change_contents').on('click',function(){
		var pid = $(this).find('.pid').text();
		window.location.href=addParams('/note.html',pid);
	});
	$('.editor_follow').on('click',function(){
		togglePopup();
	});
	$('.t_banner').on('click',function(){
		var pid = $(this).find('.pid').text();
		window.location.href=addParams('/tip.html',pid);
	});
}
