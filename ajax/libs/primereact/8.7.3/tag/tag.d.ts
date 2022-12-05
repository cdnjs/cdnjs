import * as React from 'react';
import { IconType } from '../utils';

type TagSeverityType = 'success' | 'info' | 'warning' | 'danger';

export interface TagProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'ref'> {
    value?: React.ReactNode;
    severity?: TagSeverityType;
    rounded?: boolean;
    icon?: IconType<TagProps>;
    children?: React.ReactNode;
}

export declare class Tag extends React.Component<TagProps, any> {
    public getElement(): HTMLSpanElement;
}
