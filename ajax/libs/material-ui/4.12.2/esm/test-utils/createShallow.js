import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { shallow as enzymeShallow } from 'enzyme';
import until from './until';
var warnedOnce = false; // Generate an enhanced shallow function.

export default function createShallow() {
  var options1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!warnedOnce) {
    warnedOnce = true;
    console.warn(['Material-UI: the test utils are deprecated, they are no longer present in v5.', 'The helpers were designed to work with enzyme.', 'However, the tests of the core components were moved to react-testing-library.'].join('\n'));
  }

  var _options1$shallow = options1.shallow,
      shallow = _options1$shallow === void 0 ? enzymeShallow : _options1$shallow,
      _options1$dive = options1.dive,
      dive = _options1$dive === void 0 ? false : _options1$dive,
      _options1$untilSelect = options1.untilSelector,
      untilSelector = _options1$untilSelect === void 0 ? false : _options1$untilSelect,
      other1 = _objectWithoutProperties(options1, ["shallow", "dive", "untilSelector"]);

  var shallowWithContext = function shallowWithContext(node) {
    var options2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var options = _extends({}, other1, options2, {
      context: _extends({}, other1.context, options2.context)
    });

    var wrapper = shallow(node, options);

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