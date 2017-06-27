YUI.add('console', function(Y) {

/**
 * A user interface for viewing log messages.
 *
 * @module console
 */

var getCN = Y.ClassNameManager.getClassName,
    CONSOLE        = 'console',
    ENTRY          = 'entry',
    RESET          = 'reset',
    CHECKED        = 'checked',
    TITLE          = 'title',
    PAUSE          = 'pause',
    PAUSED         = 'paused',
    CLEAR          = 'clear',
    INFO           = 'info',
    WARN           = 'warn',
    ERROR          = 'error',
    INNER_HTML     = 'innerHTML',
    CLICK          = 'click',
    CONTENT_BOX    = 'contentBox',
    DISABLED       = 'disabled',
    START_TIME     = 'startTime',
    LAST_TIME      = 'lastTime',
    ENTRY_TEMPLATE = 'entryTemplate',
    RENDERED       = 'rendered',

    DOT = '.',

    C_ENTRY            = getCN(CONSOLE,ENTRY),
    C_PAUSE            = getCN(CONSOLE,PAUSE),
    C_CHECKBOX         = getCN(CONSOLE,'checkbox'),
    C_BUTTON           = getCN(CONSOLE,'button'),
    C_CLEAR            = getCN(CONSOLE,CLEAR),
    C_PAUSE_LABEL      = getCN(CONSOLE,PAUSE,'label'),
    C_ENTRY_META       = getCN(CONSOLE,ENTRY,'meta'),
    C_ENTRY_CAT        = getCN(CONSOLE,ENTRY,'cat'),
    C_ENTRY_SRC        = getCN(CONSOLE,ENTRY,'src'),
    C_ENTRY_TIME       = getCN(CONSOLE,ENTRY,'time'),
    C_ENTRY_CONTENT    = getCN(CONSOLE,ENTRY,'content'),
    C_CONSOLE_HD       = getCN(CONSOLE,'hd'),
    C_CONSOLE_BD       = getCN(CONSOLE,'bd'),
    C_CONSOLE_FT       = getCN(CONSOLE,'ft'),
    C_CONSOLE_CONTROLS = getCN(CONSOLE,'controls'),
    C_CONSOLE_TITLE    = getCN(CONSOLE,TITLE),

    RE_INLINE_SOURCE = /^(\S+)\s/,
    RE_AMP = /&/g,
    RE_LT  = /</g,
    RE_GT  = />/g,

    ESC_AMP = '&#38;',
    ESC_LT  = '&#60;',
    ESC_GT  = '&#62;',
    
    L = Y.Lang,
    isString   = L.isString,
    isNumber   = L.isNumber,
    isObject   = L.isObject,
    merge      = Y.merge,
    substitute = Y.substitute,
    create     = Y.Node.create;
    
/**
 * Console creates a visualization for messages logged through calls to a YUI
 * instance's <code>Y.log( message, category, source )</code> method.  The
 * debug versions of YUI modules will include logging statements to offer some
 * insight into the steps executed during that module's operation.  Including
 * log statements in your code will cause those messages to also appear in the
 * Console.  Use Console to aid in developing your page or application.
 *
 * Entry categories are also referred to as the log level, and entries are
 * filtered against the configured logLevel.
 *
 * @class Console
 * @extends Widget
 */

function Console() {
    Console.superclass.constructor.apply(this,arguments);
}

Y.mix(Console, {

    /**
     * The identity of the widget.
     *
     * @property Console.NAME
     * @type String
     * @static
     */
    NAME : CONSOLE,

    /**
     * Static identifier for logLevel configuration setting to allow all
     * incoming messages to generate Console entries.
     *
     * @property Console.LOG_LEVEL_INFO
     * @type Number
     * @static
     */
    LOG_LEVEL_INFO  : 3,

    /**
     * Static identifier for logLevel configuration setting to allow only
     * incoming messages of logLevel &quot;warn&quot; or &quot;error&quot;
     * to generate Console entries.
     *
     * @property Console.LOG_LEVEL_WARN
     * @type Number
     * @static
     */
    LOG_LEVEL_WARN  : 2,

    /**
     * Static identifier for logLevel configuration setting to allow only
     * incoming messages of logLevel &quot;error&quot; to generate
     * Console entries.
     *
     * @property Console.LOG_LEVEL_ERROR
     * @type Number
     * @static
     */
    LOG_LEVEL_ERROR : 1,

    /**
     * Map (object) of classNames used to populate the placeholders in the
     * Console.ENTRY_TEMPLATE markup when rendering a new Console entry.
     *
     * <p>By default, the keys contained in the object are:</p>
     * <ul>
     *    <li>entry_class</li>
     *    <li>entry_meta_class</li>
     *    <li>entry_cat_class</li>
     *    <li>entry_src_class</li>
     *    <li>entry_time_class</li>
     *    <li>entry_content_class</li>
     * </ul>
     *
     * @property Console.ENTRY_CLASSES
     * @type Object
     * @static
     */
    ENTRY_CLASSES   : {
        entry_class         : C_ENTRY,
        entry_meta_class    : C_ENTRY_META,
        entry_cat_class     : C_ENTRY_CAT,
        entry_src_class     : C_ENTRY_SRC,
        entry_time_class    : C_ENTRY_TIME,
        entry_content_class : C_ENTRY_CONTENT
    },

    /**
     * Map (object) of classNames used to populate the placeholders in the
     * Console.HEADER_TEMPLATE, Console.BODY_TEMPLATE, and
     * Console.FOOTER_TEMPLATE markup when rendering the Console UI.
     *
     * <p>By default, the keys contained in the object are:</p>
     * <ul>
     *   <li>console_hd_class</li>
     *   <li>console_bd_class</li>
     *   <li>console_ft_class</li>
     *   <li>console_controls_class</li>
     *   <li>console_checkbox_class</li>
     *   <li>console_pause_class</li>
     *   <li>console_pause_label_class</li>
     *   <li>console_button_class</li>
     *   <li>console_clear_class</li>
     *   <li>console_title_class</li>
     * </ul>
     *
     * @property Console.CHROME_CLASSES
     * @type Object
     * @static
     */
    CHROME_CLASSES  : {
        console_hd_class       : C_CONSOLE_HD,
        console_bd_class       : C_CONSOLE_BD,
        console_ft_class       : C_CONSOLE_FT,
        console_controls_class : C_CONSOLE_CONTROLS,
        console_checkbox_class : C_CHECKBOX,
        console_pause_class    : C_PAUSE,
        console_pause_label_class : C_PAUSE_LABEL,
        console_button_class   : C_BUTTON,
        console_clear_class    : C_CLEAR,
        console_title_class    : C_CONSOLE_TITLE
    },

    /**
     * Markup template used to generate the DOM structure for the header
     * section of the Console when it is rendered.  The template includes
     * these {placeholder}s:
     *
     * <ul>
     *   <li>console_hd_class - contributed by Console.CHROME_CLASSES</li>
     *   <li>console_title_class - contributed by Console.CHROME_CLASSES</li>
     *   <li>str_title - pulled from attribute strings.title</li>
     * </ul>
     *
     * @property Console.HEADER_TEMPLATE
     * @type String
     * @static
     */
    HEADER_TEMPLATE :
        '<div class="{console_hd_class}">'+
            '<h4 class="{console_title_class}">{str_title}</h4>'+
        '</div>',

    /**
     * Markup template used to generate the DOM structure for the Console body
     * (where the messages are inserted) when it is rendered.  The template
     * includes only the {placeholder} &quot;console_bd_class&quot;, which is
     * constributed by Console.CHROME_CLASSES.
     *
     * @property Console.BODY_TEMPLATE
     * @type String
     * @static
     */
    BODY_TEMPLATE : '<div class="{console_bd_class}"></div>',

    /**
     * Markup template used to generate the DOM structure for the footer
     * section of the Console when it is rendered.  The template includes
     * many of the {placeholder}s from Console.CHROME_CLASSES as well as:
     *
     * <ul>
     *   <li>id_guid - generated unique id, relates the label and checkbox</li>
     *   <li>str_pause - pulled from attribute strings.pause</li>
     *   <li>str_clear - pulled from attribute strings.clear</li>
     * </ul>
     *
     * @property Console.HEADER_TEMPLATE
     * @type String
     * @static
     */
    FOOTER_TEMPLATE :
        '<div class="{console_ft_class}">'+
            '<div class="{console_controls_class}">'+
                '<input type="checkbox" class="{console_checkbox_class} '+
                        '{console_pause_class}" value="1" id="{id_guid}"> '+
                '<label for="{id_guid}" class="{console_pause_label_class}">'+
                    '{str_pause}</label>' +
                '<input type="button" class="'+
                    '{console_button_class} {console_clear_class}" '+
                    'value="{str_clear}">'+
            '</div>'+
        '</div>',

    /**
     * Default markup template used to create the DOM structure for Console
     * entries. The markup contains {placeholder}s for content and classes
     * that are replaced via Y.substitute.  The default template contains
     * the {placeholder}s identified in Console.ENTRY_CLASSES as well as the
     * following placeholders that will be populated by the log entry data:
     *
     * <ul>
     *   <li>cat_class</li>
     *   <li>src_class</li>
     *   <li>label</li>
     *   <li>totalTime</li>
     *   <li>elapsedTime</li>
     *   <li>localTime</li>
     *   <li>sourceAndDetail</li>
     *   <li>message</li>
     * </ul>
     *
     * @property Console.ENTRY_TEMPLATE
     * @type String
     * @static
     */
    ENTRY_TEMPLATE :
        '<pre class="{entry_class} {cat_class} {src_class}">'+
            '<div class="{entry_meta_class}">'+
                '<p>'+
                    '<span class="{entry_cat_class}">'+
                        '{label}</span>'+
                    '<span class="{entry_time_class}">'+
                        ' {totalTime}ms (+{elapsedTime}) {localTime}:'+
                    '</span>'+
                '</p>'+
                '<p class="{entry_src_class}">'+
                    '{sourceAndDetail}'+
                '</p>'+
            '</div>'+
            '<p class="{entry_content_class}">{message}</p>'+
        '</pre>',

    /**
     * Static property used to define the default attribute configuration of
     * the Widget.
     *
     * @property Console.ATTRS
     * @Type Object
     * @static
     */
    ATTRS : {

        /**
         * Name of the custom event that will communicate log messages.
         *
         * @attribute logEvent
         * @type String
         * @default "yui:log"
         */
        logEvent : {
            value : 'yui:log',
            writeOnce : true,
            validator : isString
        },

        /**
         * Collection of strings used to label elements in the Console UI.
         * Default collection contains the following name:value pairs:
         *
         * <ul>
         *   <li>title : &quot;Log Console&quot;</li>
         *   <li>pause : &quot;Pause&quot;</li>
         *   <li>clear : &quot;Clear&quot;</li>
         * </ul>
         *
         * @attribute strings
         * @type Object
         */
        strings : {
            value : {
                title : "Log Console",
                pause : "Pause",
                clear : "Clear"
            }
        },

        /**
         * Boolean to pause the outputting of new messages to the console.
         * When paused, messages will accumulate in the buffer.
         *
         * @attribute paused
         * @type boolean
         * @default false
         */
        paused : {
            value : false,
            validator : L.isBoolean
        },

        /**
         * If a category is not specified in the Y.log(..) statement, this
         * category will be used. Category is also called &quot;log level&quot;.
         *
         * @attribute defaultCategory
         * @type String
         * @default "info"
         */
        defaultCategory : {
            value : INFO,
            validator : isString
        },

        /**
         * If a source is not specified in the Y.log(..) statement, this
         * source will be used.
         *
         * @attribute defaultSource
         * @type String
         * @default "global"
         */
        defaultSource   : {
            value : 'global',
            validator : isString
        },

        /**
         * Markup template used to create the DOM structure for Console entries.
         *
         * @attribute entryTemplate
         * @type String
         * @default (see Console.ENTRY_TEMPLATE)
         */
        entryTemplate : {
            value : '',
            validator : isString
        },

        /**
         * Minimum entry log level to render into the Console.  The initial
         * logLevel value for all Console instances defaults from the
         * Y.config.logLevel YUI configuration, or Console.LOG_LEVEL_INFO if
         * that configuration is not set.
         *
         * Possible values are &quot;info&quot;, &quot;warn&quot;,
         * &quot;error&quot; (case insensitive), or the corresponding statics
         * Console.LOG_LEVEL_INFO and so on.
         *
         * @attribute logLevel
         * @type String|Number
         * @default Y.config.logLevel or Console.LOG_LEVEL_INFO
         */
        logLevel : {
            value : Y.config.logLevel,
            validator : function (v) {
                return this._validateNewLogLevel(v);
            },
            set : function (v) {
                return this._setLogLevel(v);
            }
        },

        /**
         * Millisecond timeout to maintain before emptying buffer of Console
         * entries to the UI.
         *
         * @attribute printTimeout
         * @type Number
         * @default 100
         */
        printTimeout : {
            value : 100,
            validator : isNumber
        },

        /**
         * Maximum number of Console entries allowed in the Console body at one
         * time.  This is used to keep acquired messages from exploding the
         * DOM tree and impacting page performance.
         *
         * @attribute consoleLimit
         * @type Number
         * @default 500
         */
        consoleLimit : {
            value : 500,
            validator : isNumber
        },

        /**
         * New entries should display at the top of the Console or the bottom?
         *
         * @attribute newestOnTop
         * @type Boolean
         * @default true
         */
        newestOnTop : {
            value : true
        },

        /**
         * When new entries are added to the Console UI, should they be
         * scrolled into view?
         *
         * @attribute scrollIntoView
         * @type Boolean
         * @default true
         */
        scrollIntoView : {
            value : true
        },

        /**
         * The baseline time for this Console instance, used to measure elapsed
         * time from the moment the console module is <code>use</code>d to the
         * moment each new entry is logged (not rendered).
         *
         * This value is reset by the instance method myConsole.reset().
         *
         * @attribute startTime
         * @type Date
         * @default The moment the console module is <code>use</code>d
         */
        startTime : {
            value : new Date()
        },

        /**
         * The precise time the last entry was logged.  Used to measure elapsed
         * time between log messages.
         *
         * @attribute lastTime
         * @type Date
         * @default The moment the console module is <code>use</code>d
         */
        lastTime : {
            value : new Date(),
            readOnly: true
        }

    }

});

Y.extend(Console,Y.Widget,{

    /**
     * Reference to the Node instance containing the head contents.
     *
     * @property _head
     * @type Node
     * @default null
     * @protected
     */
    _head    : null,

    /**
     * Reference to the Node instance that will house the console messages.
     *
     * @property _body
     * @type Node
     * @default null
     * @protected
     */
    _body    : null,

    /**
     * Reference to the Node instance containing the footer contents.
     *
     * @property _head
     * @type Node
     * @default null
     * @protected
     */
    _foot    : null,

    /**
     * Object API returned from <code>Y.later</code>. Holds the timer id
     * returned by <code>setTimout</code> for scheduling of buffered messages.
     *
     * @property _timeout
     * @type Object
     * @default null
     * @protected
     */
    _timeout : null,

    /**
     * Array of normalized message objects awaiting printing.
     *
     * @property buffer
     * @type Array
     * @default null
     */
    buffer   : null,

    /**
     * Wrapper for <code>Y.log</code>.
     *
     * @method log
     * @param {Any*} * (all arguments passed through to <code>Y.log</code>)
     */
    log : function () {
        return Y.log.apply(Y,arguments);
    },

    /**
     * Clear the console of messages and flush the buffer of pending messages.
     *
     * @method clearConsole
     * @chainable
     */
    clearConsole : function () {
        // TODO: clear event listeners from console contents
        this._body.set(INNER_HTML,'');

        this._clearTimeout();

        this.buffer = [];

        return this;
    },

    /**
     * Clears the console and resets internal timers.
     *
     * @method reset
     * @chainable
     */
    reset : function () {
        this.fire(RESET);
        
        return this;
    },

    /**
     * Outputs all buffered messages to the console UI.
     * 
     * @method printBuffer
     * @chainable
     */
    printBuffer: function () {
        if (!this.get(PAUSED) && this.get('rendered')) {

            this._clearTimeout();

            var messages = this.buffer,
                i,len;

            this.buffer = [];

            // TODO: use doc frag
            for (i = 0, len = messages.length; i < len; ++i) {
                this.printLogEntry(messages[i]);
            }

            this._trimOldEntries();
        }

        return this;
    },

    /**
     * Prints the provided message to the console UI.
     *
     * @method printLogEntry
     * @param m {Object} Normalized message object
     * @chainable
     */
    printLogEntry : function (m) {
        m = merge(
                this._htmlEscapeMessage(m),
                Console.ENTRY_CLASSES,
                {
                    cat_class : this.getClassName(ENTRY,m.category),
                    src_class : this.getClassName(ENTRY,m.source)
                });

        var n = create(substitute(this.get('entryTemplate'),m));

        this._addToConsole(n);

        return this;
    },

    
    /**
     * Constructor code.  Set up the buffer and entry template, publish
     * internal events, and subscribe to the configured logEvent.
     * 
     * @method initializer
     * @protected
     */
    initializer : function () {
        this.buffer    = [];

        if (!this.get(ENTRY_TEMPLATE)) {
            this.set(ENTRY_TEMPLATE,Console.ENTRY_TEMPLATE);
        }

        Y.on(this.get('logEvent'),Y.bind(this._onLogEvent,this));

        /**
         * Triggers the processing of an incoming message via the default logic
         * in _defEntryFn.
         *
         * @event entry
         * @param event {Event.Facade} An Event Facade object with the following attribute specific properties added:
         *  <dl>
         *      <dt>message</dt>
         *          <dd>The message data normalized into an object literal (see _normalizeMessage)</dd>
         *  </dl>
         * @preventable _defEntryFn
         */
        this.publish(ENTRY, { defaultFn: this._defEntryFn });

        /**
         * Triggers the reset behavior via the default logic in _defResetFn.
         *
         * @event reset
         * @param event {Event.Facade} Event Facade object
         * @preventable _defResetFn
         */
        this.publish(RESET, { defaultFn: this._defResetFn });
    },

    /**
     * Generate the Console UI.
     *
     * @method renderUI
     * @protected
     */
    renderUI : function () {
        this._initHead();
        this._initConsole();
        this._initFoot();
    },

    /**
     * Sync the UI state to the current attribute state.
     *
     * @method syncUI
     */
    syncUI : function () {
        this.set(PAUSED,this.get(PAUSED));
    },

    /**
     * Set up event listeners to wire up the UI to the internal state.
     *
     * @method bindUI
     * @protected
     */
    bindUI : function () {
        this.get(CONTENT_BOX).query('input[type=checkbox].'+C_PAUSE).
            on(CLICK,this._onPauseClick,this);

        this.get(CONTENT_BOX).query('input[type=button].'+C_CLEAR).
            on(CLICK,this._onClearClick,this);
        
        // Attribute changes
        this.after('stringsChange',       this._afterStringsChange);
        this.after('pausedChange',        this._afterPausedChange);
        this.after('consoleLimitChange',  this._afterConsoleLimitChange);
    },

    
    /**
     * Create the DOM structure for the header elements.
     *
     * @method _initHead
     * @protected
     */
    _initHead : function () {
        var cb   = this.get(CONTENT_BOX),
            info = merge(Console.CHROME_CLASSES, {
                        str_title : this.get('strings.title')
                    });

        this._head = create(substitute(Console.HEADER_TEMPLATE,info));

        cb.insertBefore(this._head,cb.get('firstChild'));
    },

    /**
     * Create the DOM structure for the console body&#8212;where messages are
     * rendered.
     *
     * @method _initConsole
     * @protected
     */
    _initConsole : function () {
        this._body = create(substitute(
                            Console.BODY_TEMPLATE,
                            Console.CHROME_CLASSES));

        this.get(CONTENT_BOX).appendChild(this._body);
    },

    /**
     * Create the DOM structure for the footer elements.
     *
     * @method _initFoot
     * @protected
     */
    _initFoot : function () {
        var info = merge(Console.CHROME_CLASSES, {
                id_guid   : Y.guid(),
                str_pause : this.get('strings.pause'),
                str_clear : this.get('strings.clear')
            });

        this._foot = create(substitute(Console.FOOTER_TEMPLATE,info));

        this.get(CONTENT_BOX).appendChild(this._foot);
    },

    /**
     * Determine if incoming log messages are within the configured logLevel
     * to be buffered for printing.
     *
     * @method _isInLogLevel
     * @protected
     */
    _isInLogLevel : function (msg,cat) {
        var lvl = this.get('logLevel'),
            mlvl = cat === ERROR ? Console.LOG_LEVEL_ERROR :
                    cat === WARN ? Console.LOG_LEVEL_WARN  :
                                   Console.LOG_LEVEL_INFO;

        return lvl >= mlvl;
    },

    /**
     * Create a log entry message from the inputs including the following keys:
     * <ul>
     *     <li>time - this moment</li>
     *     <li>message - leg message</li>
     *     <li>category - aka logLevel</li>
     *     <li>source - when provided, the widget or util calling Y.log</li>
     *     <li>sourceAndDetail - same as source but can include instance info</li>
     *     <li>label - logLevel/category label for the entry</li>
     *     <li>localTime - readable version of time</li>
     *     <li>elapsedTime - ms since last entry</li>
     *     <li>totalTime - ms since Console was instantiated or reset</li>
     * </ul>
     *
     * @mehod _normalizeMessage
     * @param msg {String} the log message
     * @param cat {String} OPTIONAL the category or logLevel of the message
     * @param src {String} OPTIONAL the source widget or util of the message
     * @return Object the message object
     * @protected
     */
    _normalizeMessage : function (msg,cat,src) {
        var m = {
            time            : new Date(),
            message         : msg,
            category        : cat || this.get('defaultCategory'),
            sourceAndDetail : src || this.get('defaultSource'),
            source          : null,
            label           : null,
            localTime       : null,
            elapsedTime     : null,
            totalTime       : null
        };

        // Extract m.source "Foo" from m.sourceAndDetail "Foo bar baz"
        m.source          = RE_INLINE_SOURCE.test(m.sourceAndDetail) ?
                                RegExp.$1 : m.sourceAndDetail;
        m.label           = m.category;
        m.localTime       = m.time.toLocaleTimeString ? 
                            m.time.toLocaleTimeString() : (m.time + '');
        m.elapsedTime     = m.time - this.get(LAST_TIME);
        m.totalTime       = m.time - this.get(START_TIME);

        this._set(LAST_TIME,m.time);

        return m;
    },

    /**
     * Sets a timeout for buffered messages to be output to the console.
     *
     * @method _schedulePrint
     * @protected
     */
    _schedulePrint : function () {
        if (!this.get(PAUSED) && !this._timeout) {
            this._timeout = Y.later(
                                this.get('printTimeout'),
                                this,this.printBuffer);
        }
    },

    /**
     * Inserts a Node into the console body at the top or bottom depending on
     * the configuration value of newestOnTop.
     *
     * @method _addToConsole
     * @param node {Node} the node to insert into the console body
     * @protected
     */
    _addToConsole : function (node) {
        var toTop = this.get('newestOnTop'),
            bd    = this._body,
            scrollTop;

        bd.insertBefore(node,toTop ? bd.get('firstChild') : null);

        if (this.get('scrollIntoView')) {
            scrollTop = toTop ? 0 : bd.get('scrollHeight');

            bd.set('scrollTop', scrollTop);
        }
    },

    /**
     * Performs HTML escaping on strings in the message object.
     *
     * @method _htmlEscapeMessage
     * @param m {Object} the normalized message object
     * @return Object a clone of the message object with proper escapement
     * @protected
     */
    _htmlEscapeMessage : function (m) {
        m = Y.clone(m);
        m.message         = this._encodeHTML(m.message);
        m.label           = this._encodeHTML(m.label);
        m.source          = this._encodeHTML(m.source);
        m.sourceAndDetail = this._encodeHTML(m.sourceAndDetail);
        m.category        = this._encodeHTML(m.category);

        return m;
    },

    /**
     * Removes the oldest message entries from the UI to maintain the limit
     * specified in the consoleLimit configuration.
     *
     * @method _trimOldEntries
     * @protected
     */
    _trimOldEntries : function () {
        var bd = this._body;

        if (bd) {
            var entries = bd.queryAll(DOT+C_ENTRY),
                i = entries ? entries.size() - this.get('consoleLimit') : 0;

            if (i > 0) {
                if (this.get('newestOnTop')) {
                    for (var l = entries.size(); i<l; i++) {
                        bd.removeChild(entries.item(i));
                    }
                } else {
                    for (;i>=0;--i) {
                        bd.removeChild(entries.item(i));
                    }
                }
            }
        }
    },

    /**
     * Returns the input string with ampersands (&amp;), &lt, and &gt; encoded
     * as HTML entities.
     *
     * @method _encodeHTML
     * @param s {String} the raw string
     * @return String the encoded string
     * @protected
     */
    _encodeHTML : function (s) {
        return isString(s) ?
            s.replace(RE_AMP,ESC_AMP).
              replace(RE_LT, ESC_LT).
              replace(RE_GT, ESC_GT) :
            s;
    },

    /**
     * Clears the timeout for printing buffered messages.
     *
     * @method _clearTimeout
     * @protected
     */
    _clearTimeout : function () {
        if (this._timeout) {
            this._timeout.cancel();
            this._timeout = null;
        }
    },

    /**
     * Event handler for clicking on the Pause checkbox to update the paused
     * attribute.
     *
     * @method _onPauseClick
     * @param e {Event} DOM event facade for the click event
     * @protected
     */
    _onPauseClick : function (e) {
        var paused = e.target.get(CHECKED);

        this.set(PAUSED,paused,{ src: Y.Widget.UI_SRC });
    },

    /**
     * Event handler for clicking on the Clear button.  Pass-through to
     * <code>this.clearConsole()</code>.
     *
     * @method _onClearClick
     * @param e {Event} DOM event facade for the click event
     * @protected
     */
    _onClearClick : function (e) {
        this.clearConsole();
    },


    /**
     * Setter method for logLevel attribute.  Acceptable values are
     * &quot;error&quot, &quot;warn&quot, &quot;info&quot, and
     * Y.Console.LOG_LEVEL_ERROR, Y.Console.LOG_LEVEL_WARN, 
     * Y.Console.LOG_LEVEL_INFO.  Any other value becomes
     * Y.Console.LOG_LEVEL_INFO.
     *
     * @method _setLogLevel
     * @param v {String|Number} String or numeric alias for the desired logLevel
     * @return Number LOG_LEVEL_ERROR, _WARN, or _INFO
     * @protected
     */
    _setLogLevel : function (v) {
        if (isString(v)) {
            v = v.toLowerCase();
            v = v === ERROR ?
                        Console.LOG_LEVEL_ERROR :
                        v === WARN ?
                            Console.LOG_LEVEL_WARN :
                            Console.LOG_LEVEL_INFO;
        } else if (!isNumber(v)) {
            v = Console.LOG_LEVEL_INFO;
        }

        return v;
    },

    /**
     * Verifies input logLevel is one of Y.Console.LOG_LEVEL_ERROR,
     * Y.Console.LOG_LEVEL_WARN, or Y.Console.LOG_LEVEL_INFO.
     *
     * @method _validateNewLogLevel
     * @param v {Number} requested logLevel
     * @return Boolean
     * @protected
     */
    _validateNewLogLevel : function (v) {
        return v === Console.LOG_LEVEL_INFO ||
               v === Console.LOG_LEVEL_WARN ||
               v === Console.LOG_LEVEL_ERROR;
    },

    /**
     * Updates the UI if changes are made to any of the strings in the strings
     * attribute.
     *
     * @method _afterStringsChange
     * @param e {Event} Custom event for the attribute change
     * @protected
     */
    _afterStringsChange : function (e) {
        var prop   = e.subAttrName ? e.subAttrName.split(DOT)[1] : null,
            cb     = this.get(CONTENT_BOX),
            before = e.prevVal,
            after  = e.newVal,
            el;

        if ((!prop || prop === TITLE) && before.title !== after.title) {
            el = cb.query(DOT+C_CONSOLE_TITLE);
            if (el) {
                el.set(INNER_HTML,after.title);
            }
        }

        if ((!prop || prop === PAUSE) && before.pause !== after.pause) {
            el = cb.query(DOT+C_PAUSE_LABEL);
            if (el) {
                el.set(INNER_HTML,after.pause);
            }
        }

        if ((!prop || prop === CLEAR) && before.clear !== after.clear) {
            el = cb.query(DOT+C_CLEAR);
            if (el) {
                el.set('value',after.clear);
            }
        }
    },

    /**
     * Updates the UI and schedules or cancels the scheduled buffer printing
     * operation.
     *
     * @method _afterPausedChange
     * @param e {Event} Custom event for the attribute change
     * @protected
     */
    _afterPausedChange : function (e) {
        var paused = e.newVal;

        if (e.src !== Y.Widget.SRC_UI) {
            var node = this._foot.queryAll('input[type=checkbox].'+C_PAUSE);
            if (node) {
                node.set(CHECKED,paused);
            }
        }

        if (!paused) {
            this._schedulePrint();
        } else if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
    },

    /**
     * Calls this._trimOldEntries() in response to changes in the configured
     * consoleLimit attribute.
     * 
     * @method _afterConsoleLimitChange
     * @param e {Event} Custom event for the attribute change
     * @protected
     */
    _afterConsoleLimitChange : function () {
        this._trimOldEntries();
    },


    /**
     * Responds to log events by normalizing qualifying messages and passing
     * them along through the entry event for buffering etc.
     * 
     * @method _onLogEvent
     * @param msg {String} the log message
     * @param cat {String} OPTIONAL the category or logLevel of the message
     * @param src {String} OPTIONAL the source of the message (e.g. widget name)
     * @protected
     */
    _onLogEvent : function (msg,cat,src) {

        if (!this.get(DISABLED) && this._isInLogLevel(msg,cat,src)) {

            /* TODO: needed? */
            var debug = Y.config.debug;
            Y.config.debug = false;

            this.fire(ENTRY, {
                message : this._normalizeMessage.apply(this,arguments)
            });

            Y.config.debug = debug;
        }
    },

    /**
     * Clears the console, resets the startTime attribute, enables and
     * unpauses the widget.
     *
     * @method _defResetFn
     * @protected
     */
    _defResetFn : function () {
        this.clearConsole();
        this.set(START_TIME,new Date());
        this.set(DISABLED,false);
        this.set(PAUSED,false);
    },

    /**
     * Buffers incoming message objects and schedules the printing.
     *
     * @method _defEntryFn
     * @param e {Event} The Custom event carrying the message in its payload
     * @protected
     */
    _defEntryFn : function (e) {
        if (e.message) {
            this.buffer.push(e.message);
            this._schedulePrint();
        }
    }

});

Y.Console = Console;


}, '@VERSION@' ,{requires:['substitute','widget']});
