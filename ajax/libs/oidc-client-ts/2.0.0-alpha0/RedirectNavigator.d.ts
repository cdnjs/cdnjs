import { INavigator } from './INavigator';
import { IWindow } from './IWindow';
export declare class RedirectNavigator implements INavigator, IWindow {
    prepare(_params: any): Promise<this>;
    navigate(params: any): Promise<void>;
    get url(): string;
    close(): void;
}
