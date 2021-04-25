import * as React from 'react';

declare module 'primereact/carousel' {

    type OrientationType = 'vertical' | 'horizontal';

    interface ResponsiveOptions {
        breakpoint: string;
        numVisible: number;
        numScroll: number;
    }

    interface PageChangeParams {
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
        responsiveOptions?: ResponsiveOptions[];
        orientation?: OrientationType;
        verticalViewPortHeight?: string;
        contentClassName?: string;
        containerClassName?: string;
        indicatorsContentClassName?: string;
        onPageChange?(e: PageChangeParams): void;
    }

    export class Carousel extends React.Component<CarouselProps, any> { }
}
