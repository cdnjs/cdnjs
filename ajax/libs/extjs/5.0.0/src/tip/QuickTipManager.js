/**
 * Provides attractive and customizable tooltips for any element. The QuickTips
 * singleton is used to configure and manage tooltips globally for multiple elements
 * in a generic manner.  To create individual tooltips with maximum customizability,
 * you should consider either {@link Ext.tip.Tip} or {@link Ext.tip.ToolTip}.
 *
 * Quicktips can be configured via tag attributes directly in markup, or by
 * registering quick tips programmatically via the {@link #register} method.
 *
 * The singleton's instance of {@link Ext.tip.QuickTip} is available via
 * {@link #getQuickTip}, and supports all the methods, and all the all the
 * configuration properties of Ext.tip.QuickTip. These settings will apply to all
 * tooltips shown by the singleton.
 *
 * Below is the summary of the configuration properties which can be used.
 * For detailed descriptions see the config options for the
 * {@link Ext.tip.QuickTip QuickTip} class
 *
 * ## QuickTips singleton configs (all are optional)
 *
 *  - `dismissDelay`
 *  - `hideDelay`
 *  - `maxWidth`
 *  - `minWidth`
 *  - `showDelay`
 *  - `trackMouse`
 *
 * ## Target element configs (optional unless otherwise noted)
 *
 *  - `autoHide`
 *  - `cls`
 *  - `dismissDelay` (overrides singleton value)
 *  - `target` (required)
 *  - `text` (required)
 *  - `title`
 *  - `width`
 *
 * Here is an example showing how some of these config options could be used:
 *
 *     @example
 *     // Init the singleton.  Any tag-based quick tips will start working.
 *     Ext.tip.QuickTipManager.init();
 *
 *     // Apply a set of config properties to the singleton
 *     Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), {
 *         maxWidth: 200,
 *         minWidth: 100,
 *         showDelay: 50      // Show 50ms after entering target
 *     });
 *
 *     // Create a small panel to add a quick tip to
 *     Ext.create('Ext.container.Container', {
 *         id: 'quickTipContainer',
 *         width: 200,
 *         height: 150,
 *         style: {
 *             backgroundColor:'#000000'
 *         },
 *         renderTo: Ext.getBody()
 *     });
 *
 *
 *     // Manually register a quick tip for a specific element
 *     Ext.tip.QuickTipManager.register({
 *         target: 'quickTipContainer',
 *         title: 'My Tooltip',
 *         text: 'This tooltip was added in code',
 *         width: 100,
 *         dismissDelay: 10000 // Hide after 10 seconds hover
 *     });
 *
 * To register a quick tip in markup, you simply add one or more of the valid QuickTip
 * attributes prefixed with the **data-** namespace.  The HTML element itself is
 * automatically set as the quick tip target. Here is the summary of supported attributes
 * (optional unless otherwise noted):
 *
 *  - `hide`: Specifying "user" is equivalent to setting autoHide = false.
 *     Any other value will be the same as autoHide = true.
 *  - `qclass`: A CSS class to be applied to the quick tip
 *     (equivalent to the 'cls' target element config).
 *  - `qtip (required)`: The quick tip text (equivalent to the 'text' target element config).
 *  - `qtitle`: The quick tip title (equivalent to the 'title' target element config).
 *  - `qwidth`: The quick tip width (equivalent to the 'width' target element config).
 *
 * Here is an example of configuring an HTML element to display a tooltip from markup:
 *
 *     // Add a quick tip to an HTML button
 *     <input type="button" value="OK" data-qtitle="OK Button" data-qwidth="100"
 *          data-qtip="This is a quick tip from markup!"></input>
 *
 * @singleton
 */
Ext.define('Ext.tip.QuickTipManager', {
    requires: ['Ext.tip.QuickTip'],
    singleton: true,
    alternateClassName: 'Ext.QuickTips',
    disabled: false,

    /**
     * Initializes the global QuickTips instance and prepare any quick tips.
     * @param {Boolean} [autoRender=true] True to render the QuickTips container
     * immediately to preload images.
     * @param {Object} [config] config object for the created QuickTip. By
     * default, the {@link Ext.tip.QuickTip QuickTip} class is instantiated, but this can
     * be changed by supplying an xtype property or a className property in this object.
     * All other properties on this object are configuration for the created component.
     */
    init : function (autoRender, config) {
        var me = this;

        if (!me.tip) {
            if (!Ext.isReady) {
                Ext.onReady(function(){
                    Ext.tip.QuickTipManager.init(autoRender, config);
                });
                return false;
            }

            var tipConfig = Ext.apply({
                //<debug>
                // tell the spec runner to ignore this element when checking if the dom is clean 
                sticky: true,
                //</debug>
                disabled: me.disabled,
                id: 'ext-quicktips-tip'
            }, config),
                className = tipConfig.className,
                xtype = tipConfig.xtype;

            if (className) {
                delete tipConfig.className;
            } else if (xtype) {
                className = 'widget.' + xtype;
                delete tipConfig.xtype;
            }

            if (autoRender !== false) {
                tipConfig.renderTo = document.body;

                //<debug>
                if (tipConfig.renderTo.tagName.toUpperCase() != 'BODY') { // e.g., == 'FRAMESET'
                    Ext.Error.raise({
                        sourceClass: 'Ext.tip.QuickTipManager',
                        sourceMethod: 'init',
                        msg: 'Cannot init QuickTipManager: no document body'
                    });
                }
                //</debug>
            }

            me.tip = Ext.create(className || 'Ext.tip.QuickTip', tipConfig);

            // private.
            // Need a globally accessble way of testing whether QuickTipsManager is both loaded AND initialized.
            Ext.quickTipsActive = true;
        }
    },

    /**
     * Destroys the QuickTips instance.
     */
    destroy: function() {
        Ext.destroy(this.tip);
        this.tip = undefined;
    },

    // Protected method called by the dd classes
    ddDisable : function() {
        var me = this,
            tip = me.tip;

        // don't disable it if we don't need to
        if (tip && !me.disabled) {
            tip.disable();
        }
    },

    // Protected method called by the dd classes
    ddEnable : function() {
        var me = this,
            tip = me.tip;

        // only enable it if it hasn't been disabled
        if (tip && !me.disabled) {
            tip.enable();
        }
    },

    /**
     * Enables quick tips globally.
     */
    enable : function(){
        var me = this,
            tip = me.tip;

        if (tip) {
            tip.enable();
        }
        me.disabled = false;
    },

    /**
     * Disables quick tips globally.
     */
    disable : function(){
        var me = this,
            tip = me.tip;

        if(tip){
            tip.disable();
        }
        me.disabled = true;
    },

    /**
     * Returns true if quick tips are enabled, else false.
     * @return {Boolean}
     */
    isEnabled : function(){
        var tip = this.tip;

        return tip !== undefined && !tip.disabled;
    },

    /**
     * Gets the single {@link Ext.tip.QuickTip QuickTip} instance used to show tips
     * from all registered elements.
     * @return {Ext.tip.QuickTip}
     */
    getQuickTip : function(){
        return this.tip;
    },

    /**
     * Configures a new quick tip instance and assigns it to a target element.  See
     * {@link Ext.tip.QuickTip#register} for details.
     * @param {Object} config The config object
     */
    register : function(){
        var tip = this.tip;

        tip.register.apply(tip, arguments);
    },

    /**
     * Removes any registered quick tip from the target element and destroys it.
     * @param {String/HTMLElement/Ext.dom.Element} el The element from which the quick tip
     * is to be removed or ID of the element.
     */
    unregister : function(){
        var tip = this.tip;

        tip.unregister.apply(tip, arguments);
    },

    /**
     * Alias of {@link #register}.
     * @inheritdoc Ext.tip.QuickTipManager#register
     */
    tips : function(){
        var tip = this.tip;

        tip.register.apply(tip, arguments);
    }
});