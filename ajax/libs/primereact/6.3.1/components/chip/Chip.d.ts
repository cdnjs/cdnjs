import * as React from 'react';

declare module 'primereact/chip' {

    type TemplateType = React.ReactNode | ((props: ChipProps) => React.ReactNode);

    export interface ChipProps {
        label?: string;
        icon?: string;
        image?: string;
        removable?: boolean;
        removeIcon?: string;
        className?: string;
        style?: object;
        template?: TemplateType;
        imageAlt?: string;
        onImageError?(event: React.SyntheticEvent): void;
        onRemove?(event: React.MouseEvent<HTMLElement>): void;
    }

    export class Chip extends React.Component<ChipProps, any> { }
}
