/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 * @description <p>Creates a Image Cropper control.</p>
 * @namespace YAHOO.widget
 * @requires yahoo, dom, dragdrop, element, event, resize
 * @module imagecropper
 */
(function() {
var Dom = YAHOO.util.Dom,
    Event = YAHOO.util.Event,
    Lang = YAHOO.lang;

    /**
     * @constructor
     * @class ImageCropper
     * @description <p>Creates a Image Cropper control.</p>
     * @extends YAHOO.util.Element
     * @param {String/HTMLElement} el The image element to make croppable.
     * @param {Object} attrs Object liternal containing configuration parameters.
    */
    var Crop = function(el, config) {
        YAHOO.log('Initializing', 'log', 'ImageCropper');
        var oConfig = {
            element: el,
            attributes: config || {}
        };

        Crop.superclass.constructor.call(this, oConfig.element, oConfig.attributes);    
    };

    /**
    * @private
    * @static
    * @property _instances
    * @description Internal hash table for all ImageCropper instances
    * @type Object
    */ 
    Crop._instances = {};
    /**
    * @static
    * @method getCropperById 
    * @description Get's an ImageCropper object by the HTML id of the image associated with the ImageCropper object.
    * @return {Object} The ImageCropper Object
    */ 
    Crop.getCropperById = function(id) {
        if (Crop._instances[id]) {
            return Crop._instances[id];
        }
        return false;
    };

    YAHOO.extend(Crop, YAHOO.util.Element, {
        /**
        * @private
        * @property CSS_MAIN
        * @description The CSS class used to wrap the element 
        * @type String
        */
        CSS_MAIN: 'yui-crop',
        /**
        * @private
        * @property CSS_MASK
        * @description The CSS class for the mask element
        * @type String
        */
        CSS_MASK: 'yui-crop-mask',
        /**
        * @private
        * @property CSS_RESIZE_MASK
        * @description The CSS class for the mask inside the resize element
        * @type {HTML}
        */
        CSS_RESIZE_MASK: 'yui-crop-resize-mask',

        /**
        * @private
        * @property _image
        * @description The url of the image we are cropping
        * @type String
        */
        _image: null,
        /**
        * @private
        * @property _active
        * @description Flag to determine if the crop region is active
        * @type Boolean
        */
        _active: null,
        /**
        * @private
        * @property _resize
        * @description A reference to the Resize Utility used in this Cropper Instance
        * @type Object
        */
        _resize: null,
        /**
        * @private
        * @property _resizeEl
        * @description The HTML Element used to create the Resize Oject
        * @type HTMLElement
        */
        _resizeEl: null,
        /**
        * @private
        * @property _resizeMaskEl
        * @description The HTML Element used to create the Resize mask
        * @type HTMLElement
        */
        _resizeMaskEl: null,
        /**
        * @private
        * @property _wrap
        * @description The HTML Element created to wrap the image
        * @type HTMLElement
        */
        _wrap: null,
        /**
        * @private
        * @property _mask
        * @description The HTML Element created to "mask" the image being cropped
        * @type HTMLElement
        */
        _mask: null,
        /**
        * @private
        * @method _createWrap
        * @description Creates the wrapper element used to wrap the image
        */
        _createWrap: function() {
            YAHOO.log('Creating the wrap element', 'log', 'ImageCropper');
            this._wrap = document.createElement('div');
            this._wrap.id = this.get('element').id + '_wrap';
            this._wrap.className = this.CSS_MAIN;
            var el = this.get('element');
            this._wrap.style.width = el.width ? el.width + 'px' : Dom.getStyle(el, 'width');
            this._wrap.style.height = el.height ? el.height + 'px' : Dom.getStyle(el, 'height');
            
            var par = this.get('element').parentNode;
            par.replaceChild(this._wrap, this.get('element'));
            this._wrap.appendChild(this.get('element'));

            Event.on(this._wrap, 'mouseover', this._handleMouseOver, this, true);
            Event.on(this._wrap, 'mouseout', this._handleMouseOut, this, true);

            Event.on(this._wrap, 'click', function(ev) { Event.stopEvent(ev); }, this, true);
        },

        /**
        * @private
        * @method _createMask
        * @description Creates the mask element used to mask the image
        */
        _createMask: function() {
            YAHOO.log('Creating the Mask', 'log', 'ImageCropper');
            this._mask = document.createElement('div');
            this._mask.className = this.CSS_MASK;
            this._wrap.appendChild(this._mask);
        },

        /**
        * @private
        * @method _createResize
        * @description Creates the resize element and the instance of the Resize Utility
        */
        _createResize: function() {
            YAHOO.log('Creating the Resize element', 'log', 'ImageCropper');
            this._resizeEl = document.createElement('div');
            this._resizeEl.className = YAHOO.util.Resize.prototype.CSS_RESIZE;
            this._resizeEl.style.position = 'absolute';
            
            this._resizeEl.innerHTML = '<div class="' + this.CSS_RESIZE_MASK + '"></div>';
            this._resizeMaskEl = this._resizeEl.firstChild;
            this._wrap.appendChild(this._resizeEl);
            this._resizeEl.style.top = this.get('initialXY')[1] + 'px';
            this._resizeEl.style.left = this.get('initialXY')[0] + 'px';
            this._resizeMaskEl.style.height = Math.floor(this.get('initHeight')) + 'px';
            this._resizeMaskEl.style.width = Math.floor(this.get('initWidth')) + 'px';

            this._resize = new YAHOO.util.Resize(this._resizeEl, {
                knobHandles: true,
                handles: 'all',
                draggable: true,
                status: this.get('status'),
                minWidth: this.get('minWidth'),
                minHeight: this.get('minHeight'),
                ratio: this.get('ratio'),
                autoRatio: this.get('autoRatio'),
                height: this.get('initHeight'),
                width: this.get('initWidth')
            });

            this._setBackgroundImage(this.get('element').getAttribute('src', 2));
            this._setBackgroundPosition(-(this.get('initialXY')[0]),  -(this.get('initialXY')[1]));

            this._resize.on('startResize', this._handleStartResizeEvent, this, true);
            this._resize.on('endResize', this._handleEndResizeEvent, this, true);
            this._resize.on('dragEvent', this._handleDragEvent, this, true);
            this._resize.on('beforeResize', this._handleBeforeResizeEvent, this, true);
            this._resize.on('resize', this._handleResizeEvent, this, true);
            this._resize.dd.on('b4StartDragEvent', this._handleB4DragEvent, this, true);
        },

        /**
        * @private
        * @method _handleMouseOver
        * @description Handles the mouseover event
        */
        _handleMouseOver: function(ev) {
            var evType = 'keydown';
            if (YAHOO.env.ua.gecko || YAHOO.env.ua.opera) {
                evType = 'keypress';
            }
            if (!this._active) {
                this._active = true;
                if (this.get('useKeys')) {
                    Event.on(document, evType, this._handleKeyPress, this, true);
                }
            }
        },
        /**
        * @private
        * @method _handleMouseOut
        * @description Handles the mouseout event
        */
        _handleMouseOut: function(ev) {
            var evType = 'keydown';
            if (YAHOO.env.ua.gecko || YAHOO.env.ua.opera) {
                evType = 'keypress';
            }
            this._active = false;
            if (this.get('useKeys')) {
                Event.removeListener(document, evType, this._handleKeyPress);
            }
        },

        /**
        * @private
        * @method _moveEl
        * @description Moves the resize element based on the arrow keys
        */
        _moveEl: function(dir, inc) {
            YAHOO.log('Moving the element', 'log', 'ImageCropper');
            var t = 0, l = 0,
                region = this._setConstraints(),
                resize = true;

            switch (dir) {
                case 'down':
                    t = -(inc);
                    if ((region.bottom - inc) < 0) {
                        resize = false;
                        this._resizeEl.style.top = (region.top + region.bottom) + 'px';
                    }
                    break;
                case 'up':
                    t = (inc);
                    if ((region.top - inc) < 0) {
                        resize = false;
                        this._resizeEl.style.top = '0px';
                    }
                    break;
                case 'right':
                    l = -(inc);
                    if ((region.right - inc) < 0) {
                        resize = false;
                        this._resizeEl.style.left = (region.left + region.right) + 'px';
                    }
                    break;
                case 'left':
                    l = inc;
                    if ((region.left - inc) < 0) {
                        resize = false;
                        this._resizeEl.style.left = '0px';
                    }
                    break;
            }

            if (resize) {
                YAHOO.log('Moving via Key Listener: ' + dir, 'log', 'ImageCropper');
                this._resizeEl.style.left = (parseInt(this._resizeEl.style.left, 10) - l) + 'px';
                this._resizeEl.style.top = (parseInt(this._resizeEl.style.top, 10) - t) + 'px';
                this.fireEvent('moveEvent', { target: 'keypress' });
            } else {
                this._setConstraints();
            }
            this._syncBackgroundPosition();
        },

        /**
        * @private
        * @method _handleKeyPress
        * @description Handles the keypress event
        */
        _handleKeyPress: function(ev) {
            var kc = Event.getCharCode(ev),
                stopEvent = false,
                inc = ((ev.shiftKey) ? this.get('shiftKeyTick') : this.get('keyTick'));

            switch (kc) {
                case 0x25: // left
                    this._moveEl('left', inc);
                    stopEvent = true;
                    break;
                case 0x26: // up
                    this._moveEl('up', inc);
                    stopEvent = true;
                    break;
                case 0x27: // right
                    this._moveEl('right', inc);
                    stopEvent = true;
                    break;
                case 0x28: // down
                    this._moveEl('down', inc);
                    stopEvent = true;
                    break;
                default:
            }
            if (stopEvent) {
                Event.preventDefault(ev);
            }
        },

        /**
        * @private
        * @method _handleB4DragEvent
        * @description Handles the DragDrop b4DragEvent event
        */
        _handleB4DragEvent: function() {
            this._setConstraints();
        },

        /**
        * @private
        * @method _handleDragEvent
        * @description Handles the DragDrop DragEvent event
        */
        _handleDragEvent: function() {
            this._syncBackgroundPosition();
            this.fireEvent('dragEvent', arguments);
            this.fireEvent('moveEvent', { target: 'dragevent' });
        },

        /**
        * @private
        * @method _handleBeforeResizeEvent
        * @description Handles the Resize Utilitys beforeResize event
        */
        _handleBeforeResizeEvent: function(args) {
            var region = Dom.getRegion(this.get('element')),
                c = this._resize._cache,
                ch = this._resize._currentHandle, h = 0, w = 0;

            if (args.top && (args.top < region.top)) {
                h = (c.height + c.top) - region.top;
                Dom.setY(this._resize.getWrapEl(), region.top);
                this._resize.getWrapEl().style.height = h + 'px';
                this._resize._cache.height = h;
                this._resize._cache.top = region.top;
                this._syncBackgroundPosition();
                return false;
            }
            if (args.left && (args.left < region.left)) {
                w = (c.width + c.left) - region.left;
                Dom.setX(this._resize.getWrapEl(), region.left);
                this._resize._cache.left = region.left;
                this._resize.getWrapEl().style.width = w + 'px';
                this._resize._cache.width = w;
                this._syncBackgroundPosition();
                return false;
            }
            if (ch != 'tl' && ch != 'l' && ch != 'bl') {
                if (c.left && args.width && ((c.left + args.width) > region.right)) {
                    w = (region.right - c.left);
                    Dom.setX(this._resize.getWrapEl(), (region.right - w));
                    this._resize.getWrapEl().style.width = w + 'px';
                    this._resize._cache.left = (region.right - w);
                    this._resize._cache.width = w;
                    this._syncBackgroundPosition();
                    return false;
                }
            }
            if (ch != 't' && ch != 'tr' && ch != 'tl') {
                if (c.top && args.height && ((c.top + args.height) > region.bottom)) {
                    h = (region.bottom - c.top);
                    Dom.setY(this._resize.getWrapEl(), (region.bottom - h));
                    this._resize.getWrapEl().style.height = h + 'px';
                    this._resize._cache.height = h;
                    this._resize._cache.top = (region.bottom - h);
                    this._syncBackgroundPosition();
                    return false;
                }
            }
        },
        /**
        * @private
        * @method _handleResizeMaskEl
        * @description Resizes the inner mask element
        */
        _handleResizeMaskEl: function() {
            var a = this._resize._cache;
            this._resizeMaskEl.style.height = Math.floor(a.height) + 'px';
            this._resizeMaskEl.style.width = Math.floor(a.width) + 'px';
        },
        /**
        * @private
        * @method _handleResizeEvent
        * @param Event ev The Resize Utilitys resize event.
        * @description Handles the Resize Utilitys Resize event
        */
        _handleResizeEvent: function(ev) {
            this._setConstraints(true);
            this._syncBackgroundPosition();
            this.fireEvent('resizeEvent', arguments);
            this.fireEvent('moveEvent', { target: 'resizeevent' });
        },

        /**
        * @private
        * @method _syncBackgroundPosition
        * @description Syncs the packground position of the resize element with the resize elements top and left style position
        */
        _syncBackgroundPosition: function() {
            this._handleResizeMaskEl();
            this._setBackgroundPosition(-(parseInt(this._resizeEl.style.left, 10)), -(parseInt(this._resizeEl.style.top, 10)));
        },

        /**
        * @private
        * @method _setBackgroundPosition
        * @param Number l The left position
        * @param Number t The top position
        * @description Sets the background image position to the top and left position
        */
        _setBackgroundPosition: function(l, t) {
            //YAHOO.log('Setting the image background position of the mask to: (' + l + ', ' + t + ')', 'log', 'ImageCropper');
            var bl = parseInt(Dom.getStyle(this._resize.get('element'), 'borderLeftWidth'), 10);
            var bt = parseInt(Dom.getStyle(this._resize.get('element'), 'borderTopWidth'), 10);
            if (isNaN(bl)) {
                bl = 0;
            }
            if (isNaN(bt)) {
                bt = 0;
            }
            var mask = this._resize.getWrapEl().firstChild;
            var pos = (l - bl) + 'px ' + (t - bt) + 'px';
            this._resizeMaskEl.style.backgroundPosition = pos;
        },

        /**
        * @private
        * @method _setBackgroundImage
        * @param String url The url of the image
        * @description Sets the background image of the resize element
        */
        _setBackgroundImage: function(url) {
            YAHOO.log('Setting the background image', 'log', 'ImageCropper');
            var mask = this._resize.getWrapEl().firstChild;
            this._image = url;
            mask.style.backgroundImage = 'url(' + url + '#)';
        },
        
        /**
        * @private
        * @method _handleEndResizeEvent
        * @description Handles the Resize Utilitys endResize event
        */
        _handleEndResizeEvent: function() {
            this._setConstraints(true);
        },
        /**
        * @private
        * @method _handleStartResizeEvent
        * @description Handles the Resize Utilitys startResize event
        */
        _handleStartResizeEvent: function() {
            this._setConstraints(true);

            var h = this._resize._cache.height,
                 w = this._resize._cache.width,
                 t = parseInt(this._resize.getWrapEl().style.top, 10),
                 l = parseInt(this._resize.getWrapEl().style.left, 10),
                 maxH = 0, maxW = 0;
 
            switch (this._resize._currentHandle) {
                case 'b':
                    maxH = (h + this._resize.dd.bottomConstraint);
                    break;
                case 'l':
                    maxW = (w + this._resize.dd.leftConstraint);
                    break;
                case 'r':
                    maxH = (h + t);
                    maxW = (w + this._resize.dd.rightConstraint);
                    break;
                 case 'br':
                     maxH = (h + this._resize.dd.bottomConstraint);
                     maxW = (w + this._resize.dd.rightConstraint);
                     break;
                 case 'tr':
                     maxH = (h + t);
                     maxW = (w + this._resize.dd.rightConstraint);
                     break;

             }
            
             if (maxH) {
                YAHOO.log('Setting the maxHeight on the resize object to: ' + maxH, 'log', 'ImageCropper');
                 //this._resize.set('maxHeight', maxH);
             }
             if (maxW) {
                YAHOO.log('Setting the maxWidth on the resize object to: ' + maxW, 'log', 'ImageCropper');
                 //this._resize.set('maxWidth', maxW);
             }

            this.fireEvent('startResizeEvent', arguments);
        },
        
        /**
        * @private
        * @method _setConstraints
        * @param Boolean inside Used when called from inside a resize event, false by default (dragging)
        * @description Set the DragDrop constraints to keep the element inside the crop area.
        * @return {Object} Object containing Top, Right, Bottom and Left constraints
        */
        _setConstraints: function(inside) {
            YAHOO.log('Setting Contraints', 'log', 'ImageCropper');
            var resize = this._resize;
            resize.dd.resetConstraints();
            var height = parseInt(resize.get('height'), 10),
                width = parseInt(resize.get('width'), 10);
            if (inside) {
                //Called from inside the resize callback
                height = resize._cache.height;
                width = resize._cache.width;
            }

            //Get the top, right, bottom and left positions
            var region = Dom.getRegion(this.get('element'));
            //Get the element we are working on
            var el = resize.getWrapEl();

            //Get the xy position of it
            var xy = Dom.getXY(el);

            //Set left to x minus left
            var left = xy[0] - region.left;

            //Set right to right minus x minus width
            var right = region.right - xy[0] - width;

            //Set top to y minus top
            var top = xy[1] - region.top;

            //Set bottom to bottom minus y minus height
            var bottom = region.bottom - xy[1] - height;

            if (top < 0) {
                top = 0;
            }
            
            resize.dd.setXConstraint(left, right); 
            resize.dd.setYConstraint(top, bottom);
            YAHOO.log('Constraints: ' + top + ',' + right + ',' + bottom + ',' + left, 'log', 'ImageCropper');

            return {
                top: top,
                right: right,
                bottom: bottom,
                left: left
            };

            
            
        },
        /**
        * @method getCropCoords
        * @description Returns the coordinates needed to crop the image
        * @return {Object} The top, left, height, width and image url of the image being cropped
        */
        getCropCoords: function() {
            var coords = {
                top: parseInt(this._resize.getWrapEl().style.top, 10),
                left: parseInt(this._resize.getWrapEl().style.left, 10),
                height: this._resize._cache.height,
                width: this._resize._cache.width,
                image: this._image
            };
            YAHOO.log('Getting the crop coordinates: ' + Lang.dump(coords), 'log', 'ImageCropper');
            return coords;
        },
        /**
        * @method reset
        * @description Resets the crop element back to it's original position
        * @return {<a href="YAHOO.widget.ImageCropper.html">YAHOO.widget.ImageCropper</a>} The ImageCropper instance
        */
        reset: function() {
            YAHOO.log('Resetting the control', 'log', 'ImageCropper');
            this._resize.resize(null, this.get('initHeight'), this.get('initWidth'), 0, 0, true);
            this._resizeEl.style.top = this.get('initialXY')[1] + 'px';
            this._resizeEl.style.left = this.get('initialXY')[0] + 'px';
            this._syncBackgroundPosition();
            return this;
        },

        /**
        * @method getEl
        * @description Get the HTML reference for the image element.
        * @return {HTMLElement} The image element
        */      
        getEl: function() {
            return this.get('element');
        },
        /**
        * @method getResizeEl
        * @description Get the HTML reference for the resize element.
        * @return {HTMLElement} The resize element
        */      
        getResizeEl: function() {
            return this._resizeEl;
        },
        /**
        * @method getWrapEl
        * @description Get the HTML reference for the wrap element.
        * @return {HTMLElement} The wrap element
        */      
        getWrapEl: function() {
            return this._wrap;
        },

        /**
        * @method getMaskEl
        * @description Get the HTML reference for the mask element.
        * @return {HTMLElement} The mask element
        */      
        getMaskEl: function() {
            return this._mask;
        },

        /**
        * @method getResizeMaskEl
        * @description Get the HTML reference for the resizable object's mask element.
        * @return {HTMLElement} The resize objects mask element.
        */      
        getResizeMaskEl: function() {
            return this._resizeMaskEl;
        },

        /**
        * @method getResizeObject
        * @description Get the Resize Utility object.
        * @return {<a href="YAHOO.util.Resize.html">YAHOO.util.Resize</a>} The Resize instance
        */      
        getResizeObject: function() {
            return this._resize;
        },

        /** 
        * @private
        * @method init
        * @description The ImageCropper class's initialization method
        */        
        init: function(p_oElement, p_oAttributes) {
            YAHOO.log('init', 'info', 'ImageCropper');
            Crop.superclass.init.call(this, p_oElement, p_oAttributes);

            var id = p_oElement;

            if (!Lang.isString(id)) {
                if (id.tagName && (id.tagName.toLowerCase() == 'img')) {
                    id = Dom.generateId(id);                    
                } else {
                    YAHOO.log('Element is not an image.', 'error', 'ImageCropper');
                    return false;
                }
            } else {
                var el = Dom.get(id);
                if (el.tagName && el.tagName.toLowerCase() == 'img') {
                    //All good
                } else {
                    YAHOO.log('Element is not an image.', 'error', 'ImageCropper');
                    return false;
                }
            }
            


            Crop._instances[id] = this;
            this._createWrap();
            this._createMask();
            this._createResize();
            this._setConstraints();

        },
        /**
        * @private
        * @method initAttributes
        * @description Initializes all of the configuration attributes used to create a croppable element.
        * @param {Object} attr Object literal specifying a set of 
        * configuration attributes used to create the widget.
        */      

        initAttributes: function(attr) {
            Crop.superclass.initAttributes.call(this, attr);

            /**
            * @attribute initialXY
            * @description Array of the XY position that we need to set the crop element to when we build it. Defaults to [10, 10]
            * @type Array
            */
            this.setAttributeConfig('initialXY', {
                validator: YAHOO.lang.isArray,
                value: attr.initialXY || [10, 10]
            });
            /**
            * @attribute keyTick
            * @description The pixel tick for the arrow keys, defaults to 1
            * @type Number
            */
            this.setAttributeConfig('keyTick', {
                validator: YAHOO.lang.isNumber,
                value: attr.keyTick || 1
            });

            /**
            * @attribute shiftKeyTick
            * @description The pixel tick for shift + the arrow keys, defaults to 10
            * @type Number
            */
            this.setAttributeConfig('shiftKeyTick', {
                validator: YAHOO.lang.isNumber,
                value: attr.shiftKeyTick || 10
            });

            /**
            * @attribute useKeys
            * @description Should we use the Arrow keys to position the crop element, defaults to true
            * @type Boolean
            */
            this.setAttributeConfig('useKeys', {
                validator: YAHOO.lang.isBoolean,
                value: ((attr.useKeys === false) ? false : true)
            });

            /**
            * @attribute status
            * @description Show the Resize Utility status, defaults to true
            * @type Boolean
            */
            this.setAttributeConfig('status', {
                validator: YAHOO.lang.isBoolean,
                value: ((attr.status === false) ? false : true),
                method: function(status) {
                    if (this._resize) {
                        this._resize.set('status', status);
                    }
                }
            });

            /**
            * @attribute minHeight
            * @description MinHeight of the crop area, default 50
            * @type Number
            */
            this.setAttributeConfig('minHeight', {
                validator: YAHOO.lang.isNumber,
                value: attr.minHeight || 50,
                method: function(h) {
                    if (this._resize) {
                        this._resize.set('minHeight', h);
                    }
                }
            });

            /**
            * @attribute minWidth
            * @description MinWidth of the crop area, default 50.
            * @type Number
            */
            this.setAttributeConfig('minWidth', {
                validator: YAHOO.lang.isNumber,
                value: attr.minWidth || 50,
                method: function(w) {
                    if (this._resize) {
                        this._resize.set('minWidth', w);
                    }
                }
            });

            /**
            * @attribute ratio
            * @description Set the ratio config option of the Resize Utlility, default false
            * @type Boolean
            */
            this.setAttributeConfig('ratio', {
                validator: YAHOO.lang.isBoolean,
                value: attr.ratio || false,
                method: function(r) {
                    if (this._resize) {
                        this._resize.set('ratio', r);
                    }
                }
            });

            /**
            * @attribute ratio
            * @description Set the autoRatio config option of the Resize Utlility, default true
            * @type Boolean
            */
            this.setAttributeConfig('autoRatio', {
                validator: YAHOO.lang.isBoolean,
                value: ((attr.autoRatio === false) ? false : true),
                method: function(a) {
                    if (this._resize) {
                        this._resize.set('autoRatio', a);
                    }
                }
            });

            /**
            * @attribute initHeight
            * @description Set the initlal height of the crop area, defaults to 1/4 of the image height
            * @type Number
            */
            this.setAttributeConfig('initHeight', {
                writeOnce: true,
                validator: YAHOO.lang.isNumber,
                value: attr.initHeight || (this.get('element').height / 4)
            });

            /**
            * @attribute initWidth
            * @description Set the initlal width of the crop area, defaults to 1/4 of the image width
            * @type Number
            */
            this.setAttributeConfig('initWidth', {
                validator: YAHOO.lang.isNumber,
                writeOnce: true,
                value: attr.initWidth || (this.get('element').width / 4)
            });

        },
        /**
        * @method destroy
        * @description Destroys the ImageCropper object and all of it's elements & listeners.
        */        
        destroy: function() {
            YAHOO.log('Destroying the ImageCropper', 'info', 'ImageCropper');
            this._resize.destroy();
            this._resizeEl.parentNode.removeChild(this._resizeEl);
            this._mask.parentNode.removeChild(this._mask);
            Event.purgeElement(this._wrap);
            this._wrap.parentNode.replaceChild(this.get('element'), this._wrap);
            
            //Brutal Object Destroy
            for (var i in this) {
                if (Lang.hasOwnProperty(this, i)) {
                    this[i] = null;
                }
            }
                       
        },
        /**
        * @method toString
        * @description Returns a string representing the ImageCropper Object.
        * @return {String}
        */        
        toString: function() {
            if (this.get) {
                return 'ImageCropper (#' + this.get('id') + ')';
            }
            return 'Image Cropper';
        }
    });

    YAHOO.widget.ImageCropper = Crop;

/**
* @event dragEvent
* @description Fires when the DragDrop dragEvent
* @type YAHOO.util.CustomEvent
*/
/**
* @event startResizeEvent
* @description Fires when when a resize action is started.
* @type YAHOO.util.CustomEvent
*/
/**
* @event resizeEvent
* @description Fires on every element resize.
* @type YAHOO.util.CustomEvent
*/
/**
* @event moveEvent
* @description Fires on every element move. Inside these methods: _handleKeyPress, _handleDragEvent, _handleResizeEvent
* @type YAHOO.util.CustomEvent
*/

})();

YAHOO.register("imagecropper", YAHOO.widget.ImageCropper, {version: "2.9.0", build: "2800"});
