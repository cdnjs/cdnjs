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
 * Provides a lightweight HTML Editor component. Some toolbar features are not supported by Safari and will be
 * automatically hidden when needed. These are noted in the config options where appropriate.
 *
 * The editor's toolbar buttons have tooltips defined in the {@link #buttonTips} property, but they are not
 * enabled by default unless the global {@link Ext.tip.QuickTipManager} singleton is
 * {@link Ext.tip.QuickTipManager#init initialized}.
 *
 * An Editor is a sensitive component that can't be used in all spots standard fields can be used. Putting an
 * Editor within any element that has display set to 'none' can cause problems in Safari and Firefox due to their
 * default iframe reloading bugs.
 *
 * # Example usage
 *
 * Simple example rendered with default options:
 *
 *     @example
 *     Ext.tip.QuickTipManager.init();  // enable tooltips
 *     Ext.create('Ext.form.HtmlEditor', {
 *         width: 580,
 *         height: 250,
 *         renderTo: Ext.getBody()
 *     });
 *
 * Passed via xtype into a container and with custom options:
 *
 *     @example
 *     Ext.tip.QuickTipManager.init();  // enable tooltips
 *     new Ext.panel.Panel({
 *         title: 'HTML Editor',
 *         renderTo: Ext.getBody(),
 *         width: 550,
 *         height: 250,
 *         frame: true,
 *         layout: 'fit',
 *         items: {
 *             xtype: 'htmleditor',
 *             enableColors: false,
 *             enableAlignments: false
 *         }
 *     });
 *     
 * # Reflow issues
 * 
 * In some browsers, a layout reflow will cause the underlying editor iframe to be reset. This
 * is most commonly seen when using the editor in collapsed panels with animation. In these cases
 * it is best to avoid animation. More information can be found here: https://bugzilla.mozilla.org/show_bug.cgi?id=90268 
 */
Ext.define('Ext.form.field.HtmlEditor', {
    extend: 'Ext.form.FieldContainer',
    mixins: {
        field: 'Ext.form.field.Field'
    },
    alias: 'widget.htmleditor',
    alternateClassName: 'Ext.form.HtmlEditor',
    requires: [
        'Ext.tip.QuickTipManager',
        'Ext.picker.Color',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Item',
        'Ext.toolbar.Toolbar',
        'Ext.util.Format',
        'Ext.layout.component.field.HtmlEditor'
    ],
    
    componentLayout: 'htmleditor',

    componentTpl: [
        '{beforeTextAreaTpl}',
        '<textarea id="{id}-textareaEl" name="{name}" tabIndex="-1" {inputAttrTpl}',
                 ' class="{textareaCls}" autocomplete="off">',
            '{[Ext.util.Format.htmlEncode(values.value)]}',
        '</textarea>',
        '{afterTextAreaTpl}',
        '{beforeIFrameTpl}',
        '<iframe id="{id}-iframeEl" name="{iframeName}" frameBorder="0" {iframeAttrTpl}',
               ' src="{iframeSrc}" class="{iframeCls}"></iframe>',
        '{afterIFrameTpl}',
        {
            disableFormats: true
        }
    ],
    
    stretchInputElFixed: true,

    subTplInsertions: [
        /**
         * @cfg {String/Array/Ext.XTemplate} beforeTextAreaTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * before the textarea element. If an `XTemplate` is used, the component's
         * {@link Ext.form.field.Base#getSubTplData subTpl data} serves as the context.
         */
        'beforeTextAreaTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} afterTextAreaTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * after the textarea element. If an `XTemplate` is used, the component's
         * {@link Ext.form.field.Base#getSubTplData subTpl data} serves as the context.
         */
        'afterTextAreaTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} beforeIFrameTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * before the iframe element. If an `XTemplate` is used, the component's
         * {@link Ext.form.field.Base#getSubTplData subTpl data} serves as the context.
         */
        'beforeIFrameTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} afterIFrameTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * after the iframe element. If an `XTemplate` is used, the component's
         * {@link Ext.form.field.Base#getSubTplData subTpl data} serves as the context.
         */
        'afterIFrameTpl',

        /**
         * @cfg {String/Array/Ext.XTemplate} iframeAttrTpl
         * An optional string or `XTemplate` configuration to insert in the field markup
         * inside the iframe element (as attributes). If an `XTemplate` is used, the component's
         * {@link Ext.form.field.Base#getSubTplData subTpl data} serves as the context.
         */
        'iframeAttrTpl',

        // inherited
        'inputAttrTpl'
    ],

    /**
     * @cfg {Boolean} enableFormat
     * Enable the bold, italic and underline buttons
     */
    enableFormat: true,
    /**
     * @cfg {Boolean} enableFontSize
     * Enable the increase/decrease font size buttons
     */
    enableFontSize: true,
    /**
     * @cfg {Boolean} enableColors
     * Enable the fore/highlight color buttons
     */
    enableColors: true,
    /**
     * @cfg {Boolean} enableAlignments
     * Enable the left, center, right alignment buttons
     */
    enableAlignments: true,
    /**
     * @cfg {Boolean} enableLists
     * Enable the bullet and numbered list buttons. Not available in Safari 2.
     */
    enableLists: true,
    /**
     * @cfg {Boolean} enableSourceEdit
     * Enable the switch to source edit button. Not available in Safari 2.
     */
    enableSourceEdit: true,
    /**
     * @cfg {Boolean} enableLinks
     * Enable the create link button. Not available in Safari 2.
     */
    enableLinks: true,
    /**
     * @cfg {Boolean} enableFont
     * Enable font selection. Not available in Safari 2.
     */
    enableFont: true,
    //<locale>
    /**
     * @cfg {String} createLinkText
     * The default text for the create link prompt
     */
    createLinkText: 'Please enter the URL for the link:',
    //</locale>
    /**
     * @cfg {String} [defaultLinkValue='http://']
     * The default value for the create link prompt
     */
    defaultLinkValue: 'http:/'+'/',
    /**
     * @cfg {String[]} fontFamilies
     * An array of available font families
     */
    fontFamilies: [
        'Arial',
        'Courier New',
        'Tahoma',
        'Times New Roman',
        'Verdana'
    ],
    /**
     * @cfg {String} defaultValue
     * A default value to be put into the editor to resolve focus issues.
     *
     * Defaults to (Non-breaking space) in Opera and IE6,
     * (Zero-width space) in all other browsers.
     */
    defaultValue: (Ext.isOpera || Ext.isIE6) ? '&#160;' : '&#8203;',

    // private
    extraFieldBodyCls: Ext.baseCSSPrefix + 'html-editor-wrap',

    /**
     * @cfg {String} defaultButtonUI
     * A default {@link Ext.Component#ui ui} to use for the HtmlEditor's toolbar
     * {@link Ext.button.Button Buttons}
     */

    // @private
    initialized: false,
    // @private
    activated: false,
    // @private
    sourceEditMode: false,
    // @private
    iframePad:3,
    // @private
    hideMode:'offsets',

    maskOnDisable: true,

    containerElCls: Ext.baseCSSPrefix + 'html-editor-container',

    // @private
    initComponent: function(){
        var me = this;

        me.addEvents(
            /**
             * @event initialize
             * Fires when the editor is fully initialized (including the iframe)
             * @param {Ext.form.field.HtmlEditor} this
             */
            'initialize',
            /**
             * @event activate
             * Fires when the editor is first receives the focus. Any insertion must wait until after this event.
             * @param {Ext.form.field.HtmlEditor} this
             */
            'activate',
             /**
             * @event beforesync
             * Fires before the textarea is updated with content from the editor iframe. Return false to cancel the
             * sync.
             * @param {Ext.form.field.HtmlEditor} this
             * @param {String} html
             */
            'beforesync',
             /**
             * @event beforepush
             * Fires before the iframe editor is updated with content from the textarea. Return false to cancel the
             * push.
             * @param {Ext.form.field.HtmlEditor} this
             * @param {String} html
             */
            'beforepush',
             /**
             * @event sync
             * Fires when the textarea is updated with content from the editor iframe.
             * @param {Ext.form.field.HtmlEditor} this
             * @param {String} html
             */
            'sync',
             /**
             * @event push
             * Fires when the iframe editor is updated with content from the textarea.
             * @param {Ext.form.field.HtmlEditor} this
             * @param {String} html
             */
            'push',
             /**
             * @event editmodechange
             * Fires when the editor switches edit modes
             * @param {Ext.form.field.HtmlEditor} this
             * @param {Boolean} sourceEdit True if source edit, false if standard editing.
             */
            'editmodechange'
        );

        me.items = [me.createToolbar(), me.createInputCmp()];

        me.layout = {
            type: 'vbox',
            align: 'stretch'
        };

        me.callParent(arguments);
        me.initField();
    },
    
    createInputCmp: function(){
        this.inputCmp = Ext.widget(this.getInputCmpCfg());
        return this.inputCmp;
    },
    
    getInputCmpCfg: function(){
        var me = this,
            id = me.id + '-inputCmp',
            data = {
                id          : id,
                name        : me.name,
                textareaCls : Ext.baseCSSPrefix + 'hidden',
                value       : me.value,
                iframeName  : Ext.id(),
                iframeSrc   : Ext.SSL_SECURE_URL,
                iframeCls   : Ext.baseCSSPrefix + 'htmleditor-iframe'
            };
            
        me.getInsertionRenderData(data, me.subTplInsertions);
            
        return {
            flex: 1,
            xtype: 'component',
            tpl: me.getTpl('componentTpl'),
            childEls: ['iframeEl', 'textareaEl'],
            id: id, 
            cls: Ext.baseCSSPrefix + 'html-editor-input',
            data: data 
        };    
    },

    /*
     * Called when the editor creates its toolbar. Override this method if you need to
     * add custom toolbar buttons.
     * @param {Ext.form.field.HtmlEditor} editor
     * @protected
     */
    createToolbar: function(){
        this.toolbar = Ext.widget(this.getToolbarCfg());
        return this.toolbar;
    },
    
    getToolbarCfg: function(){
        var me = this,
            items = [], i,
            tipsEnabled = Ext.quickTipsActive && Ext.tip.QuickTipManager.isEnabled(),
            baseCSSPrefix = Ext.baseCSSPrefix,
            fontSelectItem, undef;

        function btn(id, toggle, handler){
            return {
                itemId: id,
                cls: baseCSSPrefix + 'btn-icon',
                iconCls: baseCSSPrefix + 'edit-'+id,
                enableToggle:toggle !== false,
                scope: me,
                handler:handler||me.relayBtnCmd,
                clickEvent: 'mousedown',
                tooltip: tipsEnabled ? me.buttonTips[id] || undef : undef,
                overflowText: me.buttonTips[id].title || undef,
                tabIndex: -1
            };
        }


        if (me.enableFont && !Ext.isSafari2) {
            fontSelectItem = Ext.widget('component', {
                itemId: 'fontSelect',
                renderTpl: [
                    '<select id="{id}-selectEl" class="' + baseCSSPrefix + 'font-select">',
                    '</select>'
                ],
                childEls: ['selectEl'],
                afterRender: function() {
                    me.fontSelect = this.selectEl;
                    Ext.Component.prototype.afterRender.apply(this, arguments);
                },
                onDisable: function() {
                    var selectEl = this.selectEl;
                    if (selectEl) {
                        selectEl.dom.disabled = true;
                    }
                    Ext.Component.prototype.onDisable.apply(this, arguments);
                },
                onEnable: function() {
                    var selectEl = this.selectEl;
                    if (selectEl) {
                        selectEl.dom.disabled = false;
                    }
                    Ext.Component.prototype.onEnable.apply(this, arguments);
                },
                listeners: {
                    change: function() {
                        me.win.focus();
                        me.relayCmd('fontName', me.fontSelect.dom.value);
                        me.deferFocus();
                    },
                    element: 'selectEl'
                }
            });

            items.push(
                fontSelectItem,
                '-'
            );
        }

        if (me.enableFormat) {
            items.push(
                btn('bold'),
                btn('italic'),
                btn('underline')
            );
        }

        if (me.enableFontSize) {
            items.push(
                '-',
                btn('increasefontsize', false, me.adjustFont),
                btn('decreasefontsize', false, me.adjustFont)
            );
        }

        if (me.enableColors) {
            items.push(
                '-', {
                    itemId: 'forecolor',
                    cls: baseCSSPrefix + 'btn-icon',
                    iconCls: baseCSSPrefix + 'edit-forecolor',
                    overflowText: me.buttonTips.forecolor.title,
                    tooltip: tipsEnabled ? me.buttonTips.forecolor || undef : undef,
                    tabIndex:-1,
                    menu: Ext.widget('menu', {
                        plain: true,

                        items: [{
                            xtype: 'colorpicker',
                            allowReselect: true,
                            focus: Ext.emptyFn,
                            value: '000000',
                            plain: true,
                            clickEvent: 'mousedown',
                            handler: function(cp, color) {
                                me.relayCmd('forecolor', Ext.isWebKit || Ext.isIE ? '#'+color : color);
                                this.up('menu').hide();
                            }
                        }]
                    })
                }, {
                    itemId: 'backcolor',
                    cls: baseCSSPrefix + 'btn-icon',
                    iconCls: baseCSSPrefix + 'edit-backcolor',
                    overflowText: me.buttonTips.backcolor.title,
                    tooltip: tipsEnabled ? me.buttonTips.backcolor || undef : undef,
                    tabIndex:-1,
                    menu: Ext.widget('menu', {
                        plain: true,

                        items: [{
                            xtype: 'colorpicker',
                            focus: Ext.emptyFn,
                            value: 'FFFFFF',
                            plain: true,
                            allowReselect: true,
                            clickEvent: 'mousedown',
                            handler: function(cp, color) {
                                if (Ext.isGecko) {
                                    me.execCmd('useCSS', false);
                                    me.execCmd('hilitecolor', '#'+color);
                                    me.execCmd('useCSS', true);
                                    me.deferFocus();
                                } else {
                                    me.relayCmd(Ext.isOpera ? 'hilitecolor' : 'backcolor', Ext.isWebKit || Ext.isIE || Ext.isOpera ? '#'+color : color);
                                }
                                this.up('menu').hide();
                            }
                        }]
                    })
                }
            );
        }

        if (me.enableAlignments) {
            items.push(
                '-',
                btn('justifyleft'),
                btn('justifycenter'),
                btn('justifyright')
            );
        }

        if (!Ext.isSafari2) {
            if (me.enableLinks) {
                items.push(
                    '-',
                    btn('createlink', false, me.createLink)
                );
            }

            if (me.enableLists) {
                items.push(
                    '-',
                    btn('insertorderedlist'),
                    btn('insertunorderedlist')
                );
            }
            if (me.enableSourceEdit) {
                items.push(
                    '-',
                    btn('sourceedit', true, function(btn){
                        me.toggleSourceEdit(!me.sourceEditMode);
                    })
                );
            }
        }
        
        // Everything starts disabled.
        for (i = 0; i < items.length; i++) {
            if (items[i].itemId !== 'sourceedit') {
                items[i].disabled = true;
            }
        }

        // build the toolbar
        // Automatically rendered in AbstractComponent.afterRender's renderChildren call
        return {
            xtype: 'toolbar',
            defaultButtonUI: me.defaultButtonUI,
            cls: Ext.baseCSSPrefix + 'html-editor-tb',
            enableOverflow: true,
            items: items,

            // stop form submits
            listeners: {
                click: function(e){
                    e.preventDefault();
                },
                element: 'el'
            }
        }; 
    },
    
    getMaskTarget: function(){
        // Can't be the body td directly because of issues with absolute positioning
        // inside td's in FF
        return Ext.isGecko ? this.inputCmp.el : this.bodyEl;
    },

    /**
     * Sets the read only state of this field.
     * @param {Boolean} readOnly Whether the field should be read only.
     */
    setReadOnly: function(readOnly) {
        var me = this,
            textareaEl = me.textareaEl,
            iframeEl = me.iframeEl,
            body;

        me.readOnly = readOnly;

        if (textareaEl) {
            textareaEl.dom.readOnly = readOnly;
        }

        if (me.initialized) {
            body = me.getEditorBody();
            if (Ext.isIE) {
                // Hide the iframe while setting contentEditable so it doesn't grab focus
                iframeEl.setDisplayed(false);
                body.contentEditable = !readOnly;
                iframeEl.setDisplayed(true);
            } else {
                me.setDesignMode(!readOnly);
            }
            if (body) {
                body.style.cursor = readOnly ? 'default' : 'text';
            }
            me.disableItems(readOnly);
        }
    },

    /**
     * Called when the editor initializes the iframe with HTML contents. Override this method if you
     * want to change the initialization markup of the iframe (e.g. to add stylesheets).
     *
     * **Note:** IE8-Standards has unwanted scroller behavior, so the default meta tag forces IE7 compatibility.
     * Also note that forcing IE7 mode works when the page is loaded normally, but if you are using IE's Web
     * Developer Tools to manually set the document mode, that will take precedence and override what this
     * code sets by default. This can be confusing when developing, but is not a user-facing issue.
     * @protected
     */
    getDocMarkup: function() {
        var me = this,
            h = me.iframeEl.getHeight() - me.iframePad * 2,
            oldIE = Ext.isIE8m;

        // - IE9+ require a strict doctype otherwise text outside visible area can't be selected.
        // - Opera inserts <P> tags on Return key, so P margins must be removed to avoid double line-height.
        // - On browsers other than IE, the font is not inherited by the IFRAME so it must be specified.
        return Ext.String.format(
            (oldIE ? '' : '<!DOCTYPE html>')                        
            + '<html><head><style type="text/css">' 
            + (Ext.isOpera ? 'p{margin:0}' : '')
            + 'body{border:0;margin:0;padding:{0}px;direction:' + (me.rtl ? 'rtl;' : 'ltr;')
            + (oldIE ? Ext.emptyString : 'min-')
            + 'height:{1}px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;cursor:text;background-color:white;' 
            + (Ext.isIE ? '' : 'font-size:12px;font-family:{2}')
            + '}</style></head><body></body></html>'
            , me.iframePad, h, me.defaultFont);
    },

    // @private
    getEditorBody: function() {
        var doc = this.getDoc();
        return doc.body || doc.documentElement;
    },

    // @private
    getDoc: function() {
        return (!Ext.isIE && this.iframeEl.dom.contentDocument) || this.getWin().document;
    },

    // @private
    getWin: function() {
        return Ext.isIE ? this.iframeEl.dom.contentWindow : window.frames[this.iframeEl.dom.name];
    },
    
    initDefaultFont: function(){
        // It's not ideal to do this here since it's a write phase, but we need to know
        // what the font used in the textarea is so that we can setup the appropriate font
        // options in the select box. The select box will reflow once we populate it, so we want
        // to do so before we layout the first time.
        
        var me = this,
            selIdx = 0,
            fonts, font, select,
            option, i, len, lower;
        
        if (!me.defaultFont) {
            font = me.textareaEl.getStyle('font-family');
            font = Ext.String.capitalize(font.split(',')[0]);
            fonts = Ext.Array.clone(me.fontFamilies);
            Ext.Array.include(fonts, font);
            fonts.sort();
            me.defaultFont = font;
            
            select = me.down('#fontSelect').selectEl.dom;
            for (i = 0, len = fonts.length; i < len; ++i) {
                font = fonts[i];
                lower = font.toLowerCase();
                option = new Option(font, lower);
                if (font == me.defaultFont) {
                    selIdx = i;
                }
                option.style.fontFamily = lower;
                
                if (Ext.isIE) {
                    select.add(option);
                } else {
                    select.options.add(option); 
                }
            }
            // Old IE versions have a problem if we set the selected property
            // in the loop, so set it after.
            select.options[selIdx].selected = true;
        } 
    },
    
    isEqual: function(value1, value2){
        return this.isEqualAsString(value1, value2);
    },

    // @private
    afterRender: function() {
        var me = this,
            inputCmp = me.inputCmp;

        me.callParent(arguments);
          
        me.iframeEl = inputCmp.iframeEl;
        me.textareaEl = inputCmp.textareaEl;
        
        // The input element is interrogated by the layout to extract height when labelAlign is 'top'
        // It must be set, and then switched between the iframe and the textarea
        me.inputEl = me.iframeEl;

        if (me.enableFont) {        
            me.initDefaultFont();
        }

        // Start polling for when the iframe document is ready to be manipulated
        me.monitorTask = Ext.TaskManager.start({
            run: me.checkDesignMode,
            scope: me,
            interval: 100
        });
        me.relayCmd('fontName', me.defaultFont);
    },

    initFrameDoc: function() {
        var me = this,
            doc, task;

        Ext.TaskManager.stop(me.monitorTask);

        doc = me.getDoc();
        me.win = me.getWin();

        doc.open();
        doc.write(me.getDocMarkup());
        doc.close();

        task = { // must defer to wait for browser to be ready
            run: function() {
                var doc = me.getDoc();
                if (doc.body || doc.readyState === 'complete') {
                    Ext.TaskManager.stop(task);
                    me.setDesignMode(true);
                    Ext.defer(me.initEditor, 10, me);
                }
            },
            interval: 10,
            duration:10000,
            scope: me
        };
        Ext.TaskManager.start(task);
    },

    checkDesignMode: function() {
        var me = this,
            doc = me.getDoc();
        if (doc && (!doc.editorInitialized || me.getDesignMode() !== 'on')) {
            me.initFrameDoc();
        }
    },

    /**
     * @private
     * Sets current design mode. To enable, mode can be true or 'on', off otherwise
     */
    setDesignMode: function(mode) {
        var me = this,
            doc = me.getDoc();
        if (doc) {
            if (me.readOnly) {
                mode = false;
            }
            doc.designMode = (/on|true/i).test(String(mode).toLowerCase()) ?'on':'off';
        }
    },

    // @private
    getDesignMode: function() {
        var doc = this.getDoc();
        return !doc ? '' : String(doc.designMode).toLowerCase();
    },

    disableItems: function(disabled) {
        var items = this.getToolbar().items.items,
            i,
            iLen  = items.length,
            item;

        for (i = 0; i < iLen; i++) {
            item = items[i];

            if (item.getItemId() !== 'sourceedit') {
                item.setDisabled(disabled);
            }
        }
    },

    /**
     * Toggles the editor between standard and source edit mode.
     * @param {Boolean} [sourceEditMode] True for source edit, false for standard
     */
    toggleSourceEdit: function(sourceEditMode) {
        var me = this,
            iframe = me.iframeEl,
            textarea = me.textareaEl,
            hiddenCls = Ext.baseCSSPrefix + 'hidden',
            btn = me.getToolbar().getComponent('sourceedit');

        if (!Ext.isBoolean(sourceEditMode)) {
            sourceEditMode = !me.sourceEditMode;
        }
        me.sourceEditMode = sourceEditMode;

        if (btn.pressed !== sourceEditMode) {
            btn.toggle(sourceEditMode);
        }
        if (sourceEditMode) {
            me.disableItems(true);
            me.syncValue();
            iframe.addCls(hiddenCls);
            textarea.removeCls(hiddenCls);
            textarea.dom.removeAttribute('tabIndex');
            textarea.focus();
            me.inputEl = textarea;
        } else {
            if (me.initialized) {
                me.disableItems(me.readOnly);
            }
            me.pushValue();
            iframe.removeCls(hiddenCls);
            textarea.addCls(hiddenCls);
            textarea.dom.setAttribute('tabIndex', -1);
            me.deferFocus();
            me.inputEl = iframe;
        }
        me.fireEvent('editmodechange', me, sourceEditMode);
        me.updateLayout();
    },

    // @private used internally
    createLink: function() {
        var url = prompt(this.createLinkText, this.defaultLinkValue);
        if (url && url !== 'http:/'+'/') {
            this.relayCmd('createlink', url);
        }
    },

    clearInvalid: Ext.emptyFn,

    setValue: function(value) {
        var me = this,
            textarea = me.textareaEl,
            inputCmp = me.inputCmp;
            
        me.mixins.field.setValue.call(me, value);
        if (value === null || value === undefined) {
            value = '';
        }
        if (textarea) {
            textarea.dom.value = value;
        }
        me.pushValue();
        
        if (!me.rendered && me.inputCmp) {
            me.inputCmp.data.value = value;
        }
        
        return me;
    },

    /**
     * If you need/want custom HTML cleanup, this is the method you should override.
     * @param {String} html The HTML to be cleaned
     * @return {String} The cleaned HTML
     * @protected
     */
    cleanHtml: function(html) {
        html = String(html);
        if (Ext.isWebKit) { // strip safari nonsense
            html = html.replace(/\sclass="(?:Apple-style-span|Apple-tab-span|khtml-block-placeholder)"/gi, '');
        }

        /*
         * Neat little hack. Strips out all the non-digit characters from the default
         * value and compares it to the character code of the first character in the string
         * because it can cause encoding issues when posted to the server. We need the
         * parseInt here because charCodeAt will return a number.
         */
        if (html.charCodeAt(0) === parseInt(this.defaultValue.replace(/\D/g, ''), 10)) {
            html = html.substring(1);
        }
        
        return html;
    },

    /**
     * Syncs the contents of the editor iframe with the textarea.
     * @protected
     */
    syncValue: function(){
        var me = this,
            body, changed, html, bodyStyle, match, textElDom;

        if (me.initialized) {
            body = me.getEditorBody();
            html = body.innerHTML;
            textElDom = me.textareaEl.dom;
            
            if (Ext.isWebKit) {
                bodyStyle = body.getAttribute('style'); // Safari puts text-align styles on the body element!
                match = bodyStyle.match(/text-align:(.*?);/i);
                if (match && match[1]) {
                    html = '<div style="' + match[0] + '">' + html + '</div>';
                }
            }
            
            html = me.cleanHtml(html);
            
            if (me.fireEvent('beforesync', me, html) !== false) {
                // Gecko inserts single <br> tag when input is empty
                // and user toggles source mode. See https://sencha.jira.com/browse/EXTJSIV-8542
                if (Ext.isGecko && textElDom.value === '' && html === '<br>') {
                    html = '';
                }
                
                if (textElDom.value !== html) {
                    textElDom.value = html;
                    changed = true;
                }

                me.fireEvent('sync', me, html);

                if (changed) {
                    // we have to guard this to avoid infinite recursion because getValue
                    // calls this method...
                    me.checkChange();
                }
            }
        }
    },

    getValue: function() {
        var me = this,
            value;
        if (!me.sourceEditMode) {
            me.syncValue();
        }
        value = me.rendered ? me.textareaEl.dom.value : me.value;
        me.value = value;
        return value;
    },

    /**
     * Pushes the value of the textarea into the iframe editor.
     * @protected
     */
    pushValue: function() {
        var me = this,
            v;
        if(me.initialized){
            v = me.textareaEl.dom.value || '';
            if (!me.activated && v.length < 1) {
                v = me.defaultValue;
            }
            if (me.fireEvent('beforepush', me, v) !== false) {
                me.getEditorBody().innerHTML = v;
                if (Ext.isGecko) {
                    // Gecko hack, see: https://bugzilla.mozilla.org/show_bug.cgi?id=232791#c8
                    me.setDesignMode(false);  //toggle off first
                    me.setDesignMode(true);
                }
                me.fireEvent('push', me, v);
            }
        }
    },

    // @private
    deferFocus: function(){
         this.focus(false, true);
    },

    getFocusEl: function() {
        var me = this,
            win = me.win;
        return win && !me.sourceEditMode ? win : me.textareaEl;
    },

    focus: function(selectText, delay) {
        var me = this,
            value, focusEl;

        if (delay) {
            if (!me.focusTask) {
                me.focusTask = new Ext.util.DelayedTask(me.focus);
            }
            me.focusTask.delay(Ext.isNumber(delay) ? delay : 10, null, me, [selectText, false]);
        }
        else {
            if (selectText) {
                if (me.textareaEl && me.textareaEl.dom) {
                    value = me.textareaEl.dom.value;
                }
                if (value && value.length) {  // Make sure there is content before calling SelectAll, otherwise the caret disappears.
                    me.execCmd('selectall', true);
                }
            }
            focusEl = me.getFocusEl();
            if (focusEl && focusEl.focus) {
                focusEl.focus();
            }
        }
        return me;
    },

    // @private
    initEditor: function(){
        //Destroying the component during/before initEditor can cause issues.
        try {
            var me = this,
                dbody = me.getEditorBody(),
                ss = me.textareaEl.getStyles('font-size', 'font-family', 'background-image', 'background-repeat', 'background-color', 'color'),
                doc,
                fn;

            ss['background-attachment'] = 'fixed'; // w3c
            dbody.bgProperties = 'fixed'; // ie

            Ext.DomHelper.applyStyles(dbody, ss);

            doc = me.getDoc();

            if (doc) {
                try {
                    Ext.EventManager.removeAll(doc);
                } catch(e) {}
            }

            /*
             * We need to use createDelegate here, because when using buffer, the delayed task is added
             * as a property to the function. When the listener is removed, the task is deleted from the function.
             * Since onEditorEvent is shared on the prototype, if we have multiple html editors, the first time one of the editors
             * is destroyed, it causes the fn to be deleted from the prototype, which causes errors. Essentially, we're just anonymizing the function.
             */
            fn = Ext.Function.bind(me.onEditorEvent, me);
            Ext.EventManager.on(doc, {
                mousedown: fn,
                dblclick: fn,
                click: fn,
                keyup: fn,
                buffer:100
            });
            
            // These events need to be relayed from the inner document (where they stop
            // bubbling) up to the outer document. This has to be done at the DOM level so
            // the event reaches listeners on elements like the document body. The effected
            // mechanisms that depend on this bubbling behavior are listed to the right
            // of the event.
            fn = me.onRelayedEvent;
            Ext.EventManager.on(doc, {
                mousedown: fn, // menu dismisal (MenuManager) and Window onMouseDown (toFront)
                mousemove: fn, // window resize drag detection
                mouseup: fn,   // window resize termination
                click: fn,     // not sure, but just to be safe
                dblclick: fn,  // not sure again
                scope: me
            });
            
            if (Ext.isGecko) {
                Ext.EventManager.on(doc, 'keypress', me.applyCommand, me);
            }
            
            if (me.fixKeys) {
                Ext.EventManager.on(doc, 'keydown', me.fixKeys, me);
            }
            if (me.fixKeysAfter) {
                Ext.EventManager.on(doc, 'keyup', me.fixKeysAfter, me);
            }

            if (Ext.isIE9 && Ext.isStrict) {
                Ext.EventManager.on(doc.documentElement, 'focus', me.focus, me);
            }

            // In old IEs, clicking on a toolbar button shifts focus from iframe
            // and it loses selection. To avoid this, we save current selection
            // and restore it.
            if (Ext.isIE8m || (Ext.isIE9 && !Ext.isStrict)) {
                Ext.EventManager.on(doc, 'focusout', function() {
                    me.savedSelection = doc.selection.type !== 'None' ? doc.selection.createRange() : null;
                }, me);
                
                Ext.EventManager.on(doc, 'focusin', function() {
                    if (me.savedSelection) {
                        me.savedSelection.select();
                    }
                }, me);
            }
            
            // We need to be sure we remove all our events from the iframe on unload or we're going to LEAK!
            Ext.EventManager.onWindowUnload(me.beforeDestroy, me);
            doc.editorInitialized = true;

            me.initialized = true;
            me.pushValue();
            me.setReadOnly(me.readOnly);
            me.fireEvent('initialize', me);
        } catch(ex) {
            // ignore (why?)
        }
    },
    
    // @private
    beforeDestroy: function(){
        var me = this,
            monitorTask = me.monitorTask,
            doc, prop;

        if (monitorTask) {
            Ext.TaskManager.stop(monitorTask);
        }
        if (me.rendered) {
            Ext.EventManager.removeUnloadListener(me.beforeDestroy, me);
            try {
                doc = me.getDoc();
                if (doc) {
                    // removeAll() doesn't currently know how to handle iframe document,
                    // so for now we have to wrap it in an Ext.Element using Ext.fly,
                    // or else IE6/7 will leak big time when the page is refreshed.
                    // TODO: this may not be needed once we find a more permanent fix.
                    // see EXTJSIV-5891.
                    Ext.EventManager.removeAll(Ext.fly(doc));
                    for (prop in doc) {
                        if (doc.hasOwnProperty && doc.hasOwnProperty(prop)) {
                            delete doc[prop];
                        }
                    }
                }
            } catch(e) {
                // ignore (why?)
            }
            delete me.iframeEl;
            delete me.textareaEl;
            delete me.toolbar;
            delete me.inputCmp;
        }
        me.callParent();
    },

    // @private
    onRelayedEvent: function (event) {
        // relay event from the iframe's document to the document that owns the iframe...

        var iframeEl = this.iframeEl,

            // Get the left-based iframe position
            iframeXY = Ext.Element.getTrueXY(iframeEl),
            originalEventXY = event.getXY(),

            // Get the left-based XY position.
            // This is because the consumer of the injected event (Ext.EventManager) will
            // perform its own RTL normalization.
            eventXY = Ext.EventManager.getPageXY(event.browserEvent);

        // the event from the inner document has XY relative to that document's origin,
        // so adjust it to use the origin of the iframe in the outer document:
        event.xy = [iframeXY[0] + eventXY[0], iframeXY[1] + eventXY[1]];

        event.injectEvent(iframeEl); // blame the iframe for the event...

        event.xy = originalEventXY; // restore the original XY (just for safety)
    },

    // @private
    onFirstFocus: function(){
        var me = this,
            selection, range;
        me.activated = true;
        me.disableItems(me.readOnly);
        if (Ext.isGecko) { // prevent silly gecko errors
            me.win.focus();
            selection = me.win.getSelection();
            if (!selection.focusNode || selection.focusNode.nodeType !== 3) {
                range = selection.getRangeAt(0);
                range.selectNodeContents(me.getEditorBody());
                range.collapse(true);
                me.deferFocus();
            }
            try {
                me.execCmd('useCSS', true);
                me.execCmd('styleWithCSS', false);
            } catch(e) {
                // ignore (why?)
            }
        }
        me.fireEvent('activate', me);
    },

    // @private
    adjustFont: function(btn) {
        var adjust = btn.getItemId() === 'increasefontsize' ? 1 : -1,
            size = this.getDoc().queryCommandValue('FontSize') || '2',
            isPxSize = Ext.isString(size) && size.indexOf('px') !== -1,
            isSafari;
        size = parseInt(size, 10);
        if (isPxSize) {
            // Safari 3 values
            // 1 = 10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px
            if (size <= 10) {
                size = 1 + adjust;
            }
            else if (size <= 13) {
                size = 2 + adjust;
            }
            else if (size <= 16) {
                size = 3 + adjust;
            }
            else if (size <= 18) {
                size = 4 + adjust;
            }
            else if (size <= 24) {
                size = 5 + adjust;
            }
            else {
                size = 6 + adjust;
            }
            size = Ext.Number.constrain(size, 1, 6);
        } else {
            isSafari = Ext.isSafari;
            if (isSafari) { // safari
                adjust *= 2;
            }
            size = Math.max(1, size + adjust) + (isSafari ? 'px' : 0);
        }
        this.relayCmd('FontSize', size);
    },

    // @private
    onEditorEvent: function(e) {
        this.updateToolbar();
    },

    /**
     * Triggers a toolbar update by reading the markup state of the current selection in the editor.
     * @protected
     */
    updateToolbar: function() {
        var me = this,
            i, l, btns, doc, name, queriedName, fontSelect,
            toolbarSubmenus;

        if (me.readOnly) {
            return;
        }

        if (!me.activated) {
            me.onFirstFocus();
            return;
        }

        btns = me.getToolbar().items.map;
        doc = me.getDoc();

        if (me.enableFont && !Ext.isSafari2) {
            // When querying the fontName, Chrome may return an Array of font names
            // with those containing spaces being placed between single-quotes.
            queriedName = doc.queryCommandValue('fontName');
            name = (queriedName ? queriedName.split(",")[0].replace(/^'/,'').replace(/'$/,'') : me.defaultFont).toLowerCase();
            fontSelect = me.fontSelect.dom;
            if (name !== fontSelect.value || name != queriedName) {
                fontSelect.value = name;
            }
        }

        function updateButtons() {
            var state;
            
            for (i = 0, l = arguments.length, name; i < l; i++) {
                name  = arguments[i];
                
                // Firefox 18+ sometimes throws NS_ERROR_INVALID_POINTER exception
                // See https://sencha.jira.com/browse/EXTJSIV-9766
                try {
                    state = doc.queryCommandState(name);
                }
                catch (e) {
                    state = false;
                }
                
                btns[name].toggle(state);
            }
        }
        if(me.enableFormat){
            updateButtons('bold', 'italic', 'underline');
        }
        if(me.enableAlignments){
            updateButtons('justifyleft', 'justifycenter', 'justifyright');
        }
        if(!Ext.isSafari2 && me.enableLists){
            updateButtons('insertorderedlist', 'insertunorderedlist');
        }

        // Ensure any of our toolbar's owned menus are hidden.
        // The overflow menu must control itself.
        toolbarSubmenus = me.toolbar.query('menu');
        for (i = 0; i < toolbarSubmenus.length; i++) {
            toolbarSubmenus[i].hide();
        }
        me.syncValue();
    },

    // @private
    relayBtnCmd: function(btn) {
        this.relayCmd(btn.getItemId());
    },

    /**
     * Executes a Midas editor command on the editor document and performs necessary focus and toolbar updates.
     * **This should only be called after the editor is initialized.**
     * @param {String} cmd The Midas command
     * @param {String/Boolean} [value=null] The value to pass to the command
     */
    relayCmd: function(cmd, value) {
        Ext.defer(function() {
            var me = this;
            
            if (!this.isDestroyed) {
                me.win.focus();
                me.execCmd(cmd, value);
                me.updateToolbar();
            }
        }, 10, this);
    },

    /**
     * Executes a Midas editor command directly on the editor document. For visual commands, you should use
     * {@link #relayCmd} instead. **This should only be called after the editor is initialized.**
     * @param {String} cmd The Midas command
     * @param {String/Boolean} [value=null] The value to pass to the command
     */
    execCmd: function(cmd, value){
        var me = this,
            doc = me.getDoc();
        doc.execCommand(cmd, false, (value == undefined ? null : value));
        me.syncValue();
    },

    // @private
    applyCommand: function(e){
        if (e.ctrlKey) {
            var me = this,
                c = e.getCharCode(), cmd;
            if (c > 0) {
                c = String.fromCharCode(c);
                switch (c) {
                    case 'b':
                        cmd = 'bold';
                    break;
                    case 'i':
                        cmd = 'italic';
                    break;
                    case 'u':
                        cmd = 'underline';
                    break;
                }
                if (cmd) {
                    me.win.focus();
                    me.execCmd(cmd);
                    me.deferFocus();
                    e.preventDefault();
                }
            }
        }
    },

    /**
     * Inserts the passed text at the current cursor position.
     * __Note:__ the editor must be initialized and activated to insert text.
     * @param {String} text
     */
    insertAtCursor: function(text){
        var me = this,
            range;

        if (me.activated) {
            me.win.focus();
            if (Ext.isIE) {
                range = me.getDoc().selection.createRange();
                if (range) {
                    range.pasteHTML(text);
                    me.syncValue();
                    me.deferFocus();
                }
            }else{
                me.execCmd('InsertHTML', text);
                me.deferFocus();
            }
        }
    },

    // @private
    fixKeys: (function() { // load time branching for fastest keydown performance
        if (Ext.isIE) {
            return function(e){
                var me = this,
                    k = e.getKey(),
                    doc = me.getDoc(),
                    readOnly = me.readOnly,
                    range, target;

                if (k === e.TAB) {
                    e.stopEvent();
                    if (!readOnly) {
                        range = doc.selection.createRange();
                        if (range){
                            if (range.collapse) {
                                range.collapse(true);
                                range.pasteHTML('&#160;&#160;&#160;&#160;');
                            }
                            
                            me.deferFocus();
                        }
                    }
                }
                else if (k === e.ENTER) {
                    if (!readOnly) {
                        range = doc.selection.createRange();
                        if (range) {
                            target = range.parentElement();
                            if(!target || target.tagName.toLowerCase() !== 'li'){
                                e.stopEvent();
                                range.pasteHTML('<br />');
                                range.collapse(false);
                                range.select();
                            }
                        }
                    }
                }
            };
        }

        if (Ext.isOpera) {
            return function(e){
                var me = this,
                    k = e.getKey(),
                    readOnly = me.readOnly;
                if (k === e.TAB) {
                    e.stopEvent();
                    if (!readOnly) {
                        me.win.focus();
                        me.execCmd('InsertHTML','&#160;&#160;&#160;&#160;');
                        me.deferFocus();
                    }
                }
            };
        }

        return null; // not needed, so null
    }()),
    
    // @private
    fixKeysAfter: (function() {
        if (Ext.isIE) {
            return function(e) {
                var me = this,
                    k = e.getKey(),
                    doc = me.getDoc(),
                    readOnly = me.readOnly,
                    innerHTML;
                
                if (!readOnly && (k === e.BACKSPACE || k === e.DELETE)) {
                    innerHTML = doc.body.innerHTML;
                    
                    // If HtmlEditor had some input and user cleared it, IE inserts <p>&nbsp;</p>
                    // which makes an impression that there is still some text, and creeps
                    // into source mode when toggled. We don't want this.
                    //
                    // See https://sencha.jira.com/browse/EXTJSIV-8542
                    // 
                    // N.B. There is **small** chance that user could go to source mode,
                    // type '<p>&nbsp;</p>', switch back to visual mode, type something else
                    // and then clear it -- the code below would clear the <p> tag as well,
                    // which could be considered a bug. However I see no way to distinguish
                    // between offending markup being entered manually and generated by IE,
                    // so this can be considered a nasty corner case.
                    //
                    if (innerHTML === '<p>&nbsp;</p>' || innerHTML === '<P>&nbsp;</P>') {
                        doc.body.innerHTML = '';
                    }
                }
            }
        }
        
        return null;
    }()),

    /**
     * Returns the editor's toolbar. **This is only available after the editor has been rendered.**
     * @return {Ext.toolbar.Toolbar}
     */
    getToolbar: function(){
        return this.toolbar;
    },

    //<locale>
    /**
     * @property {Object} buttonTips
     * Object collection of toolbar tooltips for the buttons in the editor. The key is the command id associated with
     * that button and the value is a valid QuickTips object. For example:
     *
     *     {
     *         bold: {
     *             title: 'Bold (Ctrl+B)',
     *             text: 'Make the selected text bold.',
     *             cls: 'x-html-editor-tip'
     *         },
     *         italic: {
     *             title: 'Italic (Ctrl+I)',
     *             text: 'Make the selected text italic.',
     *             cls: 'x-html-editor-tip'
     *         }
     *         // ...
     *     }
     */
    buttonTips: {
        bold: {
            title: 'Bold (Ctrl+B)',
            text: 'Make the selected text bold.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        italic: {
            title: 'Italic (Ctrl+I)',
            text: 'Make the selected text italic.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        underline: {
            title: 'Underline (Ctrl+U)',
            text: 'Underline the selected text.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        increasefontsize: {
            title: 'Grow Text',
            text: 'Increase the font size.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        decreasefontsize: {
            title: 'Shrink Text',
            text: 'Decrease the font size.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        backcolor: {
            title: 'Text Highlight Color',
            text: 'Change the background color of the selected text.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        forecolor: {
            title: 'Font Color',
            text: 'Change the color of the selected text.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        justifyleft: {
            title: 'Align Text Left',
            text: 'Align text to the left.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        justifycenter: {
            title: 'Center Text',
            text: 'Center text in the editor.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        justifyright: {
            title: 'Align Text Right',
            text: 'Align text to the right.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        insertunorderedlist: {
            title: 'Bullet List',
            text: 'Start a bulleted list.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        insertorderedlist: {
            title: 'Numbered List',
            text: 'Start a numbered list.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        createlink: {
            title: 'Hyperlink',
            text: 'Make the selected text a hyperlink.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        sourceedit: {
            title: 'Source Edit',
            text: 'Switch to source editing mode.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        }
    }
    //</locale>

    // hide stuff that is not compatible
    /**
     * @event blur
     * @private
     */
    /**
     * @event focus
     * @private
     */
    /**
     * @event specialkey
     * @private
     */
    /**
     * @cfg {String} fieldCls
     * @private
     */
    /**
     * @cfg {String} focusCls
     * @private
     */
    /**
     * @cfg {String} autoCreate
     * @private
     */
    /**
     * @cfg {String} inputType
     * @private
     */
    /**
     * @cfg {String} invalidCls
     * @private
     */
    /**
     * @cfg {String} invalidText
     * @private
     */
    /**
     * @cfg {String} msgFx
     * @private
     */
    /**
     * @cfg {Boolean} allowDomMove
     * @private
     */
    /**
     * @cfg {String} applyTo
     * @private
     */
    /**
     * @cfg {String} readOnly
     * @private
     */
    /**
     * @cfg {String} tabIndex
     * @private
     */
    /**
     * @method validate
     * @private
     */
});
