import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/dependentRequired";

const compile = (schema) => pipe(
  Browser.entries(schema),
  asyncMap(([key, dependentRequired]) => [key, Browser.value(dependentRequired)]),
  asyncCollectArray
);

const interpret = (dependentRequired, instance) => {
  return Instance.typeOf(instance) !== "object" || dependentRequired.every(([propertyName, required]) => {
    return !Instance.has(propertyName, instance) || required.every((key) => Instance.has(key, instance));
  });
};

export default { id, compile, interpret };
