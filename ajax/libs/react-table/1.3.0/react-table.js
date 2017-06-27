!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ReactTable=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./src/table');

},{"./src/table":6}],2:[function(require,module,exports){
module.exports = {
  moduleClass: 'react-table',
  thClass: 'th',
  headClass: 'thead',
  trClass: 'tr',
  tdClass: 'td'
};

},{}],3:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var TableHeader = React.createFactory(require('./table-header'));
var constants = require('./constants');

module.exports = React.createClass({displayName: "exports",
  className: constants.moduleClass + '__' + constants.headClass,
  getDefaultProps: function () {
    return {
      columns: [],
      columnDisplay: {}
    };
  },
  handleHeadingClick: function () {
    if (this.props.clickHandler) {
      this.props.clickHandler.apply(null, arguments);
    }
  },
  renderHeader: function () {
    return this.props.columns.map(function (column) {
      var mappedValue = this.props.columnDisplay[column];

      return TableHeader({
        clickHandler: this.props.handleHeadingClick,
        isActive: this.props.activeKey === column,
        sortKey: column,
        sortDirection: this.props.sortDirection,
        children: mappedValue ? mappedValue : column
      });
    }.bind(this));
  },
  render: function () {
    return React.createElement('thead', {
      className: this.className,
      children: this.renderHeader()
    });
  }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./constants":2,"./table-header":4}],4:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var constants = require('./constants');

module.exports = React.createClass({displayName: "exports",
  className: constants.moduleClass + '__' + constants.thClass,
  getDefaultProps: function () {
    return {
      isActive: false,
      sortDirection: 'ascending'
    };
  },
  handleClick: function () {
    if (this.props.clickHandler) {
      this.props.clickHandler({
        sortKey: this.props.sortKey
      });
    }
  },
  getClassName: function () {
    var activeClass = this.props.isActive ?
      this.className + '--' + this.props.sortDirection : '';
    return [this.className, activeClass].join(' ');
  },
  render: function () {
    return React.createElement('th', {
      onClick: this.handleClick,
      className: this.getClassName()
    }, this.props.children);
  }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./constants":2}],5:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var constants = require('./constants');

module.exports = React.createClass({displayName: "exports",
  className: constants.moduleClass + '__' + constants.trClass,
  getDefaultProps: function () {
    return {
      data: []
    };
  },
  renderRowData: function () {
    var tds = [];
    var trClass = constants.moduleClass + '__' + constants.tdClass;

    for (var td in this.props.data) {
      tds.push(React.createElement('td', {
          className: trClass
        }, this.props.data[td]));
    }

    return tds;
  },
  render: function () {
    var rowData = this.renderRowData();
    return React.createElement('tr', {
      className: this.className,
      children: rowData
    });
  }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./constants":2}],6:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var TableRow = React.createFactory(require('./table-row'));
var TableHead = React.createFactory(require('./table-head'));

module.exports = React.createClass({displayName: "exports",
  getDefaultProps: function () {
    return {
      data: []
    };
  },
  getInitialState: function () {
    return {
      sortDirection: 'ascending'
    };
  },
  handleHeadingClick: function (data) {
    var activeKey = this.state.activeSortKey;

    if (activeKey && activeKey === data.sortKey) {
      this.setState({
        sortDirection: this.state.sortDirection ===
          'ascending' ? 'descending' : 'ascending'
      });
    } else {
      this.setState({
        activeSortKey: data.sortKey
      }, function () {
      }.bind(this));
    }
  },
  filterObject: function (obj) {
    var filteredData;
    var includedColumns = this.props.includedColumns;

    if (includedColumns) {
      filteredData = {};

      includedColumns.forEach(function (k) {
        filteredData[k] = obj[k];
      });
    } else {
      filteredData = obj;
    }

    return filteredData;
  },
  generateHeadersFromRow: function (row) {
    var data;
    var keys = [];

    if (row) {
      data = this.filterObject(row);
      keys = Object.keys(data);
    }

    return keys;
  },
  renderHead: function () {
    var columns = this.generateHeadersFromRow(this.props.data[0]);
    return TableHead({
      columns: columns,
      columnDisplay: this.props.columnDisplay,
      activeKey: this.state.activeSortKey,
      handleHeadingClick: this.handleHeadingClick,
      sortDirection: this.state.sortDirection
    });
  },
  sortRow: function (options, rowA, rowB) {
    var a = rowA[options.key];
    var b = rowB[options.key];

    if (options.direction === 'ascending') {
      if (options.type === 'number') {
        return a - b;
      } else {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      }
    } else {
      if (options.type === 'number') {
        return b - a;
      } else {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      }
    }
  },
  sortRows: function (data) {
    var sortConfig = {};

    sortConfig.direction = this.state.sortDirection;

    if (this.state.activeSortKey) {
      sortConfig.key = this.state.activeSortKey;
    } else {
      sortConfig.key = data[0] ?
        Object.keys(data[0])[0]
        : undefined;
    }

    sortConfig.type = sortConfig.key ? typeof data[0][sortConfig.key] : undefined;

    return data
          .sort(this.sortRow.bind(this, sortConfig));

  },
  renderRow: function (row) {
    return TableRow({
      data: this.filterObject(row)
    });
  },
  renderRows: function () {
    // keep things immutable-ish
    var data = this.props.data.slice();

    return this.sortRows(data)
      .map(this.renderRow);
  },
  render: function () {
    return React.createElement('table', {children: [
      this.renderHead(),
      this.renderRows()
    ]});
  }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./table-head":3,"./table-row":5}]},{},[1])(1)
});