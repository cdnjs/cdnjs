import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';

declare module 'primereact/megamenu' {

    type OrientationType = 'vertical' | 'horizontal';

    export interface MegaMenuProps {
        id?: string;
        model?: MenuItem[];
        style?: object;
        className?: string;
        orientation?: OrientationType;
    }

    export class MegaMenu extends React.Component<MegaMenuProps, any> { }
}
