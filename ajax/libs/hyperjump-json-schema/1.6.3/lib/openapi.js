import { addMediaTypePlugin } from "./media-types.js";


const is31 = RegExp.prototype.test.bind(/^3\.1\.\d+(-.+)?$/);
const is30 = RegExp.prototype.test.bind(/^3\.0\.\d+(-.+)?$/);

addMediaTypePlugin("application/openapi+json", {
  parse: async (response, contentTypeParameters) => {
    const doc = await response.json();

    let defaultDialect;
    const version = doc.openapi || contentTypeParameters.version;

    if (!version) {
      throw Error("Invalid OpenAPI document. Add the 'openapi' field and try again.");
    } else if (is30(version)) {
      defaultDialect = "https://spec.openapis.org/oas/3.0/schema";
    } else if (is31(version)) {
      if (!("jsonSchemaDialect" in doc) || doc.jsonSchemaDialect === "https://spec.openapis.org/oas/3.1/dialect/base") {
        defaultDialect = "https://spec.openapis.org/oas/3.1/schema-base";
      } else {
        defaultDialect = `https://spec.openapis.org/oas/3.1/schema-${encodeURIComponent(doc.jsonSchemaDialect)}`;
      }
    } else {
      throw Error(`Encountered unsupported OpenAPI version '${version}' in ${response.url}`);
    }

    return [doc, defaultDialect];
  },
  matcher: (path) => /(\/|\.)openapi\.json$/.test(path)
});
