/**
 * @private
 */
Ext.define('Ext.fx.layout.card.ScrollCover', {
    extend: 'Ext.fx.layout.card.Scroll',

    alias: 'fx.layout.card.scrollcover',

    onActiveItemChange: function(cardLayout, inItem, outItem, options, controller) {
        var containerElement, containerSize, xy, animConfig,
            inTranslate, outTranslate;

        this.lastController = controller;
        this.inItem = inItem;

        if (inItem && outItem) {
            containerElement = this.getLayout().container.innerElement;

            containerSize = containerElement.getSize();
            xy = this.calculateXY(containerSize);
            animConfig = {
                easing: this.getEasing(),
                duration: this.getDuration()
            };

            inItem.renderElement.dom.style.setProperty('visibility', 'hidden', 'important');
            inTranslate = inItem.setTranslatable(true).getTranslatable();
            outTranslate = outItem.setTranslatable(true).getTranslatable();

            outTranslate.translate({ x: 0, y: 0});
//            outItem.setTranslate(null);
            inTranslate.translate({ x: xy.left, y: xy.top});
            inTranslate.getWrapper().dom.style.setProperty('z-index', '100', 'important');
            inItem.show();

            inTranslate.on({
                animationstart: 'onInAnimationStart',
                animationend: 'onInAnimationEnd',
                scope: this
            });
            inTranslate.translateAnimated({ x: 0, y: 0}, animConfig);

            controller.pause();
        }
    },

    onInAnimationStart: function() {
        this.inItem.renderElement.dom.style.removeProperty('visibility');
    },

    onInAnimationEnd: function() {
        this.inItem.getTranslatable().getWrapper().dom.style.removeProperty('z-index'); // Remove this when we can remove translatable
//        this.inItem.setTranslatable(null);
        this.lastController.resume();
    }
});
