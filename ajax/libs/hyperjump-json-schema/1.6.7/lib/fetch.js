import { createReadStream } from "node:fs";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";
import { fetch, Response } from "undici";
import * as MediaTypes from "./media-types.js";


export default (url, options) => {
  if (url.startsWith("file://")) {
    const filePath = fileURLToPath(url);
    const stream = createReadStream(filePath);
    const response = new Response(Readable.toWeb(stream), {
      headers: { "Content-Type": MediaTypes.getContentType(filePath) }
    });
    Object.defineProperty(response, "url", { value: url });
    return response;
  } else {
    return fetch(url, options);
  }
};
