import * as React from 'react';
import { MenuItem } from '../menuitem';

type DockHeaderType = React.ReactNode | ((options: DockHeaderTemplateOptions) => React.ReactNode);

type DockFooterType = React.ReactNode | ((options: DockFooterTemplateOptions) => React.ReactNode);

type DockPositionType = 'top' | 'bottom' | 'left' | 'right';

interface DockHeaderTemplateOptions {
    props: DockProps;
}

interface DockFooterTemplateOptions extends DockHeaderTemplateOptions {}

export interface DockProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    model?: MenuItem[];
    position?: DockPositionType;
    magnification?: boolean;
    header?: DockHeaderType;
    footer?: DockFooterType;
    children?: React.ReactNode;
}

export declare class Dock extends React.Component<DockProps, any> {
    public getElement(): HTMLDivElement;
}
