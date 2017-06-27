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
            var host = this.get(HOST), inst = host.getInstance(), sel, n,
                body = inst.config.doc.body,
                html = body.innerHTML,
                col = ((html.length) ? true : false);

            if (html === BR) {
                html = '';
                col = false;
            }

            body.innerHTML = '<' + P + '>' + html + inst.EditorSelection.CURSOR + '</' + P + '>';

            n = inst.one(FIRST_P);
            sel = new inst.EditorSelection();

            sel.selectNode(n, true, col);
        },
        /**
        * nodeChange handler to handle fixing an empty document.
        * @private
        * @method _onNodeChange
        */
        _onNodeChange: function(e) {
            var host = this.get(HOST), inst = host.getInstance(),
                html, txt, par , d, sel, btag = inst.EditorSelection.DEFAULT_BLOCK_TAG,
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
                    if (e.changedNode.test('li') && !Y.UA.ie) {
                        html = inst.EditorSelection.getText(e.changedNode);
                        if (html === '') {
                            par = e.changedNode.ancestor('ol,ul');
                            var dir = par.getAttribute('dir');
                            if (dir !== '') {
                                dir = ' dir = "' + dir + '"';
                            }
                            par = e.changedNode.ancestor(inst.EditorSelection.BLOCKS);
                            d = inst.Node.create('<p' + dir + '>' + inst.EditorSelection.CURSOR + '</p>');
                            par.insert(d, 'after');
                            e.changedNode.remove();
                            e.changedEvent.halt();

                            sel = new inst.EditorSelection();
                            sel.selectNode(d, true, false);
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
                            sel = new inst.EditorSelection();
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
                            d.prepend(inst.EditorSelection.CURSOR);
                            sel.focusCursor(true, true);
                            html = inst.EditorSelection.getText(d);
                            if (html !== '') {
                                inst.EditorSelection.cleanCursor();
                            }
                            e.changedEvent.preventDefault();
                        }
                    }
                    break;
                case 'keyup':
                    if (Y.UA.gecko) {
                        if (inst.config.doc && inst.config.doc.body && inst.config.doc.body.innerHTML.length < 20) {
                            if (!inst.one(FIRST_P)) {
                                this._fixFirstPara();
                            }
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

                        txt = inst.EditorSelection.getText(item);
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
                                    e.changedEvent.frameEvent.halt();
                                    e.preventDefault();
                                }
                            }
                        }
                        if (Y.UA.webkit) {
                            if (e.changedNode) {
                                //All backspace calls in Webkit need a preventDefault to
                                //stop history navigation #2531299
                                e.preventDefault();
                                item = e.changedNode;
                                if (item.test('li') && (!item.previous() && !item.next())) {
                                    html = item.get('innerHTML').replace(BR, '');
                                    if (html === '') {
                                        if (item.get(PARENT_NODE)) {
                                            item.get(PARENT_NODE).replace(inst.Node.create(BR));
                                            e.changedEvent.frameEvent.halt();
                                            inst.EditorSelection.filterBlocks();
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (Y.UA.gecko) {
                        /*
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
                inst.EditorSelection.filterBlocks();
                btag = inst.EditorSelection.DEFAULT_BLOCK_TAG;
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
            if (inst && inst.EditorSelection) {
                inst.EditorSelection.filterBlocks();
            }
        },
        /**
        * Performs block/paste filtering after paste.
        * @private
        * @method _afterPaste
        */
        _afterPaste: function() {
            var host = this.get(HOST), inst = host.getInstance(),
                sel = new inst.EditorSelection();

            Y.later(50, host, function() {
                inst.EditorSelection.filterBlocks();
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



}, '@VERSION@' ,{requires:['editor-base'], skinnable:false});
