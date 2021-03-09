import './index-87ddde59.js';
import { F as FormatterBehavior } from './formatter-64fb5e87.js';
import { n as numberFormat } from './number-b80355f4.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
