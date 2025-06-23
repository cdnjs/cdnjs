import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/contentEncoding";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;

const annotation = (contentEncoding, instance) => {
  if (Instance.typeOf(instance) !== "string") {
    return;
  }

  return contentEncoding;
};

export default { id, compile, interpret, annotation };
