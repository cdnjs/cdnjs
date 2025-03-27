import { VideomailClientOptions } from "../types/options";
import { VideoType } from "../types/VideoType";
declare class Browser {
    private options;
    private result;
    private videoType;
    constructor(options: VideomailClientOptions);
    isIOS(): boolean;
    private getBrowserVersion;
    private isChrome;
    private isChromium;
    isFirefox(): boolean;
    private isSafari;
    isAndroid(): boolean;
    isChromeBased(): boolean;
    isMobile(): boolean;
    isOkSafari(): boolean;
    getVideoType(video: HTMLVideoElement): VideoType;
    getNoAccessIssue(): import("./error/VideomailError").default;
    getUsefulData(): {
        ua: string;
        browser: import("ua-parser-js").IBrowser;
        cpu: import("ua-parser-js").ICPU;
        device: import("ua-parser-js").IDevice;
        engine: import("ua-parser-js").IEngine;
        os: import("ua-parser-js").IOS;
    };
}
export default Browser;
