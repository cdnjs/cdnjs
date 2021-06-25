(function ($) {
  /***
   * A composite SlickGrid editor factory.
   * Generates an editor that is composed of multiple editors for given columns.
   * Individual editors are provided given containers instead of the original cell.
   * Validation will be performed on all editors individually and the results will be aggregated into one
   * validation result.
   *
   *
   * The returned editor will have its prototype set to CompositeEditor, so you can use the "instanceof" check.
   *
   * NOTE:  This doesn't work for detached editors since they will be created and positioned relative to the
   *        active cell and not the provided container.
   *
   * @namespace Slick
   * @class CompositeEditor
   * @constructor
   * @param columns {Array} Column definitions from which editors will be pulled.
   * @param containers {Array} Container HTMLElements in which editors will be placed.
   * @param options {Object} Options hash:
   *  validationFailedMsg     -   A generic failed validation message set on the aggregated validation resuls.
   *  validationMsgPrefix     -   Add an optional prefix to each validation message (only the ones shown in the modal form, not the ones in the "errors")
   *  modalType               -   Defaults to "edit", modal type can 1 of these 3: (create, edit, mass, mass-selection)
   *  hide                    -   A function to be called when the grid asks the editor to hide itself.
   *  show                    -   A function to be called when the grid asks the editor to show itself.
   *  position                -   A function to be called when the grid asks the editor to reposition itself.
   *  destroy                 -   A function to be called when the editor is destroyed.
   */
  function CompositeEditor(columns, containers, options) {
    var defaultOptions = {
      modalType: 'edit', // available type (create, edit, mass)
      validationFailedMsg: "Some of the fields have failed validation",
      validationMsgPrefix: null,
      show: null,
      hide: null,
      position: null,
      destroy: null,
      formValues: {},
      editors: {}
    };

    var noop = function () {
    };

    var firstInvalidEditor;

    options = $.extend({}, defaultOptions, options);


    function getContainerBox(i) {
      var c = containers[i];
      var offset = $(c).offset();
      var w = $(c).width() || 0;
      var h = $(c).height() || 0;

      return {
        top: offset && offset.top,
        left: offset && offset.left,
        bottom: offset && offset.top + h,
        right: offset && offset.left + w,
        width: w,
        height: h,
        visible: true
      };
    }


    function editor(args) {
      var editors = [];


      function init() {
        var newArgs = {};
        var idx = 0;
        while (idx < columns.length) {
          if (columns[idx].editor) {
            var column = columns[idx];
            newArgs = $.extend({}, args);
            newArgs.container = containers[idx];
            newArgs.column = column;
            newArgs.position = getContainerBox(idx);
            newArgs.commitChanges = noop;
            newArgs.cancelChanges = noop;
            newArgs.compositeEditorOptions = options;
            newArgs.formValues = {};

            var currentEditor = new (column.editor)(newArgs);
            options.editors[column.id] = currentEditor; // add every Editor instance refs
            editors.push(currentEditor);
          }
          idx++;
        }

        // focus on first input
        setTimeout(function () {
          if (Array.isArray(editors) && editors.length > 0 && editors[0].focus) {
            editors[0].focus();
          }
        }, 0);
      }


      this.destroy = function () {
        var idx = 0;
        while (idx < editors.length) {
          editors[idx].destroy();
          idx++;
        }

        options.destroy && options.destroy();
		    editors = [];
      };


      this.focus = function () {
        // if validation has failed, set the focus to the first invalid editor
        (firstInvalidEditor || editors[0]).focus();
      };


      this.isValueChanged = function () {
        var idx = 0;
        while (idx < editors.length) {
          if (editors[idx].isValueChanged()) {
            return true;
          }
          idx++;
        }
        return false;
      };


      this.serializeValue = function () {
        var serializedValue = [];
        var idx = 0;
        while (idx < editors.length) {
          serializedValue[idx] = editors[idx].serializeValue();
          idx++;
        }
        return serializedValue;
      };


      this.applyValue = function (item, state) {
        var idx = 0;
        while (idx < editors.length) {
          editors[idx].applyValue(item, state[idx]);
          idx++;
        }
      };

      this.loadValue = function (item) {
        var idx = 0;

        while (idx < editors.length) {
          editors[idx].loadValue(item);
          idx++;
        }
      };


      this.validate = function (targetElm) {
        var validationResults;
        var errors = [];
        var $targetElm = targetElm ? $(targetElm) : null;

        firstInvalidEditor = null;

        var idx = 0;
        while (idx < editors.length) {
          var columnDef = editors[idx].args && editors[idx].args.column || {};
          if (columnDef) {
            var $validationElm = $(".item-details-validation.editor-" + columnDef.id);
            var $labelElm = $(".item-details-label.editor-" + columnDef.id);
            var $editorElm = $("[data-editorid=" + columnDef.id + "]");
            var validationMsgPrefix = options && options.validationMsgPrefix || "";

            if (!$targetElm || ($editorElm.has($targetElm).length > 0)) {
              validationResults = editors[idx].validate();

              if (!validationResults.valid) {
                firstInvalidEditor = editors[idx];
                errors.push({
                  index: idx,
                  editor: editors[idx],
                  container: containers[idx],
                  msg: validationResults.msg
                });

                if ($validationElm) {
                  $validationElm.text(validationMsgPrefix + validationResults.msg);
                  $labelElm.addClass("invalid");
                  $editorElm.addClass("invalid");
                }
              } else if ($validationElm) {
                $validationElm.text("");
                $editorElm.removeClass("invalid");
                $labelElm.removeClass("invalid");
              }
            }
            $validationElm = null;
            $labelElm = null;
            $editorElm = null;
          }
          idx++;
        }
		    $targetElm = null;

        if (errors.length) {
          return {
            valid: false,
            msg: options.validationFailedMsg,
            errors: errors
          };
        } else {
          return {
            valid: true,
            msg: ""
          };
        }
      };


      this.hide = function () {
        var idx = 0;
        while (idx < editors.length) {
          editors[idx].hide && editors[idx].hide();
          idx++;
        }
        options.hide && options.hide();
      };


      this.show = function () {
        var idx = 0;
        while (idx < editors.length) {
          editors[idx].show && editors[idx].show();
          idx++;
        }
        options.show && options.show();
      };


      this.position = function (box) {
        options.position && options.position(box);
      };


      init();
    }

    // so we can do "editor instanceof Slick.CompositeEditor
    editor.prototype = this;
    return editor;
  }
  
  // exports
  $.extend(true, window, {
    Slick: {
      CompositeEditor: CompositeEditor
    }
  });  
})(jQuery);