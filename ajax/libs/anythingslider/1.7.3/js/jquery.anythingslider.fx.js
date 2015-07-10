/*
 * AnythingSlider Slide FX 1.4 for AnythingSlider v1.5.8+
 * By Rob Garrison (aka Mottie & Fudgey)
 * Dual licensed under the MIT and GPL licenses.
 */
(function($) {
	$.fn.anythingSliderFx = function(options){

		// variable sizes shouldn't matter - it's just to get an idea to get the elements out of view
		var wrap = $(this).closest('.anythingSlider'),
		sliderWidth = wrap.width(),
		sliderHeight = wrap.height(),
		getBaseFx = function(size){
			return {
				// 'name' : [{ inFx: {effects}, { outFx: {effects} }, selector: []]
				'top'    : [{ inFx: { top: 0 }, outFx: { top: '-' + (size || sliderHeight) } }],
				'bottom' : [{ inFx: { bottom: 0 }, outFx: { bottom: (size || sliderHeight) } }],
				'left'   : [{ inFx: { left: 0 }, outFx: { left: '-' + (size || sliderWidth) } }],
				'right'  : [{ inFx: { right: 0 }, outFx: { right: (size || sliderWidth) } }],
				'fade'   : [{ inFx: { opacity: 1 }, outFx: { opacity: 0 } }],
				'expand' : [{ inFx: { width: '100%', top: '0%', left: '0%' } , outFx: { width: (size || '10%'), top: '50%', left: '50%' } }],
				'listLR' : [{ inFx: { left: 0, opacity: 1 }, outFx: [{ left: (size || sliderWidth), opacity: 0 }, { left: '-' + (size || sliderWidth), opacity: 0 }], selector: [':odd', ':even'] }],
				'listRL' : [{ inFx: { left: 0, opacity: 1 }, outFx: [{ left: (size || sliderWidth), opacity: 0 }, { left: '-' + (size || sliderWidth), opacity: 0 }], selector: [':even', ':odd'] }],

				'caption-Top'    : [{ inFx: { top: 0, opacity: 0.8 }, outFx: { top: ( '-' + size || -50 ), opacity: 0 } }],
				'caption-Right'  : [{ inFx: { right: 0, opacity: 0.8 }, outFx: { right: ( '-' + size || -150 ), opacity: 0 } }],
				'caption-Bottom' : [{ inFx: { bottom: 0, opacity: 0.8 }, outFx: { bottom: ( '-' + size || -50 ), opacity: 0 } }],
				'caption-Left'   : [{ inFx: { left: 0, opacity: 0.8 }, outFx: { left: ( '-' + size || -150 ), opacity: 0 } }]
			};
		};

		return this.each(function(){

			var baseFx = getBaseFx(), // get base FX with standard sizes
			defaults = {
				easing  : 'swing',
				timeIn  : 400,
				timeOut : 350
			},

			// hide caption using setTimeout to ensure slider_complete has fired and activePage class has been added.
			// this hides element if out of the viewport (prevents captions - right & left only - from overlapping current window)
			hideOffscreen = function(el){
				el.each(function(){
					if (!$(this).closest('.panel').is('.activePage')) { $(this).css('visibility','hidden'); }
				});
			},

			// Animate FX
			animateFx = function(el, opt, isOut, time){
				if (el.length === 0 || typeof opt === 'undefined') { return; } // no fx
				var o = opt[0] || opt,
					s = o[1] || '',
					// time needs to be a number, not a string
					t = parseInt( ((s === '') ? o.duration : o[0].duration), 10);
				if (isOut) {
					// don't change caption position from absolute
					if (el.css('position') !== 'absolute') { el.css({ position : 'relative' }); }
					el.stop();
					// multiple selectors for out animation
					if (s !== ''){
						// Out animation is set to 1/4 of the time of the in animation
						el.filter(opt[1][0]).animate(o[0], { queue : false, duration : (time || t)/4, easing : o[0].easing });
						el.filter(opt[1][1]).animate(s, { queue : true, duration : (time || t)/4, easing : o[0].easing, complete: function(){
							setTimeout(function(){ hideOffscreen(el); }, 0); // animation complete... bug report: http://bugs.jquery.com/ticket/7157
						} });
						return;
					}
				}
				// animation for no extra selectors
				if (!isOut) { el.css('visibility','visible').show(); }
				el.animate(o, { queue : true, duration : time || t, easing : o.easing, complete: function(){
					if (isOut) { setTimeout(function(){ hideOffscreen(el); }, 0); }
				} });
			},

			// Extract FX from options
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
						var t = typeof opts[1] === 'undefined',
							n = (f === 'fade') ? 1 : 2; // if 2nd param defined, but it's not a size ('200px'), then use it as time (for fade FX)
						// if size option is defined, get new base fx
						tmp = (t) ? baseFx : getBaseFx(opts[1]);
						$.extend(true, bfx, tmp[f][0][ex]);
						bfx.duration = opts[n] || bfx.duration || time; // user set time || built-in time || default time set above
						bfx.easing = opts[n+1] || defaults.easing;
					}
				});
				return [bfx];
			};

			$(this)

			// bind events for "OUT" effects - occur when leaving a page
			.bind('slide_init', function(e, slider){
				var el, elOut, time, page = slider.$lastPage.add( slider.$items.eq(slider.exactPage) );
				if (slider.exactPage === 0) { page = page.add( slider.$items.eq( slider.pages ) ); } // add last (non-cloned) page if on first
				if (slider.options.animationTime < defaults.timeOut) {
					time = slider.options.animationTime || 1; // if time = zero, make it 1... (0 || 1 === 1) // true )
				}
				page = page.find('*').andSelf(); // include the panel in the selectors
				for (el in options) {
					if (el === 'outFx') {
						// process "out" custom effects
						for (elOut in options.outFx) {
							// animate current/last slide, unless it's a clone, then effect the original
							if (page.filter(elOut).length) { animateFx( page.filter(elOut), options.outFx[elOut], true); }
						}
					} else if (el !== 'inFx') {
						// Use built-in effects
						if ($.isArray(options[el]) && page.filter(el).length) {
							animateFx( page.filter(el), getFx(options[el],true), true, time);
						}
					}
				}
			})

			// bind events for "IN" effects - occurs on target page
			.bind('slide_complete', function(e, slider){
				var el, elIn, page = slider.$currentPage.add( slider.$items.eq(slider.exactPage) );
				page = page.find('*').andSelf(); // include the panel in the selectors
				for (el in options) {
					if (el === 'inFx') {
						// process "in" custom effects
						for (elIn in options.inFx) {
							// animate current page
							if (page.filter(elIn).length) { animateFx( page.filter(elIn), options.inFx[elIn], false); }
						}
						// Use built-in effects
					} else if (el !== 'outFx' && $.isArray(options[el]) && page.filter(el).length) {
						animateFx( page.filter(el), getFx(options[el],false), false);
					}
				}
			});

		});
	};
})(jQuery);
