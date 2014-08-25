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
                    inst.config.doc.execCommand(action, false, value);
                } catch (e) {
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
                    return (new inst.Selection()).insertContent(html);
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
                    html += inst.Selection.CURSOR;
                    out = this.command('inserthtml', html);
                    sel = new inst.Selection();
                    sel.focusCursor(true, true);
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
                    return cur.previous();
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
                * Adds a background color to the current selection, or creates a new element and applies it
                * @method COMMANDS.backcolor
                * @static
                * @param {String} cmd The command executed: backcolor
                * @param {String} val The color value to apply
                * @return {NodeList} NodeList of the items touched by this command.
                */
                forecolor: function(cmd, val) {
                    var inst = this.getInstance(),
                        sel = new inst.Selection(), n;

                    if (!Y.UA.ie) {
                        this._command('styleWithCSS', 'true');
                    }
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
                    if (!Y.UA.ie) {
                        this._command('styleWithCSS', false);
                    }
                },
                backcolor: function(cmd, val) {
                    var inst = this.getInstance(),
                        sel = new inst.Selection(), n;

                    if (Y.UA.gecko || Y.UA.opera) {
                        cmd = 'hilitecolor';
                    }
                    if (!Y.UA.ie) {
                        this._command('styleWithCSS', 'true');
                    }
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
                    if (!Y.UA.ie) {
                        this._command('styleWithCSS', false);
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
                    var inst = this.getInstance(),
                        sel = new inst.Selection(), n;

                    if (sel.isCollapsed) {
                        if (sel.anchorNode && (sel.anchorNode.get('innerHTML') === '&nbsp;')) {
                            sel.anchorNode.setStyle('fontFamily', val);
                            n = sel.anchorNode;
                        } else {
                            n = this.command('inserthtml', '<span style="font-family: ' + val + '">' + inst.Selection.CURSOR + '</span>');
                            sel.focusCursor(true, true);
                        }
                        return n;
                    } else {
                        return this._command('fontname', val);
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
                    var inst = this.getInstance(),
                        sel = new inst.Selection(), n, prev;

                    if (sel.isCollapsed) {
                        n = this.command('inserthtml', '<font size="' + val + '">&nbsp;</font>');
                        prev = n.get('previousSibling');
                        if (prev && prev.get('nodeType') === 3) {
                            if (prev.get('length') < 2) {
                                prev.remove();
                            }
                        }
                        sel.selectNode(n.get('firstChild'), true, false);
                        return n;
                    } else {
                        return this._command('fontsize', val);
                    }
                }
            }
        });

        Y.namespace('Plugin');
        Y.Plugin.ExecCommand = ExecCommand;



}, '@VERSION@' ,{skinnable:false, requires:['frame']});
