(function(Blotter) {

  Blotter.ChannelSplitMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.ChannelSplitMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.ChannelSplitMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.PI,
        Blotter.Assets.Shaders.LineMath,
        Blotter.Assets.Shaders.Random,


        "const int MAX_STEPS = 200;",


        "// Fix a floating point number to two decimal places",
        "float toFixedTwo(float f) {",
        "    return float(int(f * 100.0)) / 100.0;",
        "}",


        "vec2 motionBlurOffsets(vec2 fragCoord, float deg, float spread) {",

        "    // Setup",
        "    // -------------------------------",

        "    vec2 centerUv = vec2(0.5);",
        "    vec2 centerCoord = uResolution.xy * centerUv;",

        "    deg = toFixedTwo(deg);",
        "    float slope = normalizedSlope(slopeForDegrees(deg), uResolution.xy);",


        "    // Find offsets",
        "    // -------------------------------",

        "    vec2 k = offsetsForCoordAtDistanceOnSlope(spread, slope);",
        "    if (deg <= 90.0 || deg >= 270.0) {",
        "        k *= -1.0;",
        "    }",


        "    return k;",
        "}",


        "float noiseWithWidthAtUv(float width, vec2 uv) {",
        "    float noiseModifier = 1.0;",
        "    if (uAnimateNoise > 0.0) {",
        "        noiseModifier = sin(uGlobalTime);",
        "    }",

        "    vec2 noiseRowCol = floor((uv * uResolution.xy) / width);",
        "    vec2 noiseFragCoord = ((noiseRowCol * width) + (width / 2.0));",
        "    vec2 noiseUv = noiseFragCoord / uResolution.xy;",

        "    return random(noiseUv * noiseModifier) * 0.125;",
        "}",


        "vec4 motionBlur(vec2 uv, vec2 blurOffset, float maxOffset) {",
        "    float noiseWidth = 3.0;",
        "    float randNoise = noiseWithWidthAtUv(noiseWidth, uv);",

        "    vec4 result = textTexture(uv);",

        "    float maxStepsReached = 0.0;",

        "    // Note: Step by 2 to optimize performance. We conceal lossiness here via applied noise.",
        "    //   If you do want maximum fidelity, change `i += 2` to `i += 1` below.",
        "    for (int i = 1; i <= MAX_STEPS; i += 2) {",
        "        if (abs(float(i)) > maxOffset) { break; }",
        "        maxStepsReached += 1.0;",

        "        // Divide blurOffset by 2.0 so that motion blur starts half way behind itself",
        "        //   preventing blur from shoving samples in any direction",
        "        vec2 offset = (blurOffset / 2.0) - (blurOffset * (float(i) / maxOffset));",
        "        vec4 stepSample = textTexture(uv + (offset / uResolution.xy));",,

        "        result += stepSample;",
        "    }",

        "    if (maxOffset >= 1.0) {",
        "        result /= maxStepsReached;",
        "        //result.a = pow(result.a, 2.0); // Apply logarithmic smoothing to alpha",
        "        result.a -= (randNoise * (1.0 - result.a)); // Apply noise to smoothed alpha",
        "    }",


        "    return result;",
        "}",


        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",

        "    // Setup",
        "    // -------------------------------",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",

        "    float offset = min(float(MAX_STEPS), uResolution.y * uOffset);",

        "    float slope = normalizedSlope(slopeForDegrees(uRotation), uResolution);",

        "    // We want the blur to be the full offset amount in each direction",
        "    //   and to adjust with our logarithmic adjustment made later, so multiply by 4",
        "    float adjustedOffset = offset;// * 4.0;",

        "    vec2 blurOffset = motionBlurOffsets(fragCoord, uRotation, adjustedOffset);",


        "    // Set Starting Points",
        "    // -------------------------------",

        "    vec2 rUv = uv;",
        "    vec2 gUv = uv;",
        "    vec2 bUv = uv;",

        "    vec2 k = offsetsForCoordAtDistanceOnSlope(offset, slope) / uResolution;",

        "    if (uRotation <= 90.0 || uRotation >= 270.0) {",
        "        rUv += k;",
        "        bUv -= k;",
        "    }",
        "    else {",
        "        rUv -= k;",
        "        bUv += k;",
        "    }",


        "    // Blur and Split Channels",
        "    // -------------------------------",

        "    vec4 resultR = vec4(0.0);",
        "    vec4 resultG = vec4(0.0);",
        "    vec4 resultB = vec4(0.0);",

        "    if (uApplyBlur > 0.0) {",
        "        resultR = motionBlur(rUv, blurOffset, adjustedOffset);",
        "        resultG = motionBlur(gUv, blurOffset, adjustedOffset);",
        "        resultB = motionBlur(bUv, blurOffset, adjustedOffset);",
        "    } else {",
        "        resultR = textTexture(rUv);",
        "        resultG = textTexture(gUv);",
        "        resultB = textTexture(bUv);",
        "    }",

        "    float a = resultR.a + resultG.a + resultB.a;",

        "    resultR = normalBlend(resultR, uBlendColor);",
        "    resultG = normalBlend(resultG, uBlendColor);",
        "    resultB = normalBlend(resultB, uBlendColor);",



        "    mainImage = vec4(resultR.r, resultG.g, resultB.b, a);",
        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.ChannelSplitMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
          uOffset : { type : "1f", value : 0.05 },
          uRotation : { type : "1f", value : 45.0 },
          uApplyBlur : { type : "1f", value : 1.0 },
          uAnimateNoise : { type : "1f", value : 1.0 }
        };
      }
    };

  })());

})(
  this.Blotter
);
