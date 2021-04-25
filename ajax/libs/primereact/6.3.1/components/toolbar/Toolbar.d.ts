import * as React from 'react';

declare module 'primereact/toolbar' {

    type TemplateType = React.ReactNode | ((props: ToolbarProps) => React.ReactNode);

    export interface ToolbarProps {
        id?: string;
        style?: object;
        className?: string;
        left?: TemplateType;
        right?: TemplateType;
    }

    export class Toolbar extends React.Component<ToolbarProps, any> { }
}
