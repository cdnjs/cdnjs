import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

function shallowRecursively(wrapper, selector, _ref) {
  var context = _ref.context,
      other = _objectWithoutProperties(_ref, ["context"]);

  if (wrapper.isEmptyRender() || typeof wrapper.getElement().type === 'string') {
    return wrapper;
  }

  var newContext = context;
  var instance = wrapper.root().instance(); // The instance can be null with a stateless functional component and react >= 16.

  if (instance && instance.getChildContext) {
    newContext = _extends({}, context, instance.getChildContext());
  }

  var nextWrapper = wrapper.shallow(_extends({
    context: newContext
  }, other));

  if (selector && wrapper.is(selector)) {
    return nextWrapper;
  }

  return shallowRecursively(nextWrapper, selector, {
    context: newContext
  });
}

export default function until(selector) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return this.single('until', function () {
    return shallowRecursively(_this, selector, options);
  });
}