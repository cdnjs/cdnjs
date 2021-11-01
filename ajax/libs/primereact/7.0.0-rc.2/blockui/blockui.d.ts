import * as React from 'react';

type BlockUITemplateType = React.ReactNode | ((props: BlockUIProps) => React.ReactNode);

export interface BlockUIProps {
    id?: string;
    blocked?: boolean;
    fullScreen?: boolean;
    baseZIndex?: number;
    autoZIndex?: boolean;
    style?: object;
    className?: string;
    template?: BlockUITemplateType;
    onBlocked?(): void;
    onUnblocked?(): void;
}

export declare class BlockUI extends React.Component<BlockUIProps, any> {
    public block(): void;
    public unblock(): void;
}
