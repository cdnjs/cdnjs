/**
 * Simple header class which is used for on {@link Ext.panel.Panel} and {@link Ext.window.Window}.
 */
Ext.define('Ext.panel.Header', {
    extend: 'Ext.panel.Bar',
    requires: [
        'Ext.panel.Title',
        'Ext.panel.Tool'
    ],
    xtype: 'header',

    /**
     * @property {Boolean} isHeader
     * `true` in this class to identify an object as an instantiated Header, or subclass thereof.
     */
    isHeader: true,

    defaultType: 'tool',
    indicateDrag: false,
    weight: -1,
    shrinkWrap: 3,

    // For performance reasons we give the following configs their default values on
    // the class body.  This prevents the updaters from running on initialization in the
    // default configuration scenario
    iconAlign: 'left',
    titleAlign: 'left',
    titlePosition: 0,
    titleRotation: 'default',

    beforeRenderConfig: {
        /**
         * @cfg {Number/String} glyph
         * A numeric unicode character code to use as the icon for the panel header. The
         * default font-family for glyphs can be set globally using
         * {@link Ext#setGlyphFontFamily Ext.setGlyphFontFamily()}. Alternatively, this
         * config option accepts a string with the charCode and font-family separated by the
         * `@` symbol. For example '65@My Font Family'.
         */
        glyph: null,

        /**
         * @cfg {String} icon
         * Path to image for an icon.
         *
         * There are no default icons that come with Ext JS.
         */
        icon: null,

        /**
         * @cfg {String} iconCls
         * CSS class for an icon.
         *
         * There are no default icon classes that come with Ext JS.
         */
        iconCls: null,

        /**
         * @cfg {'top'/'right'/'bottom'/'left'} [iconAlign='left']
         * The side of the title to render the icon.
         */
        iconAlign: null,

        /**
         * @cfg {String/Ext.panel.Title}
         * The title text or config object for the {@link Ext.panel.Title Title} component.
         */
        title: {
            $value: {
                ariaRole: 'presentation',
                focusable: false,
                xtype: 'title',
                flex: 1
            },
            merge: function(newValue, oldValue) {
                if (typeof newValue == 'string') {
                    newValue = {
                        text: newValue
                    };
                }

                return Ext.merge(oldValue ? Ext.Object.chain(oldValue) : {}, newValue);
            }
        },

        /**
         * @cfg {String} [titleAlign='left']
         * The alignment of the title text.
         */
        titleAlign: null,

        /**
         * @cfg {Number} [titlePosition=0]
         * The ordinal position among the header items (tools and other components specified using the {@link #cfg-items} config)
         * at which the title component is inserted. See {@link Ext.panel.Panel#cfg-header Panel's header config}.
         *
         * If not specified, the title is inserted after any {@link #cfg-items}, but *before* any {@link Ext.panel.Panel#tools}.
         *
         * Note that if an {@link #icon} or {@link #iconCls} has been configured, then the icon component will be the
         * first item before all specified tools or {@link #cfg-items}. This configuration does not include the icon.
         */
        titlePosition: null,
        
        /**
         * @cfg {'default'/0/1/2} [titleRotation='default']
         * The rotation of the header's title text.  Can be one of the following values:
         *
         * - `'default'` - use the default rotation, depending on the dock position of the header
         * - `0` - no rotation
         * - `1` - rotate 90deg clockwise
         * - `2` - rotate 90deg counter-clockwise
         *
         * The default behavior of this config depends on the dock position of the header:
         *
         * - `'top'` or `'bottom'` - `0`
         * - `'right'` - `1`
         * - `'left'` - `1`
         */
        titleRotation: null
    },

    // a class for styling that is shared between panel and window headers
    headerCls: Ext.baseCSSPrefix + 'header',

    /**
     * @event click
     * Fires when the header is clicked. This event will not be fired
     * if the click was on a {@link Ext.panel.Tool}
     * @param {Ext.panel.Header} this
     * @param {Ext.event.Event} e
     */

    /**
     * @event dblclick
     * Fires when the header is double clicked. This event will not
     * be fired if the click was on a {@link Ext.panel.Tool}
     * @param {Ext.panel.Header} this
     * @param {Ext.event.Event} e
     */

    initComponent: function() {
        var me = this,
            items = me.items,
            itemPosition = me.itemPosition,
            cls = [me.headerCls];

        me.tools = me.tools || [];
        me.items = items = (items ? items.slice() : []);

        if (itemPosition !== undefined) {
            me._userItems = items.slice();
            me.items = items = [];
        }

        me.indicateDragCls = me.headerCls + '-draggable';
        if (me.indicateDrag) {
            cls.push(me.indicateDragCls);
        }

        me.addCls(cls);

        me.syncNoBorderCls();

        // Add Tools
        Ext.Array.push(items, me.tools);
        // Clear the tools so we can have only the instances. Intentional mutation of passed in array
        // Owning code in Panel uses this array as its public tools property.
        me.tools.length = 0;
        me.callParent();

        me.on({
            dblclick: me.onDblClick,
            click: me.onClick,
            element: 'el',
            scope: me
        });
    },

    /**
     * Add a tool to the header
     * @param {Object} tool
     */
    addTool: function(tool) {
        // Even though the defaultType is tool, it may be changed,
        // so let's be safe and forcibly specify tool
        this.add(Ext.ComponentManager.create(tool, 'tool'));
    },

    afterLayout: function() {
        var me = this,
            frameBR, frameTR, frameTL, xPos;

        if (me.vertical) {
            frameTR = me.frameTR;
            if (frameTR) {
                // The corners sprite currently requires knowledge of the vertical header's
                // width to correctly set the background position of the bottom right corner.
                // TODO: rearrange the sprite so that this can be done with pure css.
                frameBR = me.frameBR;
                frameTL = me.frameTL;
                xPos = (me.getWidth() - frameTR.getPadding('r') -
                    ((frameTL) ? frameTL.getPadding('l') : me.el.getBorderWidth('l'))) + 'px';
                frameBR.setStyle('background-position-x', xPos);
                frameTR.setStyle('background-position-x', xPos);
            }
        }
        this.callParent();
    },

    applyTitle: function(title, oldTitle) {
        var me = this,
            isString, configHasRotation;

        title = title || '';

        if (typeof title === 'string') {
            title = {
                text: title
            };
        }

        if (oldTitle) {
            // several title configs can trigger layouts, so suspend before setting
            // configs in bulk
            Ext.suspendLayouts();
            oldTitle.setConfig(title);
            Ext.resumeLayouts(true);
            title = oldTitle;
        } else {
            title.ui = me.ui;
            title.headerRole = me.headerRole;
            configHasRotation = ('rotation' in title);

            title = new Ext.panel.Title(title);
            
            // avoid calling the title's rotation updater on initial startup in the default scenario
            if (!configHasRotation && me.vertical && me.titleRotation === 'default') {
                title.rotation = 1;
            }
        }

        return title;
    },

    applyTitlePosition: function(position) {
        var max = this.items.getCount();

        if (this._titleInItems) {
            --max;
        }
        return Math.max(Math.min(position, max), 0);
    },

    beforeLayout: function () {
        this.callParent();
        this.syncBeforeAfterTitleClasses();
    },

    beforeRender: function() {
        var me = this,
            itemPosition = me.itemPosition;

        me.protoEl.unselectable();
        me.callParent();

        if (itemPosition !== undefined) {
            me.insert(itemPosition, me._userItems);
        }
    },

    /**
     * Gets the tools for this header.
     * @return {Ext.panel.Tool[]} The tools
     */
    getTools: function(){
        return this.tools.slice();
    },

    onAdd: function(component, index) {
        var tools = this.tools;
        this.callParent([component, index]);
        if (component.isTool) {
            tools.push(component);
            tools[component.type] = component;
        }
    },

    onAdded: function(container, pos, instanced) {
        this.syncNoBorderCls();
        this.callParent([container, pos, instanced]);
    },

    onRemoved: function(container, pos, instanced) {
        this.syncNoBorderCls();
        this.callParent([container, pos, instanced]);
    },

    setDock: function(dock) {
        var me = this,
            title = me.getTitle(),
            rotation = me.getTitleRotation(),
            titleRotation = title.getRotation();

        Ext.suspendLayouts();

        me.callParent([dock]);

        if (rotation === 'default') {
            rotation = (me.vertical ? 1 : 0);

            if (rotation !== titleRotation) {
                title.setRotation(rotation);
            }
            
            if (me.rendered) {
                // remove margins set on items by box layout last time around.
                // TODO: this will no longer be needed when EXTJS-13359 is fixed
                me.resetItemMargins();
            }
        }

        Ext.resumeLayouts(true);
    },

    updateGlyph: function(glyph) {
        this.getTitle().setGlyph(glyph);
    },

    updateIcon: function(icon) {
        this.getTitle().setIcon(icon);
    },

    updateIconAlign: function(align, oldAlign) {
        this.getTitle().setIconAlign(align);
    },

    updateIconCls: function(cls) {
        this.getTitle().setIconCls(cls);
    },

    updateTitle: function(title, oldTitle) {
        if (!oldTitle) {
            this.insert(this.getTitlePosition(), title);
            this._titleInItems = true;
        }
        // for backward compat with 4.x, set titleCmp property
        this.titleCmp = title;
    },

    updateTitleAlign: function(align, oldAlign) {
        this.getTitle().setTextAlign(align);
    },

    updateTitlePosition: function(position) {
        this.insert(position, this.getTitle());
    },

    updateTitleRotation: function(rotation) {
        if (rotation === 'default') {
            rotation = (this.vertical ? 1 : 0);
        }
        this.getTitle().setRotation(rotation);
    },

    privates: {
        fireClickEvent: function(type, e){
            var toolCls = '.' + Ext.panel.Tool.prototype.baseCls;
            if (!e.getTarget(toolCls)) {
                this.fireEvent(type, this, e);
            }
        },

        getFocusEl: function() {
            return this.el;
        },

        getFramingInfoCls: function(){
            var me = this,
                cls = me.callParent(),
                owner = me.ownerCt;

            if (!me.expanding && owner && (owner.collapsed || me.isCollapsedExpander)) {
                cls += '-' + owner.collapsedCls;
            }
            return cls + '-' + me.dock;
        },

        onClick: function(e) {
            this.fireClickEvent('click', e);
        },

        onDblClick: function(e){
            this.fireClickEvent('dblclick', e);
        },

        syncBeforeAfterTitleClasses: function(force) {
            var me = this,
                items = me.items,
                childItems = items.items,
                titlePosition = me.getTitlePosition(),
                itemCount = childItems.length,
                itemGeneration = items.generation,
                syncGen = me.syncBeforeAfterGen,
                afterCls, beforeCls, i, item;

            if (!force && (syncGen === itemGeneration)) {
                return;
            }
            me.syncBeforeAfterGen = itemGeneration;

            for (i = 0; i < itemCount; ++i) {
                item = childItems[i];

                afterCls  = item.afterTitleCls  || (item.afterTitleCls  = item.baseCls + '-after-title');
                beforeCls = item.beforeTitleCls || (item.beforeTitleCls = item.baseCls + '-before-title');

                if (!me.title || i < titlePosition) {
                    if (syncGen) {
                        item.removeCls(afterCls);
                    } // else first time we won't need to remove anything...
                    item.addCls(beforeCls);
                } else if (i > titlePosition) {
                    if (syncGen) {
                        item.removeCls(beforeCls);
                    }
                    item.addCls(afterCls);
                }
            }
        },

        syncNoBorderCls: function() {
            var me = this,
                ownerCt = this.ownerCt,
                noBorderCls = me.headerCls + '-noborder';

            // test for border === false is needed because undefined is the same as true
            if (ownerCt ? (ownerCt.border === false && !ownerCt.frame) : me.border === false) {
                me.addCls(noBorderCls);
            } else {
                me.removeCls(noBorderCls);
            }
        }
    } // private
});
