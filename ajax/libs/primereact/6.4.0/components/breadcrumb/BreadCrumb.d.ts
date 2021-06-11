import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';

export interface BreadCrumbProps {
    id?: string;
    model?: MenuItem[];
    home?: MenuItem;
    style?: object;
    className?: string;
}

export declare class BreadCrumb extends React.Component<BreadCrumbProps, any> { }
