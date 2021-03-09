import * as React from 'react';

interface AccordionTabProps {
    header?: any;
    disabled?: boolean;
    headerStyle?: object;
    headerClassName?: string;
    headerTemplate?: any;
    contentStyle?: object;
    contentClassName?: string;
}

export class AccordionTab extends React.Component<AccordionTabProps,any> {}

interface AccordionProps {
    id?: string;
    activeIndex?: any;
    className?: string;
    style?: object;
    multiple?: boolean;
    expandIcon?: string;
    collapseIcon?: string;
    onTabOpen?(e: {originalEvent: Event, index: number}): void;
    onTabClose?(e: {originalEvent: Event, index: number}): void;
    onTabChange?(e: {originalEvent: Event, index: number}): void;
}

// tslint:disable-next-line:max-classes-per-file
export class Accordion extends React.Component<AccordionProps,any> {}

