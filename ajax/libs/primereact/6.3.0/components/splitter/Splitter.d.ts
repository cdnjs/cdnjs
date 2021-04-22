import * as React from 'react';

declare namespace SplitterPanel {

    interface SplitterPanelProps {
        size?: number;
        minSize?: number;
        style?: object;
        className?: string;
    }
}

export declare class SplitterPanel extends React.Component<SplitterPanel.SplitterPanelProps, any> { }

declare namespace Splitter {

    type LayoutType = 'vertical' | 'horizontal';

    type StateStorageType = 'session' | 'local';

    interface ResizeEndParams {
        originalEvent: React.SyntheticEvent;
        sizes: number[];
    }

    interface SplitterProps {
        id?: string;
        className?: string;
        style?: object;
        layout?: LayoutType;
        gutterSize?: number;
        stateKey?: string;
        stateStorage?: StateStorageType;
        onResizeEnd?(e: ResizeEndParams): void;
    }
}

export declare class Splitter extends React.Component<Splitter.SplitterProps, any> { }
