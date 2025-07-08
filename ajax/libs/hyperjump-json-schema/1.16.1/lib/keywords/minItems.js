import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/minItems";

const compile = (schema) => Browser.value(schema);
const interpret = (minItems, instance) => {
  return Instance.typeOf(instance) !== "array" || Instance.length(instance) >= minItems;
};

export default { id, compile, interpret };
