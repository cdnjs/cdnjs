/**
 * @private
 */
Ext.define('Ext.fx.animation.Slide', {

    extend: 'Ext.fx.animation.Abstract',

    alternateClassName: 'Ext.fx.animation.SlideIn',

    alias: ['animation.slide', 'animation.slideIn'],

    config: {
        /**
         * @cfg {String} direction The direction of which the slide animates
         * @accessor
         */
        direction: 'left',

        /**
         * @cfg {Boolean} out True if you want to make this animation slide out, instead of slide in.
         * @accessor
         */
        out: false,

        /**
         * @cfg {Number} offset The offset that the animation should go offscreen before entering (or when exiting)
         * @accessor
         */
        offset: 0,

        /**
         * @cfg
         * @inheritdoc
         */
        easing: 'auto',

        containerBox: 'auto',

        elementBox: 'auto',

        isElementBoxFit: true,

        useCssTransform: true
    },

    reverseDirectionMap: {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left'
    },

    applyEasing: function(easing) {
        if (easing === 'auto') {
            return 'ease-' + ((this.getOut()) ? 'in' : 'out');
        }

        return easing;
    },

    getContainerBox: function() {
        var box = this._containerBox;

        if (box === 'auto') {
            box = this.getElement().getParent().getBox();
        }

        return box;
    },

    getElementBox: function() {
        var box = this._elementBox;

        if (this.getIsElementBoxFit()) {
            return this.getContainerBox();
        }

        if (box === 'auto') {
            box = this.getElement().getBox();
        }

        return box;
    },

    getData: function() {
        var elementBox = this.getElementBox(),
            containerBox = this.getContainerBox(),
            box = elementBox ? elementBox : containerBox,
            from = this.getFrom(),
            to = this.getTo(),
            out = this.getOut(),
            offset = this.getOffset(),
            direction = this.getDirection(),
            useCssTransform = this.getUseCssTransform(),
            reverse = this.getReverse(),
            translateX = 0,
            translateY = 0,
            fromX, fromY, toX, toY;

        if (reverse) {
            direction = this.reverseDirectionMap[direction];
        }

        switch (direction) {
            case this.DIRECTION_UP:
                if (out) {
                    translateY = containerBox.top - box.top - box.height - offset;
                }
                else {
                    translateY = containerBox.bottom - box.bottom + box.height + offset;
                }

                break;

            case this.DIRECTION_DOWN:
                if (out) {
                    translateY = containerBox.bottom - box.bottom + box.height + offset;
                }
                else {
                    translateY = containerBox.top - box.height - box.top - offset;
                }

                break;

            case this.DIRECTION_RIGHT:
                if (out) {
                    translateX = containerBox.right - box.right + box.width + offset;
                }
                else {
                    translateX = containerBox.left - box.left - box.width - offset;
                }

                break;

            case this.DIRECTION_LEFT:
                if (out) {
                    translateX = containerBox.left - box.left - box.width - offset;
                }
                else {
                    translateX = containerBox.right - box.right + box.width + offset;
                }

                break;
        }

        fromX = (out) ? 0 : translateX;
        fromY = (out) ? 0 : translateY;

        if (useCssTransform) {
            from.setTransform({
                translateX: fromX,
                translateY: fromY
            });
        }
        else {
            from.set('left', fromX);
            from.set('top', fromY);
        }

        toX = (out) ? translateX : 0;
        toY = (out) ? translateY : 0;

        if (useCssTransform) {
            to.setTransform({
                translateX: toX,
                translateY: toY
            });
        }
        else {
            to.set('left', toX);
            to.set('top', toY);
        }

        return this.callParent(arguments);
    }
});
