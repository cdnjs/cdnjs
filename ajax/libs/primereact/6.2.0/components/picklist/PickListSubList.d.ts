import * as React from 'react';

interface PickListSubListProps {
    list?: any[];
    selection?: any[];
    header?: string;
    className?: string;
    listClassName?: string;
    style?: object;
    showControls?: boolean;
    metaKeySelection?: boolean;
    itemTemplate?(item: any): JSX.Element | undefined;
    onItemClick?(): void;
    onSelectionChange?(e: {event: Event, value: any}): void;
}

export class PickListSubList extends React.Component<PickListSubListProps,any> {}
