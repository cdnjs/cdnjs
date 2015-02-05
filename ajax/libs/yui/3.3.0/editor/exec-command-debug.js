YUI.add('exec-command', function(Y) {


    /**
     * Plugin for the frame module to handle execCommands for Editor
     * @module editor
     * @submodule exec-command
     */     
    /**
     * Plugin for the frame module to handle execCommands for Editor
     * @class Plugin.ExecCommand
     * @extends Base
     * @constructor
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
                
                /*
                if (action !== 'insertbr') {
                    Y.later(0, this, function() {
                        var inst = this.getInstance();
                        if (inst && inst.Selection) {
                            inst.Selection.cleanCursor();
                        }
                    });
                }
                */

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
                    var inst = this.getInstance(), cur,
                        sel = new inst.Selection();

                    sel.setCursor();
                    cur = sel.getCursor();
                    cur.insert('<br>', 'before');
                    sel.focusCursor(true, false);
                    return ((cur && cur.previous) ? cur.previous() : null);
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
                * @method COMMANDS.fontname
                * @static
                * @param {String} cmd The command executed: fontname
                * @param {String} val The font name to apply
                * @return {NodeList} NodeList of the items touched by this command.
                */
                fontname: function(cmd, val) {
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
                * @method COMMANDS.fontsize
                * @static
                * @param {String} cmd The command executed: fontsize
                * @param {String} val The font size to apply
                * @return {NodeList} NodeList of the items touched by this command.
                */
                fontsize: function(cmd, val) {
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
                    sel.moveToElementText(s);
                    sel.select();
                }
            }
            this._command(cmd);
        };

        if (Y.UA.ie) {
            ExecCommand.COMMANDS.bold = function() {
                fixIETags.call(this, 'bold', 'b', 'FONT-WEIGHT: bold');
            }
            ExecCommand.COMMANDS.italic = function() {
                fixIETags.call(this, 'italic', 'i', 'FONT-STYLE: italic');
            }
            ExecCommand.COMMANDS.underline = function() {
                fixIETags.call(this, 'underline', 'u', 'TEXT-DECORATION: underline');
            }
        }

        Y.namespace('Plugin');
        Y.Plugin.ExecCommand = ExecCommand;



}, '@VERSION@' ,{requires:['frame'], skinnable:false});
