import * as React from 'react';

export interface CaptchaProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    siteKey?: string;
    theme?: string;
    type?: string;
    size?: string;
    language?: string;
    onResponse?(response: any): void;
    onExpire?(): void;
    children?: React.ReactNode;
}

export declare class Captcha extends React.Component<CaptchaProps, any> {
    public reset(): void;
    public getResponse(): any;
    public getElement(): HTMLDivElement;
}
