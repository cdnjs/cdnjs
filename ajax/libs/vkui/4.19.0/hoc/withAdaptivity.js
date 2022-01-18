import _extends from "@babel/runtime/helpers/extends";
import { createScopedElement } from "../lib/jsxRuntime";
import * as React from 'react';
import { AdaptivityContext, SizeType, ViewHeight, ViewWidth } from "../components/AdaptivityProvider/AdaptivityContext";
export { SizeType, ViewWidth, ViewHeight };
export function withAdaptivity(TargetComponent, config) {
  function AdaptivityConsumer(props) {
    var context = React.useContext(AdaptivityContext);
    var update = false;

    if (props.sizeX || props.sizeY) {
      update = true;
    }

    var sizeX = props.sizeX || context.sizeX;
    var sizeY = props.sizeY || context.sizeY;
    var viewWidth = context.viewWidth;
    var viewHeight = context.viewHeight;
    var hasMouse = context.hasMouse;
    var adaptivityProps = {};
    config.sizeX ? adaptivityProps.sizeX = sizeX : undefined;
    config.sizeY ? adaptivityProps.sizeY = sizeY : undefined;
    config.viewWidth ? adaptivityProps.viewWidth = viewWidth : undefined;
    config.viewHeight ? adaptivityProps.viewHeight = viewHeight : undefined;
    config.hasMouse ? adaptivityProps.hasMouse = hasMouse : undefined; // @ts-ignore

    var target = createScopedElement(TargetComponent, _extends({}, props, adaptivityProps));

    if (update) {
      return createScopedElement(AdaptivityContext.Provider, {
        value: {
          sizeX: sizeX,
          sizeY: sizeY,
          viewWidth: viewWidth,
          viewHeight: viewHeight,
          hasMouse: hasMouse
        }
      }, target);
    }

    return target;
  }

  return AdaptivityConsumer;
}
//# sourceMappingURL=withAdaptivity.js.map