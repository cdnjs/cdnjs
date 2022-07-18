'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

/**
 * Renders a React component while also checking whether the children are a function or not
 * @param props Props of the component to render
 */

var render = function render(props) {
  if (typeof props.children === 'function') {
    return React__default.createElement(React.Fragment, null, props.children());
  }

  return React__default.createElement(React.Fragment, null, props.children || null);
};

/**
 * If the `<Case />` is the first one to have its condition evaluates to true
 * inside the parent `<Switch />` it will be the only rendered.
 * @param props The props to pass down to the `<Case />` component
 */

var Case = function Case(props) {
  return render(props);
};
Case.defaultProps = {
  children: null
};

/**
 * If no `<Case />` have its condition evaluates to true inside the parent `<Switch />`,
 * the first `<Default />` will be the only one rendered.
 * @param props The props to pass down to the `<Default />` component
 */

var Default = function Default(props) {
  return render(props);
};
Default.defaultProps = {
  children: null
};

/**
 * Must only contain a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block.
 * @param props The props to pass down to the `<Else />` component
 */

var Else = function Else(props) {
  return render(props);
};

/**
 * Resolves a condition that is {@link BooleanLike} or returns {@link BooleanLike} from a function
 * @param condition The condition to resolve
 */
var getConditionResult = function getConditionResult(condition) {
  var conditionResult = Boolean(typeof condition === 'function' ? condition() : condition);
  return conditionResult;
};

/**
 * Handles errors by throwing them to the console.
 * `__DEV__` is replaced by tsdx using {@link https://www.npmjs.com/package/babel-plugin-dev-expression babel-plugin-dev-expressions}
 * which will ensure this entire throw is not present in production
 * @param condition The condition to check
 * @param message The message to throw if `condition` resolves to `true`
 */
function invariant(condition, message) {
  {
    if (condition) {
      throw new Error(message);
    }
  }
}

/**
 * Must contain only a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block.
 * @param props The props to pass down to the `<Then />` component
 */

var Then = function Then(props) {
  return render(props);
};

/**
 * If condition evaluates to true, renders the `<Then />` block will be rendered,
 * otherwise renders the `<Else />` block. Either block may be omitted.
 *
 * This component can contain any number of `<Then />` or `<Else />` blocks,
 * but only the first block of the right type (either Then or Else, depending on the condition) will be rendered.
 * @param __namedParameters The props to pass down to the `<IF />` component, see {@link ComponentWithConditionProps}
 */

var If = function If(_ref) {
  var condition = _ref.condition,
      children = _ref.children;

  if (!children) {
    return null;
  }

  !(!Array.isArray(children) && !(children.type === Else || children.type === Then) || !React__default.Children.toArray(children).every(function (child) {
    return child.type === Else || child.type === Then;
  })) ?  invariant(false, 'The <If> component should contain <Then /> and <Else /> components as its children')  : void 0;
  var conditionResult = getConditionResult(condition);
  return React__default.createElement(React.Fragment, null, React__default.Children.toArray(children).find(function (c) {
    return c.type !== Else !== !conditionResult;
  }) || null);
};

/**
 * It will render the first matching `<Case />`, or the first encountered `<Default />` (or `null`).
 *
 * This component can contain any number of `<Case />` and one `<Default />` blocks
 * @param __namedParameters Children to pass into the `<Switch />` component
 */

var Switch = function Switch(_ref) {
  var _ref2, _matchingCase;

  var children = _ref.children;
  // -- Inspired by react-router --
  // We use React.Children.forEach instead of React.Children.toArray().find()
  // here because toArray adds keys to all child elements and we do not want
  // to trigger an unmount/remount for two children <Case>s or <Default>s
  var matchingCase = undefined;
  var defaultCase = undefined;
  React__default.Children.forEach(children, function (child) {
    // not a valid react child, don't add it

    /* istanbul ignore next - This is only a safe fail for people writing bad code */
    if (!React__default.isValidElement(child)) {
      return;
    }

    if (!matchingCase && child.type === Case) {
      var condition = child.props.condition;
      var conditionResult = getConditionResult(condition);

      if (conditionResult) {
        matchingCase = child;
      } // else not matching condition, don't add it

    } else if (!defaultCase && child.type === Default) {
      defaultCase = child;
    } // else unknown type, don't add it

  });
  return (_ref2 = (_matchingCase = matchingCase) != null ? _matchingCase : defaultCase) != null ? _ref2 : null;
};

/** A shorthand for
 *
 * ```jsx
 * <If condition={...}>
 *     <Else>
 *         { ... }
 *     </Else>
 * </If>
 * ```
 *
 * The same rules apply to the child elements as with using the `<Else />` block.
 *
 * @param __namedParameters The props to pass down to the `<IF />` component, see {@link ComponentWithConditionProps}
 */

var Unless = function Unless(_ref) {
  var condition = _ref.condition,
      children = _ref.children;
  var conditionResult = Boolean(getConditionResult(condition));
  return !conditionResult && children ? render({
    children: children
  }) : null;
};
Unless.defaultProps = {
  children: null
};

/** A shorthand for
 *
 * ```jsx
 * <If condition={...}>
 *     <Then>
 *         { ... }
 *     </Then>
 * </If>
 * ```
 *
 * The same rules apply to the child elements as with using the `<Then /`> block.
 *
 * @param __namedParameters The props to pass down to the `<IF />` component, see {@link ComponentWithConditionProps}
 */

var When = function When(_ref) {
  var condition = _ref.condition,
      children = _ref.children;
  var conditionResult = Boolean(getConditionResult(condition));
  return conditionResult && children ? render({
    children: children
  }) : null;
};
When.defaultProps = {
  children: null
};

exports.Case = Case;
exports.Default = Default;
exports.Else = Else;
exports.If = If;
exports.Switch = Switch;
exports.Then = Then;
exports.Unless = Unless;
exports.When = When;
//# sourceMappingURL=react-if.cjs.development.js.map
