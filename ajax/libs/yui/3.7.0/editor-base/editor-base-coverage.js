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
_yuitest_coverage["build/editor-base/editor-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/editor-base/editor-base.js",
    code: []
};
_yuitest_coverage["build/editor-base/editor-base.js"].code=["YUI.add('editor-base', function (Y, NAME) {","","","    /**","     * Base class for Editor. Handles the business logic of Editor, no GUI involved only utility methods and events.","     *","     *      var editor = new Y.EditorBase({","     *          content: 'Foo'","     *      });","     *      editor.render('#demo');","     *","     * @class EditorBase","     * @extends Base","     * @module editor","     * @main editor","     * @submodule editor-base","     * @constructor","     */","    ","    var EditorBase = function() {","        EditorBase.superclass.constructor.apply(this, arguments);","    }, LAST_CHILD = ':last-child', BODY = 'body';","","    Y.extend(EditorBase, Y.Base, {","        /**","        * Internal reference to the Y.Frame instance","        * @property frame","        */","        frame: null,","        initializer: function() {","            var frame = new Y.Frame({","                designMode: true,","                title: EditorBase.STRINGS.title,","                use: EditorBase.USE,","                dir: this.get('dir'),","                extracss: this.get('extracss'),","                linkedcss: this.get('linkedcss'),","                defaultblock: this.get('defaultblock'),","                host: this","            }).plug(Y.Plugin.ExecCommand);","","","            frame.after('ready', Y.bind(this._afterFrameReady, this));","            frame.addTarget(this);","","            this.frame = frame;","","            this.publish('nodeChange', {","                emitFacade: true,","                bubbles: true,","                defaultFn: this._defNodeChangeFn","            });","            ","            //this.plug(Y.Plugin.EditorPara);","        },","        destructor: function() {","            this.frame.destroy();","","            this.detachAll();","        },","        /**","        * Copy certain styles from one node instance to another (used for new paragraph creation mainly)","        * @method copyStyles","        * @param {Node} from The Node instance to copy the styles from ","        * @param {Node} to The Node instance to copy the styles to","        */","        copyStyles: function(from, to) {","            if (from.test('a')) {","                //Don't carry the A styles","                return;","            }","            var styles = ['color', 'fontSize', 'fontFamily', 'backgroundColor', 'fontStyle' ],","                newStyles = {};","","            Y.each(styles, function(v) {","                newStyles[v] = from.getStyle(v);","            });","            if (from.ancestor('b,strong')) {","                newStyles.fontWeight = 'bold';","            }","            if (from.ancestor('u')) {","                if (!newStyles.textDecoration) {","                    newStyles.textDecoration = 'underline';","                }","            }","            to.setStyles(newStyles);","        },","        /**","        * Holder for the selection bookmark in IE.","        * @property _lastBookmark","        * @private","        */","        _lastBookmark: null,","        /**","        * Resolves the e.changedNode in the nodeChange event if it comes from the document. If","        * the event came from the document, it will get the last child of the last child of the document","        * and return that instead.","        * @method _resolveChangedNode","        * @param {Node} n The node to resolve","        * @private","        */","        _resolveChangedNode: function(n) {","            var inst = this.getInstance(), lc, lc2, found;","            if (n && n.test(BODY)) {","                var sel = new inst.EditorSelection();","                if (sel && sel.anchorNode) {","                    n = sel.anchorNode;","                }","            }","            if (inst && n && n.test('html')) {","                lc = inst.one(BODY).one(LAST_CHILD);","                while (!found) {","                    if (lc) {","                        lc2 = lc.one(LAST_CHILD);","                        if (lc2) {","                            lc = lc2;","                        } else {","                            found = true;","                        }","                    } else {","                        found = true;","                    }","                }","                if (lc) {","                    if (lc.test('br')) {","                        if (lc.previous()) {","                            lc = lc.previous();","                        } else {","                            lc = lc.get('parentNode');","                        }","                    }","                    if (lc) {","                        n = lc;","                    }","                }","            }","            if (!n) {","                //Fallback to make sure a node is attached to the event","                n = inst.one(BODY);","            }","            return n;","        },","        /**","        * The default handler for the nodeChange event.","        * @method _defNodeChangeFn","        * @param {Event} e The event","        * @private","        */","        _defNodeChangeFn: function(e) {","            var startTime = (new Date()).getTime();","            var inst = this.getInstance(), sel, cur,","                btag = inst.EditorSelection.DEFAULT_BLOCK_TAG;","","            if (Y.UA.ie) {","                try {","                    sel = inst.config.doc.selection.createRange();","                    if (sel.getBookmark) {","                        this._lastBookmark = sel.getBookmark();","                    }","                } catch (ie) {}","            }","","            e.changedNode = this._resolveChangedNode(e.changedNode);","","","            /*","            * @TODO","            * This whole method needs to be fixed and made more dynamic.","            * Maybe static functions for the e.changeType and an object bag","            * to walk through and filter to pass off the event to before firing..","            */","            ","            switch (e.changedType) {","                case 'keydown':","                    if (!Y.UA.gecko) {","                        if (!EditorBase.NC_KEYS[e.changedEvent.keyCode] && !e.changedEvent.shiftKey && !e.changedEvent.ctrlKey && (e.changedEvent.keyCode !== 13)) {","                            //inst.later(100, inst, inst.EditorSelection.cleanCursor);","                        }","                    }","                    break;","                case 'tab':","                    if (!e.changedNode.test('li, li *') && !e.changedEvent.shiftKey) {","                        e.changedEvent.frameEvent.preventDefault();","                        if (Y.UA.webkit) {","                            this.execCommand('inserttext', '\\t');","                        } else if (Y.UA.gecko) {","                            this.frame.exec._command('inserthtml', EditorBase.TABKEY);","                        } else if (Y.UA.ie) {","                            this.execCommand('inserthtml', EditorBase.TABKEY);","                        }","                    }","                    break;","                case 'backspace-up':","                    // Fixes #2531090 - Joins text node strings so they become one for bidi","                    if (Y.UA.webkit && e.changedNode) {","			            e.changedNode.set('innerHTML', e.changedNode.get('innerHTML'));","		            }","                    break;","            }","            if (Y.UA.webkit && e.commands && (e.commands.indent || e.commands.outdent)) {","                /*","                * When executing execCommand 'indent or 'outdent' Webkit applies","                * a class to the BLOCKQUOTE that adds left/right margin to it","                * This strips that style so it is just a normal BLOCKQUOTE","                */","                var bq = inst.all('.webkit-indent-blockquote, blockquote');","                if (bq.size()) {","                    bq.setStyle('margin', '');","                }","            }","","            var changed = this.getDomPath(e.changedNode, false),","                cmds = {}, family, fsize, classes = [],","                fColor = '', bColor = '';","","            if (e.commands) {","                cmds = e.commands;","            }","            ","            var normal = false;","","            Y.each(changed, function(el) {","                var tag = el.tagName.toLowerCase(),","                    cmd = EditorBase.TAG2CMD[tag];","","                if (cmd) {","                    cmds[cmd] = 1;","                }","","                //Bold and Italic styles","                var s = el.currentStyle || el.style;","                ","                if ((''+s.fontWeight) == 'normal') {","                    normal = true;","                }","                if ((''+s.fontWeight) == 'bold') { //Cast this to a string","                    cmds.bold = 1;","                }","                if (Y.UA.ie) {","                    if (s.fontWeight > 400) {","                        cmds.bold = 1;","                    }","                }","                if (s.fontStyle == 'italic') {","                    cmds.italic = 1;","                }","","                if (s.textDecoration.indexOf('underline') > -1) {","                    cmds.underline = 1;","                }","                if (s.textDecoration.indexOf('line-through') > -1) {","                    cmds.strikethrough = 1;","                }","                ","                var n = inst.one(el);","                if (n.getStyle('fontFamily')) {","                    var family2 = n.getStyle('fontFamily').split(',')[0].toLowerCase();","                    if (family2) {","                        family = family2;","                    }","                    if (family) {","                        family = family.replace(/'/g, '').replace(/\"/g, '');","                    }","                }","","                fsize = EditorBase.NORMALIZE_FONTSIZE(n);","","","                var cls = el.className.split(' ');","","                Y.each(cls, function(v) {","                    if (v !== '' && (v.substr(0, 4) !== 'yui_')) {","                        classes.push(v);","                    }","                });","","                fColor = EditorBase.FILTER_RGB(n.getStyle('color'));","                var bColor2 = EditorBase.FILTER_RGB(s.backgroundColor);","                if (bColor2 !== 'transparent') {","                    if (bColor2 !== '') {","                        bColor = bColor2;","                    }","                }","                ","            });","            ","            if (normal) {","                delete cmds.bold;","                delete cmds.italic;","            }","","            e.dompath = inst.all(changed);","            e.classNames = classes;","            e.commands = cmds;","","            //TODO Dont' like this, not dynamic enough..","            if (!e.fontFamily) {","                e.fontFamily = family;","            }","            if (!e.fontSize) {","                e.fontSize = fsize;","            }","            if (!e.fontColor) {","                e.fontColor = fColor;","            }","            if (!e.backgroundColor) {","                e.backgroundColor = bColor;","            }","","            var endTime = (new Date()).getTime();","        },","        /**","        * Walk the dom tree from this node up to body, returning a reversed array of parents.","        * @method getDomPath","        * @param {Node} node The Node to start from ","        */","        getDomPath: function(node, nodeList) {","			var domPath = [], domNode,","                inst = this.frame.getInstance();","","            domNode = inst.Node.getDOMNode(node);","            //return inst.all(domNode);","","            while (domNode !== null) {","                ","                if ((domNode === inst.config.doc.documentElement) || (domNode === inst.config.doc) || !domNode.tagName) {","                    domNode = null;","                    break;","                }","                ","                if (!inst.DOM.inDoc(domNode)) {","                    domNode = null;","                    break;","                }","                ","                //Check to see if we get el.nodeName and nodeType","                if (domNode.nodeName && domNode.nodeType && (domNode.nodeType == 1)) {","                    domPath.push(domNode);","                }","","                if (domNode == inst.config.doc.body) {","                    domNode = null;","                    break;","                }","","                domNode = domNode.parentNode;","            }","","            /*{{{ Using Node ","            while (node !== null) {","                if (node.test('html') || node.test('doc') || !node.get('tagName')) {","                    node = null;","                    break;","                }","                if (!node.inDoc()) {","                    node = null;","                    break;","                }","                //Check to see if we get el.nodeName and nodeType","                if (node.get('nodeName') && node.get('nodeType') && (node.get('nodeType') == 1)) {","                    domPath.push(inst.Node.getDOMNode(node));","                }","","                if (node.test('body')) {","                    node = null;","                    break;","                }","","                node = node.get('parentNode');","            }","            }}}*/","","            if (domPath.length === 0) {","                domPath[0] = inst.config.doc.body;","            }","","            if (nodeList) {","                return inst.all(domPath.reverse());","            } else {","                return domPath.reverse();","            }","","        },","        /**","        * After frame ready, bind mousedown & keyup listeners","        * @method _afterFrameReady","        * @private","        */","        _afterFrameReady: function() {","            var inst = this.frame.getInstance();","            ","            this.frame.on('dom:mouseup', Y.bind(this._onFrameMouseUp, this));","            this.frame.on('dom:mousedown', Y.bind(this._onFrameMouseDown, this));","            this.frame.on('dom:keydown', Y.bind(this._onFrameKeyDown, this));","","            if (Y.UA.ie) {","                this.frame.on('dom:activate', Y.bind(this._onFrameActivate, this));","                this.frame.on('dom:beforedeactivate', Y.bind(this._beforeFrameDeactivate, this));","            }","            this.frame.on('dom:keyup', Y.bind(this._onFrameKeyUp, this));","            this.frame.on('dom:keypress', Y.bind(this._onFrameKeyPress, this));","            this.frame.on('dom:paste', Y.bind(this._onPaste, this));","","            inst.EditorSelection.filter();","            this.fire('ready');","        },","        /**","        * Caches the current cursor position in IE.","        * @method _beforeFrameDeactivate","        * @private","        */","        _beforeFrameDeactivate: function(e) {","            if (e.frameTarget.test('html')) { //Means it came from a scrollbar","                return;","            }","            var inst = this.getInstance(),","                sel = inst.config.doc.selection.createRange();","            ","            if (sel.compareEndPoints && !sel.compareEndPoints('StartToEnd', sel)) {","                sel.pasteHTML('<var id=\"yui-ie-cursor\">');","            }","        },","        /**","        * Moves the cached selection bookmark back so IE can place the cursor in the right place.","        * @method _onFrameActivate","        * @private","        */","        _onFrameActivate: function(e) {","            if (e.frameTarget.test('html')) { //Means it came from a scrollbar","                return;","            }","            var inst = this.getInstance(),","                sel = new inst.EditorSelection(),","                range = sel.createRange(),","                cur = inst.all('#yui-ie-cursor');","","            if (cur.size()) {","                cur.each(function(n) {","                    n.set('id', '');","                    if (range.moveToElementText) {","                        try {","                            range.moveToElementText(n._node);","                            var moved = range.move('character', -1);","                            if (moved === -1) { //Only move up if we actually moved back.","                                range.move('character', 1);","                            }","                            range.select();","                            range.text = '';","                        } catch (e) {}","                    }","                    n.remove();","                });","            }","        },","        /**","        * Fires nodeChange event","        * @method _onPaste","        * @private","        */","        _onPaste: function(e) {","            this.fire('nodeChange', { changedNode: e.frameTarget, changedType: 'paste', changedEvent: e.frameEvent });","        },","        /**","        * Fires nodeChange event","        * @method _onFrameMouseUp","        * @private","        */","        _onFrameMouseUp: function(e) {","            this.fire('nodeChange', { changedNode: e.frameTarget, changedType: 'mouseup', changedEvent: e.frameEvent  });","        },","        /**","        * Fires nodeChange event","        * @method _onFrameMouseDown","        * @private","        */","        _onFrameMouseDown: function(e) {","            this.fire('nodeChange', { changedNode: e.frameTarget, changedType: 'mousedown', changedEvent: e.frameEvent  });","        },","        /**","        * Caches a copy of the selection for key events. Only creating the selection on keydown","        * @property _currentSelection","        * @private","        */","        _currentSelection: null,","        /**","        * Holds the timer for selection clearing","        * @property _currentSelectionTimer","        * @private","        */","        _currentSelectionTimer: null,","        /**","        * Flag to determine if we can clear the selection or not.","        * @property _currentSelectionClear","        * @private","        */","        _currentSelectionClear: null,","        /**","        * Fires nodeChange event","        * @method _onFrameKeyDown","        * @private","        */","        _onFrameKeyDown: function(e) {","            var inst, sel;","            if (!this._currentSelection) {","                if (this._currentSelectionTimer) {","                    this._currentSelectionTimer.cancel();","                }","                this._currentSelectionTimer = Y.later(850, this, function() {","                    this._currentSelectionClear = true;","                });","                ","                inst = this.frame.getInstance();","                sel = new inst.EditorSelection(e);","","                this._currentSelection = sel;","            } else {","                sel = this._currentSelection;","            }","","            inst = this.frame.getInstance();","            sel = new inst.EditorSelection();","","            this._currentSelection = sel;","            ","            if (sel && sel.anchorNode) {","                this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: 'keydown', changedEvent: e.frameEvent });","                if (EditorBase.NC_KEYS[e.keyCode]) {","                    this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: EditorBase.NC_KEYS[e.keyCode], changedEvent: e.frameEvent });","                    this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: EditorBase.NC_KEYS[e.keyCode] + '-down', changedEvent: e.frameEvent });","                }","            }","        },","        /**","        * Fires nodeChange event","        * @method _onFrameKeyPress","        * @private","        */","        _onFrameKeyPress: function(e) {","            var sel = this._currentSelection;","","            if (sel && sel.anchorNode) {","                this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: 'keypress', changedEvent: e.frameEvent });","                if (EditorBase.NC_KEYS[e.keyCode]) {","                    this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: EditorBase.NC_KEYS[e.keyCode] + '-press', changedEvent: e.frameEvent });","                }","            }","        },","        /**","        * Fires nodeChange event for keyup on specific keys","        * @method _onFrameKeyUp","        * @private","        */","        _onFrameKeyUp: function(e) {","            var inst = this.frame.getInstance(),","                sel = new inst.EditorSelection(e);","","            if (sel && sel.anchorNode) {","                this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: 'keyup', selection: sel, changedEvent: e.frameEvent  });","                if (EditorBase.NC_KEYS[e.keyCode]) {","                    this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: EditorBase.NC_KEYS[e.keyCode] + '-up', selection: sel, changedEvent: e.frameEvent  });","                }","            }","            if (this._currentSelectionClear) {","                this._currentSelectionClear = this._currentSelection = null;","            }","        },","        /**","        * Pass through to the frame.execCommand method","        * @method execCommand","        * @param {String} cmd The command to pass: inserthtml, insertimage, bold","        * @param {String} val The optional value of the command: Helvetica","        * @return {Node/NodeList} The Node or Nodelist affected by the command. Only returns on override commands, not browser defined commands.","        */","        execCommand: function(cmd, val) {","            var ret = this.frame.execCommand(cmd, val),","                inst = this.frame.getInstance(),","                sel = new inst.EditorSelection(), cmds = {},","                e = { changedNode: sel.anchorNode, changedType: 'execcommand', nodes: ret };","","            switch (cmd) {","                case 'forecolor':","                    e.fontColor = val;","                    break;","                case 'backcolor':","                    e.backgroundColor = val;","                    break;","                case 'fontsize':","                    e.fontSize = val;","                    break;","                case 'fontname':","                    e.fontFamily = val;","                    break;","            }","","            cmds[cmd] = 1;","            e.commands = cmds;","","            this.fire('nodeChange', e);","","            return ret;","        },","        /**","        * Get the YUI instance of the frame","        * @method getInstance","        * @return {YUI} The YUI instance bound to the frame.","        */","        getInstance: function() {","            return this.frame.getInstance();","        },","        /**","        * Renders the Y.Frame to the passed node.","        * @method render","        * @param {Selector/HTMLElement/Node} node The node to append the Editor to","        * @return {EditorBase}","        * @chainable","        */","        render: function(node) {","            this.frame.set('content', this.get('content'));","            this.frame.render(node);","            return this;","        },","        /**","        * Focus the contentWindow of the iframe","        * @method focus","        * @param {Function} fn Callback function to execute after focus happens","        * @return {EditorBase}","        * @chainable","        */","        focus: function(fn) {","            this.frame.focus(fn);","            return this;","        },","        /**","        * Handles the showing of the Editor instance. Currently only handles the iframe","        * @method show","        * @return {EditorBase}","        * @chainable","        */","        show: function() {","            this.frame.show();","            return this;","        },","        /**","        * Handles the hiding of the Editor instance. Currently only handles the iframe","        * @method hide","        * @return {EditorBase}","        * @chainable","        */","        hide: function() {","            this.frame.hide();","            return this;","        },","        /**","        * (Un)Filters the content of the Editor, cleaning YUI related code. //TODO better filtering","        * @method getContent","        * @return {String} The filtered content of the Editor","        */","        getContent: function() {","            var html = '', inst = this.getInstance();","            if (inst && inst.EditorSelection) {","                html = inst.EditorSelection.unfilter();","            }","            //Removing the _yuid from the objects in IE","            html = html.replace(/ _yuid=\"([^>]*)\"/g, '');","            return html;","        }","    }, {","        /**","        * @static","        * @method NORMALIZE_FONTSIZE","        * @description Pulls the fontSize from a node, then checks for string values (x-large, x-small)","        * and converts them to pixel sizes. If the parsed size is different from the original, it calls","        * node.setStyle to update the node with a pixel size for normalization.","        */","        NORMALIZE_FONTSIZE: function(n) {","            var size = n.getStyle('fontSize'), oSize = size;","            ","            switch (size) {","                case '-webkit-xxx-large':","                    size = '48px';","                    break;","                case 'xx-large':","                    size = '32px';","                    break;","                case 'x-large':","                    size = '24px';","                    break;","                case 'large':","                    size = '18px';","                    break;","                case 'medium':","                    size = '16px';","                    break;","                case 'small':","                    size = '13px';","                    break;","                case 'x-small':","                    size = '10px';","                    break;","            }","            if (oSize !== size) {","                n.setStyle('fontSize', size);","            }","            return size;","        },","        /**","        * @static","        * @property TABKEY","        * @description The HTML markup to use for the tabkey","        */","        TABKEY: '<span class=\"tab\">&nbsp;&nbsp;&nbsp;&nbsp;</span>',","        /**","        * @static","        * @method FILTER_RGB","        * @param String css The CSS string containing rgb(#,#,#);","        * @description Converts an RGB color string to a hex color, example: rgb(0, 255, 0) converts to #00ff00","        * @return String","        */","        FILTER_RGB: function(css) {","            if (css.toLowerCase().indexOf('rgb') != -1) {","                var exp = new RegExp(\"(.*?)rgb\\\\s*?\\\\(\\\\s*?([0-9]+).*?,\\\\s*?([0-9]+).*?,\\\\s*?([0-9]+).*?\\\\)(.*?)\", \"gi\");","                var rgb = css.replace(exp, \"$1,$2,$3,$4,$5\").split(',');","            ","                if (rgb.length == 5) {","                    var r = parseInt(rgb[1], 10).toString(16);","                    var g = parseInt(rgb[2], 10).toString(16);","                    var b = parseInt(rgb[3], 10).toString(16);","","                    r = r.length == 1 ? '0' + r : r;","                    g = g.length == 1 ? '0' + g : g;","                    b = b.length == 1 ? '0' + b : b;","","                    css = \"#\" + r + g + b;","                }","            }","            return css;","        },        ","        /**","        * @static","        * @property TAG2CMD","        * @description A hash table of tags to their execcomand's","        */","        TAG2CMD: {","            'b': 'bold',","            'strong': 'bold',","            'i': 'italic',","            'em': 'italic',","            'u': 'underline',","            'sup': 'superscript',","            'sub': 'subscript',","            'img': 'insertimage',","            'a' : 'createlink',","            'ul' : 'insertunorderedlist',","            'ol' : 'insertorderedlist'","        },","        /**","        * Hash table of keys to fire a nodeChange event for.","        * @static","        * @property NC_KEYS","        * @type Object","        */","        NC_KEYS: {","            8: 'backspace',","            9: 'tab',","            13: 'enter',","            32: 'space',","            33: 'pageup',","            34: 'pagedown',","            35: 'end',","            36: 'home',","            37: 'left',","            38: 'up',","            39: 'right',","            40: 'down',","            46: 'delete'","        },","        /**","        * The default modules to use inside the Frame","        * @static","        * @property USE","        * @type Array","        */","        USE: ['substitute', 'node', 'selector-css3', 'editor-selection', 'stylesheet'],","        /**","        * The Class Name: editorBase","        * @static","        * @property NAME","        */","        NAME: 'editorBase',","        /**","        * Editor Strings.  By default contains only the `title` property for the","        * Title of frame document (default \"Rich Text Editor\").","        *","        * @static","        * @property STRINGS","        */","        STRINGS: {","            title: 'Rich Text Editor'","        },","        ATTRS: {","            /**","            * The content to load into the Editor Frame","            * @attribute content","            */","            content: {","                value: '<br class=\"yui-cursor\">',","                setter: function(str) {","                    if (str.substr(0, 1) === \"\\n\") {","                        str = str.substr(1);","                    }","                    if (str === '') {","                        str = '<br class=\"yui-cursor\">';","                    }","                    if (str === ' ') {","                        if (Y.UA.gecko) {","                            str = '<br class=\"yui-cursor\">';","                        }","                    }","                    return this.frame.set('content', str);","                },","                getter: function() {","                    return this.frame.get('content');","                }","            },","            /**","            * The value of the dir attribute on the HTML element of the frame. Default: ltr","            * @attribute dir","            */","            dir: {","                writeOnce: true,","                value: 'ltr'","            },","            /**","            * @attribute linkedcss","            * @description An array of url's to external linked style sheets","            * @type String","            */            ","            linkedcss: {","                value: '',","                setter: function(css) {","                    if (this.frame) {","                        this.frame.set('linkedcss', css);","                    }","                    return css;","                }","            },","            /**","            * @attribute extracss","            * @description A string of CSS to add to the Head of the Editor","            * @type String","            */            ","            extracss: {","                value: false,","                setter: function(css) {","                    if (this.frame) {","                        this.frame.set('extracss', css);","                    }","                    return css;","                }","            },","            /**","            * @attribute defaultblock","            * @description The default tag to use for block level items, defaults to: p","            * @type String","            */            ","            defaultblock: {","                value: 'p'","            }","        }","    });","","    Y.EditorBase = EditorBase;","","    /**","    * @event nodeChange","    * @description Fired from several mouse/key/paste event points.","    * @param {Event.Facade} event An Event Facade object with the following specific properties added:","    * <dl>","    *   <dt>changedEvent</dt><dd>The event that caused the nodeChange</dd>","    *   <dt>changedNode</dt><dd>The node that was interacted with</dd>","    *   <dt>changedType</dt><dd>The type of change: mousedown, mouseup, right, left, backspace, tab, enter, etc..</dd>","    *   <dt>commands</dt><dd>The list of execCommands that belong to this change and the dompath that's associated with the changedNode</dd>","    *   <dt>classNames</dt><dd>An array of classNames that are applied to the changedNode and all of it's parents</dd>","    *   <dt>dompath</dt><dd>A sorted array of node instances that make up the DOM path from the changedNode to body.</dd>","    *   <dt>backgroundColor</dt><dd>The cascaded backgroundColor of the changedNode</dd>","    *   <dt>fontColor</dt><dd>The cascaded fontColor of the changedNode</dd>","    *   <dt>fontFamily</dt><dd>The cascaded fontFamily of the changedNode</dd>","    *   <dt>fontSize</dt><dd>The cascaded fontSize of the changedNode</dd>","    * </dl>","    * @type {Event.Custom}","    */","","    /**","    * @event ready","    * @description Fired after the frame is ready.","    * @param {Event.Facade} event An Event Facade object.","    * @type {Event.Custom}","    */","","","","","","}, '@VERSION@', {\"requires\": [\"base\", \"frame\", \"node\", \"exec-command\", \"editor-selection\"]});"];
_yuitest_coverage["build/editor-base/editor-base.js"].lines = {"1":0,"20":0,"21":0,"24":0,"31":0,"43":0,"44":0,"46":0,"48":0,"57":0,"59":0,"68":0,"70":0,"72":0,"75":0,"76":0,"78":0,"79":0,"81":0,"82":0,"83":0,"86":0,"103":0,"104":0,"105":0,"106":0,"107":0,"110":0,"111":0,"112":0,"113":0,"114":0,"115":0,"116":0,"118":0,"121":0,"124":0,"125":0,"126":0,"127":0,"129":0,"132":0,"133":0,"137":0,"139":0,"141":0,"150":0,"151":0,"154":0,"155":0,"156":0,"157":0,"158":0,"163":0,"173":0,"175":0,"176":0,"180":0,"182":0,"183":0,"184":0,"185":0,"186":0,"187":0,"188":0,"189":0,"192":0,"195":0,"196":0,"198":0,"200":0,"206":0,"207":0,"208":0,"212":0,"216":0,"217":0,"220":0,"222":0,"223":0,"226":0,"227":0,"231":0,"233":0,"234":0,"236":0,"237":0,"239":0,"240":0,"241":0,"244":0,"245":0,"248":0,"249":0,"251":0,"252":0,"255":0,"256":0,"257":0,"258":0,"259":0,"261":0,"262":0,"266":0,"269":0,"271":0,"272":0,"273":0,"277":0,"278":0,"279":0,"280":0,"281":0,"287":0,"288":0,"289":0,"292":0,"293":0,"294":0,"297":0,"298":0,"300":0,"301":0,"303":0,"304":0,"306":0,"307":0,"310":0,"318":0,"321":0,"324":0,"326":0,"327":0,"328":0,"331":0,"332":0,"333":0,"337":0,"338":0,"341":0,"342":0,"343":0,"346":0,"373":0,"374":0,"377":0,"378":0,"380":0,"390":0,"392":0,"393":0,"394":0,"396":0,"397":0,"398":0,"400":0,"401":0,"402":0,"404":0,"405":0,"413":0,"414":0,"416":0,"419":0,"420":0,"429":0,"430":0,"432":0,"437":0,"438":0,"439":0,"440":0,"441":0,"442":0,"443":0,"444":0,"445":0,"447":0,"448":0,"451":0,"461":0,"469":0,"477":0,"503":0,"504":0,"505":0,"506":0,"508":0,"509":0,"512":0,"513":0,"515":0,"517":0,"520":0,"521":0,"523":0,"525":0,"526":0,"527":0,"528":0,"529":0,"539":0,"541":0,"542":0,"543":0,"544":0,"554":0,"557":0,"558":0,"559":0,"560":0,"563":0,"564":0,"575":0,"580":0,"582":0,"583":0,"585":0,"586":0,"588":0,"589":0,"591":0,"592":0,"595":0,"596":0,"598":0,"600":0,"608":0,"618":0,"619":0,"620":0,"630":0,"631":0,"640":0,"641":0,"650":0,"651":0,"659":0,"660":0,"661":0,"664":0,"665":0,"676":0,"678":0,"680":0,"681":0,"683":0,"684":0,"686":0,"687":0,"689":0,"690":0,"692":0,"693":0,"695":0,"696":0,"698":0,"699":0,"701":0,"702":0,"704":0,"720":0,"721":0,"722":0,"724":0,"725":0,"726":0,"727":0,"729":0,"730":0,"731":0,"733":0,"736":0,"808":0,"809":0,"811":0,"812":0,"814":0,"815":0,"816":0,"819":0,"822":0,"841":0,"842":0,"844":0,"855":0,"856":0,"858":0,"872":0};
_yuitest_coverage["build/editor-base/editor-base.js"].functions = {"EditorBase:20":0,"initializer:30":0,"destructor:56":0,"(anonymous 2):75":0,"copyStyles:67":0,"_resolveChangedNode:102":0,"(anonymous 4):271":0,"(anonymous 3):222":0,"_defNodeChangeFn:149":0,"getDomPath:317":0,"_afterFrameReady:389":0,"_beforeFrameDeactivate:412":0,"(anonymous 5):438":0,"_onFrameActivate:428":0,"_onPaste:460":0,"_onFrameMouseUp:468":0,"_onFrameMouseDown:476":0,"(anonymous 6):508":0,"_onFrameKeyDown:502":0,"_onFrameKeyPress:538":0,"_onFrameKeyUp:553":0,"execCommand:574":0,"getInstance:607":0,"render:617":0,"focus:629":0,"show:639":0,"hide:649":0,"getContent:658":0,"NORMALIZE_FONTSIZE:675":0,"FILTER_RGB:719":0,"setter:807":0,"getter:821":0,"setter:840":0,"setter:854":0,"(anonymous 1):1":0};
_yuitest_coverage["build/editor-base/editor-base.js"].coveredLines = 289;
_yuitest_coverage["build/editor-base/editor-base.js"].coveredFunctions = 35;
_yuitest_coverline("build/editor-base/editor-base.js", 1);
YUI.add('editor-base', function (Y, NAME) {


    /**
     * Base class for Editor. Handles the business logic of Editor, no GUI involved only utility methods and events.
     *
     *      var editor = new Y.EditorBase({
     *          content: 'Foo'
     *      });
     *      editor.render('#demo');
     *
     * @class EditorBase
     * @extends Base
     * @module editor
     * @main editor
     * @submodule editor-base
     * @constructor
     */
    
    _yuitest_coverfunc("build/editor-base/editor-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/editor-base/editor-base.js", 20);
var EditorBase = function() {
        _yuitest_coverfunc("build/editor-base/editor-base.js", "EditorBase", 20);
_yuitest_coverline("build/editor-base/editor-base.js", 21);
EditorBase.superclass.constructor.apply(this, arguments);
    }, LAST_CHILD = ':last-child', BODY = 'body';

    _yuitest_coverline("build/editor-base/editor-base.js", 24);
Y.extend(EditorBase, Y.Base, {
        /**
        * Internal reference to the Y.Frame instance
        * @property frame
        */
        frame: null,
        initializer: function() {
            _yuitest_coverfunc("build/editor-base/editor-base.js", "initializer", 30);
_yuitest_coverline("build/editor-base/editor-base.js", 31);
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


            _yuitest_coverline("build/editor-base/editor-base.js", 43);
frame.after('ready', Y.bind(this._afterFrameReady, this));
            _yuitest_coverline("build/editor-base/editor-base.js", 44);
frame.addTarget(this);

            _yuitest_coverline("build/editor-base/editor-base.js", 46);
this.frame = frame;

            _yuitest_coverline("build/editor-base/editor-base.js", 48);
this.publish('nodeChange', {
                emitFacade: true,
                bubbles: true,
                defaultFn: this._defNodeChangeFn
            });
            
            //this.plug(Y.Plugin.EditorPara);
        },
        destructor: function() {
            _yuitest_coverfunc("build/editor-base/editor-base.js", "destructor", 56);
_yuitest_coverline("build/editor-base/editor-base.js", 57);
this.frame.destroy();

            _yuitest_coverline("build/editor-base/editor-base.js", 59);
this.detachAll();
        },
        /**
        * Copy certain styles from one node instance to another (used for new paragraph creation mainly)
        * @method copyStyles
        * @param {Node} from The Node instance to copy the styles from 
        * @param {Node} to The Node instance to copy the styles to
        */
        copyStyles: function(from, to) {
            _yuitest_coverfunc("build/editor-base/editor-base.js", "copyStyles", 67);
_yuitest_coverline("build/editor-base/editor-base.js", 68);
if (from.test('a')) {
                //Don't carry the A styles
                _yuitest_coverline("build/editor-base/editor-base.js", 70);
return;
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 72);
var styles = ['color', 'fontSize', 'fontFamily', 'backgroundColor', 'fontStyle' ],
                newStyles = {};

            _yuitest_coverline("build/editor-base/editor-base.js", 75);
Y.each(styles, function(v) {
                _yuitest_coverfunc("build/editor-base/editor-base.js", "(anonymous 2)", 75);
_yuitest_coverline("build/editor-base/editor-base.js", 76);
newStyles[v] = from.getStyle(v);
            });
            _yuitest_coverline("build/editor-base/editor-base.js", 78);
if (from.ancestor('b,strong')) {
                _yuitest_coverline("build/editor-base/editor-base.js", 79);
newStyles.fontWeight = 'bold';
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 81);
if (from.ancestor('u')) {
                _yuitest_coverline("build/editor-base/editor-base.js", 82);
if (!newStyles.textDecoration) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 83);
newStyles.textDecoration = 'underline';
                }
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 86);
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
            _yuitest_coverfunc("build/editor-base/editor-base.js", "_resolveChangedNode", 102);
_yuitest_coverline("build/editor-base/editor-base.js", 103);
var inst = this.getInstance(), lc, lc2, found;
            _yuitest_coverline("build/editor-base/editor-base.js", 104);
if (n && n.test(BODY)) {
                _yuitest_coverline("build/editor-base/editor-base.js", 105);
var sel = new inst.EditorSelection();
                _yuitest_coverline("build/editor-base/editor-base.js", 106);
if (sel && sel.anchorNode) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 107);
n = sel.anchorNode;
                }
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 110);
if (inst && n && n.test('html')) {
                _yuitest_coverline("build/editor-base/editor-base.js", 111);
lc = inst.one(BODY).one(LAST_CHILD);
                _yuitest_coverline("build/editor-base/editor-base.js", 112);
while (!found) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 113);
if (lc) {
                        _yuitest_coverline("build/editor-base/editor-base.js", 114);
lc2 = lc.one(LAST_CHILD);
                        _yuitest_coverline("build/editor-base/editor-base.js", 115);
if (lc2) {
                            _yuitest_coverline("build/editor-base/editor-base.js", 116);
lc = lc2;
                        } else {
                            _yuitest_coverline("build/editor-base/editor-base.js", 118);
found = true;
                        }
                    } else {
                        _yuitest_coverline("build/editor-base/editor-base.js", 121);
found = true;
                    }
                }
                _yuitest_coverline("build/editor-base/editor-base.js", 124);
if (lc) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 125);
if (lc.test('br')) {
                        _yuitest_coverline("build/editor-base/editor-base.js", 126);
if (lc.previous()) {
                            _yuitest_coverline("build/editor-base/editor-base.js", 127);
lc = lc.previous();
                        } else {
                            _yuitest_coverline("build/editor-base/editor-base.js", 129);
lc = lc.get('parentNode');
                        }
                    }
                    _yuitest_coverline("build/editor-base/editor-base.js", 132);
if (lc) {
                        _yuitest_coverline("build/editor-base/editor-base.js", 133);
n = lc;
                    }
                }
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 137);
if (!n) {
                //Fallback to make sure a node is attached to the event
                _yuitest_coverline("build/editor-base/editor-base.js", 139);
n = inst.one(BODY);
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 141);
return n;
        },
        /**
        * The default handler for the nodeChange event.
        * @method _defNodeChangeFn
        * @param {Event} e The event
        * @private
        */
        _defNodeChangeFn: function(e) {
            _yuitest_coverfunc("build/editor-base/editor-base.js", "_defNodeChangeFn", 149);
_yuitest_coverline("build/editor-base/editor-base.js", 150);
var startTime = (new Date()).getTime();
            _yuitest_coverline("build/editor-base/editor-base.js", 151);
var inst = this.getInstance(), sel, cur,
                btag = inst.EditorSelection.DEFAULT_BLOCK_TAG;

            _yuitest_coverline("build/editor-base/editor-base.js", 154);
if (Y.UA.ie) {
                _yuitest_coverline("build/editor-base/editor-base.js", 155);
try {
                    _yuitest_coverline("build/editor-base/editor-base.js", 156);
sel = inst.config.doc.selection.createRange();
                    _yuitest_coverline("build/editor-base/editor-base.js", 157);
if (sel.getBookmark) {
                        _yuitest_coverline("build/editor-base/editor-base.js", 158);
this._lastBookmark = sel.getBookmark();
                    }
                } catch (ie) {}
            }

            _yuitest_coverline("build/editor-base/editor-base.js", 163);
e.changedNode = this._resolveChangedNode(e.changedNode);


            /*
            * @TODO
            * This whole method needs to be fixed and made more dynamic.
            * Maybe static functions for the e.changeType and an object bag
            * to walk through and filter to pass off the event to before firing..
            */
            
            _yuitest_coverline("build/editor-base/editor-base.js", 173);
switch (e.changedType) {
                case 'keydown':
                    _yuitest_coverline("build/editor-base/editor-base.js", 175);
if (!Y.UA.gecko) {
                        _yuitest_coverline("build/editor-base/editor-base.js", 176);
if (!EditorBase.NC_KEYS[e.changedEvent.keyCode] && !e.changedEvent.shiftKey && !e.changedEvent.ctrlKey && (e.changedEvent.keyCode !== 13)) {
                            //inst.later(100, inst, inst.EditorSelection.cleanCursor);
                        }
                    }
                    _yuitest_coverline("build/editor-base/editor-base.js", 180);
break;
                case 'tab':
                    _yuitest_coverline("build/editor-base/editor-base.js", 182);
if (!e.changedNode.test('li, li *') && !e.changedEvent.shiftKey) {
                        _yuitest_coverline("build/editor-base/editor-base.js", 183);
e.changedEvent.frameEvent.preventDefault();
                        _yuitest_coverline("build/editor-base/editor-base.js", 184);
if (Y.UA.webkit) {
                            _yuitest_coverline("build/editor-base/editor-base.js", 185);
this.execCommand('inserttext', '\t');
                        } else {_yuitest_coverline("build/editor-base/editor-base.js", 186);
if (Y.UA.gecko) {
                            _yuitest_coverline("build/editor-base/editor-base.js", 187);
this.frame.exec._command('inserthtml', EditorBase.TABKEY);
                        } else {_yuitest_coverline("build/editor-base/editor-base.js", 188);
if (Y.UA.ie) {
                            _yuitest_coverline("build/editor-base/editor-base.js", 189);
this.execCommand('inserthtml', EditorBase.TABKEY);
                        }}}
                    }
                    _yuitest_coverline("build/editor-base/editor-base.js", 192);
break;
                case 'backspace-up':
                    // Fixes #2531090 - Joins text node strings so they become one for bidi
                    _yuitest_coverline("build/editor-base/editor-base.js", 195);
if (Y.UA.webkit && e.changedNode) {
			            _yuitest_coverline("build/editor-base/editor-base.js", 196);
e.changedNode.set('innerHTML', e.changedNode.get('innerHTML'));
		            }
                    _yuitest_coverline("build/editor-base/editor-base.js", 198);
break;
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 200);
if (Y.UA.webkit && e.commands && (e.commands.indent || e.commands.outdent)) {
                /*
                * When executing execCommand 'indent or 'outdent' Webkit applies
                * a class to the BLOCKQUOTE that adds left/right margin to it
                * This strips that style so it is just a normal BLOCKQUOTE
                */
                _yuitest_coverline("build/editor-base/editor-base.js", 206);
var bq = inst.all('.webkit-indent-blockquote, blockquote');
                _yuitest_coverline("build/editor-base/editor-base.js", 207);
if (bq.size()) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 208);
bq.setStyle('margin', '');
                }
            }

            _yuitest_coverline("build/editor-base/editor-base.js", 212);
var changed = this.getDomPath(e.changedNode, false),
                cmds = {}, family, fsize, classes = [],
                fColor = '', bColor = '';

            _yuitest_coverline("build/editor-base/editor-base.js", 216);
if (e.commands) {
                _yuitest_coverline("build/editor-base/editor-base.js", 217);
cmds = e.commands;
            }
            
            _yuitest_coverline("build/editor-base/editor-base.js", 220);
var normal = false;

            _yuitest_coverline("build/editor-base/editor-base.js", 222);
Y.each(changed, function(el) {
                _yuitest_coverfunc("build/editor-base/editor-base.js", "(anonymous 3)", 222);
_yuitest_coverline("build/editor-base/editor-base.js", 223);
var tag = el.tagName.toLowerCase(),
                    cmd = EditorBase.TAG2CMD[tag];

                _yuitest_coverline("build/editor-base/editor-base.js", 226);
if (cmd) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 227);
cmds[cmd] = 1;
                }

                //Bold and Italic styles
                _yuitest_coverline("build/editor-base/editor-base.js", 231);
var s = el.currentStyle || el.style;
                
                _yuitest_coverline("build/editor-base/editor-base.js", 233);
if ((''+s.fontWeight) == 'normal') {
                    _yuitest_coverline("build/editor-base/editor-base.js", 234);
normal = true;
                }
                _yuitest_coverline("build/editor-base/editor-base.js", 236);
if ((''+s.fontWeight) == 'bold') { //Cast this to a string
                    _yuitest_coverline("build/editor-base/editor-base.js", 237);
cmds.bold = 1;
                }
                _yuitest_coverline("build/editor-base/editor-base.js", 239);
if (Y.UA.ie) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 240);
if (s.fontWeight > 400) {
                        _yuitest_coverline("build/editor-base/editor-base.js", 241);
cmds.bold = 1;
                    }
                }
                _yuitest_coverline("build/editor-base/editor-base.js", 244);
if (s.fontStyle == 'italic') {
                    _yuitest_coverline("build/editor-base/editor-base.js", 245);
cmds.italic = 1;
                }

                _yuitest_coverline("build/editor-base/editor-base.js", 248);
if (s.textDecoration.indexOf('underline') > -1) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 249);
cmds.underline = 1;
                }
                _yuitest_coverline("build/editor-base/editor-base.js", 251);
if (s.textDecoration.indexOf('line-through') > -1) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 252);
cmds.strikethrough = 1;
                }
                
                _yuitest_coverline("build/editor-base/editor-base.js", 255);
var n = inst.one(el);
                _yuitest_coverline("build/editor-base/editor-base.js", 256);
if (n.getStyle('fontFamily')) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 257);
var family2 = n.getStyle('fontFamily').split(',')[0].toLowerCase();
                    _yuitest_coverline("build/editor-base/editor-base.js", 258);
if (family2) {
                        _yuitest_coverline("build/editor-base/editor-base.js", 259);
family = family2;
                    }
                    _yuitest_coverline("build/editor-base/editor-base.js", 261);
if (family) {
                        _yuitest_coverline("build/editor-base/editor-base.js", 262);
family = family.replace(/'/g, '').replace(/"/g, '');
                    }
                }

                _yuitest_coverline("build/editor-base/editor-base.js", 266);
fsize = EditorBase.NORMALIZE_FONTSIZE(n);


                _yuitest_coverline("build/editor-base/editor-base.js", 269);
var cls = el.className.split(' ');

                _yuitest_coverline("build/editor-base/editor-base.js", 271);
Y.each(cls, function(v) {
                    _yuitest_coverfunc("build/editor-base/editor-base.js", "(anonymous 4)", 271);
_yuitest_coverline("build/editor-base/editor-base.js", 272);
if (v !== '' && (v.substr(0, 4) !== 'yui_')) {
                        _yuitest_coverline("build/editor-base/editor-base.js", 273);
classes.push(v);
                    }
                });

                _yuitest_coverline("build/editor-base/editor-base.js", 277);
fColor = EditorBase.FILTER_RGB(n.getStyle('color'));
                _yuitest_coverline("build/editor-base/editor-base.js", 278);
var bColor2 = EditorBase.FILTER_RGB(s.backgroundColor);
                _yuitest_coverline("build/editor-base/editor-base.js", 279);
if (bColor2 !== 'transparent') {
                    _yuitest_coverline("build/editor-base/editor-base.js", 280);
if (bColor2 !== '') {
                        _yuitest_coverline("build/editor-base/editor-base.js", 281);
bColor = bColor2;
                    }
                }
                
            });
            
            _yuitest_coverline("build/editor-base/editor-base.js", 287);
if (normal) {
                _yuitest_coverline("build/editor-base/editor-base.js", 288);
delete cmds.bold;
                _yuitest_coverline("build/editor-base/editor-base.js", 289);
delete cmds.italic;
            }

            _yuitest_coverline("build/editor-base/editor-base.js", 292);
e.dompath = inst.all(changed);
            _yuitest_coverline("build/editor-base/editor-base.js", 293);
e.classNames = classes;
            _yuitest_coverline("build/editor-base/editor-base.js", 294);
e.commands = cmds;

            //TODO Dont' like this, not dynamic enough..
            _yuitest_coverline("build/editor-base/editor-base.js", 297);
if (!e.fontFamily) {
                _yuitest_coverline("build/editor-base/editor-base.js", 298);
e.fontFamily = family;
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 300);
if (!e.fontSize) {
                _yuitest_coverline("build/editor-base/editor-base.js", 301);
e.fontSize = fsize;
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 303);
if (!e.fontColor) {
                _yuitest_coverline("build/editor-base/editor-base.js", 304);
e.fontColor = fColor;
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 306);
if (!e.backgroundColor) {
                _yuitest_coverline("build/editor-base/editor-base.js", 307);
e.backgroundColor = bColor;
            }

            _yuitest_coverline("build/editor-base/editor-base.js", 310);
var endTime = (new Date()).getTime();
        },
        /**
        * Walk the dom tree from this node up to body, returning a reversed array of parents.
        * @method getDomPath
        * @param {Node} node The Node to start from 
        */
        getDomPath: function(node, nodeList) {
			_yuitest_coverfunc("build/editor-base/editor-base.js", "getDomPath", 317);
_yuitest_coverline("build/editor-base/editor-base.js", 318);
var domPath = [], domNode,
                inst = this.frame.getInstance();

            _yuitest_coverline("build/editor-base/editor-base.js", 321);
domNode = inst.Node.getDOMNode(node);
            //return inst.all(domNode);

            _yuitest_coverline("build/editor-base/editor-base.js", 324);
while (domNode !== null) {
                
                _yuitest_coverline("build/editor-base/editor-base.js", 326);
if ((domNode === inst.config.doc.documentElement) || (domNode === inst.config.doc) || !domNode.tagName) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 327);
domNode = null;
                    _yuitest_coverline("build/editor-base/editor-base.js", 328);
break;
                }
                
                _yuitest_coverline("build/editor-base/editor-base.js", 331);
if (!inst.DOM.inDoc(domNode)) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 332);
domNode = null;
                    _yuitest_coverline("build/editor-base/editor-base.js", 333);
break;
                }
                
                //Check to see if we get el.nodeName and nodeType
                _yuitest_coverline("build/editor-base/editor-base.js", 337);
if (domNode.nodeName && domNode.nodeType && (domNode.nodeType == 1)) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 338);
domPath.push(domNode);
                }

                _yuitest_coverline("build/editor-base/editor-base.js", 341);
if (domNode == inst.config.doc.body) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 342);
domNode = null;
                    _yuitest_coverline("build/editor-base/editor-base.js", 343);
break;
                }

                _yuitest_coverline("build/editor-base/editor-base.js", 346);
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

            _yuitest_coverline("build/editor-base/editor-base.js", 373);
if (domPath.length === 0) {
                _yuitest_coverline("build/editor-base/editor-base.js", 374);
domPath[0] = inst.config.doc.body;
            }

            _yuitest_coverline("build/editor-base/editor-base.js", 377);
if (nodeList) {
                _yuitest_coverline("build/editor-base/editor-base.js", 378);
return inst.all(domPath.reverse());
            } else {
                _yuitest_coverline("build/editor-base/editor-base.js", 380);
return domPath.reverse();
            }

        },
        /**
        * After frame ready, bind mousedown & keyup listeners
        * @method _afterFrameReady
        * @private
        */
        _afterFrameReady: function() {
            _yuitest_coverfunc("build/editor-base/editor-base.js", "_afterFrameReady", 389);
_yuitest_coverline("build/editor-base/editor-base.js", 390);
var inst = this.frame.getInstance();
            
            _yuitest_coverline("build/editor-base/editor-base.js", 392);
this.frame.on('dom:mouseup', Y.bind(this._onFrameMouseUp, this));
            _yuitest_coverline("build/editor-base/editor-base.js", 393);
this.frame.on('dom:mousedown', Y.bind(this._onFrameMouseDown, this));
            _yuitest_coverline("build/editor-base/editor-base.js", 394);
this.frame.on('dom:keydown', Y.bind(this._onFrameKeyDown, this));

            _yuitest_coverline("build/editor-base/editor-base.js", 396);
if (Y.UA.ie) {
                _yuitest_coverline("build/editor-base/editor-base.js", 397);
this.frame.on('dom:activate', Y.bind(this._onFrameActivate, this));
                _yuitest_coverline("build/editor-base/editor-base.js", 398);
this.frame.on('dom:beforedeactivate', Y.bind(this._beforeFrameDeactivate, this));
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 400);
this.frame.on('dom:keyup', Y.bind(this._onFrameKeyUp, this));
            _yuitest_coverline("build/editor-base/editor-base.js", 401);
this.frame.on('dom:keypress', Y.bind(this._onFrameKeyPress, this));
            _yuitest_coverline("build/editor-base/editor-base.js", 402);
this.frame.on('dom:paste', Y.bind(this._onPaste, this));

            _yuitest_coverline("build/editor-base/editor-base.js", 404);
inst.EditorSelection.filter();
            _yuitest_coverline("build/editor-base/editor-base.js", 405);
this.fire('ready');
        },
        /**
        * Caches the current cursor position in IE.
        * @method _beforeFrameDeactivate
        * @private
        */
        _beforeFrameDeactivate: function(e) {
            _yuitest_coverfunc("build/editor-base/editor-base.js", "_beforeFrameDeactivate", 412);
_yuitest_coverline("build/editor-base/editor-base.js", 413);
if (e.frameTarget.test('html')) { //Means it came from a scrollbar
                _yuitest_coverline("build/editor-base/editor-base.js", 414);
return;
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 416);
var inst = this.getInstance(),
                sel = inst.config.doc.selection.createRange();
            
            _yuitest_coverline("build/editor-base/editor-base.js", 419);
if (sel.compareEndPoints && !sel.compareEndPoints('StartToEnd', sel)) {
                _yuitest_coverline("build/editor-base/editor-base.js", 420);
sel.pasteHTML('<var id="yui-ie-cursor">');
            }
        },
        /**
        * Moves the cached selection bookmark back so IE can place the cursor in the right place.
        * @method _onFrameActivate
        * @private
        */
        _onFrameActivate: function(e) {
            _yuitest_coverfunc("build/editor-base/editor-base.js", "_onFrameActivate", 428);
_yuitest_coverline("build/editor-base/editor-base.js", 429);
if (e.frameTarget.test('html')) { //Means it came from a scrollbar
                _yuitest_coverline("build/editor-base/editor-base.js", 430);
return;
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 432);
var inst = this.getInstance(),
                sel = new inst.EditorSelection(),
                range = sel.createRange(),
                cur = inst.all('#yui-ie-cursor');

            _yuitest_coverline("build/editor-base/editor-base.js", 437);
if (cur.size()) {
                _yuitest_coverline("build/editor-base/editor-base.js", 438);
cur.each(function(n) {
                    _yuitest_coverfunc("build/editor-base/editor-base.js", "(anonymous 5)", 438);
_yuitest_coverline("build/editor-base/editor-base.js", 439);
n.set('id', '');
                    _yuitest_coverline("build/editor-base/editor-base.js", 440);
if (range.moveToElementText) {
                        _yuitest_coverline("build/editor-base/editor-base.js", 441);
try {
                            _yuitest_coverline("build/editor-base/editor-base.js", 442);
range.moveToElementText(n._node);
                            _yuitest_coverline("build/editor-base/editor-base.js", 443);
var moved = range.move('character', -1);
                            _yuitest_coverline("build/editor-base/editor-base.js", 444);
if (moved === -1) { //Only move up if we actually moved back.
                                _yuitest_coverline("build/editor-base/editor-base.js", 445);
range.move('character', 1);
                            }
                            _yuitest_coverline("build/editor-base/editor-base.js", 447);
range.select();
                            _yuitest_coverline("build/editor-base/editor-base.js", 448);
range.text = '';
                        } catch (e) {}
                    }
                    _yuitest_coverline("build/editor-base/editor-base.js", 451);
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
            _yuitest_coverfunc("build/editor-base/editor-base.js", "_onPaste", 460);
_yuitest_coverline("build/editor-base/editor-base.js", 461);
this.fire('nodeChange', { changedNode: e.frameTarget, changedType: 'paste', changedEvent: e.frameEvent });
        },
        /**
        * Fires nodeChange event
        * @method _onFrameMouseUp
        * @private
        */
        _onFrameMouseUp: function(e) {
            _yuitest_coverfunc("build/editor-base/editor-base.js", "_onFrameMouseUp", 468);
_yuitest_coverline("build/editor-base/editor-base.js", 469);
this.fire('nodeChange', { changedNode: e.frameTarget, changedType: 'mouseup', changedEvent: e.frameEvent  });
        },
        /**
        * Fires nodeChange event
        * @method _onFrameMouseDown
        * @private
        */
        _onFrameMouseDown: function(e) {
            _yuitest_coverfunc("build/editor-base/editor-base.js", "_onFrameMouseDown", 476);
_yuitest_coverline("build/editor-base/editor-base.js", 477);
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
            _yuitest_coverfunc("build/editor-base/editor-base.js", "_onFrameKeyDown", 502);
_yuitest_coverline("build/editor-base/editor-base.js", 503);
var inst, sel;
            _yuitest_coverline("build/editor-base/editor-base.js", 504);
if (!this._currentSelection) {
                _yuitest_coverline("build/editor-base/editor-base.js", 505);
if (this._currentSelectionTimer) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 506);
this._currentSelectionTimer.cancel();
                }
                _yuitest_coverline("build/editor-base/editor-base.js", 508);
this._currentSelectionTimer = Y.later(850, this, function() {
                    _yuitest_coverfunc("build/editor-base/editor-base.js", "(anonymous 6)", 508);
_yuitest_coverline("build/editor-base/editor-base.js", 509);
this._currentSelectionClear = true;
                });
                
                _yuitest_coverline("build/editor-base/editor-base.js", 512);
inst = this.frame.getInstance();
                _yuitest_coverline("build/editor-base/editor-base.js", 513);
sel = new inst.EditorSelection(e);

                _yuitest_coverline("build/editor-base/editor-base.js", 515);
this._currentSelection = sel;
            } else {
                _yuitest_coverline("build/editor-base/editor-base.js", 517);
sel = this._currentSelection;
            }

            _yuitest_coverline("build/editor-base/editor-base.js", 520);
inst = this.frame.getInstance();
            _yuitest_coverline("build/editor-base/editor-base.js", 521);
sel = new inst.EditorSelection();

            _yuitest_coverline("build/editor-base/editor-base.js", 523);
this._currentSelection = sel;
            
            _yuitest_coverline("build/editor-base/editor-base.js", 525);
if (sel && sel.anchorNode) {
                _yuitest_coverline("build/editor-base/editor-base.js", 526);
this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: 'keydown', changedEvent: e.frameEvent });
                _yuitest_coverline("build/editor-base/editor-base.js", 527);
if (EditorBase.NC_KEYS[e.keyCode]) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 528);
this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: EditorBase.NC_KEYS[e.keyCode], changedEvent: e.frameEvent });
                    _yuitest_coverline("build/editor-base/editor-base.js", 529);
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
            _yuitest_coverfunc("build/editor-base/editor-base.js", "_onFrameKeyPress", 538);
_yuitest_coverline("build/editor-base/editor-base.js", 539);
var sel = this._currentSelection;

            _yuitest_coverline("build/editor-base/editor-base.js", 541);
if (sel && sel.anchorNode) {
                _yuitest_coverline("build/editor-base/editor-base.js", 542);
this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: 'keypress', changedEvent: e.frameEvent });
                _yuitest_coverline("build/editor-base/editor-base.js", 543);
if (EditorBase.NC_KEYS[e.keyCode]) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 544);
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
            _yuitest_coverfunc("build/editor-base/editor-base.js", "_onFrameKeyUp", 553);
_yuitest_coverline("build/editor-base/editor-base.js", 554);
var inst = this.frame.getInstance(),
                sel = new inst.EditorSelection(e);

            _yuitest_coverline("build/editor-base/editor-base.js", 557);
if (sel && sel.anchorNode) {
                _yuitest_coverline("build/editor-base/editor-base.js", 558);
this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: 'keyup', selection: sel, changedEvent: e.frameEvent  });
                _yuitest_coverline("build/editor-base/editor-base.js", 559);
if (EditorBase.NC_KEYS[e.keyCode]) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 560);
this.fire('nodeChange', { changedNode: sel.anchorNode, changedType: EditorBase.NC_KEYS[e.keyCode] + '-up', selection: sel, changedEvent: e.frameEvent  });
                }
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 563);
if (this._currentSelectionClear) {
                _yuitest_coverline("build/editor-base/editor-base.js", 564);
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
            _yuitest_coverfunc("build/editor-base/editor-base.js", "execCommand", 574);
_yuitest_coverline("build/editor-base/editor-base.js", 575);
var ret = this.frame.execCommand(cmd, val),
                inst = this.frame.getInstance(),
                sel = new inst.EditorSelection(), cmds = {},
                e = { changedNode: sel.anchorNode, changedType: 'execcommand', nodes: ret };

            _yuitest_coverline("build/editor-base/editor-base.js", 580);
switch (cmd) {
                case 'forecolor':
                    _yuitest_coverline("build/editor-base/editor-base.js", 582);
e.fontColor = val;
                    _yuitest_coverline("build/editor-base/editor-base.js", 583);
break;
                case 'backcolor':
                    _yuitest_coverline("build/editor-base/editor-base.js", 585);
e.backgroundColor = val;
                    _yuitest_coverline("build/editor-base/editor-base.js", 586);
break;
                case 'fontsize':
                    _yuitest_coverline("build/editor-base/editor-base.js", 588);
e.fontSize = val;
                    _yuitest_coverline("build/editor-base/editor-base.js", 589);
break;
                case 'fontname':
                    _yuitest_coverline("build/editor-base/editor-base.js", 591);
e.fontFamily = val;
                    _yuitest_coverline("build/editor-base/editor-base.js", 592);
break;
            }

            _yuitest_coverline("build/editor-base/editor-base.js", 595);
cmds[cmd] = 1;
            _yuitest_coverline("build/editor-base/editor-base.js", 596);
e.commands = cmds;

            _yuitest_coverline("build/editor-base/editor-base.js", 598);
this.fire('nodeChange', e);

            _yuitest_coverline("build/editor-base/editor-base.js", 600);
return ret;
        },
        /**
        * Get the YUI instance of the frame
        * @method getInstance
        * @return {YUI} The YUI instance bound to the frame.
        */
        getInstance: function() {
            _yuitest_coverfunc("build/editor-base/editor-base.js", "getInstance", 607);
_yuitest_coverline("build/editor-base/editor-base.js", 608);
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
            _yuitest_coverfunc("build/editor-base/editor-base.js", "render", 617);
_yuitest_coverline("build/editor-base/editor-base.js", 618);
this.frame.set('content', this.get('content'));
            _yuitest_coverline("build/editor-base/editor-base.js", 619);
this.frame.render(node);
            _yuitest_coverline("build/editor-base/editor-base.js", 620);
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
            _yuitest_coverfunc("build/editor-base/editor-base.js", "focus", 629);
_yuitest_coverline("build/editor-base/editor-base.js", 630);
this.frame.focus(fn);
            _yuitest_coverline("build/editor-base/editor-base.js", 631);
return this;
        },
        /**
        * Handles the showing of the Editor instance. Currently only handles the iframe
        * @method show
        * @return {EditorBase}
        * @chainable
        */
        show: function() {
            _yuitest_coverfunc("build/editor-base/editor-base.js", "show", 639);
_yuitest_coverline("build/editor-base/editor-base.js", 640);
this.frame.show();
            _yuitest_coverline("build/editor-base/editor-base.js", 641);
return this;
        },
        /**
        * Handles the hiding of the Editor instance. Currently only handles the iframe
        * @method hide
        * @return {EditorBase}
        * @chainable
        */
        hide: function() {
            _yuitest_coverfunc("build/editor-base/editor-base.js", "hide", 649);
_yuitest_coverline("build/editor-base/editor-base.js", 650);
this.frame.hide();
            _yuitest_coverline("build/editor-base/editor-base.js", 651);
return this;
        },
        /**
        * (Un)Filters the content of the Editor, cleaning YUI related code. //TODO better filtering
        * @method getContent
        * @return {String} The filtered content of the Editor
        */
        getContent: function() {
            _yuitest_coverfunc("build/editor-base/editor-base.js", "getContent", 658);
_yuitest_coverline("build/editor-base/editor-base.js", 659);
var html = '', inst = this.getInstance();
            _yuitest_coverline("build/editor-base/editor-base.js", 660);
if (inst && inst.EditorSelection) {
                _yuitest_coverline("build/editor-base/editor-base.js", 661);
html = inst.EditorSelection.unfilter();
            }
            //Removing the _yuid from the objects in IE
            _yuitest_coverline("build/editor-base/editor-base.js", 664);
html = html.replace(/ _yuid="([^>]*)"/g, '');
            _yuitest_coverline("build/editor-base/editor-base.js", 665);
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
            _yuitest_coverfunc("build/editor-base/editor-base.js", "NORMALIZE_FONTSIZE", 675);
_yuitest_coverline("build/editor-base/editor-base.js", 676);
var size = n.getStyle('fontSize'), oSize = size;
            
            _yuitest_coverline("build/editor-base/editor-base.js", 678);
switch (size) {
                case '-webkit-xxx-large':
                    _yuitest_coverline("build/editor-base/editor-base.js", 680);
size = '48px';
                    _yuitest_coverline("build/editor-base/editor-base.js", 681);
break;
                case 'xx-large':
                    _yuitest_coverline("build/editor-base/editor-base.js", 683);
size = '32px';
                    _yuitest_coverline("build/editor-base/editor-base.js", 684);
break;
                case 'x-large':
                    _yuitest_coverline("build/editor-base/editor-base.js", 686);
size = '24px';
                    _yuitest_coverline("build/editor-base/editor-base.js", 687);
break;
                case 'large':
                    _yuitest_coverline("build/editor-base/editor-base.js", 689);
size = '18px';
                    _yuitest_coverline("build/editor-base/editor-base.js", 690);
break;
                case 'medium':
                    _yuitest_coverline("build/editor-base/editor-base.js", 692);
size = '16px';
                    _yuitest_coverline("build/editor-base/editor-base.js", 693);
break;
                case 'small':
                    _yuitest_coverline("build/editor-base/editor-base.js", 695);
size = '13px';
                    _yuitest_coverline("build/editor-base/editor-base.js", 696);
break;
                case 'x-small':
                    _yuitest_coverline("build/editor-base/editor-base.js", 698);
size = '10px';
                    _yuitest_coverline("build/editor-base/editor-base.js", 699);
break;
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 701);
if (oSize !== size) {
                _yuitest_coverline("build/editor-base/editor-base.js", 702);
n.setStyle('fontSize', size);
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 704);
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
            _yuitest_coverfunc("build/editor-base/editor-base.js", "FILTER_RGB", 719);
_yuitest_coverline("build/editor-base/editor-base.js", 720);
if (css.toLowerCase().indexOf('rgb') != -1) {
                _yuitest_coverline("build/editor-base/editor-base.js", 721);
var exp = new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)", "gi");
                _yuitest_coverline("build/editor-base/editor-base.js", 722);
var rgb = css.replace(exp, "$1,$2,$3,$4,$5").split(',');
            
                _yuitest_coverline("build/editor-base/editor-base.js", 724);
if (rgb.length == 5) {
                    _yuitest_coverline("build/editor-base/editor-base.js", 725);
var r = parseInt(rgb[1], 10).toString(16);
                    _yuitest_coverline("build/editor-base/editor-base.js", 726);
var g = parseInt(rgb[2], 10).toString(16);
                    _yuitest_coverline("build/editor-base/editor-base.js", 727);
var b = parseInt(rgb[3], 10).toString(16);

                    _yuitest_coverline("build/editor-base/editor-base.js", 729);
r = r.length == 1 ? '0' + r : r;
                    _yuitest_coverline("build/editor-base/editor-base.js", 730);
g = g.length == 1 ? '0' + g : g;
                    _yuitest_coverline("build/editor-base/editor-base.js", 731);
b = b.length == 1 ? '0' + b : b;

                    _yuitest_coverline("build/editor-base/editor-base.js", 733);
css = "#" + r + g + b;
                }
            }
            _yuitest_coverline("build/editor-base/editor-base.js", 736);
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
        USE: ['substitute', 'node', 'selector-css3', 'editor-selection', 'stylesheet'],
        /**
        * The Class Name: editorBase
        * @static
        * @property NAME
        */
        NAME: 'editorBase',
        /**
        * Editor Strings.  By default contains only the `title` property for the
        * Title of frame document (default "Rich Text Editor").
        *
        * @static
        * @property STRINGS
        */
        STRINGS: {
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
                    _yuitest_coverfunc("build/editor-base/editor-base.js", "setter", 807);
_yuitest_coverline("build/editor-base/editor-base.js", 808);
if (str.substr(0, 1) === "\n") {
                        _yuitest_coverline("build/editor-base/editor-base.js", 809);
str = str.substr(1);
                    }
                    _yuitest_coverline("build/editor-base/editor-base.js", 811);
if (str === '') {
                        _yuitest_coverline("build/editor-base/editor-base.js", 812);
str = '<br class="yui-cursor">';
                    }
                    _yuitest_coverline("build/editor-base/editor-base.js", 814);
if (str === ' ') {
                        _yuitest_coverline("build/editor-base/editor-base.js", 815);
if (Y.UA.gecko) {
                            _yuitest_coverline("build/editor-base/editor-base.js", 816);
str = '<br class="yui-cursor">';
                        }
                    }
                    _yuitest_coverline("build/editor-base/editor-base.js", 819);
return this.frame.set('content', str);
                },
                getter: function() {
                    _yuitest_coverfunc("build/editor-base/editor-base.js", "getter", 821);
_yuitest_coverline("build/editor-base/editor-base.js", 822);
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
                    _yuitest_coverfunc("build/editor-base/editor-base.js", "setter", 840);
_yuitest_coverline("build/editor-base/editor-base.js", 841);
if (this.frame) {
                        _yuitest_coverline("build/editor-base/editor-base.js", 842);
this.frame.set('linkedcss', css);
                    }
                    _yuitest_coverline("build/editor-base/editor-base.js", 844);
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
                    _yuitest_coverfunc("build/editor-base/editor-base.js", "setter", 854);
_yuitest_coverline("build/editor-base/editor-base.js", 855);
if (this.frame) {
                        _yuitest_coverline("build/editor-base/editor-base.js", 856);
this.frame.set('extracss', css);
                    }
                    _yuitest_coverline("build/editor-base/editor-base.js", 858);
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

    _yuitest_coverline("build/editor-base/editor-base.js", 872);
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





}, '@VERSION@', {"requires": ["base", "frame", "node", "exec-command", "editor-selection"]});
