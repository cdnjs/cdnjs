import * as React from 'react';

type PickListItemTemplateType = React.ReactNode | ((item: any) => React.ReactNode);

type PickListFilterTemplateType = React.ReactNode | ((options: PickListFilterTemplateOptions) => React.ReactNode);

interface PickListEventParams {
    originalEvent: React.SyntheticEvent;
    value: any;
}

interface PickListChangeParams {
    originalEvent: React.SyntheticEvent;
    source: any;
    target: any;
}

interface PickListFilterTemplateOptions {
    className: string;
    inputProps: PickListFilterInputProps;
    iconClassName: string;
    element: React.ReactNode;
    props: PickListProps;
}

interface PickListFilterInputProps {
    className: string;
    onChange(event: React.SyntheticEvent): void;
    onKeyDown(event: React.SyntheticEvent): void;
}

export interface PickListProps {
    id?: string;
    source?: any[];
    target?: any[];
    sourceHeader?: React.ReactNode;
    targetHeader?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    sourceStyle?: React.CSSProperties;
    targetStyle?: React.CSSProperties;
    sourceSelection?: any;
    targetSelection?: any;
    showSourceControls?: boolean;
    showTargetControls?: boolean;
    metaKeySelection?: boolean;
    filterBy?: string;
    filterMatchMode?: string;
    filterLocale?: string;
    sourceFilterValue?: string;
    targetFilterValue?: string;
    showSourceFilter?: boolean;
    showTargetFilter?: boolean;
    sourceFilterPlaceholder?: string;
    targetFilterPlaceholder?: string;
    sourceFilterTemplate?: PickListFilterTemplateType;
    targetFilterTemplate?: PickListFilterTemplateType;
    tabIndex?: number;
    dataKey?: string;
    itemTemplate?: PickListItemTemplateType;
    sourceItemTemplate?: PickListItemTemplateType;
    targetItemTemplate?: PickListItemTemplateType;
    onChange?(e: PickListChangeParams): void;
    onMoveToSource?(e: PickListEventParams): void;
    onMoveAllToSource?(e: PickListEventParams): void;
    onMoveToTarget?(e: PickListEventParams): void;
    onMoveAllToTarget?(e: PickListEventParams): void;
    onSourceSelectionChange?(e: PickListEventParams): void;
    onTargetSelectionChange?(e: PickListEventParams): void;
    onSourceFilterChange?(e: PickListEventParams): void;
    onTargetFilterChange?(e: PickListEventParams): void;
    children?: React.ReactNode;
}

export declare class PickList extends React.Component<PickListProps, any> {
    public getElement(): HTMLDivElement;
}
