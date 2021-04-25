import * as React from 'react';

declare module 'primereact/divider' {

    type AlignType = 'center' | 'left' | 'right' | 'bottom' | 'top';

    type LayoutType = 'vertical' | 'horizontal';

    type BorderType = 'solid' | 'dashed' | 'dotted';

    export interface DividerProps {
        align?: AlignType;
        layout?: LayoutType;
        type?: BorderType;
        style?: object;
        className?: string;
    }

    export class Divider extends React.Component<DividerProps, any> { }
}
