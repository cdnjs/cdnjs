import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/maxLength";

const compile = (schema) => Browser.value(schema);
const interpret = (maxLength, instance) => {
  return Instance.typeOf(instance) !== "string" || [...Instance.value(instance)].length <= maxLength;
};

export default { id, compile, interpret };
