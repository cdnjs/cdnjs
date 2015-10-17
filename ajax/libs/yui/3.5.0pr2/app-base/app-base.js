YUI.add('app-base', function(Y) {

/**
The App Framework provides simple MVC-like building blocks (models, model lists,
views, and URL-based routing) for writing single-page JavaScript applications.

@main app
@module app
@since 3.4.0
**/

/**
Provides a top-level application component which manages navigation and views.

@submodule app-base
@since 3.5.0
**/

// TODO: Better handling of lifecycle for registered views:
//
//   * Seems like any view created via `createView` should listen for the view's
//     `destroy` event and use that to remove it from the `_viewsInfoMap`. I
//     should look at what ModelList does for Models as a reference.
//
//   * Should we have a companion `destroyView()` method? Maybe this wouldn't be
//     needed if we have a `getView(name, create)` method, and already doing the
//     above? We could do `app.getView('foo').destroy()` and it would be removed
//     from the `_viewsInfoMap` as well.

var Lang     = Y.Lang,
    PjaxBase = Y.PjaxBase,
    Router   = Y.Router,
    View     = Y.View,
    YObject  = Y.Object,

    win = Y.config.win,

    App;

/**
Provides a top-level application component which manages navigation and views.

This gives you a foundation and structure on which to build your application; it
combines robust URL navigation with powerful routing and flexible view
management.

@class App.Base
@param {Object} [config] The following are configuration properties that can be
    specified _in addition_ to default attribute values and the non-attribute
    properties provided by `Y.Base`:
  @param {Object} [config.views] Hash of view-name to metadata used to
    declaratively describe an application's views and their relationship with
    the app and other views. The views specified here will override any defaults
    provided by the `views` object on the `prototype`.
@constructor
@extends Base
@uses View
@uses Router
@uses PjaxBase
@since 3.5.0
**/
App = Y.Base.create('app', Y.Base, [View, Router, PjaxBase], {
    // -- Public Properties ----------------------------------------------------

    /**
    Hash of view-name to metadata used to declaratively describe an
    application's views and their relationship with the app and its other views.

    The view metadata is composed of Objects keyed to a view-name that can have
    any or all of the following properties:

      * `type`: Function or a string representing the view constructor to use to
        create view instances. If a string is used, the constructor function is
        assumed to be on the `Y` object; e.g. `"SomeView"` -> `Y.SomeView`.

      * `preserve`: Boolean for whether the view instance should be retained. By
        default, the view instance will be destroyed when it is no longer the
        `activeView`. If `true` the view instance will simply be `removed()`
        from the DOM when it is no longer active. This is useful when the view
        is frequently used and may be expensive to re-create.

      * `parent`: String to another named view in this hash that represents the
        parent view within the application's view hierarchy; e.g. a `"photo"`
        view could have `"album"` has its `parent` view. This parent/child
        relationship is a useful cue for things like transitions.

      * `instance`: Used internally to manage the current instance of this named
        view. This can be used if your view instance is created up-front, or if
        you would rather manage the View lifecycle, but you probably should just
        let this be handled for you.

    If `views` are specified at instantiation time, the metadata in the `views`
    Object here will be used as defaults when creating the instance's `views`.

    Every `Y.App` instance gets its own copy of a `views` object so this Object
    on the prototype will not be polluted.

    @example
        // Imagine that `Y.UsersView` and `Y.UserView` have been defined.
        var app = new Y.App({
            views: {
                users: {
                    type    : Y.UsersView,
                    preserve: true
                },

                user: {
                    type  : Y.UserView,
                    parent: 'users'
                }
            }
        });

    @property views
    @type Object
    @default `{}`
    **/
    views: {},

    // -- Protected Properties -------------------------------------------------

    /**
    Map of view instance id (via `Y.stamp()`) to view-info object in `views`.

    This mapping is used to tie a specific view instance back to its metadata by
    adding a reference to the the related view info on the `views` object.

    @property _viewInfoMap
    @type Object
    @default {}
    @protected
    **/

    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        config || (config = {});

        var views = {};

        // Merges-in specified view metadata into local `views` object.
        function mergeViewConfig(view, name) {
            views[name] = Y.merge(views[name], view);
        }

        // First, each view in the `views` prototype object gets its metadata
        // merged-in, providing the defaults.
        YObject.each(this.views, mergeViewConfig);

        // Then, each view in the specified `config.views` object gets its
        // metadata merged-in.
        YObject.each(config.views, mergeViewConfig);

        // The resulting hodgepodge of metadata is then stored as the instance's
        // `views` object, and no one's objects were harmed in the making.
        this.views = views;

        this._viewInfoMap = {};

        this.after('activeViewChange', this._afterActiveViewChange);

        // PjaxBase will bind click events when `html5` is `true`, so this just
        // forces the binding when `serverRouting` and `html5` are both falsy.
        if (!this.get('serverRouting')) {
            this._pjaxBindUI();
        }
    },

    // TODO: `destructor` to destory the `activeView`?

    // -- Public Methods -------------------------------------------------------

    /**
    Creates and returns this apps's container node from the specified selector
    string, DOM element, or existing `Y.Node` instance. This method is called
    internally when the app is initialized.

    This node is also stamped with the CSS class specified by
    `Y.App.Base.CSS_CLASS`.

    By default, the created node is _not_ added to the DOM automatically.

    @method create
    @param {String|Node|HTMLElement} container Selector string, `Y.Node`
        instance, or DOM element to use as the container node.
    @return {Node} Node instance of the created container node.
    **/
    create: function () {
        var container = View.prototype.create.apply(this, arguments);
        return container && container.addClass(App.CSS_CLASS);
    },

    /**
    Creates and returns a new view instance using the provided `name` to look up
    the view info metadata defined in the `views` object. The passed-in `config`
    object is passed to the view constructor function.

    This function also maps a view instance back to its view info metadata.

    @method createView
    @param {String} name The name of a view defined on the `views` object.
    @param {Object} [config] The configuration object passed to the view
      constructor function when creating the new view instance.
    @return {View} The new view instance.
    **/
    createView: function (name, config) {
        var viewInfo        = this.getViewInfo(name),
            type            = (viewInfo && viewInfo.type) || View,
            ViewConstructor = Lang.isString(type) ? Y[type] : type,
            view;

        // Create the view instance and map it with its metadata.
        view = new ViewConstructor(config);
        this._viewInfoMap[Y.stamp(view, true)] = viewInfo;

        return view;
    },

    /**
    Creates and returns this app's view-container node from the specified
    selector string, DOM element, or existing `Y.Node` instance. This method is
    called internally when the app is initialized.

    This node is also stamped with the CSS class specified by
    `Y.App.Base.VIEWS_CSS_CLASS`.

    By default, the created node will appended to the `container` node by the
    `render()` method.

    @method createViewContainer
    @param {String|Node|HTMLElement} viewContainer Selector string, `Y.Node`
        instance, or DOM element to use as the view-container node.
    @return {Node} Node instance of the created view-container node.
    **/
    createViewContainer: function (viewContainer) {
        viewContainer = Y.one(viewContainer);
        return viewContainer && viewContainer.addClass(App.VIEWS_CSS_CLASS);
    },

    /**
    Returns the metadata associated with a view instance or view name defined on
    the `views` object.

    @method getViewInfo
    @param {View|String} view View instance, or name of a view defined on the
      `views` object.
    @return {Object} The metadata for the view, or `undefined` if the view is
      not registered.
    **/
    getViewInfo: function (view) {
        if (view instanceof View) {
            return this._viewInfoMap[Y.stamp(view, true)];
        }

        return this.views[view];
    },

    /**
    Renders this application by appending the `viewContainer` node to the
    `container` node if it isn't already a child of the container, and the
    `activeView` will be set as the contents of the view container.

    You should call this method at least once, usually after the initialization
    of your app instance so the proper DOM structure is setup and optionally
    append the container to the DOM if it's not there already.

    You may override this method to customize the app's rendering, but it is
    expected that the `viewContainer`'s contents will be reserved reserved for
    the app to manage for purpose of rendering the `activeView`.

    @method render
    @chainable
    **/
    render: function () {
        var container     = this.get('container'),
            viewContainer = this.get('viewContainer'),
            activeView    = this.get('activeView'),
            areSame       = container.compareTo(viewContainer);

        if (activeView && viewContainer) {
            viewContainer.setContent(activeView.get('container'));
        }

        if (container && !container.contains(viewContainer) && !areSame) {
            container.appendChild(viewContainer);
        }

        return this;
    },

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
    @param {Function} [callback] Optional callback Function to call after the
        new `activeView` is ready to use, the function will be passed:
      @param {View} callback.view A reference to the new `activeView`.
    @chainable
    **/
    showView: function (view, config, options, callback) {
        var viewInfo;

        if (Lang.isString(view)) {
            viewInfo = this.getViewInfo(view);

            // Use the preserved view instance, or create a new view.
            // TODO: Maybe we can remove the strict check for `preserve` and
            // assume we'll use a View instance if it is there, and just check
            // `preserve` when detaching?
            if (viewInfo && viewInfo.preserve && viewInfo.instance) {
                view = viewInfo.instance;
                // Make sure there's a mapping back to the view metadata.
                this._viewInfoMap[Y.stamp(view, true)] = viewInfo;
            } else {
                view = this.createView(view, config);
                view.render();
            }
        }

        // TODO: Add `options.update` to update to view with the `config`, if
        // needed. This could also call `setAttrs()` when the specified `view`
        // already a View instance. Is this be too much overloading of the API?

        // TODO: Add `options.render` to provide a way to control whether a view
        // is rendered or not; by default, `render()` will only be called if
        // this method created the View.

        options || (options = {});

        if (callback) {
            options.callback = callback;
        } else if (Lang.isFunction(options)) {
            options = {callback: options};
        }

        // TODO: Should the `callback` _always_ be called, even when the
        // `activeView` does not change?

        return this._set('activeView', view, {options: options});
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Helper method to attach the view instance to the application by making the
    app a bubble target of the view, append the view to the `viewContainer`, and
    assign it to the `instance` property of the associated view info metadata.

    @method _attachView
    @param {View} view View to attach.
    @param {Boolean} prepend Whether the view should be prepended instead of
      appended to the `viewContainer`.
    @protected
    **/
    _attachView: function (view, prepend) {
        if (!view) {
            return;
        }

        var viewInfo      = this.getViewInfo(view),
            viewContainer = this.get('viewContainer');

        view.addTarget(this);
        viewInfo && (viewInfo.instance = view);

        // TODO: Attach events here for persevered Views?
        // See related TODO in `_detachView`.

        // Insert view into the DOM.
        viewContainer[prepend ? 'prepend' : 'append'](view.get('container'));
    },

    /**
    Overrides View's container destruction to deal with the `viewContainer` and
    checks to make sure not to remove and purge the `<body>`.

    @method _destroyContainer
    @protected
    **/
    _destroyContainer: function () {
        var container     = this.get('container'),
            viewContainer = this.get('viewContainer'),
            areSame       = container.compareTo(viewContainer);

        // We do not want to remove or destroy the `<body>`.
        if (Y.one('body').compareTo(container)) {
            // Just clean-up our events listeners.
            this.detachEvents();

            // Clean-up `yui3-app` CSS class on the `container`.
            container && container.removeClass(App.CSS_CLASS);

            if (areSame) {
                // Clean-up `yui3-app-views` CSS class on the `container`.
                container && container.removeClass(App.VIEWS_CSS_CLASS);
            } else {
                // Destroy and purge the `viewContainer`.
                viewContainer && viewContainer.remove(true);
            }

            return;
        }

        // Remove and purge events from both containers.
        viewContainer && viewContainer.remove(true);
        !areSame && container && container.remove(true);
    },

    /**
    Helper method to detach the view instance from the application by removing
    the application as a bubble target of the view, and either just removing the
    view if it is intended to be preserved, or destroying the instance
    completely.

    @method _detachView
    @param {View} view View to detach.
    @protected
    **/
    _detachView: function (view) {
        if (!view) {
            return;
        }

        var viewInfo = this.getViewInfo(view) || {};

        if (viewInfo.preserve) {
            view.remove();
            // TODO: Detach events here for preserved Views? It is possible that
            // some event subscriptions are made on elements other than the
            // View's `container`.
        } else {
            view.destroy();

            // TODO: The following should probably happen automagically from
            // `destroy()` being called! Possibly `removeTarget()` as well.

            // Remove from view to view-info map.
            delete this._viewInfoMap[Y.stamp(view, true)];

            // Remove from view-info instance property.
            if (view === viewInfo.instance) {
                delete viewInfo.instance;
            }
        }

        view.removeTarget(this);
    },

    /**
    Provides the default value for the `html5` attribute.

    The value returned is dependent on the value of the `serverRouting`
    attribute. When `serverRouting` is explicit set to `false` (not just falsy),
    the default value for `html5` will be set to `false` for *all* browsers.

    When `serverRouting` is `true` or `undefined` the returned value will be
    dependent on the browser's capability of using HTML5 history.

    @method _initHtml5
    @return {Boolean} Whether or not HTML5 history should be used.
    @protected
    **/
    _initHtml5: function () {
        // When `serverRouting` is explicitly set to `false` (not just falsy),
        // forcing hash-based URLs in all browsers.
        if (this.get('serverRouting') === false) {
            return false;
        } else {
            return Router.html5;
        }
    },

    /**
    Determines if the specified `view` is configured as a child of the specified
    `parent` view. This requires both views to be either named-views, or view
    instances created using configuration data that exists in the `views`
    object, e.g. created by the `createView()` or `showView()` method.

    @method _isChildView
    @param {View|String} view The name of a view defined in the `views` object,
      or a view instance.
    @param {View|String} parent The name of a view defined in the `views`
      object, or a view instance.
    @return {Boolean} Whether the view is configured as a child of the parent.
    @protected
    **/
    _isChildView: function (view, parent) {
        var viewInfo   = this.getViewInfo(view),
            parentInfo = this.getViewInfo(parent);

        if (viewInfo && parentInfo) {
            return this.getViewInfo(viewInfo.parent) === parentInfo;
        }

        return false;
    },

    /**
    Determines if the specified `view` is configured as the parent of the
    specified `child` view. This requires both views to be either named-views,
    or view instances created using configuration data that exists in the
    `views` object, e.g. created by the `createView()` or `showView()` method.

    @method _isParentView
    @param {View|String} view The name of a view defined in the `views` object,
      or a view instance.
    @param {View|String} parent The name of a view defined in the `views`
      object, or a view instance.
    @return {Boolean} Whether the view is configured as the parent of the child.
    @protected
    **/
    _isParentView: function (view, child) {
        var viewInfo  = this.getViewInfo(view),
            childInfo = this.getViewInfo(child);

        if (viewInfo && childInfo) {
            return this.getViewInfo(childInfo.parent) === viewInfo;
        }

        return false;
    },

    /**
    Navigates to the specified URL if there is a route-handler that matches. In
    browsers capable of using HTML5 history or when `serverRouting` is falsy,
    the navigation will be enhanced by firing the `navigate` and having the
    app handle the "request". When `serverRouting` is `true`, non-HTML5 browsers
    will navigate to the new URL via manipulation of `window.location`.

    Overrides PjaxBase's `_navigate()` method to first upgrade any hash-based
    URLs that has a path-like hash (i.e. hashes that start with '/'), and when
    `serverRouting` is falsy, force the navigation to be handled by the app. The
    applied changes are then delegated back to PjaxBase's `_navigate()` method
    to complete the navigation.

    When there is a route-handler for the specified URL and it is being
    navigated to, this method will return `true`, otherwise it will return
    `false`.

    @method _navigate
    @param {String} url The fully-resolved URL that the app should dispatch
      to its route handlers to fulfill the enhanced navigation "request", or use
      to update `window.location` in non-HTML5 history capable browsers when
      `serverRouting` is `true`.
    @param {Object} [options] Additional options to configure the navigation,
      these are mixed into the `navigate` event facade.
        @param {Boolean} [options.replace] Whether or not the current history
          entry will be replaced, or a new entry will be created. Will default
          to `true` if the specified `url` is the same as the current URL.
        @param {Boolean} [options.force=false] Whether the enhanced navigation
          should occur even in browsers without HTML5 history.
    @protected
    @see PjaxBase._navigate()
    **/
    _navigate: function (url, options) {
        url = this._upgradeURL(url);

        options || (options = {});

        if (!this.get('serverRouting')) {
            // Force navigation to be enhanced and handled by the app when
            // `serverRouting` is falsy because the server might not be able to
            // handle the request properly.
            Lang.isValue(options.force) || (options.force = true);

            // Determine if the current history entry should be replaced. Since
            // we're upgrading hash-based URL to a full-path URL, we'll do the
            // same for the current URL before comparing the two URLs.
            if (!Lang.isValue(options.replace)) {
                options.replace = url === this._upgradeURL(this._getURL());
            }
        }

        return PjaxBase.prototype._navigate.call(this, url, options);
    },

    /**
    Will either save a history entry using `pushState()` or the location hash,
    or gracefully-degrade to sending a request to the server causing a full-page
    reload.

    Overrides Router's `_save()` method to preform graceful-degradation when the
    app's `serverRouting` is `true` and `html5` is `false` by updating the full
    URL via standard assignment to `window.location` or by calling
    `window.location.replace()`; both of which will cause a request to the
    server resulting in a full-page reload.

    Otherwise this will just delegate off to Router's `_save()` method allowing
    the client-side enhanced routing to occur.

    @method _save
    @param {String} [url] URL for the history entry.
    @param {Boolean} [replace=false] If `true`, the current history entry will
      be replaced instead of a new one being added.
    @see Router._save()
    @chainable
    @protected
    **/
    _save: function (url, replace) {
        // Forces full-path URLs to always be used by modifying
        // `window.location` in non-HTML5 history capable browsers.
        if (this.get('serverRouting') && !this.get('html5')) {
            // Perform same-origin check on the specified URL.
            if (!this._hasSameOrigin(url)) {
                Y.error('Security error: The new URL must be of the same origin as the current URL.');
                return this;
            }

            // Results in the URL's full path starting with '/'.
            url = this._joinURL(url || '');

            // Either replace the current history entry or create a new one
            // while navigating to the `url`.
            if (replace) {
                win && win.location.replace(url);
            } else {
                win && (win.location = url);
            }

            return this;
        }

        return Router.prototype._save.apply(this, arguments);
    },

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

        var callback = options.callback,
            isChild  = this._isChildView(newView, oldView),
            isParent = !isChild && this._isParentView(newView, oldView),
            prepend  = !!options.prepend || isParent;

        // Prevent detaching (thus removing) the view we want to show.
        // Also hard to animate out and in, the same view.
        if (newView === oldView) {
            return callback && callback.call(this, newView);
        }

        this._attachView(newView, prepend);
        this._detachView(oldView);

        callback && callback.call(this, newView);
    },

    /**
    Upgrades a hash-based URL to a full-path URL, if necessary.

    The specified `url` will be upgraded if its of the same origin as the
    current URL and has a path-like hash. URLs that don't need upgrading will be
    returned as-is.

    @example
        app._upgradeURL('http://example.com/#/foo/'); // => 'http://example.com/foo/';

    @method _upgradeURL
    @param {String} url The URL to upgrade from hash-based to full-path.
    @return {String} The upgraded URL, or the specified URL untouched.
    @protected
    **/
    _upgradeURL: function (url) {
        // We should not try to upgrade paths for external URLs.
        if (!this._hasSameOrigin(url)) {
            return url;
        }

        // TODO: Should the `root` be removed first, and the hash only
        // considered if in the form of '/#/'?
        var hash       = (url.match(/#(.*)$/) || [])[1] || '',
            hashPrefix = Y.HistoryHash.hashPrefix;

        // Strip any hash prefix, like hash-bangs.
        if (hashPrefix && hash.indexOf(hashPrefix) === 0) {
            hash = hash.replace(hashPrefix, '');
        }

        // If the hash looks like a URL path, assume it is, and upgrade it!
        if (hash && hash.charAt(0) === '/') {
            // Re-join with configured `root` before resolving.
            url = this._resolveURL(this._joinURL(hash));
        }

        return url;
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
    Handles the application's `activeViewChange` event (which is fired when the
    `activeView` attribute changes) by detaching the old view, attaching the new
    view.

    The `activeView` attribute is read-only, so the public API to change its
    value is through the `showView()` method.

    @method _afterActiveViewChange
    @param {EventFacade} e
    @protected
    **/
    _afterActiveViewChange: function (e) {
        this._uiSetActiveView(e.newVal, e.prevVal, e.options);
    }
}, {
    ATTRS: {
        /**
        The application's active/visible view.

        This attribute is read-only, to set the `activeView` use the
        `showView()` method.

        @attribute activeView
        @type View
        @default `null`
        @readOnly
        @see showView
        **/
        activeView: {
            value   : null,
            readOnly: true
        },

        /**
        Container node which represents the application's bounding-box, into
        which this app's content will be rendered.

        The container node serves as the host for all DOM events attached by the
        app. Delegation is used to handle events on children of the container,
        allowing the container's contents to be re-rendered at any time without
        losing event subscriptions.

        The default container is the `<body>` Node, but you can override this in
        a subclass, or by passing in a custom `container` config value at
        instantiation time.

        When `container` is overridden by a subclass or passed as a config
        option at instantiation time, it may be provided as a selector string, a
        DOM element, or a `Y.Node` instance. During initialization, this app's
        `create()` method will be called to convert the container into a
        `Y.Node` instance if it isn't one already and stamp it with the CSS
        class: `"yui3-app"`.

        The container is not added to the page automatically. This allows you to
        have full control over how and when your app is actually rendered to
        the page.

        @attribute container
        @type HTMLElement|Node|String
        @default `<body>`
        @initOnly
        **/
        container: {
            valueFn: function () {
                return Y.one('body');
            }
        },

        /**
        Whether or not this browser is capable of using HTML5 history.

        This value is dependent on the value of `serverRouting` and will default
        accordingly.

        Setting this to `false` will force the use of hash-based history even on
        HTML5 browsers, but please don't do this unless you understand the
        consequences.

        @attribute html5
        @type Boolean
        @initOnly
        @see serverRouting
        **/
        html5: {
            valueFn: '_initHtml5'
        },

        /**
        CSS selector string used to filter link click events so that only the
        links which match it will have the enhanced-navigation behavior of pjax
        applied.

        When a link is clicked and that link matches this selector, navigating
        to the link's `href` URL using the enhanced, pjax, behavior will be
        attempted; and the browser's default way to navigate to new pages will
        be the fallback.

        By default this selector will match _all_ links on the page.

        @attribute linkSelector
        @type String|Function
        @default `"a"`
        **/
        linkSelector: {
            value: 'a'
        },

        /**
        Whether or not this application's server is capable of properly routing
        all requests and rendering the initial state in the HTML responses.

        This can have three different values, each having particular
        implications on how the app will handle routing and navigation:

          * `undefined`: The best form of URLs will be chosen based on the
            capabilities of the browser. Given no information about the server
            environment a balanced approach to routing and navigation is chosen.

            The server should be capable of handling full-path requests, since
            full-URLs will be generated by browsers using HTML5 history. If this
            is a client-side-only app the server could handle full-URL requests
            by sending a redirect back to the root with a hash-based URL, e.g:

                Request:     http://example.com/users/1
                Redirect to: http://example.com/#/users/1

          * `true`: The server is *fully* capable of properly handling requests
            to all full-path URLs the app can produce.

            This is the best option for progressive-enhancement because it will
            cause **all URLs to always have full-paths**, which means the server
            will be able to accurately handle all URLs this app produces. e.g.

                http://example.com/users/1

            To meet this strict full-URL requirement, browsers which are not
            capable of using HTML5 history will make requests to the server
            resulting in full-page reloads.

          * `false`: The server is *not* capable of properly handling requests
            to all full-path URLs the app can produce, therefore all routing
            will be handled by this App instance.

            Be aware that this will cause **all URLs to always be hash-based**,
            even in browsers that are capable of using HTML5 history. e.g.

                http://example.com/#/users/1

            A single-page or client-side-only app where the server sends a
            "shell" page with JavaScript to the client might have this
            restriction. If you're setting this to `false`, read the following:

        **Note:** When this is set to `false`, the server will *never* receive
        the full URL because browsers do not send the fragment-part to the
        server, that is everything after and including the '#'.

        Consider the following example:

            URL shown in browser: http://example.com/#/users/1
            URL sent to server:   http://example.com/

        You should feel bad about hurting our precious web if you forcefully set
        either `serverRouting` or `html5` to `false`, because you're basically
        punching the web in the face here with your lossy URLs! Please make sure
        you know what you're doing and that you understand the implications.

        Ideally you should always prefer full-path URLs (not /#/foo/), and want
        full-page reloads when the client's browser is not capable of enhancing
        the experience using the HTML5 history APIs. Setting this to `true` is
        the best option for progressive-enhancement (and graceful-degradation).

        @attribute serverRouting
        @type Boolean
        @default `undefined`
        @initOnly
        **/
        serverRouting: {
            value    : undefined,
            writeOnce: 'initOnly'
        },

        /**
        The node into which this app's views will be rendered. This node's
        contents are fully-managed by this app instance.

        The view container node serves as the container to hold the app's
        `activeView`. Each time the `activeView` is set via `showView()`, the
        contents of this node will be replaced by the new active view's
        `container` node.

        The default view container is `<div>` Node, but you can override this in
        a subclass, or by passing in a custom `viewContainer` config value at
        instantiation time.

        When `viewContainer` is overridden by a subclass or passed as a config
        option at instantiation time, it may be provided as a selector string,
        DOM element, or a `Y.Node` instance (having the `viewContainer` and the
        `container` be the same node is also supported). During initialization,
        the app's `createViewContainer()` method will be called to convert the
        view container into a `Y.Node` instance if it isn't one already and
        stamp it with the CSS class: `"yui3-app-views"`.

        The app's `render()` method will append the view container to the app's
        `container` node if it isn't already, and any `activeView` will be set
        as its contents.

        @attribute viewContainer
        @type HTMLElement|Node|String
        @default `Y.Node.create("<div/>")`
        @initOnly
        **/
        viewContainer: {
            valueFn: function () {
                return Y.Node.create('<div/>');
            },

            setter   : 'createViewContainer',
            writeOnce: 'initOnly'
        }
    },

    CSS_CLASS      : Y.ClassNameManager.getClassName('app'),
    VIEWS_CSS_CLASS: Y.ClassNameManager.getClassName('app', 'views')
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('App').Base = App;

/**
Provides a top-level application component which manages navigation and views.

This gives you a foundation and structure on which to build your application; it
combines robust URL navigation with powerful routing and flexible view
management.

`Y.App` is both a namespace and constructor function. The `Y.App` class is
special in that any `Y.App` class extensions that are included in the YUI
instance will be **auto-mixed** on to the `Y.App` class. Consider this example:

    YUI().use('app-base', 'app-transitions', function (Y) {
        // This will create two YUI Apps, `basicApp` will not have transitions,
        // but `fancyApp` will have transitions support included.
        var basicApp = new Y.App.Base(),
            fancyApp = new Y.App();
    });

@class App
@param {Object} [config] The following are configuration properties that can be
    specified _in addition_ to default attribute values and the non-attribute
    properties provided by `Y.Base`:
  @param {Object} [config.views] Hash of view-name to metadata used to
    declaratively describe an application's views and their relationship with
    the app and other views. The views specified here will override any defaults
    provided by the `views` object on the `prototype`.
@constructor
@extends App.Base
@since 3.5.0
**/
Y.App = Y.mix(Y.Base.create('app', Y.App.Base, []), Y.App, true);


}, '@VERSION@' ,{requires:['classnamemanager', 'pjax-base', 'router', 'view']});
