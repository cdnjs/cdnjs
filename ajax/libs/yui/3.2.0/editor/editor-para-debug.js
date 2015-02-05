YUI.add('editor-para', function(Y) {



    /**
     * Plugin for Editor to paragraph auto wrapping and correction.
     * @module editor
     * @submodule editor-para
     */     
    /**
     * Plugin for Editor to paragraph auto wrapping and correction.
     * @class Plugin.EditorPara
     * @extends Base
     * @constructor
     */


    var EditorPara = function() {
        EditorPara.superclass.constructor.apply(this, arguments);
    }, HOST = 'host', BODY = 'body', NODE_CHANGE = 'nodeChange',
    FIRST_P = BODY + ' > p';

    Y.extend(EditorPara, Y.Base, {
        /**
        * Utility method to create an empty paragraph when the document is empty.
        * @private
        * @method _fixFirstPara
        */
        _fixFirstPara: function() {
            var host = this.get(HOST), inst = host.getInstance(), sel;
            inst.one('body').setContent('<p>' + inst.Selection.CURSOR + '</p>');
            sel = new inst.Selection();
            sel.focusCursor(true, false);
        },
        /**
        * nodeChange handler to handle fixing an empty document.
        * @private
        * @method _onNodeChange
        */
        _onNodeChange: function(e) {
            var host = this.get(HOST), inst = host.getInstance();

            switch (e.changedType) {
                case 'keydown':
                    if (inst.config.doc.childNodes.length < 2) {
                        var cont = inst.config.doc.body.innerHTML;
                        if (cont && cont.length < 5 && cont.toLowerCase() == '<br>') {
                            this._fixFirstPara();
                        }
                    }
                    break;
                case 'backspace-up':
                case 'delete-up':
                    var ps = inst.all(FIRST_P), br, item;
                    if (ps.size() < 2) {
                        item = inst.one(BODY);
                        if (ps.item(0)) {
                            item = ps.item(0);
                        }
                        if (inst.Selection.getText(item) === '' && !item.test('p')) {
                            this._fixFirstPara();
                        } else if (item.test('p') && item.get('innerHTML').length === 0) {
                            e.changedEvent.halt();
                        }
                    }
                    break;
            }
            
        },
        /**
        * Performs a block element filter when the Editor is first ready
        * @private
        * @method _afterEditorReady
        */
        _afterEditorReady: function() {
            var host = this.get(HOST), inst = host.getInstance();
            if (inst) {
                inst.Selection.filterBlocks();
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

            sel.setCursor();
            
            Y.later(50, host, function() {
                inst.Selection.filterBlocks();
                sel.focusCursor(true, true);
            });
            
        },
        initializer: function() {
            var host = this.get(HOST);

            host.on(NODE_CHANGE, Y.bind(this._onNodeChange, this));
            host.after('ready', Y.bind(this._afterEditorReady, this));
            host.after('contentChange', Y.bind(this._afterContentChange, this));
            host.after('dom:paste', Y.bind(this._afterPaste, this));
        }
    }, {
        /**
        * editorBidi
        * @static
        * @property NAME
        */
        NAME: 'editorPara',
        /**
        * editorBidi
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



}, '@VERSION@' ,{skinnable:false, requires:['editor-base', 'selection']});
