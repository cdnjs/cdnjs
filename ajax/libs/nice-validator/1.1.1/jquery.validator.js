/*! nice-validator 1.1.1
 * (c) 2012-2017 Jony Zhang <niceue@live.com>, MIT Licensed
 * https://github.com/niceue/nice-validator
 */
;(function(factory) {
    typeof module === "object" && module.exports ? module.exports = factory( require( "jquery" ) ) :
    typeof define === 'function' && define.amd ? define(['jquery'], factory) :
    factory(jQuery);
}(function($, undefined) {
    "use strict";

    var NS = 'validator',
        CLS_NS = '.' + NS,
        CLS_NS_RULE = '.rule',
        CLS_NS_FIELD = '.field',
        CLS_NS_FORM = '.form',
        CLS_WRAPPER = 'nice-' + NS,
        CLS_MSG_BOX = 'msg-box',
        ARIA_INVALID = 'aria-invalid',
        DATA_RULE = 'data-rule',
        DATA_MSG = 'data-msg',
        DATA_TIP = 'data-tip',
        DATA_OK = 'data-ok',
        DATA_TIMELY = 'data-timely',
        DATA_TARGET = 'data-target',
        DATA_DISPLAY = 'data-display',
        DATA_MUST = 'data-must',
        NOVALIDATE = 'novalidate',
        INPUT_SELECTOR = ':verifiable',

        rRules = /(&)?(!)?\b(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?\s*(;|\|)?/g,
        rRule = /(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?/,
        rDisplay = /(?:([^:;\(\[]*):)?(.*)/,
        rDoubleBytes = /[^\x00-\xff]/g,
        rPos = /top|right|bottom|left/,
        rAjaxType = /(?:(cors|jsonp):)?(?:(post|get):)?(.+)/i,
        rUnsafe = /[<>'"`\\]|&#x?\d+[A-F]?;?|%3[A-F]/gmi,

        noop = $.noop,
        proxy = $.proxy,
        trim = $.trim,
        isFunction = $.isFunction,
        isString = function(s) {
            return typeof s === 'string';
        },
        isObject = function(o) {
            return o && Object.prototype.toString.call(o) === '[object Object]';
        },
        isIE = document.documentMode || +(navigator.userAgent.match(/MSIE (\d+)/) && RegExp.$1),
        attr = function(el, key, value) {
            if (!el || !el.tagName) return null;
            if (value !== undefined) {
                if (value === null) el.removeAttribute(key);
                else el.setAttribute(key, '' + value);
            } else {
                return el.getAttribute(key);
            }
        },
        novalidateonce,
        preinitialized = {},

        defaults = {
            debug: 0,
            theme: 'default',
            ignore: '',
            focusInvalid: true,
            focusCleanup: false,
            stopOnError: false,
            beforeSubmit: null,
            valid: null,
            invalid: null,
            validation: null,
            formClass: 'n-default',
            validClass: 'n-valid',
            invalidClass: 'n-invalid',
            bindClassTo: null
        },
        fieldDefaults = {
            timely: 1,
            display: null,
            target: null,
            ignoreBlank: false,
            showOk: true,
            // Translate ajax response to validation result
            dataFilter: function (data) {
                if ( isString(data) || ( isObject(data) && ('error' in data || 'ok' in data) ) ) {
                    return data;
                }
            },
            msgMaker: function(opt) {
                var html;
                html = '<span role="alert" class="msg-wrap n-'+ opt.type + '">' + opt.arrow;
                if (opt.result) {
                    $.each(opt.result, function(i, obj){
                        html += '<span class="n-'+ obj.type +'">' + opt.icon + '<span class="n-msg">' + obj.msg + '</span></span>';
                    });
                } else {
                    html += opt.icon + '<span class="n-msg">' + opt.msg + '</span>';
                }
                html += '</span>';
                return html;
            },
            msgWrapper: 'span',
            msgArrow: '',
            msgIcon: '<span class="n-icon"></span>',
            msgClass: 'n-right',
            msgStyle: '',
            msgShow: null,
            msgHide: null
        },
        themes = {};

    /** jQuery Plugin
     * @param {Object} options
        debug         {Boolean}     0               Whether to enable debug mode
        timely        {Number}      1               Whether to enable timely validation
        theme         {String}     'default'        Theme name
        stopOnError   {Boolean}     false           Whether to stop validate when found an error input
        focusCleanup  {Boolean}     false           Whether to clean up the field message when focus the field
        focusInvalid  {Boolean}     true            Whether to focus the field that is invalid
        ignoreBlank   {Boolean}     false           When the field has no value, whether to ignore validation
        ignore        {jqSelector}    ''            Ignored fields (Using jQuery selector)

        beforeSubmit  {Function}                    Do something before submit form
        dataFilter    {Function}                    Convert ajax results
        valid         {Function}                    Triggered when the form is valid
        invalid       {Function}                    Triggered when the form is invalid
        validClass    {String}      'n-valid'       Add this class name to a valid field
        invalidClass  {String}      'n-invalid'     Add this class name to a invalid field
        bindClassTo   {jqSelector}  ':verifiable'   Which element should the className binding to

        display       {Function}                    Callback function to get dynamic display
        target        {Function}                    Callback function to get dynamic target
        msgShow       {Function}                    Trigger this callback when show message
        msgHide       {Function}                    Trigger this callback when hide message
        msgWrapper    {String}      'span'          Message wrapper tag name
        msgMaker      {Function}                    Callback function to make message HTML
        msgArrow      {String}                      Message arrow template
        msgIcon       {String}                      Message icon template
        msgStyle      {String}                      Custom message css style
        msgClass      {String}                      Additional added to the message class names
        formClass     {String}                      Additional added to the form class names

        messages      {Object}                      Custom messages for the current instance
        rules         {Object}                      Custom rules for the current instance
        fields        {Object}                      Field validation configuration
        {String}        key    name|#id
        {String|Object} value                       Rule string or an object which can pass more arguments

        fields[key][rule]       {String}            Rule string
        fields[key][display]    {String|Function}
        fields[key][tip]        {String}            Custom tip message
        fields[key][ok]         {String}            Custom success message
        fields[key][msg]        {Object}            Custom error message
        fields[key][msgStyle]   {String}            Custom message style
        fields[key][msgClass]   {String}            A className which added to message placeholder element
        fields[key][msgWrapper] {String}            Tag name of the message placeholder element
        fields[key][msgMaker]   {Function}          A function to custom message HTML
        fields[key][dataFilter] {Function}          A function to convert ajax results
        fields[key][valid]      {Function}          A function triggered when field is valid
        fields[key][invalid]    {Function}          A function triggered when field is invalid
        fields[key][must]       {Boolean}           If set true, we always check the field even has remote checking
        fields[key][timely]     {Boolean}           Whether to enable timely validation
        fields[key][target]     {jqSelector}        Define placement of a message
     */
    $.fn.validator = function(options) {
        var that = this,
            args = arguments;

        if (that.is(INPUT_SELECTOR)) return that;
        if (!that.is('form')) that = this.find('form');
        if (!that.length) that = this;

        that.each(function() {
            var instance = $(this).data(NS);

            if (instance) {
                if ( isString(options) ) {
                    if ( options.charAt(0) === '_' ) return;
                    instance[options].apply(instance, [].slice.call(args, 1));
                }
                else if (options) {
                    instance._reset(true);
                    instance._init(this, options);
                }
            } else {
                new Validator(this, options);
            }
        });

        return this;
    };


    // Validate a field, or an area
    $.fn.isValid = function(callback, hideMsg) {
        var me = _getInstance(this[0]),
            hasCallback = isFunction(callback),
            ret, opt;

        if (!me) return true;
        if (!hasCallback && hideMsg === undefined) hideMsg = callback;
        me.checkOnly = !!hideMsg;
        opt = me.options;

        ret = me._multiValidate(
            this.is(INPUT_SELECTOR) ? this : this.find(INPUT_SELECTOR),
            function(isValid){
                if (!isValid && opt.focusInvalid && !me.checkOnly) {
                    // navigate to the error element
                    me.$el.find('[' + ARIA_INVALID + ']:first').focus();
                }
                if (hasCallback) {
                    if (callback.length) {
                        callback(isValid);
                    } else if (isValid) {
                        callback();
                    }
                }
                me.checkOnly = false;
            }
        );

        // If you pass a callback, we maintain the jQuery object chain
        return hasCallback ? this : ret;
    };

    $.extend($.expr.pseudos || $.expr[':'], {
        // A faster selector than ":input:not(:submit,:button,:reset,:image,:disabled,[contenteditable])"
        verifiable: function(elem) {
            var name = elem.nodeName.toLowerCase();

            return ( name === 'input' && !({submit: 1, button: 1, reset: 1, image: 1})[elem.type] ||
                     name === 'select' ||
                     name === 'textarea' ||
                     elem.contentEditable === 'true'
                    ) && !elem.disabled;
        },
        // any value, but not only whitespace
        filled: function(elem) {
            return !!trim($(elem).val());
        }
    });

    /**
     * Creates a new Validator
     *
     * @class
     * @param {Element} element - form element
     * @param {Object}  options - options for validator
     */
    function Validator(element, options) {
        var me = this;

        if ( !(me instanceof Validator) ) {
            return new Validator(element, options);
        }

        if (Validator.pending) {
            $(window).on('validatorready', init);
        } else {
            init();
        }

        function init() {
            me.$el = $(element);
            if (me.$el.length) {
                me._init(me.$el[0], options);
            }
            else if (isString(element)) {
                preinitialized[element] = options;
            }
        }
    }

    Validator.prototype = {
        _init: function(element, options) {
            var me = this,
                opt, themeOpt, dataOpt;

            // Initialization options
            if ( isFunction(options) ) {
                options = {
                    valid: options
                };
            }
            options = me._opt = options || {};
            dataOpt = attr(element, 'data-'+ NS +'-option');
            dataOpt = me._dataOpt = dataOpt && dataOpt.charAt(0) === '{' ? (new Function("return " + dataOpt))() : {};
            themeOpt = me._themeOpt = themes[ options.theme || dataOpt.theme || defaults.theme ];
            opt = me.options = $.extend({}, defaults, fieldDefaults, themeOpt, me.options, options, dataOpt);

            me.rules = new Rules(opt.rules, true);
            me.messages = new Messages(opt.messages, true);
            me.Field = _createFieldFactory(me);
            me.elements = me.elements || {};
            me.deferred = {};
            me.errors = {};
            me.fields = {};
            // Initialization fields
            me._initFields(opt.fields);

            // Initialization events and make a cache
            if ( !me.$el.data(NS) ) {
                me.$el.data(NS, me).addClass(CLS_WRAPPER +' '+ opt.formClass)
                    .on('form-submit-validate', function(e, a, $form, opts, veto) {
                        me.vetoed = veto.veto = !me.isValid;
                        me.ajaxFormOptions = opts;
                    })
                    .on('submit'+ CLS_NS +' validate'+ CLS_NS, proxy(me, '_submit'))
                    .on('reset'+ CLS_NS, proxy(me, '_reset'))
                    .on('showmsg'+ CLS_NS, proxy(me, '_showmsg'))
                    .on('hidemsg'+ CLS_NS, proxy(me, '_hidemsg'))
                    .on('focusin'+ CLS_NS + ' click'+ CLS_NS, INPUT_SELECTOR, proxy(me, '_focusin'))
                    .on('focusout'+ CLS_NS +' validate'+ CLS_NS, INPUT_SELECTOR, proxy(me, '_focusout'))
                    .on('keyup'+ CLS_NS +' input'+ CLS_NS + ' compositionstart compositionend', INPUT_SELECTOR, proxy(me, '_focusout'))
                    .on('click'+ CLS_NS, ':radio,:checkbox', 'click', proxy(me, '_focusout'))
                    .on('change'+ CLS_NS, 'select,input[type="file"]', 'change', proxy(me, '_focusout'));

                // cache the novalidate attribute value
                me._NOVALIDATE = attr(element, NOVALIDATE);
                // Initialization is complete, stop off default HTML5 form validation
                // If use "jQuery.attr('novalidate')" in IE7 will complain: "SCRIPT3: Member not found."
                attr(element, NOVALIDATE, NOVALIDATE);
            }

            // Display all messages in target container
            if ( isString(opt.target) ) {
                me.$el.find(opt.target).addClass('msg-container');
            }
        },

        // Guess whether the form use ajax submit
        _guessAjax: function(form) {
            var me = this;

            if ( !(me.isAjaxSubmit = !!me.options.valid) ) {
                // if there is a "valid.form" event
                var events = ($._data || $.data)(form, "events");
                me.isAjaxSubmit = issetEvent(events, 'valid', 'form') || issetEvent(events, 'submit', 'form-plugin');
            }

            function issetEvent(events, name, namespace) {
                if ( events && events[name] &&
                     $.map(events[name], function(e){
                        return ~e.namespace.indexOf(namespace) ? 1 : null;
                     }).length
                ) {
                    return true;
                }
                return false;
            }
        },

        _initFields: function(fields) {
            var me = this, k, arr, i,
                clear = fields === null;

            // Processing field information
            if (clear) fields = me.fields;

            if ( isObject(fields) ) {
                for (k in fields) {
                    if (~k.indexOf(',')) {
                        arr = k.split(',');
                        i = arr.length;
                        while (i--) {
                            initField(trim(arr[i]), fields[k]);
                        }
                    } else {
                        initField(k, fields[k]);
                    }
                }
            }

            // Parsing DOM rules
            me.$el.find(INPUT_SELECTOR).each(function() {
                me._parse(this);
            });

            function initField(k, v) {
                // delete a field from settings
                if ( v === null || clear ) {
                    var el = me.elements[k];
                    if (el) me._resetElement(el, true);
                    delete me.fields[k];
                } else {
                    me.fields[k] = new me.Field(k, isString(v) ? {rule: v} : v, me.fields[k]);
                }
            }
        },

        // Parsing a field
        _parse: function(el) {
            var me = this,
                field,
                key = el.name,
                display,
                timely,
                dataRule = attr(el, DATA_RULE);

            dataRule && attr(el, DATA_RULE, null);

            // If the field has passed the key as id mode, or it doesn't has a name
            if ( el.id && (
                ('#' + el.id in me.fields) ||
                !key ||
                // If dataRule and element are diffrent from old's, we use ID mode.
                (dataRule !== null && (field = me.fields[key]) && dataRule !== field.rule && el.id !== field.key)
                )
            ) {
                key = '#' + el.id;
            }
            // Generate id
            if (!key) {
                key = '#' + (el.id = 'N' + String(Math.random()).slice(-12));
            }

            field = me.getField(key, true);
            // The priority of passing parameter by DOM is higher than by JS.
            field.rule = dataRule || field.rule;

            if (display = attr(el, DATA_DISPLAY)) {
                field.display = display;
            }
            if (field.rule) {
                if ( attr(el, DATA_MUST) !== null || /\b(?:match|checked)\b/.test(field.rule) ) {
                    field.must = true;
                }
                if ( /\brequired\b/.test(field.rule) ) {
                    field.required = true;
                }
                if (timely = attr(el, DATA_TIMELY)) {
                    field.timely = +timely;
                } else if (field.timely > 3) {
                    attr(el, DATA_TIMELY, field.timely);
                }
                me._parseRule(field);
                field.old = {};
            }
            if ( isString(field.target) ) {
                attr(el, DATA_TARGET, field.target);
            }
            if ( isString(field.tip) ) {
                attr(el, DATA_TIP, field.tip);
            }

            return me.fields[key] = field;
        },

        // Parsing field rules
        _parseRule: function(field) {
            var arr = rDisplay.exec(field.rule);

            if (!arr) return;
            // current rule index
            field._i = 0;
            if (arr[1]) {
                field.display = arr[1];
            }
            if (arr[2]) {
                field._rules = [];
                arr[2].replace(rRules, function(){
                    var args = arguments;
                    args[4] = args[4] || args[5];
                    field._rules.push({
                        and: args[1] === "&",
                        not: args[2] === "!",
                        or: args[6] === "|",
                        method: args[3],
                        params: args[4] ? $.map( args[4].split(', '), trim ) : undefined
                    });
                });
            }
        },

        // Verify a zone
        _multiValidate: function($inputs, doneCallback){
            var me = this,
                opt = me.options;

            me.hasError = false;

            if (opt.ignore) {
                $inputs = $inputs.not(opt.ignore);
            }

            $inputs.each(function() {
                me._validate(this);
                if (me.hasError && opt.stopOnError) {
                    // stop the validation
                    return false;
                }
            });

            // Need to wait for all fields validation complete, especially asynchronous validation
            if (doneCallback) {
                me.validating = true;
                $.when.apply(
                    null,
                    $.map(me.deferred, function(v){return v;})
                ).done(function(){
                    doneCallback.call(me, !me.hasError);
                    me.validating = false;
                });
            }

            // If the form does not contain asynchronous validation, the return value is correct.
            // Otherwise, you should detect form validation result through "doneCallback".
            return !$.isEmptyObject(me.deferred) ? undefined : !me.hasError;
        },

        // Validate the whole form
        _submit: function(e) {
            var me = this,
                opt = me.options,
                form = e.target,
                canSubmit = e.type === 'submit' && !e.isDefaultPrevented();

            e.preventDefault();

            if (
                novalidateonce && ~(novalidateonce = false) ||
                // Prevent duplicate submission
                me.submiting ||
                // Receive the "validate" event only from the form.
                e.type === 'validate' && me.$el[0] !== form ||
                // trigger the beforeSubmit callback.
                isFunction(opt.beforeSubmit) && opt.beforeSubmit.call(me, form) === false
            ) {
                return;
            }

            if (me.isAjaxSubmit === undefined) {
                me._guessAjax(form);
            }

            me._debug('log', '\n<<< event: ' + e.type);

            me._reset();
            me.submiting = true;

            me._multiValidate(
                me.$el.find(INPUT_SELECTOR),
                function(isValid){
                    var ret = (isValid || opt.debug === 2) ? 'valid' : 'invalid',
                        errors;

                    if (!isValid) {
                        if (opt.focusInvalid) {
                            // navigate to the error element
                            me.$el.find('[' + ARIA_INVALID + ']:first').focus();
                        }
                        errors = $.map(me.errors, function(err){return err;});
                    }

                    // releasing submit
                    me.submiting = false;
                    me.isValid = isValid;

                    // trigger callback and event
                    isFunction(opt[ret]) && opt[ret].call(me, form, errors);
                    me.$el.trigger(ret + CLS_NS_FORM, [form, errors]);

                    me._debug('log', '>>> ' + ret);

                    if (!isValid) return;
                    // For jquery.form plugin
                    if (me.vetoed) {
                        $(form).ajaxSubmit(me.ajaxFormOptions);
                    }
                    else if (canSubmit && !me.isAjaxSubmit) {
                        document.createElement('form').submit.call(form);
                    }
                }
            );
        },

        _reset: function(e) {
            var me = this;

            me.errors = {};
            if (e) {
                me.reseting = true;
                me.$el.find(INPUT_SELECTOR).each( function(){
                    me._resetElement(this);
                });
                delete me.reseting;
            }
        },

        _resetElement: function(el, all) {
            this._setClass(el, null);
            this.hideMsg(el);
        },

        // Handle events: "focusin/click"
        _focusin: function(e) {
            var me = this,
                opt = me.options,
                el = e.target,
                timely,
                msg;

            if ( me.validating || ( e.type==='click' && document.activeElement === el ) ) {
                return;
            }

            if (opt.focusCleanup) {
                if ( attr(el, ARIA_INVALID) === 'true' ) {
                    me._setClass(el, null);
                    me.hideMsg(el);
                }
            }

            msg = attr(el, DATA_TIP);

            if (msg) {
                me.showMsg(el, {
                    type: 'tip',
                    msg: msg
                });
            } else {
                if (attr(el, DATA_RULE)) {
                    me._parse(el);
                }
                if (timely = attr(el, DATA_TIMELY)) {
                    if ( timely === 8 || timely === 9 ) {
                        me._focusout(e);
                    }
                }
            }
        },

        // Handle events: "focusout/validate/keyup/click/change/input/compositionstart/compositionend"
        _focusout: function(e) {
            var me = this,
                opt = me.options,
                el = e.target,
                etype = e.type,
                etype0,
                focusin = etype === 'focusin',
                special = etype === 'validate',
                elem,
                field,
                old,
                value,
                timestamp,
                key, specialKey,
                timely,
                timer = 0;

            if (etype === 'compositionstart') {
                me.pauseValidate = true;
            }
            if (etype === 'compositionend') {
                me.pauseValidate = false;
            }
            if (me.pauseValidate) {
                return;
            }

            // For checkbox and radio
            elem = el.name && _checkable(el) ? me.$el.find('input[name="'+ el.name +'"]').get(0) : el;
            // Get field
            if (!(field = me.getField(elem)) || !field.rule) {
                return;
            }
            // Cache event type
            etype0 = field._e;
            field._e = etype;
            timely = field.timely;

            if (!special) {
                if (!timely || (_checkable(el) && etype !== 'click')) {
                    return;
                }

                value = field.getValue();

                // not validate field unless fill a value
                if ( field.ignoreBlank && !value && !focusin ) {
                    me.hideMsg(el);
                    return;
                }

                if ( etype === 'focusout' ) {
                    if (etype0 === 'change') {
                        return;
                    }
                    if ( timely === 2 || timely === 8 ) {
                        old = field.old;
                        if (value && old) {
                            if (field.isValid && !old.showOk) {
                                me.hideMsg(el);
                            } else {
                                me._makeMsg(el, field, old);
                            }
                        } else {
                            return;
                        }
                    }
                }
                else {
                    if ( timely < 2 && !e.data ) {
                        return;
                    }

                    // mark timestamp to reduce the frequency of the received event
                    timestamp = +new Date();
                    if ( timestamp - (el._ts || 0) < 100 ) {
                        return;
                    }
                    el._ts = timestamp;

                    // handle keyup
                    if ( etype === 'keyup' ) {
                        if (etype0 === 'input') {
                            return;
                        }
                        key = e.keyCode;
                        specialKey = {
                            8: 1,  // Backspace
                            9: 1,  // Tab
                            16: 1, // Shift
                            32: 1, // Space
                            46: 1  // Delete
                        };

                        // only gets focus, no validation
                        if ( key === 9 && !value ) {
                            return;
                        }

                        // do not validate, if triggered by these keys
                        if ( key < 48 && !specialKey[key] ) {
                            return;
                        }
                    }
                    if ( !focusin ) {
                        // keyboard events, reducing the frequency of validation
                        timer = timely <100 ?  (etype === 'click' || el.tagName === 'SELECT') ? 0 : 400 : timely;
                    }
                }
            }

            // if the current field is ignored
            if ( opt.ignore && $(el).is(opt.ignore) ) {
                return;
            }

            clearTimeout(field._t);

            if (timer) {
                field._t = setTimeout(function() {
                    me._validate(el, field);
                }, timer);
            } else {
                if (special) field.old = {};
                me._validate(el, field);
            }
        },

        _setClass: function(el, isValid) {
            var $el = $(el), opt = this.options;
            if (opt.bindClassTo) {
                $el = $el.closest(opt.bindClassTo);
            }
            $el.removeClass( opt.invalidClass + ' ' + opt.validClass );
            if (isValid !== null) {
                $el.addClass( isValid ? opt.validClass : opt.invalidClass );
            }
        },

        _showmsg: function(e, type, msg) {
            var me = this,
                el = e.target;

            if ( me.$el.is(el) ) {
                if (isObject(type)) {
                    me.showMsg(type)
                }
                else if ( type === 'tip' ) {
                    me.$el.find(INPUT_SELECTOR +"["+ DATA_TIP +"]", el).each(function(){
                        me.showMsg(this, {type: type, msg: msg});
                    });
                }
            }
            else {
                me.showMsg(el, {type: type, msg: msg});
            }
        },

        _hidemsg: function(e) {
            var $el = $(e.target);

            if ( $el.is(INPUT_SELECTOR) ) {
                this.hideMsg($el);
            }
        },

        // Validated a field
        _validatedField: function(el, field, ret) {
            var me = this,
                opt = me.options,
                isValid = field.isValid = ret.isValid = !!ret.isValid,
                callback = isValid ? 'valid' : 'invalid';

            ret.key = field.key;
            ret.ruleName = field._r;
            ret.id = el.id;
            ret.value = field.value;

            me.elements[field.key] = ret.element = el;
            me.isValid = me.$el[0].isValid = isValid ? me.isFormValid() : isValid;

            if (isValid) {
                ret.type = 'ok';
            } else {
                if (me.submiting) {
                    me.errors[field.key] = ret.msg;
                }
                me.hasError = true;
            }

            // cache result
            field.old = ret;

            // trigger callback
            isFunction(field[callback]) && field[callback].call(me, el, ret);
            isFunction(opt.validation) && opt.validation.call(me, el, ret);

            // trigger event
            $(el).attr( ARIA_INVALID, isValid ? null : true )
                 .trigger( callback + CLS_NS_FIELD, [ret, me] );
            me.$el.triggerHandler('validation', [ret, me]);

            if (me.checkOnly) return;
            // set className
            me._setClass(el, ret.skip || ret.type === 'tip' ? null : isValid);
            me._makeMsg.apply(me, arguments);
        },

        _makeMsg: function(el, field, ret) {
            // show or hide the message
            if (field.msgMaker) {
                ret = $.extend({}, ret);
                if (field._e === 'focusin') {
                    ret.type = 'tip';
                }
                this[ ret.showOk || ret.msg || ret.type === 'tip' ? 'showMsg' : 'hideMsg' ](el, ret, field);
            }
        },

        // Validated a rule
        _validatedRule: function(el, field, ret, msgOpt) {
            field = field || me.getField(el);
            msgOpt = msgOpt || {};

            var me = this,
                msg,
                rule,
                method = field._r,
                timely = field.timely,
                special = timely === 9 || timely === 8,
                transfer,
                temp,
                isValid = false;

            // use null to break validation from a field
            if (ret === null) {
                me._validatedField(el, field, {isValid: true, skip: true});
                field._i = 0;
                return;
            }
            else if (ret === undefined) {
                transfer = true;
            }
            else if (ret === true || ret === '') {
                isValid = true;
            }
            else if (isString(ret)) {
                msg = ret;
            }
            else if (isObject(ret)) {
                if (ret.error) {
                    msg = ret.error;
                } else {
                    msg = ret.ok;
                    isValid = true;
                }
            }

            rule = field._rules[field._i];
            if (rule.not) {
                msg = undefined;
                isValid = method === "required" || !isValid;
            }
            if (rule.or) {
                if (isValid) {
                    while ( field._i < field._rules.length && field._rules[field._i].or ) {
                        field._i++;
                    }
                } else {
                    transfer = true;
                }
            }
            else if (rule.and) {
                if (!field.isValid) transfer = true;
            }

            if (transfer) {
                isValid = true;
            }
            // message analysis, and throw rule level event
            else {
                if (isValid) {
                    if (field.showOk !== false) {
                        temp = attr(el, DATA_OK);
                        msg = temp === null ? isString(field.ok) ? field.ok : msg : temp;
                        if (!isString(msg) && isString(field.showOk)) {
                            msg = field.showOk;
                        }
                        if (isString(msg)) {
                            msgOpt.showOk = isValid;
                        }
                    }
                }
                if (!isValid || special) {
                    /* rule message priority:
                        1. custom DOM message
                        2. custom field message;
                        3. global defined message;
                        4. rule returned message;
                        5. default message;
                    */
                    msg = (_getDataMsg(el, field, msg || rule.msg || me.messages[method]) || me.messages.fallback).replace(/\{0\|?([^\}]*)\}/, function(m, defaultDisplay){
                        return me._getDisplay(el, field.display) || defaultDisplay || me.messages[0];
                    });
                }
                if (!isValid) field.isValid = isValid;
                msgOpt.msg = msg;
                $(el).trigger( (isValid ? 'valid' : 'invalid') + CLS_NS_RULE, [method, msg]);
            }

            if (special && (!transfer || rule.and)) {
                if (!isValid && !field._m) field._m = msg;
                field._v = field._v || [];
                field._v.push({
                    type: isValid ? !transfer ? 'ok' : 'tip' : 'error',
                    msg: msg || rule.msg
                });
            }

            me._debug('log', '   ' + field._i + ': ' + method + ' => ' + (isValid || msg));

            // the current rule has passed, continue to validate
            if ( (isValid || special) && field._i < field._rules.length - 1) {
                field._i++;
                me._checkRule(el, field);
            }
            // field was invalid, or all fields was valid
            else {
                field._i = 0;

                if (special) {
                    msgOpt.isValid = field.isValid;
                    msgOpt.result = field._v;
                    msgOpt.msg = field._m || '';
                    if (!field.value && (field._e === 'focusin')) {
                        msgOpt.type = 'tip';
                    }
                } else {
                    msgOpt.isValid = isValid;
                }

                me._validatedField(el, field, msgOpt);
                delete field._m;
                delete field._v;
            }
        },

        // Verify a rule form a field
        _checkRule: function(el, field) {
            var me = this,
                ret,
                fn,
                old,
                key = field.key,
                rule = field._rules[field._i],
                method = rule.method,
                params = rule.params;

            // request has been sent, wait it
            if (me.submiting && me.deferred[key]) {
                return;
            }
            old = field.old;
            field._r = method;

            if (old && !field.must && !rule.must && rule.result !== undefined &&
                 old.ruleName === method && old.id === el.id &&
                field.value && old.value === field.value )
            {
                // get result from cache
                ret = rule.result;
            }
            else {
                // get result from current rule
                fn = _getDataRule(el, method) || me.rules[method] || noop;
                ret = fn.call(field, el, params, field);
                if (fn.msg) rule.msg = fn.msg;
            }

            // asynchronous validation
            if (isObject(ret) && isFunction(ret.then)) {
                me.deferred[key] = ret;

                // whether the field valid is unknown
                field.isValid = undefined;

                // show loading message
                !me.checkOnly && me.showMsg(el, {
                    type: 'loading',
                    msg: me.messages.loading
                }, field);

                // waiting to parse the response data
                ret.then(
                    function(d, textStatus, jqXHR) {
                        var data = trim(jqXHR.responseText),
                            result,
                            dataFilter = field.dataFilter;

                        // detect if data is json or jsonp format
                        if (/jsonp?/.test(this.dataType)) {
                            data = d;
                        } else if (data.charAt(0) === '{') {
                            data = $.parseJSON(data);
                        }

                        // filter data
                        result = dataFilter.call(this, data, field);
                        if (result === undefined) result = dataFilter.call(this, data.data, field);

                        rule.data = this.data;
                        rule.result = field.old ? result : undefined;
                        me._validatedRule(el, field, result);
                    },
                    function(jqXHR, textStatus){
                        me._validatedRule(el, field, me.messages[textStatus] || textStatus);
                    }
                ).always(function(){
                    delete me.deferred[key];
                });
            }
            // other result
            else {
                me._validatedRule(el, field, ret);
            }
        },

        // Processing the validation
        _validate: function(el, field) {
            var me = this;

            // doesn't validate the element that has "disabled" or "novalidate" attribute
            if ( el.disabled || attr(el, NOVALIDATE) !== null ) {
                return;
            }

            field = field || me.getField(el);
            if (!field) return;
            if (!field._rules) me._parse(el);
            if (!field._rules) return;

            me._debug('info', field.key);

            field.isValid = true;
            field.element = el;
            // Cache the value
            field.value = field.getValue();

            // if the field is not required, and that has a blank value
            if (!field.required && !field.must && !field.value) {
                if (!_checkable(el)) {
                    me._validatedField(el, field, {isValid: true});
                    return true;
                }
            }

            me._checkRule(el, field);
            return field.isValid;
        },

        _debug: function(type, messages) {
            if (window.console && this.options.debug) {
                console[type](messages);
            }
        },

        /**
         * Detecting whether the value of an element that matches a rule
         *
         * @method test
         * @param {Element} el - input element
         * @param {String} rule - rule name
         */
        test: function(el, rule) {
            var me = this,
                ret,
                parts = rRule.exec(rule),
                field,
                method,
                params;

            if (parts) {
                method = parts[1];
                if (method in me.rules) {
                    params = parts[2] || parts[3];
                    params = params ? params.split(', ') : undefined;
                    field = me.getField(el, true);
                    field._r = method;
                    field.value = field.getValue();
                    ret = me.rules[method].call(field, el, params);
                }
            }

            return ret === true || ret === undefined || ret === null;
        },

        _getDisplay: function(el, str) {
            return !isString(str) ? isFunction(str) ? str.call(this, el) : '' : str;
        },

        _getMsgOpt: function(obj, field) {
            var opt = field ? field : this.options;
            return $.extend({
                type: 'error',
                pos: _getPos(opt.msgClass),
                target: opt.target,
                wrapper: opt.msgWrapper,
                style: opt.msgStyle,
                cls: opt.msgClass,
                arrow: opt.msgArrow,
                icon: opt.msgIcon
            }, isString(obj) ? {msg: obj} : obj);
        },

        _getMsgDOM: function(el, msgOpt) {
            var $el = $(el), $msgbox, datafor, tgt, container;

            if ( $el.is(INPUT_SELECTOR) ) {
                tgt = msgOpt.target || attr(el, DATA_TARGET);
                if (tgt) {
                    tgt = !isFunction(tgt) ? tgt.charAt(0) === '#' ? $(tgt) : this.$el.find(tgt) : tgt.call(this, el);
                    if (tgt.length) {
                        if ( tgt.is(INPUT_SELECTOR) ) {
                            $el = tgt
                            el = tgt.get(0);
                        } else if ( tgt.hasClass(CLS_MSG_BOX) ) {
                            $msgbox = tgt;
                        } else {
                            container = tgt;
                        }
                    }
                }
                if (!$msgbox) {
                    datafor = (!_checkable(el) || !el.name) && el.id ? el.id : el.name;
                    $msgbox = (container || this.$el).find(msgOpt.wrapper + '.' + CLS_MSG_BOX + '[for="' + datafor + '"]');
                }
            } else {
                $msgbox = $el;
            }

            // Create new message box
            if (!msgOpt.hide && !$msgbox.length) {
                $msgbox = $('<'+ msgOpt.wrapper + '>').attr({
                    'class': CLS_MSG_BOX + (msgOpt.cls ? ' ' + msgOpt.cls : ''),
                    'style': msgOpt.style || undefined,
                    'for': datafor
                });

                if ( _checkable(el) ) {
                    var $parent = $el.parent();
                    $msgbox.appendTo( $parent.is('label') ? $parent.parent() : $parent );
                } else {
                    if (container) {
                        $msgbox.appendTo(container);
                    } else {
                        $msgbox[!msgOpt.pos || msgOpt.pos === 'right' ? 'insertAfter' : 'insertBefore']($el);
                    }
                }
            }

            return $msgbox;
        },

        /**
         * Show validation message
         *
         * @method showMsg
         * @param {Element} el - input element
         * @param {Object} msgOpt
         */
        showMsg: function(el, msgOpt, /*INTERNAL*/ field) {
            if (!el) return;
            var me = this,
                opt = me.options,
                msgShow,
                msgMaker,
                temp,
                $msgbox;

            if (isObject(el) && !el.jquery && !msgOpt) {
                $.each(el, function(key, msg) {
                    var el = me.elements[key] || me.$el.find(_key2selector(key))[0];
                    me.showMsg(el, msg);
                });
                return;
            }

            if ($(el).is(INPUT_SELECTOR)) {
                field = field || me.getField(el);
            }

            if (!(msgMaker = (field || opt).msgMaker)) {
                return;
            }

            msgOpt = me._getMsgOpt(msgOpt, field);
            el = (el.name && _checkable(el) ? me.$el.find('input[name="'+ el.name +'"]') : $(el)).get(0);

            // ok or tip
            if (!msgOpt.msg && msgOpt.type !== 'error') {
                temp = attr(el, 'data-' + msgOpt.type);
                if (temp !== null) msgOpt.msg = temp;
            }

            if ( !isString(msgOpt.msg) ) {
                return;
            }

            $msgbox = me._getMsgDOM(el, msgOpt);

            !rPos.test($msgbox[0].className) && $msgbox.addClass(msgOpt.cls);
            if ( isIE === 6 && msgOpt.pos === 'bottom' ) {
                $msgbox[0].style.marginTop = $(el).outerHeight() + 'px';
            }
            $msgbox.html( msgMaker.call(me, msgOpt) )[0].style.display = '';

            if (isFunction(msgShow = field && field.msgShow || opt.msgShow)) {
                msgShow.call(me, $msgbox, msgOpt.type);
            }
        },

        /**
         * Hide validation message
         *
         * @method hideMsg
         * @param {Element} el - input element
         * @param {Object} msgOpt optional
         */
        hideMsg: function(el, msgOpt, /*INTERNAL*/ field) {
            var me = this,
                opt = me.options,
                msgHide,
                $msgbox;

            el = $(el).get(0);
            if ($(el).is(INPUT_SELECTOR)) {
                field = field || me.getField(el);
                if (field) {
                    if (field.isValid || me.reseting) attr(el, ARIA_INVALID, null);
                }
            }

            msgOpt = me._getMsgOpt(msgOpt, field);
            msgOpt.hide = true;

            $msgbox = me._getMsgDOM(el, msgOpt);
            if (!$msgbox.length) return;

            if ( isFunction(msgHide = field && field.msgHide || opt.msgHide) ) {
                msgHide.call(me, $msgbox, msgOpt.type);
            } else {
                $msgbox[0].style.display = 'none';
                $msgbox[0].innerHTML = null;
            }
        },

        /**
         * Get field information
         *
         * @method getField
         * @param {Element} - input element
         * @return {Object} field
         */
        getField: function(el, must) {
            var me = this,
                key,
                field;

            if (isString(el)) {
                key = el;
                el = undefined;
            } else {
                if (attr(el, DATA_RULE)) {
                    return me._parse(el);
                }
                if (el.id && '#' + el.id in me.fields || !el.name) {
                    key = '#' + el.id;
                } else {
                    key = el.name;
                }
            }

            if ( (field = me.fields[key]) || must && (field = new me.Field(key)) ) {
                field.element = el;
            }

            return field;
        },

        /**
         * Config a field
         *
         * @method: setField
         * @param {String} key
         * @param {Object} obj
         */
        setField: function(key, obj) {
            var fields = {};

            if (!key) return;

            // update this field
            if (isString(key)) {
                fields[key] = obj;
            }
            // update fields
            else {
                fields = key;
            }

            this._initFields(fields);
        },

        /**
         * Detecting whether the form is valid
         *
         * @method isFormValid
         * @return {Boolean}
         */
        isFormValid: function() {
            var fields = this.fields, k, field;
            for (k in fields) {
                field = fields[k];
                if (!field._rules || !field.required && !field.must && !field.value) continue;
                if (!field.isValid) return false;
            }
            return true;
        },

        /**
         * Prevent submission form
         *
         * @method holdSubmit
         * @param {Boolean} hold - If set to false, will release the hold
         */
        holdSubmit: function(hold) {
            this.submiting = hold === undefined || hold;
        },

        /**
         * Clean validation messages
         *
         * @method cleanUp
         */
        cleanUp: function() {
            this._reset(1);
        },

        /**
         * Destroy the validation
         *
         * @method destroy
         */
        destroy: function() {
            this._reset(1);
            this.$el.off(CLS_NS).removeData(NS);
            attr(this.$el[0], NOVALIDATE, this._NOVALIDATE);
        }
    };

    /**
     * Create Field Factory
     *
     * @class
     * @param  {Object}     context
     * @return {Function}   Factory
     */
    function _createFieldFactory(context) {
        function FieldFactory() {
            var options = this.options;
            for (var i in options) {
                if (i in fieldDefaults) this[i] = options[i];
            }
            $.extend(this, {
                _valHook: function() {
                    return this.element.contentEditable === 'true' ? 'text' : 'val';
                },
                getValue: function() {
                    var elem = this.element;
                    if (elem.type === "number" && elem.validity && elem.validity.badInput) {
                        return 'NaN';
                    }
                    return  $(elem)[this._valHook()]();
                },
                setValue: function(value) {
                    $(this.element)[this._valHook()](this.value = value);
                },
                // Get a range of validation messages
                getRangeMsg: function(value, params, suffix) {
                    if (!params) return;

                    var me = this,
                        msg = me.messages[me._r] || '',
                        result,
                        p = params[0].split('~'),
                        e = params[1] === 'false',
                        a = p[0],
                        b = p[1],
                        c = 'rg',
                        args = [''],
                        isNumber = trim(value) && +value === +value;

                    function compare(large, small) {
                        return !e ? large >= small : large > small;
                    }

                    if (p.length === 2) {
                        if (a && b) {
                            if (isNumber && compare(value, +a) && compare(+b, value)) {
                                result = true;
                            }
                            args = args.concat(p);
                            c = e ? 'gtlt' : 'rg';
                        }
                        else if (a && !b) {
                            if (isNumber && compare(value, +a)) {
                                result = true;
                            }
                            args.push(a);
                            c = e ? 'gt' : 'gte';
                        }
                        else if (!a && b) {
                            if (isNumber && compare(+b, value)) {
                                result = true;
                            }
                            args.push(b);
                            c = e ? 'lt' : 'lte';
                        }
                    }
                    else {
                        if (value === +a) {
                            result = true;
                        }
                        args.push(a);
                        c = 'eq';
                    }

                    if (msg) {
                        if (suffix && msg[c + suffix]) {
                            c += suffix;
                        }
                        args[0] = msg[c];
                    }

                    return result || me._rules && ( me._rules[me._i].msg = me.renderMsg.apply(null, args) );
                },
                // Render message template
                renderMsg: function() {
                    var args = arguments,
                        tpl = args[0],
                        i = args.length;

                    if (!tpl) return;

                    while (--i) {
                        tpl = tpl.replace('{' + i + '}', args[i]);
                    }

                    return tpl;
                }
            });
        }
        function Field(key, obj, oldField) {
            this.key = key;
            this.validator = context;
            $.extend(this, oldField, obj);
        }

        FieldFactory.prototype = context;
        Field.prototype = new FieldFactory();

        return Field;
    }

    /**
     * Create Rules
     *
     * @class
     * @param {Object} obj     rules
     * @param {Object} context context
     */
    function Rules(obj, context) {
        if (!isObject(obj)) return;

        var k, that = context ? context === true ? this : context : Rules.prototype;

        for (k in obj) {
            if (_checkRuleName(k))
                that[k] = _getRule(obj[k]);
        }
    }

    /**
     * Create Messages
     *
     * @class
     * @param {Object} obj     rules
     * @param {Object} context context
     */
    function Messages(obj, context) {
        if (!isObject(obj)) return;

        var k, that = context ? context === true ? this : context : Messages.prototype;

        for (k in obj) {
            that[k] = obj[k];
        }
    }

    // Rule converted factory
    function _getRule(fn) {
        switch ($.type(fn)) {
            case 'function':
                return fn;
            case 'array':
                var f = function() {
                    return fn[0].test(this.value) || fn[1] || false;
                };
                f.msg = fn[1];
                return f;
            case 'regexp':
                return function() {
                    return fn.test(this.value);
                };
        }
    }

    // Get instance by an element
    function _getInstance(el) {
        var wrap, k, options;

        if (!el || !el.tagName) return;

        switch (el.tagName) {
            case 'INPUT':
            case 'SELECT':
            case 'TEXTAREA':
            case 'BUTTON':
            case 'FIELDSET':
                wrap = el.form || $(el).closest('.' + CLS_WRAPPER);
                break;
            case 'FORM':
                wrap = el;
                break;
            default:
                wrap = $(el).closest('.' + CLS_WRAPPER);
        }

        for (k in preinitialized) {
            if ($(wrap).is(k)) {
                options = preinitialized[k];
                break;
            }
        }

        return $(wrap).data(NS) || $(wrap)[NS](options).data(NS);
    }

    // Get custom rules on the node
    function _getDataRule(el, method) {
        var fn = trim(attr(el, DATA_RULE + '-' + method));

        if ( fn && (fn = new Function("return " + fn)()) ) {
            return _getRule(fn);
        }
    }

    // Get custom messages on the node
    function _getDataMsg(el, field, m) {
        var msg = field.msg,
            item = field._r;

        if ( isObject(msg) ) msg = msg[item];
        if ( !isString(msg) ) {
            msg = attr(el, DATA_MSG + '-' + item) || attr(el, DATA_MSG) || ( m ? isString(m) ? m : m[item] : '');
        }

        return msg;
    }

    // Get message position
    function _getPos(str) {
        var pos;

        if (str) pos = rPos.exec(str);
        return pos && pos[0];
    }

    // Check whether the element is checkbox or radio
    function _checkable(el) {
        return el.tagName === 'INPUT' && el.type === 'checkbox' || el.type === 'radio';
    }

    // Parse date string to timestamp
    function _parseDate(str) {
        return Date.parse(str.replace(/\.|\-/g, '/'));
    }

    // Rule name only allows alphanumeric characters and underscores
    function _checkRuleName(name) {
        return /^\w+$/.test(name);
    }

    // Translate field key to jQuery selector.
    function _key2selector(key) {
        var isID = key.charAt(0) === "#";
        key = key.replace(/([:.{(|)}/\[\]])/g, "\\$1");
        return isID ? key : '[name="'+ key +'"]:first';
    }


    // Fixed a issue cause by refresh page in IE.
    $(window).on('beforeunload', function(){
        this.focus();
    });

    $(document)
    .on('click', ':submit', function(){
        var input = this, attrNode;
        if (!input.form) return;
        // Shim for "formnovalidate"
        attrNode = input.getAttributeNode('formnovalidate');
        if (attrNode && attrNode.nodeValue !== null || attr(input, NOVALIDATE)!== null) {
            novalidateonce = true;
        }
    })
    // Automatic initializing form validation
    .on('focusin submit validate', 'form,.'+CLS_WRAPPER, function(e) {
        if ( attr(this, NOVALIDATE) !== null ) return;
        var $form = $(this), me;

        if ( !$form.data(NS) && (me = _getInstance(this)) ) {
            if ( !$.isEmptyObject(me.fields) ) {
                // Execute event handler
                if (e.type === 'focusin') {
                    me._focusin(e);
                } else {
                    me._submit(e);
                }
            } else {
                attr(this, NOVALIDATE, NOVALIDATE);
                $form.off(CLS_NS).removeData(NS);
            }
        }
    });

    new Messages({
        fallback: "This field is not valid.",
        loading: 'Validating...'
    });


    // Built-in rules (global)
    new Rules({

        /**
         * required
         *
         * @example:
            required
            required(anotherRule)
            required(not, -1)
            required(from, .contact)
         */
        required: function(element, params) {
            var me = this,
                val = trim(me.value),
                isValid = true;

            if (params) {
                if ( params.length === 1 ) {
                    if ( !_checkRuleName(params[0]) ) {
                        if (!val && !$(params[0], me.$el).length ) {
                            return null;
                        }
                    }
                    else if ( me.rules[params[0]] ) {
                        if ( !val && !me.test(element, params[0]) ) {
                            return null;
                        }
                    }
                }
                else if ( params[0] === 'not' ) {
                    $.each(params.slice(1), function() {
                        return (isValid = val !== trim(this));
                    });
                }
                else if ( params[0] === 'from' ) {
                    var $elements = me.$el.find(params[1]),
                        VALIDATED = '_validated_',
                        ret;

                    isValid = $elements.filter(function(){
                        var field = me.getField(this);
                        return field && !!trim(field.getValue());
                    }).length >= (params[2] || 1);

                    if (isValid) {
                        if (!val) ret = null;
                    } else {
                        ret = _getDataMsg($elements[0], me) || false;
                    }

                    if ( !$(element).data(VALIDATED) ) {
                        $elements.data(VALIDATED, 1).each(function(){
                            if (element !== this) {
                                me._validate(this);
                            }
                        }).removeData(VALIDATED);
                    }

                    return ret;
                }
            }

            return isValid && !!val;
        },

        /**
         * integer
         *
         * @example:
            integer
            integer[+]
            integer[+0]
            integer[-]
            integer[-0]
         */
        integer: function(element, params) {
            var re, z = '0|',
                p = '[1-9]\\d*',
                key = params ? params[0] : '*';

            switch (key) {
                case '+':
                    re = p;
                    break;
                case '-':
                    re = '-' + p;
                    break;
                case '+0':
                    re = z + p;
                    break;
                case '-0':
                    re = z + '-' + p;
                    break;
                default:
                    re = z + '-?' + p;
            }
            re = '^(?:' + re + ')$';

            return new RegExp(re).test(this.value) || this.messages.integer[key];
        },

        /**
         * match another field
         *
         * @example:
            match[password]    Match the password field (two values ​​must be the same)
            match[eq, password]  Ditto
            match[neq, count]  The value must be not equal to the value of the count field
            match[lt, count]   The value must be less than the value of the count field
            match[lte, count]  The value must be less than or equal to the value of the count field
            match[gt, count]   The value must be greater than the value of the count field
            match[gte, count]  The value must be greater than or equal to the value of the count field
            match[gte, startDate, date]
            match[gte, startTime, time]
         **/
        match: function(element, params) {
            if (!params) return;

            var me = this,
                a, b,
                key, msg, type = 'eq', parser,
                selector2, elem2, field2;

            if (params.length === 1) {
                key = params[0];
            } else {
                type = params[0];
                key = params[1];
            }

            selector2 = _key2selector(key);
            elem2 = me.$el.find(selector2)[0];
            // If the compared field is not exist
            if (!elem2) return;
            field2 = me.getField(elem2);
            a = me.value;
            b = field2.getValue();

            if (!me._match) {
                me.$el.on('valid'+CLS_NS_FIELD+CLS_NS, selector2, function(){
                    $(element).trigger('validate');
                });
                me._match = field2._match = 1;
            }

            // If both fields are blank
            if (!me.required && a === "" && b === "") {
                return null;
            }

            parser = params[2];
            if (parser) {
                if (/^date(time)?$/i.test(parser)) {
                    a = _parseDate(a);
                    b = _parseDate(b);
                } else if (parser === 'time') {
                    a = +a.replace(/:/g, '');
                    b = +b.replace(/:/g, '');
                }
            }

            // If the compared field is incorrect, we only ensure that this field is correct.
            if (type !== "eq" && !isNaN(+a) && isNaN(+b)) {
                return true;
            }

            msg = me.messages.match[type].replace( '{1}', me._getDisplay( element, field2.display || key ) );

            switch (type) {
                case 'lt':
                    return (+a < +b) || msg;
                case 'lte':
                    return (+a <= +b) || msg;
                case 'gte':
                    return (+a >= +b) || msg;
                case 'gt':
                    return (+a > +b) || msg;
                case 'neq':
                    return (a !== b) || msg;
                default:
                    return (a === b) || msg;
            }
        },

        /**
         * range numbers
         *
         * @example:
            range[0~99]    Number 0-99
            range[0~]      Number greater than or equal to 0
            range[~100]    Number less than or equal to 100
         **/
        range: function(element, params) {
            return this.getRangeMsg(this.value, params);
        },

        /**
         * how many checkbox or radio inputs that checked
         *
         * @example:
            checked;       no empty, same to required
            checked[1~3]   1-3 items
            checked[1~]    greater than 1 item
            checked[~3]    less than 3 items
            checked[3]     3 items
         **/
        checked: function(element, params) {
            if ( !_checkable(element) ) return;

            var me = this,
                elem, count;

            if (element.name) {
                count = me.$el.find('input[name="' + element.name + '"]').filter(function() {
                    var el = this;
                    if (!elem && _checkable(el)) elem = el;
                    return !el.disabled && el.checked;
                }).length;
            } else {
                elem = element;
                count = elem.checked;
            }

            if (params) {
                return me.getRangeMsg(count, params);
            } else {
                return !!count || _getDataMsg(elem, me, '') || me.messages.required;
            }
        },

        /**
         * length of a characters (You can pass the second parameter "true", will calculate the length in bytes)
         *
         * @example:
            length[6~16]        6-16 characters
            length[6~]          Greater than 6 characters
            length[~16]         Less than 16 characters
            length[~16, true]   Less than 16 characters, non-ASCII characters calculating two-character
         **/
        length: function(element, params) {
            var value = this.value,
                len = (params[1] === 'true' ? value.replace(rDoubleBytes, 'xx') : value).length;

            return this.getRangeMsg(len, params, (params[1] ? '_2' : ''));
        },

        /**
         * remote validation
         *
         * @description
         *  remote([get:]url [, name1, [name2 ...]]);
         *  Adaptation three kinds of results (Front for the successful, followed by a failure):
                1. text:
                    ''  'Error Message'
                2. json:
                    {"ok": ""}  {"error": "Error Message"}
                3. json wrapper:
                    {"status": 1, "data": {"ok": ""}}  {"status": 1, "data": {"error": "Error Message"}}
         * @example
            The simplest:       remote(path/to/server);
            With parameters:    remote(path/to/server, name1, name2, ...);
            By GET:             remote(get:path/to/server, name1, name2, ...);
            Name proxy:         remote(path/to/server, name1, proxyname2:name2, proxyname3:#id3, ...)
            Query String        remote(path/to/server, foo=1&bar=2, name1, name2, ...)
         */
        remote: function(element, params) {
            if (!params) return;

            var me = this,
                arr = rAjaxType.exec(params[0]),
                rule = me._rules[me._i],
                data = {},
                queryString = '',
                url = arr[3],
                type = arr[2] || 'POST',            // GET / POST
                rType = (arr[1]||'').toLowerCase(), // CORS / JSONP
                dataType;

            rule.must = true;
            data[element.name] = me.value;

            // There are extra fields
            if (params[1]) {
                $.map(params.slice(1), function(name) {
                    var arr, key;
                    if (~name.indexOf('=')) {
                        queryString += '&' + name;
                    } else {
                        arr = name.split(':');
                        name = trim(arr[0]);
                        key = trim(arr[1]) || name;
                        data[ name ] = me.$el.find( _key2selector(key) ).val();
                    }
                });
            }

            data = $.param(data) + queryString;
            if (!me.must && rule.data && rule.data === data) {
                return rule.result;
            }

            // Cross-domain request, force jsonp dataType
            if (rType !== 'cors' && /^https?:/.test(url) && !~url.indexOf(location.host)) {
                dataType = 'jsonp';
            }

            // Asynchronous validation need return jqXHR objects
            return $.ajax({
                url: url,
                type: type,
                data: data,
                dataType: dataType
            });
        },

        /**
         * filter characters, direct filtration without prompting error (support custom regular expressions)
         *
         * @example
         *  filter          filtering unsafe characters
         *  filter(regexp)  filtering the "regexp" matched characters
         */
        filter: function(element, params) {
            var value = this.value,
                temp = value.replace( params ? (new RegExp("[" + params[0] + "]", "gm")) : rUnsafe, '' );
            if (temp !== value) this.setValue(temp);
        }
    });


    /**
     * Config global options
     *
     * @static  config
     * @param {Object} options
     */
    Validator.config = function(key, value) {
        if (isObject(key)) {
            $.each(key, _config);
        }
        else if (isString(key)) {
            _config(key, value);
        }

        function _config(k, o) {
            if (k === 'rules') {
                new Rules(o);
            }
            else if (k === 'messages') {
                new Messages(o);
            }
            else if (k in fieldDefaults) {
                fieldDefaults[k] = o;
            }
            else {
                defaults[k] = o;
            }
        }
    };

    /**
     * Config themes
     *
     * @static setTheme
     * @param {String|Object} name
     * @param {Object} obj
     * @example
        .setTheme( themeName, themeOptions )
        .setTheme( multiThemes )
     */
    Validator.setTheme = function(name, obj) {
        if ( isObject(name) ) {
            $.extend(true, themes, name);
        }
        else if ( isString(name) && isObject(obj) ) {
            themes[name] = $.extend(themes[name], obj);
        }
    };

    /**
     * Resource loader
     *
     * @static load
     * @param {String} str
     * @example
        .load('local=zh-CN')        // load: local/zh-CN.js and jquery.validator.css
        .load('local=zh-CN&css=')   // load: local/zh-CN.js
        .load('local&css')          // load: local/en.js (set <html lang="en">) and jquery.validator.css
        .load('local')              // dito
     */
    Validator.load = function(str) {
        if (!str) return;
        var doc = document,
            params = {},
            node = doc.scripts[0],
            dir, el, ONLOAD;

        str.replace(/([^?=&]+)=([^&#]*)/g, function(m, key, value){
            params[key] = value;
        });

        dir = params.dir || Validator.dir;

        if (!Validator.css && params.css !== '') {
            el = doc.createElement('link');
            el.rel = 'stylesheet';
            el.href = Validator.css = dir + 'jquery.validator.css';
            node.parentNode.insertBefore(el, node);
        }
        if (!Validator.local && ~str.indexOf('local') && params.local !== '') {
            Validator.local = (params.local || doc.documentElement.lang || 'en').replace('_','-');
            Validator.pending = 1;
            el = doc.createElement('script');
            el.src = dir + 'local/' + Validator.local + '.js';
            ONLOAD = 'onload' in el ? 'onload' : 'onreadystatechange';
            el[ONLOAD] = function() {
                if (!el.readyState || /loaded|complete/.test(el.readyState)) {
                    el = el[ONLOAD] = null;
                    delete Validator.pending;
                    $(window).triggerHandler('validatorready');
                }
            };
            node.parentNode.insertBefore(el, node);
        }
    };

    // Auto loading resources
    (function(){
        var scripts = document.scripts,
            i = scripts.length, node, arr,
            re = /(.*validator(?:\.min)?.js)(\?.*(?:local|css|dir)(?:=[\w\-]*)?)?/;

        while (i-- && !arr) {
            node = scripts[i];
            arr = (node.hasAttribute ? node.src : node.getAttribute('src',4)||'').match(re);
        }

        if (!arr) return;
        Validator.dir = arr[1].split('/').slice(0, -1).join('/')+'/';
        Validator.load(arr[2]);
    })();

    return $[NS] = Validator;
}));
