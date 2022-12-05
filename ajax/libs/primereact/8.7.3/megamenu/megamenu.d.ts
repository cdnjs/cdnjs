import * as React from 'react';
import { MenuItem } from '../menuitem';

type MegaMenuOrientationType = 'vertical' | 'horizontal';

type MegaMenuStartTemplate = React.ReactNode | ((props: MegaMenuProps) => React.ReactNode);

type MegaMenuEndTemplate = React.ReactNode | ((props: MegaMenuProps) => React.ReactNode);

export interface MegaMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    model?: MenuItem[];
    orientation?: MegaMenuOrientationType;
    start?: MegaMenuStartTemplate;
    end?: MegaMenuEndTemplate;
    children?: React.ReactNode;
}

export declare class MegaMenu extends React.Component<MegaMenuProps, any> {
    public getElement(): HTMLDivElement;
}
