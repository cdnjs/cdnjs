/**
 * @private
 */
Ext.define('Ext.util.sizemonitor.Default', {
    extend: 'Ext.util.sizemonitor.Abstract',

    updateElement: function(element) {},

    bindListeners: function(bind) {
        var element = this.getElement().dom;

        if (!element) {
            return;
        }

        if (bind) {
            element.onresize = this.refresh;
        }
        else {
            delete element.onresize;
        }
    },

    getContentBounds: function() {
       return this.getElement().dom.getBoundingClientRect();
    },

    getContentWidth: function() {
        return this.getElement().getWidth();
    },

    getContentHeight: function() {
        return this.getElement().getHeight();
    }
});