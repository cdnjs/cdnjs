import './index-f49b3280.js';
import { F as FormatterBehavior } from './formatter-51f41db0.js';
import { n as numberFormat } from './number-3808110a.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
