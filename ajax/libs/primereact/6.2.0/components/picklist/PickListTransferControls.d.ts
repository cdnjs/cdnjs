import * as React from 'react';

interface PickListTransferControlsProps {
    source?: any[];
    target?: any[];
    sourceSelection?: any[];
    targetSelection?: any[];
    onTransfer?(e: {originalEvent: Event, source: any[], target: any[], direction: string}): void;
}

export class PickListTransferControls extends React.Component<PickListTransferControlsProps,any> {}
