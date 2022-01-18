import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton";
import { Icon28DoneOutline } from '@vkontakte/icons';
import { ANDROID, VKCOM } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { getTitleFromChildren } from "../../lib/utils";

var PanelHeaderSubmit = function PanelHeaderSubmit(_ref) {
  var children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(PanelHeaderButton, _extends({
    "aria-label": getTitleFromChildren(children),
    primary: true
  }, restProps), platform === ANDROID || platform === VKCOM ? createScopedElement(Icon28DoneOutline, null) : children);
};

PanelHeaderSubmit.defaultProps = {
  children: 'Готово'
};
export default PanelHeaderSubmit;
//# sourceMappingURL=PanelHeaderSubmit.js.map