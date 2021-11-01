import * as React from 'react';

type CardTemplateTypes = React.ReactNode | ((props: CardProps) => React.ReactNode);

export interface CardProps {
    id?: string;
    header?: CardTemplateTypes;
    footer?: CardTemplateTypes;
    title?: CardTemplateTypes;
    subTitle?: CardTemplateTypes;
    style?: object;
    className?: string;
}

export declare class Card extends React.Component<CardProps, any> { }
