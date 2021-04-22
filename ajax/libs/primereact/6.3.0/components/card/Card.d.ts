import * as React from 'react';

declare namespace Card {

    type TemplateTypes = React.ReactNode | ((props: CardProps) => React.ReactNode);

    interface CardProps {
        id?: string;
        header?: TemplateTypes;
        footer?: TemplateTypes;
        title?: TemplateTypes;
        subTitle?: TemplateTypes;
        style?: object;
        className?: string;
    }
}

export declare class Card extends React.Component<Card.CardProps, any> { }
