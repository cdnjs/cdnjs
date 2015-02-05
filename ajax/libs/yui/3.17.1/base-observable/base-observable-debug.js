/*
YUI 3.17.1 (build 0eb5a52)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('base-observable', function (Y, NAME) {

    /**
    The `base-observable` submodule adds observability to Base's lifecycle and
    attributes, and also make it an `EventTarget`.

    @module base
    @submodule base-observable
    **/
    var L = Y.Lang,

        DESTROY = "destroy",
        INIT = "init",

        BUBBLETARGETS = "bubbleTargets",
        _BUBBLETARGETS = "_bubbleTargets",

        AttributeObservable = Y.AttributeObservable,
        BaseCore            = Y.BaseCore;

    /**
    Provides an augmentable implementation of lifecycle and attribute events for
    `BaseCore`.

    @class BaseObservable
    @extensionfor BaseCore
    @uses AttributeObservable
    @uses EventTarget
    @since 3.8.0
    **/
    function BaseObservable() {}

    BaseObservable._ATTR_CFG      = AttributeObservable._ATTR_CFG.concat();
    BaseObservable._NON_ATTRS_CFG = ["on", "after", "bubbleTargets"];

    BaseObservable.prototype = {

        /**
         * Initializes Attribute
         *
         * @method _initAttribute
         * @private
         */
        _initAttribute: function() {
            BaseCore.prototype._initAttribute.apply(this, arguments);
            AttributeObservable.call(this);

            this._eventPrefix = this.constructor.EVENT_PREFIX || this.constructor.NAME;
            this._yuievt.config.prefix = this._eventPrefix;
        },

        /**
         * Init lifecycle method, invoked during construction.
         * Fires the init event prior to setting up attributes and
         * invoking initializers for the class hierarchy.
         *
         * @method init
         * @chainable
         * @param {Object} config Object with configuration property name/value pairs
         * @return {Base} A reference to this object
         */
        init: function(config) {

            /**
             * <p>
             * Lifecycle event for the init phase, fired prior to initialization.
             * Invoking the preventDefault() method on the event object provided
             * to subscribers will prevent initialization from occuring.
             * </p>
             * <p>
             * Subscribers to the "after" momemt of this event, will be notified
             * after initialization of the object is complete (and therefore
             * cannot prevent initialization).
             * </p>
             *
             * @event init
             * @preventable _defInitFn
             * @param {EventFacade} e Event object, with a cfg property which
             * refers to the configuration object passed to the constructor.
             */

            // PERF: Using lower level _publish() for
            // critical path performance

            var type = this._getFullType(INIT),
                e = this._publish(type);

            e.emitFacade = true;
            e.fireOnce = true;
            e.defaultTargetOnly = true;
            e.defaultFn = this._defInitFn;

            this._preInitEventCfg(config);

            if (e._hasPotentialSubscribers()) {
                this.fire(type, {cfg: config});
            } else {

                this._baseInit(config);

                // HACK. Major hack actually. But really fast for no-listeners.
                // Since it's fireOnce, subscribers may come along later, so since we're
                // bypassing the event stack the first time, we need to tell the published
                // event that it's been "fired". Could extract it into a CE method?
                e.fired = true;
                e.firedWith = [{cfg:config}];
            }

            return this;
        },

        /**
         * Handles the special on, after and target properties which allow the user to
         * easily configure on and after listeners as well as bubble targets during
         * construction, prior to init.
         *
         * @private
         * @method _preInitEventCfg
         * @param {Object} config The user configuration object
         */
        _preInitEventCfg : function(config) {
            if (config) {
                if (config.on) {
                    this.on(config.on);
                }
                if (config.after) {
                    this.after(config.after);
                }
            }

            var i, l, target,
                userTargets = (config && BUBBLETARGETS in config);

            if (userTargets || _BUBBLETARGETS in this) {
                target = userTargets ? (config && config.bubbleTargets) : this._bubbleTargets;

                if (L.isArray(target)) {
                    for (i = 0, l = target.length; i < l; i++) {
                        this.addTarget(target[i]);
                    }
                } else if (target) {
                    this.addTarget(target);
                }
            }
        },

        /**
         * <p>
         * Destroy lifecycle method. Fires the destroy
         * event, prior to invoking destructors for the
         * class hierarchy.
         * </p>
         * <p>
         * Subscribers to the destroy
         * event can invoke preventDefault on the event object, to prevent destruction
         * from proceeding.
         * </p>
         * @method destroy
         * @return {Base} A reference to this object
         * @chainable
         */
        destroy: function() {
            Y.log('destroy called', 'life', 'base');

            /**
             * <p>
             * Lifecycle event for the destroy phase,
             * fired prior to destruction. Invoking the preventDefault
             * method on the event object provided to subscribers will
             * prevent destruction from proceeding.
             * </p>
             * <p>
             * Subscribers to the "after" moment of this event, will be notified
             * after destruction is complete (and as a result cannot prevent
             * destruction).
             * </p>
             * @event destroy
             * @preventable _defDestroyFn
             * @param {EventFacade} e Event object
             */
            this.publish(DESTROY, {
                fireOnce:true,
                defaultTargetOnly:true,
                defaultFn: this._defDestroyFn
            });
            this.fire(DESTROY);

            this.detachAll();
            return this;
        },

        /**
         * Default init event handler
         *
         * @method _defInitFn
         * @param {EventFacade} e Event object, with a cfg property which
         * refers to the configuration object passed to the constructor.
         * @protected
         */
        _defInitFn : function(e) {
            this._baseInit(e.cfg);
        },

        /**
         * Default destroy event handler
         *
         * @method _defDestroyFn
         * @param {EventFacade} e Event object
         * @protected
         */
        _defDestroyFn : function(e) {
            this._baseDestroy(e.cfg);
        }
    };

    Y.mix(BaseObservable, AttributeObservable, false, null, 1);

    Y.BaseObservable = BaseObservable;


}, '3.17.1', {"requires": ["attribute-observable", "base-core"]});
