/* *
 *
 *  (c) 2009 - 2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
const MenuItemBindings = {
    /* *
    *
    *  Context menu
    *
    * */
    viewFullscreen: {
        id: 'viewFullscreen',
        type: 'button',
        langKey: 'viewFullscreen',
        events: {
            click: function (e) {
                const fullScreen = this.menu.editMode.board.fullscreen;
                if (fullScreen) {
                    fullScreen.toggle();
                }
            }
        }
    }
};
export default MenuItemBindings;
