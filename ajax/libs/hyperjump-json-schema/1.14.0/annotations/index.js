import { FLAG } from "../lib/index.js";
import { ValidationError } from "./validation-error.js";
import {
  getSchema,
  compile,
  BASIC,
  DETAILED,
  annotationsPlugin,
  basicOutputPlugin,
  detailedOutputPlugin
} from "../lib/experimental.js";
import Validation from "../lib/keywords/validation.js";
import * as Instance from "../lib/instance.js";


export const annotate = async (schemaUri, json = undefined, outputFormat = undefined) => {
  const schema = await getSchema(schemaUri);
  const compiled = await compile(schema);
  const interpretAst = (json, outputFormat) => interpret(compiled, Instance.fromJs(json), outputFormat);

  return json === undefined ? interpretAst : interpretAst(json, outputFormat);
};

export const interpret = ({ ast, schemaUri }, instance, outputFormat = BASIC) => {
  const context = { ast, plugins: [annotationsPlugin, ...ast.plugins] };

  switch (outputFormat) {
    case FLAG:
      break;
    case BASIC:
      context.plugins.push(basicOutputPlugin);
      break;
    case DETAILED:
      context.plugins.push(detailedOutputPlugin);
      break;
    default:
      throw Error(`Unsupported output format '${outputFormat}'`);
  }

  const valid = Validation.interpret(schemaUri, instance, context);

  if (!valid) {
    const result = !valid && "errors" in context ? { valid, errors: context.errors } : { valid };
    throw new ValidationError(result);
  }

  for (const annotation of context.annotations) {
    const node = Instance.get(annotation.instanceLocation, instance);
    const keyword = annotation.keyword;
    if (!node.annotations[keyword]) {
      node.annotations[keyword] = [];
    }
    node.annotations[keyword].unshift(annotation.annotation);
  }

  return instance;
};

export { ValidationError } from "./validation-error.js";
