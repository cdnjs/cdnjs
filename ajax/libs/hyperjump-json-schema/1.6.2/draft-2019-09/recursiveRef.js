import Validation from "../lib/keywords/validation.js";


const id = "https://json-schema.org/keyword/draft-2019-09/recursiveRef";

const compile = (schema) => schema.id;

const evaluate = (strategy) => (id, instance, ast, dynamicAnchors, quiet) => {
  if ("" in ast.metaData[id].dynamicAnchors) {
    dynamicAnchors = { ...ast.metaData[id].dynamicAnchors, ...dynamicAnchors };
    return strategy(dynamicAnchors[""], instance, ast, dynamicAnchors, quiet);
  } else {
    return strategy(`${id}#`, instance, ast, dynamicAnchors, quiet);
  }
};

const interpret = evaluate(Validation.interpret);
const collectEvaluatedProperties = evaluate(Validation.collectEvaluatedProperties);
const collectEvaluatedItems = evaluate(Validation.collectEvaluatedItems);

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
