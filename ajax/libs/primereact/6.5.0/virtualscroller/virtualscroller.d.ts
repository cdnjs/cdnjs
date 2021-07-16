import * as React from 'react';

type VirtualScrollerItemsType = any[] | any[][] | undefined | null;

type VirtualScrollerItemSizeType = number | number[];

type VirtualScrollerOrientationType = 'vertical' | 'horizontal' | 'both';

type VirtualScrollerScrollBehavior = 'auto' | 'smooth';

type VirtualScrollerToType = 'to-start' | 'to-end';

type VirtualScrollerLoadingTemplateType = React.ReactNode | ((options: VirtualScrollerLoadingTemplateOptions) => React.ReactNode);

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
}

interface VirtualScrollerContentTemplateOptions {
    className: string;
    ref: any;
    children: any;
    element: JSX.Element;
    props: VirtualScrollerProps;
    loading: boolean;
    first: number;
    last: number;
}

interface VirtualScrollerChangeParams {
    first: VirtualScrollerStateType;
    numItems: VirtualScrollerStateType;
}

interface VirtualScrollerLazyParams {
    first: VirtualScrollerStateType;
    last: VirtualScrollerStateType;
    [key: string]: any;
}

export interface VirtualScrollerProps {
    id?: string;
    style?: object;
    className?: string;
    items?: VirtualScrollerItemsType;
    itemSize?: VirtualScrollerItemSizeType;
    scrollHeight?: string;
    scrollWidth?: string;
    orientation?: VirtualScrollerOrientationType;
    numToleratedItems?: number;
    delay?: number;
    lazy?: boolean;
    showLoader?: boolean;
    loadingTemplate?: VirtualScrollerLoadingTemplateType;
    itemTemplate?: VirtualScrollerItemTemplateType;
    contentTemplate?: VirtualScrollerContentTemplateType;
    onScroll?(e: React.UIEvent<HTMLElement>): void;
    onScrollIndexChange?(e: VirtualScrollerChangeParams): void;
    onLazyLoad?(e: VirtualScrollerLazyParams): void;
}

export declare class VirtualScroller extends React.Component<VirtualScrollerProps, any> {
    public scrollTo(options: VirtualScrollerOptionsType): void;
    public scrollToIndex(index: VirtualScrollerToIndexType, behavior?: VirtualScrollerScrollBehavior): void;
    public scrollInView(index: VirtualScrollerToIndexType, to: VirtualScrollerToType, behavior?: VirtualScrollerScrollBehavior): void;
    public getRenderedRange(): VirtualScrollerRenderedRange;
}
