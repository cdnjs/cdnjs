import { B as Behavior } from './index-6a06a0ad.js';

/**
 * Event bindings for active elements.
 * Enable focus and active states.
 * Should be bind to the element before call.
 */
class ActiveBehavior extends Behavior {
  constructor(host) {
    super(host);

    this.on('click', evt => {
      this.setMod('active', false);

      if (host.nuDisabled || evt.nuHandled) return;

      evt.nuHandled = true;

      this.tap(evt);
    });

    this.on('keydown', evt => {
      if (host.nuDisabled || evt.nuHandled) return;

      evt.nuHandled = true;

      if (evt.key === 'Enter') {
        this.tap(evt);
      } else if (evt.key === ' ') {
        evt.preventDefault();

        if (!host.nuDisabled) {
          this.setMod('active', true);
        }
      }
    });

    this.on('keyup', evt => {
      this.setMod('active', false);

      if (host.nuDisabled || evt.nuHandled) return;

      evt.nuHandled = true;

      if (evt.key === ' ') {
        evt.preventDefault();
        this.tap(evt);
      }
    });

    this.on('blur', () => this.setMod('active', false));

    this.on(['mousedown', 'touchstart'], () => {
      // checking for focusable also && host.nuHasMod('focusable')
      // doesn't for nu-option
      if (!host.nuDisabled) {
        this.setMod('active', true);
      }
    }, { passive: true });

    this.on(['mouseleave', 'mouseup', 'touchend'], () => {
      this.setMod('active', false);
    }, { passive: true });
  }

  tap(evt) {
    const button = this.host.NuAction;

    if (button) {
      button.tap(evt);
    }
  }
}

export default ActiveBehavior;
