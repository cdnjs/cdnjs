import * as React from 'react';

export interface CaptchaProps {
    id?: string;
    siteKey?: string;
    theme?: string;
    type?: string;
    size?: string;
    tabIndex?: number;
    language?: string;
    onResponse?(response: any): void;
    onExpire?(): void;
}

export declare class Captcha extends React.Component<CaptchaProps, any> {
    public reset(): void;
    public getResponse(): any;
}
