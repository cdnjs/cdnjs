// Backbone React Component
// ========================
//
//     Backbone.React.Component v0.6.2
//
//     (c) 2014 "Magalhas" José Magalhães <magalhas@gmail.com>
//     Backbone.React.Component can be freely distributed under the MIT license.
//
//
// `Backbone.React.Component` is a React.Component wrapper that serves
// as a bridge between the React and Backbone worlds. Besides some extra members
// that may be set by extending/instancing a component, it works pretty much the
// same way that [React](http://facebook.github.io/react/) components do.
//
// When mounted (if using mixin mode) or created (wrapper mode) it starts listening
// to models and collections changes to automatically set your component props and
// achieve UI binding through reactive updates.
//
//
// Basic usage
//
//     var MyComponent = Backbone.React.Component.extend({
//       render: function () {
//         return <div>{this.props.foo}</div>;
//       }
//     });
//     var model = new Backbone.Model({foo: 'bar'});
//     var myComponent = <MyComponent el={document.body} model={model} />;
//     myComponent.mount();
//
// Mixin usage
//
//     var MyComponent = React.createClass({
//       mixins: [Backbone.React.Component.mixin],
//       render: function () {
//         return <div>{this.props.foo}</div>;
//       }
//     });
//     var model = new Backbone.Model({foo: 'bar'});
//     React.renderComponent(<MyComponent el={document.body} model={model} />, document.body);

'use strict';
(function (root, factory) {
  // Universal module definition
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
  // Here lies the public API available on each component that runs through the wrapper
  // instead of the mixin approach.
  if (!Backbone.React) Backbone.React = {};
  Backbone.React.Component = {
    // Wraps `React.Component` into `Backbone.React.Component` and extends to a new
    // class.
    extend: function (Clazz) {
      function Factory (props, children) {
        // there may be more than one child, i.e. more than two function arguments

        // turn Arguments list into an array
        var args = Array.prototype.slice.call(arguments);
        // wrap Wrapper constructor to be able to apply arguments
        var W = function() {
          return Wrapper.apply(this, [Component].concat(args));
        };
        W.prototype = Wrapper.prototype;

        return (new W()).virtualComponent;
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
      // Create the react component later used by `Factory`
      var Component = React.createClass(_.extend(Factory.prototype, Clazz));
      return Factory;
    },
    // Renders/mounts the component. It delegates to `React.renderComponent`.
    mount: function (el, onRender) {
      if (!(el || this.el)) throw new Error('No element to mount on');
      else if (!el) el = this.el;
      this.wrapper.component = React.renderComponent(this, el, onRender);
      return this;
    },
    // Stops all listeners and unmounts this component from the DOM.
    remove: function () {
      if (this.wrapper.component && this.wrapper.component.isMounted())
        this.unmount();
      this.wrapper.stopListening();
      this.stopListening();
    },
    // Intended to be used on the server side (Node.js), renders your component to a string
    // ready to be used on the client side by delegating to `React.renderComponentToString`.
    toHTML: function () {
      // Since we're only able to call `renderComponentToString` once, lets clone this component
      // and use it insteaad.
      var clone = this.clone(_.extend({}, this.props, {
        collection: this.wrapper.collection,
        model: this.wrapper.model
      }));
      // Return the html representation of the component.
      return React.renderComponentToString(clone);
    },
    // Unmount the component from the DOM.
    unmount: function () {
      var parentNode = this.el.parentNode;
      if (!React.unmountComponentAtNode(parentNode)) {
        // Throw an error if there's any unmounting the component.
        throw new Error('There was an error unmounting the component');
      }
      delete this.wrapper.component;
      this.setElement(parentNode);
    }
  };
  // Mixin used in all component instances. Exported through `Backbone.React.Component.mixin`.
  var mixin = Backbone.React.Component.mixin = {
    // Sets this.el and this.$el when the component mounts.
    componentDidMount: function () {
      this.setElement(this.getDOMNode());
    },
    // Sets this.el and this.$el when the component updates.
    componentDidUpdate: function () {
      this.setElement(this.getDOMNode());
    },
    // Checks if the component is running in mixin or wrapper mode when it mounts.
    // If it's a mixin set a flag for later use and instance a Wrapper to take care
    // of models and collections binding.
    componentWillMount: function () {
      if (!this.wrapper) {
        this.isBackboneMixin = true;
        this.wrapper = new Wrapper(this, this.props);
      }
    },
    // If running in mixin mode disposes of the wrapper that was created when the
    // component mounted.
    componentWillUnmount: function () {
      if (this.wrapper && this.isBackboneMixin) {
        this.wrapper.stopListening();
        delete this.wrapper;
      }
    },
    // Shortcut to this.$el.find. Inspired by Backbone.View.
    $: function () {
      if (this.$el)
        return this.$el.find.apply(this.$el, arguments);
    },
    // Crawls to the owner of the component searching for a collection.
    getCollection: function () {
      var owner = this;
      var lookup = owner.wrapper;
      while (!lookup.collection) {
        owner = owner._owner;
        if (!owner) throw new Error('Collection not found');
        lookup = owner.wrapper;
      }
      return lookup.collection;
    },
    // Crawls to the owner of the component searching for a model.
    getModel: function () {
      var owner = this;
      var lookup = owner.wrapper;
      while (!lookup.model) {
        owner = owner._owner;
        if (!owner) throw new Error('Model not found');
        lookup = owner.wrapper;
      }
      return lookup.model;
    },
    // Crawls `this._owner` recursively until it finds the owner of this
    // component. In case of being a parent component (no owners) it returns itself.
    getOwner: function () {
      var owner = this;
      while (owner._owner) owner = owner._owner;
      return owner;
    },
    // Sets a DOM element to render/mount this component on this.el and this.$el.
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
    }
  };
  // Binds models and collections to a React.Component. It mixes Backbone.Events.
  function Wrapper (Component, props) {
    props = props || {};
    var el, model = props.model, collection = props.collection;
    // Check if props.el is a DOM element or a jQuery object
    if (_.isElement(props.el) || Backbone.$ && props.el instanceof Backbone.$) {
      el = props.el;
      delete props.el;
    }
    // Check if props.model is a Backbone.Model or an hashmap of them
    if (typeof model !== 'undefined' && (model.attributes ||
        typeof model === 'object' && _.values(model)[0].attributes)) {
      delete props.model;
      // The model(s) bound to this component
      this.model = model;
      // Set model(s) attributes on props for the first render
      this.setPropsBackbone(model, void 0, props);
    }
    // Check if props.collection is a Backbone.Collection or an hashmap of them
    if (typeof collection !== 'undefined' && (collection.models ||
        typeof collection === 'object' && _.values(collection)[0].models)) {
      delete props.collection;
      // The collection(s) bound to this component
      this.collection = collection;
      // Set collection(s) models on props for the first render
      this.setPropsBackbone(collection, void 0, props);
    }
    var component;
    if (Component.prototype) {
      // Instance the component mixing Backbone.Events, our public API and some special
      // properties.
      component = this.virtualComponent = _.defaults(Component.apply(this, _.rest(arguments)).__realComponentInstance,
          Backbone.Events, _.omit(Backbone.React.Component, 'mixin'), {
        // Clones the component wrapper and returns the component.
        clone: function (props, children) {
          return (new Wrapper(Component, props, children)).virtualComponent;
        },
        // Assign a component unique id, this is handy sometimes as a DOM attribute
        cid: _.uniqueId(),
        // One to one relationship between the wrapper and the component
        wrapper: this
      });
      // Set element
      if (el) mixin.setElement.call(component, el);
    } else {
      component = Component;
      this.component = component;
    }
    // Start listeners if this is a root node
    if (!component._owner) {
      this.startModelListeners();
      this.startCollectionListeners();
    }
  }
  // Mixing `Backbone.Events` into `Wrapper.prototype`
  _.extend(Wrapper.prototype, Backbone.Events, {
    // Sets this.props when a model/collection request results in error. It delegates
    // to `this.setProps`. It listens to `Backbone.Model#error` and `Backbone.Collection#error`.
    onError: function (modelOrCollection, res, options) {
      // Set props only if there's no silent option
      if (!options.silent)
        this.setProps({
          isRequesting: false,
          hasError: true,
          error: res
        });
    },
    // Sets this.props when a model/collection request starts. It delegates to
    // `this.setProps`. It listens to `Backbone.Model#request` and `Backbone.Collection#request`.
    onRequest: function (modelOrCollection, xhr, options) {
      // Set props only if there's no silent option
      if (!options.silent)
        this.setProps({
          isRequesting: true,
          hasError: false
        });
    },
    // Sets this.props when a model/collection syncs. It delegates to `this.setProps`.
    // It listens to `Backbone.Model#sync` and `Backbone.Collection#sync`
    onSync: function (modelOrCollection, res, options) {
      // Set props only if there's no silent option
      if (!options.silent)
        this.setProps({isRequesting: false});
    },
    // Used internally to set this.collection or this.model on this.props. Delegates to
    // `this.setProps`. It listens to `Backbone.Collection#add`, `Backbone.Collection#remove`,
    // `Backbone.Collection#change` and `Backbone.Model#change`.
    setPropsBackbone: function (modelOrCollection, key, target) {
      if (!(modelOrCollection.models || modelOrCollection.attributes)) {
        for (key in modelOrCollection)
            this.setPropsBackbone(modelOrCollection[key], key, target);
        return;
      }
      this.setProps.apply(this, arguments);
    },
    // Sets a model, collection or object into props by delegating to `React.Component#setProps`.
    setProps: function (modelOrCollection, key, target) {
      // If the component isn't rendered/mounted set target because you can't set props
      // on an unmounted (virtual) component.
      if (!target && !(this.component && this.component.isMounted()))
        target = this.virtualComponent.props;
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
        this.nextProps = _.extend(this.nextProps || {}, props);
        _.defer(_.bind(function () {
          if (this.nextProps) {
            this.component && this.component.setProps(this.nextProps);
            delete this.nextProps;
          }
        }, this));
      }
    },
    // Binds the component to any collection changes.
    startCollectionListeners: function (collection, key) {
      if (!collection) collection = this.collection;
      if (collection) {
        if (collection.models)
          this
            .listenTo(collection, 'add remove change sort reset',
              _.partial(this.setPropsBackbone, collection, key, void 0))
            .listenTo(collection, 'error', this.onError)
            .listenTo(collection, 'request', this.onRequest)
            .listenTo(collection, 'sync', this.onSync);
        else if (typeof collection === 'object')
          for (key in collection)
            if (collection.hasOwnProperty(key))
              this.startCollectionListeners(collection[key], key);
      }
    },
    // Binds the component to any model changes.
    startModelListeners: function (model, key) {
      if (!model) model = this.model;
      if (model) {
        if (model.attributes)
          this
            .listenTo(model, 'change',
              _.partial(this.setPropsBackbone, model, key, void 0))
            .listenTo(model, 'error', this.onError)
            .listenTo(model, 'request', this.onRequest)
            .listenTo(model, 'sync', this.onSync);
        else if (typeof model === 'object')
          for (key in model)
            this.startModelListeners(model[key], key);
      }
    }
  });

  // Expose `Backbone.React.Component`.
  return Backbone.React.Component;
}));
// <a href="https://github.com/magalhas/backbone-react-component"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://github-camo.global.ssl.fastly.net/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>
