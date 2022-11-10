import * as React from 'react';

export interface ImageProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'ref'> {
    alt?: string;
    children?: React.ReactNode;
    downloadable?: boolean;
    height?: string;
    imageClassName?: string;
    imageStyle?: string;
    preview?: boolean;
    src?: string;
    template?: any;
    width?: string;
    zoomSrc?: string;
    onHide?(): void;
    onShow?(): void;
}

export declare class Image extends React.Component<ImageProps, any> {
    public show(): void;
    public hide(): void;
    public getElement(): HTMLSpanElement;
    public getImage(): HTMLImageElement;
}
