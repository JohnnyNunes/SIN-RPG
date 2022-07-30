//=============================================================================
// Camera.js
//=============================================================================

/*:
 * @plugindesc Lets the camera follow any combination of events, points, followers and the player
 * @author Geri Khan
 *
 * @param Default Sensitivity
 * @desc The % of the screen that counts as an event being Onscreen
 * @default 0.75
 *
 * @param Default Move Time
 * @desc The number of frames it takes to move the camera in timed mode
 * @default 60
 *
 * @param Default Move Speed
 * @desc The the speed of the camera in speed mode
 * @default 4
 *
 * @help
 *
 * This camera plugin decouples the camera from always being relative to the
 * player, allowing it to focus on any combination of the player, events,
 * followers and static points. It can be further constrained to a subsection
 * of the map, panned, and backups of camera settings can be stored and
 * restored.
 *
 * By default, the camera will adopt a position that is the average location
 * of all events that are close enough to the player. If the player is too far
 * from an event, it will be ignored until it is closer. This behaviour can be
 * disactivated so that it doesn't care about the player's position, through
 * this may end up with the player offscreen. Good if that's what you want!
 *
 * -----------------------------------------------------------------------------
 *
 * Plugin Command:
 *
 * camera add (player/event/follower/point)
 *      adds an event to the camera's focus
 *      examples: camera add player
 *                camera add event 10
 *                camera add event 10 11 12 13 (adding multiple at once)
 *                camera add follower 2 (followers are numbered 0-2)
 *                camera add point 10 15 (x = 10, y = 15)
 *
 * camera remove (player/event/follower/point)
 *      removes an event from the camera's focus
 *      examples: camera remove player
 *                camera remove event 10
 *                camera remove event 10 11 12 13 (removing multiple at once)
 *                camera remove follower 2 (followers are numbered 0-2)
 *                camera remove point 10 15 (x = 10, y = 15)
 *
 * camera pause
 *      forces the camera to stop moving until the command below...
 *
 * camera unpause
 *      resumes camera movement
 *
 * camera clear
 *      resets certain camera settings: the focus list, the scroll,
 *      and the constrain
 *
 * camera sensitivity x% y%
 *      sets how close to the player an event has to be to be considered 'onscreen'
 *      default value is 0.75, or 75% of the screen
 *      you can set it individually for width and height
 *      example: camera sensitivity 0.75 0.75
 *
 * camera ignoreplayer
 *      disables sensitivity: all events will be considered onscreen regardless
 *      of how close to the player they are. Good if you want to focus on events
 *      in another part of the map
 *
 * camera followplayer
 *      enables sensitivity
 *
 * camera snap
 *      immediately moves the camera to its target position
 *
 * camera pan x y
 *      moves the camera x and y squares
 *      this is the same as the Scroll Map event command, and you can still use
 *      that, but using the plugin command allows you to scroll diagonally.
 *      examples: camera pan 10 5 (10 right and 5 down)
 *                camera pan -5 3 (5 left and 3 down)
 *
 * camera resetPan
 *      moves the pan of the camera back to 0,0
 *
 * camera wait
 *      makes the interpreter wait until the camera has finished moving
 *
 * camera setduration time
 *      sets how many frames it takes for the camera to move
 *      examples: camera setduration 60 (1 second)
 *                camera setduration 30 (half a second)
 *                camera setduration 120 (two seconds)
 *
 * camera setspeed speed
 *      sets the pixels per frame the camera travels at
 *      duration (above) is ignored if a speed limit is set
 *      example: camera setspeed 0.4 (0.4 pixels per frame)
 *
 * camera resetspeed
 *      removes a speed limit
 *
 * camera constrain x y width height
 *      limits the space the camera can view to a rectangle starting at x,y
 *      with the specified width and height
 *      examples: camera constrain 5 5 40 17 (a 40x17)
 *                camera constrain 10 3 32 60 (a 32X60)
 *
 * camera unconstrain
 *      removes a camera constrain
 *
 * camera store name
 *      backups the current camera settings under the specified name
 *      examples: camera store outside
 *                camera store shopinterior
 *
 * camera restore name
 *      restores a camera settings backup
 *      examples: camera restore outside
 *                camera restore shopinterior
 *
 * camera report
 *      logs the current state of the camera object to the console
 *
 * -----------------------------------------------------------------------------
 *
 * PUTTING COMMANDS IN MAP NOTETAGS
 *
 * You can have camera commands run as the map is loaded, by placing
 * commands like the following in the map's notetag.
 *
 * [camera]
 * clear
 * add event 3
 * add point 10 10
 * constrain 1 1 40 40
 * store set1
 * clear
 * add player
 * add point 5 5
 * store set2
 * clear
 * [/camera]
 *
 * this example creates two sets of stored settings in advance, called set1 and
 * set2, which can be loaded later
 *
 * you can put as many commands as you want in the block. They are all the same
 * commands as above, just without the leading 'camera'. Even if you're just
 * using them to store settings in advance like above, they will all be
 * executed, so if you don't clear afterwards you might have unwanted settings
 * persisting. If you store a backup called 'default' it will be restored after
 * the camera commands block has finished executing.
 *
 * JAVASCRIPT FUNCTION
 *
 * There is also a javascript function that you can use in Conditional Branches
 * or script calls. It resides on Game_Interpreter.
 *
 * this.isOnScreen('key')
 *      returns TRUE if the specified event is close enough
 *      to the player that the camera is tracking it
 *      note this will always return true if ignoring the player's position
 *      is enabled, and false if an event is transparent or erased
 *      'key' can be several things
 *          player : the player
 *          event(n) : an event
 *            ex: event1, event4, event20
 *          point(x)x(y) : a point, located at x,y on the map
 *            ex: point3x10, point7x9, point21x73
 *          follower(n) : a follower, numbered 0-2
 *            ex: follower0, follower2
 *
 *      so for example...
 *          this.onCameraList('player')
 *          this.onCameraList('event7')
 *          this.onCameraList('point32x16')
 *          this.onCameraList('follower1')
 */

(function() {

  var parameters = PluginManager.parameters('Camera');
  var defaultSensitivity = parseFloat(parameters['Default Sensitivity']);
  var defaultMoveTime = parseInt(parameters['Default Move Time']);
  var defaultMoveSpeed = parseFloat(parameters['Default Move Speed']);

  var _Game_Interpreter_pluginCommand =
          Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      _Game_Interpreter_pluginCommand.call(this, command, args);
      if (command.toLowerCase() === 'camera') {

          args[0] = args[0].toLowerCase();
          switch (args[0]) {
          case 'add':
              args[1] = args[1].toLowerCase();
              if (args[1] == "player") {
                $gameMap._camera.addPlayer();
              } else if (args[1] == "event") {
                for (var i = 2; i < args.length; i++) {
                  $gameMap._camera.addEvent(parseInt(args[i]));
                }
              } else if (args[1] == "follower") {
                $gameMap._camera.addFollower(parseInt(args[2]));
              } else if (args[1] == "point") {
                $gameMap._camera.addPoint(parseInt(args[2]),parseInt(args[3]));
              }
              break;
          case 'remove':
              args[1] = args[1].toLowerCase();
              if (args[1] == "player") {
                $gameMap._camera.removePlayer();
              } else if (args[1] == "event") {
                for (var i = 2; i < args.length; i++) {
                  $gameMap._camera.removeEvent(parseInt(args[i]));
                }
              } else if (args[1] == "follower") {
                $gameMap._camera.removeFollower(parseInt(args[2]));
              } else if (args[1] == "point") {
                $gameMap._camera.removePoint(parseInt(args[2]),parseInt(args[3]));
              }
              break;
          case 'clear':
              $gameMap._camera.clear();
              break;
          case 'sensitivity':
              $gameMap._camera.setSensitivity(parseFloat(args[1]),parseFloat(args[2]));
              break;
          case 'ignoreplayer':
              $gameMap._camera.setIgnore(true);
              break;
          case 'followplayer':
              $gameMap._camera.setIgnore(false);
              break;
          case 'snap':
              $gameMap._camera.snap();
              break;
          case 'pan':
              $gameMap._camera.pan(parseInt(args[1]),parseInt(args[2]));
              break;
          case 'resetpan':
              $gameMap._camera.resetPan();
              break;
          case 'wait':
              this.setWaitMode('scroll');
              break;
          case 'constrain':
              $gameMap._camera.constrain(parseInt(args[1]),
                parseInt(args[2]),parseInt(args[3]),parseInt(args[4]));
              break;
          case 'unconstrain':
              $gameMap._camera.unconstrain();
              break;
          case 'store':
              $gameMap._camera.store(args[1]);
              break;
          case 'restore':
              $gameMap._camera.restore(args[1]);
              break;
          case 'setduration':
              $gameMap._camera.setDuration(parseInt(args[1]));
              break;
          case 'setspeed':
              $gameMap._camera.setSpeedLimit(parseFloat(args[1]));
              break;
          case 'resetspeed':
              $gameMap._camera.resetSpeedLimit();
              break;
          case 'pause':
              $gameMap._camera.pause(true);
              break;
          case 'unpause':
              $gameMap._camera.pause(false);
              break;
          case 'report':
              console.log($gameMap._camera);
          }
      }
  };

  Game_Interpreter.prototype.isOnscreen = function(key) {
    return $gameMap._camera.isOneOnscreen(key);
  };

  // ------------------------------------------
  // Game_Map
  // ------------------------------------------
  // changes to Game_Map mostly involve setting up the camera, changing how
  // parallax works, and rerouting the existing map scroll functions to the
  // camera

  // ------------------------------------------
  // initialize - create the camera and initialize the pan
  var gk_camera_gameMap_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function() {
    gk_camera_gameMap_initialize.call(this);
    this._camera = new Game_Camera();
    this._paraPanX = 0;
    this._paraPanY = 0;
  };

  // ------------------------------------------
  // setup - set up the camera settings, including running any commands in the
  // map notes
  var gk_camera_gameMap_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    if (this._map) {
      this._camera.clearAll;
    }
    gk_camera_gameMap_setup.call(this,mapId);
    if (!this.isLoopVertical() && !this.isLoopHorizontal()) {
      this._camera.constrain(0,0,$gameMap.width(),$gameMap.height());
    } else {
      this._camera.unconstrain();
    }
    this._camera.setupSensitivity();
    var lines = $dataMap.note.split('\n');
    var executing = false;
    for (var i=0; i<lines.length; i++) {
      if (lines[i]=='[camera]') {
        console.log('starting execution');
        executing = true;
      } else if (lines[i]=='[/camera]') {
        console.log('ending execution');
        executing = false;
      } else if (executing == true) {
        this._interpreter.pluginCommand('camera',lines[i].split(' '));
      }
    }
    this._camera.restore('default');
    this._camera.snap();
  };

  // ------------------------------------------
  /// setupParallax
  var gk_camera_gameMap_setupParallax = Game_Map.prototype.setupParallax;
  Game_Map.prototype.setupParallax = function() {
    this._paraPanX = 0;
    this._paraPanY = 0;
    gk_camera_gameMap_setupParallax.call(this);
  };

  // ------------------------------------------
  // parallaxOx
  var gk_camera_gameMap_parallaxOx = Game_Map.prototype.parallaxOx;
  Game_Map.prototype.parallaxOx = function() {
    if (this._parallaxLoopX) {
      return (this._parallaxX + this._paraPanX) * this.tileWidth() / 2;
    } else {
      return this._parallaxX;
    }
    //gk_camera_gameMap_parallaxOx.call(this);
  };

  // ------------------------------------------
  // parallaxOy
  var gk_camera_gameMap_parallaxOy = Game_Map.prototype.parallaxOy;
  Game_Map.prototype.parallaxOy = function() {
    if (this._parallaxLoopY) {
      return (this._parallaxY + this._paraPanY) * this.tileHeight() / 2;
    } else {
      return this._parallaxY;
    }
    //gk_camera_gameMap_parallaxOy.call(this);
  };

  // ------------------------------------------
  // OVERWRITTEN - updateParallax - changed to use the parapan vars
  Game_Map.prototype.updateParallax = function() {
    if (this._parallaxLoopX) {
      this._paraPanX += this._parallaxSx / this.tileWidth() / 2;
    }
    if (this._parallaxLoopY) {
      this._paraPanY += this._parallaxSy / this.tileHeight() / 2;
    }
  };

  // ------------------------------------------
  // OVERWRITTEN - updateScroll - just throws over to the camera now
  Game_Map.prototype.updateScroll = function() {
    this._camera.update();
  };

  // ------------------------------------------
  // OVERWRITTEN - startScroll - for the user Scroll Map works the same,
  // but is handled differently by the camera
  Game_Map.prototype.startScroll = function(direction, distance, speed) {
    var time  = distance / (2 * speed / 256);
    switch(direction) {
      case 2:
        this._camera.scroll(0,distance,time);
        break;
      case 4:
        this._camera.scroll(-distance,0,time);
        break;
      case 6:
        this._camera.scroll(distance,0,time);
        break;
      case 8:
        this._camera.scroll(0,-distance,time);
    }
  };

  // ------------------------------------------
  // OVERWRITTEN - isScrolling - now asks the camera instead
  Game_Map.prototype.isScrolling = function() {
    //console.log('IS SCROLLING POLLED: '+this._camera._duration+' '+this._camera._moveTime);
    return this._camera.isScrolling();
  };

  // ------------------------------------------
  // Game_Player
  // ------------------------------------------
  // only one change. This completely removes the player from having direct
  // influence on the view, camera handles it now

  // ------------------------------------------
  // OVERWRITTEN - updateScroll
  Game_Player.prototype.updateScroll = function(lastScrolledX, lastScrolledY) {
    // don't do anything
  };

  // ------------------------------------------
  // Game_Event
  // ------------------------------------------
  // removes events from the camera's list when they are erased

  // ------------------------------------------
  // erase
  var gk_camera_gameEvent_erase = Game_Event.prototype.erase;
  Game_Event.prototype.erase = function() {
    $gameMap._camera.removeEvent(this._id);
    gk_camera_gameEvent_erase.call(this);
  };

  // ------------------------------------------
  // Camera_Point
  // ------------------------------------------
  // a very simple object used so that the same code can access events and
  // still points

  function Camera_Point() {
    this.initialize.apply(this, arguments);
  }

  Camera_Point.prototype.initialize = function(x,y) {
    this._realX = x;
    this._realY = y;
  };

  Camera_Point.prototype.isTransparent = function() {
    return false;
  };

  // ------------------------------------------
  // Scene_Boot
  // ------------------------------------------
  // references to the camera and point objects need to be in window[] to avoid
  // save games breaking. I put this in Scene_Boot

  var gk_Camera_scene_boot_initialize = Scene_Boot.prototype.initialize;
  Scene_Boot.prototype.initialize = function() {
      window['Game_Camera'] = Game_Camera.prototype.constructor;
      window['Camera_Point'] = Camera_Point.prototype.constructor;
      gk_Camera_scene_boot_initialize.call(this);
  };


  // ------------------------------------------
  // Game_Camera
  // ------------------------------------------
  // the main camera object that handles everything

  function Game_Camera() {
      this.initialize.apply(this, arguments);
  }

  // ------------------------------------------
  // initialize
  Game_Camera.prototype.initialize = function() {
      this._events = {};
      this._lastKeys = "";
      this._storedSet = {};
      this._duration = 0;
      this._moveTime = defaultMoveTime;
      this._xSensitivity = 0;
      this._ySensitivity = 0;
      this._x = 0;
      this._y = 0;
      this._shiftx = 0;
      this._shifty = 0;
      this._constrain = null;
      this._ignorePlayer = false;
      this._paused = false;
      if (defaultMoveSpeed == 0) {
        this.resetSpeedLimit();
      } else {
        this._speedLimit = defaultMoveSpeed;
      }
  };

  // ------------------------------------------
  // pause - toggle pausing the camera on and off
  Game_Camera.prototype.pause = function(setting) {
    this._paused = setting;
    if (setting == false && this._duration <= 1) {
      this.startMove(Math.max(this._duration,this._moveTime));
    }
  };

  // ------------------------------------------
  // resetSpeedLimit - removes a speed limit
  Game_Camera.prototype.resetSpeedLimit = function() {
    this.startMove(this._moveTime);
    this._speedLimit = null;
  };

  // ------------------------------------------
  // setSpeedLimit - set a speed limit, in pixels per frame
  Game_Camera.prototype.setSpeedLimit = function(mx) {
    this._speedLimit = mx;
  };

  // ------------------------------------------
  // setDuration - set how long it takes for the camera to move, in frames
  Game_Camera.prototype.setDuration = function(val) {
    this._moveTime = val;
  };

  Game_Camera.prototype.startMove = function(val) {
    this._duration = val;
  };

  // ------------------------------------------
  // addPlayer - add the player to the focus list
  Game_Camera.prototype.addPlayer = function() {
    this._events["player"] = $gamePlayer;
    this.startMove(Math.max(this._duration,1));
  };

  // ------------------------------------------
  // removePlayer - remove the player from the focus list
  Game_Camera.prototype.removePlayer = function() {
    delete this._events["player"];
    this.startMove(Math.max(this._duration,1));
  };

  // ------------------------------------------
  // addPoint - add a point to the focus list
  Game_Camera.prototype.addPoint = function(x,y) {
    this._events["point"+x.toString()+"x"+y.toString()] = new Camera_Point(x,y);
    this.startMove(Math.max(this._duration,1));
  };

  // ------------------------------------------
  // removePlayer - remove a point from the focus list
  Game_Camera.prototype.removePoint = function(x,y) {
    delete this._events["point"+x.toString()+"x"+y.toString()];
    this.startMove(Math.max(this._duration,1));
  };

  // ------------------------------------------
  // addPlayer - add an event to the focus list
  Game_Camera.prototype.addEvent = function(ev) {
    if (!$gameMap._events[ev]) {
      console.error('Warning: Event '+ev+' cannot be added, does not exist');
      return false; }
    this._events["event"+ev.toString()] = $gameMap._events[ev];
    this.startMove(Math.max(this._duration,1));
  };

  // ------------------------------------------
  // removeEvent - remove an event from the focus list
  Game_Camera.prototype.removeEvent = function(ev) {
    delete this._events["event"+ev.toString()];
    this.startMove(Math.max(this._duration,1));
  };

  // ------------------------------------------
  // addPlayer - add a follower to the focus list
  Game_Camera.prototype.addFollower = function(num) {
    this._events["follower"+num.toString()] = $gamePlayer.followers()._data[num];
    this.startMove(Math.max(this._duration,1));
  };

  // ------------------------------------------
  // removeFollower - remove a follower from the focus list
  Game_Camera.prototype.removeFollower = function(num) {
    delete this._events["follower"+num.toString()];
    this.startMove(Math.max(this._duration,1));
  };

  // ------------------------------------------
  // setupSensitivity - initialise the sensitivity when a map is setup
  Game_Camera.prototype.setupSensitivity = function() {
    if (this._xSensitivity == 0 && this._ySensitivity == 0) {
      this.setSensitivity(defaultSensitivity,defaultSensitivity);
    }
  };

  // ------------------------------------------
  // setSensitivity - set the x and y sensitivity
  Game_Camera.prototype.setSensitivity = function(x,y) {
    this._xSensitivity = (Graphics.width / $gameMap.tileWidth() - 1) * x;
    this._ySensitivity = (Graphics.height / $gameMap.tileHeight() - 1) * y;
  };

  // ------------------------------------------
  // setIgnore - set if the player is being ignored for 'onscreen' calculations
  Game_Camera.prototype.setIgnore = function(val) {
    this._ignorePlayer = val;
    this.startMove(Math.max(this._duration,1));
  };

  // ------------------------------------------
  // snap - instantly move the camera to the end position
  Game_Camera.prototype.snap = function() {
    this.startMove(0);
    this._lastKeys = "";
  };

  // ------------------------------------------
  // pan - move the camera
  Game_Camera.prototype.pan = function(x,y) {
    this._shiftx += x;
    this._shifty += y;
    this.startMove(Math.max(this._moveTime,this._duration));
  };

  Game_Camera.prototype.resetPan = function() {
    this._shiftx = 0;
    this._shifty = 0;
    this.startMove(Math.max(this._moveTime,this._duration));
  };

  // ------------------------------------------
  // scroll - move the camera, used by Scroll Map event command
  Game_Camera.prototype.scroll = function(x,y,speed) {
    this._shiftx += x;
    this._shifty += y;
    this.startMove(Math.max(speed,this._duration));
  };

  // ------------------------------------------
  // isScrolling - returns true if the camera is moving
  Game_Camera.prototype.isScrolling = function() {
    if (this._duration > 0) { return true; } else { return false; }
  };

  // ------------------------------------------
  // clear - resets the basic camera settings
  Game_Camera.prototype.clear = function() {
    this._events = {};
    this._shiftx = 0;
    this._shifty = 0;
    this.startMove(0);
  };

  // ------------------------------------------
  // clearStored - clears stored camera settings
  Game_Camera.prototype.clearStored = function() {
    this._storedSet = {};
  };

  // ------------------------------------------
  // clearAll - clears everything
  Game_Camera.prototype.clearAll = function() {
    this.clear();
    this.clearStored();
    this._lastKeys = "";
    this._ignorePlayer = false;
    this.startMove(0);
    if ($gameMap.isLoopVertical() || $gameMap.isLoopHorizontal()) {
      this._constrain = null;
    } else {
      this._constrain = [0,0,$gameMap.width(),$gameMap.height()];
    }
  };

  // ------------------------------------------
  // store - stores camera settings to a backup
  Game_Camera.prototype.store = function(name) {
    var cloned = "";
    for (var key in this._events) {
      cloned = cloned+ "," + key;
    }
    if (this._constrain != null) {
      var conclone = this._constrain.toString();
      for (var i=0;i<4;i++) { conclone[i] = parseFloat(this._constrain[i]); }
    } else {
      var conclone = 'null';
    }
    var store = [this._xSensitivity,this._ySensitivity,this._ignorePlayer,
                 this._shiftx,this._shifty,conclone,cloned,this._moveTime,
                 this._speedLimit];
    this._storedSet[name] = store;
  };

  // ------------------------------------------
  // restore - restores camera settings from a backup
  Game_Camera.prototype.restore = function(name) {
    if (!this._storedSet[name]) {
      console.error("Warning: no camera settings called "+name);
      return false;
    }
    this._events = {};
    this.restoreEvents(this._storedSet[name][6].split(","));
    this._xSensitivity = this._storedSet[name][0];
    this._ySensitivity = this._storedSet[name][1];
    this._ignorePlayer = this._storedSet[name][2];
    this._shiftx = this._storedSet[name][3];
    this._shifty = this._storedSet[name][4];
    this._moveTime = this._storedSet[name][7];
    this._speedLimit = this._storedSet[name][8];
    if (this._storedSet[name][5] == 'null') {
      this.unconstrain();
    } else {
      this._constrain = [];
      this._constrain = this._storedSet[name][5].split(",");
      for (var i = 0; i<4; i++) {
        this._constrain[i] = parseInt(this._constrain[i]);
      }
    }
    this.startMove(Math.max(this._duration,1));
  };

  // ------------------------------------------
  // restoreEvents - restores a list of event keys into an events list
  Game_Camera.prototype.restoreEvents = function(evs) {
    for (var i = 0; i < evs.length; i++) {
      switch(evs[i][2]) {
        case 'a': // plAyer
          this.addPlayer();
          break;
        case 'e': // evEnt
          this.addEvent(parseInt(evs[i].slice(5)));
          break;
        case 'i': // poInt
          var txt = evs[i].slice(5);
          var coord = txt.split("x");
          this.addPoint(parseInt(coord[0]),parseInt(coord[1]));
          break;
        case 'l': // foLlower
          this.addFollower(parseInt(evs[i].slice(-1)));
          break;
      }
    }
  };

  // ------------------------------------------
  // constrain - sets up the camera constrain
  Game_Camera.prototype.constrain = function(x,y,x2,y2) {
    if (this._constrain == null) {
      this._constrain = [0,0,0,0];
    }
    this._constrain[0] = Math.max(x,0);
    this._constrain[1] = Math.max(y,0);
    this._constrain[2] = Math.min($gameMap.width(),x2);
    this._constrain[3] = Math.min($gameMap.height(),y2);
    if (this._duration == 0) { this.startMove(this._moveTime); }
  };

  // ------------------------------------------
  // removes the camera constrain
  Game_Camera.prototype.unconstrain = function() {
    this._constrain = null;
    if (this._duration == 0) { this.startMove(this._moveTime); }
  };

  // ------------------------------------------
  // inConstrain - returns true if the camera is inside the constrain
  Game_Camera.prototype.inConstrain = function() {
    if (this._constrain == null) { return true; }
    var x = $gameMap._displayX;
    var y = $gameMap._displayY;
    if (x < this._constrain[0] || x > this._constrain[0] + this._constrain[2]
      || x < this._constrain[1] || x > this._constrain[1] + this._constrain[3]) {
        return false;
    } else { return true; }
  };

  // ------------------------------------------
  // isOneOnscreen - converts a key into an event and returns true if onscreen
  Game_Camera.prototype.isOneOnscreen = function(key) {
    return this.isOnScreen(this._events[key]);
  };

  // ------------------------------------------
  // isOnScreen - returns true if an event is onscreen
  Game_Camera.prototype.isOnScreen = function(event) {
    if (event.isTransparent()) { return false; }
    if (this._ignorePlayer) { return true; }
    var xdist = Math.abs(event._realX - $gamePlayer._realX);
    var ydist = Math.abs(event._realY - $gamePlayer._realY);
    if ($gameMap.isLoopHorizontal()) {
      xdist = Math.min(xdist,Math.abs($gameMap.width()-xdist));
    }
    if ($gameMap.isLoopVertical()) {
      ydist = Math.min(ydist,Math.abs($gameMap.height()-ydist));
    }
    if (xdist > this._xSensitivity || ydist > this._ySensitivity) {
      return false;
    }
    return true;
  };

  Game_Camera.prototype.centerX = function() {
    return (Graphics.width / $gameMap.tileWidth() - 1) / 2;
  };

  Game_Camera.prototype.centerY = function() {
    return (Graphics.height / $gameMap.tileHeight() - 1) / 2;
  };

  // ------------------------------------------
  // dura - corrects the movetime when there is a speed limit
  Game_Camera.prototype.dura = function(tx,ty) {
    if (this._speedLimit == null || this._speedLimit == 0 ) { return this._moveTime; }
    if (Math.abs(this._x-tx)/this._speedLimit > Math.abs(this._y-ty)/this._speedLimit) {
      return Math.floor(Math.abs(this._x-tx) / this._speedLimit);
    } else {
      return Math.floor(Math.abs(this._y-ty) / this._speedLimit);
    }
  };

  // ------------------------------------------
  // loopmap - adjusts target coordinates for when camera must loop across the
  //           edges of the map
  Game_Camera.prototype.loopMap = function(current,target,max) {
    if (Math.abs(current-target) <= max/2) { return target; }
    if (current > max/2) {
      return max + target;
    } else {
      return 0 - max + target;
    }
  };

  // ------------------------------------------
  // update - calculates and updates the camera position every frame
  Game_Camera.prototype.update = function() {
    if (this._paused) { return; }
    // what out what events are onscreen, and get target coordinates
    var tx = 0; var ty = 0; var tn = 0; var keys = '';
    for (var key in this._events) {
      if (this.isOnScreen(this._events[key])) {
        tn = tn + 1;
        if ($gameMap.isLoopHorizontal()) {
          tx = tx + this.loopMap(this._x,this._events[key]._realX,$gameMap.width());
        } else {
          tx = tx + this._events[key]._realX;
        }
        if ($gameMap.isLoopVertical()) {
          ty = ty + this.loopMap(this._y,this._events[key]._realY,$gameMap.height());
        } else {
          ty = ty + this._events[key]._realY;
        }
        keys = keys.concat(key);
      } //else { console.log(key+' is not onscreen'); }
    }
    // if nothing is onscreen, add the player
    if (tn == 0) {
      tx = $gamePlayer._realX;
      ty = $gamePlayer._realY;
      tn = 1;
      keys = 'player';
    }
    // get the average and add the pan
    tx = tx / tn + this._shiftx;
    ty = ty / tn + this._shifty;
    // if the onscreen events have changed since last update, start a camera
    // move
    if (this._lastKeys != keys && this._lastKeys.length > 0) {
      this.startMove(this.dura(tx,ty));
    }
    // move it to be inside the constrain, if one exists
    if (this._constrain != null) {
      tx = Math.max(this._constrain[0] + this.centerX(), tx);
      tx = Math.min(this._constrain[0] + this._constrain[2] - this.centerX(), tx);
      ty = Math.max(this._constrain[1] + this.centerY(), ty);
      ty = Math.min(this._constrain[1] + this._constrain[3] - this.centerY(), ty);
    } else {
      if ($gameMap.isLoopHorizontal()) {
        tx = this.loopMap(this._x,tx,$gameMap.width());
      }
      if ($gameMap.isLoopVertical()) {
        ty = this.loopMap(this._y,ty,$gameMap.height());
      }
    }
    if (this._x == tx && this._y == ty) {
      this.startMove(0);
    }
    // move the camera based on the target and duration...
    if (this._duration == 0) {
      this._x = tx;
      this._y = ty;
    } else {
      if (this._speedLimit != null ) {
        var dx = tx - this._x;
        var dy = ty - this._y;
        var dh = Math.hypot(dx,dy);
        if (dh > this._speedLimit) {
          var ratio = this._speedLimit / dh;
        } else {
          var ratio = 1;
          this.startMove(0);
        }
        this._x += dx*ratio;
        this._y += dy*ratio;
      } else {
        var d = this._duration;
        this._x = (this._x * (d - 1) + tx) / d;
        this._y = (this._y * (d - 1) + ty) / d;
        this._duration -= 1;
      }
    }
    // make sure the coordinates are in bounds
    var wid = $gameMap.width()
    if (this._x > wid) {
      this._x = this._x % wid;
    } else if (this._x < 0) {
      this._x = wid + this._x;
    }
    var hei = $gameMap.height()
    if (this._y > hei) {
      this._y = this._y % hei;
    } else if (this._y < 0) {
      this._y = hei + this._y;
    }
    // finally, update the map position
    $gameMap.setDisplayPos(this._x-this.centerX(),this._y-this.centerY());
    this._lastKeys = keys;
    //this way madness lies
    //this._zoomScale = 2;
    //console.log(SceneManager._scene._spriteset._tilemap.origin);
    //SceneManager._scene._spriteset._tilemap._width = Math.ceil(Graphics.width * this._zoomScale) + 100;
    //SceneManager._scene._spriteset._tilemap._height = Math.ceil(Graphics.height * this._zoomScale) + 100;
    //$gameScreen.setZoom(0, 0, 1 / this._zoomScale);
  };

  // ------------------------------------------
  // DataManager
  // ------------------------------------------
  // some alterations need to be made to how games are saved and loaded.
  // before saving the camera stores a backup called "@SaveGameStore@"
  // after reloading, it restores from that backup so that the event list can
  // be rebuilt - otherwise saving and loading breaks the associations

  var gk_camera_DataManager_saveGame = DataManager.saveGame;
  DataManager.saveGame = function(savefileId) {
    $gameMap._camera.store("@SaveGameStore@");
    return gk_camera_DataManager_saveGame.call(this,savefileId);
  };

  var gk_camera_Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
  Scene_Load.prototype.onLoadSuccess = function() {
    gk_camera_Scene_Load_onLoadSuccess.call(this);
    $gameMap._camera.restore("@SaveGameStore@");
  };


})();
