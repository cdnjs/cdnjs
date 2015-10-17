YUI.add('createlink-base', function(Y) {

    /**
     * Base class for Editor. Handles the business logic of Editor, no GUI involved only utility methods and events.
     * @module editor
     * @submodule createlink-base
     */     
    /**
     * Adds prompt style link creation. Adds an override for the <a href="Plugin.ExecCommand.html#method_COMMANDS.createlink">createlink execCommand</a>.
     * @class Plugin.CreateLinkBase
     * @static
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
            var inst = this.get('host').getInstance(), out, a, sel,
                url = prompt(CreateLinkBase.STRINGS.PROMPT, CreateLinkBase.STRINGS.DEFAULT);

            if (url) {
                url = escape(url);
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



}, '@VERSION@' ,{requires:['editor-base'], skinnable:false});
