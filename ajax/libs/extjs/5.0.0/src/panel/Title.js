/**
 * A basic title component for a Panel Header
 */
Ext.define('Ext.panel.Title', {
    extend: 'Ext.Component',
    xtype: 'title',

    isTitle: true,
    
    // layout system optimization.  Allows autocomponent layout to measure height without
    // having to first know the width.
    noWrap: true,

    // For performance reasons we give the following configs their default values on
    // the class body.  This prevents the updaters from running on initialization in the
    // default configuration scenario
    textAlign: 'left',
    iconAlign: 'left',
    rotation: 0,
    text: '&#160;',

    beforeRenderConfig: {
        /**
         * @cfg {'left'/'center'/'right'} [textAlign='left']
         * text alignment of the title
         */
        textAlign: null,

        /**
         * @cfg {String}
         * The title's text (can contain html tags/entities)
         */
        text: null,

        /**
         * @cfg {Number/String} glyph
         * A numeric unicode character code to use as the icon. The
         * default font-family for glyphs can be set globally using
         * {@link Ext#setGlyphFontFamily Ext.setGlyphFontFamily()}. Alternatively, this
         * config option accepts a string with the charCode and font-family separated by the
         * `@` symbol. For example '65@My Font Family'.
         */
        glyph: null,

        /**
         * @cfg {String} icon
         * Path to image for an icon.
         */
        icon: null,

        /**
         * @cfg {'top'/'right'/'bottom'/'left'} [iconAlign='left']
         * alignment of the icon
         */
        iconAlign: null,

        /**
         * @cfg {String} iconCls
         * CSS class for an icon.
         */
        iconCls: null,
        
        /**
         * @cfg {0/1/2} [rotation=0]
         * The rotation of the title's text.  Can be one of the following values:
         *
         * - `0` - no rotation
         * - `1` - rotate 90deg clockwise
         * - `2` - rotate 90deg counter-clockwise
         */
        rotation: null
    },

    autoEl: {
        // Required for Opera
        unselectable: 'on'
    },

    childEls: [
        'textEl',
        'iconEl',
        'iconWrapEl'
    ],

    renderTpl:
        '<tpl if="iconMarkup && iconBeforeTitle">{iconMarkup}</tpl>' +
        // unselectable="on" is required for Opera, other browsers inherit unselectability from the header
        '<div id="{id}-textEl" data-ref="textEl" class="{textCls} {textCls}-{ui} {itemCls}" unselectable="on"' +
            '<tpl if="headerRole">' +
                ' role="{headerRole}"' +
            '</tpl>' +
        '>{text}</div>' +
        '<tpl if="iconMarkup && !iconBeforeTitle">{iconMarkup}</tpl>',

    iconTpl:
        '<div id="{id}-iconWrapEl" data-ref="iconWrapEl" role="presentation" ' +
                'class="{iconWrapCls} {iconWrapCls}-{ui} {iconAlignCls} {itemCls}{childElCls}"' +
                '<tpl if="iconWrapStyle"> style="{iconWrapStyle}"</tpl>>' +
            '<div id="{id}-iconEl" data-ref="iconEl" role="presentation" unselectable="on" ' +
                        'class="{baseIconCls} {baseIconCls}-{ui} {iconCls} {glyphCls}" style="' +
                '<tpl if="iconUrl">background-image:url({iconUrl});</tpl>' +
                '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">' +
                '<tpl if="glyph">&#{glyph};</tpl><tpl if="iconCls || iconUrl">&#160;</tpl>' +
            '</div>' +
        '</div>',

    _textAlignClasses: {
        left: Ext.baseCSSPrefix + 'title-align-left',
        center: Ext.baseCSSPrefix + 'title-align-center',
        right: Ext.baseCSSPrefix + 'title-align-right'
    },

    _iconAlignClasses: {
        top: Ext.baseCSSPrefix + 'title-icon-top',
        right: Ext.baseCSSPrefix + 'title-icon-right',
        bottom: Ext.baseCSSPrefix + 'title-icon-bottom',
        left: Ext.baseCSSPrefix + 'title-icon-left'
    },

    _rotationClasses: {
        0: Ext.baseCSSPrefix + 'title-rotate-none',
        1: Ext.baseCSSPrefix + 'title-rotate-right',
        2: Ext.baseCSSPrefix + 'title-rotate-left'
    },

    _rotationAngles: {
        1: 90,
        2: 270
    },

    baseCls: Ext.baseCSSPrefix + 'title',
    _titleSuffix: '-title',
    _glyphCls: Ext.baseCSSPrefix + 'title-glyph',
    _iconWrapCls: Ext.baseCSSPrefix + 'title-icon-wrap',
    _baseIconCls: Ext.baseCSSPrefix + 'title-icon',
    _itemCls: Ext.baseCSSPrefix + 'title-item',
    _textCls: Ext.baseCSSPrefix + 'title-text',

    afterComponentLayout: function() {
        var me = this,
            rotation = me.getRotation(),
            lastBox, lastX, el;

        if (rotation && !Ext.isIE8) {
            // In IE8  we use a BasicImage filter to rotate the title
            // element 90 degrees.  The result is that what was the bottom left
            // corner is positioned exactly where the top left corner was
            // originally.  Since this is the desired result, no additional
            // positioning is needed in IE8.  In browsers that support CSS3 transform,
            // however, we use transform: rotate(90deg) to rotate the element.
            // CSS3 also provides a way to specify the position the rotated element
            // by changing the axis on which it is rotated using the transform-origin
            // property, but the required transform origin varies based on the
            // elements size, and would require some complex math to calculate.
            // To achieve the desired rotated position in modern browsers we use
            // a transform-origin of "0, 0" which means the top left corner of
            // the element is the rotation axis. After rotating 90 degrees we
            // simply move the element to the right by the same number of pixels
            // as its width.
            el = me.el;
            lastBox = me.lastBox;
            lastX = lastBox.x;
            el.setStyle(
                me._getVerticalAdjustDirection(),
                (lastX + ((rotation === 1) ? lastBox.width : -lastBox.height)) + 'px'
            );
        }
        this.callParent();
    },

    onRender: function() {
        var me = this,
            rotation = me.getRotation(),
            el = me.el;
        
        me.callParent();
        
        if (rotation) {
            el.setVertical(me._rotationAngles[rotation]);
        }

        if (Ext.supports.FixedTableWidthBug) {
            // Workaround for https://bugs.webkit.org/show_bug.cgi?id=130239 and
            // https://code.google.com/p/chromium/issues/detail?id=377190
            // See styleHooks for more details
            el._needsTableWidthFix = true;
        }
    },

    applyText: function(text) {
        if (!text) {
            text = '&#160;';
        }
        return text;
    },
    
    beforeRender: function() {
        var me = this;
        
        me.callParent();
        
        me.addCls(me._rotationClasses[me.getRotation()]);
        me.addCls(me._textAlignClasses[me.getTextAlign()]);
    },

    getIconMarkup: function() {
        return this.getTpl('iconTpl').apply(this.getIconRenderData());
    },

    getIconRenderData: function() {
        var me = this,
            icon = me.getIcon(),
            iconCls = me.getIconCls(),
            glyph = me.getGlyph(),
            glyphFontFamily = Ext._glyphFontFamily,
            iconAlign = me.getIconAlign(),
            glyphParts;


        if (typeof glyph === 'string') {
            glyphParts = glyph.split('@');
            glyph = glyphParts[0];
            glyphFontFamily = glyphParts[1];
        }

        return {
            id: me.id,
            ui: me.ui,
            itemCls: me._itemCls,
            iconUrl: icon,
            iconCls: iconCls,
            iconWrapCls: me._iconWrapCls,
            baseIconCls: me._baseIconCls,
            iconAlignCls: me._iconAlignClasses[iconAlign],
            glyph: glyph,
            glyphCls: glyph ? me._glyphCls : '',
            glyphFontFamily: glyphFontFamily
        };
    },

    initRenderData: function() {
        var me = this,
            iconAlign, renderData;

        renderData = {
            text: me.getText(),
            headerRole: me.headerRole,
            id: me.id,
            ui: me.ui,
            itemCls: me._itemCls,
            textCls: me._textCls,
            iconMarkup: null,
            iconBeforeTitle: null
        };
        
        if (me._hasIcon()) {
            iconAlign = me.getIconAlign();
            renderData.iconMarkup = me.getIconMarkup();
            renderData.iconBeforeTitle = (iconAlign === 'top' || iconAlign === 'left');
        }
        
        return renderData;
    },
    
    onAdded: function(container, pos, instanced) {
        var me = this,
            cls = me.cls || '',
            suffix = me._titleSuffix,
            baseCls = container.baseCls;

        me.addCls([
            baseCls + suffix,
            baseCls + suffix + '-' + container.ui
        ]);
        
        me.callParent([container, pos, instanced]);
    },

    updateGlyph: function(glyph, oldGlyph) {
        glyph = glyph || 0;
        var me = this,
            glyphCls = me._glyphCls,
            iconEl, fontFamily, glyphParts;

        me.glyph = glyph;

        if (me.rendered) {
            me._syncIconVisibility();
            iconEl = me.iconEl;
            
            if (typeof glyph === 'string') {
                glyphParts = glyph.split('@');
                glyph = glyphParts[0];
                fontFamily = glyphParts[1] || Ext._glyphFontFamily;
            }

            if (!glyph) {
                iconEl.dom.innerHTML = '';
                iconEl.removeCls(glyphCls);
            } else if (oldGlyph != glyph) {
                iconEl.dom.innerHTML = '&#' + glyph + ';';
                iconEl.addCls(glyphCls);
            }

            if (fontFamily) {
                iconEl.setStyle('font-family', fontFamily);
            }
            if (me._didIconStateChange(oldGlyph, glyph)) {
                me.updateLayout();
            }
        }
    },

    updateIcon: function(icon, oldIcon) {
        icon = icon || '';
        var me = this,
            iconEl;

        if (me.rendered && icon != oldIcon) {
            me._syncIconVisibility();
            iconEl = me.iconEl;
            
            iconEl.setStyle('background-image', icon ? 'url(' + icon + ')': '');
            if (me._didIconStateChange(oldIcon, icon)) {
                me.updateLayout();
            }
        }
    },

    updateIconAlign: function(align, oldAlign) {
        var me = this,
            iconWrapEl = me.iconWrapEl,
            el, iconWrapEl, iconAlignClasses;

        if (me.iconWrapEl) {
            el = me.el;
            iconAlignClasses = me._iconAlignClasses;

            if (oldAlign) {
                iconWrapEl.removeCls(iconAlignClasses[oldAlign]);
            }
            iconWrapEl.addCls(iconAlignClasses[align]);

            // here we move the iconWrap to the correct position in the dom - before the
            // title el for top/left alignments, and after the title el for right/bottom
            if (align === 'top' || align === 'left') {
                el.insertFirst(iconWrapEl);
            } else {
                el.appendChild(iconWrapEl);
            }
            
            me.updateLayout();
        }
    },

    updateIconCls: function(cls, oldCls) {
        cls = cls || '';
        var me = this,
            iconEl;

        if (me.rendered && oldCls != cls) {
            me._syncIconVisibility();
            iconEl = me.iconEl;
            
            if (oldCls) {
                iconEl.removeCls(oldCls);
            }
            iconEl.addCls(cls);
            if (me._didIconStateChange(oldCls, cls)) {
                me.updateLayout();
            }
        }
    },

    updateRotation: function(rotation, oldRotation) {
        var me = this,
            clearStyles, el, rotationClasses;
       
        if (me.rendered) {
            el = me.el;
            rotationClasses = me._rotationClasses;
            
            me.removeCls(rotationClasses[oldRotation]);
            me.addCls(rotationClasses[rotation]);

            el.setHorizontal();
            if (rotation) {
                el.setVertical(me._rotationAngles[rotation]);
            }
    
            // reset styles set by adjustTitlePosition (handles both rtl/ltr), and sizing
            // set by last layout run (this prevents parallel size from becoming perpendicular
            // size after rotation)
            el.setStyle({
                right: '',
                left: '',
                top: '',
                height: '',
                width: ''
            });
    
            me.lastBox = null;

            me.updateLayout();
        }
    },

    updateText: function(text) {
        if (this.rendered) {
            this.textEl.setHtml(text);
        }
    },

    updateTextAlign: function(align, oldAlign) {
        var me = this,
            textAlignClasses = me._textAlignClasses;
        
        if (me.rendered) {
            if (oldAlign) {
                me.removeCls(textAlignClasses[oldAlign]);
            }
            me.addCls(textAlignClasses[align]);

            me.updateLayout();
        }
    },

    privates: {
        // rtl hook
        _getVerticalAdjustDirection: function() {
            return 'left';
        },

        _didIconStateChange: function(old, current) {
            var currentEmpty = Ext.isEmpty(current);
            return Ext.isEmpty(old) ? !currentEmpty : currentEmpty;
        },

        _hasIcon: function() {
            return !!(this.getIcon() || this.getIconCls() || this.getGlyph());
        },

        _syncIconVisibility: function() {
            var me = this,
                el = me.el,
                hasIcon = me._hasIcon(),
                iconWrapEl = me.iconWrapEl,
                isBefore, iconAlign;
            
            if (hasIcon && !iconWrapEl) {
                // if an icon was configured, but we have not yet rendered an icon
                // element, we need to render it now.
                iconAlign = me.iconAlign;
                isBefore = (iconAlign === 'left' || iconAlign === 'top');
                
                el.dom.insertAdjacentHTML(
                    isBefore ? 'afterbegin' : 'beforeend',
                    me.getIconMarkup()
                );
            
                iconWrapEl = me.iconWrapEl = el[isBefore ? 'first' : 'last']();
                me.iconEl = iconWrapEl.first();
            }

            if (iconWrapEl) {
                iconWrapEl.setDisplayed(hasIcon);
            }
        }
    }
});
