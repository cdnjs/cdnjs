/*!
* Copyright(c) 2006-2014 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/

// From code originally written by David Davis (http://www.sencha.com/blog/html5-video-canvas-and-ext-js/)

Ext.define('Desktop.VideoWindow', {
    extend: 'Ext.ux.desktop.Module',

    uses: [
        'Ext.ux.desktop.Video'
    ],

    id:'video',
    windowId: 'video-window',

    tipWidth: 160,
    tipHeight: 96,

    init : function(){
        this.launcher = {
            text: 'About Ext JS',
            iconCls:'video'
        }
    },

    createWindow : function(){
        var me = this, desktop = me.app.getDesktop(),
            win = desktop.getWindow(me.windowId);

        if (!win) {
            win = desktop.createWindow({
                id: me.windowId,
                title: 'About Ext JS',
                width: 740,
                height: 480,
                iconCls: 'video',
                animCollapse: false,
                border: false,

                layout: 'fit',
                items: [
                    {
                        xtype: 'video',
                        id: 'video-player',
                        src: [
                            // browser will pick the format it likes most:
                            { src: 'http://dev.sencha.com/desktopvideo.mp4', type: 'video/mp4' },
                            { src: 'http://dev.sencha.com/desktopvideo.ogv', type: 'video/ogg' },
                            { src: 'http://dev.sencha.com/desktopvideo.mov', type: 'video/quicktime' }
                        ],
                        poster: 'http://b.vimeocdn.com/ts/148/397/148397103_640.jpg',
                        autobuffer: true,
                        autoplay : true,
                        controls : true,
                        /* default */
                        listeners: {
                            afterrender: function(video) {
                                me.videoEl = video.video.dom;

                                if (video.supported) {
                                    me.tip = new Ext.tip.ToolTip({
                                        anchor   : 'bottom',
                                        dismissDelay : 0,
                                        height   : me.tipHeight,
                                        width    : me.tipWidth,
                                        renderTpl: [
                                            '<canvas width="', me.tipWidth,
                                                  '" height="', me.tipHeight, '">'
                                        ],
                                        renderSelectors: {
                                            body: 'canvas'
                                        },
                                        listeners: {
                                            afterrender: me.onTooltipRender,
                                            show: me.renderPreview,
                                            scope: me
                                        }
                                    }); // tip
                                }
                            }
                        }
                    }
                ],
                listeners: {
                    beforedestroy: function() {
                        me.tip = me.ctx = me.videoEl = null;
                    }
                }
            });
        }

        if (me.tip) {
            me.tip.setTarget(win.taskButton.el);
        }

        return win;
    },

    onTooltipRender: function (tip) {
        // get the canvas 2d context
        var el = tip.body.dom, me = this;
        me.ctx = el.getContext && el.getContext('2d');
    },

    renderPreview: function() {
        var me = this;

        if ((me.tip && !me.tip.isVisible()) || !me.videoEl) {
            return;
        }

        if (me.ctx) {
            try {
                me.ctx.drawImage(me.videoEl, 0, 0, me.tipWidth, me.tipHeight);
            } catch(e) {}
        }

        // 20ms to keep the tooltip video smooth
        Ext.Function.defer(me.renderPreview, 20, me);
    }
});
