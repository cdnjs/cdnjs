(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../../components/checkbox/checkbox", "../../components/file-uploader/file-uploader", "../../components/content-switcher/content-switcher", "../../components/tabs/tabs", "../../components/overflow-menu/overflow-menu", "../../components/modal/modal", "../../components/loading/loading", "../../components/inline-loading/inline-loading", "../../components/dropdown/dropdown", "../../components/number-input/number-input", "../../components/data-table-v2/data-table-v2", "../../components/data-table/data-table", "../../components/date-picker/date-picker", "../../components/pagination/pagination", "../../components/search/search", "../../components/accordion/accordion", "../../components/copy-button/copy-button", "../../components/notification/notification", "../../components/toolbar/toolbar", "../../components/tooltip/tooltip", "../../components/tooltip/tooltip--simple", "../../components/progress-indicator/progress-indicator", "../../components/floating-menu/floating-menu", "../../components/structured-list/structured-list", "../../components/slider/slider", "../../components/tile/tile", "../../components/code-snippet/code-snippet", "../../components/text-input/text-input", "../../components/ui-shell/side-nav", "../../components/ui-shell/header-submenu", "../../components/ui-shell/header-nav", "../../components/ui-shell/navigation-menu", "../../components/ui-shell/product-switcher", "../../components/pagination-nav/pagination-nav"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../components/checkbox/checkbox"), require("../../components/file-uploader/file-uploader"), require("../../components/content-switcher/content-switcher"), require("../../components/tabs/tabs"), require("../../components/overflow-menu/overflow-menu"), require("../../components/modal/modal"), require("../../components/loading/loading"), require("../../components/inline-loading/inline-loading"), require("../../components/dropdown/dropdown"), require("../../components/number-input/number-input"), require("../../components/data-table-v2/data-table-v2"), require("../../components/data-table/data-table"), require("../../components/date-picker/date-picker"), require("../../components/pagination/pagination"), require("../../components/search/search"), require("../../components/accordion/accordion"), require("../../components/copy-button/copy-button"), require("../../components/notification/notification"), require("../../components/toolbar/toolbar"), require("../../components/tooltip/tooltip"), require("../../components/tooltip/tooltip--simple"), require("../../components/progress-indicator/progress-indicator"), require("../../components/floating-menu/floating-menu"), require("../../components/structured-list/structured-list"), require("../../components/slider/slider"), require("../../components/tile/tile"), require("../../components/code-snippet/code-snippet"), require("../../components/text-input/text-input"), require("../../components/ui-shell/side-nav"), require("../../components/ui-shell/header-submenu"), require("../../components/ui-shell/header-nav"), require("../../components/ui-shell/navigation-menu"), require("../../components/ui-shell/product-switcher"), require("../../components/pagination-nav/pagination-nav"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.checkbox, global.fileUploader, global.contentSwitcher, global.tabs, global.overflowMenu, global.modal, global.loading, global.inlineLoading, global.dropdown, global.numberInput, global.dataTableV2, global.dataTable, global.datePicker, global.pagination, global.search, global.accordion, global.copyButton, global.notification, global.toolbar, global.tooltip, global.tooltipSimple, global.progressIndicator, global.floatingMenu, global.structuredList, global.slider, global.tile, global.codeSnippet, global.textInput, global.sideNav, global.headerSubmenu, global.headerNav, global.navigationMenu, global.productSwitcher, global.paginationNav);
    global.components = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _checkbox, _fileUploader, _contentSwitcher, _tabs, _overflowMenu, _modal, _loading, _inlineLoading, _dropdown, _numberInput, _dataTableV, _dataTable, _datePicker, _pagination, _search, _accordion, _copyButton, _notification, _toolbar, _tooltip, _tooltipSimple, _progressIndicator, _floatingMenu, _structuredList, _slider, _tile, _codeSnippet, _textInput, _sideNav, _headerSubmenu, _headerNav, _navigationMenu, _productSwitcher, _paginationNav) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "Checkbox", {
    enumerable: true,
    get: function get() {
      return _checkbox.default;
    }
  });
  Object.defineProperty(_exports, "FileUploader", {
    enumerable: true,
    get: function get() {
      return _fileUploader.default;
    }
  });
  Object.defineProperty(_exports, "ContentSwitcher", {
    enumerable: true,
    get: function get() {
      return _contentSwitcher.default;
    }
  });
  Object.defineProperty(_exports, "Tab", {
    enumerable: true,
    get: function get() {
      return _tabs.default;
    }
  });
  Object.defineProperty(_exports, "OverflowMenu", {
    enumerable: true,
    get: function get() {
      return _overflowMenu.default;
    }
  });
  Object.defineProperty(_exports, "Modal", {
    enumerable: true,
    get: function get() {
      return _modal.default;
    }
  });
  Object.defineProperty(_exports, "Loading", {
    enumerable: true,
    get: function get() {
      return _loading.default;
    }
  });
  Object.defineProperty(_exports, "InlineLoading", {
    enumerable: true,
    get: function get() {
      return _inlineLoading.default;
    }
  });
  Object.defineProperty(_exports, "Dropdown", {
    enumerable: true,
    get: function get() {
      return _dropdown.default;
    }
  });
  Object.defineProperty(_exports, "NumberInput", {
    enumerable: true,
    get: function get() {
      return _numberInput.default;
    }
  });
  Object.defineProperty(_exports, "DataTableV2", {
    enumerable: true,
    get: function get() {
      return _dataTableV.default;
    }
  });
  Object.defineProperty(_exports, "DataTable", {
    enumerable: true,
    get: function get() {
      return _dataTable.default;
    }
  });
  Object.defineProperty(_exports, "DatePicker", {
    enumerable: true,
    get: function get() {
      return _datePicker.default;
    }
  });
  Object.defineProperty(_exports, "Pagination", {
    enumerable: true,
    get: function get() {
      return _pagination.default;
    }
  });
  Object.defineProperty(_exports, "Search", {
    enumerable: true,
    get: function get() {
      return _search.default;
    }
  });
  Object.defineProperty(_exports, "Accordion", {
    enumerable: true,
    get: function get() {
      return _accordion.default;
    }
  });
  Object.defineProperty(_exports, "CopyButton", {
    enumerable: true,
    get: function get() {
      return _copyButton.default;
    }
  });
  Object.defineProperty(_exports, "Notification", {
    enumerable: true,
    get: function get() {
      return _notification.default;
    }
  });
  Object.defineProperty(_exports, "Toolbar", {
    enumerable: true,
    get: function get() {
      return _toolbar.default;
    }
  });
  Object.defineProperty(_exports, "Tooltip", {
    enumerable: true,
    get: function get() {
      return _tooltip.default;
    }
  });
  Object.defineProperty(_exports, "TooltipSimple", {
    enumerable: true,
    get: function get() {
      return _tooltipSimple.default;
    }
  });
  Object.defineProperty(_exports, "ProgressIndicator", {
    enumerable: true,
    get: function get() {
      return _progressIndicator.default;
    }
  });
  Object.defineProperty(_exports, "FloatingMenu", {
    enumerable: true,
    get: function get() {
      return _floatingMenu.default;
    }
  });
  Object.defineProperty(_exports, "StructuredList", {
    enumerable: true,
    get: function get() {
      return _structuredList.default;
    }
  });
  Object.defineProperty(_exports, "Slider", {
    enumerable: true,
    get: function get() {
      return _slider.default;
    }
  });
  Object.defineProperty(_exports, "Tile", {
    enumerable: true,
    get: function get() {
      return _tile.default;
    }
  });
  Object.defineProperty(_exports, "CodeSnippet", {
    enumerable: true,
    get: function get() {
      return _codeSnippet.default;
    }
  });
  Object.defineProperty(_exports, "TextInput", {
    enumerable: true,
    get: function get() {
      return _textInput.default;
    }
  });
  Object.defineProperty(_exports, "SideNav", {
    enumerable: true,
    get: function get() {
      return _sideNav.default;
    }
  });
  Object.defineProperty(_exports, "HeaderSubmenu", {
    enumerable: true,
    get: function get() {
      return _headerSubmenu.default;
    }
  });
  Object.defineProperty(_exports, "HeaderNav", {
    enumerable: true,
    get: function get() {
      return _headerNav.default;
    }
  });
  Object.defineProperty(_exports, "NavigationMenu", {
    enumerable: true,
    get: function get() {
      return _navigationMenu.default;
    }
  });
  Object.defineProperty(_exports, "ProductSwitcher", {
    enumerable: true,
    get: function get() {
      return _productSwitcher.default;
    }
  });
  Object.defineProperty(_exports, "PaginationNav", {
    enumerable: true,
    get: function get() {
      return _paginationNav.default;
    }
  });
  _checkbox = _interopRequireDefault(_checkbox);
  _fileUploader = _interopRequireDefault(_fileUploader);
  _contentSwitcher = _interopRequireDefault(_contentSwitcher);
  _tabs = _interopRequireDefault(_tabs);
  _overflowMenu = _interopRequireDefault(_overflowMenu);
  _modal = _interopRequireDefault(_modal);
  _loading = _interopRequireDefault(_loading);
  _inlineLoading = _interopRequireDefault(_inlineLoading);
  _dropdown = _interopRequireDefault(_dropdown);
  _numberInput = _interopRequireDefault(_numberInput);
  _dataTableV = _interopRequireDefault(_dataTableV);
  _dataTable = _interopRequireDefault(_dataTable);
  _datePicker = _interopRequireDefault(_datePicker);
  _pagination = _interopRequireDefault(_pagination);
  _search = _interopRequireDefault(_search);
  _accordion = _interopRequireDefault(_accordion);
  _copyButton = _interopRequireDefault(_copyButton);
  _notification = _interopRequireDefault(_notification);
  _toolbar = _interopRequireDefault(_toolbar);
  _tooltip = _interopRequireDefault(_tooltip);
  _tooltipSimple = _interopRequireDefault(_tooltipSimple);
  _progressIndicator = _interopRequireDefault(_progressIndicator);
  _floatingMenu = _interopRequireDefault(_floatingMenu);
  _structuredList = _interopRequireDefault(_structuredList);
  _slider = _interopRequireDefault(_slider);
  _tile = _interopRequireDefault(_tile);
  _codeSnippet = _interopRequireDefault(_codeSnippet);
  _textInput = _interopRequireDefault(_textInput);
  _sideNav = _interopRequireDefault(_sideNav);
  _headerSubmenu = _interopRequireDefault(_headerSubmenu);
  _headerNav = _interopRequireDefault(_headerNav);
  _navigationMenu = _interopRequireDefault(_navigationMenu);
  _productSwitcher = _interopRequireDefault(_productSwitcher);
  _paginationNav = _interopRequireDefault(_paginationNav);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});