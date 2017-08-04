'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unmountComponentAtNode = exports.renderWithOptions = exports.childrenToArray = exports.findAllInRenderedTree = exports.findDOMNode = exports.Simulate = exports.isCompositeComponentElement = exports.isCompositeComponentWithType = exports.isCompositeComponent = exports.isDOMComponent = exports.isElementOfType = exports.isElement = exports.mockComponent = exports.renderIntoDocument = exports.renderToStaticMarkup = exports.createShallowRenderer = undefined;

var _version = require('./version');

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* eslint react/no-deprecated: 0 */


var TestUtils = void 0;
var createShallowRenderer = void 0;
var renderToStaticMarkup = void 0;
var renderIntoDocument = void 0;
var findDOMNode = void 0;
var childrenToArray = void 0;
var renderWithOptions = void 0;
var unmountComponentAtNode = void 0;

var React = require('react');

if (_version.REACT013) {
  (function () {
    exports.renderToStaticMarkup = renderToStaticMarkup = React.renderToStaticMarkup;
    /* eslint-disable react/no-deprecated */
    exports.findDOMNode = findDOMNode = React.findDOMNode;
    exports.unmountComponentAtNode = unmountComponentAtNode = React.unmountComponentAtNode;
    /* eslint-enable react/no-deprecated */
    TestUtils = require('react/addons').addons.TestUtils;
    var ReactContext = require('react/lib/ReactContext');

    // Shallow rendering in 0.13 did not properly support context. This function provides a shim
    // around `TestUtils.createRenderer` that instead returns a ShallowRenderer that actually
    // works with context. See https://github.com/facebook/react/issues/3721 for more details.
    exports.createShallowRenderer = createShallowRenderer = function () {
      function createRendererCompatible() {
        var renderer = TestUtils.createRenderer();
        renderer.render = function (originalRender) {
          return function () {
            function contextCompatibleRender(node) {
              var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

              ReactContext.current = context;
              originalRender.call(this, React.createElement(node.type, node.props), context);
              ReactContext.current = {};
              return renderer.getRenderOutput();
            }

            return contextCompatibleRender;
          }();
        }(renderer.render);
        return renderer;
      }

      return createRendererCompatible;
    }();
    exports.renderIntoDocument = renderIntoDocument = TestUtils.renderIntoDocument;
    // this fixes some issues in React 0.13 with setState and jsdom...
    // see issue: https://github.com/airbnb/enzyme/issues/27
    require('react/lib/ExecutionEnvironment').canUseDOM = true;

    // in 0.13, a Children.toArray function was not exported. Make our own instead.
    exports.childrenToArray = childrenToArray = function () {
      function childrenToArray(children) {
        var results = [];
        if (children !== undefined && children !== null && children !== false) {
          React.Children.forEach(children, function (el) {
            if (el !== undefined && el !== null && el !== false) {
              results.push(el);
            }
          });
        }
        return results;
      }

      return childrenToArray;
    }();

    exports.renderWithOptions = renderWithOptions = function () {
      function renderWithOptions(node, options) {
        if (options.attachTo) {
          return React.render(node, options.attachTo);
        }
        return TestUtils.renderIntoDocument(node);
      }

      return renderWithOptions;
    }();
  })();
} else {
  (function () {
    var ReactDOM = void 0;

    try {
      ReactDOM = require('react-dom');
    } catch (e) {
      console.error('react-dom is an implicit dependency in order to support react@0.13-14. ' + 'Please add the appropriate version to your devDependencies. ' + 'See https://github.com/airbnb/enzyme#installation');
      throw e;
    }

    exports.renderToStaticMarkup = renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;
    exports.findDOMNode = findDOMNode = ReactDOM.findDOMNode;
    exports.unmountComponentAtNode = unmountComponentAtNode = ReactDOM.unmountComponentAtNode;
    // We require the testutils, but they don't come with 0.14 out of the box, so we
    // require them here through this node module. The bummer is that we are not able
    // to list this as a dependency in package.json and have 0.13 work properly.
    // As a result, right now this is basically an implicit dependency.
    try {
      TestUtils = require('react-addons-test-utils');
    } catch (e) {
      console.error('react-addons-test-utils is an implicit dependency in order to support react@0.13-14. ' + 'Please add the appropriate version to your devDependencies. ' + 'See https://github.com/airbnb/enzyme#installation');
      throw e;
    }

    // Shallow rendering changed from 0.13 => 0.14 in such a way that
    // 0.14 now does not allow shallow rendering of native DOM elements.
    // This is mainly because the result of such a call should not realistically
    // be any different than the JSX you passed in (result of `React.createElement`.
    // In order to maintain the same behavior across versions, this function
    // is essentially a replacement for `TestUtils.createRenderer` that doesn't use
    // shallow rendering when it's just a DOM element.
    exports.createShallowRenderer = createShallowRenderer = function () {
      function createRendererCompatible() {
        var renderer = TestUtils.createRenderer();
        var originalRender = renderer.render;
        var originalRenderOutput = renderer.getRenderOutput;
        var isDOM = false;
        var _node = void 0;
        return (0, _object2['default'])(renderer, {
          render: function () {
            function render(node, context) {
              /* eslint consistent-return: 0 */
              if (typeof node.type === 'string') {
                isDOM = true;
                _node = node;
              } else {
                isDOM = false;
                return originalRender.call(this, node, context);
              }
            }

            return render;
          }(),
          getRenderOutput: function () {
            function getRenderOutput() {
              if (isDOM) {
                return _node;
              }
              return originalRenderOutput.call(this);
            }

            return getRenderOutput;
          }()
        });
      }

      return createRendererCompatible;
    }();
    exports.renderIntoDocument = renderIntoDocument = TestUtils.renderIntoDocument;
    exports.childrenToArray = childrenToArray = React.Children.toArray;

    exports.renderWithOptions = renderWithOptions = function () {
      function renderWithOptions(node, options) {
        if (options.attachTo) {
          return ReactDOM.render(node, options.attachTo);
        }
        return TestUtils.renderIntoDocument(node);
      }

      return renderWithOptions;
    }();
  })();
}

var _TestUtils = TestUtils;
var mockComponent = _TestUtils.mockComponent;
var isElement = _TestUtils.isElement;
var isElementOfType = _TestUtils.isElementOfType;
var isDOMComponent = _TestUtils.isDOMComponent;
var isCompositeComponent = _TestUtils.isCompositeComponent;
var isCompositeComponentWithType = _TestUtils.isCompositeComponentWithType;
var isCompositeComponentElement = _TestUtils.isCompositeComponentElement;
var Simulate = _TestUtils.Simulate;
var findAllInRenderedTree = _TestUtils.findAllInRenderedTree;
exports.createShallowRenderer = createShallowRenderer;
exports.renderToStaticMarkup = renderToStaticMarkup;
exports.renderIntoDocument = renderIntoDocument;
exports.mockComponent = mockComponent;
exports.isElement = isElement;
exports.isElementOfType = isElementOfType;
exports.isDOMComponent = isDOMComponent;
exports.isCompositeComponent = isCompositeComponent;
exports.isCompositeComponentWithType = isCompositeComponentWithType;
exports.isCompositeComponentElement = isCompositeComponentElement;
exports.Simulate = Simulate;
exports.findDOMNode = findDOMNode;
exports.findAllInRenderedTree = findAllInRenderedTree;
exports.childrenToArray = childrenToArray;
exports.renderWithOptions = renderWithOptions;
exports.unmountComponentAtNode = unmountComponentAtNode;