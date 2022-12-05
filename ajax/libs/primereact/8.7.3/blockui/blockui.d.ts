import * as React from 'react';

type BlockUITemplateType = React.ReactNode | ((props: BlockUIProps) => React.ReactNode);

export interface BlockUIProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    autoZIndex?: boolean;
    baseZIndex?: number;
    blocked?: boolean;
    children?: React.ReactNode;
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
    fullScreen?: boolean;
    template?: BlockUITemplateType;
    onBlocked?(): void;
    onUnblocked?(): void;
}

export declare class BlockUI extends React.Component<BlockUIProps, any> {
    public block(): void;
    public unblock(): void;
    public getElement(): HTMLDivElement;
}
