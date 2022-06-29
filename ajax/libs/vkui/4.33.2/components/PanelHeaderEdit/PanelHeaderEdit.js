import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["isActive", "editLabel", "doneLabel"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton";
import { ANDROID, VKCOM } from "../../lib/platform";
import { Icon28EditOutline, Icon28DoneOutline } from "@vkontakte/icons";
import { usePlatform } from "../../hooks/usePlatform";

/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderEdit
 */
export var PanelHeaderEdit = function PanelHeaderEdit(_ref) {
  var _ref$isActive = _ref.isActive,
      isActive = _ref$isActive === void 0 ? false : _ref$isActive,
      _ref$editLabel = _ref.editLabel,
      editLabel = _ref$editLabel === void 0 ? "Редактировать" : _ref$editLabel,
      _ref$doneLabel = _ref.doneLabel,
      doneLabel = _ref$doneLabel === void 0 ? "Готово" : _ref$doneLabel,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var iOSText = isActive ? doneLabel : editLabel;
  var AndroidIcon = isActive ? Icon28DoneOutline : Icon28EditOutline;
  var platform = usePlatform();
  return createScopedElement(PanelHeaderButton, _extends({
    "aria-label": iOSText
  }, restProps), platform === ANDROID || platform === VKCOM ? createScopedElement(AndroidIcon, null) : iOSText);
};
//# sourceMappingURL=PanelHeaderEdit.js.map