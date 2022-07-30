<Use Undertale Attack>

<UTB Duration: 1000>

============================================================

<UTB Code>
$gameScreen.showPicture(1, "boss_a1", 0, 0, 0, 100, 100, 255, 0);
if(f % 40 === 0) {
    this.createAttack(1);
}
if(f===1000) {
    $gameScreen.erasePicture(1);
}
</UTB Code>

============================================================

<UTB Attack 1>
Initial X: this._player.x
Initial Y: this.window.y - 50
X Speed: 0
Y Speed: 0
Collision Type: pixel
Color: #00FF00
Spawn Rate: -1
Image: upper_claw
<Direct Code>
if(frame === 0) {
 this.yspeed = -1;
}
if(frame === 20) {
  this.yspeed = 0;
}
if(frame === 30) {
  this.yspeed = -5;
}
if(frame === 60) {
  AudioManager.playSe({name: 'hit', pan: 0, pitch: 150, volume: 15});
  this.yspeed = 10;
}
</Direct Code>
</UTB Attack 1>