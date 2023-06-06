import * as React from 'react';
import { AriaAttributes, Component, FocusEventHandler, FormEventHandler, KeyboardEventHandler, MouseEventHandler, ReactNode, RefCallback, TouchEventHandler } from 'react';
import { FilterOptionOption } from './filters';
import { AriaLiveMessages, AriaSelection } from './accessibility/index';
import { SelectComponentsConfig } from './components/index';
import { ClassNamesConfig, StylesConfig, StylesProps } from './styles';
import { ThemeConfig } from './theme';
import { ActionMeta, FocusDirection, GetOptionLabel, GetOptionValue, GroupBase, InputActionMeta, MenuPlacement, MenuPosition, OnChangeValue, Options, OptionsOrGroups, PropsValue, SetValueAction } from './types';
export declare type FormatOptionLabelContext = 'menu' | 'value';
export interface FormatOptionLabelMeta<Option> {
    context: FormatOptionLabelContext;
    inputValue: string;
    selectValue: Options<Option>;
}
export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    /** HTML ID of an element containing an error message related to the input**/
    'aria-errormessage'?: AriaAttributes['aria-errormessage'];
    /** Indicate if the value entered in the field is invalid **/
    'aria-invalid'?: AriaAttributes['aria-invalid'];
    /** Aria label (for assistive tech) */
    'aria-label'?: AriaAttributes['aria-label'];
    /** HTML ID of an element that should be used as the label (for assistive tech) */
    'aria-labelledby'?: AriaAttributes['aria-labelledby'];
    /** Used to set the priority with which screen reader should treat updates to live regions. The possible settings are: off, polite (default) or assertive */
    'aria-live'?: AriaAttributes['aria-live'];
    /** Customise the messages used by the aria-live component */
    ariaLiveMessages?: AriaLiveMessages<Option, IsMulti, Group>;
    /** Focus the control when it is mounted */
    autoFocus?: boolean;
    /** Remove the currently focused option when the user presses backspace when Select isClearable or isMulti */
    backspaceRemovesValue: boolean;
    /** Remove focus from the input when the user selects an option (handy for dismissing the keyboard on touch devices) */
    blurInputOnSelect: boolean;
    /** When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent  */
    captureMenuScroll: boolean;
    /** Sets a className attribute on the outer component */
    className?: string;
    /**
     * If provided, all inner components will be given a prefixed className attribute.
     *
     * This is useful when styling via CSS classes instead of the Styles API approach.
     */
    classNamePrefix?: string | null;
    /**
     * Provide classNames based on state for each inner component
     */
    classNames: ClassNamesConfig<Option, IsMulti, Group>;
    /** Close the select menu when the user selects an option */
    closeMenuOnSelect: boolean;
    /**
     * If `true`, close the select menu when the user scrolls the document/body.
     *
     * If a function, takes a standard javascript `ScrollEvent` you return a boolean:
     *
     * `true` => The menu closes
     *
     * `false` => The menu stays open
     *
     * This is useful when you have a scrollable modal and want to portal the menu out,
     * but want to avoid graphical issues.
     */
    closeMenuOnScroll: boolean | ((event: Event) => boolean);
    /**
     * This complex object includes all the compositional components that are used
     * in `react-select`. If you wish to overwrite a component, pass in an object
     * with the appropriate namespace.
     *
     * If you only wish to restyle a component, we recommend using the `styles` prop
     * instead. For a list of the components that can be passed in, and the shape
     * that will be passed to them, see [the components docs](/components)
     */
    components: SelectComponentsConfig<Option, IsMulti, Group>;
    /** Whether the value of the select, e.g. SingleValue, should be displayed in the control. */
    controlShouldRenderValue: boolean;
    /** Delimiter used to join multiple values into a single HTML Input value */
    delimiter?: string;
    /** Clear all values when the user presses escape AND the menu is closed */
    escapeClearsValue: boolean;
    /** Custom method to filter whether an option should be displayed in the menu */
    filterOption: ((option: FilterOptionOption<Option>, inputValue: string) => boolean) | null;
    /**
     * Formats group labels in the menu as React components
     *
     * An example can be found in the [Replacing builtins](/advanced#replacing-builtins) documentation.
     */
    formatGroupLabel: (group: Group) => ReactNode;
    /** Formats option labels in the menu and control as React components */
    formatOptionLabel?: (data: Option, formatOptionLabelMeta: FormatOptionLabelMeta<Option>) => ReactNode;
    /**
     * Resolves option data to a string to be displayed as the label by components
     *
     * Note: Failure to resolve to a string type can interfere with filtering and
     * screen reader support.
     */
    getOptionLabel: GetOptionLabel<Option>;
    /** Resolves option data to a string to compare options and specify value attributes */
    getOptionValue: GetOptionValue<Option>;
    /** Hide the selected option from the menu */
    hideSelectedOptions?: boolean;
    /** The id to set on the SelectContainer component. */
    id?: string;
    /** The value of the search input */
    inputValue: string;
    /** The id of the search input */
    inputId?: string;
    /** Define an id prefix for the select components e.g. {your-id}-value */
    instanceId?: number | string;
    /** Is the select value clearable */
    isClearable?: boolean;
    /** Is the select disabled */
    isDisabled: boolean;
    /** Is the select in a state of loading (async) */
    isLoading: boolean;
    /**
     * Override the built-in logic to detect whether an option is disabled
     *
     * An example can be found in the [Replacing builtins](/advanced#replacing-builtins) documentation.
     */
    isOptionDisabled: (option: Option, selectValue: Options<Option>) => boolean;
    /** Override the built-in logic to detect whether an option is selected */
    isOptionSelected?: (option: Option, selectValue: Options<Option>) => boolean;
    /** Support multiple selected options */
    isMulti: IsMulti;
    /** Is the select direction right-to-left */
    isRtl: boolean;
    /** Whether to enable search functionality */
    isSearchable: boolean;
    /** Async: Text to display when loading options */
    loadingMessage: (obj: {
        inputValue: string;
    }) => ReactNode;
    /** Minimum height of the menu before flipping */
    minMenuHeight: number;
    /** Maximum height of the menu before scrolling */
    maxMenuHeight: number;
    /** Whether the menu is open */
    menuIsOpen: boolean;
    /**
     * Default placement of the menu in relation to the control. 'auto' will flip
     * when there isn't enough space below the control.
     */
    menuPlacement: MenuPlacement;
    /** The CSS position value of the menu, when "fixed" extra layout management is required */
    menuPosition: MenuPosition;
    /**
     * Whether the menu should use a portal, and where it should attach
     *
     * An example can be found in the [Portaling](/advanced#portaling) documentation
     */
    menuPortalTarget?: HTMLElement | null;
    /** Whether to block scroll events when the menu is open */
    menuShouldBlockScroll: boolean;
    /** Whether the menu should be scrolled into view when it opens */
    menuShouldScrollIntoView: boolean;
    /** Name of the HTML Input (optional - without this, no input will be rendered) */
    name?: string;
    /** Text to display when there are no options */
    noOptionsMessage: (obj: {
        inputValue: string;
    }) => ReactNode;
    /** Handle blur events on the control */
    onBlur?: FocusEventHandler<HTMLInputElement>;
    /** Handle change events on the select */
    onChange: (newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => void;
    /** Handle focus events on the control */
    onFocus?: FocusEventHandler<HTMLInputElement>;
    /** Handle change events on the input */
    onInputChange: (newValue: string, actionMeta: InputActionMeta) => void;
    /** Handle key down events on the select */
    onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
    /** Handle the menu opening */
    onMenuOpen: () => void;
    /** Handle the menu closing */
    onMenuClose: () => void;
    /** Fired when the user scrolls to the top of the menu */
    onMenuScrollToTop?: (event: WheelEvent | TouchEvent) => void;
    /** Fired when the user scrolls to the bottom of the menu */
    onMenuScrollToBottom?: (event: WheelEvent | TouchEvent) => void;
    /** Allows control of whether the menu is opened when the Select is focused */
    openMenuOnFocus: boolean;
    /** Allows control of whether the menu is opened when the Select is clicked */
    openMenuOnClick: boolean;
    /** Array of options that populate the select menu */
    options: OptionsOrGroups<Option, Group>;
    /** Number of options to jump in menu when page{up|down} keys are used */
    pageSize: number;
    /** Placeholder for the select value */
    placeholder: ReactNode;
    /** Status to relay to screen readers */
    screenReaderStatus: (obj: {
        count: number;
    }) => string;
    /**
     * Style modifier methods
     *
     * A basic example can be found at the bottom of the [Replacing builtins](/advanced#replacing-builtins) documentation.
     */
    styles: StylesConfig<Option, IsMulti, Group>;
    /** Theme modifier method */
    theme?: ThemeConfig;
    /** Sets the tabIndex attribute on the input */
    tabIndex: number;
    /** Select the currently focused option when the user presses tab */
    tabSelectsValue: boolean;
    /** Remove all non-essential styles */
    unstyled: boolean;
    /** The value of the select; reflected by the selected option */
    value: PropsValue<Option>;
    /** Sets the form attribute on the input */
    form?: string;
    /** Marks the value-holding input as required for form validation */
    required?: boolean;
}
export declare const defaultProps: {
    'aria-live': string;
    backspaceRemovesValue: boolean;
    blurInputOnSelect: boolean;
    captureMenuScroll: boolean;
    classNames: {};
    closeMenuOnSelect: boolean;
    closeMenuOnScroll: boolean;
    components: {};
    controlShouldRenderValue: boolean;
    escapeClearsValue: boolean;
    filterOption: (option: FilterOptionOption<unknown>, rawInput: string) => boolean;
    formatGroupLabel: <Option, Group extends GroupBase<Option>>(group: Group) => string;
    getOptionLabel: <Option_1>(option: Option_1) => string;
    getOptionValue: <Option_2>(option: Option_2) => string;
    isDisabled: boolean;
    isLoading: boolean;
    isMulti: boolean;
    isRtl: boolean;
    isSearchable: boolean;
    isOptionDisabled: <Option_3>(option: Option_3) => boolean;
    loadingMessage: () => string;
    maxMenuHeight: number;
    minMenuHeight: number;
    menuIsOpen: boolean;
    menuPlacement: string;
    menuPosition: string;
    menuShouldBlockScroll: boolean;
    menuShouldScrollIntoView: boolean;
    noOptionsMessage: () => string;
    openMenuOnFocus: boolean;
    openMenuOnClick: boolean;
    options: never[];
    pageSize: number;
    placeholder: string;
    screenReaderStatus: ({ count }: {
        count: number;
    }) => string;
    styles: {};
    tabIndex: number;
    tabSelectsValue: boolean;
    unstyled: boolean;
};
interface State<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    ariaSelection: AriaSelection<Option, IsMulti> | null;
    inputIsHidden: boolean;
    isFocused: boolean;
    focusedOption: Option | null;
    focusedValue: Option | null;
    selectValue: Options<Option>;
    clearFocusValueOnUpdate: boolean;
    prevWasFocused: boolean;
    inputIsHiddenAfterUpdate: boolean | null | undefined;
    prevProps: Props<Option, IsMulti, Group> | void;
}
interface CategorizedOption<Option> {
    type: 'option';
    data: Option;
    isDisabled: boolean;
    isSelected: boolean;
    label: string;
    value: string;
    index: number;
}
interface CategorizedGroup<Option, Group extends GroupBase<Option>> {
    type: 'group';
    data: Group;
    options: readonly CategorizedOption<Option>[];
    index: number;
}
declare type CategorizedGroupOrOption<Option, Group extends GroupBase<Option>> = CategorizedGroup<Option, Group> | CategorizedOption<Option>;
export default class Select<Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>> extends Component<Props<Option, IsMulti, Group>, State<Option, IsMulti, Group>> {
    static defaultProps: {
        'aria-live': string;
        backspaceRemovesValue: boolean;
        blurInputOnSelect: boolean;
        captureMenuScroll: boolean;
        classNames: {};
        closeMenuOnSelect: boolean;
        closeMenuOnScroll: boolean;
        components: {};
        controlShouldRenderValue: boolean;
        escapeClearsValue: boolean;
        filterOption: (option: FilterOptionOption<unknown>, rawInput: string) => boolean;
        formatGroupLabel: <Option_1, Group_1 extends GroupBase<Option_1>>(group: Group_1) => string;
        getOptionLabel: <Option_2>(option: Option_2) => string;
        getOptionValue: <Option_3>(option: Option_3) => string;
        isDisabled: boolean;
        isLoading: boolean;
        isMulti: boolean;
        isRtl: boolean;
        isSearchable: boolean;
        isOptionDisabled: <Option_4>(option: Option_4) => boolean;
        loadingMessage: () => string;
        maxMenuHeight: number;
        minMenuHeight: number;
        menuIsOpen: boolean;
        menuPlacement: string;
        menuPosition: string;
        menuShouldBlockScroll: boolean;
        menuShouldScrollIntoView: boolean;
        noOptionsMessage: () => string;
        openMenuOnFocus: boolean;
        openMenuOnClick: boolean;
        options: never[];
        pageSize: number;
        placeholder: string;
        screenReaderStatus: ({ count }: {
            count: number;
        }) => string;
        styles: {};
        tabIndex: number;
        tabSelectsValue: boolean;
        unstyled: boolean;
    };
    state: State<Option, IsMulti, Group>;
    blockOptionHover: boolean;
    isComposing: boolean;
    commonProps: any;
    initialTouchX: number;
    initialTouchY: number;
    instancePrefix: string;
    openAfterFocus: boolean;
    scrollToFocusedOptionOnUpdate: boolean;
    userIsDragging?: boolean;
    controlRef: HTMLDivElement | null;
    getControlRef: RefCallback<HTMLDivElement>;
    focusedOptionRef: HTMLDivElement | null;
    getFocusedOptionRef: RefCallback<HTMLDivElement>;
    menuListRef: HTMLDivElement | null;
    getMenuListRef: RefCallback<HTMLDivElement>;
    inputRef: HTMLInputElement | null;
    getInputRef: RefCallback<HTMLInputElement>;
    constructor(props: Props<Option, IsMulti, Group>);
    static getDerivedStateFromProps(props: Props<unknown, boolean, GroupBase<unknown>>, state: State<unknown, boolean, GroupBase<unknown>>): {
        prevProps: Props<unknown, boolean, GroupBase<unknown>>;
        ariaSelection: AriaSelection<unknown, boolean> | null;
        prevWasFocused: boolean;
        inputIsHidden: boolean;
        inputIsHiddenAfterUpdate: undefined;
    } | {
        prevProps: Props<unknown, boolean, GroupBase<unknown>>;
        ariaSelection: AriaSelection<unknown, boolean> | null;
        prevWasFocused: boolean;
        inputIsHidden?: undefined;
        inputIsHiddenAfterUpdate?: undefined;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props<Option, IsMulti, Group>): void;
    componentWillUnmount(): void;
    onMenuOpen(): void;
    onMenuClose(): void;
    onInputChange(newValue: string, actionMeta: InputActionMeta): void;
    focusInput(): void;
    blurInput(): void;
    focus: () => void;
    blur: () => void;
    openMenu(focusOption: 'first' | 'last'): void;
    focusValue(direction: 'previous' | 'next'): void;
    focusOption(direction?: FocusDirection): void;
    onChange: (newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => void;
    setValue: (newValue: OnChangeValue<Option, IsMulti>, action: SetValueAction, option?: Option | undefined) => void;
    selectOption: (newValue: Option) => void;
    removeValue: (removedValue: Option) => void;
    clearValue: () => void;
    popValue: () => void;
    getTheme(): import("./types").Theme;
    getValue: () => Options<Option>;
    cx: (...args: any) => string;
    getCommonProps(): {
        clearValue: () => void;
        cx: (...args: any) => string;
        getStyles: <Key extends keyof StylesProps<Option, IsMulti, Group>>(key: Key, props: StylesProps<Option, IsMulti, Group>[Key]) => import("./types").CSSObjectWithLabel;
        getClassNames: <Key_1 extends keyof StylesProps<Option, IsMulti, Group>>(key: Key_1, props: StylesProps<Option, IsMulti, Group>[Key_1]) => string | undefined;
        getValue: () => Options<Option>;
        hasValue: boolean;
        isMulti: IsMulti;
        isRtl: boolean;
        options: OptionsOrGroups<Option, Group>;
        selectOption: (newValue: Option) => void;
        selectProps: Readonly<Props<Option, IsMulti, Group>> & Readonly<{
            children?: React.ReactNode;
        }>;
        setValue: (newValue: OnChangeValue<Option, IsMulti>, action: SetValueAction, option?: Option | undefined) => void;
        theme: import("./types").Theme;
    };
    getOptionLabel: (data: Option) => string;
    getOptionValue: (data: Option) => string;
    getStyles: <Key extends keyof StylesProps<Option, IsMulti, Group>>(key: Key, props: StylesProps<Option, IsMulti, Group>[Key]) => import("./types").CSSObjectWithLabel;
    getClassNames: <Key extends keyof StylesProps<Option, IsMulti, Group>>(key: Key, props: StylesProps<Option, IsMulti, Group>[Key]) => string | undefined;
    getElementId: (element: 'group' | 'input' | 'listbox' | 'option' | 'placeholder' | 'live-region') => string;
    getComponents: () => {
        ClearIndicator: <Option_1, IsMulti_1 extends boolean, Group_1 extends GroupBase<Option_1>>(props: import(".").ClearIndicatorProps<Option_1, IsMulti_1, Group_1>) => import("@emotion/react").jsx.JSX.Element;
        Control: <Option_2, IsMulti_2 extends boolean, Group_2 extends GroupBase<Option_2>>(props: import(".").ControlProps<Option_2, IsMulti_2, Group_2>) => import("@emotion/react").jsx.JSX.Element;
        DropdownIndicator: <Option_3, IsMulti_3 extends boolean, Group_3 extends GroupBase<Option_3>>(props: import(".").DropdownIndicatorProps<Option_3, IsMulti_3, Group_3>) => import("@emotion/react").jsx.JSX.Element;
        DownChevron: (props: import("./components/indicators").DownChevronProps) => import("@emotion/react").jsx.JSX.Element;
        CrossIcon: (props: import("./components/indicators").CrossIconProps) => import("@emotion/react").jsx.JSX.Element;
        Group: <Option_4, IsMulti_4 extends boolean, Group_4 extends GroupBase<Option_4>>(props: import(".").GroupProps<Option_4, IsMulti_4, Group_4>) => import("@emotion/react").jsx.JSX.Element;
        GroupHeading: <Option_5, IsMulti_5 extends boolean, Group_5 extends GroupBase<Option_5>>(props: import(".").GroupHeadingProps<Option_5, IsMulti_5, Group_5>) => import("@emotion/react").jsx.JSX.Element;
        IndicatorsContainer: <Option_6, IsMulti_6 extends boolean, Group_6 extends GroupBase<Option_6>>(props: import(".").IndicatorsContainerProps<Option_6, IsMulti_6, Group_6>) => import("@emotion/react").jsx.JSX.Element;
        IndicatorSeparator: <Option_7, IsMulti_7 extends boolean, Group_7 extends GroupBase<Option_7>>(props: import(".").IndicatorSeparatorProps<Option_7, IsMulti_7, Group_7>) => import("@emotion/react").jsx.JSX.Element;
        Input: <Option_8, IsMulti_8 extends boolean, Group_8 extends GroupBase<Option_8>>(props: import(".").InputProps<Option_8, IsMulti_8, Group_8>) => import("@emotion/react").jsx.JSX.Element;
        LoadingIndicator: {
            <Option_9, IsMulti_9 extends boolean, Group_9 extends GroupBase<Option_9>>(props: import(".").LoadingIndicatorProps<Option_9, IsMulti_9, Group_9>): import("@emotion/react").jsx.JSX.Element;
            defaultProps: {
                size: number;
            };
        };
        Menu: <Option_10, IsMulti_10 extends boolean, Group_10 extends GroupBase<Option_10>>(props: import("./components/Menu").MenuProps<Option_10, IsMulti_10, Group_10>) => import("@emotion/react").jsx.JSX.Element;
        MenuList: <Option_11, IsMulti_11 extends boolean, Group_11 extends GroupBase<Option_11>>(props: import("./components/Menu").MenuListProps<Option_11, IsMulti_11, Group_11>) => import("@emotion/react").jsx.JSX.Element;
        MenuPortal: <Option_12, IsMulti_12 extends boolean, Group_12 extends GroupBase<Option_12>>(props: import("./components/Menu").MenuPortalProps<Option_12, IsMulti_12, Group_12>) => import("@emotion/react").jsx.JSX.Element | null;
        LoadingMessage: {
            <Option_13, IsMulti_13 extends boolean, Group_13 extends GroupBase<Option_13>>(props: import("./components/Menu").NoticeProps<Option_13, IsMulti_13, Group_13>): import("@emotion/react").jsx.JSX.Element;
            defaultProps: {
                children: string;
            };
        };
        NoOptionsMessage: {
            <Option_14, IsMulti_14 extends boolean, Group_14 extends GroupBase<Option_14>>(props: import("./components/Menu").NoticeProps<Option_14, IsMulti_14, Group_14>): import("@emotion/react").jsx.JSX.Element;
            defaultProps: {
                children: string;
            };
        };
        MultiValue: <Option_15, IsMulti_15 extends boolean, Group_15 extends GroupBase<Option_15>>(props: import(".").MultiValueProps<Option_15, IsMulti_15, Group_15>) => import("@emotion/react").jsx.JSX.Element;
        MultiValueContainer: <Option_16, IsMulti_16 extends boolean, Group_16 extends GroupBase<Option_16>>({ children, innerProps, }: import(".").MultiValueGenericProps<Option_16, IsMulti_16, Group_16>) => import("@emotion/react").jsx.JSX.Element;
        MultiValueLabel: <Option_16, IsMulti_16 extends boolean, Group_16 extends GroupBase<Option_16>>({ children, innerProps, }: import(".").MultiValueGenericProps<Option_16, IsMulti_16, Group_16>) => import("@emotion/react").jsx.JSX.Element;
        MultiValueRemove: typeof import("./components/MultiValue").MultiValueRemove;
        Option: <Option_17, IsMulti_17 extends boolean, Group_17 extends GroupBase<Option_17>>(props: import(".").OptionProps<Option_17, IsMulti_17, Group_17>) => import("@emotion/react").jsx.JSX.Element;
        Placeholder: <Option_18, IsMulti_18 extends boolean, Group_18 extends GroupBase<Option_18>>(props: import(".").PlaceholderProps<Option_18, IsMulti_18, Group_18>) => import("@emotion/react").jsx.JSX.Element;
        SelectContainer: <Option_19, IsMulti_19 extends boolean, Group_19 extends GroupBase<Option_19>>(props: import(".").ContainerProps<Option_19, IsMulti_19, Group_19>) => import("@emotion/react").jsx.JSX.Element;
        SingleValue: <Option_20, IsMulti_20 extends boolean, Group_20 extends GroupBase<Option_20>>(props: import(".").SingleValueProps<Option_20, IsMulti_20, Group_20>) => import("@emotion/react").jsx.JSX.Element;
        ValueContainer: <Option_21, IsMulti_21 extends boolean, Group_21 extends GroupBase<Option_21>>(props: import(".").ValueContainerProps<Option_21, IsMulti_21, Group_21>) => import("@emotion/react").jsx.JSX.Element;
    };
    buildCategorizedOptions: () => CategorizedGroupOrOption<Option, Group>[];
    getCategorizedOptions: () => CategorizedGroupOrOption<Option, Group>[];
    buildFocusableOptions: () => Option[];
    getFocusableOptions: () => Option[];
    ariaOnChange: (value: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => void;
    hasValue(): boolean;
    hasOptions(): boolean;
    isClearable(): boolean;
    isOptionDisabled(option: Option, selectValue: Options<Option>): boolean;
    isOptionSelected(option: Option, selectValue: Options<Option>): boolean;
    filterOption(option: FilterOptionOption<Option>, inputValue: string): boolean;
    formatOptionLabel(data: Option, context: FormatOptionLabelContext): ReactNode;
    formatGroupLabel(data: Group): React.ReactNode;
    onMenuMouseDown: MouseEventHandler<HTMLDivElement>;
    onMenuMouseMove: MouseEventHandler<HTMLDivElement>;
    onControlMouseDown: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    onDropdownIndicatorMouseDown: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    onClearIndicatorMouseDown: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    onScroll: (event: Event) => void;
    startListeningComposition(): void;
    stopListeningComposition(): void;
    onCompositionStart: () => void;
    onCompositionEnd: () => void;
    startListeningToTouch(): void;
    stopListeningToTouch(): void;
    onTouchStart: ({ touches }: TouchEvent) => void;
    onTouchMove: ({ touches }: TouchEvent) => void;
    onTouchEnd: (event: TouchEvent) => void;
    onControlTouchEnd: TouchEventHandler<HTMLDivElement>;
    onClearIndicatorTouchEnd: TouchEventHandler<HTMLDivElement>;
    onDropdownIndicatorTouchEnd: TouchEventHandler<HTMLDivElement>;
    handleInputChange: FormEventHandler<HTMLInputElement>;
    onInputFocus: FocusEventHandler<HTMLInputElement>;
    onInputBlur: FocusEventHandler<HTMLInputElement>;
    onOptionHover: (focusedOption: Option) => void;
    shouldHideSelectedOptions: () => boolean | IsMulti;
    onValueInputFocus: FocusEventHandler;
    onKeyDown: KeyboardEventHandler<HTMLDivElement>;
    renderInput(): JSX.Element;
    renderPlaceholderOrValue(): JSX.Element | JSX.Element[] | null;
    renderClearIndicator(): JSX.Element | null;
    renderLoadingIndicator(): JSX.Element | null;
    renderIndicatorSeparator(): JSX.Element | null;
    renderDropdownIndicator(): JSX.Element | null;
    renderMenu(): JSX.Element | null;
    renderFormField(): JSX.Element | undefined;
    renderLiveRegion(): JSX.Element;
    render(): JSX.Element;
}
export declare type PublicBaseSelectProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = JSX.LibraryManagedAttributes<typeof Select, Props<Option, IsMulti, Group>>;
export {};
