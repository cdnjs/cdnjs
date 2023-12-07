import * as Schema from "../schema.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/dynamicRef";
const experimental = true;

const compile = Schema.value;

const evaluate = (strategy) => (fragment, instance, ast, dynamicAnchors, quiet) => {
  if (!(fragment in dynamicAnchors)) {
    throw Error(`No dynamic anchor found for "${fragment}"`);
  }
  return strategy(dynamicAnchors[fragment], instance, ast, dynamicAnchors, quiet);
};

const interpret = evaluate(Validation.interpret);
const collectEvaluatedProperties = evaluate(Validation.collectEvaluatedProperties);
const collectEvaluatedItems = evaluate(Validation.collectEvaluatedItems);

export default { id, experimental, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
