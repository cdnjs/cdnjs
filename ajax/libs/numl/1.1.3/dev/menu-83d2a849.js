import { B as Behavior, d as deepQueryAll } from './index-e74c1c40.js';

class MenuBehavior extends Behavior {
  init() {
    this._items = [];
    this.setContext('menu', this, true);

    this.on('keydown', this.onKeyDown.bind(this));
  }

  addItem(item) {
    const items = this._items;

    if (!items.includes(item)) {
      items.push(item);

      if (items.length === 1) {
        this.setCurrent(item);
      } else {
        item.use('focus')
          .then(Focusable => Focusable.set('manual'));
      }
    }
  }

  removeItem(item) {
    const items = this._items;

    if (items.includes(item)) {
      items.splice(items.indexOf(item), 1);
      this.setCurrent(items[0]);
    }
  }

  setCurrent(item) {
    const currentItem = this.currentItem;

    if (item === currentItem) return;

    const isCurrentFocused = currentItem ? currentItem.host === document.activeElement : false;

    if (currentItem) {
      currentItem.host.blur();
    }

    if (item) {
      this.currentItem = item;
      this._items.map(it => {
        const isCurrent = it === item;
        const type = isCurrent ? 'auto' : 'manual';

        it.use('focus')
          .then(Focusable => {
            Focusable.set(type);

            if (isCurrent && isCurrentFocused) {
              it.host.focus();
              Focusable.setEffect(true);

              const Act = it.host.NuAction;

              if (Act && Act.isRadio()) {
                Act.set(true);
              }
            }
          });
      });
    } else {
      this.currentItem = null;
    }
  }

  getItemsInOrder(selector, prop) {
    const elements = deepQueryAll(this.host, selector || '[nu-menuitem]');
    return (elements || [])
      .map(element => element[prop || 'nuMenuItem'])
      .filter(item => this._items.includes(item));
  }

  onKeyDown(event) {
    if (this.disabled) return;

    const items = this.getItemsInOrder();

    const index = items.indexOf(this.currentItem);

    switch(event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        if (index < items.length - 1) {
          this.setCurrent(items[index + 1]);
        }
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        if (index > 0) {
          this.setCurrent(items[index - 1]);
        }
        break;
      case 'Home':
        this.setCurrent(items[0]);
        break;
      case 'End':
        this.setCurrent(items[items.length - 1]);
        break;
      default:
        return;
    }

    event.stopPropagation();
    event.preventDefault();
  }
}

export default MenuBehavior;
