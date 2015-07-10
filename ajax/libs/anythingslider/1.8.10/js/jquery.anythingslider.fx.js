/*
 * AnythingSlider Slide FX 1.6 for AnythingSlider v1.7.11+
 * By Rob Garrison (aka Mottie & Fudgey)
 * Dual licensed under the MIT and GPL licenses.
 */
(function($) {
	$.fn.anythingSliderFx = function(effects, options){

		// variable sizes shouldn't matter - it's just to get an idea to get the elements out of view
		var wrap = $(this).closest('.anythingSlider'),
		sliderWidth = wrap.width(),
		sliderHeight = wrap.height(),
		getBaseFx = function(s){
			var size = s, size2;
			// allow for start and end sizes/dimensions
			if (s && typeof s === 'string' && s.indexOf(',') > 0) {
				s = s.split(',');
				size = $.trim(s[0]); size2 = $.trim(s[1]);
			}
			return {
				// 'name' : [{ inFx: {effects}, { outFx: {effects} }, selector: []]
				'top'    : [{ inFx: { top: 0 }, outFx: { top: '-' + (size || sliderHeight) } }],
				'bottom' : [{ inFx: { top: 0 }, outFx: { top: (size || sliderHeight) } }],
				'left'   : [{ inFx: { left: 0 }, outFx: { left: '-' + (size || sliderWidth) } }],
				'right'  : [{ inFx: { left: 0 }, outFx: { left: (size || sliderWidth) } }],
				'fade'   : [{ inFx: { opacity: size || 1 }, outFx: { opacity: 0 } }],
				'expand' : [{ inFx: { width: size2 || '100%', height: size2 || '100%', top: '0%', left: '0%' } , outFx: { width: (size || '10%'), height: (size || '10%'), top: '50%', left: '50%' } }],
				'grow'   : [{ inFx: { top: 0, fontSize: size || '16px', opacity : 1 }, outFx: { top: '-200px', fontSize: size2 || '80px', opacity: 0 } }],
				'listLR' : [{ inFx: { left: 0, opacity: 1 }, outFx: [{ left: (size || sliderWidth), opacity: 0 }, { left: '-' + (size || sliderWidth), opacity: 0 }], selector: [':odd', ':even'] }],
				'listRL' : [{ inFx: { left: 0, opacity: 1 }, outFx: [{ left: (size || sliderWidth), opacity: 0 }, { left: '-' + (size || sliderWidth), opacity: 0 }], selector: [':even', ':odd'] }],

				'caption-Top'    : [{ inFx: { top: 0, opacity: 0.8 }, outFx: { top: ( '-' + size || -50 ), opacity: 0 } }],
				'caption-Right'  : [{ inFx: { right: 0, opacity: 0.8 }, outFx: { right: ( '-' + size || -150 ), opacity: 0 } }],
				'caption-Bottom' : [{ inFx: { bottom: 0, opacity: 0.8 }, outFx: { bottom: ( '-' + size || -50 ), opacity: 0 } }],
				'caption-Left'   : [{ inFx: { left: 0, opacity: 0.8 }, outFx: { left: ( '-' + size || -150 ), opacity: 0 } }]
			};
		};

		return this.each(function(){

			$(this).data('AnythingSlider').fx = effects; // store fx list to allow dynamic modification

			var defaults = $.extend({
				easing     : 'swing', // Default FX easing
				timeIn     : 400,     // Default time for in FX animation
				timeOut    : 350,     // Default time for out FX animation - when using predefined FX, this number gets divided by 2
				stopRepeat : false,   // stops repeating FX animation when clicking on the same navigation tab
				outFxBind  : 'slide_init',    // When outFx animations are called
				inFxBind   : 'slide_complete', // When inFx animations are called
				dataAnimate: 'data-animate' // data attribute containing the animate.css class names to add for in and out fx
			}, options),

			baseFx = getBaseFx(), // get base FX with standard sizes

			// Animate FX
			animateFx = function(el, opt, isOut, time){
				if (el.length === 0 || typeof opt === 'undefined') { return; } // no fx
				var o = opt[0] || opt,
					s = o[1] || '',
					// time needs to be a number, not a string
					t = time || parseInt( ((s === '') ? o.duration : o[0].duration), 10);
				if (isOut) {
					// don't change caption position from absolute
					if (el.css('position') !== 'absolute') { el.css({ position : 'relative' }); }
					el.stop();
					// multiple selectors for out animation
					if (s !== ''){
						el.filter(opt[1][0]).animate(o[0], { queue : false, duration : t, easing : o[0].easing });
						el.filter(opt[1][1]).animate(s, { queue : true, duration : t, easing : o[0].easing });
						return;
					}
				}
				// animation for no extra selectors
				el.animate(o, { queue : true, duration : t, easing : o.easing });
			},

			// Extract FX
			getFx = function(opts, isOut){
				// example: '.textSlide h3' : [ 'top fade', '200px' '500', 'easeOutBounce' ],
				var tmp, bfx2,
				ex  = (isOut) ? 'outFx' : 'inFx', // object key
				bfx = {}, // base effects
				time = (isOut) ? defaults.timeOut : defaults.timeIn, // default duration settings
				// split & process multiple built-in effects (e.g. 'top fade')
				fx = $.trim(opts[0].replace(/\s+/g,' ')).split(' ');

				// look for multiple selectors in the Out effects
				if (isOut && fx.length === 1 && baseFx.hasOwnProperty(fx) && typeof (baseFx[fx][0].selector) !== 'undefined') {
					bfx2 = baseFx[fx][0].outFx;
					// add time and easing to first set, the animation will use it for both
					bfx2[0].duration = opts[2] || defaults.timeOut;
					bfx2[0].easing = opts[3] || defaults.easing;
					return [bfx2, baseFx[fx][0].selector || [] ];
				}

				// combine base effects
				$.each(fx, function(i,f){
					// check if built-in effect exists
					if (baseFx.hasOwnProperty(f)) {
						var t = typeof opts[1] === 'undefined' || opts[1] === '',
						// if size option is defined, get new base fx
						tmp = (t) ? baseFx : getBaseFx(opts[1]);
						$.extend(true, bfx, tmp[f][0][ex]);
						t = opts[2] || bfx.duration || time; // user set time || built-in time || default time set above
						bfx.duration = (isOut) ? t/2 : t; // out animation time is 1/2 of in time for predefined fx only
						bfx.easing = isNaN(opts[3]) ? opts[3] || defaults.easing : opts[4] || defaults.easing;
					}
				});
				return [bfx];
			},

			base = $(this)

			// bind events for "OUT" effects - occur when leaving a page
			.bind(defaults.outFxBind, function(e, slider){
				if (defaults.stopRepeat && slider.$lastPage[0] === slider.$targetPage[0]) { return; }
				var el, elOut, time, page = slider.$lastPage.add( slider.$items.eq(slider.exactPage) ).add( slider.$targetPage ),
				FX = slider.fx; // allow dynamically added FX
				if (slider.exactPage === 0) { page = page.add( slider.$items.eq( slider.pages ) ); } // add last (non-cloned) page if on first
				if (slider.options.animationTime < defaults.timeOut) {
					time = slider.options.animationTime || defaults.timeOut;
				}
				page = page.find('*').andSelf(); // include the panel in the selectors
				for (el in FX) {
					if (el === 'outFx') {
						// process "out" custom effects
						for (elOut in FX.outFx) {
							// animate current/last slide, unless it's a clone, then effect the original
							if (page.filter(elOut).length) { animateFx( page.filter(elOut), FX.outFx[elOut], true); }
						}
					} else if (el !== 'inFx') {
						// Use built-in effects
						if ($.isArray(FX[el]) && page.filter(el).length) {
							animateFx( page.filter(el), getFx(FX[el],true), true, time);
						}
					}
				}
				el = page.filter('[' + defaults.dataAnimate + ']');
				if (el.length) {
					el.each(function(){
						FX = $(this).attr(defaults.dataAnimate).split(',');
						if (FX[0] !== '') {
							$(this)
								.removeClass(FX[0])
								.addClass(FX[1] || FX[0]);
						}
					});
				}
			})

			// bind events for "IN" effects - occurs on target page
			.bind(defaults.inFxBind, function(e, slider){
				if (defaults.stopRepeat && slider.$lastPage[0] === slider.$targetPage[0]) { return; }
				var el, elIn, page = slider.$currentPage.add( slider.$items.eq(slider.exactPage) ),
				FX = slider.fx; // allow dynamically added FX
				page = page.find('*').andSelf(); // include the panel in the selectors
				for (el in FX) {
					if (el === 'inFx') {
						// process "in" custom effects
						for (elIn in FX.inFx) {
							// animate current page
							if (page.filter(elIn).length) { animateFx( page.filter(elIn), FX.inFx[elIn], false); }
						}
						// Use built-in effects
					} else if (el !== 'outFx' && $.isArray(FX[el]) && page.filter(el).length) {
						animateFx( page.filter(el), getFx(FX[el],false), false);
					}
				}
				el = page.filter('[' + defaults.dataAnimate + ']');
				if (el.length) {
					el.each(function(){
						FX = $(this).attr(defaults.dataAnimate).split(',');
						if (FX[0] !== '') {
							$(this)
								.removeClass(FX[1] || FX[0])
								.addClass(FX[0]);
						}
					});
				}
			})
			.data('AnythingSlider');

			// call gotoPage to trigger intro animation
			$(window).load(function(){ base.gotoPage(base.currentPage, base.playing); });

		});
	};
})(jQuery);
