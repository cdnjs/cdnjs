import * as React from 'react';

declare module 'primereact/card' {

    type TemplateTypes = React.ReactNode | ((props: CardProps) => React.ReactNode);

    export interface CardProps {
        id?: string;
        header?: TemplateTypes;
        footer?: TemplateTypes;
        title?: TemplateTypes;
        subTitle?: TemplateTypes;
        style?: object;
        className?: string;
    }

    export class Card extends React.Component<CardProps, any> { }
}
