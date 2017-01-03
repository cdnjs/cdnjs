/**
 * @class Ext.util.Positionable
 */
Ext.define('Ext.overrides.util.Positionable', {
    override: 'Ext.util.Positionable',

    /**
     * @method alignTo
     * @param {Ext.util.Positionable/HTMLElement/String} anchorToEl The Positionable,
     * HTMLElement, or id of the element to align to.
     * @param {String} [alignment="tl-bl?"] The position to align to
     * @param {Number[]} [offsets] Offset the positioning by [x, y]
     * @param {Boolean/Object} [animate] true for the default animation or a standard
     * Element animation config object
     * @return {Ext.util.Positionable} this
     */

    /**
     * @method anchorTo
     * Anchors an element to another element and realigns it when the window is resized.
     * @param {Ext.util.Positionable/HTMLElement/String} anchorToEl The Positionable,
     * HTMLElement, or id of the element to align to.
     * @param {String} [alignment="tl-bl?"] The position to align to
     * @param {Number[]} [offsets] Offset the positioning by [x, y]
     * @param {Boolean/Object} [animate] true for the default animation or a standard
     * Element animation config object
     * @param {Boolean/Number} [monitorScroll=50] True to monitor body scroll and
     * reposition. If this parameter is a number, it is used as the buffer delay in
     * milliseconds.
     * @param {Function} [callback] The function to call after the animation finishes
     * @return {Ext.util.Positionable} this
     */
    anchorTo: function(anchorToEl, alignment, offsets, animate, monitorScroll, callback) {
        var me = this,
            scroll = !Ext.isEmpty(monitorScroll),
            action = function() {
                me.alignTo(anchorToEl, alignment, offsets, animate);
                Ext.callback(callback, me);
            },
            anchor = me.getAnchor();

        // previous listener anchor, remove it
        me.removeAnchor();
        Ext.apply(anchor, {
            fn: action,
            scroll: scroll
        });

        Ext.on('resize', action, null);

        if (scroll) {
            Ext.getWin().on('scroll', action, null,
                    {buffer: !isNaN(monitorScroll) ? monitorScroll : 50});
        }
        action(); // align immediately
        return me;
    },

    getAnchor: function(){
        var el = this.el,
            data, anchor;
            
        if (!el.dom) {
            return;
        }
        data = el.getData();
        anchor = data._anchor;

        if(!anchor){
            anchor = data._anchor = {};
        }
        return anchor;
    },

    /**
     * @method move
     * Move the element relative to its current position.
     * @param {String} direction Possible values are:
     *
     * - `"l"` (or `"left"`)
     * - `"r"` (or `"right"`)
     * - `"t"` (or `"top"`, or `"up"`)
     * - `"b"` (or `"bottom"`, or `"down"`)
     *
     * @param {Number} distance How far to move the element in pixels
     * @param {Boolean/Object} [animate] true for the default animation or a standard
     * Element animation config object
     */

    /**
     * Remove any anchor to this element. See {@link #anchorTo}.
     * @return {Ext.util.Positionable} this
     */
    removeAnchor: function() {
        var anchor = this.getAnchor();

        if (anchor && anchor.fn) {
            Ext.un('resize', anchor.fn);
            if (anchor.scroll) {
                Ext.getWin().on('scroll', anchor.fn);
            }
            delete anchor.fn;
        }
        return this;
    },

    /**
     * @method setBox
     * Sets the element's box. If animate is true then x, y, width, and height will be
     * animated concurrently.
     * @param {Object} box The box to fill {x, y, width, height}
     * @param {Boolean/Object} [animate] true for the default animation or a standard
     * Element animation config object
     * @return {Ext.util.Positionable} this
     */
    setBox: function(box, animate) {
        var me = this;

        if (box.isRegion) {
            box = {
                x: box.left,
                y: box.top,
                width: box.right - box.left,
                height: box.bottom - box.top
            };
        }

        if (animate) {
            me.constrainBox(box);
            me.animate(Ext.applyIf({
                to: box,
                listeners: {
                    afteranimate: Ext.Function.bind(me.afterSetPosition, me, [box.x, box.y])
                }
            }, animate));
        } else {
            me.callParent([box]);
        }

        return me;
    }

    /**
     * @method setX
     * Sets the X position of the DOM element based on page coordinates.
     * @param {Number} The X position
     * @param {Boolean/Object} [animate] True for the default animation, or a standard
     * Element animation config object
     * @return {Ext.util.Positionable} this
     */

    /**
     * @method setXY
     * Sets the position of the DOM element in page coordinates.
     * @param {Number[]} pos Contains X & Y [x, y] values for new position (coordinates
     * are page-based)
     * @param {Boolean/Object} [animate] True for the default animation, or a standard
     * Element animation config object
     * @return {Ext.util.Positionable} this
     */

    /**
     * @method setY
     * Sets the Y position of the DOM element based on page coordinates.
     * @param {Number} The Y position
     * @param {Boolean/Object} [animate] True for the default animation, or a standard
     * Element animation config object
     * @return {Ext.util.Positionable} this
     */

});
