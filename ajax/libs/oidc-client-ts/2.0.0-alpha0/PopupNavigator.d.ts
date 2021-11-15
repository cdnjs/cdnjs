import { PopupWindow } from './PopupWindow';
import { INavigator } from './INavigator';
export declare class PopupNavigator implements INavigator {
    prepare(params: any): Promise<PopupWindow>;
    callback(url: string, keepOpen: boolean, delimiter: string): Promise<void>;
}
