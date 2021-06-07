import { C as ComponentBehavior } from './component-8723f5f1.js';
import './index-8f126d7b.js';

class DebuggerBehaviour extends ComponentBehavior {
  static get params() {
    return {
      component: 'debugger',
      props: ['target'],
    };
  }
}

export default DebuggerBehaviour;
