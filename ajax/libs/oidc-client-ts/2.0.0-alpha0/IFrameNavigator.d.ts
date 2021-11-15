import { IFrameWindow } from './IFrameWindow';
import { INavigator } from './INavigator';
export declare class IFrameNavigator implements INavigator {
    prepare(params: any): Promise<IFrameWindow>;
    callback(url: string): Promise<void>;
}
