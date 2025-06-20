// src/validation-errors/required.js
import chalk from "chalk";
import BaseValidationError from "./base.mjs";
var RequiredValidationError = class extends BaseValidationError {
  getLocation(dataPath = this.instancePath) {
    const { start } = super.getLocation(dataPath);
    return { start };
  }
  print() {
    const { message, params } = this.options;
    const output = [chalk`{red {bold REQUIRED} ${message}}\n`];
    return output.concat(
      this.getCodeFrame(
        chalk`☹️  {magentaBright ${params.missingProperty}} is missing here!`
      )
    );
  }
  getError() {
    const { message } = this.options;
    return {
      ...this.getLocation(),
      error: `${this.getDecoratedPath()} ${message}`,
      path: this.instancePath
    };
  }
};
export {
  RequiredValidationError as default
};
//# sourceMappingURL=required.mjs.map
