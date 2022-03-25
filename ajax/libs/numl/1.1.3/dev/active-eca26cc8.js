import { B as Behavior } from './index-e74c1c40.js';

/**
 * Event bindings for active elements.
 * Enable focus and active states.
 * Should be bind to the element before call.
 */
class ActiveBehavior extends Behavior {
  constructor(host) {
    super(host);

    const root = document.documentElement;

    const setActive = (bool) => {
      this.setMod('active', bool);
    };

    const setUserSelect = (bool) => {
      if ('webkitUserSelect' in root.style) {
        root.style.webkitUserSelect = bool ? '' : 'none';
      } else {
        root.style.userSelect = bool ? '' : 'none';
      }
    };

    this.on('click', evt => {
      setActive(false);

      if (host.nuDisabled) return;

      evt.stopPropagation();

      this.tap(evt);
    });

    this.on('keydown', evt => {
      if (host.nuDisabled) return;

      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.stopPropagation();
        evt.preventDefault();

        setActive(true);
      }
    });
    this.on('keyup', evt => {
      if (host.nuDisabled) return;

      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.stopPropagation();
        evt.preventDefault();
        this.tap(evt);
        setActive(false);
      }
    });

    this.on('blur', () => setActive(false));

    this.on(['mousedown', 'touchstart'], (evt) => {
      if (!host.nuDisabled) {
        evt.stopPropagation();

        setActive(true);

        if (evt.type === 'mousedown') {
          setUserSelect(false);

          window.addEventListener('mouseup', function handleUp() {
            setUserSelect(true);

            window.removeEventListener('mouseup', handleUp);
          });
        }
      }
    });

    this.on(['mouseleave', 'mouseup', 'touchend'], (evt) => {
      setActive(false);
    });
  }

  tap(evt) {
    const button = this.host.NuAction;

    if (button) {
      button.tap(evt);
    }
  }
}

export default ActiveBehavior;
