import { CordovaPopupWindow } from './CordovaPopupWindow';
import { INavigator } from './INavigator';
export declare class CordovaIFrameNavigator implements INavigator {
    prepare(params: any): Promise<CordovaPopupWindow>;
}
