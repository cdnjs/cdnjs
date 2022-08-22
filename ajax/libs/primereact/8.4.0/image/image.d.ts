import * as React from 'react';

export interface ImageProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'ref'> {
    preview?: boolean;
    downloadable?: boolean;
    imageStyle?: string;
    imageClassName?: string;
    template?: any;
    src?: string;
    alt?: string;
    width?: string;
    height?: string;
    onShow?(): void;
    onHide?(): void;
    children?: React.ReactNode;
}

export declare class Image extends React.Component<ImageProps, any> { 
    public getElement(): HTMLSpanElement;
    public getImage(): HTMLImageElement;
}
