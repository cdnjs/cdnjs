import * as React from 'react';

interface SkeletonProps {
    shape?: string;
    size?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    animation?: string;
    style?: object;
    className?: string;
}

export class Skeleton extends React.Component<SkeletonProps,any> {}
