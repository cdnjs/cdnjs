/**
 * Private utility class for Ext.resizer.Resizer.
 * @private
 */
Ext.define('Ext.resizer.ResizeTracker', {
    extend: 'Ext.dd.DragTracker',
    dynamic: true,
    preserveRatio: false,

    // Default to no constraint
    constrainTo: null,
    
    proxyCls:  Ext.baseCSSPrefix + 'resizable-proxy',

    constructor: function(config) {
        var me = this,
            widthRatio, heightRatio,
            throttledResizeFn;

        if (!config.el) {
            if (config.target.isComponent) {
                me.el = config.target.getEl();
            } else {
                me.el = config.target;
            }
        }
        this.callParent(arguments);

        // Ensure that if we are preserving aspect ratio, the largest minimum is honoured
        if (me.preserveRatio && me.minWidth && me.minHeight) {
            widthRatio = me.minWidth / me.el.getWidth();
            heightRatio = me.minHeight / me.el.getHeight();

            // largest ratio of minimum:size must be preserved.
            // So if a 400x200 pixel image has
            // minWidth: 50, maxWidth: 50, the maxWidth will be 400 * (50/200)... that is 100
            if (heightRatio > widthRatio) {
                me.minWidth = me.el.getWidth() * heightRatio;
            } else {
                me.minHeight = me.el.getHeight() * widthRatio;
            }
        }

        // If configured as throttled, create an instance version of resize which calls
        // a throttled function to perform the resize operation.
        if (me.throttle) {
            throttledResizeFn = Ext.Function.createThrottled(function() {
                    Ext.resizer.ResizeTracker.prototype.resize.apply(me, arguments);
                }, me.throttle);

            me.resize = function(box, direction, atEnd) {
                if (atEnd) {
                    Ext.resizer.ResizeTracker.prototype.resize.apply(me, arguments);
                } else {
                    throttledResizeFn.apply(null, arguments);
                }
            };
        }
    },

    onBeforeStart: function(e) {
        // record the startBox
        this.startBox = this.target.getBox();
    },

    /**
     * @private
     * Returns the object that will be resized instead of the true target on every mousemove event.
     * If dynamic is false, this will be a proxy, otherwise it will be null target.
     */
    getProxy: function() {
        var me = this;

        if (!me.dynamic && !me.proxy) {
            me.proxy = me.createProxy(me.target || me.el);

            // Only hide proxy at end if we create one dynamically
            // When a wrapped resizer is used it passes the wrapping el in as the proxy.
            me.hideProxy = true;
        }
        if (me.proxy) {
            me.proxy.show();
            return me.proxy;
        }
    },

    /**
     * Create a proxy for this resizer
     * @param {Ext.Component/Ext.dom.Element} target The target
     * @return {Ext.dom.Element} A proxy element
     */
    createProxy: function(target){
        var proxy,
            cls = this.proxyCls;

        if (target.isComponent) {
            proxy = target.getProxy().addCls(cls);
        } else {
            proxy = target.createProxy({
                tag: 'div',
                role: 'presentation',
                cls: cls,
                id: target.id + '-rzproxy'
            }, Ext.getBody());
        }
        proxy.removeCls(Ext.baseCSSPrefix + 'proxy-el');
        return proxy;
    },

    onStart: function(e) {
        // returns the Ext.ResizeHandle that the user started dragging
        this.activeResizeHandle = Ext.get(this.getDragTarget().id);

        // If we are using a proxy, ensure it is sized.
        if (!this.dynamic) {
            this.resize(this.startBox);
        }
    },

    onDrag: function(e) {
        // dynamic resizing, update dimensions during resize
        if (this.dynamic || this.proxy) {
            this.updateDimensions(e);
        }
    },

    updateDimensions: function(e, atEnd) {
        var me = this,
            region = me.activeResizeHandle.region,
            offset = me.getOffset(me.constrainTo ? 'dragTarget' : null),
            box = me.startBox,
            ratio,
            widthAdjust = 0,
            heightAdjust = 0,
            snappedWidth,
            snappedHeight,
            adjustX = 0,
            adjustY = 0,
            dragRatio,
            oppositeCorner,
            axis, // 1 = x, 2 = y, 3 = x and y.
            newBox,
            newHeight, newWidth;

        region = me.convertRegionName(region);

        switch (region) {
            case 'south':
                heightAdjust = offset[1];
                axis = 2;
                break;
            case 'north':
                heightAdjust = -offset[1];
                adjustY = -heightAdjust;
                axis = 2;
                break;
            case 'east':
                widthAdjust = offset[0];
                axis = 1;
                break;
            case 'west':
                widthAdjust = -offset[0];
                adjustX = -widthAdjust;
                axis = 1;
                break;
            case 'northeast':
                heightAdjust = -offset[1];
                adjustY = -heightAdjust;
                widthAdjust = offset[0];
                oppositeCorner = [box.x, box.y + box.height];
                axis = 3;
                break;
            case 'southeast':
                heightAdjust = offset[1];
                widthAdjust = offset[0];
                oppositeCorner = [box.x, box.y];
                axis = 3;
                break;
            case 'southwest':
                widthAdjust = -offset[0];
                adjustX = -widthAdjust;
                heightAdjust = offset[1];
                oppositeCorner = [box.x + box.width, box.y];
                axis = 3;
                break;
            case 'northwest':
                heightAdjust = -offset[1];
                adjustY = -heightAdjust;
                widthAdjust = -offset[0];
                adjustX = -widthAdjust;
                oppositeCorner = [box.x + box.width, box.y + box.height];
                axis = 3;
                break;
        }

        newBox = {
            width: box.width + widthAdjust,
            height: box.height + heightAdjust,
            x: box.x + adjustX,
            y: box.y + adjustY
        };

        // Snap value between stops according to configured increments
        snappedWidth = Ext.Number.snap(newBox.width, me.widthIncrement);
        snappedHeight = Ext.Number.snap(newBox.height, me.heightIncrement);
        if (snappedWidth != newBox.width || snappedHeight != newBox.height){
            switch (region) {
                case 'northeast':
                    newBox.y -= snappedHeight - newBox.height;
                    break;
                case 'north':
                    newBox.y -= snappedHeight - newBox.height;
                    break;
                case 'southwest':
                    newBox.x -= snappedWidth - newBox.width;
                    break;
                case 'west':
                    newBox.x -= snappedWidth - newBox.width;
                    break;
                case 'northwest':
                    newBox.x -= snappedWidth - newBox.width;
                    newBox.y -= snappedHeight - newBox.height;
            }
            newBox.width = snappedWidth;
            newBox.height = snappedHeight;
        }

        // out of bounds
        if (newBox.width < me.minWidth || newBox.width > me.maxWidth) {
            newBox.width = Ext.Number.constrain(newBox.width, me.minWidth, me.maxWidth);

            // Re-adjust the X position if we were dragging the west side
            if (adjustX) {
                newBox.x = box.x + (box.width - newBox.width);
            }
        } else {
            me.lastX = newBox.x;
        }
        if (newBox.height < me.minHeight || newBox.height > me.maxHeight) {
            newBox.height = Ext.Number.constrain(newBox.height, me.minHeight, me.maxHeight);

            // Re-adjust the Y position if we were dragging the north side
            if (adjustY) {
                newBox.y = box.y + (box.height - newBox.height);
            }
        } else {
            me.lastY = newBox.y;
        }

        // If this is configured to preserve the aspect ratio, or they are dragging using the shift key
        if (me.preserveRatio || e.shiftKey) {
            ratio = me.startBox.width / me.startBox.height;

            // Calculate aspect ratio constrained values.
            newHeight = Math.min(Math.max(me.minHeight, newBox.width / ratio), me.maxHeight);
            newWidth = Math.min(Math.max(me.minWidth, newBox.height * ratio), me.maxWidth);

            // X axis: width-only change, height must obey
            if (axis == 1) {
                newBox.height = newHeight;
            }

            // Y axis: height-only change, width must obey
            else if (axis == 2) {
                newBox.width = newWidth;
            }

            // Corner drag.
            else {
                // Drag ratio is the ratio of the mouse point from the opposite corner.
                // Basically what edge we are dragging, a horizontal edge or a vertical edge.
                dragRatio = Math.abs(oppositeCorner[0] - this.lastXY[0]) / Math.abs(oppositeCorner[1] - this.lastXY[1]);

                // If drag ratio > aspect ratio then width is dominant and height must obey
                if (dragRatio > ratio) {
                    newBox.height = newHeight;
                } else {
                    newBox.width = newWidth;
                }

                // Handle dragging start coordinates
                if (region == 'northeast') {
                    newBox.y = box.y - (newBox.height - box.height);
                } else if (region == 'northwest') {
                    newBox.y = box.y - (newBox.height - box.height);
                    newBox.x = box.x - (newBox.width - box.width);
                } else if (region == 'southwest') {
                    newBox.x = box.x - (newBox.width - box.width);
                }
            }
        }

        // Keep track of whether position needs changing
        me.setPosition = newBox.x !== me.startBox.x || newBox.y !== me.startBox.y;
        me.resize(newBox, atEnd);
    },

    resize: function(box, atEnd) {
        var me = this,
            target,
            setPosition = me.setPosition;

        // We are live resizing the target, or at the end: Size the target
        if (me.dynamic || (!me.dynamic && atEnd)) {
            // Resize the target
            if (setPosition) {
                me.target.setBox(box);
            } else {
                me.target.setSize(box.width, box.height);
            }

        }

        // In the middle of a resize - just resize the proxy
        if (!atEnd) {
            target = me.getProxy();
            if (target && target !== me.target) {
                if (setPosition || me.hideProxy) {
                    target.setBox(box);
                } else {
                    target.setSize(box.width, box.height);
                }
            }
        }
    },

    onEnd: function(e) {
        this.updateDimensions(e, true);
        if (this.proxy && this.hideProxy) {
            this.proxy.hide();
        }
    },

    convertRegionName: function(name) {
        return name;
    }
});
