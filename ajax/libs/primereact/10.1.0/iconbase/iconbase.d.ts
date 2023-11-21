import * as React from 'react';

export interface IconBaseProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
    className?: string | undefined;
    label?: string | undefined;
    spin?: boolean | undefined;
}

export declare class IconBase {}
