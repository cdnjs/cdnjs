import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";

function shallowRecursively(wrapper, selector, _ref) {
  let {
    context
  } = _ref,
      other = _objectWithoutPropertiesLoose(_ref, ["context"]);

  if (wrapper.isEmptyRender() || typeof wrapper.getElement().type === 'string') {
    return wrapper;
  }

  let newContext = context;
  const instance = wrapper.root().instance(); // The instance can be null with a stateless functional component and react >= 16.

  if (instance && instance.getChildContext) {
    newContext = _extends({}, context, instance.getChildContext());
  }

  const nextWrapper = wrapper.shallow(_extends({
    context: newContext
  }, other));

  if (selector && wrapper.is(selector)) {
    return nextWrapper;
  }

  return shallowRecursively(nextWrapper, selector, {
    context: newContext
  });
}

let warnedOnce = false;
export default function until(selector, options = {}) {
  if (!warnedOnce) {
    warnedOnce = true;
    console.warn(['Material-UI: the test utils are deprecated, they are no longer present in v5.', 'The helpers were designed to work with enzyme.', 'However, the tests of the core components were moved to react-testing-library.'].join('\n'));
  }

  return this.single('until', () => shallowRecursively(this, selector, options));
}