import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/allOf";

const compile = (schema, ast) => pipe(
  Browser.iter(schema),
  asyncMap((itemSchema) => Validation.compile(itemSchema, ast)),
  asyncCollectArray
);

const interpret = (allOf, instance, ast, dynamicAnchors, quiet) => {
  return allOf.every((schemaUrl) => Validation.interpret(schemaUrl, instance, ast, dynamicAnchors, quiet));
};

const collectEvaluatedProperties = (allOf, instance, ast, dynamicAnchors) => {
  const evaluatedPropertyNames = new Set();
  for (const schemaUrl of allOf) {
    const propertyNames = Validation.collectEvaluatedProperties(schemaUrl, instance, ast, dynamicAnchors);
    if (!propertyNames) {
      return false;
    }

    propertyNames.forEach(evaluatedPropertyNames.add, evaluatedPropertyNames);
  }

  return evaluatedPropertyNames;
};

const collectEvaluatedItems = (allOf, instance, ast, dynamicAnchors) => {
  const evaluatedItemIndexes = new Set();
  for (const schemaUrl of allOf) {
    const itemIndexes = Validation.collectEvaluatedItems(schemaUrl, instance, ast, dynamicAnchors);
    if (!itemIndexes) {
      return false;
    }

    itemIndexes.forEach(evaluatedItemIndexes.add, evaluatedItemIndexes);
  }

  return evaluatedItemIndexes;
};

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
