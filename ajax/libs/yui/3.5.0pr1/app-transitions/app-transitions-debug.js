YUI.add('app-transitions', function(Y) {

/**
Provides view transitions for `Y.App`.

@submodule app-transitions
@since 3.5.0
**/

var Lang = Y.Lang;

/**
Provides view transitions for `Y.App`.

When this module is used, it will automatically mix itself on to `Y.App` adding
transitions to `activeView` changes.

@class AppTransitions
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

        // TODO: Deep merge?
        this.transitions = config.transitions ?
            Y.merge(this.transitions, config.transitions) : this.transitions;
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Sets which view is visible/active within the application.

    This will set the application's `activeView` attribute to the view instance
    passed-in, or when a view name is provided, the `activeView` attribute will
    be set to either the preserved instance, or a new view instance will be
    created using the passed in `config`.

    A callback function can be specified as either the third or fourth argument,
    and this function will be called after the new `view` is the `activeView`
    and ready to use.

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
      @param {View} view
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

    // -- Protected Event Handlers ---------------------------------------------

    /**
    Handles the application's `activeViewChange` event (which is fired when the
    `activeView` attribute changes) by detaching the old view, attaching the new
    view and transitioning between them.

    The `activeView` attribute is read-only, so the public API to change its
    value is through the `showView()` method.

    TODO: Update docs to talk about transitions.

    @method _afterActiveViewChange
    @param {EventFacade} e
    @protected
    **/
    _afterActiveViewChange: function (e) {
        var newView   = e.newVal,
            oldView   = e.prevVal,
            callback  = e.callback,
            isChild   = this._isChildView(newView, oldView),
            isParent  = !isChild && this._isParentView(newView, oldView),
            prepend   = !!e.prepend || isParent,
            fx        = this.transitions,
            fxConfigs = e.transitions || {},
            fxRemaining;

        // Prevent detaching (thus removing) the view we want to show.
        // Also hard to animate out and in, the same view.
        if (newView === oldView) {
            return callback && callback.call(this, newView);
        }

        // Determine transitions to use.
        if (isChild) {
            fx = fx.toChild;
        } else if (isParent) {
            fx = fx.toParent;
        } else {
            fx = fx.navigate;
        }

        function done() {
            fxRemaining -= 1;

            if (!fxRemaining) {
                // Detach and remove the old view from the DOM.
                this._detachView(oldView);
                // The view swap has happened, transitions have completed.
                callback && callback.call(this, newView);
            }
        }

        // Attach the new active view, and insert into the DOM so it can be
        // transitioned in.
        this._attachView(newView, prepend);

        // Expected to be called-back twice.
        fxRemaining = 2;
        this.transitionView(newView, fx.viewIn, fxConfigs.viewIn, done);
        this.transitionView(oldView, fx.viewOut, fxConfigs.viewOut, done);
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


}, '@VERSION@' ,{requires:['app-base', 'transition']});
