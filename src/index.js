// import polyfills. Done as an export to make sure polyfills are imported first
export * from './polyfill';
// export core
export * from './core';

// export libs
import * as interaction from './interaction';
import * as loaders from './loaders';
import * as mesh from './mesh';
import * as particles from './particles';

// handle mixins now, after all code has been added, including deprecation
import { utils } from './core';
utils.mixins.performMixins();

/**
 * Alias for {@link PIXI.loaders.shared}.
 * @name loader
 * @memberof PIXI
 * @type {PIXI.loader.Loader}
 */
const loader = loaders.shared || null;

export {
    interaction,
    loaders,
    mesh,
    particles,
    loader,
};

// Always export PixiJS globally.
global.PIXI = exports; // eslint-disable-line
