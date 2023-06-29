this.primevue = this.primevue || {};
this.primevue.autocomplete = (function (BaseComponent, Button, ChevronDownIcon, SpinnerIcon, TimesCircleIcon, OverlayEventBus, Portal, Ripple, utils, VirtualScroller, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
    var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
    var SpinnerIcon__default = /*#__PURE__*/_interopDefaultLegacy(SpinnerIcon);
    var TimesCircleIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesCircleIcon);
    var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var VirtualScroller__default = /*#__PURE__*/_interopDefaultLegacy(VirtualScroller);

    var script = {
        name: 'AutoComplete',
        extends: BaseComponent__default["default"],
        emits: ['update:modelValue', 'change', 'focus', 'blur', 'item-select', 'item-unselect', 'dropdown-click', 'clear', 'complete', 'before-show', 'before-hide', 'show', 'hide'],
        props: {
            modelValue: null,
            suggestions: {
                type: Array,
                default: null
            },
            field: {
                // TODO: Deprecated since v3.16.0
                type: [String, Function],
                default: null
            },
            optionLabel: null,
            optionDisabled: null,
            optionGroupLabel: null,
            optionGroupChildren: null,
            scrollHeight: {
                type: String,
                default: '200px'
            },
            dropdown: {
                type: Boolean,
                default: false
            },
            dropdownMode: {
                type: String,
                default: 'blank'
            },
            autoHighlight: {
                // TODO: Deprecated since v3.16.0. Use selectOnFocus property instead.
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: null
            },
            dataKey: {
                type: String,
                default: null
            },
            minLength: {
                type: Number,
                default: 1
            },
            delay: {
                type: Number,
                default: 300
            },
            appendTo: {
                type: String,
                default: 'body'
            },
            forceSelection: {
                type: Boolean,
                default: false
            },
            completeOnFocus: {
                type: Boolean,
                default: false
            },
            inputId: {
                type: String,
                default: null
            },
            inputStyle: {
                type: Object,
                default: null
            },
            inputClass: {
                type: [String, Object],
                default: null
            },
            inputProps: {
                type: null,
                default: null
            },
            panelStyle: {
                type: Object,
                default: null
            },
            panelClass: {
                type: [String, Object],
                default: null
            },
            panelProps: {
                type: null,
                default: null
            },
            dropdownIcon: {
                type: String,
                default: undefined
            },
            dropdownClass: {
                type: [String, Object],
                default: null
            },
            loadingIcon: {
                type: String,
                default: undefined
            },
            removeTokenIcon: {
                type: String,
                default: undefined
            },
            virtualScrollerOptions: {
                type: Object,
                default: null
            },
            autoOptionFocus: {
                type: Boolean,
                default: true
            },
            selectOnFocus: {
                type: Boolean,
                default: false
            },
            searchLocale: {
                type: String,
                default: undefined
            },
            searchMessage: {
                type: String,
                default: null
            },
            selectionMessage: {
                type: String,
                default: null
            },
            emptySelectionMessage: {
                type: String,
                default: null
            },
            emptySearchMessage: {
                type: String,
                default: null
            },
            tabindex: {
                type: Number,
                default: 0
            },
            'aria-label': {
                type: String,
                default: null
            },
            'aria-labelledby': {
                type: String,
                default: null
            }
        },
        outsideClickListener: null,
        resizeListener: null,
        scrollHandler: null,
        overlay: null,
        virtualScroller: null,
        searchTimeout: null,
        focusOnHover: false,
        dirty: false,
        data() {
            return {
                id: this.$attrs.id,
                focused: false,
                focusedOptionIndex: -1,
                focusedMultipleOptionIndex: -1,
                overlayVisible: false,
                searching: false
            };
        },
        watch: {
            '$attrs.id': function (newValue) {
                this.id = newValue || utils.UniqueComponentId();
            },
            suggestions() {
                if (this.searching) {
                    utils.ObjectUtils.isNotEmpty(this.suggestions) ? this.show() : !!this.$slots.empty ? this.show() : this.hide();
                    this.focusedOptionIndex = this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
                    this.searching = false;
                }

                this.autoUpdateModel();
            }
        },
        mounted() {
            this.id = this.id || utils.UniqueComponentId();

            this.autoUpdateModel();
        },
        updated() {
            if (this.overlayVisible) {
                this.alignOverlay();
            }
        },
        beforeUnmount() {
            this.unbindOutsideClickListener();
            this.unbindResizeListener();

            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }

            if (this.overlay) {
                utils.ZIndexUtils.clear(this.overlay);
                this.overlay = null;
            }
        },
        methods: {
            getOptionIndex(index, fn) {
                return this.virtualScrollerDisabled ? index : fn && fn(index)['index'];
            },
            getOptionLabel(option) {
                return this.field || this.optionLabel ? utils.ObjectUtils.resolveFieldData(option, this.field || this.optionLabel) : option;
            },
            getOptionValue(option) {
                return option; // TODO: The 'optionValue' properties can be added.
            },
            getOptionRenderKey(option, index) {
                return (this.dataKey ? utils.ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option)) + '_' + index;
            },
            getPTOptions(option, itemOptions, index, key) {
                return this.ptm(key, {
                    context: {
                        selected: this.isSelected(option),
                        focused: this.focusedOptionIndex === this.getOptionIndex(index, itemOptions),
                        disabled: this.isOptionDisabled(option)
                    }
                });
            },
            isOptionDisabled(option) {
                return this.optionDisabled ? utils.ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
            },
            isOptionGroup(option) {
                return this.optionGroupLabel && option.optionGroup && option.group;
            },
            getOptionGroupLabel(optionGroup) {
                return utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
            },
            getOptionGroupChildren(optionGroup) {
                return utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren);
            },
            getAriaPosInset(index) {
                return (this.optionGroupLabel ? index - this.visibleOptions.slice(0, index).filter((option) => this.isOptionGroup(option)).length : index) + 1;
            },
            show(isFocus) {
                this.$emit('before-show');
                this.dirty = true;
                this.overlayVisible = true;
                this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;

                isFocus && utils.DomHandler.focus(this.$refs.focusInput);
            },
            hide(isFocus) {
                const _hide = () => {
                    this.$emit('before-hide');
                    this.dirty = isFocus;
                    this.overlayVisible = false;
                    this.focusedOptionIndex = -1;

                    isFocus && utils.DomHandler.focus(this.$refs.focusInput);
                };

                setTimeout(() => {
                    _hide();
                }, 0); // For ScreenReaders
            },
            onFocus(event) {
                if (this.disabled) {
                    // For ScreenReaders
                    return;
                }

                if (!this.dirty && this.completeOnFocus) {
                    this.search(event, event.target.value, 'focus');
                }

                this.dirty = true;
                this.focused = true;
                this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
                this.overlayVisible && this.scrollInView(this.focusedOptionIndex);
                this.$emit('focus', event);
            },
            onBlur(event) {
                this.dirty = false;
                this.focused = false;
                this.focusedOptionIndex = -1;
                this.$emit('blur', event);
            },
            onKeyDown(event) {
                if (this.disabled) {
                    event.preventDefault();

                    return;
                }

                switch (event.code) {
                    case 'ArrowDown':
                        this.onArrowDownKey(event);
                        break;

                    case 'ArrowUp':
                        this.onArrowUpKey(event);
                        break;

                    case 'ArrowLeft':
                        this.onArrowLeftKey(event);
                        break;

                    case 'ArrowRight':
                        this.onArrowRightKey(event);
                        break;

                    case 'Home':
                        this.onHomeKey(event);
                        break;

                    case 'End':
                        this.onEndKey(event);
                        break;

                    case 'PageDown':
                        this.onPageDownKey(event);
                        break;

                    case 'PageUp':
                        this.onPageUpKey(event);
                        break;

                    case 'Enter':
                    case 'NumpadEnter':
                        this.onEnterKey(event);
                        break;

                    case 'Escape':
                        this.onEscapeKey(event);
                        break;

                    case 'Tab':
                        this.onTabKey(event);
                        break;

                    case 'Backspace':
                        this.onBackspaceKey(event);
                        break;
                }
            },
            onInput(event) {
                if (this.searchTimeout) {
                    clearTimeout(this.searchTimeout);
                }

                let query = event.target.value;

                if (!this.multiple) {
                    this.updateModel(event, query);
                }

                if (query.length === 0) {
                    this.hide();
                    this.$emit('clear');
                } else {
                    if (query.length >= this.minLength) {
                        this.focusedOptionIndex = -1;

                        this.searchTimeout = setTimeout(() => {
                            this.search(event, query, 'input');
                        }, this.delay);
                    } else {
                        this.hide();
                    }
                }
            },
            onChange(event) {
                if (this.forceSelection) {
                    let valid = false;

                    if (this.visibleOptions) {
                        const matchedValue = this.visibleOptions.find((option) => this.isOptionMatched(option, this.$refs.focusInput.value || ''));

                        if (matchedValue !== undefined) {
                            valid = true;
                            !this.isSelected(matchedValue) && this.onOptionSelect(event, matchedValue);
                        }
                    }

                    if (!valid) {
                        this.$refs.focusInput.value = '';
                        this.$emit('clear');
                        !this.multiple && this.updateModel(event, null);
                    }
                }
            },
            onMultipleContainerFocus() {
                if (this.disabled) {
                    // For ScreenReaders
                    return;
                }

                this.focused = true;
            },
            onMultipleContainerBlur() {
                this.focusedMultipleOptionIndex = -1;
                this.focused = false;
            },
            onMultipleContainerKeyDown(event) {
                if (this.disabled) {
                    event.preventDefault();

                    return;
                }

                switch (event.code) {
                    case 'ArrowLeft':
                        this.onArrowLeftKeyOnMultiple(event);
                        break;

                    case 'ArrowRight':
                        this.onArrowRightKeyOnMultiple(event);
                        break;

                    case 'Backspace':
                        this.onBackspaceKeyOnMultiple(event);
                        break;
                }
            },
            onContainerClick(event) {
                if (this.disabled || this.searching || this.isInputClicked(event) || this.isDropdownClicked(event)) {
                    return;
                }

                if (!this.overlay || !this.overlay.contains(event.target)) {
                    utils.DomHandler.focus(this.$refs.focusInput);
                }
            },
            onDropdownClick(event) {
                let query = undefined;

                if (this.overlayVisible) {
                    this.hide(true);
                } else {
                    utils.DomHandler.focus(this.$refs.focusInput);
                    query = this.$refs.focusInput.value;

                    if (this.dropdownMode === 'blank') this.search(event, '', 'dropdown');
                    else if (this.dropdownMode === 'current') this.search(event, query, 'dropdown');
                }

                this.$emit('dropdown-click', { originalEvent: event, query });
            },
            onOptionSelect(event, option, isHide = true) {
                const value = this.getOptionValue(option);

                if (this.multiple) {
                    this.$refs.focusInput.value = '';

                    if (!this.isSelected(option)) {
                        this.updateModel(event, [...(this.modelValue || []), value]);
                    }
                } else {
                    this.updateModel(event, value);
                }

                this.$emit('item-select', { originalEvent: event, value: option });

                isHide && this.hide(true);
            },
            onOptionMouseMove(event, index) {
                if (this.focusOnHover) {
                    this.changeFocusedOptionIndex(event, index);
                }
            },
            onOverlayClick(event) {
                OverlayEventBus__default["default"].emit('overlay-click', {
                    originalEvent: event,
                    target: this.$el
                });
            },
            onOverlayKeyDown(event) {
                switch (event.code) {
                    case 'Escape':
                        this.onEscapeKey(event);
                        break;
                }
            },
            onArrowDownKey(event) {
                if (!this.overlayVisible) {
                    return;
                }

                const optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.findFirstFocusedOptionIndex();

                this.changeFocusedOptionIndex(event, optionIndex);

                event.preventDefault();
            },
            onArrowUpKey(event) {
                if (!this.overlayVisible) {
                    return;
                }

                if (event.altKey) {
                    if (this.focusedOptionIndex !== -1) {
                        this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
                    }

                    this.overlayVisible && this.hide();
                    event.preventDefault();
                } else {
                    const optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.findLastFocusedOptionIndex();

                    this.changeFocusedOptionIndex(event, optionIndex);

                    event.preventDefault();
                }
            },
            onArrowLeftKey(event) {
                const target = event.currentTarget;

                this.focusedOptionIndex = -1;

                if (this.multiple) {
                    if (utils.ObjectUtils.isEmpty(target.value) && this.hasSelectedOption) {
                        utils.DomHandler.focus(this.$refs.multiContainer);
                        this.focusedMultipleOptionIndex = this.modelValue.length;
                    } else {
                        event.stopPropagation(); // To prevent onArrowLeftKeyOnMultiple method
                    }
                }
            },
            onArrowRightKey(event) {
                this.focusedOptionIndex = -1;

                this.multiple && event.stopPropagation(); // To prevent onArrowRightKeyOnMultiple method
            },
            onHomeKey(event) {
                const { currentTarget } = event;
                const len = currentTarget.value.length;

                currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
                this.focusedOptionIndex = -1;

                event.preventDefault();
            },
            onEndKey(event) {
                const { currentTarget } = event;
                const len = currentTarget.value.length;

                currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
                this.focusedOptionIndex = -1;

                event.preventDefault();
            },
            onPageUpKey(event) {
                this.scrollInView(0);
                event.preventDefault();
            },
            onPageDownKey(event) {
                this.scrollInView(this.visibleOptions.length - 1);
                event.preventDefault();
            },
            onEnterKey(event) {
                if (!this.overlayVisible) {
                    this.onArrowDownKey(event);
                } else {
                    if (this.focusedOptionIndex !== -1) {
                        this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
                    }

                    this.hide();
                }

                event.preventDefault();
            },
            onEscapeKey(event) {
                this.overlayVisible && this.hide(true);
                event.preventDefault();
            },
            onTabKey(event) {
                if (this.focusedOptionIndex !== -1) {
                    this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
                }

                this.overlayVisible && this.hide();
            },
            onBackspaceKey(event) {
                if (this.multiple) {
                    if (utils.ObjectUtils.isNotEmpty(this.modelValue) && !this.$refs.focusInput.value) {
                        const removedValue = this.modelValue[this.modelValue.length - 1];
                        const newValue = this.modelValue.slice(0, -1);

                        this.$emit('update:modelValue', newValue);
                        this.$emit('item-unselect', { originalEvent: event, value: removedValue });
                    }

                    event.stopPropagation(); // To prevent onBackspaceKeyOnMultiple method
                }
            },
            onArrowLeftKeyOnMultiple() {
                this.focusedMultipleOptionIndex = this.focusedMultipleOptionIndex < 1 ? 0 : this.focusedMultipleOptionIndex - 1;
            },
            onArrowRightKeyOnMultiple() {
                this.focusedMultipleOptionIndex++;

                if (this.focusedMultipleOptionIndex > this.modelValue.length - 1) {
                    this.focusedMultipleOptionIndex = -1;
                    utils.DomHandler.focus(this.$refs.focusInput);
                }
            },
            onBackspaceKeyOnMultiple(event) {
                if (this.focusedMultipleOptionIndex !== -1) {
                    this.removeOption(event, this.focusedMultipleOptionIndex);
                }
            },
            onOverlayEnter(el) {
                utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
                this.alignOverlay();
            },
            onOverlayAfterEnter() {
                this.bindOutsideClickListener();
                this.bindScrollListener();
                this.bindResizeListener();

                this.$emit('show');
            },
            onOverlayLeave() {
                this.unbindOutsideClickListener();
                this.unbindScrollListener();
                this.unbindResizeListener();

                this.$emit('hide');
                this.overlay = null;
            },
            onOverlayAfterLeave(el) {
                utils.ZIndexUtils.clear(el);
            },
            alignOverlay() {
                let target = this.multiple ? this.$refs.multiContainer : this.$refs.focusInput;

                if (this.appendTo === 'self') {
                    utils.DomHandler.relativePosition(this.overlay, target);
                } else {
                    this.overlay.style.minWidth = utils.DomHandler.getOuterWidth(target) + 'px';
                    utils.DomHandler.absolutePosition(this.overlay, target);
                }
            },
            bindOutsideClickListener() {
                if (!this.outsideClickListener) {
                    this.outsideClickListener = (event) => {
                        if (this.overlayVisible && this.overlay && this.isOutsideClicked(event)) {
                            this.hide();
                        }
                    };

                    document.addEventListener('click', this.outsideClickListener);
                }
            },
            unbindOutsideClickListener() {
                if (this.outsideClickListener) {
                    document.removeEventListener('click', this.outsideClickListener);
                    this.outsideClickListener = null;
                }
            },
            bindScrollListener() {
                if (!this.scrollHandler) {
                    this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.container, () => {
                        if (this.overlayVisible) {
                            this.hide();
                        }
                    });
                }

                this.scrollHandler.bindScrollListener();
            },
            unbindScrollListener() {
                if (this.scrollHandler) {
                    this.scrollHandler.unbindScrollListener();
                }
            },
            bindResizeListener() {
                if (!this.resizeListener) {
                    this.resizeListener = () => {
                        if (this.overlayVisible && !utils.DomHandler.isTouchDevice()) {
                            this.hide();
                        }
                    };

                    window.addEventListener('resize', this.resizeListener);
                }
            },
            unbindResizeListener() {
                if (this.resizeListener) {
                    window.removeEventListener('resize', this.resizeListener);
                    this.resizeListener = null;
                }
            },
            isOutsideClicked(event) {
                return !this.overlay.contains(event.target) && !this.isInputClicked(event) && !this.isDropdownClicked(event);
            },
            isInputClicked(event) {
                if (this.multiple) return event.target === this.$refs.multiContainer || this.$refs.multiContainer.contains(event.target);
                else return event.target === this.$refs.focusInput;
            },
            isDropdownClicked(event) {
                return this.$refs.dropdownButton ? event.target === this.$refs.dropdownButton || this.$refs.dropdownButton.$el.contains(event.target) : false;
            },
            isOptionMatched(option, value) {
                return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.searchLocale) === value.toLocaleLowerCase(this.searchLocale);
            },
            isValidOption(option) {
                return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
            },
            isValidSelectedOption(option) {
                return this.isValidOption(option) && this.isSelected(option);
            },
            isSelected(option) {
                return utils.ObjectUtils.equals(this.modelValue, this.getOptionValue(option), this.equalityKey);
            },
            findFirstOptionIndex() {
                return this.visibleOptions.findIndex((option) => this.isValidOption(option));
            },
            findLastOptionIndex() {
                return utils.ObjectUtils.findLastIndex(this.visibleOptions, (option) => this.isValidOption(option));
            },
            findNextOptionIndex(index) {
                const matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex((option) => this.isValidOption(option)) : -1;

                return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
            },
            findPrevOptionIndex(index) {
                const matchedOptionIndex = index > 0 ? utils.ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), (option) => this.isValidOption(option)) : -1;

                return matchedOptionIndex > -1 ? matchedOptionIndex : index;
            },
            findSelectedOptionIndex() {
                return this.hasSelectedOption ? this.visibleOptions.findIndex((option) => this.isValidSelectedOption(option)) : -1;
            },
            findFirstFocusedOptionIndex() {
                const selectedIndex = this.findSelectedOptionIndex();

                return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
            },
            findLastFocusedOptionIndex() {
                const selectedIndex = this.findSelectedOptionIndex();

                return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
            },
            search(event, query, source) {
                //allow empty string but not undefined or null
                if (query === undefined || query === null) {
                    return;
                }

                //do not search blank values on input change
                if (source === 'input' && query.trim().length === 0) {
                    return;
                }

                this.searching = true;
                this.$emit('complete', { originalEvent: event, query });
            },
            removeOption(event, index) {
                const removedOption = this.modelValue[index];
                const value = this.modelValue.filter((_, i) => i !== index).map((option) => this.getOptionValue(option));

                this.updateModel(event, value);
                this.$emit('item-unselect', { originalEvent: event, value: removedOption });
                this.dirty = true;
                utils.DomHandler.focus(this.$refs.focusInput);
            },
            changeFocusedOptionIndex(event, index) {
                if (this.focusedOptionIndex !== index) {
                    this.focusedOptionIndex = index;
                    this.scrollInView();

                    if (this.selectOnFocus || this.autoHighlight) {
                        this.onOptionSelect(event, this.visibleOptions[index], false);
                    }
                }
            },
            scrollInView(index = -1) {
                const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
                const element = utils.DomHandler.findSingle(this.list, `li[id="${id}"]`);

                if (element) {
                    element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
                } else if (!this.virtualScrollerDisabled) {
                    setTimeout(() => {
                        this.virtualScroller && this.virtualScroller.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex);
                    }, 0);
                }
            },
            autoUpdateModel() {
                if ((this.selectOnFocus || this.autoHighlight) && this.autoOptionFocus && !this.hasSelectedOption) {
                    this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
                    this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex], false);
                }
            },
            updateModel(event, value) {
                this.$emit('update:modelValue', value);
                this.$emit('change', { originalEvent: event, value });
            },
            flatOptions(options) {
                return (options || []).reduce((result, option, index) => {
                    result.push({ optionGroup: option, group: true, index });

                    const optionGroupChildren = this.getOptionGroupChildren(option);

                    optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));

                    return result;
                }, []);
            },
            overlayRef(el) {
                this.overlay = el;
            },
            listRef(el, contentRef) {
                this.list = el;
                contentRef && contentRef(el); // For VirtualScroller
            },
            virtualScrollerRef(el) {
                this.virtualScroller = el;
            }
        },
        computed: {
            containerClass() {
                return [
                    'p-autocomplete p-component p-inputwrapper',
                    {
                        'p-disabled': this.disabled,
                        'p-focus': this.focused,
                        'p-autocomplete-dd': this.dropdown,
                        'p-autocomplete-multiple': this.multiple,
                        'p-inputwrapper-filled': this.modelValue || utils.ObjectUtils.isNotEmpty(this.inputValue),
                        'p-inputwrapper-focus': this.focused,
                        'p-overlay-open': this.overlayVisible
                    }
                ];
            },
            inputStyleClass() {
                return [
                    'p-autocomplete-input p-inputtext p-component',
                    this.inputClass,
                    {
                        'p-autocomplete-dd-input': this.dropdown
                    }
                ];
            },
            multiContainerClass() {
                return ['p-autocomplete-multiple-container p-component p-inputtext'];
            },
            panelStyleClass() {
                return [
                    'p-autocomplete-panel p-component',
                    this.panelClass,
                    {
                        'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                        'p-ripple-disabled': this.$primevue.config.ripple === false
                    }
                ];
            },
            visibleOptions() {
                return this.optionGroupLabel ? this.flatOptions(this.suggestions) : this.suggestions || [];
            },
            inputValue() {
                if (this.modelValue) {
                    if (typeof this.modelValue === 'object') {
                        const label = this.getOptionLabel(this.modelValue);

                        return label != null ? label : this.modelValue;
                    } else {
                        return this.modelValue;
                    }
                } else {
                    return '';
                }
            },
            hasSelectedOption() {
                return utils.ObjectUtils.isNotEmpty(this.modelValue);
            },
            equalityKey() {
                return this.dataKey; // TODO: The 'optionValue' properties can be added.
            },
            searchResultMessageText() {
                return utils.ObjectUtils.isNotEmpty(this.visibleOptions) && this.overlayVisible ? this.searchMessageText.replaceAll('{0}', this.visibleOptions.length) : this.emptySearchMessageText;
            },
            searchMessageText() {
                return this.searchMessage || this.$primevue.config.locale.searchMessage || '';
            },
            emptySearchMessageText() {
                return this.emptySearchMessage || this.$primevue.config.locale.emptySearchMessage || '';
            },
            selectionMessageText() {
                return this.selectionMessage || this.$primevue.config.locale.selectionMessage || '';
            },
            emptySelectionMessageText() {
                return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || '';
            },
            selectedMessageText() {
                return this.hasSelectedOption ? this.selectionMessageText.replaceAll('{0}', this.multiple ? this.modelValue.length : '1') : this.emptySelectionMessageText;
            },
            focusedOptionId() {
                return this.focusedOptionIndex !== -1 ? `${this.id}_${this.focusedOptionIndex}` : null;
            },
            focusedMultipleOptionId() {
                return this.focusedMultipleOptionIndex !== -1 ? `${this.id}_multiple_option_${this.focusedMultipleOptionIndex}` : null;
            },
            ariaSetSize() {
                return this.visibleOptions.filter((option) => !this.isOptionGroup(option)).length;
            },
            virtualScrollerDisabled() {
                return !this.virtualScrollerOptions;
            }
        },
        components: {
            Button: Button__default["default"],
            VirtualScroller: VirtualScroller__default["default"],
            Portal: Portal__default["default"],
            ChevronDownIcon: ChevronDownIcon__default["default"],
            SpinnerIcon: SpinnerIcon__default["default"],
            TimesCircleIcon: TimesCircleIcon__default["default"]
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1 = ["id", "value", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
    const _hoisted_2 = ["aria-activedescendant"];
    const _hoisted_3 = ["id", "aria-label", "aria-setsize", "aria-posinset"];
    const _hoisted_4 = ["id", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
    const _hoisted_5 = ["id"];
    const _hoisted_6 = ["id"];
    const _hoisted_7 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_SpinnerIcon = vue.resolveComponent("SpinnerIcon");
      const _component_Button = vue.resolveComponent("Button");
      const _component_VirtualScroller = vue.resolveComponent("VirtualScroller");
      const _component_Portal = vue.resolveComponent("Portal");
      const _directive_ripple = vue.resolveDirective("ripple");

      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        ref: "container",
        class: $options.containerClass,
        onClick: _cache[15] || (_cache[15] = (...args) => ($options.onContainerClick && $options.onContainerClick(...args)))
      }, _ctx.ptm('root')), [
        (!$props.multiple)
          ? (vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
              key: 0,
              ref: "focusInput",
              id: $props.inputId,
              type: "text",
              style: $props.inputStyle,
              class: $options.inputStyleClass,
              value: $options.inputValue,
              placeholder: $props.placeholder,
              tabindex: !$props.disabled ? $props.tabindex : -1,
              disabled: $props.disabled,
              autocomplete: "off",
              role: "combobox",
              "aria-label": _ctx.ariaLabel,
              "aria-labelledby": _ctx.ariaLabelledby,
              "aria-haspopup": "listbox",
              "aria-autocomplete": "list",
              "aria-expanded": $data.overlayVisible,
              "aria-controls": $data.id + '_list',
              "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
              onFocus: _cache[0] || (_cache[0] = (...args) => ($options.onFocus && $options.onFocus(...args))),
              onBlur: _cache[1] || (_cache[1] = (...args) => ($options.onBlur && $options.onBlur(...args))),
              onKeydown: _cache[2] || (_cache[2] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args))),
              onInput: _cache[3] || (_cache[3] = (...args) => ($options.onInput && $options.onInput(...args))),
              onChange: _cache[4] || (_cache[4] = (...args) => ($options.onChange && $options.onChange(...args)))
            }, { ...$props.inputProps, ..._ctx.ptm('input') }), null, 16, _hoisted_1))
          : vue.createCommentVNode("", true),
        ($props.multiple)
          ? (vue.openBlock(), vue.createElementBlock("ul", vue.mergeProps({
              key: 1,
              ref: "multiContainer",
              class: $options.multiContainerClass,
              tabindex: "-1",
              role: "listbox",
              "aria-orientation": "horizontal",
              "aria-activedescendant": $data.focused ? $options.focusedMultipleOptionId : undefined,
              onFocus: _cache[10] || (_cache[10] = (...args) => ($options.onMultipleContainerFocus && $options.onMultipleContainerFocus(...args))),
              onBlur: _cache[11] || (_cache[11] = (...args) => ($options.onMultipleContainerBlur && $options.onMultipleContainerBlur(...args))),
              onKeydown: _cache[12] || (_cache[12] = (...args) => ($options.onMultipleContainerKeyDown && $options.onMultipleContainerKeyDown(...args)))
            }, _ctx.ptm('container')), [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.modelValue, (option, i) => {
                return (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                  key: i,
                  id: $data.id + '_multiple_option_' + i,
                  class: ['p-autocomplete-token', { 'p-focus': $data.focusedMultipleOptionIndex === i }],
                  role: "option",
                  "aria-label": $options.getOptionLabel(option),
                  "aria-selected": true,
                  "aria-setsize": $props.modelValue.length,
                  "aria-posinset": i + 1
                }, _ctx.ptm('token')), [
                  vue.renderSlot(_ctx.$slots, "chip", { value: option }, () => [
                    vue.createElementVNode("span", vue.mergeProps({ class: "p-autocomplete-token-label" }, _ctx.ptm('tokenLabel')), vue.toDisplayString($options.getOptionLabel(option)), 17)
                  ]),
                  vue.renderSlot(_ctx.$slots, "removetokenicon", {
                    class: "p-autocomplete-token-icon",
                    onClick: (event) => $options.removeOption(event, i)
                  }, () => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.removeTokenIcon ? 'span' : 'TimesCircleIcon'), vue.mergeProps({
                      class: ['p-autocomplete-token-icon', $props.removeTokenIcon],
                      onClick: $event => ($options.removeOption($event, i)),
                      "aria-hidden": "true"
                    }, _ctx.ptm('removeTokenIcon')), null, 16, ["class", "onClick"]))
                  ])
                ], 16, _hoisted_3))
              }), 128)),
              vue.createElementVNode("li", vue.mergeProps({
                class: "p-autocomplete-input-token",
                role: "option"
              }, _ctx.ptm('token')), [
                vue.createElementVNode("input", vue.mergeProps({
                  ref: "focusInput",
                  id: $props.inputId,
                  type: "text",
                  style: $props.inputStyle,
                  class: $props.inputClass,
                  placeholder: $props.placeholder,
                  tabindex: !$props.disabled ? $props.tabindex : -1,
                  disabled: $props.disabled,
                  autocomplete: "off",
                  role: "combobox",
                  "aria-label": _ctx.ariaLabel,
                  "aria-labelledby": _ctx.ariaLabelledby,
                  "aria-haspopup": "listbox",
                  "aria-autocomplete": "list",
                  "aria-expanded": $data.overlayVisible,
                  "aria-controls": $data.id + '_list',
                  "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
                  onFocus: _cache[5] || (_cache[5] = (...args) => ($options.onFocus && $options.onFocus(...args))),
                  onBlur: _cache[6] || (_cache[6] = (...args) => ($options.onBlur && $options.onBlur(...args))),
                  onKeydown: _cache[7] || (_cache[7] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args))),
                  onInput: _cache[8] || (_cache[8] = (...args) => ($options.onInput && $options.onInput(...args))),
                  onChange: _cache[9] || (_cache[9] = (...args) => ($options.onChange && $options.onChange(...args)))
                }, { ...$props.inputProps, ..._ctx.ptm('input') }), null, 16, _hoisted_4)
              ], 16)
            ], 16, _hoisted_2))
          : vue.createCommentVNode("", true),
        ($data.searching)
          ? vue.renderSlot(_ctx.$slots, "loadingicon", { key: 2 }, () => [
              ($props.loadingIcon)
                ? (vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
                    key: 0,
                    class: ['p-autocomplete-loader pi-spin', $props.loadingIcon],
                    "aria-hidden": "true"
                  }, _ctx.ptm('loadingIcon')), null, 16))
                : (vue.openBlock(), vue.createBlock(_component_SpinnerIcon, vue.mergeProps({
                    key: 1,
                    class: "p-autocomplete-loader",
                    spin: "",
                    "aria-hidden": "true"
                  }, _ctx.ptm('loadingIcon')), null, 16))
            ])
          : vue.createCommentVNode("", true),
        ($props.dropdown)
          ? (vue.openBlock(), vue.createBlock(_component_Button, {
              key: 3,
              ref: "dropdownButton",
              type: "button",
              tabindex: "-1",
              class: vue.normalizeClass(['p-autocomplete-dropdown', $props.dropdownClass]),
              disabled: $props.disabled,
              "aria-hidden": "true",
              onClick: $options.onDropdownClick,
              pt: _ctx.ptm('dropdownButton')
            }, {
              icon: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "dropdownicon", {}, () => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.dropdownIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({ class: $props.dropdownIcon }, _ctx.ptm('dropdownButton')['icon']), null, 16, ["class"]))
                ])
              ]),
              _: 3
            }, 8, ["class", "disabled", "onClick", "pt"]))
          : vue.createCommentVNode("", true),
        vue.createElementVNode("span", vue.mergeProps({
          role: "status",
          "aria-live": "polite",
          class: "p-hidden-accessible"
        }, _ctx.ptm('hiddenSearchResult')), vue.toDisplayString($options.searchResultMessageText), 17),
        vue.createVNode(_component_Portal, { appendTo: $props.appendTo }, {
          default: vue.withCtx(() => [
            vue.createVNode(vue.Transition, {
              name: "p-connected-overlay",
              onEnter: $options.onOverlayEnter,
              onAfterEnter: $options.onOverlayAfterEnter,
              onLeave: $options.onOverlayLeave,
              onAfterLeave: $options.onOverlayAfterLeave
            }, {
              default: vue.withCtx(() => [
                ($data.overlayVisible)
                  ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                      key: 0,
                      ref: $options.overlayRef,
                      class: $options.panelStyleClass,
                      style: { ...$props.panelStyle, 'max-height': $options.virtualScrollerDisabled ? $props.scrollHeight : '' },
                      onClick: _cache[13] || (_cache[13] = (...args) => ($options.onOverlayClick && $options.onOverlayClick(...args))),
                      onKeydown: _cache[14] || (_cache[14] = (...args) => ($options.onOverlayKeyDown && $options.onOverlayKeyDown(...args)))
                    }, { ...$props.panelProps, ..._ctx.ptm('panel') }), [
                      vue.renderSlot(_ctx.$slots, "header", {
                        value: $props.modelValue,
                        suggestions: $options.visibleOptions
                      }),
                      vue.createVNode(_component_VirtualScroller, vue.mergeProps({ ref: $options.virtualScrollerRef }, { ...$props.virtualScrollerOptions, ..._ctx.ptm('virtualScroller') }, {
                        style: { height: $props.scrollHeight },
                        items: $options.visibleOptions,
                        tabindex: -1,
                        disabled: $options.virtualScrollerDisabled
                      }), vue.createSlots({
                        content: vue.withCtx(({ styleClass, contentRef, items, getItemOptions, contentStyle, itemSize }) => [
                          vue.createElementVNode("ul", vue.mergeProps({
                            ref: (el) => $options.listRef(el, contentRef),
                            id: $data.id + '_list',
                            class: ['p-autocomplete-items', styleClass],
                            style: contentStyle,
                            role: "listbox"
                          }, _ctx.ptm('list')), [
                            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(items, (option, i) => {
                              return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                                key: $options.getOptionRenderKey(option, $options.getOptionIndex(i, getItemOptions))
                              }, [
                                ($options.isOptionGroup(option))
                                  ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                                      key: 0,
                                      id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
                                      style: { height: itemSize ? itemSize + 'px' : undefined },
                                      class: "p-autocomplete-item-group",
                                      role: "option"
                                    }, _ctx.ptm('itemGroup')), [
                                      vue.renderSlot(_ctx.$slots, "optiongroup", {
                                        option: option.optionGroup,
                                        item: option.optionGroup,
                                        index: $options.getOptionIndex(i, getItemOptions)
                                      }, () => [
                                        vue.createTextVNode(vue.toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 1)
                                      ])
                                    ], 16, _hoisted_6))
                                  : vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                                      key: 1,
                                      id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
                                      style: { height: itemSize ? itemSize + 'px' : undefined },
                                      class: ['p-autocomplete-item', { 'p-highlight': $options.isSelected(option), 'p-focus': $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions), 'p-disabled': $options.isOptionDisabled(option) }],
                                      role: "option",
                                      "aria-label": $options.getOptionLabel(option),
                                      "aria-selected": $options.isSelected(option),
                                      "aria-disabled": $options.isOptionDisabled(option),
                                      "aria-setsize": $options.ariaSetSize,
                                      "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                                      onClick: $event => ($options.onOptionSelect($event, option)),
                                      onMousemove: $event => ($options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions)))
                                    }, $options.getPTOptions(option, getItemOptions, i, 'item')), [
                                      (_ctx.$slots.option)
                                        ? vue.renderSlot(_ctx.$slots, "option", {
                                            key: 0,
                                            option: option,
                                            index: $options.getOptionIndex(i, getItemOptions)
                                          }, () => [
                                            vue.createTextVNode(vue.toDisplayString($options.getOptionLabel(option)), 1)
                                          ])
                                        : vue.renderSlot(_ctx.$slots, "item", {
                                            key: 1,
                                            item: option,
                                            index: $options.getOptionIndex(i, getItemOptions)
                                          }, () => [
                                            vue.createTextVNode(vue.toDisplayString($options.getOptionLabel(option)), 1)
                                          ])
                                    ], 16, _hoisted_7)), [
                                      [_directive_ripple]
                                    ])
                              ], 64))
                            }), 128)),
                            (!items || (items && items.length === 0))
                              ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                                  key: 0,
                                  class: "p-autocomplete-empty-message",
                                  role: "option"
                                }, _ctx.ptm('emptyMessage')), [
                                  vue.renderSlot(_ctx.$slots, "empty", {}, () => [
                                    vue.createTextVNode(vue.toDisplayString($options.searchResultMessageText), 1)
                                  ])
                                ], 16))
                              : vue.createCommentVNode("", true)
                          ], 16, _hoisted_5)
                        ]),
                        _: 2
                      }, [
                        (_ctx.$slots.loader)
                          ? {
                              name: "loader",
                              fn: vue.withCtx(({ options }) => [
                                vue.renderSlot(_ctx.$slots, "loader", { options: options })
                              ]),
                              key: "0"
                            }
                          : undefined
                      ]), 1040, ["style", "items", "disabled"]),
                      vue.renderSlot(_ctx.$slots, "footer", {
                        value: $props.modelValue,
                        suggestions: $options.visibleOptions
                      }),
                      vue.createElementVNode("span", vue.mergeProps({
                        role: "status",
                        "aria-live": "polite",
                        class: "p-hidden-accessible"
                      }, _ctx.ptm('hiddenSelectedMessage')), vue.toDisplayString($options.selectedMessageText), 17)
                    ], 16))
                  : vue.createCommentVNode("", true)
              ]),
              _: 3
            }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
          ]),
          _: 3
        }, 8, ["appendTo"])
      ], 16))
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "\n.p-autocomplete {\n    display: inline-flex;\n    position: relative;\n}\n.p-autocomplete-loader {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n.p-autocomplete-dd .p-autocomplete-input {\n    flex: 1 1 auto;\n    width: 1%;\n}\n.p-autocomplete-dd .p-autocomplete-input,\n.p-autocomplete-dd .p-autocomplete-multiple-container {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n.p-autocomplete-dd .p-autocomplete-dropdown {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0px;\n}\n.p-autocomplete .p-autocomplete-panel {\n    min-width: 100%;\n}\n.p-autocomplete-panel {\n    position: absolute;\n    overflow: auto;\n    top: 0;\n    left: 0;\n}\n.p-autocomplete-items {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n}\n.p-autocomplete-item {\n    cursor: pointer;\n    white-space: nowrap;\n    position: relative;\n    overflow: hidden;\n}\n.p-autocomplete-multiple-container {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    cursor: text;\n    overflow: hidden;\n    display: flex;\n    align-items: center;\n    flex-wrap: wrap;\n}\n.p-autocomplete-token {\n    cursor: default;\n    display: inline-flex;\n    align-items: center;\n    flex: 0 0 auto;\n}\n.p-autocomplete-token-icon {\n    cursor: pointer;\n}\n.p-autocomplete-input-token {\n    flex: 1 1 auto;\n    display: inline-flex;\n}\n.p-autocomplete-input-token input {\n    border: 0 none;\n    outline: 0 none;\n    background-color: transparent;\n    margin: 0;\n    padding: 0;\n    box-shadow: none;\n    border-radius: 0;\n    width: 100%;\n}\n.p-fluid .p-autocomplete {\n    display: flex;\n}\n.p-fluid .p-autocomplete-dd .p-autocomplete-input {\n    width: 1%;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.button, primevue.icons.chevrondown, primevue.icons.spinner, primevue.icons.timescircle, primevue.overlayeventbus, primevue.portal, primevue.ripple, primevue.utils, primevue.virtualscroller, Vue);
