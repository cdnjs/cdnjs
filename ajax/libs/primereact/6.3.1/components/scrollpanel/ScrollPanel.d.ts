import * as React from 'react';

declare module 'primereact/scrollpanel' {

    export interface ScrollPanelProps {
        id?: string;
        style?: object;
        className?: string;
    }

    export class ScrollPanel extends React.Component<ScrollPanelProps, any> { }
}
