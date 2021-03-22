import { F as FormatterBehavior } from './formatter-559b03cb.js';
import { n as numberFormat } from './number-8a4c1da0.js';
import './index-daa057ce.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
