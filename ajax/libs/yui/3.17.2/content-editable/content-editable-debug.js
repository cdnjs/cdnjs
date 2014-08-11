/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('content-editable', function (Y, NAME) {

    /*jshint maxlen: 500 */
    /**
    * Creates a component to work with an elemment.
    * @class ContentEditable
    * @for ContentEditable
    * @extends Y.Plugin.Base
    * @constructor
    * @module editor
    * @submodule content-editable
    */

    var Lang = Y.Lang,
        YNode = Y.Node,

        EVENT_CONTENT_READY = 'contentready',
        EVENT_READY = 'ready',

        TAG_PARAGRAPH = 'p',

        BLUR = 'blur',
        CONTAINER = 'container',
        CONTENT_EDITABLE = 'contentEditable',
        EMPTY = '',
        FOCUS = 'focus',
        HOST = 'host',
        INNER_HTML = 'innerHTML',
        KEY = 'key',
        PARENT_NODE = 'parentNode',
        PASTE = 'paste',
        TEXT = 'Text',
        USE = 'use',

    ContentEditable = function() {
        ContentEditable.superclass.constructor.apply(this, arguments);
    };

    Y.extend(ContentEditable, Y.Plugin.Base, {

        /**
        * Internal reference set when render is called.
        * @private
        * @property _rendered
        * @type Boolean
        */
        _rendered: null,

        /**
        * Internal reference to the YUI instance bound to the element
        * @private
        * @property _instance
        * @type YUI
        */
        _instance: null,

        /**
        * Initializes the ContentEditable instance
        * @protected
        * @method initializer
        */
        initializer: function() {
            var host = this.get(HOST);

            if (host) {
                host.frame = this;
            }

            this._eventHandles = [];

            this.publish(EVENT_READY, {
                emitFacade: true,
                defaultFn: this._defReadyFn
            });
        },

        /**
        * Destroys the instance.
        * @protected
        * @method destructor
        */
        destructor: function() {
            new Y.EventHandle(this._eventHandles).detach();

            this._container.removeAttribute(CONTENT_EDITABLE);
        },

        /**
        * Generic handler for all DOM events fired by the Editor container. This handler
        * takes the current EventFacade and augments it to fire on the ContentEditable host. It adds two new properties
        * to the EventFacade called frameX and frameY which adds the scroll and xy position of the ContentEditable element
        * to the original pageX and pageY of the event so external nodes can be positioned over the element.
        * In case of ContentEditable element these will be equal to pageX and pageY of the container.
        * @private
        * @method _onDomEvent
        * @param {EventFacade} e
        */
        _onDomEvent: function(e) {
            var xy;

            e.frameX = e.frameY = 0;

            if (e.pageX > 0 || e.pageY > 0) {
                if (e.type.substring(0, 3) !== KEY) {
                    xy = this._container.getXY();

                    e.frameX = xy[0];
                    e.frameY = xy[1];
                }
            }

            e.frameTarget = e.target;
            e.frameCurrentTarget = e.currentTarget;
            e.frameEvent = e;

            this.fire('dom:' + e.type, e);
        },

        /**
        * Simple pass thru handler for the paste event so we can do content cleanup
        * @private
        * @method _DOMPaste
        * @param {EventFacade} e
        */
        _DOMPaste: function(e) {
            var inst = this.getInstance(),
                data = EMPTY, win = inst.config.win;

            if (e._event.originalTarget) {
                data = e._event.originalTarget;
            }

            if (e._event.clipboardData) {
                data = e._event.clipboardData.getData(TEXT);
            }

            if (win.clipboardData) {
                data = win.clipboardData.getData(TEXT);

                if (data === EMPTY) { // Could be empty, or failed
                    // Verify failure
                    if (!win.clipboardData.setData(TEXT, data)) {
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
                Y.log('Failed to collect clipboard data', 'warn', 'contenteditable');

                e.clipboardData = null;
            }

            this.fire('dom:paste', e);
        },

        /**
        * Binds DOM events and fires the ready event
        * @private
        * @method _defReadyFn
        */
        _defReadyFn: function() {
            var inst = this.getInstance(),
                container = this.get(CONTAINER);

            Y.each(
                ContentEditable.DOM_EVENTS,
                function(value, key) {
                    var fn = Y.bind(this._onDomEvent, this),
                        kfn = ((Y.UA.ie && ContentEditable.THROTTLE_TIME > 0) ? Y.throttle(fn, ContentEditable.THROTTLE_TIME) : fn);

                    if (!inst.Node.DOM_EVENTS[key]) {
                        inst.Node.DOM_EVENTS[key] = 1;
                    }

                    if (value === 1) {
                        if (key !== FOCUS && key !== BLUR && key !== PASTE) {
                            if (key.substring(0, 3) === KEY) {
                                //Throttle key events in IE
                                this._eventHandles.push(container.on(key, kfn, container));
                            } else {
                                this._eventHandles.push(container.on(key, fn, container));
                            }
                        }
                    }
                },
                this
            );

            inst.Node.DOM_EVENTS.paste = 1;

            this._eventHandles.push(
                container.on(PASTE, Y.bind(this._DOMPaste, this), container),
                container.on(FOCUS, Y.bind(this._onDomEvent, this), container),
                container.on(BLUR, Y.bind(this._onDomEvent, this), container)
            );

            inst.__use = inst.use;

            inst.use = Y.bind(this.use, this);
        },

        /**
        * Called once the content is available in the ContentEditable element and calls the final use call
        * @private
        * @method _onContentReady
        * on the internal instance so that the modules are loaded properly.
        */
        _onContentReady: function(event) {
            if (!this._ready) {
                this._ready = true;

                var inst = this.getInstance(),
                    args = Y.clone(this.get(USE));

                this.fire(EVENT_CONTENT_READY);

                Y.log('On content available', 'info', 'contenteditable');

                if (event) {
                    inst.config.doc = YNode.getDOMNode(event.target);
                }

                args.push(Y.bind(function() {
                    Y.log('Callback from final internal use call', 'info', 'contenteditable');

                    if (inst.EditorSelection) {
                        inst.EditorSelection.DEFAULT_BLOCK_TAG = this.get('defaultblock');

                        inst.EditorSelection.ROOT = this.get(CONTAINER);
                    }

                    this.fire(EVENT_READY);
                }, this));

                Y.log('Calling use on internal instance: ' + args, 'info', 'contentEditable');

                inst.use.apply(inst, args);
            }
        },

        /**
        * Retrieves defaultblock value from host attribute
        * @private
        * @method _getDefaultBlock
        * @return {String}
        */
        _getDefaultBlock: function() {
            return this._getHostValue('defaultblock');
        },

        /**
        * Retrieves dir value from host attribute
        * @private
        * @method _getDir
        * @return {String}
        */
        _getDir: function() {
            return this._getHostValue('dir');
        },

        /**
        * Retrieves extracss value from host attribute
        * @private
        * @method _getExtraCSS
        * @return {String}
        */
        _getExtraCSS: function() {
            return this._getHostValue('extracss');
        },

        /**
        * Get the content from the container
        * @private
        * @method _getHTML
        * @param {String} html The raw HTML from the container.
        * @return {String}
        */
        _getHTML: function() {
            var html, container;

            if (this._ready) {
                container = this.get(CONTAINER);

                html = container.get(INNER_HTML);
            }

            return html;
        },

        /**
        * Retrieves a value from host attribute
        * @private
        * @method _getHostValue
        * @param {attr} The attribute which value should be returned from the host
        * @return {String|Object}
        */
        _getHostValue: function(attr) {
            var host = this.get(HOST);

            if (host) {
                return host.get(attr);
            }
        },

        /**
        * Set the content of the container
        * @private
        * @method _setHTML
        * @param {String} html The raw HTML to set to the container.
        * @return {String}
        */
        _setHTML: function(html) {
            if (this._ready) {
                var container = this.get(CONTAINER);

                container.set(INNER_HTML, html);
            } else {
                //This needs to be wrapped in a contentready callback for the !_ready state
                this.once(EVENT_CONTENT_READY, Y.bind(this._setHTML, this, html));
            }

            return html;
        },

        /**
        * Sets the linked CSS on the instance.
        * @private
        * @method _setLinkedCSS
        * @param {String} css The linkedcss value
        * @return {String}
        */
        _setLinkedCSS: function(css) {
            if (this._ready) {
                var inst = this.getInstance();
                inst.Get.css(css);
            } else {
                //This needs to be wrapped in a contentready callback for the !_ready state
                this.once(EVENT_CONTENT_READY, Y.bind(this._setLinkedCSS, this, css));
            }

            return css;
        },

        /**
        * Sets the dir (language direction) attribute on the container.
        * @private
        * @method _setDir
        * @param {String} value The language direction
        * @return {String}
        */
        _setDir: function(value) {
            var container;

            if (this._ready) {
                container = this.get(CONTAINER);

                container.setAttribute('dir', value);
            } else {
                //This needs to be wrapped in a contentready callback for the !_ready state
                this.once(EVENT_CONTENT_READY, Y.bind(this._setDir, this, value));
            }

            return value;
        },

        /**
        * Set's the extra CSS on the instance.
        * @private
        * @method _setExtraCSS
        * @param {String} css The CSS style to be set as extra css
        * @return {String}
        */
        _setExtraCSS: function(css) {
            if (this._ready) {
                if (css) {
                    var inst = this.getInstance(),
                        head = inst.one('head');

                    if (this._extraCSSNode) {
                        this._extraCSSNode.remove();
                    }

                    this._extraCSSNode = YNode.create('<style>' + css + '</style>');

                    head.append(this._extraCSSNode);
                }
            } else {
                //This needs to be wrapped in a contentready callback for the !_ready state
                this.once(EVENT_CONTENT_READY, Y.bind(this._setExtraCSS, this, css));
            }

            return css;
        },

        /**
        * Sets the language value on the instance.
        * @private
        * @method _setLang
        * @param {String} value The language to be set
        * @return {String}
        */
        _setLang: function(value) {
            var container;

            if (this._ready) {
                container = this.get(CONTAINER);

                container.setAttribute('lang', value);
            } else {
                //This needs to be wrapped in a contentready callback for the !_ready state
                this.once(EVENT_CONTENT_READY, Y.bind(this._setLang, this, value));
            }

            return value;
        },

        /**
        * Called from the first YUI instance that sets up the internal instance.
        * This loads the content into the ContentEditable element and attaches the contentready event.
        * @private
        * @method _instanceLoaded
        * @param {YUI} inst The internal YUI instance bound to the ContentEditable element
        */
        _instanceLoaded: function(inst) {
            this._instance = inst;

            this._onContentReady();

            var doc = this._instance.config.doc;

            if (!Y.UA.ie) {
                try {
                    //Force other browsers into non CSS styling
                    doc.execCommand('styleWithCSS', false, false);
                    doc.execCommand('insertbronreturn', false, false);
                } catch (err) {}
            }
        },


        /**
        * Validates linkedcss property
        *
        * @method _validateLinkedCSS
        * @private
        */
        _validateLinkedCSS: function(value) {
            return Lang.isString(value) || Lang.isArray(value);
        },

        //BEGIN PUBLIC METHODS
        /**
        * This is a scoped version of the normal YUI.use method & is bound to the ContentEditable element
        * At setup, the inst.use method is mapped to this method.
        * @method use
        */
        use: function() {
            Y.log('Calling augmented use after ready', 'info', 'contenteditable');

            var inst = this.getInstance(),
                args = Y.Array(arguments),
                callback = false;

            if (Lang.isFunction(args[args.length - 1])) {
                callback = args.pop();
            }

            if (callback) {
                args.push(function() {
                    Y.log('Internal callback from augmented use', 'info', 'contenteditable');

                    callback.apply(inst, arguments);
                });
            }

            return inst.__use.apply(inst, args);
        },

        /**
        * A delegate method passed to the instance's delegate method
        * @method delegate
        * @param {String} type The type of event to listen for
        * @param {Function} fn The method to attach
        * @param {String, Node} cont The container to act as a delegate, if no "sel" passed, the container is assumed.
        * @param {String} sel The selector to match in the event (optional)
        * @return {EventHandle} The Event handle returned from Y.delegate
        */
        delegate: function(type, fn, cont, sel) {
            var inst = this.getInstance();

            if (!inst) {
                Y.log('Delegate events can not be attached until after the ready event has fired.', 'error', 'contenteditable');

                return false;
            }

            if (!sel) {
                sel = cont;

                cont = this.get(CONTAINER);
            }

            return inst.delegate(type, fn, cont, sel);
        },

        /**
        * Get a reference to the internal YUI instance.
        * @method getInstance
        * @return {YUI} The internal YUI instance
        */
        getInstance: function() {
            return this._instance;
        },

        /**
        * @method render
        * @param {String/HTMLElement/Node} node The node to render to
        * @return {ContentEditable}
        * @chainable
        */
        render: function(node) {
            var args, inst, fn;

            if (this._rendered) {
                Y.log('Container already rendered.', 'warn', 'contentEditable');

                return this;
            }

            if (node) {
                this.set(CONTAINER, node);
            }

            container = this.get(CONTAINER);

            if (!container) {
                container = YNode.create(ContentEditable.HTML);

                Y.one('body').prepend(container);

                this.set(CONTAINER, container);
            }

            this._rendered = true;

            this._container.setAttribute(CONTENT_EDITABLE, true);

            args = Y.clone(this.get(USE));

            fn = Y.bind(function() {
                inst = YUI();

                inst.host = this.get(HOST); //Cross reference to Editor

                inst.log = Y.log; //Dump the instance logs to the parent instance.

                Y.log('Creating new internal instance with node-base only', 'info', 'contenteditable');
                inst.use('node-base', Y.bind(this._instanceLoaded, this));
            }, this);

            args.push(fn);

            Y.log('Adding new modules to main instance: ' + args, 'info', 'contenteditable');
            Y.use.apply(Y, args);

            return this;
        },

        /**
        * Set the focus to the container
        * @method focus
        * @param {Function} fn Callback function to execute after focus happens
        * @return {ContentEditable}
        * @chainable
        */
        focus: function() {
            this._container.focus();

            return this;
        },
        /**
        * Show the iframe instance
        * @method show
        * @return {ContentEditable}
        * @chainable
        */
        show: function() {
            this._container.show();

            this.focus();

            return this;
        },

        /**
        * Hide the iframe instance
        * @method hide
        * @return {ContentEditable}
        * @chainable
        */
        hide: function() {
            this._container.hide();

            return this;
        }
    },
    {
        /**
        * The throttle time for key events in IE
        * @static
        * @property THROTTLE_TIME
        * @type Number
        * @default 100
        */
        THROTTLE_TIME: 100,

        /**
        * The DomEvents that the frame automatically attaches and bubbles
        * @static
        * @property DOM_EVENTS
        * @type Object
        */
        DOM_EVENTS: {
            click: 1,
            dblclick: 1,
            focusin: 1,
            focusout: 1,
            keydown: 1,
            keypress: 1,
            keyup: 1,
            mousedown: 1,
            mouseup: 1,
            paste: 1
        },

        /**
        * The template string used to create the ContentEditable element
        * @static
        * @property HTML
        * @type String
        */
        HTML: '<div></div>',

        /**
        * The name of the class (contentEditable)
        * @static
        * @property NAME
        * @type String
        */
        NAME: 'contentEditable',

        /**
        * The namespace on which ContentEditable plugin will reside.
        *
        * @property NS
        * @type String
        * @default 'contentEditable'
        * @static
        */
        NS: CONTENT_EDITABLE,

        ATTRS: {
            /**
            * The default text direction for this ContentEditable element. Default: ltr
            * @attribute dir
            * @type String
            */
            dir: {
                lazyAdd: false,
                validator: Lang.isString,
                setter: '_setDir',
                valueFn: '_getDir'
            },

            /**
            * The container to set contentEditable=true or to create on render.
            * @attribute container
            * @type String/HTMLElement/Node
            */
            container: {
                setter: function(n) {
                    this._container = Y.one(n);

                    return this._container;
                }
            },

            /**
            * The string to inject as Editor content. Default '<br>'
            * @attribute content
            * @type String
            */
            content: {
                getter: '_getHTML',
                lazyAdd: false,
                setter: '_setHTML',
                validator: Lang.isString,
                value: '<br>'
            },

            /**
            * The default tag to use for block level items, defaults to: p
            * @attribute defaultblock
            * @type String
            */
            defaultblock: {
                validator: Lang.isString,
                value: TAG_PARAGRAPH,
                valueFn: '_getDefaultBlock'
            },

            /**
            * A string of CSS to add to the Head of the Editor
            * @attribute extracss
            * @type String
            */
            extracss: {
                lazyAdd: false,
                setter: '_setExtraCSS',
                validator: Lang.isString,
                valueFn: '_getExtraCSS'
            },

            /**
            * Set the id of the new Node. (optional)
            * @attribute id
            * @type String
            * @writeonce
            */
            id: {
                writeOnce: true,
                getter: function(id) {
                    if (!id) {
                        id = 'inlineedit-' + Y.guid();
                    }

                    return id;
                }
            },

            /**
            * The default language. Default: en-US
            * @attribute lang
            * @type String
            */
            lang: {
                validator: Lang.isString,
                setter: '_setLang',
                lazyAdd: false,
                value: 'en-US'
            },

            /**
            * An array of url's to external linked style sheets
            * @attribute linkedcss
            * @type String|Array
            */
            linkedcss: {
                setter: '_setLinkedCSS',
                validator: '_validateLinkedCSS'
                //value: ''
            },

            /**
            * The Node instance of the container.
            * @attribute node
            * @type Node
            */
            node: {
                readOnly: true,
                value: null,
                getter: function() {
                    return this._container;
                }
            },

            /**
            * Array of modules to include in the scoped YUI instance at render time. Default: ['node-base', 'editor-selection', 'stylesheet']
            * @attribute use
            * @writeonce
            * @type Array
            */
            use: {
                validator: Lang.isArray,
                writeOnce: true,
                value: ['node-base', 'editor-selection', 'stylesheet']
            }
        }
    });

    Y.namespace('Plugin');

    Y.Plugin.ContentEditable = ContentEditable;

}, '3.17.2', {"requires": ["node-base", "editor-selection", "stylesheet", "plugin"]});
