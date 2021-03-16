import * as React from 'react';
import {MenuItem} from '../menuitem/MenuItem';

interface StepsProps {
    id?: string;
    model: MenuItem[];
    activeIndex?:  number;
    readOnly?: boolean;
    style?: object;
    className?: string;
    onSelect?(e: {originalEvent: Event, item: MenuItem, index: number}): void;
}

export class Steps extends React.Component<StepsProps,any> {}
