import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "mode", "removable", "removePlaceholder", "onRemove", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";
import { Removable } from "../Removable/Removable";
import { useAdaptivity } from "../../hooks/useAdaptivity";

var FormLayoutGroup = function FormLayoutGroup(_ref) {
  var children = _ref.children,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? 'vertical' : _ref$mode,
      removable = _ref.removable,
      _ref$removePlaceholde = _ref.removePlaceholder,
      removePlaceholder = _ref$removePlaceholde === void 0 ? 'Удалить' : _ref$removePlaceholde,
      _onRemove = _ref.onRemove,
      getRootRef = _ref.getRootRef,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  var isRemovable = removable && mode === 'horizontal';
  var rootEl = useExternRef(getRootRef);
  return createScopedElement("div", _extends({
    ref: rootEl,
    vkuiClass: classNames(getClassName('FormLayoutGroup', platform), "FormLayoutGroup--sizeY-".concat(sizeY), "FormLayoutGroup--".concat(mode), {
      'FormLayoutGroup--removable': isRemovable
    })
  }, restProps), isRemovable ? createScopedElement(Removable, {
    align: "start",
    removePlaceholder: removePlaceholder,
    onRemove: function onRemove(e) {
      return _onRemove(e, rootEl === null || rootEl === void 0 ? void 0 : rootEl.current);
    }
  }, children) : children);
};

export default FormLayoutGroup;
//# sourceMappingURL=FormLayoutGroup.js.map