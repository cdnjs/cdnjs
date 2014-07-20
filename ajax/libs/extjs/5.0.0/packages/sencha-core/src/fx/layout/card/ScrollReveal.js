/**
 * @private
 */
Ext.define('Ext.fx.layout.card.ScrollReveal', {
    extend: 'Ext.fx.layout.card.Scroll',

    alias: 'fx.layout.card.scrollreveal',

    onActiveItemChange: function(cardLayout, inItem, outItem, options, controller) {
        var containerElement, containerSize, xy, animConfig,
            outTranslate, inTranslate;

        this.lastController = controller;
        this.outItem = outItem;
        this.inItem = inItem;

        if (inItem && outItem) {
            containerElement = this.getLayout().container.innerElement;

            containerSize = containerElement.getSize();
            xy = this.calculateXY(containerSize);
            animConfig = {
                easing: this.getEasing(),
                duration: this.getDuration()
            };

            outTranslate = outItem.setTranslatable(true).getTranslatable();
            inTranslate = inItem.setTranslatable(true).getTranslatable();
            outTranslate.getWrapper().dom.style.setProperty('z-index', '100', 'important');
            outTranslate.translate({ x: 0, y: 0});
            inTranslate.translate({ x: 0, y: 0});

            inItem.show();

            outTranslate.on({
                animationend: 'onOutAnimationEnd',
                scope: this
            });

            outTranslate.translateAnimated({ x: xy.x, y: xy.y}, animConfig);

            controller.pause();
        }
    },

    onOutAnimationEnd: function() {
        this.outItem.getTranslatable().getWrapper().dom.style.removeProperty('z-index'); // Remove this when we can remove translatable
//        this.outItem.setTranslatable(null);
        this.lastController.resume();
    }
});
