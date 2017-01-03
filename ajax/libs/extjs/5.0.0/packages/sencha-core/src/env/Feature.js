/**
 * @class Ext.feature
 * @singleton
 *
 * A simple class to verify if a browser feature exists or not on the current device.
 *
 *     if (Ext.feature.has.Canvas) {
 *         // do some cool things with canvas here
 *     }
 *
 * See the {@link #has} property/method for details of the features that can be detected.
 *
 * @aside guide environment_package
 */
Ext.feature = {
// @define Ext.env.Feature
// @define Ext.feature
// @define Ext.supports
// @require Ext.String
// @require Ext.env.Browser
// @require Ext.env.OS

    /**
     * @method has
     * @member Ext.feature
     * Verifies if a browser feature exists or not on the current device.
     *
     * A "hybrid" property, can be either accessed as a method call, i.e:
     *
     *     if (Ext.feature.has('Canvas')) {
     *         // ...
     *     }
     *
     * or as an object with boolean properties, i.e:
     *
     *     if (Ext.feature.has.Canvas) {
     *         // ...
     *     }
     *
     * For possible properties/parameter values see `Ext.supports`.
     *
     * @param {String} name The feature name to check.
     * @return {Boolean}
     */
    has: function (name) {
        return !!this.has[name];
    },

    testElements: {},

    getTestElement: function(tag, createNew) {
        if (tag === undefined) {
            tag = 'div';
        }
        else if (typeof tag !== 'string') {
            return tag;
        }

        if (createNew) {
            return document.createElement(tag);
        }

        if (!this.testElements[tag]) {
            this.testElements[tag] = document.createElement(tag);
        }

        return this.testElements[tag];
    },

    isStyleSupported: function(name, tag) {
        var elementStyle = this.getTestElement(tag).style,
            cName = Ext.String.capitalize(name);

        if (typeof elementStyle[name] !== 'undefined'
            || typeof elementStyle[Ext.browser.getStylePrefix(name) + cName] !== 'undefined') {
            return true;
        }

        return false;
    },

    isStyleSupportedWithoutPrefix: function(name, tag) {
        var elementStyle = this.getTestElement(tag).style;

        if (typeof elementStyle[name] !== 'undefined') {
            return true;
        }

        return false;
    },

    isEventSupported: function(name, tag) {
        if (tag === undefined) {
            tag = window;
        }

        var element = this.getTestElement(tag),
            eventName = 'on' + name.toLowerCase(),
            isSupported = (eventName in element);

        if (!isSupported) {
            if (element.setAttribute && element.removeAttribute) {
                element.setAttribute(eventName, '');
                isSupported = typeof element[eventName] === 'function';

                if (typeof element[eventName] !== 'undefined') {
                    element[eventName] = undefined;
                }

                element.removeAttribute(eventName);
            }
        }

        return isSupported;
    },

    // This is a local copy of certain logic from Element.getStyle
    // to break a dependancy between the supports mechanism and Element
    // use this instead of element references to check for styling info
    getStyle: function (element, styleName) {
        var view = element.ownerDocument.defaultView,
            style = (view ? view.getComputedStyle(element, null) : element.currentStyle) 
                        || element.style;
        return style[styleName];
    },

    getSupportedPropertyName: function(object, name) {
        var vendorName = Ext.browser.getVendorProperyName(name);

        if (vendorName in object) {
            return vendorName;
        }
        else if (name in object) {
            return name;
        }

        return null;
    },

    /**
     * Runs feature detection routines and sets the various flags. This is called when
     * the scripts loads (very early) and again at {@link Ext#onReady}. Some detections
     * can be run immediately. Others that require the document body will not run until
     * domready (these have the `ready` flag set).
     *
     * Each test is run only once, so calling this method from an onReady function is safe
     * and ensures that all flags have been set.
     * @private
     */
    detect: function (isReady) {
        var me = this,
            doc = document,
            toRun = me.toRun || me.tests,
            n = toRun.length,
            div = doc.createElement('div'),
            notRun = [],
            supports = Ext.supports,
            has = me.has,
            name, test, vector, value;

        // TODO: this currently only works for Touch, make it work for Ext too
        if (!Ext.theme) {
            Ext.theme = {
                name: 'Default'
            };
        }

        Ext.theme.is = {};
        Ext.theme.is[Ext.theme.name] = true;

        //<feature legacyBrowser>
        // Only the legacy browser tests use this div so clip this out if we don't need
        // to use it.
        div.innerHTML =
            '<div style="height:30px;width:50px;">' +
                '<div style="height:20px;width:20px;"></div>' +
            '</div>' +
            '<div style="width: 200px; height: 200px; position: relative; padding: 5px;">' +
                '<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>' +
            '</div>' +
            '<div style="position: absolute; left: 10%; top: 10%;"></div>' +
            '<div style="float:left; background-color:transparent;"></div>';
        if (isReady) {
            doc.body.appendChild(div);
        }
        //</feature>

        vector = me.preDetected[Ext.browser.identity] || [];
        while (n--) {
            test = toRun[n];
            value = vector[n];
            name = test.name;

            if (value === undefined) {
                if (!isReady && test.ready) {
                    // test requires domready state
                    notRun.push(test);
                    continue;
                }

                value = test.fn.call(me, doc, div);
            }

            // Store test results on Ext.supports and Ext.feature.has
            supports[name] = has[name] = value;
        }

        if (isReady) {
            doc.body.removeChild(div);
        }

        me.toRun = notRun;
    },

    //</debug>
    report: function () {
        var values = [],
            len = this.tests.length,
            i;

        for (i = 0; i < len; ++i) {
            values.push(this.has[this.tests[i].name] ? 1 : 0);
        }

        Ext.log(Ext.browser.identity + ': [' + values.join(',') + ']');
    },
    //</debug>

    preDetected: {
        // TODO
    },

    /**
     * @class Ext.supports
     *
     * Contains information about features supported in the current environment as well
     * as bugs detected.
     * 
     * @singleton
     */
    tests: [{
        /**
         * @property CSSPointerEvents `true` if document environment supports the CSS3
         * pointer-events style.
         * @type {Boolean}
         */
        name: 'CSSPointerEvents',
        fn: function (doc) {
            return 'pointerEvents' in doc.documentElement.style;
        }
    },{
        /**
         * @property CSS3BoxShadow `true` if document environment supports the CSS3 
         * box-shadow style.
         * @type {Boolean}
         */
        name: 'CSS3BoxShadow',
        fn: function (doc) {
            return 'boxShadow' in doc.documentElement.style || 'WebkitBoxShadow' in doc.documentElement.style || 'MozBoxShadow' in doc.documentElement.style;
        }
    },{
        /**
         * @property ClassList `true` if document environment supports the HTML5 
         * classList API.
         * @type {Boolean}
         */
        name: 'ClassList',
        fn: function (doc) {
            return !!doc.documentElement.classList;
        }
    },{
        /**
         * @property TimeoutActualLateness True if the browser passes the "actualLateness" parameter to
         * setTimeout. See: https://developer.mozilla.org/en/DOM/window.setTimeout
         * @type {Boolean}
         */
        name: 'TimeoutActualLateness',
        fn: function () {
            setTimeout(function() {
                Ext.supports.TimeoutActualLateness = arguments.length !== 0;
            }, 0);
        }
    },{
        /**
         * @property Canvas `true` if the device supports Canvas.
         * @type {Boolean}
         */
        name: 'Canvas',
        fn: function() {
            var element = this.getTestElement('canvas');
            return !!(element && element.getContext && element.getContext('2d'));
        }
    },{
        /**
         * @property Svg `true` if the device supports SVG.
         * @type {Boolean}
         */
        name: 'Svg',
        fn: function(doc) {
            return !!(doc.createElementNS && !!doc.createElementNS("http:/" + "/www.w3.org/2000/svg", "svg").createSVGRect);
        }
    },{
        /**
         * @property Vml `true` if the device supports VML.
         * @type {Boolean}
         */
        name: 'Vml',
        fn: function() {
            var element = this.getTestElement(),
                ret = false;

            element.innerHTML = "<!--[if vml]><br><![endif]-->";
            ret = (element.childNodes.length === 1);
            element.innerHTML = "";

            return ret;
        }
    },{
        /**
         * @property TouchEvents `true` if the device supports touch events (`touchstart`,
         * `touchmove`, `touchend`).
         * @type {Boolean}
         */
        name: 'TouchEvents',
        fn: function() {
            return this.isEventSupported('touchend');
        }
    },{
        /**
         * @property Touch`true` if the browser supports touch input.
         * @type {Boolean}
         */
        name: 'Touch',
        fn: function() {
            // IE10 uses a vendor-prefixed maxTouchPoints property
            var maxTouchPoints = navigator.msMaxTouchPoints || navigator.maxTouchPoints;
            // if the browser has touch events we can be reasonably sure the device has
            // a touch screen
            // browsers that use pointer event have maxTouchPoints > 1 if the
            // device supports touch input
            // Chrome Desktop reports maxTouchPoints === 1 even if there is no
            // touch support on the device
            // http://www.w3.org/TR/pointerevents/#widl-Navigator-maxTouchPoints
            return (this.isEventSupported('touchend') && maxTouchPoints !== 1) ||
                maxTouchPoints > 1;
        }
    },{
        name: 'PointerEvents',
        fn: function() {
            return navigator.pointerEnabled;
        }
    },{
        name: 'MSPointerEvents',
        fn: function() {
            return navigator.msPointerEnabled;
        }
    },{
        /**
         * @property Orientation `true` if the device supports different orientations.
         * @type {Boolean}
         */
        name: 'Orientation',
        fn: function() {
            return ('orientation' in window) && this.isEventSupported('orientationchange');
        }
    },{
        /**
         * @property OrientationChange `true` if the device supports the `orientationchange`
         * event.
         * @type {Boolean}
         */
        name: 'OrientationChange',
        fn: function() {
            return this.isEventSupported('orientationchange');
        }
    },{
        /**
         * @property DeviceMotion `true` if the device supports device motion (acceleration
         * and rotation rate).
         * @type {Boolean}
         */
        name: 'DeviceMotion',
        fn: function() {
            return this.isEventSupported('devicemotion');
        }
    },{
        /**
         * @property Geolocation `true` if the device supports GeoLocation.
         * @type {Boolean}
         */
        /**
         * @property GeoLocation `true` if the device supports Geo-location.
         * @type {Boolean}
         * @deprecated Use `Geolocation` instead (notice the lower-casing of 'L').
         */
        names: [ 'Geolocation', 'GeoLocation' ],
        fn: function() {
            return 'geolocation' in window.navigator;
        }
    },{
        name: 'SqlDatabase',
        fn: function() {
            return 'openDatabase' in window;
        }
    },{
        name: 'WebSockets',
        fn: function() {
            return 'WebSocket' in window;
        }
    },{
        /**
         * @property Range `true` if browser support document.createRange native method.
         * See https://developer.mozilla.org/en/DOM/range.
         * @type {Boolean}
         */
        name: 'Range',
        fn: function() {
            return !!document.createRange;
        }
    },{
        /**
         * @property CreateContextualFragment `true` if browser support CreateContextualFragment
         * range native methods.
         * See https://developer.mozilla.org/en/DOM/range.createContextualFragment
         * @type {Boolean}
         */
        name: 'CreateContextualFragment',
        fn: function() {
            var range = !!document.createRange ? document.createRange() : false;
            return range && !!range.createContextualFragment;
        }
    },{
        /**
         * @property History `true` if the device supports HTML5 history. See
         * https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history
         * @type {Boolean}
         */
        name: 'History',
        fn: function() {
            return ('history' in window && 'pushState' in window.history);
        }
    },{
        name: 'CssTransforms',
        fn: function() {
            return this.isStyleSupported('transform');
        }
    },{
        name: 'CssTransformNoPrefix',
        fn: function() {
            return this.isStyleSupportedWithoutPrefix('transform');
        }
    },{
        /**
         * @property Css3DTransforms `true` if the device supports CSS3DTransform.
         * @type {Boolean}
         */
        name: 'Css3dTransforms',
        fn: function() {
            // See https://sencha.jira.com/browse/TOUCH-1544
            return this.has('CssTransforms') && this.isStyleSupported('perspective') && 
                    !Ext.browser.is.AndroidStock2;
            // TODO - double check vs Ext JS flavor:
            //return (typeof WebKitCSSMatrix != 'undefined' && new WebKitCSSMatrix().hasOwnProperty('m41'));
        }
    },{
        name: 'CssAnimations',
        fn: function() {
            return this.isStyleSupported('animationName');
        }
    },{
        /**
         * @property Transitions True if the device supports CSS3 Transitions.
         * @type {Boolean}
         */
        names: [ 'CssTransitions', 'Transitions' ],
        fn: function() {
            return this.isStyleSupported('transitionProperty');
        }
    },{
        /**
         * @property Audio `true` if the device supports the HTML5 `audio` tag.
         * @type {Boolean}
         */
        /**
         * @property AudioTag `true` if the device supports the HTML5 `audio` tag.
         * @type {Boolean}
         * @deprecated Use `Audio` instead.
         */
        names: [ 'Audio', 'AudioTag' ],
        fn: function() {
            return !!this.getTestElement('audio').canPlayType;
        }
    },{
        /**
         * @property Video `true` if the device supports the HTML5 `video` tag.
         * @type {Boolean}
         */
        name: 'Video',
        fn: function() {
            return !!this.getTestElement('video').canPlayType;
        }
    },{
        /**
         * @property LocalStorage `true` if localStorage is supported.
         * @type {Boolean}
         */
        name: 'LocalStorage',
        fn: function() {
            try {
                // IE10/Win8 throws "Access Denied" accessing window.localStorage, so
                // this test needs to have a try/catch
                if ('localStorage' in window && window['localStorage'] !== null) {
                    //this should throw an error in private browsing mode in iOS as well
                    localStorage.setItem('sencha-localstorage-test', 'test success');
                    //clean up if setItem worked
                    localStorage.removeItem('sencha-localstorage-test');
                    return true;
                }
            } catch ( e ) {
                // ignore
            }

            return false;
        }
    },{
        /**
         * @property XHR2 `true` if the browser supports XMLHttpRequest 
         * @type {Boolean}
         */
        name: 'XHR2',
        fn: function() {
          return window.ProgressEvent && window.FormData && window.XMLHttpRequest &&
              ('withCredentials' in new XMLHttpRequest);
        }
    }, {
        /**
         * @property XHRUploadProgress `true` if the browser supports XMLHttpRequest
         * upload progress info 
         * @type {Boolean}
         */
        name: 'XHRUploadProgress',
        fn: function() {
            if(window.XMLHttpRequest && !Ext.browser.is.AndroidStock) {
                var xhr = new XMLHttpRequest();
                return xhr && ('upload' in xhr) && ('onprogress' in xhr.upload);
            }
            return false;
        }
    }, {
        /**
         * @property NumericInputPlaceHolder `true` if the browser supports placeholders
         * on numeric input fields
         * @type {Boolean}
         */
        name: 'NumericInputPlaceHolder',
        fn: function() {
            return !(Ext.browser.is.AndroidStock4 && Ext.os.version.getMinor() < 2);
        }
    },{
        name: 'ProperHBoxStretching',
        ready: true,
        fn: function() {
            // IE10 currently has a bug in their flexbox row layout. We feature detect the issue here.
            var bodyElement = document.createElement('div'),
                innerElement = bodyElement.appendChild(document.createElement('div')),
                contentElement = innerElement.appendChild(document.createElement('div')),
                innerWidth;

            bodyElement.setAttribute('style', 'width: 100px; height: 100px; position: relative;');
            innerElement.setAttribute('style', 'position: absolute; display: -ms-flexbox; display: -webkit-flex; display: -moz-flexbox; display: flex; -ms-flex-direction: row; -webkit-flex-direction: row; -moz-flex-direction: row; flex-direction: row; min-width: 100%;');
            contentElement.setAttribute('style', 'width: 200px; height: 50px;');
            document.body.appendChild(bodyElement);
            innerWidth = innerElement.offsetWidth;
            document.body.removeChild(bodyElement);

            return (innerWidth > 100);
        }
    },

    /**
     * @property {String} matchesSelector
     * The method name which matches an element against a selector if implemented in this environment.
     */
    {
        name: 'matchesSelector',
        fn: function() {
            var el = document.documentElement,
                w3 = 'matches',
                wk = 'webkitMatchesSelector',
                ms = 'msMatchesSelector',
                mz = 'mozMatchesSelector';

            return el[w3] ? w3 : el[wk] ? wk : el[ms] ? ms : el[mz] ? mz : null;
        }
    }

    //<feature legacyBrowser>
    ,
    /**
     * @property RightMargin `true` if the device supports right margin.
     * See https://bugs.webkit.org/show_bug.cgi?id=13343 for why this is needed.
     * @type {Boolean}
     */
    {
        name: 'RightMargin',
        ready: true,
        fn: function(doc, div) {
            var view = doc.defaultView;
            return !(view && view.getComputedStyle(div.firstChild.firstChild, null).marginRight != '0px');
        }
    },

    /**
     * @property DisplayChangeInputSelectionBug `true` if INPUT elements lose their
     * selection when their display style is changed. Essentially, if a text input
     * has focus and its display style is changed, the I-beam disappears.
     *
     * This bug is encountered due to the work around in place for the {@link #RightMargin}
     * bug. This has been observed in Safari 4.0.4 and older, and appears to be fixed
     * in Safari 5. It's not clear if Safari 4.1 has the bug, but it has the same WebKit
     * version number as Safari 5 (according to http://unixpapa.com/js/gecko.html).
     */
    {
        name: 'DisplayChangeInputSelectionBug',
        fn: function() {
            var webKitVersion = Ext.webKitVersion;
            // WebKit but older than Safari 5 or Chrome 6:
            return 0 < webKitVersion && webKitVersion < 533;
        }
    },

    /**
     * @property DisplayChangeTextAreaSelectionBug `true` if TEXTAREA elements lose their
     * selection when their display style is changed. Essentially, if a text area has
     * focus and its display style is changed, the I-beam disappears.
     *
     * This bug is encountered due to the work around in place for the {@link #RightMargin}
     * bug. This has been observed in Chrome 10 and Safari 5 and older, and appears to
     * be fixed in Chrome 11.
     */
    {
        name: 'DisplayChangeTextAreaSelectionBug',
        fn: function() {
            var webKitVersion = Ext.webKitVersion;

            /*
            Has bug w/textarea:

            (Chrome) Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-US)
                        AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.127
                        Safari/534.16
            (Safari) Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us)
                        AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5
                        Safari/533.21.1

            No bug:

            (Chrome) Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7)
                        AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.57
                        Safari/534.24
            */
            return 0 < webKitVersion && webKitVersion < 534.24;
        }
    },

    /**
     * @property TransparentColor `true` if the device supports transparent color.
     * @type {Boolean}
     */
    {
        name: 'TransparentColor',
        ready: true,
        fn: function(doc, div, view) {
            view = doc.defaultView;
            return !(view && view.getComputedStyle(div.lastChild, null).backgroundColor != 'transparent');
        }
    },

    /**
     * @property ComputedStyle `true` if the browser supports document.defaultView.getComputedStyle().
     * @type {Boolean}
     */
    {
        name: 'ComputedStyle',
        ready: true,
        fn: function(doc, div, view) {
            view = doc.defaultView;
            return view && view.getComputedStyle;
        }
    },

    /**
     * @property Float `true` if the device supports CSS float.
     * @type {Boolean}
     */
    {
        name: 'Float',
        fn: function(doc) {
            return 'cssFloat' in doc.documentElement.style;
        }
    },

    /**
     * @property CSS3BorderRadius `true` if the device supports CSS3 border radius.
     * @type {Boolean}
     */
    {
        name: 'CSS3BorderRadius',
        ready: true,
        fn: function(doc) {
            var domPrefixes = ['borderRadius', 'BorderRadius', 'MozBorderRadius',
                               'WebkitBorderRadius', 'OBorderRadius', 'KhtmlBorderRadius'],
                pass = false,
                i;
            for (i = 0; i < domPrefixes.length; i++) {
                if (doc.documentElement.style[domPrefixes[i]] !== undefined) {
                    return true;
                }
            }
            return pass;
        }
    },

    /**
     * @property CSS3LinearGradient `true` if the device supports CSS3 linear gradients.
     * @type {Boolean}
     */
    {
        name: 'CSS3LinearGradient',
        fn: function(doc, div) {
            var property = 'background-image:',
                webkit   = '-webkit-gradient(linear, left top, right bottom, from(black), to(white))',
                w3c      = 'linear-gradient(left top, black, white)',
                moz      = '-moz-' + w3c,
                ms       = '-ms-' + w3c,
                opera    = '-o-' + w3c,
                options  = [property + webkit, property + w3c, property + moz, property + ms, property + opera];

            div.style.cssText = options.join(';');

            return (("" + div.style.backgroundImage).indexOf('gradient') !== -1) && !Ext.isIE9;
        }
    },

    /**
     * @property MouseEnterLeave True if the browser supports mouseenter and mouseleave events
     * @type {Boolean}
     */
    {
        name: 'MouseEnterLeave',
        fn: function(doc){
            return ('onmouseenter' in doc.documentElement && 'onmouseleave' in doc.documentElement);
        }
    },

    /**
     * @property MouseWheel True if the browser supports the mousewheel event
     * @type {Boolean}
     */
    {
        name: 'MouseWheel',
        fn: function(doc) {
            return ('onmousewheel' in doc.documentElement);
        }
    },

    /**
     * @property Opacity True if the browser supports normal css opacity
     * @type {Boolean}
     */
    {
        name: 'Opacity',
        fn: function(doc, div){
            // Not a strict equal comparison in case opacity can be converted to a number.
            if (Ext.isIE8) {
                return false;
            }
            div.firstChild.style.cssText = 'opacity:0.73';
            return div.firstChild.style.opacity == '0.73';
        }
    },

    /**
     * @property Placeholder True if the browser supports the HTML5 placeholder attribute on inputs
     * @type {Boolean}
     */
    {
        name: 'Placeholder',
        fn: function(doc) {
            return 'placeholder' in doc.createElement('input');
        }
    },

    /**
     * @property Direct2DBug True if when asking for an element's dimension via offsetWidth or offsetHeight,
     * getBoundingClientRect, etc. the browser returns the subpixel width rounded to the nearest pixel.
     * @type {Boolean}
     */
    {
        name: 'Direct2DBug',
        fn: function(doc) {
            return Ext.isString(doc.documentElement.style.msTransformOrigin) && Ext.isIE10m;
        }
    },

    /**
     * @property BoundingClientRect True if the browser supports the getBoundingClientRect method on elements
     * @type {Boolean}
     */
    {
        name: 'BoundingClientRect',
        fn: function(doc) {
            return 'getBoundingClientRect' in doc.documentElement;
        }
    },

    /**
     * @property RotatedBoundingClientRect True if the BoundingClientRect is
     * rotated when the element is rotated using a CSS transform.
     * @type {Boolean}
     */
    {
        name: 'RotatedBoundingClientRect',
        ready: true,
        fn: function(doc) {
            var body = doc.body,
                supports = false,
                el = this.getTestElement(),
                style = el.style;

            if (el.getBoundingClientRect) {
                style.WebkitTransform = style.MozTransform = style.msTransform =
                    style.OTransform = style.transform = 'rotate(90deg)';
                style.width = '100px';
                style.height = '30px';
                body.appendChild(el);

                supports = el.getBoundingClientRect().height !== 100;
                body.removeChild(el);
            }

            return supports;
        }
    },
    {
        name: 'IncludePaddingInWidthCalculation',
        ready: true,
        fn: function(doc, div){
            return div.childNodes[1].firstChild.offsetWidth == 210;
        }
    },
    {
        name: 'IncludePaddingInHeightCalculation',
        ready: true,
        fn: function(doc, div){
            return div.childNodes[1].firstChild.offsetHeight == 210;
        }
    },

    /**
     * @property TextAreaMaxLength True if the browser supports maxlength on textareas.
     * @type {Boolean}
     */
    {
        name: 'TextAreaMaxLength',
        fn: function(doc){
            return ('maxlength' in doc.createElement('textarea'));
        }
    },
    /**
     * @property GetPositionPercentage True if the browser will return the left/top/right/bottom
     * position as a percentage when explicitly set as a percentage value.
     * @type {Boolean}
     */
    // Related bug: https://bugzilla.mozilla.org/show_bug.cgi?id=707691#c7
    {
        name: 'GetPositionPercentage',
        ready: true,
        fn: function(doc, div){
           return Ext.feature.getStyle(div.childNodes[2], 'left') == '10%';
        }
    },
    /**
     * @property {Boolean} PercentageHeightOverflowBug
     * In some browsers (IE quirks, IE6, IE7, IE9, chrome, safari and opera at the time
     * of this writing) a percentage-height element ignores the horizontal scrollbar
     * of its parent element.  This method returns true if the browser is affected
     * by this bug.
     *
     * @private
     */
    {
        name: 'PercentageHeightOverflowBug',
        ready: true,
        fn: function(doc) {
            var hasBug = false,
                style, el;

            if (Ext.getScrollbarSize().height) {
                // must have space-consuming scrollbars for bug to be possible
                el = this.getTestElement();
                style = el.style;
                style.height = '50px';
                style.width = '50px';
                style.overflow = 'auto';
                style.position = 'absolute';

                el.innerHTML = [
                    '<div style="display:table;height:100%;">',
                        // The element that causes the horizontal overflow must be 
                        // a child of the element with the 100% height, otherwise
                        // horizontal overflow is not triggered in webkit quirks mode
                        '<div style="width:51px;"></div>',
                    '</div>'
                ].join('');
                doc.body.appendChild(el);
                if (el.firstChild.offsetHeight === 50) {
                    hasBug = true;
                }
                doc.body.removeChild(el);
            }

            return hasBug;
        }
    },

    /**
     * @property {Boolean} xOriginBug
     * In Chrome 24.0, an RTL element which has vertical overflow positions its right X origin incorrectly.
     * It skips a non-existent scrollbar which has been moved to the left edge due to the RTL setting.
     *
     * http://code.google.com/p/chromium/issues/detail?id=174656
     *
     * This method returns true if the browser is affected by this bug.
     *
     * @private
     */
    {
        name: 'xOriginBug',
        ready: true,
        fn: function(doc, div) {
           div.innerHTML = '<div id="b1" style="height:100px;width:100px;direction:rtl;position:relative;overflow:scroll">' +
                '<div id="b2" style="position:relative;width:100%;height:20px;"></div>' +
                '<div id="b3" style="position:absolute;width:20px;height:20px;top:0px;right:0px"></div>' +
            '</div>';

            var outerBox = document.getElementById('b1').getBoundingClientRect(),
                b2 = document.getElementById('b2').getBoundingClientRect(),
                b3 = document.getElementById('b3').getBoundingClientRect();

            return (b2.left !== outerBox.left && b3.right !== outerBox.right);
        }
    },

    /**
     * @property {Boolean} ScrollWidthInlinePaddingBug
     * In some browsers the right padding of an overflowing element is not accounted
     * for in its scrollWidth.  The result can vary depending on whether or not
     * The element contains block-level children.  This method tests the effect
     * of padding on scrollWidth when there are no block-level children inside the
     * overflowing element.
     * 
     * This method returns true if the browser is affected by this bug.
     */
    {
        name: 'ScrollWidthInlinePaddingBug',
        ready: true,
        fn: function(doc) {
            var hasBug = false,
                style, el;

            el = doc.createElement('div');
            style = el.style;
            style.height = '50px';
            style.width = '50px';
            style.padding = '10px';
            style.overflow = 'hidden';
            style.position = 'absolute';

            el.innerHTML =
                '<span style="display:inline-block;zoom:1;height:60px;width:60px;"></span>';
            doc.body.appendChild(el);
            if (el.scrollWidth === 70) {
                hasBug = true;
            }
            doc.body.removeChild(el);

            return hasBug;
        }
    },

    /**
     * @property {Boolean} rtlVertScrollbarOnRight
     * Safari, in RTL mode keeps the scrollbar at the right side.
     * This means that when two elements must keep their left/right positions synched, if one has no vert
     * scrollbar, it must have some extra padding.
     * See https://sencha.jira.com/browse/EXTJSIV-11245
     *
     * @private
     */
    {
        name: 'rtlVertScrollbarOnRight',
        ready: true,
        fn: function(doc, div) {
           div.innerHTML = '<div style="height:100px;width:100px;direction:rtl;overflow:scroll">' +
                '<div style="width:20px;height:200px;"></div>' +
            '</div>';

            var outerBox = div.firstChild,
                innerBox = outerBox.firstChild;

            return (innerBox.offsetLeft + innerBox.offsetWidth !== outerBox.offsetLeft + outerBox.offsetWidth);
        }
    },

    /**
     * @property {Boolean} rtlVertScrollbarOverflowBug
     * In Chrome, in RTL mode, horizontal overflow only into the vertical scrollbar does NOT trigger horizontal scrollability.
     * See https://code.google.com/p/chromium/issues/detail?id=179332
     * We need to detect this for when a grid header needs to have exactly the same horizontal scrolling range as its table view.
     * See {@link Ext.grid.ColumnLayout#publishInnerCtSize}
     * TODO: Remove this when all supported Chrome versions are fixed.
     *
     * @private
     */
    {
        name: 'rtlVertScrollbarOverflowBug',
        ready: true,
        fn: function(doc, div) {
           div.innerHTML = '<div style="height:100px;width:100px;direction:rtl;overflow:auto">' +
                '<div style="width:95px;height:200px;"></div>' +
            '</div>';

            // If the bug is present, the 95 pixel wide inner div, encroaches into the
            // vertical scrollbar, but does NOT trigger horizontal overflow, so the clientHeight remains
            // equal to the offset height.
            var outerBox = div.firstChild;
            return outerBox.clientHeight === outerBox.offsetHeight;
        }
    },
    {
        identity: 'defineProperty',
        fn: function () {
            if (Ext.isIE8m) {
                Ext.Object.defineProperty = Ext.emptyFn;
                return false;
            }
            return true;
        }
    },
    {
        identify: 'nativeXhr',
        fn: function () {
            if (typeof XMLHttpRequest !== 'undefined') {
                return true;
            }

            // Apply a polyfill:
            XMLHttpRequest = function() {
                try {
                    return new ActiveXObject('MSXML2.XMLHTTP.3.0');
                }
                catch (ex) {
                    return null;
                }
            };
            return false;
        }
    },

    /*
     * @property {Boolean} SpecialKeyDownRepeat
     * True if the browser fires the keydown event on specialkey autorepeat
     * 
     * note 1: IE fires ONLY the keydown event on specialkey autorepeat
     * note 2: Safari < 3.1, Gecko (Mac/Linux) & Opera fire only the keypress event on
     * specialkey autorepeat (research done by Jan Wolter at
     * http://unixpapa.com/js/key.html)
     * note 3: Opera 12 behaves like other modern browsers so this workaround does not
     * work anymore
     */
    {
        name: 'SpecialKeyDownRepeat',
        fn: function() {
            return Ext.isWebKit ?
                parseInt(navigator.userAgent.match(/AppleWebKit\/(\d+)/)[1], 10) >= 525 :
                !((Ext.isGecko && !Ext.isWindows) || (Ext.isOpera && Ext.operaVersion < 12));
        }
    },
    /**
     * @property {Boolean} EmulatedMouseOver
     * True if the browser emulates a mouseover event on tap (mobile safari)
     */
    {
        name: 'EmulatedMouseOver',
        fn: function() {
            // TODO: is it possible to feature detect this?
            return Ext.os.is.iOS;
        }
    },

    /**
     * @property Hashchange True if the user agent supports the hashchange event
     * @type {Boolean}
     */
    {
        // support Vector 12
        name: 'Hashchange',
        fn: function() {
            // Note that IE8 in IE7 compatibility mode reports true for 'onhashchange' in window, so also test documentMode
            var docMode = document.documentMode;
            return 'onhashchange' in window && (docMode === undefined || docMode > 7);
        }
    },

    /**
     * @property FixedTableWidthBug
     * @private
     * @type {Boolean}
     * `true` if the browser has this bug: https://bugs.webkit.org/show_bug.cgi?id=130239
     */
    {
        name: 'FixedTableWidthBug',
        ready: true,
        fn: function() {
            if (Ext.isIE8) {
                // IE8 incorrectly detects that we have this bug.
                return false;
            }
            var outer = document.createElement('div'),
                inner = document.createElement('div'),
                width;

            outer.setAttribute('style', 'display:table;table-layout:fixed;');
            inner.setAttribute('style', 'display:table-cell;min-width:50px;');

            outer.appendChild(inner);
            document.body.appendChild(outer);

            // must poke offsetWidth to trigger a reflow before setting width
            outer.offsetWidth;

            outer.style.width = '25px';

            width = outer.offsetWidth;

            document.body.removeChild(outer);

            return width === 50;
        }
    }


    //</feature>
    ]
};

Ext.supports = {};

Ext.feature.detect();
