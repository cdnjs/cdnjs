import { El, CursorOptions } from "../types";
interface rebuildCursorAnimationArgs {
    cursor: El | undefined;
    cursorOptions: CursorOptions;
    options: any;
}
declare let rebuildCursorAnimation: ({ cursor, options, cursorOptions, }: rebuildCursorAnimationArgs) => Animation;
export default rebuildCursorAnimation;
