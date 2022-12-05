import * as React from 'react';

type VirtualScrollerItemsType = any[] | any[][] | undefined | null;

type VirtualScrollerItemSizeType = number | number[];

type VirtualScrollerOrientationType = 'vertical' | 'horizontal' | 'both';

type VirtualScrollerScrollBehavior = 'auto' | 'smooth';

type VirtualScrollerToType = 'to-start' | 'to-end';

type VirtualScrollerLoadingTemplateType = React.ReactNode | ((options: VirtualScrollerLoadingTemplateOptions) => React.ReactNode);

type VirtualScrollerLoaderIconTemplateType = React.ReactNode | ((options: VirtualScrollerLoaderIconTemplateOptions) => React.ReactNode);

type VirtualScrollerItemTemplateType = React.ReactNode | ((item: any, options: VirtualScrollerTemplateOptions) => React.ReactNode);

type VirtualScrollerContentTemplateType = React.ReactNode | ((options: VirtualScrollerContentTemplateOptions) => React.ReactNode);

type VirtualScrollerStateType = number | VirtualScrollerState;

type VirtualScrollerToIndexType = number | number[];

interface VirtualScrollerOptionsType {
    left: number;
    top: number;
    behavior: VirtualScrollerScrollBehavior;
}

interface VirtualScrollerViewportRenderedRange {
    first: number;
    last: number;
}

interface VirtualScrollerRenderedRange {
    first: number;
    last: number;
    viewport: VirtualScrollerViewportRenderedRange;
}

interface VirtualScrollerState {
    rows: number;
    cols: number;
}

interface VirtualScrollerTemplateOptions {
    index: number;
    count: number;
    first: boolean;
    last: boolean;
    even: boolean;
    odd: boolean;
    props: VirtualScrollerProps;
}

interface VirtualScrollerLoadingTemplateOptions extends VirtualScrollerTemplateOptions {
    numCols: number;
    [key: string]: any;
}

interface VirtualScrollerLoaderIconTemplateOptions {
    className: string;
    element: JSX.Element;
    props: VirtualScrollerProps;
}

interface VirtualScrollerContentTemplateOptions {
    className: string;
    contentRef: any;
    spacerRef: any;
    stickyRef: any;
    items: VirtualScrollerItemsType;
    getItemOptions(index: number): VirtualScrollerTemplateOptions;
    children: any;
    element: JSX.Element;
    props: VirtualScrollerProps;
    loading: boolean;
    getLoaderOptions(index: number, ext?: object): VirtualScrollerLoadingTemplateOptions;
    loadingTemplate: VirtualScrollerLoadingTemplateType;
    itemSize: VirtualScrollerItemSizeType;
    rows: any[];
    columns: any[];
    vertical: boolean;
    horizontal: boolean;
    both: boolean;
}

interface VirtualScrollerChangeParams {
    first: VirtualScrollerStateType;
    last: VirtualScrollerStateType;
}

interface VirtualScrollerLazyParams extends VirtualScrollerChangeParams {}

export interface VirtualScrollerProps {
    id?: string;
    style?: React.CSSProperties;
    className?: string;
    items?: VirtualScrollerItemsType;
    itemSize?: VirtualScrollerItemSizeType;
    scrollHeight?: string;
    scrollWidth?: string;
    orientation?: VirtualScrollerOrientationType;
    numToleratedItems?: number;
    delay?: number;
    resizeDelay?: number;
    lazy?: boolean;
    disabled?: boolean;
    loaderDisabled?: boolean;
    columns?: any;
    loading?: boolean;
    autoSize?: boolean;
    showSpacer?: boolean;
    showLoader?: boolean;
    loadingTemplate?: VirtualScrollerLoadingTemplateType;
    loaderIconTemplate?: VirtualScrollerLoaderIconTemplateType;
    itemTemplate?: VirtualScrollerItemTemplateType;
    contentTemplate?: VirtualScrollerContentTemplateType;
    onScroll?(e: React.UIEvent<HTMLElement>): void;
    onScrollIndexChange?(e: VirtualScrollerChangeParams): void;
    onLazyLoad?(e: VirtualScrollerLazyParams): void;
    children?: React.ReactNode;
}

export declare class VirtualScroller extends React.Component<VirtualScrollerProps, any> {
    public getElementRef(): React.Ref<HTMLDivElement>;
    public scrollTo(options: VirtualScrollerOptionsType): void;
    public scrollToIndex(index: VirtualScrollerToIndexType, behavior?: VirtualScrollerScrollBehavior): void;
    public scrollInView(index: VirtualScrollerToIndexType, to: VirtualScrollerToType, behavior?: VirtualScrollerScrollBehavior): void;
    public getRenderedRange(): VirtualScrollerRenderedRange;
}
