import * as Browser from "@hyperjump/browser";
import * as Instance from "../../annotations/annotated-instance.js";


const id = "https://json-schema.org/keyword/format";

const compile = (schema) => Browser.value(schema);

const interpret = (format, instance, _ast, _dynamicAnchors, _quiet, schemaLocation) => {
  Instance.setAnnotation(instance, id, schemaLocation, format);
  return true;
};

export default { id, compile, interpret };
