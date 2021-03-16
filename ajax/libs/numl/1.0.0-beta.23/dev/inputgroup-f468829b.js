import { B as Behavior } from './index-903a7eb6.js';

class InputGroupBehavior extends Behavior {
  init() {
    this.on('focusin', () => {
      this.setMod('focus', true);
    });
    this.on('focusout', () => {
      this.setMod('focus', false);
    });
    this.on('click', () => {
      const input = this.host.querySelector('input');

      if (input) {
        input.focus();
      }
    }, { passive: true });
  }

  connected() {
    this.setContext('inputgroup', this);
  }
}

export default InputGroupBehavior;
