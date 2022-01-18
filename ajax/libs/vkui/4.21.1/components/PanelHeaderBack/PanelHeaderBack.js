import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["label", "sizeX"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { Icon28ChevronBack, Icon28ChevronLeftOutline, Icon28ArrowLeftOutline } from '@vkontakte/icons';
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton";
import { ANDROID, VKCOM, IOS } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";

var PanelHeaderBack = function PanelHeaderBack(_ref) {
  var label = _ref.label,
      sizeX = _ref.sizeX,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var showLabel = platform === VKCOM || platform === IOS && sizeX === SizeType.REGULAR;
  return createScopedElement(PanelHeaderButton, _extends({}, restProps, {
    vkuiClass: classNames(getClassName('PanelHeaderBack', platform), {
      'PanelHeaderBack--has-label': showLabel && !!label
    }),
    label: showLabel && label
  }), platform === ANDROID && createScopedElement(Icon28ArrowLeftOutline, null), platform === VKCOM && createScopedElement(Icon28ChevronLeftOutline, null), platform === IOS && createScopedElement(Icon28ChevronBack, null));
};

PanelHeaderBack.defaultProps = {
  'aria-label': 'Назад'
};
export default /*#__PURE__*/React.memo(withAdaptivity(PanelHeaderBack, {
  sizeX: true
}));
//# sourceMappingURL=PanelHeaderBack.js.map