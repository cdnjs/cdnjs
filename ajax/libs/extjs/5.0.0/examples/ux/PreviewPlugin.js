/**
 * The Preview Plugin enables toggle of a configurable preview of all visible records.
 *
 * Note: This plugin does NOT assert itself against an existing RowBody feature and may conflict with
 * another instance of the same plugin.
 */
Ext.define('Ext.ux.PreviewPlugin', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.preview',
    requires: ['Ext.grid.feature.RowBody'],
    
    // private, css class to use to hide the body
    hideBodyCls: 'x-grid-row-body-hidden',
    
    /**
     * @cfg {String} bodyField
     * Field to display in the preview. Must be a field within the Model definition
     * that the store is using.
     */
    bodyField: '',
    
    /**
     * @cfg {Boolean} previewExpanded
     */
    previewExpanded: true,

    /**
     * Plugin may be safely declared on either a panel.Grid or a Grid View/viewConfig
     * @param {Ext.grid.Panel/Ext.view.View} target
     */
    setCmp: function(target) {
        this.callParent(arguments);

        // Resolve grid from view as necessary
        var me = this,
            grid        = me.cmp = target.isXType('gridview') ? target.grid : target,
            bodyField   = me.bodyField,
            hideBodyCls = me.hideBodyCls,
            feature     = Ext.create('Ext.grid.feature.RowBody', {
                grid : grid,
                getAdditionalData: function(data, idx, model, rowValues) {

                    var getAdditionalData = Ext.grid.feature.RowBody.prototype.getAdditionalData,
                        additionalData = {
                            rowBody: data[bodyField],
                            rowBodyCls: grid.getView().previewExpanded ? '' : hideBodyCls
                        };

                    if (Ext.isFunction(getAdditionalData)) {
                        // "this" is the RowBody object hjere. Do not change to "me"
                        Ext.apply(additionalData, getAdditionalData.apply(this, arguments));
                    }
                    return additionalData;
                }
            }),
            initFeature = function(grid, view) {
                view.previewExpanded = me.previewExpanded;

                // By this point, existing features are already in place, so this must be initialized and added
                view.featuresMC.add(feature);
                feature.init(grid);
            };

        // The grid has already created its view
        if (grid.view) {
            initFeature(grid, grid.view);
        }

        // At the time a grid creates its plugins, it has not created all the things
        // it needs to create its view correctly.
        // Process the view and init the RowBody Feature as soon as the view is created.
        else {
            grid.on({
                viewcreated: initFeature,
                single: true
            });
        }
    },

    /**
     * Toggle between the preview being expanded/hidden on all rows
     * @param {Boolean} expanded Pass true to expand the record and false to not show the preview.
     */
    toggleExpanded: function(expanded) {
        var grid = this.getCmp(),
            view = grid && grid.getView(),
            bufferedRenderer = view.bufferedRenderer,
            scrollManager = view.scrollManager;

        if (grid && view && expanded !== view.previewExpanded ) {
            this.previewExpanded = view.previewExpanded = !!expanded;
            view.refreshView();

            // If we are using the touch scroller, ensure that the scroller knows about
            // the correct scrollable range
            if (scrollManager) {
                if (bufferedRenderer) {
                    bufferedRenderer.stretchView(view, bufferedRenderer.getScrollHeight(true));
                } else {
                    scrollManager.refresh(true);
                }
            }
        }
    }
});
