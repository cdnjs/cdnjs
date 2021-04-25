import * as React from 'react';

declare module 'primereact/galleria' {

    type PositionType = 'top' | 'bottom' | 'left' | 'right';

    interface ResponsiveOptions {
        breakpoint: string;
        numVisible: number;
    }

    interface ItemChangeParams {
        index: number;
    }

    export interface GalleriaProps {
        id?: string;
        value?: any[];
        activeIndex?: number;
        fullScreen?: boolean;
        item?(item: any): React.ReactNode;
        thumbnail?(item: any): React.ReactNode;
        indicator?(index: number): React.ReactNode;
        className?: string;
        style?: object;
        header?: React.ReactNode;
        footer?: React.ReactNode;
        numVisible?: number;
        responsiveOptions?: ResponsiveOptions[];
        showItemNavigators?: boolean;
        showThumbnailNavigators?: boolean;
        showItemNavigatorsOnHover?: boolean;
        changeItemOnIndicatorHover?: boolean;
        circular?: boolean;
        autoPlay?: boolean;
        transitionInterval?: number;
        caption?(item: any): React.ReactNode;
        showThumbnails?: boolean;
        thumbnailsPosition?: PositionType;
        showIndicators?: boolean;
        showIndicatorsOnItem?: boolean;
        indicatorsPosition?: PositionType;
        baseZIndex?: number;
        transitionOptions?: object;
        onItemChange?(e: ItemChangeParams): void;
        onShow?(): void;
        onHide?(): void;
    }

    export class Galleria extends React.Component<GalleriaProps, any> {
        public show(): void;
        public hide(): void;
        public isAutoPlayActive(): boolean;
        public startSlideShow(): void;
        public stopSlideShow(): void;
    }
}
