/**
 * Backbone.React.Component
 * @version 0.5.1
 * @author "Magalhas" José Magalhães <magalhas@gmail.com>
 * @license MIT <http://opensource.org/licenses/MIT>
 */
'use strict';
(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['react', 'backbone', 'underscore'], factory);
  else if (typeof module !== 'undefined' && module.exports) {
    var React = require('react');
    var Backbone = require('backbone');
    var _ = require('underscore');
    module.exports = factory(React, Backbone, _);
  } else
    factory(root.React, root.Backbone, root._);
}(this, function (React, Backbone, _) {
  /**
   * @namespace Backbone.React.Component
   * @mixes React.Component
   * @mixes Backbone.Events
   * @desc The Reactor.Component is a React.Component wrapper to serve
   as a bridge between the React and Backbone worlds. Besides some extra members
   that may be set by extending/instancing a component, it works pretty much the
   same way that {@link http://facebook.github.io/react/|React} components do.
   <br />
   When bound to a model, the component gets automatically mounted/rendered on
   the DOM as the model changes. If already rendered it just updates the element
   by using {@link http://facebook.github.io/react/|React} virtual DOM engine.
   <br />
   Here lies the public API available on each component.
   * @example
   // Instancing a component
   var myComponent = new Backbone.React.Component({
     el: document.body,
     model: model
   });
   * @example
   // Extending a component
   /** @jsx React.DOM *\/
   var MyComponent = Backbone.React.Component.extend({
     render: function () {
       return &lt;div&gt;Hello world!&lt;/div&gt;;
     }
   });
   */
  if (!Backbone.React) Backbone.React = {};
  Backbone.React.Component =
  /** @lends Backbone.React.Component */
  {
    /**
     * Shortcut to this.$el.find. Inspired by Backbone.View.
     * @returns {Backbone.$}
     */
    $: function () {
      if (this.$el)
        return this.$el.find.apply(this.$el, arguments);
    },
    /**
     * Wraps React.Component into Backbone.React.Component and extends to a new
     class.
     * @method extend
     * @memberof Component
     * @static
     */
    extend: function (Clazz) {
      function Factory (props, children) {
        return (new Wrapper(Component, props, children)).virtualComponent;
      }
      // Allow deep extending
      Factory.extend = function () {
        return Backbone.React.Component.extend(_.extend({}, Clazz, arguments[0]));
      };
      // Apply mixin
      if (Clazz.mixins) {
        if (Clazz.mixins[0] !== mixin)
          Clazz.mixins.splice(0, 0, mixin);
      } else
        Clazz.mixins = [mixin];
      // Create the react component later used by Factory
      var Component = React.createClass(_.extend(Factory.prototype, Clazz));
      return Factory;
    },
    /**
     * Crawls to the owner of the component searching for a collection.
     */
    getCollection: function () {
      var owner = this;
      while (!(owner.wrapper && owner.wrapper.collection)) owner = owner._owner;
      return owner.wrapper.collection;
    },
    /**
     * Crawls to the owner of the component searching for a model.
     * @returns {Backbone.Model}
     */
    getModel: function () {
      var owner = this;
      while (!(owner.wrapper && owner.wrapper.model)) owner = owner._owner;
      return owner.wrapper.model;
    },
    /**
     * Crawls this.props.__owner__ recursively until it finds the owner of this
     component. In case of being a parent component (no owners) it returns itself.
     * @returns {Backbone.React.Component}
     */
    getOwner: function () {
      var owner = this;
      while (owner._owner) owner = owner._owner;
      return owner;
    },
    /**
     * Renders/mounts the component. It delegates to React.renderComponent.
     * @param {DOMElement} [el=this.el] The DOM element where we want to mount
     the component.
     * @param {Callback} [onRender] Callback to be executed when the component
     is rendered/mounted. If not passed it syncs this.model or this.collection
     with this.props.
     * @returns {this}
     */
    mount: function (el, onRender) {
      if (!(el || this.el)) throw new Error('No element to mount on');
      else if (!el) el = this.el;
      this.wrapper.component = React.renderComponent(this, el, onRender);
      return this;
    },
    /**
     * Stops all listeners and unmounts this component from the DOM.
     */
    remove: function () {
      if (this.wrapper.component && this.wrapper.component.isMounted())
        this.unmount();
      this.wrapper.stopListening();
      this.stopListening();
    },
    /**
     * Sets a DOM element to render/mount this component on this.el and this.$el.
     * @param {DOMElement|Backbone.$} el The DOMElement where we want to render/mount
     the component.
     * @returns {this}
     */
    setElement: function (el) {
      if (el && Backbone.$ && el instanceof Backbone.$) {
        if (el.length > 1) throw new Error('You can only assign one element to a component');
        this.el = el[0];
        this.$el = el;
      } else if (el) {
        this.el = el;
        if (Backbone.$) this.$el = Backbone.$(el);
      }
      return this;
    },
    /**
     * Intended to be used on the server side (Nodejs), renders your component to
     a string ready to be used on the client side by delegating to React.renderComponentToString.
     * @returns {String} The HTML representation of this component.
     */
    toHTML: function () {
      // Since we're only able to call renderComponentToString once, lets clone this component
      // and use it insteaad.
      var clone = this.clone(this.props);
      return React.renderComponentToString(clone);
    },
    /**
     * Unmount the component from the DOM.
     * @throws {Error} If component isn't unmounted successfully.
     */
    unmount: function () {
      var parentNode = this.el.parentNode;
      if (!React.unmountComponentAtNode(parentNode)) {
        throw new Error('There was an error unmounting the component');
      }
      delete this.wrapper.component;
      this.setElement(parentNode);
    }
  };
  /**
   * Mixin used in all component instances.
   * @mixin
   */
  var mixin = {
    /**
     * Sets this.el and this.$el when the component mounts.
     */
    componentDidMount: function () {
      this.setElement(this.getDOMNode());
    },
    /**
     * Sets this.el and this.$el when the component updates.
     */
    componentDidUpdate: function () {
      this.setElement(this.getDOMNode());
    }
  };
  /**
   * Binds models and collections to a React.Component.
   * @class Wrapper
   * @mixes Backbone.Events
   */
  function Wrapper (Component, props) {
    props = props || {};
    var el, model = props.model, collection = props.collection;
    // Check if props.el is a DOM element or a jQuery object
    if (_.isElement(props.el) || Backbone.$ && props.el instanceof Backbone.$) {
      el = props.el;
      delete props.el;
    }
    // Check if props.model is a Backbone.Model or an hashmap of them
    if (model instanceof Backbone.Model ||
        model instanceof Object && _.values(model)[0] instanceof Backbone.Model) {
      delete props.model;
      /**
       * The model or models bound to this component.
       */
      this.model = model;
      // Set model(s) attributes on props for the first render
      this.setPropsBackbone(model, void 0, props);
    }
    // Check if props.collection is a Backbone.Collection or an hashmap of them
    if (collection instanceof Backbone.Collection ||
        collection instanceof Object && _.values(collection)[0] instanceof Backbone.Collection) {
      delete props.collection;
      /**
       * The collection or collections bound to this component.
       */
      this.collection = collection;
      // Set collection(s) models on props for the first render
      this.setPropsBackbone(collection, void 0, props);
    }
    // Instance the component mixing Backbone.Events, our public API and some special
    // properties.
    var component = this.virtualComponent = _.defaults(Component.apply(this, _.rest(arguments)),
        Backbone.Events, Backbone.React.Component, {
      /**
       * Clones the component wrapper and returns the component.
       * @returns {Backbone.React.Component}
       */
      clone: function (props, children) {
        return (new Wrapper(Component, props, children)).virtualComponent;
      },
      // Assign a component unique id, this is handy sometimes as a DOM attribute
      cid: _.uniqueId(),
      // One to one relationship between the wrapper and the component
      wrapper: this
    });
    // Set element
    if (el) component.setElement(el);
    // Call initialize if available
    if (component.initialize) component.initialize(props);
    // Start listeners if this is a root node
    if (!component._owner) {
      this.startModelListeners();
      this.startCollectionListeners();
    }
  }
  _.extend(Wrapper.prototype, Backbone.Events,
  /** @lends Wrapper.prototype */
  {
    /**
     * Sets this.props when a model/collection request results in error. It delegates to this.setProps.
     * @private
     * @param {Backbone.Model|Backbone.Collection} modelOrCollection The model or collection
     that was sync.
     * @param {Object} res The XHR error response.
     * @param {Object} options
     * @listens Backbone.Model#error
     * @listens Backbone.Collection#error
     */
    onError: function (modelOrCollection, res, options) {
      // Set props only if there's no silent option
      if (!options.silent)
        this.setProps({
          isRequesting: false,
          hasError: true,
          error: res
        });
    },
    /**
     * Sets this.props when a model/collection request starts. It delegates to this.setProps.
     * @private
     * @param {Backbone.Model|Backbone.Collection} modelOrCollection The model or collection
     that was sync.
     * @param {XMLHttpRequest} xhr
     * @param {Object} options
     * @listens Backbone.Model#request
     * @listens Backbone.Collection#request
     */
    onRequest: function (modelOrCollection, xhr, options) {
      // Set props only if there's no silent option
      if (!options.silent)
        this.setProps({
          isRequesting: true,
          hasError: false
        });
    },
    /**
     * Sets this.props when a model/collection syncs. It delegates to this.setProps.
     * @private
     * @param {Backbone.Model|Backbone.Collection} modelOrCollection The model or collection
     that was sync.
     * @param {Object} res The XHR request response.
     * @param {Object} options
     * @listens Backbone.Model#sync
     * @listens Backbone.Collection#sync
     */
    onSync: function (modelOrCollection, res, options) {
      // Set props only if there's no silent option
      if (!options.silent)
        this.setProps({isRequesting: false});
    },
    /**
     * Used internally to set this.collection or this.model on this.props. Delegates to
     this.setProps.
     * @private
     * @param {Backbone.Collection|Backbone.Model|Object} modelOrCollection The
    model or collection or hashmap of them that we're delegating to this.setProps.
     * @param {String} [key] In case of multiple collections a key is passed to identify
     the collection.
     * @param {Object} [target] Used by the constructor to set props for the component
     first render.
     * @listens Backbone.Collection#add
     * @listens Backbone.Collection#remove
     * @listens Backbone.Collection#change
     * @listens Backbone.Model#change
     */
    setPropsBackbone: function (modelOrCollection, key, target) {
      if (!(modelOrCollection instanceof Backbone.Collection ||
            modelOrCollection instanceof Backbone.Model)) {
        for (key in modelOrCollection)
          this.setPropsBackbone(modelOrCollection[key], key, target);
        return;
      }
      this.setProps.apply(this, arguments);
    },
    /**
     * Sets a model, collection or object into this.props by delegating to this.setProps.
     * @private
     * @param {Backbone.Collection|Backbone.Model|Object} [modelOrCollection] The model
     or collection we're setting into this.props or target. Also accepts a raw object.
     * @param {String} [key] The key to be used inside this.props.
     * @param {Object} [target] If we're setting the data on an object instead of
     delegating to this.setProps.
     */
    setProps: function (modelOrCollection, key, target) {
      // If the component isn't rendered/mounted set target because you can't set props
      // on an unmounted (virtual) component.
      if (!target && !(this.component && this.component.isMounted())) target = this.virtualComponent.props;
      var props = {};
      var newProps = modelOrCollection.toJSON ? modelOrCollection.toJSON() : modelOrCollection;

      if (key)
        props[key] = newProps;
      else if (modelOrCollection instanceof Backbone.Collection)
        props.collection = newProps;
      else // if (modelOrCollection instanceof Backbone.Model)
        props = newProps;
      
      if (target) _.extend(target, props);
      else {
        this.nextProps = _.extend(this.nextProps || {}, props);
        _.defer(_.bind(function () {
          if (this.nextProps) {
            this.component.setProps(this.nextProps);
            delete this.nextProps;
          }
        }, this));
      }
    },
    /**
     * Binds this.props.collection to any this.collection changes, making the component
     to get instantly rerendered. This has high performance since it uses the
     {@link http://facebook.github.io/react/|React} virtual DOM.
     * @param {Backbone.Collection|Object} [collection=this.collection] In case of being
     an object it calls startCollectionListeners for each entry.
     * @param {String} [key] In case of multiple collections a key is passed to identify
     the collection.
     */
    startCollectionListeners: function (collection, key) {
      if (!collection) collection = this.collection;
      if (collection instanceof Backbone.Collection)
        this
          .listenTo(collection, 'add remove change sort', _.partial(this.setPropsBackbone, collection, key, void 0))
          .listenTo(collection, 'error', this.onError)
          .listenTo(collection, 'request', this.onRequest)
          .listenTo(collection, 'sync', this.onSync);
      else if (collection)
        for (key in collection)
          this.startCollectionListeners(collection[key], key);
    },
    /**
     * Binds this.props to any this.model changes, making the screen component
     get instantly rerendered in the screen. This has high performance
     since it uses the {@link http://facebook.github.io/react/|React} virtual DOM.
     * @param {Backbone.Model|Object} [model=this.model] In case of being
     an object it calls startModelListeners for each entry.
     * @param {String} [key] In case of multiple models a key is passed to identify
     the model.
     */
    startModelListeners: function (model, key) {
      if (!model) model = this.model;
      if (model instanceof Backbone.Model)
        this
          .listenTo(model, 'change', _.partial(this.setPropsBackbone, model, key, void 0))
          .listenTo(model, 'error', this.onError)
          .listenTo(model, 'request', this.onRequest)
          .listenTo(model, 'sync', this.onSync);
      else if (model)
        for (key in model)
          this.startModelListeners(model[key], key);
    }
  });

  return Backbone.React.Component;
}));