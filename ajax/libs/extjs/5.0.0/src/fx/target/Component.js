/**
 * @class Ext.fx.target.Component
 * 
 * This class represents a animation target for a {@link Ext.Component}. In general this class will not be
 * created directly, the {@link Ext.Component} will be passed to the animation and
 * and the appropriate target will be created.
 */
Ext.define('Ext.fx.target.Component', {

    /* Begin Definitions */
   
    extend: 'Ext.fx.target.Target',
    
    /* End Definitions */

    type: 'component',

    // Methods to call to retrieve unspecified "from" values from a target Component
    getPropMethod: {
        top: function() {
            return this.getPosition(true)[1];
        },
        left: function() {
            return this.getPosition(true)[0];
        },
        x: function() {
            return this.getPosition()[0];
        },
        y: function() {
            return this.getPosition()[1];
        },
        height: function() {
            return this.getHeight();
        },
        width: function() {
            return this.getWidth();
        },
        opacity: function() {
            return this.el.getStyle('opacity');
        }
    },

    setMethods: {
        top:     'setPosition',
        left:    'setPosition',
        x:       'setPagePosition',
        y:       'setPagePosition',
        height:  'setSize',
        width:   'setSize',
        opacity: 'setOpacity'
    },

    // Read the named attribute from the target Component. Use the defined getter for the attribute
    getAttr: function(attr, val) {
        return [[this.target, val !== undefined ? val : this.getPropMethod[attr].call(this.target)]];
    },

    setAttr: function(targetData, isFirstFrame, isLastFrame) {
        var me = this,
            ln = targetData.length,
            attrs, attr, o, i, j, targets, left, top, w, h,
            methodsToCall = {},
            methodProps;

        for (i = 0; i < ln; i++) {
            attrs = targetData[i].attrs;
            for (attr in attrs) {
                targets = attrs[attr].length;
                for (j = 0; j < targets; j++) {
                    o = attrs[attr][j];
                    methodProps = methodsToCall[me.setMethods[attr]] || (methodsToCall[me.setMethods[attr]] = {});
                    methodProps.target = o[0];
                    methodProps[attr] = o[1];
                    // debugging code: Ext.log('Setting ' + o[0].id + "'s " + attr + ' to ' + o[1]);
                }
            }
            if (methodsToCall.setPosition) {
                o = methodsToCall.setPosition;
                left = (o.left === undefined) ? undefined : parseFloat(o.left);
                top = (o.top === undefined) ? undefined : parseFloat(o.top);
                o.target.setPosition(left, top);
            }
            if (methodsToCall.setPagePosition) {
                o = methodsToCall.setPagePosition;
                o.target.setPagePosition(o.x, o.y);
            }
            if (methodsToCall.setSize) {
                o = methodsToCall.setSize;
                // Dimensions not being animated MUST NOT be autosized. They must remain at current value.
                w = (o.width === undefined) ? o.target.getWidth() : parseFloat(o.width);
                h = (o.height === undefined) ? o.target.getHeight() : parseFloat(o.height);

                // Only set the size of the Component on the last frame, or if the animation was
                // configured with dynamic: true.
                // In other cases, we just set the target element size.
                // This will result in either clipping if animating a reduction in size, or the revealing of
                // the inner elements of the Component if animating an increase in size.
                // Component's animate function initially resizes to the larger size before resizing the
                // outer element to clip the contents.
                o.target.el.setSize(w, h);
                if (isLastFrame || me.dynamic) {
                    // Defer the final sizing & layout until we are outside of this frame.
                    // In case anything in the resulting layout calls animation.
                    // If it does, *this* frame will fire again... recursively
                    Ext.GlobalEvents.on({
                        idle: Ext.Function.bind(o.target.setSize, o.target, [w, h]),
                        single: true
                    });
                }
            }
            if (methodsToCall.setOpacity) {
                o = methodsToCall.setOpacity;
                o.target.el.setStyle('opacity', o.opacity);
            }
        }
    }
});
