import { B as Behavior, S as Svg, D as svgElement, E as error } from './index-e74c1c40.js';
import { f as fixSafariInvisibleContents } from './browser-fixes-ad0e4ba1.js';

class SvgBehavior extends Behavior {
  connected() {
    const src = this.host.getAttribute('src');

    if (src) {
      this.inject(src);
    }
  }

  changed(name, value) {
    if (!this.isConnected) return;

    if (name === 'src') {
      this.inject(value);
    }
  }

  inject(src) {
    const { host } = this;

    if (!src || !src.trim()) return;

    Svg.load(src).then(svg => {
      host.innerHTML = '';

      const svgNode = svgElement(svg);
      const width = svgNode.getAttribute('width');
      const height = svgNode.getAttribute('height');
      const viewBox = svgNode.getAttribute('viewBox');

      if (width && height) {
        if (!viewBox) {
          svgNode.setAttribute('viewBox', `0,0,${width},${height}`);
        }
      }

      host.innerHTML = '';
      host.appendChild(svgNode);

      fixSafariInvisibleContents(host);
    }).catch(() => {
      error('svg not loaded:', name);

      return '';
    });
  }
}

export default SvgBehavior;
