import * as React from 'react';

type AvatarSizeType = 'normal' | 'large' | 'xlarge';

type AvatarShapeType = 'square' | 'circle';

type AvatarTemplateType = React.ReactNode | ((props: AvatarProps) => React.ReactNode);

export interface AvatarProps {
    label?: string;
    icon?: string;
    image?: string;
    size?: AvatarSizeType;
    shape?: AvatarShapeType;
    style?: object;
    className?: string;
    template?: AvatarTemplateType;
    imageAlt?: string;
    onImageError?(event: React.SyntheticEvent): void;
    onClick?(event: React.MouseEvent<HTMLElement>): void;
}

export declare class Avatar extends React.Component<AvatarProps, any> { }
