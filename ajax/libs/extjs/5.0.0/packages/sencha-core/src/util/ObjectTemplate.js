/**
 * This class accepts an object that serves as a template for creating new objects. Like
 * other templates (`Ext.XTemplate`) this creation step requires a context object to give
 * the template its values.
 *
 * For example:
 *
 *      var tpl = new Ext.util.ObjectTemplate({
 *          property: 'Hello {name}',
 *          data: {
 *              value: '{age}'
 *          }
 *      });
 *
 *      var obj = tpl.apply({
 *          name: 'Bill',
 *          age: 42
 *      });
 *
 *      // obj = {
 *      //     property: 'Hello Bill',
 *      //     data: {
 *      //         value: 42
 *      //     }
 *      // }
 *
 * @since 5.0.0
 */
Ext.define('Ext.util.ObjectTemplate', {
    requires: [
        'Ext.XTemplate'
    ],

    isObjectTemplate: true,

    excludeProperties: {},

    valueRe: /^[{][a-z\.]+[}]$/i,

    statics: {
        /**
         * Creates an `ObjectTemplate` given a config object or instance.
         * @param {Object/Ext.util.ObjectTemplate} template The template object.
         * @param {Object} [options]
         * @return {Ext.util.ObjectTemplate}
         * @since 5.0.0
         */
        create: function (template, options) {
            //<debug>
            if (!Ext.isObject(template)) {
                Ext.Error.raise('The template is not an Object');
            }
            //</debug>

            return template.isObjectTemplate ? template
                                : new Ext.util.ObjectTemplate(template, options);
        }
    },

    /**
     * Constructs the `ObjectTemplate`. The actual compilation of the object to a ready to
     * apply form happens on the first call to `apply`.
     * @param {Object} template
     * @param {Object} [options]
     * @since 5.0.0
     */
    constructor: function (template, options) {
        Ext.apply(this, options);

        this.template = template;
    },

    /**
     * Applies the given `context` object to this template and returns a new object with
     * the appropriate pieces replaced.
     * @param {Object} context The data used to populate the template.
     * @return {Object}
     * @since 5.0.0
     */
    apply: function (context) {
        var me = this;

        delete me.apply;

        me.apply = me.compile(me.template);

        return me.apply(context);
    },

    privates: {
        /**
         * Compiles the  given template into an `apply` method that is ready to run. This
         * method is used recursively to process object properties and array elements.
         * @param {Mixed} template
         * @return {Function}
         * @since 5.0.0
         */
        compile: function (template) {
            var me = this,
                exclude = me.excludeProperties,
                compiled, i, len, fn;

            // TODO: loops over array or objects

            if (Ext.isString(template)) {
                if (template.indexOf('{') < 0) {
                    fn = function () {
                        return template;
                    };
                } else if (me.valueRe.test(template)) {
                    template = template.substring(1, template.length - 1).split('.');

                    fn = function (context) {
                        for (var v = context, i = 0; v && i < template.length; ++i) {
                            v = v[template[i]];
                        }
                        return v;
                    };
                } else {
                    template = new Ext.XTemplate(template);

                    fn = function (context) {
                        return template.apply(context);
                    };
                }
            } else if (Ext.isPrimitive(template)) {
                fn = function () {
                    return template;
                };
            } else if (template instanceof Array) {
                compiled = [];

                for (i = 0, len = template.length; i < len; ++i) {
                    compiled[i] = me.compile(template[i]);
                }

                fn = function (context) {
                    var ret = [],
                        i;

                    for (i = 0; i < len; ++i) {
                        ret[i] = compiled[i](context);
                    }

                    return ret;
                };
            } else {
                compiled = {};

                for (i in template) {
                    if (!exclude[i]) {
                        compiled[i] = me.compile(template[i]);
                    }
                }

                fn = function (context) {
                    var ret = {},
                        i, v;

                    for (i in template) {
                        v = exclude[i] ? template[i] : compiled[i](context);
                        if (v !== undefined) {
                            ret[i] = v;
                        }
                    }

                    return ret;
                };
            }

            return fn;
        }
    }
});
