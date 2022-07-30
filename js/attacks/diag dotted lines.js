<Use Undertale Attack>

<UTB Duration: 1300>
<UTB Mode: 0>

============================================================

(Creates Initial Maze)
<UTB Initial Code>
this._a = [];
this._a.push(Math.randomInt(8) + 1);
for(var i = 1; i < 19; i++) {
  var prev = this._a[i-1];
  prev += (Math.randomInt(2) - 1);
  if(prev > 8) prev += (Math.randomInt(2) - 3);
  if(prev < 1) prev += (Math.randomInt(2) + 1);
  this._a.push(prev);
}
</UTB Initial Code>

============================================================

<UTB Code>
for(var j = 0; j < this._a.length; j++) {
if(f === (50 * j)) {
for(var i = 0; i < 10; i++) {
if(i != this._a[j]) {
var temp = this.createAttack(1);
temp.x = this.window.x/2 + ((30 * i) + 15);

var temp2 = this.createAttack(1);
temp2.x = this.window.x + ((30 * i) + 15) + 50;
temp2.xspeed = -2;
}}}}
</UTB Code>

<UTB Attack 1>
Destructible: true
Initial X: - 50
Initial Y: this.window.y - 100
Collision Type: Pixel
X Speed: 2
Y Speed: 2
Radius: 3
Color: #FFFFFF
Spawn Rate: -1
Spawn Delay: 0
</UTB Attack 1>