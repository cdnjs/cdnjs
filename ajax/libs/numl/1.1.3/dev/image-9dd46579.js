import { W as WidgetBehavior, s as setAttr, h, w as warn } from './index-e74c1c40.js';
import { f as fixSafariInvisibleContents } from './browser-fixes-ad0e4ba1.js';

class ImageBehavior extends WidgetBehavior {
  init() {
    this.props.src = (src) => {
      this.load(src);
    };

    this.props.loading = (value) => {
      if (this.ref && this.ref !== this.host) {
        setAttr(this.ref, 'loading', value);
      }
    };

    super.init();
  }

  connected() {
    [...this.host.querySelectorAll('img:not([src])')].forEach(el => {
      el.parentNode.removeChild(el);
    });
  }

  load(src) {
    const { host } = this;

    src = src && src.trim();

    if (!src || src === this.cachedSrc) return;

    this.cachedSrc = src;

    let img = host.querySelector('img') || h('img');

    setAttr(img, 'loading', host.getAttribute('loading'));
    img.src = src;
    img.alt = '';

    this.ref = img;

    if (!img.parentNode) {
      host.appendChild(img);
    }

    fixSafariInvisibleContents(host);

    img.onerror = () => {
      this.removeChild(img);

      const icon = h('nu-icon');

      icon.setAttribute('name', 'image');

      host.appendChild(icon);

      warn('image not loaded', src);
    };

    return src;
  }
}

export default ImageBehavior;
