import * as React from 'react';

declare module 'primereact/skeleton' {

    type ShapeType = 'rectangle' | 'circle';

    type AnimationType = 'wave' | 'none';

    export interface SkeletonProps {
        shape?: ShapeType;
        size?: string;
        width?: string;
        height?: string;
        borderRadius?: string;
        animation?: AnimationType;
        style?: object;
        className?: string;
    }

    export class Skeleton extends React.Component<SkeletonProps, any> { }
}
