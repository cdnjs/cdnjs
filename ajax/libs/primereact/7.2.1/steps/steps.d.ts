import * as React from 'react';
import { MenuItem } from '../menuitem';

interface StepsSelectParams {
    originalEvent: React.SyntheticEvent;
    item: MenuItem;
    index: number;
}

export interface StepsProps {
    id?: string;
    model: MenuItem[];
    activeIndex?: number;
    readOnly?: boolean;
    style?: object;
    className?: string;
    onSelect?(e: StepsSelectParams): void;
}

export declare class Steps extends React.Component<StepsProps, any> { }
