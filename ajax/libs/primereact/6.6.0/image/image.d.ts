import * as React from 'react';

export interface ImageProps {
    preview?: false;
    className?: string;
    style?: string;
    imageStyle?: string;
    imageClassName?: string;
    template?: any;
    src?: sting;
    alt?: sting;
    width?: sting;
    height?: sting;
    onShow?(): void;
    onHide?(): void;
}

export declare class Image extends React.Component<ImageProps, any> { }
