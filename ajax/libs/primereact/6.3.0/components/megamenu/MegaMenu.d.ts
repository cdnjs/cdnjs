import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';

declare namespace MegaMenu {

    type OrientationType = 'vertical' | 'horizontal';

    interface MegaMenuProps {
        id?: string;
        model?: MenuItem[];
        style?: object;
        className?: string;
        orientation?: OrientationType;
    }
}

export declare class MegaMenu extends React.Component<MegaMenu.MegaMenuProps, any> { }
