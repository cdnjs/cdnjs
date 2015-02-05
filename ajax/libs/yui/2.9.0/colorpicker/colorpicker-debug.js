/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 * Provides color conversion and validation utils
 * @class YAHOO.util.Color
 * @namespace YAHOO.util
 */
YAHOO.util.Color = function() {

    var ZERO     = "0",
        isArray  = YAHOO.lang.isArray,
        isNumber = YAHOO.lang.isNumber;

    return {

        /**
         * Converts 0-1 to 0-255
         * @method real2dec
         * @param n {float} the number to convert
         * @return {int} a number 0-255
         */
        real2dec: function(n) {
            return Math.min(255, Math.round(n*256));
        },

        /**
         * Converts HSV (h[0-360], s[0-1]), v[0-1] to RGB [255,255,255]
         * @method hsv2rgb
         * @param h {int|[int, float, float]} the hue, or an
         *        array containing all three parameters
         * @param s {float} the saturation
         * @param v {float} the value/brightness
         * @return {[int, int, int]} the red, green, blue values in
         *          decimal.
         */
        hsv2rgb: function(h, s, v) { 

            if (isArray(h)) {
                return this.hsv2rgb.call(this, h[0], h[1], h[2]);
            }

            var r, g, b,
                i = Math.floor((h/60)%6),
                f = (h/60)-i,
                p = v*(1-s),
                q = v*(1-f*s),
                t = v*(1-(1-f)*s),
                fn;

            switch (i) {
                case 0: r=v; g=t; b=p; break;
                case 1: r=q; g=v; b=p; break;
                case 2: r=p; g=v; b=t; break;
                case 3: r=p; g=q; b=v; break;
                case 4: r=t; g=p; b=v; break;
                case 5: r=v; g=p; b=q; break;
            }

            fn=this.real2dec;

            return [fn(r), fn(g), fn(b)];
        },

        /**
         * Converts to RGB [255,255,255] to HSV (h[0-360], s[0-1]), v[0-1]
         * @method rgb2hsv
         * @param r {int|[int, int, int]} the red value, or an
         *        array containing all three parameters
         * @param g {int} the green value
         * @param b {int} the blue value
         * @return {[int, float, float]} the value converted to hsv
         */
        rgb2hsv: function(r, g, b) {

            if (isArray(r)) {
                return this.rgb2hsv.apply(this, r);
            }

            r /= 255;
            g /= 255;
            b /= 255;

            var h,s,
                min = Math.min(Math.min(r,g),b),
                max = Math.max(Math.max(r,g),b),
                delta = max-min,
                hsv;

            switch (max) {
                case min: h=0; break;
                case r:   h=60*(g-b)/delta; 
                          if (g<b) {
                              h+=360;
                          }
                          break;
                case g:   h=(60*(b-r)/delta)+120; break;
                case b:   h=(60*(r-g)/delta)+240; break;
            }
            
            s = (max === 0) ? 0 : 1-(min/max);

            hsv = [Math.round(h), s, max];

            return hsv;
        },

        /**
         * Converts decimal rgb values into a hex string
         * 255,255,255 -> FFFFFF
         * @method rgb2hex
         * @param r {int|[int, int, int]} the red value, or an
         *        array containing all three parameters
         * @param g {int} the green value
         * @param b {int} the blue value
         * @return {string} the hex string
         */
        rgb2hex: function(r, g, b) {
            if (isArray(r)) {
                return this.rgb2hex.apply(this, r);
            }

            var f=this.dec2hex;
            return f(r) + f(g) + f(b);
        },
     
        /**
         * Converts an int 0...255 to hex pair 00...FF
         * @method dec2hex
         * @param n {int} the number to convert
         * @return {string} the hex equivalent
         */
        dec2hex: function(n) {
            n = parseInt(n,10)|0;
            n = (n > 255 || n < 0) ? 0 : n;

            return (ZERO+n.toString(16)).slice(-2).toUpperCase();
        },

        /**
         * Converts a hex pair 00...FF to an int 0...255 
         * @method hex2dec
         * @param str {string} the hex pair to convert
         * @return {int} the decimal
         */
        hex2dec: function(str) {
            return parseInt(str,16);
        },

        /**
         * Converts a hex string to rgb
         * @method hex2rgb
         * @param str {string} the hex string
         * @return {[int, int, int]} an array containing the rgb values
         */
        hex2rgb: function(s) { 
            var f = this.hex2dec;
            return [f(s.slice(0, 2)), f(s.slice(2, 4)), f(s.slice(4, 6))];
        },

        /**
         * Returns the closest websafe color to the supplied rgb value.
         * @method websafe
         * @param r {int|[int, int, int]} the red value, or an
         *        array containing all three parameters
         * @param g {int} the green value
         * @param b {int} the blue value
         * @return {[int, int, int]} an array containing the closes
         *                           websafe rgb colors.
         */
        websafe: function(r, g, b) {

            if (isArray(r)) {
                return this.websafe.apply(this, r);
            }

            // returns the closest match [0, 51, 102, 153, 204, 255]
            var f = function(v) {
                if (isNumber(v)) {
                    v = Math.min(Math.max(0, v), 255);
                    var i, next;
                    for (i=0; i<256; i=i+51) {
                        next = i+51;
                        if (v >= i && v <= next) {
                            return (v-i > 25) ? next : i;
                        }
                    }
 YAHOO.log("Error calculating the websafe value for " + v, "warn");
                }

                return v;
            };

            return [f(r), f(g), f(b)];
        }
    };
}();


/**
 * The colorpicker module provides a widget for selecting colors
 * @module colorpicker
 * @requires yahoo, dom, event, element, slider
 */
(function() {

    var _pickercount = 0,
        util   = YAHOO.util,
        lang   = YAHOO.lang,
        Slider = YAHOO.widget.Slider,
        Color  = util.Color,
        Dom    = util.Dom,
        Event  = util.Event,
        sub    = lang.substitute,
        
        b = "yui-picker";
    

    /**
     * A widget to select colors
     * @namespace YAHOO.widget
     * @class YAHOO.widget.ColorPicker
     * @extends YAHOO.util.Element
     * @constructor
     * @param {HTMLElement | String | Object} el(optional) The html 
     * element that represents the colorpicker, or the attribute object to use. 
     * An element will be created if none provided.
     * @param {Object} attr (optional) A key map of the colorpicker's 
     * initial attributes.  Ignored if first arg is attributes object.
     */
    function ColorPicker(el, attr) {
        _pickercount = _pickercount + 1;
        this.logger = new YAHOO.widget.LogWriter("ColorPicker");
        attr = attr || {};
        if (arguments.length === 1 && !YAHOO.lang.isString(el) && !el.nodeName) {
            attr = el; // treat first arg as attr object
            el = attr.element || null;
        }
        
        if (!el && !attr.element) { // create if we dont have one
            this.logger.log("creating host element");
            el = this._createHostElement(attr);
        }

        ColorPicker.superclass.constructor.call(this, el, attr); 

        this.initPicker();
    }

    YAHOO.extend(ColorPicker, YAHOO.util.Element, {
    
        /**
         * The element ids used by this control
         * @property ID
         * @final
         */
        ID : {

            /**
             * The id for the "red" form field
             * @property ID.R
             * @type String
             * @final
             * @default yui-picker-r
             */
            R: b + "-r",

            /**
             * The id for the "red" hex pair output
             * @property ID.R_HEX
             * @type String
             * @final
             * @default yui-picker-rhex
             */
            R_HEX: b + "-rhex",

            /**
             * The id for the "green" form field
             * @property ID.G
             * @type String
             * @final
             * @default yui-picker-g
             */
            G: b + "-g",

            /**
             * The id for the "green" hex pair output
             * @property ID.G_HEX
             * @type String
             * @final
             * @default yui-picker-ghex
             */
            G_HEX: b + "-ghex",


            /**
             * The id for the "blue" form field
             * @property ID.B
             * @type String
             * @final
             * @default yui-picker-b
             */
            B: b + "-b",

            /**
             * The id for the "blue" hex pair output
             * @property ID.B_HEX
             * @type String
             * @final
             * @default yui-picker-bhex
             */
            B_HEX: b + "-bhex",

            /**
             * The id for the "hue" form field
             * @property ID.H
             * @type String
             * @final
             * @default yui-picker-h
             */
            H: b + "-h",

            /**
             * The id for the "saturation" form field
             * @property ID.S
             * @type String
             * @final
             * @default yui-picker-s
             */
            S: b + "-s",

            /**
             * The id for the "value" form field
             * @property ID.V
             * @type String
             * @final
             * @default yui-picker-v
             */
            V: b + "-v",

            /**
             * The id for the picker region slider
             * @property ID.PICKER_BG
             * @type String
             * @final
             * @default yui-picker-bg
             */
            PICKER_BG:      b + "-bg",

            /**
             * The id for the picker region thumb
             * @property ID.PICKER_THUMB
             * @type String
             * @final
             * @default yui-picker-thumb
             */
            PICKER_THUMB:   b + "-thumb",

            /**
             * The id for the hue slider
             * @property ID.HUE_BG
             * @type String
             * @final
             * @default yui-picker-hue-bg
             */
            HUE_BG:         b + "-hue-bg",

            /**
             * The id for the hue thumb
             * @property ID.HUE_THUMB
             * @type String
             * @final
             * @default yui-picker-hue-thumb
             */
            HUE_THUMB:      b + "-hue-thumb",

            /**
             * The id for the hex value form field
             * @property ID.HEX
             * @type String
             * @final
             * @default yui-picker-hex
             */
            HEX:            b + "-hex",

            /**
             * The id for the color swatch
             * @property ID.SWATCH
             * @type String
             * @final
             * @default yui-picker-swatch
             */
            SWATCH:         b + "-swatch",

            /**
             * The id for the websafe color swatch
             * @property ID.WEBSAFE_SWATCH
             * @type String
             * @final
             * @default yui-picker-websafe-swatch
             */
            WEBSAFE_SWATCH: b + "-websafe-swatch",

            /**
             * The id for the control details
             * @property ID.CONTROLS
             * @final
             * @default yui-picker-controls
             */
            CONTROLS: b + "-controls",

            /**
             * The id for the rgb controls
             * @property ID.RGB_CONTROLS
             * @final
             * @default yui-picker-rgb-controls
             */
            RGB_CONTROLS: b + "-rgb-controls",

            /**
             * The id for the hsv controls
             * @property ID.HSV_CONTROLS
             * @final
             * @default yui-picker-hsv-controls
             */
            HSV_CONTROLS: b + "-hsv-controls",
            
            /**
             * The id for the hsv controls
             * @property ID.HEX_CONTROLS
             * @final
             * @default yui-picker-hex-controls
             */
            HEX_CONTROLS: b + "-hex-controls",

            /**
             * The id for the hex summary
             * @property ID.HEX_SUMMARY
             * @final
             * @default yui-picker-hex-summary
             */
            HEX_SUMMARY: b + "-hex-summary",

            /**
             * The id for the controls section header
             * @property ID.CONTROLS_LABEL
             * @final
             * @default yui-picker-controls-label
             */
            CONTROLS_LABEL: b + "-controls-label"
        },

        /**
         * Constants for any script-generated messages.  The values here
         * are the default messages.  They can be updated by providing
         * the complete list to the constructor for the "txt" attribute.
         * Note: the strings are added to the DOM as HTML.
         * @property TXT
         * @final
         */
        TXT : {
            ILLEGAL_HEX: "Illegal hex value entered",
            SHOW_CONTROLS: "Show color details",
            HIDE_CONTROLS: "Hide color details",
            CURRENT_COLOR: "Currently selected color: {rgb}",
            CLOSEST_WEBSAFE: "Closest websafe color: {rgb}. Click to select.",
            R: "R",
            G: "G",
            B: "B",
            H: "H",
            S: "S",
            V: "V",
            HEX: "#",
            DEG: "\u00B0",
            PERCENT: "%"
        },

        /**
         * Constants for the default image locations for img tags that are
         * generated by the control.  They can be modified by passing the
         * complete list to the contructor for the "images" attribute
         * @property IMAGE
         * @final
         */
        IMAGE : {
            PICKER_THUMB: "../../build/colorpicker/assets/picker_thumb.png",
            HUE_THUMB: "../../build/colorpicker/assets/hue_thumb.png"
        },

        /**
         * Constants for the control's default default values
         * @property DEFAULT
         * @final
         */
        DEFAULT : {
            PICKER_SIZE: 180
        },

        /**
         * Constants for the control's configuration attributes
         * @property OPT
         * @final
         */
        OPT : {
            HUE         : "hue",
            SATURATION  : "saturation",
            VALUE       : "value",
            RED     : "red",
            GREEN   : "green",
            BLUE    : "blue",
            HSV     : "hsv",
            RGB     : "rgb",
            WEBSAFE : "websafe",
            HEX     : "hex",
            PICKER_SIZE       : "pickersize",
            SHOW_CONTROLS     : "showcontrols",
            SHOW_RGB_CONTROLS : "showrgbcontrols",
            SHOW_HSV_CONTROLS : "showhsvcontrols",
            SHOW_HEX_CONTROLS : "showhexcontrols",
            SHOW_HEX_SUMMARY  : "showhexsummary",
            SHOW_WEBSAFE      : "showwebsafe",
            CONTAINER         : "container",
            IDS      : "ids",
            ELEMENTS : "elements",
            TXT      : "txt",
            IMAGES   : "images",
            ANIMATE  : "animate"
        },

        /**
         * Flag to allow individual UI updates to forego animation if available.
         * True during construction for initial thumb placement.  Set to false
         * after that.
         *
         * @property skipAnim
         * @type Boolean
         * @default true
         */
        skipAnim : true,

        /**
         * Creates the host element if it doesn't exist
         * @method _createHostElement
         * @protected
         */
        _createHostElement : function () {
            var el = document.createElement('div');

            if (this.CSS.BASE) {
                el.className = this.CSS.BASE;
            }
            
            return el;
        },

        /**
         * Moves the hue slider into the position dictated by the current state
         * of the control
         * @method _updateHueSlider
         * @protected
         */
        _updateHueSlider : function() {
            var size = this.get(this.OPT.PICKER_SIZE),
                h = this.get(this.OPT.HUE);

            h = size - Math.round(h / 360 * size);
            
            // 0 is at the top and bottom of the hue slider.  Always go to
            // the top so we don't end up sending the thumb to the bottom
            // when the value didn't actually change (e.g., a conversion
            // produced 360 instead of 0 and the value was already 0).
            if (h === size) {
                h = 0;
            }
            this.logger.log("Hue slider is being set to " + h);

            this.hueSlider.setValue(h, this.skipAnim);
        },

        /**
         * Moves the picker slider into the position dictated by the current state
         * of the control
         * @method _updatePickerSlider
         * @protected
         */
        _updatePickerSlider : function() {
            var size = this.get(this.OPT.PICKER_SIZE),
                s = this.get(this.OPT.SATURATION),
                v = this.get(this.OPT.VALUE);

            s = Math.round(s * size / 100);
            v = Math.round(size - (v * size / 100));

            this.logger.log("Setting picker slider to " + [s, v]);

            this.pickerSlider.setRegionValue(s, v, this.skipAnim);
        },

        /**
         * Moves the sliders into the position dictated by the current state
         * of the control
         * @method _updateSliders
         * @protected
         */
        _updateSliders : function() {
            this._updateHueSlider();
            this._updatePickerSlider();
        },

        /**
         * Sets the control to the specified rgb value and
         * moves the sliders to the proper positions
         * @method setValue
         * @param rgb {[int, int, int]} the rgb value
         * @param silent {boolean} whether or not to fire the change event
         */
        setValue : function(rgb, silent) {
            silent = (silent) || false;
            this.set(this.OPT.RGB, rgb, silent);
            this._updateSliders();
        },

        /**
         * The hue slider
         * @property hueSlider
         * @type YAHOO.widget.Slider
         */
        hueSlider : null,
        
        /**
         * The picker region
         * @property pickerSlider
         * @type YAHOO.widget.Slider
         */
        pickerSlider : null,

        /**
         * Translates the slider value into hue, int[0,359]
         * @method _getH
         * @protected
         * @return {int} the hue from 0 to 359
         */
        _getH : function() {
            var size = this.get(this.OPT.PICKER_SIZE),
                h = (size - this.hueSlider.getValue()) / size;
            h = Math.round(h*360);
            return (h === 360) ? 0 : h;
        },

        /**
         * Translates the slider value into saturation, int[0,1], left to right
         * @method _getS
         * @protected
         * @return {int} the saturation from 0 to 1
         */
        _getS : function() {
            return this.pickerSlider.getXValue() / this.get(this.OPT.PICKER_SIZE);
        },

        /**
         * Translates the slider value into value/brightness, int[0,1], top
         * to bottom
         * @method _getV
         * @protected
         * @return {int} the value from 0 to 1
         */
        _getV : function() {
            var size = this.get(this.OPT.PICKER_SIZE);
            return (size - this.pickerSlider.getYValue()) / size;
        },

        /**
         * Updates the background of the swatch with the current rbg value.
         * Also updates the websafe swatch to the closest websafe color
         * @method _updateSwatch
         * @protected
         */
        _updateSwatch : function() {
            var rgb = this.get(this.OPT.RGB),
                websafe = this.get(this.OPT.WEBSAFE),
                el = this.getElement(this.ID.SWATCH),
                color = rgb.join(","),
                txt = this.get(this.OPT.TXT);

            Dom.setStyle(el, "background-color", "rgb(" + color  + ")");
            el.title = sub(txt.CURRENT_COLOR, {
                    "rgb": "#" + this.get(this.OPT.HEX)
                });


            el = this.getElement(this.ID.WEBSAFE_SWATCH);
            color = websafe.join(",");

            Dom.setStyle(el, "background-color", "rgb(" + color + ")");
            el.title = sub(txt.CLOSEST_WEBSAFE, {
                    "rgb": "#" + Color.rgb2hex(websafe)
                });

        },

        /**
         * Reads the sliders and converts the values to RGB, updating the
         * internal state for all the individual form fields
         * @method _getValuesFromSliders
         * @protected
         */
        _getValuesFromSliders : function() {
            this.logger.log("hsv " + [this._getH(),this._getS(),this._getV()]);
            this.set(this.OPT.RGB, Color.hsv2rgb(this._getH(), this._getS(), this._getV()));
        },

        /**
         * Updates the form field controls with the state data contained
         * in the control.
         * @method _updateFormFields
         * @protected
         */
        _updateFormFields : function() {
            this.getElement(this.ID.H).value = this.get(this.OPT.HUE);
            this.getElement(this.ID.S).value = this.get(this.OPT.SATURATION);
            this.getElement(this.ID.V).value = this.get(this.OPT.VALUE);
            this.getElement(this.ID.R).value = this.get(this.OPT.RED);
            this.getElement(this.ID.R_HEX).innerHTML = Color.dec2hex(this.get(this.OPT.RED));
            this.getElement(this.ID.G).value = this.get(this.OPT.GREEN);
            this.getElement(this.ID.G_HEX).innerHTML = Color.dec2hex(this.get(this.OPT.GREEN));
            this.getElement(this.ID.B).value = this.get(this.OPT.BLUE);
            this.getElement(this.ID.B_HEX).innerHTML = Color.dec2hex(this.get(this.OPT.BLUE));
            this.getElement(this.ID.HEX).value = this.get(this.OPT.HEX);
        },

        /**
         * Event handler for the hue slider.
         * @method _onHueSliderChange
         * @param newOffset {int} pixels from the start position
         * @protected
         */
        _onHueSliderChange : function(newOffset) {
            this.logger.log("hue update: " + newOffset , "warn");

            var h        = this._getH(),
                rgb      = Color.hsv2rgb(h, 1, 1),
                styleDef = "rgb(" + rgb.join(",") + ")";

            this.set(this.OPT.HUE, h, true);

            // set picker background to the hue
            Dom.setStyle(this.getElement(this.ID.PICKER_BG), "background-color", styleDef);

            if (this.hueSlider.valueChangeSource !== Slider.SOURCE_SET_VALUE) {
                this._getValuesFromSliders();
            }

            this._updateFormFields();
            this._updateSwatch();
        },

        /**
         * Event handler for the picker slider, which controls the
         * saturation and value/brightness.
         * @method _onPickerSliderChange
         * @param newOffset {{x: int, y: int}} x/y pixels from the start position
         * @protected
         */
        _onPickerSliderChange : function(newOffset) {
            this.logger.log(sub("picker update [{x}, {y}]", newOffset));

            var s=this._getS(), v=this._getV();
            this.set(this.OPT.SATURATION, Math.round(s*100), true);
            this.set(this.OPT.VALUE, Math.round(v*100), true);

            if (this.pickerSlider.valueChangeSource !== Slider.SOURCE_SET_VALUE) {
                this._getValuesFromSliders();
            }

            this._updateFormFields();
            this._updateSwatch();
        },


        /**
         * Key map to well-known commands for txt field input
         * @method _getCommand
         * @param e {Event} the keypress or keydown event
         * @return {int} a command code
         * <ul>
         * <li>0 = not a number, letter in range, or special key</li>
         * <li>1 = number</li>
         * <li>2 = a-fA-F</li>
         * <li>3 = increment (up arrow)</li>
         * <li>4 = decrement (down arrow)</li>
         * <li>5 = special key (tab, delete, return, escape, left, right)</li> 
         * <li>6 = return</li>
         * </ul>
         * @protected
         */
        _getCommand : function(e) {
            var c = Event.getCharCode(e);

            //alert(Event.getCharCode(e) + ", " + e.keyCode + ", " + e.charCode);

            // special keys
            if (c === 38) { // up arrow
                return 3;
            } else if (c === 13) { // return
                return 6;
            } else if (c === 40) { // down array
                return 4;
            } else if (c >= 48 && c<=57) { // 0-9
                return 1;
            } else if (c >= 97 && c<=102) { // a-f
                return 2;
            } else if (c >= 65 && c<=70) { // A-F
                return 2;
            //} else if ("8, 9, 13, 27, 37, 39".indexOf(c) > -1 || 
            //              (c >= 112 && c <=123)) { // including F-keys
            // tab, delete, return, escape, left, right or ctrl/meta sequences
            } else if ("8, 9, 13, 27, 37, 39".indexOf(c) > -1 ||
                       e.ctrlKey || e.metaKey) { // special chars
                return 5;
            } else { // something we probably don't want
                return 0;
            }
        },

        /**
         * Use the value of the text field to update the control
         * @method _useFieldValue
         * @param e {Event} an event
         * @param el {HTMLElement} the field
         * @param prop {string} the key to the linked property
         * @protected
         */
        _useFieldValue : function(e, el, prop) {
            var val = el.value;

            if (prop !== this.OPT.HEX) {
                val = parseInt(val, 10);
            }

            if (val !== this.get(prop)) {
                this.set(prop, val);
            }
        },

        /**
         * Handle keypress on one of the rgb or hsv fields.
         * @method _rgbFieldKeypress
         * @param e {Event} the keypress event
         * @param el {HTMLElement} the field
         * @param prop {string} the key to the linked property
         * @protected
         */
        _rgbFieldKeypress : function(e, el, prop) {
            var command = this._getCommand(e),
                inc = (e.shiftKey) ? 10 : 1;
            switch (command) {
                case 6: // return, update the value
                    this._useFieldValue.apply(this, arguments);
                    break;
                            
                case 3: // up arrow, increment
                    this.set(prop, Math.min(this.get(prop)+inc, 255));
                    this._updateFormFields();
                    //Event.stopEvent(e);
                    break;
                case 4: // down arrow, decrement
                    this.set(prop, Math.max(this.get(prop)-inc, 0));
                    this._updateFormFields();
                    //Event.stopEvent(e);
                    break;

                default:
            }

        },

        /**
         * Handle keydown on the hex field
         * @method _hexFieldKeypress
         * @param e {Event} the keypress event
         * @param el {HTMLElement} the field
         * @param prop {string} the key to the linked property
         * @protected
         */
        _hexFieldKeypress : function(e, el, prop) {
            var command = this._getCommand(e);
            if (command === 6) { // return, update the value
                this._useFieldValue.apply(this, arguments);
            }
        },

        /** 
         * Allows numbers and special chars, and by default allows a-f.  
         * Used for the hex field keypress handler.
         * @method _hexOnly
         * @param e {Event} the event
         * @param numbersOnly omits a-f if set to true
         * @protected
         * @return {boolean} false if we are canceling the event
         */
        _hexOnly : function(e, numbersOnly) {
            var command = this._getCommand(e);
            switch (command) {
                case 6: // return
                case 5: // special char
                case 1: // number
                    break;
                case 2: // hex char (a-f)
                    if (numbersOnly !== true) {
                        break;
                    }

                    // fallthrough is intentional

                default: // prevent alpha and punctuation
                    Event.stopEvent(e);
                    return false;
            }
        },

        /** 
         * Allows numbers and special chars only.  Used for the
         * rgb and hsv fields keypress handler.
         * @method _numbersOnly
         * @param e {Event} the event
         * @protected
         * @return {boolean} false if we are canceling the event
         */
        _numbersOnly : function(e) {
            return this._hexOnly(e, true);
        },

        /**
         * Returns the element reference that is saved.  The id can be either
         * the element id, or the key for this id in the "id" config attribute.
         * For instance, the host element id can be obtained by passing its
         * id (default: "yui_picker") or by its key "YUI_PICKER".
         * @param id {string} the element id, or key 
         * @return {HTMLElement} a reference to the element
         */
        getElement : function(id) { 
            return this.get(this.OPT.ELEMENTS)[this.get(this.OPT.IDS)[id]]; 
        },

        _createElements : function() {
            this.logger.log("Building markup");
            var el, child, img, fld, p,
                ids = this.get(this.OPT.IDS),
                txt = this.get(this.OPT.TXT),
                images = this.get(this.OPT.IMAGES),
                Elem = function(type, o) {
                    var n = document.createElement(type);
                    if (o) {
                        lang.augmentObject(n, o, true);
                    }
                    return n;
                },
                RGBElem = function(type, obj) {
                    var o = lang.merge({
                            //type: "txt",
                            autocomplete: "off",
                            value: "0",
                            size: 3,
                            maxlength: 3
                        }, obj);

                    o.name = o.id;
                    return new Elem(type, o);
                };

            p = this.get("element");

            // Picker slider (S and V) ---------------------------------------------

            el = new Elem("div", {
                id: ids[this.ID.PICKER_BG],
                className: "yui-picker-bg",
                tabIndex: -1,
                hideFocus: true
            });

            child = new Elem("div", {
                id: ids[this.ID.PICKER_THUMB],
                className: "yui-picker-thumb"
            });

            img = new Elem("img", {
                src: images.PICKER_THUMB
            });

            child.appendChild(img);
            el.appendChild(child);
            p.appendChild(el);
            
            // Hue slider ---------------------------------------------
            el = new Elem("div", {
                id: ids[this.ID.HUE_BG],
                className: "yui-picker-hue-bg",
                tabIndex: -1,
                hideFocus: true
            });

            child = new Elem("div", {
                id: ids[this.ID.HUE_THUMB],
                className: "yui-picker-hue-thumb"
            });

            img = new Elem("img", {
                src: images.HUE_THUMB
            });

            child.appendChild(img);
            el.appendChild(child);
            p.appendChild(el);


            // controls ---------------------------------------------

            el = new Elem("div", {
                id: ids[this.ID.CONTROLS],
                className: "yui-picker-controls"
            });

            p.appendChild(el);
            p = el;

                // controls header
                el = new Elem("div", {
                    className: "hd"
                });

                child = new Elem("a", {
                    id: ids[this.ID.CONTROLS_LABEL],
                    //className: "yui-picker-controls-label",
                    href: "#"
                });
                el.appendChild(child);
                p.appendChild(el);

                // bd
                el = new Elem("div", {
                    className: "bd"
                });

                p.appendChild(el);
                p = el;

                    // rgb
                    el = new Elem("ul", {
                        id: ids[this.ID.RGB_CONTROLS],
                        className: "yui-picker-rgb-controls"
                    });

                    child = new Elem("li");
                    child.appendChild(document.createTextNode(txt.R + " "));

                    fld = new RGBElem("input", {
                        id: ids[this.ID.R],
                        className: "yui-picker-r"
                    });

                    child.appendChild(fld);
                    el.appendChild(child);

                    child = new Elem("li");
                    child.appendChild(document.createTextNode(txt.G + " "));

                    fld = new RGBElem("input", {
                        id: ids[this.ID.G],
                        className: "yui-picker-g"
                    });

                    child.appendChild(fld);
                    el.appendChild(child);

                    child = new Elem("li");
                    child.appendChild(document.createTextNode(txt.B + " "));

                    fld = new RGBElem("input", {
                        id: ids[this.ID.B],
                        className: "yui-picker-b"
                    });

                    child.appendChild(fld);
                    el.appendChild(child);

                    p.appendChild(el);

                    // hsv
                    el = new Elem("ul", {
                        id: ids[this.ID.HSV_CONTROLS],
                        className: "yui-picker-hsv-controls"
                    });

                    child = new Elem("li");
                    child.appendChild(document.createTextNode(txt.H + " "));

                    fld = new RGBElem("input", {
                        id: ids[this.ID.H],
                        className: "yui-picker-h"
                    });

                    child.appendChild(fld);
                    child.appendChild(document.createTextNode(" " + txt.DEG));

                    el.appendChild(child);

                    child = new Elem("li");
                    child.appendChild(document.createTextNode(txt.S + " "));

                    fld = new RGBElem("input", {
                        id: ids[this.ID.S],
                        className: "yui-picker-s"
                    });

                    child.appendChild(fld);
                    child.appendChild(document.createTextNode(" " + txt.PERCENT));

                    el.appendChild(child);

                    child = new Elem("li");
                    child.appendChild(document.createTextNode(txt.V + " "));

                    fld = new RGBElem("input", {
                        id: ids[this.ID.V],
                        className: "yui-picker-v"
                    });

                    child.appendChild(fld);
                    child.appendChild(document.createTextNode(" " + txt.PERCENT));

                    el.appendChild(child);
                    p.appendChild(el);


                    // hex summary

                    el = new Elem("ul", {
                        id: ids[this.ID.HEX_SUMMARY],
                        className: "yui-picker-hex_summary"
                    });

                    child = new Elem("li", {
                        id: ids[this.ID.R_HEX]
                    });
                    el.appendChild(child);

                    child = new Elem("li", {
                        id: ids[this.ID.G_HEX]
                    });
                    el.appendChild(child);

                    child = new Elem("li", {
                        id: ids[this.ID.B_HEX]
                    });
                    el.appendChild(child);
                    p.appendChild(el);

                    // hex field
                    el = new Elem("div", {
                        id: ids[this.ID.HEX_CONTROLS],
                        className: "yui-picker-hex-controls"
                    });
                    el.appendChild(document.createTextNode(txt.HEX + " "));

                    child = new RGBElem("input", {
                        id: ids[this.ID.HEX],
                        className: "yui-picker-hex",
                        size: 6,
                        maxlength: 6
                    });

                    el.appendChild(child);
                    p.appendChild(el);

                    p = this.get("element");

                    // swatch
                    el = new Elem("div", {
                        id: ids[this.ID.SWATCH],
                        className: "yui-picker-swatch"
                    });

                    p.appendChild(el);

                    // websafe swatch
                    el = new Elem("div", {
                        id: ids[this.ID.WEBSAFE_SWATCH],
                        className: "yui-picker-websafe-swatch"
                    });

                    p.appendChild(el);

        },

        _attachRGBHSV : function(id, config) {
            Event.on(this.getElement(id), "keydown", function(e, me) {
                    me._rgbFieldKeypress(e, this, config);
                }, this);
            Event.on(this.getElement(id), "keypress", this._numbersOnly, this, true);
            Event.on(this.getElement(id), "blur", function(e, me) {
                    me._useFieldValue(e, this, config);
                }, this);
        },


        /**
         * Updates the rgb attribute with the current state of the r,g,b
         * fields.  This is invoked from change listeners on these
         * attributes to facilitate updating these values from the
         * individual form fields
         * @method _updateRGB
         * @protected
         */
        _updateRGB : function() {
            var rgb = [this.get(this.OPT.RED), 
                       this.get(this.OPT.GREEN),
                       this.get(this.OPT.BLUE)];

            this.logger.log("RGB value set to " + rgb);
            this.set(this.OPT.RGB, rgb);

            this._updateSliders();
        },

        /**
         * Creates any missing DOM structure.
         *
         * @method _initElements
         * @protected
         */
        _initElements : function () {
            // bind all of our elements
            var o=this.OPT, 
                ids = this.get(o.IDS), 
                els = this.get(o.ELEMENTS), 
                      i, el, id;

            // Add the default value as a key for each element for easier lookup
            for (i in this.ID) {
                if (lang.hasOwnProperty(this.ID, i)) {
                    ids[this.ID[i]] = ids[i];
                }
            }

            // Check for picker element, if not there, create all of them
            el = Dom.get(ids[this.ID.PICKER_BG]);
            if (!el) {
                this._createElements();
            } else {
                this.logger.log("Using pre-existing markup");
            }

            for (i in ids) {
                if (lang.hasOwnProperty(ids, i)) {
                    // look for element
                    el = Dom.get(ids[i]);

                    // generate an id if the implementer passed in an element reference,
                    // and the element did not have an id already
                    id = Dom.generateId(el);

                    // update the id in case we generated the id
                    ids[i] = id; // key is WEBSAFE_SWATCH
                    ids[ids[i]] = id; // key is websafe_swatch

                    // store the dom ref
                    els[id] = el;
                }
            }

        },

        /**
         * Sets the initial state of the sliders
         * @method initPicker
         */
        initPicker : function () {
            this._initSliders();
            this._bindUI();
            this.syncUI(true);
        },

        /**
         * Creates the Hue and Value/Saturation Sliders.
         *
         * @method _initSliders
         * @protected
         */
        _initSliders : function () {
            var ID = this.ID,
                size = this.get(this.OPT.PICKER_SIZE);

            this.logger.log("picker size" + size);

            this.hueSlider = Slider.getVertSlider(
                this.getElement(ID.HUE_BG), 
                this.getElement(ID.HUE_THUMB), 0, size);

            this.pickerSlider = Slider.getSliderRegion(
                this.getElement(ID.PICKER_BG), 
                this.getElement(ID.PICKER_THUMB), 0, size, 0, size);

            // Apply animate attribute configuration
            this.set(this.OPT.ANIMATE, this.get(this.OPT.ANIMATE));
        },

        /**
         * Adds event listeners to Sliders and UI elements.  Wires everything
         * up.
         *
         * @method _bindUI
         * @protected
         */
        _bindUI : function () {
            var ID = this.ID,
                O  = this.OPT;

            this.hueSlider.subscribe("change",
                this._onHueSliderChange, this, true);
            this.pickerSlider.subscribe("change",
                this._onPickerSliderChange, this, true);

            Event.on(this.getElement(ID.WEBSAFE_SWATCH), "click", function(e) {
                   this.setValue(this.get(O.WEBSAFE));
               }, this, true);

            Event.on(this.getElement(ID.CONTROLS_LABEL), "click", function(e) {
                   this.set(O.SHOW_CONTROLS, !this.get(O.SHOW_CONTROLS));
                   Event.preventDefault(e);
               }, this, true);

            this._attachRGBHSV(ID.R, O.RED); 
            this._attachRGBHSV(ID.G, O.GREEN); 
            this._attachRGBHSV(ID.B, O.BLUE); 
            this._attachRGBHSV(ID.H, O.HUE); 
            this._attachRGBHSV(ID.S, O.SATURATION); 
            this._attachRGBHSV(ID.V, O.VALUE); 

            Event.on(this.getElement(ID.HEX), "keydown", function(e, me) {
                    me._hexFieldKeypress(e, this, O.HEX);
                }, this);

            Event.on(this.getElement(this.ID.HEX), "keypress",
                this._hexOnly, this,true);
            Event.on(this.getElement(this.ID.HEX), "blur", function(e, me) {
                    me._useFieldValue(e, this, O.HEX);
                }, this);
        },

        /**
         * Wrapper for _updateRGB, but allows non-animated update
         *
         * @method syncUI
         * @param skipAnim {Boolean} Omit Slider animation for this action
         */
        syncUI : function (skipAnim) {
            this.skipAnim = skipAnim;
            this._updateRGB();
            this.skipAnim = false;
        },


        /**
         * Updates the RGB values from the current state of the HSV
         * values.  Executed when the one of the HSV form fields are
         * updated
         * _updateRGBFromHSV
         * @protected
         */
        _updateRGBFromHSV : function() {
            var hsv = [this.get(this.OPT.HUE), 
                       this.get(this.OPT.SATURATION)/100,
                       this.get(this.OPT.VALUE)/100],
                rgb = Color.hsv2rgb(hsv);

            this.logger.log("HSV converted to RGB " + hsv + " : " + rgb);
            this.set(this.OPT.RGB, rgb);

            this._updateSliders();
        },

        /**
         * Parses the hex string to normalize shorthand values, converts
         * the hex value to rgb and updates the rgb attribute (which
         * updates the state for all of the other values)
         * method _updateHex
         * @protected
         */
        _updateHex : function() {
           
            var hex = this.get(this.OPT.HEX),
                l   = hex.length,
                c,i,rgb;

            // support #369 -> #336699 shorthand
            if (l === 3) {
                c = hex.split("");
                for (i=0; i<l; i=i+1) {
                    c[i] = c[i] + c[i];
                }

                hex = c.join("");
            }

            if (hex.length !== 6) {
                this.logger.log(this.get(this.TXT.ILLEGAL_HEX), "error");
                return false;
            }

            rgb = Color.hex2rgb(hex);

            this.logger.log(sub("Hex value set to {hex} ({rgb})", {
                    hex: hex, rgb: rgb
                }));

            this.setValue(rgb);
        },


        /**
         * Returns the cached element reference.  If the id is not a string, it
         * is assumed that it is an element and this is returned.
         * @param id {string|HTMLElement} the element key, id, or ref
         * @param on {boolean} hide or show.  If true, show
         * @protected
         */
        _hideShowEl : function(id, on) {
            var el = (lang.isString(id) ? this.getElement(id) : id);
            Dom.setStyle(el, "display", (on) ? "" : "none");
        },


        /**
         * Sets up the config attributes and the change listeners for this
         * properties
         * @method initAttributes
         * @param attr An object containing default attribute values
         */
        initAttributes : function(attr) {

            attr = attr || {};
            ColorPicker.superclass.initAttributes.call(this, attr);
            
            /**
             * The size of the picker. Trying to change this is not recommended.
             * @attribute pickersize
             * @default 180
             * @type int
             */
            this.setAttributeConfig(this.OPT.PICKER_SIZE, {
                    value: attr.size || this.DEFAULT.PICKER_SIZE
                });

            /**
             * The current hue value 0-360
             * @attribute hue
             * @type int
             */
            this.setAttributeConfig(this.OPT.HUE, {
                    value: attr.hue || 0,
                    validator: lang.isNumber
                });

            /**
             * The current saturation value 0-100
             * @attribute saturation
             * @type int
             */
            this.setAttributeConfig(this.OPT.SATURATION, {
                    value: attr.saturation || 0,
                    validator: lang.isNumber
                });

            /**
             * The current value/brightness value 0-100
             * @attribute value
             * @type int
             */
            this.setAttributeConfig(this.OPT.VALUE, {
                    value: lang.isNumber(attr.value) ? attr.value : 100,
                    validator: lang.isNumber
                });

            /**
             * The current red value 0-255
             * @attribute red
             * @type int
             */
            this.setAttributeConfig(this.OPT.RED, {
                    value: lang.isNumber(attr.red) ? attr.red : 255,
                    validator: lang.isNumber
                });

            /**
             * The current green value 0-255
             * @attribute green 
             * @type int
             */
            this.setAttributeConfig(this.OPT.GREEN, {
                    value: lang.isNumber(attr.green) ? attr.green : 255,
                    validator: lang.isNumber
                });

            /**
             * The current blue value 0-255
             * @attribute blue
             * @type int
             */
            this.setAttributeConfig(this.OPT.BLUE, {
                    value: lang.isNumber(attr.blue) ? attr.blue : 255,
                    validator: lang.isNumber
                });

            /**
             * The current hex value #000000-#FFFFFF, without the #
             * @attribute hex
             * @type string
             */
            this.setAttributeConfig(this.OPT.HEX, {
                    value: attr.hex || "FFFFFF",
                    validator: lang.isString
                });

            /**
             * The current rgb value.  Updates the state of all of the
             * other value fields.  Read-only: use setValue to set the
             * controls rgb value.
             * @attribute hex
             * @type [int, int, int]
             * @readonly
             */
            this.setAttributeConfig(this.OPT.RGB, {
                    value: attr.rgb || [255,255,255],
                    method: function(rgb) {

                        this.set(this.OPT.RED, rgb[0], true);
                        this.set(this.OPT.GREEN, rgb[1], true);
                        this.set(this.OPT.BLUE, rgb[2], true);

                        var websafe = Color.websafe(rgb),
                            hex = Color.rgb2hex(rgb),
                            hsv = Color.rgb2hsv(rgb);

                        this.set(this.OPT.WEBSAFE, websafe, true);
                        this.set(this.OPT.HEX, hex, true);


                        this.logger.log(sub("RGB value set to {rgb} (hsv: {hsv})", {
                                "hsv": hsv, "rgb": rgb
                            }));

                        // fix bug #1754338 - when saturation is 0, hue is
                        // silently always set to 0, but input field not updated
                        if (hsv[1]) {
                            this.set(this.OPT.HUE, hsv[0], true);
                        }
                        this.set(this.OPT.SATURATION, Math.round(hsv[1]*100), true);
                        this.set(this.OPT.VALUE, Math.round(hsv[2]*100), true);
                    },
                    readonly: true
                });

            /**
             * If the color picker will live inside of a container object,
             * set, provide a reference to it so the control can use the
             * container's events.
             * @attribute container
             * @type YAHOO.widget.Panel
             */
            this.setAttributeConfig(this.OPT.CONTAINER, {
                        value: null,
                        method: function(container) {
                            if (container) {
                                // Position can get out of sync when the
                                // control is manipulated while display is
                                // none.  Resetting the slider constraints
                                // when it is visible gets the state back in
                                // order.
                                container.showEvent.subscribe(function() {
                                    // this.pickerSlider.thumb.resetConstraints();
                                    // this.hueSlider.thumb.resetConstraints();
                                    this.pickerSlider.focus();
                                }, this, true);
                            }
                        }
                    });
            /**
             * The closest current websafe value
             * @attribute websafe
             * @type int
             */
            this.setAttributeConfig(this.OPT.WEBSAFE, {
                    value: attr.websafe || [255,255,255]
                });


            var ids = attr.ids || lang.merge({}, this.ID), i;

            if (!attr.ids && _pickercount > 1) {
                for (i in ids) {
                    if (lang.hasOwnProperty(ids, i)) {
                        ids[i] = ids[i] + _pickercount;
                    }
                }
            }


            /**
             * A list of element ids and/or element references used by the 
             * control.  The default is the this.ID list, and can be customized
             * by passing a list in the contructor
             * @attribute ids
             * @type {referenceid: realid}
             * @writeonce
             */
            this.setAttributeConfig(this.OPT.IDS, {
                    value: ids,
                    writeonce: true
                });

            /**
             * A list of txt strings for internationalization.  Default
             * is this.TXT
             * @attribute txt
             * @type {key: txt}
             * @writeonce
             */
            this.setAttributeConfig(this.OPT.TXT, {
                    value: attr.txt || this.TXT,
                    writeonce: true
                });

            /**
             * The img src default list
             * is this.IMAGES
             * @attribute images
             * @type {key: image}
             * @writeonce
             */
            this.setAttributeConfig(this.OPT.IMAGES, {
                    value: attr.images || this.IMAGE,
                    writeonce: true
                });
            /**
             * The element refs used by this control.  Set at initialization
             * @attribute elements
             * @type {id: HTMLElement}
             * @readonly
             */
            this.setAttributeConfig(this.OPT.ELEMENTS, {
                    value: {},
                    readonly: true
                });

            /**
             * Hide/show the entire set of controls
             * @attribute showcontrols
             * @type boolean
             * @default true
             */
            this.setAttributeConfig(this.OPT.SHOW_CONTROLS, {
                    value: lang.isBoolean(attr.showcontrols) ? attr.showcontrols : true,
                    method: function(on) {

                        var el = Dom.getElementsByClassName("bd", "div", 
                                this.getElement(this.ID.CONTROLS))[0];

                        this._hideShowEl(el, on);

                        this.getElement(this.ID.CONTROLS_LABEL).innerHTML = 
                            (on) ? this.get(this.OPT.TXT).HIDE_CONTROLS :
                                   this.get(this.OPT.TXT).SHOW_CONTROLS;

                    }
                });

            /**
             * Hide/show the rgb controls
             * @attribute showrgbcontrols
             * @type boolean
             * @default true
             */
            this.setAttributeConfig(this.OPT.SHOW_RGB_CONTROLS, {
                    value: lang.isBoolean(attr.showrgbcontrols) ? attr.showrgbcontrols : true,
                    method: function(on) {
                        this._hideShowEl(this.ID.RGB_CONTROLS, on);
                    }
                });

            /**
             * Hide/show the hsv controls
             * @attribute showhsvcontrols
             * @type boolean
             * @default false
             */
            this.setAttributeConfig(this.OPT.SHOW_HSV_CONTROLS, {
                    value: lang.isBoolean(attr.showhsvcontrols) ?
                                          attr.showhsvcontrols : false,
                    method: function(on) {
                        //Dom.setStyle(this.getElement(this.ID.HSV_CONTROLS), "visibility", (on) ? "" : "hidden");
                        this._hideShowEl(this.ID.HSV_CONTROLS, on);

                        // can't show both the hsv controls and the rbg hex summary
                        if (on && this.get(this.OPT.SHOW_HEX_SUMMARY)) {
                            this.set(this.OPT.SHOW_HEX_SUMMARY, false);
                        }
                    }
                });

            /**
             * Hide/show the hex controls
             * @attribute showhexcontrols
             * @type boolean
             * @default true
             */
            this.setAttributeConfig(this.OPT.SHOW_HEX_CONTROLS, {
                    value: lang.isBoolean(attr.showhexcontrols) ?
                                          attr.showhexcontrols : false,
                    method: function(on) {
                        this._hideShowEl(this.ID.HEX_CONTROLS, on);
                    }
                });

            /**
             * Hide/show the websafe swatch
             * @attribute showwebsafe
             * @type boolean
             * @default true
             */
            this.setAttributeConfig(this.OPT.SHOW_WEBSAFE, {
                    value: lang.isBoolean(attr.showwebsafe) ? attr.showwebsafe : true,
                    method: function(on) {
                        this._hideShowEl(this.ID.WEBSAFE_SWATCH, on);
                    }
                });

            /**
             * Hide/show the hex summary
             * @attribute showhexsummary
             * @type boolean
             * @default true
             */
            this.setAttributeConfig(this.OPT.SHOW_HEX_SUMMARY, {
                    value: lang.isBoolean(attr.showhexsummary) ? attr.showhexsummary : true,
                    method: function(on) {
                        this._hideShowEl(this.ID.HEX_SUMMARY, on);

                        // can't show both the hsv controls and the rbg hex summary
                        if (on && this.get(this.OPT.SHOW_HSV_CONTROLS)) {
                            this.set(this.OPT.SHOW_HSV_CONTROLS, false);
                        }
                    }
                });
            this.setAttributeConfig(this.OPT.ANIMATE, {
                    value: lang.isBoolean(attr.animate) ? attr.animate : true,
                    method: function(on) {
                        if (this.pickerSlider) {
                            this.pickerSlider.animate = on;
                            this.hueSlider.animate = on;
                        }
                    }
                });

            this.on(this.OPT.HUE + "Change", this._updateRGBFromHSV, this, true);
            this.on(this.OPT.SATURATION + "Change", this._updateRGBFromHSV, this, true);
            this.on(this.OPT.VALUE + "Change", this._updateRGBFromHSV, this, true);

            this.on(this.OPT.RED + "Change", this._updateRGB, this, true);
            this.on(this.OPT.GREEN + "Change", this._updateRGB, this, true);
            this.on(this.OPT.BLUE + "Change", this._updateRGB, this, true);

            this.on(this.OPT.HEX + "Change", this._updateHex, this, true);

            this._initElements();
        }
    });

    YAHOO.widget.ColorPicker = ColorPicker;
})();
YAHOO.register("colorpicker", YAHOO.widget.ColorPicker, {version: "2.9.0", build: "2800"});
