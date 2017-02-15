'use strict';

exports.__esModule = true;

var _core = require('../../core');

var core = _interopRequireWildcard(_core);

var _path = require('path');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * Basic FXAA implementation based on the code on geeks3d.com with the
 * modification that the texture2DLod stuff was removed since it's
 * unsupported by WebGL.
 *
 * @see https://github.com/mitsuhiko/webgl-meincraft
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 *
 */
var FXAAFilter = function (_core$Filter) {
    _inherits(FXAAFilter, _core$Filter);

    /**
     *
     */
    function FXAAFilter() {
        _classCallCheck(this, FXAAFilter);

        // TODO - needs work
        return _possibleConstructorReturn(this, _core$Filter.call(this,
        // vertex shader
        '\r\nattribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\n\r\nuniform mat3 projectionMatrix;\r\n\r\nvarying vec2 v_rgbNW;\r\nvarying vec2 v_rgbNE;\r\nvarying vec2 v_rgbSW;\r\nvarying vec2 v_rgbSE;\r\nvarying vec2 v_rgbM;\r\n\r\nuniform vec4 filterArea;\r\n\r\nvarying vec2 vTextureCoord;\r\n\r\nvec2 mapCoord( vec2 coord )\r\n{\r\n    coord *= filterArea.xy;\r\n    coord += filterArea.zw;\r\n\r\n    return coord;\r\n}\r\n\r\nvec2 unmapCoord( vec2 coord )\r\n{\r\n    coord -= filterArea.zw;\r\n    coord /= filterArea.xy;\r\n\r\n    return coord;\r\n}\r\n\r\nvoid texcoords(vec2 fragCoord, vec2 resolution,\r\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\r\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\r\n               out vec2 v_rgbM) {\r\n    vec2 inverseVP = 1.0 / resolution.xy;\r\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\r\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\r\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\r\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\r\n    v_rgbM = vec2(fragCoord * inverseVP);\r\n}\r\n\r\nvoid main(void) {\r\n\r\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r\n\r\n   vTextureCoord = aTextureCoord;\r\n\r\n   vec2 fragCoord = vTextureCoord * filterArea.xy;\r\n\r\n   texcoords(fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\r\n}',
        // fragment shader
        'varying vec2 v_rgbNW;\r\nvarying vec2 v_rgbNE;\r\nvarying vec2 v_rgbSW;\r\nvarying vec2 v_rgbSE;\r\nvarying vec2 v_rgbM;\r\n\r\nvarying vec2 vTextureCoord;\r\nuniform sampler2D uSampler;\r\nuniform vec4 filterArea;\r\n\r\n/**\r\n Basic FXAA implementation based on the code on geeks3d.com with the\r\n modification that the texture2DLod stuff was removed since it\'s\r\n unsupported by WebGL.\r\n \r\n --\r\n \r\n From:\r\n https://github.com/mitsuhiko/webgl-meincraft\r\n \r\n Copyright (c) 2011 by Armin Ronacher.\r\n \r\n Some rights reserved.\r\n \r\n Redistribution and use in source and binary forms, with or without\r\n modification, are permitted provided that the following conditions are\r\n met:\r\n \r\n * Redistributions of source code must retain the above copyright\r\n notice, this list of conditions and the following disclaimer.\r\n \r\n * Redistributions in binary form must reproduce the above\r\n copyright notice, this list of conditions and the following\r\n disclaimer in the documentation and/or other materials provided\r\n with the distribution.\r\n \r\n * The names of the contributors may not be used to endorse or\r\n promote products derived from this software without specific\r\n prior written permission.\r\n \r\n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\r\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\r\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\r\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\r\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\r\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\r\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\r\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\r\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\r\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\r\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\r\n */\r\n\r\n#ifndef FXAA_REDUCE_MIN\r\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\r\n#endif\r\n#ifndef FXAA_REDUCE_MUL\r\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\r\n#endif\r\n#ifndef FXAA_SPAN_MAX\r\n#define FXAA_SPAN_MAX     8.0\r\n#endif\r\n\r\n//optimized version for mobile, where dependent\r\n//texture reads can be a bottleneck\r\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\r\n          vec2 v_rgbNW, vec2 v_rgbNE,\r\n          vec2 v_rgbSW, vec2 v_rgbSE,\r\n          vec2 v_rgbM) {\r\n    vec4 color;\r\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\r\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\r\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\r\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\r\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\r\n    vec4 texColor = texture2D(tex, v_rgbM);\r\n    vec3 rgbM  = texColor.xyz;\r\n    vec3 luma = vec3(0.299, 0.587, 0.114);\r\n    float lumaNW = dot(rgbNW, luma);\r\n    float lumaNE = dot(rgbNE, luma);\r\n    float lumaSW = dot(rgbSW, luma);\r\n    float lumaSE = dot(rgbSE, luma);\r\n    float lumaM  = dot(rgbM,  luma);\r\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\r\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\r\n    \r\n    mediump vec2 dir;\r\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\r\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\r\n    \r\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\r\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\r\n    \r\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\r\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\r\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\r\n                  dir * rcpDirMin)) * inverseVP;\r\n    \r\n    vec3 rgbA = 0.5 * (\r\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\r\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\r\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\r\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\r\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\r\n    \r\n    float lumaB = dot(rgbB, luma);\r\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\r\n        color = vec4(rgbA, texColor.a);\r\n    else\r\n        color = vec4(rgbB, texColor.a);\r\n    return color;\r\n}\r\n\r\nvoid main() {\r\n\r\n      vec2 fragCoord = vTextureCoord * filterArea.xy;\r\n\r\n      vec4 color;\r\n\r\n    color = fxaa(uSampler, fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\r\n\r\n      gl_FragColor = color;\r\n}\r\n'));
    }

    return FXAAFilter;
}(core.Filter);

exports.default = FXAAFilter;
//# sourceMappingURL=FXAAFilter.js.map