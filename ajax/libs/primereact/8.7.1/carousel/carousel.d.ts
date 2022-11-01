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

export interface CarouselProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    value?: any[];
    page?: number;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    itemTemplate?(item: any): React.ReactNode;
    circular?: boolean;
    showNavigators?: boolean;
    showIndicators?: boolean;
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
    children?: React.ReactNode;
}

export declare class Carousel extends React.Component<CarouselProps, any> {
    public getElement(): HTMLDivElement;
}
