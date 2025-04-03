import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/if";

const compile = (schema, ast) => Validation.compile(schema, ast);

const interpret = (ifSchema, instance, ast, dynamicAnchors) => {
  Validation.interpret(ifSchema, instance, ast, dynamicAnchors, true);
  return true;
};

const collectEvaluatedProperties = (ifSchema, instance, ast, dynamicAnchors) => {
  return Validation.collectEvaluatedProperties(ifSchema, instance, ast, dynamicAnchors) || [];
};

const collectEvaluatedItems = (ifSchema, instance, ast, dynamicAnchors) => {
  return Validation.collectEvaluatedItems(ifSchema, instance, ast, dynamicAnchors) || new Set();
};

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
