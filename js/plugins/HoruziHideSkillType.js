Window_SkillType.prototype.makeCommandList = function () {
    if (this._actor) {
        var skillTypes = this._actor.addedSkillTypes();
        skillTypes.sort(function (a, b) {
            return a - b;
        });
        skillTypes = skillTypes.filter(function (stype) {
            //hide 1
            return ![1].contains(stype);
        });
        skillTypes.forEach(function (stypeId) {
            var name = $dataSystem.skillTypes[stypeId];
            this.addCommand(name, 'skill', true, stypeId);
        }, this);
    }
};