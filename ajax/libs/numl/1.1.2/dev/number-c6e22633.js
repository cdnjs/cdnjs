import { F as FormatterBehavior } from './formatter-f9443349.js';
import { n as numberFormat } from './number-90bff7fe.js';
import './index-ad816ab3.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
