import * as React from 'react';
import { useAdaptivityConditionalRender } from '../../hooks/useAdaptivityConditionalRender';
export var WriteBarIconRenderer = function WriteBarIconRenderer(_ref) {
  var IconCompact = _ref.IconCompact,
    IconRegular = _ref.IconRegular;
  var _useAdaptivityConditi = useAdaptivityConditionalRender(),
    sizeY = _useAdaptivityConditi.sizeY;
  return /*#__PURE__*/React.createElement(React.Fragment, null, sizeY.compact && /*#__PURE__*/React.createElement(IconCompact, {
    className: sizeY.compact.className
  }), sizeY.regular && /*#__PURE__*/React.createElement(IconRegular, {
    className: sizeY.regular.className
  }));
};
//# sourceMappingURL=WriteBarIconRenderer.js.map