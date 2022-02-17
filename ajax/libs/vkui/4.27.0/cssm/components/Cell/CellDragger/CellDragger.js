import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["onDragStart", "onDragMove", "onDragEnd"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import * as React from "react";
import { Icon24Reorder, Icon24ReorderIos } from "@vkontakte/icons";
import { getClassName } from "../../../helpers/getClassName";
import { usePlatform } from "../../../hooks/usePlatform";
import { classNames } from "../../../lib/classNames";
import { IOS } from "../../../lib/platform";
import { Touch } from "../../Touch/Touch";
import "./CellDragger.css";
export var CellDragger = function CellDragger(_ref) {
  var onDragStart = _ref.onDragStart,
      onDragMove = _ref.onDragMove,
      onDragEnd = _ref.onDragEnd,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var onClick = React.useCallback(function (e) {
    e.preventDefault();
  }, []);
  return createScopedElement(Touch, _extends({
    vkuiClass: classNames(getClassName("CellDragger", platform)),
    onStart: onDragStart,
    onMoveY: onDragMove,
    onEnd: onDragEnd,
    onClick: onClick
  }, restProps), platform === IOS ? createScopedElement(Icon24ReorderIos, null) : createScopedElement(Icon24Reorder, null));
};
//# sourceMappingURL=CellDragger.js.map