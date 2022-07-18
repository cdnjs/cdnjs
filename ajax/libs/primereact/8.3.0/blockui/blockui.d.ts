import * as React from 'react';

type BlockUITemplateType = React.ReactNode | ((props: BlockUIProps) => React.ReactNode);

export interface BlockUIProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    blocked?: boolean;
    fullScreen?: boolean;
    baseZIndex?: number;
    autoZIndex?: boolean;
    template?: BlockUITemplateType;
    onBlocked?(): void;
    onUnblocked?(): void;
    children?: React.ReactNode;
}

export declare class BlockUI extends React.Component<BlockUIProps, any> {
    public block(): void;
    public unblock(): void;
    public getElement(): HTMLDivElement;
}
