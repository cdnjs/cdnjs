import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { render as enzymeRender } from 'enzyme';
import * as React from 'react';
import { RenderContext } from './RenderMode';
var warnedOnce = false;
/**
 * Generate a render to string function.
 * @deprecated to remvoe in v5
 */

export default function createRender() {
  var options1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!warnedOnce) {
    warnedOnce = true;
    console.warn(['Material-UI: the test utils are deprecated, they are no longer present in v5.', 'The helpers were designed to work with enzyme.', 'However, the tests of the core components were moved to react-testing-library.'].join('\n'));
  }

  var _options1$render = options1.render,
      render = _options1$render === void 0 ? enzymeRender : _options1$render,
      other1 = _objectWithoutProperties(options1, ["render"]);

  var renderWithContext = function renderWithContext(node) {
    var options2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return render( /*#__PURE__*/React.createElement(RenderContext, null, node), _extends({}, other1, options2));
  };

  return renderWithContext;
}