/**
 * Provides specific methods to draw with SVG.
 */
Ext.define('Ext.draw.engine.Svg', {

    /* Begin Definitions */

    extend: 'Ext.draw.Surface',

    requires: ['Ext.draw.Draw', 'Ext.draw.Sprite', 'Ext.draw.Matrix', 'Ext.Element'],

    /* End Definitions */

    engine: 'Svg',

    trimRe: /^\s+|\s+$/g,
    spacesRe: /\s+/,
    xlink: "http:/" + "/www.w3.org/1999/xlink",

    translateAttrs: {
        radius: "r",
        radiusX: "rx",
        radiusY: "ry",
        path: "d",
        lineWidth: "stroke-width",
        fillOpacity: "fill-opacity",
        strokeOpacity: "stroke-opacity",
        strokeLinejoin: "stroke-linejoin"
    },

    parsers: {},

    minDefaults: {
        circle: {
            cx: 0,
            cy: 0,
            r: 0,
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        ellipse: {
            cx: 0,
            cy: 0,
            rx: 0,
            ry: 0,
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        rect: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            rx: 0,
            ry: 0,
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        text: {
            x: 0,
            y: 0,
            "text-anchor": "start",
            "font-family": null,
            "font-size": null,
            "font-weight": null,
            "font-style": null,
            fill: "#000",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        path: {
            d: "M0,0",
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        image: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            preserveAspectRatio: "none",
            opacity: null
        }
    },

    createSvgElement: function(type, attrs) {
        var el = this.domRef.createElementNS("http:/" + "/www.w3.org/2000/svg", type),
            key;
        if (attrs) {
            for (key in attrs) {
                el.setAttribute(key, String(attrs[key]));
            }
        }
        return el;
    },

    createSpriteElement: function(sprite) {
        // Create svg element and append to the DOM.
        var el = this.createSvgElement(sprite.type);
        el.id = sprite.id;
        if (el.style) {
            el.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
        }
        sprite.el = Ext.get(el);
        this.applyZIndex(sprite); //performs the insertion
        sprite.matrix = new Ext.draw.Matrix();
        sprite.bbox = {
            plain: 0,
            transform: 0
        };
        this.applyAttrs(sprite);
        this.applyTransformations(sprite);
        sprite.fireEvent("render", sprite);
        return el;
    },
    
    getBBoxText: function (sprite) {
        var bbox = {},
            bb, height, width, i, ln, el;

        if (sprite && sprite.el) {
            el = sprite.el.dom;
            try {
                bbox = el.getBBox();
                return bbox;
            } catch(e) {
                // Firefox 3.0.x plays badly here
            }
            bbox = {x: bbox.x, y: Infinity, width: 0, height: 0};
            ln = el.getNumberOfChars();
            for (i = 0; i < ln; i++) {
                bb = el.getExtentOfChar(i);
                bbox.y = Math.min(bb.y, bbox.y);
                height = bb.y + bb.height - bbox.y;
                bbox.height = Math.max(bbox.height, height);
                width = bb.x + bb.width - bbox.x;
                bbox.width = Math.max(bbox.width, width);
            }
            return bbox;
        }
    },

    hide: function() {
        Ext.get(this.el).hide();
    },

    show: function() {
        Ext.get(this.el).show();
    },

    hidePrim: function(sprite) {
        this.addCls(sprite, Ext.baseCSSPrefix + 'hide-visibility');
    },

    showPrim: function(sprite) {
        this.removeCls(sprite, Ext.baseCSSPrefix + 'hide-visibility');
    },

    getDefs: function() {
        return this._defs || (this._defs = this.createSvgElement("defs"));
    },

    transform: function(sprite, matrixOnly) {
        var me = this,
            matrix = new Ext.draw.Matrix(),
            transforms = sprite.transformations,
            transformsLength = transforms.length,
            i = 0,
            transform, type;
            
        for (; i < transformsLength; i++) {
            transform = transforms[i];
            type = transform.type;
            if (type == "translate") {
                matrix.translate(transform.x, transform.y);
            }
            else if (type == "rotate") {
                matrix.rotate(transform.degrees, transform.x, transform.y);
            }
            else if (type == "scale") {
                matrix.scale(transform.x, transform.y, transform.centerX, transform.centerY);
            }
        }
        sprite.matrix = matrix;
        if (!matrixOnly) {
            sprite.el.set({transform: matrix.toSvg()});
        }
    },

    setSize: function(width, height) {
        var me = this,
            el = me.el;
        
        width = +width || me.width;
        height = +height || me.height;
        me.width = width;
        me.height = height;

        el.setSize(width, height);
        el.set({
            width: width,
            height: height
        });
        me.callParent([width, height]);
    },

    /**
     * Get the region for the surface's canvas area
     * @returns {Ext.util.Region}
     */
    getRegion: function() {
        // Mozilla requires using the background rect because the svg element returns an
        // incorrect region. Webkit gives no region for the rect and must use the svg element.
        var svgXY = this.el.getXY(),
            rectXY = this.bgRect.getXY(),
            max = Math.max,
            x = max(svgXY[0], rectXY[0]),
            y = max(svgXY[1], rectXY[1]);
        return {
            left: x,
            top: y,
            right: x + this.width,
            bottom: y + this.height
        };
    },

    onRemove: function(sprite) {
        if (sprite.el) {
            sprite.el.destroy();
            delete sprite.el;
        }
        this.callParent(arguments);
    },
    
    setViewBox: function(x, y, width, height) {
        if (isFinite(x) && isFinite(y) && isFinite(width) && isFinite(height)) {
            this.callParent(arguments);
            this.el.dom.setAttribute("viewBox", [x, y, width, height].join(" "));
        }
    },

    render: function (container) {
        var me = this,
            cfg, el, defs, bgRect, webkitRect;
            
        if (!me.el) {
            cfg = {
                xmlns: "http:/" + "/www.w3.org/2000/svg",
                version: 1.1,
                width: me.width || 0,
                height: me.height || 0
            };
            
            if (me.forceLtr) {
                cfg.direction = 'ltr';
            }
            
            el = me.createSvgElement('svg', cfg);
            defs = me.getDefs();

            // Create a rect that is always the same size as the svg root; this serves 2 purposes:
            // (1) It allows mouse events to be fired over empty areas in Webkit, and (2) we can
            // use it rather than the svg element for retrieving the correct client rect of the
            // surface in Mozilla (see https://bugzilla.mozilla.org/show_bug.cgi?id=530985)
            bgRect = me.createSvgElement("rect", {
                width: "100%",
                height: "100%",
                fill: "#000",
                stroke: "none",
                opacity: 0
            });
            
            if (Ext.isSafari3) {
                // Rect that we will show/hide to fix old WebKit bug with rendering issues.
                webkitRect = me.createSvgElement("rect", {
                    x: -10,
                    y: -10,
                    width: "110%",
                    height: "110%",
                    fill: "none",
                    stroke: "#000"
                });
            }
            el.appendChild(defs);
            if (Ext.isSafari3) {
                el.appendChild(webkitRect);
            }
            el.appendChild(bgRect);
            container.appendChild(el);
            me.el = Ext.get(el);
            me.bgRect = Ext.get(bgRect);
            if (Ext.isSafari3) {
                me.webkitRect = Ext.get(webkitRect);
                me.webkitRect.hide();
            }
            me.el.on({
                scope: me,
                mouseup: me.onMouseUp,
                mousedown: me.onMouseDown,
                mouseover: me.onMouseOver,
                mouseout: me.onMouseOut,
                mousemove: me.onMouseMove,
                mouseenter: me.onMouseEnter,
                mouseleave: me.onMouseLeave,
                click: me.onClick,
                dblclick: me.onDblClick
            });
        }
        me.renderAll();
    },

    // private
    onMouseEnter: function(e) {
        if (this.el.parent().getRegion().contains(e.getPoint())) {
            this.fireEvent('mouseenter', e);
        }
    },

    // private
    onMouseLeave: function(e) {
        if (!this.el.parent().getRegion().contains(e.getPoint())) {
            this.fireEvent('mouseleave', e);
        }
    },
    // @private - Normalize a delegated single event from the main container to each sprite and sprite group
    processEvent: function(name, e) {
        var target = e.getTarget(),
            surface = this.surface,
            sprite;

        this.fireEvent(name, e);
        // We wrap text types in a tspan, sprite is the parent.
        if (target.nodeName == "tspan" && target.parentNode) {
            target = target.parentNode;
        }
        sprite = this.items.get(target.id);
        if (sprite) {
            sprite.fireEvent(name, sprite, e);
        }
    },

    /* @private - Wrap SVG text inside a tspan to allow for line wrapping.  In addition this normallizes
     * the baseline for text the vertical middle of the text to be the same as VML.
     */
    tuneText: function (sprite, attrs) {
        var el = sprite.el.dom,
            tspans = [],
            height, tspan, text, i, ln, texts, factor, x;

        if (attrs.hasOwnProperty("text")) {
            //only create new tspans for text lines if the text has been 
            //updated or if it's the first time we're setting the text
            //into the sprite.

            //get the actual rendered text.
            text = sprite.tspans && Ext.Array.map(sprite.tspans, function(t) { return t.textContent; }).join('');

            if (!sprite.tspans || attrs.text != text) {
                tspans = this.setText(sprite, attrs.text);
                sprite.tspans = tspans;
            //for all other cases reuse the tspans previously created.
            } else {
                tspans = sprite.tspans || [];
            }
        }
        // Normalize baseline via a DY shift of first tspan. Shift other rows by height * line height (1.2)
        if (tspans.length) {
            height = this.getBBoxText(sprite).height;
            x = sprite.el.dom.getAttribute("x");
            for (i = 0, ln = tspans.length; i < ln; i++) {
                // The text baseline for FireFox 3.0 and 3.5 is different than other SVG implementations
                // so we are going to normalize that here
                factor = (Ext.isFF3_0 || Ext.isFF3_5) ? 2 : 4;
                tspans[i].setAttribute("x", x);
                tspans[i].setAttribute("dy", i ? height * 1.2 : height / factor);
            }
            sprite.dirty = true;
        }
    },

    setText: function(sprite, textString) {
         var me = this,
             el = sprite.el.dom,
             tspans = [],
             height, tspan, text, i, ln, texts;
        
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        // Wrap each row into tspan to emulate rows
        texts = String(textString).split("\n");
        for (i = 0, ln = texts.length; i < ln; i++) {
            text = texts[i];
            if (text) {
                tspan = me.createSvgElement("tspan");
                tspan.appendChild(document.createTextNode(Ext.htmlDecode(text)));
                el.appendChild(tspan);
                tspans[i] = tspan;
            }
        }
        return tspans;
    },

    renderAll: function() {
        this.items.each(this.renderItem, this);
    },

    renderItem: function (sprite) {
        if (!this.el) {
            return;
        }
        if (!sprite.el) {
            this.createSpriteElement(sprite);
        }
        if (sprite.zIndexDirty) {
            this.applyZIndex(sprite);
        }
        if (sprite.dirty) {
            this.applyAttrs(sprite);
            if (sprite.dirtyTransform) {
                this.applyTransformations(sprite);
            }
        }
    },

    redraw: function(sprite) {
        sprite.dirty = sprite.zIndexDirty = true;
        this.renderItem(sprite);
    },

    applyAttrs: function (sprite) {
        var me = this,
            el = sprite.el,
            group = sprite.group,
            sattr = sprite.attr,
            parsers = me.parsers,
            //Safari does not handle linear gradients correctly in quirksmode
            //ref: https://bugs.webkit.org/show_bug.cgi?id=41952
            //ref: EXTJSIV-1472
            gradientsMap = me.gradientsMap || {},
            safariFix = Ext.isSafari && !Ext.isStrict,
            groups, i, ln, attrs, font, key, style, name, rect;

        if (group) {
            groups = [].concat(group);
            ln = groups.length;
            for (i = 0; i < ln; i++) {
                group = groups[i];
                me.getGroup(group).add(sprite);
            }
            delete sprite.group;
        }
        attrs = me.scrubAttrs(sprite) || {};

        // if (sprite.dirtyPath) {
            sprite.bbox.plain = 0;
            sprite.bbox.transform = 0;
            if (sprite.type == "circle" || sprite.type == "ellipse") {
                attrs.cx = attrs.cx || attrs.x;
                attrs.cy = attrs.cy || attrs.y;
            }
            else if (sprite.type == "rect") {
                attrs.rx = attrs.ry = attrs.r;
            }
            else if (sprite.type == "path" && attrs.d) {
                attrs.d = Ext.draw.Draw.pathToString(Ext.draw.Draw.pathToAbsolute(attrs.d));
            }
            sprite.dirtyPath = false;
        // }
        // else {
        //     delete attrs.d;
        // }

        if (attrs['clip-rect']) {
            me.setClip(sprite, attrs);
            delete attrs['clip-rect'];
        }
        if (sprite.type == 'text' && attrs.font && sprite.dirtyFont) {
            el.set({ style: "font: " + attrs.font});
        }
        if (sprite.type == "image") {
            el.dom.setAttributeNS(me.xlink, "href", attrs.src);
        }
        Ext.applyIf(attrs, me.minDefaults[sprite.type]);

        if (sprite.dirtyHidden) {
            (sattr.hidden) ? me.hidePrim(sprite) : me.showPrim(sprite);
            sprite.dirtyHidden = false;
        }
        for (key in attrs) {
            if (attrs.hasOwnProperty(key) && attrs[key] != null) {
                //Safari does not handle linear gradients correctly in quirksmode
                //ref: https://bugs.webkit.org/show_bug.cgi?id=41952
                //ref: EXTJSIV-1472
                //if we're Safari in QuirksMode and we're applying some color attribute and the value of that
                //attribute is a reference to a gradient then assign a plain color to that value instead of the gradient.
                if (safariFix && ('color|stroke|fill'.indexOf(key) > -1) && (attrs[key] in gradientsMap)) {
                    attrs[key] = gradientsMap[attrs[key]];
                }
                //hidden is not a proper SVG attribute.
                if (key == 'hidden' && sprite.type == 'text') {
                    continue;
                }
                if (key in parsers) {
                    el.dom.setAttribute(key, parsers[key](attrs[key], sprite, me));
                } else {
                    el.dom.setAttribute(key, attrs[key]);
                }
            }
        }
        
        if (sprite.type == 'text') {
            me.tuneText(sprite, attrs);
        }
        sprite.dirtyFont = false;

        //set styles
        style = sattr.style;
        if (style) {
            el.setStyle(style);
        }

        sprite.dirty = false;

        if (Ext.isSafari3) {
            // Refreshing the view to fix bug EXTJSIV-1: rendering issue in old Safari 3
            me.webkitRect.show();
            setTimeout(function () {
                me.webkitRect.hide();
            });
        }
    },

    setClip: function(sprite, params) {
        var me = this,
            rect = params["clip-rect"],
            clipEl, clipPath;
        if (rect) {
            if (sprite.clip) {
                sprite.clip.parentNode.parentNode.removeChild(sprite.clip.parentNode);
            }
            clipEl = me.createSvgElement('clipPath');
            clipPath = me.createSvgElement('rect');
            clipEl.id = Ext.id(null, 'ext-clip-');
            clipPath.setAttribute("x", rect.x);
            clipPath.setAttribute("y", rect.y);
            clipPath.setAttribute("width", rect.width);
            clipPath.setAttribute("height", rect.height);
            clipEl.appendChild(clipPath);
            me.getDefs().appendChild(clipEl);
            sprite.el.dom.setAttribute("clip-path", "url(#" + clipEl.id + ")");
            sprite.clip = clipPath;
        } 
        // if (!attrs[key]) {
        //     var clip = Ext.getDoc().dom.getElementById(sprite.el.getAttribute("clip-path").replace(/(^url\(#|\)$)/g, ""));
        //     clip && clip.parentNode.removeChild(clip);
        //     sprite.el.setAttribute("clip-path", "");
        //     delete attrss.clip;
        // }
    },

    /**
     * Insert or move a given sprite's element to the correct place in the DOM list for its zIndex
     * @param {Ext.draw.Sprite} sprite
     */
    applyZIndex: function(sprite) {
        var me = this,
            items = me.items,
            idx = items.indexOf(sprite),
            el = sprite.el,
            prevEl;
        if (me.el.dom.childNodes[idx + 2] !== el.dom) { //shift by 2 to account for defs and bg rect
            if (idx > 0) {
                // Find the first previous sprite which has its DOM element created already
                do {
                    prevEl = items.getAt(--idx).el;
                } while (!prevEl && idx > 0);
            }
            el.insertAfter(prevEl || me.bgRect);
        }
        sprite.zIndexDirty = false;
    },

    createItem: function (config) {
        var sprite = new Ext.draw.Sprite(config);
        sprite.surface = this;
        return sprite;
    },

    addGradient: function(gradient) {
        gradient = Ext.draw.Draw.parseGradient(gradient);
        var me = this,
            ln = gradient.stops.length,
            vector = gradient.vector,
            //Safari does not handle linear gradients correctly in quirksmode
            //ref: https://bugs.webkit.org/show_bug.cgi?id=41952
            //ref: EXTJSIV-1472
            usePlain = Ext.isSafari && !Ext.isStrict,
            gradientEl, stop, stopEl, i, gradientsMap;
            
        gradientsMap = me.gradientsMap || {};
        
        if (!usePlain) {
            if (gradient.type == "linear") {
                gradientEl = me.createSvgElement("linearGradient");
                gradientEl.setAttribute("x1", vector[0]);
                gradientEl.setAttribute("y1", vector[1]);
                gradientEl.setAttribute("x2", vector[2]);
                gradientEl.setAttribute("y2", vector[3]);
            }
            else {
                gradientEl = me.createSvgElement("radialGradient");
                gradientEl.setAttribute("cx", gradient.centerX);
                gradientEl.setAttribute("cy", gradient.centerY);
                gradientEl.setAttribute("r", gradient.radius);
                if (Ext.isNumber(gradient.focalX) && Ext.isNumber(gradient.focalY)) {
                    gradientEl.setAttribute("fx", gradient.focalX);
                    gradientEl.setAttribute("fy", gradient.focalY);
                }
            }
            gradientEl.id = gradient.id;
            me.getDefs().appendChild(gradientEl);
            for (i = 0; i < ln; i++) {
                stop = gradient.stops[i];
                stopEl = me.createSvgElement("stop");
                stopEl.setAttribute("offset", stop.offset + "%");
                stopEl.setAttribute("stop-color", stop.color);
                stopEl.setAttribute("stop-opacity",stop.opacity);
                gradientEl.appendChild(stopEl);
            }
        } else {
            gradientsMap['url(#' + gradient.id + ')'] = gradient.stops[0].color;
        }
        me.gradientsMap = gradientsMap;
    },

    /**
     * Checks if the specified CSS class exists on this element's DOM node.
     * @param {Ext.draw.Sprite} sprite The sprite to look into.
     * @param {String} className The CSS class to check for
     * @return {Boolean} True if the class exists, else false
     */
    hasCls: function(sprite, className) {
        return className && (' ' + (sprite.el.dom.getAttribute('class') || '') + ' ').indexOf(' ' + className + ' ') != -1;
    },

    addCls: function(sprite, className) {
        var el = sprite.el,
            i,
            len,
            v,
            cls = [],
            curCls =  el.getAttribute('class') || '';
        // Separate case is for speed
        if (!Ext.isArray(className)) {
            if (typeof className == 'string' && !this.hasCls(sprite, className)) {
                el.set({ 'class': curCls + ' ' + className });
            }
        }
        else {
            for (i = 0, len = className.length; i < len; i++) {
                v = className[i];
                if (typeof v == 'string' && (' ' + curCls + ' ').indexOf(' ' + v + ' ') == -1) {
                    cls.push(v);
                }
            }
            if (cls.length) {
                el.set({ 'class': ' ' + cls.join(' ') });
            }
        }
    },

    removeCls: function(sprite, className) {
        var me = this,
            el = sprite.el,
            curCls =  el.getAttribute('class') || '',
            i, idx, len, cls, elClasses;
        if (!Ext.isArray(className)){
            className = [className];
        }
        if (curCls) {
            elClasses = curCls.replace(me.trimRe, ' ').split(me.spacesRe);
            for (i = 0, len = className.length; i < len; i++) {
                cls = className[i];
                if (typeof cls == 'string') {
                    cls = cls.replace(me.trimRe, '');
                    idx = Ext.Array.indexOf(elClasses, cls);
                    if (idx != -1) {
                        Ext.Array.erase(elClasses, idx, 1);
                    }
                }
            }
            el.set({ 'class': elClasses.join(' ') });
        }
    },

    destroy: function() {
        var me = this;
        
        me.callParent();
        if (me.el) {
            me.el.destroy();
        }
        if (me._defs) {
            Ext.get(me._defs).destroy();
        }
        if (me.bgRect) {
            Ext.get(me.bgRect).destroy();
        }
        if (me.webkitRect) {
            Ext.get(me.webkitRect).destroy();
        }
        delete me.el;
    }
});
