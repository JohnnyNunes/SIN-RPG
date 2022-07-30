/*
0 --> Max HP (MHP)
1 --> Max MP (MMP)
2 --> Attack (ATK)
3 --> Defense (DEF)
4 --> Magic Attack (MAT)
5 --> Magic Defense (MDF)
6 --> Agility (AGI)
7 --> Luck (LUK)
*/

Window_Status.prototype.drawParameters = function(x, y) {
  var lineHeight = this.lineHeight();
  var paramsToDraw = [0, 2, 3, 4, 5];  // This would draw just ATK, DEF, AGI for example
  for (var i = 0; i < paramsToDraw.length; i++) {
      var y2 = y + lineHeight * i;
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.param(paramsToDraw[i]), x, y2, 160);
      this.resetTextColor();
      this.drawText(this._actor.param(paramsToDraw[i]), x + 160, y2, 60, 'right');
  }
};

