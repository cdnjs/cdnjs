/**
 * Backbone.React.Component
 * @version 0.4.2
 * @author "Magalhas" José Magalhães <magalhas@gmail.com>
 * @license MIT <http://opensource.org/licenses/MIT>
 */
'use strict';
(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['react', 'backbone', 'underscore'], factory);
  else if (typeof module !== 'undefined') {
    var React = require('react');
    var Backbone = require('backbone');
    var _ = require('underscore');
    module.exports = factory(React, Backbone, _);
  } else
    factory(root.React, root.Backbone, root._);
}(this, function (React, Backbone, _) {
  /**
   * @class Backbone.React.Component
   * @extends React.Component
   * @mixes Backbone.Events
   * @desc The Reactor.Component is a React.Component wrapper to serve
   as a bridge between the React and Backbone worlds. Besides some extra members
   that may be set by extending/instancing a component, it works pretty much the
   same way that {@link http://facebook.github.io/react/|React} components do.
   <br />
   When bound to a model, the component gets automatically mounted/rendered on
   the DOM as the model changes. If already rendered it just updates the element
   by using {@link http://facebook.github.io/react/|React} virtual DOM engine.
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
  Backbone.React.Component = function (props) {
    props = props || {};
    // Assign a component unique id, this is handy sometimes as a DOM attribute
    this.cid = _.uniqueId();
    // Check if props.el is a DOM element or a jQuery object
    var el = props.el, model = props.model, collection = props.collection;
    if (_.isElement(el) ||
        Backbone.$ && el instanceof Backbone.$) {
      this.setElement(el);
      delete props.el;
    }
    // Check if props.model is a Backbone.Model or an array of them
    if (model instanceof Backbone.Model ||
        model instanceof Object && _.values(model)[0] instanceof Backbone.Model) {
      /**
       * The model or models bound to this component. It'll bind any changes
       to this.props.
       * @member
       */
      this.model = model;
      delete props.model;
      // Set model(s) attributes on props for the first render
      this.__setPropsBackbone__(model, void 0, props);
    }
    // Check if props.collection is a Backbone.Collection or an array of them
    if (collection instanceof Backbone.Collection ||
        collection instanceof Object && _.values(collection)[0] instanceof Backbone.Collection) {
      /**
       * The collection or collections bound to this component. It'll bind any changes
       to this.props.collection.
       * @member
       */
      this.collection = collection;
      delete props.collection;
      // Set collection(s) models on props for the first render
      this.__setPropsBackbone__(collection, void 0, props);
    }
  };
  /**
   * Wraps React.Component into Backbone.React.Component and extends to a new
   class.
   * @method extend
   * @memberof Component
   * @static
   */
  Backbone.React.Component.extend = function (Clazz) {
    function Factory (props) {
      var t = new Backbone.React.Component(props);
      var component = Component.apply(this, arguments);
      _.extend(component, t);
      // Set the factory on the component if we want to instance a component of the same
      // type in the future.
      component.__factory__ = Factory;
      // Call initialize if available
      if (component.initialize) component.initialize(props);
      // Start component listeners
      component.__startModelListeners__();
      component.__startCollectionListeners__();
      return component;
    }
    Factory.extend = function () {
      return Backbone.React.Component.extend(_.extend({}, Clazz, arguments[0]));
    };
    var Component = React.createClass(_.extend(
      Factory.prototype,
      Backbone.React.Component.prototype,
      Clazz
    ));
    return Factory;
  };
  _.extend(Backbone.React.Component.prototype, Backbone.Events,
  /** @lends Backbone.React.Component.prototype */
  {
    mixins: [{
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
    }],
    /**
     * Shortcut to this.$el.find. Inspired by Backbone.View.
     * @returns {Backbone.$}
     */
    $: function () {
      if (this.$el)
        return this.$el.find.apply(this.$el, arguments);
    },
    /**
     * Crawls to the owner of the component and gets the collection.
     */
    getCollection: function () {
      return this.getOwner().collection;
    },
    /**
     * Crawls to the owner of the component and gets the model.
     * @returns {Backbone.Model}
     */
    getModel: function () {
      return this.getOwner().model;
    },
    /**
     * Crawls this.props.__owner__ recursively until it finds the owner of this
     component. In case of being a parent component (no owners) it returns itself.
     * @returns {Backbone.React.Component}
     */
    getOwner: function () {
      var owner = this;
      while (owner.props.__owner__) owner = owner.props.__owner__;
      return owner;
    },
    /**
     * Renders/mounts the component through {@link http://facebook.github.io/react/|React}.
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
      React.renderComponent(this, el, onRender);
      return this;
    },
    /**
     * Stops all listeners and unmounts this component from the DOM.
     */
    remove: function () {
      if (this.isMounted()) this.unmount();
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
     * @param {Function} callback Receives the HTML representation of this component as an
     argument.
     */
    toHTML: function (callback) {
      if (!callback) throw new Error('Useless to call toHTML without a callback');
      // Since we're only able to call renderComponentToString once, lets clone this component
      // and use it insteaad.
      var clone = new this.__factory__(this.props);
      React.renderComponentToString(clone, callback);
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
      this.setElement(parentNode);
    },
    /**
     * Sets this.props.hasError when a model/collection request results in error.
     * @private
     * @listens Backbone.Model#error
     * @listens Backbone.Collection#error
     * @todo Improve error handling
     */
    __onError__: function () {
      // Set props only if there's no silent option
      if (!arguments[arguments.length - 1].silent)
        this.__setProps__({
          isRequesting: false,
          hasError: true
        });
    },
    /**
     * Sets this.props.isRequesting when a model/collection request starts.
     * @private
     * @listens Backbone.Model#request
     * @listens Backbone.Collection#request
     */
    __onRequest__: function () {
      // Set props only if there's no silent option
      var lastArg = arguments[arguments.length - 1];
      if (!(lastArg && lastArg.silent))
        this.__setProps__({isRequesting: true});
    },
    /**
     * Sets this.props. It delegates to this.__setPropsBackbone__.
     * @private
     * @param {Backbone.Model|Backbone.Collection} modelOrCollection The model or collection
     that was sync.
     * @param {String} [key] The collection or model identifier.
     * @listens Backbone.Model#sync
     * @listens Backbone.Collection#sync
     */
    __onSync__: function () {
      // Set props only if there's no silent option
      var lastArg = arguments[arguments.length - 1];
      if (!(lastArg && lastArg.silent))
        this.__setProps__({isRequesting: false});
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
    __setProps__: function (modelOrCollection, key, target) {
      // If the component isn't rendered/mounted set target because you can't set props
      // on an unmounted target. This hack was intended for the server but seems to bring
      // no drawbacks on the client side.
      if ((this.isMounted && !this.isMounted()) && !target) target = this.props;
      var props = {};
      var newProps = modelOrCollection.toJSON ? modelOrCollection.toJSON() : modelOrCollection;

      if (key)
        props[key] = newProps;
      else if (modelOrCollection instanceof Backbone.Collection)
        props.collection = newProps;
      else
        props = newProps;
      
      if (target) _.extend(target, props);
      else {
        this.__nextProps__ = _.extend(this.__nextProps__ || {}, props);
        _.defer(function () {
          if (this.__nextProps__) {
            this.setProps(this.__nextProps__);
            delete this.__nextProps__;
          }
        }.bind(this));
      }
    },
    /**
     * Used internally to set this.collection or this.model on this.props. Delegates to
     this.__setProps__.
     * @private
     * @param {Backbone.Collection|Backbone.Model|Object} modelOrCollection The
    model or collection or hashmap of them that we're delegating to this.__setProps__.
     * @param {String} [key] In case of multiple collections a key is passed to identify
     the collection.
     * @param {Object} [target] Used by the constructor to set props for the component
     first render.
     * @listens Backbone.Collection#add
     * @listens Backbone.Collection#remove
     * @listens Backbone.Collection#change
     * @listens Backbone.Model#change
     */
    __setPropsBackbone__: function (modelOrCollection, key, target) {
      if (!(modelOrCollection instanceof Backbone.Collection) &&
          !(modelOrCollection instanceof Backbone.Model)) {
        for (key in modelOrCollection)
          this.__setPropsBackbone__(modelOrCollection[key], key, target);
        return;
      }
      this.__setProps__.apply(this, arguments);
    },
    /**
     * Binds this.props.collection to any this.collection changes, making the component
     to get instantly rerendered. This has high performance since it uses the
     {@link http://facebook.github.io/react/|React} virtual DOM.
     * @param {Backbone.Collection|Object} [collection=this.collection] In case of being
     an object it calls __startCollectionListeners__ for each entry.
     * @param {String} [key] In case of multiple collections a key is passed to identify
     the collection.
     */
    __startCollectionListeners__: function (collection, key) {
      if (!collection) collection = this.collection;
      if (collection instanceof Backbone.Collection)
        this
          .listenTo(collection, 'add remove change sort', this.__setPropsBackbone__.bind(this, collection, key, void 0))
          .listenTo(collection, 'error', this.__onError__.bind(this, collection, key))
          .listenTo(collection, 'request', this.__onRequest__.bind(this, collection, key))
          .listenTo(collection, 'sync', this.__onSync__.bind(this, collection, key));
      else if (collection)
        for (key in collection)
          this.__startCollectionListeners__(collection[key], key);
    },
    /**
     * Binds this.props to any this.model changes, making the screen component
     get instantly rerendered in the screen. This has high performance
     since it uses the {@link http://facebook.github.io/react/|React} virtual DOM.
     * @param {Backbone.Model|Object} [model=this.model] In case of being
     an object it calls __startModelListeners__ for each entry.
     * @param {String} [key] In case of multiple models a key is passed to identify
     the model.
     */
    __startModelListeners__: function (model, key) {
      if (!model) model = this.model;
      if (model instanceof Backbone.Model)
        this
          .listenTo(model, 'change', this.__setPropsBackbone__.bind(this, model, key, void 0))
          .listenTo(model, 'error', this.__onError__.bind(this, model, key))
          .listenTo(model, 'request', this.__onRequest__.bind(this, model, key))
          .listenTo(model, 'sync', this.__onSync__.bind(this, model, key));
      else if (model)
        for (key in model)
          this.__startModelListeners__(model[key], key);
    }
  });

  return Backbone.React.Component;
}));