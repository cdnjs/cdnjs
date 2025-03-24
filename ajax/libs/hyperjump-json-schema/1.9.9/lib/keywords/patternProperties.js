import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";
import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/patternProperties";

const compile = (schema, ast) => pipe(
  Browser.entries(schema),
  asyncMap(async ([pattern, propertySchema]) => [
    new RegExp(pattern, "u"),
    await Validation.compile(propertySchema, ast)
  ]),
  asyncCollectArray
);

const interpret = (patternProperties, instance, ast, dynamicAnchors, quiet) => {
  if (Instance.typeOf(instance) !== "object") {
    return true;
  }

  let isValid = true;
  for (const [pattern, schemaUri] of patternProperties) {
    for (const [propertyNameNode, propertyValue] of Instance.entries(instance)) {
      const propertyName = Instance.value(propertyNameNode);
      if (pattern.test(propertyName) && !Validation.interpret(schemaUri, propertyValue, ast, dynamicAnchors, quiet)) {
        isValid = false;
      }
    }
  }

  return isValid;
};

const collectEvaluatedProperties = (patternProperties, instance, ast, dynamicAnchors) => {
  if (Instance.typeOf(instance) !== "object") {
    return false;
  }

  const evaluatedPropertyNames = new Set();
  for (const [pattern, propertySchema] of patternProperties) {
    for (const [propertyNameNode, property] of Instance.entries(instance)) {
      const propertyName = Instance.value(propertyNameNode);
      if (pattern.test(propertyName)) {
        if (!Validation.interpret(propertySchema, property, ast, dynamicAnchors, true)) {
          return false;
        }

        evaluatedPropertyNames.add(propertyName);
      }
    }
  }

  return evaluatedPropertyNames;
};

export default { id, compile, interpret, collectEvaluatedProperties };
