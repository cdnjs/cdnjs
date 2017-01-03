/**
 * This override adds RTL support and the `rtl` config option to AbstactComponent.
 */
Ext.define('Ext.rtl.Component', {
    override: 'Ext.Component',

    /**
     * @cfg {Boolean} rtl
     * True to layout this component and its descendants in "rtl" (right-to-left) mode.
     * Can be explicitly set to false to override a true value inherited from an ancestor.
     */

    convertPositionSpec: function(posSpec) {
        // Since anchoring is done based on page level coordinates, we need to invert
        // left and right in the position spec when the direction of the compoent being
        // aligned is not the same as the direction of the viewport/body
        if ((Ext.rootInheritedState.rtl || false) !== (this.getInherited().rtl || false)) {
            posSpec = posSpec.replace(/l/g, 'tmp').replace(/r/g, 'l').replace(/tmp/g, 'r');
        }
        return posSpec;
    },

    getAnchorToXY: function(el, anchor, local, mySize) {
        var doc = document,
            pos, scroll, extraX, extraY;

        if (el.dom == doc.body || el.dom == doc) {
            // anchor the element using the same coordinate system as the viewport or body
            scroll = Ext.rootInheritedState.rtl ? el.rtlGetScroll() : el.getScroll();
            extraX = scroll.left;
            extraY = scroll.top;
        } else {
            pos = el.getXY();
            extraX = local ? 0 : pos[0];
            extraY = local ? 0 : pos[1];
        }

        return el.calculateAnchorXY(anchor, extraX, extraY, mySize);
    },

    getBorderPadding: function() {
        var borderPadding = this.el.getBorderPadding(),
            xBegin;
                
        if (this.isParentRtl()) {
            xBegin = borderPadding.xBegin;
            borderPadding.xBegin = borderPadding.xEnd;
            borderPadding.xEnd = xBegin;
        }

        return borderPadding;
    },

    getLocalX: function() {
        return this.isLocalRtl() ? this.el.rtlGetLocalX() : this.el.getLocalX();
    },

    getLocalXY: function() {
        return this.isLocalRtl() ? this.el.rtlGetLocalXY() : this.el.getLocalXY();
    },
    
    unitizeBox: function(box) {
        if (this.getInherited().rtl) {
            return Ext.dom.Element.rtlUnitizeBox(box); 
        } else {
            return this.callParent(arguments);
        } 
    },

    initInheritedState: function (inheritedState) {
        this.callParent(arguments);

        var rtl = this.rtl;

        if (rtl !== undefined) {
            // unlike the other hierarchical properties which should always
            // be inherited from the hierarchy unless true, rtl should only
            // be inherited if undefined, that is if this component instance
            // does not have rtl specified as true or false.
            inheritedState.rtl = rtl;
        }
    },

    /**
     * Returns true if this component's local coordinate system is rtl. For normal
     * components this equates to the value of isParentRtl().  Floaters are a bit different
     * because a floater's element can be a childNode of something other than its
     * parent component's element.  For floaters we have to read the dom to see if the
     * component's element's parentNode has a css direction value of "rtl".
     * @return {Boolean}
     * @private
     */
    isLocalRtl: function() {
        var me = this,
            rtl, offsetParent;

        if (me.floating) {
            if (me._isOffsetParentRtl === undefined) {
                
                // position:fixed elements do not report an offsetParent, so fall back to parentNode
                offsetParent = this.el.dom.offsetParent || this.el.dom.parentNode;
                if (offsetParent) {
                    me._isOffsetParentRtl =
                        Ext.fly(offsetParent, '_isLocalRtl').isStyle('direction', 'rtl');
                }
            }
            rtl = !!me._isOffsetParentRtl;
        } else {
            rtl = this.isParentRtl();
        }

        return rtl;
    },

    /**
     * Returns true if this component's parent container is rtl. Used by rtl positioning
     * methods to determine if the component should be positioned using a right-to-left
     * coordinate system.
     * @return {Boolean}
     * @private
     */
    isParentRtl: function() {
        var me = this,
            inheritedState = me.getInherited(),
            isRtl = false,
            myRtl;

        if (inheritedState.hasOwnProperty('rtl')) {
            // Temporarily remove this component's rtl property so we can see what the rtl
            // value is on the prototype.  A component is only rtl positioned if it is
            // inside of an rtl coordinate system (if one of it's ancestors is rtl). We
            // can't just use ownerCt/floatParent inheritedState, because components may
            // not have a container, but might still be part of a rtl coordinate system by
            // virtue of the Viewport. These components will inherit the correct rtl
            // value from the prototype because all hierarchy states inherit from
            // Ext.rootInheritedState
            myRtl = inheritedState.rtl;
            delete inheritedState.rtl;
        }

        if (inheritedState.rtl) {
            isRtl = true;
        }

        if (myRtl !== undefined) {
            // restore this component's original inheritedState rtl property
            inheritedState.rtl = myRtl;
        }

        return isRtl;
    },

    setLocalX: function(x) {
        return this.isLocalRtl() ? this.el.rtlSetLocalX(x) : this.el.setLocalX(x);
    },

    setLocalXY: function(x, y) {
        return this.isLocalRtl() ? this.el.rtlSetLocalXY(x, y) : this.el.setLocalXY(x, y);
    },
    
    isOppositeRootDirection: function(){
        return !this.getInherited().rtl !== !Ext.rootInheritedState.rtl;
    },

    privates: {
        doScrollTo: function(x, y, animate) {
            var me = this,
                overflowEl = me.getOverflowEl();

            overflowEl[me.getInherited().rtl ? 'rtlScrollTo' : 'scrollTo']('left', x, animate);
            overflowEl.scrollTo('top', y, animate);
        },

        doScrollBy: function(deltaX, deltaY, animate) {
            var me = this,
                overflowEl = me.getOverflowEl();

            if (overflowEl) {
                overflowEl[me.getInherited().rtl ? 'rtlScrollBy' : 'scrollBy'](deltaX, deltaY, animate);
            }
        },

        getScrollLeft: function() {
            var me = this,
                rtl = me.getInherited().rtl;

            return me.getOverflowEl()[rtl ? 'rtlGetScrollLeft' : 'getScrollLeft']();
        },

        setScrollLeft: function(left) {
            var me = this,
                rtl = me.getInherited().rtl;

            me.getOverflowEl()[rtl ? 'rtlSetScrollLeft' : 'setScrollLeft'](left);
        },

        initStyles: function(){
            if (this.getInherited().rtl) {
                this.horizontalPosProp = 'right';
            }
            this.callParent(arguments);
        },

        parseBox: function(box) {
            if (this.getInherited().rtl) {
                return Ext.dom.Element.rtlParseBox(box);
            } else {
                return this.callParent(arguments);
            }
        }
    }
}, function() {
    Ext.onReady(function() {
        // If the document or body has "direction:rtl" then we set the rtl flag in the
        // root hierarchy state so that the page-level coordinate system will be
        // right-based (similar to using a Viewport with "rtl: true").
        if ((Ext.fly(document.documentElement).isStyle('direction', 'rtl')) ||
            (Ext.getBody().isStyle('direction', 'rtl'))) {
            Ext.rootInheritedState.rtl = true;
        }
    });
});

