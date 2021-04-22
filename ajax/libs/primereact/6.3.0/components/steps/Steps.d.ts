import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';

declare namespace Steps {

    interface SelectParams {
        originalEvent: React.SyntheticEvent;
        item: MenuItem;
        index: number;
    }

    interface StepsProps {
        id?: string;
        model: MenuItem[];
        activeIndex?: number;
        readOnly?: boolean;
        style?: object;
        className?: string;
        onSelect?(e: SelectParams): void;
    }
}

export declare class Steps extends React.Component<Steps.StepsProps, any> { }
