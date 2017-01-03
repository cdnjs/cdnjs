/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Style', {

    extend: 'Ext.fx.layout.card.Abstract',

    requires: [
        'Ext.fx.Animation'
    ],

    config: {
        inAnimation: {
            before: {
                visibility: null
            },
            preserveEndState: false,
            replacePrevious: true
        },

        outAnimation: {
            preserveEndState: false,
            replacePrevious: true
        }
    },

    constructor: function(config) {
        var inAnimation, outAnimation;

        this.callParent([config]);

        this.endAnimationCounter = 0;

        inAnimation = this.getInAnimation();
        outAnimation = this.getOutAnimation();

        inAnimation.on('animationend', 'incrementEnd', this);
        outAnimation.on('animationend', 'incrementEnd', this);
    },

    updateDirection: function(direction) {
        this.getInAnimation().setDirection(direction);
        this.getOutAnimation().setDirection(direction);
    },

    updateDuration: function(duration) {
        this.getInAnimation().setDuration(duration);
        this.getOutAnimation().setDuration(duration);
    },

    updateReverse: function(reverse) {
        this.getInAnimation().setReverse(reverse);
        this.getOutAnimation().setReverse(reverse);
    },

    incrementEnd: function() {
        this.endAnimationCounter++;

        if (this.endAnimationCounter > 1) {
            this.endAnimationCounter = 0;
            this.fireEvent('animationend', this);
        }
    },

    applyInAnimation: function(animation, inAnimation) {
        return Ext.factory(animation, Ext.fx.Animation, inAnimation);
    },

    applyOutAnimation: function(animation, outAnimation) {
        return Ext.factory(animation, Ext.fx.Animation, outAnimation);
    },

    updateInAnimation: function(animation) {
        animation.setScope(this);
    },

    updateOutAnimation: function(animation) {
        animation.setScope(this);
    },

    onActiveItemChange: function(cardLayout, newItem, oldItem, options, controller) {
        var inAnimation = this.getInAnimation(),
            outAnimation = this.getOutAnimation(),
            inElement, outElement;

        if (newItem && oldItem && oldItem.isPainted()) {
            inElement = newItem.renderElement;
            outElement = oldItem.renderElement;

            inAnimation.setElement(inElement);
            outAnimation.setElement(outElement);

            outAnimation.setOnBeforeEnd(function(element, interrupted) {
                if (interrupted || Ext.Animator.hasRunningAnimations(element)) {
                    controller.firingArguments[1] = null;
                    controller.firingArguments[2] = null;
                }
            });
            outAnimation.setOnEnd(function() {
                controller.resume();
            });

            inElement.dom.style.setProperty('visibility', 'hidden', 'important');
            newItem.show();

            Ext.Animator.run([outAnimation, inAnimation]);
            controller.pause();
        }
    },

    destroy:  function () {
        Ext.destroy(this.getInAnimation(), this.getOutAnimation());

        this.callParent(arguments);
    }
});
