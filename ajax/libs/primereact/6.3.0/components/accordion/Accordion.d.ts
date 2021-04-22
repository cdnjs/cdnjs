import * as React from 'react';

declare namespace AccordionTab {

    type HeaderTemplateType = React.ReactNode | ((props: AccordionTabProps) => React.ReactNode);

    interface AccordionTabProps {
        header?: React.ReactNode;
        disabled?: boolean;
        headerStyle?: object;
        headerClassName?: string;
        headerTemplate?: HeaderTemplateType;
        contentStyle?: object;
        contentClassName?: string;
    }
}

export declare class AccordionTab extends React.Component<AccordionTab.AccordionTabProps, any> { }

declare namespace Accordion {

    type ActiveIndexType = number | number[] | undefined | null;

    interface EventParams {
        originalEvent: React.MouseEvent<HTMLElement>;
        index: number;
    }

    interface AccordionProps {
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
}

// tslint:disable-next-line:max-classes-per-file
export declare class Accordion extends React.Component<Accordion.AccordionProps, any> { }

