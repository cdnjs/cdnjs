import * as React from 'react';

declare module 'primereact/splitter' {

    interface SplitterPanelProps {
        size?: number;
        minSize?: number;
        style?: object;
        className?: string;
    }

    export class SplitterPanel extends React.Component<SplitterPanelProps, any> { }

    type LayoutType = 'vertical' | 'horizontal';

    type StateStorageType = 'session' | 'local';

    interface ResizeEndParams {
        originalEvent: React.SyntheticEvent;
        sizes: number[];
    }

    export interface SplitterProps {
        id?: string;
        className?: string;
        style?: object;
        layout?: LayoutType;
        gutterSize?: number;
        stateKey?: string;
        stateStorage?: StateStorageType;
        onResizeEnd?(e: ResizeEndParams): void;
    }

    export class Splitter extends React.Component<SplitterProps, any> { }
}
