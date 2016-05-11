(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";
var React = global.React;

module.exports = global.Semantify = {
  // collections
  Breadcrumb: require("./collections/breadcrumb.js")(React),
  Form: require("./collections/form.js")(React),
  Grid: require("./collections/grid.js")(React),
  Menu: require("./collections/menu.js")(React),
  Message: require("./collections/message.js")(React),
  Table: require("./collections/table.js")(React),

  // commons
  Column: require("./commons/column.js")(React),
  Content: require("./commons/content.js")(React),
  Field: require("./commons/field.js")(React),
  Fields: require("./commons/fields.js")(React),
  Row: require("./commons/row.js")(React),
  Section: require("./commons/section.js")(React),
  Text: require("./commons/text.js")(React),
  Title: require("./commons/title.js")(React),

  // elements
  Button: require("./elements/button.js")(React),
  Divider: require("./elements/divider.js")(React),
  Flag: require("./elements/flag.js")(React),
  Header: require("./elements/header.js")(React),
  Icon: require("./elements/icon.js")(React),
  Image: require("./elements/image.js")(React),
  Input: require("./elements/input.js")(React),
  Label: require("./elements/label.js")(React),
  List: require("./elements/list.js")(React),
  Loader: require("./elements/loader.js")(React),
  Rail: require("./elements/rail.js")(React),
  Reveal: require("./elements/reveal.js")(React),
  Segment: require("./elements/segment.js")(React),
  Step: require("./elements/step.js")(React),
  Steps: require("./elements/steps.js")(React),

  // modules
  Accordion: require("./modules/accordion.js")(React),
  Checkbox: require("./modules/checkbox.js")(React),
  Dimmer: require("./modules/dimmer.js")(React),
  Dropdown: require("./modules/dropdown.js")(React),
  Modal: require("./modules/modal.js")(React),
  Popup: require("./modules/popup.js")(React),
  Progress: require("./modules/progress.js")(React),
  Rating: require("./modules/rating.js")(React),
  Search: require("./modules/search.js")(React),
  Shape: require("./modules/shape.js")(React),
  Sidebar: require("./modules/sidebar.js")(React),
  Sticky: require("./modules/sticky.js")(React),
  Tab: require("./modules/tab.js")(React),

  // views
  Ad: require("./views/advertisement.js")(React),
  Card: require("./views/card.js")(React),
  Comment: require("./views/comment.js")(React),
  Comments: require("./views/comments.js")(React),
  Feed: require("./views/feed.js")(React),
  Item: require("./views/item.js")(React),
  Items: require("./views/items.js")(React),
  Statistic: require("./views/statistic.js")(React)
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./collections/breadcrumb.js":2,"./collections/form.js":3,"./collections/grid.js":4,"./collections/menu.js":5,"./collections/message.js":6,"./collections/table.js":7,"./commons/column.js":8,"./commons/content.js":9,"./commons/field.js":10,"./commons/fields.js":11,"./commons/row.js":12,"./commons/section.js":13,"./commons/text.js":14,"./commons/title.js":15,"./elements/button.js":17,"./elements/divider.js":18,"./elements/flag.js":19,"./elements/header.js":20,"./elements/icon.js":21,"./elements/image.js":22,"./elements/input.js":23,"./elements/label.js":24,"./elements/list.js":25,"./elements/loader.js":26,"./elements/rail.js":27,"./elements/reveal.js":28,"./elements/segment.js":29,"./elements/step.js":30,"./elements/steps.js":31,"./modules/accordion.js":36,"./modules/checkbox.js":37,"./modules/dimmer.js":38,"./modules/dropdown.js":39,"./modules/modal.js":40,"./modules/popup.js":41,"./modules/progress.js":42,"./modules/rating.js":43,"./modules/search.js":44,"./modules/shape.js":45,"./modules/sidebar.js":46,"./modules/sticky.js":47,"./modules/tab.js":48,"./views/advertisement.js":49,"./views/card.js":50,"./views/comment.js":51,"./views/comments.js":52,"./views/feed.js":53,"./views/item.js":54,"./views/items.js":55,"./views/statistic.js":56}],2:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui breadcrumb";

  var Breadcrumb = React.createClass({
    displayName: "Breadcrumb",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Breadcrumb;
};
},{"../mixins/classGenerator.js":32}],3:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui form";

  var Form = React.createClass({
    displayName: "Form",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Form;
};
},{"../mixins/classGenerator.js":32}],4:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui grid";

  var Grid = React.createClass({
    displayName: "Grid",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Grid;
};
},{"../mixins/classGenerator.js":32}],5:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui menu";

  var Menu = React.createClass({
    displayName: "Menu",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Menu;
};
},{"../mixins/classGenerator.js":32}],6:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui message";

  var Message = React.createClass({
    displayName: "Message",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Message;
};
},{"../mixins/classGenerator.js":32}],7:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui table";

  var Table = React.createClass({
    displayName: "Table",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "table",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Table;
};
},{"../mixins/classGenerator.js":32}],8:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "column";

  var Column = React.createClass({
    displayName: "Column",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Column;
};
},{"../mixins/classGenerator.js":32}],9:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "content";

  var Content = React.createClass({
    displayName: "Content",

    mixins: [ClassGenerator, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var type = _props.type;
      var color = _props.color;
      var active = _props.active;

      var other = _objectWithoutProperties(_props, ["className", "type", "color", "active"]);

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          type: "div",
          color: "null",
          active: this.getActive() }),
        this.props.children
      );
    }
  });

  return Content;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],10:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "field";

  var Field = React.createClass({
    displayName: "Field",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Field;
};
},{"../mixins/classGenerator.js":32}],11:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "fields";

  var Fields = React.createClass({
    displayName: "Fields",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Fields;
};
},{"../mixins/classGenerator.js":32}],12:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "row";

  var Row = React.createClass({
    displayName: "Row",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Row;
};
},{"../mixins/classGenerator.js":32}],13:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var ColorSelector = require("../mixins/colorSelector.js")(React);
  var TypeSelector = require("../mixins/typeSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "section";

  var Section = React.createClass({
    displayName: "Section",

    mixins: [ClassGenerator, ColorSelector, TypeSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var color = _props.color;

      var other = _objectWithoutProperties(_props, ["className", "color"]);

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          type: this.getType(),
          color: this.getColor() }),
        this.props.children
      );
    }
  });

  return Section;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/colorSelector.js":33,"../mixins/typeSelector.js":35}],14:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "text";

  var Text = React.createClass({
    displayName: "Text",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Text;
};
},{"../mixins/classGenerator.js":32}],15:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "title";

  var Title = React.createClass({
    displayName: "Title",

    mixins: [ClassGenerator, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var type = _props.type;
      var color = _props.color;
      var active = _props.active;

      var other = _objectWithoutProperties(_props, ["className", "type", "color", "active"]);

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          type: "div",
          color: "null",
          active: this.getActive() }),
        this.props.children
      );
    }
  });

  return Title;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],16:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var classSet = require("classnames");

  var Unit = React.createClass({
    displayName: "Unit",

    propTypes: {
      className: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired
    },

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var type = _props.type;
      var color = _props.color;
      var value = _props.value;
      var disabled = _props.disabled;
      var active = _props.active;
      var loading = _props.loading;

      var other = _objectWithoutProperties(_props, ["className", "type", "color", "value", "disabled", "active", "loading"]);

      switch (type) {

        case "link":
          return React.createElement(
            "a",
            _extends({}, other, {
              className: this._generateClassName(),
              "data-value": value }),
            this.props.children
          );

        case "icon":
          return React.createElement(
            "i",
            _extends({}, other, {
              className: this._generateClassName(),
              "data-value": value }),
            this.props.children
          );

        case "img":
          return React.createElement(
            "img",
            _extends({}, other, {
              className: this._generateClassName() }),
            this.props.children
          );

        case "div":
        default:
          return React.createElement(
            "div",
            _extends({}, other, {
              className: this._generateClassName(),
              "data-value": value }),
            this.props.children
          );
      }
    },

    _generateClassName: function _generateClassName() {
      var className = this.props.className;

      if (this.props.color != "null") {
        className += " " + this.props.color;
      }

      className += " " + classSet({
        disabled: this.props.disabled,
        active: this.props.active,
        loading: this.props.loading,
        focus: this.props.focus,
        error: this.props.error,
        completed: this.props.completed,
        "read-only": this.props.readOnly
      });

      return className;
    }
  });

  return Unit;
};
},{"classnames":57}],17:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var ColorSelector = require("../mixins/colorSelector.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "ui button";

  var Button = React.createClass({
    displayName: "Button",

    mixins: [ClassGenerator, ColorSelector, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var color = _props.color;
      var disabled = _props.disabled;
      var active = _props.active;
      var loading = _props.loading;

      var other = _objectWithoutProperties(_props, ["className", "color", "disabled", "active", "loading"]);

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          type: "div",
          color: this.getColor(),
          disabled: this.getDisabled(),
          active: this.getActive(),
          loading: this.getLoading() }),
        this.props.children
      );
    }
  });

  return Button;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/colorSelector.js":33,"../mixins/stateSelector.js":34}],18:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui divider";

  var Divider = React.createClass({
    displayName: "Divider",

    mixins: [ClassGenerator],

    render: function render() {
      return React.createElement(
        "div",
        { className: this.getClassName(defaultClassName) },
        this.props.children
      );
    }
  });

  return Divider;
};
},{"../mixins/classGenerator.js":32}],19:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "flag";

  var Flag = React.createClass({
    displayName: "Flag",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var type = _props.type;
      var color = _props.color;

      var other = _objectWithoutProperties(_props, ["className", "type", "color"]);

      return React.createElement(Unit, _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: "icon",
        color: "null" }));
    }
  });

  return Flag;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32}],20:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var ColorSelector = require("../mixins/colorSelector.js")(React);
  var TypeSelector = require("../mixins/typeSelector.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "ui header";

  var Header = React.createClass({
    displayName: "Header",

    mixins: [ClassGenerator, ColorSelector, TypeSelector, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var type = _props.type;
      var color = _props.color;

      var other = _objectWithoutProperties(_props, ["className", "type", "color"]);

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          type: this.getType(),
          color: this.getColor(),
          disabled: this.getDisabled() }),
        this.props.children
      );
    }
  });

  return Header;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/colorSelector.js":33,"../mixins/stateSelector.js":34,"../mixins/typeSelector.js":35}],21:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var ColorSelector = require("../mixins/colorSelector.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "icon";

  var Icon = React.createClass({
    displayName: "Icon",

    mixins: [ClassGenerator, ColorSelector, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var color = _props.color;

      var other = _objectWithoutProperties(_props, ["className", "color"]);

      return React.createElement(Unit, _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: "icon",
        color: this.getColor(),
        disabled: this.getDisabled(),
        loading: this.getLoading() }));
    }
  });

  return Icon;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/colorSelector.js":33,"../mixins/stateSelector.js":34}],22:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "ui image";

  var Image = React.createClass({
    displayName: "Image",

    mixins: [ClassGenerator, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var type = _props.type;
      var disabled = _props.disabled;

      var other = _objectWithoutProperties(_props, ["className", "type", "disabled"]);

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          type: "img",
          color: "null",
          disabled: this.getDisabled() }),
        this.props.children
      );
    }
  });

  return Image;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],23:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "ui input";

  var Input = React.createClass({
    displayName: "Input",

    mixins: [ClassGenerator, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      if (typeof this.props.children != "undefined") {
        return React.createElement(
          Unit,
          _extends({}, other, {
            className: this.getClassName(defaultClassName),
            type: "div",
            color: "null",
            loading: this.getLoading(),
            focus: this.getFocus(),
            error: this.getError() }),
          this.props.children
        );
      } else {
        return React.createElement(
          Unit,
          {
            className: this.getClassName(defaultClassName),
            type: "div",
            color: "null",
            loading: this.getLoading(),
            focus: this.getFocus(),
            error: this.getError() },
          React.createElement("input", _extends({}, other, {
            placeholder: this.props.placeholder,
            type: this.props.type }))
        );
      }
    }
  });

  return Input;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],24:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var ColorSelector = require("../mixins/colorSelector.js")(React);
  var TypeSelector = require("../mixins/typeSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "ui label";

  var Label = React.createClass({
    displayName: "Label",

    mixins: [ClassGenerator, ColorSelector, TypeSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var type = _props.type;
      var color = _props.color;

      var other = _objectWithoutProperties(_props, ["className", "type", "color"]);

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          type: this.getType(),
          color: this.getColor() }),
        this.props.children
      );
    }
  });

  return Label;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/colorSelector.js":33,"../mixins/typeSelector.js":35}],25:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui list";

  var List = React.createClass({
    displayName: "List",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return List;
};
},{"../mixins/classGenerator.js":32}],26:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "ui loader";

  var Loader = React.createClass({
    displayName: "Loader",

    mixins: [ClassGenerator, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          type: "div",
          color: "null",
          disabled: this.getDisabled(),
          active: this.getActive() }),
        this.props.children
      );
    }
  });

  return Loader;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],27:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui rail";

  var Rail = React.createClass({
    displayName: "Rail",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Rail;
};
},{"../mixins/classGenerator.js":32}],28:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "ui reveal";

  var Reveal = React.createClass({
    displayName: "Reveal",

    mixins: [ClassGenerator, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          type: "div",
          color: "null",
          disabled: this.getDisabled() }),
        this.props.children
      );
    }
  });

  return Reveal;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],29:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var ColorSelector = require("../mixins/colorSelector.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "ui segment";

  var Segment = React.createClass({
    displayName: "Segment",

    mixins: [ClassGenerator, ColorSelector, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var color = _props.color;

      var other = _objectWithoutProperties(_props, ["className", "color"]);

      return React.createElement(Unit, _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: "div",
        color: this.getColor(),
        disabled: this.getDisabled(),
        loading: this.getLoading() }));
    }
  });

  return Segment;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/colorSelector.js":33,"../mixins/stateSelector.js":34}],30:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "step";

  var Step = React.createClass({
    displayName: "Step",

    mixins: [ClassGenerator, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          type: "div",
          color: "null",
          active: this.getActive(),
          completed: this.getCompleted(),
          disabled: this.getDisabled() }),
        this.props.children
      );
    }
  });

  return Step;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],31:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui steps";

  var Steps = React.createClass({
    displayName: "Steps",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Steps;
};
},{"../mixins/classGenerator.js":32}],32:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var classSet = require("classnames");

  var ClassGenerator = {

    propTypes: {
      className: React.PropTypes.string
    },

    getClassName: function getClassName(defaultClassName, addClassName) {
      var classResult = defaultClassName;

      if (typeof this.props.className !== "undefined") {
        classResult += " " + this.props.className;
      }

      if (typeof addClassName !== "undefined") {
        if (typeof addClassName === "object") {
          classResult += " " + classSet(addClassName);
        } else {
          classResult += " " + addClassName;
        }
      }

      return classResult;
    }
  };

  return ClassGenerator;
};
},{"classnames":57}],33:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var colorArray = ["black", "yellow", "green", "blue", "orange", "purple", "red", "teal"];

  var ColorSelector = {

    propTypes: {
      color: React.PropTypes.oneOf(colorArray)
    },

    getColor: function getColor() {
      var color = "null";

      if (typeof this.props.color !== "undefined") {

        if (colorArray.indexOf(this.props.color) !== -1) {
          color = this.props.color;
        }
      }

      return color;
    }
  };

  return ColorSelector;
};
},{}],34:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var StateSelector = {

    propTypes: {
      disabled: React.PropTypes.bool,
      active: React.PropTypes.bool,
      loading: React.PropTypes.bool,
      focus: React.PropTypes.bool,
      error: React.PropTypes.bool,
      completed: React.PropTypes.bool,
      readOnly: React.PropTypes.bool,
      success: React.PropTypes.bool,
      warning: React.PropTypes.bool
    },

    getDisabled: function getDisabled() {
      var disabled = false;

      if (typeof this.props.disabled !== "undefined") {
        disabled = this.props.disabled;
      }

      return disabled;
    },

    getActive: function getActive() {
      var active = false;

      if (typeof this.props.active !== "undefined") {
        active = this.props.active;
      }

      return active;
    },

    getLoading: function getLoading() {
      var loading = false;

      if (typeof this.props.loading !== "undefined") {
        loading = this.props.loading;
      }

      return loading;
    },

    getFocus: function getFocus() {
      var focus = false;

      if (typeof this.props.focus !== "undefined") {
        focus = this.props.focus;
      }

      return focus;
    },

    getError: function getError() {
      var error = false;

      if (typeof this.props.error !== "undefined") {
        error = this.props.error;
      }

      return error;
    },

    getCompleted: function getCompleted() {
      var completed = false;

      if (typeof this.props.completed !== "undefined") {
        completed = this.props.completed;
      }

      return completed;
    },

    getReadOnly: function getReadOnly() {
      var readOnly = false;

      if (typeof this.props.readOnly !== "undefined") {
        readOnly = this.props.readOnly;
      }

      return readOnly;
    },

    getSuccess: function getSuccess() {
      var success = false;

      if (typeof this.props.success !== "undefined") {
        success = this.props.success;
      }

      return success;
    },

    getWarning: function getWarning() {
      var warning = false;

      if (typeof this.props.warning !== "undefined") {
        warning = this.props.warning;
      }

      return warning;
    }
  };

  return StateSelector;
};
},{}],35:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var typeArray = ["div", "link", "icon"];

  var TypeSelector = {

    propTypes: {
      type: React.PropTypes.oneOf(typeArray)
    },

    getType: function getType() {
      var type = "div";

      if (typeof this.props.type !== "undefined") {
        if (typeArray.indexOf(this.props.type) !== -1) {
          type = this.props.type;
        }
      }
      return type;
    }
  };

  return TypeSelector;
};
},{}],36:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui accordion";

  var Accordion = React.createClass({
    displayName: "Accordion",

    mixins: [ClassGenerator],

    render: function render() {
      return React.createElement(
        "div",
        { className: this.getClassName(defaultClassName) },
        this.props.children
      );
    },

    componentDidMount: function componentDidMount() {
      if (typeof this.props.init != "undefined") {
        if (this.props.init === false) {
          return;
        }

        if (this.props.init === true) {
          $(this.getDOMNode()).accordion();
        } else {
          $(this.getDOMNode()).accordion(this.props.init);
        }
      }
    }
  });

  return Accordion;
};
},{"../mixins/classGenerator.js":32}],37:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "ui checkbox";

  var Checkbox = React.createClass({
    displayName: "Checkbox",

    mixins: [ClassGenerator, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var color = _props.color;
      var type = _props.type;
      var disabled = _props.disabled;
      var readOnly = _props.readOnly;

      var other = _objectWithoutProperties(_props, ["className", "color", "type", "disabled", "readOnly"]);

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          color: "null",
          type: "div",
          disabled: this.getDisabled(),
          readOnly: this.getReadOnly() }),
        this.props.children
      );
    },

    componentDidMount: function componentDidMount() {
      if (typeof this.props.init != "undefined") {
        if (this.props.init === false) {
          return;
        }

        if (this.props.init === true) {
          $(this.getDOMNode()).checkbox();
        } else {
          $(this.getDOMNode()).checkbox(this.props.init);
        }
      }
    }
  });

  return Checkbox;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],38:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "ui dimmer";

  var Dimmer = React.createClass({
    displayName: "Dimmer",

    mixins: [ClassGenerator, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var color = _props.color;
      var type = _props.type;
      var disabled = _props.disabled;
      var active = _props.active;

      var other = _objectWithoutProperties(_props, ["className", "color", "type", "disabled", "active"]);

      return React.createElement(
        Unit,
        {
          className: this.getClassName(defaultClassName),
          color: "null",
          type: "div",
          disabled: this.getDisabled(),
          active: this.getActive() },
        this.props.children
      );
    },

    componentDidMount: function componentDidMount() {
      if (typeof this.props.init != "undefined") {
        if (this.props.init === false) {
          return;
        }

        if (this.props.init === true) {
          $(this.getDOMNode()).dimmer();
        } else {
          $(this.getDOMNode()).dimmer(this.props.init);
        }
      }
    }
  });

  return Dimmer;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],39:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "ui dropdown";

  var Dropdown = React.createClass({
    displayName: "Dropdown",

    mixins: [ClassGenerator, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var color = _props.color;
      var type = _props.type;
      var error = _props.error;
      var disable = _props.disable;
      var active = _props.active;

      var other = _objectWithoutProperties(_props, ["className", "color", "type", "error", "disable", "active"]);

      if (this.getActive() || this.getDisabled()) {
        defaultClassName += " simple";
      }

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          color: "null",
          type: "div",
          error: this.getError(),
          disable: this.getDisabled(),
          active: this.getActive() }),
        this.props.children
      );
    },

    componentDidMount: function componentDidMount() {
      if (typeof this.props.init != "undefined") {
        if (this.props.init === false) {
          return;
        }

        if (this.props.init === true) {
          $(this.getDOMNode()).dropdown();
        } else {
          $(this.getDOMNode()).dropdown(this.props.init);
        }
      }
    }
  });

  return Dropdown;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],40:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "ui modal";

  var Modal = React.createClass({
    displayName: "Modal",

    mixins: [ClassGenerator, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var color = _props.color;
      var type = _props.type;
      var active = _props.active;

      var other = _objectWithoutProperties(_props, ["className", "color", "type", "active"]);

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          color: "null",
          type: "div",
          active: this.getActive() }),
        this.props.children
      );
    },

    componentDidMount: function componentDidMount() {
      if (typeof this.props.init != "undefined") {
        if (this.props.init === false) {
          return;
        }

        if (this.props.init === true) {
          $(this.getDOMNode()).modal();
        } else {
          $(this.getDOMNode()).modal(this.props.init);
        }
      }
    }
  });

  return Modal;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],41:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui popup";

  var Popup = React.createClass({
    displayName: "Popup",

    mixins: [ClassGenerator],

    render: function render() {
      return React.createElement(
        "div",
        { className: this.getClassName(defaultClassName) },
        this.props.children
      );
    }
  });

  return Popup;
};
},{"../mixins/classGenerator.js":32}],42:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);

  var defaultClassName = "ui progress";

  var Progress = React.createClass({
    displayName: "Progress",

    mixins: [ClassGenerator, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var percent = _props.percent;
      var value = _props.value;
      var total = _props.total;
      var active = _props.active;
      var success = _props.success;
      var warning = _props.warning;
      var error = _props.error;
      var disabled = _props.disabled;

      var other = _objectWithoutProperties(_props, ["className", "percent", "value", "total", "active", "success", "warning", "error", "disabled"]);

      var state = {
        active: this.getActive(),
        success: this.getSuccess(),
        warning: this.getWarning(),
        error: this.getError(),
        disabled: this.getDisabled()
      };

      return React.createElement(
        "div",
        _extends({}, other, {
          className: this.getClassName(defaultClassName, state),
          "data-percent": percent,
          "data-value": value,
          "data-total": total }),
        this.props.children
      );
    },

    componentDidMount: function componentDidMount() {
      if (typeof this.props.init != "undefined") {
        if (this.props.init === false) {
          return;
        }

        if (this.props.init === true) {
          $(this.getDOMNode()).progress();
        } else {
          $(this.getDOMNode()).progress(this.props.init);
        }
      }
    }
  });

  return Progress;
};
},{"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],43:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui rating";

  var Rating = React.createClass({
    displayName: "Rating",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var rating = _props.rating;
      var maxRating = _props.maxRating;

      var other = _objectWithoutProperties(_props, ["className", "rating", "maxRating"]);

      return React.createElement(
        "div",
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          "data-rating": rating,
          "data-max-rating": maxRating }),
        this.props.children
      );
    },

    componentDidMount: function componentDidMount() {
      if (typeof this.props.init != "undefined") {
        if (this.props.init === false) {
          return;
        }

        if (this.props.init === true) {
          $(this.getDOMNode()).rating();
        } else {
          $(this.getDOMNode()).rating(this.props.init);
        }
      }
    }
  });

  return Rating;
};
},{"../mixins/classGenerator.js":32}],44:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "ui search";

  var Search = React.createClass({
    displayName: "Search",

    mixins: [ClassGenerator, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var color = _props.color;
      var type = _props.type;
      var active = _props.active;

      var other = _objectWithoutProperties(_props, ["className", "color", "type", "active"]);

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          color: "null",
          type: "div",
          loading: this.getLoading() }),
        this.props.children
      );
    },

    componentDidMount: function componentDidMount() {
      if (typeof this.props.init != "undefined") {
        if (this.props.init === false) {
          return;
        }

        if (this.props.init === true) {
          $(this.getDOMNode()).search();
        } else {
          $(this.getDOMNode()).search(this.props.init);
        }
      }
    }
  });

  return Search;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],45:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui shape";

  var Shape = React.createClass({
    displayName: "Shape",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    },

    componentDidMount: function componentDidMount() {
      if (typeof this.props.init != "undefined") {
        if (this.props.init === false) {
          return;
        }

        if (this.props.init === true) {
          $(this.getDOMNode()).shape();
        } else {
          $(this.getDOMNode()).shape(this.props.init);
        }
      }
    }
  });

  return Shape;
};
},{"../mixins/classGenerator.js":32}],46:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui sidebar";

  var Sidebar = React.createClass({
    displayName: "Sidebar",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    },

    componentDidMount: function componentDidMount() {
      if (typeof this.props.init != "undefined") {
        if (this.props.init === false) {
          return;
        }

        if (this.props.init === true) {
          $(this.getDOMNode()).sidebar();
        } else {
          $(this.getDOMNode()).sidebar(this.props.init);
        }
      }
    }
  });

  return Sidebar;
};
},{"../mixins/classGenerator.js":32}],47:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui sticky";

  var Sticky = React.createClass({
    displayName: "Sticky",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    },

    componentDidMount: function componentDidMount() {
      if (typeof this.props.init != "undefined") {
        if (this.props.init === false) {
          return;
        }

        if (this.props.init === true) {
          $(this.getDOMNode()).sticky();
        } else {
          $(this.getDOMNode()).sticky(this.props.init);
        }
      }
    }
  });

  return Sticky;
};
},{"../mixins/classGenerator.js":32}],48:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var StateSelector = require("../mixins/stateSelector.js")(React);

  var defaultClassName = "ui tab";

  var Tab = React.createClass({
    displayName: "Tab",

    mixins: [ClassGenerator, StateSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var active = _props.active;
      var loading = _props.loading;
      var tab = _props.tab;

      var other = _objectWithoutProperties(_props, ["className", "active", "loading", "tab"]);

      var state = {
        active: this.getActive(),
        loading: this.getLoading()
      };

      return React.createElement(
        "div",
        _extends({}, other, {
          className: this.getClassName(defaultClassName, state),
          "data-tab": tab }),
        this.props.children
      );
    },

    componentDidMount: function componentDidMount() {
      if (typeof this.props.init != "undefined") {
        if (this.props.init === false) {
          return;
        }

        if (this.props.init === true) {
          $(this.getDOMNode()).tab();
        } else {
          $(this.getDOMNode()).tab(this.props.init);
        }
      }
    }
  });

  return Tab;
};
},{"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],49:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui ad";

  var Ad = React.createClass({
    displayName: "Ad",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Ad;
};
},{"../mixins/classGenerator.js":32}],50:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui card";

  var Card = React.createClass({
    displayName: "Card",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Card;
};
},{"../mixins/classGenerator.js":32}],51:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "comment";

  var Comment = React.createClass({
    displayName: "Comment",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Comment;
};
},{"../mixins/classGenerator.js":32}],52:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui comments";

  var Comments = React.createClass({
    displayName: "Comments",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Comments;
};
},{"../mixins/classGenerator.js":32}],53:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui feed";

  var Feed = React.createClass({
    displayName: "Feed",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Feed;
};
},{"../mixins/classGenerator.js":32}],54:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);
  var TypeSelector = require("../mixins/typeSelector.js")(React);
  var Unit = require("../commons/unit.js")(React);

  var defaultClassName = "item";

  var Item = React.createClass({
    displayName: "Item",

    mixins: [ClassGenerator, TypeSelector],

    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var type = _props.type;

      var other = _objectWithoutProperties(_props, ["className", "type"]);

      return React.createElement(
        Unit,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          type: this.getType(),
          color: "null",
          value: this.props.value }),
        this.props.children
      );
    }
  });

  return Item;
};
},{"../commons/unit.js":16,"../mixins/classGenerator.js":32,"../mixins/typeSelector.js":35}],55:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui items";

  var Items = React.createClass({
    displayName: "Items",

    mixins: [ClassGenerator],

    propTypes: {
      className: React.PropTypes.string,
      type: React.PropTypes.string
    },

    render: function render() {
      var type = "";

      if (typeof this.props.type != "undefined") {
        if (this.props.type == "link") {
          type = "link";
        }
      }

      return React.createElement(
        "div",
        { className: this.getClassName(defaultClassName, type) },
        this.props.children
      );
    }
  });

  return Items;
};
},{"../mixins/classGenerator.js":32}],56:[function(require,module,exports){
"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (React) {

  var ClassGenerator = require("../mixins/classGenerator.js")(React);

  var defaultClassName = "ui statistic";

  var Statistic = React.createClass({
    displayName: "Statistic",

    mixins: [ClassGenerator],

    render: function render() {
      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ["className"]);

      return React.createElement(
        "div",
        _extends({}, other, { className: this.getClassName(defaultClassName) }),
        this.props.children
      );
    }
  });

  return Statistic;
};
},{"../mixins/classGenerator.js":32}],57:[function(require,module,exports){
function classNames() {
	var classes = '';
	var arg;

	for (var i = 0; i < arguments.length; i++) {
		arg = arguments[i];
		if (!arg) {
			continue;
		}

		if ('string' === typeof arg || 'number' === typeof arg) {
			classes += ' ' + arg;
		} else if (Object.prototype.toString.call(arg) === '[object Array]') {
			classes += ' ' + classNames.apply(null, arg);
		} else if ('object' === typeof arg) {
			for (var key in arg) {
				if (!arg.hasOwnProperty(key) || !arg[key]) {
					continue;
				}
				classes += ' ' + key;
			}
		}
	}
	return classes.substr(1);
}

// safely export classNames in case the script is included directly on a page
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}

},{}]},{},[1]);
