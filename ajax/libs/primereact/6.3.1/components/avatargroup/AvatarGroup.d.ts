import * as React from 'react';

declare module 'primereact/avatargroup' {
    export interface AvatarGroupProps {
        style?: object;
        className?: string;
    }

    export class AvatarGroup extends React.Component<AvatarGroupProps, any> { }
}
