/* jquery.dropotron.js v1.4.2 | (c) n33 | n33.co | MIT licensed */

(function($) {

	// Disables selection
		$.fn.disableSelection_dropotron = function() { return $(this).css('user-select', 'none').css('-khtml-user-select', 'none').css('-moz-user-select', 'none').css('-o-user-select', 'none').css('-webkit-user-select', 'none'); }

	// Dropotron prototype method
		$.fn.dropotron = function(options) {

			if (this.length > 1)
				for (var i=0; i < this.length; i++)
					$(this[i]).dropotron(options);

			return $.dropotron($.extend({ selectorParent: $(this) }, options));

		}

	// Dropotron method
		$.dropotron = function(options) {

			// Settings
				var settings = $.extend({

					selectorParent:		null,		// Parent jQuery object
					baseZIndex:			1000,		// Base Z-Index
					menuClass:			'dropotron',// Menu class (assigned to every <ul>)
					expandMode:			'hover',	// Expansion mode ("hover" or "click")
					hoverDelay:			150,		// Hover delay (in ms)
					hideDelay:			250,		// Hide delay (in ms; 0 disables)
					openerClass:		'opener',	// Opener class
					openerActiveClass:	'active',	// Active opener class
					submenuClassPrefix:	'level-',	// Submenu class prefix
					mode:				'fade',		// Menu mode ("instant", "fade", "slide", "zoom")
					speed:				'fast',		// Menu speed ("fast", "slow", or ms)
					easing:				'swing',	// Easing mode ("swing", "linear")
					alignment:			'left',		// Alignment ("left", "center", "right")
					offsetX:			0,			// Submenu offset X
					offsetY:			0,			// Submenu offset Y
					globalOffsetY:		0,			// Global offset Y
					IEOffsetX:			0,			// IE Offset X
					IEOffsetY:			0,			// IE Offset Y
					noOpenerFade:		true,		// If true and mode = "fade", prevents top-level opener fade.
					detach:				true,		// Detach second level menus (prevents parent style bleed).
					cloneOnDetach:		true		// If true and detach = true, leave original menu intact.

				}, options);

			// Vars
				var	_top = settings.selectorParent,
					_menus = _top.find('ul'),
					_body = $('body'),
					_window = $(window);
				
				var	isLocked = false,
					hoverTimeoutId = null,
					hideTimeoutId = null;

			// Main
			
				// Top
					_top
						.on('doCollapseAll', function() {
							_menus.trigger('doCollapse');
						});

				// Top level menus
					_menus.each(function() {

						var menu = $(this), opener = menu.parent();

						// If a hideDelay is set, set up the event
							if (settings.hideDelay > 0)
								menu.add(opener)
									.on('mouseleave', function(e) {
										window.clearTimeout(hideTimeoutId);
										hideTimeoutId = window.setTimeout(function() {
											menu.trigger('doCollapse');
										}, settings.hideDelay);
									});

						// Menu
							menu
								.disableSelection_dropotron()
								.hide()
								.addClass(settings.menuClass)
								.css('position', 'absolute')
								.on('mouseenter', function(e) {
									window.clearTimeout(hideTimeoutId);
								})
								.on('doExpand', function() {
									
									// Already visible? Bail out.
										if (menu.is(':visible'))
											return false;

									// Reset our "hide" timeout
										window.clearTimeout(hideTimeoutId);
									
									// Collapse everything but this menu
										_menus.each(function() {

											var t = $(this);

											if (!$.contains(t.get(0), opener.get(0)))
												t.trigger('doCollapse');
										
										});

									// Vars
										var	oo = opener.offset(),
											op = opener.position(),
											opp = opener.parent().position(),
											ow = opener.outerWidth(),
											mw = menu.outerWidth(),
											isTL = (menu.css('z-index') == settings.baseZIndex);
										
										var x, c, left, top;

									// If this is a top level menu ...
										if (isTL) {
											
											// If detach is enabled, use .position()
												if (!settings.detach)
													x = op;
											// Otherwise, use .offset()
												else
													x = oo;
										
											top = x.top + opener.outerHeight() + settings.globalOffsetY;
											c = settings.alignment;
											
											// Remove alignment classes
												menu
													.removeClass('left')
													.removeClass('right')
													.removeClass('center');

											// Figure out alignment and position
												switch (settings.alignment) {
													
													case 'right':
														left = x.left - mw + ow;
														
														if (left < 0) {

															left = x.left;
															c = 'left';

														}
															
														break;
														
													case 'center':
														left = x.left - Math.floor((mw - ow) / 2);

														if (left < 0) {

															left = x.left;
															c = 'left';

														}
														else if (left + mw > _window.width()) {
															
															left = x.left - mw + ow;
															c = 'right';
														
														}
															
														break;

													case 'left':
													default:
														left = x.left;
														
														if (left + mw > _window.width()) {
															
															left = x.left - mw + ow;
															c = 'right';
														
														}

														break;
												
												}
											
											// Add alignment class
												menu.addClass(c);
										
										}

									// Otherwise, we're dealing with a submenu
										else {
										
											// If the opener position isn't static ...
												if (opener.css('position') == 'relative'
												||	opener.css('position') == 'absolute') {
													
													top = settings.offsetY;
													left = (-1 * op.left);
												
												}
												else {
													
													top = op.top + settings.offsetY;
													left = 0;
												
												}

											// Figure out position (based on alignment)
												switch (settings.alignment) {
													
													case 'right':
														left += (-1 * opener.parent().outerWidth()) + settings.offsetX;
														
														break;
													
													case 'center':
													case 'left':
													default:
														left += opener.parent().outerWidth() + settings.offsetX;

														break;
												
												}
										
										}

									// Legacy IE? Apply IE-specific offsets
										if (navigator.userAgent.match(/MSIE ([0-9]+)\./) && RegExp.$1 < 8) {
											
											left += settings.IEOffsetX;
											top += settings.IEOffsetY;
										
										}

									// Position and show the menu
										menu
											.css('left', left + 'px')
											.css('top', top + 'px');

										menu.css('opacity', '0.01').show();
									
									// Kludge!
										var tmp = false;
										
										// Non-static position fix
											if (opener.css('position') == 'relative'
											||	opener.css('position') == 'absolute')
												left = (-1 * op.left);
											else
												left = 0;
										
										if (menu.offset().left < 0) {
											
											left += opener.parent().outerWidth() - settings.offsetX;
											tmp = true;
										
										}
										else if (menu.offset().left + mw > _window.width()) {
											
											left += (-1 * opener.parent().outerWidth()) - settings.offsetX;
											tmp = true;
										
										}

										if (tmp)
											menu.css('left', left + 'px');

										menu.hide().css('opacity', '1');
									
									// Figure out animation mode
										switch (settings.mode) {
											
											case 'zoom':

												isLocked = true;

												opener.addClass(settings.openerActiveClass);
												menu.animate({
													width: 'toggle',
													height: 'toggle'
												}, settings.speed, settings.easing, function() {
													isLocked = false;
												});

												break;
										
											case 'slide':

												isLocked = true;

												opener.addClass(settings.openerActiveClass);
												menu.animate({ height: 'toggle' }, settings.speed, settings.easing, function() {
													isLocked = false;
												});

												break;
										
											case 'fade':

												isLocked = true;
												
												if (isTL && !settings.noOpenerFade) {
													
													var tmp;

													if (settings.speed == 'slow')
														tmp = 80;
													else if (settings.speed == 'fast')
														tmp = 40;
													else
														tmp = Math.floor(settings.speed / 2);
													
													opener.fadeTo(tmp, 0.01, function() {
														opener.addClass(settings.openerActiveClass);
														opener.fadeTo(settings.speed, 1);
														menu.fadeIn(settings.speed, function() {
															isLocked = false;
														});
													});

												}
												else {

													opener.addClass(settings.openerActiveClass);
													opener.fadeTo(settings.speed, 1);
													menu.fadeIn(settings.speed, function() {
														isLocked = false;
													});

												}

												break;
											
											case 'instant':
											default:

												opener.addClass(settings.openerActiveClass);
												menu.show();

												break;
										
										}

									return false;
								})
								.on('doCollapse', function() {
									
									// Not visible? Bail out.
										if (!menu.is(':visible'))
											return false;

									// Collapse the menu
										menu.hide();
										opener.removeClass(settings.openerActiveClass);
										menu.find('.' + settings.openerActiveClass).removeClass(settings.openerActiveClass);
										menu.find('ul').hide();
									
									return false;

								})
								.on('doToggle', function(e) {
								
									if (menu.is(':visible'))
										menu.trigger('doCollapse');
									else
										menu.trigger('doExpand');
								
									return false;

								});
						
						// Menu's opener
							opener
								.disableSelection_dropotron()
								.addClass('opener')
								.css('cursor', 'pointer')
								.on('click', function(e) {
								
									// Locked? Bail.
										if (isLocked)
											return;
									
									// Toggle menu
										e.preventDefault();
										e.stopPropagation();
										menu.trigger('doToggle');
										
								});

						// If expandMode is "hover", set up the event
							if (settings.expandMode == 'hover')
								opener.hover(function(e) {

									if (isLocked)	
										return;

									hoverTimeoutId = window.setTimeout(function() {
										menu.trigger('doExpand');
									}, settings.hoverDelay);

								},
								function (e) {
								
									window.clearTimeout(hoverTimeoutId);
								
								});

					});

				// All links
					_menus.find('a')
						.css('display', 'block')
						.on('click', function(e) {

							// Locked? Bail.
								if (isLocked)
									return;
							
							// No href? Prevent default.
								if ($(this).attr('href').length < 1)
									e.preventDefault();

						});
					
				// All list items
					_top.find('li')
						.css('white-space', 'nowrap')
						.each(function() {

							var t = $(this), a = t.children('a'), ul = t.children('ul');
							
							// If the link's href is blank (""), prevent it from doing anything
								a.on('click', function(e) {

									if ($(this).attr('href').length < 1)
										e.preventDefault();
									else
										e.stopPropagation();

								});
							
							// If there is a link but no unordered list ...
								if (a.length > 0 && ul.length == 0)
									t.on('click', function(e) {

										if (isLocked)
											return;
											
										_top.trigger('doCollapseAll');

										e.stopPropagation();

									});

						});

				// Top level list items
					_top.children('li').each(function() {

						var opener = $(this), menu = opener.children('ul'), c;

						if (menu.length > 0) {
							
							// If we're using detach ...
								if (settings.detach) {
									
									// If we're cloning on detach ...
										if (settings.cloneOnDetach) {
											
											// Make a copy of the menu
												c = menu.clone();
											
											// Leave it behind
												c
													.attr('class', '')
													.hide()
													.appendTo(menu.parent());
										
										}
								
									// Detach the menu and move it to the end of the <body> element
										menu
											.detach()
											.appendTo(_body);
								
								}

							// Step through menus, assigning z-indexes and submenu class prefixes as necessary
								for(var z = settings.baseZIndex, i = 1, y = menu; y.length > 0; i++) {
									
									y.css('z-index', z++);
									
									if (settings.submenuClassPrefix)
										y.addClass(settings.submenuClassPrefix + (z - 1 - settings.baseZIndex));
									
									y = y.find('> li > ul');
								
								}
						
						}

					});
				
				// Body
					_window
						.on('scroll', function() {
							_top.trigger('doCollapseAll');
						})
						.on('keypress', function(e) {

							// Collapse all menus if the user hits escape
								if (!isLocked && e.keyCode == 27) {

									e.preventDefault();
									_top.trigger('doCollapseAll');

								}

						});
				
				// Body
					_body
						.on('click', function() {

							if (!isLocked)
								_top.trigger('doCollapseAll');

						});

		};

})(jQuery);