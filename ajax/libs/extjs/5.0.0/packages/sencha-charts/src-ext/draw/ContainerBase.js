/**
 * @private
 * @class Ext.draw.ContainerBase
 */
Ext.define('Ext.draw.ContainerBase', {
    extend: 'Ext.panel.Panel',

    requires: ['Ext.window.Window'],

    layout: 'container',

    // adds a listener to this draw container's element. If the element does not yet exist
    // addition of the listener will be deferred until onRender.  Useful when listeners
    // need to be attached during initConfig.
    addElementListener: function() {
        var me = this,
            args = arguments;

        if (me.rendered) {
            me.el.on.apply(me.el, args);
        } else {
            me.on('render', function() {
                me.el.on.apply(me.el, args);
            });
        }
    },

    afterRender: function() {
        this.callParent(arguments);
        this.initAnimator();
    },

    getItems: function() {
        var me = this,
            items = me.items;

        if (!items || !items.isMixedCollection) {
            // getItems may be called before initItems has run and created the items
            // collection, so we have to create it here just in case (this can happen
            // if getItems is called during initConfig)
            me.initItems();
        }

        return me.items;
    },

    onRender: function() {
        this.callParent(arguments);
        this.element = this.el;
        this.innerElement = this.body;
    },

    setItems: function(items) {
        this.items = items;
        return items;
    },

    setSurfaceSize: function(width, height) {
        this.resizeHandler({width:width, height:height});
        this.renderFrame();
    },

    onResize: function () {
        var box = this.body.lastBox;
        this.onBodyResize(box.width, box.height);
    },

    preview: function () {
        var image = this.getImage();
        new Ext.window.Window({
            title: 'Chart Preview',
            closeable: true,
            renderTo: Ext.getBody(),
            autoShow: true,
            maximizeable: true,
            maximized: true,
            border: true,
            layout: {
                type: 'hbox',
                pack: 'center',
                align: 'middle'
            },
            items: {
                xtype: 'container',
                items: {
                    xtype: 'image',
                    mode: 'img',
                    cls: Ext.baseCSSPrefix + 'chart-image',
                    src: image.data,
                    listeners: {
                        afterrender: function () {
                            var me = this,
                                img = me.imgEl.dom,
                                ratio = image.type === 'svg' ? 1 : (window['devicePixelRatio'] || 1),
                                size;

                            if (!img.naturalWidth || !img.naturalHeight) {
                                img.onload = function () {
                                    var width = img.naturalWidth,
                                        height = img.naturalHeight;
                                    me.setWidth(Math.floor(width / ratio));
                                    me.setHeight(Math.floor(height / ratio));
                                }
                            } else {
                                size = me.getSize();
                                me.setWidth(Math.floor(size.width / ratio));
                                me.setHeight(Math.floor(size.height / ratio));
                            }
                        }
                    }
                }
            }
        });
    },

    privates: {
        getTargetEl: function() {
            return this.innerElement;
        }
    }
});
