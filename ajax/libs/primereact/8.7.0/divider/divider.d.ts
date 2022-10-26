import * as React from 'react';

type DividerAlignType = 'center' | 'left' | 'right' | 'bottom' | 'top';

type DividerLayoutType = 'vertical' | 'horizontal';

type DividerBorderType = 'solid' | 'dashed' | 'dotted';

export interface DividerProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    align?: DividerAlignType;
    layout?: DividerLayoutType;
    type?: DividerBorderType;
    children?: React.ReactNode;
}

export declare class Divider extends React.Component<DividerProps, any> {
    public getElement(): HTMLDivElement;
}
