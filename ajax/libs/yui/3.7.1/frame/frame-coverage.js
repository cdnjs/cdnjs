if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/frame/frame.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/frame/frame.js",
    code: []
};
_yuitest_coverage["build/frame/frame.js"].code=["YUI.add('frame', function (Y, NAME) {","","","    /**","     * Creates a wrapper around an iframe. It loads the content either from a local","     * file or from script and creates a local YUI instance bound to that new window and document.","     * @class Frame","     * @for Frame","     * @extends Base","     * @constructor","     * @module editor","     * @submodule frame","     */","","    var Frame = function() {","        Frame.superclass.constructor.apply(this, arguments);","    }, LAST_CHILD = ':last-child', BODY = 'body';","    ","","    Y.extend(Frame, Y.Base, {","        /**","        * @private","        * @property _ready","        * @description Internal reference set when the content is ready.","        * @type Boolean","        */","        _ready: null,","        /**","        * @private","        * @property _rendered","        * @description Internal reference set when render is called.","        * @type Boolean","        */","        _rendered: null,","        /**","        * @private","        * @property _iframe","        * @description Internal Node reference to the iFrame or the window","        * @type Node","        */","        _iframe: null,","        /**","        * @private","        * @property _instance","        * @description Internal reference to the YUI instance bound to the iFrame or window","        * @type YUI","        */","        _instance: null,","        /**","        * @private","        * @method _create","        * @description Create the iframe or Window and get references to the Document & Window","        * @return {Object} Hash table containing references to the new Document & Window","        */","        _create: function(cb) {","            var win, doc, res, node, html = '',","                extra_css = ((this.get('extracss')) ? '<style id=\"extra_css\">' + this.get('extracss') + '</style>' : '');","            ","            this._iframe = Y.Node.create(Frame.HTML);","            this._iframe.setStyle('visibility', 'hidden');","            this._iframe.set('src', this.get('src'));","            this.get('container').append(this._iframe);","","            //if the src attr is different than the default, don't create the document","            var create = (this.get('src') === Frame.ATTRS.src.value);","","            this._iframe.set('height', '99%');","","            if (create) {","                html = Y.Lang.sub(Frame.PAGE_HTML, {","                    DIR: this.get('dir'),","                    LANG: this.get('lang'),","                    TITLE: this.get('title'),","                    META: Frame.META,","                    LINKED_CSS: this.get('linkedcss'),","                    CONTENT: this.get('content'),","                    BASE_HREF: this.get('basehref'),","                    DEFAULT_CSS: Frame.DEFAULT_CSS,","                    EXTRA_CSS: extra_css","                });","                if (Y.config.doc.compatMode != 'BackCompat') {","                    ","                    //html = Frame.DOC_TYPE + \"\\n\" + html;","                    html = Frame.getDocType() + \"\\n\" + html;","                } else {","                }","","            }","","            res = this._resolveWinDoc();","","            if (html) {","                res.doc.open();","                res.doc.write(html);","                res.doc.close();","            }","","            if (!res.doc.documentElement) {","                var timer = Y.later(1, this, function() {","                    if (res.doc && res.doc.documentElement) {","                        cb(res);","                        timer.cancel();","                    }","                }, null, true);","            } else {","                cb(res);","            }","","        },","        /**","        * @private","        * @method _resolveWinDoc","        * @description Resolves the document and window from an iframe or window instance","        * @param {Object} c The YUI Config to add the window and document to","        * @return {Object} Object hash of window and document references, if a YUI config was passed, it is returned.","        */","        _resolveWinDoc: function(c) {","            var config = (c) ? c : {};","            config.win = Y.Node.getDOMNode(this._iframe.get('contentWindow'));","            config.doc = Y.Node.getDOMNode(this._iframe.get('contentWindow.document'));","            if (!config.doc) {","                config.doc = Y.config.doc;","            }","            if (!config.win) {","                config.win = Y.config.win;","            }","            return config;","        },","        /**","        * @private","        * @method _onDomEvent","        * @description Generic handler for all DOM events fired by the iframe or window. This handler","        * takes the current EventFacade and augments it to fire on the Frame host. It adds two new properties","        * to the EventFacade called frameX and frameY which adds the scroll and xy position of the iframe","        * to the original pageX and pageY of the event so external nodes can be positioned over the frame.","        * @param {Event.Facade} e","        */","        _onDomEvent: function(e) {","            var xy, node;","            ","            if (!Y.Node.getDOMNode(this._iframe)) {","                //The iframe is null for some reason, bail on sending events.","                return;","            }","","            e.frameX = e.frameY = 0;","","            if (e.pageX > 0 || e.pageY > 0) {","                if (e.type.substring(0, 3) !== 'key') {","                    node = this._instance.one('win');","                    xy = this._iframe.getXY();","                    e.frameX = xy[0] + e.pageX - node.get('scrollLeft');","                    e.frameY = xy[1] + e.pageY - node.get('scrollTop');","                }","            }","","            e.frameTarget = e.target;","            e.frameCurrentTarget = e.currentTarget;","            e.frameEvent = e;","","            this.fire('dom:' + e.type, e);","        },","        initializer: function() {","            this.publish('ready', {","                emitFacade: true,","                defaultFn: this._defReadyFn","            });","        },","        destructor: function() {","            var inst = this.getInstance();","","            inst.one('doc').detachAll();","            inst = null;","            this._iframe.remove();","        },","        /**","        * @private","        * @method _DOMPaste","        * @description Simple pass thru handler for the paste event so we can do content cleanup","        * @param {Event.Facade} e","        */","        _DOMPaste: function(e) {","            var inst = this.getInstance(),","                data = '', win = inst.config.win;","","            if (e._event.originalTarget) {","                data = e._event.originalTarget;","            }","            if (e._event.clipboardData) {","                data = e._event.clipboardData.getData('Text');","            }","            ","            if (win.clipboardData) {","                data = win.clipboardData.getData('Text');","                if (data === '') { // Could be empty, or failed","                    // Verify failure","                    if (!win.clipboardData.setData('Text', data)) {","                        data = null;","                    }","                }","            }","            ","","            e.frameTarget = e.target;","            e.frameCurrentTarget = e.currentTarget;","            e.frameEvent = e;","            ","            if (data) {","                e.clipboardData = {","                    data: data,","                    getData: function() {","                        return data;","                    }","                };","            } else {","                e.clipboardData = null;","            }","","            this.fire('dom:paste', e);","        },","        /**","        * @private","        * @method _defReadyFn","        * @description Binds DOM events, sets the iframe to visible and fires the ready event","        */","        _defReadyFn: function() {","            var inst = this.getInstance();","","            Y.each(Frame.DOM_EVENTS, function(v, k) {","                var fn = Y.bind(this._onDomEvent, this),","                    kfn = ((Y.UA.ie && Frame.THROTTLE_TIME > 0) ? Y.throttle(fn, Frame.THROTTLE_TIME) : fn);","","                if (!inst.Node.DOM_EVENTS[k]) {","                    inst.Node.DOM_EVENTS[k] = 1;","                }","                if (v === 1) {","                    if (k !== 'focus' && k !== 'blur' && k !== 'paste') {","                        if (k.substring(0, 3) === 'key') {","                            //Throttle key events in IE","                            inst.on(k, kfn, inst.config.doc);","                        } else {","                            inst.on(k, fn, inst.config.doc);","                        }","                    }","                }","            }, this);","","            inst.Node.DOM_EVENTS.paste = 1;","            ","            inst.on('paste', Y.bind(this._DOMPaste, this), inst.one('body'));","","            //Adding focus/blur to the window object","            inst.on('focus', Y.bind(this._onDomEvent, this), inst.config.win);","            inst.on('blur', Y.bind(this._onDomEvent, this), inst.config.win);","","            inst.__use = inst.use;","            inst.use = Y.bind(this.use, this);","            this._iframe.setStyles({","                visibility: 'inherit'","            });","            inst.one('body').setStyle('display', 'block');","            if (Y.UA.ie) {","                //this._fixIECursors();","            }","        },","        /**","        * It appears that having a BR tag anywhere in the source \"below\" a table with a percentage width (in IE 7 & 8)","        * if there is any TEXTINPUT's outside the iframe, the cursor will rapidly flickr and the CPU would occasionally ","        * spike. This method finds all <BR>'s below the sourceIndex of the first table. Does some checks to see if they","        * can be modified and replaces then with a <WBR> so the layout will remain in tact, but the flickering will","        * no longer happen.","        * @method _fixIECursors","        * @private","        */","        _fixIECursors: function() {","            var inst = this.getInstance(),","                tables = inst.all('table'),","                brs = inst.all('br'), si;","","            if (tables.size() && brs.size()) {","                //First Table","                si = tables.item(0).get('sourceIndex');","                brs.each(function(n) {","                    var p = n.get('parentNode'),","                        c = p.get('children'), b = p.all('>br');","                    ","                    if (p.test('div')) {","                        if (c.size() > 2) {","                            n.replace(inst.Node.create('<wbr>'));","                        } else {","                            if (n.get('sourceIndex') > si) {","                                if (b.size()) {","                                    n.replace(inst.Node.create('<wbr>'));","                                }","                            } else {","                                if (b.size() > 1) {","                                    n.replace(inst.Node.create('<wbr>'));","                                }","                            }","                        }","                    }","                    ","                });","            }","        },","        /**","        * @private","        * @method _onContentReady","        * @description Called once the content is available in the frame/window and calls the final use call","        * on the internal instance so that the modules are loaded properly.","        */","        _onContentReady: function(e) {","            if (!this._ready) {","                this._ready = true;","                var inst = this.getInstance(),","                    args = Y.clone(this.get('use'));","                ","                this.fire('contentready');","","                if (e) {","                    inst.config.doc = Y.Node.getDOMNode(e.target);","                }","                //TODO Circle around and deal with CSS loading...","                args.push(Y.bind(function() {","                    if (inst.EditorSelection) {","                        inst.EditorSelection.DEFAULT_BLOCK_TAG = this.get('defaultblock');","                    }","                    //Moved to here so that the iframe is ready before allowing editing..","                    if (this.get('designMode')) {","                        if(Y.UA.ie) {","                            inst.config.doc.body.contentEditable = 'true';","                            this._ieSetBodyHeight();","                            inst.on('keyup', Y.bind(this._ieSetBodyHeight, this), inst.config.doc);","                        } else {","                            inst.config.doc.designMode = 'on';","                        }","                    }","                    this.fire('ready');","                }, this));","                inst.use.apply(inst, args);","","                inst.one('doc').get('documentElement').addClass('yui-js-enabled');","            }","        },","        _ieHeightCounter: null,","        /**","        * Internal method to set the height of the body to the height of the document in IE.","        * With contenteditable being set, the document becomes unresponsive to clicks, this ","        * method expands the body to be the height of the document so that doesn't happen.","        * @private","        * @method _ieSetBodyHeight","        */","        _ieSetBodyHeight: function(e) {","            if (!this._ieHeightCounter) {","                this._ieHeightCounter = 0;","            }","            this._ieHeightCounter++;","            var run = false;","            if (!e) {","                run = true;","            }","            if (e) {","                switch (e.keyCode) {","                    case 8:","                    case 13:","                        run = true;","                        break;","                }","                if (e.ctrlKey || e.shiftKey) {","                    run = true;","                }","            }","            if (run) {","                try {","                    var inst = this.getInstance();","                    var h = this._iframe.get('offsetHeight');","                    var bh = inst.config.doc.body.scrollHeight;","                    if (h > bh) {","                        h = (h - 15) + 'px';","                        inst.config.doc.body.style.height = h;","                    } else {","                        inst.config.doc.body.style.height = 'auto';","                    }","                } catch (e) {","                    if (this._ieHeightCounter < 100) {","                        Y.later(200, this, this._ieSetBodyHeight);","                    } else {","                    }","                }","            }","        },","        /**","        * @private","        * @method _resolveBaseHref","        * @description Resolves the basehref of the page the frame is created on. Only applies to dynamic content.","        * @param {String} href The new value to use, if empty it will be resolved from the current url.","        * @return {String}","        */","        _resolveBaseHref: function(href) {","            if (!href || href === '') {","                href = Y.config.doc.location.href;","                if (href.indexOf('?') !== -1) { //Remove the query string","                    href = href.substring(0, href.indexOf('?'));","                }","                href = href.substring(0, href.lastIndexOf('/')) + '/';","            }","            return href;","        },","        /**","        * @private","        * @method _getHTML","        * @description Get the content from the iframe","        * @param {String} html The raw HTML from the body of the iframe.","        * @return {String}","        */","        _getHTML: function(html) {","            if (this._ready) {","                var inst = this.getInstance();","                html = inst.one('body').get('innerHTML');","            }","            return html;","        },","        /**","        * @private","        * @method _setHTML","        * @description Set the content of the iframe","        * @param {String} html The raw HTML to set the body of the iframe to.","        * @return {String}","        */","        _setHTML: function(html) {","            if (this._ready) {","                var inst = this.getInstance();","                inst.one('body').set('innerHTML', html);","            } else {","                //This needs to be wrapped in a contentready callback for the !_ready state","                this.on('contentready', Y.bind(function(html, e) {","                    var inst = this.getInstance();","                    inst.one('body').set('innerHTML', html);","                }, this, html));","            }","            return html;","        },","        /**","        * @private","        * @method _setLinkedCSS","        * @description Set's the linked CSS on the instance..","        */","        _getLinkedCSS: function(urls) {","            if (!Y.Lang.isArray(urls)) {","                urls = [urls];","            }","            var str = '';","            if (!this._ready) {","                Y.each(urls, function(v) {","                    if (v !== '') {","                        str += '<link rel=\"stylesheet\" href=\"' + v + '\" type=\"text/css\">';","                    }","                });","            } else {","                str = urls;","            }","            return str;","        },","        /**","        * @private","        * @method _setLinkedCSS","        * @description Set's the linked CSS on the instance..","        */","        _setLinkedCSS: function(css) {","            if (this._ready) {","                var inst = this.getInstance();","                inst.Get.css(css);","            }","            return css;","        },","        /**","        * @private","        * @method _setExtraCSS","        * @description Set's the extra CSS on the instance..","        */","        _setExtraCSS: function(css) {","            if (this._ready) {","                var inst = this.getInstance(),","                    node = inst.one('#extra_css');","                ","                node.remove();","                inst.one('head').append('<style id=\"extra_css\">' + css + '</style>');","            }","            return css;","        },","        /**","        * @private","        * @method _instanceLoaded","        * @description Called from the first YUI instance that sets up the internal instance.","        * This loads the content into the window/frame and attaches the contentready event.","        * @param {YUI} inst The internal YUI instance bound to the frame/window","        */","        _instanceLoaded: function(inst) {","            this._instance = inst;","            this._onContentReady();","            ","            var doc = this._instance.config.doc;","","            if (this.get('designMode')) {","                if (!Y.UA.ie) {","                    try {","                        //Force other browsers into non CSS styling","                        doc.execCommand('styleWithCSS', false, false);","                        doc.execCommand('insertbronreturn', false, false);","                    } catch (err) {}","                }","            }","        },","        //BEGIN PUBLIC METHODS","        /**","        * @method use","        * @description This is a scoped version of the normal YUI.use method & is bound to this frame/window.","        * At setup, the inst.use method is mapped to this method.","        */","        use: function() {","            var inst = this.getInstance(),","                args = Y.Array(arguments),","                cb = false;","","            if (Y.Lang.isFunction(args[args.length - 1])) {","                cb = args.pop();","            }","            if (cb) {","                args.push(function() {","                    cb.apply(inst, arguments);","","                });","            }","            inst.__use.apply(inst, args);","        },","        /**","        * @method delegate","        * @description A delegate method passed to the instance's delegate method","        * @param {String} type The type of event to listen for","        * @param {Function} fn The method to attach","        * @param {String} cont The container to act as a delegate, if no \"sel\" passed, the body is assumed as the container.","        * @param {String} sel The selector to match in the event (optional)","        * @return {EventHandle} The Event handle returned from Y.delegate","        */","        delegate: function(type, fn, cont, sel) {","            var inst = this.getInstance();","            if (!inst) {","                return false;","            }","            if (!sel) {","                sel = cont;","                cont = 'body';","            }","            return inst.delegate(type, fn, cont, sel);","        },","        /**","        * @method getInstance","        * @description Get a reference to the internal YUI instance.","        * @return {YUI} The internal YUI instance","        */","        getInstance: function() {","            return this._instance;","        },","        /**","        * @method render","        * @description Render the iframe into the container config option or open the window.","        * @param {String/HTMLElement/Node} node The node to render to","        * @return {Frame}","        * @chainable","        */","        render: function(node) {","            if (this._rendered) {","                return this;","            }","            this._rendered = true;","            if (node) {","                this.set('container', node);","            }","","            this._create(Y.bind(function(res) {","","                var inst, timer,","                    cb = Y.bind(function(i) {","                        this._instanceLoaded(i);","                    }, this),","                    args = Y.clone(this.get('use')),","                    config = {","                        debug: false,","                        win: res.win,","                        doc: res.doc","                    },","                    fn = Y.bind(function() {","                        config = this._resolveWinDoc(config);","                        inst = YUI(config);","                        inst.host = this.get('host'); //Cross reference to Editor","","                        try {","                            inst.use('node-base', cb);","                            if (timer) {","                                clearInterval(timer);","                            }","                        } catch (e) {","                            timer = setInterval(function() {","                                fn();","                            }, 350);","                        }","                    }, this);","","                args.push(fn);","","                Y.use.apply(Y, args);","","            }, this));","","            return this;","        },","        /**","        * @private","        * @method _handleFocus","        * @description Does some tricks on focus to set the proper cursor position.","        */","        _handleFocus: function() {","            var inst = this.getInstance(),","                sel = new inst.EditorSelection();","","            if (sel.anchorNode) {","                var n = sel.anchorNode, c;","                ","                if (n.test('p') && n.get('innerHTML') === '') {","                    n = n.get('parentNode');","                }","                c = n.get('childNodes');","                ","                if (c.size()) {","                    if (c.item(0).test('br')) {","                        sel.selectNode(n, true, false);","                    } else if (c.item(0).test('p')) {","                        n = c.item(0).one('br.yui-cursor');","                        if (n) {","                            n = n.get('parentNode');","                        }","                        if (!n) {","                            n = c.item(0).get('firstChild');","                        }","                        if (!n) {","                            n = c.item(0);","                        }","                        if (n) {","                            sel.selectNode(n, true, false);","                        }","                    } else {","                        var b = inst.one('br.yui-cursor');","                        if (b) {","                            var par = b.get('parentNode');","                            if (par) {","                                sel.selectNode(par, true, false);","                            }","                        }","                    }","                }","            }","        },","        /**","        * @method focus","        * @description Set the focus to the iframe","        * @param {Function} fn Callback function to execute after focus happens        ","        * @return {Frame}","        * @chainable        ","        */","        focus: function(fn) {","            if (Y.UA.ie && Y.UA.ie < 9) {","                try {","                    Y.one('win').focus();","                    if (this.getInstance()) {","                        if (this.getInstance().one('win')) {","                            this.getInstance().one('win').focus();","                        }","                    }","                } catch (ierr) {","                }","                if (fn === true) {","                    this._handleFocus();","                }","                if (Y.Lang.isFunction(fn)) {","                    fn();","                }","            } else {","                try {","                    Y.one('win').focus();","                    Y.later(100, this, function() {","                        if (this.getInstance()) {","                            if (this.getInstance().one('win')) {","                                this.getInstance().one('win').focus();","                            }","                        }","                        if (fn === true) {","                            this._handleFocus();","                        }","                        if (Y.Lang.isFunction(fn)) {","                            fn();","                        }","                    });","                } catch (ferr) {","                }","            }","            return this;","        },","        /**","        * @method show","        * @description Show the iframe instance","        * @return {Frame}","        * @chainable        ","        */","        show: function() {","            this._iframe.setStyles({","                position: 'static',","                left: ''","            });","            if (Y.UA.gecko) {","                try {","                    if (this.getInstance()) {","                        this.getInstance().config.doc.designMode = 'on';","                    }","                } catch (e) { }","                this.focus();","            }           ","            return this;","        },","        /**","        * @method hide","        * @description Hide the iframe instance","        * @return {Frame}","        * @chainable        ","        */","        hide: function() {","            this._iframe.setStyles({","                position: 'absolute',","                left: '-999999px'","            });","            return this;","        }","    }, {","        /**","        * @static","        * @property THROTTLE_TIME","        * @description The throttle time for key events in IE","        * @type Number","        * @default 100","        */","        THROTTLE_TIME: 100,","        /**","        * @static","        * @property DOM_EVENTS","        * @description The DomEvents that the frame automatically attaches and bubbles","        * @type Object","        */","        DOM_EVENTS: {","            dblclick: 1,","            click: 1,","            paste: 1,","            mouseup: 1,","            mousedown: 1,","            keyup: 1,","            keydown: 1,","            keypress: 1,","            activate: 1,","            deactivate: 1,","            beforedeactivate: 1,","            focusin: 1,","            focusout: 1","        },","","        /**","        * @static","        * @property DEFAULT_CSS","        * @description The default css used when creating the document.","        * @type String","        */","        //DEFAULT_CSS: 'html { height: 95%; } body { padding: 7px; background-color: #fff; font: 13px/1.22 arial,helvetica,clean,sans-serif;*font-size:small;*font:x-small; } a, a:visited, a:hover { color: blue !important; text-decoration: underline !important; cursor: text !important; } img { cursor: pointer !important; border: none; }',","        DEFAULT_CSS: 'body { background-color: #fff; font: 13px/1.22 arial,helvetica,clean,sans-serif;*font-size:small;*font:x-small; } a, a:visited, a:hover { color: blue !important; text-decoration: underline !important; cursor: text !important; } img { cursor: pointer !important; border: none; }',","        /**","        * @static","        * @property HTML","        * @description The template string used to create the iframe","        * @type String","        */","        //HTML: '<iframe border=\"0\" frameBorder=\"0\" marginWidth=\"0\" marginHeight=\"0\" leftMargin=\"0\" topMargin=\"0\" allowTransparency=\"true\" width=\"100%\" height=\"99%\"></iframe>',","        HTML: '<iframe border=\"0\" frameBorder=\"0\" marginWidth=\"0\" marginHeight=\"0\" leftMargin=\"0\" topMargin=\"0\" allowTransparency=\"true\" width=\"100%\" height=\"99%\"></iframe>',","        /**","        * @static","        * @property PAGE_HTML","        * @description The template used to create the page when created dynamically.","        * @type String","        */","        PAGE_HTML: '<html dir=\"{DIR}\" lang=\"{LANG}\"><head><title>{TITLE}</title>{META}<base href=\"{BASE_HREF}\"/>{LINKED_CSS}<style id=\"editor_css\">{DEFAULT_CSS}</style>{EXTRA_CSS}</head><body>{CONTENT}</body></html>',","","        /**","        * @static","        * @method getDocType","        * @description Parses document.doctype and generates a DocType to match the parent page, if supported.","        * For IE8, it grabs document.all[0].nodeValue and uses that. For IE < 8, it falls back to Frame.DOC_TYPE.","        * @return {String} The normalized DocType to apply to the iframe","        */","        getDocType: function() {","            var dt = Y.config.doc.doctype,","                str = Frame.DOC_TYPE;","","            if (dt) {","                str = '<!DOCTYPE ' + dt.name + ((dt.publicId) ? ' ' + dt.publicId : '') + ((dt.systemId) ? ' ' + dt.systemId : '') + '>';","            } else {","                if (Y.config.doc.all) {","                    dt = Y.config.doc.all[0];","                    if (dt.nodeType) {","                        if (dt.nodeType === 8) {","                            if (dt.nodeValue) {","                                if (dt.nodeValue.toLowerCase().indexOf('doctype') !== -1) {","                                    str = '<!' + dt.nodeValue + '>';","                                }","                            }","                        }","                    }","                }","            }","            return str;","        },","        /**","        * @static","        * @property DOC_TYPE","        * @description The DOCTYPE to prepend to the new document when created. Should match the one on the page being served.","        * @type String","        */","        DOC_TYPE: '<!DOCTYPE HTML PUBLIC \"-/'+'/W3C/'+'/DTD HTML 4.01/'+'/EN\" \"http:/'+'/www.w3.org/TR/html4/strict.dtd\">',","        /**","        * @static","        * @property META","        * @description The meta-tag for Content-Type to add to the dynamic document","        * @type String","        */","        META: '<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/><meta http-equiv=\"X-UA-Compatible\" content=\"IE=7\">',","        //META: '<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/>',","        /**","        * @static","        * @property NAME","        * @description The name of the class (frame)","        * @type String","        */","        NAME: 'frame',","        ATTRS: {","            /**","            * @attribute title","            * @description The title to give the blank page.","            * @type String","            */","            title: {","                value: 'Blank Page'","            },","            /**","            * @attribute dir","            * @description The default text direction for this new frame. Default: ltr","            * @type String","            */","            dir: {","                value: 'ltr'","            },","            /**","            * @attribute lang","            * @description The default language. Default: en-US","            * @type String","            */","            lang: {","                value: 'en-US'","            },","            /**","            * @attribute src","            * @description The src of the iframe/window. Defaults to javascript:;","            * @type String","            */","            src: {","                //Hackish, IE needs the false in the Javascript URL","                value: 'javascript' + ((Y.UA.ie) ? ':false' : ':') + ';'","            },","            /**","            * @attribute designMode","            * @description Should designMode be turned on after creation.","            * @writeonce","            * @type Boolean","            */","            designMode: {","                writeOnce: true,","                value: false","            },","            /**","            * @attribute content","            * @description The string to inject into the body of the new frame/window.","            * @type String","            */","            content: {","                value: '<br>',","                setter: '_setHTML',","                getter: '_getHTML'","            },","            /**","            * @attribute basehref","            * @description The base href to use in the iframe.","            * @type String","            */","            basehref: {","                value: false,","                getter: '_resolveBaseHref'","            },","            /**","            * @attribute use","            * @description Array of modules to include in the scoped YUI instance at render time. Default: ['none', 'selector-css2']","            * @writeonce","            * @type Array","            */","            use: {","                writeOnce: true,","                value: ['node', 'node-style', 'selector-css3']","            },","            /**","            * @attribute container","            * @description The container to append the iFrame to on render.","            * @type String/HTMLElement/Node","            */","            container: {","                value: 'body',","                setter: function(n) {","                    return Y.one(n);","                }","            },","            /**","            * @attribute node","            * @description The Node instance of the iframe.","            * @type Node","            */","            node: {","                readOnly: true,","                value: null,","                getter: function() {","                    return this._iframe;","                }","            },","            /**","            * @attribute id","            * @description Set the id of the new Node. (optional)","            * @type String","            * @writeonce","            */","            id: {","                writeOnce: true,","                getter: function(id) {","                    if (!id) {","                        id = 'iframe-' + Y.guid();","                    }","                    return id;","                }","            },","            /**","            * @attribute linkedcss","            * @description An array of url's to external linked style sheets","            * @type String","            */","            linkedcss: {","                value: '',","                getter: '_getLinkedCSS',","                setter: '_setLinkedCSS'","            },","            /**","            * @attribute extracss","            * @description A string of CSS to add to the Head of the Editor","            * @type String","            */","            extracss: {","                value: '',","                setter: '_setExtraCSS'","            },","            /**","            * @attribute host","            * @description A reference to the Editor instance ","            * @type Object","            */","            host: {","                value: false","            },","            /**","            * @attribute defaultblock","            * @description The default tag to use for block level items, defaults to: p","            * @type String","            */            ","            defaultblock: {","                value: 'p'","            }","        }","    });","","","    Y.Frame = Frame;","","","","}, '@VERSION@', {\"requires\": [\"base\", \"node\", \"selector-css3\", \"yui-throttle\"]});"];
_yuitest_coverage["build/frame/frame.js"].lines = {"1":0,"15":0,"16":0,"20":0,"56":0,"59":0,"60":0,"61":0,"62":0,"65":0,"67":0,"69":0,"70":0,"81":0,"84":0,"90":0,"92":0,"93":0,"94":0,"95":0,"98":0,"99":0,"100":0,"101":0,"102":0,"106":0,"118":0,"119":0,"120":0,"121":0,"122":0,"124":0,"125":0,"127":0,"139":0,"141":0,"143":0,"146":0,"148":0,"149":0,"150":0,"151":0,"152":0,"153":0,"157":0,"158":0,"159":0,"161":0,"164":0,"170":0,"172":0,"173":0,"174":0,"183":0,"186":0,"187":0,"189":0,"190":0,"193":0,"194":0,"195":0,"197":0,"198":0,"204":0,"205":0,"206":0,"208":0,"209":0,"212":0,"216":0,"219":0,"227":0,"229":0,"230":0,"233":0,"234":0,"236":0,"237":0,"238":0,"240":0,"242":0,"248":0,"250":0,"253":0,"254":0,"256":0,"257":0,"258":0,"261":0,"262":0,"276":0,"280":0,"282":0,"283":0,"284":0,"287":0,"288":0,"289":0,"291":0,"292":0,"293":0,"296":0,"297":0,"313":0,"314":0,"315":0,"318":0,"320":0,"321":0,"324":0,"325":0,"326":0,"329":0,"330":0,"331":0,"332":0,"333":0,"335":0,"338":0,"340":0,"342":0,"354":0,"355":0,"357":0,"358":0,"359":0,"360":0,"362":0,"363":0,"366":0,"367":0,"369":0,"370":0,"373":0,"374":0,"375":0,"376":0,"377":0,"378":0,"379":0,"380":0,"382":0,"385":0,"386":0,"400":0,"401":0,"402":0,"403":0,"405":0,"407":0,"417":0,"418":0,"419":0,"421":0,"431":0,"432":0,"433":0,"436":0,"437":0,"438":0,"441":0,"449":0,"450":0,"452":0,"453":0,"454":0,"455":0,"456":0,"460":0,"462":0,"470":0,"471":0,"472":0,"474":0,"482":0,"483":0,"486":0,"487":0,"489":0,"499":0,"500":0,"502":0,"504":0,"505":0,"506":0,"508":0,"509":0,"521":0,"525":0,"526":0,"528":0,"529":0,"530":0,"534":0,"546":0,"547":0,"548":0,"550":0,"551":0,"552":0,"554":0,"562":0,"572":0,"573":0,"575":0,"576":0,"577":0,"580":0,"582":0,"584":0,"593":0,"594":0,"595":0,"597":0,"598":0,"599":0,"600":0,"603":0,"604":0,"609":0,"611":0,"615":0,"623":0,"626":0,"627":0,"629":0,"630":0,"632":0,"634":0,"635":0,"636":0,"637":0,"638":0,"639":0,"640":0,"642":0,"643":0,"645":0,"646":0,"648":0,"649":0,"652":0,"653":0,"654":0,"655":0,"656":0,"671":0,"672":0,"673":0,"674":0,"675":0,"676":0,"681":0,"682":0,"684":0,"685":0,"688":0,"689":0,"690":0,"691":0,"692":0,"693":0,"696":0,"697":0,"699":0,"700":0,"706":0,"715":0,"719":0,"720":0,"721":0,"722":0,"725":0,"727":0,"736":0,"740":0,"805":0,"808":0,"809":0,"811":0,"812":0,"813":0,"814":0,"815":0,"816":0,"817":0,"824":0,"929":0,"941":0,"953":0,"954":0,"956":0,"998":0};
_yuitest_coverage["build/frame/frame.js"].functions = {"Frame:15":0,"(anonymous 2):99":0,"_create:55":0,"_resolveWinDoc:117":0,"_onDomEvent:138":0,"initializer:163":0,"destructor:169":0,"getData:211":0,"_DOMPaste:182":0,"(anonymous 3):229":0,"_defReadyFn:226":0,"(anonymous 4):283":0,"_fixIECursors:275":0,"(anonymous 5):324":0,"_onContentReady:312":0,"_ieSetBodyHeight:353":0,"_resolveBaseHref:399":0,"_getHTML:416":0,"(anonymous 6):436":0,"_setHTML:430":0,"(anonymous 7):454":0,"_getLinkedCSS:448":0,"_setLinkedCSS:469":0,"_setExtraCSS:481":0,"_instanceLoaded:498":0,"(anonymous 8):529":0,"use:520":0,"delegate:545":0,"getInstance:561":0,"(anonymous 10):583":0,"(anonymous 12):603":0,"(anonymous 11):592":0,"(anonymous 9):580":0,"render:571":0,"_handleFocus:622":0,"(anonymous 13):690":0,"focus:670":0,"show:714":0,"hide:735":0,"getDocType:804":0,"setter:928":0,"getter:940":0,"getter:952":0,"(anonymous 1):1":0};
_yuitest_coverage["build/frame/frame.js"].coveredLines = 293;
_yuitest_coverage["build/frame/frame.js"].coveredFunctions = 44;
_yuitest_coverline("build/frame/frame.js", 1);
YUI.add('frame', function (Y, NAME) {


    /**
     * Creates a wrapper around an iframe. It loads the content either from a local
     * file or from script and creates a local YUI instance bound to that new window and document.
     * @class Frame
     * @for Frame
     * @extends Base
     * @constructor
     * @module editor
     * @submodule frame
     */

    _yuitest_coverfunc("build/frame/frame.js", "(anonymous 1)", 1);
_yuitest_coverline("build/frame/frame.js", 15);
var Frame = function() {
        _yuitest_coverfunc("build/frame/frame.js", "Frame", 15);
_yuitest_coverline("build/frame/frame.js", 16);
Frame.superclass.constructor.apply(this, arguments);
    }, LAST_CHILD = ':last-child', BODY = 'body';
    

    _yuitest_coverline("build/frame/frame.js", 20);
Y.extend(Frame, Y.Base, {
        /**
        * @private
        * @property _ready
        * @description Internal reference set when the content is ready.
        * @type Boolean
        */
        _ready: null,
        /**
        * @private
        * @property _rendered
        * @description Internal reference set when render is called.
        * @type Boolean
        */
        _rendered: null,
        /**
        * @private
        * @property _iframe
        * @description Internal Node reference to the iFrame or the window
        * @type Node
        */
        _iframe: null,
        /**
        * @private
        * @property _instance
        * @description Internal reference to the YUI instance bound to the iFrame or window
        * @type YUI
        */
        _instance: null,
        /**
        * @private
        * @method _create
        * @description Create the iframe or Window and get references to the Document & Window
        * @return {Object} Hash table containing references to the new Document & Window
        */
        _create: function(cb) {
            _yuitest_coverfunc("build/frame/frame.js", "_create", 55);
_yuitest_coverline("build/frame/frame.js", 56);
var win, doc, res, node, html = '',
                extra_css = ((this.get('extracss')) ? '<style id="extra_css">' + this.get('extracss') + '</style>' : '');
            
            _yuitest_coverline("build/frame/frame.js", 59);
this._iframe = Y.Node.create(Frame.HTML);
            _yuitest_coverline("build/frame/frame.js", 60);
this._iframe.setStyle('visibility', 'hidden');
            _yuitest_coverline("build/frame/frame.js", 61);
this._iframe.set('src', this.get('src'));
            _yuitest_coverline("build/frame/frame.js", 62);
this.get('container').append(this._iframe);

            //if the src attr is different than the default, don't create the document
            _yuitest_coverline("build/frame/frame.js", 65);
var create = (this.get('src') === Frame.ATTRS.src.value);

            _yuitest_coverline("build/frame/frame.js", 67);
this._iframe.set('height', '99%');

            _yuitest_coverline("build/frame/frame.js", 69);
if (create) {
                _yuitest_coverline("build/frame/frame.js", 70);
html = Y.Lang.sub(Frame.PAGE_HTML, {
                    DIR: this.get('dir'),
                    LANG: this.get('lang'),
                    TITLE: this.get('title'),
                    META: Frame.META,
                    LINKED_CSS: this.get('linkedcss'),
                    CONTENT: this.get('content'),
                    BASE_HREF: this.get('basehref'),
                    DEFAULT_CSS: Frame.DEFAULT_CSS,
                    EXTRA_CSS: extra_css
                });
                _yuitest_coverline("build/frame/frame.js", 81);
if (Y.config.doc.compatMode != 'BackCompat') {
                    
                    //html = Frame.DOC_TYPE + "\n" + html;
                    _yuitest_coverline("build/frame/frame.js", 84);
html = Frame.getDocType() + "\n" + html;
                } else {
                }

            }

            _yuitest_coverline("build/frame/frame.js", 90);
res = this._resolveWinDoc();

            _yuitest_coverline("build/frame/frame.js", 92);
if (html) {
                _yuitest_coverline("build/frame/frame.js", 93);
res.doc.open();
                _yuitest_coverline("build/frame/frame.js", 94);
res.doc.write(html);
                _yuitest_coverline("build/frame/frame.js", 95);
res.doc.close();
            }

            _yuitest_coverline("build/frame/frame.js", 98);
if (!res.doc.documentElement) {
                _yuitest_coverline("build/frame/frame.js", 99);
var timer = Y.later(1, this, function() {
                    _yuitest_coverfunc("build/frame/frame.js", "(anonymous 2)", 99);
_yuitest_coverline("build/frame/frame.js", 100);
if (res.doc && res.doc.documentElement) {
                        _yuitest_coverline("build/frame/frame.js", 101);
cb(res);
                        _yuitest_coverline("build/frame/frame.js", 102);
timer.cancel();
                    }
                }, null, true);
            } else {
                _yuitest_coverline("build/frame/frame.js", 106);
cb(res);
            }

        },
        /**
        * @private
        * @method _resolveWinDoc
        * @description Resolves the document and window from an iframe or window instance
        * @param {Object} c The YUI Config to add the window and document to
        * @return {Object} Object hash of window and document references, if a YUI config was passed, it is returned.
        */
        _resolveWinDoc: function(c) {
            _yuitest_coverfunc("build/frame/frame.js", "_resolveWinDoc", 117);
_yuitest_coverline("build/frame/frame.js", 118);
var config = (c) ? c : {};
            _yuitest_coverline("build/frame/frame.js", 119);
config.win = Y.Node.getDOMNode(this._iframe.get('contentWindow'));
            _yuitest_coverline("build/frame/frame.js", 120);
config.doc = Y.Node.getDOMNode(this._iframe.get('contentWindow.document'));
            _yuitest_coverline("build/frame/frame.js", 121);
if (!config.doc) {
                _yuitest_coverline("build/frame/frame.js", 122);
config.doc = Y.config.doc;
            }
            _yuitest_coverline("build/frame/frame.js", 124);
if (!config.win) {
                _yuitest_coverline("build/frame/frame.js", 125);
config.win = Y.config.win;
            }
            _yuitest_coverline("build/frame/frame.js", 127);
return config;
        },
        /**
        * @private
        * @method _onDomEvent
        * @description Generic handler for all DOM events fired by the iframe or window. This handler
        * takes the current EventFacade and augments it to fire on the Frame host. It adds two new properties
        * to the EventFacade called frameX and frameY which adds the scroll and xy position of the iframe
        * to the original pageX and pageY of the event so external nodes can be positioned over the frame.
        * @param {Event.Facade} e
        */
        _onDomEvent: function(e) {
            _yuitest_coverfunc("build/frame/frame.js", "_onDomEvent", 138);
_yuitest_coverline("build/frame/frame.js", 139);
var xy, node;
            
            _yuitest_coverline("build/frame/frame.js", 141);
if (!Y.Node.getDOMNode(this._iframe)) {
                //The iframe is null for some reason, bail on sending events.
                _yuitest_coverline("build/frame/frame.js", 143);
return;
            }

            _yuitest_coverline("build/frame/frame.js", 146);
e.frameX = e.frameY = 0;

            _yuitest_coverline("build/frame/frame.js", 148);
if (e.pageX > 0 || e.pageY > 0) {
                _yuitest_coverline("build/frame/frame.js", 149);
if (e.type.substring(0, 3) !== 'key') {
                    _yuitest_coverline("build/frame/frame.js", 150);
node = this._instance.one('win');
                    _yuitest_coverline("build/frame/frame.js", 151);
xy = this._iframe.getXY();
                    _yuitest_coverline("build/frame/frame.js", 152);
e.frameX = xy[0] + e.pageX - node.get('scrollLeft');
                    _yuitest_coverline("build/frame/frame.js", 153);
e.frameY = xy[1] + e.pageY - node.get('scrollTop');
                }
            }

            _yuitest_coverline("build/frame/frame.js", 157);
e.frameTarget = e.target;
            _yuitest_coverline("build/frame/frame.js", 158);
e.frameCurrentTarget = e.currentTarget;
            _yuitest_coverline("build/frame/frame.js", 159);
e.frameEvent = e;

            _yuitest_coverline("build/frame/frame.js", 161);
this.fire('dom:' + e.type, e);
        },
        initializer: function() {
            _yuitest_coverfunc("build/frame/frame.js", "initializer", 163);
_yuitest_coverline("build/frame/frame.js", 164);
this.publish('ready', {
                emitFacade: true,
                defaultFn: this._defReadyFn
            });
        },
        destructor: function() {
            _yuitest_coverfunc("build/frame/frame.js", "destructor", 169);
_yuitest_coverline("build/frame/frame.js", 170);
var inst = this.getInstance();

            _yuitest_coverline("build/frame/frame.js", 172);
inst.one('doc').detachAll();
            _yuitest_coverline("build/frame/frame.js", 173);
inst = null;
            _yuitest_coverline("build/frame/frame.js", 174);
this._iframe.remove();
        },
        /**
        * @private
        * @method _DOMPaste
        * @description Simple pass thru handler for the paste event so we can do content cleanup
        * @param {Event.Facade} e
        */
        _DOMPaste: function(e) {
            _yuitest_coverfunc("build/frame/frame.js", "_DOMPaste", 182);
_yuitest_coverline("build/frame/frame.js", 183);
var inst = this.getInstance(),
                data = '', win = inst.config.win;

            _yuitest_coverline("build/frame/frame.js", 186);
if (e._event.originalTarget) {
                _yuitest_coverline("build/frame/frame.js", 187);
data = e._event.originalTarget;
            }
            _yuitest_coverline("build/frame/frame.js", 189);
if (e._event.clipboardData) {
                _yuitest_coverline("build/frame/frame.js", 190);
data = e._event.clipboardData.getData('Text');
            }
            
            _yuitest_coverline("build/frame/frame.js", 193);
if (win.clipboardData) {
                _yuitest_coverline("build/frame/frame.js", 194);
data = win.clipboardData.getData('Text');
                _yuitest_coverline("build/frame/frame.js", 195);
if (data === '') { // Could be empty, or failed
                    // Verify failure
                    _yuitest_coverline("build/frame/frame.js", 197);
if (!win.clipboardData.setData('Text', data)) {
                        _yuitest_coverline("build/frame/frame.js", 198);
data = null;
                    }
                }
            }
            

            _yuitest_coverline("build/frame/frame.js", 204);
e.frameTarget = e.target;
            _yuitest_coverline("build/frame/frame.js", 205);
e.frameCurrentTarget = e.currentTarget;
            _yuitest_coverline("build/frame/frame.js", 206);
e.frameEvent = e;
            
            _yuitest_coverline("build/frame/frame.js", 208);
if (data) {
                _yuitest_coverline("build/frame/frame.js", 209);
e.clipboardData = {
                    data: data,
                    getData: function() {
                        _yuitest_coverfunc("build/frame/frame.js", "getData", 211);
_yuitest_coverline("build/frame/frame.js", 212);
return data;
                    }
                };
            } else {
                _yuitest_coverline("build/frame/frame.js", 216);
e.clipboardData = null;
            }

            _yuitest_coverline("build/frame/frame.js", 219);
this.fire('dom:paste', e);
        },
        /**
        * @private
        * @method _defReadyFn
        * @description Binds DOM events, sets the iframe to visible and fires the ready event
        */
        _defReadyFn: function() {
            _yuitest_coverfunc("build/frame/frame.js", "_defReadyFn", 226);
_yuitest_coverline("build/frame/frame.js", 227);
var inst = this.getInstance();

            _yuitest_coverline("build/frame/frame.js", 229);
Y.each(Frame.DOM_EVENTS, function(v, k) {
                _yuitest_coverfunc("build/frame/frame.js", "(anonymous 3)", 229);
_yuitest_coverline("build/frame/frame.js", 230);
var fn = Y.bind(this._onDomEvent, this),
                    kfn = ((Y.UA.ie && Frame.THROTTLE_TIME > 0) ? Y.throttle(fn, Frame.THROTTLE_TIME) : fn);

                _yuitest_coverline("build/frame/frame.js", 233);
if (!inst.Node.DOM_EVENTS[k]) {
                    _yuitest_coverline("build/frame/frame.js", 234);
inst.Node.DOM_EVENTS[k] = 1;
                }
                _yuitest_coverline("build/frame/frame.js", 236);
if (v === 1) {
                    _yuitest_coverline("build/frame/frame.js", 237);
if (k !== 'focus' && k !== 'blur' && k !== 'paste') {
                        _yuitest_coverline("build/frame/frame.js", 238);
if (k.substring(0, 3) === 'key') {
                            //Throttle key events in IE
                            _yuitest_coverline("build/frame/frame.js", 240);
inst.on(k, kfn, inst.config.doc);
                        } else {
                            _yuitest_coverline("build/frame/frame.js", 242);
inst.on(k, fn, inst.config.doc);
                        }
                    }
                }
            }, this);

            _yuitest_coverline("build/frame/frame.js", 248);
inst.Node.DOM_EVENTS.paste = 1;
            
            _yuitest_coverline("build/frame/frame.js", 250);
inst.on('paste', Y.bind(this._DOMPaste, this), inst.one('body'));

            //Adding focus/blur to the window object
            _yuitest_coverline("build/frame/frame.js", 253);
inst.on('focus', Y.bind(this._onDomEvent, this), inst.config.win);
            _yuitest_coverline("build/frame/frame.js", 254);
inst.on('blur', Y.bind(this._onDomEvent, this), inst.config.win);

            _yuitest_coverline("build/frame/frame.js", 256);
inst.__use = inst.use;
            _yuitest_coverline("build/frame/frame.js", 257);
inst.use = Y.bind(this.use, this);
            _yuitest_coverline("build/frame/frame.js", 258);
this._iframe.setStyles({
                visibility: 'inherit'
            });
            _yuitest_coverline("build/frame/frame.js", 261);
inst.one('body').setStyle('display', 'block');
            _yuitest_coverline("build/frame/frame.js", 262);
if (Y.UA.ie) {
                //this._fixIECursors();
            }
        },
        /**
        * It appears that having a BR tag anywhere in the source "below" a table with a percentage width (in IE 7 & 8)
        * if there is any TEXTINPUT's outside the iframe, the cursor will rapidly flickr and the CPU would occasionally 
        * spike. This method finds all <BR>'s below the sourceIndex of the first table. Does some checks to see if they
        * can be modified and replaces then with a <WBR> so the layout will remain in tact, but the flickering will
        * no longer happen.
        * @method _fixIECursors
        * @private
        */
        _fixIECursors: function() {
            _yuitest_coverfunc("build/frame/frame.js", "_fixIECursors", 275);
_yuitest_coverline("build/frame/frame.js", 276);
var inst = this.getInstance(),
                tables = inst.all('table'),
                brs = inst.all('br'), si;

            _yuitest_coverline("build/frame/frame.js", 280);
if (tables.size() && brs.size()) {
                //First Table
                _yuitest_coverline("build/frame/frame.js", 282);
si = tables.item(0).get('sourceIndex');
                _yuitest_coverline("build/frame/frame.js", 283);
brs.each(function(n) {
                    _yuitest_coverfunc("build/frame/frame.js", "(anonymous 4)", 283);
_yuitest_coverline("build/frame/frame.js", 284);
var p = n.get('parentNode'),
                        c = p.get('children'), b = p.all('>br');
                    
                    _yuitest_coverline("build/frame/frame.js", 287);
if (p.test('div')) {
                        _yuitest_coverline("build/frame/frame.js", 288);
if (c.size() > 2) {
                            _yuitest_coverline("build/frame/frame.js", 289);
n.replace(inst.Node.create('<wbr>'));
                        } else {
                            _yuitest_coverline("build/frame/frame.js", 291);
if (n.get('sourceIndex') > si) {
                                _yuitest_coverline("build/frame/frame.js", 292);
if (b.size()) {
                                    _yuitest_coverline("build/frame/frame.js", 293);
n.replace(inst.Node.create('<wbr>'));
                                }
                            } else {
                                _yuitest_coverline("build/frame/frame.js", 296);
if (b.size() > 1) {
                                    _yuitest_coverline("build/frame/frame.js", 297);
n.replace(inst.Node.create('<wbr>'));
                                }
                            }
                        }
                    }
                    
                });
            }
        },
        /**
        * @private
        * @method _onContentReady
        * @description Called once the content is available in the frame/window and calls the final use call
        * on the internal instance so that the modules are loaded properly.
        */
        _onContentReady: function(e) {
            _yuitest_coverfunc("build/frame/frame.js", "_onContentReady", 312);
_yuitest_coverline("build/frame/frame.js", 313);
if (!this._ready) {
                _yuitest_coverline("build/frame/frame.js", 314);
this._ready = true;
                _yuitest_coverline("build/frame/frame.js", 315);
var inst = this.getInstance(),
                    args = Y.clone(this.get('use'));
                
                _yuitest_coverline("build/frame/frame.js", 318);
this.fire('contentready');

                _yuitest_coverline("build/frame/frame.js", 320);
if (e) {
                    _yuitest_coverline("build/frame/frame.js", 321);
inst.config.doc = Y.Node.getDOMNode(e.target);
                }
                //TODO Circle around and deal with CSS loading...
                _yuitest_coverline("build/frame/frame.js", 324);
args.push(Y.bind(function() {
                    _yuitest_coverfunc("build/frame/frame.js", "(anonymous 5)", 324);
_yuitest_coverline("build/frame/frame.js", 325);
if (inst.EditorSelection) {
                        _yuitest_coverline("build/frame/frame.js", 326);
inst.EditorSelection.DEFAULT_BLOCK_TAG = this.get('defaultblock');
                    }
                    //Moved to here so that the iframe is ready before allowing editing..
                    _yuitest_coverline("build/frame/frame.js", 329);
if (this.get('designMode')) {
                        _yuitest_coverline("build/frame/frame.js", 330);
if(Y.UA.ie) {
                            _yuitest_coverline("build/frame/frame.js", 331);
inst.config.doc.body.contentEditable = 'true';
                            _yuitest_coverline("build/frame/frame.js", 332);
this._ieSetBodyHeight();
                            _yuitest_coverline("build/frame/frame.js", 333);
inst.on('keyup', Y.bind(this._ieSetBodyHeight, this), inst.config.doc);
                        } else {
                            _yuitest_coverline("build/frame/frame.js", 335);
inst.config.doc.designMode = 'on';
                        }
                    }
                    _yuitest_coverline("build/frame/frame.js", 338);
this.fire('ready');
                }, this));
                _yuitest_coverline("build/frame/frame.js", 340);
inst.use.apply(inst, args);

                _yuitest_coverline("build/frame/frame.js", 342);
inst.one('doc').get('documentElement').addClass('yui-js-enabled');
            }
        },
        _ieHeightCounter: null,
        /**
        * Internal method to set the height of the body to the height of the document in IE.
        * With contenteditable being set, the document becomes unresponsive to clicks, this 
        * method expands the body to be the height of the document so that doesn't happen.
        * @private
        * @method _ieSetBodyHeight
        */
        _ieSetBodyHeight: function(e) {
            _yuitest_coverfunc("build/frame/frame.js", "_ieSetBodyHeight", 353);
_yuitest_coverline("build/frame/frame.js", 354);
if (!this._ieHeightCounter) {
                _yuitest_coverline("build/frame/frame.js", 355);
this._ieHeightCounter = 0;
            }
            _yuitest_coverline("build/frame/frame.js", 357);
this._ieHeightCounter++;
            _yuitest_coverline("build/frame/frame.js", 358);
var run = false;
            _yuitest_coverline("build/frame/frame.js", 359);
if (!e) {
                _yuitest_coverline("build/frame/frame.js", 360);
run = true;
            }
            _yuitest_coverline("build/frame/frame.js", 362);
if (e) {
                _yuitest_coverline("build/frame/frame.js", 363);
switch (e.keyCode) {
                    case 8:
                    case 13:
                        _yuitest_coverline("build/frame/frame.js", 366);
run = true;
                        _yuitest_coverline("build/frame/frame.js", 367);
break;
                }
                _yuitest_coverline("build/frame/frame.js", 369);
if (e.ctrlKey || e.shiftKey) {
                    _yuitest_coverline("build/frame/frame.js", 370);
run = true;
                }
            }
            _yuitest_coverline("build/frame/frame.js", 373);
if (run) {
                _yuitest_coverline("build/frame/frame.js", 374);
try {
                    _yuitest_coverline("build/frame/frame.js", 375);
var inst = this.getInstance();
                    _yuitest_coverline("build/frame/frame.js", 376);
var h = this._iframe.get('offsetHeight');
                    _yuitest_coverline("build/frame/frame.js", 377);
var bh = inst.config.doc.body.scrollHeight;
                    _yuitest_coverline("build/frame/frame.js", 378);
if (h > bh) {
                        _yuitest_coverline("build/frame/frame.js", 379);
h = (h - 15) + 'px';
                        _yuitest_coverline("build/frame/frame.js", 380);
inst.config.doc.body.style.height = h;
                    } else {
                        _yuitest_coverline("build/frame/frame.js", 382);
inst.config.doc.body.style.height = 'auto';
                    }
                } catch (e) {
                    _yuitest_coverline("build/frame/frame.js", 385);
if (this._ieHeightCounter < 100) {
                        _yuitest_coverline("build/frame/frame.js", 386);
Y.later(200, this, this._ieSetBodyHeight);
                    } else {
                    }
                }
            }
        },
        /**
        * @private
        * @method _resolveBaseHref
        * @description Resolves the basehref of the page the frame is created on. Only applies to dynamic content.
        * @param {String} href The new value to use, if empty it will be resolved from the current url.
        * @return {String}
        */
        _resolveBaseHref: function(href) {
            _yuitest_coverfunc("build/frame/frame.js", "_resolveBaseHref", 399);
_yuitest_coverline("build/frame/frame.js", 400);
if (!href || href === '') {
                _yuitest_coverline("build/frame/frame.js", 401);
href = Y.config.doc.location.href;
                _yuitest_coverline("build/frame/frame.js", 402);
if (href.indexOf('?') !== -1) { //Remove the query string
                    _yuitest_coverline("build/frame/frame.js", 403);
href = href.substring(0, href.indexOf('?'));
                }
                _yuitest_coverline("build/frame/frame.js", 405);
href = href.substring(0, href.lastIndexOf('/')) + '/';
            }
            _yuitest_coverline("build/frame/frame.js", 407);
return href;
        },
        /**
        * @private
        * @method _getHTML
        * @description Get the content from the iframe
        * @param {String} html The raw HTML from the body of the iframe.
        * @return {String}
        */
        _getHTML: function(html) {
            _yuitest_coverfunc("build/frame/frame.js", "_getHTML", 416);
_yuitest_coverline("build/frame/frame.js", 417);
if (this._ready) {
                _yuitest_coverline("build/frame/frame.js", 418);
var inst = this.getInstance();
                _yuitest_coverline("build/frame/frame.js", 419);
html = inst.one('body').get('innerHTML');
            }
            _yuitest_coverline("build/frame/frame.js", 421);
return html;
        },
        /**
        * @private
        * @method _setHTML
        * @description Set the content of the iframe
        * @param {String} html The raw HTML to set the body of the iframe to.
        * @return {String}
        */
        _setHTML: function(html) {
            _yuitest_coverfunc("build/frame/frame.js", "_setHTML", 430);
_yuitest_coverline("build/frame/frame.js", 431);
if (this._ready) {
                _yuitest_coverline("build/frame/frame.js", 432);
var inst = this.getInstance();
                _yuitest_coverline("build/frame/frame.js", 433);
inst.one('body').set('innerHTML', html);
            } else {
                //This needs to be wrapped in a contentready callback for the !_ready state
                _yuitest_coverline("build/frame/frame.js", 436);
this.on('contentready', Y.bind(function(html, e) {
                    _yuitest_coverfunc("build/frame/frame.js", "(anonymous 6)", 436);
_yuitest_coverline("build/frame/frame.js", 437);
var inst = this.getInstance();
                    _yuitest_coverline("build/frame/frame.js", 438);
inst.one('body').set('innerHTML', html);
                }, this, html));
            }
            _yuitest_coverline("build/frame/frame.js", 441);
return html;
        },
        /**
        * @private
        * @method _setLinkedCSS
        * @description Set's the linked CSS on the instance..
        */
        _getLinkedCSS: function(urls) {
            _yuitest_coverfunc("build/frame/frame.js", "_getLinkedCSS", 448);
_yuitest_coverline("build/frame/frame.js", 449);
if (!Y.Lang.isArray(urls)) {
                _yuitest_coverline("build/frame/frame.js", 450);
urls = [urls];
            }
            _yuitest_coverline("build/frame/frame.js", 452);
var str = '';
            _yuitest_coverline("build/frame/frame.js", 453);
if (!this._ready) {
                _yuitest_coverline("build/frame/frame.js", 454);
Y.each(urls, function(v) {
                    _yuitest_coverfunc("build/frame/frame.js", "(anonymous 7)", 454);
_yuitest_coverline("build/frame/frame.js", 455);
if (v !== '') {
                        _yuitest_coverline("build/frame/frame.js", 456);
str += '<link rel="stylesheet" href="' + v + '" type="text/css">';
                    }
                });
            } else {
                _yuitest_coverline("build/frame/frame.js", 460);
str = urls;
            }
            _yuitest_coverline("build/frame/frame.js", 462);
return str;
        },
        /**
        * @private
        * @method _setLinkedCSS
        * @description Set's the linked CSS on the instance..
        */
        _setLinkedCSS: function(css) {
            _yuitest_coverfunc("build/frame/frame.js", "_setLinkedCSS", 469);
_yuitest_coverline("build/frame/frame.js", 470);
if (this._ready) {
                _yuitest_coverline("build/frame/frame.js", 471);
var inst = this.getInstance();
                _yuitest_coverline("build/frame/frame.js", 472);
inst.Get.css(css);
            }
            _yuitest_coverline("build/frame/frame.js", 474);
return css;
        },
        /**
        * @private
        * @method _setExtraCSS
        * @description Set's the extra CSS on the instance..
        */
        _setExtraCSS: function(css) {
            _yuitest_coverfunc("build/frame/frame.js", "_setExtraCSS", 481);
_yuitest_coverline("build/frame/frame.js", 482);
if (this._ready) {
                _yuitest_coverline("build/frame/frame.js", 483);
var inst = this.getInstance(),
                    node = inst.one('#extra_css');
                
                _yuitest_coverline("build/frame/frame.js", 486);
node.remove();
                _yuitest_coverline("build/frame/frame.js", 487);
inst.one('head').append('<style id="extra_css">' + css + '</style>');
            }
            _yuitest_coverline("build/frame/frame.js", 489);
return css;
        },
        /**
        * @private
        * @method _instanceLoaded
        * @description Called from the first YUI instance that sets up the internal instance.
        * This loads the content into the window/frame and attaches the contentready event.
        * @param {YUI} inst The internal YUI instance bound to the frame/window
        */
        _instanceLoaded: function(inst) {
            _yuitest_coverfunc("build/frame/frame.js", "_instanceLoaded", 498);
_yuitest_coverline("build/frame/frame.js", 499);
this._instance = inst;
            _yuitest_coverline("build/frame/frame.js", 500);
this._onContentReady();
            
            _yuitest_coverline("build/frame/frame.js", 502);
var doc = this._instance.config.doc;

            _yuitest_coverline("build/frame/frame.js", 504);
if (this.get('designMode')) {
                _yuitest_coverline("build/frame/frame.js", 505);
if (!Y.UA.ie) {
                    _yuitest_coverline("build/frame/frame.js", 506);
try {
                        //Force other browsers into non CSS styling
                        _yuitest_coverline("build/frame/frame.js", 508);
doc.execCommand('styleWithCSS', false, false);
                        _yuitest_coverline("build/frame/frame.js", 509);
doc.execCommand('insertbronreturn', false, false);
                    } catch (err) {}
                }
            }
        },
        //BEGIN PUBLIC METHODS
        /**
        * @method use
        * @description This is a scoped version of the normal YUI.use method & is bound to this frame/window.
        * At setup, the inst.use method is mapped to this method.
        */
        use: function() {
            _yuitest_coverfunc("build/frame/frame.js", "use", 520);
_yuitest_coverline("build/frame/frame.js", 521);
var inst = this.getInstance(),
                args = Y.Array(arguments),
                cb = false;

            _yuitest_coverline("build/frame/frame.js", 525);
if (Y.Lang.isFunction(args[args.length - 1])) {
                _yuitest_coverline("build/frame/frame.js", 526);
cb = args.pop();
            }
            _yuitest_coverline("build/frame/frame.js", 528);
if (cb) {
                _yuitest_coverline("build/frame/frame.js", 529);
args.push(function() {
                    _yuitest_coverfunc("build/frame/frame.js", "(anonymous 8)", 529);
_yuitest_coverline("build/frame/frame.js", 530);
cb.apply(inst, arguments);

                });
            }
            _yuitest_coverline("build/frame/frame.js", 534);
inst.__use.apply(inst, args);
        },
        /**
        * @method delegate
        * @description A delegate method passed to the instance's delegate method
        * @param {String} type The type of event to listen for
        * @param {Function} fn The method to attach
        * @param {String} cont The container to act as a delegate, if no "sel" passed, the body is assumed as the container.
        * @param {String} sel The selector to match in the event (optional)
        * @return {EventHandle} The Event handle returned from Y.delegate
        */
        delegate: function(type, fn, cont, sel) {
            _yuitest_coverfunc("build/frame/frame.js", "delegate", 545);
_yuitest_coverline("build/frame/frame.js", 546);
var inst = this.getInstance();
            _yuitest_coverline("build/frame/frame.js", 547);
if (!inst) {
                _yuitest_coverline("build/frame/frame.js", 548);
return false;
            }
            _yuitest_coverline("build/frame/frame.js", 550);
if (!sel) {
                _yuitest_coverline("build/frame/frame.js", 551);
sel = cont;
                _yuitest_coverline("build/frame/frame.js", 552);
cont = 'body';
            }
            _yuitest_coverline("build/frame/frame.js", 554);
return inst.delegate(type, fn, cont, sel);
        },
        /**
        * @method getInstance
        * @description Get a reference to the internal YUI instance.
        * @return {YUI} The internal YUI instance
        */
        getInstance: function() {
            _yuitest_coverfunc("build/frame/frame.js", "getInstance", 561);
_yuitest_coverline("build/frame/frame.js", 562);
return this._instance;
        },
        /**
        * @method render
        * @description Render the iframe into the container config option or open the window.
        * @param {String/HTMLElement/Node} node The node to render to
        * @return {Frame}
        * @chainable
        */
        render: function(node) {
            _yuitest_coverfunc("build/frame/frame.js", "render", 571);
_yuitest_coverline("build/frame/frame.js", 572);
if (this._rendered) {
                _yuitest_coverline("build/frame/frame.js", 573);
return this;
            }
            _yuitest_coverline("build/frame/frame.js", 575);
this._rendered = true;
            _yuitest_coverline("build/frame/frame.js", 576);
if (node) {
                _yuitest_coverline("build/frame/frame.js", 577);
this.set('container', node);
            }

            _yuitest_coverline("build/frame/frame.js", 580);
this._create(Y.bind(function(res) {

                _yuitest_coverfunc("build/frame/frame.js", "(anonymous 9)", 580);
_yuitest_coverline("build/frame/frame.js", 582);
var inst, timer,
                    cb = Y.bind(function(i) {
                        _yuitest_coverfunc("build/frame/frame.js", "(anonymous 10)", 583);
_yuitest_coverline("build/frame/frame.js", 584);
this._instanceLoaded(i);
                    }, this),
                    args = Y.clone(this.get('use')),
                    config = {
                        debug: false,
                        win: res.win,
                        doc: res.doc
                    },
                    fn = Y.bind(function() {
                        _yuitest_coverfunc("build/frame/frame.js", "(anonymous 11)", 592);
_yuitest_coverline("build/frame/frame.js", 593);
config = this._resolveWinDoc(config);
                        _yuitest_coverline("build/frame/frame.js", 594);
inst = YUI(config);
                        _yuitest_coverline("build/frame/frame.js", 595);
inst.host = this.get('host'); //Cross reference to Editor

                        _yuitest_coverline("build/frame/frame.js", 597);
try {
                            _yuitest_coverline("build/frame/frame.js", 598);
inst.use('node-base', cb);
                            _yuitest_coverline("build/frame/frame.js", 599);
if (timer) {
                                _yuitest_coverline("build/frame/frame.js", 600);
clearInterval(timer);
                            }
                        } catch (e) {
                            _yuitest_coverline("build/frame/frame.js", 603);
timer = setInterval(function() {
                                _yuitest_coverfunc("build/frame/frame.js", "(anonymous 12)", 603);
_yuitest_coverline("build/frame/frame.js", 604);
fn();
                            }, 350);
                        }
                    }, this);

                _yuitest_coverline("build/frame/frame.js", 609);
args.push(fn);

                _yuitest_coverline("build/frame/frame.js", 611);
Y.use.apply(Y, args);

            }, this));

            _yuitest_coverline("build/frame/frame.js", 615);
return this;
        },
        /**
        * @private
        * @method _handleFocus
        * @description Does some tricks on focus to set the proper cursor position.
        */
        _handleFocus: function() {
            _yuitest_coverfunc("build/frame/frame.js", "_handleFocus", 622);
_yuitest_coverline("build/frame/frame.js", 623);
var inst = this.getInstance(),
                sel = new inst.EditorSelection();

            _yuitest_coverline("build/frame/frame.js", 626);
if (sel.anchorNode) {
                _yuitest_coverline("build/frame/frame.js", 627);
var n = sel.anchorNode, c;
                
                _yuitest_coverline("build/frame/frame.js", 629);
if (n.test('p') && n.get('innerHTML') === '') {
                    _yuitest_coverline("build/frame/frame.js", 630);
n = n.get('parentNode');
                }
                _yuitest_coverline("build/frame/frame.js", 632);
c = n.get('childNodes');
                
                _yuitest_coverline("build/frame/frame.js", 634);
if (c.size()) {
                    _yuitest_coverline("build/frame/frame.js", 635);
if (c.item(0).test('br')) {
                        _yuitest_coverline("build/frame/frame.js", 636);
sel.selectNode(n, true, false);
                    } else {_yuitest_coverline("build/frame/frame.js", 637);
if (c.item(0).test('p')) {
                        _yuitest_coverline("build/frame/frame.js", 638);
n = c.item(0).one('br.yui-cursor');
                        _yuitest_coverline("build/frame/frame.js", 639);
if (n) {
                            _yuitest_coverline("build/frame/frame.js", 640);
n = n.get('parentNode');
                        }
                        _yuitest_coverline("build/frame/frame.js", 642);
if (!n) {
                            _yuitest_coverline("build/frame/frame.js", 643);
n = c.item(0).get('firstChild');
                        }
                        _yuitest_coverline("build/frame/frame.js", 645);
if (!n) {
                            _yuitest_coverline("build/frame/frame.js", 646);
n = c.item(0);
                        }
                        _yuitest_coverline("build/frame/frame.js", 648);
if (n) {
                            _yuitest_coverline("build/frame/frame.js", 649);
sel.selectNode(n, true, false);
                        }
                    } else {
                        _yuitest_coverline("build/frame/frame.js", 652);
var b = inst.one('br.yui-cursor');
                        _yuitest_coverline("build/frame/frame.js", 653);
if (b) {
                            _yuitest_coverline("build/frame/frame.js", 654);
var par = b.get('parentNode');
                            _yuitest_coverline("build/frame/frame.js", 655);
if (par) {
                                _yuitest_coverline("build/frame/frame.js", 656);
sel.selectNode(par, true, false);
                            }
                        }
                    }}
                }
            }
        },
        /**
        * @method focus
        * @description Set the focus to the iframe
        * @param {Function} fn Callback function to execute after focus happens        
        * @return {Frame}
        * @chainable        
        */
        focus: function(fn) {
            _yuitest_coverfunc("build/frame/frame.js", "focus", 670);
_yuitest_coverline("build/frame/frame.js", 671);
if (Y.UA.ie && Y.UA.ie < 9) {
                _yuitest_coverline("build/frame/frame.js", 672);
try {
                    _yuitest_coverline("build/frame/frame.js", 673);
Y.one('win').focus();
                    _yuitest_coverline("build/frame/frame.js", 674);
if (this.getInstance()) {
                        _yuitest_coverline("build/frame/frame.js", 675);
if (this.getInstance().one('win')) {
                            _yuitest_coverline("build/frame/frame.js", 676);
this.getInstance().one('win').focus();
                        }
                    }
                } catch (ierr) {
                }
                _yuitest_coverline("build/frame/frame.js", 681);
if (fn === true) {
                    _yuitest_coverline("build/frame/frame.js", 682);
this._handleFocus();
                }
                _yuitest_coverline("build/frame/frame.js", 684);
if (Y.Lang.isFunction(fn)) {
                    _yuitest_coverline("build/frame/frame.js", 685);
fn();
                }
            } else {
                _yuitest_coverline("build/frame/frame.js", 688);
try {
                    _yuitest_coverline("build/frame/frame.js", 689);
Y.one('win').focus();
                    _yuitest_coverline("build/frame/frame.js", 690);
Y.later(100, this, function() {
                        _yuitest_coverfunc("build/frame/frame.js", "(anonymous 13)", 690);
_yuitest_coverline("build/frame/frame.js", 691);
if (this.getInstance()) {
                            _yuitest_coverline("build/frame/frame.js", 692);
if (this.getInstance().one('win')) {
                                _yuitest_coverline("build/frame/frame.js", 693);
this.getInstance().one('win').focus();
                            }
                        }
                        _yuitest_coverline("build/frame/frame.js", 696);
if (fn === true) {
                            _yuitest_coverline("build/frame/frame.js", 697);
this._handleFocus();
                        }
                        _yuitest_coverline("build/frame/frame.js", 699);
if (Y.Lang.isFunction(fn)) {
                            _yuitest_coverline("build/frame/frame.js", 700);
fn();
                        }
                    });
                } catch (ferr) {
                }
            }
            _yuitest_coverline("build/frame/frame.js", 706);
return this;
        },
        /**
        * @method show
        * @description Show the iframe instance
        * @return {Frame}
        * @chainable        
        */
        show: function() {
            _yuitest_coverfunc("build/frame/frame.js", "show", 714);
_yuitest_coverline("build/frame/frame.js", 715);
this._iframe.setStyles({
                position: 'static',
                left: ''
            });
            _yuitest_coverline("build/frame/frame.js", 719);
if (Y.UA.gecko) {
                _yuitest_coverline("build/frame/frame.js", 720);
try {
                    _yuitest_coverline("build/frame/frame.js", 721);
if (this.getInstance()) {
                        _yuitest_coverline("build/frame/frame.js", 722);
this.getInstance().config.doc.designMode = 'on';
                    }
                } catch (e) { }
                _yuitest_coverline("build/frame/frame.js", 725);
this.focus();
            }           
            _yuitest_coverline("build/frame/frame.js", 727);
return this;
        },
        /**
        * @method hide
        * @description Hide the iframe instance
        * @return {Frame}
        * @chainable        
        */
        hide: function() {
            _yuitest_coverfunc("build/frame/frame.js", "hide", 735);
_yuitest_coverline("build/frame/frame.js", 736);
this._iframe.setStyles({
                position: 'absolute',
                left: '-999999px'
            });
            _yuitest_coverline("build/frame/frame.js", 740);
return this;
        }
    }, {
        /**
        * @static
        * @property THROTTLE_TIME
        * @description The throttle time for key events in IE
        * @type Number
        * @default 100
        */
        THROTTLE_TIME: 100,
        /**
        * @static
        * @property DOM_EVENTS
        * @description The DomEvents that the frame automatically attaches and bubbles
        * @type Object
        */
        DOM_EVENTS: {
            dblclick: 1,
            click: 1,
            paste: 1,
            mouseup: 1,
            mousedown: 1,
            keyup: 1,
            keydown: 1,
            keypress: 1,
            activate: 1,
            deactivate: 1,
            beforedeactivate: 1,
            focusin: 1,
            focusout: 1
        },

        /**
        * @static
        * @property DEFAULT_CSS
        * @description The default css used when creating the document.
        * @type String
        */
        //DEFAULT_CSS: 'html { height: 95%; } body { padding: 7px; background-color: #fff; font: 13px/1.22 arial,helvetica,clean,sans-serif;*font-size:small;*font:x-small; } a, a:visited, a:hover { color: blue !important; text-decoration: underline !important; cursor: text !important; } img { cursor: pointer !important; border: none; }',
        DEFAULT_CSS: 'body { background-color: #fff; font: 13px/1.22 arial,helvetica,clean,sans-serif;*font-size:small;*font:x-small; } a, a:visited, a:hover { color: blue !important; text-decoration: underline !important; cursor: text !important; } img { cursor: pointer !important; border: none; }',
        /**
        * @static
        * @property HTML
        * @description The template string used to create the iframe
        * @type String
        */
        //HTML: '<iframe border="0" frameBorder="0" marginWidth="0" marginHeight="0" leftMargin="0" topMargin="0" allowTransparency="true" width="100%" height="99%"></iframe>',
        HTML: '<iframe border="0" frameBorder="0" marginWidth="0" marginHeight="0" leftMargin="0" topMargin="0" allowTransparency="true" width="100%" height="99%"></iframe>',
        /**
        * @static
        * @property PAGE_HTML
        * @description The template used to create the page when created dynamically.
        * @type String
        */
        PAGE_HTML: '<html dir="{DIR}" lang="{LANG}"><head><title>{TITLE}</title>{META}<base href="{BASE_HREF}"/>{LINKED_CSS}<style id="editor_css">{DEFAULT_CSS}</style>{EXTRA_CSS}</head><body>{CONTENT}</body></html>',

        /**
        * @static
        * @method getDocType
        * @description Parses document.doctype and generates a DocType to match the parent page, if supported.
        * For IE8, it grabs document.all[0].nodeValue and uses that. For IE < 8, it falls back to Frame.DOC_TYPE.
        * @return {String} The normalized DocType to apply to the iframe
        */
        getDocType: function() {
            _yuitest_coverfunc("build/frame/frame.js", "getDocType", 804);
_yuitest_coverline("build/frame/frame.js", 805);
var dt = Y.config.doc.doctype,
                str = Frame.DOC_TYPE;

            _yuitest_coverline("build/frame/frame.js", 808);
if (dt) {
                _yuitest_coverline("build/frame/frame.js", 809);
str = '<!DOCTYPE ' + dt.name + ((dt.publicId) ? ' ' + dt.publicId : '') + ((dt.systemId) ? ' ' + dt.systemId : '') + '>';
            } else {
                _yuitest_coverline("build/frame/frame.js", 811);
if (Y.config.doc.all) {
                    _yuitest_coverline("build/frame/frame.js", 812);
dt = Y.config.doc.all[0];
                    _yuitest_coverline("build/frame/frame.js", 813);
if (dt.nodeType) {
                        _yuitest_coverline("build/frame/frame.js", 814);
if (dt.nodeType === 8) {
                            _yuitest_coverline("build/frame/frame.js", 815);
if (dt.nodeValue) {
                                _yuitest_coverline("build/frame/frame.js", 816);
if (dt.nodeValue.toLowerCase().indexOf('doctype') !== -1) {
                                    _yuitest_coverline("build/frame/frame.js", 817);
str = '<!' + dt.nodeValue + '>';
                                }
                            }
                        }
                    }
                }
            }
            _yuitest_coverline("build/frame/frame.js", 824);
return str;
        },
        /**
        * @static
        * @property DOC_TYPE
        * @description The DOCTYPE to prepend to the new document when created. Should match the one on the page being served.
        * @type String
        */
        DOC_TYPE: '<!DOCTYPE HTML PUBLIC "-/'+'/W3C/'+'/DTD HTML 4.01/'+'/EN" "http:/'+'/www.w3.org/TR/html4/strict.dtd">',
        /**
        * @static
        * @property META
        * @description The meta-tag for Content-Type to add to the dynamic document
        * @type String
        */
        META: '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><meta http-equiv="X-UA-Compatible" content="IE=7">',
        //META: '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>',
        /**
        * @static
        * @property NAME
        * @description The name of the class (frame)
        * @type String
        */
        NAME: 'frame',
        ATTRS: {
            /**
            * @attribute title
            * @description The title to give the blank page.
            * @type String
            */
            title: {
                value: 'Blank Page'
            },
            /**
            * @attribute dir
            * @description The default text direction for this new frame. Default: ltr
            * @type String
            */
            dir: {
                value: 'ltr'
            },
            /**
            * @attribute lang
            * @description The default language. Default: en-US
            * @type String
            */
            lang: {
                value: 'en-US'
            },
            /**
            * @attribute src
            * @description The src of the iframe/window. Defaults to javascript:;
            * @type String
            */
            src: {
                //Hackish, IE needs the false in the Javascript URL
                value: 'javascript' + ((Y.UA.ie) ? ':false' : ':') + ';'
            },
            /**
            * @attribute designMode
            * @description Should designMode be turned on after creation.
            * @writeonce
            * @type Boolean
            */
            designMode: {
                writeOnce: true,
                value: false
            },
            /**
            * @attribute content
            * @description The string to inject into the body of the new frame/window.
            * @type String
            */
            content: {
                value: '<br>',
                setter: '_setHTML',
                getter: '_getHTML'
            },
            /**
            * @attribute basehref
            * @description The base href to use in the iframe.
            * @type String
            */
            basehref: {
                value: false,
                getter: '_resolveBaseHref'
            },
            /**
            * @attribute use
            * @description Array of modules to include in the scoped YUI instance at render time. Default: ['none', 'selector-css2']
            * @writeonce
            * @type Array
            */
            use: {
                writeOnce: true,
                value: ['node', 'node-style', 'selector-css3']
            },
            /**
            * @attribute container
            * @description The container to append the iFrame to on render.
            * @type String/HTMLElement/Node
            */
            container: {
                value: 'body',
                setter: function(n) {
                    _yuitest_coverfunc("build/frame/frame.js", "setter", 928);
_yuitest_coverline("build/frame/frame.js", 929);
return Y.one(n);
                }
            },
            /**
            * @attribute node
            * @description The Node instance of the iframe.
            * @type Node
            */
            node: {
                readOnly: true,
                value: null,
                getter: function() {
                    _yuitest_coverfunc("build/frame/frame.js", "getter", 940);
_yuitest_coverline("build/frame/frame.js", 941);
return this._iframe;
                }
            },
            /**
            * @attribute id
            * @description Set the id of the new Node. (optional)
            * @type String
            * @writeonce
            */
            id: {
                writeOnce: true,
                getter: function(id) {
                    _yuitest_coverfunc("build/frame/frame.js", "getter", 952);
_yuitest_coverline("build/frame/frame.js", 953);
if (!id) {
                        _yuitest_coverline("build/frame/frame.js", 954);
id = 'iframe-' + Y.guid();
                    }
                    _yuitest_coverline("build/frame/frame.js", 956);
return id;
                }
            },
            /**
            * @attribute linkedcss
            * @description An array of url's to external linked style sheets
            * @type String
            */
            linkedcss: {
                value: '',
                getter: '_getLinkedCSS',
                setter: '_setLinkedCSS'
            },
            /**
            * @attribute extracss
            * @description A string of CSS to add to the Head of the Editor
            * @type String
            */
            extracss: {
                value: '',
                setter: '_setExtraCSS'
            },
            /**
            * @attribute host
            * @description A reference to the Editor instance 
            * @type Object
            */
            host: {
                value: false
            },
            /**
            * @attribute defaultblock
            * @description The default tag to use for block level items, defaults to: p
            * @type String
            */            
            defaultblock: {
                value: 'p'
            }
        }
    });


    _yuitest_coverline("build/frame/frame.js", 998);
Y.Frame = Frame;



}, '@VERSION@', {"requires": ["base", "node", "selector-css3", "yui-throttle"]});
