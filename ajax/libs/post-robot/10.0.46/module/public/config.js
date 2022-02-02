import { WINDOW_PROP } from '../conf';
import { messageListener } from '../drivers';

export { CONFIG } from '../conf';

export function disable() {
    delete window[WINDOW_PROP.POSTROBOT];
    window.removeEventListener('message', messageListener);
}