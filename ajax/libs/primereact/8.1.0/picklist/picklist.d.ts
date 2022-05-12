import * as React from 'react';

type PickListItemTemplateType = React.ReactNode | ((item: any) => React.ReactNode);

interface PickListEventParams {
    originalEvent: React.SyntheticEvent;
    value: any;
}

interface PickListChangeParams {
    originalEvent: React.SyntheticEvent;
    source: any;
    target: any;
}

export interface PickListProps {
    id?: string;
    source?: any[];
    target?: any[];
    sourceHeader?: React.ReactNode;
    targetHeader?: React.ReactNode;
    style?: object;
    className?: string;
    sourceStyle?: object;
    targetStyle?: object;
    sourceSelection?: any;
    targetSelection?: any;
    showSourceControls?: boolean;
    showTargetControls?: boolean;
    metaKeySelection?: boolean;
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
    children?: React.ReactNode;
}

export declare class PickList extends React.Component<PickListProps, any> { }
