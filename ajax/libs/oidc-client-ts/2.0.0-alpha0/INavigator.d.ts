import { IWindow } from './IWindow';
export interface INavigator {
    prepare(params: any): Promise<IWindow>;
}
