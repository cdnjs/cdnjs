// In a single Node.js process, if different parts or dependencies
// of a project mix ESM and CJS, avoid a split-brain state by making
// sure both import and re-use the same instance via this wrapper.
//
// Node.js 12+ can import a CommonJS file from ESM.
import QUnit from '../qunit.js';

export const {
  assert,
  begin,
  config,
  diff,
  done,
  dump,
  equiv,
  hooks,
  is,
  isLocal,
  log,
  module,
  moduleDone,
  moduleStart,
  objectType,
  on,
  only,
  onUncaughtException,
  pushFailure,
  reporters,
  skip,
  stack,
  start,
  test,
  testDone,
  testStart,
  todo,
  urlParams,
  version
} = QUnit;

export { QUnit };

export default QUnit;
