YUI.add('app-transitions', function(Y) {

/**
Provides view transitions for `Y.App`.

@submodule app-transitions
@since 3.5.0
**/

/**
Provides view transitions for `Y.App`.

When this module is used, it will automatically mix itself on to `Y.App` adding
transitions to `activeView` changes.

@class App.Transitions
@since 3.5.0
**/
function AppTransitions() {}

// TODO: API docs.
AppTransitions.ATTRS = {
    transitions: {
        setter: '_setTransitions',
        value : false
    }
};

// TODO: API docs.
AppTransitions.CLASS_NAMES = {
    transitioning: Y.ClassNameManager.getClassName('app', 'transitioning')
};

// TODO: API docs.
AppTransitions.FX = {
    fade: {
        viewIn : 'app:fadeIn',
        viewOut: 'app:fadeOut'
    },

    slideLeft: {
        viewIn : 'app:slideLeft',
        viewOut: 'app:slideLeft'
    },

    slideRight: {
        viewIn : 'app:slideRight',
        viewOut: 'app:slideRight'
    }
};

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
            navigate: 'fade',
            toChild : 'slideLeft',
            toParent: 'slideRight'
        }

    **/
    // TODO: API docs.
    transitions: {
        navigate: 'fade',
        toChild : 'slideLeft',
        toParent: 'slideRight'
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
      @param {Object} [options.transition] The name of the fx registered on
        `Y.App.Transitions.FX` to use, or `false` for no transition.
    @param {Function} [callback] Optional callback Function to call after the
        new `activeView` is ready to use, the function will be passed:
      @param {View} callback.view A reference to the new `activeView`.
    @chainable
    **/
    // Does not override `showView()` but does use additional `options`.

    // -- Protected Methods ----------------------------------------------------

    // TODO: API docs.
    _setTransitions: function (transitions) {
        var defTransitions = this.transitions;

        if (transitions && transitions === true) {
            return Y.merge(defTransitions);
        }

        return transitions;
    }
};

// -- Namespace ----------------------------------------------------------------
Y.App.Transitions = AppTransitions;
Y.Base.mix(Y.App, [AppTransitions]);


}, '@VERSION@' ,{requires:['app-base']});
