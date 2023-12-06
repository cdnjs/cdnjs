import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/dependentRequired";

const compile = (schema) => pipe(
  Schema.entries(schema),
  asyncMap(([key, dependentRequired]) => [key, Schema.value(dependentRequired)]),
  asyncCollectArray
);

const interpret = (dependentRequired, instance) => {
  const value = Instance.value(instance);

  return !Instance.typeOf(instance, "object") || dependentRequired.every(([propertyName, required]) => {
    return !(propertyName in value) || required.every((key) => key in value);
  });
};

export default { id, compile, interpret };
