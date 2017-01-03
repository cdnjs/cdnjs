/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Abstract', {
    extend: 'Ext.Evented',
    isAnimation: true,

    config: {
        direction: 'left',

        duration: null,

        reverse: null,

        layout: null
    },

    updateLayout: function() {
        this.enable();
    },

    enable: function() {
        var layout = this.getLayout();

        if (layout) {
            layout.onBefore('activeitemchange', 'onActiveItemChange', this);
        }
    },

    disable: function() {
        var layout = this.getLayout();

        if (this.isAnimating) {
            this.stopAnimation();
        }

        if (layout) {
            layout.unBefore('activeitemchange', 'onActiveItemChange', this);
        }
    },

    onActiveItemChange: Ext.emptyFn,

    destroy: function() {
        var layout = this.getLayout();

        if (this.isAnimating) {
            this.stopAnimation();
        }

        if (layout) {
            layout.unBefore('activeitemchange', 'onActiveItemChange', this);
        }
        this.setLayout(null);

        if (this.observableId) {
            this.fireEvent('destroy', this);
            this.clearListeners();
            this.clearManagedListeners();
        }

//        this.callSuper(arguments);
    }
});
