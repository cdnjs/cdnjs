import * as React from 'react';

type SplitterLayoutType = 'vertical' | 'horizontal';

type SplitterStateStorageType = 'session' | 'local';

interface SplitterResizeEndParams {
    originalEvent: React.SyntheticEvent;
    sizes: number[];
}

interface SplitterPanelProps {
    size?: number;
    minSize?: number;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
}

export declare class SplitterPanel extends React.Component<SplitterPanelProps, any> {}

export interface SplitterProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    layout?: SplitterLayoutType;
    gutterSize?: number;
    stateKey?: string;
    stateStorage?: SplitterStateStorageType;
    onResizeEnd?(e: SplitterResizeEndParams): void;
    children?: React.ReactNode;
}

export declare class Splitter extends React.Component<SplitterProps, any> {
    public getElement(): HTMLDivElement;
}
