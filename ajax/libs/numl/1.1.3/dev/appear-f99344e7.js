import { B as Behavior, d as deepQueryAll } from './index-e74c1c40.js';

class AppearBehavior extends Behavior {
  connected() {
    this.threshold = parseInt(this.params.threshold);
    this.timeout = parseInt(this.params.timeout) || 0;

    if (isNaN(this.threshold)) {
      this.threshold = 50;
    }

    setTimeout(() => this.apply());
  }

  apply() {
    const { host } = this;
    const rect = host.getBoundingClientRect();
    const screenHeight = window.innerHeight;

    if (rect.y < 0 && rect.y + rect.height > 0) {
      this.setByThreshold((rect.y + rect.height) / rect.height, 'bottom');
    } else if (rect.y + rect.height > screenHeight && rect.y < screenHeight) {
      this.setByThreshold((screenHeight - rect.y) / rect.height, 'top');
    } else if (rect.y >= 0 && rect.y + rect.height <= screenHeight) {
      this.setByThreshold(1, (rect.y - (rect.height / 2) <= screenHeight / 2) ? 'top' : 'bottom');
    } else {
      this.setByThreshold(0);
    }
  }

  setByThreshold(value, direction) {
    const { threshold } = this;

    this.set((threshold / 100) <= value, direction);
  }

  set(bool, direction) {
    if (bool) {
      setTimeout(() => {
        this.setMod('appear', bool);
      }, this.timeout);

      this.appeared = true;
      // this.setMod(`appear-${direction}`, bool);
    } else if (this.params.toggle) {
      setTimeout(() => {
        this.setMod('appear', bool);
      }, this.timeout);

      this.appeared = false;
      // this.setMod(`appear-top`, bool);
      // this.setMod(`appear-bottom`, bool);
    } else if (this.appeared) {
      this.host.removeAttribute('use-appear');
    }
  }
}

function onPositionChange() {
  const els = deepQueryAll(document.body, '[use-appear]');

  els.forEach(el => {
    el.nuBehaviors.appear.apply();
  });
}

['scroll', 'resize', 'wheel', 'touchmove', 'tap'].forEach(eventName => {
  window.addEventListener(eventName, onPositionChange, { passive: true });
});

export default AppearBehavior;
