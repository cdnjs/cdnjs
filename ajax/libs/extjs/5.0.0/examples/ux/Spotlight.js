/**
 * UX used to provide a spotlight around a specified component/element.
 */
Ext.define('Ext.ux.Spotlight', {
    /**
     * @private
     * The baseCls for the spotlight elements
     */
    baseCls: 'x-spotlight',

    /**
     * @cfg animate {Boolean} True to animate the spotlight change
     * (defaults to true)
     */
    animate: true,

    /**
     * @cfg duration {Integer} The duration of the animation, in milliseconds
     * (defaults to 250)
     */
    duration: 250,

    /**
     * @cfg easing {String} The type of easing for the spotlight animatation
     * (defaults to null)
     */
    easing: null,

    /**
     * @private
     * True if the spotlight is active on the element
     */
    active: false,
    
    constructor: function(config){
        Ext.apply(this, config);
    },

    /**
     * Create all the elements for the spotlight
     */
    createElements: function() {
        var me = this,
            baseCls = me.baseCls,
            body = Ext.getBody();

        me.right = body.createChild({
            cls: baseCls
        });
        me.left = body.createChild({
            cls: baseCls
        });
        me.top = body.createChild({
            cls: baseCls
        });
        me.bottom = body.createChild({
            cls: baseCls
        });

        me.all = Ext.create('Ext.CompositeElement', [me.right, me.left, me.top, me.bottom]);
    },

    /**
     * Show the spotlight
     */
    show: function(el, callback, scope) {
        var me = this;
        
        //get the target element
        me.el = Ext.get(el);

        //create the elements if they don't already exist
        if (!me.right) {
            me.createElements();
        }

        if (!me.active) {
            //if the spotlight is not active, show it
            me.all.setDisplayed('');
            me.active = true;
            Ext.on('resize', me.syncSize, me);
            me.applyBounds(me.animate, false);
        } else {
            //if the spotlight is currently active, just move it
            me.applyBounds(false, false);
        }
    },

    /**
     * Hide the spotlight
     */
    hide: function(callback, scope) {
        var me = this;
        
        Ext.un('resize', me.syncSize, me);

        me.applyBounds(me.animate, true);
    },

    /**
     * Resizes the spotlight with the window size.
     */
    syncSize: function() {
        this.applyBounds(false, false);
    },

    /**
     * Resizes the spotlight depending on the arguments
     * @param {Boolean} animate True to animate the changing of the bounds
     * @param {Boolean} reverse True to reverse the animation
     */
    applyBounds: function(animate, reverse) {
        var me = this,
            box = me.el.getBox(),
            //get the current view width and height
            viewWidth = Ext.Element.getViewportWidth(),
            viewHeight = Ext.Element.getViewportHeight(),
            i = 0,
            config = false,
            from, to, clone;
            
        //where the element should start (if animation)
        from = {
            right: {
                x: box.right,
                y: viewHeight,
                width: (viewWidth - box.right),
                height: 0
            },
            left: {
                x: 0,
                y: 0,
                width: box.x,
                height: 0
            },
            top: {
                x: viewWidth,
                y: 0,
                width: 0,
                height: box.y
            },
            bottom: {
                x: 0,
                y: (box.y + box.height),
                width: 0,
                height: (viewHeight - (box.y + box.height)) + 'px'
            }
        };

        //where the element needs to finish
        to = {
            right: {
                x: box.right,
                y: box.y,
                width: (viewWidth - box.right) + 'px',
                height: (viewHeight - box.y) + 'px'
            },
            left: {
                x: 0,
                y: 0,
                width: box.x + 'px',
                height: (box.y + box.height) + 'px'
            },
            top: {
                x: box.x,
                y: 0,
                width: (viewWidth - box.x) + 'px',
                height: box.y + 'px'
            },
            bottom: {
                x: 0,
                y: (box.y + box.height),
                width: (box.x + box.width) + 'px',
                height: (viewHeight - (box.y + box.height)) + 'px'
            }
        };

        //reverse the objects
        if (reverse) {
            clone = Ext.clone(from);
            from = to;
            to = clone;
        }

        if (animate) {
            Ext.Array.forEach(['right', 'left', 'top', 'bottom'], function(side) {
                me[side].setBox(from[side]);
                me[side].animate({
                    duration: me.duration,
                    easing: me.easing,
                    to: to[side]
                });
            },
            this);
        } else {
            Ext.Array.forEach(['right', 'left', 'top', 'bottom'], function(side) {
                me[side].setBox(Ext.apply(from[side], to[side]));
                me[side].repaint();
            },
            this);
        }
    },

    /**
     * Removes all the elements for the spotlight
     */
    destroy: function() {
        var me = this;
        
        Ext.destroy(me.right, me.left, me.top, me.bottom);
        delete me.el;
        delete me.all;
    }
});
