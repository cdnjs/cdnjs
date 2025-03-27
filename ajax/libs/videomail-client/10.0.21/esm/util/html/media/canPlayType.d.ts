import { VideoType } from "../../../types/VideoType";
declare function canPlayType(video: HTMLVideoElement, type: VideoType): false | "maybe" | "probably";
export default canPlayType;
