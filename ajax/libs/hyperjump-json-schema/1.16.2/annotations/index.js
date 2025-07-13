import { ValidationError } from "./validation-error.js";
import {
  getSchema,
  compile,
  interpret as validate,
  BASIC,
  AnnotationsPlugin
} from "../lib/experimental.js";
import * as Instance from "../lib/instance.js";


export const annotate = async (schemaUri, json = undefined, options = undefined) => {
  const schema = await getSchema(schemaUri);
  const compiled = await compile(schema);
  const interpretAst = (json, options) => interpret(compiled, Instance.fromJs(json), options);

  return json === undefined ? interpretAst : interpretAst(json, options);
};

export const interpret = (compiledSchema, instance, options = BASIC) => {
  const annotationsPlugin = new AnnotationsPlugin();
  const plugins = options.plugins ?? [];

  const output = validate(compiledSchema, instance, {
    outputFormat: typeof options === "string" ? options : options.outputFormat ?? BASIC,
    plugins: [annotationsPlugin, ...plugins]
  });

  if (!output.valid) {
    throw new ValidationError(output);
  }

  for (const annotation of annotationsPlugin.annotations) {
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
