import * as React from 'react';

interface PickListProps {
    id?: string;
    source?: any[];
    target?: any[];
    sourceHeader?: any;
    targetHeader?: any;
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
    itemTemplate?(item: any): JSX.Element | undefined;
    onChange?(e: {event: Event, source: any, target: any}): void;
    onMoveToSource?(e: {originalEvent: Event, value: any}): void;
    onMoveAllToSource?(e: {originalEvent: Event, value: any}): void;
    onMoveToTarget?(e: {originalEvent: Event, value: any}): void;
    onMoveAllToTarget?(e: {originalEvent: Event, value: any}): void;
    onSourceSelectionChange?(e: {originalEvent: Event, value: any}): void;
    onTargetSelectionChange?(e: {originalEvent: Event, value: any}): void;
}

export class PickList extends React.Component<PickListProps,any> {}
