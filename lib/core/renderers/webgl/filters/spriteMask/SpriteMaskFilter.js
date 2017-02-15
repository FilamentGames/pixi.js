'use strict';

exports.__esModule = true;

var _Filter2 = require('../Filter');

var _Filter3 = _interopRequireDefault(_Filter2);

var _math = require('../../../../math');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The SpriteMaskFilter class
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI
 */
var SpriteMaskFilter = function (_Filter) {
    _inherits(SpriteMaskFilter, _Filter);

    /**
     * @param {PIXI.Sprite} sprite - the target sprite
     */
    function SpriteMaskFilter(sprite) {
        _classCallCheck(this, SpriteMaskFilter);

        var maskMatrix = new _math.Matrix();

        var _this = _possibleConstructorReturn(this, _Filter.call(this, 'attribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\n\r\nuniform mat3 projectionMatrix;\r\nuniform mat3 otherMatrix;\r\n\r\nvarying vec2 vMaskCoord;\r\nvarying vec2 vTextureCoord;\r\n\r\nvoid main(void)\r\n{\r\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r\n\r\n    vTextureCoord = aTextureCoord;\r\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\r\n}\r\n', 'varying vec2 vMaskCoord;\r\nvarying vec2 vTextureCoord;\r\n\r\nuniform sampler2D uSampler;\r\nuniform float alpha;\r\nuniform sampler2D mask;\r\n\r\nvoid main(void)\r\n{\r\n    // check clip! this will stop the mask bleeding out from the edges\r\n    vec2 text = abs( vMaskCoord - 0.5 );\r\n    text = step(0.5, text);\r\n\r\n    float clip = 1.0 - max(text.y, text.x);\r\n    vec4 original = texture2D(uSampler, vTextureCoord);\r\n    vec4 masky = texture2D(mask, vMaskCoord);\r\n\r\n    original *= (masky.r * masky.a * alpha * clip);\r\n\r\n    gl_FragColor = original;\r\n}\r\n'));

        sprite.renderable = false;

        _this.maskSprite = sprite;
        _this.maskMatrix = maskMatrix;
        return _this;
    }

    /**
     * Applies the filter
     *
     * @param {PIXI.FilterManager} filterManager - The renderer to retrieve the filter from
     * @param {PIXI.RenderTarget} input - The input render target.
     * @param {PIXI.RenderTarget} output - The target to output to.
     */


    SpriteMaskFilter.prototype.apply = function apply(filterManager, input, output) {
        var maskSprite = this.maskSprite;

        this.uniforms.mask = maskSprite._texture;
        this.uniforms.otherMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, maskSprite);
        this.uniforms.alpha = maskSprite.worldAlpha;

        filterManager.applyFilter(this, input, output);
    };

    return SpriteMaskFilter;
}(_Filter3.default);

exports.default = SpriteMaskFilter;
//# sourceMappingURL=SpriteMaskFilter.js.map