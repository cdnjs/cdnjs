import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import { shallow as enzymeShallow } from 'enzyme';
import until from './until'; // Generate an enhanced shallow function.

export default function createShallow(options1 = {}) {
  const {
    shallow = enzymeShallow,
    dive = false,
    untilSelector = false
  } = options1,
        other1 = _objectWithoutPropertiesLoose(options1, ["shallow", "dive", "untilSelector"]);

  const shallowWithContext = function shallowWithContext(node, options2 = {}) {
    const options = _extends({}, other1, options2, {
      context: _extends({}, other1.context, options2.context)
    });

    const wrapper = shallow(node, options);

    if (dive) {
      return wrapper.dive();
    }

    if (untilSelector) {
      return until.call(wrapper, untilSelector, options);
    }

    return wrapper;
  };

  return shallowWithContext;
}