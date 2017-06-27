YUI.add('app-transitions', function(Y) {

/**
Provides view transitions for `Y.App` in browsers which support native CSS3
transitions.

**Note:** When this module is used, `Y.App.Transitions` will automatically mix
itself in to `Y.App`.

@submodule app-transitions
@since 3.5.0
**/

/**
Provides view transitions for `Y.App` in browsers which support native CSS3
transitions.

View transitions provide an nice way to move from one "page" to the next that is
both pleasant to the user and helps to communicate a hierarchy between sections
of an application.

When this module is used, it will automatically mix itself in to `Y.App` and
transition between `activeView` changes using the following effects:

  * **`fade`**: Cross-fades between the old an new active views.

  * **`slideLeft`**: The old and new active views are positioned next to each
    other and both slide to the left.

  * **`slideRight`**: The old and new active views are positioned next to each
    other and both slide to the right.

**Note:** Transitions are an opt-in feature and are enabled via an app's
`transitions` attribute.

@class App.Transitions
@uses App.TransitionsNative
@since 3.5.0
**/
function AppTransitions() {}

AppTransitions.ATTRS = {
    /**
    Whether or not this application should use view transitions, and if so then
    which ones or `true` for the defaults which are specified by the
    `transitions` prototype property.

    **Note:** Transitions are an opt-in feature and will only be used in
    browsers which support native CSS3 transitions.

    @attribute transitions
    @type Boolean|Object
    @default false
    @since 3.5.0
    **/
    transitions: {
        setter: '_setTransitions',
        value : false
    }
};

/**
CSS classes used by `App.Transitions`.

When an app is transitioning between `activeView`s, its `container` node will
have the "yui3-app-transitioning" CSS class added.

@property CLASS_NAMES
@type Object
@static
@since 3.5.0
**/
AppTransitions.CLASS_NAMES = {
    transitioning: Y.ClassNameManager.getClassName('app', 'transitioning')
};

/**
Collect of transitions -> fx.

A transition (e.g. "fade") is a simple name given to a configuration of fx to
apply, consisting of `viewIn` and `viewOut` properties who's values are names of
fx registered on `Y.Transition.fx`.

By default transitions: `fade`, `slideLeft`, and `slideRight` have fx defined.

@property FX
@type Object
@static
@since 3.5.0
**/
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
    Default transitions to use when the `activeView` changes.

    The following are types of changes for which transitions can be defined that
    correspond to the relationship between the new and previous `activeView`:

      * `navigate`: The default transition to use when changing the `activeView`
        of the application.

      * `toChild`: The transition to use when the new `activeView` is configured
        as a child of the previously active view via its `parent` property as
        defined in this app's `views`.

      * `toParent`: The transition to use when the new `activeView` is
        configured as the `parent` of the previously active view as defined in
        this app's `views`.

    **Note:** Transitions are an opt-in feature and will only be used in
    browsers which support native CSS3 transitions.

    @property transitions
    @type Object
    @default
        {
            navigate: 'fade',
            toChild : 'slideLeft',
            toParent: 'slideRight'
        }
    @since 3.5.0
    **/
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
      @param {Function} [options.callback] Optional callback function to call
        after new `activeView` is ready to use, the function will be passed:
          @param {View} options.callback.view A reference to the new
            `activeView`.
      @param {Boolean} [options.prepend] Whether the new view should be
        prepended instead of appended to the `viewContainer`.
      @param {Boolean|String} [options.transition] Optional transition override.
        A transition can be specified which will override the default, or
        `false` for no transition.
    @param {Function} [callback] Optional callback Function to call after the
        new `activeView` is ready to use. **Note:** this will override
        `options.callback`. The function will be passed the following:
      @param {View} callback.view A reference to the new `activeView`.
    @chainable
    @see App.Base.showView()
    **/
    // Does not override `showView()` but does use `options.transitions`.

    // -- Protected Methods ----------------------------------------------------

    /**
    Setter for `transitions` attribute.

    When specified as `true`, the defaults will be use as specified by the
    `transitions` prototype property.

    @method _setTransitions
    @param {Boolean|Object} transitions The new `transitions` attribute value.
    @return {Mixed} The processed value which represents the new state.
    @protected
    @since 3.5.0
    **/
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
