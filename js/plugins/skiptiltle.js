//============================================================================= 
// Kloe's Super Simple Title Screen 
// KloeSuperSimpleTitle.js 
// Version: 1.0 
// Date Created: Febuary 26, 2016 
// Scripted By: Kloe 
//============================================================================= 

var Imported = Imported || {}; 
Imported.Kloe_Super_Simple_Title = 1.0; 

//============================================================================= 
/*: 
* 
* @plugindesc KloeVersion 1.0 --> This is Kloe's Super Simple Super Seagull Title Screen Plugin!! Yaaaaaaaaaaay! 
* 
* @author Kloe "Super" Seagull 
* 
* @param Skip Title? 
* @desc Whether the title will be show at all, 1 for the title screen to be shown, 0 for not shown! 
* @default 1 
* 
* @param Font Size 
* @desc The font size of the font used for the title. 
* @default 72 
* 
* @param Outline Size 
* @desc The size of the outline of the text. 
* @default 8 
* 
* @param Outline Colour 
* @desc The colour of the outline of the text. (Link to supported colours in Kloe's Plugin Thread!) 
* @default black 
* 
* @param X Position 
* @desc The X position of the title. (The default is 20) 
* @default 20 
* 
* 
* @help 
* 
* Hiya! Do you need help? Heeeeeeeeeeeeeeeeeeeeeeeeeeeelp! 
* It is really simple, just read the plugin parameters and that should be all you need to know. 
* This is meant to be an easy-to-use plugin not a fancy awesome one, so keep that in mind! 
* If you need any help, ask me, Kloe! 
* The list of usable colours for the outline can be found below or at my thread. 
* If you need medical help just scream "HEEEEEEEEEEEEELP" or call a doctor! 
* 
* List of Colours that work --> http://www.w3schools.com/colors/colors_names.asp 
* 
*/ 

var parameters = PluginManager.parameters('KloeSuperSimpleTitle'); 
var SkipTitle = Number(parameters || 1); 
var fontSizekloe = Number(parameters || 72); 
var outlineSizekloe = Number(parameters || 8); 
var outlinecolourkloe = String(parameters || 'black'); 
var xpositionkloetitle = Number(parameters || 20); 
if (SkipTitle == 1) 
{ 

} 
else 
{ 
Scene_Boot.prototype.start = function() { 
Scene_Base.prototype.start.call(this); 
SoundManager.preloadImportantSounds(); 
if (DataManager.isBattleTest()) { 
DataManager.setupBattleTest(); 
SceneManager.goto(Scene_Battle); 
} else if (DataManager.isEventTest()) { 
DataManager.setupEventTest(); 
SceneManager.goto(Scene_Map); 
} else { 
this.checkPlayerLocation(); 
DataManager.setupNewGame(); 
SceneManager.goto(Scene_Map); 
} 
this.updateDocumentTitle(); 
} 
}; 

Scene_Title.prototype.drawGameTitle = function() { 
var x = xpositionkloetitle; 
var y = Graphics.height / 4; 
var maxWidth = Graphics.width - x * 2; 
var text = $dataSystem.gameTitle; 
this._gameTitleSprite.bitmap.outlineColor = outlinecolourkloe; 
this._gameTitleSprite.bitmap.outlineWidth = outlineSizekloe; 
this._gameTitleSprite.bitmap.fontSize = fontSizekloe; 
this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, 'center'); 

};