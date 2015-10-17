YUI.add('frame', function(Y) {


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

    var Frame = function() {
        Frame.superclass.constructor.apply(this, arguments);
    }, LAST_CHILD = ':last-child', BODY = 'body';
    

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
            var win, doc, res, node;
            
            this._iframe = Y.Node.create(Frame.HTML);
            this._iframe.setStyle('visibility', 'hidden');
            this._iframe.set('src', this.get('src'));
            this.get('container').append(this._iframe);

            this._iframe.set('height', '99%');

            
            var html = '',
                extra_css = ((this.get('extracss')) ? '<style id="extra_css">' + this.get('extracss') + '</style>' : '');

            Y.log('Creating the document from javascript', 'info', 'frame');
            html = Y.substitute(Frame.PAGE_HTML, {
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
            if (Y.config.doc.compatMode != 'BackCompat') {
                Y.log('Adding Doctype to frame: ' + Frame.getDocType(), 'info', 'frame');
                
                //html = Frame.DOC_TYPE + "\n" + html;
                html = Frame.getDocType() + "\n" + html;
            } else {
                Y.log('DocType skipped because we are in BackCompat Mode.', 'warn', 'frame');
            }

            Y.log('Injecting content into iframe', 'info', 'frame');


            res = this._resolveWinDoc();
            res.doc.open();
            res.doc.write(html);
            res.doc.close();

            if (!res.doc.documentElement) {
                Y.log('document.documentElement was not found, running timer', 'warn', 'frame');
                var timer = Y.later(1, this, function() {
                    if (res.doc && res.doc.documentElement) {
                        Y.log('document.documentElement found inside timer', 'info', 'frame');
                        cb(res);
                        timer.cancel();
                    }
                }, null, true);
            } else {
                Y.log('document.documentElement found', 'info', 'frame');
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
            var config = (c) ? c : {};
            config.win = Y.Node.getDOMNode(this._iframe.get('contentWindow'));
            config.doc = Y.Node.getDOMNode(this._iframe.get('contentWindow.document'));
            if (!config.doc) {
                config.doc = Y.config.doc;
            }
            if (!config.win) {
                config.win = Y.config.win;
            }
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
            var xy, node;

            //Y.log('onDOMEvent: ' + e.type, 'info', 'frame');
            e.frameX = e.frameY = 0;

            if (e.pageX > 0 || e.pageY > 0) {
                if (e.type.substring(0, 3) !== 'key') {
                    node = this._instance.one('win');
                    xy = this._iframe.getXY();
                    e.frameX = xy[0] + e.pageX - node.get('scrollLeft');
                    e.frameY = xy[1] + e.pageY - node.get('scrollTop');
                }
            }

            e.frameTarget = e.target;
            e.frameCurrentTarget = e.currentTarget;
            e.frameEvent = e;

            this.fire('dom:' + e.type, e);
        },
        initializer: function() {
            this.publish('ready', {
                emitFacade: true,
                defaultFn: this._defReadyFn
            });
        },
        destructor: function() {
            var inst = this.getInstance();

            inst.one('doc').detachAll();
            inst = null;
            this._iframe.remove();
        },
        /**
        * @private
        * @method _DOMPaste
        * @description Simple pass thru handler for the paste event so we can do content cleanup
        * @param {Event.Facade} e
        */
        _DOMPaste: function(e) {
            var inst = this.getInstance(),
                data = '', win = inst.config.win;

            if (e._event.originalTarget) {
                data = e._event.originalTarget;
            }
            if (e._event.clipboardData) {
                data = e._event.clipboardData.getData('Text');
            }
            
            if (win.clipboardData) {
                data = win.clipboardData.getData('Text');
                if (data === '') { // Could be empty, or failed
                    // Verify failure
                    if (!win.clipboardData.setData('Text', data)) {
                        data = null;
                    }
                }
            }
            

            e.frameTarget = e.target;
            e.frameCurrentTarget = e.currentTarget;
            e.frameEvent = e;
            
            if (data) {
                e.clipboardData = {
                    data: data,
                    getData: function() {
                        return data;
                    }
                };
            } else {
                Y.log('Failed to collect clipboard data', 'warn', 'frame');
                e.clipboardData = null;
            }

            this.fire('dom:paste', e);
        },
        /**
        * @private
        * @method _defReadyFn
        * @description Binds DOM events, sets the iframe to visible and fires the ready event
        */
        _defReadyFn: function() {
            var inst = this.getInstance();

            Y.each(Frame.DOM_EVENTS, function(v, k) {
                var fn = Y.bind(this._onDomEvent, this),
                    kfn = ((Y.UA.ie) ? Y.throttle(fn, 200) : fn);

                if (!inst.Node.DOM_EVENTS[k]) {
                    inst.Node.DOM_EVENTS[k] = 1;
                }
                if (v === 1) {
                    if (k !== 'focus' && k !== 'blur' && k !== 'paste') {
                        //Y.log('Adding DOM event to frame: ' + k, 'info', 'frame');
                        if (k.substring(0, 3) === 'key') {
                            //Throttle key events in IE
                            inst.on(k, kfn, inst.config.doc);
                        } else {
                            inst.on(k, fn, inst.config.doc);
                        }
                    }
                }
            }, this);

            inst.Node.DOM_EVENTS.paste = 1;
            
            inst.on('paste', Y.bind(this._DOMPaste, this), inst.one('body'));

            //Adding focus/blur to the window object
            inst.on('focus', Y.bind(this._onDomEvent, this), inst.config.win);
            inst.on('blur', Y.bind(this._onDomEvent, this), inst.config.win);

            inst._use = inst.use;
            inst.use = Y.bind(this.use, this);
            this._iframe.setStyles({
                visibility: 'inherit'
            });
            inst.one('body').setStyle('display', 'block');
            if (Y.UA.ie) {
                this._fixIECursors();
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
            var inst = this.getInstance(),
                tables = inst.all('table'),
                brs = inst.all('br'), si;

            if (tables.size() && brs.size()) {
                //First Table
                si = tables.item(0).get('sourceIndex');
                brs.each(function(n) {
                    var p = n.get('parentNode'),
                        c = p.get('children'), b = p.all('>br');
                    
                    if (p.test('div')) {
                        if (c.size() > 2) {
                            n.replace(inst.Node.create('<wbr>'));
                        } else {
                            if (n.get('sourceIndex') > si) {
                                if (b.size()) {
                                    n.replace(inst.Node.create('<wbr>'));
                                }
                            } else {
                                if (b.size() > 1) {
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
            if (!this._ready) {
                this._ready = true;
                var inst = this.getInstance(),
                    args = Y.clone(this.get('use'));
                
                this.fire('contentready');

                Y.log('On available for body of iframe', 'info', 'frame');
                if (e) {
                    inst.config.doc = Y.Node.getDOMNode(e.target);
                }
                //TODO Circle around and deal with CSS loading...
                args.push(Y.bind(function() {
                    Y.log('Callback from final internal use call', 'info', 'frame');
                    if (inst.Selection) {
                        inst.Selection.DEFAULT_BLOCK_TAG = this.get('defaultblock');
                    }
                    //Moved to here so that the iframe is ready before allowing editing..
                    if (this.get('designMode')) {
                        if(Y.UA.ie) {
                            inst.config.doc.body.contentEditable = 'true';
                            this._ieSetBodyHeight();
                            inst.on('keyup', Y.bind(this._ieSetBodyHeight, this), inst.config.doc);
                        } else {
                            inst.config.doc.designMode = 'on';
                        }
                    }
                    this.fire('ready');
                }, this));
                Y.log('Calling use on internal instance: ' + args, 'info', 'frame');
                inst.use.apply(inst, args);

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
            if (!this._ieHeightCounter) {
                this._ieHeightCounter = 0;
            }
            this._ieHeightCounter++;
            var run = false;
            if (!e) {
                run = true;
            }
            if (e) {
                switch (e.keyCode) {
                    case 8:
                    case 13:
                        run = true;
                        break;
                }
                if (e.ctrlKey || e.shiftKey) {
                    run = true;
                }
            }
            if (run) {
                try {
                    var inst = this.getInstance();
                    var h = this._iframe.get('offsetHeight');
                    var bh = inst.config.doc.body.scrollHeight;
                    if (h > bh) {
                        h = (h - 15) + 'px';
                        inst.config.doc.body.style.height = h;
                    } else {
                        inst.config.doc.body.style.height = 'auto';
                    }
                } catch (e) {
                    if (this._ieHeightCounter < 100) {
                        Y.later(200, this, this._ieSetBodyHeight);
                    } else {
                        Y.log('Failed to set body height in IE', 'error', 'frame');
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
            if (!href || href === '') {
                href = Y.config.doc.location.href;
                if (href.indexOf('?') !== -1) { //Remove the query string
                    href = href.substring(0, href.indexOf('?'));
                }
                href = href.substring(0, href.lastIndexOf('/')) + '/';
            }
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
            if (this._ready) {
                var inst = this.getInstance();
                html = inst.one('body').get('innerHTML');
            }
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
            if (this._ready) {
                var inst = this.getInstance();
                inst.one('body').set('innerHTML', html);
            } else {
                //This needs to be wrapped in a contentready callback for the !_ready state
                this.on('contentready', Y.bind(function(html, e) {
                    var inst = this.getInstance();
                    inst.one('body').set('innerHTML', html);
                }, this, html));
            }
            return html;
        },
        /**
        * @private
        * @method _setLinkedCSS
        * @description Set's the linked CSS on the instance..
        */
        _getLinkedCSS: function(urls) {
            if (!Y.Lang.isArray(urls)) {
                urls = [urls];
            }
            var str = '';
            if (!this._ready) {
                Y.each(urls, function(v) {
                    if (v !== '') {
                        str += '<link rel="stylesheet" href="' + v + '" type="text/css">';
                    }
                });
            } else {
                str = urls;
            }
            return str;
        },
        /**
        * @private
        * @method _setLinkedCSS
        * @description Set's the linked CSS on the instance..
        */
        _setLinkedCSS: function(css) {
            if (this._ready) {
                var inst = this.getInstance();
                inst.Get.css(css);
            }
            return css;
        },
        /**
        * @private
        * @method _setExtraCSS
        * @description Set's the extra CSS on the instance..
        */
        _setExtraCSS: function(css) {
            if (this._ready) {
                var inst = this.getInstance(),
                    node = inst.one('#extra_css');
                
                node.remove();
                inst.one('head').append('<style id="extra_css">' + css + '</style>');
            }
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
            this._instance = inst;
            this._onContentReady();
            
            var doc = this._instance.config.doc;

            if (this.get('designMode')) {
                if (!Y.UA.ie) {
                    try {
                        //Force other browsers into non CSS styling
                        doc.execCommand('styleWithCSS', false, false);
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
            Y.log('Calling augmented use after ready', 'info', 'frame');
            var inst = this.getInstance(),
                args = Y.Array(arguments),
                cb = false;

            if (Y.Lang.isFunction(args[args.length - 1])) {
                cb = args.pop();
            }
            if (cb) {
                args.push(function() {
                    Y.log('Internal callback from augmented use', 'info', 'frame');
                    cb.apply(inst, arguments);

                });
            }
            inst._use.apply(inst, args);
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
            var inst = this.getInstance();
            if (!inst) {
                Y.log('Delegate events can not be attached until after the ready event has fired.', 'error', 'iframe');
                return false;
            }
            if (!sel) {
                sel = cont;
                cont = 'body';
            }
            return inst.delegate(type, fn, cont, sel);
        },
        /**
        * @method getInstance
        * @description Get a reference to the internal YUI instance.
        * @return {YUI} The internal YUI instance
        */
        getInstance: function() {
            return this._instance;
        },
        /**
        * @method render
        * @description Render the iframe into the container config option or open the window.
        * @param {String/HTMLElement/Node} node The node to render to
        * @return {Y.Frame}
        * @chainable
        */
        render: function(node) {
            if (this._rendered) {
                Y.log('Frame already rendered.', 'warn', 'frame');
                return this;
            }
            this._rendered = true;
            if (node) {
                this.set('container', node);
            }

            this._create(Y.bind(function(res) {

                var inst, timer,
                    cb = Y.bind(function(i) {
                        Y.log('Internal instance loaded with node-base', 'info', 'frame');
                        this._instanceLoaded(i);
                    }, this),
                    args = Y.clone(this.get('use')),
                    config = {
                        debug: false,
                        win: res.win,
                        doc: res.doc
                    },
                    fn = Y.bind(function() {
                        Y.log('New Modules Loaded into main instance', 'info', 'frame');
                        config = this._resolveWinDoc(config);
                        inst = YUI(config);
                        inst.log = Y.log; //Dump the instance logs to the parent instance.

                        Y.log('Creating new internal instance with node-base only', 'info', 'frame');
                        try {
                            inst.use('node-base', cb);
                            if (timer) {
                                clearInterval(timer);
                            }
                        } catch (e) {
                            timer = setInterval(function() {
                                Y.log('[TIMER] Internal use call failed, retrying', 'info', 'frame');
                                fn();
                            }, 350);
                            Y.log('Internal use call failed, retrying', 'info', 'frame');
                        }
                    }, this);

                args.push(fn);

                Y.log('Adding new modules to main instance: ' + args, 'info', 'frame');
                Y.use.apply(Y, args);

            }, this));

            return this;
        },
        /**
        * @private
        * @method _handleFocus
        * @description Does some tricks on focus to set the proper cursor position.
        */
        _handleFocus: function() {
            var inst = this.getInstance(),
                sel = new inst.Selection();

            if (sel.anchorNode) {
                Y.log('_handleFocus being called..', 'info', 'frame');
                var n = sel.anchorNode, c;
                
                if (n.test('p') && n.get('innerHTML') === '') {
                    n = n.get('parentNode');
                }
                c = n.get('childNodes');
                
                if (c.size()) {
                    if (c.item(0).test('br')) {
                        sel.selectNode(n, true, false);
                    } else if (c.item(0).test('p')) {
                        n = c.item(0).one('br.yui-cursor');
                        if (n) {
                            n = n.get('parentNode');
                        }
                        if (!n) {
                            n = c.item(0).get('firstChild');
                        }
                        if (!n) {
                            n = c.item(0);
                        }
                        if (n) {
                            sel.selectNode(n, true, false);
                        }
                    } else {
                        var b = inst.one('br.yui-cursor');
                        if (b) {
                            var par = b.get('parentNode');
                            if (par) {
                                sel.selectNode(par, true, false);
                            }
                        }
                    }
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
            if (Y.UA.ie) {
                try {
                    Y.one('win').focus();
                    this.getInstance().one('win').focus();
                } catch (ierr) {
                    Y.log('Frame focus failed', 'warn', 'frame');
                }
                if (fn === true) {
                    this._handleFocus();
                }
                if (Y.Lang.isFunction(fn)) {
                    fn();
                }
            } else {
                try {
                    Y.one('win').focus();
                    Y.later(100, this, function() {
                        this.getInstance().one('win').focus();
                        if (fn === true) {
                            this._handleFocus();
                        }
                        if (Y.Lang.isFunction(fn)) {
                            fn();
                        }
                    });
                } catch (ferr) {
                    Y.log('Frame focus failed', 'warn', 'frame');
                }
            }
            return this;
        },
        /**
        * @method show
        * @description Show the iframe instance
        * @return {Frame}
        * @chainable        
        */
        show: function() {
            this._iframe.setStyles({
                position: 'static',
                left: ''
            });
            if (Y.UA.gecko) {
                try {
                    this._instance.config.doc.designMode = 'on';
                } catch (e) { }
                this.focus();
            }           
            return this;
        },
        /**
        * @method hide
        * @description Hide the iframe instance
        * @return {Frame}
        * @chainable        
        */
        hide: function() {
            this._iframe.setStyles({
                position: 'absolute',
                left: '-999999px'
            });
            return this;
        }
    }, {
        
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
        * @returns {String} The normalized DocType to apply to the iframe
        */
        getDocType: function() {
            var dt = Y.config.doc.doctype,
                str = Frame.DOC_TYPE;

            if (dt) {
                str = '<!DOCTYPE ' + dt.name + ((dt.publicId) ? ' ' + dt.publicId : '') + ((dt.systemId) ? ' ' + dt.systemId : '') + '>';
            } else {
                if (Y.config.doc.all) {
                    dt = Y.config.doc.all[0];
                    if (dt.nodeType) {
                        if (dt.nodeType === 8) {
                            if (dt.nodeValue) {
                                if (dt.nodeValue.toLowerCase().indexOf('doctype') !== -1) {
                                    str = '<!' + dt.nodeValue + '>';
                                }
                            }
                        }
                    }
                }
            }
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
                value: ['substitute', 'node', 'node-style', 'selector-css3']
            },
            /**
            * @attribute container
            * @description The container to append the iFrame to on render.
            * @type String/HTMLElement/Node
            */
            container: {
                value: 'body',
                setter: function(n) {
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
                    if (!id) {
                        id = 'iframe-' + Y.guid();
                    }
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


    Y.Frame = Frame;



}, '@VERSION@' ,{skinnable:false, requires:['base', 'node', 'selector-css3', 'substitute']});
YUI.add('selection', function(Y) {

    /**
     * Wraps some common Selection/Range functionality into a simple object
     * @class Selection
     * @constructor
     * @module editor
     * @submodule selection
     */
    
    //TODO This shouldn't be there, Y.Node doesn't normalize getting textnode content.
    var textContent = 'textContent',
    INNER_HTML = 'innerHTML',
    FONT_FAMILY = 'fontFamily';

    if (Y.UA.ie) {
        textContent = 'nodeValue';
    }

    Y.Selection = function(domEvent) {
        var sel, par, ieNode, nodes, rng, i;

        if (Y.config.win.getSelection) {
	        sel = Y.config.win.getSelection();
        } else if (Y.config.doc.selection) {
    	    sel = Y.config.doc.selection.createRange();
        }
        this._selection = sel;

        if (sel.pasteHTML) {
            this.isCollapsed = (sel.compareEndPoints('StartToEnd', sel)) ? false : true;
            if (this.isCollapsed) {
                this.anchorNode = this.focusNode = Y.one(sel.parentElement());

                if (domEvent) {
                    ieNode = Y.config.doc.elementFromPoint(domEvent.clientX, domEvent.clientY);
                }
                rng = sel.duplicate();
                if (!ieNode) {
                    par = sel.parentElement();
                    nodes = par.childNodes;

                    for (i = 0; i < nodes.length; i++) {
                        //This causes IE to not allow a selection on a doubleclick
                        //rng.select(nodes[i]);
                        if (rng.inRange(sel)) {
                            if (!ieNode) {
                                ieNode = nodes[i];
                            }
                        }
                    }
                }

                this.ieNode = ieNode;
                
                if (ieNode) {
                    if (ieNode.nodeType !== 3) {
                        if (ieNode.firstChild) {
                            ieNode = ieNode.firstChild;
                        }
                        if (ieNode && ieNode.tagName && ieNode.tagName.toLowerCase() === 'body') {
                            if (ieNode.firstChild) {
                                ieNode = ieNode.firstChild;
                            }
                        }
                    }
                    this.anchorNode = this.focusNode = Y.Selection.resolve(ieNode);
                    
                    rng.moveToElementText(sel.parentElement());
                    var comp = sel.compareEndPoints('StartToStart', rng),
                    moved = 0;
                    if (comp) {
                        //We are not at the beginning of the selection.
                        //Setting the move to something large, may need to increase it later
                        moved = Math.abs(sel.move('character', -9999));
                    }
                    
                    this.anchorOffset = this.focusOffset = moved;
                    
                    this.anchorTextNode = this.focusTextNode = Y.one(ieNode);
                }
                
                
            } else {
                //This helps IE deal with a selection and nodeChange events
                if (sel.htmlText && sel.htmlText !== '') {
                    var n = Y.Node.create(sel.htmlText);
                    if (n && n.get('id')) {
                        var id = n.get('id');
                        this.anchorNode = this.focusNode = Y.one('#' + id);
                    } else if (n) {
                        n = n.get('childNodes');
                        this.anchorNode = this.focusNode = n.item(0);
                    }
                }
            }

            //var self = this;
            //debugger;
        } else {
            this.isCollapsed = sel.isCollapsed;
            this.anchorNode = Y.Selection.resolve(sel.anchorNode);
            this.focusNode = Y.Selection.resolve(sel.focusNode);
            this.anchorOffset = sel.anchorOffset;
            this.focusOffset = sel.focusOffset;
            
            this.anchorTextNode = Y.one(sel.anchorNode);
            this.focusTextNode = Y.one(sel.focusNode);
        }
        if (Y.Lang.isString(sel.text)) {
            this.text = sel.text;
        } else {
            if (sel.toString) {
                this.text = sel.toString();
            } else {
                this.text = '';
            }
        }
    };
    
    /**
    * Utility method to remove dead font-family styles from an element.
    * @static
    * @method removeFontFamily
    */
    Y.Selection.removeFontFamily = function(n) {
        n.removeAttribute('face');
        var s = n.getAttribute('style').toLowerCase();
        if (s === '' || (s == 'font-family: ')) {
            n.removeAttribute('style');
        }
        if (s.match(Y.Selection.REG_FONTFAMILY)) {
            s = s.replace(Y.Selection.REG_FONTFAMILY, '');
            n.setAttribute('style', s);
        }
    };

    /**
    * Performs a prefilter on all nodes in the editor. Looks for nodes with a style: fontFamily or font face
    * It then creates a dynamic class assigns it and removed the property. This is so that we don't lose
    * the fontFamily when selecting nodes.
    * @static
    * @method filter
    */
    Y.Selection.filter = function(blocks) {
        var startTime = (new Date()).getTime();
        Y.log('Filtering nodes', 'info', 'selection');

        var nodes = Y.all(Y.Selection.ALL),
            baseNodes = Y.all('strong,em'),
            doc = Y.config.doc, hrs,
            classNames = {}, cssString = '',
            ls;

        var startTime1 = (new Date()).getTime();
        nodes.each(function(n) {
            var raw = Y.Node.getDOMNode(n);
            if (raw.style[FONT_FAMILY]) {
                classNames['.' + n._yuid] = raw.style[FONT_FAMILY];
                n.addClass(n._yuid);

                Y.Selection.removeFontFamily(raw);
            }
            /*
            if (n.getStyle(FONT_FAMILY)) {
                classNames['.' + n._yuid] = n.getStyle(FONT_FAMILY);
                n.addClass(n._yuid);
                n.removeAttribute('face');
                n.setStyle(FONT_FAMILY, '');
                if (n.getAttribute('style') === '') {
                    n.removeAttribute('style');
                }
                //This is for IE
                if (n.getAttribute('style').toLowerCase() === 'font-family: ') {
                    n.removeAttribute('style');
                }
            }
            */
        });
        var endTime1 = (new Date()).getTime();
        Y.log('Node Filter Timer: ' + (endTime1 - startTime1) + 'ms', 'info', 'selection');

        Y.all('.hr').addClass('yui-skip').addClass('yui-non');
        
        if (Y.UA.ie) {
            hrs = doc.getElementsByTagName('hr');
            Y.each(hrs, function(hr) {
                var el = doc.createElement('div');
                    el.className = 'hr yui-non yui-skip';
                    
                    el.setAttribute('readonly', true);
                    el.setAttribute('contenteditable', false); //Keep it from being Edited
                    if (hr.parentNode) {
                        hr.parentNode.replaceChild(el, hr);
                    }
                    //Had to move to inline style. writes for ie's < 8. They don't render el.setAttribute('style');
                    var s = el.style;
                    s.border = '1px solid #ccc';
                    s.lineHeight = '0';
                    s.fontSize = '0';
                    s.marginTop = '5px';
                    s.marginBottom = '5px';
                    s.marginLeft = '0px';
                    s.marginRight = '0px';
                    s.padding = '0';
            });
        }
        

        Y.each(classNames, function(v, k) {
            cssString += k + ' { font-family: ' + v.replace(/"/gi, '') + '; }';
        });
        Y.StyleSheet(cssString, 'editor');

        
        //Not sure about this one?
        baseNodes.each(function(n, k) {
            var t = n.get('tagName').toLowerCase(),
                newTag = 'i';
            if (t === 'strong') {
                newTag = 'b';
            }
            Y.Selection.prototype._swap(baseNodes.item(k), newTag);
        });

        //Filter out all the empty UL/OL's
        ls = Y.all('ol,ul');
        ls.each(function(v, k) {
            var lis = v.all('li');
            if (!lis.size()) {
                v.remove();
            }
        });
        
        if (blocks) {
            Y.Selection.filterBlocks();
        }
        var endTime = (new Date()).getTime();
        Y.log('Filter Timer: ' + (endTime - startTime) + 'ms', 'info', 'selection');
    };

    /**
    * Method attempts to replace all "orphined" text nodes in the main body by wrapping them with a <p>. Called from filter.
    * @static
    * @method filterBlocks
    */
    Y.Selection.filterBlocks = function() {
        var startTime = (new Date()).getTime();
        Y.log('RAW filter blocks', 'info', 'selection');
        var childs = Y.config.doc.body.childNodes, i, node, wrapped = false, doit = true,
            sel, single, br, divs, spans, c, s;

        if (childs) {
            for (i = 0; i < childs.length; i++) {
                node = Y.one(childs[i]);
                if (!node.test(Y.Selection.BLOCKS)) {
                    doit = true;
                    if (childs[i].nodeType == 3) {
                        c = childs[i][textContent].match(Y.Selection.REG_CHAR);
                        s = childs[i][textContent].match(Y.Selection.REG_NON);
                        if (c === null && s) {
                            doit = false;
                            
                        }
                    }
                    if (doit) {
                        if (!wrapped) {
                            wrapped = [];
                        }
                        wrapped.push(childs[i]);
                    }
                } else {
                    wrapped = Y.Selection._wrapBlock(wrapped);
                }
            }
            wrapped = Y.Selection._wrapBlock(wrapped);
        }

        single = Y.all(Y.Selection.DEFAULT_BLOCK_TAG);
        if (single.size() === 1) {
            Y.log('Only One default block tag (' + Y.Selection.DEFAULT_BLOCK_TAG + '), focus it..', 'info', 'selection');
            br = single.item(0).all('br');
            if (br.size() === 1) {
                if (!br.item(0).test('.yui-cursor')) {
                    br.item(0).remove();
                }
                var html = single.item(0).get('innerHTML');
                if (html === '' || html === ' ') {
                    Y.log('Paragraph empty, focusing cursor', 'info', 'selection');
                    single.set('innerHTML', Y.Selection.CURSOR);
                    sel = new Y.Selection();
                    sel.focusCursor(true, true);
                }
                if (br.item(0).test('.yui-cursor') && Y.UA.ie) {
                    br.item(0).remove();
                }
            }
        } else {
            single.each(function(p) {
                var html = p.get('innerHTML');
                if (html === '') {
                    Y.log('Empty Paragraph Tag Found, Removing It', 'info', 'selection');
                    p.remove();
                }
            });
        }
        
        if (!Y.UA.ie) {
            /*
            divs = Y.all('div, p');
            divs.each(function(d) {
                if (d.hasClass('yui-non')) {
                    return;
                }
                var html = d.get('innerHTML');
                if (html === '') {
                    Y.log('Empty DIV/P Tag Found, Removing It', 'info', 'selection');
                    d.remove();
                } else {
                    Y.log('DIVS/PS Count: ' + d.get('childNodes').size(), 'info', 'selection');
                    if (d.get('childNodes').size() == 1) {
                        Y.log('This Div/P only has one Child Node', 'info', 'selection');
                        if (d.ancestor('p')) {
                            Y.log('This Div/P is a child of a paragraph, remove it..', 'info', 'selection');
                            d.replace(d.get('firstChild'));
                        }
                    }
                }
            });*/

            /** Removed this, as it was causing Pasting to be funky in Safari
            spans = Y.all('.Apple-style-span, .apple-style-span');
            Y.log('Apple Spans found: ' + spans.size(), 'info', 'selection');
            spans.each(function(s) {
                s.setAttribute('style', '');
            });
            */
        }


        var endTime = (new Date()).getTime();
        Y.log('FilterBlocks Timer: ' + (endTime - startTime) + 'ms', 'info', 'selection');
    };

    /**
    * Regular Expression used to find dead font-family styles
    * @static
    * @property REG_FONTFAMILY
    */   
    Y.Selection.REG_FONTFAMILY = /font-family: ;/;

    /**
    * Regular Expression to determine if a string has a character in it
    * @static
    * @property REG_CHAR
    */   
    Y.Selection.REG_CHAR = /[a-zA-Z-0-9_!@#\$%\^&*\(\)-=_+\[\]\\{}|;':",.\/<>\?]/gi;

    /**
    * Regular Expression to determine if a string has a non-character in it
    * @static
    * @property REG_NON
    */
    Y.Selection.REG_NON = /[\s\S|\n|\t]/gi;

    /**
    * Regular Expression to remove all HTML from a string
    * @static
    * @property REG_NOHTML
    */
    Y.Selection.REG_NOHTML = /<\S[^><]*>/g;


    /**
    * Wraps an array of elements in a Block level tag
    * @static
    * @private
    * @method _wrapBlock
    */
    Y.Selection._wrapBlock = function(wrapped) {
        if (wrapped) {
            var newChild = Y.Node.create('<' + Y.Selection.DEFAULT_BLOCK_TAG + '></' + Y.Selection.DEFAULT_BLOCK_TAG + '>'),
                firstChild = Y.one(wrapped[0]), i;

            for (i = 1; i < wrapped.length; i++) {
                newChild.append(wrapped[i]);
            }
            firstChild.replace(newChild);
            newChild.prepend(firstChild);
        }
        return false;
    };

    /**
    * Undoes what filter does enough to return the HTML from the Editor, then re-applies the filter.
    * @static
    * @method unfilter
    * @return {String} The filtered HTML
    */
    Y.Selection.unfilter = function() {
        var nodes = Y.all('body [class]'),
            html = '', nons, ids,
            body = Y.one('body');
        
        Y.log('UnFiltering nodes', 'info', 'selection');
        
        nodes.each(function(n) {
            if (n.hasClass(n._yuid)) {
                //One of ours
                n.setStyle(FONT_FAMILY, n.getStyle(FONT_FAMILY));
                n.removeClass(n._yuid);
                if (n.getAttribute('class') === '') {
                    n.removeAttribute('class');
                }
            }
        });

        nons = Y.all('.yui-non');
        nons.each(function(n) {
            if (!n.hasClass('yui-skip') && n.get('innerHTML') === '') {
                n.remove();
            } else {
                n.removeClass('yui-non').removeClass('yui-skip');
            }
        });

        ids = Y.all('body [id]');
        ids.each(function(n) {
            if (n.get('id').indexOf('yui_3_') === 0) {
                n.removeAttribute('id');
                n.removeAttribute('_yuid');
            }
        });
        
        if (body) {
            html = body.get('innerHTML');
        }
        
        Y.all('.hr').addClass('yui-skip').addClass('yui-non');
        
        /*
        nodes.each(function(n) {
            n.addClass(n._yuid);
            n.setStyle(FONT_FAMILY, '');
            if (n.getAttribute('style') === '') {
                n.removeAttribute('style');
            }
        });
        */
        
        return html;
    };
    /**
    * Resolve a node from the selection object and return a Node instance
    * @static
    * @method resolve
    * @param {HTMLElement} n The HTMLElement to resolve. Might be a TextNode, gives parentNode.
    * @return {Node} The Resolved node
    */
    Y.Selection.resolve = function(n) {
        if (n && n.nodeType === 3) {
            //Adding a try/catch here because in rare occasions IE will
            //Throw a error accessing the parentNode of a stranded text node.
            //In the case of Ctrl+Z (Undo)
            try {
                n = n.parentNode;
            } catch (re) {
                n = 'body';
            }
        }
        return Y.one(n);
    };

    /**
    * Returns the innerHTML of a node with all HTML tags removed.
    * @static
    * @method getText
    * @param {Node} node The Node instance to remove the HTML from
    * @return {String} The string of text
    */
    Y.Selection.getText = function(node) {
        var txt = node.get('innerHTML').replace(Y.Selection.REG_NOHTML, '');
        //Clean out the cursor subs to see if the Node is empty
        txt = txt.replace('<span><br></span>', '').replace('<br>', '');
        return txt;
    };

    //Y.Selection.DEFAULT_BLOCK_TAG = 'div';
    Y.Selection.DEFAULT_BLOCK_TAG = 'p';

    /**
    * The selector to use when looking for Nodes to cache the value of: [style],font[face]
    * @static
    * @property ALL
    */
    Y.Selection.ALL = '[style],font[face]';

    /**
    * The selector to use when looking for block level items.
    * @static
    * @property BLOCKS
    */
    Y.Selection.BLOCKS = 'p,div,ul,ol,table,style';
    /**
    * The temporary fontname applied to a selection to retrieve their values: yui-tmp
    * @static
    * @property TMP
    */
    Y.Selection.TMP = 'yui-tmp';
    /**
    * The default tag to use when creating elements: span
    * @static
    * @property DEFAULT_TAG
    */
    Y.Selection.DEFAULT_TAG = 'span';

    /**
    * The id of the outer cursor wrapper
    * @static
    * @property DEFAULT_TAG
    */
    Y.Selection.CURID = 'yui-cursor';

    /**
    * The id used to wrap the inner space of the cursor position
    * @static
    * @property CUR_WRAPID
    */
    Y.Selection.CUR_WRAPID = 'yui-cursor-wrapper';

    /**
    * The default HTML used to focus the cursor..
    * @static
    * @property CURSOR
    */
    Y.Selection.CURSOR = '<span><br class="yui-cursor"></span>';

    Y.Selection.hasCursor = function() {
        var cur = Y.all('#' + Y.Selection.CUR_WRAPID);
        Y.log('Has Cursor: ' + cur.size(), 'info', 'selection');
        return cur.size();
    };

    /**
    * Called from Editor keydown to remove the "extra" space before the cursor.
    * @static
    * @method cleanCursor
    */
    Y.Selection.cleanCursor = function() {
        //Y.log('Cleaning Cursor', 'info', 'Selection');
        var cur, sel = 'br.yui-cursor';
        cur = Y.all(sel);
        if (cur.size()) {
            cur.each(function(b) {
                var c = b.get('parentNode.parentNode.childNodes'), html;
                if (c.size()) {
                    b.remove();
                } else {
                    html = Y.Selection.getText(c.item(0));
                    if (html !== '') {
                        b.remove();
                    }
                }
            });
        }
        /*
        var cur = Y.all('#' + Y.Selection.CUR_WRAPID);
        if (cur.size()) {
            cur.each(function(c) {
                var html = c.get('innerHTML');
                if (html == '&nbsp;' || html == '<br>') {
                    if (c.previous() || c.next()) {
                        c.remove();
                    }
                }
            });
        }
        */
    };

    Y.Selection.prototype = {
        /**
        * Range text value
        * @property text
        * @type String
        */
        text: null,
        /**
        * Flag to show if the range is collapsed or not
        * @property isCollapsed
        * @type Boolean
        */
        isCollapsed: null,
        /**
        * A Node instance of the parentNode of the anchorNode of the range
        * @property anchorNode
        * @type Node
        */
        anchorNode: null,
        /**
        * The offset from the range object
        * @property anchorOffset
        * @type Number
        */
        anchorOffset: null,
        /**
        * A Node instance of the actual textNode of the range.
        * @property anchorTextNode
        * @type Node
        */
        anchorTextNode: null,
        /**
        * A Node instance of the parentNode of the focusNode of the range
        * @property focusNode
        * @type Node
        */
        focusNode: null,
        /**
        * The offset from the range object
        * @property focusOffset
        * @type Number
        */
        focusOffset: null,
        /**
        * A Node instance of the actual textNode of the range.
        * @property focusTextNode
        * @type Node
        */
        focusTextNode: null,
        /**
        * The actual Selection/Range object
        * @property _selection
        * @private
        */
        _selection: null,
        /**
        * Wrap an element, with another element 
        * @private
        * @method _wrap
        * @param {HTMLElement} n The node to wrap 
        * @param {String} tag The tag to use when creating the new element.
        * @return {HTMLElement} The wrapped node
        */
        _wrap: function(n, tag) {
            var tmp = Y.Node.create('<' + tag + '></' + tag + '>');
            tmp.set(INNER_HTML, n.get(INNER_HTML));
            n.set(INNER_HTML, '');
            n.append(tmp);
            return Y.Node.getDOMNode(tmp);
        },
        /**
        * Swap an element, with another element 
        * @private
        * @method _swap
        * @param {HTMLElement} n The node to swap 
        * @param {String} tag The tag to use when creating the new element.
        * @return {HTMLElement} The new node
        */
        _swap: function(n, tag) {
            var tmp = Y.Node.create('<' + tag + '></' + tag + '>');
            tmp.set(INNER_HTML, n.get(INNER_HTML));
            n.replace(tmp, n);
            return Y.Node.getDOMNode(tmp);
        },
        /**
        * Get all the nodes in the current selection. This method will actually perform a filter first.
        * Then it calls doc.execCommand('fontname', null, 'yui-tmp') to touch all nodes in the selection.
        * The it compiles a list of all nodes affected by the execCommand and builds a NodeList to return.
        * @method getSelected
        * @return {NodeList} A NodeList of all items in the selection.
        */
        getSelected: function() {
            Y.Selection.filter();
            Y.config.doc.execCommand('fontname', null, Y.Selection.TMP);
            var nodes = Y.all(Y.Selection.ALL),
                items = [];
            
            nodes.each(function(n, k) {
                if (n.getStyle(FONT_FAMILY) ==  Y.Selection.TMP) {
                    n.setStyle(FONT_FAMILY, '');
                    Y.Selection.removeFontFamily(n);
                    if (!n.test('body')) {
                        items.push(Y.Node.getDOMNode(nodes.item(k)));
                    }
                }
            });
            return Y.all(items);
        },
        /**
        * Insert HTML at the current cursor position and return a Node instance of the newly inserted element.
        * @method insertContent
        * @param {String} html The HTML to insert.
        * @return {Node} The inserted Node.
        */
        insertContent: function(html) {
            return this.insertAtCursor(html, this.anchorTextNode, this.anchorOffset, true);
        },
        /**
        * Insert HTML at the current cursor position, this method gives you control over the text node to insert into and the offset where to put it.
        * @method insertAtCursor
        * @param {String} html The HTML to insert.
        * @param {Node} node The text node to break when inserting.
        * @param {Number} offset The left offset of the text node to break and insert the new content.
        * @param {Boolean} collapse Should the range be collapsed after insertion. default: false
        * @return {Node} The inserted Node.
        */
        insertAtCursor: function(html, node, offset, collapse) {
            var cur = Y.Node.create('<' + Y.Selection.DEFAULT_TAG + ' class="yui-non"></' + Y.Selection.DEFAULT_TAG + '>'),
                inHTML, txt, txt2, newNode, range = this.createRange(), b;

            if (node && node.test('body')) {
                b = Y.Node.create('<span></span>');
                node.append(b);
                node = b;
            }

            
            if (range.pasteHTML) {
                if (offset === 0 && node && !node.previous() && node.get('nodeType') === 3) {
                    /**
                    * For some strange reason, range.pasteHTML fails if the node is a textNode and
                    * the offset is 0. (The cursor is at the beginning of the line)
                    * It will always insert the new content at position 1 instead of 
                    * position 0. Here we test for that case and do it the hard way.
                    */
                    node.insert(html, 'before');
                    if (range.moveToElementText) {
                        range.moveToElementText(Y.Node.getDOMNode(node.previous()));
                    }
                    //Move the cursor after the new node
                    range.collapse(false);
                    range.select();
                    return node.previous();
                } else {
                    newNode = Y.Node.create(html);
                    try {
                        range.pasteHTML('<span id="rte-insert"></span>');
                    } catch (e) {}
                    inHTML = Y.one('#rte-insert');
                    if (inHTML) {
                        inHTML.set('id', '');
                        inHTML.replace(newNode);
                        if (range.moveToElementText) {
                            range.moveToElementText(Y.Node.getDOMNode(newNode));
                        }
                        range.collapse(false);
                        range.select();
                        return newNode;
                    } else {
                        Y.on('available', function() {
                            inHTML.set('id', '');
                            inHTML.replace(newNode);
                            if (range.moveToElementText) {
                                range.moveToElementText(Y.Node.getDOMNode(newNode));
                            }
                            range.collapse(false);
                            range.select();
                        }, '#rte-insert');
                    }
                }
            } else {
                //TODO using Y.Node.create here throws warnings & strips first white space character
                //txt = Y.one(Y.Node.create(inHTML.substr(0, offset)));
                //txt2 = Y.one(Y.Node.create(inHTML.substr(offset)));
                if (offset > 0) {
                    inHTML = node.get(textContent);

                    txt = Y.one(Y.config.doc.createTextNode(inHTML.substr(0, offset)));
                    txt2 = Y.one(Y.config.doc.createTextNode(inHTML.substr(offset)));

                    node.replace(txt, node);
                    newNode = Y.Node.create(html);
                    if (newNode.get('nodeType') === 11) {
                        b = Y.Node.create('<span></span>');
                        b.append(newNode);
                        newNode = b;
                    }
                    txt.insert(newNode, 'after');
                    //if (txt2 && txt2.get('length')) {
                    if (txt2) {
                        newNode.insert(cur, 'after');
                        cur.insert(txt2, 'after');
                        this.selectNode(cur, collapse);
                    }
                } else {
                    if (node.get('nodeType') === 3) {
                        node = node.get('parentNode');
                    }
                    newNode = Y.Node.create(html);
                    html = node.get('innerHTML').replace(/\n/gi, '');
                    if (html === '' || html === '<br>') {
                        node.append(newNode);
                    } else {
                        if (newNode.get('parentNode')) {
                            node.insert(newNode, 'before');
                        } else {
                            Y.one('body').prepend(newNode);
                        }
                    }
                    if (node.get('firstChild').test('br')) {
                        node.get('firstChild').remove();
                    }
                }
            }
            return newNode;
        },
        /**
        * Get all elements inside a selection and wrap them with a new element and return a NodeList of all elements touched.
        * @method wrapContent
        * @param {String} tag The tag to wrap all selected items with.
        * @return {NodeList} A NodeList of all items in the selection.
        */
        wrapContent: function(tag) {
            tag = (tag) ? tag : Y.Selection.DEFAULT_TAG;

            if (!this.isCollapsed) {
                Y.log('Wrapping selection with: ' + tag, 'info', 'selection');
                var items = this.getSelected(),
                    changed = [], range, last, first, range2;

                items.each(function(n, k) {
                    var t = n.get('tagName').toLowerCase();
                    if (t === 'font') {
                        changed.push(this._swap(items.item(k), tag));
                    } else {
                        changed.push(this._wrap(items.item(k), tag));
                    }
                }, this);
                
		        range = this.createRange();
                first = changed[0];
                last = changed[changed.length - 1];
                if (this._selection.removeAllRanges) {
                    range.setStart(changed[0], 0);
                    range.setEnd(last, last.childNodes.length);
                    this._selection.removeAllRanges();
                    this._selection.addRange(range);
                } else {
                    if (range.moveToElementText) {
                        range.moveToElementText(Y.Node.getDOMNode(first));
                        range2 = this.createRange();
                        range2.moveToElementText(Y.Node.getDOMNode(last));
                        range.setEndPoint('EndToEnd', range2);
                    }
                    range.select();
                }

                changed = Y.all(changed);
                Y.log('Returning NodeList with (' + changed.size() + ') item(s)' , 'info', 'selection');
                return changed;


            } else {
                Y.log('Can not wrap a collapsed selection, use insertContent', 'error', 'selection');
                return Y.all([]);
            }
        },
        /**
        * Find and replace a string inside a text node and replace it with HTML focusing the node after 
        * to allow you to continue to type.
        * @method replace
        * @param {String} se The string to search for.
        * @param {String} re The string of HTML to replace it with.
        * @return {Node} The node inserted.
        */
        replace: function(se,re) {
            Y.log('replacing (' + se + ') with (' + re + ')');
            var range = this.createRange(), node, txt, index, newNode;

            if (range.getBookmark) {
                index = range.getBookmark();
                txt = this.anchorNode.get('innerHTML').replace(se, re);
                this.anchorNode.set('innerHTML', txt);
                range.moveToBookmark(index);
                newNode = Y.one(range.parentElement());
            } else {
                node = this.anchorTextNode;
                txt = node.get(textContent);
                index = txt.indexOf(se);

                txt = txt.replace(se, '');
                node.set(textContent, txt);
                newNode = this.insertAtCursor(re, node, index, true);
            }
            return newNode;
        },
        /**
        * Destroy the range.
        * @method remove
        * @chainable
        * @return {Y.Selection}
        */
        remove: function() {
            this._selection.removeAllRanges();
            return this;
        },
        /**
        * Wrapper for the different range creation methods.
        * @method createRange
        * @return {RangeObject}
        */
        createRange: function() {
            if (Y.config.doc.selection) {
                return Y.config.doc.selection.createRange();
            } else {
		        return Y.config.doc.createRange();
            }
        },
        /**
        * Select a Node (hilighting it).
        * @method selectNode
        * @param {Node} node The node to select
        * @param {Boolean} collapse Should the range be collapsed after insertion. default: false
        * @chainable
        * @return {Y.Selection}
        */
        selectNode: function(node, collapse, end) {
            if (!node) {
                Y.log('Node passed to selectNode is null', 'error', 'selection');
                return;
            }
            end = end || 0;
            node = Y.Node.getDOMNode(node);
		    var range = this.createRange();
            if (range.selectNode) {
                range.selectNode(node);
                this._selection.removeAllRanges();
                this._selection.addRange(range);
                if (collapse) {
                    try {
                        this._selection.collapse(node, end);
                    } catch (err) {
                        this._selection.collapse(node, 0);
                    }
                }
            } else {
                if (node.nodeType === 3) {
                    node = node.parentNode;
                }
                try {
                    range.moveToElementText(node);
                } catch(e) {}
                if (collapse) {
                    range.collapse(((end) ? false : true));
                }
                range.select();
            }
            return this;
        },
        /**
        * Put a placeholder in the DOM at the current cursor position.
        * @method setCursor
        * @return {Node}
        */
        setCursor: function() {
            this.removeCursor(false);
            return this.insertContent(Y.Selection.CURSOR);
        },
        /**
        * Get the placeholder in the DOM at the current cursor position.
        * @method getCursor
        * @return {Node}
        */
        getCursor: function() {
            return Y.all('#' + Y.Selection.CURID);
        },
        /**
        * Remove the cursor placeholder from the DOM.
        * @method removeCursor
        * @param {Boolean} keep Setting this to true will keep the node, but remove the unique parts that make it the cursor.
        * @return {Node}
        */
        removeCursor: function(keep) {
            var cur = this.getCursor();
            if (cur) {
                if (keep) {
                    cur.removeAttribute('id');
                    cur.set('innerHTML', '<br class="yui-cursor">');
                } else {
                    cur.remove();
                }
            }
            return cur;
        },
        /**
        * Gets a stored cursor and focuses it for editing, must be called sometime after setCursor
        * @method focusCursor
        * @return {Node}
        */
        focusCursor: function(collapse, end) {
            if (collapse !== false) {
                collapse = true;
            }
            if (end !== false) {
                end = true;
            }
            var cur = this.removeCursor(true);
            if (cur) {
                cur.each(function(c) {
                    this.selectNode(c, collapse, end);
                }, this);
            }
        },
        /**
        * Generic toString for logging.
        * @method toString
        * @return {String}
        */
        toString: function() {
            return 'Selection Object';
        }
    };


}, '@VERSION@' ,{skinnable:false, requires:['node']});
YUI.add('exec-command', function(Y) {


    /**
     * Plugin for the frame module to handle execCommands for Editor
     * @class Plugin.ExecCommand
     * @extends Base
     * @constructor
     * @module editor
     * @submodule exec-command
     */
        var ExecCommand = function() {
            ExecCommand.superclass.constructor.apply(this, arguments);
        };

        Y.extend(ExecCommand, Y.Base, {
            /**
            * An internal reference to the keyCode of the last key that was pressed.
            * @private
            * @property _lastKey
            */
            _lastKey: null,
            /**
            * An internal reference to the instance of the frame plugged into.
            * @private
            * @property _inst
            */
            _inst: null,
            /**
            * Execute a command on the frame's document.
            * @method command
            * @param {String} action The action to perform (bold, italic, fontname)
            * @param {String} value The optional value (helvetica)
            * @return {Node/NodeList} Should return the Node/Nodelist affected
            */
            command: function(action, value) {
                var fn = ExecCommand.COMMANDS[action];
                
                Y.log('execCommand(' + action + '): "' + value + '"', 'info', 'exec-command');
                if (fn) {
                    return fn.call(this, action, value);
                } else {
                    return this._command(action, value);
                }
            },
            /**
            * The private version of execCommand that doesn't filter for overrides.
            * @private
            * @method _command
            * @param {String} action The action to perform (bold, italic, fontname)
            * @param {String} value The optional value (helvetica)
            */
            _command: function(action, value) {
                var inst = this.getInstance();
                try {
                    try {
                        inst.config.doc.execCommand('styleWithCSS', null, 1);
                    } catch (e1) {
                        try {
                            inst.config.doc.execCommand('useCSS', null, 0);
                        } catch (e2) {
                        }
                    }
                    Y.log('Internal execCommand(' + action + '): "' + value + '"', 'info', 'exec-command');
                    inst.config.doc.execCommand(action, null, value);
                } catch (e) {
                    Y.log(e.message, 'error', 'exec-command');
                }
            },
            /**
            * Get's the instance of YUI bound to the parent frame
            * @method getInstance
            * @return {YUI} The YUI instance bound to the parent frame
            */
            getInstance: function() {
                if (!this._inst) {
                    this._inst = this.get('host').getInstance();
                }
                return this._inst;
            },
            initializer: function() {
                Y.mix(this.get('host'), {
                    execCommand: function(action, value) {
                        return this.exec.command(action, value);
                    },
                    _execCommand: function(action, value) {
                        return this.exec._command(action, value);
                    }
                });

                this.get('host').on('dom:keypress', Y.bind(function(e) {
                    this._lastKey = e.keyCode;
                }, this));
            }
        }, {
            /**
            * execCommand
            * @property NAME
            * @static
            */
            NAME: 'execCommand',
            /**
            * exec
            * @property NS
            * @static
            */
            NS: 'exec',
            ATTRS: {
                host: {
                    value: false
                }
            },
            /**
            * Static object literal of execCommand overrides
            * @property COMMANDS
            * @static
            */
            COMMANDS: {
                /**
                * Wraps the content with a new element of type (tag)
                * @method COMMANDS.wrap
                * @static
                * @param {String} cmd The command executed: wrap
                * @param {String} tag The tag to wrap the selection with
                * @return {NodeList} NodeList of the items touched by this command.
                */
                wrap: function(cmd, tag) {
                    var inst = this.getInstance();
                    return (new inst.Selection()).wrapContent(tag);
                },
                /**
                * Inserts the provided HTML at the cursor, should be a single element.
                * @method COMMANDS.inserthtml
                * @static
                * @param {String} cmd The command executed: inserthtml
                * @param {String} html The html to insert
                * @return {Node} Node instance of the item touched by this command.
                */
                inserthtml: function(cmd, html) {
                    var inst = this.getInstance();
                    if (inst.Selection.hasCursor() || Y.UA.ie) {
                        return (new inst.Selection()).insertContent(html);
                    } else {
                        this._command('inserthtml', html);
                    }
                },
                /**
                * Inserts the provided HTML at the cursor, and focuses the cursor afterwards.
                * @method COMMANDS.insertandfocus
                * @static
                * @param {String} cmd The command executed: insertandfocus
                * @param {String} html The html to insert
                * @return {Node} Node instance of the item touched by this command.
                */
                insertandfocus: function(cmd, html) {
                    var inst = this.getInstance(), out, sel;
                    if (inst.Selection.hasCursor()) {
                        html += inst.Selection.CURSOR;
                        out = this.command('inserthtml', html);
                        sel = new inst.Selection();
                        sel.focusCursor(true, true);
                    } else {
                        this.command('inserthtml', html);
                    }
                    return out;
                },
                /**
                * Inserts a BR at the current cursor position
                * @method COMMANDS.insertbr
                * @static
                * @param {String} cmd The command executed: insertbr
                */
                insertbr: function(cmd) {
                    var inst = this.getInstance(),
                        sel = new inst.Selection(),
                        html = '<var>|</var>', last = null,
                        q = (Y.UA.webkit) ? 'span.Apple-style-span,var' : 'var';

                    if (sel._selection.pasteHTML) {
                        sel._selection.pasteHTML(html);
                    } else {
                        this._command('inserthtml', html);
                    }

                    var insert = function(n) {
                        var c = inst.Node.create('<br>');
                        n.insert(c, 'before');
                        return c;
                    };

                    inst.all(q).each(function(n) {
                        var g = true;   
                        if (Y.UA.webkit) {
                            g = false;
                            if (n.get('innerHTML') === '|') {
                                g = true;
                            }
                        }
                        if (g) {
                            last = insert(n);
                            if ((!last.previous() || !last.previous().test('br')) && Y.UA.gecko) {
                                var s = last.cloneNode();
                                last.insert(s, 'after');
                                last = s;
                            }
                            n.remove();
                        }
                    });
                    if (Y.UA.webkit && last) {
                        insert(last);
                        sel.selectNode(last);
                    }
                },
                /**
                * Inserts an image at the cursor position
                * @method COMMANDS.insertimage
                * @static
                * @param {String} cmd The command executed: insertimage
                * @param {String} img The url of the image to be inserted
                * @return {Node} Node instance of the item touched by this command.
                */
                insertimage: function(cmd, img) {
                    return this.command('inserthtml', '<img src="' + img + '">');
                },
                /**
                * Add a class to all of the elements in the selection
                * @method COMMANDS.addclass
                * @static
                * @param {String} cmd The command executed: addclass
                * @param {String} cls The className to add
                * @return {NodeList} NodeList of the items touched by this command.
                */
                addclass: function(cmd, cls) {
                    var inst = this.getInstance();
                    return (new inst.Selection()).getSelected().addClass(cls);
                },
                /**
                * Remove a class from all of the elements in the selection
                * @method COMMANDS.removeclass
                * @static
                * @param {String} cmd The command executed: removeclass
                * @param {String} cls The className to remove
                * @return {NodeList} NodeList of the items touched by this command.
                */
                removeclass: function(cmd, cls) {
                    var inst = this.getInstance();
                    return (new inst.Selection()).getSelected().removeClass(cls);
                },
                /**
                * Adds a forecolor to the current selection, or creates a new element and applies it
                * @method COMMANDS.forecolor
                * @static
                * @param {String} cmd The command executed: forecolor
                * @param {String} val The color value to apply
                * @return {NodeList} NodeList of the items touched by this command.
                */
                forecolor: function(cmd, val) {
                    var inst = this.getInstance(),
                        sel = new inst.Selection(), n;

                    if (!Y.UA.ie) {
                        this._command('useCSS', false);
                    }
                    if (inst.Selection.hasCursor()) {
                        if (sel.isCollapsed) {
                            if (sel.anchorNode && (sel.anchorNode.get('innerHTML') === '&nbsp;')) {
                                sel.anchorNode.setStyle('color', val);
                                n = sel.anchorNode;
                            } else {
                                n = this.command('inserthtml', '<span style="color: ' + val + '">' + inst.Selection.CURSOR + '</span>');
                                sel.focusCursor(true, true);
                            }
                            return n;
                        } else {
                            return this._command(cmd, val);
                        }
                    } else {
                        this._command(cmd, val);
                    }
                },
                /**
                * Adds a background color to the current selection, or creates a new element and applies it
                * @method COMMANDS.backcolor
                * @static
                * @param {String} cmd The command executed: backcolor
                * @param {String} val The color value to apply
                * @return {NodeList} NodeList of the items touched by this command.
                */
                backcolor: function(cmd, val) {
                    var inst = this.getInstance(),
                        sel = new inst.Selection(), n;
                    
                    if (Y.UA.gecko || Y.UA.opera) {
                        cmd = 'hilitecolor';
                    }
                    if (!Y.UA.ie) {
                        this._command('useCSS', false);
                    }
                    if (inst.Selection.hasCursor()) {
                        if (sel.isCollapsed) {
                            if (sel.anchorNode && (sel.anchorNode.get('innerHTML') === '&nbsp;')) {
                                sel.anchorNode.setStyle('backgroundColor', val);
                                n = sel.anchorNode;
                            } else {
                                n = this.command('inserthtml', '<span style="background-color: ' + val + '">' + inst.Selection.CURSOR + '</span>');
                                sel.focusCursor(true, true);
                            }
                            return n;
                        } else {
                            return this._command(cmd, val);
                        }
                    } else {
                        this._command(cmd, val);
                    }
                },
                /**
                * Sugar method, calles backcolor
                * @method COMMANDS.hilitecolor
                * @static
                * @param {String} cmd The command executed: backcolor
                * @param {String} val The color value to apply
                * @return {NodeList} NodeList of the items touched by this command.
                */
                hilitecolor: function() {
                    return ExecCommand.COMMANDS.backcolor.apply(this, arguments);
                },
                /**
                * Adds a font name to the current selection, or creates a new element and applies it
                * @method COMMANDS.fontname2
                * @deprecated
                * @static
                * @param {String} cmd The command executed: fontname
                * @param {String} val The font name to apply
                * @return {NodeList} NodeList of the items touched by this command.
                */
                fontname2: function(cmd, val) {
                    this._command('fontname', val);
                    var inst = this.getInstance(),
                        sel = new inst.Selection();
                    
                    if (sel.isCollapsed && (this._lastKey != 32)) {
                        if (sel.anchorNode.test('font')) {
                            sel.anchorNode.set('face', val);
                        }
                    }
                },
                /**
                * Adds a fontsize to the current selection, or creates a new element and applies it
                * @method COMMANDS.fontsize2
                * @deprecated
                * @static
                * @param {String} cmd The command executed: fontsize
                * @param {String} val The font size to apply
                * @return {NodeList} NodeList of the items touched by this command.
                */
                fontsize2: function(cmd, val) {
                    this._command('fontsize', val);

                    var inst = this.getInstance(),
                        sel = new inst.Selection();
                    
                    if (sel.isCollapsed && sel.anchorNode && (this._lastKey != 32)) {
                        if (Y.UA.webkit) {
                            if (sel.anchorNode.getStyle('lineHeight')) {
                                sel.anchorNode.setStyle('lineHeight', '');
                            }
                        }
                        if (sel.anchorNode.test('font')) {
                            sel.anchorNode.set('size', val);
                        } else if (Y.UA.gecko) {
                            var p = sel.anchorNode.ancestor(inst.Selection.DEFAULT_BLOCK_TAG);
                            if (p) {
                                p.setStyle('fontSize', '');
                            }
                        }
                    }
                },
                /**
                * Overload for COMMANDS.list
                * @method COMMANDS.insertorderedlist
                * @static
                * @param {String} cmd The command executed: list, ul
                */
                insertunorderedlist: function(cmd) {
                    this.command('list', 'ul');
                },
                /**
                * Overload for COMMANDS.list
                * @method COMMANDS.insertunorderedlist
                * @static
                * @param {String} cmd The command executed: list, ol
                */
                insertorderedlist: function(cmd) {
                    this.command('list', 'ol');
                },
                /**
                * Noramlizes lists creation/destruction for IE. All others pass through to native calls
                * @method COMMANDS.list
                * @static
                * @param {String} cmd The command executed: list (not used)
                * @param {String} tag The tag to deal with
                */
                list: function(cmd, tag) {
                    var inst = this.getInstance(), html,
                        DIR = 'dir', cls = 'yui3-touched',
                        dir, range, div, elm, n, str, s, par, list, lis,
                        sel = new inst.Selection();

                    cmd = 'insert' + ((tag === 'ul') ? 'un' : '') + 'orderedlist';
                    
                    if (Y.UA.ie && !sel.isCollapsed) {
                        range = sel._selection;
                        html = range.htmlText;
                        div = inst.Node.create(html);
                        if (div.test('li') || div.one('li')) {
                            this._command(cmd, null);
                            return;
                        }
                        if (div.test(tag)) {
                            elm = range.item ? range.item(0) : range.parentElement();
                            n = inst.one(elm);
                            lis = n.all('li');

                            str = '<div>';
                            lis.each(function(l) {
                                str += l.get('innerHTML') + '<br>';
                            });
                            str += '</div>';
                            s = inst.Node.create(str);
                            if (n.get('parentNode').test('div')) {
                                n = n.get('parentNode');
                            }
                            if (n && n.hasAttribute(DIR)) {
                                s.setAttribute(DIR, n.getAttribute(DIR));
                            }
                            n.replace(s);
                            if (range.moveToElementText) {
                                range.moveToElementText(s._node);
                            }
                            range.select();
                        } else {
                            par = Y.one(range.parentElement());
                            if (!par.test(inst.Selection.BLOCKS)) {
                                par = par.ancestor(inst.Selection.BLOCKS);
                            }
                            if (par) {
                                if (par.hasAttribute(DIR)) {
                                    dir = par.getAttribute(DIR);
                                }
                            }
                            if (html.indexOf('<br>') > -1) {
                                html = html.split(/<br>/i);
                            } else {
                                var tmp = inst.Node.create(html),
                                ps = tmp.all('p');

                                if (ps.size()) {
                                    html = [];
                                    ps.each(function(n) {
                                        html.push(n.get('innerHTML'));
                                    });
                                } else {
                                    html = [html];
                                }
                            }
                            list = '<' + tag + ' id="ie-list">';
                            Y.each(html, function(v) {
                                var a = inst.Node.create(v);
                                if (a.test('p')) {
                                    if (a.hasAttribute(DIR)) {
                                        dir = a.getAttribute(DIR);
                                    }
                                    v = a.get('innerHTML');
                                }
                                list += '<li>' + v + '</li>';
                            });
                            list += '</' + tag + '>';
                            range.pasteHTML(list);
                            elm = inst.config.doc.getElementById('ie-list');
                            elm.id = '';
                            if (dir) {
                                elm.setAttribute(DIR, dir);
                            }
                            if (range.moveToElementText) {
                                range.moveToElementText(elm);
                            }
                            range.select();
                        }
                    } else if (Y.UA.ie) {
                        par = inst.one(sel._selection.parentElement());
                        if (par.test('p')) {
                            if (par && par.hasAttribute(DIR)) {
                                dir = par.getAttribute(DIR);
                            }
                            html = Y.Selection.getText(par);
                            if (html === '') {
                                var sdir = '';
                                if (dir) {
                                    sdir = ' dir="' + dir + '"';
                                }
                                list = inst.Node.create(Y.Lang.sub('<{tag}{dir}><li></li></{tag}>', { tag: tag, dir: sdir }));
                                par.replace(list);
                                sel.selectNode(list.one('li'));
                            } else {
                                this._command(cmd, null);
                            }
                        } else {
                            this._command(cmd, null);
                        }
                    } else {
                        inst.all(tag).addClass(cls);
                        if (sel.anchorNode.test(inst.Selection.BLOCKS)) {
                            par = sel.anchorNode;
                        } else {
                            par = sel.anchorNode.ancestor(inst.Selection.BLOCKS);
                        }
                        if (par && par.hasAttribute(DIR)) {
                            dir = par.getAttribute(DIR);
                        }
                        this._command(cmd, null);
                        list = inst.all(tag);
                        if (dir) {
                            list.each(function(n) {
                                if (!n.hasClass(cls)) {
                                    n.setAttribute(DIR, dir);
                                }
                            });
                        }
                        list.removeClass(cls);
                    }
                },
                /**
                * Noramlizes alignment for Webkit Browsers
                * @method COMMANDS.justify
                * @static
                * @param {String} cmd The command executed: justify (not used)
                * @param {String} val The actual command from the justify{center,all,left,right} stubs
                */
                justify: function(cmd, val) {
                    if (Y.UA.webkit) {
                        var inst = this.getInstance(),
                            sel = new inst.Selection(),
                            aNode = sel.anchorNode;

                            var bgColor = aNode.getStyle('backgroundColor');
                            this._command(val);
                            sel = new inst.Selection();
                            if (sel.anchorNode.test('div')) {
                                var html = '<span>' + sel.anchorNode.get('innerHTML') + '</span>';
                                sel.anchorNode.set('innerHTML', html);
                                sel.anchorNode.one('span').setStyle('backgroundColor', bgColor);
                                sel.selectNode(sel.anchorNode.one('span'));
                            }
                    } else {
                        this._command(val);
                    }
                },
                /**
                * Override method for COMMANDS.justify
                * @method COMMANDS.justifycenter
                * @static
                */
                justifycenter: function(cmd) {
                    this.command('justify', 'justifycenter');
                },
                /**
                * Override method for COMMANDS.justify
                * @method COMMANDS.justifyleft
                * @static
                */
                justifyleft: function(cmd) {
                    this.command('justify', 'justifyleft');
                },
                /**
                * Override method for COMMANDS.justify
                * @method COMMANDS.justifyright
                * @static
                */
                justifyright: function(cmd) {
                    this.command('justify', 'justifyright');
                },
                /**
                * Override method for COMMANDS.justify
                * @method COMMANDS.justifyfull
                * @static
                */
                justifyfull: function(cmd) {
                    this.command('justify', 'justifyfull');
                }
            }
        });
        
        /**
        * This method is meant to normalize IE's in ability to exec the proper command on elements with CSS styling.
        * @method fixIETags
        * @protected
        * @param {String} cmd The command to execute
        * @param {String} tag The tag to create
        * @param {String} rule The rule that we are looking for.
        */
        var fixIETags = function(cmd, tag, rule) {
            var inst = this.getInstance(),
                doc = inst.config.doc,
                sel = doc.selection.createRange(),
                o = doc.queryCommandValue(cmd),
                html, reg, m, p, d, s, c;

            if (o) {
                html = sel.htmlText;
                reg = new RegExp(rule, 'g');
                m = html.match(reg);

                if (m) {
                    html = html.replace(rule + ';', '').replace(rule, '');

                    sel.pasteHTML('<var id="yui-ie-bs">');

                    p = doc.getElementById('yui-ie-bs');
                    d = doc.createElement('div');
                    s = doc.createElement(tag);
                    
                    d.innerHTML = html;
                    if (p.parentNode !== inst.config.doc.body) {
                        p = p.parentNode;
                    }

                    c = d.childNodes;

                    p.parentNode.replaceChild(s, p);

                    Y.each(c, function(f) {
                        s.appendChild(f);
                    });
                    sel.collapse();
                    if (sel.moveToElementText) {
                        sel.moveToElementText(s);
                    }
                    sel.select();
                }
            }
            this._command(cmd);
        };

        if (Y.UA.ie) {
            ExecCommand.COMMANDS.bold = function() {
                fixIETags.call(this, 'bold', 'b', 'FONT-WEIGHT: bold');
            };
            ExecCommand.COMMANDS.italic = function() {
                fixIETags.call(this, 'italic', 'i', 'FONT-STYLE: italic');
            };
            ExecCommand.COMMANDS.underline = function() {
                fixIETags.call(this, 'underline', 'u', 'TEXT-DECORATION: underline');
            };
        }

        Y.namespace('Plugin');
        Y.Plugin.ExecCommand = ExecCommand;



}, '@VERSION@' ,{skinnable:false, requires:['frame']});
YUI.add('editor-tab', function(Y) {


    /**
     * Handles tab and shift-tab indent/outdent support.
     * @class Plugin.EditorTab
     * @constructor
     * @extends Base
     * @module editor
     * @submodule editor-tab
     */
    
    var EditorTab = function() {
        EditorTab.superclass.constructor.apply(this, arguments);
    }, HOST = 'host';

    Y.extend(EditorTab, Y.Base, {
        /**
        * Listener for host's nodeChange event and captures the tabkey interaction.
        * @private
        * @method _onNodeChange
        * @param {Event} e The Event facade passed from the host.
        */
        _onNodeChange: function(e) {
            var action = 'indent';

            if (e.changedType === 'tab') {
                if (!e.changedNode.test('li, li *')) {
                    e.changedEvent.halt();
                    e.preventDefault();
                    if (e.changedEvent.shiftKey) {
                        action = 'outdent';
                    }

                    Y.log('Overriding TAB to ' + action, 'info', 'editorTab');
                    this.get(HOST).execCommand(action, '');
                }
            }
        },
        initializer: function() {
            this.get(HOST).on('nodeChange', Y.bind(this._onNodeChange, this));
        }
    }, {
        /**
        * editorTab
        * @property NAME
        * @static
        */
        NAME: 'editorTab',
        /**
        * tab
        * @property NS
        * @static
        */
        NS: 'tab',
        ATTRS: {
            host: {
                value: false
            }
        }
    });


    Y.namespace('Plugin');

    Y.Plugin.EditorTab = EditorTab;


}, '@VERSION@' ,{skinnable:false, requires:['editor-base']});
YUI.add('createlink-base', function(Y) {


    /**
     * Adds prompt style link creation. Adds an override for the <a href="Plugin.ExecCommand.html#method_COMMANDS.createlink">createlink execCommand</a>.
     * @class Plugin.CreateLinkBase
     * @static
     * @submodule createlink-base
     * @module editor
     */
    
    var CreateLinkBase = {};
    /**
    * Strings used by the plugin
    * @property STRINGS
    * @static
    */
    CreateLinkBase.STRINGS = {
            /**
            * String used for the Prompt
            * @property PROMPT
            * @static
            */
            PROMPT: 'Please enter the URL for the link to point to:',
            /**
            * String used as the default value of the Prompt
            * @property DEFAULT
            * @static
            */
            DEFAULT: 'http://'
    };

    Y.namespace('Plugin');
    Y.Plugin.CreateLinkBase = CreateLinkBase;

    Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
        /**
        * Override for the createlink method from the <a href="Plugin.CreateLinkBase.html">CreateLinkBase</a> plugin.
        * @for ExecCommand
        * @method COMMANDS.createlink
        * @static
        * @param {String} cmd The command executed: createlink
        * @return {Node} Node instance of the item touched by this command.
        */
        createlink: function(cmd) {
            var inst = this.get('host').getInstance(), out, a, sel, holder,
                url = prompt(CreateLinkBase.STRINGS.PROMPT, CreateLinkBase.STRINGS.DEFAULT);

            if (url) {
                holder = inst.config.doc.createElement('div');
                url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                url = inst.config.doc.createTextNode(url);
                holder.appendChild(url);
                url = holder.innerHTML;

                Y.log('Adding link: ' + url, 'info', 'createLinkBase');

                this.get('host')._execCommand(cmd, url);
                sel = new inst.Selection();
                out = sel.getSelected();
                if (!sel.isCollapsed && out.size()) {
                    //We have a selection
                    a = out.item(0).one('a');
                    if (a) {
                        out.item(0).replace(a);
                    }
                    if (Y.UA.gecko) {
                        if (a.get('parentNode').test('span')) {
                            if (a.get('parentNode').one('br.yui-cursor')) {
                                a.get('parentNode').insert(a, 'before');
                            }
                        }
                    }
                } else {
                    //No selection, insert a new node..
                    this.get('host').execCommand('inserthtml', '<a href="' + url + '">' + url + '</a>');
                }
            }
            return a;
        }
    });



}, '@VERSION@' ,{skinnable:false, requires:['editor-base']});
YUI.add('editor-base', function(Y) {


    /**
     * Base class for Editor. Handles the business logic of Editor, no GUI involved only utility methods and events.
     *
     *      var editor = new Y.EditorBase({
     *          content: 'Foo'
     *      });
     *      editor.render('#demo');
     *
     * @main editor
     */     
    /**
     * Base class for Editor. Handles the business logic of Editor, no GUI involved only utility methods and events.
     * @class EditorBase
     * @for EditorBase
     * @extends Base
     * @module editor
     * @submodule editor-base
     * @constructor
     */
    
    var EditorBase = function() {
        EditorBase.superclass.constructor.apply(this, arguments);
    }, LAST_CHILD = ':last-child', BODY = 'body';

    Y.extend(EditorBase, Y.Base, {
        /**
        * Internal reference to the Y.Frame instance
        * @property frame
        */
        frame: null,
        initializer: function() {
            var frame = new Y.Frame({
                designMode: true,
                title: EditorBase.STRINGS.title,
                use: EditorBase.USE,
                dir: this.get('dir'),
                extracss: this.get('extracss'),
                linkedcss: this.get('linkedcss'),
                defaultblock: this.get('defaultblock'),
                host: this
            }).plug(Y.Plugin.ExecCommand);


            frame.after('ready', Y.bind(this._afterFrameReady, this));
            frame.addTarget(this);

            this.frame = frame;

            this.publish('nodeChange', {
                emitFacade: true,
                bubbles: true,
                defaultFn: this._defNodeChangeFn
            });
            
            //this.plug(Y.Plugin.EditorPara);
        },
        destructor: function() {
            this.frame.destroy();

            this.detachAll();
        },
        /**
        * Copy certain styles from one node instance to another (used for new paragraph creation mainly)
        * @method copyStyles
        * @param {Node} from The Node instance to copy the styles from 
        * @param {Node} to The Node instance to copy the styles to
        */
        copyStyles: function(from, to) {
            if (from.test('a')) {
                //Don't carry the A styles
                return;
            }
            var styles = ['color', 'fontSize', 'fontFamily', 'backgroundColor', 'fontStyle' ],
                newStyles = {};

            Y.each(styles, function(v) {
                newStyles[v] = from.getStyle(v);
            });
            if (from.ancestor('b,strong')) {
                newStyles.fontWeight = 'bold';
            }
            if (from.ancestor('u')) {
                if (!newStyles.textDecoration) {
                    newStyles.textDecoration = 'underline';
                }
            }
            to.setStyles(newStyles);
        },
        /**
        * Holder for the selection bookmark in IE.
        * @property _lastBookmark
        * @private
        */
        _lastBookmark: null,
        /**
        * Resolves the e.changedNode in the nodeChange event if it comes from the document. If
        * the event came from the document, it will get the last child of the last child of the document
        * and return that instead.
        * @method _resolveChangedNode
        * @param {Node} n The node to resolve
        * @private
        */
        _resolveChangedNode: function(n) {
            var inst = this.getInstance(), lc, lc2, found;
            if (inst && n && n.test('html')) {
                lc = inst.one(BODY).one(LAST_CHILD);
                while (!found) {
                    if (lc) {
                        lc2 = lc.one(LAST_CHILD);
                        if (lc2) {
                            lc = lc2;
                        } else {
                            found = true;
                        }
                    } else {
                        found = true;
                    }
                }
                if (lc) {
                    if (lc.test('br')) {
                        if (lc.previous()) {
                            lc = lc.previous();
                        } else {
                            lc = lc.get('parentNode');
                        }
                    }
                    if (lc) {
                        n = lc;
                    }
                }
                
            }
            return n;
        },
        /**
        * The default handler for the nodeChange event.
        * @method _defNodeChangeFn
        * @param {Event} e The event
        * @private
        */
        _defNodeChangeFn: function(e) {
            var startTime = (new Date()).getTime();
            //Y.log('Default nodeChange function: ' + e.changedType, 'info', 'editor');
            var inst = this.getInstance(), sel, cur,
                btag = inst.Selection.DEFAULT_BLOCK_TAG;

            if (Y.UA.ie) {
                try {
                    sel = inst.config.doc.selection.createRange();
                    if (sel.getBookmark) {
                        this._lastBookmark = sel.getBookmark();
                    }
                } catch (ie) {}
            }

            e.changedNode = this._resolveChangedNode(e.changedNode);

            /*
            * @TODO
            * This whole method needs to be fixed and made more dynamic.
            * Maybe static functions for the e.changeType and an object bag
            * to walk through and filter to pass off the event to before firing..
            */
            
            switch (e.changedType) {
                case 'keydown':
                    if (!Y.UA.gecko) {
                        if (!EditorBase.NC_KEYS[e.changedEvent.keyCode] && !e.changedEvent.shiftKey && !e.changedEvent.ctrlKey && (e.changedEvent.keyCode !== 13)) {
                            //inst.later(100, inst, inst.Selection.cleanCursor);
                        }
                    }
                    break;
                case 'tab':
                    if (!e.changedNode.test('li, li *') && !e.changedEvent.shiftKey) {
                        e.changedEvent.frameEvent.preventDefault();
                        Y.log('Overriding TAB key to insert HTML: HALTING', 'info', 'editor');
                        if (Y.UA.webkit) {
                            this.execCommand('inserttext', '\t');
                        } else if (Y.UA.gecko) {
                            this.frame.exec._command('inserthtml', EditorBase.TABKEY);
                        } else if (Y.UA.ie) {
                            sel = new inst.Selection();
                            if (sel._selection.pasteHTML) {
                                sel._selection.pasteHTML(EditorBase.TABKEY);
                            } else {
                                console.log('IE9 is here.. SHould be default behaviour now');
                                this.execCommand('inserthtml', EditorBase.TABKEY);
                            }
                        }
                    }
                    break;
            }
            if (Y.UA.webkit && e.commands && (e.commands.indent || e.commands.outdent)) {
                /**
                * When executing execCommand 'indent or 'outdent' Webkit applies
                * a class to the BLOCKQUOTE that adds left/right margin to it
                * This strips that style so it is just a normal BLOCKQUOTE
                */
                var bq = inst.all('.webkit-indent-blockquote');
                if (bq.size()) {
                    bq.setStyle('margin', '');
                }
            }

            var changed = this.getDomPath(e.changedNode, false),
                cmds = {}, family, fsize, classes = [],
                fColor = '', bColor = '';

            if (e.commands) {
                cmds = e.commands;
            }
            
            Y.each(changed, function(el) {
                var tag = el.tagName.toLowerCase(),
                    cmd = EditorBase.TAG2CMD[tag];

                if (cmd) {
                    cmds[cmd] = 1;
                }

                //Bold and Italic styles
                var s = el.currentStyle || el.style;
                if ((''+s.fontWeight) == 'bold') { //Cast this to a string
                    cmds.bold = 1;
                }
                if (Y.UA.ie) {
                    if (s.fontWeight > 400) {
                        cmds.bold = 1;
                    }
                }
                if (s.fontStyle == 'italic') {
                    cmds.italic = 1;
                }
                if (s.textDecoration == 'underline') {
                    cmds.underline = 1;
                }
                if (s.textDecoration == 'line-through') {
                    cmds.strikethrough = 1;
                }
                
                var n = inst.one(el);
                if (n.getStyle('fontFamily')) {
                    var family2 = n.getStyle('fontFamily').split(',')[0].toLowerCase();
                    if (family2) {
                        family = family2;
                    }
                    if (family) {
                        family = family.replace(/'/g, '').replace(/"/g, '');
                    }
                }

                fsize = EditorBase.NORMALIZE_FONTSIZE(n);


                var cls = el.className.split(' ');

                Y.each(cls, function(v) {
                    if (v !== '' && (v.substr(0, 4) !== 'yui_')) {
                        classes.push(v);
                    }
                });

                fColor = EditorBase.FILTER_RGB(n.getStyle('color'));
                var bColor2 = EditorBase.FILTER_RGB(s.backgroundColor);
                if (bColor2 !== 'transparent') {
                    if (bColor2 !== '') {
                        bColor = bColor2;
                    }
                }
                
            });
            
            e.dompath = inst.all(changed);
            e.classNames = classes;
            e.commands = cmds;

            //TODO Dont' like this, not dynamic enough..
            if (!e.fontFamily) {
                e.fontFamily = family;
            }
            if (!e.fontSize) {
                e.fontSize = fsize;
            }
            if (!e.fontColor) {
                e.fontColor = fColor;
            }
            if (!e.backgroundColor) {
                e.backgroundColor = bColor;
            }

            var endTime = (new Date()).getTime();
            Y.log('_defNodeChangeTimer 2: ' + (endTime - startTime) + 'ms', 'info', 'selection');
        },
        /**
        * Walk the dom tree from this node up to body, returning a reversed array of parents.
        * @method getDomPath
        * @param {Node} node The Node to start from 
        */
        getDomPath: function(node, nodeList) {
			var domPath = [], domNode,
                inst = this.frame.getInstance();

            domNode = inst.Node.getDOMNode(node);
            //return inst.all(domNode);

            while (domNode !== null) {
                
                if ((domNode === inst.config.doc.documentElement) || (domNode === inst.config.doc) || !domNode.tagName) {
                    domNode = null;
                    break;
                }
                
                if (!inst.DOM.inDoc(domNode)) {
                    domNode = null;
                    break;
                }
                
                //Check to see if we get el.nodeName and nodeType
                if (domNode.nodeName && domNode.nodeType && (domNode.nodeType == 1)) {
                    domPath.push(domNode);
                }

                if (domNode == inst.config.doc.body) {
                    domNode = null;
                    break;
                }

                domNode = domNode.parentNode;
            }

            /*{{{ Using Node 
            while (node !== null) {
                if (node.test('html') || node.test('doc') || !node.get('tagName')) {
                    node = null;
                    break;
                }
                if (!node.inDoc()) {
                    node = null;
                    break;
                }
                //Check to see if we get el.nodeName and nodeType
                if (node.get('nodeName') && node.get('nodeType') && (node.get('nodeType') == 1)) {
                    domPath.push(inst.Node.getDOMNode(node));
                }

                if (node.test('body')) {
                    node = null;
                    break;
                }

                node = node.get('parentNode');
            }
            }}}*/

            if (domPath.length === 0) {
                domPath[0] = inst.config.doc.body;
            }

            if (nodeList) {
                return inst.all(domPath.reverse());
            } else {
                return domPath.reverse();
            }

        },
        /**
        * After frame ready, bind mousedown & keyup listeners
        * @method _afterFrameReady
        * @private
        */
        _afterFrameReady: function() {
            var inst = this.frame.getInstance();
            
            this.frame.on('dom:mouseup', Y.bind(this._onFrameMouseUp, this));
            this.frame.on('dom:mousedown', Y.bind(this._onFrameMouseDown, this));
            this.frame.on('dom:keydown', Y.bind(this._onFrameKeyDown, this));

            if (Y.UA.ie) {
                this.frame.on('dom:activate', Y.bind(this._onFrameActivate, this));
                this.frame.on('dom:beforedeactivate', Y.bind(this._beforeFrameDeactivate, this));
            }
            this.frame.on('dom:keyup', Y.bind(this._onFrameKeyUp, this));
            this.frame.on('dom:keypress', Y.bind(this._onFrameKeyPress, this));
            this.frame.on('dom:paste', Y.bind(this._onPaste, this));

            inst.Selection.filter();
            this.fire('ready');
        },
        /**
        * Caches the current cursor position in IE.
        * @method _beforeFrameDeactivate
        * @private
        */
        _beforeFrameDeactivate: function(e) {
            if (e.frameTarget.test('html')) { //Means it came from a scrollbar
                return;
            }
            var inst = this.getInstance(),
                sel = inst.config.doc.selection.createRange();
            
            if (sel.compareEndPoints && !sel.compareEndPoints('StartToEnd', sel)) {
                sel.pasteHTML('<var id="yui-ie-cursor">');
            }
        },
        /**
        * Moves the cached selection bookmark back so IE can place the cursor in the right place.
        * @method _onFrameActivate
        * @private
        */
        _onFrameActivate: function(e) {
            if (e.frameTarget.test('html')) { //Means it came from a scrollbar
                return;
            }
            var inst = this.getInstance(),
                sel = new inst.Selection(),
                range = sel.createRange(),
                cur = inst.all('#yui-ie-cursor');

            if (cur.size()) {
                cur.each(function(n) {
                    n.set('id', '');
                    if (range.moveToElementText) {
                        try {
                            range.moveToElementText(n._node);
                            var moved = range.move('character', -1);
                            if (moved === -1) { //Only move up if we actually moved back.
                                range.move('character', 1);
                            }
                            range.select();
                            range.text = '';
                        } catch (e) {}
                    }
                    n.remove();
                });
            }
        },
        /**
        * Fires nodeChange event
        * @method _onPaste
        * @private
        */
        _onPaste: function(e) {
            this.fire('nodeChange', { changedNode: e.frameTarget, changedType: 'paste', changedEvent: e.frameEvent });
        },
        /**
        * Fires nodeChange event
        * @method _onFrameMouseUp
        * @private
        */
        _onFrameMouseUp: function(e) {
            this.fire('nodeChange', { changedNode: e.frameTarget, changedType: 'mouseup', changedEvent: e.frameEvent  });
        },
        /**
        * Fires nodeChange event
        * @method _onFrameMouseDown
        * @private
        */
        _onFrameMouseDown: function(e) {
            this.fire('nodeChange', { changedNode: e.frameTarget, changedType: 'mousedown', changedEvent: e.frameEvent  });
        },
        /**
        * Caches a copy of the selection for key events. Only creating the selection on keydown
        * @property _currentSelection
        * @private
        */
        _currentSelection: null,
        /**
        * Holds the timer for selection clearing
        * @property _currentSelectionTimer
        * @private
        */
        _currentSelectionTimer: null,
        /**
        * Flag to determine if we can clear the selection or not.
        * @property _currentSelectionClear
        * @private
        */
        _currentSelectionClear: null,
        /**
        * Fires nodeChange event
        * @method _onFrameKeyDown
        * @private
        */
        _onFrameKeyDown: function(e) {
            var inst, sel;
            if (!this._currentSelection) {
                if (this._currentSelectionTimer) {
                    this._currentSelectionTimer.cancel();
                }
                this._currentSelectionTimer = Y.later(850, this, function() {
                    this._currentSelectionClear = true;
                });
                
                inst = this.frame.getInstance();
                sel = new inst.Selection(e);

                this._currentSelection = sel;
            } else {
                sel = this._currentSelection;
            }

            inst = this.frame.getInstance();
            sel = new inst.Selection();

            this._currentSelection = sel;
            
            if (sel && sel.anchorNode) {
                this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: 'keydown', changedEvent: e.frameEvent });
                if (EditorBase.NC_KEYS[e.keyCode]) {
                    this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: EditorBase.NC_KEYS[e.keyCode], changedEvent: e.frameEvent });
                    this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: EditorBase.NC_KEYS[e.keyCode] + '-down', changedEvent: e.frameEvent });
                }
            }
        },
        /**
        * Fires nodeChange event
        * @method _onFrameKeyPress
        * @private
        */
        _onFrameKeyPress: function(e) {
            var sel = this._currentSelection;

            if (sel && sel.anchorNode) {
                this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: 'keypress', changedEvent: e.frameEvent });
                if (EditorBase.NC_KEYS[e.keyCode]) {
                    this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: EditorBase.NC_KEYS[e.keyCode] + '-press', changedEvent: e.frameEvent });
                }
            }
        },
        /**
        * Fires nodeChange event for keyup on specific keys
        * @method _onFrameKeyUp
        * @private
        */
        _onFrameKeyUp: function(e) {
            var inst = this.frame.getInstance(),
                sel = new inst.Selection(e);

            if (sel && sel.anchorNode) {
                this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: 'keyup', selection: sel, changedEvent: e.frameEvent  });
                if (EditorBase.NC_KEYS[e.keyCode]) {
                    this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: EditorBase.NC_KEYS[e.keyCode] + '-up', selection: sel, changedEvent: e.frameEvent  });
                }
            }
            if (this._currentSelectionClear) {
                this._currentSelectionClear = this._currentSelection = null;
            }
        },
        /**
        * Pass through to the frame.execCommand method
        * @method execCommand
        * @param {String} cmd The command to pass: inserthtml, insertimage, bold
        * @param {String} val The optional value of the command: Helvetica
        * @return {Node/NodeList} The Node or Nodelist affected by the command. Only returns on override commands, not browser defined commands.
        */
        execCommand: function(cmd, val) {
            var ret = this.frame.execCommand(cmd, val),
                inst = this.frame.getInstance(),
                sel = new inst.Selection(), cmds = {},
                e = { changedNode: sel.anchorNode, changedType: 'execcommand', nodes: ret };

            switch (cmd) {
                case 'forecolor':
                    e.fontColor = val;
                    break;
                case 'backcolor':
                    e.backgroundColor = val;
                    break;
                case 'fontsize':
                    e.fontSize = val;
                    break;
                case 'fontname':
                    e.fontFamily = val;
                    break;
            }

            cmds[cmd] = 1;
            e.commands = cmds;

            this.fire('nodeChange', e);

            return ret;
        },
        /**
        * Get the YUI instance of the frame
        * @method getInstance
        * @return {YUI} The YUI instance bound to the frame.
        */
        getInstance: function() {
            return this.frame.getInstance();
        },
        /**
        * Renders the Y.Frame to the passed node.
        * @method render
        * @param {Selector/HTMLElement/Node} node The node to append the Editor to
        * @return {EditorBase}
        * @chainable
        */
        render: function(node) {
            this.frame.set('content', this.get('content'));
            this.frame.render(node);
            return this;
        },
        /**
        * Focus the contentWindow of the iframe
        * @method focus
        * @param {Function} fn Callback function to execute after focus happens
        * @return {EditorBase}
        * @chainable
        */
        focus: function(fn) {
            this.frame.focus(fn);
            return this;
        },
        /**
        * Handles the showing of the Editor instance. Currently only handles the iframe
        * @method show
        * @return {EditorBase}
        * @chainable
        */
        show: function() {
            this.frame.show();
            return this;
        },
        /**
        * Handles the hiding of the Editor instance. Currently only handles the iframe
        * @method hide
        * @return {EditorBase}
        * @chainable
        */
        hide: function() {
            this.frame.hide();
            return this;
        },
        /**
        * (Un)Filters the content of the Editor, cleaning YUI related code. //TODO better filtering
        * @method getContent
        * @return {String} The filtered content of the Editor
        */
        getContent: function() {
            var html = '', inst = this.getInstance();
            if (inst && inst.Selection) {
                html = inst.Selection.unfilter();
            }
            //Removing the _yuid from the objects in IE
            html = html.replace(/ _yuid="([^>]*)"/g, '');
            return html;
        }
    }, {
        /**
        * @static
        * @method NORMALIZE_FONTSIZE
        * @description Pulls the fontSize from a node, then checks for string values (x-large, x-small)
        * and converts them to pixel sizes. If the parsed size is different from the original, it calls
        * node.setStyle to update the node with a pixel size for normalization.
        */
        NORMALIZE_FONTSIZE: function(n) {
            var size = n.getStyle('fontSize'), oSize = size;
            
            switch (size) {
                case '-webkit-xxx-large':
                    size = '48px';
                    break;
                case 'xx-large':
                    size = '32px';
                    break;
                case 'x-large':
                    size = '24px';
                    break;
                case 'large':
                    size = '18px';
                    break;
                case 'medium':
                    size = '16px';
                    break;
                case 'small':
                    size = '13px';
                    break;
                case 'x-small':
                    size = '10px';
                    break;
            }
            if (oSize !== size) {
                n.setStyle('fontSize', size);
            }
            return size;
        },
        /**
        * @static
        * @property TABKEY
        * @description The HTML markup to use for the tabkey
        */
        TABKEY: '<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>',
        /**
        * @static
        * @method FILTER_RGB
        * @param String css The CSS string containing rgb(#,#,#);
        * @description Converts an RGB color string to a hex color, example: rgb(0, 255, 0) converts to #00ff00
        * @return String
        */
        FILTER_RGB: function(css) {
            if (css.toLowerCase().indexOf('rgb') != -1) {
                var exp = new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)", "gi");
                var rgb = css.replace(exp, "$1,$2,$3,$4,$5").split(',');
            
                if (rgb.length == 5) {
                    var r = parseInt(rgb[1], 10).toString(16);
                    var g = parseInt(rgb[2], 10).toString(16);
                    var b = parseInt(rgb[3], 10).toString(16);

                    r = r.length == 1 ? '0' + r : r;
                    g = g.length == 1 ? '0' + g : g;
                    b = b.length == 1 ? '0' + b : b;

                    css = "#" + r + g + b;
                }
            }
            return css;
        },        
        /**
        * @static
        * @property TAG2CMD
        * @description A hash table of tags to their execcomand's
        */
        TAG2CMD: {
            'b': 'bold',
            'strong': 'bold',
            'i': 'italic',
            'em': 'italic',
            'u': 'underline',
            'sup': 'superscript',
            'sub': 'subscript',
            'img': 'insertimage',
            'a' : 'createlink',
            'ul' : 'insertunorderedlist',
            'ol' : 'insertorderedlist'
        },
        /**
        * Hash table of keys to fire a nodeChange event for.
        * @static
        * @property NC_KEYS
        * @type Object
        */
        NC_KEYS: {
            8: 'backspace',
            9: 'tab',
            13: 'enter',
            32: 'space',
            33: 'pageup',
            34: 'pagedown',
            35: 'end',
            36: 'home',
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            46: 'delete'
        },
        /**
        * The default modules to use inside the Frame
        * @static
        * @property USE
        * @type Array
        */
        USE: ['substitute', 'node', 'selector-css3', 'selection', 'stylesheet'],
        /**
        * The Class Name: editorBase
        * @static
        * @property NAME
        */
        NAME: 'editorBase',
        /**
        * Editor Strings
        * @static
        * @property STRINGS
        */
        STRINGS: {
            /**
            * Title of frame document: Rich Text Editor
            * @static
            * @property STRINGS.title
            */
            title: 'Rich Text Editor'
        },
        ATTRS: {
            /**
            * The content to load into the Editor Frame
            * @attribute content
            */
            content: {
                value: '<br class="yui-cursor">',
                setter: function(str) {
                    if (str.substr(0, 1) === "\n") {
                        Y.log('Stripping first carriage return from content before injecting', 'warn', 'editor');
                        str = str.substr(1);
                    }
                    if (str === '') {
                        str = '<br class="yui-cursor">';
                    }
                    if (str === ' ') {
                        if (Y.UA.gecko) {
                            str = '<br class="yui-cursor">';
                        }
                    }
                    return this.frame.set('content', str);
                },
                getter: function() {
                    return this.frame.get('content');
                }
            },
            /**
            * The value of the dir attribute on the HTML element of the frame. Default: ltr
            * @attribute dir
            */
            dir: {
                writeOnce: true,
                value: 'ltr'
            },
            /**
            * @attribute linkedcss
            * @description An array of url's to external linked style sheets
            * @type String
            */            
            linkedcss: {
                value: '',
                setter: function(css) {
                    if (this.frame) {
                        this.frame.set('linkedcss', css);
                    }
                    return css;
                }
            },
            /**
            * @attribute extracss
            * @description A string of CSS to add to the Head of the Editor
            * @type String
            */            
            extracss: {
                value: false,
                setter: function(css) {
                    if (this.frame) {
                        this.frame.set('extracss', css);
                    }
                    return css;
                }
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

    Y.EditorBase = EditorBase;

    /**
    * @event nodeChange
    * @description Fired from several mouse/key/paste event points.
    * @param {Event.Facade} event An Event Facade object with the following specific properties added:
    * <dl>
    *   <dt>changedEvent</dt><dd>The event that caused the nodeChange</dd>
    *   <dt>changedNode</dt><dd>The node that was interacted with</dd>
    *   <dt>changedType</dt><dd>The type of change: mousedown, mouseup, right, left, backspace, tab, enter, etc..</dd>
    *   <dt>commands</dt><dd>The list of execCommands that belong to this change and the dompath that's associated with the changedNode</dd>
    *   <dt>classNames</dt><dd>An array of classNames that are applied to the changedNode and all of it's parents</dd>
    *   <dt>dompath</dt><dd>A sorted array of node instances that make up the DOM path from the changedNode to body.</dd>
    *   <dt>backgroundColor</dt><dd>The cascaded backgroundColor of the changedNode</dd>
    *   <dt>fontColor</dt><dd>The cascaded fontColor of the changedNode</dd>
    *   <dt>fontFamily</dt><dd>The cascaded fontFamily of the changedNode</dd>
    *   <dt>fontSize</dt><dd>The cascaded fontSize of the changedNode</dd>
    * </dl>
    * @type {Event.Custom}
    */

    /**
    * @event ready
    * @description Fired after the frame is ready.
    * @param {Event.Facade} event An Event Facade object.
    * @type {Event.Custom}
    */





}, '@VERSION@' ,{skinnable:false, requires:['base', 'frame', 'node', 'exec-command', 'selection', 'editor-para']});
YUI.add('editor-lists', function(Y) {


    /**
     * Handles list manipulation inside the Editor. Adds keyboard manipulation and execCommand support. Adds overrides for the <a href="Plugin.ExecCommand.html#method_COMMANDS.insertorderedlist">insertorderedlist</a> and <a href="Plugin.ExecCommand.html#method_COMMANDS.insertunorderedlist">insertunorderedlist</a> execCommands.
     * @class Plugin.EditorLists
     * @constructor
     * @extends Base
     * @module editor
     * @submodule editor-lists
     */
    
    var EditorLists = function() {
        EditorLists.superclass.constructor.apply(this, arguments);
    }, LI = 'li', OL = 'ol', UL = 'ul', HOST = 'host';

    Y.extend(EditorLists, Y.Base, {
        /**
        * Listener for host's nodeChange event and captures the tabkey interaction only when inside a list node.
        * @private
        * @method _onNodeChange
        * @param {Event} e The Event facade passed from the host.
        */
        _onNodeChange: function(e) {
            var inst = this.get(HOST).getInstance(), sel, li, 
            newLi, newList, sTab, par, moved = false, tag, focusEnd = false;

            if (e.changedType === 'tab') {
                if (e.changedNode.test(LI + ', ' + LI + ' *')) {
                    Y.log('Overriding TAB to move lists around', 'info', 'editorLists');
                    e.changedEvent.halt();
                    e.preventDefault();
                    li = e.changedNode;
                    sTab = e.changedEvent.shiftKey;
                    par = li.ancestor(OL + ',' + UL);
                    tag = UL;

                    if (par.get('tagName').toLowerCase() === OL) {
                        tag = OL;
                    }
                    Y.log('ShiftKey: ' + sTab, 'info', 'editorLists');
                    
                    if (!li.test(LI)) {
                        li = li.ancestor(LI);
                    }
                    if (sTab) {
                        if (li.ancestor(LI)) {
                            Y.log('Shifting list up one level', 'info', 'editorLists');
                            li.ancestor(LI).insert(li, 'after');
                            moved = true;
                            focusEnd = true;
                        }
                    } else {
                        //li.setStyle('border', '1px solid red');
                        if (li.previous(LI)) {
                            Y.log('Shifting list down one level', 'info', 'editorLists');
                            newList = inst.Node.create('<' + tag + '></' + tag + '>');
                            li.previous(LI).append(newList);
                            newList.append(li);
                            moved = true;
                        }
                    }
                }
                if (moved) {
                    if (!li.test(LI)) {
                        li = li.ancestor(LI);
                    }
                    li.all(EditorLists.REMOVE).remove();
                    if (Y.UA.ie) {
                        li = li.append(EditorLists.NON).one(EditorLists.NON_SEL);
                    }
                    //Selection here..
                    Y.log('Selecting the new node', 'info', 'editorLists');
                    (new inst.Selection()).selectNode(li, true, focusEnd);
                }
            }
        },
        initializer: function() {
            this.get(HOST).on('nodeChange', Y.bind(this._onNodeChange, this));
        }
    }, {
        /**
        * The non element placeholder, used for positioning the cursor and filling empty items
        * @property REMOVE
        * @static
        */
        NON: '<span class="yui-non">&nbsp;</span>',
        /**
        * The selector query to get all non elements
        * @property NONSEL
        * @static
        */
        NON_SEL: 'span.yui-non',
        /**
        * The items to removed from a list when a list item is moved, currently removes BR nodes
        * @property REMOVE
        * @static
        */
        REMOVE: 'br',
        /**
        * editorLists
        * @property NAME
        * @static
        */
        NAME: 'editorLists',
        /**
        * lists
        * @property NS
        * @static
        */
        NS: 'lists',
        ATTRS: {
            host: {
                value: false
            }
        }
    });

    Y.namespace('Plugin');

    Y.Plugin.EditorLists = EditorLists;



}, '@VERSION@' ,{skinnable:false, requires:['editor-base']});
YUI.add('editor-bidi', function(Y) {


    /**
     * Plugin for Editor to support BiDirectional (bidi) text operations.
     * @class Plugin.EditorBidi
     * @extends Base
     * @constructor
     * @module editor
     * @submodule editor-bidi
     */


    var EditorBidi = function() {
        EditorBidi.superclass.constructor.apply(this, arguments);
    }, HOST = 'host', DIR = 'dir', BODY = 'BODY', NODE_CHANGE = 'nodeChange',
    B_C_CHANGE = 'bidiContextChange', FIRST_P = BODY + ' > p', STYLE = 'style';

    Y.extend(EditorBidi, Y.Base, {
        /**
        * Place holder for the last direction when checking for a switch
        * @private
        * @property lastDirection
        */
        lastDirection: null,
        /**
        * Tells us that an initial bidi check has already been performed
        * @private
        * @property firstEvent
        */
        firstEvent: null,

        /**
        * Method checks to see if the direction of the text has changed based on a nodeChange event.
        * @private
        * @method _checkForChange
        */
        _checkForChange: function() {
            var host = this.get(HOST),
                inst = host.getInstance(),
                sel = new inst.Selection(),
                node, direction;
            
            if (sel.isCollapsed) {
                node = EditorBidi.blockParent(sel.focusNode);
                if (node) {
                    direction = node.getStyle('direction');
                    if (direction !== this.lastDirection) {
                        host.fire(B_C_CHANGE, { changedTo: direction });
                        this.lastDirection = direction;
                    }
                }
            } else {
                host.fire(B_C_CHANGE, { changedTo: 'select' });
                this.lastDirection = null;
            }
        },

        /**
        * Checked for a change after a specific nodeChange event has been fired.
        * @private
        * @method _afterNodeChange
        */
        _afterNodeChange: function(e) { 
            // If this is the first event ever, or an event that can result in a context change
            if (this.firstEvent || EditorBidi.EVENTS[e.changedType]) {
                this._checkForChange();
                this.firstEvent = false;
            }
        },

        /**
        * Checks for a direction change after a mouseup occurs.
        * @private
        * @method _afterMouseUp
        */
        _afterMouseUp: function(e) {
            this._checkForChange();
            this.firstEvent = false;
        },
        initializer: function() {
            var host = this.get(HOST);

            this.firstEvent = true;
            
            host.after(NODE_CHANGE, Y.bind(this._afterNodeChange, this));
            host.after('dom:mouseup', Y.bind(this._afterMouseUp, this));
        }
    }, {
        /**
        * The events to check for a direction change on
        * @property EVENTS
        * @static
        */
        EVENTS: {
            'backspace-up': true,
            'pageup-up': true,
            'pagedown-down': true,
            'end-up': true,
            'home-up': true,
            'left-up': true,
            'up-up': true,
            'right-up': true,
            'down-up': true,
            'delete-up': true
        },

        /**
        * More elements may be needed. BODY *must* be in the list to take care of the special case.
        * 
        * blockParent could be changed to use inst.Selection.BLOCKS
        * instead, but that would make Y.Plugin.EditorBidi.blockParent
        * unusable in non-RTE contexts (it being usable is a nice
        * side-effect).
        * @property BLOCKS
        * @static
        */
        //BLOCKS: Y.Selection.BLOCKS+',LI,HR,' + BODY,
        BLOCKS: Y.Selection.BLOCKS,
        /**
        * Template for creating a block element
        * @static
        * @property DIV_WRAPPER
        */
        DIV_WRAPPER: '<DIV></DIV>',
        /**
        * Returns a block parent for a given element
        * @static
        * @method blockParent
        */
        blockParent: function(node, wrap) {
            var parent = node, divNode, firstChild;
            
            if (!parent) {
                parent = Y.one(BODY);
            }
            
            if (!parent.test(EditorBidi.BLOCKS)) {
                parent = parent.ancestor(EditorBidi.BLOCKS);
            }
            if (wrap && parent.test(BODY)) {
                // This shouldn't happen if the RTE handles everything
                // according to spec: we should get to a P before BODY. But
                // we don't want to set the direction of BODY even if that
                // happens, so we wrap everything in a DIV.
                
                // The code is based on YUI3's Y.Selection._wrapBlock function.
                divNode = Y.Node.create(EditorBidi.DIV_WRAPPER);
                parent.get('children').each(function(node, index) {
                    if (index === 0) {
                        firstChild = node;
                    } else {
                        divNode.append(node);
                    }
                });
                firstChild.replace(divNode);
                divNode.prepend(firstChild);
                parent = divNode;
            }
            return parent;
        },
        /**
        * The data key to store on the node.
        * @static
        * @property _NODE_SELECTED
        */
        _NODE_SELECTED: 'bidiSelected',
        /**
        * Generates a list of all the block parents of the current NodeList
        * @static
        * @method addParents
        */
        addParents: function(nodeArray) {
            var i, parent, addParent;

            for (i = 0; i < nodeArray.length; i += 1) {
                nodeArray[i].setData(EditorBidi._NODE_SELECTED, true);
            }

            // This works automagically, since new parents added get processed
            // later themselves. So if there's a node early in the process that
            // we haven't discovered some of its siblings yet, thus resulting in
            // its parent not added, the parent will be added later, since those
            // siblings will be added to the array and then get processed.
            for (i = 0; i < nodeArray.length; i += 1) {
                parent = nodeArray[i].get('parentNode');

                // Don't add the parent if the parent is the BODY element.
                // We don't want to change the direction of BODY. Also don't
                // do it if the parent is already in the list.
                if (!parent.test(BODY) && !parent.getData(EditorBidi._NODE_SELECTED)) {
                    addParent = true;
                    parent.get('children').some(function(sibling) {
                        if (!sibling.getData(EditorBidi._NODE_SELECTED)) {
                            addParent = false;
                            return true; // stop more processing
                        }
                    });
                    if (addParent) {
                        nodeArray.push(parent);
                        parent.setData(EditorBidi._NODE_SELECTED, true);
                    }
                }
            }   

            for (i = 0; i < nodeArray.length; i += 1) {
                nodeArray[i].clearData(EditorBidi._NODE_SELECTED);
            }

            return nodeArray;
        },


        /**
        * editorBidi
        * @static
        * @property NAME
        */
        NAME: 'editorBidi',
        /**
        * editorBidi
        * @static
        * @property NS
        */
        NS: 'editorBidi',
        ATTRS: {
            host: {
                value: false
            }
        },
        /**
        * Regex for testing/removing text-align style from an element
        * @static
        * @property RE_TEXT_ALIGN
        */
        RE_TEXT_ALIGN: /text-align:\s*\w*\s*;/,
        /**
        * Method to test a node's style attribute for text-align and removing it.
        * @static
        * @method removeTextAlign
        */
        removeTextAlign: function(n) {
            if (n) {
                if (n.getAttribute(STYLE).match(EditorBidi.RE_TEXT_ALIGN)) {
                    n.setAttribute(STYLE, n.getAttribute(STYLE).replace(EditorBidi.RE_TEXT_ALIGN, ''));
                }
                if (n.hasAttribute('align')) {
                    n.removeAttribute('align');
                }
            }
            return n;
        }
    });
    
    Y.namespace('Plugin');
    
    Y.Plugin.EditorBidi = EditorBidi;

    /**
     * bidi execCommand override for setting the text direction of a node.
     * @for Plugin.ExecCommand
     * @property COMMANDS.bidi
     */
    //TODO -- This should not add this command unless the plugin is added to the instance..
    Y.Plugin.ExecCommand.COMMANDS.bidi = function(cmd, direction) {
        var inst = this.getInstance(),
            sel = new inst.Selection(),
            ns = this.get(HOST).get(HOST).editorBidi,
            returnValue, block,
            selected, selectedBlocks, dir;

        if (!ns) {
            Y.error('bidi execCommand is not available without the EditorBiDi plugin.');
            return;
        }

        inst.Selection.filterBlocks();
        if (sel.anchorNode.test(BODY)) {
            return;
        }
        if (sel.isCollapsed) { // No selection
            block = EditorBidi.blockParent(sel.anchorNode);
            //Remove text-align attribute if it exists
            block = EditorBidi.removeTextAlign(block);
            if (!direction) {
                //If no direction is set, auto-detect the proper setting to make it "toggle"
                dir = block.getAttribute(DIR);
                if (!dir || dir == 'ltr') {
                    direction = 'rtl';
                } else {
                    direction = 'ltr';
                }
            }
            block.setAttribute(DIR, direction);
            if (Y.UA.ie) {
                var b = block.all('br.yui-cursor');
                if (b.size() === 1 && block.get('childNodes').size() == 1) {
                    b.remove();
                }
            }
            returnValue = block;
        } else { // some text is selected
            selected = sel.getSelected();
            selectedBlocks = [];
            selected.each(function(node) {
                selectedBlocks.push(EditorBidi.blockParent(node));
            });
            selectedBlocks = inst.all(EditorBidi.addParents(selectedBlocks));
            selectedBlocks.each(function(n) {
                var d = direction;
                //Remove text-align attribute if it exists
                n = EditorBidi.removeTextAlign(n);
                if (!d) {
                    dir = n.getAttribute(DIR);
                    if (!dir || dir == 'ltr') {
                        d = 'rtl';
                    } else {
                        d = 'ltr';
                    }
                }
                n.setAttribute(DIR, d);
            });
            returnValue = selectedBlocks;
        }
        ns._checkForChange();
        return returnValue;
    };




}, '@VERSION@' ,{skinnable:false, requires:['editor-base']});
YUI.add('editor-para', function(Y) {


    /**
     * Plugin for Editor to paragraph auto wrapping and correction.
     * @class Plugin.EditorPara
     * @extends Base
     * @constructor
     * @module editor
     * @submodule editor-para
     */


    var EditorPara = function() {
        EditorPara.superclass.constructor.apply(this, arguments);
    }, HOST = 'host', BODY = 'body', NODE_CHANGE = 'nodeChange', PARENT_NODE = 'parentNode',
    FIRST_P = BODY + ' > p', P = 'p', BR = '<br>', FC = 'firstChild', LI = 'li';


    Y.extend(EditorPara, Y.Base, {
        /**
        * Utility method to create an empty paragraph when the document is empty.
        * @private
        * @method _fixFirstPara
        */
        _fixFirstPara: function() {
            Y.log('Fix First Paragraph', 'info', 'editor-para');
            var host = this.get(HOST), inst = host.getInstance(), sel, n,
                body = inst.config.doc.body,
                html = body.innerHTML,
                col = ((html.length) ? true : false);

            if (html === BR) {
                html = '';
                col = false;
            }

            body.innerHTML = '<' + P + '>' + html + inst.Selection.CURSOR + '</' + P + '>';

            n = inst.one(FIRST_P);
            sel = new inst.Selection();

            sel.selectNode(n, true, col);
        },
        /**
        * nodeChange handler to handle fixing an empty document.
        * @private
        * @method _onNodeChange
        */
        _onNodeChange: function(e) {
            var host = this.get(HOST), inst = host.getInstance(),
                html, txt, par , d, sel, btag = inst.Selection.DEFAULT_BLOCK_TAG,
                inHTML, txt2, childs, aNode, index, node2, top, n, sib,
                ps, br, item, p, imgs, t, LAST_CHILD = ':last-child';

            switch (e.changedType) {
                case 'enter-up':
                    var para = ((this._lastPara) ? this._lastPara : e.changedNode),
                        b = para.one('br.yui-cursor');

                    if (this._lastPara) {
                        delete this._lastPara;
                    }

                    if (b) {
                        if (b.previous() || b.next()) {
                            if (b.ancestor(P)) {
                                b.remove();
                            }
                        }
                    }
                    if (!para.test(btag)) {
                        var para2 = para.ancestor(btag);
                        if (para2) {
                            para = para2;
                            para2 = null;
                        }
                    }
                    if (para.test(btag)) {
                        var prev = para.previous(), lc, lc2, found = false;
                        if (prev) {
                            lc = prev.one(LAST_CHILD);
                            while (!found) {
                                if (lc) {
                                    lc2 = lc.one(LAST_CHILD);
                                    if (lc2) {
                                        lc = lc2;
                                    } else {
                                        found = true;
                                    }
                                } else {
                                    found = true;
                                }
                            }
                            if (lc) {
                                host.copyStyles(lc, para);
                            }
                        }
                    }
                    break;
                case 'enter':
                    if (Y.UA.ie) {
                        if (e.changedNode.test('br')) {
                            e.changedNode.remove();
                        } else if (e.changedNode.test('p, span')) {
                            var b = e.changedNode.one('br.yui-cursor');
                            if (b) {
                                b.remove();
                            }
                        }
                    }
                    if (Y.UA.webkit) {
                        //Webkit doesn't support shift+enter as a BR, this fixes that.
                        if (e.changedEvent.shiftKey) {
                            host.execCommand('insertbr');
                            e.changedEvent.preventDefault();
                        }
                    }
                    //TODO Move this to a GECKO MODULE - Can't for the moment, requires no change to metadata (YMAIL)
                    if (Y.UA.gecko && host.get('defaultblock') !== 'p') {
                        par = e.changedNode;

                        if (!par.test(LI) && !par.ancestor(LI)) {
                            if (!par.test(btag)) {
                                par = par.ancestor(btag);
                            }
                            d = inst.Node.create('<' + btag + '></' + btag + '>');
                            par.insert(d, 'after');
                            sel = new inst.Selection();
                            if (sel.anchorOffset) {
                                inHTML = sel.anchorNode.get('textContent');

                                txt = inst.one(inst.config.doc.createTextNode(inHTML.substr(0, sel.anchorOffset)));
                                txt2 = inst.one(inst.config.doc.createTextNode(inHTML.substr(sel.anchorOffset)));

                                aNode = sel.anchorNode;
                                aNode.setContent(''); //I
                                node2 = aNode.cloneNode(); //I
                                node2.append(txt2); //text
                                top = false;
                                sib = aNode; //I
                                while (!top) {
                                    sib = sib.get(PARENT_NODE); //B
                                    if (sib && !sib.test(btag)) {
                                        n = sib.cloneNode();
                                        n.set('innerHTML', '');
                                        n.append(node2);
                                        
                                        //Get children..
                                        childs = sib.get('childNodes');
                                        var start = false;
                                        childs.each(function(c) {
                                            if (start) {
                                                n.append(c);
                                            }
                                            if (c === aNode) {
                                                start = true;
                                            }
                                        });

                                        aNode = sib; //Top sibling
                                        node2 = n;
                                    } else {
                                        top = true;
                                    }
                                }
                                txt2 = node2;
                                sel.anchorNode.append(txt);

                                if (txt2) {
                                    d.append(txt2);
                                }
                            }
                            if (d.get(FC)) {
                                d = d.get(FC);
                            }
                            d.prepend(inst.Selection.CURSOR);
                            sel.focusCursor(true, true);
                            html = inst.Selection.getText(d);
                            if (html !== '') {
                                inst.Selection.cleanCursor();
                            }
                            e.changedEvent.preventDefault();
                        }
                    }
                    break;
                case 'keyup':
                    if (Y.UA.gecko) {
                        if (inst.config.doc && inst.config.doc.body && inst.config.doc.body.innerHTML.length < 2) {
                            this._fixFirstPara();
                        }
                    }
                    break;
                case 'backspace-up':
                case 'backspace-down':
                case 'delete-up':
                    if (!Y.UA.ie) {
                        ps = inst.all(FIRST_P);
                        item = inst.one(BODY);
                        if (ps.item(0)) {
                            item = ps.item(0);
                        }
                        br = item.one('br');
                        if (br) {
                            br.removeAttribute('id');
                            br.removeAttribute('class');
                        }

                        txt = inst.Selection.getText(item);
                        txt = txt.replace(/ /g, '').replace(/\n/g, '');
                        imgs = item.all('img');
                        
                        if (txt.length === 0 && !imgs.size()) {
                            //God this is horrible..
                            if (!item.test(P)) {
                                this._fixFirstPara();
                            }
                            p = null;
                            if (e.changedNode && e.changedNode.test(P)) {
                                p = e.changedNode;
                            }
                            if (!p && host._lastPara && host._lastPara.inDoc()) {
                                p = host._lastPara;
                            }
                            if (p && !p.test(P)) {
                                p = p.ancestor(P);
                            }
                            if (p) {
                                if (!p.previous() && p.get(PARENT_NODE) && p.get(PARENT_NODE).test(BODY)) {
                                    Y.log('Stopping the backspace event', 'warn', 'editor-para');
                                    e.changedEvent.frameEvent.halt();
                                }
                            }
                        }
                        if (Y.UA.webkit) {
                            if (e.changedNode) {
                                item = e.changedNode;
                                if (item.test('li') && (!item.previous() && !item.next())) {
                                    html = item.get('innerHTML').replace(BR, '');
                                    if (html === '') {
                                        if (item.get(PARENT_NODE)) {
                                            item.get(PARENT_NODE).replace(inst.Node.create(BR));
                                            e.changedEvent.frameEvent.halt();
                                            e.preventDefault();
                                            inst.Selection.filterBlocks();
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (Y.UA.gecko) {
                        /**
                        * This forced FF to redraw the content on backspace.
                        * On some occasions FF will leave a cursor residue after content has been deleted.
                        * Dropping in the empty textnode and then removing it causes FF to redraw and
                        * remove the "ghost cursors"
                        */
                        d = e.changedNode;
                        t = inst.config.doc.createTextNode(' ');
                        d.appendChild(t);
                        d.removeChild(t);
                    }
                    break;
            }
            if (Y.UA.gecko) {
                if (e.changedNode && !e.changedNode.test(btag)) {
                    p = e.changedNode.ancestor(btag);
                    if (p) {
                        this._lastPara = p;
                    }
                }
            }
            
        },
        /**
        * Performs a block element filter when the Editor is first ready
        * @private
        * @method _afterEditorReady
        */
        _afterEditorReady: function() {
            var host = this.get(HOST), inst = host.getInstance(), btag;
            if (inst) {
                inst.Selection.filterBlocks();
                btag = inst.Selection.DEFAULT_BLOCK_TAG;
                FIRST_P = BODY + ' > ' + btag;
                P = btag;
            }
        },
        /**
        * Performs a block element filter when the Editor after an content change
        * @private
        * @method _afterContentChange
        */
        _afterContentChange: function() {
            var host = this.get(HOST), inst = host.getInstance();
            if (inst && inst.Selection) {
                inst.Selection.filterBlocks();
            }
        },
        /**
        * Performs block/paste filtering after paste.
        * @private
        * @method _afterPaste
        */
        _afterPaste: function() {
            var host = this.get(HOST), inst = host.getInstance(),
                sel = new inst.Selection();

            Y.later(50, host, function() {
                inst.Selection.filterBlocks();
            });
            
        },
        initializer: function() {
            var host = this.get(HOST);
            if (host.editorBR) {
                Y.error('Can not plug EditorPara and EditorBR at the same time.');
                return;
            }

            host.on(NODE_CHANGE, Y.bind(this._onNodeChange, this));
            host.after('ready', Y.bind(this._afterEditorReady, this));
            host.after('contentChange', Y.bind(this._afterContentChange, this));
            if (Y.Env.webkit) {
                host.after('dom:paste', Y.bind(this._afterPaste, this));
            }
        }
    }, {
        /**
        * editorPara
        * @static
        * @property NAME
        */
        NAME: 'editorPara',
        /**
        * editorPara
        * @static
        * @property NS
        */
        NS: 'editorPara',
        ATTRS: {
            host: {
                value: false
            }
        }
    });
    
    Y.namespace('Plugin');
    
    Y.Plugin.EditorPara = EditorPara;



}, '@VERSION@' ,{skinnable:false, requires:['node']});
YUI.add('editor-br', function(Y) {



    /**
     * Plugin for Editor to normalize BR's.
     * @class Plugin.EditorBR
     * @extends Base
     * @constructor
     * @module editor
     * @submodule editor-br
     */


    var EditorBR = function() {
        EditorBR.superclass.constructor.apply(this, arguments);
    }, HOST = 'host', LI = 'li';


    Y.extend(EditorBR, Y.Base, {
        /**
        * Frame keyDown handler that normalizes BR's when pressing ENTER.
        * @private
        * @method _onKeyDown
        */
        _onKeyDown: function(e) {
            if (e.stopped) {
                e.halt();
                return;
            }
            if (e.keyCode == 13) {
                var host = this.get(HOST), inst = host.getInstance(),
                    sel = new inst.Selection(),
                    last = '';

                if (sel) {
                    if (Y.UA.ie) {
                        if (!sel.anchorNode || (!sel.anchorNode.test(LI) && !sel.anchorNode.ancestor(LI))) {
                            sel._selection.pasteHTML('<br>');
                            sel._selection.collapse(false);
                            sel._selection.select();
                            e.halt();
                        }
                    }
                    if (Y.UA.webkit) {
                        if (!sel.anchorNode.test(LI) && !sel.anchorNode.ancestor(LI)) {
                            host.frame._execCommand('insertlinebreak', null);
                            e.halt();
                        }
                    }
                }
            }
        },
        /**
        * Adds listeners for keydown in IE and Webkit. Also fires insertbeonreturn for supporting browsers.
        * @private
        * @method _afterEditorReady
        */
        _afterEditorReady: function() {
            var inst = this.get(HOST).getInstance();
            try {
                inst.config.doc.execCommand('insertbronreturn', null, true);
            } catch (bre) {}

            if (Y.UA.ie || Y.UA.webkit) {
                inst.on('keydown', Y.bind(this._onKeyDown, this), inst.config.doc);
            }
        },
        /**
        * Adds a nodeChange listener only for FF, in the event of a backspace or delete, it creates an empy textNode
        * inserts it into the DOM after the e.changedNode, then removes it. Causing FF to redraw the content.
        * @private
        * @method _onNodeChange
        * @param {Event} e The nodeChange event.
        */
        _onNodeChange: function(e) {
            switch (e.changedType) {
                case 'backspace-up':
                case 'backspace-down':
                case 'delete-up':
                    /**
                    * This forced FF to redraw the content on backspace.
                    * On some occasions FF will leave a cursor residue after content has been deleted.
                    * Dropping in the empty textnode and then removing it causes FF to redraw and
                    * remove the "ghost cursors"
                    */
                    var inst = this.get(HOST).getInstance();
                    var d = e.changedNode;
                    var t = inst.config.doc.createTextNode(' ');
                    d.appendChild(t);
                    d.removeChild(t);
                    break;
            }
        },
        initializer: function() {
            var host = this.get(HOST);
            if (host.editorPara) {
                Y.error('Can not plug EditorBR and EditorPara at the same time.');
                return;
            }
            host.after('ready', Y.bind(this._afterEditorReady, this));
            if (Y.UA.gecko) {
                host.on('nodeChange', Y.bind(this._onNodeChange, this));
            }
        }
    }, {
        /**
        * editorBR
        * @static
        * @property NAME
        */
        NAME: 'editorBR',
        /**
        * editorBR
        * @static
        * @property NS
        */
        NS: 'editorBR',
        ATTRS: {
            host: {
                value: false
            }
        }
    });
    
    Y.namespace('Plugin');
    
    Y.Plugin.EditorBR = EditorBR;



}, '@VERSION@' ,{skinnable:false, requires:['node']});


YUI.add('editor', function(Y){}, '@VERSION@' ,{skinnable:false, use:['frame', 'selection', 'exec-command', 'editor-base', 'editor-para', 'editor-br', 'editor-bidi', 'createlink-base']});

