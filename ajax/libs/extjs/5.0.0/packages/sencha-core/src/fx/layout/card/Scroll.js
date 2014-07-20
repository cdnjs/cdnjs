/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Scroll', {
    extend: 'Ext.fx.layout.card.Abstract',

    requires: [
        'Ext.fx.easing.Linear'
    ],

    alias: 'fx.layout.card.scroll',

    config: {
        duration: 150
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    getEasing: function() {
        var easing = this.easing;

        if (!easing) {
            this.easing = easing = new Ext.fx.easing.Linear();
        }

        return easing;
    },

    updateDuration: function(duration) {
        this.getEasing().setDuration(duration);
    },

    onActiveItemChange: function(cardLayout, newItem, oldItem, options, controller) {
        var direction = this.getDirection(),
            easing = this.getEasing(),
            containerElement, inElement, outElement, containerWidth, containerHeight, reverse;

        if (newItem && oldItem) {
            if (this.isAnimating) {
                this.stopAnimation();
            }

            newItem.setWidth('100%');
            newItem.setHeight('100%');

            containerElement = this.getLayout().container.innerElement;
            containerWidth = containerElement.getWidth();
            containerHeight = containerElement.getHeight();

            inElement = newItem.renderElement;
            outElement = oldItem.renderElement;

            this.oldItem = oldItem;
            this.newItem = newItem;
            this.currentEventController = controller;
            this.containerElement = containerElement;
            this.isReverse = reverse = this.getReverse();

            newItem.show();

            if (direction == 'right') {
                direction = 'left';
                this.isReverse = reverse = !reverse;
            }
            else if (direction == 'down') {
                direction = 'up';
                this.isReverse = reverse = !reverse;
            }

            if (direction == 'left') {
                if (reverse) {
                    easing.setConfig({
                        startValue: containerWidth,
                        endValue: 0
                    });

                    containerElement.dom.scrollLeft = containerWidth;
                    outElement.setLeft(containerWidth);
                }
                else {
                    easing.setConfig({
                        startValue: 0,
                        endValue: containerWidth
                    });

                    inElement.setLeft(containerWidth);
                }
            }
            else {
                if (reverse) {
                    easing.setConfig({
                        startValue: containerHeight,
                        endValue: 0
                    });

                    containerElement.dom.scrollTop = containerHeight;
                    outElement.setTop(containerHeight);
                }
                else {
                    easing.setConfig({
                        startValue: 0,
                        endValue: containerHeight
                    });

                    inElement.setTop(containerHeight);
                }
            }

            this.startAnimation();

            controller.pause();
        }
    },

    startAnimation: function() {
        this.isAnimating = true;
        this.getEasing().setStartTime(Date.now());
        Ext.AnimationQueue.start(this.doAnimationFrame, this);
    },

    doAnimationFrame: function() {
        var easing = this.getEasing(),
            direction = this.getDirection(),
            scroll = 'scrollTop',
            value;

        if (direction == 'left' || direction == 'right') {
            scroll = 'scrollLeft';
        }

        if (easing.isEnded) {
            this.stopAnimation();
        }
        else {
            value = easing.getValue();
            this.containerElement.dom[scroll] = value;
        }
    },

    stopAnimation: function() {
        var me = this,
            direction = me.getDirection(),
            scroll = 'setTop',
            oldItem = me.oldItem,
            newItem = me.newItem;

        if (direction == 'left' || direction == 'right') {
            scroll = 'setLeft';
        }

        me.currentEventController.resume();

        if (me.isReverse && oldItem && oldItem.renderElement && oldItem.renderElement.dom) {
            oldItem.renderElement[scroll](null);
        }
        else if (newItem && newItem.renderElement && newItem.renderElement.dom) {
            newItem.renderElement[scroll](null);
        }

        Ext.AnimationQueue.stop(this.doAnimationFrame, this);
        me.isAnimating = false;
        me.fireEvent('animationend', me);
    }
});
