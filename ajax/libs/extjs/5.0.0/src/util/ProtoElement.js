/*
 * The dirty implementation in this class is quite naive. The reasoning for this is that the dirty state
 * will only be used in very specific circumstances, specifically, after the render process has begun but
 * the component is not yet rendered to the DOM. As such, we want it to perform as quickly as possible
 * so it's not as fully featured as you may expect.
 */

/**
 * Manages certain element-like data prior to rendering. These values are passed
 * on to the render process. This is currently used to manage the "class" and "style" attributes
 * of a component's primary el as well as the bodyEl of panels. This allows things like
 * addBodyCls in Panel to share logic with addCls in Component.
 * @private
 */
Ext.define('Ext.util.ProtoElement', function () {
    var splitWords = Ext.String.splitWords,
        toMap = Ext.Array.toMap;

    return {
        isProtoEl: true,

        /**
         * The property name for the className on the data object passed to {@link #writeTo}.
         */
        clsProp: 'cls',

        /**
         * The property name for the style on the data object passed to {@link #writeTo}.
         */
        styleProp: 'style',

        /**
         * The property name for the removed classes on the data object passed to {@link #writeTo}.
         */
        removedProp: 'removed',

        /**
         * True if the style must be converted to text during {@link #writeTo}. When used to
         * populate tpl data, this will be true. When used to populate {@link Ext.dom.Helper}
         * specs, this will be false (the default).
         */
        styleIsText: false,

        constructor: function (config) {
            var me = this,
                cls, style;

            if (config) {
                Ext.apply(me, config);
                cls = me.cls;
                style = me.style;
                delete me.cls;
            }

            me.classList = cls ? splitWords(cls) : [];
            me.classMap = cls ? toMap(me.classList) : {};

            if (style) {
                if (typeof style === 'string') {
                    me.style = Ext.Element.parseStyles(style);
                } else if (Ext.isFunction(style)) {
                    me.styleFn = style;
                    delete me.style;
                } else {
                    me.style = Ext.apply({}, style); // don't edit the given object
                }
            }
        },

        /**
         * Indicates that the current state of the object has been flushed to the DOM, so we need
         * to track any subsequent changes
         */
        flush: function(){
            this.flushClassList = [];
            this.removedClasses = {};
            // clear the style, it will be recreated if we add anything new
            delete this.style;
            delete this.unselectableAttr;
        },

        /**
         * Adds class to the element.
         * @param {String} cls One or more classnames separated with spaces.
         * @return {Ext.util.ProtoElement} this
         */
        addCls: function (cls) {

            if (!cls) {
                return this;
            }
            var me = this,
                add = (typeof cls === 'string') ? splitWords(cls) : cls,
                length = add.length,
                list = me.classList,
                map = me.classMap,
                flushList = me.flushClassList,
                i = 0,
                c;

            for (; i < length; ++i) {
                c = add[i];
                if (!map[c]) {
                    map[c] = true;
                    list.push(c);
                    if (flushList) {
                        flushList.push(c);
                        delete me.removedClasses[c];
                    }
                }
            }

            return me;
        },

        /**
         * True if the element has given class.
         * @param {String} cls
         * @return {Boolean}
         */
        hasCls: function (cls) {
            return cls in this.classMap;
        },

        /**
         * Removes class from the element.
         * @param {String} cls One or more classnames separated with spaces.
         * @return {Ext.util.ProtoElement} this
         */
        removeCls: function (cls) {
            var me = this,
                list = me.classList,
                newList = (me.classList = []),
                remove = toMap(splitWords(cls)),
                length = list.length,
                map = me.classMap,
                removedClasses = me.removedClasses,
                i, c;

            for (i = 0; i < length; ++i) {
                c = list[i];
                if (remove[c]) {
                    if (removedClasses) {
                        if (map[c]) {
                            removedClasses[c] = true;
                            Ext.Array.remove(me.flushClassList, c);
                        }
                    }
                    delete map[c];
                } else {
                    newList.push(c);
                }
            }

            return me;
        },

        /**
         * Adds styles to the element.
         * @param {String/Object} prop The style property to be set, or an object of multiple styles.
         * @param {String} [value] The value to apply to the given property.
         * @return {Ext.util.ProtoElement} this
         */
        setStyle: function (prop, value) {
            var me = this,
                style = me.style || (me.style = {});

            if (typeof prop == 'string') {
                if (arguments.length === 1) {
                    me.setStyle(Ext.Element.parseStyles(prop));
                } else {
                    style[prop] = value;
                }
            } else {
                Ext.apply(style, prop);
            }

            return me;
        },

        unselectable: function() {
            // See Ext.dom.Element.unselectable for an explanation of what is required to make an element unselectable
            this.addCls(Ext.dom.Element.unselectableCls);

            if (Ext.isOpera) {
                this.unselectableAttr = true;
            }
        },

        /**
         * Writes style and class properties to given object.
         * Styles will be written to {@link #styleProp} and class names to {@link #clsProp}.
         * @param {Object} to
         * @return {Object} to
         */
        writeTo: function (to) {
            var me = this,
                classList = me.flushClassList || me.classList,
                removedClasses = me.removedClasses,
                style;

            if (me.styleFn) {
                style = Ext.apply({}, me.styleFn());
                Ext.apply(style, me.style);
            } else {
                style = me.style;
            }

            to[me.clsProp] = classList.join(' ');

            if (style) {
                to[me.styleProp] = me.styleIsText ? Ext.DomHelper.generateStyles(style, null, true) : style;
            }

            if (removedClasses) {
                removedClasses = Ext.Object.getKeys(removedClasses);
                if (removedClasses.length) {
                    to[me.removedProp] = removedClasses.join(' ');
                }
            }

            if (me.unselectableAttr) {
                to.unselectable = 'on';
            }

            return to;
        }
    };
});
