import OPTIONS from './options';
export default function () {
    this.opts.theme = this.opts.theme || OPTIONS;
    this.bind('initMenu:after', () => {
        this.node.menu.classList.add(`mm-menu--theme-${this.opts.theme}`);
    });
}
