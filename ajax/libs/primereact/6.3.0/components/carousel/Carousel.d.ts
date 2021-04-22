import * as React from 'react';

declare namespace Carousel {

    type OrientationType = 'vertical' | 'horizontal';

    interface ResponsiveOptions {
        breakpoint: string;
        numVisible: number;
        numScroll: number;
    }

    interface PageChangeParams {
        page: number;
    }

    interface CarouselProps {
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
        responsiveOptions?: ResponsiveOptions[];
        orientation?: OrientationType;
        verticalViewPortHeight?: string;
        contentClassName?: string;
        containerClassName?: string;
        indicatorsContentClassName?: string;
        onPageChange?(e: PageChangeParams): void;
    }
}

export declare class Carousel extends React.Component<Carousel.CarouselProps, any> { }
