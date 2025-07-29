type Link = {
    [key: string]: string | number | boolean;
};
type Opts = {
    character?: string;
    classname?: string;
    spaces?: boolean;
    charclassname?: string;
    link?: Link;
    delimiter?: string;
};

interface Plugin {
    fn: {
        shave: (maxHeight: number, opts?: Opts) => void;
    };
}
declare global {
    interface Window {
        $: Plugin;
        jQuery: Plugin;
        Zepto: Plugin;
    }
}
