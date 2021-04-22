import * as React from 'react';

declare namespace Skeleton {

    type ShapeType = 'rectangle' | 'circle';

    type AnimationType = 'wave' | 'none';

    interface SkeletonProps {
        shape?: ShapeType;
        size?: string;
        width?: string;
        height?: string;
        borderRadius?: string;
        animation?: AnimationType;
        style?: object;
        className?: string;
    }
}

export declare class Skeleton extends React.Component<Skeleton.SkeletonProps, any> { }
