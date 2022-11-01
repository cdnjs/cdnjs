import * as React from 'react';
import { MenuItem } from '../menuitem';

interface StepsSelectParams {
    originalEvent: React.SyntheticEvent;
    item: MenuItem;
    index: number;
}

export interface StepsProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onSelect' | 'ref'> {
    model: MenuItem[];
    activeIndex?: number;
    readOnly?: boolean;
    onSelect?(e: StepsSelectParams): void;
    children?: React.ReactNode;
}

export declare class Steps extends React.Component<StepsProps, any> {
    public getElement(): HTMLDivElement;
}
