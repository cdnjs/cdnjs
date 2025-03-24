import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/exclusiveMinimum";

const compile = (schema) => Browser.value(schema);
const interpret = (exclusiveMinimum, instance) => Instance.typeOf(instance) !== "number" || Instance.value(instance) > exclusiveMinimum;

export default { id, compile, interpret };
