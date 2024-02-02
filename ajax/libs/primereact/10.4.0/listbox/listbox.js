this.primereact = this.primereact || {};
this.primereact.listbox = (function (exports, React, api, componentbase, hooks, tooltip, utils, virtualscroller, search, inputtext, ripple) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
  }

  var classes = {
    itemGroup: 'p-listbox-item-group',
    emptyMessage: 'p-listbox-empty-message',
    list: function list(_ref) {
      var props = _ref.props,
        options = _ref.options;
      return props.virtualScrollerOptions ? utils.classNames('p-listbox-list', options.className) : 'p-listbox-list';
    },
    wrapper: function wrapper(_ref2) {
      var props = _ref2.props;
      return utils.classNames('p-listbox-list-wrapper', props.listClassName);
    },
    root: function root(_ref3) {
      var props = _ref3.props;
      return utils.classNames('p-listbox p-component', {
        'p-disabled': props.disabled
      }, props.className);
    },
    item: function item(_ref4) {
      var props = _ref4.props;
      return utils.classNames('p-listbox-item', {
        'p-highlight': props.selected,
        'p-disabled': props.disabled
      }, props.option.className);
    },
    filterContainer: 'p-listbox-filter-container',
    filterIcon: 'p-listbox-filter-icon',
    filterInput: 'p-listbox-filter',
    header: 'p-listbox-header'
  };
  var styles = "\n@layer primereact {\n    .p-listbox-list-wrapper {\n        overflow: auto;\n    }\n    \n    .p-listbox-list {\n        list-style-type: none;\n        margin: 0;\n        padding: 0;\n    }\n    \n    .p-listbox-item {\n        cursor: pointer;\n        position: relative;\n        overflow: hidden;\n    }\n    \n    .p-listbox-filter-container {\n        position: relative;\n    }\n    \n    .p-listbox-filter-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -.5rem;\n    }\n    \n    .p-listbox-filter {\n        width: 100%;\n    }\n}\n";
  var inlineStyles = {
    itemGroup: function itemGroup(_ref5) {
      var scrollerOptions = _ref5.scrollerOptions;
      return {
        height: scrollerOptions.props ? scrollerOptions.props.itemSize : undefined
      };
    },
    list: function list(_ref6) {
      var options = _ref6.options,
        props = _ref6.props;
      return props.virtualScrollerOptions ? options.style : undefined;
    }
  };
  var ListBoxBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'ListBox',
      className: null,
      dataKey: null,
      disabled: null,
      emptyFilterMessage: null,
      emptyMessage: null,
      filter: false,
      filterIcon: null,
      filterBy: null,
      filterInputProps: null,
      filterLocale: undefined,
      filterMatchMode: 'contains',
      filterPlaceholder: null,
      filterTemplate: null,
      filterValue: null,
      id: null,
      itemTemplate: null,
      listClassName: null,
      listStyle: null,
      metaKeySelection: false,
      multiple: false,
      onChange: null,
      onFilterValueChange: null,
      optionDisabled: null,
      optionGroupChildren: null,
      optionGroupLabel: null,
      optionGroupTemplate: null,
      optionLabel: null,
      optionValue: null,
      options: null,
      style: null,
      tabIndex: 0,
      tooltip: null,
      tooltipOptions: null,
      value: null,
      virtualScrollerOptions: null,
      children: undefined
    },
    css: {
      classes: classes,
      styles: styles,
      inlineStyles: inlineStyles
    }
  });

  function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var ListBoxHeader = /*#__PURE__*/React__namespace.memo(function (props) {
    var mergeProps = hooks.useMergeProps();
    var _props$ptCallbacks = props.ptCallbacks,
      ptm = _props$ptCallbacks.ptm,
      cx = _props$ptCallbacks.cx;
    var getPTOptions = function getPTOptions(key, options) {
      return ptm(key, _objectSpread$1({
        hostName: props.hostName
      }, options));
    };
    var filterOptions = {
      filter: function filter(e) {
        return onFilter(e);
      },
      reset: function reset() {
        return props.resetFilter();
      }
    };
    var onFilter = function onFilter(event) {
      if (props.onFilter) {
        props.onFilter({
          originalEvent: event,
          value: event.target.value
        });
      }
    };
    var createHeader = function createHeader() {
      var filterIconProps = mergeProps({
        className: cx('filterIcon')
      }, getPTOptions('filterIcon'));
      var icon = props.filterIcon || /*#__PURE__*/React__namespace.createElement(search.SearchIcon, filterIconProps);
      var filterIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread$1({}, filterIconProps), {
        props: props
      });
      var headerProps = mergeProps({
        className: cx('header')
      }, getPTOptions('header'));
      var filterContainerProps = mergeProps({
        className: cx('filterContainer')
      }, getPTOptions('filterContainer'));
      var content = /*#__PURE__*/React__namespace.createElement("div", filterContainerProps, /*#__PURE__*/React__namespace.createElement(inputtext.InputText, _extends({
        type: "text",
        value: props.filter,
        onChange: onFilter,
        className: cx('filterInput'),
        disabled: props.disabled,
        placeholder: props.filterPlaceholder
      }, props.filterInputProps, {
        pt: ptm('filterInput'),
        unstyled: props.unstyled,
        __parentMetadata: {
          parent: props.metaData
        }
      })), filterIcon);
      if (props.filterTemplate) {
        var defaultContentOptions = {
          className: 'p-listbox-filter-container',
          element: content,
          filterOptions: filterOptions,
          filterInputChange: onFilter,
          filterIconClassName: 'p-dropdown-filter-icon',
          props: props
        };
        content = utils.ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
      }
      return /*#__PURE__*/React__namespace.createElement("div", headerProps, content);
    };
    var content = createHeader();
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, content);
  });
  ListBoxHeader.displayName = 'ListBoxHeader';

  var ListBoxItem = /*#__PURE__*/React__namespace.memo(function (props) {
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedState = _React$useState2[0],
      setFocusedState = _React$useState2[1];
    var mergeProps = hooks.useMergeProps();
    var _props$ptCallbacks = props.ptCallbacks,
      ptm = _props$ptCallbacks.ptm,
      cx = _props$ptCallbacks.cx;
    var getPTOptions = function getPTOptions(key) {
      return ptm(key, {
        hostName: props.hostName,
        context: {
          selected: props.selected,
          disabled: props.disabled,
          focused: focusedState
        }
      });
    };
    var onFocus = function onFocus(event) {
      setFocusedState(true);
    };
    var onBlur = function onBlur(event) {
      setFocusedState(false);
    };
    var onClick = function onClick(event) {
      if (props.onClick) {
        props.onClick({
          originalEvent: event,
          option: props.option
        });
      }
      event.preventDefault();
    };
    var onTouchEnd = function onTouchEnd(event) {
      if (props.onTouchEnd) {
        props.onTouchEnd({
          originalEvent: event,
          option: props.option
        });
      }
    };
    var onKeyDown = function onKeyDown(event) {
      var item = event.currentTarget;
      switch (event.which) {
        //down
        case 40:
          var nextItem = findNextItem(item);
          nextItem && nextItem.focus();
          event.preventDefault();
          break;

        //up
        case 38:
          var prevItem = findPrevItem(item);
          prevItem && prevItem.focus();
          event.preventDefault();
          break;

        //enter
        case 13:
          onClick(event);
          event.preventDefault();
          break;
      }
    };
    var findNextItem = function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      return nextItem ? utils.DomHandler.isAttributeEquals(nextItem, 'data-p-disabled', true) || utils.DomHandler.isAttributeEquals(nextItem, 'data-pc-section', 'itemgroup') ? findNextItem(nextItem) : nextItem : null;
    };
    var findPrevItem = function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      return prevItem ? utils.DomHandler.isAttributeEquals(prevItem, 'data-p-disabled', true) || utils.DomHandler.isAttributeEquals(prevItem, 'data-pc-section', 'itemgroup') ? findPrevItem(prevItem) : prevItem : null;
    };
    var content = props.template ? utils.ObjectUtils.getJSXElement(props.template, props.option) : props.label;
    var itemProps = mergeProps({
      className: cx('item', {
        props: props
      }),
      style: props.style,
      onClick: onClick,
      onTouchEnd: onTouchEnd,
      onKeyDown: onKeyDown,
      onFocus: onFocus,
      onBlur: onBlur,
      tabIndex: '-1',
      'aria-label': props.label,
      key: props.label,
      role: 'option',
      'aria-selected': props.selected,
      'aria-disabled': props.disabled,
      'data-p-disabled': props.disabled
    }, getPTOptions('item'));
    return /*#__PURE__*/React__namespace.createElement("li", itemProps, content, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
  });
  ListBoxItem.displayName = 'ListBoxItem';

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  var ListBox = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = ListBoxBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      filterValueState = _React$useState2[0],
      setFilterValueState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var virtualScrollerRef = React__namespace.useRef(null);
    var optionTouched = React__namespace.useRef(false);
    var filteredValue = (props.onFilterValueChange ? props.filterValue : filterValueState) || '';
    var hasFilter = filteredValue && filteredValue.trim().length > 0;
    var metaData = {
      props: props,
      state: {
        filterValue: filteredValue
      }
    };
    var ptCallbacks = ListBoxBase.setMetaData(metaData);
    componentbase.useHandleStyle(ListBoxBase.css.styles, ptCallbacks.isUnstyled, {
      name: 'listbox'
    });
    var onOptionSelect = function onOptionSelect(event) {
      var option = event.option;
      if (props.disabled || isOptionDisabled(option)) {
        return;
      }
      props.multiple ? onOptionSelectMultiple(event.originalEvent, option) : onOptionSelectSingle(event.originalEvent, option);
      optionTouched.current = false;
    };
    var onOptionTouchEnd = function onOptionTouchEnd() {
      if (props.disabled) {
        return;
      }
      optionTouched.current = true;
    };
    var onOptionSelectSingle = function onOptionSelectSingle(event, option) {
      var selected = isSelected(option);
      var valueChanged = false;
      var value = null;
      var metaSelection = optionTouched.current ? false : props.metaKeySelection;
      if (metaSelection) {
        var metaKey = event.metaKey || event.ctrlKey;
        if (selected) {
          if (metaKey) {
            value = null;
            valueChanged = true;
          }
        } else {
          value = getOptionValue(option);
          valueChanged = true;
        }
      } else {
        value = selected ? null : getOptionValue(option);
        valueChanged = true;
      }
      if (valueChanged) {
        updateModel(event, value);
      }
    };
    var onOptionSelectMultiple = function onOptionSelectMultiple(event, option) {
      var selected = isSelected(option);
      var valueChanged = false;
      var value = null;
      var metaSelection = optionTouched ? false : props.metaKeySelection;
      if (metaSelection) {
        var metaKey = event.metaKey || event.ctrlKey;
        if (selected) {
          if (metaKey) value = removeOption(option);else value = [getOptionValue(option)];
          valueChanged = true;
        } else {
          value = metaKey ? props.value || [] : [];
          value = [].concat(_toConsumableArray(value), [getOptionValue(option)]);
          valueChanged = true;
        }
      } else {
        if (selected) value = removeOption(option);else value = [].concat(_toConsumableArray(props.value || []), [getOptionValue(option)]);
        valueChanged = true;
      }
      if (valueChanged) {
        props.onChange({
          originalEvent: event,
          value: value,
          stopPropagation: function stopPropagation() {
            event.stopPropagation();
          },
          preventDefault: function preventDefault() {
            event.preventDefault();
          },
          target: {
            name: props.name,
            id: props.id,
            value: value
          }
        });
      }
    };
    var onFilter = function onFilter(event) {
      virtualScrollerRef.current && virtualScrollerRef.current.scrollToIndex(0);
      var originalEvent = event.originalEvent,
        value = event.value;
      if (props.onFilterValueChange) {
        props.onFilterValueChange({
          originalEvent: originalEvent,
          value: value
        });
      } else {
        setFilterValueState(value);
      }
    };
    var resetFilter = function resetFilter() {
      setFilterValueState('');
      props.onFilter && props.onFilter({
        filter: ''
      });
    };
    var updateModel = function updateModel(event, value) {
      if (props.onChange) {
        props.onChange({
          originalEvent: event,
          value: value,
          stopPropagation: function stopPropagation() {
            event.stopPropagation();
          },
          preventDefault: function preventDefault() {
            event.preventDefault();
          },
          target: {
            name: props.name,
            id: props.id,
            value: value
          }
        });
      }
    };
    var removeOption = function removeOption(option) {
      return props.value.filter(function (val) {
        return !utils.ObjectUtils.equals(val, getOptionValue(option), props.dataKey);
      });
    };
    var getSelectedOptionIndex = function getSelectedOptionIndex() {
      if (props.value != null && visibleOptions) {
        if (props.optionGroupLabel) {
          for (var i = 0; i < visibleOptions.length; i++) {
            var selectedOptionIndex = findOptionIndexInList(props.value, getOptionGroupChildren(visibleOptions[i]));
            if (selectedOptionIndex !== -1) {
              return {
                group: i,
                option: selectedOptionIndex
              };
            }
          }
        } else {
          return findOptionIndexInList(props.value, visibleOptions);
        }
      }
      return -1;
    };
    var equalityKey = function equalityKey() {
      return props.optionValue ? null : props.dataKey;
    };
    var findOptionIndexInList = function findOptionIndexInList(value, list) {
      var key = equalityKey();
      return list.findIndex(function (item) {
        return utils.ObjectUtils.equals(value, getOptionValue(item), key);
      });
    };
    var isSelected = function isSelected(option) {
      var optionValue = getOptionValue(option);
      var key = equalityKey();
      return props.multiple && props.value ? props.value.some(function (val) {
        return utils.ObjectUtils.equals(val, optionValue, key);
      }) : utils.ObjectUtils.equals(props.value, optionValue, key);
    };
    var getOptionLabel = function getOptionLabel(option) {
      return props.optionLabel ? utils.ObjectUtils.resolveFieldData(option, props.optionLabel) : option && option['label'] !== undefined ? option['label'] : option;
    };
    var getOptionValue = function getOptionValue(option) {
      return props.optionValue ? utils.ObjectUtils.resolveFieldData(option, props.optionValue) : option && option['value'] !== undefined ? option['value'] : option;
    };
    var getOptionRenderKey = function getOptionRenderKey(option) {
      return props.dataKey ? utils.ObjectUtils.resolveFieldData(option, props.dataKey) : getOptionLabel(option);
    };
    var isOptionDisabled = function isOptionDisabled(option) {
      if (props.optionDisabled) {
        return utils.ObjectUtils.isFunction(props.optionDisabled) ? props.optionDisabled(option) : utils.ObjectUtils.resolveFieldData(option, props.optionDisabled);
      }
      return option && option['disabled'] !== undefined ? option['disabled'] : false;
    };
    var getOptionGroupRenderKey = function getOptionGroupRenderKey(optionGroup) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
    };
    var getOptionGroupLabel = function getOptionGroupLabel(optionGroup) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
    };
    var getOptionGroupChildren = function getOptionGroupChildren(optionGroup) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupChildren);
    };
    var getVisibleOptions = function getVisibleOptions() {
      if (hasFilter) {
        var filterValue = filteredValue.trim().toLocaleLowerCase(props.filterLocale);
        var searchFields = props.filterBy ? props.filterBy.split(',') : [props.optionLabel || 'label'];
        if (props.optionGroupLabel) {
          var filteredGroups = [];
          var _iterator = _createForOfIteratorHelper(props.options),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var optgroup = _step.value;
              var filteredSubOptions = api.FilterService.filter(getOptionGroupChildren(optgroup), searchFields, filterValue, props.filterMatchMode, props.filterLocale);
              if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push(_objectSpread(_objectSpread({}, optgroup), {
                  items: filteredSubOptions
                }));
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return filteredGroups;
        } else {
          return api.FilterService.filter(props.options, searchFields, filterValue, props.filterMatchMode, props.filterLocale);
        }
      } else {
        return props.options;
      }
    };
    var scrollToSelectedIndex = function scrollToSelectedIndex() {
      if (virtualScrollerRef.current) {
        var selectedIndex = getSelectedOptionIndex();
        if (selectedIndex !== -1) {
          setTimeout(function () {
            return virtualScrollerRef.current.scrollToIndex(selectedIndex);
          }, 0);
        }
      }
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        focus: function focus() {
          return utils.DomHandler.focusFirstElement(elementRef.current);
        },
        getElement: function getElement() {
          return elementRef.current;
        },
        getVirtualScroller: function getVirtualScroller() {
          return virtualScrollerRef.current;
        }
      };
    });
    hooks.useMountEffect(function () {
      scrollToSelectedIndex();
    });
    var createHeader = function createHeader() {
      return props.filter ? /*#__PURE__*/React__namespace.createElement(ListBoxHeader, {
        hostName: "ListBox",
        filter: filteredValue,
        filterIcon: props.filterIcon,
        onFilter: onFilter,
        resetFilter: resetFilter,
        filterTemplate: props.filterTemplate,
        disabled: props.disabled,
        filterPlaceholder: props.filterPlaceholder,
        filterInputProps: props.filterInputProps,
        ptCallbacks: ptCallbacks,
        metaData: metaData
      }) : null;
    };
    var createGroupChildren = function createGroupChildren(optionGroup, style) {
      var groupChildren = getOptionGroupChildren(optionGroup);
      return groupChildren.map(function (option, j) {
        var optionLabel = getOptionLabel(option);
        var optionKey = j + '_' + getOptionRenderKey(option);
        var disabled = isOptionDisabled(option);
        var tabIndex = disabled ? null : props.tabIndex || 0;
        return /*#__PURE__*/React__namespace.createElement(ListBoxItem, {
          hostName: "ListBox",
          key: optionKey,
          label: optionLabel,
          option: option,
          style: style,
          template: props.itemTemplate,
          selected: isSelected(option),
          onClick: onOptionSelect,
          onTouchEnd: onOptionTouchEnd,
          tabIndex: tabIndex,
          disabled: disabled,
          ptCallbacks: ptCallbacks,
          metaData: metaData
        });
      });
    };
    var createItem = function createItem(option, index) {
      var scrollerOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = {
        height: scrollerOptions.props ? scrollerOptions.props.itemSize : undefined
      };
      if (props.optionGroupLabel) {
        var groupContent = props.optionGroupTemplate ? utils.ObjectUtils.getJSXElement(props.optionGroupTemplate, option, index) : getOptionGroupLabel(option);
        var groupChildrenContent = createGroupChildren(option, style);
        var key = index + '_' + getOptionGroupRenderKey(option);
        var itemGroupProps = mergeProps({
          className: ptCallbacks.cx('itemGroup'),
          style: ptCallbacks.sx('itemGroup', {
            scrollerOptions: scrollerOptions
          }),
          role: 'group'
        }, ptCallbacks.ptm('itemGroup'));
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
          key: key
        }, /*#__PURE__*/React__namespace.createElement("li", itemGroupProps, groupContent), groupChildrenContent);
      } else {
        var optionLabel = getOptionLabel(option);
        var optionKey = index + '_' + getOptionRenderKey(option);
        var disabled = isOptionDisabled(option);
        var tabIndex = disabled ? null : props.tabIndex || 0;
        return /*#__PURE__*/React__namespace.createElement(ListBoxItem, {
          hostName: "ListBox",
          key: optionKey,
          label: optionLabel,
          option: option,
          style: style,
          template: props.itemTemplate,
          selected: isSelected(option),
          onClick: onOptionSelect,
          onTouchEnd: onOptionTouchEnd,
          tabIndex: tabIndex,
          disabled: disabled,
          ptCallbacks: ptCallbacks,
          metaData: metaData
        });
      }
    };
    var createItems = function createItems() {
      if (utils.ObjectUtils.isNotEmpty(visibleOptions)) {
        return visibleOptions.map(createItem);
      } else if (hasFilter) {
        return createEmptyMessage(props.emptyFilterMessage, true);
      }
      return createEmptyMessage(props.emptyMessage);
    };
    var createEmptyMessage = function createEmptyMessage(emptyMessage, isFilter) {
      var emptyMessageProps = mergeProps({
        className: ptCallbacks.cx('emptyMessage')
      }, ptCallbacks.ptm('emptyMessage'));
      var message = utils.ObjectUtils.getJSXElement(emptyMessage, props) || api.localeOption(isFilter ? 'emptyFilterMessage' : 'emptyMessage');
      return /*#__PURE__*/React__namespace.createElement("li", emptyMessageProps, message);
    };
    var createList = function createList() {
      if (props.virtualScrollerOptions) {
        var virtualScrollerProps = _objectSpread(_objectSpread({}, props.virtualScrollerOptions), {
          items: visibleOptions,
          onLazyLoad: function onLazyLoad(event) {
            return props.virtualScrollerOptions.onLazyLoad(_objectSpread(_objectSpread({}, event), {
              filter: visibleOptions
            }));
          },
          itemTemplate: function itemTemplate(item, options) {
            return item && createItem(item, options.index, options);
          },
          contentTemplate: function contentTemplate(options) {
            var listProps = mergeProps(_objectSpread({
              ref: options.contentRef,
              style: ptCallbacks.sx('list', {
                options: options
              }),
              className: ptCallbacks.cx('list', {
                options: options
              }),
              role: 'listbox',
              'aria-multiselectable': props.multiple
            }, ariaProps), ptCallbacks.ptm('list'));
            return /*#__PURE__*/React__namespace.createElement("ul", listProps, options.children);
          }
        });
        return /*#__PURE__*/React__namespace.createElement(virtualscroller.VirtualScroller, _extends({
          ref: virtualScrollerRef
        }, virtualScrollerProps, {
          pt: ptCallbacks.ptm('virtualScroller')
        }));
      } else {
        var items = createItems();
        var listProps = mergeProps(_objectSpread({
          className: ptCallbacks.cx('list'),
          role: 'listbox',
          'aria-multiselectable': props.multiple
        }, ariaProps), ptCallbacks.ptm('list'));
        return /*#__PURE__*/React__namespace.createElement("ul", listProps, items);
      }
    };
    var visibleOptions = getVisibleOptions();
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = ListBoxBase.getOtherProps(props);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var list = createList();
    var header = createHeader();
    var wrapperProps = mergeProps({
      className: ptCallbacks.cx('wrapper'),
      style: props.listStyle
    }, ptCallbacks.ptm('wrapper'));
    var rootProps = mergeProps({
      ref: elementRef,
      id: props.id,
      className: ptCallbacks.cx('root'),
      style: props.style
    }, ListBoxBase.getOtherProps(props), ptCallbacks.ptm('root'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, header, /*#__PURE__*/React__namespace.createElement("div", wrapperProps, list)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions, {
      pt: ptCallbacks.ptm('tooltip')
    })));
  }));
  ListBox.displayName = 'ListBox';

  exports.ListBox = ListBox;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.tooltip, primereact.utils, primereact.virtualscroller, primereact.icons.search, primereact.inputtext, primereact.ripple);
