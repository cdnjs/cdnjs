/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * @docauthor Robert Dougan <rob@sencha.com>
 *
 * Create simple buttons with this component. Customisations include {@link #iconAlign aligned}
 * {@link #iconCls icons}, {@link #cfg-menu dropdown menus}, {@link #tooltip tooltips}
 * and {@link #scale sizing options}. Specify a {@link #handler handler} to run code when
 * a user clicks the button, or use {@link #listeners listeners} for other events such as
 * {@link #mouseover mouseover}. Example usage:
 *
 *     @example
 *     Ext.create('Ext.Button', {
 *         text: 'Click me',
 *         renderTo: Ext.getBody(),
 *         handler: function() {
 *             alert('You clicked the button!');
 *         }
 *     });
 *
 * The {@link #handler} configuration can also be updated dynamically using the {@link #setHandler}
 * method.  Example usage:
 *
 *     @example
 *     Ext.create('Ext.Button', {
 *         text    : 'Dynamic Handler Button',
 *         renderTo: Ext.getBody(),
 *         handler : function() {
 *             // this button will spit out a different number every time you click it.
 *             // so firstly we must check if that number is already set:
 *             if (this.clickCount) {
 *                 // looks like the property is already set, so lets just add 1 to that number and alert the user
 *                 this.clickCount++;
 *                 alert('You have clicked the button "' + this.clickCount + '" times.\n\nTry clicking it again..');
 *             } else {
 *                 // if the clickCount property is not set, we will set it and alert the user
 *                 this.clickCount = 1;
 *                 alert('You just clicked the button for the first time!\n\nTry pressing it again..');
 *             }
 *         }
 *     });
 *
 * A button within a container:
 *
 *     @example
 *     Ext.create('Ext.Container', {
 *         renderTo: Ext.getBody(),
 *         items   : [
 *             {
 *                 xtype: 'button',
 *                 text : 'My Button'
 *             }
 *         ]
 *     });
 *
 * A useful option of Button is the {@link #scale} configuration. This configuration has three different options:
 *
 * - `'small'`
 * - `'medium'`
 * - `'large'`
 *
 * Example usage:
 *
 *     @example
 *     Ext.create('Ext.Button', {
 *         renderTo: document.body,
 *         text    : 'Click me',
 *         scale   : 'large'
 *     });
 *
 * Buttons can also be toggled. To enable this, you simple set the {@link #enableToggle} property to `true`.
 * Example usage:
 *
 *     @example
 *     Ext.create('Ext.Button', {
 *         renderTo: Ext.getBody(),
 *         text: 'Click Me',
 *         enableToggle: true
 *     });
 *
 * You can assign a menu to a button by using the {@link #cfg-menu} configuration. This standard configuration
 * can either be a reference to a {@link Ext.menu.Menu menu} object, a {@link Ext.menu.Menu menu} id or a
 * {@link Ext.menu.Menu menu} config blob. When assigning a menu to a button, an arrow is automatically
 * added to the button.  You can change the alignment of the arrow using the {@link #arrowAlign} configuration
 * on button.  Example usage:
 *
 *     @example
 *     Ext.create('Ext.Button', {
 *         text      : 'Menu button',
 *         renderTo  : Ext.getBody(),
 *         arrowAlign: 'bottom',
 *         menu      : [
 *             {text: 'Item 1'},
 *             {text: 'Item 2'},
 *             {text: 'Item 3'},
 *             {text: 'Item 4'}
 *         ]
 *     });
 *
 * Using listeners, you can easily listen to events fired by any component, using the {@link #listeners}
 * configuration or using the {@link #addListener} method.  Button has a variety of different listeners:
 *
 * - `click`
 * - `toggle`
 * - `mouseover`
 * - `mouseout`
 * - `mouseshow`
 * - `menuhide`
 * - `menutriggerover`
 * - `menutriggerout`
 *
 * Example usage:
 *
 *     @example
 *     Ext.create('Ext.Button', {
 *         text     : 'Button',
 *         renderTo : Ext.getBody(),
 *         listeners: {
 *             click: function() {
 *                 // this == the button, as we are in the local scope
 *                 this.setText('I was clicked!');
 *             },
 *             mouseover: function() {
 *                 // set a new config which says we moused over, if not already set
 *                 if (!this.mousedOver) {
 *                     this.mousedOver = true;
 *                     alert('You moused over a button!\n\nI wont do this again.');
 *                 }
 *             }
 *         }
 *     });
 */
Ext.define('Ext.button.Button', {

    /* Begin Definitions */
    alias: 'widget.button',
    extend: 'Ext.Component',

    requires: [
        'Ext.button.Manager',
        'Ext.menu.Manager',
        'Ext.util.ClickRepeater',
        'Ext.layout.component.Button',
        'Ext.util.TextMetrics',
        'Ext.util.KeyMap'
    ],
    
    mixins: {
        queryable: 'Ext.Queryable'
    },

    alternateClassName: 'Ext.Button',
    /* End Definitions */

    /*
     * @property {Boolean} isAction
     * `true` in this class to identify an object as an instantiated Button, or subclass thereof.
     */
    isButton: true,
    componentLayout: 'button',

    /**
     * @property {Boolean} hidden
     * True if this button is hidden.
     * @readonly
     */
    hidden: false,

    /**
     * @property {Boolean} disabled
     * True if this button is disabled.
     * @readonly
     */
    disabled: false,

    /**
     * @property {Boolean} pressed
     * True if this button is pressed (only if enableToggle = true).
     * @readonly
     */
    pressed: false,

    /**
     * @cfg {String} text
     * The button text to be used as innerHTML (html tags are accepted).
     */

    /**
     * @cfg {String} icon
     * The path to an image to display in the button.
     */

    /**
     * @cfg {Function} handler
     * A function called when the button is clicked (can be used instead of click event).
     * @cfg {Ext.button.Button} handler.button This button.
     * @cfg {Ext.EventObject} handler.e The click event.
     */

    /**
     * @cfg {Number} minWidth
     * The minimum width for this button (used to give a set of buttons a common width).
     * See also {@link Ext.panel.Panel}.{@link Ext.panel.Panel#minButtonWidth minButtonWidth}.
     */

    /**
     * @cfg {String/Object} tooltip
     * The tooltip for the button - can be a string to be used as innerHTML (html tags are accepted) or
     * QuickTips config object.
     */

    /**
     * @cfg {Boolean} [hidden=false]
     * True to start hidden.
     */

    /**
     * @cfg {Boolean} [disabled=false]
     * True to start disabled.
     */

    /**
     * @cfg {Boolean} [pressed=false]
     * True to start pressed (only if enableToggle = true)
     */

    /**
     * @cfg {String} toggleGroup
     * The group this toggle button is a member of (only 1 per group can be pressed). If a toggleGroup
     * is specified, the {@link #enableToggle} configuration will automatically be set to true.
     */

    /**
     * @cfg {Boolean/Object} [repeat=false]
     * True to repeat fire the click event while the mouse is down. This can also be a
     * {@link Ext.util.ClickRepeater ClickRepeater} config object.
     */

    /**
     * @cfg {Number} tabIndex
     * Set a DOM tabIndex for this button.
     */
    tabIndex: 0,

    /**
     * @cfg {Boolean} [allowDepress=true]
     * False to not allow a pressed Button to be depressed. Only valid when {@link #enableToggle} is true.
     */

    /**
     * @cfg {Boolean} [enableToggle=false]
     * True to enable pressed/not pressed toggling. If a {@link #toggleGroup} is specified, this
     * option will be set to true.
     */
    enableToggle: false,

    /**
     * @cfg {Function} toggleHandler
     * Function called when a Button with {@link #enableToggle} set to true is clicked.
     * @cfg {Ext.button.Button} toggleHandler.button This button.
     * @cfg {Boolean} toggleHandler.state The next state of the Button, true means pressed.
     */

    /**
     * @cfg {Ext.menu.Menu/String/Object} menu
     * Standard menu attribute consisting of a reference to a menu object, a menu id or a menu config blob.
     */

    /**
     * @cfg {String} menuAlign
     * The position to align the menu to (see {@link Ext.util.Positionable#alignTo} for more details).
     */
    menuAlign: 'tl-bl?',

    /**
     * @cfg {Boolean} showEmptyMenu
     * True to force an attached {@link #cfg-menu} with no items to be shown when clicking 
     * this button. By default, the menu will not show if it is empty.
     */
    showEmptyMenu: false,

    /**
     * @cfg {String} textAlign
     * The text alignment for this button (center, left, right).
     */
    textAlign: 'center',

    /**
     * @cfg {String} overflowText
     * If used in a {@link Ext.toolbar.Toolbar Toolbar}, the text to be used if this item is shown in the overflow menu.
     * See also {@link Ext.toolbar.Item}.`{@link Ext.toolbar.Item#overflowText overflowText}`.
     */

    /**
     * @cfg {String} iconCls
     * A css class which sets a background image to be used as the icon for this button.
     */

    /**
     * @cfg {Number/String} glyph
     * A numeric unicode character code to use as the icon for this button. The default
     * font-family for glyphs can be set globally using
     * {@link Ext#setGlyphFontFamily Ext.setGlyphFontFamily()}. Alternatively, this
     * config option accepts a string with the charCode and font-family separated by the
     * `@` symbol. For example '65@My Font Family'.
     */

    /**
     * @cfg {String} clickEvent
     * The DOM event that will fire the handler of the button. This can be any valid event name (dblclick, contextmenu).
     */
    clickEvent: 'click',

    /**
     * @cfg {Boolean} preventDefault
     * True to prevent the default action when the {@link #clickEvent} is processed.
     */
    preventDefault: true,

    /**
     * @cfg {Boolean} handleMouseEvents
     * False to disable visual cues on mouseover, mouseout and mousedown.
     */
    handleMouseEvents: true,

    /**
     * @cfg {String} tooltipType
     * The type of tooltip to use. Either 'qtip' for QuickTips or 'title' for title attribute.
     */
    tooltipType: 'qtip',

    /**
     * @cfg {String} [baseCls='x-btn']
     * The base CSS class to add to all buttons.
     */
    baseCls: Ext.baseCSSPrefix + 'btn',

    /**
     * @cfg {String} pressedCls
     * The CSS class to add to a button when it is in the pressed state.
     */
    pressedCls: 'pressed',

    /**
     * @cfg {String} overCls
     * The CSS class to add to a button when it is in the over (hovered) state.
     */
    overCls: 'over',

    /**
     * @cfg {String} focusCls
     * The CSS class to add to a button when it is in the focussed state.
     */
    focusCls: 'focus',

    /**
     * @cfg {String} menuActiveCls
     * The CSS class to add to a button when it's menu is active.
     */
    menuActiveCls: 'menu-active',

    /**
     * @cfg {String} href
     * The URL to open when the button is clicked. Specifying this config causes the Button to be
     * rendered with the specified URL as the `href` attribute of its `<a>` Element.
     *
     * This is better than specifying a click handler of
     *
     *     function() { window.location = "http://www.sencha.com" }
     *
     * because the UI will provide meaningful hints to the user as to what to expect upon clicking
     * the button, and will also allow the user to open in a new tab or window, bookmark or drag the URL, or directly save
     * the URL stream to disk.
     *
     * See also the {@link #hrefTarget} config.
     */

    /**
      * @cfg {String} [hrefTarget="_blank"]
      * The target attribute to use for the underlying anchor. Only used if the {@link #href}
      * property is specified.
      */
     hrefTarget: '_blank',

     /**
     * @cfg {Boolean} destroyMenu
     * Whether or not to destroy any associated menu when this button is destroyed. The menu
     * will be destroyed unless this is explicitly set to false.
     */

    /**
     * @cfg {Object} baseParams
     * An object literal of parameters to pass to the url when the {@link #href} property is specified.
     */

    /**
     * @cfg {Object} params
     * An object literal of parameters to pass to the url when the {@link #href} property is specified. Any params
     * override {@link #baseParams}. New params can be set using the {@link #setParams} method.
     */

    childEls: [
        'btnEl', 'btnWrap', 'btnInnerEl', 'btnIconEl'
    ],

    // We have to keep "unselectable" attribute on all elements because it's not inheritable.
    // Without it, clicking anywhere on a button disrupts current selection and cursor position
    // in HtmlEditor.
    renderTpl: [
        '<span id="{id}-btnWrap" class="{baseCls}-wrap',
            '<tpl if="splitCls"> {splitCls}</tpl>',
            '{childElCls}" unselectable="on">',
            '<span id="{id}-btnEl" class="{baseCls}-button">',
                '<span id="{id}-btnInnerEl" class="{baseCls}-inner {innerCls}',
                    '{childElCls}" unselectable="on">',
                    '{text}',
                '</span>',
                '<span role="img" id="{id}-btnIconEl" class="{baseCls}-icon-el {iconCls}',
                    '{childElCls} {glyphCls}" unselectable="on" style="',
                    '<tpl if="iconUrl">background-image:url({iconUrl});</tpl>',
                    '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">',
                    '<tpl if="glyph">&#{glyph};</tpl><tpl if="iconCls || iconUrl">&#160;</tpl>',
                '</span>',
            '</span>',
        '</span>',
        // if "closable" (tab) add a close element icon
        '<tpl if="closable">',
            '<span id="{id}-closeEl" class="{baseCls}-close-btn" title="{closeText}" tabIndex="0"></span>',
        '</tpl>'
    ],

    /**
     * @cfg {"small"/"medium"/"large"} scale
     * The size of the Button. Three values are allowed:
     *
     * - 'small' - Results in the button element being 16px high.
     * - 'medium' - Results in the button element being 24px high.
     * - 'large' - Results in the button element being 32px high.
     */
    scale: 'small',

    /**
     * @private
     * An array of allowed scales.
     */
    allowedScales: ['small', 'medium', 'large'],

    /**
     * @cfg {Object} scope
     * The scope (**this** reference) in which the `{@link #handler}` and `{@link #toggleHandler}` is executed.
     * Defaults to this Button.
     */

    /**
     * @cfg {String} iconAlign
     * The side of the Button box to render the icon. Four values are allowed:
     *
     * - 'top'
     * - 'right'
     * - 'bottom'
     * - 'left'
     */
    iconAlign: 'left',

    /**
     * @cfg {String} arrowAlign
     * The side of the Button box to render the arrow if the button has an associated {@link #cfg-menu}. Two
     * values are allowed:
     *
     * - 'right'
     * - 'bottom'
     */
    arrowAlign: 'right',

    /**
     * @cfg {String} arrowCls
     * The className used for the inner arrow element if the button has a menu.
     */
    arrowCls: 'arrow',

    /**
     * @property {Ext.Template} template
     * A {@link Ext.Template Template} used to create the Button's DOM structure.
     *
     * Instances, or subclasses which need a different DOM structure may provide a different template layout in
     * conjunction with an implementation of {@link #getTemplateArgs}.
     */

    /**
     * @cfg {String} cls
     * A CSS class string to apply to the button's main element.
     */

    /**
     * @property {Ext.menu.Menu} menu
     * The {@link Ext.menu.Menu Menu} object associated with this Button when configured with the {@link #cfg-menu} config
     * option.
     */

    maskOnDisable: false,

    shrinkWrap: 3,

    frame: true,

    // A reusable object used by getTriggerRegion to avoid excessive object creation.
    _triggerRegion: {},

    // inherit docs
    initComponent: function() {
        var me = this;

        // the autoEl object can't be on the prototype because we add tabIndex and href
        // properties to it conditionally.
        me.autoEl = {
            tag: 'a',
            role: 'button',
            hidefocus: 'on',
            unselectable: 'on'
        };

        // Ensure no selection happens
        me.addCls('x-unselectable');

        me.callParent(arguments);

        me.addEvents(
            /**
             * @event click
             * Fires when this button is clicked, before the configured {@link #handler} is invoked. Execution of the
             * {@link #handler} may be vetoed by returning <code>false</code> to this event.
             * @param {Ext.button.Button} this
             * @param {Event} e The click event
             */
            'click',

            /**
             * @event toggle
             * Fires when the 'pressed' state of this button changes (only if enableToggle = true)
             * @param {Ext.button.Button} this
             * @param {Boolean} pressed
             */
            'toggle',

            /**
             * @event mouseover
             * Fires when the mouse hovers over the button
             * @param {Ext.button.Button} this
             * @param {Event} e The event object
             */
            'mouseover',

            /**
             * @event mouseout
             * Fires when the mouse exits the button
             * @param {Ext.button.Button} this
             * @param {Event} e The event object
             */
            'mouseout',

            /**
             * @event menushow
             * If this button has a menu, this event fires when it is shown
             * @param {Ext.button.Button} this
             * @param {Ext.menu.Menu} menu
             */
            'menushow',

            /**
             * @event menuhide
             * If this button has a menu, this event fires when it is hidden
             * @param {Ext.button.Button} this
             * @param {Ext.menu.Menu} menu
             */
            'menuhide',

            /**
             * @event menutriggerover
             * If this button has a menu, this event fires when the mouse enters the menu triggering element
             * @param {Ext.button.Button} this
             * @param {Ext.menu.Menu} menu
             * @param {Event} e
             */
            'menutriggerover',

            /**
             * @event menutriggerout
             * If this button has a menu, this event fires when the mouse leaves the menu triggering element
             * @param {Ext.button.Button} this
             * @param {Ext.menu.Menu} menu
             * @param {Event} e
             */
            'menutriggerout',

            /**
             * @event textchange
             * Fired when the button's text is changed by the {@link #setText} method.
             * @param {Ext.button.Button} this
             * @param {String} oldText
             * @param {String} newText
             */
            'textchange',

            /**
             * @event iconchange
             * Fired when the button's icon is changed by the {@link #setIcon} or {@link #setIconCls} methods.
             * @param {Ext.button.Button} this
             * @param {String} oldIcon
             * @param {String} newIcon
             */
            'iconchange',

            /**
             * @event glyphchange
             * Fired when the button's glyph is changed by the {@link #setGlyph} method.
             * @param {Ext.button.Button} this
             * @param {Number/String} newGlyph
             * @param {Number/String} oldGlyph
             */
            'glyphchange'
        );

        if (me.menu) {
            // Flag that we'll have a splitCls
            me.split = true;

            // retrieve menu by id or instantiate instance if needed
            me.menu = Ext.menu.Manager.get(me.menu);

            // Use ownerButton as the upward link. Menus *must have no ownerCt* - they are global floaters.
            // Upward navigation is done using the up() method.
            me.menu.ownerButton = me;
        }

        // Accept url as a synonym for href
        if (me.url) {
            me.href = me.url;
        }

        // preventDefault defaults to false for links
        if (me.href && !me.hasOwnProperty('preventDefault')) {
            me.preventDefault = false;
        }

        if (Ext.isString(me.toggleGroup) && me.toggleGroup !== '') {
            me.enableToggle = true;
        }

        if (me.html && !me.text) {
            me.text = me.html;
            delete me.html;
        }

        me.glyphCls = me.baseCls + '-glyph';
    },

    // inherit docs
    getActionEl: function() {
        return this.el;
    },

    // inherit docs
    getFocusEl: function() {
        return this.el;
    },

    // See comments in onFocus
    onDisable: function(){
        this.callParent(arguments);
    },

    // @private
    setComponentCls: function() {
        var me = this,
            cls = me.getComponentCls();

        if (!Ext.isEmpty(me.oldCls)) {
            me.removeClsWithUI(me.oldCls);
            me.removeClsWithUI(me.pressedCls);
        }

        me.oldCls = cls;
        me.addClsWithUI(cls);
    },

    getComponentCls: function() {
        var me = this,
            cls;

        // Check whether the button has an icon or not, and if it has an icon, what is the alignment
        if (me.iconCls || me.icon || me.glyph) {
            cls = [me.text ? 'icon-text-' + me.iconAlign : 'icon'];
        } else if (me.text) {
            cls = ['noicon'];
        } else {
            cls = [];
        }

        if (me.pressed) {
            cls[cls.length] = me.pressedCls;
        }
        return cls;
    },

    beforeRender: function () {
        var me = this,
            autoEl = me.autoEl,
            href = me.getHref(),
            hrefTarget = me.hrefTarget;

        if (!me.disabled) {
            autoEl.tabIndex = me.tabIndex;
        }

        if (href) {
            autoEl.href = href;
            if (hrefTarget) {
                autoEl.target = hrefTarget;
            }
        }

        me.callParent();

        // Add all needed classes to the protoElement.
        me.oldCls = me.getComponentCls();
        me.addClsWithUI(me.oldCls);

        // Apply the renderData to the template args
        Ext.applyIf(me.renderData, me.getTemplateArgs());
    },

    // @private
    onRender: function() {
        var me = this,
            addOnclick,
            btn,
            btnListeners;

        me.doc = Ext.getDoc();
        me.callParent(arguments);

        // Set btn as a local variable for easy access
        btn = me.el;

        if (me.tooltip) {
            me.setTooltip(me.tooltip, true);
        }

        // Add the mouse events to the button
        if (me.handleMouseEvents) {
            btnListeners = {
                scope: me,
                mouseover: me.onMouseOver,
                mouseout: me.onMouseOut,
                mousedown: me.onMouseDown
            };
            if (me.split) {
                btnListeners.mousemove = me.onMouseMove;
            }
        } else {
            btnListeners = {
                scope: me
            };
        }

        // Check if the button has a menu
        if (me.menu) {
            me.mon(me.menu, {
                scope: me,
                show: me.onMenuShow,
                hide: me.onMenuHide
            });

            me.keyMap = new Ext.util.KeyMap({
                target: me.el,
                key: Ext.EventObject.DOWN,
                handler: me.onDownKey,
                scope: me
            });
        }

        // Check if it is a repeat button
        if (me.repeat) {
            me.mon(new Ext.util.ClickRepeater(btn, Ext.isObject(me.repeat) ? me.repeat: {}), 'click', me.onRepeatClick, me);
        } else {

            // If the activation event already has a handler, make a note to add the handler later
            if (btnListeners[me.clickEvent]) {
                addOnclick = true;
            } else {
                btnListeners[me.clickEvent] = me.onClick;
            }
        }

        // Add whatever button listeners we need
        me.mon(btn, btnListeners);

        // If the listeners object had an entry for our clickEvent, add a listener now
        if (addOnclick) {
            me.mon(btn, me.clickEvent, me.onClick, me);
        }

        Ext.button.Manager.register(me);
    },

    /**
     * This method returns an object which provides substitution parameters for the {@link #renderTpl XTemplate} used to
     * create this Button's DOM structure.
     *
     * Instances or subclasses which use a different Template to create a different DOM structure may need to provide
     * their own implementation of this method.
     * @protected
     *
     * @return {Object} Substitution data for a Template. The default implementation which provides data for the default
     * {@link #template} returns an Object containing the following properties:
     * @return {String} return.innerCls A CSS class to apply to the button's text element.
     * @return {String} return.splitCls A CSS class to determine the presence and position of an arrow icon.
     * (`'x-btn-arrow'` or `'x-btn-arrow-bottom'` or `''`)
     * @return {String} return.iconUrl The url for the button icon.
     * @return {String} return.iconCls The CSS class for the button icon.
     * @return {String} return.glyph The glyph to use as the button icon.
     * @return {String} return.glyphCls The CSS class to use for the glyph element.
     * @return {String} return.glyphFontFamily The CSS font-family to use for the glyph element.
     * @return {String} return.text The {@link #text} to display ion the Button.
     */
    getTemplateArgs: function() {
        var me = this,
            glyph = me.glyph,
            glyphFontFamily = Ext._glyphFontFamily,
            glyphParts;

        if (typeof glyph === 'string') {
            glyphParts = glyph.split('@');
            glyph = glyphParts[0];
            glyphFontFamily = glyphParts[1];
        }

        return {
            innerCls : me.getInnerCls(),
            splitCls : me.getSplitCls(),
            iconUrl  : me.icon,
            iconCls  : me.iconCls,
            glyph: glyph,
            glyphCls: glyph ? me.glyphCls : '', 
            glyphFontFamily: glyphFontFamily,
            text     : me.text || '&#160;'
        };
    },

    /**
     * Sets the href of the embedded anchor element to the passed URL.
     *
     * Also appends any configured {@link #cfg-baseParams} and parameters set through {@link #setParams}.
     * @param {String} href The URL to set in the anchor element.
     *
     */
    setHref: function(href) {
        this.href = href;
        this.el.dom.href = this.getHref();
    },

    /**
     * @private
     * If there is a configured href for this Button, returns the href with parameters appended.
     * @return {String/Boolean} The href string with parameters appended.
     */
    getHref: function() {
        var me = this,
            href = me.href;

        return href ? Ext.urlAppend(href, Ext.Object.toQueryString(Ext.apply({}, me.params, me.baseParams))) : false;
    },

    /**
     * Sets the href of the link dynamically according to the params passed, and any {@link #baseParams} configured.
     *
     * **Only valid if the Button was originally configured with a {@link #href}**
     *
     * @param {Object} params Parameters to use in the href URL.
     */
    setParams: function(params) {
        this.params = params;
        this.el.dom.href = this.getHref();
    },

    getSplitCls: function() {
        var me = this;
        return me.split ? (me.baseCls + '-' + me.arrowCls) + ' ' + (me.baseCls + '-' + me.arrowCls + '-' + me.arrowAlign) : '';
    },

    getInnerCls: function() {
        return this.textAlign ? this.baseCls + '-inner-' + this.textAlign : '';
    },

    /**
     * Sets the background image (inline style) of the button. This method also changes the value of the {@link #icon}
     * config internally.
     * @param {String} icon The path to an image to display in the button
     * @return {Ext.button.Button} this
     */
    setIcon: function(icon) {
        icon = icon || '';
        var me = this,
            btnIconEl = me.btnIconEl,
            oldIcon = me.icon || '';

        me.icon = icon;
        if (icon != oldIcon) {
            if (btnIconEl) {
                btnIconEl.setStyle('background-image', icon ? 'url(' + icon + ')': '');
                me.setComponentCls();
                if (me.didIconStateChange(oldIcon, icon)) {
                    me.updateLayout();
                }
            }
            me.fireEvent('iconchange', me, oldIcon, icon);
        }
        return me;
    },

    /**
     * Sets the CSS class that provides a background image to use as the button's icon. This method also changes the
     * value of the {@link #iconCls} config internally.
     * @param {String} cls The CSS class providing the icon image
     * @return {Ext.button.Button} this
     */
    setIconCls: function(cls) {
        cls = cls || '';
        var me = this,
            btnIconEl = me.btnIconEl,
            oldCls = me.iconCls || '';

        me.iconCls = cls;
        if (oldCls != cls) {
            if (btnIconEl) {
                // Remove the previous iconCls from the button
                btnIconEl.removeCls(oldCls);
                btnIconEl.addCls(cls);
                me.setComponentCls();
                if (me.didIconStateChange(oldCls, cls)) {
                    me.updateLayout();
                }
            }
            me.fireEvent('iconchange', me, oldCls, cls);
        }
        return me;
    },

    /**
     * Sets this button's glyph
     * @param {Number/String} glyph the numeric charCode or string charCode/font-family.
     * This parameter expects a format consistent with that of {@link #glyph}
     * @return {Ext.button.Button} this
     */
    setGlyph: function(glyph) {
        glyph = glyph || 0;
        var me = this,
            btnIconEl = me.btnIconEl,
            oldGlyph = me.glyph,
            fontFamily, glyphParts;

        me.glyph = glyph;

        if (btnIconEl) {
            if (typeof glyph === 'string') {
                glyphParts = glyph.split('@');
                glyph = glyphParts[0];
                fontFamily = glyphParts[1] || Ext._glyphFontFamily;
            }

            if (!glyph) {
                btnIconEl.dom.innerHTML = '';
            } else if (oldGlyph != glyph) {
                btnIconEl.dom.innerHTML = '&#' + glyph + ';';
            }

            if (fontFamily) {
                btnIconEl.setStyle('font-family', fontFamily);
            }
        }

        me.fireEvent('glyphchange', me, me.glyph, oldGlyph);

        return me;
    },

    /**
     * Sets the tooltip for this Button.
     *
     * @param {String/Object} tooltip This may be:
     *
     *   - **String** : A string to be used as innerHTML (html tags are accepted) to show in a tooltip
     *   - **Object** : A configuration object for {@link Ext.tip.QuickTipManager#register}.
     *
     * @return {Ext.button.Button} this
     */
    setTooltip: function(tooltip, initial) {
        var me = this;

        if (me.rendered) {
            if (!initial || !tooltip) {
                me.clearTip();
            }
            if (tooltip) {
                if (Ext.quickTipsActive && Ext.isObject(tooltip)) {
                    Ext.tip.QuickTipManager.register(Ext.apply({
                        target: me.el.id
                    },
                    tooltip));
                    me.tooltip = tooltip;
                } else {
                    me.el.dom.setAttribute(me.getTipAttr(), tooltip);
                }
            }
        } else {
            me.tooltip = tooltip;
        }
        return me;
    },

    /**
     * Sets the text alignment for this button.
     * @param {String} align The new alignment of the button text. See {@link #textAlign}.
     */
    setTextAlign: function(align) {
        var me = this,
            btnEl = me.btnEl;

        if (btnEl) {
            btnEl.removeCls(me.baseCls + '-inner-' + me.textAlign);
            btnEl.addCls(me.baseCls + '-inner-' + align);
        }
        me.textAlign = align;
        return me;
    },

    getTipAttr: function(){
        return this.tooltipType == 'qtip' ? 'data-qtip' : 'title';
    },

    // @private
    getRefItems: function(deep){
        var menu = this.menu,
            items;

        if (menu) {
            items = menu.getRefItems(deep);
            items.unshift(menu);
        }
        return items || [];
    },

    // @private
    clearTip: function() {
        var me = this,
            el = me.el;

        if (Ext.quickTipsActive && Ext.isObject(me.tooltip)) {
            Ext.tip.QuickTipManager.unregister(el);
        } else {
            el.dom.removeAttribute(me.getTipAttr());
        }
    },

    // @private
    beforeDestroy: function() {
        var me = this;
        if (me.rendered) {
            me.clearTip();
        }
        if (me.menu && me.destroyMenu !== false) {
            Ext.destroy(me.menu);
        }
        Ext.destroy(me.btnInnerEl, me.repeater);
        me.callParent();
    },

    // @private
    onDestroy: function() {
        var me = this;
        if (me.rendered) {
            me.doc.un('mouseover', me.monitorMouseOver, me);
            delete me.doc;

            Ext.destroy(me.keyMap);
            delete me.keyMap;
        }
        Ext.button.Manager.unregister(me);
        me.callParent();
    },

    /**
     * Assigns this Button's click handler
     * @param {Function} handler The function to call when the button is clicked
     * @param {Object} [scope] The scope (`this` reference) in which the handler function is executed.
     * Defaults to this Button.
     * @return {Ext.button.Button} this
     */
    setHandler: function(handler, scope) {
        this.handler = handler;
        this.scope = scope;
        return this;
    },

    /**
     * Sets this Button's text
     * @param {String} text The button text
     * @return {Ext.button.Button} this
     */
    setText: function(text) {
        text = text || '';
        var me = this,
            oldText = me.text || '';

        if (text != oldText) {
            me.text = text;
            if (me.rendered) {
                me.btnInnerEl.update(text || '&#160;');
                me.setComponentCls();
                if (Ext.isStrict && Ext.isIE8) {
                    // weird repaint issue causes it to not resize
                    me.el.repaint();
                }
                me.updateLayout();
            }
            me.fireEvent('textchange', me, oldText, text);
        }
        return me;
    },

    /**
     * Checks if the icon/iconCls changed from being empty to having a value, or having a value to being empty.
     * @private
     * @param {String} old The old icon/iconCls
     * @param {String} current The current icon/iconCls
     * @return {Boolean} True if the icon state changed
     */
    didIconStateChange: function(old, current) {
        var currentEmpty = Ext.isEmpty(current);
        return Ext.isEmpty(old) ? !currentEmpty : currentEmpty;
    },

    /**
     * Gets the text for this Button
     * @return {String} The button text
     */
    getText: function() {
        return this.text;
    },

    /**
     * If a state it passed, it becomes the pressed state otherwise the current state is toggled.
     * @param {Boolean} [state] Force a particular state
     * @param {Boolean} [suppressEvent=false] True to stop events being fired when calling this method.
     * @return {Ext.button.Button} this
     */
    toggle: function(state, suppressEvent) {
        var me = this;
        state = state === undefined ? !me.pressed: !!state;
        if (state !== me.pressed) {
            if (me.rendered) {
                me[state ? 'addClsWithUI': 'removeClsWithUI'](me.pressedCls);
            }
            me.pressed = state;
            if (!suppressEvent) {
                me.fireEvent('toggle', me, state);
                Ext.callback(me.toggleHandler, me.scope || me, [me, state]);
            }
        }
        return me;
    },

    maybeShowMenu: function(){
        var me = this;
        if (me.menu && !me.hasVisibleMenu() && !me.ignoreNextClick) {
            me.showMenu(true);
        }
    },

    /**
     * Shows this button's menu (if it has one)
     */
    showMenu: function(/* private */ fromEvent) {
        var me = this,
            menu = me.menu;

        if (me.rendered) {
            if (me.tooltip && Ext.quickTipsActive && me.getTipAttr() != 'title') {
                Ext.tip.QuickTipManager.getQuickTip().cancelShow(me.el);
            }
            if (menu.isVisible()) {
                menu.hide();
            }

            if (!fromEvent || me.showEmptyMenu || menu.items.getCount() > 0) {
                menu.showBy(me.el, me.menuAlign);
            }
        }
        return me;
    },

    /**
     * Hides this button's menu (if it has one)
     */
    hideMenu: function() {
        if (this.hasVisibleMenu()) {
            this.menu.hide();
        }
        return this;
    },

    /**
     * Returns true if the button has a menu and it is visible
     * @return {Boolean}
     */
    hasVisibleMenu: function() {
        var menu = this.menu;
        return menu && menu.rendered && menu.isVisible();
    },

    // @private
    onRepeatClick: function(repeat, e) {
        this.onClick(e);
    },

    // @private
    onClick: function(e) {
        var me = this;
        if (me.preventDefault || (me.disabled && me.getHref()) && e) {
            e.preventDefault();
        }

        // Can be triggered by ENTER or SPACE keydown events which set the button property.
        // Only veto event handling if it's a mouse event with an alternative button.
        if (e.type !== 'keydown' && e.button !== 0) {
            return;
        }
        if (!me.disabled) {
            me.doToggle();
            me.maybeShowMenu();
            me.fireHandler(e);
        }
    },

    fireHandler: function(e) {
        var me = this,
            handler = me.handler;

        if (me.fireEvent('click', me, e) !== false) {
            if (handler) {
                handler.call(me.scope || me, me, e);
            }
        }
    },

    doToggle: function() {
        var me = this;    
        if (me.enableToggle && (me.allowDepress !== false || !me.pressed)) {
            me.toggle();
        }
    },

    /**
     * @private mouseover handler called when a mouseover event occurs anywhere within the encapsulating element.
     * The targets are interrogated to see what is being entered from where.
     * @param e
     */
    onMouseOver: function(e) {
        var me = this;
        if (!me.disabled && !e.within(me.el, true, true)) {
            me.onMouseEnter(e);
        }
    },

    /**
     * @private
     * mouseout handler called when a mouseout event occurs anywhere within the encapsulating element -
     * or the mouse leaves the encapsulating element.
     * The targets are interrogated to see what is being exited to where.
     * @param e
     */
    onMouseOut: function(e) {
        var me = this;
        if (!e.within(me.el, true, true)) {
            if (me.overMenuTrigger) {
                me.onMenuTriggerOut(e);
            }
            me.onMouseLeave(e);
        }
    },

    /**
     * @private
     * mousemove handler called when the mouse moves anywhere within the encapsulating element.
     * The position is checked to determine if the mouse is entering or leaving the trigger area. Using
     * mousemove to check this is more resource intensive than we'd like, but it is necessary because
     * the trigger area does not line up exactly with sub-elements so we don't always get mouseover/out
     * events when needed. In the future we should consider making the trigger a separate element that
     * is absolutely positioned and sized over the trigger area.
     */
    onMouseMove: function(e) {
        var me = this,
            el = me.el,
            over = me.overMenuTrigger,
            overPosition, triggerRegion;

        if (me.split) {
            overPosition = (me.arrowAlign === 'right') ?
                e.getX() - me.getX() : e.getY() - el.getY();
            triggerRegion = me.getTriggerRegion();

            if (overPosition > triggerRegion.begin && overPosition < triggerRegion.end) {
                if (!over) {
                    me.onMenuTriggerOver(e);
                }
            } else {
                if (over) {
                    me.onMenuTriggerOut(e);
                }
            }
        }
    },

    /**
     * @private
     * Returns an object containing `begin` and `end` properties that indicate the 
     * left/right bounds of a right trigger or the top/bottom bounds of a bottom trigger.
     * @return {Object}
     */
    getTriggerRegion: function() {
        var me = this,
            region = me._triggerRegion,
            triggerSize = me.getTriggerSize(),
            btnSize = me.arrowAlign === 'right' ? me.getWidth() : me.getHeight();

        region.begin = btnSize - triggerSize;
        region.end = btnSize;
        return region;
    },

    /**
     * @private
     * Measures the size of the trigger area for menu and split buttons. Will be a width for
     * a right-aligned trigger and a height for a bottom-aligned trigger. Cached after first measurement.
     */
    getTriggerSize: function() {
        var me = this,
            size = me.triggerSize,
            side, sideFirstLetter;

        if (size == null) { // Same as (size === null || size === undefined)
            side = me.arrowAlign;
            sideFirstLetter = side.charAt(0);
            size = me.triggerSize = me.el.getFrameWidth(sideFirstLetter) + me.getBtnWrapFrameWidth(sideFirstLetter)
            if (me.frameSize) {
                size = me.triggerSize += me.frameSize[side];
            }
        }
        return size;
    },

    /**
     * @private
     */
    getBtnWrapFrameWidth: function(side) {
        return this.btnWrap.getFrameWidth(side);
    },

    addOverCls: function() {
        if (!this.disabled) {
            this.addClsWithUI(this.overCls);
        }
    },
    removeOverCls: function() {
        this.removeClsWithUI(this.overCls);
    },

    /**
     * @private
     * virtual mouseenter handler called when it is detected that the mouseout event
     * signified the mouse entering the encapsulating element.
     * @param e
     */
    onMouseEnter: function(e) {
        // overCls is handled by AbstractComponent
        this.fireEvent('mouseover', this, e);
    },

    /**
     * @private
     * virtual mouseleave handler called when it is detected that the mouseover event
     * signified the mouse entering the encapsulating element.
     * @param e
     */
    onMouseLeave: function(e) {
        // overCls is handled by AbstractComponent
        this.fireEvent('mouseout', this, e);
    },

    /**
     * @private
     * virtual mouseenter handler called when it is detected that the mouseover event
     * signified the mouse entering the arrow area of the button - the `<em>`.
     * @param e
     */
    onMenuTriggerOver: function(e) {
        var me = this,
            arrowTip = me.arrowTooltip;

        me.overMenuTrigger = true;
        // We don't have a separate arrow element, so we only add the tip attribute if
        // we're over that part of the button
        if (me.split && arrowTip) {
            me.btnWrap.dom.setAttribute(me.getTipAttr(), arrowTip);
        }
        me.fireEvent('menutriggerover', me, me.menu, e);
    },

    /**
     * @private
     * virtual mouseleave handler called when it is detected that the mouseout event
     * signified the mouse leaving the arrow area of the button - the `<em>`.
     * @param e
     */
    onMenuTriggerOut: function(e) {
        var me = this;
        delete me.overMenuTrigger;
        // See onMenuTriggerOver
        if (me.split && me.arrowTooltip) {
            me.btnWrap.dom.setAttribute(me.getTipAttr(), '');
        }
        me.fireEvent('menutriggerout', me, me.menu, e);
    },

    // inherit docs
    enable: function(silent) {
        var me = this;

        me.callParent(arguments);

        me.removeClsWithUI('disabled');
        if (me.rendered) {
            me.el.dom.setAttribute('tabIndex', me.tabIndex);
        }

        return me;
    },

    // inherit docs
    disable: function(silent) {
        var me = this;

        me.callParent(arguments);

        me.addClsWithUI('disabled');
        me.removeClsWithUI(me.overCls);
        if (me.rendered) {
            me.el.dom.removeAttribute('tabIndex');
        }

        // IE renders disabled text by layering gray text on top of white text, offset by 1 pixel. Normally this is fine
        // but in some circumstances (such as using formBind) it gets confused and renders them side by side instead.
        if (me.btnInnerEl && Ext.isIE7m) {
            me.btnInnerEl.repaint();
        }

        return me;
    },

    /**
     * Method to change the scale of the button. See {@link #scale} for allowed configurations.
     * @param {String} scale The scale to change to.
     */
    setScale: function(scale) {
        var me = this,
            ui = me.ui.replace('-' + me.scale, '');

        //check if it is an allowed scale
        if (!Ext.Array.contains(me.allowedScales, scale)) {
            throw('#setScale: scale must be an allowed scale (' + me.allowedScales.join(', ') + ')');
        }

        me.scale = scale;
        me.setUI(ui);
    },

    // inherit docs
    setUI: function(ui) {
        var me = this;

        //we need to append the scale to the UI, if not already done
        if (me.scale && !ui.match(me.scale)) {
            ui = ui + '-' + me.scale;
        }

        me.callParent([ui]);

        // Set all the state classNames, as they need to include the UI
        // me.disabledCls += ' ' + me.baseCls + '-' + me.ui + '-disabled';
    },


    // @private
    onMouseDown: function(e) {
        var me = this;

        if (Ext.isIE) {
            // In IE the use of unselectable on the button's elements causes the element
            // to not receive focus, even when it is directly clicked.
            me.getFocusEl().focus();
        }

        if (!me.disabled && e.button === 0) {
            Ext.button.Manager.onButtonMousedown(me, e);
            me.addClsWithUI(me.pressedCls);
        }
    },
    // @private
    onMouseUp: function(e) {
        var me = this;
        if (e.button === 0) {
            if (!me.pressed) {
                me.removeClsWithUI(me.pressedCls);
            }
        }
    },
    // @private
    onMenuShow: function(e) {
        var me = this;
        me.ignoreNextClick = 0;
        me.addClsWithUI(me.menuActiveCls);
        me.fireEvent('menushow', me, me.menu);
    },

    // @private
    onMenuHide: function(e) {
        var me = this;
        me.removeClsWithUI(me.menuActiveCls);
        me.ignoreNextClick = Ext.defer(me.restoreClick, 250, me);
        me.fireEvent('menuhide', me, me.menu);
        me.focus();
    },

    // @private
    restoreClick: function() {
        this.ignoreNextClick = 0;
    },

    // @private
    onDownKey: function(k, e) {
        var me = this;

        if (me.menu && !me.disabled) {
            me.showMenu();
            e.stopEvent();
            return false;
        }
    }
});
