// src/validation-errors/default.js
import chalk from "chalk";
import BaseValidationError from "./base.mjs";
var DefaultValidationError = class extends BaseValidationError {
  print() {
    const { keyword, message } = this.options;
    const output = [chalk`{red {bold ${keyword.toUpperCase()}} ${message}}\n`];
    return output.concat(
      this.getCodeFrame(chalk`👈🏽  {magentaBright ${keyword}} ${message}`)
    );
  }
  getError() {
    const { keyword, message } = this.options;
    return {
      ...this.getLocation(),
      error: `${this.getDecoratedPath()}: ${keyword} ${message}`,
      path: this.instancePath
    };
  }
};
export {
  DefaultValidationError as default
};
//# sourceMappingURL=default.mjs.map
