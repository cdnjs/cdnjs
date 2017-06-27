(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";
React = global.React;

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
  Dimmer: require('./modules/dimmer.jsx')(React),
  Dropdown: require('./modules/dropdown.jsx')(React),

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
},{"./collections/breadcrumb.jsx":2,"./collections/form.jsx":3,"./collections/grid.jsx":4,"./collections/menu.jsx":5,"./collections/message.jsx":6,"./collections/table.jsx":7,"./commons/column.jsx":8,"./commons/content.jsx":9,"./commons/field.jsx":10,"./commons/fields.jsx":11,"./commons/row.jsx":12,"./commons/section.jsx":13,"./commons/text.jsx":14,"./elements/button.jsx":16,"./elements/divider.jsx":17,"./elements/flag.jsx":18,"./elements/header.jsx":19,"./elements/icon.jsx":20,"./elements/image.jsx":21,"./elements/input.jsx":22,"./elements/label.jsx":23,"./elements/list.jsx":24,"./elements/loader.jsx":25,"./elements/rail.jsx":26,"./elements/reveal.jsx":27,"./elements/segment.jsx":28,"./elements/step.jsx":29,"./elements/steps.jsx":30,"./modules/dimmer.jsx":34,"./modules/dropdown.jsx":35,"./views/advertisement.jsx":36,"./views/card.jsx":37,"./views/comment.jsx":38,"./views/comments.jsx":39,"./views/feed.jsx":40,"./views/item.jsx":41,"./views/items.jsx":42,"./views/statistic.jsx":43}],2:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui breadcrumb';

  var Breadcrumb = React.createClass({displayName: 'Breadcrumb',

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

},{"../mixins/classGenerator.js":31}],3:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui form';

  var Form = React.createClass({displayName: 'Form',

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

},{"../mixins/classGenerator.js":31}],4:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui grid';

  var Grid = React.createClass({displayName: 'Grid',

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

},{"../mixins/classGenerator.js":31}],5:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui menu';

  var Menu = React.createClass({displayName: 'Menu',

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

},{"../mixins/classGenerator.js":31}],6:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui message';

  var Message = React.createClass({displayName: 'Message',

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

},{"../mixins/classGenerator.js":31}],7:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui table';

  var Table = React.createClass({displayName: 'Table',

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

},{"../mixins/classGenerator.js":31}],8:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'column';

  var Column = React.createClass({displayName: 'Column',

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

},{"../mixins/classGenerator.js":31}],9:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'content';

  var Content = React.createClass({displayName: 'Content',

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

  return Content;
}

},{"../mixins/classGenerator.js":31}],10:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'field';

  var Field = React.createClass({displayName: 'Field',

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

},{"../mixins/classGenerator.js":31}],11:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'fields';

  var Fields = React.createClass({displayName: 'Fields',

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

},{"../mixins/classGenerator.js":31}],12:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'row';

  var Row = React.createClass({displayName: 'Row',

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

},{"../mixins/classGenerator.js":31}],13:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var ColorSelector  = require('../mixins/colorSelector.js')(React);
  var TypeSelector   = require('../mixins/typeSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'section';

  var Section = React.createClass({displayName: 'Section',

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

},{"../commons/unit.jsx":15,"../mixins/classGenerator.js":31,"../mixins/colorSelector.js":32,"../mixins/typeSelector.js":33}],14:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'text';

  var Text = React.createClass({displayName: 'Text',

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

},{"../mixins/classGenerator.js":31}],15:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var Unit = React.createClass({displayName: 'Unit',

    propTypes: {
      className: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired,
      onClick: React.PropTypes.func
    },

    render: function () {

      var $__0=       this.props,className=$__0.className,type=$__0.type,color=$__0.color,onClick=$__0.onClick,value=$__0.value,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,type:1,color:1,onClick:1,value:1});

      switch (type) {

        case 'link':
          return (
            React.createElement("a", React.__spread({},  other, 
              {className: this._generateClassName(), 
              onClick: this._onClick, 
              'data-value': value}), 
              this.props.children
            )
          );

        case 'icon':
          return (
            React.createElement("i", React.__spread({},  other, 
              {className: this._generateClassName(), 
              onClick: this._onClick, 
              'data-value': value}), 
              this.props.children
            )
          );

        case 'div':
        default:
          return (
            React.createElement("div", React.__spread({},  other, 
              {className: this._generateClassName(), 
              onClick: this._onClick, 
              'data-value': value}), 
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

},{}],16:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var ColorSelector  = require('../mixins/colorSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui button';

  var Button = React.createClass({displayName: 'Button',

    mixins: [ClassGenerator, ColorSelector],

    render: function () {

      var $__0=    this.props,className=$__0.className,color=$__0.color,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,color:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: "div", 
          color: this.getColor()}), 
          this.props.children
        )
      );
    }
  });

  return Button;
}


},{"../commons/unit.jsx":15,"../mixins/classGenerator.js":31,"../mixins/colorSelector.js":32}],17:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui divider';

  var Divider = React.createClass({displayName: 'Divider',

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

},{"../mixins/classGenerator.js":31}],18:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'flag';

  var Flag = React.createClass({displayName: 'Flag',

    mixins: [ClassGenerator],

    propTypes: {
      onClick: React.PropTypes.func
    },

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: "icon", 
          color: "null", 
          onClick: this.props.onClick})
        )
      );
    }
  });

  return Flag;
}

},{"../commons/unit.jsx":15,"../mixins/classGenerator.js":31}],19:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var ColorSelector  = require('../mixins/colorSelector.js')(React);
  var TypeSelector   = require('../mixins/typeSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui header';

  var Header = React.createClass({displayName: 'Header',

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

  return Header;
}

},{"../commons/unit.jsx":15,"../mixins/classGenerator.js":31,"../mixins/colorSelector.js":32,"../mixins/typeSelector.js":33}],20:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var ColorSelector  = require('../mixins/colorSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'icon';

  var Icon = React.createClass({displayName: 'Icon',

    mixins: [ClassGenerator, ColorSelector],

    render: function () {

      var $__0=    this.props,className=$__0.className,color=$__0.color,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,color:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: "icon", 
          color: this.getColor()})
        )
      );
    }
  });

  return Icon;
}


},{"../commons/unit.jsx":15,"../mixins/classGenerator.js":31,"../mixins/colorSelector.js":32}],21:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui image';

  var Image = React.createClass({displayName: 'Image',

    mixins: [ClassGenerator],

    render: function () {

      var $__0=   this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

      return (
        React.createElement("img", React.__spread({},  other, {className: this.getClassName(defaultClassName)}), 
          this.props.children
        )
      );
    }
  });

  return Image;
}

},{"../mixins/classGenerator.js":31}],22:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui input';

  var Input = React.createClass({displayName: 'Input',

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

  return Input;
}

},{"../mixins/classGenerator.js":31}],23:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var ColorSelector  = require('../mixins/colorSelector.js')(React);
  var TypeSelector   = require('../mixins/typeSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui label';

  var Label = React.createClass({displayName: 'Label',

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

},{"../commons/unit.jsx":15,"../mixins/classGenerator.js":31,"../mixins/colorSelector.js":32,"../mixins/typeSelector.js":33}],24:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui list';

  var List = React.createClass({displayName: 'List',

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

},{"../mixins/classGenerator.js":31}],25:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui loader';

  var Loader = React.createClass({displayName: 'Loader',

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

  return Loader;
}

},{"../mixins/classGenerator.js":31}],26:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui rail';

  var Rail = React.createClass({displayName: 'Rail',

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

},{"../mixins/classGenerator.js":31}],27:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui reveal';

  var Reveal = React.createClass({displayName: 'Reveal',

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

  return Reveal;
}

},{"../mixins/classGenerator.js":31}],28:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var ColorSelector = require('../mixins/colorSelector.js')(React);
  var Unit = require('../commons/unit.jsx')(React);

  var defaultClassName = 'ui segment';

  var Segment = React.createClass({displayName: 'Segment',

    mixins: [ClassGenerator, ColorSelector],

    render: function () {

      var $__0=    this.props,className=$__0.className,color=$__0.color,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,color:1});

      return (
        React.createElement(Unit, React.__spread({},  other, 
          {className: this.getClassName(defaultClassName), 
          type: "div", 
          color: this.getColor()})
        )
      );
    }
  });

  return Segment;
}

},{"../commons/unit.jsx":15,"../mixins/classGenerator.js":31,"../mixins/colorSelector.js":32}],29:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'step';

  var Step = React.createClass({displayName: 'Step',

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

  return Step;
}

},{"../mixins/classGenerator.js":31}],30:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui steps';

  var Steps = React.createClass({displayName: 'Steps',

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

},{"../mixins/classGenerator.js":31}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui dimmer';

  var Dimmer = React.createClass({displayName: 'Dimmer',

    mixins: [ClassGenerator],

    render: function () {
      return (
        React.createElement("div", {className: this.getClassName(defaultClassName)}, 
          this.props.children
        )
      );
    }
  });

  return Dimmer;
}

},{"../mixins/classGenerator.js":31}],35:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui dropdown';

  var Dropdown = React.createClass({displayName: 'Dropdown',

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
      $(this.getDOMNode()).dropdown();
    }
  });

  return Dropdown;
}

},{"../mixins/classGenerator.js":31}],36:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui ad';

  var Ad = React.createClass({displayName: 'Ad',

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

},{"../mixins/classGenerator.js":31}],37:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui card';

  var Card = React.createClass({displayName: 'Card',

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

},{"../mixins/classGenerator.js":31}],38:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'comment';

  var Comment = React.createClass({displayName: 'Comment',

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

},{"../mixins/classGenerator.js":31}],39:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui comments';

  var Comments = React.createClass({displayName: 'Comments',

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

},{"../mixins/classGenerator.js":31}],40:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui feed';

  var Feed = React.createClass({displayName: 'Feed',

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

},{"../mixins/classGenerator.js":31}],41:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);
  var TypeSelector   = require('../mixins/typeSelector.js')(React);
  var Unit           = require('../commons/unit.jsx')(React);

  var defaultClassName = 'item';

  var Item = React.createClass({displayName: 'Item',

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

},{"../commons/unit.jsx":15,"../mixins/classGenerator.js":31,"../mixins/typeSelector.js":33}],42:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui items';

  var Items = React.createClass({displayName: 'Items',

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

},{"../mixins/classGenerator.js":31}],43:[function(require,module,exports){
"use strict";
module.exports = function (React) {

  var ClassGenerator = require('../mixins/classGenerator.js')(React);

  var defaultClassName = 'ui statistic';

  var Statistic = React.createClass({displayName: 'Statistic',

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

},{"../mixins/classGenerator.js":31}]},{},[1]);
