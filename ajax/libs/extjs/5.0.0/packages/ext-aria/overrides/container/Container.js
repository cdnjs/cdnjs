Ext.define('Ext.aria.container.Container', {
    override: 'Ext.container.Container',
    
    statics: {
        ariaSectionContainers: {
            region: true, 
            dialog: true,
            alertdialog: true,
            document: true,
            application: true
        }
    },
    
    ariaFocusableContainerCls: Ext.baseCSSPrefix + 'aria-focusable-container',
    
    initCls: function() {
        var me = this,
            cls;
        
        cls = me.callParent();
        
        if (me.ariaIsFocusableContainer()) {
            cls.push(me.ariaFocusableContainerCls);
        }
        
        return cls;
    },

    onBoxReady: function() {
        var me = this,
            scrollFlags = me.scrollFlags;
        
        me.callParent(arguments);

        // Scrolling will affect the location of the focus frame
        // Issue an afterLayout event so the focus manager can redraw the focus
        if (scrollFlags.y || scrollFlags.x) {
            me.getTargetEl().on('scroll', function() {
                Ext.globalEvents.fireEvent('afterlayout', me);
            });
        }
    },
    
    addFocusListener: function() {
        var me = this;

        // Do not add a listener to a container unless according to ARIA it is a section
        // or the developer has set focusableContainer: true
        if (me.ariaIsFocusableContainer()) {
            me.callParent(arguments);
        }
    },
    
    ariaIsFocusableContainer: function() {
        return this.ariaIsSection() || this.focusableContainer;
    },
    
    ariaGetAfterRenderAttributes: function() {
        var me = this,
            attrs, title;
        
        attrs = me.callParent();

        // ARIA requires that all focusable items have a title so that
        // screen readers can announce it
        //<debug>
        // Don't run the check under the slicer, it'll blow up
        if (!me.ariaSkipContainerTitleCheck && !Ext.theme) {
            me.ariaCheckContainerTitle(attrs);
        }
        //</debug>
        
        return attrs;
    },
    
    //<debug>
    ariaCheckContainerTitle: function(attrs) {
        var me = this;
        
        if (me.ariaIsFocusableContainer()) {
            // If aria-labelledby attribute is present, we trust it to point to a valid title
            if (!attrs['aria-labelledby']) {
                title = me.title || me.ariaLabel || attrs['aria-label'];
                if (!title) {
                    if (me.ariaIsSection()) {
                        Ext.log.error("Container " + me.id + " has ARIA role of '" + me.ariaRole +
                                      "', but does not have a title. WAI-ARIA requires that all " +
                                      "focusable containers have a title.");
                    }
                    else if (me.focusableContainer) {
                        Ext.log.error("Container " + me.id + " is set to be focusable, " +
                                      "but does not have a title. WAI-ARIA requires that all " +
                                      "focusable containers have a title.");
                    }
                }
                delete attrs['aria-label'];
                attrs.title = title;
            }
        }
    },
    //</debug>
    
    ariaGetFocusCls: function() {
        var me = this;
        
        return me.ariaIsFocusableContainer() ? me.ariaFocusCls : '';
    },

    /**
     * Returns the first focusable component in the container
     * @protected
     * @return {Ext.Component} The first focusable component in the container
     */
    ariaFirstChild: function() {
        var list = this.ariaGetFocusItems(false);
  
        return list[0] || null;
    },

    /**
     * Returns the last focusable component in the container
     * @protected
     * @return {Ext.Component} The last focusable component in the container
     */
    ariaLastChild: function() {
        var list = this.ariaGetFocusItems(true),
            len = list.length;
        
        return len ? list[len - 1] : null;
    },

    /**
     * Returns a flattened list of focusable components in the container.
     * @protected
     * @return {Ext.Component[]} Array of focusable components
     */
    ariaGetFocusItems: function(backwards) {
        var items = this.getRefItems(),
            len = items.length,
            focusables = [],
            cmp, i;

        for (i = 0; i < len; i++) {
            cmp = items[i];
            
            if (cmp.isVisible()) {
                if (cmp.focusListenerAdded) {
                    if (cmp.isFocusable()) {
                        focusables.push(cmp);
                    }
                }
                else if (cmp.isContainer) {
                    focusables = focusables.concat(cmp.ariaGetFocusItems(backwards));
                }
            }
        }
        
        return focusables;
    },

    /**
     * Checks if the container is a section according to Aria
     * When a section gets focus, you need to press enter to
     * focus its children. Esc will return focus to the section
     * @protected
     * @return {Boolean} `true` if the container is a section, else `false`.
     */
    ariaIsSection: function() {
        return Ext.container.Container.ariaSectionContainers[this.ariaRole];
    }
});
