/**
 * This class holds the parsed text for a bind template. The syntax is that of a normal
 * `Ext.Template` except that substitution tokens can contain dots to reference property
 * names.
 *
 * The template is parsed and stored in a representation like this:
 *
 *      me.text = 'Hey {foo.bar}! Test {bar} and {foo.bar} with {abc} over {bar:number}'
 *
 *      me.tokens = [ 'foo.bar', 'bar', 'abc' ]
 *
 *      me.buffer = [           me.slots = [
 *          'Hey ',                 undefined,
 *          undefined,              { token: 'foo.bar', pos: 0 },
 *          '! Test ',              undefined,
 *          undefined,              { token: 'bar', pos: 1 },
 *          ' and ',                undefined,
 *          undefined,              { token: 'foo.bar', pos: 0 },
 *          ' with ',               undefined,
 *          undefined,              { token: 'abc', pos: 2 },
 *          ' over ',               undefined,
 *          undefined               { token: 'bar', fmt: 'number', pos: 1 }
 *      ]                       ]
 *
 * @private
 * @since 5.0.0
 */
Ext.define('Ext.app.bind.Template', {
    requires: [
        'Ext.util.Format'
    ],

    numberRe: /^(?:\d+(?:\.\d*)?)$/,

    stringRe: /^(?:["][^"]*["])$/,

    /**
     * @property {RegExp} re
     * Regular expression used to extract tokens.
     *
     * Finds the following expressions within a format string
     *
     *                     {AND?}
     *                     /    \
     *                   /        \
     *                 /            \
     *               /                \
     *            OR                   AND?
     *           /  \                  / \
     *          /    \                /   \
     *         /      \              /     \
     *    (\d+)  ([a-z_][\w\-\.]*)  /       \
     *     index       name       /         \
     *                           /           \
     *                          /             \
     *                   :([a-z_\.]*)    (?:\(([^\)]*?)?\))?
     *                      formatFn           args
     *
     * Numeric index or (name followed by optional formatting function and args)
     * @private
     */
    tokenRe: /\{[!]?(?:(?:(\d+)|([a-z_][\w\-\.]*))(?::([a-z_\.]+)(?:\(([^\)]*?)?\))?)?)\}/gi,

    formatRe: /^([a-z_]+)(?:\(([^\)]*?)?\))?$/i,

    /**
     * @property {String[]} buffer
     * Initially this is just the array of string fragments with `null` between each
     * to hold the place of a substitution token. On first use these slots are filled
     * with the token's value and this array is joined to form the output.
     * @private
     */
    buffer: null,

    /**
     * @property {Object[]} slots
     * The elements of this array line up with those of `buffer`. This array holds
     * the parsed information for the substitution token that fills a given slot in
     * the generated string. Indices that correspond to literal text are `null`.
     *
     * Consider the following substitution token:
     *
     *      {foo:this.fmt(2,4)}
     *
     * The object in this array has the following properties to describe this token:
     *
     *   * `fmt` The name of the formatting function ("fmt") or `null` if none.
     *   * `index` The numeric index if this is not a named substitution or `null`.
     *   * `not` True if the token has a logical not ("!") at the front.
     *   * `token` The name of the token ("foo") if not an `index`.
     *   * `pos` The position of this token in the `tokens` array.
     *   * `scope` A reference to the object on which the `fmt` method exists. This
     *    will be `Ext.util.Format` if no "this." is present or `null` if it is (or
     *    if there is no `fmt`). In the above example, this is `null` to indicate the
     *    scope is unknown.
     *   * `args` An array of arguments to `fmt` if the arguments are simple enough
     *    to parse directly. Otherwise this is `null` and `fn` is used.
     *   * `fn` A generated function to use to evaluate the arguments to the `fmt`. In
     *    rare cases these arguments can reference global variables so the expression
     *    must be evaluated on each call.
     *   * `format` The method to call to perform the format. This method accepts the
     *    scope (in case `scope` is unknown) and the value. This function is `null` if
     *    there is no `fmt`.
     *
     * @private
     */
    slots: null,

    /**
     * @property {String[]} tokens
     * The distinct set of tokens used in the template excluding formatting. This is
     * used to ensure that only one bind is performed per unique token. This array is
     * passed to {@link Ext.app.ViewModel#bind} to perform a "multi-bind". The result
     * is an array of values corresponding these tokens. Each entry in `slots` then
     * knows its `pos` in this array from which to pick up its value, apply formats
     * and place in `buffer`.
     * @private
     */
    tokens: null,

    /**
     * @param {String} text The text of the template.
     */
    constructor: function (text) {
        var me = this,
            initters = me._initters,
            name;

        me.text = text;

        for (name in initters) {
            me[name] = initters[name];
        }
    },

    /**
     * @property {Object} _initters
     * Each of the methods contained on this object are placed in new instances to lazily
     * parse the template text.
     * @private
     * @since 5.0.0
     */
    _initters: {
        apply: function (values, scope) {
            return this.parse().apply(values, scope);
        },
        getTokens: function () {
            return this.parse().getTokens();
        }
    },

    /**
     * Applies this template to the given `values`. The `values` must correspond to the
     * `tokens` returned by `getTokens`.
     *
     * @param {Array} values The values of the `tokens`.
     * @param {Object} scope The object instance to use for "this." formatter calls in the
     * template.
     * @return {String}
     * @since 5.0.0
     */
    apply: function (values, scope) {
        var me = this,
            slots = me.slots,
            buffer = me.buffer,
            length = slots.length,  // === buffer.length
            i, slot, value;

        for (i = 0; i < length; ++i) {
            slot = slots[i];
            if (slot) {
                if ((value = values[slot.pos]) == null) {
                    // map (value === null || value === undefined) to '':
                    value = '';
                }
                if (slot.not) {
                    value = !value;
                }
                if (slot.format) {
                    value = slot.format(value, scope);
                }
                buffer[i] = value;
            }
        }

        return buffer.join('');
    },

    /**
     * Returns the distinct set of binding tokens for this template.
     * @return {String[]} The `tokens` for this template.
     */
    getTokens: function () {
        return this.tokens;
    },

    /**
     * Parses the template text into `buffer`, `slots` and `tokens`. This method is called
     * automatically when the template is first used.
     * @return {Ext.app.bind.Template} this
     * @private
     */
    parse: function () {
        // NOTE: The particulars of what is stored here, while private, are likely to be
        // important to Sencha Architect so changes need to be coordinated.
        var me = this,
            text = me.text,
            buffer = [],
            slots = [],
            tokens = [],
            tokenMap = {},
            last = 0,
            tokenRe = me.tokenRe,
            pos = 0,
            fmt, i, length, match, s, slot, token;

        // Remove the initters so that we don't get called here again.
        for (i in me._initters) {
            delete me[i];
        }

        me.buffer = buffer;

        me.slots = slots;

        me.tokens = tokens;

        // text = 'Hello {foo:this.fmt(2,4)} World {bar} - {1}'
        while ((match = tokenRe.exec(text))) {
            //   0                      1          2         3           4         index
            // [ '{foo:this.fmt(2,4)}', undefined, 'foo',    'this.fmt', '2,4']        6
            // [ '{bar}',               undefined, 'bar',     undefined,  undefined]  32
            // [ '{1}',                 '1',       undefined, undefined,  undefined]  40
            length = match.index - last;
            if (length) {
                buffer[pos++] = text.substring(last, last + length);
                last += length;
            }
            last += (s = match[0]).length;

            slot = {
                fmt: (fmt = match[3] || null),
                index: match[1] ? parseInt(match[1], 10) : null,
                not: s.charAt(1) === '!',
                token: match[2] || null
            };

            token = slot.token || String(slot.index);
            if (token in tokenMap) {
                slot.pos = tokenMap[token];
            } else {
                tokenMap[token] = slot.pos = tokens.length;
                tokens.push(token);
            }

            if (fmt) {
                if (fmt.substring(0,5) === 'this.') {
                    slot.fmt = fmt.substring(5);
                } else {
                    //<debug>
                    if (!(fmt in Ext.util.Format)) {
                        Ext.Error.raise('Invalid format specified: "' + fmt + '"');
                    }
                    //</debug>
                    slot.scope = Ext.util.Format;
                }

                me.parseArgs(match[4], slot);
            }

            slots[pos++] = slot;
        }

        if (last < text.length) {
            buffer[pos++] = text.substring(last);
        }

        return me;
    },

    parseArgs: function (argsString, slot) {
        var me = this,
            numberRe = me.numberRe,
            stringRe = me.stringRe,
            arg, args, i, length;

        if (!argsString) {
            args = [];
        } else if (argsString.indexOf(',') < 0) {
            args = [argsString];
        } else {
            args = argsString.split(',');
        }

        slot = slot || {};
        length = args.length;
        slot.args = args;

        for (i = 0; i < length; ++i) {
            arg = args[i];
            if (arg === 'true') {
                args[i] = true;
            } else if (arg === 'false') {
                args[i] = false;
            } else if (arg === 'null') {
                args[i] = null;
            } else if (numberRe.test(arg)) {
                args[i] = parseFloat(arg);
            } else if (stringRe.test(arg)) {
                args[i] = arg.substring(1, arg.length - 1);
            } else {
                slot.fn = Ext.functionFactory('return ['+  argsString +'];');
                slot.format = me._formatEval;
                break;
            }
        }

        if (!slot.format) {
            // make room for the value at index 0
            args.unshift(0);
            slot.format = me._formatArgs;
        }

        return slot;
    },

    /**
     * This method parses token formats and returns an object with a `format` method that
     * can format values accordingly.
     * @param {String} fmt The format suffix of a template token. For example, in the
     * token "{foo:round(2)}" the format is "round(2)".
     * @return {Object} An object with a `format` method to format values.
     * @private
     * @since 5.0.0
     */
    parseFormat: function (fmt) {
        var me = this,
            match = me.formatRe.exec(fmt),
            slot = {
                fmt: fmt,
                scope: Ext.util.Format
            },
            args;

        //<debug>
        if (!match) {
            Ext.Error.raise('Invalid format syntax: "' + slot + '"');
        }
        //</debug>

        args = match[2];
        if (args) {
            slot.fmt = match[1];
            me.parseArgs(args, slot);
        } else {
            slot.args = [0]; // for the value
            slot.format = me._formatArgs;
        }

        return slot;
    },

    /**
     * This method is placed on an entry in `slots` as the `format` method when that entry
     * has `args` that could be parsed from the template.
     * @param {Object} value The value of the token.
     * @param {Object} [scope] The object instance to use for "this." formatter calls in the
     * template.
     * @return {String} The formatted result to place in `buffer`.
     * @private
     * @since 5.0.0
     */
    _formatArgs: function (value, scope) {
        // NOTE: our "this" pointer is the object in the "slots" array!
        scope = this.scope || scope;
        this.args[0] = value; // index 0 is reserved for the value
        return scope[this.fmt].apply(scope, this.args);
    },

    /**
     * This method is placed on an entry in `slots` as the `format` method when that entry
     * does not have a parsed `args` array.
     * @param {Object} value The value of the token.
     * @param {Object} [scope] The object instance to use for "this." formatter calls in the
     * template.
     * @return {String} The formatted result to place in `buffer`.
     * @private
     * @since 5.0.0
     */
    _formatEval: function (value, scope) {
        // NOTE: our "this" pointer is the object in the "slots" array!
        var args = this.fn(); // invoke to get the args array
        args.unshift(value); // inject the value at the front
        scope = this.scope || scope;
        return scope[this.fmt].apply(scope, args);
    }
});
