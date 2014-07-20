/**
 * This animation class is a mixin.
 *
 * Ext.util.Animate provides an API for the creation of animated transitions of properties and styles.
 * This class is used as a mixin and currently applied to {@link Ext.dom.Element}, {@link Ext.CompositeElement},
 * {@link Ext.draw.sprite.Sprite}, {@link Ext.draw.sprite.Composite}, and {@link Ext.Component}.  Note that Components
 * have a limited subset of what attributes can be animated such as top, left, x, y, height, width, and
 * opacity (color, paddings, and margins can not be animated).
 *
 * ## Animation Basics
 *
 * All animations require three things - `easing`, `duration`, and `to` (the final end value for each property)
 * you wish to animate. Easing and duration are defaulted values specified below.
 * Easing describes how the intermediate values used during a transition will be calculated.
 * {@link Ext.fx.Anim#easing Easing} allows for a transition to change speed over its duration.
 * You may use the defaults for easing and duration, but you must always set a
 * {@link Ext.fx.Anim#to to} property which is the end value for all animations.
 *
 * Popular element 'to' configurations are:
 *
 *  - opacity
 *  - x
 *  - y
 *  - color
 *  - height
 *  - width
 *
 * Popular sprite 'to' configurations are:
 *
 *  - translation
 *  - path
 *  - scale
 *  - stroke
 *  - rotation
 *
 * The default duration for animations is 250 (which is a 1/4 of a second).  Duration is denoted in
 * milliseconds.  Therefore 1 second is 1000, 1 minute would be 60000, and so on. The default easing curve
 * used for all animations is 'ease'.  Popular easing functions are included and can be found in {@link Ext.fx.Anim#easing Easing}.
 *
 * For example, a simple animation to fade out an element with a default easing and duration:
 *
 *     var p1 = Ext.get('myElementId');
 *
 *     p1.animate({
 *         to: {
 *             opacity: 0
 *         }
 *     });
 *
 * To make this animation fade out in a tenth of a second:
 *
 *     var p1 = Ext.get('myElementId');
 *
 *     p1.animate({
 *        duration: 100,
 *         to: {
 *             opacity: 0
 *         }
 *     });
 *
 * ## Animation Queues
 *
 * By default all animations are added to a queue which allows for animation via a chain-style API.
 * For example, the following code will queue 4 animations which occur sequentially (one right after the other):
 *
 *     p1.animate({
 *         to: {
 *             x: 500
 *         }
 *     }).animate({
 *         to: {
 *             y: 150
 *         }
 *     }).animate({
 *         to: {
 *             backgroundColor: '#f00'  //red
 *         }
 *     }).animate({
 *         to: {
 *             opacity: 0
 *         }
 *     });
 *
 * You can change this behavior by calling the {@link Ext.util.Animate#syncFx syncFx} method and all
 * subsequent animations for the specified target will be run concurrently (at the same time).
 *
 *     p1.syncFx();  //this will make all animations run at the same time
 *
 *     p1.animate({
 *         to: {
 *             x: 500
 *         }
 *     }).animate({
 *         to: {
 *             y: 150
 *         }
 *     }).animate({
 *         to: {
 *             backgroundColor: '#f00'  //red
 *         }
 *     }).animate({
 *         to: {
 *             opacity: 0
 *         }
 *     });
 *
 * This works the same as:
 *
 *     p1.animate({
 *         to: {
 *             x: 500,
 *             y: 150,
 *             backgroundColor: '#f00'  //red
 *             opacity: 0
 *         }
 *     });
 *
 * The {@link Ext.util.Animate#stopAnimation stopAnimation} method can be used to stop any
 * currently running animations and clear any queued animations.
 *
 * ## Animation Keyframes
 *
 * You can also set up complex animations with {@link Ext.fx.Anim#keyframes keyframes} which follow the
 * CSS3 Animation configuration pattern. Note rotation, translation, and scaling can only be done for sprites.
 * The previous example can be written with the following syntax:
 *
 *     p1.animate({
 *         duration: 1000,  //one second total
 *         keyframes: {
 *             25: {     //from 0 to 250ms (25%)
 *                 x: 0
 *             },
 *             50: {   //from 250ms to 500ms (50%)
 *                 y: 0
 *             },
 *             75: {  //from 500ms to 750ms (75%)
 *                 backgroundColor: '#f00'  //red
 *             },
 *             100: {  //from 750ms to 1sec
 *                 opacity: 0
 *             }
 *         }
 *     });
 *
 * ## Animation Events
 *
 * Each animation you create has events for {@link Ext.fx.Anim#beforeanimate beforeanimate},
 * {@link Ext.fx.Anim#afteranimate afteranimate}, and {@link Ext.fx.Anim#lastframe lastframe}.
 * Keyframed animations adds an additional {@link Ext.fx.Animator#keyframe keyframe} event which
 * fires for each keyframe in your animation.
 *
 * All animations support the {@link Ext.util.Observable#listeners listeners} configuration to attact functions to these events.
 *
 *     startAnimate: function() {
 *         var p1 = Ext.get('myElementId');
 *         p1.animate({
 *            duration: 100,
 *             to: {
 *                 opacity: 0
 *             },
 *             listeners: {
 *                 beforeanimate:  function() {
 *                     // Execute my custom method before the animation
 *                     this.myBeforeAnimateFn();
 *                 },
 *                 afteranimate: function() {
 *                     // Execute my custom method after the animation
 *                     this.myAfterAnimateFn();
 *                 },
 *                 scope: this
 *         });
 *     },
 *     myBeforeAnimateFn: function() {
 *       // My custom logic
 *     },
 *     myAfterAnimateFn: function() {
 *       // My custom logic
 *     }
 *
 * Due to the fact that animations run asynchronously, you can determine if an animation is currently
 * running on any target by using the {@link Ext.util.Animate#getActiveAnimation getActiveAnimation}
 * method.  This method will return false if there are no active animations or return the currently
 * running {@link Ext.fx.Anim} instance.
 *
 * In this example, we're going to wait for the current animation to finish, then stop any other
 * queued animations before we fade our element's opacity to 0:
 *
 *     var curAnim = p1.getActiveAnimation();
 *     if (curAnim) {
 *         curAnim.on('afteranimate', function() {
 *             p1.stopAnimation();
 *             p1.animate({
 *                 to: {
 *                     opacity: 0
 *                 }
 *             });
 *         });
 *     }
 */
Ext.define('Ext.util.Animate', {
    mixinId: 'animate',

    requires: [
        'Ext.fx.Manager', 
        'Ext.fx.Anim'
    ],
    
    isAnimate: true,

    /**
     * Performs custom animation on this object.
     *
     * This method is applicable to both the {@link Ext.Component Component} class and the {@link Ext.draw.sprite.Sprite Sprite}
     * class. It performs animated transitions of certain properties of this object over a specified timeline.
     *
     * ### Animating a {@link Ext.Component Component}
     *
     * When animating a Component, the following properties may be specified in `from`, `to`, and `keyframe` objects:
     *
     *   - `x` - The Component's page X position in pixels.
     *
     *   - `y` - The Component's page Y position in pixels
     *
     *   - `left` - The Component's `left` value in pixels.
     *
     *   - `top` - The Component's `top` value in pixels.
     *
     *   - `width` - The Component's `width` value in pixels.
     *
     *   - `height` - The Component's `height` value in pixels.
     *
     *   - `dynamic` - Specify as true to update the Component's layout (if it is a Container) at every frame of the animation.
     *     *Use sparingly as laying out on every intermediate size change is an expensive operation.*
     *
     * For example, to animate a Window to a new size, ensuring that its internal layout and any shadow is correct:
     *
     *     myWindow = Ext.create('Ext.window.Window', {
     *         title: 'Test Component animation',
     *         width: 500,
     *         height: 300,
     *         layout: {
     *             type: 'hbox',
     *             align: 'stretch'
     *         },
     *         items: [{
     *             title: 'Left: 33%',
     *             margin: '5 0 5 5',
     *             flex: 1
     *         }, {
     *             title: 'Left: 66%',
     *             margin: '5 5 5 5',
     *             flex: 2
     *         }]
     *     });
     *     myWindow.show();
     *     myWindow.header.el.on('click', function() {
     *         myWindow.animate({
     *             to: {
     *                 width: (myWindow.getWidth() == 500) ? 700 : 500,
     *                 height: (myWindow.getHeight() == 300) ? 400 : 300
     *             }
     *         });
     *     });
     *
     * For performance reasons, by default, the internal layout is only updated when the Window reaches its final `"to"`
     * size. If dynamic updating of the Window's child Components is required, then configure the animation with
     * `dynamic: true` and the two child items will maintain their proportions during the animation.
     *
     * @param {Object} config  Configuration for {@link Ext.fx.Anim}.
     * Note that the {@link Ext.fx.Anim#to to} config is required.
     * @return {Object} this
     */
    animate: function(animObj) {
        var me = this;
        if (Ext.fx.Manager.hasFxBlock(me.id)) {
            return me;
        }
        Ext.fx.Manager.queueFx(new Ext.fx.Anim(me.anim(animObj)));
        return this;
    },

    // @private - process the passed fx configuration.
    anim: function(config) {
        if (!Ext.isObject(config)) {
            return (config) ? {} : false;
        }

        var me = this;

        if (config.stopAnimation) {
            me.stopAnimation();
        }

        Ext.applyIf(config, Ext.fx.Manager.getFxDefaults(me.id));

        return Ext.apply({
            target: me,
            paused: true
        }, config);
    },
    
    // @private - get animation properties
    getAnimationProps: function() {
        var me = this,
            layout = me.layout;
        
        return layout && layout.animate ? layout.animate : {};
    },

    /**
     * Stops any running effects and clears this object's internal effects queue if it contains any additional effects
     * that haven't started yet.
     * @deprecated 4.0 Replaced by {@link #stopAnimation}
     * @return {Ext.dom.Element} The Element
     * @method
     */
    stopFx: Ext.Function.alias(Ext.util.Animate, 'stopAnimation'),

    /**
     * Stops any running effects and clears this object's internal effects queue if it contains any additional effects
     * that haven't started yet.
     * @return {Ext.dom.Element} The Element
     */
    stopAnimation: function() {
        Ext.fx.Manager.stopAnimation(this.id);
        return this;
    },

    /**
     * Ensures that all effects queued after syncFx is called on this object are run concurrently. This is the opposite
     * of {@link #sequenceFx}.
     * @return {Object} this
     */
    syncFx: function() {
        Ext.fx.Manager.setFxDefaults(this.id, {
            concurrent: true
        });
        return this;
    },

    /**
     * Ensures that all effects queued after sequenceFx is called on this object are run in sequence. This is the
     * opposite of {@link #syncFx}.
     * @return {Object} this
     */
    sequenceFx: function() {
        Ext.fx.Manager.setFxDefaults(this.id, {
            concurrent: false
        });
        return this;
    },

    /**
     * @deprecated 4.0 Replaced by {@link #getActiveAnimation}
     * @inheritdoc Ext.util.Animate#getActiveAnimation
     * @method
     */
    hasActiveFx: Ext.Function.alias(Ext.util.Animate, 'getActiveAnimation'),

    /**
     * Returns the current animation if this object has any effects actively running or queued, else returns false.
     * @return {Ext.fx.Anim/Boolean} Anim if element has active effects, else false
     */
    getActiveAnimation: function() {
        return Ext.fx.Manager.getActiveAnimation(this.id);
    }
});
