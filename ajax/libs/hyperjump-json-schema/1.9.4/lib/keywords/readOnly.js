import * as Browser from "@hyperjump/browser";
import * as Instance from "../../annotations/annotated-instance.js";


const id = "https://json-schema.org/keyword/readOnly";

const compile = (schema) => Browser.value(schema);

const interpret = (readOnly, instance, _ast, _dynamicAnchors, _quiet, schemaLocation) => {
  Instance.setAnnotation(instance, id, schemaLocation, readOnly);
  return true;
};

export default { id, compile, interpret };
