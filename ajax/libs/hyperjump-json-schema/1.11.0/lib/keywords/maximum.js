import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/maximum";

const compile = (schema) => Browser.value(schema);
const interpret = (maximum, instance) => Instance.typeOf(instance) !== "number" || Instance.value(instance) <= maximum;

export default { id, compile, interpret };
