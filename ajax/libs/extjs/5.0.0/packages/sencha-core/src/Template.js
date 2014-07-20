/**
 * Represents an HTML fragment template. Templates may be {@link #compile precompiled} for greater performance.
 *
 * An instance of this class may be created by passing to the constructor either a single argument, or multiple
 * arguments:
 *
 * # Single argument: String/Array
 *
 * The single argument may be either a String or an Array:
 *
 * - String:
 *
 *       var t = new Ext.Template("<div>Hello {0}.</div>");
 *       t.{@link #append}('some-element', ['foo']);
 *
 * - Array:
 *
 *   An Array will be combined with `join('')`.
 *
 *       var t = new Ext.Template([
 *           '<div name="{id}">',
 *               '<span class="{cls}">{name:trim} {value:ellipsis(10)}</span>',
 *           '</div>',
 *       ]);
 *       t.{@link #compile}();
 *       t.{@link #append}('some-element', {id: 'myid', cls: 'myclass', name: 'foo', value: 'bar'});
 *
 * # Multiple arguments: String, Object, Array, ...
 *
 * Multiple arguments will be combined with `join('')`.
 *
 *     var t = new Ext.Template(
 *         '<div name="{id}">',
 *             '<span class="{cls}">{name} {value}</span>',
 *         '</div>',
 *         // a configuration object:
 *         {
 *             compiled: true,      // {@link #compile} immediately
 *         }
 *     );
 *
 * # Notes
 *
 * - For a list of available format functions, see {@link Ext.util.Format}.
 * - `disableFormats` reduces `{@link #apply}` time when no formatting is required.
 */
Ext.define('Ext.Template', {
    requires: [
        //'Ext.dom.Helper',
        'Ext.util.Format'
    ],

    inheritableStatics: {
        /**
         * Creates a template from the passed element's value (_display:none_ textarea, preferred) or innerHTML.
         * @param {String/HTMLElement} el A DOM element or its id
         * @param {Object} config (optional) Config object
         * @return {Ext.Template} The created template
         * @static
         * @inheritable
         */
        from: function(el, config) {
            el = Ext.getDom(el);
            return new this(el.value || el.innerHTML, config || '');
        }
    },

    // Chrome really likes "new Function" to realize the code block (as in it is
    // 2x-3x faster to call it than using eval), but Firefox chokes on it badly.
    // IE and Opera are also fine with the "new Function" technique.
    useEval: Ext.isGecko,

    /* End Definitions */

    /**
     * Creates new template.
     * 
     * @param {String...} html List of strings to be concatenated into template.
     * Alternatively an array of strings can be given, but then no config object may be passed.
     * @param {Object} config (optional) Config object
     */
    constructor: function(html) {
        var me = this,
            args = arguments,
            buffer = [],
            i,
            length = args.length,
            value;

        me.initialConfig = {};
        
        // Allow an array to be passed here so we can
        // pass an array of strings and an object
        // at the end
        if (length === 1 && Ext.isArray(html)) {
            args = html;
            length = args.length;
        }

        if (length > 1) {
            for (i = 0; i < length; i++) {
                value = args[i];
                if (typeof value == 'object') {
                    Ext.apply(me.initialConfig, value);
                    Ext.apply(me, value);
                } else {
                    buffer.push(value);
                }
            }
        } else {
            buffer.push(html);
        }

        // @private
        me.html = buffer.join('');
    },

    /**
     * @property {Boolean} isTemplate
     * `true` in this class to identify an object as an instantiated Template, or subclass thereof.
     */
    isTemplate: true,

    /**
     * @cfg {Boolean} compiled
     * True to immediately compile the template. Defaults to false.
     */

    /**
     * @cfg {Boolean} disableFormats
     * True to disable format functions in the template. If the template doesn't contain
     * format functions, setting disableFormats to true will reduce apply time. Defaults to false.
     */
    disableFormats: false,

    /**
     * @property {RegExp} re
     * Regular expression used to extract tokens.
     *
     * Finds the following expressions within a format string
     *
     *                     {AND?}
     *                     /   \
     *                   /       \
     *                 /           \
     *               /               \
     *            OR                  AND?
     *           /  \                 / \
     *          /    \               /   \
     *         /      \             /     \
     *    (\d+)  ([a-z_][\w\-]*)   /       \
     *     index       name       /         \
     *                           /           \
     *                          /             \
     *                   \:([a-z_\.]*)   (?:\((.*?)?\))?
     *                      formatFn           args
     *
     * Numeric index or (name followed by optional formatting function and args)
     * @private
     */
    tokenRe: /\{(?:(?:(\d+)|([a-z_][\w\-]*))(?::([a-z_\.]+)(?:\(([^\)]*?)?\))?)?)\}/gi,

    /**
     * Returns an HTML fragment of this template with the specified values applied.
     *
     * @param {Object/Array} values The template values. Can be an array if your params are numeric:
     *
     *     var tpl = new Ext.Template('Name: {0}, Age: {1}');
     *     tpl.apply(['John', 25]);
     *
     * or an object:
     *
     *     var tpl = new Ext.Template('Name: {name}, Age: {age}');
     *     tpl.apply({name: 'John', age: 25});
     *
     * @return {String} The HTML fragment
     */
    apply: function(values) {
        var me = this;

        if (me.compiled) {
            if (!me.fn) {
                me.compile();
            }
            return me.fn(values).join('');
        }

        return me.evaluate(values);
    },

    // Private
    // Do not create the substitution closure on every apply call
    evaluate: function(values) {
        var me = this,
            useFormat = !me.disableFormats,
            fm = Ext.util.Format,
            tpl = me;

        function fn(match, index, name, formatFn, args) {
            // Calculate the correct name extracted from the {}
            // Certain browser pass unmatched parameters as undefined, some as an empty string.
            if (name == null || name == '') {
                name = index;
            }
            if (formatFn && useFormat) {
                if (args) {
                    args = [values[name]].concat(Ext.functionFactory('return ['+ args +'];')());
                } else {
                    args = [values[name]];
                }

                // Caller used '{0:this.bold}'. Create a call to tpl member function
                if (formatFn.substr(0, 5) === "this.") {
                    return tpl[formatFn.substr(5)].apply(tpl, args);
                }
                // Caller used '{0:number("0.00")}'. Create a call to Ext.util.Format function
                else if (fm[formatFn]) {
                    return fm[formatFn].apply(fm, args);
                }
                // Caller used '{0:someRandomText}'. We must return it unchanged
                else {
                    return match;
                }
            }
            else {
                return values[name] !== undefined ? values[name] : "";
            }
        }

        return me.html.replace(me.tokenRe, fn);
    },

    /**
     * Appends the result of this template to the provided output array.
     * @param {Object/Array} values The template values. See {@link #apply}.
     * @param {Array} out The array to which output is pushed.
     * @return {Array} The given out array.
     */
    applyOut: function(values, out) {
        var me = this;

        if (me.compiled) {
            if (!me.fn) {
                me.compile();
            }
            out.push.apply(out, me.fn(values));
        } else {
            out.push(me.apply(values));
        }

        return out;
    },

    /**
     * @method applyTemplate
     * @member Ext.Template
     * Alias for {@link #apply}.
     * @inheritdoc Ext.Template#apply
     */
    applyTemplate: function () {
        return this.apply.apply(this, arguments);
    },

    /**
     * Sets the HTML used as the template and optionally compiles it.
     * @param {String} html
     * @param {Boolean} compile (optional) True to compile the template.
     * @return {Ext.Template} this
     */
    set: function(html, compile) {
        var me = this;
        me.html = html;
        me.compiled = !!compile;
        me.fn = null;
        return me;
    },

    compileARe: /\\/g,
    compileBRe: /(\r\n|\n)/g,
    compileCRe: /'/g,

    /**
     * Compiles the template into an internal function, eliminating the RegEx overhead.
     * @return {Ext.Template} this
     */
    compile: function() {
        var me = this,
            code;

        code = me.html.replace(me.compileARe, '\\\\').replace(me.compileBRe, '\\n').
                       replace(me.compileCRe, "\\'").replace(me.tokenRe, me.regexReplaceFn.bind(me));
        code = (this.disableFormats !== true ? 'var fm=Ext.util.Format;' : '') +
                (me.useEval ? '$=' : 'return') +
                " function(v){return ['" + code + "'];};";

        me.fn  = me.useEval ? me.evalCompiled(code) : (new Function('Ext', code))(Ext);
        me.compiled = true;
        return me;
    },

    // @private
    evalCompiled: function($) {

        // We have to use eval to realize the code block and capture the inner func we also
        // don't want a deep scope chain. We only do this in Firefox and it is also unhappy
        // with eval containing a return statement, so instead we assign to "$" and return
        // that. Because we use "eval", we are automatically sandboxed properly.
        eval($);
        return $;
    },

    regexReplaceFn: function (match, index, name, formatFn, args) {
        // Calculate the correct expression to use to index into the values object/array
        // index may be a numeric string, or a quoted alphanumeric string.
        // Certain browser pass unmatched parameters as undefined, some as an empty string.
        if (index == null || index == '') {
            index = '"' + name + '"';
        }
        // If we are being used as a formatter for Ext.String.format, we must skip the string itself in the argument list.
        // Doing this enables String.format to omit the Array slice call.
        else if (this.stringFormat) {
            index = parseInt(index) + 1;
        }
        if (formatFn && this.disableFormats !== true) {
            args = args ? ',' + args: "";

            // Caller used '{0:this.bold}'. Create a call to member function
            if (formatFn.substr(0, 5) === "this.") {
                formatFn = formatFn + '(';
            }
            // Caller used '{0:number("0.00")}'. Create a call to Ext.util.Format function
            else if (Ext.util.Format[formatFn]) {
                formatFn = "fm." + formatFn + '(';
            }
            // Caller used '{0:someRandomText}'. We must pass it through unchanged
            else {
                return match;
            }
            return "'," + formatFn + "v[" + index + "]" + args + "),'";
        }
        else {
            return "',v[" + index + "] == undefined ? '' : v[" + index + "],'";
        }
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) as the first child of el.
     *
     * @param {String/HTMLElement/Ext.dom.Element} el The context element
     * @param {Object/Array} values The template values. See {@link #applyTemplate} for details.
     * @param {Boolean} returnElement (optional) true to return a Ext.Element.
     * @return {HTMLElement/Ext.dom.Element} The new node or Element
     */
    insertFirst: function(el, values, returnElement) {
        return this.doInsert('afterBegin', el, values, returnElement);
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) before el.
     *
     * @param {String/HTMLElement/Ext.dom.Element} el The context element
     * @param {Object/Array} values The template values. See {@link #applyTemplate} for details.
     * @param {Boolean} returnElement (optional) true to return a Ext.Element.
     * @return {HTMLElement/Ext.dom.Element} The new node or Element
     */
    insertBefore: function(el, values, returnElement) {
        return this.doInsert('beforeBegin', el, values, returnElement);
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) after el.
     *
     * @param {String/HTMLElement/Ext.dom.Element} el The context element
     * @param {Object/Array} values The template values. See {@link #applyTemplate} for details.
     * @param {Boolean} returnElement (optional) true to return a Ext.Element.
     * @return {HTMLElement/Ext.dom.Element} The new node or Element
     */
    insertAfter: function(el, values, returnElement) {
        return this.doInsert('afterEnd', el, values, returnElement);
    },

    /**
     * Applies the supplied `values` to the template and appends the new node(s) to the specified `el`.
     *
     * For example usage see {@link Ext.Template Ext.Template class docs}.
     *
     * @param {String/HTMLElement/Ext.dom.Element} el The context element
     * @param {Object/Array} values The template values. See {@link #applyTemplate} for details.
     * @param {Boolean} returnElement (optional) true to return an Ext.Element.
     * @return {HTMLElement/Ext.dom.Element} The new node or Element
     */
    append: function(el, values, returnElement) {
        return this.doInsert('beforeEnd', el, values, returnElement);
    },

    doInsert: function(where, el, values, returnElement) {
        var newNode = Ext.DomHelper.insertHtml(where, Ext.getDom(el), this.apply(values));
        return returnElement ? Ext.get(newNode) : newNode;
    },

    /**
     * Applies the supplied values to the template and overwrites the content of el with the new node(s).
     *
     * @param {String/HTMLElement/Ext.dom.Element} el The context element
     * @param {Object/Array} values The template values. See {@link #applyTemplate} for details.
     * @param {Boolean} returnElement (optional) true to return a Ext.Element.
     * @return {HTMLElement/Ext.dom.Element} The new node or Element
     */
    overwrite: function(el, values, returnElement) {
        var newNode = Ext.DomHelper.overwrite(Ext.getDom(el), this.apply(values));
        return returnElement ? Ext.get(newNode) : newNode;
    }
});
