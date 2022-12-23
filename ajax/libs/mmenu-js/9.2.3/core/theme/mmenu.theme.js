import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import OPTIONS from './options';
/** A list of available themes. */
const possibleThemes = [
    'light',
    'dark',
    'white',
    'black',
    'light-contrast',
    'dark-contrast',
    'white-contrast',
    'black-contrast'
];
export default function () {
    this.opts.theme = this.opts.theme || OPTIONS;
    const theme = this.opts.theme;
    if (!possibleThemes.includes(theme)) {
        this.opts.theme = possibleThemes[0];
    }
    this._api.push('theme');
    this.bind('initMenu:after', () => {
        this.theme(this.opts.theme);
    });
}
/**
 * Get or set the theme for the menu.
 *
 * @param {string} [position] The theme for the menu.
 */
Mmenu.prototype.theme = function (theme = null) {
    /** The previously used theme */
    const oldTheme = this.opts.theme;
    if (theme) {
        if (possibleThemes.includes(theme)) {
            this.node.menu.classList.remove(`mm-menu--theme-${oldTheme}`);
            this.node.menu.classList.add(`mm-menu--theme-${theme}`);
            this.opts.theme = theme;
        }
    }
    else {
        return oldTheme;
    }
};
