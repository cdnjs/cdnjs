import * as React from 'react';
import { MenuItem } from '../menuitem';

export interface BreadCrumbProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'> {
    model?: MenuItem[];
    home?: MenuItem;
    children?: React.ReactNode;
}

export declare class BreadCrumb extends React.Component<BreadCrumbProps, any> {
    public getElement(): HTMLElement;
}
