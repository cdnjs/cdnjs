import * as Schema from "../schema.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/dynamicRef";
const experimental = true;

const compile = Schema.value;

const interpret = (fragment, instance, ast, dynamicAnchors, quiet) => {
  if (!(fragment in dynamicAnchors)) {
    throw Error(`No dynamic anchor found for "${fragment}"`);
  }
  return Validation.interpret(dynamicAnchors[fragment], instance, ast, dynamicAnchors, quiet);
};

const collectEvaluatedProperties = Validation.collectEvaluatedProperties;
const collectEvaluatedItems = Validation.collectEvaluatedItems;

export default { id, experimental, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
