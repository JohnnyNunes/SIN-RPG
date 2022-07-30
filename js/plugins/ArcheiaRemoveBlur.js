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
// * Disable all Image Smoothing (Comment out if you want individual)
/* -----------------------------------------------------------------------*/
ImageManager.loadBitmap = function(folder, filename, hue, smooth) {
	if (filename) {
		var path = folder + encodeURIComponent(filename) + '.png';
		var bitmap = this.loadNormalBitmap(path, hue || 0 );
		//console.log("disabling smoothing for "+path);
		bitmap.smooth = false; return bitmap;
	} else {
		return this.loadEmptyBitmap();
	}
};

// /* -----------------------------------------------------------------------*/
// // * Disable Individual Smoothing
// /* -----------------------------------------------------------------------*/
// ImageManager.loadAnimation = function(filename, hue) {
// 	return this.loadBitmap('img/animations/', filename, hue, true);
// };
// ImageManager.loadBattleback1 = function(filename, hue) {
// 	return this.loadBitmap('img/battlebacks1/', filename, hue, true);
// };
// ImageManager.loadBattleback2 = function(filename, hue) {
// 	return this.loadBitmap('img/battlebacks2/', filename, hue, true);
// };
// ImageManager.loadEnemy = function(filename, hue) {
// 	return this.loadBitmap('img/enemies/', filename, hue, true);
// };
// ImageManager.loadCharacter = function(filename, hue) {
// 	return this.loadBitmap('img/characters/', filename, hue, false);
// };
// ImageManager.loadFace = function(filename, hue) {
// 	return this.loadBitmap('img/faces/', filename, hue, false);
// };
// ImageManager.loadParallax = function(filename, hue) {
// 	return this.loadBitmap('img/parallaxes/', filename, hue, true);
// };
// ImageManager.loadPicture = function(filename, hue) {
// 	return this.loadBitmap('img/pictures/', filename, hue, true);
// };
// ImageManager.loadSvActor = function(filename, hue) {
// 	return this.loadBitmap('img/sv_actors/', filename, hue, false);
// };
// ImageManager.loadSvEnemy = function(filename, hue) {
// 	return this.loadBitmap('img/sv_enemies/', filename, hue, true);
// };
// ImageManager.loadSystem = function(filename, hue) {
// 	return this.loadBitmap('img/system/', filename, hue, false);
// };
// ImageManager.loadTileset = function(filename, hue) {
// 	return this.loadBitmap('img/tilesets/', filename, hue, false);
// };
// ImageManager.loadTitle1 = function(filename, hue) {
// 	return this.loadBitmap('img/titles1/', filename, hue, true);
// };
// ImageManager.loadTitle2 = function(filename, hue) {
// 	return this.loadBitmap('img/titles2/', filename, hue, true);
// };