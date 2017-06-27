YUI.add('editor-lists', function(Y) {

    /**
     * Handles list manipulation inside the Editor. Adds keyboard manipulation and execCommand support. Adds overrides for the <a href="Plugin.ExecCommand.html#method_COMMANDS.insertorderedlist">insertorderedlist</a> and <a href="Plugin.ExecCommand.html#method_COMMANDS.insertunorderedlist">insertunorderedlist</a> execCommands.
     * @module editor
     * @submodule editor-lists
     */     
    /**
     * Handles list manipulation inside the Editor. Adds keyboard manipulation and execCommand support. Adds overrides for the <a href="Plugin.ExecCommand.html#method_COMMANDS.insertorderedlist">insertorderedlist</a> and <a href="Plugin.ExecCommand.html#method_COMMANDS.insertunorderedlist">insertunorderedlist</a> execCommands.
     * @class Plugin.EditorLists
     * @constructor
     * @extends Base
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

            if (Y.UA.ie && e.changedType === 'enter') {
                if (e.changedNode.test(LI + ', ' + LI + ' *')) {
                    e.changedEvent.halt();
                    e.preventDefault();
                    li = e.changedNode;
                    newLi = inst.Node.create('<' + LI + '>' + EditorLists.NON + '</' + LI + '>');
                        
                    if (!li.test(LI)) {
                        li = li.ancestor(LI);
                    }
                    li.insert(newLi, 'after');
                    
                    sel = new inst.Selection();
                    sel.selectNode(newLi.get('firstChild'), true, false);
                }
            }
            if (e.changedType === 'tab') {
                if (e.changedNode.test(LI + ', ' + LI + ' *')) {
                    e.changedEvent.halt();
                    e.preventDefault();
                    li = e.changedNode;
                    sTab = e.changedEvent.shiftKey;
                    par = li.ancestor(OL + ',' + UL);
                    tag = UL;


                    if (par.get('tagName').toLowerCase() === OL) {
                        tag = OL;
                    }
                    
                    if (!li.test(LI)) {
                        li = li.ancestor(LI);
                    }
                    if (sTab) {
                        if (li.ancestor(LI)) {
                            li.ancestor(LI).insert(li, 'after');
                            moved = true;
                            focusEnd = true;
                        }
                    } else {
                        //li.setStyle('border', '1px solid red');
                        if (li.previous(LI)) {
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

    Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
        /**
        * Override for the insertunorderedlist method from the <a href="Plugin.EditorLists.html">EditorLists</a> plugin.
        * @for ExecCommand
        * @method COMMANDS.insertunorderedlist
        * @static
        * @param {String} cmd The command executed: insertunorderedlist
        * @return {Node} Node instance of the item touched by this command.
        */
        insertunorderedlist: function(cmd) {
            var inst = this.get('host').getInstance(), out;
            this.get('host')._execCommand(cmd, '');
        },
        /**
        * Override for the insertorderedlist method from the <a href="Plugin.EditorLists.html">EditorLists</a> plugin.
        * @for ExecCommand
        * @method COMMANDS.insertorderedlist
        * @static
        * @param {String} cmd The command executed: insertorderedlist
        * @return {Node} Node instance of the item touched by this command.
        */
        insertorderedlist: function(cmd) {
            var inst = this.get('host').getInstance(), out;
            this.get('host')._execCommand(cmd, '');
        }
    });




}, '@VERSION@' ,{skinnable:false, requires:['editor-base']});
