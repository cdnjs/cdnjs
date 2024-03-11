import contentTypeParser from "content-type";
import { addMediaTypePlugin } from "@hyperjump/browser";
import { buildSchemaDocument } from "./schema.js";


const is31 = RegExp.prototype.test.bind(/^3\.1\.\d+(-.+)?$/);
const is30 = RegExp.prototype.test.bind(/^3\.0\.\d+(-.+)?$/);

addMediaTypePlugin("application/openapi+json", {
  parse: async (response) => {
    const doc = await response.json();

    let defaultDialect;
    const contentType = contentTypeParser.parse(response.headers.get("content-type") ?? "");
    const version = doc.openapi || contentType.parameters.version;

    if (!version) {
      throw Error("Invalid OpenAPI document. Add the 'openapi' field and try again.");
    } else if (is30(version)) {
      defaultDialect = "https://spec.openapis.org/oas/3.0/schema";
    } else if (is31(version)) {
      if (!("jsonSchemaDialect" in doc) || doc.jsonSchemaDialect === "https://spec.openapis.org/oas/3.1/dialect/base") {
        defaultDialect = "https://spec.openapis.org/oas/3.1/schema-base";
      } else if (doc.jsonSchemaDialect === "https://json-schema.org/draft/2020-12/schema") {
        defaultDialect = `https://spec.openapis.org/oas/3.1/schema-draft-2020-12`;
      } else if (doc.jsonSchemaDialect === "https://json-schema.org/draft/2019-09/schema") {
        defaultDialect = `https://spec.openapis.org/oas/3.1/schema-draft-2019-09`;
      } else if (doc.jsonSchemaDialect === "http://json-schema.org/draft-07/schema#") {
        defaultDialect = `https://spec.openapis.org/oas/3.1/schema-draft-07`;
      } else if (doc.jsonSchemaDialect === "http://json-schema.org/draft-06/schema#") {
        defaultDialect = `https://spec.openapis.org/oas/3.1/schema-draft-06`;
      } else if (doc.jsonSchemaDialect === "http://json-schema.org/draft-04/schema#") {
        defaultDialect = `https://spec.openapis.org/oas/3.1/schema-draft-04`;
      } else {
        defaultDialect = `https://spec.openapis.org/oas/3.1/schema?${encodeURIComponent(doc.jsonSchemaDialect)}`;
      }
    } else {
      throw Error(`Encountered unsupported OpenAPI version '${version}' in ${response.url}`);
    }

    return buildSchemaDocument(doc, response.url, defaultDialect);
  },
  fileMatcher: (path) => /(\/|\.)openapi\.json$/.test(path)
});
