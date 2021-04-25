/**
 * jBox is a jQuery plugin that makes it easy to create customizable tooltips, modal windows, image galleries and more.
 *
 * Author: Stephan Wagner <stephanwagner.me@gmail.com> (https://stephanwagner.me)
 *
 * License: MIT (https://opensource.org/licenses/MIT)
 *
 * Requires: jQuery 3.5.0 (https://code.jquery.com/jquery-3.5.0.min.js)
 *
 * Documentation: https://stephanwagner.me/jBox/documentation
 *
 * Demos: https://stephanwagner.me/jBox/demos
 */

function jBoxWrapper(jQuery) {


  var jBox = function jBox(type, options) {


    // Options (https://stephanwagner.me/jBox/options)

    this.options = {

      // jBox ID
      id: null,                    // Choose a unique id, otherwise jBox will set one for you (jBox1, jBox2, ...)

      // Dimensions
      width: 'auto',               // The width of the content area, e.g. 'auto', 200, '80%'
      height: 'auto',              // The height of the content area
      minWidth: null,              // Minimal width
      minHeight: null,             // Minimal height
      maxWidth: null,              // Maximal width
      maxHeight: null,             // Maximal height

      // Responsive dimensions
      responsiveWidth: true,       // Adjusts the width to fit the viewport
      responsiveHeight: true,      // Adjusts the height to fit the viewport
      responsiveMinWidth: 100,     // Don't adjust width below this value (in pixel)
      responsiveMinHeight: 100,    // Don't adjust height below this value (in pixel)

      // Attach
      attach: null,                // A jQuery selector to elements that will open and close your jBox, e.g. '.tooltip'
      trigger: 'click',            // The event to open or close your jBox, use 'click', 'touchclick' or 'mouseenter'
      preventDefault: false,       // Prevent the default event when opening jBox, e.g. don't follow the href in a link

      // Content
      content: null,               // You can use HTML or a jQuery element, e.g. jQuery('#jBox-content'). The elements will be appended to the content element and then made visible, so hide them with style="display: none" beforehand
      getContent: null,            // Get the content from an attribute when jBox opens, e.g. getContent: 'data-content'. Use 'html' to get the attached elements HTML as content
      title: null,                 // Adds a title to your jBox
      getTitle: null,              // Get the title from an attribute when jBox opens, e.g. getTitle: 'data-title'
      footer: null,                // Adds a footer to your jBox
      isolateScroll: true,         // Isolates scrolling to the content container

      // AJAX
      ajax: {                      // Setting an URL will make an AJAX request when jBox opens. Optional you can add any jQuery AJAX option (http://api.jquery.com/jquery.ajax/)
        url: null,                 // The URL to send the AJAX request to
        data: '',                  // Data to send with your AJAX request, e.g. {id: 82, limit: 10}
        reload: false,             // Resend the AJAX request when jBox opens. Use true to send the AJAX request only once for every attached element or 'strict' to resend every time jBox opens
        getURL: 'data-url',        // The attribute in the source element where the AJAX request will look for the URL, e.g. data-url="https://reqres.in/api/users"
        getData: 'data-ajax',      // The attribute in the source element where the AJAX request will look for the data, e.g. data-ajax="id=82&limit=10"
        setContent: true,          // Automatically set the response as new content when the AJAX request is finished
        loadingClass: true,        // Add a class to the wrapper when jBox is loading, set to class name or true to use the default class name 'jBox-loading'
        spinner: true,             // Hides the current content and adds a spinner while loading. You can pass HTML content to add your own spinner, e.g. spinner: '<div class="mySpinner"></div>'
        spinnerDelay: 300,         // Milliseconds to wait until spinner appears
        spinnerReposition: true    // Repositions jBox when the spinner is added or removed
      },
      cancelAjaxOnClose: true,     // Cancels the ajax call when jBox closes and it hasn't finished loading yet

      // Position
      target: null,                // The jQuery selector to the target element where jBox will be opened. If no element is found, jBox will use the attached element as target
      position: {
        x: 'center',               // Horizontal position, use a number, 'left', 'right' or 'center'
        y: 'center'                // Vertical position, use a number, 'top', 'bottom' or 'center'
      },
      outside: null,               // Use 'x', 'y', or 'xy' to move your jBox outside of the target element
      offset: 0,                   // Offset to final position, you can set different values for x and y with an object, e.g. {x: 20, y: 10}
      attributes: {                // Note that attributes can only be 'left' or 'right' when using numbers for position, e.g. {x: 300, y: 20}
        x: 'left',                 // Horizontal position, use 'left' or 'right'
        y: 'top'                   // Vertical position, use 'top' or 'bottom'
      },
      fixed: false,                // Your jBox will stay on position when scrolling
      adjustPosition: true,        // Adjusts your jBoxes position if there is not enough space, use 'flip', 'move' or true for both. This option overrides the reposition options
      adjustTracker: false,        // By default jBox adjusts its position when it opens or when the window size changes, set to true to also adjust when scrolling
      adjustDistance: 5,           // The minimal distance to the viewport edge while adjusting. Use an object to set different values, e.g. {top: 50, right: 5, bottom: 20, left: 5}
      reposition: true,            // Calculates new position when the window-size changes
      repositionOnOpen: true,      // Calculates new position each time jBox opens (rather than only when it opens the first time)
      repositionOnContent: true,   // Calculates new position when the content changes with .setContent() or .setTitle()
      holdPosition: true,          // Keeps current position if space permits. Applies only to 'Modal' type.

      // Pointer
      pointer: false,              // Your pointer will always point towards the target element, so the option outside needs to be 'x' or 'y'. By default the pointer is centered, set a position to move it to any side. You can also add an offset, e.g. 'left:30' or 'center:-20'
      pointTo: 'target',           // Setting something else than 'target' will add a pointer even if there is no target element set or found. Use 'top', 'right', 'bottom' or 'left'

      // Animations
      fade: 180,                   // Fade duration in ms, set to 0 or false to disable
      animation: null,             // Animation when opening or closing, use 'pulse', 'zoomIn', 'zoomOut', 'move', 'slide', 'flip', 'tada' (CSS inspired from Daniel Edens Animate.css: http://daneden.me/animate)

      // Appearance
      theme: 'Default',            // Set a jBox theme class
      addClass: null,              // Adds classes to the wrapper
      overlay: false,              // Adds an overlay to hide page content when jBox opens (adjust color and opacity with CSS)
      overlayClass: null,          // Add a class name to the overlay
      zIndex: 10000,               // Use a high z-index, or set to 'auto' to bring to front on open

      // Delays
      delayOpen: 0,                // Delay opening in ms. Note that the delay will be ignored if your jBox didn't finish closing
      delayClose: 0,               // Delay closing in ms. Nnote that there is always a closing delay of at least 10ms to ensure jBox won't be closed when opening right away

      // Closing
      closeOnEsc: false,           // Close jBox when pressing [esc] key
      closeOnClick: false,         // Close jBox with mouseclick. Use true (click anywhere), 'box' (click on jBox itself), 'overlay' (click on the overlay), 'body' (click anywhere but jBox)
      closeOnMouseleave: false,    // Close jBox when the mouse leaves the jBox area or the area of the attached element
      closeButton: false,          // Adds a close button to your jBox. Use 'title', 'box', 'overlay' or true (true will add the button to the overlay, title or the jBox itself, in that order if any of those elements can be found)

      // Other options
      appendTo: jQuery('body'),    // The element your jBox will be appended to. Any other element than jQuery('body') is only useful for fixed positions or when position values are numbers
      createOnInit: false,         // Creates jBox and makes it available in DOM when it's being initialized, otherwise it will be created when it opens for the first time
      blockScroll: false,          // Blocks scrolling when jBox is open
      blockScrollAdjust: true,     // Adjust page elements to avoid content jumps when scrolling is blocked. See more here: https://github.com/StephanWagner/unscroll
      draggable: false,            // Make your jBox draggable (use 'true', 'title' or provide an element as handle) (inspired from Chris Coyiers CSS-Tricks http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/)
      dragOver: true,              // When you have multiple draggable jBoxes, the one you select will always move over the other ones
      autoClose: false,            // Time in ms when jBox will close automatically after it was opened
      delayOnHover: false,         // Delay auto-closing while mouse is hovered
      showCountdown: false,        // Display a nice progress-indicator when autoClose is enabled

      // Audio                     // You can use the integrated audio function whenever you'd like to play an audio file, e.g. onInit: function () { this.audio('url_to_audio_file_without_file_extension', 75); }
      preloadAudio: true,          // Preloads the audio files set in option audio. You can also preload other audio files, e.g. ['src_to_file.mp3', 'src_to_file.ogg']
      audio: null,                 // The URL to an audio file to play when jBox opens. Set the URL without file extension, jBox will look for an .mp3 and .ogg file. To play audio when jBox closes, use an object, e.g. {open: 'src_to_audio1', close: 'src_to_audio2'}
      volume: 100,                 // The volume in percent. To have different volumes for opening and closeing, use an object, e.g. {open: 75, close: 100}

      // Events                    // Note that you can use 'this' in all event functions, it refers to your jBox object (e.g. onInit: function () { this.open(); })
      onInit: null,                // Fired when jBox is initialized
      onAttach: null,              // Fired when jBox attached itself to elements, the attached element will be passed as a parameter, e.g. onAttach: function (element) { element.css({color: 'red'}); }
      onPosition: null,            // Fired when jBox is positioned
      onCreated: null,             // Fired when jBox is created and availible in DOM
      onOpen: null,                // Fired when jBox opens
      onOpenComplete: null,        // Fired when jBox is completely open (when fading is finished)
      onClose: null,               // Fired when jBox closes
      onCloseComplete: null,       // Fired when jBox is completely closed (when fading is finished)
      onDragStart: null,           // Fired when dragging starts
      onDragEnd: null              // Fired when dragging finished
    };


    // Default plugin options

    this._pluginOptions = {

      // Default options for tooltips
      'Tooltip': {
        getContent: 'title',
        trigger: 'mouseenter',
        position: {
          x: 'center',
          y: 'top'
        },
        outside: 'y',
        pointer: true
      },

      // Default options for mouse tooltips
      'Mouse': {
        responsiveWidth: false,
        responsiveHeight: false,
        adjustPosition: 'flip',
        target: 'mouse',
        trigger: 'mouseenter',
        position: {
          x: 'right',
          y: 'bottom'
        },
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
        closeButton: true,
        overlay: true,
        animation: 'zoomIn'
      },
    };


    // Merge options

    this.options = jQuery.extend(true, this.options, this._pluginOptions[type] ? this._pluginOptions[type] : jBox._pluginOptions[type], options);


    // Set the jBox type

    jQuery.type(type) == 'string' && (this.type = type);


    // Checks if the user is on a touch device, borrowed from https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js

    this.isTouchDevice = (function () {
      var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
      var mq = function (query) {
        return window.matchMedia(query).matches;
      }

      if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
      }

      var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
      return mq(query);
    })();


    // Add close event for body click when we are on touch device and jBox triggers on mouseenter

    if (this.isTouchDevice && this.options.trigger === 'mouseenter' && this.options.closeOnClick === false) {
      this.options.closeOnClick = 'body';
    }


    // Local function to fire events

    this._fireEvent = function (event, pass)
    {
      this.options['_' + event] && (this.options['_' + event].bind(this))(pass);
      this.options[event] && (this.options[event].bind(this))(pass);
    };


    // Get a unique jBox ID

    this.options.id === null && (this.options.id = 'jBox' + jBox._getUniqueID());
    this.id = this.options.id;


    // Correct impossible options

    ((this.options.position.x == 'center' && this.options.outside == 'x') || (this.options.position.y == 'center' && this.options.outside == 'y')) && (this.options.outside = null);
    this.options.pointTo == 'target' && (!this.options.outside || this.options.outside == 'xy') && (this.options.pointer = false);


    // Correct multiple choice options

    jQuery.type(this.options.offset) != 'object' ? (this.options.offset = {x: this.options.offset, y: this.options.offset}) : (this.options.offset = jQuery.extend({x: 0, y: 0}, this.options.offset));
    jQuery.type(this.options.adjustDistance) != 'object' ? (this.options.adjustDistance = {top: this.options.adjustDistance, right: this.options.adjustDistance, bottom: this.options.adjustDistance, left: this.options.adjustDistance}) : (this.options.adjustDistance = jQuery.extend({top: 5, left: 5, right: 5, bottom: 5}, this.options.adjustDistance));


    // Save default outside position

    this.outside = this.options.outside && this.options.outside != 'xy' ? this.options.position[this.options.outside] : false;


    // Save where the jBox is aligned to

    this.align = this.outside ? this.outside : (this.options.position.y != 'center' && jQuery.type(this.options.position.y) != 'number' ? this.options.position.x : (this.options.position.x != 'center' && jQuery.type(this.options.position.x) != 'number' ? this.options.position.y : this.options.attributes.x));


    // Adjust option zIndex

    jBox.zIndexMax = Math.max(jBox.zIndexMax || 0, this.options.zIndex === 'auto' ? 10000 : this.options.zIndex);
    if (this.options.zIndex === 'auto') {
      this.adjustZIndexOnOpen = true;
      jBox.zIndexMax += 2;
      this.options.zIndex = jBox.zIndexMax;
      this.trueModal = this.options.overlay;
    }

    // Internal positioning functions

    this._getOpp = function (opp) { return {left: 'right', right: 'left', top: 'bottom', bottom: 'top', x: 'y', y: 'x'}[opp]; };
    this._getXY = function (xy) { return {left: 'x', right: 'x', top: 'y', bottom: 'y', center: 'x'}[xy]; };
    this._getTL = function (tl) { return {left: 'left', right: 'left', top: 'top', bottom: 'top', center: 'left', x: 'left', y: 'top'}[tl]; };


    // Get a dimension value in integer pixel dependent on appended element

    this._getInt = function (value, dimension) {
      if (value == 'auto') return 'auto';
      if (value && jQuery.type(value) == 'string' && value.slice(-1) == '%') {
        return jQuery(window)[dimension == 'height' ? 'innerHeight' : 'innerWidth']() * parseInt(value.replace('%', '')) / 100;
      }
      return value;
    };


    // Create an svg element

    this._createSVG = function (type, options)
    {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', type);
      jQuery.each(options, function (index, item) {
        svg.setAttribute(item[0], (item[1] || ''));
      });
      return svg;
    };


    // Isolate scrolling in a container

    this._isolateScroll = function (el)
    {
      // Abort if element not found
      if (!el || !el.length) return;

      el.on('DOMMouseScroll.jBoxIsolateScroll mousewheel.jBoxIsolateScroll', function (ev) {
        var delta = ev.wheelDelta || (ev.originalEvent && ev.originalEvent.wheelDelta) || -ev.detail;
        var overflowBottom = this.scrollTop + el.outerHeight() - this.scrollHeight >= 0;
        var overflowTop = this.scrollTop <= 0;
        ((delta < 0 && overflowBottom) || (delta > 0 && overflowTop)) && ev.preventDefault();
      });
    };


    // Set the title width to content width

    this._setTitleWidth = function ()
    {
      // Abort if there is no title or width of content is auto
      if (!this.titleContainer || (this.content[0].style.width == 'auto' && !this.content[0].style.maxWidth)) return null;

      // Expose wrapper to get actual width
      if (this.wrapper.css('display') == 'none') {
        this.wrapper.css('display', 'block');
        var contentWidth = this.content.outerWidth();
        this.wrapper.css('display', 'none');
      } else {
        var contentWidth = this.content.outerWidth();
      }

      // Set max-width only
      this.titleContainer.css({maxWidth: (Math.max(contentWidth, parseInt(this.content[0].style.maxWidth)) || null)});
    }


    // Make jBox draggable

    this._draggable = function ()
    {
      // Abort if jBox is not draggable
      if (!this.options.draggable) return false;

      // Get the handle where jBox will be dragged with
      var handle = this.options.draggable == 'title' ? this.titleContainer : (this.options.draggable instanceof jQuery ? this.options.draggable : (jQuery.type(this.options.draggable) == 'string' ? jQuery(this.options.draggable) : this.wrapper));

      // Abort if no handle or if draggable was set already
      if (!handle || !(handle instanceof jQuery) || !handle.length || handle.data('jBox-draggable')) {
        return false;
      }

      // Add mouse events
      handle.addClass('jBox-draggable').data('jBox-draggable', true).on('touchstart mousedown', function (ev)
      {
        if (ev.button == 2 || jQuery(ev.target).hasClass('jBox-noDrag') || jQuery(ev.target).parents('.jBox-noDrag').length) {
          // Hacky fix for jBox not closing on mobile devices when using draggable
          if (ev.type == 'touchstart' && (jQuery(ev.target).hasClass('jBox-closeButton') || jQuery(ev.target).parents('.jBox-closeButton').length)) {
            this.close({ignoreDelay: true});
          }
          return;
        }

        var pageX;
        var pageY;

        if (ev.type == 'touchstart' && ev.touches && ev.touches[0]) {
          pageX = ev.touches[0].pageX;
          pageY = ev.touches[0].pageY;
        } else {
          pageX = ev.pageX;
          pageY = ev.pageY;
        }

        // Store current mouse position
        this.draggingStartX = pageX;
        this.draggingStartY = pageY;

        // Adjust z-index when dragging jBox over another draggable jBox
        if (this.options.dragOver && !this.trueModal && parseInt(this.wrapper.css('zIndex'), 10) <= jBox.zIndexMaxDragover) {
          jBox.zIndexMaxDragover += 1;
          this.wrapper.css('zIndex', jBox.zIndexMaxDragover);
        }

        var drg_h = this.wrapper.outerHeight();
        var drg_w = this.wrapper.outerWidth();
        var pos_y = this.wrapper.offset().top + drg_h - pageY;
        var pos_x = this.wrapper.offset().left + drg_w - pageX;

        jQuery(document).on('touchmove.jBox-draggable-' + this.id + ' mousemove.jBox-draggable-' + this.id, function (ev) {

          var movingPageX;
          var movingPageY;

          if (ev.type == 'touchmove' && ev.touches && ev.touches[0]) {
            movingPageX = ev.touches[0].pageX;
            movingPageY = ev.touches[0].pageY;
          } else {
            movingPageX = ev.pageX;
            movingPageY = ev.pageY;
          }

          // Fire onDragStart event when jBox moves
          if (!this.dragging && this.draggingStartX != movingPageX && this.draggingStartY != movingPageY) {
            this._fireEvent('onDragStart');
            this.dragging = true;
          }

          // Adjust position
          this.wrapper.offset({
            top: movingPageY + pos_y - drg_h,
            left: movingPageX + pos_x - drg_w
          });
        }.bind(this));
        ev.preventDefault();

      }.bind(this)).on('touchend mouseup', function () {
        // Remove drag event
        jQuery(document).off('touchmove.jBox-draggable-' + this.id + ' mousemove.jBox-draggable-' + this.id);

        // Fire onDragEnd event
        this.dragging && this._fireEvent('onDragEnd');

        // Reset dragging reference
        this.dragging = false;

        if ((this.type == 'Modal' || this.type == 'Confirm') && this.options.holdPosition) {
          // Drag end captures new position
          var jBoxOffset = jQuery('#' + this.id).offset(),
            pos = {
              x: jBoxOffset.left - jQuery(document).scrollLeft(),
              y: jBoxOffset.top - jQuery(document).scrollTop()
            };
          this.position({position: pos, offset: {x: 0, y: 0}});
        }
      }.bind(this));

      // Get highest z-index
      if (!this.trueModal) {
        jBox.zIndexMaxDragover = !jBox.zIndexMaxDragover ? this.options.zIndex : Math.max(jBox.zIndexMaxDragover, this.options.zIndex);
      }

      return this;
    };

    // Create jBox

    this._create = function ()
    {
      // Abort if jBox was created already
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

      // Add mouseleave event, only close jBox when the new target is not the source element
      this.options.closeOnMouseleave && this.wrapper.on('mouseleave', function (ev) {
        !this.source || !(ev.relatedTarget == this.source[0] || jQuery.inArray(this.source[0], jQuery(ev.relatedTarget).parents('*')) !== -1) && this.close();
      }.bind(this));

      // Add closeOnClick: 'box' events
      (this.options.closeOnClick == 'box') && this.wrapper.on('click tap', function () { this.close({ignoreDelay: true}); }.bind(this));

      // Create container
      this.container = jQuery('<div class="jBox-container"/>').appendTo(this.wrapper);

      // Create content
      this.content = jQuery('<div class="jBox-content"/>').appendTo(this.container);

      // Create footer
      this.options.footer && (this.footer = jQuery('<div class="jBox-footer"/>').append(this.options.footer).appendTo(this.container));

      // Isolate scrolling
      this.options.isolateScroll && this._isolateScroll(this.content);

      // Create close button
      if (this.options.closeButton) {
        var closeButtonSVG = this._createSVG('svg', [['viewBox', '0 0 24 24']]);
        closeButtonSVG.appendChild(this._createSVG('path', [['d', 'M22.2,4c0,0,0.5,0.6,0,1.1l-6.8,6.8l6.9,6.9c0.5,0.5,0,1.1,0,1.1L20,22.3c0,0-0.6,0.5-1.1,0L12,15.4l-6.9,6.9c-0.5,0.5-1.1,0-1.1,0L1.7,20c0,0-0.5-0.6,0-1.1L8.6,12L1.7,5.1C1.2,4.6,1.7,4,1.7,4L4,1.7c0,0,0.6-0.5,1.1,0L12,8.5l6.8-6.8c0.5-0.5,1.1,0,1.1,0L22.2,4z']]));
        this.closeButton = jQuery('<div class="jBox-closeButton jBox-noDrag"/>').on('click tap', function (ev) { this.close({ignoreDelay: true}); }.bind(this)).append(closeButtonSVG);

        // Add close button to jBox container
        if (this.options.closeButton == 'box' || (this.options.closeButton === true && !this.options.overlay && !this.options.title && !this.options.getTitle)) {
          this.wrapper.addClass('jBox-closeButton-box');
          this.closeButton.appendTo(this.container);
        }
      }

      // Append jBox to DOM
      this.wrapper.appendTo(this.options.appendTo);

      // Fix adjustDistance if there is a close button in the box
      this.wrapper.find('.jBox-closeButton').length &&  jQuery.each(['top', 'right', 'bottom', 'left'], function (index, pos) {
        this.wrapper.find('.jBox-closeButton').css(pos) && this.wrapper.find('.jBox-closeButton').css(pos) != 'auto' && (this.options.adjustDistance[pos] = Math.max(this.options.adjustDistance[pos], this.options.adjustDistance[pos] + (((parseInt(this.wrapper.find('.jBox-closeButton').css(pos)) || 0) + (parseInt(this.container.css('border-' + pos + '-width')) || 0)) * -1)));
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

        this.pointer.element = jQuery('<div class="jBox-pointer jBox-pointer-' + this.pointer.position + '"/>').appendTo(this.wrapper);
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
        this.pointer.margin = {};
        this.pointer.margin['margin-' + this.pointer.alignAttribute] = this.pointer.offset;

        // Add a transform to fix centered position
        (this.pointer.align == 'center') && this.pointer.element.css('transform', 'translate(' + (this.pointer.xy == 'y' ? (this.pointer.dimensions.x * -0.5 + 'px') : 0) + ', ' + (this.pointer.xy == 'x' ? (this.pointer.dimensions.y * -0.5 + 'px') : 0) + ')');

        this.pointer.element.css((this.pointer.xy == 'x' ? 'width' : 'height'), parseInt(this.pointer.dimensions[this.pointer.xy]) + parseInt(this.container.css('border-' + this.pointer.alignAttribute + '-width')));

        // Add class to wrapper for CSS access
        this.wrapper.addClass('jBox-pointerPosition-' + this.pointer.position);
      }

      // Set title and content
      this.setContent(this.options.content, true);
      this.setTitle(this.options.title, true);

      this.options.draggable && this._draggable();

      // Fire onCreated event
      this._fireEvent('onCreated');
    };


    // Create jBox onInit

    this.options.createOnInit && this._create();


    // Attach jBox

    this.options.attach && this.attach();


    // Attach document and window events

    this._attachEvents = function ()
    {
      // Cancel countdown on mouseenter if delayOnHover
      this.options.delayOnHover && jQuery('#' + this.id).on('mouseenter', function (ev) { this.isHovered = true; }.bind(this));

      // Resume countdown on mouseleave if delayOnHover
      this.options.delayOnHover && jQuery('#' + this.id).on('mouseleave', function (ev) { this.isHovered = false; }.bind(this));

      // Positioning events
      if ((this.options.adjustPosition || this.options.reposition) && !this.fixed && this.outside) {

        // Trigger position events when scrolling
        this.options.adjustTracker && jQuery(window).on('scroll.jBox-' + this.id, function (ev) { this.position(); }.bind(this));

        // Trigger position events when resizing
        (this.options.adjustPosition || this.options.reposition) && jQuery(window).on('resize.jBox-' + this.id, function (ev) { this.position(); }.bind(this));
      }

      // Mousemove events
      this.options.target == 'mouse' && jQuery('body').on('mousemove.jBox-' + this.id, function (ev) { this.position({mouseTarget: {top: ev.pageY, left: ev.pageX}}); }.bind(this));
    };


    // Detach document and window events

    this._detachEvents = function ()
    {
      // Closing event: closeOnEsc
      this.options.closeOnEsc && jQuery(document).off('keyup.jBox-' + this.id);

      // Closing event: closeOnClick
      (this.options.closeOnClick === true || this.options.closeOnClick == 'body') && jQuery(document).off('click.jBox-' + this.id + ' tap.jBox-' + this.id);

      // Positioning events
      this.options.adjustTracker && jQuery(window).off('scroll.jBox-' + this.id);
      (this.options.adjustPosition || this.options.reposition) && jQuery(window).off('resize.jBox-' + this.id);

      // Mousemove events
      this.options.target == 'mouse' && jQuery('body').off('mousemove.jBox-' + this.id);
    };


    // Show overlay

    this._showOverlay = function ()
    {
      // Create the overlay if wasn't created already
      if (!this.overlay) {

        // Create element and append to the element where jBox is appended to
        this.overlay = jQuery('<div id="' + this.id + '-overlay"/>').addClass('jBox-overlay' + (this.type ? ' jBox-overlay-' + this.type : '')).css({
          display: 'none',
          opacity: 0,
          zIndex: this.options.zIndex - 1
        }).appendTo(this.options.appendTo);

        // Add a class name to the overlay
        this.options.overlayClass && this.overlay.addClass(this.options.overlayClass);

        // Add close button to overlay
        (this.options.closeButton == 'overlay' || this.options.closeButton === true) && this.overlay.append(this.closeButton);

        // Add closeOnClick: 'overlay' events
        this.options.closeOnClick == 'overlay' && this.overlay.on('click tap', function () { this.close({ignoreDelay: true}); }.bind(this));

        // Adjust option adjustDistance if there is a close button in the overlay
        jQuery('#' + this.id + '-overlay .jBox-closeButton').length && (this.options.adjustDistance.top = Math.max(jQuery('#' + this.id + '-overlay .jBox-closeButton').outerHeight(), this.options.adjustDistance.top));
      }

      // Adjust zIndex
      if (this.adjustZIndexOnOpen === true) {
        this.overlay.css('zIndex', parseInt(this.wrapper.css('zIndex'), 10) - 1);
      }

      // Abort if overlay is already visible
      if (this.overlay.css('display') == 'block') return;

      // Show overlay
      this.options.fade ? (this.overlay.stop() && this.overlay.animate({opacity: 1}, {
        queue: false,
        duration: this.options.fade,
        start: function () { this.overlay.css({display: 'block'}); }.bind(this)
      })) : this.overlay.css({display: 'block', opacity: 1});
    };


    // Hide overlay

    this._hideOverlay = function ()
    {
      // Abort if the overlay wasn't created yet
      if (!this.overlay) return;

      // Hide overlay if no other jBox needs it
      this.options.fade ? (this.overlay.stop() && this.overlay.animate({opacity: 0}, {
        queue: false,
        duration: this.options.fade,
        complete: function () { this.overlay.css({display: 'none'}); }.bind(this)
      })) : this.overlay.css({display: 'none', opacity: 0});
    };


    // Get the correct jBox dimensions by moving jBox out of viewport

    this._exposeDimensions = function ()
    {
      // Move wrapper out of viewport
      this.wrapper.css({
        top: -10000,
        left: -10000,
        right: 'auto',
        bottom: 'auto'
      });

      // Get jBox dimensions
      var jBoxDimensions = {
        x: this.wrapper.outerWidth(),
        y: this.wrapper.outerHeight()
      };

      // Reset position to viewport
      this.wrapper.css({
        top: 'auto',
        left: 'auto'
      });

      return jBoxDimensions;
    };


    // Generate CSS for animations and append to header

    this._generateAnimationCSS = function ()
    {
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

      // Abort if animation not found
      if (!this.options.animation) return null;

      // Get direction var
      this.options.animation.open && (this.options.animation.open = this.options.animation.open.split(':'));
      this.options.animation.close && (this.options.animation.close = this.options.animation.close.split(':'));
      this.options.animation.openDirection = this.options.animation.open[1] ? this.options.animation.open[1] : null;
      this.options.animation.closeDirection = this.options.animation.close[1] ? this.options.animation.close[1] : null;
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
      jQuery.each(['pulse', 'tada'], function (index, item) { animations[item + 'Open'] = animations[item + 'Close'] = animations[item]; });

      // Function to generate the CSS for the keyframes
      var generateKeyframeCSS = function (ev, position)
      {
        // Generate keyframes CSS
        var keyframe_css = '@keyframes jBox-' + this.id + '-animation-' + this.options.animation[ev] + '-' + ev + (position ? '-' + position : '') + ' {';
        jQuery.each(animations[this.options.animation[ev]].css, function (index, item) {
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
      jQuery.each(['open', 'close'], function (index, ev)
      {
        // No CSS needed for closing with no fade
        if (!this.options.animation[ev] || !animations[this.options.animation[ev]] || (ev == 'close' && !this.options.fade)) return '';

        // Generate CSS
        animations[this.options.animation[ev]].positions ?
          jQuery.each(['top', 'right', 'bottom', 'left'], function (index2, position) { this._animationCSS += generateKeyframeCSS(ev, position); }.bind(this)) :
          this._animationCSS += generateKeyframeCSS(ev);
      }.bind(this));

    };


    // Add css for animations

    this.options.animation && this._generateAnimationCSS();


    // Block body clicks for 10ms to prevent extra event triggering

    this._blockBodyClick = function ()
    {
      this.blockBodyClick = true;
      setTimeout(function () { this.blockBodyClick = false; }.bind(this), 10);
    };


    // Animations

    this._animate = function (ev)
    {
      // The event which triggers the animation
      !ev && (ev = this.isOpen ? 'open' : 'close');

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
      setTimeout(function () {
        this.wrapper && this.wrapper.removeClass(classnames);
      }.bind(this), animationDuration);
    };


    // Abort an animation

    this._abortAnimation = function ()
    {
      // Remove all animation classes
      var classes = this.wrapper.attr('class').split(' ').filter(function (c) {
        return c.lastIndexOf('jBox-' + this.id + '-animation', 0) !== 0;
      }.bind(this));
      this.wrapper.attr('class', classes.join(' '));
    };


    // Adjust dimensions when browser is resized

    if (this.options.responsiveWidth || this.options.responsiveHeight)
    {
      // Responsive positioning overrides options adjustPosition and reposition
      // TODO: Only add this resize event when the other one from adjustPosition and reposition was not set
      jQuery(window).on('resize.responsivejBox-' + this.id, function (ev) { if (this.isOpen) { this.position(); } }.bind(this));
    }


    // Fix audio options

    jQuery.type(this.options.preloadAudio) === 'string' && (this.options.preloadAudio = [this.options.preloadAudio]);
    jQuery.type(this.options.audio) === 'string' && (this.options.audio = {open: this.options.audio});
    jQuery.type(this.options.volume) === 'number' && (this.options.volume = {open: this.options.volume, close: this.options.volume});

    if (this.options.preloadAudio === true && this.options.audio) {
      this.options.preloadAudio = [];
      jQuery.each(this.options.audio, function (index, url) {
        this.options.preloadAudio.push(url + '.mp3');
        this.options.preloadAudio.push(url + '.ogg');
      }.bind(this));
    }


    // Preload audio files

    this.options.preloadAudio.length && jQuery.each(this.options.preloadAudio, function (index, url) {
      var audio = new Audio();
      audio.src = url;
      audio.preload = 'auto';
    });


    // Fire onInit event

    this._fireEvent('onInit');


    return this;
  };


  // Attach jBox to elements

  jBox.prototype.attach = function (elements, trigger)
  {
    // Get elements from options if none passed
    !elements && (elements = this.options.attach);

    // Convert selectors to jQuery objects
    jQuery.type(elements) == 'string' && (elements = jQuery(elements));

    // Get trigger event from options if not passed
    !trigger && (trigger = this.options.trigger);

    // Loop through elements and attach jBox
    elements && elements.length && jQuery.each(elements, function (index, el) {
      el = jQuery(el);

      // Only attach if the element wasn't attached to this jBox already
      if (!el.data('jBox-attached-' + this.id)) {

        // Remove title attribute and store content on element
        (this.options.getContent == 'title' && el.attr('title') != undefined) && el.data('jBox-getContent', el.attr('title')).removeAttr('title');

        // Add Element to collection
        this.attachedElements || (this.attachedElements = []);
        this.attachedElements.push(el[0]);

        // Add click or mouseenter event, click events can prevent default as well
        el.on(trigger + '.jBox-attach-' + this.id, function (ev)
        {
          // Clear timer
          this.timer && clearTimeout(this.timer);

          // Block opening when jbox is open and the source element is triggering
          if (trigger == 'mouseenter' && this.isOpen && this.source[0] == el[0]) return;

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
        (this.options.trigger == 'mouseenter') && el.on('mouseleave', function (ev)
        {
          // Abort if jBox wasn't created yet
          if (!this.wrapper) return null;

          // If we have set closeOnMouseleave, do not close jBox when leaving attached element and mouse is over jBox
          if (!this.options.closeOnMouseleave || !(ev.relatedTarget == this.wrapper[0] || jQuery(ev.relatedTarget).parents('#' + this.id).length)) this.close();
        }.bind(this));

        // Store
        el.data('jBox-attached-' + this.id, trigger);

        // Fire onAttach event
        this._fireEvent('onAttach', el);
      }

    }.bind(this));

    return this;
  };


  // Detach jBox from elements

  jBox.prototype.detach = function (elements)
  {
    // Get elements from stores elements if none passed
    !elements && (elements = this.attachedElements || []);

    elements && elements.length && jQuery.each(elements, function (index, el) {
      el = jQuery(el);

      // Remove events
      if (el.data('jBox-attached-' + this.id)) {
        el.off(el.data('jBox-attached-' + this.id) + '.jBox-attach-' + this.id);
        el.data('jBox-attached-' + this.id, null);
      }
      // Remove element from collection
      this.attachedElements = jQuery.grep(this.attachedElements, function (value) {
        return value != el[0];
      });
    }.bind(this));

    return this;
  };


  // Set title

  jBox.prototype.setTitle = function (title, ignore_positioning)
  {
    // Abort if title to set
    if (title == null || title == undefined) return this;

    // Create jBox if it wasn't created already
    !this.wrapper && this._create();

    // Get the width and height of wrapper, only if they change we need to reposition
    var wrapperHeight = this.wrapper.outerHeight();
    var wrapperWidth = this.wrapper.outerWidth();

    // Create title elements if they weren't created already
    if (!this.title) {
      this.titleContainer = jQuery('<div class="jBox-title"/>');
      this.title = jQuery('<div/>').appendTo(this.titleContainer);
      if (this.options.closeButton == 'title' || (this.options.closeButton === true && !this.options.overlay)) {
        this.wrapper.addClass('jBox-closeButton-title');
        this.closeButton.appendTo(this.titleContainer);
      }
      this.titleContainer.insertBefore(this.content);
      this._setTitleWidth();
    }

    // Add or remove wrapper class
    this.wrapper[title ? 'addClass' : 'removeClass']('jBox-hasTitle');

    // Set title html
    this.title.html(title);

    // Adjust width of title
    wrapperWidth != this.wrapper.outerWidth() && this._setTitleWidth();

    // Make jBox draggable
    this.options.draggable && this._draggable();

    // Reposition if dimensions changed
    !ignore_positioning && this.options.repositionOnContent && (wrapperHeight != this.wrapper.outerHeight() || wrapperWidth != this.wrapper.outerWidth()) && this.position();

    return this;
  };


  // Set content

  jBox.prototype.setContent = function (content, ignore_positioning)
  {
    // Abort if no content to set
    if (content == null || content == undefined) return this;

    // Create jBox if it wasn't created already
    !this.wrapper && this._create();

    // Get the width and height of wrapper, only if they change we need to reposition
    var wrapperHeight = this.wrapper.outerHeight();
    var wrapperWidth = this.wrapper.outerWidth();

    // Move all appended containers to body
    this.content.children('[data-jbox-content-appended]').appendTo('body').css({display: 'none'});

    // Set the new content
    switch (jQuery.type(content)) {
      case 'string':
        this.content.html(content);
        break;
      case 'object':
        if (content && (content instanceof jQuery || content.constructor.prototype.jquery)) {
          this.content.html('');
          content.attr('data-jbox-content-appended', 1).appendTo(this.content).css({display: 'block'});
        } else {
          this.content.html(JSON.stringify(content));
        }
        break;
     }

    // Adjust title width
    wrapperWidth != this.wrapper.outerWidth() && this._setTitleWidth();

    // Make jBox draggable
    this.options.draggable && this._draggable();

    // Reposition if dimensions changed
    !ignore_positioning && this.options.repositionOnContent && (wrapperHeight != this.wrapper.outerHeight() || wrapperWidth != this.wrapper.outerWidth()) && this.position();

    return this;
  };


  // Set jBox dimensions

  jBox.prototype.setDimensions = function (type, value, pos)
  {
    // Create jBox if it wasn't created already
    !this.wrapper && this._create();

    // Default value is 'auto'
    value == undefined && (value = 'auto');

    // Set CSS of content and title
    this.content.css(type, this._getInt(value));

    // Adjust title width
    type == 'width' && this._setTitleWidth();

    // Update options
    this.options[type] = value;

    // Reposition by default
    (pos == undefined || pos) && this.position();
  };


  // Set jBox width or height

  jBox.prototype.setWidth = function (value, pos) { this.setDimensions('width', value, pos); };
  jBox.prototype.setHeight = function (value, pos) { this.setDimensions('height', value, pos); };


  // Position jBox

  jBox.prototype.position = function (options)
  {
    // Options are required
    !options && (options = {});

    // Combine passed options with jBox options
    options = jQuery.extend(true, this.options, options);

    // Get the target
    this.target = options.target || this.target || jQuery(window);

    // Make sure target is a jQuery element
    !(this.target instanceof jQuery || this.target == 'mouse') && (this.target = jQuery(this.target));

    // Abort if target is missing
    if (!this.target.length) return this;

    // Reset content css to get original dimensions
    this.content.css({
      width: this._getInt(options.width, 'width'),
      height: this._getInt(options.height, 'height'),
      minWidth: this._getInt(options.minWidth, 'width'),
      minHeight: this._getInt(options.minHeight, 'height'),
      maxWidth: this._getInt(options.maxWidth, 'width'),
      maxHeight: this._getInt(options.maxHeight, 'height'),
    });

    // Reset width of title
    this._setTitleWidth();

    // Get jBox dimensions
    var jBoxDimensions = this._exposeDimensions();

    // Check if target has fixed position, store in elements data
    this.target != 'mouse' && !this.target.data('jBox-' + this.id + '-fixed') && this.target.data('jBox-' + this.id + '-fixed', (this.target[0] != jQuery(window)[0] && (this.target.css('position') == 'fixed' || this.target.parents().filter(function () { return jQuery(this).css('position') == 'fixed'; }).length > 0)) ? 'fixed' : 'static');

    // Get the window dimensions
    var windowDimensions = {
      x: jQuery(window).outerWidth(),
      y: jQuery(window).outerHeight(),
      top: (options.fixed && this.target.data('jBox-' + this.id + '-fixed') ? 0 : jQuery(window).scrollTop()),
      left: (options.fixed && this.target.data('jBox-' + this.id + '-fixed') ? 0 : jQuery(window).scrollLeft())
    };
    windowDimensions.bottom = windowDimensions.top + windowDimensions.y;
    windowDimensions.right = windowDimensions.left + windowDimensions.x;

    // Get target offset
    try { var targetOffset = this.target.offset(); } catch (e) { var targetOffset = {top: 0, left: 0}; };

    // When the target is fixed and jBox is fixed, remove scroll offset
    if (this.target != 'mouse' && this.target.data('jBox-' + this.id + '-fixed') == 'fixed' && options.fixed) {
      targetOffset.top = targetOffset.top - jQuery(window).scrollTop();
      targetOffset.left = targetOffset.left - jQuery(window).scrollLeft();
    }

    // Get target dimensions
    var targetDimensions = {
      x: this.target == 'mouse' ? 12 : this.target.outerWidth(),
      y: this.target == 'mouse' ? 20 : this.target.outerHeight(),
      top: this.target == 'mouse' && options.mouseTarget ? options.mouseTarget.top : (targetOffset ? targetOffset.top : 0),
      left: this.target == 'mouse' && options.mouseTarget ? options.mouseTarget.left : (targetOffset ? targetOffset.left : 0)
    };

    // Check if jBox is outside
    var outside = options.outside && !(options.position.x == 'center' && options.position.y == 'center');

    // Get the available space on all sides
    var availableSpace = {
      x: windowDimensions.x - options.adjustDistance.left - options.adjustDistance.right, // TODO: substract position.x when they are numbers
      y: windowDimensions.y - options.adjustDistance.top - options.adjustDistance.bottom, // TODO: substract position.x when they are numbers
      left: !outside ? 0 : (targetDimensions.left - jQuery(window).scrollLeft() - options.adjustDistance.left),
      right: !outside ? 0 : (windowDimensions.x - targetDimensions.left + jQuery(window).scrollLeft() - targetDimensions.x - options.adjustDistance.right),
      top: !outside ? 0 : (targetDimensions.top - jQuery(window).scrollTop() - this.options.adjustDistance.top),
      bottom: !outside ? 0 : (windowDimensions.y - targetDimensions.top + jQuery(window).scrollTop() - targetDimensions.y - options.adjustDistance.bottom),
    };

    // Get the default outside position, check if box will be flipped
    var jBoxOutsidePosition = {
      x: (options.outside == 'x' || options.outside == 'xy') && jQuery.type(options.position.x) != 'number' ? options.position.x : null,
      y: (options.outside == 'y' || options.outside == 'xy') && jQuery.type(options.position.y) != 'number' ? options.position.y : null
    };
    var flip = {x: false, y: false};
    (jBoxOutsidePosition.x && jBoxDimensions.x > availableSpace[jBoxOutsidePosition.x] && availableSpace[this._getOpp(jBoxOutsidePosition.x)] > availableSpace[jBoxOutsidePosition.x]) && (jBoxOutsidePosition.x = this._getOpp(jBoxOutsidePosition.x)) && (flip.x = true);
    (jBoxOutsidePosition.y && jBoxDimensions.y > availableSpace[jBoxOutsidePosition.y] && availableSpace[this._getOpp(jBoxOutsidePosition.y)] > availableSpace[jBoxOutsidePosition.y]) && (jBoxOutsidePosition.y = this._getOpp(jBoxOutsidePosition.y)) && (flip.y = true);

    // Adjust responsive dimensions
    if (options.responsiveWidth || options.responsiveHeight) {

      // Adjust width and height according to default outside position
      var adjustResponsiveWidth = function ()
      {
        if (options.responsiveWidth && jBoxDimensions.x > availableSpace[jBoxOutsidePosition.x || 'x']) {
          var contentWidth = availableSpace[jBoxOutsidePosition.x || 'x'] - (this.pointer && outside && options.outside == 'x' ? this.pointer.dimensions.x : 0) - parseInt(this.container.css('border-left-width')) - parseInt(this.container.css('border-right-width'));
          this.content.css({
            width: contentWidth > this.options.responsiveMinWidth ? contentWidth : null,
            minWidth: contentWidth < parseInt(this.content.css('minWidth')) ? 0 : null
          });
          this._setTitleWidth();
        }
        jBoxDimensions = this._exposeDimensions();

      }.bind(this);
      options.responsiveWidth && adjustResponsiveWidth();

      // After adjusting width, check if jBox will be flipped for y
      options.responsiveWidth && !flip.y && (jBoxOutsidePosition.y && jBoxDimensions.y > availableSpace[jBoxOutsidePosition.y] && availableSpace[this._getOpp(jBoxOutsidePosition.y)] > availableSpace[jBoxOutsidePosition.y]) && (jBoxOutsidePosition.y = this._getOpp(jBoxOutsidePosition.y)) && (flip.y = true);

      // Adjust width and height according to default outside position
      var adjustResponsiveHeight = function ()
      {
        if (options.responsiveHeight && jBoxDimensions.y > availableSpace[jBoxOutsidePosition.y || 'y']) {

          // Expose wrapper to get correct title height
          var exposeTitleFooterHeight = function () {
            if (!this.titleContainer && !this.footer) return 0;
            if (this.wrapper.css('display') == 'none') {
              this.wrapper.css('display', 'block');
              var height = (this.titleContainer ? this.titleContainer.outerHeight() : 0) + (this.footer ? this.footer.outerHeight() : 0);
              this.wrapper.css('display', 'none');
            } else {
              var height = (this.titleContainer ? this.titleContainer.outerHeight() : 0) + (this.footer ? this.footer.outerHeight() : 0);
            }
            return height || 0;
          }.bind(this);

          var contentHeight = availableSpace[jBoxOutsidePosition.y || 'y'] - (this.pointer && outside && options.outside == 'y' ? this.pointer.dimensions.y : 0) - exposeTitleFooterHeight() - parseInt(this.container.css('border-top-width')) - parseInt(this.container.css('border-bottom-width'));
          this.content.css({height: contentHeight > this.options.responsiveMinHeight ? contentHeight : null});
          this._setTitleWidth();
        }
        jBoxDimensions = this._exposeDimensions();

      }.bind(this);
      options.responsiveHeight && adjustResponsiveHeight();

      // After adjusting height, check if jBox will be flipped for x
      options.responsiveHeight && !flip.x && (jBoxOutsidePosition.x && jBoxDimensions.x > availableSpace[jBoxOutsidePosition.x] && availableSpace[this._getOpp(jBoxOutsidePosition.x)] > availableSpace[jBoxOutsidePosition.x]) && (jBoxOutsidePosition.x = this._getOpp(jBoxOutsidePosition.x)) && (flip.x = true);

      // Adjust width and height if jBox will be flipped
      if (options.adjustPosition && options.adjustPosition != 'move') {
        flip.x && adjustResponsiveWidth();
        flip.y && adjustResponsiveHeight();
      }
    }

    // Store new positioning vars in local var
    var pos = {};

    // Calculate positions
    var setPosition = function (p)
    {
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
    if (this.pointer && options.pointTo == 'target' && jQuery.type(options.position.x) != 'number' && jQuery.type(options.position.y) != 'number') {

      var adjustWrapper = 0;

      // Where is the pointer aligned? Add or substract accordingly
      switch (this.pointer.align) {
        case 'center':
        if (options.position[this._getOpp(options.outside)] != 'center') {
          adjustWrapper += (jBoxDimensions[this._getOpp(options.outside)] / 2);
        }
        break;
        default:
        switch (options.position[this._getOpp(options.outside)]) {
          case 'center':
            adjustWrapper += ((jBoxDimensions[this._getOpp(options.outside)] / 2) - (this.pointer.dimensions[this._getOpp(options.outside)] / 2)) * (this.pointer.align == this._getTL(this.pointer.align) ? 1 : -1);
          break;
          default:
            adjustWrapper += (this.pointer.align != options.position[this._getOpp(options.outside)]) ?

            // If pointer align is different to position align
            (jBoxDimensions[this._getOpp(options.outside)] * (jQuery.inArray(this.pointer.align, ['top', 'left']) !== -1 ? 1 : -1)) + ((this.pointer.dimensions[this._getOpp(options.outside)] / 2) * (jQuery.inArray(this.pointer.align, ['top', 'left']) !== -1 ? -1 : 1)) :

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

        if ((this.type == 'Modal' || this.type == 'Confirm')
          && jQuery.type(this.options.position.x) == 'number'
          && jQuery.type(this.options.position.y) == 'number'
        ) {
          var diffX = 0, diffY = 0;
          if (this.options.holdPosition) {

            // Adjust left or right
            if (outXL) {
              diffX = windowDimensions.left - (pos.left - (options.adjustDistance.left || 0));
            } else if (outXR) {
              diffX = windowDimensions.right - (pos.left + jBoxDimensions.x + (options.adjustDistance.right || 0));
            }

            // Adjust top or bottom
            if (outYT) {
              diffY = windowDimensions.top - (pos.top - (options.adjustDistance.top || 0));
            } else if (outYB) {
              diffY = windowDimensions.bottom - (pos.top + jBoxDimensions.y + (options.adjustDistance.bottom || 0));
            }

            this.options.position.x = Math.max(windowDimensions.top, this.options.position.x + diffX);
            this.options.position.y = Math.max(windowDimensions.left, this.options.position.y + diffY);

            setPosition('x');
            setPosition('y');
            this.wrapper.css(pos);
          }
          // Fire onPosition event
          this._fireEvent('onPosition');

          return this;
        }

        // Function to flip position
        if (options.adjustPosition === true || options.adjustPosition === 'flip') {
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
        }

        // Move jBox (only possible with pointer)
        var outMove = (this._getXY(this.outside) == 'x') ? outY : outX;

        if (this.pointer && options.pointTo == 'target' && options.adjustPosition != 'flip' && this._getXY(outMove) == this._getOpp(this._getXY(this.outside))) {

          // Get the maximum space we have availible to adjust
          if (this.pointer.align == 'center') {
            var spaceAvail = (jBoxDimensions[this._getXY(outMove)] / 2) - (this.pointer.dimensions[this._getOpp(this.pointer.xy)] / 2) - (parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) * (outMove != this._getTL(outMove) ? -1 : 1));
          } else {
            var spaceAvail = (outMove == this.pointer.alignAttribute) ?
              parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) :
              jBoxDimensions[this._getXY(outMove)] - parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) - this.pointer.dimensions[this._getXY(outMove)];
          }

          // Get the overlapping space
          var spaceDiff = (outMove == this._getTL(outMove)) ?
            windowDimensions[this._getTL(outMove)] - pos[this._getTL(outMove)] + options.adjustDistance[outMove] :
            (windowDimensions[this._getOpp(this._getTL(outMove))] - pos[this._getTL(outMove)] - options.adjustDistance[outMove] - jBoxDimensions[this._getXY(outMove)]) * -1;

          // Add overlapping space on left or top window edge
          if (outMove == this._getOpp(this._getTL(outMove)) && pos[this._getTL(outMove)] - spaceDiff < windowDimensions[this._getTL(outMove)] + options.adjustDistance[this._getTL(outMove)]) {
            spaceDiff -= windowDimensions[this._getTL(outMove)] + options.adjustDistance[this._getTL(outMove)] - (pos[this._getTL(outMove)] - spaceDiff);
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


  // Block scrolling
  // Borrowed from https://github.com/StephanWagner/unscroll

  jBox.prototype.unscroll = function (elements) {

    // Store reusable vars
    this.set = function (id, value) {
      if (!window.unscrollStore) {
        window.unscrollStore = {};
      }
      window.unscrollStore[id] = value;
    };

    // Get reusable vars
    this.get = function (id) {
      return window.unscrollStore ? window.unscrollStore[id] : null;
    };

    // Get the width of the scroll bar in pixel
    this.getScrollbarWidth = function () {
      if (this.get('scrollbarWidth')) {
        return this.get('scrollbarWidth') + 'px';
      }
      var scrollElement = document.createElement('div');
      scrollElement.style.width = '100px';
      scrollElement.style.height = '100px';
      scrollElement.style.overflow = 'scroll';
      scrollElement.style.position = 'absolute';
      scrollElement.style.top = '-10000';

      document.body.appendChild(scrollElement);
      var scrollbarWidth = scrollElement.offsetWidth - scrollElement.clientWidth;
      document.body.removeChild(scrollElement);

      this.set('scrollbarWidth', scrollbarWidth);
      return scrollbarWidth + 'px';
    }

    // Add unscroll class to head
    function addUnscrollClassName() {
      if (document.getElementById('unscroll-class-name')) {
        return;
      }
      var css = '.unscrollable { overflow: hidden !important; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
      style.type = 'text/css';
      style.setAttribute('id', 'unscroll-class-name');
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    }

    // Get the elements to adjust, force body element
    this.getElementsToAdjust = function (elements) {
      !elements && (elements = []);

      if (typeof elements === 'string') {
        elements = [
          [elements, 'padding-right']
        ];
      }

      elements.forEach(function (element, index) {
        if (typeof element === 'string') {
          elements[index] = [element, 'padding-right'];
        }
      });

      var bodyFound = false;
      for (var i = 0; i < elements.length; i++) {
        if (elements[i][0].indexOf('body') !== -1) {
          bodyFound = true;
        }
      };

      if (bodyFound === false) {
        elements.push(['body', 'padding-right']);
      }

      return elements;
    }

    this.pageHasScrollbar = function () {
      return this.getScrollbarWidth() && document.body.offsetHeight > window.innerHeight;
    }

    // Clean up elements
    if (this.pageHasScrollbar()) {
      elements = this.getElementsToAdjust(elements);

      // Loop through elements and adjust accordingly
      for (var i = 0; i < elements.length; i++) {
        var elementsDOM = document.querySelectorAll(elements[i][0]);
        for (var j = 0; j < elementsDOM.length; j++) {
          if (elementsDOM[j].getAttribute('data-unscroll')) {
            return;
          }
          var attribute = elements[i][1];
          var computedStyles = window.getComputedStyle(elementsDOM[j]);
          var computedStyle = computedStyles.getPropertyValue(attribute);
          elementsDOM[j].setAttribute('data-unscroll', attribute);
          if (!computedStyle) {
            computedStyle = '0px';
          }
          var operator = attribute == 'padding-right' || attribute == 'right' ? '+' : '-';
          elementsDOM[j].style[attribute] = 'calc(' + computedStyle + ' ' + operator + ' ' + this.getScrollbarWidth() + ')';
        }
      }
    }

    // Make the page unscrollable
    addUnscrollClassName();
    document.body.classList.add('unscrollable');
  }

  jBox.prototype.unscroll.reset = function () {
    var elements = document.querySelectorAll('[data-unscroll]');

    for (var i = 0; i < elements.length; i++) {
      var attribute = elements[i].getAttribute('data-unscroll');
      elements[i].style[attribute] = null;
      elements[i].removeAttribute('data-unscroll');
    }
    document.body.classList.remove('unscrollable');
  }


  // Open jBox

  jBox.prototype.open = function (options)
  {
    // Create blank options if none passed
    !options && (options = {});

    // Abort if jBox was destroyed
    if (this.isDestroyed) return this;

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

    // Closing event: closeOnEsc
    this.options.closeOnEsc && jQuery(document).on('keyup.jBox-' + this.id, function (ev) { if (ev.keyCode == 27) { this.close({ignoreDelay: true}); }}.bind(this));

    // Closing event: closeOnClick
    if (this.options.closeOnClick === true || this.options.closeOnClick === 'body') {
      jQuery('body').on('click.jBox-' + this.id + ' tap.jBox-' + this.id, function (ev) {
        if (this.blockBodyClick || (this.options.closeOnClick == 'body' && (ev.target == this.wrapper[0] || this.wrapper.has(ev.target).length))) return;
        this.close({ignoreDelay: true});
      }.bind(this));

      // Fix for iOS event bubbling issue
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      this.isTouchDevice && jQuery('body > *').on('click.jBox-' + this.id + ' tap.jBox-' + this.id, function () {
        return true;
      });
    }

    // Opening function
    var open = function () {

      // Adjust zIndex
      if (this.adjustZIndexOnOpen === true) {
        jBox.zIndexMax = Math.max(
          parseInt(this.wrapper.css('zIndex'), 10),
          this.options.zIndex,
          jBox.zIndexMax || 0,
          jBox.zIndexMaxDragover || 0
        ) + 2;
        this.wrapper.css('zIndex', jBox.zIndexMax);
        this.options.zIndex = jBox.zIndexMax;
      }

      // Set title from source element
      this.source && this.options.getTitle && (this.source.attr(this.options.getTitle) && this.setTitle(this.source.attr(this.options.getTitle), true));

      // Set content from source element
      this.source && this.options.getContent && (this.source.data('jBox-getContent') ? this.setContent(this.source.data('jBox-getContent'), true) : (this.source.attr(this.options.getContent) ? this.setContent(this.source.attr(this.options.getContent), true) : (this.options.getContent == 'html' ? this.setContent(this.source.html(), true) : null)));

      // Fire onOpen event
      this._fireEvent('onOpen');

      // Get content from ajax
      if ((this.options.ajax && (this.options.ajax.url || (this.source && this.source.attr(this.options.ajax.getURL))) && (!this.ajaxLoaded || this.options.ajax.reload)) || (options.ajax && (options.ajax.url || options.ajax.data))) {
        // Send the content from stored data if there is any, otherwise load new data
        (this.options.ajax.reload != 'strict' && this.source && this.source.data('jBox-ajax-data') && !(options.ajax && (options.ajax.url || options.ajax.data))) ? this.setContent(this.source.data('jBox-ajax-data')) : this.ajax((options.ajax || null), true);
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
        if (this.options.blockScroll) {
          if (this.options.blockScrollAdjust) {
            if (jBox.blockScrollScopes) {
              jBox.blockScrollScopes++;
            } else {
              jBox.blockScrollScopes = 1;
              this.unscroll(Array.isArray(this.options.blockScrollAdjust) || typeof this.options.blockScrollAdjust === 'string' ? this.options.blockScrollAdjust : null);
            }
          } else {
            jQuery('body').addClass('jBox-blockScroll-' + this.id);
          }
        }

        // Show overlay
        if (this.options.overlay) {
          this._showOverlay();

          // TODO Optimize: We have to position here again, because if the overlay has a close button, the upper adjustDistance will be wrong
          this.position();
        }

        // Only animate if jBox is completely closed
        this.options.animation && !this.isClosing && this._animate('open');

        // Play audio file
        this.options.audio && this.options.audio.open && this.audio(this.options.audio.open, this.options.volume.open);

        // Fading animation or show immediately
        if (this.options.fade) {
          this.wrapper.stop().animate({opacity: 1}, {
            queue: false,
            duration: this.options.fade,
            start: function () {
              this.isOpening = true;
              this.wrapper.css({display: 'block'});
            }.bind(this),
            complete: function () {
              this._fireEvent('onOpenComplete');
            }.bind(this),
            always: function () {
              this.isOpening = false;

              // Delay positioning for ajax to prevent positioning during animation
              setTimeout(function () { this.positionOnFadeComplete && this.position() && (this.positionOnFadeComplete = false); }.bind(this), 10);
            }.bind(this)
          });
        } else {
          this.wrapper.css({display: 'block', opacity: 1});
          this.positionOnFadeComplete && this.position() && (this.positionOnFadeComplete = false);
          this._fireEvent('onOpenComplete');
        }
      }
    }.bind(this);

    // Open jBox
    this.options.delayOpen && !this.isOpen && !this.isClosing && !options.ignoreDelay ? (this.timer = setTimeout(open, this.options.delayOpen)) : open();

    return this;
  };


  // Close jBox

  jBox.prototype.close = function (options)
  {
    // Create blank options if none passed
    options || (options = {});

    // Remove close events
    jQuery('body').off('click.jBox-' + this.id + ' tap.jBox-' + this.id);
    this.isTouchDevice && jQuery('body > *').off('click.jBox-' + this.id + ' tap.jBox-' + this.id);

    // Abort if jBox was destroyed or is currently closing
    if (this.isDestroyed || this.isClosing) return this;

    // Abort opening
    this.timer && clearTimeout(this.timer);

    // Block body click for 10ms, so jBox can open on attached elements while closeOnClick = 'body' is true
    this._blockBodyClick();

    // Block closing
    if (this.isDisabled) return this;

    // Close function
    var close = function () {

      // Fire onClose event
      this._fireEvent('onClose');

      // Cancel the ajax call
      if (this.options.cancelAjaxOnClose) {
        this.cancelAjax();
      }

      // Only close if jBox is open
      if (this.isOpen) {

        // jBox is not open anymore
        this.isOpen = false;

        // Detach events
        this._detachEvents();

        // Unblock scrolling
        if (this.options.blockScroll) {
          if (this.options.blockScrollAdjust) {
            jBox.blockScrollScopes = jBox.blockScrollScopes ? --jBox.blockScrollScopes : 0;
            !jBox.blockScrollScopes && this.unscroll.reset();
          } else {
            jQuery('body').removeClass('jBox-blockScroll-' + this.id);
          }
        }

        // Hide overlay
        this.options.overlay && this._hideOverlay();

        // Only animate if jBox is compleately closed
        this.options.animation && !this.isOpening && this._animate('close');

        // Play audio file
        this.options.audio && this.options.audio.close && this.audio(this.options.audio.close, this.options.volume.close);

        // Get fade duration
        var fadeDuration = this.isTouchDevice && this.options.target == 'mouse' ? 0 : this.options.fade;

        // Fading animation or show immediately
        if (fadeDuration) {
          this.wrapper.stop().animate({opacity: 0}, {
            queue: false,
            duration: fadeDuration,
            start: function () {
              this.isClosing = true;
            }.bind(this),
            complete: function () {
              this.wrapper.css({display: 'none'});
              this._fireEvent('onCloseComplete');
            }.bind(this),
            always: function () {
              this.isClosing = false;
            }.bind(this)
          });
        } else {
          this.wrapper.css({display: 'none', opacity: 0});
          this._fireEvent('onCloseComplete');
        }
      }
    }.bind(this);

    // Close jBox
    if (options.ignoreDelay || (this.isTouchDevice && this.options.target == 'mouse')) {
      close();
    } else if ((this.options.delayOnHover || this.options.showCountdown) && this.options.delayClose > 10) {
      var self = this;
      var remaining = this.options.delayClose;
      var prevFrame = Date.now();
      if (this.options.showCountdown && !this.inner) {
        var outer = jQuery('<div class="jBox-countdown" />');
        this.inner = jQuery('<div class="jBox-countdown-inner" />');
        outer.prepend(this.inner);
        jQuery('#' + this.id).append(outer);
      }
      this.countdown = function(){
        var dateNow = Date.now();
        if (!self.isHovered) {
          remaining -= dateNow - prevFrame;
        }
        prevFrame = dateNow;
        if (remaining > 0) {
          if (self.options.showCountdown) {
            self.inner.css('width', (remaining * 100 / self.options.delayClose) + '%');
          }
          window.requestAnimationFrame(self.countdown);
        } else {
          close();
        }
      };
      window.requestAnimationFrame(this.countdown);
    } else {
      this.timer = setTimeout(close, Math.max(this.options.delayClose, 10));
    }

    return this;
  };


  // Open or close jBox

  jBox.prototype.toggle = function (options)
  {
    this[this.isOpen ? 'close' : 'open'](options);
    return this;
  };


  // Block opening and closing

  jBox.prototype.disable = function ()
  {
    this.isDisabled = true;
    return this;
  };


  // Unblock opening and closing

  jBox.prototype.enable = function ()
  {
    this.isDisabled = false;
    return this;
  };


  // Hide jBox

  jBox.prototype.hide = function ()
  {
    this.disable();
    if (this.wrapper) {
      this.cacheWrapperDisplay = this.wrapper.css('display');
      this.wrapper.css({display: 'none'});
    }
    if (this.overlay) {
      this.cacheOverlayDisplay = this.overlay.css('display');
      this.overlay.css({display: 'none'});
    }
    return this;
  };


  // Show jBox

  jBox.prototype.show = function ()
  {
    this.enable();
    if (this.wrapper && this.cacheWrapperDisplay) {
      this.wrapper.css({display: this.cacheWrapperDisplay});
      this.cacheWrapperDisplay = null;
    }
    if (this.overlay && this.cacheOverlayDisplay) {
      this.overlay.css({display: this.cacheOverlayDisplay});
      this.cacheOverlayDisplay = null;
    }
    return this;
  };


  // Get content from ajax

  jBox.prototype.ajax = function (options, opening)
  {
    options || (options = {});

    // Add data or url from source element if none set in options
    jQuery.each([['getData', 'data'], ['getURL', 'url']], function (index, item) {
      (this.options.ajax[item[0]] && !options[item[1]] && this.source && this.source.attr(this.options.ajax[item[0]]) != undefined) && (options[item[1]] = this.source.attr(this.options.ajax[item[0]]) || '');
    }.bind(this));

    // Clone the system options
    var sysOptions = jQuery.extend(true, {}, this.options.ajax);

    // Abort running ajax call
    this.cancelAjax();

    // Extract events
    var beforeSend = options.beforeSend || sysOptions.beforeSend || function () {};
    var complete = options.complete || sysOptions.complete || function () {};
    var success = options.success || sysOptions.success || function () {};
    var error = options.error || sysOptions.error || function () {};

    // Merge options
    var userOptions = jQuery.extend(true, sysOptions, options);

    // Set new beforeSend event
    userOptions.beforeSend = function (xhr)
    {
      // jBox is loading
      userOptions.loadingClass && this.wrapper.addClass(userOptions.loadingClass === true ? 'jBox-loading' : userOptions.loadingClass);

      // Add loading spinner
      userOptions.spinner && (this.spinnerDelay = setTimeout(function ()
      {
        // Add class for loading spinner
        this.wrapper.addClass('jBox-loading-spinner');

        // Reposition jBox
        // TODO: Only reposition if dimensions change
        userOptions.spinnerReposition && (opening ? (this.positionOnFadeComplete = true) : this.position());

        // Add spinner to container
        this.spinner = jQuery(userOptions.spinner !== true ? userOptions.spinner : '<div class="jBox-spinner"></div>').appendTo(this.container);

        // Fix spinners position if there is a title
        this.titleContainer && this.spinner.css('position') == 'absolute' && this.spinner.css({transform: 'translateY(' + (this.titleContainer.outerHeight() * 0.5) + 'px)'});

      }.bind(this), (this.content.html() == '' ? 0 : (userOptions.spinnerDelay || 0))));

      // Fire users beforeSend event
      (beforeSend.bind(this))(xhr);

    }.bind(this);

    // Set up new complete event
    userOptions.complete = function (response)
    {
      // Abort spinner timeout
      this.spinnerDelay && clearTimeout(this.spinnerDelay);

      // jBox finished loading
      this.wrapper.removeClass('jBox-loading jBox-loading-spinner jBox-loading-spinner-delay');

      // Remove spinner
      this.spinner && this.spinner.length && this.spinner.remove() && userOptions.spinnerReposition && (opening ? (this.positionOnFadeComplete = true) : this.position());

      // Store that ajax loading finished
      this.ajaxLoaded = true;

      // Fire users complete event
      (complete.bind(this))(response);

    }.bind(this);

    // Set up new success event
    userOptions.success = function (response)
    {
      // Set content
      userOptions.setContent && this.setContent(response, true) && (opening ? (this.positionOnFadeComplete = true) : this.position());

      // Store content in source element
      userOptions.setContent && this.source && this.source.data('jBox-ajax-data', response);

      // Fire users success event
      (success.bind(this))(response);

    }.bind(this);

    // Add error event
    userOptions.error = function (response) { (error.bind(this))(response); }.bind(this);

    // Send new ajax request
    this.ajaxRequest = jQuery.ajax(userOptions);

    return this;
  };


  // Abort an ajax call

  jBox.prototype.cancelAjax = function () {
    if (this.ajaxRequest) {
      this.ajaxRequest.abort();
      this.ajaxLoaded = false;
    }
  };


  // Play an audio file

  jBox.prototype.audio = function (url, volume)
  {
    // URL is required
    if (!url) return this;

    // Create intern audio object if it wasn't created already
    !jBox._audio && (jBox._audio = {});

    // Create an audio element specific to this audio file if it doesn't exist already
    if (!jBox._audio[url]) {
      var audio = jQuery('<audio/>');
      jQuery('<source/>', {src: url + '.mp3'}).appendTo(audio);
      jQuery('<source/>', {src: url + '.ogg'}).appendTo(audio);
      jBox._audio[url] = audio[0];
    }

    // Set volume
    jBox._audio[url].volume = Math.min(((volume != undefined ? volume : 100) / 100), 1);

    // Try to pause current audio
    try {
      jBox._audio[url].pause();
      jBox._audio[url].currentTime = 0;
    } catch (e) {}

    // Play audio
    jBox._audio[url].play();

    return this;
  };

  // Apply custom animations to jBox (being used in playground demos)

  jBox._animationSpeeds = {
    'tada': 1000,
    'tadaSmall': 1000,
    'flash': 500,
    'shake': 400,
    'pulseUp': 250,
    'pulseDown': 250,
    'popIn': 250,
    'popOut': 250,
    'fadeIn': 200,
    'fadeOut': 200,
    'slideUp': 400,
    'slideRight': 400,
    'slideLeft': 400,
    'slideDown': 400
  };

  jBox.prototype.animate = function (animation, options)
  {
    // Options are required
    !options && (options = {});

    // Timout needs to be an object
    !this.animationTimeout && (this.animationTimeout = {});

    // Use jBox wrapper by default
    !options.element && (options.element = this.wrapper);

    // Give the element an unique id
    !options.element.data('jBox-animating-id') && options.element.data('jBox-animating-id', jBox._getUniqueElementID());

    // Abort if element is animating
    if (options.element.data('jBox-animating')) {
      options.element.removeClass(options.element.data('jBox-animating')).data('jBox-animating', null);
      this.animationTimeout[options.element.data('jBox-animating-id')] && clearTimeout(this.animationTimeout[options.element.data('jBox-animating-id')]);
    }

    // Animate the element
    options.element.addClass('jBox-animated-' + animation).data('jBox-animating', 'jBox-animated-' + animation);
    this.animationTimeout[options.element.data('jBox-animating-id')] = setTimeout((function() { options.element.removeClass(options.element.data('jBox-animating')).data('jBox-animating', null); options.complete && options.complete(); }), jBox._animationSpeeds[animation]);
  };

  // https://gist.github.com/AlexEmashev/ee8302b5036b01362f63dab35948401f
  jBox.prototype.swipeDetector = function (swipeTarget, options) {
    // States: 0 - no swipe, 1 - swipe started, 2 - swipe released
    var swipeState = 0;
    // Coordinates when swipe started
    var startX = 0;
    var startY = 0;
    // Distance of swipe
    var pixelOffsetX = 0;
    var pixelOffsetY = 0;

    var defaultSettings = {
      // Amount of pixels, when swipe don't count.
      swipeThreshold: 70,
      // Flag that indicates that plugin should react only on touch events.
      // Not on mouse events too.
      useOnlyTouch: false
    };

    // Initializer
    (function init() {
      options = jQuery.extend(defaultSettings, options);
      // Support touch and mouse as well.
      swipeTarget.on("mousedown touchstart", swipeStart);
      jQuery("html").on("mouseup touchend", swipeEnd);
      jQuery("html").on("mousemove touchmove", swiping);
    })();

    function swipeStart(event) {
      if (options.useOnlyTouch && !event.originalEvent.touches) {
        return;
      }

      if (event.originalEvent.touches) {
        event = event.originalEvent.touches[0];
      }

      if (swipeState === 0) {
        swipeState = 1;
        startX = event.clientX;
        startY = event.clientY;
      }
    }

    function swipeEnd(event) {
      if (swipeState === 2) {
        swipeState = 0;

        if (
          Math.abs(pixelOffsetX) > Math.abs(pixelOffsetY) &&
          Math.abs(pixelOffsetX) > options.swipeThreshold
        ) {
          // Horizontal Swipe
          if (pixelOffsetX < 0) {
            swipeTarget.trigger(jQuery.Event("swipeLeft.sd"));
          } else {
            swipeTarget.trigger(jQuery.Event("swipeRight.sd"));
          }
        } else if (Math.abs(pixelOffsetY) > options.swipeThreshold) {
          // Vertical swipe
          if (pixelOffsetY < 0) {
            swipeTarget.trigger(jQuery.Event("swipeUp.sd"));
          } else {
            swipeTarget.trigger(jQuery.Event("swipeDown.sd"));
          }
        }
      }
    }

    function swiping(event) {
      // If swipe don't occuring, do nothing.
      if (swipeState !== 1) return;

      if (event.originalEvent.touches) {
        event = event.originalEvent.touches[0];
      }

      var swipeOffsetX = event.clientX - startX;
      var swipeOffsetY = event.clientY - startY;

      if (
        Math.abs(swipeOffsetX) > options.swipeThreshold ||
        Math.abs(swipeOffsetY) > options.swipeThreshold
      ) {
        swipeState = 2;
        pixelOffsetX = swipeOffsetX;
        pixelOffsetY = swipeOffsetY;
      }
    }

    return swipeTarget; // Return element available for chaining.
  }


  // Destroy jBox and remove it from DOM

  jBox.prototype.destroy = function ()
  {
    // Detach from attached elements
    this.detach();

    // If jBox is open, close without delay
    this.isOpen && this.close({ignoreDelay: true});

    // Remove wrapper
    this.wrapper && this.wrapper.remove();

    // Remove overlay
    this.overlay && this.overlay.remove();

    // Remove styles
    this._styles && this._styles.remove();

    // Tell the jBox instance it is destroyed
    this.isDestroyed = true;

    return this;
  };


  // Get a unique ID for jBoxes

  jBox._getUniqueID = (function ()
  {
    var i = 1;
    return function () { return i++; };
  }());


  // Get a unique ID for animating elements

  jBox._getUniqueElementID = (function ()
  {
    var i = 1;
    return function () { return i++; };
  }());


  // Function to create jBox plugins

  jBox._pluginOptions = {};
  jBox.plugin = function (type, options)
  {
    jBox._pluginOptions[type] = options;
  };


  // Make jBox usable with jQuery selectors

  jQuery.fn.jBox = function (type, options) {
    // Variables type and object are required
    !type && (type = {});
    !options && (options = {});

    // Return a new instance of jBox with the selector as attached element
    return new jBox(type, jQuery.extend(options, {
      attach: this
    }));
  };

  return jBox;

};

/**
 * jBox Confirm plugin: Add a confirm dialog to links, buttons, etc.
 *
 * Author: Stephan Wagner <stephanwagner.me@gmail.com> (https://stephanwagner.me)
 *
 * License: MIT (https://opensource.org/licenses/MIT)
 *
 * Requires: jBox (https://cdn.jsdelivr.net/gh/StephanWagner/jBox@latest/dist/jBox.min.js)
 */

function jBoxConfirmWrapper(jBox, jQuery) {

  new jBox.plugin('Confirm', {


    // Options (https://stephanwagner.me/jBox/options#options-confirm)

    confirmButton: 'Submit',  // Text for the submit button
    cancelButton: 'Cancel',   // Text for the cancel button
    confirm: null,            // Function to execute when clicking the submit button. By default jBox will use the onclick or href attribute in that order if found
    cancel: null,             // Function to execute when clicking the cancel button
    closeOnConfirm: true,     // Close jBox when the user clicks the confirm button
    target: window,
    fixed: true,
    attach: '[data-confirm]',
    getContent: 'data-confirm',
    content: 'Do you really want to do this?',
    minWidth: 360,
    maxWidth: 500,
    blockScroll: true,
    closeOnEsc: true,
    closeOnClick: false,
    closeButton: false,
    overlay: true,
    animation: 'zoomIn',
    preventDefault: true,


    // Triggered when jBox is attached to the element

    _onAttach: function (el)
    {
      // Extract the href or the onclick event if no submit event is passed
      if (!this.options.confirm) {
        var submit = el.attr('onclick') ? el.attr('onclick') : (
          el.attr('href') ? (
            el.attr('target') ? 'window.open("' + el.attr('href') + '", "' + el.attr('target') + '");'  : 'window.location.href = "' + el.attr('href') + '";'
          ) : '');
        el.prop('onclick', null).data('jBox-Confirm-submit', submit);
      }
    },


    // Triggered when jBox was created

    _onCreated: function ()
    {
      // Add modal class to mimic jBox modal
      this.wrapper.addClass('jBox-Modal');

      // Add a footer to the jBox container
      this.footer = jQuery('<div class="jBox-Confirm-footer"/>');

      jQuery('<div class="jBox-Confirm-button jBox-Confirm-button-cancel"/>')
        .html(this.options.cancelButton)
        .on('click tap', function () {
          this.options.cancel && this.options.cancel(this.source);
          this.close();
        }.bind(this))
        .appendTo(this.footer);

      this.submitButton = jQuery('<div class="jBox-Confirm-button jBox-Confirm-button-submit"/>')
        .html(this.options.confirmButton)
        .appendTo(this.footer);

      this.footer.appendTo(this.container);
    },


    // Triggered when jBox is opened

    _onOpen: function ()
    {
      // Set the new action for the submit button
      this.submitButton
        .off('click.jBox-Confirm' + this.id + ' tap.jBox-Confirm' + this.id)
        .on('click.jBox-Confirm' + this.id + ' tap.jBox-Confirm' + this.id, function () {
          this.options.confirm ? this.options.confirm(this.source) : eval(this.source.data('jBox-Confirm-submit'));
          this.options.closeOnConfirm && this.close();
        }.bind(this));
    }

  });

};

/**
 * jBox Image plugin: Adds a lightbox to your images
 *
 * Author: Stephan Wagner <stephanwagner.me@gmail.com> (https://stephanwagner.me)
 *
 * License: MIT (https://opensource.org/licenses/MIT)
 *
 * Requires: jBox (https://cdn.jsdelivr.net/gh/StephanWagner/jBox@latest/dist/jBox.min.js)
 */

function jBoxImageWrapper(jBox, jQuery) {

  new jBox.plugin('Image', {


    // Options (https://stephanwagner.me/jBox/options#options-image)

    src: 'href',                 // The attribute where jBox gets the image source from, e.g. href="/path_to_image/image.jpg"
    gallery: 'data-jbox-image',  // The attribute to set the galleries, e.g. data-jbox-image="gallery1"
    imageLabel: 'title',         // The attribute where jBox gets the image label from, e.g. title="My label"
    imageFade: 360,              // The fade duration for images in ms
    imageSize: 'contain',        // How to display the images. Use CSS background-position values, e.g. 'cover', 'contain', 'auto', 'initial', '50% 50%'
    imageCounter: false,         // Set to true to add an image counter, e.g. 4/20
    imageCounterSeparator: '/',  // HTML to separate the current image number from all image numbers, e.g. '/' or ' of '
    downloadButton: false,       // Adds a download button
    downloadButtonText: null,    // Text for the download button
    downloadButtonUrl: null,     // The attribute at the source element where to find the image to download, e.g. data-download="/path_to_image/image.jpg". If none provided, the currently active image will be downloaded
    mobileImageAttr: null,       // The attribute to look for an mobile version of the image
    mobileImageBreakpoint: null, // The upper breakpoint to load the mobile image
    preloadFirstImage: false,    // Preload the first image when page is loaded
    target: window,
    attach: '[data-jbox-image]',
    fixed: true,
    blockScroll: true,
    closeOnEsc: true,
    closeOnClick: 'button',
    closeButton: true,
    overlay: true,
    animation: 'zoomIn',
    preventDefault: true,
    width: '100%',
    height: '100%',
    adjustDistance: {
      top: 40,
      right: 0,
      bottom: 40,
      left: 0
    },


    // Triggered when jBox is initialized

    _onInit: function ()
    {
      // Initial images and z-index
      this.images = this.currentImage = {};
      this.imageZIndex = 1;

      this.initImage = function (item) {
        item = jQuery(item);

        // Abort if the item was added to a gallery already
        if (item.data('jBox-image-gallery')) {
          return;
        }

        // Get the image src
        var src = item.attr(this.options.src);

        // Update responsive image src
        if (this.options.mobileImageAttr && this.options.mobileImageBreakpoint && item.attr(this.options.mobileImageAttr)) {
          if (jQuery(window).width() <= this.options.mobileImageBreakpoint) {
            src = item.attr(this.options.mobileImageAttr);
          }
        }

        // Add item to a gallery
        var gallery = item.attr(this.options.gallery) || 'default';
        !this.images[gallery] && (this.images[gallery] = []);
        this.images[gallery].push({
          src: src,
          label: (item.attr(this.options.imageLabel) || ''),
          downloadUrl: this.options.downloadButtonUrl && item.attr(this.options.downloadButtonUrl) ? item.attr(this.options.downloadButtonUrl) : null
        });

        // Remove the title attribute so it won't show the browsers tooltip
        this.options.imageLabel == 'title' && item.removeAttr('title');

        // Store data in source element for easy access
        item.data('jBox-image-gallery', gallery);
        item.data('jBox-image-id', (this.images[gallery].length - 1));
      }.bind(this);

      // Loop through images, sort and save in global variable
      this.attachedElements && this.attachedElements.length && jQuery.each(this.attachedElements, function (index, item) {
        this.initImage(item);
      }.bind(this));

      // Helper to inject the image into content area
      var appendImage = function (gallery, id, show, instant) {
        // Abort if image was appended already
        if (jQuery('#jBox-image-' + gallery + '-' + id).length) {
          return;
        }

        // Create image container
        var image = jQuery('<div/>', {
          id: 'jBox-image-' + gallery + '-' + id,
          'class': 'jBox-image-container' + (show ? ' jBox-image-' + gallery + '-current' : '')
        }).css({
          backgroundSize: this.options.imageSize,
          opacity: (instant ? 1 : 0),
          zIndex: (show ? this.imageZIndex++ : 0)
        }).appendTo(this.content);

        // Add swipe events
        this.swipeDetector(image)
          .on("swipeLeft.sd swipeRight.sd", function (event) {
            if (event.type === "swipeLeft") {
              this.showImage('next');
            } else if (event.type === "swipeRight") {
              this.showImage('prev');
            }
          }.bind(this));

        // Create labels
        jQuery('<div/>', {
          id: 'jBox-image-label-' + gallery + '-' + id,
          'class': 'jBox-image-label' + (show ? ' active' : '')
        })
        .html(this.images[gallery][id].label)
        .on('click tap', function () {
          jQuery(this).toggleClass('expanded');
        })
        .appendTo(this.imageLabelContainer);

        // Show image
        show && image.animate({opacity: 1}, instant ? 0 : this.options.imageFade);

        return image;
      }.bind(this);

      // Function to download an image
      this.downloadImage = function (imageUrl) {
        var link = document.createElement('a');
        link.href = imageUrl;
        link.setAttribute('download', imageUrl.substring(imageUrl.lastIndexOf('/')+1));
        document.body.appendChild(link);
        link.click();
      };

      // Helper to show new image label
      var showLabel = function (gallery, id) {
        jQuery('.jBox-image-label.active').removeClass('active expanded');
        jQuery('#jBox-image-label-' + gallery + '-' + id).addClass('active');
      };

      // Helper to load image
      var loadImage = function (gallery, id, show, instant) {
        var imageContainer = appendImage(gallery, id, show, instant);
        imageContainer.addClass('jBox-image-loading');

        jQuery('<img src="' + this.images[gallery][id].src + '" />').each(function () {
          var tmpImg = new Image();
          tmpImg.onload = function () {
            imageContainer.removeClass('jBox-image-loading');
            imageContainer.css({backgroundImage: 'url("' + this.images[gallery][id].src + '")'});
          }.bind(this);

          tmpImg.onerror = function () {
            imageContainer.removeClass('jBox-image-loading');
            imageContainer.addClass('jBox-image-not-found');
          }.bind(this);

          tmpImg.src = this.images[gallery][id].src;
        }.bind(this));
      }.bind(this);

      // Show images when they are loaded or load them if not
      this.showImage = function (img) {
        // Get the gallery and the image id from the next or the previous image
        var gallery;
        var id;

        if (img != 'open') {
          gallery = this.currentImage.gallery;
          id = this.currentImage.id + (1 * (img == 'prev') ? -1 : 1);
          id = id > (this.images[gallery].length - 1) ? 0 : (id < 0 ? (this.images[gallery].length - 1) : id);

        // Or get image data from source element
        } else {
          // Get gallery and image id from source element
          if (this.source) {
            gallery = this.source.data('jBox-image-gallery');
            id = this.source.data('jBox-image-id');

          // Get gallery and image id attached elements
          } else if (this.attachedElements && this.attachedElements.length) {
            gallery = jQuery(this.attachedElements[0]).data('jBox-image-gallery');
            id = jQuery(this.attachedElements[0]).data('jBox-image-id');
          } else {
            return;
          }

          // Remove or show the next and prev buttons
          if (this.images && this.images[gallery]) {
            jQuery('.jBox-image-pointer-prev, .jBox-image-pointer-next').css({display: (this.images[gallery].length > 1 ? 'block' : 'none')});
          }
        }

        // If there is a current image already shown, hide it
        if (jQuery('.jBox-image-' + gallery + '-current').length) {
          jQuery('.jBox-image-' + gallery + '-current').removeClass('jBox-image-' + gallery + '-current').animate({opacity: 0}, (img == 'open') ? 0 : this.options.imageFade);
        }

        // Set new current image
        this.currentImage = {gallery: gallery, id: id};

        // Show image if it already exists
        if (jQuery('#jBox-image-' + gallery + '-' + id).length) {
          jQuery('#jBox-image-' + gallery + '-' + id).addClass('jBox-image-' + gallery + '-current').css({zIndex: this.imageZIndex++, opacity: 0}).animate({opacity: 1}, (img == 'open') ? 0 : this.options.imageFade);

        // Load image
        } else {
          loadImage(gallery, id, true, (img === 'open'));
        }

        // Show label
        showLabel(gallery, id);

        // Update the image counter numbers
        if (this.imageCounter) {
          if (this.images[gallery] && this.images[gallery].length > 1) {
            this.wrapper.addClass('jBox-image-has-counter');
            this.imageCounter.find('.jBox-image-counter-all').html(this.images[gallery].length);
            this.imageCounter.find('.jBox-image-counter-current').html(id + 1);
          } else {
            this.wrapper.removeClass('jBox-image-has-counter');
          }
        }

        // Preload next image
        if (this.images[gallery] && this.images[gallery].length - 1) {
	        var next_id = id + 1;
	        next_id = next_id > (this.images[gallery].length - 1) ? 0 : (next_id < 0 ? (this.images[gallery].length - 1) : next_id);

	        if (!jQuery('#jBox-image-' + gallery + '-' + next_id).length) {
            loadImage(gallery, next_id, false, false);
          }
	      }
      };

      // Preload image
      if (this.options.preloadFirstImage) {
        jQuery(window).on('load', function() {
          this.showImage('open');
        }.bind(this));
      }
    },


    // Triggered when jBox attaches a new element

    _onAttach: function (item) {
      this.initImage && this.initImage(item);
    },


    // Triggered when jBox was created

    _onCreated: function ()
    {
      // Create image label and navigation buttons
      this.imageLabelWrapper = jQuery('<div class="jBox-image-label-wrapper"/>').appendTo(this.wrapper);

      this.imagePrevButton = jQuery('<div class="jBox-image-pointer-prev"/>')
        .on('click tap', function () {
          this.showImage('prev');
        }.bind(this));

      this.imageNextButton = jQuery('<div class="jBox-image-pointer-next"/>')
        .on('click tap', function () {
          this.showImage('next');
        }.bind(this));

      this.imageLabelContainer = jQuery('<div class="jBox-image-label-container"/>');

      this.imageLabelWrapper
        .append(this.imagePrevButton)
        .append(this.imageLabelContainer)
        .append(this.imageNextButton);

      // Append the download button
      if (this.options.downloadButton) {
        this.downloadButton = jQuery('<div/>', {'class': 'jBox-image-download-button-wrapper'})
          .appendTo(this.wrapper)
          .append(
            this.options.downloadButtonText ? jQuery('<div/>', {'class': 'jBox-image-download-button-text'}).html(this.options.downloadButtonText) : null
          )
          .append(
            jQuery('<div/>', {'class': 'jBox-image-download-button-icon'})
          ).on('click tap', function () {
            if (this.images[this.currentImage.gallery][this.currentImage.id].downloadUrl) {
              var currentImageUrl = this.images[this.currentImage.gallery][this.currentImage.id].downloadUrl;
            } else {
              var currentImage = this.wrapper.find('.jBox-image-' + this.currentImage.gallery + '-current');
              var currentImageStyle = currentImage[0].style.backgroundImage;
              var currentImageUrl = currentImageStyle.slice(4, -1).replace(/["']/g, '');
            }
            this.downloadImage(currentImageUrl);
          }.bind(this));
      }

      // Creating the image counter containers
      if (this.options.imageCounter) {
        this.imageCounter = jQuery('<div/>', {'class': 'jBox-image-counter-container'}).insertAfter(this.imageLabelContainer);
        this.imageCounter.append(jQuery('<span/>', {'class': 'jBox-image-counter-current'})).append(jQuery('<span/>').html(this.options.imageCounterSeparator)).append(jQuery('<span/>', {'class': 'jBox-image-counter-all'}));
      }
    },


    // Triggered when jBox opens

    _onOpen: function ()
    {
      // Add key events
      jQuery(document).on('keyup.jBox-Image-' + this.id, function (ev) {
        (ev.keyCode == 37) && this.showImage('prev');
        (ev.keyCode == 39) && this.showImage('next');
      }.bind(this));

      // Load the image from the attached element
      this.showImage('open');
    },


    // Triggered when jBox closes

    _onClose: function ()
    {
      // Remove key events
      jQuery(document).off('keyup.jBox-Image-' + this.id);
    },


    // Triggered when jBox finished closing

    _onCloseComplete: function ()
    {
      // Hide all image containers
      this.wrapper.find('.jBox-image-container').css('opacity', 0);
    }

  });

};

/**
 * jBox Notice plugin: Opens a popup notice
 *
 * Author: Stephan Wagner <stephanwagner.me@gmail.com> (https://stephanwagner.me)
 *
 * License: MIT (https://opensource.org/licenses/MIT)
 *
 * Requires: jBox (https://cdn.jsdelivr.net/gh/StephanWagner/jBox@latest/dist/jBox.min.js)
 */

function jBoxNoticeWrapper(jBox, jQuery) {

  new jBox.plugin('Notice', {


    // Options (https://stephanwagner.me/jBox/options#options-notice)

    color: null,      // Add a color to your notices, use 'gray' (default), 'black', 'red', 'green', 'blue' or 'yellow'
    stack: true,      // Set to false to disable notice-stacking
    stackSpacing: 10, // Spacing between notices when they stack
    autoClose: 6000,  // Time in ms after which the notice will disappear
    attributes: {     // Defines where the notice will pop up
      x: 'right',     // 'left' or 'right'
      y: 'top'        // 'top' or 'bottom'
    },
    position: {       // Defines the distance to the viewport boundary
      x: 15,
      y: 15
    },
    responsivePositions: {  // Responsive positions
      500: {                // The key defines the maximum width of the viewport, the values will replace the default position options
        x: 5,               // Start with the lowest viewport
        y: 5
      },
      768: {
        x: 10,
        y: 10
      }
    },
    target: window,
    fixed: true,
    animation: 'zoomIn',
    closeOnClick: 'box',
    zIndex: 12000,


    // Triggered when notice is initialized

    _onInit: function ()
    {
      // Cache position values
      this.defaultNoticePosition = jQuery.extend({}, this.options.position);

      // Type Notice has its own adjust position function
      this._adjustNoticePositon = function () {
        var win = jQuery(window);
        var windowDimensions = {
          x: win.width(),
          y: win.height()
        };

        // Reset default position
        this.options.position = jQuery.extend({}, this.defaultNoticePosition);

        // Adjust depending on viewport
        jQuery.each(this.options.responsivePositions, function (viewport, position) {
          if (windowDimensions.x <= viewport) {
            this.options.position = position;
            return false;
          }
        }.bind(this));

        // Set new padding options
        this.options.adjustDistance = {
          top: this.options.position.y,
          right: this.options.position.x,
          bottom: this.options.position.y,
          left: this.options.position.x
        };
      };

      // If jBox grabs an element as content, crab a clone instead
      this.options.content instanceof jQuery && (this.options.content = this.options.content.clone().attr('id', ''));

      // Adjust paddings when window resizes
      jQuery(window).on('resize.responsivejBoxNotice-' + this.id, function (ev) { if (this.isOpen) { this._adjustNoticePositon(); } }.bind(this));

      this.open();
    },


    // Triggered when notice was created

    _onCreated: function ()
    {
      // Add color class
      this.wrapper.addClass('jBox-Notice-color jBox-Notice-' + (this.options.color || 'gray'));

      // Store position in jBox wrapper
      this.wrapper.data('jBox-Notice-position', this.options.attributes.x + '-' + this.options.attributes.y);
    },


    // Triggered when notice opens

    _onOpen: function ()
    {
      // Bail if we're stacking
      if (this.options.stack) {
          return;
      }

      // Adjust position when opening
      this._adjustNoticePositon();

      // Loop through notices at same window corner destroy them
      jQuery.each(jQuery('.jBox-Notice'), function (index, el)
      {
        el = jQuery(el);

        // Abort if the element is this notice or when it's not at the same position
        if (el.attr('id') == this.id || el.data('jBox-Notice-position') != this.options.attributes.x + '-' + this.options.attributes.y) {
          return;
        }

        // Remove notice when we don't wont to stack them
        if (!this.options.stack) {
          el.data('jBox').close({ignoreDelay: true});
          return;
        }
      }.bind(this));
    },

    // Triggered when resizing window etc.

    _onPosition: function ()
    {
        var stacks = {};
        jQuery.each(jQuery('.jBox-Notice'), function (index, el)
        {
          el = jQuery(el);
          var pos = el.data('jBox-Notice-position');
          if (!stacks[pos]) {
              stacks[pos] = [];
          }
          stacks[pos].push(el);
        });
        for (var pos in stacks) {
            var position = pos.split('-');
            var direction = position[1];
            stacks[pos].reverse();
            var margin = 0;
            for (var i in stacks[pos]) {
                var el = jQuery(stacks[pos][i]);
                el.css('margin-' + direction, margin);
                margin += el.outerHeight() + this.options.stackSpacing;
            }
        }
    },

    // Remove notice from DOM and reposition other notices when closing finishes

    _onCloseComplete: function ()
    {
        this.destroy();
        this.options._onPosition.bind(this).call();
    }

  });

};

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], function (jQuery) {
      return (root.jBox = factory(jQuery));
    });
  } else if (typeof module === 'object' && module.exports) {
    module.exports = (root.jBox = factory(require('jquery')));
  } else {
    root.jBox = factory(root.jQuery);
  }
}(this, function (jQuery) {
  var jBox = jBoxWrapper(jQuery);
  try { typeof jBoxConfirmWrapper !== 'undefined' && jBoxConfirmWrapper && jBoxConfirmWrapper(jBox, jQuery); } catch(e) { console.error(e); }
  try { typeof jBoxImageWrapper !== 'undefined' && jBoxImageWrapper && jBoxImageWrapper(jBox, jQuery); } catch(e) { console.error(e); }
  try { typeof jBoxNoticeWrapper !== 'undefined' && jBoxNoticeWrapper && jBoxNoticeWrapper(jBox, jQuery); } catch(e) { console.error(e); }
  return jBox;
}));

//# sourceMappingURL=jBox.all.js.map
