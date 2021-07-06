"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = describeConformance;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _chai = require("chai");

var React = _interopRequireWildcard(require("react"));

var _findOutermostIntrinsic = _interopRequireDefault(require("./findOutermostIntrinsic"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _testRef = _interopRequireDefault(require("./testRef"));

/**
 * Glossary
 * - root component:
 *   - renders the outermost host component
 *   - has the `root` class if the component has one
 *   - excess props are spread to this component
 *   - has the type of `inheritComponent`
 */

/**
 * Returns the component with the same constructor as `component` that renders
 * the outermost host
 *
 * @param {import('enzyme').ReactWrapper} wrapper
 * @param {object} options
 * @param {import('react').ElementType} component
 */
function findRootComponent(wrapper, _ref) {
  var component = _ref.component;
  var outermostHostElement = (0, _findOutermostIntrinsic.default)(wrapper).getElement();
  return wrapper.find(component).filterWhere(function (componentWrapper) {
    return componentWrapper.contains(outermostHostElement);
  });
}

function randomStringValue() {
  return Math.random().toString(36).slice(2);
}
/**
 * Material-UI components have a `className` prop. The `className` is applied to
 * the root component.
 *
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */


function testClassName(element, getOptions) {
  it('applies the className to the root component', function () {
    var _getOptions = getOptions(),
        mount = _getOptions.mount;

    var className = randomStringValue();
    var wrapper = mount( /*#__PURE__*/React.cloneElement(element, {
      className: className
    }));
    (0, _chai.expect)((0, _findOutermostIntrinsic.default)(wrapper).hasClass(className)).to.equal(true, 'does have a custom `className`');
  });
}
/**
 * Material-UI components have a `component` prop that allows rendering a different
 * Component from @inheritComponent
 *
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */


function testComponentProp(element, getOptions) {
  describe('prop: component', function () {
    it('can render another root component with the `component` prop', function () {
      var _getOptions2 = getOptions(),
          classes = _getOptions2.classes,
          mount = _getOptions2.mount,
          _getOptions2$testComp = _getOptions2.testComponentPropWith,
          component = _getOptions2$testComp === void 0 ? 'em' : _getOptions2$testComp;

      var wrapper = mount( /*#__PURE__*/React.cloneElement(element, {
        component: component
      }));
      (0, _chai.expect)(findRootComponent(wrapper, {
        classes: classes,
        component: component
      }).exists()).to.equal(true);
    });
  });
}
/**
 * Material-UI components can spread additional props to a documented component.
 * It's set via @inheritComponent in the source.
 *
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */


function testPropsSpread(element, getOptions) {
  it("spreads props to the root component", function () {
    // type def in ConformanceOptions
    var _getOptions3 = getOptions(),
        classes = _getOptions3.classes,
        inheritComponent = _getOptions3.inheritComponent,
        mount = _getOptions3.mount;

    var testProp = 'data-test-props-spread';
    var value = randomStringValue();
    var wrapper = mount( /*#__PURE__*/React.cloneElement(element, (0, _defineProperty2.default)({}, testProp, value)));
    var root = findRootComponent(wrapper, {
      classes: classes,
      component: inheritComponent
    });
    (0, _chai.expect)(root.props()[testProp]).to.equal(value);
  });
}
/**
 * Tests that the `ref` of a component will return the correct instance
 *
 * This is determined by a given constructor i.e. a React.Component or HTMLElement for
 * components that forward their ref and attach it to a host component.
 *
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */


function describeRef(element, getOptions) {
  describe('ref', function () {
    it("attaches the ref", function () {
      // type def in ConformanceOptions
      var _getOptions4 = getOptions(),
          inheritComponent = _getOptions4.inheritComponent,
          mount = _getOptions4.mount,
          refInstanceof = _getOptions4.refInstanceof;

      (0, _testRef.default)(element, mount, function (instance, wrapper) {
        (0, _chai.expect)(instance).to.be.instanceof(refInstanceof);

        if (inheritComponent && instance.nodeType === 1) {
          var rootHost = (0, _findOutermostIntrinsic.default)(wrapper);
          (0, _chai.expect)(instance).to.equal(rootHost.instance());
        }
      });
    });
  });
}
/**
 * Tests that the root component has the root class
 *
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */


function testRootClass(element, getOptions) {
  it('applies the root class to the root component if it has this class', function () {
    var _getOptions5 = getOptions(),
        classes = _getOptions5.classes,
        mount = _getOptions5.mount;

    if (classes.root == null) {
      return;
    }

    var className = randomStringValue();
    var wrapper = mount( /*#__PURE__*/React.cloneElement(element, {
      className: className
    })); // we established that the root component renders the outermost host previously. We immediately
    // jump to the host component because some components pass the `root` class
    // to the `classes` prop of the root component.
    // https://github.com/mui-org/material-ui/blob/f9896bcd129a1209153106296b3d2487547ba205/packages/material-ui/src/OutlinedInput/OutlinedInput.js#L101

    (0, _chai.expect)((0, _findOutermostIntrinsic.default)(wrapper).hasClass(classes.root)).to.equal(true);
    (0, _chai.expect)((0, _findOutermostIntrinsic.default)(wrapper).hasClass(className)).to.equal(true);
  });
}
/**
 * Tests that the component can be rendered with react-test-renderer.
 * This is important for snapshot testing with Jest (even if we don't encourage it).
 *
 * @param {React.ReactElement} element
 */


function testReactTestRenderer(element) {
  it('should render without errors in ReactTestRenderer', function () {
    _reactTestRenderer.default.act(function () {
      _reactTestRenderer.default.create(element, {
        createNodeMock: function createNodeMock(node) {
          return document.createElement(node.type);
        }
      });
    });
  });
}

var fullSuite = {
  componentProp: testComponentProp,
  mergeClassName: testClassName,
  propsSpread: testPropsSpread,
  refForwarding: describeRef,
  rootClass: testRootClass,
  reactTestRenderer: testReactTestRenderer
};
/**
 * @typedef {Object} ConformanceOptions
 * @property {Record<string, string>} classes - `classes` of the component provided by `@material-ui/styles`
 * @property {string} inheritComponent - The element type that receives spread props.
 * @property {function} mount - Should be a return value from createMount
 * @property {(keyof typeof fullSuite)[]} [only] - If specified only run the tests listed
 * @property {any} refInstanceof - `ref` will be an instanceof this constructor.
 * @property {keyof typeof fullSuite[]} [skip] - Skip the specified tests
 * @property {string} [testComponentPropWith] - The host component that should be rendered instead.
 */

/**
 * Tests various aspects of a component that should be equal across Material-UI
 * components.
 *
 * @param {React.ReactElement} minimalElement - the component with it's minimal required props
 * @param {() => ConformanceOptions} getOptions
 *
 */

function describeConformance(minimalElement, getOptions) {
  var _getOptions6 = getOptions(),
      _getOptions6$after = _getOptions6.after,
      runAfterHook = _getOptions6$after === void 0 ? function () {} : _getOptions6$after,
      _getOptions6$only = _getOptions6.only,
      only = _getOptions6$only === void 0 ? Object.keys(fullSuite) : _getOptions6$only,
      _getOptions6$skip = _getOptions6.skip,
      skip = _getOptions6$skip === void 0 ? [] : _getOptions6$skip;

  describe('Material-UI component API', function () {
    after(runAfterHook);
    Object.keys(fullSuite).filter(function (testKey) {
      return only.indexOf(testKey) !== -1 && skip.indexOf(testKey) === -1;
    }).forEach(function (testKey) {
      var test = fullSuite[testKey];
      test(minimalElement, getOptions);
    });
  });
}