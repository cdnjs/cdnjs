///<reference path="../reference.ts" />

module Plottable {
export module Utils {
  export module Window {

    /**
     * Print a warning message to the console, if it is available.
     *
     * @param {string} The warnings to print
     */
    export function warn(warning: string) {
      if (!Configs.SHOW_WARNINGS) {
        return;
      }
      /* tslint:disable:no-console */
      if ((<any> window).console != null) {
        if ((<any> window).console.warn != null) {
          console.warn(warning);
        } else if ((<any> window).console.log != null) {
          console.log(warning);
        }
      }
      /* tslint:enable:no-console */
    }

    /**
     * Is like setTimeout, but activates synchronously if time=0
     * We special case 0 because of an observed issue where calling setTimeout causes visible flickering.
     * We believe this is because when requestAnimationFrame calls into the paint function, as soon as that function finishes
     * evaluating, the results are painted to the screen. As a result, if we want something to occur immediately but call setTimeout
     * with time=0, then it is pushed to the call stack and rendered in the next frame, so the component that was rendered via
     * setTimeout appears out-of-sync with the rest of the plot.
     */
    export function setTimeout(f: Function, time: number, ...args: any[]) {
      if (time === 0) {
        f(args);
        return -1;
      } else {
        return window.setTimeout(f, time, args);
      }
    }

  }
}
}
