import * as React from 'react';

declare module 'primereact/picklist' {

    interface EventParams {
        originalEvent: React.SyntheticEvent;
        value: any;
    }

    interface ChangeParams {
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
        itemTemplate?(item: any): React.ReactNode;
        onChange?(e: ChangeParams): void;
        onMoveToSource?(e: EventParams): void;
        onMoveAllToSource?(e: EventParams): void;
        onMoveToTarget?(e: EventParams): void;
        onMoveAllToTarget?(e: EventParams): void;
        onSourceSelectionChange?(e: EventParams): void;
        onTargetSelectionChange?(e: EventParams): void;
    }

    export class PickList extends React.Component<PickListProps, any> { }
}
