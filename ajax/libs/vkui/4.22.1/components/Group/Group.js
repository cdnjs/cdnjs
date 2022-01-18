import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["header", "description", "children", "separator", "getRootRef", "mode", "sizeX"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import Separator from "../Separator/Separator";
import { hasReactNode } from "../../lib/utils";
import Caption from "../Typography/Caption/Caption";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";
import ModalRootContext from "../ModalRoot/ModalRootContext";

var Group = function Group(props) {
  var header = props.header,
      description = props.description,
      children = props.children,
      separator = props.separator,
      getRootRef = props.getRootRef,
      mode = props.mode,
      sizeX = props.sizeX,
      restProps = _objectWithoutProperties(props, _excluded);

  var _React$useContext = React.useContext(ModalRootContext),
      isInsideModal = _React$useContext.isInsideModal;

  var platform = usePlatform();
  var computedMode = mode;

  if (!mode) {
    computedMode = sizeX === SizeType.COMPACT || isInsideModal ? 'plain' : 'card';
  }

  return createScopedElement("section", _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: classNames(getClassName('Group', platform), "Group--sizeX-".concat(sizeX), "Group--".concat(computedMode))
  }), createScopedElement("div", {
    vkuiClass: "Group__inner"
  }, header, children, hasReactNode(description) && createScopedElement(Caption, {
    vkuiClass: "Group__description",
    weight: "regular",
    level: "1"
  }, description)), separator !== 'hide' && createScopedElement(Separator, {
    vkuiClass: classNames('Group__separator', {
      'Group__separator--force': separator === 'show'
    }),
    expanded: computedMode === 'card'
  }));
};

Group.defaultProps = {
  separator: 'auto'
};
export default withAdaptivity(Group, {
  sizeX: true
});
//# sourceMappingURL=Group.js.map