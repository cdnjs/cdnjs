import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/if";

const compile = (schema, ast) => Validation.compile(schema, ast);

const interpret = (ifSchema, instance, ast, dynamicAnchors, quiet) => {
  Validation.interpret(ifSchema, instance, ast, dynamicAnchors, quiet);
  return true;
};

const collectEvaluatedProperties = (ifSchema, instance, ast, dynamicAnchors) => {
  return Validation.collectEvaluatedProperties(ifSchema, instance, ast, dynamicAnchors) || [];
};

const collectEvaluatedItems = (ifSchema, instance, ast, dynamicAnchors) => {
  return Validation.collectEvaluatedItems(ifSchema, instance, ast, dynamicAnchors) || new Set();
};

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
