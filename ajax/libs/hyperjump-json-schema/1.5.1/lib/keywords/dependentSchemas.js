import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Schema from "../schema.js";
import * as Instance from "../instance.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/dependentSchemas";

const compile = (schema, ast) => pipe(
  Schema.entries(schema),
  asyncMap(async ([key, dependentSchema]) => [key, await Validation.compile(dependentSchema, ast)]),
  asyncCollectArray
);

const interpret = (dependentSchemas, instance, ast, dynamicAnchors, quiet) => {
  const value = Instance.value(instance);

  return !Instance.typeOf(instance, "object") || dependentSchemas.every(([propertyName, dependentSchema]) => {
    return !(propertyName in value) || Validation.interpret(dependentSchema, instance, ast, dynamicAnchors, quiet);
  });
};

const collectEvaluatedProperties = (dependentSchemas, instance, ast, dynamicAnchors) => {
  const value = Instance.value(instance);
  if (!Instance.typeOf(instance, "object")) {
    return false;
  }

  const evaluatedPropertyNames = new Set();
  for (const [propertyName, dependentSchema] of dependentSchemas) {
    if (propertyName in value) {
      const propertyNames = Validation.collectEvaluatedProperties(dependentSchema, instance, ast, dynamicAnchors);
      if (propertyNames === false) {
        return false;
      }

      propertyNames.forEach(Set.prototype.add.bind(evaluatedPropertyNames));
    }
  }

  return evaluatedPropertyNames;
};

export default { id, compile, interpret, collectEvaluatedProperties };
