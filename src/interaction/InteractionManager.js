import * as core from '../core';

/**
 * The interaction manager deals with mouse, touch and pointer events. Any DisplayObject can be interactive
 * if its interactive parameter is set to true
 * This manager also supports multitouch.
 *
 * An instance of this class is automatically created by default, and can be found at renderer.plugins.interaction
 *
 * @class
 * @extends EventEmitter
 * @memberof PIXI.interaction
 */
export default class InteractionManager
{
    /**
     * @param {PIXI.CanvasRenderer|PIXI.WebGLRenderer} renderer - A reference to the current renderer
     * @param {object} [options] - The options for the manager.
     * @param {boolean} [options.autoPreventDefault=true] - Should the manager automatically prevent default browser actions.
     * @param {number} [options.interactionFrequency=10] - Frequency increases the interaction events will be checked.
     */
    constructor(renderer, options)
    {
        this.options = options || {};

        /**
         * The renderer this interaction manager works for.
         *
         * @member {PIXI.SystemRenderer}
         */
        this.renderer = renderer;
    }

    /**
     * Destroys the interaction manager
     *
     */
    destroy()
    {
        this.renderer = null;
        this.options = null;
    }
}

core.WebGLRenderer.registerPlugin('interaction', InteractionManager);
core.CanvasRenderer.registerPlugin('interaction', InteractionManager);
