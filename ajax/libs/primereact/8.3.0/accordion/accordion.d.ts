import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { IconType } from '../utils';

type AccordionTabHeaderTemplateType = React.ReactNode | ((props: AccordionTabProps) => React.ReactNode);

interface AccordionTabProps {
    header?: React.ReactNode;
    disabled?: boolean;
    style?: object;
    className?: string;
    headerStyle?: object;
    headerClassName?: string;
    headerTemplate?: AccordionTabHeaderTemplateType;
    contentStyle?: object;
    contentClassName?: string;
    children?: React.ReactNode;
}

export declare class AccordionTab extends React.Component<AccordionTabProps, any> { }

type AccordionActiveIndexType = number | number[] | undefined | null;

interface AccordionEventParams {
    originalEvent: React.MouseEvent<HTMLElement>;
    index: number;
}

export interface AccordionProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    activeIndex?: AccordionActiveIndexType;
    multiple?: boolean;
    expandIcon?: IconType<AccordionProps>;
    collapseIcon?: IconType<AccordionProps>;
    transitionOptions?: CSSTransitionProps;
    onTabOpen?(e: AccordionEventParams): void;
    onTabClose?(e: AccordionEventParams): void;
    onTabChange?(e: AccordionEventParams): void;
    children?: React.ReactNode;
}

// tslint:disable-next-line:max-classes-per-file
export declare class Accordion extends React.Component<AccordionProps, any> { 
    public getElement(): HTMLDivElement;
}
