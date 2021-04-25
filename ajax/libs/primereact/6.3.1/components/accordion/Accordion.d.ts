import * as React from 'react';

declare module 'primereact/accordion' {

    type HeaderTemplateType = React.ReactNode | ((props: AccordionTabProps) => React.ReactNode);

    export interface AccordionTabProps {
        header?: React.ReactNode;
        disabled?: boolean;
        headerStyle?: object;
        headerClassName?: string;
        headerTemplate?: HeaderTemplateType;
        contentStyle?: object;
        contentClassName?: string;
    }

    export class AccordionTab extends React.Component<AccordionTabProps, any> { }

    type ActiveIndexType = number | number[] | undefined | null;

    interface EventParams {
        originalEvent: React.MouseEvent<HTMLElement>;
        index: number;
    }

    export interface AccordionProps {
        id?: string;
        activeIndex?: ActiveIndexType;
        className?: string;
        style?: object;
        multiple?: boolean;
        expandIcon?: string;
        collapseIcon?: string;
        transitionOptions?: object;
        onTabOpen?(e: EventParams): void;
        onTabClose?(e: EventParams): void;
        onTabChange?(e: EventParams): void;
    }

    // tslint:disable-next-line:max-classes-per-file
    export class Accordion extends React.Component<AccordionProps, any> { }
}
