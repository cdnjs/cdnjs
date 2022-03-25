import { B as Behavior, K as setTransitionTimeout } from './index-e74c1c40.js';

class OffsetBehavior extends Behavior {
  connected() {
    const { host, params } = this;
    const { name } = params;
    const xProp = `--${name ? `${name}-` : ''}offset-x`;
    const yProp = `--${name ? `${name}-` : ''}offset-y`;

    const updateByEvent = (event) => {
      this._active = true;

      const rect = host.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const offsetX = (x / rect.width * 2) - 1;
      const offsetY = (y / rect.height * 2) - 1;

      host.style.setProperty(xProp, String(offsetX));
      host.style.setProperty(yProp, String(offsetY));
    };

    this.on('mousemove', updateByEvent);

    this.on('mouseover', (event) => {
      updateByEvent(event);

      setTransitionTimeout(host, () => {
        if (this._active) {
          this.setMod('offset', true);
        }
      });
    });

    this.on('mouseout', () => {
      this._active = false;
      this.setMod('offset', false);

      setTimeout(() => {
        if (!this._active) {
          host.style.setProperty(xProp, '0');
          host.style.setProperty(yProp, '0');
        }
      });
    });
  }
}

export default OffsetBehavior;
