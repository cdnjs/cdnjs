import { PlayerComponent, SettingsItem, SettingsSubItem } from '../interfaces';
import Player from '../player';
declare class Settings implements PlayerComponent {
    #private;
    private clickEvent;
    private hideEvent;
    private removeEvent;
    constructor(player: Player, position: string, layer: string);
    create(): void;
    destroy(): void;
    addSettings(): SettingsItem;
    addItem(name: string, key: string, defaultValue: string, submenu?: SettingsSubItem[], className?: string): void;
    removeItem(id: string | number, type: string, minItems?: number): void;
    private _enterSpaceKeyEvent;
}
export default Settings;
