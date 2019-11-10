// # ngReact
// ### Use React Components inside of your Angular applications
//
// Composed of
// - reactComponent (generic directive for delegating off to React Components)
// - reactDirective (factory for creating specific directives that correspond to reactComponent directives)

(function(React, angular) {
  'use strict';

  // # reactComponent
  // Directive that allows React components to be used in Angular templates.
  //
  // Usage:
  //     <react-component name="Hello" props="name"/>
  //
  // This requires that there exists an injectable or globally available 'Hello' React component.
  // The 'props' attribute is optional and is passed to the component.
  //
  // The following would would create and register the component:
  //
  //     /** @jsx React.DOM */
  //     var module = angular.module('ace.react.components');
  //     module.value('Hello', React.createClass({
  //         render: function() {
  //             return <div>Hello {this.props.name}</div>;
  //         }
  //     }));
  //
  var reactComponent = function($timeout, $injector) {
    return {
      restrict: 'E',
      replace: true,
      link: function(scope, elem, attrs) {
        var reactComponentName = attrs.name;

        // a React component name must be specified
        if (!reactComponentName) {
          throw new Error('ReactComponent name attribute must be specified');
        }

        // ensure the specified React component is accessible, and fail fast if it's not
        var reactComponent = $injector.get(reactComponentName) || window[reactComponentName];
        if (!reactComponent) {
          throw Error('Cannot find react component ' + reactComponentName);
        }

        // wraps a function with scope.$apply
        var applied = function(fn) {
          return function() {
            var args = arguments;
            scope.$apply(function() { fn.apply( null, args ); });
          };
        };

        // render React component, with scope[attrs.props] being passed in as the component props
        var renderComponent = function() {
          var scopeProps = scope[attrs.props] || {};

          var props = {};
          Object.keys(scopeProps).forEach(function(key) {
            var value = scopeProps[key];
            // wrap functions in a function that ensures they are scope.$applied
            // ensures that when function is called from a React component
            // the Angular digest cycle is run
            props[key] = angular.isFunction(value) ? applied(value) : value;
          });

          $timeout(function() {
            React.renderComponent(reactComponent(props), elem[0]);
          });
        };

        // If there are props, re-render when they change
        attrs.props ?
          scope.$watch(attrs.props, renderComponent, true) :
          renderComponent();

        // cleanup when scope is destroyed
        scope.$on('$destroy', function() {
          React.unmountComponentAtNode(elem[0]);
        });
      }
    };
  };

  // # reactDirective
  // Factory function to create directives for React components.
  //
  // With a component like this:
  //
  //     /** @jsx React.DOM */
  //     var module = angular.module('ace.react.components');
  //     module.value('Hello', React.createClass({
  //         render: function() {
  //             return <div>Hello {this.props.name}</div>;
  //         }
  //     }));
  //
  // A directive can be created and registered with:
  //
  //     module.directive('hello', function(reactDirective) {
  //         return reactDirective('Hello', ['name']);
  //     });
  //
  // Where the first argument is the injectable or globally accessible name of the React component
  // and the second argument is an array of property names to be watched and passed to the React component
  // as props.
  //
  // This directive can then be used like this:
  //
  //     <hello name="name"/>
  //
  var reactDirective = function($injector) {
    return function(reactComponentName, propNames) {
      return {
        restrict: 'E',
        replace: true,
        link: function(scope, elm, attrs) {

          // ensure the specified React component is accessible, and fail fast if it's not
          var reactComponent = $injector.get(reactComponentName) || window[reactComponentName];
          if (!reactComponent) {
            throw Error('Cannot find react component ' + reactComponentName);
          }

          // if propNames is not defined, fall back to use the React component's propTypes if present
          propNames = propNames || Object.keys(reactComponent.propTypes || {});

          // for each of the properties, get their scope value and set it to scope.props
          var updateProps = function() {
            var props = {};
            propNames.forEach(function(propName) {
              props[propName] = scope.$eval(attrs[propName]);
            });

            scope.props = props;
          };

          // watch each property name and trigger an update whenever something changes,
          // to update scope.props with new values
          propNames.forEach(function(k) {
            scope.$watch(attrs[k], updateProps, true);
          });

          updateProps();
        },
        template: '<react-component name="' + reactComponentName + '" props="props"></react-component>'
      };
    };
  };

  // create the end module without any dependencies, including reactComponent and reactDirective
  angular.module('react', [])
    .directive('reactComponent', ['$timeout', '$injector', reactComponent])
    .factory('reactDirective', ['$injector', reactDirective]);

})(window.React, window.angular);