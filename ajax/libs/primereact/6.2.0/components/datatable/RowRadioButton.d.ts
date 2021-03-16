import * as React from 'react';

interface RowRadioButtonProps {
    rowData?: object;
    selected?: boolean;
    onClick?(e: {originalEvent: Event, data: object}): void;
}

export class RowRadioButton extends React.Component<RowRadioButtonProps,any> {}
