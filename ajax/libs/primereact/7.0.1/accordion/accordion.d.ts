import * as React from 'react';
import {IconType} from "../utils/Utils";

type AccordionTabHeaderTemplateType = React.ReactNode | ((props: AccordionTabProps) => React.ReactNode);

interface AccordionTabProps {
    header?: React.ReactNode;
    disabled?: boolean;
    headerStyle?: object;
    headerClassName?: string;
    headerTemplate?: AccordionTabHeaderTemplateType;
    contentStyle?: object;
    contentClassName?: string;
}

export declare class AccordionTab extends React.Component<AccordionTabProps, any> { }

type AccordionActiveIndexType = number | number[] | undefined | null;

interface AccordionEventParams {
    originalEvent: React.MouseEvent<HTMLElement>;
    index: number;
}

export interface AccordionProps {
    id?: string;
    activeIndex?: AccordionActiveIndexType;
    className?: string;
    style?: object;
    multiple?: boolean;
    expandIcon?: IconType<AccordionProps>;
    collapseIcon?: IconType<AccordionProps>;
    transitionOptions?: object;
    onTabOpen?(e: AccordionEventParams): void;
    onTabClose?(e: AccordionEventParams): void;
    onTabChange?(e: AccordionEventParams): void;
}

// tslint:disable-next-line:max-classes-per-file
export declare class Accordion extends React.Component<AccordionProps, any> { }
