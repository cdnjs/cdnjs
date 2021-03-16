import * as React from 'react';

interface RowCheckboxProps {
    rowData?: object;
    onClick?(e: {originalEvent: Event, data: object, checked: boolean}): void;
}

export class RowCheckbox extends React.Component<RowCheckboxProps,any> {}