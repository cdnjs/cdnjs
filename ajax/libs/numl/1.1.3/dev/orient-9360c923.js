import { B as Behavior } from './index-e74c1c40.js';

const ORIENT_ATTR = 'orient';
const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal';

class OrientBehavior extends Behavior {
  constructor(host, value = '') {
    super(host);

    const mods = value.split(/\s+/g);

    this.aria = !mods.includes('no-aria');
    this.dynamic = mods.includes('dynamic');

    this.orient = mods.includes('v') ? 'v' : 'h';

    if (this.dynamic) {
      host.addEventListener('focusin', () => {
        const styles = getComputedStyle(host);

        this.set(styles.flexFlow.includes('column')
          || styles.getPropertyValue('--orient') === 'v' ? 'v' : 'h');
      }, { passive: true });
    }
  }

  set(val) {
    const { host } = this;

    if (val == null) {
      const attrValue = host.nuGetAttr(ORIENT_ATTR, true);
      val = attrValue != null ? attrValue : 'h';
    }

    const orientation = val === 'v' ? VERTICAL : HORIZONTAL;

    host.nuSetAria('orientation', orientation);
    host.nuSetContext('orientation', orientation);

    this.orient = orientation;
  }

  connected() {
    this.set();
  }

  changed(name) {
    if (name === ORIENT_ATTR) {
      this.set();
    }
  }
}

export default OrientBehavior;
export { HORIZONTAL, ORIENT_ATTR, VERTICAL };
