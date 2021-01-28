import * as React from 'react';

interface GalleriaProps {
    id?: string;
    value?: any[];
    activeIndex?: number;
    fullScreen?: boolean;
    item?: any;
    thumbnail?: any;
    indicator?: any;
    className?: string;
    style?: object;
    header?: any;
    footer?: any;
    numVisible?: number;
    responsiveOptions?: any;
    showItemNavigators?: boolean;
    showThumbnailNavigators?: boolean;
    showItemNavigatorsOnHover?: boolean;
    changeItemOnIndicatorHover?: boolean;
    circular?: boolean;
    autoPlay?: boolean;
    transitionInterval?: number;
    caption?: any;
    showThumbnails?: boolean;
    thumbnailsPosition?: string;
    showIndicators?: boolean;
    showIndicatorsOnItem?: boolean;
    indicatorsPosition?: string;
    baseZIndex?: number;
    onItemChange?(e: {index: number}): void;
}

export class Galleria extends React.Component<GalleriaProps,any> {
    public show():void;
    public hide():void;
    public isAutoPlayActive():boolean;
    public startSlideShow():void;
    public stopSlideShow():void;
}
