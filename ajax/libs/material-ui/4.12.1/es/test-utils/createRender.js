import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import { render as enzymeRender } from 'enzyme';
import * as React from 'react';
import { RenderContext } from './RenderMode';
let warnedOnce = false;
/**
 * Generate a render to string function.
 * @deprecated to remvoe in v5
 */

export default function createRender(options1 = {}) {
  if (!warnedOnce) {
    warnedOnce = true;
    console.warn(['Material-UI: the test utils are deprecated, they are no longer present in v5.', 'The helpers were designed to work with enzyme.', 'However, the tests of the core components were moved to react-testing-library.'].join('\n'));
  }

  const {
    render = enzymeRender
  } = options1,
        other1 = _objectWithoutPropertiesLoose(options1, ["render"]);

  const renderWithContext = function renderWithContext(node, options2 = {}) {
    return render( /*#__PURE__*/React.createElement(RenderContext, null, node), _extends({}, other1, options2));
  };

  return renderWithContext;
}