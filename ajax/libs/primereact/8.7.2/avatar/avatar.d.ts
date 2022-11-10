import * as React from 'react';
import { IconType } from '../utils';

type AvatarSizeType = 'normal' | 'large' | 'xlarge';

type AvatarShapeType = 'square' | 'circle';

type AvatarTemplateType = React.ReactNode | ((props: AvatarProps) => React.ReactNode);

export interface AvatarProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    label?: string;
    icon?: IconType<AvatarProps>;
    image?: string;
    size?: AvatarSizeType;
    shape?: AvatarShapeType;
    template?: AvatarTemplateType;
    imageAlt?: string;
    onImageError?(event: React.SyntheticEvent): void;
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    children?: React.ReactNode;
}

export declare class Avatar extends React.Component<AvatarProps, any> {
    public getElement(): HTMLDivElement;
}
