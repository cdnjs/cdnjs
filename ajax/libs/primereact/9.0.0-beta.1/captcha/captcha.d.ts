/**
 *
 * Captcha is a form validation component based on Recaptcha.
 *
 * [Live Demo](https://www.primefaces.org/primereact/captcha)
 *
 * @module captcha
 *
 */
import * as React from 'react';

/**
 * Defines valid properties in Captcha component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface CaptchaProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Language of the widget.
     * @defaultValue en
     */
    language?: string | undefined;
    /**
     * The callback function to be executed when the recaptcha response expires and the user needs to solve a new CAPTCHA.
     */
    onExpire?(): void;
    /**
     * The callback function to be executed when the user submits a successful CAPTCHA response.
     * @param {*} response - Current response
     */
    onResponse?(response: any): void;
    /**
     * Public sitekey.
     */
    siteKey?: string | undefined;
    /**
     * The size of the widget.
     * @defaultValue normal
     */
    size?: string | undefined;
    /**
     * Source URL of the Captcha as some countries do not allow Google access.
     * @defaultValue https://www.google.com/recaptcha/api.js?render=explicit
     *
     */
    sourceUrl?: string | undefined;
    /**
     * The color scheme of the widget.
     * @defaultValue light
     */
    theme?: string | undefined;
    /**
     * The type of CAPTCHA to serve.
     * @defaultValue image
     */
    type?: string | undefined;
}

/**
 * **PrimeReact - Captcha**
 *
 * _Captcha is a form validation component based on Recaptcha._
 *
 * [Live Demo](https://www.primefaces.org/primereact/captcha/)
 * --- ---
 * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Captcha extends React.Component<CaptchaProps, any> {
    /**
     * Resets the reCAPTCHA widget.
     */
    public reset(): void;
    /**
     * Gets the response for the reCAPTCHA widget.
     */
    public getResponse(): any;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
