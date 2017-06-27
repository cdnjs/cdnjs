/**
 * jBox is a jQuery plugin that makes it easy to create customizable tooltips, modal windows, image galleries and more.
 *
 * Author: Stephan Wagner (https://stephanwagner.me)
 *
 * License: MIT (https://opensource.org/licenses/MIT)
 *
 * Requires: jQuery 3.2.1 (https://code.jquery.com/jquery-3.2.1.min.js)
 *
 * Documentation: https://stephanwagner.me/jBox/documentation
 *
 * Demos: https://stephanwagner.me/jBox/demos
 */


// AMD and CommonJS support: http://ifandelse.com/its-not-hard-making-your-library-support-amd-and-commonjs

(function (root, factory) {
  
  // AMD support

  if (typeof define === 'function' && define.amd) {
    
    define(['jquery'], function(jQuery) {
      return (root.jBox = factory(jQuery));
    });
  
  // CommonJS support
  
  } else if (typeof module === 'object' && module.exports) {
    
    module.exports = (root.jBox = factory(require('jquery')));
  
  // Browser
  
  } else {
    
    root.jBox = factory(root.jQuery);
    
  }

}(this, function (jQuery) {
    
    
  // The actual jBox plugin starts here
    
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
        getURL: 'data-url',        // The attribute in the source element where the AJAX request will look for the URL, e.g. data-url="https://ajaxresponse.com"
        getData: 'data-ajax',      // The attribute in the source element where the AJAX request will look for the data, e.g. data-ajax="id=82&limit=10"
        setContent: true,          // Automatically set the response as new content when the AJAX request is finished
        spinner: true,             // Hides the current content and adds a spinner while loading. You can pass HTML content to add your own spinner, e.g. spinner: '<div class="mySpinner"></div>'
        spinnerDelay: 300,         // Milliseconds to wait until spinner appears
        spinnerReposition: true    // Repositions jBox when the spinner is added or removed
      },
      
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
      zIndex: 10000,               // Use a high z-index
      
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
      draggable: false,            // Make your jBox draggable (use 'true', 'title' or provide an element as handle) (inspired from Chris Coyiers CSS-Tricks http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/)
      dragOver: true,              // When you have multiple draggable jBoxes, the one you select will always move over the other ones
      autoClose: false,            // Time in ms when jBox will close automatically after it was opened
      
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
      onClose: null,               // Fired when jBox closes
      onCloseComplete: null        // Fired when jBox is completely closed (when fading is finished)
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
      if (!handle || !(handle instanceof jQuery) || !handle.length || handle.data('jBox-draggable')) return false;
      
      // Add mouse events
      handle.addClass('jBox-draggable').data('jBox-draggable', true).on('mousedown', function (ev)
      {
        if (ev.button == 2 || jQuery(ev.target).hasClass('jBox-noDrag') || jQuery(ev.target).parents('.jBox-noDrag').length) return;
        
        // Adjust z-index when dragging jBox over another draggable jBox
        if (this.options.dragOver && this.wrapper.css('zIndex') <= jBox.zIndexMax) {
          jBox.zIndexMax += 1;
          this.wrapper.css('zIndex', jBox.zIndexMax);
        }
        
        var drg_h = this.wrapper.outerHeight();
        var drg_w = this.wrapper.outerWidth();
        var pos_y = this.wrapper.offset().top + drg_h - ev.pageY;
        var pos_x = this.wrapper.offset().left + drg_w - ev.pageX;
        
        jQuery(document).on('mousemove.jBox-draggable-' + this.id, function (ev) {
          this.wrapper.offset({
            top: ev.pageY + pos_y - drg_h,
            left: ev.pageX + pos_x - drg_w
          });
        }.bind(this));
        ev.preventDefault();
        
      }.bind(this)).on('mouseup', function () { jQuery(document).off('mousemove.jBox-draggable-' + this.id); }.bind(this));
      
      // Get highest z-index
      jBox.zIndexMax = !jBox.zIndexMax ? this.options.zIndex : Math.max(jBox.zIndexMax, this.options.zIndex);
      
      
      
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
      (this.options.closeOnClick == 'box') && this.wrapper.on('touchend click', function () { this.close({ignoreDelay: true}); }.bind(this));
      
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
        this.closeButton = jQuery('<div class="jBox-closeButton jBox-noDrag"/>').on('touchend click', function (ev) { this.close({ignoreDelay: true}); }.bind(this)).append(closeButtonSVG);
        
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
      // Closing event: closeOnEsc
      this.options.closeOnEsc && jQuery(document).on('keyup.jBox-' + this.id, function (ev) { if (ev.keyCode == 27) { this.close({ignoreDelay: true}); }}.bind(this));
      
      // Closing event: closeOnClick
      if (this.options.closeOnClick === true || this.options.closeOnClick == 'body') {
        jQuery(document).on('touchend.jBox-' + this.id + ' click.jBox-' + this.id, function (ev) {
          if (this.blockBodyClick || (this.options.closeOnClick == 'body' && (ev.target == this.wrapper[0] || this.wrapper.has(ev.target).length))) return;
          this.close({ignoreDelay: true});
        }.bind(this));
      }
      
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
      (this.options.closeOnClick === true || this.options.closeOnClick == 'body') && jQuery(document).off('touchend.jBox-' + this.id + ' click.jBox-' + this.id);
      
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
        
        // Add close button to overlay
        (this.options.closeButton == 'overlay' || (this.options.closeButton === true && !this.titleContainer)) && this.overlay.append(this.closeButton);
        
        // Add closeOnClick: 'overlay' events
        this.options.closeOnClick == 'overlay' && this.overlay.on('touchend click', function () { this.close({ignoreDelay: true}); }.bind(this));
        
        // Adjust option adjustDistance if there is a close button in the overlay
        jQuery('#' + this.id + '-overlay .jBox-closeButton').length && (this.options.adjustDistance.top = Math.max(jQuery('#' + this.id + '-overlay .jBox-closeButton').outerHeight(), this.options.adjustDistance.top));
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
        keyframe_css = '@keyframes jBox-' + this.id + '-animation-' + this.options.animation[ev] + '-' + ev + (position ? '-' + position : '') + ' {';
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
      setTimeout(function () { this.wrapper.removeClass(classnames); }.bind(this), animationDuration);
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
    jQuery.type(elements) == 'string' && (elements = jQuery(elements))
    
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
      this.wrapper.addClass('jBox-hasTitle');
      if (this.options.closeButton == 'title' || (this.options.closeButton === true && !this.options.overlay)) {
        this.wrapper.addClass('jBox-closeButton-title');
        this.closeButton.appendTo(this.titleContainer);
      }
      this.titleContainer.insertBefore(this.content);
      this._setTitleWidth();
    }
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
      case 'string': this.content.html(content); break;
      case 'object': this.content.html(''); content.attr('data-jbox-content-appended', 1).appendTo(this.content).css({display: 'block'}); break;
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
  
  jBox.prototype.open = function (options)
  {
    // Create blank options if none passed
    !options && (options = {});
    
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
    var open = function () {
      
      // Set title from source element
      this.source && this.options.getTitle && (this.source.attr(this.options.getTitle) && this.setTitle(this.source.attr(this.options.getTitle)), true);
      
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
        this.options.blockScroll && jQuery('body').addClass('jBox-blockScroll-' + this.id);
        
        // Show overlay
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
            start: function () {
              this.isOpening = true;
              this.wrapper.css({display: 'block'});
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
    
    // Abort if jBox was destroyed or is currently closing
    if (this.isDestroyed || this.isClosing) return false;
    
    // Abort opening
    this.timer && clearTimeout(this.timer);
    
    // Block body click for 10ms, so jBox can open on attached elements while closeOnClock = 'body' is true
    this._blockBodyClick();
    
    // Block closing
    if (this.isDisabled) return this;
    
    // Close function
    var close = function () {
      
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
        
        // Hide overlay
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
    options.ignoreDelay ? close() : (this.timer = setTimeout(close, Math.max(this.options.delayClose, 10)));
    
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
    this.wrapper && this.wrapper.css({display: 'none'});
    return this;
  };
  
  
  // Show jBox
  
  jBox.prototype.show = function ()
  {
    this.enable();
    this.wrapper && this.wrapper.css({display: 'block'});
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
    this.ajaxRequest && this.ajaxRequest.abort();
    
    // Extract events
    var beforeSend = options.beforeSend || sysOptions.beforeSend || function () {};
    var complete = options.complete || sysOptions.complete || function () {};
    var success = options.success || sysOptions.success || function () {};
    var error = options.error || sysOptions.error || function () {};
    
    // Merge options
    var userOptions = jQuery.extend(true, sysOptions, options);
    
    // Set new beforeSend event
    userOptions.beforeSend = function ()
    {
      // jBox is loading
      this.wrapper.addClass('jBox-loading');
      
      // Add loading spinner
      userOptions.spinner && (this.spinnerDelay = setTimeout(function ()
      {
        // If there is a dela
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
      (beforeSend.bind(this))();
      
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
  
  
  // Apply custom animations to jBox
  
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
  
  jQuery.fn.jBox = function (type, options)
  {
    // Variables type and object are required
    !type && (type = {});
    !options && (options = {});
    
    // Return a new instance of jBox with the selector as attached element
    return new jBox(type, jQuery.extend(options, {
      attach: this
    }));
  };
  
  return jBox;
}));