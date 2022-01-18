import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["activeStory", "tabbar", "children", "viewWidth"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { withAdaptivity, ViewWidth } from "../../hoc/withAdaptivity";
import { ScrollSaver } from "./ScrollSaver";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
var warn = warnOnce('Epic');
export var Epic = function Epic(props) {
  var platform = usePlatform();
  var scroll = React.useRef({}).current;

  var activeStory = props.activeStory,
      tabbar = props.tabbar,
      children = props.children,
      viewWidth = props.viewWidth,
      restProps = _objectWithoutProperties(props, _excluded);

  if (process.env.NODE_ENV === 'development' && !tabbar && viewWidth < ViewWidth.SMALL_TABLET) {
    warn('Using Epic without tabbar is not recommended on mobile');
  }

  var story = React.Children.toArray(children).find(function (story) {
    return getNavId(story.props, warn) === activeStory;
  }) || null;
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: getClassName('Epic', platform)
  }), createScopedElement(ScrollSaver, {
    key: activeStory,
    initialScroll: scroll[activeStory] || 0,
    saveScroll: function saveScroll(value) {
      return scroll[activeStory] = value;
    }
  }, story), tabbar);
};
export default withAdaptivity(Epic, {
  viewWidth: true
});
//# sourceMappingURL=Epic.js.map