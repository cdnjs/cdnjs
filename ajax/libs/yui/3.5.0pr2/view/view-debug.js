YUI.add('view', function(Y) {

/**
Represents a logical piece of an application's user interface, and provides a
lightweight, overridable API for rendering content and handling delegated DOM
events on a container element.

@submodule view
@since 3.4.0
**/

/**
Represents a logical piece of an application's user interface, and provides a
lightweight, overridable API for rendering content and handling delegated DOM
events on a container element.

The View class imposes little structure and provides only minimal functionality
of its own: it's basically just an overridable API interface that helps you
implement custom views.

@class View
@constructor
@extends Base
@since 3.4.0
**/

function View() {
    View.superclass.constructor.apply(this, arguments);
}

Y.View = Y.extend(View, Y.Base, {
    // -- Public Properties ----------------------------------------------------

    /**
    Hash of CSS selectors mapped to events to delegate to elements matching
    those selectors.

    CSS selectors are relative to the `container` element. Events are attached
    to the container, and delegation is used so that subscribers are only
    notified of events that occur on elements inside the container that match
    the specified selectors. This allows the container's contents to be re-
    rendered as needed without losing event subscriptions.

    Event handlers can be specified either as functions or as strings that map
    to function names on this view instance or its prototype.

    The `this` object in event handlers will refer to this view instance. If
    you'd prefer `this` to be something else, use `Y.bind()` to bind a custom
    `this` object.

    @example

        var view = new Y.View({
            events: {
                // Call `this.toggle()` whenever the element with the id
                // "toggle-button" is clicked.
                '#toggle-button': {click: 'toggle'},

                // Call `this.hoverOn()` when the mouse moves over any element
                // with the "hoverable" class, and `this.hoverOff()` when the
                // mouse moves out of any element with the "hoverable" class.
                '.hoverable': {
                    mouseover: 'hoverOn',
                    mouseout : 'hoverOff'
                }
            }
        });

    @property events
    @type Object
    @default {}
    **/
    events: {},

    /**
    Template for this view.

    This is a convenience property that has no default behavior of its own.
    It's only provided as a convention to allow you to store whatever you
    consider to be a template, whether that's an HTML string, a `Y.Node`
    instance, a Mustache template, or anything else your little heart
    desires.

    How this template gets used is entirely up to you and your custom
    `render()` method.

    @property template
    @type mixed
    @default ''
    **/
    template: '',

    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        config || (config = {});

        this._attachedViewEvents = [];

        config.template && (this.template = config.template);

        // Merge events from the config into events in `this.events`, then
        // attach the events to the container node.
        this.events = config.events ?
                Y.merge(this.events, config.events) : this.events;

        this.attachEvents(this.events);
    },

    destructor: function () {
        this._destroyContainer();
        this._attachedViewEvents = [];
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Attaches delegated event handlers to this view's container element. This
    method is called internally to subscribe to events configured in the
    `events` attribute when the view is initialized.

    You may override this method to customize the event attaching logic.

    @method attachEvents
    @param {Object} [events] Hash of events to attach. See the docs for the
        `events` attribute for details on the format. If not specified, this
        view's `events` property will be used.
    @see detachEvents
    **/
    attachEvents: function (events) {
        var container = this.get('container'),
            owns      = Y.Object.owns,
            handler, handlers, name, selector;

        this.detachEvents();

        events || (events = this.events);

        for (selector in events) {
            if (!owns(events, selector)) { continue; }

            handlers = events[selector];

            for (name in handlers) {
                if (!owns(handlers, name)) { continue; }

                handler = handlers[name];

                if (typeof handler === 'string') {
                    handler = this[handler];
                }

                this._attachedViewEvents.push(
                    container.delegate(name, handler, selector, this));
            }
        }
    },

    /**
    Creates and returns this view's container node from the specified selector
    string, DOM element, or existing `Y.Node` instance. This method is called
    internally when the view is initialized.

    By default, the created node is _not_ added to the DOM automatically.

    You may override this method to customize how the container node is created
    (such as by rendering it from a template). Your method should return a
    `Y.Node` instance.

    @method create
    @param {HTMLElement|Node|String} container Selector string, `Y.Node`
        instance, or DOM element to use as the container node.
    @return {Node} Node instance of the created container node.
    **/
    create: function (container) {
        return Y.one(container);
    },

    /**
    Detaches DOM events that have previously been attached to the container by
    `attachEvents()`.

    @method detachEvents
    @chainable
    @see attachEvents
    **/
    detachEvents: function () {
        Y.Array.each(this._attachedViewEvents, function (handle) {
            handle.detach();
        });
    },

    /**
    Removes this view's container element from the DOM (if it's in the DOM),
    but doesn't destroy it or any event listeners attached to it.

    @method remove
    @chainable
    **/
    remove: function () {
        var container = this.get('container');
        container && container.remove();
        return this;
    },

    /**
    Renders this view.

    This method is a noop by default. Override it to provide a custom
    implementation that renders this view's content and appends it to the
    container element. Ideally your `render` method should also return `this` as
    the end to allow chaining, but that's up to you.

    Since there's no default renderer, you're free to render your view however
    you see fit, whether that means manipulating the DOM directly, dumping
    strings into `innerHTML`, or using a template language of some kind.

    For basic templating needs, `Y.Node.create()` and `Y.Lang.sub()` may
    suffice, but there are no restrictions on what tools or techniques you can
    use to render your view. All you need to do is append something to the
    container element at some point, and optionally append the container
    to the DOM if it's not there already.

    @method render
    @chainable
    **/
    render: function () {
        return this;
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Removes the `container` from the DOM and purges all its event listeners.

    @method _destroyContainer
    @protected
    **/
    _destroyContainer: function () {
        var container = this.get('container');
        container && container.remove(true);
    }
}, {
    NAME: 'view',

    ATTRS: {
        /**
        Container node into which this view's content will be rendered.

        The container node serves as the host for all DOM events attached by the
        view. Delegation is used to handle events on children of the container,
        allowing the container's contents to be re-rendered at any time without
        losing event subscriptions.

        The default container is a `<div>` Node, but you can override this in
        a subclass, or by passing in a custom `container` config value at
        instantiation time.

        When `container` is overridden by a subclass or passed as a config
        option at instantiation time, it may be provided as a selector string, a
        DOM element, or a `Y.Node` instance. During initialization, this view's
        `create()` method will be called to convert the container into a
        `Y.Node` instance if it isn't one already.

        The container is not added to the page automatically. This allows you to
        have full control over how and when your view is actually rendered to
        the page.

        @attribute container
        @type HTMLElement|Node|String
        @default Y.Node.create('<div/>')
        @initOnly
        **/
        container: {
            valueFn: function () {
                return Y.Node.create('<div/>');
            },

            setter   : 'create',
            writeOnce: 'initOnly'
        },

        /**
        Model instance associated with this view instance.

        This is entirely optional. There's no requirement that views be
        associated with models, but if you do intend to associate your view with
        a model, then specifying that model instance at instantiation time will
        cause a reference to be stored here for convenience.

        @attribute model
        @type Model
        @default null
        **/
        model: {
            value: null
        },

        /**
        ModelList instance associated with this view instance.

        This is entirely optional. There's no requirement that views be
        associated with model lists, but if you do intend to associate your view
        with a model list, then specifying that list instance at instantiation
        time will cause a reference to be stored here for convenience.

        @attribute modelList
        @type ModelList
        @default null
        **/
        modelList: {
            value: null
        }
    }
});


}, '@VERSION@' ,{requires:['base-build', 'node-event-delegate']});
