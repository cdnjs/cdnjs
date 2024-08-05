import { CONSTANTS } from '../conf';
import { messageListener } from '../drivers';

export { CONFIG, CONSTANTS } from '../conf';

export function disable() {
    delete window[CONSTANTS.WINDOW_PROPS.POSTROBOT];
    window.removeEventListener('message', messageListener);
}