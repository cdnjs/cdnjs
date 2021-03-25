/**
* Tom Select v1.4.3
* Licensed under the Apache License, Version 2.0 (the "License");
*/

import MicroEvent from './contrib/microevent.js';
import MicroPlugin from './contrib/microplugin.js';
import Sifter from './contrib/sifter.js';
import { removeHighlight, highlight } from './contrib/highlight.js';
import { KEY_TAB, KEY_DELETE, KEY_BACKSPACE, KEY_RIGHT, KEY_LEFT, KEY_RETURN, KEY_UP, KEY_DOWN, KEY_ESC, KEY_A, KEY_SHORTCUT } from './constants.js';
import getSettings from './getSettings.js';
import { getId, loadDebounce, addEvent, preventDefault, isKeyDown, debounce_events, hash_key, escape_html, getSelection } from './utils.js';
import { getDom, addClasses, setAttr, escapeQuery, triggerEvent, removeClasses, isEmptyObject, applyCSS, getTail, nodeIndex, parentMatch } from './vanilla.js';

var instance_i = 0;
class TomSelect extends MicroPlugin(MicroEvent) {
  constructor(input_arg, settings) {
    super();
    this.control_input = void 0;
    this.wrapper = void 0;
    this.dropdown = void 0;
    this.control = void 0;
    this.dropdown_content = void 0;
    this.order = 0;
    this.settings = void 0;
    this.input = void 0;
    this.tabIndex = void 0;
    this.is_select_tag = void 0;
    this.rtl = void 0;
    this.inputId = void 0;
    this._destroy = void 0;
    this.sifter = void 0;
    this.tab_key = false;
    this.isOpen = false;
    this.isDisabled = false;
    this.isRequired = void 0;
    this.isInvalid = false;
    this.isLocked = false;
    this.isFocused = false;
    this.isInputHidden = false;
    this.isSetup = false;
    this.ignoreFocus = false;
    this.ignoreBlur = false;
    this.hasOptions = false;
    this.currentResults = null;
    this.lastValue = '';
    this.caretPos = 0;
    this.loading = 0;
    this.loadedSearches = {};
    this.activeOption = null;
    this.activeItems = [];
    this.optgroups = {};
    this.options = {};
    this.options_i = 0;
    this.userOptions = {};
    this.items = [];
    this.renderCache = {
      'item': {},
      'option': {}
    };
    instance_i++;
    var dir;
    var input = getDom(input_arg);

    if (input.tomselect) {
      throw new Error('Tom Select already initialized on this element');
    }

    input.tomselect = this; // detect rtl environment

    var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
    dir = computedStyle.getPropertyValue('direction'); // setup default state

    this.settings = getSettings(input, settings);
    this.input = input;
    this.tabIndex = input.tabIndex || 0;
    this.is_select_tag = input.tagName.toLowerCase() === 'select';
    this.rtl = /rtl/i.test(dir);
    this.inputId = getId(input, 'tomselect-' + instance_i);
    this.isRequired = input.required; // debounce user defined load() if loadThrottle > 0

    if (this.settings.load && this.settings.loadThrottle) {
      this.settings.load = loadDebounce(this.settings.load, this.settings.loadThrottle);
    } // search system


    this.sifter = new Sifter(this.options, {
      diacritics: this.settings.diacritics
    });
    this.setupOptions(this.settings.options, this.settings.optgroups);
    delete this.settings.optgroups;
    delete this.settings.options; // option-dependent defaults

    this.settings.mode = this.settings.mode || (this.settings.maxItems === 1 ? 'single' : 'multi');

    if (typeof this.settings.hideSelected !== 'boolean') {
      this.settings.hideSelected = this.settings.mode === 'multi';
    }

    if (typeof this.settings.hidePlaceholder !== 'boolean') {
      this.settings.hidePlaceholder = this.settings.mode !== 'multi';
    } // set up createFilter callback


    var filter = this.settings.createFilter;

    if (typeof filter !== 'function') {
      if (typeof filter === 'string') {
        filter = new RegExp(filter);
      }

      if (filter instanceof RegExp) {
        this.settings.createFilter = input => filter.test(input);
      } else {
        this.settings.createFilter = () => true;
      }
    }

    this.initializePlugins(this.settings.plugins);
    this.setupCallbacks();
    this.setupTemplates();
    this.setup();
  } // methods
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /**
   * Creates all elements and sets up event bindings.
   *
   */


  setup() {
    var self = this;
    var settings = self.settings;
    var wrapper;
    var control;
    var control_input;
    var dropdown;
    var dropdown_content;
    var inputMode;
    var classes;
    var classes_plugins;
    var input = self.input;
    var control_id;
    const passive_event = {
      passive: true
    };
    const listboxId = self.inputId + '-ts-dropdown';
    inputMode = self.settings.mode;
    classes = input.getAttribute('class') || '';
    wrapper = getDom('<div>');
    addClasses(wrapper, settings.wrapperClass, classes, inputMode);
    control = getDom('<div class="items">');
    addClasses(control, settings.inputClass);
    wrapper.append(control);
    dropdown = self.render('dropdown');
    addClasses(dropdown, settings.dropdownClass, inputMode);
    dropdown_content = getDom(`<div style="scroll-behavior: smooth;" role="listbox" id="${listboxId}" tabindex="-1">`);
    addClasses(dropdown_content, settings.dropdownContentClass);
    dropdown.append(dropdown_content);
    getDom(settings.dropdownParent || wrapper).appendChild(dropdown);

    if (settings.controlInput) {
      control_input = getDom(settings.controlInput);
    } else {
      control_input = getDom('<input type="text" autocomplete="off" size="1" />'); // set attributes

      var attrs = ['autocorrect', 'autocapitalize', 'autocomplete'];

      for (const attr of attrs) {
        if (input.getAttribute(attr)) {
          setAttr(control_input, {
            [attr]: input.getAttribute(attr)
          });
        }
      }
    }

    if (!settings.controlInput) {
      control_input.tabIndex = input.disabled ? -1 : self.tabIndex;
      control.appendChild(control_input);
    }

    setAttr(control_input, {
      role: 'combobox',
      haspopup: 'listbox',
      'aria-expanded': 'false',
      'aria-controls': listboxId
    });
    control_id = getId(control_input, self.inputId + '-tomselected');
    let query = "label[for='" + escapeQuery(self.inputId) + "']";
    let label = document.querySelector(query);

    if (label) {
      setAttr(label, {
        for: control_id
      });
      let label_id = getId(label, self.inputId + '-ts-label');
      setAttr(dropdown_content, {
        'aria-labelledby': label_id
      });
    }

    if (self.settings.copyClassesToDropdown) {
      addClasses(dropdown, classes);
    }

    wrapper.style.width = input.style.width;

    if (self.plugins.names.length) {
      classes_plugins = 'plugin-' + self.plugins.names.join(' plugin-');
      addClasses([wrapper, dropdown], classes_plugins);
    }

    if ((settings.maxItems === null || settings.maxItems > 1) && self.is_select_tag) {
      setAttr(input, {
        multiple: 'multiple'
      });
    }

    if (self.settings.placeholder) {
      setAttr(control_input, {
        placeholder: settings.placeholder
      });
    } // if splitOn was not passed in, construct it from the delimiter to allow pasting universally


    if (!self.settings.splitOn && self.settings.delimiter) {
      var delimiterEscaped = self.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      self.settings.splitOn = new RegExp('\\s*' + delimiterEscaped + '+\\s*');
    }

    self.control = control;
    self.control_input = control_input;
    self.wrapper = wrapper;
    self.dropdown = dropdown;
    self.dropdown_content = dropdown_content;
    self.control_input.type = input.type;
    addEvent(dropdown, 'mouseenter', e => {
      var target_match = parentMatch(e.target, '[data-selectable]', dropdown);

      if (target_match) {
        return self.onOptionHover(e, target_match);
      }
    }, {
      capture: true
    });
    addEvent(control, 'mousedown', evt => {
      // retain focus by preventing native handling. if the
      // event target is the input it should not be modified.
      // otherwise, text selection within the input won't work.
      if (evt.target == control_input) {
        self.clearActiveItems();
        evt.stopPropagation();
        self.inputState();
        return;
      }

      var target_match = parentMatch(evt.target, '.' + self.settings.itemClass, control);

      if (target_match) {
        return self.onItemSelect(evt, target_match);
      }

      return self.onMouseDown(evt);
    });
    addEvent(control, 'click', e => self.onClick(e));
    addEvent(control_input, 'keydown', e => self.onKeyDown(e));
    addEvent(control_input, 'keyup', e => self.onKeyUp(e));
    addEvent(control_input, 'keypress', e => self.onKeyPress(e));
    addEvent(control_input, 'resize', () => self.positionDropdown(), passive_event);
    addEvent(control_input, 'blur', e => self.onBlur(e));
    addEvent(control_input, 'focus', e => {
      self.ignoreBlur = false;
      self.onFocus(e);
    });
    addEvent(control_input, 'paste', e => self.onPaste(e)); // clicking anywhere in the control should not close the dropdown
    // clicking on an option should selectit

    var doc_mousedown = e => {
      // if dropdownParent is set, options may not be within self.wrapper
      var option = parentMatch(e.target, '[data-selectable]', self.dropdown); // outside of this instance

      if (!option && !self.wrapper.contains(e.target)) {
        if (self.isFocused) {
          self.blur();
        }

        self.inputState();
        return;
      }

      preventDefault(e, true);

      if (option) {
        self.onOptionSelect(e, option);
      }
    };

    var win_scroll = () => {
      if (self.isOpen) {
        self.positionDropdown();
      }
    };

    addEvent(document, 'mousedown', doc_mousedown);
    addEvent(window, 'sroll', win_scroll, passive_event);
    addEvent(window, 'resize', win_scroll, passive_event);

    self._destroy = () => {
      document.removeEventListener('mousedown', doc_mousedown);
      window.removeEventListener('sroll', win_scroll);
      window.removeEventListener('resize', win_scroll);
    }; // store original html and tab index so that they can be
    // restored when the destroy() method is called.


    this.revertSettings = {
      innerHTML: input.innerHTML,
      tabIndex: input.tabIndex
    };
    input.tabIndex = -1;
    setAttr(input, {
      hidden: 'hidden'
    });
    input.insertAdjacentElement('afterend', self.wrapper);
    self.setValue(settings.items);
    delete settings.items;
    addEvent(input, 'invalid', e => {
      preventDefault(e);

      if (!self.isInvalid) {
        self.isInvalid = true;
        self.refreshState();
      }
    });
    self.updateOriginalInput();
    self.refreshItems();
    self.refreshState();
    self.inputState();
    self.isSetup = true;

    if (input.disabled) {
      self.disable();
    }

    self.on('change', this.onChange);
    addClasses(input, 'tomselected');
    self.trigger('initialize'); // preload options

    if (settings.preload === true) {
      self.load('');
    }
  }
  /**
   * Register options and optgroups
   *
   */


  setupOptions(options = [], optgroups = []) {
    // build options table
    for (const option of options) {
      this.registerOption(option);
    } // build optgroup table


    for (const optgroup of optgroups) {
      this.registerOptionGroup(optgroup);
    }
  }
  /**
   * Sets up default rendering functions.
   */


  setupTemplates() {
    var self = this;
    var field_label = self.settings.labelField;
    var field_optgroup = self.settings.optgroupLabelField;
    var templates = {
      'optgroup': (data, escape) => {
        let optgroup = document.createElement('div');
        optgroup.className = 'optgroup';
        optgroup.appendChild(data.options);
        return optgroup;
      },
      'optgroup_header': (data, escape) => {
        return '<div class="optgroup-header">' + escape(data[field_optgroup]) + '</div>';
      },
      'option': (data, escape) => {
        return '<div>' + escape(data[field_label]) + '</div>';
      },
      'item': (data, escape) => {
        return '<div>' + escape(data[field_label]) + '</div>';
      },
      'option_create': (data, escape) => {
        return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&hellip;</div>';
      },
      'no_results': (data, escape) => {
        return '<div class="no-results">No results found</div>';
      },
      'loading': (data, escape) => {
        return '<div class="spinner"></div>';
      },
      'not_loading': () => {},
      'dropdown': () => {
        return '<div style="display:none"></div>';
      }
    };
    self.settings.render = Object.assign({}, templates, self.settings.render);
  }
  /**
   * Maps fired events to callbacks provided
   * in the settings used when creating the control.
   */


  setupCallbacks() {
    var key, fn;
    var callbacks = {
      'initialize': 'onInitialize',
      'change': 'onChange',
      'item_add': 'onItemAdd',
      'item_remove': 'onItemRemove',
      'clear': 'onClear',
      'option_add': 'onOptionAdd',
      'option_remove': 'onOptionRemove',
      'option_clear': 'onOptionClear',
      'optgroup_add': 'onOptionGroupAdd',
      'optgroup_remove': 'onOptionGroupRemove',
      'optgroup_clear': 'onOptionGroupClear',
      'dropdown_open': 'onDropdownOpen',
      'dropdown_close': 'onDropdownClose',
      'type': 'onType',
      'load': 'onLoad',
      'focus': 'onFocus',
      'blur': 'onBlur'
    };

    for (key in callbacks) {
      fn = this.settings[callbacks[key]];
      if (fn) this.on(key, fn);
    }
  }
  /**
   * Triggered when the main control element
   * has a click event.
   *
   */


  onClick(e) {
    var self = this; // necessary for mobile webkit devices (manual focus triggering
    // is ignored unless invoked within a click event)
    // also necessary to reopen a dropdown that has been closed by
    // closeAfterSelect

    if (!self.isFocused || !self.isOpen) {
      self.focus();
      preventDefault(e);
    }
  }
  /**
   * Triggered when the main control element
   * has a mouse down event.
   *
   */


  onMouseDown(e) {
    var self = this;

    if (self.isFocused) {
      if (self.settings.mode !== 'single') {
        self.setActiveItem();
      }

      self.open();
      return false;
    } else {
      // give control focus
      setTimeout(() => self.focus(), 0);
    }
  }
  /**
   * Triggered when the value of the control has been changed.
   * This should propagate the event to the original DOM
   * input / select element.
   */


  onChange() {
    triggerEvent(this.input, 'input');
    triggerEvent(this.input, 'change');
  }
  /**
   * Triggered on <input> paste.
   *
   */


  onPaste(e) {
    var self = this;

    if (self.isFull() || self.isInputHidden || self.isLocked) {
      preventDefault(e);
      return;
    } // If a regex or string is included, this will split the pasted
    // input and create Items for each separate value


    if (self.settings.splitOn) {
      // Wait for pasted text to be recognized in value
      setTimeout(() => {
        var pastedText = self.inputValue();

        if (!pastedText.match(self.settings.splitOn)) {
          return;
        }

        var splitInput = pastedText.trim().split(self.settings.splitOn);

        for (const piece of splitInput) {
          self.createItem(piece);
        }
      }, 0);
    }
  }
  /**
   * Triggered on <input> keypress.
   *
   */


  onKeyPress(e) {
    var self = this;

    if (self.isLocked) {
      preventDefault(e);
      return;
    }

    var character = String.fromCharCode(e.keyCode || e.which);

    if (self.settings.create && self.settings.mode === 'multi' && character === self.settings.delimiter) {
      self.createItem();
      preventDefault(e);
      return;
    }
  }
  /**
   * Triggered on <input> keydown.
   *
   */


  onKeyDown(e) {
    var self = this;

    if (self.isLocked) {
      if (e.keyCode !== KEY_TAB) {
        preventDefault(e);
      }

      return;
    }

    switch (e.keyCode) {
      // ctrl+A: select all
      case KEY_A:
        if (isKeyDown(KEY_SHORTCUT, e)) {
          self.selectAll();
          return;
        }

        break;
      // esc: close dropdown

      case KEY_ESC:
        if (self.isOpen) {
          preventDefault(e, true);
          self.close();
        }

        self.clearActiveItems();
        return;
      // down: open dropdown or move selection down

      case KEY_DOWN:
        if (!self.isOpen && self.hasOptions) {
          self.open();
        } else if (self.activeOption) {
          let next = self.getAdjacent(self.activeOption, 1);
          if (next) self.setActiveOption(next);
        }

        preventDefault(e);
        return;
      // up: move selection up

      case KEY_UP:
        if (self.activeOption) {
          let prev = self.getAdjacent(self.activeOption, -1);
          if (prev) self.setActiveOption(prev);
        }

        preventDefault(e);
        return;
      // doc_src select active option

      case KEY_RETURN:
        if (self.isOpen && self.activeOption) {
          self.onOptionSelect(e, self.activeOption);
          preventDefault(e);
        }

        return;
      // left: modifiy item selection to the left

      case KEY_LEFT:
        self.advanceSelection(-1, e);
        return;
      // right: modifiy item selection to the right

      case KEY_RIGHT:
        self.advanceSelection(1, e);
        return;
      // tab: select active option and/or create item

      case KEY_TAB:
        if (self.settings.selectOnTab && self.isOpen && self.activeOption) {
          self.tab_key = true;
          self.onOptionSelect(e, self.activeOption); // prevent default [tab] behaviour of jump to the next field
          // if select isFull, then the dropdown won't be open and [tab] will work normally

          preventDefault(e);
          self.tab_key = false;
        }

        if (self.settings.create && self.createItem()) {
          preventDefault(e);
        }

        return;
      // delete|backspace: delete items

      case KEY_BACKSPACE:
      case KEY_DELETE:
        self.deleteSelection(e);
        return;
    } // don't enter text in the control_input when active items are selected


    if (self.isInputHidden && !isKeyDown(KEY_SHORTCUT, e)) {
      preventDefault(e);
    }
  }
  /**
   * Triggered on <input> keyup.
   *
   */


  onKeyUp(e) {
    var self = this;

    if (self.isLocked) {
      preventDefault(e);
      return;
    }

    var value = self.inputValue();

    if (self.lastValue !== value) {
      self.lastValue = value;

      if (self.settings.shouldLoad.call(self, value)) {
        self.load(value);
      }

      self.refreshOptions();
      self.trigger('type', value);
    }
  }
  /**
   * Triggered on <input> focus.
   *
   */


  onFocus(e) {
    var self = this;
    var wasFocused = self.isFocused;

    if (self.isDisabled) {
      self.blur();
      preventDefault(e);
      return;
    }

    if (self.ignoreFocus) return;
    self.isFocused = true;
    if (self.settings.preload === 'focus') self.load('');
    if (!wasFocused) self.trigger('focus');

    if (!self.activeItems.length) {
      self.showInput();
      self.setActiveItem();
      self.refreshOptions(!!self.settings.openOnFocus);
    }

    self.refreshState();
  }
  /**
   * Triggered on <input> blur.
   *
   */


  onBlur(e) {
    var self = this;
    if (!self.isFocused) return;
    self.isFocused = false;
    self.ignoreFocus = false;

    if (!self.ignoreBlur && document.activeElement === self.dropdown_content) {
      // necessary to prevent IE closing the dropdown when the scrollbar is clicked
      self.ignoreBlur = true;
      self.onFocus(e);
      return;
    }

    var deactivate = () => {
      self.close();
      self.setActiveItem();
      self.setCaret(self.items.length);
      self.trigger('blur');
    };

    if (self.settings.create && self.settings.createOnBlur) {
      self.createItem(null, false, deactivate);
    } else {
      deactivate();
    }
  }
  /**
   * Triggered when the user rolls over
   * an option in the autocomplete dropdown menu.
   * @deprecated v1.3
   */


  onOptionHover(evt, option) {}
  /**
   * Triggered when the user clicks on an option
   * in the autocomplete dropdown menu.
   *
   */


  onOptionSelect(evt, option) {
    var value,
        self = this;

    if (!option) {
      return;
    } // should not be possible to trigger a option under a disabled optgroup


    if (option.parentElement && option.parentElement.matches('[data-disabled]')) {
      return;
    }

    if (option.classList.contains('create')) {
      self.createItem(null, true, () => {
        if (self.settings.closeAfterSelect) {
          self.close();
        }
      });
    } else {
      value = option.dataset.value;

      if (typeof value !== 'undefined') {
        self.lastQuery = null;
        self.addItem(value);

        if (self.settings.closeAfterSelect) {
          self.close();
        } else if (!self.settings.hideSelected && evt.type && /mouse/.test(evt.type)) {
          self.setActiveOption(self.getOption(value));
        }
      }
    }
  }
  /**
   * Triggered when the user clicks on an item
   * that has been selected.
   *
   */


  onItemSelect(evt, item) {
    var self = this;
    if (self.isLocked) return;

    if (self.settings.mode === 'multi') {
      preventDefault(evt);
      self.setActiveItem(item, evt);
    }
  }
  /**
   * Invokes the user-provided option provider / loader.
   *
   */


  load(value) {
    var self = this;
    var fn = self.settings.load;
    if (!fn) return;
    if (self.loadedSearches.hasOwnProperty(value)) return;
    addClasses(self.wrapper, self.settings.loadingClass);
    self.loading++;
    fn.call(self, value, function (options, optgroups) {
      self.loading = Math.max(self.loading - 1, 0);
      self.lastQuery = null;
      self.clearActiveOption(); // when new results load, focus should be on first option

      self.setupOptions(options, optgroups);
      self.refreshOptions(self.isFocused && !self.isInputHidden);

      if (!self.loading) {
        removeClasses(self.wrapper, self.settings.loadingClass);
      }

      self.trigger('load', options, optgroups);
    });
  }
  /**
   * @deprecated 1.1
   *
   */


  onSearchChange(value) {
    this.load(value);
  }
  /**
   * Sets the input field of the control to the specified value.
   *
   */


  setTextboxValue(value = '') {
    var input = this.control_input;
    var changed = input.value !== value;

    if (changed) {
      input.value = value;
      triggerEvent(input, 'update');
      this.lastValue = value;
    }
  }
  /**
   * Returns the value of the control. If multiple items
   * can be selected (e.g. <select multiple>), this returns
   * an array. If only one item can be selected, this
   * returns a string.
   *
   */


  getValue() {
    if (this.is_select_tag && this.input.hasAttribute('multiple')) {
      return this.items;
    }

    return this.items.join(this.settings.delimiter);
  }
  /**
   * Resets the selected items to the given value.
   *
   */


  setValue(value, silent) {
    var events = silent ? [] : ['change'];
    debounce_events(this, events, () => {
      this.clear(silent);
      this.addItems(value, silent);
    });
  }
  /**
   * Resets the number of max items to the given value
   *
   */


  setMaxItems(value) {
    if (value === 0) value = null; //reset to unlimited items.

    this.settings.maxItems = value;
    this.refreshState();
  }
  /**
   * Sets the selected item.
   *
   */


  setActiveItem(item, e) {
    var self = this;
    var eventName;
    var i, begin, end, swap;
    var last;
    if (self.settings.mode === 'single') return; // clear the active selection

    if (!item) {
      self.clearActiveItems();

      if (self.isFocused) {
        self.showInput();
      }

      return;
    } // modify selection


    eventName = e && e.type.toLowerCase();

    if (eventName === 'mousedown' && isKeyDown('shiftKey', e) && self.activeItems.length) {
      last = self.getLastActive();
      begin = Array.prototype.indexOf.call(self.control.children, last);
      end = Array.prototype.indexOf.call(self.control.children, item);

      if (begin > end) {
        swap = begin;
        begin = end;
        end = swap;
      }

      for (i = begin; i <= end; i++) {
        item = self.control.children[i];

        if (self.activeItems.indexOf(item) === -1) {
          self.setActiveItemClass(item);
        }
      }

      preventDefault(e);
    } else if (eventName === 'mousedown' && isKeyDown(KEY_SHORTCUT, e) || eventName === 'keydown' && isKeyDown('shiftKey', e)) {
      if (item.classList.contains('active')) {
        self.removeActiveItem(item);
      } else {
        self.setActiveItemClass(item);
      }
    } else {
      self.clearActiveItems();
      self.setActiveItemClass(item);
    } // ensure control has focus


    self.hideInput();

    if (!self.isFocused) {
      self.focus();
    }
  }
  /**
   * Set the active and last-active classes
   *
   */


  setActiveItemClass(item) {
    var last_active = this.control.querySelector('.last-active');
    if (last_active) removeClasses(last_active, 'last-active');
    addClasses(item, 'active last-active');

    if (this.activeItems.indexOf(item) == -1) {
      this.activeItems.push(item);
    }
  }
  /**
   * Remove active item
   *
   */


  removeActiveItem(item) {
    var idx = this.activeItems.indexOf(item);
    this.activeItems.splice(idx, 1);
    removeClasses(item, 'active');
  }
  /**
   * Clears all the active items
   *
   */


  clearActiveItems() {
    removeClasses(this.activeItems, 'active');
    this.activeItems = [];
  }
  /**
   * Sets the selected item in the dropdown menu
   * of available options.
   *
   */


  setActiveOption(option) {
    var height_menu, height_item, y;

    if (option === this.activeOption) {
      return;
    }

    this.clearActiveOption();
    if (!option) return;
    this.activeOption = option;
    setAttr(this.control_input, {
      'aria-activedescendant': option.getAttribute('id')
    });
    setAttr(option, {
      'aria-selected': 'true'
    });
    addClasses(option, 'active');
    height_menu = this.dropdown_content.clientHeight;
    let scrollTop = this.dropdown_content.scrollTop || 0;
    height_item = this.activeOption.offsetHeight;
    y = this.activeOption.getBoundingClientRect().top - this.dropdown_content.getBoundingClientRect().top + scrollTop;

    if (y + height_item > height_menu + scrollTop) {
      this.dropdown_content.scrollTop = y - height_menu + height_item;
    } else if (y < scrollTop) {
      this.dropdown_content.scrollTop = y;
    }
  }
  /**
   * Clears the active option
   *
   */


  clearActiveOption() {
    if (this.activeOption) {
      removeClasses(this.activeOption, 'active');
      this.activeOption.removeAttribute('aria-selected');
    }

    this.activeOption = null;
    this.control_input.removeAttribute('aria-activedescendant');
  }
  /**
   * Selects all items (CTRL + A).
   */


  selectAll() {
    if (this.settings.mode === 'single') return;
    this.activeItems = this.controlChildren();

    if (this.activeItems.length) {
      addClasses(this.activeItems, 'active');
      this.hideInput();
      this.close();
    }

    this.focus();
  }
  /**
   * Determines if the control_input should be in a hidden or visible state
   *
   */


  inputState() {
    var self = this;
    if (self.settings.controlInput) return;

    if (self.activeItems.length > 0 || !self.isFocused && this.settings.hidePlaceholder && self.items.length > 0) {
      self.setTextboxValue();
      self.isInputHidden = true;
      addClasses(self.wrapper, 'input-hidden');
    } else {
      self.isInputHidden = false;
      removeClasses(self.wrapper, 'input-hidden');
    }
  }
  /**
   * Hides the input element out of view, while
   * retaining its focus.
   * @deprecated 1.3
   */


  hideInput() {
    this.inputState();
  }
  /**
   * Restores input visibility.
   * @deprecated 1.3
   */


  showInput() {
    this.inputState();
  }
  /**
   * Get the input value
   */


  inputValue() {
    return this.control_input.value.trim();
  }
  /**
   * Gives the control focus.
   */


  focus() {
    var self = this;
    if (self.isDisabled) return;
    self.ignoreFocus = true;
    self.control_input.focus();
    setTimeout(() => {
      self.ignoreFocus = false;
      self.onFocus();
    }, 0);
  }
  /**
   * Forces the control out of focus.
   *
   */


  blur() {
    this.control_input.blur();
    this.onBlur(null);
  }
  /**
   * Returns a function that scores an object
   * to show how good of a match it is to the
   * provided query.
   *
   * @return {function}
   */


  getScoreFunction(query) {
    return this.sifter.getScoreFunction(query, this.getSearchOptions());
  }
  /**
   * Returns search options for sifter (the system
   * for scoring and sorting results).
   *
   * @see https://github.com/brianreavis/sifter.js
   * @return {object}
   */


  getSearchOptions() {
    var sort;
    var settings = this.settings;

    if (typeof settings.sortField === 'string') {
      sort = [{
        field: settings.sortField
      }];
    }

    return {
      fields: settings.searchField,
      conjunction: settings.searchConjunction,
      sort: sort,
      nesting: settings.nesting
    };
  }
  /**
   * Searches through available options and returns
   * a sorted array of matches.
   *
   */


  search(query) {
    var i, result, calculateScore;
    var self = this;
    var settings = self.settings;
    var options = this.getSearchOptions(); // validate user-provided result scoring function

    if (settings.score) {
      calculateScore = self.settings.score.call(self, query);

      if (typeof calculateScore !== 'function') {
        throw new Error('Tom Select "score" setting must be a function that returns a function');
      }
    } // perform search


    if (query !== self.lastQuery) {
      self.lastQuery = query;
      result = self.sifter.search(query, Object.assign(options, {
        score: calculateScore
      }));
      self.currentResults = result;
    } else {
      result = Object.assign({}, self.currentResults);
    } // filter out selected items


    if (settings.hideSelected) {
      for (i = result.items.length - 1; i >= 0; i--) {
        if (self.items.indexOf(hash_key(result.items[i].id)) !== -1) {
          result.items.splice(i, 1);
        }
      }
    }

    return result;
  }
  /**
   * Refreshes the list of available options shown
   * in the autocomplete dropdown menu.
   *
   */


  refreshOptions(triggerDropdown = true) {
    var i, j, k, n, groups_order, optgroup, optgroups, html, has_create_option;
    var active, create;
    var groups;
    var self = this;
    var query = self.inputValue();
    var results = self.search(query);
    var active_before_hash = self.activeOption && hash_key(self.activeOption.dataset.value);
    var show_dropdown = self.settings.shouldOpen || false; // build markup

    n = results.items.length;

    if (typeof self.settings.maxOptions === 'number') {
      n = Math.min(n, self.settings.maxOptions);
    }

    if (n > 0) {
      show_dropdown = true;
    } // render and group available options individually


    groups = {};
    groups_order = [];

    for (i = 0; i < n; i++) {
      // get option dom element, don't re-render if we
      let option = self.options[results.items[i].id];
      let opt_value = hash_key(option[self.settings.valueField]);
      let option_el = self.getOption(opt_value);

      if (!option_el) {
        option_el = self.render('option', option);
      } // toggle 'selected' class


      if (!self.settings.hideSelected) {
        option_el.classList.toggle('selected', self.items.includes(opt_value));
      }

      optgroup = option[self.settings.optgroupField] || '';
      optgroups = Array.isArray(optgroup) ? optgroup : [optgroup];

      for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
        optgroup = optgroups[j];

        if (!self.optgroups.hasOwnProperty(optgroup)) {
          optgroup = '';
        }

        if (!groups.hasOwnProperty(optgroup)) {
          groups[optgroup] = document.createDocumentFragment();
          groups_order.push(optgroup);
        } // a child could only have one parent, so if you have more parents clone the child


        if (j > 0) {
          option_el = option_el.cloneNode(true);
          removeClasses(option_el, 'active');
          option_el.removeAttribute('aria-selected');
        }

        groups[optgroup].appendChild(option_el);
      }
    } // sort optgroups


    if (this.settings.lockOptgroupOrder) {
      groups_order.sort((a, b) => {
        var a_order = self.optgroups[a] && self.optgroups[a].$order || 0;
        var b_order = self.optgroups[b] && self.optgroups[b].$order || 0;
        return a_order - b_order;
      });
    } // render optgroup headers & join groups


    html = document.createDocumentFragment();

    for (optgroup of groups_order) {
      if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].children.length) {
        let group_options = document.createDocumentFragment();
        group_options.appendChild(self.render('optgroup_header', self.optgroups[optgroup]));
        group_options.appendChild(groups[optgroup]);
        let group_html = self.render('optgroup', {
          group: self.optgroups[optgroup],
          options: group_options
        });
        html.appendChild(group_html);
      } else {
        html.appendChild(groups[optgroup]);
      }
    }

    self.dropdown_content.innerHTML = '';
    self.dropdown_content.appendChild(html); // highlight matching terms inline

    if (self.settings.highlight) {
      removeHighlight(self.dropdown_content);

      if (results.query.length && results.tokens.length) {
        for (const tok of results.tokens) {
          highlight(self.dropdown_content, tok.regex);
        }
      }
    } // helper method for adding templates to dropdown


    var add_template = template => {
      let content = self.render(template, {
        input: query
      });

      if (content) {
        show_dropdown = true;
        self.dropdown_content.insertBefore(content, self.dropdown_content.firstChild);
      }

      return content;
    }; // invalid query


    if (!self.settings.shouldLoad.call(self, query)) {
      add_template('not_loading'); // add loading message
    } else if (self.loading) {
      add_template('loading'); // add no_results message
    } else if (results.items.length === 0) {
      add_template('no_results');
    } // add create option


    has_create_option = self.canCreate(query);

    if (has_create_option) {
      create = add_template('option_create');
    } // activate


    self.hasOptions = results.items.length > 0 || has_create_option;

    if (show_dropdown) {
      if (results.items.length > 0) {
        active = active_before_hash && self.getOption(active_before_hash);

        if (!active || !self.dropdown_content.contains(active)) {
          let active_index = 0;

          if (create && !self.settings.addPrecedence) {
            active_index = 1;
          }

          active = self.selectable()[active_index];
        }
      } else {
        active = create;
      }

      self.setActiveOption(active);

      if (triggerDropdown && !self.isOpen) {
        self.open();
      }
    } else {
      self.clearActiveOption();

      if (triggerDropdown && self.isOpen) {
        self.close();
      }
    }
  }
  /**
   * Return list of selectable options
   *
   */


  selectable() {
    return this.dropdown_content.querySelectorAll('[data-selectable]');
  }
  /**
   * Adds an available option. If it already exists,
   * nothing will happen. Note: this does not refresh
   * the options list dropdown (use `refreshOptions`
   * for that).
   *
   * Usage:
   *
   *   this.addOption(data)
   *
   */


  addOption(data) {
    var value,
        self = this;

    if (Array.isArray(data)) {
      for (const dat of data) {
        self.addOption(dat);
      }

      return;
    }

    if (value = self.registerOption(data)) {
      self.userOptions[value] = true;
      self.lastQuery = null;
      self.trigger('option_add', value, data);
    }
  }
  /**
   * Registers an option to the pool of options.
   *
   */


  registerOption(data) {
    var key = hash_key(data[this.settings.valueField]);
    if (key === null || this.options.hasOwnProperty(key)) return false;
    data.$order = data.$order || ++this.order;
    data.$id = this.inputId + '-opt-' + this.options_i++;
    this.options[key] = data;
    return key;
  }
  /**
   * Registers an option group to the pool of option groups.
   *
   * @return {boolean|string}
   */


  registerOptionGroup(data) {
    var key = hash_key(data[this.settings.optgroupValueField]);
    if (key === null) return false;
    data.$order = data.$order || ++this.order;
    this.optgroups[key] = data;
    return key;
  }
  /**
   * Registers a new optgroup for options
   * to be bucketed into.
   *
   */


  addOptionGroup(id, data) {
    var hashed_id;
    data[this.settings.optgroupValueField] = id;

    if (hashed_id = this.registerOptionGroup(data)) {
      this.trigger('optgroup_add', hashed_id, data);
    }
  }
  /**
   * Removes an existing option group.
   *
   */


  removeOptionGroup(id) {
    if (this.optgroups.hasOwnProperty(id)) {
      delete this.optgroups[id];
      this.clearCache();
      this.trigger('optgroup_remove', id);
    }
  }
  /**
   * Clears all existing option groups.
   */


  clearOptionGroups() {
    this.optgroups = {};
    this.clearCache();
    this.trigger('optgroup_clear');
  }
  /**
   * Updates an option available for selection. If
   * it is visible in the selected items or options
   * dropdown, it will be re-rendered automatically.
   *
   */


  updateOption(value, data) {
    var self = this;
    var item, item_new;
    var value_new, index_item, cache_items, cache_options, order_old;
    value = hash_key(value);
    value_new = hash_key(data[self.settings.valueField]); // sanity checks

    if (value === null) return;
    if (!self.options.hasOwnProperty(value)) return;
    if (typeof value_new !== 'string') throw new Error('Value must be set in option data');
    order_old = self.options[value].$order; // update references

    if (value_new !== value) {
      delete self.options[value];
      index_item = self.items.indexOf(value);

      if (index_item !== -1) {
        self.items.splice(index_item, 1, value_new);
      }
    }

    data.$order = data.$order || order_old;
    self.options[value_new] = data; // invalidate render cache

    cache_items = self.renderCache['item'];
    cache_options = self.renderCache['option'];

    if (cache_items) {
      delete cache_items[value];
      delete cache_items[value_new];
    }

    if (cache_options) {
      delete cache_options[value];
      delete cache_options[value_new];
    } // update the item if it's selected


    if (self.items.indexOf(value_new) !== -1) {
      item = self.getItem(value);
      item_new = self.render('item', data);
      if (item.classList.contains('active')) addClasses(item_new, 'active');
      item.parentNode.insertBefore(item_new, item);
      item.remove();
    } // invalidate last query because we might have updated the sortField


    self.lastQuery = null; // update dropdown contents

    if (self.isOpen) {
      self.refreshOptions(false);
    }
  }
  /**
   * Removes a single option.
   *
   */


  removeOption(value, silent) {
    var self = this;
    value = hash_key(value);
    var cache_items = self.renderCache['item'];
    var cache_options = self.renderCache['option'];
    if (cache_items) delete cache_items[value];
    if (cache_options) delete cache_options[value];
    delete self.userOptions[value];
    delete self.options[value];
    self.lastQuery = null;
    self.trigger('option_remove', value);
    self.removeItem(value, silent);
  }
  /**
   * Clears all options.
   */


  clearOptions() {
    this.loadedSearches = {};
    this.userOptions = {};
    this.clearCache();
    var selected = {};

    for (let key in this.options) {
      if (this.options.hasOwnProperty(key) && this.items.indexOf(key) >= 0) {
        selected[key] = this.options[key];
      }
    }

    this.options = this.sifter.items = selected;
    this.lastQuery = null;
    this.trigger('option_clear');
  }
  /**
   * Returns the dom element of the option
   * matching the given value.
   *
   * @returns {object}
   */


  getOption(value) {
    // cached ?
    if (this.renderCache['option'].hasOwnProperty(value)) {
      return this.renderCache['option'][value];
    } // from existing dropdown menu dom


    return this.getElementWithValue(value, this.selectable());
  }
  /**
   * Returns the dom element of the next or previous dom element of the same type
   * Note: adjacent options may not be adjacent DOM elements (optgroups)
   *
   */


  getAdjacent(option, direction, type = 'option') {
    var self = this,
        all;

    if (!option) {
      return;
    }

    if (type == 'item') {
      all = self.controlChildren();
    } else {
      all = self.dropdown_content.querySelectorAll('[data-selectable]');
    }

    for (let i = 0; i < all.length; i++) {
      if (all[i] != option) {
        continue;
      }

      if (direction > 0) {
        return all[i + 1];
      }

      return all[i - 1];
    }
  }
  /**
   * Finds the first element with a "data-value" attribute
   * that matches the given value.
   *
   */


  getElementWithValue(value, els) {
    value = hash_key(value);

    if (value !== null) {
      for (const node of els) {
        let el = node;

        if (el.getAttribute('data-value') === value) {
          return el;
        }
      }
    }
  }
  /**
   * Returns the dom element of the item
   * matching the given value.
   *
   */


  getItem(value) {
    return this.getElementWithValue(value, this.control.children);
  }
  /**
   * "Selects" multiple items at once. Adds them to the list
   * at the current caret position.
   *
   */


  addItems(values, silent) {
    var self = this;
    self.buffer = document.createDocumentFragment();

    for (const child of self.control.children) {
      self.buffer.appendChild(child);
    }

    var items = Array.isArray(values) ? values : [values];
    items = items.filter(x => self.items.indexOf(x) === -1);

    for (let i = 0, n = items.length; i < n; i++) {
      self.isPending = i < n - 1;
      self.addItem(items[i], silent);
    }

    var control = self.control;
    control.insertBefore(self.buffer, control.firstChild);
    self.buffer = null;
  }
  /**
   * "Selects" an item. Adds it to the list
   * at the current caret position.
   *
   */


  addItem(value, silent) {
    var events = silent ? [] : ['change'];
    debounce_events(this, events, () => {
      var item;
      var self = this;
      var inputMode = self.settings.mode;
      var wasFull;
      value = hash_key(value);

      if (self.items.indexOf(value) !== -1) {
        if (inputMode === 'single') {
          self.close();
        }

        if (inputMode === 'single' || !self.settings.duplicates) {
          return;
        }
      }

      if (!self.options.hasOwnProperty(value)) return;
      if (inputMode === 'single') self.clear(silent);
      if (inputMode === 'multi' && self.isFull()) return;
      item = self.render('item', self.options[value]);

      if (self.control.contains(item)) {
        // duplicates
        item = item.cloneNode(true);
      }

      wasFull = self.isFull();
      self.items.splice(self.caretPos, 0, value);
      self.insertAtCaret(item);

      if (self.isSetup) {
        let options = self.selectable(); // update menu / remove the option (if this is not one item being added as part of series)

        if (!self.isPending) {
          let option = self.getOption(value);
          let next = self.getAdjacent(option, 1);
          self.refreshOptions(self.isFocused && inputMode !== 'single');

          if (next) {
            self.setActiveOption(next);
          }
        } // hide the menu if the maximum number of items have been selected or no options are left


        if (!options.length || self.isFull()) {
          self.close();
        } else if (!self.isPending) {
          self.positionDropdown();
        }

        self.trigger('item_add', value, item);

        if (!self.isPending) {
          self.updateOriginalInput({
            silent: silent
          });
        }
      }

      if (!self.isPending || !wasFull && self.isFull()) {
        self.refreshState();
      }
    });
  }
  /**
   * Removes the selected item matching
   * the provided value.
   *
   */


  removeItem(value, silent) {
    var i,
        idx,
        self = this;
    var item = self.getItem(value);
    if (!item) return;
    value = hash_key(item.dataset.value);
    i = self.items.indexOf(value);

    if (i !== -1) {
      item.remove();

      if (item.classList.contains('active')) {
        idx = self.activeItems.indexOf(item);
        self.activeItems.splice(idx, 1);
        removeClasses(item, 'active');
      }

      self.items.splice(i, 1);
      self.lastQuery = null;

      if (!self.settings.persist && self.userOptions.hasOwnProperty(value)) {
        self.removeOption(value, silent);
      }

      if (i < self.caretPos) {
        self.setCaret(self.caretPos - 1);
      }

      self.updateOriginalInput({
        silent: silent
      });
      self.refreshState();
      self.positionDropdown();
      self.trigger('item_remove', value, item);
    }
  }
  /**
   * Invokes the `create` method provided in the
   * TomSelect options that should provide the data
   * for the new item, given the user input.
   *
   * Once this completes, it will be added
   * to the item list.
   *
   */


  createItem(input, triggerDropdown = true, callback) {
    var self = this;
    var caret = self.caretPos;
    var output;
    input = input || self.inputValue();
    if (typeof callback !== 'function') callback = () => {};

    if (!self.canCreate(input)) {
      callback();
      return false;
    }

    self.lock();
    var created = false;

    var create = data => {
      self.unlock();
      if (!data || typeof data !== 'object') return callback();
      var value = hash_key(data[self.settings.valueField]);

      if (typeof value !== 'string') {
        return callback();
      }

      self.setTextboxValue();
      self.addOption(data);
      self.setCaret(caret);
      self.addItem(value);
      self.refreshOptions(triggerDropdown && self.settings.mode !== 'single');
      callback(data);
      created = true;
    };

    if (typeof self.settings.create === 'function') {
      output = self.settings.create.call(this, input, create);
    } else {
      output = {
        [self.settings.labelField]: input,
        [self.settings.valueField]: input
      };
    }

    if (!created) {
      create(output);
    }

    return true;
  }
  /**
   * Re-renders the selected item lists.
   */


  refreshItems() {
    var self = this;
    self.lastQuery = null;

    if (self.isSetup) {
      self.addItems(self.items);
    }

    self.updateOriginalInput();
    self.refreshState();
  }
  /**
   * Updates all state-dependent attributes
   * and CSS classes.
   */


  refreshState() {
    var self = this;
    self.refreshValidityState();
    var isFull = self.isFull();
    var isLocked = self.isLocked;
    self.wrapper.classList.toggle('rtl', self.rtl);
    var classList = self.control.classList;
    classList.toggle('focus', self.isFocused);
    classList.toggle('disabled', self.isDisabled);
    classList.toggle('required', self.isRequired);
    classList.toggle('invalid', self.isInvalid);
    classList.toggle('locked', isLocked);
    classList.toggle('full', isFull);
    classList.toggle('not-full', !isFull);
    classList.toggle('input-active', self.isFocused && !self.isInputHidden);
    classList.toggle('dropdown-active', self.isOpen);
    classList.toggle('has-options', isEmptyObject(self.options));
    classList.toggle('has-items', self.items.length > 0);
  }
  /**
   * Update the `required` attribute of both input and control input.
   *
   * The `required` property needs to be activated on the control input
   * for the error to be displayed at the right place. `required` also
   * needs to be temporarily deactivated on the input since the input is
   * hidden and can't show errors.
   */


  refreshValidityState() {
    var self = this;

    if (!self.input.checkValidity) {
      return;
    } // if required, make sure the input required attribute = true so checkValidity() will work


    if (this.isRequired) {
      self.input.required = true;
    }

    var invalid = !self.input.checkValidity();
    self.isInvalid = invalid;
    self.control_input.required = invalid;

    if (this.isRequired) {
      self.input.required = !invalid;
    }
  }
  /**
   * Determines whether or not more items can be added
   * to the control without exceeding the user-defined maximum.
   *
   * @returns {boolean}
   */


  isFull() {
    return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
  }
  /**
   * Refreshes the original <select> or <input>
   * element to reflect the current state.
   *
   */


  updateOriginalInput(opts = {}) {
    var i,
        value,
        option,
        self = this;

    if (self.is_select_tag) {
      // remove selected attribute from options whose values are not in self.items
      self.input.querySelectorAll('option[selected]').forEach(option => {
        if (self.items.indexOf(option.value) == -1) {
          option.removeAttribute('selected');
        }
      }); // order selected <option> tags for values in self.items

      for (i = self.items.length - 1; i >= 0; i--) {
        value = self.items[i];
        var option = self.options[value].$option;

        if (!option) {
          const label = self.options[value][self.settings.labelField] || '';
          option = getDom('<option value="' + escape_html(value) + '">' + escape_html(label) + '</option>');
          self.options[value].$option = option;
        }

        setAttr(option, {
          selected: 'true'
        });
        self.input.prepend(option);
      }
    } else {
      self.input.value = self.getValue();
    }

    if (self.isSetup) {
      if (!opts.silent) {
        self.trigger('change', self.getValue());
      }
    }
  }
  /**
   * Shows the autocomplete dropdown containing
   * the available options.
   */


  open() {
    var self = this;
    if (self.isLocked || self.isOpen || self.settings.mode === 'multi' && self.isFull()) return;
    self.isOpen = true;
    setAttr(self.control_input, {
      'aria-expanded': 'true'
    });
    self.refreshState();
    applyCSS(self.dropdown, {
      visibility: 'hidden',
      display: 'block'
    });
    self.positionDropdown();
    applyCSS(self.dropdown, {
      visibility: 'visible',
      display: 'block'
    });
    self.focus();
    self.trigger('dropdown_open', self.dropdown);
  }
  /**
   * Closes the autocomplete dropdown menu.
   */


  close() {
    var self = this;
    var trigger = self.isOpen;

    if (self.settings.mode === 'single' && self.items.length) {
      self.hideInput(); // Do not trigger blur while inside a blur event,
      // this fixes some weird tabbing behavior in FF and IE.
      // See #selectize.js#1164

      if (!self.tab_key) {
        self.blur(); // close keyboard on iOS
      }
    }

    self.isOpen = false;
    setAttr(self.control_input, {
      'aria-expanded': 'false'
    });
    applyCSS(self.dropdown, {
      display: 'none'
    });
    self.clearActiveOption();
    self.refreshState();
    self.setTextboxValue();
    if (trigger) self.trigger('dropdown_close', self.dropdown);
  }
  /**
   * Calculates and applies the appropriate
   * position of the dropdown if dropdownParent = 'body'.
   * Otherwise, position is determined by css
   */


  positionDropdown() {
    if (this.settings.dropdownParent !== 'body') {
      return;
    }

    var context = this.control;
    var rect = context.getBoundingClientRect();
    var top = context.offsetHeight + rect.top + window.scrollY;
    var left = rect.left + window.scrollX;
    applyCSS(this.dropdown, {
      width: rect.width + 'px',
      top: top + 'px',
      left: left + 'px'
    });
  }
  /**
   * Resets / clears all selected items
   * from the control.
   *
   */


  clear(silent) {
    var self = this;
    if (!self.items.length) return;
    var items = self.controlChildren();

    for (const item of items) {
      item.remove();
    }

    self.items = [];
    self.lastQuery = null;
    self.setCaret(0);
    self.setActiveItem();
    self.updateOriginalInput({
      silent: silent
    });
    self.refreshState();
    self.showInput();
    self.trigger('clear');
  }
  /**
   * A helper method for inserting an element
   * at the current caret position.
   *
   */


  insertAtCaret(el) {
    var self = this;
    var caret = Math.min(self.caretPos, self.items.length);
    var target = self.buffer || self.control;

    if (caret === 0) {
      target.insertBefore(el, target.firstChild);
    } else {
      target.insertBefore(el, target.children[caret]);
    }

    self.setCaret(caret + 1);
  }
  /**
   * Removes the current selected item(s).
   *
   */


  deleteSelection(e) {
    var direction, selection, values, caret, tail;
    var self = this;
    direction = e && e.keyCode === KEY_BACKSPACE ? -1 : 1;
    selection = getSelection(self.control_input); // determine items that will be removed

    values = [];

    if (self.activeItems.length) {
      tail = getTail(self.activeItems, direction);
      caret = nodeIndex(tail);

      if (direction > 0) {
        caret++;
      }

      for (const item of self.activeItems) {
        values.push(item.dataset.value);
      }
    } else if ((self.isFocused || self.settings.mode === 'single') && self.items.length) {
      if (direction < 0 && selection.start === 0 && selection.length === 0) {
        values.push(self.items[self.caretPos - 1]);
      } else if (direction > 0 && selection.start === self.inputValue().length) {
        values.push(self.items[self.caretPos]);
      }
    } // allow the callback to abort


    if (!values.length || typeof self.settings.onDelete === 'function' && self.settings.onDelete.call(self, values, e) === false) {
      return false;
    }

    preventDefault(e, true); // perform removal

    if (typeof caret !== 'undefined') {
      self.setCaret(caret);
    }

    while (values.length) {
      self.removeItem(values.pop());
    }

    self.showInput();
    self.positionDropdown();
    self.refreshOptions(false);
    return true;
  }
  /**
   * Selects the previous / next item (depending on the `direction` argument).
   *
   * > 0 - right
   * < 0 - left
   *
   */


  advanceSelection(direction, e) {
    var idx,
        last_active,
        adjacent,
        self = this;
    if (self.rtl) direction *= -1;
    if (self.inputValue().length) return; // add or remove to active items

    if (isKeyDown(KEY_SHORTCUT, e) || isKeyDown('shiftKey', e)) {
      last_active = self.getLastActive(direction);

      if (last_active) {
        if (!last_active.classList.contains('active')) {
          adjacent = last_active;
        } else {
          adjacent = self.getAdjacent(last_active, direction, 'item');
        } // if no active item, get items adjacent to the control input

      } else if (direction > 0) {
        adjacent = self.control_input.nextElementSibling;
      } else {
        adjacent = self.control_input.previousElementSibling;
      }

      if (adjacent) {
        if (adjacent.classList.contains('active')) {
          self.removeActiveItem(last_active);
        }

        self.setActiveItemClass(adjacent); // mark as last_active !! after removeActiveItem() on last_active
      } // move caret to the left or right

    } else if (self.isFocused && !self.activeItems.length) {
      self.setCaret(self.caretPos + direction); // move caret before or after selected items
    } else {
      last_active = self.getLastActive(direction);

      if (last_active) {
        idx = nodeIndex(last_active);
        self.setCaret(direction > 0 ? idx + 1 : idx);
        self.setActiveItem();
      }
    }
  }
  /**
   * Get the last active item
   *
   */


  getLastActive(direction) {
    let last_active = this.control.querySelector('.last-active');

    if (last_active) {
      return last_active;
    }

    var result = this.control.querySelectorAll('.active');

    if (result) {
      return getTail(result, direction);
    }
  }
  /**
   * Moves the caret to the specified index.
   *
   * The input must be moved by leaving it in place and moving the
   * siblings, due to the fact that focus cannot be restored once lost
   * on mobile webkit devices
   *
   */


  setCaret(new_pos) {
    var self = this;

    if (self.settings.mode === 'single' || self.settings.controlInput) {
      new_pos = self.items.length;
    } else {
      new_pos = Math.max(0, Math.min(self.items.length, new_pos));

      if (new_pos != self.caretPos && !self.isPending) {
        self.controlChildren().forEach((child, j) => {
          if (j < new_pos) {
            self.control_input.insertAdjacentElement('beforebegin', child);
          } else {
            self.control.appendChild(child);
          }
        });
      }
    }

    self.caretPos = new_pos;
  }
  /**
   * Return list of item dom elements
   *
   */


  controlChildren() {
    return Array.from(this.control.getElementsByClassName(this.settings.itemClass));
  }
  /**
   * Disables user input on the control. Used while
   * items are being asynchronously created.
   */


  lock() {
    this.close();
    this.isLocked = true;
    this.refreshState();
  }
  /**
   * Re-enables user input on the control.
   */


  unlock() {
    this.isLocked = false;
    this.refreshState();
  }
  /**
   * Disables user input on the control completely.
   * While disabled, it cannot receive focus.
   */


  disable() {
    var self = this;
    self.input.disabled = true;
    self.control_input.disabled = true;
    self.control_input.tabIndex = -1;
    self.isDisabled = true;
    self.lock();
  }
  /**
   * Enables the control so that it can respond
   * to focus and user input.
   */


  enable() {
    var self = this;
    self.input.disabled = false;
    self.control_input.disabled = false;
    self.control_input.tabIndex = self.tabIndex;
    self.isDisabled = false;
    self.unlock();
  }
  /**
   * Completely destroys the control and
   * unbinds all event listeners so that it can
   * be garbage collected.
   */


  destroy() {
    var self = this;
    var revertSettings = self.revertSettings;
    self.trigger('destroy');
    self.off();
    self.wrapper.remove();
    self.dropdown.remove();
    self.input.innerHTML = revertSettings.innerHTML;
    self.input.tabIndex = revertSettings.tabIndex;
    removeClasses(self.input, 'tomselected');
    self.input.removeAttribute('hidden');
    self.input.required = this.isRequired;

    self._destroy();

    delete self.input.tomselect;
  }
  /**
   * A helper method for rendering "item" and
   * "option" templates, given the data.
   *
   */


  render(templateName, data) {
    var value, id, html;
    var self = this;

    if (templateName === 'option' || templateName === 'item') {
      value = hash_key(data[self.settings.valueField]); // pull markup from cache if it exists

      if (self.renderCache[templateName].hasOwnProperty(value)) {
        return self.renderCache[templateName][value];
      }
    }

    var template = self.settings.render[templateName];

    if (typeof template !== 'function') {
      return null;
    } // render markup


    html = template.call(this, data, escape_html);

    if (!html) {
      return html;
    }

    html = getDom(html); // add mandatory attributes

    if (templateName === 'option' || templateName === 'option_create') {
      if (data[self.settings.disabledField]) {
        setAttr(html, {
          'aria-disabled': 'true'
        });
      } else {
        setAttr(html, {
          'data-selectable': ''
        });
      }
    } else if (templateName === 'optgroup') {
      id = data.group[self.settings.optgroupValueField];
      setAttr(html, {
        'data-group': id
      });

      if (data.group[self.settings.disabledField]) {
        setAttr(html, {
          'data-disabled': ''
        });
      }
    }

    if (templateName === 'option' || templateName === 'item') {
      setAttr(html, {
        'data-value': value
      }); // make sure we have some classes if a template is overwritten

      if (templateName === 'item') {
        addClasses(html, self.settings.itemClass);
      } else {
        addClasses(html, self.settings.optionClass);
        setAttr(html, {
          role: 'option',
          id: data.$id
        });
      } // update cache


      self.renderCache[templateName][value] = html;
    }

    return html;
  }
  /**
   * Clears the render cache for a template. If
   * no template is given, clears all render
   * caches.
   *
   */


  clearCache(templateName) {
    var self = this;

    if (templateName === void 0) {
      self.renderCache = {
        'item': {},
        'option': {}
      };
    } else {
      self.renderCache[templateName] = {};
    }
  }
  /**
   * Determines whether or not to display the
   * create item prompt, given a user input.
   *
   */


  canCreate(input) {
    return this.settings.create && input.length && this.settings.createFilter.call(this, input);
  }
  /**
   * Wraps this.`method` so that `new_fn` can be invoked 'before', 'after', or 'instead' of the original method
   *
   * this.hook('instead','onKeyDown',function( arg1, arg2 ...){
   *
   * });
   */


  hook(when, method, new_fn) {
    var self = this;
    var orig_method = self[method];

    self[method] = function () {
      var result, result_new;

      if (when === 'after') {
        result = orig_method.apply(self, arguments);
      }

      result_new = new_fn.apply(self, arguments);

      if (when === 'instead') {
        return result_new;
      }

      if (when === 'before') {
        result = orig_method.apply(self, arguments);
      }

      return result;
    };
  }

}

export default TomSelect;
//# sourceMappingURL=tom-select.js.map
