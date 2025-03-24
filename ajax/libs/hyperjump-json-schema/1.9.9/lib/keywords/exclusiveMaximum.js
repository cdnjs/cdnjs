import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/exclusiveMaximum";

const compile = (schema) => Browser.value(schema);
const interpret = (exclusiveMaximum, instance) => Instance.typeOf(instance) !== "number" || Instance.value(instance) < exclusiveMaximum;

export default { id, compile, interpret };
