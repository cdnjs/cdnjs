/*
 * This class is a derived work from:
 *
 *	Notification extension for Ext JS 4.0.2+
 *	Version: 2.1.3
 *
 *	Copyright (c) 2011 Eirik Lorentsen (http://www.eirik.net/)
 *
 *	Follow project on GitHub: https://github.com/EirikLorentsen/Ext.ux.window.Notification
 *
 *	Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 *	and GPL (http://opensource.org/licenses/GPL-3.0) licenses.
 */

/**
 * This class provides for lightweight, auto-dismissing pop-up notifications called "toasts".
 * At the base level, you can display a toast message by calling `Ext.toast` like so:
 *
 *      Ext.toast('Data saved');
 *
 * This will result in a toast message, which displays in the default location of bottom right in your viewport.
 *
 * You may expand upon this simple example with the following parameters: 
 *
 *      Ext.toast(message, title, align, iconCls);
 *
 * For example, the following toast will appear top-middle in your viewport.  It will display 
 * the 'Data Saved' message with a title of 'Title'  
 *
 *      Ext.toast('Data Saved', 'Title', 't')
 *
 * It should be noted that the toast's width is determined by the message's width. 
 * If you need to set a specific width, or any of the other available configurations for your toast, 
 * you can create the toast object as seen below:
 *
 *      Ext.toast({
 *          html: 'Data Saved',
 *          title: 'My Title',
 *          width: 200,
 *          align: 't'
 *      });
 *
 * This component is derived from the excellent work of a Sencha community member, Eirik
 * Lorentsen.
 */
Ext.define('Ext.window.Toast', {
    extend: 'Ext.window.Window',

    xtype: 'toast',

    cls: Ext.baseCSSPrefix + 'toast',

    bodyPadding: 10,
    autoClose: true,
    plain: false,
    draggable: false,
    resizable: false,
    shadow: false,
    focus: Ext.emptyFn,

    /**
     * @cfg {String/Ext.Component} [anchor]
     * The component or the `id` of the component to which the `toast` will be anchored.
     * The default behavior is to anchor a `toast` to the document body (no component).
     */
    anchor: null,

    /**
     * @cfg {Boolean} [useXAxis]
     * Directs the toast message to animate on the x-axis (if `true`) or y-axis (if `false`).
     * This value defaults to a value based on the `align` config.
     */
    useXAxis: false,

    /**
     * @cfg {"br"/"bl"/"tr"/"tl"/"t"/"l"/"b"/"r"} [align="br"]
     * Specifies the basic alignment of the toast message with its `anchor`. This controls
     * many aspects of the toast animation as well. For fine grain control of the final
     * placement of the toast and its `anchor` you may set `anchorAlign` *as well*.
     */
    align: 'br',

    /**
     * @cfg {String} [anchorAlign]
     * This string is a full specification of how to position the toast with respect to
     * its `anchor`. This is set to a reasonable value based on `align` but the `align`
     * also sets defaults for various other properties. This config controls only the
     * final position of the toast.
     */

    // Pixels between each notification
    spacing: 6,

    //TODO There should be a way to control from and to positions for the introduction.
    //TODO The align/anchorAlign configs don't actually work as expected.

    // Pixels from the anchor's borders to start the first notification
    paddingX: 30,
    paddingY: 10,

    slideInAnimation: 'easeIn',
    slideBackAnimation: 'bounceOut',
    slideInDuration: 1500,
    slideBackDuration: 1000,
    hideDuration: 500,
    autoCloseDelay: 3000,
    stickOnClick: true,
    stickWhileHover: true,
    closeOnMouseDown: false,

    // Private. Do not override!
    isHiding: false,
    isFading: false,
    destroyAfterHide: false,
    closeOnMouseOut: false,

    // Caching coordinates to be able to align to final position of siblings being animated
    xPos: 0,
    yPos: 0,

    initComponent: function() {
        var me = this;

        me.updateAlignment(me.align);
        me.setAnchor(me.anchor);
        me.callParent(arguments);
    },

    onRender: function() {
        var me = this;

        me.callParent(arguments);

        me.el.hover(me.onMouseEnter, me.onMouseLeave, me);

        // Mousedown outside of this, when visible, hides it immediately
        if (me.closeOnMouseDown) {
            me.mon(Ext, 'mousedown', me.onDocumentMousedown, me);
        }
    },

    /*
     * These properties are keyed by "align" and set defaults for various configs.
     */
    alignmentProps: {
        br: {
            paddingFactorX: -1,
            paddingFactorY: -1,
            siblingAlignment: "br-br",
            anchorAlign: "tr-br"
        },
        bl: {
            paddingFactorX: 1,
            paddingFactorY: -1,
            siblingAlignment: "bl-bl",
            anchorAlign: "tl-bl"
        },

        tr: {
            paddingFactorX: -1,
            paddingFactorY: 1,
            siblingAlignment: "tr-tr",
            anchorAlign: "br-tr"
        },
        tl: {
            paddingFactorX: 1,
            paddingFactorY: 1,
            siblingAlignment: "tl-tl",
            anchorAlign: "bl-tl"
        },

        b: {
            paddingFactorX: 0,
            paddingFactorY: -1,
            siblingAlignment: "b-b",
            useXAxis: 0,
            anchorAlign: "t-b"
        },
        t: {
            paddingFactorX: 0,
            paddingFactorY: 1,
            siblingAlignment: "t-t",
            useXAxis: 0,
            anchorAlign: "b-t"
        },
        l: {
            paddingFactorX: 1,
            paddingFactorY: 0,
            siblingAlignment: "l-l",
            useXAxis: 1,
            anchorAlign: "r-l"
        },
        r: {
            paddingFactorX: -1,
            paddingFactorY: 0,
            siblingAlignment: "r-r",
            useXAxis: 1,
            anchorAlign: "l-r"
        },

        /*
         * These properties take priority over the above and applied only when useXAxis
         * is set to true. Again these are keyed by "align".
         */
        x: {
            br: {
                anchorAlign: "bl-br"
            },
            bl: {
                anchorAlign: "br-bl"
            },
            tr: {
                anchorAlign: "tl-tr"
            },
            tl: {
                anchorAlign: "tr-tl"
            }
        }
    },

    updateAlignment: function (align) {
        var me = this,
            alignmentProps = me.alignmentProps,
            props = alignmentProps[align],
            xprops = alignmentProps.x[align];

        if (xprops && me.useXAxis) {
            Ext.applyIf(me, xprops);
        }

        Ext.applyIf(me, props);
    },

    getXposAlignedToAnchor: function () {
        var me = this,
            align = me.align,
            anchor = me.anchor,
            anchorEl = anchor && anchor.el,
            el = me.el,
            xPos = 0;

        // Avoid error messages if the anchor does not have a dom element
        if (anchorEl && anchorEl.dom) {
            if (!me.useXAxis) {
                // Element should already be aligned vertically
                xPos = el.getLeft();
            }
            // Using getAnchorXY instead of getTop/getBottom should give a correct placement when document is used
            // as the anchor but is still 0 px high. Before rendering the viewport.
            else if (align === 'br' || align === 'tr' || align === 'r') {
                xPos += anchorEl.getAnchorXY('r')[0];
                xPos -= (el.getWidth() + me.paddingX);
            } else {
                xPos += anchorEl.getAnchorXY('l')[0];
                xPos += me.paddingX;
            }
        }

        return xPos;
    },

    getYposAlignedToAnchor: function () {
        var me = this,
            align = me.align,
            anchor = me.anchor,
            anchorEl = anchor && anchor.el,
            el = me.el,
            yPos = 0;

        // Avoid error messages if the anchor does not have a dom element
        if (anchorEl && anchorEl.dom) {
            if (me.useXAxis) {
                // Element should already be aligned horizontally
                yPos = el.getTop();
            }
            // Using getAnchorXY instead of getTop/getBottom should give a correct placement when document is used
            // as the anchor but is still 0 px high. Before rendering the viewport.
            else if (align === 'br' || align === 'bl' || align === 'b') {
                yPos += anchorEl.getAnchorXY('b')[1];
                yPos -= (el.getHeight() + me.paddingY);
            } else {
                yPos += anchorEl.getAnchorXY('t')[1];
                yPos += me.paddingY;
            }
        }

        return yPos;
    },

    getXposAlignedToSibling: function (sibling) {
        var me = this,
            align = me.align,
            el = me.el,
            xPos;

        if (!me.useXAxis) {
            xPos = el.getLeft();
        } else if (align === 'tl' || align === 'bl' || align === 'l') {
            // Using sibling's width when adding
            xPos = (sibling.xPos + sibling.el.getWidth() + sibling.spacing);
        } else {
            // Using own width when subtracting
            xPos = (sibling.xPos - el.getWidth() - me.spacing);
        }

        return xPos;
    },

    getYposAlignedToSibling: function (sibling) {
        var me = this,
            align = me.align,
            el = me.el,
            yPos;

        if (me.useXAxis) {
            yPos = el.getTop();
        } else if (align === 'tr' || align === 'tl' || align === 't') {
            // Using sibling's width when adding
            yPos = (sibling.yPos + sibling.el.getHeight() + sibling.spacing);
        } else {
            // Using own width when subtracting
            yPos = (sibling.yPos - el.getHeight() - sibling.spacing);
        }

        return yPos;
    },

    getToasts: function () {
        var anchor = this.anchor,
            alignment = this.anchorAlign,
            activeToasts = anchor.activeToasts || (anchor.activeToasts = {});

        return activeToasts[alignment] || (activeToasts[alignment] = []);
    },

    setAnchor: function (anchor) {
        var me = this,
            Toast;

        me.anchor = anchor = ((typeof anchor === 'string') ? Ext.getCmp(anchor) : anchor);

        // If no anchor is provided or found, then the static object is used and the el
        // property pointed to the body document.
        if (!anchor) {
            Toast = Ext.window.Toast;

            me.anchor = Toast.bodyAnchor || (Toast.bodyAnchor = {
                el: Ext.getBody()
            });
        }
    },

    beforeShow: function () {
        var me = this;

        if (me.stickOnClick) {
            me.body.on('click', function () {
                me.cancelAutoClose();
            });
        }

        if (me.autoClose) {
            if (!me.closeTask) {
                me.closeTask = new Ext.util.DelayedTask(me.doAutoClose, me);
            }
            me.closeTask.delay(me.autoCloseDelay);
        }

        // Shunting offscreen to avoid flicker
        me.el.setX(-10000);
        me.el.setOpacity(1);
    },

    afterShow: function () {
        var me = this,
            el = me.el,
            activeToasts, sibling, length, xy;

        me.callParent(arguments);

        activeToasts = me.getToasts();
        length = activeToasts.length;
        sibling = length && activeToasts[length - 1];

        if (sibling) {
            el.alignTo(sibling.el, me.siblingAlignment, [0, 0]);

            me.xPos = me.getXposAlignedToSibling(sibling);
            me.yPos = me.getYposAlignedToSibling(sibling);
        } else {
            el.alignTo(me.anchor.el, me.anchorAlign,
                            [ (me.paddingX * me.paddingFactorX),
                              (me.paddingY * me.paddingFactorY) ], false);

            me.xPos = me.getXposAlignedToAnchor();
            me.yPos = me.getYposAlignedToAnchor();
        }

        Ext.Array.include(activeToasts, me);

        // Repeating from coordinates makes sure the windows does not flicker into the
        // center of the viewport during animation
        xy = el.getXY();
        el.animate({
            from: {
                x: xy[0],
                y: xy[1]
            },
            to: {
                x: me.xPos,
                y: me.yPos,
                opacity: 1
            },
            easing: me.slideInAnimation,
            duration: me.slideInDuration,
            dynamic: true
        });
    },

    onDocumentMousedown: function(e) {
        if (this.isVisible() && !this.owns(e.getTarget())) {
            this.hide();
        }
    },

    slideBack: function () {
        var me = this,
            anchor = me.anchor,
            anchorEl = anchor && anchor.el,
            el = me.el,
            activeToasts = me.getToasts(),
            index = Ext.Array.indexOf(activeToasts, me);

        // Not animating the element if it already started to hide itself or if the anchor is not present in the dom
        if (!me.isHiding && el && el.dom && anchorEl && anchorEl.isVisible()) {
            if (index) {
                me.xPos = me.getXposAlignedToSibling(activeToasts[index - 1]);
                me.yPos = me.getYposAlignedToSibling(activeToasts[index - 1]);
            } else {
                me.xPos = me.getXposAlignedToAnchor();
                me.yPos = me.getYposAlignedToAnchor();
            }

            me.stopAnimation();

            el.animate({
                to: {
                    x: me.xPos,
                    y: me.yPos
                },
                easing: me.slideBackAnimation,
                duration: me.slideBackDuration,
                dynamic: true
            });
        }
    },

    update: function () {
        var me = this;

        if (me.isVisible()) {
            me.isHiding = true;
            me.hide();
            //TODO offer a way to just update and reposition after layout
        }

        me.callParent(arguments);

        me.show();
    },

    cancelAutoClose: function() {
        var closeTask = this.closeTask;

        if (closeTask) {
            closeTask.cancel();
        }
    },

    doAutoClose: function () {
        var me = this;

        if (!(me.stickWhileHover && me.mouseIsOver)) {
            // Close immediately
            me.close();
        } else {
            // Delayed closing when mouse leaves the component.
            me.closeOnMouseOut = true;
        }
    },

    onMouseEnter: function () {
        this.mouseIsOver = true;
    },

    onMouseLeave: function () {
        var me = this;

        me.mouseIsOver = false;

        if (me.closeOnMouseOut) {
            me.closeOnMouseOut = false;
            me.close();
        }
    },

    removeFromAnchor: function () {
        var me = this,
            activeToasts, index;

        if (me.anchor) {
            activeToasts = me.getToasts();
            index = Ext.Array.indexOf(activeToasts, me);
            if (index !== -1) {
                Ext.Array.erase(activeToasts, index, 1);

                // Slide "down" all activeToasts "above" the hidden one
                for (;index < activeToasts.length; index++) {
                    activeToasts[index].slideBack();
                }
            }
        }
    },

    hide: function () {
        var me = this,
            el = me.el;

        me.cancelAutoClose();

        if (me.isHiding) {
            if (!me.isFading) {
                me.callParent(arguments);
                // Must come after callParent() since it will pass through hide() again triggered by destroy()
                me.removeFromAnchor();
                me.isHiding = false;
            }
        } else {
            // Must be set right away in case of double clicks on the close button
            me.isHiding = true;
            me.isFading = true;

            me.cancelAutoClose();

            if (el) {
                el.fadeOut({
                    opacity: 0,
                    easing: 'easeIn',
                    duration: me.hideDuration,
                    listeners: {
                        afteranimate: function () {
                            me.isFading = false;
                            me.hide(me.animateTarget, me.doClose, me);
                        }
                    }
                });
            }
        }

        return me;
    }
},
function (Toast) {
    Ext.toast = function (message, title, align, iconCls) {
        var config = message,
            toast;

        if (Ext.isString(message)) {
            config = {
                title: title,
                html: message,
                iconCls: iconCls
            };
            if (align) {
                config.align = align;
            }
        }

        toast = new Toast(config);
        toast.show();
        return toast;
    }
});
