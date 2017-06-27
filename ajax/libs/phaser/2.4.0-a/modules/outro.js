/* global Phaser:true */
/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

//  Pixi expects these globals to exist

if (PIXI.blendModes === undefined)
{
    PIXI.blendModes = Phaser.blendModes;
}

if (PIXI.scaleModes === undefined)
{
    PIXI.scaleModes = Phaser.scaleModes;
}

if (PIXI.Texture.emptyTexture === undefined)
{
    PIXI.Texture.emptyTexture = new PIXI.Texture(new PIXI.BaseTexture());
}

if (PIXI.DisplayObject._tempMatrix === undefined)
{
    PIXI.DisplayObject._tempMatrix = new PIXI.Matrix();
}

if (PIXI.RenderTexture.tempMatrix === undefined)
{
    PIXI.RenderTexture.tempMatrix = new PIXI.Matrix();
}

if (PIXI.Graphics.POLY === undefined)
{
    PIXI.Graphics.POLY = Phaser.POLYGON;
    PIXI.Graphics.RECT = Phaser.RECTANGLE;
    PIXI.Graphics.CIRC = Phaser.CIRCLE;
    PIXI.Graphics.ELIP = Phaser.ELLIPSE;
    PIXI.Graphics.RREC = Phaser.ROUNDEDRECTANGLE;
}

PIXI.TextureSilentFail = true;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Phaser;
        }
        exports.Phaser = Phaser;
    } else if (typeof define !== 'undefined' && define.amd) {
        define('Phaser', (function() { return root.Phaser = Phaser; }) ());
    } else {
        root.Phaser = Phaser;
    }
}).call(this);

/*
* "What matters in this life is not what we do but what we do for others, the legacy we leave and the imprint we make." - Eric Meyer
*/
