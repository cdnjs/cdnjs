/*!
 * Copyright (c) 2012 - 2018, Anaconda, Inc., and Bokeh Contributors
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * 
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * 
 * Neither the name of Anaconda nor the names of any contributors
 * may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */
(function(root, factory) {
//  if(typeof exports === 'object' && typeof module === 'object')
//    factory(require("Bokeh"));
//  else if(typeof define === 'function' && define.amd)
//    define(["Bokeh"], factory);
//  else if(typeof exports === 'object')
//    factory(require("Bokeh"));
//  else
    factory(root["Bokeh"]);
})(this, function(Bokeh) {
  var define;
  return (function(modules, aliases, entry) {
    if (Bokeh != null) {
      return Bokeh.register_plugin(modules, aliases, entry);
    } else {
      throw new Error("Cannot find Bokeh. You have to load it prior to loading plugins.");
    }
  })
({
433: /* models/widgets/tables/cell_editors */ function _(require, module, exports) {
    var tslib_1 = require(391) /* tslib */;
    var p = require(15) /* core/properties */;
    var dom_1 = require(5) /* core/dom */;
    var dom_view_1 = require(6) /* core/dom_view */;
    var model_1 = require(59) /* ../../../model */;
    var data_table_1 = require(435) /* ./data_table */;
    var CellEditorView = /** @class */ (function (_super) {
        tslib_1.__extends(CellEditorView, _super);
        function CellEditorView(options) {
            return _super.call(this, tslib_1.__assign({ model: options.column.model }, options)) || this;
        }
        Object.defineProperty(CellEditorView.prototype, "emptyValue", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        CellEditorView.prototype.initialize = function (options) {
            _super.prototype.initialize.call(this, options);
            this.inputEl = this._createInput();
            this.defaultValue = null;
            this.args = options;
            this.render();
        };
        CellEditorView.prototype.css_classes = function () {
            return _super.prototype.css_classes.call(this).concat("bk-cell-editor");
        };
        CellEditorView.prototype.render = function () {
            _super.prototype.render.call(this);
            this.args.container.appendChild(this.el);
            this.el.appendChild(this.inputEl);
            this.renderEditor();
            this.disableNavigation();
        };
        CellEditorView.prototype.renderEditor = function () { };
        CellEditorView.prototype.disableNavigation = function () {
            this.inputEl.addEventListener("keydown", function (event) {
                switch (event.keyCode) {
                    case dom_1.Keys.Left:
                    case dom_1.Keys.Right:
                    case dom_1.Keys.Up:
                    case dom_1.Keys.Down:
                    case dom_1.Keys.PageUp:
                    case dom_1.Keys.PageDown:
                        event.stopImmediatePropagation();
                }
            });
        };
        CellEditorView.prototype.destroy = function () {
            this.remove();
        };
        CellEditorView.prototype.focus = function () {
            this.inputEl.focus();
        };
        CellEditorView.prototype.show = function () { };
        CellEditorView.prototype.hide = function () { };
        CellEditorView.prototype.position = function () { };
        CellEditorView.prototype.getValue = function () {
            return this.inputEl.value;
        };
        CellEditorView.prototype.setValue = function (val) {
            this.inputEl.value = val;
        };
        CellEditorView.prototype.serializeValue = function () {
            return this.getValue();
        };
        CellEditorView.prototype.isValueChanged = function () {
            return !(this.getValue() == "" && this.defaultValue == null) && this.getValue() !== this.defaultValue;
        };
        CellEditorView.prototype.applyValue = function (item, state) {
            var grid_data = this.args.grid.getData();
            var offset = grid_data.index.indexOf(item[data_table_1.DTINDEX_NAME]);
            grid_data.setField(offset, this.args.column.field, state);
        };
        CellEditorView.prototype.loadValue = function (item) {
            var value = item[this.args.column.field];
            this.defaultValue = value != null ? value : this.emptyValue;
            this.setValue(this.defaultValue);
        };
        CellEditorView.prototype.validateValue = function (value) {
            if (this.args.column.validator) {
                var result = this.args.column.validator(value);
                if (!result.valid) {
                    return result;
                }
            }
            return { valid: true, msg: null };
        };
        CellEditorView.prototype.validate = function () {
            return this.validateValue(this.getValue());
        };
        return CellEditorView;
    }(dom_view_1.DOMView));
    exports.CellEditorView = CellEditorView;
    var CellEditor = /** @class */ (function (_super) {
        tslib_1.__extends(CellEditor, _super);
        function CellEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CellEditor.initClass = function () {
            this.prototype.type = "CellEditor";
        };
        return CellEditor;
    }(model_1.Model));
    exports.CellEditor = CellEditor;
    CellEditor.initClass();
    var StringEditorView = /** @class */ (function (_super) {
        tslib_1.__extends(StringEditorView, _super);
        function StringEditorView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(StringEditorView.prototype, "emptyValue", {
            get: function () {
                return "";
            },
            enumerable: true,
            configurable: true
        });
        StringEditorView.prototype._createInput = function () {
            return dom_1.input({ type: "text" });
        };
        StringEditorView.prototype.renderEditor = function () {
            //completions = @model.completions
            //if completions.length != 0
            //  @inputEl.classList.add("bk-cell-editor-completion")
            //  $(@inputEl).autocomplete({source: completions})
            //  $(@inputEl).autocomplete("widget")
            this.inputEl.focus();
            this.inputEl.select();
        };
        StringEditorView.prototype.loadValue = function (item) {
            _super.prototype.loadValue.call(this, item);
            this.inputEl.defaultValue = this.defaultValue;
            this.inputEl.select();
        };
        return StringEditorView;
    }(CellEditorView));
    exports.StringEditorView = StringEditorView;
    var StringEditor = /** @class */ (function (_super) {
        tslib_1.__extends(StringEditor, _super);
        function StringEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StringEditor.initClass = function () {
            this.prototype.type = 'StringEditor';
            this.prototype.default_view = StringEditorView;
            this.define({
                completions: [p.Array, []],
            });
        };
        return StringEditor;
    }(CellEditor));
    exports.StringEditor = StringEditor;
    StringEditor.initClass();
    var TextEditorView = /** @class */ (function (_super) {
        tslib_1.__extends(TextEditorView, _super);
        function TextEditorView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextEditorView.prototype._createInput = function () {
            return dom_1.textarea();
        };
        return TextEditorView;
    }(CellEditorView));
    exports.TextEditorView = TextEditorView;
    var TextEditor = /** @class */ (function (_super) {
        tslib_1.__extends(TextEditor, _super);
        function TextEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextEditor.initClass = function () {
            this.prototype.type = 'TextEditor';
            this.prototype.default_view = TextEditorView;
        };
        return TextEditor;
    }(CellEditor));
    exports.TextEditor = TextEditor;
    TextEditor.initClass();
    var SelectEditorView = /** @class */ (function (_super) {
        tslib_1.__extends(SelectEditorView, _super);
        function SelectEditorView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SelectEditorView.prototype._createInput = function () {
            return dom_1.select();
        };
        SelectEditorView.prototype.renderEditor = function () {
            for (var _i = 0, _a = this.model.options; _i < _a.length; _i++) {
                var opt = _a[_i];
                this.inputEl.appendChild(dom_1.option({ value: opt }, opt));
            }
            this.focus();
        };
        return SelectEditorView;
    }(CellEditorView));
    exports.SelectEditorView = SelectEditorView;
    var SelectEditor = /** @class */ (function (_super) {
        tslib_1.__extends(SelectEditor, _super);
        function SelectEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SelectEditor.initClass = function () {
            this.prototype.type = 'SelectEditor';
            this.prototype.default_view = SelectEditorView;
            this.define({
                options: [p.Array, []],
            });
        };
        return SelectEditor;
    }(CellEditor));
    exports.SelectEditor = SelectEditor;
    SelectEditor.initClass();
    var PercentEditorView = /** @class */ (function (_super) {
        tslib_1.__extends(PercentEditorView, _super);
        function PercentEditorView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PercentEditorView.prototype._createInput = function () {
            return dom_1.input({ type: "text" });
        };
        return PercentEditorView;
    }(CellEditorView));
    exports.PercentEditorView = PercentEditorView;
    var PercentEditor = /** @class */ (function (_super) {
        tslib_1.__extends(PercentEditor, _super);
        function PercentEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PercentEditor.initClass = function () {
            this.prototype.type = 'PercentEditor';
            this.prototype.default_view = PercentEditorView;
        };
        return PercentEditor;
    }(CellEditor));
    exports.PercentEditor = PercentEditor;
    PercentEditor.initClass();
    var CheckboxEditorView = /** @class */ (function (_super) {
        tslib_1.__extends(CheckboxEditorView, _super);
        function CheckboxEditorView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CheckboxEditorView.prototype._createInput = function () {
            return dom_1.input({ type: "checkbox", value: "true" });
        };
        CheckboxEditorView.prototype.renderEditor = function () {
            this.focus();
        };
        CheckboxEditorView.prototype.loadValue = function (item) {
            this.defaultValue = !!item[this.args.column.field];
            this.inputEl.checked = this.defaultValue;
        };
        CheckboxEditorView.prototype.serializeValue = function () {
            return this.inputEl.checked;
        };
        return CheckboxEditorView;
    }(CellEditorView));
    exports.CheckboxEditorView = CheckboxEditorView;
    var CheckboxEditor = /** @class */ (function (_super) {
        tslib_1.__extends(CheckboxEditor, _super);
        function CheckboxEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CheckboxEditor.initClass = function () {
            this.prototype.type = 'CheckboxEditor';
            this.prototype.default_view = CheckboxEditorView;
        };
        return CheckboxEditor;
    }(CellEditor));
    exports.CheckboxEditor = CheckboxEditor;
    CheckboxEditor.initClass();
    var IntEditorView = /** @class */ (function (_super) {
        tslib_1.__extends(IntEditorView, _super);
        function IntEditorView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        IntEditorView.prototype._createInput = function () {
            return dom_1.input({ type: "text" });
        };
        IntEditorView.prototype.renderEditor = function () {
            //$(@inputEl).spinner({step: @model.step})
            this.inputEl.focus();
            this.inputEl.select();
        };
        IntEditorView.prototype.remove = function () {
            //$(@inputEl).spinner("destroy")
            _super.prototype.remove.call(this);
        };
        IntEditorView.prototype.serializeValue = function () {
            return parseInt(this.getValue(), 10) || 0;
        };
        IntEditorView.prototype.loadValue = function (item) {
            _super.prototype.loadValue.call(this, item);
            this.inputEl.defaultValue = this.defaultValue;
            this.inputEl.select();
        };
        IntEditorView.prototype.validateValue = function (value) {
            if (isNaN(value))
                return { valid: false, msg: "Please enter a valid integer" };
            else
                return _super.prototype.validateValue.call(this, value);
        };
        return IntEditorView;
    }(CellEditorView));
    exports.IntEditorView = IntEditorView;
    var IntEditor = /** @class */ (function (_super) {
        tslib_1.__extends(IntEditor, _super);
        function IntEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        IntEditor.initClass = function () {
            this.prototype.type = 'IntEditor';
            this.prototype.default_view = IntEditorView;
            this.define({
                step: [p.Number, 1],
            });
        };
        return IntEditor;
    }(CellEditor));
    exports.IntEditor = IntEditor;
    IntEditor.initClass();
    var NumberEditorView = /** @class */ (function (_super) {
        tslib_1.__extends(NumberEditorView, _super);
        function NumberEditorView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NumberEditorView.prototype._createInput = function () {
            return dom_1.input({ type: "text" });
        };
        NumberEditorView.prototype.renderEditor = function () {
            //$(@inputEl).spinner({step: @model.step})
            this.inputEl.focus();
            this.inputEl.select();
        };
        NumberEditorView.prototype.remove = function () {
            //$(@inputEl).spinner("destroy")
            _super.prototype.remove.call(this);
        };
        NumberEditorView.prototype.serializeValue = function () {
            return parseFloat(this.getValue()) || 0.0;
        };
        NumberEditorView.prototype.loadValue = function (item) {
            _super.prototype.loadValue.call(this, item);
            this.inputEl.defaultValue = this.defaultValue;
            this.inputEl.select();
        };
        NumberEditorView.prototype.validateValue = function (value) {
            if (isNaN(value))
                return { valid: false, msg: "Please enter a valid number" };
            else
                return _super.prototype.validateValue.call(this, value);
        };
        return NumberEditorView;
    }(CellEditorView));
    exports.NumberEditorView = NumberEditorView;
    var NumberEditor = /** @class */ (function (_super) {
        tslib_1.__extends(NumberEditor, _super);
        function NumberEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NumberEditor.initClass = function () {
            this.prototype.type = 'NumberEditor';
            this.prototype.default_view = NumberEditorView;
            this.define({
                step: [p.Number, 0.01],
            });
        };
        return NumberEditor;
    }(CellEditor));
    exports.NumberEditor = NumberEditor;
    NumberEditor.initClass();
    var TimeEditorView = /** @class */ (function (_super) {
        tslib_1.__extends(TimeEditorView, _super);
        function TimeEditorView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimeEditorView.prototype._createInput = function () {
            return dom_1.input({ type: "text" });
        };
        return TimeEditorView;
    }(CellEditorView));
    exports.TimeEditorView = TimeEditorView;
    var TimeEditor = /** @class */ (function (_super) {
        tslib_1.__extends(TimeEditor, _super);
        function TimeEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimeEditor.initClass = function () {
            this.prototype.type = 'TimeEditor';
            this.prototype.default_view = TimeEditorView;
        };
        return TimeEditor;
    }(CellEditor));
    exports.TimeEditor = TimeEditor;
    TimeEditor.initClass();
    var DateEditorView = /** @class */ (function (_super) {
        tslib_1.__extends(DateEditorView, _super);
        function DateEditorView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DateEditorView.prototype._createInput = function () {
            return dom_1.input({ type: "text" });
        };
        Object.defineProperty(DateEditorView.prototype, "emptyValue", {
            get: function () {
                return new Date();
            },
            enumerable: true,
            configurable: true
        });
        DateEditorView.prototype.renderEditor = function () {
            //this.calendarOpen = false
            //@$datepicker = $(@inputEl).datepicker({
            //  showOn: "button"
            //  buttonImageOnly: true
            //  beforeShow: () => @calendarOpen = true
            //  onClose: () => @calendarOpen = false
            //})
            //@$datepicker.siblings(".ui-datepicker-trigger").css("vertical-align": "middle")
            //@$datepicker.width(@$datepicker.width() - (14 + 2*4 + 4)) # img width + margins + edge distance
            this.inputEl.focus();
            this.inputEl.select();
        };
        DateEditorView.prototype.destroy = function () {
            //$.datepicker.dpDiv.stop(true, true)
            //@$datepicker.datepicker("hide")
            //@$datepicker.datepicker("destroy")
            _super.prototype.destroy.call(this);
        };
        DateEditorView.prototype.show = function () {
            //if @calendarOpen
            //  $.datepicker.dpDiv.stop(true, true).show()
            _super.prototype.show.call(this);
        };
        DateEditorView.prototype.hide = function () {
            //if @calendarOpen
            //  $.datepicker.dpDiv.stop(true, true).hide()
            _super.prototype.hide.call(this);
        };
        DateEditorView.prototype.position = function ( /*_position*/) {
            //if @calendarOpen
            //  $.datepicker.dpDiv.css(top: position.top + 30, left: position.left)
            return _super.prototype.position.call(this);
        };
        DateEditorView.prototype.getValue = function () { };
        //return @$datepicker.datepicker("getDate").getTime()
        DateEditorView.prototype.setValue = function (_val) { };
        return DateEditorView;
    }(CellEditorView));
    exports.DateEditorView = DateEditorView;
    //@$datepicker.datepicker("setDate", new Date(val))
    var DateEditor = /** @class */ (function (_super) {
        tslib_1.__extends(DateEditor, _super);
        function DateEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DateEditor.initClass = function () {
            this.prototype.type = 'DateEditor';
            this.prototype.default_view = DateEditorView;
        };
        return DateEditor;
    }(CellEditor));
    exports.DateEditor = DateEditor;
    DateEditor.initClass();
}
,
434: /* models/widgets/tables/cell_formatters */ function _(require, module, exports) {
    var tslib_1 = require(391) /* tslib */;
    var Numbro = require(361) /* numbro */;
    var compile_template = require(449) /* underscore.template */;
    var tz = require(390) /* timezone */;
    var p = require(15) /* core/properties */;
    var dom_1 = require(5) /* core/dom */;
    var types_1 = require(44) /* core/util/types */;
    var model_1 = require(59) /* ../../../model */;
    var CellFormatter = /** @class */ (function (_super) {
        tslib_1.__extends(CellFormatter, _super);
        function CellFormatter(attrs) {
            return _super.call(this, attrs) || this;
        }
        CellFormatter.prototype.doFormat = function (_row, _cell, value, _columnDef, _dataContext) {
            if (value == null)
                return "";
            else
                return (value + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        };
        return CellFormatter;
    }(model_1.Model));
    exports.CellFormatter = CellFormatter;
    var StringFormatter = /** @class */ (function (_super) {
        tslib_1.__extends(StringFormatter, _super);
        function StringFormatter(attrs) {
            return _super.call(this, attrs) || this;
        }
        StringFormatter.initClass = function () {
            this.prototype.type = 'StringFormatter';
            this.define({
                font_style: [p.FontStyle, "normal"],
                text_align: [p.TextAlign, "left"],
                text_color: [p.Color],
            });
        };
        StringFormatter.prototype.doFormat = function (_row, _cell, value, _columnDef, _dataContext) {
            var _a = this, font_style = _a.font_style, text_align = _a.text_align, text_color = _a.text_color;
            var text = dom_1.span({}, value == null ? "" : "" + value);
            switch (font_style) {
                case "bold":
                    text.style.fontWeight = "bold";
                    break;
                case "italic":
                    text.style.fontStyle = "italic";
                    break;
            }
            if (text_align != null)
                text.style.textAlign = text_align;
            if (text_color != null)
                text.style.color = text_color;
            return text.outerHTML;
        };
        return StringFormatter;
    }(CellFormatter));
    exports.StringFormatter = StringFormatter;
    StringFormatter.initClass();
    var NumberFormatter = /** @class */ (function (_super) {
        tslib_1.__extends(NumberFormatter, _super);
        function NumberFormatter(attrs) {
            return _super.call(this, attrs) || this;
        }
        NumberFormatter.initClass = function () {
            this.prototype.type = 'NumberFormatter';
            this.define({
                format: [p.String, '0,0'],
                language: [p.String, 'en'],
                rounding: [p.String, 'round'],
            });
        };
        NumberFormatter.prototype.doFormat = function (row, cell, value, columnDef, dataContext) {
            var _this = this;
            var _a = this, format = _a.format, language = _a.language;
            var rounding = (function () {
                switch (_this.rounding) {
                    case "round":
                    case "nearest": return Math.round;
                    case "floor":
                    case "rounddown": return Math.floor;
                    case "ceil":
                    case "roundup": return Math.ceil;
                }
            })();
            value = Numbro.format(value, format, language, rounding);
            return _super.prototype.doFormat.call(this, row, cell, value, columnDef, dataContext);
        };
        return NumberFormatter;
    }(StringFormatter));
    exports.NumberFormatter = NumberFormatter;
    NumberFormatter.initClass();
    var BooleanFormatter = /** @class */ (function (_super) {
        tslib_1.__extends(BooleanFormatter, _super);
        function BooleanFormatter(attrs) {
            return _super.call(this, attrs) || this;
        }
        BooleanFormatter.initClass = function () {
            this.prototype.type = 'BooleanFormatter';
            this.define({
                icon: [p.String, 'check'],
            });
        };
        BooleanFormatter.prototype.doFormat = function (_row, _cell, value, _columnDef, _dataContext) {
            return !!value ? dom_1.i({ class: this.icon }).outerHTML : "";
        };
        return BooleanFormatter;
    }(CellFormatter));
    exports.BooleanFormatter = BooleanFormatter;
    BooleanFormatter.initClass();
    var DateFormatter = /** @class */ (function (_super) {
        tslib_1.__extends(DateFormatter, _super);
        function DateFormatter(attrs) {
            return _super.call(this, attrs) || this;
        }
        DateFormatter.initClass = function () {
            this.prototype.type = 'DateFormatter';
            this.define({
                format: [p.String, 'ISO-8601'],
            });
        };
        DateFormatter.prototype.getFormat = function () {
            // using definitions provided here: https://api.jqueryui.com/datepicker/
            // except not implementing TICKS
            switch (this.format) {
                case "ATOM":
                case "W3C":
                case "RFC-3339":
                case "ISO-8601":
                    return "%Y-%m-%d";
                case "COOKIE":
                    return "%a, %d %b %Y";
                case "RFC-850":
                    return "%A, %d-%b-%y";
                case "RFC-1123":
                case "RFC-2822":
                    return "%a, %e %b %Y";
                case "RSS":
                case "RFC-822":
                case "RFC-1036":
                    return "%a, %e %b %y";
                case "TIMESTAMP":
                    return undefined;
                default:
                    return this.format;
            }
        };
        DateFormatter.prototype.doFormat = function (row, cell, value, columnDef, dataContext) {
            value = types_1.isString(value) ? parseInt(value, 10) : value;
            var date = tz(value, this.getFormat());
            return _super.prototype.doFormat.call(this, row, cell, date, columnDef, dataContext);
        };
        return DateFormatter;
    }(CellFormatter));
    exports.DateFormatter = DateFormatter;
    DateFormatter.initClass();
    var HTMLTemplateFormatter = /** @class */ (function (_super) {
        tslib_1.__extends(HTMLTemplateFormatter, _super);
        function HTMLTemplateFormatter(attrs) {
            return _super.call(this, attrs) || this;
        }
        HTMLTemplateFormatter.initClass = function () {
            this.prototype.type = 'HTMLTemplateFormatter';
            this.define({
                template: [p.String, '<%= value %>'],
            });
        };
        HTMLTemplateFormatter.prototype.doFormat = function (_row, _cell, value, _columnDef, dataContext) {
            var template = this.template;
            if (value == null)
                return "";
            else {
                var compiled_template = compile_template(template);
                var context = tslib_1.__assign({}, dataContext, { value: value });
                return compiled_template(context);
            }
        };
        return HTMLTemplateFormatter;
    }(CellFormatter));
    exports.HTMLTemplateFormatter = HTMLTemplateFormatter;
    HTMLTemplateFormatter.initClass();
}
,
435: /* models/widgets/tables/data_table */ function _(require, module, exports) {
    var tslib_1 = require(391) /* tslib */;
    var SlickGrid = require(447) /* slickgrid */.Grid;
    var RowSelectionModel = require(445) /* slickgrid/plugins/slick.rowselectionmodel */.RowSelectionModel;
    var CheckboxSelectColumn = require(444) /* slickgrid/plugins/slick.checkboxselectcolumn */.CheckboxSelectColumn;
    var p = require(15) /* core/properties */;
    var string_1 = require(38) /* core/util/string */;
    var array_1 = require(21) /* core/util/array */;
    var object_1 = require(32) /* core/util/object */;
    var logging_1 = require(14) /* core/logging */;
    var table_widget_1 = require(439) /* ./table_widget */;
    var widget_1 = require(440) /* ../widget */;
    exports.DTINDEX_NAME = "__bkdt_internal_index__";
    var DataProvider = /** @class */ (function () {
        function DataProvider(source, view) {
            this.source = source;
            this.view = view;
            if (exports.DTINDEX_NAME in this.source.data)
                throw new Error("special name " + exports.DTINDEX_NAME + " cannot be used as a data table column");
            this.index = this.view.indices;
        }
        DataProvider.prototype.getLength = function () {
            return this.index.length;
        };
        DataProvider.prototype.getItem = function (offset) {
            var item = {};
            for (var _i = 0, _a = object_1.keys(this.source.data); _i < _a.length; _i++) {
                var field = _a[_i];
                item[field] = this.source.data[field][this.index[offset]];
            }
            item[exports.DTINDEX_NAME] = this.index[offset];
            return item;
        };
        DataProvider.prototype.getField = function (offset, field) {
            // offset is the
            if (field == exports.DTINDEX_NAME) {
                return this.index[offset];
            }
            return this.source.data[field][this.index[offset]];
        };
        DataProvider.prototype.setField = function (offset, field, value) {
            // field assumed never to be internal index name (ctor would throw)
            var patches = {};
            var index = this.index[offset];
            patches[field] = [[index, value]];
            this.source.patch(patches);
        };
        DataProvider.prototype.getItemMetadata = function (_index) {
            return null;
        };
        DataProvider.prototype.getRecords = function () {
            var _this = this;
            return array_1.range(0, this.getLength()).map(function (i) { return _this.getItem(i); });
        };
        DataProvider.prototype.sort = function (columns) {
            var cols = columns.map(function (column) { return [column.sortCol.field, column.sortAsc ? 1 : -1]; });
            if (cols.length == 0) {
                cols = [[exports.DTINDEX_NAME, 1]];
            }
            var records = this.getRecords();
            var old_index = this.index.slice();
            this.index.sort(function (i1, i2) {
                for (var _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
                    var _a = cols_1[_i], field = _a[0], sign = _a[1];
                    var value1 = records[old_index.indexOf(i1)][field];
                    var value2 = records[old_index.indexOf(i2)][field];
                    var result = value1 == value2 ? 0 : value1 > value2 ? sign : -sign;
                    if (result != 0)
                        return result;
                }
                return 0;
            });
        };
        return DataProvider;
    }());
    exports.DataProvider = DataProvider;
    var DataTableView = /** @class */ (function (_super) {
        tslib_1.__extends(DataTableView, _super);
        function DataTableView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._in_selection_update = false;
            _this._warned_not_reorderable = false;
            return _this;
        }
        DataTableView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            this.connect(this.model.change, function () { return _this.render(); });
            this.connect(this.model.source.streaming, function () { return _this.updateGrid(); });
            this.connect(this.model.source.patching, function () { return _this.updateGrid(); });
            this.connect(this.model.source.change, function () { return _this.updateGrid(); });
            this.connect(this.model.source.properties.data.change, function () { return _this.updateGrid(); });
            this.connect(this.model.source.selected.change, function () { return _this.updateSelection(); });
            this.connect(this.model.source.selected.properties.indices.change, function () { return _this.updateSelection(); });
        };
        DataTableView.prototype.updateGrid = function () {
            var _this = this;
            // TODO (bev) This is to ensure that CDSView indices are properly computed
            // before passing to the DataProvider. This will result in extra calls to
            // compute_indices. This "over execution" will be addressed in a more
            // general look at events
            this.model.view.compute_indices();
            this.data.constructor(this.model.source, this.model.view);
            // This is obnoxious but there is no better way to programmatically force
            // a re-sort on the existing sorted columns until/if we start using DataView
            var columns = this.grid.getColumns();
            var sorters = this.grid.getSortColumns().map(function (x) {
                return ({
                    sortCol: {
                        field: columns[_this.grid.getColumnIndex(x.columnId)].field,
                    },
                    sortAsc: x.sortAsc,
                });
            });
            this.data.sort(sorters);
            this.grid.invalidate();
            this.grid.render();
        };
        DataTableView.prototype.updateSelection = function () {
            var _this = this;
            if (this._in_selection_update)
                return;
            var selected = this.model.source.selected;
            var permuted_indices = selected.indices.map(function (x) { return _this.data.index.indexOf(x); });
            this._in_selection_update = true;
            this.grid.setSelectedRows(permuted_indices);
            this._in_selection_update = false;
            // If the selection is not in the current slickgrid viewport, scroll the
            // datatable to start at the row before the first selected row, so that
            // the selection is immediately brought into view. We don't scroll when
            // the selection is already in the viewport so that selecting from the
            // datatable itself does not re-scroll.
            var cur_grid_range = this.grid.getViewport();
            var scroll_index = this.model.get_scroll_index(cur_grid_range, permuted_indices);
            if (scroll_index != null)
                this.grid.scrollRowToTop(scroll_index);
        };
        DataTableView.prototype.newIndexColumn = function () {
            return {
                id: string_1.uniqueId(),
                name: this.model.index_header,
                field: exports.DTINDEX_NAME,
                width: this.model.index_width,
                behavior: "select",
                cannotTriggerInsert: true,
                resizable: false,
                selectable: false,
                sortable: true,
                cssClass: "bk-cell-index",
                headerCssClass: "bk-header-index",
            };
        };
        DataTableView.prototype.css_classes = function () {
            return _super.prototype.css_classes.call(this).concat("bk-data-table");
        };
        DataTableView.prototype.render = function () {
            var _this = this;
            var checkboxSelector;
            var columns = this.model.columns.map(function (column) { return column.toColumn(); });
            if (this.model.selectable == "checkbox") {
                checkboxSelector = new CheckboxSelectColumn({ cssClass: "bk-cell-select" });
                columns.unshift(checkboxSelector.getColumnDefinition());
            }
            if (this.model.index_position != null) {
                var index_position = this.model.index_position;
                var index = this.newIndexColumn();
                // This is to be able to provide negative index behaviour that
                // matches what python users will expect
                if (index_position == -1) {
                    columns.push(index);
                }
                else if (index_position < -1) {
                    columns.splice(index_position + 1, 0, index);
                }
                else {
                    columns.splice(index_position, 0, index);
                }
            }
            var reorderable = this.model.reorderable;
            if (reorderable && !(typeof $ !== "undefined" && $.fn != null && $.fn.sortable != null)) {
                if (!this._warned_not_reorderable) {
                    logging_1.logger.warn("jquery-ui is required to enable DataTable.reorderable");
                    this._warned_not_reorderable = true;
                }
                reorderable = false;
            }
            var options = {
                enableCellNavigation: this.model.selectable !== false,
                enableColumnReorder: reorderable,
                forceFitColumns: this.model.fit_columns,
                autoHeight: this.model.height == "auto",
                multiColumnSort: this.model.sortable,
                editable: this.model.editable,
                autoEdit: false,
            };
            if (this.model.width != null)
                this.el.style.width = this.model.width + "px";
            else
                this.el.style.width = this.model.default_width + "px";
            if (this.model.height != null && this.model.height != "auto")
                this.el.style.height = this.model.height + "px";
            this.data = new DataProvider(this.model.source, this.model.view);
            this.grid = new SlickGrid(this.el, this.data, columns, options);
            this.grid.onSort.subscribe(function (_event, args) {
                columns = args.sortCols;
                _this.data.sort(columns);
                _this.grid.invalidate();
                _this.updateSelection();
                _this.grid.render();
                if (!_this.model.header_row) {
                    _this._hide_header();
                }
            });
            if (this.model.selectable !== false) {
                this.grid.setSelectionModel(new RowSelectionModel({ selectActiveRow: checkboxSelector == null }));
                if (checkboxSelector != null)
                    this.grid.registerPlugin(checkboxSelector);
                this.grid.onSelectedRowsChanged.subscribe(function (_event, args) {
                    if (_this._in_selection_update) {
                        return;
                    }
                    _this.model.source.selected.indices = args.rows.map(function (i) { return _this.data.index[i]; });
                });
                this.updateSelection();
                if (!this.model.header_row) {
                    this._hide_header();
                }
            }
        };
        DataTableView.prototype._hide_header = function () {
            for (var _i = 0, _a = Array.from(this.el.querySelectorAll('.slick-header-columns')); _i < _a.length; _i++) {
                var el = _a[_i];
                el.style.height = "0px";
            }
            this.grid.resizeCanvas();
        };
        return DataTableView;
    }(widget_1.WidgetView));
    exports.DataTableView = DataTableView;
    var DataTable = /** @class */ (function (_super) {
        tslib_1.__extends(DataTable, _super);
        function DataTable(attrs) {
            var _this = _super.call(this, attrs) || this;
            _this.default_width = 600;
            return _this;
        }
        DataTable.initClass = function () {
            this.prototype.type = 'DataTable';
            this.prototype.default_view = DataTableView;
            this.define({
                columns: [p.Array, []],
                fit_columns: [p.Bool, true],
                sortable: [p.Bool, true],
                reorderable: [p.Bool, true],
                editable: [p.Bool, false],
                selectable: [p.Any, true],
                index_position: [p.Int, 0],
                index_header: [p.String, "#"],
                index_width: [p.Int, 40],
                scroll_to_selection: [p.Bool, true],
                header_row: [p.Bool, true],
            });
            this.override({
                height: 400,
            });
        };
        DataTable.prototype.get_scroll_index = function (grid_range, selected_indices) {
            if (!this.scroll_to_selection || (selected_indices.length == 0))
                return null;
            if (!array_1.any(selected_indices, function (i) { return grid_range.top <= i && i <= grid_range.bottom; })) {
                return Math.max(0, Math.min.apply(Math, selected_indices) - 1);
            }
            return null;
        };
        return DataTable;
    }(table_widget_1.TableWidget));
    exports.DataTable = DataTable;
    DataTable.initClass();
}
,
436: /* models/widgets/tables/index */ function _(require, module, exports) {
    var tslib_1 = require(391) /* tslib */;
    tslib_1.__exportStar(require(433) /* ./cell_editors */, exports);
    tslib_1.__exportStar(require(434) /* ./cell_formatters */, exports);
    var data_table_1 = require(435) /* ./data_table */;
    exports.DataTable = data_table_1.DataTable;
    var table_column_1 = require(438) /* ./table_column */;
    exports.TableColumn = table_column_1.TableColumn;
    var table_widget_1 = require(439) /* ./table_widget */;
    exports.TableWidget = table_widget_1.TableWidget;
}
,
437: /* models/widgets/tables/main */ function _(require, module, exports) {
    var Tables = require(436) /* ./index */;
    exports.Tables = Tables;
    var base_1 = require(0) /* ../../../base */;
    base_1.register_models(Tables);
}
,
438: /* models/widgets/tables/table_column */ function _(require, module, exports) {
    var tslib_1 = require(391) /* tslib */;
    var cell_formatters_1 = require(434) /* ./cell_formatters */;
    var cell_editors_1 = require(433) /* ./cell_editors */;
    var p = require(15) /* core/properties */;
    var string_1 = require(38) /* core/util/string */;
    var model_1 = require(59) /* ../../../model */;
    var TableColumn = /** @class */ (function (_super) {
        tslib_1.__extends(TableColumn, _super);
        function TableColumn(attrs) {
            return _super.call(this, attrs) || this;
        }
        TableColumn.initClass = function () {
            this.prototype.type = 'TableColumn';
            this.define({
                field: [p.String],
                title: [p.String],
                width: [p.Number, 300],
                formatter: [p.Instance, function () { return new cell_formatters_1.StringFormatter(); }],
                editor: [p.Instance, function () { return new cell_editors_1.StringEditor(); }],
                sortable: [p.Bool, true],
                default_sort: [p.String, "ascending"],
            });
        };
        TableColumn.prototype.toColumn = function () {
            return {
                id: string_1.uniqueId(),
                field: this.field,
                name: this.title,
                width: this.width,
                formatter: this.formatter != null ? this.formatter.doFormat.bind(this.formatter) : undefined,
                model: this.editor,
                editor: this.editor.default_view,
                sortable: this.sortable,
                defaultSortAsc: this.default_sort == "ascending",
            };
        };
        return TableColumn;
    }(model_1.Model));
    exports.TableColumn = TableColumn;
    TableColumn.initClass();
}
,
439: /* models/widgets/tables/table_widget */ function _(require, module, exports) {
    var tslib_1 = require(391) /* tslib */;
    var widget_1 = require(440) /* ../widget */;
    var cds_view_1 = require(199) /* ../../sources/cds_view */;
    var p = require(15) /* core/properties */;
    var TableWidget = /** @class */ (function (_super) {
        tslib_1.__extends(TableWidget, _super);
        function TableWidget(attrs) {
            return _super.call(this, attrs) || this;
        }
        TableWidget.initClass = function () {
            this.prototype.type = "TableWidget";
            this.define({
                source: [p.Instance],
                view: [p.Instance, function () { return new cds_view_1.CDSView(); }],
            });
        };
        TableWidget.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            if (this.view.source == null) {
                this.view.source = this.source;
                this.view.compute_indices();
            }
        };
        return TableWidget;
    }(widget_1.Widget));
    exports.TableWidget = TableWidget;
    TableWidget.initClass();
}
,
440: /* models/widgets/widget */ function _(require, module, exports) {
    var tslib_1 = require(391) /* tslib */;
    var layout_dom_1 = require(157) /* ../layouts/layout_dom */;
    var WidgetView = /** @class */ (function (_super) {
        tslib_1.__extends(WidgetView, _super);
        function WidgetView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WidgetView.prototype.css_classes = function () {
            return _super.prototype.css_classes.call(this).concat("bk-widget");
        };
        WidgetView.prototype.render = function () {
            this._render_classes(); // XXX: because no super()
            // LayoutDOMView sets up lots of helpful things, but
            // it's render method is not suitable for widgets - who
            // should provide their own.
            if (this.model.height != null)
                this.el.style.height = this.model.height + "px";
            if (this.model.width != null)
                this.el.style.width = this.model.width + "px";
        };
        WidgetView.prototype.get_width = function () {
            throw new Error("unused");
        };
        WidgetView.prototype.get_height = function () {
            throw new Error("unused");
        };
        return WidgetView;
    }(layout_dom_1.LayoutDOMView));
    exports.WidgetView = WidgetView;
    var Widget = /** @class */ (function (_super) {
        tslib_1.__extends(Widget, _super);
        function Widget(attrs) {
            return _super.call(this, attrs) || this;
        }
        Widget.initClass = function () {
            this.prototype.type = "Widget";
        };
        return Widget;
    }(layout_dom_1.LayoutDOM));
    exports.Widget = Widget;
    Widget.initClass();
}
,
441: /* jquery/dist/jquery */ function _(require, module, exports) {
    /*!
     * jQuery JavaScript Library v3.2.1
     * https://jquery.com/
     *
     * Includes Sizzle.js
     * https://sizzlejs.com/
     *
     * Copyright JS Foundation and other contributors
     * Released under the MIT license
     * https://jquery.org/license
     *
     * Date: 2017-03-20T18:59Z
     */
    (function (global, factory) {
        "use strict";
        if (typeof module === "object" && typeof module.exports === "object") {
            // For CommonJS and CommonJS-like environments where a proper `window`
            // is present, execute the factory and get jQuery.
            // For environments that do not have a `window` with a `document`
            // (such as Node.js), expose a factory as module.exports.
            // This accentuates the need for the creation of a real `window`.
            // e.g. var jQuery = require("jquery")(window);
            // See ticket #14549 for more info.
            module.exports = global.document ?
                factory(global, true) :
                function (w) {
                    if (!w.document) {
                        throw new Error("jQuery requires a window with a document");
                    }
                    return factory(w);
                };
        }
        else {
            factory(global);
        }
        // Pass this if window is not defined yet
    })(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
        // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
        // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
        // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
        // enough that all such attempts are guarded in a try block.
        "use strict";
        var arr = [];
        var document = window.document;
        var getProto = Object.getPrototypeOf;
        var slice = arr.slice;
        var concat = arr.concat;
        var push = arr.push;
        var indexOf = arr.indexOf;
        var class2type = {};
        var toString = class2type.toString;
        var hasOwn = class2type.hasOwnProperty;
        var fnToString = hasOwn.toString;
        var ObjectFunctionString = fnToString.call(Object);
        var support = {};
        function DOMEval(code, doc) {
            doc = doc || document;
            var script = doc.createElement("script");
            script.text = code;
            doc.head.appendChild(script).parentNode.removeChild(script);
        }
        /* global Symbol */
        // Defining this global in .eslintrc.json would create a danger of using the global
        // unguarded in another place, it seems safer to define global only for this module
        var version = "3.2.1", 
        // Define a local copy of jQuery
        jQuery = function (selector, context) {
            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init(selector, context);
        }, 
        // Support: Android <=4.0 only
        // Make sure we trim BOM and NBSP
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, 
        // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g, 
        // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function (all, letter) {
            return letter.toUpperCase();
        };
        jQuery.fn = jQuery.prototype = {
            // The current version of jQuery being used
            jquery: version,
            constructor: jQuery,
            // The default length of a jQuery object is 0
            length: 0,
            toArray: function () {
                return slice.call(this);
            },
            // Get the Nth element in the matched element set OR
            // Get the whole matched element set as a clean array
            get: function (num) {
                // Return all the elements in a clean array
                if (num == null) {
                    return slice.call(this);
                }
                // Return just the one element from the set
                return num < 0 ? this[num + this.length] : this[num];
            },
            // Take an array of elements and push it onto the stack
            // (returning the new matched element set)
            pushStack: function (elems) {
                // Build a new jQuery matched element set
                var ret = jQuery.merge(this.constructor(), elems);
                // Add the old object onto the stack (as a reference)
                ret.prevObject = this;
                // Return the newly-formed element set
                return ret;
            },
            // Execute a callback for every element in the matched set.
            each: function (callback) {
                return jQuery.each(this, callback);
            },
            map: function (callback) {
                return this.pushStack(jQuery.map(this, function (elem, i) {
                    return callback.call(elem, i, elem);
                }));
            },
            slice: function () {
                return this.pushStack(slice.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            eq: function (i) {
                var len = this.length, j = +i + (i < 0 ? len : 0);
                return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor();
            },
            // For internal use only.
            // Behaves like an Array's method, not like a jQuery method.
            push: push,
            sort: arr.sort,
            splice: arr.splice
        };
        jQuery.extend = jQuery.fn.extend = function () {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
            // Handle a deep copy situation
            if (typeof target === "boolean") {
                deep = target;
                // Skip the boolean and the target
                target = arguments[i] || {};
                i++;
            }
            // Handle case when target is a string or something (possible in deep copy)
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                target = {};
            }
            // Extend jQuery itself if only one argument is passed
            if (i === length) {
                target = this;
                i--;
            }
            for (; i < length; i++) {
                // Only deal with non-null/undefined values
                if ((options = arguments[i]) != null) {
                    // Extend the base object
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        // Prevent never-ending loop
                        if (target === copy) {
                            continue;
                        }
                        // Recurse if we're merging plain objects or arrays
                        if (deep && copy && (jQuery.isPlainObject(copy) ||
                            (copyIsArray = Array.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && Array.isArray(src) ? src : [];
                            }
                            else {
                                clone = src && jQuery.isPlainObject(src) ? src : {};
                            }
                            // Never move original objects, clone them
                            target[name] = jQuery.extend(deep, clone, copy);
                            // Don't bring in undefined values
                        }
                        else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            // Return the modified object
            return target;
        };
        jQuery.extend({
            // Unique for each copy of jQuery on the page
            expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
            // Assume jQuery is ready without the ready module
            isReady: true,
            error: function (msg) {
                throw new Error(msg);
            },
            noop: function () { },
            isFunction: function (obj) {
                return jQuery.type(obj) === "function";
            },
            isWindow: function (obj) {
                return obj != null && obj === obj.window;
            },
            isNumeric: function (obj) {
                // As of jQuery 3.0, isNumeric is limited to
                // strings and numbers (primitives or objects)
                // that can be coerced to finite numbers (gh-2662)
                var type = jQuery.type(obj);
                return (type === "number" || type === "string") &&
                    // parseFloat NaNs numeric-cast false positives ("")
                    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
                    // subtraction forces infinities to NaN
                    !isNaN(obj - parseFloat(obj));
            },
            isPlainObject: function (obj) {
                var proto, Ctor;
                // Detect obvious negatives
                // Use toString instead of jQuery.type to catch host objects
                if (!obj || toString.call(obj) !== "[object Object]") {
                    return false;
                }
                proto = getProto(obj);
                // Objects with no prototype (e.g., `Object.create( null )`) are plain
                if (!proto) {
                    return true;
                }
                // Objects with prototype are plain iff they were constructed by a global Object function
                Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
                return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
            },
            isEmptyObject: function (obj) {
                /* eslint-disable no-unused-vars */
                // See https://github.com/eslint/eslint/issues/6125
                var name;
                for (name in obj) {
                    return false;
                }
                return true;
            },
            type: function (obj) {
                if (obj == null) {
                    return obj + "";
                }
                // Support: Android <=2.3 only (functionish RegExp)
                return typeof obj === "object" || typeof obj === "function" ?
                    class2type[toString.call(obj)] || "object" :
                    typeof obj;
            },
            // Evaluates a script in a global context
            globalEval: function (code) {
                DOMEval(code);
            },
            // Convert dashed to camelCase; used by the css and data modules
            // Support: IE <=9 - 11, Edge 12 - 13
            // Microsoft forgot to hump their vendor prefix (#9572)
            camelCase: function (string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
            },
            each: function (obj, callback) {
                var length, i = 0;
                if (isArrayLike(obj)) {
                    length = obj.length;
                    for (; i < length; i++) {
                        if (callback.call(obj[i], i, obj[i]) === false) {
                            break;
                        }
                    }
                }
                else {
                    for (i in obj) {
                        if (callback.call(obj[i], i, obj[i]) === false) {
                            break;
                        }
                    }
                }
                return obj;
            },
            // Support: Android <=4.0 only
            trim: function (text) {
                return text == null ?
                    "" :
                    (text + "").replace(rtrim, "");
            },
            // results is for internal usage only
            makeArray: function (arr, results) {
                var ret = results || [];
                if (arr != null) {
                    if (isArrayLike(Object(arr))) {
                        jQuery.merge(ret, typeof arr === "string" ?
                            [arr] : arr);
                    }
                    else {
                        push.call(ret, arr);
                    }
                }
                return ret;
            },
            inArray: function (elem, arr, i) {
                return arr == null ? -1 : indexOf.call(arr, elem, i);
            },
            // Support: Android <=4.0 only, PhantomJS 1 only
            // push.apply(_, arraylike) throws on ancient WebKit
            merge: function (first, second) {
                var len = +second.length, j = 0, i = first.length;
                for (; j < len; j++) {
                    first[i++] = second[j];
                }
                first.length = i;
                return first;
            },
            grep: function (elems, callback, invert) {
                var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
                // Go through the array, only saving the items
                // that pass the validator function
                for (; i < length; i++) {
                    callbackInverse = !callback(elems[i], i);
                    if (callbackInverse !== callbackExpect) {
                        matches.push(elems[i]);
                    }
                }
                return matches;
            },
            // arg is for internal usage only
            map: function (elems, callback, arg) {
                var length, value, i = 0, ret = [];
                // Go through the array, translating each of the items to their new values
                if (isArrayLike(elems)) {
                    length = elems.length;
                    for (; i < length; i++) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret.push(value);
                        }
                    }
                    // Go through every key on the object,
                }
                else {
                    for (i in elems) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret.push(value);
                        }
                    }
                }
                // Flatten any nested arrays
                return concat.apply([], ret);
            },
            // A global GUID counter for objects
            guid: 1,
            // Bind a function to a context, optionally partially applying any
            // arguments.
            proxy: function (fn, context) {
                var tmp, args, proxy;
                if (typeof context === "string") {
                    tmp = fn[context];
                    context = fn;
                    fn = tmp;
                }
                // Quick check to determine if target is callable, in the spec
                // this throws a TypeError, but we will just return undefined.
                if (!jQuery.isFunction(fn)) {
                    return undefined;
                }
                // Simulated bind
                args = slice.call(arguments, 2);
                proxy = function () {
                    return fn.apply(context || this, args.concat(slice.call(arguments)));
                };
                // Set the guid of unique handler to the same of original handler, so it can be removed
                proxy.guid = fn.guid = fn.guid || jQuery.guid++;
                return proxy;
            },
            now: Date.now,
            // jQuery.support is not used in Core but other projects attach their
            // properties to it so it needs to exist.
            support: support
        });
        if (typeof Symbol === "function") {
            jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
        }
        // Populate the class2type map
        jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });
        function isArrayLike(obj) {
            // Support: real iOS 8.2 only (not reproducible in simulator)
            // `in` check used to prevent JIT error (gh-2145)
            // hasOwn isn't used here due to false negatives
            // regarding Nodelist length in IE
            var length = !!obj && "length" in obj && obj.length, type = jQuery.type(obj);
            if (type === "function" || jQuery.isWindow(obj)) {
                return false;
            }
            return type === "array" || length === 0 ||
                typeof length === "number" && length > 0 && (length - 1) in obj;
        }
        var Sizzle = 
        /*!
         * Sizzle CSS Selector Engine v2.3.3
         * https://sizzlejs.com/
         *
         * Copyright jQuery Foundation and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2016-08-08
         */
        (function (window) {
            var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, 
            // Local document vars
            setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, 
            // Instance-specific data
            expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function (a, b) {
                if (a === b) {
                    hasDuplicate = true;
                }
                return 0;
            }, 
            // Instance methods
            hasOwn = ({}).hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, 
            // Use a stripped-down indexOf as it's faster than native
            // https://jsperf.com/thor-indexof-vs-for/5
            indexOf = function (list, elem) {
                var i = 0, len = list.length;
                for (; i < len; i++) {
                    if (list[i] === elem) {
                        return i;
                    }
                }
                return -1;
            }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", 
            // Regular expressions
            // http://www.w3.org/TR/css3-selectors/#whitespace
            whitespace = "[\\x20\\t\\r\\n\\f]", 
            // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
            identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", 
            // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
            attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
                // Operator (capture 2)
                "*([*^$|!~]?=)" + whitespace +
                // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
                "*\\]", pseudos = ":(" + identifier + ")(?:\\((" +
                // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                // 1. quoted (capture 3; capture 4 or capture 5)
                "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                // 2. simple (capture 6)
                "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                // 3. anything else (capture 2)
                ".*" +
                ")\\)|)", 
            // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
            rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
                "ID": new RegExp("^#(" + identifier + ")"),
                "CLASS": new RegExp("^\\.(" + identifier + ")"),
                "TAG": new RegExp("^(" + identifier + "|[*])"),
                "ATTR": new RegExp("^" + attributes),
                "PSEUDO": new RegExp("^" + pseudos),
                "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                    "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                    "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                // For use in libraries implementing .is()
                // We use this for POS matching in `select`
                "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
            }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, 
            // Easily-parseable/retrievable ID or TAG or CLASS selectors
            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, 
            // CSS escapes
            // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
            runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function (_, escaped, escapedWhitespace) {
                var high = "0x" + escaped - 0x10000;
                // NaN means non-codepoint
                // Support: Firefox<24
                // Workaround erroneous numeric interpretation of +"0x"
                return high !== high || escapedWhitespace ?
                    escaped :
                    high < 0 ?
                        // BMP codepoint
                        String.fromCharCode(high + 0x10000) :
                        // Supplemental Plane codepoint (surrogate pair)
                        String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
            }, 
            // CSS string/identifier serialization
            // https://drafts.csswg.org/cssom/#common-serializing-idioms
            rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = function (ch, asCodePoint) {
                if (asCodePoint) {
                    // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                    if (ch === "\0") {
                        return "\uFFFD";
                    }
                    // Control characters and (dependent upon position) numbers get escaped as code points
                    return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
                }
                // Other potentially-special ASCII characters get backslash-escaped
                return "\\" + ch;
            }, 
            // Used for iframes
            // See setDocument()
            // Removing the function wrapper causes a "Permission Denied"
            // error in IE
            unloadHandler = function () {
                setDocument();
            }, disabledAncestor = addCombinator(function (elem) {
                return elem.disabled === true && ("form" in elem || "label" in elem);
            }, { dir: "parentNode", next: "legend" });
            // Optimize for push.apply( _, NodeList )
            try {
                push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[preferredDoc.childNodes.length].nodeType;
            }
            catch (e) {
                push = { apply: arr.length ?
                        // Leverage slice if possible
                        function (target, els) {
                            push_native.apply(target, slice.call(els));
                        } :
                        // Support: IE<9
                        // Otherwise append directly
                        function (target, els) {
                            var j = target.length, i = 0;
                            // Can't trust NodeList.length
                            while ((target[j++] = els[i++])) { }
                            target.length = j - 1;
                        }
                };
            }
            function Sizzle(selector, context, results, seed) {
                var m, i, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, 
                // nodeType defaults to 9, since context defaults to document
                nodeType = context ? context.nodeType : 9;
                results = results || [];
                // Return early from calls with invalid selector or context
                if (typeof selector !== "string" || !selector ||
                    nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                    return results;
                }
                // Try to shortcut find operations (as opposed to filters) in HTML documents
                if (!seed) {
                    if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                        setDocument(context);
                    }
                    context = context || document;
                    if (documentIsHTML) {
                        // If the selector is sufficiently simple, try using a "get*By*" DOM method
                        // (excepting DocumentFragment context, where the methods don't exist)
                        if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                            // ID selector
                            if ((m = match[1])) {
                                // Document context
                                if (nodeType === 9) {
                                    if ((elem = context.getElementById(m))) {
                                        // Support: IE, Opera, Webkit
                                        // TODO: identify versions
                                        // getElementById can match elements by name instead of ID
                                        if (elem.id === m) {
                                            results.push(elem);
                                            return results;
                                        }
                                    }
                                    else {
                                        return results;
                                    }
                                    // Element context
                                }
                                else {
                                    // Support: IE, Opera, Webkit
                                    // TODO: identify versions
                                    // getElementById can match elements by name instead of ID
                                    if (newContext && (elem = newContext.getElementById(m)) &&
                                        contains(context, elem) &&
                                        elem.id === m) {
                                        results.push(elem);
                                        return results;
                                    }
                                }
                                // Type selector
                            }
                            else if (match[2]) {
                                push.apply(results, context.getElementsByTagName(selector));
                                return results;
                                // Class selector
                            }
                            else if ((m = match[3]) && support.getElementsByClassName &&
                                context.getElementsByClassName) {
                                push.apply(results, context.getElementsByClassName(m));
                                return results;
                            }
                        }
                        // Take advantage of querySelectorAll
                        if (support.qsa &&
                            !compilerCache[selector + " "] &&
                            (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                            if (nodeType !== 1) {
                                newContext = context;
                                newSelector = selector;
                                // qSA looks outside Element context, which is not what we want
                                // Thanks to Andrew Dupont for this workaround technique
                                // Support: IE <=8
                                // Exclude object elements
                            }
                            else if (context.nodeName.toLowerCase() !== "object") {
                                // Capture the context ID, setting it first if necessary
                                if ((nid = context.getAttribute("id"))) {
                                    nid = nid.replace(rcssescape, fcssescape);
                                }
                                else {
                                    context.setAttribute("id", (nid = expando));
                                }
                                // Prefix every selector in the list
                                groups = tokenize(selector);
                                i = groups.length;
                                while (i--) {
                                    groups[i] = "#" + nid + " " + toSelector(groups[i]);
                                }
                                newSelector = groups.join(",");
                                // Expand context for sibling selectors
                                newContext = rsibling.test(selector) && testContext(context.parentNode) ||
                                    context;
                            }
                            if (newSelector) {
                                try {
                                    push.apply(results, newContext.querySelectorAll(newSelector));
                                    return results;
                                }
                                catch (qsaError) {
                                }
                                finally {
                                    if (nid === expando) {
                                        context.removeAttribute("id");
                                    }
                                }
                            }
                        }
                    }
                }
                // All others
                return select(selector.replace(rtrim, "$1"), context, results, seed);
            }
            /**
             * Create key-value caches of limited size
             * @returns {function(string, object)} Returns the Object data after storing it on itself with
             *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *	deleting the oldest entry
             */
            function createCache() {
                var keys = [];
                function cache(key, value) {
                    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    if (keys.push(key + " ") > Expr.cacheLength) {
                        // Only keep the most recent entries
                        delete cache[keys.shift()];
                    }
                    return (cache[key + " "] = value);
                }
                return cache;
            }
            /**
             * Mark a function for special use by Sizzle
             * @param {Function} fn The function to mark
             */
            function markFunction(fn) {
                fn[expando] = true;
                return fn;
            }
            /**
             * Support testing using an element
             * @param {Function} fn Passed the created element and returns a boolean result
             */
            function assert(fn) {
                var el = document.createElement("fieldset");
                try {
                    return !!fn(el);
                }
                catch (e) {
                    return false;
                }
                finally {
                    // Remove from its parent by default
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                    // release memory in IE
                    el = null;
                }
            }
            /**
             * Adds the same handler for all of the specified attrs
             * @param {String} attrs Pipe-separated list of attributes
             * @param {Function} handler The method that will be applied
             */
            function addHandle(attrs, handler) {
                var arr = attrs.split("|"), i = arr.length;
                while (i--) {
                    Expr.attrHandle[arr[i]] = handler;
                }
            }
            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingCheck(a, b) {
                var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                    a.sourceIndex - b.sourceIndex;
                // Use IE sourceIndex if available on both nodes
                if (diff) {
                    return diff;
                }
                // Check if b follows a
                if (cur) {
                    while ((cur = cur.nextSibling)) {
                        if (cur === b) {
                            return -1;
                        }
                    }
                }
                return a ? 1 : -1;
            }
            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo(type) {
                return function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }
            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo(type) {
                return function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }
            /**
             * Returns a function to use in pseudos for :enabled/:disabled
             * @param {Boolean} disabled true for :disabled; false for :enabled
             */
            function createDisabledPseudo(disabled) {
                // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
                return function (elem) {
                    // Only certain elements can match :enabled or :disabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
                    if ("form" in elem) {
                        // Check for inherited disabledness on relevant non-disabled elements:
                        // * listed form-associated elements in a disabled fieldset
                        //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
                        // * option elements in a disabled optgroup
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
                        // All such elements have a "form" property.
                        if (elem.parentNode && elem.disabled === false) {
                            // Option elements defer to a parent optgroup if present
                            if ("label" in elem) {
                                if ("label" in elem.parentNode) {
                                    return elem.parentNode.disabled === disabled;
                                }
                                else {
                                    return elem.disabled === disabled;
                                }
                            }
                            // Support: IE 6 - 11
                            // Use the isDisabled shortcut property to check for disabled fieldset ancestors
                            return elem.isDisabled === disabled ||
                                // Where there is no isDisabled, check manually
                                /* jshint -W018 */
                                elem.isDisabled !== !disabled &&
                                    disabledAncestor(elem) === disabled;
                        }
                        return elem.disabled === disabled;
                        // Try to winnow out elements that can't be disabled before trusting the disabled property.
                        // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                        // even exist on them, let alone have a boolean value.
                    }
                    else if ("label" in elem) {
                        return elem.disabled === disabled;
                    }
                    // Remaining elements are neither :enabled nor :disabled
                    return false;
                };
            }
            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo(fn) {
                return markFunction(function (argument) {
                    argument = +argument;
                    return markFunction(function (seed, matches) {
                        var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                        // Match elements found at the specified indexes
                        while (i--) {
                            if (seed[(j = matchIndexes[i])]) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }
            /**
             * Checks a node for validity as a Sizzle context
             * @param {Element|Object=} context
             * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
             */
            function testContext(context) {
                return context && typeof context.getElementsByTagName !== "undefined" && context;
            }
            // Expose support vars for convenience
            support = Sizzle.support = {};
            /**
             * Detects XML nodes
             * @param {Element|Object} elem An element or a document
             * @returns {Boolean} True iff elem is a non-HTML XML node
             */
            isXML = Sizzle.isXML = function (elem) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };
            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [doc] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            setDocument = Sizzle.setDocument = function (node) {
                var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
                // Return early if doc is invalid or already selected
                if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                    return document;
                }
                // Update global variables
                document = doc;
                docElem = document.documentElement;
                documentIsHTML = !isXML(document);
                // Support: IE 9-11, Edge
                // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
                if (preferredDoc !== document &&
                    (subWindow = document.defaultView) && subWindow.top !== subWindow) {
                    // Support: IE 11, Edge
                    if (subWindow.addEventListener) {
                        subWindow.addEventListener("unload", unloadHandler, false);
                        // Support: IE 9 - 10 only
                    }
                    else if (subWindow.attachEvent) {
                        subWindow.attachEvent("onunload", unloadHandler);
                    }
                }
                /* Attributes
                ---------------------------------------------------------------------- */
                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties
                // (excepting IE8 booleans)
                support.attributes = assert(function (el) {
                    el.className = "i";
                    return !el.getAttribute("className");
                });
                /* getElement(s)By*
                ---------------------------------------------------------------------- */
                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function (el) {
                    el.appendChild(document.createComment(""));
                    return !el.getElementsByTagName("*").length;
                });
                // Support: IE<9
                support.getElementsByClassName = rnative.test(document.getElementsByClassName);
                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programmatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function (el) {
                    docElem.appendChild(el).id = expando;
                    return !document.getElementsByName || !document.getElementsByName(expando).length;
                });
                // ID filter and find
                if (support.getById) {
                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                    Expr.find["ID"] = function (id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var elem = context.getElementById(id);
                            return elem ? [elem] : [];
                        }
                    };
                }
                else {
                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            var node = typeof elem.getAttributeNode !== "undefined" &&
                                elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };
                    // Support: IE 6 - 7 only
                    // getElementById is not reliable as a find shortcut
                    Expr.find["ID"] = function (id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var node, i, elems, elem = context.getElementById(id);
                            if (elem) {
                                // Verify the id attribute
                                node = elem.getAttributeNode("id");
                                if (node && node.value === id) {
                                    return [elem];
                                }
                                // Fall back on getElementsByName
                                elems = context.getElementsByName(id);
                                i = 0;
                                while ((elem = elems[i++])) {
                                    node = elem.getAttributeNode("id");
                                    if (node && node.value === id) {
                                        return [elem];
                                    }
                                }
                            }
                            return [];
                        }
                    };
                }
                // Tag
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function (tag, context) {
                        if (typeof context.getElementsByTagName !== "undefined") {
                            return context.getElementsByTagName(tag);
                            // DocumentFragment nodes don't have gEBTN
                        }
                        else if (support.qsa) {
                            return context.querySelectorAll(tag);
                        }
                    } :
                    function (tag, context) {
                        var elem, tmp = [], i = 0, 
                        // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                        results = context.getElementsByTagName(tag);
                        // Filter out possible comments
                        if (tag === "*") {
                            while ((elem = results[i++])) {
                                if (elem.nodeType === 1) {
                                    tmp.push(elem);
                                }
                            }
                            return tmp;
                        }
                        return results;
                    };
                // Class
                Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
                    if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                        return context.getElementsByClassName(className);
                    }
                };
                /* QSA/matchesSelector
                ---------------------------------------------------------------------- */
                // QSA and matchesSelector support
                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];
                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See https://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];
                if ((support.qsa = rnative.test(document.querySelectorAll))) {
                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function (el) {
                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explicitly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // https://bugs.jquery.com/ticket/12359
                        docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" +
                            "<select id='" + expando + "-\r\\' msallowcapture=''>" +
                            "<option selected=''></option></select>";
                        // Support: IE8, Opera 11-12.16
                        // Nothing should be selected when empty strings follow ^= or $= or *=
                        // The test attribute must be unknown in Opera but "safe" for WinRT
                        // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                        if (el.querySelectorAll("[msallowcapture^='']").length) {
                            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                        }
                        // Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        if (!el.querySelectorAll("[selected]").length) {
                            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                        }
                        // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
                        if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                            rbuggyQSA.push("~=");
                        }
                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        if (!el.querySelectorAll(":checked").length) {
                            rbuggyQSA.push(":checked");
                        }
                        // Support: Safari 8+, iOS 8+
                        // https://bugs.webkit.org/show_bug.cgi?id=136851
                        // In-page `selector#id sibling-combinator selector` fails
                        if (!el.querySelectorAll("a#" + expando + "+*").length) {
                            rbuggyQSA.push(".#.+[+~]");
                        }
                    });
                    assert(function (el) {
                        el.innerHTML = "<a href='' disabled='disabled'></a>" +
                            "<select disabled='disabled'><option/></select>";
                        // Support: Windows 8 Native Apps
                        // The type and name attributes are restricted during .innerHTML assignment
                        var input = document.createElement("input");
                        input.setAttribute("type", "hidden");
                        el.appendChild(input).setAttribute("name", "D");
                        // Support: IE8
                        // Enforce case-sensitivity of name attribute
                        if (el.querySelectorAll("[name=d]").length) {
                            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                        }
                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        if (el.querySelectorAll(":enabled").length !== 2) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }
                        // Support: IE9-11+
                        // IE's :disabled selector does not pick up the children of disabled fieldsets
                        docElem.appendChild(el).disabled = true;
                        if (el.querySelectorAll(":disabled").length !== 2) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }
                        // Opera 10-11 does not throw on post-comma invalid pseudos
                        el.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }
                if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
                    docElem.webkitMatchesSelector ||
                    docElem.mozMatchesSelector ||
                    docElem.oMatchesSelector ||
                    docElem.msMatchesSelector)))) {
                    assert(function (el) {
                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        support.disconnectedMatch = matches.call(el, "*");
                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        matches.call(el, "[s!='']:x");
                        rbuggyMatches.push("!=", pseudos);
                    });
                }
                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
                /* Contains
                ---------------------------------------------------------------------- */
                hasCompare = rnative.test(docElem.compareDocumentPosition);
                // Element contains another
                // Purposefully self-exclusive
                // As in, an element does not contain itself
                contains = hasCompare || rnative.test(docElem.contains) ?
                    function (a, b) {
                        var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ?
                            adown.contains(bup) :
                            a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
                    } :
                    function (a, b) {
                        if (b) {
                            while ((b = b.parentNode)) {
                                if (b === a) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };
                /* Sorting
                ---------------------------------------------------------------------- */
                // Document order sorting
                sortOrder = hasCompare ?
                    function (a, b) {
                        // Flag for duplicate removal
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }
                        // Sort on method existence if only one input has compareDocumentPosition
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if (compare) {
                            return compare;
                        }
                        // Calculate position if both inputs belong to the same document
                        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
                            a.compareDocumentPosition(b) :
                            // Otherwise we know they are disconnected
                            1;
                        // Disconnected nodes
                        if (compare & 1 ||
                            (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
                            // Choose the first element that is related to our preferred document
                            if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                                return -1;
                            }
                            if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                                return 1;
                            }
                            // Maintain original order
                            return sortInput ?
                                (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                0;
                        }
                        return compare & 4 ? -1 : 1;
                    } :
                    function (a, b) {
                        // Exit early if the nodes are identical
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }
                        var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
                        // Parentless nodes are either documents or disconnected
                        if (!aup || !bup) {
                            return a === document ? -1 :
                                b === document ? 1 :
                                    aup ? -1 :
                                        bup ? 1 :
                                            sortInput ?
                                                (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                                0;
                            // If the nodes are siblings, we can do a quick check
                        }
                        else if (aup === bup) {
                            return siblingCheck(a, b);
                        }
                        // Otherwise we need full lists of their ancestors for comparison
                        cur = a;
                        while ((cur = cur.parentNode)) {
                            ap.unshift(cur);
                        }
                        cur = b;
                        while ((cur = cur.parentNode)) {
                            bp.unshift(cur);
                        }
                        // Walk down the tree looking for a discrepancy
                        while (ap[i] === bp[i]) {
                            i++;
                        }
                        return i ?
                            // Do a sibling check if the nodes have a common ancestor
                            siblingCheck(ap[i], bp[i]) :
                            // Otherwise nodes in our document sort first
                            ap[i] === preferredDoc ? -1 :
                                bp[i] === preferredDoc ? 1 :
                                    0;
                    };
                return document;
            };
            Sizzle.matches = function (expr, elements) {
                return Sizzle(expr, null, null, elements);
            };
            Sizzle.matchesSelector = function (elem, expr) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem);
                }
                // Make sure that attribute selectors are quoted
                expr = expr.replace(rattributeQuotes, "='$1']");
                if (support.matchesSelector && documentIsHTML &&
                    !compilerCache[expr + " "] &&
                    (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
                    (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                    try {
                        var ret = matches.call(elem, expr);
                        // IE 9's matchesSelector returns false on disconnected nodes
                        if (ret || support.disconnectedMatch ||
                            // As well, disconnected nodes are said to be in a document
                            // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11) {
                            return ret;
                        }
                    }
                    catch (e) { }
                }
                return Sizzle(expr, document, null, [elem]).length > 0;
            };
            Sizzle.contains = function (context, elem) {
                // Set document vars if needed
                if ((context.ownerDocument || context) !== document) {
                    setDocument(context);
                }
                return contains(context, elem);
            };
            Sizzle.attr = function (elem, name) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem);
                }
                var fn = Expr.attrHandle[name.toLowerCase()], 
                // Don't get fooled by Object.prototype properties (jQuery #13807)
                val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                    fn(elem, name, !documentIsHTML) :
                    undefined;
                return val !== undefined ?
                    val :
                    support.attributes || !documentIsHTML ?
                        elem.getAttribute(name) :
                        (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null;
            };
            Sizzle.escape = function (sel) {
                return (sel + "").replace(rcssescape, fcssescape);
            };
            Sizzle.error = function (msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg);
            };
            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            Sizzle.uniqueSort = function (results) {
                var elem, duplicates = [], j = 0, i = 0;
                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice(0);
                results.sort(sortOrder);
                if (hasDuplicate) {
                    while ((elem = results[i++])) {
                        if (elem === results[i]) {
                            j = duplicates.push(i);
                        }
                    }
                    while (j--) {
                        results.splice(duplicates[j], 1);
                    }
                }
                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;
                return results;
            };
            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            getText = Sizzle.getText = function (elem) {
                var node, ret = "", i = 0, nodeType = elem.nodeType;
                if (!nodeType) {
                    // If no nodeType, this is expected to be an array
                    while ((node = elem[i++])) {
                        // Do not traverse comment nodes
                        ret += getText(node);
                    }
                }
                else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (jQuery #11153)
                    if (typeof elem.textContent === "string") {
                        return elem.textContent;
                    }
                    else {
                        // Traverse its children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem);
                        }
                    }
                }
                else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes
                return ret;
            };
            Expr = Sizzle.selectors = {
                // Can be adjusted by the user
                cacheLength: 50,
                createPseudo: markFunction,
                match: matchExpr,
                attrHandle: {},
                find: {},
                relative: {
                    ">": { dir: "parentNode", first: true },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: true },
                    "~": { dir: "previousSibling" }
                },
                preFilter: {
                    "ATTR": function (match) {
                        match[1] = match[1].replace(runescape, funescape);
                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                        if (match[2] === "~=") {
                            match[3] = " " + match[3] + " ";
                        }
                        return match.slice(0, 4);
                    },
                    "CHILD": function (match) {
                        /* matches from matchExpr["CHILD"]
                            1 type (only|nth|...)
                            2 what (child|of-type)
                            3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                            4 xn-component of xn+y argument ([+-]?\d*n|)
                            5 sign of xn-component
                            6 x of xn-component
                            7 sign of y-component
                            8 y of y-component
                        */
                        match[1] = match[1].toLowerCase();
                        if (match[1].slice(0, 3) === "nth") {
                            // nth-* requires argument
                            if (!match[3]) {
                                Sizzle.error(match[0]);
                            }
                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                            match[5] = +((match[7] + match[8]) || match[3] === "odd");
                            // other types prohibit arguments
                        }
                        else if (match[3]) {
                            Sizzle.error(match[0]);
                        }
                        return match;
                    },
                    "PSEUDO": function (match) {
                        var excess, unquoted = !match[6] && match[2];
                        if (matchExpr["CHILD"].test(match[0])) {
                            return null;
                        }
                        // Accept quoted arguments as-is
                        if (match[3]) {
                            match[2] = match[4] || match[5] || "";
                            // Strip excess characters from unquoted arguments
                        }
                        else if (unquoted && rpseudo.test(unquoted) &&
                            // Get excess from tokenize (recursively)
                            (excess = tokenize(unquoted, true)) &&
                            // advance to the next closing parenthesis
                            (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                            // excess is a negative index
                            match[0] = match[0].slice(0, excess);
                            match[2] = unquoted.slice(0, excess);
                        }
                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice(0, 3);
                    }
                },
                filter: {
                    "TAG": function (nodeNameSelector) {
                        var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function () { return true; } :
                            function (elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },
                    "CLASS": function (className) {
                        var pattern = classCache[className + " "];
                        return pattern ||
                            (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
                                classCache(className, function (elem) {
                                    return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                                });
                    },
                    "ATTR": function (name, operator, check) {
                        return function (elem) {
                            var result = Sizzle.attr(elem, name);
                            if (result == null) {
                                return operator === "!=";
                            }
                            if (!operator) {
                                return true;
                            }
                            result += "";
                            return operator === "=" ? result === check :
                                operator === "!=" ? result !== check :
                                    operator === "^=" ? check && result.indexOf(check) === 0 :
                                        operator === "*=" ? check && result.indexOf(check) > -1 :
                                            operator === "$=" ? check && result.slice(-check.length) === check :
                                                operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :
                                                    operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                                                        false;
                        };
                    },
                    "CHILD": function (type, what, argument, first, last) {
                        var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                        return first === 1 && last === 0 ?
                            // Shortcut for :nth-*(n)
                            function (elem) {
                                return !!elem.parentNode;
                            } :
                            function (elem, context, xml) {
                                var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                                if (parent) {
                                    // :(first|last|only)-(child|of-type)
                                    if (simple) {
                                        while (dir) {
                                            node = elem;
                                            while ((node = node[dir])) {
                                                if (ofType ?
                                                    node.nodeName.toLowerCase() === name :
                                                    node.nodeType === 1) {
                                                    return false;
                                                }
                                            }
                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }
                                    start = [forward ? parent.firstChild : parent.lastChild];
                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if (forward && useCache) {
                                        // Seek `elem` from a previously-cached index
                                        // ...in a gzip-friendly way
                                        node = parent;
                                        outerCache = node[expando] || (node[expando] = {});
                                        // Support: IE <9 only
                                        // Defend against cloned attroperties (jQuery gh-1709)
                                        uniqueCache = outerCache[node.uniqueID] ||
                                            (outerCache[node.uniqueID] = {});
                                        cache = uniqueCache[type] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = nodeIndex && cache[2];
                                        node = nodeIndex && parent.childNodes[nodeIndex];
                                        while ((node = ++nodeIndex && node && node[dir] ||
                                            // Fallback to seeking `elem` from the start
                                            (diff = nodeIndex = 0) || start.pop())) {
                                            // When found, cache indexes on `parent` and break
                                            if (node.nodeType === 1 && ++diff && node === elem) {
                                                uniqueCache[type] = [dirruns, nodeIndex, diff];
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        // Use previously-cached element index if available
                                        if (useCache) {
                                            // ...in a gzip-friendly way
                                            node = elem;
                                            outerCache = node[expando] || (node[expando] = {});
                                            // Support: IE <9 only
                                            // Defend against cloned attroperties (jQuery gh-1709)
                                            uniqueCache = outerCache[node.uniqueID] ||
                                                (outerCache[node.uniqueID] = {});
                                            cache = uniqueCache[type] || [];
                                            nodeIndex = cache[0] === dirruns && cache[1];
                                            diff = nodeIndex;
                                        }
                                        // xml :nth-child(...)
                                        // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                        if (diff === false) {
                                            // Use the same loop as above to seek `elem` from the start
                                            while ((node = ++nodeIndex && node && node[dir] ||
                                                (diff = nodeIndex = 0) || start.pop())) {
                                                if ((ofType ?
                                                    node.nodeName.toLowerCase() === name :
                                                    node.nodeType === 1) &&
                                                    ++diff) {
                                                    // Cache the index of each encountered element
                                                    if (useCache) {
                                                        outerCache = node[expando] || (node[expando] = {});
                                                        // Support: IE <9 only
                                                        // Defend against cloned attroperties (jQuery gh-1709)
                                                        uniqueCache = outerCache[node.uniqueID] ||
                                                            (outerCache[node.uniqueID] = {});
                                                        uniqueCache[type] = [dirruns, diff];
                                                    }
                                                    if (node === elem) {
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first || (diff % first === 0 && diff / first >= 0);
                                }
                            };
                    },
                    "PSEUDO": function (pseudo, argument) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                            Sizzle.error("unsupported pseudo: " + pseudo);
                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if (fn[expando]) {
                            return fn(argument);
                        }
                        // But maintain support for old signatures
                        if (fn.length > 1) {
                            args = [pseudo, pseudo, "", argument];
                            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                                markFunction(function (seed, matches) {
                                    var idx, matched = fn(seed, argument), i = matched.length;
                                    while (i--) {
                                        idx = indexOf(seed, matched[i]);
                                        seed[idx] = !(matches[idx] = matched[i]);
                                    }
                                }) :
                                function (elem) {
                                    return fn(elem, 0, args);
                                };
                        }
                        return fn;
                    }
                },
                pseudos: {
                    // Potentially complex pseudos
                    "not": markFunction(function (selector) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                        return matcher[expando] ?
                            markFunction(function (seed, matches, context, xml) {
                                var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                                // Match elements unmatched by `matcher`
                                while (i--) {
                                    if ((elem = unmatched[i])) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function (elem, context, xml) {
                                input[0] = elem;
                                matcher(input, null, xml, results);
                                // Don't keep the element (issue #299)
                                input[0] = null;
                                return !results.pop();
                            };
                    }),
                    "has": markFunction(function (selector) {
                        return function (elem) {
                            return Sizzle(selector, elem).length > 0;
                        };
                    }),
                    "contains": markFunction(function (text) {
                        text = text.replace(runescape, funescape);
                        return function (elem) {
                            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                        };
                    }),
                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // http://www.w3.org/TR/selectors/#lang-pseudo
                    "lang": markFunction(function (lang) {
                        // lang value must be a valid identifier
                        if (!ridentifier.test(lang || "")) {
                            Sizzle.error("unsupported lang: " + lang);
                        }
                        lang = lang.replace(runescape, funescape).toLowerCase();
                        return function (elem) {
                            var elemLang;
                            do {
                                if ((elemLang = documentIsHTML ?
                                    elem.lang :
                                    elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                }
                            } while ((elem = elem.parentNode) && elem.nodeType === 1);
                            return false;
                        };
                    }),
                    // Miscellaneous
                    "target": function (elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id;
                    },
                    "root": function (elem) {
                        return elem === docElem;
                    },
                    "focus": function (elem) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },
                    // Boolean properties
                    "enabled": createDisabledPseudo(false),
                    "disabled": createDisabledPseudo(true),
                    "checked": function (elem) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                    },
                    "selected": function (elem) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if (elem.parentNode) {
                            elem.parentNode.selectedIndex;
                        }
                        return elem.selected === true;
                    },
                    // Contents
                    "empty": function (elem) {
                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            if (elem.nodeType < 6) {
                                return false;
                            }
                        }
                        return true;
                    },
                    "parent": function (elem) {
                        return !Expr.pseudos["empty"](elem);
                    },
                    // Element/input types
                    "header": function (elem) {
                        return rheader.test(elem.nodeName);
                    },
                    "input": function (elem) {
                        return rinputs.test(elem.nodeName);
                    },
                    "button": function (elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },
                    "text": function (elem) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" &&
                            elem.type === "text" &&
                            // Support: IE<8
                            // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                            ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                    },
                    // Position-in-collection
                    "first": createPositionalPseudo(function () {
                        return [0];
                    }),
                    "last": createPositionalPseudo(function (matchIndexes, length) {
                        return [length - 1];
                    }),
                    "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
                        return [argument < 0 ? argument + length : argument];
                    }),
                    "even": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 0;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),
                    "odd": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 1;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),
                    "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; --i >= 0;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),
                    "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; ++i < length;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    })
                }
            };
            Expr.pseudos["nth"] = Expr.pseudos["eq"];
            // Add button/input type pseudos
            for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
                Expr.pseudos[i] = createInputPseudo(i);
            }
            for (i in { submit: true, reset: true }) {
                Expr.pseudos[i] = createButtonPseudo(i);
            }
            // Easy API for creating new setFilters
            function setFilters() { }
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();
            tokenize = Sizzle.tokenize = function (selector, parseOnly) {
                var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
                if (cached) {
                    return parseOnly ? 0 : cached.slice(0);
                }
                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;
                while (soFar) {
                    // Comma and first run
                    if (!matched || (match = rcomma.exec(soFar))) {
                        if (match) {
                            // Don't consume trailing commas as valid
                            soFar = soFar.slice(match[0].length) || soFar;
                        }
                        groups.push((tokens = []));
                    }
                    matched = false;
                    // Combinators
                    if ((match = rcombinators.exec(soFar))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            // Cast descendant combinators to space
                            type: match[0].replace(rtrim, " ")
                        });
                        soFar = soFar.slice(matched.length);
                    }
                    // Filters
                    for (type in Expr.filter) {
                        if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                            (match = preFilters[type](match)))) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice(matched.length);
                        }
                    }
                    if (!matched) {
                        break;
                    }
                }
                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly ?
                    soFar.length :
                    soFar ?
                        Sizzle.error(selector) :
                        // Cache the tokens
                        tokenCache(selector, groups).slice(0);
            };
            function toSelector(tokens) {
                var i = 0, len = tokens.length, selector = "";
                for (; i < len; i++) {
                    selector += tokens[i].value;
                }
                return selector;
            }
            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir, skip = combinator.next, key = skip || dir, checkNonElements = base && key === "parentNode", doneName = done++;
                return combinator.first ?
                    // Check against closest ancestor/preceding element
                    function (elem, context, xml) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                return matcher(elem, context, xml);
                            }
                        }
                        return false;
                    } :
                    // Check against all ancestor/preceding elements
                    function (elem, context, xml) {
                        var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
                        // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                        if (xml) {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    if (matcher(elem, context, xml)) {
                                        return true;
                                    }
                                }
                            }
                        }
                        else {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    outerCache = elem[expando] || (elem[expando] = {});
                                    // Support: IE <9 only
                                    // Defend against cloned attroperties (jQuery gh-1709)
                                    uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
                                    if (skip && skip === elem.nodeName.toLowerCase()) {
                                        elem = elem[dir] || elem;
                                    }
                                    else if ((oldCache = uniqueCache[key]) &&
                                        oldCache[0] === dirruns && oldCache[1] === doneName) {
                                        // Assign to newCache so results back-propagate to previous elements
                                        return (newCache[2] = oldCache[2]);
                                    }
                                    else {
                                        // Reuse newcache so results back-propagate to previous elements
                                        uniqueCache[key] = newCache;
                                        // A match means we're done; a fail means we have to keep checking
                                        if ((newCache[2] = matcher(elem, context, xml))) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                        return false;
                    };
            }
            function elementMatcher(matchers) {
                return matchers.length > 1 ?
                    function (elem, context, xml) {
                        var i = matchers.length;
                        while (i--) {
                            if (!matchers[i](elem, context, xml)) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }
            function multipleContexts(selector, contexts, results) {
                var i = 0, len = contexts.length;
                for (; i < len; i++) {
                    Sizzle(selector, contexts[i], results);
                }
                return results;
            }
            function condense(unmatched, map, filter, context, xml) {
                var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
                for (; i < len; i++) {
                    if ((elem = unmatched[i])) {
                        if (!filter || filter(elem, context, xml)) {
                            newUnmatched.push(elem);
                            if (mapped) {
                                map.push(i);
                            }
                        }
                    }
                }
                return newUnmatched;
            }
            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                if (postFilter && !postFilter[expando]) {
                    postFilter = setMatcher(postFilter);
                }
                if (postFinder && !postFinder[expando]) {
                    postFinder = setMatcher(postFinder, postSelector);
                }
                return markFunction(function (seed, results, context, xml) {
                    var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, 
                    // Get initial elements from seed or context
                    elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []), 
                    // Prefilter to get matcher input, preserving a map for seed-results synchronization
                    matcherIn = preFilter && (seed || !selector) ?
                        condense(elems, preMap, preFilter, context, xml) :
                        elems, matcherOut = matcher ?
                        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                        postFinder || (seed ? preFilter : preexisting || postFilter) ?
                            // ...intermediate processing is necessary
                            [] :
                            // ...otherwise use results directly
                            results :
                        matcherIn;
                    // Find primary matches
                    if (matcher) {
                        matcher(matcherIn, matcherOut, context, xml);
                    }
                    // Apply postFilter
                    if (postFilter) {
                        temp = condense(matcherOut, postMap);
                        postFilter(temp, [], context, xml);
                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while (i--) {
                            if ((elem = temp[i])) {
                                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                            }
                        }
                    }
                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while (i--) {
                                    if ((elem = matcherOut[i])) {
                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push((matcherIn[i] = elem));
                                    }
                                }
                                postFinder(null, (matcherOut = []), temp, xml);
                            }
                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }
                        // Add elements to results, through postFinder if defined
                    }
                    else {
                        matcherOut = condense(matcherOut === results ?
                            matcherOut.splice(preexisting, matcherOut.length) :
                            matcherOut);
                        if (postFinder) {
                            postFinder(null, results, matcherOut, xml);
                        }
                        else {
                            push.apply(results, matcherOut);
                        }
                    }
                });
            }
            function matcherFromTokens(tokens) {
                var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, 
                // The foundational matcher ensures that elements are reachable from top-level context(s)
                matchContext = addCombinator(function (elem) {
                    return elem === checkContext;
                }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
                    return indexOf(checkContext, elem) > -1;
                }, implicitRelative, true), matchers = [function (elem, context, xml) {
                        var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ?
                            matchContext(elem, context, xml) :
                            matchAnyContext(elem, context, xml));
                        // Avoid hanging onto element (issue #299)
                        checkContext = null;
                        return ret;
                    }];
                for (; i < len; i++) {
                    if ((matcher = Expr.relative[tokens[i].type])) {
                        matchers = [addCombinator(elementMatcher(matchers), matcher)];
                    }
                    else {
                        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                        // Return special upon seeing a positional matcher
                        if (matcher[expando]) {
                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for (; j < len; j++) {
                                if (Expr.relative[tokens[j].type]) {
                                    break;
                                }
                            }
                            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
                            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                            tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
                        }
                        matchers.push(matcher);
                    }
                }
                return elementMatcher(matchers);
            }
            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, outermost) {
                    var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, 
                    // We must always have either seed elements or outermost context
                    elems = seed || byElement && Expr.find["TAG"]("*", outermost), 
                    // Use integer dirruns iff this is the outermost matcher
                    dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1), len = elems.length;
                    if (outermost) {
                        outermostContext = context === document || context || outermost;
                    }
                    // Add elements passing elementMatchers directly to results
                    // Support: IE<9, Safari
                    // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                    for (; i !== len && (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            j = 0;
                            if (!context && elem.ownerDocument !== document) {
                                setDocument(elem);
                                xml = !documentIsHTML;
                            }
                            while ((matcher = elementMatchers[j++])) {
                                if (matcher(elem, context || document, xml)) {
                                    results.push(elem);
                                    break;
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique;
                            }
                        }
                        // Track unmatched elements for set filters
                        if (bySet) {
                            // They will have gone through all possible matchers
                            if ((elem = !matcher && elem)) {
                                matchedCount--;
                            }
                            // Lengthen the array for every element, matched or not
                            if (seed) {
                                unmatched.push(elem);
                            }
                        }
                    }
                    // `i` is now the count of elements visited above, and adding it to `matchedCount`
                    // makes the latter nonnegative.
                    matchedCount += i;
                    // Apply set filters to unmatched elements
                    // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                    // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                    // no element matchers and no seed.
                    // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                    // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                    // numerically zero.
                    if (bySet && i !== matchedCount) {
                        j = 0;
                        while ((matcher = setMatchers[j++])) {
                            matcher(unmatched, setMatched, context, xml);
                        }
                        if (seed) {
                            // Reintegrate element matches to eliminate the need for sorting
                            if (matchedCount > 0) {
                                while (i--) {
                                    if (!(unmatched[i] || setMatched[i])) {
                                        setMatched[i] = pop.call(results);
                                    }
                                }
                            }
                            // Discard index placeholder values to get only actual matches
                            setMatched = condense(setMatched);
                        }
                        // Add matches to results
                        push.apply(results, setMatched);
                        // Seedless set matches succeeding multiple successful matchers stipulate sorting
                        if (outermost && !seed && setMatched.length > 0 &&
                            (matchedCount + setMatchers.length) > 1) {
                            Sizzle.uniqueSort(results);
                        }
                    }
                    // Override manipulation of globals by nested matchers
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup;
                    }
                    return unmatched;
                };
                return bySet ?
                    markFunction(superMatcher) :
                    superMatcher;
            }
            compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
                var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
                if (!cached) {
                    // Generate a function of recursive functions that can be used to check each element
                    if (!match) {
                        match = tokenize(selector);
                    }
                    i = match.length;
                    while (i--) {
                        cached = matcherFromTokens(match[i]);
                        if (cached[expando]) {
                            setMatchers.push(cached);
                        }
                        else {
                            elementMatchers.push(cached);
                        }
                    }
                    // Cache the compiled function
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                    // Save selector and tokenization
                    cached.selector = selector;
                }
                return cached;
            };
            /**
             * A low-level selection function that works with Sizzle's compiled
             *  selector functions
             * @param {String|Function} selector A selector or a pre-compiled
             *  selector function built with Sizzle.compile
             * @param {Element} context
             * @param {Array} [results]
             * @param {Array} [seed] A set of elements to match against
             */
            select = Sizzle.select = function (selector, context, results, seed) {
                var i, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize((selector = compiled.selector || selector));
                results = results || [];
                // Try to minimize operations if there is only one selector in the list and no seed
                // (the latter of which guarantees us context)
                if (match.length === 1) {
                    // Reduce context if the leading compound selector is an ID
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                        context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                        if (!context) {
                            return results;
                            // Precompiled matchers will still verify ancestry, so step up a level
                        }
                        else if (compiled) {
                            context = context.parentNode;
                        }
                        selector = selector.slice(tokens.shift().value.length);
                    }
                    // Fetch a seed set for right-to-left matching
                    i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                    while (i--) {
                        token = tokens[i];
                        // Abort if we hit a combinator
                        if (Expr.relative[(type = token.type)]) {
                            break;
                        }
                        if ((find = Expr.find[type])) {
                            // Search, expanding context for leading sibling combinators
                            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, seed);
                                    return results;
                                }
                                break;
                            }
                        }
                    }
                }
                // Compile and execute a filtering function if one is not provided
                // Provide `match` to avoid retokenization if we modified the selector above
                (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
                return results;
            };
            // One-time assignments
            // Sort stability
            support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
            // Support: Chrome 14-35+
            // Always assume duplicates if they aren't passed to the comparison function
            support.detectDuplicates = !!hasDuplicate;
            // Initialize against the default document
            setDocument();
            // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
            // Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function (el) {
                // Should return 1, but returns 4 (following)
                return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
            });
            // Support: IE<8
            // Prevent attribute/property "interpolation"
            // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            if (!assert(function (el) {
                el.innerHTML = "<a href='#'></a>";
                return el.firstChild.getAttribute("href") === "#";
            })) {
                addHandle("type|href|height|width", function (elem, name, isXML) {
                    if (!isXML) {
                        return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                    }
                });
            }
            // Support: IE<9
            // Use defaultValue in place of getAttribute("value")
            if (!support.attributes || !assert(function (el) {
                el.innerHTML = "<input/>";
                el.firstChild.setAttribute("value", "");
                return el.firstChild.getAttribute("value") === "";
            })) {
                addHandle("value", function (elem, name, isXML) {
                    if (!isXML && elem.nodeName.toLowerCase() === "input") {
                        return elem.defaultValue;
                    }
                });
            }
            // Support: IE<9
            // Use getAttributeNode to fetch booleans when getAttribute lies
            if (!assert(function (el) {
                return el.getAttribute("disabled") == null;
            })) {
                addHandle(booleans, function (elem, name, isXML) {
                    var val;
                    if (!isXML) {
                        return elem[name] === true ? name.toLowerCase() :
                            (val = elem.getAttributeNode(name)) && val.specified ?
                                val.value :
                                null;
                    }
                });
            }
            return Sizzle;
        })(window);
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        // Deprecated
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
        jQuery.escapeSelector = Sizzle.escape;
        var dir = function (elem, dir, until) {
            var matched = [], truncate = until !== undefined;
            while ((elem = elem[dir]) && elem.nodeType !== 9) {
                if (elem.nodeType === 1) {
                    if (truncate && jQuery(elem).is(until)) {
                        break;
                    }
                    matched.push(elem);
                }
            }
            return matched;
        };
        var siblings = function (n, elem) {
            var matched = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    matched.push(n);
                }
            }
            return matched;
        };
        var rneedsContext = jQuery.expr.match.needsContext;
        function nodeName(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        }
        ;
        var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);
        var risSimple = /^.[^:#\[\.,]*$/;
        // Implement the identical functionality for filter and not
        function winnow(elements, qualifier, not) {
            if (jQuery.isFunction(qualifier)) {
                return jQuery.grep(elements, function (elem, i) {
                    return !!qualifier.call(elem, i, elem) !== not;
                });
            }
            // Single element
            if (qualifier.nodeType) {
                return jQuery.grep(elements, function (elem) {
                    return (elem === qualifier) !== not;
                });
            }
            // Arraylike of elements (jQuery, arguments, Array)
            if (typeof qualifier !== "string") {
                return jQuery.grep(elements, function (elem) {
                    return (indexOf.call(qualifier, elem) > -1) !== not;
                });
            }
            // Simple selector that can be filtered directly, removing non-Elements
            if (risSimple.test(qualifier)) {
                return jQuery.filter(qualifier, elements, not);
            }
            // Complex selector, compare the two sets, removing non-Elements
            qualifier = jQuery.filter(qualifier, elements);
            return jQuery.grep(elements, function (elem) {
                return (indexOf.call(qualifier, elem) > -1) !== not && elem.nodeType === 1;
            });
        }
        jQuery.filter = function (expr, elems, not) {
            var elem = elems[0];
            if (not) {
                expr = ":not(" + expr + ")";
            }
            if (elems.length === 1 && elem.nodeType === 1) {
                return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
            }
            return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
                return elem.nodeType === 1;
            }));
        };
        jQuery.fn.extend({
            find: function (selector) {
                var i, ret, len = this.length, self = this;
                if (typeof selector !== "string") {
                    return this.pushStack(jQuery(selector).filter(function () {
                        for (i = 0; i < len; i++) {
                            if (jQuery.contains(self[i], this)) {
                                return true;
                            }
                        }
                    }));
                }
                ret = this.pushStack([]);
                for (i = 0; i < len; i++) {
                    jQuery.find(selector, self[i], ret);
                }
                return len > 1 ? jQuery.uniqueSort(ret) : ret;
            },
            filter: function (selector) {
                return this.pushStack(winnow(this, selector || [], false));
            },
            not: function (selector) {
                return this.pushStack(winnow(this, selector || [], true));
            },
            is: function (selector) {
                return !!winnow(this, 
                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test(selector) ?
                    jQuery(selector) :
                    selector || [], false).length;
            }
        });
        // Initialize a jQuery object
        // A central reference to the root jQuery(document)
        var rootjQuery, 
        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        // Strict HTML recognition (#11290: must start with <)
        // Shortcut simple #id case for speed
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function (selector, context, root) {
            var match, elem;
            // HANDLE: $(""), $(null), $(undefined), $(false)
            if (!selector) {
                return this;
            }
            // Method init() accepts an alternate rootjQuery
            // so migrate can support jQuery.sub (gh-2101)
            root = root || rootjQuery;
            // Handle HTML strings
            if (typeof selector === "string") {
                if (selector[0] === "<" &&
                    selector[selector.length - 1] === ">" &&
                    selector.length >= 3) {
                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [null, selector, null];
                }
                else {
                    match = rquickExpr.exec(selector);
                }
                // Match html or make sure no context is specified for #id
                if (match && (match[1] || !context)) {
                    // HANDLE: $(html) -> $(array)
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        // Option to run scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                        // HANDLE: $(html, props)
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                // Properties of context are called as methods if possible
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match]);
                                    // ...and otherwise set as attributes
                                }
                                else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }
                        return this;
                        // HANDLE: $(#id)
                    }
                    else {
                        elem = document.getElementById(match[2]);
                        if (elem) {
                            // Inject the element directly into the jQuery object
                            this[0] = elem;
                            this.length = 1;
                        }
                        return this;
                    }
                    // HANDLE: $(expr, $(...))
                }
                else if (!context || context.jquery) {
                    return (context || root).find(selector);
                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                }
                else {
                    return this.constructor(context).find(selector);
                }
                // HANDLE: $(DOMElement)
            }
            else if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;
                // HANDLE: $(function)
                // Shortcut for document ready
            }
            else if (jQuery.isFunction(selector)) {
                return root.ready !== undefined ?
                    root.ready(selector) :
                    // Execute immediately if ready is not present
                    selector(jQuery);
            }
            return jQuery.makeArray(selector, this);
        };
        // Give the init function the jQuery prototype for later instantiation
        init.prototype = jQuery.fn;
        // Initialize central reference
        rootjQuery = jQuery(document);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/, 
        // Methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
        jQuery.fn.extend({
            has: function (target) {
                var targets = jQuery(target, this), l = targets.length;
                return this.filter(function () {
                    var i = 0;
                    for (; i < l; i++) {
                        if (jQuery.contains(this, targets[i])) {
                            return true;
                        }
                    }
                });
            },
            closest: function (selectors, context) {
                var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery(selectors);
                // Positional selectors never match, since there's no _selection_ context
                if (!rneedsContext.test(selectors)) {
                    for (; i < l; i++) {
                        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                            // Always skip document fragments
                            if (cur.nodeType < 11 && (targets ?
                                targets.index(cur) > -1 :
                                // Don't pass non-elements to Sizzle
                                cur.nodeType === 1 &&
                                    jQuery.find.matchesSelector(cur, selectors))) {
                                matched.push(cur);
                                break;
                            }
                        }
                    }
                }
                return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
            },
            // Determine the position of an element within the set
            index: function (elem) {
                // No argument, return index in parent
                if (!elem) {
                    return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
                }
                // Index in selector
                if (typeof elem === "string") {
                    return indexOf.call(jQuery(elem), this[0]);
                }
                // Locate the position of the desired element
                return indexOf.call(this, 
                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem);
            },
            add: function (selector, context) {
                return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
            },
            addBack: function (selector) {
                return this.add(selector == null ?
                    this.prevObject : this.prevObject.filter(selector));
            }
        });
        function sibling(cur, dir) {
            while ((cur = cur[dir]) && cur.nodeType !== 1) { }
            return cur;
        }
        jQuery.each({
            parent: function (elem) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
            },
            parents: function (elem) {
                return dir(elem, "parentNode");
            },
            parentsUntil: function (elem, i, until) {
                return dir(elem, "parentNode", until);
            },
            next: function (elem) {
                return sibling(elem, "nextSibling");
            },
            prev: function (elem) {
                return sibling(elem, "previousSibling");
            },
            nextAll: function (elem) {
                return dir(elem, "nextSibling");
            },
            prevAll: function (elem) {
                return dir(elem, "previousSibling");
            },
            nextUntil: function (elem, i, until) {
                return dir(elem, "nextSibling", until);
            },
            prevUntil: function (elem, i, until) {
                return dir(elem, "previousSibling", until);
            },
            siblings: function (elem) {
                return siblings((elem.parentNode || {}).firstChild, elem);
            },
            children: function (elem) {
                return siblings(elem.firstChild);
            },
            contents: function (elem) {
                if (nodeName(elem, "iframe")) {
                    return elem.contentDocument;
                }
                // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
                // Treat the template element as a regular one in browsers that
                // don't support it.
                if (nodeName(elem, "template")) {
                    elem = elem.content || elem;
                }
                return jQuery.merge([], elem.childNodes);
            }
        }, function (name, fn) {
            jQuery.fn[name] = function (until, selector) {
                var matched = jQuery.map(this, fn, until);
                if (name.slice(-5) !== "Until") {
                    selector = until;
                }
                if (selector && typeof selector === "string") {
                    matched = jQuery.filter(selector, matched);
                }
                if (this.length > 1) {
                    // Remove duplicates
                    if (!guaranteedUnique[name]) {
                        jQuery.uniqueSort(matched);
                    }
                    // Reverse order for parents* and prev-derivatives
                    if (rparentsprev.test(name)) {
                        matched.reverse();
                    }
                }
                return this.pushStack(matched);
            };
        });
        var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);
        // Convert String-formatted options into Object-formatted ones
        function createOptions(options) {
            var object = {};
            jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
                object[flag] = true;
            });
            return object;
        }
        /*
         * Create a callback list using the following parameters:
         *
         *	options: an optional list of space-separated options that will change how
         *			the callback list behaves or a more traditional option object
         *
         * By default a callback list will act like an event callback list and can be
         * "fired" multiple times.
         *
         * Possible options:
         *
         *	once:			will ensure the callback list can only be fired once (like a Deferred)
         *
         *	memory:			will keep track of previous values and will call any callback added
         *					after the list has been fired right away with the latest "memorized"
         *					values (like a Deferred)
         *
         *	unique:			will ensure a callback can only be added once (no duplicate in the list)
         *
         *	stopOnFalse:	interrupt callings when a callback returns false
         *
         */
        jQuery.Callbacks = function (options) {
            // Convert options from String-formatted to Object-formatted if needed
            // (we check in cache first)
            options = typeof options === "string" ?
                createOptions(options) :
                jQuery.extend({}, options);
            var // Flag to know if list is currently firing
            firing, 
            // Last fire value for non-forgettable lists
            memory, 
            // Flag to know if list was already fired
            fired, 
            // Flag to prevent firing
            locked, 
            // Actual callback list
            list = [], 
            // Queue of execution data for repeatable lists
            queue = [], 
            // Index of currently firing callback (modified by add/remove as needed)
            firingIndex = -1, 
            // Fire callbacks
            fire = function () {
                // Enforce single-firing
                locked = locked || options.once;
                // Execute callbacks for all pending executions,
                // respecting firingIndex overrides and runtime changes
                fired = firing = true;
                for (; queue.length; firingIndex = -1) {
                    memory = queue.shift();
                    while (++firingIndex < list.length) {
                        // Run callback and check for early termination
                        if (list[firingIndex].apply(memory[0], memory[1]) === false &&
                            options.stopOnFalse) {
                            // Jump to end and forget the data so .add doesn't re-fire
                            firingIndex = list.length;
                            memory = false;
                        }
                    }
                }
                // Forget the data if we're done with it
                if (!options.memory) {
                    memory = false;
                }
                firing = false;
                // Clean up if we're done firing for good
                if (locked) {
                    // Keep an empty list if we have data for future add calls
                    if (memory) {
                        list = [];
                        // Otherwise, this object is spent
                    }
                    else {
                        list = "";
                    }
                }
            }, 
            // Actual Callbacks object
            self = {
                // Add a callback or a collection of callbacks to the list
                add: function () {
                    if (list) {
                        // If we have memory from a past run, we should fire after adding
                        if (memory && !firing) {
                            firingIndex = list.length - 1;
                            queue.push(memory);
                        }
                        (function add(args) {
                            jQuery.each(args, function (_, arg) {
                                if (jQuery.isFunction(arg)) {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                }
                                else if (arg && arg.length && jQuery.type(arg) !== "string") {
                                    // Inspect recursively
                                    add(arg);
                                }
                            });
                        })(arguments);
                        if (memory && !firing) {
                            fire();
                        }
                    }
                    return this;
                },
                // Remove a callback from the list
                remove: function () {
                    jQuery.each(arguments, function (_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);
                            // Handle firing indexes
                            if (index <= firingIndex) {
                                firingIndex--;
                            }
                        }
                    });
                    return this;
                },
                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function (fn) {
                    return fn ?
                        jQuery.inArray(fn, list) > -1 :
                        list.length > 0;
                },
                // Remove all callbacks from the list
                empty: function () {
                    if (list) {
                        list = [];
                    }
                    return this;
                },
                // Disable .fire and .add
                // Abort any current/pending executions
                // Clear all callbacks and values
                disable: function () {
                    locked = queue = [];
                    list = memory = "";
                    return this;
                },
                disabled: function () {
                    return !list;
                },
                // Disable .fire
                // Also disable .add unless we have memory (since it would have no effect)
                // Abort any pending executions
                lock: function () {
                    locked = queue = [];
                    if (!memory && !firing) {
                        list = memory = "";
                    }
                    return this;
                },
                locked: function () {
                    return !!locked;
                },
                // Call all callbacks with the given context and arguments
                fireWith: function (context, args) {
                    if (!locked) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        queue.push(args);
                        if (!firing) {
                            fire();
                        }
                    }
                    return this;
                },
                // Call all the callbacks with the given arguments
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },
                // To know if the callbacks have already been called at least once
                fired: function () {
                    return !!fired;
                }
            };
            return self;
        };
        function Identity(v) {
            return v;
        }
        function Thrower(ex) {
            throw ex;
        }
        function adoptValue(value, resolve, reject, noValue) {
            var method;
            try {
                // Check for promise aspect first to privilege synchronous behavior
                if (value && jQuery.isFunction((method = value.promise))) {
                    method.call(value).done(resolve).fail(reject);
                    // Other thenables
                }
                else if (value && jQuery.isFunction((method = value.then))) {
                    method.call(value, resolve, reject);
                    // Other non-thenables
                }
                else {
                    // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
                    // * false: [ value ].slice( 0 ) => resolve( value )
                    // * true: [ value ].slice( 1 ) => resolve()
                    resolve.apply(undefined, [value].slice(noValue));
                }
                // For Promises/A+, convert exceptions into rejections
                // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
                // Deferred#then to conditionally suppress rejection.
            }
            catch (value) {
                // Support: Android 4.0 only
                // Strict mode functions invoked without .call/.apply get global-object context
                reject.apply(undefined, [value]);
            }
        }
        jQuery.extend({
            Deferred: function (func) {
                var tuples = [
                    // action, add listener, callbacks,
                    // ... .then handlers, argument index, [final state]
                    ["notify", "progress", jQuery.Callbacks("memory"),
                        jQuery.Callbacks("memory"), 2],
                    ["resolve", "done", jQuery.Callbacks("once memory"),
                        jQuery.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"),
                        jQuery.Callbacks("once memory"), 1, "rejected"]
                ], state = "pending", promise = {
                    state: function () {
                        return state;
                    },
                    always: function () {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    "catch": function (fn) {
                        return promise.then(null, fn);
                    },
                    // Keep pipe for back-compat
                    pipe: function ( /* fnDone, fnFail, fnProgress */) {
                        var fns = arguments;
                        return jQuery.Deferred(function (newDefer) {
                            jQuery.each(tuples, function (i, tuple) {
                                // Map tuples (progress, done, fail) to arguments (done, fail, progress)
                                var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];
                                // deferred.progress(function() { bind to newDefer or newDefer.notify })
                                // deferred.done(function() { bind to newDefer or newDefer.resolve })
                                // deferred.fail(function() { bind to newDefer or newDefer.reject })
                                deferred[tuple[1]](function () {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise()
                                            .progress(newDefer.notify)
                                            .done(newDefer.resolve)
                                            .fail(newDefer.reject);
                                    }
                                    else {
                                        newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    then: function (onFulfilled, onRejected, onProgress) {
                        var maxDepth = 0;
                        function resolve(depth, deferred, handler, special) {
                            return function () {
                                var that = this, args = arguments, mightThrow = function () {
                                    var returned, then;
                                    // Support: Promises/A+ section 2.3.3.3.3
                                    // https://promisesaplus.com/#point-59
                                    // Ignore double-resolution attempts
                                    if (depth < maxDepth) {
                                        return;
                                    }
                                    returned = handler.apply(that, args);
                                    // Support: Promises/A+ section 2.3.1
                                    // https://promisesaplus.com/#point-48
                                    if (returned === deferred.promise()) {
                                        throw new TypeError("Thenable self-resolution");
                                    }
                                    // Support: Promises/A+ sections 2.3.3.1, 3.5
                                    // https://promisesaplus.com/#point-54
                                    // https://promisesaplus.com/#point-75
                                    // Retrieve `then` only once
                                    then = returned &&
                                        // Support: Promises/A+ section 2.3.4
                                        // https://promisesaplus.com/#point-64
                                        // Only check objects and functions for thenability
                                        (typeof returned === "object" ||
                                            typeof returned === "function") &&
                                        returned.then;
                                    // Handle a returned thenable
                                    if (jQuery.isFunction(then)) {
                                        // Special processors (notify) just wait for resolution
                                        if (special) {
                                            then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));
                                            // Normal processors (resolve) also hook into progress
                                        }
                                        else {
                                            // ...and disregard older resolution values
                                            maxDepth++;
                                            then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                                        }
                                        // Handle all other returned values
                                    }
                                    else {
                                        // Only substitute handlers pass on context
                                        // and multiple values (non-spec behavior)
                                        if (handler !== Identity) {
                                            that = undefined;
                                            args = [returned];
                                        }
                                        // Process the value(s)
                                        // Default process is resolve
                                        (special || deferred.resolveWith)(that, args);
                                    }
                                }, 
                                // Only normal processors (resolve) catch and reject exceptions
                                process = special ?
                                    mightThrow :
                                    function () {
                                        try {
                                            mightThrow();
                                        }
                                        catch (e) {
                                            if (jQuery.Deferred.exceptionHook) {
                                                jQuery.Deferred.exceptionHook(e, process.stackTrace);
                                            }
                                            // Support: Promises/A+ section 2.3.3.3.4.1
                                            // https://promisesaplus.com/#point-61
                                            // Ignore post-resolution exceptions
                                            if (depth + 1 >= maxDepth) {
                                                // Only substitute handlers pass on context
                                                // and multiple values (non-spec behavior)
                                                if (handler !== Thrower) {
                                                    that = undefined;
                                                    args = [e];
                                                }
                                                deferred.rejectWith(that, args);
                                            }
                                        }
                                    };
                                // Support: Promises/A+ section 2.3.3.3.1
                                // https://promisesaplus.com/#point-57
                                // Re-resolve promises immediately to dodge false rejection from
                                // subsequent errors
                                if (depth) {
                                    process();
                                }
                                else {
                                    // Call an optional hook to record the stack, in case of exception
                                    // since it's otherwise lost when execution goes async
                                    if (jQuery.Deferred.getStackHook) {
                                        process.stackTrace = jQuery.Deferred.getStackHook();
                                    }
                                    window.setTimeout(process);
                                }
                            };
                        }
                        return jQuery.Deferred(function (newDefer) {
                            // progress_handlers.add( ... )
                            tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ?
                                onProgress :
                                Identity, newDefer.notifyWith));
                            // fulfilled_handlers.add( ... )
                            tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ?
                                onFulfilled :
                                Identity));
                            // rejected_handlers.add( ... )
                            tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ?
                                onRejected :
                                Thrower));
                        }).promise();
                    },
                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function (obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                }, deferred = {};
                // Add list-specific methods
                jQuery.each(tuples, function (i, tuple) {
                    var list = tuple[2], stateString = tuple[5];
                    // promise.progress = list.add
                    // promise.done = list.add
                    // promise.fail = list.add
                    promise[tuple[1]] = list.add;
                    // Handle state
                    if (stateString) {
                        list.add(function () {
                            // state = "resolved" (i.e., fulfilled)
                            // state = "rejected"
                            state = stateString;
                        }, 
                        // rejected_callbacks.disable
                        // fulfilled_callbacks.disable
                        tuples[3 - i][2].disable, 
                        // progress_callbacks.lock
                        tuples[0][2].lock);
                    }
                    // progress_handlers.fire
                    // fulfilled_handlers.fire
                    // rejected_handlers.fire
                    list.add(tuple[3].fire);
                    // deferred.notify = function() { deferred.notifyWith(...) }
                    // deferred.resolve = function() { deferred.resolveWith(...) }
                    // deferred.reject = function() { deferred.rejectWith(...) }
                    deferred[tuple[0]] = function () {
                        deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
                        return this;
                    };
                    // deferred.notifyWith = list.fireWith
                    // deferred.resolveWith = list.fireWith
                    // deferred.rejectWith = list.fireWith
                    deferred[tuple[0] + "With"] = list.fireWith;
                });
                // Make the deferred a promise
                promise.promise(deferred);
                // Call given func if any
                if (func) {
                    func.call(deferred, deferred);
                }
                // All done!
                return deferred;
            },
            // Deferred helper
            when: function (singleValue) {
                var 
                // count of uncompleted subordinates
                remaining = arguments.length, 
                // count of unprocessed arguments
                i = remaining, 
                // subordinate fulfillment data
                resolveContexts = Array(i), resolveValues = slice.call(arguments), 
                // the master Deferred
                master = jQuery.Deferred(), 
                // subordinate callback factory
                updateFunc = function (i) {
                    return function (value) {
                        resolveContexts[i] = this;
                        resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (!(--remaining)) {
                            master.resolveWith(resolveContexts, resolveValues);
                        }
                    };
                };
                // Single- and empty arguments are adopted like Promise.resolve
                if (remaining <= 1) {
                    adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining);
                    // Use .then() to unwrap secondary thenables (cf. gh-3000)
                    if (master.state() === "pending" ||
                        jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {
                        return master.then();
                    }
                }
                // Multiple arguments are aggregated like Promise.all array elements
                while (i--) {
                    adoptValue(resolveValues[i], updateFunc(i), master.reject);
                }
                return master.promise();
            }
        });
        // These usually indicate a programmer mistake during development,
        // warn about them ASAP rather than swallowing them by default.
        var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        jQuery.Deferred.exceptionHook = function (error, stack) {
            // Support: IE 8 - 9 only
            // Console exists when dev tools are open, which can happen at any time
            if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
                window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
            }
        };
        jQuery.readyException = function (error) {
            window.setTimeout(function () {
                throw error;
            });
        };
        // The deferred used on DOM ready
        var readyList = jQuery.Deferred();
        jQuery.fn.ready = function (fn) {
            readyList
                .then(fn)
                // Wrap jQuery.readyException in a function so that the lookup
                // happens at the time of error handling instead of callback
                // registration.
                .catch(function (error) {
                jQuery.readyException(error);
            });
            return this;
        };
        jQuery.extend({
            // Is the DOM ready to be used? Set to true once it occurs.
            isReady: false,
            // A counter to track how many items to wait for before
            // the ready event fires. See #6781
            readyWait: 1,
            // Handle when the DOM is ready
            ready: function (wait) {
                // Abort if there are pending holds or we're already ready
                if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                    return;
                }
                // Remember that the DOM is ready
                jQuery.isReady = true;
                // If a normal DOM Ready event fired, decrement, and wait if need be
                if (wait !== true && --jQuery.readyWait > 0) {
                    return;
                }
                // If there are functions bound, to execute
                readyList.resolveWith(document, [jQuery]);
            }
        });
        jQuery.ready.then = readyList.then;
        // The ready event handler and self cleanup method
        function completed() {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
            jQuery.ready();
        }
        // Catch cases where $(document).ready() is called
        // after the browser event has already occurred.
        // Support: IE <=9 - 10 only
        // Older IE sometimes signals "interactive" too soon
        if (document.readyState === "complete" ||
            (document.readyState !== "loading" && !document.documentElement.doScroll)) {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            window.setTimeout(jQuery.ready);
        }
        else {
            // Use the handy event callback
            document.addEventListener("DOMContentLoaded", completed);
            // A fallback to window.onload, that will always work
            window.addEventListener("load", completed);
        }
        // Multifunctional method to get and set values of a collection
        // The value/s can optionally be executed if it's a function
        var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0, len = elems.length, bulk = key == null;
            // Sets many values
            if (jQuery.type(key) === "object") {
                chainable = true;
                for (i in key) {
                    access(elems, fn, i, key[i], true, emptyGet, raw);
                }
                // Sets one value
            }
            else if (value !== undefined) {
                chainable = true;
                if (!jQuery.isFunction(value)) {
                    raw = true;
                }
                if (bulk) {
                    // Bulk operations run against the entire set
                    if (raw) {
                        fn.call(elems, value);
                        fn = null;
                        // ...except when executing function values
                    }
                    else {
                        bulk = fn;
                        fn = function (elem, key, value) {
                            return bulk.call(jQuery(elem), value);
                        };
                    }
                }
                if (fn) {
                    for (; i < len; i++) {
                        fn(elems[i], key, raw ?
                            value :
                            value.call(elems[i], i, fn(elems[i], key)));
                    }
                }
            }
            if (chainable) {
                return elems;
            }
            // Gets
            if (bulk) {
                return fn.call(elems);
            }
            return len ? fn(elems[0], key) : emptyGet;
        };
        var acceptData = function (owner) {
            // Accepts only:
            //  - Node
            //    - Node.ELEMENT_NODE
            //    - Node.DOCUMENT_NODE
            //  - Object
            //    - Any
            return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
        };
        function Data() {
            this.expando = jQuery.expando + Data.uid++;
        }
        Data.uid = 1;
        Data.prototype = {
            cache: function (owner) {
                // Check if the owner object already has a cache
                var value = owner[this.expando];
                // If not, create one
                if (!value) {
                    value = {};
                    // We can accept data for non-element nodes in modern browsers,
                    // but we should not, see #8335.
                    // Always return an empty object.
                    if (acceptData(owner)) {
                        // If it is a node unlikely to be stringify-ed or looped over
                        // use plain assignment
                        if (owner.nodeType) {
                            owner[this.expando] = value;
                            // Otherwise secure it in a non-enumerable property
                            // configurable must be true to allow the property to be
                            // deleted when data is removed
                        }
                        else {
                            Object.defineProperty(owner, this.expando, {
                                value: value,
                                configurable: true
                            });
                        }
                    }
                }
                return value;
            },
            set: function (owner, data, value) {
                var prop, cache = this.cache(owner);
                // Handle: [ owner, key, value ] args
                // Always use camelCase key (gh-2257)
                if (typeof data === "string") {
                    cache[jQuery.camelCase(data)] = value;
                    // Handle: [ owner, { properties } ] args
                }
                else {
                    // Copy the properties one-by-one to the cache object
                    for (prop in data) {
                        cache[jQuery.camelCase(prop)] = data[prop];
                    }
                }
                return cache;
            },
            get: function (owner, key) {
                return key === undefined ?
                    this.cache(owner) :
                    // Always use camelCase key (gh-2257)
                    owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
            },
            access: function (owner, key, value) {
                // In cases where either:
                //
                //   1. No key was specified
                //   2. A string key was specified, but no value provided
                //
                // Take the "read" path and allow the get method to determine
                // which value to return, respectively either:
                //
                //   1. The entire cache object
                //   2. The data stored at the key
                //
                if (key === undefined ||
                    ((key && typeof key === "string") && value === undefined)) {
                    return this.get(owner, key);
                }
                // When the key is not a string, or both a key and value
                // are specified, set or extend (existing objects) with either:
                //
                //   1. An object of properties
                //   2. A key and value
                //
                this.set(owner, key, value);
                // Since the "set" path can have two possible entry points
                // return the expected data based on which path was taken[*]
                return value !== undefined ? value : key;
            },
            remove: function (owner, key) {
                var i, cache = owner[this.expando];
                if (cache === undefined) {
                    return;
                }
                if (key !== undefined) {
                    // Support array or space separated string of keys
                    if (Array.isArray(key)) {
                        // If key is an array of keys...
                        // We always set camelCase keys, so remove that.
                        key = key.map(jQuery.camelCase);
                    }
                    else {
                        key = jQuery.camelCase(key);
                        // If a key with the spaces exists, use it.
                        // Otherwise, create an array by matching non-whitespace
                        key = key in cache ?
                            [key] :
                            (key.match(rnothtmlwhite) || []);
                    }
                    i = key.length;
                    while (i--) {
                        delete cache[key[i]];
                    }
                }
                // Remove the expando if there's no more data
                if (key === undefined || jQuery.isEmptyObject(cache)) {
                    // Support: Chrome <=35 - 45
                    // Webkit & Blink performance suffers when deleting properties
                    // from DOM nodes, so set to undefined instead
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
                    if (owner.nodeType) {
                        owner[this.expando] = undefined;
                    }
                    else {
                        delete owner[this.expando];
                    }
                }
            },
            hasData: function (owner) {
                var cache = owner[this.expando];
                return cache !== undefined && !jQuery.isEmptyObject(cache);
            }
        };
        var dataPriv = new Data();
        var dataUser = new Data();
        //	Implementation Summary
        //
        //	1. Enforce API surface and semantic compatibility with 1.9.x branch
        //	2. Improve the module's maintainability by reducing the storage
        //		paths to a single mechanism.
        //	3. Use the same single mechanism to support "private" and "user" data.
        //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
        //	5. Avoid exposing implementation details on user objects (eg. expando properties)
        //	6. Provide a clear path for implementation upgrade to WeakMap in 2014
        var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
        function getData(data) {
            if (data === "true") {
                return true;
            }
            if (data === "false") {
                return false;
            }
            if (data === "null") {
                return null;
            }
            // Only convert to a number if it doesn't change the string
            if (data === +data + "") {
                return +data;
            }
            if (rbrace.test(data)) {
                return JSON.parse(data);
            }
            return data;
        }
        function dataAttr(elem, key, data) {
            var name;
            // If nothing was found internally, try to fetch any
            // data from the HTML5 data-* attribute
            if (data === undefined && elem.nodeType === 1) {
                name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
                data = elem.getAttribute(name);
                if (typeof data === "string") {
                    try {
                        data = getData(data);
                    }
                    catch (e) { }
                    // Make sure we set the data so it isn't changed later
                    dataUser.set(elem, key, data);
                }
                else {
                    data = undefined;
                }
            }
            return data;
        }
        jQuery.extend({
            hasData: function (elem) {
                return dataUser.hasData(elem) || dataPriv.hasData(elem);
            },
            data: function (elem, name, data) {
                return dataUser.access(elem, name, data);
            },
            removeData: function (elem, name) {
                dataUser.remove(elem, name);
            },
            // TODO: Now that all calls to _data and _removeData have been replaced
            // with direct calls to dataPriv methods, these can be deprecated.
            _data: function (elem, name, data) {
                return dataPriv.access(elem, name, data);
            },
            _removeData: function (elem, name) {
                dataPriv.remove(elem, name);
            }
        });
        jQuery.fn.extend({
            data: function (key, value) {
                var i, name, data, elem = this[0], attrs = elem && elem.attributes;
                // Gets all values
                if (key === undefined) {
                    if (this.length) {
                        data = dataUser.get(elem);
                        if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                            i = attrs.length;
                            while (i--) {
                                // Support: IE 11 only
                                // The attrs elements can be null (#14894)
                                if (attrs[i]) {
                                    name = attrs[i].name;
                                    if (name.indexOf("data-") === 0) {
                                        name = jQuery.camelCase(name.slice(5));
                                        dataAttr(elem, name, data[name]);
                                    }
                                }
                            }
                            dataPriv.set(elem, "hasDataAttrs", true);
                        }
                    }
                    return data;
                }
                // Sets multiple values
                if (typeof key === "object") {
                    return this.each(function () {
                        dataUser.set(this, key);
                    });
                }
                return access(this, function (value) {
                    var data;
                    // The calling jQuery object (element matches) is not empty
                    // (and therefore has an element appears at this[ 0 ]) and the
                    // `value` parameter was not undefined. An empty jQuery object
                    // will result in `undefined` for elem = this[ 0 ] which will
                    // throw an exception if an attempt to read a data cache is made.
                    if (elem && value === undefined) {
                        // Attempt to get data from the cache
                        // The key will always be camelCased in Data
                        data = dataUser.get(elem, key);
                        if (data !== undefined) {
                            return data;
                        }
                        // Attempt to "discover" the data in
                        // HTML5 custom data-* attrs
                        data = dataAttr(elem, key);
                        if (data !== undefined) {
                            return data;
                        }
                        // We tried really hard, but the data doesn't exist.
                        return;
                    }
                    // Set the data...
                    this.each(function () {
                        // We always store the camelCased key
                        dataUser.set(this, key, value);
                    });
                }, null, value, arguments.length > 1, null, true);
            },
            removeData: function (key) {
                return this.each(function () {
                    dataUser.remove(this, key);
                });
            }
        });
        jQuery.extend({
            queue: function (elem, type, data) {
                var queue;
                if (elem) {
                    type = (type || "fx") + "queue";
                    queue = dataPriv.get(elem, type);
                    // Speed up dequeue by getting out quickly if this is just a lookup
                    if (data) {
                        if (!queue || Array.isArray(data)) {
                            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                        }
                        else {
                            queue.push(data);
                        }
                    }
                    return queue || [];
                }
            },
            dequeue: function (elem, type) {
                type = type || "fx";
                var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function () {
                    jQuery.dequeue(elem, type);
                };
                // If the fx queue is dequeued, always remove the progress sentinel
                if (fn === "inprogress") {
                    fn = queue.shift();
                    startLength--;
                }
                if (fn) {
                    // Add a progress sentinel to prevent the fx queue from being
                    // automatically dequeued
                    if (type === "fx") {
                        queue.unshift("inprogress");
                    }
                    // Clear up the last queue stop function
                    delete hooks.stop;
                    fn.call(elem, next, hooks);
                }
                if (!startLength && hooks) {
                    hooks.empty.fire();
                }
            },
            // Not public - generate a queueHooks object, or return the current one
            _queueHooks: function (elem, type) {
                var key = type + "queueHooks";
                return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                    empty: jQuery.Callbacks("once memory").add(function () {
                        dataPriv.remove(elem, [type + "queue", key]);
                    })
                });
            }
        });
        jQuery.fn.extend({
            queue: function (type, data) {
                var setter = 2;
                if (typeof type !== "string") {
                    data = type;
                    type = "fx";
                    setter--;
                }
                if (arguments.length < setter) {
                    return jQuery.queue(this[0], type);
                }
                return data === undefined ?
                    this :
                    this.each(function () {
                        var queue = jQuery.queue(this, type, data);
                        // Ensure a hooks for this queue
                        jQuery._queueHooks(this, type);
                        if (type === "fx" && queue[0] !== "inprogress") {
                            jQuery.dequeue(this, type);
                        }
                    });
            },
            dequeue: function (type) {
                return this.each(function () {
                    jQuery.dequeue(this, type);
                });
            },
            clearQueue: function (type) {
                return this.queue(type || "fx", []);
            },
            // Get a promise resolved when queues of a certain type
            // are emptied (fx is the type by default)
            promise: function (type, obj) {
                var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function () {
                    if (!(--count)) {
                        defer.resolveWith(elements, [elements]);
                    }
                };
                if (typeof type !== "string") {
                    obj = type;
                    type = undefined;
                }
                type = type || "fx";
                while (i--) {
                    tmp = dataPriv.get(elements[i], type + "queueHooks");
                    if (tmp && tmp.empty) {
                        count++;
                        tmp.empty.add(resolve);
                    }
                }
                resolve();
                return defer.promise(obj);
            }
        });
        var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
        var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
        var cssExpand = ["Top", "Right", "Bottom", "Left"];
        var isHiddenWithinTree = function (elem, el) {
            // isHiddenWithinTree might be called from jQuery#filter function;
            // in that case, element will be second argument
            elem = el || elem;
            // Inline style trumps all
            return elem.style.display === "none" ||
                elem.style.display === "" &&
                    // Otherwise, check computed style
                    // Support: Firefox <=43 - 45
                    // Disconnected elements can have computed display: none, so first confirm that elem is
                    // in the document.
                    jQuery.contains(elem.ownerDocument, elem) &&
                    jQuery.css(elem, "display") === "none";
        };
        var swap = function (elem, options, callback, args) {
            var ret, name, old = {};
            // Remember the old values, and insert the new ones
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            ret = callback.apply(elem, args || []);
            // Revert the old values
            for (name in options) {
                elem.style[name] = old[name];
            }
            return ret;
        };
        function adjustCSS(elem, prop, valueParts, tween) {
            var adjusted, scale = 1, maxIterations = 20, currentValue = tween ?
                function () {
                    return tween.cur();
                } :
                function () {
                    return jQuery.css(elem, prop, "");
                }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), 
            // Starting value computation is required for potential unit mismatches
            initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) &&
                rcssNum.exec(jQuery.css(elem, prop));
            if (initialInUnit && initialInUnit[3] !== unit) {
                // Trust units reported by jQuery.css
                unit = unit || initialInUnit[3];
                // Make sure we update the tween properties later on
                valueParts = valueParts || [];
                // Iteratively approximate from a nonzero starting point
                initialInUnit = +initial || 1;
                do {
                    // If previous iteration zeroed out, double until we get *something*.
                    // Use string for doubling so we don't accidentally see scale as unchanged below
                    scale = scale || ".5";
                    // Adjust and apply
                    initialInUnit = initialInUnit / scale;
                    jQuery.style(elem, prop, initialInUnit + unit);
                    // Update scale, tolerating zero or NaN from tween.cur()
                    // Break the loop if scale is unchanged or perfect, or if we've just had enough.
                } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
            }
            if (valueParts) {
                initialInUnit = +initialInUnit || +initial || 0;
                // Apply relative offset (+=/-=) if specified
                adjusted = valueParts[1] ?
                    initialInUnit + (valueParts[1] + 1) * valueParts[2] :
                    +valueParts[2];
                if (tween) {
                    tween.unit = unit;
                    tween.start = initialInUnit;
                    tween.end = adjusted;
                }
            }
            return adjusted;
        }
        var defaultDisplayMap = {};
        function getDefaultDisplay(elem) {
            var temp, doc = elem.ownerDocument, nodeName = elem.nodeName, display = defaultDisplayMap[nodeName];
            if (display) {
                return display;
            }
            temp = doc.body.appendChild(doc.createElement(nodeName));
            display = jQuery.css(temp, "display");
            temp.parentNode.removeChild(temp);
            if (display === "none") {
                display = "block";
            }
            defaultDisplayMap[nodeName] = display;
            return display;
        }
        function showHide(elements, show) {
            var display, elem, values = [], index = 0, length = elements.length;
            // Determine new display value for elements that need to change
            for (; index < length; index++) {
                elem = elements[index];
                if (!elem.style) {
                    continue;
                }
                display = elem.style.display;
                if (show) {
                    // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
                    // check is required in this first loop unless we have a nonempty display value (either
                    // inline or about-to-be-restored)
                    if (display === "none") {
                        values[index] = dataPriv.get(elem, "display") || null;
                        if (!values[index]) {
                            elem.style.display = "";
                        }
                    }
                    if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                        values[index] = getDefaultDisplay(elem);
                    }
                }
                else {
                    if (display !== "none") {
                        values[index] = "none";
                        // Remember what we're overwriting
                        dataPriv.set(elem, "display", display);
                    }
                }
            }
            // Set the display of the elements in a second loop to avoid constant reflow
            for (index = 0; index < length; index++) {
                if (values[index] != null) {
                    elements[index].style.display = values[index];
                }
            }
            return elements;
        }
        jQuery.fn.extend({
            show: function () {
                return showHide(this, true);
            },
            hide: function () {
                return showHide(this);
            },
            toggle: function (state) {
                if (typeof state === "boolean") {
                    return state ? this.show() : this.hide();
                }
                return this.each(function () {
                    if (isHiddenWithinTree(this)) {
                        jQuery(this).show();
                    }
                    else {
                        jQuery(this).hide();
                    }
                });
            }
        });
        var rcheckableType = (/^(?:checkbox|radio)$/i);
        var rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]+)/i);
        var rscriptType = (/^$|\/(?:java|ecma)script/i);
        // We have to close these tags to support XHTML (#13200)
        var wrapMap = {
            // Support: IE <=9 only
            option: [1, "<select multiple='multiple'>", "</select>"],
            // XHTML parsers do not magically insert elements in the
            // same way that tag soup parsers do. So we cannot shorten
            // this by omitting <tbody> or other required elements.
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
        // Support: IE <=9 only
        wrapMap.optgroup = wrapMap.option;
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;
        function getAll(context, tag) {
            // Support: IE <=9 - 11 only
            // Use typeof to avoid zero-argument method invocation on host objects (#15151)
            var ret;
            if (typeof context.getElementsByTagName !== "undefined") {
                ret = context.getElementsByTagName(tag || "*");
            }
            else if (typeof context.querySelectorAll !== "undefined") {
                ret = context.querySelectorAll(tag || "*");
            }
            else {
                ret = [];
            }
            if (tag === undefined || tag && nodeName(context, tag)) {
                return jQuery.merge([context], ret);
            }
            return ret;
        }
        // Mark scripts as having already been evaluated
        function setGlobalEval(elems, refElements) {
            var i = 0, l = elems.length;
            for (; i < l; i++) {
                dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
            }
        }
        var rhtml = /<|&#?\w+;/;
        function buildFragment(elems, context, scripts, selection, ignored) {
            var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
            for (; i < l; i++) {
                elem = elems[i];
                if (elem || elem === 0) {
                    // Add nodes directly
                    if (jQuery.type(elem) === "object") {
                        // Support: Android <=4.0 only, PhantomJS 1 only
                        // push.apply(_, arraylike) throws on ancient WebKit
                        jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                        // Convert non-html into a text node
                    }
                    else if (!rhtml.test(elem)) {
                        nodes.push(context.createTextNode(elem));
                        // Convert html into DOM nodes
                    }
                    else {
                        tmp = tmp || fragment.appendChild(context.createElement("div"));
                        // Deserialize a standard representation
                        tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
                        // Descend through wrappers to the right content
                        j = wrap[0];
                        while (j--) {
                            tmp = tmp.lastChild;
                        }
                        // Support: Android <=4.0 only, PhantomJS 1 only
                        // push.apply(_, arraylike) throws on ancient WebKit
                        jQuery.merge(nodes, tmp.childNodes);
                        // Remember the top-level container
                        tmp = fragment.firstChild;
                        // Ensure the created nodes are orphaned (#12392)
                        tmp.textContent = "";
                    }
                }
            }
            // Remove wrapper from fragment
            fragment.textContent = "";
            i = 0;
            while ((elem = nodes[i++])) {
                // Skip elements already in the context collection (trac-4087)
                if (selection && jQuery.inArray(elem, selection) > -1) {
                    if (ignored) {
                        ignored.push(elem);
                    }
                    continue;
                }
                contains = jQuery.contains(elem.ownerDocument, elem);
                // Append to fragment
                tmp = getAll(fragment.appendChild(elem), "script");
                // Preserve script evaluation history
                if (contains) {
                    setGlobalEval(tmp);
                }
                // Capture executables
                if (scripts) {
                    j = 0;
                    while ((elem = tmp[j++])) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem);
                        }
                    }
                }
            }
            return fragment;
        }
        (function () {
            var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
            // Support: Android 4.0 - 4.3 only
            // Check state lost if the name is set (#11217)
            // Support: Windows Web Apps (WWA)
            // `name` and `type` must use .setAttribute for WWA (#14901)
            input.setAttribute("type", "radio");
            input.setAttribute("checked", "checked");
            input.setAttribute("name", "t");
            div.appendChild(input);
            // Support: Android <=4.1 only
            // Older WebKit doesn't clone checked state correctly in fragments
            support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
            // Support: IE <=11 only
            // Make sure textarea (and checkbox) defaultValue is properly cloned
            div.innerHTML = "<textarea>x</textarea>";
            support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
        })();
        var documentElement = document.documentElement;
        var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
        function returnTrue() {
            return true;
        }
        function returnFalse() {
            return false;
        }
        // Support: IE <=9 only
        // See #13393 for more info
        function safeActiveElement() {
            try {
                return document.activeElement;
            }
            catch (err) { }
        }
        function on(elem, types, selector, data, fn, one) {
            var origFn, type;
            // Types can be a map of types/handlers
            if (typeof types === "object") {
                // ( types-Object, selector, data )
                if (typeof selector !== "string") {
                    // ( types-Object, data )
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    on(elem, type, selector, data, types[type], one);
                }
                return elem;
            }
            if (data == null && fn == null) {
                // ( types, fn )
                fn = selector;
                data = selector = undefined;
            }
            else if (fn == null) {
                if (typeof selector === "string") {
                    // ( types, selector, fn )
                    fn = data;
                    data = undefined;
                }
                else {
                    // ( types, data, fn )
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            }
            else if (!fn) {
                return elem;
            }
            if (one === 1) {
                origFn = fn;
                fn = function (event) {
                    // Can use an empty set, since event contains the info
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                // Use same guid so caller can remove using origFn
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return elem.each(function () {
                jQuery.event.add(this, types, fn, data, selector);
            });
        }
        /*
         * Helper functions for managing events -- not part of the public interface.
         * Props to Dean Edwards' addEvent library for many of the ideas.
         */
        jQuery.event = {
            global: {},
            add: function (elem, types, handler, data, selector) {
                var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
                // Don't attach events to noData or text/comment nodes (but allow plain objects)
                if (!elemData) {
                    return;
                }
                // Caller can pass in an object of custom data in lieu of the handler
                if (handler.handler) {
                    handleObjIn = handler;
                    handler = handleObjIn.handler;
                    selector = handleObjIn.selector;
                }
                // Ensure that invalid selectors throw exceptions at attach time
                // Evaluate against documentElement in case elem is a non-element node (e.g., document)
                if (selector) {
                    jQuery.find.matchesSelector(documentElement, selector);
                }
                // Make sure that the handler has a unique ID, used to find/remove it later
                if (!handler.guid) {
                    handler.guid = jQuery.guid++;
                }
                // Init the element's event structure and main handler, if this is the first
                if (!(events = elemData.events)) {
                    events = elemData.events = {};
                }
                if (!(eventHandle = elemData.handle)) {
                    eventHandle = elemData.handle = function (e) {
                        // Discard the second event of a jQuery.event.trigger() and
                        // when an event is called after a page has unloaded
                        return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
                            jQuery.event.dispatch.apply(elem, arguments) : undefined;
                    };
                }
                // Handle multiple events separated by a space
                types = (types || "").match(rnothtmlwhite) || [""];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = (tmp[2] || "").split(".").sort();
                    // There *must* be a type, no attaching namespace-only handlers
                    if (!type) {
                        continue;
                    }
                    // If event changes its type, use the special event handlers for the changed type
                    special = jQuery.event.special[type] || {};
                    // If selector defined, determine special event api type, otherwise given type
                    type = (selector ? special.delegateType : special.bindType) || type;
                    // Update special based on newly reset type
                    special = jQuery.event.special[type] || {};
                    // handleObj is passed to all event handlers
                    handleObj = jQuery.extend({
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                        namespace: namespaces.join(".")
                    }, handleObjIn);
                    // Init the event handler queue if we're the first
                    if (!(handlers = events[type])) {
                        handlers = events[type] = [];
                        handlers.delegateCount = 0;
                        // Only use addEventListener if the special events handler returns false
                        if (!special.setup ||
                            special.setup.call(elem, data, namespaces, eventHandle) === false) {
                            if (elem.addEventListener) {
                                elem.addEventListener(type, eventHandle);
                            }
                        }
                    }
                    if (special.add) {
                        special.add.call(elem, handleObj);
                        if (!handleObj.handler.guid) {
                            handleObj.handler.guid = handler.guid;
                        }
                    }
                    // Add to the element's handler list, delegates in front
                    if (selector) {
                        handlers.splice(handlers.delegateCount++, 0, handleObj);
                    }
                    else {
                        handlers.push(handleObj);
                    }
                    // Keep track of which events have ever been used, for event optimization
                    jQuery.event.global[type] = true;
                }
            },
            // Detach an event or set of events from an element
            remove: function (elem, types, handler, selector, mappedTypes) {
                var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
                if (!elemData || !(events = elemData.events)) {
                    return;
                }
                // Once for each type.namespace in types; type may be omitted
                types = (types || "").match(rnothtmlwhite) || [""];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = (tmp[2] || "").split(".").sort();
                    // Unbind all events (on this namespace, if provided) for the element
                    if (!type) {
                        for (type in events) {
                            jQuery.event.remove(elem, type + types[t], handler, selector, true);
                        }
                        continue;
                    }
                    special = jQuery.event.special[type] || {};
                    type = (selector ? special.delegateType : special.bindType) || type;
                    handlers = events[type] || [];
                    tmp = tmp[2] &&
                        new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                    // Remove matching events
                    origCount = j = handlers.length;
                    while (j--) {
                        handleObj = handlers[j];
                        if ((mappedTypes || origType === handleObj.origType) &&
                            (!handler || handler.guid === handleObj.guid) &&
                            (!tmp || tmp.test(handleObj.namespace)) &&
                            (!selector || selector === handleObj.selector ||
                                selector === "**" && handleObj.selector)) {
                            handlers.splice(j, 1);
                            if (handleObj.selector) {
                                handlers.delegateCount--;
                            }
                            if (special.remove) {
                                special.remove.call(elem, handleObj);
                            }
                        }
                    }
                    // Remove generic event handler if we removed something and no more handlers exist
                    // (avoids potential for endless recursion during removal of special event handlers)
                    if (origCount && !handlers.length) {
                        if (!special.teardown ||
                            special.teardown.call(elem, namespaces, elemData.handle) === false) {
                            jQuery.removeEvent(elem, type, elemData.handle);
                        }
                        delete events[type];
                    }
                }
                // Remove data and the expando if it's no longer used
                if (jQuery.isEmptyObject(events)) {
                    dataPriv.remove(elem, "handle events");
                }
            },
            dispatch: function (nativeEvent) {
                // Make a writable jQuery.Event from the native event object
                var event = jQuery.event.fix(nativeEvent);
                var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), handlers = (dataPriv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
                // Use the fix-ed jQuery.Event rather than the (read-only) native event
                args[0] = event;
                for (i = 1; i < arguments.length; i++) {
                    args[i] = arguments[i];
                }
                event.delegateTarget = this;
                // Call the preDispatch hook for the mapped type, and let it bail if desired
                if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                    return;
                }
                // Determine handlers
                handlerQueue = jQuery.event.handlers.call(this, event, handlers);
                // Run delegates first; they may want to stop propagation beneath us
                i = 0;
                while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                    event.currentTarget = matched.elem;
                    j = 0;
                    while ((handleObj = matched.handlers[j++]) &&
                        !event.isImmediatePropagationStopped()) {
                        // Triggered event must either 1) have no namespace, or 2) have namespace(s)
                        // a subset or equal to those in the bound event (both can have no namespace).
                        if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
                            event.handleObj = handleObj;
                            event.data = handleObj.data;
                            ret = ((jQuery.event.special[handleObj.origType] || {}).handle ||
                                handleObj.handler).apply(matched.elem, args);
                            if (ret !== undefined) {
                                if ((event.result = ret) === false) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                            }
                        }
                    }
                }
                // Call the postDispatch hook for the mapped type
                if (special.postDispatch) {
                    special.postDispatch.call(this, event);
                }
                return event.result;
            },
            handlers: function (event, handlers) {
                var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
                // Find delegate handlers
                if (delegateCount &&
                    // Support: IE <=9
                    // Black-hole SVG <use> instance trees (trac-13180)
                    cur.nodeType &&
                    // Support: Firefox <=42
                    // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
                    // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
                    // Support: IE 11 only
                    // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
                    !(event.type === "click" && event.button >= 1)) {
                    for (; cur !== this; cur = cur.parentNode || this) {
                        // Don't check non-elements (#13208)
                        // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                        if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                            matchedHandlers = [];
                            matchedSelectors = {};
                            for (i = 0; i < delegateCount; i++) {
                                handleObj = handlers[i];
                                // Don't conflict with Object.prototype properties (#13203)
                                sel = handleObj.selector + " ";
                                if (matchedSelectors[sel] === undefined) {
                                    matchedSelectors[sel] = handleObj.needsContext ?
                                        jQuery(sel, this).index(cur) > -1 :
                                        jQuery.find(sel, this, null, [cur]).length;
                                }
                                if (matchedSelectors[sel]) {
                                    matchedHandlers.push(handleObj);
                                }
                            }
                            if (matchedHandlers.length) {
                                handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                            }
                        }
                    }
                }
                // Add the remaining (directly-bound) handlers
                cur = this;
                if (delegateCount < handlers.length) {
                    handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
                }
                return handlerQueue;
            },
            addProp: function (name, hook) {
                Object.defineProperty(jQuery.Event.prototype, name, {
                    enumerable: true,
                    configurable: true,
                    get: jQuery.isFunction(hook) ?
                        function () {
                            if (this.originalEvent) {
                                return hook(this.originalEvent);
                            }
                        } :
                        function () {
                            if (this.originalEvent) {
                                return this.originalEvent[name];
                            }
                        },
                    set: function (value) {
                        Object.defineProperty(this, name, {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: value
                        });
                    }
                });
            },
            fix: function (originalEvent) {
                return originalEvent[jQuery.expando] ?
                    originalEvent :
                    new jQuery.Event(originalEvent);
            },
            special: {
                load: {
                    // Prevent triggered image.load events from bubbling to window.load
                    noBubble: true
                },
                focus: {
                    // Fire native event if possible so blur/focus sequence is correct
                    trigger: function () {
                        if (this !== safeActiveElement() && this.focus) {
                            this.focus();
                            return false;
                        }
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function () {
                        if (this === safeActiveElement() && this.blur) {
                            this.blur();
                            return false;
                        }
                    },
                    delegateType: "focusout"
                },
                click: {
                    // For checkbox, fire native event so checked state will be right
                    trigger: function () {
                        if (this.type === "checkbox" && this.click && nodeName(this, "input")) {
                            this.click();
                            return false;
                        }
                    },
                    // For cross-browser consistency, don't fire native .click() on links
                    _default: function (event) {
                        return nodeName(event.target, "a");
                    }
                },
                beforeunload: {
                    postDispatch: function (event) {
                        // Support: Firefox 20+
                        // Firefox doesn't alert if the returnValue field is not set.
                        if (event.result !== undefined && event.originalEvent) {
                            event.originalEvent.returnValue = event.result;
                        }
                    }
                }
            }
        };
        jQuery.removeEvent = function (elem, type, handle) {
            // This "if" is needed for plain objects
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handle);
            }
        };
        jQuery.Event = function (src, props) {
            // Allow instantiation without the 'new' keyword
            if (!(this instanceof jQuery.Event)) {
                return new jQuery.Event(src, props);
            }
            // Event object
            if (src && src.type) {
                this.originalEvent = src;
                this.type = src.type;
                // Events bubbling up the document may have been marked as prevented
                // by a handler lower down the tree; reflect the correct value.
                this.isDefaultPrevented = src.defaultPrevented ||
                    src.defaultPrevented === undefined &&
                        // Support: Android <=2.3 only
                        src.returnValue === false ?
                    returnTrue :
                    returnFalse;
                // Create target properties
                // Support: Safari <=6 - 7 only
                // Target should not be a text node (#504, #13143)
                this.target = (src.target && src.target.nodeType === 3) ?
                    src.target.parentNode :
                    src.target;
                this.currentTarget = src.currentTarget;
                this.relatedTarget = src.relatedTarget;
                // Event type
            }
            else {
                this.type = src;
            }
            // Put explicitly provided properties onto the event object
            if (props) {
                jQuery.extend(this, props);
            }
            // Create a timestamp if incoming event doesn't have one
            this.timeStamp = src && src.timeStamp || jQuery.now();
            // Mark it as fixed
            this[jQuery.expando] = true;
        };
        // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
        // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
        jQuery.Event.prototype = {
            constructor: jQuery.Event,
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            isSimulated: false,
            preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue;
                if (e && !this.isSimulated) {
                    e.preventDefault();
                }
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue;
                if (e && !this.isSimulated) {
                    e.stopPropagation();
                }
            },
            stopImmediatePropagation: function () {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = returnTrue;
                if (e && !this.isSimulated) {
                    e.stopImmediatePropagation();
                }
                this.stopPropagation();
            }
        };
        // Includes all common event props including KeyEvent and MouseEvent specific props
        jQuery.each({
            altKey: true,
            bubbles: true,
            cancelable: true,
            changedTouches: true,
            ctrlKey: true,
            detail: true,
            eventPhase: true,
            metaKey: true,
            pageX: true,
            pageY: true,
            shiftKey: true,
            view: true,
            "char": true,
            charCode: true,
            key: true,
            keyCode: true,
            button: true,
            buttons: true,
            clientX: true,
            clientY: true,
            offsetX: true,
            offsetY: true,
            pointerId: true,
            pointerType: true,
            screenX: true,
            screenY: true,
            targetTouches: true,
            toElement: true,
            touches: true,
            which: function (event) {
                var button = event.button;
                // Add which for key events
                if (event.which == null && rkeyEvent.test(event.type)) {
                    return event.charCode != null ? event.charCode : event.keyCode;
                }
                // Add which for click: 1 === left; 2 === middle; 3 === right
                if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
                    if (button & 1) {
                        return 1;
                    }
                    if (button & 2) {
                        return 3;
                    }
                    if (button & 4) {
                        return 2;
                    }
                    return 0;
                }
                return event.which;
            }
        }, jQuery.event.addProp);
        // Create mouseenter/leave events using mouseover/out and event-time checks
        // so that event delegation works in jQuery.
        // Do the same for pointerenter/pointerleave and pointerover/pointerout
        //
        // Support: Safari 7 only
        // Safari sends mouseenter too often; see:
        // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
        // for the description of the bug (it existed in older Chrome versions as well).
        jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (orig, fix) {
            jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,
                handle: function (event) {
                    var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                    // For mouseenter/leave call the handler if related is outside the target.
                    // NB: No relatedTarget if the mouse left/entered the browser window
                    if (!related || (related !== target && !jQuery.contains(target, related))) {
                        event.type = handleObj.origType;
                        ret = handleObj.handler.apply(this, arguments);
                        event.type = fix;
                    }
                    return ret;
                }
            };
        });
        jQuery.fn.extend({
            on: function (types, selector, data, fn) {
                return on(this, types, selector, data, fn);
            },
            one: function (types, selector, data, fn) {
                return on(this, types, selector, data, fn, 1);
            },
            off: function (types, selector, fn) {
                var handleObj, type;
                if (types && types.preventDefault && types.handleObj) {
                    // ( event )  dispatched jQuery.Event
                    handleObj = types.handleObj;
                    jQuery(types.delegateTarget).off(handleObj.namespace ?
                        handleObj.origType + "." + handleObj.namespace :
                        handleObj.origType, handleObj.selector, handleObj.handler);
                    return this;
                }
                if (typeof types === "object") {
                    // ( types-object [, selector] )
                    for (type in types) {
                        this.off(type, selector, types[type]);
                    }
                    return this;
                }
                if (selector === false || typeof selector === "function") {
                    // ( types [, fn] )
                    fn = selector;
                    selector = undefined;
                }
                if (fn === false) {
                    fn = returnFalse;
                }
                return this.each(function () {
                    jQuery.event.remove(this, types, fn, selector);
                });
            }
        });
        var 
        /* eslint-disable max-len */
        // See https://github.com/eslint/eslint/issues/3229
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, 
        /* eslint-enable */
        // Support: IE <=10 - 11, Edge 12 - 13
        // In IE/Edge using regex groups here causes severe slowdowns.
        // See https://connect.microsoft.com/IE/feedback/details/1736512/
        rnoInnerhtml = /<script|<style|<link/i, 
        // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        // Prefer a tbody over its parent table for containing new rows
        function manipulationTarget(elem, content) {
            if (nodeName(elem, "table") &&
                nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
                return jQuery(">tbody", elem)[0] || elem;
            }
            return elem;
        }
        // Replace/restore the type attribute of script elements for safe DOM manipulation
        function disableScript(elem) {
            elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
            return elem;
        }
        function restoreScript(elem) {
            var match = rscriptTypeMasked.exec(elem.type);
            if (match) {
                elem.type = match[1];
            }
            else {
                elem.removeAttribute("type");
            }
            return elem;
        }
        function cloneCopyEvent(src, dest) {
            var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
            if (dest.nodeType !== 1) {
                return;
            }
            // 1. Copy private data: events, handlers, etc.
            if (dataPriv.hasData(src)) {
                pdataOld = dataPriv.access(src);
                pdataCur = dataPriv.set(dest, pdataOld);
                events = pdataOld.events;
                if (events) {
                    delete pdataCur.handle;
                    pdataCur.events = {};
                    for (type in events) {
                        for (i = 0, l = events[type].length; i < l; i++) {
                            jQuery.event.add(dest, type, events[type][i]);
                        }
                    }
                }
            }
            // 2. Copy user data
            if (dataUser.hasData(src)) {
                udataOld = dataUser.access(src);
                udataCur = jQuery.extend({}, udataOld);
                dataUser.set(dest, udataCur);
            }
        }
        // Fix IE bugs, see support tests
        function fixInput(src, dest) {
            var nodeName = dest.nodeName.toLowerCase();
            // Fails to persist the checked state of a cloned checkbox or radio button.
            if (nodeName === "input" && rcheckableType.test(src.type)) {
                dest.checked = src.checked;
                // Fails to return the selected option to the default selected state when cloning options
            }
            else if (nodeName === "input" || nodeName === "textarea") {
                dest.defaultValue = src.defaultValue;
            }
        }
        function domManip(collection, args, callback, ignored) {
            // Flatten any nested arrays
            args = concat.apply([], args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            // We can't cloneNode fragments that contain checked, in WebKit
            if (isFunction ||
                (l > 1 && typeof value === "string" &&
                    !support.checkClone && rchecked.test(value))) {
                return collection.each(function (index) {
                    var self = collection.eq(index);
                    if (isFunction) {
                        args[0] = value.call(this, index, self.html());
                    }
                    domManip(self, args, callback, ignored);
                });
            }
            if (l) {
                fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }
                // Require either new content or an interest in ignored elements to invoke the callback
                if (first || ignored) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;
                    // Use the original fragment for the last item
                    // instead of the first because it can end up
                    // being emptied incorrectly in certain situations (#8070).
                    for (; i < l; i++) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);
                            // Keep references to cloned scripts for later restoration
                            if (hasScripts) {
                                // Support: Android <=4.0 only, PhantomJS 1 only
                                // push.apply(_, arraylike) throws on ancient WebKit
                                jQuery.merge(scripts, getAll(node, "script"));
                            }
                        }
                        callback.call(collection[i], node, i);
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        // Reenable scripts
                        jQuery.map(scripts, restoreScript);
                        // Evaluate executable scripts on first document insertion
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") &&
                                !dataPriv.access(node, "globalEval") &&
                                jQuery.contains(doc, node)) {
                                if (node.src) {
                                    // Optional AJAX dependency, but won't run scripts if not present
                                    if (jQuery._evalUrl) {
                                        jQuery._evalUrl(node.src);
                                    }
                                }
                                else {
                                    DOMEval(node.textContent.replace(rcleanScript, ""), doc);
                                }
                            }
                        }
                    }
                }
            }
            return collection;
        }
        function remove(elem, selector, keepData) {
            var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0;
            for (; (node = nodes[i]) != null; i++) {
                if (!keepData && node.nodeType === 1) {
                    jQuery.cleanData(getAll(node));
                }
                if (node.parentNode) {
                    if (keepData && jQuery.contains(node.ownerDocument, node)) {
                        setGlobalEval(getAll(node, "script"));
                    }
                    node.parentNode.removeChild(node);
                }
            }
            return elem;
        }
        jQuery.extend({
            htmlPrefilter: function (html) {
                return html.replace(rxhtmlTag, "<$1></$2>");
            },
            clone: function (elem, dataAndEvents, deepDataAndEvents) {
                var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = jQuery.contains(elem.ownerDocument, elem);
                // Fix IE cloning issues
                if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
                    !jQuery.isXMLDoc(elem)) {
                    // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
                    destElements = getAll(clone);
                    srcElements = getAll(elem);
                    for (i = 0, l = srcElements.length; i < l; i++) {
                        fixInput(srcElements[i], destElements[i]);
                    }
                }
                // Copy the events from the original to the clone
                if (dataAndEvents) {
                    if (deepDataAndEvents) {
                        srcElements = srcElements || getAll(elem);
                        destElements = destElements || getAll(clone);
                        for (i = 0, l = srcElements.length; i < l; i++) {
                            cloneCopyEvent(srcElements[i], destElements[i]);
                        }
                    }
                    else {
                        cloneCopyEvent(elem, clone);
                    }
                }
                // Preserve script evaluation history
                destElements = getAll(clone, "script");
                if (destElements.length > 0) {
                    setGlobalEval(destElements, !inPage && getAll(elem, "script"));
                }
                // Return the cloned set
                return clone;
            },
            cleanData: function (elems) {
                var data, elem, type, special = jQuery.event.special, i = 0;
                for (; (elem = elems[i]) !== undefined; i++) {
                    if (acceptData(elem)) {
                        if ((data = elem[dataPriv.expando])) {
                            if (data.events) {
                                for (type in data.events) {
                                    if (special[type]) {
                                        jQuery.event.remove(elem, type);
                                        // This is a shortcut to avoid jQuery.event.remove's overhead
                                    }
                                    else {
                                        jQuery.removeEvent(elem, type, data.handle);
                                    }
                                }
                            }
                            // Support: Chrome <=35 - 45+
                            // Assign undefined instead of using delete, see Data#remove
                            elem[dataPriv.expando] = undefined;
                        }
                        if (elem[dataUser.expando]) {
                            // Support: Chrome <=35 - 45+
                            // Assign undefined instead of using delete, see Data#remove
                            elem[dataUser.expando] = undefined;
                        }
                    }
                }
            }
        });
        jQuery.fn.extend({
            detach: function (selector) {
                return remove(this, selector, true);
            },
            remove: function (selector) {
                return remove(this, selector);
            },
            text: function (value) {
                return access(this, function (value) {
                    return value === undefined ?
                        jQuery.text(this) :
                        this.empty().each(function () {
                            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                                this.textContent = value;
                            }
                        });
                }, null, value, arguments.length);
            },
            append: function () {
                return domManip(this, arguments, function (elem) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var target = manipulationTarget(this, elem);
                        target.appendChild(elem);
                    }
                });
            },
            prepend: function () {
                return domManip(this, arguments, function (elem) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var target = manipulationTarget(this, elem);
                        target.insertBefore(elem, target.firstChild);
                    }
                });
            },
            before: function () {
                return domManip(this, arguments, function (elem) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(elem, this);
                    }
                });
            },
            after: function () {
                return domManip(this, arguments, function (elem) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(elem, this.nextSibling);
                    }
                });
            },
            empty: function () {
                var elem, i = 0;
                for (; (elem = this[i]) != null; i++) {
                    if (elem.nodeType === 1) {
                        // Prevent memory leaks
                        jQuery.cleanData(getAll(elem, false));
                        // Remove any remaining nodes
                        elem.textContent = "";
                    }
                }
                return this;
            },
            clone: function (dataAndEvents, deepDataAndEvents) {
                dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
                deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
                return this.map(function () {
                    return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
                });
            },
            html: function (value) {
                return access(this, function (value) {
                    var elem = this[0] || {}, i = 0, l = this.length;
                    if (value === undefined && elem.nodeType === 1) {
                        return elem.innerHTML;
                    }
                    // See if we can take a shortcut and just use innerHTML
                    if (typeof value === "string" && !rnoInnerhtml.test(value) &&
                        !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                        value = jQuery.htmlPrefilter(value);
                        try {
                            for (; i < l; i++) {
                                elem = this[i] || {};
                                // Remove element nodes and prevent memory leaks
                                if (elem.nodeType === 1) {
                                    jQuery.cleanData(getAll(elem, false));
                                    elem.innerHTML = value;
                                }
                            }
                            elem = 0;
                            // If using innerHTML throws an exception, use the fallback method
                        }
                        catch (e) { }
                    }
                    if (elem) {
                        this.empty().append(value);
                    }
                }, null, value, arguments.length);
            },
            replaceWith: function () {
                var ignored = [];
                // Make the changes, replacing each non-ignored context element with the new content
                return domManip(this, arguments, function (elem) {
                    var parent = this.parentNode;
                    if (jQuery.inArray(this, ignored) < 0) {
                        jQuery.cleanData(getAll(this));
                        if (parent) {
                            parent.replaceChild(elem, this);
                        }
                    }
                    // Force callback invocation
                }, ignored);
            }
        });
        jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (name, original) {
            jQuery.fn[name] = function (selector) {
                var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
                for (; i <= last; i++) {
                    elems = i === last ? this : this.clone(true);
                    jQuery(insert[i])[original](elems);
                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // .get() because push.apply(_, arraylike) throws on ancient WebKit
                    push.apply(ret, elems.get());
                }
                return this.pushStack(ret);
            };
        });
        var rmargin = (/^margin/);
        var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
        var getStyles = function (elem) {
            // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
            // IE throws on elements created in popups
            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
            var view = elem.ownerDocument.defaultView;
            if (!view || !view.opener) {
                view = window;
            }
            return view.getComputedStyle(elem);
        };
        (function () {
            // Executing both pixelPosition & boxSizingReliable tests require only one layout
            // so they're executed at the same time to save the second computation.
            function computeStyleTests() {
                // This is a singleton, we need to execute it only once
                if (!div) {
                    return;
                }
                div.style.cssText =
                    "box-sizing:border-box;" +
                        "position:relative;display:block;" +
                        "margin:auto;border:1px;padding:1px;" +
                        "top:1%;width:50%";
                div.innerHTML = "";
                documentElement.appendChild(container);
                var divStyle = window.getComputedStyle(div);
                pixelPositionVal = divStyle.top !== "1%";
                // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
                reliableMarginLeftVal = divStyle.marginLeft === "2px";
                boxSizingReliableVal = divStyle.width === "4px";
                // Support: Android 4.0 - 4.3 only
                // Some styles come back with percentage values, even though they shouldn't
                div.style.marginRight = "50%";
                pixelMarginRightVal = divStyle.marginRight === "4px";
                documentElement.removeChild(container);
                // Nullify the div so it wouldn't be stored in the memory and
                // it will also be a sign that checks already performed
                div = null;
            }
            var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal, container = document.createElement("div"), div = document.createElement("div");
            // Finish early in limited (non-browser) environments
            if (!div.style) {
                return;
            }
            // Support: IE <=9 - 11 only
            // Style of cloned element affects source element cloned (#8908)
            div.style.backgroundClip = "content-box";
            div.cloneNode(true).style.backgroundClip = "";
            support.clearCloneStyle = div.style.backgroundClip === "content-box";
            container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
                "padding:0;margin-top:1px;position:absolute";
            container.appendChild(div);
            jQuery.extend(support, {
                pixelPosition: function () {
                    computeStyleTests();
                    return pixelPositionVal;
                },
                boxSizingReliable: function () {
                    computeStyleTests();
                    return boxSizingReliableVal;
                },
                pixelMarginRight: function () {
                    computeStyleTests();
                    return pixelMarginRightVal;
                },
                reliableMarginLeft: function () {
                    computeStyleTests();
                    return reliableMarginLeftVal;
                }
            });
        })();
        function curCSS(elem, name, computed) {
            var width, minWidth, maxWidth, ret, 
            // Support: Firefox 51+
            // Retrieving style before computed somehow
            // fixes an issue with getting wrong values
            // on detached elements
            style = elem.style;
            computed = computed || getStyles(elem);
            // getPropertyValue is needed for:
            //   .css('filter') (IE 9 only, #12537)
            //   .css('--customProperty) (#3144)
            if (computed) {
                ret = computed.getPropertyValue(name) || computed[name];
                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                    ret = jQuery.style(elem, name);
                }
                // A tribute to the "awesome hack by Dean Edwards"
                // Android Browser returns percentage for some values,
                // but width seems to be reliably pixels.
                // This is against the CSSOM draft spec:
                // https://drafts.csswg.org/cssom/#resolved-values
                if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
                    // Remember the original values
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    // Put in the new values to get a computed value out
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    // Revert the changed values
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }
            return ret !== undefined ?
                // Support: IE <=9 - 11 only
                // IE returns zIndex value as an integer.
                ret + "" :
                ret;
        }
        function addGetHookIf(conditionFn, hookFn) {
            // Define the hook, we'll check on the first run if it's really needed.
            return {
                get: function () {
                    if (conditionFn()) {
                        // Hook not needed (or it's not possible to use it due
                        // to missing dependency), remove it.
                        delete this.get;
                        return;
                    }
                    // Hook needed; redefine it so that the support test is not executed again.
                    return (this.get = hookFn).apply(this, arguments);
                }
            };
        }
        var 
        // Swappable if display is none or starts with table
        // except "table", "table-cell", or "table-caption"
        // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/, rcustomProp = /^--/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        }, cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document.createElement("div").style;
        // Return a css property mapped to a potentially vendor prefixed property
        function vendorPropName(name) {
            // Shortcut for names that are not vendor prefixed
            if (name in emptyStyle) {
                return name;
            }
            // Check for vendor prefixed names
            var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
            while (i--) {
                name = cssPrefixes[i] + capName;
                if (name in emptyStyle) {
                    return name;
                }
            }
        }
        // Return a property mapped along what jQuery.cssProps suggests or to
        // a vendor prefixed property.
        function finalPropName(name) {
            var ret = jQuery.cssProps[name];
            if (!ret) {
                ret = jQuery.cssProps[name] = vendorPropName(name) || name;
            }
            return ret;
        }
        function setPositiveNumber(elem, value, subtract) {
            // Any relative (+/-) values have already been
            // normalized at this point
            var matches = rcssNum.exec(value);
            return matches ?
                // Guard against undefined "subtract", e.g., when used as in cssHooks
                Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") :
                value;
        }
        function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
            var i, val = 0;
            // If we already have the right measurement, avoid augmentation
            if (extra === (isBorderBox ? "border" : "content")) {
                i = 4;
                // Otherwise initialize for horizontal or vertical properties
            }
            else {
                i = name === "width" ? 1 : 0;
            }
            for (; i < 4; i += 2) {
                // Both box models exclude margin, so add it if we want it
                if (extra === "margin") {
                    val += jQuery.css(elem, extra + cssExpand[i], true, styles);
                }
                if (isBorderBox) {
                    // border-box includes padding, so remove it if we want content
                    if (extra === "content") {
                        val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                    }
                    // At this point, extra isn't border nor margin, so remove border
                    if (extra !== "margin") {
                        val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                    }
                }
                else {
                    // At this point, extra isn't content, so add padding
                    val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                    // At this point, extra isn't content nor padding, so add border
                    if (extra !== "padding") {
                        val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                    }
                }
            }
            return val;
        }
        function getWidthOrHeight(elem, name, extra) {
            // Start with computed style
            var valueIsBorderBox, styles = getStyles(elem), val = curCSS(elem, name, styles), isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
            // Computed unit is not pixels. Stop here and return.
            if (rnumnonpx.test(val)) {
                return val;
            }
            // Check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox = isBorderBox &&
                (support.boxSizingReliable() || val === elem.style[name]);
            // Fall back to offsetWidth/Height when value is "auto"
            // This happens for inline elements with no explicit setting (gh-3571)
            if (val === "auto") {
                val = elem["offset" + name[0].toUpperCase() + name.slice(1)];
            }
            // Normalize "", auto, and prepare for extra
            val = parseFloat(val) || 0;
            // Use the active box-sizing model to add/subtract irrelevant styles
            return (val +
                augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
        }
        jQuery.extend({
            // Add in style property hooks for overriding the default
            // behavior of getting and setting a style property
            cssHooks: {
                opacity: {
                    get: function (elem, computed) {
                        if (computed) {
                            // We should always get a number back from opacity
                            var ret = curCSS(elem, "opacity");
                            return ret === "" ? "1" : ret;
                        }
                    }
                }
            },
            // Don't automatically add "px" to these possibly-unitless properties
            cssNumber: {
                "animationIterationCount": true,
                "columnCount": true,
                "fillOpacity": true,
                "flexGrow": true,
                "flexShrink": true,
                "fontWeight": true,
                "lineHeight": true,
                "opacity": true,
                "order": true,
                "orphans": true,
                "widows": true,
                "zIndex": true,
                "zoom": true
            },
            // Add in properties whose names you wish to fix before
            // setting or getting the value
            cssProps: {
                "float": "cssFloat"
            },
            // Get and set the style property on a DOM Node
            style: function (elem, name, value, extra) {
                // Don't set styles on text and comment nodes
                if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                    return;
                }
                // Make sure that we're working with the right name
                var ret, type, hooks, origName = jQuery.camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
                // Make sure that we're working with the right name. We don't
                // want to query the value if it is a CSS custom property
                // since they are user-defined.
                if (!isCustomProp) {
                    name = finalPropName(origName);
                }
                // Gets hook for the prefixed version, then unprefixed version
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                // Check if we're setting a value
                if (value !== undefined) {
                    type = typeof value;
                    // Convert "+=" or "-=" to relative numbers (#7345)
                    if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                        value = adjustCSS(elem, name, ret);
                        // Fixes bug #9237
                        type = "number";
                    }
                    // Make sure that null and NaN values aren't set (#7116)
                    if (value == null || value !== value) {
                        return;
                    }
                    // If a number was passed in, add the unit (except for certain CSS properties)
                    if (type === "number") {
                        value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
                    }
                    // background-* props affect original clone's values
                    if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                        style[name] = "inherit";
                    }
                    // If a hook was provided, use that value, otherwise just set the specified value
                    if (!hooks || !("set" in hooks) ||
                        (value = hooks.set(elem, value, extra)) !== undefined) {
                        if (isCustomProp) {
                            style.setProperty(name, value);
                        }
                        else {
                            style[name] = value;
                        }
                    }
                }
                else {
                    // If a hook was provided get the non-computed value from there
                    if (hooks && "get" in hooks &&
                        (ret = hooks.get(elem, false, extra)) !== undefined) {
                        return ret;
                    }
                    // Otherwise just get the value from the style object
                    return style[name];
                }
            },
            css: function (elem, name, extra, styles) {
                var val, num, hooks, origName = jQuery.camelCase(name), isCustomProp = rcustomProp.test(name);
                // Make sure that we're working with the right name. We don't
                // want to modify the value if it is a CSS custom property
                // since they are user-defined.
                if (!isCustomProp) {
                    name = finalPropName(origName);
                }
                // Try prefixed name followed by the unprefixed name
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                // If a hook was provided get the computed value from there
                if (hooks && "get" in hooks) {
                    val = hooks.get(elem, true, extra);
                }
                // Otherwise, if a way to get the computed value exists, use that
                if (val === undefined) {
                    val = curCSS(elem, name, styles);
                }
                // Convert "normal" to computed value
                if (val === "normal" && name in cssNormalTransform) {
                    val = cssNormalTransform[name];
                }
                // Make numeric if forced or a qualifier was provided and val looks numeric
                if (extra === "" || extra) {
                    num = parseFloat(val);
                    return extra === true || isFinite(num) ? num || 0 : val;
                }
                return val;
            }
        });
        jQuery.each(["height", "width"], function (i, name) {
            jQuery.cssHooks[name] = {
                get: function (elem, computed, extra) {
                    if (computed) {
                        // Certain elements can have dimension info if we invisibly show them
                        // but it must have a current display style that would benefit
                        return rdisplayswap.test(jQuery.css(elem, "display")) &&
                            // Support: Safari 8+
                            // Table columns in Safari have non-zero offsetWidth & zero
                            // getBoundingClientRect().width unless display is changed.
                            // Support: IE <=11 only
                            // Running getBoundingClientRect on a disconnected node
                            // in IE throws an error.
                            (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ?
                            swap(elem, cssShow, function () {
                                return getWidthOrHeight(elem, name, extra);
                            }) :
                            getWidthOrHeight(elem, name, extra);
                    }
                },
                set: function (elem, value, extra) {
                    var matches, styles = extra && getStyles(elem), subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);
                    // Convert to pixels if value adjustment is needed
                    if (subtract && (matches = rcssNum.exec(value)) &&
                        (matches[3] || "px") !== "px") {
                        elem.style[name] = value;
                        value = jQuery.css(elem, name);
                    }
                    return setPositiveNumber(elem, value, subtract);
                }
            };
        });
        jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
            if (computed) {
                return (parseFloat(curCSS(elem, "marginLeft")) ||
                    elem.getBoundingClientRect().left -
                        swap(elem, { marginLeft: 0 }, function () {
                            return elem.getBoundingClientRect().left;
                        })) + "px";
            }
        });
        // These hooks are used by animate to expand properties
        jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function (prefix, suffix) {
            jQuery.cssHooks[prefix + suffix] = {
                expand: function (value) {
                    var i = 0, expanded = {}, 
                    // Assumes a single number if not a string
                    parts = typeof value === "string" ? value.split(" ") : [value];
                    for (; i < 4; i++) {
                        expanded[prefix + cssExpand[i] + suffix] =
                            parts[i] || parts[i - 2] || parts[0];
                    }
                    return expanded;
                }
            };
            if (!rmargin.test(prefix)) {
                jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
            }
        });
        jQuery.fn.extend({
            css: function (name, value) {
                return access(this, function (elem, name, value) {
                    var styles, len, map = {}, i = 0;
                    if (Array.isArray(name)) {
                        styles = getStyles(elem);
                        len = name.length;
                        for (; i < len; i++) {
                            map[name[i]] = jQuery.css(elem, name[i], false, styles);
                        }
                        return map;
                    }
                    return value !== undefined ?
                        jQuery.style(elem, name, value) :
                        jQuery.css(elem, name);
                }, name, value, arguments.length > 1);
            }
        });
        function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing);
        }
        jQuery.Tween = Tween;
        Tween.prototype = {
            constructor: Tween,
            init: function (elem, options, prop, end, easing, unit) {
                this.elem = elem;
                this.prop = prop;
                this.easing = easing || jQuery.easing._default;
                this.options = options;
                this.start = this.now = this.cur();
                this.end = end;
                this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
            },
            cur: function () {
                var hooks = Tween.propHooks[this.prop];
                return hooks && hooks.get ?
                    hooks.get(this) :
                    Tween.propHooks._default.get(this);
            },
            run: function (percent) {
                var eased, hooks = Tween.propHooks[this.prop];
                if (this.options.duration) {
                    this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
                }
                else {
                    this.pos = eased = percent;
                }
                this.now = (this.end - this.start) * eased + this.start;
                if (this.options.step) {
                    this.options.step.call(this.elem, this.now, this);
                }
                if (hooks && hooks.set) {
                    hooks.set(this);
                }
                else {
                    Tween.propHooks._default.set(this);
                }
                return this;
            }
        };
        Tween.prototype.init.prototype = Tween.prototype;
        Tween.propHooks = {
            _default: {
                get: function (tween) {
                    var result;
                    // Use a property on the element directly when it is not a DOM element,
                    // or when there is no matching style property that exists.
                    if (tween.elem.nodeType !== 1 ||
                        tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                        return tween.elem[tween.prop];
                    }
                    // Passing an empty string as a 3rd parameter to .css will automatically
                    // attempt a parseFloat and fallback to a string if the parse fails.
                    // Simple values such as "10px" are parsed to Float;
                    // complex values such as "rotate(1rad)" are returned as-is.
                    result = jQuery.css(tween.elem, tween.prop, "");
                    // Empty strings, null, undefined and "auto" are converted to 0.
                    return !result || result === "auto" ? 0 : result;
                },
                set: function (tween) {
                    // Use step hook for back compat.
                    // Use cssHook if its there.
                    // Use .style if available and use plain properties where available.
                    if (jQuery.fx.step[tween.prop]) {
                        jQuery.fx.step[tween.prop](tween);
                    }
                    else if (tween.elem.nodeType === 1 &&
                        (tween.elem.style[jQuery.cssProps[tween.prop]] != null ||
                            jQuery.cssHooks[tween.prop])) {
                        jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                    }
                    else {
                        tween.elem[tween.prop] = tween.now;
                    }
                }
            }
        };
        // Support: IE <=9 only
        // Panic based approach to setting things on disconnected nodes
        Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function (tween) {
                if (tween.elem.nodeType && tween.elem.parentNode) {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        };
        jQuery.easing = {
            linear: function (p) {
                return p;
            },
            swing: function (p) {
                return 0.5 - Math.cos(p * Math.PI) / 2;
            },
            _default: "swing"
        };
        jQuery.fx = Tween.prototype.init;
        // Back compat <1.8 extension point
        jQuery.fx.step = {};
        var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
        function schedule() {
            if (inProgress) {
                if (document.hidden === false && window.requestAnimationFrame) {
                    window.requestAnimationFrame(schedule);
                }
                else {
                    window.setTimeout(schedule, jQuery.fx.interval);
                }
                jQuery.fx.tick();
            }
        }
        // Animations created synchronously will run synchronously
        function createFxNow() {
            window.setTimeout(function () {
                fxNow = undefined;
            });
            return (fxNow = jQuery.now());
        }
        // Generate parameters to create a standard animation
        function genFx(type, includeWidth) {
            var which, i = 0, attrs = { height: type };
            // If we include width, step value is 1 to do all cssExpand values,
            // otherwise step value is 2 to skip over Left and Right
            includeWidth = includeWidth ? 1 : 0;
            for (; i < 4; i += 2 - includeWidth) {
                which = cssExpand[i];
                attrs["margin" + which] = attrs["padding" + which] = type;
            }
            if (includeWidth) {
                attrs.opacity = attrs.width = type;
            }
            return attrs;
        }
        function createTween(value, prop, animation) {
            var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
            for (; index < length; index++) {
                if ((tween = collection[index].call(animation, prop, value))) {
                    // We're done with this property
                    return tween;
                }
            }
        }
        function defaultPrefilter(elem, props, opts) {
            var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
            // Queue-skipping animations hijack the fx hooks
            if (!opts.queue) {
                hooks = jQuery._queueHooks(elem, "fx");
                if (hooks.unqueued == null) {
                    hooks.unqueued = 0;
                    oldfire = hooks.empty.fire;
                    hooks.empty.fire = function () {
                        if (!hooks.unqueued) {
                            oldfire();
                        }
                    };
                }
                hooks.unqueued++;
                anim.always(function () {
                    // Ensure the complete handler is called before this completes
                    anim.always(function () {
                        hooks.unqueued--;
                        if (!jQuery.queue(elem, "fx").length) {
                            hooks.empty.fire();
                        }
                    });
                });
            }
            // Detect show/hide animations
            for (prop in props) {
                value = props[prop];
                if (rfxtypes.test(value)) {
                    delete props[prop];
                    toggle = toggle || value === "toggle";
                    if (value === (hidden ? "hide" : "show")) {
                        // Pretend to be hidden if this is a "show" and
                        // there is still data from a stopped show/hide
                        if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                            hidden = true;
                            // Ignore all other no-op show/hide data
                        }
                        else {
                            continue;
                        }
                    }
                    orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
                }
            }
            // Bail out if this is a no-op like .hide().hide()
            propTween = !jQuery.isEmptyObject(props);
            if (!propTween && jQuery.isEmptyObject(orig)) {
                return;
            }
            // Restrict "overflow" and "display" styles during box animations
            if (isBox && elem.nodeType === 1) {
                // Support: IE <=9 - 11, Edge 12 - 13
                // Record all 3 overflow attributes because IE does not infer the shorthand
                // from identically-valued overflowX and overflowY
                opts.overflow = [style.overflow, style.overflowX, style.overflowY];
                // Identify a display type, preferring old show/hide data over the CSS cascade
                restoreDisplay = dataShow && dataShow.display;
                if (restoreDisplay == null) {
                    restoreDisplay = dataPriv.get(elem, "display");
                }
                display = jQuery.css(elem, "display");
                if (display === "none") {
                    if (restoreDisplay) {
                        display = restoreDisplay;
                    }
                    else {
                        // Get nonempty value(s) by temporarily forcing visibility
                        showHide([elem], true);
                        restoreDisplay = elem.style.display || restoreDisplay;
                        display = jQuery.css(elem, "display");
                        showHide([elem]);
                    }
                }
                // Animate inline elements as inline-block
                if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
                    if (jQuery.css(elem, "float") === "none") {
                        // Restore the original display value at the end of pure show/hide animations
                        if (!propTween) {
                            anim.done(function () {
                                style.display = restoreDisplay;
                            });
                            if (restoreDisplay == null) {
                                display = style.display;
                                restoreDisplay = display === "none" ? "" : display;
                            }
                        }
                        style.display = "inline-block";
                    }
                }
            }
            if (opts.overflow) {
                style.overflow = "hidden";
                anim.always(function () {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2];
                });
            }
            // Implement show/hide animations
            propTween = false;
            for (prop in orig) {
                // General show/hide setup for this element animation
                if (!propTween) {
                    if (dataShow) {
                        if ("hidden" in dataShow) {
                            hidden = dataShow.hidden;
                        }
                    }
                    else {
                        dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
                    }
                    // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
                    if (toggle) {
                        dataShow.hidden = !hidden;
                    }
                    // Show elements before animating them
                    if (hidden) {
                        showHide([elem], true);
                    }
                    /* eslint-disable no-loop-func */
                    anim.done(function () {
                        /* eslint-enable no-loop-func */
                        // The final step of a "hide" animation is actually hiding the element
                        if (!hidden) {
                            showHide([elem]);
                        }
                        dataPriv.remove(elem, "fxshow");
                        for (prop in orig) {
                            jQuery.style(elem, prop, orig[prop]);
                        }
                    });
                }
                // Per-property setup
                propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                if (!(prop in dataShow)) {
                    dataShow[prop] = propTween.start;
                    if (hidden) {
                        propTween.end = propTween.start;
                        propTween.start = 0;
                    }
                }
            }
        }
        function propFilter(props, specialEasing) {
            var index, name, easing, value, hooks;
            // camelCase, specialEasing and expand cssHook pass
            for (index in props) {
                name = jQuery.camelCase(index);
                easing = specialEasing[name];
                value = props[index];
                if (Array.isArray(value)) {
                    easing = value[1];
                    value = props[index] = value[0];
                }
                if (index !== name) {
                    props[name] = value;
                    delete props[index];
                }
                hooks = jQuery.cssHooks[name];
                if (hooks && "expand" in hooks) {
                    value = hooks.expand(value);
                    delete props[name];
                    // Not quite $.extend, this won't overwrite existing keys.
                    // Reusing 'index' because we have the correct "name"
                    for (index in value) {
                        if (!(index in props)) {
                            props[index] = value[index];
                            specialEasing[index] = easing;
                        }
                    }
                }
                else {
                    specialEasing[name] = easing;
                }
            }
        }
        function Animation(elem, properties, options) {
            var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function () {
                // Don't match elem in the :animated selector
                delete tick.elem;
            }), tick = function () {
                if (stopped) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), 
                // Support: Android 2.3 only
                // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
                temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
                for (; index < length; index++) {
                    animation.tweens[index].run(percent);
                }
                deferred.notifyWith(elem, [animation, percent, remaining]);
                // If there's more to do, yield
                if (percent < 1 && length) {
                    return remaining;
                }
                // If this was an empty animation, synthesize a final progress notification
                if (!length) {
                    deferred.notifyWith(elem, [animation, 1, 0]);
                }
                // Resolve the animation and report its conclusion
                deferred.resolveWith(elem, [animation]);
                return false;
            }, animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {},
                    easing: jQuery.easing._default
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function (prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function (gotoEnd) {
                    var index = 0, 
                    // If we are going to the end, we want to run all the tweens
                    // otherwise we skip this part
                    length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this;
                    }
                    stopped = true;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1);
                    }
                    // Resolve when we played the last frame; otherwise, reject
                    if (gotoEnd) {
                        deferred.notifyWith(elem, [animation, 1, 0]);
                        deferred.resolveWith(elem, [animation, gotoEnd]);
                    }
                    else {
                        deferred.rejectWith(elem, [animation, gotoEnd]);
                    }
                    return this;
                }
            }), props = animation.props;
            propFilter(props, animation.opts.specialEasing);
            for (; index < length; index++) {
                result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
                if (result) {
                    if (jQuery.isFunction(result.stop)) {
                        jQuery._queueHooks(animation.elem, animation.opts.queue).stop =
                            jQuery.proxy(result.stop, result);
                    }
                    return result;
                }
            }
            jQuery.map(props, createTween, animation);
            if (jQuery.isFunction(animation.opts.start)) {
                animation.opts.start.call(elem, animation);
            }
            // Attach callbacks from options
            animation
                .progress(animation.opts.progress)
                .done(animation.opts.done, animation.opts.complete)
                .fail(animation.opts.fail)
                .always(animation.opts.always);
            jQuery.fx.timer(jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            }));
            return animation;
        }
        jQuery.Animation = jQuery.extend(Animation, {
            tweeners: {
                "*": [function (prop, value) {
                        var tween = this.createTween(prop, value);
                        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                        return tween;
                    }]
            },
            tweener: function (props, callback) {
                if (jQuery.isFunction(props)) {
                    callback = props;
                    props = ["*"];
                }
                else {
                    props = props.match(rnothtmlwhite);
                }
                var prop, index = 0, length = props.length;
                for (; index < length; index++) {
                    prop = props[index];
                    Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                    Animation.tweeners[prop].unshift(callback);
                }
            },
            prefilters: [defaultPrefilter],
            prefilter: function (callback, prepend) {
                if (prepend) {
                    Animation.prefilters.unshift(callback);
                }
                else {
                    Animation.prefilters.push(callback);
                }
            }
        });
        jQuery.speed = function (speed, easing, fn) {
            var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing ||
                    jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            // Go to the end state if fx are off
            if (jQuery.fx.off) {
                opt.duration = 0;
            }
            else {
                if (typeof opt.duration !== "number") {
                    if (opt.duration in jQuery.fx.speeds) {
                        opt.duration = jQuery.fx.speeds[opt.duration];
                    }
                    else {
                        opt.duration = jQuery.fx.speeds._default;
                    }
                }
            }
            // Normalize opt.queue - true/undefined/null -> "fx"
            if (opt.queue == null || opt.queue === true) {
                opt.queue = "fx";
            }
            // Queueing
            opt.old = opt.complete;
            opt.complete = function () {
                if (jQuery.isFunction(opt.old)) {
                    opt.old.call(this);
                }
                if (opt.queue) {
                    jQuery.dequeue(this, opt.queue);
                }
            };
            return opt;
        };
        jQuery.fn.extend({
            fadeTo: function (speed, to, easing, callback) {
                // Show any hidden elements after setting opacity to 0
                return this.filter(isHiddenWithinTree).css("opacity", 0).show()
                    // Animate to the value specified
                    .end().animate({ opacity: to }, speed, easing, callback);
            },
            animate: function (prop, speed, easing, callback) {
                var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function () {
                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation(this, jQuery.extend({}, prop), optall);
                    // Empty animations, or finishing resolves immediately
                    if (empty || dataPriv.get(this, "finish")) {
                        anim.stop(true);
                    }
                };
                doAnimation.finish = doAnimation;
                return empty || optall.queue === false ?
                    this.each(doAnimation) :
                    this.queue(optall.queue, doAnimation);
            },
            stop: function (type, clearQueue, gotoEnd) {
                var stopQueue = function (hooks) {
                    var stop = hooks.stop;
                    delete hooks.stop;
                    stop(gotoEnd);
                };
                if (typeof type !== "string") {
                    gotoEnd = clearQueue;
                    clearQueue = type;
                    type = undefined;
                }
                if (clearQueue && type !== false) {
                    this.queue(type || "fx", []);
                }
                return this.each(function () {
                    var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data = dataPriv.get(this);
                    if (index) {
                        if (data[index] && data[index].stop) {
                            stopQueue(data[index]);
                        }
                    }
                    else {
                        for (index in data) {
                            if (data[index] && data[index].stop && rrun.test(index)) {
                                stopQueue(data[index]);
                            }
                        }
                    }
                    for (index = timers.length; index--;) {
                        if (timers[index].elem === this &&
                            (type == null || timers[index].queue === type)) {
                            timers[index].anim.stop(gotoEnd);
                            dequeue = false;
                            timers.splice(index, 1);
                        }
                    }
                    // Start the next in the queue if the last step wasn't forced.
                    // Timers currently will call their complete callbacks, which
                    // will dequeue but only if they were gotoEnd.
                    if (dequeue || !gotoEnd) {
                        jQuery.dequeue(this, type);
                    }
                });
            },
            finish: function (type) {
                if (type !== false) {
                    type = type || "fx";
                }
                return this.each(function () {
                    var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                    // Enable finishing flag on private data
                    data.finish = true;
                    // Empty the queue first
                    jQuery.queue(this, type, []);
                    if (hooks && hooks.stop) {
                        hooks.stop.call(this, true);
                    }
                    // Look for any active animations, and finish them
                    for (index = timers.length; index--;) {
                        if (timers[index].elem === this && timers[index].queue === type) {
                            timers[index].anim.stop(true);
                            timers.splice(index, 1);
                        }
                    }
                    // Look for any animations in the old queue and finish them
                    for (index = 0; index < length; index++) {
                        if (queue[index] && queue[index].finish) {
                            queue[index].finish.call(this);
                        }
                    }
                    // Turn off finishing flag
                    delete data.finish;
                });
            }
        });
        jQuery.each(["toggle", "show", "hide"], function (i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function (speed, easing, callback) {
                return speed == null || typeof speed === "boolean" ?
                    cssFn.apply(this, arguments) :
                    this.animate(genFx(name, true), speed, easing, callback);
            };
        });
        // Generate shortcuts for custom animations
        jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: { opacity: "show" },
            fadeOut: { opacity: "hide" },
            fadeToggle: { opacity: "toggle" }
        }, function (name, props) {
            jQuery.fn[name] = function (speed, easing, callback) {
                return this.animate(props, speed, easing, callback);
            };
        });
        jQuery.timers = [];
        jQuery.fx.tick = function () {
            var timer, i = 0, timers = jQuery.timers;
            fxNow = jQuery.now();
            for (; i < timers.length; i++) {
                timer = timers[i];
                // Run the timer and safely remove it when done (allowing for external removal)
                if (!timer() && timers[i] === timer) {
                    timers.splice(i--, 1);
                }
            }
            if (!timers.length) {
                jQuery.fx.stop();
            }
            fxNow = undefined;
        };
        jQuery.fx.timer = function (timer) {
            jQuery.timers.push(timer);
            jQuery.fx.start();
        };
        jQuery.fx.interval = 13;
        jQuery.fx.start = function () {
            if (inProgress) {
                return;
            }
            inProgress = true;
            schedule();
        };
        jQuery.fx.stop = function () {
            inProgress = null;
        };
        jQuery.fx.speeds = {
            slow: 600,
            fast: 200,
            // Default speed
            _default: 400
        };
        // Based off of the plugin by Clint Helfers, with permission.
        // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
        jQuery.fn.delay = function (time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function (next, hooks) {
                var timeout = window.setTimeout(next, time);
                hooks.stop = function () {
                    window.clearTimeout(timeout);
                };
            });
        };
        (function () {
            var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
            input.type = "checkbox";
            // Support: Android <=4.3 only
            // Default value for a checkbox should be "on"
            support.checkOn = input.value !== "";
            // Support: IE <=11 only
            // Must access selectedIndex to make default options select
            support.optSelected = opt.selected;
            // Support: IE <=11 only
            // An input loses its value after becoming a radio
            input = document.createElement("input");
            input.value = "t";
            input.type = "radio";
            support.radioValue = input.value === "t";
        })();
        var boolHook, attrHandle = jQuery.expr.attrHandle;
        jQuery.fn.extend({
            attr: function (name, value) {
                return access(this, jQuery.attr, name, value, arguments.length > 1);
            },
            removeAttr: function (name) {
                return this.each(function () {
                    jQuery.removeAttr(this, name);
                });
            }
        });
        jQuery.extend({
            attr: function (elem, name, value) {
                var ret, hooks, nType = elem.nodeType;
                // Don't get/set attributes on text, comment and attribute nodes
                if (nType === 3 || nType === 8 || nType === 2) {
                    return;
                }
                // Fallback to prop when attributes are not supported
                if (typeof elem.getAttribute === "undefined") {
                    return jQuery.prop(elem, name, value);
                }
                // Attribute hooks are determined by the lowercase version
                // Grab necessary hook if one is defined
                if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                    hooks = jQuery.attrHooks[name.toLowerCase()] ||
                        (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
                }
                if (value !== undefined) {
                    if (value === null) {
                        jQuery.removeAttr(elem, name);
                        return;
                    }
                    if (hooks && "set" in hooks &&
                        (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret;
                    }
                    elem.setAttribute(name, value + "");
                    return value;
                }
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;
                }
                ret = jQuery.find.attr(elem, name);
                // Non-existent attributes return null, we normalize to undefined
                return ret == null ? undefined : ret;
            },
            attrHooks: {
                type: {
                    set: function (elem, value) {
                        if (!support.radioValue && value === "radio" &&
                            nodeName(elem, "input")) {
                            var val = elem.value;
                            elem.setAttribute("type", value);
                            if (val) {
                                elem.value = val;
                            }
                            return value;
                        }
                    }
                }
            },
            removeAttr: function (elem, value) {
                var name, i = 0, 
                // Attribute names can contain non-HTML whitespace characters
                // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
                attrNames = value && value.match(rnothtmlwhite);
                if (attrNames && elem.nodeType === 1) {
                    while ((name = attrNames[i++])) {
                        elem.removeAttribute(name);
                    }
                }
            }
        });
        // Hooks for boolean attributes
        boolHook = {
            set: function (elem, value, name) {
                if (value === false) {
                    // Remove boolean attributes when set to false
                    jQuery.removeAttr(elem, name);
                }
                else {
                    elem.setAttribute(name, name);
                }
                return name;
            }
        };
        jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
            var getter = attrHandle[name] || jQuery.find.attr;
            attrHandle[name] = function (elem, name, isXML) {
                var ret, handle, lowercaseName = name.toLowerCase();
                if (!isXML) {
                    // Avoid an infinite loop by temporarily removing this function from the getter
                    handle = attrHandle[lowercaseName];
                    attrHandle[lowercaseName] = ret;
                    ret = getter(elem, name, isXML) != null ?
                        lowercaseName :
                        null;
                    attrHandle[lowercaseName] = handle;
                }
                return ret;
            };
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
        jQuery.fn.extend({
            prop: function (name, value) {
                return access(this, jQuery.prop, name, value, arguments.length > 1);
            },
            removeProp: function (name) {
                return this.each(function () {
                    delete this[jQuery.propFix[name] || name];
                });
            }
        });
        jQuery.extend({
            prop: function (elem, name, value) {
                var ret, hooks, nType = elem.nodeType;
                // Don't get/set properties on text, comment and attribute nodes
                if (nType === 3 || nType === 8 || nType === 2) {
                    return;
                }
                if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                    // Fix name and attach hooks
                    name = jQuery.propFix[name] || name;
                    hooks = jQuery.propHooks[name];
                }
                if (value !== undefined) {
                    if (hooks && "set" in hooks &&
                        (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret;
                    }
                    return (elem[name] = value);
                }
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;
                }
                return elem[name];
            },
            propHooks: {
                tabIndex: {
                    get: function (elem) {
                        // Support: IE <=9 - 11 only
                        // elem.tabIndex doesn't always return the
                        // correct value when it hasn't been explicitly set
                        // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                        // Use proper attribute retrieval(#12072)
                        var tabindex = jQuery.find.attr(elem, "tabindex");
                        if (tabindex) {
                            return parseInt(tabindex, 10);
                        }
                        if (rfocusable.test(elem.nodeName) ||
                            rclickable.test(elem.nodeName) &&
                                elem.href) {
                            return 0;
                        }
                        return -1;
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        });
        // Support: IE <=11 only
        // Accessing the selectedIndex property
        // forces the browser to respect setting selected
        // on the option
        // The getter ensures a default option is selected
        // when in an optgroup
        // eslint rule "no-unused-expressions" is disabled for this code
        // since it considers such accessions noop
        if (!support.optSelected) {
            jQuery.propHooks.selected = {
                get: function (elem) {
                    /* eslint no-unused-expressions: "off" */
                    var parent = elem.parentNode;
                    if (parent && parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                    return null;
                },
                set: function (elem) {
                    /* eslint no-unused-expressions: "off" */
                    var parent = elem.parentNode;
                    if (parent) {
                        parent.selectedIndex;
                        if (parent.parentNode) {
                            parent.parentNode.selectedIndex;
                        }
                    }
                }
            };
        }
        jQuery.each([
            "tabIndex",
            "readOnly",
            "maxLength",
            "cellSpacing",
            "cellPadding",
            "rowSpan",
            "colSpan",
            "useMap",
            "frameBorder",
            "contentEditable"
        ], function () {
            jQuery.propFix[this.toLowerCase()] = this;
        });
        // Strip and collapse whitespace according to HTML spec
        // https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
        function stripAndCollapse(value) {
            var tokens = value.match(rnothtmlwhite) || [];
            return tokens.join(" ");
        }
        function getClass(elem) {
            return elem.getAttribute && elem.getAttribute("class") || "";
        }
        jQuery.fn.extend({
            addClass: function (value) {
                var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                if (jQuery.isFunction(value)) {
                    return this.each(function (j) {
                        jQuery(this).addClass(value.call(this, j, getClass(this)));
                    });
                }
                if (typeof value === "string" && value) {
                    classes = value.match(rnothtmlwhite) || [];
                    while ((elem = this[i++])) {
                        curValue = getClass(elem);
                        cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
                        if (cur) {
                            j = 0;
                            while ((clazz = classes[j++])) {
                                if (cur.indexOf(" " + clazz + " ") < 0) {
                                    cur += clazz + " ";
                                }
                            }
                            // Only assign if different to avoid unneeded rendering.
                            finalValue = stripAndCollapse(cur);
                            if (curValue !== finalValue) {
                                elem.setAttribute("class", finalValue);
                            }
                        }
                    }
                }
                return this;
            },
            removeClass: function (value) {
                var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                if (jQuery.isFunction(value)) {
                    return this.each(function (j) {
                        jQuery(this).removeClass(value.call(this, j, getClass(this)));
                    });
                }
                if (!arguments.length) {
                    return this.attr("class", "");
                }
                if (typeof value === "string" && value) {
                    classes = value.match(rnothtmlwhite) || [];
                    while ((elem = this[i++])) {
                        curValue = getClass(elem);
                        // This expression is here for better compressibility (see addClass)
                        cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
                        if (cur) {
                            j = 0;
                            while ((clazz = classes[j++])) {
                                // Remove *all* instances
                                while (cur.indexOf(" " + clazz + " ") > -1) {
                                    cur = cur.replace(" " + clazz + " ", " ");
                                }
                            }
                            // Only assign if different to avoid unneeded rendering.
                            finalValue = stripAndCollapse(cur);
                            if (curValue !== finalValue) {
                                elem.setAttribute("class", finalValue);
                            }
                        }
                    }
                }
                return this;
            },
            toggleClass: function (value, stateVal) {
                var type = typeof value;
                if (typeof stateVal === "boolean" && type === "string") {
                    return stateVal ? this.addClass(value) : this.removeClass(value);
                }
                if (jQuery.isFunction(value)) {
                    return this.each(function (i) {
                        jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
                    });
                }
                return this.each(function () {
                    var className, i, self, classNames;
                    if (type === "string") {
                        // Toggle individual class names
                        i = 0;
                        self = jQuery(this);
                        classNames = value.match(rnothtmlwhite) || [];
                        while ((className = classNames[i++])) {
                            // Check each className given, space separated list
                            if (self.hasClass(className)) {
                                self.removeClass(className);
                            }
                            else {
                                self.addClass(className);
                            }
                        }
                        // Toggle whole class name
                    }
                    else if (value === undefined || type === "boolean") {
                        className = getClass(this);
                        if (className) {
                            // Store className if set
                            dataPriv.set(this, "__className__", className);
                        }
                        // If the element has a class name or if we're passed `false`,
                        // then remove the whole classname (if there was one, the above saved it).
                        // Otherwise bring back whatever was previously saved (if anything),
                        // falling back to the empty string if nothing was stored.
                        if (this.setAttribute) {
                            this.setAttribute("class", className || value === false ?
                                "" :
                                dataPriv.get(this, "__className__") || "");
                        }
                    }
                });
            },
            hasClass: function (selector) {
                var className, elem, i = 0;
                className = " " + selector + " ";
                while ((elem = this[i++])) {
                    if (elem.nodeType === 1 &&
                        (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
                        return true;
                    }
                }
                return false;
            }
        });
        var rreturn = /\r/g;
        jQuery.fn.extend({
            val: function (value) {
                var hooks, ret, isFunction, elem = this[0];
                if (!arguments.length) {
                    if (elem) {
                        hooks = jQuery.valHooks[elem.type] ||
                            jQuery.valHooks[elem.nodeName.toLowerCase()];
                        if (hooks &&
                            "get" in hooks &&
                            (ret = hooks.get(elem, "value")) !== undefined) {
                            return ret;
                        }
                        ret = elem.value;
                        // Handle most common string cases
                        if (typeof ret === "string") {
                            return ret.replace(rreturn, "");
                        }
                        // Handle cases where value is null/undef or number
                        return ret == null ? "" : ret;
                    }
                    return;
                }
                isFunction = jQuery.isFunction(value);
                return this.each(function (i) {
                    var val;
                    if (this.nodeType !== 1) {
                        return;
                    }
                    if (isFunction) {
                        val = value.call(this, i, jQuery(this).val());
                    }
                    else {
                        val = value;
                    }
                    // Treat null/undefined as ""; convert numbers to string
                    if (val == null) {
                        val = "";
                    }
                    else if (typeof val === "number") {
                        val += "";
                    }
                    else if (Array.isArray(val)) {
                        val = jQuery.map(val, function (value) {
                            return value == null ? "" : value + "";
                        });
                    }
                    hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                    // If set returns undefined, fall back to normal setting
                    if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                        this.value = val;
                    }
                });
            }
        });
        jQuery.extend({
            valHooks: {
                option: {
                    get: function (elem) {
                        var val = jQuery.find.attr(elem, "value");
                        return val != null ?
                            val :
                            // Support: IE <=10 - 11 only
                            // option.text throws exceptions (#14686, #14858)
                            // Strip and collapse whitespace
                            // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                            stripAndCollapse(jQuery.text(elem));
                    }
                },
                select: {
                    get: function (elem) {
                        var value, option, i, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
                        if (index < 0) {
                            i = max;
                        }
                        else {
                            i = one ? index : 0;
                        }
                        // Loop through all the selected options
                        for (; i < max; i++) {
                            option = options[i];
                            // Support: IE <=9 only
                            // IE8-9 doesn't update selected after form reset (#2551)
                            if ((option.selected || i === index) &&
                                // Don't return options that are disabled or in a disabled optgroup
                                !option.disabled &&
                                (!option.parentNode.disabled ||
                                    !nodeName(option.parentNode, "optgroup"))) {
                                // Get the specific value for the option
                                value = jQuery(option).val();
                                // We don't need an array for one selects
                                if (one) {
                                    return value;
                                }
                                // Multi-Selects return an array
                                values.push(value);
                            }
                        }
                        return values;
                    },
                    set: function (elem, value) {
                        var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                        while (i--) {
                            option = options[i];
                            /* eslint-disable no-cond-assign */
                            if (option.selected =
                                jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                                optionSet = true;
                            }
                            /* eslint-enable no-cond-assign */
                        }
                        // Force browsers to behave consistently when non-matching value is set
                        if (!optionSet) {
                            elem.selectedIndex = -1;
                        }
                        return values;
                    }
                }
            }
        });
        // Radios and checkboxes getter/setter
        jQuery.each(["radio", "checkbox"], function () {
            jQuery.valHooks[this] = {
                set: function (elem, value) {
                    if (Array.isArray(value)) {
                        return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
                    }
                }
            };
            if (!support.checkOn) {
                jQuery.valHooks[this].get = function (elem) {
                    return elem.getAttribute("value") === null ? "on" : elem.value;
                };
            }
        });
        // Return jQuery for attributes-only inclusion
        var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
        jQuery.extend(jQuery.event, {
            trigger: function (event, data, elem, onlyHandlers) {
                var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
                cur = tmp = elem = elem || document;
                // Don't do events on text and comment nodes
                if (elem.nodeType === 3 || elem.nodeType === 8) {
                    return;
                }
                // focus/blur morphs to focusin/out; ensure we're not firing them right now
                if (rfocusMorph.test(type + jQuery.event.triggered)) {
                    return;
                }
                if (type.indexOf(".") > -1) {
                    // Namespaced trigger; create a regexp to match event type in handle()
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    namespaces.sort();
                }
                ontype = type.indexOf(":") < 0 && "on" + type;
                // Caller can pass in a jQuery.Event object, Object, or just an event type string
                event = event[jQuery.expando] ?
                    event :
                    new jQuery.Event(type, typeof event === "object" && event);
                // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
                event.isTrigger = onlyHandlers ? 2 : 3;
                event.namespace = namespaces.join(".");
                event.rnamespace = event.namespace ?
                    new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                    null;
                // Clean up the event in case it is being reused
                event.result = undefined;
                if (!event.target) {
                    event.target = elem;
                }
                // Clone any incoming data and prepend the event, creating the handler arg list
                data = data == null ?
                    [event] :
                    jQuery.makeArray(data, [event]);
                // Allow special events to draw outside the lines
                special = jQuery.event.special[type] || {};
                if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                    return;
                }
                // Determine event propagation path in advance, per W3C events spec (#9951)
                // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    bubbleType = special.delegateType || type;
                    if (!rfocusMorph.test(bubbleType + type)) {
                        cur = cur.parentNode;
                    }
                    for (; cur; cur = cur.parentNode) {
                        eventPath.push(cur);
                        tmp = cur;
                    }
                    // Only add window if we got to document (e.g., not plain obj or detached DOM)
                    if (tmp === (elem.ownerDocument || document)) {
                        eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                    }
                }
                // Fire handlers on the event path
                i = 0;
                while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                    event.type = i > 1 ?
                        bubbleType :
                        special.bindType || type;
                    // jQuery handler
                    handle = (dataPriv.get(cur, "events") || {})[event.type] &&
                        dataPriv.get(cur, "handle");
                    if (handle) {
                        handle.apply(cur, data);
                    }
                    // Native handler
                    handle = ontype && cur[ontype];
                    if (handle && handle.apply && acceptData(cur)) {
                        event.result = handle.apply(cur, data);
                        if (event.result === false) {
                            event.preventDefault();
                        }
                    }
                }
                event.type = type;
                // If nobody prevented the default action, do it now
                if (!onlyHandlers && !event.isDefaultPrevented()) {
                    if ((!special._default ||
                        special._default.apply(eventPath.pop(), data) === false) &&
                        acceptData(elem)) {
                        // Call a native DOM method on the target with the same name as the event.
                        // Don't do default actions on window, that's where global variables be (#6170)
                        if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
                            // Don't re-trigger an onFOO event when we call its FOO() method
                            tmp = elem[ontype];
                            if (tmp) {
                                elem[ontype] = null;
                            }
                            // Prevent re-triggering of the same event, since we already bubbled it above
                            jQuery.event.triggered = type;
                            elem[type]();
                            jQuery.event.triggered = undefined;
                            if (tmp) {
                                elem[ontype] = tmp;
                            }
                        }
                    }
                }
                return event.result;
            },
            // Piggyback on a donor event to simulate a different one
            // Used only for `focus(in | out)` events
            simulate: function (type, elem, event) {
                var e = jQuery.extend(new jQuery.Event(), event, {
                    type: type,
                    isSimulated: true
                });
                jQuery.event.trigger(e, null, elem);
            }
        });
        jQuery.fn.extend({
            trigger: function (type, data) {
                return this.each(function () {
                    jQuery.event.trigger(type, data, this);
                });
            },
            triggerHandler: function (type, data) {
                var elem = this[0];
                if (elem) {
                    return jQuery.event.trigger(type, data, elem, true);
                }
            }
        });
        jQuery.each(("blur focus focusin focusout resize scroll click dblclick " +
            "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
            "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {
            // Handle event binding
            jQuery.fn[name] = function (data, fn) {
                return arguments.length > 0 ?
                    this.on(name, null, data, fn) :
                    this.trigger(name);
            };
        });
        jQuery.fn.extend({
            hover: function (fnOver, fnOut) {
                return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
            }
        });
        support.focusin = "onfocusin" in window;
        // Support: Firefox <=44
        // Firefox doesn't have focus(in | out) events
        // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
        //
        // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
        // focus(in | out) events fire after focus & blur events,
        // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
        // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
        if (!support.focusin) {
            jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {
                // Attach a single capturing handler on the document while someone wants focusin/focusout
                var handler = function (event) {
                    jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
                };
                jQuery.event.special[fix] = {
                    setup: function () {
                        var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix);
                        if (!attaches) {
                            doc.addEventListener(orig, handler, true);
                        }
                        dataPriv.access(doc, fix, (attaches || 0) + 1);
                    },
                    teardown: function () {
                        var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix) - 1;
                        if (!attaches) {
                            doc.removeEventListener(orig, handler, true);
                            dataPriv.remove(doc, fix);
                        }
                        else {
                            dataPriv.access(doc, fix, attaches);
                        }
                    }
                };
            });
        }
        var location = window.location;
        var nonce = jQuery.now();
        var rquery = (/\?/);
        // Cross-browser xml parsing
        jQuery.parseXML = function (data) {
            var xml;
            if (!data || typeof data !== "string") {
                return null;
            }
            // Support: IE 9 - 11 only
            // IE throws on parseFromString with invalid input.
            try {
                xml = (new window.DOMParser()).parseFromString(data, "text/xml");
            }
            catch (e) {
                xml = undefined;
            }
            if (!xml || xml.getElementsByTagName("parsererror").length) {
                jQuery.error("Invalid XML: " + data);
            }
            return xml;
        };
        var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
        function buildParams(prefix, obj, traditional, add) {
            var name;
            if (Array.isArray(obj)) {
                // Serialize array item.
                jQuery.each(obj, function (i, v) {
                    if (traditional || rbracket.test(prefix)) {
                        // Treat each array item as a scalar.
                        add(prefix, v);
                    }
                    else {
                        // Item is non-scalar (array or object), encode its numeric index.
                        buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
                    }
                });
            }
            else if (!traditional && jQuery.type(obj) === "object") {
                // Serialize object item.
                for (name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
                }
            }
            else {
                // Serialize scalar item.
                add(prefix, obj);
            }
        }
        // Serialize an array of form elements or a set of
        // key/values into a query string
        jQuery.param = function (a, traditional) {
            var prefix, s = [], add = function (key, valueOrFunction) {
                // If value is a function, invoke it and use its return value
                var value = jQuery.isFunction(valueOrFunction) ?
                    valueOrFunction() :
                    valueOrFunction;
                s[s.length] = encodeURIComponent(key) + "=" +
                    encodeURIComponent(value == null ? "" : value);
            };
            // If an array was passed in, assume that it is an array of form elements.
            if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
                // Serialize the form elements
                jQuery.each(a, function () {
                    add(this.name, this.value);
                });
            }
            else {
                // If traditional, encode the "old" way (the way 1.3.2 or older
                // did it), otherwise encode params recursively.
                for (prefix in a) {
                    buildParams(prefix, a[prefix], traditional, add);
                }
            }
            // Return the resulting serialization
            return s.join("&");
        };
        jQuery.fn.extend({
            serialize: function () {
                return jQuery.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    // Can add propHook for "elements" to filter or add form elements
                    var elements = jQuery.prop(this, "elements");
                    return elements ? jQuery.makeArray(elements) : this;
                })
                    .filter(function () {
                    var type = this.type;
                    // Use .is( ":disabled" ) so that fieldset[disabled] works
                    return this.name && !jQuery(this).is(":disabled") &&
                        rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
                        (this.checked || !rcheckableType.test(type));
                })
                    .map(function (i, elem) {
                    var val = jQuery(this).val();
                    if (val == null) {
                        return null;
                    }
                    if (Array.isArray(val)) {
                        return jQuery.map(val, function (val) {
                            return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                        });
                    }
                    return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                }).get();
            }
        });
        var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, 
        // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, 
        /* Prefilters
         * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
         * 2) These are called:
         *    - BEFORE asking for a transport
         *    - AFTER param serialization (s.data is a string if s.processData is true)
         * 3) key is the dataType
         * 4) the catchall symbol "*" can be used
         * 5) execution will start with transport dataType and THEN continue down to "*" if needed
         */
        prefilters = {}, 
        /* Transports bindings
         * 1) key is the dataType
         * 2) the catchall symbol "*" can be used
         * 3) selection will start with transport dataType and THEN go to "*" if needed
         */
        transports = {}, 
        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = "*/".concat("*"), 
        // Anchor tag for parsing the document origin
        originAnchor = document.createElement("a");
        originAnchor.href = location.href;
        // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
        function addToPrefiltersOrTransports(structure) {
            // dataTypeExpression is optional and defaults to "*"
            return function (dataTypeExpression, func) {
                if (typeof dataTypeExpression !== "string") {
                    func = dataTypeExpression;
                    dataTypeExpression = "*";
                }
                var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
                if (jQuery.isFunction(func)) {
                    // For each dataType in the dataTypeExpression
                    while ((dataType = dataTypes[i++])) {
                        // Prepend if requested
                        if (dataType[0] === "+") {
                            dataType = dataType.slice(1) || "*";
                            (structure[dataType] = structure[dataType] || []).unshift(func);
                            // Otherwise append
                        }
                        else {
                            (structure[dataType] = structure[dataType] || []).push(func);
                        }
                    }
                }
            };
        }
        // Base inspection function for prefilters and transports
        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
            var inspected = {}, seekingTransport = (structure === transports);
            function inspect(dataType) {
                var selected;
                inspected[dataType] = true;
                jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                    var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                    if (typeof dataTypeOrTransport === "string" &&
                        !seekingTransport && !inspected[dataTypeOrTransport]) {
                        options.dataTypes.unshift(dataTypeOrTransport);
                        inspect(dataTypeOrTransport);
                        return false;
                    }
                    else if (seekingTransport) {
                        return !(selected = dataTypeOrTransport);
                    }
                });
                return selected;
            }
            return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
        }
        // A special extend for ajax options
        // that takes "flat" options (not to be deep extended)
        // Fixes #9887
        function ajaxExtend(target, src) {
            var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
            for (key in src) {
                if (src[key] !== undefined) {
                    (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
                }
            }
            if (deep) {
                jQuery.extend(true, target, deep);
            }
            return target;
        }
        /* Handles responses to an ajax request:
         * - finds the right dataType (mediates between content-type and expected dataType)
         * - returns the corresponding response
         */
        function ajaxHandleResponses(s, jqXHR, responses) {
            var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
            // Remove auto dataType and get content-type in the process
            while (dataTypes[0] === "*") {
                dataTypes.shift();
                if (ct === undefined) {
                    ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
                }
            }
            // Check if we're dealing with a known content-type
            if (ct) {
                for (type in contents) {
                    if (contents[type] && contents[type].test(ct)) {
                        dataTypes.unshift(type);
                        break;
                    }
                }
            }
            // Check to see if we have a response for the expected dataType
            if (dataTypes[0] in responses) {
                finalDataType = dataTypes[0];
            }
            else {
                // Try convertible dataTypes
                for (type in responses) {
                    if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                        finalDataType = type;
                        break;
                    }
                    if (!firstDataType) {
                        firstDataType = type;
                    }
                }
                // Or just use first one
                finalDataType = finalDataType || firstDataType;
            }
            // If we found a dataType
            // We add the dataType to the list if needed
            // and return the corresponding response
            if (finalDataType) {
                if (finalDataType !== dataTypes[0]) {
                    dataTypes.unshift(finalDataType);
                }
                return responses[finalDataType];
            }
        }
        /* Chain conversions given the request and the original response
         * Also sets the responseXXX fields on the jqXHR instance
         */
        function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2, current, conv, tmp, prev, converters = {}, 
            // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();
            // Create converters map with lowercased keys
            if (dataTypes[1]) {
                for (conv in s.converters) {
                    converters[conv.toLowerCase()] = s.converters[conv];
                }
            }
            current = dataTypes.shift();
            // Convert to each sequential dataType
            while (current) {
                if (s.responseFields[current]) {
                    jqXHR[s.responseFields[current]] = response;
                }
                // Apply the dataFilter if provided
                if (!prev && isSuccess && s.dataFilter) {
                    response = s.dataFilter(response, s.dataType);
                }
                prev = current;
                current = dataTypes.shift();
                if (current) {
                    // There's only work to do if current dataType is non-auto
                    if (current === "*") {
                        current = prev;
                        // Convert response if prev dataType is non-auto and differs from current
                    }
                    else if (prev !== "*" && prev !== current) {
                        // Seek a direct converter
                        conv = converters[prev + " " + current] || converters["* " + current];
                        // If none found, seek a pair
                        if (!conv) {
                            for (conv2 in converters) {
                                // If conv2 outputs current
                                tmp = conv2.split(" ");
                                if (tmp[1] === current) {
                                    // If prev can be converted to accepted input
                                    conv = converters[prev + " " + tmp[0]] ||
                                        converters["* " + tmp[0]];
                                    if (conv) {
                                        // Condense equivalence converters
                                        if (conv === true) {
                                            conv = converters[conv2];
                                            // Otherwise, insert the intermediate dataType
                                        }
                                        else if (converters[conv2] !== true) {
                                            current = tmp[0];
                                            dataTypes.unshift(tmp[1]);
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        // Apply converter (if not an equivalence)
                        if (conv !== true) {
                            // Unless errors are allowed to bubble, catch and return them
                            if (conv && s.throws) {
                                response = conv(response);
                            }
                            else {
                                try {
                                    response = conv(response);
                                }
                                catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: conv ? e : "No conversion from " + prev + " to " + current
                                    };
                                }
                            }
                        }
                    }
                }
            }
            return { state: "success", data: response };
        }
        jQuery.extend({
            // Counter for holding the number of active queries
            active: 0,
            // Last-Modified header cache for next request
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: location.href,
                type: "GET",
                isLocal: rlocalProtocol.test(location.protocol),
                global: true,
                processData: true,
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                /*
                timeout: 0,
                data: null,
                dataType: null,
                username: null,
                password: null,
                cache: null,
                throws: false,
                traditional: false,
                headers: {},
                */
                accepts: {
                    "*": allTypes,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                // Data converters
                // Keys separate source (or catchall "*") and destination types with a single space
                converters: {
                    // Convert anything to text
                    "* text": String,
                    // Text to html (true = no transformation)
                    "text html": true,
                    // Evaluate text as a json expression
                    "text json": JSON.parse,
                    // Parse text as xml
                    "text xml": jQuery.parseXML
                },
                // For options that shouldn't be deep extended:
                // you can add your own custom options here if
                // and when you create one that shouldn't be
                // deep extended (see ajaxExtend)
                flatOptions: {
                    url: true,
                    context: true
                }
            },
            // Creates a full fledged settings object into target
            // with both ajaxSettings and settings fields.
            // If target is omitted, writes into ajaxSettings.
            ajaxSetup: function (target, settings) {
                return settings ?
                    // Building a settings object
                    ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :
                    // Extending ajaxSettings
                    ajaxExtend(jQuery.ajaxSettings, target);
            },
            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),
            // Main method
            ajax: function (url, options) {
                // If url is an object, simulate pre-1.5 signature
                if (typeof url === "object") {
                    options = url;
                    url = undefined;
                }
                // Force options to be an object
                options = options || {};
                var transport, 
                // URL without anti-cache param
                cacheURL, 
                // Response headers
                responseHeadersString, responseHeaders, 
                // timeout handle
                timeoutTimer, 
                // Url cleanup var
                urlAnchor, 
                // Request state (becomes false upon send and true upon completion)
                completed, 
                // To know if global events are to be dispatched
                fireGlobals, 
                // Loop variable
                i, 
                // uncached part of the url
                uncached, 
                // Create the final options object
                s = jQuery.ajaxSetup({}, options), 
                // Callbacks context
                callbackContext = s.context || s, 
                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context &&
                    (callbackContext.nodeType || callbackContext.jquery) ?
                    jQuery(callbackContext) :
                    jQuery.event, 
                // Deferreds
                deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), 
                // Status-dependent callbacks
                statusCode = s.statusCode || {}, 
                // Headers (they are sent all at once)
                requestHeaders = {}, requestHeadersNames = {}, 
                // Default abort message
                strAbort = "canceled", 
                // Fake xhr
                jqXHR = {
                    readyState: 0,
                    // Builds headers hashtable if needed
                    getResponseHeader: function (key) {
                        var match;
                        if (completed) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match == null ? null : match;
                    },
                    // Raw string
                    getAllResponseHeaders: function () {
                        return completed ? responseHeadersString : null;
                    },
                    // Caches the header
                    setRequestHeader: function (name, value) {
                        if (completed == null) {
                            name = requestHeadersNames[name.toLowerCase()] =
                                requestHeadersNames[name.toLowerCase()] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },
                    // Overrides response content-type header
                    overrideMimeType: function (type) {
                        if (completed == null) {
                            s.mimeType = type;
                        }
                        return this;
                    },
                    // Status-dependent callbacks
                    statusCode: function (map) {
                        var code;
                        if (map) {
                            if (completed) {
                                // Execute the appropriate callbacks
                                jqXHR.always(map[jqXHR.status]);
                            }
                            else {
                                // Lazy-add the new callbacks in a way that preserves old ones
                                for (code in map) {
                                    statusCode[code] = [statusCode[code], map[code]];
                                }
                            }
                        }
                        return this;
                    },
                    // Cancel the request
                    abort: function (statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    }
                };
                // Attach deferreds
                deferred.promise(jqXHR);
                // Add protocol if not provided (prefilters might expect it)
                // Handle falsy url in the settings object (#10093: consistency with old signature)
                // We also use the url parameter if available
                s.url = ((url || s.url || location.href) + "")
                    .replace(rprotocol, location.protocol + "//");
                // Alias method option to type as per ticket #12004
                s.type = options.method || options.type || s.method || s.type;
                // Extract dataTypes list
                s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
                // A cross-domain request is in order when the origin doesn't match the current origin.
                if (s.crossDomain == null) {
                    urlAnchor = document.createElement("a");
                    // Support: IE <=8 - 11, Edge 12 - 13
                    // IE throws exception on accessing the href property if url is malformed,
                    // e.g. http://example.com:80x/
                    try {
                        urlAnchor.href = s.url;
                        // Support: IE <=8 - 11 only
                        // Anchor's host property isn't correctly set when s.url is relative
                        urlAnchor.href = urlAnchor.href;
                        s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
                            urlAnchor.protocol + "//" + urlAnchor.host;
                    }
                    catch (e) {
                        // If there is an error parsing the URL, assume it is crossDomain,
                        // it can be rejected by the transport if it is invalid
                        s.crossDomain = true;
                    }
                }
                // Convert data if not already a string
                if (s.data && s.processData && typeof s.data !== "string") {
                    s.data = jQuery.param(s.data, s.traditional);
                }
                // Apply prefilters
                inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
                // If request was aborted inside a prefilter, stop there
                if (completed) {
                    return jqXHR;
                }
                // We can fire global events as of now if asked to
                // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
                fireGlobals = jQuery.event && s.global;
                // Watch for a new set of requests
                if (fireGlobals && jQuery.active++ === 0) {
                    jQuery.event.trigger("ajaxStart");
                }
                // Uppercase the type
                s.type = s.type.toUpperCase();
                // Determine if request has content
                s.hasContent = !rnoContent.test(s.type);
                // Save the URL in case we're toying with the If-Modified-Since
                // and/or If-None-Match header later on
                // Remove hash to simplify url manipulation
                cacheURL = s.url.replace(rhash, "");
                // More options handling for requests with no content
                if (!s.hasContent) {
                    // Remember the hash so we can put it back
                    uncached = s.url.slice(cacheURL.length);
                    // If data is available, append data to url
                    if (s.data) {
                        cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                        // #9682: remove data so that it's not used in an eventual retry
                        delete s.data;
                    }
                    // Add or update anti-cache param if needed
                    if (s.cache === false) {
                        cacheURL = cacheURL.replace(rantiCache, "$1");
                        uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + (nonce++) + uncached;
                    }
                    // Put hash and anti-cache on the URL that will be requested (gh-1732)
                    s.url = cacheURL + uncached;
                    // Change '%20' to '+' if this is encoded form body content (gh-2658)
                }
                else if (s.data && s.processData &&
                    (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
                    s.data = s.data.replace(r20, "+");
                }
                // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                if (s.ifModified) {
                    if (jQuery.lastModified[cacheURL]) {
                        jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                    }
                    if (jQuery.etag[cacheURL]) {
                        jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                    }
                }
                // Set the correct header, if data is being sent
                if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                    jqXHR.setRequestHeader("Content-Type", s.contentType);
                }
                // Set the Accepts header for the server, depending on the dataType
                jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
                    s.accepts[s.dataTypes[0]] +
                        (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
                    s.accepts["*"]);
                // Check for headers option
                for (i in s.headers) {
                    jqXHR.setRequestHeader(i, s.headers[i]);
                }
                // Allow custom headers/mimetypes and early abort
                if (s.beforeSend &&
                    (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
                    // Abort if not done already and return
                    return jqXHR.abort();
                }
                // Aborting is no longer a cancellation
                strAbort = "abort";
                // Install callbacks on deferreds
                completeDeferred.add(s.complete);
                jqXHR.done(s.success);
                jqXHR.fail(s.error);
                // Get transport
                transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
                // If no transport, we auto-abort
                if (!transport) {
                    done(-1, "No Transport");
                }
                else {
                    jqXHR.readyState = 1;
                    // Send global event
                    if (fireGlobals) {
                        globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                    }
                    // If request was aborted inside ajaxSend, stop there
                    if (completed) {
                        return jqXHR;
                    }
                    // Timeout
                    if (s.async && s.timeout > 0) {
                        timeoutTimer = window.setTimeout(function () {
                            jqXHR.abort("timeout");
                        }, s.timeout);
                    }
                    try {
                        completed = false;
                        transport.send(requestHeaders, done);
                    }
                    catch (e) {
                        // Rethrow post-completion exceptions
                        if (completed) {
                            throw e;
                        }
                        // Propagate others as results
                        done(-1, e);
                    }
                }
                // Callback for when everything is done
                function done(status, nativeStatusText, responses, headers) {
                    var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                    // Ignore repeat invocations
                    if (completed) {
                        return;
                    }
                    completed = true;
                    // Clear timeout if it exists
                    if (timeoutTimer) {
                        window.clearTimeout(timeoutTimer);
                    }
                    // Dereference transport for early garbage collection
                    // (no matter how long the jqXHR object will be used)
                    transport = undefined;
                    // Cache response headers
                    responseHeadersString = headers || "";
                    // Set readyState
                    jqXHR.readyState = status > 0 ? 4 : 0;
                    // Determine if successful
                    isSuccess = status >= 200 && status < 300 || status === 304;
                    // Get response data
                    if (responses) {
                        response = ajaxHandleResponses(s, jqXHR, responses);
                    }
                    // Convert no matter what (that way responseXXX fields are always set)
                    response = ajaxConvert(s, response, jqXHR, isSuccess);
                    // If successful, handle type chaining
                    if (isSuccess) {
                        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                        if (s.ifModified) {
                            modified = jqXHR.getResponseHeader("Last-Modified");
                            if (modified) {
                                jQuery.lastModified[cacheURL] = modified;
                            }
                            modified = jqXHR.getResponseHeader("etag");
                            if (modified) {
                                jQuery.etag[cacheURL] = modified;
                            }
                        }
                        // if no content
                        if (status === 204 || s.type === "HEAD") {
                            statusText = "nocontent";
                            // if not modified
                        }
                        else if (status === 304) {
                            statusText = "notmodified";
                            // If we have data, let's convert it
                        }
                        else {
                            statusText = response.state;
                            success = response.data;
                            error = response.error;
                            isSuccess = !error;
                        }
                    }
                    else {
                        // Extract error from statusText and normalize for non-aborts
                        error = statusText;
                        if (status || !statusText) {
                            statusText = "error";
                            if (status < 0) {
                                status = 0;
                            }
                        }
                    }
                    // Set data for the fake xhr object
                    jqXHR.status = status;
                    jqXHR.statusText = (nativeStatusText || statusText) + "";
                    // Success/Error
                    if (isSuccess) {
                        deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                    }
                    else {
                        deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                    }
                    // Status-dependent callbacks
                    jqXHR.statusCode(statusCode);
                    statusCode = undefined;
                    if (fireGlobals) {
                        globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
                    }
                    // Complete
                    completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                    if (fireGlobals) {
                        globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                        // Handle the global AJAX counter
                        if (!(--jQuery.active)) {
                            jQuery.event.trigger("ajaxStop");
                        }
                    }
                }
                return jqXHR;
            },
            getJSON: function (url, data, callback) {
                return jQuery.get(url, data, callback, "json");
            },
            getScript: function (url, callback) {
                return jQuery.get(url, undefined, callback, "script");
            }
        });
        jQuery.each(["get", "post"], function (i, method) {
            jQuery[method] = function (url, data, callback, type) {
                // Shift arguments if data argument was omitted
                if (jQuery.isFunction(data)) {
                    type = type || callback;
                    callback = data;
                    data = undefined;
                }
                // The url can be an options object (which then must have .url)
                return jQuery.ajax(jQuery.extend({
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback
                }, jQuery.isPlainObject(url) && url));
            };
        });
        jQuery._evalUrl = function (url) {
            return jQuery.ajax({
                url: url,
                // Make this explicit, since user can override this through ajaxSetup (#11264)
                type: "GET",
                dataType: "script",
                cache: true,
                async: false,
                global: false,
                "throws": true
            });
        };
        jQuery.fn.extend({
            wrapAll: function (html) {
                var wrap;
                if (this[0]) {
                    if (jQuery.isFunction(html)) {
                        html = html.call(this[0]);
                    }
                    // The elements to wrap the target around
                    wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                    if (this[0].parentNode) {
                        wrap.insertBefore(this[0]);
                    }
                    wrap.map(function () {
                        var elem = this;
                        while (elem.firstElementChild) {
                            elem = elem.firstElementChild;
                        }
                        return elem;
                    }).append(this);
                }
                return this;
            },
            wrapInner: function (html) {
                if (jQuery.isFunction(html)) {
                    return this.each(function (i) {
                        jQuery(this).wrapInner(html.call(this, i));
                    });
                }
                return this.each(function () {
                    var self = jQuery(this), contents = self.contents();
                    if (contents.length) {
                        contents.wrapAll(html);
                    }
                    else {
                        self.append(html);
                    }
                });
            },
            wrap: function (html) {
                var isFunction = jQuery.isFunction(html);
                return this.each(function (i) {
                    jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
                });
            },
            unwrap: function (selector) {
                this.parent(selector).not("body").each(function () {
                    jQuery(this).replaceWith(this.childNodes);
                });
                return this;
            }
        });
        jQuery.expr.pseudos.hidden = function (elem) {
            return !jQuery.expr.pseudos.visible(elem);
        };
        jQuery.expr.pseudos.visible = function (elem) {
            return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
        };
        jQuery.ajaxSettings.xhr = function () {
            try {
                return new window.XMLHttpRequest();
            }
            catch (e) { }
        };
        var xhrSuccessStatus = {
            // File protocol always yields status code 0, assume 200
            0: 200,
            // Support: IE <=9 only
            // #1450: sometimes IE returns 1223 when it should be 204
            1223: 204
        }, xhrSupported = jQuery.ajaxSettings.xhr();
        support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
        support.ajax = xhrSupported = !!xhrSupported;
        jQuery.ajaxTransport(function (options) {
            var callback, errorCallback;
            // Cross domain only allowed if supported through XMLHttpRequest
            if (support.cors || xhrSupported && !options.crossDomain) {
                return {
                    send: function (headers, complete) {
                        var i, xhr = options.xhr();
                        xhr.open(options.type, options.url, options.async, options.username, options.password);
                        // Apply custom fields if provided
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i];
                            }
                        }
                        // Override mime type if needed
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType);
                        }
                        // X-Requested-With header
                        // For cross-domain requests, seeing as conditions for a preflight are
                        // akin to a jigsaw puzzle, we simply never set it to be sure.
                        // (it can always be set on a per-request basis or even using ajaxSetup)
                        // For same-domain requests, won't change header if already provided.
                        if (!options.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }
                        // Set headers
                        for (i in headers) {
                            xhr.setRequestHeader(i, headers[i]);
                        }
                        // Callback
                        callback = function (type) {
                            return function () {
                                if (callback) {
                                    callback = errorCallback = xhr.onload =
                                        xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
                                    if (type === "abort") {
                                        xhr.abort();
                                    }
                                    else if (type === "error") {
                                        // Support: IE <=9 only
                                        // On a manual native abort, IE9 throws
                                        // errors on any property access that is not readyState
                                        if (typeof xhr.status !== "number") {
                                            complete(0, "error");
                                        }
                                        else {
                                            complete(
                                            // File: protocol always yields status 0; see #8605, #14207
                                            xhr.status, xhr.statusText);
                                        }
                                    }
                                    else {
                                        complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, 
                                        // Support: IE <=9 only
                                        // IE9 has no XHR2 but throws on binary (trac-11426)
                                        // For XHR2 non-text, let the caller handle it (gh-2498)
                                        (xhr.responseType || "text") !== "text" ||
                                            typeof xhr.responseText !== "string" ?
                                            { binary: xhr.response } :
                                            { text: xhr.responseText }, xhr.getAllResponseHeaders());
                                    }
                                }
                            };
                        };
                        // Listen to events
                        xhr.onload = callback();
                        errorCallback = xhr.onerror = callback("error");
                        // Support: IE 9 only
                        // Use onreadystatechange to replace onabort
                        // to handle uncaught aborts
                        if (xhr.onabort !== undefined) {
                            xhr.onabort = errorCallback;
                        }
                        else {
                            xhr.onreadystatechange = function () {
                                // Check readyState before timeout as it changes
                                if (xhr.readyState === 4) {
                                    // Allow onerror to be called first,
                                    // but that will not handle a native abort
                                    // Also, save errorCallback to a variable
                                    // as xhr.onerror cannot be accessed
                                    window.setTimeout(function () {
                                        if (callback) {
                                            errorCallback();
                                        }
                                    });
                                }
                            };
                        }
                        // Create the abort callback
                        callback = callback("abort");
                        try {
                            // Do send the request (this may raise an exception)
                            xhr.send(options.hasContent && options.data || null);
                        }
                        catch (e) {
                            // #14683: Only rethrow if this hasn't been notified as an error yet
                            if (callback) {
                                throw e;
                            }
                        }
                    },
                    abort: function () {
                        if (callback) {
                            callback();
                        }
                    }
                };
            }
        });
        // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
        jQuery.ajaxPrefilter(function (s) {
            if (s.crossDomain) {
                s.contents.script = false;
            }
        });
        // Install script dataType
        jQuery.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, " +
                    "application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function (text) {
                    jQuery.globalEval(text);
                    return text;
                }
            }
        });
        // Handle cache's special case and crossDomain
        jQuery.ajaxPrefilter("script", function (s) {
            if (s.cache === undefined) {
                s.cache = false;
            }
            if (s.crossDomain) {
                s.type = "GET";
            }
        });
        // Bind script tag hack transport
        jQuery.ajaxTransport("script", function (s) {
            // This transport only deals with cross domain requests
            if (s.crossDomain) {
                var script, callback;
                return {
                    send: function (_, complete) {
                        script = jQuery("<script>").prop({
                            charset: s.scriptCharset,
                            src: s.url
                        }).on("load error", callback = function (evt) {
                            script.remove();
                            callback = null;
                            if (evt) {
                                complete(evt.type === "error" ? 404 : 200, evt.type);
                            }
                        });
                        // Use native DOM manipulation to avoid our domManip AJAX trickery
                        document.head.appendChild(script[0]);
                    },
                    abort: function () {
                        if (callback) {
                            callback();
                        }
                    }
                };
            }
        });
        var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
        // Default jsonp settings
        jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
                this[callback] = true;
                return callback;
            }
        });
        // Detect, normalize options and install callbacks for jsonp requests
        jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
            var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
                "url" :
                typeof s.data === "string" &&
                    (s.contentType || "")
                        .indexOf("application/x-www-form-urlencoded") === 0 &&
                    rjsonp.test(s.data) && "data");
            // Handle iff the expected data type is "jsonp" or we have a parameter to set
            if (jsonProp || s.dataTypes[0] === "jsonp") {
                // Get callback name, remembering preexisting value associated with it
                callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ?
                    s.jsonpCallback() :
                    s.jsonpCallback;
                // Insert callback into url or form data
                if (jsonProp) {
                    s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
                }
                else if (s.jsonp !== false) {
                    s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
                }
                // Use data converter to retrieve json after script execution
                s.converters["script json"] = function () {
                    if (!responseContainer) {
                        jQuery.error(callbackName + " was not called");
                    }
                    return responseContainer[0];
                };
                // Force json dataType
                s.dataTypes[0] = "json";
                // Install callback
                overwritten = window[callbackName];
                window[callbackName] = function () {
                    responseContainer = arguments;
                };
                // Clean-up function (fires after converters)
                jqXHR.always(function () {
                    // If previous value didn't exist - remove it
                    if (overwritten === undefined) {
                        jQuery(window).removeProp(callbackName);
                        // Otherwise restore preexisting value
                    }
                    else {
                        window[callbackName] = overwritten;
                    }
                    // Save back as free
                    if (s[callbackName]) {
                        // Make sure that re-using the options doesn't screw things around
                        s.jsonpCallback = originalSettings.jsonpCallback;
                        // Save the callback name for future use
                        oldCallbacks.push(callbackName);
                    }
                    // Call if it was a function and we have a response
                    if (responseContainer && jQuery.isFunction(overwritten)) {
                        overwritten(responseContainer[0]);
                    }
                    responseContainer = overwritten = undefined;
                });
                // Delegate to script
                return "script";
            }
        });
        // Support: Safari 8 only
        // In Safari 8 documents created via document.implementation.createHTMLDocument
        // collapse sibling forms: the second one becomes a child of the first one.
        // Because of that, this security measure has to be disabled in Safari 8.
        // https://bugs.webkit.org/show_bug.cgi?id=137337
        support.createHTMLDocument = (function () {
            var body = document.implementation.createHTMLDocument("").body;
            body.innerHTML = "<form></form><form></form>";
            return body.childNodes.length === 2;
        })();
        // Argument "data" should be string of html
        // context (optional): If specified, the fragment will be created in this context,
        // defaults to document
        // keepScripts (optional): If true, will include scripts passed in the html string
        jQuery.parseHTML = function (data, context, keepScripts) {
            if (typeof data !== "string") {
                return [];
            }
            if (typeof context === "boolean") {
                keepScripts = context;
                context = false;
            }
            var base, parsed, scripts;
            if (!context) {
                // Stop scripts or inline event handlers from being executed immediately
                // by using document.implementation
                if (support.createHTMLDocument) {
                    context = document.implementation.createHTMLDocument("");
                    // Set the base href for the created document
                    // so any parsed elements with URLs
                    // are based on the document's URL (gh-2965)
                    base = context.createElement("base");
                    base.href = document.location.href;
                    context.head.appendChild(base);
                }
                else {
                    context = document;
                }
            }
            parsed = rsingleTag.exec(data);
            scripts = !keepScripts && [];
            // Single tag
            if (parsed) {
                return [context.createElement(parsed[1])];
            }
            parsed = buildFragment([data], context, scripts);
            if (scripts && scripts.length) {
                jQuery(scripts).remove();
            }
            return jQuery.merge([], parsed.childNodes);
        };
        /**
         * Load a url into a page
         */
        jQuery.fn.load = function (url, params, callback) {
            var selector, type, response, self = this, off = url.indexOf(" ");
            if (off > -1) {
                selector = stripAndCollapse(url.slice(off));
                url = url.slice(0, off);
            }
            // If it's a function
            if (jQuery.isFunction(params)) {
                // We assume that it's the callback
                callback = params;
                params = undefined;
                // Otherwise, build a param string
            }
            else if (params && typeof params === "object") {
                type = "POST";
            }
            // If we have elements to modify, make the request
            if (self.length > 0) {
                jQuery.ajax({
                    url: url,
                    // If "type" variable is undefined, then "GET" method will be used.
                    // Make value of this field explicit since
                    // user can override it through ajaxSetup method
                    type: type || "GET",
                    dataType: "html",
                    data: params
                }).done(function (responseText) {
                    // Save response for use in complete callback
                    response = arguments;
                    self.html(selector ?
                        // If a selector was specified, locate the right elements in a dummy div
                        // Exclude scripts to avoid IE 'Permission Denied' errors
                        jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :
                        // Otherwise use the full result
                        responseText);
                    // If the request succeeds, this function gets "data", "status", "jqXHR"
                    // but they are ignored because response was set above.
                    // If it fails, this function gets "jqXHR", "status", "error"
                }).always(callback && function (jqXHR, status) {
                    self.each(function () {
                        callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
                    });
                });
            }
            return this;
        };
        // Attach a bunch of functions for handling common AJAX events
        jQuery.each([
            "ajaxStart",
            "ajaxStop",
            "ajaxComplete",
            "ajaxError",
            "ajaxSuccess",
            "ajaxSend"
        ], function (i, type) {
            jQuery.fn[type] = function (fn) {
                return this.on(type, fn);
            };
        });
        jQuery.expr.pseudos.animated = function (elem) {
            return jQuery.grep(jQuery.timers, function (fn) {
                return elem === fn.elem;
            }).length;
        };
        jQuery.offset = {
            setOffset: function (elem, options, i) {
                var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
                // Set position first, in-case top/left are set even on static elem
                if (position === "static") {
                    elem.style.position = "relative";
                }
                curOffset = curElem.offset();
                curCSSTop = jQuery.css(elem, "top");
                curCSSLeft = jQuery.css(elem, "left");
                calculatePosition = (position === "absolute" || position === "fixed") &&
                    (curCSSTop + curCSSLeft).indexOf("auto") > -1;
                // Need to be able to calculate position if either
                // top or left is auto and position is either absolute or fixed
                if (calculatePosition) {
                    curPosition = curElem.position();
                    curTop = curPosition.top;
                    curLeft = curPosition.left;
                }
                else {
                    curTop = parseFloat(curCSSTop) || 0;
                    curLeft = parseFloat(curCSSLeft) || 0;
                }
                if (jQuery.isFunction(options)) {
                    // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
                    options = options.call(elem, i, jQuery.extend({}, curOffset));
                }
                if (options.top != null) {
                    props.top = (options.top - curOffset.top) + curTop;
                }
                if (options.left != null) {
                    props.left = (options.left - curOffset.left) + curLeft;
                }
                if ("using" in options) {
                    options.using.call(elem, props);
                }
                else {
                    curElem.css(props);
                }
            }
        };
        jQuery.fn.extend({
            offset: function (options) {
                // Preserve chaining for setter
                if (arguments.length) {
                    return options === undefined ?
                        this :
                        this.each(function (i) {
                            jQuery.offset.setOffset(this, options, i);
                        });
                }
                var doc, docElem, rect, win, elem = this[0];
                if (!elem) {
                    return;
                }
                // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
                // Support: IE <=11 only
                // Running getBoundingClientRect on a
                // disconnected node in IE throws an error
                if (!elem.getClientRects().length) {
                    return { top: 0, left: 0 };
                }
                rect = elem.getBoundingClientRect();
                doc = elem.ownerDocument;
                docElem = doc.documentElement;
                win = doc.defaultView;
                return {
                    top: rect.top + win.pageYOffset - docElem.clientTop,
                    left: rect.left + win.pageXOffset - docElem.clientLeft
                };
            },
            position: function () {
                if (!this[0]) {
                    return;
                }
                var offsetParent, offset, elem = this[0], parentOffset = { top: 0, left: 0 };
                // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
                // because it is its only offset parent
                if (jQuery.css(elem, "position") === "fixed") {
                    // Assume getBoundingClientRect is there when computed position is fixed
                    offset = elem.getBoundingClientRect();
                }
                else {
                    // Get *real* offsetParent
                    offsetParent = this.offsetParent();
                    // Get correct offsets
                    offset = this.offset();
                    if (!nodeName(offsetParent[0], "html")) {
                        parentOffset = offsetParent.offset();
                    }
                    // Add offsetParent borders
                    parentOffset = {
                        top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
                        left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
                    };
                }
                // Subtract parent offsets and element margins
                return {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
                };
            },
            // This method will return documentElement in the following cases:
            // 1) For the element inside the iframe without offsetParent, this method will return
            //    documentElement of the parent window
            // 2) For the hidden or detached element
            // 3) For body or html element, i.e. in case of the html node - it will return itself
            //
            // but those exceptions were never presented as a real life use-cases
            // and might be considered as more preferable results.
            //
            // This logic, however, is not guaranteed and can change at any point in the future
            offsetParent: function () {
                return this.map(function () {
                    var offsetParent = this.offsetParent;
                    while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                        offsetParent = offsetParent.offsetParent;
                    }
                    return offsetParent || documentElement;
                });
            }
        });
        // Create scrollLeft and scrollTop methods
        jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
            var top = "pageYOffset" === prop;
            jQuery.fn[method] = function (val) {
                return access(this, function (elem, method, val) {
                    // Coalesce documents and windows
                    var win;
                    if (jQuery.isWindow(elem)) {
                        win = elem;
                    }
                    else if (elem.nodeType === 9) {
                        win = elem.defaultView;
                    }
                    if (val === undefined) {
                        return win ? win[prop] : elem[method];
                    }
                    if (win) {
                        win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
                    }
                    else {
                        elem[method] = val;
                    }
                }, method, val, arguments.length);
            };
        });
        // Support: Safari <=7 - 9.1, Chrome <=37 - 49
        // Add the top/left cssHooks using jQuery.fn.position
        // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
        // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
        // getComputedStyle returns percent when specified for top/left/bottom/right;
        // rather than make the css module depend on the offset module, just check for it here
        jQuery.each(["top", "left"], function (i, prop) {
            jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
                if (computed) {
                    computed = curCSS(elem, prop);
                    // If curCSS returns percentage, fallback to offset
                    return rnumnonpx.test(computed) ?
                        jQuery(elem).position()[prop] + "px" :
                        computed;
                }
            });
        });
        // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
        jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
            jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {
                // Margin is only for outerHeight, outerWidth
                jQuery.fn[funcName] = function (margin, value) {
                    var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                    return access(this, function (elem, type, value) {
                        var doc;
                        if (jQuery.isWindow(elem)) {
                            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
                            return funcName.indexOf("outer") === 0 ?
                                elem["inner" + name] :
                                elem.document.documentElement["client" + name];
                        }
                        // Get document width or height
                        if (elem.nodeType === 9) {
                            doc = elem.documentElement;
                            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                            // whichever is greatest
                            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                        }
                        return value === undefined ?
                            // Get width or height on the element, requesting but not forcing parseFloat
                            jQuery.css(elem, type, extra) :
                            // Set width or height on the element
                            jQuery.style(elem, type, value, extra);
                    }, type, chainable ? margin : undefined, chainable);
                };
            });
        });
        jQuery.fn.extend({
            bind: function (types, data, fn) {
                return this.on(types, null, data, fn);
            },
            unbind: function (types, fn) {
                return this.off(types, null, fn);
            },
            delegate: function (selector, types, data, fn) {
                return this.on(types, selector, data, fn);
            },
            undelegate: function (selector, types, fn) {
                // ( namespace ) or ( selector, types [, fn] )
                return arguments.length === 1 ?
                    this.off(selector, "**") :
                    this.off(types, selector || "**", fn);
            }
        });
        jQuery.holdReady = function (hold) {
            if (hold) {
                jQuery.readyWait++;
            }
            else {
                jQuery.ready(true);
            }
        };
        jQuery.isArray = Array.isArray;
        jQuery.parseJSON = JSON.parse;
        jQuery.nodeName = nodeName;
        // Register as a named AMD module, since jQuery can be concatenated with other
        // files that may use define, but not via a proper concatenation script that
        // understands anonymous AMD modules. A named AMD is safest and most robust
        // way to register. Lowercase jquery is used because AMD module names are
        // derived from file names, and jQuery is normally delivered in a lowercase
        // file name. Do this after creating the global so that if an AMD module wants
        // to call noConflict to hide this version of jQuery, it will work.
        // Note that for maximum portability, libraries that are not jQuery should
        // declare themselves as anonymous modules, and avoid setting a global if an
        // AMD loader is present. jQuery is a special case. For more information, see
        // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
        if (typeof define === "function" && define.amd) {
            define("jquery", [], function () {
                return jQuery;
            });
        }
        var 
        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery, 
        // Map over the $ in case of overwrite
        _$ = window.$;
        jQuery.noConflict = function (deep) {
            if (window.$ === jQuery) {
                window.$ = _$;
            }
            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery;
            }
            return jQuery;
        };
        // Expose jQuery and $ identifiers, even in AMD
        // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
        // and CommonJS for browser emulators (#13566)
        if (!noGlobal) {
            window.jQuery = window.$ = jQuery;
        }
        return jQuery;
    });
}
,
442: /* slickgrid/lib/jquery.event.drag-2.3.0 */ function _(require, module, exports) {
    /*!
     * jquery.event.drag - v 2.3.0
     * Copyright (c) 2010 Three Dub Media - http://threedubmedia.com
     * Open Source MIT License - http://threedubmedia.com/code/license
     */
    // Created: 2008-06-04
    // Updated: 2012-05-21
    // Updated: 2016-08-16   Luiz Gonzaga dos Santos Filho
    // REQUIRES: jquery 1.8 +, , event.drag 2.3.0
    // TESTED WITH: jQuery 1.8.3, 1.11.2, 2.2.4, and 3.1.0
    var $ = require(448) /* ../slick.jquery */;
    // add the jquery instance method
    $.fn.drag = function (str, arg, opts) {
        // figure out the event type
        var type = typeof str == "string" ? str : "", 
        // figure out the event handler...
        fn = $.isFunction(str) ? str : $.isFunction(arg) ? arg : null;
        // fix the event type
        if (type.indexOf("drag") !== 0)
            type = "drag" + type;
        // were options passed
        opts = (str == fn ? arg : opts) || {};
        // trigger or bind event handler
        return fn ? this.on(type, opts, fn) : this.trigger(type);
    };
    // local refs (increase compression)
    var $event = $.event, $special = $event.special, 
    // configure the drag special event
    drag = $special.drag = {
        // these are the default settings
        defaults: {
            which: 1,
            distance: 0,
            not: ':input',
            handle: null,
            relative: false,
            drop: true,
            click: false // false to suppress click events after dragend (no proxy)
        },
        // the key name for stored drag data
        datakey: "dragdata",
        // prevent bubbling for better performance
        noBubble: true,
        // count bound related events
        add: function (obj) {
            // read the interaction data
            var data = $.data(this, drag.datakey), 
            // read any passed options
            opts = obj.data || {};
            // count another realted event
            data.related += 1;
            // extend data options bound with this event
            // don't iterate "opts" in case it is a node
            $.each(drag.defaults, function (key, def) {
                if (opts[key] !== undefined)
                    data[key] = opts[key];
            });
        },
        // forget unbound related events
        remove: function () {
            $.data(this, drag.datakey).related -= 1;
        },
        // configure interaction, capture settings
        setup: function () {
            // check for related events
            if ($.data(this, drag.datakey))
                return;
            // initialize the drag data with copied defaults
            var data = $.extend({ related: 0 }, drag.defaults);
            // store the interaction data
            $.data(this, drag.datakey, data);
            // bind the mousedown event, which starts drag interactions
            $event.add(this, "touchstart mousedown", drag.init, data);
            // prevent image dragging in IE...
            if (this.attachEvent)
                this.attachEvent("ondragstart", drag.dontstart);
        },
        // destroy configured interaction
        teardown: function () {
            var data = $.data(this, drag.datakey) || {};
            // check for related events
            if (data.related)
                return;
            // remove the stored data
            $.removeData(this, drag.datakey);
            // remove the mousedown event
            $event.remove(this, "touchstart mousedown", drag.init);
            // enable text selection
            drag.textselect(true);
            // un-prevent image dragging in IE...
            if (this.detachEvent)
                this.detachEvent("ondragstart", drag.dontstart);
        },
        // initialize the interaction
        init: function (event) {
            // sorry, only one touch at a time
            if (drag.touched)
                return;
            // the drag/drop interaction data
            var dd = event.data, results;
            // check the which directive
            if (event.which != 0 && dd.which > 0 && event.which != dd.which)
                return;
            // check for suppressed selector
            if ($(event.target).is(dd.not))
                return;
            // check for handle selector
            if (dd.handle && !$(event.target).closest(dd.handle, event.currentTarget).length)
                return;
            drag.touched = event.type == 'touchstart' ? this : null;
            dd.propagates = 1;
            dd.mousedown = this;
            dd.interactions = [drag.interaction(this, dd)];
            dd.target = event.target;
            dd.pageX = event.pageX;
            dd.pageY = event.pageY;
            dd.dragging = null;
            // handle draginit event...
            results = drag.hijack(event, "draginit", dd);
            // early cancel
            if (!dd.propagates)
                return;
            // flatten the result set
            results = drag.flatten(results);
            // insert new interaction elements
            if (results && results.length) {
                dd.interactions = [];
                $.each(results, function () {
                    dd.interactions.push(drag.interaction(this, dd));
                });
            }
            // remember how many interactions are propagating
            dd.propagates = dd.interactions.length;
            // locate and init the drop targets
            if (dd.drop !== false && $special.drop)
                $special.drop.handler(event, dd);
            // disable text selection
            drag.textselect(false);
            // bind additional events...
            if (drag.touched)
                $event.add(drag.touched, "touchmove touchend", drag.handler, dd);
            else
                $event.add(document, "mousemove mouseup", drag.handler, dd);
            // helps prevent text selection or scrolling
            if (!drag.touched || dd.live)
                return false;
        },
        // returns an interaction object
        interaction: function (elem, dd) {
            var offset = (elem && elem.ownerDocument)
                ? $(elem)[dd.relative ? "position" : "offset"]() || { top: 0, left: 0 }
                : { top: 0, left: 0 };
            return {
                drag: elem,
                callback: new drag.callback(),
                droppable: [],
                offset: offset
            };
        },
        // handle drag-releatd DOM events
        handler: function (event) {
            // read the data before hijacking anything
            var dd = event.data;
            // handle various events
            switch (event.type) {
                // mousemove, check distance, start dragging
                case !dd.dragging && 'touchmove':
                    event.preventDefault();
                case !dd.dragging && 'mousemove':
                    //  drag tolerance, x² + y² = distance²
                    if (Math.pow(event.pageX - dd.pageX, 2) + Math.pow(event.pageY - dd.pageY, 2) < Math.pow(dd.distance, 2))
                        break; // distance tolerance not reached
                    event.target = dd.target; // force target from "mousedown" event (fix distance issue)
                    drag.hijack(event, "dragstart", dd); // trigger "dragstart"
                    if (dd.propagates) // "dragstart" not rejected
                        dd.dragging = true; // activate interaction
                // mousemove, dragging
                case 'touchmove':
                    event.preventDefault();
                case 'mousemove':
                    if (dd.dragging) {
                        // trigger "drag"
                        drag.hijack(event, "drag", dd);
                        if (dd.propagates) {
                            // manage drop events
                            if (dd.drop !== false && $special.drop)
                                $special.drop.handler(event, dd); // "dropstart", "dropend"
                            break; // "drag" not rejected, stop
                        }
                        event.type = "mouseup"; // helps "drop" handler behave
                    }
                // mouseup, stop dragging
                case 'touchend':
                case 'mouseup':
                default:
                    if (drag.touched)
                        $event.remove(drag.touched, "touchmove touchend", drag.handler); // remove touch events
                    else
                        $event.remove(document, "mousemove mouseup", drag.handler); // remove page events
                    if (dd.dragging) {
                        if (dd.drop !== false && $special.drop)
                            $special.drop.handler(event, dd); // "drop"
                        drag.hijack(event, "dragend", dd); // trigger "dragend"
                    }
                    drag.textselect(true); // enable text selection
                    // if suppressing click events...
                    if (dd.click === false && dd.dragging)
                        $.data(dd.mousedown, "suppress.click", new Date().getTime() + 5);
                    dd.dragging = drag.touched = false; // deactivate element
                    break;
            }
        },
        // re-use event object for custom events
        hijack: function (event, type, dd, x, elem) {
            // not configured
            if (!dd)
                return;
            // remember the original event and type
            var orig = { event: event.originalEvent, type: event.type }, 
            // is the event drag related or drog related?
            mode = type.indexOf("drop") ? "drag" : "drop", 
            // iteration vars
            result, i = x || 0, ia, $elems, callback, len = !isNaN(x) ? x : dd.interactions.length;
            // modify the event type
            event.type = type;
            // protects originalEvent from side-effects
            var noop = function () { };
            event.originalEvent = new $.Event(orig.event, {
                preventDefault: noop,
                stopPropagation: noop,
                stopImmediatePropagation: noop
            });
            // initialize the results
            dd.results = [];
            // handle each interacted element
            do
                if (ia = dd.interactions[i]) {
                    // validate the interaction
                    if (type !== "dragend" && ia.cancelled)
                        continue;
                    // set the dragdrop properties on the event object
                    callback = drag.properties(event, dd, ia);
                    // prepare for more results
                    ia.results = [];
                    // handle each element
                    $(elem || ia[mode] || dd.droppable).each(function (p, subject) {
                        // identify drag or drop targets individually
                        callback.target = subject;
                        // force propagtion of the custom event
                        event.isPropagationStopped = function () { return false; };
                        // handle the event
                        result = subject ? $event.dispatch.call(subject, event, callback) : null;
                        // stop the drag interaction for this element
                        if (result === false) {
                            if (mode == "drag") {
                                ia.cancelled = true;
                                dd.propagates -= 1;
                            }
                            if (type == "drop") {
                                ia[mode][p] = null;
                            }
                        }
                        // assign any dropinit elements
                        else if (type == "dropinit")
                            ia.droppable.push(drag.element(result) || subject);
                        // accept a returned proxy element
                        if (type == "dragstart")
                            ia.proxy = $(drag.element(result) || ia.drag)[0];
                        // remember this result
                        ia.results.push(result);
                        // forget the event result, for recycling
                        delete event.result;
                        // break on cancelled handler
                        if (type !== "dropinit")
                            return result;
                    });
                    // flatten the results
                    dd.results[i] = drag.flatten(ia.results);
                    // accept a set of valid drop targets
                    if (type == "dropinit")
                        ia.droppable = drag.flatten(ia.droppable);
                    // locate drop targets
                    if (type == "dragstart" && !ia.cancelled)
                        callback.update();
                }
            while (++i < len);
            // restore the original event & type
            event.type = orig.type;
            event.originalEvent = orig.event;
            // return all handler results
            return drag.flatten(dd.results);
        },
        // extend the callback object with drag/drop properties...
        properties: function (event, dd, ia) {
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
            obj.drop = drag.flatten((ia.drop || []).slice());
            obj.available = drag.flatten((ia.droppable || []).slice());
            return obj;
        },
        // determine is the argument is an element or jquery instance
        element: function (arg) {
            if (arg && (arg.jquery || arg.nodeType == 1))
                return arg;
        },
        // flatten nested jquery objects and arrays into a single dimension array
        flatten: function (arr) {
            return $.map(arr, function (member) {
                return member && member.jquery ? $.makeArray(member) :
                    member && member.length ? drag.flatten(member) : member;
            });
        },
        // toggles text selection attributes ON (true) or OFF (false)
        textselect: function (bool) {
            $(document)[bool ? "off" : "on"]("selectstart", drag.dontstart)
                .css("MozUserSelect", bool ? "" : "none");
            // .attr("unselectable", bool ? "off" : "on" )
            document.unselectable = bool ? "off" : "on";
        },
        // suppress "selectstart" and "ondragstart" events
        dontstart: function () {
            return false;
        },
        // a callback instance contructor
        callback: function () { }
    };
    // callback methods
    drag.callback.prototype = {
        update: function () {
            if ($special.drop && this.available.length)
                $.each(this.available, function (i) {
                    $special.drop.locate(this, i);
                });
        }
    };
    // patch $.event.$dispatch to allow suppressing clicks
    var $dispatch = $event.dispatch;
    $event.dispatch = function (event) {
        if ($.data(this, "suppress." + event.type) - new Date().getTime() > 0) {
            $.removeData(this, "suppress." + event.type);
            return;
        }
        return $dispatch.apply(this, arguments);
    };
    // share the same special event configuration with related events...
    $special.draginit = $special.dragstart = $special.dragend = drag;
}
,
443: /* slickgrid/lib/jquery.event.drop-2.3.0 */ function _(require, module, exports) {
    /*!
     * jquery.event.drop - v 2.3.0
     * Copyright (c) 2010 Three Dub Media - http://threedubmedia.com
     * Open Source MIT License - http://threedubmedia.com/code/license
     */
    // Created: 2008-06-04
    // Updated: 2012-05-21
    // Updated: 2016-08-16   Luiz Gonzaga dos Santos Filho
    // REQUIRES: jquery 1.8 +, , event.drag 2.3.0
    // TESTED WITH: jQuery 1.8.3, 1.11.2, 2.2.4, and 3.1.0
    var $ = require(448) /* ../slick.jquery */;
    // Events: drop, dropstart, dropend
    // add the jquery instance method
    $.fn.drop = function (str, arg, opts) {
        // figure out the event type
        var type = typeof str == "string" ? str : "", 
        // figure out the event handler...
        fn = $.isFunction(str) ? str : $.isFunction(arg) ? arg : null;
        // fix the event type
        if (type.indexOf("drop") !== 0)
            type = "drop" + type;
        // were options passed
        opts = (str == fn ? arg : opts) || {};
        // trigger or bind event handler
        return fn ? this.on(type, opts, fn) : this.trigger(type);
    };
    // DROP MANAGEMENT UTILITY
    // returns filtered drop target elements, caches their positions
    $.drop = function (opts) {
        opts = opts || {};
        // safely set new options...
        drop.multi = opts.multi === true ? Infinity :
            opts.multi === false ? 1 : !isNaN(opts.multi) ? opts.multi : drop.multi;
        drop.delay = opts.delay || drop.delay;
        drop.tolerance = $.isFunction(opts.tolerance) ? opts.tolerance :
            opts.tolerance === null ? null : drop.tolerance;
        drop.mode = opts.mode || drop.mode || 'intersect';
    };
    // local refs (increase compression)
    var $event = $.event, $special = $event.special, 
    // configure the drop special event
    drop = $.event.special.drop = {
        // these are the default settings
        multi: 1,
        delay: 20,
        mode: 'overlap',
        // internal cache
        targets: [],
        // the key name for stored drop data
        datakey: "dropdata",
        // prevent bubbling for better performance
        noBubble: true,
        // count bound related events
        add: function (obj) {
            // read the interaction data
            var data = $.data(this, drop.datakey);
            // count another realted event
            data.related += 1;
        },
        // forget unbound related events
        remove: function () {
            $.data(this, drop.datakey).related -= 1;
        },
        // configure the interactions
        setup: function () {
            // check for related events
            if ($.data(this, drop.datakey))
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
            $.data(this, drop.datakey, data);
            // store the drop target in internal cache
            drop.targets.push(this);
        },
        // destroy the configure interaction
        teardown: function () {
            var data = $.data(this, drop.datakey) || {};
            // check for related events
            if (data.related)
                return;
            // remove the stored data
            $.removeData(this, drop.datakey);
            // reference the targeted element
            var element = this;
            // remove from the internal cache
            drop.targets = $.grep(drop.targets, function (target) {
                return (target !== element);
            });
        },
        // shared event handler
        handler: function (event, dd) {
            // local vars
            var results, $targets;
            // make sure the right data is available
            if (!dd)
                return;
            // handle various events
            switch (event.type) {
                // draginit, from $.event.special.drag
                case 'mousedown': // DROPINIT >>
                case 'touchstart': // DROPINIT >>
                    // collect and assign the drop targets
                    $targets = $(drop.targets);
                    if (typeof dd.drop == "string")
                        $targets = $targets.filter(dd.drop);
                    // reset drop data winner properties
                    $targets.each(function () {
                        var data = $.data(this, drop.datakey);
                        data.active = [];
                        data.anyactive = 0;
                        data.winner = 0;
                    });
                    // set available target elements
                    dd.droppable = $targets;
                    // activate drop targets for the initial element being dragged
                    $special.drag.hijack(event, "dropinit", dd);
                    break;
                // drag, from $.event.special.drag
                case 'mousemove': // TOLERATE >>
                case 'touchmove': // TOLERATE >>
                    drop.event = event; // store the mousemove event
                    if (!drop.timer)
                        // monitor drop targets
                        drop.tolerate(dd);
                    break;
                // dragend, from $.event.special.drag
                case 'mouseup': // DROP >> DROPEND >>
                case 'touchend': // DROP >> DROPEND >>
                    drop.timer = clearTimeout(drop.timer); // delete timer
                    if (dd.propagates) {
                        $special.drag.hijack(event, "drop", dd);
                        $special.drag.hijack(event, "dropend", dd);
                    }
                    break;
            }
        },
        // returns the location positions of an element
        locate: function (elem, index) {
            var data = $.data(elem, drop.datakey), $elem = $(elem), posi = $elem.offset() || {}, height = $elem.outerHeight(), width = $elem.outerWidth(), location = {
                elem: elem,
                width: width,
                height: height,
                top: posi.top,
                left: posi.left,
                right: posi.left + width,
                bottom: posi.top + height
            };
            // drag elements might not have dropdata
            if (data) {
                data.location = location;
                data.index = index;
                data.elem = elem;
            }
            return location;
        },
        // test the location positions of an element against another OR an X,Y coord
        contains: function (target, test) {
            return ((test[0] || test.left) >= target.left && (test[0] || test.right) <= target.right
                && (test[1] || test.top) >= target.top && (test[1] || test.bottom) <= target.bottom);
        },
        // stored tolerance modes
        modes: {
            // target with mouse wins, else target with most overlap wins
            'intersect': function (event, proxy, target) {
                return this.contains(target, [event.pageX, event.pageY]) ? // check cursor
                    1e9 : this.modes.overlap.apply(this, arguments); // check overlap
            },
            // target with most overlap wins
            'overlap': function (event, proxy, target) {
                // calculate the area of overlap...
                return Math.max(0, Math.min(target.bottom, proxy.bottom) - Math.max(target.top, proxy.top))
                    * Math.max(0, Math.min(target.right, proxy.right) - Math.max(target.left, proxy.left));
            },
            // proxy is completely contained within target bounds
            'fit': function (event, proxy, target) {
                return this.contains(target, proxy) ? 1 : 0;
            },
            // center of the proxy is contained within target bounds
            'middle': function (event, proxy, target) {
                return this.contains(target, [proxy.left + proxy.width * .5, proxy.top + proxy.height * .5]) ? 1 : 0;
            }
        },
        // sort drop target cache by by winner (dsc), then index (asc)
        sort: function (a, b) {
            return (b.winner - a.winner) || (a.index - b.index);
        },
        // async, recursive tolerance execution
        tolerate: function (dd) {
            // declare local refs
            var i, drp, drg, data, arr, len, elem, 
            // interaction iteration variables
            x = 0, ia, end = dd.interactions.length, 
            // determine the mouse coords
            xy = [drop.event.pageX, drop.event.pageY], 
            // custom or stored tolerance fn
            tolerance = drop.tolerance || drop.modes[drop.mode];
            // go through each passed interaction...
            do
                if (ia = dd.interactions[x]) {
                    // check valid interaction
                    if (!ia)
                        return;
                    // initialize or clear the drop data
                    ia.drop = [];
                    // holds the drop elements
                    arr = [];
                    len = ia.droppable.length;
                    // determine the proxy location, if needed
                    if (tolerance)
                        drg = drop.locate(ia.proxy);
                    // reset the loop
                    i = 0;
                    // loop each stored drop target
                    do
                        if (elem = ia.droppable[i]) {
                            data = $.data(elem, drop.datakey);
                            drp = data.location;
                            if (!drp)
                                continue;
                            // find a winner: tolerance function is defined, call it
                            data.winner = tolerance ? tolerance.call(drop, drop.event, drg, drp)
                                // mouse position is always the fallback
                                : drop.contains(drp, xy) ? 1 : 0;
                            arr.push(data);
                        }
                    while (++i < len); // loop
                    // sort the drop targets
                    arr.sort(drop.sort);
                    // reset the loop
                    i = 0;
                    // loop through all of the targets again
                    do
                        if (data = arr[i]) {
                            // winners...
                            if (data.winner && ia.drop.length < drop.multi) {
                                // new winner... dropstart
                                if (!data.active[x] && !data.anyactive) {
                                    // check to make sure that this is not prevented
                                    if ($special.drag.hijack(drop.event, "dropstart", dd, x, data.elem)[0] !== false) {
                                        data.active[x] = 1;
                                        data.anyactive += 1;
                                    }
                                    // if false, it is not a winner
                                    else
                                        data.winner = 0;
                                }
                                // if it is still a winner
                                if (data.winner)
                                    ia.drop.push(data.elem);
                            }
                            // losers...
                            else if (data.active[x] && data.anyactive == 1) {
                                // former winner... dropend
                                $special.drag.hijack(drop.event, "dropend", dd, x, data.elem);
                                data.active[x] = 0;
                                data.anyactive -= 1;
                            }
                        }
                    while (++i < len); // loop
                }
            while (++x < end); // loop
            // check if the mouse is still moving or is idle
            if (drop.last && xy[0] == drop.last.pageX && xy[1] == drop.last.pageY)
                delete drop.timer; // idle, don't recurse
            else // recurse
                drop.timer = setTimeout(function () {
                    drop.tolerate(dd);
                }, drop.delay);
            // remember event, to compare idleness
            drop.last = drop.event;
        }
    };
    // share the same special event configuration with related events...
    $special.dropinit = $special.dropstart = $special.dropend = drop;
}
,
444: /* slickgrid/plugins/slick.checkboxselectcolumn */ function _(require, module, exports) {
    var $ = require(448) /* ../slick.jquery */;
    var Slick = require(446) /* ../slick.core */;
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
            }
            else {
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
                    return n != row;
                }));
            }
            else {
                _grid.setSelectedRows(_grid.getSelectedRows().concat(row));
            }
        }
        function selectRows(rowArray) {
            var i, l = rowArray.length, addRows = [];
            for (i = 0; i < l; i++) {
                if (!_selectedRowsLookup[rowArray[i]]) {
                    addRows[addRows.length] = rowArray[i];
                }
            }
            _grid.setSelectedRows(_grid.getSelectedRows().concat(addRows));
        }
        function deSelectRows(rowArray) {
            var i, l = rowArray.length, removeRows = [];
            for (i = 0; i < l; i++) {
                if (_selectedRowsLookup[rowArray[i]]) {
                    removeRows[removeRows.length] = rowArray[i];
                }
            }
            _grid.setSelectedRows($.grep(_grid.getSelectedRows(), function (n) {
                return removeRows.indexOf(n) < 0;
            }));
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
                }
                else {
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
            "deSelectRows": deSelectRows,
            "selectRows": selectRows,
            "getColumnDefinition": getColumnDefinition
        });
    }
    module.exports = {
        "CheckboxSelectColumn": CheckboxSelectColumn
    };
}
,
445: /* slickgrid/plugins/slick.rowselectionmodel */ function _(require, module, exports) {
    var $ = require(448) /* ../slick.jquery */;
    var Slick = require(446) /* ../slick.core */;
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
            _handler.subscribe(_grid.onActiveCellChanged, wrapHandler(handleActiveCellChange));
            _handler.subscribe(_grid.onKeyDown, wrapHandler(handleKeyDown));
            _handler.subscribe(_grid.onClick, wrapHandler(handleClick));
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
            // simle check for: empty selection didn't change, prevent firing onSelectedRangesChanged
            if ((!_ranges || _ranges.length === 0) && (!ranges || ranges.length === 0)) {
                return;
            }
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
                    return x - y;
                });
                if (!selectedRows.length) {
                    selectedRows = [activeRow.row];
                }
                var top = selectedRows[0];
                var bottom = selectedRows[selectedRows.length - 1];
                var active;
                if (e.which == 40) {
                    active = activeRow.row < bottom || top == bottom ? ++bottom : ++top;
                }
                else {
                    active = activeRow.row < bottom ? --bottom : --top;
                }
                if (active >= 0 && active < _grid.getDataLength()) {
                    _grid.scrollRowIntoView(active);
                    var tempRanges = rowsToRanges(getRowsRange(top, bottom));
                    setSelectedRanges(tempRanges);
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
            if (!_grid.getOptions().multiSelect || (!e.ctrlKey && !e.shiftKey && !e.metaKey)) {
                return false;
            }
            var selection = rangesToRows(_ranges);
            var idx = $.inArray(cell.row, selection);
            if (idx === -1 && (e.ctrlKey || e.metaKey)) {
                selection.push(cell.row);
                _grid.setActiveCell(cell.row, cell.cell);
            }
            else if (idx !== -1 && (e.ctrlKey || e.metaKey)) {
                selection = $.grep(selection, function (o, i) {
                    return (o !== cell.row);
                });
                _grid.setActiveCell(cell.row, cell.cell);
            }
            else if (selection.length && e.shiftKey) {
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
            var tempRanges = rowsToRanges(selection);
            setSelectedRanges(tempRanges);
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
    module.exports = {
        "RowSelectionModel": RowSelectionModel
    };
}
,
446: /* slickgrid/slick.core */ function _(require, module, exports) {
    /***
     * Contains core SlickGrid classes.
     * @module Core
     * @namespace Slick
     */
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
        };
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
            return this; // allow chaining
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
            return this; // allow chaining
        };
        this.unsubscribeAll = function () {
            var i = handlers.length;
            while (i--) {
                handlers[i].event.unsubscribe(handlers[i].handler);
            }
            handlers = [];
            return this; // allow chaining
        };
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
        };
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
         * Whether a group selection checkbox is checked.
         * @property selectChecked
         * @type {Boolean}
         */
        this.selectChecked = false;
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
         * If another edit controller is already active, and exception will be throw new Error(.
         * @method activate
         * @param editController {EditController} edit controller acquiring the lock
         */
        this.activate = function (editController) {
            if (editController === activeEditController) { // already activated?
                return;
            }
            if (activeEditController !== null) {
                throw new Error("SlickGrid.EditorLock.activate: an editController is still active, can't activate another editController");
            }
            if (!editController.commitCurrentEdit) {
                throw new Error("SlickGrid.EditorLock.activate: editController must implement .commitCurrentEdit()");
            }
            if (!editController.cancelCurrentEdit) {
                throw new Error("SlickGrid.EditorLock.activate: editController must implement .cancelCurrentEdit()");
            }
            activeEditController = editController;
        };
        /***
         * Unsets the specified edit controller as the active edit controller (release edit lock).
         * If the specified edit controller is not the active one, an exception will be throw new Error(.
         * @method deactivate
         * @param editController {EditController} edit controller releasing the lock
         */
        this.deactivate = function (editController) {
            if (activeEditController !== editController) {
                throw new Error("SlickGrid.EditorLock.deactivate: specified editController is not the currently active one");
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
    module.exports = {
        "Event": Event,
        "EventData": EventData,
        "EventHandler": EventHandler,
        "Range": Range,
        "NonDataRow": NonDataItem,
        "Group": Group,
        "GroupTotals": GroupTotals,
        "EditorLock": EditorLock,
        /***
         * A global singleton editor lock.
         * @class GlobalEditorLock
         * @static
         * @constructor
         */
        "GlobalEditorLock": new EditorLock(),
        "keyCode": {
            BACKSPACE: 8,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            ESC: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            RIGHT: 39,
            TAB: 9,
            UP: 38,
            C: 67,
            V: 86
        },
        "preClickClassName": "slick-edit-preclick"
    };
}
,
447: /* slickgrid/slick.grid */ function _(require, module, exports) {
    /**
     * @license
     * (c) 2009-2016 Michael Leibman
     * michael{dot}leibman{at}gmail{dot}com
     * http://github.com/mleibman/slickgrid
     *
     * Distributed under MIT license.
     * All rights reserved.
     *
     * SlickGrid v2.3
     *
     * NOTES:
     *     Cell/row DOM manipulations are done directly bypassing jQuery's DOM manipulation methods.
     *     This increases the speed dramatically, but can only be done safely because there are no event handlers
     *     or data associated with any cell/row DOM nodes.  Cell editors must make sure they implement .destroy()
     *     and do proper cleanup.
     */
    var $ = require(448) /* ./slick.jquery */;
    var Slick = require(446) /* ./slick.core */;
    // shared across all grids on the page
    var scrollbarDimensions;
    var maxSupportedCssHeight; // browser's breaking point
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
        if (!$.fn.drag) {
            require(442) /* ./lib/jquery.event.drag-2.3.0 */;
        }
        if (!$.fn.drop) {
            require(443) /* ./lib/jquery.event.drop-2.3.0 */;
        }
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
            enableAsyncPostRenderCleanup: false,
            asyncPostRenderCleanupDelay: 40,
            autoHeight: false,
            editorLock: Slick.GlobalEditorLock,
            showHeaderRow: false,
            headerRowHeight: 25,
            createFooterRow: false,
            showFooterRow: false,
            footerRowHeight: 25,
            createPreHeaderPanel: false,
            showPreHeaderPanel: false,
            preHeaderPanelHeight: 25,
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
            numberedMultiColumnSort: false,
            tristateMultiColumnSort: false,
            defaultFormatter: defaultFormatter,
            forceSyncScrolling: false,
            addNewRowCssClass: "new-row",
            preserveCopiedSelectionOnPaste: false,
            showCellSelection: true
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
        var th; // virtual height
        var h; // real scrollable height
        var ph; // page height
        var n; // number of pages
        var cj; // "jumpiness" coefficient
        var page = 0; // current page
        var offset = 0; // current page offset
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
        var $footerRow, $footerRowScroller, $footerRowSpacer;
        var $preHeaderPanel, $preHeaderPanelScroller, $preHeaderPanelSpacer;
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
        cellWidthDiff = 0, cellHeightDiff = 0, jQueryNewWidthBehaviour = false;
        var absoluteColumnMinWidth;
        var sortIndicatorCssClass = "slick-sort-indicator";
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
        var pagingActive = false;
        var pagingIsLastPage = false;
        // async call handles
        var h_editorLoader = null;
        var h_render = null;
        var h_postrender = null;
        var h_postrenderCleanup = null;
        var postProcessedRows = {};
        var postProcessToRow = null;
        var postProcessFromRow = null;
        var postProcessedCleanupQueue = [];
        var postProcessgroupId = 0;
        // perf counters
        var counter_rows_rendered = 0;
        var counter_rows_removed = 0;
        // These two variables work around a bug with inertial scrolling in Webkit/Blink on Mac.
        // See http://crbug.com/312427.
        var rowNodeFromLastMouseWheelEvent; // this node must not be deleted while inertial scrolling
        var zombieRowNodeFromLastMouseWheelEvent; // node that was hidden instead of getting deleted
        var zombieRowCacheFromLastMouseWheelEvent; // row cache for above node
        var zombieRowPostProcessedFromLastMouseWheelEvent; // post processing references for above node
        // store css attributes if display:none is active in container or parent
        var cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' };
        var $hiddenParents;
        var oldProps = [];
        //////////////////////////////////////////////////////////////////////////////////////////////
        // Initialization
        function init() {
            if (container instanceof $) {
                $container = container;
            }
            else {
                $container = $(container);
            }
            if ($container.length < 1) {
                throw new Error("SlickGrid requires a valid container, " + container + " does not exist in the DOM.");
            }
            cacheCssForHiddenInit();
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
                .addClass("ui-widget");
            // set up a positioning container if needed
            if (!/relative|absolute|fixed/.test($container.css("position"))) {
                $container.css("position", "relative");
            }
            $focusSink = $("<div tabIndex='0' hideFocus style='position:fixed;width:0;height:0;top:0;left:0;outline:0;'></div>").appendTo($container);
            if (options.createPreHeaderPanel) {
                $preHeaderPanelScroller = $("<div class='slick-preheader-panel ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($container);
                $preHeaderPanel = $("<div />").appendTo($preHeaderPanelScroller);
                $preHeaderPanelSpacer = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
                    .css("width", getCanvasWidth() + scrollbarDimensions.width + "px")
                    .appendTo($preHeaderPanelScroller);
                if (!options.showPreHeaderPanel) {
                    $preHeaderPanelScroller.hide();
                }
            }
            $headerScroller = $("<div class='slick-header ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($container);
            $headers = $("<div class='slick-header-columns' style='left:-1000px' />").appendTo($headerScroller);
            $headers.width(getHeadersWidth());
            $headerRowScroller = $("<div class='slick-headerrow ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($container);
            $headerRow = $("<div class='slick-headerrow-columns' />").appendTo($headerRowScroller);
            $headerRowSpacer = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
                .css("width", getCanvasWidth() + scrollbarDimensions.width + "px")
                .appendTo($headerRowScroller);
            $topPanelScroller = $("<div class='slick-top-panel-scroller ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($container);
            $topPanel = $("<div class='slick-top-panel' style='width:10000px' />").appendTo($topPanelScroller);
            if (!options.showTopPanel) {
                $topPanelScroller.hide();
            }
            if (!options.showHeaderRow) {
                $headerRowScroller.hide();
            }
            $viewport = $("<div class='slick-viewport' style='width:100%;overflow:auto;outline:0;position:relative;;'>").appendTo($container);
            $viewport.css("overflow-y", options.autoHeight ? "hidden" : "auto");
            $canvas = $("<div class='grid-canvas' />").appendTo($viewport);
            if (options.createFooterRow) {
                $footerRowScroller = $("<div class='slick-footerrow ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($container);
                $footerRow = $("<div class='slick-footerrow-columns' />").appendTo($footerRowScroller);
                $footerRowSpacer = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
                    .css("width", getCanvasWidth() + scrollbarDimensions.width + "px")
                    .appendTo($footerRowScroller);
                if (!options.showFooterRow) {
                    $footerRowScroller.hide();
                }
            }
            if (options.numberedMultiColumnSort) {
                sortIndicatorCssClass = "slick-sort-indicator-numbered";
            }
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
                    $viewport.on("selectstart.ui", function (event) {
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
                    .on("resize.slickgrid", resizeCanvas);
                $viewport
                    //.on("click", handleClick)
                    .on("scroll", handleScroll);
                $headerScroller
                    .on("contextmenu", handleHeaderContextMenu)
                    .on("click", handleHeaderClick)
                    .on("mouseenter", ".slick-header-column", handleHeaderMouseEnter)
                    .on("mouseleave", ".slick-header-column", handleHeaderMouseLeave);
                $headerRowScroller
                    .on("scroll", handleHeaderRowScroll);
                if (options.createFooterRow) {
                    $footerRowScroller
                        .on("scroll", handleFooterRowScroll);
                }
                if (options.createPreHeaderPanel) {
                    $preHeaderPanelScroller
                        .on("scroll", handlePreHeaderPanelScroll);
                }
                $focusSink.add($focusSink2)
                    .on("keydown", handleKeyDown);
                $canvas
                    .on("keydown", handleKeyDown)
                    .on("click", handleClick)
                    .on("dblclick", handleDblClick)
                    .on("contextmenu", handleContextMenu)
                    .on("draginit", handleDragInit)
                    .on("dragstart", { distance: 3 }, handleDragStart)
                    .on("drag", handleDrag)
                    .on("dragend", handleDragEnd)
                    .on("mouseenter", ".slick-cell", handleMouseEnter)
                    .on("mouseleave", ".slick-cell", handleMouseLeave);
                // Work around http://crbug.com/312427.
                if (navigator.userAgent.toLowerCase().match(/webkit/) &&
                    navigator.userAgent.toLowerCase().match(/macintosh/)) {
                    $canvas.on("mousewheel", handleMouseWheel);
                }
                restoreCssFromHiddenInit();
            }
        }
        function cacheCssForHiddenInit() {
            // handle display:none on container or container parents
            $hiddenParents = $container.parents().addBack().not(':visible');
            $hiddenParents.each(function () {
                var old = {};
                for (var name in cssShow) {
                    old[name] = this.style[name];
                    this.style[name] = cssShow[name];
                }
                oldProps.push(old);
            });
        }
        function restoreCssFromHiddenInit() {
            // finish handle display:none on container or container parents
            // - put values back the way they were
            $hiddenParents.each(function (i) {
                var old = oldProps[i];
                for (var name in cssShow) {
                    this.style[name] = old[name];
                }
            });
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
        function getColumnTotalWidth(includeScrollbar) {
            var totalWidth = 0;
            for (var i = 0, ii = columns.length; i < ii; i++) {
                var width = columns[i].width;
                totalWidth += width;
            }
            if (includeScrollbar) {
                totalWidth += scrollbarDimensions.width;
            }
            return totalWidth;
        }
        function getHeadersWidth() {
            var headersWidth = getColumnTotalWidth(true);
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
                if (options.createFooterRow) {
                    $footerRow.width(canvasWidth);
                }
                if (options.createPreHeaderPanel) {
                    $preHeaderPanel.width(canvasWidth);
                }
                $headers.width(getHeadersWidth());
                viewportHasHScroll = (canvasWidth > viewportW - scrollbarDimensions.width);
            }
            var w = canvasWidth + (viewportHasVScroll ? scrollbarDimensions.width : 0);
            $headerRowSpacer.width(w);
            if (options.createFooterRow) {
                $footerRowSpacer.width(w);
            }
            if (options.createPreHeaderPanel) {
                $preHeaderPanelSpacer.width(w);
            }
            if (canvasWidth != oldCanvasWidth || forceColumnWidthsUpdate) {
                applyColumnWidths();
            }
        }
        function disableSelection($target) {
            if ($target && $target.jquery) {
                $target
                    .attr("unselectable", "on")
                    .css("MozUserSelect", "none")
                    .on("selectstart.ui", function () {
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
                }
                else {
                    supportedHeight = test;
                }
            }
            div.remove();
            return supportedHeight;
        }
        function getUID() {
            return uid;
        }
        function getHeaderColumnWidthDiff() {
            return headerColumnWidthDiff;
        }
        function getScrollbarDimensions() {
            return scrollbarDimensions;
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
                    }
                    else {
                        $boundAncestors = $boundAncestors.add($elem);
                    }
                    $elem.on("scroll." + uid, handleActiveCellPositionChange);
                }
            }
        }
        function unbindAncestorScrollEvents() {
            if (!$boundAncestors) {
                return;
            }
            $boundAncestors.off("scroll." + uid);
            $boundAncestors = null;
        }
        function updateColumnHeader(columnId, title, toolTip) {
            if (!initialized) {
                return;
            }
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
                    "column": columnDef,
                    "grid": self
                });
                $header
                    .attr("title", toolTip || "")
                    .children().eq(0).html(title);
                trigger(self.onHeaderCellRendered, {
                    "node": $header[0],
                    "column": columnDef,
                    "grid": self
                });
            }
        }
        function getHeaderRow() {
            return $headerRow[0];
        }
        function getFooterRow() {
            return $footerRow[0];
        }
        function getPreHeaderPanel() {
            return $preHeaderPanel[0];
        }
        function getHeaderRowColumn(columnId) {
            var idx = getColumnIndex(columnId);
            var $header = $headerRow.children().eq(idx);
            return $header && $header[0];
        }
        function getFooterRowColumn(columnId) {
            var idx = getColumnIndex(columnId);
            var $footer = $footerRow.children().eq(idx);
            return $footer && $footer[0];
        }
        function createColumnHeaders() {
            function onMouseEnter() {
                $(this).addClass("ui-state-hover");
            }
            function onMouseLeave() {
                $(this).removeClass("ui-state-hover");
            }
            $headers.find(".slick-header-column")
                .each(function () {
                var columnDef = $(this).data("column");
                if (columnDef) {
                    trigger(self.onBeforeHeaderCellDestroy, {
                        "node": this,
                        "column": columnDef,
                        "grid": self
                    });
                }
            });
            $headers.empty();
            $headers.width(getHeadersWidth());
            $headerRow.find(".slick-headerrow-column")
                .each(function () {
                var columnDef = $(this).data("column");
                if (columnDef) {
                    trigger(self.onBeforeHeaderRowCellDestroy, {
                        "node": this,
                        "column": columnDef,
                        "grid": self
                    });
                }
            });
            $headerRow.empty();
            if (options.createFooterRow) {
                $footerRow.find(".slick-footerrow-column")
                    .each(function () {
                    var columnDef = $(this).data("column");
                    if (columnDef) {
                        trigger(self.onBeforeFooterRowCellDestroy, {
                            "node": this,
                            "column": columnDef
                        });
                    }
                });
                $footerRow.empty();
            }
            for (var i = 0; i < columns.length; i++) {
                var m = columns[i];
                var header = $("<div class='ui-state-default slick-header-column' />")
                    .html("<span class='slick-column-name'>" + m.name + "</span>")
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
                    header.addClass("slick-header-sortable");
                    header.append("<span class='" + sortIndicatorCssClass + "' />");
                }
                trigger(self.onHeaderCellRendered, {
                    "node": header[0],
                    "column": m,
                    "grid": self
                });
                if (options.showHeaderRow) {
                    var headerRowCell = $("<div class='ui-state-default slick-headerrow-column l" + i + " r" + i + "'></div>")
                        .data("column", m)
                        .appendTo($headerRow);
                    trigger(self.onHeaderRowCellRendered, {
                        "node": headerRowCell[0],
                        "column": m,
                        "grid": self
                    });
                }
                if (options.createFooterRow && options.showFooterRow) {
                    var footerRowCell = $("<div class='ui-state-default slick-footerrow-column l" + i + " r" + i + "'></div>")
                        .data("column", m)
                        .appendTo($footerRow);
                    trigger(self.onFooterRowCellRendered, {
                        "node": footerRowCell[0],
                        "column": m
                    });
                }
            }
            setSortColumns(sortColumns);
            setupColumnResize();
            if (options.enableColumnReorder) {
                if (typeof options.enableColumnReorder == 'function') {
                    options.enableColumnReorder(self, $headers, headerColumnWidthDiff, setColumns, setupColumnResize, columns, getColumnIndex, uid, trigger);
                }
                else {
                    setupColumnReorder();
                }
            }
        }
        function setupColumnSort() {
            $headers.click(function (e) {
                // temporary workaround for a bug in jQuery 1.7.1 (http://bugs.jquery.com/ticket/11328)
                e.metaKey = e.metaKey || e.ctrlKey;
                if ($(e.target).hasClass("slick-resizable-handle")) {
                    return;
                }
                var $col = $(e.target).closest(".slick-header-column");
                if (!$col.length) {
                    return;
                }
                var column = $col.data("column");
                if (column.sortable) {
                    if (!getEditorLock().commitCurrentEdit()) {
                        return;
                    }
                    var sortColumn = null;
                    var i = 0;
                    for (; i < sortColumns.length; i++) {
                        if (sortColumns[i].columnId == column.id) {
                            sortColumn = sortColumns[i];
                            sortColumn.sortAsc = !sortColumn.sortAsc;
                            break;
                        }
                    }
                    var hadSortCol = !!sortColumn;
                    if (options.tristateMultiColumnSort) {
                        if (!sortColumn) {
                            sortColumn = { columnId: column.id, sortAsc: column.defaultSortAsc };
                        }
                        if (hadSortCol && sortColumn.sortAsc) {
                            // three state: remove sort rather than go back to ASC
                            sortColumns.splice(i, 1);
                            sortColumn = null;
                        }
                        if (!options.multiColumnSort) {
                            sortColumns = [];
                        }
                        if (sortColumn && (!hadSortCol || !options.multiColumnSort)) {
                            sortColumns.push(sortColumn);
                        }
                    }
                    else {
                        // legacy behaviour
                        if (e.metaKey && options.multiColumnSort) {
                            if (sortColumn) {
                                sortColumns.splice(i, 1);
                            }
                        }
                        else {
                            if ((!e.shiftKey && !e.metaKey) || !options.multiColumnSort) {
                                sortColumns = [];
                            }
                            if (!sortColumn) {
                                sortColumn = { columnId: column.id, sortAsc: column.defaultSortAsc };
                                sortColumns.push(sortColumn);
                            }
                            else if (sortColumns.length == 0) {
                                sortColumns.push(sortColumn);
                            }
                        }
                    }
                    setSortColumns(sortColumns);
                    if (sortColumns.length > 0) {
                        if (!options.multiColumnSort) {
                            trigger(self.onSort, {
                                multiColumnSort: false,
                                sortCol: column,
                                sortAsc: sortColumns[0].sortAsc,
                                grid: self
                            }, e);
                        }
                        else {
                            trigger(self.onSort, {
                                multiColumnSort: true,
                                sortCols: $.map(sortColumns, function (col) {
                                    return { sortCol: columns[getColumnIndex(col.columnId)], sortAsc: col.sortAsc };
                                }),
                                grid: self
                            }, e);
                        }
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
                placeholder: "slick-sortable-placeholder ui-state-default slick-header-column",
                start: function (e, ui) {
                    ui.placeholder.width(ui.helper.outerWidth() - headerColumnWidthDiff);
                    $(ui.helper).addClass("slick-header-column-active");
                },
                beforeStop: function (e, ui) {
                    $(ui.helper).removeClass("slick-header-column-active");
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
                    trigger(self.onColumnsReordered, { grid: self });
                    e.stopPropagation();
                    setupColumnResize();
                }
            });
        }
        function setupColumnResize() {
            var $col, j, c, pageX, columnElements, minPageX, maxPageX, firstResizable, lastResizable;
            columnElements = $headers.children();
            columnElements.find(".slick-resizable-handle").remove();
            columnElements.each(function (i, e) {
                if (i >= columns.length) {
                    return;
                }
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
                if (i >= columns.length) {
                    return;
                }
                if (i < firstResizable || (options.forceFitColumns && i >= lastResizable)) {
                    return;
                }
                $col = $(e);
                $("<div class='slick-resizable-handle' />")
                    .appendTo(e)
                    .on("dragstart", function (e, dd) {
                    if (!getEditorLock().commitCurrentEdit()) {
                        return false;
                    }
                    pageX = e.pageX;
                    $(this).parent().addClass("slick-header-column-active");
                    var shrinkLeewayOnRight = null, stretchLeewayOnRight = null;
                    // lock each column's width option to current width
                    columnElements.each(function (i, e) {
                        if (i >= columns.length) {
                            return;
                        }
                        columns[i].previousWidth = $(e).outerWidth();
                    });
                    if (options.forceFitColumns) {
                        shrinkLeewayOnRight = 0;
                        stretchLeewayOnRight = 0;
                        // colums on right affect maxPageX/minPageX
                        for (j = i + 1; j < columns.length; j++) {
                            c = columns[j];
                            if (c.resizable) {
                                if (stretchLeewayOnRight !== null) {
                                    if (c.maxWidth) {
                                        stretchLeewayOnRight += c.maxWidth - c.previousWidth;
                                    }
                                    else {
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
                                }
                                else {
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
                    .on("drag", function (e, dd) {
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
                                }
                                else {
                                    c.width = c.previousWidth + x;
                                    x = 0;
                                }
                            }
                        }
                        if (options.forceFitColumns) {
                            x = -d;
                            for (j = i + 1; j < columns.length; j++) {
                                c = columns[j];
                                if (c.resizable) {
                                    if (x && c.maxWidth && (c.maxWidth - c.previousWidth < x)) {
                                        x -= c.maxWidth - c.previousWidth;
                                        c.width = c.maxWidth;
                                    }
                                    else {
                                        c.width = c.previousWidth + x;
                                        x = 0;
                                    }
                                }
                            }
                        }
                    }
                    else { // stretch column
                        x = d;
                        for (j = i; j >= 0; j--) {
                            c = columns[j];
                            if (c.resizable) {
                                if (x && c.maxWidth && (c.maxWidth - c.previousWidth < x)) {
                                    x -= c.maxWidth - c.previousWidth;
                                    c.width = c.maxWidth;
                                }
                                else {
                                    c.width = c.previousWidth + x;
                                    x = 0;
                                }
                            }
                        }
                        if (options.forceFitColumns) {
                            x = -d;
                            for (j = i + 1; j < columns.length; j++) {
                                c = columns[j];
                                if (c.resizable) {
                                    actualMinWidth = Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                                    if (x && c.previousWidth + x < actualMinWidth) {
                                        x += c.previousWidth - actualMinWidth;
                                        c.width = actualMinWidth;
                                    }
                                    else {
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
                    .on("dragend", function (e, dd) {
                    var newWidth;
                    $(this).parent().removeClass("slick-header-column-active");
                    for (j = 0; j < columns.length; j++) {
                        c = columns[j];
                        newWidth = $(columnElements[j]).outerWidth();
                        if (c.previousWidth !== newWidth && c.rerenderOnResize) {
                            invalidateAllRows();
                        }
                    }
                    updateCanvasWidth(true);
                    render();
                    trigger(self.onColumnsResized, { grid: self });
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
            // jquery prior to version 1.8 handles .width setter/getter as a direct css write/read
            // jquery 1.8 changed .width to read the true inner element width if box-sizing is set to border-box, and introduced a setter for .outerWidth
            // so for equivalent functionality, prior to 1.8 use .width, and after use .outerWidth
            var verArray = $.fn.jquery.split('.');
            jQueryNewWidthBehaviour = (verArray[0] == 1 && verArray[1] >= 8) || verArray[0] >= 2;
            el = $("<div class='ui-state-default slick-header-column' style='visibility:hidden'>-</div>").appendTo($headers);
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
            var r = $("<div class='slick-row' />").appendTo($canvas);
            el = $("<div class='slick-cell' id='' style='visibility:hidden'>-</div>").appendTo(r);
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
                "." + uid + " .slick-header-column { left: 1000px; }",
                "." + uid + " .slick-top-panel { height:" + options.topPanelHeight + "px; }",
                "." + uid + " .slick-preheader-panel { height:" + options.preHeaderPanelHeight + "px; }",
                "." + uid + " .slick-headerrow-columns { height:" + options.headerRowHeight + "px; }",
                "." + uid + " .slick-footerrow-columns { height:" + options.footerRowHeight + "px; }",
                "." + uid + " .slick-cell { height:" + rowHeight + "px; }",
                "." + uid + " .slick-row { height:" + options.rowHeight + "px; }"
            ];
            for (var i = 0; i < columns.length; i++) {
                rules.push("." + uid + " .l" + i + " { }");
                rules.push("." + uid + " .r" + i + " { }");
            }
            if ($style[0].styleSheet) { // IE
                $style[0].styleSheet.cssText = rules.join(" ");
            }
            else {
                $style[0].appendChild(document.createTextNode(rules.join(" ")));
            }
        }
        function getColumnCssRules(idx) {
            var i;
            if (!stylesheet) {
                var sheets = document.styleSheets;
                for (i = 0; i < sheets.length; i++) {
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
                for (i = 0; i < cssRules.length; i++) {
                    var selector = cssRules[i].selectorText;
                    if (matches = /\.l\d+/.exec(selector)) {
                        columnIdx = parseInt(matches[0].substr(2, matches[0].length - 2), 10);
                        columnCssRulesL[columnIdx] = cssRules[i];
                    }
                    else if (matches = /\.r\d+/.exec(selector)) {
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
            trigger(self.onBeforeDestroy, { grid: self });
            var i = plugins.length;
            while (i--) {
                unregisterPlugin(plugins[i]);
            }
            if (options.enableColumnReorder) {
                $headers.filter(":ui-sortable").sortable("destroy");
            }
            unbindAncestorScrollEvents();
            $container.off(".slickgrid");
            removeCssRules();
            $canvas.off("draginit dragstart dragend drag");
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
            var i, c, widths = [], shrinkLeeway = 0, total = 0, prevTotal, availWidth = viewportHasVScroll ? viewportW - scrollbarDimensions.width : viewportW;
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
                if (prevTotal <= total) { // avoid infinite loop
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
                    }
                    else {
                        growSize = Math.min(Math.floor(growProportion * currentWidth) - currentWidth, (c.maxWidth - currentWidth) || 1000000) || 1;
                    }
                    total += growSize;
                    widths[i] += (total <= availWidth ? growSize : 0);
                }
                if (prevTotal >= total) { // avoid infinite loop
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
            if (!initialized) {
                return;
            }
            var h;
            for (var i = 0, headers = $headers.children(), ii = columns.length; i < ii; i++) {
                h = $(headers[i]);
                if (jQueryNewWidthBehaviour) {
                    if (h.outerWidth() !== columns[i].width) {
                        h.outerWidth(columns[i].width);
                    }
                }
                else {
                    if (h.width() !== columns[i].width - headerColumnWidthDiff) {
                        h.width(columns[i].width - headerColumnWidthDiff);
                    }
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
            setSortColumns([{ columnId: columnId, sortAsc: ascending }]);
        }
        function setSortColumns(cols) {
            sortColumns = cols;
            var numberCols = options.numberedMultiColumnSort && sortColumns.length > 1;
            var headerColumnEls = $headers.children();
            var sortIndicatorEl = headerColumnEls
                .removeClass("slick-header-column-sorted")
                .find("." + sortIndicatorCssClass)
                .removeClass("slick-sort-indicator-asc slick-sort-indicator-desc");
            if (numberCols) {
                sortIndicatorEl.text('');
            }
            $.each(sortColumns, function (i, col) {
                if (col.sortAsc == null) {
                    col.sortAsc = true;
                }
                var columnIndex = getColumnIndex(col.columnId);
                if (columnIndex != null) {
                    sortIndicatorEl = headerColumnEls.eq(columnIndex)
                        .addClass("slick-header-column-sorted")
                        .find("." + sortIndicatorCssClass)
                        .addClass(col.sortAsc ? "slick-sort-indicator-asc" : "slick-sort-indicator-desc");
                    if (numberCols) {
                        sortIndicatorEl.text(i + 1);
                    }
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
                    if (!hash[j]) { // prevent duplicates
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
            trigger(self.onSelectedRowsChanged, { rows: getSelectedRows(), grid: self }, e);
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
        function setOptions(args, suppressRender) {
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
            if (!suppressRender) {
                render();
            }
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
            }
            else {
                return data.length;
            }
        }
        function getDataLengthIncludingAddNew() {
            return getDataLength() + (!options.enableAddRow ? 0
                : (!pagingActive || pagingIsLastPage ? 1 : 0));
        }
        function getDataItem(i) {
            if (data.getItem) {
                return data.getItem(i);
            }
            else {
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
                }
                else {
                    $topPanelScroller.slideUp("fast", resizeCanvas);
                }
            }
        }
        function setHeaderRowVisibility(visible) {
            if (options.showHeaderRow != visible) {
                options.showHeaderRow = visible;
                if (visible) {
                    $headerRowScroller.slideDown("fast", resizeCanvas);
                }
                else {
                    $headerRowScroller.slideUp("fast", resizeCanvas);
                }
            }
        }
        function setFooterRowVisibility(visible) {
            if (options.showFooterRow != visible) {
                options.showFooterRow = visible;
                if (visible) {
                    $footerRowScroller.slideDown("fast", resizeCanvas);
                }
                else {
                    $footerRowScroller.slideUp("fast", resizeCanvas);
                }
            }
        }
        function setPreHeaderPanelVisibility(visible) {
            if (options.showPreHeaderPanel != visible) {
                options.showPreHeaderPanel = visible;
                if (visible) {
                    $preHeaderPanelScroller.slideDown("fast", resizeCanvas);
                }
                else {
                    $preHeaderPanelScroller.slideUp("fast", resizeCanvas);
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
                trigger(self.onViewportChanged, { grid: self });
            }
        }
        function defaultFormatter(row, cell, value, columnDef, dataContext) {
            if (value == null) {
                return "";
            }
            else {
                return (value + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }
        }
        function getFormatter(row, column) {
            var rowMetadata = data.getItemMetadata && data.getItemMetadata(row);
            // look up by id, then index
            var columnOverrides = rowMetadata &&
                rowMetadata.columns &&
                (rowMetadata.columns[column.id] || rowMetadata.columns[getColumnIndex(column.id)]);
            return (columnOverrides && columnOverrides.formatter) ||
                (rowMetadata && rowMetadata.formatter) ||
                column.formatter ||
                (options.formatterFactory && options.formatterFactory.getFormatter(column)) ||
                options.defaultFormatter;
        }
        function getEditor(row, cell) {
            var column = columns[cell];
            var rowMetadata = data.getItemMetadata && data.getItemMetadata(row);
            var columnMetadata = rowMetadata && rowMetadata.columns;
            if (columnMetadata && columnMetadata[column.id] && columnMetadata[column.id].editor !== undefined) {
                return columnMetadata[column.id].editor;
            }
            if (columnMetadata && columnMetadata[cell] && columnMetadata[cell].editor !== undefined) {
                return columnMetadata[cell].editor;
            }
            return column.editor || (options.editorFactory && options.editorFactory.getEditor(column));
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
            var rowCss = "slick-row" +
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
            stringArray.push("<div class='ui-widget-content " + rowCss + "' style='top:" + getRowTop(row) + "px'>");
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
            // stringArray: stringBuilder containing the HTML parts
            // row, cell: row and column index
            // colspan: HTML colspan
            // item: grid data for row
            var m = columns[cell];
            var cellCss = "slick-cell l" + cell + " r" + Math.min(columns.length - 1, cell + colspan - 1) +
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
            var value = null;
            if (item) {
                value = getDataItemValueForColumn(item, m);
            }
            var formatterResult = getFormatter(row, m)(row, cell, value, m, item);
            // get addl css class names from object type formatter return and from string type return of onBeforeAppendCell
            var addlCssClasses = trigger(self.onBeforeAppendCell, { row: row, cell: cell, grid: self, value: value, dataContext: item }) || '';
            addlCssClasses += (formatterResult.addClasses ? (addlCssClasses ? ' ' : '') + formatterResult.addClasses : '');
            stringArray.push("<div class='" + cellCss + (addlCssClasses ? ' ' + addlCssClasses : '') + "'>");
            // if there is a corresponding row (if not, this is the Add New row or this data hasn't been loaded yet)
            if (item) {
                stringArray.push(typeof formatterResult !== 'object' ? formatterResult : formatterResult.text);
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
            if (options.enableAsyncPostRenderCleanup) {
                startPostProcessingCleanup();
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
            if (options.enableAsyncPostRenderCleanup) {
                startPostProcessingCleanup();
            }
        }
        function queuePostProcessedRowForCleanup(cacheEntry, postProcessedRow, rowIdx) {
            postProcessgroupId++;
            // store and detach node for later async cleanup
            for (var columnIdx in postProcessedRow) {
                if (postProcessedRow.hasOwnProperty(columnIdx)) {
                    postProcessedCleanupQueue.push({
                        actionType: 'C',
                        groupId: postProcessgroupId,
                        node: cacheEntry.cellNodesByColumnIdx[columnIdx | 0],
                        columnIdx: columnIdx | 0,
                        rowIdx: rowIdx
                    });
                }
            }
            postProcessedCleanupQueue.push({
                actionType: 'R',
                groupId: postProcessgroupId,
                node: cacheEntry.rowNode
            });
            $(cacheEntry.rowNode).detach();
        }
        function queuePostProcessedCellForCleanup(cellnode, columnIdx, rowIdx) {
            postProcessedCleanupQueue.push({
                actionType: 'C',
                groupId: postProcessgroupId,
                node: cellnode,
                columnIdx: columnIdx,
                rowIdx: rowIdx
            });
            $(cellnode).detach();
        }
        function removeRowFromCache(row) {
            var cacheEntry = rowsCache[row];
            if (!cacheEntry) {
                return;
            }
            if (rowNodeFromLastMouseWheelEvent === cacheEntry.rowNode) {
                cacheEntry.rowNode.style.display = 'none';
                zombieRowNodeFromLastMouseWheelEvent = rowNodeFromLastMouseWheelEvent;
                zombieRowCacheFromLastMouseWheelEvent = cacheEntry;
                zombieRowPostProcessedFromLastMouseWheelEvent = postProcessedRows[row];
                // ignore post processing cleanup in this case - it will be dealt with later
            }
            else {
                if (options.enableAsyncPostRenderCleanup && postProcessedRows[row]) {
                    queuePostProcessedRowForCleanup(cacheEntry, postProcessedRows[row], row);
                }
                else {
                    $canvas[0].removeChild(cacheEntry.rowNode);
                }
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
            rl = rows.length;
            for (i = 0; i < rl; i++) {
                if (currentEditor && activeRow === rows[i]) {
                    makeActiveCellNormal();
                }
                if (rowsCache[rows[i]]) {
                    removeRowFromCache(rows[i]);
                }
            }
            if (options.enableAsyncPostRenderCleanup) {
                startPostProcessingCleanup();
            }
        }
        function invalidateRow(row) {
            invalidateRows([row]);
        }
        function applyFormatResultToCellNode(formatterResult, cellNode, suppressRemove) {
            if (typeof formatterResult !== 'object') {
                cellNode.innerHTML = formatterResult;
                return;
            }
            cellNode.innerHTML = formatterResult.text;
            if (formatterResult.removeClasses && !suppressRemove) {
                cellNode.removeClass(formatterResult.removeClasses);
            }
            if (formatterResult.addClasses) {
                cellNode.addClass(formatterResult.addClasses);
            }
        }
        function updateCell(row, cell) {
            var cellNode = getCellNode(row, cell);
            if (!cellNode) {
                return;
            }
            var m = columns[cell], d = getDataItem(row);
            if (currentEditor && activeRow === row && activeCell === cell) {
                currentEditor.loadValue(d);
            }
            else {
                var formatterResult = d ? getFormatter(row, m)(row, cell, getDataItemValueForColumn(d, m), m, d) : "";
                applyFormatResultToCellNode(formatterResult, cellNode);
                invalidatePostProcessingResults(row);
            }
        }
        function updateRow(row) {
            var cacheEntry = rowsCache[row];
            if (!cacheEntry) {
                return;
            }
            ensureCellNodesInRowsCache(row);
            var formatterResult, d = getDataItem(row);
            for (var columnIdx in cacheEntry.cellNodesByColumnIdx) {
                if (!cacheEntry.cellNodesByColumnIdx.hasOwnProperty(columnIdx)) {
                    continue;
                }
                columnIdx = columnIdx | 0;
                var m = columns[columnIdx], node = cacheEntry.cellNodesByColumnIdx[columnIdx];
                if (row === activeRow && columnIdx === activeCell && currentEditor) {
                    currentEditor.loadValue(d);
                }
                else if (d) {
                    formatterResult = getFormatter(row, m)(row, columnIdx, getDataItemValueForColumn(d, m), m, d);
                    applyFormatResultToCellNode(formatterResult, node);
                }
                else {
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
                (options.showHeaderRow ? options.headerRowHeight + getVBoxDelta($headerRowScroller) : 0) -
                (options.createFooterRow && options.showFooterRow ? options.footerRowHeight + getVBoxDelta($footerRowScroller) : 0) -
                (options.createPreHeaderPanel && options.showPreHeaderPanel ? options.preHeaderPanelHeight + getVBoxDelta($preHeaderPanelScroller) : 0);
        }
        function resizeCanvas() {
            if (!initialized) {
                return;
            }
            if (options.autoHeight) {
                viewportH = options.rowHeight * getDataLengthIncludingAddNew();
            }
            else {
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
        function updatePagingStatusFromView(pagingInfo) {
            pagingActive = (pagingInfo.pageSize !== 0);
            pagingIsLastPage = (pagingInfo.pageNum == pagingInfo.totalPages - 1);
        }
        function updateRowCount() {
            if (!initialized) {
                return;
            }
            var dataLength = getDataLength();
            var dataLengthIncludingAddNew = getDataLengthIncludingAddNew();
            var numberOfRows = dataLengthIncludingAddNew +
                (options.leaveSpaceForNewRows ? numVisibleRows - 1 : 0);
            var oldViewportHasVScroll = viewportHasVScroll;
            // with autoHeight, we do not need to accommodate the vertical scroll bar
            viewportHasVScroll = !options.autoHeight && (numberOfRows * options.rowHeight > viewportH);
            viewportHasHScroll = (canvasWidth > viewportW - scrollbarDimensions.width);
            makeActiveCellNormal();
            // remove the rows that are now outside of the data range
            // this helps avoid redundant calls to .removeRow() when the size of the data decreased by thousands of rows
            var r1 = dataLength - 1;
            for (var i in rowsCache) {
                if (i > r1) {
                    removeRowFromCache(i);
                }
            }
            if (options.enableAsyncPostRenderCleanup) {
                startPostProcessingCleanup();
            }
            if (activeCellNode && activeRow > r1) {
                resetActiveCell();
            }
            var oldH = h;
            th = Math.max(options.rowHeight * numberOfRows, viewportH - scrollbarDimensions.height);
            if (th < maxSupportedCssHeight) {
                // just one page
                h = ph = th;
                n = 1;
                cj = 0;
            }
            else {
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
            }
            else if (oldScrollTopInRange) {
                // maintain virtual position
                scrollTo(scrollTop + offset);
            }
            else {
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
            }
            else if (vScrollDir == 1) {
                range.top -= minBuffer;
                range.bottom += buffer;
            }
            else {
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
            var cellToRemove, node;
            postProcessgroupId++;
            while ((cellToRemove = cellsToRemove.pop()) != null) {
                node = cacheEntry.cellNodesByColumnIdx[cellToRemove];
                if (options.enableAsyncPostRenderCleanup && postProcessedRows[row] && postProcessedRows[row][cellToRemove]) {
                    queuePostProcessedCellForCleanup(node, cellToRemove, row);
                }
                else {
                    cacheEntry.rowNode.removeChild(node);
                }
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
            var parentNode = $canvas[0], stringArray = [], rows = [], needToReselectCell = false, dataLength = getDataLength();
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
            if (!rows.length) {
                return;
            }
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
        function startPostProcessingCleanup() {
            if (!options.enableAsyncPostRenderCleanup) {
                return;
            }
            clearTimeout(h_postrenderCleanup);
            h_postrenderCleanup = setTimeout(asyncPostProcessCleanupRows, options.asyncPostRenderCleanupDelay);
        }
        function invalidatePostProcessingResults(row) {
            // change status of columns to be re-rendered
            for (var columnIdx in postProcessedRows[row]) {
                if (postProcessedRows[row].hasOwnProperty(columnIdx)) {
                    postProcessedRows[row][columnIdx] = 'C';
                }
            }
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
            if (!initialized) {
                return;
            }
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
        function handleFooterRowScroll() {
            var scrollLeft = $footerRowScroller[0].scrollLeft;
            if (scrollLeft != $viewport[0].scrollLeft) {
                $viewport[0].scrollLeft = scrollLeft;
            }
        }
        function handlePreHeaderPanelScroll() {
            var scrollLeft = $preHeaderPanelScroller[0].scrollLeft;
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
                if (options.createFooterRow) {
                    $footerRowScroller[0].scrollLeft = scrollLeft;
                }
                if (options.createPreHeaderPanel) {
                    $preHeaderPanelScroller[0].scrollLeft = scrollLeft;
                }
            }
            if (vScrollDist) {
                vScrollDir = prevScrollTop < scrollTop ? 1 : -1;
                prevScrollTop = scrollTop;
                // switch virtual pages if needed
                if (vScrollDist < viewportH) {
                    scrollTo(scrollTop + offset);
                }
                else {
                    var oldOffset = offset;
                    if (h == viewportH) {
                        page = 0;
                    }
                    else {
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
                    if (options.forceSyncScrolling || (Math.abs(lastRenderedScrollTop - scrollTop) < viewportH &&
                        Math.abs(lastRenderedScrollLeft - scrollLeft) < viewportW)) {
                        render();
                    }
                    else {
                        h_render = setTimeout(render, 50);
                    }
                    trigger(self.onViewportChanged, { grid: self });
                }
            }
            trigger(self.onScroll, { scrollLeft: scrollLeft, scrollTop: scrollTop, grid: self });
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
                    var processedStatus = postProcessedRows[row][columnIdx]; // C=cleanup and re-render, R=rendered
                    if (m.asyncPostRender && processedStatus !== 'R') {
                        var node = cacheEntry.cellNodesByColumnIdx[columnIdx];
                        if (node) {
                            m.asyncPostRender(node, row, getDataItem(row), m, (processedStatus === 'C'));
                        }
                        postProcessedRows[row][columnIdx] = 'R';
                    }
                }
                h_postrender = setTimeout(asyncPostProcessRows, options.asyncPostRenderDelay);
                return;
            }
        }
        function asyncPostProcessCleanupRows() {
            if (postProcessedCleanupQueue.length > 0) {
                var groupId = postProcessedCleanupQueue[0].groupId;
                // loop through all queue members with this groupID
                while (postProcessedCleanupQueue.length > 0 && postProcessedCleanupQueue[0].groupId == groupId) {
                    var entry = postProcessedCleanupQueue.shift();
                    if (entry.actionType == 'R') {
                        $(entry.node).remove();
                    }
                    if (entry.actionType == 'C') {
                        var column = columns[entry.columnIdx];
                        if (column.asyncPostRenderCleanup && entry.node) {
                            // cleanup must also remove element
                            column.asyncPostRenderCleanup(entry.node, entry.rowIdx, column);
                        }
                    }
                }
                // call this function again after the specified delay
                h_postrenderCleanup = setTimeout(asyncPostProcessCleanupRows, options.asyncPostRenderCleanupDelay);
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
                throw new Error("addCellCssStyles: cell CSS hash with key '" + key + "' already exists.");
            }
            cellCssClasses[key] = hash;
            updateCellCssStylesOnRenderedRows(hash, null);
            trigger(self.onCellCssStylesChanged, { "key": key, "hash": hash, "grid": self });
        }
        function removeCellCssStyles(key) {
            if (!cellCssClasses[key]) {
                return;
            }
            updateCellCssStylesOnRenderedRows(null, cellCssClasses[key]);
            delete cellCssClasses[key];
            trigger(self.onCellCssStylesChanged, { "key": key, "hash": null, "grid": self });
        }
        function setCellCssStyles(key, hash) {
            var prevHash = cellCssClasses[key];
            cellCssClasses[key] = hash;
            updateCellCssStylesOnRenderedRows(hash, prevHash);
            trigger(self.onCellCssStylesChanged, { "key": key, "hash": hash, "grid": self });
        }
        function getCellCssStyles(key) {
            return cellCssClasses[key];
        }
        function flashCell(row, cell, speed) {
            speed = speed || 100;
            if (rowsCache[row]) {
                var $cell = $(getCellNode(row, cell));
                var toggleCellClass = function (times) {
                    if (!times) {
                        return;
                    }
                    setTimeout(function () {
                        $cell.queue(function () {
                            $cell.toggleClass(options.cellFlashingCssClass).dequeue();
                            toggleCellClass(times - 1);
                        });
                    }, speed);
                };
                toggleCellClass(4);
            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////
        // Interactivity
        function handleMouseWheel(e) {
            var rowNode = $(e.target).closest(".slick-row")[0];
            if (rowNode != rowNodeFromLastMouseWheelEvent) {
                if (zombieRowNodeFromLastMouseWheelEvent && zombieRowNodeFromLastMouseWheelEvent != rowNode) {
                    if (options.enableAsyncPostRenderCleanup && zombieRowPostProcessedFromLastMouseWheelEvent) {
                        queuePostProcessedRowForCleanup(zombieRowCacheFromLastMouseWheelEvent, zombieRowPostProcessedFromLastMouseWheelEvent);
                    }
                    else {
                        $canvas[0].removeChild(zombieRowNodeFromLastMouseWheelEvent);
                    }
                    zombieRowNodeFromLastMouseWheelEvent = null;
                    zombieRowCacheFromLastMouseWheelEvent = null;
                    zombieRowPostProcessedFromLastMouseWheelEvent = null;
                    if (options.enableAsyncPostRenderCleanup) {
                        startPostProcessingCleanup();
                    }
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
            trigger(self.onKeyDown, { row: activeRow, cell: activeCell, grid: self }, e);
            var handled = e.isImmediatePropagationStopped();
            var keyCode = Slick.keyCode;
            if (!handled) {
                if (!e.shiftKey && !e.altKey && !e.ctrlKey) {
                    // editor may specify an array of keys to bubble
                    if (options.editable && currentEditor && currentEditor.keyCaptureList) {
                        if (currentEditor.keyCaptureList.indexOf(e.which) > -1) {
                            return;
                        }
                    }
                    if (e.which == keyCode.ESCAPE) {
                        if (!getEditorLock().isActive()) {
                            return; // no editing mode to cancel, allow bubbling and default processing (exit without cancelling the event)
                        }
                        cancelEditAndSetFocus();
                    }
                    else if (e.which == keyCode.PAGE_DOWN) {
                        navigatePageDown();
                        handled = true;
                    }
                    else if (e.which == keyCode.PAGE_UP) {
                        navigatePageUp();
                        handled = true;
                    }
                    else if (e.which == keyCode.LEFT) {
                        handled = navigateLeft();
                    }
                    else if (e.which == keyCode.RIGHT) {
                        handled = navigateRight();
                    }
                    else if (e.which == keyCode.UP) {
                        handled = navigateUp();
                    }
                    else if (e.which == keyCode.DOWN) {
                        handled = navigateDown();
                    }
                    else if (e.which == keyCode.TAB) {
                        handled = navigateNext();
                    }
                    else if (e.which == keyCode.ENTER) {
                        if (options.editable) {
                            if (currentEditor) {
                                // adding new row
                                if (activeRow === getDataLength()) {
                                    navigateDown();
                                }
                                else {
                                    commitEditAndSetFocus();
                                }
                            }
                            else {
                                if (getEditorLock().commitCurrentEdit()) {
                                    makeActiveCellEditable();
                                }
                            }
                        }
                        handled = true;
                    }
                }
                else if (e.which == keyCode.TAB && e.shiftKey && !e.ctrlKey && !e.altKey) {
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
                if (e.target != document.activeElement || $(e.target).hasClass("slick-cell")) {
                    setFocus();
                }
            }
            var cell = getCellFromEvent(e);
            if (!cell || (currentEditor !== null && activeRow == cell.row && activeCell == cell.cell)) {
                return;
            }
            trigger(self.onClick, { row: cell.row, cell: cell.cell, grid: self }, e);
            if (e.isImmediatePropagationStopped()) {
                return;
            }
            // this optimisation causes trouble - MLeibman #329
            //if ((activeCell != cell.cell || activeRow != cell.row) && canCellBeActive(cell.row, cell.cell)) {
            if (canCellBeActive(cell.row, cell.cell)) {
                if (!getEditorLock().isActive() || getEditorLock().commitCurrentEdit()) {
                    scrollRowIntoView(cell.row, false);
                    var preClickModeOn = (e.target && e.target.className === Slick.preClickClassName);
                    setActiveCellInternal(getCellNode(cell.row, cell.cell), null, preClickModeOn);
                }
            }
        }
        function handleContextMenu(e) {
            var $cell = $(e.target).closest(".slick-cell", $canvas);
            if ($cell.length === 0) {
                return;
            }
            // are we editing this cell?
            if (activeCellNode === $cell[0] && currentEditor !== null) {
                return;
            }
            trigger(self.onContextMenu, { grid: self }, e);
        }
        function handleDblClick(e) {
            var cell = getCellFromEvent(e);
            if (!cell || (currentEditor !== null && activeRow == cell.row && activeCell == cell.cell)) {
                return;
            }
            trigger(self.onDblClick, { row: cell.row, cell: cell.cell, grid: self }, e);
            if (e.isImmediatePropagationStopped()) {
                return;
            }
            if (options.editable) {
                gotoCell(cell.row, cell.cell, true);
            }
        }
        function handleHeaderMouseEnter(e) {
            trigger(self.onHeaderMouseEnter, {
                "column": $(this).data("column"),
                "grid": self
            }, e);
        }
        function handleHeaderMouseLeave(e) {
            trigger(self.onHeaderMouseLeave, {
                "column": $(this).data("column"),
                "grid": self
            }, e);
        }
        function handleHeaderContextMenu(e) {
            var $header = $(e.target).closest(".slick-header-column", ".slick-header-columns");
            var column = $header && $header.data("column");
            trigger(self.onHeaderContextMenu, { column: column, grid: self }, e);
        }
        function handleHeaderClick(e) {
            var $header = $(e.target).closest(".slick-header-column", ".slick-header-columns");
            var column = $header && $header.data("column");
            if (column) {
                trigger(self.onHeaderClick, { column: column, grid: self }, e);
            }
        }
        function handleMouseEnter(e) {
            trigger(self.onMouseEnter, { grid: self }, e);
        }
        function handleMouseLeave(e) {
            trigger(self.onMouseLeave, { grid: self }, e);
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
            return { row: row, cell: cell - 1 };
        }
        function getCellFromNode(cellNode) {
            // read column number from .l<columnNumber> CSS class
            var cls = /l\d+/.exec(cellNode.className);
            if (!cls) {
                throw new Error("getCellFromNode: cannot get cell - " + cellNode.className);
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
            var $cell = $(e.target).closest(".slick-cell", $canvas);
            if (!$cell.length) {
                return null;
            }
            var row = getRowFromNode($cell[0].parentNode);
            var cell = getCellFromNode($cell[0]);
            if (row == null || cell == null) {
                return null;
            }
            else {
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
            }
            else {
                $focusSink2[0].focus();
            }
        }
        function scrollCellIntoView(row, cell, doPaging) {
            scrollRowIntoView(row, doPaging);
            var colspan = getColspan(row, cell);
            internalScrollColumnIntoView(columnPosLeft[cell], columnPosRight[cell + (colspan > 1 ? colspan - 1 : 0)]);
        }
        function internalScrollColumnIntoView(left, right) {
            var scrollRight = scrollLeft + viewportW;
            if (left < scrollLeft) {
                $viewport.scrollLeft(left);
                handleScroll();
                render();
            }
            else if (right > scrollRight) {
                $viewport.scrollLeft(Math.min(left, right - $viewport[0].clientWidth));
                handleScroll();
                render();
            }
        }
        function scrollColumnIntoView(cell) {
            internalScrollColumnIntoView(columnPosLeft[cell], columnPosRight[cell]);
        }
        function setActiveCellInternal(newCell, opt_editMode, preClickModeOn, suppressActiveCellChangedEvent) {
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
                if (options.showCellSelection) {
                    $(activeCellNode).addClass("active");
                    $(rowsCache[activeRow].rowNode).addClass("active");
                }
                if (options.editable && opt_editMode && isCellPotentiallyEditable(activeRow, activeCell)) {
                    clearTimeout(h_editorLoader);
                    if (options.asyncEditorLoading) {
                        h_editorLoader = setTimeout(function () {
                            makeActiveCellEditable(undefined, preClickModeOn);
                        }, options.asyncEditorLoadDelay);
                    }
                    else {
                        makeActiveCellEditable(undefined, preClickModeOn);
                    }
                }
            }
            else {
                activeRow = activeCell = null;
            }
            // this optimisation causes trouble - MLeibman #329
            //if (activeCellChanged) {
            if (!suppressActiveCellChangedEvent) {
                trigger(self.onActiveCellChanged, getActiveCell());
            }
            //}
        }
        function clearTextSelection() {
            if (document.selection && document.selection.empty) {
                try {
                    //IE fails here if selected element is not in dom
                    document.selection.empty();
                }
                catch (e) { }
            }
            else if (window.getSelection) {
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
            trigger(self.onBeforeCellEditorDestroy, { editor: currentEditor, grid: self });
            currentEditor.destroy();
            currentEditor = null;
            if (activeCellNode) {
                var d = getDataItem(activeRow);
                $(activeCellNode).removeClass("editable invalid");
                if (d) {
                    var column = columns[activeCell];
                    var formatter = getFormatter(activeRow, column);
                    var formatterResult = formatter(activeRow, activeCell, getDataItemValueForColumn(d, column), column, d, self);
                    applyFormatResultToCellNode(formatterResult, activeCellNode);
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
        function makeActiveCellEditable(editor, preClickModeOn) {
            if (!activeCellNode) {
                return;
            }
            if (!options.editable) {
                throw new Error("Grid : makeActiveCellEditable : should never get called when options.editable is false");
            }
            // cancel pending async call if there is one
            clearTimeout(h_editorLoader);
            if (!isCellPotentiallyEditable(activeRow, activeCell)) {
                return;
            }
            var columnDef = columns[activeCell];
            var item = getDataItem(activeRow);
            if (trigger(self.onBeforeEditCell, { row: activeRow, cell: activeCell, item: item, column: columnDef, grid: self }) === false) {
                setFocus();
                return;
            }
            getEditorLock().activate(editController);
            $(activeCellNode).addClass("editable");
            var useEditor = editor || getEditor(activeRow, activeCell);
            // don't clear the cell if a custom editor is passed through
            if (!editor && !useEditor.suppressClearOnEdit) {
                activeCellNode.innerHTML = "";
            }
            currentEditor = new useEditor({
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
                if (preClickModeOn && currentEditor.preClick) {
                    currentEditor.preClick();
                }
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
                visible: true
            };
            box.bottom = box.top + box.height;
            box.right = box.left + box.width;
            // walk up the tree
            var offsetParent = elem.offsetParent;
            while ((elem = elem.parentNode) != document.body) {
                if (elem == null)
                    break;
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
            return absBox($container[0]);
        }
        function handleActiveCellPositionChange() {
            if (!activeCellNode) {
                return;
            }
            trigger(self.onActiveCellPositionChanged, { grid: self });
            if (currentEditor) {
                var cellBox = getActiveCellPosition();
                if (currentEditor.show && currentEditor.hide) {
                    if (!cellBox.visible) {
                        currentEditor.hide();
                    }
                    else {
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
            }
            else {
                return { row: activeRow, cell: activeCell, grid: self };
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
                }
                else {
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
            }
            else {
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
            } while (cell < columns.length && !canCellBeActive(row, cell));
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
            // if at last row, cycle through columns rather than get stuck in the last one
            if (row === dataLengthIncludingAddNew - 1) {
                row--;
            }
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
            }
            else {
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
        function setActiveCell(row, cell, opt_editMode, preClickModeOn, suppressActiveCellChangedEvent) {
            if (!initialized) {
                return;
            }
            if (row > getDataLength() || row < 0 || cell >= columns.length || cell < 0) {
                return;
            }
            if (!options.enableCellNavigation) {
                return;
            }
            scrollCellIntoView(row, cell, false);
            setActiveCellInternal(getCellNode(row, cell), opt_editMode, preClickModeOn, suppressActiveCellChangedEvent);
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
            if (!initialized) {
                return;
            }
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
                                        item: item,
                                        grid: self
                                    });
                                },
                                undo: function () {
                                    this.editor.applyValue(item, this.prevSerializedValue);
                                    updateRow(this.row);
                                    trigger(self.onCellChange, {
                                        row: activeRow,
                                        cell: activeCell,
                                        item: item,
                                        grid: self
                                    });
                                }
                            };
                            if (options.editCommandHandler) {
                                makeActiveCellNormal();
                                options.editCommandHandler(item, column, editCommand);
                            }
                            else {
                                editCommand.execute();
                                makeActiveCellNormal();
                            }
                        }
                        else {
                            var newItem = {};
                            currentEditor.applyValue(newItem, currentEditor.serializeValue());
                            makeActiveCellNormal();
                            trigger(self.onAddNewRow, { item: newItem, column: column, grid: self });
                        }
                        // check whether the lock has been re-acquired by event handlers
                        return !getEditorLock().isActive();
                    }
                    else {
                        // Re-add the CSS class to trigger transitions, if any.
                        $(activeCellNode).removeClass("invalid");
                        $(activeCellNode).width(); // force layout
                        $(activeCellNode).addClass("invalid");
                        trigger(self.onValidationError, {
                            editor: currentEditor,
                            cellNode: activeCellNode,
                            validationResults: validationResults,
                            row: activeRow,
                            cell: activeCell,
                            column: column,
                            grid: self
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
                throw new Error("Selection model is not set");
            }
            return selectedRows;
        }
        function setSelectedRows(rows) {
            if (!selectionModel) {
                throw new Error("Selection model is not set");
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
            "slickGridVersion": "2.3.4",
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
            "onFooterRowCellRendered": new Slick.Event(),
            "onBeforeHeaderRowCellDestroy": new Slick.Event(),
            "onBeforeFooterRowCellDestroy": new Slick.Event(),
            "onMouseEnter": new Slick.Event(),
            "onMouseLeave": new Slick.Event(),
            "onClick": new Slick.Event(),
            "onDblClick": new Slick.Event(),
            "onContextMenu": new Slick.Event(),
            "onKeyDown": new Slick.Event(),
            "onAddNewRow": new Slick.Event(),
            "onBeforeAppendCell": new Slick.Event(),
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
            "updatePagingStatusFromView": updatePagingStatusFromView,
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
            "scrollColumnIntoView": scrollColumnIntoView,
            "getCanvasNode": getCanvasNode,
            "getUID": getUID,
            "getHeaderColumnWidthDiff": getHeaderColumnWidthDiff,
            "getScrollbarDimensions": getScrollbarDimensions,
            "getHeadersWidth": getHeadersWidth,
            "getCanvasWidth": getCanvasWidth,
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
            "getPreHeaderPanel": getPreHeaderPanel,
            "setPreHeaderPanelVisibility": setPreHeaderPanelVisibility,
            "setHeaderRowVisibility": setHeaderRowVisibility,
            "getHeaderRow": getHeaderRow,
            "getHeaderRowColumn": getHeaderRowColumn,
            "setFooterRowVisibility": setFooterRowVisibility,
            "getFooterRow": getFooterRow,
            "getFooterRowColumn": getFooterRowColumn,
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
    module.exports = {
        Grid: SlickGrid
    };
}
,
448: /* slickgrid/slick.jquery */ function _(require, module, exports) {
    module.exports = (typeof $ !== "undefined") ? $ : require(441) /* jquery */;
}
,
449: /* underscore.template/lib/index */ function _(require, module, exports) {
    var _ = require(450) /* ./underscore.template */;
    var UnderscoreTemplate = _.template;
    function Template(text, data, settings) {
        return UnderscoreTemplate(text, data, settings);
    }
    Template._ = _;
    module.exports = Template;
    // If we're in the browser,
    // define it if we're using AMD, otherwise leak a global.
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return Template;
        });
    }
    else if (typeof window !== 'undefined' || typeof navigator !== 'undefined') {
        window.UnderscoreTemplate = Template;
    }
}
,
450: /* underscore.template/lib/underscore.template */ function _(require, module, exports) {
    //     Underscore.js 1.5.2
    //     http://underscorejs.org
    //     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
    //     Underscore may be freely distributed under the MIT license.
    // Establish the object that gets returned to break out of a loop iteration.
    var breaker = {};
    // Save bytes in the minified (but not gzipped) version:
    var ArrayProto = Array.prototype, ObjProto = Object.prototype;
    // Create quick reference variables for speed access to core prototypes.
    var slice = ArrayProto.slice, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
    // All **ECMAScript 5** native function implementations that we hope to use
    // are declared here.
    var nativeForEach = ArrayProto.forEach, nativeKeys = Object.keys, nativeIsArray = Array.isArray;
    // Create a safe reference to the Underscore object for use below.
    var _ = function () { };
    // Collection Functions
    // --------------------
    // The cornerstone, an `each` implementation, aka `forEach`.
    // Handles objects with the built-in `forEach`, arrays, and raw objects.
    // Delegates to **ECMAScript 5**'s native `forEach` if available.
    var each = _.each = _.forEach = function (obj, iterator, context) {
        if (obj == null)
            return;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        }
        else if (obj.length === +obj.length) {
            for (var i = 0, length = obj.length; i < length; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker)
                    return;
            }
        }
        else {
            var keys = _.keys(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
                if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker)
                    return;
            }
        }
    };
    // Object Functions
    // ----------------
    // Retrieve the names of an object's properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`
    _.keys = nativeKeys || function (obj) {
        if (obj !== Object(obj))
            throw new TypeError('Invalid object');
        var keys = [];
        for (var key in obj)
            if (_.has(obj, key))
                keys.push(key);
        return keys;
    };
    // Fill in a given object with default properties.
    _.defaults = function (obj) {
        each(slice.call(arguments, 1), function (source) {
            if (source) {
                for (var prop in source) {
                    if (obj[prop] === void 0)
                        obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };
    // Is a given value an array?
    // Delegates to ECMA5's native Array.isArray
    _.isArray = nativeIsArray || function (obj) {
        return toString.call(obj) === '[object Array]';
    };
    // Shortcut function for checking if an object has a given property directly
    // on itself (in other words, not on a prototype).
    _.has = function (obj, path) {
        if (!_.isArray(path)) {
            return obj != null && hasOwnProperty.call(obj, path);
        }
        var length = path.length;
        for (var i = 0; i < length; i++) {
            var key = path[i];
            if (obj == null || !hasOwnProperty.call(obj, key)) {
                return false;
            }
            obj = obj[key];
        }
        return !!length;
    };
    // List of HTML entities for escaping.
    var entityMap = {
        escape: {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        }
    };
    // Regexes containing the keys and values listed immediately above.
    var entityRegexes = {
        escape: new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g')
    };
    // Functions for escaping and unescaping strings to/from HTML interpolation.
    _.each(['escape'], function (method) {
        _[method] = function (string) {
            if (string == null)
                return '';
            return ('' + string).replace(entityRegexes[method], function (match) {
                return entityMap[method][match];
            });
        };
    });
    // By default, Underscore uses ERB-style template delimiters, change the
    // following template settings to use alternative delimiters.
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    // When customizing `templateSettings`, if you don't want to define an
    // interpolation, evaluation or escaping regex, we need one that is
    // guaranteed not to match.
    var noMatch = /(.)^/;
    // Certain characters need to be escaped so that they can be put into a
    // string literal.
    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\t': 't',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };
    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    _.template = function (text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);
        // Combine delimiters into one regular expression via alternation.
        var matcher = new RegExp([
            (settings.escape || noMatch).source,
            (settings.interpolate || noMatch).source,
            (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');
        // Compile the template source, escaping string literals appropriately.
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset)
                .replace(escaper, function (match) { return '\\' + escapes[match]; });
            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            }
            if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            }
            if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }
            index = offset + match.length;
            return match;
        });
        source += "';\n";
        // If a variable is not specified, place data values in local scope.
        if (!settings.variable)
            source = 'with(obj||{}){\n' + source + '}\n';
        source = "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + "return __p;\n";
        try {
            render = new Function(settings.variable || 'obj', '_', source);
        }
        catch (e) {
            e.source = source;
            throw e;
        }
        if (data)
            return render(data, _);
        var template = function (data) {
            return render.call(this, data, _);
        };
        // Provide the compiled function source as a convenience for precompilation.
        template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';
        return template;
    };
    module.exports = _;
}

}, {"models/widgets/tables/cell_editors":433,"models/widgets/tables/cell_formatters":434,"models/widgets/tables/data_table":435,"models/widgets/tables/index":436,"models/widgets/tables/main":437,"models/widgets/tables/table_column":438,"models/widgets/tables/table_widget":439,"models/widgets/widget":440}, 437, null);
})

//# sourceMappingURL=bokeh-tables.js.map
