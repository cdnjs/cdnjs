/*
jQuery Plugin: imgLiquid v0.9.86 / 22-04-13
jQuery plugin to resize images to fit in a container.
Copyright (c) 2012 Alejandro Emparan (karacas), twitter: @krc_ale
Dual licensed under the MIT and GPL licenses
https://github.com/karacas/imgLiquid

ex:
	$(".imgLiquid").imgLiquid({fill:true});

	//OPTIONS:

	>js
		fill: true,
		verticalAlign:	  	//'center' //'top' //'bottom'
		horizontalAlign:	//'center' //'left' //'right'

	>js callBakcs
		onStart:		function(){},
		onFinish:	   	function(){},
		onItemResize:   function(index, container, img){},
		onItemStart:	function(index, container, img){},
		onItemFinish:   function(index, container, img){}

	>hml5 data attr (overwrite all)
		data-imgLiquid-fill="true"
		data-imgLiquid-horizontalAlign="center"
		data-imgLiquid-verticalAlign="center"

*/
//
var imgLiquid=imgLiquid||{VER:"0.9.86"};(function($){imgLiquid.isIE= /*@cc_on!@*/ false;$(function(){imgLiquid.backgroundSizeAvaiable=$('<div style="background-size:cover"></div>').css("background-size")==="cover"});$.fn.extend({imgLiquid:function(options){var imgLiquidRoot=this;this.defaults={fill:true,verticalAlign:"center",horizontalAlign:"center",useBackgroundSize:true,useDataHtmlAttr:true,responsive:true,delay:0,fadeInTime:0,removeBoxBackground:true,ieFadeInDisabled:true,hardPixels:true,responsiveCheckTime:500,timecheckvisibility:500,onStart:null,onFinish:null,onItemStart:null,onItemFinish:null};this.options=options;this.settings=$.extend({},this.defaults,this.options);if(this.settings.onStart){this.settings.onStart()}return this.each(function($i){var $imgBoxCont=$(this);var settings;var $img=$("img:first",$imgBoxCont);if($img.length===0){onError();return}if(!$img.data("imgLiquid_settings")){settings=$.extend({},imgLiquidRoot.settings,getSettingsOverwrite())}else{settings=$.extend({},$img.data("imgLiquid_settings"),imgLiquidRoot.options)}$img.data("imgLiquid_settings",settings);if(settings.onItemStart){settings.onItemStart($i,$imgBoxCont,$img)}if(imgLiquid.backgroundSizeAvaiable&&settings.useBackgroundSize){processBgSize()}else{processOldMethod()}function processBgSize(){var bsVale=(settings.fill)?"cover":"contain";var bpos=settings.horizontalAlign.toLowerCase()+" "+settings.verticalAlign.toLowerCase();if($imgBoxCont.css("background-image").indexOf($img.attr("src"))===-1){$imgBoxCont.css({"background-image":"url("+$img.attr("src")+")"})}$imgBoxCont.css({"background-size":bsVale,"background-repeat":"no-repeat","background-position":bpos});$("a:first",$imgBoxCont).css({display:"block",width:"100%",height:"100%"});$("img",$imgBoxCont).css({display:"none"});if(settings.onItemFinish){settings.onItemFinish($i,$imgBoxCont,$img)}checkFinish()}function processOldMethod(){if($img.data("imgLiquid_oldProcessed")){if(!(imgLiquid.backgroundSizeAvaiable&&settings.useBackgroundSize)){makeOldProcess()}return}$img.data("imgLiquid_oldProcessed",false);$img.fadeTo(0,0);$("img:not(:first)",$imgBoxCont).css("display","none");$img.removeAttr("width").removeAttr("height").css({visibility:"visible","max-width":"none","max-height":"none",width:"auto",height:"auto",display:"block"});$imgBoxCont.css({overflow:"hidden"});function onLoad(){if($img.data("imgLiquid_loaded")||$img.data("imgLiquid_oldProcessed")){return}if($imgBoxCont.is(":visible")&&$img[0].complete&&$img[0].width>0&&$img[0].height>0){$img.data("imgLiquid_loaded",true);setTimeout(makeOldProcess,$i*settings.delay)}else{setTimeout(onLoad,settings.timecheckvisibility)}}onLoad();checkResponsive()}function checkResponsive(){if(!settings.responsive&&!$img.data("imgLiquid_oldProcessed")){return}settings=$img.data("imgLiquid_settings");$imgBoxCont.actualSize=$imgBoxCont.get(0).offsetWidth+($imgBoxCont.get(0).offsetHeight/10000);if($imgBoxCont.sizeOld&&$imgBoxCont.actualSize!==$imgBoxCont.sizeOld){makeOldProcess()}$imgBoxCont.sizeOld=$imgBoxCont.actualSize;setTimeout(checkResponsive,settings.responsiveCheckTime)}function onError(){$imgBoxCont.css("visibility","hidden");checkFinish()}function getSettingsOverwrite(){var SettingsOverwrite={};if(imgLiquidRoot.settings.useDataHtmlAttr){var dif=$imgBoxCont.attr("data-imgLiquid-fill");var ha=$imgBoxCont.attr("data-imgLiquid-horizontalAlign");var va=$imgBoxCont.attr("data-imgLiquid-verticalAlign");if(dif==="true"||dif==="false"){SettingsOverwrite.fill=Boolean(dif==="true")}if(ha==="left"||ha==="center"||ha==="right"){SettingsOverwrite.horizontalAlign=ha}if(va==="top"||va==="bottom"||va==="center"){SettingsOverwrite.verticalAlign=va}}if(imgLiquid.isIE&&imgLiquidRoot.settings.ieFadeInDisabled){SettingsOverwrite.fadeInTime=0}return SettingsOverwrite}function makeOldProcess(){var w,h,wn,hn,$imgCW,$imgCH;$imgCW=$imgBoxCont.width();$imgCH=$imgBoxCont.height();if($img.data("owidth")===undefined){$img.data("owidth",$img[0].width)}if($img.data("oheight")===undefined){$img.data("oheight",$img[0].height)}if(settings.fill===($imgCW/$imgCH)>=($img.data("owidth")/$img.data("oheight"))){w="100%";h="auto";wn=Math.floor($imgCW);hn=Math.floor($imgCW*($img.data("oheight")/$img.data("owidth")))}else{h="100%";w="auto";wn=Math.floor($imgCH*($img.data("owidth")/$img.data("oheight")));hn=Math.floor($imgCH)}var ha=settings.horizontalAlign.toLowerCase();var hdif=$imgCW-wn;var margL=0;if(ha==="center"){margL=hdif/2}if(ha==="right"){margL=hdif}var va=settings.verticalAlign.toLowerCase();var vdif=$imgCH-hn;var margT=0;if(va==="center"){margT=vdif/2}if(va==="bottom"){margT=vdif}if(settings.hardPixels){w=wn;h=hn}$img.css({width:w,height:h,"margin-left":Math.floor(margL),"margin-top":Math.floor(margT)});if(!$img.data("imgLiquid_oldProcessed")){if(settings.removeBoxBackground){$imgBoxCont.css("background-image","none")}$img.fadeTo(settings.fadeInTime,1);$img.data("imgLiquid_oldProcessed",true)}if(settings.onItemFinish){settings.onItemFinish($i,$imgBoxCont,$img)}checkFinish()}function checkFinish(){if($i===imgLiquidRoot.length-1){if(imgLiquidRoot.settings.onFinish){imgLiquidRoot.settings.onFinish()}}}})}})})(jQuery);