import { Sifter } from '@orchidjs/sifter';
import { TomInput, TomArgObject, TomOption, TomOptions, TomCreateCallback, TomItem, TomSettings, TomTemplateNames, TomClearFilter, RecursivePartial } from './types/index';
declare const TomSelect_base: {
    new (): {
        [x: string]: any;
        plugins: {
            names: string[];
            settings: {
                [key: string]: any;
            };
            requested: {
                [key: string]: boolean;
            };
            loaded: {
                [key: string]: any;
            };
        };
        initializePlugins(plugins: string[] | import("./contrib/microplugin").TPluginHash | import("./contrib/microplugin").TPluginItem[]): void;
        loadPlugin(name: string): void;
        require(name: string): any;
    };
    [x: string]: any;
    define(name: string, fn: (this: any, settings: {
        [key: string]: any;
    }) => any): void;
};
export default class TomSelect extends TomSelect_base {
    control_input: HTMLInputElement;
    wrapper: HTMLElement;
    dropdown: HTMLElement;
    control: HTMLElement;
    dropdown_content: HTMLElement;
    focus_node: HTMLElement;
    order: number;
    settings: TomSettings;
    input: TomInput;
    tabIndex: number;
    is_select_tag: boolean;
    rtl: boolean;
    private inputId;
    private _destroy;
    sifter: Sifter;
    isOpen: boolean;
    isDisabled: boolean;
    isRequired: boolean;
    isInvalid: boolean;
    isValid: boolean;
    isLocked: boolean;
    isFocused: boolean;
    isInputHidden: boolean;
    isSetup: boolean;
    ignoreFocus: boolean;
    ignoreHover: boolean;
    hasOptions: boolean;
    currentResults?: ReturnType<Sifter['search']>;
    lastValue: string;
    caretPos: number;
    loading: number;
    loadedSearches: {
        [key: string]: boolean;
    };
    activeOption: null | HTMLElement;
    activeItems: TomItem[];
    optgroups: TomOptions;
    options: TomOptions;
    userOptions: {
        [key: string]: boolean;
    };
    items: string[];
    constructor(input_arg: string | TomInput, user_settings: RecursivePartial<TomSettings>);
    /**
     * set up event bindings.
     *
     */
    setup(): void;
    /**
     * Register options and optgroups
     *
     */
    setupOptions(options?: TomOption[], optgroups?: TomOption[]): void;
    /**
     * Sets up default rendering functions.
     */
    setupTemplates(): void;
    /**
     * Maps fired events to callbacks provided
     * in the settings used when creating the control.
     */
    setupCallbacks(): void;
    /**
     * Sync the Tom Select instance with the original input or select
     *
     */
    sync(get_settings?: boolean): void;
    /**
     * Triggered when the main control element
     * has a click event.
     *
     */
    onClick(): void;
    /**
     * @deprecated v1.7
     *
     */
    onMouseDown(): void;
    /**
     * Triggered when the value of the control has been changed.
     * This should propagate the event to the original DOM
     * input / select element.
     */
    onChange(): void;
    /**
     * Triggered on <input> paste.
     *
     */
    onPaste(e: MouseEvent | KeyboardEvent): void;
    /**
     * Triggered on <input> keypress.
     *
     */
    onKeyPress(e: KeyboardEvent): void;
    /**
     * Triggered on <input> keydown.
     *
     */
    onKeyDown(e: KeyboardEvent): void;
    /**
     * Triggered on <input> keyup.
     *
     */
    onInput(e: MouseEvent | KeyboardEvent): void;
    /**
     * Triggered when the user rolls over
     * an option in the autocomplete dropdown menu.
     *
     */
    onOptionHover(evt: MouseEvent | KeyboardEvent, option: HTMLElement): void;
    /**
     * Triggered on <input> focus.
     *
     */
    onFocus(e?: MouseEvent | KeyboardEvent): void;
    /**
     * Triggered on <input> blur.
     *
     */
    onBlur(e?: FocusEvent): void;
    /**
     * Triggered when the user clicks on an option
     * in the autocomplete dropdown menu.
     *
     */
    onOptionSelect(evt: MouseEvent | KeyboardEvent, option: HTMLElement): void;
    /**
     * Return true if the given option can be selected
     *
     */
    canSelect(option: HTMLElement | null): boolean;
    /**
     * Triggered when the user clicks on an item
     * that has been selected.
     *
     */
    onItemSelect(evt?: MouseEvent, item?: TomItem): boolean;
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
    canLoad(value: string): boolean;
    /**
     * Invokes the user-provided option provider / loader.
     *
     */
    load(value: string): void;
    /**
     * Invoked by the user-provided option provider
     *
     */
    loadCallback(options: TomOption[], optgroups: TomOption[]): void;
    preload(): void;
    /**
     * Sets the input field of the control to the specified value.
     *
     */
    setTextboxValue(value?: string): void;
    /**
     * Returns the value of the control. If multiple items
     * can be selected (e.g. <select multiple>), this returns
     * an array. If only one item can be selected, this
     * returns a string.
     *
     */
    getValue(): string | string[];
    /**
     * Resets the selected items to the given value.
     *
     */
    setValue(value: string | string[], silent?: boolean): void;
    /**
     * Resets the number of max items to the given value
     *
     */
    setMaxItems(value: null | number): void;
    /**
     * Sets the selected item.
     *
     */
    setActiveItem(item?: TomItem, e?: MouseEvent | KeyboardEvent): void;
    /**
     * Set the active and last-active classes
     *
     */
    setActiveItemClass(item: TomItem): void;
    /**
     * Remove active item
     *
     */
    removeActiveItem(item: TomItem): void;
    /**
     * Clears all the active items
     *
     */
    clearActiveItems(): void;
    /**
     * Sets the selected item in the dropdown menu
     * of available options.
     *
     */
    setActiveOption(option: null | HTMLElement, scroll?: boolean): void;
    /**
     * Sets the dropdown_content scrollTop to display the option
     *
     */
    scrollToOption(option: null | HTMLElement, behavior?: string): void;
    /**
     * Scroll the dropdown to the given position
     *
     */
    scroll(scrollTop: number, behavior?: string): void;
    /**
     * Clears the active option
     *
     */
    clearActiveOption(): void;
    /**
     * Selects all items (CTRL + A).
     */
    selectAll(): void;
    /**
     * Determines if the control_input should be in a hidden or visible state
     *
     */
    inputState(): void;
    /**
     * Hides the input element out of view, while
     * retaining its focus.
     * @deprecated 1.3
     */
    hideInput(): void;
    /**
     * Restores input visibility.
     * @deprecated 1.3
     */
    showInput(): void;
    /**
     * Get the input value
     */
    inputValue(): string;
    /**
     * Gives the control focus.
     */
    focus(): void;
    /**
     * Forces the control out of focus.
     *
     */
    blur(): void;
    /**
     * Returns a function that scores an object
     * to show how good of a match it is to the
     * provided query.
     *
     * @return {function}
     */
    getScoreFunction(query: string): (data: {}) => number;
    /**
     * Returns search options for sifter (the system
     * for scoring and sorting results).
     *
     * @see https://github.com/orchidjs/sifter.js
     * @return {object}
     */
    getSearchOptions(): {
        fields: string[];
        conjunction: string;
        sort: string | import("@orchidjs/sifter/lib/types").SortFn | import("@orchidjs/sifter/lib/types").Sort[];
        nesting: boolean;
    };
    /**
     * Searches through available options and returns
     * a sorted array of matches.
     *
     */
    search(query: string): ReturnType<Sifter['search']>;
    /**
     * Refreshes the list of available options shown
     * in the autocomplete dropdown menu.
     *
     */
    refreshOptions(triggerDropdown?: boolean): void;
    /**
     * Return list of selectable options
     *
     */
    selectable(): NodeList;
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
    addOption(data: TomOption, user_created?: boolean): false | string;
    /**
     * Add multiple options
     *
     */
    addOptions(data: TomOption[], user_created?: boolean): void;
    /**
     * @deprecated 1.7.7
     */
    registerOption(data: TomOption): false | string;
    /**
     * Registers an option group to the pool of option groups.
     *
     * @return {boolean|string}
     */
    registerOptionGroup(data: TomOption): string | false;
    /**
     * Registers a new optgroup for options
     * to be bucketed into.
     *
     */
    addOptionGroup(id: string, data: TomOption): void;
    /**
     * Removes an existing option group.
     *
     */
    removeOptionGroup(id: string): void;
    /**
     * Clears all existing option groups.
     */
    clearOptionGroups(): void;
    /**
     * Updates an option available for selection. If
     * it is visible in the selected items or options
     * dropdown, it will be re-rendered automatically.
     *
     */
    updateOption(value: string, data: TomOption): void;
    /**
     * Removes a single option.
     *
     */
    removeOption(value: string, silent?: boolean): void;
    /**
     * Clears all options.
     */
    clearOptions(filter?: TomClearFilter): void;
    /**
     * Used by clearOptions() to decide whether or not an option should be removed
     * Return true to keep an option, false to remove
     *
     */
    clearFilter(option: TomOption, value: string): boolean;
    /**
     * Returns the dom element of the option
     * matching the given value.
     *
     */
    getOption(value: undefined | null | boolean | string | number, create?: boolean): null | HTMLElement;
    /**
     * Returns the dom element of the next or previous dom element of the same type
     * Note: adjacent options may not be adjacent DOM elements (optgroups)
     *
     */
    getAdjacent(option: null | HTMLElement, direction: number, type?: string): HTMLElement | null;
    /**
     * Returns the dom element of the item
     * matching the given value.
     *
     */
    getItem(item: string | TomItem | null): null | TomItem;
    /**
     * "Selects" multiple items at once. Adds them to the list
     * at the current caret position.
     *
     */
    addItems(values: string | string[], silent?: boolean): void;
    /**
     * "Selects" an item. Adds it to the list
     * at the current caret position.
     *
     */
    addItem(value: string, silent?: boolean): void;
    /**
     * Removes the selected item matching
     * the provided value.
     *
     */
    removeItem(item?: string | TomItem | null, silent?: boolean): void;
    /**
     * Invokes the `create` method provided in the
     * TomSelect options that should provide the data
     * for the new item, given the user input.
     *
     * Once this completes, it will be added
     * to the item list.
     *
     */
    createItem(input?: null | string, callback?: TomCreateCallback): boolean;
    /**
     * Re-renders the selected item lists.
     */
    refreshItems(): void;
    /**
     * Updates all state-dependent attributes
     * and CSS classes.
     */
    refreshState(): void;
    /**
     * Update the `required` attribute of both input and control input.
     *
     * The `required` property needs to be activated on the control input
     * for the error to be displayed at the right place. `required` also
     * needs to be temporarily deactivated on the input since the input is
     * hidden and can't show errors.
     */
    refreshValidityState(): void;
    /**
     * Determines whether or not more items can be added
     * to the control without exceeding the user-defined maximum.
     *
     * @returns {boolean}
     */
    isFull(): boolean;
    /**
     * Refreshes the original <select> or <input>
     * element to reflect the current state.
     *
     */
    updateOriginalInput(opts?: TomArgObject): void;
    /**
     * Shows the autocomplete dropdown containing
     * the available options.
     */
    open(): void;
    /**
     * Closes the autocomplete dropdown menu.
     */
    close(setTextboxValue?: boolean): void;
    /**
     * Calculates and applies the appropriate
     * position of the dropdown if dropdownParent = 'body'.
     * Otherwise, position is determined by css
     */
    positionDropdown(): void;
    /**
     * Resets / clears all selected items
     * from the control.
     *
     */
    clear(silent?: boolean): void;
    /**
     * A helper method for inserting an element
     * at the current caret position.
     *
     */
    insertAtCaret(el: HTMLElement): void;
    /**
     * Removes the current selected item(s).
     *
     */
    deleteSelection(e: KeyboardEvent): boolean;
    /**
     * Return true if the items should be deleted
     */
    shouldDelete(items: TomItem[], evt: MouseEvent | KeyboardEvent): boolean;
    /**
     * Selects the previous / next item (depending on the `direction` argument).
     *
     * > 0 - right
     * < 0 - left
     *
     */
    advanceSelection(direction: number, e?: MouseEvent | KeyboardEvent): void;
    moveCaret(direction: number): void;
    /**
     * Get the last active item
     *
     */
    getLastActive(direction?: number): any;
    /**
     * Moves the caret to the specified index.
     *
     * The input must be moved by leaving it in place and moving the
     * siblings, due to the fact that focus cannot be restored once lost
     * on mobile webkit devices
     *
     */
    setCaret(new_pos: number): void;
    /**
     * Return list of item dom elements
     *
     */
    controlChildren(): TomItem[];
    /**
     * Disables user input on the control. Used while
     * items are being asynchronously created.
     */
    lock(): void;
    /**
     * Re-enables user input on the control.
     */
    unlock(): void;
    /**
     * Disables user input on the control completely.
     * While disabled, it cannot receive focus.
     */
    disable(): void;
    /**
     * Enables the control so that it can respond
     * to focus and user input.
     */
    enable(): void;
    /**
     * Completely destroys the control and
     * unbinds all event listeners so that it can
     * be garbage collected.
     */
    destroy(): void;
    /**
     * A helper method for rendering "item" and
     * "option" templates, given the data.
     *
     */
    render(templateName: TomTemplateNames, data?: any): null | HTMLElement;
    /**
     * Type guarded rendering
     *
     */
    _render(templateName: TomTemplateNames, data?: any): HTMLElement;
    /**
     * Clears the render cache for a template. If
     * no template is given, clears all render
     * caches.
     *
     */
    clearCache(): void;
    /**
     * Removes a value from item and option caches
     *
     */
    uncacheValue(value: string): void;
    /**
     * Determines whether or not to display the
     * create item prompt, given a user input.
     *
     */
    canCreate(input: string): boolean;
    /**
     * Wraps this.`method` so that `new_fn` can be invoked 'before', 'after', or 'instead' of the original method
     *
     * this.hook('instead','onKeyDown',function( arg1, arg2 ...){
     *
     * });
     */
    hook(when: string, method: string, new_fn: any): void;
}
export {};
