/**
 * Plugin for PagingToolbar which replaces the textfield input with a slider
 */
Ext.define('Ext.ux.SlidingPager', {
    requires: [
        'Ext.slider.Single',
        'Ext.slider.Tip'
    ],

    /**
     * Creates new SlidingPager.
     * @param {Object} config Configuration options
     */
    constructor : function(config) {
        if (config) {
            Ext.apply(this, config);
        }
    },

    init : function(pbar){
        var idx = pbar.items.indexOf(pbar.child("#inputItem")),
            slider;

        Ext.each(pbar.items.getRange(idx - 2, idx + 2), function(c){
            c.hide();
        });

        slider = Ext.create('Ext.slider.Single', {
            width: 114,
            minValue: 1,
            maxValue: 1,
            hideLabel: true,
            tipText: function(thumb) {
                return Ext.String.format('Page <b>{0}</b> of <b>{1}</b>', thumb.value, thumb.slider.maxValue);
            },
            listeners: {
                changecomplete: function(s, v){
                    pbar.store.loadPage(v);
                }
            }
        });

        pbar.insert(idx + 1, slider);

        pbar.on({
            change: function(pb, data){
                slider.setMaxValue(data.pageCount);
                slider.setValue(data.currentPage);
            }
        });
    }
});
