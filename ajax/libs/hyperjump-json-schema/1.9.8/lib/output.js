import * as Instance from "./instance.js";


const outputFormats = {};

export const toOutputFormat = (node, outputFormat) => {
  if (outputFormat in outputFormats) {
    return outputFormats[outputFormat](node);
  } else {
    throw Error(`The '${outputFormat}' error format is not supported`);
  }
};

outputFormats.FLAG = (instance) => {
  return { valid: instance.valid };
};

outputFormats.BASIC = (instance) => {
  const output = {
    valid: instance.valid
  };

  if (!instance.valid) {
    output.errors = [];

    for (const child of Instance.allNodes(instance)) {
      for (const [absoluteKeywordLocation, keyword] of Object.entries(child.errors).reverse()) {
        if (keyword !== "https://json-schema.org/evaluation/validate" && !child.valid) {
          output.errors.unshift({
            keyword,
            absoluteKeywordLocation,
            instanceLocation: Instance.uri(child),
            valid: child.valid
          });
        }
      }
    }
  }

  return output;
};
