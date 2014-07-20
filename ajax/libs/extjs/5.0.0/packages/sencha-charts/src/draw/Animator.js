/**
 * @class Ext.draw.Animator
 *
 * Singleton class that manages the animation pool.
 */
Ext.define('Ext.draw.Animator', {
    uses: ['Ext.draw.Draw'],
    singleton: true,

    frameCallbacks: {},
    frameCallbackId: 0,
    scheduled: 0,
    frameStartTimeOffset: Ext.now(),
    animations: [],
    running: false,

    /**
     *  Cross platform `animationTime` implementation.
     *  @return {Number}
     */
    animationTime: function () {
        return Ext.AnimationQueue.frameStartTime - this.frameStartTimeOffset;
    },

    /**
     * Adds an animated object to the animation pool.
     *
     * @param {Object} animation The animation descriptor to add to the pool.
     */
    add: function (animation) {
        if (!this.contains(animation)) {
            this.animations.push(animation);
            Ext.draw.Animator.ignite();
            if ('fireEvent' in animation) {
                animation.fireEvent('animationstart', animation);
            }
        }
    },

    /**
     * Removes an animation from the pool.
     * TODO: This is broken when called within `step` method.
     * @param {Object} animation The animation to remove from the pool.
     */
    remove: function (animation) {
        var me = this,
            animations = me.animations,
            i = 0,
            l = animations.length;

        for (; i < l; ++i) {
            if (animations[i] === animation) {
                animations.splice(i, 1);
                if ('fireEvent' in animation) {
                    animation.fireEvent('animationend', animation);
                }
                return;
            }
        }
    },

    /**
     * Returns `true` or `false` whether it contains the given animation or not.
     *
     * @param {Object} animation The animation to check for.
     * @return {Boolean}
     */
    contains: function (animation) {
        return Ext.Array.indexOf(this.animations, animation) > -1;
    },

    /**
     * Returns `true` or `false` whether the pool is empty or not.
     * @return {Boolean}
     */
    empty: function () {
        return this.animations.length === 0;
    },

    /**
     * Given a frame time it will filter out finished animations from the pool.
     *
     * @param {Number} frameTime The frame's start time, in milliseconds.
     */
    step: function (frameTime) {
        var me = this,
            animations = me.animations,
            animation,
            i = 0,
            ln = animations.length;

        for (; i < ln; i++) {
            animation = animations[i];
            animation.step(frameTime);
            if (!animation.animating) {
                animations.splice(i, 1);
                i--;
                ln--;
                if (animation.fireEvent) {
                    animation.fireEvent('animationend');
                }
            }
        }
    },

    /**
     * Register an one-time callback that will be called at the next frame.
     * @param {Function} callback
     * @param {Object} scope
     * @return {String}
     */
    schedule: function (callback, scope) {
        scope = scope || this;
        var id = 'frameCallback' + (this.frameCallbackId++);

        if (Ext.isString(callback)) {
            callback = scope[callback];
        }
        Ext.draw.Animator.frameCallbacks[id] = {fn: callback, scope: scope, once: true};
        this.scheduled++;
        Ext.draw.Animator.ignite();
        return id;
    },

    /**
     * Cancel a registered one-time callback
     * @param {String} id
     */
    cancel: function (id) {
        if (Ext.draw.Animator.frameCallbacks[id] && Ext.draw.Animator.frameCallbacks[id].once) {
            this.scheduled--;
            delete Ext.draw.Animator.frameCallbacks[id];
        }
    },

    /**
     * Register a recursive callback that will be called at every frame.
     *
     * @param {Function} callback
     * @param {Object} scope
     * @return {String}
     */
    addFrameCallback: function (callback, scope) {
        scope = scope || this;
        if (Ext.isString(callback)) {
            callback = scope[callback];
        }
        var id = 'frameCallback' + (this.frameCallbackId++);

        Ext.draw.Animator.frameCallbacks[id] = {fn: callback, scope: scope};
        return id;
    },

    /**
     * Unregister a recursive callback.
     * @param {String} id
     */
    removeFrameCallback: function (id) {
        delete Ext.draw.Animator.frameCallbacks[id];
    },

    /**
     * @private
     */
    fireFrameCallbacks: function () {
        var callbacks = this.frameCallbacks,
            id, fn, cb;

        for (id in callbacks) {
            cb = callbacks[id];
            fn = cb.fn;
            if (Ext.isString(fn)) {
                fn = cb.scope[fn];
            }

            fn.call(cb.scope);

            if (callbacks[id] && cb.once) {
                this.scheduled--;
                delete callbacks[id];
            }
        }
    },

    handleFrame: function() {
        this.step(this.animationTime());
        this.fireFrameCallbacks();
        if (!this.scheduled && this.empty()) {
            Ext.AnimationQueue.stop(this.handleFrame, this);
            this.running = false;
        }
    },

    ignite: function() {
        if (!this.running) {
            this.running = true;
            Ext.AnimationQueue.start(this.handleFrame, this);
            Ext.draw.Draw.updateIOS();
        }
    }
});
