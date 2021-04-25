import * as React from 'react';

declare module 'primereact/row' {

    export interface RowProps {
        style?: object;
        className?: string;
    }

    export class Row extends React.Component<RowProps, any> { }
}
