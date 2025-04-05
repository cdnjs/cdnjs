import MicroEvent from "./contrib/microevent.js";
import MicroPlugin from "./contrib/microplugin.js";
import { Sifter } from '@orchidjs/sifter';
import { escape_regex } from '@orchidjs/unicode-variants';
import { highlight, removeHighlight } from "./contrib/highlight.js";
import * as constants from "./constants.js";
import getSettings from "./getSettings.js";
import { hash_key, get_hash, escape_html, debounce_events, getSelection, preventDefault, addEvent, loadDebounce, timeout, isKeyDown, getId, addSlashes, append, iterate } from "./utils.js";
import { getDom, isHtmlString, escapeQuery, triggerEvent, applyCSS, addClasses, removeClasses, parentMatch, getTail, isEmptyObject, nodeIndex, setAttr, replaceNode } from "./vanilla.js";
var instance_i = 0;
export default class TomSelect extends MicroPlugin(MicroEvent) {
    constructor(input_arg, user_settings) {
        super();
        this.order = 0;
        this.isOpen = false;
        this.isDisabled = false;
        this.isReadOnly = false;
        this.isInvalid = false; // @deprecated 1.8
        this.isValid = true;
        this.isLocked = false;
        this.isFocused = false;
        this.isInputHidden = false;
        this.isSetup = false;
        this.ignoreFocus = false;
        this.ignoreHover = false;
        this.hasOptions = false;
        this.lastValue = '';
        this.caretPos = 0;
        this.loading = 0;
        this.loadedSearches = {};
        this.activeOption = null;
        this.activeItems = [];
        this.optgroups = {};
        this.options = {};
        this.userOptions = {};
        this.items = [];
        this.refreshTimeout = null;
        instance_i++;
        var dir;
        var input = getDom(input_arg);
        if (input.tomselect) {
            throw new Error('Tom Select already initialized on this element');
        }
        input.tomselect = this;
        // detect rtl environment
        var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
        dir = computedStyle.getPropertyValue('direction');
        // setup default state
        const settings = getSettings(input, user_settings);
        this.settings = settings;
        this.input = input;
        this.tabIndex = input.tabIndex || 0;
        this.is_select_tag = input.tagName.toLowerCase() === 'select';
        this.rtl = /rtl/i.test(dir);
        this.inputId = getId(input, 'tomselect-' + instance_i);
        this.isRequired = input.required;
        // search system
        this.sifter = new Sifter(this.options, { diacritics: settings.diacritics });
        // option-dependent defaults
        settings.mode = settings.mode || (settings.maxItems === 1 ? 'single' : 'multi');
        if (typeof settings.hideSelected !== 'boolean') {
            settings.hideSelected = settings.mode === 'multi';
        }
        if (typeof settings.hidePlaceholder !== 'boolean') {
            settings.hidePlaceholder = settings.mode !== 'multi';
        }
        // set up createFilter callback
        var filter = settings.createFilter;
        if (typeof filter !== 'function') {
            if (typeof filter === 'string') {
                filter = new RegExp(filter);
            }
            if (filter instanceof RegExp) {
                settings.createFilter = (input) => filter.test(input);
            }
            else {
                settings.createFilter = (value) => {
                    return this.settings.duplicates || !this.options[value];
                };
            }
        }
        this.initializePlugins(settings.plugins);
        this.setupCallbacks();
        this.setupTemplates();
        // Create all elements
        const wrapper = getDom('<div>');
        const control = getDom('<div>');
        const dropdown = this._render('dropdown');
        const dropdown_content = getDom(`<div role="listbox" tabindex="-1">`);
        const classes = this.input.getAttribute('class') || '';
        const inputMode = settings.mode;
        var control_input;
        addClasses(wrapper, settings.wrapperClass, classes, inputMode);
        addClasses(control, settings.controlClass);
        append(wrapper, control);
        addClasses(dropdown, settings.dropdownClass, inputMode);
        if (settings.copyClassesToDropdown) {
            addClasses(dropdown, classes);
        }
        addClasses(dropdown_content, settings.dropdownContentClass);
        append(dropdown, dropdown_content);
        getDom(settings.dropdownParent || wrapper).appendChild(dropdown);
        // default controlInput
        if (isHtmlString(settings.controlInput)) {
            control_input = getDom(settings.controlInput);
            // set attributes
            var attrs = ['autocorrect', 'autocapitalize', 'autocomplete', 'spellcheck'];
            iterate(attrs, (attr) => {
                if (input.getAttribute(attr)) {
                    setAttr(control_input, { [attr]: input.getAttribute(attr) });
                }
            });
            control_input.tabIndex = -1;
            control.appendChild(control_input);
            this.focus_node = control_input;
            // dom element
        }
        else if (settings.controlInput) {
            control_input = getDom(settings.controlInput);
            this.focus_node = control_input;
        }
        else {
            control_input = getDom('<input/>');
            this.focus_node = control;
        }
        this.wrapper = wrapper;
        this.dropdown = dropdown;
        this.dropdown_content = dropdown_content;
        this.control = control;
        this.control_input = control_input;
        this.setup();
    }
    /**
     * set up event bindings.
     *
     */
    setup() {
        const self = this;
        const settings = self.settings;
        const control_input = self.control_input;
        const dropdown = self.dropdown;
        const dropdown_content = self.dropdown_content;
        const wrapper = self.wrapper;
        const control = self.control;
        const input = self.input;
        const focus_node = self.focus_node;
        const passive_event = { passive: true };
        const listboxId = self.inputId + '-ts-dropdown';
        setAttr(dropdown_content, {
            id: listboxId
        });
        setAttr(focus_node, {
            role: 'combobox',
            'aria-haspopup': 'listbox',
            'aria-expanded': 'false',
            'aria-controls': listboxId
        });
        const control_id = getId(focus_node, self.inputId + '-ts-control');
        const query = "label[for='" + escapeQuery(self.inputId) + "']";
        const label = document.querySelector(query);
        const label_click = self.focus.bind(self);
        if (label) {
            addEvent(label, 'click', label_click);
            setAttr(label, { for: control_id });
            const label_id = getId(label, self.inputId + '-ts-label');
            setAttr(focus_node, { 'aria-labelledby': label_id });
            setAttr(dropdown_content, { 'aria-labelledby': label_id });
        }
        wrapper.style.width = input.style.width;
        if (self.plugins.names.length) {
            const classes_plugins = 'plugin-' + self.plugins.names.join(' plugin-');
            addClasses([wrapper, dropdown], classes_plugins);
        }
        if ((settings.maxItems === null || settings.maxItems > 1) && self.is_select_tag) {
            setAttr(input, { multiple: 'multiple' });
        }
        if (settings.placeholder) {
            setAttr(control_input, { placeholder: settings.placeholder });
        }
        // if splitOn was not passed in, construct it from the delimiter to allow pasting universally
        if (!settings.splitOn && settings.delimiter) {
            settings.splitOn = new RegExp('\\s*' + escape_regex(settings.delimiter) + '+\\s*');
        }
        // debounce user defined load() if loadThrottle > 0
        // after initializePlugins() so plugins can create/modify user defined loaders
        if (settings.load && settings.loadThrottle) {
            settings.load = loadDebounce(settings.load, settings.loadThrottle);
        }
        addEvent(dropdown, 'mousemove', () => {
            self.ignoreHover = false;
        });
        addEvent(dropdown, 'mouseenter', (e) => {
            var target_match = parentMatch(e.target, '[data-selectable]', dropdown);
            if (target_match)
                self.onOptionHover(e, target_match);
        }, { capture: true });
        // clicking on an option should select it
        addEvent(dropdown, 'click', (evt) => {
            const option = parentMatch(evt.target, '[data-selectable]');
            if (option) {
                self.onOptionSelect(evt, option);
                preventDefault(evt, true);
            }
        });
        addEvent(control, 'click', (evt) => {
            var target_match = parentMatch(evt.target, '[data-ts-item]', control);
            if (target_match && self.onItemSelect(evt, target_match)) {
                preventDefault(evt, true);
                return;
            }
            // retain focus (see control_input mousedown)
            if (control_input.value != '') {
                return;
            }
            self.onClick();
            preventDefault(evt, true);
        });
        // keydown on focus_node for arrow_down/arrow_up
        addEvent(focus_node, 'keydown', (e) => self.onKeyDown(e));
        // keypress and input/keyup
        addEvent(control_input, 'keypress', (e) => self.onKeyPress(e));
        addEvent(control_input, 'input', (e) => self.onInput(e));
        addEvent(focus_node, 'blur', (e) => self.onBlur(e));
        addEvent(focus_node, 'focus', (e) => self.onFocus(e));
        addEvent(control_input, 'paste', (e) => self.onPaste(e));
        const doc_mousedown = (evt) => {
            // blur if target is outside of this instance
            // dropdown is not always inside wrapper
            const target = evt.composedPath()[0];
            if (!wrapper.contains(target) && !dropdown.contains(target)) {
                if (self.isFocused) {
                    self.blur();
                }
                self.inputState();
                return;
            }
            // retain focus by preventing native handling. if the
            // event target is the input it should not be modified.
            // otherwise, text selection within the input won't work.
            // Fixes bug #212 which is no covered by tests
            if (target == control_input && self.isOpen) {
                evt.stopPropagation();
                // clicking anywhere in the control should not blur the control_input (which would close the dropdown)
            }
            else {
                preventDefault(evt, true);
            }
        };
        const win_scroll = () => {
            if (self.isOpen) {
                self.positionDropdown();
            }
        };
        addEvent(document, 'mousedown', doc_mousedown);
        addEvent(window, 'scroll', win_scroll, passive_event);
        addEvent(window, 'resize', win_scroll, passive_event);
        this._destroy = () => {
            document.removeEventListener('mousedown', doc_mousedown);
            window.removeEventListener('scroll', win_scroll);
            window.removeEventListener('resize', win_scroll);
            if (label)
                label.removeEventListener('click', label_click);
        };
        // store original html and tab index so that they can be
        // restored when the destroy() method is called.
        this.revertSettings = {
            innerHTML: input.innerHTML,
            tabIndex: input.tabIndex
        };
        input.tabIndex = -1;
        input.insertAdjacentElement('afterend', self.wrapper);
        self.sync(false);
        settings.items = [];
        delete settings.optgroups;
        delete settings.options;
        addEvent(input, 'invalid', () => {
            if (self.isValid) {
                self.isValid = false;
                self.isInvalid = true;
                self.refreshState();
            }
        });
        self.updateOriginalInput();
        self.refreshItems();
        self.close(false);
        self.inputState();
        self.isSetup = true;
        if (input.disabled) {
            self.disable();
        }
        else if (input.readOnly) {
            self.setReadOnly(true);
        }
        else {
            self.enable(); //sets tabIndex
        }
        self.on('change', this.onChange);
        addClasses(input, 'tomselected', 'ts-hidden-accessible');
        self.trigger('initialize');
        // preload options
        if (settings.preload === true) {
            self.preload();
        }
    }
    /**
     * Register options and optgroups
     *
     */
    setupOptions(options = [], optgroups = []) {
        // build options table
        this.addOptions(options);
        // build optgroup table
        iterate(optgroups, (optgroup) => {
            this.registerOptionGroup(optgroup);
        });
    }
    /**
     * Sets up default rendering functions.
     */
    setupTemplates() {
        var self = this;
        var field_label = self.settings.labelField;
        var field_optgroup = self.settings.optgroupLabelField;
        var templates = {
            'optgroup': (data) => {
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
            'no_results': () => {
                return '<div class="no-results">No results found</div>';
            },
            'loading': () => {
                return '<div class="spinner"></div>';
            },
            'not_loading': () => { },
            'dropdown': () => {
                return '<div></div>';
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
            'item_select': 'onItemSelect',
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
            if (fn)
                this.on(key, fn);
        }
    }
    /**
     * Sync the Tom Select instance with the original input or select
     *
     */
    sync(get_settings = true) {
        const self = this;
        const settings = get_settings ? getSettings(self.input, { delimiter: self.settings.delimiter }) : self.settings;
        self.setupOptions(settings.options, settings.optgroups);
        self.setValue(settings.items || [], true); // silent prevents recursion
        self.lastQuery = null; // so updated options will be displayed in dropdown
    }
    /**
     * Triggered when the main control element
     * has a click event.
     *
     */
    onClick() {
        var self = this;
        if (self.activeItems.length > 0) {
            self.clearActiveItems();
            self.focus();
            return;
        }
        if (self.isFocused && self.isOpen) {
            self.blur();
        }
        else {
            self.focus();
        }
    }
    /**
     * @deprecated v1.7
     *
     */
    onMouseDown() { }
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
        if (self.isInputHidden || self.isLocked) {
            preventDefault(e);
            return;
        }
        // If a regex or string is included, this will split the pasted
        // input and create Items for each separate value
        if (!self.settings.splitOn) {
            return;
        }
        // Wait for pasted text to be recognized in value
        setTimeout(() => {
            var pastedText = self.inputValue();
            if (!pastedText.match(self.settings.splitOn)) {
                return;
            }
            var splitInput = pastedText.trim().split(self.settings.splitOn);
            iterate(splitInput, (piece) => {
                const hash = hash_key(piece);
                if (hash) {
                    if (this.options[piece]) {
                        self.addItem(piece);
                    }
                    else {
                        self.createItem(piece);
                    }
                }
            });
        }, 0);
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
        self.ignoreHover = true;
        if (self.isLocked) {
            if (e.keyCode !== constants.KEY_TAB) {
                preventDefault(e);
            }
            return;
        }
        switch (e.keyCode) {
            // ctrl+A: select all
            case constants.KEY_A:
                if (isKeyDown(constants.KEY_SHORTCUT, e)) {
                    if (self.control_input.value == '') {
                        preventDefault(e);
                        self.selectAll();
                        return;
                    }
                }
                break;
            // esc: close dropdown
            case constants.KEY_ESC:
                if (self.isOpen) {
                    preventDefault(e, true);
                    self.close();
                }
                self.clearActiveItems();
                return;
            // down: open dropdown or move selection down
            case constants.KEY_DOWN:
                if (!self.isOpen && self.hasOptions) {
                    self.open();
                }
                else if (self.activeOption) {
                    let next = self.getAdjacent(self.activeOption, 1);
                    if (next)
                        self.setActiveOption(next);
                }
                preventDefault(e);
                return;
            // up: move selection up
            case constants.KEY_UP:
                if (self.activeOption) {
                    let prev = self.getAdjacent(self.activeOption, -1);
                    if (prev)
                        self.setActiveOption(prev);
                }
                preventDefault(e);
                return;
            // return: select active option
            case constants.KEY_RETURN:
                if (self.canSelect(self.activeOption)) {
                    self.onOptionSelect(e, self.activeOption);
                    preventDefault(e);
                    // if the option_create=null, the dropdown might be closed
                }
                else if (self.settings.create && self.createItem()) {
                    preventDefault(e);
                    // don't submit form when searching for a value
                }
                else if (document.activeElement == self.control_input && self.isOpen) {
                    preventDefault(e);
                }
                return;
            // left: modifiy item selection to the left
            case constants.KEY_LEFT:
                self.advanceSelection(-1, e);
                return;
            // right: modifiy item selection to the right
            case constants.KEY_RIGHT:
                self.advanceSelection(1, e);
                return;
            // tab: select active option and/or create item
            case constants.KEY_TAB:
                if (self.settings.selectOnTab) {
                    if (self.canSelect(self.activeOption)) {
                        self.onOptionSelect(e, self.activeOption);
                        // prevent default [tab] behaviour of jump to the next field
                        // if select isFull, then the dropdown won't be open and [tab] will work normally
                        preventDefault(e);
                    }
                    if (self.settings.create && self.createItem()) {
                        preventDefault(e);
                    }
                }
                return;
            // delete|backspace: delete items
            case constants.KEY_BACKSPACE:
            case constants.KEY_DELETE:
                self.deleteSelection(e);
                return;
        }
        // don't enter text in the control_input when active items are selected
        if (self.isInputHidden && !isKeyDown(constants.KEY_SHORTCUT, e)) {
            preventDefault(e);
        }
    }
    /**
     * Triggered on <input> keyup.
     *
     */
    onInput(e) {
        if (this.isLocked) {
            return;
        }
        const value = this.inputValue();
        if (this.lastValue === value)
            return;
        this.lastValue = value;
        if (value == '') {
            this._onInput();
            return;
        }
        if (this.refreshTimeout) {
            window.clearTimeout(this.refreshTimeout);
        }
        this.refreshTimeout = timeout(() => {
            this.refreshTimeout = null;
            this._onInput();
        }, this.settings.refreshThrottle);
    }
    _onInput() {
        const value = this.lastValue;
        if (this.settings.shouldLoad.call(this, value)) {
            this.load(value);
        }
        this.refreshOptions();
        this.trigger('type', value);
    }
    /**
     * Triggered when the user rolls over
     * an option in the autocomplete dropdown menu.
     *
     */
    onOptionHover(evt, option) {
        if (this.ignoreHover)
            return;
        this.setActiveOption(option, false);
    }
    /**
     * Triggered on <input> focus.
     *
     */
    onFocus(e) {
        var self = this;
        var wasFocused = self.isFocused;
        if (self.isDisabled || self.isReadOnly) {
            self.blur();
            preventDefault(e);
            return;
        }
        if (self.ignoreFocus)
            return;
        self.isFocused = true;
        if (self.settings.preload === 'focus')
            self.preload();
        if (!wasFocused)
            self.trigger('focus');
        if (!self.activeItems.length) {
            self.inputState();
            self.refreshOptions(!!self.settings.openOnFocus);
        }
        self.refreshState();
    }
    /**
     * Triggered on <input> blur.
     *
     */
    onBlur(e) {
        if (document.hasFocus() === false)
            return;
        var self = this;
        if (!self.isFocused)
            return;
        self.isFocused = false;
        self.ignoreFocus = false;
        var deactivate = () => {
            self.close();
            self.setActiveItem();
            self.setCaret(self.items.length);
            self.trigger('blur');
        };
        if (self.settings.create && self.settings.createOnBlur) {
            self.createItem(null, deactivate);
        }
        else {
            deactivate();
        }
    }
    /**
     * Triggered when the user clicks on an option
     * in the autocomplete dropdown menu.
     *
     */
    onOptionSelect(evt, option) {
        var value, self = this;
        // should not be possible to trigger a option under a disabled optgroup
        if (option.parentElement && option.parentElement.matches('[data-disabled]')) {
            return;
        }
        if (option.classList.contains('create')) {
            self.createItem(null, () => {
                if (self.settings.closeAfterSelect) {
                    self.close();
                }
            });
        }
        else {
            value = option.dataset.value;
            if (typeof value !== 'undefined') {
                self.lastQuery = null;
                self.addItem(value);
                if (self.settings.closeAfterSelect) {
                    self.close();
                }
                if (!self.settings.hideSelected && evt.type && /click/.test(evt.type)) {
                    self.setActiveOption(option);
                }
            }
        }
    }
    /**
     * Return true if the given option can be selected
     *
     */
    canSelect(option) {
        if (this.isOpen && option && this.dropdown_content.contains(option)) {
            return true;
        }
        return false;
    }
    /**
     * Triggered when the user clicks on an item
     * that has been selected.
     *
     */
    onItemSelect(evt, item) {
        var self = this;
        if (!self.isLocked && self.settings.mode === 'multi') {
            preventDefault(evt);
            self.setActiveItem(item, evt);
            return true;
        }
        return false;
    }
    /**
     * Determines whether or not to invoke
     * the user-provided option provider / loader
     *
     * Note, there is a subtle difference between
     * this.canLoad() and this.settings.shouldLoad();
     *
     *	- settings.shouldLoad() is a user-input validator.
     *	When false is returned, the not_loading template
     *	will be added to the dropdown
     *
     *	- canLoad() is lower level validator that checks
     * 	the Tom Select instance. There is no inherent user
     *	feedback when canLoad returns false
     *
     */
    canLoad(value) {
        if (!this.settings.load)
            return false;
        if (this.loadedSearches.hasOwnProperty(value))
            return false;
        return true;
    }
    /**
     * Invokes the user-provided option provider / loader.
     *
     */
    load(value) {
        const self = this;
        if (!self.canLoad(value))
            return;
        addClasses(self.wrapper, self.settings.loadingClass);
        self.loading++;
        const callback = self.loadCallback.bind(self);
        self.settings.load.call(self, value, callback);
    }
    /**
     * Invoked by the user-provided option provider
     *
     */
    loadCallback(options, optgroups) {
        const self = this;
        self.loading = Math.max(self.loading - 1, 0);
        self.lastQuery = null;
        self.clearActiveOption(); // when new results load, focus should be on first option
        self.setupOptions(options, optgroups);
        self.refreshOptions(self.isFocused && !self.isInputHidden);
        if (!self.loading) {
            removeClasses(self.wrapper, self.settings.loadingClass);
        }
        self.trigger('load', options, optgroups);
    }
    preload() {
        var classList = this.wrapper.classList;
        if (classList.contains('preloaded'))
            return;
        classList.add('preloaded');
        this.load('');
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
        if (value === 0)
            value = null; //reset to unlimited items.
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
        if (self.settings.mode === 'single')
            return;
        // clear the active selection
        if (!item) {
            self.clearActiveItems();
            if (self.isFocused) {
                self.inputState();
            }
            return;
        }
        // modify selection
        eventName = e && e.type.toLowerCase();
        if (eventName === 'click' && isKeyDown('shiftKey', e) && self.activeItems.length) {
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
        }
        else if ((eventName === 'click' && isKeyDown(constants.KEY_SHORTCUT, e)) || (eventName === 'keydown' && isKeyDown('shiftKey', e))) {
            if (item.classList.contains('active')) {
                self.removeActiveItem(item);
            }
            else {
                self.setActiveItemClass(item);
            }
        }
        else {
            self.clearActiveItems();
            self.setActiveItemClass(item);
        }
        // ensure control has focus
        self.inputState();
        if (!self.isFocused) {
            self.focus();
        }
    }
    /**
     * Set the active and last-active classes
     *
     */
    setActiveItemClass(item) {
        const self = this;
        const last_active = self.control.querySelector('.last-active');
        if (last_active)
            removeClasses(last_active, 'last-active');
        addClasses(item, 'active last-active');
        self.trigger('item_select', item);
        if (self.activeItems.indexOf(item) == -1) {
            self.activeItems.push(item);
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
    setActiveOption(option, scroll = true) {
        if (option === this.activeOption) {
            return;
        }
        this.clearActiveOption();
        if (!option)
            return;
        this.activeOption = option;
        setAttr(this.focus_node, { 'aria-activedescendant': option.getAttribute('id') });
        setAttr(option, { 'aria-selected': 'true' });
        addClasses(option, 'active');
        if (scroll)
            this.scrollToOption(option);
    }
    /**
     * Sets the dropdown_content scrollTop to display the option
     *
     */
    scrollToOption(option, behavior) {
        if (!option)
            return;
        const content = this.dropdown_content;
        const height_menu = content.clientHeight;
        const scrollTop = content.scrollTop || 0;
        const height_item = option.offsetHeight;
        const y = option.getBoundingClientRect().top - content.getBoundingClientRect().top + scrollTop;
        if (y + height_item > height_menu + scrollTop) {
            this.scroll(y - height_menu + height_item, behavior);
        }
        else if (y < scrollTop) {
            this.scroll(y, behavior);
        }
    }
    /**
     * Scroll the dropdown to the given position
     *
     */
    scroll(scrollTop, behavior) {
        const content = this.dropdown_content;
        if (behavior) {
            content.style.scrollBehavior = behavior;
        }
        content.scrollTop = scrollTop;
        content.style.scrollBehavior = '';
    }
    /**
     * Clears the active option
     *
     */
    clearActiveOption() {
        if (this.activeOption) {
            removeClasses(this.activeOption, 'active');
            setAttr(this.activeOption, { 'aria-selected': null });
        }
        this.activeOption = null;
        setAttr(this.focus_node, { 'aria-activedescendant': null });
    }
    /**
     * Selects all items (CTRL + A).
     */
    selectAll() {
        const self = this;
        if (self.settings.mode === 'single')
            return;
        const activeItems = self.controlChildren();
        if (!activeItems.length)
            return;
        self.inputState();
        self.close();
        self.activeItems = activeItems;
        iterate(activeItems, (item) => {
            self.setActiveItemClass(item);
        });
    }
    /**
     * Determines if the control_input should be in a hidden or visible state
     *
     */
    inputState() {
        var self = this;
        if (!self.control.contains(self.control_input))
            return;
        setAttr(self.control_input, { placeholder: self.settings.placeholder });
        if (self.activeItems.length > 0 || (!self.isFocused && self.settings.hidePlaceholder && self.items.length > 0)) {
            self.setTextboxValue();
            self.isInputHidden = true;
        }
        else {
            if (self.settings.hidePlaceholder && self.items.length > 0) {
                setAttr(self.control_input, { placeholder: '' });
            }
            self.isInputHidden = false;
        }
        self.wrapper.classList.toggle('input-hidden', self.isInputHidden);
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
        if (self.isDisabled || self.isReadOnly)
            return;
        self.ignoreFocus = true;
        if (self.control_input.offsetWidth) {
            self.control_input.focus();
        }
        else {
            self.focus_node.focus();
        }
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
        this.focus_node.blur();
        this.onBlur();
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
     * @see https://github.com/orchidjs/sifter.js
     * @return {object}
     */
    getSearchOptions() {
        var settings = this.settings;
        var sort = settings.sortField;
        if (typeof settings.sortField === 'string') {
            sort = [{ field: settings.sortField }];
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
        var result, calculateScore;
        var self = this;
        var options = this.getSearchOptions();
        // validate user-provided result scoring function
        if (self.settings.score) {
            calculateScore = self.settings.score.call(self, query);
            if (typeof calculateScore !== 'function') {
                throw new Error('Tom Select "score" setting must be a function that returns a function');
            }
        }
        // perform search
        if (query !== self.lastQuery) {
            self.lastQuery = query;
            result = self.sifter.search(query, Object.assign(options, { score: calculateScore }));
            self.currentResults = result;
        }
        else {
            result = Object.assign({}, self.currentResults);
        }
        // filter out selected items
        if (self.settings.hideSelected) {
            result.items = result.items.filter((item) => {
                let hashed = hash_key(item.id);
                return !(hashed && self.items.indexOf(hashed) !== -1);
            });
        }
        return result;
    }
    /**
     * Refreshes the list of available options shown
     * in the autocomplete dropdown menu.
     *
     */
    refreshOptions(triggerDropdown = true) {
        var i, j, k, n, optgroup, optgroups, html, has_create_option, active_group;
        var create;
        const groups = {};
        const groups_order = [];
        var self = this;
        var query = self.inputValue();
        const same_query = query === self.lastQuery || (query == '' && self.lastQuery == null);
        var results = self.search(query);
        var active_option = null;
        var show_dropdown = self.settings.shouldOpen || false;
        var dropdown_content = self.dropdown_content;
        if (same_query) {
            active_option = self.activeOption;
            if (active_option) {
                active_group = active_option.closest('[data-group]');
            }
        }
        // build markup
        n = results.items.length;
        if (typeof self.settings.maxOptions === 'number') {
            n = Math.min(n, self.settings.maxOptions);
        }
        if (n > 0) {
            show_dropdown = true;
        }
        // get fragment for group and the position of the group in group_order
        const getGroupFragment = (optgroup, order) => {
            let group_order_i = groups[optgroup];
            if (group_order_i !== undefined) {
                let order_group = groups_order[group_order_i];
                if (order_group !== undefined) {
                    return [group_order_i, order_group.fragment];
                }
            }
            let group_fragment = document.createDocumentFragment();
            group_order_i = groups_order.length;
            groups_order.push({ fragment: group_fragment, order, optgroup });
            return [group_order_i, group_fragment];
        };
        // render and group available options individually
        for (i = 0; i < n; i++) {
            // get option dom element
            let item = results.items[i];
            if (!item)
                continue;
            let opt_value = item.id;
            let option = self.options[opt_value];
            if (option === undefined)
                continue;
            let opt_hash = get_hash(opt_value);
            let option_el = self.getOption(opt_hash, true);
            // toggle 'selected' class
            if (!self.settings.hideSelected) {
                option_el.classList.toggle('selected', self.items.includes(opt_hash));
            }
            optgroup = option[self.settings.optgroupField] || '';
            optgroups = Array.isArray(optgroup) ? optgroup : [optgroup];
            for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
                optgroup = optgroups[j];
                let order = option.$order;
                let self_optgroup = self.optgroups[optgroup];
                if (self_optgroup === undefined) {
                    optgroup = '';
                }
                else {
                    order = self_optgroup.$order;
                }
                const [group_order_i, group_fragment] = getGroupFragment(optgroup, order);
                // nodes can only have one parent, so if the option is in mutple groups, we need a clone
                if (j > 0) {
                    option_el = option_el.cloneNode(true);
                    setAttr(option_el, { id: option.$id + '-clone-' + j, 'aria-selected': null });
                    option_el.classList.add('ts-cloned');
                    removeClasses(option_el, 'active');
                    // make sure we keep the activeOption in the same group
                    if (self.activeOption && self.activeOption.dataset.value == opt_value) {
                        if (active_group && active_group.dataset.group === optgroup.toString()) {
                            active_option = option_el;
                        }
                    }
                }
                group_fragment.appendChild(option_el);
                if (optgroup != '') {
                    groups[optgroup] = group_order_i;
                }
            }
        }
        // sort optgroups
        if (self.settings.lockOptgroupOrder) {
            groups_order.sort((a, b) => {
                return a.order - b.order;
            });
        }
        // render optgroup headers & join groups
        html = document.createDocumentFragment();
        iterate(groups_order, (group_order) => {
            let group_fragment = group_order.fragment;
            let optgroup = group_order.optgroup;
            if (!group_fragment || !group_fragment.children.length)
                return;
            let group_heading = self.optgroups[optgroup];
            if (group_heading !== undefined) {
                let group_options = document.createDocumentFragment();
                let header = self.render('optgroup_header', group_heading);
                append(group_options, header);
                append(group_options, group_fragment);
                let group_html = self.render('optgroup', { group: group_heading, options: group_options });
                append(html, group_html);
            }
            else {
                append(html, group_fragment);
            }
        });
        dropdown_content.innerHTML = '';
        append(dropdown_content, html);
        // highlight matching terms inline
        if (self.settings.highlight) {
            removeHighlight(dropdown_content);
            if (results.query.length && results.tokens.length) {
                iterate(results.tokens, (tok) => {
                    highlight(dropdown_content, tok.regex);
                });
            }
        }
        // helper method for adding templates to dropdown
        var add_template = (template) => {
            let content = self.render(template, { input: query });
            if (content) {
                show_dropdown = true;
                dropdown_content.insertBefore(content, dropdown_content.firstChild);
            }
            return content;
        };
        // add loading message
        if (self.loading) {
            add_template('loading');
            // invalid query
        }
        else if (!self.settings.shouldLoad.call(self, query)) {
            add_template('not_loading');
            // add no_results message
        }
        else if (results.items.length === 0) {
            add_template('no_results');
        }
        // add create option
        has_create_option = self.canCreate(query);
        if (has_create_option) {
            create = add_template('option_create');
        }
        // activate
        self.hasOptions = results.items.length > 0 || has_create_option;
        if (show_dropdown) {
            if (results.items.length > 0) {
                if (!active_option && self.settings.mode === 'single' && self.items[0] != undefined) {
                    active_option = self.getOption(self.items[0]);
                }
                if (!dropdown_content.contains(active_option)) {
                    let active_index = 0;
                    if (create && !self.settings.addPrecedence) {
                        active_index = 1;
                    }
                    active_option = self.selectable()[active_index];
                }
            }
            else if (create) {
                active_option = create;
            }
            if (triggerDropdown && !self.isOpen) {
                self.open();
                self.scrollToOption(active_option, 'auto');
            }
            self.setActiveOption(active_option);
        }
        else {
            self.clearActiveOption();
            if (triggerDropdown && self.isOpen) {
                self.close(false); // if create_option=null, we want the dropdown to close but not reset the textbox value
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
    addOption(data, user_created = false) {
        const self = this;
        // @deprecated 1.7.7
        // use addOptions( array, user_created ) for adding multiple options
        if (Array.isArray(data)) {
            self.addOptions(data, user_created);
            return false;
        }
        const key = hash_key(data[self.settings.valueField]);
        if (key === null || self.options.hasOwnProperty(key)) {
            return false;
        }
        data.$order = data.$order || ++self.order;
        data.$id = self.inputId + '-opt-' + data.$order;
        self.options[key] = data;
        self.lastQuery = null;
        if (user_created) {
            self.userOptions[key] = user_created;
            self.trigger('option_add', key, data);
        }
        return key;
    }
    /**
     * Add multiple options
     *
     */
    addOptions(data, user_created = false) {
        iterate(data, (dat) => {
            this.addOption(dat, user_created);
        });
    }
    /**
     * @deprecated 1.7.7
     */
    registerOption(data) {
        return this.addOption(data);
    }
    /**
     * Registers an option group to the pool of option groups.
     *
     * @return {boolean|string}
     */
    registerOptionGroup(data) {
        var key = hash_key(data[this.settings.optgroupValueField]);
        if (key === null)
            return false;
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
        const self = this;
        var item_new;
        var index_item;
        const value_old = hash_key(value);
        const value_new = hash_key(data[self.settings.valueField]);
        // sanity checks
        if (value_old === null)
            return;
        const data_old = self.options[value_old];
        if (data_old == undefined)
            return;
        if (typeof value_new !== 'string')
            throw new Error('Value must be set in option data');
        const option = self.getOption(value_old);
        const item = self.getItem(value_old);
        data.$order = data.$order || data_old.$order;
        delete self.options[value_old];
        // invalidate render cache
        // don't remove existing node yet, we'll remove it after replacing it
        self.uncacheValue(value_new);
        self.options[value_new] = data;
        // update the option if it's in the dropdown
        if (option) {
            if (self.dropdown_content.contains(option)) {
                const option_new = self._render('option', data);
                replaceNode(option, option_new);
                if (self.activeOption === option) {
                    self.setActiveOption(option_new);
                }
            }
            option.remove();
        }
        // update the item if we have one
        if (item) {
            index_item = self.items.indexOf(value_old);
            if (index_item !== -1) {
                self.items.splice(index_item, 1, value_new);
            }
            item_new = self._render('item', data);
            if (item.classList.contains('active'))
                addClasses(item_new, 'active');
            replaceNode(item, item_new);
        }
        // invalidate last query because we might have updated the sortField
        self.lastQuery = null;
    }
    /**
     * Removes a single option.
     *
     */
    removeOption(value, silent) {
        const self = this;
        value = get_hash(value);
        self.uncacheValue(value);
        delete self.userOptions[value];
        delete self.options[value];
        self.lastQuery = null;
        self.trigger('option_remove', value);
        self.removeItem(value, silent);
    }
    /**
     * Clears all options.
     */
    clearOptions(filter) {
        const boundFilter = (filter || this.clearFilter).bind(this);
        this.loadedSearches = {};
        this.userOptions = {};
        this.clearCache();
        const selected = {};
        iterate(this.options, (option, key) => {
            if (boundFilter(option, key)) {
                selected[key] = option;
            }
        });
        this.options = this.sifter.items = selected;
        this.lastQuery = null;
        this.trigger('option_clear');
    }
    /**
     * Used by clearOptions() to decide whether or not an option should be removed
     * Return true to keep an option, false to remove
     *
     */
    clearFilter(option, value) {
        if (this.items.indexOf(value) >= 0) {
            return true;
        }
        return false;
    }
    /**
     * Returns the dom element of the option
     * matching the given value.
     *
     */
    getOption(value, create = false) {
        const hashed = hash_key(value);
        if (hashed === null)
            return null;
        const option = this.options[hashed];
        if (option != undefined) {
            if (option.$div) {
                return option.$div;
            }
            if (create) {
                return this._render('option', option);
            }
        }
        return null;
    }
    /**
     * Returns the dom element of the next or previous dom element of the same type
     * Note: adjacent options may not be adjacent DOM elements (optgroups)
     *
     */
    getAdjacent(option, direction, type = 'option') {
        var self = this, all;
        if (!option) {
            return null;
        }
        if (type == 'item') {
            all = self.controlChildren();
        }
        else {
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
        return null;
    }
    /**
     * Returns the dom element of the item
     * matching the given value.
     *
     */
    getItem(item) {
        if (typeof item == 'object') {
            return item;
        }
        var value = hash_key(item);
        return value !== null
            ? this.control.querySelector(`[data-value="${addSlashes(value)}"]`)
            : null;
    }
    /**
     * "Selects" multiple items at once. Adds them to the list
     * at the current caret position.
     *
     */
    addItems(values, silent) {
        var self = this;
        var items = Array.isArray(values) ? values : [values];
        items = items.filter(x => self.items.indexOf(x) === -1);
        const last_item = items[items.length - 1];
        items.forEach(item => {
            self.isPending = (item !== last_item);
            self.addItem(item, silent);
        });
    }
    /**
     * "Selects" an item. Adds it to the list
     * at the current caret position.
     *
     */
    addItem(value, silent) {
        var events = silent ? [] : ['change', 'dropdown_close'];
        debounce_events(this, events, () => {
            var item, wasFull;
            const self = this;
            const inputMode = self.settings.mode;
            const hashed = hash_key(value);
            if (hashed && self.items.indexOf(hashed) !== -1) {
                if (inputMode === 'single') {
                    self.close();
                }
                if (inputMode === 'single' || !self.settings.duplicates) {
                    return;
                }
            }
            if (hashed === null || !self.options.hasOwnProperty(hashed))
                return;
            if (inputMode === 'single')
                self.clear(silent);
            if (inputMode === 'multi' && self.isFull())
                return;
            item = self._render('item', self.options[hashed]);
            if (self.control.contains(item)) { // duplicates
                item = item.cloneNode(true);
            }
            wasFull = self.isFull();
            self.items.splice(self.caretPos, 0, hashed);
            self.insertAtCaret(item);
            if (self.isSetup) {
                // update menu / remove the option (if this is not one item being added as part of series)
                if (!self.isPending && self.settings.hideSelected) {
                    let option = self.getOption(hashed);
                    let next = self.getAdjacent(option, 1);
                    if (next) {
                        self.setActiveOption(next);
                    }
                }
                // refreshOptions after setActiveOption(),
                // otherwise setActiveOption() will be called by refreshOptions() with the wrong value
                if (!self.isPending && !self.settings.closeAfterSelect) {
                    self.refreshOptions(self.isFocused && inputMode !== 'single');
                }
                // hide the menu if the maximum number of items have been selected or no options are left
                if (self.settings.closeAfterSelect != false && self.isFull()) {
                    self.close();
                }
                else if (!self.isPending) {
                    self.positionDropdown();
                }
                self.trigger('item_add', hashed, item);
                if (!self.isPending) {
                    self.updateOriginalInput({ silent: silent });
                }
            }
            if (!self.isPending || (!wasFull && self.isFull())) {
                self.inputState();
                self.refreshState();
            }
        });
    }
    /**
     * Removes the selected item matching
     * the provided value.
     *
     */
    removeItem(item = null, silent) {
        const self = this;
        item = self.getItem(item);
        if (!item)
            return;
        var i, idx;
        const value = item.dataset.value;
        i = nodeIndex(item);
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
        self.updateOriginalInput({ silent: silent });
        self.refreshState();
        self.positionDropdown();
        self.trigger('item_remove', value, item);
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
    createItem(input = null, callback = () => { }) {
        // triggerDropdown parameter @deprecated 2.1.1
        if (arguments.length === 3) {
            callback = arguments[2];
        }
        if (typeof callback != 'function') {
            callback = () => { };
        }
        var self = this;
        var caret = self.caretPos;
        var output;
        input = input || self.inputValue();
        if (!self.canCreate(input)) {
            callback();
            return false;
        }
        self.lock();
        var created = false;
        var create = (data) => {
            self.unlock();
            if (!data || typeof data !== 'object')
                return callback();
            var value = hash_key(data[self.settings.valueField]);
            if (typeof value !== 'string') {
                return callback();
            }
            self.setTextboxValue();
            self.addOption(data, true);
            self.setCaret(caret);
            self.addItem(value);
            callback(data);
            created = true;
        };
        if (typeof self.settings.create === 'function') {
            output = self.settings.create.call(this, input, create);
        }
        else {
            output = {
                [self.settings.labelField]: input,
                [self.settings.valueField]: input,
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
        const self = this;
        self.refreshValidityState();
        const isFull = self.isFull();
        const isLocked = self.isLocked;
        self.wrapper.classList.toggle('rtl', self.rtl);
        const wrap_classList = self.wrapper.classList;
        wrap_classList.toggle('focus', self.isFocused);
        wrap_classList.toggle('disabled', self.isDisabled);
        wrap_classList.toggle('readonly', self.isReadOnly);
        wrap_classList.toggle('required', self.isRequired);
        wrap_classList.toggle('invalid', !self.isValid);
        wrap_classList.toggle('locked', isLocked);
        wrap_classList.toggle('full', isFull);
        wrap_classList.toggle('input-active', self.isFocused && !self.isInputHidden);
        wrap_classList.toggle('dropdown-active', self.isOpen);
        wrap_classList.toggle('has-options', isEmptyObject(self.options));
        wrap_classList.toggle('has-items', self.items.length > 0);
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
        if (!self.input.validity) {
            return;
        }
        self.isValid = self.input.validity.valid;
        self.isInvalid = !self.isValid;
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
        const self = this;
        var option, label;
        const empty_option = self.input.querySelector('option[value=""]');
        if (self.is_select_tag) {
            const selected = [];
            const has_selected = self.input.querySelectorAll('option:checked').length;
            function AddSelected(option_el, value, label) {
                if (!option_el) {
                    option_el = getDom('<option value="' + escape_html(value) + '">' + escape_html(label) + '</option>');
                }
                // don't move empty option from top of list
                // fixes bug in firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1725293
                if (option_el != empty_option) {
                    self.input.append(option_el);
                }
                selected.push(option_el);
                // marking empty option as selected can break validation
                // fixes https://github.com/orchidjs/tom-select/issues/303
                if (option_el != empty_option || has_selected > 0) {
                    option_el.selected = true;
                }
                return option_el;
            }
            // unselect all selected options
            self.input.querySelectorAll('option:checked').forEach((option_el) => {
                option_el.selected = false;
            });
            // nothing selected?
            if (self.items.length == 0 && self.settings.mode == 'single') {
                AddSelected(empty_option, "", "");
                // order selected <option> tags for values in self.items
            }
            else {
                self.items.forEach((value) => {
                    option = self.options[value];
                    label = option[self.settings.labelField] || '';
                    if (selected.includes(option.$option)) {
                        const reuse_opt = self.input.querySelector(`option[value="${addSlashes(value)}"]:not(:checked)`);
                        AddSelected(reuse_opt, value, label);
                    }
                    else {
                        option.$option = AddSelected(option.$option, value, label);
                    }
                });
            }
        }
        else {
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
        if (self.isLocked || self.isOpen || (self.settings.mode === 'multi' && self.isFull()))
            return;
        self.isOpen = true;
        setAttr(self.focus_node, { 'aria-expanded': 'true' });
        self.refreshState();
        applyCSS(self.dropdown, { visibility: 'hidden', display: 'block' });
        self.positionDropdown();
        applyCSS(self.dropdown, { visibility: 'visible', display: 'block' });
        self.focus();
        self.trigger('dropdown_open', self.dropdown);
    }
    /**
     * Closes the autocomplete dropdown menu.
     */
    close(setTextboxValue = true) {
        var self = this;
        var trigger = self.isOpen;
        if (setTextboxValue) {
            // before blur() to prevent form onchange event
            self.setTextboxValue();
            if (self.settings.mode === 'single' && self.items.length) {
                self.inputState();
            }
        }
        self.isOpen = false;
        setAttr(self.focus_node, { 'aria-expanded': 'false' });
        applyCSS(self.dropdown, { display: 'none' });
        if (self.settings.hideSelected) {
            self.clearActiveOption();
        }
        self.refreshState();
        if (trigger)
            self.trigger('dropdown_close', self.dropdown);
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
        if (!self.items.length)
            return;
        var items = self.controlChildren();
        iterate(items, (item) => {
            self.removeItem(item, true);
        });
        self.inputState();
        if (!silent)
            self.updateOriginalInput();
        self.trigger('clear');
    }
    /**
     * A helper method for inserting an element
     * at the current caret position.
     *
     */
    insertAtCaret(el) {
        const self = this;
        const caret = self.caretPos;
        const target = self.control;
        target.insertBefore(el, target.children[caret] || null);
        self.setCaret(caret + 1);
    }
    /**
     * Removes the current selected item(s).
     *
     */
    deleteSelection(e) {
        var direction, selection, caret, tail;
        var self = this;
        direction = (e && e.keyCode === constants.KEY_BACKSPACE) ? -1 : 1;
        selection = getSelection(self.control_input);
        // determine items that will be removed
        const rm_items = [];
        if (self.activeItems.length) {
            tail = getTail(self.activeItems, direction);
            caret = nodeIndex(tail);
            if (direction > 0) {
                caret++;
            }
            iterate(self.activeItems, (item) => rm_items.push(item));
        }
        else if ((self.isFocused || self.settings.mode === 'single') && self.items.length) {
            const items = self.controlChildren();
            let rm_item;
            if (direction < 0 && selection.start === 0 && selection.length === 0) {
                rm_item = items[self.caretPos - 1];
            }
            else if (direction > 0 && selection.start === self.inputValue().length) {
                rm_item = items[self.caretPos];
            }
            if (rm_item !== undefined) {
                rm_items.push(rm_item);
            }
        }
        if (!self.shouldDelete(rm_items, e)) {
            return false;
        }
        preventDefault(e, true);
        // perform removal
        if (typeof caret !== 'undefined') {
            self.setCaret(caret);
        }
        while (rm_items.length) {
            self.removeItem(rm_items.pop());
        }
        self.inputState();
        self.positionDropdown();
        self.refreshOptions(false);
        return true;
    }
    /**
     * Return true if the items should be deleted
     */
    shouldDelete(items, evt) {
        const values = items.map(item => item.dataset.value);
        // allow the callback to abort
        if (!values.length || (typeof this.settings.onDelete === 'function' && this.settings.onDelete(values, evt) === false)) {
            return false;
        }
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
        var last_active, adjacent, self = this;
        if (self.rtl)
            direction *= -1;
        if (self.inputValue().length)
            return;
        // add or remove to active items
        if (isKeyDown(constants.KEY_SHORTCUT, e) || isKeyDown('shiftKey', e)) {
            last_active = self.getLastActive(direction);
            if (last_active) {
                if (!last_active.classList.contains('active')) {
                    adjacent = last_active;
                }
                else {
                    adjacent = self.getAdjacent(last_active, direction, 'item');
                }
                // if no active item, get items adjacent to the control input
            }
            else if (direction > 0) {
                adjacent = self.control_input.nextElementSibling;
            }
            else {
                adjacent = self.control_input.previousElementSibling;
            }
            if (adjacent) {
                if (adjacent.classList.contains('active')) {
                    self.removeActiveItem(last_active);
                }
                self.setActiveItemClass(adjacent); // mark as last_active !! after removeActiveItem() on last_active
            }
            // move caret to the left or right
        }
        else {
            self.moveCaret(direction);
        }
    }
    moveCaret(direction) { }
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
        this.caretPos = this.items.length;
    }
    /**
     * Return list of item dom elements
     *
     */
    controlChildren() {
        return Array.from(this.control.querySelectorAll('[data-ts-item]'));
    }
    /**
     * Disables user input on the control. Used while
     * items are being asynchronously created.
     */
    lock() {
        this.setLocked(true);
    }
    /**
     * Re-enables user input on the control.
     */
    unlock() {
        this.setLocked(false);
    }
    /**
     * Disable or enable user input on the control
     */
    setLocked(lock = this.isReadOnly || this.isDisabled) {
        this.isLocked = lock;
        this.refreshState();
    }
    /**
     * Disables user input on the control completely.
     * While disabled, it cannot receive focus.
     */
    disable() {
        this.setDisabled(true);
        this.close();
    }
    /**
     * Enables the control so that it can respond
     * to focus and user input.
     */
    enable() {
        this.setDisabled(false);
    }
    setDisabled(disabled) {
        this.focus_node.tabIndex = disabled ? -1 : this.tabIndex;
        this.isDisabled = disabled;
        this.input.disabled = disabled;
        this.control_input.disabled = disabled;
        this.setLocked();
    }
    setReadOnly(isReadOnly) {
        this.isReadOnly = isReadOnly;
        this.input.readOnly = isReadOnly;
        this.control_input.readOnly = isReadOnly;
        this.setLocked();
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
        removeClasses(self.input, 'tomselected', 'ts-hidden-accessible');
        self._destroy();
        delete self.input.tomselect;
    }
    /**
     * A helper method for rendering "item" and
     * "option" templates, given the data.
     *
     */
    render(templateName, data) {
        var id, html;
        const self = this;
        if (typeof this.settings.render[templateName] !== 'function') {
            return null;
        }
        // render markup
        html = self.settings.render[templateName].call(this, data, escape_html);
        if (!html) {
            return null;
        }
        html = getDom(html);
        // add mandatory attributes
        if (templateName === 'option' || templateName === 'option_create') {
            if (data[self.settings.disabledField]) {
                setAttr(html, { 'aria-disabled': 'true' });
            }
            else {
                setAttr(html, { 'data-selectable': '' });
            }
        }
        else if (templateName === 'optgroup') {
            id = data.group[self.settings.optgroupValueField];
            setAttr(html, { 'data-group': id });
            if (data.group[self.settings.disabledField]) {
                setAttr(html, { 'data-disabled': '' });
            }
        }
        if (templateName === 'option' || templateName === 'item') {
            const value = get_hash(data[self.settings.valueField]);
            setAttr(html, { 'data-value': value });
            // make sure we have some classes if a template is overwritten
            if (templateName === 'item') {
                addClasses(html, self.settings.itemClass);
                setAttr(html, { 'data-ts-item': '' });
            }
            else {
                addClasses(html, self.settings.optionClass);
                setAttr(html, {
                    role: 'option',
                    id: data.$id
                });
                // update cache
                data.$div = html;
                self.options[value] = data;
            }
        }
        return html;
    }
    /**
     * Type guarded rendering
     *
     */
    _render(templateName, data) {
        const html = this.render(templateName, data);
        if (html == null) {
            throw 'HTMLElement expected';
        }
        return html;
    }
    /**
     * Clears the render cache for a template. If
     * no template is given, clears all render
     * caches.
     *
     */
    clearCache() {
        iterate(this.options, (option) => {
            if (option.$div) {
                option.$div.remove();
                delete option.$div;
            }
        });
    }
    /**
     * Removes a value from item and option caches
     *
     */
    uncacheValue(value) {
        const option_el = this.getOption(value);
        if (option_el)
            option_el.remove();
    }
    /**
     * Determines whether or not to display the
     * create item prompt, given a user input.
     *
     */
    canCreate(input) {
        return this.settings.create && (input.length > 0) && this.settings.createFilter.call(this, input);
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
;
//# sourceMappingURL=tom-select.js.map