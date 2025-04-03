import { pipe, asyncMap, asyncCollectObject } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";
import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/properties";

const compile = (schema, ast) => pipe(
  Browser.entries(schema),
  asyncMap(async ([propertyName, propertySchema]) => [propertyName, await Validation.compile(propertySchema, ast)]),
  asyncCollectObject
);

const interpret = (properties, instance, ast, dynamicAnchors, quiet) => {
  if (Instance.typeOf(instance) !== "object") {
    return true;
  }

  let isValid = true;
  for (const [propertyNameNode, property] of Instance.entries(instance)) {
    const propertyName = Instance.value(propertyNameNode);
    if (propertyName in properties && !Validation.interpret(properties[propertyName], property, ast, dynamicAnchors, quiet)) {
      isValid = false;
    }
  }

  return isValid;
};

const collectEvaluatedProperties = (properties, instance, ast, dynamicAnchors) => {
  if (Instance.typeOf(instance) !== "object") {
    return false;
  }

  const evaluatedPropertyNames = new Set();
  for (const [propertyNameNode, property] of Instance.entries(instance)) {
    const propertyName = Instance.value(propertyNameNode);
    if (propertyName in properties) {
      if (!Validation.interpret(properties[propertyName], property, ast, dynamicAnchors, true)) {
        return false;
      }

      evaluatedPropertyNames.add(propertyName);
    }
  }

  return evaluatedPropertyNames;
};

export default { id, compile, interpret, collectEvaluatedProperties };
