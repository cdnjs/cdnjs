/**
 * @private
 */
Ext.define('Ext.button.Manager', {
    singleton: true,

    alternateClassName: 'Ext.ButtonToggleManager',

    groups: {},

    pressedButton: null,

    buttonSelector: '.' + Ext.baseCSSPrefix + 'btn',

    init: function() {
        var me = this;
        if (!me.initialized) {
            Ext.getDoc().on({
                keydown: me.onDocumentKeyDown,
                mouseup: me.onDocumentMouseUp,
                scope: me
            });
            me.initialized = true;
        }
    },

    // Buttons must react to SPACE and ENTER to trigger the click handler.
    // Now that they are `<a>` elements, we use a keydown listener.
    onDocumentKeyDown: function(e) {
        var k = e.getKey(),
            btn;

        // SPACE and ENTER trigger a click
        if (k === e.SPACE || k === e.ENTER) {

            // Look for a Button's encapsulating element
            btn = e.getTarget(this.buttonSelector);

            // If found, fire the Button's onClick
            if (btn) {
                Ext.getCmp(btn.id).onClick(e);
            }
        }
    },

    // Called by buton instances.
    // Track the button which was mousedowned upon so that the next *document* mouseup can be delivered to it
    // in case mouse is moved outside of button element.
    onButtonMousedown: function(button, e) {
        var pressed = this.pressedButton;
        if (pressed) {
            pressed.onMouseUp(e);
        }
        this.pressedButton = button;
    },

    onDocumentMouseUp: function(e) {
        var pressed = this.pressedButton;
        
        if (pressed) {
            pressed.onMouseUp(e);
            this.pressedButton = null;
        }
    },

    toggleGroup: function(btn, state) {
        if (state) {
            var g = this.groups[btn.toggleGroup],
                length = g.length,
                i;

            for (i = 0; i < length; i++) {
                if (g[i] !== btn) {
                    g[i].toggle(false);
                }
            }
        }
    },

    register: function(btn) {
        var me = this,
            groups = this.groups,
            group = groups[btn.toggleGroup];

        me.init();
        if (!btn.toggleGroup) {
            return;
        }

        if (!group) {
            group = groups[btn.toggleGroup] = [];
        }
        group.push(btn);
        btn.on('toggle', me.toggleGroup, me);
    },

    unregister: function(btn) {
        if (!btn.toggleGroup) {
            return;
        }
        var me = this,
            group = me.groups[btn.toggleGroup];

        if (group) {
            Ext.Array.remove(group, btn);
            btn.un('toggle', me.toggleGroup, me);
        }
    },

    /**
     * Gets the pressed button in the passed group or null
     * @param {String} groupName
     * @return {Ext.button.Button}
     */
    getPressed: function(groupName) {
        var group = this.groups[groupName],
            i = 0,
            len;

        if (group) {
            for (len = group.length; i < len; i++) {
                if (group[i].pressed === true) {
                    return group[i];
                }
            }
        }
        return null;
    }
});
