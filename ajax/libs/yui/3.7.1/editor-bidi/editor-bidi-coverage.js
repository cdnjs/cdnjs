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
_yuitest_coverage["build/editor-bidi/editor-bidi.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/editor-bidi/editor-bidi.js",
    code: []
};
_yuitest_coverage["build/editor-bidi/editor-bidi.js"].code=["YUI.add('editor-bidi', function (Y, NAME) {","","","    /**","     * Plugin for Editor to support BiDirectional (bidi) text operations.","     * @class Plugin.EditorBidi","     * @extends Base","     * @constructor","     * @module editor","     * @submodule editor-bidi","     */","","","    var EditorBidi = function() {","        EditorBidi.superclass.constructor.apply(this, arguments);","    }, HOST = 'host', DIR = 'dir', BODY = 'BODY', NODE_CHANGE = 'nodeChange',","    B_C_CHANGE = 'bidiContextChange', FIRST_P = BODY + ' > p', STYLE = 'style';","","    Y.extend(EditorBidi, Y.Base, {","        /**","        * Place holder for the last direction when checking for a switch","        * @private","        * @property lastDirection","        */","        lastDirection: null,","        /**","        * Tells us that an initial bidi check has already been performed","        * @private","        * @property firstEvent","        */","        firstEvent: null,","","        /**","        * Method checks to see if the direction of the text has changed based on a nodeChange event.","        * @private","        * @method _checkForChange","        */","        _checkForChange: function() {","            var host = this.get(HOST),","                inst = host.getInstance(),","                sel = new inst.EditorSelection(),","                node, direction;","            ","            if (sel.isCollapsed) {","                node = EditorBidi.blockParent(sel.focusNode);","                if (node) {","                    direction = node.getStyle('direction');","                    if (direction !== this.lastDirection) {","                        host.fire(B_C_CHANGE, { changedTo: direction });","                        this.lastDirection = direction;","                    }","                }","            } else {","                host.fire(B_C_CHANGE, { changedTo: 'select' });","                this.lastDirection = null;","            }","        },","","        /**","        * Checked for a change after a specific nodeChange event has been fired.","        * @private","        * @method _afterNodeChange","        */","        _afterNodeChange: function(e) { ","            // If this is the first event ever, or an event that can result in a context change","            if (this.firstEvent || EditorBidi.EVENTS[e.changedType]) {","                this._checkForChange();","                this.firstEvent = false;","            }","        },","","        /**","        * Checks for a direction change after a mouseup occurs.","        * @private","        * @method _afterMouseUp","        */","        _afterMouseUp: function(e) {","            this._checkForChange();","            this.firstEvent = false;","        },","        initializer: function() {","            var host = this.get(HOST);","","            this.firstEvent = true;","            ","            host.after(NODE_CHANGE, Y.bind(this._afterNodeChange, this));","            host.after('dom:mouseup', Y.bind(this._afterMouseUp, this));","        }","    }, {","        /**","        * The events to check for a direction change on","        * @property EVENTS","        * @static","        */","        EVENTS: {","            'backspace-up': true,","            'pageup-up': true,","            'pagedown-down': true,","            'end-up': true,","            'home-up': true,","            'left-up': true,","            'up-up': true,","            'right-up': true,","            'down-up': true,","            'delete-up': true","        },","","        /**","        * More elements may be needed. BODY *must* be in the list to take care of the special case.","        * ","        * blockParent could be changed to use inst.EditorSelection.BLOCKS","        * instead, but that would make Y.Plugin.EditorBidi.blockParent","        * unusable in non-RTE contexts (it being usable is a nice","        * side-effect).","        * @property BLOCKS","        * @static","        */","        //BLOCKS: Y.EditorSelection.BLOCKS+',LI,HR,' + BODY,","        BLOCKS: Y.EditorSelection.BLOCKS,","        /**","        * Template for creating a block element","        * @static","        * @property DIV_WRAPPER","        */","        DIV_WRAPPER: '<DIV></DIV>',","        /**","        * Returns a block parent for a given element","        * @static","        * @method blockParent","        */","        blockParent: function(node, wrap) {","            var parent = node, divNode, firstChild;","            ","            if (!parent) {","                parent = Y.one(BODY);","            }","            ","            if (!parent.test(EditorBidi.BLOCKS)) {","                parent = parent.ancestor(EditorBidi.BLOCKS);","            }","            if (wrap && parent.test(BODY)) {","                // This shouldn't happen if the RTE handles everything","                // according to spec: we should get to a P before BODY. But","                // we don't want to set the direction of BODY even if that","                // happens, so we wrap everything in a DIV.","                ","                // The code is based on YUI3's Y.EditorSelection._wrapBlock function.","                divNode = Y.Node.create(EditorBidi.DIV_WRAPPER);","                parent.get('children').each(function(node, index) {","                    if (index === 0) {","                        firstChild = node;","                    } else {","                        divNode.append(node);","                    }","                });","                firstChild.replace(divNode);","                divNode.prepend(firstChild);","                parent = divNode;","            }","            return parent;","        },","        /**","        * The data key to store on the node.","        * @static","        * @property _NODE_SELECTED","        */","        _NODE_SELECTED: 'bidiSelected',","        /**","        * Generates a list of all the block parents of the current NodeList","        * @static","        * @method addParents","        */","        addParents: function(nodeArray) {","            var i, parent, addParent;","","            for (i = 0; i < nodeArray.length; i += 1) {","                nodeArray[i].setData(EditorBidi._NODE_SELECTED, true);","            }","","            // This works automagically, since new parents added get processed","            // later themselves. So if there's a node early in the process that","            // we haven't discovered some of its siblings yet, thus resulting in","            // its parent not added, the parent will be added later, since those","            // siblings will be added to the array and then get processed.","            for (i = 0; i < nodeArray.length; i += 1) {","                parent = nodeArray[i].get('parentNode');","","                // Don't add the parent if the parent is the BODY element.","                // We don't want to change the direction of BODY. Also don't","                // do it if the parent is already in the list.","                if (!parent.test(BODY) && !parent.getData(EditorBidi._NODE_SELECTED)) {","                    addParent = true;","                    parent.get('children').some(function(sibling) {","                        if (!sibling.getData(EditorBidi._NODE_SELECTED)) {","                            addParent = false;","                            return true; // stop more processing","                        }","                    });","                    if (addParent) {","                        nodeArray.push(parent);","                        parent.setData(EditorBidi._NODE_SELECTED, true);","                    }","                }","            }   ","","            for (i = 0; i < nodeArray.length; i += 1) {","                nodeArray[i].clearData(EditorBidi._NODE_SELECTED);","            }","","            return nodeArray;","        },","","","        /**","        * editorBidi","        * @static","        * @property NAME","        */","        NAME: 'editorBidi',","        /**","        * editorBidi","        * @static","        * @property NS","        */","        NS: 'editorBidi',","        ATTRS: {","            host: {","                value: false","            }","        },","        /**","        * Regex for testing/removing text-align style from an element","        * @static","        * @property RE_TEXT_ALIGN","        */","        RE_TEXT_ALIGN: /text-align:\\s*\\w*\\s*;/,","        /**","        * Method to test a node's style attribute for text-align and removing it.","        * @static","        * @method removeTextAlign","        */","        removeTextAlign: function(n) {","            if (n) {","                if (n.getAttribute(STYLE).match(EditorBidi.RE_TEXT_ALIGN)) {","                    n.setAttribute(STYLE, n.getAttribute(STYLE).replace(EditorBidi.RE_TEXT_ALIGN, ''));","                }","                if (n.hasAttribute('align')) {","                    n.removeAttribute('align');","                }","            }","            return n;","        }","    });","    ","    Y.namespace('Plugin');","    ","    Y.Plugin.EditorBidi = EditorBidi;","","    /**","     * bidi execCommand override for setting the text direction of a node.","     * This property is added to the `Y.Plugin.ExecCommands.COMMANDS`","     * collection.","     *","     * @for Plugin.ExecCommand","     * @property bidi","     */","    //TODO -- This should not add this command unless the plugin is added to the instance..","    Y.Plugin.ExecCommand.COMMANDS.bidi = function(cmd, direction) {","        var inst = this.getInstance(),","            sel = new inst.EditorSelection(),","            ns = this.get(HOST).get(HOST).editorBidi,","            returnValue, block,","            selected, selectedBlocks, dir;","","        if (!ns) {","            Y.error('bidi execCommand is not available without the EditorBiDi plugin.');","            return;","        }","","        inst.EditorSelection.filterBlocks();","","        if (sel.isCollapsed) { // No selection","            block = EditorBidi.blockParent(sel.anchorNode);","            if (!block) {","                block = inst.one('body').one(inst.EditorSelection.BLOCKS);","            }","            //Remove text-align attribute if it exists","            block = EditorBidi.removeTextAlign(block);","            if (!direction) {","                //If no direction is set, auto-detect the proper setting to make it \"toggle\"","                dir = block.getAttribute(DIR);","                if (!dir || dir == 'ltr') {","                    direction = 'rtl';","                } else {","                    direction = 'ltr';","                }","            }","            block.setAttribute(DIR, direction);","            if (Y.UA.ie) {","                var b = block.all('br.yui-cursor');","                if (b.size() === 1 && block.get('childNodes').size() == 1) {","                    b.remove();","                }","            }","            returnValue = block;","        } else { // some text is selected","            selected = sel.getSelected();","            selectedBlocks = [];","            selected.each(function(node) {","                selectedBlocks.push(EditorBidi.blockParent(node));","            });","            selectedBlocks = inst.all(EditorBidi.addParents(selectedBlocks));","            selectedBlocks.each(function(n) {","                var d = direction;","                //Remove text-align attribute if it exists","                n = EditorBidi.removeTextAlign(n);","                if (!d) {","                    dir = n.getAttribute(DIR);","                    if (!dir || dir == 'ltr') {","                        d = 'rtl';","                    } else {","                        d = 'ltr';","                    }","                }","                n.setAttribute(DIR, d);","            });","            returnValue = selectedBlocks;","        }","        ns._checkForChange();","        return returnValue;","    };","","","","","}, '@VERSION@', {\"requires\": [\"editor-base\"]});"];
_yuitest_coverage["build/editor-bidi/editor-bidi.js"].lines = {"1":0,"14":0,"15":0,"19":0,"39":0,"44":0,"45":0,"46":0,"47":0,"48":0,"49":0,"50":0,"54":0,"55":0,"66":0,"67":0,"68":0,"78":0,"79":0,"82":0,"84":0,"86":0,"87":0,"132":0,"134":0,"135":0,"138":0,"139":0,"141":0,"148":0,"149":0,"150":0,"151":0,"153":0,"156":0,"157":0,"158":0,"160":0,"174":0,"176":0,"177":0,"185":0,"186":0,"191":0,"192":0,"193":0,"194":0,"195":0,"196":0,"199":0,"200":0,"201":0,"206":0,"207":0,"210":0,"243":0,"244":0,"245":0,"247":0,"248":0,"251":0,"255":0,"257":0,"268":0,"269":0,"275":0,"276":0,"277":0,"280":0,"282":0,"283":0,"284":0,"285":0,"288":0,"289":0,"291":0,"292":0,"293":0,"295":0,"298":0,"299":0,"300":0,"301":0,"302":0,"305":0,"307":0,"308":0,"309":0,"310":0,"312":0,"313":0,"314":0,"316":0,"317":0,"318":0,"319":0,"320":0,"322":0,"325":0,"327":0,"329":0,"330":0};
_yuitest_coverage["build/editor-bidi/editor-bidi.js"].functions = {"EditorBidi:14":0,"_checkForChange:38":0,"_afterNodeChange:64":0,"_afterMouseUp:77":0,"initializer:81":0,"(anonymous 2):149":0,"blockParent:131":0,"(anonymous 3):193":0,"addParents:173":0,"removeTextAlign:242":0,"(anonymous 4):309":0,"(anonymous 5):313":0,"bidi:268":0,"(anonymous 1):1":0};
_yuitest_coverage["build/editor-bidi/editor-bidi.js"].coveredLines = 102;
_yuitest_coverage["build/editor-bidi/editor-bidi.js"].coveredFunctions = 14;
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 1);
YUI.add('editor-bidi', function (Y, NAME) {


    /**
     * Plugin for Editor to support BiDirectional (bidi) text operations.
     * @class Plugin.EditorBidi
     * @extends Base
     * @constructor
     * @module editor
     * @submodule editor-bidi
     */


    _yuitest_coverfunc("build/editor-bidi/editor-bidi.js", "(anonymous 1)", 1);
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 14);
var EditorBidi = function() {
        _yuitest_coverfunc("build/editor-bidi/editor-bidi.js", "EditorBidi", 14);
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 15);
EditorBidi.superclass.constructor.apply(this, arguments);
    }, HOST = 'host', DIR = 'dir', BODY = 'BODY', NODE_CHANGE = 'nodeChange',
    B_C_CHANGE = 'bidiContextChange', FIRST_P = BODY + ' > p', STYLE = 'style';

    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 19);
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
            _yuitest_coverfunc("build/editor-bidi/editor-bidi.js", "_checkForChange", 38);
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 39);
var host = this.get(HOST),
                inst = host.getInstance(),
                sel = new inst.EditorSelection(),
                node, direction;
            
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 44);
if (sel.isCollapsed) {
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 45);
node = EditorBidi.blockParent(sel.focusNode);
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 46);
if (node) {
                    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 47);
direction = node.getStyle('direction');
                    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 48);
if (direction !== this.lastDirection) {
                        _yuitest_coverline("build/editor-bidi/editor-bidi.js", 49);
host.fire(B_C_CHANGE, { changedTo: direction });
                        _yuitest_coverline("build/editor-bidi/editor-bidi.js", 50);
this.lastDirection = direction;
                    }
                }
            } else {
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 54);
host.fire(B_C_CHANGE, { changedTo: 'select' });
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 55);
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
            _yuitest_coverfunc("build/editor-bidi/editor-bidi.js", "_afterNodeChange", 64);
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 66);
if (this.firstEvent || EditorBidi.EVENTS[e.changedType]) {
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 67);
this._checkForChange();
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 68);
this.firstEvent = false;
            }
        },

        /**
        * Checks for a direction change after a mouseup occurs.
        * @private
        * @method _afterMouseUp
        */
        _afterMouseUp: function(e) {
            _yuitest_coverfunc("build/editor-bidi/editor-bidi.js", "_afterMouseUp", 77);
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 78);
this._checkForChange();
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 79);
this.firstEvent = false;
        },
        initializer: function() {
            _yuitest_coverfunc("build/editor-bidi/editor-bidi.js", "initializer", 81);
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 82);
var host = this.get(HOST);

            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 84);
this.firstEvent = true;
            
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 86);
host.after(NODE_CHANGE, Y.bind(this._afterNodeChange, this));
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 87);
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
        * blockParent could be changed to use inst.EditorSelection.BLOCKS
        * instead, but that would make Y.Plugin.EditorBidi.blockParent
        * unusable in non-RTE contexts (it being usable is a nice
        * side-effect).
        * @property BLOCKS
        * @static
        */
        //BLOCKS: Y.EditorSelection.BLOCKS+',LI,HR,' + BODY,
        BLOCKS: Y.EditorSelection.BLOCKS,
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
            _yuitest_coverfunc("build/editor-bidi/editor-bidi.js", "blockParent", 131);
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 132);
var parent = node, divNode, firstChild;
            
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 134);
if (!parent) {
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 135);
parent = Y.one(BODY);
            }
            
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 138);
if (!parent.test(EditorBidi.BLOCKS)) {
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 139);
parent = parent.ancestor(EditorBidi.BLOCKS);
            }
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 141);
if (wrap && parent.test(BODY)) {
                // This shouldn't happen if the RTE handles everything
                // according to spec: we should get to a P before BODY. But
                // we don't want to set the direction of BODY even if that
                // happens, so we wrap everything in a DIV.
                
                // The code is based on YUI3's Y.EditorSelection._wrapBlock function.
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 148);
divNode = Y.Node.create(EditorBidi.DIV_WRAPPER);
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 149);
parent.get('children').each(function(node, index) {
                    _yuitest_coverfunc("build/editor-bidi/editor-bidi.js", "(anonymous 2)", 149);
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 150);
if (index === 0) {
                        _yuitest_coverline("build/editor-bidi/editor-bidi.js", 151);
firstChild = node;
                    } else {
                        _yuitest_coverline("build/editor-bidi/editor-bidi.js", 153);
divNode.append(node);
                    }
                });
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 156);
firstChild.replace(divNode);
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 157);
divNode.prepend(firstChild);
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 158);
parent = divNode;
            }
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 160);
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
            _yuitest_coverfunc("build/editor-bidi/editor-bidi.js", "addParents", 173);
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 174);
var i, parent, addParent;

            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 176);
for (i = 0; i < nodeArray.length; i += 1) {
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 177);
nodeArray[i].setData(EditorBidi._NODE_SELECTED, true);
            }

            // This works automagically, since new parents added get processed
            // later themselves. So if there's a node early in the process that
            // we haven't discovered some of its siblings yet, thus resulting in
            // its parent not added, the parent will be added later, since those
            // siblings will be added to the array and then get processed.
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 185);
for (i = 0; i < nodeArray.length; i += 1) {
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 186);
parent = nodeArray[i].get('parentNode');

                // Don't add the parent if the parent is the BODY element.
                // We don't want to change the direction of BODY. Also don't
                // do it if the parent is already in the list.
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 191);
if (!parent.test(BODY) && !parent.getData(EditorBidi._NODE_SELECTED)) {
                    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 192);
addParent = true;
                    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 193);
parent.get('children').some(function(sibling) {
                        _yuitest_coverfunc("build/editor-bidi/editor-bidi.js", "(anonymous 3)", 193);
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 194);
if (!sibling.getData(EditorBidi._NODE_SELECTED)) {
                            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 195);
addParent = false;
                            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 196);
return true; // stop more processing
                        }
                    });
                    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 199);
if (addParent) {
                        _yuitest_coverline("build/editor-bidi/editor-bidi.js", 200);
nodeArray.push(parent);
                        _yuitest_coverline("build/editor-bidi/editor-bidi.js", 201);
parent.setData(EditorBidi._NODE_SELECTED, true);
                    }
                }
            }   

            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 206);
for (i = 0; i < nodeArray.length; i += 1) {
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 207);
nodeArray[i].clearData(EditorBidi._NODE_SELECTED);
            }

            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 210);
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
            _yuitest_coverfunc("build/editor-bidi/editor-bidi.js", "removeTextAlign", 242);
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 243);
if (n) {
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 244);
if (n.getAttribute(STYLE).match(EditorBidi.RE_TEXT_ALIGN)) {
                    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 245);
n.setAttribute(STYLE, n.getAttribute(STYLE).replace(EditorBidi.RE_TEXT_ALIGN, ''));
                }
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 247);
if (n.hasAttribute('align')) {
                    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 248);
n.removeAttribute('align');
                }
            }
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 251);
return n;
        }
    });
    
    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 255);
Y.namespace('Plugin');
    
    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 257);
Y.Plugin.EditorBidi = EditorBidi;

    /**
     * bidi execCommand override for setting the text direction of a node.
     * This property is added to the `Y.Plugin.ExecCommands.COMMANDS`
     * collection.
     *
     * @for Plugin.ExecCommand
     * @property bidi
     */
    //TODO -- This should not add this command unless the plugin is added to the instance..
    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 268);
Y.Plugin.ExecCommand.COMMANDS.bidi = function(cmd, direction) {
        _yuitest_coverfunc("build/editor-bidi/editor-bidi.js", "bidi", 268);
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 269);
var inst = this.getInstance(),
            sel = new inst.EditorSelection(),
            ns = this.get(HOST).get(HOST).editorBidi,
            returnValue, block,
            selected, selectedBlocks, dir;

        _yuitest_coverline("build/editor-bidi/editor-bidi.js", 275);
if (!ns) {
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 276);
Y.error('bidi execCommand is not available without the EditorBiDi plugin.');
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 277);
return;
        }

        _yuitest_coverline("build/editor-bidi/editor-bidi.js", 280);
inst.EditorSelection.filterBlocks();

        _yuitest_coverline("build/editor-bidi/editor-bidi.js", 282);
if (sel.isCollapsed) { // No selection
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 283);
block = EditorBidi.blockParent(sel.anchorNode);
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 284);
if (!block) {
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 285);
block = inst.one('body').one(inst.EditorSelection.BLOCKS);
            }
            //Remove text-align attribute if it exists
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 288);
block = EditorBidi.removeTextAlign(block);
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 289);
if (!direction) {
                //If no direction is set, auto-detect the proper setting to make it "toggle"
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 291);
dir = block.getAttribute(DIR);
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 292);
if (!dir || dir == 'ltr') {
                    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 293);
direction = 'rtl';
                } else {
                    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 295);
direction = 'ltr';
                }
            }
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 298);
block.setAttribute(DIR, direction);
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 299);
if (Y.UA.ie) {
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 300);
var b = block.all('br.yui-cursor');
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 301);
if (b.size() === 1 && block.get('childNodes').size() == 1) {
                    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 302);
b.remove();
                }
            }
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 305);
returnValue = block;
        } else { // some text is selected
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 307);
selected = sel.getSelected();
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 308);
selectedBlocks = [];
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 309);
selected.each(function(node) {
                _yuitest_coverfunc("build/editor-bidi/editor-bidi.js", "(anonymous 4)", 309);
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 310);
selectedBlocks.push(EditorBidi.blockParent(node));
            });
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 312);
selectedBlocks = inst.all(EditorBidi.addParents(selectedBlocks));
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 313);
selectedBlocks.each(function(n) {
                _yuitest_coverfunc("build/editor-bidi/editor-bidi.js", "(anonymous 5)", 313);
_yuitest_coverline("build/editor-bidi/editor-bidi.js", 314);
var d = direction;
                //Remove text-align attribute if it exists
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 316);
n = EditorBidi.removeTextAlign(n);
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 317);
if (!d) {
                    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 318);
dir = n.getAttribute(DIR);
                    _yuitest_coverline("build/editor-bidi/editor-bidi.js", 319);
if (!dir || dir == 'ltr') {
                        _yuitest_coverline("build/editor-bidi/editor-bidi.js", 320);
d = 'rtl';
                    } else {
                        _yuitest_coverline("build/editor-bidi/editor-bidi.js", 322);
d = 'ltr';
                    }
                }
                _yuitest_coverline("build/editor-bidi/editor-bidi.js", 325);
n.setAttribute(DIR, d);
            });
            _yuitest_coverline("build/editor-bidi/editor-bidi.js", 327);
returnValue = selectedBlocks;
        }
        _yuitest_coverline("build/editor-bidi/editor-bidi.js", 329);
ns._checkForChange();
        _yuitest_coverline("build/editor-bidi/editor-bidi.js", 330);
return returnValue;
    };




}, '@VERSION@', {"requires": ["editor-base"]});
