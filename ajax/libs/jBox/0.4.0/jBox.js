/*
---
description: jBox is a powerful and flexible jQuery plugin, taking care of all your modal windows, tooltips, notices and more.

authors: Stephan Wagner (http://stephanwagner.me)

license: MIT (http://opensource.org/licenses/MIT)

requires: jQuery 3.1.1 (https://code.jquery.com/jquery-3.1.1.min.js)

documentation: http://stephanwagner.me/jBox/documentation

demos: http://stephanwagner.me/jBox/demos
...
*/

function jBox(type, options) {
	
	this.options = {
		
		// jBox ID
		id: null,					// Choose a unique id, otherwise jBox will set one for you (jBoxID1, jBoxID2, ...)
		
		// Dimensions
		width: 'auto',				// Width of content area (e.g. 'auto', 100)
		height: 'auto',				// Height of content area
		minWidth: null,				// Minimum width
		minHeight: null,			// Minimum height
		maxWidth: null,				// Maximum width
		maxHeight: null,			// Minimum height
		
		// Responsive dimensions
		responsiveWidth: true,		// Adjusts the width depending on viewport
		responsiveHeight: true,		// Adjusts the height depending on viewport
		responsiveMinWidth: 60,		// Minimal width to adjust
		responsiveMinHeight: 60,	// Minimal height to adjust
		
		// Attach
		attach: null,				// Attach jBox to elements (if no target element is provided, jBox will use the attached element as target)
		trigger: 'click',			// The event to open or close your jBoxes, use 'click', 'touchclick' or 'mouseenter'
		preventDefault: false,		// Prevent default event when opening jBox (e.g. don't follow the href in a link when clicking on it)
		
		// Content
		title: null,				// Adds a title to your jBox
		content: null,				// You can use a string to set text or HTML as content, or an element selector (e.g. jQuery('#jBox-content')) to append one or several elements (elements appended will get style display: 'block', so hide them with CSS style display: 'none' beforehand)
		getTitle: null,				// Get the title from an attribute when jBox opens, e.g. getTitle: 'data-title'
		getContent: null,			// Get the content from an attribute when jBox opens, e.g. getContent: 'data-content', use 'html' to get the attached elements HTML as content
		isolateScroll: true,		// Isolates scrolling to content container
		
		// AJAX request
		ajax: {						// Setting an url will make an AJAX call when jBox opens
			url: null,				// URL to send the AJAX request to
			data: '',				// Data to send with your AJAX call (e.g. '{id: 82, limit: 10}')
									// Optional you can add any jQuery AJAX option (http://api.jquery.com/jquery.ajax/)
			reload: false,			// Resend the ajax call when jBox opens. Use true to send the ajax call only once for every element or 'strict' to resend every time jBox opens
			getData: 'data-ajax',	// The attribute in the source element where the AJAX will look for the data to send with, e.g. data-ajax="id=82&limit=10"
			getURL: 'data-url',		// The attribute in the source element where the AJAX will look for the ajax url
			setContent: true,		// Automatically set the response as new content when the AJAX call is finished
			spinner: true,			// Hides the current content and adds a spinner while loading, you can pass html content to add your own spinner, e.g. spinner: '<div class="mySpinner"></div>'
			spinnerDelay: 300,		// Milliseconds to wait until spinner appears
			spinnerReposition: true	// Repositions jBox when the spinner is added or removed
		},
		
		// Position
		target: null,				// The target element where jBox will be opened
		position: {
			x: 'center',			// Horizontal Position (Use a number, 'left', 'right' or 'center')
			y: 'center'				// Vertical Position (Use a number, 'top', 'bottom' or 'center')
		},
		outside: null,				// Use 'x', 'y', or 'xy' to move your jBox outside of the target element
		offset: 0,					// Offset to final position, you can set different values for x and y with an object e.g. {x: 15, y: 0}
		
		attributes: {				// Note that attributes can only be 'left' or 'right' when using numbers for position, e.g. {x: 300, y: 20}
			x: 'left',				// Horizontal position, use 'left' or 'right'
			y: 'top'				// Vertical position, use 'top' or 'bottom'
		},
		adjustPosition: true,		// Adjusts the position when there is not enough space (use true, 'flip' or 'move')
		adjustTracker: false,		// By default jBox adjusts the position when opening, to adjust when scrolling or resizing, use 'scroll', 'resize' or true for both events
		adjustDistance: 5,			// How far from the window edge we start adjusting, use an object to set different values: {bottom: 5, top: 50, left: 5, right: 20}		
		fixed: false,				// Your jBox will stay on position when scrolling
		reposition: false,			// Calculates new position when the window-size changes
		repositionOnOpen: true,		// Calculates new position each time jBox opens (rather than only when it opens the first time)
		repositionOnContent: true,	// Calculates new position when the content changes with .setContent() or .setTitle()
		
		// Pointer
		pointer: false,				// Your pointer will always point towards the target element, so the option outside should be 'x' or 'y'
		pointTo: 'target',			// Setting something else than 'target' will add a pointer even if there is no target element set or found (Use 'top', 'bottom', 'left' or 'right')
		
		// Animations
		fade: 180,					// Fade duration in ms, set to 0 or false to disable
		animation: null,			// Animation when opening or closing (use 'pulse', 'zoomIn', 'zoomOut', 'move', 'slide', 'flip', 'tada') (CSS inspired from Daniel Edens Animate.css: http://daneden.me/animate)
		
		// Appearance
		theme: 'Default',			// Set a jBox theme class
		addClass: '',				// Adds classes to the wrapper
		overlay: false,				// Adds an overlay to hide page content when jBox opens (set color and opacity with CSS), the overlay is shared with all your jBoxes, to use a seperate overlay set overlay to 'own'
		zIndex: 10000,				// Use a high zIndex (your overlay will have the lowest zIndex of all your jBoxes (with overlays) minus one)
		
		// Delays
		delayOpen: 0,				// Delay opening in ms (Note that the delay will be ignored if your jBox didn't finish closing)
		delayClose: 0,				// Delay closing in ms (Note that there is always a closing delay of at least 10ms to ensure jBox won't be closed when opening right away)
		
		// Closing events
		closeOnEsc: false,			// Close jBox when pressing [esc] key
		closeOnClick: false,		// Close jBox with mouseclick, use 'true' (click anywhere), 'box' (click on jBox itself), 'overlay' (click on the overlay), 'body' (click anywhere but jBox)
		closeOnMouseleave: false,	// Close jBox when the mouse leaves the jBox area or the area of the attached element
		closeButton: false,			// Adds a close button to your jBox, use 'title', 'overlay', 'box' or true (true will add the button to overlay, title or box, in that order if any of those elements can be found)
		
		// Other options
		createOnInit: false,		// Create jBox when it's being initialized
		blockScroll: false,			// When jBox is open, block scrolling
		appendTo: jQuery('body'), 	// Provide an element if you want the jBox to be positioned inside a specific element (only useful for fixed positions or when position values are numbers)
		draggable: false,			// Make your jBox draggable (use 'true', 'title' or provide an element as handle) (inspired from Chris Coyiers CSS-Tricks http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/)
		dragOver: true,				// When you have multiple draggable jBoxes, the one you select will always move over the other ones
		autoClose: false,			// Time in ms when jBox should close automatically after opening
		cursorDimensions: {			// Set the cursor dimensions, used to calculate the positions for type Mouse
			x: 12,					// These default settings are the width and height of the OSX cursor
			y: 20
		},
		
		// Audio					// You use the integrated audio function whenever you'd like to play an audio file, e.g. onInit: function () { this.audio('url_to_file_without_file_extension', 75); }
		preloadAudio: true,			// Preloads the audio files set in option audio. You also can preload audio files, e.g. ['src_to_file.mp3', 'src_to_file.ogg']
		audio: null,				// The URL to an audio file to play when jBox opens. Set the URL without file extension, jBox will look for an .mp3 and .ogg file. To play audio when jBox closes, use an object, e.g. audio: {open: 'src_to_audio1', close: 'src_to_audio2'}
		volume: 75,					// The volume of the audio in percent. To have different volumes for open and close audio, use an object, e.g. volume: {open: 75, close: 100}
		
		// Events					// Note that you can use 'this' in the event functions, it refers to your jBox object (e.g. onInit: function() { this.open(); })
		onInit: null,				// Fired when jBox is initialized
		onBeforeInit: null,			// Fired when jBox starts initializing, useful to add your own internal functions
		onAttach: null,				// Fired when jBox attached itself to elements
		onPosition: null,			// Fired when jBox is positioned
		onCreated: null,			// Fired when jBox is created and is availible in DOM
		onOpen: null,				// Fired when jBox opens
		onClose: null,				// Fired when jBox closes
		onCloseComplete: null		// Fired when jBox is completely closed (when fading is finished, useful if for example you want to destroy the jBox when it is closed)
	};

	// Default plugin options
	this._pluginOptions = {
		
		// Default options for tooltips
		'Tooltip': {
			getContent: 'title',
			trigger: 'mouseenter',
			position: {x: 'center', y: 'top'},
			outside: 'y',
			pointer: true,
			reposition: true,
			responsiveHeight: false
		},
		
		// Default options for mouse tooltips
		'Mouse': {
			target: 'mouse',
			trigger: 'mouseenter',
			position: {x: 'right', y: 'bottom'},
			outside: 'xy',
			offset: 5
		},
		
		// Default options for modal windows
		'Modal': {
			target: jQuery(window),
			fixed: true,
			blockScroll: true,
			closeOnEsc: true,
			closeOnClick: 'overlay',
			closeButton: 'overlay',
			overlay: true,
			//adjustDistance: {top: 40, right: 5, bottom: 5, left: 5},
			animation: 'zoomIn'
		},
	};
	
	// Merge options
	this.options = jQuery.extend(true, this.options, this._pluginOptions[type] ? this._pluginOptions[type] : jBox._pluginOptions[type], options);
	
	// Set jBox type
	jQuery.type(type) == 'string' && (this.type = type);
	
	// Function to fire events
	this._fireEvent = function(event, pass) {
		this.options['_' + event] && (this.options['_' + event].bind(this))(pass);
		this.options[event] && (this.options[event].bind(this))(pass);
	};
	
	// Fire onBeforeInit event
	this._fireEvent('onBeforeInit');
	
	// Get unique ID
	if (this.options.id === null) {
		this.options.id = 'jBoxID' + jBox._getUniqueID();
	}
	this.id = this.options.id;
	
	// Correct impossible options
	((this.options.position.x == 'center' && this.options.outside == 'x') || (this.options.position.y == 'center' && this.options.outside == 'y')) && (this.options.outside = false);
	(!this.options.outside || this.options.outside == 'xy') && (this.options.pointer = false);
	
	// Correct multiple choice options
	jQuery.type(this.options.offset) != 'object' && (this.options.offset = {x: this.options.offset, y: this.options.offset});
	this.options.offset.x || (this.options.offset.x = 0);
	this.options.offset.y || (this.options.offset.y = 0);
	jQuery.type(this.options.adjustDistance) != 'object' ? (this.options.adjustDistance = {top: this.options.adjustDistance, right: this.options.adjustDistance, bottom: this.options.adjustDistance, left: this.options.adjustDistance}) : (this.options.adjustDistance = jQuery.extend({top: 5, left: 5, right: 5, bottom: 5}, this.options.adjustDistance));
	
	// Save where the jBox is aligned to
	this.align = (this.options.outside && this.options.outside != 'xy') ? this.options.position[this.options.outside] : (this.options.position.y != 'center' && jQuery.type(this.options.position.y) != 'number' ? this.options.position.x : (this.options.position.x != 'center' && jQuery.type(this.options.position.x) != 'number' ? this.options.position.y : this.options.attributes.x));
	
	// Save default outside position
	this.options.outside && this.options.outside != 'xy' && (this.outside = this.options.position[this.options.outside]);
	
	// Internal functions, used to easily get values
	this._getOpp = function(opp) { return {left: 'right', right: 'left', top: 'bottom', bottom: 'top', x: 'y', y: 'x'}[opp]; };
	this._getXY = function(xy) { return {left: 'x', right: 'x', top: 'y', bottom: 'y', center: 'x'}[xy]; };
	this._getTL = function(tl) { return {left: 'left', right: 'left', top: 'top', bottom: 'top', center: 'left', x: 'left', y: 'top'}[tl]; };
	
	// Check for SVG support
	this._supportsSVG = function() {
		return document.createElement('svg').getAttributeNS;
	}
	
	// Create an svg element
	this._createSVG = function(type, options) {
		var svg = document.createElementNS('http://www.w3.org/2000/svg', type);
		jQuery.each(options, function (index, item) {
			svg.setAttribute(item[0], (item[1] || ''));
		});
		return svg;
	};
	
	// Append a svg element to a svg container
	this._appendSVG = function(source, target) {
		return target.appendChild(source);
	};
	
	// Isolate scrolling in a container
	this._isolateScroll = function(el) {
		if(!el || !jQuery(el).length) return;
		el.on('DOMMouseScroll.jBoxIsolatedScroll mousewheel.jBoxIsolatedScroll', function(ev) {
			var delta = ev.wheelDelta || (ev.originalEvent && ev.originalEvent.wheelDelta) || -ev.detail,
				overflowBottom = this.scrollTop + el.outerHeight() - this.scrollHeight >= 0,
				overflowTop = this.scrollTop <= 0;
				if ((delta < 0 && overflowBottom) || (delta > 0 && overflowTop)) ev.preventDefault();
		});
	};
	
	// Create jBox
	this._create = function() {
		if (this.wrapper) return;
		
		// Create wrapper
		this.wrapper = jQuery('<div/>', {
			id: this.id,
			'class': 'jBox-wrapper' + (this.type ? ' jBox-' + this.type : '') + (this.options.theme ? ' jBox-' + this.options.theme : '') + (this.options.addClass ? ' ' + this.options.addClass : '')
		}).css({
			position: (this.options.fixed ? 'fixed' : 'absolute'),
			display: 'none',
			opacity: 0,
			zIndex: this.options.zIndex
			
			// Save the jBox instance in the wrapper, so you can get access to your jBox when you only have the element
		}).data('jBox', this);
		
		// Add mouseleave event (.parents('*') might be a performance nightmare! Maybe there is a better way)
		this.options.closeOnMouseleave && this.wrapper.mouseleave(function(ev) {
			// Only close when the new target is not the source element
			!this.source || !(ev.relatedTarget == this.source[0] || jQuery.inArray(this.source[0], jQuery(ev.relatedTarget).parents('*')) !== -1) && this.close();
		}.bind(this));
		
		// Add closeOnClick: 'box' events
		(this.options.closeOnClick == 'box') && this.wrapper.on('touchend click', function() { this.close({ignoreDelay: true}); }.bind(this));
		
		// Create container
		this.container = jQuery('<div/>', {'class': 'jBox-container'}).appendTo(this.wrapper);
		
		// Create content
		this.content = jQuery('<div/>', {'class': 'jBox-content'}).css({width: this.options.width, height: this.options.height, minWidth: this.options.minWidth, minHeight: this.options.minHeight, maxWidth: this.options.maxWidth, maxHeight: this.options.maxHeight}).appendTo(this.container);
		
		// Isolate scrolling
		this.options.isolateScroll && this._isolateScroll(this.content);
		
		// Create close button
		if (this.options.closeButton) {
			this.closeButton = jQuery('<div/>', {'class': 'jBox-closeButton jBox-noDrag'}).on('touchend click', function(ev) { this.isOpen && this.close({ignoreDelay: true}); }.bind(this));
			
			if (this._supportsSVG()) {
				var closeButtonSVG = this._createSVG('svg', [['viewBox', '0 0 24 24']]);
				this._appendSVG(this._createSVG('path', [['d', 'M22.2,4c0,0,0.5,0.6,0,1.1l-6.8,6.8l6.9,6.9c0.5,0.5,0,1.1,0,1.1L20,22.3c0,0-0.6,0.5-1.1,0L12,15.4l-6.9,6.9c-0.5,0.5-1.1,0-1.1,0L1.7,20c0,0-0.5-0.6,0-1.1L8.6,12L1.7,5.1C1.2,4.6,1.7,4,1.7,4L4,1.7c0,0,0.6-0.5,1.1,0L12,8.5l6.8-6.8c0.5-0.5,1.1,0,1.1,0L22.2,4z']]), closeButtonSVG);
				this.closeButton.append(closeButtonSVG);
			} else {
				this.wrapper.addClass('jBox-nosvg');
			}
			
			// Add close button to jBox container
			if (this.options.closeButton == 'box' || (this.options.closeButton === true && !this.options.overlay && !this.options.title)) {
				this.wrapper.addClass('jBox-closeButton-box');
				this.closeButton.appendTo(this.container);
			}
		}
		
		// Append jBox to DOM
		this.wrapper.appendTo(this.options.appendTo);
		
		// Fix adjustDistance if there is a close button in the box
		this.wrapper.find('.jBox-closeButton').length &&  jQuery.each(['top', 'right', 'bottom', 'left'], function (index, pos) {
			this.wrapper.find('.jBox-closeButton').css(pos) && this.wrapper.find('.jBox-closeButton').css(pos) != 'auto' && (this.options.adjustDistance[pos] = Math.max(this.options.adjustDistance[pos], this.options.adjustDistance[pos] + (parseInt(this.wrapper.find('.jBox-closeButton').css(pos)) * -1)));
		}.bind(this));
		
		// Create pointer
		if (this.options.pointer) {
			
			// Get pointer vars and save globally
			this.pointer = {
				position: (this.options.pointTo != 'target') ? this.options.pointTo : this._getOpp(this.outside),
				xy: (this.options.pointTo != 'target') ? this._getXY(this.options.pointTo) : this._getXY(this.outside),
				align: 'center',
				offset: 0
			};
			
			this.pointer.element = jQuery('<div/>', {'class': 'jBox-pointer jBox-pointer-' + this.pointer.position}).appendTo(this.wrapper);
			this.pointer.dimensions = {
				x: this.pointer.element.outerWidth(),
				y: this.pointer.element.outerHeight()
			};
			
			if (jQuery.type(this.options.pointer) == 'string') {
				var split = this.options.pointer.split(':');
				split[0] && (this.pointer.align = split[0]);
				split[1] && (this.pointer.offset = parseInt(split[1]));
			}
			this.pointer.alignAttribute = (this.pointer.xy == 'x' ? (this.pointer.align == 'bottom' ? 'bottom' : 'top') : (this.pointer.align == 'right' ? 'right' : 'left'));
			
			// Set wrapper CSS
			this.wrapper.css('padding-' + this.pointer.position, this.pointer.dimensions[this.pointer.xy]);
			
			// Set pointer CSS
			this.pointer.element.css(this.pointer.alignAttribute, (this.pointer.align == 'center' ? '50%' : 0)).css('margin-' + this.pointer.alignAttribute, this.pointer.offset);
			this.pointer.margin = {}; this.pointer.margin['margin-' + this.pointer.alignAttribute] = this.pointer.offset;
			
			// Add a transform to fix centered position
			(this.pointer.align == 'center') && this.pointer.element.css('transform', 'translate(' + (this.pointer.xy == 'y' ? (this.pointer.dimensions.x * -0.5 + 'px') : 0) + ', ' + (this.pointer.xy == 'x' ? (this.pointer.dimensions.y * -0.5 + 'px') : 0) + ')');
			
			this.pointer.element.css((this.pointer.xy == 'x' ? 'width' : 'height'), parseInt(this.pointer.dimensions[this.pointer.xy]) + parseInt(this.container.css('border-' + this.pointer.alignAttribute + '-width')));
			
			// Add class to wrapper for CSS access
			this.wrapper.addClass('jBox-pointerPosition-' + this.pointer.position);
		}
		
		// Set title and content
		this.setContent(this.options.content, true);
		this.setTitle(this.options.title, true);
		
		// Make jBox draggable
		if (this.options.draggable) {
			var handle = (this.options.draggable == 'title') ? this.titleContainer : (this.options.draggable.length > 0 ? this.options.draggable : (this.options.draggable.selector ? jQuery(this.options.draggable.selector) : this.wrapper));
			handle.addClass('jBox-draggable').on('mousedown', function(ev) {
				if (ev.button == 2 || jQuery(ev.target).hasClass('jBox-noDrag') || jQuery(ev.target).parents('.jBox-noDrag').length) return;
				
				if (this.options.dragOver && this.wrapper.css('zIndex') <= jBox.zIndexMax) {
					jBox.zIndexMax += 1;
					this.wrapper.css('zIndex', jBox.zIndexMax);
				}
				
				var drg_h = this.wrapper.outerHeight(),
					drg_w = this.wrapper.outerWidth(),
					pos_y = this.wrapper.offset().top + drg_h - ev.pageY,
					pos_x = this.wrapper.offset().left + drg_w - ev.pageX;
				jQuery(document).on('mousemove.jBox-draggable-' + this.id, function(ev) {
					this.wrapper.offset({
						top: ev.pageY + pos_y - drg_h,
						left: ev.pageX + pos_x - drg_w
					});
				}.bind(this));
				ev.preventDefault();
			}.bind(this)).on('mouseup', function() { jQuery(document).off('mousemove.jBox-draggable-' + this.id); }.bind(this));
			
			// Add z-index
			jBox.zIndexMax = !jBox.zIndexMax ? this.options.zIndex : Math.max(jBox.zIndexMax, this.options.zIndex);
		}
		
		// Fire onCreated event
		this._fireEvent('onCreated');
	};
	
	// Create jBox onInit
	(this.options.constructOnInit || this.options.createOnInit) && this._create();
	
	// Attach jBox
	this.options.attach && this.attach();
	
	// Attach document and window events
	this._attachEvents = function() {
		
		// Closing event: closeOnEsc
		this.options.closeOnEsc && jQuery(document).on('keyup.jBox-' + this.id, function(ev) { if (ev.keyCode == 27) { this.close({ignoreDelay: true}); }}.bind(this));
		
		// Closing event: closeOnClick
		if (this.options.closeOnClick === true || this.options.closeOnClick == 'body') {
			jQuery(document).on('touchend.jBox-' + this.id + ' click.jBox-' + this.id, function(ev) {
				if (this.blockBodyClick || (this.options.closeOnClick == 'body' && (ev.target == this.wrapper[0] || this.wrapper.has(ev.target).length)))
					return;
				this.close({ignoreDelay: true});
			}.bind(this));
		}
		
		// Positioning events
		if (((this.options.adjustPosition && this.options.adjustTracker) || this.options.reposition) && !this.fixed && this.outside) {
			
			var scrollTimer,
				scrollTimerTriggered = 0,
				scrollTriggerDelay = 150;	// Trigger scroll and resize events every 150 ms (set a higher value to improve performance)
				
			// Function to delay positioning event
			var positionDelay = function () {
				var now = new Date().getTime();
				if (!scrollTimer) {
					if (now - scrollTimerTriggered > scrollTriggerDelay) {
						(this.options.reposition || this.options.adjustTracker) && this.position();
						scrollTimerTriggered = now;
					}
					scrollTimer = setTimeout(function() {
						scrollTimer = null;
						scrollTimerTriggered = new Date().getTime();
						(this.options.reposition || this.options.adjustTracker) && this.position();
					}.bind(this), scrollTriggerDelay);
				}
			}.bind(this);
			
			// Trigger position events when scrolling
			(this.options.adjustTracker && this.options.adjustTracker != 'resize') && jQuery(window).on('scroll.jBox-' + this.id, function(ev) { positionDelay(); }.bind(this));
			
			// Trigger position events when resizing
			((this.options.adjustTracker && this.options.adjustTracker != 'scroll') || this.options.reposition) && jQuery(window).on('resize.jBox-' + this.id, function(ev) { positionDelay(); }.bind(this));
		}
		
		// Mousemove events
		this.options.target == 'mouse' && jQuery('body').on('mousemove.jBox-' + this.id, function(ev) { this.position({mouseTarget: {top: ev.pageY, left: ev.pageX}}); }.bind(this));
	};
	
	// Detach document and window events
	this._detachEvents = function() {
		
		// Closing event: closeOnEsc
		this.options.closeOnEsc && jQuery(document).off('keyup.jBox-' + this.id);
		
		// Closing event: closeOnClick
		(this.options.closeOnClick === true || this.options.closeOnClick == 'body') && jQuery(document).off('touchend.jBox-' + this.id + ' click.jBox-' + this.id);
		
		// Positioning events
		if ((this.options.adjustPosition && this.options.adjustTracker) || this.options.reposition) {
			jQuery(window).off('scroll.jBox-' + this.id);
			jQuery(window).off('resize.jBox-' + this.id);
		}
		
		// Mousemove events
		this.options.target == 'mouse' && jQuery('body').off('mousemove.jBox-' + this.id);
	};

	// Add overlay
	this._showOverlay = function() {
		
		// If the overlay isn't cached, set overlay or create it
		if (!this.overlay) {
			
			// Add overlay to collection
			!jBox._overlays && (jBox._overlays = {});
			jBox._overlays['jBox-' + this.id] = true;
			
			// Get unique overlay id for own overlays
			this._overlayID = (this.options.overlay == 'own' ? ('jBox-overlay-' + this.id) : 'jBox-overlay');
			
			// Get the overlay and adjust z-Index
			this.overlay = (this.options.overlay != 'own' && jQuery('#jBox-overlay').length) ? jQuery('#jBox-overlay').css({zIndex: Math.min(jQuery('#jBox-overlay').css('z-index'), (this.options.zIndex - 1))}) : (jQuery('<div/>', {id: this._overlayID}).addClass('jBox-overlay').css({display: 'none', opacity: 0, zIndex: (this.options.zIndex - 1)}).appendTo(jQuery('body')));
			
			// Add close button to overlay
			(this.options.closeButton == 'overlay' || this.options.closeButton === true) && ((jQuery('#' + this._overlayID + ' .jBox-closeButton').length > 0) ? jQuery('#' + this._overlayID + ' .jBox-closeButton').on('touchend click', function() { this.isOpen && this.close({ignoreDelay: true}); }.bind(this)) : this.overlay.append(this.closeButton));
			
			// Add closeOnClick: 'overlay' events
			(this.options.closeOnClick == 'overlay') && this.overlay.on('touchend click', function() { this.isOpen && this.close({ignoreDelay: true}); }.bind(this));
		}
		
		// Adjust option adjustDistance if there is a close button in the overlay
		jQuery('#' + this._overlayID + ' .jBox-closeButton').length && (this.options.adjustDistance.top = Math.max(jQuery('#' + this._overlayID + ' .jBox-closeButton').outerHeight(), this.options.adjustDistance.top));
		
		// Add jBox to overlay data
		var overlay_data = this.overlay.data('jBox') || {};
		overlay_data['jBox-' + this.id] = true;
		this.overlay.data('jBox', overlay_data);
		
		// Abort if overlay is shown already
		if (this.overlay.css('display') == 'block') return;
		
		// Show overlay
		this.options.fade ? (this.overlay.stop() && this.overlay.animate({opacity: 1}, {
			queue: false,
			duration: this.options.fade,
			start: function() { this.overlay.css({display: 'block'}); }.bind(this)
		})) : this.overlay.css({display: 'block', opacity: 1});
	};
	
	// Remove overlay
	this._hideOverlay = function() {
		
		// Abort if no overlay found
		if (!this.overlay) return;
		
		// Remove jBox from data
		var overlay_data = this.overlay.data('jBox');
		delete overlay_data['jBox-' + this.id];
		this.overlay.data('jBox', overlay_data);
		
		// Hide overlay if no other jBox needs it
		if (jQuery.isEmptyObject(overlay_data)) {
			this.options.fade ? (this.overlay.stop() && this.overlay.animate({opacity: 0}, {
				queue: false,
				duration: this.options.fade,
				complete: function() { this.overlay.css({display: 'none'}); }.bind(this)
			})) : this.overlay.css({display: 'none', opacity: 0});
		}
	};
	
	// Generate CSS for animations and append to header
	this._generateCSS = function() {
		
		// Get open and close animations if none provided
		(jQuery.type(this.options.animation) != 'object') && (this.options.animation = {
			pulse: {open: 'pulse', close: 'zoomOut'},
			zoomIn: {open: 'zoomIn', close: 'zoomIn'},
			zoomOut: {open: 'zoomOut', close: 'zoomOut'},
			move: {open: 'move', close: 'move'},
			slide: {open: 'slide', close: 'slide'},
			flip: {open: 'flip', close: 'flip'},
			tada: {open: 'tada', close: 'zoomOut'}
		}[this.options.animation]);
		
		// Get direction var
		this.options.animation.open && (this.options.animation.open = this.options.animation.open.split(':'));
		this.options.animation.close && (this.options.animation.close = this.options.animation.close.split(':'));
		this.options.animation.openDirection = this.options.animation.open ? this.options.animation.open[1] : null;
		this.options.animation.closeDirection = this.options.animation.close ? this.options.animation.close[1] : null;
		this.options.animation.open && (this.options.animation.open = this.options.animation.open[0]);
		this.options.animation.close && (this.options.animation.close = this.options.animation.close[0]);
		
		// Add 'Open' and 'Close' to animation names
		this.options.animation.open && (this.options.animation.open += 'Open');
		this.options.animation.close && (this.options.animation.close += 'Close');
		
		// All animations
		var animations = {
			pulse: {
				duration: 350,
				css: [['0%', 'scale(1)'], ['50%', 'scale(1.1)'], ['100%', 'scale(1)']]
			},
			zoomInOpen: {
				duration: (this.options.fade || 180),
				css: [['0%', 'scale(0.9)'], ['100%', 'scale(1)']]
			},
			zoomInClose: {
				duration: (this.options.fade || 180),
				css: [['0%', 'scale(1)'], ['100%', 'scale(0.9)']]
			},
			zoomOutOpen: {
				duration: (this.options.fade || 180),
				css: [['0%', 'scale(1.1)'], ['100%', 'scale(1)']]
			},
			zoomOutClose: {
				duration: (this.options.fade || 180),
				css: [['0%', 'scale(1)'], ['100%', 'scale(1.1)']]
			},
			moveOpen: {
				duration: (this.options.fade || 180),
				positions: {top: {'0%': -12}, right: {'0%': 12}, bottom: {'0%': 12}, left: {'0%': -12}},
				css: [['0%', 'translate%XY(%Vpx)'], ['100%', 'translate%XY(0px)']]
			},
			moveClose: {
				duration: (this.options.fade || 180),
				timing: 'ease-in',
				positions: {top: {'100%': -12}, right: {'100%': 12}, bottom: {'100%': 12}, left: {'100%': -12}},
				css: [['0%', 'translate%XY(0px)'], ['100%', 'translate%XY(%Vpx)']]
			},
			slideOpen: {
				duration: 400,
				positions: {top: {'0%': -400}, right: {'0%': 400}, bottom: {'0%': 400}, left: {'0%': -400}},
				css: [['0%', 'translate%XY(%Vpx)'], ['100%', 'translate%XY(0px)']]
			},
			slideClose: {
				duration: 400,
				timing: 'ease-in',
				positions: {top: {'100%': -400}, right: {'100%': 400}, bottom: {'100%': 400}, left: {'100%': -400}},
				css: [['0%', 'translate%XY(0px)'], ['100%', 'translate%XY(%Vpx)']]
			},
			flipOpen: {
				duration: 600,
				css: [['0%', 'perspective(400px) rotateX(90deg)'], ['40%', 'perspective(400px) rotateX(-15deg)'], ['70%', 'perspective(400px) rotateX(15deg)'], ['100%', 'perspective(400px) rotateX(0deg)']]
			},
			flipClose: {
				duration: (this.options.fade || 300),
				css: [['0%', 'perspective(400px) rotateX(0deg)'], ['100%', 'perspective(400px) rotateX(90deg)']]
			},
			tada: {
				duration: 800,
				css: [['0%', 'scale(1)'], ['10%, 20%', 'scale(0.9) rotate(-3deg)'], ['30%, 50%, 70%, 90%', 'scale(1.1) rotate(3deg)'], ['40%, 60%, 80%', 'scale(1.1) rotate(-3deg)'], ['100%', 'scale(1) rotate(0)']]
			}
		};
		
		// Set Open and Close names for standalone animations
		jQuery.each(['pulse', 'tada'], function(index, item) { animations[item + 'Open'] = animations[item + 'Close'] = animations[item]; });
		
		// Function to generate the CSS for the keyframes
		var generateKeyframeCSS = function(ev, position) {
			
			// Generate keyframes CSS
			keyframe_css = '@keyframes jBox-' + this.id + '-animation-' + this.options.animation[ev] + '-' + ev + (position ? '-' + position : '') + ' {';
			jQuery.each(animations[this.options.animation[ev]].css, function(index, item) {
				var translate = position ? item[1].replace('%XY', this._getXY(position).toUpperCase()) : item[1];
				animations[this.options.animation[ev]].positions && (translate = translate.replace('%V', animations[this.options.animation[ev]].positions[position][item[0]]));
				keyframe_css += item[0] + ' {transform:' + translate + ';}';
			}.bind(this));
			keyframe_css += '}';
			
			// Generate class CSS
			keyframe_css += '.jBox-' + this.id + '-animation-' + this.options.animation[ev] + '-' + ev + (position ? '-' + position : '') + ' {';
			keyframe_css += 'animation-duration: ' + animations[this.options.animation[ev]].duration + 'ms;';
			keyframe_css += 'animation-name: jBox-' + this.id + '-animation-' + this.options.animation[ev] + '-' + ev + (position ? '-' + position : '') + ';';
			keyframe_css += animations[this.options.animation[ev]].timing ? ('animation-timing-function: ' + animations[this.options.animation[ev]].timing + ';') : '';
			keyframe_css += '}';
			
			return keyframe_css;
		}.bind(this);
		
		// Generate css for each event and positions
		this._animationCSS = '';
		jQuery.each(['open', 'close'], function(index, ev) {
			// No CSS needed for closing with no fade
			if (!this.options.animation[ev] || !animations[this.options.animation[ev]] || (ev == 'close' && !this.options.fade)) return '';
			
			// Generate CSS
			animations[this.options.animation[ev]].positions ?
				jQuery.each(['top', 'right', 'bottom', 'left'], function(index2, position) { this._animationCSS += generateKeyframeCSS(ev, position); }) :
				this._animationCSS += generateKeyframeCSS(ev);
		}.bind(this));
	};
	
	// Block body clicks for 10ms to prevent extra event triggering
	this._blockBodyClick = function() {
		this.blockBodyClick = true;
		setTimeout(function() { this.blockBodyClick = false; }.bind(this), 10);
	};
	
	// Add css for animations
	this.options.animation && this._generateCSS();
	
	// Animations
	this._animate = function(ev) {
		ev || (ev = this.isOpen ? 'open' : 'close');
		
		// Don't animate when closing with no fade duration
		if (!this.options.fade && ev == 'close') return null;
		
		// Get the current position, use opposite if jBox is flipped
		var animationDirection = (this.options.animation[ev + 'Direction'] || ((this.align != 'center') ? this.align : this.options.attributes.x));
		this.flipped && this._getXY(animationDirection) == (this._getXY(this.align)) && (animationDirection = this._getOpp(animationDirection));
		
		// Add event and position classes
		var classnames = 'jBox-' + this.id + '-animation-' + this.options.animation[ev] + '-' + ev + ' jBox-' + this.id + '-animation-' + this.options.animation[ev] + '-' + ev + '-' + animationDirection;
		this.wrapper.addClass(classnames);
		
		// Get duration of animation
		var animationDuration = parseFloat(this.wrapper.css('animation-duration')) * 1000;
		ev == 'close' && (animationDuration = Math.min(animationDuration, this.options.fade));
		
		// Remove animation classes when animation is finished
		setTimeout(function() { this.wrapper.removeClass(classnames); }.bind(this), animationDuration);
	};
	
	// Abort animation
	this._abortAnimation = function() {
		// Remove all animation classes
		var prefix = 'jBox-' + this.id + '-animation';
		var classes = this.wrapper.attr('class').split(' ').filter(function(c) {
			return c.lastIndexOf(prefix, 0) !== 0;
		});
		this.wrapper.attr('class', classes.join(' '));
	};
	
	// Adjust dimensions when browser is resized
	if (this.options.responsiveWidth || this.options.responsiveHeight) {
		jQuery(window).on('resize.responsivejBox-' + this.id, function(ev) { if (this.isOpen) { this.position(); } }.bind(this));
	}
	
	// Fix audio options
	jQuery.type(this.options.preloadAudio) === 'string' && (this.options.preloadAudio = [this.options.preloadAudio]);
	jQuery.type(this.options.audio) === 'string' && (this.options.audio = {open: this.options.audio});
	jQuery.type(this.options.volume) === 'number' && (this.options.volume = {open: this.options.volume, close: this.options.volume});
	
	if (this.options.preloadAudio === true && this.options.audio) {
		this.options.preloadAudio = [];
		jQuery.each(this.options.audio, function(index, url) {
			this.options.preloadAudio.push(url + '.mp3');
			this.options.preloadAudio.push(url + '.ogg');
		}.bind(this));
	}
	
	// Preload audio files
	this.options.preloadAudio.length && jQuery.each(this.options.preloadAudio, function(index, url) {
		var audio = new Audio();
		audio.src = url;
		audio.preload = 'auto';
	});
	
	// Fire onInit event
	this._fireEvent('onInit');
	
	return this;
};

// Attach jBox to elements
jBox.prototype.attach = function(elements, trigger) {
	elements || (elements = jQuery(this.options.attach.selector || this.options.attach));
	trigger || (trigger = this.options.trigger);
	
	elements && elements.length && jQuery.each(elements, function(index, el) {
		el = jQuery(el);
		if (!el.data('jBox-attached-' + this.id)) {
			
			// Remove title attribute and store content on element
			(this.options.getContent == 'title' && el.attr('title') != undefined) && el.data('jBox-getContent', el.attr('title')).removeAttr('title');
			
			// Add Element to collection
			this.attachedElements || (this.attachedElements = []);
			this.attachedElements.push(el[0]);
			
			// Add click or mouseenter event, click events can prevent default as well
			el.on(trigger + '.jBox-attach-' + this.id, function(ev) {
				// Clear timer
				this.timer && clearTimeout(this.timer);
				
				// Block opening when jbox is open and the source element is triggering
				if (trigger == 'mouseenter' && this.isOpen && this.source[0] == el[0])
					return;
				
				// Only close jBox if you click the current target element, otherwise open at new target
				if (this.isOpen && this.source && this.source[0] != el[0]) var forceOpen = true;
				
				// Set new source element
				this.source = el;
				
				// Set new target
				!this.options.target && (this.target = el);
				
				// Prevent default action on click
				trigger == 'click' && this.options.preventDefault && ev.preventDefault();
				
				// Toggle or open jBox
				this[trigger == 'click' && !forceOpen ? 'toggle' : 'open']();
			}.bind(this));
			
			// Add close event for trigger event mouseenter
			(this.options.trigger == 'mouseenter') && el.on('mouseleave', function(ev) {
				// If we have set closeOnMouseleave, do not close jBox when leaving attached element and mouse is over jBox
				if(!this.options.closeOnMouseleave || !(ev.relatedTarget == this.wrapper[0] || jQuery(ev.relatedTarget).parents('#' + this.id).length)) this.close();
			}.bind(this));
			
			el.data('jBox-attached-' + this.id, trigger);
			
			// Fire onAttach event
			this._fireEvent('onAttach', el);
		}
	}.bind(this));
	
	return this;
};

// Detach jBox from elements
jBox.prototype.detach = function(elements) {
	elements || (elements = this.attachedElements || []);
	
	elements && elements.length && jQuery.each(elements, function(index, el) {
		el = jQuery(el);
		// Remove events
		if (el.data('jBox-attached-' + this.id)) {
			el.off(el.data('jBox-attached-' + this.id) + '.jBox-attach-' + this.id);
			el.data('jBox-attached-' + this.id, null);
		}
		// Remove element from collection
		this.attachedElements = jQuery.grep(this.attachedElements, function(value) {
			return value != el[0];
		});
	}.bind(this));
	
	return this;
};

// Set title
jBox.prototype.setTitle = function(title, ignore_positioning) {
	!this.wrapper && this._create();
	
	var wrapperHeight = this.wrapper.height(), wrapperWidth = this.wrapper.width();
	if (title == null || title == undefined) return this;
	
	if (!this.title) {
		this.titleContainer = jQuery('<div/>', {'class': 'jBox-title'}).css('width', wrapperWidth);
		this.title = jQuery('<div/>').appendTo(this.titleContainer);
		this.wrapper.addClass('jBox-hasTitle');
		if (this.options.closeButton == 'title' || (this.options.closeButton === true && !this.options.overlay)) {
			this.wrapper.addClass('jBox-closeButton-title');
			this.closeButton.appendTo(this.titleContainer);
		}
		this.titleContainer.insertBefore(this.content);
	}
	this.title.html(title);
	
	// Reposition if dimensions changed
	!ignore_positioning && this.options.repositionOnContent && (wrapperHeight != this.wrapper.height() || wrapperWidth != this.wrapper.width()) && this.position();
	
	return this;
};

// Set content
jBox.prototype.setContent = function(content, ignore_positioning) {
	if (content == null) return this;
	
	// Create jBox if no wrapper found
	!this.wrapper && this._create();
	
	// Get the width and height of wrapper, only if they change we need to reposition
	var wrapperHeight = this.wrapper.height(), wrapperWidth = this.wrapper.width();
	
	// Get the width and height of body, if they change with new content, adjust accordingly (happens when a hidden scrollbar changes body dimensions)
	var bodyHeight = jQuery('body').height(), bodyWidth = jQuery('body').width();
	
	// Extract all appended containers to body
	this.content.children('[data-jbox-content-appended]').appendTo('body').css({display: 'none'});
	
	// Set the new content
	switch (jQuery.type(content)) {
		case 'string': this.content.html(content); break;
		case 'object': this.content.html(''); content.attr('data-jbox-content-appended', 1).appendTo(this.content).css({display: 'block'}); break;
 	}
 	
	// Calculate the difference to before the content was set
	var adjustOffset = {
		x: bodyWidth - jQuery('body').width(),
		y: bodyHeight - jQuery('body').height()
	};
	
	// Reposition if dimensions changed
	!ignore_positioning && this.options.repositionOnContent && (wrapperHeight != this.wrapper.height() || wrapperWidth != this.wrapper.width()) && this.position({adjustOffset: adjustOffset});
	
	return this;
};

// Set new dimensions
jBox.prototype.setDimensions = function(type, val, pos) {
	
	// Create jBox if no wrapper found
	!this.wrapper && this._create();
	
	// Default value is 'auto'
	val == undefined && (val == 'auto');
	
	// Set CSS of content and title
	this.content.css(type, val);
	type == 'width' && this.title && this.title.parent().css(type, val);
	
	// Reposition by default
	(pos == undefined || pos) && this.position();
};

// Set width or height
jBox.prototype.setWidth = function(val, pos) { this.setDimensions('width', val, pos); };
jBox.prototype.setHeight = function(val, pos) { this.setDimensions('height', val, pos); };

// Position jBox
jBox.prototype.position = function(options) {
	!options && (options = {});
	
	// Set new options
	options = jQuery.extend(true, this.options, options);
	
	// Get target
	this.target = options.target || this.target || jQuery(window);
	
	// Reset contents css to get original dimensions
	this.content.css({
		width: options.width,
		height: options.height,
		minWidth: options.minWidth,
		minHeight: options.minHeight,
		maxWidth: options.maxWidth,
		maxHeight: options.maxHeight
	});
	
	this.titleContainer && this.titleContainer.css({width: options.width});
	
	// Get jBox dimensions
	var jBoxDimensions = {
		x: this.wrapper.outerWidth(),
		y: this.wrapper.outerHeight()
	};
	
	// Get window dimensions
	var windowDimensions = {
		x: jQuery(window).outerWidth(),
		y: jQuery(window).outerHeight(),
		top: (options.fixed && this.target.data('jBox' + this.id + '-fixed') ? 0 : jQuery(window).scrollTop()),
		left: (options.fixed && this.target.data('jBox' + this.id + '-fixed') ? 0 : jQuery(window).scrollLeft())
	};
	windowDimensions.bottom = windowDimensions.top + windowDimensions.y;
	windowDimensions.right = windowDimensions.left + windowDimensions.x;
	
	// Check if target has fixed position, store in element
	this.target != 'mouse' && !this.target.data('jBox' + this.id + '-fixed') && this.target.data('jBox' + this.id + '-fixed', (this.target[0] != jQuery(window)[0] && (this.target.css('position') == 'fixed' || this.target.parents().filter(function() { return jQuery(this).css('position') == 'fixed'; }).length > 0)) ? 'fixed' : 'static');
	
	// Get target offset
	try { var targetOffset = this.target.offset(); } catch (e) { var targetOffset = {top: 0, left: 0}; };
	
	// When the target is fixed and jBox is fixed, remove scroll offset
	if (this.target != 'mouse' && this.target.data('jBox' + this.id + '-fixed') == 'fixed' && options.fixed) {
		targetOffset.top = targetOffset.top - jQuery(window).scrollTop();
		targetOffset.left = targetOffset.left - jQuery(window).scrollLeft();
	}
	
	// Get target dimensions
	var targetDimensions = {
		x: this.target == 'mouse' ? options.cursorDimensions.x : this.target.outerWidth(),
		y: this.target == 'mouse' ? options.cursorDimensions.y : this.target.outerHeight(),
		top: this.target == 'mouse' && options.mouseTarget ? options.mouseTarget.top : (targetOffset ? targetOffset.top : 0),
		left: this.target == 'mouse' && options.mouseTarget ? options.mouseTarget.left : (targetOffset ? targetOffset.left : 0)
	};
	
	// Check if jBox is outside
	var outside = options.outside && !(options.position.x == 'center' && options.position.y == 'center');
	
	// Adjust responsive dimensions
	var flip = {x: false, y: false};
	
	if (options.responsiveWidth || options.responsiveHeight) {
		
		// TODO: Check available space when position is number
		
		var availableSpace = {
			x: windowDimensions.x - options.adjustDistance.left - options.adjustDistance.right, // TODO substract position.x when they are numbers
			y: windowDimensions.y - options.adjustDistance.top - options.adjustDistance.bottom, // TODO substract position.x when they are numbers
			left: !outside ? 0 : (targetDimensions.left - jQuery(window).scrollLeft() - options.adjustDistance.left),
			right: !outside ? 0 : (windowDimensions.x - targetDimensions.left + jQuery(window).scrollLeft() - targetDimensions.x - options.adjustDistance.right),
			top: !outside ? 0 : (targetDimensions.top - jQuery(window).scrollTop() - this.options.adjustDistance.top),
			bottom: !outside ? 0 : (windowDimensions.y - targetDimensions.top + jQuery(window).scrollTop() - targetDimensions.y - options.adjustDistance.bottom),
		};
		
		// Get jBoxes default outside position
		var jBoxOutsidePosition = {
			x: (options.outside == 'x' || options.outside == 'xy') && jQuery.type(options.position.x) != 'number' ? options.position.x : null,
			y: (options.outside == 'y' || options.outside == 'xy') && jQuery.type(options.position.y) != 'number' ? options.position.y : null
		};
		
		// Adjust outside position if jBox will be flipped
		if (options.adjustPosition && options.adjustPosition != 'move') {
			(jBoxOutsidePosition.x && jBoxDimensions.x > availableSpace[jBoxOutsidePosition.x] && availableSpace[this._getOpp(jBoxOutsidePosition.x)] > availableSpace[jBoxOutsidePosition.x]) && (jBoxOutsidePosition.x = this._getOpp(jBoxOutsidePosition.x)) && (flip.x = true);
			(jBoxOutsidePosition.y && jBoxDimensions.y > availableSpace[jBoxOutsidePosition.y] && availableSpace[this._getOpp(jBoxOutsidePosition.y)] > availableSpace[jBoxOutsidePosition.y]) && (jBoxOutsidePosition.y = this._getOpp(jBoxOutsidePosition.y)) && (flip.y = true);
		}
		
		// Adjust width and height accordingly
		if (this.options.responsiveWidth && jBoxDimensions.x > availableSpace[jBoxOutsidePosition.x || 'x']) {
			var contentWidth = availableSpace[jBoxOutsidePosition.x || 'x'] - (this.pointer && outside && options.outside == 'x' ? this.pointer.dimensions.x : 0);
			this.content.css({
				width: contentWidth > this.options.responsiveMinWidth ? contentWidth : null,
				minWidth: contentWidth < parseInt(this.content.css('minWidth')) ? 0 : null
			});
			this.titleContainer && (this.titleContainer.css({width: this.content.css('width')}));
		}
		if (this.options.responsiveHeight && jBoxDimensions.y > availableSpace[jBoxOutsidePosition.y || 'y']) {
			var contentHeight = availableSpace[jBoxOutsidePosition.y || 'y'] - (this.pointer && outside && options.outside == 'y' ? this.pointer.dimensions.y : 0) - (this.titleContainer ? this.titleContainer.outerHeight() : 0);
			this.content.css({height: contentHeight > this.options.responsiveMinHeight ? contentHeight : null});
		}
		
		// Update jBox dimensions
		jBoxDimensions = {
			x: this.wrapper.outerWidth(),
			y: this.wrapper.outerHeight()
		};
	}
	
	// Store new positioning vars in local var
	var pos = {};
	
	// Calculate positions
	var setPosition = function(p) {
		
		// Set number positions
		if (jQuery.type(options.position[p]) == 'number') {
			pos[options.attributes[p]] = options.position[p];
			return;
		}
		
		// We have a target, so use 'left' or 'top' as attributes
		var a = options.attributes[p] = (p == 'x' ? 'left' : 'top');
		
		// Start at target position
		pos[a] = targetDimensions[a];
		
		// Set centered position
		if (options.position[p] == 'center') {
			pos[a] += Math.ceil((targetDimensions[p] - jBoxDimensions[p]) / 2);
			
			// If the target is the window, adjust centered position depending on adjustDistance
			(this.target != 'mouse' && this.target[0] && this.target[0] == jQuery(window)[0]) && (pos[a] += (options.adjustDistance[a] - options.adjustDistance[this._getOpp(a)]) * 0.5);
			return;
		}
		
		// Move inside
		(a != options.position[p]) && (pos[a] += targetDimensions[p] - jBoxDimensions[p]);
		
		// Move outside
		(options.outside == p || options.outside == 'xy') && (pos[a] += jBoxDimensions[p] * (a != options.position[p] ? 1 : -1));
		
	}.bind(this);
	
	// Set position including offset
	setPosition('x');
	setPosition('y');
	
	// Adjust position depending on pointer align
	if (options.pointer && jQuery.type(options.position.x) != 'number' && jQuery.type(options.position.y) != 'number') {
		
		var adjustWrapper = 0;
		
		// Where is the pointer aligned? Add or substract accordingly
		switch (this.pointer.align) {
			case 'center':
			if (options.position[this._getOpp(options.outside)] != 'center') {
				adjustWrapper += (jBoxDimensions[this._getOpp(options.outside)] / 2);
			}
			break;
			default:
			switch (this.options.position[this._getOpp(options.outside)]) {
				case 'center':
					adjustWrapper += ((jBoxDimensions[this._getOpp(options.outside)] / 2) - (this.pointer.dimensions[this._getOpp(options.outside)] / 2)) * (this.pointer.align == this._getTL(this.pointer.align) ? 1 : -1);
				break;
				default:
					adjustWrapper += (this.pointer.align != options.position[this._getOpp(options.outside)]) ?
						
					// If pointer align is different to position align
					(this.dimensions[this._getOpp(options.outside)] * (jQuery.inArray(this.pointer.align, ['top', 'left']) !== -1 ? 1 : -1)) + ((this.pointer.dimensions[this._getOpp(options.outside)] / 2) * (jQuery.inArray(this.pointer.align, ['top', 'left']) !== -1 ? -1 : 1)) :
						
					// If pointer align is same as position align
					(this.pointer.dimensions[this._getOpp(options.outside)] / 2) * (jQuery.inArray(this.pointer.align, ['top', 'left']) !== -1 ? 1 : -1);
				break;
			}
			break;
		}
	
		adjustWrapper *= (options.position[this._getOpp(options.outside)] == this.pointer.alignAttribute ? -1 : 1);
		adjustWrapper += this.pointer.offset * (this.pointer.align == this._getOpp(this._getTL(this.pointer.align)) ? 1 : -1);
		
		pos[this._getTL(this._getOpp(this.pointer.xy))] += adjustWrapper;
	}
	
	// Add final offset
	pos[options.attributes.x] += options.offset.x;
	pos[options.attributes.y] += options.offset.y;
	
	// Set CSS
	this.wrapper.css(pos);
	
	// Adjust position
	if (options.adjustPosition) {
		
		// Reset cached pointer position
		if (this.positionAdjusted) {
			this.pointer && this.wrapper.css('padding', 0).css('padding-' + this._getOpp(this.outside), this.pointer.dimensions[this._getXY(this.outside)]).removeClass('jBox-pointerPosition-' + this._getOpp(this.pointer.position)).addClass('jBox-pointerPosition-' + this.pointer.position);
			this.pointer && this.pointer.element.attr('class', 'jBox-pointer jBox-pointer-' + this._getOpp(this.outside)).css(this.pointer.margin);
			this.positionAdjusted = false;
			this.flipped = false;
		}
		
		// Find out where the jBox is out of view area
		var outYT = (windowDimensions.top > pos.top - (options.adjustDistance.top || 0)),
			outXR = (windowDimensions.right < pos.left + jBoxDimensions.x + (options.adjustDistance.right || 0)),
			outYB = (windowDimensions.bottom < pos.top + jBoxDimensions.y + (options.adjustDistance.bottom || 0)),
			outXL = (windowDimensions.left > pos.left - (options.adjustDistance.left || 0)),
			outX = outXL ? 'left' : (outXR ? 'right' : null),
			outY = outYT ? 'top' : (outYB ? 'bottom' : null),
			out = outX || outY;
		
		// Only continue if jBox is out of view area
		if (out) {
			
			//console.log(out);
			
			// Move a centered jBox
			/*if (options.position.x == 'center' && options.position.y == 'center') {
				outYT && this.wrapper.css('marginTop', parseInt(this.wrapper.css('marginTop')) + (options.adjustDistance.top || 0) - pos.top);
				outYB && this.wrapper.css('marginTop', parseInt(this.wrapper.css('marginTop')) + (windowDimensions.bottom - (pos.top + jBoxDimensions.y + (options.adjustDistance.bottom || 0))));
				outXR && this.wrapper.css('marginLeft', parseInt(this.wrapper.css('marginLeft')) + (windowDimensions.right - (pos.left + jBoxDimensions.x + (options.adjustDistance.right || 0))));
				outXL && this.wrapper.css('marginLeft', parseInt(this.wrapper.css('marginLeft')) + (options.adjustDistance.left || 0) - pos.left);
				return;
			}*/
			
			// Function to flip position
			var flipJBox = function (xy) {
				this.wrapper.css(this._getTL(xy), pos[this._getTL(xy)] + ((jBoxDimensions[this._getXY(xy)] + (options.offset[this._getXY(xy)] * (xy == 'top' || xy == 'left' ? -2 : 2)) + targetDimensions[this._getXY(xy)]) * (xy == 'top' || xy == 'left' ? 1 : -1)));
				this.pointer && this.wrapper.removeClass('jBox-pointerPosition-' + this.pointer.position).addClass('jBox-pointerPosition-' + this._getOpp(this.pointer.position)).css('padding', 0).css('padding-' + xy, this.pointer.dimensions[this._getXY(xy)]);
				this.pointer && this.pointer.element.attr('class', 'jBox-pointer jBox-pointer-' + xy);
				this.positionAdjusted = true;
				this.flipped = true;
			}.bind(this);
			
			// Flip jBox
			flip.x && flipJBox(this.options.position.x);
			flip.y && flipJBox(this.options.position.y);
			
			// Move jBox (only possible with pointer)
			var outMove = (this._getXY(this.outside) == 'x') ? outY : outX;
			
			if (this.pointer && options.adjustPosition != 'flip' && this._getXY(outMove) == this._getOpp(this._getXY(this.outside))) {
				
				// Get the maximum space we have availible to adjust
				if (this.pointer.align == 'center') {
					var spaceAvail = (jBoxDimensions[this._getXY(outMove)] / 2) - (this.pointer.dimensions[this._getOpp(this.pointer.xy)] / 2) - (parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) * (outMove != this._getTL(outMove) ? -1 : 1));
				} else {
					var spaceAvail = (outMove == this.pointer.alignAttribute) ?
						parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) :
						jBoxDimensions[this._getXY(outMove)] - parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) - this.pointer.dimensions[this._getXY(outMove)];
				}
				
				// Get the overlapping space
				spaceDiff = (outMove == this._getTL(outMove)) ?
					windowDimensions[this._getTL(outMove)] - pos[this._getTL(outMove)] + options.adjustDistance[outMove] :
					(windowDimensions[this._getOpp(this._getTL(outMove))] - pos[this._getTL(outMove)] - options.adjustDistance[outMove] - jBoxDimensions[this._getXY(outMove)]) * -1;
					
				// Add overlapping space on left or top window edge
				if (outMove == this._getOpp(this._getTL(outMove)) && pos[this._getTL(outMove)] - spaceDiff < windowDimensions[this._getTL(outMove)] + options.adjustDistance[this._getTL(outMove)]) {
					spaceDiff -= windowDimensions[this._getTL(outMove)] + options.adjustDistance[this._getTL(outMove)] - (this.pos[this._getTL(outMove)] - spaceDiff);
				}
				
				// Only adjust the maximum availible
				spaceDiff = Math.min(spaceDiff, spaceAvail);
				
				// Move jBox
				if (spaceDiff <= spaceAvail && spaceDiff > 0) {
					this.pointer.element.css('margin-' + this.pointer.alignAttribute, parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) - (spaceDiff * (outMove != this.pointer.alignAttribute ? -1 : 1)));
					this.wrapper.css(this._getTL(outMove), pos[this._getTL(outMove)] + (spaceDiff * (outMove != this._getTL(outMove) ? -1 : 1)));
					this.positionAdjusted = true;
				}
			}
		}
	}	
	
	// Fire onPosition event
	this._fireEvent('onPosition');
	
	return this;
};

// Open jBox
jBox.prototype.open = function(options) {
	options || (options = {});
	
	// Abort if jBox was destroyed
	if (this.isDestroyed) return false;
	
	// Construct jBox if not already constructed
	!this.wrapper && this._create();
	
	// Add css to header if not added already
	!this._styles && (this._styles = jQuery('<style/>').append(this._animationCSS).appendTo(jQuery('head')));
	
	// Abort any opening or closing timer
	this.timer && clearTimeout(this.timer);
	
	// Block body click for 10ms, so jBox can open on attached elements while closeOnClick = 'body'
	this._blockBodyClick();
	
	// Block opening
	if (this.isDisabled) return this;
	
	// Opening function
	var open = function() {
		
		// Set title from source element
		this.source && this.options.getTitle && (this.source.attr(this.options.getTitle) && this.setTitle(this.source.attr(this.options.getTitle)), true);
		
		// Set content from source element
		this.source && this.options.getContent && (this.source.data('jBox-getContent') ? this.setContent(this.source.data('jBox-getContent'), true) : (this.source.attr(this.options.getContent) ? this.setContent(this.source.attr(this.options.getContent), true) : (this.options.getContent == 'html' ? this.setContent(this.source.html(), true) : null)));
		
		// Fire onOpen event
		this._fireEvent('onOpen');
		
		// Get content from ajax
		if ((this.options.ajax && (this.options.ajax.url || (this.source && this.source.attr(this.options.ajax.getURL))) && (!this.ajaxLoaded || this.options.ajax.reload)) || (options.ajax && (options.ajax.url || options.ajax.data))) {
			// Send the content from stored data if there is any, otherwise load new data
			(this.options.ajax.reload != 'strict' && this.source && this.source.data('jBox-ajax-data') && !(options.ajax && (options.ajax.url || options.ajax.data))) ? this.setContent(this.source.data('jBox-ajax-data')) : this.ajax(options.ajax || null);
		}
		
		// Set position
		(!this.positionedOnOpen || this.options.repositionOnOpen) && this.position(options) && (this.positionedOnOpen = true);
		
		// Abort closing
		this.isClosing && this._abortAnimation();
		
		// Open functions to call when jBox is closed
		if (!this.isOpen) {
			
			// jBox is open now
			this.isOpen = true;
			
			// Automatically close jBox after some time
			this.options.autoClose && (this.options.delayClose = this.options.autoClose) && this.close();
			
			// Attach events
			this._attachEvents();
			
			// Block scrolling
			this.options.blockScroll && jQuery('body').addClass('jBox-blockScroll-' + this.id);
			
			// Add overlay
			this.options.overlay && this._showOverlay();
			
			// Only animate if jBox is completely closed
			this.options.animation && !this.isClosing && this._animate('open');
			
			// Play audio file
			this.options.audio && this.options.audio.open && this.audio(this.options.audio.open, this.options.volume.open);
			
			// Fading animation or show immediately
			if (this.options.fade) {
				this.wrapper.stop().animate({opacity: 1}, {
					queue: false,
					duration: this.options.fade,
					start: function() {
						this.isOpening = true;
						this.wrapper.css({display: 'block'});
					}.bind(this),
					always: function() {
						this.isOpening = false;
					}.bind(this)
				});
			} else {
				this.wrapper.css({display: 'block', opacity: 1});
			}
		}
	}.bind(this);
	
	// Open jBox
	this.options.delayOpen && !this.isOpen && !this.isClosing && !options.ignoreDelay ? (this.timer = setTimeout(open, this.options.delayOpen)) : open();
	
	return this;
};

// Close jBox
jBox.prototype.close = function(options) {
	options || (options = {});
	
	// Abort if jBox was destroyed
	if (this.isDestroyed) return false;
	
	// Abort opening
	this.timer && clearTimeout(this.timer);
	
	// Block body click for 10ms, so jBox can open on attached elements while closeOnClock = 'body' is true
	this._blockBodyClick();
	
	// Block closing
	if (this.isDisabled) return this;
	
	// Close function
	var close = function() {
		
		// Fire onClose event
		this._fireEvent('onClose');
		
		// Only close if jBox is open
		if (this.isOpen) {
			
			// jBox is not open anymore
			this.isOpen = false;
			
			// Detach events
			this._detachEvents();
			
			// Unblock scrolling
			this.options.blockScroll && jQuery('body').removeClass('jBox-blockScroll-' + this.id);
			
			// Remove overlay
			this.options.overlay && this._hideOverlay();
			
			// Only animate if jBox is compleately closed
			this.options.animation && !this.isOpening && this._animate('close');
			
			// Play audio file
			this.options.audio && this.options.audio.close && this.audio(this.options.audio.close, this.options.volume.close);
			
			// Fading animation or show immediately
			if (this.options.fade) {
				this.wrapper.stop().animate({opacity: 0}, {
					queue: false,
					duration: this.options.fade,
					start: function() {
						this.isClosing = true;
					}.bind(this),
					complete: function() {
						this.wrapper.css({display: 'none'});
						this.options.onCloseComplete && (this.options.onCloseComplete.bind(this))();
						this.options._onCloseComplete && (this.options._onCloseComplete.bind(this))();
					}.bind(this),
					always: function() {
						this.isClosing = false;
					}.bind(this)
				});
			} else {
				this.wrapper.css({display: 'none', opacity: 0});
				this.options._onCloseComplete && (this.options._onCloseComplete.bind(this))();
			}
		}
	}.bind(this);
	
	// Close jBox
	options.ignoreDelay ? close() : (this.timer = setTimeout(close, Math.max(this.options.delayClose, 10)));
	
	return this;
};

// Open or close jBox
jBox.prototype.toggle = function(options) {
	this[this.isOpen ? 'close' : 'open'](options);
	return this;
};

// Block opening and closing
jBox.prototype.disable = function() {
	this.isDisabled = true;
	return this;
};

// Unblock opening and closing
jBox.prototype.enable = function() {
	this.isDisabled = false;
	return this;
};

// Hide jBox
jBox.prototype.hide = function() {
	this.disable();
	this.wrapper && this.wrapper.css({display: 'none'});
	return this;
};

// Show jBox
jBox.prototype.show = function() {
	this.enable();
	this.wrapper && this.wrapper.css({display: 'block'});
	return this;
};

// Get content from ajax
jBox.prototype.ajax = function(options) {
	options || (options = {});
	
	// Add data or url from source element if none set in options
	jQuery.each([['getData', 'data'], ['getURL', 'url']], function (index, item) {
		(this.options.ajax[item[0]] && !options[item[1]] && this.source && this.source.attr(this.options.ajax[item[0]]) != undefined) && (options[item[1]] = this.source.attr(this.options.ajax[item[0]]) || '');
	}.bind(this));
	
	// Clone the system options
	var sysOptions = jQuery.extend(true, {}, this.options.ajax);
	
	// Abort running ajax call
	this.ajaxRequest && this.ajaxRequest.abort();
	
	// Extract events
	var beforeSend = options.beforeSend || sysOptions.beforeSend || function () {};
	var complete = options.complete || sysOptions.complete || function () {};
	var success = options.success || sysOptions.success || function () {};
	var error = options.error || sysOptions.error || function () {};
	
	// Merge options
	var userOptions = jQuery.extend(true, sysOptions, options);
	
	// Set new beforeSend event
	userOptions.beforeSend = function() {
		
		// jBox is loading
		this.wrapper.addClass('jBox-loading');
		userOptions.spinner && this.wrapper.addClass('jBox-loading-spinner');
		
		// Add loading spinner
		var spinnerDelay = (this.content.html() == '') ? 0 : userOptions.spinnerDelay;
		userOptions.spinner && (this.spinnerDelay = setTimeout(function() { this.wrapper.addClass('jBox-loading-spinner-delay'); (userOptions.spinnerReposition && this.position()); this.spinner = jQuery(userOptions.spinner !== true ? userOptions.spinner : '<div class="jBox-spinner"></div>').appendTo(this.container); }.bind(this), spinnerDelay || 0));
		
		// Fire users beforeSend event
		(beforeSend.bind(this))();
	}.bind(this);
	
	// Set up new complete event
	userOptions.complete = function(response) {
		
		// Abort spinner timeout
		this.spinnerDelay && clearTimeout(this.spinnerDelay);
		
		// jBox finished loading
		this.wrapper.removeClass('jBox-loading jBox-loading-spinner jBox-loading-spinner-delay');
		
		// Remove spinner
		this.spinner && this.spinner.length && this.spinner.remove() && (userOptions.spinnerReposition && this.position());
		
		// Store that ajax loading finished
		this.ajaxLoaded = true;
		
		// Fire users complete event
		(complete.bind(this))(response);
	}.bind(this);
	
	// Set up new success event
	userOptions.success = function(response) {
		
		// Set content
		userOptions.setContent && this.setContent(response);
		
		// Store content in source element
		userOptions.setContent && this.source && this.source.data('jBox-ajax-data', response);
		
		// Fire users success event
		(success.bind(this))(response);
	}.bind(this);
	
	// Add error event
	userOptions.error = function(response) { (error.bind(this))(response); }.bind(this);
	
	// Send new ajax request
	this.ajaxRequest = jQuery.ajax(userOptions);
	
	return this;
};

// Play an audio file
jBox.prototype.audio = function(url, volume) {
	jBox._audio || (jBox._audio = {});
	
	// URL is required
	if (!url) return this;
	
	// Create audio if it doesn't exist
	if (!jBox._audio[url]) {
		var audio = jQuery('<audio/>');
		jQuery('<source/>', {src: url + '.mp3'}).appendTo(audio);
		jQuery('<source/>', {src: url + '.ogg'}).appendTo(audio);
		jBox._audio[url] = audio[0];
	}
	
	// Set volume
	jBox._audio[url].volume = Math.min(((volume != undefined ? volume : 100) / 100), 1);
	
	// Play audio
	try {
		jBox._audio[url].pause();
		jBox._audio[url].currentTime = 0;
	} catch (e) {}
	
	jBox._audio[url].play();
	
	return this;
};

// Destroy jBox and remove it from DOM
jBox.prototype.destroy = function() {
	
	// Detach
	this.detach().close({ignoreDelay: true});
	
	// Remove wrapper
	this.wrapper && this.wrapper.remove();
	
	// Remove overlay
	jBox._overlays && delete jBox._overlays['jBox-' + this.id];
	this.overlay && (this.options.overlay == 'own' || jQuery.isEmptyObject(jBox._overlays)) && this.overlay.remove();
	
	// Remove styles from header
	this._styles && this._styles.remove();
	
	// Tell the jBox instance it is destroyed
	this.isDestroyed = true;
	return this;
};

// Get a unique ID for jBoxes
jBox._getUniqueID = (function () {
	var i = 1;
	return function () {
		return i++;
	};
}());

// Function to create jBox plugins
jBox._pluginOptions = {};
function jBoxPlugin(type, options) {
	jBox._pluginOptions[type] = options;
};

// Make jBox usable with jQuery selectors
jQuery.fn.jBox = function(type, options) {
	type || (type = {});
	options || (options = {});
	return new jBox(type, jQuery.extend(options, {attach: this}));
};
