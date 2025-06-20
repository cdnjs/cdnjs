// src/validation-errors/additional-prop.js
import chalk from "chalk";
import BaseValidationError from "./base.mjs";
var AdditionalPropValidationError = class extends BaseValidationError {
  constructor(...args) {
    super(...args);
    this.options.isIdentifierLocation = true;
  }
  print() {
    const { message, params } = this.options;
    const output = [chalk`{red {bold ADDTIONAL PROPERTY} ${message}}\n`];
    return output.concat(
      this.getCodeFrame(
        chalk`😲  {magentaBright ${params.additionalProperty}} is not expected to be here!`,
        `${this.instancePath}/${params.additionalProperty}`
      )
    );
  }
  getError() {
    const { params } = this.options;
    return {
      ...this.getLocation(`${this.instancePath}/${params.additionalProperty}`),
      error: `${this.getDecoratedPath()} Property ${params.additionalProperty} is not expected to be here`,
      path: this.instancePath
    };
  }
};
export {
  AdditionalPropValidationError as default
};
//# sourceMappingURL=additional-prop.mjs.map
