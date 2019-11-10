/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: mb.bgndGallery.js
 *
 *  Copyright (c) 2001-2013. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 09/06/13 15.31
 *  *****************************************************************************
 */

/*Browser detection patch*/
(function(){if(!(8>jQuery.fn.jquery.split(".")[1])){jQuery.browser={};jQuery.browser.mozilla=!1;jQuery.browser.webkit=!1;jQuery.browser.opera=!1;jQuery.browser.msie=!1;var a=navigator.userAgent;jQuery.browser.name=navigator.appName;jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion);jQuery.browser.majorVersion=parseInt(navigator.appVersion,10);var c,b;if(-1!=(b=a.indexOf("Opera"))){if(jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=a.substring(b+6),-1!=(b= a.indexOf("Version")))jQuery.browser.fullVersion=a.substring(b+8)}else if(-1!=(b=a.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",jQuery.browser.fullVersion=a.substring(b+5);else if(-1!=(b=a.indexOf("Chrome")))jQuery.browser.webkit=!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=a.substring(b+7);else if(-1!=(b=a.indexOf("Safari"))){if(jQuery.browser.webkit=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=a.substring(b+7),-1!=(b=a.indexOf("Version")))jQuery.browser.fullVersion= a.substring(b+8)}else if(-1!=(b=a.indexOf("Firefox")))jQuery.browser.mozilla=!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=a.substring(b+8);else if((c=a.lastIndexOf(" ")+1)<(b=a.lastIndexOf("/")))jQuery.browser.name=a.substring(c,b),jQuery.browser.fullVersion=a.substring(b+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName);if(-1!=(a=jQuery.browser.fullVersion.indexOf(";")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0, a);if(-1!=(a=jQuery.browser.fullVersion.indexOf(" ")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,a);jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10);isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10));jQuery.browser.version=jQuery.browser.majorVersion}})(jQuery);

/*
*   jquery.mb.components
*  file: jquery.mb.CSSAnimate.js
*/

jQuery.fn.CSSAnimate=function(a,c,j,l,f){return this.each(function(){var b=jQuery(this);this.id=this.id||"CSSA_"+(new Date).getTime();if(0!==b.length&&a){"function"==typeof c&&(f=c,c=jQuery.fx.speeds._default);"function"==typeof j&&(f=j,j=0);"function"==typeof l&&(f=l,l="cubic-bezier(0.65,0.03,0.36,0.72)");if("string"==typeof c)for(var k in jQuery.fx.speeds)if(c==k){c=jQuery.fx.speeds[k];break}else c=null;if(jQuery.support.transition){var d="",h="transitionEnd";jQuery.browser.webkit?(d="-webkit-", h="webkitTransitionEnd"):jQuery.browser.mozilla?(d="-moz-",h="transitionend"):jQuery.browser.opera?(d="-o-",h="otransitionend"):jQuery.browser.msie&&(d="-ms-",h="msTransitionEnd");k=[];for(e in a){var g=e;"transform"===g&&(g=d+"transform",a[g]=a[e],delete a[e]);"transform-origin"===g&&(g=d+"transform-origin",a[g]=a[e],delete a[e]);k.push(g)}var m=k.join(",");setTimeout(function(){b.css(a);b.css(d+"transition-property",m);b.css(d+"transition-duration",c+"ms");b.css(d+"transition-delay",j+"ms");b.css(d+ "transition-timing-function",l);b.css(d+"backface-visibility","hidden");b.on(h+"."+b.get(0).id,n)},1);var n=function(){b.off(h+"."+b.get(0).id);b.css(d+"transition","");"function"==typeof f&&(b.called=!0,f())};this.timeout=setTimeout(function(){jQuery.browser.mozilla||(b.css(d+"transition",""),b.called||!f?b.called=!1:f())},c+j+20)}else{for(var e in a)"transform"===e&&delete a[e],"transform-origin"===e&&delete a[e],"auto"===a[e]&&delete a[e];if(!f||"string"===typeof f)f="linear";b.animate(a,c,f)}}})}; jQuery.fn.CSSAnimateStop=function(){var a="",c="transitionEnd";jQuery.browser.webkit?(a="-webkit-",c="webkitTransitionEnd"):jQuery.browser.mozilla?(a="-moz-",c="transitionend"):jQuery.browser.opera?(a="-o-",c="otransitionend"):jQuery.browser.msie&&(a="-ms-",c="msTransitionEnd");jQuery(this).css(a+"transition","");jQuery(this).off(c)}; jQuery.support.transition=function(){var a=(document.body||document.documentElement).style;return void 0!==a.transition||void 0!==a.WebkitTransition||void 0!==a.MozTransition||void 0!==a.MsTransition||void 0!==a.OTransition}();



(function($){

	$.mbBgndGallery ={
		name:"mb.bgndGallery",
		author:"Matteo Bicocchi",
		version:"1.7.1",
		defaults:{
			containment:"body",
			images:[],
			shuffle:false,
			controls:null,
			effect:{enter:{left:0,opacity:0},exit:{left:0,opacity:0}, enterTiming:"ease-in", exitTiming:"ease-in"},
			timer:4000,
			raster:false, //"inc/raster.png"
			effTimer:3000,
			folderPath:false,
			autoStart:true,
			grayScale:false,
			activateKeyboard:true,
			preserveTop:false,
			preserveWidth:false,
			placeHolder:"",
			onStart:function(){},
			onChange:function(opt,idx){}, //idx=the zero based index of the displayed photo
			onPause:function(opt){},
			onPlay:function(opt){},
			onNext:function(opt){},
			onPrev:function(opt){}
		},
		clear:false,

		buildGallery:function(options){
			var opt = {};
			$.extend(opt, $.mbBgndGallery.defaults,options);
			opt.galleryID= new Date().getTime();
			var el= $(opt.containment).get(0);
			el.opt= opt;

			if(el.opt.onStart)
				el.opt.onStart();

			el.opt.gallery= $("<div/>").attr({id:"bgndGallery_"+el.opt.galleryID}).addClass("mbBgndGallery");
			var pos= el.opt.containment=="body"?"fixed":"absolute";
			el.opt.gallery.css({position:pos,top:0,let:0,width:"100%",height:"100%",overflow:"hidden"});

			var containment = el.opt.containment;

			if(containment !="body" && $(containment).text().trim()!=""){
				var wrapper=$("<div/>").css({"position":"absolute",minHeight:"100%", minWidth:"100%", zIndex:3});
				$(containment).wrapInner(wrapper);
				if($(containment).css("position")=="static")
					$(containment).css("position","relative");
			}
			if(opt.raster){
				var raster=$("<div/>").css({position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"url("+opt.raster+")",zIndex:1});
				opt.gallery.append(raster);
			}

			$(containment).prepend(opt.gallery);

			if(el.opt.folderPath && el.opt.images.length==0)
				el.opt.images = jQuery.loadFromSystem(el.opt.folderPath);


			if(el.opt.shuffle)
				el.opt.images= $.shuffle(el.opt.images);

			var totImg= el.opt.images.length;

			var loadCounter=0;

			$.mbBgndGallery.preload(el.opt.images[0],el);
			$(el.opt.gallery).on("imageLoaded_"+el.opt.galleryID,function(){
				loadCounter++;
				if(loadCounter==totImg){
					$(el.opt.gallery).off("imageLoaded_"+el.opt.galleryID);
					return;
				}
				$.mbBgndGallery.preload(el.opt.images[loadCounter],el);
			});

			el.opt.imageCounter=0;

			$.mbBgndGallery.changePhoto(el.opt.images[el.opt.imageCounter],el);

			if (!opt.autoStart){
				el.opt.paused=true;
				$(el.opt.gallery).trigger("paused");
			}


			$(el.opt.gallery).on("imageReady_"+el.opt.galleryID,function(){

				if(el.opt.paused)
					return;
				$.mbBgndGallery.play(el);
			});

			$(window).on("resize",function(){
				var image=$("#bgndGallery_"+el.opt.galleryID+" img");
				$.mbBgndGallery.checkSize(image,el);
			});

			var controls = el.opt.controls;
			if(controls){
				var counter=$(el.opt.controls).find(".counter");
				counter.html(el.opt.imageCounter+1+" / "+el.opt.images.length);

				$.mbBgndGallery.buildControls(controls,el);
				$(el.opt.containment).on("paused",function(){
					$(el.opt.controls).find(".play").show();
					$(el.opt.controls).find(".pause").hide();
				});
				$(el.opt.containment).on("play",function(){
					$(el.opt.controls).find(".play").hide();
					$(el.opt.controls).find(".pause").show();
				});
			}
		},
		normalizeCss:function(opt){
			var newOpt = jQuery.extend(true, {}, opt);
			var sfx = "";
			var transitionEnd = "transitionEnd";
			if ($.browser.webkit) {
				sfx = "-webkit-";
				transitionEnd = "webkitTransitionEnd";
			} else if ($.browser.mozilla) {
				sfx = "-moz-";
				transitionEnd = "transitionend";
			} else if ($.browser.opera) {
				sfx = "-o-";
				transitionEnd = "oTransitionEnd";
			} else if ($.browser.msie) {
				sfx = "-ms-";
				transitionEnd = "msTransitionEnd";
			}

			for(var o in newOpt){
				if (o==="transform"){
					newOpt[sfx+"transform"]=newOpt[o];
					delete newOpt[o];
				}
				if (o==="transform-origin"){
					newOpt[sfx+"transform-origin"]=opt[o];
					delete newOpt[o];
				}
			}
			return newOpt;
		},
		preload:function(url,el){
			if($.mbBgndGallery.clear){
				$(el.opt.gallery).remove();
				return;
			}

			var img= $("<img/>").load(function(){
				$(el.opt.gallery).trigger("imageLoaded_"+el.opt.galleryID);
			}).attr("src",url);
		},

		checkSize:function(image,el){

			if($.mbBgndGallery.changing)
				return;

			if($.mbBgndGallery.clear){
				$(el.opt.gallery).remove();
				return;
			}

			return image.each(function(){
				var image=$(this);
				var w= image.attr("w");
				var h= image.attr("h");

				var containment = el.opt.containment == "body"? window : el.opt.containment;
				var aspectRatio= w/h;
				var wAspectRatio=$(containment).width()/$(containment).height();
				if(aspectRatio>=wAspectRatio){
					image.css("height","100%");
					image.css("width","auto");
				} else{
					image.css("width","100%");
					image.css("height","auto");
				}
				image.css("margin-left",(($(containment).width()-image.width())/2));

				if(!el.opt.preserveTop)
					image.css("margin-top",(($(containment).height()-image.height())/2));

				if(el.opt.preserveWidth){
					image.css({width:"100%", height:"auto", left:0, marginLeft:0});
				}

			});
		},

		changePhoto:function(url,el){
			if($.mbBgndGallery.clear){
				$(el.opt.gallery).remove();
				return;
			}

			$.mbBgndGallery.changing=true;

			if(el.opt.onChange)
				el.opt.onChange(el.opt, el.opt.imageCounter);

			var image=$("<img/>").hide().load(function(){
				var image=$(this);

				var tmp=$("<div/>").css({position:"absolute",top:-5000});
				tmp.append(image);
				$("body").append(tmp);
				image.attr("w", image.width());
				image.attr("h", image.height());
				tmp.remove();

				/*
				 $(el.opt.gallery).off("paused").on("paused",function(){
				 $("#bgndGallery_"+el.opt.galleryID+" img").CSSAnimateStop();
				 });
				 */

				$("#bgndGallery_"+el.opt.galleryID+" img").CSSAnimate(el.opt.effect.exit,el.opt.effTimer,0,el.opt.effect.exitTiming,function(){
					var imgToRemove = $("#bgndGallery_"+el.opt.galleryID+" img").not(":first");
					setTimeout(function(){
						imgToRemove.remove();
					},3000);
				});
				image.css({position:"absolute"});
				$("#bgndGallery_"+el.opt.galleryID).prepend(image);

				//todo: add a property to let height for vertical images
				$.mbBgndGallery.changing=false;
				$.mbBgndGallery.checkSize(image, el);

				image.css($.mbBgndGallery.normalizeCss(el.opt.effect.enter)).show().CSSAnimate({top:0,left:0,opacity:1, transform:"scale(1) rotate(0deg)"},el.opt.effTimer,0,el.opt.effect.enterTiming,function(){
					$(el.opt.gallery).trigger("imageReady_"+el.opt.galleryID);
				});
			}).attr("src",url);

			image.error(function(){
				var image=$(this);
				image.attr("src", el.opt.placeHolder);
			})

			if(el.opt.grayScale){
				image.greyScale();

			}

			var counter=$(el.opt.controls).find(".counter");
			counter.html(el.opt.imageCounter+1+" / "+el.opt.images.length);

		},

		play:function(el){
			if($.mbBgndGallery.clear){
				$(el.opt.gallery).remove();
				return;
			}

			if(el.opt.onPlay)
				el.opt.onPlay(el.opt);

			el.opt.changing=setTimeout(function(){
				if(el.opt.paused)
					return;

				if(el.opt.onNext)
					el.opt.onNext(el.opt);

				if (el.opt.imageCounter>=el.opt.images.length-1)
					el.opt.imageCounter=-1;

				el.opt.imageCounter++;

				$.mbBgndGallery.changePhoto(el.opt.images[el.opt.imageCounter],$(el.opt.containment).get(0));
			},el.opt.paused?0:el.opt.timer);

			$(el.opt.gallery).trigger("play");

		},

		pause:function(el){
			if($.mbBgndGallery.clear){
				$(el.opt.gallery).remove();
				return;
			}

			clearTimeout(el.opt.changing);
			el.opt.paused=true;
			$(el.opt.gallery).trigger("paused");

			if(el.opt.onPause)
				el.opt.onPause(el.opt);
		},

		next:function(el){
			if($.mbBgndGallery.clear){
				$(el.opt.gallery).remove();
				return;
			}

			if(el.opt.onNext)
				el.opt.onNext(el.opt);
			$.mbBgndGallery.pause(el);
			clearTimeout(el.opt.changing);
			if (el.opt.imageCounter==el.opt.images.length-1)
				el.opt.imageCounter=-1;

			el.opt.imageCounter++;

			$.mbBgndGallery.changePhoto(el.opt.images[el.opt.imageCounter],el);
		},

		prev:function(el){
			if($.mbBgndGallery.clear){
				$(el.opt.gallery).remove();
				return;
			}

			if(el.opt.onPrev)
				el.opt.onPrev(el.opt);

			$.mbBgndGallery.pause(el);
			clearTimeout(el.opt.changing);
			if (el.opt.imageCounter==0)
				el.opt.imageCounter=el.opt.images.length;

			el.opt.imageCounter--;

			$.mbBgndGallery.changePhoto(el.opt.images[el.opt.imageCounter],el);
		},

		loader:{
			show:function(){},
			hide:function(){}
		},

		keyboard:function(el){
			$(document).on("keydown.bgndGallery",function(e){
				switch(e.keyCode){
					case 32:
						if(el.opt.paused){
							$.mbBgndGallery.play(el);
							el.opt.paused=false;
						}else{
							el.opt.paused=true;
							$.mbBgndGallery.pause(el);
						}
						e.preventDefault();
						break;
					case 39:
						$.mbBgndGallery.next(el);
						e.preventDefault();

						break;
					case 37:
						$.mbBgndGallery.prev(el);
						e.preventDefault();

						break;
				}
			})
		},

		buildControls:function(controls,el){
			var pause=$(controls).find(".pause");
			var play=$(controls).find(".play");
			var next=$(controls).find(".next");
			var prev=$(controls).find(".prev");
			if(el.opt.autoStart)
				play.hide();

			pause.on("click",function(){
				$.mbBgndGallery.pause(el);
				$(this).hide();
				play.show();
			});

			play.on("click",function(){
				if(!el.opt.paused) return;
				clearTimeout(el.opt.changing);
				$.mbBgndGallery.play(el);
				el.opt.paused=false;
			});

			next.on("click",function(){
				$.mbBgndGallery.next(el);
				pause.hide();
				play.show();

			});

			prev.on("click",function(){
				$.mbBgndGallery.prev(el);
				pause.hide();
				play.show();
			});

			if(el.opt.activateKeyboard)
				$.mbBgndGallery.keyboard(el);
		},

		changeGallery:function(el,array){

			$(el.gallery).fadeOut();

			$.mbBgndGallery.pause(el);

			el.opt.images=array;
			var images= el.opt.images;
			var totImg= images.length;
			var loadCounter=0;

			$.mbBgndGallery.preload(images[0],el);
			$(el.opt.gallery).on("imageLoaded_"+el.opt.galleryID,function(){
				loadCounter++;
				if(loadCounter==totImg){
					$(el.opt.gallery).off("imageLoaded_"+el.opt.galleryID);
					$(el.gallery).fadeIn();
					$.mbBgndGallery.play(el);
					el.opt.paused=false;
					return;
				}
				$.mbBgndGallery.preload(images[loadCounter],el);
			});
			el.opt.imageCounter=0;
		}
	};

	jQuery.loadFromSystem=function(folderPath, type){

		// if directory listing is enabled on the remote server.
		// if you run the page locally you need to run it under a local web server (Ex: http://localhost/yourPage)
		// otherwise the directory listing is unavailable.

		if(!folderPath)
			return;
		if(!type)
			type= ["jpg","jpeg","png"];
		var arr=[];
		$.ajax({
			url:folderPath,
			async:false,
			success:function(response){
				var tmp=$(response);
				var els= tmp.find("[href]");

				els.each(function(){
					for (var i in type){
						if ($(this).attr("href").indexOf(type[i])>=0)
							arr.push(folderPath+$(this).attr("href"));
						arr = $.unique(arr);
					}
				});
				tmp.remove();
			}
		});
		return arr;
	};

	$.fn.greyScale = function() {
		return this.each(function() {

			if ($.browser.msie && $.browser.version<9) {
				this.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)";
			} else {
				this.src = grayScaleImage(this);
			}

		})
	};

	$.shuffle = function(arr) {
		var newArray = arr.slice();
		var len = newArray.length;
		var i = len;
		while (i--) {
			var p = parseInt(Math.random()*len);
			var t = newArray[i];
			newArray[i] = newArray[p];
			newArray[p] = t;
		}
		return newArray;
	};

	function grayScaleImage(imgObj){
		var canvas = document.createElement('canvas');
		var canvasContext = canvas.getContext('2d');

		var imgW = imgObj.width;
		var imgH = imgObj.height;
		canvas.width = imgW;
		canvas.height = imgH;

		canvasContext.drawImage(imgObj, 0, 0);
		var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

		for(var y = 0; y < imgPixels.height; y++){
			for(var x = 0; x < imgPixels.width; x++){
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg;
				imgPixels.data[i + 1] = avg;
				imgPixels.data[i + 2] = avg;
			}
		}
		canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
	}

})(jQuery);
