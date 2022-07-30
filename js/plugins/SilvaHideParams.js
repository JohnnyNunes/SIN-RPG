var Silva = Silva || {};
Silva.HideParams = Silva.HideParams || {};
Silva.HideParams.version = 1.1;

/*:
 * @plugindesc v1.1 this plugin allows you to hide certain parameters from menus
 * @author Silva
 *
 * @param Hide 2
 * @text Hide ATK
 * @type boolean
 * @desc ON = Hide
 * OFF = Show
 * @default false
 *
 * @param Hide 3
 * @text Hide DEF
 * @type boolean
 * @desc ON = Hide
 * OFF = Show
 * @default false
 *
 * @param Hide 4
 * @text Hide MAT
 * @type boolean
 * @desc ON = Hide
 * OFF = Show
 * @default false
 *
 * @param Hide 5
 * @text Hide MDF
 * @type boolean
 * @desc ON = Hide
 * OFF = Show
 * @default false
 *
 * @param Hide 6
 * @text Hide AGI
 * @type boolean
 * @desc ON = Hide
 * OFF = Show
 * @default false
 *
 * @param Hide 7
 * @text Hide LUK
 * @type boolean
 * @desc ON = Hide
 * OFF = Show
 * @default false
 *
 * @help
 * Version History:
 *
 * 1.1 - Fixed issue where plugin was hiding incorrect parameters
 *       Fixed issue where var i was made global
 * 1.0 - Plugin Released
 */

Silva.Parameters = PluginManager.parameters('SilvaHideParams');
Silva.Param = Silva.Param || {};
Silva.Param.hiddenParams = [];
for (Silva.i = 2; Silva.i < 8; Silva.i++) {
	var string = String('Hide ' + Silva.i);
	if (String(Silva.Parameters[string]).trim() == 'true') {
		Silva.Param.hiddenParams.push(Silva.i);
	}
}

Window_EquipStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        this.drawActorName(this._actor, this.textPadding(), 0);
        var hidden = 0;
        for (var i = 0; i < 6; i++) {
        	if (Silva.Param.hiddenParams.contains(i+2)) {
        		hidden += 1;
        		continue;
        	}
            this.drawItem(0, this.lineHeight() * (1 + i - hidden), 2 + i);
        }
    }
};

Window_Status.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    var hidden = 0;
    for (var i = 0; i < 6; i++) {
        var paramId = i + 2;
        if (Silva.Param.hiddenParams.contains(paramId)) {
        	hidden += 1;
        	continue;
        }
        var y2 = y + lineHeight * (i - hidden);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x, y2, 160);
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x + 160, y2, 60, 'right');
    }
};