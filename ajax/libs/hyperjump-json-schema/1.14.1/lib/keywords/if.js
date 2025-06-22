import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/if";

const compile = (schema, ast) => Validation.compile(schema, ast);

const interpret = (ifSchema, instance, context) => {
  Validation.interpret(ifSchema, instance, context);
  return true;
};

export default { id, compile, interpret };
