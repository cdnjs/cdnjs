/**
 * @class Ext.util.Memento
 * This class manages a set of captured properties from an object. These captured properties
 * can later be restored to an object.
 */
Ext.define('Ext.util.Memento', (function () {

    function captureOne (src, target, prop, prefix) {
        src[prefix ? prefix + prop : prop] = target[prop];
    }

    function removeOne (src, target, prop) {
        delete src[prop];
    }

    function restoreOne (src, target, prop, prefix) {
        var name = prefix ? prefix + prop : prop,
            value = src[name];

        if (value || src.hasOwnProperty(name)) {
            restoreValue(target, prop, value);
        }
    }

    function restoreValue (target, prop, value) {
        if (Ext.isDefined(value)) {
            target[prop] = value;
        } else {
            delete target[prop];
        }
    }

    function doMany (doOne, src, target, props, prefix) {
        if (src) {
            if (Ext.isArray(props)) {
                var p, pLen = props.length;
                for (p = 0; p < pLen; p++) {
                    doOne(src, target, props[p], prefix);
                }
            } else {
                doOne(src, target, props, prefix);
            }
        }
    }

    return {
        /**
         * @property data
         * The collection of captured properties.
         * @private
         */
        data: null,

        /**
         * @property target
         * The default target object for capture/restore (passed to the constructor).
         */
        target: null,

        /**
         * Creates a new memento and optionally captures properties from the target object.
         * @param {Object} target The target from which to capture properties. If specified in the
         * constructor, this target becomes the default target for all other operations.
         * @param {String/String[]} props The property or array of properties to capture.
         */
        constructor: function (target, props) {
            this.data = {};

            if (target) {
                this.target = target;
                if (props) {
                    this.capture(props);
                }
            }
        },

        /**
         * Captures the specified properties from the target object in this memento.
         * @param {String/String[]} props The property or array of properties to capture.
         * @param {Object} target The object from which to capture properties.
         */
        capture: function (props, target, prefix) {
            var me = this;
            doMany(captureOne, me.data || (me.data = {}), target || me.target, props, prefix);
        },

        /**
         * Removes the specified properties from this memento. These properties will not be
         * restored later without re-capturing their values.
         * @param {String/String[]} props The property or array of properties to remove.
         */
        remove: function (props) {
            doMany(removeOne, this.data, null, props);
        },

        /**
         * Restores the specified properties from this memento to the target object.
         * @param {String/String[]} props The property or array of properties to restore.
         * @param {Boolean} clear True to remove the restored properties from this memento or
         * false to keep them (default is true).
         * @param {Object} target The object to which to restore properties.
         */
        restore: function (props, clear, target, prefix) {
            doMany(restoreOne, this.data, target || this.target, props, prefix);
            if (clear !== false) {
                this.remove(props);
            }
        },

        /**
         * Restores all captured properties in this memento to the target object.
         * @param {Boolean} clear True to remove the restored properties from this memento or
         * false to keep them (default is true).
         * @param {Object} target The object to which to restore properties.
         */
        restoreAll: function (clear, target) {
            var me   = this,
                t    = target || this.target,
                data = me.data,
                prop;

            clear = clear !== false;

            for (prop in data) {
                if (data.hasOwnProperty(prop)) {
                    restoreValue(t, prop, data[prop]);
                    if (clear) {
                        delete data[prop];
                    }
                }
            }

        }
    };
}()));
