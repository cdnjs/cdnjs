import * as React from 'react';
import { MenuItem } from '../menuitem';

type MegaMenuOrientationType = 'vertical' | 'horizontal';

export interface MegaMenuProps {
    id?: string;
    model?: MenuItem[];
    style?: object;
    className?: string;
    orientation?: MegaMenuOrientationType;
}

export declare class MegaMenu extends React.Component<MegaMenuProps, any> { }
