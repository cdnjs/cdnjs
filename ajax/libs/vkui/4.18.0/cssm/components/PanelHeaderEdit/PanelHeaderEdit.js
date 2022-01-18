import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["isActive", "editLabel", "doneLabel"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton";
import { ANDROID, VKCOM } from "../../lib/platform";
import { Icon28EditOutline, Icon28DoneOutline } from '@vkontakte/icons';
import { usePlatform } from "../../hooks/usePlatform";

var PanelHeaderEdit = function PanelHeaderEdit(_ref) {
  var isActive = _ref.isActive,
      editLabel = _ref.editLabel,
      doneLabel = _ref.doneLabel,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var iOSText = isActive ? doneLabel : editLabel;
  var AndroidIcon = isActive ? Icon28DoneOutline : Icon28EditOutline;
  var platform = usePlatform();
  return createScopedElement(PanelHeaderButton, _extends({
    "aria-label": iOSText
  }, restProps), platform === ANDROID || platform === VKCOM ? createScopedElement(AndroidIcon, null) : iOSText);
};

PanelHeaderEdit.defaultProps = {
  isActive: false,
  editLabel: 'Редактировать',
  doneLabel: 'Готово'
};
export default PanelHeaderEdit;
//# sourceMappingURL=PanelHeaderEdit.js.map