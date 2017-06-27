(function() { var define = undefined; return (function outer(modules, cache, entry) {
  if (typeof Bokeh !== "undefined") {
    var _ = Bokeh._;

    for (var name in modules) {
      Bokeh.require.modules[name] = modules[name];
    }

    for (var i = 0; i < entry.length; i++) {
        var exports = Bokeh.require(entry[i]);

        if (_.isObject(exports.models)) {
          Bokeh.Models.register_locations(exports.models);
        }

        _.extend(Bokeh, _.omit(exports, "models"));
    }
  } else {
    throw new Error("Cannot find Bokeh. You have to load it prior to loading plugins.");
  }
})
({"models/widgets/abstract_button":[function(require,module,exports){
var AbstractButton, AbstractButtonView, Widget, build_views, p, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

p = require("../../core/properties");

build_views = require("../../common/build_views");

Widget = require("./widget");

template = require("./button_template");

AbstractButtonView = (function(superClass) {
  extend(AbstractButtonView, superClass);

  function AbstractButtonView() {
    return AbstractButtonView.__super__.constructor.apply(this, arguments);
  }

  AbstractButtonView.prototype.events = {
    "click": "change_input"
  };

  AbstractButtonView.prototype.template = template;

  AbstractButtonView.prototype.initialize = function(options) {
    AbstractButtonView.__super__.initialize.call(this, options);
    this.icon_views = {};
    this.listenTo(this.model, 'change', this.render);
    return this.render();
  };

  AbstractButtonView.prototype.render = function() {
    var $button, html, icon, key, ref, val;
    AbstractButtonView.__super__.render.call(this);
    icon = this.model.icon;
    if (icon != null) {
      build_views(this.icon_views, [icon]);
      ref = this.icon_views;
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        val = ref[key];
        val.$el.detach();
      }
    }
    this.$el.empty();
    html = this.template(this.model.attributes);
    this.$el.append(html);
    $button = this.$el.find('button');
    if (icon != null) {
      $button.prepend(this.icon_views[icon.id].$el);
    }
    $button.prop("disabled", this.model.disabled);
    return this;
  };

  AbstractButtonView.prototype.change_input = function() {
    var ref;
    return (ref = this.model.callback) != null ? ref.execute(this.model) : void 0;
  };

  return AbstractButtonView;

})(Widget.View);

AbstractButton = (function(superClass) {
  extend(AbstractButton, superClass);

  function AbstractButton() {
    return AbstractButton.__super__.constructor.apply(this, arguments);
  }

  AbstractButton.prototype.type = "AbstractButton";

  AbstractButton.prototype.default_view = AbstractButtonView;

  AbstractButton.define({
    callback: [p.Instance],
    label: [p.String, "Button"],
    icon: [p.Instance],
    button_type: [p.String, "default"]
  });

  return AbstractButton;

})(Widget.Model);

module.exports = {
  Model: AbstractButton,
  View: AbstractButtonView
};

},{"../../common/build_views":"common/build_views","../../core/properties":"core/properties","./button_template":"models/widgets/button_template","./widget":"models/widgets/widget"}],"models/widgets/abstract_icon":[function(require,module,exports){
var AbstractIcon, Widget, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

Widget = require("./widget");

AbstractIcon = (function(superClass) {
  extend(AbstractIcon, superClass);

  function AbstractIcon() {
    return AbstractIcon.__super__.constructor.apply(this, arguments);
  }

  AbstractIcon.prototype.type = "AbstractIcon";

  return AbstractIcon;

})(Widget.Model);

module.exports = {
  Model: AbstractIcon
};

},{"./widget":"models/widgets/widget","underscore":"underscore"}],"models/widgets/autocomplete_input":[function(require,module,exports){
var $1, AutocompleteInput, AutocompleteInputView, TextInput, _, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

$1 = require("jquery-ui/autocomplete");

TextInput = require("./text_input");

p = require("../../core/properties");

AutocompleteInputView = (function(superClass) {
  extend(AutocompleteInputView, superClass);

  function AutocompleteInputView() {
    return AutocompleteInputView.__super__.constructor.apply(this, arguments);
  }

  AutocompleteInputView.prototype.render = function() {
    var $input;
    AutocompleteInputView.__super__.render.call(this);
    $input = this.$el.find("input");
    $input.autocomplete({
      source: this.mget("completions")
    });
    $input.autocomplete("widget").addClass("bk-autocomplete-input");
    return this;
  };

  return AutocompleteInputView;

})(TextInput.View);

AutocompleteInput = (function(superClass) {
  extend(AutocompleteInput, superClass);

  function AutocompleteInput() {
    return AutocompleteInput.__super__.constructor.apply(this, arguments);
  }

  AutocompleteInput.prototype.type = "AutocompleteInput";

  AutocompleteInput.prototype.default_view = AutocompleteInputView;

  AutocompleteInput.define({
    completions: [p.Array, []]
  });

  return AutocompleteInput;

})(TextInput.Model);

module.exports = {
  View: AutocompleteInputView,
  Model: AutocompleteInput
};

},{"../../core/properties":"core/properties","./text_input":"models/widgets/text_input","jquery-ui/autocomplete":"jquery-ui/autocomplete","underscore":"underscore"}],"models/widgets/button":[function(require,module,exports){
var AbstractButton, Button, ButtonView, _, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

p = require("../../core/properties");

AbstractButton = require("./abstract_button");

ButtonView = (function(superClass) {
  extend(ButtonView, superClass);

  function ButtonView() {
    return ButtonView.__super__.constructor.apply(this, arguments);
  }

  ButtonView.prototype.change_input = function() {
    this.model.clicks = this.model.clicks + 1;
    return ButtonView.__super__.change_input.call(this);
  };

  return ButtonView;

})(AbstractButton.View);

Button = (function(superClass) {
  extend(Button, superClass);

  function Button() {
    return Button.__super__.constructor.apply(this, arguments);
  }

  Button.prototype.type = "Button";

  Button.prototype.default_view = ButtonView;

  Button.define({
    clicks: [p.Number, 0]
  });

  return Button;

})(AbstractButton.Model);

module.exports = {
  Model: Button,
  View: ButtonView
};

},{"../../core/properties":"core/properties","./abstract_button":"models/widgets/abstract_button","underscore":"underscore"}],"models/widgets/button_group_template":[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [];
  var __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  };
  var __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  };
  var __safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  var __escape = function(value) {
    return ('' + value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };
  (function() {
    (function() {
      __out.push('<div class="bk-bs-btn-group" data-bk-bs-toggle="buttons">\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  return __out.join('');
};
},{}],"models/widgets/button_template":[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [];
  var __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  };
  var __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  };
  var __safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  var __escape = function(value) {
    return ('' + value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };
  (function() {
    (function() {
      __out.push('<button type="button" class="bk-bs-btn bk-bs-btn-');
    
      __out.push(__sanitize(this.button_type));
    
      __out.push('">\n  ');
    
      __out.push(__sanitize(this.label));
    
      __out.push('\n</button>\n');
    
    }).call(this);
    
  }).call(__obj);
  return __out.join('');
};
},{}],"models/widgets/cell_editors":[function(require,module,exports){
var $, $1, $2, CellEditor, CellEditorView, CheckboxEditor, CheckboxEditorView, DateEditor, DateEditorView, IntEditor, IntEditorView, Model, NumberEditor, NumberEditorView, PercentEditor, PercentEditorView, SelectEditor, SelectEditorView, StringEditor, StringEditorView, TextEditor, TextEditorView, TimeEditor, TimeEditorView, Widget, _, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

$ = require("jquery");

$1 = require("jquery-ui/autocomplete");

$2 = require("jquery-ui/spinner");

p = require("../../core/properties");

Model = require("../../model");

Widget = require("./widget");

CellEditor = (function(superClass) {
  extend(CellEditor, superClass);

  function CellEditor() {
    return CellEditor.__super__.constructor.apply(this, arguments);
  }

  return CellEditor;

})(Model);

CellEditorView = (function(superClass) {
  extend(CellEditorView, superClass);

  function CellEditorView() {
    return CellEditorView.__super__.constructor.apply(this, arguments);
  }

  CellEditorView.prototype.tagName = "div";

  CellEditorView.prototype.className = "bk-cell-editor";

  CellEditorView.prototype.input = null;

  CellEditorView.prototype.emptyValue = null;

  CellEditorView.prototype.defaultValue = null;

  CellEditorView.prototype.initialize = function(args) {
    CellEditorView.__super__.initialize.call(this, {});
    this.args = args;
    this.model = this.args.column.editor;
    return this.render();
  };

  CellEditorView.prototype.render = function() {
    CellEditorView.__super__.render.call(this);
    this.$el.appendTo(this.args.container);
    this.$input = $(this.input);
    this.$el.append(this.$input);
    this.renderEditor();
    this.disableNavigation();
    return this;
  };

  CellEditorView.prototype.renderEditor = function() {};

  CellEditorView.prototype.disableNavigation = function() {
    return this.$input.keydown((function(_this) {
      return function(event) {
        var stop;
        stop = function() {
          return event.stopImmediatePropagation();
        };
        switch (event.keyCode) {
          case $.ui.keyCode.LEFT:
            return stop();
          case $.ui.keyCode.RIGHT:
            return stop();
          case $.ui.keyCode.UP:
            return stop();
          case $.ui.keyCode.DOWN:
            return stop();
          case $.ui.keyCode.PAGE_UP:
            return stop();
          case $.ui.keyCode.PAGE_DOWN:
            return stop();
        }
      };
    })(this));
  };

  CellEditorView.prototype.destroy = function() {
    return this.remove();
  };

  CellEditorView.prototype.focus = function() {
    return this.$input.focus();
  };

  CellEditorView.prototype.show = function() {};

  CellEditorView.prototype.hide = function() {};

  CellEditorView.prototype.position = function() {};

  CellEditorView.prototype.getValue = function() {
    return this.$input.val();
  };

  CellEditorView.prototype.setValue = function(val) {
    return this.$input.val(val);
  };

  CellEditorView.prototype.serializeValue = function() {
    return this.getValue();
  };

  CellEditorView.prototype.isValueChanged = function() {
    return !(this.getValue() === "" && (this.defaultValue == null)) && (this.getValue() !== this.defaultValue);
  };

  CellEditorView.prototype.applyValue = function(item, state) {
    return this.args.grid.getData().setField(item.index, this.args.column.field, state);
  };

  CellEditorView.prototype.loadValue = function(item) {
    var value;
    value = item[this.args.column.field];
    this.defaultValue = value != null ? value : this.emptyValue;
    return this.setValue(this.defaultValue);
  };

  CellEditorView.prototype.validateValue = function(value) {
    var result;
    if (this.args.column.validator) {
      result = this.args.column.validator(value);
      if (!result.valid) {
        return result;
      }
    }
    return {
      valid: true,
      msg: null
    };
  };

  CellEditorView.prototype.validate = function() {
    return this.validateValue(this.getValue());
  };

  return CellEditorView;

})(Widget.View);

StringEditorView = (function(superClass) {
  extend(StringEditorView, superClass);

  function StringEditorView() {
    return StringEditorView.__super__.constructor.apply(this, arguments);
  }

  StringEditorView.prototype.emptyValue = "";

  StringEditorView.prototype.input = '<input type="text" />';

  StringEditorView.prototype.renderEditor = function() {
    var completions;
    completions = this.model.get("completions");
    if (!_.isEmpty(completions)) {
      this.$input.autocomplete({
        source: completions
      });
      this.$input.autocomplete("widget").addClass("bk-cell-editor-completion");
    }
    return this.$input.focus().select();
  };

  StringEditorView.prototype.loadValue = function(item) {
    StringEditorView.__super__.loadValue.call(this, item);
    this.$input[0].defaultValue = this.defaultValue;
    return this.$input.select();
  };

  return StringEditorView;

})(CellEditorView);

StringEditor = (function(superClass) {
  extend(StringEditor, superClass);

  function StringEditor() {
    return StringEditor.__super__.constructor.apply(this, arguments);
  }

  StringEditor.prototype.type = 'StringEditor';

  StringEditor.prototype.default_view = StringEditorView;

  StringEditor.define({
    completions: [p.Array, []]
  });

  return StringEditor;

})(CellEditor);

TextEditorView = (function(superClass) {
  extend(TextEditorView, superClass);

  function TextEditorView() {
    return TextEditorView.__super__.constructor.apply(this, arguments);
  }

  return TextEditorView;

})(CellEditorView);

TextEditor = (function(superClass) {
  extend(TextEditor, superClass);

  function TextEditor() {
    return TextEditor.__super__.constructor.apply(this, arguments);
  }

  TextEditor.prototype.type = 'TextEditor';

  TextEditor.prototype.default_view = TextEditorView;

  return TextEditor;

})(CellEditor);

SelectEditorView = (function(superClass) {
  extend(SelectEditorView, superClass);

  function SelectEditorView() {
    return SelectEditorView.__super__.constructor.apply(this, arguments);
  }

  SelectEditorView.prototype.input = '<select />';

  SelectEditorView.prototype.renderEditor = function() {
    var i, len, option, ref;
    ref = this.model.get("options");
    for (i = 0, len = ref.length; i < len; i++) {
      option = ref[i];
      this.$input.append($('<option>').attr({
        value: option
      }).text(option));
    }
    return this.focus();
  };

  SelectEditorView.prototype.loadValue = function(item) {
    SelectEditorView.__super__.loadValue.call(this, item);
    return this.$input.select();
  };

  return SelectEditorView;

})(CellEditorView);

SelectEditor = (function(superClass) {
  extend(SelectEditor, superClass);

  function SelectEditor() {
    return SelectEditor.__super__.constructor.apply(this, arguments);
  }

  SelectEditor.prototype.type = 'SelectEditor';

  SelectEditor.prototype.default_view = SelectEditorView;

  SelectEditor.define({
    options: [p.Array, []]
  });

  return SelectEditor;

})(CellEditor);

PercentEditorView = (function(superClass) {
  extend(PercentEditorView, superClass);

  function PercentEditorView() {
    return PercentEditorView.__super__.constructor.apply(this, arguments);
  }

  return PercentEditorView;

})(CellEditorView);

PercentEditor = (function(superClass) {
  extend(PercentEditor, superClass);

  function PercentEditor() {
    return PercentEditor.__super__.constructor.apply(this, arguments);
  }

  PercentEditor.prototype.type = 'PercentEditor';

  PercentEditor.prototype.default_view = PercentEditorView;

  return PercentEditor;

})(CellEditor);

CheckboxEditorView = (function(superClass) {
  extend(CheckboxEditorView, superClass);

  function CheckboxEditorView() {
    return CheckboxEditorView.__super__.constructor.apply(this, arguments);
  }

  CheckboxEditorView.prototype.input = '<input type="checkbox" value="true" />';

  CheckboxEditorView.prototype.renderEditor = function() {
    return this.focus();
  };

  CheckboxEditorView.prototype.loadValue = function(item) {
    this.defaultValue = !!item[this.args.column.field];
    return this.$input.prop('checked', this.defaultValue);
  };

  CheckboxEditorView.prototype.serializeValue = function() {
    return this.$input.prop('checked');
  };

  return CheckboxEditorView;

})(CellEditorView);

CheckboxEditor = (function(superClass) {
  extend(CheckboxEditor, superClass);

  function CheckboxEditor() {
    return CheckboxEditor.__super__.constructor.apply(this, arguments);
  }

  CheckboxEditor.prototype.type = 'CheckboxEditor';

  CheckboxEditor.prototype.default_view = CheckboxEditorView;

  return CheckboxEditor;

})(CellEditor);

IntEditorView = (function(superClass) {
  extend(IntEditorView, superClass);

  function IntEditorView() {
    return IntEditorView.__super__.constructor.apply(this, arguments);
  }

  IntEditorView.prototype.input = '<input type="text" />';

  IntEditorView.prototype.renderEditor = function() {
    this.$input.spinner({
      step: this.model.get("step")
    });
    return this.$input.focus().select();
  };

  IntEditorView.prototype.remove = function() {
    this.$input.spinner("destroy");
    return IntEditorView.__super__.remove.call(this);
  };

  IntEditorView.prototype.serializeValue = function() {
    return parseInt(this.getValue(), 10) || 0;
  };

  IntEditorView.prototype.loadValue = function(item) {
    IntEditorView.__super__.loadValue.call(this, item);
    this.$input[0].defaultValue = this.defaultValue;
    return this.$input.select();
  };

  IntEditorView.prototype.validateValue = function(value) {
    if (isNaN(value)) {
      return {
        valid: false,
        msg: "Please enter a valid integer"
      };
    } else {
      return IntEditorView.__super__.validateValue.call(this, value);
    }
  };

  return IntEditorView;

})(CellEditorView);

IntEditor = (function(superClass) {
  extend(IntEditor, superClass);

  function IntEditor() {
    return IntEditor.__super__.constructor.apply(this, arguments);
  }

  IntEditor.prototype.type = 'IntEditor';

  IntEditor.prototype.default_view = IntEditorView;

  IntEditor.define({
    step: [p.Number, 1]
  });

  return IntEditor;

})(CellEditor);

NumberEditorView = (function(superClass) {
  extend(NumberEditorView, superClass);

  function NumberEditorView() {
    return NumberEditorView.__super__.constructor.apply(this, arguments);
  }

  NumberEditorView.prototype.input = '<input type="text" />';

  NumberEditorView.prototype.renderEditor = function() {
    this.$input.spinner({
      step: this.model.get("step")
    });
    return this.$input.focus().select();
  };

  NumberEditorView.prototype.remove = function() {
    this.$input.spinner("destroy");
    return NumberEditorView.__super__.remove.call(this);
  };

  NumberEditorView.prototype.serializeValue = function() {
    return parseFloat(this.getValue()) || 0.0;
  };

  NumberEditorView.prototype.loadValue = function(item) {
    NumberEditorView.__super__.loadValue.call(this, item);
    this.$input[0].defaultValue = this.defaultValue;
    return this.$input.select();
  };

  NumberEditorView.prototype.validateValue = function(value) {
    if (isNaN(value)) {
      return {
        valid: false,
        msg: "Please enter a valid number"
      };
    } else {
      return NumberEditorView.__super__.validateValue.call(this, value);
    }
  };

  return NumberEditorView;

})(CellEditorView);

NumberEditor = (function(superClass) {
  extend(NumberEditor, superClass);

  function NumberEditor() {
    return NumberEditor.__super__.constructor.apply(this, arguments);
  }

  NumberEditor.prototype.type = 'NumberEditor';

  NumberEditor.prototype.default_view = NumberEditorView;

  NumberEditor.define({
    step: [p.Number, 0.01]
  });

  return NumberEditor;

})(CellEditor);

TimeEditorView = (function(superClass) {
  extend(TimeEditorView, superClass);

  function TimeEditorView() {
    return TimeEditorView.__super__.constructor.apply(this, arguments);
  }

  return TimeEditorView;

})(CellEditorView);

TimeEditor = (function(superClass) {
  extend(TimeEditor, superClass);

  function TimeEditor() {
    return TimeEditor.__super__.constructor.apply(this, arguments);
  }

  TimeEditor.prototype.type = 'TimeEditor';

  TimeEditor.prototype.default_view = TimeEditorView;

  return TimeEditor;

})(CellEditor);

DateEditorView = (function(superClass) {
  extend(DateEditorView, superClass);

  function DateEditorView() {
    return DateEditorView.__super__.constructor.apply(this, arguments);
  }

  DateEditorView.prototype.emptyValue = new Date();

  DateEditorView.prototype.input = '<input type="text" />';

  DateEditorView.prototype.renderEditor = function() {
    this.calendarOpen = false;
    this.$input.datepicker({
      showOn: "button",
      buttonImageOnly: true,
      beforeShow: (function(_this) {
        return function() {
          return _this.calendarOpen = true;
        };
      })(this),
      onClose: (function(_this) {
        return function() {
          return _this.calendarOpen = false;
        };
      })(this)
    });
    this.$input.siblings(".bk-ui-datepicker-trigger").css({
      "vertical-align": "middle"
    });
    this.$input.width(this.$input.width() - (14 + 2 * 4 + 4));
    return this.$input.focus().select();
  };

  DateEditorView.prototype.destroy = function() {
    $.datepicker.dpDiv.stop(true, true);
    this.$input.datepicker("hide");
    this.$input.datepicker("destroy");
    return DateEditorView.__super__.destroy.call(this);
  };

  DateEditorView.prototype.show = function() {
    if (this.calendarOpen) {
      $.datepicker.dpDiv.stop(true, true).show();
    }
    return DateEditorView.__super__.show.call(this);
  };

  DateEditorView.prototype.hide = function() {
    if (this.calendarOpen) {
      $.datepicker.dpDiv.stop(true, true).hide();
    }
    return DateEditorView.__super__.hide.call(this);
  };

  DateEditorView.prototype.position = function(position) {
    if (this.calendarOpen) {
      $.datepicker.dpDiv.css({
        top: position.top + 30,
        left: position.left
      });
    }
    return DateEditorView.__super__.position.call(this);
  };

  DateEditorView.prototype.getValue = function() {
    return this.$input.datepicker("getDate").getTime();
  };

  DateEditorView.prototype.setValue = function(val) {
    return this.$input.datepicker("setDate", new Date(val));
  };

  return DateEditorView;

})(CellEditorView);

DateEditor = (function(superClass) {
  extend(DateEditor, superClass);

  function DateEditor() {
    return DateEditor.__super__.constructor.apply(this, arguments);
  }

  DateEditor.prototype.type = 'DateEditor';

  DateEditor.prototype.default_view = DateEditorView;

  return DateEditor;

})(CellEditor);

module.exports = {
  String: {
    Model: StringEditor,
    View: StringEditorView
  },
  Text: {
    Model: TextEditor,
    View: TextEditorView
  },
  Select: {
    Model: SelectEditor,
    View: SelectEditorView
  },
  Percent: {
    Model: PercentEditor,
    View: PercentEditorView
  },
  Checkbox: {
    Model: CheckboxEditor,
    View: CheckboxEditorView
  },
  Int: {
    Model: IntEditor,
    View: IntEditorView
  },
  Number: {
    Model: NumberEditor,
    View: NumberEditorView
  },
  Time: {
    Model: TimeEditor,
    View: TimeEditorView
  },
  Date: {
    Model: DateEditor,
    View: DateEditorView
  }
};

},{"../../core/properties":"core/properties","../../model":"model","./widget":"models/widgets/widget","jquery":"jquery","jquery-ui/autocomplete":"jquery-ui/autocomplete","jquery-ui/spinner":"jquery-ui/spinner","underscore":"underscore"}],"models/widgets/cell_formatters":[function(require,module,exports){
var $, BooleanFormatter, CellFormatter, DateFormatter, HTMLTemplateFormatter, Model, NumberFormatter, Numbro, StringFormatter, _, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

$ = require("jquery");

Numbro = require("numbro");

p = require("../../core/properties");

Model = require("../../model");

CellFormatter = (function(superClass) {
  extend(CellFormatter, superClass);

  function CellFormatter() {
    return CellFormatter.__super__.constructor.apply(this, arguments);
  }

  CellFormatter.prototype.doFormat = function(row, cell, value, columnDef, dataContext) {
    if (value === null) {
      return "";
    } else {
      return (value + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  };

  return CellFormatter;

})(Model);

StringFormatter = (function(superClass) {
  extend(StringFormatter, superClass);

  function StringFormatter() {
    return StringFormatter.__super__.constructor.apply(this, arguments);
  }

  StringFormatter.prototype.type = 'StringFormatter';

  StringFormatter.define({
    font_style: [p.FontStyle, "normal"],
    text_align: [p.TextAlign, "left"],
    text_color: [p.Color]
  });

  StringFormatter.prototype.doFormat = function(row, cell, value, columnDef, dataContext) {
    var font_style, text, text_align, text_color;
    text = StringFormatter.__super__.doFormat.call(this, row, cell, value, columnDef, dataContext);
    font_style = this.get("font_style");
    text_align = this.get("text_align");
    text_color = this.get("text_color");
    if ((font_style != null) || (text_align != null) || (text_color != null)) {
      text = $("<span>" + text + "</span>");
      switch (font_style) {
        case "bold":
          text = text.css("font-weight", "bold");
          break;
        case "italic":
          text = text.css("font-style", "italic");
      }
      if (text_align != null) {
        text = text.css("text-align", text_align);
      }
      if (text_color != null) {
        text = text.css("color", text_color);
      }
      text = text.prop('outerHTML');
    }
    return text;
  };

  return StringFormatter;

})(CellFormatter);

NumberFormatter = (function(superClass) {
  extend(NumberFormatter, superClass);

  function NumberFormatter() {
    return NumberFormatter.__super__.constructor.apply(this, arguments);
  }

  NumberFormatter.prototype.type = 'NumberFormatter';

  NumberFormatter.define({
    format: [p.String, '0,0'],
    language: [p.String, 'en'],
    rounding: [p.String, 'round']
  });

  NumberFormatter.prototype.doFormat = function(row, cell, value, columnDef, dataContext) {
    var format, language, rounding;
    format = this.get("format");
    language = this.get("language");
    rounding = (function() {
      switch (this.get("rounding")) {
        case "round":
        case "nearest":
          return Math.round;
        case "floor":
        case "rounddown":
          return Math.floor;
        case "ceil":
        case "roundup":
          return Math.ceil;
      }
    }).call(this);
    value = Numbro.format(value, format, language, rounding);
    return NumberFormatter.__super__.doFormat.call(this, row, cell, value, columnDef, dataContext);
  };

  return NumberFormatter;

})(StringFormatter);

BooleanFormatter = (function(superClass) {
  extend(BooleanFormatter, superClass);

  function BooleanFormatter() {
    return BooleanFormatter.__super__.constructor.apply(this, arguments);
  }

  BooleanFormatter.prototype.type = 'BooleanFormatter';

  BooleanFormatter.define({
    icon: [p.String, 'check']
  });

  BooleanFormatter.prototype.doFormat = function(row, cell, value, columnDef, dataContext) {
    if (!!value) {
      return $('<i>').addClass(this.get("icon")).html();
    } else {
      return "";
    }
  };

  return BooleanFormatter;

})(CellFormatter);

DateFormatter = (function(superClass) {
  extend(DateFormatter, superClass);

  function DateFormatter() {
    return DateFormatter.__super__.constructor.apply(this, arguments);
  }

  DateFormatter.prototype.type = 'DateFormatter';

  DateFormatter.define({
    format: [p.String, 'yy M d']
  });

  DateFormatter.prototype.getFormat = function() {
    var format, name;
    format = this.get("format");
    name = (function() {
      switch (format) {
        case "ATOM":
        case "W3C":
        case "RFC-3339":
        case "ISO-8601":
          return "ISO-8601";
        case "COOKIE":
          return "COOKIE";
        case "RFC-850":
          return "RFC-850";
        case "RFC-1036":
          return "RFC-1036";
        case "RFC-1123":
          return "RFC-1123";
        case "RFC-2822":
          return "RFC-2822";
        case "RSS":
        case "RFC-822":
          return "RFC-822";
        case "TICKS":
          return "TICKS";
        case "TIMESTAMP":
          return "TIMESTAMP";
        default:
          return null;
      }
    })();
    if (name != null) {
      return $.datepicker[name];
    } else {
      return format;
    }
  };

  DateFormatter.prototype.doFormat = function(row, cell, value, columnDef, dataContext) {
    var date;
    value = _.isString(value) ? parseInt(value, 10) : value;
    date = $.datepicker.formatDate(this.getFormat(), new Date(value));
    return DateFormatter.__super__.doFormat.call(this, row, cell, date, columnDef, dataContext);
  };

  return DateFormatter;

})(CellFormatter);

HTMLTemplateFormatter = (function(superClass) {
  extend(HTMLTemplateFormatter, superClass);

  function HTMLTemplateFormatter() {
    return HTMLTemplateFormatter.__super__.constructor.apply(this, arguments);
  }

  HTMLTemplateFormatter.prototype.type = 'HTMLTemplateFormatter';

  HTMLTemplateFormatter.define({
    template: [p.String, '<%= value %>']
  });

  HTMLTemplateFormatter.prototype.doFormat = function(row, cell, value, columnDef, dataContext) {
    var compiled_template, template;
    template = this.get("template");
    if (value === null) {
      return "";
    } else {
      dataContext = _.extend({}, dataContext, {
        value: value
      });
      compiled_template = _.template(template);
      return compiled_template(dataContext);
    }
  };

  return HTMLTemplateFormatter;

})(CellFormatter);

module.exports = {
  String: {
    Model: StringFormatter
  },
  Number: {
    Model: NumberFormatter
  },
  Boolean: {
    Model: BooleanFormatter
  },
  Date: {
    Model: DateFormatter
  },
  HTMLTemplate: {
    Model: HTMLTemplateFormatter
  }
};

},{"../../core/properties":"core/properties","../../model":"model","jquery":"jquery","numbro":"numbro/numbro","underscore":"underscore"}],"models/widgets/checkbox_button_group":[function(require,module,exports){
var $, $1, BokehView, CheckboxButtonGroup, CheckboxButtonGroupView, Widget, _, p, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ = require("underscore");

$ = require("jquery");

$1 = require("bootstrap/button");

Widget = require("./widget");

BokehView = require("../../core/bokeh_view");

p = require("../../core/properties");

template = require("./button_group_template");

CheckboxButtonGroupView = (function(superClass) {
  extend(CheckboxButtonGroupView, superClass);

  function CheckboxButtonGroupView() {
    return CheckboxButtonGroupView.__super__.constructor.apply(this, arguments);
  }

  CheckboxButtonGroupView.prototype.events = {
    "change input": "change_input"
  };

  CheckboxButtonGroupView.prototype.template = template;

  CheckboxButtonGroupView.prototype.initialize = function(options) {
    CheckboxButtonGroupView.__super__.initialize.call(this, options);
    this.render();
    return this.listenTo(this.model, 'change', this.render);
  };

  CheckboxButtonGroupView.prototype.render = function() {
    var $input, $label, active, html, i, j, label, len, ref;
    CheckboxButtonGroupView.__super__.render.call(this);
    this.$el.empty();
    html = this.template();
    this.$el.append(html);
    active = this.model.active;
    ref = this.model.labels;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      label = ref[i];
      $input = $('<input type="checkbox">').attr({
        value: "" + i
      });
      if (indexOf.call(active, i) >= 0) {
        $input.prop("checked", true);
      }
      $label = $('<label class="bk-bs-btn"></label>');
      $label.text(label).prepend($input);
      $label.addClass("bk-bs-btn-" + this.mget("button_type"));
      if (indexOf.call(active, i) >= 0) {
        $label.addClass("bk-bs-active");
      }
      this.$el.find('.bk-bs-btn-group').append($label);
    }
    return this;
  };

  CheckboxButtonGroupView.prototype.change_input = function() {
    var active, checkbox, i, ref;
    active = (function() {
      var j, len, ref, results;
      ref = this.$("input");
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        checkbox = ref[i];
        if (checkbox.checked) {
          results.push(i);
        }
      }
      return results;
    }).call(this);
    this.model.active = active;
    return (ref = this.mget('callback')) != null ? ref.execute(this.model) : void 0;
  };

  return CheckboxButtonGroupView;

})(Widget.View);

CheckboxButtonGroup = (function(superClass) {
  extend(CheckboxButtonGroup, superClass);

  function CheckboxButtonGroup() {
    return CheckboxButtonGroup.__super__.constructor.apply(this, arguments);
  }

  CheckboxButtonGroup.prototype.type = "CheckboxButtonGroup";

  CheckboxButtonGroup.prototype.default_view = CheckboxButtonGroupView;

  CheckboxButtonGroup.define({
    active: [p.Array, []],
    labels: [p.Array, []],
    button_type: [p.String, "default"],
    callback: [p.Instance]
  });

  return CheckboxButtonGroup;

})(Widget.Model);

module.exports = {
  Model: CheckboxButtonGroup,
  View: CheckboxButtonGroupView
};

},{"../../core/bokeh_view":"core/bokeh_view","../../core/properties":"core/properties","./button_group_template":"models/widgets/button_group_template","./widget":"models/widgets/widget","bootstrap/button":"bootstrap/button","jquery":"jquery","underscore":"underscore"}],"models/widgets/checkbox_group":[function(require,module,exports){
var $, BokehView, CheckboxGroup, CheckboxGroupView, Widget, _, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ = require("underscore");

$ = require("jquery");

Widget = require("./widget");

BokehView = require("../../core/bokeh_view");

p = require("../../core/properties");

CheckboxGroupView = (function(superClass) {
  extend(CheckboxGroupView, superClass);

  function CheckboxGroupView() {
    return CheckboxGroupView.__super__.constructor.apply(this, arguments);
  }

  CheckboxGroupView.prototype.events = {
    "change input": "change_input"
  };

  CheckboxGroupView.prototype.initialize = function(options) {
    CheckboxGroupView.__super__.initialize.call(this, options);
    this.render();
    return this.listenTo(this.model, 'change', this.render);
  };

  CheckboxGroupView.prototype.render = function() {
    var $div, $input, $label, active, i, j, label, len, ref;
    CheckboxGroupView.__super__.render.call(this);
    this.$el.empty();
    active = this.mget("active");
    ref = this.mget("labels");
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      label = ref[i];
      $input = $('<input type="checkbox">').attr({
        value: "" + i
      });
      if (this.mget("disabled")) {
        $input.prop("disabled", true);
      }
      if (indexOf.call(active, i) >= 0) {
        $input.prop("checked", true);
      }
      $label = $('<label></label>').text(label).prepend($input);
      if (this.mget("inline")) {
        $label.addClass("bk-bs-checkbox-inline");
        this.$el.append($label);
      } else {
        $div = $('<div class="bk-bs-checkbox"></div>').append($label);
        this.$el.append($div);
      }
    }
    return this;
  };

  CheckboxGroupView.prototype.change_input = function() {
    var active, checkbox, i, ref;
    active = (function() {
      var j, len, ref, results;
      ref = this.$("input");
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        checkbox = ref[i];
        if (checkbox.checked) {
          results.push(i);
        }
      }
      return results;
    }).call(this);
    this.model.active = active;
    return (ref = this.mget('callback')) != null ? ref.execute(this.model) : void 0;
  };

  return CheckboxGroupView;

})(Widget.View);

CheckboxGroup = (function(superClass) {
  extend(CheckboxGroup, superClass);

  function CheckboxGroup() {
    return CheckboxGroup.__super__.constructor.apply(this, arguments);
  }

  CheckboxGroup.prototype.type = "CheckboxGroup";

  CheckboxGroup.prototype.default_view = CheckboxGroupView;

  CheckboxGroup.define({
    active: [p.Array, []],
    labels: [p.Array, []],
    inline: [p.Bool, false],
    callback: [p.Instance]
  });

  return CheckboxGroup;

})(Widget.Model);

module.exports = {
  Model: CheckboxGroup,
  View: CheckboxGroupView
};

},{"../../core/bokeh_view":"core/bokeh_view","../../core/properties":"core/properties","./widget":"models/widgets/widget","jquery":"jquery","underscore":"underscore"}],"models/widgets/data_table":[function(require,module,exports){
var $, $1, CheckboxSelectColumn, DOMUtil, DataProvider, DataTable, DataTableView, RowSelectionModel, SlickGrid, TableWidget, Widget, _, hittest, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

$ = require("jquery");

$1 = require("jquery-ui/sortable");

SlickGrid = require("slick_grid/slick.grid");

RowSelectionModel = require("slick_grid/plugins/slick.rowselectionmodel");

CheckboxSelectColumn = require("slick_grid/plugins/slick.checkboxselectcolumn");

hittest = require("../../common/hittest");

p = require("../../core/properties");

DOMUtil = require("../../util/dom_util");

TableWidget = require("./table_widget");

Widget = require("./widget");

DataProvider = (function() {
  function DataProvider(source1) {
    var j, ref, results;
    this.source = source1;
    this.data = this.source.get('data');
    this.fields = _.keys(this.data);
    if (!_.contains(this.fields, "index")) {
      this.data["index"] = (function() {
        results = [];
        for (var j = 0, ref = this.getLength(); 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this);
      this.fields.push("index");
    }
  }

  DataProvider.prototype.getLength = function() {
    return this.source.get_length();
  };

  DataProvider.prototype.getItem = function(offset) {
    var field, item, j, len, ref;
    item = {};
    ref = this.fields;
    for (j = 0, len = ref.length; j < len; j++) {
      field = ref[j];
      item[field] = this.data[field][offset];
    }
    return item;
  };

  DataProvider.prototype._setItem = function(offset, item) {
    var field, value;
    for (field in item) {
      value = item[field];
      this.data[field][offset] = value;
    }
  };

  DataProvider.prototype.setItem = function(offset, item) {
    this._setItem(offset, item);
    return this.updateSource();
  };

  DataProvider.prototype.getField = function(index, field) {
    var offset;
    offset = this.data["index"].indexOf(index);
    return this.data[field][offset];
  };

  DataProvider.prototype._setField = function(index, field, value) {
    var offset;
    offset = this.data["index"].indexOf(index);
    this.data[field][offset] = value;
  };

  DataProvider.prototype.setField = function(index, field, value) {
    this._setField(index, field, value);
    return this.updateSource();
  };

  DataProvider.prototype.updateSource = function() {
    return this.source.trigger("change:data", this, this.source.attributes['data']);
  };

  DataProvider.prototype.getItemMetadata = function(index) {
    return null;
  };

  DataProvider.prototype.getRecords = function() {
    var i;
    return (function() {
      var j, ref, results;
      results = [];
      for (i = j = 0, ref = this.getLength(); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        results.push(this.getItem(i));
      }
      return results;
    }).call(this);
  };

  DataProvider.prototype.sort = function(columns) {
    var cols, column, i, j, len, record, records;
    cols = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = columns.length; j < len; j++) {
        column = columns[j];
        results.push([column.sortCol.field, column.sortAsc ? 1 : -1]);
      }
      return results;
    })();
    if (_.isEmpty(cols)) {
      cols = [["index", 1]];
    }
    records = this.getRecords();
    records.sort(function(record1, record2) {
      var field, j, len, ref, result, sign, value1, value2;
      for (j = 0, len = cols.length; j < len; j++) {
        ref = cols[j], field = ref[0], sign = ref[1];
        value1 = record1[field];
        value2 = record2[field];
        result = value1 === value2 ? 0 : value1 > value2 ? sign : -sign;
        if (result !== 0) {
          return result;
        }
      }
      return 0;
    });
    for (i = j = 0, len = records.length; j < len; i = ++j) {
      record = records[i];
      this._setItem(i, record);
    }
    return this.updateSource();
  };

  return DataProvider;

})();

DataTableView = (function(superClass) {
  extend(DataTableView, superClass);

  function DataTableView() {
    return DataTableView.__super__.constructor.apply(this, arguments);
  }

  DataTableView.prototype.attributes = {
    "class": "bk-data-table"
  };

  DataTableView.prototype.initialize = function(options) {
    var source;
    DataTableView.__super__.initialize.call(this, options);
    DOMUtil.waitForElement(this.el, (function(_this) {
      return function() {
        return _this.render();
      };
    })(this));
    this.listenTo(this.model, 'change', (function(_this) {
      return function() {
        return _this.render();
      };
    })(this));
    source = this.mget("source");
    this.listenTo(source, 'change:data', (function(_this) {
      return function() {
        return _this.updateGrid();
      };
    })(this));
    return this.listenTo(source, 'change:selected', (function(_this) {
      return function() {
        return _this.updateSelection();
      };
    })(this));
  };

  DataTableView.prototype.updateGrid = function() {
    this.data = new DataProvider(this.mget("source"));
    this.grid.setData(this.data);
    return this.grid.render();
  };

  DataTableView.prototype.updateSelection = function() {
    var cur_grid_range, indices, min_index, selected;
    selected = this.mget("source").get("selected");
    indices = selected['1d'].indices;
    this.grid.setSelectedRows(indices);
    cur_grid_range = this.grid.getViewport();
    if (this.mget("scroll_to_selection") && !_.any(_.map(indices, function(index) {
      return cur_grid_range["top"] <= index && index <= cur_grid_range["bottom"];
    }))) {
      min_index = Math.max(0, Math.min.apply(null, indices) - 1);
      return this.grid.scrollRowToTop(min_index);
    }
  };

  DataTableView.prototype.newIndexColumn = function() {
    return {
      id: _.uniqueId(),
      name: "#",
      field: "index",
      width: 40,
      behavior: "select",
      cannotTriggerInsert: true,
      resizable: false,
      selectable: false,
      sortable: true,
      cssClass: "bk-cell-index"
    };
  };

  DataTableView.prototype.render = function() {
    var checkboxSelector, column, columns, height, options, width;
    columns = (function() {
      var j, len, ref, results;
      ref = this.mget("columns");
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        column = ref[j];
        results.push(column.toColumn());
      }
      return results;
    }).call(this);
    if (this.mget("selectable") === "checkbox") {
      checkboxSelector = new CheckboxSelectColumn({
        cssClass: "bk-cell-select"
      });
      columns.unshift(checkboxSelector.getColumnDefinition());
    }
    if (this.mget("row_headers") && (this.mget("source").get_column("index") != null)) {
      columns.unshift(this.newIndexColumn());
    }
    width = this.mget("width");
    height = this.mget("height");
    options = {
      enableCellNavigation: this.mget("selectable") !== false,
      enableColumnReorder: true,
      forceFitColumns: this.mget("fit_columns"),
      autoHeight: height === "auto",
      multiColumnSort: this.mget("sortable"),
      editable: this.mget("editable"),
      autoEdit: false
    };
    if (width != null) {
      this.$el.css({
        width: (this.mget("width")) + "px"
      });
    } else {
      this.$el.css({
        width: (this.mget("default_width")) + "px"
      });
    }
    if ((height != null) && height !== "auto") {
      this.$el.css({
        height: (this.mget("height")) + "px"
      });
    }
    this.data = new DataProvider(this.mget("source"));
    this.grid = new SlickGrid(this.el, this.data, columns, options);
    this.grid.onSort.subscribe((function(_this) {
      return function(event, args) {
        columns = args.sortCols;
        _this.data.sort(columns);
        _this.grid.invalidate();
        return _this.grid.render();
      };
    })(this));
    if (this.mget("selectable") !== false) {
      this.grid.setSelectionModel(new RowSelectionModel({
        selectActiveRow: checkboxSelector == null
      }));
      if (checkboxSelector != null) {
        this.grid.registerPlugin(checkboxSelector);
      }
      this.grid.onSelectedRowsChanged.subscribe((function(_this) {
        return function(event, args) {
          var selected;
          selected = hittest.create_hit_test_result();
          selected['1d'].indices = args.rows;
          return _this.mget("source").set("selected", selected);
        };
      })(this));
    }
    return this;
  };

  return DataTableView;

})(Widget.View);

DataTable = (function(superClass) {
  extend(DataTable, superClass);

  function DataTable() {
    return DataTable.__super__.constructor.apply(this, arguments);
  }

  DataTable.prototype.type = 'DataTable';

  DataTable.prototype.default_view = DataTableView;

  DataTable.define({
    columns: [p.Array, []],
    fit_columns: [p.Bool, true],
    sortable: [p.Bool, true],
    editable: [p.Bool, false],
    selectable: [p.Bool, true],
    row_headers: [p.Bool, true],
    scroll_to_selection: [p.Bool, true]
  });

  DataTable.override({
    height: 400
  });

  DataTable.internal({
    default_width: [p.Number, 600]
  });

  return DataTable;

})(TableWidget.Model);

module.exports = {
  Model: DataTable,
  View: DataTableView
};

},{"../../common/hittest":"common/hittest","../../core/properties":"core/properties","../../util/dom_util":"util/dom_util","./table_widget":"models/widgets/table_widget","./widget":"models/widgets/widget","jquery":"jquery","jquery-ui/sortable":"jquery-ui/sortable","slick_grid/plugins/slick.checkboxselectcolumn":"slick_grid/plugins/slick.checkboxselectcolumn","slick_grid/plugins/slick.rowselectionmodel":"slick_grid/plugins/slick.rowselectionmodel","slick_grid/slick.grid":"slick_grid/slick.grid","underscore":"underscore"}],"models/widgets/date_picker":[function(require,module,exports){
var $, $1, DatePicker, DatePickerView, InputWidget, _, p,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

$ = require("jquery");

$1 = require("jquery-ui/datepicker");

p = require("../../core/properties");

InputWidget = require("./input_widget");

DatePickerView = (function(superClass) {
  extend(DatePickerView, superClass);

  function DatePickerView() {
    this.onSelect = bind(this.onSelect, this);
    return DatePickerView.__super__.constructor.apply(this, arguments);
  }

  DatePickerView.prototype.initialize = function(options) {
    DatePickerView.__super__.initialize.call(this, options);
    this.label = $('<label>').text(this.mget("title"));
    this.input = $('<input type="text">');
    this.datepicker = this.input.datepicker({
      defaultDate: new Date(this.mget('value')),
      minDate: this.mget('min_date') != null ? new Date(this.mget('min_date')) : null,
      maxDate: this.mget('max_date') != null ? new Date(this.mget('max_date')) : null,
      onSelect: this.onSelect
    });
    return this.$el.append([this.label, this.input]);
  };

  DatePickerView.prototype.onSelect = function(dateText, ui) {
    var d, ref;
    d = new Date(dateText);
    this.mset('value', d.toString());
    return (ref = this.mget('callback')) != null ? ref.execute(this.model) : void 0;
  };

  return DatePickerView;

})(InputWidget.View);

DatePicker = (function(superClass) {
  extend(DatePicker, superClass);

  function DatePicker() {
    return DatePicker.__super__.constructor.apply(this, arguments);
  }

  DatePicker.prototype.type = "DatePicker";

  DatePicker.prototype.default_view = DatePickerView;

  DatePicker.define({
    value: [p.Any, Date.now()],
    min_date: [p.Any],
    max_date: [p.Any]
  });

  return DatePicker;

})(InputWidget.Model);

module.exports = {
  Model: DatePicker,
  View: DatePickerView
};

},{"../../core/properties":"core/properties","./input_widget":"models/widgets/input_widget","jquery":"jquery","jquery-ui/datepicker":"jquery-ui/datepicker","underscore":"underscore"}],"models/widgets/date_range_slider":[function(require,module,exports){
var $, $1, DateRangeSlider, DateRangeSliderView, InputWidget, _, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

$ = require("jquery");

$1 = require("jqrangeslider/jQDateRangeSlider");

p = require("../../core/properties");

InputWidget = require("./input_widget");

DateRangeSliderView = (function(superClass) {
  extend(DateRangeSliderView, superClass);

  function DateRangeSliderView() {
    return DateRangeSliderView.__super__.constructor.apply(this, arguments);
  }

  DateRangeSliderView.prototype.initialize = function(options) {
    DateRangeSliderView.__super__.initialize.call(this, options);
    this.render();
    return this.listenTo(this.model, 'change', (function(_this) {
      return function() {
        return _this.render;
      };
    })(this));
  };

  DateRangeSliderView.prototype.render = function() {
    var bounds_max, bounds_min, range_max, range_min, ref, ref1, ref2, value_max, value_min;
    DateRangeSliderView.__super__.render.call(this);
    this.$el.empty();
    ref = this.mget("value"), value_min = ref[0], value_max = ref[1];
    ref1 = this.mget("range"), range_min = ref1[0], range_max = ref1[1];
    ref2 = this.mget("bounds"), bounds_min = ref2[0], bounds_max = ref2[1];
    this.$el.dateRangeSlider({
      defaultValues: {
        min: new Date(value_min),
        max: new Date(value_max)
      },
      bounds: {
        min: new Date(bounds_min),
        max: new Date(bounds_max)
      },
      range: {
        min: _.isObject(range_min) ? range_min : false,
        max: _.isObject(range_max) ? range_max : false
      },
      step: this.mget("step") || {},
      enabled: this.mget("enabled"),
      arrows: this.mget("arrows"),
      valueLabels: this.mget("value_labels"),
      wheelMode: this.mget("wheel_mode")
    });
    this.$el.on("userValuesChanged", (function(_this) {
      return function(event, data) {
        var ref3;
        _this.mset('value', [data.values.min, data.values.max]);
        return (ref3 = _this.mget('callback')) != null ? ref3.execute(_this.model) : void 0;
      };
    })(this));
    return this;
  };

  return DateRangeSliderView;

})(InputWidget.View);

DateRangeSlider = (function(superClass) {
  extend(DateRangeSlider, superClass);

  function DateRangeSlider() {
    return DateRangeSlider.__super__.constructor.apply(this, arguments);
  }

  DateRangeSlider.prototype.type = "DateRangeSlider";

  DateRangeSlider.prototype.default_view = DateRangeSliderView;

  DateRangeSlider.define({
    value: [p.Any],
    range: [p.Any],
    bounds: [p.Any],
    step: [p.Any, {}],
    enabled: [p.Bool, true],
    arrows: [p.Bool, true],
    value_labels: [p.String, "show"],
    wheel_mode: [p.Any]

    /*
    formatter
    scales
     */
  });

  return DateRangeSlider;

})(InputWidget.Model);

module.exports = {
  Model: DateRangeSlider,
  View: DateRangeSliderView
};

},{"../../core/properties":"core/properties","./input_widget":"models/widgets/input_widget","jqrangeslider/jQDateRangeSlider":"jqrangeslider/jQDateRangeSlider","jquery":"jquery","underscore":"underscore"}],"models/widgets/dialog":[function(require,module,exports){
var $, $1, Dialog, DialogView, Widget, _, dialog_template, p,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

$ = require("jquery");

$1 = require("bootstrap/modal");

p = require("../../core/properties");

dialog_template = require("./dialog_template");

Widget = require("./widget");

DialogView = (function(superClass) {
  extend(DialogView, superClass);

  function DialogView() {
    this.change_content = bind(this.change_content, this);
    this.change_visibility = bind(this.change_visibility, this);
    this.onHide = bind(this.onHide, this);
    return DialogView.__super__.constructor.apply(this, arguments);
  }

  DialogView.prototype.initialize = function(options) {
    DialogView.__super__.initialize.call(this, options);
    this.render();
    this.render_content();
    this.render_buttons();
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'change:visible', this.change_visibility);
    return this.listenTo(this.model, 'change:content', this.change_content);
  };

  DialogView.prototype.render_content = function() {
    var content;
    if (this.content_view != null) {
      this.content_view.remove();
    }
    content = this.mget('content');
    if (content != null) {
      if (typeof content === 'object') {
        this.content_view = new content.default_view({
          model: content
        });
        this.$el.find('.bk-dialog-content').empty();
        this.$el.find('.bk-dialog-content').append(this.content_view.$el);
      } else {
        this.$el.find('.bk-dialog-content').empty();
        this.$el.find('.bk-dialog-content').text(content);
      }
    }
    return this;
  };

  DialogView.prototype.render_buttons = function() {
    var buttons_box;
    if (this.buttons_box_view != null) {
      this.buttons_box_view.remove();
    }
    buttons_box = this.mget('buttons_box');
    if (buttons_box != null) {
      this.buttons_box_view = new buttons_box.default_view({
        model: buttons_box
      });
      this.$el.find('.bk-dialog-buttons_box').empty();
      this.$el.find('.bk-dialog-buttons_box').append(this.buttons_box_view.$el);
    }
    return this;
  };

  DialogView.prototype.render = function() {
    DialogView.__super__.render.call(this);
    this.$modal = $(dialog_template(this.model.attributes));
    this.$modal.modal({
      show: this.mget("visible")
    });
    this.$modal.on('hidden.bk-bs.modal', this.onHide);
    this.$el.html(this.$modal);
    return this;
  };

  DialogView.prototype.onHide = function(event) {
    return this.mset("visible", false, {
      silent: true
    });
  };

  DialogView.prototype.change_visibility = function() {
    return this.$modal.modal(this.mget("visible") ? "show" : "hide");
  };

  DialogView.prototype.change_content = function() {
    return this.render_content();
  };

  return DialogView;

})(Widget.View);

Dialog = (function(superClass) {
  extend(Dialog, superClass);

  function Dialog() {
    return Dialog.__super__.constructor.apply(this, arguments);
  }

  Dialog.prototype.type = "Dialog";

  Dialog.prototype.default_view = DialogView;

  Dialog.define({
    visible: [p.Bool, false],
    closable: [p.Bool, true],
    title: [p.String, ""],
    content: [p.String, ""],
    buttons: [p.Array, []],
    buttons_box: [p.Instance]
  });

  return Dialog;

})(Widget.Model);

module.exports = {
  Model: Dialog,
  View: DialogView
};

},{"../../core/properties":"core/properties","./dialog_template":"models/widgets/dialog_template","./widget":"models/widgets/widget","bootstrap/modal":"bootstrap/modal","jquery":"jquery","underscore":"underscore"}],"models/widgets/dialog_template":[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [];
  var __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  };
  var __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  };
  var __safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  var __escape = function(value) {
    return ('' + value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };
  (function() {
    (function() {
      __out.push('<div class="bk-bs-modal" tabindex="-1">\n  <div class="bk-bs-modal-dialog">\n    <div class="bk-bs-modal-content">\n      <div class="bk-bs-modal-header">\n        ');
    
      if (this.closable) {
        __out.push('\n          <button type="button" class="bk-bs-close" data-bk-bs-dismiss="modal">&times;</button>\n        ');
      }
    
      __out.push('\n        <h4 class="bk-bs-modal-title">');
    
      __out.push(__sanitize(this.title));
    
      __out.push('</h4>\n      </div>\n      <div class="bk-bs-modal-body">\n        <div class="bk-dialog-content" />\n      </div>\n      <div class="bk-bs-modal-footer">\n        <div class="bk-dialog-buttons_box" />\n      </div>\n    </div>\n  </div>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  return __out.join('');
};
},{}],"models/widgets/div":[function(require,module,exports){
var $, Div, DivView, Markup, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require("jquery");

Markup = require("./markup");

p = require("../../core/properties");

DivView = (function(superClass) {
  extend(DivView, superClass);

  function DivView() {
    return DivView.__super__.constructor.apply(this, arguments);
  }

  DivView.prototype.render = function() {
    var $content;
    DivView.__super__.render.call(this);
    if (this.model.render_as_text === true) {
      $content = $('<div></div>').text(this.model.text);
    } else {
      $content = $('<div></div>').html(this.model.text);
    }
    this.$el.find('.bk-markup').append($content);
    return this;
  };

  return DivView;

})(Markup.View);

Div = (function(superClass) {
  extend(Div, superClass);

  function Div() {
    return Div.__super__.constructor.apply(this, arguments);
  }

  Div.prototype.type = "Div";

  Div.prototype.default_view = DivView;

  Div.define({
    render_as_text: [p.Bool, false]
  });

  return Div;

})(Markup.Model);

module.exports = {
  Model: Div,
  View: DivView
};

},{"../../core/properties":"core/properties","./markup":"models/widgets/markup","jquery":"jquery"}],"models/widgets/dropdown":[function(require,module,exports){
var $, AbstractButton, Dropdown, DropdownView, _, p, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

$ = require("jquery");

p = require("../../core/properties");

AbstractButton = require("./abstract_button");

template = require("./dropdown_template");

DropdownView = (function(superClass) {
  extend(DropdownView, superClass);

  function DropdownView() {
    return DropdownView.__super__.constructor.apply(this, arguments);
  }

  DropdownView.prototype.template = template;

  DropdownView.prototype.render = function() {
    var $a, $item, i, item, items, label, len, ref, that, value;
    DropdownView.__super__.render.call(this);
    items = [];
    ref = this.model.menu;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      $item = item != null ? ((label = item[0], value = item[1], item), $a = $("<a data-value='" + value + "'>" + label + "</a>"), that = this, $a.click(function(e) {
        return that.set_value($(this).data('value'));
      }), $('<li></li>').append($a)) : $('<li class="bk-bs-divider"></li>');
      items.push($item);
    }
    this.$el.find('.bk-bs-dropdown-menu').append(items);
    this.$el.find('button').val(this.model.default_value);
    return this;
  };

  DropdownView.prototype.set_value = function(value) {
    this.model.value = value;
    return this.$el.find('button').val(value);
  };

  return DropdownView;

})(AbstractButton.View);

Dropdown = (function(superClass) {
  extend(Dropdown, superClass);

  function Dropdown() {
    return Dropdown.__super__.constructor.apply(this, arguments);
  }

  Dropdown.prototype.type = "Dropdown";

  Dropdown.prototype.default_view = DropdownView;

  Dropdown.define({
    value: [p.String],
    default_value: [p.String],
    menu: [p.Array, []]
  });

  Dropdown.override({
    label: "Dropdown"
  });

  return Dropdown;

})(AbstractButton.Model);

module.exports = {
  Model: Dropdown,
  View: DropdownView
};

},{"../../core/properties":"core/properties","./abstract_button":"models/widgets/abstract_button","./dropdown_template":"models/widgets/dropdown_template","jquery":"jquery","underscore":"underscore"}],"models/widgets/dropdown_template":[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [];
  var __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  };
  var __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  };
  var __safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  var __escape = function(value) {
    return ('' + value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };
  (function() {
    (function() {
      __out.push('<button type="button" class="bk-bs-btn bk-bs-btn-');
    
      __out.push(__sanitize(this.button_type));
    
      __out.push(' bk-bs-dropdown-toggle bk-bs-dropdown-btn" data-bk-bs-toggle="dropdown">\n  ');
    
      __out.push(__sanitize(this.label));
    
      __out.push(' <span class="bk-bs-caret"></span>\n</button>\n<ul class="bk-bs-dropdown-menu">\n</ul>\n');
    
    }).call(this);
    
  }).call(__obj);
  return __out.join('');
};
},{}],"models/widgets/icon":[function(require,module,exports){
var AbstractIcon, Icon, IconView, Widget, _, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

p = require("../../core/properties");

AbstractIcon = require("./abstract_icon");

Widget = require("./widget");

IconView = (function(superClass) {
  extend(IconView, superClass);

  function IconView() {
    return IconView.__super__.constructor.apply(this, arguments);
  }

  IconView.prototype.tagName = "i";

  IconView.prototype.initialize = function(options) {
    IconView.__super__.initialize.call(this, options);
    this.render();
    return this.listenTo(this.model, 'change', this.render);
  };

  IconView.prototype.render = function() {
    var flip, size;
    this.$el.empty();
    this.$el.addClass("bk-fa");
    this.$el.addClass("bk-fa-" + this.mget("icon_name"));
    size = this.mget("size");
    if (size != null) {
      this.$el.css({
        "font-size": size + "em"
      });
    }
    flip = this.mget("flip");
    if (flip != null) {
      this.$el.addClass("bk-fa-flip-" + flip);
    }
    if (this.mget("spin")) {
      this.$el.addClass("bk-fa-spin");
    }
    return this;
  };

  IconView.prototype.update_constraints = function() {
    return null;
  };

  return IconView;

})(Widget.View);

Icon = (function(superClass) {
  extend(Icon, superClass);

  function Icon() {
    return Icon.__super__.constructor.apply(this, arguments);
  }

  Icon.prototype.type = "Icon";

  Icon.prototype.default_view = IconView;

  Icon.define({
    icon_name: [p.String, "check"],
    size: [p.Number],
    flip: [p.Any],
    spin: [p.Bool, false]
  });

  return Icon;

})(AbstractIcon.Model);

module.exports = {
  Model: Icon,
  View: IconView
};

},{"../../core/properties":"core/properties","./abstract_icon":"models/widgets/abstract_icon","./widget":"models/widgets/widget","underscore":"underscore"}],"models/widgets/input_widget":[function(require,module,exports){
var InputWidget, InputWidgetView, Widget, _, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

Widget = require("./widget");

p = require("../../core/properties");

InputWidgetView = (function(superClass) {
  extend(InputWidgetView, superClass);

  function InputWidgetView() {
    return InputWidgetView.__super__.constructor.apply(this, arguments);
  }

  InputWidgetView.prototype.render = function() {
    InputWidgetView.__super__.render.call(this);
    return this.$el.find('input').prop("disabled", this.model.disabled);
  };

  InputWidgetView.prototype.change_input = function() {
    var ref;
    return (ref = this.mget('callback')) != null ? ref.execute(this.model) : void 0;
  };

  return InputWidgetView;

})(Widget.View);

InputWidget = (function(superClass) {
  extend(InputWidget, superClass);

  function InputWidget() {
    return InputWidget.__super__.constructor.apply(this, arguments);
  }

  InputWidget.prototype.type = "InputWidget";

  InputWidget.prototype.default_view = InputWidgetView;

  InputWidget.define({
    callback: [p.Instance],
    title: [p.String, '']
  });

  return InputWidget;

})(Widget.Model);

module.exports = {
  Model: InputWidget,
  View: InputWidgetView
};

},{"../../core/properties":"core/properties","./widget":"models/widgets/widget","underscore":"underscore"}],"models/widgets/main":[function(require,module,exports){
module.exports = {
  models: {
    editors: [require('./cell_editors'), 'Editor'],
    formatters: [require('./cell_formatters'), 'Formatter'],
    AbstractButton: require('./abstract_button'),
    AbstractIcon: require('./abstract_icon'),
    TableWidget: require('./table_widget'),
    Markup: require('./markup'),
    Widget: require('./widget'),
    InputWidget: require('./input_widget'),
    TableColumn: require('./table_column'),
    DataTable: require('./data_table'),
    Paragraph: require('./paragraph'),
    Div: require('./div'),
    TextInput: require('./text_input'),
    AutocompleteInput: require('./autocomplete_input'),
    PreText: require('./pretext'),
    Select: require('./selectbox'),
    Slider: require('./slider'),
    MultiSelect: require('./multiselect'),
    DateRangeSlider: require('./date_range_slider'),
    DatePicker: require('./date_picker'),
    Panel: require('./panel'),
    Tabs: require('./tabs'),
    Dialog: require('./dialog'),
    Icon: require('./icon'),
    Button: require('./button'),
    Toggle: require('./toggle'),
    Dropdown: require('./dropdown'),
    CheckboxGroup: require('./checkbox_group'),
    RadioGroup: require('./radio_group'),
    CheckboxButtonGroup: require('./checkbox_button_group'),
    RadioButtonGroup: require('./radio_button_group')
  }
};

},{"./abstract_button":"models/widgets/abstract_button","./abstract_icon":"models/widgets/abstract_icon","./autocomplete_input":"models/widgets/autocomplete_input","./button":"models/widgets/button","./cell_editors":"models/widgets/cell_editors","./cell_formatters":"models/widgets/cell_formatters","./checkbox_button_group":"models/widgets/checkbox_button_group","./checkbox_group":"models/widgets/checkbox_group","./data_table":"models/widgets/data_table","./date_picker":"models/widgets/date_picker","./date_range_slider":"models/widgets/date_range_slider","./dialog":"models/widgets/dialog","./div":"models/widgets/div","./dropdown":"models/widgets/dropdown","./icon":"models/widgets/icon","./input_widget":"models/widgets/input_widget","./markup":"models/widgets/markup","./multiselect":"models/widgets/multiselect","./panel":"models/widgets/panel","./paragraph":"models/widgets/paragraph","./pretext":"models/widgets/pretext","./radio_button_group":"models/widgets/radio_button_group","./radio_group":"models/widgets/radio_group","./selectbox":"models/widgets/selectbox","./slider":"models/widgets/slider","./table_column":"models/widgets/table_column","./table_widget":"models/widgets/table_widget","./tabs":"models/widgets/tabs","./text_input":"models/widgets/text_input","./toggle":"models/widgets/toggle","./widget":"models/widgets/widget"}],"models/widgets/markup":[function(require,module,exports){
var Markup, MarkupView, Widget, p, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

p = require("../../core/properties");

Widget = require("./widget");

template = require("./markup_template");

MarkupView = (function(superClass) {
  extend(MarkupView, superClass);

  function MarkupView() {
    return MarkupView.__super__.constructor.apply(this, arguments);
  }

  MarkupView.prototype.template = template;

  MarkupView.prototype.initialize = function(options) {
    MarkupView.__super__.initialize.call(this, options);
    this.render();
    return this.listenTo(this.model, 'change', this.render);
  };

  MarkupView.prototype.render = function() {
    MarkupView.__super__.render.call(this);
    this.$el.empty();
    this.$el.html(this.template());
    if (this.mget('height')) {
      this.$el.height(this.mget('height'));
    }
    if (this.mget('width')) {
      return this.$el.width(this.mget('width'));
    }
  };

  return MarkupView;

})(Widget.View);

Markup = (function(superClass) {
  extend(Markup, superClass);

  function Markup() {
    return Markup.__super__.constructor.apply(this, arguments);
  }

  Markup.prototype.type = "Markup";

  Markup.prototype.initialize = function(options) {
    return Markup.__super__.initialize.call(this, options);
  };

  Markup.define({
    text: [p.String, '']
  });

  return Markup;

})(Widget.Model);

module.exports = {
  Model: Markup,
  View: MarkupView
};

},{"../../core/properties":"core/properties","./markup_template":"models/widgets/markup_template","./widget":"models/widgets/widget"}],"models/widgets/markup_template":[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [];
  var __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  };
  var __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  };
  var __safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  var __escape = function(value) {
    return ('' + value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };
  (function() {
    (function() {
      __out.push('<div class="bk-markup">\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  return __out.join('');
};
},{}],"models/widgets/multiselect":[function(require,module,exports){
var $, InputWidget, MultiSelect, MultiSelectView, _, multiselecttemplate, p,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("jquery");

$ = require("underscore");

p = require("../../core/properties");

InputWidget = require("./input_widget");

multiselecttemplate = require("./multiselecttemplate");

MultiSelectView = (function(superClass) {
  extend(MultiSelectView, superClass);

  function MultiSelectView() {
    this.render_selection = bind(this.render_selection, this);
    return MultiSelectView.__super__.constructor.apply(this, arguments);
  }

  MultiSelectView.prototype.tagName = "div";

  MultiSelectView.prototype.template = multiselecttemplate;

  MultiSelectView.prototype.events = {
    "change select": "change_input"
  };

  MultiSelectView.prototype.initialize = function(options) {
    MultiSelectView.__super__.initialize.call(this, options);
    this.render();
    this.listenTo(this.model, 'change:value', this.render_selection);
    this.listenTo(this.model, 'change:options', this.render);
    this.listenTo(this.model, 'change:name', this.render);
    return this.listenTo(this.model, 'change:title', this.render);
  };

  MultiSelectView.prototype.render = function() {
    var html;
    MultiSelectView.__super__.render.call(this);
    this.$el.empty();
    html = this.template(this.model.attributes);
    this.$el.html(html);
    this.render_selection();
    return this;
  };

  MultiSelectView.prototype.render_selection = function() {
    var values;
    values = {};
    _.map(this.mget('value'), function(x) {
      return values[x] = true;
    });
    return this.$('option').each((function(_this) {
      return function(el) {
        el = _this.$(el);
        if (values[el.attr('value')]) {
          return el.attr('selected', 'selected');
        }
      };
    })(this));
  };

  MultiSelectView.prototype.change_input = function() {
    var value;
    value = this.$el.find('select').val();
    if (value) {
      this.model.value = value;
    } else {
      this.model.value = [];
    }
    return MultiSelectView.__super__.change_input.call(this);
  };

  return MultiSelectView;

})(InputWidget.View);

MultiSelect = (function(superClass) {
  extend(MultiSelect, superClass);

  function MultiSelect() {
    return MultiSelect.__super__.constructor.apply(this, arguments);
  }

  MultiSelect.prototype.type = "MultiSelect";

  MultiSelect.prototype.default_view = MultiSelectView;

  MultiSelect.define({
    value: [p.Array, []],
    options: [p.Array, []]
  });

  return MultiSelect;

})(InputWidget.Model);

module.exports = {
  Model: MultiSelect,
  View: MultiSelectView
};

},{"../../core/properties":"core/properties","./input_widget":"models/widgets/input_widget","./multiselecttemplate":"models/widgets/multiselecttemplate","jquery":"jquery","underscore":"underscore"}],"models/widgets/multiselecttemplate":[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [];
  var __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  };
  var __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  };
  var __safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  var __escape = function(value) {
    return ('' + value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };
  (function() {
    (function() {
      var i, len, option, ref;
    
      __out.push('<label for="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('"> ');
    
      __out.push(__sanitize(this.title));
    
      __out.push(' </label>\n<select multiple class="bk-widget-form-input" id="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('" name="');
    
      __out.push(__sanitize(this.name));
    
      __out.push('">\n  ');
    
      ref = this.options;
      for (i = 0, len = ref.length; i < len; i++) {
        option = ref[i];
        __out.push('\n    ');
        if (typeof option === "string") {
          __out.push('\n  <option ');
          if (this.value.indexOf(option) > -1) {
            __out.push('selected="selected" ');
          }
          __out.push('value="');
          __out.push(__sanitize(option));
          __out.push('">');
          __out.push(__sanitize(option));
          __out.push('</option>\n    ');
        } else {
          __out.push('\n  <option  ');
          if (this.value.indexOf(option[0]) > -1) {
            __out.push('selected="selected" ');
          }
          __out.push('value="');
          __out.push(__sanitize(option[0]));
          __out.push('">');
          __out.push(__sanitize(option[1]));
          __out.push('</option>\n    ');
        }
        __out.push('\n  ');
      }
    
      __out.push('\n</select>');
    
    }).call(this);
    
  }).call(__obj);
  return __out.join('');
};
},{}],"models/widgets/panel":[function(require,module,exports){
var $, Panel, PanelView, Widget, _, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

$ = require("jquery");

p = require("../../core/properties");

Widget = require("./widget");

PanelView = (function(superClass) {
  extend(PanelView, superClass);

  function PanelView() {
    return PanelView.__super__.constructor.apply(this, arguments);
  }

  PanelView.prototype.render = function() {
    PanelView.__super__.render.call(this);
    this.$el.empty();
    return this;
  };

  return PanelView;

})(Widget.View);

Panel = (function(superClass) {
  extend(Panel, superClass);

  function Panel() {
    return Panel.__super__.constructor.apply(this, arguments);
  }

  Panel.prototype.type = "Panel";

  Panel.prototype.default_view = PanelView;

  Panel.define({
    title: [p.String, ""],
    child: [p.Instance],
    closable: [p.Bool, false]
  });

  return Panel;

})(Widget.Model);

module.exports = {
  Model: Panel,
  View: PanelView
};

},{"../../core/properties":"core/properties","./widget":"models/widgets/widget","jquery":"jquery","underscore":"underscore"}],"models/widgets/paragraph":[function(require,module,exports){
var $, Markup, Paragraph, ParagraphView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require("jquery");

Markup = require("./markup");

ParagraphView = (function(superClass) {
  extend(ParagraphView, superClass);

  function ParagraphView() {
    return ParagraphView.__super__.constructor.apply(this, arguments);
  }

  ParagraphView.prototype.render = function() {
    var $para;
    ParagraphView.__super__.render.call(this);
    $para = $('<p style="margin: 0;"></p>').text(this.model.text);
    return this.$el.find('.bk-markup').append($para);
  };

  return ParagraphView;

})(Markup.View);

Paragraph = (function(superClass) {
  extend(Paragraph, superClass);

  function Paragraph() {
    return Paragraph.__super__.constructor.apply(this, arguments);
  }

  Paragraph.prototype.type = "Paragraph";

  Paragraph.prototype.default_view = ParagraphView;

  return Paragraph;

})(Markup.Model);

module.exports = {
  Model: Paragraph,
  View: ParagraphView
};

},{"./markup":"models/widgets/markup","jquery":"jquery"}],"models/widgets/pretext":[function(require,module,exports){
var $, Markup, PreText, PreTextView, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require("jquery");

Markup = require("./markup");

p = require("../../core/properties");

PreTextView = (function(superClass) {
  extend(PreTextView, superClass);

  function PreTextView() {
    return PreTextView.__super__.constructor.apply(this, arguments);
  }

  PreTextView.prototype.render = function() {
    var $pre;
    PreTextView.__super__.render.call(this);
    $pre = $('<pre style="overflow: auto"></pre>').text(this.model.text);
    return this.$el.find('.bk-markup').append($pre);
  };

  return PreTextView;

})(Markup.View);

PreText = (function(superClass) {
  extend(PreText, superClass);

  function PreText() {
    return PreText.__super__.constructor.apply(this, arguments);
  }

  PreText.prototype.type = "PreText";

  PreText.prototype.default_view = PreTextView;

  return PreText;

})(Markup.Model);

module.exports = {
  Model: PreText,
  View: PreTextView
};

},{"../../core/properties":"core/properties","./markup":"models/widgets/markup","jquery":"jquery"}],"models/widgets/radio_button_group":[function(require,module,exports){
var $, $1, RadioButtonGroup, RadioButtonGroupView, Widget, _, p, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

$ = require("jquery");

$1 = require("bootstrap/button");

p = require("../../core/properties");

Widget = require("./widget");

template = require("./button_group_template");

RadioButtonGroupView = (function(superClass) {
  extend(RadioButtonGroupView, superClass);

  function RadioButtonGroupView() {
    return RadioButtonGroupView.__super__.constructor.apply(this, arguments);
  }

  RadioButtonGroupView.prototype.events = {
    "change input": "change_input"
  };

  RadioButtonGroupView.prototype.template = template;

  RadioButtonGroupView.prototype.initialize = function(options) {
    RadioButtonGroupView.__super__.initialize.call(this, options);
    this.render();
    return this.listenTo(this.model, 'change', this.render);
  };

  RadioButtonGroupView.prototype.render = function() {
    var $input, $label, active, html, i, j, label, len, name, ref;
    RadioButtonGroupView.__super__.render.call(this);
    this.$el.empty();
    html = this.template();
    this.$el.append(html);
    name = _.uniqueId("RadioButtonGroup");
    active = this.mget("active");
    ref = this.mget("labels");
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      label = ref[i];
      $input = $('<input type="radio">').attr({
        name: name,
        value: "" + i
      });
      if (i === active) {
        $input.prop("checked", true);
      }
      $label = $('<label class="bk-bs-btn"></label>');
      $label.text(label).prepend($input);
      $label.addClass("bk-bs-btn-" + this.mget("button_type"));
      if (i === active) {
        $label.addClass("bk-bs-active");
      }
      this.$el.find('.bk-bs-btn-group').append($label);
    }
    return this;
  };

  RadioButtonGroupView.prototype.change_input = function() {
    var active, i, radio, ref;
    active = (function() {
      var j, len, ref, results;
      ref = this.$("input");
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        radio = ref[i];
        if (radio.checked) {
          results.push(i);
        }
      }
      return results;
    }).call(this);
    this.model.active = active[0];
    return (ref = this.mget('callback')) != null ? ref.execute(this.model) : void 0;
  };

  return RadioButtonGroupView;

})(Widget.View);

RadioButtonGroup = (function(superClass) {
  extend(RadioButtonGroup, superClass);

  function RadioButtonGroup() {
    return RadioButtonGroup.__super__.constructor.apply(this, arguments);
  }

  RadioButtonGroup.prototype.type = "RadioButtonGroup";

  RadioButtonGroup.prototype.default_view = RadioButtonGroupView;

  RadioButtonGroup.define({
    active: [p.Any, null],
    labels: [p.Array, []],
    button_type: [p.String, "default"],
    callback: [p.Instance]
  });

  return RadioButtonGroup;

})(Widget.Model);

module.exports = {
  Model: RadioButtonGroup,
  View: RadioButtonGroupView
};

},{"../../core/properties":"core/properties","./button_group_template":"models/widgets/button_group_template","./widget":"models/widgets/widget","bootstrap/button":"bootstrap/button","jquery":"jquery","underscore":"underscore"}],"models/widgets/radio_group":[function(require,module,exports){
var $, RadioGroup, RadioGroupView, Widget, _, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

$ = require("jquery");

p = require("../../core/properties");

Widget = require("./widget");

RadioGroupView = (function(superClass) {
  extend(RadioGroupView, superClass);

  function RadioGroupView() {
    return RadioGroupView.__super__.constructor.apply(this, arguments);
  }

  RadioGroupView.prototype.tagName = "div";

  RadioGroupView.prototype.events = {
    "change input": "change_input"
  };

  RadioGroupView.prototype.initialize = function(options) {
    RadioGroupView.__super__.initialize.call(this, options);
    this.render();
    return this.listenTo(this.model, 'change', this.render);
  };

  RadioGroupView.prototype.render = function() {
    var $div, $input, $label, active, i, j, label, len, name, ref;
    RadioGroupView.__super__.render.call(this);
    this.$el.empty();
    name = _.uniqueId("RadioGroup");
    active = this.mget("active");
    ref = this.mget("labels");
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      label = ref[i];
      $input = $('<input type="radio">').attr({
        name: name,
        value: "" + i
      });
      if (this.mget("disabled")) {
        $input.prop("disabled", true);
      }
      if (i === active) {
        $input.prop("checked", true);
      }
      $label = $('<label></label>').text(label).prepend($input);
      if (this.mget("inline")) {
        $label.addClass("bk-bs-radio-inline");
        this.$el.append($label);
      } else {
        $div = $('<div class="bk-bs-radio"></div>').append($label);
        this.$el.append($div);
      }
    }
    return this;
  };

  RadioGroupView.prototype.change_input = function() {
    var active, i, radio, ref;
    active = (function() {
      var j, len, ref, results;
      ref = this.$("input");
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        radio = ref[i];
        if (radio.checked) {
          results.push(i);
        }
      }
      return results;
    }).call(this);
    this.model.active = active[0];
    return (ref = this.mget('callback')) != null ? ref.execute(this.model) : void 0;
  };

  return RadioGroupView;

})(Widget.View);

RadioGroup = (function(superClass) {
  extend(RadioGroup, superClass);

  function RadioGroup() {
    return RadioGroup.__super__.constructor.apply(this, arguments);
  }

  RadioGroup.prototype.type = "RadioGroup";

  RadioGroup.prototype.default_view = RadioGroupView;

  RadioGroup.define({
    active: [p.Any, null],
    labels: [p.Array, []],
    inline: [p.Bool, false],
    callback: [p.Instance]
  });

  return RadioGroup;

})(Widget.Model);

module.exports = {
  Model: RadioGroup,
  View: RadioGroupView
};

},{"../../core/properties":"core/properties","./widget":"models/widgets/widget","jquery":"jquery","underscore":"underscore"}],"models/widgets/selectbox":[function(require,module,exports){
var InputWidget, Select, SelectView, _, logger, p, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

logger = require("../../core/logging").logger;

p = require("../../core/properties");

InputWidget = require("./input_widget");

template = require("./selecttemplate");

SelectView = (function(superClass) {
  extend(SelectView, superClass);

  function SelectView() {
    return SelectView.__super__.constructor.apply(this, arguments);
  }

  SelectView.prototype.template = template;

  SelectView.prototype.events = {
    "change select": "change_input"
  };

  SelectView.prototype.initialize = function(options) {
    SelectView.__super__.initialize.call(this, options);
    this.render();
    return this.listenTo(this.model, 'change', this.render);
  };

  SelectView.prototype.render = function() {
    var html;
    SelectView.__super__.render.call(this);
    this.$el.empty();
    html = this.template(this.model.attributes);
    this.$el.html(html);
    return this;
  };

  SelectView.prototype.change_input = function() {
    var value;
    value = this.$('select').val();
    logger.debug("selectbox: value = " + value);
    this.model.value = value;
    return SelectView.__super__.change_input.call(this);
  };

  return SelectView;

})(InputWidget.View);

Select = (function(superClass) {
  extend(Select, superClass);

  function Select() {
    return Select.__super__.constructor.apply(this, arguments);
  }

  Select.prototype.type = "Select";

  Select.prototype.default_view = SelectView;

  Select.define({
    value: [p.String, ''],
    options: [p.Any, []]
  });

  return Select;

})(InputWidget.Model);

module.exports = {
  Model: Select,
  View: SelectView
};

},{"../../core/logging":"core/logging","../../core/properties":"core/properties","./input_widget":"models/widgets/input_widget","./selecttemplate":"models/widgets/selecttemplate","underscore":"underscore"}],"models/widgets/selecttemplate":[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [];
  var __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  };
  var __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  };
  var __safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  var __escape = function(value) {
    return ('' + value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };
  (function() {
    (function() {
      var i, len, option, ref;
    
      __out.push('<label for="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('"> ');
    
      __out.push(__sanitize(this.title));
    
      __out.push(' </label>\n<select class="bk-widget-form-input" id="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('" name="');
    
      __out.push(__sanitize(this.name));
    
      __out.push('">\n  ');
    
      ref = this.options;
      for (i = 0, len = ref.length; i < len; i++) {
        option = ref[i];
        __out.push('\n    ');
        if (typeof option === "string") {
          __out.push('\n      <option ');
          __out.push(__sanitize(option === this.value ? __out.push('selected="selected"') : void 0));
          __out.push(' value="');
          __out.push(__sanitize(option));
          __out.push('">');
          __out.push(__sanitize(option));
          __out.push('</option>\n    ');
        } else {
          __out.push('\n      <option ');
          __out.push(__sanitize(option[0] === this.value ? __out.push('selected="selected"') : void 0));
          __out.push(' value="');
          __out.push(__sanitize(option[0]));
          __out.push('">');
          __out.push(__sanitize(option[1]));
          __out.push('</option>\n    ');
        }
        __out.push('\n  ');
      }
    
      __out.push('\n</select>\n');
    
    }).call(this);
    
  }).call(__obj);
  return __out.join('');
};
},{}],"models/widgets/slider":[function(require,module,exports){
var $2, InputWidget, Slider, SliderView, Widget, _, logger, p, slidertemplate,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

$2 = require("jquery-ui/slider");

logger = require("../../core/logging").logger;

p = require("../../core/properties");

InputWidget = require("./input_widget");

Widget = require("./widget");

slidertemplate = require("./slidertemplate");

SliderView = (function(superClass) {
  extend(SliderView, superClass);

  function SliderView() {
    this.slide = bind(this.slide, this);
    this.slidestop = bind(this.slidestop, this);
    return SliderView.__super__.constructor.apply(this, arguments);
  }

  SliderView.prototype.tagName = "div";

  SliderView.prototype.template = slidertemplate;

  SliderView.prototype.initialize = function(options) {
    var html;
    SliderView.__super__.initialize.call(this, options);
    this.listenTo(this.model, 'change', this.render);
    this.$el.empty();
    html = this.template(this.model.attributes);
    this.$el.html(html);
    this.callbackWrapper = null;
    if (this.mget('callback_policy') === 'continuous') {
      this.callbackWrapper = function() {
        var ref;
        return (ref = this.mget('callback')) != null ? ref.execute(this.model) : void 0;
      };
    }
    if (this.mget('callback_policy') === 'throttle' && this.mget('callback')) {
      this.callbackWrapper = _.throttle(function() {
        var ref;
        return (ref = this.mget('callback')) != null ? ref.execute(this.model) : void 0;
      }, this.mget('callback_throttle'));
    }
    return this.render();
  };

  SliderView.prototype.render = function() {
    var max, min, opts, step;
    SliderView.__super__.render.call(this);
    max = this.mget('end');
    min = this.mget('start');
    step = this.mget('step') || ((max - min) / 50);
    logger.debug("slider render: min, max, step = (" + min + ", " + max + ", " + step + ")");
    opts = {
      orientation: this.mget('orientation'),
      animate: "fast",
      value: this.mget('value'),
      min: min,
      max: max,
      step: step,
      stop: this.slidestop,
      slide: this.slide
    };
    this.$el.find('.slider').slider(opts);
    this.$("#" + (this.mget('id'))).val(this.$('.slider').slider('value'));
    this.$el.find('.bk-slider-parent').height(this.mget('height'));
    return this;
  };

  SliderView.prototype.slidestop = function(event, ui) {
    var ref;
    if (this.mget('callback_policy') === 'mouseup' || this.mget('callback_policy') === 'throttle') {
      return (ref = this.mget('callback')) != null ? ref.execute(this.model) : void 0;
    }
  };

  SliderView.prototype.slide = function(event, ui) {
    var value;
    value = ui.value;
    logger.debug("slide value = " + value);
    this.$("#" + (this.mget('id'))).val(ui.value);
    this.mset('value', value);
    if (this.callbackWrapper) {
      return this.callbackWrapper();
    }
  };

  return SliderView;

})(InputWidget.View);

Slider = (function(superClass) {
  extend(Slider, superClass);

  function Slider() {
    return Slider.__super__.constructor.apply(this, arguments);
  }

  Slider.prototype.type = "Slider";

  Slider.prototype.default_view = SliderView;

  Slider.define({
    value: [p.Number, 0.5],
    start: [p.Number, 0],
    end: [p.Number, 1],
    step: [p.Number, 0.1],
    orientation: [p.Orientation, "horizontal"],
    callback_throttle: [p.Number, 200],
    callback_policy: [p.String, "throttle"]
  });

  return Slider;

})(InputWidget.Model);

module.exports = {
  Model: Slider,
  View: SliderView
};

},{"../../core/logging":"core/logging","../../core/properties":"core/properties","./input_widget":"models/widgets/input_widget","./slidertemplate":"models/widgets/slidertemplate","./widget":"models/widgets/widget","jquery-ui/slider":"jquery-ui/slider","underscore":"underscore"}],"models/widgets/slidertemplate":[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [];
  var __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  };
  var __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  };
  var __safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  var __escape = function(value) {
    return ('' + value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };
  (function() {
    (function() {
      __out.push('<div class="bk-slider-parent">\n  <label for="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('"> ');
    
      __out.push(__sanitize(this.title));
    
      __out.push(': </label><input type="text" id="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('" readonly>\n  <div class="bk-slider-');
    
      __out.push(__sanitize(this.orientation));
    
      __out.push('">\n    <div class="slider " id="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('">\n    </div>\n  </div>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  return __out.join('');
};
},{}],"models/widgets/table_column":[function(require,module,exports){
var CellEditors, CellFormatters, Model, TableColumn, _, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

CellEditors = require("./cell_editors");

CellFormatters = require("./cell_formatters");

p = require("../../core/properties");

Model = require("../../model");

TableColumn = (function(superClass) {
  extend(TableColumn, superClass);

  function TableColumn() {
    return TableColumn.__super__.constructor.apply(this, arguments);
  }

  TableColumn.prototype.type = 'TableColumn';

  TableColumn.prototype.default_view = null;

  TableColumn.define({
    field: [p.String],
    title: [p.String],
    width: [p.Number, 300],
    formatter: [
      p.Instance, function() {
        return new CellFormatters.String.Model();
      }
    ],
    editor: [
      p.Instance, function() {
        return new CellEditors.String.Model();
      }
    ],
    sortable: [p.Bool, true],
    default_sort: [p.String, "ascending"]
  });

  TableColumn.prototype.toColumn = function() {
    var ref;
    return {
      id: _.uniqueId(),
      field: this.get("field"),
      name: this.get("title"),
      width: this.get("width"),
      formatter: (ref = this.get("formatter")) != null ? ref.doFormat.bind(this.get("formatter")) : void 0,
      editor: this.get("editor"),
      sortable: this.get("sortable"),
      defaultSortAsc: this.get("default_sort") === "ascending"
    };
  };

  return TableColumn;

})(Model);

module.exports = {
  Model: TableColumn
};

},{"../../core/properties":"core/properties","../../model":"model","./cell_editors":"models/widgets/cell_editors","./cell_formatters":"models/widgets/cell_formatters","underscore":"underscore"}],"models/widgets/table_widget":[function(require,module,exports){
var TableWidget, Widget, _, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

Widget = require("./widget");

p = require("../../core/properties");

TableWidget = (function(superClass) {
  extend(TableWidget, superClass);

  function TableWidget() {
    return TableWidget.__super__.constructor.apply(this, arguments);
  }

  TableWidget.prototype.type = "TableWidget";

  TableWidget.define({
    source: [p.Instance]
  });

  return TableWidget;

})(Widget.Model);

module.exports = {
  Model: TableWidget
};

},{"../../core/properties":"core/properties","./widget":"models/widgets/widget","underscore":"underscore"}],"models/widgets/tabs":[function(require,module,exports){
var $, $1, Tabs, TabsView, Widget, _, p, tabs_template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

$ = require("jquery");

$1 = require("bootstrap/tab");

p = require("../../core/properties");

tabs_template = require("./tabs_template");

Widget = require("./widget");

TabsView = (function(superClass) {
  extend(TabsView, superClass);

  function TabsView() {
    return TabsView.__super__.constructor.apply(this, arguments);
  }

  TabsView.prototype.render = function() {
    var $panels, active, child, children, html, j, key, len, panel, ref, ref1, ref2, tabs, that, val;
    TabsView.__super__.render.call(this);
    ref = this.child_views;
    for (key in ref) {
      if (!hasProp.call(ref, key)) continue;
      val = ref[key];
      val.$el.detach();
    }
    this.$el.empty();
    tabs = this.mget('tabs');
    active = this.mget('active');
    children = this.mget('children');
    html = $(tabs_template({
      tabs: tabs,
      active: function(i) {
        if (i === active) {
          return 'bk-bs-active';
        } else {
          return '';
        }
      }
    }));
    that = this;
    html.find("> li > a").click(function(event) {
      var panelId, panelIdx, ref1;
      event.preventDefault();
      $(this).tab('show');
      panelId = $(this).attr('href').replace('#tab-', '');
      tabs = that.model.get('tabs');
      panelIdx = _.indexOf(tabs, _.find(tabs, function(panel) {
        return panel.id === panelId;
      }));
      that.model.set('active', panelIdx);
      return (ref1 = that.model.get('callback')) != null ? ref1.execute(that.model) : void 0;
    });
    $panels = html.children(".bk-bs-tab-pane");
    ref1 = _.zip(children, $panels);
    for (j = 0, len = ref1.length; j < len; j++) {
      ref2 = ref1[j], child = ref2[0], panel = ref2[1];
      $(panel).html(this.child_views[child.id].$el);
    }
    this.$el.append(html);
    this.$el.tabs;
    return this;
  };

  return TabsView;

})(Widget.View);

Tabs = (function(superClass) {
  extend(Tabs, superClass);

  function Tabs() {
    return Tabs.__super__.constructor.apply(this, arguments);
  }

  Tabs.prototype.type = "Tabs";

  Tabs.prototype.default_view = TabsView;

  Tabs.prototype.initialize = function(options) {
    var tab;
    Tabs.__super__.initialize.call(this, options);
    return this.children = (function() {
      var j, len, ref, results;
      ref = this.tabs;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        tab = ref[j];
        results.push(tab.get("child"));
      }
      return results;
    }).call(this);
  };

  Tabs.define({
    tabs: [p.Array, []],
    active: [p.Number, 0],
    callback: [p.Instance]
  });

  Tabs.internal({
    children: [p.Array, []]
  });

  Tabs.prototype.get_layoutable_children = function() {
    return this.get('children');
  };

  Tabs.prototype.get_edit_variables = function() {
    var child, edit_variables, j, len, ref;
    edit_variables = Tabs.__super__.get_edit_variables.call(this);
    ref = this.get_layoutable_children();
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      edit_variables = edit_variables.concat(child.get_edit_variables());
    }
    return edit_variables;
  };

  Tabs.prototype.get_constraints = function() {
    var child, constraints, j, len, ref;
    constraints = Tabs.__super__.get_constraints.call(this);
    ref = this.get_layoutable_children();
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      constraints = constraints.concat(child.get_constraints());
    }
    return constraints;
  };

  return Tabs;

})(Widget.Model);

module.exports = {
  Model: Tabs,
  View: TabsView
};

},{"../../core/properties":"core/properties","./tabs_template":"models/widgets/tabs_template","./widget":"models/widgets/widget","bootstrap/tab":"bootstrap/tab","jquery":"jquery","underscore":"underscore"}],"models/widgets/tabs_template":[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [];
  var __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  };
  var __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  };
  var __safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  var __escape = function(value) {
    return ('' + value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };
  (function() {
    (function() {
      var i, j, k, len, len1, ref, ref1, tab;
    
      __out.push('<ul class="bk-bs-nav bk-bs-nav-tabs">\n  ');
    
      ref = this.tabs;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        tab = ref[i];
        __out.push('\n    <li class="');
        __out.push(__sanitize(this.active(i)));
        __out.push('">\n      <a href="#tab-');
        __out.push(__sanitize(tab.get('id')));
        __out.push('">');
        __out.push(__sanitize(tab.get('title')));
        __out.push('</a>\n    </li>\n  ');
      }
    
      __out.push('\n</ul>\n<div class="bk-bs-tab-content">\n  ');
    
      ref1 = this.tabs;
      for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
        tab = ref1[i];
        __out.push('\n    <div class="bk-bs-tab-pane ');
        __out.push(__sanitize(this.active(i)));
        __out.push('" id="tab-');
        __out.push(__sanitize(tab.get('id')));
        __out.push('"></div>\n  ');
      }
    
      __out.push('\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  return __out.join('');
};
},{}],"models/widgets/text_input":[function(require,module,exports){
var InputWidget, TextInput, TextInputView, _, build_views, logger, p, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require("underscore");

build_views = require("../../common/build_views");

logger = require("../../core/logging").logger;

p = require("../../core/properties");

InputWidget = require("./input_widget");

template = require("./text_input_template");

TextInputView = (function(superClass) {
  extend(TextInputView, superClass);

  function TextInputView() {
    return TextInputView.__super__.constructor.apply(this, arguments);
  }

  TextInputView.prototype.tagName = "div";

  TextInputView.prototype.attributes = {
    "class": "bk-widget-form-group"
  };

  TextInputView.prototype.template = template;

  TextInputView.prototype.events = {
    "change input": "change_input"
  };

  TextInputView.prototype.initialize = function(options) {
    TextInputView.__super__.initialize.call(this, options);
    this.render();
    return this.listenTo(this.model, 'change', this.render);
  };

  TextInputView.prototype.render = function() {
    TextInputView.__super__.render.call(this);
    this.$el.html(this.template(this.model.attributes));
    if (this.model.height) {
      this.$el.find('input').height(this.mget('height') - 35);
    }
    return this;
  };

  TextInputView.prototype.change_input = function() {
    var value;
    value = this.$('input').val();
    logger.debug("widget/text_input: value = " + value);
    this.model.value = value;
    return TextInputView.__super__.change_input.call(this);
  };

  return TextInputView;

})(InputWidget.View);

TextInput = (function(superClass) {
  extend(TextInput, superClass);

  function TextInput() {
    return TextInput.__super__.constructor.apply(this, arguments);
  }

  TextInput.prototype.type = "TextInput";

  TextInput.prototype.default_view = TextInputView;

  TextInput.define({
    value: [p.String, ""]
  });

  return TextInput;

})(InputWidget.Model);

module.exports = {
  Model: TextInput,
  View: TextInputView
};

},{"../../common/build_views":"common/build_views","../../core/logging":"core/logging","../../core/properties":"core/properties","./input_widget":"models/widgets/input_widget","./text_input_template":"models/widgets/text_input_template","underscore":"underscore"}],"models/widgets/text_input_template":[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [];
  var __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  };
  var __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  };
  var __safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  var __escape = function(value) {
    return ('' + value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };
  (function() {
    (function() {
      __out.push('<label for="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('"> ');
    
      __out.push(__sanitize(this.title));
    
      __out.push(' </label>\n<input class="bk-widget-form-input" type="text" id="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('" name="');
    
      __out.push(__sanitize(this.name));
    
      __out.push('" value="');
    
      __out.push(__sanitize(this.value));
    
      __out.push('"/>\n');
    
    }).call(this);
    
  }).call(__obj);
  return __out.join('');
};
},{}],"models/widgets/toggle":[function(require,module,exports){
var AbstractButton, Toggle, ToggleView, p,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

p = require("../../core/properties");

AbstractButton = require("./abstract_button");

ToggleView = (function(superClass) {
  extend(ToggleView, superClass);

  function ToggleView() {
    return ToggleView.__super__.constructor.apply(this, arguments);
  }

  ToggleView.prototype.render = function() {
    ToggleView.__super__.render.call(this);
    if (this.mget("active")) {
      this.$el.find('button').addClass("bk-bs-active");
    } else {
      this.$el.find('button').removeClass("bk-bs-active");
    }
    return this;
  };

  ToggleView.prototype.change_input = function() {
    ToggleView.__super__.change_input.call(this);
    return this.mset('active', !this.mget('active'));
  };

  return ToggleView;

})(AbstractButton.View);

Toggle = (function(superClass) {
  extend(Toggle, superClass);

  function Toggle() {
    return Toggle.__super__.constructor.apply(this, arguments);
  }

  Toggle.prototype.type = "Toggle";

  Toggle.prototype.default_view = ToggleView;

  Toggle.define({
    active: [p.Bool, false]
  });

  Toggle.override({
    label: "Toggle"
  });

  return Toggle;

})(AbstractButton.Model);

module.exports = {
  Model: Toggle,
  View: ToggleView
};

},{"../../core/properties":"core/properties","./abstract_button":"models/widgets/abstract_button"}],"models/widgets/widget":[function(require,module,exports){
var LayoutDOM, Widget, WidgetView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LayoutDOM = require("../layouts/layout_dom");

WidgetView = (function(superClass) {
  extend(WidgetView, superClass);

  function WidgetView() {
    return WidgetView.__super__.constructor.apply(this, arguments);
  }

  WidgetView.prototype.className = "bk-widget";

  WidgetView.prototype.render = function() {
    if (this.model.height) {
      this.$el.height(this.model.height);
    }
    if (this.model.width) {
      return this.$el.width(this.model.width);
    }
  };

  return WidgetView;

})(LayoutDOM.View);

Widget = (function(superClass) {
  extend(Widget, superClass);

  function Widget() {
    return Widget.__super__.constructor.apply(this, arguments);
  }

  Widget.prototype.type = "Widget";

  Widget.prototype.default_view = WidgetView;

  return Widget;

})(LayoutDOM.Model);

module.exports = {
  Model: Widget,
  View: WidgetView
};

},{"../layouts/layout_dom":"models/layouts/layout_dom"}],"util/dom_util":[function(require,module,exports){
var $, _, waitForElement;

_ = require("underscore");

$ = require("jquery");

waitForElement = function(el, fn) {
  var handler, interval;
  handler = (function(_this) {
    return function() {
      if ($.contains(document.documentElement, el)) {
        clearInterval(interval);
        return fn();
      }
    };
  })(this);
  return interval = setInterval(handler, 50);
};

module.exports = {
  waitForElement: waitForElement
};

},{"jquery":"jquery","underscore":"underscore"}],"jquery-ui/autocomplete":[function(require,module,exports){
var jQuery = require('jquery');
require('./core');
require('./widget');
require('./position');
require('./menu');

/*!
 * jQuery UI Autocomplete 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/autocomplete/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 *	jquery.ui.menu.js
 */
(function( $, undefined ) {

$.widget( "ui.autocomplete", {
	version: "1.10.4",
	defaultElement: "<input>",
	options: {
		appendTo: null,
		autoFocus: false,
		delay: 300,
		minLength: 1,
		position: {
			my: "left top",
			at: "left bottom",
			collision: "none"
		},
		source: null,

		// callbacks
		change: null,
		close: null,
		focus: null,
		open: null,
		response: null,
		search: null,
		select: null
	},

	requestIndex: 0,
	pending: 0,

	_create: function() {
		// Some browsers only repeat keydown events, not keypress events,
		// so we use the suppressKeyPress flag to determine if we've already
		// handled the keydown event. #7269
		// Unfortunately the code for & in keypress is the same as the up arrow,
		// so we use the suppressKeyPressRepeat flag to avoid handling keypress
		// events when we know the keydown event was used to modify the
		// search term. #7799
		var suppressKeyPress, suppressKeyPressRepeat, suppressInput,
			nodeName = this.element[0].nodeName.toLowerCase(),
			isTextarea = nodeName === "textarea",
			isInput = nodeName === "input";

		this.isMultiLine =
			// Textareas are always multi-line
			isTextarea ? true :
			// Inputs are always single-line, even if inside a contentEditable element
			// IE also treats inputs as contentEditable
			isInput ? false :
			// All other element types are determined by whether or not they're contentEditable
			this.element.prop( "isContentEditable" );

		this.valueMethod = this.element[ isTextarea || isInput ? "val" : "text" ];
		this.isNewMenu = true;

		this.element
			.addClass( "ui-autocomplete-input" )
			.attr( "autocomplete", "off" );

		this._on( this.element, {
			keydown: function( event ) {
				if ( this.element.prop( "readOnly" ) ) {
					suppressKeyPress = true;
					suppressInput = true;
					suppressKeyPressRepeat = true;
					return;
				}

				suppressKeyPress = false;
				suppressInput = false;
				suppressKeyPressRepeat = false;
				var keyCode = $.ui.keyCode;
				switch( event.keyCode ) {
				case keyCode.PAGE_UP:
					suppressKeyPress = true;
					this._move( "previousPage", event );
					break;
				case keyCode.PAGE_DOWN:
					suppressKeyPress = true;
					this._move( "nextPage", event );
					break;
				case keyCode.UP:
					suppressKeyPress = true;
					this._keyEvent( "previous", event );
					break;
				case keyCode.DOWN:
					suppressKeyPress = true;
					this._keyEvent( "next", event );
					break;
				case keyCode.ENTER:
				case keyCode.NUMPAD_ENTER:
					// when menu is open and has focus
					if ( this.menu.active ) {
						// #6055 - Opera still allows the keypress to occur
						// which causes forms to submit
						suppressKeyPress = true;
						event.preventDefault();
						this.menu.select( event );
					}
					break;
				case keyCode.TAB:
					if ( this.menu.active ) {
						this.menu.select( event );
					}
					break;
				case keyCode.ESCAPE:
					if ( this.menu.element.is( ":visible" ) ) {
						this._value( this.term );
						this.close( event );
						// Different browsers have different default behavior for escape
						// Single press can mean undo or clear
						// Double press in IE means clear the whole form
						event.preventDefault();
					}
					break;
				default:
					suppressKeyPressRepeat = true;
					// search timeout should be triggered before the input value is changed
					this._searchTimeout( event );
					break;
				}
			},
			keypress: function( event ) {
				if ( suppressKeyPress ) {
					suppressKeyPress = false;
					if ( !this.isMultiLine || this.menu.element.is( ":visible" ) ) {
						event.preventDefault();
					}
					return;
				}
				if ( suppressKeyPressRepeat ) {
					return;
				}

				// replicate some key handlers to allow them to repeat in Firefox and Opera
				var keyCode = $.ui.keyCode;
				switch( event.keyCode ) {
				case keyCode.PAGE_UP:
					this._move( "previousPage", event );
					break;
				case keyCode.PAGE_DOWN:
					this._move( "nextPage", event );
					break;
				case keyCode.UP:
					this._keyEvent( "previous", event );
					break;
				case keyCode.DOWN:
					this._keyEvent( "next", event );
					break;
				}
			},
			input: function( event ) {
				if ( suppressInput ) {
					suppressInput = false;
					event.preventDefault();
					return;
				}
				this._searchTimeout( event );
			},
			focus: function() {
				this.selectedItem = null;
				this.previous = this._value();
			},
			blur: function( event ) {
				if ( this.cancelBlur ) {
					delete this.cancelBlur;
					return;
				}

				clearTimeout( this.searching );
				this.close( event );
				this._change( event );
			}
		});

		this._initSource();
		this.menu = $( "<ul>" )
			.addClass( "ui-autocomplete ui-front" )
			.appendTo( this._appendTo() )
			.menu({
				// disable ARIA support, the live region takes care of that
				role: null
			})
			.hide()
			.data( "ui-menu" );

		this._on( this.menu.element, {
			mousedown: function( event ) {
				// prevent moving focus out of the text field
				event.preventDefault();

				// IE doesn't prevent moving focus even with event.preventDefault()
				// so we set a flag to know when we should ignore the blur event
				this.cancelBlur = true;
				this._delay(function() {
					delete this.cancelBlur;
				});

				// clicking on the scrollbar causes focus to shift to the body
				// but we can't detect a mouseup or a click immediately afterward
				// so we have to track the next mousedown and close the menu if
				// the user clicks somewhere outside of the autocomplete
				var menuElement = this.menu.element[ 0 ];
				if ( !$( event.target ).closest( ".ui-menu-item" ).length ) {
					this._delay(function() {
						var that = this;
						this.document.one( "mousedown", function( event ) {
							if ( event.target !== that.element[ 0 ] &&
									event.target !== menuElement &&
									!$.contains( menuElement, event.target ) ) {
								that.close();
							}
						});
					});
				}
			},
			menufocus: function( event, ui ) {
				// support: Firefox
				// Prevent accidental activation of menu items in Firefox (#7024 #9118)
				if ( this.isNewMenu ) {
					this.isNewMenu = false;
					if ( event.originalEvent && /^mouse/.test( event.originalEvent.type ) ) {
						this.menu.blur();

						this.document.one( "mousemove", function() {
							$( event.target ).trigger( event.originalEvent );
						});

						return;
					}
				}

				var item = ui.item.data( "ui-autocomplete-item" );
				if ( false !== this._trigger( "focus", event, { item: item } ) ) {
					// use value to match what will end up in the input, if it was a key event
					if ( event.originalEvent && /^key/.test( event.originalEvent.type ) ) {
						this._value( item.value );
					}
				} else {
					// Normally the input is populated with the item's value as the
					// menu is navigated, causing screen readers to notice a change and
					// announce the item. Since the focus event was canceled, this doesn't
					// happen, so we update the live region so that screen readers can
					// still notice the change and announce it.
					this.liveRegion.text( item.value );
				}
			},
			menuselect: function( event, ui ) {
				var item = ui.item.data( "ui-autocomplete-item" ),
					previous = this.previous;

				// only trigger when focus was lost (click on menu)
				if ( this.element[0] !== this.document[0].activeElement ) {
					this.element.focus();
					this.previous = previous;
					// #6109 - IE triggers two focus events and the second
					// is asynchronous, so we need to reset the previous
					// term synchronously and asynchronously :-(
					this._delay(function() {
						this.previous = previous;
						this.selectedItem = item;
					});
				}

				if ( false !== this._trigger( "select", event, { item: item } ) ) {
					this._value( item.value );
				}
				// reset the term after the select event
				// this allows custom select handling to work properly
				this.term = this._value();

				this.close( event );
				this.selectedItem = item;
			}
		});

		this.liveRegion = $( "<span>", {
				role: "status",
				"aria-live": "polite"
			})
			.addClass( "ui-helper-hidden-accessible" )
			.insertBefore( this.element );

		// turning off autocomplete prevents the browser from remembering the
		// value when navigating through history, so we re-enable autocomplete
		// if the page is unloaded before the widget is destroyed. #7790
		this._on( this.window, {
			beforeunload: function() {
				this.element.removeAttr( "autocomplete" );
			}
		});
	},

	_destroy: function() {
		clearTimeout( this.searching );
		this.element
			.removeClass( "ui-autocomplete-input" )
			.removeAttr( "autocomplete" );
		this.menu.element.remove();
		this.liveRegion.remove();
	},

	_setOption: function( key, value ) {
		this._super( key, value );
		if ( key === "source" ) {
			this._initSource();
		}
		if ( key === "appendTo" ) {
			this.menu.element.appendTo( this._appendTo() );
		}
		if ( key === "disabled" && value && this.xhr ) {
			this.xhr.abort();
		}
	},

	_appendTo: function() {
		var element = this.options.appendTo;

		if ( element ) {
			element = element.jquery || element.nodeType ?
				$( element ) :
				this.document.find( element ).eq( 0 );
		}

		if ( !element ) {
			element = this.element.closest( ".ui-front" );
		}

		if ( !element.length ) {
			element = this.document[0].body;
		}

		return element;
	},

	_initSource: function() {
		var array, url,
			that = this;
		if ( $.isArray(this.options.source) ) {
			array = this.options.source;
			this.source = function( request, response ) {
				response( $.ui.autocomplete.filter( array, request.term ) );
			};
		} else if ( typeof this.options.source === "string" ) {
			url = this.options.source;
			this.source = function( request, response ) {
				if ( that.xhr ) {
					that.xhr.abort();
				}
				that.xhr = $.ajax({
					url: url,
					data: request,
					dataType: "json",
					success: function( data ) {
						response( data );
					},
					error: function() {
						response( [] );
					}
				});
			};
		} else {
			this.source = this.options.source;
		}
	},

	_searchTimeout: function( event ) {
		clearTimeout( this.searching );
		this.searching = this._delay(function() {
			// only search if the value has changed
			if ( this.term !== this._value() ) {
				this.selectedItem = null;
				this.search( null, event );
			}
		}, this.options.delay );
	},

	search: function( value, event ) {
		value = value != null ? value : this._value();

		// always save the actual value, not the one passed as an argument
		this.term = this._value();

		if ( value.length < this.options.minLength ) {
			return this.close( event );
		}

		if ( this._trigger( "search", event ) === false ) {
			return;
		}

		return this._search( value );
	},

	_search: function( value ) {
		this.pending++;
		this.element.addClass( "ui-autocomplete-loading" );
		this.cancelSearch = false;

		this.source( { term: value }, this._response() );
	},

	_response: function() {
		var index = ++this.requestIndex;

		return $.proxy(function( content ) {
			if ( index === this.requestIndex ) {
				this.__response( content );
			}

			this.pending--;
			if ( !this.pending ) {
				this.element.removeClass( "ui-autocomplete-loading" );
			}
		}, this );
	},

	__response: function( content ) {
		if ( content ) {
			content = this._normalize( content );
		}
		this._trigger( "response", null, { content: content } );
		if ( !this.options.disabled && content && content.length && !this.cancelSearch ) {
			this._suggest( content );
			this._trigger( "open" );
		} else {
			// use ._close() instead of .close() so we don't cancel future searches
			this._close();
		}
	},

	close: function( event ) {
		this.cancelSearch = true;
		this._close( event );
	},

	_close: function( event ) {
		if ( this.menu.element.is( ":visible" ) ) {
			this.menu.element.hide();
			this.menu.blur();
			this.isNewMenu = true;
			this._trigger( "close", event );
		}
	},

	_change: function( event ) {
		if ( this.previous !== this._value() ) {
			this._trigger( "change", event, { item: this.selectedItem } );
		}
	},

	_normalize: function( items ) {
		// assume all items have the right format when the first item is complete
		if ( items.length && items[0].label && items[0].value ) {
			return items;
		}
		return $.map( items, function( item ) {
			if ( typeof item === "string" ) {
				return {
					label: item,
					value: item
				};
			}
			return $.extend({
				label: item.label || item.value,
				value: item.value || item.label
			}, item );
		});
	},

	_suggest: function( items ) {
		var ul = this.menu.element.empty();
		this._renderMenu( ul, items );
		this.isNewMenu = true;
		this.menu.refresh();

		// size and position menu
		ul.show();
		this._resizeMenu();
		ul.position( $.extend({
			of: this.element
		}, this.options.position ));

		if ( this.options.autoFocus ) {
			this.menu.next();
		}
	},

	_resizeMenu: function() {
		var ul = this.menu.element;
		ul.outerWidth( Math.max(
			// Firefox wraps long text (possibly a rounding bug)
			// so we add 1px to avoid the wrapping (#7513)
			ul.width( "" ).outerWidth() + 1,
			this.element.outerWidth()
		) );
	},

	_renderMenu: function( ul, items ) {
		var that = this;
		$.each( items, function( index, item ) {
			that._renderItemData( ul, item );
		});
	},

	_renderItemData: function( ul, item ) {
		return this._renderItem( ul, item ).data( "ui-autocomplete-item", item );
	},

	_renderItem: function( ul, item ) {
		return $( "<li>" )
			.append( $( "<a>" ).text( item.label ) )
			.appendTo( ul );
	},

	_move: function( direction, event ) {
		if ( !this.menu.element.is( ":visible" ) ) {
			this.search( null, event );
			return;
		}
		if ( this.menu.isFirstItem() && /^previous/.test( direction ) ||
				this.menu.isLastItem() && /^next/.test( direction ) ) {
			this._value( this.term );
			this.menu.blur();
			return;
		}
		this.menu[ direction ]( event );
	},

	widget: function() {
		return this.menu.element;
	},

	_value: function() {
		return this.valueMethod.apply( this.element, arguments );
	},

	_keyEvent: function( keyEvent, event ) {
		if ( !this.isMultiLine || this.menu.element.is( ":visible" ) ) {
			this._move( keyEvent, event );

			// prevents moving cursor to beginning/end of the text field in some browsers
			event.preventDefault();
		}
	}
});

$.extend( $.ui.autocomplete, {
	escapeRegex: function( value ) {
		return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
	},
	filter: function(array, term) {
		var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
		return $.grep( array, function(value) {
			return matcher.test( value.label || value.value || value );
		});
	}
});


// live region extension, adding a `messages` option
// NOTE: This is an experimental API. We are still investigating
// a full solution for string manipulation and internationalization.
$.widget( "ui.autocomplete", $.ui.autocomplete, {
	options: {
		messages: {
			noResults: "No search results.",
			results: function( amount ) {
				return amount + ( amount > 1 ? " results are" : " result is" ) +
					" available, use up and down arrow keys to navigate.";
			}
		}
	},

	__response: function( content ) {
		var message;
		this._superApply( arguments );
		if ( this.options.disabled || this.cancelSearch ) {
			return;
		}
		if ( content && content.length ) {
			message = this.options.messages.results( content.length );
		} else {
			message = this.options.messages.noResults;
		}
		this.liveRegion.text( message );
	}
});

}( jQuery ));

},{"./core":"jquery-ui/core","./menu":"jquery-ui/menu","./position":"jquery-ui/position","./widget":"jquery-ui/widget","jquery":"jquery"}],"jquery-ui/button":[function(require,module,exports){
var jQuery = require('jquery');
require('./core');
require('./widget');

/*!
 * jQuery UI Button 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/button/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

var lastActive,
	baseClasses = "ui-button ui-widget ui-state-default ui-corner-all",
	typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
	formResetHandler = function() {
		var form = $( this );
		setTimeout(function() {
			form.find( ":ui-button" ).button( "refresh" );
		}, 1 );
	},
	radioGroup = function( radio ) {
		var name = radio.name,
			form = radio.form,
			radios = $( [] );
		if ( name ) {
			name = name.replace( /'/g, "\\'" );
			if ( form ) {
				radios = $( form ).find( "[name='" + name + "']" );
			} else {
				radios = $( "[name='" + name + "']", radio.ownerDocument )
					.filter(function() {
						return !this.form;
					});
			}
		}
		return radios;
	};

$.widget( "ui.button", {
	version: "1.10.4",
	defaultElement: "<button>",
	options: {
		disabled: null,
		text: true,
		label: null,
		icons: {
			primary: null,
			secondary: null
		}
	},
	_create: function() {
		this.element.closest( "form" )
			.unbind( "reset" + this.eventNamespace )
			.bind( "reset" + this.eventNamespace, formResetHandler );

		if ( typeof this.options.disabled !== "boolean" ) {
			this.options.disabled = !!this.element.prop( "disabled" );
		} else {
			this.element.prop( "disabled", this.options.disabled );
		}

		this._determineButtonType();
		this.hasTitle = !!this.buttonElement.attr( "title" );

		var that = this,
			options = this.options,
			toggleButton = this.type === "checkbox" || this.type === "radio",
			activeClass = !toggleButton ? "ui-state-active" : "";

		if ( options.label === null ) {
			options.label = (this.type === "input" ? this.buttonElement.val() : this.buttonElement.html());
		}

		this._hoverable( this.buttonElement );

		this.buttonElement
			.addClass( baseClasses )
			.attr( "role", "button" )
			.bind( "mouseenter" + this.eventNamespace, function() {
				if ( options.disabled ) {
					return;
				}
				if ( this === lastActive ) {
					$( this ).addClass( "ui-state-active" );
				}
			})
			.bind( "mouseleave" + this.eventNamespace, function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).removeClass( activeClass );
			})
			.bind( "click" + this.eventNamespace, function( event ) {
				if ( options.disabled ) {
					event.preventDefault();
					event.stopImmediatePropagation();
				}
			});

		// Can't use _focusable() because the element that receives focus
		// and the element that gets the ui-state-focus class are different
		this._on({
			focus: function() {
				this.buttonElement.addClass( "ui-state-focus" );
			},
			blur: function() {
				this.buttonElement.removeClass( "ui-state-focus" );
			}
		});

		if ( toggleButton ) {
			this.element.bind( "change" + this.eventNamespace, function() {
				that.refresh();
			});
		}

		if ( this.type === "checkbox" ) {
			this.buttonElement.bind( "click" + this.eventNamespace, function() {
				if ( options.disabled ) {
					return false;
				}
			});
		} else if ( this.type === "radio" ) {
			this.buttonElement.bind( "click" + this.eventNamespace, function() {
				if ( options.disabled ) {
					return false;
				}
				$( this ).addClass( "ui-state-active" );
				that.buttonElement.attr( "aria-pressed", "true" );

				var radio = that.element[ 0 ];
				radioGroup( radio )
					.not( radio )
					.map(function() {
						return $( this ).button( "widget" )[ 0 ];
					})
					.removeClass( "ui-state-active" )
					.attr( "aria-pressed", "false" );
			});
		} else {
			this.buttonElement
				.bind( "mousedown" + this.eventNamespace, function() {
					if ( options.disabled ) {
						return false;
					}
					$( this ).addClass( "ui-state-active" );
					lastActive = this;
					that.document.one( "mouseup", function() {
						lastActive = null;
					});
				})
				.bind( "mouseup" + this.eventNamespace, function() {
					if ( options.disabled ) {
						return false;
					}
					$( this ).removeClass( "ui-state-active" );
				})
				.bind( "keydown" + this.eventNamespace, function(event) {
					if ( options.disabled ) {
						return false;
					}
					if ( event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.ENTER ) {
						$( this ).addClass( "ui-state-active" );
					}
				})
				// see #8559, we bind to blur here in case the button element loses
				// focus between keydown and keyup, it would be left in an "active" state
				.bind( "keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
					$( this ).removeClass( "ui-state-active" );
				});

			if ( this.buttonElement.is("a") ) {
				this.buttonElement.keyup(function(event) {
					if ( event.keyCode === $.ui.keyCode.SPACE ) {
						// TODO pass through original event correctly (just as 2nd argument doesn't work)
						$( this ).click();
					}
				});
			}
		}

		// TODO: pull out $.Widget's handling for the disabled option into
		// $.Widget.prototype._setOptionDisabled so it's easy to proxy and can
		// be overridden by individual plugins
		this._setOption( "disabled", options.disabled );
		this._resetButton();
	},

	_determineButtonType: function() {
		var ancestor, labelSelector, checked;

		if ( this.element.is("[type=checkbox]") ) {
			this.type = "checkbox";
		} else if ( this.element.is("[type=radio]") ) {
			this.type = "radio";
		} else if ( this.element.is("input") ) {
			this.type = "input";
		} else {
			this.type = "button";
		}

		if ( this.type === "checkbox" || this.type === "radio" ) {
			// we don't search against the document in case the element
			// is disconnected from the DOM
			ancestor = this.element.parents().last();
			labelSelector = "label[for='" + this.element.attr("id") + "']";
			this.buttonElement = ancestor.find( labelSelector );
			if ( !this.buttonElement.length ) {
				ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings();
				this.buttonElement = ancestor.filter( labelSelector );
				if ( !this.buttonElement.length ) {
					this.buttonElement = ancestor.find( labelSelector );
				}
			}
			this.element.addClass( "ui-helper-hidden-accessible" );

			checked = this.element.is( ":checked" );
			if ( checked ) {
				this.buttonElement.addClass( "ui-state-active" );
			}
			this.buttonElement.prop( "aria-pressed", checked );
		} else {
			this.buttonElement = this.element;
		}
	},

	widget: function() {
		return this.buttonElement;
	},

	_destroy: function() {
		this.element
			.removeClass( "ui-helper-hidden-accessible" );
		this.buttonElement
			.removeClass( baseClasses + " ui-state-active " + typeClasses )
			.removeAttr( "role" )
			.removeAttr( "aria-pressed" )
			.html( this.buttonElement.find(".ui-button-text").html() );

		if ( !this.hasTitle ) {
			this.buttonElement.removeAttr( "title" );
		}
	},

	_setOption: function( key, value ) {
		this._super( key, value );
		if ( key === "disabled" ) {
			this.element.prop( "disabled", !!value );
			if ( value ) {
				this.buttonElement.removeClass( "ui-state-focus" );
			}
			return;
		}
		this._resetButton();
	},

	refresh: function() {
		//See #8237 & #8828
		var isDisabled = this.element.is( "input, button" ) ? this.element.is( ":disabled" ) : this.element.hasClass( "ui-button-disabled" );

		if ( isDisabled !== this.options.disabled ) {
			this._setOption( "disabled", isDisabled );
		}
		if ( this.type === "radio" ) {
			radioGroup( this.element[0] ).each(function() {
				if ( $( this ).is( ":checked" ) ) {
					$( this ).button( "widget" )
						.addClass( "ui-state-active" )
						.attr( "aria-pressed", "true" );
				} else {
					$( this ).button( "widget" )
						.removeClass( "ui-state-active" )
						.attr( "aria-pressed", "false" );
				}
			});
		} else if ( this.type === "checkbox" ) {
			if ( this.element.is( ":checked" ) ) {
				this.buttonElement
					.addClass( "ui-state-active" )
					.attr( "aria-pressed", "true" );
			} else {
				this.buttonElement
					.removeClass( "ui-state-active" )
					.attr( "aria-pressed", "false" );
			}
		}
	},

	_resetButton: function() {
		if ( this.type === "input" ) {
			if ( this.options.label ) {
				this.element.val( this.options.label );
			}
			return;
		}
		var buttonElement = this.buttonElement.removeClass( typeClasses ),
			buttonText = $( "<span></span>", this.document[0] )
				.addClass( "ui-button-text" )
				.html( this.options.label )
				.appendTo( buttonElement.empty() )
				.text(),
			icons = this.options.icons,
			multipleIcons = icons.primary && icons.secondary,
			buttonClasses = [];

		if ( icons.primary || icons.secondary ) {
			if ( this.options.text ) {
				buttonClasses.push( "ui-button-text-icon" + ( multipleIcons ? "s" : ( icons.primary ? "-primary" : "-secondary" ) ) );
			}

			if ( icons.primary ) {
				buttonElement.prepend( "<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>" );
			}

			if ( icons.secondary ) {
				buttonElement.append( "<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>" );
			}

			if ( !this.options.text ) {
				buttonClasses.push( multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only" );

				if ( !this.hasTitle ) {
					buttonElement.attr( "title", $.trim( buttonText ) );
				}
			}
		} else {
			buttonClasses.push( "ui-button-text-only" );
		}
		buttonElement.addClass( buttonClasses.join( " " ) );
	}
});

$.widget( "ui.buttonset", {
	version: "1.10.4",
	options: {
		items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
	},

	_create: function() {
		this.element.addClass( "ui-buttonset" );
	},

	_init: function() {
		this.refresh();
	},

	_setOption: function( key, value ) {
		if ( key === "disabled" ) {
			this.buttons.button( "option", key, value );
		}

		this._super( key, value );
	},

	refresh: function() {
		var rtl = this.element.css( "direction" ) === "rtl";

		this.buttons = this.element.find( this.options.items )
			.filter( ":ui-button" )
				.button( "refresh" )
			.end()
			.not( ":ui-button" )
				.button()
			.end()
			.map(function() {
				return $( this ).button( "widget" )[ 0 ];
			})
				.removeClass( "ui-corner-all ui-corner-left ui-corner-right" )
				.filter( ":first" )
					.addClass( rtl ? "ui-corner-right" : "ui-corner-left" )
				.end()
				.filter( ":last" )
					.addClass( rtl ? "ui-corner-left" : "ui-corner-right" )
				.end()
			.end();
	},

	_destroy: function() {
		this.element.removeClass( "ui-buttonset" );
		this.buttons
			.map(function() {
				return $( this ).button( "widget" )[ 0 ];
			})
				.removeClass( "ui-corner-left ui-corner-right" )
			.end()
			.button( "destroy" );
	}
});

}( jQuery ) );

},{"./core":"jquery-ui/core","./widget":"jquery-ui/widget","jquery":"jquery"}],"jquery-ui/core":[function(require,module,exports){
var jQuery = require('jquery');

/*!
 * jQuery UI Core 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
(function( $, undefined ) {

var uuid = 0,
	runiqueId = /^ui-id-\d+$/;

// $.ui might exist from components with no dependencies, e.g., $.ui.position
$.ui = $.ui || {};

$.extend( $.ui, {
	version: "1.10.4",

	keyCode: {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
});

// plugins
$.fn.extend({
	focus: (function( orig ) {
		return function( delay, fn ) {
			return typeof delay === "number" ?
				this.each(function() {
					var elem = this;
					setTimeout(function() {
						$( elem ).focus();
						if ( fn ) {
							fn.call( elem );
						}
					}, delay );
				}) :
				orig.apply( this, arguments );
		};
	})( $.fn.focus ),

	scrollParent: function() {
		var scrollParent;
		if (($.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test($.css(this,"position")) && (/(auto|scroll)/).test($.css(this,"overflow")+$.css(this,"overflow-y")+$.css(this,"overflow-x"));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test($.css(this,"overflow")+$.css(this,"overflow-y")+$.css(this,"overflow-x"));
			}).eq(0);
		}

		return (/fixed/).test(this.css("position")) || !scrollParent.length ? $(document) : scrollParent;
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	},

	uniqueId: function() {
		return this.each(function() {
			if ( !this.id ) {
				this.id = "ui-id-" + (++uuid);
			}
		});
	},

	removeUniqueId: function() {
		return this.each(function() {
			if ( runiqueId.test( this.id ) ) {
				$( this ).removeAttr( "id" );
			}
		});
	}
});

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var map, mapName, img,
		nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		map = element.parentNode;
		mapName = map.name;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap=#" + mapName + "]" )[0];
		return !!img && visible( img );
	}
	return ( /input|select|textarea|button|object/.test( nodeName ) ?
		!element.disabled :
		"a" === nodeName ?
			element.href || isTabIndexNotNaN :
			isTabIndexNotNaN) &&
		// the element and all of its ancestors must be visible
		visible( element );
}

function visible( element ) {
	return $.expr.filters.visible( element ) &&
		!$( element ).parents().addBack().filter(function() {
			return $.css( this, "visibility" ) === "hidden";
		}).length;
}

$.extend( $.expr[ ":" ], {
	data: $.expr.createPseudo ?
		$.expr.createPseudo(function( dataName ) {
			return function( elem ) {
				return !!$.data( elem, dataName );
			};
		}) :
		// support: jQuery <1.8
		function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support: jQuery <1.8
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
	$.each( [ "Width", "Height" ], function( i, name ) {
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
			type = name.toLowerCase(),
			orig = {
				innerWidth: $.fn.innerWidth,
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,
				outerHeight: $.fn.outerHeight
			};

		function reduce( elem, size, border, margin ) {
			$.each( side, function() {
				size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
				if ( border ) {
					size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
				}
				if ( margin ) {
					size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
				}
			});
			return size;
		}

		$.fn[ "inner" + name ] = function( size ) {
			if ( size === undefined ) {
				return orig[ "inner" + name ].call( this );
			}

			return this.each(function() {
				$( this ).css( type, reduce( this, size ) + "px" );
			});
		};

		$.fn[ "outer" + name] = function( size, margin ) {
			if ( typeof size !== "number" ) {
				return orig[ "outer" + name ].call( this, size );
			}

			return this.each(function() {
				$( this).css( type, reduce( this, size, true, margin ) + "px" );
			});
		};
	});
}

// support: jQuery <1.8
if ( !$.fn.addBack ) {
	$.fn.addBack = function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	};
}

// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {
	$.fn.removeData = (function( removeData ) {
		return function( key ) {
			if ( arguments.length ) {
				return removeData.call( this, $.camelCase( key ) );
			} else {
				return removeData.call( this );
			}
		};
	})( $.fn.removeData );
}





// deprecated
$.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );

$.support.selectstart = "onselectstart" in document.createElement( "div" );
$.fn.extend({
	disableSelection: function() {
		return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
			".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
	},

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	}
});

$.extend( $.ui, {
	// $.ui.plugin is deprecated. Use $.widget() extensions instead.
	plugin: {
		add: function( module, option, set ) {
			var i,
				proto = $.ui[ module ].prototype;
			for ( i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args ) {
			var i,
				set = instance.plugins[ name ];
			if ( !set || !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) {
				return;
			}

			for ( i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	},

	// only used by resizable
	hasScroll: function( el, a ) {

		//If overflow is hidden, the element might have extra content, but the user wants to hide it
		if ( $( el ).css( "overflow" ) === "hidden") {
			return false;
		}

		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
			has = false;

		if ( el[ scroll ] > 0 ) {
			return true;
		}

		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[ scroll ] = 1;
		has = ( el[ scroll ] > 0 );
		el[ scroll ] = 0;
		return has;
	}
});

})( jQuery );

},{"jquery":"jquery"}],"jquery-ui/datepicker":[function(require,module,exports){
var jQuery = require('jquery');
require('./core');

/*!
 * jQuery UI Datepicker 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/datepicker/
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function( $, undefined ) {

$.extend($.ui, { datepicker: { version: "1.10.4" } });

var PROP_NAME = "datepicker",
	instActive;

/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this._curInst = null; // The current instance in use
	this._keyEvent = false; // If the last event was a key event
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = "ui-datepicker-div"; // The ID of the main datepicker division
	this._inlineClass = "ui-datepicker-inline"; // The name of the inline marker class
	this._appendClass = "ui-datepicker-append"; // The name of the append marker class
	this._triggerClass = "ui-datepicker-trigger"; // The name of the trigger marker class
	this._dialogClass = "ui-datepicker-dialog"; // The name of the dialog marker class
	this._disableClass = "ui-datepicker-disabled"; // The name of the disabled covering marker class
	this._unselectableClass = "ui-datepicker-unselectable"; // The name of the unselectable cell marker class
	this._currentClass = "ui-datepicker-current-day"; // The name of the current day marker class
	this._dayOverClass = "ui-datepicker-days-cell-over"; // The name of the day hover marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[""] = { // Default regional settings
		closeText: "Done", // Display text for close link
		prevText: "Prev", // Display text for previous month link
		nextText: "Next", // Display text for next month link
		currentText: "Today", // Display text for current month link
		monthNames: ["January","February","March","April","May","June",
			"July","August","September","October","November","December"], // Names of months for drop-down and formatting
		monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // For formatting
		dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // For formatting
		dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
		dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"], // Column headings for days starting at Sunday
		weekHeader: "Wk", // Column header for week of the year
		dateFormat: "mm/dd/yy", // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		isRTL: false, // True if right-to-left language, false if left-to-right
		showMonthAfterYear: false, // True if the year select precedes month, false for month then year
		yearSuffix: "" // Additional text to append to the year in the month headers
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: "focus", // "focus" for popup on focus,
			// "button" for trigger button, or "both" for either
		showAnim: "fadeIn", // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
		appendText: "", // Display text following the input box, e.g. showing the format
		buttonText: "...", // Text for trigger button
		buttonImage: "", // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: false, // True if month can be selected directly, false if only prev/next
		changeYear: false, // True if year can be selected directly, false if only prev/next
		yearRange: "c-10:c+10", // Range of years to display in drop-down,
			// either relative to today's year (-nn:+nn), relative to currently displayed year
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
		showWeek: false, // True to show week of the year, false to not show it
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
		shortYearCutoff: "+10", // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with "+" for current year + value
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: "fast", // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		altField: "", // Selector for an alternate field to store selected dates into
		altFormat: "", // The date format to use for the alternate field
		constrainInput: true, // The input is constrained by the current date format
		showButtonPanel: false, // True to show button panel, false to not show it
		autoSize: false, // True to size the input for the date format, false to leave as is
		disabled: false // The initial disabled state
	};
	$.extend(this._defaults, this.regional[""]);
	this.dpDiv = bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: "hasDatepicker",

	//Keep track of the maximum number of rows displayed (see #7043)
	maxRows: 4,

	// TODO rename to "widget" when switching to widget factory
	_widgetDatepicker: function() {
		return this.dpDiv;
	},

	/* Override the default settings for all instances of the date picker.
	 * @param  settings  object - the new settings to use as defaults (anonymous object)
	 * @return the manager object
	 */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 * @param  settings  object - the new settings to use for this date picker instance (anonymous)
	 */
	_attachDatepicker: function(target, settings) {
		var nodeName, inline, inst;
		nodeName = target.nodeName.toLowerCase();
		inline = (nodeName === "div" || nodeName === "span");
		if (!target.id) {
			this.uuid += 1;
			target.id = "dp" + this.uuid;
		}
		inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {});
		if (nodeName === "input") {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function(target, inline) {
		var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); // escape jQuery meta chars
		return {id: id, input: target, // associated target
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
			drawMonth: 0, drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: (!inline ? this.dpDiv : // presentation div
			bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName)) {
			return;
		}
		this._attachments(input, inst);
		input.addClass(this.markerClassName).keydown(this._doKeyDown).
			keypress(this._doKeyPress).keyup(this._doKeyUp);
		this._autoSize(inst);
		$.data(target, PROP_NAME, inst);
		//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
	},

	/* Make attachments based on settings. */
	_attachments: function(input, inst) {
		var showOn, buttonText, buttonImage,
			appendText = this._get(inst, "appendText"),
			isRTL = this._get(inst, "isRTL");

		if (inst.append) {
			inst.append.remove();
		}
		if (appendText) {
			inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");
			input[isRTL ? "before" : "after"](inst.append);
		}

		input.unbind("focus", this._showDatepicker);

		if (inst.trigger) {
			inst.trigger.remove();
		}

		showOn = this._get(inst, "showOn");
		if (showOn === "focus" || showOn === "both") { // pop-up date picker when in the marked field
			input.focus(this._showDatepicker);
		}
		if (showOn === "button" || showOn === "both") { // pop-up date picker when button clicked
			buttonText = this._get(inst, "buttonText");
			buttonImage = this._get(inst, "buttonImage");
			inst.trigger = $(this._get(inst, "buttonImageOnly") ?
				$("<img/>").addClass(this._triggerClass).
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
				$("<button type='button'></button>").addClass(this._triggerClass).
					html(!buttonImage ? buttonText : $("<img/>").attr(
					{ src:buttonImage, alt:buttonText, title:buttonText })));
			input[isRTL ? "before" : "after"](inst.trigger);
			inst.trigger.click(function() {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
					$.datepicker._hideDatepicker();
				} else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
					$.datepicker._hideDatepicker();
					$.datepicker._showDatepicker(input[0]);
				} else {
					$.datepicker._showDatepicker(input[0]);
				}
				return false;
			});
		}
	},

	/* Apply the maximum length for the date format. */
	_autoSize: function(inst) {
		if (this._get(inst, "autoSize") && !inst.inline) {
			var findMax, max, maxI, i,
				date = new Date(2009, 12 - 1, 20), // Ensure double digits
				dateFormat = this._get(inst, "dateFormat");

			if (dateFormat.match(/[DM]/)) {
				findMax = function(names) {
					max = 0;
					maxI = 0;
					for (i = 0; i < names.length; i++) {
						if (names[i].length > max) {
							max = names[i].length;
							maxI = i;
						}
					}
					return maxI;
				};
				date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
					"monthNames" : "monthNamesShort"))));
				date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
					"dayNames" : "dayNamesShort"))) + 20 - date.getDay());
			}
			inst.input.attr("size", this._formatDate(inst, date).length);
		}
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName)) {
			return;
		}
		divSpan.addClass(this.markerClassName).append(inst.dpDiv);
		$.data(target, PROP_NAME, inst);
		this._setDate(inst, this._getDefaultDate(inst), true);
		this._updateDatepicker(inst);
		this._updateAlternate(inst);
		//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
		// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
		// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
		inst.dpDiv.css( "display", "block" );
	},

	/* Pop-up the date picker in a "dialog" box.
	 * @param  input element - ignored
	 * @param  date	string or Date - the initial date to display
	 * @param  onSelect  function - the function to call when a date is selected
	 * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	 * @param  pos int[2] - coordinates for the dialog's position within the screen or
	 *					event - with x/y coordinates or
	 *					leave empty for default (screen centre)
	 * @return the manager object
	 */
	_dialogDatepicker: function(input, date, onSelect, settings, pos) {
		var id, browserWidth, browserHeight, scrollX, scrollY,
			inst = this._dialogInst; // internal instance

		if (!inst) {
			this.uuid += 1;
			id = "dp" + this.uuid;
			this._dialogInput = $("<input type='text' id='" + id +
				"' style='position: absolute; top: -100px; width: 0px;'/>");
			this._dialogInput.keydown(this._doKeyDown);
			$("body").append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], PROP_NAME, inst);
		}
		extendRemove(inst.settings, settings || {});
		date = (date && date.constructor === Date ? this._formatDate(inst, date) : date);
		this._dialogInput.val(date);

		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			browserWidth = document.documentElement.clientWidth;
			browserHeight = document.documentElement.clientHeight;
			scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
		}

		// move input on screen for focus, but hidden behind dialog
		this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI) {
			$.blockUI(this.dpDiv);
		}
		$.data(this._dialogInput[0], PROP_NAME, inst);
		return this;
	},

	/* Detach a datepicker from its control.
	 * @param  target	element - the target input field or division or span
	 */
	_destroyDatepicker: function(target) {
		var nodeName,
			$target = $(target),
			inst = $.data(target, PROP_NAME);

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		$.removeData(target, PROP_NAME);
		if (nodeName === "input") {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).
				unbind("focus", this._showDatepicker).
				unbind("keydown", this._doKeyDown).
				unbind("keypress", this._doKeyPress).
				unbind("keyup", this._doKeyUp);
		} else if (nodeName === "div" || nodeName === "span") {
			$target.removeClass(this.markerClassName).empty();
		}
	},

	/* Enable the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 */
	_enableDatepicker: function(target) {
		var nodeName, inline,
			$target = $(target),
			inst = $.data(target, PROP_NAME);

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		if (nodeName === "input") {
			target.disabled = false;
			inst.trigger.filter("button").
				each(function() { this.disabled = false; }).end().
				filter("img").css({opacity: "1.0", cursor: ""});
		} else if (nodeName === "div" || nodeName === "span") {
			inline = $target.children("." + this._inlineClass);
			inline.children().removeClass("ui-state-disabled");
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
				prop("disabled", false);
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value === target ? null : value); }); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 */
	_disableDatepicker: function(target) {
		var nodeName, inline,
			$target = $(target),
			inst = $.data(target, PROP_NAME);

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		if (nodeName === "input") {
			target.disabled = true;
			inst.trigger.filter("button").
				each(function() { this.disabled = true; }).end().
				filter("img").css({opacity: "0.5", cursor: "default"});
		} else if (nodeName === "div" || nodeName === "span") {
			inline = $target.children("." + this._inlineClass);
			inline.children().addClass("ui-state-disabled");
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
				prop("disabled", true);
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value === target ? null : value); }); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	 * @param  target	element - the target input field or division or span
	 * @return boolean - true if disabled, false if enabled
	 */
	_isDisabledDatepicker: function(target) {
		if (!target) {
			return false;
		}
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] === target) {
				return true;
			}
		}
		return false;
	},

	/* Retrieve the instance data for the target control.
	 * @param  target  element - the target input field or division or span
	 * @return  object - the associated instance data
	 * @throws  error if a jQuery problem getting data
	 */
	_getInst: function(target) {
		try {
			return $.data(target, PROP_NAME);
		}
		catch (err) {
			throw "Missing instance data for this datepicker";
		}
	},

	/* Update or retrieve the settings for a date picker attached to an input field or division.
	 * @param  target  element - the target input field or division or span
	 * @param  name	object - the new settings to update or
	 *				string - the name of the setting to change or retrieve,
	 *				when retrieving also "all" for all instance settings or
	 *				"defaults" for all global defaults
	 * @param  value   any - the new value for the setting
	 *				(omit if above is an object or to retrieve a value)
	 */
	_optionDatepicker: function(target, name, value) {
		var settings, date, minDate, maxDate,
			inst = this._getInst(target);

		if (arguments.length === 2 && typeof name === "string") {
			return (name === "defaults" ? $.extend({}, $.datepicker._defaults) :
				(inst ? (name === "all" ? $.extend({}, inst.settings) :
				this._get(inst, name)) : null));
		}

		settings = name || {};
		if (typeof name === "string") {
			settings = {};
			settings[name] = value;
		}

		if (inst) {
			if (this._curInst === inst) {
				this._hideDatepicker();
			}

			date = this._getDateDatepicker(target, true);
			minDate = this._getMinMaxDate(inst, "min");
			maxDate = this._getMinMaxDate(inst, "max");
			extendRemove(inst.settings, settings);
			// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
			if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
				inst.settings.minDate = this._formatDate(inst, minDate);
			}
			if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
				inst.settings.maxDate = this._formatDate(inst, maxDate);
			}
			if ( "disabled" in settings ) {
				if ( settings.disabled ) {
					this._disableDatepicker(target);
				} else {
					this._enableDatepicker(target);
				}
			}
			this._attachments($(target), inst);
			this._autoSize(inst);
			this._setDate(inst, date);
			this._updateAlternate(inst);
			this._updateDatepicker(inst);
		}
	},

	// change method deprecated
	_changeDatepicker: function(target, name, value) {
		this._optionDatepicker(target, name, value);
	},

	/* Redraw the date picker attached to an input field or division.
	 * @param  target  element - the target input field or division or span
	 */
	_refreshDatepicker: function(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
	 * @param  target element - the target input field or division or span
	 * @param  date	Date - the new date
	 */
	_setDateDatepicker: function(target, date) {
		var inst = this._getInst(target);
		if (inst) {
			this._setDate(inst, date);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
		}
	},

	/* Get the date(s) for the first entry in a jQuery selection.
	 * @param  target element - the target input field or division or span
	 * @param  noDefault boolean - true if no default date is to be used
	 * @return Date - the current date
	 */
	_getDateDatepicker: function(target, noDefault) {
		var inst = this._getInst(target);
		if (inst && !inst.inline) {
			this._setDateFromField(inst, noDefault);
		}
		return (inst ? this._getDate(inst) : null);
	},

	/* Handle keystrokes. */
	_doKeyDown: function(event) {
		var onSelect, dateStr, sel,
			inst = $.datepicker._getInst(event.target),
			handled = true,
			isRTL = inst.dpDiv.is(".ui-datepicker-rtl");

		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing) {
			switch (event.keyCode) {
				case 9: $.datepicker._hideDatepicker();
						handled = false;
						break; // hide on tab out
				case 13: sel = $("td." + $.datepicker._dayOverClass + ":not(." +
									$.datepicker._currentClass + ")", inst.dpDiv);
						if (sel[0]) {
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
						}

						onSelect = $.datepicker._get(inst, "onSelect");
						if (onSelect) {
							dateStr = $.datepicker._formatDate(inst);

							// trigger custom callback
							onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
						} else {
							$.datepicker._hideDatepicker();
						}

						return false; // don't submit the form
				case 27: $.datepicker._hideDatepicker();
						break; // hide on escape
				case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.datepicker._get(inst, "stepBigMonths") :
							-$.datepicker._get(inst, "stepMonths")), "M");
						break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.datepicker._get(inst, "stepBigMonths") :
							+$.datepicker._get(inst, "stepMonths")), "M");
						break; // next month/year on page down/+ ctrl
				case 35: if (event.ctrlKey || event.metaKey) {
							$.datepicker._clearDate(event.target);
						}
						handled = event.ctrlKey || event.metaKey;
						break; // clear on ctrl or command +end
				case 36: if (event.ctrlKey || event.metaKey) {
							$.datepicker._gotoToday(event.target);
						}
						handled = event.ctrlKey || event.metaKey;
						break; // current on ctrl or command +home
				case 37: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D");
						}
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command +left
						if (event.originalEvent.altKey) {
							$.datepicker._adjustDate(event.target, (event.ctrlKey ?
								-$.datepicker._get(inst, "stepBigMonths") :
								-$.datepicker._get(inst, "stepMonths")), "M");
						}
						// next month/year on alt +left on Mac
						break;
				case 38: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, -7, "D");
						}
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command +up
				case 39: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D");
						}
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command +right
						if (event.originalEvent.altKey) {
							$.datepicker._adjustDate(event.target, (event.ctrlKey ?
								+$.datepicker._get(inst, "stepBigMonths") :
								+$.datepicker._get(inst, "stepMonths")), "M");
						}
						// next month/year on alt +right
						break;
				case 40: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, +7, "D");
						}
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command +down
				default: handled = false;
			}
		} else if (event.keyCode === 36 && event.ctrlKey) { // display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		} else {
			handled = false;
		}

		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function(event) {
		var chars, chr,
			inst = $.datepicker._getInst(event.target);

		if ($.datepicker._get(inst, "constrainInput")) {
			chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
			chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);
			return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1);
		}
	},

	/* Synchronise manual entry and field/alternate field. */
	_doKeyUp: function(event) {
		var date,
			inst = $.datepicker._getInst(event.target);

		if (inst.input.val() !== inst.lastVal) {
			try {
				date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
					(inst.input ? inst.input.val() : null),
					$.datepicker._getFormatConfig(inst));

				if (date) { // only if valid
					$.datepicker._setDateFromField(inst);
					$.datepicker._updateAlternate(inst);
					$.datepicker._updateDatepicker(inst);
				}
			}
			catch (err) {
			}
		}
		return true;
	},

	/* Pop-up the date picker for a given input field.
	 * If false returned from beforeShow event handler do not show.
	 * @param  input  element - the input field attached to the date picker or
	 *					event - if triggered by focus
	 */
	_showDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() !== "input") { // find from button/image trigger
			input = $("input", input.parentNode)[0];
		}

		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) { // already here
			return;
		}

		var inst, beforeShow, beforeShowSettings, isFixed,
			offset, showAnim, duration;

		inst = $.datepicker._getInst(input);
		if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
			$.datepicker._curInst.dpDiv.stop(true, true);
			if ( inst && $.datepicker._datepickerShowing ) {
				$.datepicker._hideDatepicker( $.datepicker._curInst.input[0] );
			}
		}

		beforeShow = $.datepicker._get(inst, "beforeShow");
		beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
		if(beforeShowSettings === false){
			return;
		}
		extendRemove(inst.settings, beforeShowSettings);

		inst.lastVal = null;
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);

		if ($.datepicker._inDialog) { // hide cursor
			input.value = "";
		}
		if (!$.datepicker._pos) { // position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}

		isFixed = false;
		$(input).parents().each(function() {
			isFixed |= $(this).css("position") === "fixed";
			return !isFixed;
		});

		offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
		$.datepicker._pos = null;
		//to avoid flashes on Firefox
		inst.dpDiv.empty();
		// determine sizing offscreen
		inst.dpDiv.css({position: "absolute", display: "block", top: "-1000px"});
		$.datepicker._updateDatepicker(inst);
		// fix width for dynamic number of date pickers
		// and adjust position before showing
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
			"static" : (isFixed ? "fixed" : "absolute")), display: "none",
			left: offset.left + "px", top: offset.top + "px"});

		if (!inst.inline) {
			showAnim = $.datepicker._get(inst, "showAnim");
			duration = $.datepicker._get(inst, "duration");
			inst.dpDiv.zIndex($(input).zIndex()+1);
			$.datepicker._datepickerShowing = true;

			if ( $.effects && $.effects.effect[ showAnim ] ) {
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration);
			} else {
				inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
			}

			if ( $.datepicker._shouldFocusInput( inst ) ) {
				inst.input.focus();
			}

			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function(inst) {
		this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
		instActive = inst; // for delegate hover events
		inst.dpDiv.empty().append(this._generateHTML(inst));
		this._attachHandlers(inst);
		inst.dpDiv.find("." + this._dayOverClass + " a").mouseover();

		var origyearshtml,
			numMonths = this._getNumberOfMonths(inst),
			cols = numMonths[1],
			width = 17;

		inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
		if (cols > 1) {
			inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em");
		}
		inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") +
			"Class"]("ui-datepicker-multi");
		inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") +
			"Class"]("ui-datepicker-rtl");

		if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput( inst ) ) {
			inst.input.focus();
		}

		// deffered render of the years select (to avoid flashes on Firefox)
		if( inst.yearshtml ){
			origyearshtml = inst.yearshtml;
			setTimeout(function(){
				//assure that inst.yearshtml didn't change.
				if( origyearshtml === inst.yearshtml && inst.yearshtml ){
					inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml);
				}
				origyearshtml = inst.yearshtml = null;
			}, 0);
		}
	},

	// #6694 - don't focus the input if it's already focused
	// this breaks the change event in IE
	// Support: IE and jQuery <1.9
	_shouldFocusInput: function( inst ) {
		return inst.input && inst.input.is( ":visible" ) && !inst.input.is( ":disabled" ) && !inst.input.is( ":focus" );
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function(inst, offset, isFixed) {
		var dpWidth = inst.dpDiv.outerWidth(),
			dpHeight = inst.dpDiv.outerHeight(),
			inputWidth = inst.input ? inst.input.outerWidth() : 0,
			inputHeight = inst.input ? inst.input.outerHeight() : 0,
			viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
			viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());

		offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
		offset.left -= (isFixed && offset.left === inst.input.offset().left) ? $(document).scrollLeft() : 0;
		offset.top -= (isFixed && offset.top === (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

		// now check if datepicker is showing outside window viewport - move to a better place if so.
		offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
			Math.abs(offset.left + dpWidth - viewWidth) : 0);
		offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
			Math.abs(dpHeight + inputHeight) : 0);

		return offset;
	},

	/* Find an object's position on the screen. */
	_findPos: function(obj) {
		var position,
			inst = this._getInst(obj),
			isRTL = this._get(inst, "isRTL");

		while (obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
			obj = obj[isRTL ? "previousSibling" : "nextSibling"];
		}

		position = $(obj).offset();
		return [position.left, position.top];
	},

	/* Hide the date picker from view.
	 * @param  input  element - the input field attached to the date picker
	 */
	_hideDatepicker: function(input) {
		var showAnim, duration, postProcess, onClose,
			inst = this._curInst;

		if (!inst || (input && inst !== $.data(input, PROP_NAME))) {
			return;
		}

		if (this._datepickerShowing) {
			showAnim = this._get(inst, "showAnim");
			duration = this._get(inst, "duration");
			postProcess = function() {
				$.datepicker._tidyDialog(inst);
			};

			// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
			if ( $.effects && ( $.effects.effect[ showAnim ] || $.effects[ showAnim ] ) ) {
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);
			} else {
				inst.dpDiv[(showAnim === "slideDown" ? "slideUp" :
					(showAnim === "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess);
			}

			if (!showAnim) {
				postProcess();
			}
			this._datepickerShowing = false;

			onClose = this._get(inst, "onClose");
			if (onClose) {
				onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst]);
			}

			this._lastInput = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" });
				if ($.blockUI) {
					$.unblockUI();
					$("body").append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function(inst) {
		inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function(event) {
		if (!$.datepicker._curInst) {
			return;
		}

		var $target = $(event.target),
			inst = $.datepicker._getInst($target[0]);

		if ( ( ( $target[0].id !== $.datepicker._mainDivId &&
				$target.parents("#" + $.datepicker._mainDivId).length === 0 &&
				!$target.hasClass($.datepicker.markerClassName) &&
				!$target.closest("." + $.datepicker._triggerClass).length &&
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) ) ) ||
			( $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst ) ) {
				$.datepicker._hideDatepicker();
		}
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function(id, offset, period) {
		var target = $(id),
			inst = this._getInst(target[0]);

		if (this._isDisabledDatepicker(target[0])) {
			return;
		}
		this._adjustInstDate(inst, offset +
			(period === "M" ? this._get(inst, "showCurrentAtPos") : 0), // undo positioning
			period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function(id) {
		var date,
			target = $(id),
			inst = this._getInst(target[0]);

		if (this._get(inst, "gotoCurrent") && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		} else {
			date = new Date();
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function(id, select, period) {
		var target = $(id),
			inst = this._getInst(target[0]);

		inst["selected" + (period === "M" ? "Month" : "Year")] =
		inst["draw" + (period === "M" ? "Month" : "Year")] =
			parseInt(select.options[select.selectedIndex].value,10);

		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a day. */
	_selectDay: function(id, month, year, td) {
		var inst,
			target = $(id);

		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
			return;
		}

		inst = this._getInst(target[0]);
		inst.selectedDay = inst.currentDay = $("a", td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function(id) {
		var target = $(id);
		this._selectDate(target, "");
	},

	/* Update the input field with the selected date. */
	_selectDate: function(id, dateStr) {
		var onSelect,
			target = $(id),
			inst = this._getInst(target[0]);

		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
		if (inst.input) {
			inst.input.val(dateStr);
		}
		this._updateAlternate(inst);

		onSelect = this._get(inst, "onSelect");
		if (onSelect) {
			onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
		} else if (inst.input) {
			inst.input.trigger("change"); // fire the change event
		}

		if (inst.inline){
			this._updateDatepicker(inst);
		} else {
			this._hideDatepicker();
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) !== "object") {
				inst.input.focus(); // restore focus
			}
			this._lastInput = null;
		}
	},

	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function(inst) {
		var altFormat, date, dateStr,
			altField = this._get(inst, "altField");

		if (altField) { // update alternate field too
			altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
			date = this._getDate(inst);
			dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).each(function() { $(this).val(dateStr); });
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
	 * @param  date  Date - the date to customise
	 * @return [boolean, string] - is this date selectable?, what is its CSS class?
	 */
	noWeekends: function(date) {
		var day = date.getDay();
		return [(day > 0 && day < 6), ""];
	},

	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	 * @param  date  Date - the date to get the week for
	 * @return  number - the number of the week within the year that contains this date
	 */
	iso8601Week: function(date) {
		var time,
			checkDate = new Date(date.getTime());

		// Find Thursday of this week starting on Monday
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));

		time = checkDate.getTime();
		checkDate.setMonth(0); // Compare with Jan 1
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	},

	/* Parse a string value into a date object.
	 * See formatDate below for the possible formats.
	 *
	 * @param  format string - the expected format of the date
	 * @param  value string - the date in the above format
	 * @param  settings Object - attributes include:
	 *					shortYearCutoff  number - the cutoff year for determining the century (optional)
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
	 *					dayNames		string[7] - names of the days from Sunday (optional)
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)
	 *					monthNames		string[12] - names of the months (optional)
	 * @return  Date - the extracted date value or null if value is blank
	 */
	parseDate: function (format, value, settings) {
		if (format == null || value == null) {
			throw "Invalid arguments";
		}

		value = (typeof value === "object" ? value.toString() : value + "");
		if (value === "") {
			return null;
		}

		var iFormat, dim, extra,
			iValue = 0,
			shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,
			shortYearCutoff = (typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp :
				new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10)),
			dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
			dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
			monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
			monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
			year = -1,
			month = -1,
			day = -1,
			doy = -1,
			literal = false,
			date,
			// Check whether a format character is doubled
			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			},
			// Extract a number from the string value
			getNumber = function(match) {
				var isDoubled = lookAhead(match),
					size = (match === "@" ? 14 : (match === "!" ? 20 :
					(match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
					digits = new RegExp("^\\d{1," + size + "}"),
					num = value.substring(iValue).match(digits);
				if (!num) {
					throw "Missing number at position " + iValue;
				}
				iValue += num[0].length;
				return parseInt(num[0], 10);
			},
			// Extract a name from the string value and convert to an index
			getName = function(match, shortNames, longNames) {
				var index = -1,
					names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
						return [ [k, v] ];
					}).sort(function (a, b) {
						return -(a[1].length - b[1].length);
					});

				$.each(names, function (i, pair) {
					var name = pair[1];
					if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
						index = pair[0];
						iValue += name.length;
						return false;
					}
				});
				if (index !== -1) {
					return index + 1;
				} else {
					throw "Unknown name at position " + iValue;
				}
			},
			// Confirm that a literal character matches the string value
			checkLiteral = function() {
				if (value.charAt(iValue) !== format.charAt(iFormat)) {
					throw "Unexpected literal at position " + iValue;
				}
				iValue++;
			};

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
					literal = false;
				} else {
					checkLiteral();
				}
			} else {
				switch (format.charAt(iFormat)) {
					case "d":
						day = getNumber("d");
						break;
					case "D":
						getName("D", dayNamesShort, dayNames);
						break;
					case "o":
						doy = getNumber("o");
						break;
					case "m":
						month = getNumber("m");
						break;
					case "M":
						month = getName("M", monthNamesShort, monthNames);
						break;
					case "y":
						year = getNumber("y");
						break;
					case "@":
						date = new Date(getNumber("@"));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "!":
						date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'")){
							checkLiteral();
						} else {
							literal = true;
						}
						break;
					default:
						checkLiteral();
				}
			}
		}

		if (iValue < value.length){
			extra = value.substr(iValue);
			if (!/^\s+/.test(extra)) {
				throw "Extra/unparsed characters found in date: " + extra;
			}
		}

		if (year === -1) {
			year = new Date().getFullYear();
		} else if (year < 100) {
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		}

		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim) {
					break;
				}
				month++;
				day -= dim;
			} while (true);
		}

		date = this._daylightSavingAdjust(new Date(year, month - 1, day));
		if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
			throw "Invalid date"; // E.g. 31/02/00
		}
		return date;
	},

	/* Standard date formats. */
	ATOM: "yy-mm-dd", // RFC 3339 (ISO 8601)
	COOKIE: "D, dd M yy",
	ISO_8601: "yy-mm-dd",
	RFC_822: "D, d M y",
	RFC_850: "DD, dd-M-y",
	RFC_1036: "D, d M y",
	RFC_1123: "D, d M yy",
	RFC_2822: "D, d M yy",
	RSS: "D, d M y", // RFC 822
	TICKS: "!",
	TIMESTAMP: "@",
	W3C: "yy-mm-dd", // ISO 8601

	_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

	/* Format a date object into a string value.
	 * The format can be combinations of the following:
	 * d  - day of month (no leading zero)
	 * dd - day of month (two digit)
	 * o  - day of year (no leading zeros)
	 * oo - day of year (three digit)
	 * D  - day name short
	 * DD - day name long
	 * m  - month of year (no leading zero)
	 * mm - month of year (two digit)
	 * M  - month name short
	 * MM - month name long
	 * y  - year (two digit)
	 * yy - year (four digit)
	 * @ - Unix timestamp (ms since 01/01/1970)
	 * ! - Windows ticks (100ns since 01/01/0001)
	 * "..." - literal text
	 * '' - single quote
	 *
	 * @param  format string - the desired format of the date
	 * @param  date Date - the date value to format
	 * @param  settings Object - attributes include:
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
	 *					dayNames		string[7] - names of the days from Sunday (optional)
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)
	 *					monthNames		string[12] - names of the months (optional)
	 * @return  string - the date in the above format
	 */
	formatDate: function (format, date, settings) {
		if (!date) {
			return "";
		}

		var iFormat,
			dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
			dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
			monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
			monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
			// Check whether a format character is doubled
			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			},
			// Format a number, with leading zero if necessary
			formatNumber = function(match, value, len) {
				var num = "" + value;
				if (lookAhead(match)) {
					while (num.length < len) {
						num = "0" + num;
					}
				}
				return num;
			},
			// Format a name, short or long as requested
			formatName = function(match, value, shortNames, longNames) {
				return (lookAhead(match) ? longNames[value] : shortNames[value]);
			},
			output = "",
			literal = false;

		if (date) {
			for (iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
						literal = false;
					} else {
						output += format.charAt(iFormat);
					}
				} else {
					switch (format.charAt(iFormat)) {
						case "d":
							output += formatNumber("d", date.getDate(), 2);
							break;
						case "D":
							output += formatName("D", date.getDay(), dayNamesShort, dayNames);
							break;
						case "o":
							output += formatNumber("o",
								Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
							break;
						case "m":
							output += formatNumber("m", date.getMonth() + 1, 2);
							break;
						case "M":
							output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
							break;
						case "y":
							output += (lookAhead("y") ? date.getFullYear() :
								(date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
							break;
						case "@":
							output += date.getTime();
							break;
						case "!":
							output += date.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (lookAhead("'")) {
								output += "'";
							} else {
								literal = true;
							}
							break;
						default:
							output += format.charAt(iFormat);
					}
				}
			}
		}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function (format) {
		var iFormat,
			chars = "",
			literal = false,
			// Check whether a format character is doubled
			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			};

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
					literal = false;
				} else {
					chars += format.charAt(iFormat);
				}
			} else {
				switch (format.charAt(iFormat)) {
					case "d": case "m": case "y": case "@":
						chars += "0123456789";
						break;
					case "D": case "M":
						return null; // Accept anything
					case "'":
						if (lookAhead("'")) {
							chars += "'";
						} else {
							literal = true;
						}
						break;
					default:
						chars += format.charAt(iFormat);
				}
			}
		}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function(inst, noDefault) {
		if (inst.input.val() === inst.lastVal) {
			return;
		}

		var dateFormat = this._get(inst, "dateFormat"),
			dates = inst.lastVal = inst.input ? inst.input.val() : null,
			defaultDate = this._getDefaultDate(inst),
			date = defaultDate,
			settings = this._getFormatConfig(inst);

		try {
			date = this.parseDate(dateFormat, dates, settings) || defaultDate;
		} catch (event) {
			dates = (noDefault ? "" : dates);
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = (dates ? date.getDate() : 0);
		inst.currentMonth = (dates ? date.getMonth() : 0);
		inst.currentYear = (dates ? date.getFullYear() : 0);
		this._adjustInstDate(inst);
	},

	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function(inst) {
		return this._restrictMinMax(inst,
			this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function(inst, date, defaultDate) {
		var offsetNumeric = function(offset) {
				var date = new Date();
				date.setDate(date.getDate() + offset);
				return date;
			},
			offsetString = function(offset) {
				try {
					return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
						offset, $.datepicker._getFormatConfig(inst));
				}
				catch (e) {
					// Ignore
				}

				var date = (offset.toLowerCase().match(/^c/) ?
					$.datepicker._getDate(inst) : null) || new Date(),
					year = date.getFullYear(),
					month = date.getMonth(),
					day = date.getDate(),
					pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
					matches = pattern.exec(offset);

				while (matches) {
					switch (matches[2] || "d") {
						case "d" : case "D" :
							day += parseInt(matches[1],10); break;
						case "w" : case "W" :
							day += parseInt(matches[1],10) * 7; break;
						case "m" : case "M" :
							month += parseInt(matches[1],10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
						case "y": case "Y" :
							year += parseInt(matches[1],10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
					}
					matches = pattern.exec(offset);
				}
				return new Date(year, month, day);
			},
			newDate = (date == null || date === "" ? defaultDate : (typeof date === "string" ? offsetString(date) :
				(typeof date === "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));

		newDate = (newDate && newDate.toString() === "Invalid Date" ? defaultDate : newDate);
		if (newDate) {
			newDate.setHours(0);
			newDate.setMinutes(0);
			newDate.setSeconds(0);
			newDate.setMilliseconds(0);
		}
		return this._daylightSavingAdjust(newDate);
	},

	/* Handle switch to/from daylight saving.
	 * Hours may be non-zero on daylight saving cut-over:
	 * > 12 when midnight changeover, but then cannot generate
	 * midnight datetime, so jump to 1AM, otherwise reset.
	 * @param  date  (Date) the date to check
	 * @return  (Date) the corrected date
	 */
	_daylightSavingAdjust: function(date) {
		if (!date) {
			return null;
		}
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Set the date(s) directly. */
	_setDate: function(inst, date, noChange) {
		var clear = !date,
			origMonth = inst.selectedMonth,
			origYear = inst.selectedYear,
			newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));

		inst.selectedDay = inst.currentDay = newDate.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
		if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
			this._notifyChange(inst);
		}
		this._adjustInstDate(inst);
		if (inst.input) {
			inst.input.val(clear ? "" : this._formatDate(inst));
		}
	},

	/* Retrieve the date(s) directly. */
	_getDate: function(inst) {
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() === "") ? null :
			this._daylightSavingAdjust(new Date(
			inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate;
	},

	/* Attach the onxxx handlers.  These are declared statically so
	 * they work with static code transformers like Caja.
	 */
	_attachHandlers: function(inst) {
		var stepMonths = this._get(inst, "stepMonths"),
			id = "#" + inst.id.replace( /\\\\/g, "\\" );
		inst.dpDiv.find("[data-handler]").map(function () {
			var handler = {
				prev: function () {
					$.datepicker._adjustDate(id, -stepMonths, "M");
				},
				next: function () {
					$.datepicker._adjustDate(id, +stepMonths, "M");
				},
				hide: function () {
					$.datepicker._hideDatepicker();
				},
				today: function () {
					$.datepicker._gotoToday(id);
				},
				selectDay: function () {
					$.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
					return false;
				},
				selectMonth: function () {
					$.datepicker._selectMonthYear(id, this, "M");
					return false;
				},
				selectYear: function () {
					$.datepicker._selectMonthYear(id, this, "Y");
					return false;
				}
			};
			$(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
		});
	},

	/* Generate the HTML for the current state of the date picker. */
	_generateHTML: function(inst) {
		var maxDraw, prevText, prev, nextText, next, currentText, gotoDate,
			controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin,
			monthNames, monthNamesShort, beforeShowDay, showOtherMonths,
			selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate,
			cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows,
			printDate, dRow, tbody, daySettings, otherMonth, unselectable,
			tempDate = new Date(),
			today = this._daylightSavingAdjust(
				new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())), // clear time
			isRTL = this._get(inst, "isRTL"),
			showButtonPanel = this._get(inst, "showButtonPanel"),
			hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
			navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
			numMonths = this._getNumberOfMonths(inst),
			showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
			stepMonths = this._get(inst, "stepMonths"),
			isMultiMonth = (numMonths[0] !== 1 || numMonths[1] !== 1),
			currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
				new Date(inst.currentYear, inst.currentMonth, inst.currentDay))),
			minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			drawMonth = inst.drawMonth - showCurrentAtPos,
			drawYear = inst.drawYear;

		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) {
			maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;

		prevText = this._get(inst, "prevText");
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
			this._getFormatConfig(inst)));

		prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" +
			" title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" :
			(hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+ prevText +"'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>"));

		nextText = this._get(inst, "nextText");
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
			this._getFormatConfig(inst)));

		next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" +
			" title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" :
			(hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+ nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>"));

		currentText = this._get(inst, "currentText");
		gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
		currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));

		controls = (!inst.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
			this._get(inst, "closeText") + "</button>" : "");

		buttonPanel = (showButtonPanel) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") +
			(this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" +
			">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";

		firstDay = parseInt(this._get(inst, "firstDay"),10);
		firstDay = (isNaN(firstDay) ? 0 : firstDay);

		showWeek = this._get(inst, "showWeek");
		dayNames = this._get(inst, "dayNames");
		dayNamesMin = this._get(inst, "dayNamesMin");
		monthNames = this._get(inst, "monthNames");
		monthNamesShort = this._get(inst, "monthNamesShort");
		beforeShowDay = this._get(inst, "beforeShowDay");
		showOtherMonths = this._get(inst, "showOtherMonths");
		selectOtherMonths = this._get(inst, "selectOtherMonths");
		defaultDate = this._getDefaultDate(inst);
		html = "";
		dow;
		for (row = 0; row < numMonths[0]; row++) {
			group = "";
			this.maxRows = 4;
			for (col = 0; col < numMonths[1]; col++) {
				selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
				cornerClass = " ui-corner-all";
				calender = "";
				if (isMultiMonth) {
					calender += "<div class='ui-datepicker-group";
					if (numMonths[1] > 1) {
						switch (col) {
							case 0: calender += " ui-datepicker-group-first";
								cornerClass = " ui-corner-" + (isRTL ? "right" : "left"); break;
							case numMonths[1]-1: calender += " ui-datepicker-group-last";
								cornerClass = " ui-corner-" + (isRTL ? "left" : "right"); break;
							default: calender += " ui-datepicker-group-middle"; cornerClass = ""; break;
						}
					}
					calender += "'>";
				}
				calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" +
					(/all|left/.test(cornerClass) && row === 0 ? (isRTL ? next : prev) : "") +
					(/all|right/.test(cornerClass) && row === 0 ? (isRTL ? prev : next) : "") +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					"</div><table class='ui-datepicker-calendar'><thead>" +
					"<tr>";
				thead = (showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "");
				for (dow = 0; dow < 7; dow++) { // days of the week
					day = (dow + firstDay) % 7;
					thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" +
						"<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
				}
				calender += thead + "</tr></thead><tbody>";
				daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				}
				leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
				numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows); //If multiple months, use the higher number of rows (see #7043)
				this.maxRows = numRows;
				printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
				for (dRow = 0; dRow < numRows; dRow++) { // create date picker rows
					calender += "<tr>";
					tbody = (!showWeek ? "" : "<td class='ui-datepicker-week-col'>" +
						this._get(inst, "calculateWeek")(printDate) + "</td>");
					for (dow = 0; dow < 7; dow++) { // create date picker days
						daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
						otherMonth = (printDate.getMonth() !== drawMonth);
						unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
						tbody += "<td class='" +
							((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + // highlight weekends
							(otherMonth ? " ui-datepicker-other-month" : "") + // highlight days from other months
							((printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime()) ?
							// or defaultDate is current printedDate and defaultDate is selectedDate
							" " + this._dayOverClass : "") + // highlight selected day
							(unselectable ? " " + this._unselectableClass + " ui-state-disabled": "") +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + // highlight custom dates
							(printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + // highlight selected day
							(printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'" : "") + // cell title
							(unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + // actions
							(otherMonth && !showOtherMonths ? "&#xa0;" : // display for other months
							(unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" +
							(printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") +
							(printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + // highlight selected day
							(otherMonth ? " ui-priority-secondary" : "") + // distinguish dates from other months
							"' href='#'>" + printDate.getDate() + "</a>")) + "</td>"; // display selectable date
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjust(printDate);
					}
					calender += tbody + "</tr>";
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				calender += "</tbody></table>" + (isMultiMonth ? "</div>" +
							((numMonths[0] > 0 && col === numMonths[1]-1) ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
				group += calender;
			}
			html += group;
		}
		html += buttonPanel;
		inst._keyEvent = false;
		return html;
	},

	/* Generate the month and year header. */
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			secondary, monthNames, monthNamesShort) {

		var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear,
			changeMonth = this._get(inst, "changeMonth"),
			changeYear = this._get(inst, "changeYear"),
			showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
			html = "<div class='ui-datepicker-title'>",
			monthHtml = "";

		// month selection
		if (secondary || !changeMonth) {
			monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";
		} else {
			inMinYear = (minDate && minDate.getFullYear() === drawYear);
			inMaxYear = (maxDate && maxDate.getFullYear() === drawYear);
			monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
			for ( month = 0; month < 12; month++) {
				if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
					monthHtml += "<option value='" + month + "'" +
						(month === drawMonth ? " selected='selected'" : "") +
						">" + monthNamesShort[month] + "</option>";
				}
			}
			monthHtml += "</select>";
		}

		if (!showMonthAfterYear) {
			html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
		}

		// year selection
		if ( !inst.yearshtml ) {
			inst.yearshtml = "";
			if (secondary || !changeYear) {
				html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
			} else {
				// determine range of years to display
				years = this._get(inst, "yearRange").split(":");
				thisYear = new Date().getFullYear();
				determineYear = function(value) {
					var year = (value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) :
						(value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) :
						parseInt(value, 10)));
					return (isNaN(year) ? thisYear : year);
				};
				year = determineYear(years[0]);
				endYear = Math.max(year, determineYear(years[1] || ""));
				year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
				endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
				inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
				for (; year <= endYear; year++) {
					inst.yearshtml += "<option value='" + year + "'" +
						(year === drawYear ? " selected='selected'" : "") +
						">" + year + "</option>";
				}
				inst.yearshtml += "</select>";

				html += inst.yearshtml;
				inst.yearshtml = null;
			}
		}

		html += this._get(inst, "yearSuffix");
		if (showMonthAfterYear) {
			html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;
		}
		html += "</div>"; // Close datepicker_header
		return html;
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function(inst, offset, period) {
		var year = inst.drawYear + (period === "Y" ? offset : 0),
			month = inst.drawMonth + (period === "M" ? offset : 0),
			day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === "D" ? offset : 0),
			date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));

		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period === "M" || period === "Y") {
			this._notifyChange(inst);
		}
	},

	/* Ensure a date is within any min/max bounds. */
	_restrictMinMax: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			newDate = (minDate && date < minDate ? minDate : date);
		return (maxDate && newDate > maxDate ? maxDate : newDate);
	},

	/* Notify change of month/year. */
	_notifyChange: function(inst) {
		var onChange = this._get(inst, "onChangeMonthYear");
		if (onChange) {
			onChange.apply((inst.input ? inst.input[0] : null),
				[inst.selectedYear, inst.selectedMonth + 1, inst]);
		}
	},

	/* Determine the number of months to show. */
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, "numberOfMonths");
		return (numMonths == null ? [1, 1] : (typeof numMonths === "number" ? [1, numMonths] : numMonths));
	},

	/* Determine the current maximum date - ensure no time components are set. */
	_getMinMaxDate: function(inst, minMax) {
		return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function(year, month) {
		return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst),
			date = this._daylightSavingAdjust(new Date(curYear,
			curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));

		if (offset < 0) {
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		}
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function(inst, date) {
		var yearSplit, currentYear,
			minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			minYear = null,
			maxYear = null,
			years = this._get(inst, "yearRange");
			if (years){
				yearSplit = years.split(":");
				currentYear = new Date().getFullYear();
				minYear = parseInt(yearSplit[0], 10);
				maxYear = parseInt(yearSplit[1], 10);
				if ( yearSplit[0].match(/[+\-].*/) ) {
					minYear += currentYear;
				}
				if ( yearSplit[1].match(/[+\-].*/) ) {
					maxYear += currentYear;
				}
			}

		return ((!minDate || date.getTime() >= minDate.getTime()) &&
			(!maxDate || date.getTime() <= maxDate.getTime()) &&
			(!minYear || date.getFullYear() >= minYear) &&
			(!maxYear || date.getFullYear() <= maxYear));
	},

	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function(inst) {
		var shortYearCutoff = this._get(inst, "shortYearCutoff");
		shortYearCutoff = (typeof shortYearCutoff !== "string" ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		return {shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, "dayNamesShort"), dayNames: this._get(inst, "dayNames"),
			monthNamesShort: this._get(inst, "monthNamesShort"), monthNames: this._get(inst, "monthNames")};
	},

	/* Format the given date for display. */
	_formatDate: function(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day === "object" ? day :
			this._daylightSavingAdjust(new Date(year, month, day))) :
			this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
	}
});

/*
 * Bind hover events for datepicker elements.
 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
 * Global instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
 */
function bindHover(dpDiv) {
	var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
	return dpDiv.delegate(selector, "mouseout", function() {
			$(this).removeClass("ui-state-hover");
			if (this.className.indexOf("ui-datepicker-prev") !== -1) {
				$(this).removeClass("ui-datepicker-prev-hover");
			}
			if (this.className.indexOf("ui-datepicker-next") !== -1) {
				$(this).removeClass("ui-datepicker-next-hover");
			}
		})
		.delegate(selector, "mouseover", function(){
			if (!$.datepicker._isDisabledDatepicker( instActive.inline ? dpDiv.parent()[0] : instActive.input[0])) {
				$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
				$(this).addClass("ui-state-hover");
				if (this.className.indexOf("ui-datepicker-prev") !== -1) {
					$(this).addClass("ui-datepicker-prev-hover");
				}
				if (this.className.indexOf("ui-datepicker-next") !== -1) {
					$(this).addClass("ui-datepicker-next-hover");
				}
			}
		});
}

/* jQuery extend now ignores nulls! */
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props) {
		if (props[name] == null) {
			target[name] = props[name];
		}
	}
	return target;
}

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
					Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function(options){

	/* Verify an empty collection wasn't passed - Fixes #6976 */
	if ( !this.length ) {
		return this;
	}

	/* Initialise the date picker. */
	if (!$.datepicker.initialized) {
		$(document).mousedown($.datepicker._checkExternalClick);
		$.datepicker.initialized = true;
	}

	/* Append datepicker main container to body if not exist. */
	if ($("#"+$.datepicker._mainDivId).length === 0) {
		$("body").append($.datepicker.dpDiv);
	}

	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "widget")) {
		return $.datepicker["_" + options + "Datepicker"].
			apply($.datepicker, [this[0]].concat(otherArgs));
	}
	if (options === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
		return $.datepicker["_" + options + "Datepicker"].
			apply($.datepicker, [this[0]].concat(otherArgs));
	}
	return this.each(function() {
		typeof options === "string" ?
			$.datepicker["_" + options + "Datepicker"].
				apply($.datepicker, [this].concat(otherArgs)) :
			$.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
$.datepicker.initialized = false;
$.datepicker.uuid = new Date().getTime();
$.datepicker.version = "1.10.4";

})(jQuery);

},{"./core":"jquery-ui/core","jquery":"jquery"}],"jquery-ui/menu":[function(require,module,exports){
var jQuery = require('jquery');
require('./core');
require('./widget');
require('./position');

/*!
 * jQuery UI Menu 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/menu/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 */
(function( $, undefined ) {

$.widget( "ui.menu", {
	version: "1.10.4",
	defaultElement: "<ul>",
	delay: 300,
	options: {
		icons: {
			submenu: "ui-icon-carat-1-e"
		},
		menus: "ul",
		position: {
			my: "left top",
			at: "right top"
		},
		role: "menu",

		// callbacks
		blur: null,
		focus: null,
		select: null
	},

	_create: function() {
		this.activeMenu = this.element;
		// flag used to prevent firing of the click handler
		// as the event bubbles up through nested menus
		this.mouseHandled = false;
		this.element
			.uniqueId()
			.addClass( "ui-menu ui-widget ui-widget-content ui-corner-all" )
			.toggleClass( "ui-menu-icons", !!this.element.find( ".ui-icon" ).length )
			.attr({
				role: this.options.role,
				tabIndex: 0
			})
			// need to catch all clicks on disabled menu
			// not possible through _on
			.bind( "click" + this.eventNamespace, $.proxy(function( event ) {
				if ( this.options.disabled ) {
					event.preventDefault();
				}
			}, this ));

		if ( this.options.disabled ) {
			this.element
				.addClass( "ui-state-disabled" )
				.attr( "aria-disabled", "true" );
		}

		this._on({
			// Prevent focus from sticking to links inside menu after clicking
			// them (focus should always stay on UL during navigation).
			"mousedown .ui-menu-item > a": function( event ) {
				event.preventDefault();
			},
			"click .ui-state-disabled > a": function( event ) {
				event.preventDefault();
			},
			"click .ui-menu-item:has(a)": function( event ) {
				var target = $( event.target ).closest( ".ui-menu-item" );
				if ( !this.mouseHandled && target.not( ".ui-state-disabled" ).length ) {
					this.select( event );

					// Only set the mouseHandled flag if the event will bubble, see #9469.
					if ( !event.isPropagationStopped() ) {
						this.mouseHandled = true;
					}

					// Open submenu on click
					if ( target.has( ".ui-menu" ).length ) {
						this.expand( event );
					} else if ( !this.element.is( ":focus" ) && $( this.document[ 0 ].activeElement ).closest( ".ui-menu" ).length ) {

						// Redirect focus to the menu
						this.element.trigger( "focus", [ true ] );

						// If the active item is on the top level, let it stay active.
						// Otherwise, blur the active item since it is no longer visible.
						if ( this.active && this.active.parents( ".ui-menu" ).length === 1 ) {
							clearTimeout( this.timer );
						}
					}
				}
			},
			"mouseenter .ui-menu-item": function( event ) {
				var target = $( event.currentTarget );
				// Remove ui-state-active class from siblings of the newly focused menu item
				// to avoid a jump caused by adjacent elements both having a class with a border
				target.siblings().children( ".ui-state-active" ).removeClass( "ui-state-active" );
				this.focus( event, target );
			},
			mouseleave: "collapseAll",
			"mouseleave .ui-menu": "collapseAll",
			focus: function( event, keepActiveItem ) {
				// If there's already an active item, keep it active
				// If not, activate the first item
				var item = this.active || this.element.children( ".ui-menu-item" ).eq( 0 );

				if ( !keepActiveItem ) {
					this.focus( event, item );
				}
			},
			blur: function( event ) {
				this._delay(function() {
					if ( !$.contains( this.element[0], this.document[0].activeElement ) ) {
						this.collapseAll( event );
					}
				});
			},
			keydown: "_keydown"
		});

		this.refresh();

		// Clicks outside of a menu collapse any open menus
		this._on( this.document, {
			click: function( event ) {
				if ( !$( event.target ).closest( ".ui-menu" ).length ) {
					this.collapseAll( event );
				}

				// Reset the mouseHandled flag
				this.mouseHandled = false;
			}
		});
	},

	_destroy: function() {
		// Destroy (sub)menus
		this.element
			.removeAttr( "aria-activedescendant" )
			.find( ".ui-menu" ).addBack()
				.removeClass( "ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons" )
				.removeAttr( "role" )
				.removeAttr( "tabIndex" )
				.removeAttr( "aria-labelledby" )
				.removeAttr( "aria-expanded" )
				.removeAttr( "aria-hidden" )
				.removeAttr( "aria-disabled" )
				.removeUniqueId()
				.show();

		// Destroy menu items
		this.element.find( ".ui-menu-item" )
			.removeClass( "ui-menu-item" )
			.removeAttr( "role" )
			.removeAttr( "aria-disabled" )
			.children( "a" )
				.removeUniqueId()
				.removeClass( "ui-corner-all ui-state-hover" )
				.removeAttr( "tabIndex" )
				.removeAttr( "role" )
				.removeAttr( "aria-haspopup" )
				.children().each( function() {
					var elem = $( this );
					if ( elem.data( "ui-menu-submenu-carat" ) ) {
						elem.remove();
					}
				});

		// Destroy menu dividers
		this.element.find( ".ui-menu-divider" ).removeClass( "ui-menu-divider ui-widget-content" );
	},

	_keydown: function( event ) {
		var match, prev, character, skip, regex,
			preventDefault = true;

		function escape( value ) {
			return value.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );
		}

		switch ( event.keyCode ) {
		case $.ui.keyCode.PAGE_UP:
			this.previousPage( event );
			break;
		case $.ui.keyCode.PAGE_DOWN:
			this.nextPage( event );
			break;
		case $.ui.keyCode.HOME:
			this._move( "first", "first", event );
			break;
		case $.ui.keyCode.END:
			this._move( "last", "last", event );
			break;
		case $.ui.keyCode.UP:
			this.previous( event );
			break;
		case $.ui.keyCode.DOWN:
			this.next( event );
			break;
		case $.ui.keyCode.LEFT:
			this.collapse( event );
			break;
		case $.ui.keyCode.RIGHT:
			if ( this.active && !this.active.is( ".ui-state-disabled" ) ) {
				this.expand( event );
			}
			break;
		case $.ui.keyCode.ENTER:
		case $.ui.keyCode.SPACE:
			this._activate( event );
			break;
		case $.ui.keyCode.ESCAPE:
			this.collapse( event );
			break;
		default:
			preventDefault = false;
			prev = this.previousFilter || "";
			character = String.fromCharCode( event.keyCode );
			skip = false;

			clearTimeout( this.filterTimer );

			if ( character === prev ) {
				skip = true;
			} else {
				character = prev + character;
			}

			regex = new RegExp( "^" + escape( character ), "i" );
			match = this.activeMenu.children( ".ui-menu-item" ).filter(function() {
				return regex.test( $( this ).children( "a" ).text() );
			});
			match = skip && match.index( this.active.next() ) !== -1 ?
				this.active.nextAll( ".ui-menu-item" ) :
				match;

			// If no matches on the current filter, reset to the last character pressed
			// to move down the menu to the first item that starts with that character
			if ( !match.length ) {
				character = String.fromCharCode( event.keyCode );
				regex = new RegExp( "^" + escape( character ), "i" );
				match = this.activeMenu.children( ".ui-menu-item" ).filter(function() {
					return regex.test( $( this ).children( "a" ).text() );
				});
			}

			if ( match.length ) {
				this.focus( event, match );
				if ( match.length > 1 ) {
					this.previousFilter = character;
					this.filterTimer = this._delay(function() {
						delete this.previousFilter;
					}, 1000 );
				} else {
					delete this.previousFilter;
				}
			} else {
				delete this.previousFilter;
			}
		}

		if ( preventDefault ) {
			event.preventDefault();
		}
	},

	_activate: function( event ) {
		if ( !this.active.is( ".ui-state-disabled" ) ) {
			if ( this.active.children( "a[aria-haspopup='true']" ).length ) {
				this.expand( event );
			} else {
				this.select( event );
			}
		}
	},

	refresh: function() {
		var menus,
			icon = this.options.icons.submenu,
			submenus = this.element.find( this.options.menus );

		this.element.toggleClass( "ui-menu-icons", !!this.element.find( ".ui-icon" ).length );

		// Initialize nested menus
		submenus.filter( ":not(.ui-menu)" )
			.addClass( "ui-menu ui-widget ui-widget-content ui-corner-all" )
			.hide()
			.attr({
				role: this.options.role,
				"aria-hidden": "true",
				"aria-expanded": "false"
			})
			.each(function() {
				var menu = $( this ),
					item = menu.prev( "a" ),
					submenuCarat = $( "<span>" )
						.addClass( "ui-menu-icon ui-icon " + icon )
						.data( "ui-menu-submenu-carat", true );

				item
					.attr( "aria-haspopup", "true" )
					.prepend( submenuCarat );
				menu.attr( "aria-labelledby", item.attr( "id" ) );
			});

		menus = submenus.add( this.element );

		// Don't refresh list items that are already adapted
		menus.children( ":not(.ui-menu-item):has(a)" )
			.addClass( "ui-menu-item" )
			.attr( "role", "presentation" )
			.children( "a" )
				.uniqueId()
				.addClass( "ui-corner-all" )
				.attr({
					tabIndex: -1,
					role: this._itemRole()
				});

		// Initialize unlinked menu-items containing spaces and/or dashes only as dividers
		menus.children( ":not(.ui-menu-item)" ).each(function() {
			var item = $( this );
			// hyphen, em dash, en dash
			if ( !/[^\-\u2014\u2013\s]/.test( item.text() ) ) {
				item.addClass( "ui-widget-content ui-menu-divider" );
			}
		});

		// Add aria-disabled attribute to any disabled menu item
		menus.children( ".ui-state-disabled" ).attr( "aria-disabled", "true" );

		// If the active item has been removed, blur the menu
		if ( this.active && !$.contains( this.element[ 0 ], this.active[ 0 ] ) ) {
			this.blur();
		}
	},

	_itemRole: function() {
		return {
			menu: "menuitem",
			listbox: "option"
		}[ this.options.role ];
	},

	_setOption: function( key, value ) {
		if ( key === "icons" ) {
			this.element.find( ".ui-menu-icon" )
				.removeClass( this.options.icons.submenu )
				.addClass( value.submenu );
		}
		this._super( key, value );
	},

	focus: function( event, item ) {
		var nested, focused;
		this.blur( event, event && event.type === "focus" );

		this._scrollIntoView( item );

		this.active = item.first();
		focused = this.active.children( "a" ).addClass( "ui-state-focus" );
		// Only update aria-activedescendant if there's a role
		// otherwise we assume focus is managed elsewhere
		if ( this.options.role ) {
			this.element.attr( "aria-activedescendant", focused.attr( "id" ) );
		}

		// Highlight active parent menu item, if any
		this.active
			.parent()
			.closest( ".ui-menu-item" )
			.children( "a:first" )
			.addClass( "ui-state-active" );

		if ( event && event.type === "keydown" ) {
			this._close();
		} else {
			this.timer = this._delay(function() {
				this._close();
			}, this.delay );
		}

		nested = item.children( ".ui-menu" );
		if ( nested.length && event && ( /^mouse/.test( event.type ) ) ) {
			this._startOpening(nested);
		}
		this.activeMenu = item.parent();

		this._trigger( "focus", event, { item: item } );
	},

	_scrollIntoView: function( item ) {
		var borderTop, paddingTop, offset, scroll, elementHeight, itemHeight;
		if ( this._hasScroll() ) {
			borderTop = parseFloat( $.css( this.activeMenu[0], "borderTopWidth" ) ) || 0;
			paddingTop = parseFloat( $.css( this.activeMenu[0], "paddingTop" ) ) || 0;
			offset = item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop;
			scroll = this.activeMenu.scrollTop();
			elementHeight = this.activeMenu.height();
			itemHeight = item.height();

			if ( offset < 0 ) {
				this.activeMenu.scrollTop( scroll + offset );
			} else if ( offset + itemHeight > elementHeight ) {
				this.activeMenu.scrollTop( scroll + offset - elementHeight + itemHeight );
			}
		}
	},

	blur: function( event, fromFocus ) {
		if ( !fromFocus ) {
			clearTimeout( this.timer );
		}

		if ( !this.active ) {
			return;
		}

		this.active.children( "a" ).removeClass( "ui-state-focus" );
		this.active = null;

		this._trigger( "blur", event, { item: this.active } );
	},

	_startOpening: function( submenu ) {
		clearTimeout( this.timer );

		// Don't open if already open fixes a Firefox bug that caused a .5 pixel
		// shift in the submenu position when mousing over the carat icon
		if ( submenu.attr( "aria-hidden" ) !== "true" ) {
			return;
		}

		this.timer = this._delay(function() {
			this._close();
			this._open( submenu );
		}, this.delay );
	},

	_open: function( submenu ) {
		var position = $.extend({
			of: this.active
		}, this.options.position );

		clearTimeout( this.timer );
		this.element.find( ".ui-menu" ).not( submenu.parents( ".ui-menu" ) )
			.hide()
			.attr( "aria-hidden", "true" );

		submenu
			.show()
			.removeAttr( "aria-hidden" )
			.attr( "aria-expanded", "true" )
			.position( position );
	},

	collapseAll: function( event, all ) {
		clearTimeout( this.timer );
		this.timer = this._delay(function() {
			// If we were passed an event, look for the submenu that contains the event
			var currentMenu = all ? this.element :
				$( event && event.target ).closest( this.element.find( ".ui-menu" ) );

			// If we found no valid submenu ancestor, use the main menu to close all sub menus anyway
			if ( !currentMenu.length ) {
				currentMenu = this.element;
			}

			this._close( currentMenu );

			this.blur( event );
			this.activeMenu = currentMenu;
		}, this.delay );
	},

	// With no arguments, closes the currently active menu - if nothing is active
	// it closes all menus.  If passed an argument, it will search for menus BELOW
	_close: function( startMenu ) {
		if ( !startMenu ) {
			startMenu = this.active ? this.active.parent() : this.element;
		}

		startMenu
			.find( ".ui-menu" )
				.hide()
				.attr( "aria-hidden", "true" )
				.attr( "aria-expanded", "false" )
			.end()
			.find( "a.ui-state-active" )
				.removeClass( "ui-state-active" );
	},

	collapse: function( event ) {
		var newItem = this.active &&
			this.active.parent().closest( ".ui-menu-item", this.element );
		if ( newItem && newItem.length ) {
			this._close();
			this.focus( event, newItem );
		}
	},

	expand: function( event ) {
		var newItem = this.active &&
			this.active
				.children( ".ui-menu " )
				.children( ".ui-menu-item" )
				.first();

		if ( newItem && newItem.length ) {
			this._open( newItem.parent() );

			// Delay so Firefox will not hide activedescendant change in expanding submenu from AT
			this._delay(function() {
				this.focus( event, newItem );
			});
		}
	},

	next: function( event ) {
		this._move( "next", "first", event );
	},

	previous: function( event ) {
		this._move( "prev", "last", event );
	},

	isFirstItem: function() {
		return this.active && !this.active.prevAll( ".ui-menu-item" ).length;
	},

	isLastItem: function() {
		return this.active && !this.active.nextAll( ".ui-menu-item" ).length;
	},

	_move: function( direction, filter, event ) {
		var next;
		if ( this.active ) {
			if ( direction === "first" || direction === "last" ) {
				next = this.active
					[ direction === "first" ? "prevAll" : "nextAll" ]( ".ui-menu-item" )
					.eq( -1 );
			} else {
				next = this.active
					[ direction + "All" ]( ".ui-menu-item" )
					.eq( 0 );
			}
		}
		if ( !next || !next.length || !this.active ) {
			next = this.activeMenu.children( ".ui-menu-item" )[ filter ]();
		}

		this.focus( event, next );
	},

	nextPage: function( event ) {
		var item, base, height;

		if ( !this.active ) {
			this.next( event );
			return;
		}
		if ( this.isLastItem() ) {
			return;
		}
		if ( this._hasScroll() ) {
			base = this.active.offset().top;
			height = this.element.height();
			this.active.nextAll( ".ui-menu-item" ).each(function() {
				item = $( this );
				return item.offset().top - base - height < 0;
			});

			this.focus( event, item );
		} else {
			this.focus( event, this.activeMenu.children( ".ui-menu-item" )
				[ !this.active ? "first" : "last" ]() );
		}
	},

	previousPage: function( event ) {
		var item, base, height;
		if ( !this.active ) {
			this.next( event );
			return;
		}
		if ( this.isFirstItem() ) {
			return;
		}
		if ( this._hasScroll() ) {
			base = this.active.offset().top;
			height = this.element.height();
			this.active.prevAll( ".ui-menu-item" ).each(function() {
				item = $( this );
				return item.offset().top - base + height > 0;
			});

			this.focus( event, item );
		} else {
			this.focus( event, this.activeMenu.children( ".ui-menu-item" ).first() );
		}
	},

	_hasScroll: function() {
		return this.element.outerHeight() < this.element.prop( "scrollHeight" );
	},

	select: function( event ) {
		// TODO: It should never be possible to not have an active item at this
		// point, but the tests don't trigger mouseenter before click.
		this.active = this.active || $( event.target ).closest( ".ui-menu-item" );
		var ui = { item: this.active };
		if ( !this.active.has( ".ui-menu" ).length ) {
			this.collapseAll( event, true );
		}
		this._trigger( "select", event, ui );
	}
});

}( jQuery ));

},{"./core":"jquery-ui/core","./position":"jquery-ui/position","./widget":"jquery-ui/widget","jquery":"jquery"}],"jquery-ui/mouse":[function(require,module,exports){
var jQuery = require('jquery');
require('./widget');

/*!
 * jQuery UI Mouse 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

var mouseHandled = false;
$( document ).mouseup( function() {
	mouseHandled = false;
});

$.widget("ui.mouse", {
	version: "1.10.4",
	options: {
		cancel: "input,textarea,button,select,option",
		distance: 1,
		delay: 0
	},
	_mouseInit: function() {
		var that = this;

		this.element
			.bind("mousedown."+this.widgetName, function(event) {
				return that._mouseDown(event);
			})
			.bind("click."+this.widgetName, function(event) {
				if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
					$.removeData(event.target, that.widgetName + ".preventClickEvent");
					event.stopImmediatePropagation();
					return false;
				}
			});

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.unbind("."+this.widgetName);
		if ( this._mouseMoveDelegate ) {
			$(document)
				.unbind("mousemove."+this.widgetName, this._mouseMoveDelegate)
				.unbind("mouseup."+this.widgetName, this._mouseUpDelegate);
		}
	},

	_mouseDown: function(event) {
		// don't let more than one widget handle mouseStart
		if( mouseHandled ) { return; }

		// we may have missed mouseup (out of window)
		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var that = this,
			btnIsLeft = (event.which === 1),
			// event.target.nodeName works around a bug in IE 8 with
			// disabled inputs (#7620)
			elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				that.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// Click event may never have fired (Gecko & Opera)
		if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
			$.removeData(event.target, this.widgetName + ".preventClickEvent");
		}

		// these delegates are required to keep context
		this._mouseMoveDelegate = function(event) {
			return that._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return that._mouseUp(event);
		};
		$(document)
			.bind("mousemove."+this.widgetName, this._mouseMoveDelegate)
			.bind("mouseup."+this.widgetName, this._mouseUpDelegate);

		event.preventDefault();

		mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		// IE mouseup check - mouseup happened when mouse was out of window
		if ($.ui.ie && ( !document.documentMode || document.documentMode < 9 ) && !event.button) {
			return this._mouseUp(event);
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		$(document)
			.unbind("mousemove."+this.widgetName, this._mouseMoveDelegate)
			.unbind("mouseup."+this.widgetName, this._mouseUpDelegate);

		if (this._mouseStarted) {
			this._mouseStarted = false;

			if (event.target === this._mouseDownEvent.target) {
				$.data(event.target, this.widgetName + ".preventClickEvent", true);
			}

			this._mouseStop(event);
		}

		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(/* event */) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function(/* event */) {},
	_mouseDrag: function(/* event */) {},
	_mouseStop: function(/* event */) {},
	_mouseCapture: function(/* event */) { return true; }
});

})(jQuery);

},{"./widget":"jquery-ui/widget","jquery":"jquery"}],"jquery-ui/position":[function(require,module,exports){
var jQuery = require('jquery');

/*!
 * jQuery UI Position 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
(function( $, undefined ) {

$.ui = $.ui || {};

var cachedScrollbarWidth,
	max = Math.max,
	abs = Math.abs,
	round = Math.round,
	rhorizontal = /left|center|right/,
	rvertical = /top|center|bottom/,
	roffset = /[\+\-]\d+(\.[\d]+)?%?/,
	rposition = /^\w+/,
	rpercent = /%$/,
	_position = $.fn.position;

function getOffsets( offsets, width, height ) {
	return [
		parseFloat( offsets[ 0 ] ) * ( rpercent.test( offsets[ 0 ] ) ? width / 100 : 1 ),
		parseFloat( offsets[ 1 ] ) * ( rpercent.test( offsets[ 1 ] ) ? height / 100 : 1 )
	];
}

function parseCss( element, property ) {
	return parseInt( $.css( element, property ), 10 ) || 0;
}

function getDimensions( elem ) {
	var raw = elem[0];
	if ( raw.nodeType === 9 ) {
		return {
			width: elem.width(),
			height: elem.height(),
			offset: { top: 0, left: 0 }
		};
	}
	if ( $.isWindow( raw ) ) {
		return {
			width: elem.width(),
			height: elem.height(),
			offset: { top: elem.scrollTop(), left: elem.scrollLeft() }
		};
	}
	if ( raw.preventDefault ) {
		return {
			width: 0,
			height: 0,
			offset: { top: raw.pageY, left: raw.pageX }
		};
	}
	return {
		width: elem.outerWidth(),
		height: elem.outerHeight(),
		offset: elem.offset()
	};
}

$.position = {
	scrollbarWidth: function() {
		if ( cachedScrollbarWidth !== undefined ) {
			return cachedScrollbarWidth;
		}
		var w1, w2,
			div = $( "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>" ),
			innerDiv = div.children()[0];

		$( "body" ).append( div );
		w1 = innerDiv.offsetWidth;
		div.css( "overflow", "scroll" );

		w2 = innerDiv.offsetWidth;

		if ( w1 === w2 ) {
			w2 = div[0].clientWidth;
		}

		div.remove();

		return (cachedScrollbarWidth = w1 - w2);
	},
	getScrollInfo: function( within ) {
		var overflowX = within.isWindow || within.isDocument ? "" :
				within.element.css( "overflow-x" ),
			overflowY = within.isWindow || within.isDocument ? "" :
				within.element.css( "overflow-y" ),
			hasOverflowX = overflowX === "scroll" ||
				( overflowX === "auto" && within.width < within.element[0].scrollWidth ),
			hasOverflowY = overflowY === "scroll" ||
				( overflowY === "auto" && within.height < within.element[0].scrollHeight );
		return {
			width: hasOverflowY ? $.position.scrollbarWidth() : 0,
			height: hasOverflowX ? $.position.scrollbarWidth() : 0
		};
	},
	getWithinInfo: function( element ) {
		var withinElement = $( element || window ),
			isWindow = $.isWindow( withinElement[0] ),
			isDocument = !!withinElement[ 0 ] && withinElement[ 0 ].nodeType === 9;
		return {
			element: withinElement,
			isWindow: isWindow,
			isDocument: isDocument,
			offset: withinElement.offset() || { left: 0, top: 0 },
			scrollLeft: withinElement.scrollLeft(),
			scrollTop: withinElement.scrollTop(),
			width: isWindow ? withinElement.width() : withinElement.outerWidth(),
			height: isWindow ? withinElement.height() : withinElement.outerHeight()
		};
	}
};

$.fn.position = function( options ) {
	if ( !options || !options.of ) {
		return _position.apply( this, arguments );
	}

	// make a copy, we don't want to modify arguments
	options = $.extend( {}, options );

	var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
		target = $( options.of ),
		within = $.position.getWithinInfo( options.within ),
		scrollInfo = $.position.getScrollInfo( within ),
		collision = ( options.collision || "flip" ).split( " " ),
		offsets = {};

	dimensions = getDimensions( target );
	if ( target[0].preventDefault ) {
		// force left top to allow flipping
		options.at = "left top";
	}
	targetWidth = dimensions.width;
	targetHeight = dimensions.height;
	targetOffset = dimensions.offset;
	// clone to reuse original targetOffset later
	basePosition = $.extend( {}, targetOffset );

	// force my and at to have valid horizontal and vertical positions
	// if a value is missing or invalid, it will be converted to center
	$.each( [ "my", "at" ], function() {
		var pos = ( options[ this ] || "" ).split( " " ),
			horizontalOffset,
			verticalOffset;

		if ( pos.length === 1) {
			pos = rhorizontal.test( pos[ 0 ] ) ?
				pos.concat( [ "center" ] ) :
				rvertical.test( pos[ 0 ] ) ?
					[ "center" ].concat( pos ) :
					[ "center", "center" ];
		}
		pos[ 0 ] = rhorizontal.test( pos[ 0 ] ) ? pos[ 0 ] : "center";
		pos[ 1 ] = rvertical.test( pos[ 1 ] ) ? pos[ 1 ] : "center";

		// calculate offsets
		horizontalOffset = roffset.exec( pos[ 0 ] );
		verticalOffset = roffset.exec( pos[ 1 ] );
		offsets[ this ] = [
			horizontalOffset ? horizontalOffset[ 0 ] : 0,
			verticalOffset ? verticalOffset[ 0 ] : 0
		];

		// reduce to just the positions without the offsets
		options[ this ] = [
			rposition.exec( pos[ 0 ] )[ 0 ],
			rposition.exec( pos[ 1 ] )[ 0 ]
		];
	});

	// normalize collision option
	if ( collision.length === 1 ) {
		collision[ 1 ] = collision[ 0 ];
	}

	if ( options.at[ 0 ] === "right" ) {
		basePosition.left += targetWidth;
	} else if ( options.at[ 0 ] === "center" ) {
		basePosition.left += targetWidth / 2;
	}

	if ( options.at[ 1 ] === "bottom" ) {
		basePosition.top += targetHeight;
	} else if ( options.at[ 1 ] === "center" ) {
		basePosition.top += targetHeight / 2;
	}

	atOffset = getOffsets( offsets.at, targetWidth, targetHeight );
	basePosition.left += atOffset[ 0 ];
	basePosition.top += atOffset[ 1 ];

	return this.each(function() {
		var collisionPosition, using,
			elem = $( this ),
			elemWidth = elem.outerWidth(),
			elemHeight = elem.outerHeight(),
			marginLeft = parseCss( this, "marginLeft" ),
			marginTop = parseCss( this, "marginTop" ),
			collisionWidth = elemWidth + marginLeft + parseCss( this, "marginRight" ) + scrollInfo.width,
			collisionHeight = elemHeight + marginTop + parseCss( this, "marginBottom" ) + scrollInfo.height,
			position = $.extend( {}, basePosition ),
			myOffset = getOffsets( offsets.my, elem.outerWidth(), elem.outerHeight() );

		if ( options.my[ 0 ] === "right" ) {
			position.left -= elemWidth;
		} else if ( options.my[ 0 ] === "center" ) {
			position.left -= elemWidth / 2;
		}

		if ( options.my[ 1 ] === "bottom" ) {
			position.top -= elemHeight;
		} else if ( options.my[ 1 ] === "center" ) {
			position.top -= elemHeight / 2;
		}

		position.left += myOffset[ 0 ];
		position.top += myOffset[ 1 ];

		// if the browser doesn't support fractions, then round for consistent results
		if ( !$.support.offsetFractions ) {
			position.left = round( position.left );
			position.top = round( position.top );
		}

		collisionPosition = {
			marginLeft: marginLeft,
			marginTop: marginTop
		};

		$.each( [ "left", "top" ], function( i, dir ) {
			if ( $.ui.position[ collision[ i ] ] ) {
				$.ui.position[ collision[ i ] ][ dir ]( position, {
					targetWidth: targetWidth,
					targetHeight: targetHeight,
					elemWidth: elemWidth,
					elemHeight: elemHeight,
					collisionPosition: collisionPosition,
					collisionWidth: collisionWidth,
					collisionHeight: collisionHeight,
					offset: [ atOffset[ 0 ] + myOffset[ 0 ], atOffset [ 1 ] + myOffset[ 1 ] ],
					my: options.my,
					at: options.at,
					within: within,
					elem : elem
				});
			}
		});

		if ( options.using ) {
			// adds feedback as second argument to using callback, if present
			using = function( props ) {
				var left = targetOffset.left - position.left,
					right = left + targetWidth - elemWidth,
					top = targetOffset.top - position.top,
					bottom = top + targetHeight - elemHeight,
					feedback = {
						target: {
							element: target,
							left: targetOffset.left,
							top: targetOffset.top,
							width: targetWidth,
							height: targetHeight
						},
						element: {
							element: elem,
							left: position.left,
							top: position.top,
							width: elemWidth,
							height: elemHeight
						},
						horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
						vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
					};
				if ( targetWidth < elemWidth && abs( left + right ) < targetWidth ) {
					feedback.horizontal = "center";
				}
				if ( targetHeight < elemHeight && abs( top + bottom ) < targetHeight ) {
					feedback.vertical = "middle";
				}
				if ( max( abs( left ), abs( right ) ) > max( abs( top ), abs( bottom ) ) ) {
					feedback.important = "horizontal";
				} else {
					feedback.important = "vertical";
				}
				options.using.call( this, props, feedback );
			};
		}

		elem.offset( $.extend( position, { using: using } ) );
	});
};

$.ui.position = {
	fit: {
		left: function( position, data ) {
			var within = data.within,
				withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
				outerWidth = within.width,
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				overLeft = withinOffset - collisionPosLeft,
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
				newOverRight;

			// element is wider than within
			if ( data.collisionWidth > outerWidth ) {
				// element is initially over the left side of within
				if ( overLeft > 0 && overRight <= 0 ) {
					newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
					position.left += overLeft - newOverRight;
				// element is initially over right side of within
				} else if ( overRight > 0 && overLeft <= 0 ) {
					position.left = withinOffset;
				// element is initially over both left and right sides of within
				} else {
					if ( overLeft > overRight ) {
						position.left = withinOffset + outerWidth - data.collisionWidth;
					} else {
						position.left = withinOffset;
					}
				}
			// too far left -> align with left edge
			} else if ( overLeft > 0 ) {
				position.left += overLeft;
			// too far right -> align with right edge
			} else if ( overRight > 0 ) {
				position.left -= overRight;
			// adjust based on position and margin
			} else {
				position.left = max( position.left - collisionPosLeft, position.left );
			}
		},
		top: function( position, data ) {
			var within = data.within,
				withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
				outerHeight = data.within.height,
				collisionPosTop = position.top - data.collisionPosition.marginTop,
				overTop = withinOffset - collisionPosTop,
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
				newOverBottom;

			// element is taller than within
			if ( data.collisionHeight > outerHeight ) {
				// element is initially over the top of within
				if ( overTop > 0 && overBottom <= 0 ) {
					newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
					position.top += overTop - newOverBottom;
				// element is initially over bottom of within
				} else if ( overBottom > 0 && overTop <= 0 ) {
					position.top = withinOffset;
				// element is initially over both top and bottom of within
				} else {
					if ( overTop > overBottom ) {
						position.top = withinOffset + outerHeight - data.collisionHeight;
					} else {
						position.top = withinOffset;
					}
				}
			// too far up -> align with top
			} else if ( overTop > 0 ) {
				position.top += overTop;
			// too far down -> align with bottom edge
			} else if ( overBottom > 0 ) {
				position.top -= overBottom;
			// adjust based on position and margin
			} else {
				position.top = max( position.top - collisionPosTop, position.top );
			}
		}
	},
	flip: {
		left: function( position, data ) {
			var within = data.within,
				withinOffset = within.offset.left + within.scrollLeft,
				outerWidth = within.width,
				offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				overLeft = collisionPosLeft - offsetLeft,
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
				myOffset = data.my[ 0 ] === "left" ?
					-data.elemWidth :
					data.my[ 0 ] === "right" ?
						data.elemWidth :
						0,
				atOffset = data.at[ 0 ] === "left" ?
					data.targetWidth :
					data.at[ 0 ] === "right" ?
						-data.targetWidth :
						0,
				offset = -2 * data.offset[ 0 ],
				newOverRight,
				newOverLeft;

			if ( overLeft < 0 ) {
				newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
				if ( newOverRight < 0 || newOverRight < abs( overLeft ) ) {
					position.left += myOffset + atOffset + offset;
				}
			}
			else if ( overRight > 0 ) {
				newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
				if ( newOverLeft > 0 || abs( newOverLeft ) < overRight ) {
					position.left += myOffset + atOffset + offset;
				}
			}
		},
		top: function( position, data ) {
			var within = data.within,
				withinOffset = within.offset.top + within.scrollTop,
				outerHeight = within.height,
				offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
				collisionPosTop = position.top - data.collisionPosition.marginTop,
				overTop = collisionPosTop - offsetTop,
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
				top = data.my[ 1 ] === "top",
				myOffset = top ?
					-data.elemHeight :
					data.my[ 1 ] === "bottom" ?
						data.elemHeight :
						0,
				atOffset = data.at[ 1 ] === "top" ?
					data.targetHeight :
					data.at[ 1 ] === "bottom" ?
						-data.targetHeight :
						0,
				offset = -2 * data.offset[ 1 ],
				newOverTop,
				newOverBottom;
			if ( overTop < 0 ) {
				newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
				if ( ( position.top + myOffset + atOffset + offset) > overTop && ( newOverBottom < 0 || newOverBottom < abs( overTop ) ) ) {
					position.top += myOffset + atOffset + offset;
				}
			}
			else if ( overBottom > 0 ) {
				newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
				if ( ( position.top + myOffset + atOffset + offset) > overBottom && ( newOverTop > 0 || abs( newOverTop ) < overBottom ) ) {
					position.top += myOffset + atOffset + offset;
				}
			}
		}
	},
	flipfit: {
		left: function() {
			$.ui.position.flip.left.apply( this, arguments );
			$.ui.position.fit.left.apply( this, arguments );
		},
		top: function() {
			$.ui.position.flip.top.apply( this, arguments );
			$.ui.position.fit.top.apply( this, arguments );
		}
	}
};

// fraction support test
(function () {
	var testElement, testElementParent, testElementStyle, offsetLeft, i,
		body = document.getElementsByTagName( "body" )[ 0 ],
		div = document.createElement( "div" );

	//Create a "fake body" for testing based on method used in jQuery.support
	testElement = document.createElement( body ? "div" : "body" );
	testElementStyle = {
		visibility: "hidden",
		width: 0,
		height: 0,
		border: 0,
		margin: 0,
		background: "none"
	};
	if ( body ) {
		$.extend( testElementStyle, {
			position: "absolute",
			left: "-1000px",
			top: "-1000px"
		});
	}
	for ( i in testElementStyle ) {
		testElement.style[ i ] = testElementStyle[ i ];
	}
	testElement.appendChild( div );
	testElementParent = body || document.documentElement;
	testElementParent.insertBefore( testElement, testElementParent.firstChild );

	div.style.cssText = "position: absolute; left: 10.7432222px;";

	offsetLeft = $( div ).offset().left;
	$.support.offsetFractions = offsetLeft > 10 && offsetLeft < 11;

	testElement.innerHTML = "";
	testElementParent.removeChild( testElement );
})();

}( jQuery ) );

},{"jquery":"jquery"}],"jquery-ui/slider":[function(require,module,exports){
var jQuery = require('jquery');
require('./core');
require('./mouse');
require('./widget');

/*!
 * jQuery UI Slider 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slider/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

// number of pages in a slider
// (how many times can you page up/down to go through the whole range)
var numPages = 5;

$.widget( "ui.slider", $.ui.mouse, {
	version: "1.10.4",
	widgetEventPrefix: "slide",

	options: {
		animate: false,
		distance: 0,
		max: 100,
		min: 0,
		orientation: "horizontal",
		range: false,
		step: 1,
		value: 0,
		values: null,

		// callbacks
		change: null,
		slide: null,
		start: null,
		stop: null
	},

	_create: function() {
		this._keySliding = false;
		this._mouseSliding = false;
		this._animateOff = true;
		this._handleIndex = null;
		this._detectOrientation();
		this._mouseInit();

		this.element
			.addClass( "ui-slider" +
				" ui-slider-" + this.orientation +
				" ui-widget" +
				" ui-widget-content" +
				" ui-corner-all");

		this._refresh();
		this._setOption( "disabled", this.options.disabled );

		this._animateOff = false;
	},

	_refresh: function() {
		this._createRange();
		this._createHandles();
		this._setupEvents();
		this._refreshValue();
	},

	_createHandles: function() {
		var i, handleCount,
			options = this.options,
			existingHandles = this.element.find( ".ui-slider-handle" ).addClass( "ui-state-default ui-corner-all" ),
			handle = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
			handles = [];

		handleCount = ( options.values && options.values.length ) || 1;

		if ( existingHandles.length > handleCount ) {
			existingHandles.slice( handleCount ).remove();
			existingHandles = existingHandles.slice( 0, handleCount );
		}

		for ( i = existingHandles.length; i < handleCount; i++ ) {
			handles.push( handle );
		}

		this.handles = existingHandles.add( $( handles.join( "" ) ).appendTo( this.element ) );

		this.handle = this.handles.eq( 0 );

		this.handles.each(function( i ) {
			$( this ).data( "ui-slider-handle-index", i );
		});
	},

	_createRange: function() {
		var options = this.options,
			classes = "";

		if ( options.range ) {
			if ( options.range === true ) {
				if ( !options.values ) {
					options.values = [ this._valueMin(), this._valueMin() ];
				} else if ( options.values.length && options.values.length !== 2 ) {
					options.values = [ options.values[0], options.values[0] ];
				} else if ( $.isArray( options.values ) ) {
					options.values = options.values.slice(0);
				}
			}

			if ( !this.range || !this.range.length ) {
				this.range = $( "<div></div>" )
					.appendTo( this.element );

				classes = "ui-slider-range" +
				// note: this isn't the most fittingly semantic framework class for this element,
				// but worked best visually with a variety of themes
				" ui-widget-header ui-corner-all";
			} else {
				this.range.removeClass( "ui-slider-range-min ui-slider-range-max" )
					// Handle range switching from true to min/max
					.css({
						"left": "",
						"bottom": ""
					});
			}

			this.range.addClass( classes +
				( ( options.range === "min" || options.range === "max" ) ? " ui-slider-range-" + options.range : "" ) );
		} else {
			if ( this.range ) {
				this.range.remove();
			}
			this.range = null;
		}
	},

	_setupEvents: function() {
		var elements = this.handles.add( this.range ).filter( "a" );
		this._off( elements );
		this._on( elements, this._handleEvents );
		this._hoverable( elements );
		this._focusable( elements );
	},

	_destroy: function() {
		this.handles.remove();
		if ( this.range ) {
			this.range.remove();
		}

		this.element
			.removeClass( "ui-slider" +
				" ui-slider-horizontal" +
				" ui-slider-vertical" +
				" ui-widget" +
				" ui-widget-content" +
				" ui-corner-all" );

		this._mouseDestroy();
	},

	_mouseCapture: function( event ) {
		var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle,
			that = this,
			o = this.options;

		if ( o.disabled ) {
			return false;
		}

		this.elementSize = {
			width: this.element.outerWidth(),
			height: this.element.outerHeight()
		};
		this.elementOffset = this.element.offset();

		position = { x: event.pageX, y: event.pageY };
		normValue = this._normValueFromMouse( position );
		distance = this._valueMax() - this._valueMin() + 1;
		this.handles.each(function( i ) {
			var thisDistance = Math.abs( normValue - that.values(i) );
			if (( distance > thisDistance ) ||
				( distance === thisDistance &&
					(i === that._lastChangedValue || that.values(i) === o.min ))) {
				distance = thisDistance;
				closestHandle = $( this );
				index = i;
			}
		});

		allowed = this._start( event, index );
		if ( allowed === false ) {
			return false;
		}
		this._mouseSliding = true;

		this._handleIndex = index;

		closestHandle
			.addClass( "ui-state-active" )
			.focus();

		offset = closestHandle.offset();
		mouseOverHandle = !$( event.target ).parents().addBack().is( ".ui-slider-handle" );
		this._clickOffset = mouseOverHandle ? { left: 0, top: 0 } : {
			left: event.pageX - offset.left - ( closestHandle.width() / 2 ),
			top: event.pageY - offset.top -
				( closestHandle.height() / 2 ) -
				( parseInt( closestHandle.css("borderTopWidth"), 10 ) || 0 ) -
				( parseInt( closestHandle.css("borderBottomWidth"), 10 ) || 0) +
				( parseInt( closestHandle.css("marginTop"), 10 ) || 0)
		};

		if ( !this.handles.hasClass( "ui-state-hover" ) ) {
			this._slide( event, index, normValue );
		}
		this._animateOff = true;
		return true;
	},

	_mouseStart: function() {
		return true;
	},

	_mouseDrag: function( event ) {
		var position = { x: event.pageX, y: event.pageY },
			normValue = this._normValueFromMouse( position );

		this._slide( event, this._handleIndex, normValue );

		return false;
	},

	_mouseStop: function( event ) {
		this.handles.removeClass( "ui-state-active" );
		this._mouseSliding = false;

		this._stop( event, this._handleIndex );
		this._change( event, this._handleIndex );

		this._handleIndex = null;
		this._clickOffset = null;
		this._animateOff = false;

		return false;
	},

	_detectOrientation: function() {
		this.orientation = ( this.options.orientation === "vertical" ) ? "vertical" : "horizontal";
	},

	_normValueFromMouse: function( position ) {
		var pixelTotal,
			pixelMouse,
			percentMouse,
			valueTotal,
			valueMouse;

		if ( this.orientation === "horizontal" ) {
			pixelTotal = this.elementSize.width;
			pixelMouse = position.x - this.elementOffset.left - ( this._clickOffset ? this._clickOffset.left : 0 );
		} else {
			pixelTotal = this.elementSize.height;
			pixelMouse = position.y - this.elementOffset.top - ( this._clickOffset ? this._clickOffset.top : 0 );
		}

		percentMouse = ( pixelMouse / pixelTotal );
		if ( percentMouse > 1 ) {
			percentMouse = 1;
		}
		if ( percentMouse < 0 ) {
			percentMouse = 0;
		}
		if ( this.orientation === "vertical" ) {
			percentMouse = 1 - percentMouse;
		}

		valueTotal = this._valueMax() - this._valueMin();
		valueMouse = this._valueMin() + percentMouse * valueTotal;

		return this._trimAlignValue( valueMouse );
	},

	_start: function( event, index ) {
		var uiHash = {
			handle: this.handles[ index ],
			value: this.value()
		};
		if ( this.options.values && this.options.values.length ) {
			uiHash.value = this.values( index );
			uiHash.values = this.values();
		}
		return this._trigger( "start", event, uiHash );
	},

	_slide: function( event, index, newVal ) {
		var otherVal,
			newValues,
			allowed;

		if ( this.options.values && this.options.values.length ) {
			otherVal = this.values( index ? 0 : 1 );

			if ( ( this.options.values.length === 2 && this.options.range === true ) &&
					( ( index === 0 && newVal > otherVal) || ( index === 1 && newVal < otherVal ) )
				) {
				newVal = otherVal;
			}

			if ( newVal !== this.values( index ) ) {
				newValues = this.values();
				newValues[ index ] = newVal;
				// A slide can be canceled by returning false from the slide callback
				allowed = this._trigger( "slide", event, {
					handle: this.handles[ index ],
					value: newVal,
					values: newValues
				} );
				otherVal = this.values( index ? 0 : 1 );
				if ( allowed !== false ) {
					this.values( index, newVal );
				}
			}
		} else {
			if ( newVal !== this.value() ) {
				// A slide can be canceled by returning false from the slide callback
				allowed = this._trigger( "slide", event, {
					handle: this.handles[ index ],
					value: newVal
				} );
				if ( allowed !== false ) {
					this.value( newVal );
				}
			}
		}
	},

	_stop: function( event, index ) {
		var uiHash = {
			handle: this.handles[ index ],
			value: this.value()
		};
		if ( this.options.values && this.options.values.length ) {
			uiHash.value = this.values( index );
			uiHash.values = this.values();
		}

		this._trigger( "stop", event, uiHash );
	},

	_change: function( event, index ) {
		if ( !this._keySliding && !this._mouseSliding ) {
			var uiHash = {
				handle: this.handles[ index ],
				value: this.value()
			};
			if ( this.options.values && this.options.values.length ) {
				uiHash.value = this.values( index );
				uiHash.values = this.values();
			}

			//store the last changed value index for reference when handles overlap
			this._lastChangedValue = index;

			this._trigger( "change", event, uiHash );
		}
	},

	value: function( newValue ) {
		if ( arguments.length ) {
			this.options.value = this._trimAlignValue( newValue );
			this._refreshValue();
			this._change( null, 0 );
			return;
		}

		return this._value();
	},

	values: function( index, newValue ) {
		var vals,
			newValues,
			i;

		if ( arguments.length > 1 ) {
			this.options.values[ index ] = this._trimAlignValue( newValue );
			this._refreshValue();
			this._change( null, index );
			return;
		}

		if ( arguments.length ) {
			if ( $.isArray( arguments[ 0 ] ) ) {
				vals = this.options.values;
				newValues = arguments[ 0 ];
				for ( i = 0; i < vals.length; i += 1 ) {
					vals[ i ] = this._trimAlignValue( newValues[ i ] );
					this._change( null, i );
				}
				this._refreshValue();
			} else {
				if ( this.options.values && this.options.values.length ) {
					return this._values( index );
				} else {
					return this.value();
				}
			}
		} else {
			return this._values();
		}
	},

	_setOption: function( key, value ) {
		var i,
			valsLength = 0;

		if ( key === "range" && this.options.range === true ) {
			if ( value === "min" ) {
				this.options.value = this._values( 0 );
				this.options.values = null;
			} else if ( value === "max" ) {
				this.options.value = this._values( this.options.values.length-1 );
				this.options.values = null;
			}
		}

		if ( $.isArray( this.options.values ) ) {
			valsLength = this.options.values.length;
		}

		$.Widget.prototype._setOption.apply( this, arguments );

		switch ( key ) {
			case "orientation":
				this._detectOrientation();
				this.element
					.removeClass( "ui-slider-horizontal ui-slider-vertical" )
					.addClass( "ui-slider-" + this.orientation );
				this._refreshValue();
				break;
			case "value":
				this._animateOff = true;
				this._refreshValue();
				this._change( null, 0 );
				this._animateOff = false;
				break;
			case "values":
				this._animateOff = true;
				this._refreshValue();
				for ( i = 0; i < valsLength; i += 1 ) {
					this._change( null, i );
				}
				this._animateOff = false;
				break;
			case "min":
			case "max":
				this._animateOff = true;
				this._refreshValue();
				this._animateOff = false;
				break;
			case "range":
				this._animateOff = true;
				this._refresh();
				this._animateOff = false;
				break;
		}
	},

	//internal value getter
	// _value() returns value trimmed by min and max, aligned by step
	_value: function() {
		var val = this.options.value;
		val = this._trimAlignValue( val );

		return val;
	},

	//internal values getter
	// _values() returns array of values trimmed by min and max, aligned by step
	// _values( index ) returns single value trimmed by min and max, aligned by step
	_values: function( index ) {
		var val,
			vals,
			i;

		if ( arguments.length ) {
			val = this.options.values[ index ];
			val = this._trimAlignValue( val );

			return val;
		} else if ( this.options.values && this.options.values.length ) {
			// .slice() creates a copy of the array
			// this copy gets trimmed by min and max and then returned
			vals = this.options.values.slice();
			for ( i = 0; i < vals.length; i+= 1) {
				vals[ i ] = this._trimAlignValue( vals[ i ] );
			}

			return vals;
		} else {
			return [];
		}
	},

	// returns the step-aligned value that val is closest to, between (inclusive) min and max
	_trimAlignValue: function( val ) {
		if ( val <= this._valueMin() ) {
			return this._valueMin();
		}
		if ( val >= this._valueMax() ) {
			return this._valueMax();
		}
		var step = ( this.options.step > 0 ) ? this.options.step : 1,
			valModStep = (val - this._valueMin()) % step,
			alignValue = val - valModStep;

		if ( Math.abs(valModStep) * 2 >= step ) {
			alignValue += ( valModStep > 0 ) ? step : ( -step );
		}

		// Since JavaScript has problems with large floats, round
		// the final value to 5 digits after the decimal point (see #4124)
		return parseFloat( alignValue.toFixed(5) );
	},

	_valueMin: function() {
		return this.options.min;
	},

	_valueMax: function() {
		return this.options.max;
	},

	_refreshValue: function() {
		var lastValPercent, valPercent, value, valueMin, valueMax,
			oRange = this.options.range,
			o = this.options,
			that = this,
			animate = ( !this._animateOff ) ? o.animate : false,
			_set = {};

		if ( this.options.values && this.options.values.length ) {
			this.handles.each(function( i ) {
				valPercent = ( that.values(i) - that._valueMin() ) / ( that._valueMax() - that._valueMin() ) * 100;
				_set[ that.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
				$( this ).stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );
				if ( that.options.range === true ) {
					if ( that.orientation === "horizontal" ) {
						if ( i === 0 ) {
							that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { left: valPercent + "%" }, o.animate );
						}
						if ( i === 1 ) {
							that.range[ animate ? "animate" : "css" ]( { width: ( valPercent - lastValPercent ) + "%" }, { queue: false, duration: o.animate } );
						}
					} else {
						if ( i === 0 ) {
							that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { bottom: ( valPercent ) + "%" }, o.animate );
						}
						if ( i === 1 ) {
							that.range[ animate ? "animate" : "css" ]( { height: ( valPercent - lastValPercent ) + "%" }, { queue: false, duration: o.animate } );
						}
					}
				}
				lastValPercent = valPercent;
			});
		} else {
			value = this.value();
			valueMin = this._valueMin();
			valueMax = this._valueMax();
			valPercent = ( valueMax !== valueMin ) ?
					( value - valueMin ) / ( valueMax - valueMin ) * 100 :
					0;
			_set[ this.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
			this.handle.stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );

			if ( oRange === "min" && this.orientation === "horizontal" ) {
				this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { width: valPercent + "%" }, o.animate );
			}
			if ( oRange === "max" && this.orientation === "horizontal" ) {
				this.range[ animate ? "animate" : "css" ]( { width: ( 100 - valPercent ) + "%" }, { queue: false, duration: o.animate } );
			}
			if ( oRange === "min" && this.orientation === "vertical" ) {
				this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { height: valPercent + "%" }, o.animate );
			}
			if ( oRange === "max" && this.orientation === "vertical" ) {
				this.range[ animate ? "animate" : "css" ]( { height: ( 100 - valPercent ) + "%" }, { queue: false, duration: o.animate } );
			}
		}
	},

	_handleEvents: {
		keydown: function( event ) {
			var allowed, curVal, newVal, step,
				index = $( event.target ).data( "ui-slider-handle-index" );

			switch ( event.keyCode ) {
				case $.ui.keyCode.HOME:
				case $.ui.keyCode.END:
				case $.ui.keyCode.PAGE_UP:
				case $.ui.keyCode.PAGE_DOWN:
				case $.ui.keyCode.UP:
				case $.ui.keyCode.RIGHT:
				case $.ui.keyCode.DOWN:
				case $.ui.keyCode.LEFT:
					event.preventDefault();
					if ( !this._keySliding ) {
						this._keySliding = true;
						$( event.target ).addClass( "ui-state-active" );
						allowed = this._start( event, index );
						if ( allowed === false ) {
							return;
						}
					}
					break;
			}

			step = this.options.step;
			if ( this.options.values && this.options.values.length ) {
				curVal = newVal = this.values( index );
			} else {
				curVal = newVal = this.value();
			}

			switch ( event.keyCode ) {
				case $.ui.keyCode.HOME:
					newVal = this._valueMin();
					break;
				case $.ui.keyCode.END:
					newVal = this._valueMax();
					break;
				case $.ui.keyCode.PAGE_UP:
					newVal = this._trimAlignValue( curVal + ( (this._valueMax() - this._valueMin()) / numPages ) );
					break;
				case $.ui.keyCode.PAGE_DOWN:
					newVal = this._trimAlignValue( curVal - ( (this._valueMax() - this._valueMin()) / numPages ) );
					break;
				case $.ui.keyCode.UP:
				case $.ui.keyCode.RIGHT:
					if ( curVal === this._valueMax() ) {
						return;
					}
					newVal = this._trimAlignValue( curVal + step );
					break;
				case $.ui.keyCode.DOWN:
				case $.ui.keyCode.LEFT:
					if ( curVal === this._valueMin() ) {
						return;
					}
					newVal = this._trimAlignValue( curVal - step );
					break;
			}

			this._slide( event, index, newVal );
		},
		click: function( event ) {
			event.preventDefault();
		},
		keyup: function( event ) {
			var index = $( event.target ).data( "ui-slider-handle-index" );

			if ( this._keySliding ) {
				this._keySliding = false;
				this._stop( event, index );
				this._change( event, index );
				$( event.target ).removeClass( "ui-state-active" );
			}
		}
	}

});

}(jQuery));

},{"./core":"jquery-ui/core","./mouse":"jquery-ui/mouse","./widget":"jquery-ui/widget","jquery":"jquery"}],"jquery-ui/sortable":[function(require,module,exports){
var jQuery = require('jquery');
require('./core');
require('./mouse');
require('./widget');

/*!
 * jQuery UI Sortable 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/sortable/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

function isOverAxis( x, reference, size ) {
	return ( x > reference ) && ( x < ( reference + size ) );
}

function isFloating(item) {
	return (/left|right/).test(item.css("float")) || (/inline|table-cell/).test(item.css("display"));
}

$.widget("ui.sortable", $.ui.mouse, {
	version: "1.10.4",
	widgetEventPrefix: "sort",
	ready: false,
	options: {
		appendTo: "parent",
		axis: false,
		connectWith: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		dropOnEmpty: true,
		forcePlaceholderSize: false,
		forceHelperSize: false,
		grid: false,
		handle: false,
		helper: "original",
		items: "> *",
		opacity: false,
		placeholder: false,
		revert: false,
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		scope: "default",
		tolerance: "intersect",
		zIndex: 1000,

		// callbacks
		activate: null,
		beforeStop: null,
		change: null,
		deactivate: null,
		out: null,
		over: null,
		receive: null,
		remove: null,
		sort: null,
		start: null,
		stop: null,
		update: null
	},
	_create: function() {

		var o = this.options;
		this.containerCache = {};
		this.element.addClass("ui-sortable");

		//Get the items
		this.refresh();

		//Let's determine if the items are being displayed horizontally
		this.floating = this.items.length ? o.axis === "x" || isFloating(this.items[0].item) : false;

		//Let's determine the parent's offset
		this.offset = this.element.offset();

		//Initialize mouse events for interaction
		this._mouseInit();

		//We're ready to go
		this.ready = true;

	},

	_destroy: function() {
		this.element
			.removeClass("ui-sortable ui-sortable-disabled");
		this._mouseDestroy();

		for ( var i = this.items.length - 1; i >= 0; i-- ) {
			this.items[i].item.removeData(this.widgetName + "-item");
		}

		return this;
	},

	_setOption: function(key, value){
		if ( key === "disabled" ) {
			this.options[ key ] = value;

			this.widget().toggleClass( "ui-sortable-disabled", !!value );
		} else {
			// Don't call widget base _setOption for disable as it adds ui-state-disabled class
			$.Widget.prototype._setOption.apply(this, arguments);
		}
	},

	_mouseCapture: function(event, overrideHandle) {
		var currentItem = null,
			validHandle = false,
			that = this;

		if (this.reverting) {
			return false;
		}

		if(this.options.disabled || this.options.type === "static") {
			return false;
		}

		//We have to refresh the items data once first
		this._refreshItems(event);

		//Find out if the clicked node (or one of its parents) is a actual item in this.items
		$(event.target).parents().each(function() {
			if($.data(this, that.widgetName + "-item") === that) {
				currentItem = $(this);
				return false;
			}
		});
		if($.data(event.target, that.widgetName + "-item") === that) {
			currentItem = $(event.target);
		}

		if(!currentItem) {
			return false;
		}
		if(this.options.handle && !overrideHandle) {
			$(this.options.handle, currentItem).find("*").addBack().each(function() {
				if(this === event.target) {
					validHandle = true;
				}
			});
			if(!validHandle) {
				return false;
			}
		}

		this.currentItem = currentItem;
		this._removeCurrentsFromItems();
		return true;

	},

	_mouseStart: function(event, overrideHandle, noActivation) {

		var i, body,
			o = this.options;

		this.currentContainer = this;

		//We only need to call refreshPositions, because the refreshItems call has been moved to mouseCapture
		this.refreshPositions();

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		//Cache the helper size
		this._cacheHelperProportions();

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Get the next scrolling parent
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.currentItem.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		// Only after we got the offset, we can change the helper's position to absolute
		// TODO: Still need to figure out a way to make relative sorting possible
		this.helper.css("position", "absolute");
		this.cssPosition = this.helper.css("position");

		//Generate the original position
		this.originalPosition = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Cache the former DOM position
		this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] };

		//If the helper is not the original, hide the original so it's not playing any role during the drag, won't cause anything bad this way
		if(this.helper[0] !== this.currentItem[0]) {
			this.currentItem.hide();
		}

		//Create the placeholder
		this._createPlaceholder();

		//Set a containment if given in the options
		if(o.containment) {
			this._setContainment();
		}

		if( o.cursor && o.cursor !== "auto" ) { // cursor option
			body = this.document.find( "body" );

			// support: IE
			this.storedCursor = body.css( "cursor" );
			body.css( "cursor", o.cursor );

			this.storedStylesheet = $( "<style>*{ cursor: "+o.cursor+" !important; }</style>" ).appendTo( body );
		}

		if(o.opacity) { // opacity option
			if (this.helper.css("opacity")) {
				this._storedOpacity = this.helper.css("opacity");
			}
			this.helper.css("opacity", o.opacity);
		}

		if(o.zIndex) { // zIndex option
			if (this.helper.css("zIndex")) {
				this._storedZIndex = this.helper.css("zIndex");
			}
			this.helper.css("zIndex", o.zIndex);
		}

		//Prepare scrolling
		if(this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
			this.overflowOffset = this.scrollParent.offset();
		}

		//Call callbacks
		this._trigger("start", event, this._uiHash());

		//Recache the helper size
		if(!this._preserveHelperProportions) {
			this._cacheHelperProportions();
		}


		//Post "activate" events to possible containers
		if( !noActivation ) {
			for ( i = this.containers.length - 1; i >= 0; i-- ) {
				this.containers[ i ]._trigger( "activate", event, this._uiHash( this ) );
			}
		}

		//Prepare possible droppables
		if($.ui.ddmanager) {
			$.ui.ddmanager.current = this;
		}

		if ($.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(this, event);
		}

		this.dragging = true;

		this.helper.addClass("ui-sortable-helper");
		this._mouseDrag(event); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		return true;

	},

	_mouseDrag: function(event) {
		var i, item, itemElement, intersection,
			o = this.options,
			scrolled = false;

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		if (!this.lastPositionAbs) {
			this.lastPositionAbs = this.positionAbs;
		}

		//Do scrolling
		if(this.options.scroll) {
			if(this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {

				if((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
				} else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;
				}

				if((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
				} else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;
				}

			} else {

				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				} else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
				}

				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				} else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
				}

			}

			if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
				$.ui.ddmanager.prepareOffsets(this, event);
			}
		}

		//Regenerate the absolute position used for position checks
		this.positionAbs = this._convertPositionTo("absolute");

		//Set the helper position
		if(!this.options.axis || this.options.axis !== "y") {
			this.helper[0].style.left = this.position.left+"px";
		}
		if(!this.options.axis || this.options.axis !== "x") {
			this.helper[0].style.top = this.position.top+"px";
		}

		//Rearrange
		for (i = this.items.length - 1; i >= 0; i--) {

			//Cache variables and intersection, continue if no intersection
			item = this.items[i];
			itemElement = item.item[0];
			intersection = this._intersectsWithPointer(item);
			if (!intersection) {
				continue;
			}

			// Only put the placeholder inside the current Container, skip all
			// items from other containers. This works because when moving
			// an item from one container to another the
			// currentContainer is switched before the placeholder is moved.
			//
			// Without this, moving items in "sub-sortables" can cause
			// the placeholder to jitter beetween the outer and inner container.
			if (item.instance !== this.currentContainer) {
				continue;
			}

			// cannot intersect with itself
			// no useless actions that have been done before
			// no action if the item moved is the parent of the item checked
			if (itemElement !== this.currentItem[0] &&
				this.placeholder[intersection === 1 ? "next" : "prev"]()[0] !== itemElement &&
				!$.contains(this.placeholder[0], itemElement) &&
				(this.options.type === "semi-dynamic" ? !$.contains(this.element[0], itemElement) : true)
			) {

				this.direction = intersection === 1 ? "down" : "up";

				if (this.options.tolerance === "pointer" || this._intersectsWithSides(item)) {
					this._rearrange(event, item);
				} else {
					break;
				}

				this._trigger("change", event, this._uiHash());
				break;
			}
		}

		//Post events to containers
		this._contactContainers(event);

		//Interconnect with droppables
		if($.ui.ddmanager) {
			$.ui.ddmanager.drag(this, event);
		}

		//Call callbacks
		this._trigger("sort", event, this._uiHash());

		this.lastPositionAbs = this.positionAbs;
		return false;

	},

	_mouseStop: function(event, noPropagation) {

		if(!event) {
			return;
		}

		//If we are using droppables, inform the manager about the drop
		if ($.ui.ddmanager && !this.options.dropBehaviour) {
			$.ui.ddmanager.drop(this, event);
		}

		if(this.options.revert) {
			var that = this,
				cur = this.placeholder.offset(),
				axis = this.options.axis,
				animation = {};

			if ( !axis || axis === "x" ) {
				animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft);
			}
			if ( !axis || axis === "y" ) {
				animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop);
			}
			this.reverting = true;
			$(this.helper).animate( animation, parseInt(this.options.revert, 10) || 500, function() {
				that._clear(event);
			});
		} else {
			this._clear(event, noPropagation);
		}

		return false;

	},

	cancel: function() {

		if(this.dragging) {

			this._mouseUp({ target: null });

			if(this.options.helper === "original") {
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
			} else {
				this.currentItem.show();
			}

			//Post deactivating events to containers
			for (var i = this.containers.length - 1; i >= 0; i--){
				this.containers[i]._trigger("deactivate", null, this._uiHash(this));
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", null, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}

		if (this.placeholder) {
			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
			if(this.placeholder[0].parentNode) {
				this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
			}
			if(this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
				this.helper.remove();
			}

			$.extend(this, {
				helper: null,
				dragging: false,
				reverting: false,
				_noFinalSort: null
			});

			if(this.domPosition.prev) {
				$(this.domPosition.prev).after(this.currentItem);
			} else {
				$(this.domPosition.parent).prepend(this.currentItem);
			}
		}

		return this;

	},

	serialize: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected),
			str = [];
		o = o || {};

		$(items).each(function() {
			var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || (/(.+)[\-=_](.+)/));
			if (res) {
				str.push((o.key || res[1]+"[]")+"="+(o.key && o.expression ? res[1] : res[2]));
			}
		});

		if(!str.length && o.key) {
			str.push(o.key + "=");
		}

		return str.join("&");

	},

	toArray: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected),
			ret = [];

		o = o || {};

		items.each(function() { ret.push($(o.item || this).attr(o.attribute || "id") || ""); });
		return ret;

	},

	/* Be careful with the following core functions */
	_intersectsWith: function(item) {

		var x1 = this.positionAbs.left,
			x2 = x1 + this.helperProportions.width,
			y1 = this.positionAbs.top,
			y2 = y1 + this.helperProportions.height,
			l = item.left,
			r = l + item.width,
			t = item.top,
			b = t + item.height,
			dyClick = this.offset.click.top,
			dxClick = this.offset.click.left,
			isOverElementHeight = ( this.options.axis === "x" ) || ( ( y1 + dyClick ) > t && ( y1 + dyClick ) < b ),
			isOverElementWidth = ( this.options.axis === "y" ) || ( ( x1 + dxClick ) > l && ( x1 + dxClick ) < r ),
			isOverElement = isOverElementHeight && isOverElementWidth;

		if ( this.options.tolerance === "pointer" ||
			this.options.forcePointerForContainers ||
			(this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"])
		) {
			return isOverElement;
		} else {

			return (l < x1 + (this.helperProportions.width / 2) && // Right Half
				x2 - (this.helperProportions.width / 2) < r && // Left Half
				t < y1 + (this.helperProportions.height / 2) && // Bottom Half
				y2 - (this.helperProportions.height / 2) < b ); // Top Half

		}
	},

	_intersectsWithPointer: function(item) {

		var isOverElementHeight = (this.options.axis === "x") || isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
			isOverElementWidth = (this.options.axis === "y") || isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
			isOverElement = isOverElementHeight && isOverElementWidth,
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (!isOverElement) {
			return false;
		}

		return this.floating ?
			( ((horizontalDirection && horizontalDirection === "right") || verticalDirection === "down") ? 2 : 1 )
			: ( verticalDirection && (verticalDirection === "down" ? 2 : 1) );

	},

	_intersectsWithSides: function(item) {

		var isOverBottomHalf = isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height/2), item.height),
			isOverRightHalf = isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width/2), item.width),
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (this.floating && horizontalDirection) {
			return ((horizontalDirection === "right" && isOverRightHalf) || (horizontalDirection === "left" && !isOverRightHalf));
		} else {
			return verticalDirection && ((verticalDirection === "down" && isOverBottomHalf) || (verticalDirection === "up" && !isOverBottomHalf));
		}

	},

	_getDragVerticalDirection: function() {
		var delta = this.positionAbs.top - this.lastPositionAbs.top;
		return delta !== 0 && (delta > 0 ? "down" : "up");
	},

	_getDragHorizontalDirection: function() {
		var delta = this.positionAbs.left - this.lastPositionAbs.left;
		return delta !== 0 && (delta > 0 ? "right" : "left");
	},

	refresh: function(event) {
		this._refreshItems(event);
		this.refreshPositions();
		return this;
	},

	_connectWith: function() {
		var options = this.options;
		return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith;
	},

	_getItemsAsjQuery: function(connected) {

		var i, j, cur, inst,
			items = [],
			queries = [],
			connectWith = this._connectWith();

		if(connectWith && connected) {
			for (i = connectWith.length - 1; i >= 0; i--){
				cur = $(connectWith[i]);
				for ( j = cur.length - 1; j >= 0; j--){
					inst = $.data(cur[j], this.widgetFullName);
					if(inst && inst !== this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);
					}
				}
			}
		}

		queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);

		function addItems() {
			items.push( this );
		}
		for (i = queries.length - 1; i >= 0; i--){
			queries[i][0].each( addItems );
		}

		return $(items);

	},

	_removeCurrentsFromItems: function() {

		var list = this.currentItem.find(":data(" + this.widgetName + "-item)");

		this.items = $.grep(this.items, function (item) {
			for (var j=0; j < list.length; j++) {
				if(list[j] === item.item[0]) {
					return false;
				}
			}
			return true;
		});

	},

	_refreshItems: function(event) {

		this.items = [];
		this.containers = [this];

		var i, j, cur, inst, targetData, _queries, item, queriesLength,
			items = this.items,
			queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, { item: this.currentItem }) : $(this.options.items, this.element), this]],
			connectWith = this._connectWith();

		if(connectWith && this.ready) { //Shouldn't be run the first time through due to massive slow-down
			for (i = connectWith.length - 1; i >= 0; i--){
				cur = $(connectWith[i]);
				for (j = cur.length - 1; j >= 0; j--){
					inst = $.data(cur[j], this.widgetFullName);
					if(inst && inst !== this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, { item: this.currentItem }) : $(inst.options.items, inst.element), inst]);
						this.containers.push(inst);
					}
				}
			}
		}

		for (i = queries.length - 1; i >= 0; i--) {
			targetData = queries[i][1];
			_queries = queries[i][0];

			for (j=0, queriesLength = _queries.length; j < queriesLength; j++) {
				item = $(_queries[j]);

				item.data(this.widgetName + "-item", targetData); // Data for target checking (mouse manager)

				items.push({
					item: item,
					instance: targetData,
					width: 0, height: 0,
					left: 0, top: 0
				});
			}
		}

	},

	refreshPositions: function(fast) {

		//This has to be redone because due to the item being moved out/into the offsetParent, the offsetParent's position will change
		if(this.offsetParent && this.helper) {
			this.offset.parent = this._getParentOffset();
		}

		var i, item, t, p;

		for (i = this.items.length - 1; i >= 0; i--){
			item = this.items[i];

			//We ignore calculating positions of all connected containers when we're not over them
			if(item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0]) {
				continue;
			}

			t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;

			if (!fast) {
				item.width = t.outerWidth();
				item.height = t.outerHeight();
			}

			p = t.offset();
			item.left = p.left;
			item.top = p.top;
		}

		if(this.options.custom && this.options.custom.refreshContainers) {
			this.options.custom.refreshContainers.call(this);
		} else {
			for (i = this.containers.length - 1; i >= 0; i--){
				p = this.containers[i].element.offset();
				this.containers[i].containerCache.left = p.left;
				this.containers[i].containerCache.top = p.top;
				this.containers[i].containerCache.width	= this.containers[i].element.outerWidth();
				this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			}
		}

		return this;
	},

	_createPlaceholder: function(that) {
		that = that || this;
		var className,
			o = that.options;

		if(!o.placeholder || o.placeholder.constructor === String) {
			className = o.placeholder;
			o.placeholder = {
				element: function() {

					var nodeName = that.currentItem[0].nodeName.toLowerCase(),
						element = $( "<" + nodeName + ">", that.document[0] )
							.addClass(className || that.currentItem[0].className+" ui-sortable-placeholder")
							.removeClass("ui-sortable-helper");

					if ( nodeName === "tr" ) {
						that.currentItem.children().each(function() {
							$( "<td>&#160;</td>", that.document[0] )
								.attr( "colspan", $( this ).attr( "colspan" ) || 1 )
								.appendTo( element );
						});
					} else if ( nodeName === "img" ) {
						element.attr( "src", that.currentItem.attr( "src" ) );
					}

					if ( !className ) {
						element.css( "visibility", "hidden" );
					}

					return element;
				},
				update: function(container, p) {

					// 1. If a className is set as 'placeholder option, we don't force sizes - the class is responsible for that
					// 2. The option 'forcePlaceholderSize can be enabled to force it even if a class name is specified
					if(className && !o.forcePlaceholderSize) {
						return;
					}

					//If the element doesn't have a actual height by itself (without styles coming from a stylesheet), it receives the inline height from the dragged item
					if(!p.height()) { p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop")||0, 10) - parseInt(that.currentItem.css("paddingBottom")||0, 10)); }
					if(!p.width()) { p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft")||0, 10) - parseInt(that.currentItem.css("paddingRight")||0, 10)); }
				}
			};
		}

		//Create the placeholder
		that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));

		//Append it after the actual current item
		that.currentItem.after(that.placeholder);

		//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
		o.placeholder.update(that, that.placeholder);

	},

	_contactContainers: function(event) {
		var i, j, dist, itemWithLeastDistance, posProperty, sizeProperty, base, cur, nearBottom, floating,
			innermostContainer = null,
			innermostIndex = null;

		// get innermost container that intersects with item
		for (i = this.containers.length - 1; i >= 0; i--) {

			// never consider a container that's located within the item itself
			if($.contains(this.currentItem[0], this.containers[i].element[0])) {
				continue;
			}

			if(this._intersectsWith(this.containers[i].containerCache)) {

				// if we've already found a container and it's more "inner" than this, then continue
				if(innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {
					continue;
				}

				innermostContainer = this.containers[i];
				innermostIndex = i;

			} else {
				// container doesn't intersect. trigger "out" event if necessary
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", event, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}

		// if no intersecting containers found, return
		if(!innermostContainer) {
			return;
		}

		// move the item into the container if it's not there already
		if(this.containers.length === 1) {
			if (!this.containers[innermostIndex].containerCache.over) {
				this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
				this.containers[innermostIndex].containerCache.over = 1;
			}
		} else {

			//When entering a new container, we will find the item with the least distance and append our item near it
			dist = 10000;
			itemWithLeastDistance = null;
			floating = innermostContainer.floating || isFloating(this.currentItem);
			posProperty = floating ? "left" : "top";
			sizeProperty = floating ? "width" : "height";
			base = this.positionAbs[posProperty] + this.offset.click[posProperty];
			for (j = this.items.length - 1; j >= 0; j--) {
				if(!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
					continue;
				}
				if(this.items[j].item[0] === this.currentItem[0]) {
					continue;
				}
				if (floating && !isOverAxis(this.positionAbs.top + this.offset.click.top, this.items[j].top, this.items[j].height)) {
					continue;
				}
				cur = this.items[j].item.offset()[posProperty];
				nearBottom = false;
				if(Math.abs(cur - base) > Math.abs(cur + this.items[j][sizeProperty] - base)){
					nearBottom = true;
					cur += this.items[j][sizeProperty];
				}

				if(Math.abs(cur - base) < dist) {
					dist = Math.abs(cur - base); itemWithLeastDistance = this.items[j];
					this.direction = nearBottom ? "up": "down";
				}
			}

			//Check if dropOnEmpty is enabled
			if(!itemWithLeastDistance && !this.options.dropOnEmpty) {
				return;
			}

			if(this.currentContainer === this.containers[innermostIndex]) {
				return;
			}

			itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
			this._trigger("change", event, this._uiHash());
			this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));
			this.currentContainer = this.containers[innermostIndex];

			//Update the placeholder
			this.options.placeholder.update(this.currentContainer, this.placeholder);

			this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
			this.containers[innermostIndex].containerCache.over = 1;
		}


	},

	_createHelper: function(event) {

		var o = this.options,
			helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper === "clone" ? this.currentItem.clone() : this.currentItem);

		//Add the helper to the DOM if that didn't happen already
		if(!helper.parents("body").length) {
			$(o.appendTo !== "parent" ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);
		}

		if(helper[0] === this.currentItem[0]) {
			this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") };
		}

		if(!helper[0].style.width || o.forceHelperSize) {
			helper.width(this.currentItem.width());
		}
		if(!helper[0].style.height || o.forceHelperSize) {
			helper.height(this.currentItem.height());
		}

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj === "string") {
			obj = obj.split(" ");
		}
		if ($.isArray(obj)) {
			obj = {left: +obj[0], top: +obj[1] || 0};
		}
		if ("left" in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ("right" in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ("top" in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ("bottom" in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_getParentOffset: function() {


		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if(this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		// This needs to be actually done for all browsers, since pageX/pageY includes this information
		// with an ugly IE fix
		if( this.offsetParent[0] === document.body || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie)) {
			po = { top: 0, left: 0 };
		}

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition === "relative") {
			var p = this.currentItem.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.currentItem.css("marginLeft"),10) || 0),
			top: (parseInt(this.currentItem.css("marginTop"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var ce, co, over,
			o = this.options;
		if(o.containment === "parent") {
			o.containment = this.helper[0].parentNode;
		}
		if(o.containment === "document" || o.containment === "window") {
			this.containment = [
				0 - this.offset.relative.left - this.offset.parent.left,
				0 - this.offset.relative.top - this.offset.parent.top,
				$(o.containment === "document" ? document : window).width() - this.helperProportions.width - this.margins.left,
				($(o.containment === "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
			];
		}

		if(!(/^(document|window|parent)$/).test(o.containment)) {
			ce = $(o.containment)[0];
			co = $(o.containment).offset();
			over = ($(ce).css("overflow") !== "hidden");

			this.containment = [
				co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,
				co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,
				co.left+(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,
				co.top+(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top
			];
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) {
			pos = this.position;
		}
		var mod = d === "absolute" ? 1 : -1,
			scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
			scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top	+																// The absolute mouse position
				this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top * mod -											// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left +																// The absolute mouse position
				this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left * mod	-										// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var top, left,
			o = this.options,
			pageX = event.pageX,
			pageY = event.pageY,
			scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		// This is another very weird special case that only happens for relative elements:
		// 1. If the css position is relative
		// 2. and the scroll parent is the document or similar to the offset parent
		// we have to refresh the relative offset during the scroll so there are no jumps
		if(this.cssPosition === "relative" && !(this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0])) {
			this.offset.relative = this._getRelativeOffset();
		}

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options

			if(this.containment) {
				if(event.pageX - this.offset.click.left < this.containment[0]) {
					pageX = this.containment[0] + this.offset.click.left;
				}
				if(event.pageY - this.offset.click.top < this.containment[1]) {
					pageY = this.containment[1] + this.offset.click.top;
				}
				if(event.pageX - this.offset.click.left > this.containment[2]) {
					pageX = this.containment[2] + this.offset.click.left;
				}
				if(event.pageY - this.offset.click.top > this.containment[3]) {
					pageY = this.containment[3] + this.offset.click.top;
				}
			}

			if(o.grid) {
				top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
				pageY = this.containment ? ( (top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3]) ? top : ((top - this.offset.click.top >= this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
				pageX = this.containment ? ( (left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2]) ? left : ((left - this.offset.click.left >= this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY -																// The absolute mouse position
				this.offset.click.top -													// Click offset (relative to the element)
				this.offset.relative.top	-											// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX -																// The absolute mouse position
				this.offset.click.left -												// Click offset (relative to the element)
				this.offset.relative.left	-											// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_rearrange: function(event, i, a, hardRefresh) {

		a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction === "down" ? i.item[0] : i.item[0].nextSibling));

		//Various things done here to improve the performance:
		// 1. we create a setTimeout, that calls refreshPositions
		// 2. on the instance, we have a counter variable, that get's higher after every append
		// 3. on the local scope, we copy the counter variable, and check in the timeout, if it's still the same
		// 4. this lets only the last addition to the timeout stack through
		this.counter = this.counter ? ++this.counter : 1;
		var counter = this.counter;

		this._delay(function() {
			if(counter === this.counter) {
				this.refreshPositions(!hardRefresh); //Precompute after each DOM insertion, NOT on mousemove
			}
		});

	},

	_clear: function(event, noPropagation) {

		this.reverting = false;
		// We delay all events that have to be triggered to after the point where the placeholder has been removed and
		// everything else normalized again
		var i,
			delayedTriggers = [];

		// We first have to update the dom position of the actual currentItem
		// Note: don't do it if the current item is already removed (by a user), or it gets reappended (see #4088)
		if(!this._noFinalSort && this.currentItem.parent().length) {
			this.placeholder.before(this.currentItem);
		}
		this._noFinalSort = null;

		if(this.helper[0] === this.currentItem[0]) {
			for(i in this._storedCSS) {
				if(this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") {
					this._storedCSS[i] = "";
				}
			}
			this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
		} else {
			this.currentItem.show();
		}

		if(this.fromOutside && !noPropagation) {
			delayedTriggers.push(function(event) { this._trigger("receive", event, this._uiHash(this.fromOutside)); });
		}
		if((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation) {
			delayedTriggers.push(function(event) { this._trigger("update", event, this._uiHash()); }); //Trigger update callback if the DOM position has changed
		}

		// Check if the items Container has Changed and trigger appropriate
		// events.
		if (this !== this.currentContainer) {
			if(!noPropagation) {
				delayedTriggers.push(function(event) { this._trigger("remove", event, this._uiHash()); });
				delayedTriggers.push((function(c) { return function(event) { c._trigger("receive", event, this._uiHash(this)); };  }).call(this, this.currentContainer));
				delayedTriggers.push((function(c) { return function(event) { c._trigger("update", event, this._uiHash(this));  }; }).call(this, this.currentContainer));
			}
		}


		//Post events to containers
		function delayEvent( type, instance, container ) {
			return function( event ) {
				container._trigger( type, event, instance._uiHash( instance ) );
			};
		}
		for (i = this.containers.length - 1; i >= 0; i--){
			if (!noPropagation) {
				delayedTriggers.push( delayEvent( "deactivate", this, this.containers[ i ] ) );
			}
			if(this.containers[i].containerCache.over) {
				delayedTriggers.push( delayEvent( "out", this, this.containers[ i ] ) );
				this.containers[i].containerCache.over = 0;
			}
		}

		//Do what was originally in plugins
		if ( this.storedCursor ) {
			this.document.find( "body" ).css( "cursor", this.storedCursor );
			this.storedStylesheet.remove();
		}
		if(this._storedOpacity) {
			this.helper.css("opacity", this._storedOpacity);
		}
		if(this._storedZIndex) {
			this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex);
		}

		this.dragging = false;
		if(this.cancelHelperRemoval) {
			if(!noPropagation) {
				this._trigger("beforeStop", event, this._uiHash());
				for (i=0; i < delayedTriggers.length; i++) {
					delayedTriggers[i].call(this, event);
				} //Trigger all delayed events
				this._trigger("stop", event, this._uiHash());
			}

			this.fromOutside = false;
			return false;
		}

		if(!noPropagation) {
			this._trigger("beforeStop", event, this._uiHash());
		}

		//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
		this.placeholder[0].parentNode.removeChild(this.placeholder[0]);

		if(this.helper[0] !== this.currentItem[0]) {
			this.helper.remove();
		}
		this.helper = null;

		if(!noPropagation) {
			for (i=0; i < delayedTriggers.length; i++) {
				delayedTriggers[i].call(this, event);
			} //Trigger all delayed events
			this._trigger("stop", event, this._uiHash());
		}

		this.fromOutside = false;
		return true;

	},

	_trigger: function() {
		if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
			this.cancel();
		}
	},

	_uiHash: function(_inst) {
		var inst = _inst || this;
		return {
			helper: inst.helper,
			placeholder: inst.placeholder || $([]),
			position: inst.position,
			originalPosition: inst.originalPosition,
			offset: inst.positionAbs,
			item: inst.currentItem,
			sender: _inst ? _inst.element : null
		};
	}

});

})(jQuery);

},{"./core":"jquery-ui/core","./mouse":"jquery-ui/mouse","./widget":"jquery-ui/widget","jquery":"jquery"}],"jquery-ui/spinner":[function(require,module,exports){
var jQuery = require('jquery');
require('./core');
require('./widget');
require('./button');

/*!
 * jQuery UI Spinner 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/spinner/
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *  jquery.ui.button.js
 */
(function( $ ) {

function modifier( fn ) {
	return function() {
		var previous = this.element.val();
		fn.apply( this, arguments );
		this._refresh();
		if ( previous !== this.element.val() ) {
			this._trigger( "change" );
		}
	};
}

$.widget( "ui.spinner", {
	version: "1.10.4",
	defaultElement: "<input>",
	widgetEventPrefix: "spin",
	options: {
		culture: null,
		icons: {
			down: "ui-icon-triangle-1-s",
			up: "ui-icon-triangle-1-n"
		},
		incremental: true,
		max: null,
		min: null,
		numberFormat: null,
		page: 10,
		step: 1,

		change: null,
		spin: null,
		start: null,
		stop: null
	},

	_create: function() {
		// handle string values that need to be parsed
		this._setOption( "max", this.options.max );
		this._setOption( "min", this.options.min );
		this._setOption( "step", this.options.step );

		// Only format if there is a value, prevents the field from being marked
		// as invalid in Firefox, see #9573.
		if ( this.value() !== "" ) {
			// Format the value, but don't constrain.
			this._value( this.element.val(), true );
		}

		this._draw();
		this._on( this._events );
		this._refresh();

		// turning off autocomplete prevents the browser from remembering the
		// value when navigating through history, so we re-enable autocomplete
		// if the page is unloaded before the widget is destroyed. #7790
		this._on( this.window, {
			beforeunload: function() {
				this.element.removeAttr( "autocomplete" );
			}
		});
	},

	_getCreateOptions: function() {
		var options = {},
			element = this.element;

		$.each( [ "min", "max", "step" ], function( i, option ) {
			var value = element.attr( option );
			if ( value !== undefined && value.length ) {
				options[ option ] = value;
			}
		});

		return options;
	},

	_events: {
		keydown: function( event ) {
			if ( this._start( event ) && this._keydown( event ) ) {
				event.preventDefault();
			}
		},
		keyup: "_stop",
		focus: function() {
			this.previous = this.element.val();
		},
		blur: function( event ) {
			if ( this.cancelBlur ) {
				delete this.cancelBlur;
				return;
			}

			this._stop();
			this._refresh();
			if ( this.previous !== this.element.val() ) {
				this._trigger( "change", event );
			}
		},
		mousewheel: function( event, delta ) {
			if ( !delta ) {
				return;
			}
			if ( !this.spinning && !this._start( event ) ) {
				return false;
			}

			this._spin( (delta > 0 ? 1 : -1) * this.options.step, event );
			clearTimeout( this.mousewheelTimer );
			this.mousewheelTimer = this._delay(function() {
				if ( this.spinning ) {
					this._stop( event );
				}
			}, 100 );
			event.preventDefault();
		},
		"mousedown .ui-spinner-button": function( event ) {
			var previous;

			// We never want the buttons to have focus; whenever the user is
			// interacting with the spinner, the focus should be on the input.
			// If the input is focused then this.previous is properly set from
			// when the input first received focus. If the input is not focused
			// then we need to set this.previous based on the value before spinning.
			previous = this.element[0] === this.document[0].activeElement ?
				this.previous : this.element.val();
			function checkFocus() {
				var isActive = this.element[0] === this.document[0].activeElement;
				if ( !isActive ) {
					this.element.focus();
					this.previous = previous;
					// support: IE
					// IE sets focus asynchronously, so we need to check if focus
					// moved off of the input because the user clicked on the button.
					this._delay(function() {
						this.previous = previous;
					});
				}
			}

			// ensure focus is on (or stays on) the text field
			event.preventDefault();
			checkFocus.call( this );

			// support: IE
			// IE doesn't prevent moving focus even with event.preventDefault()
			// so we set a flag to know when we should ignore the blur event
			// and check (again) if focus moved off of the input.
			this.cancelBlur = true;
			this._delay(function() {
				delete this.cancelBlur;
				checkFocus.call( this );
			});

			if ( this._start( event ) === false ) {
				return;
			}

			this._repeat( null, $( event.currentTarget ).hasClass( "ui-spinner-up" ) ? 1 : -1, event );
		},
		"mouseup .ui-spinner-button": "_stop",
		"mouseenter .ui-spinner-button": function( event ) {
			// button will add ui-state-active if mouse was down while mouseleave and kept down
			if ( !$( event.currentTarget ).hasClass( "ui-state-active" ) ) {
				return;
			}

			if ( this._start( event ) === false ) {
				return false;
			}
			this._repeat( null, $( event.currentTarget ).hasClass( "ui-spinner-up" ) ? 1 : -1, event );
		},
		// TODO: do we really want to consider this a stop?
		// shouldn't we just stop the repeater and wait until mouseup before
		// we trigger the stop event?
		"mouseleave .ui-spinner-button": "_stop"
	},

	_draw: function() {
		var uiSpinner = this.uiSpinner = this.element
			.addClass( "ui-spinner-input" )
			.attr( "autocomplete", "off" )
			.wrap( this._uiSpinnerHtml() )
			.parent()
				// add buttons
				.append( this._buttonHtml() );

		this.element.attr( "role", "spinbutton" );

		// button bindings
		this.buttons = uiSpinner.find( ".ui-spinner-button" )
			.attr( "tabIndex", -1 )
			.button()
			.removeClass( "ui-corner-all" );

		// IE 6 doesn't understand height: 50% for the buttons
		// unless the wrapper has an explicit height
		if ( this.buttons.height() > Math.ceil( uiSpinner.height() * 0.5 ) &&
				uiSpinner.height() > 0 ) {
			uiSpinner.height( uiSpinner.height() );
		}

		// disable spinner if element was already disabled
		if ( this.options.disabled ) {
			this.disable();
		}
	},

	_keydown: function( event ) {
		var options = this.options,
			keyCode = $.ui.keyCode;

		switch ( event.keyCode ) {
		case keyCode.UP:
			this._repeat( null, 1, event );
			return true;
		case keyCode.DOWN:
			this._repeat( null, -1, event );
			return true;
		case keyCode.PAGE_UP:
			this._repeat( null, options.page, event );
			return true;
		case keyCode.PAGE_DOWN:
			this._repeat( null, -options.page, event );
			return true;
		}

		return false;
	},

	_uiSpinnerHtml: function() {
		return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";
	},

	_buttonHtml: function() {
		return "" +
			"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'>" +
				"<span class='ui-icon " + this.options.icons.up + "'>&#9650;</span>" +
			"</a>" +
			"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" +
				"<span class='ui-icon " + this.options.icons.down + "'>&#9660;</span>" +
			"</a>";
	},

	_start: function( event ) {
		if ( !this.spinning && this._trigger( "start", event ) === false ) {
			return false;
		}

		if ( !this.counter ) {
			this.counter = 1;
		}
		this.spinning = true;
		return true;
	},

	_repeat: function( i, steps, event ) {
		i = i || 500;

		clearTimeout( this.timer );
		this.timer = this._delay(function() {
			this._repeat( 40, steps, event );
		}, i );

		this._spin( steps * this.options.step, event );
	},

	_spin: function( step, event ) {
		var value = this.value() || 0;

		if ( !this.counter ) {
			this.counter = 1;
		}

		value = this._adjustValue( value + step * this._increment( this.counter ) );

		if ( !this.spinning || this._trigger( "spin", event, { value: value } ) !== false) {
			this._value( value );
			this.counter++;
		}
	},

	_increment: function( i ) {
		var incremental = this.options.incremental;

		if ( incremental ) {
			return $.isFunction( incremental ) ?
				incremental( i ) :
				Math.floor( i*i*i/50000 - i*i/500 + 17*i/200 + 1 );
		}

		return 1;
	},

	_precision: function() {
		var precision = this._precisionOf( this.options.step );
		if ( this.options.min !== null ) {
			precision = Math.max( precision, this._precisionOf( this.options.min ) );
		}
		return precision;
	},

	_precisionOf: function( num ) {
		var str = num.toString(),
			decimal = str.indexOf( "." );
		return decimal === -1 ? 0 : str.length - decimal - 1;
	},

	_adjustValue: function( value ) {
		var base, aboveMin,
			options = this.options;

		// make sure we're at a valid step
		// - find out where we are relative to the base (min or 0)
		base = options.min !== null ? options.min : 0;
		aboveMin = value - base;
		// - round to the nearest step
		aboveMin = Math.round(aboveMin / options.step) * options.step;
		// - rounding is based on 0, so adjust back to our base
		value = base + aboveMin;

		// fix precision from bad JS floating point math
		value = parseFloat( value.toFixed( this._precision() ) );

		// clamp the value
		if ( options.max !== null && value > options.max) {
			return options.max;
		}
		if ( options.min !== null && value < options.min ) {
			return options.min;
		}

		return value;
	},

	_stop: function( event ) {
		if ( !this.spinning ) {
			return;
		}

		clearTimeout( this.timer );
		clearTimeout( this.mousewheelTimer );
		this.counter = 0;
		this.spinning = false;
		this._trigger( "stop", event );
	},

	_setOption: function( key, value ) {
		if ( key === "culture" || key === "numberFormat" ) {
			var prevValue = this._parse( this.element.val() );
			this.options[ key ] = value;
			this.element.val( this._format( prevValue ) );
			return;
		}

		if ( key === "max" || key === "min" || key === "step" ) {
			if ( typeof value === "string" ) {
				value = this._parse( value );
			}
		}
		if ( key === "icons" ) {
			this.buttons.first().find( ".ui-icon" )
				.removeClass( this.options.icons.up )
				.addClass( value.up );
			this.buttons.last().find( ".ui-icon" )
				.removeClass( this.options.icons.down )
				.addClass( value.down );
		}

		this._super( key, value );

		if ( key === "disabled" ) {
			if ( value ) {
				this.element.prop( "disabled", true );
				this.buttons.button( "disable" );
			} else {
				this.element.prop( "disabled", false );
				this.buttons.button( "enable" );
			}
		}
	},

	_setOptions: modifier(function( options ) {
		this._super( options );
		this._value( this.element.val() );
	}),

	_parse: function( val ) {
		if ( typeof val === "string" && val !== "" ) {
			val = window.Globalize && this.options.numberFormat ?
				Globalize.parseFloat( val, 10, this.options.culture ) : +val;
		}
		return val === "" || isNaN( val ) ? null : val;
	},

	_format: function( value ) {
		if ( value === "" ) {
			return "";
		}
		return window.Globalize && this.options.numberFormat ?
			Globalize.format( value, this.options.numberFormat, this.options.culture ) :
			value;
	},

	_refresh: function() {
		this.element.attr({
			"aria-valuemin": this.options.min,
			"aria-valuemax": this.options.max,
			// TODO: what should we do with values that can't be parsed?
			"aria-valuenow": this._parse( this.element.val() )
		});
	},

	// update the value without triggering change
	_value: function( value, allowAny ) {
		var parsed;
		if ( value !== "" ) {
			parsed = this._parse( value );
			if ( parsed !== null ) {
				if ( !allowAny ) {
					parsed = this._adjustValue( parsed );
				}
				value = this._format( parsed );
			}
		}
		this.element.val( value );
		this._refresh();
	},

	_destroy: function() {
		this.element
			.removeClass( "ui-spinner-input" )
			.prop( "disabled", false )
			.removeAttr( "autocomplete" )
			.removeAttr( "role" )
			.removeAttr( "aria-valuemin" )
			.removeAttr( "aria-valuemax" )
			.removeAttr( "aria-valuenow" );
		this.uiSpinner.replaceWith( this.element );
	},

	stepUp: modifier(function( steps ) {
		this._stepUp( steps );
	}),
	_stepUp: function( steps ) {
		if ( this._start() ) {
			this._spin( (steps || 1) * this.options.step );
			this._stop();
		}
	},

	stepDown: modifier(function( steps ) {
		this._stepDown( steps );
	}),
	_stepDown: function( steps ) {
		if ( this._start() ) {
			this._spin( (steps || 1) * -this.options.step );
			this._stop();
		}
	},

	pageUp: modifier(function( pages ) {
		this._stepUp( (pages || 1) * this.options.page );
	}),

	pageDown: modifier(function( pages ) {
		this._stepDown( (pages || 1) * this.options.page );
	}),

	value: function( newVal ) {
		if ( !arguments.length ) {
			return this._parse( this.element.val() );
		}
		modifier( this._value ).call( this, newVal );
	},

	widget: function() {
		return this.uiSpinner;
	}
});

}( jQuery ) );

},{"./button":"jquery-ui/button","./core":"jquery-ui/core","./widget":"jquery-ui/widget","jquery":"jquery"}],"jquery-ui/widget":[function(require,module,exports){
var jQuery = require('jquery');

/*!
 * jQuery UI Widget 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
(function( $, undefined ) {

var uuid = 0,
	slice = Array.prototype.slice,
	_cleanData = $.cleanData;
$.cleanData = function( elems ) {
	for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
		try {
			$( elem ).triggerHandler( "remove" );
		// http://bugs.jquery.com/ticket/8235
		} catch( e ) {}
	}
	_cleanData( elems );
};

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );
};

$.widget.extend = function( target ) {
	var input = slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			// 1.9 BC for #7810
			// TODO remove dual storage
			.removeData( this.widgetName )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			// accept selectors, DOM elements
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^(\w+)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

})( jQuery );

},{"jquery":"jquery"}],"bootstrap/button":[function(require,module,exports){
var $ = require("jquery");
/* ========================================================================
* Bootstrap: button.js v3.1.1
* http://getbootstrap.com/javascript/#buttons
* ========================================================================
* Copyright 2011-2014 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
* ======================================================================== */

'use strict';

// BUTTON PUBLIC CLASS DEFINITION
// ==============================

var Button = function (element, options) {
  this.$element  = $(element)
  this.options   = $.extend({}, Button.DEFAULTS, options)
  this.isLoading = false
}

Button.DEFAULTS = {
  loadingText: 'loading...'
}

Button.prototype.setState = function (state) {
  var d    = 'bk-bs-disabled'
  var $el  = this.$element
  var val  = $el.is('input') ? 'val' : 'html'
  var data = $el.data()

  state = state + 'Text'

  if (!data.resetText) $el.data('resetText', $el[val]())

  $el[val](data[state] || this.options[state])

  // push to event loop to allow forms to submit
  setTimeout($.proxy(function () {
    if (state == 'loadingText') {
      this.isLoading = true
      $el.addClass(d).attr(d, d)
    } else if (this.isLoading) {
      this.isLoading = false
      $el.removeClass(d).removeAttr(d)
    }
  }, this), 0)
}

Button.prototype.toggle = function () {
  var changed = true
  var $parent = this.$element.closest('[data-bk-bs-toggle="buttons"]')

  if ($parent.length) {
    var $input = this.$element.find('input')
    if ($input.prop('type') == 'radio') {
      if ($input.prop('checked') && this.$element.hasClass('bk-bs-active')) changed = false
      else $parent.find('.bk-bs-active').removeClass('bk-bs-active')
    }
    if (changed) $input.prop('checked', !this.$element.hasClass('bk-bs-active')).trigger('change')
  }

  if (changed) this.$element.toggleClass('bk-bs-active')
}


// BUTTON PLUGIN DEFINITION
// ========================

var old = $.fn.button

$.fn.button = function (option) {
  return this.each(function () {
    var $this   = $(this)
    var data    = $this.data('bk-bs.button')
    var options = typeof option == 'object' && option

    if (!data) $this.data('bk-bs.button', (data = new Button(this, options)))

    if (option == 'toggle') data.toggle()
    else if (option) data.setState(option)
  })
}

$.fn.button.Constructor = Button


// BUTTON NO CONFLICT
// ==================

$.fn.button.noConflict = function () {
  $.fn.button = old
  return this
}


// BUTTON DATA-API
// ===============

$(document).on('click.bk-bs.button.data-api', '[data-bk-bs-toggle^=button]', function (e) {
  var $btn = $(e.target)
  if (!$btn.hasClass('bk-bs-btn')) $btn = $btn.closest('.bk-bs-btn')
  $btn.button('toggle')
  e.preventDefault()
})

},{"jquery":"jquery"}],"bootstrap/modal":[function(require,module,exports){
var $ = require("jquery");
/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

'use strict';

// MODAL CLASS DEFINITION
// ======================

var Modal = function (element, options) {
  this.options   = options
  this.$element  = $(element)
  this.$backdrop =
  this.isShown   = null

  if (this.options.remote) {
    this.$element
      .find('.bk-bs-modal-content')
      .load(this.options.remote, $.proxy(function () {
        this.$element.trigger('loaded.bk-bs.modal')
      }, this))
  }
}

Modal.DEFAULTS = {
  backdrop: true,
  keyboard: true,
  show: true
}

Modal.prototype.toggle = function (_relatedTarget) {
  return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
}

Modal.prototype.show = function (_relatedTarget) {
  var that = this
  var e    = $.Event('show.bk-bs.modal', { relatedTarget: _relatedTarget })

  this.$element.trigger(e)

  if (this.isShown || e.isDefaultPrevented()) return

  this.isShown = true

  this.escape()

  this.$element.on('click.dismiss.bk-bs.modal', '[data-bk-bs-dismiss="modal"]', $.proxy(this.hide, this))

  this.backdrop(function () {
    var transition = $.support.transition && that.$element.hasClass('bk-bs-fade')

    if (!that.$element.parent().length) {
      that.$element.appendTo(document.body) // don't move modals dom position
    }

    that.$element
      .show()
      .scrollTop(0)

    if (transition) {
      that.$element[0].offsetWidth // force reflow
    }

    that.$element
      .addClass('bk-bs-in')
      .attr('aria-hidden', false)

    that.enforceFocus()

    var e = $.Event('shown.bk-bs.modal', { relatedTarget: _relatedTarget })

    transition ?
      that.$element.find('.bk-bs-modal-dialog') // wait for modal to slide in
        .one($.support.transition.end, function () {
          that.$element.focus().trigger(e)
        })
        .emulateTransitionEnd(300) :
      that.$element.focus().trigger(e)
  })
}

Modal.prototype.hide = function (e) {
  if (e) e.preventDefault()

  e = $.Event('hide.bk-bs.modal')

  this.$element.trigger(e)

  if (!this.isShown || e.isDefaultPrevented()) return

  this.isShown = false

  this.escape()

  $(document).off('focusin.bk-bs.modal')

  this.$element
    .removeClass('bk-bs-in')
    .attr('aria-hidden', true)
    .off('click.dismiss.bk-bs.modal')

  $.support.transition && this.$element.hasClass('bk-bs-fade') ?
    this.$element
      .one($.support.transition.end, $.proxy(this.hideModal, this))
      .emulateTransitionEnd(300) :
    this.hideModal()
}

Modal.prototype.enforceFocus = function () {
  $(document)
    .off('focusin.bk-bs.modal') // guard against infinite focus loop
    .on('focusin.bk-bs.modal', $.proxy(function (e) {
      if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        this.$element.focus()
      }
    }, this))
}

Modal.prototype.escape = function () {
  if (this.isShown && this.options.keyboard) {
    this.$element.on('keyup.dismiss.bk-bs.modal', $.proxy(function (e) {
      e.which == 27 && this.hide()
    }, this))
  } else if (!this.isShown) {
    this.$element.off('keyup.dismiss.bk-bs.modal')
  }
}

Modal.prototype.hideModal = function () {
  var that = this
  this.$element.hide()
  this.backdrop(function () {
    that.removeBackdrop()
    that.$element.trigger('hidden.bk-bs.modal')
  })
}

Modal.prototype.removeBackdrop = function () {
  this.$backdrop && this.$backdrop.remove()
  this.$backdrop = null
}

Modal.prototype.backdrop = function (callback) {
  var animate = this.$element.hasClass('bk-bs-fade') ? 'bk-bs-fade' : ''

  if (this.isShown && this.options.backdrop) {
    var doAnimate = $.support.transition && animate

    this.$backdrop = $('<div class="bk-bs-modal-backdrop ' + animate + '" />')
      .appendTo(document.body)

    this.$element.on('click.dismiss.bk-bs.modal', $.proxy(function (e) {
      if (e.target !== e.currentTarget) return
      this.options.backdrop == 'static'
        ? this.$element[0].focus.call(this.$element[0])
        : this.hide.call(this)
    }, this))

    if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

    this.$backdrop.addClass('bk-bs-in')

    if (!callback) return

    doAnimate ?
      this.$backdrop
        .one($.support.transition.end, callback)
        .emulateTransitionEnd(150) :
      callback()

  } else if (!this.isShown && this.$backdrop) {
    this.$backdrop.removeClass('bk-bs-in')

    $.support.transition && this.$element.hasClass('bk-bs-fade') ?
      this.$backdrop
        .one($.support.transition.end, callback)
        .emulateTransitionEnd(150) :
      callback()

  } else if (callback) {
    callback()
  }
}


// MODAL PLUGIN DEFINITION
// =======================

var old = $.fn.modal

$.fn.modal = function (option, _relatedTarget) {
  return this.each(function () {
    var $this   = $(this)
    var data    = $this.data('bk-bs.modal')
    var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

    if (!data) $this.data('bk-bs.modal', (data = new Modal(this, options)))
    if (typeof option == 'string') data[option](_relatedTarget)
    else if (options.show) data.show(_relatedTarget)
  })
}

$.fn.modal.Constructor = Modal


// MODAL NO CONFLICT
// =================

$.fn.modal.noConflict = function () {
  $.fn.modal = old
  return this
}


// MODAL DATA-API
// ==============

$(document).on('click.bk-bs.modal.data-api', '[data-bk-bs-toggle="modal"]', function (e) {
  var $this   = $(this)
  var href    = $this.attr('href')
  var $target = $($this.attr('data-bk-bs-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
  var option  = $target.data('bk-bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

  if ($this.is('a')) e.preventDefault()

  $target
    .modal(option, this)
    .one('hide', function () {
      $this.is(':visible') && $this.focus()
    })
})

$(document)
  .on('show.bk-bs.modal', '.bk-bs-modal', function () { $(document.body).addClass('bk-bs-modal-open') })
  .on('hidden.bk-bs.modal', '.bk-bs-modal', function () { $(document.body).removeClass('bk-bs-modal-open') })

},{"jquery":"jquery"}],"bootstrap/tab":[function(require,module,exports){
var $ = require("jquery");
/* ========================================================================
 * Bootstrap: tab.js v3.1.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

'use strict';

// TAB CLASS DEFINITION
// ====================

var Tab = function (element) {
  this.element = $(element)
}

Tab.prototype.show = function () {
  var $this    = this.element
  var $ul      = $this.closest('ul:not(.bk-bs-dropdown-menu)')
  var selector = $this.data('bk-bs-target')

  if (!selector) {
    selector = $this.attr('href')
    selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
  }

  if ($this.parent('li').hasClass('bk-bs-active')) return

  var previous = $ul.find('.bk-bs-active:last a')[0]
  var e        = $.Event('show.bk-bs.tab', {
    relatedTarget: previous
  })

  $this.trigger(e)

  if (e.isDefaultPrevented()) return

  var $target = $(selector)

  this.activate($this.parent('li'), $ul)
  this.activate($target, $target.parent(), function () {
    $this.trigger({
      type: 'shown.bk-bs.tab',
      relatedTarget: previous
    })
  })
}

Tab.prototype.activate = function (element, container, callback) {
  var $active    = container.find('> .bk-bs-active')
  var transition = callback
    && $.support.transition
    && $active.hasClass('bk-bs-fade')

  function next() {
    $active
      .removeClass('bk-bs-active')
      .find('> .bk-bs-dropdown-menu > .bk-bs-active')
      .removeClass('bk-bs-active')

    element.addClass('bk-bs-active')

    if (transition) {
      element[0].offsetWidth // reflow for transition
      element.addClass('bk-bs-in')
    } else {
      element.removeClass('bk-bs-fade')
    }

    if (element.parent('.bk-bs-dropdown-menu')) {
      element.closest('li.bk-bs-dropdown').addClass('bk-bs-active')
    }

    callback && callback()
  }

  transition ?
    $active
      .one($.support.transition.end, next)
      .emulateTransitionEnd(150) :
    next()

  $active.removeClass('bk-bs-in')
}


// TAB PLUGIN DEFINITION
// =====================

var old = $.fn.tab

$.fn.tab = function ( option ) {
  return this.each(function () {
    var $this = $(this)
    var data  = $this.data('bk-bs.tab')

    if (!data) $this.data('bk-bs.tab', (data = new Tab(this)))
    if (typeof option == 'string') data[option]()
  })
}

$.fn.tab.Constructor = Tab


// TAB NO CONFLICT
// ===============

$.fn.tab.noConflict = function () {
  $.fn.tab = old
  return this
}


// TAB DATA-API
// ============

$(document).on('click.bk-bs.tab.data-api', '[data-bk-bs-toggle="tab"], [data-bk-bs-toggle="pill"]', function (e) {
  e.preventDefault()
  $(this).tab('show')
})

},{"jquery":"jquery"}],"jqrangeslider/jQDateRangeSlider":[function(require,module,exports){
/**
 * jQRangeSlider
 * A javascript slider selector that supports dates
 *
 * Copyright (C) Guillaume Gautreau 2012
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */

var $ = require("jquery");
require("./jQRangeSlider");
"use strict";

module.exports = $.widget("ui.dateRangeSlider", $.ui.rangeSlider, {
	options: {
		bounds: {min: new Date(2010,0,1).valueOf(), max: new Date(2012,0,1).valueOf()},
		defaultValues: {min: new Date(2010,1,11).valueOf(), max: new Date(2011,1,11).valueOf()}
	},

	_create: function(){
		$.ui.rangeSlider.prototype._create.apply(this);

		this.element.addClass("bk-ui-dateRangeSlider");
	},

	destroy: function(){
		this.element.removeClass("bk-ui-dateRangeSlider");
		$.ui.rangeSlider.prototype.destroy.apply(this);
	},

	_setDefaultValues: function(){
		this._values = {
			min: this.options.defaultValues.min.valueOf(),
			max: this.options.defaultValues.max.valueOf()
		};
	},

	_setRulerParameters: function(){
		this.ruler.ruler({
			min: new Date(this.options.bounds.min),
			max: new Date(this.options.bounds.max),
			scales: this.options.scales
		});
	},

	_setOption: function(key, value){
		if ((key === "defaultValues" || key === "bounds") && typeof value !== "undefined" && value !== null && this._isValidDate(value.min) && this._isValidDate(value.max)){
			$.ui.rangeSlider.prototype._setOption.apply(this, [key, {min:value.min.valueOf(), max:value.max.valueOf()}]);
		}else{
			$.ui.rangeSlider.prototype._setOption.apply(this, this._toArray(arguments));
		}
	},

	_handleType: function(){
		return "dateRangeSliderHandle";
	},

	option: function(key){
		if (key === "bounds" || key === "defaultValues"){
			var result = $.ui.rangeSlider.prototype.option.apply(this, arguments);

			return {min:new Date(result.min), max:new Date(result.max)};
		}

		return $.ui.rangeSlider.prototype.option.apply(this, this._toArray(arguments));
	},

	_defaultFormatter: function(value){
		var month = value.getMonth() + 1,
			day = value.getDate();

		return "" + value.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
	},

	_getFormatter: function(){
		var formatter = this.options.formatter;

		if (this.options.formatter === false || this.options.formatter === null){
			formatter = this._defaultFormatter;
		}

		return (function(formatter){
			return function(value){
				return formatter(new Date(value));
			}
		}(formatter));
	},

	values: function(min, max){
		var values = null;

		if (this._isValidDate(min) && this._isValidDate(max))
		{
			values = $.ui.rangeSlider.prototype.values.apply(this, [min.valueOf(), max.valueOf()]);
		}else{
			values = $.ui.rangeSlider.prototype.values.apply(this, this._toArray(arguments));
		}

		return {min: new Date(values.min), max: new Date(values.max)};
	},

	min: function(min){
		if (this._isValidDate(min)){
			return new Date($.ui.rangeSlider.prototype.min.apply(this, [min.valueOf()]));
		}

		return new Date($.ui.rangeSlider.prototype.min.apply(this));
	},

	max: function(max){
		if (this._isValidDate(max)){
			return new Date($.ui.rangeSlider.prototype.max.apply(this, [max.valueOf()]));
		}

		return new Date($.ui.rangeSlider.prototype.max.apply(this));
	},

	bounds: function(min, max){
		var result;

		if (this._isValidDate(min) && this._isValidDate(max)) {
			result = $.ui.rangeSlider.prototype.bounds.apply(this, [min.valueOf(), max.valueOf()]);
		} else {
			result = $.ui.rangeSlider.prototype.bounds.apply(this, this._toArray(arguments));
		}

		return {min: new Date(result.min), max: new Date(result.max)};
	},

	_isValidDate: function(value){
		return typeof value !== "undefined" && value instanceof Date;
	},

	_toArray: function(argsObject){
		return Array.prototype.slice.call(argsObject);
	}
});

},{"./jQRangeSlider":"jqrangeslider/jQRangeSlider","jquery":"jquery"}],"jqrangeslider/jQRangeSlider":[function(require,module,exports){
/**
 * jQRangeSlider
 * A javascript slider selector that supports dates
 *
 * Copyright (C) Guillaume Gautreau 2012
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */

var $ = require("jquery");
require("jquery-ui/core");
require("jquery-ui/widget");
require("jquery-ui/mouse");
require("jquery-mousewheel");
"use strict";

module.exports = $.widget("ui.rangeSlider", {
	options: {
		bounds: {min:0, max:100},
		defaultValues: {min:20, max:50},
		wheelMode: null,
		wheelSpeed: 4,
		arrows: true,
		valueLabels: "show",
		formatter: null,
		durationIn: 0,
		durationOut: 400,
		delayOut: 200,
		range: {min: false, max: false},
		step: false,
		scales: false,
		enabled: true,
		symmetricPositionning: false
	},

	_values: null,
	_valuesChanged: false,
	_initialized: false,

	// Created elements
	bar: null,
	leftHandle: null,
	rightHandle: null,
	innerBar: null,
	container: null,
	arrows: null,
	labels: null,
	changing: {min:false, max:false},
	changed: {min:false, max:false},
	ruler: null,

	_create: function(){
		this._setDefaultValues();

		this.labels = {left: null, right:null, leftDisplayed:true, rightDisplayed:true};
		this.arrows = {left:null, right:null};
		this.changing = {min:false, max:false};
		this.changed = {min:false, max:false};

		this._createElements();

		this._bindResize();

		setTimeout($.proxy(this.resize, this), 1);
		setTimeout($.proxy(this._initValues, this), 1);
	},

	_setDefaultValues: function(){
		this._values = {
			min: this.options.defaultValues.min,
			max: this.options.defaultValues.max
		};
	},

	_bindResize: function(){
		var that = this;

		this._resizeProxy = function(e){
			that.resize(e);
		};

		$(window).resize(this._resizeProxy);
	},

	_initWidth: function(){
		this.container.css("width", this.element.width() - this.container.outerWidth(true) + this.container.width());
		this.innerBar.css("width", this.container.width() - this.innerBar.outerWidth(true) + this.innerBar.width());
	},

	_initValues: function(){
		this._initialized = true;
		this.values(this._values.min, this._values.max);
	},

	_setOption: function(key, value) {
		this._setWheelOption(key, value);
		this._setArrowsOption(key, value);
		this._setLabelsOption(key, value);
		this._setLabelsDurations(key, value);
		this._setFormatterOption(key, value);
		this._setBoundsOption(key, value);
		this._setRangeOption(key, value);
		this._setStepOption(key, value);
		this._setScalesOption(key, value);
		this._setEnabledOption(key, value);
		this._setPositionningOption(key, value);
	},

	_validProperty: function(object, name, defaultValue){
		if (object === null || typeof object[name] === "undefined"){
			return defaultValue;
		}

		return object[name];
	},

	_setStepOption: function(key, value){
		if (key === "step"){
			this.options.step = value;
			this._leftHandle("option", "step", value);
			this._rightHandle("option", "step", value);
			this._changed(true);
		}
	},

	_setScalesOption: function(key, value){
		if (key === "scales"){
			if (value === false || value === null){
				this.options.scales = false;
				this._destroyRuler();
			}else if (value instanceof Array){
				this.options.scales = value;
				this._updateRuler();
			}
		}
	},

	_setRangeOption: function(key, value){
		if (key === "range"){
			this._bar("option", "range", value);
			this.options.range = this._bar("option", "range");
			this._changed(true);
		}
	},

	_setBoundsOption: function(key, value){
		if (key === "bounds" && typeof value.min !== "undefined" && typeof value.max !== "undefined"){
			this.bounds(value.min, value.max);
		}
	},

	_setWheelOption: function(key, value){
		if (key === "wheelMode" || key === "wheelSpeed"){
			this._bar("option", key, value);
			this.options[key] = this._bar("option", key);
		}
	},

	_setLabelsOption: function(key, value){
		if (key === "valueLabels"){
			if (value !== "hide" && value !== "show" && value !== "change"){
				return;
			}

			this.options.valueLabels = value;

			if (value !== "hide"){
				this._createLabels();
				this._leftLabel("update");
				this._rightLabel("update");
			}else{
				this._destroyLabels();
			}
		}
	},

	_setFormatterOption: function(key, value){
		if (key === "formatter" && value !== null && typeof value === "function"){
			if (this.options.valueLabels !== "hide"){
				this._leftLabel("option", "formatter", value);
				this.options.formatter = this._rightLabel("option", "formatter", value);
			}
		}
	},

	_setArrowsOption: function(key, value){
		if (key === "arrows" && (value === true || value === false) && value !== this.options.arrows){
			if (value === true){
				this.element
					.removeClass("bk-ui-rangeSlider-noArrow")
					.addClass("bk-ui-rangeSlider-withArrows");
				this.arrows.left.css("display", "block");
				this.arrows.right.css("display", "block");
				this.options.arrows = true;
			}else if (value === false){
				this.element
					.addClass("bk-ui-rangeSlider-noArrow")
					.removeClass("bk-ui-rangeSlider-withArrows");
				this.arrows.left.css("display", "none");
				this.arrows.right.css("display", "none");
				this.options.arrows = false;
			}

			this._initWidth();
		}
	},

	_setLabelsDurations: function(key, value){
		if (key === "durationIn" || key === "durationOut" || key === "delayOut"){
			if (parseInt(value, 10) !== value) return;

			if (this.labels.left !== null){
				this._leftLabel("option", key, value);
			}

			if (this.labels.right !== null){
				this._rightLabel("option", key, value);
			}

			this.options[key] = value;
		}
	},

	_setEnabledOption: function(key, value){
		if (key === "enabled"){
			this.toggle(value);
		}
	},

	_setPositionningOption: function(key, value){
		if (key === "symmetricPositionning"){
			this._rightHandle("option", key, value);
			this.options[key] = this._leftHandle("option", key, value);
		}
	},

	_createElements: function(){
		if (this.element.css("position") !== "absolute"){
			this.element.css("position", "relative");
		}

		this.element.addClass("bk-ui-rangeSlider");

		this.container = $("<div class='bk-ui-rangeSlider-container' />")
			.css("position", "absolute")
			.appendTo(this.element);

		this.innerBar = $("<div class='bk-ui-rangeSlider-innerBar' />")
			.css("position", "absolute")
			.css("top", 0)
			.css("left", 0);

		this._createHandles();
		this._createBar();
		this.container.prepend(this.innerBar);
		this._createArrows();

		if (this.options.valueLabels !== "hide"){
			this._createLabels();
		}else{
			this._destroyLabels();
		}

		this._updateRuler();

		if (!this.options.enabled) this._toggle(this.options.enabled);
	},

	_createHandle: function(options){
		return $("<div />")
			[this._handleType()](options)
			.bind("sliderDrag", $.proxy(this._changing, this))
			.bind("stop", $.proxy(this._changed, this));
	},

	_createHandles: function(){
		this.leftHandle = this._createHandle({
				isLeft: true,
				bounds: this.options.bounds,
				value: this._values.min,
				step: this.options.step,
				symmetricPositionning: this.options.symmetricPositionning
		}).appendTo(this.container);

		this.rightHandle = this._createHandle({
			isLeft: false,
			bounds: this.options.bounds,
			value: this._values.max,
			step: this.options.step,
			symmetricPositionning: this.options.symmetricPositionning
		}).appendTo(this.container);
	},

	_createBar: function(){
		this.bar = $("<div />")
			.prependTo(this.container)
			.bind("sliderDrag scroll zoom", $.proxy(this._changing, this))
			.bind("stop", $.proxy(this._changed, this));

		this._bar({
				leftHandle: this.leftHandle,
				rightHandle: this.rightHandle,
				values: {min: this._values.min, max: this._values.max},
				type: this._handleType(),
				range: this.options.range,
				wheelMode: this.options.wheelMode,
				wheelSpeed: this.options.wheelSpeed
			});

		this.options.range = this._bar("option", "range");
		this.options.wheelMode = this._bar("option", "wheelMode");
		this.options.wheelSpeed = this._bar("option", "wheelSpeed");
	},

	_createArrows: function(){
		this.arrows.left = this._createArrow("left");
		this.arrows.right = this._createArrow("right");

		if (!this.options.arrows){
			this.arrows.left.css("display", "none");
			this.arrows.right.css("display", "none");
			this.element.addClass("bk-ui-rangeSlider-noArrow");
		}else{
			this.element.addClass("bk-ui-rangeSlider-withArrows");
		}
	},

	_createArrow: function(whichOne){
		var arrow = $("<div class='bk-ui-rangeSlider-arrow' />")
			.append("<div class='bk-ui-rangeSlider-arrow-inner' />")
			.addClass("bk-ui-rangeSlider-" + whichOne + "Arrow")
			.css("position", "absolute")
			.css(whichOne, 0)
			.appendTo(this.element),
			target;

		if (whichOne === "right"){
			target = $.proxy(this._scrollRightClick, this);
		}else{
			target = $.proxy(this._scrollLeftClick, this);
		}

		arrow.bind("mousedown touchstart", target);

		return arrow;
	},

	_proxy: function(element, type, args){
		var array = Array.prototype.slice.call(args);

		if (element && element[type]){
			return element[type].apply(element, array);
		}

		return null;
	},

	_handleType: function(){
		return "rangeSliderHandle";
	},

	_barType: function(){
		return "rangeSliderBar";
	},

	_bar: function(){
		return this._proxy(this.bar, this._barType(), arguments);
	},

	_labelType: function(){
		return "rangeSliderLabel";
	},

	_leftLabel: function(){
		return this._proxy(this.labels.left, this._labelType(), arguments);
	},

	_rightLabel: function(){
		return this._proxy(this.labels.right, this._labelType(), arguments);
	},

	_leftHandle: function(){
		return this._proxy(this.leftHandle, this._handleType(), arguments);
	},

	_rightHandle: function(){
		return this._proxy(this.rightHandle, this._handleType(), arguments);
	},

	_getValue: function(position, handle){
		if (handle === this.rightHandle){
			position = position - handle.outerWidth();
		}

		return position * (this.options.bounds.max - this.options.bounds.min) / (this.container.innerWidth() - handle.outerWidth(true)) + this.options.bounds.min;
	},

	_trigger: function(eventName){
		var that = this;

		setTimeout(function(){
			that.element.trigger(eventName, {
					label: that.element,
					values: that.values()
				});
		}, 1);
	},

	_changing: function(){
		if(this._updateValues()){
			this._trigger("valuesChanging");
			this._valuesChanged = true;
		}
	},

	_deactivateLabels: function(){
		if (this.options.valueLabels === "change"){
			this._leftLabel("option", "show", "hide");
			this._rightLabel("option", "show", "hide");
		}
	},

	_reactivateLabels: function(){
		if (this.options.valueLabels === "change"){
			this._leftLabel("option", "show", "change");
			this._rightLabel("option", "show", "change");
		}
	},

	_changed: function(isAutomatic){
		if (isAutomatic === true){
			this._deactivateLabels();
		}

		if (this._updateValues() || this._valuesChanged){
			this._trigger("valuesChanged");

			if (isAutomatic !== true){
				this._trigger("userValuesChanged");
			}

			this._valuesChanged = false;
		}

		if (isAutomatic === true){
			this._reactivateLabels();
		}
	},

	_updateValues: function(){
		var left = this._leftHandle("value"),
			right = this._rightHandle("value"),
			min = this._min(left, right),
			max = this._max(left, right),
			changing = (min !== this._values.min || max !== this._values.max);

		this._values.min = this._min(left, right);
		this._values.max = this._max(left, right);

		return changing;
	},

	_min: function(value1, value2){
		return Math.min(value1, value2);
	},

	_max: function(value1, value2){
		return Math.max(value1, value2);
	},

	/*
	 * Value labels
	 */
	_createLabel: function(label, handle){
		var params;

		if (label === null){
			params = this._getLabelConstructorParameters(label, handle);
			label = $("<div />")
				.appendTo(this.element)
				[this._labelType()](params);
		}else{
			params = this._getLabelRefreshParameters(label, handle);

			label[this._labelType()](params);
		}

		return label;
	},

	_getLabelConstructorParameters: function(label, handle){
		return {
			handle: handle,
			handleType: this._handleType(),
			formatter: this._getFormatter(),
			show: this.options.valueLabels,
			durationIn: this.options.durationIn,
			durationOut: this.options.durationOut,
			delayOut: this.options.delayOut
		};
	},

	_getLabelRefreshParameters: function(){
		return {
			formatter: this._getFormatter(),
			show: this.options.valueLabels,
			durationIn: this.options.durationIn,
			durationOut: this.options.durationOut,
			delayOut: this.options.delayOut
		};
	},

	_getFormatter: function(){
		if (this.options.formatter === false || this.options.formatter === null){
			return this._defaultFormatter;
		}

		return this.options.formatter;
	},

	_defaultFormatter: function(value){
		return Math.round(value);
	},

	_destroyLabel: function(label){
		if (label !== null){
			label[this._labelType()]("destroy");
			label.remove();
			label = null;
		}

		return label;
	},

	_createLabels: function(){
		this.labels.left = this._createLabel(this.labels.left, this.leftHandle);
		this.labels.right = this._createLabel(this.labels.right, this.rightHandle);

		this._leftLabel("pair", this.labels.right);
	},

	_destroyLabels: function(){
		this.labels.left = this._destroyLabel(this.labels.left);
		this.labels.right = this._destroyLabel(this.labels.right);
	},

	/*
	 * Scrolling
	 */
	_stepRatio: function(){
		return this._leftHandle("stepRatio");
	},

	_scrollRightClick: function(e){
		if (!this.options.enabled) return false;

		e.preventDefault();
		this._bar("startScroll");
		this._bindStopScroll();

		this._continueScrolling("scrollRight", 4 * this._stepRatio(), 1);
	},

	_continueScrolling: function(action, timeout, quantity, timesBeforeSpeedingUp){
		if (!this.options.enabled) return false;

		this._bar(action, quantity);
		timesBeforeSpeedingUp = timesBeforeSpeedingUp || 5;
		timesBeforeSpeedingUp--;

		var that = this,
			minTimeout = 16,
			maxQuantity = Math.max(1, 4 / this._stepRatio());

		this._scrollTimeout = setTimeout(function(){
			if (timesBeforeSpeedingUp === 0){
				if (timeout > minTimeout){
					timeout = Math.max(minTimeout, timeout / 1.5);
				} else {
					quantity = Math.min(maxQuantity, quantity * 2);
				}

				timesBeforeSpeedingUp = 5;
			}

			that._continueScrolling(action, timeout, quantity, timesBeforeSpeedingUp);
		}, timeout);
	},

	_scrollLeftClick: function(e){
		if (!this.options.enabled) return false;

		e.preventDefault();

		this._bar("startScroll");
		this._bindStopScroll();

		this._continueScrolling("scrollLeft", 4 * this._stepRatio(), 1);
	},

	_bindStopScroll: function(){
		var that = this;
		this._stopScrollHandle = function(e){
			e.preventDefault();
			that._stopScroll();
		};

		$(document).bind("mouseup touchend", this._stopScrollHandle);
	},

	_stopScroll: function(){
		$(document).unbind("mouseup touchend", this._stopScrollHandle);
		this._stopScrollHandle = null;
		this._bar("stopScroll");
		clearTimeout(this._scrollTimeout);
	},

	/*
	 * Ruler
	 */
	_createRuler: function(){
		this.ruler = $("<div class='bk-ui-rangeSlider-ruler' />").appendTo(this.innerBar);
	},

	_setRulerParameters: function(){
		this.ruler.ruler({
			min: this.options.bounds.min,
			max: this.options.bounds.max,
			scales: this.options.scales
		});
	},

	_destroyRuler: function(){
		if (this.ruler !== null && $.fn.ruler){
			this.ruler.ruler("destroy");
			this.ruler.remove();
			this.ruler = null;
		}
	},

	_updateRuler: function(){
		this._destroyRuler();

		if (this.options.scales === false || !$.fn.ruler){
			return;
		}

		this._createRuler();
		this._setRulerParameters();
	},

	/*
	 * Public methods
	 */
	values: function(min, max){
		var val;

		if (typeof min !== "undefined" && typeof max !== "undefined"){
			if (!this._initialized){
				this._values.min = min;
				this._values.max = max;
				return this._values;
			}

			this._deactivateLabels();
			val = this._bar("values", min, max);
			this._changed(true);
			this._reactivateLabels();
		}else{
			val = this._bar("values", min, max);
		}

		return val;
	},

	min: function(min){
		this._values.min = this.values(min, this._values.max).min;

		return this._values.min;
	},

	max: function(max){
		this._values.max = this.values(this._values.min, max).max;

		return this._values.max;
	},

	bounds: function(min, max){
		if (this._isValidValue(min) && this._isValidValue(max) && min < max){

			this._setBounds(min, max);
			this._updateRuler();
			this._changed(true);
		}

		return this.options.bounds;
	},

	_isValidValue: function(value){
		return typeof value !== "undefined" && parseFloat(value) === value;
	},

	_setBounds: function(min, max){
		this.options.bounds = {min: min, max: max};
		this._leftHandle("option", "bounds", this.options.bounds);
		this._rightHandle("option", "bounds", this.options.bounds);
		this._bar("option", "bounds", this.options.bounds);
	},

	zoomIn: function(quantity){
		this._bar("zoomIn", quantity)
	},

	zoomOut: function(quantity){
		this._bar("zoomOut", quantity);
	},

	scrollLeft: function(quantity){
		this._bar("startScroll");
		this._bar("scrollLeft", quantity);
		this._bar("stopScroll");
	},

	scrollRight: function(quantity){
		this._bar("startScroll");
		this._bar("scrollRight", quantity);
		this._bar("stopScroll");
	},

	/**
	 * Resize
	 */
	resize: function(){
		this._initWidth();
		this._leftHandle("update");
		this._rightHandle("update");
		this._bar("update");
	},

	/*
	 * Enable / disable
	 */
	enable: function(){
		this.toggle(true);
	},

	disable: function(){
		this.toggle(false);
	},

	toggle: function(enabled){
		if (enabled === undefined) enabled = !this.options.enabled;

		if (this.options.enabled !== enabled){
			this._toggle(enabled);
		}
	},

	_toggle: function(enabled){
		this.options.enabled = enabled;
		this.element.toggleClass("bk-ui-rangeSlider-disabled", !enabled);

		var action = enabled ? "enable" : "disable";

		this._bar(action);
		this._leftHandle(action);
		this._rightHandle(action);
		this._leftLabel(action);
		this._rightLabel(action);
	},

	/*
	 * Destroy
	 */
	destroy: function(){
		this.element.removeClass("bk-ui-rangeSlider-withArrows bk-ui-rangeSlider-noArrow bk-ui-rangeSlider-disabled");

		this._destroyWidgets();
		this._destroyElements();

		this.element.removeClass("bk-ui-rangeSlider");
		this.options = null;

		$(window).unbind("resize", this._resizeProxy);
		this._resizeProxy = null;
		this._bindResize = null;

		$.Widget.prototype.destroy.apply(this, arguments);
	},

	_destroyWidget: function(name){
		this["_" + name]("destroy");
		this[name].remove();
		this[name] = null;
	},

	_destroyWidgets: function(){
		this._destroyWidget("bar");
		this._destroyWidget("leftHandle");
		this._destroyWidget("rightHandle");

		this._destroyRuler();
		this._destroyLabels();
	},

	_destroyElements: function(){
		this.container.remove();
		this.container = null;

		this.innerBar.remove();
		this.innerBar = null;

		this.arrows.left.remove();
		this.arrows.right.remove();
		this.arrows = null;
	}
});

},{"jquery":"jquery","jquery-mousewheel":"jquery-mousewheel","jquery-ui/core":"jquery-ui/core","jquery-ui/mouse":"jquery-ui/mouse","jquery-ui/widget":"jquery-ui/widget"}],"jquery_event_drag":[function(require,module,exports){
/*!
 * jquery.event.drag - v 2.2
 * Copyright (c) 2010 Three Dub Media - http://threedubmedia.com
 * Open Source MIT License - http://threedubmedia.com/code/license
 */
// Created: 2008-06-04
// Updated: 2012-05-21
// REQUIRES: jquery 1.7.x

var $ = require("jquery");

// add the jquery instance method
$.fn.drag = function( str, arg, opts ){
	// figure out the event type
	var type = typeof str == "string" ? str : "",
	// figure out the event handler...
	fn = $.isFunction( str ) ? str : $.isFunction( arg ) ? arg : null;
	// fix the event type
	if ( type.indexOf("drag") !== 0 )
		type = "drag"+ type;
	// were options passed
	opts = ( str == fn ? arg : opts ) || {};
	// trigger or bind event handler
	return fn ? this.bind( type, opts, fn ) : this.trigger( type );
};

// local refs (increase compression)
var $event = $.event,
$special = $event.special,
// configure the drag special event
drag = $special.drag = {

	// these are the default settings
	defaults: {
		which: 1, // mouse button pressed to start drag sequence
		distance: 0, // distance dragged before dragstart
		not: ':input', // selector to suppress dragging on target elements
		handle: null, // selector to match handle target elements
		relative: false, // true to use "position", false to use "offset"
		drop: true, // false to suppress drop events, true or selector to allow
		click: false // false to suppress click events after dragend (no proxy)
	},

	// the key name for stored drag data
	datakey: "dragdata",

	// prevent bubbling for better performance
	noBubble: true,

	// count bound related events
	add: function( obj ){
		// read the interaction data
		var data = $.data( this, drag.datakey ),
		// read any passed options
		opts = obj.data || {};
		// count another realted event
		data.related += 1;
		// extend data options bound with this event
		// don't iterate "opts" in case it is a node
		$.each( drag.defaults, function( key, def ){
			if ( opts[ key ] !== undefined )
				data[ key ] = opts[ key ];
		});
	},

	// forget unbound related events
	remove: function(){
		$.data( this, drag.datakey ).related -= 1;
	},

	// configure interaction, capture settings
	setup: function(){
		// check for related events
		if ( $.data( this, drag.datakey ) )
			return;
		// initialize the drag data with copied defaults
		var data = $.extend({ related:0 }, drag.defaults );
		// store the interaction data
		$.data( this, drag.datakey, data );
		// bind the mousedown event, which starts drag interactions
		$event.add( this, "touchstart mousedown", drag.init, data );
		// prevent image dragging in IE...
		if ( this.attachEvent )
			this.attachEvent("ondragstart", drag.dontstart );
	},

	// destroy configured interaction
	teardown: function(){
		var data = $.data( this, drag.datakey ) || {};
		// check for related events
		if ( data.related )
			return;
		// remove the stored data
		$.removeData( this, drag.datakey );
		// remove the mousedown event
		$event.remove( this, "touchstart mousedown", drag.init );
		// enable text selection
		drag.textselect( true );
		// un-prevent image dragging in IE...
		if ( this.detachEvent )
			this.detachEvent("ondragstart", drag.dontstart );
	},

	// initialize the interaction
	init: function( event ){
		// sorry, only one touch at a time
		if ( drag.touched )
			return;
		// the drag/drop interaction data
		var dd = event.data, results;
		// check the which directive
		if ( event.which != 0 && dd.which > 0 && event.which != dd.which )
			return;
		// check for suppressed selector
		if ( $( event.target ).is( dd.not ) )
			return;
		// check for handle selector
		if ( dd.handle && !$( event.target ).closest( dd.handle, event.currentTarget ).length )
			return;

		drag.touched = event.type == 'touchstart' ? this : null;
		dd.propagates = 1;
		dd.mousedown = this;
		dd.interactions = [ drag.interaction( this, dd ) ];
		dd.target = event.target;
		dd.pageX = event.pageX;
		dd.pageY = event.pageY;
		dd.dragging = null;
		// handle draginit event...
		results = drag.hijack( event, "draginit", dd );
		// early cancel
		if ( !dd.propagates )
			return;
		// flatten the result set
		results = drag.flatten( results );
		// insert new interaction elements
		if ( results && results.length ){
			dd.interactions = [];
			$.each( results, function(){
				dd.interactions.push( drag.interaction( this, dd ) );
			});
		}
		// remember how many interactions are propagating
		dd.propagates = dd.interactions.length;
		// locate and init the drop targets
		if ( dd.drop !== false && $special.drop )
			$special.drop.handler( event, dd );
		// disable text selection
		drag.textselect( false );
		// bind additional events...
		if ( drag.touched )
			$event.add( drag.touched, "touchmove touchend", drag.handler, dd );
		else
			$event.add( document, "mousemove mouseup", drag.handler, dd );
		// helps prevent text selection or scrolling
		if ( !drag.touched || dd.live )
			return false;
	},

	// returns an interaction object
	interaction: function( elem, dd ){
		var offset = $( elem )[ dd.relative ? "position" : "offset" ]() || { top:0, left:0 };
		return {
			drag: elem,
			callback: new drag.callback(),
			droppable: [],
			offset: offset
		};
	},

	// handle drag-releatd DOM events
	handler: function( event ){
		// read the data before hijacking anything
		var dd = event.data;
		// handle various events
		switch ( event.type ){
			// mousemove, check distance, start dragging
			case !dd.dragging && 'touchmove':
				event.preventDefault();
			case !dd.dragging && 'mousemove':
				//  drag tolerance, x≤ + y≤ = distance≤
				if ( Math.pow(  event.pageX-dd.pageX, 2 ) + Math.pow(  event.pageY-dd.pageY, 2 ) < Math.pow( dd.distance, 2 ) )
					break; // distance tolerance not reached
				event.target = dd.target; // force target from "mousedown" event (fix distance issue)
				drag.hijack( event, "dragstart", dd ); // trigger "dragstart"
				if ( dd.propagates ) // "dragstart" not rejected
					dd.dragging = true; // activate interaction
			// mousemove, dragging
			case 'touchmove':
				event.preventDefault();
			case 'mousemove':
				if ( dd.dragging ){
					// trigger "drag"
					drag.hijack( event, "drag", dd );
					if ( dd.propagates ){
						// manage drop events
						if ( dd.drop !== false && $special.drop )
							$special.drop.handler( event, dd ); // "dropstart", "dropend"
						break; // "drag" not rejected, stop
					}
					event.type = "mouseup"; // helps "drop" handler behave
				}
			// mouseup, stop dragging
			case 'touchend':
			case 'mouseup':
			default:
				if ( drag.touched )
					$event.remove( drag.touched, "touchmove touchend", drag.handler ); // remove touch events
				else
					$event.remove( document, "mousemove mouseup", drag.handler ); // remove page events
				if ( dd.dragging ){
					if ( dd.drop !== false && $special.drop )
						$special.drop.handler( event, dd ); // "drop"
					drag.hijack( event, "dragend", dd ); // trigger "dragend"
				}
				drag.textselect( true ); // enable text selection
				// if suppressing click events...
				if ( dd.click === false && dd.dragging )
					$.data( dd.mousedown, "suppress.click", new Date().getTime() + 5 );
				dd.dragging = drag.touched = false; // deactivate element
				break;
		}
	},

	// re-use event object for custom events
	hijack: function( event, type, dd, x, elem ){
		// not configured
		if ( !dd )
			return;
		// remember the original event and type
		var orig = { event:event.originalEvent, type:event.type },
		// is the event drag related or drog related?
		mode = type.indexOf("drop") ? "drag" : "drop",
		// iteration vars
		result, i = x || 0, ia, $elems, callback,
		len = !isNaN( x ) ? x : dd.interactions.length;
		// modify the event type
		event.type = type;
		// remove the original event
		event.originalEvent = null;
		// initialize the results
		dd.results = [];
		// handle each interacted element
		do if ( ia = dd.interactions[ i ] ){
			// validate the interaction
			if ( type !== "dragend" && ia.cancelled )
				continue;
			// set the dragdrop properties on the event object
			callback = drag.properties( event, dd, ia );
			// prepare for more results
			ia.results = [];
			// handle each element
			$( elem || ia[ mode ] || dd.droppable ).each(function( p, subject ){
				// identify drag or drop targets individually
				callback.target = subject;
				// force propagtion of the custom event
				event.isPropagationStopped = function(){ return false; };
				// handle the event
				result = subject ? $event.dispatch.call( subject, event, callback ) : null;
				// stop the drag interaction for this element
				if ( result === false ){
					if ( mode == "drag" ){
						ia.cancelled = true;
						dd.propagates -= 1;
					}
					if ( type == "drop" ){
						ia[ mode ][p] = null;
					}
				}
				// assign any dropinit elements
				else if ( type == "dropinit" )
					ia.droppable.push( drag.element( result ) || subject );
				// accept a returned proxy element
				if ( type == "dragstart" )
					ia.proxy = $( drag.element( result ) || ia.drag )[0];
				// remember this result
				ia.results.push( result );
				// forget the event result, for recycling
				delete event.result;
				// break on cancelled handler
				if ( type !== "dropinit" )
					return result;
			});
			// flatten the results
			dd.results[ i ] = drag.flatten( ia.results );
			// accept a set of valid drop targets
			if ( type == "dropinit" )
				ia.droppable = drag.flatten( ia.droppable );
			// locate drop targets
			if ( type == "dragstart" && !ia.cancelled )
				callback.update();
		}
		while ( ++i < len )
		// restore the original event & type
		event.type = orig.type;
		event.originalEvent = orig.event;
		// return all handler results
		return drag.flatten( dd.results );
	},

	// extend the callback object with drag/drop properties...
	properties: function( event, dd, ia ){
		var obj = ia.callback;
		// elements
		obj.drag = ia.drag;
		obj.proxy = ia.proxy || ia.drag;
		// starting mouse position
		obj.startX = dd.pageX;
		obj.startY = dd.pageY;
		// current distance dragged
		obj.deltaX = event.pageX - dd.pageX;
		obj.deltaY = event.pageY - dd.pageY;
		// original element position
		obj.originalX = ia.offset.left;
		obj.originalY = ia.offset.top;
		// adjusted element position
		obj.offsetX = obj.originalX + obj.deltaX;
		obj.offsetY = obj.originalY + obj.deltaY;
		// assign the drop targets information
		obj.drop = drag.flatten( ( ia.drop || [] ).slice() );
		obj.available = drag.flatten( ( ia.droppable || [] ).slice() );
		return obj;
	},

	// determine is the argument is an element or jquery instance
	element: function( arg ){
		if ( arg && ( arg.jquery || arg.nodeType == 1 ) )
			return arg;
	},

	// flatten nested jquery objects and arrays into a single dimension array
	flatten: function( arr ){
		return $.map( arr, function( member ){
			return member && member.jquery ? $.makeArray( member ) :
				member && member.length ? drag.flatten( member ) : member;
		});
	},

	// toggles text selection attributes ON (true) or OFF (false)
	textselect: function( bool ){
		$( document )[ bool ? "unbind" : "bind" ]("selectstart", drag.dontstart )
			.css("MozUserSelect", bool ? "" : "none" );
		// .attr("unselectable", bool ? "off" : "on" )
		document.unselectable = bool ? "off" : "on";
	},

	// suppress "selectstart" and "ondragstart" events
	dontstart: function(){
		return false;
	},

	// a callback instance contructor
	callback: function(){}

};

// callback methods
drag.callback.prototype = {
	update: function(){
		if ( $special.drop && this.available.length )
			$.each( this.available, function( i ){
				$special.drop.locate( this, i );
			});
	}
};

// patch $.event.$dispatch to allow suppressing clicks
var $dispatch = $event.dispatch;
$event.dispatch = function( event ){
	if ( $.data( this, "suppress."+ event.type ) - new Date().getTime() > 0 ){
		$.removeData( this, "suppress."+ event.type );
		return;
	}
	return $dispatch.apply( this, arguments );
};

// event fix hooks for touch events...
var touchHooks =
$event.fixHooks.touchstart =
$event.fixHooks.touchmove =
$event.fixHooks.touchend =
$event.fixHooks.touchcancel = {
	props: "clientX clientY pageX pageY screenX screenY".split( " " ),
	filter: function( event, orig ) {
		if ( orig ){
			var touched = ( orig.touches && orig.touches[0] )
				|| ( orig.changedTouches && orig.changedTouches[0] )
				|| null;
			// iOS webkit: touchstart, touchmove, touchend
			if ( touched )
				$.each( touchHooks.props, function( i, prop ){
					event[ prop ] = touched[ prop ];
				});
		}
		return event;
	}
};

// share the same special event configuration with related events...
$special.draginit = $special.dragstart = $special.dragend = drag;

},{"jquery":"jquery"}],"jquery_event_drop":[function(require,module,exports){
/*!
 * jquery.event.drop - v 2.2
 * Copyright (c) 2010 Three Dub Media - http://threedubmedia.com
 * Open Source MIT License - http://threedubmedia.com/code/license
 */
// Created: 2008-06-04
// Updated: 2012-05-21
// REQUIRES: jquery 1.7.x, event.drag 2.2

var $ = require("jquery");
var $1 = require("jquery_event_drag");

// Events: drop, dropstart, dropend

// add the jquery instance method
$.fn.drop = function( str, arg, opts ){
	// figure out the event type
	var type = typeof str == "string" ? str : "",
	// figure out the event handler...
	fn = $.isFunction( str ) ? str : $.isFunction( arg ) ? arg : null;
	// fix the event type
	if ( type.indexOf("drop") !== 0 )
		type = "drop"+ type;
	// were options passed
	opts = ( str == fn ? arg : opts ) || {};
	// trigger or bind event handler
	return fn ? this.bind( type, opts, fn ) : this.trigger( type );
};

// DROP MANAGEMENT UTILITY
// returns filtered drop target elements, caches their positions
$.drop = function( opts ){
	opts = opts || {};
	// safely set new options...
	drop.multi = opts.multi === true ? Infinity :
		opts.multi === false ? 1 : !isNaN( opts.multi ) ? opts.multi : drop.multi;
	drop.delay = opts.delay || drop.delay;
	drop.tolerance = $.isFunction( opts.tolerance ) ? opts.tolerance :
		opts.tolerance === null ? null : drop.tolerance;
	drop.mode = opts.mode || drop.mode || 'intersect';
};

// local refs (increase compression)
var $event = $.event,
$special = $event.special,
// configure the drop special event
drop = $.event.special.drop = {

	// these are the default settings
	multi: 1, // allow multiple drop winners per dragged element
	delay: 20, // async timeout delay
	mode: 'overlap', // drop tolerance mode

	// internal cache
	targets: [],

	// the key name for stored drop data
	datakey: "dropdata",

	// prevent bubbling for better performance
	noBubble: true,

	// count bound related events
	add: function( obj ){
		// read the interaction data
		var data = $.data( this, drop.datakey );
		// count another realted event
		data.related += 1;
	},

	// forget unbound related events
	remove: function(){
		$.data( this, drop.datakey ).related -= 1;
	},

	// configure the interactions
	setup: function(){
		// check for related events
		if ( $.data( this, drop.datakey ) )
			return;
		// initialize the drop element data
		var data = {
			related: 0,
			active: [],
			anyactive: 0,
			winner: 0,
			location: {}
		};
		// store the drop data on the element
		$.data( this, drop.datakey, data );
		// store the drop target in internal cache
		drop.targets.push( this );
	},

	// destroy the configure interaction
	teardown: function(){
		var data = $.data( this, drop.datakey ) || {};
		// check for related events
		if ( data.related )
			return;
		// remove the stored data
		$.removeData( this, drop.datakey );
		// reference the targeted element
		var element = this;
		// remove from the internal cache
		drop.targets = $.grep( drop.targets, function( target ){
			return ( target !== element );
		});
	},

	// shared event handler
	handler: function( event, dd ){
		// local vars
		var results, $targets;
		// make sure the right data is available
		if ( !dd )
			return;
		// handle various events
		switch ( event.type ){
			// draginit, from $.event.special.drag
			case 'mousedown': // DROPINIT >>
			case 'touchstart': // DROPINIT >>
				// collect and assign the drop targets
				$targets =  $( drop.targets );
				if ( typeof dd.drop == "string" )
					$targets = $targets.filter( dd.drop );
				// reset drop data winner properties
				$targets.each(function(){
					var data = $.data( this, drop.datakey );
					data.active = [];
					data.anyactive = 0;
					data.winner = 0;
				});
				// set available target elements
				dd.droppable = $targets;
				// activate drop targets for the initial element being dragged
				$special.drag.hijack( event, "dropinit", dd );
				break;
			// drag, from $.event.special.drag
			case 'mousemove': // TOLERATE >>
			case 'touchmove': // TOLERATE >>
				drop.event = event; // store the mousemove event
				if ( !drop.timer )
					// monitor drop targets
					drop.tolerate( dd );
				break;
			// dragend, from $.event.special.drag
			case 'mouseup': // DROP >> DROPEND >>
			case 'touchend': // DROP >> DROPEND >>
				drop.timer = clearTimeout( drop.timer ); // delete timer
				if ( dd.propagates ){
					$special.drag.hijack( event, "drop", dd );
					$special.drag.hijack( event, "dropend", dd );
				}
				break;

		}
	},

	// returns the location positions of an element
	locate: function( elem, index ){
		var data = $.data( elem, drop.datakey ),
		$elem = $( elem ),
		posi = $elem.offset() || {},
		height = $elem.outerHeight(),
		width = $elem.outerWidth(),
		location = {
			elem: elem,
			width: width,
			height: height,
			top: posi.top,
			left: posi.left,
			right: posi.left + width,
			bottom: posi.top + height
		};
		// drag elements might not have dropdata
		if ( data ){
			data.location = location;
			data.index = index;
			data.elem = elem;
		}
		return location;
	},

	// test the location positions of an element against another OR an X,Y coord
	contains: function( target, test ){ // target { location } contains test [x,y] or { location }
		return ( ( test[0] || test.left ) >= target.left && ( test[0] || test.right ) <= target.right
			&& ( test[1] || test.top ) >= target.top && ( test[1] || test.bottom ) <= target.bottom );
	},

	// stored tolerance modes
	modes: { // fn scope: "$.event.special.drop" object
		// target with mouse wins, else target with most overlap wins
		'intersect': function( event, proxy, target ){
			return this.contains( target, [ event.pageX, event.pageY ] ) ? // check cursor
				1e9 : this.modes.overlap.apply( this, arguments ); // check overlap
		},
		// target with most overlap wins
		'overlap': function( event, proxy, target ){
			// calculate the area of overlap...
			return Math.max( 0, Math.min( target.bottom, proxy.bottom ) - Math.max( target.top, proxy.top ) )
				* Math.max( 0, Math.min( target.right, proxy.right ) - Math.max( target.left, proxy.left ) );
		},
		// proxy is completely contained within target bounds
		'fit': function( event, proxy, target ){
			return this.contains( target, proxy ) ? 1 : 0;
		},
		// center of the proxy is contained within target bounds
		'middle': function( event, proxy, target ){
			return this.contains( target, [ proxy.left + proxy.width * .5, proxy.top + proxy.height * .5 ] ) ? 1 : 0;
		}
	},

	// sort drop target cache by by winner (dsc), then index (asc)
	sort: function( a, b ){
		return ( b.winner - a.winner ) || ( a.index - b.index );
	},

	// async, recursive tolerance execution
	tolerate: function( dd ){
		// declare local refs
		var i, drp, drg, data, arr, len, elem,
		// interaction iteration variables
		x = 0, ia, end = dd.interactions.length,
		// determine the mouse coords
		xy = [ drop.event.pageX, drop.event.pageY ],
		// custom or stored tolerance fn
		tolerance = drop.tolerance || drop.modes[ drop.mode ];
		// go through each passed interaction...
		do if ( ia = dd.interactions[x] ){
			// check valid interaction
			if ( !ia )
				return;
			// initialize or clear the drop data
			ia.drop = [];
			// holds the drop elements
			arr = [];
			len = ia.droppable.length;
			// determine the proxy location, if needed
			if ( tolerance )
				drg = drop.locate( ia.proxy );
			// reset the loop
			i = 0;
			// loop each stored drop target
			do if ( elem = ia.droppable[i] ){
				data = $.data( elem, drop.datakey );
				drp = data.location;
				if ( !drp ) continue;
				// find a winner: tolerance function is defined, call it
				data.winner = tolerance ? tolerance.call( drop, drop.event, drg, drp )
					// mouse position is always the fallback
					: drop.contains( drp, xy ) ? 1 : 0;
				arr.push( data );
			} while ( ++i < len ); // loop
			// sort the drop targets
			arr.sort( drop.sort );
			// reset the loop
			i = 0;
			// loop through all of the targets again
			do if ( data = arr[ i ] ){
				// winners...
				if ( data.winner && ia.drop.length < drop.multi ){
					// new winner... dropstart
					if ( !data.active[x] && !data.anyactive ){
						// check to make sure that this is not prevented
						if ( $special.drag.hijack( drop.event, "dropstart", dd, x, data.elem )[0] !== false ){
							data.active[x] = 1;
							data.anyactive += 1;
						}
						// if false, it is not a winner
						else
							data.winner = 0;
					}
					// if it is still a winner
					if ( data.winner )
						ia.drop.push( data.elem );
				}
				// losers...
				else if ( data.active[x] && data.anyactive == 1 ){
					// former winner... dropend
					$special.drag.hijack( drop.event, "dropend", dd, x, data.elem );
					data.active[x] = 0;
					data.anyactive -= 1;
				}
			} while ( ++i < len ); // loop
		} while ( ++x < end ) // loop
		// check if the mouse is still moving or is idle
		if ( drop.last && xy[0] == drop.last.pageX && xy[1] == drop.last.pageY )
			delete drop.timer; // idle, don't recurse
		else  // recurse
			drop.timer = setTimeout(function(){
				drop.tolerate( dd );
			}, drop.delay );
		// remember event, to compare idleness
		drop.last = drop.event;
	}

};

// share the same special event configuration with related events...
$special.dropinit = $special.dropstart = $special.dropend = drop;

},{"jquery":"jquery","jquery_event_drag":"jquery_event_drag"}],"slick_grid/plugins/slick.checkboxselectcolumn":[function(require,module,exports){
var $ = require("jquery");
var Slick = require("../slick.core");

function CheckboxSelectColumn(options) {
  var _grid;
  var _self = this;
  var _handler = new Slick.EventHandler();
  var _selectedRowsLookup = {};
  var _defaults = {
    columnId: "_checkbox_selector",
    cssClass: null,
    toolTip: "Select/Deselect All",
    width: 30
  };

  var _options = $.extend(true, {}, _defaults, options);

  function init(grid) {
    _grid = grid;
    _handler
      .subscribe(_grid.onSelectedRowsChanged, handleSelectedRowsChanged)
      .subscribe(_grid.onClick, handleClick)
      .subscribe(_grid.onHeaderClick, handleHeaderClick)
      .subscribe(_grid.onKeyDown, handleKeyDown);
  }

  function destroy() {
    _handler.unsubscribeAll();
  }

  function handleSelectedRowsChanged(e, args) {
    var selectedRows = _grid.getSelectedRows();
    var lookup = {}, row, i;
    for (i = 0; i < selectedRows.length; i++) {
      row = selectedRows[i];
      lookup[row] = true;
      if (lookup[row] !== _selectedRowsLookup[row]) {
        _grid.invalidateRow(row);
        delete _selectedRowsLookup[row];
      }
    }
    for (i in _selectedRowsLookup) {
      _grid.invalidateRow(i);
    }
    _selectedRowsLookup = lookup;
    _grid.render();

    if (selectedRows.length && selectedRows.length == _grid.getDataLength()) {
      _grid.updateColumnHeader(_options.columnId, "<input type='checkbox' checked='checked'>", _options.toolTip);
    } else {
      _grid.updateColumnHeader(_options.columnId, "<input type='checkbox'>", _options.toolTip);
    }
  }

  function handleKeyDown(e, args) {
    if (e.which == 32) {
      if (_grid.getColumns()[args.cell].id === _options.columnId) {
        // if editing, try to commit
        if (!_grid.getEditorLock().isActive() || _grid.getEditorLock().commitCurrentEdit()) {
          toggleRowSelection(args.row);
        }
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }
  }

  function handleClick(e, args) {
    // clicking on a row select checkbox
    if (_grid.getColumns()[args.cell].id === _options.columnId && $(e.target).is(":checkbox")) {
      // if editing, try to commit
      if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }

      toggleRowSelection(args.row);
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }

  function toggleRowSelection(row) {
    if (_selectedRowsLookup[row]) {
      _grid.setSelectedRows($.grep(_grid.getSelectedRows(), function (n) {
        return n != row
      }));
    } else {
      _grid.setSelectedRows(_grid.getSelectedRows().concat(row));
    }
  }

  function handleHeaderClick(e, args) {
    if (args.column.id == _options.columnId && $(e.target).is(":checkbox")) {
      // if editing, try to commit
      if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }

      if ($(e.target).is(":checked")) {
        var rows = [];
        for (var i = 0; i < _grid.getDataLength(); i++) {
          rows.push(i);
        }
        _grid.setSelectedRows(rows);
      } else {
        _grid.setSelectedRows([]);
      }
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }

  function getColumnDefinition() {
    return {
      id: _options.columnId,
      name: "<input type='checkbox'>",
      toolTip: _options.toolTip,
      field: "sel",
      width: _options.width,
      resizable: false,
      sortable: false,
      cssClass: _options.cssClass,
      formatter: checkboxSelectionFormatter
    };
  }

  function checkboxSelectionFormatter(row, cell, value, columnDef, dataContext) {
    if (dataContext) {
      return _selectedRowsLookup[row]
          ? "<input type='checkbox' checked='checked'>"
          : "<input type='checkbox'>";
    }
    return null;
  }

  $.extend(this, {
    "init": init,
    "destroy": destroy,

    "getColumnDefinition": getColumnDefinition
  });
}

module.exports = CheckboxSelectColumn;

},{"../slick.core":"slick_grid/slick.core","jquery":"jquery"}],"slick_grid/plugins/slick.rowselectionmodel":[function(require,module,exports){
var $ = require("jquery");
var Slick = require("../slick.core");

function RowSelectionModel(options) {
  var _grid;
  var _ranges = [];
  var _self = this;
  var _handler = new Slick.EventHandler();
  var _inHandler;
  var _options;
  var _defaults = {
    selectActiveRow: true
  };

  function init(grid) {
    _options = $.extend(true, {}, _defaults, options);
    _grid = grid;
    _handler.subscribe(_grid.onActiveCellChanged,
        wrapHandler(handleActiveCellChange));
    _handler.subscribe(_grid.onKeyDown,
        wrapHandler(handleKeyDown));
    _handler.subscribe(_grid.onClick,
        wrapHandler(handleClick));
  }

  function destroy() {
    _handler.unsubscribeAll();
  }

  function wrapHandler(handler) {
    return function () {
      if (!_inHandler) {
        _inHandler = true;
        handler.apply(this, arguments);
        _inHandler = false;
      }
    };
  }

  function rangesToRows(ranges) {
    var rows = [];
    for (var i = 0; i < ranges.length; i++) {
      for (var j = ranges[i].fromRow; j <= ranges[i].toRow; j++) {
        rows.push(j);
      }
    }
    return rows;
  }

  function rowsToRanges(rows) {
    var ranges = [];
    var lastCell = _grid.getColumns().length - 1;
    for (var i = 0; i < rows.length; i++) {
      ranges.push(new Slick.Range(rows[i], 0, rows[i], lastCell));
    }
    return ranges;
  }

  function getRowsRange(from, to) {
    var i, rows = [];
    for (i = from; i <= to; i++) {
      rows.push(i);
    }
    for (i = to; i < from; i++) {
      rows.push(i);
    }
    return rows;
  }

  function getSelectedRows() {
    return rangesToRows(_ranges);
  }

  function setSelectedRows(rows) {
    setSelectedRanges(rowsToRanges(rows));
  }

  function setSelectedRanges(ranges) {
    _ranges = ranges;
    _self.onSelectedRangesChanged.notify(_ranges);
  }

  function getSelectedRanges() {
    return _ranges;
  }

  function handleActiveCellChange(e, data) {
    if (_options.selectActiveRow && data.row != null) {
      setSelectedRanges([new Slick.Range(data.row, 0, data.row, _grid.getColumns().length - 1)]);
    }
  }

  function handleKeyDown(e) {
    var activeRow = _grid.getActiveCell();
    if (activeRow && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey && (e.which == 38 || e.which == 40)) {
      var selectedRows = getSelectedRows();
      selectedRows.sort(function (x, y) {
        return x - y
      });

      if (!selectedRows.length) {
        selectedRows = [activeRow.row];
      }

      var top = selectedRows[0];
      var bottom = selectedRows[selectedRows.length - 1];
      var active;

      if (e.which == 40) {
        active = activeRow.row < bottom || top == bottom ? ++bottom : ++top;
      } else {
        active = activeRow.row < bottom ? --bottom : --top;
      }

      if (active >= 0 && active < _grid.getDataLength()) {
        _grid.scrollRowIntoView(active);
        _ranges = rowsToRanges(getRowsRange(top, bottom));
        setSelectedRanges(_ranges);
      }

      e.preventDefault();
      e.stopPropagation();
    }
  }

  function handleClick(e) {
    var cell = _grid.getCellFromEvent(e);
    if (!cell || !_grid.canCellBeActive(cell.row, cell.cell)) {
      return false;
    }

    if (!_grid.getOptions().multiSelect || (
        !e.ctrlKey && !e.shiftKey && !e.metaKey)) {
      return false;
    }

    var selection = rangesToRows(_ranges);
    var idx = $.inArray(cell.row, selection);

    if (idx === -1 && (e.ctrlKey || e.metaKey)) {
      selection.push(cell.row);
      _grid.setActiveCell(cell.row, cell.cell);
    } else if (idx !== -1 && (e.ctrlKey || e.metaKey)) {
      selection = $.grep(selection, function (o, i) {
        return (o !== cell.row);
      });
      _grid.setActiveCell(cell.row, cell.cell);
    } else if (selection.length && e.shiftKey) {
      var last = selection.pop();
      var from = Math.min(cell.row, last);
      var to = Math.max(cell.row, last);
      selection = [];
      for (var i = from; i <= to; i++) {
        if (i !== last) {
          selection.push(i);
        }
      }
      selection.push(last);
      _grid.setActiveCell(cell.row, cell.cell);
    }

    _ranges = rowsToRanges(selection);
    setSelectedRanges(_ranges);
    e.stopImmediatePropagation();

    return true;
  }

  $.extend(this, {
    "getSelectedRows": getSelectedRows,
    "setSelectedRows": setSelectedRows,

    "getSelectedRanges": getSelectedRanges,
    "setSelectedRanges": setSelectedRanges,

    "init": init,
    "destroy": destroy,

    "onSelectedRangesChanged": new Slick.Event()
  });
}

module.exports = RowSelectionModel;

},{"../slick.core":"slick_grid/slick.core","jquery":"jquery"}],"slick_grid/slick.core":[function(require,module,exports){
/***
 * Contains core SlickGrid classes.
 * @module Core
 * @namespace Slick
 */

var $ = require("jquery");

// register namespace
var Slick = {
  Event: Event,
  EventData: EventData,
  EventHandler: EventHandler,
  Range: Range,
  NonDataRow: NonDataItem,
  Group: Group,
  GroupTotals: GroupTotals,
  EditorLock: EditorLock,

    /***
     * A global singleton editor lock.
     * @class GlobalEditorLock
     * @static
     * @constructor
     */
  GlobalEditorLock: new EditorLock()
};

/***
 * An event object for passing data to event handlers and letting them control propagation.
 * <p>This is pretty much identical to how W3C and jQuery implement events.</p>
 * @class EventData
 * @constructor
 */
function EventData() {
  var isPropagationStopped = false;
  var isImmediatePropagationStopped = false;

  /***
   * Stops event from propagating up the DOM tree.
   * @method stopPropagation
   */
  this.stopPropagation = function () {
    isPropagationStopped = true;
  };

  /***
   * Returns whether stopPropagation was called on this event object.
   * @method isPropagationStopped
   * @return {Boolean}
   */
  this.isPropagationStopped = function () {
    return isPropagationStopped;
  };

  /***
   * Prevents the rest of the handlers from being executed.
   * @method stopImmediatePropagation
   */
  this.stopImmediatePropagation = function () {
    isImmediatePropagationStopped = true;
  };

  /***
   * Returns whether stopImmediatePropagation was called on this event object.\
   * @method isImmediatePropagationStopped
   * @return {Boolean}
   */
  this.isImmediatePropagationStopped = function () {
    return isImmediatePropagationStopped;
  }
}

/***
 * A simple publisher-subscriber implementation.
 * @class Event
 * @constructor
 */
function Event() {
  var handlers = [];

  /***
   * Adds an event handler to be called when the event is fired.
   * <p>Event handler will receive two arguments - an <code>EventData</code> and the <code>data</code>
   * object the event was fired with.<p>
   * @method subscribe
   * @param fn {Function} Event handler.
   */
  this.subscribe = function (fn) {
    handlers.push(fn);
  };

  /***
   * Removes an event handler added with <code>subscribe(fn)</code>.
   * @method unsubscribe
   * @param fn {Function} Event handler to be removed.
   */
  this.unsubscribe = function (fn) {
    for (var i = handlers.length - 1; i >= 0; i--) {
      if (handlers[i] === fn) {
        handlers.splice(i, 1);
      }
    }
  };

  /***
   * Fires an event notifying all subscribers.
   * @method notify
   * @param args {Object} Additional data object to be passed to all handlers.
   * @param e {EventData}
   *      Optional.
   *      An <code>EventData</code> object to be passed to all handlers.
   *      For DOM events, an existing W3C/jQuery event object can be passed in.
   * @param scope {Object}
   *      Optional.
   *      The scope ("this") within which the handler will be executed.
   *      If not specified, the scope will be set to the <code>Event</code> instance.
   */
  this.notify = function (args, e, scope) {
    e = e || new EventData();
    scope = scope || this;

    var returnValue;
    for (var i = 0; i < handlers.length && !(e.isPropagationStopped() || e.isImmediatePropagationStopped()); i++) {
      returnValue = handlers[i].call(scope, e, args);
    }

    return returnValue;
  };
}

function EventHandler() {
  var handlers = [];

  this.subscribe = function (event, handler) {
    handlers.push({
      event: event,
      handler: handler
    });
    event.subscribe(handler);

    return this;  // allow chaining
  };

  this.unsubscribe = function (event, handler) {
    var i = handlers.length;
    while (i--) {
      if (handlers[i].event === event &&
          handlers[i].handler === handler) {
        handlers.splice(i, 1);
        event.unsubscribe(handler);
        return;
      }
    }

    return this;  // allow chaining
  };

  this.unsubscribeAll = function () {
    var i = handlers.length;
    while (i--) {
      handlers[i].event.unsubscribe(handlers[i].handler);
    }
    handlers = [];

    return this;  // allow chaining
  }
}

/***
 * A structure containing a range of cells.
 * @class Range
 * @constructor
 * @param fromRow {Integer} Starting row.
 * @param fromCell {Integer} Starting cell.
 * @param toRow {Integer} Optional. Ending row. Defaults to <code>fromRow</code>.
 * @param toCell {Integer} Optional. Ending cell. Defaults to <code>fromCell</code>.
 */
function Range(fromRow, fromCell, toRow, toCell) {
  if (toRow === undefined && toCell === undefined) {
    toRow = fromRow;
    toCell = fromCell;
  }

  /***
   * @property fromRow
   * @type {Integer}
   */
  this.fromRow = Math.min(fromRow, toRow);

  /***
   * @property fromCell
   * @type {Integer}
   */
  this.fromCell = Math.min(fromCell, toCell);

  /***
   * @property toRow
   * @type {Integer}
   */
  this.toRow = Math.max(fromRow, toRow);

  /***
   * @property toCell
   * @type {Integer}
   */
  this.toCell = Math.max(fromCell, toCell);

  /***
   * Returns whether a range represents a single row.
   * @method isSingleRow
   * @return {Boolean}
   */
  this.isSingleRow = function () {
    return this.fromRow == this.toRow;
  };

  /***
   * Returns whether a range represents a single cell.
   * @method isSingleCell
   * @return {Boolean}
   */
  this.isSingleCell = function () {
    return this.fromRow == this.toRow && this.fromCell == this.toCell;
  };

  /***
   * Returns whether a range contains a given cell.
   * @method contains
   * @param row {Integer}
   * @param cell {Integer}
   * @return {Boolean}
   */
  this.contains = function (row, cell) {
    return row >= this.fromRow && row <= this.toRow &&
        cell >= this.fromCell && cell <= this.toCell;
  };

  /***
   * Returns a readable representation of a range.
   * @method toString
   * @return {String}
   */
  this.toString = function () {
    if (this.isSingleCell()) {
      return "(" + this.fromRow + ":" + this.fromCell + ")";
    }
    else {
      return "(" + this.fromRow + ":" + this.fromCell + " - " + this.toRow + ":" + this.toCell + ")";
    }
  }
}


/***
 * A base class that all special / non-data rows (like Group and GroupTotals) derive from.
 * @class NonDataItem
 * @constructor
 */
function NonDataItem() {
  this.__nonDataRow = true;
}


/***
 * Information about a group of rows.
 * @class Group
 * @extends Slick.NonDataItem
 * @constructor
 */
function Group() {
  this.__group = true;

  /**
   * Grouping level, starting with 0.
   * @property level
   * @type {Number}
   */
  this.level = 0;

  /***
   * Number of rows in the group.
   * @property count
   * @type {Integer}
   */
  this.count = 0;

  /***
   * Grouping value.
   * @property value
   * @type {Object}
   */
  this.value = null;

  /***
   * Formatted display value of the group.
   * @property title
   * @type {String}
   */
  this.title = null;

  /***
   * Whether a group is collapsed.
   * @property collapsed
   * @type {Boolean}
   */
  this.collapsed = false;

  /***
   * GroupTotals, if any.
   * @property totals
   * @type {GroupTotals}
   */
  this.totals = null;

  /**
   * Rows that are part of the group.
   * @property rows
   * @type {Array}
   */
  this.rows = [];

  /**
   * Sub-groups that are part of the group.
   * @property groups
   * @type {Array}
   */
  this.groups = null;

  /**
   * A unique key used to identify the group.  This key can be used in calls to DataView
   * collapseGroup() or expandGroup().
   * @property groupingKey
   * @type {Object}
   */
  this.groupingKey = null;
}

Group.prototype = new NonDataItem();

/***
 * Compares two Group instances.
 * @method equals
 * @return {Boolean}
 * @param group {Group} Group instance to compare to.
 */
Group.prototype.equals = function (group) {
  return this.value === group.value &&
      this.count === group.count &&
      this.collapsed === group.collapsed &&
      this.title === group.title;
};

/***
 * Information about group totals.
 * An instance of GroupTotals will be created for each totals row and passed to the aggregators
 * so that they can store arbitrary data in it.  That data can later be accessed by group totals
 * formatters during the display.
 * @class GroupTotals
 * @extends Slick.NonDataItem
 * @constructor
 */
function GroupTotals() {
  this.__groupTotals = true;

  /***
   * Parent Group.
   * @param group
   * @type {Group}
   */
  this.group = null;

  /***
   * Whether the totals have been fully initialized / calculated.
   * Will be set to false for lazy-calculated group totals.
   * @param initialized
   * @type {Boolean}
   */
  this.initialized = false;
}

GroupTotals.prototype = new NonDataItem();

/***
 * A locking helper to track the active edit controller and ensure that only a single controller
 * can be active at a time.  This prevents a whole class of state and validation synchronization
 * issues.  An edit controller (such as SlickGrid) can query if an active edit is in progress
 * and attempt a commit or cancel before proceeding.
 * @class EditorLock
 * @constructor
 */
function EditorLock() {
  var activeEditController = null;

  /***
   * Returns true if a specified edit controller is active (has the edit lock).
   * If the parameter is not specified, returns true if any edit controller is active.
   * @method isActive
   * @param editController {EditController}
   * @return {Boolean}
   */
  this.isActive = function (editController) {
    return (editController ? activeEditController === editController : activeEditController !== null);
  };

  /***
   * Sets the specified edit controller as the active edit controller (acquire edit lock).
   * If another edit controller is already active, and exception will be thrown.
   * @method activate
   * @param editController {EditController} edit controller acquiring the lock
   */
  this.activate = function (editController) {
    if (editController === activeEditController) { // already activated?
      return;
    }
    if (activeEditController !== null) {
      throw "SlickGrid.EditorLock.activate: an editController is still active, can't activate another editController";
    }
    if (!editController.commitCurrentEdit) {
      throw "SlickGrid.EditorLock.activate: editController must implement .commitCurrentEdit()";
    }
    if (!editController.cancelCurrentEdit) {
      throw "SlickGrid.EditorLock.activate: editController must implement .cancelCurrentEdit()";
    }
    activeEditController = editController;
  };

  /***
   * Unsets the specified edit controller as the active edit controller (release edit lock).
   * If the specified edit controller is not the active one, an exception will be thrown.
   * @method deactivate
   * @param editController {EditController} edit controller releasing the lock
   */
  this.deactivate = function (editController) {
    if (activeEditController !== editController) {
      throw "SlickGrid.EditorLock.deactivate: specified editController is not the currently active one";
    }
    activeEditController = null;
  };

  /***
   * Attempts to commit the current edit by calling "commitCurrentEdit" method on the active edit
   * controller and returns whether the commit attempt was successful (commit may fail due to validation
   * errors, etc.).  Edit controller's "commitCurrentEdit" must return true if the commit has succeeded
   * and false otherwise.  If no edit controller is active, returns true.
   * @method commitCurrentEdit
   * @return {Boolean}
   */
  this.commitCurrentEdit = function () {
    return (activeEditController ? activeEditController.commitCurrentEdit() : true);
  };

  /***
   * Attempts to cancel the current edit by calling "cancelCurrentEdit" method on the active edit
   * controller and returns whether the edit was successfully cancelled.  If no edit controller is
   * active, returns true.
   * @method cancelCurrentEdit
   * @return {Boolean}
   */
  this.cancelCurrentEdit = function cancelCurrentEdit() {
    return (activeEditController ? activeEditController.cancelCurrentEdit() : true);
  };
}

module.exports = Slick;

},{"jquery":"jquery"}],"slick_grid/slick.grid":[function(require,module,exports){
/**
 * @license
 * (c) 2009-2013 Michael Leibman
 * michael{dot}leibman{at}gmail{dot}com
 * http://github.com/mleibman/slickgrid
 *
 * Distributed under MIT license.
 * All rights reserved.
 *
 * SlickGrid v2.2
 *
 * NOTES:
 *     Cell/row DOM manipulations are done directly bypassing jQuery's DOM manipulation methods.
 *     This increases the speed dramatically, but can only be done safely because there are no event handlers
 *     or data associated with any cell/row DOM nodes.  Cell editors must make sure they implement .destroy()
 *     and do proper cleanup.
 */

var $ = require("jquery");
var $1 = require("jquery_event_drag");
var $2 = require("jquery_event_drop");
var Slick = require("./slick.core");


// shared across all grids on the page
var scrollbarDimensions;
var maxSupportedCssHeight;  // browser's breaking point

//////////////////////////////////////////////////////////////////////////////////////////////
// SlickGrid class implementation (available as Slick.Grid)

/**
 * Creates a new instance of the grid.
 * @class SlickGrid
 * @constructor
 * @param {Node}              container   Container node to create the grid in.
 * @param {Array,Object}      data        An array of objects for databinding.
 * @param {Array}             columns     An array of column definitions.
 * @param {Object}            options     Grid options.
 **/
function SlickGrid(container, data, columns, options) {
  // settings
  var defaults = {
    explicitInitialization: false,
    rowHeight: 25,
    defaultColumnWidth: 80,
    enableAddRow: false,
    leaveSpaceForNewRows: false,
    editable: false,
    autoEdit: true,
    enableCellNavigation: true,
    enableColumnReorder: true,
    asyncEditorLoading: false,
    asyncEditorLoadDelay: 100,
    forceFitColumns: false,
    enableAsyncPostRender: false,
    asyncPostRenderDelay: 50,
    autoHeight: false,
    editorLock: Slick.GlobalEditorLock,
    showHeaderRow: false,
    headerRowHeight: 25,
    showTopPanel: false,
    topPanelHeight: 25,
    formatterFactory: null,
    editorFactory: null,
    cellFlashingCssClass: "flashing",
    selectedCellCssClass: "selected",
    multiSelect: true,
    enableTextSelectionOnCells: false,
    dataItemColumnValueExtractor: null,
    fullWidthRows: false,
    multiColumnSort: false,
    defaultFormatter: defaultFormatter,
    forceSyncScrolling: false,
    addNewRowCssClass: "new-row"
  };

  var columnDefaults = {
    name: "",
    resizable: true,
    sortable: false,
    minWidth: 30,
    rerenderOnResize: false,
    headerCssClass: null,
    defaultSortAsc: true,
    focusable: true,
    selectable: true
  };

  // scroller
  var th;   // virtual height
  var h;    // real scrollable height
  var ph;   // page height
  var n;    // number of pages
  var cj;   // "jumpiness" coefficient

  var page = 0;       // current page
  var offset = 0;     // current page offset
  var vScrollDir = 1;

  // private
  var initialized = false;
  var $container;
  var uid = "slickgrid_" + Math.round(1000000 * Math.random());
  var self = this;
  var $focusSink, $focusSink2;
  var $headerScroller;
  var $headers;
  var $headerRow, $headerRowScroller, $headerRowSpacer;
  var $topPanelScroller;
  var $topPanel;
  var $viewport;
  var $canvas;
  var $style;
  var $boundAncestors;
  var stylesheet, columnCssRulesL, columnCssRulesR;
  var viewportH, viewportW;
  var canvasWidth;
  var viewportHasHScroll, viewportHasVScroll;
  var headerColumnWidthDiff = 0, headerColumnHeightDiff = 0, // border+padding
      cellWidthDiff = 0, cellHeightDiff = 0;
  var absoluteColumnMinWidth;

  var tabbingDirection = 1;
  var activePosX;
  var activeRow, activeCell;
  var activeCellNode = null;
  var currentEditor = null;
  var serializedEditorValue;
  var editController;

  var rowsCache = {};
  var renderedRows = 0;
  var numVisibleRows;
  var prevScrollTop = 0;
  var scrollTop = 0;
  var lastRenderedScrollTop = 0;
  var lastRenderedScrollLeft = 0;
  var prevScrollLeft = 0;
  var scrollLeft = 0;

  var selectionModel;
  var selectedRows = [];

  var plugins = [];
  var cellCssClasses = {};

  var columnsById = {};
  var sortColumns = [];
  var columnPosLeft = [];
  var columnPosRight = [];


  // async call handles
  var h_editorLoader = null;
  var h_render = null;
  var h_postrender = null;
  var postProcessedRows = {};
  var postProcessToRow = null;
  var postProcessFromRow = null;

  // perf counters
  var counter_rows_rendered = 0;
  var counter_rows_removed = 0;

  // These two variables work around a bug with inertial scrolling in Webkit/Blink on Mac.
  // See http://crbug.com/312427.
  var rowNodeFromLastMouseWheelEvent;  // this node must not be deleted while inertial scrolling
  var zombieRowNodeFromLastMouseWheelEvent;  // node that was hidden instead of getting deleted


  //////////////////////////////////////////////////////////////////////////////////////////////
  // Initialization

  function init() {
    $container = $(container);
    if ($container.length < 1) {
      throw new Error("SlickGrid requires a valid container, " + container + " does not exist in the DOM.");
    }

    // calculate these only once and share between grid instances
    maxSupportedCssHeight = maxSupportedCssHeight || getMaxSupportedCssHeight();
    scrollbarDimensions = scrollbarDimensions || measureScrollbar();

    options = $.extend({}, defaults, options);
    validateAndEnforceOptions();
    columnDefaults.width = options.defaultColumnWidth;

    columnsById = {};
    for (var i = 0; i < columns.length; i++) {
      var m = columns[i] = $.extend({}, columnDefaults, columns[i]);
      columnsById[m.id] = i;
      if (m.minWidth && m.width < m.minWidth) {
        m.width = m.minWidth;
      }
      if (m.maxWidth && m.width > m.maxWidth) {
        m.width = m.maxWidth;
      }
    }

    // validate loaded JavaScript modules against requested options
    if (options.enableColumnReorder && !$.fn.sortable) {
      throw new Error("SlickGrid's 'enableColumnReorder = true' option requires jquery-ui.sortable module to be loaded");
    }

    editController = {
      "commitCurrentEdit": commitCurrentEdit,
      "cancelCurrentEdit": cancelCurrentEdit
    };

    $container
        .empty()
        .css("overflow", "hidden")
        .css("outline", 0)
        .addClass(uid)
        .addClass("bk-ui-widget");

    // set up a positioning container if needed
    if (!/relative|absolute|fixed/.test($container.css("position"))) {
      $container.css("position", "relative");
    }

    $focusSink = $("<div tabIndex='0' hideFocus style='position:fixed;width:0;height:0;top:0;left:0;outline:0;'></div>").appendTo($container);

    $headerScroller = $("<div class='bk-slick-header bk-ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($container);
    $headers = $("<div class='bk-slick-header-columns' style='left:-1000px' />").appendTo($headerScroller);
    $headers.width(getHeadersWidth());

    $headerRowScroller = $("<div class='bk-slick-headerrow bk-ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($container);
    $headerRow = $("<div class='bk-slick-headerrow-columns' />").appendTo($headerRowScroller);
    $headerRowSpacer = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
        .css("width", getCanvasWidth() + scrollbarDimensions.width + "px")
        .appendTo($headerRowScroller);

    $topPanelScroller = $("<div class='bk-slick-top-panel-scroller bk-ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($container);
    $topPanel = $("<div class='bk-slick-top-panel' style='width:10000px' />").appendTo($topPanelScroller);

    if (!options.showTopPanel) {
      $topPanelScroller.hide();
    }

    if (!options.showHeaderRow) {
      $headerRowScroller.hide();
    }

    $viewport = $("<div class='bk-slick-viewport' style='width:100%;overflow:auto;outline:0;position:relative;;'>").appendTo($container);
    $viewport.css("overflow-y", options.autoHeight ? "hidden" : "auto");

    $canvas = $("<div class='grid-canvas' />").appendTo($viewport);

    $focusSink2 = $focusSink.clone().appendTo($container);

    if (!options.explicitInitialization) {
      finishInitialization();
    }
  }

  function finishInitialization() {
    if (!initialized) {
      initialized = true;

      viewportW = parseFloat($.css($container[0], "width", true));

      // header columns and cells may have different padding/border skewing width calculations (box-sizing, hello?)
      // calculate the diff so we can set consistent sizes
      measureCellPaddingAndBorder();

      // for usability reasons, all text selection in SlickGrid is disabled
      // with the exception of input and textarea elements (selection must
      // be enabled there so that editors work as expected); note that
      // selection in grid cells (grid body) is already unavailable in
      // all browsers except IE
      disableSelection($headers); // disable all text selection in header (including input and textarea)

      if (!options.enableTextSelectionOnCells) {
        // disable text selection in grid cells except in input and textarea elements
        // (this is IE-specific, because selectstart event will only fire in IE)
        $viewport.bind("selectstart.ui", function (event) {
          return $(event.target).is("input,textarea");
        });
      }

      updateColumnCaches();
      createColumnHeaders();
      setupColumnSort();
      createCssRules();
      resizeCanvas();
      bindAncestorScrollEvents();

      $container
          .bind("resize.bk-slickgrid", resizeCanvas);
      $viewport
          //.bind("click", handleClick)
          .bind("scroll", handleScroll);
      $headerScroller
          .bind("contextmenu", handleHeaderContextMenu)
          .bind("click", handleHeaderClick)
          .delegate(".bk-slick-header-column", "mouseenter", handleHeaderMouseEnter)
          .delegate(".bk-slick-header-column", "mouseleave", handleHeaderMouseLeave);
      $headerRowScroller
          .bind("scroll", handleHeaderRowScroll);
      $focusSink.add($focusSink2)
          .bind("keydown", handleKeyDown);
      $canvas
          .bind("keydown", handleKeyDown)
          .bind("click", handleClick)
          .bind("dblclick", handleDblClick)
          .bind("contextmenu", handleContextMenu)
          .bind("draginit", handleDragInit)
          .bind("dragstart", {distance: 3}, handleDragStart)
          .bind("drag", handleDrag)
          .bind("dragend", handleDragEnd)
          .delegate(".bk-slick-cell", "mouseenter", handleMouseEnter)
          .delegate(".bk-slick-cell", "mouseleave", handleMouseLeave);

      // Work around http://crbug.com/312427.
      if (navigator.userAgent.toLowerCase().match(/webkit/) &&
          navigator.userAgent.toLowerCase().match(/macintosh/)) {
        $canvas.bind("mousewheel", handleMouseWheel);
      }
    }
  }

  function registerPlugin(plugin) {
    plugins.unshift(plugin);
    plugin.init(self);
  }

  function unregisterPlugin(plugin) {
    for (var i = plugins.length; i >= 0; i--) {
      if (plugins[i] === plugin) {
        if (plugins[i].destroy) {
          plugins[i].destroy();
        }
        plugins.splice(i, 1);
        break;
      }
    }
  }

  function setSelectionModel(model) {
    if (selectionModel) {
      selectionModel.onSelectedRangesChanged.unsubscribe(handleSelectedRangesChanged);
      if (selectionModel.destroy) {
        selectionModel.destroy();
      }
    }

    selectionModel = model;
    if (selectionModel) {
      selectionModel.init(self);
      selectionModel.onSelectedRangesChanged.subscribe(handleSelectedRangesChanged);
    }
  }

  function getSelectionModel() {
    return selectionModel;
  }

  function getCanvasNode() {
    return $canvas[0];
  }

  function measureScrollbar() {
    var $c = $("<div style='position:absolute; top:-10000px; left:-10000px; width:100px; height:100px; overflow:scroll;'></div>").appendTo("body");
    var dim = {
      width: $c.width() - $c[0].clientWidth,
      height: $c.height() - $c[0].clientHeight
    };
    $c.remove();
    return dim;
  }

  function getHeadersWidth() {
    var headersWidth = 0;
    for (var i = 0, ii = columns.length; i < ii; i++) {
      var width = columns[i].width;
      headersWidth += width;
    }
    headersWidth += scrollbarDimensions.width;
    return Math.max(headersWidth, viewportW) + 1000;
  }

  function getCanvasWidth() {
    var availableWidth = viewportHasVScroll ? viewportW - scrollbarDimensions.width : viewportW;
    var rowWidth = 0;
    var i = columns.length;
    while (i--) {
      rowWidth += columns[i].width;
    }
    return options.fullWidthRows ? Math.max(rowWidth, availableWidth) : rowWidth;
  }

  function updateCanvasWidth(forceColumnWidthsUpdate) {
    var oldCanvasWidth = canvasWidth;
    canvasWidth = getCanvasWidth();

    if (canvasWidth != oldCanvasWidth) {
      $canvas.width(canvasWidth);
      $headerRow.width(canvasWidth);
      $headers.width(getHeadersWidth());
      viewportHasHScroll = (canvasWidth > viewportW - scrollbarDimensions.width);
    }

    $headerRowSpacer.width(canvasWidth + (viewportHasVScroll ? scrollbarDimensions.width : 0));

    if (canvasWidth != oldCanvasWidth || forceColumnWidthsUpdate) {
      applyColumnWidths();
    }
  }

  function disableSelection($target) {
    if ($target && $target.jquery) {
      $target
          .attr("unselectable", "on")
          .css("MozUserSelect", "none")
          .bind("selectstart.ui", function () {
            return false;
          }); // from jquery:ui.core.js 1.7.2
    }
  }

  function getMaxSupportedCssHeight() {
    var supportedHeight = 1000000;
    // FF reports the height back but still renders blank after ~6M px
    var testUpTo = navigator.userAgent.toLowerCase().match(/firefox/) ? 6000000 : 1000000000;
    var div = $("<div style='display:none' />").appendTo(document.body);

    while (true) {
      var test = supportedHeight * 2;
      div.css("height", test);
      if (test > testUpTo || div.height() !== test) {
        break;
      } else {
        supportedHeight = test;
      }
    }

    div.remove();
    return supportedHeight;
  }

  // TODO:  this is static.  need to handle page mutation.
  function bindAncestorScrollEvents() {
    var elem = $canvas[0];
    while ((elem = elem.parentNode) != document.body && elem != null) {
      // bind to scroll containers only
      if (elem == $viewport[0] || elem.scrollWidth != elem.clientWidth || elem.scrollHeight != elem.clientHeight) {
        var $elem = $(elem);
        if (!$boundAncestors) {
          $boundAncestors = $elem;
        } else {
          $boundAncestors = $boundAncestors.add($elem);
        }
        $elem.bind("scroll." + uid, handleActiveCellPositionChange);
      }
    }
  }

  function unbindAncestorScrollEvents() {
    if (!$boundAncestors) {
      return;
    }
    $boundAncestors.unbind("scroll." + uid);
    $boundAncestors = null;
  }

  function updateColumnHeader(columnId, title, toolTip) {
    if (!initialized) { return; }
    var idx = getColumnIndex(columnId);
    if (idx == null) {
      return;
    }

    var columnDef = columns[idx];
    var $header = $headers.children().eq(idx);
    if ($header) {
      if (title !== undefined) {
        columns[idx].name = title;
      }
      if (toolTip !== undefined) {
        columns[idx].toolTip = toolTip;
      }

      trigger(self.onBeforeHeaderCellDestroy, {
        "node": $header[0],
        "column": columnDef
      });

      $header
          .attr("title", toolTip || "")
          .children().eq(0).html(title);

      trigger(self.onHeaderCellRendered, {
        "node": $header[0],
        "column": columnDef
      });
    }
  }

  function getHeaderRow() {
    return $headerRow[0];
  }

  function getHeaderRowColumn(columnId) {
    var idx = getColumnIndex(columnId);
    var $header = $headerRow.children().eq(idx);
    return $header && $header[0];
  }

  function createColumnHeaders() {
    function onMouseEnter() {
      $(this).addClass("bk-ui-state-hover");
    }

    function onMouseLeave() {
      $(this).removeClass("bk-ui-state-hover");
    }

    $headers.find(".bk-slick-header-column")
      .each(function() {
        var columnDef = $(this).data("column");
        if (columnDef) {
          trigger(self.onBeforeHeaderCellDestroy, {
            "node": this,
            "column": columnDef
          });
        }
      });
    $headers.empty();
    $headers.width(getHeadersWidth());

    $headerRow.find(".bk-slick-headerrow-column")
      .each(function() {
        var columnDef = $(this).data("column");
        if (columnDef) {
          trigger(self.onBeforeHeaderRowCellDestroy, {
            "node": this,
            "column": columnDef
          });
        }
      });
    $headerRow.empty();

    for (var i = 0; i < columns.length; i++) {
      var m = columns[i];

      var header = $("<div class='bk-ui-state-default bk-slick-header-column' />")
          .html("<span class='bk-slick-column-name'>" + m.name + "</span>")
          .width(m.width - headerColumnWidthDiff)
          .attr("id", "" + uid + m.id)
          .attr("title", m.toolTip || "")
          .data("column", m)
          .addClass(m.headerCssClass || "")
          .appendTo($headers);

      if (options.enableColumnReorder || m.sortable) {
        header
          .on('mouseenter', onMouseEnter)
          .on('mouseleave', onMouseLeave);
      }

      if (m.sortable) {
        header.addClass("bk-slick-header-sortable");
        header.append("<span class='bk-slick-sort-indicator' />");
      }

      trigger(self.onHeaderCellRendered, {
        "node": header[0],
        "column": m
      });

      if (options.showHeaderRow) {
        var headerRowCell = $("<div class='bk-ui-state-default bk-slick-headerrow-column l" + i + " r" + i + "'></div>")
            .data("column", m)
            .appendTo($headerRow);

        trigger(self.onHeaderRowCellRendered, {
          "node": headerRowCell[0],
          "column": m
        });
      }
    }

    setSortColumns(sortColumns);
    setupColumnResize();
    if (options.enableColumnReorder) {
      setupColumnReorder();
    }
  }

  function setupColumnSort() {
    $headers.click(function (e) {
      // temporary workaround for a bug in jQuery 1.7.1 (http://bugs.jquery.com/ticket/11328)
      e.metaKey = e.metaKey || e.ctrlKey;

      if ($(e.target).hasClass("bk-slick-resizable-handle")) {
        return;
      }

      var $col = $(e.target).closest(".bk-slick-header-column");
      if (!$col.length) {
        return;
      }

      var column = $col.data("column");
      if (column.sortable) {
        if (!getEditorLock().commitCurrentEdit()) {
          return;
        }

        var sortOpts = null;
        var i = 0;
        for (; i < sortColumns.length; i++) {
          if (sortColumns[i].columnId == column.id) {
            sortOpts = sortColumns[i];
            sortOpts.sortAsc = !sortOpts.sortAsc;
            break;
          }
        }

        if (e.metaKey && options.multiColumnSort) {
          if (sortOpts) {
            sortColumns.splice(i, 1);
          }
        }
        else {
          if ((!e.shiftKey && !e.metaKey) || !options.multiColumnSort) {
            sortColumns = [];
          }

          if (!sortOpts) {
            sortOpts = { columnId: column.id, sortAsc: column.defaultSortAsc };
            sortColumns.push(sortOpts);
          } else if (sortColumns.length == 0) {
            sortColumns.push(sortOpts);
          }
        }

        setSortColumns(sortColumns);

        if (!options.multiColumnSort) {
          trigger(self.onSort, {
            multiColumnSort: false,
            sortCol: column,
            sortAsc: sortOpts.sortAsc}, e);
        } else {
          trigger(self.onSort, {
            multiColumnSort: true,
            sortCols: $.map(sortColumns, function(col) {
              return {sortCol: columns[getColumnIndex(col.columnId)], sortAsc: col.sortAsc };
            })}, e);
        }
      }
    });
  }

  function setupColumnReorder() {
    $headers.filter(":ui-sortable").sortable("destroy");
    $headers.sortable({
      containment: "parent",
      distance: 3,
      axis: "x",
      cursor: "default",
      tolerance: "intersection",
      helper: "clone",
      placeholder: "bk-slick-sortable-placeholder bk-ui-state-default bk-slick-header-column",
      start: function (e, ui) {
        ui.placeholder.width(ui.helper.outerWidth() - headerColumnWidthDiff);
        $(ui.helper).addClass("bk-slick-header-column-active");
      },
      beforeStop: function (e, ui) {
        $(ui.helper).removeClass("bk-slick-header-column-active");
      },
      stop: function (e) {
        if (!getEditorLock().commitCurrentEdit()) {
          $(this).sortable("cancel");
          return;
        }

        var reorderedIds = $headers.sortable("toArray");
        var reorderedColumns = [];
        for (var i = 0; i < reorderedIds.length; i++) {
          reorderedColumns.push(columns[getColumnIndex(reorderedIds[i].replace(uid, ""))]);
        }
        setColumns(reorderedColumns);

        trigger(self.onColumnsReordered, {});
        e.stopPropagation();
        setupColumnResize();
      }
    });
  }

  function setupColumnResize() {
    var $col, j, c, pageX, columnElements, minPageX, maxPageX, firstResizable, lastResizable;
    columnElements = $headers.children();
    columnElements.find(".bk-slick-resizable-handle").remove();
    columnElements.each(function (i, e) {
      if (columns[i].resizable) {
        if (firstResizable === undefined) {
          firstResizable = i;
        }
        lastResizable = i;
      }
    });
    if (firstResizable === undefined) {
      return;
    }
    columnElements.each(function (i, e) {
      if (i < firstResizable || (options.forceFitColumns && i >= lastResizable)) {
        return;
      }
      $col = $(e);
      $("<div class='bk-slick-resizable-handle' />")
          .appendTo(e)
          .bind("dragstart", function (e, dd) {
            if (!getEditorLock().commitCurrentEdit()) {
              return false;
            }
            pageX = e.pageX;
            $(this).parent().addClass("bk-slick-header-column-active");
            var shrinkLeewayOnRight = null, stretchLeewayOnRight = null;
            // lock each column's width option to current width
            columnElements.each(function (i, e) {
              columns[i].previousWidth = $(e).outerWidth();
            });
            if (options.forceFitColumns) {
              shrinkLeewayOnRight = 0;
              stretchLeewayOnRight = 0;
              // colums on right affect maxPageX/minPageX
              for (j = i + 1; j < columnElements.length; j++) {
                c = columns[j];
                if (c.resizable) {
                  if (stretchLeewayOnRight !== null) {
                    if (c.maxWidth) {
                      stretchLeewayOnRight += c.maxWidth - c.previousWidth;
                    } else {
                      stretchLeewayOnRight = null;
                    }
                  }
                  shrinkLeewayOnRight += c.previousWidth - Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                }
              }
            }
            var shrinkLeewayOnLeft = 0, stretchLeewayOnLeft = 0;
            for (j = 0; j <= i; j++) {
              // columns on left only affect minPageX
              c = columns[j];
              if (c.resizable) {
                if (stretchLeewayOnLeft !== null) {
                  if (c.maxWidth) {
                    stretchLeewayOnLeft += c.maxWidth - c.previousWidth;
                  } else {
                    stretchLeewayOnLeft = null;
                  }
                }
                shrinkLeewayOnLeft += c.previousWidth - Math.max(c.minWidth || 0, absoluteColumnMinWidth);
              }
            }
            if (shrinkLeewayOnRight === null) {
              shrinkLeewayOnRight = 100000;
            }
            if (shrinkLeewayOnLeft === null) {
              shrinkLeewayOnLeft = 100000;
            }
            if (stretchLeewayOnRight === null) {
              stretchLeewayOnRight = 100000;
            }
            if (stretchLeewayOnLeft === null) {
              stretchLeewayOnLeft = 100000;
            }
            maxPageX = pageX + Math.min(shrinkLeewayOnRight, stretchLeewayOnLeft);
            minPageX = pageX - Math.min(shrinkLeewayOnLeft, stretchLeewayOnRight);
          })
          .bind("drag", function (e, dd) {
            var actualMinWidth, d = Math.min(maxPageX, Math.max(minPageX, e.pageX)) - pageX, x;
            if (d < 0) { // shrink column
              x = d;
              for (j = i; j >= 0; j--) {
                c = columns[j];
                if (c.resizable) {
                  actualMinWidth = Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                  if (x && c.previousWidth + x < actualMinWidth) {
                    x += c.previousWidth - actualMinWidth;
                    c.width = actualMinWidth;
                  } else {
                    c.width = c.previousWidth + x;
                    x = 0;
                  }
                }
              }

              if (options.forceFitColumns) {
                x = -d;
                for (j = i + 1; j < columnElements.length; j++) {
                  c = columns[j];
                  if (c.resizable) {
                    if (x && c.maxWidth && (c.maxWidth - c.previousWidth < x)) {
                      x -= c.maxWidth - c.previousWidth;
                      c.width = c.maxWidth;
                    } else {
                      c.width = c.previousWidth + x;
                      x = 0;
                    }
                  }
                }
              }
            } else { // stretch column
              x = d;
              for (j = i; j >= 0; j--) {
                c = columns[j];
                if (c.resizable) {
                  if (x && c.maxWidth && (c.maxWidth - c.previousWidth < x)) {
                    x -= c.maxWidth - c.previousWidth;
                    c.width = c.maxWidth;
                  } else {
                    c.width = c.previousWidth + x;
                    x = 0;
                  }
                }
              }

              if (options.forceFitColumns) {
                x = -d;
                for (j = i + 1; j < columnElements.length; j++) {
                  c = columns[j];
                  if (c.resizable) {
                    actualMinWidth = Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                    if (x && c.previousWidth + x < actualMinWidth) {
                      x += c.previousWidth - actualMinWidth;
                      c.width = actualMinWidth;
                    } else {
                      c.width = c.previousWidth + x;
                      x = 0;
                    }
                  }
                }
              }
            }
            applyColumnHeaderWidths();
            if (options.syncColumnCellResize) {
              applyColumnWidths();
            }
          })
          .bind("dragend", function (e, dd) {
            var newWidth;
            $(this).parent().removeClass("bk-slick-header-column-active");
            for (j = 0; j < columnElements.length; j++) {
              c = columns[j];
              newWidth = $(columnElements[j]).outerWidth();

              if (c.previousWidth !== newWidth && c.rerenderOnResize) {
                invalidateAllRows();
              }
            }
            updateCanvasWidth(true);
            render();
            trigger(self.onColumnsResized, {});
          });
    });
  }

  function getVBoxDelta($el) {
    var p = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"];
    var delta = 0;
    $.each(p, function (n, val) {
      delta += parseFloat($el.css(val)) || 0;
    });
    return delta;
  }

  function measureCellPaddingAndBorder() {
    var el;
    var h = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"];
    var v = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"];

    el = $("<div class='bk-ui-state-default bk-slick-header-column' style='visibility:hidden'>-</div>").appendTo($headers);
    headerColumnWidthDiff = headerColumnHeightDiff = 0;
    if (el.css("box-sizing") != "border-box" && el.css("-moz-box-sizing") != "border-box" && el.css("-webkit-box-sizing") != "border-box") {
      $.each(h, function (n, val) {
        headerColumnWidthDiff += parseFloat(el.css(val)) || 0;
      });
      $.each(v, function (n, val) {
        headerColumnHeightDiff += parseFloat(el.css(val)) || 0;
      });
    }
    el.remove();

    var r = $("<div class='bk-slick-row' />").appendTo($canvas);
    el = $("<div class='bk-slick-cell' id='' style='visibility:hidden'>-</div>").appendTo(r);
    cellWidthDiff = cellHeightDiff = 0;
    if (el.css("box-sizing") != "border-box" && el.css("-moz-box-sizing") != "border-box" && el.css("-webkit-box-sizing") != "border-box") {
      $.each(h, function (n, val) {
        cellWidthDiff += parseFloat(el.css(val)) || 0;
      });
      $.each(v, function (n, val) {
        cellHeightDiff += parseFloat(el.css(val)) || 0;
      });
    }
    r.remove();

    absoluteColumnMinWidth = Math.max(headerColumnWidthDiff, cellWidthDiff);
  }

  function createCssRules() {
    $style = $("<style type='text/css' rel='stylesheet' />").appendTo($("head"));
    var rowHeight = (options.rowHeight - cellHeightDiff);
    var rules = [
      "." + uid + " .bk-slick-header-column { left: 1000px; }",
      "." + uid + " .bk-slick-top-panel { height:" + options.topPanelHeight + "px; }",
      "." + uid + " .bk-slick-headerrow-columns { height:" + options.headerRowHeight + "px; }",
      "." + uid + " .bk-slick-cell { height:" + rowHeight + "px; }",
      "." + uid + " .bk-slick-row { height:" + options.rowHeight + "px; }"
    ];

    for (var i = 0; i < columns.length; i++) {
      rules.push("." + uid + " .l" + i + " { }");
      rules.push("." + uid + " .r" + i + " { }");
    }

    if ($style[0].styleSheet) { // IE
      $style[0].styleSheet.cssText = rules.join(" ");
    } else {
      $style[0].appendChild(document.createTextNode(rules.join(" ")));
    }
  }

  function getColumnCssRules(idx) {
    if (!stylesheet) {
      var sheets = document.styleSheets;
      for (var i = 0; i < sheets.length; i++) {
        if ((sheets[i].ownerNode || sheets[i].owningElement) == $style[0]) {
          stylesheet = sheets[i];
          break;
        }
      }

      if (!stylesheet) {
        throw new Error("Cannot find stylesheet.");
      }

      // find and cache column CSS rules
      columnCssRulesL = [];
      columnCssRulesR = [];
      var cssRules = (stylesheet.cssRules || stylesheet.rules);
      var matches, columnIdx;
      for (var i = 0; i < cssRules.length; i++) {
        var selector = cssRules[i].selectorText;
        if (matches = /\.l\d+/.exec(selector)) {
          columnIdx = parseInt(matches[0].substr(2, matches[0].length - 2), 10);
          columnCssRulesL[columnIdx] = cssRules[i];
        } else if (matches = /\.r\d+/.exec(selector)) {
          columnIdx = parseInt(matches[0].substr(2, matches[0].length - 2), 10);
          columnCssRulesR[columnIdx] = cssRules[i];
        }
      }
    }

    return {
      "left": columnCssRulesL[idx],
      "right": columnCssRulesR[idx]
    };
  }

  function removeCssRules() {
    $style.remove();
    stylesheet = null;
  }

  function destroy() {
    getEditorLock().cancelCurrentEdit();

    trigger(self.onBeforeDestroy, {});

    var i = plugins.length;
    while(i--) {
      unregisterPlugin(plugins[i]);
    }

    if (options.enableColumnReorder) {
        $headers.filter(":ui-sortable").sortable("destroy");
    }

    unbindAncestorScrollEvents();
    $container.unbind(".bk-slickgrid");
    removeCssRules();

    $canvas.unbind("draginit dragstart dragend drag");
    $container.empty().removeClass(uid);
  }


  //////////////////////////////////////////////////////////////////////////////////////////////
  // General

  function trigger(evt, args, e) {
    e = e || new Slick.EventData();
    args = args || {};
    args.grid = self;
    return evt.notify(args, e, self);
  }

  function getEditorLock() {
    return options.editorLock;
  }

  function getEditController() {
    return editController;
  }

  function getColumnIndex(id) {
    return columnsById[id];
  }

  function autosizeColumns() {
    var i, c,
        widths = [],
        shrinkLeeway = 0,
        total = 0,
        prevTotal,
        availWidth = viewportHasVScroll ? viewportW - scrollbarDimensions.width : viewportW;

    for (i = 0; i < columns.length; i++) {
      c = columns[i];
      widths.push(c.width);
      total += c.width;
      if (c.resizable) {
        shrinkLeeway += c.width - Math.max(c.minWidth, absoluteColumnMinWidth);
      }
    }

    // shrink
    prevTotal = total;
    while (total > availWidth && shrinkLeeway) {
      var shrinkProportion = (total - availWidth) / shrinkLeeway;
      for (i = 0; i < columns.length && total > availWidth; i++) {
        c = columns[i];
        var width = widths[i];
        if (!c.resizable || width <= c.minWidth || width <= absoluteColumnMinWidth) {
          continue;
        }
        var absMinWidth = Math.max(c.minWidth, absoluteColumnMinWidth);
        var shrinkSize = Math.floor(shrinkProportion * (width - absMinWidth)) || 1;
        shrinkSize = Math.min(shrinkSize, width - absMinWidth);
        total -= shrinkSize;
        shrinkLeeway -= shrinkSize;
        widths[i] -= shrinkSize;
      }
      if (prevTotal <= total) {  // avoid infinite loop
        break;
      }
      prevTotal = total;
    }

    // grow
    prevTotal = total;
    while (total < availWidth) {
      var growProportion = availWidth / total;
      for (i = 0; i < columns.length && total < availWidth; i++) {
        c = columns[i];
        var currentWidth = widths[i];
        var growSize;

        if (!c.resizable || c.maxWidth <= currentWidth) {
          growSize = 0;
        } else {
          growSize = Math.min(Math.floor(growProportion * currentWidth) - currentWidth, (c.maxWidth - currentWidth) || 1000000) || 1;
        }
        total += growSize;
        widths[i] += growSize;
      }
      if (prevTotal >= total) {  // avoid infinite loop
        break;
      }
      prevTotal = total;
    }

    var reRender = false;
    for (i = 0; i < columns.length; i++) {
      if (columns[i].rerenderOnResize && columns[i].width != widths[i]) {
        reRender = true;
      }
      columns[i].width = widths[i];
    }

    applyColumnHeaderWidths();
    updateCanvasWidth(true);
    if (reRender) {
      invalidateAllRows();
      render();
    }
  }

  function applyColumnHeaderWidths() {
    if (!initialized) { return; }
    var h;
    for (var i = 0, headers = $headers.children(), ii = headers.length; i < ii; i++) {
      h = $(headers[i]);
      if (h.width() !== columns[i].width - headerColumnWidthDiff) {
        h.width(columns[i].width - headerColumnWidthDiff);
      }
    }

    updateColumnCaches();
  }

  function applyColumnWidths() {
    var x = 0, w, rule;
    for (var i = 0; i < columns.length; i++) {
      w = columns[i].width;

      rule = getColumnCssRules(i);
      rule.left.style.left = x + "px";
      rule.right.style.right = (canvasWidth - x - w) + "px";

      x += columns[i].width;
    }
  }

  function setSortColumn(columnId, ascending) {
    setSortColumns([{ columnId: columnId, sortAsc: ascending}]);
  }

  function setSortColumns(cols) {
    sortColumns = cols;

    var headerColumnEls = $headers.children();
    headerColumnEls
        .removeClass("bk-slick-header-column-sorted")
        .find(".bk-slick-sort-indicator")
            .removeClass("bk-slick-sort-indicator-asc bk-slick-sort-indicator-desc");

    $.each(sortColumns, function(i, col) {
      if (col.sortAsc == null) {
        col.sortAsc = true;
      }
      var columnIndex = getColumnIndex(col.columnId);
      if (columnIndex != null) {
        headerColumnEls.eq(columnIndex)
            .addClass("bk-slick-header-column-sorted")
            .find(".bk-slick-sort-indicator")
                .addClass(col.sortAsc ? "bk-slick-sort-indicator-asc" : "bk-slick-sort-indicator-desc");
      }
    });
  }

  function getSortColumns() {
    return sortColumns;
  }

  function handleSelectedRangesChanged(e, ranges) {
    selectedRows = [];
    var hash = {};
    for (var i = 0; i < ranges.length; i++) {
      for (var j = ranges[i].fromRow; j <= ranges[i].toRow; j++) {
        if (!hash[j]) {  // prevent duplicates
          selectedRows.push(j);
          hash[j] = {};
        }
        for (var k = ranges[i].fromCell; k <= ranges[i].toCell; k++) {
          if (canCellBeSelected(j, k)) {
            hash[j][columns[k].id] = options.selectedCellCssClass;
          }
        }
      }
    }

    setCellCssStyles(options.selectedCellCssClass, hash);

    trigger(self.onSelectedRowsChanged, {rows: getSelectedRows()}, e);
  }

  function getColumns() {
    return columns;
  }

  function updateColumnCaches() {
    // Pre-calculate cell boundaries.
    columnPosLeft = [];
    columnPosRight = [];
    var x = 0;
    for (var i = 0, ii = columns.length; i < ii; i++) {
      columnPosLeft[i] = x;
      columnPosRight[i] = x + columns[i].width;
      x += columns[i].width;
    }
  }

  function setColumns(columnDefinitions) {
    columns = columnDefinitions;

    columnsById = {};
    for (var i = 0; i < columns.length; i++) {
      var m = columns[i] = $.extend({}, columnDefaults, columns[i]);
      columnsById[m.id] = i;
      if (m.minWidth && m.width < m.minWidth) {
        m.width = m.minWidth;
      }
      if (m.maxWidth && m.width > m.maxWidth) {
        m.width = m.maxWidth;
      }
    }

    updateColumnCaches();

    if (initialized) {
      invalidateAllRows();
      createColumnHeaders();
      removeCssRules();
      createCssRules();
      resizeCanvas();
      applyColumnWidths();
      handleScroll();
    }
  }

  function getOptions() {
    return options;
  }

  function setOptions(args) {
    if (!getEditorLock().commitCurrentEdit()) {
      return;
    }

    makeActiveCellNormal();

    if (options.enableAddRow !== args.enableAddRow) {
      invalidateRow(getDataLength());
    }

    options = $.extend(options, args);
    validateAndEnforceOptions();

    $viewport.css("overflow-y", options.autoHeight ? "hidden" : "auto");
    render();
  }

  function validateAndEnforceOptions() {
    if (options.autoHeight) {
      options.leaveSpaceForNewRows = false;
    }
  }

  function setData(newData, scrollToTop) {
    data = newData;
    invalidateAllRows();
    updateRowCount();
    if (scrollToTop) {
      scrollTo(0);
    }
  }

  function getData() {
    return data;
  }

  function getDataLength() {
    if (data.getLength) {
      return data.getLength();
    } else {
      return data.length;
    }
  }

  function getDataLengthIncludingAddNew() {
    return getDataLength() + (options.enableAddRow ? 1 : 0);
  }

  function getDataItem(i) {
    if (data.getItem) {
      return data.getItem(i);
    } else {
      return data[i];
    }
  }

  function getTopPanel() {
    return $topPanel[0];
  }

  function setTopPanelVisibility(visible) {
    if (options.showTopPanel != visible) {
      options.showTopPanel = visible;
      if (visible) {
        $topPanelScroller.slideDown("fast", resizeCanvas);
      } else {
        $topPanelScroller.slideUp("fast", resizeCanvas);
      }
    }
  }

  function setHeaderRowVisibility(visible) {
    if (options.showHeaderRow != visible) {
      options.showHeaderRow = visible;
      if (visible) {
        $headerRowScroller.slideDown("fast", resizeCanvas);
      } else {
        $headerRowScroller.slideUp("fast", resizeCanvas);
      }
    }
  }

  function getContainerNode() {
    return $container.get(0);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  // Rendering / Scrolling

  function getRowTop(row) {
    return options.rowHeight * row - offset;
  }

  function getRowFromPosition(y) {
    return Math.floor((y + offset) / options.rowHeight);
  }

  function scrollTo(y) {
    y = Math.max(y, 0);
    y = Math.min(y, th - viewportH + (viewportHasHScroll ? scrollbarDimensions.height : 0));

    var oldOffset = offset;

    page = Math.min(n - 1, Math.floor(y / ph));
    offset = Math.round(page * cj);
    var newScrollTop = y - offset;

    if (offset != oldOffset) {
      var range = getVisibleRange(newScrollTop);
      cleanupRows(range);
      updateRowPositions();
    }

    if (prevScrollTop != newScrollTop) {
      vScrollDir = (prevScrollTop + oldOffset < newScrollTop + offset) ? 1 : -1;
      $viewport[0].scrollTop = (lastRenderedScrollTop = scrollTop = prevScrollTop = newScrollTop);

      trigger(self.onViewportChanged, {});
    }
  }

  function defaultFormatter(row, cell, value, columnDef, dataContext) {
    if (value == null) {
      return "";
    } else {
      return (value + "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    }
  }

  function getFormatter(row, column) {
    var rowMetadata = data.getItemMetadata && data.getItemMetadata(row);

    // look up by id, then index
    var columnOverrides = rowMetadata &&
        rowMetadata.columns &&
        (rowMetadata.columns[column.id] || rowMetadata.columns[getColumnIndex(column.id)]);

    var formatter =
        (columnOverrides && columnOverrides.formatter) ||
        (rowMetadata && rowMetadata.formatter) ||
        column.formatter ||
        (options.formatterFactory && options.formatterFactory.getFormatter(column)) ||
        options.defaultFormatter;

    if (formatter.format !== undefined) {
      var model = formatter;
      var format = function foo(row, cell, value, columnDef, dataContext) {
        return model.format(row, cell, value, columnDef, dataContext);
      }
      formatter = format
    }

    return formatter;
  }

  function getEditor(row, cell) {
    var editor;
    var column = columns[cell];
    var rowMetadata = data.getItemMetadata && data.getItemMetadata(row);
    var columnMetadata = rowMetadata && rowMetadata.columns;

    if (columnMetadata && columnMetadata[column.id] && columnMetadata[column.id].editor !== undefined) {
      editor = columnMetadata[column.id].editor;
    } else if (columnMetadata && columnMetadata[cell] && columnMetadata[cell].editor !== undefined) {
      editor = columnMetadata[cell].editor;
    } else {
      editor = column.editor || (options.editorFactory && options.editorFactory.getEditor(column));
    }

    if (editor.default_view !== undefined) {
      editor = editor.default_view;
    }

    return editor;
  }

  function getDataItemValueForColumn(item, columnDef) {
    if (options.dataItemColumnValueExtractor) {
      return options.dataItemColumnValueExtractor(item, columnDef);
    }
    return item[columnDef.field];
  }

  function appendRowHtml(stringArray, row, range, dataLength) {
    var d = getDataItem(row);
    var dataLoading = row < dataLength && !d;
    var rowCss = "bk-slick-row" +
        (dataLoading ? " loading" : "") +
        (row === activeRow ? " active" : "") +
        (row % 2 == 1 ? " odd" : " even");

    if (!d) {
      rowCss += " " + options.addNewRowCssClass;
    }

    var metadata = data.getItemMetadata && data.getItemMetadata(row);

    if (metadata && metadata.cssClasses) {
      rowCss += " " + metadata.cssClasses;
    }

    stringArray.push("<div class='bk-ui-widget-content " + rowCss + "' style='top:" + getRowTop(row) + "px'>");

    var colspan, m;
    for (var i = 0, ii = columns.length; i < ii; i++) {
      m = columns[i];
      colspan = 1;
      if (metadata && metadata.columns) {
        var columnData = metadata.columns[m.id] || metadata.columns[i];
        colspan = (columnData && columnData.colspan) || 1;
        if (colspan === "*") {
          colspan = ii - i;
        }
      }

      // Do not render cells outside of the viewport.
      if (columnPosRight[Math.min(ii - 1, i + colspan - 1)] > range.leftPx) {
        if (columnPosLeft[i] > range.rightPx) {
          // All columns to the right are outside the range.
          break;
        }

        appendCellHtml(stringArray, row, i, colspan, d);
      }

      if (colspan > 1) {
        i += (colspan - 1);
      }
    }

    stringArray.push("</div>");
  }

  function appendCellHtml(stringArray, row, cell, colspan, item) {
    var m = columns[cell];
    var cellCss = "bk-slick-cell l" + cell + " r" + Math.min(columns.length - 1, cell + colspan - 1) +
        (m.cssClass ? " " + m.cssClass : "");
    if (row === activeRow && cell === activeCell) {
      cellCss += (" active");
    }

    // TODO:  merge them together in the setter
    for (var key in cellCssClasses) {
      if (cellCssClasses[key][row] && cellCssClasses[key][row][m.id]) {
        cellCss += (" " + cellCssClasses[key][row][m.id]);
      }
    }

    stringArray.push("<div class='" + cellCss + "'>");

    // if there is a corresponding row (if not, this is the Add New row or this data hasn't been loaded yet)
    if (item) {
      var value = getDataItemValueForColumn(item, m);
      stringArray.push(getFormatter(row, m)(row, cell, value, m, item));
    }

    stringArray.push("</div>");

    rowsCache[row].cellRenderQueue.push(cell);
    rowsCache[row].cellColSpans[cell] = colspan;
  }


  function cleanupRows(rangeToKeep) {
    for (var i in rowsCache) {
      if (((i = parseInt(i, 10)) !== activeRow) && (i < rangeToKeep.top || i > rangeToKeep.bottom)) {
        removeRowFromCache(i);
      }
    }
  }

  function invalidate() {
    updateRowCount();
    invalidateAllRows();
    render();
  }

  function invalidateAllRows() {
    if (currentEditor) {
      makeActiveCellNormal();
    }
    for (var row in rowsCache) {
      removeRowFromCache(row);
    }
  }

  function removeRowFromCache(row) {
    var cacheEntry = rowsCache[row];
    if (!cacheEntry) {
      return;
    }

    if (rowNodeFromLastMouseWheelEvent == cacheEntry.rowNode) {
      cacheEntry.rowNode.style.display = 'none';
      zombieRowNodeFromLastMouseWheelEvent = rowNodeFromLastMouseWheelEvent;
    } else {
      $canvas[0].removeChild(cacheEntry.rowNode);
    }

    delete rowsCache[row];
    delete postProcessedRows[row];
    renderedRows--;
    counter_rows_removed++;
  }

  function invalidateRows(rows) {
    var i, rl;
    if (!rows || !rows.length) {
      return;
    }
    vScrollDir = 0;
    for (i = 0, rl = rows.length; i < rl; i++) {
      if (currentEditor && activeRow === rows[i]) {
        makeActiveCellNormal();
      }
      if (rowsCache[rows[i]]) {
        removeRowFromCache(rows[i]);
      }
    }
  }

  function invalidateRow(row) {
    invalidateRows([row]);
  }

  function updateCell(row, cell) {
    var cellNode = getCellNode(row, cell);
    if (!cellNode) {
      return;
    }

    var m = columns[cell], d = getDataItem(row);
    if (currentEditor && activeRow === row && activeCell === cell) {
      currentEditor.loadValue(d);
    } else {
      cellNode.innerHTML = d ? getFormatter(row, m)(row, cell, getDataItemValueForColumn(d, m), m, d) : "";
      invalidatePostProcessingResults(row);
    }
  }

  function updateRow(row) {
    var cacheEntry = rowsCache[row];
    if (!cacheEntry) {
      return;
    }

    ensureCellNodesInRowsCache(row);

    var d = getDataItem(row);

    for (var columnIdx in cacheEntry.cellNodesByColumnIdx) {
      if (!cacheEntry.cellNodesByColumnIdx.hasOwnProperty(columnIdx)) {
        continue;
      }

      columnIdx = columnIdx | 0;
      var m = columns[columnIdx],
          node = cacheEntry.cellNodesByColumnIdx[columnIdx];

      if (row === activeRow && columnIdx === activeCell && currentEditor) {
        currentEditor.loadValue(d);
      } else if (d) {
        node.innerHTML = getFormatter(row, m)(row, columnIdx, getDataItemValueForColumn(d, m), m, d);
      } else {
        node.innerHTML = "";
      }
    }

    invalidatePostProcessingResults(row);
  }

  function getViewportHeight() {
    return parseFloat($.css($container[0], "height", true)) -
        parseFloat($.css($container[0], "paddingTop", true)) -
        parseFloat($.css($container[0], "paddingBottom", true)) -
        parseFloat($.css($headerScroller[0], "height")) - getVBoxDelta($headerScroller) -
        (options.showTopPanel ? options.topPanelHeight + getVBoxDelta($topPanelScroller) : 0) -
        (options.showHeaderRow ? options.headerRowHeight + getVBoxDelta($headerRowScroller) : 0);
  }

  function resizeCanvas() {
    if (!initialized) { return; }
    if (options.autoHeight) {
      viewportH = options.rowHeight * getDataLengthIncludingAddNew();
    } else {
      viewportH = getViewportHeight();
    }

    numVisibleRows = Math.ceil(viewportH / options.rowHeight);
    viewportW = parseFloat($.css($container[0], "width", true));
    if (!options.autoHeight) {
      $viewport.height(viewportH);
    }

    if (options.forceFitColumns) {
      autosizeColumns();
    }

    updateRowCount();
    handleScroll();
    // Since the width has changed, force the render() to reevaluate virtually rendered cells.
    lastRenderedScrollLeft = -1;
    render();
  }

  function updateRowCount() {
    if (!initialized) { return; }

    var dataLengthIncludingAddNew = getDataLengthIncludingAddNew();
    var numberOfRows = dataLengthIncludingAddNew +
        (options.leaveSpaceForNewRows ? numVisibleRows - 1 : 0);

    var oldViewportHasVScroll = viewportHasVScroll;
    // with autoHeight, we do not need to accommodate the vertical scroll bar
    viewportHasVScroll = !options.autoHeight && (numberOfRows * options.rowHeight > viewportH);

    makeActiveCellNormal();

    // remove the rows that are now outside of the data range
    // this helps avoid redundant calls to .removeRow() when the size of the data decreased by thousands of rows
    var l = dataLengthIncludingAddNew - 1;
    for (var i in rowsCache) {
      if (i >= l) {
        removeRowFromCache(i);
      }
    }

    if (activeCellNode && activeRow > l) {
      resetActiveCell();
    }

    var oldH = h;
    th = Math.max(options.rowHeight * numberOfRows, viewportH - scrollbarDimensions.height);
    if (th < maxSupportedCssHeight) {
      // just one page
      h = ph = th;
      n = 1;
      cj = 0;
    } else {
      // break into pages
      h = maxSupportedCssHeight;
      ph = h / 100;
      n = Math.floor(th / ph);
      cj = (th - h) / (n - 1);
    }

    if (h !== oldH) {
      $canvas.css("height", h);
      scrollTop = $viewport[0].scrollTop;
    }

    var oldScrollTopInRange = (scrollTop + offset <= th - viewportH);

    if (th == 0 || scrollTop == 0) {
      page = offset = 0;
    } else if (oldScrollTopInRange) {
      // maintain virtual position
      scrollTo(scrollTop + offset);
    } else {
      // scroll to bottom
      scrollTo(th - viewportH);
    }

    if (h != oldH && options.autoHeight) {
      resizeCanvas();
    }

    if (options.forceFitColumns && oldViewportHasVScroll != viewportHasVScroll) {
      autosizeColumns();
    }
    updateCanvasWidth(false);
  }

  function getVisibleRange(viewportTop, viewportLeft) {
    if (viewportTop == null) {
      viewportTop = scrollTop;
    }
    if (viewportLeft == null) {
      viewportLeft = scrollLeft;
    }

    return {
      top: getRowFromPosition(viewportTop),
      bottom: getRowFromPosition(viewportTop + viewportH) + 1,
      leftPx: viewportLeft,
      rightPx: viewportLeft + viewportW
    };
  }

  function getRenderedRange(viewportTop, viewportLeft) {
    var range = getVisibleRange(viewportTop, viewportLeft);
    var buffer = Math.round(viewportH / options.rowHeight);
    var minBuffer = 3;

    if (vScrollDir == -1) {
      range.top -= buffer;
      range.bottom += minBuffer;
    } else if (vScrollDir == 1) {
      range.top -= minBuffer;
      range.bottom += buffer;
    } else {
      range.top -= minBuffer;
      range.bottom += minBuffer;
    }

    range.top = Math.max(0, range.top);
    range.bottom = Math.min(getDataLengthIncludingAddNew() - 1, range.bottom);

    range.leftPx -= viewportW;
    range.rightPx += viewportW;

    range.leftPx = Math.max(0, range.leftPx);
    range.rightPx = Math.min(canvasWidth, range.rightPx);

    return range;
  }

  function ensureCellNodesInRowsCache(row) {
    var cacheEntry = rowsCache[row];
    if (cacheEntry) {
      if (cacheEntry.cellRenderQueue.length) {
        var lastChild = cacheEntry.rowNode.lastChild;
        while (cacheEntry.cellRenderQueue.length) {
          var columnIdx = cacheEntry.cellRenderQueue.pop();
          cacheEntry.cellNodesByColumnIdx[columnIdx] = lastChild;
          lastChild = lastChild.previousSibling;
        }
      }
    }
  }

  function cleanUpCells(range, row) {
    var totalCellsRemoved = 0;
    var cacheEntry = rowsCache[row];

    // Remove cells outside the range.
    var cellsToRemove = [];
    for (var i in cacheEntry.cellNodesByColumnIdx) {
      // I really hate it when people mess with Array.prototype.
      if (!cacheEntry.cellNodesByColumnIdx.hasOwnProperty(i)) {
        continue;
      }

      // This is a string, so it needs to be cast back to a number.
      i = i | 0;

      var colspan = cacheEntry.cellColSpans[i];
      if (columnPosLeft[i] > range.rightPx ||
        columnPosRight[Math.min(columns.length - 1, i + colspan - 1)] < range.leftPx) {
        if (!(row == activeRow && i == activeCell)) {
          cellsToRemove.push(i);
        }
      }
    }

    var cellToRemove;
    while ((cellToRemove = cellsToRemove.pop()) != null) {
      cacheEntry.rowNode.removeChild(cacheEntry.cellNodesByColumnIdx[cellToRemove]);
      delete cacheEntry.cellColSpans[cellToRemove];
      delete cacheEntry.cellNodesByColumnIdx[cellToRemove];
      if (postProcessedRows[row]) {
        delete postProcessedRows[row][cellToRemove];
      }
      totalCellsRemoved++;
    }
  }

  function cleanUpAndRenderCells(range) {
    var cacheEntry;
    var stringArray = [];
    var processedRows = [];
    var cellsAdded;
    var totalCellsAdded = 0;
    var colspan;

    for (var row = range.top, btm = range.bottom; row <= btm; row++) {
      cacheEntry = rowsCache[row];
      if (!cacheEntry) {
        continue;
      }

      // cellRenderQueue populated in renderRows() needs to be cleared first
      ensureCellNodesInRowsCache(row);

      cleanUpCells(range, row);

      // Render missing cells.
      cellsAdded = 0;

      var metadata = data.getItemMetadata && data.getItemMetadata(row);
      metadata = metadata && metadata.columns;

      var d = getDataItem(row);

      // TODO:  shorten this loop (index? heuristics? binary search?)
      for (var i = 0, ii = columns.length; i < ii; i++) {
        // Cells to the right are outside the range.
        if (columnPosLeft[i] > range.rightPx) {
          break;
        }

        // Already rendered.
        if ((colspan = cacheEntry.cellColSpans[i]) != null) {
          i += (colspan > 1 ? colspan - 1 : 0);
          continue;
        }

        colspan = 1;
        if (metadata) {
          var columnData = metadata[columns[i].id] || metadata[i];
          colspan = (columnData && columnData.colspan) || 1;
          if (colspan === "*") {
            colspan = ii - i;
          }
        }

        if (columnPosRight[Math.min(ii - 1, i + colspan - 1)] > range.leftPx) {
          appendCellHtml(stringArray, row, i, colspan, d);
          cellsAdded++;
        }

        i += (colspan > 1 ? colspan - 1 : 0);
      }

      if (cellsAdded) {
        totalCellsAdded += cellsAdded;
        processedRows.push(row);
      }
    }

    if (!stringArray.length) {
      return;
    }

    var x = document.createElement("div");
    x.innerHTML = stringArray.join("");

    var processedRow;
    var node;
    while ((processedRow = processedRows.pop()) != null) {
      cacheEntry = rowsCache[processedRow];
      var columnIdx;
      while ((columnIdx = cacheEntry.cellRenderQueue.pop()) != null) {
        node = x.lastChild;
        cacheEntry.rowNode.appendChild(node);
        cacheEntry.cellNodesByColumnIdx[columnIdx] = node;
      }
    }
  }

  function renderRows(range) {
    var parentNode = $canvas[0],
        stringArray = [],
        rows = [],
        needToReselectCell = false,
        dataLength = getDataLength();

    for (var i = range.top, ii = range.bottom; i <= ii; i++) {
      if (rowsCache[i]) {
        continue;
      }
      renderedRows++;
      rows.push(i);

      // Create an entry right away so that appendRowHtml() can
      // start populatating it.
      rowsCache[i] = {
        "rowNode": null,

        // ColSpans of rendered cells (by column idx).
        // Can also be used for checking whether a cell has been rendered.
        "cellColSpans": [],

        // Cell nodes (by column idx).  Lazy-populated by ensureCellNodesInRowsCache().
        "cellNodesByColumnIdx": [],

        // Column indices of cell nodes that have been rendered, but not yet indexed in
        // cellNodesByColumnIdx.  These are in the same order as cell nodes added at the
        // end of the row.
        "cellRenderQueue": []
      };

      appendRowHtml(stringArray, i, range, dataLength);
      if (activeCellNode && activeRow === i) {
        needToReselectCell = true;
      }
      counter_rows_rendered++;
    }

    if (!rows.length) { return; }

    var x = document.createElement("div");
    x.innerHTML = stringArray.join("");

    for (var i = 0, ii = rows.length; i < ii; i++) {
      rowsCache[rows[i]].rowNode = parentNode.appendChild(x.firstChild);
    }

    if (needToReselectCell) {
      activeCellNode = getCellNode(activeRow, activeCell);
    }
  }

  function startPostProcessing() {
    if (!options.enableAsyncPostRender) {
      return;
    }
    clearTimeout(h_postrender);
    h_postrender = setTimeout(asyncPostProcessRows, options.asyncPostRenderDelay);
  }

  function invalidatePostProcessingResults(row) {
    delete postProcessedRows[row];
    postProcessFromRow = Math.min(postProcessFromRow, row);
    postProcessToRow = Math.max(postProcessToRow, row);
    startPostProcessing();
  }

  function updateRowPositions() {
    for (var row in rowsCache) {
      rowsCache[row].rowNode.style.top = getRowTop(row) + "px";
    }
  }

  function render() {
    if (!initialized) { return; }
    var visible = getVisibleRange();
    var rendered = getRenderedRange();

    // remove rows no longer in the viewport
    cleanupRows(rendered);

    // add new rows & missing cells in existing rows
    if (lastRenderedScrollLeft != scrollLeft) {
      cleanUpAndRenderCells(rendered);
    }

    // render missing rows
    renderRows(rendered);

    postProcessFromRow = visible.top;
    postProcessToRow = Math.min(getDataLengthIncludingAddNew() - 1, visible.bottom);
    startPostProcessing();

    lastRenderedScrollTop = scrollTop;
    lastRenderedScrollLeft = scrollLeft;
    h_render = null;
  }

  function handleHeaderRowScroll() {
    var scrollLeft = $headerRowScroller[0].scrollLeft;
    if (scrollLeft != $viewport[0].scrollLeft) {
      $viewport[0].scrollLeft = scrollLeft;
    }
  }

  function handleScroll() {
    scrollTop = $viewport[0].scrollTop;
    scrollLeft = $viewport[0].scrollLeft;
    var vScrollDist = Math.abs(scrollTop - prevScrollTop);
    var hScrollDist = Math.abs(scrollLeft - prevScrollLeft);

    if (hScrollDist) {
      prevScrollLeft = scrollLeft;
      $headerScroller[0].scrollLeft = scrollLeft;
      $topPanelScroller[0].scrollLeft = scrollLeft;
      $headerRowScroller[0].scrollLeft = scrollLeft;
    }

    if (vScrollDist) {
      vScrollDir = prevScrollTop < scrollTop ? 1 : -1;
      prevScrollTop = scrollTop;

      // switch virtual pages if needed
      if (vScrollDist < viewportH) {
        scrollTo(scrollTop + offset);
      } else {
        var oldOffset = offset;
        if (h == viewportH) {
          page = 0;
        } else {
          page = Math.min(n - 1, Math.floor(scrollTop * ((th - viewportH) / (h - viewportH)) * (1 / ph)));
        }
        offset = Math.round(page * cj);
        if (oldOffset != offset) {
          invalidateAllRows();
        }
      }
    }

    if (hScrollDist || vScrollDist) {
      if (h_render) {
        clearTimeout(h_render);
      }

      if (Math.abs(lastRenderedScrollTop - scrollTop) > 20 ||
          Math.abs(lastRenderedScrollLeft - scrollLeft) > 20) {
        if (options.forceSyncScrolling || (
            Math.abs(lastRenderedScrollTop - scrollTop) < viewportH &&
            Math.abs(lastRenderedScrollLeft - scrollLeft) < viewportW)) {
          render();
        } else {
          h_render = setTimeout(render, 50);
        }

        trigger(self.onViewportChanged, {});
      }
    }

    trigger(self.onScroll, {scrollLeft: scrollLeft, scrollTop: scrollTop});
  }

  function asyncPostProcessRows() {
    var dataLength = getDataLength();
    while (postProcessFromRow <= postProcessToRow) {
      var row = (vScrollDir >= 0) ? postProcessFromRow++ : postProcessToRow--;
      var cacheEntry = rowsCache[row];
      if (!cacheEntry || row >= dataLength) {
        continue;
      }

      if (!postProcessedRows[row]) {
        postProcessedRows[row] = {};
      }

      ensureCellNodesInRowsCache(row);
      for (var columnIdx in cacheEntry.cellNodesByColumnIdx) {
        if (!cacheEntry.cellNodesByColumnIdx.hasOwnProperty(columnIdx)) {
          continue;
        }

        columnIdx = columnIdx | 0;

        var m = columns[columnIdx];
        if (m.asyncPostRender && !postProcessedRows[row][columnIdx]) {
          var node = cacheEntry.cellNodesByColumnIdx[columnIdx];
          if (node) {
            m.asyncPostRender(node, row, getDataItem(row), m);
          }
          postProcessedRows[row][columnIdx] = true;
        }
      }

      h_postrender = setTimeout(asyncPostProcessRows, options.asyncPostRenderDelay);
      return;
    }
  }

  function updateCellCssStylesOnRenderedRows(addedHash, removedHash) {
    var node, columnId, addedRowHash, removedRowHash;
    for (var row in rowsCache) {
      removedRowHash = removedHash && removedHash[row];
      addedRowHash = addedHash && addedHash[row];

      if (removedRowHash) {
        for (columnId in removedRowHash) {
          if (!addedRowHash || removedRowHash[columnId] != addedRowHash[columnId]) {
            node = getCellNode(row, getColumnIndex(columnId));
            if (node) {
              $(node).removeClass(removedRowHash[columnId]);
            }
          }
        }
      }

      if (addedRowHash) {
        for (columnId in addedRowHash) {
          if (!removedRowHash || removedRowHash[columnId] != addedRowHash[columnId]) {
            node = getCellNode(row, getColumnIndex(columnId));
            if (node) {
              $(node).addClass(addedRowHash[columnId]);
            }
          }
        }
      }
    }
  }

  function addCellCssStyles(key, hash) {
    if (cellCssClasses[key]) {
      throw "addCellCssStyles: cell CSS hash with key '" + key + "' already exists.";
    }

    cellCssClasses[key] = hash;
    updateCellCssStylesOnRenderedRows(hash, null);

    trigger(self.onCellCssStylesChanged, { "key": key, "hash": hash });
  }

  function removeCellCssStyles(key) {
    if (!cellCssClasses[key]) {
      return;
    }

    updateCellCssStylesOnRenderedRows(null, cellCssClasses[key]);
    delete cellCssClasses[key];

    trigger(self.onCellCssStylesChanged, { "key": key, "hash": null });
  }

  function setCellCssStyles(key, hash) {
    var prevHash = cellCssClasses[key];

    cellCssClasses[key] = hash;
    updateCellCssStylesOnRenderedRows(hash, prevHash);

    trigger(self.onCellCssStylesChanged, { "key": key, "hash": hash });
  }

  function getCellCssStyles(key) {
    return cellCssClasses[key];
  }

  function flashCell(row, cell, speed) {
    speed = speed || 100;
    if (rowsCache[row]) {
      var $cell = $(getCellNode(row, cell));

      var toggleCellClass = function foo(times) {
        if (!times) {
          return;
        }
        setTimeout(function () {
              $cell.queue(function () {
                $cell.toggleClass(options.cellFlashingCssClass).dequeue();
                toggleCellClass(times - 1);
              });
            },
            speed);
      }

      toggleCellClass(4);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  // Interactivity

  function handleMouseWheel(e) {
    var rowNode = $(e.target).closest(".bk-slick-row")[0];
    if (rowNode != rowNodeFromLastMouseWheelEvent) {
      if (zombieRowNodeFromLastMouseWheelEvent && zombieRowNodeFromLastMouseWheelEvent != rowNode) {
        $canvas[0].removeChild(zombieRowNodeFromLastMouseWheelEvent);
        zombieRowNodeFromLastMouseWheelEvent = null;
      }
      rowNodeFromLastMouseWheelEvent = rowNode;
    }
  }

  function handleDragInit(e, dd) {
    var cell = getCellFromEvent(e);
    if (!cell || !cellExists(cell.row, cell.cell)) {
      return false;
    }

    var retval = trigger(self.onDragInit, dd, e);
    if (e.isImmediatePropagationStopped()) {
      return retval;
    }

    // if nobody claims to be handling drag'n'drop by stopping immediate propagation,
    // cancel out of it
    return false;
  }

  function handleDragStart(e, dd) {
    var cell = getCellFromEvent(e);
    if (!cell || !cellExists(cell.row, cell.cell)) {
      return false;
    }

    var retval = trigger(self.onDragStart, dd, e);
    if (e.isImmediatePropagationStopped()) {
      return retval;
    }

    return false;
  }

  function handleDrag(e, dd) {
    return trigger(self.onDrag, dd, e);
  }

  function handleDragEnd(e, dd) {
    trigger(self.onDragEnd, dd, e);
  }

  function handleKeyDown(e) {
    trigger(self.onKeyDown, {row: activeRow, cell: activeCell}, e);
    var handled = e.isImmediatePropagationStopped();

    if (!handled) {
      if (!e.shiftKey && !e.altKey && !e.ctrlKey) {
        if (e.which == 27) {
          if (!getEditorLock().isActive()) {
            return; // no editing mode to cancel, allow bubbling and default processing (exit without cancelling the event)
          }
          cancelEditAndSetFocus();
        } else if (e.which == 34) {
          navigatePageDown();
          handled = true;
        } else if (e.which == 33) {
          navigatePageUp();
          handled = true;
        } else if (e.which == 37) {
          handled = navigateLeft();
        } else if (e.which == 39) {
          handled = navigateRight();
        } else if (e.which == 38) {
          handled = navigateUp();
        } else if (e.which == 40) {
          handled = navigateDown();
        } else if (e.which == 9) {
          handled = navigateNext();
        } else if (e.which == 13) {
          if (options.editable) {
            if (currentEditor) {
              // adding new row
              if (activeRow === getDataLength()) {
                navigateDown();
              } else {
                commitEditAndSetFocus();
              }
            } else {
              if (getEditorLock().commitCurrentEdit()) {
                makeActiveCellEditable();
              }
            }
          }
          handled = true;
        }
      } else if (e.which == 9 && e.shiftKey && !e.ctrlKey && !e.altKey) {
        handled = navigatePrev();
      }
    }

    if (handled) {
      // the event has been handled so don't let parent element (bubbling/propagation) or browser (default) handle it
      e.stopPropagation();
      e.preventDefault();
      try {
        e.originalEvent.keyCode = 0; // prevent default behaviour for special keys in IE browsers (F3, F5, etc.)
      }
      // ignore exceptions - setting the original event's keycode throws access denied exception for "Ctrl"
      // (hitting control key only, nothing else), "Shift" (maybe others)
      catch (error) {
      }
    }
  }

  function handleClick(e) {
    if (!currentEditor) {
      // if this click resulted in some cell child node getting focus,
      // don't steal it back - keyboard events will still bubble up
      // IE9+ seems to default DIVs to tabIndex=0 instead of -1, so check for cell clicks directly.
      if (e.target != document.activeElement || $(e.target).hasClass("bk-slick-cell")) {
        setFocus();
      }
    }

    var cell = getCellFromEvent(e);
    if (!cell || (currentEditor !== null && activeRow == cell.row && activeCell == cell.cell)) {
      return;
    }

    trigger(self.onClick, {row: cell.row, cell: cell.cell}, e);
    if (e.isImmediatePropagationStopped()) {
      return;
    }

    if ((activeCell != cell.cell || activeRow != cell.row) && canCellBeActive(cell.row, cell.cell)) {
      if (!getEditorLock().isActive() || getEditorLock().commitCurrentEdit()) {
        scrollRowIntoView(cell.row, false);
        setActiveCellInternal(getCellNode(cell.row, cell.cell));
      }
    }
  }

  function handleContextMenu(e) {
    var $cell = $(e.target).closest(".bk-slick-cell", $canvas);
    if ($cell.length === 0) {
      return;
    }

    // are we editing this cell?
    if (activeCellNode === $cell[0] && currentEditor !== null) {
      return;
    }

    trigger(self.onContextMenu, {}, e);
  }

  function handleDblClick(e) {
    var cell = getCellFromEvent(e);
    if (!cell || (currentEditor !== null && activeRow == cell.row && activeCell == cell.cell)) {
      return;
    }

    trigger(self.onDblClick, {row: cell.row, cell: cell.cell}, e);
    if (e.isImmediatePropagationStopped()) {
      return;
    }

    if (options.editable) {
      gotoCell(cell.row, cell.cell, true);
    }
  }

  function handleHeaderMouseEnter(e) {
    trigger(self.onHeaderMouseEnter, {
      "column": $(this).data("column")
    }, e);
  }

  function handleHeaderMouseLeave(e) {
    trigger(self.onHeaderMouseLeave, {
      "column": $(this).data("column")
    }, e);
  }

  function handleHeaderContextMenu(e) {
    var $header = $(e.target).closest(".bk-slick-header-column", ".bk-slick-header-columns");
    var column = $header && $header.data("column");
    trigger(self.onHeaderContextMenu, {column: column}, e);
  }

  function handleHeaderClick(e) {
    var $header = $(e.target).closest(".bk-slick-header-column", ".bk-slick-header-columns");
    var column = $header && $header.data("column");
    if (column) {
      trigger(self.onHeaderClick, {column: column}, e);
    }
  }

  function handleMouseEnter(e) {
    trigger(self.onMouseEnter, {}, e);
  }

  function handleMouseLeave(e) {
    trigger(self.onMouseLeave, {}, e);
  }

  function cellExists(row, cell) {
    return !(row < 0 || row >= getDataLength() || cell < 0 || cell >= columns.length);
  }

  function getCellFromPoint(x, y) {
    var row = getRowFromPosition(y);
    var cell = 0;

    var w = 0;
    for (var i = 0; i < columns.length && w < x; i++) {
      w += columns[i].width;
      cell++;
    }

    if (cell < 0) {
      cell = 0;
    }

    return {row: row, cell: cell - 1};
  }

  function getCellFromNode(cellNode) {
    // read column number from .l<columnNumber> CSS class
    var cls = /l\d+/.exec(cellNode.className);
    if (!cls) {
      throw "getCellFromNode: cannot get cell - " + cellNode.className;
    }
    return parseInt(cls[0].substr(1, cls[0].length - 1), 10);
  }

  function getRowFromNode(rowNode) {
    for (var row in rowsCache) {
      if (rowsCache[row].rowNode === rowNode) {
        return row | 0;
      }
    }

    return null;
  }

  function getCellFromEvent(e) {
    var $cell = $(e.target).closest(".bk-slick-cell", $canvas);
    if (!$cell.length) {
      return null;
    }

    var row = getRowFromNode($cell[0].parentNode);
    var cell = getCellFromNode($cell[0]);

    if (row == null || cell == null) {
      return null;
    } else {
      return {
        "row": row,
        "cell": cell
      };
    }
  }

  function getCellNodeBox(row, cell) {
    if (!cellExists(row, cell)) {
      return null;
    }

    var y1 = getRowTop(row);
    var y2 = y1 + options.rowHeight - 1;
    var x1 = 0;
    for (var i = 0; i < cell; i++) {
      x1 += columns[i].width;
    }
    var x2 = x1 + columns[cell].width;

    return {
      top: y1,
      left: x1,
      bottom: y2,
      right: x2
    };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  // Cell switching

  function resetActiveCell() {
    setActiveCellInternal(null, false);
  }

  function setFocus() {
    if (tabbingDirection == -1) {
      $focusSink[0].focus();
    } else {
      $focusSink2[0].focus();
    }
  }

  function scrollCellIntoView(row, cell, doPaging) {
    scrollRowIntoView(row, doPaging);

    var colspan = getColspan(row, cell);
    var left = columnPosLeft[cell],
      right = columnPosRight[cell + (colspan > 1 ? colspan - 1 : 0)],
      scrollRight = scrollLeft + viewportW;

    if (left < scrollLeft) {
      $viewport.scrollLeft(left);
      handleScroll();
      render();
    } else if (right > scrollRight) {
      $viewport.scrollLeft(Math.min(left, right - $viewport[0].clientWidth));
      handleScroll();
      render();
    }
  }

  function setActiveCellInternal(newCell, opt_editMode) {
    if (activeCellNode !== null) {
      makeActiveCellNormal();
      $(activeCellNode).removeClass("active");
      if (rowsCache[activeRow]) {
        $(rowsCache[activeRow].rowNode).removeClass("active");
      }
    }

    var activeCellChanged = (activeCellNode !== newCell);
    activeCellNode = newCell;

    if (activeCellNode != null) {
      activeRow = getRowFromNode(activeCellNode.parentNode);
      activeCell = activePosX = getCellFromNode(activeCellNode);

      if (opt_editMode == null) {
        opt_editMode = (activeRow == getDataLength()) || options.autoEdit;
      }

      $(activeCellNode).addClass("active");
      $(rowsCache[activeRow].rowNode).addClass("active");

      if (options.editable && opt_editMode && isCellPotentiallyEditable(activeRow, activeCell)) {
        clearTimeout(h_editorLoader);

        if (options.asyncEditorLoading) {
          h_editorLoader = setTimeout(function () {
            makeActiveCellEditable();
          }, options.asyncEditorLoadDelay);
        } else {
          makeActiveCellEditable();
        }
      }
    } else {
      activeRow = activeCell = null;
    }

    if (activeCellChanged) {
      trigger(self.onActiveCellChanged, getActiveCell());
    }
  }

  function clearTextSelection() {
    if (document.selection && document.selection.empty) {
      try {
        //IE fails here if selected element is not in dom
        document.selection.empty();
      } catch (e) { }
    } else if (window.getSelection) {
      var sel = window.getSelection();
      if (sel && sel.removeAllRanges) {
        sel.removeAllRanges();
      }
    }
  }

  function isCellPotentiallyEditable(row, cell) {
    var dataLength = getDataLength();
    // is the data for this row loaded?
    if (row < dataLength && !getDataItem(row)) {
      return false;
    }

    // are we in the Add New row?  can we create new from this cell?
    if (columns[cell].cannotTriggerInsert && row >= dataLength) {
      return false;
    }

    // does this cell have an editor?
    if (!getEditor(row, cell)) {
      return false;
    }

    return true;
  }

  function makeActiveCellNormal() {
    if (!currentEditor) {
      return;
    }
    trigger(self.onBeforeCellEditorDestroy, {editor: currentEditor});
    currentEditor.destroy();
    currentEditor = null;

    if (activeCellNode) {
      var d = getDataItem(activeRow);
      $(activeCellNode).removeClass("editable invalid");
      if (d) {
        var column = columns[activeCell];
        var formatter = getFormatter(activeRow, column);
        activeCellNode.innerHTML = formatter(activeRow, activeCell, getDataItemValueForColumn(d, column), column, d);
        invalidatePostProcessingResults(activeRow);
      }
    }

    // if there previously was text selected on a page (such as selected text in the edit cell just removed),
    // IE can't set focus to anything else correctly
    if (navigator.userAgent.toLowerCase().match(/msie/)) {
      clearTextSelection();
    }

    getEditorLock().deactivate(editController);
  }

  function makeActiveCellEditable(editor) {
    if (!activeCellNode) {
      return;
    }
    if (!options.editable) {
      throw "Grid : makeActiveCellEditable : should never get called when options.editable is false";
    }

    // cancel pending async call if there is one
    clearTimeout(h_editorLoader);

    if (!isCellPotentiallyEditable(activeRow, activeCell)) {
      return;
    }

    var columnDef = columns[activeCell];
    var item = getDataItem(activeRow);

    if (trigger(self.onBeforeEditCell, {row: activeRow, cell: activeCell, item: item, column: columnDef}) === false) {
      setFocus();
      return;
    }

    getEditorLock().activate(editController);
    $(activeCellNode).addClass("editable");

    // don't clear the cell if a custom editor is passed through
    if (!editor) {
      activeCellNode.innerHTML = "";
    }

    currentEditor = new (editor || getEditor(activeRow, activeCell))({
      grid: self,
      gridPosition: absBox($container[0]),
      position: absBox(activeCellNode),
      container: activeCellNode,
      column: columnDef,
      item: item || {},
      commitChanges: commitEditAndSetFocus,
      cancelChanges: cancelEditAndSetFocus
    });

    if (item) {
      currentEditor.loadValue(item);
    }

    serializedEditorValue = currentEditor.serializeValue();

    if (currentEditor.position) {
      handleActiveCellPositionChange();
    }
  }

  function commitEditAndSetFocus() {
    // if the commit fails, it would do so due to a validation error
    // if so, do not steal the focus from the editor
    if (getEditorLock().commitCurrentEdit()) {
      setFocus();
      if (options.autoEdit) {
        navigateDown();
      }
    }
  }

  function cancelEditAndSetFocus() {
    if (getEditorLock().cancelCurrentEdit()) {
      setFocus();
    }
  }

  function absBox(elem) {
    var box = {
      top: elem.offsetTop,
      left: elem.offsetLeft,
      bottom: 0,
      right: 0,
      width: $(elem).outerWidth(),
      height: $(elem).outerHeight(),
      visible: true};
    box.bottom = box.top + box.height;
    box.right = box.left + box.width;

    // walk up the tree
    var offsetParent = elem.offsetParent;
    while ((elem = elem.parentNode) != document.body) {
      if (box.visible && elem.scrollHeight != elem.offsetHeight && $(elem).css("overflowY") != "visible") {
        box.visible = box.bottom > elem.scrollTop && box.top < elem.scrollTop + elem.clientHeight;
      }

      if (box.visible && elem.scrollWidth != elem.offsetWidth && $(elem).css("overflowX") != "visible") {
        box.visible = box.right > elem.scrollLeft && box.left < elem.scrollLeft + elem.clientWidth;
      }

      box.left -= elem.scrollLeft;
      box.top -= elem.scrollTop;

      if (elem === offsetParent) {
        box.left += elem.offsetLeft;
        box.top += elem.offsetTop;
        offsetParent = elem.offsetParent;
      }

      box.bottom = box.top + box.height;
      box.right = box.left + box.width;
    }

    return box;
  }

  function getActiveCellPosition() {
    return absBox(activeCellNode);
  }

  function getGridPosition() {
    return absBox($container[0])
  }

  function handleActiveCellPositionChange() {
    if (!activeCellNode) {
      return;
    }

    trigger(self.onActiveCellPositionChanged, {});

    if (currentEditor) {
      var cellBox = getActiveCellPosition();
      if (currentEditor.show && currentEditor.hide) {
        if (!cellBox.visible) {
          currentEditor.hide();
        } else {
          currentEditor.show();
        }
      }

      if (currentEditor.position) {
        currentEditor.position(cellBox);
      }
    }
  }

  function getCellEditor() {
    return currentEditor;
  }

  function getActiveCell() {
    if (!activeCellNode) {
      return null;
    } else {
      return {row: activeRow, cell: activeCell};
    }
  }

  function getActiveCellNode() {
    return activeCellNode;
  }

  function scrollRowIntoView(row, doPaging) {
    var rowAtTop = row * options.rowHeight;
    var rowAtBottom = (row + 1) * options.rowHeight - viewportH + (viewportHasHScroll ? scrollbarDimensions.height : 0);

    // need to page down?
    if ((row + 1) * options.rowHeight > scrollTop + viewportH + offset) {
      scrollTo(doPaging ? rowAtTop : rowAtBottom);
      render();
    }
    // or page up?
    else if (row * options.rowHeight < scrollTop + offset) {
      scrollTo(doPaging ? rowAtBottom : rowAtTop);
      render();
    }
  }

  function scrollRowToTop(row) {
    scrollTo(row * options.rowHeight);
    render();
  }

  function scrollPage(dir) {
    var deltaRows = dir * numVisibleRows;
    scrollTo((getRowFromPosition(scrollTop) + deltaRows) * options.rowHeight);
    render();

    if (options.enableCellNavigation && activeRow != null) {
      var row = activeRow + deltaRows;
      var dataLengthIncludingAddNew = getDataLengthIncludingAddNew();
      if (row >= dataLengthIncludingAddNew) {
        row = dataLengthIncludingAddNew - 1;
      }
      if (row < 0) {
        row = 0;
      }

      var cell = 0, prevCell = null;
      var prevActivePosX = activePosX;
      while (cell <= activePosX) {
        if (canCellBeActive(row, cell)) {
          prevCell = cell;
        }
        cell += getColspan(row, cell);
      }

      if (prevCell !== null) {
        setActiveCellInternal(getCellNode(row, prevCell));
        activePosX = prevActivePosX;
      } else {
        resetActiveCell();
      }
    }
  }

  function navigatePageDown() {
    scrollPage(1);
  }

  function navigatePageUp() {
    scrollPage(-1);
  }

  function getColspan(row, cell) {
    var metadata = data.getItemMetadata && data.getItemMetadata(row);
    if (!metadata || !metadata.columns) {
      return 1;
    }

    var columnData = metadata.columns[columns[cell].id] || metadata.columns[cell];
    var colspan = (columnData && columnData.colspan);
    if (colspan === "*") {
      colspan = columns.length - cell;
    } else {
      colspan = colspan || 1;
    }

    return colspan;
  }

  function findFirstFocusableCell(row) {
    var cell = 0;
    while (cell < columns.length) {
      if (canCellBeActive(row, cell)) {
        return cell;
      }
      cell += getColspan(row, cell);
    }
    return null;
  }

  function findLastFocusableCell(row) {
    var cell = 0;
    var lastFocusableCell = null;
    while (cell < columns.length) {
      if (canCellBeActive(row, cell)) {
        lastFocusableCell = cell;
      }
      cell += getColspan(row, cell);
    }
    return lastFocusableCell;
  }

  function gotoRight(row, cell, posX) {
    if (cell >= columns.length) {
      return null;
    }

    do {
      cell += getColspan(row, cell);
    }
    while (cell < columns.length && !canCellBeActive(row, cell));

    if (cell < columns.length) {
      return {
        "row": row,
        "cell": cell,
        "posX": cell
      };
    }
    return null;
  }

  function gotoLeft(row, cell, posX) {
    if (cell <= 0) {
      return null;
    }

    var firstFocusableCell = findFirstFocusableCell(row);
    if (firstFocusableCell === null || firstFocusableCell >= cell) {
      return null;
    }

    var prev = {
      "row": row,
      "cell": firstFocusableCell,
      "posX": firstFocusableCell
    };
    var pos;
    while (true) {
      pos = gotoRight(prev.row, prev.cell, prev.posX);
      if (!pos) {
        return null;
      }
      if (pos.cell >= cell) {
        return prev;
      }
      prev = pos;
    }
  }

  function gotoDown(row, cell, posX) {
    var prevCell;
    var dataLengthIncludingAddNew = getDataLengthIncludingAddNew();
    while (true) {
      if (++row >= dataLengthIncludingAddNew) {
        return null;
      }

      prevCell = cell = 0;
      while (cell <= posX) {
        prevCell = cell;
        cell += getColspan(row, cell);
      }

      if (canCellBeActive(row, prevCell)) {
        return {
          "row": row,
          "cell": prevCell,
          "posX": posX
        };
      }
    }
  }

  function gotoUp(row, cell, posX) {
    var prevCell;
    while (true) {
      if (--row < 0) {
        return null;
      }

      prevCell = cell = 0;
      while (cell <= posX) {
        prevCell = cell;
        cell += getColspan(row, cell);
      }

      if (canCellBeActive(row, prevCell)) {
        return {
          "row": row,
          "cell": prevCell,
          "posX": posX
        };
      }
    }
  }

  function gotoNext(row, cell, posX) {
    if (row == null && cell == null) {
      row = cell = posX = 0;
      if (canCellBeActive(row, cell)) {
        return {
          "row": row,
          "cell": cell,
          "posX": cell
        };
      }
    }

    var pos = gotoRight(row, cell, posX);
    if (pos) {
      return pos;
    }

    var firstFocusableCell = null;
    var dataLengthIncludingAddNew = getDataLengthIncludingAddNew();
    while (++row < dataLengthIncludingAddNew) {
      firstFocusableCell = findFirstFocusableCell(row);
      if (firstFocusableCell !== null) {
        return {
          "row": row,
          "cell": firstFocusableCell,
          "posX": firstFocusableCell
        };
      }
    }
    return null;
  }

  function gotoPrev(row, cell, posX) {
    if (row == null && cell == null) {
      row = getDataLengthIncludingAddNew() - 1;
      cell = posX = columns.length - 1;
      if (canCellBeActive(row, cell)) {
        return {
          "row": row,
          "cell": cell,
          "posX": cell
        };
      }
    }

    var pos;
    var lastSelectableCell;
    while (!pos) {
      pos = gotoLeft(row, cell, posX);
      if (pos) {
        break;
      }
      if (--row < 0) {
        return null;
      }

      cell = 0;
      lastSelectableCell = findLastFocusableCell(row);
      if (lastSelectableCell !== null) {
        pos = {
          "row": row,
          "cell": lastSelectableCell,
          "posX": lastSelectableCell
        };
      }
    }
    return pos;
  }

  function navigateRight() {
    return navigate("right");
  }

  function navigateLeft() {
    return navigate("left");
  }

  function navigateDown() {
    return navigate("down");
  }

  function navigateUp() {
    return navigate("up");
  }

  function navigateNext() {
    return navigate("next");
  }

  function navigatePrev() {
    return navigate("prev");
  }

  /**
   * @param {string} dir Navigation direction.
   * @return {boolean} Whether navigation resulted in a change of active cell.
   */
  function navigate(dir) {
    if (!options.enableCellNavigation) {
      return false;
    }

    if (!activeCellNode && dir != "prev" && dir != "next") {
      return false;
    }

    if (!getEditorLock().commitCurrentEdit()) {
      return true;
    }
    setFocus();

    var tabbingDirections = {
      "up": -1,
      "down": 1,
      "left": -1,
      "right": 1,
      "prev": -1,
      "next": 1
    };
    tabbingDirection = tabbingDirections[dir];

    var stepFunctions = {
      "up": gotoUp,
      "down": gotoDown,
      "left": gotoLeft,
      "right": gotoRight,
      "prev": gotoPrev,
      "next": gotoNext
    };
    var stepFn = stepFunctions[dir];
    var pos = stepFn(activeRow, activeCell, activePosX);
    if (pos) {
      var isAddNewRow = (pos.row == getDataLength());
      scrollCellIntoView(pos.row, pos.cell, !isAddNewRow);
      setActiveCellInternal(getCellNode(pos.row, pos.cell));
      activePosX = pos.posX;
      return true;
    } else {
      setActiveCellInternal(getCellNode(activeRow, activeCell));
      return false;
    }
  }

  function getCellNode(row, cell) {
    if (rowsCache[row]) {
      ensureCellNodesInRowsCache(row);
      return rowsCache[row].cellNodesByColumnIdx[cell];
    }
    return null;
  }

  function setActiveCell(row, cell) {
    if (!initialized) { return; }
    if (row > getDataLength() || row < 0 || cell >= columns.length || cell < 0) {
      return;
    }

    if (!options.enableCellNavigation) {
      return;
    }

    scrollCellIntoView(row, cell, false);
    setActiveCellInternal(getCellNode(row, cell), false);
  }

  function canCellBeActive(row, cell) {
    if (!options.enableCellNavigation || row >= getDataLengthIncludingAddNew() ||
        row < 0 || cell >= columns.length || cell < 0) {
      return false;
    }

    var rowMetadata = data.getItemMetadata && data.getItemMetadata(row);
    if (rowMetadata && typeof rowMetadata.focusable === "boolean") {
      return rowMetadata.focusable;
    }

    var columnMetadata = rowMetadata && rowMetadata.columns;
    if (columnMetadata && columnMetadata[columns[cell].id] && typeof columnMetadata[columns[cell].id].focusable === "boolean") {
      return columnMetadata[columns[cell].id].focusable;
    }
    if (columnMetadata && columnMetadata[cell] && typeof columnMetadata[cell].focusable === "boolean") {
      return columnMetadata[cell].focusable;
    }

    return columns[cell].focusable;
  }

  function canCellBeSelected(row, cell) {
    if (row >= getDataLength() || row < 0 || cell >= columns.length || cell < 0) {
      return false;
    }

    var rowMetadata = data.getItemMetadata && data.getItemMetadata(row);
    if (rowMetadata && typeof rowMetadata.selectable === "boolean") {
      return rowMetadata.selectable;
    }

    var columnMetadata = rowMetadata && rowMetadata.columns && (rowMetadata.columns[columns[cell].id] || rowMetadata.columns[cell]);
    if (columnMetadata && typeof columnMetadata.selectable === "boolean") {
      return columnMetadata.selectable;
    }

    return columns[cell].selectable;
  }

  function gotoCell(row, cell, forceEdit) {
    if (!initialized) { return; }
    if (!canCellBeActive(row, cell)) {
      return;
    }

    if (!getEditorLock().commitCurrentEdit()) {
      return;
    }

    scrollCellIntoView(row, cell, false);

    var newCell = getCellNode(row, cell);

    // if selecting the 'add new' row, start editing right away
    setActiveCellInternal(newCell, forceEdit || (row === getDataLength()) || options.autoEdit);

    // if no editor was created, set the focus back on the grid
    if (!currentEditor) {
      setFocus();
    }
  }


  //////////////////////////////////////////////////////////////////////////////////////////////
  // IEditor implementation for the editor lock

  function commitCurrentEdit() {
    var item = getDataItem(activeRow);
    var column = columns[activeCell];

    if (currentEditor) {
      if (currentEditor.isValueChanged()) {
        var validationResults = currentEditor.validate();

        if (validationResults.valid) {
          if (activeRow < getDataLength()) {
            var editCommand = {
              row: activeRow,
              cell: activeCell,
              editor: currentEditor,
              serializedValue: currentEditor.serializeValue(),
              prevSerializedValue: serializedEditorValue,
              execute: function () {
                this.editor.applyValue(item, this.serializedValue);
                updateRow(this.row);
                trigger(self.onCellChange, {
                  row: activeRow,
                  cell: activeCell,
                  item: item
                });
              },
              undo: function () {
                this.editor.applyValue(item, this.prevSerializedValue);
                updateRow(this.row);
                trigger(self.onCellChange, {
                  row: activeRow,
                  cell: activeCell,
                  item: item
                });
              }
            };

            if (options.editCommandHandler) {
              makeActiveCellNormal();
              options.editCommandHandler(item, column, editCommand);
            } else {
              editCommand.execute();
              makeActiveCellNormal();
            }

          } else {
            var newItem = {};
            currentEditor.applyValue(newItem, currentEditor.serializeValue());
            makeActiveCellNormal();
            trigger(self.onAddNewRow, {item: newItem, column: column});
          }

          // check whether the lock has been re-acquired by event handlers
          return !getEditorLock().isActive();
        } else {
          // Re-add the CSS class to trigger transitions, if any.
          $(activeCellNode).removeClass("invalid");
          $(activeCellNode).width();  // force layout
          $(activeCellNode).addClass("invalid");

          trigger(self.onValidationError, {
            editor: currentEditor,
            cellNode: activeCellNode,
            validationResults: validationResults,
            row: activeRow,
            cell: activeCell,
            column: column
          });

          currentEditor.focus();
          return false;
        }
      }

      makeActiveCellNormal();
    }
    return true;
  }

  function cancelCurrentEdit() {
    makeActiveCellNormal();
    return true;
  }

  function rowsToRanges(rows) {
    var ranges = [];
    var lastCell = columns.length - 1;
    for (var i = 0; i < rows.length; i++) {
      ranges.push(new Slick.Range(rows[i], 0, rows[i], lastCell));
    }
    return ranges;
  }

  function getSelectedRows() {
    if (!selectionModel) {
      throw "Selection model is not set";
    }
    return selectedRows;
  }

  function setSelectedRows(rows) {
    if (!selectionModel) {
      throw "Selection model is not set";
    }
    selectionModel.setSelectedRanges(rowsToRanges(rows));
  }


  //////////////////////////////////////////////////////////////////////////////////////////////
  // Debug

  this.debug = function () {
    var s = "";

    s += ("\n" + "counter_rows_rendered:  " + counter_rows_rendered);
    s += ("\n" + "counter_rows_removed:  " + counter_rows_removed);
    s += ("\n" + "renderedRows:  " + renderedRows);
    s += ("\n" + "numVisibleRows:  " + numVisibleRows);
    s += ("\n" + "maxSupportedCssHeight:  " + maxSupportedCssHeight);
    s += ("\n" + "n(umber of pages):  " + n);
    s += ("\n" + "(current) page:  " + page);
    s += ("\n" + "page height (ph):  " + ph);
    s += ("\n" + "vScrollDir:  " + vScrollDir);

    alert(s);
  };

  // a debug helper to be able to access private members
  this.eval = function (expr) {
    return eval(expr);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////
  // Public API

  $.extend(this, {
    "slickGridVersion": "2.1",

    // Events
    "onScroll": new Slick.Event(),
    "onSort": new Slick.Event(),
    "onHeaderMouseEnter": new Slick.Event(),
    "onHeaderMouseLeave": new Slick.Event(),
    "onHeaderContextMenu": new Slick.Event(),
    "onHeaderClick": new Slick.Event(),
    "onHeaderCellRendered": new Slick.Event(),
    "onBeforeHeaderCellDestroy": new Slick.Event(),
    "onHeaderRowCellRendered": new Slick.Event(),
    "onBeforeHeaderRowCellDestroy": new Slick.Event(),
    "onMouseEnter": new Slick.Event(),
    "onMouseLeave": new Slick.Event(),
    "onClick": new Slick.Event(),
    "onDblClick": new Slick.Event(),
    "onContextMenu": new Slick.Event(),
    "onKeyDown": new Slick.Event(),
    "onAddNewRow": new Slick.Event(),
    "onValidationError": new Slick.Event(),
    "onViewportChanged": new Slick.Event(),
    "onColumnsReordered": new Slick.Event(),
    "onColumnsResized": new Slick.Event(),
    "onCellChange": new Slick.Event(),
    "onBeforeEditCell": new Slick.Event(),
    "onBeforeCellEditorDestroy": new Slick.Event(),
    "onBeforeDestroy": new Slick.Event(),
    "onActiveCellChanged": new Slick.Event(),
    "onActiveCellPositionChanged": new Slick.Event(),
    "onDragInit": new Slick.Event(),
    "onDragStart": new Slick.Event(),
    "onDrag": new Slick.Event(),
    "onDragEnd": new Slick.Event(),
    "onSelectedRowsChanged": new Slick.Event(),
    "onCellCssStylesChanged": new Slick.Event(),

    // Methods
    "registerPlugin": registerPlugin,
    "unregisterPlugin": unregisterPlugin,
    "getColumns": getColumns,
    "setColumns": setColumns,
    "getColumnIndex": getColumnIndex,
    "updateColumnHeader": updateColumnHeader,
    "setSortColumn": setSortColumn,
    "setSortColumns": setSortColumns,
    "getSortColumns": getSortColumns,
    "autosizeColumns": autosizeColumns,
    "getOptions": getOptions,
    "setOptions": setOptions,
    "getData": getData,
    "getDataLength": getDataLength,
    "getDataItem": getDataItem,
    "setData": setData,
    "getSelectionModel": getSelectionModel,
    "setSelectionModel": setSelectionModel,
    "getSelectedRows": getSelectedRows,
    "setSelectedRows": setSelectedRows,
    "getContainerNode": getContainerNode,

    "render": render,
    "invalidate": invalidate,
    "invalidateRow": invalidateRow,
    "invalidateRows": invalidateRows,
    "invalidateAllRows": invalidateAllRows,
    "updateCell": updateCell,
    "updateRow": updateRow,
    "getViewport": getVisibleRange,
    "getRenderedRange": getRenderedRange,
    "resizeCanvas": resizeCanvas,
    "updateRowCount": updateRowCount,
    "scrollRowIntoView": scrollRowIntoView,
    "scrollRowToTop": scrollRowToTop,
    "scrollCellIntoView": scrollCellIntoView,
    "getCanvasNode": getCanvasNode,
    "focus": setFocus,

    "getCellFromPoint": getCellFromPoint,
    "getCellFromEvent": getCellFromEvent,
    "getActiveCell": getActiveCell,
    "setActiveCell": setActiveCell,
    "getActiveCellNode": getActiveCellNode,
    "getActiveCellPosition": getActiveCellPosition,
    "resetActiveCell": resetActiveCell,
    "editActiveCell": makeActiveCellEditable,
    "getCellEditor": getCellEditor,
    "getCellNode": getCellNode,
    "getCellNodeBox": getCellNodeBox,
    "canCellBeSelected": canCellBeSelected,
    "canCellBeActive": canCellBeActive,
    "navigatePrev": navigatePrev,
    "navigateNext": navigateNext,
    "navigateUp": navigateUp,
    "navigateDown": navigateDown,
    "navigateLeft": navigateLeft,
    "navigateRight": navigateRight,
    "navigatePageUp": navigatePageUp,
    "navigatePageDown": navigatePageDown,
    "gotoCell": gotoCell,
    "getTopPanel": getTopPanel,
    "setTopPanelVisibility": setTopPanelVisibility,
    "setHeaderRowVisibility": setHeaderRowVisibility,
    "getHeaderRow": getHeaderRow,
    "getHeaderRowColumn": getHeaderRowColumn,
    "getGridPosition": getGridPosition,
    "flashCell": flashCell,
    "addCellCssStyles": addCellCssStyles,
    "setCellCssStyles": setCellCssStyles,
    "removeCellCssStyles": removeCellCssStyles,
    "getCellCssStyles": getCellCssStyles,

    "init": finishInitialization,
    "destroy": destroy,

    // IEditor implementation
    "getEditorLock": getEditorLock,
    "getEditController": getEditController
  });

  init();
}

module.exports = SlickGrid;

},{"./slick.core":"slick_grid/slick.core","jquery":"jquery","jquery_event_drag":"jquery_event_drag","jquery_event_drop":"jquery_event_drop"}]},{},["models/widgets/main"])

 })()/*
Copyright (c) 2012, Continuum Analytics, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.

Neither the name of Continuum Analytics nor the names of any contributors
may be used to endorse or promote products derived from this software 
without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE 
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF 
THE POSSIBILITY OF SUCH DAMAGE.
*/

//# sourceMappingURL=bokeh-widgets.js.map
