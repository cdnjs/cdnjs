/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
// @tag dom,core
/**
 */
Ext.define('Ext.dom.Element_fx', {
    override: 'Ext.dom.Element'
},
function() {

var Element         = Ext.dom.Element,
    VISIBILITY      = "visibility",
    DISPLAY         = "display",
    NONE            = "none",
    HIDDEN          = 'hidden',
    VISIBLE         = 'visible',
    OFFSETS         = "offsets",
    ASCLASS         = "asclass",
    NOSIZE          = 'nosize',
    ORIGINALDISPLAY = 'originalDisplay',
    VISMODE         = 'visibilityMode',
    ISVISIBLE       = 'isVisible',
    OFFSETCLASS     = Ext.baseCSSPrefix + 'hide-offsets',
    getDisplay = function(el) {
        var data = (el.$cache || el.getCache()).data,
            display = data[ORIGINALDISPLAY];
            
        if (display === undefined) {
            data[ORIGINALDISPLAY] = display = '';
        }
        return display;
    },
    getVisMode = function(el){
        var data = (el.$cache || el.getCache()).data,
            visMode = data[VISMODE];
            
        if (visMode === undefined) {
            data[VISMODE] = visMode = Element.VISIBILITY;
        }
        return visMode;
    };

Element.override({
    /**
     * The element's default display mode.
     */
    originalDisplay : "",
    visibilityMode : 1,

    /**
     * Sets the visibility of the element (see details). If the visibilityMode is set to Element.DISPLAY, it will use
     * the display property to hide the element, otherwise it uses visibility. The default is to hide and show using the visibility property.
     * @param {Boolean} visible Whether the element is visible
     * @param {Boolean/Object} [animate] True for the default animation, or a standard Element animation config object
     * @return {Ext.dom.Element} this
     */
    setVisible : function(visible, animate) {
        var me = this,
            dom = me.dom,
            visMode = getVisMode(me);

        // hideMode string override
        if (typeof animate == 'string') {
            switch (animate) {
                case DISPLAY:
                    visMode = Element.DISPLAY;
                    break;
                case VISIBILITY:
                    visMode = Element.VISIBILITY;
                    break;
                case OFFSETS:
                    visMode = Element.OFFSETS;
                    break;
                case NOSIZE:
                case ASCLASS:
                    visMode = Element.ASCLASS;
                    break;
            }
            me.setVisibilityMode(visMode);
            animate = false;
        }

        if (!animate || !me.anim) {
            if (visMode == Element.DISPLAY) {
                return me.setDisplayed(visible);
            } else if (visMode == Element.OFFSETS) {
                me[visible?'removeCls':'addCls'](OFFSETCLASS);
            } else if (visMode == Element.VISIBILITY) {
                me.fixDisplay();
                // Show by clearing visibility style. Explicitly setting to "visible" overrides parent visibility setting
                dom.style.visibility = visible ? '' : HIDDEN;
            } else if (visMode == Element.ASCLASS) {
                me[visible?'removeCls':'addCls'](me.visibilityCls || Element.visibilityCls);
            }
        } else {
            // closure for composites
            if (visible) {
                me.setOpacity(0.01);
                me.setVisible(true);
            }
            if (!Ext.isObject(animate)) {
                animate = {
                    duration: 350,
                    easing: 'ease-in'
                };
            }
            me.animate(Ext.applyIf({
                callback: function() {
                    if (!visible) {
                        
                        // Grab the dom again, since the reference may have changed if we use fly
                        Ext.fly(dom, '_internal').setVisible(false).setOpacity(1);
                    }
                },
                to: {
                    opacity: (visible) ? 1 : 0
                }
            }, animate));
        }
        (me.$cache || me.getCache()).data[ISVISIBLE] = visible;
        return me;
    },

    /**
     * @private
     * Determine if the Element has a relevant height and width available based
     * upon current logical visibility state
     */
    hasMetrics  : function(){
        var visMode = getVisMode(this);
        return this.isVisible() || (visMode == Element.OFFSETS) || (visMode == Element.VISIBILITY);
    },

    /**
     * Toggles the element's visibility or display, depending on visibility mode.
     * @param {Boolean/Object} [animate] True for the default animation, or a standard Element animation config object
     * @return {Ext.dom.Element} this
     */
    toggle : function(animate){
        var me = this;
        me.setVisible(!me.isVisible(), me.anim(animate));
        return me;
    },

    /**
     * Sets the CSS display property. Uses originalDisplay if the specified value is a boolean true.
     * @param {Boolean/String} value Boolean value to display the element using its default display, or a string to set the display directly.
     * @return {Ext.dom.Element} this
     */
    setDisplayed : function(value) {
        if(typeof value == "boolean"){
           value = value ? getDisplay(this) : NONE;
        }
        this.setStyle(DISPLAY, value);
        return this;
    },

    // private
    fixDisplay : function(){
        var me = this;
        if (me.isStyle(DISPLAY, NONE)) {
            me.setStyle(VISIBILITY, HIDDEN);
            me.setStyle(DISPLAY, getDisplay(me)); // first try reverting to default
            if (me.isStyle(DISPLAY, NONE)) { // if that fails, default to block
                me.setStyle(DISPLAY, "block");
            }
        }
    },

    /**
     * Hide this element - Uses display mode to determine whether to use "display" or "visibility". See {@link #setVisible}.
     * @param {Boolean/Object} [animate] true for the default animation or a standard Element animation config object
     * @return {Ext.dom.Element} this
     */
    hide : function(animate){
        // hideMode override
        if (typeof animate == 'string'){
            this.setVisible(false, animate);
            return this;
        }
        this.setVisible(false, this.anim(animate));
        return this;
    },

    /**
     * Show this element - Uses display mode to determine whether to use "display" or "visibility". See {@link #setVisible}.
     * @param {Boolean/Object} [animate] true for the default animation or a standard Element animation config object
     * @return {Ext.dom.Element} this
     */
    show : function(animate){
        // hideMode override
        if (typeof animate == 'string'){
            this.setVisible(true, animate);
            return this;
        }
        this.setVisible(true, this.anim(animate));
        return this;
    }
});

});
