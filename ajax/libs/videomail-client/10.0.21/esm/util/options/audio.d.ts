import { VideomailClientOptions } from "../../types/options";
declare function isAudioEnabled(options: VideomailClientOptions): boolean;
declare function setAudioEnabled(enabled: boolean, options: VideomailClientOptions): VideomailClientOptions;
declare function isAutoPauseEnabled(options: VideomailClientOptions): boolean;
export { isAudioEnabled, setAudioEnabled, isAutoPauseEnabled };
