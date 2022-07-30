//=============================================================================
// MRP Lock Map Scroll
// MRP_LockMapScroll.js
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc v1.00 Lock the camera in place either at a specific x,y
 * coordinate or only along one axis.
 * @author Mark Richard Przepiora
 *
 * @help
 *
 * Ever wanted to lock the camera in-place for a cutscene? Or wanted to add some
 * "dead" space on the sides of your map to allow events to walk off the screen?
 * Now you can!
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Here are some plugin commands you can use!
 *
 * Please note that the map scroll is unlocked each time a map is loaded -- so
 * you don't need to keep track of the lock state between maps. But this also
 * means that if you intend to lock the scroll for multiple maps, you will have
 * to set that up for each map.
 *
 * Plugin Command:
 *   LockMapScroll
 *   LockMapScrollX
 *   LockMapScrollY
 *   SetMapScroll x y
 *   SetMapScrollX x
 *   SetMapScrollY y
 *   SetAndLockMapScroll x y
 *   SetAndLockMapScrollX x
 *   SetAndLockMapScrollY y
 *   UnlockMapScroll
 *   UnlockMapScrollX
 *   UnlockMapScrollY
 *
 *   LockMapScroll             - lock the camera at the current position.
 *   LockMapScrollX            - lock the x-axis only, so the camera will still
 *                               move up and down but not left and right.
 *   LockMapScrollY            - like the above, but for the y-axis.
 *   SetMapScroll 2 3          - set the top-left corner of viewable map at 2
 *                               tiles to the right, and 3 tiles down from the
 *                               top-left corner of the map.
 *   SetMapScrollX 10          - set only the x-scroll of the map at 10 tiles
 *                               from the left, leaving the y-scroll alone.
 *   SetMapScrollY 10          - like the above, but for the y-scroll.
 *   SetAndLockMapScroll 2 3   - equivalent to calling SetMapScroll 2 3,
 *                               followed immediately by LockMapScroll.
 *   SetAndLockMapScrollX 5    - equivalent to calling SetMapScrollX 5,
 *                               followed immediately by LockMapScrollX.
 *   SetAndLockMapScrollY 3    - equivalent to calling SetMapScrollY 3,
 *                               followed immediately by LockMapScrollY.
 *   UnlockMapScroll           - unlock both scroll axes.
 *   UnlockMapScrollX          - unlock only the x axis.
 *   UnlockMapScrollY          - unlock only the y axis.
 *
 */
//=============================================================================

(function(left, right, up, down, setDisplayPos, setup, startScroll, updateScroll) {
  Game_Map.prototype.scrollLeft = function() {
    if (this._lockScrollX && !this._overrideScrollLock) {
      return;
    } else {
      left.apply(this, arguments);
    }
  };

  Game_Map.prototype.scrollRight = function() {
    if (this._lockScrollX && !this._overrideScrollLock) {
      return;
    } else {
      right.apply(this, arguments);
    }
  };

  Game_Map.prototype.scrollUp = function() {
    if (this._lockScrollY && !this._overrideScrollLock) {
      return;
    } else {
      up.apply(this, arguments);
    }
  };

  Game_Map.prototype.scrollDown = function() {
    if (this._lockScrollY && !this._overrideScrollLock) {
      return;
    } else {
      down.apply(this, arguments);
    }
  };

  Game_Map.prototype.setDisplayPos = function(x, y) {
    if (this._lockScrollX && this._lockScrollY) {
      return;
    } else if (this._lockScrollX) {
      setDisplayPos.call(this, this._displayX, y);
    } else if (this._lockScrollY) {
      setDisplayPos.call(this, x, this._displayY);
    } else {
      setDisplayPos.apply(this, arguments);
    }
  };

  Game_Map.prototype.setup = function() {
    this._lockScrollX = false;
    this._lockScrollY = false;
    setup.apply(this, arguments);
  };

  // This is called only from a scroll event command, and we want to allow
  // those even if the camera is locked -- since presumably the programmer
  // knows what they're doing if they say they want the screen to scroll.
  Game_Map.prototype.startScroll = function() {
    this._overrideScrollLock = true;
    startScroll.apply(this, arguments);
  };

  // Once the map ever finishes scrolling, disable the override.
  Game_Map.prototype.updateScroll = function() {
    updateScroll.apply(this, arguments);

    if (this._scrollRest <= 0) {
      this._overrideScrollLock = false;
    }
  };
})(
  Game_Map.prototype.scrollLeft,
  Game_Map.prototype.scrollRight,
  Game_Map.prototype.scrollUp,
  Game_Map.prototype.scrollDown,
  Game_Map.prototype.setDisplayPos,
  Game_Map.prototype.setup,
  Game_Map.prototype.startScroll,
  Game_Map.prototype.updateScroll
);

(function(pluginCommand) {
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    pluginCommand.apply(this, arguments);

    switch(command.toLowerCase()) {
      case "setmapscroll":
        $gameMap._displayX = parseInt(args[0]);
        $gameMap._displayY = parseInt(args[1]);
        break;

      case "setmapscrollx":
        $gameMap._displayX = parseInt(args[0]);
        break;

      case "setmapscrolly":
        $gameMap._displayY = parseInt(args[0]);
        break;

      case "lockmapscroll":
        $gameMap._lockScrollX = true;
        $gameMap._lockScrollY = true;
        break;

      case "lockmapscrollx":
        $gameMap._lockScrollX = true;
        break;

      case "lockmapscrolly":
        $gameMap._lockScrollY = true;
        break;

      case "setandlockmapscroll":
        $gameMap._displayX = parseInt(args[0]);
        $gameMap._displayY = parseInt(args[1]);
        $gameMap._lockScrollX = true;
        $gameMap._lockScrollY = true;
        break;

      case "setandlockmapscrollx":
        $gameMap._displayX = parseInt(args[0]);
        $gameMap._lockScrollX = true;
        break;

      case "setandlockmapscrolly":
        $gameMap._displayY = parseInt(args[0]);
        $gameMap._lockScrollY = true;
        break;

      case "unlockmapscroll":
        $gameMap._lockScrollX = false;
        $gameMap._lockScrollY = false;
        break;

      case "unlockmapscrollx":
        $gameMap._lockScrollX = false;
        break;

      case "unlockmapscrolly":
        $gameMap._lockScrollY = false;
        break;
    }
  };
})(Game_Interpreter.prototype.pluginCommand);
