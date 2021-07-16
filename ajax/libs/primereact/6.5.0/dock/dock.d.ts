import * as React from 'react';
import { MenuItem } from '../menuitem';

type DockPositionType = 'top' | 'bottom' | 'left' | 'right';

export interface DockProps {
    id?: string;
    style?: object;
    className?: string;
    model?: MenuItem[];
    position?: DockPositionType;
}

export declare class Dock extends React.Component<DockProps, any> { }
