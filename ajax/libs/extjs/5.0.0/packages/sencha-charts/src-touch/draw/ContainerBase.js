Ext.define('Ext.draw.ContainerBase', {
    extend: 'Ext.Container',

    inheritableStatics: {
        WATERMARK: 'Powered by <span style="color:#22E962; font-weight: 900">Sencha Touch</span> <span style="color:#75cdff; font-weight: 900">GPLv3</span>'
    },

    constructor: function(config) {
        this.callParent([config]);
        this.initAnimator();
    },

    initialize: function () {
        this.callParent();
        this.element.on('resize', 'onElementResize', this);
    },

    onElementResize: function () {
        // TODO: get body element size here
        this.onBodyResize(width, height);
    },

    getElementConfig: function () {
        return {
            reference: 'element',
            className: 'x-container',
            children: [
                {
                    reference: 'innerElement',
                    className: 'x-inner',
                    children: [
                        {
                            reference: 'watermarkElement',
                            cls: 'x-chart-watermark',
                            html: Ext.draw.Container.WATERMARK,
                            style: Ext.draw.Container.WATERMARK ? '': 'display:none'
                        }
                    ]
                }
            ]
        };
    },

    addElementListener: function() {
        this.element.on.apply(this.element, arguments);
    },

    preview: function () {
        Ext.Viewport.add({
            xtype: 'panel',
            layout: 'fit',
            modal: true,
            width: '90%',
            height: '90%',
            hideOnMaskTap: true,
            centered: true,
            scrollable: false,
            items: {
                xtype: 'image',
                mode: 'img',
                src: this.getImage().data
            },
            listeners: {
                hide: function () {
                    Ext.Viewport.remove(this);
                }
            }
        }).show();
    }
});
