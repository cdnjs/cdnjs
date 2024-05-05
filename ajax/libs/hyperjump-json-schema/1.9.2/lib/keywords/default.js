import * as Browser from "@hyperjump/browser";
import * as Instance from "../../annotations/annotated-instance.js";


const id = "https://json-schema.org/keyword/default";

const compile = (schema) => Browser.value(schema);

const interpret = (value, instance, _ast, _dynamicAnchors, _quiet, schemaLocation) => {
  Instance.setAnnotation(instance, id, schemaLocation, value);
  return true;
};

export default { id, compile, interpret };
