import * as React from 'react';

interface CaptchaProps {
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

export class Captcha extends React.Component<CaptchaProps,any> {}