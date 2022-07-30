/*:
-------------------------------------------------------------------------
@title Pre-emptive Battle Events
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Jan 10, 2016
@filename HIME_PreEmptiveBattleEvents.js
@url http://himeworks.com/?p=5429&preview=true

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc v1.0 - Allows you to use an event command to determine whether the
next battle will be a pre-emptive or surprise attack
@help 
-------------------------------------------------------------------------------
== Description ==

Ever wanted more control over whether your party will get a pre-emptive strike
when a battle begins, or a surprise attack from the enemy?

This plugin provides you with a way to guarantee a pre-emptive or surprise
by setting some variables.

The variables determine how many battles the corresponding effect will occur.
For example, if your pre-emptive variable had a value of 3, that means for
the next 3 battles, you will have pre-emptive strike.

During each battle, the variables will automatically be decreased by 1, so
you don't need to worry about updating them yourself.

By managing these variables in your events or skills, you can create forced
pre-emptive strikes or surprise attacks, which leads to different mechanics
and storyline tools for your game.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.0 - Jan 10, 2016
 - initial release

== Usage ==

In the plugin parameters, choose which variables will represent pre-emptive
strike and surprise attack.

Then, you can just set them up in your events, or any other methods that you
know to change variable values.

-------------------------------------------------------------------------------
@param Pre-Emptive Variable ID
@desc Game Variable that tracks the number of battles that will be pre-emptive.
@default 10

@param Surprise Variable ID
@desc Game Varaible that tracks the number of battles that will be surprise
@default 11
-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_PreEmptiveBattleEvent = 1;
TH.PreEmptiveBattleEvent = TH.PreEmptiveBattleEvent || {};

(function ($) {

  $.params = PluginManager.parameters("HIME_PreEmptiveBattleEvents");
  $.preEmptiveId = Math.floor($.params["Pre-Emptive Variable ID"]);
  $.surpriseId = Math.floor($.params["Surprise Variable ID"]);
  
  var TH_BattleManager_startBattle = BattleManager.startBattle;    
  BattleManager.startBattle = function() {
    this.checkPreemptiveVariables();
    TH_BattleManager_startBattle.call(this);
  };
  
  BattleManager.checkPreemptiveVariables = function() {
    if ($gameVariables.value($.preEmptiveId) > 0) {
      $gameVariables.setValue($.preEmptiveId, $gameVariables.value($.preEmptiveId) - 1)
      this._preemptive = true;
    }
    
    if ($gameVariables.value($.surpriseId) > 0) {
      $gameVariables.setValue($.surpriseId, $gameVariables.value($.surpriseId) - 1)
      this._surprise = true;
    }
  };
})(TH.PreEmptiveBattleEvent)