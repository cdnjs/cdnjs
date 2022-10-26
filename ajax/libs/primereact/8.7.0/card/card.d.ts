import * as React from 'react';

type CardTemplateTypes = React.ReactNode | ((props: CardProps) => React.ReactNode);

export interface CardProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'title'> {
    header?: CardTemplateTypes;
    footer?: CardTemplateTypes;
    title?: CardTemplateTypes;
    subTitle?: CardTemplateTypes;
    children?: React.ReactNode;
}

export declare class Card extends React.Component<CardProps, any> {}
