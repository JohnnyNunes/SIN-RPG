/*=============================================================================
 * Snippets Base
 * By Archeia - http://www.archeia.moe
 * ArcheiaSnippets.js
 * Version: 1.0.0
 *
 * This plugin contains all my overwrites to various core scripts. You can use
 * it at your own risk.
 *
 *=============================================================================*/
/*:
 * @plugindesc This plugin contains all my overwrites to various core scripts.
 * @author Archeia
 *
 *
 * @help
 * This plugin contains all my overwrites to various core scripts. You can use
 * it at your own risk.
 *
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 *
 * Version 1.0:
 *            - Finished Script!
 *
 *=============================================================================*/

/* -----------------------------------------------------------------------*/
// * PIXI GLTexture Fix
/* -----------------------------------------------------------------------*/
PIXI.glCore.GLTexture.prototype.upload = function(source)
{
  this.bind();

  var gl = this.gl;

  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);

  var isVideo = !!source.videoWidth;
  var newWidth = isVideo ? source.videoWidth : source.width;
  var newHeight = isVideo ? source.videoHeight : source.height;

  if(newHeight !== this.height || newWidth !== this.width || isVideo)
  {
    gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.format, this.type, source);
  }
  else
  {
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.format, this.type, source);
  }

  this.width = newWidth;
  this.height = newHeight;

};

/* -----------------------------------------------------------------------*/
// * Extend Strings: Capitalize First Letter
/* -----------------------------------------------------------------------*/
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

// /* -----------------------------------------------------------------------*/
// // * Disable All Font Outlines
// /* -----------------------------------------------------------------------*/
// var _Window_Base_ResetFontSettings = Window_Base.prototype.resetFontSettings;
// Window_Base.prototype.resetFontSettings = function() {
//     _Window_Base_ResetFontSettings.call( this );
//     this.contents.outlineWidth = 0;
// };

/* -----------------------------------------------------------------------*/
// * Replace Font Outline to Shadow
/* -----------------------------------------------------------------------*/
Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
     var context = this._context;
     context.fillStyle = this.textColor;
     context.shadowColor = 'rgba(110, 49, 108, 55)';
     context.shadowBlur = 0;
     context.shadowOffsetX = 1;
     context.shadowOffsetY = 1;
     context.fillText(text, tx, ty, maxWidth);
 };
/* -----------------------------------------------------------------------*/
// * Remove White Square when clicking mouse destination (Disable when using Terrax)
/* -----------------------------------------------------------------------*/
// Spriteset_Map.prototype.createLowerLayer = function() {
//     Spriteset_Base.prototype.createLowerLayer.call(this);
//     this.createParallax();
//     this.createTilemap();
//     this.createCharacters();
//     this.createShadow();
//     this.createWeather();
// };
/* -----------------------------------------------------------------------*/
// * Stop the cursor from blinking
/* -----------------------------------------------------------------------*/
 Window.prototype._updateCursor = function() {
    this._windowCursorSprite.alpha = 255;
    this._windowCursorSprite.visible = this.isOpen();
};

/* -----------------------------------------------------------------------*/
// * Make Window Cursor tile instead of stretching
/* -----------------------------------------------------------------------*/
Window.prototype._refreshCursor = function() {
    var pad = this._padding;
    var x = this._cursorRect.x + pad - this.origin.x;
    var y = this._cursorRect.y + pad - this.origin.y;
    var w = this._cursorRect.width;
    var h = this._cursorRect.height;
    var m = 4;
    var x2 = Math.max(x, pad);
    var y2 = Math.max(y, pad);
    var ox = x - x2;
    var oy = y - y2;
    var w2 = Math.min(w, this._width - pad - x2);
    var h2 = Math.min(h, this._height - pad - y2);
    var bitmap = new Bitmap(w2, h2);

    this._windowCursorSprite.bitmap = bitmap;
    this._windowCursorSprite.setFrame(0, 0, w2, h2);
    this._windowCursorSprite.move(x2, y2);
    // Spacing 1
    var sp1 = 10;

    if (w > 0 && h > 0 && this._windowskin) {
      var skin = this._windowskin;
      var p = 96;
      var q = 48;

      bitmap.blt(skin, p, p, sp1, sp1, ox, oy);
      bitmap.blt(skin, p + q - sp1, p, sp1, sp1, ox + w2 - sp1, oy);
      bitmap.blt(skin, p, p + q - sp1, sp1, sp1, ox, oy + h2 - sp1);
      bitmap.blt(skin, p + q - sp1, p + q - sp1, sp1, sp1, ox + w2 - sp1, oy + h2 - sp1);

      bitmap.blt(skin, p + sp1, p, q - (sp1 * 2), sp1, ox + sp1, oy, w2 - (sp1 * 2))
      bitmap.blt(skin, p + sp1, p + q - sp1, q - (sp1 * 2), sp1, ox + sp1, oy + h2 - sp1, w2 - (sp1 * 2))

      bitmap.blt(skin, p, p + sp1, sp1, q - (sp1 * 2), ox, oy + sp1, sp1, h2 - (sp1 * 2))
      bitmap.blt(skin, p + q - sp1, p + sp1, sp1, q - (sp1 * 2), ox + w2 - sp1, oy + sp1, sp1, h2 - (sp1 * 2))

      bitmap.blt(skin, p + sp1, p + sp1, q - (sp1 * 2), q - (sp1 * 2), ox + sp1, oy + sp1, w2 - (sp1 * 2), h2 - (sp1 * 2))
    }
};

// /* -----------------------------------------------------------------------*/
// // * Adjust Battle Log X/Y
// /* -----------------------------------------------------------------------*/
// Window_BattleLog.prototype.initialize = function() {
//     var width = this.windowWidth();
//     var height = this.windowHeight();
//     Window_Selectable.prototype.initialize.call(this, 75, 0, width, height);
//     this.opacity = 0;
//     this._lines = [];
//     this._methods = [];
//     this._waitCount = 0;
//     this._waitMode = '';
//     this._baseLineStack = [];
//     this._spriteset = null;
//     this.createBackBitmap();
//     this.createBackSprite();
//     this.refresh();
// };

/* -----------------------------------------------------------------------*/
// * Adjust Battle Log Width (DISABLED)
/* -----------------------------------------------------------------------*/
// Window_BattleLog.prototype.windowWidth = function() {
//     return Graphics.boxWidth - 150;
// };

/* -----------------------------------------------------------------------*/
// * Edit Save Display
/* -----------------------------------------------------------------------*/
Window_Base.prototype.drawCharacter = function(characterName, characterIndex, x, y) {
    var bitmap = ImageManager.loadCharacter(characterName);
    var big = ImageManager.isBigCharacter(characterName);
    var pw = bitmap.width / (big ? 3 : 12);
    var ph = bitmap.height / (big ? 4 : 8);
    var n = characterIndex;
    var sx = (n % 4 * 3 + 1) * pw;
    var sy = (Math.floor(n / 4) * 4) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};

var _Window_Base_ResetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
    _Window_Base_ResetFontSettings.call( this );
    this.contents.outlineWidth = 0;
};  

/* -----------------------------------------------------------------------*/
// * Adjust Name Input: Disable Pages
/* -----------------------------------------------------------------------*/

Window_NameInput.LATIN1 =
  [ 'A','B','C','D','E',  'a','b','c','d','e',
    'F','G','H','I','J',  'f','g','h','i','j',
    'K','L','M','N','O',  'k','l','m','n','o',
    'P','Q','R','S','T',  'p','q','r','s','t',
    'U','V','W','X','Y',  'u','v','w','x','y',
    'Z','[',']','^','_',  'z','{','}','|','~',
    '0','1','2','3','4',  '!','#','$','%','&',
    '5','6','7','8','9',  '(',')','*','+','-',
    '/','=','@','<','>',  ':',';',' ','←','OK' ];
          
Window_NameInput.prototype.processOk = function() {
    if (this.character()) {
        this.onNameAdd();
    } else if (this.isPageChange()) {
        this.processBack();
    } else if (this.isOk()) {
        this.onNameOk();
    }
};

/* -----------------------------------------------------------------------*/
// * Adjust Name Input Field Display
/* -----------------------------------------------------------------------*/
Window_NameEdit.prototype.drawChar = function(index) {
    var rect = this.itemRect(index);
    this.resetTextColor();
    this.drawText(this._name[index] || '', rect.x, rect.y, rect.width, 'center');
};

/* -----------------------------------------------------------------------*/
// * Change Yanfly Core Engine's Gauge Outline to Shadows
/* -----------------------------------------------------------------------*/
Window_Base.prototype.drawGauge = function(dx, dy, dw, rate, color1, color2) {
  var color3 = this.gaugeBackColor();
  var fillW = Math.floor(dw * rate).clamp(0, dw);
  var gaugeH = this.gaugeHeight();
  var gaugeY = dy + this.lineHeight() - gaugeH - 2;
  if (eval(Yanfly.Param.GaugeOutline)) {
    color3.paintOpacity = this.translucentOpacity();
    this.contents.fillRect(dx, gaugeY - 1, dw, gaugeH, color3);
    fillW = Math.max(fillW - 2, 0);
    gaugeH -= 2;
    dx += 1;
  } else {
    var fillW = Math.floor(dw * rate);
    var gaugeY = dy + this.lineHeight() - gaugeH - 2;
    this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
    this.contents.fillRect(dx + 2, gaugeY + 3, dw, gaugeH, 'rgba(110, 49, 108, 255)');
  }
  this.contents.gradientFillRect(dx, gaugeY, fillW, gaugeH, color1, color2);

};

/* -----------------------------------------------------------------------*/
// * Adjust YEA: Message Core Name Box
/* -----------------------------------------------------------------------*/
// Window_NameBox.prototype.refresh = function(text, position) {
//     this.show();
//     this._lastNameText = text;
//     this._text = Yanfly.Param.MSGNameBoxText + text;
//     this._position = position;
//     this.width = this.windowWidth();
//     this.createContents();
//     this.contents.clear();
//     this.resetFontSettings();
//     this.changeTextColor(this.textColor(Yanfly.Param.MSGNameBoxColor));
//     var padding = eval(Yanfly.Param.MSGNameBoxPadding) / 2;
//     this.drawTextEx(this._text, padding, 7, this.contents.width);
//     this._parentWindow.adjustWindowSettings();
//     this._parentWindow.updatePlacement();
//     this.adjustPositionX();
//     this.adjustPositionY();
//     this.open();
//     this.activate();
//     this._closeCounter = 4;
//     return '';
// };

/* -----------------------------------------------------------------------*/
// * Adjust Message Window Position
/* -----------------------------------------------------------------------*/
Window_ChoiceList.prototype.updatePlacement = function() {
    var positionType = $gameMessage.choicePositionType();
    var messageY = this._messageWindow.y;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    switch (positionType) {
    case 0:
        this.x = 0;
        break;
    case 1:
        this.x = (Graphics.boxWidth - this.width) / 2;
        break;
    case 2:
        this.x = Graphics.boxWidth - this.width;
        break;
    }
    if (messageY >= Graphics.boxHeight / 2) {
        this.y = messageY - this.height;
    } else {
        this.y = messageY + this._messageWindow.height;
    }
};