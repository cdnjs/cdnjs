import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/pattern";

const compile = (schema) => new RegExp(Browser.value(schema), "u");
const interpret = (pattern, instance) => {
  return Instance.typeOf(instance) !== "string" || pattern.test(Instance.value(instance));
};

export default { id, compile, interpret };
