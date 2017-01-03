/**
 */
Ext.define('Ext.layout.container.ColumnSplitter', {
    extend: 'Ext.resizer.Splitter',
    xtype: 'columnsplitter',

    requires: [
        'Ext.layout.container.ColumnSplitterTracker'
    ],

    isSplitter: true,

    synthetic  : true,

    cls : 'x-splitter-vertical',

    orientation: 'vertical',

    collapseDirection: 'left',

    trackerClass: 'Ext.layout.container.ColumnSplitterTracker',

    width: 7,

    height: 1,

    getTrackerConfig: function () {
        var tracker = this.callParent();
        tracker.xclass = this.trackerClass;
        return tracker;
    }
});
