/**
 * Ext.Widget is a light-weight Component that consists of nothing more than a template
 * Element that can be cloned to quickly and efficiently replicate many instances.
 * Ext.Widget is typically not instantiated directly, because the default template is
 * just a single element with no listeners. Instead Ext.Widget should be extended to
 * create Widgets that have a useful markup structure and event listeners.
 *
 * For example:
 *
 *      Ext.define('MyWidget', {
 *          extend: 'Ext.Widget',
 *
 *          // The element template passed to Ext.Element.create()
 *          element: {
 *              reference: 'element',
 *              listeners: {
 *                  click: 'onClick'
 *              },
 *              children: [{
 *                  reference: 'innerElement',
 *                  listeners: {
 *                      click: 'onInnerClick'
 *                  }
 *              }]
 *          },
 *
 *          constructor: function(config) {
 *              // It is important to remember to call the Widget superclass constructor
 *              // when overriding the constructor in a derived class. This ensures that
 *              // the element is initialized from the template, and that initConfig() is
 *              // is called.
 *              this.callParent([config]);
 *
 *              // After calling the superclass constructor, the Element is available and
 *              // can safely be manipulated. Reference Elements are instances of
 *              // Ext.Element, and are cached on each Widget instance by reference name.
 *              Ext.getBody().appendChild(this.element);
 *          },
 *
 *          onClick: function() {
 *              // listeners use this Widget instance as their scope
 *              console.log('element clicked', this);
 *          },
 *
 *          onInnerClick: function() {
 *              // access the innerElement reference by name
 *              console.log('inner element clicked', this.innerElement);
 *          }
 *      });
 *
 * @since 5.0.0
 */
Ext.define('Ext.Widget', {
    extend: 'Ext.Evented',
    xtype: 'widget',

    mixins: [
        'Ext.mixin.Inheritable',
        'Ext.mixin.Bindable'
    ],

    isWidget: true,

    /**
     * @property {Object} element
     * @private
     * A configuration object for Ext.Element.create() that is used to create the Element
     * template.  Supports all the standard options of a Ext.Element.create() config and
     * adds 2 additional options:
     *
     * 1. `reference` - this option specifies a name for Element references.  These
     * references names become properties of the Widget instance and refer to Ext.Element
     * instances that were created using the template:
     *
     *     element: {
     *         reference: 'element',
     *         children: [{
     *             reference: 'innerElement'
     *         }]
     *     }
     *
     * After construction of a widget the reference elements are accessible as follows:
     *
     *     var foo = new FooWidget(),
     *         innerEl = foo.innerEl; // an Ext.Element that wraps the innerElement
     *
     * The reference attribute is optional, but all Widgets must have a `'element'`
     * reference on some element within the template (usually the outermost one).
     *
     * 2. `listeners` - a standard listeners object as specified by {@link
     * Ext.mixin.Observable}.
     *
     *     element: {
     *         reference: 'element',
     *         listeners: {
     *             click: 'onClick'
     *         },
     *         children: [{
     *             reference: 'innerElement',
     *             listeners: {
     *                 click: 'onInnerClick'
     *             }
     *         }]
     *     }
     *
     * Since listeners cannot be attached without an Ext.Element reference the `reference`
     * property MUST be specified in order to use `listeners`.
     *
     * The Widget instance is used as the scope for all listeners specified in this way,
     * so it is invalid to use the `scope` option in the `listeners` config since it will
     * always be overwritten using `this`.
     */
    element: {
        reference: 'element'
    },

    eventedConfig: {
        /**
         * @cfg {Number/String} width
         * The width of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * By default, if this is not explicitly set, this Component's element will simply have its own natural size.
         * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
         * @accessor
         * @evented
         */
        width: null,

        /**
         * @cfg {Number/String} height
         * The height of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * By default, if this is not explicitly set, this Component's element will simply have its own natural size.
         * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
         * @accessor
         * @evented
         */
        height: null
    },

    /**
     * @property {Array} template
     * @private
     * An array of child elements to use as the children of the main element in the {@link
     * #element} template.  Only used if "children" are not specified explicitly in the
     * {@link #element} template.
     */
    template: [],

    constructor: function(config) {
        var me = this;

        me.initId(config);
        me.initElement();
        me.mixins.observable.constructor.call(me, config);
        Ext.ComponentManager.register(me);
    },

    /**
     * @private
     * Reduces instantiation time for a Widget by lazily instantiating Ext.Element
     * references the first time they are used.  This optimization only works for elements
     * with no listeners specified.
     *
     * @param {String} name The name of the reference
     * @param {HTMLElement} domNode
     */
    addElementReferenceOnDemand: function(name, domNode) {
        if (this._elementListeners[name]) {
            // if the element was configured with listeners then we cannot add the
            // reference on demand because we need to make sure the element responds
            // immediately to any events, even if its reference is never accessed
            this.addElementReference(name, domNode);
        } else {
            // no listeners - element reference can be resolved on demand.
            // TODO: measure if this has any significant performance impact.
            Ext.Object.defineProperty(this, name, {
                get: function() {
                    // remove the property that was defined using defineProperty because
                    // addElementReference will set the property on the instance, - the
                    // getter is not needed after the first access.
                    delete this[name];
                    return this.addElementReference(name, domNode);
                },
                configurable: true
            });
        }
    },

    /**
     * @private
     * Adds an element reference to this Widget instance.
     * @param {String} name The name of the reference
     * @param {HTMLElement} domNode
     * @return {Ext.dom.Element}
     */
    addElementReference: function (name, domNode) {
        var me = this,
            referenceEl = me[name] = Ext.get(domNode),
            listeners = me._elementListeners[name],
            eventName, listener;

        referenceEl.skipGarbageCollection = true;
        referenceEl.component = me;

        if (listeners) {
            // TODO: these references will be needed when we use delegation to listen
            // for element events, but for now, we'll just attach the listeners directly
            // referenceEl.reference = name;
            // referenceEl.component = me;
            // referenceEl.listeners = listeners;

            // at this point "listeners" exists on the class prototype.  We need to clone
            // it before poking the scope reference onto it, because it is used as the
            // options object by Observable and so can't be safely shared.
            listeners = Ext.clone(listeners);

            // the outermost listeners object always needs the scope option.  this covers
            // a listeners object with the following shape
            //
            //    {
            //        click: 'onClick'
            //        scope: this
            //    }
            listeners.scope = me;

            // if the listener is specified as an object it needs to have the scope
            // option added to that object, for example:
            //
            //    {
            //        click: {
            //            fn: 'onClick',
            //            scope: this
            //        }
            //    }
            for (eventName in listeners) {
                listener = listeners[eventName];
                if (typeof listener === 'object') {
                    listener.scope = me;
                }
            }

            // hopefully in the future we can stop calling on() here, and just use
            // event delegation to dispatch events to Widgets that have declared their
            // listeners in their template
            referenceEl.on(listeners);
        }

        return referenceEl;
    },

    afterCachedConfig: function() {
        // This method runs once for the first instance of this Widget type that is
        // created.  It runs after the element config has been processed for the first
        // instance, and after all the cachedConfigs (whose appliers/updaters may modify
        // the element) have been initialized.  At this point we are ready to take the
        // DOM that was generated for the first Element instance, clone it, and cache it
        // on the prototype, so that it can be cloned by future instance to create their
        // elements (see initElement).
        var me = this,
            prototype = me.self.prototype,
            referenceList = me.referenceList,
            renderElement = me.renderElement.dom,
            renderTemplate, element, i, ln, reference, elements;

        // This is where we take the first instance's DOM and clone it as the template
        // for future instances
        prototype.renderTemplate = renderTemplate = document.createDocumentFragment();
        renderTemplate.appendChild(renderElement.cloneNode(true));

        elements = renderTemplate.querySelectorAll('[id]');

        for (i = 0,ln = elements.length; i < ln; i++) {
            element = elements[i];
            element.removeAttribute('id');
        }

        // initElement skips removal of reference attributes for the first instance so that
        // the reference attributes will be present in the cached element when it is cloned.
        // Now that we're done cloning and caching the template element, it is safe to
        // remove the reference attributes from this instance's elements
        for (i = 0,ln = referenceList.length; i < ln; i++) {
            reference = referenceList[i];
            me[reference].dom.removeAttribute('reference');
        }
    },

    applyWidth: function(width) {
        return this.filterLengthValue(width);
    },

    applyHeight: function(height) {
        return this.filterLengthValue(height);
    },

    destroy: function() {
        var me = this,
            referenceList = me.referenceList,
            i, ln, reference;

        // Destroy all element references
        for (i = 0, ln = referenceList.length; i < ln; i++) {
            reference = referenceList[i];
            if (me.hasOwnProperty(reference)) {
                me[reference].destroy();
                me[reference] = null;
            }
        }

        me.callParent();

        Ext.ComponentManager.unregister(me);
    },

    doSetWidth: function(width) {
        this.element.setWidth(width);
    },

    doSetHeight: function(height) {
        this.element.setHeight(height);
    },

    filterLengthValue: function(value) {
        if (value === 'auto' || (!value && value !== 0)) {
            return null;
        }

        return value;
    },

    /**
     * @private
     * A template method for modifying the {@link #element} config before it is processed.
     * By default adds the result of `this.getTemplate()` as the `children` array of {@link
     * #element} if `children` were not specified in the original {@link #element} config.
     * Typically this method should not need to be implemented in subclasses.  Instead the
     * {@link #element} property should be use to configure the element template for a
     * given Widget subclass.
     *
     * @return {Object} the element config object
     */
    getElementConfig: function() {
        var me = this,
            el = me.element;

        if (!('children' in el)) {
            el = Ext.apply({
                children: me.getTemplate()
            }, el);
        }

        return el;
    },

    /**
     * Returns the height and width of the Component.
     * @return {Object} The current `height` and `width` of the Component.
     * @return {Number} return.width
     * @return {Number} return.height
     */
    getSize: function() {
        return {
            width: this.getWidth(),
            height: this.getHeight()
        };
    },

    getTemplate: function() {
        return this.template;
    },

    /**
     * @private
     * Initializes the Element for this Widget instance.  If this is the first time a
     * Widget of this type has been instantiated the {@link element} config will be
     * processed to create an Element.  This Element is then cached on the prototype (see
     * afterCachedConfig) so that future instances can obtain their element by simply
     * cloning the Element that was cached by the first instance.
     */
    initElement: function() {
        var me = this,
            prototype = me.self.prototype,
            id = me.getId(),
            referenceList = me.referenceList = [],
            cleanAttributes = true,
            renderTemplate, renderElement, element, referenceNodes, i, ln, referenceNode,
            reference, elementConfig;

        if (prototype.hasOwnProperty('renderTemplate')) {
            // we have already created an instance of this Widget type, so the element
            // config has already been processed, and the resulting DOM has been cached on
            // the prototype (see afterCachedConfig).  This means we can obtain our element
            // by simply cloning the cached element.
            renderTemplate = me.renderTemplate.cloneNode(true);
            renderElement = renderTemplate.firstChild;
        } else {
            // this is the first instantiation of this widget type.  Process the element
            // config from scratch to create our Element.
            cleanAttributes = false;
            renderTemplate = document.createDocumentFragment();
            elementConfig = me.getElementConfig();
            // initElementListeners needs to be called BEFORE passing the element config
            // along to Ext.Element.create().  This ensures that the listener meta data is
            // saved, and then the listeners objects are removed from the element config
            // so that they do not get added as attributes by create()
            me.initElementListeners(elementConfig);
            renderElement = Ext.Element.create(elementConfig, true);
            renderTemplate.appendChild(renderElement);
        }

        referenceNodes = renderTemplate.querySelectorAll('[reference]');

        for (i = 0,ln = referenceNodes.length; i < ln; i++) {
            referenceNode = referenceNodes[i];
            reference = referenceNode.getAttribute('reference');

            if (cleanAttributes) {
                // on first instantiation we do not clean the reference attributes here.
                // This is because this instance's element will be used as the template
                // for future instances, and we need the reference attributes to be
                // present in the template so that future instances can resolve their
                // references.  afterCachedConfig is responsible for removing the
                // reference attributes from the DOM for the first instance after the
                // Element has been cloned and cached as the template.
                referenceNode.removeAttribute('reference');
            }

            if (reference === 'element') {
                //<debug>
                if (element) {
                    // already resolved a reference named element - can't have two
                    Ext.Error.raise("Duplicate 'element' reference detected in '" +
                        me.$className + "' template.");
                }
                //</debug>
                referenceNode.id = id;
                // element reference needs to be established ASAP, so add the reference
                // immediately, not "on-demand"
                element = me.el = me.addElementReference(reference, referenceNode);
            } else {
                me.addElementReferenceOnDemand(reference, referenceNode);
            }

            referenceList.push(reference);
        }

        //<debug>
        if (!element) {
            Ext.Error.raise("No 'element' reference found in '" + me.$className +
                "' template.");
        }
        //</debug>

        if (renderElement === element.dom) {
            me.renderElement = element;
        }
        else {
            me.addElementReferenceOnDemand('renderElement', renderElement);
        }
    },

    /**
     * @private
     * called for the first instance of this Widget to create an object that contains the
     * listener configs for all of the element references keyed by reference name. The
     * object is cached on the prototype and has the following shape:
     *
     *     _elementListeners: {
     *         element: {
     *             click: 'onClick'
     *             scope: this
     *         },
     *         fooReference: {
     *             tap: {
     *                 fn: someFunction
     *                 delay: 100
     *             }
     *         }
     *     }
     */
    initElementListeners: function(elementConfig) {
        var me = this,
            elementListeners = me._elementListeners ||
                (me.self.prototype._elementListeners = {}),
            reference = elementConfig.reference,
            children = elementConfig.children,
            listeners, ln, i;

        if (reference) {
            listeners = elementConfig.listeners;
            if (listeners) {
                elementListeners[reference] = listeners;
                // null out the listeners on the elementConfig, since we are going to pass
                // it to Element.create(), and don't want "listeners" to be treated as an
                // attribute
                elementConfig.listeners = null;
            }
        }

        if (children) {
            for (i = 0, ln = children.length; i < ln; i++) {
                me.initElementListeners(children[i]);
            }
        }
    },

    initId: function(config) {
        var me = this,
            defaultConfig = me.config,
            id = (config && config.id) || (defaultConfig && defaultConfig.id);

        if (id) {
            // setId() will normally be inherited from Identifiable, unless "id" is a
            // proper config, in which case it will be generated by the config system.
            me.setId(id);
            me.id = id;
        } else {
            // if no id configured, generate one (Identifiable)
            me.getId();
        }
    },

    /**
     * Tests whether this Widget matches a {@link Ext.ComponentQuery ComponentQuery}
     * selector string.
     * @param {String} selector The selector string to test against.
     * @return {Boolean} `true` if this Widget matches the selector.
     */
    is: function(selector) {
        return Ext.ComponentQuery.is(this, selector);
    },

    /**
     * Tests whether or not this Component is of a specific xtype. This can test whether this Component is descended
     * from the xtype (default) or whether it is directly of the xtype specified (`shallow = true`).
     * **If using your own subclasses, be aware that a Component must register its own xtype
     * to participate in determination of inherited xtypes.__
     *
     * For a list of all available xtypes, see the {@link Ext.Component} header.
     *
     * Example usage:
     *
     *     var t = new Ext.field.Text();
     *     var isText = t.isXType('textfield'); // true
     *     var isBoxSubclass = t.isXType('field'); // true, descended from Ext.field.Field
     *     var isBoxInstance = t.isXType('field', true); // false, not a direct Ext.field.Field instance
     *
     * @param {String} xtype The xtype to check for this Component.
     * @param {Boolean} shallow (optional) `false` to check whether this Component is descended from the xtype (this is
     * the default), or `true` to check whether this Component is directly of the specified xtype.
     * @return {Boolean} `true` if this component descends from the specified xtype, `false` otherwise.
     */
    isXType: function(xtype, shallow) {
        return shallow ? (Ext.Array.indexOf(this.xtypes, xtype) !== -1) :
                !!this.xtypesMap[xtype];
    },

    /**
     * Sets the size of the Component.
     * @param {Number} width The new width for the Component.
     * @param {Number} height The new height for the Component.
     */
    setSize: function(width, height) {
        if (width !== undefined) {
            this.setWidth(width);
        }
        if (height !== undefined) {
            this.setHeight(height);
        }
    }
});
