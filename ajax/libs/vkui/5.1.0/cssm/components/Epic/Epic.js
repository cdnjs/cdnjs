import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["activeStory", "tabbar", "children", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ScrollSaver } from './ScrollSaver';
import { getNavId } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import "./Epic.module.css";
var warn = warnOnce('Epic');

/**
 * @see https://vkcom.github.io/VKUI/#/Epic
 */
export var Epic = function Epic(props) {
  var _ref;
  var scroll = React.useRef({}).current;
  var activeStory = props.activeStory,
    tabbar = props.tabbar,
    children = props.children,
    className = props.className,
    restProps = _objectWithoutProperties(props, _excluded);
  var story = (_ref = React.Children.toArray(children).find(function (story) {
    return /*#__PURE__*/React.isValidElement(story) && getNavId(story.props, warn) === activeStory;
  })) !== null && _ref !== void 0 ? _ref : null;
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNames("vkuiEpic", className)
  }), /*#__PURE__*/React.createElement(ScrollSaver, {
    key: activeStory,
    initialScroll: scroll[activeStory] || 0,
    saveScroll: function saveScroll(value) {
      return scroll[activeStory] = value;
    }
  }, story), tabbar);
};
//# sourceMappingURL=Epic.js.map