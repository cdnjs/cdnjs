import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/maxItems";

const compile = (schema) => Browser.value(schema);
const interpret = (maxItems, instance) => {
  return Instance.typeOf(instance) !== "array" || Instance.length(instance) <= maxItems;
};

export default { id, compile, interpret };
