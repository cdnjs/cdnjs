import { B as Behavior } from './index-e74c1c40.js';

class MenuItemBehavior extends Behavior {
  static get params() {
    return {
      provideValue: false,
    };
  }

  init() {
    this.host.nuMenuItem = this;

    this.on(['click', 'tap'], () => {
      if (this.menu) {
        this.menu.setCurrent(this);

        if (!this.hasPopup) {
          this.doAction('close', true);
        }
      }
    });
  }

  connected() {
    this.linkContext('menu', (menu) => {
      if (this.menu) {
        this.menu.removeItem(this);
      }

      this.menu = menu;

      if (menu) {
        menu.addItem(this);
      }
    }, false);
  }
}

export default MenuItemBehavior;
