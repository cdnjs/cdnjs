import { CordovaPopupWindow } from './CordovaPopupWindow';
import { INavigator } from './INavigator';
export declare class CordovaPopupNavigator implements INavigator {
    prepare(params: any): Promise<CordovaPopupWindow>;
}
