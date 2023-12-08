import contentTypeParser from "content-type";


const mediaTypePlugins = {};

export const addMediaTypePlugin = (contentType, plugin) => {
  mediaTypePlugins[contentType] = plugin;
};

export const parseResponse = (response) => {
  const contentType = contentTypeParser.parse(response.headers.get("content-type"));
  if (!(contentType.type in mediaTypePlugins)) {
    throw Error(`${response.url} is not a schema. Found a document with media type: ${contentType.type}`);
  }
  return mediaTypePlugins[contentType.type].parse(response, contentType.parameters);
};

export const getContentType = (path) => {
  for (const contentType in mediaTypePlugins) {
    if (mediaTypePlugins[contentType].matcher(path)) {
      return contentType;
    }
  }

  return "application/octet-stream";
};

export const acceptableMediaTypes = () => {
  let accept = "";

  for (const contentType in mediaTypePlugins) {
    accept = addAcceptableMediaType(accept, contentType, mediaTypePlugins[contentType].quality);
  }

  return addAcceptableMediaType(accept, "*/*", "0.1");
};

const addAcceptableMediaType = (accept, contentType, quality) => {
  if (accept.length > 0) {
    accept += ", ";
  }
  accept += contentType;
  if (quality) {
    accept += `; q=${quality}`;
  }

  return accept;
};
