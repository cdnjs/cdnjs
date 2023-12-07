import jsonStringify from "fastest-stable-stringify";
import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/uniqueItems";

const compile = (schema) => Schema.value(schema);

const interpret = (uniqueItems, instance) => {
  if (!Instance.typeOf(instance, "array") || uniqueItems === false) {
    return true;
  }

  const normalizedItems = Instance.value(instance).map(jsonStringify);
  return new Set(normalizedItems).size === normalizedItems.length;
};

export default { id, compile, interpret };
