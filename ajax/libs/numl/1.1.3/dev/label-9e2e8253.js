import { B as Behavior, k as generateId, m as query, q as queryById, n as removeInnerRef, o as setInnerRef, p as setAriaRef } from './index-e74c1c40.js';

class LabelBehavior extends Behavior {
  init() {
    const { host } = this;

    host.addEventListener('click', () => {
      const element = this.link();

      if (element) {
        element.focus();
        element.click();
      }
    });
  }

  connected() {
    this.link();
  }

  changed(name) {
    if (name === 'for' && this.isConnected) {
      this.link();
    }
  }

  link() {
    const { host } = this;
    const id = host.getAttribute('for');
    let el;

    if (!this.id) {
      generateId(host);
    }

    if (!id) {
      el = query(host, '[is-input]');
    } else {
      el = queryById(host, id);
    }

    el = el && el.nuRef || el;

    if (this.linkedEl === el) return el;

    if (this.linkedEl) {
      removeInnerRef(el, 'labelledby');
    }

    this.linkedEl = el;

    if (el) {
      setInnerRef(el, 'labelledby', host.id);
      setAriaRef(el, 'labelledby');
    }

    return el;
  }
}

export default LabelBehavior;
