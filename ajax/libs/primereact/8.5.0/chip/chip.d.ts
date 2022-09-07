import * as React from 'react';
import { IconType, TemplateType } from '../utils';

export interface ChipProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    label?: string;
    icon?: IconType<ChipProps>;
    image?: string;
    removable?: boolean;
    removeIcon?: string;
    template?: TemplateType<ChipProps>;
    imageAlt?: string;
    onImageError?(event: React.SyntheticEvent): void;
    onRemove?(event: React.MouseEvent<HTMLElement>): void;
    children?: React.ReactNode;
}

export declare class Chip extends React.Component<ChipProps, any> {
    public getElement(): HTMLDivElement;
}
