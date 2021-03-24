"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _reactIs = require("react-is");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _debounce = _interopRequireDefault(require("../utils/debounce"));

var _ownerWindow = _interopRequireDefault(require("../utils/ownerWindow"));

var _scrollLeft = require("../utils/scrollLeft");

var _animate = _interopRequireDefault(require("../internal/animate"));

var _ScrollbarSize = _interopRequireDefault(require("./ScrollbarSize"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _TabIndicator = _interopRequireDefault(require("./TabIndicator"));

var _TabScrollButton = _interopRequireDefault(require("../TabScrollButton"));

var _useEventCallback = _interopRequireDefault(require("../utils/useEventCallback"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _jsxRuntime = require("react/jsx-runtime");

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    overflow: 'hidden',
    minHeight: 48,
    WebkitOverflowScrolling: 'touch',
    // Add iOS momentum scrolling.
    display: 'flex'
  },

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    flexDirection: 'column'
  },

  /* Styles applied to the flex container element. */
  flexContainer: {
    display: 'flex'
  },

  /* Styles applied to the flex container element if `orientation="vertical"`. */
  flexContainerVertical: {
    flexDirection: 'column'
  },

  /* Styles applied to the flex container element if `centered={true}` & `!variant="scrollable"`. */
  centered: {
    justifyContent: 'center'
  },

  /* Styles applied to the tablist element. */
  scroller: {
    position: 'relative',
    display: 'inline-block',
    flex: '1 1 auto',
    whiteSpace: 'nowrap'
  },

  /* Styles applied to the tablist element if `!variant="scrollable"`. */
  fixed: {
    overflowX: 'hidden',
    width: '100%'
  },

  /* Styles applied to the tablist element if `variant="scrollable"` and `orientation="horizontal"`. */
  scrollableX: {
    overflowX: 'auto',
    overflowY: 'hidden'
  },

  /* Styles applied to the tablist element if `variant="scrollable"` and `orientation="vertical"`. */
  scrollableY: {
    overflowY: 'auto',
    overflowX: 'hidden'
  },

  /* Styles applied to the tablist element if `variant="scrollable"` and `visibleScrollbar={false}`. */
  hideScrollbar: {
    // Hide dimensionless scrollbar on MacOS
    scrollbarWidth: 'none',
    // Firefox
    '&::-webkit-scrollbar': {
      display: 'none' // Safari + Chrome

    }
  },

  /* Styles applied to the ScrollButtonComponent component. */
  scrollButtons: {},

  /* Styles applied to the ScrollButtonComponent component if `allowScrollButtonsMobile={true}`. */
  scrollButtonsHideMobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },

  /* Styles applied to the TabIndicator component. */
  indicator: {}
});

exports.styles = styles;
const Tabs = /*#__PURE__*/React.forwardRef(function Tabs(props, ref) {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    action,
    centered = false,
    children: childrenProp,
    classes,
    className,
    component: Component = 'div',
    allowScrollButtonsMobile = false,
    indicatorColor = 'primary',
    onChange,
    orientation = 'horizontal',
    ScrollButtonComponent = _TabScrollButton.default,
    scrollButtons = 'auto',
    selectionFollowsFocus,
    TabIndicatorProps = {},
    TabScrollButtonProps,
    textColor = 'primary',
    value,
    variant = 'standard',
    visibleScrollbar = false
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["aria-label", "aria-labelledby", "action", "centered", "children", "classes", "className", "component", "allowScrollButtonsMobile", "indicatorColor", "onChange", "orientation", "ScrollButtonComponent", "scrollButtons", "selectionFollowsFocus", "TabIndicatorProps", "TabScrollButtonProps", "textColor", "value", "variant", "visibleScrollbar"]);
  const theme = (0, _useTheme.default)();
  const scrollable = variant === 'scrollable';
  const isRtl = theme.direction === 'rtl';
  const vertical = orientation === 'vertical';
  const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
  const start = vertical ? 'top' : 'left';
  const end = vertical ? 'bottom' : 'right';
  const clientSize = vertical ? 'clientHeight' : 'clientWidth';
  const size = vertical ? 'height' : 'width';

  if (process.env.NODE_ENV !== 'production') {
    if (centered && scrollable) {
      console.error('Material-UI: You can not use the `centered={true}` and `variant="scrollable"` properties ' + 'at the same time on a `Tabs` component.');
    }
  }

  const [mounted, setMounted] = React.useState(false);
  const [indicatorStyle, setIndicatorStyle] = React.useState({});
  const [displayScroll, setDisplayScroll] = React.useState({
    start: false,
    end: false
  });
  const [scrollerStyle, setScrollerStyle] = React.useState({
    overflow: 'hidden',
    scrollbarWidth: 0
  });
  const valueToIndex = new Map();
  const tabsRef = React.useRef(null);
  const tabListRef = React.useRef(null);

  const getTabsMeta = () => {
    const tabsNode = tabsRef.current;
    let tabsMeta;

    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect(); // create a new object with ClientRect class props + scrollLeft

      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        scrollLeftNormalized: (0, _scrollLeft.getNormalizedScrollLeft)(tabsNode, theme.direction),
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right
      };
    }

    let tabMeta;

    if (tabsNode && value !== false) {
      const children = tabListRef.current.children;

      if (children.length > 0) {
        const tab = children[valueToIndex.get(value)];

        if (process.env.NODE_ENV !== 'production') {
          if (!tab) {
            console.error([`Material-UI: The value provided to the Tabs component is invalid.`, `None of the Tabs' children match with \`${value}\`.`, valueToIndex.keys ? `You can provide one of the following values: ${Array.from(valueToIndex.keys()).join(', ')}.` : null].join('\n'));
          }
        }

        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }

    return {
      tabsMeta,
      tabMeta
    };
  };

  const updateIndicatorState = (0, _useEventCallback.default)(() => {
    const {
      tabsMeta,
      tabMeta
    } = getTabsMeta();
    let startValue = 0;

    if (tabMeta && tabsMeta) {
      if (vertical) {
        startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
      } else {
        const correction = isRtl ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth : tabsMeta.scrollLeft;
        startValue = tabMeta.left - tabsMeta.left + correction;
      }
    }

    const newIndicatorStyle = {
      [start]: startValue,
      // May be wrong until the font is loaded.
      [size]: tabMeta ? tabMeta[size] : 0
    }; // IE11 support, replace with Number.isNaN
    // eslint-disable-next-line no-restricted-globals

    if (isNaN(indicatorStyle[start]) || isNaN(indicatorStyle[size])) {
      setIndicatorStyle(newIndicatorStyle);
    } else {
      const dStart = Math.abs(indicatorStyle[start] - newIndicatorStyle[start]);
      const dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);

      if (dStart >= 1 || dSize >= 1) {
        setIndicatorStyle(newIndicatorStyle);
      }
    }
  });

  const scroll = scrollValue => {
    (0, _animate.default)(scrollStart, tabsRef.current, scrollValue);
  };

  const moveTabsScroll = delta => {
    let scrollValue = tabsRef.current[scrollStart];

    if (vertical) {
      scrollValue += delta;
    } else {
      scrollValue += delta * (isRtl ? -1 : 1); // Fix for Edge

      scrollValue *= isRtl && (0, _scrollLeft.detectScrollType)() === 'reverse' ? -1 : 1;
    }

    scroll(scrollValue);
  };

  const getScrollSize = () => {
    const containerSize = tabsRef.current[clientSize];
    let totalSize = 0;
    const children = Array.from(tabListRef.current.children);

    for (let i = 0; i < children.length; i += 1) {
      const tab = children[i];

      if (totalSize + tab[clientSize] > containerSize) {
        break;
      }

      totalSize += tab[clientSize];
    }

    return totalSize;
  };

  const handleStartScrollClick = () => {
    moveTabsScroll(-1 * getScrollSize());
  };

  const handleEndScrollClick = () => {
    moveTabsScroll(getScrollSize());
  }; // TODO Remove <ScrollbarSize /> as browser support for hidding the scrollbar
  // with CSS improves.


  const handleScrollbarSizeChange = React.useCallback(scrollbarWidth => {
    setScrollerStyle({
      overflow: null,
      scrollbarWidth
    });
  }, []);

  const getConditionalElements = () => {
    const conditionalElements = {};
    conditionalElements.scrollbarSizeListener = scrollable ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ScrollbarSize.default, {
      onChange: handleScrollbarSizeChange,
      className: (0, _clsx.default)(classes.scrollableX, classes.hideScrollbar)
    }) : null;
    const scrollButtonsActive = displayScroll.start || displayScroll.end;
    const showScrollButtons = scrollable && (scrollButtons === 'auto' && scrollButtonsActive || scrollButtons === true);
    conditionalElements.scrollButtonStart = showScrollButtons ? /*#__PURE__*/(0, _jsxRuntime.jsx)(ScrollButtonComponent, (0, _extends2.default)({
      orientation: orientation,
      direction: isRtl ? 'right' : 'left',
      onClick: handleStartScrollClick,
      disabled: !displayScroll.start,
      className: (0, _clsx.default)(classes.scrollButtons, !allowScrollButtonsMobile && classes.scrollButtonsHideMobile)
    }, TabScrollButtonProps)) : null;
    conditionalElements.scrollButtonEnd = showScrollButtons ? /*#__PURE__*/(0, _jsxRuntime.jsx)(ScrollButtonComponent, (0, _extends2.default)({
      orientation: orientation,
      direction: isRtl ? 'left' : 'right',
      onClick: handleEndScrollClick,
      disabled: !displayScroll.end,
      className: (0, _clsx.default)(classes.scrollButtons, !allowScrollButtonsMobile && classes.scrollButtonsHideMobile)
    }, TabScrollButtonProps)) : null;
    return conditionalElements;
  };

  const scrollSelectedIntoView = (0, _useEventCallback.default)(() => {
    const {
      tabsMeta,
      tabMeta
    } = getTabsMeta();

    if (!tabMeta || !tabsMeta) {
      return;
    }

    if (tabMeta[start] < tabsMeta[start]) {
      // left side of button is out of view
      const nextScrollStart = tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]);
      scroll(nextScrollStart);
    } else if (tabMeta[end] > tabsMeta[end]) {
      // right side of button is out of view
      const nextScrollStart = tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]);
      scroll(nextScrollStart);
    }
  });
  const updateScrollButtonState = (0, _useEventCallback.default)(() => {
    if (scrollable && scrollButtons !== false) {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
        scrollWidth,
        clientWidth
      } = tabsRef.current;
      let showStartScroll;
      let showEndScroll;

      if (vertical) {
        showStartScroll = scrollTop > 1;
        showEndScroll = scrollTop < scrollHeight - clientHeight - 1;
      } else {
        const scrollLeft = (0, _scrollLeft.getNormalizedScrollLeft)(tabsRef.current, theme.direction); // use 1 for the potential rounding error with browser zooms.

        showStartScroll = isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
        showEndScroll = !isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
      }

      if (showStartScroll !== displayScroll.start || showEndScroll !== displayScroll.end) {
        setDisplayScroll({
          start: showStartScroll,
          end: showEndScroll
        });
      }
    }
  });
  React.useEffect(() => {
    const handleResize = (0, _debounce.default)(() => {
      updateIndicatorState();
      updateScrollButtonState();
    });
    const win = (0, _ownerWindow.default)(tabsRef.current);
    win.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      win.removeEventListener('resize', handleResize);
    };
  }, [updateIndicatorState, updateScrollButtonState]);
  const handleTabsScroll = React.useMemo(() => (0, _debounce.default)(() => {
    updateScrollButtonState();
  }), [updateScrollButtonState]);
  React.useEffect(() => {
    return () => {
      handleTabsScroll.clear();
    };
  }, [handleTabsScroll]);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  React.useEffect(() => {
    updateIndicatorState();
    updateScrollButtonState();
  });
  React.useEffect(() => {
    scrollSelectedIntoView();
  }, [scrollSelectedIntoView, indicatorStyle]);
  React.useImperativeHandle(action, () => ({
    updateIndicator: updateIndicatorState,
    updateScrollButtons: updateScrollButtonState
  }), [updateIndicatorState, updateScrollButtonState]);
  const indicator = /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabIndicator.default, (0, _extends2.default)({
    className: classes.indicator,
    orientation: orientation,
    color: indicatorColor
  }, TabIndicatorProps, {
    style: (0, _extends2.default)({}, indicatorStyle, TabIndicatorProps.style)
  }));
  let childIndex = 0;
  const children = React.Children.map(childrenProp, child => {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return null;
    }

    if (process.env.NODE_ENV !== 'production') {
      if ((0, _reactIs.isFragment)(child)) {
        console.error(["Material-UI: The Tabs component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    const childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    const selected = childValue === value;
    childIndex += 1;
    return /*#__PURE__*/React.cloneElement(child, (0, _extends2.default)({
      fullWidth: variant === 'fullWidth',
      indicator: selected && !mounted && indicator,
      selected,
      selectionFollowsFocus,
      onChange,
      textColor,
      value: childValue
    }, childIndex === 1 && value === false && !child.props.tabIndex ? {
      tabIndex: 0
    } : {}));
  });

  const handleKeyDown = event => {
    const {
      target
    } = event; // Keyboard navigation assumes that [role="tab"] are siblings
    // though we might warn in the future about nested, interactive elements
    // as a a11y violation

    const role = target.getAttribute('role');

    if (role !== 'tab') {
      return;
    }

    let newFocusTarget = null;
    let previousItemKey = orientation !== "vertical" ? 'ArrowLeft' : 'ArrowUp';
    let nextItemKey = orientation !== "vertical" ? 'ArrowRight' : 'ArrowDown';

    if (orientation !== "vertical" && theme.direction === 'rtl') {
      // swap previousItemKey with nextItemKey
      previousItemKey = 'ArrowRight';
      nextItemKey = 'ArrowLeft';
    }

    switch (event.key) {
      case previousItemKey:
        newFocusTarget = target.previousElementSibling || tabListRef.current.lastChild;
        break;

      case nextItemKey:
        newFocusTarget = target.nextElementSibling || tabListRef.current.firstChild;
        break;

      case 'Home':
        newFocusTarget = tabListRef.current.firstChild;
        break;

      case 'End':
        newFocusTarget = tabListRef.current.lastChild;
        break;

      default:
        break;
    }

    if (newFocusTarget !== null) {
      newFocusTarget.focus();
      event.preventDefault();
    }
  };

  const conditionalElements = getConditionalElements();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Component, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, vertical && classes.vertical),
    ref: ref
  }, other, {
    children: [conditionalElements.scrollButtonStart, conditionalElements.scrollbarSizeListener, /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: (0, _clsx.default)(classes.scroller, scrollable ? [vertical ? classes.scrollableY : classes.scrollableX, !visibleScrollbar && classes.hideScrollbar] : classes.fixed),
      style: {
        overflow: scrollerStyle.overflow,
        [vertical ? `margin${isRtl ? 'Left' : 'Right'}` : 'marginBottom']: visibleScrollbar ? undefined : -scrollerStyle.scrollbarWidth
      },
      ref: tabsRef,
      onScroll: handleTabsScroll,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-orientation": orientation === 'vertical' ? 'vertical' : null,
        className: (0, _clsx.default)(classes.flexContainer, vertical && classes.flexContainerVertical, centered && !scrollable && classes.centered),
        onKeyDown: handleKeyDown,
        ref: tabListRef,
        role: "tablist",
        children: children
      }), mounted && indicator]
    }), conditionalElements.scrollButtonEnd]
  }));
});
process.env.NODE_ENV !== "production" ? Tabs.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It supports two actions: `updateIndicator()` and `updateScrollButtons()`
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: _utils.refType,

  /**
   * If `true`, the scroll buttons aren't forced hidden on mobile.
   * By default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.
   * @default false
   */
  allowScrollButtonsMobile: _propTypes.default.bool,

  /**
   * The label for the Tabs as a string.
   */
  'aria-label': _propTypes.default.string,

  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  'aria-labelledby': _propTypes.default.string,

  /**
   * If `true`, the tabs are centered.
   * This prop is intended for large views.
   * @default false
   */
  centered: _propTypes.default.bool,

  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * Determines the color of the indicator.
   * @default 'primary'
   */
  indicatorColor: _propTypes.default.oneOf(['primary', 'secondary']),

  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child (number)
   */
  onChange: _propTypes.default.func,

  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),

  /**
   * The component used to render the scroll buttons.
   * @default TabScrollButton
   */
  ScrollButtonComponent: _propTypes.default.elementType,

  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `true` will always present them.
   * - `false` will never present them.
   *
   * By default the scroll buttons are hidden on mobile.
   * This behavior can be disabled with `allowScrollButtonsMobile`.
   * @default 'auto'
   */
  scrollButtons: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOf(['auto', false, true]),

  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus: _propTypes.default.bool,

  /**
   * Props applied to the tab indicator element.
   * @default  {}
   */
  TabIndicatorProps: _propTypes.default.object,

  /**
   * Props applied to the [`TabScrollButton`](/api/tab-scroll-button/) element.
   */
  TabScrollButtonProps: _propTypes.default.object,

  /**
   * Determines the color of the `Tab`.
   * @default 'primary'
   */
  textColor: _propTypes.default.oneOf(['inherit', 'primary', 'secondary']),

  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value: _propTypes.default.any,

  /**
   * Determines additional display behavior of the tabs:
   *
   *  - `scrollable` will invoke scrolling properties and allow for horizontally
   *  scrolling (or swiping) of the tab bar.
   *  -`fullWidth` will make the tabs grow to use all the available space,
   *  which should be used for small views, like on mobile.
   *  - `standard` will render the default state.
   * @default 'standard'
   */
  variant: _propTypes.default.oneOf(['fullWidth', 'scrollable', 'standard']),

  /**
   * If `true`, the scrollbar is visible. It can be useful when displaying
   * a long vertical list of tabs.
   * @default false
   */
  visibleScrollbar: _propTypes.default.bool
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiTabs'
})(Tabs);

exports.default = _default;