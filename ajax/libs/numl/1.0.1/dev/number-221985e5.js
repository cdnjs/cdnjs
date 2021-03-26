import { F as FormatterBehavior } from './formatter-fcd84256.js';
import { n as numberFormat } from './number-d803a1ae.js';
import './index-7da957b6.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
