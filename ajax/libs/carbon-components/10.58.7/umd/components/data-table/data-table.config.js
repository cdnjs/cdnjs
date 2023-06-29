(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.dataTableConfig = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  /**
   * Copyright IBM Corp. 2016, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   */
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
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

  var _require = require('../../globals/js/settings'),
      prefix = _require.prefix;

  var iconAddSolid = "\n  <svg class=\"".concat(prefix, "--btn__icon\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z\" fill-rule=\"evenodd\" />\n  </svg>\n");
  var iconDownload = "\n  <svg class=\"".concat(prefix, "--toolbar-action__icon\"\n    fill-rule=\"evenodd\" height=\"16\" name=\"download\" role=\"img\" viewBox=\"0 0 14 16\" width=\"14\"\n    aria-label=\"Download\" alt=\"Download\">\n    <title>Download</title>\n    <path d=\"M7.506 11.03l4.137-4.376.727.687-5.363 5.672-5.367-5.67.726-.687 4.14 4.374V0h1v11.03z\"></path>\n    <path d=\"M13 15v-2h1v2a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-2h1v2h12z\"></path>\n  </svg>\n");
  /* eslint-disable max-len */

  var iconEdit = "\n  <svg class=\"".concat(prefix, "--toolbar-action__icon\"\n    fill-rule=\"evenodd\" height=\"16\" name=\"edit\" role=\"img\" viewBox=\"0 0 16 16\" width=\"16\"\n    aria-label=\"Edit\" alt=\"Edit\">\n    <title>Edit</title>\n    <path d=\"M7.926 3.38L1.002 9.72V12h2.304l6.926-6.316L7.926 3.38zm.738-.675l2.308 2.304 1.451-1.324-2.308-2.309-1.451 1.329zM.002 9.28L9.439.639a1 1 0 0 1 1.383.03l2.309 2.309a1 1 0 0 1-.034 1.446L3.694 13H.002V9.28zM0 16.013v-1h16v1z\"></path>\n  </svg>\n");
  var iconSettings = "\n  <svg class=\"".concat(prefix, "--toolbar-action__icon\"\n    fill-rule=\"evenodd\" height=\"16\" name=\"settings\" role=\"img\" viewBox=\"0 0 15 16\" width=\"15\"\n    aria-label=\"Settings\" alt=\"Settings\">\n    <title>Settings</title>\n    <path d=\"M7.53 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z\"></path>\n    <path d=\"M6.268 2.636l-.313.093c-.662.198-1.28.52-1.822.946l-.255.2-1.427-.754-1.214 1.735 1.186 1.073-.104.31a5.493 5.493 0 0 0-.198 2.759l.05.274L1 10.33l1.214 1.734 1.06-.56.262.275a5.5 5.5 0 0 0 2.42 1.491l.312.093L6.472 15H8.59l.204-1.636.313-.093a5.494 5.494 0 0 0 2.21-1.28l.26-.248 1.09.576 1.214-1.734-1.08-.977.071-.29a5.514 5.514 0 0 0-.073-2.905l-.091-.302 1.15-1.041-1.214-1.734-1.3.687-.257-.22a5.487 5.487 0 0 0-1.98-1.074l-.313-.093L8.59 1H6.472l-.204 1.636zM5.48.876A1 1 0 0 1 6.472 0H8.59a1 1 0 0 1 .992.876l.124.997a6.486 6.486 0 0 1 1.761.954l.71-.375a1 1 0 0 1 1.286.31l1.215 1.734a1 1 0 0 1-.149 1.316l-.688.622a6.514 6.514 0 0 1 .067 2.828l.644.581a1 1 0 0 1 .148 1.316l-1.214 1.734a1 1 0 0 1-1.287.31l-.464-.245c-.6.508-1.286.905-2.029 1.169l-.124.997A1 1 0 0 1 8.59 16H6.472a1 1 0 0 1-.992-.876l-.125-.997a6.499 6.499 0 0 1-2.274-1.389l-.399.211a1 1 0 0 1-1.287-.31L.181 10.904A1 1 0 0 1 .329 9.59l.764-.69a6.553 6.553 0 0 1 .18-2.662l-.707-.64a1 1 0 0 1-.148-1.315l1.214-1.734a1 1 0 0 1 1.287-.31l.86.454a6.482 6.482 0 0 1 1.576-.819L5.48.876z\"></path>\n  </svg>\n");
  /* eslint-enable max-len */

  var menuItems = [{
    label: 'Stop app',
    primaryFocus: true
  }, {
    label: 'Restart app'
  }, {
    label: 'Rename app'
  }, {
    label: 'Edit routes and access, use title when'
  }, {
    label: 'Delete app',
    danger: true
  }];
  var batchActions = [{
    label: 'Ghost',
    icon: iconAddSolid
  }, {
    label: 'Ghost',
    icon: iconAddSolid
  }, {
    label: 'Ghost',
    icon: iconAddSolid
  }];
  var toolbarActions = [{
    icon: iconDownload
  }, {
    icon: iconEdit
  }, {
    icon: iconSettings
  }];
  var toolbarActionsX = [{
    overflowItems: [{
      label: 'Option 1',
      primaryFocus: true
    }, {
      label: 'Option 2'
    }, {
      label: 'Option 3'
    }]
  }];
  var columns = [{
    name: 'select',
    title: 'Label name',
    checkbox: true,
    checkboxId: "".concat(prefix, "--checkbox-20"),
    checkboxName: 'checkbox-20',
    checkboxValue: 'green'
  }, {
    name: 'name',
    title: 'Name',
    sortable: true,
    secondary: true
  }, {
    name: 'protocol',
    title: 'Protocol',
    sortable: true
  }, {
    name: 'port',
    title: 'Port',
    sortable: true
  }, {
    name: 'rule',
    title: 'Rule',
    sortable: true
  }, {
    name: 'attachedGroups',
    title: 'Attached Groups',
    sortable: true
  }, {
    name: 'status',
    title: 'Status',
    sortable: true
  }, {
    name: 'menu',
    menu: true
  }];
  var columnsExpandable = [{
    name: 'section',
    section: true
  }, {
    name: 'select',
    title: 'Label name',
    checkbox: true,
    checkboxId: "".concat(prefix, "--checkbox-21"),
    checkboxName: 'checkbox-21',
    checkboxValue: 'green'
  }, {
    name: 'name',
    title: 'Name',
    sortable: true,
    secondary: true
  }, {
    name: 'protocol',
    title: 'Protocol',
    sortable: true
  }, {
    name: 'port',
    title: 'Ports',
    sortable: true
  }, {
    name: 'rule',
    title: 'Rule',
    sortable: true
  }, {
    name: 'attachedGroups',
    title: 'Attached Groups',
    sortable: true
  }, {
    name: 'status',
    title: 'Status',
    sortable: true
  }];
  var columnsSmall = columns.slice(1, -1).map(function (column) {
    return _objectSpread(_objectSpread({}, column), {}, {
      sortable: false
    });
  });
  var rows = [{
    id: 'row-id-16',
    select: {
      id: "".concat(prefix, "--checkbox-16"),
      name: 'checkbox-16',
      value: 'green',
      label: 'Label name'
    },
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    secondaryText: 'Secondary Text',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: 'Maureen’s VM Groups Testing a really long text here',
    status: 'Active',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true
    }
  }, {
    id: 'row-id-14',
    select: {
      id: "".concat(prefix, "--checkbox-14"),
      name: 'checkbox-14',
      value: 'green',
      label: 'Label name'
    },
    name: 'Load Balancer 5',
    protocol: 'HTTP',
    secondaryText: 'Secondary Text',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: 'Maureen’s VM Groups',
    status: 'Active',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true
    }
  }, {
    id: 'row-id-15',
    select: {
      id: "".concat(prefix, "--checkbox-15"),
      name: 'checkbox-15',
      value: 'green',
      label: 'Label name'
    },
    name: 'Load Balancer 5',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: 'Maureen’s VM Groups',
    status: 'Active',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true
    }
  }, {
    id: 'row-id-11',
    select: {
      id: "".concat(prefix, "--checkbox-11"),
      name: 'checkbox-11',
      value: 'green',
      label: 'Label name'
    },
    name: 'Load Balancer 5',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: 'Maureen’s VM Groups',
    status: 'Active',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true
    }
  }, {
    id: 'row-id-12',
    select: {
      id: "".concat(prefix, "--checkbox-12"),
      name: 'checkbox-12',
      value: 'green',
      label: 'Label name'
    },
    name: 'Load Balancer 5',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: 'Maureen’s VM Groups',
    status: 'Active',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true
    }
  }];
  var rowsExpandable = [{
    sectionContent:
    /* eslint-disable max-len */
    " <p>A variety of content types can live here. Be sure to follow Carbon design guidelines for spacing and alignment.</p>\n    ",
    section: true,
    select: {
      id: "".concat(prefix, "--checkbox-13"),
      name: 'checkbox-13',
      value: 'green',
      label: 'Label name'
    },
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: 'Maureen’s VM Groups',
    status: 'Active'
  }, {
    sectionContent:
    /* eslint-disable max-len */
    " <p>A variety of content types can live here. Be sure to follow Carbon design guidelines for spacing and alignment.</p>\n    ",
    select: {
      id: "".concat(prefix, "--checkbox-10"),
      name: 'checkbox-10',
      value: 'green',
      label: 'Label name'
    },
    section: true,
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: 'Maureen’s VM Groups',
    status: 'Active'
  }];
  module.exports = {
    label: 'Data Table',
    context: {
      prefix: prefix
    },
    variants: [{
      name: 'default',
      label: 'Default',
      context: {
        columns: columnsSmall,
        rows: rows,
        sticky: false
      }
    }, {
      name: 'compact',
      label: 'Compact',
      context: {
        small: true,
        columns: columnsSmall,
        rows: rows
      }
    }, {
      name: 'short',
      label: 'Short',
      context: {
        short: true,
        columns: columnsSmall,
        rows: rows
      }
    }, {
      name: 'tall',
      label: 'Tall',
      context: {
        tall: true,
        columns: columnsSmall,
        rows: rows
      }
    }, {
      name: 'zebra',
      label: 'Zebra',
      context: {
        columns: columnsSmall,
        rows: rows,
        zebra: true
      }
    }, {
      name: 'sticky',
      label: 'Sticky header (experimental)',
      meta: {
        linkOnly: true
      },
      context: {
        columns: columnsSmall,
        rows: rows,
        sticky: true
      }
    }, {
      name: 'select',
      label: 'Select',
      notes: "\n        Data Tables are used to represent a collection of resources, displaying a\n        subset of their fields in columns, or headers.\n      ",
      context: {
        state: 'default',
        title: 'Table title',
        optionalHelper: 'Optional Helper Text',
        batchActions: batchActions,
        toolbarActions: toolbarActions,
        toolbarActionsX: toolbarActionsX,
        columns: columns,
        rows: rows,
        selectedItemsCounterLabel: "\n          <span data-items-selected>3</span> items selected\n        ",
        searchInputId: 'search__input-2',
        searchLabelId: 'search-input-label-1',
        searchLabel: 'Search',
        clearSearchLabel: 'Clear search input',
        addNewLabel: 'Add new',
        cancelLabel: 'Cancel',
        sortLabel: 'Sort rows by this header in descending order',
        hasToolbar: true,
        sort: true
      }
    }, {
      name: 'small-select',
      label: 'Small Select',
      notes: "\n        Data Tables are used to represent a collection of resources, displaying a\n        subset of their fields in columns, or headers.\n      ",
      context: {
        small: true,
        state: 'default',
        title: 'Table title',
        optionalHelper: 'Optional Helper Text',
        batchActions: batchActions,
        toolbarActions: toolbarActions,
        toolbarActionsX: toolbarActionsX,
        columns: columns,
        rows: rows,
        selectedItemsCounterLabel: "\n          <span data-items-selected>3</span> items selected\n        ",
        searchInputId: 'search__input-2',
        searchLabelId: 'search-input-label-1',
        searchLabel: 'Search',
        clearSearchLabel: 'Clear search input',
        addNewLabel: 'Add new',
        cancelLabel: 'Cancel',
        sortLabel: 'Sort rows by this header in descending order',
        hasToolbar: true,
        sort: true
      }
    }, {
      name: 'short-select',
      label: 'Short Select',
      notes: "\n        Data Tables are used to represent a collection of resources, displaying a\n        subset of their fields in columns, or headers.\n      ",
      context: {
        short: true,
        state: 'default',
        title: 'Table title',
        optionalHelper: 'Optional Helper Text',
        batchActions: batchActions,
        toolbarActions: toolbarActions,
        toolbarActionsX: toolbarActionsX,
        columns: columns,
        rows: rows,
        selectedItemsCounterLabel: "\n          <span data-items-selected>3</span> items selected\n        ",
        searchInputId: 'search__input-2',
        searchLabelId: 'search-input-label-1',
        searchLabel: 'Search',
        clearSearchLabel: 'Clear search input',
        addNewLabel: 'Add new',
        cancelLabel: 'Cancel',
        sortLabel: 'Sort rows by this header in descending order',
        hasToolbar: true,
        sort: true
      }
    }, {
      name: 'tall-select',
      label: 'Tall Select',
      notes: "\n        Data Tables are used to represent a collection of resources, displaying a\n        subset of their fields in columns, or headers.\n      ",
      context: {
        tall: true,
        state: 'default',
        title: 'Table title',
        optionalHelper: 'Optional Helper Text',
        batchActions: batchActions,
        toolbarActions: toolbarActions,
        toolbarActionsX: toolbarActionsX,
        columns: columns,
        rows: rows,
        selectedItemsCounterLabel: "\n          <span data-items-selected>3</span> items selected\n        ",
        searchInputId: 'search__input-2',
        searchLabelId: 'search-input-label-1',
        searchLabel: 'Search',
        clearSearchLabel: 'Clear search input',
        addNewLabel: 'Add new',
        cancelLabel: 'Cancel',
        sortLabel: 'Sort rows by this header in descending order',
        hasToolbar: true,
        sort: true
      }
    }, {
      name: 'zebra-select',
      label: 'Zebra Select',
      notes: "\n        Data Tables are used to represent a collection of resources, displaying a\n        subset of their fields in columns, or headers.\n      ",
      context: {
        state: 'default',
        title: 'Table title',
        optionalHelper: 'Optional Helper Text',
        batchActions: batchActions,
        toolbarActions: toolbarActions,
        toolbarActionsX: toolbarActionsX,
        columns: columns,
        rows: rows,
        selectedItemsCounterLabel: "\n          <span data-items-selected>3</span> items selected\n        ",
        searchInputId: 'search__input-2',
        searchLabelId: 'search-input-label-1',
        searchLabel: 'Search',
        clearSearchLabel: 'Clear search input',
        addNewLabel: 'Add new',
        cancelLabel: 'Cancel',
        sortLabel: 'Sort rows by this header in descending order',
        hasToolbar: true,
        sort: true,
        zebra: true
      }
    }, {
      name: 'expandable',
      label: 'Expandable',
      context: {
        state: 'persistent-search',
        title: 'Table title',
        columns: columnsExpandable,
        rows: rowsExpandable,
        searchInputId: 'search__input-2',
        searchLabelId: 'search-input-label-1',
        searchLabel: 'Search',
        clearSearchLabel: 'Clear search input',
        hasToolbar: true,
        sort: true,
        batchActions: batchActions,
        toolbarActions: toolbarActions,
        toolbarActionsX: toolbarActionsX,
        selectedItemsCounterLabel: "\n          <span data-items-selected>3</span> items selected\n        ",
        addNewLabel: 'Add new',
        cancelLabel: 'Cancel',
        sortLabel: 'Sort rows by this header in descending order'
      }
    }, {
      name: 'expandable-with-expand-all',
      label: 'Expandable with expand all',
      context: {
        state: 'persistent-search',
        title: 'Table title',
        columns: columnsExpandable,
        rows: rowsExpandable,
        searchInputId: 'search__input-2',
        searchLabelId: 'search-input-label-1',
        searchLabel: 'Search',
        clearSearchLabel: 'Clear search input',
        hasToolbar: true,
        hasExpandAll: true,
        sort: true,
        batchActions: batchActions,
        toolbarActions: toolbarActions,
        toolbarActionsX: toolbarActionsX,
        selectedItemsCounterLabel: "\n          <span data-items-selected>3</span> items selected\n        ",
        addNewLabel: 'Add new',
        cancelLabel: 'Cancel',
        sortLabel: 'Sort rows by this header in descending order'
      }
    }, {
      name: 'with-pager',
      label: 'Pagination',
      context: {
        state: 'persistent-search',
        hasPager: true,
        title: 'Table title',
        batchActions: batchActions,
        toolbarActions: toolbarActions,
        toolbarActionsX: toolbarActionsX,
        columns: columns,
        rows: rows,
        selectedItemsCounterLabel: "\n          <span data-items-selected>3</span> items selected\n        ",
        searchInputId: 'search__input-2',
        searchLabelId: 'search-input-label-1',
        searchLabel: 'Search',
        clearSearchLabel: 'Clear search input',
        addNewLabel: 'Add new',
        cancelLabel: 'Cancel',
        sortLabel: 'Sort rows by this header in descending order',
        hasToolbar: true,
        sort: true,
        sticky: false
      }
    }, {
      name: 'show-overflow-menus',
      label: 'Data Table (with visible overflow menu triggers)',
      notes: "\n        Data Tables are used to represent a collection of resources, displaying a\n        subset of their fields in columns, or headers.\n      ",
      context: {
        state: 'default',
        title: 'Table title',
        optionalHelper: 'Optional Helper Text',
        batchActions: batchActions,
        toolbarActions: toolbarActions,
        toolbarActionsX: toolbarActionsX,
        columns: columns,
        rows: rows,
        selectedItemsCounterLabel: "\n          <span data-items-selected>3</span> items selected\n        ",
        searchInputId: 'search__input-2',
        searchLabelId: 'search-input-label-1',
        searchLabel: 'Search',
        clearSearchLabel: 'Clear search input',
        addNewLabel: 'Add new',
        cancelLabel: 'Cancel',
        sortLabel: 'Sort rows by this header in descending order',
        hasToolbar: true,
        sort: true,
        displayOverflowMenus: true
      }
    }, {
      name: 'row-header',
      label: 'Row Header',
      context: {
        columns: columnsSmall,
        rows: rows
      }
    }]
  };
});