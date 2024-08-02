import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/anyOf";

const compile = (schema, ast) => pipe(
  Browser.iter(schema),
  asyncMap((itemSchema) => Validation.compile(itemSchema, ast)),
  asyncCollectArray
);

const interpret = (anyOf, instance, ast, dynamicAnchors, quiet) => {
  const matches = anyOf.filter((schemaUrl) => Validation.interpret(schemaUrl, instance, ast, dynamicAnchors, quiet));
  return matches.length > 0;
};

const collectEvaluatedProperties = (anyOf, instance, ast, dynamicAnchors) => {
  let evaluatedPropertyNames = false;
  for (const schemaUrl of anyOf) {
    const propertyNames = Validation.collectEvaluatedProperties(schemaUrl, instance, ast, dynamicAnchors);
    if (propertyNames) {
      evaluatedPropertyNames ||= new Set();
      propertyNames.forEach(evaluatedPropertyNames.add, evaluatedPropertyNames);
    }
  }

  return evaluatedPropertyNames;
};

const collectEvaluatedItems = (anyOf, instance, ast, dynamicAnchors) => {
  let evaluatedItemIndexes = false;
  for (const schemaUrl of anyOf) {
    const itemIndexes = Validation.collectEvaluatedItems(schemaUrl, instance, ast, dynamicAnchors);
    if (itemIndexes) {
      evaluatedItemIndexes ||= new Set();
      itemIndexes.forEach(evaluatedItemIndexes.add, evaluatedItemIndexes);
    }
  }

  return evaluatedItemIndexes;
};

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
