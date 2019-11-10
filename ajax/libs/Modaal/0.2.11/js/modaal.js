/*!
	Modaal - accessible modals - v0.2.11
	by Humaan, for all humans.
	http://humaan.com
 */
/**
	Modaal jQuery Plugin : Accessible Modals

	==== General Options ===
	type (string) 					: ajax, inline, image, iframe, confirm. Defaults to 'inline'
	animation (string) 				: Fade, expand, down, up. Defaults to 'fade'
	after_callback_delay (integer)	: Specify a delay value for the after open callbacks. This is necessary because with the bundled animations
										have a set duration in the bundled CSS. Specify a delay of the same amount as the animation duration in so
										more accurately fire the after open/close callbacks. Defaults 350, does not apply if animation is 'none',
										after open callbacks are dispatched immediately

	is_locked (boolean)				: Set this to true to disable closing the modal via keypress or clicking the background. Beware that if
										type != 'confirm' there will be no interface to dismiss the modal if is_locked = true, you'd have to
										programmatically arrange to dismiss the modal. Confirm modals are always locked regardless of this option
										Defaults to false

	hide_close (boolean)			: Set this to true to hide the close modal button. Key press and overlay click will still close the modal.
										This method is best used when you want to put a custom close button inside the modal container space.

	background (string)				: Background overlay style. Defaults to '#000'
	overlay_opacity (float) 		: Background overlay transparency. Defaults to 0.8
	overlay_close (boolean)			: Set this to false if you want to disable click to close on overlay background.

	accessible_title (string)		: Accessible title. Default 'Dialog Window'
	start_open (boolean)			: Set this to true to launch the Modaal window immediately on page open
	fullscreen (boolean)			: Set this to true to make the modaal fill the entire screen, false will default to own width/height attributes.
	custom_class (string)			: Fill in this string with a custom class that will be applied to the outer most modal wrapper.

	width (integer)					: Desired width of the modal. Required for iframe type. Defaults to undefined //TODO
	height (integer)				: Desired height of the modal. Required for iframe type. Defaults to undefined //TODO


	=== Events ===
	before_open (function) 			: Callback function executed before modal is opened
	after_open (function)			: Callback function executed after modal is opened
	before_close (function)			: Callback function executed before modal is closed
	after_close (function)			: Callback function executed after modal is closed
	source (function(element, src))	: Callback function executed on the default source, it is intended to transform the
										source (href in an AJAX modal or iframe). The function passes in the triggering element
										as well as the default source depending of the modal type. The default output of the
										function is an untransformed default source.


	=== Confirm Options & Events ===
	confirm_button_text (string)	: Text on the confirm button. Defaults to 'Confirm'
	confirm_cancel_button_text (string) : Text on the confirm modal cancel button. Defaults to 'Cancel'
	confirm_title (string)			: Title for confirm modal. Default 'Confirm Title'
	confirm_content (string)		: HTML content for confirm message
	confirm_callback (function)		: Callback function for when the confirm button is pressed as opposed to cancel


	=== Gallery Options & Events ===
	gallery_active_class (string)	: Active class applied to the currently active image or image slide in a gallery 'gallery_active_item'
	before_image_change (function)	: Callback function executed before the image slide changes in a gallery modal. Default function( current_item, incoming_item )
	after_image_change (function)	: Callback function executed after the image slide changes in a gallery modal. Default function ( current_item )


	=== AJAX Options & Events ===
	loading_content (string)		: HTML content for loading message. Default 'Loading &hellip;'
	loading_class (string)			: Class name to be applied while content is loaded via AJAX. Default 'is_loading'
	ajax_error_class (string)		: Class name to be applied when content has failed to load. Default is 'modaal-error'
	ajax_success (function)		 	: Callback for when AJAX content is loaded in


	=== SOCIAL CONTENT ===
	instagram_id (string)			: Unique photo ID for an Instagram photo.

*/
( function( $ ) {

	var dom = $('body');
	var modaal_close = '<button type="button" class="modaal-close" id="modaal-close" aria-label="Close (Press escape to close)"><span>Close</span></button>';
	var modaal_loading_spinner = '<div class="modaal-loading-spinner"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>'

	var Modaal = {
		init : function(options, elem) {
			var self = this;

			self.$elem = $(elem);
			self.options = $.extend({}, $.fn.modaal.options, self.$elem.data(), options);
			self.xhr = null;

			// set up the scope
			self.scope = {
				is_open: false,
				id: 'modaal_' + ( new Date().getTime() ) + ( Math.random().toString(16).substring(2) )
			};

			// add scope attribute to trigger element
			self.$elem.attr('data-modaal-scope', self.scope.id);

			// private options
			self.private_options = {
				active_class: 'is_active'
			};

			self.lastFocus = null;

			// if is_locked
			if ( self.options.is_locked || self.options.type == 'confirm' || self.options.hide_close ) {
				self.scope.close_btn = '';
			} else {
				self.scope.close_btn = modaal_close;
			}

			// reset animation_speed
			if (self.options.animation === 'none' ){
				self.options.animation_speed = 0;
				self.options.after_callback_delay = 0;
			}

			// On click to open modal
			$(elem).on('click.Modaal', function(e) {
				e.preventDefault();

				var source;

				// Save last active state before modal
				self.lastFocus = document.activeElement;

				// CB: before_open
				self.options.before_open.call(self, e);

				switch (self.options.type) {
					case 'inline':
						self.create_basic();
						break;

					case 'ajax':
						source = self.options.source( self.$elem, self.$elem.attr('href') );
						self.fetch_ajax( source );
						break;

					case 'confirm':
						self.options.is_locked = true;
						self.create_confirm();
						break;

					case 'image':
						self.create_image();
						break;

					case 'iframe':
						source = self.options.source( self.$elem, self.$elem.attr('href') );
						self.create_iframe( source );
						break;

					case 'video':
						self.create_video(self.$elem.attr('href'));
						break;

					case 'instagram':
						self.create_instagram();
						break;
				}

				// call events to be watched (click, tab, keyup, keydown etc.)
				self.watch_events();

			});


			// Check for start_open
			if (self.options.start_open === true ){
				$(elem).click();
			}
		},

		// Watching Modal
		// ----------------------------------------------------------------
		watch_events : function() {
			var self = this;

			dom.off('click.Modaal keyup.Modaal keydown.Modaal');

			// Body keydown
			dom.on('keydown.Modaal', function(e) {
				var key = e.keyCode;
				var target = e.target;

				// look for tab change and reset focus to modal window
				// done in keydown so the check fires repeatedly when you hold the tab key down
				if (key == 9 && self.scope.is_open) {
					if (!$.contains(document.getElementById(self.scope.id), target) ) {
						$('#' + self.scope.id).find('*[tabindex="0"]').focus();
					}
				}
			});

			// Body keyup
			dom.on('keyup.Modaal', function(e) {
				var key = e.keyCode;
				var target = e.target;

				if ( !self.options.is_locked ){
					// On escape key press close modal
					if (key == 27 && self.scope.is_open ) {
						if ( $(document.activeElement).is('input') ) {
							return false;
						}

						self.modaal_close();
						return;
					}
				}

				// is gallery open and images length is > 1
				if ( self.options.type == 'image' ) {
					// arrow left for back
					if (key == 37 && self.scope.is_open && (!$('#' + self.scope.id + ' .modaal-gallery-prev').hasClass('is_hidden')) ) {
						self.gallery_update('prev');
					}
					// arrow right for next
					if (key == 39 && self.scope.is_open && (!$('#' + self.scope.id + ' .modaal-gallery-next').hasClass('is_hidden')) ) {
						self.gallery_update('next');
					}
					return;
				}
			});

			// Body click
			dom.on('click.Modaal', function(e) {
				var trigger = $(e.target);

				// General Controls: If it's not locked allow greedy close
				if ( !self.options.is_locked ){
					if ( (self.options.overlay_close && trigger.is('.modaal-inner-wrapper')) || trigger.is('.modaal-close') ) {
						self.modaal_close();
						return;
					}
				}

				//Confirm Controls
				if ( trigger.is('.modaal-confirm-btn' ) ){
					// if 'OK' button is clicked, run confirm_callback()
					if ( trigger.is('.modaal-ok') ) {
						self.options.confirm_callback.call(self, self.lastFocus);
					}
					self.modaal_close();
					return;
				}

				// Gallery Controls
				if ( trigger.is( '.modaal-gallery-control' ) ){
					// it not active, don't do nuthin!
					if ( trigger.hasClass('is_hidden') ) {
						return;
					}

					// trigger previous
					if ( trigger.is('.modaal-gallery-prev') ) {
						self.gallery_update('prev');
					}
					// trigger next
					if ( trigger.is('.modaal-gallery-next') ) {
						self.gallery_update('next');
					}
					return;
				}
			});
		},

		// Append markup into DOM
		build_modal : function(content) {
			var self = this;

			// if is instagram
			var igClass = '';
			if ( self.options.type == 'instagram' ) {
				igClass = ' modaal-instagram';
			}

			var wrap_class = (self.options.type == 'video') ? 'modaal-video-wrap' : 'modaal-content';

			/*
				modaal-start_none : fully hidden via display:none;
				modaal-start_fade : hidden via opacity:0
				modaal-start_slidedown : ...

			*/
			var animation_class;
			switch ( self.options.animation ) {
				case 'fade' :
					animation_class = ' modaal-start_fade';
					break;
				case 'slide-down' :
					animation_class = ' modaal-start_slidedown';
					break;
				default :
					animation_class = ' modaal-start_none'
			}

			// fullscreen check
			var fullscreen_class = '';
			if ( self.options.fullscreen ) {
				fullscreen_class = ' modaal-fullscreen';
			}

			// custom class check
			if ( self.options.custom_class !== '' || typeof(self.options.custom_class) !== 'undefined' ) {
				self.options.custom_class = ' ' + self.options.custom_class;
			}


			//var build_markup = '<div class="modaal-wrapper modaal-start_fade' + igClass + '" id="' + self.scope.id + '"><div class="modaal-outer-wrapper"><div class="modaal-inner-wrapper">';
			var build_markup = '<div class="modaal-wrapper modaal-' + self.options.type + animation_class + igClass + fullscreen_class + self.options.custom_class + '" id="' + self.scope.id + '"><div class="modaal-outer-wrapper"><div class="modaal-inner-wrapper">';

					// hide if video
					if (self.options.type != 'video') {
						build_markup += '<div class="modaal-container">';
					}

					// add the guts of the content
					build_markup +=	'<div class="' + wrap_class + '" aria-hidden="false" aria-label="' + self.options.accessible_title + ' (Press escape to close)" role="dialog">';

							// If it's inline type, we want to clone content instead of dropping it straight in
							if (self.options.type == 'inline') {
								build_markup += '<div class="modaal-content-container"></div>';
							} else {
								// Drop in the content if it's not inline
								build_markup +=	content;
							}

					// close wrap_class
					build_markup += '</div>' + self.scope.close_btn;

					// hide if video
					if (self.options.type != 'video') {
						build_markup += '</div>';
					}

			// close off modaal-wrapper
			build_markup +=	'</div></div></div>';

			// append ajax modal markup to dom
			dom.append(build_markup);

			// if inline, clone content into space
			if (self.options.type == 'inline') {
				content.appendTo('#' + self.scope.id + ' .modaal-content-container');
			}

			// Trigger overlay show (which triggers modal show)
			self.modaal_overlay('show');
		},

		// Create Basic Inline Modal
		// ----------------------------------------------------------------
		create_basic : function() {
			var self = this;
			// if $elem is a link, then href points to the target, otherwise assume target was passed in initially
			var target = (self.$elem.is('[href]')) ? $(self.$elem.attr('href')) : self.$elem;
			var content = '';

			if (target.length) {
				content = target.children().clone(true,true);
				target.empty();
			} else {
				content = 'Content could not be loaded. Please check the source and try again.';
			}

			// now push content into markup
			self.build_modal(content);
		},

		// Create Instagram Modal
		// ----------------------------------------------------------------
		create_instagram : function() {
			var self = this;
			var id = self.options.instagram_id;
			var content = '';

			var error_msg = 'Instagram photo couldn\'t be loaded, please check the embed code and try again.';

			self.build_modal('<div class="modaal-content-container' + ( self.options.loading_class != '' ? ' ' + self.options.loading_class : '' ) + '">' + self.options.loading_content + '</div>' );

			// ID exists, is not empty null or undefined.
			if ( id != '' && id !== null && id !== undefined ) {
				// set up oembed url
				var ig_url = 'https://api.instagram.com/oembed?url=http://instagr.am/p/' + id + '/';

				$.ajax({
					url: ig_url,
					dataType: "jsonp",
					cache: false,
					success: function (data) {
						// set up the new content
						content = data.html;

						// now set location for new content
						var target = $('#' + self.scope.id + ' .modaal-content-container');
						if ( target.length > 0) {
							// add HTML into target region
							target.removeClass( self.options.loading_class );
							target.html(content);

							// now trigger an instagram refresh
							window.instgrm.Embeds.process();
						}
					},
					error: function() {
						content = error_msg;

						// now set location for new content
						var target = $('#' + self.scope.id + ' .modaal-content-container');
						if ( target.length > 0) {
							target.removeClass( self.options.loading_class ).addClass( self.options.ajax_error_class );
							target.html(content);
						}
					}
				});

			} else {
				content = error_msg;
			}

			return false;
		},

		// Fetch Ajax Data
		// ----------------------------------------------------------------
		fetch_ajax : function(url) {
			var self = this;
			var content = '';

			// If no accessible title, set it to 'Dialog Window'
			if ( self.options.accessible_title == null ) {
				self.options.accessible_title = 'Dialog Window'
			}

			if ( self.xhr !== null ){
				self.xhr.abort();
				self.xhr = null;
			}

			self.build_modal('<div class="modaal-content-container' + ( self.options.loading_class != '' ? ' ' + self.options.loading_class : '' ) + '">' + self.options.loading_content + '</div>' );

			self.xhr = $.ajax(url, {
				success: function(data) {
					// content fetch is successful so push it into markup
					var target = $('#' + self.scope.id).find('.modaal-content-container');
					if ( target.length > 0){
						target.removeClass( self.options.loading_class );
						target.html( data );

						self.options.ajax_success.call(self, target);
					}
				},
				error: function( xhr ) {
					// There were some errors so return an error message
					if ( xhr.statusText == 'abort' ){
						return;
					}

					var target = $('#' + self.scope.id + ' .modaal-content-container');
					if ( target.length > 0){
						target.removeClass( self.options.loading_class ).addClass( self.options.ajax_error_class );
						target.html( 'Content could not be loaded. Please check the source and try again.' );
					}
				}
			});
		},

		// Create Confirm Modal
		// ----------------------------------------------------------------
		create_confirm : function() {
			var self = this;
			var content;

			content = '<div class="modaal-content-container">' +
					'<h1 id="modaal-title">' + self.options.confirm_title + '</h1>' +
					'<div class="modaal-confirm-content">' + self.options.confirm_content + '</div>' +
						'<div class="modaal-confirm-wrap">' +
							'<button type="button" class="modaal-confirm-btn modaal-ok" aria-label="Confirm">' + self.options.confirm_button_text + '</button>' +
							'<button type="button" class="modaal-confirm-btn modaal-cancel" aria-label="Cancel">' + self.options.confirm_cancel_button_text + '</button>' +
						'</div>' +
					'</div>' +
				'</div>';

			// now push content into markup
			self.build_modal(content);
		},

		// Create Image/Gallery Modal
		// ----------------------------------------------------------------
		create_image : function() {
			var self = this;
			var content;

			var modaal_image_markup = '';
			var gallery_total;
			var prev_btn = '<button type="button" class="modaal-gallery-control modaal-gallery-prev" id="modaal-gallery-prev" aria-label="Previous image (use left arrow to change)"><span>Previous Image</span></button>';
			var next_btn = '<button type="button" class="modaal-gallery-control modaal-gallery-next" id="modaal-gallery-next" aria-label="Next image (use right arrow to change)"><span>Next Image</span></button>';

			// If has rel attribute
			if ( self.$elem.is('[rel]') ) {
				// find gallery rel
				var gallery_group = self.$elem.attr('rel');
				var gallery_group_items = $('[rel="' + gallery_group + '"]');

				// remove any previous active attribute to any in the group
				gallery_group_items.removeAttr('data-gallery-active', 'is_active');
				// add active attribute to the item clicked
				self.$elem.attr('data-gallery-active', 'is_active');

				// how many in the rel grouping are there (-1 to connect with each function starting with 0)
				gallery_total = gallery_group_items.length - 1;

				// prepare array for gallery data
				var gallery = [];

				// start preparing markup
				modaal_image_markup = '<div class="modaal-gallery-item-wrap">';

				// loop each grouping item and push it into our gallery array
				gallery_group_items.each(function(i, item) {
					// setup default content
					var img_src = '';
					var img_alt = '';
					var img_description = '';
					var img_active = false;

					var data_modaal_desc = item.getAttribute('data-modaal-desc');
					var data_item_active = item.getAttribute('data-gallery-active');

					// is it an img SRC or link HREF value
					if ( item.href !== '' || item.href !== undefined ) {
						img_src = item.href;
					} else if ( item.src !== '' || item.src !== undefined ) {
						img_src = item.src;
					}

					// Does it have a modaal description
					if ( data_modaal_desc != '' && data_modaal_desc !== null && data_modaal_desc !== undefined ) {
						img_alt = data_modaal_desc;
						img_description = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image ' + (i+1) + ' - </span>' + data_modaal_desc + '</div>'
					} else {
						img_description = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image ' + (i+1) + '</span></div>';
					}

					// is it the active item
					if ( data_item_active ) {
						img_active = true
					}

					// set new object for values we want
					var gallery_item = {
						'url': img_src,
						'alt': img_alt,
						'desc': img_description,
						'active': img_active
					};

					// push object into gallery array
					gallery.push( gallery_item );
				});

				// now loop through all items in the gallery and build up the markup
				for (var i = 0; i < gallery.length; i++) {
					// Set default active class, then check if array item active is true and update string for class
					var is_active = '';

					if ( gallery[i].active ) {
						is_active = ' ' + self.private_options.active_class;
					}

					// for each item build up the markup
					modaal_image_markup += '<div class="modaal-gallery-item gallery-item-' + i + is_active + '">' +
						'<img src="' + gallery[i].url + '" alt=" ">' +
						gallery[i].desc +
					'</div>';
				}

				// close off the markup for the gallery and add next/previous buttons
				modaal_image_markup += '</div>' + prev_btn + next_btn;
			} else {
				// This is only a single gallery item so let's grab the necessary values

				// Setup selected image
				var this_img_src = self.$elem.attr('href');
				var this_img_alt_txt = '';
				var this_img_alt = '';

				if ( self.$elem.attr('data-modaal-desc') ) {
					this_img_alt_txt = self.$elem.attr('data-modaal-desc');
					this_img_alt = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image - </span>' + this_img_alt_txt + '</div>';
				}

				// build up the html
				modaal_image_markup = '<div class="modaal-gallery-item is_active">' +
					'<img src="' + this_img_src + '" alt="' + this_img_alt_txt + '">' +
					this_img_alt +
				'</div>';
			}

			// Update content variable
			content = modaal_image_markup;

			// now push content into markup
			self.build_modal(content);

			// setup next & prev buttons
			if ( $('.modaal-gallery-item.is_active').is('.gallery-item-0') ) {
				$('.modaal-gallery-prev').hide();
			}
			if ( $('.modaal-gallery-item.is_active').is('.gallery-item-' + gallery_total) ) {
				$('.modaal-gallery-next').hide();
			}
		},

		// Gallery Change Image
		// ----------------------------------------------------------------
		gallery_update : function(direction) {
			var self = this;
			var this_gallery = $('#' + self.scope.id);
			var this_gallery_item = this_gallery.find('.modaal-gallery-item');
			var this_gallery_total = this_gallery_item.length - 1;

			// if single item, don't proceed
			if ( this_gallery_total == 0 ) {
				return false;
			}

			var prev_btn = this_gallery.find('.modaal-gallery-prev'),
				next_btn = this_gallery.find('.modaal-gallery-next');

			var duration = 250;

			var new_img_w = 0,
				new_img_h = 0;

			// CB: Before image change
			var current_item = this_gallery.find( '.modaal-gallery-item.' + self.private_options.active_class ),
				incoming_item = ( direction == 'next' ? current_item.next( '.modaal-gallery-item' ) : current_item.prev( '.modaal-gallery-item' ) );
			self.options.before_image_change.call(self, current_item, incoming_item);

			// stop change if at start of end
			if ( direction == 'prev' && this_gallery.find('.gallery-item-0').hasClass('is_active') ) {
				return false;
			} else if ( direction == 'next' && this_gallery.find('.gallery-item-' + this_gallery_total).hasClass('is_active') ) {
				return false;
			}


			// lock dimensions
			current_item.stop().animate({
				opacity: 0
			}, duration, function(){
				// Move to appropriate image
				incoming_item.addClass('is_next').css({
					'position': 'absolute',
					'display': 'block',
					'opacity': 0
				});

				// start toggle to 'is_next'
				new_img_w = this_gallery.find('.modaal-gallery-item.is_next').width();
				new_img_h = this_gallery.find('.modaal-gallery-item.is_next').height();

				// resize gallery region
				this_gallery.find('.modaal-gallery-item-wrap').stop().animate({
					'width': new_img_w,
					'height': new_img_h
				}, duration, function() {
					// hide old active image
					current_item.removeClass(self.private_options.active_class + ' ' + self.options.gallery_active_class).removeAttr('style');

					// show new image
					incoming_item.addClass(self.private_options.active_class + ' ' + self.options.gallery_active_class).removeClass('is_next').css('position','');

					// animate in new image (now has the normal is_active class
					incoming_item.stop().animate({
						opacity: 1
					}, duration, function(){
						$(this).removeAttr('style');

						// remove dimension lock
						this_gallery.find('.modaal-gallery-item-wrap').removeAttr('style');

						// CB: After image change
						self.options.after_image_change.call( self, incoming_item );
					});

					// Focus on the new gallery item
					this_gallery.find('.modaal-gallery-item .modaal-gallery-label').removeAttr('tabindex');
					this_gallery.find('.modaal-gallery-item.' + self.private_options.active_class + ' .modaal-gallery-label').attr('tabindex', '0').focus();

					// hide/show next/prev
					if ( this_gallery.find('.modaal-gallery-item.' + self.private_options.active_class).is('.gallery-item-0') ) {
						prev_btn.stop().animate({
							opacity: 0
						}, 150, function(){
							$(this).hide();
						});
					} else {
						prev_btn.stop().css({
							'display': 'block',
							'opacity': prev_btn.css('opacity')
						}).animate({
							opacity: 1
						}, 150);
					}
					if ( this_gallery.find('.modaal-gallery-item.' + self.private_options.active_class).is('.gallery-item-' + this_gallery_total) ) {
						next_btn.stop().animate({
							opacity: 0
						}, 150, function(){
							$(this).hide();
						});
					} else {
						next_btn.stop().css({
							'display': 'block',
							'opacity': prev_btn.css('opacity')
						}).animate({
							opacity: 1
						}, 150);
					}
				});
			});
		},

		// Create Video Modal
		// ----------------------------------------------------------------
		create_video : function(url) {
			var self = this;
			var content;

			// video markup
			content = '<iframe src="' + url + '" class="modaal-video-frame" frameborder="0" allowfullscreen></iframe>';

			// now push content into markup
			self.build_modal('<div class="modaal-video-container">' + content + '</div>');
		},

		// Create iFrame Modal
		// ----------------------------------------------------------------
		create_iframe : function(url) {
			var self = this;
			var content;

			if ( self.options.width !== null || self.options.width !== undefined || self.options.height !== null || self.options.height !== undefined ) {
				// video markup
				content = '<div class="modaal-content" aria-hidden="false" aria-labelledby="' + self.options.accessible_title + '" role="dialog">' +
					'<iframe src="' + url + '" class="modaal-iframe-elem" style="width: ' + self.options.width + 'px;height: ' + self.options.height + 'px" frameborder="0" allowfullscreen></iframe>' +
				'</div>';
			} else {
				content = '<div class="modaal-content-container">Please specify a width and height for your iframe</div>';
			}

			// now push content into markup
			self.build_modal(content);
		},

		// Open Modaal
		// ----------------------------------------------------------------
		modaal_open : function() {
			var self = this;
			var modal_wrapper = $( '#' + self.scope.id );
			var animation_type = self.options.animation;

			if (animation_type === 'none' ){
				modal_wrapper.removeClass('modaal-start_none');
				self.options.after_open.call(self, modal_wrapper);
			}

			// Open with fade
			if (animation_type === 'fade') {
				modal_wrapper.removeClass('modaal-start_fade');
			}

			// Open with slide down
			if (animation_type === 'slide-down') {
				modal_wrapper.removeClass('modaal-start_slide_down');
			}

			// set default focusTarget (used for tabindex)
			var focusTarget = modal_wrapper;

			// Switch focusTarget tabindex (switch from other modal if exists)
			$('.modaal-wrapper *[tabindex=0]').removeAttr('tabindex');

			if ( self.options.type == 'image' ) {
				focusTarget = $('#' + self.scope.id).find('.modaal-gallery-item.' + self.private_options.active_class);
			} else if ( modal_wrapper.find('.modaal-iframe-elem').length ) {
				focusTarget = modal_wrapper.find('.modaal-iframe-elem');

			} else if ( modal_wrapper.find('.modaal-video-wrap').length ) {
				focusTarget = modal_wrapper.find('.modaal-video-wrap');

			} else if ( modal_wrapper.find('.modaal-content-container').length ) {
				focusTarget = modal_wrapper.find('.modaal-content-container');

			} else if ( modal_wrapper.find('.modaal-content').length ) {
				focusTarget = modal_wrapper.find('.modaal-content');
			}

			// now set the focus
			focusTarget.attr('tabindex', '0').focus();

			// Run after_open
			if (animation_type !== 'none') {
				// CB: after_open
				setTimeout(function() {
					self.options.after_open.call(self, modal_wrapper)
				}, self.options.after_callback_delay);
			}
		},

		// Close Modal
		// ----------------------------------------------------------------
		modaal_close : function() {
			var self = this;
			var modal_wrapper = $( '#' + self.scope.id );

			// CB: before_close
			self.options.before_close.call(self, modal_wrapper);

			if (self.xhr !== null){
				self.xhr.abort();
				self.xhr = null;
			}

			// Now we close the modal
			if (self.options.animation === 'none' ){
				modal_wrapper.addClass('modaal-start_none');
			}

			// Close with fade
			if (self.options.animation === 'fade') {
				modal_wrapper.addClass('modaal-start_fade');
			}

			// Close with slide up (using initial slide down)
			if (self.options.animation === 'slide-down') {
				modal_wrapper.addClass('modaal-start_slide_down');
			}

			// CB: after_close and remove
			setTimeout(function() {
				// clone inline content back to origin place
				if (self.options.type == 'inline') {
					$('#' + self.scope.id + ' .modaal-content-container').children().clone(true,true).appendTo( self.$elem.attr('href') )
				}
				// remove markup from dom
				modal_wrapper.remove();
				// CB: after_close
				self.options.after_close.call(self);
				// scope is now closed
				self.scope.is_open = false;

			}, self.options.after_callback_delay);

			// Call overlay hide
			self.modaal_overlay('hide');

			// Roll back to last focus state before modal open. If was closed programmatically, this might not be set
			if (self.lastFocus != null) {
				self.lastFocus.focus();
			}
		},

		// Overlay control (accepts action for show or hide)
		// ----------------------------------------------------------------
		modaal_overlay : function(action) {
			var self = this;

			if (action == 'show') {
				// Modal is open so update scope
				self.scope.is_open = true;

				// set body to overflow hidden if background_scroll is false
				if (! self.options.background_scroll) {
					dom.css({
						'overflow': 'hidden'
					});
				}

				// append modaal overlay
				dom.append('<div class="modaal-overlay" id="' + self.scope.id + '_overlay"></div>');

				// now show
				$('#' + self.scope.id + '_overlay').css('background', self.options.background).stop().animate({
					opacity: self.options.overlay_opacity
				}, self.options.animation_speed, function(){
					// now open the modal
					self.modaal_open();
				});

			} else if (action == 'hide') {
				// remove body overflow lock
				dom.css('overflow', '');

				// now hide the overlay
				$('#' + self.scope.id + '_overlay').stop().animate({
					opacity: 0
				}, self.options.animation_speed, function(){
					// remove overlay from dom
					$(this).remove();
				});
			}
		}
	};

	// on page load check if single '.modaal' exists
	$(function(){
		var single_modaal = $('.modaal');

		if ( single_modaal.length ) {
			single_modaal.each(function() {
				var self = $(this);

				// new empty options
				var options = {};
				var inline_options = false;

				// option: type
				if ( self.attr('data-modaal-type') ) {
					inline_options = true;
					options.type = self.attr('data-modaal-type');
				}

				// option: animation
				if ( self.attr('data-modaal-animation') ) {
					inline_options = true;
					options.animation = self.attr('data-modaal-animation');
				}

				// option: animation_speed
				if ( self.attr('data-modaal-animation-speed') ) {
					inline_options = true;
					options.animation_speed = self.attr('data-modaal-animation-speed');
				}

				// option: after_callback_delay
				if ( self.attr('data-modaal-after-callback-delay') ) {
					inline_options = true;
					options.after_callback_delay = self.attr('data-modaal-after-callback-delay');
				}

				// option: after_callback_delay
				if ( self.attr('data-modaal-locked') ) {
					inline_options = true;
					options.is_locked = (self.attr('data-modaal-locked') === 'true' ? true : false);
				}

				// option: hide_close
				if ( self.attr('data-modaal-hide-close') ) {
					inline_options = true;
					options.hide_close = (self.attr('data-modaal-hide-close') === 'true' ? true : false);
				}

				// option: background
				if ( self.attr('data-modaal-background') ) {
					inline_options = true;
					options.background = self.attr('data-modaal-background');
				}

				// option: overlay_opacity
				if ( self.attr('data-modaal-overlay-opacity') ) {
					inline_options = true;
					options.overlay_opacity = self.attr('data-modaal-overlay-opacity');
				}

				// option: overlay_close
				if ( self.attr('data-modaal-overlay-close') ) {
					inline_options = true;
					options.overlay_close = (self.attr('data-modaal-overlay-close') === 'false' ? false : true);
				}

				// option: accessible_title
				if ( self.attr('data-modaal-accessible-title') ) {
					inline_options = true;
					options.accessible_title = self.attr('data-modaal-accessible-title');
				}

				// option: start_open
				if ( self.attr('data-modaal-start-open') ) {
					inline_options = true;
					options.start_open = (self.attr('data-modaal-start-open') === 'true' ? true : false);
				}

				// option: fullscreen
				if ( self.attr('data-modaal-fullscreen') ) {
					inline_options = true;
					options.fullscreen = (self.attr('data-modaal-fullscreen') === 'true' ? true : false);
				}

				// option: custom_class
				if ( self.attr('data-modaal-custom-class') ) {
					inline_options = true;
					options.custom_class = self.attr('data-modaal-custom-class');
				}

				// option: background_scroll
				if ( self.attr('data-modaal-background-scroll') ) {
					inline_options = true;
					options.background_scroll = (self.attr('data-modaal-background-scroll') === 'true' ? true : false);
				}

				// option: width
				if ( self.attr('data-modaal-width') ) {
					inline_options = true;
					options.width = parseInt( self.attr('data-modaal-width') );
				}

				// option: height
				if ( self.attr('data-modaal-height') ) {
					inline_options = true;
					options.height = parseInt( self.attr('data-modaal-height') );
				}

				// option: confirm_button_text
				if ( self.attr('data-modaal-confirm-button-text') ) {
					inline_options = true;
					options.confirm_button_text = self.attr('data-modaal-confirm-button-text');
				}

				// option: confirm_cancel_button_text
				if ( self.attr('data-modaal-confirm-cancel-button-text') ) {
					inline_options = true;
					options.confirm_cancel_button_text = self.attr('data-modaal-confirm-cancel-button-text');
				}

				// option: confirm_title
				if ( self.attr('data-modaal-confirm-title') ) {
					inline_options = true;
					options.confirm_title = self.attr('data-modaal-confirm-title');
				}

				// option: confirm_content
				if ( self.attr('data-modaal-confirm-content') ) {
					inline_options = true;
					options.confirm_content = self.attr('data-modaal-confirm-content');
				}

				// option: gallery_active_class
				if ( self.attr('data-modaal-gallery-active-class') ) {
					inline_options = true;
					options.gallery_active_class = self.attr('data-modaal-gallery-active-class');
				}

				// option: loading_content
				if ( self.attr('data-modaal-loading-content') ) {
					inline_options = true;
					options.loading_content = self.attr('data-modaal-loading-content');
				}

				// option: loading_class
				if ( self.attr('data-modaal-loading-class') ) {
					inline_options = true;
					options.loading_class = self.attr('data-modaal-loading-class');
				}

				// option: ajax_error_class
				if ( self.attr('data-modaal-ajax-error-class') ) {
					inline_options = true;
					options.ajax_error_class = self.attr('data-modaal-ajax-error-class');
				}

				// option: start_open
				if ( self.attr('data-modaal-instagram-id') ) {
					inline_options = true;
					options.instagram_id = self.attr('data-modaal-instagram-id');
				}

				// now set it up for the trigger, but only if inline_options is true
				if ( inline_options ) {
					self.modaal(options);
				}
			});
		}
	});

	$.fn.modaal = function(options) {
		return this.each(function () {
			var existing_modaal = $(this).data('modaal');

			if ( existing_modaal ){
				// Checking for string value, used for methods
				if (typeof(options) == 'string'){
					switch (options) {
						case 'close':
							existing_modaal.modaal_close();
							break;
					}
				}
			} else {
				// Not a string, so let's setup the modal ready to use
				var modaal = Object.create(Modaal);
				modaal.init(options, this);
				$.data(this, "modaal", modaal);
			}
		});
	};

	// Defaults
	// ------------------------------------------------------------
	$.fn.modaal.options = {

		//General
		type : 'inline',
		animation : 'fade',
		animation_speed : 300,
		after_callback_delay : 350,
		is_locked : false,
		hide_close: false,
		background: '#000',
		overlay_opacity: '0.8',
		overlay_close: true,
		accessible_title: 'Dialog Window',
		start_open: false,
		fullscreen: false,
		custom_class: '',
		background_scroll: false, // TODO: this property isn't described in the header

		width: null,
		height: null,

		//Events
		before_open : function(){},
		after_open : function(){},
		before_close : function(){},
		after_close : function(){},
		source : function( element, src ){
			return src;
		},

		//Confirm Modal
		confirm_button_text: 'Confirm', // text on confirm button
		confirm_cancel_button_text: 'Cancel',
		confirm_title: 'Confirm Title', // title for confirm modal
		confirm_content: '<p>This is the default confirm dialog content. Replace me through the options</p>', // html for confirm message
		confirm_callback: function() {},


		//Gallery Modal
		gallery_active_class: 'gallery_active_item',
		before_image_change: function( current_item, incoming_item ) {},
		after_image_change: function( current_item ) {},

		//Ajax Modal
		loading_content : modaal_loading_spinner,
		loading_class : 'is_loading',
		ajax_error_class : 'modaal-error',
		ajax_success : function(){},

		//Instagram
		instagram_id : null

	};

} ( jQuery, window, document ) );
