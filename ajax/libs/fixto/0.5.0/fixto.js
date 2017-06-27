/*! fixto - v0.5.0 - 2016-06-16
* http://github.com/bbarakaci/fixto/*/


var fixto = (function ($, window, document) {

    // Start Computed Style. Please do not modify this module here. Modify it from its own repo. See address below.

    /*! Computed Style - v0.1.0 - 2012-07-19
    * https://github.com/bbarakaci/computed-style
    * Copyright (c) 2012 Burak Barakaci; Licensed MIT */
    var computedStyle = (function() {
        var computedStyle = {
            getAll : function(element){
                return document.defaultView.getComputedStyle(element);
            },
            get : function(element, name){
                return this.getAll(element)[name];
            },
            toFloat : function(value){
                return parseFloat(value, 10) || 0;
            },
            getFloat : function(element,name){
                return this.toFloat(this.get(element, name));
            },
            _getAllCurrentStyle : function(element) {
                return element.currentStyle;
            }
        };

        if (document.documentElement.currentStyle) {
            computedStyle.getAll = computedStyle._getAllCurrentStyle;
        }

        return computedStyle;

    }());

    // End Computed Style. Modify whatever you want to.

    var mimicNode = (function(){
        /*
        Class Mimic Node
        Dependency : Computed Style
        Tries to mimick a dom node taking his styles, dimensions. May go to his repo if gets mature.
        */

        function MimicNode(element) {
            this.element = element;
            this.replacer = document.createElement('div');
            this.replacer.style.visibility = 'hidden';
            this.hide();
            element.parentNode.insertBefore(this.replacer, element);
        }

        MimicNode.prototype = {
            replace : function(){
                var rst = this.replacer.style;
                var styles = computedStyle.getAll(this.element);

                 // rst.width = computedStyle.width(this.element) + 'px';
                 // rst.height = this.element.offsetHeight + 'px';

                 // Setting offsetWidth
                 rst.width = this._width();
                 rst.height = this._height();

                 // Adopt margins
                 rst.marginTop = styles.marginTop;
                 rst.marginBottom = styles.marginBottom;
                 rst.marginLeft = styles.marginLeft;
                 rst.marginRight = styles.marginRight;

                 // Adopt positioning
                 rst.cssFloat = styles.cssFloat;
                 rst.styleFloat = styles.styleFloat; //ie8;
                 rst.position = styles.position;
                 rst.top = styles.top;
                 rst.right = styles.right;
                 rst.bottom = styles.bottom;
                 rst.left = styles.left;
                 // rst.borderStyle = styles.borderStyle;

                 rst.display = styles.display;

            },

            hide: function () {
                this.replacer.style.display = 'none';
            },

            _width : function(){
                return this.element.getBoundingClientRect().width + 'px';
            },

            _widthOffset : function(){
                return this.element.offsetWidth + 'px';
            },

            _height : function(){
                return this.element.getBoundingClientRect().height + 'px';
            },

            _heightOffset : function(){
                return this.element.offsetHeight + 'px';
            },

            destroy: function () {
                $(this.replacer).remove();

                // set properties to null to break references
                for (var prop in this) {
                    if (this.hasOwnProperty(prop)) {
                      this[prop] = null;
                    }
                }
            }
        };

        var bcr = document.documentElement.getBoundingClientRect();
        if(!bcr.width){
            MimicNode.prototype._width = MimicNode.prototype._widthOffset;
            MimicNode.prototype._height = MimicNode.prototype._heightOffset;
        }

        return {
            MimicNode:MimicNode,
            computedStyle:computedStyle
        };
    }());

    // Class handles vendor prefixes
    function Prefix() {
        // Cached vendor will be stored when it is detected
        this._vendor = null;

        //this._dummy = document.createElement('div');
    }

    Prefix.prototype = {

        _vendors: {
          webkit: { cssPrefix: '-webkit-', jsPrefix: 'Webkit'},
          moz: { cssPrefix: '-moz-', jsPrefix: 'Moz'},
          ms: { cssPrefix: '-ms-', jsPrefix: 'ms'},
          opera: { cssPrefix: '-o-', jsPrefix: 'O'}
        },

        _prefixJsProperty: function(vendor, prop) {
            return vendor.jsPrefix + prop[0].toUpperCase() + prop.substr(1);
        },

        _prefixValue: function(vendor, value) {
            return vendor.cssPrefix + value;
        },

        _valueSupported: function(prop, value, dummy) {
            // IE8 will throw Illegal Argument when you attempt to set a not supported value.
            try {
                dummy.style[prop] = value;
                return dummy.style[prop] === value;
            }
            catch(er) {
                return false;
            }
        },

        /**
         * Returns true if the property is supported
         * @param {string} prop Property name
         * @returns {boolean}
         */
        propertySupported: function(prop) {
            // Supported property will return either inine style value or an empty string.
            // Undefined means property is not supported.
            return document.documentElement.style[prop] !== undefined;
        },

        /**
         * Returns prefixed property name for js usage
         * @param {string} prop Property name
         * @returns {string|null}
         */
        getJsProperty: function(prop) {
            // Try native property name first.
            if(this.propertySupported(prop)) {
                return prop;
            }

            // Prefix it if we know the vendor already
            if(this._vendor) {
                return this._prefixJsProperty(this._vendor, prop);
            }

            // We don't know the vendor, try all the possibilities
            var prefixed;
            for(var vendor in this._vendors) {
                prefixed = this._prefixJsProperty(this._vendors[vendor], prop);
                if(this.propertySupported(prefixed)) {
                    // Vendor detected. Cache it.
                    this._vendor = this._vendors[vendor];
                    return prefixed;
                }
            }

            // Nothing worked
            return null;
        },

        /**
         * Returns supported css value for css property. Could be used to check support or get prefixed value string.
         * @param {string} prop Property
         * @param {string} value Value name
         * @returns {string|null}
         */
        getCssValue: function(prop, value) {
            // Create dummy element to test value
            var dummy = document.createElement('div');

            // Get supported property name
            var jsProperty = this.getJsProperty(prop);

            // Try unprefixed value
            if(this._valueSupported(jsProperty, value, dummy)) {
                return value;
            }

            var prefixedValue;

            // If we know the vendor already try prefixed value
            if(this._vendor) {
                prefixedValue = this._prefixValue(this._vendor, value);
                if(this._valueSupported(jsProperty, prefixedValue, dummy)) {
                    return prefixedValue;
                }
            }

            // Try all vendors
            for(var vendor in this._vendors) {
                prefixedValue = this._prefixValue(this._vendors[vendor], value);
                if(this._valueSupported(jsProperty, prefixedValue, dummy)) {
                    // Vendor detected. Cache it.
                    this._vendor = this._vendors[vendor];
                    return prefixedValue;
                }
            }
            // No support for value
            return null;
        }
    };

    var prefix = new Prefix();

    // We will need this frequently. Lets have it as a global until we encapsulate properly.
    var transformJsProperty = prefix.getJsProperty('transform');

    // Will hold if browser creates a positioning context for fixed elements.
    var fixedPositioningContext;

    // Checks if browser creates a positioning context for fixed elements.
    // Transform rule will create a positioning context on browsers who follow the spec.
    // Ie for example will fix it according to documentElement
    // TODO: Other css rules also effects. perspective creates at chrome but not in firefox. transform-style preserve3d effects.
    function checkFixedPositioningContextSupport() {
        var support = false;
        var parent = document.createElement('div');
        var child = document.createElement('div');
        parent.appendChild(child);
        parent.style[transformJsProperty] = 'translate(0)';
        // Make sure there is space on top of parent
        parent.style.marginTop = '10px';
        parent.style.visibility = 'hidden';
        child.style.position = 'fixed';
        child.style.top = 0;
        document.body.appendChild(parent);
        var rect = child.getBoundingClientRect();
        // If offset top is greater than 0 meand transformed element created a positioning context.
        if(rect.top > 0) {
            support = true;
        }
        // Remove dummy content
        document.body.removeChild(parent);
        return support;
    }

    // It will return null if position sticky is not supported
    var nativeStickyValue = prefix.getCssValue('position', 'sticky');

    // It will return null if position fixed is not supported
    var fixedPositionValue = prefix.getCssValue('position', 'fixed');

    // Dirty business
    var ie = navigator.appName === 'Microsoft Internet Explorer';
    var ieversion;

    if(ie){
        ieversion = parseFloat(navigator.appVersion.split("MSIE")[1]);
    }

    function FixTo(child, parent, options) {
        this.child = child;
        this._$child = $(child);
        this.parent = parent;
        this.options = {
            className: 'fixto-fixed',
            top: 0,
            mindViewport: false
        };
        this._setOptions(options);
    }

    FixTo.prototype = {
        // Returns the total outerHeight of the elements passed to mind option. Will return 0 if none.
        _mindtop: function () {
            var top = 0;
            if(this._$mind) {
                var el;
                var rect;
                var height;
                for(var i=0, l=this._$mind.length; i<l; i++) {
                    el = this._$mind[i];
                    rect = el.getBoundingClientRect();
                    if(rect.height) {
                        top += rect.height;
                    }
                    else {
                        var styles = computedStyle.getAll(el);
                        top += el.offsetHeight + computedStyle.toFloat(styles.marginTop) + computedStyle.toFloat(styles.marginBottom);
                    }
                }
            }
            return top;
        },

        // Public method to stop the behaviour of this instance.
        stop: function () {
            this._stop();
            this._running = false;
        },

        // Public method starts the behaviour of this instance.
        start: function () {

            // Start only if it is not running not to attach event listeners multiple times.
            if(!this._running) {
                this._start();
                this._running = true;
            }
        },

        //Public method to destroy fixto behaviour
        destroy: function () {
            this.stop();

            this._destroy();

            // Remove jquery data from the element
            this._$child.removeData('fixto-instance');

            // set properties to null to break references
            for (var prop in this) {
                if (this.hasOwnProperty(prop)) {
                  this[prop] = null;
                }
            }
        },

        _setOptions: function(options) {
            $.extend(this.options, options);
            if(this.options.mind) {
                this._$mind = $(this.options.mind);
            }
            if(this.options.zIndex) {
                this.child.style.zIndex = this.options.zIndex;
            }
        },

        setOptions: function(options) {
            this._setOptions(options);
            this.refresh();
        },

        // Methods could be implemented by subclasses

        _stop: function() {

        },

        _start: function() {

        },

        _destroy: function() {

        },

        refresh: function() {

        }
    };

    // Class FixToContainer
    function FixToContainer(child, parent, options) {
        FixTo.call(this, child, parent, options);
        this._replacer = new mimicNode.MimicNode(child);
        this._ghostNode = this._replacer.replacer;

        this._saveStyles();

        this._saveViewportHeight();

        // Create anonymous functions and keep references to register and unregister events.
        this._proxied_onscroll = this._bind(this._onscroll, this);
        this._proxied_onresize = this._bind(this._onresize, this);

        this.start();
    }

    FixToContainer.prototype = new FixTo();

    $.extend(FixToContainer.prototype, {

        // Returns an anonymous function that will call the given function in the given context
        _bind : function (fn, context) {
            return function () {
                return fn.call(context);
            };
        },

        // at ie8 maybe only in vm window resize event fires everytime an element is resized.
        _toresize : ieversion===8 ? document.documentElement : window,

        _onscroll: function _onscroll() {
            this._scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            this._parentBottom = (this.parent.offsetHeight + this._fullOffset('offsetTop', this.parent));

            if (this.options.mindBottomPadding !== false) {
                this._parentBottom -= computedStyle.getFloat(this.parent, 'paddingBottom');
            }

            if (!this.fixed && this._shouldFix()) {
                this._fix();
                this._adjust();
            } else {
                if (this._scrollTop > this._parentBottom || this._scrollTop < (this._fullOffset('offsetTop', this._ghostNode) - this.options.top - this._mindtop())) {
                    this._unfix();
                    return;
                }
                this._adjust();
            }
        },

        _shouldFix: function() {
            if (this._scrollTop < this._parentBottom && this._scrollTop > (this._fullOffset('offsetTop', this.child) - this.options.top - this._mindtop())) {
                if (this.options.mindViewport && !this._isViewportAvailable()) {
                    return false;
                }
                return true;
            }
        },

        _isViewportAvailable: function() {
            var childStyles = computedStyle.getAll(this.child);
            return this._viewportHeight > (this.child.offsetHeight + computedStyle.toFloat(childStyles.marginTop) + computedStyle.toFloat(childStyles.marginBottom));
        },

        _adjust: function _adjust() {
            var top = 0;
            var mindTop = this._mindtop();
            var diff = 0;
            var childStyles = computedStyle.getAll(this.child);
            var context = null;

            if(fixedPositioningContext) {
                // Get positioning context.
                context = this._getContext();
                if(context) {
                    // There is a positioning context. Top should be according to the context.
                    top = Math.abs(context.getBoundingClientRect().top);
                }
            }

            diff = (this._parentBottom - this._scrollTop) - (this.child.offsetHeight + computedStyle.toFloat(childStyles.marginBottom) + mindTop + this.options.top);

            if(diff>0) {
                diff = 0;
            }

            this.child.style.top = (diff + mindTop + top + this.options.top) - computedStyle.toFloat(childStyles.marginTop) + 'px';
        },

        // Calculate cumulative offset of the element.
        // Optionally according to context
        _fullOffset: function _fullOffset(offsetName, elm, context) {
            var offset = elm[offsetName];
            var offsetParent = elm.offsetParent;

            // Add offset of the ascendent tree until we reach to the document root or to the given context
            while (offsetParent !== null && offsetParent !== context) {
                offset = offset + offsetParent[offsetName];
                offsetParent = offsetParent.offsetParent;
            }

            return offset;
        },

        // Get positioning context of the element.
        // We know that the closest parent that a transform rule applied will create a positioning context.
        _getContext: function() {
            var parent;
            var element = this.child;
            var context = null;
            var styles;

            // Climb up the treee until reaching the context
            while(!context) {
                parent = element.parentNode;
                if(parent === document.documentElement) {
                    return null;
                }

                styles = computedStyle.getAll(parent);
                // Element has a transform rule
                if(styles[transformJsProperty] !== 'none') {
                    context = parent;
                    break;
                }
                element = parent;
            }
            return context;
        },

        _fix: function _fix() {
            var child = this.child;
            var childStyle = child.style;
            var childStyles = computedStyle.getAll(child);
            var left = child.getBoundingClientRect().left;
            var width = childStyles.width;

            this._saveStyles();

            if(document.documentElement.currentStyle){
                // Function for ie<9. When hasLayout is not triggered in ie7, he will report currentStyle as auto, clientWidth as 0. Thus using offsetWidth.
                // Opera also falls here
                width = (child.offsetWidth) - (computedStyle.toFloat(childStyles.paddingLeft) + computedStyle.toFloat(childStyles.paddingRight) + computedStyle.toFloat(childStyles.borderLeftWidth) + computedStyle.toFloat(childStyles.borderRightWidth)) + 'px';
            }

            // Ie still fixes the container according to the viewport.
            if(fixedPositioningContext) {
                var context = this._getContext();
                if(context) {
                    // There is a positioning context. Left should be according to the context.
                    left = child.getBoundingClientRect().left - context.getBoundingClientRect().left;
                }
            }

            this._replacer.replace();

            childStyle.left = (left - computedStyle.toFloat(childStyles.marginLeft)) + 'px';
            childStyle.width = width;

            childStyle.position = 'fixed';
            childStyle.top = this._mindtop() + this.options.top - computedStyle.toFloat(childStyles.marginTop) + 'px';
            this._$child.addClass(this.options.className);
            this.fixed = true;
        },

        _unfix: function _unfix() {
            var childStyle = this.child.style;
            this._replacer.hide();
            childStyle.position = this._childOriginalPosition;
            childStyle.top = this._childOriginalTop;
            childStyle.width = this._childOriginalWidth;
            childStyle.left = this._childOriginalLeft;
            this._$child.removeClass(this.options.className);
            this.fixed = false;
        },

        _saveStyles: function(){
            var childStyle = this.child.style;
            this._childOriginalPosition = childStyle.position;
            this._childOriginalTop = childStyle.top;
            this._childOriginalWidth = childStyle.width;
            this._childOriginalLeft = childStyle.left;
        },

        _onresize: function () {
            this.refresh();
        },

        _saveViewportHeight: function () {
            // ie8 doesn't support innerHeight
            this._viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        },

        _stop: function() {
            // Unfix the container immediately.
            this._unfix();
            // remove event listeners
            $(window).unbind('scroll', this._proxied_onscroll);
            $(this._toresize).unbind('resize', this._proxied_onresize);
        },

        _start: function() {
            // Trigger onscroll to have the effect immediately.
            this._onscroll();

            // Attach event listeners
            $(window).bind('scroll', this._proxied_onscroll);
            $(this._toresize).bind('resize', this._proxied_onresize);
        },

        _destroy: function() {
            // Destroy mimic node instance
            this._replacer.destroy();
        },

        refresh: function() {
            this._saveViewportHeight();
            this._unfix();
            this._onscroll();
        }
    });

    function NativeSticky(child, parent, options) {
        FixTo.call(this, child, parent, options);
        this.start();
    }

    NativeSticky.prototype = new FixTo();

    $.extend(NativeSticky.prototype, {
        _start: function() {

            var childStyles = computedStyle.getAll(this.child);

            this._childOriginalPosition = childStyles.position;
            this._childOriginalTop = childStyles.top;

            this.child.style.position = nativeStickyValue;
            this.refresh();
        },

        _stop: function() {
            this.child.style.position = this._childOriginalPosition;
            this.child.style.top = this._childOriginalTop;
        },

        refresh: function() {
            this.child.style.top = this._mindtop() + this.options.top + 'px';
        }
    });



    var fixTo = function fixTo(childElement, parentElement, options) {
        if((nativeStickyValue && !options) || (nativeStickyValue && options && options.useNativeSticky !== false)) {
            // Position sticky supported and user did not disabled the usage of it.
            return new NativeSticky(childElement, parentElement, options);
        }
        else if(fixedPositionValue) {
             // Position fixed supported

             if(fixedPositioningContext===undefined) {
                // We don't know yet if browser creates fixed positioning contexts. Check it.
                fixedPositioningContext = checkFixedPositioningContextSupport();
             }

            return new FixToContainer(childElement, parentElement, options);
        }
        else {
            return 'Neither fixed nor sticky positioning supported';
        }
    };

    /*
    No support for ie lt 8
    */

    if(ieversion<8){
        fixTo = function(){
            return 'not supported';
        };
    }

    // Let it be a jQuery Plugin
    $.fn.fixTo = function (targetSelector, options) {

         var $targets = $(targetSelector);

         var i = 0;
         return this.each(function () {

             // Check the data of the element.
             var instance = $(this).data('fixto-instance');

             // If the element is not bound to an instance, create the instance and save it to elements data.
             if(!instance) {
                 $(this).data('fixto-instance', fixTo(this, $targets[i], options));
             }
             else {
                 // If we already have the instance here, expect that targetSelector parameter will be a string
                 // equal to a public methods name. Run the method on the instance without checking if
                 // it exists or it is a public method or not. Cause nasty errors when necessary.
                 var method = targetSelector;
                 instance[method].call(instance, options);
             }
             i++;
          });
    };

    /*
        Expose
    */

    return {
        FixToContainer: FixToContainer,
        fixTo: fixTo,
        computedStyle:computedStyle,
        mimicNode:mimicNode
    };


}(window.jQuery, window, document));