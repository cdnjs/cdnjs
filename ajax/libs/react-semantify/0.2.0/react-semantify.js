(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";
var React = global.React;

module.exports = global.Semantify = {
  // collections
  Breadcrumb: require('./collections/breadcrumb.jsx')(React),
  Form: require('./collections/form.jsx')(React),
  Grid: require('./collections/grid.jsx')(React),
  Menu: require('./collections/menu.jsx')(React),
  Message: require('./collections/message.jsx')(React),
  Table: require('./collections/table.jsx')(React),

  // commons
  Column: require('./commons/column.jsx')(React),
  Content: require('./commons/content.jsx')(React),
  Field: require('./commons/field.jsx')(React),
  Fields: require('./commons/fields.jsx')(React),
  Row: require('./commons/row.jsx')(React),
  Section: require('./commons/section.jsx')(React),
  Text: require('./commons/text.jsx')(React),
  Title: require('./commons/title.jsx')(React),

  // elements
  Button: require('./elements/button.jsx')(React),
  Divider: require('./elements/divider.jsx')(React),
  Flag: require('./elements/flag.jsx')(React),
  Header: require('./elements/header.jsx')(React),
  Icon: require('./elements/icon.jsx')(React),
  Image: require('./elements/image.jsx')(React),
  Input: require('./elements/input.jsx')(React),
  Label: require('./elements/label.jsx')(React),
  List: require('./elements/list.jsx')(React),
  Loader: require('./elements/loader.jsx')(React),
  Rail: require('./elements/rail.jsx')(React),
  Reveal: require('./elements/reveal.jsx')(React),
  Segment: require('./elements/segment.jsx')(React),
  Step: require('./elements/step.jsx')(React),
  Steps: require('./elements/steps.jsx')(React),

  // modules
  Accordion: require('./modules/accordion.jsx')(React),
  Checkbox: require('./modules/checkbox.jsx')(React),
  Dimmer: require('./modules/dimmer.jsx')(React),
  Dropdown: require('./modules/dropdown.jsx')(React),
  Modal: require('./modules/modal.jsx')(React),
  Popup: require('./modules/popup.jsx')(React),
  Progress: require('./modules/progress.jsx')(React),
  Rating: require('./modules/rating.jsx')(React),
  Search: require('./modules/search.jsx')(React),
  Shape: require('./modules/shape.jsx')(React),
  Sidebar: require('./modules/sidebar.jsx')(React),
  Sticky: require('./modules/sticky.jsx')(React),
  Tab: require('./modules/tab.jsx')(React),

  // views
  Ad: require('./views/advertisement.jsx')(React),
  Card: require('./views/card.jsx')(React),
  Comment: require('./views/comment.jsx')(React),
  Comments: require('./views/comments.jsx')(React),
  Feed: require('./views/feed.jsx')(React),
  Item: require('./views/item.jsx')(React),
  Items: require('./views/items.jsx')(React),
  Statistic: require('./views/statistic.jsx')(React)
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./collections/breadcrumb.jsx":2,"./collections/form.jsx":3,"./collections/grid.jsx":4,"./collections/menu.jsx":5,"./collections/message.jsx":6,"./collections/table.jsx":7,"./commons/column.jsx":8,"./commons/content.jsx":9,"./commons/field.jsx":10,"./commons/fields.jsx":11,"./commons/row.jsx":12,"./commons/section.jsx":13,"./commons/text.jsx":14,"./commons/title.jsx":15,"./elements/button.jsx":17,"./elements/divider.jsx":18,"./elements/flag.jsx":19,"./elements/header.jsx":20,"./elements/icon.jsx":21,"./elements/image.jsx":22,"./elements/input.jsx":23,"./elements/label.jsx":24,"./elements/list.jsx":25,"./elements/loader.jsx":26,"./elements/rail.jsx":27,"./elements/reveal.jsx":28,"./elements/segment.jsx":29,"./elements/step.jsx":30,"./elements/steps.jsx":31,"./modules/accordion.jsx":36,"./modules/checkbox.jsx":37,"./modules/dimmer.jsx":38,"./modules/dropdown.jsx":39,"./modules/modal.jsx":40,"./modules/popup.jsx":41,"./modules/progress.jsx":42,"./modules/rating.jsx":43,"./modules/search.jsx":44,"./modules/shape.jsx":45,"./modules/sidebar.jsx":46,"./modules/sticky.jsx":47,"./modules/tab.jsx":48,"./views/advertisement.jsx":49,"./views/card.jsx":50,"./views/comment.jsx":51,"./views/comments.jsx":52,"./views/feed.jsx":53,"./views/item.jsx":54,"./views/items.jsx":55,"./views/statistic.jsx":56}],2:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui breadcrumb';

  var Breadcrumb = React.createClass({displayName: "Breadcrumb",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Breadcrumb;
}

},{"../mixins/classGenerator.js":32}],3:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui form';

  var Form = React.createClass({displayName: "Form",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Form;
}

},{"../mixins/classGenerator.js":32}],4:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui grid';

  var Grid = React.createClass({displayName: "Grid",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Grid;
}

},{"../mixins/classGenerator.js":32}],5:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui menu';

  var Menu = React.createClass({displayName: "Menu",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Menu;
}

},{"../mixins/classGenerator.js":32}],6:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui message';

  var Message = React.createClass({displayName: "Message",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Message;
}

},{"../mixins/classGenerator.js":32}],7:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui table';

  var Table = React.createClass({displayName: "Table",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("table", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Table;
}

},{"../mixins/classGenerator.js":32}],8:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'column';

  var Column = React.createClass({displayName: "Column",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Column;
}

},{"../mixins/classGenerator.js":32}],9:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'content';

  var Content = React.createClass({displayName: "Content",

    mixins: [ClassGenerator, StateSelector],

    render: function () {

      var $__0=      this.props,className=$__0.className,type=$__0.type,color=$__0.color,active=$__0.active,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,type:1,color:1,active:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: "div", 
          color: "null", 
          active: this.getActive()}), 
          this.props.children
        )
      );
    }
  });

  return Content;
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],10:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'field';

  var Field = React.createClass({displayName: "Field",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Field;
}

},{"../mixins/classGenerator.js":32}],11:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'fields';

  var Fields = React.createClass({displayName: "Fields",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Fields;
}

},{"../mixins/classGenerator.js":32}],12:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'row';

  var Row = React.createClass({displayName: "Row",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Row;
}

},{"../mixins/classGenerator.js":32}],13:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var ColorSelector  = require('../mixins/colorSelector.js')(React);
  var TypeSelector   = require('../mixins/typeSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'section';

  var Section = React.createClass({displayName: "Section",

    mixins: [ClassGenerator, ColorSelector, TypeSelector],

    render: function () {

      var $__0=    this.props,className=$__0.className,color=$__0.color,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,color:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: this.getType(), 
          color: this.getColor()}), 
          this.props.children
        )
      );
    }
  });

  return Section;
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/colorSelector.js":33,"../mixins/typeSelector.js":35}],14:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'text';

  var Text = React.createClass({displayName: "Text",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Text;
}

},{"../mixins/classGenerator.js":32}],15:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'title';

  var Title = React.createClass({displayName: "Title",

    mixins: [ClassGenerator, StateSelector],

    render: function () {

      var $__0=      this.props,className=$__0.className,type=$__0.type,color=$__0.color,active=$__0.active,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,type:1,color:1,active:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: "div", 
          color: "null", 
          active: this.getActive()}), 
          this.props.children
        )
      );
    }
  });

  return Title;
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],16:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var classSet = React.addons.classSet;

  var Unit = React.createClass({displayName: "Unit",

    propTypes: {
      className: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired,
      onClick: React.PropTypes.func
    },

    render: function () {

      var $__0=
            
          
        
        this.props,className=$__0.className,type=$__0.type,color=$__0.color,onClick=$__0.onClick,value=$__0.value,disabled=$__0.disabled,active=$__0.active,loading=$__0.loading,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,type:1,color:1,onClick:1,value:1,disabled:1,active:1,loading:1});

      switch (type) {

        case 'link':
          return (
            React.createElement("a", React.__spread({},  other, 
              {className: this._generateClassName(), 
              onClick: this._onClick, 
              "data-value": value}), 
              this.props.children
            )
          );

        case 'icon':
          return (
            React.createElement("i", React.__spread({},  other, 
              {className: this._generateClassName(), 
              onClick: this._onClick, 
              "data-value": value}), 
              this.props.children
            )
          );

        case 'img':
          return (
            React.createElement("img", React.__spread({},  other, 
              {className: this._generateClassName(), 
              onClick: this._onClick}), 
              this.props.children
            )
          );

        case 'div':
        default:
          return (
            React.createElement("div", React.__spread({},  other, 
              {className: this._generateClassName(), 
              onClick: this._onClick, 
              "data-value": value}), 
              this.props.children
            )
          );
      }
    },

    _generateClassName: function () {
      var className = this.props.className;

      if (this.props.color != 'null') {
        className += ' ' + this.props.color;
      }

      className += ' ' + classSet({
        'disabled': this.props.disabled,
        'active': this.props.active,
        'loading': this.props.loading,
        'focus': this.props.focus,
        'error': this.props.error,
        'completed': this.props.completed,
        'read-only': this.props.readOnly
      });

      return className;
    },

    _onClick: function () {
      if (typeof this.props.onClick != 'undefined') {
        this.props.onClick();
      }
    }
  });

  return Unit;
}

},{}],17:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var ColorSelector  = require('../mixins/colorSelector.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui button';

  var Button = React.createClass({displayName: "Button",

    mixins: [ClassGenerator, ColorSelector, StateSelector],

    render: function () {

      var $__0=       this.props,className=$__0.className,color=$__0.color,disabled=$__0.disabled,active=$__0.active,loading=$__0.loading,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,color:1,disabled:1,active:1,loading:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: "div", 
          color: this.getColor(), 
          disabled: this.getDisabled(), 
          active: this.getActive(), 
          loading: this.getLoading()}), 
          this.props.children
        )
      );
    }
  });

  return Button;
}


},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/colorSelector.js":33,"../mixins/stateSelector.js":34}],18:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui divider';

  var Divider = React.createClass({displayName: "Divider",

    mixins: [ClassGenerator],

    render: function () {
      return (
        React.createElement("div", {className: this.getClassName(defaultClassName)}, 
          this.props.children
        )
      );
    }
  });

  return Divider;
}

},{"../mixins/classGenerator.js":32}],19:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'flag';

  var Flag = React.createClass({displayName: "Flag",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=     this.props,className=$__0.className,type=$__0.type,color=$__0.color,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,type:1,color:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: "icon", 
          color: "null"})
        )
      );
    }
  });

  return Flag;
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32}],20:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var ColorSelector  = require('../mixins/colorSelector.js')(React);
  var TypeSelector   = require('../mixins/typeSelector.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui header';

  var Header = React.createClass({displayName: "Header",

    mixins: [ClassGenerator, ColorSelector, TypeSelector, StateSelector],

    render: function () {

      var $__0=     this.props,className=$__0.className,type=$__0.type,color=$__0.color,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,type:1,color:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: this.getType(), 
          color: this.getColor(), 
          disabled: this.getDisabled()}), 
          this.props.children
        )
      );
    }
  });

  return Header;
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/colorSelector.js":33,"../mixins/stateSelector.js":34,"../mixins/typeSelector.js":35}],21:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var ColorSelector  = require('../mixins/colorSelector.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'icon';

  var Icon = React.createClass({displayName: "Icon",

    mixins: [ClassGenerator, ColorSelector, StateSelector],

    render: function () {

      var $__0=    this.props,className=$__0.className,color=$__0.color,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,color:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: "icon", 
          color: this.getColor(), 
          disabled: this.getDisabled(), 
          loading: this.getLoading()})
        )
      );
    }
  });

  return Icon;
}


},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/colorSelector.js":33,"../mixins/stateSelector.js":34}],22:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui image';

  var Image = React.createClass({displayName: "Image",

    mixins: [ClassGenerator, StateSelector],

    render: function () {

      var $__0=     this.props,className=$__0.className,type=$__0.type,disabled=$__0.disabled,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,type:1,disabled:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: "img", 
          color: "null", 
          disabled: this.getDisabled()}), 
          this.props.children
        )
      );
    }
  });

  return Image;
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],23:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui input';

  var Input = React.createClass({displayName: "Input",

    mixins: [ClassGenerator, StateSelector],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      if (typeof this.props.children != 'undefined') {
        return (
          React.createElement(Unit, React.__spread({},  other, 
            {className: this.getClassName(defaultClassName), 
            type: "div", 
            color: "null", 
            loading: this.getLoading(), 
            focus: this.getFocus(), 
            error: this.getError()}), 
            this.props.children
          )
        );
      } else {
        return (
          React.createElement(Unit, {
            className: this.getClassName(defaultClassName), 
            type: "div", 
            color: "null", 
            loading: this.getLoading(), 
            focus: this.getFocus(), 
            error: this.getError()}, 
            React.createElement("input", React.__spread({},  other, 
              {placeholder: this.props.placeholder, 
              type: this.props.type}))
          )
        )
      }

    }
  });

  return Input;
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],24:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var ColorSelector  = require('../mixins/colorSelector.js')(React);
  var TypeSelector   = require('../mixins/typeSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui label';

  var Label = React.createClass({displayName: "Label",

    mixins: [ClassGenerator, ColorSelector, TypeSelector],

    render: function () {

      var $__0=     this.props,className=$__0.className,type=$__0.type,color=$__0.color,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,type:1,color:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: this.getType(), 
          color: this.getColor()}), 
          this.props.children
        )
      );
    }
  });

  return Label;
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/colorSelector.js":33,"../mixins/typeSelector.js":35}],25:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui list';

  var List = React.createClass({displayName: "List",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return List;
}

},{"../mixins/classGenerator.js":32}],26:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui loader';

  var Loader = React.createClass({displayName: "Loader",

    mixins: [ClassGenerator, StateSelector],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: "div", 
          color: "null", 
          disabled: this.getDisabled(), 
          active: this.getActive()}), 
          this.props.children
        )
      );
    }
  });

  return Loader;
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],27:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui rail';

  var Rail = React.createClass({displayName: "Rail",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Rail;
}

},{"../mixins/classGenerator.js":32}],28:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui reveal';

  var Reveal = React.createClass({displayName: "Reveal",

    mixins: [ClassGenerator, StateSelector],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: "div", 
          color: "null", 
          disabled: this.getDisabled()}), 
          this.props.children
        )
      );
    }
  });

  return Reveal;
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],29:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var ColorSelector = require('../mixins/colorSelector.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui segment';

  var Segment = React.createClass({displayName: "Segment",

    mixins: [ClassGenerator, ColorSelector, StateSelector],

    render: function () {

      var $__0=    this.props,className=$__0.className,color=$__0.color,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,color:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: "div", 
          color: this.getColor(), 
          disabled: this.getDisabled(), 
          loading: this.getLoading()})
        )
      );
    }
  });

  return Segment;
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/colorSelector.js":33,"../mixins/stateSelector.js":34}],30:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit = require('../commons/unit.jsx')(React);

  var defaultClassName = 'step';

  var Step = React.createClass({displayName: "Step",

    mixins: [ClassGenerator, StateSelector],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: "div", 
          color: "null", 
          active: this.getActive(), 
          completed: this.getCompleted(), 
          disabled: this.getDisabled()}), 
          this.props.children
        )
      );
    }
  });

  return Step;
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],31:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui steps';

  var Steps = React.createClass({displayName: "Steps",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Steps;
}

},{"../mixins/classGenerator.js":32}],32:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var classSet = React.addons.classSet;

  var ClassGenerator = {

    propTypes: {
      className: React.PropTypes.string
    },

    getClassName: function (defaultClassName, addClassName) {
      var classResult = defaultClassName;

      if (typeof this.props.className != 'undefined') {
        classResult += ' ' + this.props.className;
      }

      if (typeof addClassName != 'undefined') {
        if (typeof addClassName === 'object') {
          classResult += ' ' + classSet(addClassName);
        } else {
          classResult += ' ' + addClassName;
        }
      }

      return classResult;
    }
  }

  return ClassGenerator;
}

},{}],33:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var colorArray = [
    'black', 'yellow', 'green', 'blue',
    'orange', 'purple', 'red', 'teal'];

  var ColorSelector = {

    propTypes: {
      color: React.PropTypes.oneOf(colorArray)
    },

    getColor: function () {
      var color = 'null';

      if (typeof this.props.color != 'undefined') {

        if (colorArray.indexOf(this.props.color) != -1) {
          color = this.props.color;
        }
      }

      return color;
    }
  }

  return ColorSelector;
}

},{}],34:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var classSet = React.addons.classSet;

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

    getDisabled: function () {
      var disabled = false;

      if (typeof this.props.disabled != 'undefined') {
        disabled = this.props.disabled;
      }

      return disabled;
    },

    getActive: function () {
      var active = false;

      if (typeof this.props.active != 'undefined') {
        active = this.props.active;
      }

      return active;
    },

    getLoading: function () {
      var loading = false;

      if (typeof this.props.loading != 'undefined') {
        loading = this.props.loading;
      }

      return loading;
    },

    getFocus: function () {
      var focus = false;

      if (typeof this.props.focus != 'undefined') {
        focus = this.props.focus;
      }

      return focus;
    },

    getError: function () {
      var error = false;

      if (typeof this.props.error != 'undefined') {
        error = this.props.error;
      }

      return error;
    },

    getCompleted: function () {
      var completed = false;

      if (typeof this.props.completed != 'undefined') {
        completed = this.props.completed;
      }

      return completed;
    },

    getReadOnly: function () {
      var readOnly = false;

      if (typeof this.props.readOnly != 'undefined') {
        readOnly = this.props.readOnly;
      }

      return readOnly;
    },

    getSuccess: function () {
      var success = false;

      if (typeof this.props.success != 'undefined') {
        success = this.props.success;
      }

      return success;
    },

    getWarning: function () {
      var warning = false;

      if (typeof this.props.warning != 'undefined') {
        warning = this.props.warning;
      }

      return warning;
    }
  };

  return StateSelector;
}

},{}],35:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var classSet = React.addons.classSet;

  var typeArray = ['div', 'link', 'icon'];

  var TypeSelector = {

    propTypes: {
      type: React.PropTypes.oneOf(typeArray)
    },

    getType: function () {
      var type = 'div';

      if (typeof this.props.type != 'undefined') {
        if (typeArray.indexOf(this.props.type) != -1) {
          type = this.props.type;
        }
      }
      return type;
    }
  }

  return TypeSelector;
}

},{}],36:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui accordion';

  var Accordion = React.createClass({displayName: "Accordion",

    mixins: [ClassGenerator],

    render: function () {
      return (
        React.createElement("div", {className: this.getClassName(defaultClassName)}, 
          this.props.children
        )
      );
    },

    componentDidMount: function () {
      if (typeof this.props.init != 'undefined') {
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
}

},{"../mixins/classGenerator.js":32}],37:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui checkbox';

  var Checkbox = React.createClass({displayName: "Checkbox",

    mixins: [ClassGenerator, StateSelector],

    render: function () {

      var $__0=       this.props,className=$__0.className,color=$__0.color,type=$__0.type,disabled=$__0.disabled,readOnly=$__0.readOnly,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,color:1,type:1,disabled:1,readOnly:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          color: "null", 
          type: "div", 
          disabled: this.getDisabled(), 
          readOnly: this.getReadOnly()}), 
          this.props.children
        )
      );
    },

    componentDidMount: function () {
      if (typeof this.props.init != 'undefined') {
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
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],38:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui dimmer';

  var Dimmer = React.createClass({displayName: "Dimmer",

    mixins: [ClassGenerator, StateSelector],

    render: function () {

      var $__0=       this.props,className=$__0.className,color=$__0.color,type=$__0.type,disabled=$__0.disabled,active=$__0.active,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,color:1,type:1,disabled:1,active:1});

      return (
        React.createElement(Unit, {
          className: this.getClassName(defaultClassName), 
          color: "null", 
          type: "div", 
          disabled: this.getDisabled(), 
          active: this.getActive()}, 
          this.props.children
        )
      );
    },

    componentDidMount: function () {
      if (typeof this.props.init != 'undefined') {
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
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],39:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui dropdown';

  var Dropdown = React.createClass({displayName: "Dropdown",

    mixins: [ClassGenerator, StateSelector],

    render: function () {

      var $__0=        this.props,className=$__0.className,color=$__0.color,type=$__0.type,error=$__0.error,disable=$__0.disable,active=$__0.active,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,color:1,type:1,error:1,disable:1,active:1});

      if (this.getActive() || this.getDisabled()) {
        defaultClassName += ' simple';
      }

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          color: "null", 
          type: "div", 
          error: this.getError(), 
          disable: this.getDisabled(), 
          active: this.getActive()}), 
          this.props.children
        )
      );
    },

    componentDidMount: function () {
      if (typeof this.props.init != 'undefined') {
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
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],40:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui modal';

  var Modal = React.createClass({displayName: "Modal",

    mixins: [ClassGenerator, StateSelector],

    render: function () {

      var $__0=      this.props,className=$__0.className,color=$__0.color,type=$__0.type,active=$__0.active,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,color:1,type:1,active:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          color: "null", 
          type: "div", 
          active: this.getActive()}), 
          this.props.children
        )
      );
    },

    componentDidMount: function () {
      if (typeof this.props.init != 'undefined') {
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
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],41:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui popup';

  var Popup = React.createClass({displayName: "Popup",

    mixins: [ClassGenerator],

    render: function () {
      return (
        React.createElement("div", {className: this.getClassName(defaultClassName)}, 
          this.props.children
        )
      );
    }
  });

  return Popup;
}

},{"../mixins/classGenerator.js":32}],42:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);

  var defaultClassName = 'ui progress';

  var Progress = React.createClass({displayName: "Progress",

    mixins: [ClassGenerator, StateSelector],

    render: function () {

      var $__0=
        
          
            
        
        this.props,className=$__0.className,percent=$__0.percent,value=$__0.value,total=$__0.total,active=$__0.active,success=$__0.success,warning=$__0.warning,error=$__0.error,disabled=$__0.disabled,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,percent:1,value:1,total:1,active:1,success:1,warning:1,error:1,disabled:1});

      var state = {
        active: this.getActive(),
        success: this.getSuccess(),
        warning: this.getWarning(),
        error: this.getError(),
        disabled: this.getDisabled()
      };

      return (
        React.createElement("div", React.__spread({},  other, 
          {className: this.getClassName(defaultClassName, state), 
          "data-percent": percent, 
          "data-value": value, 
          "data-total": total}), 
          this.props.children
        )
      );
    },

    componentDidMount: function () {
      if (typeof this.props.init != 'undefined') {
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
}

},{"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],43:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui rating';

  var Rating = React.createClass({displayName: "Rating",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=     this.props,className=$__0.className,rating=$__0.rating,maxRating=$__0.maxRating,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,rating:1,maxRating:1});

      return (
        React.createElement("div", React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          "data-rating": rating, 
          "data-max-rating": maxRating}), 
          this.props.children
        )
      );
    },

    componentDidMount: function () {
      if (typeof this.props.init != 'undefined') {
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
}

},{"../mixins/classGenerator.js":32}],44:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui search';

  var Search = React.createClass({displayName: "Search",

    mixins: [ClassGenerator, StateSelector],

    render: function () {

      var $__0=      this.props,className=$__0.className,color=$__0.color,type=$__0.type,active=$__0.active,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,color:1,type:1,active:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          color: "null", 
          type: "div", 
          loading: this.getLoading()}), 
          this.props.children
        )
      );
    },

    componentDidMount: function () {
      if (typeof this.props.init != 'undefined') {
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
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],45:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui shape';

  var Shape = React.createClass({displayName: "Shape",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    },

    componentDidMount: function () {
      if (typeof this.props.init != 'undefined') {
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
}

},{"../mixins/classGenerator.js":32}],46:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui sidebar';

  var Sidebar = React.createClass({displayName: "Sidebar",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    },

    componentDidMount: function () {
      if (typeof this.props.init != 'undefined') {
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
}

},{"../mixins/classGenerator.js":32}],47:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui sticky';

  var Sticky = React.createClass({displayName: "Sticky",

    mixins: [ClassGenerator],

    propTypes: {
      behavior: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object
      ])
    },

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    },

    componentDidMount: function () {
      if (typeof this.props.init != 'undefined') {
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
}

},{"../mixins/classGenerator.js":32}],48:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var StateSelector  = require('../mixins/stateSelector.js')(React);

  var defaultClassName = 'ui tab';

  var Tab = React.createClass({displayName: "Tab",

    mixins: [ClassGenerator, StateSelector],

    render: function () {

      var $__0=      this.props,className=$__0.className,active=$__0.active,loading=$__0.loading,tab=$__0.tab,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,active:1,loading:1,tab:1});

      var state = {
        active: this.getActive(),
        loading: this.getLoading()
      };

      return (
        React.createElement("div", React.__spread({},  other, 
          {className: this.getClassName(defaultClassName, state), 
          "data-tab": tab}), 
          this.props.children
        )
      );
    },

    componentDidMount: function () {
      if (typeof this.props.init != 'undefined') {
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
}

},{"../mixins/classGenerator.js":32,"../mixins/stateSelector.js":34}],49:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui ad';

  var Ad = React.createClass({displayName: "Ad",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Ad;
}

},{"../mixins/classGenerator.js":32}],50:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui card';

  var Card = React.createClass({displayName: "Card",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Card;
}

},{"../mixins/classGenerator.js":32}],51:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'comment';

  var Comment = React.createClass({displayName: "Comment",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Comment;
}

},{"../mixins/classGenerator.js":32}],52:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui comments';

  var Comments = React.createClass({displayName: "Comments",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Comments;
}

},{"../mixins/classGenerator.js":32}],53:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui feed';

  var Feed = React.createClass({displayName: "Feed",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Feed;
}

},{"../mixins/classGenerator.js":32}],54:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var TypeSelector   = require('../mixins/typeSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'item';

  var Item = React.createClass({displayName: "Item",

    mixins: [ClassGenerator, TypeSelector],

    render: function () {

      var $__0=    this.props,className=$__0.className,type=$__0.type,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,type:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: this.getType(), 
          color: "null", 
          value: this.props.value}), 
          this.props.children
        )
      );
    }
  });

  return Item;
}

},{"../commons/unit.jsx":16,"../mixins/classGenerator.js":32,"../mixins/typeSelector.js":35}],55:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui items';

  var Items = React.createClass({displayName: "Items",

    mixins: [ClassGenerator],

    propTypes: {
      className: React.PropTypes.string,
      type: React.PropTypes.string
    },

    render: function () {
      var type = '';

      if (typeof this.props.type != 'undefined') {
        if (this.props.type == 'link') {
          type = 'link';
        }
      }

      return (
        React.createElement("div", {className: this.getClassName(defaultClassName, type)}, 
          this.props.children
        )
      );
    }
  });

  return Items;
}

},{"../mixins/classGenerator.js":32}],56:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui statistic';

  var Statistic = React.createClass({displayName: "Statistic",

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("div", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Statistic;
}

},{"../mixins/classGenerator.js":32}]},{},[1]);
