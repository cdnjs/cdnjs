import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/if";

const compile = (schema, ast) => Validation.compile(schema, ast);

const interpret = (ifSchema, instance, context) => {
  Validation.interpret(ifSchema, instance, context);
  return true;
};

const collectEvaluatedProperties = (ifSchema, instance, context) => {
  return Validation.collectEvaluatedProperties(ifSchema, instance, context) || new Set();
};

const collectEvaluatedItems = (ifSchema, instance, context) => {
  return Validation.collectEvaluatedItems(ifSchema, instance, context) || new Set();
};

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
