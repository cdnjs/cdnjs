import * as React from 'react';

type GalleriaPositionType = 'top' | 'bottom' | 'left' | 'right';

interface GalleriaResponsiveOptions {
    breakpoint: string;
    numVisible: number;
}

interface GalleriaItemChangeParams {
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
    responsiveOptions?: GalleriaResponsiveOptions[];
    showItemNavigators?: boolean;
    showThumbnailNavigators?: boolean;
    showItemNavigatorsOnHover?: boolean;
    changeItemOnIndicatorHover?: boolean;
    circular?: boolean;
    autoPlay?: boolean;
    transitionInterval?: number;
    caption?(item: any): React.ReactNode;
    showThumbnails?: boolean;
    thumbnailsPosition?: GalleriaPositionType;
    showIndicators?: boolean;
    showIndicatorsOnItem?: boolean;
    indicatorsPosition?: GalleriaPositionType;
    baseZIndex?: number;
    transitionOptions?: object;
    onItemChange?(e: GalleriaItemChangeParams): void;
    onShow?(): void;
    onHide?(): void;
}

export declare class Galleria extends React.Component<GalleriaProps, any> {
    public show(): void;
    public hide(): void;
    public isAutoPlayActive(): boolean;
    public startSlideShow(): void;
    public stopSlideShow(): void;
}
