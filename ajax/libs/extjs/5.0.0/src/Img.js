/**
 * Simple helper class for easily creating image components. This renders an image tag to
 * the DOM with the configured src.
 *
 * {@img Ext.Img/Ext.Img.png Ext.Img component}
 *
 * ## Example usage:
 *
 *     var changingImage = Ext.create('Ext.Img', {
 *         src: 'http://www.sencha.com/img/20110215-feat-html5.png',
 *         renderTo: Ext.getBody()
 *     });
 *
 *     // change the src of the image programmatically
 *     changingImage.setSrc('http://www.sencha.com/img/20110215-feat-perf.png');
 *
 * By default, only an img element is rendered and that is this component's primary
 * {@link Ext.Component#getEl element}. If the {@link Ext.Component#autoEl} property
 * is other than 'img' (the default), the a child img element will be added to the primary
 * element. This can be used to create a wrapper element around the img.
 *
 * ## Wrapping the img in a div:
 *
 *     var wrappedImage = Ext.create('Ext.Img', {
 *         src: 'http://www.sencha.com/img/20110215-feat-html5.png',
 *         autoEl: 'div', // wrap in a div
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.Img', {
    extend: 'Ext.Component',
    alias: ['widget.image', 'widget.imagecomponent'],

    autoEl: 'img',

    baseCls: Ext.baseCSSPrefix + 'img',

    /**
     * @cfg {String} src
     * The image src.
     */
    src: '',

    /**
     * @cfg {String} alt
     * The descriptive text for non-visual UI description.
     */
    alt: '',

    /**
     * @cfg {String} title
     * Specifies addtional information about the image.
     */
    title: '',

    /**
     * @cfg {String} imgCls
     * Optional CSS classes to add to the img element.
     */
    imgCls: '',

    /**
     * @cfg {Number/String} glyph
     * A numeric unicode character code to serve as the image.  If this option is used
     * The image will be rendered using a div with innerHTML set to the html entity
     * for the given character code.  The default font-family for glyphs can be set
     * globally using {@link Ext#setGlyphFontFamily Ext.setGlyphFontFamily()}. Alternatively,
     * this config option accepts a string with the charCode and font-family separated by
     * the `@` symbol. For example '65@My Font Family'.
     */

    ariaRole: 'img',
    
    maskOnDisable: false,

    initComponent: function() {
        if (this.glyph) {
            this.autoEl = 'div';
        }
        this.callParent();
    },

    getElConfig: function() {
        var me = this,
            autoEl = me.autoEl,
            config = me.callParent(),
            glyphFontFamily = Ext._glyphFontFamily,
            glyph = me.glyph,
            img, glyphParts;

        // It is sometimes helpful (like in a panel header icon) to have the img wrapped
        // by a div. If our autoEl is not 'img' then we just add an img child to the el.
        if (autoEl === 'img' || (Ext.isObject(autoEl) && autoEl.tag === 'img')) {
            img = config;
        } else if (me.glyph) {
            if (typeof glyph === 'string') {
                glyphParts = glyph.split('@');
                glyph = glyphParts[0];
                glyphFontFamily = glyphParts[1];
            }
            config.html = '&#' + glyph + ';';
            if (glyphFontFamily) {
                config.style = 'font-family:' + glyphFontFamily;
            }
        } else {
            config.cn = [img = {
                tag: 'img',
                role: me.ariaRole,
                id: me.id + '-img'
            }];
        }

        if (img) {
            if (me.imgCls) {
                img.cls = (img.cls ? img.cls + ' ' : '') + me.imgCls;
            }

            img.src = me.src || Ext.BLANK_IMAGE_URL;
        }

        if (me.alt) {
            (img || config).alt = me.alt;
        }
        if (me.title) {
            (img || config).title = me.title;
        }

        return config;
    },

    onRender: function () {
        var me = this,
            autoEl = me.autoEl,
            el;

        me.callParent(arguments);

        el = me.el;
        
        if (autoEl === 'img' || (Ext.isObject(autoEl) && autoEl.tag === 'img')) {
            me.imgEl = el;
        }
        else {
            me.imgEl = el.getById(me.id + '-img');
        }
    },

    onDestroy: function () {
        Ext.destroy(this.imgEl);
        this.imgEl = null;
        this.callParent();
    },

    /**
     * Updates the {@link #src} of the image.
     * @param {String} src
     */
    setSrc: function(src) {
        var me = this,
            imgEl = me.imgEl;

        me.src = src;

        if (imgEl) {
            imgEl.dom.src = src || Ext.BLANK_IMAGE_URL;
        }
    },

    setGlyph: function(glyph) {
        var me = this,
            glyphFontFamily = Ext._glyphFontFamily,
            glyphParts, dom;

        if (glyph != me.glyph) {
            if (typeof glyph === 'string') {
                glyphParts = glyph.split('@');
                glyph = glyphParts[0];
                glyphFontFamily = glyphParts[1];
            }

            dom = me.el.dom;

            dom.innerHTML = '&#' + glyph + ';';
            if (glyphFontFamily) {
                dom.style = 'font-family:' + glyphFontFamily;
            }
        }
    }
});