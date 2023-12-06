import Validation from "../lib/keywords/validation.js";


const id = "https://json-schema.org/keyword/draft-2019-09/recursiveRef";

const compile = (schema) => schema.id;

const interpret = (id, instance, ast, dynamicAnchors, quiet) => {
  if ("" in ast.metaData[id].dynamicAnchors) {
    dynamicAnchors = { ...ast.metaData[id].dynamicAnchors, ...dynamicAnchors };
    return Validation.interpret(dynamicAnchors[""], instance, ast, dynamicAnchors, quiet);
  } else {
    return Validation.interpret(`${id}#`, instance, ast, dynamicAnchors, quiet);
  }
};

const collectEvaluatedProperties = Validation.collectEvaluatedProperties;
const collectEvaluatedItems = Validation.collectEvaluatedItems;

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
