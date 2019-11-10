/*
 Inspired by the lightbox plugin adapted to jquery by Leandro Vieira Pinho (http://leandrovieira.com)
 
 @author  : Nicolas Turlais : nicolas-at-insipi.de
 @version : V0.3.1 - June 2012
 @license : Licensed under CCAttribution-ShareAlike
 @website : http://chocolat.insipi.de
 
*/
(function($) {
	images = [];
	var calls = 0;
	$.fn.Chocolat = function(settings) {
		settings = $.extend({
			container             : $('body'),
			displayAsALink        : false,
			linkImages            : true,
			linksContainer        : 'Choco_links_container',				
			overlayOpacity        : 0.9,
			overlayColor          : '#fff',
			fadeInOverlayduration : 500,
			fadeInImageduration   : 500,
			fadeOutImageduration  : 500,
			vache                 : true,					
			separator1            : ' | ',						
			separator2            : '/',						
			leftImg               : 'images/left.gif',	
			rightImg              : 'images/right.gif',	
			closeImg              : 'images/close.gif',		
			loadingImg            : 'images/loading.gif',		
			currentImage          : 0,						
			setIndex              : 0,
			setTitle              : '',
			lastImage             : 0
		},settings);
		
		calls++;
		settings.setIndex = calls;
		images[settings.setIndex] = [];
		
		//images:
		this.each(function(index){
			if(index == 0 && settings.linkImages && settings.setTitle == ''){
				settings.setTitle = isSet($(this).attr('rel'), ' ');
			}
			$(this).each(function() {
				images[settings.setIndex]['displayAsALink'] = settings.displayAsALink;
				images[settings.setIndex][index]            = [];
				images[settings.setIndex][index]['adress']  = isSet($(this).attr('href'), ' ');
				images[settings.setIndex][index]['caption'] = isSet($(this).attr('title'), ' ');
				if(!settings.displayAsALink){
					$(this).unbind('click').bind('click', {
						id  : settings.setIndex,
						nom : settings.setTitle,
						i   : index
					}, _initialise);
				}
			})
		});
		
		//setIndex:
		for(var i = 0; i < images[settings.setIndex].length; i++)
		{
			if(images[settings.setIndex]['displayAsALink']){
				if($('#'+settings.linksContainer).size() == 0){
					this.filter(":first").before('<ul id="'+settings.linksContainer+'"></ul>');
				}
				$('#'+settings.linksContainer).append('<li><a href="#" id="Choco_numsetIndex_'+settings.setIndex+'" class="Choco_link">'+settings.setTitle+'</a></li>');
				e = this.parent();
				$(this).remove();
				if($.trim(e.html()) == ""){//If parent empty : remove it
					e.remove();
				}
				return $('#Choco_numsetIndex_'+settings.setIndex).unbind('click').bind('click', {id: settings.setIndex, nom : settings.setTitle, i : settings.currentImage}, _initialise);
			}
		}
		
		function _initialise(event) {
			
			settings.currentImage = event.data.i;
			settings.setIndex     = event.data.id;
			settings.setTitle     = event.data.nom;
			settings.lastImage    = images[settings.setIndex].length - 1;
			showChocolat();
			return false;
		}
		function _interface(){
			//html
			clear();
			settings.container.append('<div id="Choco_overlay"></div><div id="Choco_content"><div id="Choco_close"></div><div id="Choco_loading"></div><div id="Choco_container_photo"><img id="Choco_bigImage" src="" /></div><div id="Choco_container_description"><span id="Choco_container_title"></span><span id="Choco_container_via"></span></div><div id="Choco_left_arrow" class="Choco_arrows"></div><div id="Choco_right_arrow" class="Choco_arrows"></div></div>');	
			$('#Choco_left_arrow').css('background-image', 'url('+settings.leftImg+')');  
			$('#Choco_right_arrow').css('background-image', 'url('+settings.rightImg+')');  
			$('#Choco_close').css('background-image', 'url('+settings.closeImg+')'); 
			$('#Choco_loading').css('background-image', 'url('+settings.loadingImg+')'); 
			if(settings.container.get(0).nodeName.toLowerCase() !== 'body'){
				settings.container.css({'position':'relative','overflow':'hidden','line-height':'normal'});//yes, yes
				$('#Choco_content').css('position','relative');
				$('#Choco_overlay').css('position', 'absolute');
			}
			//events
			$(document).unbind('keydown').bind('keydown', function(e){
				switch(e.keyCode){
					case 37:
						changePageChocolat(-1);
						break;
					case 39:
						changePageChocolat(1);
						break;
					case 27:
						close();
						break;
				};
			});
			if(settings.vache){
				$('#Choco_overlay').click(function(){
					close();
					return false;
				});
			}
			$('#Choco_left_arrow').unbind().bind('click', function(){
				changePageChocolat(-1);
				return false;
			});
			$('#Choco_right_arrow').unbind().bind('click', function(){
				changePageChocolat(1);
				return false;
			});
			$('#Choco_close').unbind().bind('click', function(){
				close();
				return false;
			});
			$(window).resize(function() {
				load(settings.currentImage,true);
			});
	
		}
		function showChocolat(){	
			_interface();
			load(settings.currentImage, false);
			$('#Choco_overlay')
				.css({
					'background-color' : settings.overlayColor,
					'opacity'          : settings.overlayOpacity
				})
				.fadeIn(settings.fadeInOverlayduration);
			$('#Choco_content').fadeIn(settings.fadeInImageduration,function(){});
			
		}
		function load(image,resize){
			settings.currentImage = image;
			$('#Choco_loading').fadeIn(settings.fadeInImageduration);
			var imgPreloader = new Image();
			imgPreloader.onload = function(){
				$('#Choco_bigImage').attr('src',images[settings.setIndex][settings.currentImage]['adress']);
				var ajustees = iWantThePerfectImageSize(imgPreloader.height,imgPreloader.width);
				ChoColat(ajustees['hauteur'],ajustees['largeur'],resize);
				$('#Choco_loading').stop().fadeOut(settings.fadeOutImageduration);
			};
			imgPreloader.src = images[settings.setIndex][settings.currentImage]['adress'];
			preload();
			upadteDescription();
		}
		function changePageChocolat(signe){
			if(!settings.linkImages || (settings.currentImage == 0 && signe == -1) || (settings.currentImage == settings.lastImage && signe == 1))
			{
				return false;
			}
			else{
				//$('#Choco_container_description').fadeTo(settings.fadeOutImageduration,0); making a weird bug with firefox 17
				$('#Choco_container_description').css('visibility','hidden');
				$('#Choco_bigImage').fadeTo(settings.fadeOutImageduration, 0, function(){
					load(settings.currentImage + parseInt(signe), false);
				});
			}
		}
		function ChoColat(hauteur_image,largeur_image,resize){

			if(resize){
				$('#Choco_container_photo, #Choco_content, #Choco_bigImage').stop(true,false).css({'overflow':'visible'});
				$('#Choco_bigImage').animate({
					'height' : hauteur_image+'px',
					'width'  : largeur_image+'px'
				},settings.fadeInImageduration);
			}
			$('#Choco_container_photo').animate({
					'height' : hauteur_image,
					'width'  : largeur_image
			},settings.fadeInImageduration);
			$('#Choco_content').animate({
				'height'     : hauteur_image,
				'width'      : largeur_image,
				'marginLeft' : -largeur_image/2,
				'marginTop'  : -(hauteur_image)/2
			},settings.fadeInImageduration, 'swing', function(){
				$('#Choco_bigImage').fadeTo(settings.fadeInImageduration, 1).height(hauteur_image).width(largeur_image);
				if(!resize)
				{
					arrowsManaging();
					//$('#Choco_container_description').fadeTo(settings.fadeInImageduration,1); making a weird bug with firefox 17
					$('#Choco_container_description').css('visibility','visible');
					$('#Choco_close').fadeIn(settings.fadeInImageduration);
				}
			}).
			css('overflow', 'visible');
		}
		function arrowsManaging(){
			if(settings.linkImages){
				var what = ['Choco_right_arrow','Choco_left_arrow'];
				for(var i=0; i < what.length; i++){
					hide = false;
					if(what[i] == 'Choco_right_arrow' && settings.currentImage == settings.lastImage){
						hide = true;
						$('#'+what[i]).fadeOut(300);
					}
					else if(what[i] == 'Choco_left_arrow' && settings.currentImage == 0){
						hide = true;
						$('#'+what[i]).fadeOut(300);
					}
					if(!hide){
						$('#'+what[i]).fadeIn(settings.fadeOutImageduration);
					}
				}
			}
		}
		function preload(){
			if(settings.currentImage !== settings.lastImage){
				i = new Image;
				z = settings.currentImage + 1;
				i.src = images[settings.setIndex][z]['adress'];
			}
		}
		function upadteDescription(){
			var current = settings.currentImage + 1;
			var last = settings.lastImage + 1;
			$('#Choco_container_title').html(images[settings.setIndex][settings.currentImage]['caption']);
			$('#Choco_container_via').html(settings.setTitle+settings.separator1+current +settings.separator2+last);
		}
		function isSet(variable,defaultValue){
			// return variable === undefined ? defaultValue : variable; ?
			if (variable === undefined) {
				return defaultValue;
			}
			else{
				return variable;
			}
		}
		function iWantThePerfectImageSize(himg,limg){
			//28% = 14% + 14% margin
			var lblock             = limg + (limg*28/100);
			var heightDescAndClose = $('#Choco_container_description').height()+$('#Choco_close').height();
			var hblock             = himg + heightDescAndClose;
			var k                  = limg/himg;
			var kk                 = himg/limg;
			if(settings.container.get(0).nodeName.toLowerCase() == 'body'){
				windowHeight = $(window).height();
				windowWidth  = $(window).width();
			}
			else{
				windowHeight = settings.container.height();
				windowWidth  = settings.container.width();
			}
			notFitting = true;
				while (notFitting){
				var lblock = limg + (limg*28/100);
				var hblock = himg + heightDescAndClose;
					if(lblock > windowWidth){
						limg = windowWidth*100/128;
						
						himg = kk * limg;
					}else if(hblock > windowHeight){
						himg = (windowHeight - heightDescAndClose);
						limg = k * himg;
					}else{
						notFitting = false;
					};
				};
			return {
				largeur:limg,
				hauteur:himg
			};

		}
		function clear(){
			$('#Choco_overlay').remove();
			$('#Choco_content').remove();
		}
		function close(){
			$('#Choco_overlay').fadeOut(900, function(){$('#Choco_overlay').remove()});
			$('#Choco_content').fadeOut(500, function(){$('#Choco_content').remove()});
			settings.currentImage = 0;
		}
	
};
})(jQuery);
