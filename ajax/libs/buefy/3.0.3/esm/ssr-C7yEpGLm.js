const isSSR = typeof window === "undefined";
const HTMLElement = isSSR ? Object : window.HTMLElement;
const File = isSSR ? Object : window.File;

export { File as F, HTMLElement as H };
