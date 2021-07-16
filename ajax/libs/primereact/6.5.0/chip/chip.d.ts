import * as React from 'react';

type ChipTemplateType = React.ReactNode | ((props: ChipProps) => React.ReactNode);

export interface ChipProps {
    label?: string;
    icon?: string;
    image?: string;
    removable?: boolean;
    removeIcon?: string;
    className?: string;
    style?: object;
    template?: ChipTemplateType;
    imageAlt?: string;
    onImageError?(event: React.SyntheticEvent): void;
    onRemove?(event: React.MouseEvent<HTMLElement>): void;
}

export declare class Chip extends React.Component<ChipProps, any> { }
