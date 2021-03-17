import * as React from 'react';

interface AvatarProps {
    label?: string;
    icon?: string;
    image?: string;
    size?: string;
    shape?: string;
    style?: object;
    className?: string;
    template?: any;
    imageAlt?: string;
    onImageError?(event: Event): void;
    onClick?(event: Event): void;
}

export class Avatar extends React.Component<AvatarProps,any> {}
