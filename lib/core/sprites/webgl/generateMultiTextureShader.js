'use strict';

exports.__esModule = true;
exports.default = generateMultiTextureShader;

var _Shader = require('../../Shader');

var _Shader2 = _interopRequireDefault(_Shader);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fragTemplate = ['varying vec2 vTextureCoord;', 'varying vec4 vColor;', 'varying float vTextureId;', 'uniform sampler2D uSamplers[%count%];', 'void main(void){', 'vec4 color;', 'float textureId = floor(vTextureId+0.5);', '%forloop%', 'gl_FragColor = color * vColor;', '}'].join('\n');

function generateMultiTextureShader(gl, maxTextures) {
    var vertexSrc = 'attribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\nattribute vec4 aColor;\r\nattribute float aTextureId;\r\n\r\nuniform mat3 projectionMatrix;\r\n\r\nvarying vec2 vTextureCoord;\r\nvarying vec4 vColor;\r\nvarying float vTextureId;\r\n\r\nvoid main(void){\r\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r\n\r\n    vTextureCoord = aTextureCoord;\r\n    vTextureId = aTextureId;\r\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\r\n}\r\n';
    var fragmentSrc = fragTemplate;

    fragmentSrc = fragmentSrc.replace(/%count%/gi, maxTextures);
    fragmentSrc = fragmentSrc.replace(/%forloop%/gi, generateSampleSrc(maxTextures));

    var shader = new _Shader2.default(gl, vertexSrc, fragmentSrc);

    var sampleValues = [];

    for (var i = 0; i < maxTextures; i++) {
        sampleValues[i] = i;
    }

    shader.bind();
    shader.uniforms.uSamplers = sampleValues;

    return shader;
}

function generateSampleSrc(maxTextures) {
    var src = '';

    src += '\n';
    src += '\n';

    for (var i = 0; i < maxTextures; i++) {
        if (i > 0) {
            src += '\nelse ';
        }

        if (i < maxTextures - 1) {
            src += 'if(textureId == ' + i + '.0)';
        }

        src += '\n{';
        src += '\n\tcolor = texture2D(uSamplers[' + i + '], vTextureCoord);';
        src += '\n}';
    }

    src += '\n';
    src += '\n';

    return src;
}
//# sourceMappingURL=generateMultiTextureShader.js.map