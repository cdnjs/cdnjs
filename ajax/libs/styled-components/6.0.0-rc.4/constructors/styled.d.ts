/// <reference types="react" />
import { WebTarget } from '../types';
import { Styled } from './constructWithOptions';
declare const styled: (<Target extends WebTarget>(tag: Target) => Styled<"web", Target, Target extends import("../types").KnownTarget ? import("react").ComponentPropsWithRef<Target> : import("../types").BaseObject, import("../types").BaseObject>) & {
    a: Styled<"web", "a", Omit<import("react").DetailedHTMLProps<import("react").AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "ref"> & {
        ref?: ((instance: HTMLAnchorElement | null) => void) | import("react").RefObject<HTMLAnchorElement> | null | undefined;
    }, import("../types").BaseObject>;
    abbr: Styled<"web", "abbr", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    address: Styled<"web", "address", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    area: Styled<"web", "area", Omit<import("react").DetailedHTMLProps<import("react").AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>, "ref"> & {
        ref?: ((instance: HTMLAreaElement | null) => void) | import("react").RefObject<HTMLAreaElement> | null | undefined;
    }, import("../types").BaseObject>;
    article: Styled<"web", "article", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    aside: Styled<"web", "aside", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    audio: Styled<"web", "audio", Omit<import("react").DetailedHTMLProps<import("react").AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>, "ref"> & {
        ref?: ((instance: HTMLAudioElement | null) => void) | import("react").RefObject<HTMLAudioElement> | null | undefined;
    }, import("../types").BaseObject>;
    b: Styled<"web", "b", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    base: Styled<"web", "base", Omit<import("react").DetailedHTMLProps<import("react").BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>, "ref"> & {
        ref?: ((instance: HTMLBaseElement | null) => void) | import("react").RefObject<HTMLBaseElement> | null | undefined;
    }, import("../types").BaseObject>;
    bdi: Styled<"web", "bdi", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    bdo: Styled<"web", "bdo", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    big: Styled<"web", "big", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    blockquote: Styled<"web", "blockquote", Omit<import("react").DetailedHTMLProps<import("react").BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>, "ref"> & {
        ref?: ((instance: HTMLQuoteElement | null) => void) | import("react").RefObject<HTMLQuoteElement> | null | undefined;
    }, import("../types").BaseObject>;
    body: Styled<"web", "body", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>, "ref"> & {
        ref?: ((instance: HTMLBodyElement | null) => void) | import("react").RefObject<HTMLBodyElement> | null | undefined;
    }, import("../types").BaseObject>;
    br: Styled<"web", "br", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLBRElement>, HTMLBRElement>, "ref"> & {
        ref?: ((instance: HTMLBRElement | null) => void) | import("react").RefObject<HTMLBRElement> | null | undefined;
    }, import("../types").BaseObject>;
    button: Styled<"web", "button", Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & {
        ref?: ((instance: HTMLButtonElement | null) => void) | import("react").RefObject<HTMLButtonElement> | null | undefined;
    }, import("../types").BaseObject>;
    canvas: Styled<"web", "canvas", Omit<import("react").DetailedHTMLProps<import("react").CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>, "ref"> & {
        ref?: ((instance: HTMLCanvasElement | null) => void) | import("react").RefObject<HTMLCanvasElement> | null | undefined;
    }, import("../types").BaseObject>;
    caption: Styled<"web", "caption", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    cite: Styled<"web", "cite", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    code: Styled<"web", "code", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    col: Styled<"web", "col", Omit<import("react").DetailedHTMLProps<import("react").ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>, "ref"> & {
        ref?: ((instance: HTMLTableColElement | null) => void) | import("react").RefObject<HTMLTableColElement> | null | undefined;
    }, import("../types").BaseObject>;
    colgroup: Styled<"web", "colgroup", Omit<import("react").DetailedHTMLProps<import("react").ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>, "ref"> & {
        ref?: ((instance: HTMLTableColElement | null) => void) | import("react").RefObject<HTMLTableColElement> | null | undefined;
    }, import("../types").BaseObject>;
    data: Styled<"web", "data", Omit<import("react").DetailedHTMLProps<import("react").DataHTMLAttributes<HTMLDataElement>, HTMLDataElement>, "ref"> & {
        ref?: ((instance: HTMLDataElement | null) => void) | import("react").RefObject<HTMLDataElement> | null | undefined;
    }, import("../types").BaseObject>;
    datalist: Styled<"web", "datalist", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>, "ref"> & {
        ref?: ((instance: HTMLDataListElement | null) => void) | import("react").RefObject<HTMLDataListElement> | null | undefined;
    }, import("../types").BaseObject>;
    dd: Styled<"web", "dd", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    del: Styled<"web", "del", Omit<import("react").DetailedHTMLProps<import("react").DelHTMLAttributes<HTMLModElement>, HTMLModElement>, "ref"> & {
        ref?: ((instance: HTMLModElement | null) => void) | import("react").RefObject<HTMLModElement> | null | undefined;
    }, import("../types").BaseObject>;
    details: Styled<"web", "details", Omit<import("react").DetailedHTMLProps<import("react").DetailsHTMLAttributes<HTMLDetailsElement>, HTMLDetailsElement>, "ref"> & {
        ref?: ((instance: HTMLDetailsElement | null) => void) | import("react").RefObject<HTMLDetailsElement> | null | undefined;
    }, import("../types").BaseObject>;
    dfn: Styled<"web", "dfn", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    dialog: Styled<"web", "dialog", Omit<import("react").DetailedHTMLProps<import("react").DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>, "ref"> & {
        ref?: ((instance: HTMLDialogElement | null) => void) | import("react").RefObject<HTMLDialogElement> | null | undefined;
    }, import("../types").BaseObject>;
    div: Styled<"web", "div", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
        ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
    }, import("../types").BaseObject>;
    dl: Styled<"web", "dl", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDListElement>, HTMLDListElement>, "ref"> & {
        ref?: ((instance: HTMLDListElement | null) => void) | import("react").RefObject<HTMLDListElement> | null | undefined;
    }, import("../types").BaseObject>;
    dt: Styled<"web", "dt", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    em: Styled<"web", "em", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    embed: Styled<"web", "embed", Omit<import("react").DetailedHTMLProps<import("react").EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>, "ref"> & {
        ref?: ((instance: HTMLEmbedElement | null) => void) | import("react").RefObject<HTMLEmbedElement> | null | undefined;
    }, import("../types").BaseObject>;
    fieldset: Styled<"web", "fieldset", Omit<import("react").DetailedHTMLProps<import("react").FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>, "ref"> & {
        ref?: ((instance: HTMLFieldSetElement | null) => void) | import("react").RefObject<HTMLFieldSetElement> | null | undefined;
    }, import("../types").BaseObject>;
    figcaption: Styled<"web", "figcaption", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    figure: Styled<"web", "figure", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    footer: Styled<"web", "footer", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    form: Styled<"web", "form", Omit<import("react").DetailedHTMLProps<import("react").FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "ref"> & {
        ref?: ((instance: HTMLFormElement | null) => void) | import("react").RefObject<HTMLFormElement> | null | undefined;
    }, import("../types").BaseObject>;
    h1: Styled<"web", "h1", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, "ref"> & {
        ref?: ((instance: HTMLHeadingElement | null) => void) | import("react").RefObject<HTMLHeadingElement> | null | undefined;
    }, import("../types").BaseObject>;
    h2: Styled<"web", "h2", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, "ref"> & {
        ref?: ((instance: HTMLHeadingElement | null) => void) | import("react").RefObject<HTMLHeadingElement> | null | undefined;
    }, import("../types").BaseObject>;
    h3: Styled<"web", "h3", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, "ref"> & {
        ref?: ((instance: HTMLHeadingElement | null) => void) | import("react").RefObject<HTMLHeadingElement> | null | undefined;
    }, import("../types").BaseObject>;
    h4: Styled<"web", "h4", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, "ref"> & {
        ref?: ((instance: HTMLHeadingElement | null) => void) | import("react").RefObject<HTMLHeadingElement> | null | undefined;
    }, import("../types").BaseObject>;
    h5: Styled<"web", "h5", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, "ref"> & {
        ref?: ((instance: HTMLHeadingElement | null) => void) | import("react").RefObject<HTMLHeadingElement> | null | undefined;
    }, import("../types").BaseObject>;
    h6: Styled<"web", "h6", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, "ref"> & {
        ref?: ((instance: HTMLHeadingElement | null) => void) | import("react").RefObject<HTMLHeadingElement> | null | undefined;
    }, import("../types").BaseObject>;
    head: Styled<"web", "head", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>, "ref"> & {
        ref?: ((instance: HTMLHeadElement | null) => void) | import("react").RefObject<HTMLHeadElement> | null | undefined;
    }, import("../types").BaseObject>;
    header: Styled<"web", "header", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    hgroup: Styled<"web", "hgroup", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    hr: Styled<"web", "hr", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHRElement>, HTMLHRElement>, "ref"> & {
        ref?: ((instance: HTMLHRElement | null) => void) | import("react").RefObject<HTMLHRElement> | null | undefined;
    }, import("../types").BaseObject>;
    html: Styled<"web", "html", Omit<import("react").DetailedHTMLProps<import("react").HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>, "ref"> & {
        ref?: ((instance: HTMLHtmlElement | null) => void) | import("react").RefObject<HTMLHtmlElement> | null | undefined;
    }, import("../types").BaseObject>;
    i: Styled<"web", "i", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    iframe: Styled<"web", "iframe", Omit<import("react").DetailedHTMLProps<import("react").IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>, "ref"> & {
        ref?: ((instance: HTMLIFrameElement | null) => void) | import("react").RefObject<HTMLIFrameElement> | null | undefined;
    }, import("../types").BaseObject>;
    img: Styled<"web", "img", Omit<import("react").DetailedHTMLProps<import("react").ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref"> & {
        ref?: ((instance: HTMLImageElement | null) => void) | import("react").RefObject<HTMLImageElement> | null | undefined;
    }, import("../types").BaseObject>;
    input: Styled<"web", "input", Omit<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & {
        ref?: ((instance: HTMLInputElement | null) => void) | import("react").RefObject<HTMLInputElement> | null | undefined;
    }, import("../types").BaseObject>;
    ins: Styled<"web", "ins", Omit<import("react").DetailedHTMLProps<import("react").InsHTMLAttributes<HTMLModElement>, HTMLModElement>, "ref"> & {
        ref?: ((instance: HTMLModElement | null) => void) | import("react").RefObject<HTMLModElement> | null | undefined;
    }, import("../types").BaseObject>;
    kbd: Styled<"web", "kbd", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    keygen: Styled<"web", "keygen", Omit<import("react").DetailedHTMLProps<import("react").KeygenHTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    label: Styled<"web", "label", Omit<import("react").DetailedHTMLProps<import("react").LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, "ref"> & {
        ref?: ((instance: HTMLLabelElement | null) => void) | import("react").RefObject<HTMLLabelElement> | null | undefined;
    }, import("../types").BaseObject>;
    legend: Styled<"web", "legend", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>, "ref"> & {
        ref?: ((instance: HTMLLegendElement | null) => void) | import("react").RefObject<HTMLLegendElement> | null | undefined;
    }, import("../types").BaseObject>;
    li: Styled<"web", "li", Omit<import("react").DetailedHTMLProps<import("react").LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & {
        ref?: ((instance: HTMLLIElement | null) => void) | import("react").RefObject<HTMLLIElement> | null | undefined;
    }, import("../types").BaseObject>;
    link: Styled<"web", "link", Omit<import("react").DetailedHTMLProps<import("react").LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>, "ref"> & {
        ref?: ((instance: HTMLLinkElement | null) => void) | import("react").RefObject<HTMLLinkElement> | null | undefined;
    }, import("../types").BaseObject>;
    main: Styled<"web", "main", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    map: Styled<"web", "map", Omit<import("react").DetailedHTMLProps<import("react").MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>, "ref"> & {
        ref?: ((instance: HTMLMapElement | null) => void) | import("react").RefObject<HTMLMapElement> | null | undefined;
    }, import("../types").BaseObject>;
    mark: Styled<"web", "mark", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    menu: Styled<"web", "menu", Omit<import("react").DetailedHTMLProps<import("react").MenuHTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    menuitem: Styled<"web", "menuitem", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    meta: Styled<"web", "meta", Omit<import("react").DetailedHTMLProps<import("react").MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>, "ref"> & {
        ref?: ((instance: HTMLMetaElement | null) => void) | import("react").RefObject<HTMLMetaElement> | null | undefined;
    }, import("../types").BaseObject>;
    meter: Styled<"web", "meter", Omit<import("react").DetailedHTMLProps<import("react").MeterHTMLAttributes<HTMLMeterElement>, HTMLMeterElement>, "ref"> & {
        ref?: ((instance: HTMLMeterElement | null) => void) | import("react").RefObject<HTMLMeterElement> | null | undefined;
    }, import("../types").BaseObject>;
    nav: Styled<"web", "nav", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    noindex: Styled<"web", "noindex", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    noscript: Styled<"web", "noscript", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    object: Styled<"web", "object", import("../types").BaseObject, import("../types").BaseObject>;
    ol: Styled<"web", "ol", Omit<import("react").DetailedHTMLProps<import("react").OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>, "ref"> & {
        ref?: ((instance: HTMLOListElement | null) => void) | import("react").RefObject<HTMLOListElement> | null | undefined;
    }, import("../types").BaseObject>;
    optgroup: Styled<"web", "optgroup", Omit<import("react").DetailedHTMLProps<import("react").OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>, "ref"> & {
        ref?: ((instance: HTMLOptGroupElement | null) => void) | import("react").RefObject<HTMLOptGroupElement> | null | undefined;
    }, import("../types").BaseObject>;
    option: Styled<"web", "option", Omit<import("react").DetailedHTMLProps<import("react").OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>, "ref"> & {
        ref?: ((instance: HTMLOptionElement | null) => void) | import("react").RefObject<HTMLOptionElement> | null | undefined;
    }, import("../types").BaseObject>;
    output: Styled<"web", "output", Omit<import("react").DetailedHTMLProps<import("react").OutputHTMLAttributes<HTMLOutputElement>, HTMLOutputElement>, "ref"> & {
        ref?: ((instance: HTMLOutputElement | null) => void) | import("react").RefObject<HTMLOutputElement> | null | undefined;
    }, import("../types").BaseObject>;
    p: Styled<"web", "p", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref"> & {
        ref?: ((instance: HTMLParagraphElement | null) => void) | import("react").RefObject<HTMLParagraphElement> | null | undefined;
    }, import("../types").BaseObject>;
    param: Styled<"web", "param", Omit<import("react").DetailedHTMLProps<import("react").ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>, "ref"> & {
        ref?: ((instance: HTMLParamElement | null) => void) | import("react").RefObject<HTMLParamElement> | null | undefined;
    }, import("../types").BaseObject>;
    picture: Styled<"web", "picture", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    pre: Styled<"web", "pre", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLPreElement>, HTMLPreElement>, "ref"> & {
        ref?: ((instance: HTMLPreElement | null) => void) | import("react").RefObject<HTMLPreElement> | null | undefined;
    }, import("../types").BaseObject>;
    progress: Styled<"web", "progress", Omit<import("react").DetailedHTMLProps<import("react").ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>, "ref"> & {
        ref?: ((instance: HTMLProgressElement | null) => void) | import("react").RefObject<HTMLProgressElement> | null | undefined;
    }, import("../types").BaseObject>;
    q: Styled<"web", "q", Omit<import("react").DetailedHTMLProps<import("react").QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>, "ref"> & {
        ref?: ((instance: HTMLQuoteElement | null) => void) | import("react").RefObject<HTMLQuoteElement> | null | undefined;
    }, import("../types").BaseObject>;
    rp: Styled<"web", "rp", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    rt: Styled<"web", "rt", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    ruby: Styled<"web", "ruby", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    s: Styled<"web", "s", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    samp: Styled<"web", "samp", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    slot: Styled<"web", "slot", Omit<import("react").DetailedHTMLProps<import("react").SlotHTMLAttributes<HTMLSlotElement>, HTMLSlotElement>, "ref"> & {
        ref?: ((instance: HTMLSlotElement | null) => void) | import("react").RefObject<HTMLSlotElement> | null | undefined;
    }, import("../types").BaseObject>;
    script: Styled<"web", "script", Omit<import("react").DetailedHTMLProps<import("react").ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>, "ref"> & {
        ref?: ((instance: HTMLScriptElement | null) => void) | import("react").RefObject<HTMLScriptElement> | null | undefined;
    }, import("../types").BaseObject>;
    section: Styled<"web", "section", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    select: Styled<"web", "select", Omit<import("react").DetailedHTMLProps<import("react").SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>, "ref"> & {
        ref?: ((instance: HTMLSelectElement | null) => void) | import("react").RefObject<HTMLSelectElement> | null | undefined;
    }, import("../types").BaseObject>;
    small: Styled<"web", "small", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    source: Styled<"web", "source", Omit<import("react").DetailedHTMLProps<import("react").SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>, "ref"> & {
        ref?: ((instance: HTMLSourceElement | null) => void) | import("react").RefObject<HTMLSourceElement> | null | undefined;
    }, import("../types").BaseObject>;
    span: Styled<"web", "span", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & {
        ref?: ((instance: HTMLSpanElement | null) => void) | import("react").RefObject<HTMLSpanElement> | null | undefined;
    }, import("../types").BaseObject>;
    strong: Styled<"web", "strong", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    style: Styled<"web", "style", Omit<import("react").DetailedHTMLProps<import("react").StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>, "ref"> & {
        ref?: ((instance: HTMLStyleElement | null) => void) | import("react").RefObject<HTMLStyleElement> | null | undefined;
    }, import("../types").BaseObject>;
    sub: Styled<"web", "sub", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    summary: Styled<"web", "summary", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    sup: Styled<"web", "sup", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    table: Styled<"web", "table", Omit<import("react").DetailedHTMLProps<import("react").TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, "ref"> & {
        ref?: ((instance: HTMLTableElement | null) => void) | import("react").RefObject<HTMLTableElement> | null | undefined;
    }, import("../types").BaseObject>;
    template: Styled<"web", "template", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTemplateElement>, HTMLTemplateElement>, "ref"> & {
        ref?: ((instance: HTMLTemplateElement | null) => void) | import("react").RefObject<HTMLTemplateElement> | null | undefined;
    }, import("../types").BaseObject>;
    tbody: Styled<"web", "tbody", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "ref"> & {
        ref?: ((instance: HTMLTableSectionElement | null) => void) | import("react").RefObject<HTMLTableSectionElement> | null | undefined;
    }, import("../types").BaseObject>;
    td: Styled<"web", "td", Omit<import("react").DetailedHTMLProps<import("react").TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>, "ref"> & {
        ref?: ((instance: HTMLTableDataCellElement | null) => void) | import("react").RefObject<HTMLTableDataCellElement> | null | undefined;
    }, import("../types").BaseObject>;
    textarea: Styled<"web", "textarea", Omit<import("react").DetailedHTMLProps<import("react").TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref"> & {
        ref?: ((instance: HTMLTextAreaElement | null) => void) | import("react").RefObject<HTMLTextAreaElement> | null | undefined;
    }, import("../types").BaseObject>;
    tfoot: Styled<"web", "tfoot", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "ref"> & {
        ref?: ((instance: HTMLTableSectionElement | null) => void) | import("react").RefObject<HTMLTableSectionElement> | null | undefined;
    }, import("../types").BaseObject>;
    th: Styled<"web", "th", Omit<import("react").DetailedHTMLProps<import("react").ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>, "ref"> & {
        ref?: ((instance: HTMLTableHeaderCellElement | null) => void) | import("react").RefObject<HTMLTableHeaderCellElement> | null | undefined;
    }, import("../types").BaseObject>;
    thead: Styled<"web", "thead", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "ref"> & {
        ref?: ((instance: HTMLTableSectionElement | null) => void) | import("react").RefObject<HTMLTableSectionElement> | null | undefined;
    }, import("../types").BaseObject>;
    time: Styled<"web", "time", Omit<import("react").DetailedHTMLProps<import("react").TimeHTMLAttributes<HTMLTimeElement>, HTMLTimeElement>, "ref"> & {
        ref?: ((instance: HTMLTimeElement | null) => void) | import("react").RefObject<HTMLTimeElement> | null | undefined;
    }, import("../types").BaseObject>;
    title: Styled<"web", "title", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>, "ref"> & {
        ref?: ((instance: HTMLTitleElement | null) => void) | import("react").RefObject<HTMLTitleElement> | null | undefined;
    }, import("../types").BaseObject>;
    tr: Styled<"web", "tr", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>, "ref"> & {
        ref?: ((instance: HTMLTableRowElement | null) => void) | import("react").RefObject<HTMLTableRowElement> | null | undefined;
    }, import("../types").BaseObject>;
    track: Styled<"web", "track", Omit<import("react").DetailedHTMLProps<import("react").TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>, "ref"> & {
        ref?: ((instance: HTMLTrackElement | null) => void) | import("react").RefObject<HTMLTrackElement> | null | undefined;
    }, import("../types").BaseObject>;
    u: Styled<"web", "u", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    ul: Styled<"web", "ul", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & {
        ref?: ((instance: HTMLUListElement | null) => void) | import("react").RefObject<HTMLUListElement> | null | undefined;
    }, import("../types").BaseObject>;
    var: Styled<"web", "var", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    video: Styled<"web", "video", Omit<import("react").DetailedHTMLProps<import("react").VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>, "ref"> & {
        ref?: ((instance: HTMLVideoElement | null) => void) | import("react").RefObject<HTMLVideoElement> | null | undefined;
    }, import("../types").BaseObject>;
    wbr: Styled<"web", "wbr", Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
        ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
    }, import("../types").BaseObject>;
    webview: Styled<"web", "webview", Omit<import("react").DetailedHTMLProps<import("react").WebViewHTMLAttributes<HTMLWebViewElement>, HTMLWebViewElement>, "ref"> & {
        ref?: ((instance: HTMLWebViewElement | null) => void) | import("react").RefObject<HTMLWebViewElement> | null | undefined;
    }, import("../types").BaseObject>;
    svg: Styled<"web", "svg", Omit<import("react").SVGProps<SVGSVGElement>, "ref"> & {
        ref?: ((instance: SVGSVGElement | null) => void) | import("react").RefObject<SVGSVGElement> | null | undefined;
    }, import("../types").BaseObject>;
    animate: Styled<"web", "animate", Omit<import("react").SVGProps<SVGElement>, "ref"> & {
        ref?: ((instance: SVGElement | null) => void) | import("react").RefObject<SVGElement> | null | undefined;
    }, import("../types").BaseObject>;
    animateMotion: Styled<"web", "animateMotion", Omit<import("react").SVGProps<SVGElement>, "ref"> & {
        ref?: ((instance: SVGElement | null) => void) | import("react").RefObject<SVGElement> | null | undefined;
    }, import("../types").BaseObject>;
    animateTransform: Styled<"web", "animateTransform", Omit<import("react").SVGProps<SVGElement>, "ref"> & {
        ref?: ((instance: SVGElement | null) => void) | import("react").RefObject<SVGElement> | null | undefined;
    }, import("../types").BaseObject>;
    circle: Styled<"web", "circle", Omit<import("react").SVGProps<SVGCircleElement>, "ref"> & {
        ref?: ((instance: SVGCircleElement | null) => void) | import("react").RefObject<SVGCircleElement> | null | undefined;
    }, import("../types").BaseObject>;
    clipPath: Styled<"web", "clipPath", Omit<import("react").SVGProps<SVGClipPathElement>, "ref"> & {
        ref?: ((instance: SVGClipPathElement | null) => void) | import("react").RefObject<SVGClipPathElement> | null | undefined;
    }, import("../types").BaseObject>;
    defs: Styled<"web", "defs", Omit<import("react").SVGProps<SVGDefsElement>, "ref"> & {
        ref?: ((instance: SVGDefsElement | null) => void) | import("react").RefObject<SVGDefsElement> | null | undefined;
    }, import("../types").BaseObject>;
    desc: Styled<"web", "desc", Omit<import("react").SVGProps<SVGDescElement>, "ref"> & {
        ref?: ((instance: SVGDescElement | null) => void) | import("react").RefObject<SVGDescElement> | null | undefined;
    }, import("../types").BaseObject>;
    ellipse: Styled<"web", "ellipse", Omit<import("react").SVGProps<SVGEllipseElement>, "ref"> & {
        ref?: ((instance: SVGEllipseElement | null) => void) | import("react").RefObject<SVGEllipseElement> | null | undefined;
    }, import("../types").BaseObject>;
    feBlend: Styled<"web", "feBlend", Omit<import("react").SVGProps<SVGFEBlendElement>, "ref"> & {
        ref?: ((instance: SVGFEBlendElement | null) => void) | import("react").RefObject<SVGFEBlendElement> | null | undefined;
    }, import("../types").BaseObject>;
    feColorMatrix: Styled<"web", "feColorMatrix", Omit<import("react").SVGProps<SVGFEColorMatrixElement>, "ref"> & {
        ref?: ((instance: SVGFEColorMatrixElement | null) => void) | import("react").RefObject<SVGFEColorMatrixElement> | null | undefined;
    }, import("../types").BaseObject>;
    feComponentTransfer: Styled<"web", "feComponentTransfer", Omit<import("react").SVGProps<SVGFEComponentTransferElement>, "ref"> & {
        ref?: ((instance: SVGFEComponentTransferElement | null) => void) | import("react").RefObject<SVGFEComponentTransferElement> | null | undefined;
    }, import("../types").BaseObject>;
    feComposite: Styled<"web", "feComposite", Omit<import("react").SVGProps<SVGFECompositeElement>, "ref"> & {
        ref?: ((instance: SVGFECompositeElement | null) => void) | import("react").RefObject<SVGFECompositeElement> | null | undefined;
    }, import("../types").BaseObject>;
    feConvolveMatrix: Styled<"web", "feConvolveMatrix", Omit<import("react").SVGProps<SVGFEConvolveMatrixElement>, "ref"> & {
        ref?: ((instance: SVGFEConvolveMatrixElement | null) => void) | import("react").RefObject<SVGFEConvolveMatrixElement> | null | undefined;
    }, import("../types").BaseObject>;
    feDiffuseLighting: Styled<"web", "feDiffuseLighting", Omit<import("react").SVGProps<SVGFEDiffuseLightingElement>, "ref"> & {
        ref?: ((instance: SVGFEDiffuseLightingElement | null) => void) | import("react").RefObject<SVGFEDiffuseLightingElement> | null | undefined;
    }, import("../types").BaseObject>;
    feDisplacementMap: Styled<"web", "feDisplacementMap", Omit<import("react").SVGProps<SVGFEDisplacementMapElement>, "ref"> & {
        ref?: ((instance: SVGFEDisplacementMapElement | null) => void) | import("react").RefObject<SVGFEDisplacementMapElement> | null | undefined;
    }, import("../types").BaseObject>;
    feDistantLight: Styled<"web", "feDistantLight", Omit<import("react").SVGProps<SVGFEDistantLightElement>, "ref"> & {
        ref?: ((instance: SVGFEDistantLightElement | null) => void) | import("react").RefObject<SVGFEDistantLightElement> | null | undefined;
    }, import("../types").BaseObject>;
    feDropShadow: Styled<"web", "feDropShadow", Omit<import("react").SVGProps<SVGFEDropShadowElement>, "ref"> & {
        ref?: ((instance: SVGFEDropShadowElement | null) => void) | import("react").RefObject<SVGFEDropShadowElement> | null | undefined;
    }, import("../types").BaseObject>;
    feFlood: Styled<"web", "feFlood", Omit<import("react").SVGProps<SVGFEFloodElement>, "ref"> & {
        ref?: ((instance: SVGFEFloodElement | null) => void) | import("react").RefObject<SVGFEFloodElement> | null | undefined;
    }, import("../types").BaseObject>;
    feFuncA: Styled<"web", "feFuncA", Omit<import("react").SVGProps<SVGFEFuncAElement>, "ref"> & {
        ref?: ((instance: SVGFEFuncAElement | null) => void) | import("react").RefObject<SVGFEFuncAElement> | null | undefined;
    }, import("../types").BaseObject>;
    feFuncB: Styled<"web", "feFuncB", Omit<import("react").SVGProps<SVGFEFuncBElement>, "ref"> & {
        ref?: ((instance: SVGFEFuncBElement | null) => void) | import("react").RefObject<SVGFEFuncBElement> | null | undefined;
    }, import("../types").BaseObject>;
    feFuncG: Styled<"web", "feFuncG", Omit<import("react").SVGProps<SVGFEFuncGElement>, "ref"> & {
        ref?: ((instance: SVGFEFuncGElement | null) => void) | import("react").RefObject<SVGFEFuncGElement> | null | undefined;
    }, import("../types").BaseObject>;
    feFuncR: Styled<"web", "feFuncR", Omit<import("react").SVGProps<SVGFEFuncRElement>, "ref"> & {
        ref?: ((instance: SVGFEFuncRElement | null) => void) | import("react").RefObject<SVGFEFuncRElement> | null | undefined;
    }, import("../types").BaseObject>;
    feGaussianBlur: Styled<"web", "feGaussianBlur", Omit<import("react").SVGProps<SVGFEGaussianBlurElement>, "ref"> & {
        ref?: ((instance: SVGFEGaussianBlurElement | null) => void) | import("react").RefObject<SVGFEGaussianBlurElement> | null | undefined;
    }, import("../types").BaseObject>;
    feImage: Styled<"web", "feImage", Omit<import("react").SVGProps<SVGFEImageElement>, "ref"> & {
        ref?: ((instance: SVGFEImageElement | null) => void) | import("react").RefObject<SVGFEImageElement> | null | undefined;
    }, import("../types").BaseObject>;
    feMerge: Styled<"web", "feMerge", Omit<import("react").SVGProps<SVGFEMergeElement>, "ref"> & {
        ref?: ((instance: SVGFEMergeElement | null) => void) | import("react").RefObject<SVGFEMergeElement> | null | undefined;
    }, import("../types").BaseObject>;
    feMergeNode: Styled<"web", "feMergeNode", Omit<import("react").SVGProps<SVGFEMergeNodeElement>, "ref"> & {
        ref?: ((instance: SVGFEMergeNodeElement | null) => void) | import("react").RefObject<SVGFEMergeNodeElement> | null | undefined;
    }, import("../types").BaseObject>;
    feMorphology: Styled<"web", "feMorphology", Omit<import("react").SVGProps<SVGFEMorphologyElement>, "ref"> & {
        ref?: ((instance: SVGFEMorphologyElement | null) => void) | import("react").RefObject<SVGFEMorphologyElement> | null | undefined;
    }, import("../types").BaseObject>;
    feOffset: Styled<"web", "feOffset", Omit<import("react").SVGProps<SVGFEOffsetElement>, "ref"> & {
        ref?: ((instance: SVGFEOffsetElement | null) => void) | import("react").RefObject<SVGFEOffsetElement> | null | undefined;
    }, import("../types").BaseObject>;
    fePointLight: Styled<"web", "fePointLight", Omit<import("react").SVGProps<SVGFEPointLightElement>, "ref"> & {
        ref?: ((instance: SVGFEPointLightElement | null) => void) | import("react").RefObject<SVGFEPointLightElement> | null | undefined;
    }, import("../types").BaseObject>;
    feSpecularLighting: Styled<"web", "feSpecularLighting", Omit<import("react").SVGProps<SVGFESpecularLightingElement>, "ref"> & {
        ref?: ((instance: SVGFESpecularLightingElement | null) => void) | import("react").RefObject<SVGFESpecularLightingElement> | null | undefined;
    }, import("../types").BaseObject>;
    feSpotLight: Styled<"web", "feSpotLight", Omit<import("react").SVGProps<SVGFESpotLightElement>, "ref"> & {
        ref?: ((instance: SVGFESpotLightElement | null) => void) | import("react").RefObject<SVGFESpotLightElement> | null | undefined;
    }, import("../types").BaseObject>;
    feTile: Styled<"web", "feTile", Omit<import("react").SVGProps<SVGFETileElement>, "ref"> & {
        ref?: ((instance: SVGFETileElement | null) => void) | import("react").RefObject<SVGFETileElement> | null | undefined;
    }, import("../types").BaseObject>;
    feTurbulence: Styled<"web", "feTurbulence", Omit<import("react").SVGProps<SVGFETurbulenceElement>, "ref"> & {
        ref?: ((instance: SVGFETurbulenceElement | null) => void) | import("react").RefObject<SVGFETurbulenceElement> | null | undefined;
    }, import("../types").BaseObject>;
    filter: Styled<"web", "filter", Omit<import("react").SVGProps<SVGFilterElement>, "ref"> & {
        ref?: ((instance: SVGFilterElement | null) => void) | import("react").RefObject<SVGFilterElement> | null | undefined;
    }, import("../types").BaseObject>;
    foreignObject: Styled<"web", "foreignObject", Omit<import("react").SVGProps<SVGForeignObjectElement>, "ref"> & {
        ref?: ((instance: SVGForeignObjectElement | null) => void) | import("react").RefObject<SVGForeignObjectElement> | null | undefined;
    }, import("../types").BaseObject>;
    g: Styled<"web", "g", Omit<import("react").SVGProps<SVGGElement>, "ref"> & {
        ref?: ((instance: SVGGElement | null) => void) | import("react").RefObject<SVGGElement> | null | undefined;
    }, import("../types").BaseObject>;
    image: Styled<"web", "image", Omit<import("react").SVGProps<SVGImageElement>, "ref"> & {
        ref?: ((instance: SVGImageElement | null) => void) | import("react").RefObject<SVGImageElement> | null | undefined;
    }, import("../types").BaseObject>;
    line: Styled<"web", "line", Omit<import("react").SVGLineElementAttributes<SVGLineElement>, "ref"> & {
        ref?: ((instance: SVGLineElement | null) => void) | import("react").RefObject<SVGLineElement> | null | undefined;
    }, import("../types").BaseObject>;
    linearGradient: Styled<"web", "linearGradient", Omit<import("react").SVGProps<SVGLinearGradientElement>, "ref"> & {
        ref?: ((instance: SVGLinearGradientElement | null) => void) | import("react").RefObject<SVGLinearGradientElement> | null | undefined;
    }, import("../types").BaseObject>;
    marker: Styled<"web", "marker", Omit<import("react").SVGProps<SVGMarkerElement>, "ref"> & {
        ref?: ((instance: SVGMarkerElement | null) => void) | import("react").RefObject<SVGMarkerElement> | null | undefined;
    }, import("../types").BaseObject>;
    mask: Styled<"web", "mask", Omit<import("react").SVGProps<SVGMaskElement>, "ref"> & {
        ref?: ((instance: SVGMaskElement | null) => void) | import("react").RefObject<SVGMaskElement> | null | undefined;
    }, import("../types").BaseObject>;
    metadata: Styled<"web", "metadata", Omit<import("react").SVGProps<SVGMetadataElement>, "ref"> & {
        ref?: ((instance: SVGMetadataElement | null) => void) | import("react").RefObject<SVGMetadataElement> | null | undefined;
    }, import("../types").BaseObject>;
    mpath: Styled<"web", "mpath", Omit<import("react").SVGProps<SVGElement>, "ref"> & {
        ref?: ((instance: SVGElement | null) => void) | import("react").RefObject<SVGElement> | null | undefined;
    }, import("../types").BaseObject>;
    path: Styled<"web", "path", Omit<import("react").SVGProps<SVGPathElement>, "ref"> & {
        ref?: ((instance: SVGPathElement | null) => void) | import("react").RefObject<SVGPathElement> | null | undefined;
    }, import("../types").BaseObject>;
    pattern: Styled<"web", "pattern", Omit<import("react").SVGProps<SVGPatternElement>, "ref"> & {
        ref?: ((instance: SVGPatternElement | null) => void) | import("react").RefObject<SVGPatternElement> | null | undefined;
    }, import("../types").BaseObject>;
    polygon: Styled<"web", "polygon", Omit<import("react").SVGProps<SVGPolygonElement>, "ref"> & {
        ref?: ((instance: SVGPolygonElement | null) => void) | import("react").RefObject<SVGPolygonElement> | null | undefined;
    }, import("../types").BaseObject>;
    polyline: Styled<"web", "polyline", Omit<import("react").SVGProps<SVGPolylineElement>, "ref"> & {
        ref?: ((instance: SVGPolylineElement | null) => void) | import("react").RefObject<SVGPolylineElement> | null | undefined;
    }, import("../types").BaseObject>;
    radialGradient: Styled<"web", "radialGradient", Omit<import("react").SVGProps<SVGRadialGradientElement>, "ref"> & {
        ref?: ((instance: SVGRadialGradientElement | null) => void) | import("react").RefObject<SVGRadialGradientElement> | null | undefined;
    }, import("../types").BaseObject>;
    rect: Styled<"web", "rect", Omit<import("react").SVGProps<SVGRectElement>, "ref"> & {
        ref?: ((instance: SVGRectElement | null) => void) | import("react").RefObject<SVGRectElement> | null | undefined;
    }, import("../types").BaseObject>;
    stop: Styled<"web", "stop", Omit<import("react").SVGProps<SVGStopElement>, "ref"> & {
        ref?: ((instance: SVGStopElement | null) => void) | import("react").RefObject<SVGStopElement> | null | undefined;
    }, import("../types").BaseObject>;
    switch: Styled<"web", "switch", Omit<import("react").SVGProps<SVGSwitchElement>, "ref"> & {
        ref?: ((instance: SVGSwitchElement | null) => void) | import("react").RefObject<SVGSwitchElement> | null | undefined;
    }, import("../types").BaseObject>;
    symbol: Styled<"web", "symbol", import("../types").BaseObject, import("../types").BaseObject>;
    text: Styled<"web", "text", Omit<import("react").SVGTextElementAttributes<SVGTextElement>, "ref"> & {
        ref?: ((instance: SVGTextElement | null) => void) | import("react").RefObject<SVGTextElement> | null | undefined;
    }, import("../types").BaseObject>;
    textPath: Styled<"web", "textPath", Omit<import("react").SVGProps<SVGTextPathElement>, "ref"> & {
        ref?: ((instance: SVGTextPathElement | null) => void) | import("react").RefObject<SVGTextPathElement> | null | undefined;
    }, import("../types").BaseObject>;
    tspan: Styled<"web", "tspan", Omit<import("react").SVGProps<SVGTSpanElement>, "ref"> & {
        ref?: ((instance: SVGTSpanElement | null) => void) | import("react").RefObject<SVGTSpanElement> | null | undefined;
    }, import("../types").BaseObject>;
    use: Styled<"web", "use", Omit<import("react").SVGProps<SVGUseElement>, "ref"> & {
        ref?: ((instance: SVGUseElement | null) => void) | import("react").RefObject<SVGUseElement> | null | undefined;
    }, import("../types").BaseObject>;
    view: Styled<"web", "view", Omit<import("react").SVGProps<SVGViewElement>, "ref"> & {
        ref?: ((instance: SVGViewElement | null) => void) | import("react").RefObject<SVGViewElement> | null | undefined;
    }, import("../types").BaseObject>;
};
export default styled;
