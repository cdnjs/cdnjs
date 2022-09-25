import * as React from 'react';

export interface AvatarGroupProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    children?: React.ReactNode;
}

export declare class AvatarGroup extends React.Component<AvatarGroupProps, any> {
    public getElement(): HTMLDivElement;
}
