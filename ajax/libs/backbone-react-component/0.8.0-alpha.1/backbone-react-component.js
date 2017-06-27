// Backbone React Component
// ========================
//
//     Backbone.React.Component v0.8.0-alpha.1
//
//     (c) 2014 "Magalhas" José Magalhães <magalhas@gmail.com>
//     Backbone.React.Component can be freely distributed under the MIT license.
//
//
// `Backbone.React.Component` is a mixin that glues [Backbone](http://backbonejs.org/)
// models and collections into [React](http://facebook.github.io/react/) components.
//
// When the component is mounted, a wrapper starts listening to models and
// collections changes to automatically set your component props and achieve UI
// binding through reactive updates.
//
//
//
// Basic Usage
//
//     var MyComponent = React.createClass({
//       mixins: [Backbone.React.Component.mixin],
//       render: function () {
//         return <div>{this.props.foo}</div>;
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
  Backbone.React.Component.mixin = {
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
      this.setElement(this.getDOMNode());
    },
    // Sets `this.el` and `this.$el` when the component updates.
    componentDidUpdate: function () {
      this.setElement(this.getDOMNode());
    },
    // When the component mounts, instance a `Wrapper` to take care
    // of models and collections binding with `this.props`.
    componentWillMount: function () {
      if (!this.wrapper) {
        this.wrapper = new Wrapper(this, this.props);
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

      var key;

      if (this.wrapper.model && model) {
        delete nextProps.model;
        if (this.wrapper.model.attributes) {
          this.wrapper.setProps(model, void 0, nextProps);
        } else {
          for (key in model) {
            this.wrapper.setProps(model[key], key, nextProps);
          }
        }
      }
      if (this.wrapper.collection && collection && !(collection instanceof Array)) {
        delete nextProps.collection;
        if (this.wrapper.collection.models) {
          this.wrapper.setProps(collection, void 0, nextProps);
        } else {
          for (key in collection) {
            this.wrapper.setProps(collection[key], key, nextProps);
          }
        }
      }
    },
    // Shortcut to `@$el.find`. Inspired by `Backbone.View`.
    $: function () {
      return this.$el && this.$el.find.apply(this.$el, arguments);
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
  function Wrapper (component, props) {
    props = props || {};
    var model = props.model, collection = props.collection;
    // Check if `props.model` is a `Backbone.Model` or an hashmap of them
    if (typeof model !== 'undefined' && (model.attributes ||
        typeof model === 'object' && _.values(model)[0].attributes)) {
      delete props.model;
      // The model(s) bound to this component
      this.model = model;
      // Set model(s) attributes on `props` for the first render
      this.setPropsBackbone(model, void 0, props);
    }
    // Check if `props.collection` is a `Backbone.Collection` or an hashmap of them
    if (typeof collection !== 'undefined' && (collection.models ||
        typeof collection === 'object' && _.values(collection)[0].models)) {
      delete props.collection;
      // The collection(s) bound to this component
      this.collection = collection;
      // Set collection(s) models on props for the first render
      this.setPropsBackbone(collection, void 0, props);
    }
    // 1:1 relation with the `component`
    this.component = component;
    // Start listeners if this is a root node and if there's DOM
    if (!component.context.hasParentBackboneMixin && typeof document !== 'undefined') {
      this.startModelListeners();
      this.startCollectionListeners();
    }
  }
  // Mixing `Backbone.Events` into `Wrapper.prototype`
  _.extend(Wrapper.prototype, Backbone.Events, {
    // Sets `this.props` when a model/collection request results in error. It delegates
    // to `this.setProps`. It listens to `Backbone.Model#error` and `Backbone.Collection#error`.
    onError: function (modelOrCollection, res, options) {
      // Set state only if there's no silent option
      if (!options.silent)
        this.component.setState({
          isRequesting: false,
          hasError: true,
          error: res
        });
    },
    // Sets `this.props` when a model/collection request starts. It delegates to
    // `this.setProps`. It listens to `Backbone.Model#request` and `Backbone.Collection#request`.
    onRequest: function (modelOrCollection, xhr, options) {
      // Set props only if there's no silent option
      if (!options.silent)
        this.component.setState({
          isRequesting: true,
          hasError: false
        });
    },
    // Sets `this.props` when a model/collection syncs. It delegates to `this.setProps`.
    // It listens to `Backbone.Model#sync` and `Backbone.Collection#sync`
    onSync: function (modelOrCollection, res, options) {
      // Set props only if there's no silent option
      if (!options.silent)
        this.component.setState({isRequesting: false});
    },
    // Used internally to set `this.collection` or `this.model` on `this.props`. Delegates to
    // `this.setProps`. It listens to `Backbone.Collection` events such as `add`, `remove`,
    // `change`, `sort`, `reset` and to `Backbone.Model` `change`.
    setPropsBackbone: function (modelOrCollection, key, target) {
      if (!(modelOrCollection.models || modelOrCollection.attributes)) {
        for (key in modelOrCollection)
            this.setPropsBackbone(modelOrCollection[key], key, target);
        return;
      }
      this.setProps.apply(this, arguments);
    },
    // Sets a model, collection or object into props by delegating to `this.component.setProps`.
    setProps: function (modelOrCollection, key, target) {
      var props = {};
      var newProps = modelOrCollection.toJSON ? modelOrCollection.toJSON() : modelOrCollection;

      if (key) {
        props[key] = newProps;
      } else if (modelOrCollection instanceof Backbone.Collection) {
        props.collection = newProps;
      } else {
        props = newProps;
      }

      if (target) {
        _.extend(target, props);
      } else {
        this.nextProps = _.extend(this.nextProps || {}, props);
        _.defer(_.bind(function () {
          if (this.nextProps) {
            if (this.component) {
              this.component.setProps(this.nextProps);
            }
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

  // Expose `Backbone.React.Component.mixin`.
  return Backbone.React.Component.mixin;
}));
// <a href="https://github.com/magalhas/backbone-react-component"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://github-camo.global.ssl.fastly.net/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>
