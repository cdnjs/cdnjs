import * as React from 'react';

type ToolbarTemplateType = React.ReactNode | ((props: ToolbarProps) => React.ReactNode);

export interface ToolbarProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    left?: ToolbarTemplateType;
    right?: ToolbarTemplateType;
    children?: React.ReactNode;
}

export declare class Toolbar extends React.Component<ToolbarProps, any> {
    public getElement(): HTMLDivElement;
}
