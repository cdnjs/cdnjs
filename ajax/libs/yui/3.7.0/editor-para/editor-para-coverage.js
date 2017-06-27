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
_yuitest_coverage["build/editor-para/editor-para.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/editor-para/editor-para.js",
    code: []
};
_yuitest_coverage["build/editor-para/editor-para.js"].code=["YUI.add('editor-para', function (Y, NAME) {","","","    /**","     * Plugin for Editor to paragraph auto wrapping and correction.","     * @class Plugin.EditorPara","     * @extends Plugin.EditorParaBase","     * @constructor","     * @module editor","     * @submodule editor-para","     */","","","    var EditorPara = function() {","        EditorPara.superclass.constructor.apply(this, arguments);","    }, HOST = 'host', BODY = 'body', NODE_CHANGE = 'nodeChange', PARENT_NODE = 'parentNode',","    FIRST_P = BODY + ' > p', P = 'p', BR = '<br>', FC = 'firstChild', LI = 'li';","","","    Y.extend(EditorPara, Y.Plugin.EditorParaBase, {","        /**","        * nodeChange handler to handle fixing an empty document.","        * @private","        * @method _onNodeChange","        */","        _onNodeChange: function(e) {","            var host = this.get(HOST), inst = host.getInstance(),","                html, txt, par , d, sel, btag = inst.EditorSelection.DEFAULT_BLOCK_TAG,","                inHTML, txt2, childs, aNode, index, node2, top, n, sib,","                ps, br, item, p, imgs, t, LAST_CHILD = ':last-child';","","            switch (e.changedType) {","                case 'enter-up':","                    var para = ((this._lastPara) ? this._lastPara : e.changedNode),","                        b = para.one('br.yui-cursor');","","                    if (this._lastPara) {","                        delete this._lastPara;","                    }","","                    if (b) {","                        if (b.previous() || b.next()) {","                            if (b.ancestor(P)) {","                                b.remove();","                            }","                        }","                    }","                    if (!para.test(btag)) {","                        var para2 = para.ancestor(btag);","                        if (para2) {","                            para = para2;","                            para2 = null;","                        }","                    }","                    if (para.test(btag)) {","                        var prev = para.previous(), lc, lc2, found = false;","                        if (prev) {","                            lc = prev.one(LAST_CHILD);","                            while (!found) {","                                if (lc) {","                                    lc2 = lc.one(LAST_CHILD);","                                    if (lc2) {","                                        lc = lc2;","                                    } else {","                                        found = true;","                                    }","                                } else {","                                    found = true;","                                }","                            }","                            if (lc) {","                                host.copyStyles(lc, para);","                            }","                        }","                    }","                    break;","                case 'enter':","                    if (Y.UA.webkit) {","                        //Webkit doesn't support shift+enter as a BR, this fixes that.","                        if (e.changedEvent.shiftKey) {","                            host.execCommand('insertbr');","                            e.changedEvent.preventDefault();","                        }","                    }","                    if (e.changedNode.test('li') && !Y.UA.ie) {","                        html = inst.EditorSelection.getText(e.changedNode);","                        if (html === '') {","                            par = e.changedNode.ancestor('ol,ul');","                            var dir = par.getAttribute('dir');","                            if (dir !== '') {","                                dir = ' dir = \"' + dir + '\"';","                            }","                            par = e.changedNode.ancestor(inst.EditorSelection.BLOCKS);","                            d = inst.Node.create('<p' + dir + '>' + inst.EditorSelection.CURSOR + '</p>');","                            par.insert(d, 'after');","                            e.changedNode.remove();","                            e.changedEvent.halt();","","                            sel = new inst.EditorSelection();","                            sel.selectNode(d, true, false);","                        }","                    }","                    //TODO Move this to a GECKO MODULE - Can't for the moment, requires no change to metadata (YMAIL)","                    if (Y.UA.gecko && host.get('defaultblock') !== 'p') {","                        par = e.changedNode;","","                        if (!par.test(LI) && !par.ancestor(LI)) {","                            if (!par.test(btag)) {","                                par = par.ancestor(btag);","                            }","                            d = inst.Node.create('<' + btag + '></' + btag + '>');","                            par.insert(d, 'after');","                            sel = new inst.EditorSelection();","                            if (sel.anchorOffset) {","                                inHTML = sel.anchorNode.get('textContent');","","                                txt = inst.one(inst.config.doc.createTextNode(inHTML.substr(0, sel.anchorOffset)));","                                txt2 = inst.one(inst.config.doc.createTextNode(inHTML.substr(sel.anchorOffset)));","","                                aNode = sel.anchorNode;","                                aNode.setContent(''); //I","                                node2 = aNode.cloneNode(); //I","                                node2.append(txt2); //text","                                top = false;","                                sib = aNode; //I","                                while (!top) {","                                    sib = sib.get(PARENT_NODE); //B","                                    if (sib && !sib.test(btag)) {","                                        n = sib.cloneNode();","                                        n.set('innerHTML', '');","                                        n.append(node2);","                                        ","                                        //Get children..","                                        childs = sib.get('childNodes');","                                        var start = false;","                                        childs.each(function(c) {","                                            if (start) {","                                                n.append(c);","                                            }","                                            if (c === aNode) {","                                                start = true;","                                            }","                                        });","","                                        aNode = sib; //Top sibling","                                        node2 = n;","                                    } else {","                                        top = true;","                                    }","                                }","                                txt2 = node2;","                                sel.anchorNode.append(txt);","","                                if (txt2) {","                                    d.append(txt2);","                                }","                            }","                            if (d.get(FC)) {","                                d = d.get(FC);","                            }","                            d.prepend(inst.EditorSelection.CURSOR);","                            sel.focusCursor(true, true);","                            html = inst.EditorSelection.getText(d);","                            if (html !== '') {","                                inst.EditorSelection.cleanCursor();","                            }","                            e.changedEvent.preventDefault();","                        }","                    }","                    break;","                case 'keyup':","                    if (Y.UA.gecko) {","                        if (inst.config.doc && inst.config.doc.body && inst.config.doc.body.innerHTML.length < 20) {","                            if (!inst.one(FIRST_P)) {","                                this._fixFirstPara();","                            }","                        }","                    }","                    break;","                case 'backspace-up':","                case 'backspace-down':","                case 'delete-up':","                    if (!Y.UA.ie) {","                        ps = inst.all(FIRST_P);","                        item = inst.one(BODY);","                        if (ps.item(0)) {","                            item = ps.item(0);","                        }","                        br = item.one('br');","                        if (br) {","                            br.removeAttribute('id');","                            br.removeAttribute('class');","                        }","","                        txt = inst.EditorSelection.getText(item);","                        txt = txt.replace(/ /g, '').replace(/\\n/g, '');","                        imgs = item.all('img');","                        ","                        if (txt.length === 0 && !imgs.size()) {","                            //God this is horrible..","                            if (!item.test(P)) {","                                this._fixFirstPara();","                            }","                            p = null;","                            if (e.changedNode && e.changedNode.test(P)) {","                                p = e.changedNode;","                            }","                            if (!p && host._lastPara && host._lastPara.inDoc()) {","                                p = host._lastPara;","                            }","                            if (p && !p.test(P)) {","                                p = p.ancestor(P);","                            }","                            if (p) {","                                if (!p.previous() && p.get(PARENT_NODE) && p.get(PARENT_NODE).test(BODY)) {","                                    e.changedEvent.frameEvent.halt();","                                    e.preventDefault();","                                }","                            }","                        }","                        if (Y.UA.webkit) {","                            if (e.changedNode) {","                                //All backspace calls in Webkit need a preventDefault to","                                //stop history navigation #2531299","                                e.preventDefault();","                                item = e.changedNode;","                                if (item.test('li') && (!item.previous() && !item.next())) {","                                    html = item.get('innerHTML').replace(BR, '');","                                    if (html === '') {","                                        if (item.get(PARENT_NODE)) {","                                            item.get(PARENT_NODE).replace(inst.Node.create(BR));","                                            e.changedEvent.frameEvent.halt();","                                            inst.EditorSelection.filterBlocks();","                                        }","                                    }","                                }","                            }","                        }","                    }","                    if (Y.UA.gecko) {","                        /*","                        * This forced FF to redraw the content on backspace.","                        * On some occasions FF will leave a cursor residue after content has been deleted.","                        * Dropping in the empty textnode and then removing it causes FF to redraw and","                        * remove the \"ghost cursors\"","                        */","                        d = e.changedNode;","                        t = inst.config.doc.createTextNode(' ');","                        d.appendChild(t);","                        d.removeChild(t);","                    }","                    break;","            }","            if (Y.UA.gecko) {","                if (e.changedNode && !e.changedNode.test(btag)) {","                    p = e.changedNode.ancestor(btag);","                    if (p) {","                        this._lastPara = p;","                    }","                }","            }","            ","        },","        initializer: function() {","            var host = this.get(HOST);","            if (host.editorBR) {","                Y.error('Can not plug EditorPara and EditorBR at the same time.');","                return;","            }","","            host.on(NODE_CHANGE, Y.bind(this._onNodeChange, this));","        }","    }, {","        /**","        * editorPara","        * @static","        * @property NAME","        */","        NAME: 'editorPara',","        /**","        * editorPara","        * @static","        * @property NS","        */","        NS: 'editorPara',","        ATTRS: {","            host: {","                value: false","            }","        }","    });","    ","    Y.namespace('Plugin');","    ","    Y.Plugin.EditorPara = EditorPara;","","","","}, '@VERSION@', {\"requires\": [\"editor-para-base\"]});"];
_yuitest_coverage["build/editor-para/editor-para.js"].lines = {"1":0,"14":0,"15":0,"20":0,"27":0,"32":0,"34":0,"37":0,"38":0,"41":0,"42":0,"43":0,"44":0,"48":0,"49":0,"50":0,"51":0,"52":0,"55":0,"56":0,"57":0,"58":0,"59":0,"60":0,"61":0,"62":0,"63":0,"65":0,"68":0,"71":0,"72":0,"76":0,"78":0,"80":0,"81":0,"82":0,"85":0,"86":0,"87":0,"88":0,"89":0,"90":0,"91":0,"93":0,"94":0,"95":0,"96":0,"97":0,"99":0,"100":0,"104":0,"105":0,"107":0,"108":0,"109":0,"111":0,"112":0,"113":0,"114":0,"115":0,"117":0,"118":0,"120":0,"121":0,"122":0,"123":0,"124":0,"125":0,"126":0,"127":0,"128":0,"129":0,"130":0,"131":0,"134":0,"135":0,"136":0,"137":0,"138":0,"140":0,"141":0,"145":0,"146":0,"148":0,"151":0,"152":0,"154":0,"155":0,"158":0,"159":0,"161":0,"162":0,"163":0,"164":0,"165":0,"167":0,"170":0,"172":0,"173":0,"174":0,"175":0,"179":0,"183":0,"184":0,"185":0,"186":0,"187":0,"189":0,"190":0,"191":0,"192":0,"195":0,"196":0,"197":0,"199":0,"201":0,"202":0,"204":0,"205":0,"206":0,"208":0,"209":0,"211":0,"212":0,"214":0,"215":0,"216":0,"217":0,"221":0,"222":0,"225":0,"226":0,"227":0,"228":0,"229":0,"230":0,"231":0,"232":0,"233":0,"240":0,"247":0,"248":0,"249":0,"250":0,"252":0,"254":0,"255":0,"256":0,"257":0,"258":0,"265":0,"266":0,"267":0,"268":0,"271":0,"293":0,"295":0};
_yuitest_coverage["build/editor-para/editor-para.js"].functions = {"EditorPara:14":0,"(anonymous 2):136":0,"_onNodeChange:26":0,"initializer:264":0,"(anonymous 1):1":0};
_yuitest_coverage["build/editor-para/editor-para.js"].coveredLines = 157;
_yuitest_coverage["build/editor-para/editor-para.js"].coveredFunctions = 5;
_yuitest_coverline("build/editor-para/editor-para.js", 1);
YUI.add('editor-para', function (Y, NAME) {


    /**
     * Plugin for Editor to paragraph auto wrapping and correction.
     * @class Plugin.EditorPara
     * @extends Plugin.EditorParaBase
     * @constructor
     * @module editor
     * @submodule editor-para
     */


    _yuitest_coverfunc("build/editor-para/editor-para.js", "(anonymous 1)", 1);
_yuitest_coverline("build/editor-para/editor-para.js", 14);
var EditorPara = function() {
        _yuitest_coverfunc("build/editor-para/editor-para.js", "EditorPara", 14);
_yuitest_coverline("build/editor-para/editor-para.js", 15);
EditorPara.superclass.constructor.apply(this, arguments);
    }, HOST = 'host', BODY = 'body', NODE_CHANGE = 'nodeChange', PARENT_NODE = 'parentNode',
    FIRST_P = BODY + ' > p', P = 'p', BR = '<br>', FC = 'firstChild', LI = 'li';


    _yuitest_coverline("build/editor-para/editor-para.js", 20);
Y.extend(EditorPara, Y.Plugin.EditorParaBase, {
        /**
        * nodeChange handler to handle fixing an empty document.
        * @private
        * @method _onNodeChange
        */
        _onNodeChange: function(e) {
            _yuitest_coverfunc("build/editor-para/editor-para.js", "_onNodeChange", 26);
_yuitest_coverline("build/editor-para/editor-para.js", 27);
var host = this.get(HOST), inst = host.getInstance(),
                html, txt, par , d, sel, btag = inst.EditorSelection.DEFAULT_BLOCK_TAG,
                inHTML, txt2, childs, aNode, index, node2, top, n, sib,
                ps, br, item, p, imgs, t, LAST_CHILD = ':last-child';

            _yuitest_coverline("build/editor-para/editor-para.js", 32);
switch (e.changedType) {
                case 'enter-up':
                    _yuitest_coverline("build/editor-para/editor-para.js", 34);
var para = ((this._lastPara) ? this._lastPara : e.changedNode),
                        b = para.one('br.yui-cursor');

                    _yuitest_coverline("build/editor-para/editor-para.js", 37);
if (this._lastPara) {
                        _yuitest_coverline("build/editor-para/editor-para.js", 38);
delete this._lastPara;
                    }

                    _yuitest_coverline("build/editor-para/editor-para.js", 41);
if (b) {
                        _yuitest_coverline("build/editor-para/editor-para.js", 42);
if (b.previous() || b.next()) {
                            _yuitest_coverline("build/editor-para/editor-para.js", 43);
if (b.ancestor(P)) {
                                _yuitest_coverline("build/editor-para/editor-para.js", 44);
b.remove();
                            }
                        }
                    }
                    _yuitest_coverline("build/editor-para/editor-para.js", 48);
if (!para.test(btag)) {
                        _yuitest_coverline("build/editor-para/editor-para.js", 49);
var para2 = para.ancestor(btag);
                        _yuitest_coverline("build/editor-para/editor-para.js", 50);
if (para2) {
                            _yuitest_coverline("build/editor-para/editor-para.js", 51);
para = para2;
                            _yuitest_coverline("build/editor-para/editor-para.js", 52);
para2 = null;
                        }
                    }
                    _yuitest_coverline("build/editor-para/editor-para.js", 55);
if (para.test(btag)) {
                        _yuitest_coverline("build/editor-para/editor-para.js", 56);
var prev = para.previous(), lc, lc2, found = false;
                        _yuitest_coverline("build/editor-para/editor-para.js", 57);
if (prev) {
                            _yuitest_coverline("build/editor-para/editor-para.js", 58);
lc = prev.one(LAST_CHILD);
                            _yuitest_coverline("build/editor-para/editor-para.js", 59);
while (!found) {
                                _yuitest_coverline("build/editor-para/editor-para.js", 60);
if (lc) {
                                    _yuitest_coverline("build/editor-para/editor-para.js", 61);
lc2 = lc.one(LAST_CHILD);
                                    _yuitest_coverline("build/editor-para/editor-para.js", 62);
if (lc2) {
                                        _yuitest_coverline("build/editor-para/editor-para.js", 63);
lc = lc2;
                                    } else {
                                        _yuitest_coverline("build/editor-para/editor-para.js", 65);
found = true;
                                    }
                                } else {
                                    _yuitest_coverline("build/editor-para/editor-para.js", 68);
found = true;
                                }
                            }
                            _yuitest_coverline("build/editor-para/editor-para.js", 71);
if (lc) {
                                _yuitest_coverline("build/editor-para/editor-para.js", 72);
host.copyStyles(lc, para);
                            }
                        }
                    }
                    _yuitest_coverline("build/editor-para/editor-para.js", 76);
break;
                case 'enter':
                    _yuitest_coverline("build/editor-para/editor-para.js", 78);
if (Y.UA.webkit) {
                        //Webkit doesn't support shift+enter as a BR, this fixes that.
                        _yuitest_coverline("build/editor-para/editor-para.js", 80);
if (e.changedEvent.shiftKey) {
                            _yuitest_coverline("build/editor-para/editor-para.js", 81);
host.execCommand('insertbr');
                            _yuitest_coverline("build/editor-para/editor-para.js", 82);
e.changedEvent.preventDefault();
                        }
                    }
                    _yuitest_coverline("build/editor-para/editor-para.js", 85);
if (e.changedNode.test('li') && !Y.UA.ie) {
                        _yuitest_coverline("build/editor-para/editor-para.js", 86);
html = inst.EditorSelection.getText(e.changedNode);
                        _yuitest_coverline("build/editor-para/editor-para.js", 87);
if (html === '') {
                            _yuitest_coverline("build/editor-para/editor-para.js", 88);
par = e.changedNode.ancestor('ol,ul');
                            _yuitest_coverline("build/editor-para/editor-para.js", 89);
var dir = par.getAttribute('dir');
                            _yuitest_coverline("build/editor-para/editor-para.js", 90);
if (dir !== '') {
                                _yuitest_coverline("build/editor-para/editor-para.js", 91);
dir = ' dir = "' + dir + '"';
                            }
                            _yuitest_coverline("build/editor-para/editor-para.js", 93);
par = e.changedNode.ancestor(inst.EditorSelection.BLOCKS);
                            _yuitest_coverline("build/editor-para/editor-para.js", 94);
d = inst.Node.create('<p' + dir + '>' + inst.EditorSelection.CURSOR + '</p>');
                            _yuitest_coverline("build/editor-para/editor-para.js", 95);
par.insert(d, 'after');
                            _yuitest_coverline("build/editor-para/editor-para.js", 96);
e.changedNode.remove();
                            _yuitest_coverline("build/editor-para/editor-para.js", 97);
e.changedEvent.halt();

                            _yuitest_coverline("build/editor-para/editor-para.js", 99);
sel = new inst.EditorSelection();
                            _yuitest_coverline("build/editor-para/editor-para.js", 100);
sel.selectNode(d, true, false);
                        }
                    }
                    //TODO Move this to a GECKO MODULE - Can't for the moment, requires no change to metadata (YMAIL)
                    _yuitest_coverline("build/editor-para/editor-para.js", 104);
if (Y.UA.gecko && host.get('defaultblock') !== 'p') {
                        _yuitest_coverline("build/editor-para/editor-para.js", 105);
par = e.changedNode;

                        _yuitest_coverline("build/editor-para/editor-para.js", 107);
if (!par.test(LI) && !par.ancestor(LI)) {
                            _yuitest_coverline("build/editor-para/editor-para.js", 108);
if (!par.test(btag)) {
                                _yuitest_coverline("build/editor-para/editor-para.js", 109);
par = par.ancestor(btag);
                            }
                            _yuitest_coverline("build/editor-para/editor-para.js", 111);
d = inst.Node.create('<' + btag + '></' + btag + '>');
                            _yuitest_coverline("build/editor-para/editor-para.js", 112);
par.insert(d, 'after');
                            _yuitest_coverline("build/editor-para/editor-para.js", 113);
sel = new inst.EditorSelection();
                            _yuitest_coverline("build/editor-para/editor-para.js", 114);
if (sel.anchorOffset) {
                                _yuitest_coverline("build/editor-para/editor-para.js", 115);
inHTML = sel.anchorNode.get('textContent');

                                _yuitest_coverline("build/editor-para/editor-para.js", 117);
txt = inst.one(inst.config.doc.createTextNode(inHTML.substr(0, sel.anchorOffset)));
                                _yuitest_coverline("build/editor-para/editor-para.js", 118);
txt2 = inst.one(inst.config.doc.createTextNode(inHTML.substr(sel.anchorOffset)));

                                _yuitest_coverline("build/editor-para/editor-para.js", 120);
aNode = sel.anchorNode;
                                _yuitest_coverline("build/editor-para/editor-para.js", 121);
aNode.setContent(''); //I
                                _yuitest_coverline("build/editor-para/editor-para.js", 122);
node2 = aNode.cloneNode(); //I
                                _yuitest_coverline("build/editor-para/editor-para.js", 123);
node2.append(txt2); //text
                                _yuitest_coverline("build/editor-para/editor-para.js", 124);
top = false;
                                _yuitest_coverline("build/editor-para/editor-para.js", 125);
sib = aNode; //I
                                _yuitest_coverline("build/editor-para/editor-para.js", 126);
while (!top) {
                                    _yuitest_coverline("build/editor-para/editor-para.js", 127);
sib = sib.get(PARENT_NODE); //B
                                    _yuitest_coverline("build/editor-para/editor-para.js", 128);
if (sib && !sib.test(btag)) {
                                        _yuitest_coverline("build/editor-para/editor-para.js", 129);
n = sib.cloneNode();
                                        _yuitest_coverline("build/editor-para/editor-para.js", 130);
n.set('innerHTML', '');
                                        _yuitest_coverline("build/editor-para/editor-para.js", 131);
n.append(node2);
                                        
                                        //Get children..
                                        _yuitest_coverline("build/editor-para/editor-para.js", 134);
childs = sib.get('childNodes');
                                        _yuitest_coverline("build/editor-para/editor-para.js", 135);
var start = false;
                                        _yuitest_coverline("build/editor-para/editor-para.js", 136);
childs.each(function(c) {
                                            _yuitest_coverfunc("build/editor-para/editor-para.js", "(anonymous 2)", 136);
_yuitest_coverline("build/editor-para/editor-para.js", 137);
if (start) {
                                                _yuitest_coverline("build/editor-para/editor-para.js", 138);
n.append(c);
                                            }
                                            _yuitest_coverline("build/editor-para/editor-para.js", 140);
if (c === aNode) {
                                                _yuitest_coverline("build/editor-para/editor-para.js", 141);
start = true;
                                            }
                                        });

                                        _yuitest_coverline("build/editor-para/editor-para.js", 145);
aNode = sib; //Top sibling
                                        _yuitest_coverline("build/editor-para/editor-para.js", 146);
node2 = n;
                                    } else {
                                        _yuitest_coverline("build/editor-para/editor-para.js", 148);
top = true;
                                    }
                                }
                                _yuitest_coverline("build/editor-para/editor-para.js", 151);
txt2 = node2;
                                _yuitest_coverline("build/editor-para/editor-para.js", 152);
sel.anchorNode.append(txt);

                                _yuitest_coverline("build/editor-para/editor-para.js", 154);
if (txt2) {
                                    _yuitest_coverline("build/editor-para/editor-para.js", 155);
d.append(txt2);
                                }
                            }
                            _yuitest_coverline("build/editor-para/editor-para.js", 158);
if (d.get(FC)) {
                                _yuitest_coverline("build/editor-para/editor-para.js", 159);
d = d.get(FC);
                            }
                            _yuitest_coverline("build/editor-para/editor-para.js", 161);
d.prepend(inst.EditorSelection.CURSOR);
                            _yuitest_coverline("build/editor-para/editor-para.js", 162);
sel.focusCursor(true, true);
                            _yuitest_coverline("build/editor-para/editor-para.js", 163);
html = inst.EditorSelection.getText(d);
                            _yuitest_coverline("build/editor-para/editor-para.js", 164);
if (html !== '') {
                                _yuitest_coverline("build/editor-para/editor-para.js", 165);
inst.EditorSelection.cleanCursor();
                            }
                            _yuitest_coverline("build/editor-para/editor-para.js", 167);
e.changedEvent.preventDefault();
                        }
                    }
                    _yuitest_coverline("build/editor-para/editor-para.js", 170);
break;
                case 'keyup':
                    _yuitest_coverline("build/editor-para/editor-para.js", 172);
if (Y.UA.gecko) {
                        _yuitest_coverline("build/editor-para/editor-para.js", 173);
if (inst.config.doc && inst.config.doc.body && inst.config.doc.body.innerHTML.length < 20) {
                            _yuitest_coverline("build/editor-para/editor-para.js", 174);
if (!inst.one(FIRST_P)) {
                                _yuitest_coverline("build/editor-para/editor-para.js", 175);
this._fixFirstPara();
                            }
                        }
                    }
                    _yuitest_coverline("build/editor-para/editor-para.js", 179);
break;
                case 'backspace-up':
                case 'backspace-down':
                case 'delete-up':
                    _yuitest_coverline("build/editor-para/editor-para.js", 183);
if (!Y.UA.ie) {
                        _yuitest_coverline("build/editor-para/editor-para.js", 184);
ps = inst.all(FIRST_P);
                        _yuitest_coverline("build/editor-para/editor-para.js", 185);
item = inst.one(BODY);
                        _yuitest_coverline("build/editor-para/editor-para.js", 186);
if (ps.item(0)) {
                            _yuitest_coverline("build/editor-para/editor-para.js", 187);
item = ps.item(0);
                        }
                        _yuitest_coverline("build/editor-para/editor-para.js", 189);
br = item.one('br');
                        _yuitest_coverline("build/editor-para/editor-para.js", 190);
if (br) {
                            _yuitest_coverline("build/editor-para/editor-para.js", 191);
br.removeAttribute('id');
                            _yuitest_coverline("build/editor-para/editor-para.js", 192);
br.removeAttribute('class');
                        }

                        _yuitest_coverline("build/editor-para/editor-para.js", 195);
txt = inst.EditorSelection.getText(item);
                        _yuitest_coverline("build/editor-para/editor-para.js", 196);
txt = txt.replace(/ /g, '').replace(/\n/g, '');
                        _yuitest_coverline("build/editor-para/editor-para.js", 197);
imgs = item.all('img');
                        
                        _yuitest_coverline("build/editor-para/editor-para.js", 199);
if (txt.length === 0 && !imgs.size()) {
                            //God this is horrible..
                            _yuitest_coverline("build/editor-para/editor-para.js", 201);
if (!item.test(P)) {
                                _yuitest_coverline("build/editor-para/editor-para.js", 202);
this._fixFirstPara();
                            }
                            _yuitest_coverline("build/editor-para/editor-para.js", 204);
p = null;
                            _yuitest_coverline("build/editor-para/editor-para.js", 205);
if (e.changedNode && e.changedNode.test(P)) {
                                _yuitest_coverline("build/editor-para/editor-para.js", 206);
p = e.changedNode;
                            }
                            _yuitest_coverline("build/editor-para/editor-para.js", 208);
if (!p && host._lastPara && host._lastPara.inDoc()) {
                                _yuitest_coverline("build/editor-para/editor-para.js", 209);
p = host._lastPara;
                            }
                            _yuitest_coverline("build/editor-para/editor-para.js", 211);
if (p && !p.test(P)) {
                                _yuitest_coverline("build/editor-para/editor-para.js", 212);
p = p.ancestor(P);
                            }
                            _yuitest_coverline("build/editor-para/editor-para.js", 214);
if (p) {
                                _yuitest_coverline("build/editor-para/editor-para.js", 215);
if (!p.previous() && p.get(PARENT_NODE) && p.get(PARENT_NODE).test(BODY)) {
                                    _yuitest_coverline("build/editor-para/editor-para.js", 216);
e.changedEvent.frameEvent.halt();
                                    _yuitest_coverline("build/editor-para/editor-para.js", 217);
e.preventDefault();
                                }
                            }
                        }
                        _yuitest_coverline("build/editor-para/editor-para.js", 221);
if (Y.UA.webkit) {
                            _yuitest_coverline("build/editor-para/editor-para.js", 222);
if (e.changedNode) {
                                //All backspace calls in Webkit need a preventDefault to
                                //stop history navigation #2531299
                                _yuitest_coverline("build/editor-para/editor-para.js", 225);
e.preventDefault();
                                _yuitest_coverline("build/editor-para/editor-para.js", 226);
item = e.changedNode;
                                _yuitest_coverline("build/editor-para/editor-para.js", 227);
if (item.test('li') && (!item.previous() && !item.next())) {
                                    _yuitest_coverline("build/editor-para/editor-para.js", 228);
html = item.get('innerHTML').replace(BR, '');
                                    _yuitest_coverline("build/editor-para/editor-para.js", 229);
if (html === '') {
                                        _yuitest_coverline("build/editor-para/editor-para.js", 230);
if (item.get(PARENT_NODE)) {
                                            _yuitest_coverline("build/editor-para/editor-para.js", 231);
item.get(PARENT_NODE).replace(inst.Node.create(BR));
                                            _yuitest_coverline("build/editor-para/editor-para.js", 232);
e.changedEvent.frameEvent.halt();
                                            _yuitest_coverline("build/editor-para/editor-para.js", 233);
inst.EditorSelection.filterBlocks();
                                        }
                                    }
                                }
                            }
                        }
                    }
                    _yuitest_coverline("build/editor-para/editor-para.js", 240);
if (Y.UA.gecko) {
                        /*
                        * This forced FF to redraw the content on backspace.
                        * On some occasions FF will leave a cursor residue after content has been deleted.
                        * Dropping in the empty textnode and then removing it causes FF to redraw and
                        * remove the "ghost cursors"
                        */
                        _yuitest_coverline("build/editor-para/editor-para.js", 247);
d = e.changedNode;
                        _yuitest_coverline("build/editor-para/editor-para.js", 248);
t = inst.config.doc.createTextNode(' ');
                        _yuitest_coverline("build/editor-para/editor-para.js", 249);
d.appendChild(t);
                        _yuitest_coverline("build/editor-para/editor-para.js", 250);
d.removeChild(t);
                    }
                    _yuitest_coverline("build/editor-para/editor-para.js", 252);
break;
            }
            _yuitest_coverline("build/editor-para/editor-para.js", 254);
if (Y.UA.gecko) {
                _yuitest_coverline("build/editor-para/editor-para.js", 255);
if (e.changedNode && !e.changedNode.test(btag)) {
                    _yuitest_coverline("build/editor-para/editor-para.js", 256);
p = e.changedNode.ancestor(btag);
                    _yuitest_coverline("build/editor-para/editor-para.js", 257);
if (p) {
                        _yuitest_coverline("build/editor-para/editor-para.js", 258);
this._lastPara = p;
                    }
                }
            }
            
        },
        initializer: function() {
            _yuitest_coverfunc("build/editor-para/editor-para.js", "initializer", 264);
_yuitest_coverline("build/editor-para/editor-para.js", 265);
var host = this.get(HOST);
            _yuitest_coverline("build/editor-para/editor-para.js", 266);
if (host.editorBR) {
                _yuitest_coverline("build/editor-para/editor-para.js", 267);
Y.error('Can not plug EditorPara and EditorBR at the same time.');
                _yuitest_coverline("build/editor-para/editor-para.js", 268);
return;
            }

            _yuitest_coverline("build/editor-para/editor-para.js", 271);
host.on(NODE_CHANGE, Y.bind(this._onNodeChange, this));
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
    
    _yuitest_coverline("build/editor-para/editor-para.js", 293);
Y.namespace('Plugin');
    
    _yuitest_coverline("build/editor-para/editor-para.js", 295);
Y.Plugin.EditorPara = EditorPara;



}, '@VERSION@', {"requires": ["editor-para-base"]});
