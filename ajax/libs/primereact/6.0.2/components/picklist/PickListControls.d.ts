import * as React from 'react';

interface PickListControlsProps {
    className?: string;
    list?: any[];
    selection?: any[];
    onReorder?(e: {originalEvent: Event, value: any, direction: string}): void;
}

export class PickListControls extends React.Component<PickListControlsProps,any> {}
