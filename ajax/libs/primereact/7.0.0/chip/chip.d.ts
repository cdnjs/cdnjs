import * as React from 'react';
import {IconType, TemplateType} from "../utils/Utils";

export interface ChipProps {
    label?: string;
    icon?: IconType<ChipProps>;
    image?: string;
    removable?: boolean;
    removeIcon?: string;
    className?: string;
    style?: object;
    template?: TemplateType<ChipProps>;
    imageAlt?: string;
    onImageError?(event: React.SyntheticEvent): void;
    onRemove?(event: React.MouseEvent<HTMLElement>): void;
}

export declare class Chip extends React.Component<ChipProps, any> { }
