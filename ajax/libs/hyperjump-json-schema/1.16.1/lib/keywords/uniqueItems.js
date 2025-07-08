import jsonStringify from "json-stringify-deterministic";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/uniqueItems";

const compile = (schema) => Browser.value(schema);

const interpret = (uniqueItems, instance) => {
  if (Instance.typeOf(instance) !== "array" || uniqueItems === false) {
    return true;
  }

  const normalizedItems = Instance.value(instance).map(jsonStringify);
  return new Set(normalizedItems).size === normalizedItems.length;
};

export default { id, compile, interpret };
