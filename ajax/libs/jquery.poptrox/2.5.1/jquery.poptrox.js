/* jquery.poptrox.js v2.5.1 | (c) n33 | n33.co | MIT licensed */

(function($) {

	// Disables selection
		$.fn.poptrox_disableSelection = function() { return $(this).css('user-select', 'none').css('-khtml-user-select', 'none').css('-moz-user-select', 'none').css('-o-user-select', 'none').css('-webkit-user-select', 'none'); }

	// Poptrox prototype method
		$.fn.poptrox = function(options) {

			// Handle no elements.
				if (this.length == 0)
					return $(this);

			// Handle multiple elements.
				if (this.length > 1) {

					for (var i=0; i < this.length; i++)
						$(this[i]).poptrox(options);

					return $(this);

				}

			// Settings
				var settings = $.extend({

					preload:						false,						// If true, preload fullsize images in the background
					baseZIndex:						1000,						// Base Z-Index
					fadeSpeed:						300,						// Global fade speed
					overlayColor:					'#000000',					// Overlay color
					overlayOpacity:					0.6,						// Overlay opacity
					overlayClass:					'poptrox-overlay',			// Overlay class
					windowMargin:					50,							// Window margin size (in pixels; only comes into play when an image is larger than the viewport)
					windowHeightPad:				0,							// Window height pad
					selector:						'a',						// Anchor tag selector
					caption:						null,						// Caption settings (see docs)
					parent:							'body',						// Parent selector (ie. where all the popup/overlay stuff gets added).
					popupSpeed:						300,						// Popup (resize) speed
					popupWidth:						200,						// Popup width
					popupHeight:					100,						// Popup height
					popupIsFixed:					false,						// If true, popup won't resize to fit images
					useBodyOverflow:				false,						// If true, the BODY tag is set to overflow: hidden when the popup is visible
					usePopupEasyClose:				true,						// If true, popup can be closed by clicking on it anywhere
					usePopupForceClose:				false,						// If true, popup can be closed even while content is loading
					usePopupLoader:					true,						// If true, show the popup loader
					usePopupCloser:					true,						// If true, show the popup closer button/link
					usePopupCaption:				false,						// If true, show the popup image caption
					usePopupNav:					false,						// If true, show (and use) popup navigation
					usePopupDefaultStyling:			true,						// If true, default popup styling will be applied (background color, text color, etc)
					popupBackgroundColor:			'#FFFFFF',					// (Default Style) Popup background color (when usePopupStyling = true)
					popupTextColor:					'#000000',					// (Default Style) Popup text color (when usePopupStyling = true)
					popupLoaderTextSize:			'2em',						// (Default Style) Popup loader text size
					popupCloserBackgroundColor:		'#000000',					// (Default Style) Popup closer background color (when usePopupStyling = true)
					popupCloserTextColor:			'#FFFFFF',					// (Default Style) Popup closer text color (when usePopupStyling = true)
					popupCloserTextSize:			'20px',						// (Default Style) Popup closer text size
					popupPadding:					10,							// (Default Style) Popup padding (when usePopupStyling = true)
					popupCaptionHeight:				60,							// (Default Style) Popup height of caption area
					popupCaptionTextSize:			null,						// (Default Style) Popup caption text size
					popupBlankCaptionText:			'(untitled)',				// Applied to images that don't have captions (when captions are enabled)
					popupCloserText:				'&#215;',					// Popup closer text
					popupLoaderText:				'&bull;&bull;&bull;&bull;',	// Popup loader text
					popupClass:						'poptrox-popup',			// Popup class
					popupSelector:					null,						// (Advanced) Popup selector (use this if you want to replace the built-in popup)
					popupLoaderSelector:			'.loader',					// (Advanced) Popup Loader selector
					popupCloserSelector:			'.closer',					// (Advanced) Popup Closer selector
					popupCaptionSelector:			'.caption',					// (Advanced) Popup Caption selector
					popupNavPreviousSelector:		'.nav-previous',			// (Advanced) Popup Nav Previous selector
					popupNavNextSelector:			'.nav-next',				// (Advanced) Popup Nav Next selector
					onPopupClose:					null,						// Called when popup closes
					onPopupOpen:					null						// Called when popup opens

				}, options);

			// Variables

				var	$this = $(this),
					$body = $('body'),
					$overlay = $('<div class="' + settings.overlayClass +  '"></div>'),
					$window = $(window);

				var	windowWidth,
					windowHeight,
					queue = [],
					navPos = 0,
					isLocked = false,
					cache = new Array();

				function updateWH() {

					windowWidth = $(window).width();
					windowHeight = $(window).height() + settings.windowHeightPad;

					var dw = Math.abs($popup.width() - $popup.outerWidth()), dh = Math.abs($popup.height() - $popup.outerHeight());
					var nw = $x.width(), nh = $x.height();
					var maxw = windowWidth - (settings.windowMargin * 2) - dw, maxh = windowHeight - (settings.windowMargin * 2) - dh;

					$popup
						.css('min-width', settings.popupWidth)
						.css('min-height', settings.popupHeight);

					$pic.children()
						.css('max-width', maxw)
						.css('max-height', maxh);

				}

				// Disable unused features
					if (!settings.usePopupLoader)
						settings.popupLoaderSelector = null;

					if (!settings.usePopupCloser)
						settings.popupCloserSelector = null;

					if (!settings.usePopupCaption)
						settings.popupCaptionSelector = null;

					if (!settings.usePopupNav) {

						settings.popupNavPreviousSelector = null;
						settings.popupNavNextSelector = null;

					}

				// Get popup
					var $popup;

					if (settings.popupSelector)
						$popup = $(settings.popupSelector);
					else
						$popup = $('<div class="' + settings.popupClass + '">' + (settings.popupLoaderSelector ? '<div class="loader">' + settings.popupLoaderText + '</div>' : '') + '<div class="pic"></div>' + (settings.popupCaptionSelector ? '<div class="caption"></div>' : '') + (settings.popupCloserSelector ? '<span class="closer">' + settings.popupCloserText + '</span>' : '') + (settings.popupNavPreviousSelector ? '<div class="nav-previous"></div>' : '') + (settings.popupNavNextSelector ? '<div class="nav-next"></div>' : '') + '</div>');

				// Get popup components
					var	$pic = $popup.find('.pic'),
						$x = $(),
						$loader = $popup.find(settings.popupLoaderSelector),
						$caption = $popup.find(settings.popupCaptionSelector),
						$closer = $popup.find(settings.popupCloserSelector),
						$nav_next = $popup.find(settings.popupNavNextSelector),
						$nav_previous = $popup.find(settings.popupNavPreviousSelector),
						$nav = $nav_next.add($nav_previous);

				// Apply default styling?
					if (settings.usePopupDefaultStyling) {

						$popup
							.css('background', settings.popupBackgroundColor)
							.css('color', settings.popupTextColor)
							.css('padding', settings.popupPadding + 'px');

						if ($caption.length > 0) {

							$popup
								.css('padding-bottom', settings.popupCaptionHeight + 'px');

							$caption
								.css('position', 'absolute')
								.css('left', '0')
								.css('bottom', '0')
								.css('width', '100%')
								.css('text-align', 'center')
								.css('height', settings.popupCaptionHeight + 'px')
								.css('line-height', settings.popupCaptionHeight + 'px');

							if (settings.popupCaptionTextSize)
								$caption.css('font-size', popupCaptionTextSize);

						}

						if ($closer.length > 0)
							$closer
								.html(settings.popupCloserText)
								.css('font-size', settings.popupCloserTextSize)
								.css('background', settings.popupCloserBackgroundColor)
								.css('color', settings.popupCloserTextColor)
								.css('display', 'block')
								.css('width', '40px')
								.css('height', '40px')
								.css('line-height', '40px')
								.css('text-align', 'center')
								.css('position', 'absolute')
								.css('text-decoration', 'none')
								.css('outline', '0')
								.css('top', '0')
								.css('right', '-40px');

						if ($loader.length > 0) {

							$loader
								.html('')
								.css('position', 'relative')
								.css('font-size', settings.popupLoaderTextSize)
								.on('startSpinning', function(e) {

									var x = $('<div>' + settings.popupLoaderText + '</div>');

									x
										.css('height', Math.floor(settings.popupHeight / 2) + 'px')
										.css('overflow', 'hidden')
										.css('line-height', Math.floor(settings.popupHeight / 2) + 'px')
										.css('text-align', 'center')
										.css('margin-top', Math.floor(($popup.height() - x.height() + ($caption.length > 0 ? $caption.height() : 0)) / 2))
										.css('color', (settings.popupTextColor ? settings.popupTextColor : ''))
										.on('xfin', function() { x.fadeTo(300, 0.5, function() { x.trigger('xfout'); }); })
										.on('xfout', function() { x.fadeTo(300, 0.05, function() { x.trigger('xfin'); }); })
										.trigger('xfin');

									$loader.append(x);

								})
								.on('stopSpinning', function(e) {

									var x = $loader.find('div');
									x.remove();

								});

						}

						if ($nav.length == 2) {

							$nav
								.css('font-size', '75px')
								.css('text-align', 'center')
								.css('color', '#fff')
								.css('text-shadow', 'none')
								.css('height', '100%')
								.css('position', 'absolute')
								.css('top', '0')
								.css('opacity', '0.35')
								.css('cursor', 'pointer')
								.css('box-shadow', 'inset 0px 0px 10px 0px rgba(0,0,0,0)')
								.poptrox_disableSelection();

							var wn, wp;

							if (settings.usePopupEasyClose) {

								wn = '100px';
								wp = '100px';

							}
							else {

								wn = '75%';
								wp = '25%';

							}

							$nav_next
								.css('right', '0')
								.css('width', wn)
								.html('<div style="position: absolute; height: 100px; width: 125px; top: 50%; right: 0; margin-top: -50px;">&gt;</div>');

							$nav_previous
								.css('left', '0')
								.css('width', wp)
								.html('<div style="position: absolute; height: 100px; width: 125px; top: 50%; left: 0; margin-top: -50px;">&lt;</div>');

						}

					}

			// Main
				$window
					.on('resize orientationchange', function() {
						updateWH();
					});

				$caption
					.on('update', function(e, s) {

						if (!s || s.length == 0)
							s = settings.popupBlankCaptionText;

						$caption.html(s);

					});

				$closer
					.css('cursor', 'pointer')
					.on('click', function(e) {

						e.preventDefault();
						e.stopPropagation();

						$popup.trigger('poptrox_close');

						return true;

					});

				$nav_next
					.on('click', function(e) {

						e.stopPropagation();
						e.preventDefault();
						$popup.trigger('poptrox_next');

					});

				$nav_previous
					.on('click', function(e) {

						e.stopPropagation();
						e.preventDefault();
						$popup.trigger('poptrox_previous');

					});

				$overlay
					.css('position', 'fixed')
					.css('left', 0)
					.css('top', 0)
					.css('z-index', settings.baseZIndex)
					.css('width', '100%')
					.css('height', '100%')
					.css('text-align', 'center')
					.css('cursor', 'pointer')
					.appendTo(settings.parent)
					.prepend('<div style="display:inline-block;height:100%;vertical-align:middle;"></div>')
					.append('<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:' + settings.overlayColor + ';opacity:' + settings.overlayOpacity + ';filter:alpha(opacity=' + (settings.overlayOpacity * 100) + ');"></div>')
					.hide()
					.on('touchmove', function(e) {
						return false;
					})
					.on('click', function(e) {

						e.preventDefault();
						e.stopPropagation();

						$popup.trigger('poptrox_close');

					});

				$popup
					.css('display', 'inline-block')
					.css('vertical-align', 'middle')
					.css('position', 'relative')
					.css('z-index', 1)
					.css('cursor', 'auto')
					.appendTo($overlay)
					.hide()
					.on('poptrox_next', function() {

						var x = navPos + 1;

						if (x >= queue.length)
							x = 0;

						$popup.trigger('poptrox_switch', [x]);

					})
					.on('poptrox_previous', function() {

						var x = navPos - 1;

						if (x < 0)
							x = queue.length - 1;

						$popup.trigger('poptrox_switch', [x]);

					})
					.on('poptrox_reset', function() {

						updateWH();

						$popup
							.data('width', settings.popupWidth)
							.data('height', settings.popupHeight);

						$loader.hide().trigger('stopSpinning');
						$caption.hide();
						$closer.hide();
						$nav.hide();
						$pic.hide();

						$x
							.attr('src', '')
							.detach();

					})
					.on('poptrox_open', function(e, index) {

						if (isLocked)
							return true;

						isLocked = true;

						if (settings.useBodyOverflow)
							$body.css('overflow', 'hidden');

						if (settings.onPopupOpen)
							(settings.onPopupOpen)();

						$overlay
							.fadeTo(settings.fadeSpeed, 1.0, function() {
								$popup.trigger('poptrox_switch', [index, true]);
							});

					})
					.on('poptrox_switch', function(e, index, ignoreLock) {

						var x, img;

						if (!ignoreLock && isLocked)
							return true;

						isLocked = true;

						$popup
							.css('width', $popup.data('width'))
							.css('height', $popup.data('height'));

						// Cleanup from previous
							$caption.hide();
							if ($x.attr('src'))
								$x.attr('src', '');
							$x.detach();

						// Activate new object
							x = queue[index];
							$x = x.object;
							$x.off('load');

							$pic
								.css('text-indent', '-9999px')
								.show()
								.append($x);

							if (x.type == 'ajax')
								$.get(x.src, function(data) {

									$x.html(data);
									$x.trigger('load');

								});
							else
								$x.attr('src', x.src);

							if (x.type != 'image') {

								var xwidth, xheight;

								xwidth = x.width;
								xheight = x.height;

								if (xwidth.slice(-1) == '%')
									xwidth = (parseInt(xwidth.substring(0, xwidth.length - 1)) / 100.00) * $window.width();

								if (xheight.slice(-1) == '%')
									xheight = (parseInt(xheight.substring(0, xheight.length - 1)) / 100.00) * $window.height();

								$x
									.css('position', 'relative')
									.css('outline', '0')
									.css('z-index', settings.baseZIndex + 100)
									.width(xwidth)
									.height(xheight);

							}

						// Initialize
							$loader.trigger('startSpinning').fadeIn(300);
							$popup.show();

						if (settings.popupIsFixed) {

							$popup
								.width(settings.popupWidth)
								.height(settings.popupHeight);

							$x.load(function() {

								$x.off('load');
								$loader.hide().trigger('stopSpinning');
								$caption.trigger('update', [x.captionText]).fadeIn(settings.fadeSpeed);
								$closer.fadeIn(settings.fadeSpeed);
								$pic.css('text-indent', 0).hide().fadeIn(settings.fadeSpeed, function() { isLocked = false; });
								navPos = index;
								$nav.fadeIn(settings.fadeSpeed);

							});

						}
						else {

							$x.load(function() {

								updateWH();

								$x.off('load');
								$loader.hide().trigger('stopSpinning');

								var	nw = $x.width(),
									nh = $x.height(),
									f = function() {

										$caption.trigger('update', [x.captionText]).fadeIn(settings.fadeSpeed);
										$closer.fadeIn(settings.fadeSpeed);
										$pic.css('text-indent', 0).hide().fadeIn(settings.fadeSpeed, function() { isLocked = false; });
										navPos = index;
										$nav.fadeIn(settings.fadeSpeed);

										$popup
											.data('width', nw)
											.data('height', nh)
											.css('width', 'auto')
											.css('height', 'auto');

									};

								if (nw == $popup.data('width')
								&&	nh == $popup.data('height'))
									(f)();
								else
									$popup.animate({ width: nw, height: nh }, settings.popupSpeed, 'swing', f);

							});

						}

						if (x.type != 'image')
							$x.trigger('load');

					})
					.on('poptrox_close', function() {

						if (isLocked
						&&	!settings.usePopupForceClose)
							return true;

						isLocked = true;

						$popup
							.hide()
							.trigger('poptrox_reset');

						if (settings.onPopupClose)
							(settings.onPopupClose)();

						$overlay
							.fadeOut(settings.fadeSpeed, function() {

								if (settings.useBodyOverflow)
									$body.css('overflow', 'auto');

								isLocked = false;

							});

					})
					.trigger('poptrox_reset');

					// Easy close.
						if (settings.usePopupEasyClose) {

							$caption.on('click', 'a', function(e) {
								e.stopPropagation();
							});

							$popup
								.css('cursor', 'pointer')
								.on('click', function(e) {

									e.stopPropagation();
									e.preventDefault();

									$popup.trigger('poptrox_close');

								});
						}
						else
							$popup
								.on('click', function(e) {
									e.stopPropagation();
								});

				$window
					.keydown(function(e) {

						if ($popup.is(':visible')) {

							switch (e.keyCode) {

								case 37:
								case 32:

									if (settings.usePopupNav) {

										$popup.trigger('poptrox_previous');
										return false;

									}

									break;

								case 39:

									if (settings.usePopupNav) {

										$popup.trigger('poptrox_next');
										return false;

									}

									break;

								case 27:

									$popup.trigger('poptrox_close');
									return false;

									break;

							}

						}

					});

				$this.find(settings.selector).each(function(index) {

					var x, tmp, a = $(this), i = a.find('img'), data = a.data('poptrox');

					// Ignore? Skip.
						if (data == 'ignore')
							return;

					// No href? Bail.
						if (!a.attr('href'))
							return;

					x = {

						src:			a.attr('href'),
						captionText:	i.attr('title'),
						width:			null,
						height:			null,
						type:			null,
						object:			null,
						options:		null

					};

					// Determine caption.

						// No caption setting? Use default (title attribute of image).
							if (!settings.caption)
								c = i.attr('title');

						// Function?
							else if (typeof(settings.caption) == 'function')
								c = (settings.caption)(a);

						// Selector?
							else if ('selector' in settings.caption) {

								var s;

								s = a.find(settings.caption.selector);

								if ('attribute' in settings.caption)
									c = s.attr(settings.caption.attribute);
								else {

									c = s.html();

									if (settings.caption.remove === true)
										s.remove();

								}

							}

						x.captionText = c;

					// If a data attribute exists, use it
						if (data) {

							var b = data.split(',');

							// Type.
								if (0 in b)
									x.type = b[0];

							// Size.
								if (1 in b) {

									tmp = b[1].match(/([0-9%]+)x([0-9%]+)/);

									if (tmp && tmp.length == 3) {

										x.width = tmp[1];
										x.height = tmp[2];

									}

								}

							// Options.
								if (2 in b)
									x.options = b[2];

						}

					// No type? Attempt to guess it based on the href's domain
						if (!x.type) {

							tmp = x.src.match(/\/\/([a-z0-9\.]+)\/.*/);

							if (!tmp || tmp.length < 2)
								tmp = [false];

							switch (tmp[1]) {

								case 'api.soundcloud.com':
									x.type = 'soundcloud';
									break;

								case 'youtu.be':
									x.type = 'youtube';
									break;

								case 'vimeo.com':
									x.type = 'vimeo';
									break;

								case 'wistia.net':
									x.type = 'wistia';
									break;

								case 'bcove.me':
									x.type = 'bcove';
									break;

								default:
									x.type = 'image';
									break;

							}

						}

					// Create object (based on type)
						tmp = x.src.match(/\/\/[a-z0-9\.]+\/(.*)/);

						switch (x.type) {

							case 'iframe':
								x.object = $('<iframe src="" frameborder="0"></iframe>');
								x.object
									.on('click', function(e) { e.stopPropagation(); })
									.css('cursor', 'auto');

								if (!x.width || !x.height) {
									x.width = "600";
									x.height = "400";
								}

								break;

							case 'ajax':
								x.object = $('<div class="poptrox-ajax"></div>');
								x.object
									.on('click', function(e) { e.stopPropagation(); })
									.css('cursor', 'auto')
									.css('overflow', 'auto');

								if (!x.width || !x.height) {
									x.width = "600";
									x.height = "400";
								}

								break;

							case 'soundcloud':
								x.object = $('<iframe scrolling="no" frameborder="no" src=""></iframe>');
								x.src = '//w.soundcloud.com/player/?url=' + escape(x.src) + (x.options ? '&' + x.options : '');
								x.width = '600';
								x.height = "166";

								break;

							case 'youtube':
								x.object = $('<iframe src="" frameborder="0" allowfullscreen="1"></iframe>');
								x.src = '//www.youtube.com/embed/' + tmp[1]  + (x.options ? '?' + x.options : '');

								if (!x.width || !x.height) {
									x.width = "800";
									x.height = "480";
								}

								break;

							case 'vimeo':
								x.object = $('<iframe src="" frameborder="0" allowFullScreen="1"></iframe>');
								x.src = '//player.vimeo.com/video/' + tmp[1]  + (x.options ? '?' + x.options : '');

								if (!x.width || !x.height) {
									x.width = "800";
									x.height = "480";
								}

								break;

							case 'wistia':
								x.object = $('<iframe src="" frameborder="0" allowFullScreen="1"></iframe>');
								x.src = '//fast.wistia.net/' + tmp[1] + (x.options ? '?' + x.options : '');

								if (!x.width || !x.height) {
									x.width = "800";
									x.height = "480";
								}

								break;

							case 'bcove':
								x.object = $('<iframe src="" frameborder="0" allowFullScreen="1" width="100%"></iframe>');
								x.src = '//bcove.me/' + tmp[1] + (x.options ? '?' + x.options : '');

								if (!x.width || !x.height) {
									x.width = "640";
									x.height = "360";
								}

								break;

							default:
								x.object = $('<img src="" alt="" style="vertical-align:bottom" />');

								if (settings.preload) {

									var tmp = document.createElement('img');
									tmp.src = x.src; cache.push(tmp);

								}

								x.width = a.attr('width');
								x.height = a.attr('height');

								break;

						}

					// Fix src if protocol is 'file'.
						if (window.location.protocol == 'file:'
						&&	x.src.match(/^\/\//))
							x.src = 'http:' + x.src;

					queue.push(x);

					i.attr('title', '');

					a
						.attr('href', '')
						.css('outline', 0)
						.on('click', function(e) {

							e.preventDefault();
							e.stopPropagation();

							$popup.trigger('poptrox_open', [index]);

						});

				});

			return $(this);

		};

})(jQuery);