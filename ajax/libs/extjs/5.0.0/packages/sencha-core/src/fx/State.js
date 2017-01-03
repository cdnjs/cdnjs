/**
 * @private
 */
Ext.define('Ext.fx.State', {

    isAnimatable: {
        'background-color'   : true,
        'background-image'   : true,
        'background-position': true,
        'border-bottom-color': true,
        'border-bottom-width': true,
        'border-color'       : true,
        'border-left-color'  : true,
        'border-left-width'  : true,
        'border-right-color' : true,
        'border-right-width' : true,
        'border-spacing'     : true,
        'border-top-color'   : true,
        'border-top-width'   : true,
        'border-width'       : true,
        'bottom'             : true,
        'color'              : true,
        'crop'               : true,
        'font-size'          : true,
        'font-weight'        : true,
        'height'             : true,
        'left'               : true,
        'letter-spacing'     : true,
        'line-height'        : true,
        'margin-bottom'      : true,
        'margin-left'        : true,
        'margin-right'       : true,
        'margin-top'         : true,
        'max-height'         : true,
        'max-width'          : true,
        'min-height'         : true,
        'min-width'          : true,
        'opacity'            : true,
        'outline-color'      : true,
        'outline-offset'     : true,
        'outline-width'      : true,
        'padding-bottom'     : true,
        'padding-left'       : true,
        'padding-right'      : true,
        'padding-top'        : true,
        'right'              : true,
        'text-indent'        : true,
        'text-shadow'        : true,
        'top'                : true,
        'vertical-align'     : true,
        'visibility'         : true,
        'width'              : true,
        'word-spacing'       : true,
        'z-index'            : true,
        'zoom'               : true,
        'transform'          : true
    },

    constructor: function(data) {
        this.data = {};

        this.set(data);
    },

    setConfig: function(data) {
        this.set(data);

        return this;
    },

    setRaw: function(data) {
        this.data = data;

        return this;
    },

    clear: function() {
        return this.setRaw({});
    },

    setTransform: function(name, value) {
        var data = this.data,
            isArray = Ext.isArray(value),
            transform = data.transform,
            ln, key;

        if (!transform) {
            transform = data.transform = {
                translateX: 0,
                translateY: 0,
                translateZ: 0,
                scaleX: 1,
                scaleY: 1,
                scaleZ: 1,
                rotate: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                skewX: 0,
                skewY: 0
            };
        }

        if (typeof name == 'string') {
            switch (name) {
                case 'translate':
                    if (isArray) {
                        ln = value.length;

                        if (ln == 0) { break; }

                        transform.translateX = value[0];

                        if (ln == 1) { break; }

                        transform.translateY = value[1];

                        if (ln == 2) { break; }

                        transform.translateZ = value[2];
                    }
                    else {
                        transform.translateX = value;
                    }
                    break;

                case 'rotate':
                    if (isArray) {
                        ln = value.length;

                        if (ln == 0) { break; }

                        transform.rotateX = value[0];

                        if (ln == 1) { break; }

                        transform.rotateY = value[1];

                        if (ln == 2) { break; }

                        transform.rotateZ = value[2];
                    }
                    else {
                        transform.rotate = value;
                    }
                    break;


                case 'scale':
                    if (isArray) {
                        ln = value.length;

                        if (ln == 0) { break; }

                        transform.scaleX = value[0];

                        if (ln == 1) { break; }

                        transform.scaleY = value[1];

                        if (ln == 2) { break; }

                        transform.scaleZ = value[2];
                    }
                    else {
                        transform.scaleX = value;
                        transform.scaleY = value;
                    }
                    break;

                case 'skew':
                    if (isArray) {
                        ln = value.length;

                        if (ln == 0) { break; }

                        transform.skewX = value[0];

                        if (ln == 1) { break; }

                        transform.skewY = value[1];
                    }
                    else {
                        transform.skewX = value;
                    }
                    break;

                default:
                    transform[name] = value;
            }
        }
        else {
            for (key in name) {
                if (name.hasOwnProperty(key)) {
                    value = name[key];

                    this.setTransform(key, value);
                }
            }
        }
    },

    set: function(name, value) {
        var data = this.data,
            key;

        if (typeof name != 'string') {
            for (key in name) {
                value = name[key];

                if (key === 'transform') {
                    this.setTransform(value);
                }
                else {
                    data[key] = value;
                }
            }
        }
        else {
            if (name === 'transform') {
                this.setTransform(value);
            }
            else {
                data[name] = value;
            }
        }

        return this;
    },

    unset: function(name) {
        var data = this.data;

        if (data.hasOwnProperty(name)) {
            delete data[name];
        }

        return this;
    },

    getData: function() {
        return this.data;
    }
});


