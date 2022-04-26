import * as React from 'react';

type ToolbarTemplateType = React.ReactNode | ((props: ToolbarProps) => React.ReactNode);

export interface ToolbarProps {
    id?: string;
    style?: object;
    className?: string;
    left?: ToolbarTemplateType;
    right?: ToolbarTemplateType;
    children?: React.ReactNode;
}

export declare class Toolbar extends React.Component<ToolbarProps, any> { }
