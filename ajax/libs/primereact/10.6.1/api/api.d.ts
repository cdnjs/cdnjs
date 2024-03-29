/**
 *
 * API for PrimeReact components.
 *
 * @module api
 *
 */
import { Dispatch, SetStateAction } from 'react';
import { AccordionPassThroughOptions, AccordionTabPassThroughOptions } from '../accordion/accordion';
import { AutoCompletePassThroughOptions } from '../autocomplete/autocomplete';
import { AvatarPassThroughOptions } from '../avatar/avatar';
import { AvatarGroupPassThroughOptions } from '../avatargroup/avatargroup';
import { BadgePassThroughOptions } from '../badge/badge';
import { BlockUIPassThroughOptions } from '../blockui/blockui';
import { BreadCrumbPassThroughOptions } from '../breadcrumb/breadcrumb';
import { ButtonPassThroughOptions } from '../button/button';
import { CalendarPassThroughOptions } from '../calendar/calendar';
import { CardPassThroughOptions } from '../card/card';
import { CarouselPassThroughOptions } from '../carousel/carousel';
import { CascadeSelectPassThroughOptions } from '../cascadeselect/cascadeselect';
import { ChartPassThroughOptions } from '../chart/chart';
import { CheckboxPassThroughOptions } from '../checkbox/checkbox';
import { ChipPassThroughOptions } from '../chip/chip';
import { ChipsPassThroughOptions } from '../chips/chips';
import { ColorPickerPassThroughOptions } from '../colorpicker/colorpicker';
import { ColumnPassThroughOptions } from '../column/column';
import { ColumnGroupPassThroughOptions } from '../columngroup/columngroup';
import { ConfirmDialogPassThroughOptions } from '../confirmdialog/confirmdialog';
import { ConfirmPopupPassThroughOptions } from '../confirmpopup/confirmpopup';
import { ContextMenuPassThroughOptions } from '../contextmenu/contextmenu';
import { DataTablePassThroughOptions } from '../datatable/datatable';
import { DataViewLayoutOptionsPassThroughOptions, DataViewPassThroughOptions } from '../dataview/dataview';
import { DeferredContentPassThroughOptions } from '../deferredcontent/deferredcontent';
import { DialogPassThroughOptions } from '../dialog/dialog';
import { DividerPassThroughOptions } from '../divider/divider';
import { DockPassThroughOptions } from '../dock/dock';
import { DropdownPassThroughOptions } from '../dropdown/dropdown';
import { EditorPassThroughOptions } from '../editor/editor';
import { FieldsetPassThroughOptions } from '../fieldset/fieldset';
import { FileUploadPassThroughOptions } from '../fileupload/fileupload';
import { GalleriaPassThroughOptions } from '../galleria/galleria';
import { ImagePassThroughOptions } from '../image/image';
import { InplacePassThroughOptions } from '../inplace/inplace';
import { InputNumberPassThroughOptions } from '../inputnumber/inputnumber';
import { InputSwitchPassThroughOptions } from '../inputswitch/inputswitch';
import { InputTextPassThroughOptions } from '../inputtext/inputtext';
import { InputTextareaPassThroughOptions } from '../inputtextarea/inputtextarea';
import { KnobPassThroughOptions } from '../knob/knob';
import { ListboxPassThroughOptions } from '../listbox/listbox';
import { MegaMenuPassThroughOptions } from '../megamenu/megamenu';
import { MentionPassThroughOptions } from '../mention/mention';
import { MenuPassThroughOptions } from '../menu/menu';
import { MenubarPassThroughOptions } from '../menubar/menubar';
import { MessagePassThroughOptions } from '../message/message';
import { MessagesPassThroughOptions } from '../messages/messages';
import { MultiSelectPassThroughOptions } from '../multiselect/multiselect';
import { MultiStateCheckboxPassThroughOptions } from '../multistatecheckbox/multistatecheckbox';
import { OrderListPassThroughOptions } from '../orderlist/orderlist';
import { OrganizationChartPassThroughOptions } from '../organizationchart/organizationchart';
import { OverlayPanelPassThroughOptions } from '../overlaypanel/overlaypanel';
import { PaginatorPassThroughOptions } from '../paginator/paginator';
import { PanelPassThroughOptions } from '../panel/panel';
import { PanelMenuPassThroughOptions } from '../panelmenu/panelmenu';
import { PassThroughOptions } from '../passthrough';
import { PasswordPassThroughOptions } from '../password/password';
import { PickListPassThroughOptions } from '../picklist/picklist';
import { ProgressBarPassThroughOptions } from '../progressbar/progressbar';
import { ProgressSpinnerPassThroughOptions } from '../progressspinner/progressspinner';
import { RadioButtonPassThroughOptions } from '../radiobutton/radiobutton';
import { RatingPassThroughOptions } from '../rating/rating';
import { RowPassThroughOptions } from '../row/row';
import { ScrollPanelPassThroughOptions } from '../scrollpanel/scrollpanel';
import { ScrollTopPassThroughOptions } from '../scrolltop/scrolltop';
import { SelectButtonPassThroughOptions } from '../selectbutton/selectbutton';
import { SidebarPassThroughOptions } from '../sidebar/sidebar';
import { SkeletonPassThroughOptions } from '../skeleton/skeleton';
import { SlideMenuPassThroughOptions } from '../slidemenu/slidemenu';
import { SliderPassThroughOptions } from '../slider/slider';
import { SpeedDialPassThroughOptions } from '../speeddial/speeddial';
import { SplitButtonPassThroughOptions } from '../splitbutton/splitbutton';
import { SplitterPassThroughOptions } from '../splitter/splitter';
import { StepsPassThroughOptions } from '../steps/steps';
import { TabMenuPassThroughOptions } from '../tabmenu/tabmenu';
import { TabPanelPassThroughOptions, TabViewPassThroughOptions } from '../tabview/tabview';
import { TagPassThroughOptions } from '../tag/tag';
import { TerminalPassThroughOptions } from '../terminal/terminal';
import { TieredMenuPassThroughOptions } from '../tieredmenu/tieredmenu';
import { TimelinePassThroughOptions } from '../timeline/timeline';
import { ToastPassThroughOptions } from '../toast/toast';
import { ToggleButtonPassThroughOptions } from '../togglebutton/togglebutton';
import { ToolbarPassThroughOptions } from '../toolbar/toolbar';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TreePassThroughOptions } from '../tree/tree';
import { TreeSelectPassThroughOptions } from '../treeselect/treeselect';
import { TreeTablePassThroughOptions } from '../treetable/treetable';
import { VirtualScrollerPassThroughOptions } from '../virtualscroller/virtualscroller';

// Config
/**
 * ZIndex configuration options.
 */
export interface ZIndexOptions {
    /**
     * Sets the base index value for Dialog and Sidebar components.
     * @defaultValue 1100
     */
    modal: number;
    /**
     * Sets the base index value for Overlay components such as Dropdown and OverlayPanel.
     * @defaultValue 1000
     */
    overlay: number;
    /**
     * Sets the base index value for Overlay menus.
     * @defaultValue 1000
     */
    menu: number;
    /**
     * Sets the base index value for Tooltip.
     * @defaultValue 1100
     */
    tooltip: number;
    /**
     * Sets the base index value for Toast.
     * @defaultValue 1200
     */
    toast: number;
}

export type InputStyleType = 'outlined' | 'filled';

export type AppendToType = 'self' | HTMLElement | undefined | null | (() => HTMLElement);

export type StyleContainerType = ShadowRoot | HTMLElement | undefined | null;

/**
 * Filter match modes for DataTable filter menus.
 */
export interface FilterMatchModeOptions {
    /**
     * Array of filter match modes for text filtering.
     */
    text: any[];
    /**
     * Array of filter match modes for numeric filtering.
     */
    numeric: any[];
    /**
     * Array of filter match modes for date filtering.
     */
    date: any[];
}

/**
 * Configuration options for the PrimeReact components.
 */
export interface APIOptions {
    /**
     * This option allows components with overlays like dropdowns or popups to be mounted into either the component or any DOM element, such as document body and self.
     */
    appendTo?: AppendToType;
    /**
     * This option allows `useStyle` to insert dynamic CSS styles into a specific container. This is useful when styles need to be scoped such as in a Shadow DOM.
     * @defaultValue document.head
     */
    styleContainer?: StyleContainerType;
    /**
     * ZIndexes are managed automatically to make sure layering of overlay components work seamlessly when combining multiple components. When autoZIndex is false, each group increments its zIndex within itself.
     */
    autoZIndex?: boolean;
    /**
     * PrimeReact components utilize "react-transition-group" internally to implement animations. Setting "cssTransition" to "false" disables all animations.
     * @defaultValue true
     */
    cssTransition?: boolean;
    /**
     * Default filter modes to display on DataTable filter menus.
     */
    filterMatchModeOptions?: FilterMatchModeOptions;
    /**
     * Define behavior if the browser window is scrolled while displaying an overlay panel like a Dropdown or Calendar. Depending on your organization's accessibility needs some prefer panels to be closed on scrolling and some prefer the overlay follow the scroll.
     * @defaultValue false
     */
    hideOverlaysOnDocumentScrolling?: boolean;
    /**
     * Input fields have two styles: default (outlined with borders) and filled (background-colored). Applying 'p-input-filled' to an input's ancestor enables the filled style.
     */
    inputStyle?: InputStyleType;
    /**
     * The locale configuration sets up the language and region specific preferences.
     * @defaultValue 'en'
     */
    locale?: string;
    /**
     * The nonce value to use on dynamically generated style elements.
     */
    nonce?: string;
    /**
     * Determines how null values are sorted.
     * @defaultValue 1
     */
    nullSortOrder?: number;
    /**
     * Ripple is an optional animation for the supported components such as buttons.
     * @defaultValue false
     */
    ripple?: boolean;
    /**
     * ZIndexes are managed automatically to make sure layering of overlay components work seamlessly when combining multiple components. When autoZIndex is false, each group increments its zIndex within itself. Each property is optional, so when autoZIndex is enabled you can set the z-index for any component type, and the rest will be calculated automatically.
     * @defaultValue { modal: 1100, overlay: 1000, menu: 1000, tooltip: 1100, toast: 1200}
     */
    zIndex?: Partial<ZIndexOptions>;
    /**
     * This option allows to direct implementation of all relevant attributes (e.g., style, classnames) within the respective HTML tag.
     */
    pt?: PrimeReactPTOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
    /**
     * When enabled, it removes all of components styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean;
    /**
     * This method is used to change the theme dynamically.
     * @param {string} theme - The name of the theme to be applied.
     * @param {string} newTheme - The name of the new theme to be applied.
     * @param {string} linkElementId - The id of the link element to be updated.
     * @param callback - Callback to invoke when the theme change is completed.
     */
    changeTheme?(theme?: string, newTheme?: string, linkElementId?: string, callback?: () => void): void;
    /**
     * Sets the "appendTo" state of the context.
     */
    setAppendTo?: Dispatch<SetStateAction<AppendToType>>;
    /**
     * Sets the "styleContainer" state of the context.
     */
    setStyleContainer?: Dispatch<SetStateAction<StyleContainerType>>;
    /**
     * Sets the "autoZIndex" state of the context.
     */
    setAutoZIndex?: Dispatch<SetStateAction<boolean>>;
    /**
     * Sets the "cssTransition" state of the context.
     */
    setCssTransition?: Dispatch<SetStateAction<boolean>>;
    /**
     * Sets the "filterMatchModeOptions" state of the context.
     */
    setFilterMatchModeOptions?: Dispatch<SetStateAction<FilterMatchModeOptions>>;
    /**
     * Sets the "hideOverlaysOnDocumentScrolling" state of the context.
     */
    setHideOverlaysOnDocumentScrolling?: Dispatch<SetStateAction<boolean>>;
    /**
     * Sets the "inputStyle" state of the context.
     */
    setInputStyle?: Dispatch<SetStateAction<InputStyleType>>;
    /**
     * Sets the "locale" state of the context.
     */
    setLocale?: Dispatch<SetStateAction<string>>;
    /**
     * Sets the "nonce" state of the context.
     */
    setNonce?: Dispatch<SetStateAction<string>>;
    /**
     * Sets the "nullSortOrder" state of the context.
     */
    setNullSortOrder?: Dispatch<SetStateAction<number>>;
    /**
     * Sets the "ripple" state of the context.
     */
    setRipple?: Dispatch<SetStateAction<boolean>>;
    /**
     * Sets the "zIndex" state of the context.
     */
    setZIndex?: Dispatch<SetStateAction<ZIndexOptions>>;
    /**
     * Sets the "pt" state of the context.
     */
    setPt?: Dispatch<SetStateAction<PrimeReactPTOptions>>;
}

/**
 * This option allows to direct implementation of all relevant attributes (e.g., style, classnames) within the respective HTML tag globally for all components.
 */
export interface PrimeReactPTOptions {
    /**
     * Custom passthrough(pt) options for Accordion.
     */
    accordion?: AccordionPassThroughOptions;
    /**
     * Custom passthrough(pt) options for AccordionTab.
     */
    accordiontab?: AccordionTabPassThroughOptions;
    /**
     * Custom passthrough(pt) options for AutoComplete.
     */
    autocomplete?: AutoCompletePassThroughOptions;
    /**
     * Custom passthrough(pt) options for Avatar.
     */
    avatar?: AvatarPassThroughOptions;
    /**
     * Custom passthrough(pt) options for AvatarGroup.
     */
    avatargroup?: AvatarGroupPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Badge.
     */
    badge?: BadgePassThroughOptions;
    /**
     * Custom passthrough(pt) options for BlockUI.
     */
    blockui?: BlockUIPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Breadcrumb.
     */
    breadcrumb?: BreadCrumbPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Button.
     */
    button?: ButtonPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Calendar.
     */
    calendar?: CalendarPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Card.
     */
    card?: CardPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Carousel.
     */
    carousel?: CarouselPassThroughOptions;
    /**
     * Custom passthrough(pt) options for CascadeSelect.
     */
    cascadeselect?: CascadeSelectPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Chart.
     */
    chart?: ChartPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Checkbox.
     */
    checkbox?: CheckboxPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Chip.
     */
    chip?: ChipPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Chips.
     */
    chips?: ChipsPassThroughOptions;
    /**
     * Custom passthrough(pt) options for ColorPicker.
     */
    colorpicker?: ColorPickerPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Column.
     */
    column?: ColumnPassThroughOptions;
    /**
     * Custom passthrough(pt) options for ColumnGroup.
     */
    columngroup?: ColumnGroupPassThroughOptions;
    /**
     * Custom passthrough(pt) options for ConfirmDialog.
     */
    confirmdialog?: ConfirmDialogPassThroughOptions;
    /**
     * Custom passthrough(pt) options for ConfirmPopup.
     */
    confirmpopup?: ConfirmPopupPassThroughOptions;
    /**
     * Custom passthrough(pt) options for ContextMenu.
     */
    contextmenu?: ContextMenuPassThroughOptions;
    /**
     * Custom passthrough(pt) options for DataTable.
     */
    datatable?: DataTablePassThroughOptions;
    /**
     * Custom passthrough(pt) options for DataView.
     */
    dataview?: DataViewPassThroughOptions;
    /**
     * Custom passthrough(pt) options for DataViewLayoutOptions.
     */
    dataviewlayoutoptions?: DataViewLayoutOptionsPassThroughOptions;
    /**
     * Custom passthrough(pt) options for DeferredContent.
     */
    deferredcontent?: DeferredContentPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Dialog.
     */
    dialog?: DialogPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Divider.
     */
    divider?: DividerPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Dock.
     */
    dock?: DockPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Dropdown.
     */
    dropdown?: DropdownPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Editor.
     */
    editor?: EditorPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Fieldset.
     */
    fieldset?: FieldsetPassThroughOptions;
    /**
     * Custom passthrough(pt) options for FileUpload.
     */
    fileupload?: FileUploadPassThroughOptions;
    /**
     * Custom passthrough(pt) options for FullCalendar.
     */
    galleria?: GalleriaPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Galleria.
     */
    image?: ImagePassThroughOptions;
    /**
     * Custom passthrough(pt) options for Inplace.
     */
    inplace?: InplacePassThroughOptions;
    /**
     * Custom passthrough(pt) options for InputMask.
     */
    inputmask?: InputTextPassThroughOptions;
    /**
     * Custom passthrough(pt) options for InputNumber.
     */
    inputnumber?: InputNumberPassThroughOptions;
    /**
     * Custom passthrough(pt) options for InputSwitch.
     */
    inputswitch?: InputSwitchPassThroughOptions;
    /**
     * Custom passthrough(pt) options for InputText.
     */
    inputtext?: InputTextPassThroughOptions;
    /**
     * Custom passthrough(pt) options for InputTextarea.
     */
    inputtextarea?: InputTextareaPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Knob.
     */
    knob?: KnobPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Listbox.
     */
    listbox?: ListboxPassThroughOptions;
    /**
     * Custom passthrough(pt) options for MegaMenu.
     */
    megamenu?: MegaMenuPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Mention.
     */
    mention?: MentionPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Menu.
     */
    menu?: MenuPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Menubar.
     */
    menubar?: MenubarPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Message.
     */
    message?: MessagePassThroughOptions;
    /**
     * Custom passthrough(pt) options for Messages.
     */
    messages?: MessagesPassThroughOptions;
    /**
     * Custom passthrough(pt) options for MultiSelect.
     */
    multiselect?: MultiSelectPassThroughOptions;
    /**
     * Custom passthrough(pt) options for MultiStateCheckbox.
     */
    multistatecheckbox?: MultiStateCheckboxPassThroughOptions;
    /**
     * Custom passthrough(pt) options for OrderList.
     */
    orderlist?: OrderListPassThroughOptions;
    /**
     * Custom passthrough(pt) options for OrganizationChart.
     */
    organizationchart?: OrganizationChartPassThroughOptions;
    /**
     * Custom passthrough(pt) options for OverlayPanel.
     */
    overlaypanel?: OverlayPanelPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Paginator.
     */
    paginator?: PaginatorPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Panel.
     */
    panel?: PanelPassThroughOptions;
    /**
     * Custom passthrough(pt) options for PanelMenu.
     */
    panelmenu?: PanelMenuPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Password.
     */
    password?: PasswordPassThroughOptions;
    /**
     * Custom passthrough(pt) options for PickList.
     */
    picklist?: PickListPassThroughOptions;
    /**
     * Custom passthrough(pt) options for ProgressBar.
     */
    progressbar?: ProgressBarPassThroughOptions;
    /**
     * Custom passthrough(pt) options for ProgressSpinner.
     */
    progressspinner?: ProgressSpinnerPassThroughOptions;
    /**
     * Custom passthrough(pt) options for RadioButton.
     */
    radiobutton?: RadioButtonPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Rating.
     */
    rating?: RatingPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Row.
     */
    row?: RowPassThroughOptions;
    /**
     * Custom passthrough(pt) options for ScrollPanel.
     */
    scrollpanel?: ScrollPanelPassThroughOptions;
    /**
     * Custom passthrough(pt) options for ScrollTop.
     */
    scrolltop?: ScrollTopPassThroughOptions;
    /**
     * Custom passthrough(pt) options for SelectButton.
     */
    selectbutton?: SelectButtonPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Sidebar.
     */
    sidebar?: SidebarPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Skeleton.
     */
    skeleton?: SkeletonPassThroughOptions;
    /**
     * Custom passthrough(pt) options for SliderMenu.
     */
    slidemenu?: SlideMenuPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Slider.
     */
    slider?: SliderPassThroughOptions;
    /**
     * Custom passthrough(pt) options for SpeedDial.
     */
    speeddial?: SpeedDialPassThroughOptions;
    /**
     * Custom passthrough(pt) options for SplitButton.
     */
    splitbutton?: SplitButtonPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Splitter.
     */
    splitter?: SplitterPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Steps.
     */
    steps?: StepsPassThroughOptions;
    /**
     * Custom passthrough(pt) options for TabMenu.
     */
    tabmenu?: TabMenuPassThroughOptions;
    /**
     * Custom passthrough(pt) options for TabPanel.
     */
    tabpanel?: TabPanelPassThroughOptions;
    /**
     * Custom passthrough(pt) options for TabView.
     */
    tabview?: TabViewPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Tag.
     */
    tag?: TagPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Terminal.
     */
    terminal?: TerminalPassThroughOptions;
    /**
     * Custom passthrough(pt) options for TieredMenu.
     */
    tieredmenu?: TieredMenuPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Timeline.
     */
    timeline?: TimelinePassThroughOptions;
    /**
     * Custom passthrough(pt) options for Toast.
     */
    toast?: ToastPassThroughOptions;
    /**
     * Custom passthrough(pt) options for ToffleButton.
     */
    togglebutton?: ToggleButtonPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Toolbar.
     */
    toolbar?: ToolbarPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Tooltip.
     */
    tooltip?: TooltipPassThroughOptions;
    /**
     * Custom passthrough(pt) options for Tree.
     */
    tree?: TreePassThroughOptions;
    /**
     * Custom passthrough(pt) options for TreeSelect.
     */
    treeselect?: TreeSelectPassThroughOptions;
    /**
     * Custom passthrough(pt) options for TreeTable.
     */
    treetable?: TreeTablePassThroughOptions;
    /**
     * Custom passthrough(pt) options for VirtualScroller.
     */
    virtualscroller?: VirtualScrollerPassThroughOptions;
    /**
     * Custom passthrough(pt) options for global css.
     */
    global?: {
        css?: (options: any) => string | string | undefined;
    };
}

/**
 * @deprecated since version 9.6.0. Use PrimeReactContext instead.
 */
declare const PrimeReact: APIOptions;

export default PrimeReact;

type PrimeReactProviderProps = {
    /**
     * Any default global API options
     */
    value?: Partial<APIOptions>;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children: React.ReactNode;
};

declare const PrimeReactProvider: React.FC<PrimeReactProviderProps>;
declare const PrimeReactContext: React.Context<APIOptions>;

export { PrimeReactContext, PrimeReactProvider };

// Locale
/**
 * Sets the current locale if installed.
 * @param {string} locale - Locale string.
 * @return {object} - Locale object.
 */
export declare function locale(locale: string): { locale: string; options: object };
/**
 * Installs a new locale.
 * @param {string} locale - Locale string.
 * @param {LocaleOptions} options - Locale options. See [PrimeLocale](https://github.com/primefaces/primelocale) on GitHub for possible options.
 */
export declare function addLocale(locale: string, options: LocaleOptions): void;
/**
 * Changes the specific option value of a locale.
 * @param {string} key - Option key.
 * @param {*} value - Option value.
 * @param {string} locale - Locale string.
 */
export declare function updateLocaleOption(key: string, value: any, locale: string): void;
/**
 * Changes the option values of a locale.
 * @param {LocaleOptions} options - Locale options.
 * @param {string} locale - Locale string.
 */
export declare function updateLocaleOptions(options: object, locale: string): void;
/**
 * Return the value of a specific locale option.
 * @param {string} key - Option key.
 * @param {string} locale - Locale string.
 */
export declare function localeOption(key: string, locale: string): any;
/**
 * Returns the values of locale options.
 * @param {string} locale - Locale string.
 */
export declare function localeOptions(locale: string): object;

// Locale Options
export interface LocaleOptions {
    /**
     * Starts with
     */
    startsWith?: string;
    /**
     * Contains
     */
    contains?: string;
    /**
     * Not contains
     */
    notContains?: string;
    /**
     * Ends with
     */
    endsWith?: string;
    /**
     * Equals
     */
    equals?: string;
    /**
     * Not equals
     */
    notEquals?: string;
    /**
     * No Filter
     */
    noFilter?: string;
    /**
     * Filter
     */
    filter?: string;
    /**
     * Less than
     */
    lt?: string;
    /**
     * Less than or equal to
     */
    lte?: string;
    /**
     * Greater than
     */
    gt?: string;
    /**
     * Greater than or equal to
     */
    gte?: string;
    /**
     * Date is
     */
    dateIs?: string;
    /**
     * Date is not
     */
    dateIsNot?: string;
    /**
     * Date is before
     */
    dateBefore?: string;
    /**
     * Date is after
     */
    dateAfter?: string;
    /**
     * Custom
     */
    custom?: string;
    /**
     * Clear
     */
    clear?: string;
    /**
     * Apply
     */
    apply?: string;
    /**
     * Match All
     */
    matchAll?: string;
    /**
     * Match Any
     */
    matchAny?: string;
    /**
     * Add Rule
     */
    addRule?: string;
    /**
     * Remove Rule
     */
    removeRule?: string;
    /**
     * Yes
     */
    accept?: string;
    /**
     * No
     */
    reject?: string;
    /**
     * Choose
     */
    choose?: string;
    /**
     * Upload
     */
    upload?: string;
    /**
     * Cancel
     */
    cancel?: string;
    /**
     * Close
     */
    close?: string;
    /**
     * Pending
     */
    pending?: string;
    /**
     * ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
     */
    fileSizeTypes?: string[];
    /**
     * ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
     */
    dayNames?: string[];
    /**
     * ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
     */
    dayNamesShort?: string[];
    /**
     * ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
     */
    dayNamesMin?: string[];
    /**
     * ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
     */
    monthNames?: string[];
    /**
     * ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
     */
    monthNamesShort?: string[];
    /**
     * Choose Year
     */
    chooseYear?: string;
    /**
     * Choose Month
     */
    chooseMonth?: string;
    /**
     * Choose Date
     */
    chooseDate?: string;
    /**
     * Previous Decade
     */
    prevDecade?: string;
    /**
     * Next Decade
     */
    nextDecade?: string;
    /**
     * Previous Year
     */
    prevYear?: string;
    /**
     * Next Year
     */
    nextYear?: string;
    /**
     * Previous Month
     */
    prevMonth?: string;
    /**
     * Next Month
     */
    nextMonth?: string;
    /**
     * Previous Hour
     */
    prevHour?: string;
    /**
     * Next Hour
     */
    nextHour?: string;
    /**
     * Previous Minute
     */
    prevMinute?: string;
    /**
     * Next Minute
     */
    nextMinute?: string;
    /**
     * Previous Second
     */
    prevSecond?: string;
    /**
     * Next Second
     */
    nextSecond?: string;
    /**
     * AM
     */
    am?: string;
    /**
     * PM
     */
    pm?: string;
    /**
     * Today (Calendar date only)
     */
    today?: string;
    /**
     * Now (Calendar using time)
     */
    now?: string;
    /**
     * Wk
     */
    weekHeader?: string;
    /**
     * 0
     */
    firstDayOfWeek?: number;
    /**
     * mm/dd/yy
     */
    dateFormat?: string;
    /**
     * Weak
     */
    weak?: string;
    /**
     * Medium
     */
    medium?: string;
    /**
     * Strong
     */
    strong?: string;
    /**
     * Enter a password
     */
    passwordPrompt?: string;
    /**
     * No available options
     */
    emptyFilterMessage?: string;
    /**
     * No results found
     */
    emptyMessage?: string;
    /**
     * ARIA labels
     */
    aria?: {
        /**
         * True
         */
        trueLabel?: string;
        /**
         * False
         */
        falseLabel?: string;
        /**
         * Not Selected
         */
        nullLabel?: string;
        /**
         * 1 star
         */
        star?: string;
        /**
         * {star} stars
         */
        stars?: string;
        /**
         *  All items selected
         */
        selectAll?: string;
        /**
         * All items unselected
         */
        unselectAll?: string;
        /**
         * Close
         */
        close?: string;
        /**
         * Previous
         */
        previous?: string;
        /**
         * Next
         */
        next?: string;
        /**
         * Navigation
         */
        navigation?: string;
        /**
         * Scroll Top
         */
        scrollTop?: string;
        /**
         * Move Top
         */
        moveTop?: string;
        /**
         * Move Up
         */
        moveUp?: string;
        /**
         * Move Down
         */
        moveDown?: string;
        /**
         * Move Bottom
         */
        moveBottom?: string;
        /**
         * Move to Target
         */
        moveToTarget?: string;
        /**
         * Move to Source
         */
        moveToSource?: string;
        /**
         * Move All to Target
         */
        moveAllToTarget?: string;
        /**
         * Move All to Source
         */
        moveAllToSource?: string;
        /**
         * Page {page}
         */
        pageLabel?: string;
        /**
         * Please enter one time password character {0}
         */
        otpLabel?: string;
        /**
         * First Page
         */
        firstPageLabel?: string;
        /**
         * Last Page
         */
        lastPageLabel?: string;
        /**
         * Next Page
         */
        nextPageLabel?: string;
        /**
         * Previous Page
         */
        previousPageLabel?: string;
        /**
         * Rows per page
         */
        rowsPerPageLabel?: string;
        /**
         *  Jump to Page Dropdown
         */
        jumpToPageDropdownLabel?: string;
        /**
         *  Jump to Page Input
         */
        jumpToPageInputLabel?: string;
        /**
         *  Row Selected
         */
        selectRow?: string;
        /**
         * Row Unselected
         */
        unselectRow?: string;
        /**
         * Row Expanded
         */
        expandRow?: string;
        /**
         * Row Collapsed
         */
        collapseRow?: string;
        /**
         * Show Filter Menu
         */
        showFilterMenu?: string;
        /**
         * Hide Filter Menu
         */
        hideFilterMenu?: string;
        /**
         * Filter Operator
         */
        filterOperator?: string;
        /**
         * Filter Constraint
         */
        filterConstraint?: string;
        /**
         *  Edit Row
         */
        editRow?: string;
        /**
         * Save Edit
         */
        saveEdit?: string;
        /**
         * Cancel Edit
         */
        cancelEdit?: string;
        /**
         * List View
         */
        listView?: string;
        /**
         * Grid View
         */
        gridView?: string;
        /**
         * Slide
         */
        slide?: string;
        /**
         * {slideNumber}
         */
        slideNumber?: string;
        /**
         * Zoom Image
         */
        zoomImage?: string;
        /**
         * Zoom In
         */
        zoomIn?: string;
        /**
         * Zoom Out
         */
        zoomOut?: string;
        /**
         * Rotate Right
         */
        rotateRight?: string;
        /**
         * Rotate Left
         */
        rotateLeft?: string;
    };
}

// Icons
export interface PrimeIconsOptions {
    readonly ALIGN_CENTER: string;
    readonly ALIGN_JUSTIFY: string;
    readonly ALIGN_LEFT: string;
    readonly ALIGN_RIGHT: string;
    readonly AMAZON: string;
    readonly ANDROID: string;
    readonly ANGLE_DOUBLE_DOWN: string;
    readonly ANGLE_DOUBLE_LEFT: string;
    readonly ANGLE_DOUBLE_RIGHT: string;
    readonly ANGLE_DOUBLE_UP: string;
    readonly ANGLE_DOWN: string;
    readonly ANGLE_LEFT: string;
    readonly ANGLE_RIGHT: string;
    readonly ANGLE_UP: string;
    readonly APPLE: string;
    readonly ARROW_CIRCLE_DOWN: string;
    readonly ARROW_CIRCLE_LEFT: string;
    readonly ARROW_CIRCLE_RIGHT: string;
    readonly ARROW_CIRCLE_UP: string;
    readonly ARROW_DOWN: string;
    readonly ARROW_DOWN_LEFT: string;
    readonly ARROW_DOWN_RIGHT: string;
    readonly ARROW_LEFT: string;
    readonly ARROW_RIGHT: string;
    readonly ARROW_UP: string;
    readonly ARROW_UP_LEFT: string;
    readonly ARROW_UP_RIGHT: string;
    readonly ARROWS_H: string;
    readonly ARROWS_V: string;
    readonly AT: string;
    readonly BACKWARD: string;
    readonly BAN: string;
    readonly BARS: string;
    readonly BELL: string;
    readonly BOLT: string;
    readonly BOOK: string;
    readonly BOOKMARK: string;
    readonly BOOKMARK_FILL: string;
    readonly BOX: string;
    readonly BRIEFCASE: string;
    readonly BUILDING: string;
    readonly CALENDAR: string;
    readonly CALENDAR_MINUS: string;
    readonly CALENDAR_PLUS: string;
    readonly CALENDAR_TIMES: string;
    readonly CAMERA: string;
    readonly CAR: string;
    readonly CARET_DOWN: string;
    readonly CARET_LEFT: string;
    readonly CARET_RIGHT: string;
    readonly CARET_UP: string;
    readonly CHART_BAR: string;
    readonly CHART_LINE: string;
    readonly CHART_PIE: string;
    readonly CHECK: string;
    readonly CHECK_CIRCLE: string;
    readonly CHECK_SQUARE: string;
    readonly CHEVRON_CIRCLE_DOWN: string;
    readonly CHEVRON_CIRCLE_LEFT: string;
    readonly CHEVRON_CIRCLE_RIGHT: string;
    readonly CHEVRON_CIRCLE_UP: string;
    readonly CHEVRON_DOWN: string;
    readonly CHEVRON_LEFT: string;
    readonly CHEVRON_RIGHT: string;
    readonly CHEVRON_UP: string;
    readonly CIRCLE: string;
    readonly CIRCLE_FILL: string;
    readonly CLOCK: string;
    readonly CLONE: string;
    readonly CLOUD: string;
    readonly CLOUD_DOWNLOAD: string;
    readonly CLOUD_UPLOAD: string;
    readonly CODE: string;
    readonly COG: string;
    readonly COMMENT: string;
    readonly COMMENTS: string;
    readonly COMPASS: string;
    readonly COPY: string;
    readonly CREDIT_CARD: string;
    readonly DATABASE: string;
    readonly DESKTOP: string;
    readonly DIRECTIONS: string;
    readonly DIRECTIONS_ALT: string;
    readonly DISCORD: string;
    readonly DOLLAR: string;
    readonly DOWNLOAD: string;
    readonly EJECT: string;
    readonly ELLIPSIS_H: string;
    readonly ELLIPSIS_V: string;
    readonly ENVELOPE: string;
    readonly EURO: string;
    readonly EXCLAMATION_CIRCLE: string;
    readonly EXCLAMATION_TRIANGLE: string;
    readonly EXTERNAL_LINK: string;
    readonly EYE: string;
    readonly EYE_SLASH: string;
    readonly FACEBOOK: string;
    readonly FAST_BACKWARD: string;
    readonly FAST_FORWARD: string;
    readonly FILE: string;
    readonly FILE_EXCEL: string;
    readonly FILE_PDF: string;
    readonly FILTER: string;
    readonly FILTER_FILL: string;
    readonly FILTER_SLASH: string;
    readonly FLAG: string;
    readonly FLAG_FILL: string;
    readonly FOLDER: string;
    readonly FOLDER_OPEN: string;
    readonly FORWARD: string;
    readonly GITHUB: string;
    readonly GLOBE: string;
    readonly GOOGLE: string;
    readonly HASHTAG: string;
    readonly HEART: string;
    readonly HEART_FILL: string;
    readonly HISTORY: string;
    readonly HOME: string;
    readonly ID_CARD: string;
    readonly IMAGE: string;
    readonly IMAGES: string;
    readonly INBOX: string;
    readonly INFO: string;
    readonly INFO_CIRCLE: string;
    readonly INSTAGRAM: string;
    readonly KEY: string;
    readonly LINK: string;
    readonly LINKEDIN: string;
    readonly LIST: string;
    readonly LOCK: string;
    readonly LOCK_OPEN: string;
    readonly MAP: string;
    readonly MAP_MARKER: string;
    readonly MICROSOFT: string;
    readonly MINUS: string;
    readonly MINUS_CIRCLE: string;
    readonly MOBILE: string;
    readonly MONEY_BILL: string;
    readonly MOON: string;
    readonly PALETTE: string;
    readonly PAPERCLIP: string;
    readonly PAUSE: string;
    readonly PAYPAL: string;
    readonly PENCIL: string;
    readonly PERCENTAGE: string;
    readonly PHONE: string;
    readonly PLAY: string;
    readonly PLUS: string;
    readonly PLUS_CIRCLE: string;
    readonly POUND: string;
    readonly POWER_OFF: string;
    readonly PRIME: string;
    readonly PRINT: string;
    readonly QRCODE: string;
    readonly QUESTION: string;
    readonly QUESTION_CIRCLE: string;
    readonly REDDIT: string;
    readonly REFRESH: string;
    readonly REPLAY: string;
    readonly REPLY: string;
    readonly SAVE: string;
    readonly SEARCH: string;
    readonly SEARCH_MINUS: string;
    readonly SEARCH_PLUS: string;
    readonly SEND: string;
    readonly SERVER: string;
    readonly SHARE_ALT: string;
    readonly SHIELD: string;
    readonly SHOPPING_BAG: string;
    readonly SHOPPING_CART: string;
    readonly SIGN_IN: string;
    readonly SIGN_OUT: string;
    readonly SITEMAP: string;
    readonly SLACK: string;
    readonly SLIDERS_H: string;
    readonly SLIDERS_V: string;
    readonly SORT: string;
    readonly SORT_ALPHA_DOWN: string;
    readonly SORT_ALPHA_ALT_DOWN: string;
    readonly SORT_ALPHA_UP: string;
    readonly SORT_ALPHA_ALT_UP: string;
    readonly SORT_ALT: string;
    readonly SORT_ALT_SLASH: string;
    readonly SORT_AMOUNT_DOWN: string;
    readonly SORT_AMOUNT_DOWN_ALT: string;
    readonly SORT_AMOUNT_UP: string;
    readonly SORT_AMOUNT_UP_ALT: string;
    readonly SORT_DOWN: string;
    readonly SORT_NUMERIC_DOWN: string;
    readonly SORT_NUMERIC_ALT_DOWN: string;
    readonly SORT_NUMERIC_UP: string;
    readonly SORT_NUMERIC_ALT_UP: string;
    readonly SORT_UP: string;
    readonly SPINNER: string;
    readonly STAR: string;
    readonly STAR_FILL: string;
    readonly STEP_BACKWARD: string;
    readonly STEP_BACKWARD_ALT: string;
    readonly STEP_FORWARD: string;
    readonly STEP_FORWARD_ALT: string;
    readonly STOP: string;
    readonly STOP_CIRCLE: string;
    readonly SUN: string;
    readonly SYNC: string;
    readonly TABLE: string;
    readonly TABLET: string;
    readonly TAG: string;
    readonly TAGS: string;
    readonly TELEGRAM: string;
    readonly TH_LARGE: string;
    readonly THUMBS_DOWN: string;
    readonly THUMBS_UP: string;
    readonly TICKET: string;
    readonly TIMES: string;
    readonly TIMES_CIRCLE: string;
    readonly TRASH: string;
    readonly TWITTER: string;
    readonly UNDO: string;
    readonly UNLOCK: string;
    readonly UPLOAD: string;
    readonly USER: string;
    readonly USER_EDIT: string;
    readonly USER_MINUS: string;
    readonly USER_PLUS: string;
    readonly USERS: string;
    readonly VIDEO: string;
    readonly VIMEO: string;
    readonly VOLUME_DOWN: string;
    readonly VOLUME_OFF: string;
    readonly VOLUME_UP: string;
    readonly WALLET: string;
    readonly WHATSAPP: string;
    readonly WIFI: string;
    readonly WINDOW_MAXIMIZE: string;
    readonly WINDOW_MINIMIZE: string;
    readonly YOUTUBE: string;
}

export declare const PrimeIcons: PrimeIconsOptions;

// Severity
export declare enum MessageSeverity {
    SUCCESS = 'success',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    SECONDARY = 'secondary',
    CONTRAST = 'contrast'
}

// Filter
export declare enum FilterMatchMode {
    STARTS_WITH = 'startsWith',
    CONTAINS = 'contains',
    NOT_CONTAINS = 'notContains',
    ENDS_WITH = 'endsWith',
    EQUALS = 'equals',
    NOT_EQUALS = 'notEquals',
    IN = 'in',
    NOT_IN = 'notIn',
    LESS_THAN = 'lt',
    LESS_THAN_OR_EQUAL_TO = 'lte',
    GREATER_THAN = 'gt',
    GREATER_THAN_OR_EQUAL_TO = 'gte',
    BETWEEN = 'between',
    DATE_IS = 'dateIs',
    DATE_IS_NOT = 'dateIsNot',
    DATE_BEFORE = 'dateBefore',
    DATE_AFTER = 'dateAfter',
    CUSTOM = 'custom'
}

export declare enum FilterOperator {
    AND = 'and',
    OR = 'or'
}

export declare enum SortOrder {
    DESC = -1,
    UNSORTED = 0,
    ASC = 1
}

export declare namespace FilterService {
    export function filter(value: any, fields: string[], filterValue: any, filterMatchMode: string, filterLocale?: string): any[];
    export const filters: {
        startsWith(value: any, filter: string, filterLocale?: string): boolean;
        contains(value: any, filter: string, filterLocale?: string): boolean;
        notContains(value: any, filter: string, filterLocale?: string): boolean;
        endsWith(value: any, filter: string, filterLocale?: string): boolean;
        equals(value: any, filter: string, filterLocale?: string): boolean;
        notEquals(value: any, filter: string, filterLocale?: string): boolean;
        in(value: any, filter: string): boolean;
        between(value: any, filter: string): boolean;
        lt(value: any, filter: string): boolean;
        lte(value: any, filter: string): boolean;
        gt(value: any, filter: string): boolean;
        gte(value: any, filter: string): boolean;
        dateIs(value: any, filter: string): boolean;
        dateIsNot(value: any, filter: string): boolean;
        dateBefore(value: any, filter: string): boolean;
        dateAfter(value: any, filter: string): boolean;
    };
    export function register(rule: string, fn: (...arg: any[]) => boolean): void;
}
