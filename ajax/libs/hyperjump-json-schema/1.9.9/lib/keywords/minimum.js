import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/minimum";

const compile = (schema) => Browser.value(schema);
const interpret = (minimum, instance) => Instance.typeOf(instance) !== "number" || Instance.value(instance) >= minimum;

export default { id, compile, interpret };
