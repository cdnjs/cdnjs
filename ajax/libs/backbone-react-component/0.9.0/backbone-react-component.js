// Backbone React Component
// ========================
//
//     Backbone.React.Component v0.9.0
//
//     (c) 2014 "Magalhas" José Magalhães <magalhas@gmail.com>
//     Backbone.React.Component can be freely distributed under the MIT license.
//
//
// `Backbone.React.Component` is a mixin that glues [Backbone](http://backbonejs.org/)
// models and collections into [React](http://facebook.github.io/react/) components.
//
// When the component is mounted, a wrapper starts listening to models and
// collections changes to automatically set your component state and achieve UI
// binding through reactive updates.
//
//
//
// Basic Usage
//
//     var MyComponent = React.createClass({
//       mixins: [Backbone.React.Component.mixin],
//       render: function () {
//         return <div>{this.state.model.foo}</div>;
//       }
//     });
//     var model = new Backbone.Model({foo: 'bar'});
//     React.render(<MyComponent model={model} />, document.body);

(function (root, factory) {
  // Universal module definition
  if (typeof define === 'function' && define.amd) {
    define(['react', 'backbone', 'underscore'], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('react'), require('backbone'), require('underscore'));
  } else {
    factory(root.React, root.Backbone, root._);
  }
}(this, function (React, Backbone, _) {
  'use strict';
  if (!Backbone.React) {
    Backbone.React = {};
  }
  if (!Backbone.React.Component) {
    Backbone.React.Component = {};
  }
  // Mixin used in all component instances. Exported through `Backbone.React.Component.mixin`.
  var mixin = Backbone.React.Component.mixin = {
    // Types of the context passed to child components. Only
    // `hasParentBackboneMixin` is required all of the others are optional.
    childContextTypes: {
      hasParentBackboneMixin: React.PropTypes.bool.isRequired,
      parentModel: React.PropTypes.any,
      parentCollection: React.PropTypes.any
    },
    // Types of the context received from the parent component. All of them are
    // optional.
    contextTypes: {
      hasParentBackboneMixin: React.PropTypes.bool,
      parentModel: React.PropTypes.any,
      parentCollection: React.PropTypes.any
    },
    // Passes data to our child components.
    getChildContext: function () {
      return {
        hasParentBackboneMixin: true,
        parentModel: this.getModel(),
        parentCollection: this.getCollection()
      };
    },
    // Sets `this.el` and `this.$el` when the component mounts.
    componentDidMount: function () {
      this.setElement(React.findDOMNode(this));
    },
    // Sets `this.el` and `this.$el` when the component updates.
    componentDidUpdate: function () {
      this.setElement(React.findDOMNode(this));
    },
    // When the component gets the initial state, instance a `Wrapper` to take
    // care of models and collections binding with `this.state`.
    getInitialState: function () {
      var initialState = {};

      if (!this.wrapper) {
        this.wrapper = new Wrapper(this, initialState);
      }

      return initialState;
    },
    // When the component mounts, instance a `Wrapper` to take care
    // of models and collections binding with `this.state`.
    componentWillMount: function () {
      if (!this.wrapper) {
        this.wrapper = new Wrapper(this);
      }
    },
    // When the component unmounts, dispose listeners and delete
    // `this.wrapper` reference.
    componentWillUnmount: function () {
      if (this.wrapper) {
        this.wrapper.stopListening();
        delete this.wrapper;
      }
    },
    // In order to allow passing nested models and collections as reference we
    // filter `nextProps.model` and `nextProps.collection`.
    componentWillReceiveProps: function (nextProps) {
      var model = nextProps.model;
      var collection = nextProps.collection;

      if (this.wrapper.model && model) {
        if (this.wrapper.model !== model) {
          this.wrapper.stopListening();
          this.wrapper = new Wrapper(this, void 0, nextProps);
        }
      } else if (model) {
        this.wrapper = new Wrapper(this, void 0, nextProps);
      }

      if (this.wrapper.collection && collection) {
        if (this.wrapper.collection !== collection) {
          this.wrapper.stopListening();
          this.wrapper = new Wrapper(this, void 0, nextProps);
        }
      } else if (collection) {
        this.wrapper = new Wrapper(this, void 0, nextProps);
      }
    },
    // Shortcut to `@$el.find` if jQuery ins present, else if fallbacks to DOM
    // native `querySelector`. Inspired by `Backbone.View`.
    $: function () {
      var els;

      if (this.$el) {
        els = this.$el.find.apply(this.$el, arguments);
      } else {
        var el = React.findDOMNode(this);
        els = el.querySelector.apply(el, arguments);
      }

      return els;
    },
    // Grabs the collection from `@wrapper.collection` or `@context.parentCollection`
    getCollection: function () {
      return this.wrapper.collection || this.context.parentCollection;
    },
    // Grabs the model from `@wrapper.model` or `@context.parentModel`
    getModel: function () {
      return this.wrapper.model || this.context.parentModel;
    },
    // Sets a DOM element to render/mount this component on this.el and this.$el.
    setElement: function (el) {
      if (el && Backbone.$ && el instanceof Backbone.$) {
        if (el.length > 1) {
          throw new Error('You can only assign one element to a component');
        }
        this.el = el[0];
        this.$el = el;
      } else if (el) {
        this.el = el;
        if (Backbone.$) {
          this.$el = Backbone.$(el);
        }
      }
      return this;
    }
  };
  // Binds models and collections to a `React.Component`. It mixes `Backbone.Events`.
  function Wrapper (component, initialState, nextProps) {
    // Object to store wrapper state (not the component state)
    this.state = {};
    // 1:1 relation with the `component`
    this.component = component;
    // Use `nextProps` or `component.props` and grab `model` and `collection`
    // from there
    var props = nextProps || component.props || {};
    var model, collection;

    if (component.overrideModel && typeof component.overrideModel === 'function'){
      // Define overrideModel() method on your `React class` to programatically supply a model object
      // Will override `this.props.model`
      model = component.overrideModel();
    } else {
      model = props.model;
    }

    if (component.overrideCollection && typeof component.overrideCollection === 'function'){
      // Define overrideCollection() method on your `React class` to programatically supply a collection object
      // Will override `this.props.collection`
      collection = component.overrideCollection();
    } else {
      collection = props.collection;
    }

    this.setModels(model, initialState);
    this.setCollections(collection, initialState);
  }
  // Mixing `Backbone.Events` into `Wrapper.prototype`
  _.extend(Wrapper.prototype, Backbone.Events, {
    // Sets `this.state` when a model/collection request results in error. It delegates
    // to `this.setState`. It listens to `Backbone.Model#error` and `Backbone.Collection#error`.
    onError: function (modelOrCollection, res, options) {
      // Set state only if there's no silent option
      if (!options.silent) {
        this.component.setState({
          isRequesting: false,
          hasError: true,
          error: res
        });
      }
    },
    onInvalid: function (model, res, options) {
      if (!options.silent) {
        this.component.setState({
          isInvalid: true
        });
      }
    },
    // Sets `this.state` when a model/collection request starts. It delegates to
    // `this.setState`. It listens to `Backbone.Model#request` and
    // `Backbone.Collection#request`.
    onRequest: function (modelOrCollection, xhr, options) {
      // Set `state` only if there's no silent option
      if (!options.silent) {
        this.component.setState({
          isRequesting: true,
          hasError: false,
          isInvalid: false
        });
      }
    },
    // Sets `this.state` when a model/collection syncs. It delegates to `this.setState`.
    // It listens to `Backbone.Model#sync` and `Backbone.Collection#sync`
    onSync: function (modelOrCollection, res, options) {
      // Calls `setState` only if there's no silent option
      if (!options.silent) {
        this.component.setState({isRequesting: false});
      }
    },
    // Check if `models` is a `Backbone.Model` or an hashmap of them, sets them
    // to the component state and binds to update on any future changes
    setModels: function (models, initialState, isDeferred) {
      var isValid = typeof models !== 'undefined';

      if (isValid) {
        if (!models.attributes) {
          if (typeof models === 'object') {
            var _values = _.values(models);
            isValid = _values.length > 0 && _values[0].attributes;
          } else {
            isValid = false;
          }
        }
      }

      if (isValid) {
        this.model = models;
        // Set model(s) attributes on `initialState` for the first render
        this.setStateBackbone(models, void 0, initialState, isDeferred);
        this.startModelListeners(models);
      }
    },
    // Check if `collections` is a `Backbone.Model` or an hashmap of them,
    // sets them to the component state and binds to update on any future changes
    setCollections: function (collections, initialState, isDeferred) {
      if (typeof collections !== 'undefined' && (collections.models ||
          typeof collections === 'object' && _.values(collections)[0].models)) {
        // The collection(s) bound to this component
        this.collection = collections;
        // Set collection(s) models on `initialState` for the first render
        this.setStateBackbone(collections, void 0, initialState, isDeferred);
        this.startCollectionListeners(collections);
      }
    },
    // Used internally to set `this.collection` or `this.model` on `this.state`. Delegates to
    // `this.setState`. It listens to `Backbone.Collection` events such as `update`,
    // `change`, `sort`, `reset` and to `Backbone.Model` `change`.
    setStateBackbone: function (modelOrCollection, key, target, isDeferred) {
      if (!(modelOrCollection.models || modelOrCollection.attributes)) {
        for (key in modelOrCollection)
            this.setStateBackbone(modelOrCollection[key], key, target);
        return;
      }
      this.setState.apply(this, arguments);
    },
    // Sets a model, collection or object into state by delegating to `this.component.setState`.
    setState: function (modelOrCollection, key, target, isDeferred) {
      var state = {};
      var newState = modelOrCollection.toJSON ? modelOrCollection.toJSON() : modelOrCollection;

      if (key) {
        state[key] = newState;
      } else if (modelOrCollection.models) {
        state.collection = newState;
      } else {
        state.model = newState;
      }

      if (target) {
        _.extend(target, state);
      } else if (isDeferred) {
        this.nextState = _.extend(this.nextState || {}, state);
        _.defer(_.bind(function () {
          if (this.nextState) {
            this.component.setState(this.nextState);
            this.nextState = null;
          }
        }, this));
      } else {
        this.component.setState(state);
      }
    },
    // Binds the component to any collection changes.
    startCollectionListeners: function (collection, key) {
      if (!collection) collection = this.collection;
      if (collection) {
        if (collection.models)
          this
            .listenTo(collection, 'update change sort reset',
              _.partial(this.setStateBackbone, collection, key, void 0, true))
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
              _.partial(this.setStateBackbone, model, key, void 0, true))
            .listenTo(model, 'error', this.onError)
            .listenTo(model, 'request', this.onRequest)
            .listenTo(model, 'sync', this.onSync)
            .listenTo(model, 'invalid', this.onInvalid);
        else if (typeof model === 'object')
          for (key in model)
            this.startModelListeners(model[key], key);
      }
    }
  });

  // Facade method to bypass the `mixin` usage. For use cases such as ES6
  // classes or else. It binds any `Backbone.Model` and `Backbone.Collection`
  // instance found inside `backboneInstances.models` and
  // `backboneInstances.collections` (single instances or objects of them)
  mixin.on = function (component, backboneInstances) {
    var wrapper;

    if (!component.wrapper) {
      wrapper = new Wrapper(component);
    } else {
      wrapper = component.wrapper;
    }

    if (backboneInstances.models) {
      wrapper.setModels(backboneInstances.models);
    }
    if (backboneInstances.collections) {
      wrapper.setCollections(backboneInstances.collections);
    }
    component.wrapper = wrapper;
  };

  // Shortcut method to bind a model or multiple models
  mixin.onModel = function (component, models) {
    mixin.on(component, {models: models});
  };

  // Shortcut method to bind a collection or multiple collections
  mixin.onCollection = function (component, collections) {
    mixin.on(component, {collections: collections});
  };

  // Facade method to dispose of a `component.wrapper`
  mixin.off = function (component, modelOrCollection) {
    if (arguments.length === 2) {
      if (component.wrapper) {
        component.wrapper.stopListening(modelOrCollection);
        // TODO Remove modelOrCollection from `component.state`?
      }
    } else {
      mixin.componentWillUnmount.call(component);
    }
  };

  // Expose `Backbone.React.Component.mixin`.
  return mixin;
}));
// <a href="https://github.com/magalhas/backbone-react-component"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://github-camo.global.ssl.fastly.net/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>
