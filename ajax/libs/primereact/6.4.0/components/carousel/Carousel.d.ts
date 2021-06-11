import * as React from 'react';

type CarouselOrientationType = 'vertical' | 'horizontal';

interface CarouselResponsiveOptions {
    breakpoint: string;
    numVisible: number;
    numScroll: number;
}

interface CarouselPageChangeParams {
    page: number;
}

export interface CarouselProps {
    id?: string;
    value?: any[];
    page?: number;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    style?: object;
    className?: string;
    itemTemplate?(item: any): React.ReactNode;
    circular?: boolean;
    autoplayInterval?: number;
    numVisible?: number;
    numScroll?: number;
    responsiveOptions?: CarouselResponsiveOptions[];
    orientation?: CarouselOrientationType;
    verticalViewPortHeight?: string;
    contentClassName?: string;
    containerClassName?: string;
    indicatorsContentClassName?: string;
    onPageChange?(e: CarouselPageChangeParams): void;
}

export declare class Carousel extends React.Component<CarouselProps, any> { }
