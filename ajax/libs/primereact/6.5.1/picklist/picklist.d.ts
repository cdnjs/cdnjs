import * as React from 'react';

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
    itemTemplate?(item: any): React.ReactNode;
    onChange?(e: PickListChangeParams): void;
    onMoveToSource?(e: PickListEventParams): void;
    onMoveAllToSource?(e: PickListEventParams): void;
    onMoveToTarget?(e: PickListEventParams): void;
    onMoveAllToTarget?(e: PickListEventParams): void;
    onSourceSelectionChange?(e: PickListEventParams): void;
    onTargetSelectionChange?(e: PickListEventParams): void;
}

export declare class PickList extends React.Component<PickListProps, any> { }
