import { W as WidgetBehavior, d as deepQueryAll, s as setAttr, b as BOOL_TYPE } from './index-e74c1c40.js';
import MenuBehavior from './menu-83d2a849.js';

const Menu = MenuBehavior.prototype;

class RadioGroupBehavior extends WidgetBehavior {
  static get params() {
    return {
      input: true,
      provideValue: true,
      itemRole: 'radio',
      contextValue: true,
    };
  }

  init() {
    this.props.disabled = (val) => {
      const { host } = this;
      const value = BOOL_TYPE(val);

      const actionEls = deepQueryAll(host, '[nu-action]');

      actionEls.forEach(el => {
        setAttr(el, 'disabled', value);
      });

      return value;
    };

    super.init();

    this._items = [];

    this.setContext('radiogroup', this);
    this.setMod('radiogroup', true);

    this.on('keydown', this.onKeyDown.bind(this));
  }

  addItem(item) {
    Menu.addItem.call(this, item);
  }

  removeItem(item) {
    Menu.removeItem.call(this, item);
  }

  setCurrent(item) {
    Menu.setCurrent.call(this, item);
  }

  getItemsInOrder() {
    return Menu.getItemsInOrder.call(this, '[nu-action]', 'NuAction');
  }

  onKeyDown(event) {
    Menu.onKeyDown.call(this, event);
  }
}

export default RadioGroupBehavior;
