/*
jQuery Plugin: imgLiquid v0.9.7 / 19-04-13
jQuery plugin to resize images to fit in a container.
Copyright (c) 2012 Alejandro Emparan (karacas), twitter: @krc_ale
Dual licensed under the MIT and GPL licenses
https://github.com/karacas/imgLiquid

ex:
	$(".imgLiquid").imgLiquid({fill:true});

	//OPTIONS:

	>js
		fill: true,
		verticalAlign:		//'center' //'top' //'bottom'
		horizontalAlign:	//'center' //'left' //'right'
		fadeInTime: 0,
		delay: 0,			//time to process next image in milliseconds
		responsive: false,
		responsiveCheckTime: 500,	//time to check resize in milliseconds


	>js callBakcs
		onStart:		function(){},
		onFinish:		function(){},
		onItemResize:   function(index, container, img){},
		onItemStart:	function(index, container, img){},
		onItemFinish:   function(index, container, img){}


	>css (set useCssAligns: true) (overwrite js)
		text-align: center;
		vertical-align : middle;


	>hml5 data attr (overwrite all)
		data-imgLiquid-fill="true"
		data-imgLiquid-horizontalAlign="center"
		data-imgLiquid-verticalAlign="center"
		data-imgLiquid-fadeInTime="500"
*/
//
;(function($){
	$.fn.extend({
		imgLiquid: function(options) {

			//is ie?
			var isIE = /*@cc_on!@*/false;


			//Sizes
			var totalItems = this.length;
			var processedItems = 0;


			//Settings - Options
			this.defaultOptions = {};


			var self = this;


			//___________________________________________________________________
			var settings = $.extend({

				fill: true,
				verticalAlign: 'center',	// 'top'	// 'bottom'
				horizontalAlign: 'center',	// 'left'	// 'right'
				fadeInTime: 0,
				responsive: false,
				responsiveCheckTime: 100,  /*time to check div resize, default 10fps > 1000/100*/
				delay: 0,

				removeBoxBackground: true,
				ieFadeInDisabled: true,
				useDataHtmlAttr: true,
				useCssAligns: false,
				imageRendering: 'auto',
				hardPixels: false,
				checkvisibility: true,
				timecheckvisibility : 250,

				//CALLBACKS
				onStart: null,		//no-params
				onFinish: null,		//no-params
				onItemResize: null, //params: (index, container, img )
				onItemStart: null,	//params: (index, container, img )
				onItemFinish: null	//params: (index, container, img )

			}, this.defaultOptions, options);



			//CALLBACK > Start
			if (settings.onStart) settings.onStart();



			//SAVES NEW SETTINGS
			if (self.data('settings') !== undefined)  {
				var settTmp	= $.extend(self.data('settings'));
				settTmp		= $.extend(options);
				self.data('settings',  settTmp);
			}


			//___________________________________________________________________
			return this.each(function($i) {

				//Obj
				var $imgBoxCont = $(this);
				var $img = $('img:first', $imgBoxCont);

				if (!$img || $img === null || $img.size() ===0){
					onError();
					return null;
				}

				if ($img.data('ILprocessed')){
					settings = $.extend(self.data('settings'));
					process($imgBoxCont, $img, $i);
					return;
				}


				//STATUS
				$img.data('ILprocessed', false);
				$img.ILerror = false;


				//CALLBACK > ItemStart (index, container, img )
				if (settings.onItemStart) settings.onItemStart($i , $imgBoxCont , $img);


				//Alpha to 0 & removes
				$img.fadeTo(0, 0);
				$('img:not(:first)', $imgBoxCont).css('display','none');
				$img.css({'visibility':'visible', 'max-width':'none', 'max-height':'none', 'width':'auto', 'height':'auto', 'display':'block', 'image-rendering':settings.imageRendering });
				$img.removeAttr("width");
				$img.removeAttr("height");


				//Delay > 1
				if (settings.delay <1) settings.delay = 1;


				//set OverFlow
				$imgBoxCont.css({'overflow':'hidden'});


				//SETTINGS OVERWRITE
				if (isIE && settings.imageRendering === 'optimizeQuality') $img.css('-ms-interpolation-mode', 'bicubic');
				if (settings.useCssAligns) {
					var cha = $imgBoxCont.css('text-align');
					var cva = $imgBoxCont.css('vertical-align');
					if(cha === 'left' || cha === 'center' || cha === 'right') settings.horizontalAlign = cha;
					if (cva === 'top' || cva === 'middle' || cva === 'bottom' || cva === 'center') settings.verticalAlign = cva;
				}
				if (settings.useDataHtmlAttr) {
					if ($imgBoxCont.attr('data-imgLiquid-fill') === 'true') settings.fill = true;
					if ($imgBoxCont.attr('data-imgLiquid-fill') === 'false' ) settings.fill = false;
					if ($imgBoxCont.attr('data-imgLiquid-responsive') === 'true') settings.responsive = true;
					if ($imgBoxCont.attr('data-imgLiquid-responsive') === 'false' ) settings.responsive = false;
					if ( Number ($imgBoxCont.attr('data-imgLiquid-fadeInTime')) > 0) settings.fadeInTime = Number ($imgBoxCont.attr('data-imgLiquid-fadeInTime'));
					var ha = $imgBoxCont.attr('data-imgLiquid-horizontalAlign');
					var va = $imgBoxCont.attr('data-imgLiquid-verticalAlign');
					if (ha === 'left' || ha === 'center' || ha === 'right') settings.horizontalAlign = ha;
					if (va === 'top' || va === 'middle' || va === 'bottom' || va === 'center') settings.verticalAlign = va;
				}


				//ie no anims > (muere ie, muere!)
				if (isIE && settings.ieFadeInDisabled) settings.fadeInTime = 0;



				//RESPONSIVE
				function checkElementSize(){
					setTimeout(checkElementSizeDelay, settings.responsiveCheckTime);
				}
				function checkElementSizeDelay(){

					//UPDATE SETTINGS
					settings = $.extend(self.data('settings'));

					$imgBoxCont.actualSize = $imgBoxCont.get(0).offsetWidth + ($imgBoxCont.get(0).offsetHeight/100000);
					if ($imgBoxCont.actualSize !== $imgBoxCont.sizeOld){
						if ($img.data('ILprocessed') && $imgBoxCont.sizeOld !== undefined){

							//CALLBACK > onItemResize (index, container, img )
							if (settings.onItemResize) settings.onItemResize($i , $imgBoxCont , $img);

							//Process again
							if (settings.responsive) process($imgBoxCont, $img, $i);
						}
					}
					$imgBoxCont.sizeOld = $imgBoxCont.actualSize;
					checkElementSize();

				}
				if (settings.responsive) settings.hardPixels = true;
				if (settings.responsive || settings.onItemResize !== null) checkElementSize();


				//SAVE FIRST TIME SETTINGS
				self.data('settings', settings);

				//LOAD
				$img.on('load', onLoad).on('error', onError);
				if($img[0].complete)$img.load();


				function onLoad(e){
					if (!Boolean($img[0].width === 0 && $img[0].height === 0)) {
						if (settings.checkvisibility){
							checkProcess();
						}else{
							//DIRECT > OLD VERSION TEST AND DELETE
							setTimeout(function() {
								process($imgBoxCont, $img, $i);
							}, $i * settings.delay);
						}
					}
					if (e) e.preventDefault();
				}
				function onError(){
					$img.ILerror = true;
					checkFinish($imgBoxCont, $img, $i);
					$imgBoxCont.css('visibility', 'hidden');
				}
				function checkProcess(){
					if ($img.data('ILprocessed')) return;
					setTimeout(function() {
						if ($imgBoxCont.is(':visible')){
							setTimeout(function() {
								process($imgBoxCont, $img, $i);
							}, $i * settings.delay);
						}else{
							checkProcess();
						}
					}, settings.timecheckvisibility);
				}



				//___________________________________________________________________
				function process($imgBoxCont, $img, $i){

					//RESIZE
					var w,h;
					if ($img.data('owidth') === undefined)  $img.data('owidth', $img[0].width);
					if ($img.data('oheight') === undefined) $img.data('oheight', $img[0].height);
					if (settings.fill === ($imgBoxCont.width() / $imgBoxCont.height()) >= ($img.data('owidth') / $img.data('oheight'))){
						w = '100%'; h = 'auto';
						if (settings.hardPixels){
							w = Math.floor ($imgBoxCont.width());
							h = Math.floor ($imgBoxCont.width() * ($img.data('oheight') / $img.data('owidth')));
						}
					}else{
						h = '100%'; w = 'auto';
						if (settings.hardPixels){
							h = Math.floor ($imgBoxCont.height());
							w = Math.floor ($imgBoxCont.height() * ($img.data('owidth') / $img.data('oheight')));
						}
					}
					$img.css({'width':w, 'height':h});


					//align X
					var ha = settings.horizontalAlign.toLowerCase();
					var hdif = $imgBoxCont.width() - $img[0].width;
					var margL = 0;
					if (ha === 'center' || ha === 'middle')margL = hdif/2;
					if (ha === 'right') margL = hdif;
					$img.css('margin-left', Math.floor(margL));


					//align Y
					var va = settings.verticalAlign.toLowerCase();
					var vdif = $imgBoxCont.height() - $img[0].height;
					var margT = 0;
					if (va === 'center' || va === 'middle') margT = vdif/2;
					if (va === 'bottom') margT = vdif;
					$img.css('margin-top', Math.floor(margT));


					//FadeIn
					if (!$img.data('ILprocessed')){
						if (settings.removeBoxBackground) $imgBoxCont.css('background-image', 'none');
						$img.fadeTo(settings.fadeInTime, 1);
						$img.data('ILprocessed', true) ;

						//CALLBACK > onItemFinish (index, container, img )
						if (settings.onItemFinish) settings.onItemFinish($i , $imgBoxCont , $img);

						checkFinish($imgBoxCont, $img, $i);
					}
				}





				//___________________________________________________________________
				function checkFinish($imgBoxCont, $img, $i){
					processedItems ++;
					//CALLBACK > onFinish
					if (processedItems === totalItems){
						if (settings.onFinish) settings.onFinish();
					}
				}



			});
		}
	});
})(jQuery);