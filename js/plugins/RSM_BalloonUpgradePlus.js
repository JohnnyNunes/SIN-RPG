//=============================================================================
// RSM_BalloonUpgradePlus.js
// Rafael_Sol_Maker's Balloon Upgrade MV (PLUS edition) v1.0
// This work is licensed under a Creative Commons Attribution 4.0 International License.
//=============================================================================

// Some guys say that it's a good practice...
var Imported = Imported || {};
Imported.RSM_BalloonUpgrade = true;

var RSMTweaks = RSMTweaks || {};
RSMTweaks.BalloonUpgrade = RSMTweaks.BalloonUpgrade || {};
RSMTweaks.BalloonUpgrade.version = 1.0;

/*:
 * @plugindesc RSM's Balloon Upgrade MV PLUS v1.0.
 * Expression balloon upgrade. Requires RPG Maker 1.5 or newer.
 * @author Rafael_Sol_Maker (www.condadobraveheart.com/forum)
 * @help This plugin allows some deep customization of the expression balloons and
 * adds some new functionalities as well.
 * ---------------------------------------------------------------
 * IMPORTANT: THIS PLUGIN WILL REPLACE THE STANDARD BALLOONS,
 * AND WILL REQUIRE PREVIOUS CONFIGURATION TO BE USED!
 * ---------------------------------------------------------------
 *
 * The index in the list of this plugin parameters corresponds to the
 * ones that will be displayed in the selection list via event commands.
 *
 * You will not be able to use a balloon beyond what was previously set up.
 * e.g.: If you have set up only 3 balloons, attempting to use the 4th of
 * the list will result in ERROR.
 *
 * If you have any questions, criticisms or suggestions, please let me know.
 * Best regards,
 *                                                          ~RAFAEL_SOL_MAKER
 *
 * @param balloon_list
 * @text Balloon Configurations
 * @desc Set up here each balloon property individually.
 * @type struct<Balloon>[]
 */

/*~struct~Balloon:
 * @param animation
 * @text Animation
 * @desc Category to deal with the details of the animations
 * @default ===================================
 *
 * @param filename
 * @parent animation
 * @text File Name
 * @desc Name of the file from which the animation will be extracted.
 * @type file
 * @dir img/system
 * @default Balloon
 *
 * @param animation_id
 * @parent animation
 * @text Animation ID
 * @desc Determination of the index of the animation extracted from the file.
 * @type number
 * @min 1
 * @default 1
 *
 * @param total_frames
 * @parent animation
 * @text Total of Frames
 * @desc Total of frames to complete the animation.
 * @type number
 * @min 1
 * @default 8
 *
 * @param speed
 * @parent animation
 * @text Speed
 * @desc Exposure time for each frame of the animation, in frames (1/60 second).
 * @type number
 * @min 1
 * @default 8
 *
 * @param wait_time
 * @parent animation
 * @text Final Wait Time
 * @desc Standby time of the last frame of the animation, in frames (1/60 second).
 * @type number
 * @min 1
 * @default 12
 *
 * @param frame
 * @text Animation Frame
 * @desc Animation frame category. Yeah, that's it. Go check it out.
 * @default ===================================
 *
 * @param offset
 * @parent frame
 * @text Position (Offset)
 * @desc Offset of the expression balloon relative to the center of the target character. Value in tiles.
 * @type struct<Point>
 * @default {"X":"0.250","Y":"0.500"}
 *
 * @param scale
 * @parent frame
 * @text Scaling Factor
 * @desc Scaling factor, for width and height. Use between 0 and 1 to shrink and greater than 1 to enlarge.
 * @type struct<Point>
 * @default {"X":"1.000","Y":"1.000"}
 *
 * @param rotation
 * @parent frame
 * @text Rotation
 * @desc Rotation of the balloon, in radians. Use values from 0 to 2*PI.
 * @type number
 * @decimals 4
 * @default 0.0000
 *
 * @param frame_size
 * @parent frame
 * @text Frame Size
 * @desc Balloon animation frame size (width and height).
 * @type struct<Size>
 * @default {"W":"48","H":"48"}
 *
 * @param z_order
 * @parent frame
 * @text Priority
 * @desc Display priority. The higher the value, the higher above the other objects it will be shown.
 * @type number
 * @default 7
 *
 * @param sfx
 * @text Sound Effect
 * @desc Category where we place the sound effect playback settings.
 * @default ===================================
 *
 * @param sfx_filename
 * @parent sfx
 * @text File Name
 * @desc The name of the sound file to be played.
 * @type file
 * @dir audio/se
 * @default Cancel2
 *
 * @param sfx_volume
 * @parent sfx
 * @text Volume
 * @desc Volume that the sound will be played (0 to 100).
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param sfx_pitch
 * @parent sfx
 * @text Pitch
 * @desc Pitch (bass or treble) in which the sound will be played. Default is 100 (normal pitch)
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param sfx_pan
 * @parent sfx
 * @text Pan
 * @desc Stereo balance(left-to-right)of the sound. Use values from -100 to 100.
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @param sfx_wait
 * @parent sfx
 * @text Waiting Delay
 * @desc Wait, in frames (1/60 seconds), before playing the sound.
 * Won't play if the animation is already finished.
 * @type number
 * @default 0
 *
 * @param blend
 * @text Opacity and Blend
 * @desc Category that deals with transparencies and suchlike.
 * @default ===================================
 *
 * @param opacity
 * @parent blend
 * @text Opacity
 * @desc Degree of transparency of the image. Use values from 0 to 255.
 * @type number
 * @min 0
 * @max 255
 * @default 255
 *
 * @param blend_mode
 * @parent blend
 * @text Blend Mode
 * @desc Blend mode (operation overlay) that the image will be mixed with others.
 * @type select
 * @option Graphics.BLEND_NORMAL
 * @option Graphics.BLEND_ADD
 * @option Graphics.BLEND_MULTIPLY
 * @option Graphics.BLEND_SCREEN
 * @default Graphics.BLEND_NORMAL
 *
 * @param blend_color
 * @parent blend
 * @text Blend Color
 * @desc RGB color under which the mixture of the blend mode will be performed.
 * @type struct<Color>
 * @default {"R":"0","G":"0","B":"0","A":"0"}
 *
 * @param color_tone
 * @parent blend
 * @text Color Tone
 * @desc Tone of the image in RGB range (-255 to 255) and in Gray (0 to 255).
 * @type struct<Tone>
 * @default {"R":"0","G":"0","B":"0","Gray":"0"}
 *
*/

/////////////////////////////////////////////////////////////////////////////

/*~struct~Size:
 * @param W @type number @text Width @min 0
 * @param H @type number @text Height @min 0
*/

/*~struct~Point:
 * @param X @type number @text X-coordinate @decimals 3
 * @param Y @type number @text Y-coordinate @decimals 3
*/

/*~struct~Color:
 * @param R @type number @text Red @min 0 @max 255
 * @param G @type number @text Green @min 0 @max 255
 * @param B @type number @text Blue @min 0 @max 255
 * @param A @type number @text Alpha @min 0 @max 255
*/

/*~struct~Tone:
 * @param R @type number @text Red @min -255 @max 255
 * @param G @type number @text Green @min -255 @max 255
 * @param B @type number @text Blue @min -255 @max 255
 * @param Gray @type number @text Gray @min 0 @max 255
*/

///////////////////////////////////////////////////////////////////////////////

(function() {

  // Reading the parameters...
  var params = PluginManager.parameters('RSM_BalloonUpgradePlus');
  var list = JSON.parse(params['balloon_list']);
  var items = []
  for (n = 0; n < list.length; n++) {
    items[n] = JSON.parse(list[n]);
    items[n].offset = JSON.parse(items[n].offset);
    items[n].scale = JSON.parse(items[n].scale);
    items[n].blend_color = JSON.parse(items[n].blend_color);
    items[n].color_tone = JSON.parse(items[n].color_tone);
    items[n].frame_size = JSON.parse(items[n].frame_size);
  };

  /////////////////////////////////////////////////////////////////////////////

  // Passing value as soon as it starts
  Sprite_Character.prototype.startBalloon = function() {
      if (this._character.balloonId() > list.length) {
        throw new Error("Error: The index of the balloon chosen is not configured. Please set up this balloon in the Plugin Manager!");
        return;
      };
      if (!this._balloonSprite) {
        this._balloonSprite = new Sprite_Balloon(this._character.balloonId());
      };
      this.parent.addChild(this._balloonSprite);
  };

  /////////////////////////////////////////////////////////////////////////////

  // Essential to pass balloonId to initMembers
  Sprite_Balloon.prototype.initialize = function(balloonId) {
    Sprite_Base.prototype.initialize.call(this);
    this.initMembers(balloonId);
    this.loadBitmap();
  };

	// Changing our initial properties
  Sprite_Balloon.prototype.initMembers = function(balloonId) {

    // Essential data
    this._balloonId = balloonId;
    var i = items[balloonId - 1];

    // Positioning
    this.anchor.x = Number(i.offset.X);
    this.anchor.y = Number(i.offset.Y);
    this.scale.x = Number(i.scale.X);
    this.scale.y = Number(i.scale.Y);
    this.rotation = Number(i.rotation);
    this.fw = Number(i.frame_size.W);
    this.fh = Number(i.frame_size.H);
    this.z = Number(i.z_order);

    // Blend Properties
    this.opacity = Number(i.opacity);
    this.blendMode = eval(i.blend_mode);
    var b = i.blend_color;
    var c = i.color_tone;
    this.setBlendColor([b['R'], b['G'], b['B'], b['A']]);
    this.setColorTone([c['R'], c['G'], c['B'], c['Gray']]);

    // Animation Details
    this.count = 0;
    this.sfx_wait = Number(i.sfx_wait);
    this.animation_id = Number(i.animation_id);
    this.speed = Number(i.speed);
    this.wait_time = Number(i.wait_time);
    this._duration = Number(i.total_frames) * Number(i.speed) + Number(i.wait_time);
	};

  // Loading the file we want
  Sprite_Balloon.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.loadSystem(items[this._balloonId - 1].filename);
    this.setFrame(0, 0, 0, 0);
  };

  // Sprite update time!
  var _Sprite_Balloon_update = Sprite_Balloon.prototype.update;
  Sprite_Balloon.prototype.update = function() {
    _Sprite_Balloon_update.call(this);
    var a = items[this._balloonId - 1];
    if (this.sfx_wait == this.count){
      AudioManager.playSe({name: a.sfx_filename, pan: a.sfx_pan, pitch: a.sfx_pitch, volume: a.sfx_volume});
    };
    this.count++;
  };

  // Animation frame update
  Sprite_Balloon.prototype.updateFrame = function() {
    var sx = this.frameIndex() * this.fw;
    var sy = (this.animation_id - 1) * this.fh;
    this.setFrame(sx, sy, this.fw, this.fh);
  };

	// Animation speed
	Sprite_Balloon.prototype.speed = function() {
		return Number(items[this._balloonId - 1].speed);
	};

	// Additional waiting for the final frame
	Sprite_Balloon.prototype.waitTime = function() {
		return Number(items[this._balloonId - 1].wait_time);
	};

  // It has to stay here for some reason that I don't know...
  Sprite_Balloon.prototype.frameIndex = function() {
    var index = (this._duration - this.wait_time) / this.speed;
    return items[this._balloonId - 1].total_frames - Math.max(Math.floor(index), 0);
  };

})(); // Do not delete!