import { B as Behavior, s as setAttr } from './index-e74c1c40.js';

/**
 * Make element hoverable or temporarily disable that ability.
 * Handles pointer hover interactions for an element. Normalizes behavior
 * across browsers and platforms, and ignores emulated mouse events on touch devices.
 * Implementation is based on @react-aria useHover:
 * @see https://github.com/adobe/react-spectrum/blob/main/packages/@react-aria/interactions/src/useHover.ts
 */

let globalIgnoreEmulatedMouseEvents = false;
let hoverCount = 0;

function setGlobalIgnoreEmulatedMouseEvents() {
  globalIgnoreEmulatedMouseEvents = true;

  setTimeout(() => {
    globalIgnoreEmulatedMouseEvents = false;
  }, 50);
}

function handleGlobalPointerEvent(e) {
  if (e.pointerType === 'touch') {
    setGlobalIgnoreEmulatedMouseEvents();
  }
}

function setupGlobalTouchEvents() {
  if (typeof document === 'undefined') {
    return;
  }

  if (typeof PointerEvent !== 'undefined') {
    document.addEventListener('pointerup', handleGlobalPointerEvent);
  } else {
    document.addEventListener('touchend', setGlobalIgnoreEmulatedMouseEvents);
  }

  hoverCount++;

  return () => {
    hoverCount--;
    if (hoverCount > 0) {
      return;
    }

    if (typeof PointerEvent !== 'undefined') {
      document.removeEventListener('pointerup', handleGlobalPointerEvent);
    } else {
      document.removeEventListener('touchend', setGlobalIgnoreEmulatedMouseEvents);
    }
  };
}

const DISABLED_ATTR = 'disabled';

class HoverBehavior extends Behavior {
  init() {
    this.ignoreEmulatedMouseEvents = false;
    this.isHovered = false;

    if (typeof PointerEvent !== 'undefined') {
      this.on('pointerenter', (e) => {
        if (globalIgnoreEmulatedMouseEvents && e.pointerType === 'mouse') {
          return;
        }

        this.triggerHoverStart(e, e.pointerType);
      });

      this.on('pointerleave', (e) => {
        this.triggerHoverEnd(e, e.pointerType);
      });
    } else {
      this.on('touchstart', () => {
        this.ignoreEmulatedMouseEvents = true;
      });

      this.on('mouseenter', (e) => {
        if (!this.ignoreEmulatedMouseEvents && !globalIgnoreEmulatedMouseEvents) {
          this.triggerHoverStart(e, 'mouse');
        }

        this.ignoreEmulatedMouseEvents = false;
      });

      this.on('mouseleave', (e) => {
        this.triggerHoverEnd(e, 'mouse');
      });
    }
  }

  connected() {
    this.tearDown = setupGlobalTouchEvents();
  }

  disconnected() {
    if (this.tearDown) {
      this.tearDown();
    }
  }

  get isDisabled() {
    return this.host.hasAttribute(DISABLED_ATTR);
  }

  changed(name, value) {
    if (name === DISABLED_ATTR) {
      this.set(value == null);
    }
  }

  setEffect(bool) {
    const host = this.host;

    host.nuSetMod('hover', bool);
    host.nuSetContext('hover', bool || null);

    const transferChild = host.constructor.nuContents;

    if (transferChild) {
      this.contentsRef = host.querySelector(transferChild);
    }

    if (this.contentsRef) {
      setAttr(this.contentsRef, 'is-hover', bool);
    }
  }

  set(param) {
    this.host.nuSetMod('hoverable', param || null);
  }

  triggerHoverStart(event, pointerType) {
    if (this.isDisabled || pointerType === 'touch' || this.isHovered) {
      return;
    }

    this.isHovered = true;

    this.emit('hoverstart', { pointerType });
    this.emit('hoverchange', { pointerType });

    this.setEffect(true);
  }

  triggerHoverEnd(event, pointerType) {
    if (this.isDisabled || pointerType === 'touch' || !this.isHovered) {
      return;
    }

    this.isHovered = false;

    this.emit('hoverend', { pointerType });
    this.emit('hoverchange', { pointerType });

    this.setEffect(false);
  }
}

export default HoverBehavior;
export { DISABLED_ATTR };
