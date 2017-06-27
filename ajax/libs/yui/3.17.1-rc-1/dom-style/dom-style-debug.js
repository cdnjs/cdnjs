YUI.add('dom-style', function (Y, NAME) {

/**
 * Add style management functionality to DOM.
 * @module dom
 * @submodule dom-style
 * @for DOM
 */

var DOCUMENT_ELEMENT = 'documentElement',
    DEFAULT_VIEW = 'defaultView',
    OWNER_DOCUMENT = 'ownerDocument',
    STYLE = 'style',
    FLOAT = 'float',
    CSS_FLOAT = 'cssFloat',
    STYLE_FLOAT = 'styleFloat',
    TRANSPARENT = 'transparent',
    GET_COMPUTED_STYLE = 'getComputedStyle',
    GET_BOUNDING_CLIENT_RECT = 'getBoundingClientRect',

    DOCUMENT = Y.config.doc,

    Y_DOM = Y.DOM,

    TRANSFORM,
    TRANSFORMORIGIN,
    VENDOR_TRANSFORM = [
        'WebkitTransform',
        'MozTransform',
        'OTransform',
        'msTransform',
        'transform'
    ],

    re_unit = /width|height|top|left|right|bottom|margin|padding/i;

Y.Array.each(VENDOR_TRANSFORM, function(val) {
    if (val in DOCUMENT[DOCUMENT_ELEMENT].style) {
        TRANSFORM = val;
        TRANSFORMORIGIN = val + "Origin";
    }
});

Y.mix(Y_DOM, {
    DEFAULT_UNIT: 'px',

    CUSTOM_STYLES: {
    },


    /**
     * Sets a style property for a given element.
     * @method setStyle
     * @param {HTMLElement} node The HTMLElement to apply the style to.
     * @param {String} att The style property to set.
     * @param {String|Number} val The value.
     * @param {Object} [style] The style node. Defaults to `node.style`.
     */
    setStyle: function(node, att, val, style) {
        style = style || node.style;
        var CUSTOM_STYLES = Y_DOM.CUSTOM_STYLES;

        if (style) {
            if (val === null || val === '') { // normalize unsetting
                val = '';
            } else if (!isNaN(Number(val)) && re_unit.test(att)) { // number values may need a unit
                val += Y_DOM.DEFAULT_UNIT;
            }

            if (att in CUSTOM_STYLES) {
                if (CUSTOM_STYLES[att].set) {
                    CUSTOM_STYLES[att].set(node, val, style);
                    return; // NOTE: return
                } else if (typeof CUSTOM_STYLES[att] === 'string') {
                    att = CUSTOM_STYLES[att];
                }
            } else if (att === '') { // unset inline styles
                att = 'cssText';
                val = '';
            }
            style[att] = val;
        }
    },

    /**
     * Returns the current style value for the given property.
     * @method getStyle
     * @param {HTMLElement} node The HTMLElement to get the style from.
     * @param {String} att The style property to get.
     * @param {Object} [style] The style node. Defaults to `node.style`.
     */
    getStyle: function(node, att, style) {
        style = style || node.style;
        var CUSTOM_STYLES = Y_DOM.CUSTOM_STYLES,
            val = '';

        if (style) {
            if (att in CUSTOM_STYLES) {
                if (CUSTOM_STYLES[att].get) {
                    return CUSTOM_STYLES[att].get(node, att, style); // NOTE: return
                } else if (typeof CUSTOM_STYLES[att] === 'string') {
                    att = CUSTOM_STYLES[att];
                }
            }
            val = style[att];
            if (val === '') { // TODO: is empty string sufficient?
                val = Y_DOM[GET_COMPUTED_STYLE](node, att);
            }
        }

        return val;
    },

    /**
     * Sets multiple style properties.
     * @method setStyles
     * @param {HTMLElement} node The HTMLElement to apply the styles to.
     * @param {Object} hash An object literal of property:value pairs.
     */
    setStyles: function(node, hash) {
        var style = node.style;
        Y.each(hash, function(v, n) {
            Y_DOM.setStyle(node, n, v, style);
        }, Y_DOM);
    },

    /**
     * Returns the computed style for the given node.
     * @method getComputedStyle
     * @param {HTMLElement} node The HTMLElement to get the style from.
     * @param {String} att The style property to get.
     * @return {String} The computed value of the style property.
     */
    getComputedStyle: function(node, att) {
        var val = '',
            doc = node[OWNER_DOCUMENT],
            computed;

        if (node[STYLE] && doc[DEFAULT_VIEW] && doc[DEFAULT_VIEW][GET_COMPUTED_STYLE]) {
            computed = doc[DEFAULT_VIEW][GET_COMPUTED_STYLE](node, null);
            if (computed) { // FF may be null in some cases (ticket #2530548)
                val = computed[att];
            }
        }
        return val;
    }
});

// normalize reserved word float alternatives ("cssFloat" or "styleFloat")
if (DOCUMENT[DOCUMENT_ELEMENT][STYLE][CSS_FLOAT] !== undefined) {
    Y_DOM.CUSTOM_STYLES[FLOAT] = CSS_FLOAT;
} else if (DOCUMENT[DOCUMENT_ELEMENT][STYLE][STYLE_FLOAT] !== undefined) {
    Y_DOM.CUSTOM_STYLES[FLOAT] = STYLE_FLOAT;
}

// safari converts transparent to rgba(), others use "transparent"
if (Y.UA.webkit) {
    Y_DOM[GET_COMPUTED_STYLE] = function(node, att) {
        var view = node[OWNER_DOCUMENT][DEFAULT_VIEW],
            val = view[GET_COMPUTED_STYLE](node, '')[att];

        if (val === 'rgba(0, 0, 0, 0)') {
            val = TRANSPARENT;
        }

        return val;
    };

}

Y.DOM._getAttrOffset = function(node, attr) {
    var val = Y.DOM[GET_COMPUTED_STYLE](node, attr),
        offsetParent = node.offsetParent,
        position,
        parentOffset,
        offset;

    if (val === 'auto') {
        position = Y.DOM.getStyle(node, 'position');
        if (position === 'static' || position === 'relative') {
            val = 0;
        } else if (offsetParent && offsetParent[GET_BOUNDING_CLIENT_RECT]) {
            parentOffset = offsetParent[GET_BOUNDING_CLIENT_RECT]()[attr];
            offset = node[GET_BOUNDING_CLIENT_RECT]()[attr];
            if (attr === 'left' || attr === 'top') {
                val = offset - parentOffset;
            } else {
                val = parentOffset - node[GET_BOUNDING_CLIENT_RECT]()[attr];
            }
        }
    }

    return val;
};

Y.DOM._getOffset = function(node) {
    var pos,
        xy = null;

    if (node) {
        pos = Y_DOM.getStyle(node, 'position');
        xy = [
            parseInt(Y_DOM[GET_COMPUTED_STYLE](node, 'left'), 10),
            parseInt(Y_DOM[GET_COMPUTED_STYLE](node, 'top'), 10)
        ];

        if ( isNaN(xy[0]) ) { // in case of 'auto'
            xy[0] = parseInt(Y_DOM.getStyle(node, 'left'), 10); // try inline
            if ( isNaN(xy[0]) ) { // default to offset value
                xy[0] = (pos === 'relative') ? 0 : node.offsetLeft || 0;
            }
        }

        if ( isNaN(xy[1]) ) { // in case of 'auto'
            xy[1] = parseInt(Y_DOM.getStyle(node, 'top'), 10); // try inline
            if ( isNaN(xy[1]) ) { // default to offset value
                xy[1] = (pos === 'relative') ? 0 : node.offsetTop || 0;
            }
        }
    }

    return xy;

};

if (TRANSFORM) {
    Y_DOM.CUSTOM_STYLES.transform = {
        set: function(node, val, style) {
            style[TRANSFORM] = val;
        },

        get: function(node) {
            return Y_DOM[GET_COMPUTED_STYLE](node, TRANSFORM);
        }
    };

    Y_DOM.CUSTOM_STYLES.transformOrigin = {
        set: function(node, val, style) {
            style[TRANSFORMORIGIN] = val;
        },

        get: function(node) {
            return Y_DOM[GET_COMPUTED_STYLE](node, TRANSFORMORIGIN);
        }
    };
}


}, '@VERSION@', {"requires": ["dom-base"]});
