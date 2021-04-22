import * as React from 'react';

declare namespace Toolbar {

    type TemplateType = React.ReactNode | ((props: ToolbarProps) => React.ReactNode);

    interface ToolbarProps {
        id?: string;
        style?: object;
        className?: string;
        left?: TemplateType;
        right?: TemplateType;
    }
}

export declare class Toolbar extends React.Component<Toolbar.ToolbarProps, any> { }
