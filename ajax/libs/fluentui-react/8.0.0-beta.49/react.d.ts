import { SelectableOptionMenuItemType as DropdownMenuItemType } from '@fluentui/react-internal/lib/SelectableOption';
import { IAutofillProps } from '@fluentui/react-internal/lib/Autofill';
import { IBaseProps } from '@fluentui/react-internal/lib/Utilities';
import { IButtonProps } from '@fluentui/react-internal/lib/compat/Button';
import { IButtonStyles } from '@fluentui/react-internal/lib/compat/Button';
import { ICheckboxStyleProps } from '@fluentui/react-internal/lib/Checkbox';
import { ICheckboxStyles } from '@fluentui/react-internal/lib/Checkbox';
import { IComponentAs } from '@fluentui/react-internal/lib/Utilities';
import { IDragDropContext } from '@fluentui/react-internal/lib/DragDrop';
import { IDragDropEvents } from '@fluentui/react-internal/lib/DragDrop';
import { IDragDropHelper } from '@fluentui/react-internal/lib/DragDrop';
import { IDragDropOptions } from '@fluentui/react-internal/lib/DragDrop';
import { IFocusZoneProps } from '@fluentui/react-internal/lib/FocusZone';
import { IIconProps } from '@fluentui/react-internal/lib/Icon';
import { ILabelStyleProps } from '@fluentui/react-internal/lib/Label';
import { ILabelStyles } from '@fluentui/react-internal/lib/Label';
import { ILinkProps } from '@fluentui/react-internal/lib/Link';
import { IList } from '@fluentui/react-internal/lib/List';
import { IListProps } from '@fluentui/react-internal/lib/List';
import { ImageFit } from '@fluentui/react-internal/lib/Image';
import { IPanelStyleProps } from '@fluentui/react-internal/lib/Panel';
import { IPanelStyles } from '@fluentui/react-internal/lib/Panel';
import { IProcessedStyleSet } from '@fluentui/react-internal/lib/Styling';
import { IRefObject } from '@fluentui/react-internal/lib/Utilities';
import { IRenderFunction } from '@fluentui/react-internal/lib/Utilities';
import { ISelectableDroppableTextProps } from '@fluentui/react-internal/lib/SelectableOption';
import { ISelectableOption } from '@fluentui/react-internal/lib/SelectableOption';
import { ISelection } from '@fluentui/react-internal/lib/Selection';
import { ISelectionZoneProps } from '@fluentui/react-internal/lib/Selection';
import { IStyle } from '@fluentui/react-internal/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react-internal/lib/Utilities';
import { ITheme } from '@fluentui/react-internal/lib/Styling';
import { ITooltipHostProps } from '@fluentui/react-internal/lib/Tooltip';
import { IViewport } from '@fluentui/react-internal/lib/utilities/decorators/withViewport';
import { IWithViewportProps } from '@fluentui/react-internal/lib/utilities/decorators/withViewport';
import { PersonaInitialsColor } from '@fluentui/react-internal/lib/Persona';
import * as React from 'react';
import { RectangleEdge } from '@fluentui/react-internal/lib/Positioning';
import { ResponsiveMode } from '@fluentui/react-internal/lib/utilities/decorators/withResponsiveMode';
import { ScrollToMode } from '@fluentui/react-internal/lib/List';
import { SelectionMode } from '@fluentui/react-internal/lib/Selection';

export declare const Breadcrumb: React.FunctionComponent<IBreadcrumbProps>;

/**
 * {@docCategory Breadcrumb}
 */
export declare class BreadcrumbBase extends React.Component<IBreadcrumbProps, any> {
    static defaultProps: IBreadcrumbProps;
    private _classNames;
    private _focusZone;
    constructor(props: IBreadcrumbProps);
    /**
     * Sets focus to the first breadcrumb link.
     */
    focus(): void;
    render(): JSX.Element;
    /**
     * Remove the first rendered item past the overlow point and put it and the end the overflow set.
     */
    private _onReduceData;
    /**
     * Remove the last item of the overflow set and insert the item as the start of the rendered set past the overflow
     * point.
     */
    private _onGrowData;
    private _onRenderBreadcrumb;
    private _onRenderItem;
    private _onBreadcrumbClicked;
    /**
     * Validate incoming props
     * @param props - Props to validate
     */
    private _validateProps;
}

export declare function buildColumns(items: any[], canResizeColumns?: boolean, onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void, sortedColumnKey?: string, isSortedDescending?: boolean, groupedColumnKey?: string, isMultiline?: boolean): IColumn[];

/**
 * {@docCategory DetailsList}
 */
export declare enum CheckboxVisibility {
    /** Visible on hover. */
    onHover = 0,
    /** Visible always. */
    always = 1,
    /** Hide checkboxes. */
    hidden = 2
}

/**
 * {@docCategory GroupedList}
 */
export declare enum CollapseAllVisibility {
    hidden = 0,
    visible = 1
}

/**
 * Enum to describe how a particular column header behaves.
 * This is used to to specify the property `IColumn.columnActionsMode`.
 * If `IColumn.columnActionsMode` is undefined, it's equivalent to `ColumnActionsMode.clickable`.
 * {@docCategory DetailsList}
 */
export declare enum ColumnActionsMode {
    /** Renders the column header as disabled. */
    disabled = 0,
    /** Renders the column header as clickable. Default value. */
    clickable = 1,
    /** Renders the column header as clickable and displays the dropdown chevron. */
    hasDropdown = 2
}

/**
 * Enum to describe where the column has been dropped, after starting the drag
 * {@docCategory DetailsList}
 */
export declare enum ColumnDragEndLocation {
    /** Drag ended outside of current list */
    outside = 0,
    /** Drag ended within current list */
    surface = 1,
    /** Drag ended on header */
    header = 2
}

export declare const ComboBox: React.FunctionComponent<IComboBoxProps>;

/**
 * {@docCategory DetailsList}
 */
export declare enum ConstrainMode {
    /** Lets the content grow which allows the page to manage scrolling. */
    unconstrained = 0,
    /** Constrains the list to the given layout space. */
    horizontalConstrained = 1
}

export declare const DEFAULT_CELL_STYLE_PROPS: ICellStyleProps;

export declare const DEFAULT_ROW_HEIGHTS: {
    rowHeight: number;
    compactRowHeight: number;
};

/**
 * Component for rendering columns in a `DetailsList`.
 *
 * {@docCategory DetailsList}
 */
export declare class DetailsColumnBase extends React.Component<IDetailsColumnProps> {
    private _async;
    private _events;
    private _root;
    private _dragDropSubscription;
    private _classNames;
    constructor(props: IDetailsColumnProps);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    private _onRenderColumnHeaderTooltip;
    private _onColumnClick;
    private _getColumnDragDropOptions;
    private _hasAccessibleLabel;
    private _renderAccessibleLabel;
    private _onDragStart;
    private _onDragEnd;
    private _updateHeaderDragInfo;
    private _onColumnContextMenu;
    private _onRootMouseDown;
    private _addDragDropHandling;
}

export declare const DetailsHeader: React.FunctionComponent<IDetailsHeaderBaseProps>;

export declare class DetailsHeaderBase extends React.Component<IDetailsHeaderBaseProps, IDetailsHeaderState> implements IDetailsHeader {
    static defaultProps: {
        selectAllVisibility: SelectAllVisibility;
        collapseAllVisibility: CollapseAllVisibility;
        useFastIcons: boolean;
    };
    private _classNames;
    private _rootElement;
    private _events;
    private _rootComponent;
    private _id;
    private _draggedColumnIndex;
    private _dropHintDetails;
    private _dragDropHelper;
    private _currentDropHintIndex;
    private _subscriptionObject;
    private _onDropIndexInfo;
    constructor(props: IDetailsHeaderBaseProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IDetailsHeaderBaseProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    /** Set focus to the active thing in the focus area. */
    focus(): boolean;
    /**
     * Gets column reorder props from this.props. If the calling code is part of setting up or
     * handling drag/drop events, it's safe to assume that this method's return value is defined
     * (because drag/drop handling will only be set up if reorder props are given).
     */
    private _getColumnReorderProps;
    private _getHeaderDragDropOptions;
    private _updateDroppingState;
    private _isValidCurrentDropHintIndex;
    private _onDragOver;
    private _onDrop;
    /**
     * @returns whether or not the "Select All" checkbox column is hidden.
     */
    private _isCheckboxColumnHidden;
    private _updateDragInfo;
    private _resetDropHints;
    private _updateDropHintElement;
    private _getDropHintPositions;
    /**
     * Based on the given cursor position, finds the nearest drop hint and updates the state to make it visible
     */
    private _computeDropHintToBeShown;
    private _isEventOnHeader;
    private _renderColumnSizer;
    private _renderColumnDivider;
    private _renderDropHint;
    private _onRenderColumnHeaderTooltip;
    /**
     * double click on the column sizer will auto ajust column width
     * to fit the longest content among current rendered rows.
     *
     * @param columnIndex - index of the column user double clicked
     * @param ev - mouse double click event
     */
    private _onSizerDoubleClick;
    /**
     * Called when the select all toggle is clicked.
     */
    private _onSelectAllClicked;
    private _onRootMouseDown;
    private _onRootMouseMove;
    private _onRootKeyDown;
    /**
     * mouse move event handler in the header
     * it will set isSizing state to true when user clicked on the sizer and move the mouse.
     *
     * @param ev - mouse move event
     */
    private _onSizerMouseMove;
    private _onSizerBlur;
    /**
     * mouse up event handler in the header
     * clear the resize related state.
     * This is to ensure we can catch double click event
     *
     * @param ev - mouse up event
     */
    private _onSizerMouseUp;
    private _onSelectionChanged;
    private _onToggleCollapseAll;
}

export declare const DetailsList: React.FunctionComponent<IDetailsListProps>;

export declare class DetailsListBase extends React.Component<IDetailsListProps, IDetailsListState> implements IDetailsList {
    static defaultProps: {
        layoutMode: DetailsListLayoutMode;
        selectionMode: SelectionMode;
        constrainMode: ConstrainMode;
        checkboxVisibility: CheckboxVisibility;
        isHeaderVisible: boolean;
        compact: boolean;
        useFastIcons: boolean;
    };
    private _async;
    private _root;
    private _header;
    private _groupedList;
    private _list;
    private _focusZone;
    private _selectionZone;
    private _selection;
    private _activeRows;
    private _dragDropHelper;
    private _initialFocusedIndex;
    private _columnOverrides;
    static getDerivedStateFromProps(nextProps: IDetailsListProps, previousState: IDetailsListState): IDetailsListState;
    constructor(props: IDetailsListProps);
    scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
    focusIndex(index: number, forceIntoFirstElement?: boolean, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
    getStartItemIndexInView(): number;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: IDetailsListProps, prevState: IDetailsListState): void;
    render(): JSX.Element;
    forceUpdate(): void;
    protected _onRenderRow: (props: IDetailsRowProps, defaultRender?: IRenderFunction<IDetailsRowProps> | undefined) => JSX.Element;
    private _getDerivedStateFromProps;
    private _onGroupExpandStateChanged;
    private _onColumnIsSizingChanged;
    private _getGroupNestingDepth;
    private _onRowDidMount;
    private _setFocusToRowIfPending;
    private _setFocusToRow;
    private _onRowWillUnmount;
    private _onToggleCollapse;
    private _forceListUpdates;
    private _notifyColumnsResized;
    private _adjustColumns;
    /** Returns adjusted columns, given the viewport size and layout mode. */
    private _getAdjustedColumns;
    /** Builds a set of columns based on the given columns mixed with the current overrides. */
    private _getFixedColumns;
    private _getJustifiedColumnsAfterResize;
    /** Builds a set of columns to fix within the viewport width. */
    private _getJustifiedColumns;
    private _onColumnResized;
    private _rememberCalculatedWidth;
    private _getColumnOverride;
    /**
     * Callback function when double clicked on the details header column resizer
     * which will measure the column cells of all the active rows and resize the
     * column to the max cell width.
     *
     * @param column - double clicked column definition
     * @param columnIndex - double clicked column index
     * TODO: min width 100 should be changed to const value and should be consistent with the
     * value used on _onSizerMove method in DetailsHeader
     */
    private _onColumnAutoResized;
    /**
     * Call back function when an element in FocusZone becomes active. It will translate it into item
     * and call onActiveItemChanged callback if specified.
     *
     * @param row - element that became active in Focus Zone
     * @param focus - event from Focus Zone
     */
    private _onActiveRowChanged;
    private _onBlur;
    private _getItemKey;
}

/**
 * {@docCategory DetailsList}
 */
export declare enum DetailsListLayoutMode {
    /**
     * Lets the user resize columns and makes not attempt to fit them.
     */
    fixedColumns = 0,
    /**
     * Manages which columns are visible, tries to size them according to their min/max rules and drops
     * off columns that can't fit and have isCollapsible set.
     */
    justified = 1
}

export declare const DetailsRow: React.FunctionComponent<IDetailsRowBaseProps>;

export declare class DetailsRowBase extends React.Component<IDetailsRowBaseProps, IDetailsRowState> {
    private _events;
    private _root;
    private _cellMeasurer;
    private _focusZone;
    private _droppingClassNames;
    /** Whether this.props.onDidMount has been called */
    private _onDidMountCalled;
    private _dragDropSubscription;
    private _classNames;
    private _rowClassNames;
    static getDerivedStateFromProps(nextProps: IDetailsRowBaseProps, previousState: IDetailsRowState): IDetailsRowState;
    constructor(props: IDetailsRowBaseProps);
    componentDidMount(): void;
    componentDidUpdate(previousProps: IDetailsRowBaseProps): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: IDetailsRowBaseProps, nextState: IDetailsRowState): boolean;
    render(): JSX.Element;
    /**
     * measure cell at index. and call the call back with the measured cell width when finish measure
     *
     * @param index - The cell index
     * @param onMeasureDone - The call back function when finish measure
     */
    measureCell(index: number, onMeasureDone: (width: number) => void): void;
    focus(forceIntoFirstElement?: boolean): boolean;
    protected _onRenderCheck(props: IDetailsRowCheckProps): JSX.Element;
    private _onSelectionChanged;
    private _getRowDragDropOptions;
    /**
     * update isDropping state based on the input value, which is used to change style during drag and drop
     *
     * when change to true, that means drag enter. we will add default dropping class name
     * or the custom dropping class name (return result from onDragEnter) to the root elemet.
     *
     * when change to false, that means drag leave. we will remove the dropping class name from root element.
     *
     * @param newValue - New isDropping state value
     * @param event - The event trigger dropping state change which can be dragenter, dragleave etc
     */
    private _updateDroppingState;
}

export declare const DetailsRowCheck: React.FunctionComponent<IDetailsRowCheckProps>;

/**
 * Component for rendering a row's cells in a `DetailsList`.
 *
 * {@docCategory DetailsList}
 */
export declare const DetailsRowFields: React.FunctionComponent<IDetailsRowFieldsProps>;

export declare const DetailsRowGlobalClassNames: {
    root: string;
    compact: string;
    cell: string;
    cellAnimation: string;
    cellCheck: string;
    check: string;
    cellMeasurer: string;
    listCellFirstChild: string;
    isContentUnselectable: string;
    isSelected: string;
    isCheckVisible: string;
    isRowHeader: string;
    fields: string;
};

export declare const DocumentCard: React.FunctionComponent<IDocumentCardProps>;

export declare const DocumentCardActions: React.FunctionComponent<IDocumentCardActionsProps>;

/**
 * {@docCategory DocumentCard}
 */
declare class DocumentCardActionsBase extends React.Component<IDocumentCardActionsProps, any> {
    private _classNames;
    constructor(props: IDocumentCardActionsProps);
    render(): JSX.Element;
}

export declare const DocumentCardActivity: React.FunctionComponent<IDocumentCardActivityProps>;

/**
 * {@docCategory DocumentCard}
 */
declare class DocumentCardActivityBase extends React.Component<IDocumentCardActivityProps, any> {
    private _classNames;
    constructor(props: IDocumentCardActivityProps);
    render(): JSX.Element | null;
    private _renderAvatars;
    private _renderAvatar;
    private _getNameString;
}

export declare const DocumentCardDetails: React.FunctionComponent<IDocumentCardDetailsProps>;

/**
 * {@docCategory DocumentCard}
 */
declare class DocumentCardDetailsBase extends React.Component<IDocumentCardDetailsProps, any> {
    private _classNames;
    constructor(props: IDocumentCardDetailsProps);
    render(): JSX.Element;
}

export declare const DocumentCardImage: React.FunctionComponent<IDocumentCardImageProps>;

export declare const DocumentCardLocation: React.FunctionComponent<IDocumentCardLocationProps>;

/**
 * {@docCategory DocumentCard}
 */
declare class DocumentCardLocationBase extends React.Component<IDocumentCardLocationProps, any> {
    private _classNames;
    constructor(props: IDocumentCardLocationProps);
    render(): JSX.Element;
}

export declare const DocumentCardLogo: React.FunctionComponent<IDocumentCardLogoProps>;

/**
 * {@docCategory DocumentCard}
 */
declare class DocumentCardLogoBase extends React.Component<IDocumentCardLogoProps, any> {
    private _classNames;
    constructor(props: IDocumentCardLogoProps);
    render(): JSX.Element;
}

export declare const DocumentCardPreview: React.FunctionComponent<IDocumentCardPreviewProps>;

export declare const DocumentCardStatus: React.FunctionComponent<IDocumentCardStatusProps>;

/**
 * {@docCategory DocumentCard}
 */
declare class DocumentCardStatusBase extends React.Component<IDocumentCardStatusProps, any> {
    private _classNames;
    constructor(props: IDocumentCardStatusProps);
    render(): JSX.Element;
}

export declare const DocumentCardTitle: React.FunctionComponent<IDocumentCardTitleProps>;

/**
 * {@docCategory DocumentCard}
 */
declare class DocumentCardTitleBase extends React.Component<IDocumentCardTitleProps, IDocumentCardTitleState> {
    private _titleElement;
    private _measureTitleElement;
    private _titleTruncationTimer;
    private _classNames;
    private _async;
    private _events;
    constructor(props: IDocumentCardTitleProps);
    componentDidUpdate(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _truncateTitle;
    private _truncateWhenInAnimation;
    private _shrinkTitle;
    private _updateTruncation;
}

/**
 * {@docCategory DocumentCard}
 */
export declare enum DocumentCardType {
    /**
     * Standard DocumentCard.
     */
    normal = 0,
    /**
     * Compact layout. Displays the preview beside the details, rather than above.
     */
    compact = 1
}

export declare const Dropdown: React.FunctionComponent<IDropdownProps>;

export declare const DropdownBase: React.FunctionComponent<IDropdownProps>;
export { DropdownMenuItemType }

export declare const getDetailsRowStyles: (props: IDetailsRowStyleProps) => IDetailsRowStyles;

export declare const GroupedList: React.FunctionComponent<IGroupedListProps>;

export declare class GroupedListBase extends React.Component<IGroupedListProps, IGroupedListState> implements IGroupedList {
    static defaultProps: {
        selectionMode: SelectionMode;
        isHeaderVisible: boolean;
        groupProps: {};
        compact: boolean;
    };
    private _classNames;
    private _list;
    private _isSomeGroupExpanded;
    static getDerivedStateFromProps(nextProps: IGroupedListProps, previousState: IGroupedListState): IGroupedListState;
    constructor(props: IGroupedListProps);
    scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
    getStartItemIndexInView(): number;
    componentDidMount(): void;
    render(): JSX.Element;
    forceUpdate(): void;
    toggleCollapseAll(allCollapsed: boolean): void;
    private _setGroupsCollapsedState;
    private _renderGroup;
    private _returnOne;
    private _getDefaultGroupItemLimit;
    private _getGroupItemLimit;
    private _getGroupHeight;
    private _getPageHeight;
    private _getGroupKey;
    private _getGroupNestingDepth;
    private _onToggleCollapse;
    private _onToggleSelectGroup;
    private _isInnerZoneKeystroke;
    private _forceListUpdates;
    private _onToggleSummarize;
    private _getPageSpecification;
    private _computeIsSomeGroupExpanded;
    private _updateIsSomeGroupExpanded;
}

export declare class GroupedListSection extends React.Component<IGroupedListSectionProps, IGroupedListSectionState> {
    private _root;
    private _list;
    private _subGroupRefs;
    private _id;
    private _events;
    private _dragDropSubscription;
    private _droppingClassName;
    constructor(props: IGroupedListSectionProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(previousProps: IGroupedListSectionProps): void;
    render(): JSX.Element;
    forceUpdate(): void;
    forceListUpdate(): void;
    private _onRenderGroupHeader;
    private _onRenderGroupShowAll;
    private _onRenderGroupFooter;
    private _onSelectionChange;
    private _onRenderGroupCell;
    private _onRenderGroup;
    private _renderSubGroup;
    private _returnOne;
    private _getGroupKey;
    /**
     * collect all the data we need to enable drag/drop for a group
     */
    private _getGroupDragDropOptions;
    /**
     * update groupIsDropping state based on the input value, which is used to change style during drag and drop
     *
     * @param newValue - new isDropping state value
     * @param event - the event trigger dropping state change which can be dragenter, dragleave etc
     */
    private _updateDroppingState;
    /**
     * get the correct css class to reflect the dropping state for a given group
     *
     * If the group is the current drop target, return the default dropping class name
     * Otherwise, return '';
     *
     */
    private _getDroppingClassName;
}

export declare const GroupFooter: React.FunctionComponent<IGroupFooterProps>;

export declare const GroupHeader: React.FunctionComponent<IGroupHeaderProps>;

export declare const GroupShowAll: React.FunctionComponent<IGroupShowAllProps>;

export declare const GroupSpacer: React.FunctionComponent<IGroupSpacerProps>;

/**
 * {@docCategory Breadcrumb}
 */
export declare interface IBreadcrumb {
    /**
     * Sets focus to the first breadcrumb link.
     */
    focus(): void;
}

/** @deprecated Use IBreadcrumbData */
export declare type IBreadCrumbData = IBreadcrumbData;

/**
 * {@docCategory Breadcrumb}
 */
export declare interface IBreadcrumbData {
    props: IBreadcrumbProps;
    renderedItems: IBreadcrumbItem[];
    renderedOverflowItems: IBreadcrumbItem[];
}

/**
 * {@docCategory Breadcrumb}
 */
export declare interface IBreadcrumbItem extends React.AllHTMLAttributes<HTMLElement> {
    /**
     * Text to display in the breadcrumb item.
     */
    text: string;
    /**
     * Arbitrary unique string associated with the breadcrumb item.
     */
    key: string;
    /**
     * Callback for when the breadcrumb item is selected.
     */
    onClick?: (ev?: React.MouseEvent<HTMLElement>, item?: IBreadcrumbItem) => void;
    /**
     * URL to navigate to when this breadcrumb item is clicked.
     * If provided, the breadcrumb will be rendered as a link.
     */
    href?: string;
    /**
     * Whether this is the breadcrumb item the user is currently navigated to.
     * If true, `aria-current="page"` will be applied to this breadcrumb item.
     */
    isCurrentItem?: boolean;
    /**
     * Optional prop to render the item as a heading of your choice.
     *
     * You can also use this to force items to render as links instead of buttons (by default,
     * any item with a `href` renders as a link, and any item without a `href` renders as a button).
     * This is not generally recommended because it may prevent activating the link using the keyboard.
     */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a';
    /**
     * Optional role for the breadcrumb item (which renders as a button by default)
     */
    role?: string;
}

/**
 * {@docCategory Breadcrumb}
 */
export declare interface IBreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Optional callback to access the `IBreadcrumb` interface. Use this instead of `ref` for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IBreadcrumb>;
    /**
     * Collection of breadcrumbs to render
     */
    items: IBreadcrumbItem[];
    /**
     * Optional class for the root breadcrumb element.
     */
    className?: string;
    /**
     * Render a custom divider in place of the default chevron `>`
     */
    dividerAs?: IComponentAs<IDividerAsProps>;
    /**
     * Render a custom overflow icon in place of the default icon `...`
     */
    onRenderOverflowIcon?: IRenderFunction<IButtonProps>;
    /**
     * Custom component for the overflow button.
     */
    overflowButtonAs?: IComponentAs<IButtonProps>;
    /**
     * The maximum number of breadcrumbs to display before coalescing.
     * If not specified, all breadcrumbs will be rendered.
     */
    maxDisplayedItems?: number;
    /** Custom render function for each breadcrumb item. */
    onRenderItem?: IRenderFunction<IBreadcrumbItem>;
    /**
     * Method that determines how to reduce the length of the breadcrumb.
     * Return undefined to never reduce breadcrumb length.
     */
    onReduceData?: (data: IBreadcrumbData) => IBreadcrumbData | undefined;
    /**
     * Method that determines how to group the length of the breadcrumb.
     * Return undefined to never increase breadcrumb length.
     */
    onGrowData?: (data: IBreadcrumbData) => IBreadcrumbData | undefined;
    /**
     * Aria label for the root element of the breadcrumb (which is a navigation landmark).
     */
    ariaLabel?: string;
    /**
     * Aria label for the overflow button.
     */
    overflowAriaLabel?: string;
    /**
     * Optional index where overflow items will be collapsed.
     * @default 0
     */
    overflowIndex?: number;
    styles?: IStyleFunctionOrObject<IBreadcrumbStyleProps, IBreadcrumbStyles>;
    theme?: ITheme;
    /**
     * Extra props for the root FocusZone.
     */
    focusZoneProps?: IFocusZoneProps;
    /**
     * Extra props for the TooltipHost which wraps each breadcrumb item.
     */
    tooltipHostProps?: ITooltipHostProps;
}

/**
 * {@docCategory Breadcrumb}
 */
export declare interface IBreadcrumbStyleProps {
    className?: string;
    theme: ITheme;
}

/**
 * {@docCategory Breadcrumb}
 */
export declare interface IBreadcrumbStyles {
    root: IStyle;
    list: IStyle;
    listItem: IStyle;
    chevron: IStyle;
    overflow: IStyle;
    overflowButton: IStyle;
    itemLink: IStyle;
    item: IStyle;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface ICellStyleProps {
    cellLeftPadding: number;
    cellRightPadding: number;
    cellExtraRightPadding: number;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IColumn {
    /** A unique key for identifying the column. */
    key: string;
    /** Name to render on the column header. */
    name: string;
    /**
     * The field to pull the text value from for the column.
     * Can be unset if a custom `onRender` method is provided.
     */
    fieldName?: string;
    /** Class name to apply to the column cell within each row. */
    className?: string;
    /** Custom overrides to the themed or default styles. */
    styles?: IStyleFunctionOrObject<IDetailsColumnStyleProps, IDetailsColumnStyles>;
    /** Minimum width for the column. */
    minWidth: number;
    /**
     * Accessible label for the column. The column name will still be used as the primary label,
     * but this text (if specified) will be read after the column name.
     */
    ariaLabel?: string;
    /** Whether the column is a header for the given row. There should be only one column with this set to true. */
    isRowHeader?: boolean;
    /** Maximum width for the column, if stretching is allowed in justified scenarios. */
    maxWidth?: number;
    /**
     * Defines how the column's header should render.
     * @defaultvalue ColumnActionsMode.clickable
     */
    columnActionsMode?: ColumnActionsMode;
    /** Custom icon to use in the column header. */
    iconName?: string;
    /**
     * Whether only the icon should be displayed in the column header.
     * If true, the column name and dropdown chevron will not be displayed.
     */
    isIconOnly?: boolean;
    /** Class name for the icon within the header. */
    iconClassName?: string;
    /**
     * If true, allow the column to be collapsed when rendered in justified layout.
     * @deprecated Use `isCollapsible`
     */
    isCollapsable?: boolean;
    /** If true, allow the column to be collapsed when rendered in justified layout. */
    isCollapsible?: boolean;
    /** Determines if the column is currently sorted. Renders a sort arrow in the column header. */
    isSorted?: boolean;
    /** Determines if the sort arrow is pointed down (descending) or up. */
    isSortedDescending?: boolean;
    /** Determines if the column can be resized. */
    isResizable?: boolean;
    /** Determines if the column can render multi-line text. */
    isMultiline?: boolean;
    /** Custom renderer for cell content, instead of the default text rendering. */
    onRender?: (item?: any, index?: number, column?: IColumn) => any;
    /** Custom override for the parent list's `getCellValueKey`. */
    getValueKey?: (item?: any, index?: number, column?: IColumn) => string;
    /** Custom renderer for column header divider. */
    onRenderDivider?: IRenderFunction<IDetailsColumnProps>;
    /** Whether the list is filtered by this column. If true, shows a filter icon next to this column's name. */
    isFiltered?: boolean;
    /** Callback for when the user clicks on the column header. */
    onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
    /** Callback for when the user opens the column header context menu. */
    onColumnContextMenu?: (column?: IColumn, ev?: React.MouseEvent<HTMLElement>) => void;
    /**
     * Callback for when the column is resized (`width` is the current width).
     *
     * Prefer this over `DetailsList`'s `onColumnResize` if you require the `IColumn` to report its width
     * after every resize event. Consider debouncing the callback if resize events occur frequently.
     */
    onColumnResize?: (width?: number) => void;
    /** Whether the list is grouped by this column. If true, shows a grouped icon next to this column's name. */
    isGrouped?: boolean;
    /** Arbitrary data passthrough which can be used by the caller. */
    data?: any;
    /** Internal only value. */
    calculatedWidth?: number;
    /**
     * Internal only value.
     * Remembers the actual width of the column in any case.
     * `calculatedWidth` is only saved when it's defined by user, not for justified calculations.
     */
    currentWidth?: number;
    /** Class name to apply to the column header cell. */
    headerClassName?: string;
    /** If true, add additional LTR padding-right to column and cells. */
    isPadded?: boolean;
    /**
     * Accessible label for indicating that the list is sorted by this column in ascending order.
     * This will be read after the main column header label.
     */
    sortAscendingAriaLabel?: string;
    /**
     * Accessible label for indicating that the list is sorted by this column in descending order.
     * This will be read after the main column header label.
     */
    sortDescendingAriaLabel?: string;
    /** Accessible label for the status of this column when grouped. */
    groupAriaLabel?: string;
    /** Accessible label for the status of this column when filtered. */
    filterAriaLabel?: string;
    /** Whether a dropdown menu is open so that the appropriate ARIA attributes are rendered. */
    isMenuOpen?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IColumnDragDropDetails {
    /**
     * Specifies the source column index
     * @defaultvalue -1
     */
    draggedIndex: number;
    /**
     * Specifies the target column index
     * @defaultvalue -1
     */
    targetIndex: number;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IColumnReorderHeaderProps extends IColumnReorderOptions {
    /** Callback to notify the column dragEnd event to List
     * Need this to check whether the dragEnd has happened on
     * corresponding list or outside of the list
     */
    onColumnDragEnd?: (props: {
        dropLocation?: ColumnDragEndLocation;
    }, event: MouseEvent) => void;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IColumnReorderOptions {
    /**
     * Specifies the number fixed columns from left
     * @defaultvalue 0
     */
    frozenColumnCountFromStart?: number;
    /**
     * Specifies the number fixed columns from right
     * @defaultvalue 0
     */
    frozenColumnCountFromEnd?: number;
    /**
     * Callback to handle when dragging on this column's DetailsHeader has started.
     */
    onColumnDragStart?: (dragStarted: boolean) => void;
    /**
     * Callback to handle column reordering.
     * `draggedIndex` is the source column index, which should be placed at `targetIndex`.
     * @deprecated Use `onColumnDrop` instead.
     */
    handleColumnReorder?: (draggedIndex: number, targetIndex: number) => void;
    /**
     * Callback to handle column reordering.
     * `draggedIndex` is the source column index, which should be placed at `targetIndex`.
     */
    onColumnDrop?: (dragDropDetails: IColumnDragDropDetails) => void;
    /**
     * Callback to handle when dragging on this column's DetailsHeader has finished.
     */
    onDragEnd?: (columnDropLocationDetails: ColumnDragEndLocation) => void;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IColumnResizeDetails {
    columnIndex: number;
    originX?: number;
    columnMinWidth: number;
}

/**
 * {@docCategory ComboBox}
 */
export declare interface IComboBox {
    /**
     * All selected options.
     */
    readonly selectedOptions: IComboBoxOption[];
    /**
     * If there is a menu open, this will dismiss it.
     */
    dismissMenu: () => void;
    /**
     * Sets focus to the input in the ComboBox.
     * @param shouldOpenOnFocus - Whether to open the menu when the input gets focus
     * @param useFocusAsync - Whether to focus the input asynchronously
     * @returns True if focus could be set, false if no operation was taken.
     */
    focus(shouldOpenOnFocus?: boolean, useFocusAsync?: boolean): boolean;
}

export declare interface IComboBoxClassNames {
    container: string;
    label: string;
    root: string;
    input: string;
    errorMessage: string;
    callout: string;
    optionsContainer: string;
    header: string;
    divider: string;
    optionsContainerWrapper: string;
    screenReaderText: string;
}

/**
 * {@docCategory ComboBox}
 */
export declare interface IComboBoxOption extends ISelectableOption {
    /**
     * Specific styles for each ComboBox option.
     * For styles shared between all options, use the prop `comboBoxOptionStyles`.
     */
    styles?: Partial<IComboBoxOptionStyles>;
    /**
     * In scenarios where embedded data is used as the `text` prop, whether to use the `ariaLabel` prop
     * to set the `aria-label` and preview text.
     * @defaultvalue false;
     */
    useAriaLabelAsText?: boolean;
}

export declare interface IComboBoxOptionClassNames {
    optionText: string;
    root: string;
    optionTextWrapper: string;
}

/**
 * {@docCategory ComboBox}
 */
export declare interface IComboBoxOptionStyles extends IButtonStyles {
    /**
     * Styles for the text inside the ComboBox option.
     * This should be used instead of the description
     * inside IButtonStyles because we custom render the option's text.
     */
    optionText: IStyle;
    /**
     * Styles for the ComboBox option text's wrapper.
     */
    optionTextWrapper: IStyle;
}

/**
 * {@docCategory ComboBox}
 */
export declare interface IComboBoxProps extends ISelectableDroppableTextProps<IComboBox, IComboBox>, React.RefAttributes<HTMLDivElement> {
    /**
     * Optional ref to access the `IComboBox` interface. Use this instead of `ref` for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IComboBox>;
    /**
     * Collection of options for this ComboBox.
     */
    options: IComboBoxOption[];
    /**
     * Called when a ComboBox item is clicked.
     */
    onItemClick?: (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number) => void;
    /**
     * Called when either:
     * 1) the selected option changes
     * 2) a manually edited value is submitted. In this case, if `allowFreeform` is true,
     *   it's possible that only `value` will be provided (`option` will be unset).
     */
    onChange?: (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => void;
    /**
     * Callback issued when the user changes the pending value in ComboBox.
     * This will be called any time the component is updated and there is a current
     * pending value. Option, index, and value will all be undefined if no change
     * has taken place and the previously entered pending value is still valid.
     */
    onPendingValueChanged?: (option?: IComboBoxOption, index?: number, value?: string) => void;
    /**
     * Function that gets invoked when the ComboBox menu is launched.
     */
    onMenuOpen?: () => void;
    /**
     * Function that gets invoked when the ComboBox menu is dismissed.
     */
    onMenuDismissed?: () => void;
    /**
     * Function that gets invoked before the menu gets dismissed.
     */
    onMenuDismiss?: () => void;
    /**
     * Callback issued when the options should be resolved, if they have been updated or
     * if they need to be passed in the first time.
     */
    onResolveOptions?: (options: IComboBoxOption[]) => IComboBoxOption[] | PromiseLike<IComboBoxOption[]>;
    /**
     * Callback issued when the ComboBox requests the list to scroll to a specific element.
     */
    onScrollToItem?: (itemIndex: number) => void;
    /**
     * Whether the ComboBox is free form, meaning that the user input is not bound to provided options.
     * @default false
     */
    allowFreeform?: boolean;
    /**
     * Whether the ComboBox auto completes. As the user is entering text, it will be suggested potential matches from
     * the list of options. If the ComboBox is expanded, this will also scroll to the suggested option, and give it a
     * selected style.
     *
     * @defaultvalue "on"
     */
    autoComplete?: 'on' | 'off';
    /**
     * Value to show in the input. Does not have to map to an option.
     */
    text?: string;
    /**
     * When multiple items are selected, this will be used to separate values in the ComboBox input.
     *
     * @defaultvalue ", "
     */
    multiSelectDelimiter?: string;
    /**
     * The IconProps to use for the button aspect of the ComboBox.
     */
    buttonIconProps?: IIconProps;
    /**
     * Props for the Autofill component (text input) inside the ComboBox.
     */
    autofill?: IAutofillProps;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Custom styles for this component.
     */
    styles?: Partial<IComboBoxStyles>;
    /**
     * Custom function for providing the classNames for the ComboBox. Can be used to provide
     * all styles for the component instead of applying them on top of the default styles.
     */
    getClassNames?: (theme: ITheme, isOpen: boolean, disabled: boolean, required: boolean, focused: boolean, allowFreeForm: boolean, hasErrorMessage: boolean, className?: string) => IComboBoxClassNames;
    /**
     * Styles for the caret down (expand) button.
     */
    caretDownButtonStyles?: Partial<IButtonStyles>;
    /**
     * Default styles that should be applied to ComboBox options.
     */
    comboBoxOptionStyles?: Partial<IComboBoxOptionStyles>;
    /**
     * If true, when options are scrollable, the selected option is positioned at the top of the callout
     * when it is opened (unless it has reached the end of the scrollbar).
     * @defaultvalue false
     */
    scrollSelectedToTop?: boolean;
    /**
     * Add additional content above the callout list.
     */
    onRenderUpperContent?: IRenderFunction<IComboBoxProps>;
    /**
     * Add additional content below the callout list.
     */
    onRenderLowerContent?: IRenderFunction<IComboBoxProps>;
    /**
     * Custom width for ComboBox menu. Mutually exclusive with `useComboBoxAsMenuWidth`.
     */
    dropdownWidth?: number;
    /**
     * Whether to use the ComboBox's width as the menu's width.
     * Mutually exclusive with `dropdownWidth`.
     */
    useComboBoxAsMenuWidth?: boolean;
    /**
     * Custom max width for dropdown.
     */
    dropdownMaxWidth?: number;
    /**
     * Whether to hide the ComboBox's button element from screen readers. This is true by default because
     * all functionality is handled by the input element, and the arrow button is only meant to be decorative.
     * @defaultvalue true
     */
    isButtonAriaHidden?: boolean;
    /**
     * ID of an element containing a description of the ComboBox for screen reader users.
     */
    ariaDescribedBy?: string;
    /**
     * If true, the menu will be created the first time the ComboBox is rendered, and shown
     * or hidden as appropriate (rather than being created on open and destroyed on close).
     * This will improve perf of the menu opening but could potentially impact overall perf
     * by having more elements in the DOM. Should only be used when perf is important.
     *
     * Note: This may increase the amount of time it takes for the ComboBox itself to mount.
     */
    persistMenu?: boolean;
    /**
     * When specified, determines whether the callout (the menu which drops down) should
     * restore the focus after being dismissed or not. If false, then the menu will not try
     * to set focus to whichever element had focus before the menu was opened.
     * @defaultvalue true
     */
    shouldRestoreFocus?: boolean;
    /**
     * Optional props for the caret down (expand) button.
     */
    iconButtonProps?: IButtonProps;
    /**
     * Custom render function for the label text.
     */
    onRenderLabel?: IRenderFunction<IOnRenderComboBoxLabelProps>;
}

export declare interface IComboBoxState {
    /** The open state */
    isOpen?: boolean;
    /** The focused state of the combo box */
    focusState?: 'none' | 'focused' | 'focusing';
    /**
     * When taking input, this will store the index that the options input matches
     * (-1 if no input or match)
     */
    currentPendingValueValidIndex: number;
    /**
     * Stores the hovered over value in the dropdown
     * (used for styling the options without updating the input)
     */
    currentPendingValueValidIndexOnHover: number;
    /** When taking input, this will store the actual text that is being entered */
    currentPendingValue?: string;
}

/**
 * {@docCategory ComboBox}
 */
export declare interface IComboBoxStyles {
    /**
     * Style for the container which has the ComboBox and the label.
     */
    container: IStyle;
    /**
     * Style for the label element of the ComboBox.
     */
    label: IStyle;
    /**
     * Style for the label element of the ComboBox in the disabled state.
     */
    labelDisabled: IStyle;
    /**
     * Base styles for the root element of the ComboBox in all states.
     */
    root: IStyle;
    /**
     * Styles for the root element for variant of ComboBox with an `errorMessage` in the props.
     */
    rootError: IStyle;
    /**
     * Styles for variant of ComboBox where `allowFreeform` is false in the props.
     */
    rootDisallowFreeForm: IStyle;
    /**
     * Styles for when the ComboBox is hovered. These styles are always applied unless the ComboBox is disabled.
     */
    rootHovered: IStyle;
    /**
     * Styles for when the ComboBox is active. These styles are always applied unless the ComboBox is disabled.
     */
    rootPressed: IStyle;
    /**
     * Styles for when the ComboBox is focused. These styles are always applied unless the ComboBox is disabled.
     */
    rootFocused: IStyle;
    /**
     * Styles for when the ComboBox is disabled. These styles override all the other styles.
     * NOTE: Hover, focused, and active styles are not applied for disabled ComboBoxes.
     */
    rootDisabled: IStyle;
    /**
     * Base styles for the input element, which contains the currently selected option.
     */
    input: IStyle;
    /**
     * Style override for the input element when ComboBox is disabled.
     */
    inputDisabled: IStyle;
    /**
     * Styles for the error message text of the ComboBox.
     */
    errorMessage: IStyle;
    /**
     * Styles for the callout.
     */
    callout: IStyle;
    /**
     * Styles for the options container wrapper.
     */
    optionsContainerWrapper: IStyle;
    /**
     * Styles for the container of all the ComboBox options, including the headers and dividers.
     */
    optionsContainer: IStyle;
    /**
     * Styles for a header in the options.
     */
    header: IStyle;
    /**
     * Styles for a divider in the options.
     */
    divider: IStyle;
    /**
     * Styles for hidden screen reader text.
     */
    screenReaderText: IStyle;
}

export declare interface IDetailsCheckboxProps {
    checked: boolean;
    theme?: ITheme;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsColumnProps extends React.ClassAttributes<DetailsColumnBase> {
    /**
     * The theme object to respect during render.
     */
    theme?: ITheme;
    /**
     * The component styles to respect during render.
     */
    styles?: IStyleFunctionOrObject<IDetailsColumnStyleProps, IDetailsColumnStyles>;
    /**
     * A reference to the component instance.
     */
    componentRef?: () => void;
    /**
     * The column definition for the component instance.
     */
    column: IColumn;
    /**
     * The column index for the component instance.
     */
    columnIndex: number;
    /**
     * Parent ID used for accessibility label(s).
     */
    parentId?: string;
    /**
     * Render function for providing a column header tooltip.
     */
    onRenderColumnHeaderTooltip?: IRenderFunction<IDetailsColumnRenderTooltipProps>;
    /**
     * Callback fired when click event occurs.
     */
    onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
    /**
     * Callback fired on contextual menu event to provide contextual menu UI.
     */
    onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => void;
    /**
     * The drag and drop helper for the component instance.
     */
    dragDropHelper?: IDragDropHelper | null;
    /**
     * Whether or not the column can be re-ordered via drag and drop.
     */
    isDraggable?: boolean;
    /**
     * @deprecated use `updateDragInfo`
     */
    setDraggedItemIndex?: (itemIndex: number) => void;
    /**
     * Callback on drag and drop event.
     */
    updateDragInfo?: (props: {
        itemIndex: number;
    }, event?: MouseEvent) => void;
    /**
     * Whether or not the column has been dropped via drag and drop.
     */
    isDropped?: boolean;
    /**
     * Custom styles for cell rendering.
     */
    cellStyleProps?: ICellStyleProps;
    /**
     * Whether to use fast icon and check components. The icons can't be targeted by customization
     * but are still customizable via class names.
     * @defaultvalue true
     */
    useFastIcons?: boolean;
}

/**
 * {@docgategory DetailsList}
 */
export declare interface IDetailsColumnRenderTooltipProps extends ITooltipHostProps {
    /**
     * Information about the column for which the tooltip is being rendered.
     * Use this to format status information about the column, such as its filter or sort state.
     */
    column?: IColumn;
}

/**
 * {@docCategory DetailsList}
 */
export declare type IDetailsColumnStyleProps = Required<Pick<IDetailsColumnProps, 'theme' | 'cellStyleProps'>> & {
    /**
     * Classname to provide for header region.
     */
    headerClassName?: string;
    /**
     * Whether or not the column is actionable.
     */
    isActionable?: boolean;
    /**
     * Whether or not the column contains contents.
     */
    isEmpty?: boolean;
    /**
     * Whether or not the column has a visible icon.
     */
    isIconVisible?: boolean;
    /**
     * Whether or not the column is padded.
     */
    isPadded?: boolean;
    /**
     * Whether or not the column has icon only content/
     */
    isIconOnly?: boolean;
    /**
     * Classname to provide for the header's icon region.
     */
    iconClassName?: string;
    /**
     * CSS transition duration on drag event.
     */
    transitionDurationDrag?: number;
    /**
     * CSS transition duration on drop event.
     */
    transitionDurationDrop?: number;
};

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsColumnStyles {
    /**
     * Styleable root region.
     */
    root: IStyle;
    /**
     * Styleable resize glyph region.
     */
    gripperBarVerticalStyle: IStyle;
    /**
     * Styleable cell tooltip region.
     */
    cellTooltip: IStyle;
    /**
     * Styleable cell title region.
     */
    cellTitle: IStyle;
    /**
     * Styleable cell name region.
     */
    cellName: IStyle;
    /**
     * Styleable icon region.
     */
    iconClassName: IStyle;
    /**
     * Styleable margin by icon region.
     */
    nearIcon: IStyle;
    /**
     * Styleable label region.
     */
    accessibleLabel: IStyle;
    /**
     * Styleable column sort icon region.
     */
    sortIcon: IStyle;
    /**
     * Styleable filter glyph.
     */
    filterChevron: IStyle;
    /**
     * Styleable border region after drag & drop.
     */
    borderAfterDropping: IStyle;
    /**
     * Transparent no border region after drag & drop to avoid content shift.
     */
    noBorderAfterDropping: IStyle;
    /**
     * Styleable border while drag & drop occurs.
     */
    borderWhileDragging: IStyle;
    /**
     * Transparent no border region while drag & drop occurs to avoid content shift.
     */
    noBorderWhileDragging: IStyle;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsFooterBaseProps extends IDetailsItemProps {
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsFooterProps extends IDetailsFooterBaseProps {
    /**
     * Column metadata
     */
    columns: IColumn[];
    /**
     * Selection from utilities
     */
    selection: ISelection;
    /**
     * Selection mode
     */
    selectionMode: SelectionMode;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsGroupDividerProps extends IGroupDividerProps, IDetailsItemProps {
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsGroupRenderProps extends IGroupRenderProps {
    onRenderFooter?: IRenderFunction<IDetailsGroupDividerProps>;
    onRenderHeader?: IRenderFunction<IDetailsGroupDividerProps>;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsHeader {
    /** sets focus into the header */
    focus: () => boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsHeaderBaseProps extends React.ClassAttributes<DetailsHeaderBase>, IDetailsItemProps {
    /** Theme from the Higher Order Component */
    theme?: ITheme;
    /** Call to provide customized styling that will layer on top of the variant rules. */
    styles?: IStyleFunctionOrObject<IDetailsHeaderStyleProps, IDetailsHeaderStyles>;
    /** Ref to the component itself */
    componentRef?: IRefObject<IDetailsHeader>;
    /** Layout mode - fixedColumns or justified */
    layoutMode: DetailsListLayoutMode;
    /** Callback for when column sizing has changed */
    onColumnIsSizingChanged?: (column: IColumn, isSizing: boolean) => void;
    /** Callback for when column is resized */
    onColumnResized?: (column: IColumn, newWidth: number, columnIndex: number) => void;
    /** Callback for when column is automatically resized */
    onColumnAutoResized?: (column: IColumn, columnIndex: number) => void;
    /** Callback for when the column is clicked */
    onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
    /** Callback for when the column needs to show a context menu */
    onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => void;
    /** Callback to render a tooltip for the column header */
    onRenderColumnHeaderTooltip?: IRenderFunction<IDetailsColumnRenderTooltipProps>;
    /** Whether to collapse for all visibility */
    collapseAllVisibility?: CollapseAllVisibility;
    /** Whether or not all is collapsed */
    isAllCollapsed?: boolean;
    /** Callback for when collapse all is toggled */
    onToggleCollapseAll?: (isAllCollapsed: boolean) => void;
    /** ariaLabel for the entire header */
    ariaLabel?: string;
    /** ariaLabel for expand/collapse group button */
    ariaLabelForToggleAllGroupsButton?: string;
    /** ariaLabel for the header checkbox that selects or deselects everything */
    ariaLabelForSelectAllCheckbox?: string;
    /** ariaLabel for the selection column */
    ariaLabelForSelectionColumn?: string;
    /** Select all button visibility */
    selectAllVisibility?: SelectAllVisibility;
    /** Column reordering options */
    columnReorderOptions?: IColumnReorderOptions;
    /** Column reordering options */
    columnReorderProps?: IColumnReorderHeaderProps;
    /** Minimum pixels to be moved before dragging is registered */
    minimumPixelsForDrag?: number;
    /** Overriding class name */
    className?: string;
    /** If provided, can be used to render a custom checkbox */
    onRenderDetailsCheckbox?: IRenderFunction<IDetailsCheckboxProps>;
    /**
     * Whether to use fast icon and check components. The icons can't be targeted by customization
     * but are still customizable via class names.
     * @defaultvalue true
     */
    useFastIcons?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsHeaderProps extends IDetailsHeaderBaseProps {
    /**
     * Column metadata
     */
    columns: IColumn[];
    /**
     * Selection from utilities
     */
    selection: ISelection;
    /**
     * Selection mode
     */
    selectionMode: SelectionMode;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsHeaderState {
    columnResizeDetails?: IColumnResizeDetails;
    isAllSelected?: boolean;
    isSizing?: boolean;
    isAllCollapsed?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare type IDetailsHeaderStyleProps = Required<Pick<IDetailsHeaderProps, 'theme'>> & Pick<IDetailsHeaderProps, 'className'> & {
    /** Whether to hide select all checkbox */
    isSelectAllHidden?: boolean;
    /** Whether the "select all" checkbox is checked */
    isAllSelected?: boolean;
    /** Is column being resized */
    isResizingColumn?: boolean;
    /** Are all columns collapsed */
    isAllCollapsed?: boolean;
    /** Whether the header is sizing */
    isSizing?: boolean;
    /** Whether checkbox is hidden  */
    isCheckboxHidden?: boolean;
    cellStyleProps?: ICellStyleProps;
};

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsHeaderStyles {
    root: IStyle;
    check: IStyle;
    /**
     * @deprecated Not used
     */
    cellWrapperPadded: IStyle;
    cellIsCheck: IStyle;
    /**
     * @deprecated Not used
     */
    cellIsActionable: IStyle;
    /**
     * @deprecated Not used
     */
    cellIsEmpty: IStyle;
    cellSizer: IStyle;
    cellSizerStart: IStyle;
    cellSizerEnd: IStyle;
    cellIsResizing: IStyle;
    cellIsGroupExpander: IStyle;
    collapseButton: IStyle;
    checkTooltip: IStyle;
    sizingOverlay: IStyle;
    dropHintCircleStyle: IStyle;
    dropHintCaretStyle: IStyle;
    dropHintLineStyle: IStyle;
    dropHintStyle: IStyle;
    accessibleLabel: IStyle;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsItemProps {
    /**
     * Column metadata
     */
    columns?: IColumn[];
    /**
     * Nesting depth of a grouping
     */
    groupNestingDepth?: number;
    /**
     * How much to indent
     */
    indentWidth?: number | undefined;
    /**
     * Selection from utilities
     */
    selection?: ISelection | undefined;
    /**
     * Selection mode
     */
    selectionMode?: SelectionMode | undefined;
    /**
     * Viewport of the virtualized list
     *
     * @deprecated Use `rowWidth` instead
     */
    viewport?: IViewport | undefined;
    /**
     * Checkbox visibility
     */
    checkboxVisibility?: CheckboxVisibility | undefined;
    /**
     * Rules for rendering column cells.
     */
    cellStyleProps?: ICellStyleProps;
    /**
     * Minimum width of the row.
     *
     * @defaultvalue 0
     */
    rowWidth?: number;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsList extends IList {
    /**
     * Ensures that the list content is updated. Call this in cases where the list prop updates don't change, but the list
     * still needs to be re-evaluated. For example, if a sizer bar is adjusted and causes the list width to change,
     * you can call this to force a re-evaluation. Be aware that this can be an expensive operation and should be
     * done sparingly.
     */
    forceUpdate: () => void;
    /**
     * Scroll to and focus the item at the given index. focusIndex will call scrollToIndex on the specified index.
     *
     * @param index - Index of item to scroll to
     * @param forceIntoFirstElement - If true, focus will be set to the first focusable child element of the item rather
     *  than the item itself.
     * @param measureItem - Optional callback to measure the height of an individual item
     * @param scrollToMode - Optional setting to determine where in the window the item should be scrolled to
     * when focused.
     */
    focusIndex: (index: number, forceIntoFirstElement?: boolean, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode) => void;
    /**
     * Get the start index of the page that is currently in view
     */
    getStartItemIndexInView: () => number;
}

export declare interface IDetailsListCheckboxProps extends IDetailsCheckboxProps {
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsListProps extends IBaseProps<IDetailsList>, IWithViewportProps {
    /** Theme provided by a higher-order component. */
    theme?: ITheme;
    /** Custom overrides to the themed or default styles. */
    styles?: IStyleFunctionOrObject<IDetailsListStyleProps, IDetailsListStyles>;
    /**
     * Callback to access the IDetailsList interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IDetailsList>;
    /** A key that uniquely identifies the given items. If provided, the selection will be reset when the key changes. */
    setKey?: string;
    /** The items to render. */
    items: any[];
    /** Set this to true to indicate that the items being displayed are placeholder data. */
    isPlaceholderData?: boolean;
    /** Properties to pass through to the List components being rendered. */
    listProps?: IListProps;
    /** Default index to set focus to once the items have rendered and the index exists. */
    initialFocusedIndex?: number;
    /** Class name to add to the root element. */
    className?: string;
    /** Grouping instructions. */
    groups?: IGroup[];
    /** Override properties to render groups. */
    groupProps?: IDetailsGroupRenderProps;
    /** Override for the indent width used for group nesting. */
    indentWidth?: number;
    /** Selection model to track selection state.  */
    selection?: ISelection;
    /** Controls how/if the details list manages selection. Options include none, single, multiple */
    selectionMode?: SelectionMode;
    /**
     * By default, selection is cleared when clicking on an empty (non-focusable) section of the screen.
     * Setting this value to true overrides that behavior and maintains selection.
     * @defaultvalue false
     **/
    selectionPreservedOnEmptyClick?: boolean;
    /**
     * Additional props to pass through to the SelectionZone created by default.
     */
    selectionZoneProps?: ISelectionZoneProps;
    /** Controls how the columns are adjusted. */
    layoutMode?: DetailsListLayoutMode;
    /**
     * Controls the visibility of selection check box.
     * @defaultvalue CheckboxVisibility.onHover
     */
    checkboxVisibility?: CheckboxVisibility;
    /**
     * Controls the visibility of the header.
     * @defaultvalue true
     */
    isHeaderVisible?: boolean;
    /** column defitions. If none are provided, default columns will be created based on the items' properties. */
    columns?: IColumn[];
    /** Controls how the list contrains overflow. */
    constrainMode?: ConstrainMode;
    /** Event names and corresponding callbacks that will be registered to rendered row elements. */
    rowElementEventMap?: {
        eventName: string;
        callback: (context: IDragDropContext, event?: any) => void;
    }[];
    /** Callback for when the list has been updated. Useful for telemetry tracking externally. */
    onDidUpdate?: (detailsList?: DetailsListBase) => void;
    /**
     * Callback for when a given row has been mounted. Useful for identifying when a row has been rendered on the page.
     */
    onRowDidMount?: (item?: any, index?: number) => void;
    /**
     * Callback for when a given row has been unmounted.
     * Useful for identifying when a row has been removed from the page.
     */
    onRowWillUnmount?: (item?: any, index?: number) => void;
    /** Callback for when the user clicks on the column header. */
    onColumnHeaderClick?: (ev?: React.MouseEvent<HTMLElement>, column?: IColumn) => void;
    /** Callback for when the user asks for a contextual menu (usually via right click) from a column header. */
    onColumnHeaderContextMenu?: (column?: IColumn, ev?: React.MouseEvent<HTMLElement>) => void;
    /** Callback fired on column resize */
    onColumnResize?: (column?: IColumn, newWidth?: number, columnIndex?: number) => void;
    /** Callback for when a given row has been invoked (by pressing enter while it is selected.) */
    onItemInvoked?: (item?: any, index?: number, ev?: Event) => void;
    /**
     * Callback for when the context menu of an item has been accessed.
     * If undefined or false is returned, `ev.preventDefault()` will be called.
     */
    onItemContextMenu?: (item?: any, index?: number, ev?: Event) => void | boolean;
    /**
     * Callback to override the default row rendering.
     */
    onRenderRow?: IRenderFunction<IDetailsRowProps>;
    /**
     * If provided, will be the "default" item column renderer method.
     * This affects cells within the rows, not the rows themselves.
     * If a column definition provides its own `onRender` method, that will be used instead of this.
     */
    onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => React.ReactNode;
    /**
     * If provided, will be the "default" item column cell value return.
     * A column's `getValueKey` can override `getCellValueKey`.
     */
    getCellValueKey?: (item?: any, index?: number, column?: IColumn) => string;
    /** Map of callback functions related to row drag and drop functionality. */
    dragDropEvents?: IDragDropEvents;
    /** Callback for what to render when the item is missing. */
    onRenderMissingItem?: (index?: number, rowProps?: IDetailsRowProps) => React.ReactNode;
    /** An override to render the details header. */
    onRenderDetailsHeader?: IRenderFunction<IDetailsHeaderProps>;
    /** An override to render the details footer. */
    onRenderDetailsFooter?: IRenderFunction<IDetailsFooterProps>;
    /**  If provided, can be used to render a custom checkbox. */
    onRenderCheckbox?: IRenderFunction<IDetailsListCheckboxProps>;
    /** Viewport info, provided by the `withViewport` decorator. */
    viewport?: IViewport;
    /**
     * Callback for when an item in the list becomes active by clicking anywhere inside the row or navigating to it
     * with the keyboard.
     */
    onActiveItemChanged?: (item?: any, index?: number, ev?: React.FocusEvent<HTMLElement>) => void;
    /** Accessible label for the list header. */
    ariaLabelForListHeader?: string;
    /** Accessible label for the select all checkbox. */
    ariaLabelForSelectAllCheckbox?: string;
    /** Accessible label for the name of the selection column. */
    ariaLabelForSelectionColumn?: string;
    /** Callback to get the aria-label string for a given item. */
    getRowAriaLabel?: (item: any) => string;
    /** Callback to get the aria-describedby IDs (space-separated strings) of elements that describe the item. */
    getRowAriaDescribedBy?: (item: any) => string;
    /**
     * Callback to get the item key, to be used in the selection and on render.
     * Must be provided if sorting or filtering is enabled.
     */
    getKey?: (item: any, index?: number) => string;
    /** Accessible label describing or summarizing the list. */
    ariaLabel?: string;
    /** Accessible label for the check button. */
    checkButtonAriaLabel?: string;
    /** Accessible label for the grid within the list. */
    ariaLabelForGrid?: string;
    /**
     * Whether the role `application` should be applied to the list.
     * @defaultvalue false
     */
    shouldApplyApplicationRole?: boolean;
    /**
     * The minimum mouse move distance to interpret the action as drag event.
     * @defaultvalue 5
     */
    minimumPixelsForDrag?: number;
    /**
     * Whether to render in compact mode.
     * @defaultvalue false
     */
    compact?: boolean;
    /**
     * Whether to enable render page caching. This is an experimental performance optimization that is off by default.
     * @defaultvalue false
     */
    usePageCache?: boolean;
    /**
     * Callback to determine whether the list should be rendered in full, or virtualized.
     *
     * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
     * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance
     * for smaller lists.
     *
     * The default implementation will virtualize when this callback is not provided.
     */
    onShouldVirtualize?: (props: IListProps) => boolean;
    /** Class name to add to the cell of a checkbox. */
    checkboxCellClassName?: string;
    /** Whether the selection zone should enter modal state on touch. */
    enterModalSelectionOnTouch?: boolean;
    /** Options for column reordering using drag and drop. */
    columnReorderOptions?: IColumnReorderOptions;
    /** Callback to override default group height calculation used by list virtualization. */
    getGroupHeight?: IGroupedListProps['getGroupHeight'];
    /**
     * Whether to re-render a row only when props changed. Might cause regression when depending on external updates.
     * @defaultvalue false
     */
    useReducedRowRenderer?: boolean;
    /**
     * Props impacting the render style of cells. Since these have an impact on calculated column widths, they are
     * handled separately from normal theme styling, but they are passed to the styling system.
     */
    cellStyleProps?: ICellStyleProps;
    /** Whether to disable the built-in SelectionZone, so the host component can provide its own. */
    disableSelectionZone?: boolean;
    /** Whether to animate updates */
    enableUpdateAnimations?: boolean;
    /**
     * Whether to use fast icon and check components. The icons can't be targeted by customization
     * but are still customizable via class names.
     * @defaultvalue true
     */
    useFastIcons?: boolean;
}

export declare interface IDetailsListState {
    focusedItemIndex: number;
    lastWidth?: number;
    lastSelectionMode?: SelectionMode;
    adjustedColumns: IColumn[];
    isCollapsed?: boolean;
    isSizing?: boolean;
    isSomeGroupExpanded?: boolean;
    /**
     * A unique object used to force-update the List when it changes.
     */
    version: {};
    getDerivedStateFromProps(nextProps: IDetailsListProps, previousState: IDetailsListState): IDetailsListState;
}

/**
 * {@docCategory DetailsList}
 */
export declare type IDetailsListStyleProps = Required<Pick<IDetailsListProps, 'theme'>> & Pick<IDetailsListProps, 'className'> & {
    /** Whether the list is horizontally constrained */
    isHorizontalConstrained?: boolean;
    /** Whether the list is in compact mode */
    compact?: boolean;
    /** Whether the list is fixed in size */
    isFixed?: boolean;
};

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsListStyles {
    root: IStyle;
    focusZone: IStyle;
    headerWrapper: IStyle;
    contentWrapper: IStyle;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsRow {
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsRowBaseProps extends Pick<IDetailsListProps, 'onRenderItemColumn' | 'getCellValueKey'>, IBaseProps<IDetailsRow>, IDetailsItemProps {
    /**
     * Theme provided by styled() function
     */
    theme?: ITheme;
    /**
     * Overriding styles to this row
     */
    styles?: IStyleFunctionOrObject<IDetailsRowStyleProps, IDetailsRowStyles>;
    /**
     * Ref of the component
     */
    componentRef?: IRefObject<IDetailsRow>;
    /**
     * Data source for this component
     */
    item: any;
    /**
     * Index of the collection of items of the DetailsList
     */
    itemIndex: number;
    /**
     * Whether to render in compact mode
     */
    compact?: boolean;
    /**
     * A list of events to register
     */
    eventsToRegister?: {
        eventName: string;
        callback: (item?: any, index?: number, event?: any) => void;
    }[];
    /**
     * Callback for did mount for parent
     */
    onDidMount?: (row?: DetailsRowBase) => void;
    /**
     * Callback for will mount for parent
     */
    onWillUnmount?: (row?: DetailsRowBase) => void;
    /**
     * Callback for rendering a checkbox
     */
    onRenderCheck?: (props: IDetailsRowCheckProps) => JSX.Element;
    /**
     * If provided, can be used to render a custom checkbox
     */
    onRenderDetailsCheckbox?: IRenderFunction<IDetailsCheckboxProps>;
    /**
     * Handling drag and drop events
     */
    dragDropEvents?: IDragDropEvents;
    /**
     * Helper for the drag and drop
     */
    dragDropHelper?: IDragDropHelper;
    /**
     * Collapse all visibility
     */
    collapseAllVisibility?: CollapseAllVisibility;
    /**
     * Callback for getting the row aria label
     */
    getRowAriaLabel?: (item: any) => string;
    /**
     * Callback for getting the row aria-describedby
     */
    getRowAriaDescribedBy?: (item: any) => string;
    /**
     * Check button's aria label
     */
    checkButtonAriaLabel?: string;
    /**
     * Class name for the checkbox cell
     */
    checkboxCellClassName?: string;
    /**
     * DOM element into which to render row field
     */
    rowFieldsAs?: React.ComponentType<IDetailsRowFieldsProps>;
    /**
     * Overriding class name
     */
    className?: string;
    /** Whether to animate updates */
    enableUpdateAnimations?: boolean;
    /**
     * Rerender DetailsRow only when props changed. Might cause regression when depending on external updates.
     * @defaultvalue false
     */
    useReducedRowRenderer?: boolean;
    /**
     * Optional pre-rendered content per column. Preferred over onRender or onRenderItemColumn if provided.
     */
    cellsByColumn?: {
        [columnKey: string]: React.ReactNode;
    };
    /**
     * Whether to use fast icon and check components. The icons can't be targeted by customization
     * but are still customizable via class names.
     * @defaultvalue true
     */
    useFastIcons?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsRowCheckProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Style override
     */
    styles?: IStyleFunctionOrObject<IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>;
    /**
     * Is the check part of the header in a DetailsList
     */
    isHeader?: boolean;
    /**
     * Whether or not this check is selected
     */
    selected?: boolean;
    /**
     * Is any selected - also true for isSelectionModal
     */
    anySelected?: boolean;
    /**
     * Can this checkbox be selectable
     */
    canSelect: boolean;
    /**
     * Is this in compact mode?
     */
    compact?: boolean;
    /**
     * Optional className to attach to the slider root element.
     */
    className?: string;
    /**
     * The classname to be passed down to Check component
     */
    checkClassName?: string;
    /**
     * Whether or not this checkbox is visible
     */
    isVisible?: boolean;
    /**
     * If provided, can be used to render a custom checkbox
     */
    onRenderDetailsCheckbox?: IRenderFunction<IDetailsCheckboxProps>;
    /**
     * Whether to use fast icon and check components. The icons can't be targeted by customization
     * but are still customizable via class names.
     * @defaultvalue true
     */
    useFastIcons?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare type IDetailsRowCheckStyleProps = Required<Pick<IDetailsRowCheckProps, 'theme'>> & Pick<IDetailsRowCheckProps, 'compact' | 'isHeader' | 'selected' | 'anySelected' | 'canSelect' | 'className'> & {
    /** Is checkbox visible */
    isVisible?: boolean;
};

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsRowCheckStyles {
    root: IStyle;
    /** @deprecated Use `root` (they're applied to the same element) */
    check: IStyle;
    isDisabled: IStyle;
}

/**
 * Props interface for the DetailsRowFields component.
 *
 * {@docCategory DetailsList}
 */
export declare interface IDetailsRowFieldsProps extends IOverrideColumnRenderProps {
    /**
     * Data source for this component
     */
    item: any;
    /**
     * The item index of the collection for the DetailsList
     */
    itemIndex: number;
    /**
     * Index to start for the column
     */
    columnStartIndex: number;
    /**
     * Columns metadata
     */
    columns: IColumn[];
    /**
     * whether to render as a compact field
     */
    compact?: boolean;
    /**
     * Subset of classnames currently generated in DetailsRow that are used within DetailsRowFields.
     */
    rowClassNames: {
        [k in keyof Pick<IDetailsRowStyles, 'isMultiline' | 'isRowHeader' | 'cell' | 'cellAnimation' | 'cellPadded' | 'cellUnpadded' | 'fields'>]: string;
    };
    /**
     * Style properties to customize cell render output.
     */
    cellStyleProps?: ICellStyleProps;
    enableUpdateAnimations?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsRowProps extends IDetailsRowBaseProps {
    /**
     * Column metadata
     */
    columns: IColumn[];
    /**
     * Selection from utilities
     */
    selection: ISelection;
    /**
     * Selection mode
     */
    selectionMode: SelectionMode;
}

export declare interface IDetailsRowSelectionState {
    isSelected: boolean;
    isSelectionModal: boolean;
}

export declare interface IDetailsRowState {
    selectionState: IDetailsRowSelectionState;
    columnMeasureInfo?: {
        index: number;
        column: IColumn;
        onMeasureDone: (measuredWidth: number) => void;
    };
    isDropping?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare type IDetailsRowStyleProps = Required<Pick<IDetailsRowProps, 'theme'>> & {
    /** Whether the row is selected  */
    isSelected?: boolean;
    /** Whether there are any rows in the list selected */
    anySelected?: boolean;
    /** Whether this row can be selected */
    canSelect?: boolean;
    /** Class name of when this becomes a drop target. */
    droppingClassName?: string;
    /** Is the checkbox visible */
    isCheckVisible?: boolean;
    /** Is this a row header */
    isRowHeader?: boolean;
    /** A class name from the checkbox cell, so proper styling can be targeted */
    checkboxCellClassName?: string;
    /** CSS class name for the component */
    className?: string;
    /** Is list in compact mode */
    compact?: boolean;
    cellStyleProps?: ICellStyleProps;
    /** Whether to animate updates */
    enableUpdateAnimations?: boolean;
};

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsRowStyles {
    root: IStyle;
    cell: IStyle;
    cellAnimation: IStyle;
    cellUnpadded: IStyle;
    cellPadded: IStyle;
    checkCell: IStyle;
    isRowHeader: IStyle;
    isMultiline: IStyle;
    fields: IStyle;
    cellMeasurer: IStyle;
    checkCover: IStyle;
    check: IStyle;
}

/**
 * {@docCategory Breadcrumb}
 */
export declare interface IDividerAsProps extends IIconProps {
    /**
     * Breadcrumb item to left of the divider to be passed for custom rendering.
     * For overflowed items, it will be last item in the list.
     */
    item?: IBreadcrumbItem;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCard {
    /**
     * Sets focus to the DocumentCard.
     */
    focus: () => void;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActions {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActionsProps extends React.ClassAttributes<DocumentCardActionsBase> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardActions>;
    /**
     * The actions available for this document.
     */
    actions: IButtonProps[];
    /**
     * The number of views this document has received.
     */
    views?: Number;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardActionsStyleProps, IDocumentCardActionsStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActionsStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActionsStyles {
    root: IStyle;
    action: IStyle;
    views: IStyle;
    viewsIcon: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActivity {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActivityPerson {
    /**
     * The name of the person.
     */
    name: string;
    /**
     * Path to the profile photo of the person.
     */
    profileImageSrc: string;
    /**
     * The user's initials to display in the profile photo area when there is no image.
     */
    initials?: string;
    /**
     * Whether initials are calculated for phone numbers and number sequences.
     * Example: Set property to true to get initials for project names consisting of numbers only.
     * @defaultvalue false
     */
    allowPhoneInitials?: boolean;
    /**
     * The background color when the user's initials are displayed.
     * @defaultvalue PersonaInitialsColor.blue
     */
    initialsColor?: PersonaInitialsColor;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActivityProps extends React.ClassAttributes<DocumentCardActivityBase> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardActivity>;
    /**
     * Describes the activity that has taken place, such as "Created Feb 23, 2016".
     */
    activity: string;
    /**
     * One or more people who are involved in this activity.
     */
    people: IDocumentCardActivityPerson[];
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardActivityStyleProps, IDocumentCardActivityStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActivityStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
    /**
     * Indicates if multiple people are being shown.
     */
    multiplePeople?: boolean;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActivityStyles {
    root: IStyle;
    avatars: IStyle;
    avatar: IStyle;
    details: IStyle;
    name: IStyle;
    activity: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardDetails {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardDetailsProps extends React.Props<DocumentCardDetailsBase> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardDetails>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardDetailsStyleProps, IDocumentCardDetailsStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardDetailsStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardDetailsStyles {
    root: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardImage {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardImageProps extends IBaseProps<{}> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardImage>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardImageStyleProps, IDocumentCardImageStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
    /**
     * Path to the preview image.
     */
    imageSrc?: string;
    /**
     * The props for the icon associated with this document type.
     */
    iconProps?: IIconProps;
    /**
     * If provided, forces the preview image to be this width.
     */
    width?: number;
    /**
     * If provided, forces the preview image to be this height.
     */
    height?: number;
    /**
     * Used to determine how to size the image to fit the dimensions of the component.
     * If both dimensions are provided, then the image is fit using ImageFit.scale, otherwise ImageFit.none is used.
     */
    imageFit?: ImageFit;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardImageStyleProps extends IDocumentCardImageProps {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardImageStyles {
    root: IStyle;
    cornerIcon: IStyle;
    centeredIcon: IStyle;
    centeredIconWrapper: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLocation {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLocationProps extends React.ClassAttributes<DocumentCardLocationBase> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardLocation>;
    /**
     * Text for the location of the document.
     */
    location: string;
    /**
     * URL to navigate to for this location.
     */
    locationHref?: string;
    /**
     * Function to call when the location is clicked.
     */
    onClick?: (ev?: React.MouseEvent<HTMLElement>) => void;
    /**
     * Aria label for the link to the document location.
     */
    ariaLabel?: string;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardLocationStyleProps, IDocumentCardLocationStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLocationStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLocationStyles {
    root: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLogo {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLogoProps extends React.ClassAttributes<DocumentCardLogoBase> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardLogo>;
    /**
     * Describes DocumentCard Logo badge.
     */
    logoIcon: string;
    /**
     * Describe Logo name, optional.
     */
    logoName?: string;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardLogoStyleProps, IDocumentCardLogoStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLogoStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLogoStyles {
    root: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardPreview {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardPreviewImage {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<{}>;
    /**
     * File name for the document this preview represents.
     */
    name?: string;
    /**
     * URL to view the file.
     * @deprecated Use `href` inside of `linkProps` instead.
     */
    url?: string;
    /**
     * Props to pass to Link component
     */
    linkProps?: ILinkProps;
    /**
     * Path to the preview image.
     */
    previewImageSrc?: string;
    /**
     * @deprecated To be removed at \>= v2.0.0.
     */
    errorImageSrc?: string;
    /**
     * Path to the icon associated with this document type.
     *
     */
    iconSrc?: string;
    /**
     * If provided, forces the preview image to be this width.
     */
    width?: number;
    /**
     * If provided, forces the preview image to be this height.
     */
    height?: number;
    /**
     * Used to determine how to size the image to fit the dimensions of the component.
     * If both dimensions are provided, then the image is fit using ImageFit.scale, otherwise ImageFit.none is used.
     */
    imageFit?: ImageFit;
    /**
     * Hex color value of the line below the preview, which should correspond to the document type.
     *
     * @deprecated To be removed at \>= v5.0.0.
     */
    accentColor?: string;
    /**
     * The props for the preview icon.
     * If provided, icon will be rendered instead of image.
     */
    previewIconProps?: IIconProps;
    /**
     * The props for the preview icon container classname.
     * If provided, icon container classname will be used..
     */
    previewIconContainerClass?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardPreviewProps extends IBaseProps<{}> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardPreview>;
    /**
     * One or more preview images to display.
     */
    previewImages: IDocumentCardPreviewImage[];
    /**
     * The function return string that will describe the number of overflow documents.
     * such as  (overflowCount: number) =\> `+${ overflowCount } more`,
     */
    getOverflowDocumentCountText?: (overflowCount: number) => string;
    /**
     * Maximum number of document previews to display
     * @default 3
     */
    maxDisplayCount?: number;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardPreviewStyleProps, IDocumentCardPreviewStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardPreviewStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
    /**
     * Is it a list of files rather than a preview image?
     */
    isFileList?: boolean;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardPreviewStyles {
    root: IStyle;
    previewIcon: IStyle;
    icon: IStyle;
    fileList: IStyle;
    fileListIcon: IStyle;
    fileListLink: IStyle;
    fileListOverflowText: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardProps extends IBaseProps<IDocumentCard>, React.HTMLAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the IDocumentCard interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IDocumentCard>;
    /**
     * The type of DocumentCard to display.
     * @defaultvalue DocumentCardType.normal
     */
    type?: DocumentCardType;
    /**
     * Function to call when the card is clicked or keyboard Enter/Space is pushed.
     */
    onClick?: (ev?: React.SyntheticEvent<HTMLElement>) => void;
    /**
     * A URL to navigate to when the card is clicked. If a function has also been provided,
     * it will be used instead of the URL.
     */
    onClickHref?: string;
    /**
     * A target browser context for opening the link. If not specified, will open in the same tab/window.
     */
    onClickTarget?: string;
    /**
     * Aria role assigned to the documentCard (Eg. button, link).
     * Use this to override the default assignment.
     * @defaultvalue When `onClick` is provided, default role will be 'button'.
     * When `onClickHref` is provided, default role will be 'link'.
     */
    role?: string;
    /**
     * Hex color value of the line below the card, which should correspond to the document type.
     * This should only be supplied when using the 'compact' card layout.
     *
     * @deprecated To be removed at \>= v5.0.0.
     */
    accentColor?: string;
    /**
     * Child components to render within the card.
     */
    children?: React.ReactNode;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardStyleProps, IDocumentCardStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardStatus {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardStatusProps extends React.Props<DocumentCardStatusBase> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardStatus>;
    /**
     * Describes DocumentCard status icon.
     */
    statusIcon?: string;
    /**
     * Describe status information. Required field.
     */
    status: string;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardStatusStyleProps, IDocumentCardStatusStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardStatusStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardStatusStyles {
    root: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
    /**
     * True when the card has a click action.
     */
    actionable?: boolean;
    /**
     * Compact variant of the card.
     */
    compact?: boolean;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardStyles {
    root: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardTitle {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardTitleProps extends React.ClassAttributes<DocumentCardTitleBase> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardTitle>;
    /**
     * Title text.
     * If the card represents more than one document, this should be the title of one document and a "+X" string.
     * For example, a collection of four documents would have a string of "Document.docx +3".
     */
    title: string;
    /**
     * Whether we truncate the title to fit within the box. May have a performance impact.
     * @defaultvalue true
     */
    shouldTruncate?: boolean;
    /**
     * Whether show as title as secondary title style such as smaller font and lighter color.
     * @defaultvalue false
     */
    showAsSecondaryTitle?: boolean;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardTitleStyleProps, IDocumentCardTitleStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

declare interface IDocumentCardTitleState {
    truncatedTitleFirstPiece?: string;
    truncatedTitleSecondPiece?: string;
    clientWidth?: number;
    previousTitle: string;
    /**
     * In measuring, it will render a same style text with whiteSpace: 'nowrap', to get overflow rate.
     * So that the logic can predict truncated text well.
     */
    needMeasurement: boolean;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardTitleStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
    /**
     * Is this a secondary title?
     */
    showAsSecondaryTitle?: boolean;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardTitleStyles {
    root: IStyle;
}
export { IDragDropContext }
export { IDragDropEvents }
export { IDragDropHelper }
export { IDragDropOptions }

/**
 * {@docCategory Dropdown}
 */
export declare interface IDropdown {
    /**
     * All selected options
     */
    readonly selectedOptions: IDropdownOption[];
    focus: (shouldOpenOnFocus?: boolean) => void;
}

/**
 * {@docCategory Dropdown}
 */
export declare interface IDropdownOption<T = any> extends ISelectableOption<T> {
    /**
     * @deprecated Use `selected` instead. Deprecated at v.65.1.
     */
    isSelected?: boolean;
}

/**
 * {@docCategory Dropdown}
 */
export declare interface IDropdownProps extends ISelectableDroppableTextProps<IDropdown, HTMLDivElement>, React.RefAttributes<HTMLDivElement> {
    /**
     * Input placeholder text. Displayed until option is selected.
     * @deprecated Use `placeholder`
     */
    placeHolder?: string;
    /**
     * Options for the dropdown. If using `defaultSelectedKey` or `defaultSelectedKeys`, options must be
     * pure for correct behavior.
     */
    options: IDropdownOption[];
    /**
     * Callback issued when the selected option changes.
     */
    onChange?: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;
    /**
     * @deprecated Use `onChange` instead.
     */
    onChanged?: (option: IDropdownOption, index?: number) => void;
    /**
     * Custom render function for the label.
     */
    onRenderLabel?: IRenderFunction<IDropdownProps>;
    /**
     * Optional custom renderer for placeholder text
     */
    onRenderPlaceholder?: IRenderFunction<IDropdownProps>;
    /**
     * Optional custom renderer for placeholder text
     * @deprecated Use `onRenderPlaceholder`
     */
    onRenderPlaceHolder?: IRenderFunction<IDropdownProps>;
    /**
     * Optional custom renderer for selected option displayed in input
     */
    onRenderTitle?: IRenderFunction<IDropdownOption[]>;
    /**
     * Optional custom renderer for chevron icon
     */
    onRenderCaretDown?: IRenderFunction<IDropdownProps>;
    /**
     * Custom width for dropdown. If value is 0, width of the input field is used.
     * If value is 'auto', width of the input field is used by default, and it can grow wider to fit the content.
     * @defaultvalue 0
     */
    dropdownWidth?: number | 'auto';
    /**
     * Pass in ResponsiveMode to manually overwrite the way the Dropdown renders.
     * ResponsiveMode.large would, for instance, disable the behavior where Dropdown options
     * get rendered into a Panel while ResponsiveMode.small would result in the Dropdown
     * options always getting rendered in a Panel.
     */
    responsiveMode?: ResponsiveMode;
    /**
     * Keys that will be initially used to set selected items. This prop is used for `multiSelect`
     * scenarios. In other cases, `defaultSelectedKey` should be used.
     */
    defaultSelectedKeys?: string[] | number[];
    /**
     * Keys of the selected items. If you provide this, you must maintain selection
     * state by observing onChange events and passing a new value in when changed.
     * Passing null in will clear the selection.
     * Mutually exclusive with `defaultSelectedKeys`.
     */
    selectedKeys?: string[] | number[] | null;
    /**
     * When multiple items are selected, this still will be used to separate values in
     * the dropdown title.
     *
     * @defaultvalue ", "
     */
    multiSelectDelimiter?: string;
    /**
     * Optional preference to have onChanged still be called when an already selected item is
     * clicked in single select mode.  Default to false
     */
    notifyOnReselect?: boolean;
    /**
     * @deprecated Use `disabled` instead. Deprecated at v0.52.0.
     */
    isDisabled?: boolean;
    /**
     * Theme provided by higher order component.
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles>;
}

/**
 * The props needed to construct styles.
 * This represents the simplified set of immutable things which control the class names.
 * {@docCategory Dropdown}
 */
export declare type IDropdownStyleProps = Pick<IDropdownProps, 'theme' | 'className' | 'disabled' | 'required'> & {
    /**
     * Whether the dropdown is in an error state.
     */
    hasError: boolean;
    /**
     * Specifies if the dropdown has label content.
     */
    hasLabel: boolean;
    /**
     * Whether the dropdown is in an opened state.
     */
    isOpen: boolean;
    /**
     * Whether the dropdown is presently rendering a placeholder.
     */
    isRenderingPlaceholder: boolean;
    /**
     * Optional custom className for the panel that displays in small viewports, hosting the Dropdown options.
     * This is primarily provided for backwards compatibility.
     */
    panelClassName?: string;
    /**
     * Optional custom className for the callout that displays in larger viewports, hosting the Dropdown options.
     * This is primarily provided for backwards compatibility.
     */
    calloutClassName?: string;
    /**
     * Prop to notify on what edge the dropdown callout was positioned respective to the title.
     */
    calloutRenderEdge?: RectangleEdge;
};

/**
 * Represents the stylable areas of the control.
 * {@docCategory Dropdown}
 */
export declare interface IDropdownStyles {
    /** Root element of the Dropdown (includes Label and the actual Dropdown). */
    root: IStyle;
    /** Refers to the label associated with the dropdown. This is enclosed by the root. */
    label: IStyle;
    /** Refers to the actual Dropdown element. */
    dropdown: IStyle;
    /** Refers to the primary title of the Dropdown (rendering the selected options/placeholder/etc.). */
    title: IStyle;
    /** Refers to the wrapping container around the downward pointing caret users click on to expand the Dropdown. */
    caretDownWrapper: IStyle;
    /** Refers to the downward pointing caret icon users click on to expand the Dropdown. */
    caretDown: IStyle;
    /** Refers to the error message being rendered under the Dropdown (if any). */
    errorMessage: IStyle;
    /** Refers to the element that wraps `dropdownItems`. */
    dropdownItemsWrapper: IStyle;
    /** Refers to the FocusZone wrapping the individual dropdown items. */
    dropdownItems: IStyle;
    /** Refers to the individual dropdown item. */
    dropdownItem: IStyle;
    /** Style for a dropdown item when it is being selected. */
    dropdownItemSelected: IStyle;
    /** Style for a dropdown item when it is disabled. */
    dropdownItemDisabled: IStyle;
    /** Style for a dropdown item when it is both selected and disabled. */
    dropdownItemSelectedAndDisabled: IStyle;
    /** Style for a dropdown item when it is hidden */
    dropdownItemHidden: IStyle;
    /**
     * Refers to the text element that renders the actual dropdown item/option text. This would be wrapped by the element
     * referred to by `dropdownItem`.
     */
    dropdownOptionText: IStyle;
    /** Refers to the dropdown separator. */
    dropdownDivider: IStyle;
    /** Refers to the individual dropdown items that are being rendered as a header. */
    dropdownItemHeader: IStyle;
    /**
     * Refers to the panel that hosts the Dropdown options in small viewports.
     * @deprecated Use `subComponentStyles.panel` instead.
     */
    panel: IStyle;
    /** Refers to the callout that hosts Dropdown options in larger viewports. */
    callout: IStyle;
    /** Subcomponent styles. */
    subComponentStyles: IDropdownSubComponentStyles;
}

/**
 * {@docCategory Dropdown}
 */
export declare interface IDropdownSubComponentStyles {
    /** Refers to the panel that hosts the Dropdown options in small viewports. */
    panel: IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles>;
    /** Refers to the primary label for the Dropdown. */
    label: IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>;
    /** Refers to the individual dropdown item when the multiSelect prop is true. */
    multiSelectItem: IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles>;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDropHintDetails {
    originX: number;
    startX: number;
    endX: number;
    dropHintElementRef: HTMLElement;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroup {
    /**
     * Unique identifier for the group.
     */
    key: string;
    /**
     * Display name for the group, rendered on the header.
     */
    name: string;
    /**
     * Start index for the group within the given items.
     */
    startIndex: number;
    /**
     * How many items should be rendered within the group.
     */
    count: number;
    /**
     * Nested groups, if any.
     */
    children?: IGroup[];
    /**
     * Number indicating the level of nested groups.
     */
    level?: number;
    /**
     * @deprecated At 1.0.0, selection state wil be controlled by the selection store only.
     */
    isSelected?: boolean;
    /**
     * If all the items in the group are collapsed.
     */
    isCollapsed?: boolean;
    /**
     * If the items within the group are summarized or showing all.
     */
    isShowingAll?: boolean;
    /**
     * If drag/drop is enabled for the group header.
     */
    isDropEnabled?: boolean;
    /**
     * Arbitrary data required to be preserved by the caller.
     */
    data?: any;
    /**
     * Optional accessibility label (aria-label) attribute that will be stamped on to the element.
     * If none is specified, the arai-label attribute will contain the group name
     */
    ariaLabel?: string;
    /**
     * Optional flag to indicate the group has more data to load than the current group count indicated.
     * This can be used to indicate that a plus should be rendered next to the group count in the header.
     */
    hasMoreData?: boolean;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupDividerProps {
    componentRef?: IRefObject<{}>;
    /** Boolean value to indicate if the component should render in compact mode. Set to false by default */
    compact?: boolean;
    /** Callback to determine if a group has missing items and needs to load them from the server. */
    isGroupLoading?: (group: IGroup) => boolean;
    /** Text shown on group headers to indicate the group is being loaded. */
    loadingText?: string;
    /** The group to be rendered by the header. */
    group?: IGroup;
    /** The index of the group. */
    groupIndex?: number;
    /** The indent level of the group. */
    groupLevel?: number;
    /** Defines the number of columns a group header needs to span in the case of a grid or treegrid */
    ariaColSpan?: number;
    /**
     * Width corresponding to a single level.
     * This is multiplied by the groupLevel to get the full spacer width for the group.
     */
    indentWidth?: number;
    /** If all items in the group are selected. */
    selected?: boolean;
    /**
     * @deprecated Use `selected` instead. Deprecated at v.65.1.
     */
    isSelected?: boolean;
    /** A reference to the viewport in which the header is rendered. */
    viewport?: IViewport;
    /** The selection mode of the list the group lives within. */
    selectionMode?: SelectionMode;
    /** Text to display for the group footer. */
    footerText?: string;
    /** Text to display for the group "Show All" link. */
    showAllLinkText?: string;
    /** Callback for when the group "Show All" link is clicked */
    onToggleSummarize?: (group: IGroup) => void;
    /** Callback for when the group header is clicked. */
    onGroupHeaderClick?: (group: IGroup) => void;
    /** Callback for when the "keyup" event is fired on the group header. */
    onGroupHeaderKeyUp?: (ev: React.KeyboardEvent<HTMLElement>, group?: IGroup) => void;
    /** Callback for when the group is expanded or collapsed. */
    onToggleCollapse?: (group: IGroup) => void;
    /** Callback for when the group is selected. */
    onToggleSelectGroup?: (group: IGroup) => void;
    /** Determines if the group selection check box is shown for collapsed groups. */
    isCollapsedGroupSelectVisible?: boolean;
    /** Override which allows the caller to provider a custom renderer for the GroupHeader title. */
    onRenderTitle?: IRenderFunction<IGroupHeaderProps>;
    /** Props for expand/collapse button
     * @deprecated Use {@link IGroupHeaderProps.expandButtonProps} instead.
     */
    expandButtonProps?: React.HTMLAttributes<HTMLButtonElement>;
    /** Stores parent group's children. */
    groups?: IGroup[];
    /** Custom className */
    className?: string;
    /** Theme provided by the Higher Order Component */
    theme?: ITheme;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupedList extends IList {
    /**
     * Ensures that the list content is updated. Call this in cases where the list props don't change, but the list still
     * needs to be re-evaluated. For example, if a sizer bar is adjusted and causes the list width to change, you can
     * call this to force a re-evaluation. Be aware that this can be an expensive operation and should be done sparingly.
     */
    forceUpdate: () => void;
    /**
     * Toggles the collapsed state of all the groups in the list.
     */
    toggleCollapseAll: (allCollapsed: boolean) => void;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupedListProps extends React.ClassAttributes<GroupedListBase> {
    /**
     * Theme that is passed in from Higher Order Component
     */
    theme?: ITheme;
    /**
     * Style function to be passed in to override the themed or default styles
     */
    styles?: IStyleFunctionOrObject<IGroupedListStyleProps, IGroupedListStyles>;
    /**
     * Optional callback to access the IGroupedList interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IGroupedList>;
    /** Optional class name to add to the root element. */
    className?: string;
    /** Boolean value to indicate if the component should render in compact mode. Set to false by default */
    compact?: boolean;
    /** Map of callback functions related to drag and drop functionality. */
    dragDropEvents?: IDragDropEvents;
    /** helper to manage drag/drop across item and groups */
    dragDropHelper?: IDragDropHelper;
    /** Event names and corresponding callbacks that will be registered to groups and rendered elements */
    eventsToRegister?: {
        eventName: string;
        callback: (context: IDragDropContext, event?: any) => void;
    }[];
    /** Optional override properties to render groups. */
    groupProps?: IGroupRenderProps;
    /** Optional grouping instructions. */
    groups?: IGroup[];
    /** List of items to render. */
    items: any[];
    /** Optional properties to pass through to the FocusZone. */
    focusZoneProps?: IFocusZoneProps;
    /** Optional properties to pass through to the list components being rendered. */
    listProps?: IListProps;
    /** Optional properties to pass through to the root list component being rendered. */
    rootListProps?: IListProps;
    /** Rendering callback to render the group items. */
    onRenderCell: (nestingDepth?: number, item?: any, index?: number) => React.ReactNode;
    /** Override the default role for GroupedList.  */
    role?: string;
    /** Optional selection model to track selection state.  */
    selection?: ISelection;
    /** Controls how/if the list manages selection. */
    selectionMode?: SelectionMode;
    /** Optional Viewport, provided by the parent component. */
    viewport?: IViewport;
    /** Optional callback when the group expand state changes between all collapsed and at least one group is expanded. */
    onGroupExpandStateChanged?: (isSomeGroupExpanded: boolean) => void;
    /**
     * boolean to control if pages containing unchanged items should be cached, this is a perf optimization
     * The same property in List.Props
     */
    usePageCache?: boolean;
    /**
     * Optional callback to determine whether the list should be rendered in full, or virtualized.
     * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
     * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance for
     * smaller lists.
     * The default implementation will virtualize when this callback is not provided.
     */
    onShouldVirtualize?: (props: IListProps) => boolean;
    /**
     * Optional function to override default group height calculation used by list virtualization.
     */
    getGroupHeight?: (group: IGroup, groupIndex: number) => number;
}

export declare interface IGroupedListSectionProps extends React.ClassAttributes<GroupedListSection> {
    /** GroupedList resolved class names */
    groupedListClassNames?: IProcessedStyleSet<IGroupedListStyles>;
    /**
     * Gets the component ref.
     */
    componentRef?: () => void;
    /** Whether to render in compact mode */
    compact?: boolean;
    /** Map of callback functions related to drag and drop functionality. */
    dragDropEvents?: IDragDropEvents;
    /** helper to manage drag/drop across item rows and groups */
    dragDropHelper?: IDragDropHelper;
    /** Event names and corresponding callbacks that will be registered to the group and the rendered elements */
    eventsToRegister?: {
        eventName: string;
        callback: (context: IDragDropContext, event?: any) => void;
    }[];
    /** Information to pass in to the group footer. */
    footerProps?: IGroupFooterProps;
    /** Grouping item limit. */
    getGroupItemLimit?: (group: IGroup) => number;
    /** Optional grouping instructions. */
    groupIndex?: number;
    /** Optional group nesting level. */
    groupNestingDepth?: number;
    /** Optional grouping instructions. */
    group?: IGroup;
    /** Optional override properties to render groups. */
    groupProps?: IGroupRenderProps;
    /** Information to pass in to the group header. */
    headerProps?: IGroupHeaderProps;
    /** List of items to render. */
    items: any[];
    /** Optional list props to pass to list renderer.  */
    listProps?: IListProps;
    /** Rendering callback to render the group items. */
    onRenderCell: (nestingDepth?: number, item?: any, index?: number) => React.ReactNode;
    /** Optional selection model to track selection state.  */
    selection?: ISelection;
    /** Controls how/if the details list manages selection. */
    selectionMode?: SelectionMode;
    /** Information to pass in to the group Show All footer. */
    showAllProps?: IGroupShowAllProps;
    /** Optional Viewport, provided by the parent component. */
    viewport?: IViewport;
    /** Override for rendering the group header. */
    onRenderGroupHeader?: IRenderFunction<IGroupHeaderProps>;
    /** Override for rendering the group Show All link. */
    onRenderGroupShowAll?: IRenderFunction<IGroupShowAllProps>;
    /** Override for rendering the group footer. */
    onRenderGroupFooter?: IRenderFunction<IGroupFooterProps>;
    /**
     * Optional callback to determine whether the list should be rendered in full, or virtualized.
     * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
     * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance for
     * smaller lists.
     * The default implementation will virtualize when this callback is not provided.
     */
    onShouldVirtualize?: (props: IListProps) => boolean;
    /** Stores parent group's children. */
    groups?: IGroup[];
}

export declare interface IGroupedListSectionState {
    isDropping?: boolean;
    isSelected?: boolean;
}

export declare interface IGroupedListState {
    selectionMode?: IGroupedListProps['selectionMode'];
    compact?: IGroupedListProps['compact'];
    groups?: IGroup[];
    items?: IGroupedListProps['items'];
    listProps?: IGroupedListProps['listProps'];
    version: {};
}

/**
 * {@docCategory GroupedList}
 */
export declare type IGroupedListStyleProps = Required<Pick<IGroupedListProps, 'theme'>> & Pick<IGroupedListProps, 'className'> & {
    /** whether or not the group is collapsed */
    isCollapsed?: boolean;
    /** Whether the group is in compact mode or not */
    compact?: boolean;
};

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupedListStyles {
    root: IStyle;
    group: IStyle;
    groupIsDropping: IStyle;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupFooterProps extends IGroupDividerProps {
    /**
     * Style function to be passed in to override the themed or default styles
     */
    styles?: IStyleFunctionOrObject<IGroupFooterStyleProps, IGroupFooterStyles>;
}

/**
 * {@docCategory GroupedList}
 */
export declare type IGroupFooterStyleProps = Required<Pick<IGroupFooterProps, 'theme'>> & Pick<IGroupFooterProps, 'selected' | 'className'> & {
    /** Whether the footer is collapsed */
    isCollapsed?: boolean;
};

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupFooterStyles {
    root: IStyle;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupHeaderCheckboxProps {
    checked: boolean;
    theme?: ITheme;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupHeaderProps extends IGroupDividerProps {
    /** Style function to be passed in to override the themed or default styles */
    styles?: IStyleFunctionOrObject<IGroupHeaderStyleProps, IGroupHeaderStyles>;
    /** GroupedList id for aria-controls */
    groupedListId?: string;
    /** Native props for the GroupHeader expand and collapse button */
    expandButtonProps?: React.HTMLAttributes<HTMLButtonElement>;
    /** Defines the name of a custom icon to be used for group headers. If not set, the default icon will be used */
    expandButtonIcon?: string;
    /** Native props for the GroupHeader select all button */
    selectAllButtonProps?: React.HTMLAttributes<HTMLButtonElement>;
    /** Defines the number of items in the current set of listitems or treeitems */
    ariaSetSize?: number;
    /** Defines an element's number or position in the current set of listitems or treeitems */
    ariaPosInSet?: number;
    /**
     * If provided, can be used to render a custom checkbox
     */
    onRenderGroupHeaderCheckbox?: IRenderFunction<IGroupHeaderCheckboxProps>;
    /**
     * Whether to use fast icon and check components. The icons can't be targeted by customization
     * but are still customizable via class names.
     * @defaultvalue true
     */
    useFastIcons?: boolean;
}

/**
 * {@docCategory GroupedList}
 */
export declare type IGroupHeaderStyleProps = Required<Pick<IGroupHeaderProps, 'theme'>> & Pick<IGroupHeaderProps, 'selected' | 'className'> & {
    /** Is Header collapsed */
    isCollapsed?: boolean;
    /** Whether the group header is in compact mode or not */
    compact?: boolean;
};

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupHeaderStyles {
    root: IStyle;
    groupHeaderContainer: IStyle;
    headerCount: IStyle;
    check: IStyle;
    dropIcon: IStyle;
    expand: IStyle;
    expandIsCollapsed: IStyle;
    title: IStyle;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupRenderProps {
    /** Boolean indicating if all groups are in collapsed state. */
    isAllGroupsCollapsed?: boolean;
    /** Grouping item limit. */
    getGroupItemLimit?: (group: IGroup) => number;
    /** Callback for when all groups are expanded or collapsed. */
    onToggleCollapseAll?: (isAllCollapsed: boolean) => void;
    /** Information to pass in to the group header. */
    headerProps?: IGroupHeaderProps;
    /** Information to pass in to the group Show all footer. */
    showAllProps?: IGroupShowAllProps;
    /** Information to pass in to the group footer. */
    footerProps?: IGroupFooterProps;
    /**
     * Override which allows the caller to provide a custom header.
     */
    onRenderHeader?: IRenderFunction<IGroupHeaderProps>;
    /**
     * Override which allows the caller to provide a custom Show All link.
     */
    onRenderShowAll?: IRenderFunction<IGroupShowAllProps>;
    /**
     * Override which allows the caller to provide a custom footer.
     */
    onRenderFooter?: IRenderFunction<IGroupFooterProps>;
    /**
     * Flag to indicate whether to ignore the collapsing icon on header.
     * @defaultvalue CollapseAllVisibility.visible
     */
    collapseAllVisibility?: CollapseAllVisibility;
    /**
     * Boolean indicating if empty groups are shown
     * @defaultvalue false
     */
    showEmptyGroups?: boolean;
    /**
     * Override which allows the caller to provide a custom aria role
     */
    role?: string;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupShowAllProps extends IGroupDividerProps {
    /**
     * Style function to be passed in to override the themed or default styles
     */
    styles?: IStyleFunctionOrObject<IGroupShowAllStyleProps, IGroupShowAllStyles>;
    /**
     * The Show All link text.
     * @defaultvalue 'Show All'
     */
    showAllLinkText?: string;
}

/**
 * {@docCategory GroupedList}
 */
export declare type IGroupShowAllStyleProps = Required<Pick<IGroupShowAllProps, 'theme'>>;

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupShowAllStyles {
    root: IStyle;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupSpacerProps {
    /**
     * @deprecated Unused. Will be removed in \>= 7.0
     */
    theme?: ITheme;
    /**
     * @deprecated Unused. Will be removed in \>= 7.0
     */
    styles?: IStyleFunctionOrObject<IGroupSpacerStyleProps, IGroupSpacerStyles>;
    /** Count of spacer(s) */
    count: number;
    /** How much to indent */
    indentWidth?: number;
    /** Override the default role (presentation) */
    role?: string;
}

/**
 * {@docCategory GroupedList}
 * @deprecated Unused. Use `IGroupSpacerProps.indentWidth`. Will be removed in \>= 7.0.
 */
export declare type IGroupSpacerStyleProps = Required<Pick<IGroupSpacerProps, 'theme'>> & {
    width?: number;
};

/**
 * {@docCategory GroupedList}
 * @deprecated Unused. Will be removed in \>= 7.0.
 */
export declare interface IGroupSpacerStyles {
    root: IStyle;
}

/**
 * {@docCategory ComboBox}
 */
export declare interface IOnRenderComboBoxLabelProps {
    /**
     * Props to render the ComboBox.
     */
    props: IComboBoxProps;
    /**
     * Accessible text for label when ComboBox is multiselected.
     */
    multiselectAccessibleText?: string;
}

/**
 * Extended column render props.
 *
 * {@docCategory DetailsList}
 */
export declare type IOverrideColumnRenderProps = Pick<IDetailsListProps, 'onRenderItemColumn' | 'getCellValueKey'> & Pick<IDetailsRowProps, 'cellsByColumn'>;

/**
 * ShimmeredDetailsList props interface
 * {@docCategory DetailsList}
 */
export declare interface IShimmeredDetailsListProps extends Omit<IDetailsListProps, 'styles'> {
    /**
     * DetailsList styles to pass through.
     */
    detailsListStyles?: IDetailsListProps['styles'];
    /**
     * Boolean flag to control when to render placeholders vs real items.
     * It's up to the consumer app to know when fetching of the data is done to toggle this prop.
     */
    enableShimmer?: boolean;
    /**
     * Aria label for shimmer. Set on grid while shimmer is enabled.
     */
    ariaLabelForShimmer?: string;
    /**
     * Determines whether to remove a fading out to bottom overlay over the shimmering items
     * used to further emphasize the unknown number of items that will be fetched.
     */
    removeFadingOverlay?: boolean;
    /**
     * Custom placeholder renderer to be used when in need to override the default placeholder of a DetailsRow.
     * `rowProps` argument is passed to leverage the calculated column measurements done by DetailsList
     * or you can use the optional arguments of item `index` and `defaultRender` to execute additional
     * logic before rendering the default placeholder.
     */
    onRenderCustomPlaceholder?: (rowProps: IDetailsRowProps, index?: number, defaultRender?: (props: IDetailsRowProps) => React.ReactNode) => React.ReactNode;
    /**
     * Custom styles to override the styles specific to the ShimmeredDetailsList root area.
     * @deprecated Use `styles` prop instead. Any value provided will be ignored.
     */
    shimmerOverlayStyles?: IStyleFunctionOrObject<IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles>;
    /**
     * Custom styles to override the styles specific to the ShimmeredDetailsList root area.
     */
    styles?: IStyleFunctionOrObject<IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles>;
    /**
     * Number of shimmer placeholder lines to render.
     * @defaultvalue 10
     */
    shimmerLines?: number;
}

/**
 * Defines props needed to construct styles.
 * This represents the simplified set of immutable things which control the class names.
 * {@docCategory DetailsList}
 */
export declare type IShimmeredDetailsListStyleProps = Required<Pick<IShimmeredDetailsListProps, 'theme'>>;

/**
 * Represents the stylable areas of the control.
 * {@docCategory DetailsList}
 */
export declare interface IShimmeredDetailsListStyles {
    /**
     * Represents styles passed to the `List` component for creating a fade-out to the bottom overlay.
     */
    root: IStyle;
}
export { IViewport }
export { IWithViewportProps }
export { ResponsiveMode }

/**
 * {@docCategory DetailsList}
 */
export declare enum SelectAllVisibility {
    none = 0,
    hidden = 1,
    visible = 2
}

export declare const ShimmeredDetailsList: React.FunctionComponent<IShimmeredDetailsListProps>;

export declare class ShimmeredDetailsListBase extends React.Component<IShimmeredDetailsListProps, {}> {
    private _shimmerItems;
    private _classNames;
    constructor(props: IShimmeredDetailsListProps);
    render(): JSX.Element;
    private _onRenderShimmerPlaceholder;
    private _renderDefaultShimmerPlaceholder;
}

export declare class VirtualizedComboBox extends React.Component<IComboBoxProps, {}> implements IComboBox {
    /** The combo box element */
    private _comboBox;
    /** The virtualized list element */
    private _list;
    constructor(props: IComboBoxProps);
    /**
     * All selected options
     */
    get selectedOptions(): IComboBoxOption[];
    dismissMenu(): void;
    focus(shouldOpenOnFocus?: boolean, useFocusAsync?: boolean): boolean;
    render(): JSX.Element;
    protected _onRenderList: (props: IComboBoxProps) => JSX.Element;
    protected _onScrollToItem: (itemIndex: number) => void;
}

export * from "@fluentui/react-date-time";
export * from "@fluentui/react-internal";
export * from "@fluentui/react-internal/lib/Selection";
export * from "@fluentui/react-internal/lib/compat/Button";

export { }
