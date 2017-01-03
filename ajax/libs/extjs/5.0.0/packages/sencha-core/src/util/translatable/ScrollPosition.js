/**
 * @private
 *
 * Scroll position implementation
 */
Ext.define('Ext.util.translatable.ScrollPosition', {
    extend: 'Ext.util.translatable.Dom',

    type: 'scrollposition',

    config: {
        useWrapper: true
    },

    getWrapper: function() {
        var wrapper = this.wrapper,
            element = this.getElement(),
            container;

        if (!wrapper) {
            container = element.getParent();

            if (!container) {
                return null;
            }

            if (container.hasCls(Ext.baseCSSPrefix + 'translatable-hboxfix')) {
                container = container.getParent();
            }

            if (this.getUseWrapper()) {
                wrapper = element.wrap();
            }
            else {
                wrapper = container;
            }

            element.addCls('x-translatable');
            wrapper.addCls('x-translatable-container');

            this.wrapper = wrapper;

            wrapper.on('painted', function() {
                if (!this.isAnimating) {
                    this.refresh();
                }
            }, this);

            this.refresh();
        }

        return wrapper;
    },

    doTranslate: function(x, y) {
        var wrapper = this.getWrapper(),
            dom;

        if (wrapper) {
            dom = wrapper.dom;

            if (typeof x == 'number') {
                dom.scrollLeft = 500000 - x;
            }

            if (typeof y == 'number') {
                dom.scrollTop = 500000 - y;
            }
        }
    },

    destroy: function() {
        var element = this.getElement(),
            wrapper = this.wrapper;

        if (wrapper) {
            if (!element.isDestroyed) {
                if (this.getUseWrapper()) {
                    wrapper.doReplaceWith(element);
                }
                element.removeCls('x-translatable');
            }
            if (!wrapper.isDestroyed) {
                wrapper.removeCls('x-translatable-container');
                wrapper.un('painted', 'refresh', this);
            }

            delete this.wrapper;
            delete this._element;
        }

        this.callSuper();
    }

});
