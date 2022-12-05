import * as React from 'react';
import { IconType } from '../utils';

type AvatarSizeType = 'normal' | 'large' | 'xlarge';

type AvatarShapeType = 'square' | 'circle';

type AvatarTemplateType = React.ReactNode | ((props: AvatarProps) => React.ReactNode);

export interface AvatarProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    children?: React.ReactNode;
    icon?: IconType<AvatarProps>;
    image?: string;
    imageAlt?: string;
    imageFallback?: string;
    label?: string;
    shape?: AvatarShapeType;
    size?: AvatarSizeType;
    template?: AvatarTemplateType;
    onImageError?(event: React.SyntheticEvent): void;
    onClick?(event: React.MouseEvent<HTMLElement>): void;
}

export declare class Avatar extends React.Component<AvatarProps, any> {
    public getElement(): HTMLDivElement;
}
