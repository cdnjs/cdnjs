import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/type";

const compile = (schema) => Browser.value(schema);
const interpret = (type, instance) => typeof type === "string"
  ? isTypeOf(instance)(type)
  : type.some(isTypeOf(instance));

const isTypeOf = (instance) => (type) => type === "integer"
  ? Instance.typeOf(instance) === "number" && Number.isInteger(Instance.value(instance))
  : Instance.typeOf(instance) === type;

export default { id, compile, interpret };
