import { W as WidgetBehavior, u as error, h } from './index-87ddde59.js';

class ConverterBehavior extends WidgetBehavior {
  static get converter() {}

  constructor(host) {
    super(host);

    this.container = null;
    this.observe = null;
  }

  connected() {
    super.connected();
    setTimeout(() => this.initConverter());
  }

  initConverter() {
    if (this.ref !== this.host) return;

    const { host } = this;
    const ref = this.ref = host.querySelector('textarea, pre');

    const useShadow = host.nuIsShadowAllowed;

    if (useShadow) {
      host.attachShadow({ mode: 'open' });
    } else {
      this.setMod('host', true);
    }

    if (!ref) {
      error('converter: textarea tag required', this.host);
      return;
    }

    host.nuRef = ref;

    ref.setAttribute('role', 'none');
    ref.setAttribute('aria-hidden', 'true');

    const container = this.container = this.createContainer();

    const toRemove = host.nuQueryChildren('*:not(pre):not(textarea)');

    toRemove.forEach(el => {
      el.parentNode.removeChild(el);
    });

    (host.nuShadow || host).appendChild(container);

    const observe = this.observe = this.createObserveListener(ref, container, this.constructor.converter);

    const observer = new MutationObserver(() => observe());

    observer.observe(ref, {
      characterData: false,
      attributes: false,
      childList: true,
      subtree: false
    });

    observe();
  }

  createContainer() {
    return h('nu-block');
  }

  createObserveListener(ref, container, converter) {
    return () => {
      const content = this.prepareContent(ref.tagName === 'TEXTAREA'
        ? ref.textContent
        : ref.innerHTML);

      this.apply(container, content, converter);
      this.postHandler(container);
    }
  }

  apply(container, content, converter) {}

  prepareContent(content) {
    return content || '';
  }

  postHandler(container) {}
}

export { ConverterBehavior as C };
