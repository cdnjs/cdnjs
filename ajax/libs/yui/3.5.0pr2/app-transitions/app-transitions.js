YUI.add('app-transitions', function(Y) {

/**
Provides view transitions for `Y.App`.

@submodule app-transitions
@since 3.5.0
**/

var Lang    = Y.Lang,
    YObject = Y.Object;

/**
Provides view transitions for `Y.App`.

When this module is used, it will automatically mix itself on to `Y.App` adding
transitions to `activeView` changes.

@class App.Transitions
@since 3.5.0
**/
function AppTransitions() {}

AppTransitions.prototype = {
    // -- Public Properties ----------------------------------------------------

    /**
    Transitions to use when the `activeView` changes.

    Transition configurations contain a two properties: `viewIn` and `viewOut`;
    there exists three configurations that represent the different scenarios of
    the `activeView` changing:

      * `navigate`: The default set of transitions to use when changing the
        `activeView` of the application.

      * `toChild`: The set of transitions to use when the `activeView` changes
        to a named view who's `parent` property references the metadata of the
        previously active view.

      * `toParent`: The set of transitions to use when the `activeView` changes
        to a named view who's metadata is referenced by the previously active
        view's `parent` property.

    With the current state of `Y.Transition`, it is best to used named
    transitions that registered on `Y.Transition.fx`. If `transitions` are
    passed at instantiation time, they will override any transitions set on
    the prototype.

    @property transitions
    @type Object
    @default

        {
            navigate: {
                viewIn : 'app:fadeIn',
                viewOut: 'app:fadeOut'
            },

            toChild: {
                viewIn : 'app:slideLeft',
                viewOut: 'app:slideLeft'
            },

            toParent: {
                viewIn : 'app:slideRight',
                viewOut: 'app:slideRight'
            }
        }

    **/
    transitions: {
        navigate: {
            viewIn : 'app:fadeIn',
            viewOut: 'app:fadeOut'
        },

        toChild: {
            viewIn : 'app:slideLeft',
            viewOut: 'app:slideLeft'
        },

        toParent: {
            viewIn : 'app:slideRight',
            viewOut: 'app:slideRight'
        }
    },

    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        config || (config = {});

        // Requires a truthy value to enable transitions support.
        if (!config.transitions) {
            this.transitions = false;
            return;
        }

        var transitions = {};

        // Merges-in specified transition metadata into local `transitions`
        // object.
        function mergeTransitionConfig(transition, name) {
            transitions[name] = Y.merge(transitions[name], transition);
        }

        // First, each transition in the `transitions` prototype object gets its
        // metadata merged-in, providing the defaults.
        YObject.each(this.transitions, mergeTransitionConfig);

        // Then, each transition in the specified `config.transitions` object
        // gets its metadata merged-in.
        YObject.each(config.transitions, mergeTransitionConfig);

        // The resulting hodgepodge of metadata is then stored as the instance's
        // `transitions` object, and no one's objects were harmed in the making.
        this.transitions = transitions;
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Sets which view is active/visible for the application. This will set the
    app's `activeView` attribute to the specified `view`.

    When a string-name is provided for a view which has been registered on this
    app's `views` object, the referenced metadata will be used and the
    `activeView` will be set to either a preserved view instance, or a new
    instance of the registered view will be created using the specified `config`
    object passed-into this method.

    A callback function can be specified as either the third or fourth argument,
    and this function will be called after the new `view` becomes the
    `activeView`, is rendered to the `viewContainer`, and is ready to use.

    @example
        var app = new Y.App({
            views: {
                users: {
                    // Imagine that `Y.UsersView` has been defined.
                    type: Y.UsersView
                }
            }
        });

        app.route('/users/', function () {
            this.showView('users');
        });

        app.render();
        app.navigate('/uses/'); // => Creates a new `Y.UsersView` and shows it.

    @method showView
    @param {String|View} view The name of a view defined in the `views` object,
      or a view instance.
    @param {Object} [config] Optional configuration to use when creating a new
      view instance.
    @param {Object} [options] Optional object containing any of the following
        properties:
      @param {Boolean} [options.prepend] Whether the new view should be
        prepended instead of appended to the `viewContainer`.
      @param {Object} [options.transitions] An object that contains transition
          configuration overrides for the following properties:
        @param {Object} [options.transitions.viewIn] Transition overrides for
          the view being transitioned-in.
        @param {Object} [options.transitions.viewOut] Transition overrides for
          the view being transitioned-out.
    @param {Function} [callback] Optional callback Function to call after the
        new `activeView` is ready to use, the function will be passed:
      @param {View} callback.view A reference to the new `activeView`.
    @chainable
    **/
    // Does not override `showView()` but does use additional `options`.

    /**
    Transitions a view.

    @method transitionView
    @param {View} view The view to transition.
    @param {String} fx The named transition effect to use which should have be
      registered on the `Y.Transition.fx` object.
    @param {Object} [fxConfig] Optional transition overrides to apply.
    @param {Function} [callback] Optional callback function to call when the
      transition has completed.
    **/
    transitionView: function (view, fx, fxConfig, callback) {
        var self = this;

        if (Lang.isFunction(fxConfig)) {
            callback = fxConfig;
            fxConfig = null;
        }

        function done() {
            callback && callback.call(self);
        }

        if (view) {
            view.get('container').transition(fx, fxConfig, done);
        } else {
            done();
        }
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Returns a transition object containing a named fx for both `viewIn` and
    `viewOut` based on the relationship between the specified `newView` and
    `oldView`.

    @method _getTransition
    @param {View} newView The View being transitioned-in.
    @param {View} oldView The View being transitioned-out.
    @return {Object} The transition object containing a named fx for both
      `viewIn` and `viewOut`.
    @protected
    **/
    _getTransition: function (newView, oldView) {
        var transitions = this.transitions;

        if (!transitions) {
            return null;
        }

        if (this._isChildView(newView, oldView)) {
            return transitions.toChild;
        }

        if (this._isParentView(newView, oldView)) {
            return transitions.toParent;
        }

        return transitions.navigate;
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
    Performs the actual change of the app's `activeView` by attaching the
    `newView` to this app, and detaching the `oldView` from this app using any
    specified `options`.

    The `newView` is attached to the app by rendering it to the `viewContainer`,
    and making this app a bubble target of its events.

    The `oldView` is detached from the app by removing it from the
    `viewContainer`, and removing this app as a bubble target for its events.
    The `oldView` will either be preserved or properly destroyed.

    The `activeView` attribute is read-only and can be changed by calling the
    `showView()` method.

    TODO: Update docs to talk about transitions.

    @method _uiSetActiveView
    @param {View} newView The View which is now this app's `activeView`.
    @param {View} [oldView] The View which was this app's `activeView`.
    @param {Object} [options] Optional object containing any of the following
        properties:
      @param {Boolean} [options.prepend] Whether the new view should be
        prepended instead of appended to the `viewContainer`.
      @param {Function} [callback] Optional callback Function to call after the
        `newView` is ready to use, the function will be passed:
        @param {View} options.callback.view A reference to the `newView`.
    @protected
    **/
    _uiSetActiveView: function (newView, oldView, options) {
        options || (options = {});

        var callback   = options.callback,
            isChild    = this._isChildView(newView, oldView),
            isParent   = !isChild && this._isParentView(newView, oldView),
            prepend    = !!options.prepend || isParent,
            transition = this._getTransition(newView, oldView),
            fxConfigs  = options.transitions || {},
            fx;

        // Prevent detaching (thus removing) the view we want to show.
        // Also hard to animate out and in, the same view.
        if (newView === oldView) {
            return callback && callback.call(this, newView);
        }

        // Attach the new active view, and insert into the DOM so it can be
        // transitioned in.
        this._attachView(newView, prepend);

        // Setup a new stack to run the view transitions in parallel.
        fx = new Y.Parallel({context: this});

        // If `transitions` have been enabled for this app, they are added to
        // the stack of callbacks to wait to be called before continuing.
        if (transition) {
            this.transitionView(newView, transition.viewIn, fxConfigs.viewIn, fx.add());
            this.transitionView(oldView, transition.viewOut, fxConfigs.viewOut, fx.add());
        }

        // Called when view transitions completed, if none were added this will
        // run right away.
        fx.done(function () {
            this._detachView(oldView);
            callback && callback.call(this, newView);
        });
    }
};

Y.AppTransitions = AppTransitions;

// -- Transitions --------------------------------------------------------------
Y.mix(Y.Transition.fx, {
    'app:fadeIn': {
        opacity : 1,
        duration: 0.35,

        on: {
            start: function () {
                // TODO: Cross-fade transition that doesn't require a change in
                // position?

                // var position = this.getStyle('position');
                // if (position !== 'absolute') {
                //     this._transitionPosition = position;
                //     this.setStyle('position', 'absolute');
                // }
                this.setStyle('opacity', 0);
            },

            end: function () {
                // if (this._transitionPosition) {
                //     this.setStyle('position', this._transitionPosition);
                //     delete this._transitionPosition;
                // }
            }
        }
    },

    'app:fadeOut': {
        opacity : 0,
        duration: 0.35,

        on: {
            start: function () {
                // TODO: Cross-fade transition that doesn't require a change in
                // position?

                // var position = this.getStyle('position');
                // if (position !== 'absolute') {
                //     this._transitionPosition = position;
                //     this.setStyle('position', 'absolute');
                // }
            },

            end: function () {
                // if (this._transitionPosition) {
                //     this.setStyle('position', this._transitionPosition);
                //     delete this._transitionPosition;
                // }
            }
        }
    },

    'app:slideLeft': {
        duration : 0.35,
        transform: 'translateX(-100%)',

        on: {
            end: function () {
                this.setStyle('transform', 'none');
            }
        }
    },

    'app:slideRight': {
        duration : 0.35,
        transform: 'translateX(0)',

        on: {
            start: function () {
                this.setStyle('transform', 'translateX(-100%)');
            },

            end: function () {
                this.setStyle('transform', 'none');
            }
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.App.Transitions = AppTransitions;
Y.Base.mix(Y.App, [AppTransitions]);


}, '@VERSION@' ,{requires:['app-base', 'parallel', 'transition']});
