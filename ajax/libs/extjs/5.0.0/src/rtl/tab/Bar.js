Ext.define('Ext.rtl.tab.Bar', {
    override: 'Ext.tab.Bar',

    privates: {
        adjustTabPositions: function() {
            var items = this.items.items,
                i = items.length,
                tab;

            if (!this.getInherited().rtl) {
                return this.callParent();
            }

            // When tabs are rotated vertically we don't have a reliable way to position
            // them using CSS in modern browsers.  This is because of the way transform-orign
            // works - it requires the width to be known, and the width is not known in css.
            // Consequently we have to make an adjustment to the tab's position in these browsers.
            // This is similar to what we do in Ext.panel.Header#adjustTitlePosition
            if (!Ext.isIE9m) {
                if (this.dock === 'left') {
                    // rotated 90 degrees around using the top left corner as the axis.
                    // tabs need to be shifted to the right by their height
                    while (i--) {
                        tab = items[i];
                        tab.el.setStyle('right', -tab.lastBox.height + 'px');
                    }
                } else if (this.dock === 'right') {
                    // rotated 270 degrees around using the top right corner as the axis.
                    // tabs need to be shifted to the left by their width
                    while (i--) {
                        tab = items[i];
                        tab.el.setStyle('right', tab.lastBox.width + 'px');
                    }
                }
            }
        },

        getCloseXY: function(closeEl, tabX, tabY, tabWidth, tabHeight, closeWidth, closeHeight, direction) {
            var closeXY, closeX, closeY, xy;

            if (this.isOppositeRootDirection()) {
                closeXY = closeEl.getXY();
                if (direction === 'right') {
                    closeX = tabX + closeXY[1] - tabY;
                    closeY = tabY + tabHeight - (closeXY[0] - (tabX + tabWidth - tabHeight)) - closeWidth;
                } else {
                    closeX = tabX + tabWidth - (closeXY[1] - tabY) - closeHeight;
                    closeY = tabY + (closeXY[0] - (tabX + tabWidth - tabHeight));
                }
                xy = [closeX, closeY];
            } else {
                xy = this.callParent(arguments);
            }

            return xy;
        }
    }
});
