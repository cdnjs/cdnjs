import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Icon28CancelOutline } from '@vkontakte/icons';
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton";
import { ANDROID, VKCOM } from "../../lib/platform";
import { getTitleFromChildren } from "../../lib/utils";
import { usePlatform } from "../../hooks/usePlatform";

var PanelHeaderClose = function PanelHeaderClose(_ref) {
  var children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(PanelHeaderButton, _extends({
    "aria-label": getTitleFromChildren(children)
  }, restProps), platform === ANDROID || platform === VKCOM ? createScopedElement(Icon28CancelOutline, null) : children);
};

PanelHeaderClose.defaultProps = {
  children: 'Отмена'
};
export default PanelHeaderClose;
//# sourceMappingURL=PanelHeaderClose.js.map