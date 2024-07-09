// @ts-ignore
import _Vue, { App } from 'vue';
import './vue';

export declare function install(Vue: typeof _Vue | App, options?: CookiesConfig): void;

export interface VueCookies {
  /**
   * Set global config
   */
  config(expires: string | number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: string, partitioned?: boolean): void;

  /**
   * Set a cookie
   */
  set(keyName: string, value: any, expires?: string | number | Date,
    path?: string, domain?: string, secure?: boolean, sameSite?: string): this;

  /**
   * Get a cookie
   */
  get(keyName: string): any;

  /**
   * Remove a cookie
   */
  remove(keyName: string, path?: string, domain?: string): boolean;

  /**
   * Exist a cookie name
   */
  isKey(keyName: string): boolean;

  /**
   * Get All cookie name
   */
  keys(): string[];
}

interface CookiesConfig {
  expires: string | number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: string;
  partitioned?: boolean;
}

declare const _default : {
  VueCookies: VueCookies;
  install: typeof install;
};

export default _default;
