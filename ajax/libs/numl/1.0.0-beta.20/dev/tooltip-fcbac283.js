import { B as Behavior, J as isTouch, f as fixPosition } from './index-f49b3280.js';

class TooltipBehavior extends Behavior {
  connected() {
    const { host } = this;
    const parent = this.parent = this.host.parentNode;

    if (parent && parent.nuElement && !parent.hasAttribute('describedby')) {
      parent.setAttribute('describedby', this.nuId);
    }

    let hover = false;
    let focus = false;

    host.hidden = true;

    this.setMod('tooltip', true);

    if (isTouch) return;

    const showTooltip = () => {
      this.use('fixate')
        .then(Fixate => Fixate.start());

      host.hidden = false;
      parent.nuSetMod('tooltip-shown', true);
    };

    const hideTooltip = () => {
      this.use('fixate')
        .then(Fixate => Fixate.end());

      host.hidden = true;
      parent.nuSetMod('tooltip-shown', false);
    };

    const onMouseEnter = () => {
      hover = true;

      if (focus) return;

      showTooltip();

      setTimeout(() => {
        fixPosition(host);
      });
    };

    const onMouseLeave = () => {
      hover = false;
      focus = false;

      hideTooltip();
    };

    const onFocus = () => {
      focus = true;

      if (hover) return;

      showTooltip();
    };

    const onBlur = () => {
      focus = false;

      if (hover) return;

      hideTooltip();
    };

    parent.addEventListener('mouseenter', onMouseEnter);
    parent.addEventListener('mouseleave', onMouseLeave);

    this.removeListeners = () => {
      parent.removeEventListener('mouseenter', onMouseEnter);
      parent.removeEventListener('mouseleave', onMouseLeave);
    };

    host.nuSetContextHook('focus', (val) => {
      if (val) {
        onFocus();
      } else {
        onBlur();
      }
    });
  }

  disconnected() {
    const removeListeners = this.removeListeners;

    if (removeListeners) {
      removeListeners();
    }
  }
}

export default TooltipBehavior;
