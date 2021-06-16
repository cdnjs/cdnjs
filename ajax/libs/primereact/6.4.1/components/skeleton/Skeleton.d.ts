import * as React from 'react';

type SkeletonShapeType = 'rectangle' | 'circle';

type SkeletonAnimationType = 'wave' | 'none';

export interface SkeletonProps {
    shape?: SkeletonShapeType;
    size?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    animation?: SkeletonAnimationType;
    style?: object;
    className?: string;
}

export declare class Skeleton extends React.Component<SkeletonProps, any> { }
