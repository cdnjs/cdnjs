///<reference path="../reference.ts" />

module Plottable {
export module RenderPolicies {
  /**
   * A policy for rendering Components.
   */
  export interface RenderPolicy {
    render(): any;
  }

  /**
   * Renders Components immediately after they are enqueued.
   * Useful for debugging, horrible for performance.
   */
  export class Immediate implements RenderPolicy {
    public render() {
      RenderController.flush();
    }
  }

  /**
   * The default way to render, which only tries to render every frame
   * (usually, 1/60th of a second).
   */
  export class AnimationFrame implements RenderPolicy {
    public render() {
      Utils.DOM.requestAnimationFramePolyfill(RenderController.flush);
    }
  }

  /**
   * Renders with `setTimeout()`.
   * Generally an inferior way to render compared to `requestAnimationFrame`,
   * but useful for browsers that don't suppoort `requestAnimationFrame`.
   */
  export class Timeout implements RenderPolicy {
    private _timeoutMsec: number = Utils.DOM.SCREEN_REFRESH_RATE_MILLISECONDS;

    public render() {
      setTimeout(RenderController.flush, this._timeoutMsec);
    }
  }
}
}
