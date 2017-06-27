/*!
	jQuery Autosize v1.16.16
	(c) 2013 Jack Moore - jacklmoore.com
	updated: 2013-06-11
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function ($) {
	var
	defaults = {
		className: 'autosizejs',
		append: '',
		callback: false,
		resizeDelay: 10
	},
	hidden = 'hidden',
	borderBox = 'border-box',
	lineHeight = 'lineHeight',
	useSubpixels,

	// border:0 is unnecessary, but avoids a bug in FireFox on OSX
	copy = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',

	// line-height is conditionally included because IE7/IE8/old Opera do not return the correct value.
	copyStyle = [
		'fontFamily',
		'fontSize',
		'fontWeight',
		'fontStyle',
		'letterSpacing',
		'textTransform',
		'wordSpacing',
		'textIndent'
	],
	oninput = 'oninput',
	onpropertychange = 'onpropertychange',

	// to keep track which textarea is being mirrored when adjust() is called.
	mirrored,

	// the mirror element, which is used to calculate what size the mirrored element should be.
	mirror = $(copy).data('autosize', true)[0];

	// test that line-height can be accurately copied.
	mirror.style.lineHeight = '99px';
	if ($(mirror).css(lineHeight) === '99px') {
		copyStyle.push(lineHeight);
	}
	mirror.style.lineHeight = '';

	// test for subpixel rendering
	useSubpixels = mirror.getBoundingClientRect().width !== undefined;

	$.fn.autosize = function (options) {
		options = $.extend({}, defaults, options || {});

		if (mirror.parentNode !== document.body) {
			$(document.body).append(mirror);
		}

		return this.each(function () {
			var
			ta = this,
			$ta = $(ta),
			minHeight,
			maxHeight,
			resize,
			boxOffset = 0,
			callback = $.isFunction(options.callback);

			if ($ta.data('autosize')) {
				// exit if autosize has already been applied, or if the textarea is the mirror element.
				return;
			}

			if ($ta.css('box-sizing') === borderBox || $ta.css('-moz-box-sizing') === borderBox || $ta.css('-webkit-box-sizing') === borderBox){
				boxOffset = $ta.outerHeight() - $ta.height();
			}

			// IE8 and lower return 'auto', which parses to NaN, if no min-height is set.
			minHeight = Math.max(parseInt($ta.css('minHeight'), 10) - boxOffset || 0, $ta.height());

			resize = ($ta.css('resize') === 'none' || $ta.css('resize') === 'vertical') ? 'none' : 'horizontal';

			$ta.css({
				overflow: hidden,
				overflowY: hidden,
				wordWrap: 'break-word',
				resize: resize
			}).data('autosize', true);

			function initMirror() {
				mirrored = ta;
				mirror.className = options.className;
				maxHeight = parseInt($ta.css('maxHeight'), 10);

				// mirror is a duplicate textarea located off-screen that
				// is automatically updated to contain the same text as the
				// original textarea.  mirror always has a height of 0.
				// This gives a cross-browser supported way getting the actual
				// height of the text, through the scrollTop property.
				$.each(copyStyle, function(i, val){
					mirror.style[val] = $ta.css(val);
				});

				// The textarea overflow is probably now hidden, but Chrome doesn't reflow the text to account for the
				// new space made available by removing the scrollbars. This workaround causes Chrome to reflow the text.
				if (oninput in ta) {
					var width = ta.style.width;
					ta.style.width = '0px';
					var discard = ta.offsetWidth; // trigger a reflow
					ta.style.width = width;
				}
			}

			// Using mainly bare JS in this function because it is going
			// to fire very often while typing, and needs to very efficient.
			function adjust() {
				var height, overflow, original, width;

				if (mirrored !== ta) {
					initMirror();
				}

				mirror.value = ta.value + options.append;
				mirror.style.overflowY = ta.style.overflowY;
				original = parseInt(ta.style.height,10);

				if (useSubpixels) {
					// The mirror width much exactly match the textarea width, so using getBoundingClientRect because it doesn't round the subpixel value.
					width = ta.getBoundingClientRect().width;
					$.each($(ta).css(['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth']), function(){
						width -= parseInt(this, 10);
					});
					mirror.style.width = width + 'px';
				}
				else {
					mirror.style.width = Math.max($ta.width(), 0) + 'px';
				}

				// Needed for IE8 and lower to reliably return the correct scrollTop
				mirror.scrollTop = 0;

				mirror.scrollTop = 9e4;

				// Using scrollTop rather than scrollHeight because scrollHeight is non-standard and includes padding.
				height = mirror.scrollTop;

				if (maxHeight && height > maxHeight) {
					height = maxHeight;
					overflow = 'scroll';
				} else if (height < minHeight) {
					height = minHeight;
				}

				height += boxOffset;
				ta.style.overflowY = overflow || hidden;

				if (original !== height) {						
					ta.style.height = height + 'px';
					if (callback) {
						options.callback.call(ta,ta);
					}
				}
			}

			if (onpropertychange in ta) {
				if (oninput in ta) {
					// Detects IE9.  IE9 does not fire onpropertychange or oninput for deletions,
					// so binding to onkeyup to catch most of those occassions.  There is no way that I
					// know of to detect something like 'cut' in IE9.
					ta[oninput] = ta.onkeyup = adjust;
				} else {
					// IE7 / IE8
					ta[onpropertychange] = function(){
						if(event.propertyName === 'value'){
							adjust();
						}
					};
				}
			} else {
				// Modern Browsers
				ta[oninput] = adjust;
			}

			// Set options.resizeDelay to false if using fixed-width textarea elements.
			// Uses a timeout and width check to reduce the amount of times adjust needs to be called after window resize.
			if (options.resizeDelay !== false) {
				var timeout;
				var width = $(ta).width();
				$(window).on('resize.autosize', function() {
					clearTimeout(timeout);
					timeout = setTimeout(function(){
						if ($(ta).width() !== width) {
							adjust();
						}
					}, parseInt(options.resizeDelay,10));
				});
			}

			// Allow for manual triggering if needed.
			$ta.on('autosize', adjust);

			// Call adjust in case the textarea already contains text.
			adjust();
		});
	};
}(window.jQuery || window.Zepto));
