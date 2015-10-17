/* jquery.poptrox.js v2.3.3 | (c) n33 | n33.co | MIT licensed */

(function($) {

	// Disables selection
		$.fn.poptrox_disableSelection = function() { return $(this).css('user-select', 'none').css('-khtml-user-select', 'none').css('-moz-user-select', 'none').css('-o-user-select', 'none').css('-webkit-user-select', 'none'); }

	// Poptrox prototype method
		$.fn.poptrox = function(options) {

			// Handle multiple elements
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
					windowMargin:					50,							// Window margin size (in pixels; only comes into play when an image is larger than the viewport)
					windowHeightPad:				0,							// Window height pad
					selector:						'a',						// Anchor tag selector
					popupSpeed:						300,						// Popup (resize) speed
					popupWidth:						200,						// Popup width
					popupHeight:					100,						// Popup height
					popupIsFixed:					false,						// If true, popup won't resize to fit images
					useBodyOverflow:				true,						// If true, the BODY tag is set to overflow: hidden when the popup is visible
					usePopupEasyClose:				true,						// If true, popup can be closed by clicking on it anywhere
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

				var	_top = $(this),
					_body = $('body'),
					_overlay = $('<div></div>'),
					_window = $(window);
				
				var	windowWidth,
					windowHeight,
					queue = [],
					navPos = 0,
					isLocked = false,
					cache = new Array(),
					isMSIE = navigator.userAgent.match(/MSIE ([0-9]+)\./),
					isMSIE6 = isMSIE && (RegExp.$1 == 6),
					isMSIE67 = isMSIE && (RegExp.$1 < 8),
					pos = (isMSIE6 ? 'absolute' : 'fixed');
				
				function updateWH() {

					windowWidth = $(window).width();
					windowHeight = $(window).height() + settings.windowHeightPad;

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
					var _popup;
				
					if (settings.popupSelector)
						_popup = $(settings.popupSelector);
					else
						_popup = $('<div class="' + settings.popupClass + '">' + (settings.popupLoaderSelector ? '<div class="loader">' + settings.popupLoaderText + '</div>' : '') + '<div class="pic"></div>' + (settings.popupCaptionSelector ? '<div class="caption"></div>' : '') + (settings.popupCloserSelector ? '<span class="closer">' + settings.popupCloserText + '</span>' : '') + (settings.popupNavPreviousSelector ? '<div class="nav-previous"></div>' : '') + (settings.popupNavNextSelector ? '<div class="nav-next"></div>' : '') + '</div>');

				// Get popup components
					var	_pic = _popup.find('.pic'),
						_x = $(),
						_loader = _popup.find(settings.popupLoaderSelector),
						_caption = _popup.find(settings.popupCaptionSelector),
						_closer = _popup.find(settings.popupCloserSelector),
						_nav_next = _popup.find(settings.popupNavNextSelector),
						_nav_previous = _popup.find(settings.popupNavPreviousSelector),
						_nav = _nav_next.add(_nav_previous);

				// Apply default styling?
					if (settings.usePopupDefaultStyling) {
						
						_popup.css('background', settings.popupBackgroundColor);
						_popup.css('color', settings.popupTextColor);
						_popup.css('padding', settings.popupPadding + 'px');
							
						if (_caption.length > 0) {
							
							_popup.css('padding-bottom', settings.popupCaptionHeight + 'px');
							_caption
								.css('position', 'absolute')
								.css('left', '0')
								.css('bottom', '0')
								.css('width', '100%')
								.css('text-align', 'center')
								.css('height', settings.popupCaptionHeight + 'px')
								.css('line-height', settings.popupCaptionHeight + 'px');
								
							if (settings.popupCaptionTextSize)
								_caption.css('font-size', popupCaptionTextSize);
						
						}
							
						if (_closer.length > 0)
							_closer
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
								
						if (_loader.length > 0) {
							
							_loader
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
										.css('margin-top', Math.floor((_popup.height() - x.height() + (_caption.length > 0 ? _caption.height() : 0)) / 2))
										.css('color', (settings.popupTextColor ? settings.popupTextColor : ''))
										.on('xfin', function() { x.fadeTo(300, 0.5, function() { x.trigger('xfout'); }); })
										.on('xfout', function() { x.fadeTo(300, 0.05, function() { x.trigger('xfin'); }); })
										.trigger('xfin');
									
									_loader.append(x);
								
								})
								.on('stopSpinning', function(e) {
									
									var x = _loader.find('div');
									x.remove();
								
								});
						
						}
						
						if (_nav.length == 2) {
							
							_nav
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
							
							_nav_next
								.css('right', '0')
								.css('width', wn)
								.html('<div style="position: absolute; height: 100px; width: 125px; top: 50%; right: 0; margin-top: -50px;">&gt;</div>');

							_nav_previous
								.css('left', '0')
								.css('width', wp)
								.html('<div style="position: absolute; height: 100px; width: 125px; top: 50%; left: 0; margin-top: -50px;">&lt;</div>');
						
						}
					
					}
			
			// Main
				_window
					.on('orientationchange', function() {
						_window.trigger('resize');
					})
					.resize(function() {
						
						updateWH();
					
						_popup.trigger('poptrox_close');
					
					});

				_caption
					.on('update', function(e, s) {
						
						if (!s || s.length == 0)
							s = settings.popupBlankCaptionText;
						
						_caption.html(s);
					
					});
				
				_closer
					.css('cursor', 'pointer')
					.on('click', function(e) {
						
						e.preventDefault();
						e.stopPropagation();
					
						_popup.trigger('poptrox_close');
						
						return true;
					
					});

				_nav_next
					.on('click', function() {
						_popup.trigger('poptrox_next');
					});

				_nav_previous
					.on('click', function() {
						_popup.trigger('poptrox_previous');
					});

				_overlay
					.prependTo('body')
					.hide();

				if (isMSIE6)
					_overlay.css('position', 'absolute');
				else
					_overlay
						.css('position', pos)
						.css('left', 0)
						.css('top', 0)
						.css('z-index', settings.baseZIndex)
						.css('width', '200%')
						.css('height', '200%')
						.css('background-color', settings.overlayColor);

				_overlay
					.css('cursor', 'pointer')
					.on('click', function(e) {

						e.preventDefault();
						e.stopPropagation();

						_popup.trigger('poptrox_close');

					});

				if (settings.usePopupEasyClose) {

					_pic
						.css('cursor', 'pointer')
						.on('click', function(e) {

							e.preventDefault();
							e.stopPropagation();

							_popup.trigger('poptrox_close');

						});

				}

				_popup
					.on('poptrox_next', function() {
						
						var x = navPos + 1;
						
						if (x >= queue.length)
							x = 0;
						
						_popup.trigger('poptrox_switch', [x]);
					
					})
					.on('poptrox_previous', function() {
					
						var x = navPos - 1;
					
						if (x < 0)
							x = queue.length - 1;
					
						_popup.trigger('poptrox_switch', [x]);
					
					})
					.on('poptrox_reset', function() {
						
						updateWH();

						_popup
							.css('position', pos)
							.css('z-index', settings.baseZIndex + 1)
							.css('width', settings.popupWidth + 'px')
							.css('height', settings.popupHeight + 'px')
							.css('left', (windowWidth / 2) + 'px')
							.css('top', (windowHeight / 2) + 'px')
							.css('top', (windowHeight / 2) + 'px')
							.css('margin-left', (-1 * (_popup.outerWidth() / 2)) + 'px')
							.css('margin-top', (-1 * (_popup.outerHeight() / 2)) + 'px')
						
						_loader.hide().trigger('stopSpinning');
						_caption.hide();
						_closer.hide();
						_nav.hide();
						_pic.hide();
						_x.detach();
					
					})
					.on('poptrox_open', function(e, index) {
					
						if (isLocked)
							return true;
					
						isLocked = true;
					
						if (settings.useBodyOverflow)
							_body.css('overflow', 'hidden');

						if (settings.onPopupOpen)
							(settings.onPopupOpen)();

						_overlay
							.fadeTo(settings.fadeSpeed, settings.overlayOpacity, function() {
								_popup.trigger('poptrox_switch', [index, true]);
							});

					})
					.on('poptrox_switch', function(e, index, ignoreLock) {
						
						var x, img;

						if (!ignoreLock && isLocked)
							return true;
						
						isLocked = true;

						// Cleanup from previous
							_caption.hide();
							if (_x.attr('src'))
								_x.attr('src', '');
							_x.detach();
						
						// Activate new object
							x = queue[index];
							_x = x.object;
							_x.off('load');
						
							_pic
								.css('text-indent', '-9999em')
								.show()
								.append(_x);

							if (x.type == 'ajax')
								$.get(x.src, function(data) {
									
									_x.html(data);
									_x.trigger('load');
								
								});
							else
								_x.attr('src', x.src);
							
							if (x.type != 'image')
								_x
									.css('position', 'relative')
									.css('outline', '0')
									.css('z-index', settings.baseZIndex + 100)
									.width(x.width)
									.height(x.height);

						// Initialize
							_loader.trigger('startSpinning').fadeIn(300);
							_popup.show();

						if (settings.popupIsFixed) {
							
							_popup
								.width(settings.popupWidth)
								.height(settings.popupHeight)
								.css('margin-left', (-1 * (_popup.innerWidth() / 2)) + 'px')
								.css('margin-top', (-1 * (_popup.innerHeight() / 2)) + 'px');

							_x.load(function() {
							
								_x.off('load');
								_loader.hide().trigger('stopSpinning');
								_caption.trigger('update', [x.captionText]).fadeIn(settings.fadeSpeed);
								_closer.fadeIn(settings.fadeSpeed);
								_pic.css('text-indent', 0).hide().fadeIn(settings.fadeSpeed, function() { isLocked = false; });
								navPos = index;
								_nav.fadeIn(settings.fadeSpeed);

							});
						
						}
						else {
							
							_x.load(function() {
								
								_x.off('load');

								updateWH();

								var dw = Math.abs(_popup.width() - _popup.outerWidth()), dh = Math.abs(_popup.height() - _popup.outerHeight());
								var nw = _x.width(), nh = _x.height();
								var maxw = windowWidth - (settings.windowMargin * 2) - dw, maxh = windowHeight - (settings.windowMargin * 2) - dh;
								
								_loader.hide().trigger('stopSpinning');
								
								if (nw > maxw || nh > maxh) {
									
									var multW, multH, m;
									
									multW = maxw / nw;
									multH = maxh / nh;
									m = Math.min(multW, multH);
									
									nw = Math.floor(m * nw);
									nh = Math.floor(m * nh);

									_x.width(nw).height(nh);
								
								}

								if (_popup.innerWidth() == nw + dw
								&&	_popup.innerHeight() == nh + dh) {
									
									_caption.trigger('update', [x.captionText]).fadeIn(settings.fadeSpeed);
									_closer.fadeIn(settings.fadeSpeed);
									_pic.css('text-indent', 0).hide().fadeIn(settings.fadeSpeed, function() { isLocked = false; });
									navPos = index;

								}
								else
									_popup
										.animate({
											width: nw,
											height: nh,
											marginLeft: (-1 * (nw / 2)) - (dw / 2),
											marginTop: (-1 * (nh / 2)) - (dh / 2)
										}, settings.popupSpeed, 'swing', function() {
											
											_caption.trigger('update', [x.captionText]).fadeIn(settings.fadeSpeed);
											_closer.fadeIn(settings.fadeSpeed);
											_pic.css('text-indent', 0).hide().fadeIn(settings.fadeSpeed, function() { isLocked = false; });
											navPos = index;
											_nav.fadeIn(settings.fadeSpeed);
										
										});
							
							});
						
						}
						
						if (x.type != 'image')
							_x.trigger('load');
					
					})
					.on('poptrox_close', function() {
					
						if (isLocked)
							return true;
					
						isLocked = true;
					
						_popup
							.hide()
							.trigger('poptrox_reset');
					
						if (settings.onPopupClose)
							(settings.onPopupClose)();
					
						_overlay
							.fadeOut(settings.fadeSpeed, function() {
							
								if (settings.useBodyOverflow)
									_body.css('overflow', 'auto');
									
								isLocked = false;
							
							});
					
					})
					.prependTo('body')
					.hide()
					.trigger('poptrox_reset');

				_window
					.keydown(function(e) {

						if (_popup.is(':visible')) {
							
							switch (e.keyCode) {
								
								case 37:
								case 32:
								
									if (settings.usePopupNav) {
										
										_popup.trigger('poptrox_previous');
										return false;
									
									}
									
									break;

								case 39:
									
									if (settings.usePopupNav) {
										
										_popup.trigger('poptrox_next');
										return false;
									
									}
									
									break;

								case 27:
									
									_popup.trigger('poptrox_close');
									return false;

									break;
							
							}
						
						}
					
					});
				
				_top.find(settings.selector).each(function(index) {
					
					var x, tmp, a = $(this), i = a.find('img'), data = a.data('poptrox');

					x = {

						src:			a.attr('href'),
						captionText:	i.attr('title'),
						width:			a.attr('width'),
						height:			a.attr('height'),
						type:			null,
						object:			null

					};

					// If a data attribute exists, use it
						if (data) {
							
							var k, b = data.split(',');
							
							for (k in b) {
								
								tmp = b[k].match(/([0-9]+)x([0-9]+)/);
								
								// Size
									if (tmp && tmp.length == 3) {
										
										x.width = tmp[1];
										x.height = tmp[2];
									
									}
								// Type
									else
										x.type = b[k];
						
							}
						
						}
						
					// No type? Attempt to guess it based on the href's domain
						if (!x.type) {
							
							tmp = x.src.match(/http[s]?:\/\/([a-z0-9\.]+)\/.*/);

							if (!tmp || tmp.length < 3)
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

								default:
									x.type = 'image';
									break;
							
							}
						
						}
					
					// Create object (based on type)
						tmp = x.src.match(/http([s]?):\/\/[a-z0-9\.]+\/(.*)/);

						if (tmp)
							x.prefix = 'http' + (tmp[1] == 's' ? 's' : '');

						switch (x.type) {
							
							case 'ignore':
								break;
						
							case 'iframe':
								x.object = $('<iframe src="" frameborder="0"></iframe>');
								x.object
									.on('click', function(e) { e.stopPropagation(); })
									.css('cursor', 'auto');
								
								break;
								
							case 'ajax':
								x.object = $('<div class="poptrox-ajax"></div>');
								x.object
									.on('click', function(e) { e.stopPropagation(); })
									.css('cursor', 'auto')
									.css('overflow', 'auto');
								
								break;
						
							case 'soundcloud':
								x.object = $('<iframe scrolling="no" frameborder="no" src=""></iframe>');
								x.src = x.prefix + '://w.soundcloud.com/player/?url=' + escape(x.src);
								x.width = '600';
								x.height = "166";
								
								break;

							case 'youtube':
								x.object = $('<iframe src="" frameborder="0" allowfullscreen="1"></iframe>');
								x.src = x.prefix + '://www.youtube.com/embed/' + tmp[2];
								
								break;

							case 'vimeo':
								x.object = $('<iframe src="" frameborder="0" allowFullScreen="1"></iframe>');
								x.src = x.prefix + '://player.vimeo.com/video/' + tmp[2];
								
								break;

							default:
								x.object = $('<img src="" alt="" />');
								
								if (settings.preload) {
									
									var tmp = document.createElement('img');
									tmp.src = x.src; cache.push(tmp);
								
								}
								
								break;
						
						}

					queue.push(x);
					
					i.attr('title', '');
					
					if (x.type != 'ignore')
						a
							.attr('href', '')
							.css('outline', 0)
							.on('click', function(e) {

								e.preventDefault();
								e.stopPropagation();

								_popup.trigger('poptrox_open', [index]);

							});

				});
				
			return $(this);
		
		};

})(jQuery);