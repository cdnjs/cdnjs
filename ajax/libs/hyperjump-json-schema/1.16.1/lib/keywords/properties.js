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

const interpret = (properties, instance, context) => {
  if (Instance.typeOf(instance) !== "object") {
    return true;
  }

  let isValid = true;
  for (const [propertyNameNode, property] of Instance.entries(instance)) {
    const propertyName = Instance.value(propertyNameNode);
    if (propertyName in properties) {
      if (!Validation.interpret(properties[propertyName], property, context)) {
        isValid = false;
      }

      context.evaluatedProperties?.add(propertyName);
    }
  }

  return isValid;
};

const simpleApplicator = true;

export default { id, compile, interpret, simpleApplicator };
