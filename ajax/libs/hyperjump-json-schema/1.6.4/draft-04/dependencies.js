import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Instance from "../lib/instance.js";
import * as Schema from "../lib/schema.js";
import Validation from "../lib/keywords/validation.js";


const id = "https://json-schema.org/keyword/draft-04/dependencies";

const compile = (schema, ast) => pipe(
  Schema.entries(schema),
  asyncMap(async ([key, dependency]) => [
    key,
    Schema.typeOf(dependency, "array") ? Schema.value(dependency) : await Validation.compile(dependency, ast)
  ]),
  asyncCollectArray
);

const interpret = (dependencies, instance, ast, dynamicAnchors, quiet) => {
  const value = Instance.value(instance);

  return !Instance.typeOf(instance, "object") || dependencies.every(([propertyName, dependency]) => {
    if (!(propertyName in value)) {
      return true;
    }

    if (Array.isArray(dependency)) {
      return dependency.every((key) => key in value);
    } else {
      return Validation.interpret(dependency, instance, ast, dynamicAnchors, quiet);
    }
  });
};

export default { id, compile, interpret };
