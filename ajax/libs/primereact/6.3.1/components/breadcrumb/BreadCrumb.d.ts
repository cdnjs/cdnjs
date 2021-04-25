import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';

declare module 'primereact/breadcrumb' {
    export interface BreadCrumbProps {
        id?: string;
        model?: MenuItem[];
        home?: MenuItem;
        style?: object;
        className?: string;
    }

    export class BreadCrumb extends React.Component<BreadCrumbProps, any> { }
}
