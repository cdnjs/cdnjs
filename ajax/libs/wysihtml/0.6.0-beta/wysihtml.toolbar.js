/**
 * Toolbar Dialog
 *
 * @param {Element} link The toolbar link which causes the dialog to show up
 * @param {Element} container The dialog container
 *
 * @example
 *    <!-- Toolbar link -->
 *    <a data-wysihtml-command="insertImage">insert an image</a>
 *
 *    <!-- Dialog -->
 *    <div data-wysihtml-dialog="insertImage" style="display: none;">
 *      <label>
 *        URL: <input data-wysihtml-dialog-field="src" value="http://">
 *      </label>
 *      <label>
 *        Alternative text: <input data-wysihtml-dialog-field="alt" value="">
 *      </label>
 *    </div>
 *
 *    <script>
 *      var dialog = new wysihtml.toolbar.Dialog(
 *        document.querySelector("[data-wysihtml-command='insertImage']"),
 *        document.querySelector("[data-wysihtml-dialog='insertImage']")
 *      );
 *      dialog.observe("save", function(attributes) {
 *        // do something
 *      });
 *    </script>
 */
(function(wysihtml) {
  var dom                     = wysihtml.dom,
      CLASS_NAME_OPENED       = "wysihtml-command-dialog-opened",
      SELECTOR_FORM_ELEMENTS  = "input, select, textarea",
      SELECTOR_FIELDS         = "[data-wysihtml-dialog-field]",
      ATTRIBUTE_FIELDS        = "data-wysihtml-dialog-field";


  wysihtml.toolbar.Dialog = wysihtml.lang.Dispatcher.extend(
    /** @scope wysihtml.toolbar.Dialog.prototype */ {
    constructor: function(link, container) {
      this.link       = link;
      this.container  = container;
    },

    _observe: function() {
      if (this._observed) {
        return;
      }

      var that = this,
          callbackWrapper = function(event) {
            var attributes = that._serialize();
            that.fire("save", attributes);
            that.hide();
            event.preventDefault();
            event.stopPropagation();
          };

      dom.observe(that.link, "click", function() {
        if (dom.hasClass(that.link, CLASS_NAME_OPENED)) {
          setTimeout(function() { that.hide(); }, 0);
        }
      });

      dom.observe(this.container, "keydown", function(event) {
        var keyCode = event.keyCode;
        if (keyCode === wysihtml.ENTER_KEY) {
          callbackWrapper(event);
        }
        if (keyCode === wysihtml.ESCAPE_KEY) {
          that.cancel();
        }
      });

      dom.delegate(this.container, "[data-wysihtml-dialog-action=save]", "click", callbackWrapper);

      dom.delegate(this.container, "[data-wysihtml-dialog-action=cancel]", "click", function(event) {
        that.cancel();
        event.preventDefault();
        event.stopPropagation();
      });

      this._observed = true;
    },

    /**
     * Grabs all fields in the dialog and puts them in key=>value style in an object which
     * then gets returned
     */
    _serialize: function() {
      var data    = {},
          fields  = this.container.querySelectorAll(SELECTOR_FIELDS),
          length  = fields.length,
          i       = 0;

      for (; i<length; i++) {
        data[fields[i].getAttribute(ATTRIBUTE_FIELDS)] = fields[i].value;
      }
      return data;
    },

    /**
     * Takes the attributes of the "elementToChange"
     * and inserts them in their corresponding dialog input fields
     *
     * Assume the "elementToChange" looks like this:
     *    <a href="http://www.google.com" target="_blank">foo</a>
     *
     * and we have the following dialog:
     *    <input type="text" data-wysihtml-dialog-field="href" value="">
     *    <input type="text" data-wysihtml-dialog-field="target" value="">
     *
     * after calling _interpolate() the dialog will look like this
     *    <input type="text" data-wysihtml-dialog-field="href" value="http://www.google.com">
     *    <input type="text" data-wysihtml-dialog-field="target" value="_blank">
     *
     * Basically it adopted the attribute values into the corresponding input fields
     *
     */
    _interpolate: function(avoidHiddenFields) {
      var field,
          fieldName,
          newValue,
          focusedElement = document.querySelector(":focus"),
          fields         = this.container.querySelectorAll(SELECTOR_FIELDS),
          length         = fields.length,
          i              = 0;
      for (; i<length; i++) {
        field = fields[i];

        // Never change elements where the user is currently typing in
        if (field === focusedElement) {
          continue;
        }

        // Don't update hidden fields
        // See https://github.com/xing/wysihtml5/pull/14
        if (avoidHiddenFields && field.type === "hidden") {
          continue;
        }

        fieldName = field.getAttribute(ATTRIBUTE_FIELDS);
        newValue  = (this.elementToChange && typeof(this.elementToChange) !== 'boolean') ? (this.elementToChange.getAttribute(fieldName) || "") : field.defaultValue;
        field.value = newValue;
      }
    },

    update: function (elementToChange) {
      this.elementToChange = elementToChange ? elementToChange : this.elementToChange;
      this._interpolate();
    },

    /**
     * Show the dialog element
     */
    show: function(elementToChange) {
      var firstField  = this.container.querySelector(SELECTOR_FORM_ELEMENTS);

      this._observe();
      this.update(elementToChange);

      dom.addClass(this.link, CLASS_NAME_OPENED);
      this.container.style.display = "";
      this.isOpen = true;
      this.fire("show");

      if (firstField && !elementToChange) {
        try {
          firstField.focus();
        } catch(e) {}
      }
    },

    /**
     * Hide the dialog element
     */
    _hide: function(focus) {
      this.elementToChange = null;
      dom.removeClass(this.link, CLASS_NAME_OPENED);
      this.container.style.display = "none";
      this.isOpen = false;
    },

    hide: function() {
      this._hide();
      this.fire("hide");
    },

    cancel: function() {
      this._hide();
      this.fire("cancel");
    }
  });
})(wysihtml); //jshint ignore:line

(function(wysihtml) {
  var dom                     = wysihtml.dom,
      SELECTOR_FIELDS         = "[data-wysihtml-dialog-field]",
      ATTRIBUTE_FIELDS        = "data-wysihtml-dialog-field";

  wysihtml.toolbar.Dialog_bgColorStyle = wysihtml.toolbar.Dialog.extend({
    multiselect: true,

    _serialize: function() {
      var data    = {},
          fields  = this.container.querySelectorAll(SELECTOR_FIELDS),
          length  = fields.length,
          i       = 0;

      for (; i<length; i++) {
        data[fields[i].getAttribute(ATTRIBUTE_FIELDS)] = fields[i].value;
      }
      return data;
    },

    _interpolate: function(avoidHiddenFields) {
      var field,
          fieldName,
          newValue,
          focusedElement = document.querySelector(":focus"),
          fields         = this.container.querySelectorAll(SELECTOR_FIELDS),
          length         = fields.length,
          i              = 0,
          firstElement   = (this.elementToChange) ? ((wysihtml.lang.object(this.elementToChange).isArray()) ? this.elementToChange[0] : this.elementToChange) : null,
          colorStr       = (firstElement) ? firstElement.getAttribute('style') : null,
          color          = (colorStr) ? wysihtml.quirks.styleParser.parseColor(colorStr, "background-color") : null;

      for (; i<length; i++) {
        field = fields[i];
        // Never change elements where the user is currently typing in
        if (field === focusedElement) {
          continue;
        }
        // Don't update hidden fields3
        if (avoidHiddenFields && field.type === "hidden") {
          continue;
        }
        if (field.getAttribute(ATTRIBUTE_FIELDS) === "color") {
          if (color) {
            if (color[3] && color[3] != 1) {
              field.value = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ");";
            } else {
              field.value = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ");";
            }
          } else {
            field.value = "rgb(0,0,0);";
          }
        }
      }
    }

  });
})(wysihtml);

(function(wysihtml) {
  wysihtml.toolbar.Dialog_createTable = wysihtml.toolbar.Dialog.extend({
    show: function(elementToChange) {
      this.base(elementToChange);
    }
  });
})(wysihtml);

(function(wysihtml) {
  var dom                     = wysihtml.dom,
      SELECTOR_FIELDS         = "[data-wysihtml-dialog-field]",
      ATTRIBUTE_FIELDS        = "data-wysihtml-dialog-field";

  wysihtml.toolbar.Dialog_fontSizeStyle = wysihtml.toolbar.Dialog.extend({
    multiselect: true,

    _serialize: function() {
      return {"size" : this.container.querySelector('[data-wysihtml-dialog-field="size"]').value};
    },

    _interpolate: function(avoidHiddenFields) {
      var focusedElement = document.querySelector(":focus"),
          field          = this.container.querySelector("[data-wysihtml-dialog-field='size']"),
          firstElement   = (this.elementToChange) ? ((wysihtml.lang.object(this.elementToChange).isArray()) ? this.elementToChange[0] : this.elementToChange) : null,
          styleStr       = (firstElement) ? firstElement.getAttribute('style') : null,
          size           = (styleStr) ? wysihtml.quirks.styleParser.parseFontSize(styleStr) : null;

      if (field && field !== focusedElement && size && !(/^\s*$/).test(size)) {
        field.value = size;
      }
    }
  });
})(wysihtml);

(function(wysihtml) {
  var SELECTOR_FIELDS         = "[data-wysihtml-dialog-field]",
      ATTRIBUTE_FIELDS        = "data-wysihtml-dialog-field";

  wysihtml.toolbar.Dialog_foreColorStyle = wysihtml.toolbar.Dialog.extend({
    multiselect: true,

    _serialize: function() {
      var data    = {},
          fields  = this.container.querySelectorAll(SELECTOR_FIELDS),
          length  = fields.length,
          i       = 0;

      for (; i<length; i++) {
        data[fields[i].getAttribute(ATTRIBUTE_FIELDS)] = fields[i].value;
      }
      return data;
    },

    _interpolate: function(avoidHiddenFields) {
      var field, colourMode,
          styleParser = wysihtml.quirks.styleParser,
          focusedElement = document.querySelector(":focus"),
          fields         = this.container.querySelectorAll(SELECTOR_FIELDS),
          length         = fields.length,
          i              = 0,
          firstElement   = (this.elementToChange) ? ((wysihtml.lang.object(this.elementToChange).isArray()) ? this.elementToChange[0] : this.elementToChange) : null,
          colourStr       = (firstElement) ? firstElement.getAttribute("style") : null,
          colour          = (colourStr) ? styleParser.parseColor(colourStr, "color") : null;

      for (; i<length; i++) {
        field = fields[i];
        // Never change elements where the user is currently typing in
        if (field === focusedElement) {
          continue;
        }
        // Don't update hidden fields3
        if (avoidHiddenFields && field.type === "hidden") {
          continue;
        }
        if (field.getAttribute(ATTRIBUTE_FIELDS) === "color") {
          colourMode = (field.dataset.colormode || "rgb").toLowerCase();
          colourMode = colourMode === "hex" ? "hash" : colourMode;

          if (colour) {
            field.value = styleParser.unparseColor(colour, colourMode);
          } else {
            field.value = styleParser.unparseColor([0, 0, 0], colourMode);
          }
        }
      }
    }

  });
})(wysihtml);

/**
 * Converts speech-to-text and inserts this into the editor
 * As of now (2011/03/25) this only is supported in Chrome >= 11
 *
 * Note that it sends the recorded audio to the google speech recognition api:
 * http://stackoverflow.com/questions/4361826/does-chrome-have-buil-in-speech-recognition-for-input-type-text-x-webkit-speec
 *
 * Current HTML5 draft can be found here
 * http://lists.w3.org/Archives/Public/public-xg-htmlspeech/2011Feb/att-0020/api-draft.html
 *
 * "Accessing Google Speech API Chrome 11"
 * http://mikepultz.com/2011/03/accessing-google-speech-api-chrome-11/
 */
(function(wysihtml) {
  var dom = wysihtml.dom;

  var linkStyles = {
    position: "relative"
  };

  var wrapperStyles = {
    left:     0,
    margin:   0,
    opacity:  0,
    overflow: "hidden",
    padding:  0,
    position: "absolute",
    top:      0,
    zIndex:   1
  };

  var inputStyles = {
    cursor:     "inherit",
    fontSize:   "50px",
    height:     "50px",
    marginTop:  "-25px",
    outline:    0,
    padding:    0,
    position:   "absolute",
    right:      "-4px",
    top:        "50%"
  };

  var inputAttributes = {
    "x-webkit-speech": "",
    "speech":          ""
  };

  wysihtml.toolbar.Speech = function(parent, link) {
    var input = document.createElement("input");
    if (!wysihtml.browser.supportsSpeechApiOn(input)) {
      link.style.display = "none";
      return;
    }
    var lang = parent.editor.textarea.element.getAttribute("lang");
    if (lang) {
      inputAttributes.lang = lang;
    }

    var wrapper = document.createElement("div");

    wysihtml.lang.object(wrapperStyles).merge({
      width:  link.offsetWidth  + "px",
      height: link.offsetHeight + "px"
    });

    dom.insert(input).into(wrapper);
    dom.insert(wrapper).into(link);

    dom.setStyles(inputStyles).on(input);
    dom.setAttributes(inputAttributes).on(input);

    dom.setStyles(wrapperStyles).on(wrapper);
    dom.setStyles(linkStyles).on(link);

    var eventName = "onwebkitspeechchange" in input ? "webkitspeechchange" : "speechchange";
    dom.observe(input, eventName, function() {
      parent.execCommand("insertText", input.value);
      input.value = "";
    });

    dom.observe(input, "click", function(event) {
      if (dom.hasClass(link, "wysihtml-command-disabled")) {
        event.preventDefault();
      }

      event.stopPropagation();
    });
  };
})(wysihtml);

/**
 * Toolbar
 *
 * @param {Object} parent Reference to instance of Editor instance
 * @param {Element} container Reference to the toolbar container element
 *
 * @example
 *    <div id="toolbar">
 *      <a data-wysihtml-command="createLink">insert link</a>
 *      <a data-wysihtml-command="formatBlock" data-wysihtml-command-value="h1">insert h1</a>
 *    </div>
 *
 *    <script>
 *      var toolbar = new wysihtml.toolbar.Toolbar(editor, document.getElementById("toolbar"));
 *    </script>
 */
(function(wysihtml) {
  var CLASS_NAME_COMMAND_DISABLED   = "wysihtml-command-disabled",
      CLASS_NAME_COMMANDS_DISABLED  = "wysihtml-commands-disabled",
      CLASS_NAME_COMMAND_ACTIVE     = "wysihtml-command-active",
      CLASS_NAME_ACTION_ACTIVE      = "wysihtml-action-active",
      dom                           = wysihtml.dom;

  wysihtml.toolbar.Toolbar = Base.extend(
    /** @scope wysihtml.toolbar.Toolbar.prototype */ {
    constructor: function(editor, container, showOnInit) {
      this.editor     = editor;
      this.container  = typeof(container) === "string" ? document.getElementById(container) : container;
      this.composer   = editor.composer;

      this._getLinks("command");
      this._getLinks("action");

      this._observe();
      if (showOnInit) { this.show(); }

      if (editor.config.classNameCommandDisabled != null) {
        CLASS_NAME_COMMAND_DISABLED = editor.config.classNameCommandDisabled;
      }
      if (editor.config.classNameCommandsDisabled != null) {
        CLASS_NAME_COMMANDS_DISABLED = editor.config.classNameCommandsDisabled;
      }
      if (editor.config.classNameCommandActive != null) {
        CLASS_NAME_COMMAND_ACTIVE = editor.config.classNameCommandActive;
      }
      if (editor.config.classNameActionActive != null) {
        CLASS_NAME_ACTION_ACTIVE = editor.config.classNameActionActive;
      }

      var speechInputLinks  = this.container.querySelectorAll("[data-wysihtml-command=insertSpeech]"),
          length            = speechInputLinks.length,
          i                 = 0;
      for (; i<length; i++) {
        new wysihtml.toolbar.Speech(this, speechInputLinks[i]);
      }
    },

    _getLinks: function(type) {
      var links   = this[type + "Links"] = wysihtml.lang.array(this.container.querySelectorAll("[data-wysihtml-" + type + "]")).get(),
          length  = links.length,
          i       = 0,
          mapping = this[type + "Mapping"] = {},
          link,
          group,
          name,
          value,
          dialog,
          tracksBlankValue;

      for (; i<length; i++) {
        link    = links[i];
        name    = link.getAttribute("data-wysihtml-" + type);
        value   = link.getAttribute("data-wysihtml-" + type + "-value");
        tracksBlankValue   = link.getAttribute("data-wysihtml-" + type + "-blank-value");
        group   = this.container.querySelector("[data-wysihtml-" + type + "-group='" + name + "']");
        dialog  = this._getDialog(link, name);

        mapping[name + ":" + value] = {
          link:   link,
          group:  group,
          name:   name,
          value:  value,
          tracksBlankValue: tracksBlankValue,
          dialog: dialog,
          state:  false
        };
      }
    },

    _getDialog: function(link, command) {
      var that          = this,
          dialogElement = this.container.querySelector("[data-wysihtml-dialog='" + command + "']"),
          dialog, caretBookmark;

      if (dialogElement) {
        if (wysihtml.toolbar["Dialog_" + command]) {
            dialog = new wysihtml.toolbar["Dialog_" + command](link, dialogElement);
        } else {
            dialog = new wysihtml.toolbar.Dialog(link, dialogElement);
        }

        dialog.on("show", function() {
          caretBookmark = that.composer.selection.getBookmark();
          that.editor.fire("show:dialog", { command: command, dialogContainer: dialogElement, commandLink: link });
        });

        dialog.on("save", function(attributes) {
          if (caretBookmark) {
            that.composer.selection.setBookmark(caretBookmark);
          }
          that._execCommand(command, attributes);
          that.editor.fire("save:dialog", { command: command, dialogContainer: dialogElement, commandLink: link });
          that._hideAllDialogs();
          that._preventInstantFocus();
          caretBookmark = undefined;

        });

        dialog.on("cancel", function() {
          if (caretBookmark) {
            that.composer.selection.setBookmark(caretBookmark);
          }
          that.editor.fire("cancel:dialog", { command: command, dialogContainer: dialogElement, commandLink: link });
          caretBookmark = undefined;
          that._preventInstantFocus();
        });

        dialog.on("hide", function() {
          that.editor.fire("hide:dialog", { command: command, dialogContainer: dialogElement, commandLink: link });
          caretBookmark = undefined;
        });

      }
      return dialog;
    },

    /**
     * @example
     *    var toolbar = new wysihtml.Toolbar();
     *    // Insert a <blockquote> element or wrap current selection in <blockquote>
     *    toolbar.execCommand("formatBlock", "blockquote");
     */
    execCommand: function(command, commandValue) {
      if (this.commandsDisabled) {
        return;
      }

      this._execCommand(command, commandValue);
    },

    _execCommand: function(command, commandValue) {
      // Make sure that composer is focussed (false => don't move caret to the end)
      this.editor.focus(false);

      this.composer.commands.exec(command, commandValue);
      this._updateLinkStates();
    },

    execAction: function(action) {
      var editor = this.editor;
      if (action === "change_view") {
        if (editor.currentView === editor.textarea || editor.currentView === "source") {
          editor.fire("change_view", "composer");
        } else {
          editor.fire("change_view", "textarea");
        }
      }
      if (action == "showSource") {
          editor.fire("showSource");
      }
    },

    _observe: function() {
      var that      = this,
          editor    = this.editor,
          container = this.container,
          links     = this.commandLinks.concat(this.actionLinks),
          length    = links.length,
          i         = 0;

      for (; i<length; i++) {
        // 'javascript:;' and unselectable=on Needed for IE, but done in all browsers to make sure that all get the same css applied
        // (you know, a:link { ... } doesn't match anchors with missing href attribute)
        if (links[i].nodeName === "A") {
          dom.setAttributes({
            href:         "javascript:;",
            unselectable: "on"
          }).on(links[i]);
        } else {
          dom.setAttributes({ unselectable: "on" }).on(links[i]);
        }
      }

      // Needed for opera and chrome
      dom.delegate(container, "[data-wysihtml-command], [data-wysihtml-action]", "mousedown", function(event) { event.preventDefault(); });

      dom.delegate(container, "[data-wysihtml-command]", "click", function(event) {
        var state,
            link          = this,
            command       = link.getAttribute("data-wysihtml-command"),
            commandValue  = link.getAttribute("data-wysihtml-command-value"),
            commandObj = that.commandMapping[command + ":" + commandValue];

        if (commandValue || !commandObj.dialog) {
          that.execCommand(command, commandValue);
        } else {
          state = getCommandState(that.composer, commandObj);
          commandObj.dialog.show(state);
        }

        event.preventDefault();
      });

      dom.delegate(container, "[data-wysihtml-action]", "click", function(event) {
        var action = this.getAttribute("data-wysihtml-action");
        that.execAction(action);
        event.preventDefault();
      });

      editor.on("interaction:composer", function(event) {
        if (!that.preventFocus) {
          that._updateLinkStates();
        }
      });

      this._ownerDocumentClick = function(event) {
        if (!wysihtml.dom.contains(that.container, event.target) && !wysihtml.dom.contains(that.composer.element, event.target)) {
          that._updateLinkStates();
          that._preventInstantFocus();
        }
      };

      this.container.ownerDocument.addEventListener("click", this._ownerDocumentClick, false);
      this.editor.on("destroy:composer", this.destroy.bind(this));

      if (this.editor.config.handleTables) {
        editor.on("tableselect:composer", function() {
            that.container.querySelectorAll('[data-wysihtml-hiddentools="table"]')[0].style.display = "";
        });
        editor.on("tableunselect:composer", function() {
            that.container.querySelectorAll('[data-wysihtml-hiddentools="table"]')[0].style.display = "none";
        });
      }

      editor.on("change_view", function(currentView) {
        // Set timeout needed in order to let the blur event fire first
          setTimeout(function() {
            that.commandsDisabled = (currentView !== "composer");
            that._updateLinkStates();
            if (that.commandsDisabled) {
              dom.addClass(container, CLASS_NAME_COMMANDS_DISABLED);
            } else {
              dom.removeClass(container, CLASS_NAME_COMMANDS_DISABLED);
            }
          }, 0);
      });
    },

    destroy: function() {
      this.container.ownerDocument.removeEventListener("click", this._ownerDocumentClick, false);
    },

    _hideAllDialogs: function() {
      var commandMapping      = this.commandMapping;
      for (var i in commandMapping) {
        if (commandMapping[i].dialog) {
          commandMapping[i].dialog.hide();
        }
      }
    },

    _preventInstantFocus: function() {
      this.preventFocus = true;
      setTimeout(function() {
        this.preventFocus = false;
      }.bind(this),0);
    },

    _updateLinkStates: function() {

      var i, state, action, command, displayDialogAttributeValue,
          commandMapping      = this.commandMapping,
          composer            = this.composer,
          actionMapping       = this.actionMapping;
      // every millisecond counts... this is executed quite often
      for (i in commandMapping) {
        command = commandMapping[i];
        if (this.commandsDisabled) {
          state = false;
          dom.removeClass(command.link, CLASS_NAME_COMMAND_ACTIVE);
          if (command.group) {
            dom.removeClass(command.group, CLASS_NAME_COMMAND_ACTIVE);
          }
          if (command.dialog) {
            command.dialog.hide();
          }
        } else {
          state = this.composer.commands.state(command.name, command.value);
          dom.removeClass(command.link, CLASS_NAME_COMMAND_DISABLED);
          if (command.group) {
            dom.removeClass(command.group, CLASS_NAME_COMMAND_DISABLED);
          }
        }
        if (command.state === state && !command.tracksBlankValue) {
          continue;
        }

        command.state = state;
        if (state) {
          if (command.tracksBlankValue) {
            dom.removeClass(command.link, CLASS_NAME_COMMAND_ACTIVE);
          } else {
            dom.addClass(command.link, CLASS_NAME_COMMAND_ACTIVE);
            if (command.group) {
              dom.addClass(command.group, CLASS_NAME_COMMAND_ACTIVE);
            }
            // commands with fixed value can not have a dialog.
            if (command.dialog && (typeof command.value === "undefined" || command.value === null)) {
              if (state && typeof state === "object") {
                state = getCommandState(composer, command);
                command.state = state;

                // If dialog has dataset.showdialogonselection set as true,
                // Dialog displays on text state becoming active regardless of clobal showToolbarDialogsOnSelection options value
                displayDialogAttributeValue = command.dialog.container.dataset ? command.dialog.container.dataset.showdialogonselection : false;

                if (composer.config.showToolbarDialogsOnSelection || displayDialogAttributeValue) {
                  command.dialog.show(state);
                } else {
                  command.dialog.update(state);
                }
              } else {
                command.dialog.hide();
              }
            }
          }
        } else {
          if (command.tracksBlankValue) {
            dom.addClass(command.link, CLASS_NAME_COMMAND_ACTIVE);
          } else {
            dom.removeClass(command.link, CLASS_NAME_COMMAND_ACTIVE);
            if (command.group) {
              dom.removeClass(command.group, CLASS_NAME_COMMAND_ACTIVE);
            }
            // commands with fixed value can not have a dialog.
            if (command.dialog && !command.value) {
              command.dialog.hide();
            }
          }
        }
      }

      for (i in actionMapping) {
        action = actionMapping[i];

        if (action.name === "change_view") {
          action.state = this.editor.currentView === this.editor.textarea || this.editor.currentView === "source";
          if (action.state) {
            dom.addClass(action.link, CLASS_NAME_ACTION_ACTIVE);
          } else {
            dom.removeClass(action.link, CLASS_NAME_ACTION_ACTIVE);
          }
        }
      }
    },

    show: function() {
      this.container.style.display = "";
    },

    hide: function() {
      this.container.style.display = "none";
    }
  });

  function getCommandState (composer, command) {
    var state = composer.commands.state(command.name, command.value);

    // Grab first and only object/element in state array, otherwise convert state into boolean
    // to avoid showing a dialog for multiple selected elements which may have different attributes
    // eg. when two links with different href are selected, the state will be an array consisting of both link elements
    // but the dialog interface can only update one
    if (!command.dialog.multiselect && wysihtml.lang.object(state).isArray()) {
      state = state.length === 1 ? state[0] : true;
    }

    return state;
  }

  // Extend defaults

  // Id of the toolbar element, pass falsey value if you don't want any toolbar logic
  wysihtml.Editor.prototype.defaults.toolbar = undefined;

  // Whether toolbar is displayed after init by script automatically.
  // Can be set to false if toolobar is set to display only on editable area focus
  wysihtml.Editor.prototype.defaults.showToolbarAfterInit = true;

  // With default toolbar it shows dialogs in toolbar when their related text format state becomes active (click on link in text opens link dialogue)
  wysihtml.Editor.prototype.defaults.showToolbarDialogsOnSelection= true;

  // Bind toolbar initiation on editor instance creation
  wysihtml.extendEditor(function(editor) {
    if (editor.config.toolbar) {
      editor.toolbar = new wysihtml.toolbar.Toolbar(editor, editor.config.toolbar, editor.config.showToolbarAfterInit);
      editor.on('destroy:composer', function() {
        if (editor && editor.toolbar) {
          editor.toolbar.destroy();
        }
      });
    }
  });

})(wysihtml);
