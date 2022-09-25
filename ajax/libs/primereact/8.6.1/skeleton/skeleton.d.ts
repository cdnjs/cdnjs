import * as React from 'react';

type SkeletonShapeType = 'rectangle' | 'circle';

type SkeletonAnimationType = 'wave' | 'none';

export interface SkeletonProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    shape?: SkeletonShapeType;
    size?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    animation?: SkeletonAnimationType;
    children?: React.ReactNode;
}

export declare class Skeleton extends React.Component<SkeletonProps, any> {
    public getElement(): HTMLDivElement;
}
