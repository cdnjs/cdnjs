/*!
 * PixiJS - v8.2.5
 * Compiled Fri, 12 Jul 2024 12:30:00 UTC
 *
 * PixiJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
var advanced_blend_modes_js = (function (exports) {
    'use strict';

    "use strict";




    class ColorBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                ${PIXI.hslgl}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                finalColor = vec4(blendColor(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                ${PIXI.hslgpu}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `
          }
        });
      }
    }
    /** @ignore */
    ColorBlend.extension = {
      name: "color",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class ColorBurnBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                float colorBurn(float base, float blend)
                {
                    return max((1.0 - ((1.0 - base) / blend)), 0.0);
                }

                vec3 blendColorBurn(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        colorBurn(base.r, blend.r),
                        colorBurn(base.g, blend.g),
                        colorBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                finalColor = vec4(blendColorBurn(back.rgb, front.rgb, front.a), uBlend);
            `
          },
          gpu: {
            functions: `
                fn colorBurn(base:f32, blend:f32) -> f32
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                fn blendColorBurn(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        colorBurn(base.r, blend.r),
                        colorBurn(base.g, blend.g),
                        colorBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                out = vec4<f32>(blendColorBurn(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `
          }
        });
      }
    }
    /** @ignore */
    ColorBurnBlend.extension = {
      name: "color-burn",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class ColorDodgeBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                float colorDodge(float base, float blend)
                {
                    return base / (1.0 - blend);
                }

                vec3 blendColorDodge(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        colorDodge(base.r, blend.r),
                        colorDodge(base.g, blend.g),
                        colorDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                finalColor = vec4(blendColorDodge(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                fn colorDodge(base: f32, blend: f32) -> f32
                {
                    return base / (1.0 - blend);
                }

                fn blendColorDodge(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        colorDodge(base.r, blend.r),
                        colorDodge(base.g, blend.g),
                        colorDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                    out = vec4<f32>(blendColorDodge(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `
          }
        });
      }
    }
    /** @ignore */
    ColorDodgeBlend.extension = {
      name: "color-dodge",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class DarkenBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                vec3 blendDarken(vec3 base, vec3 blend, float opacity)
                {
                    return (min(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                finalColor = vec4(blendDarken(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                fn blendDarken(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (min(blend,base) * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                out = vec4<f32>(blendDarken(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `
          }
        });
      }
    }
    /** @ignore */
    DarkenBlend.extension = {
      name: "darken",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class DifferenceBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                vec3 blendDifference(vec3 base, vec3 blend,  float opacity)
                {
                    return (abs(blend - base) * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                finalColor = vec4(blendDifference(back.rgb, front.rgb, front.a), uBlend);
            `
          },
          gpu: {
            functions: `
                fn blendDifference(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (abs(blend - base) * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                out = vec4<f32>(blendDifference(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `
          }
        });
      }
    }
    /** @ignore */
    DifferenceBlend.extension = {
      name: "difference",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class DivideBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                float divide(float base, float blend)
                {
                    return (blend > 0.0) ? clamp(base / blend, 0.0, 1.0) : 1.0;
                }

                vec3 blendDivide(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        divide(base.r, blend.r),
                        divide(base.g, blend.g),
                        divide(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                finalColor = vec4(blendDivide(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                fn divide(base: f32, blend: f32) -> f32
                {
                    return select(1.0, clamp(base / blend, 0.0, 1.0), blend > 0.0);
                }

                fn blendDivide(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        divide(base.r, blend.r),
                        divide(base.g, blend.g),
                        divide(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                out = vec4<f32>(blendDivide(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `
          }
        });
      }
    }
    /** @ignore */
    DivideBlend.extension = {
      name: "divide",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class ExclusionBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                vec3 exclusion(vec3 base, vec3 blend)
                {
                    return base + blend - 2.0 * base * blend;
                }

                vec3 blendExclusion(vec3 base, vec3 blend, float opacity)
                {
                    return (exclusion(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                finalColor = vec4(blendExclusion(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                fn exclusion(base: vec3<f32>, blend: vec3<f32>) -> vec3<f32>
                {
                    return base+blend-2.0*base*blend;
                }

                fn blendExclusion(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    return (exclusion(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                out = vec4<f32>(blendExclusion(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `
          }
        });
      }
    }
    /** @ignore */
    ExclusionBlend.extension = {
      name: "exclusion",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class HardLightBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                float hardLight(float base, float blend)
                {
                    return (blend < 0.5) ? 2.0 * base * blend : 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
                }

                vec3 blendHardLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        hardLight(base.r, blend.r),
                        hardLight(base.g, blend.g),
                        hardLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                finalColor = vec4(blendHardLight(back.rgb, front.rgb, front.a), uBlend);
            `
          },
          gpu: {
            functions: `
                fn hardLight(base: f32, blend: f32) -> f32
                {
                    return select(1.0 - 2.0 * (1.0 - base) * (1.0 - blend), 2.0 * base * blend, blend < 0.5);
                }

                fn blendHardLight(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        hardLight(base.r, blend.r),
                        hardLight(base.g, blend.g),
                        hardLight(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                out = vec4<f32>(blendHardLight(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `
          }
        });
      }
    }
    /** @ignore */
    HardLightBlend.extension = {
      name: "hard-light",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class HardMixBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                float hardMix(float base, float blend)
                {
                    return (base + blend >= 1.0) ? 1.0 : 0.0;
                }

                vec3 blendHardMix(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blended = vec3(
                        hardMix(base.r, blend.r),
                        hardMix(base.g, blend.g),
                        hardMix(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                finalColor = vec4(blendHardMix(back.rgb, front.rgb, front.a), uBlend);
            `
          },
          gpu: {
            functions: `
                fn hardMix(base: f32, blend: f32) -> f32
                {
                    return select(0.0, 1.0, base + blend >= 1.0);
                }

                fn blendHardMix(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        hardMix(base.r, blend.r),
                        hardMix(base.g, blend.g),
                        hardMix(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                out = vec4<f32>(blendHardMix(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `
          }
        });
      }
    }
    /** @ignore */
    HardMixBlend.extension = {
      name: "hard-mix",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class LightenBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                vec3 blendLighten(vec3 base, vec3 blend, float opacity)
                {
                    return (max(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                finalColor = vec4(blendLighten(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                fn blendLighten(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (max(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                out = vec4<f32>(blendLighten(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `
          }
        });
      }
    }
    /** @ignore */
    LightenBlend.extension = {
      name: "lighten",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class LinearBurnBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                float linearBurn(float base, float blend)
                {
                    return max(0.0, base + blend - 1.0);
                }

                vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        linearBurn(base.r, blend.r),
                        linearBurn(base.g, blend.g),
                        linearBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                finalColor = vec4(blendLinearBurn(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                fn linearBurn(base: f32, blend: f32) -> f32
                {
                    return max(0.0, base + blend - 1.0);
                }

                fn blendLinearBurn(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearBurn(base.r, blend.r),
                        linearBurn(base.g, blend.g),
                        linearBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                out = vec4<f32>(blendLinearBurn(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `
          }
        });
      }
    }
    /** @ignore */
    LinearBurnBlend.extension = {
      name: "linear-burn",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class LinearDodgeBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                float linearDodge(float base, float blend) {
                    return min(1.0, base + blend);
                }

                vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
                    vec3 blended = vec3(
                        linearDodge(base.r, blend.r),
                        linearDodge(base.g, blend.g),
                        linearDodge(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                finalColor = vec4(blendLinearDodge(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                fn linearDodge(base: f32, blend: f32) -> f32
                {
                    return min(1, base + blend);
                }

                fn blendLinearDodge(base:vec3<f32>, blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearDodge(base.r, blend.r),
                        linearDodge(base.g, blend.g),
                        linearDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                out = vec4<f32>(blendLinearDodge(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `
          }
        });
      }
    }
    /** @ignore */
    LinearDodgeBlend.extension = {
      name: "linear-dodge",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class LinearLightBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                float linearBurn(float base, float blend) {
                    return max(0.0, base + blend - 1.0);
                }

                float linearDodge(float base, float blend) {
                    return min(1.0, base + blend);
                }

                float linearLight(float base, float blend) {
                    return (blend <= 0.5) ? linearBurn(base,2.0*blend) : linearBurn(base,2.0*(blend-0.5));
                }

                vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
                    vec3 blended = vec3(
                        linearLight(base.r, blend.r),
                        linearLight(base.g, blend.g),
                        linearLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                finalColor = vec4(blendLinearLight(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                fn linearBurn(base: f32, blend: f32) -> f32
                {
                    return max(0.0, base + blend - 1.0);
                }

                fn linearDodge(base: f32, blend: f32) -> f32
                {
                    return min(1.0, base + blend);
                }

                fn linearLight(base: f32, blend: f32) -> f32
                {
                    return select(linearBurn(base,2.0*(blend-0.5)), linearBurn(base,2.0*blend), blend <= 0.5);
                }

                fn blendLinearLightOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearLight(base.r, blend.r),
                        linearLight(base.g, blend.g),
                        linearLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                out = vec4<f32>(blendLinearLightOpacity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `
          }
        });
      }
    }
    /** @ignore */
    LinearLightBlend.extension = {
      name: "linear-light",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";




    class LuminosityBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                ${PIXI.hslgl}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                ${PIXI.hslgpu}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `
          }
        });
      }
    }
    /** @ignore */
    LuminosityBlend.extension = {
      name: "luminosity",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class NegationBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                vec3 negation(vec3 base, vec3 blend)
                {
                    return 1.0-abs(1.0-base-blend);
                }

                vec3 blendNegation(vec3 base, vec3 blend, float opacity)
                {
                    return (negation(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                finalColor = vec4(blendNegation(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                fn blendNegation(base: vec3<f32>, blend: vec3<f32>) -> vec3<f32>
                {
                    return 1.0-abs(1.0-base-blend);
                }

                fn blendNegationOpacity(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    return (blendNegation(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                out = vec4<f32>(blendNegationOpacity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `
          }
        });
      }
    }
    /** @ignore */
    NegationBlend.extension = {
      name: "negation",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class OverlayBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                float overlay(float base, float blend)
                {
                    return (base < 0.5) ? (2.0*base*blend) : (1.0-2.0*(1.0-base)*(1.0-blend));
                }

                vec3 blendOverlay(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        overlay(base.r, blend.r),
                        overlay(base.g, blend.g),
                        overlay(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                finalColor = vec4(blendOverlay(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                fn overlay(base: f32, blend: f32) -> f32
                {
                    return select((1.0-2.0*(1.0-base)*(1.0-blend)), (2.0*base*blend), base < 0.5);
                }

                fn blendOverlay(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        overlay(base.r, blend.r),
                        overlay(base.g, blend.g),
                        overlay(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                out = vec4<f32>(blendOverlay(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `
          }
        });
      }
    }
    /** @ignore */
    OverlayBlend.extension = {
      name: "overlay",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class PinLightBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                float pinLight(float base, float blend)
                {
                    return (blend <= 0.5) ? min(base, 2.0 * blend) : max(base, 2.0 * (blend - 0.5));
                }

                vec3 blendPinLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        pinLight(base.r, blend.r),
                        pinLight(base.g, blend.g),
                        pinLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                finalColor = vec4(blendPinLight(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                fn pinLight(base: f32, blend: f32) -> f32
                {
                    return select(max(base,2.0*(blend-0.5)), min(base,2.0*blend), blend <= 0.5);
                }

                fn blendPinLight(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        pinLight(base.r, blend.r),
                        pinLight(base.g, blend.g),
                        pinLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                out = vec4<f32>(blendPinLight(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `
          }
        });
      }
    }
    /** @ignore */
    PinLightBlend.extension = {
      name: "pin-light",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";




    class SaturationBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                ${PIXI.hslgl}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), uBlend);
            `
          },
          gpu: {
            functions: `
                ${PIXI.hslgpu}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `
          }
        });
      }
    }
    /** @ignore */
    SaturationBlend.extension = {
      name: "saturation",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class SoftLightBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                float softLight(float base, float blend)
                {
                    return (blend < 0.5) ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend));
                }

                vec3 blendSoftLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        softLight(base.r, blend.r),
                        softLight(base.g, blend.g),
                        softLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                finalColor = vec4(blendSoftLight(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                fn softLight(base: f32, blend: f32) -> f32
                {
                    return select(2.0 * base * blend + base * base * (1.0 - 2.0 * blend), sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend), blend < 0.5);
                }

                fn blendSoftLight(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        softLight(base.r, blend.r),
                        softLight(base.g, blend.g),
                        softLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                out = vec4<f32>(blendSoftLight(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `
          }
        });
      }
    }
    /** @ignore */
    SoftLightBlend.extension = {
      name: "soft-light",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class SubtractBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                float subtract(float base, float blend)
                {
                    return max(0.0, base - blend);
                }

                vec3 blendSubtract(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        subtract(base.r, blend.r),
                        subtract(base.g, blend.g),
                        subtract(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                finalColor = vec4(blendSubtract(back.rgb, front.rgb, front.a), uBlend);
                `
          },
          gpu: {
            functions: `
                fn subtract(base: f32, blend: f32) -> f32
                {
                    return max(0, base - blend);
                }

                fn blendSubtract(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        subtract(base.r, blend.r),
                        subtract(base.g, blend.g),
                        subtract(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                out = vec4<f32>(blendSubtract(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `
          }
        });
      }
    }
    /** @ignore */
    SubtractBlend.extension = {
      name: "subtract",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";


    class VividLightBlend extends PIXI.BlendModeFilter {
      constructor() {
        super({
          gl: {
            functions: `
                float colorBurn(float base, float blend)
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                float colorDodge(float base, float blend)
                {
                    return min(1.0, base / (1.0-blend));
                }

                float vividLight(float base, float blend)
                {
                    return (blend < 0.5) ? colorBurn(base,(2.0*blend)) : colorDodge(base,(2.0*(blend-0.5)));
                }

                vec3 blendVividLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        vividLight(base.r, blend.r),
                        vividLight(base.g, blend.g),
                        vividLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
            main: `
                finalColor = vec4(blendVividLight(back.rgb, front.rgb, front.a), uBlend);
            `
          },
          gpu: {
            functions: `
                fn colorBurn(base:f32, blend:f32) -> f32
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                fn colorDodge(base: f32, blend: f32) -> f32
                {
                    return min(1.0, base / (1.0-blend));
                }

                fn vividLight(base: f32, blend: f32) -> f32
                {
                    return select(colorDodge(base,(2.0*(blend-0.5))), colorBurn(base,(2.0*blend)), blend<0.5);
                }

                fn blendVividLight(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        vividLight(base.r, blend.r),
                        vividLight(base.g, blend.g),
                        vividLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
            main: `
                out = vec4<f32>(blendVividLight(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `
          }
        });
      }
    }
    /** @ignore */
    VividLightBlend.extension = {
      name: "vivid-light",
      type: PIXI.ExtensionType.BlendMode
    };

    "use strict";
    PIXI.extensions.add(
      ColorBlend,
      ColorBurnBlend,
      ColorDodgeBlend,
      DarkenBlend,
      DifferenceBlend,
      DivideBlend,
      ExclusionBlend,
      HardLightBlend,
      HardMixBlend,
      LightenBlend,
      LinearBurnBlend,
      LinearLightBlend,
      LinearDodgeBlend,
      LuminosityBlend,
      NegationBlend,
      OverlayBlend,
      PinLightBlend,
      SaturationBlend,
      SoftLightBlend,
      SubtractBlend,
      VividLightBlend
    );

    "use strict";

    "use strict";

    exports.ColorBlend = ColorBlend;
    exports.ColorBurnBlend = ColorBurnBlend;
    exports.ColorDodgeBlend = ColorDodgeBlend;
    exports.DarkenBlend = DarkenBlend;
    exports.DifferenceBlend = DifferenceBlend;
    exports.DivideBlend = DivideBlend;
    exports.ExclusionBlend = ExclusionBlend;
    exports.HardLightBlend = HardLightBlend;
    exports.HardMixBlend = HardMixBlend;
    exports.LightenBlend = LightenBlend;
    exports.LinearBurnBlend = LinearBurnBlend;
    exports.LinearDodgeBlend = LinearDodgeBlend;
    exports.LinearLightBlend = LinearLightBlend;
    exports.LuminosityBlend = LuminosityBlend;
    exports.NegationBlend = NegationBlend;
    exports.OverlayBlend = OverlayBlend;
    exports.PinLightBlend = PinLightBlend;
    exports.SaturationBlend = SaturationBlend;
    exports.SoftLightBlend = SoftLightBlend;
    exports.SubtractBlend = SubtractBlend;
    exports.VividLightBlend = VividLightBlend;

    return exports;

})({});
Object.assign(this.PIXI, advanced_blend_modes_js);
//# sourceMappingURL=advanced-blend-modes.js.map
