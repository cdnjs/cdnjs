import * as React from 'react';

declare namespace Divider {

    type AlignType = 'center' | 'left' | 'right' | 'bottom' | 'top';

    type LayoutType = 'vertical' | 'horizontal';

    type BorderType = 'solid' | 'dashed' | 'dotted';

    interface DividerProps {
        align?: AlignType;
        layout?: LayoutType;
        type?: BorderType;
        style?: object;
        className?: string;
    }
}

export declare class Divider extends React.Component<Divider.DividerProps, any> { }
