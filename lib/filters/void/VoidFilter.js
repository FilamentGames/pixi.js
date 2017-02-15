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
 * Does nothing. Very handy.
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 */
var VoidFilter = function (_core$Filter) {
    _inherits(VoidFilter, _core$Filter);

    /**
     *
     */
    function VoidFilter() {
        _classCallCheck(this, VoidFilter);

        var _this = _possibleConstructorReturn(this, _core$Filter.call(this,
        // vertex shader
        'attribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\n\r\nuniform mat3 projectionMatrix;\r\n\r\nvarying vec2 vTextureCoord;\r\n\r\nvoid main(void)\r\n{\r\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r\n    vTextureCoord = aTextureCoord;\r\n}',
        // fragment shader
        'varying vec2 vTextureCoord;\r\n\r\nuniform sampler2D uSampler;\r\n\r\nvoid main(void)\r\n{\r\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\r\n}\r\n'));

        _this.glShaderKey = 'void';
        return _this;
    }

    return VoidFilter;
}(core.Filter);

exports.default = VoidFilter;
//# sourceMappingURL=VoidFilter.js.map