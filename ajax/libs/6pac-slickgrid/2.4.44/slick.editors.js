/***
 * Contains basic SlickGrid editors.
 * @module Editors
 * @namespace Slick
 */

(function ($) {
  function TextEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;
    this.args = args;

    this.init = function () {
      var navOnLR = args.grid.getOptions().editorCellNavOnLRKeys;
      $input = $("<INPUT type=text class='editor-text' />")
        .appendTo(args.container)
        .on("keydown.nav", navOnLR ? handleKeydownLRNav : handleKeydownLRNoNav)
        .focus()
        .select();

      // don't show Save/Cancel when it's a Composite Editor and also trigger a onCompositeEditorChange event when input changes
      if (args.compositeEditorOptions) {
        $input.on("change", function () {
          var activeCell = args.grid.getActiveCell();

          // when valid, we'll also apply the new value to the dataContext item object
          if (scope.validate().valid) {
            scope.applyValue(scope.args.item, scope.serializeValue());
          }
          scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
          args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
        });
      }
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.getValue = function () {
      return $input.val();
    };

    this.setValue = function (val) {
      $input.val(val);
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field] || "";
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() === "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (args.column.validator) {
        var validationResults = args.column.validator($input.val(), args);
        if (!validationResults.valid) {
          return validationResults;
        }
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function IntegerEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;
    this.args = args;

    this.init = function () {
      var navOnLR = args.grid.getOptions().editorCellNavOnLRKeys;
      $input = $("<INPUT type=text class='editor-text' />")
        .appendTo(args.container)
        .on("keydown.nav", navOnLR ? handleKeydownLRNav : handleKeydownLRNoNav)
        .focus()
        .select();

      // trigger onCompositeEditorChange event when input changes and it's a Composite Editor
      if (args.compositeEditorOptions) {
        $input.on("change", function () {
          var activeCell = args.grid.getActiveCell();

          // when valid, we'll also apply the new value to the dataContext item object
          if (scope.validate().valid) {
            scope.applyValue(scope.args.item, scope.serializeValue());
          }
          scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
          args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
        });
      }
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return parseInt($input.val(), 10) || 0;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() === "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (isNaN($input.val())) {
        return {
          valid: false,
          msg: "Please enter a valid integer"
        };
      }

      if (args.column.validator) {
        var validationResults = args.column.validator($input.val(), args);
        if (!validationResults.valid) {
          return validationResults;
        }
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function FloatEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;
    this.args = args;

    this.init = function () {
      var navOnLR = args.grid.getOptions().editorCellNavOnLRKeys;
      $input = $("<INPUT type=text class='editor-text' />")
        .appendTo(args.container)
        .on("keydown.nav", navOnLR ? handleKeydownLRNav : handleKeydownLRNoNav)
        .focus()
        .select();

      // trigger onCompositeEditorChange event when input changes and it's a Composite Editor
      if (args.compositeEditorOptions) {
        $input.on("change", function () {
          var activeCell = args.grid.getActiveCell();

          // when valid, we'll also apply the new value to the dataContext item object
          if (scope.validate().valid) {
            scope.applyValue(scope.args.item, scope.serializeValue());
          }
          scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
          args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
        });
      }
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    function getDecimalPlaces() {
      // returns the number of fixed decimal places or null
      var rtn = args.column.editorFixedDecimalPlaces;
      if (typeof rtn == 'undefined') {
        rtn = FloatEditor.DefaultDecimalPlaces;
      }
      return (!rtn && rtn !== 0 ? null : rtn);
    }

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];

      var decPlaces = getDecimalPlaces();
      if (decPlaces !== null
        && (defaultValue || defaultValue === 0)
        && defaultValue.toFixed) {
        defaultValue = defaultValue.toFixed(decPlaces);
      }

      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      var rtn = parseFloat($input.val());
      if (FloatEditor.AllowEmptyValue) {
        if (!rtn && rtn !== 0) { rtn = ''; }
      } else {
        rtn = rtn || 0;
      }

      var decPlaces = getDecimalPlaces();
      if (decPlaces !== null
        && (rtn || rtn === 0)
        && rtn.toFixed) {
        rtn = parseFloat(rtn.toFixed(decPlaces));
      }

      return rtn;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() === "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (isNaN($input.val())) {
        return {
          valid: false,
          msg: "Please enter a valid number"
        };
      }

      if (args.column.validator) {
        var validationResults = args.column.validator($input.val(), args);
        if (!validationResults.valid) {
          return validationResults;
        }
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  FloatEditor.DefaultDecimalPlaces = null;
  FloatEditor.AllowEmptyValue = false;

  function DateEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;
    var calendarOpen = false;
    this.args = args;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />");
      $input.appendTo(args.container);
      $input.focus().select();
      $input.datepicker({
        showOn: "button",
        buttonImageOnly: true,
        beforeShow: function () {
          calendarOpen = true;
        },
        onClose: function () {
          calendarOpen = false;

          // trigger onCompositeEditorChange event when input changes and it's a Composite Editor
          if (args.compositeEditorOptions) {
            var activeCell = args.grid.getActiveCell();

            // when valid, we'll also apply the new value to the dataContext item object
            if (scope.validate().valid) {
              scope.applyValue(scope.args.item, scope.serializeValue());
            }
            scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
            args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
          }
        }
      });

      $input.width($input.width() - (!args.compositeEditorOptions ? 18 : 28));
    };

    this.destroy = function () {
      $.datepicker.dpDiv.stop(true, true);
      $input.datepicker("hide");
      $input.datepicker("destroy");
      $input.remove();
    };

    this.show = function () {
      if (calendarOpen) {
        $.datepicker.dpDiv.stop(true, true).show();
      }
    };

    this.hide = function () {
      if (calendarOpen) {
        $.datepicker.dpDiv.stop(true, true).hide();
      }
    };

    this.position = function (position) {
      if (!calendarOpen) {
        return;
      }
      $.datepicker.dpDiv
        .css("top", position.top + 30)
        .css("left", position.left);
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() === "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (args.column.validator) {
        var validationResults = args.column.validator($input.val(), args);
        if (!validationResults.valid) {
          return validationResults;
        }
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function YesNoSelectEditor(args) {
    var $select;
    var defaultValue;
    var scope = this;
    this.args = args;

    this.init = function () {
      $select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='yes'>Yes</OPTION><OPTION value='no'>No</OPTION></SELECT>");
      $select.appendTo(args.container);
      $select.focus();

      // trigger onCompositeEditorChange event when input changes and it's a Composite Editor
      if (args.compositeEditorOptions) {
        $select.on("change", function () {
          var activeCell = args.grid.getActiveCell();

          // when valid, we'll also apply the new value to the dataContext item object
          if (scope.validate().valid) {
            scope.applyValue(scope.args.item, scope.serializeValue());
          }
          scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
          args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
        });
      }
    };

    this.destroy = function () {
      $select.remove();
    };

    this.focus = function () {
      $select.focus();
    };

    this.loadValue = function (item) {
      $select.val((defaultValue = item[args.column.field]) ? "yes" : "no");
      $select.select();
    };

    this.serializeValue = function () {
      return ($select.val() == "yes");
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return ($select.val() != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function CheckboxEditor(args) {
    var $select;
    var defaultValue;
    var scope = this;
    this.args = args;

    this.init = function () {
      $select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
      $select.appendTo(args.container);
      $select.focus();

      // trigger onCompositeEditorChange event when input checkbox changes and it's a Composite Editor
      if (args.compositeEditorOptions) {
        $select.on("change", function () {
          var activeCell = args.grid.getActiveCell();

          // when valid, we'll also apply the new value to the dataContext item object
          if (scope.validate().valid) {
            scope.applyValue(scope.args.item, scope.serializeValue());
          }
          scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
          args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
        });
      }
    };

    this.destroy = function () {
      $select.remove();
    };

    this.focus = function () {
      $select.focus();
    };

    this.loadValue = function (item) {
      defaultValue = !!item[args.column.field];
      if (defaultValue) {
        $select.prop('checked', true);
      } else {
        $select.prop('checked', false);
      }
    };

    this.preClick = function () {
      $select.prop('checked', !$select.prop('checked'));
    };

    this.serializeValue = function () {
      return $select.prop('checked');
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (this.serializeValue() !== defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function PercentCompleteEditor(args) {
    var $input, $picker;
    var defaultValue;
    var scope = this;
    this.args = args;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-percentcomplete' />");
      $input.width($(args.container).innerWidth() - 25);
      $input.appendTo(args.container);

      $picker = $("<div class='editor-percentcomplete-picker' />").appendTo(args.container);
      $picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");

      $picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");

      $input.focus().select();

      $picker.find(".editor-percentcomplete-slider").slider({
        orientation: "vertical",
        range: "min",
        value: defaultValue,
        slide: function (event, ui) {
          $input.val(ui.value);
        },
        stop: function (event, ui) {
          // trigger onCompositeEditorChange event when slider stops and it's a Composite Editor
          if (args.compositeEditorOptions) {
            var activeCell = args.grid.getActiveCell();

            // when valid, we'll also apply the new value to the dataContext item object
            if (scope.validate().valid) {
              scope.applyValue(scope.args.item, scope.serializeValue());
            }
            scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
            args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
          }
        }
      });

      $picker.find(".editor-percentcomplete-buttons button").on("click", function (e) {
        $input.val($(this).attr("val"));
        $picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
      });
    };

    this.destroy = function () {
      $input.remove();
      $picker.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      $input.val(defaultValue = item[args.column.field]);
      $input.select();
    };

    this.serializeValue = function () {
      return parseInt($input.val(), 10) || 0;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() === "" && defaultValue == null)) && ((parseInt($input.val(), 10) || 0) != defaultValue);
    };

    this.validate = function () {
      if (isNaN(parseInt($input.val(), 10))) {
        return {
          valid: false,
          msg: "Please enter a valid positive number"
        };
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  /*
   * An example of a "detached" editor.
   * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
   * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
   */
  function LongTextEditor(args) {
    var $input, $wrapper;
    var defaultValue;
    var scope = this;
    this.args = args;

    this.init = function () {
      var compositeEditorOptions = args.compositeEditorOptions;
      var navOnLR = args.grid.getOptions().editorCellNavOnLRKeys;
      var $container = compositeEditorOptions ? args.container : $('body');

      $wrapper = $("<DIV class='slick-large-editor-text' style='z-index:10000;background:white;padding:5px;border:3px solid gray; border-radius:10px;'/>")
        .appendTo($container);
      if (compositeEditorOptions) {
        $wrapper.css({ position: 'relative', padding: 0, border: 0 });
      } else {
        $wrapper.css({ position: 'absolute' });
      }

      $input = $("<TEXTAREA hidefocus rows=5 style='background:white;width:250px;height:80px;border:0;outline:0'>")
        .appendTo($wrapper);

      // trigger onCompositeEditorChange event when input changes and it's a Composite Editor
      if (compositeEditorOptions) {
        $input.on("change", function () {
          var activeCell = args.grid.getActiveCell();

          // when valid, we'll also apply the new value to the dataContext item object
          if (scope.validate().valid) {
            scope.applyValue(scope.args.item, scope.serializeValue());
          }
          scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
          args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
        });
      } else {
        $("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>")
          .appendTo($wrapper);

        $wrapper.find("button:first").on("click", this.save);
        $wrapper.find("button:last").on("click", this.cancel);
        $input.on("keydown", this.handleKeyDown);
        scope.position(args.position);
      }

      $input.focus().select();
    };

    this.handleKeyDown = function (e) {
      if (e.which == Slick.keyCode.ENTER && e.ctrlKey) {
        scope.save();
      } else if (e.which == Slick.keyCode.ESCAPE) {
        e.preventDefault();
        scope.cancel();
      } else if (e.which == Slick.keyCode.TAB && e.shiftKey) {
        e.preventDefault();
        args.grid.navigatePrev();
      } else if (e.which == Slick.keyCode.TAB) {
        e.preventDefault();
        args.grid.navigateNext();
      } else if (e.which == Slick.keyCode.LEFT || e.which == Slick.keyCode.RIGHT) {
        if (args.grid.getOptions().editorCellNavOnLRKeys) {
          var cursorPosition = this.selectionStart;
          var textLength = this.value.length;
          if (e.keyCode === Slick.keyCode.LEFT && cursorPosition === 0) {
            args.grid.navigatePrev();
          }
          if (e.keyCode === Slick.keyCode.RIGHT && cursorPosition >= textLength - 1) {
            args.grid.navigateNext();
          }
        }
      }
    };

    this.save = function () {
      args.commitChanges();
    };

    this.cancel = function () {
      $input.val(defaultValue);
      args.cancelChanges();
    };

    this.hide = function () {
      $wrapper.hide();
    };

    this.show = function () {
      $wrapper.show();
    };

    this.position = function (position) {
      $wrapper
        .css("top", position.top - 5)
        .css("left", position.left - 5);
    };

    this.destroy = function () {
      $wrapper.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      $input.val(defaultValue = item[args.column.field]);
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() === "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (args.column.validator) {
        var validationResults = args.column.validator($input.val(), args);
        if (!validationResults.valid) {
          return validationResults;
        }
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  /*
   * Depending on the value of Grid option 'editorCellNavOnLRKeys', us
   * Navigate to the cell on the left if the cursor is at the beginning of the input string
   * and to the right cell if it's at the end. Otherwise, move the cursor within the text
   */
  function handleKeydownLRNav(e) {
    var cursorPosition = this.selectionStart;
    var textLength = this.value.length;
    if ((e.keyCode === Slick.keyCode.LEFT && cursorPosition > 0) ||
      e.keyCode === Slick.keyCode.RIGHT && cursorPosition < textLength - 1) {
      e.stopImmediatePropagation();
    }
  }

  function handleKeydownLRNoNav(e) {
    if (e.keyCode === Slick.keyCode.LEFT || e.keyCode === Slick.keyCode.RIGHT) {
      e.stopImmediatePropagation();
    }
  }

  // exports
  $.extend(true, window, {
    "Slick": {
      "Editors": {
        "Text": TextEditor,
        "Integer": IntegerEditor,
        "Float": FloatEditor,
        "Date": DateEditor,
        "YesNoSelect": YesNoSelectEditor,
        "Checkbox": CheckboxEditor,
        "PercentComplete": PercentCompleteEditor,
        "LongText": LongTextEditor
      }
    }
  });
})(jQuery);
