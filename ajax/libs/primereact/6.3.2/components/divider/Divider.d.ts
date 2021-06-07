import * as React from 'react';

type DividerAlignType = 'center' | 'left' | 'right' | 'bottom' | 'top';

type DividerLayoutType = 'vertical' | 'horizontal';

type DividerBorderType = 'solid' | 'dashed' | 'dotted';

export interface DividerProps {
    align?: DividerAlignType;
    layout?: DividerLayoutType;
    type?: DividerBorderType;
    style?: object;
    className?: string;
}

export declare class Divider extends React.Component<DividerProps, any> { }
