import { ValidationError } from "./validation-error.js";
import { getSchema, compile, interpret as validate, BASIC } from "../lib/experimental.js";
import * as Instance from "../lib/instance.js";


export const annotate = async (schemaUri, json = undefined, outputFormat = undefined) => {
  const schema = await getSchema(schemaUri);
  const compiled = await compile(schema);
  const interpretAst = (json, outputFormat) => interpret(compiled, Instance.fromJs(json), outputFormat);

  return json === undefined ? interpretAst : interpretAst(json, outputFormat);
};

export const interpret = ({ ast, schemaUri }, instance, outputFormat = BASIC) => {
  const result = validate({ ast, schemaUri }, instance, outputFormat);
  if (!result.valid) {
    throw new ValidationError(result);
  }

  return instance;
};

export { ValidationError } from "./validation-error.js";
