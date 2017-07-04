$(document).ready(function(){
	addCommonClickEvent();
	//setCommonCss();
});
function setCommonCss(){
	$('.gradient_all').css('width',$(window).width());
}
function addCommonClickEvent(){
	$('.btn_play_store').css('cursor','pointer');
	$('.btn_appstore').css('cursor','pointer');
	$('.btn_download').css('cursor','pointer');
	$('.btn_share').css('cursor','pointer');
	$('.btn_play_store').on('click',function(){
		ga('send', {
  			hitType: 'event',
  			eventCategory: 'href',
  			eventAction: 'move',
  			eventLabel: 'playstore'
		});
		window.location.href="https://play.google.com/store/apps/details?id=tecsturelab.dietnote";
	});
	$('.btn_appstore').on('click',function(){
		ga('send', {
  			hitType: 'event',
  			eventCategory: 'href',
  			eventAction: 'move',
  			eventLabel: 'appstore'
		});		
		window.location.href="https://itunes.apple.com/kr/app/daieoteu-noteu/id844433509?l=en&mt=8&ls=1";
	});
	$('.btn_download').on('click',function(){
		appDown();
	});
}
function goDagymApp(){
	if(navigator.userAgent.match(/Android/i)){
			ga('send', {
  				hitType: 'event',
  				eventCategory: 'href',
  				eventAction: 'down',
  				eventLabel: 'dagym_android'
			});
			window.location.href="https://play.google.com/store/apps/details?id=dano.danodagym";	
		}else if(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)
			||navigator.userAgent.match(/iPod/i)){
			//window.location.href="https://itunes.apple.com/kr/app/daieoteu-noteu/id844433509?l=en&mt=8&ls=1
//";		
			ga('send', {
  				hitType: 'event',
  				eventCategory: 'href',
  				eventAction: 'down',
  				eventLabel: 'dagym_ios'
			});
			alert("준비 중입니다.");
		}else{
			ga('send', {
  				hitType: 'event',
  				eventCategory: 'href',
  				eventAction: 'down',
  				eventLabel: 'dagym_web'
			});
			alert("모바일에서만 다운 가능합니다.");
		}
}
function changeCropToThumbnail(text){
	var newText = text.replace('crop','thumbnail');
	return newText;
}
function addParams(url,params){
	console.log('add params... ' + params);
	//return url+"?"+params;
	return url+"?id="+params;
}
function getParams(){

	var val = getParameterByName('id');
	console.log('id::: ' + val);
	if(val == null){
		val = location.href.split("?")[1];
	}
	//return val[1];
	return val;
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function isMobile() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
  /*
  if(typeof window.orientation !== 'undefined'){
		isMobile =true;
	}
	*/
}
function timeDiff(inputTime){
	var cTime  = new Date();

	var match = inputTime.match(/^(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\:(\d+)$/);
	var sTime = new Date(match[1], match[2] - 1, match[3], match[4], match[5], match[6]);
	//var sTime = new Date(inputTime);

	var clientTime=	cTime.getTime(); 
	var serverTime = sTime.getTime();
	console.log("ctime: " + clientTime + " stime: " + serverTime);
	var timeDiff = (clientTime-serverTime)/1000;
	var minute = timeDiff/(60);
	var hour = timeDiff/(60*60);
	var day = timeDiff/(60*60*24);
	var month = timeDiff/(60*60*24*30);
	var year = timeDiff/(60*60*24*365);
	
	console.log(timeDiff + " " + minute);
	//console.log(timeDiff+" "+second+ " "+ minute+" "+hour+" "+day);

	if(year>1){
		return parseInt(year)+"년 전";
	}else if(month>1){
		return parseInt(month)+"개월 전";
	}else if(day>1){
		return parseInt(day)+"일 전";
	}else if(hour>1){
		return parseInt(hour)+"시간 전";
	}else if(minute>1){
		return parseInt(minute)+"분 전";
	}else{
		return "조금 전";
	}
}
function appDown(){
	if(navigator.userAgent.match(/Android/i)){
		ga('send', {
  			hitType: 'event',
  			eventCategory: 'href',
  			eventAction: 'down',
  			eventLabel: 'playstore'
		});
		if( navigator.userAgent.match(/Android/i)){
			document.location="market://details?id=tecsturelab.dietnote";
		}else{		
			window.location.href="https://play.google.com/store/apps/details?id=tecsturelab.dietnote";	
		}
	}else if(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)
			||navigator.userAgent.match(/iPod/i)){
		ga('send', {
  			hitType: 'event',
  			eventCategory: 'href',
  			eventAction: 'down',
  			eventLabel: 'appstore'
		});		
		window.location.href="https://itunes.apple.com/kr/app/daieoteu-noteu/id844433509?l=en&mt=8&ls=1";
	}else{
		alert("모바일에서만 다운 가능합니다.");
	}
}
function togglePopup(){
	if($('.popUp:visible').length==0){
		$('.popUp').show();
		$('.gradient_all').show();
	}else{
		$('.popUp').hide();
		$('.gradient_all').hide();
	}
}
function showShareToggle(){
	if($('.popUp:visible').length!=0){
		$('.popUp').hide();
		$('.gradient_all').hide();
		return;
	}
		
	if($('.shareToggle:visible').length==0){
		$('.shareToggle').show();
		$('.gradient_all').show();
	}else{
		$('.shareToggle').hide();
		$('.gradient_all').hide();
	}
}
function shareContents(type){

	var curUrl = window.location.href;
	console.log('curUrl: ' + curUrl);
	var splitText = curUrl.split("?");
	var splitSlashText = curUrl.split("/");
	console.log("length: " + splitSlashText.length);
	
	var pageNum = 0;
//    var pageType = 'http://dano.me;
	var pageType = 'http://dietapp.cafe24.com;
	if(splitText.length == 2){
		//pageNum = splitText[1];
		pageNum = getParams();
		tempPageType = splitSlashText[3].split("?")[0];

		if(tempPageType == "tip.html"){
			pageType = "http://dietapp.cafe24.com" + pageNum + "/";
		}else if(tempPageType == "note.html"){
			pageType = "http://dietnote.net/notes/" + pageNum + "/";
		}else{
//			pageType = "http://dano.me";
            pageType = "http://dietapp.cafe24.com";
		}
	}


	switch(type){
		case 0:
			ga('send', {
  				hitType: 'event',
  				eventCategory: 'href',
  				eventAction: 'share',
  				eventLabel: 'facebook'
			});	
			FB.ui({
  				method: 'share',
			    href: 'http://dano.me',
			    href: pageType,
				}, function(response){
					if(response && !response.error_message){
						//alert("posting completed");
					}else{
						alert(response.error_message);
					}
				});
		break;
		case 1:
			if(isMobile){
				ga('send', {
  					hitType: 'event',
  					eventCategory: 'href',
  					eventAction: 'share',
  					eventLabel: 'kakaotalk'
				});	
			}else{
				alert("pc에선 지원하지 않습니다.");
			}
		break;
		case 2:
			if(isMobile){
				ga('send', {
  					hitType: 'event',
  					eventCategory: 'href',
  					eventAction: 'share',
  					eventLabel: 'kakaostory'
				});
			}else{
				alert("pc에선 지원하지 않습니다.");
			}
		break;
		case 3:
			ga('send', {
  					hitType: 'event',
  					eventCategory: 'href',
  					eventAction: 'share',
  					eventLabel: 'copylink'
				});
			//var url = window.location.href;
			var url = pageType;
			var $temp = $("<input>")
    		$("body").append($temp);
    		$temp.val(url).select();
    		document.execCommand("copy");
			$temp.remove();
    		alert("링크가 클립보드에 복사되었습니다.");
		break;
		default:
		break;
	}
}
function goSite(num){
	switch(num){
		case 0:
			ga('send', {
  				hitType: 'event',
  				eventCategory: 'href',
  				eventAction: 'move',
  				eventLabel: 'danoshop'
			});
			window.location.href='http://www.danoshop.net';
		break;
		case 1:
			ga('send', {
  				hitType: 'event',
  				eventCategory: 'href',
  				eventAction: 'move',
  				eventLabel: 'mydano'
			});
			window.location.href='https://www.mydano.net';
		break;
		default:
		break;
	}
}
function _gaTracking(category,action,label){
	ga('send', {
  		hitType: 'event',
  		eventCategory: category,
  		eventAction: action,
  		eventLabel: label
	});
}
