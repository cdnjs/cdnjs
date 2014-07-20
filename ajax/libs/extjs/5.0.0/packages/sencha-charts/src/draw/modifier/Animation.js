/**
 * The Animation modifier.
 *
 * Sencha Touch allows users to use transitional animation on sprites. Simply set the duration
 * and easing in the animation modifier, then all the changes to the sprites will be animated.
 *
 * Also, you can use different durations and easing functions on different attributes by using
 * {@link #customDuration} and {@link #customEasings}.
 *
 * By default, an animation modifier will be created during the initialization of a sprite.
 * You can get the modifier of `sprite` by `sprite.fx`.
 *
 */
Ext.define('Ext.draw.modifier.Animation', {
    requires: [
        'Ext.draw.TimingFunctions',
        'Ext.draw.Animator'
    ],
    extend: 'Ext.draw.modifier.Modifier',
    alias: 'modifier.animation',

    config: {
        /**
         * @cfg {Function} easing
         * Default easing function.
         */
        easing: function (x) {
            return x;
        },

        /**
         * @cfg {Number} duration
         * Default duration time (ms).
         */
        duration: 0,

        /**
         * @cfg {Object} customEasings Overrides the default easing function for defined attributes.
         */
        customEasings: {},

        /**
         * @cfg {Object} customDuration Overrides the default duration for defined attributes.
         */
        customDuration: {}
    },

    constructor: function () {
        this.anyAnimation = false;
        this.anySpecialAnimations = false;
        this.animating = 0;
        this.animatingPool = [];
        this.callParent(arguments);
    },

    /**
     * @inheritdoc
     */
    prepareAttributes: function (attr) {
        if (!attr.hasOwnProperty('timers')) {
            attr.animating = false;
            attr.timers = {};
            attr.animationOriginal = Ext.Object.chain(attr);
            attr.animationOriginal.upperLevel = attr;
        }
        if (this._previous) {
            this._previous.prepareAttributes(attr.animationOriginal);
        }
    },

    updateSprite: function (sprite) {
        // Apply the config that was configured in the sprite.
        this.setConfig(sprite.config.fx);
    },

    updateDuration: function (duration) {
        this.anyAnimation = duration > 0;
    },

    applyEasing: function (easing) {
        if (typeof easing === 'string') {
            return Ext.draw.TimingFunctions.easingMap[easing];
        } else {
            return easing;
        }
    },

    applyCustomEasings: function (newCustomEasing, oldCustomEasing) {
        oldCustomEasing = oldCustomEasing || {};
        var attr, attrs, easing, i, ln;

        for (attr in newCustomEasing) {
            easing = newCustomEasing[attr];
            attrs = attr.split(',');
            if (typeof easing === 'string') {
                easing = Ext.draw.TimingFunctions.easingMap[easing];
            }
            for (i = 0, ln = attrs.length; i < ln; i++) {
                oldCustomEasing[attrs[i]] = easing;
            }
        }
        return oldCustomEasing;
    },

    /**
     * Set special easings on the given attributes. E.g.:
     *
     *     circleSprite.fx.setEasingOn('r', 'elasticIn');
     *
     * @param {String/Array} attrs The source attribute(s).
     * @param {String} easing The special easings.
     */
    setEasingOn: function (attrs, easing) {
        attrs = Ext.Array.from(attrs).slice();
        var customEasings = {},
            i = 0,
            ln = attrs.length;

        for (; i < ln; i++) {
            customEasings[attrs[i]] = easing;
        }
        this.setCustomEasings(customEasings);
    },

    /**
     * Remove special easings on the given attributes.
     * @param {String/Array} attrs The source attribute(s).
     */
    clearEasingOn: function (attrs) {
        attrs = Ext.Array.from(attrs, true);
        var i = 0, ln = attrs.length;
        for (; i < ln; i++) {
            delete this._customEasings[attrs[i]];
        }
    },

    applyCustomDuration: function (newCustomDuration, oldCustomDuration) {
        oldCustomDuration = oldCustomDuration || {};
        var attr, duration, attrs, i, ln, anySpecialAnimations = this.anySpecialAnimations;

        for (attr in newCustomDuration) {
            duration = newCustomDuration[attr];
            attrs = attr.split(',');
            anySpecialAnimations = true;

            for (i = 0, ln = attrs.length; i < ln; i++) {
                oldCustomDuration[attrs[i]] = duration;
            }
        }
        this.anySpecialAnimations = anySpecialAnimations;
        return oldCustomDuration;
    },

    /**
     * Set special duration on the given attributes. E.g.:
     *
     *     rectSprite.fx.setDurationOn('height', 2000);
     *
     * @param {String/Array} attrs The source attributes.
     * @param {Number} duration The special duration.
     */
    setDurationOn: function (attrs, duration) {
        attrs = Ext.Array.from(attrs).slice();
        var customDurations = {},
            i = 0,
            ln = attrs.length;

        for (; i < ln; i++) {
            customDurations[attrs[i]] = duration;
        }
        this.setCustomDuration(customDurations);
    },

    /**
     * Remove special easings on the given attributes.
     * @param {Object} attrs The source attributes.
     */
    clearDurationOn: function (attrs) {
        attrs = Ext.Array.from(attrs, true);
        var i = 0, ln = attrs.length;

        for (; i < ln; i++) {
            delete this._customDuration[attrs[i]];
        }
    },

    /**
     * @private
     * Initializes Animator for the animation.
     * @param {Object} attributes The source attributes.
     * @param {String} animating The animating flag.
     */
    setAnimating: function (attributes, animating) {
        var me = this,
            i, j;

        if (attributes.animating !== animating) {
            attributes.animating = animating;
            if (animating) {
                me.animatingPool.push(attributes);
                if (me.animating === 0) {
                    Ext.draw.Animator.add(me);
                }
                me.animating++;
            } else {
                for (i = 0, j = 0; i < me.animatingPool.length; i++) {
                    if (me.animatingPool[i] !== attributes) {
                        me.animatingPool[j++] = me.animatingPool[i];
                    }
                }
                me.animating = me.animatingPool.length = j;
            }
        }
    },

    /**
     * @private
     * Set the attr with given easing and duration.
     * @param {Object} attr The attributes collection.
     * @param {Object} changes The changes that popped up from lower modifier.
     * @return {Object} The changes to pop up.
     */
    setAttrs: function (attr, changes) {
        var timers = attr.timers,
            parsers = this._sprite.self.def._animationProcessors,
            defaultEasing = this._easing,
            defaultDuration = this._duration,
            customDuration = this._customDuration,
            customEasings = this._customEasings,
            anySpecial = this.anySpecialAnimations,
            any = this.anyAnimation || anySpecial,
            original = attr.animationOriginal,
            ignite = false,
            timer, name, newValue, startValue, parser, easing, duration;

        if (!any) {
            // If there is no animation enabled
            // When applying changes to attributes, simply stop current animation
            // and set the value.
            for (name in changes) {
                if (attr[name] === changes[name]) {
                    delete changes[name];
                } else {
                    attr[name] = changes[name];
                }
                delete original[name];
                delete timers[name];
            }
            return changes;
        } else {
            // If any animation
            for (name in changes) {
                newValue = changes[name];
                startValue = attr[name];
                if (newValue !== startValue && any && startValue !== undefined && startValue !== null && (parser = parsers[name])) {
                    // If this property is animating.

                    // Figure out the desired duration and easing.
                    easing = defaultEasing;
                    duration = defaultDuration;
                    if (anySpecial) {
                        // Deducing the easing function and duration
                        if (name in customEasings) {
                            easing = customEasings[name];
                        }
                        if (name in customDuration) {
                            duration = customDuration[name];
                        }
                    }

                    // If the property is animating
                    if (duration) {
                        if (!timers[name]) {
                            timers[name] = {};
                        }

                        timer = timers[name];
                        timer.start = 0;
                        timer.easing = easing;
                        timer.duration = duration;
                        timer.compute = parser.compute;
                        timer.serve = parser.serve || Ext.draw.Draw.reflectFn;

                        if (parser.parseInitial) {
                            var initial = parser.parseInitial(startValue, newValue);
                            timer.source = initial[0];
                            timer.target = initial[1];
                        } else if (parser.parse) {
                            timer.source = parser.parse(startValue);
                            timer.target = parser.parse(newValue);
                        } else {
                            timer.source = startValue;
                            timer.target = newValue;
                        }
                        // The animation started. Change to originalVal.
                        timers[name] = timer;
                        original[name] = newValue;
                        delete changes[name];
                        ignite = true;
                        continue;
                    } else {
                        delete original[name];
                    }
                } else {
                    delete original[name];
                }

                // If the property is not animating.
                delete timers[name];
            }
        }

        if (ignite && !attr.animating) {
            this.setAnimating(attr, true);
        }

        return changes;
    },

    /**
     * @private
     *
     * Update attributes to current value according to current animation time.
     * This method will not effect the values of lower layers, but may delete a
     * value from it.
     * @param {Object} attr The source attributes.
     * @return {Object} the changes to popup.
     */
    updateAttributes: function (attr) {
        if (!attr.animating) {
            return {};
        }
        var changes = {},
            any = false,
            original = attr.animationOriginal,
            timers = attr.timers,
            now = Ext.draw.Animator.animationTime(),
            name, timer, delta;

        // If updated in the same frame, return.
        if (attr.lastUpdate === now) {
            return {};
        }

        for (name in timers) {
            timer = timers[name];
            if (!timer.start) {
                timer.start = now;
                delta = 0;
            } else {
                delta = (now - timer.start) / timer.duration;
            }
            if (delta >= 1) {
                changes[name] = original[name];
                delete original[name];
                delete timers[name];
            } else {
                changes[name] = timer.serve(timer.compute(timer.source, timer.target, timer.easing(delta), attr[name]));
                any = true;
            }
        }
        attr.lastUpdate = now;
        this.setAnimating(attr, any);
        return changes;
    },

    /**
     * @inheritdoc
     */
    pushDown: function (attr, changes) {
        // TODO: Understand why callParent is not possible here, add a comment.
        changes = this.superclass.pushDown.call(this, attr.animationOriginal, changes);
        return this.setAttrs(attr, changes);
    },

    /**
     * @inheritdoc
     */
    popUp: function (attr, changes) {
        attr = attr.upperLevel;
        changes = this.setAttrs(attr, changes);
        if (this._next) {
            return this._next.popUp(attr, changes);
        } else {
            return Ext.apply(attr, changes);
        }
    },

    // This is called as an animated object in `Ext.draw.Animator`.
    step: function () {
        var me = this,
            pool = me.animatingPool.slice(),
            attributes,
            i, ln;

        for (i = 0, ln = pool.length; i < ln; i++) {
            attributes = pool[i];
            var changes = this.updateAttributes(attributes),
                name;

            // Looking for anything in changes
            //noinspection LoopStatementThatDoesntLoopJS
            for (name in changes) {
                if (this._next) {
                    this._next.popUp(attributes, changes);
                }
                break;
            }
        }
    },

    /**
     * Stop all animations effected by this modifier
     */
    stop: function () {
        this.step();

        var me = this,
            pool = me.animatingPool,
            i, ln;

        for (i = 0, ln = pool.length; i < ln; i++) {
            pool[i].animating = false;
        }
        me.animatingPool.length = 0;
        me.animating = 0;
        Ext.draw.Animator.remove(me);
    },

    destroy: function () {
        var me = this;
        me.animatingPool.length = 0;
        me.animating = 0;
    }
});
