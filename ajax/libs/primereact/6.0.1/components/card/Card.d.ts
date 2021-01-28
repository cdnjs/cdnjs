import * as React from 'react';

interface CardProps {
    id?: string;
    header?: any;
    footer?: any;
    title?: any;
    subTitle?: any;
    style?: object;
    className?: string;
}

export class Card extends React.Component<CardProps,any> {}
