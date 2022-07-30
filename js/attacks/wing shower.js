<Use Undertale Attack>

<UTB Duration: 1000>
<UTB Mode: 0>

============================================================

<UTB Initial Code>
this._a = [];
this._a.push(0.2);
this._a.push(0.4);
this._a.push(0.6);
this._a.push(0.8);
this._a.push(1.0);
this._a.push(1.2);
this._a.push(1.4);
this._a.push(1.6);
this._a.push(1.8);
this._a.push(2);

this._a.push(1.8);
this._a.push(1.6);
this._a.push(1.4);
this._a.push(1.2);
this._a.push(1.0);
this._a.push(0.8);
this._a.push(0.6);
this._a.push(0.4);
this._a.push(0.2);

this._a.push(0.4);
this._a.push(0.6);
this._a.push(0.8);
this._a.push(1.0);
this._a.push(1.2);
this._a.push(1.4);
this._a.push(1.6);
this._a.push(1.8);
this._a.push(2);

this._a.push(1.8);
this._a.push(1.6);
this._a.push(1.4);
this._a.push(1.2);
this._a.push(1.0);
this._a.push(0.8);
this._a.push(0.6);
this._a.push(0.4);
this._a.push(0.2);

this._yDirection = 0.5;
this._xDirection = -2;
</UTB Initial Code>

============================================================

<UTB Code>
$gameScreen.showPicture(1, "boss_a2", 0, 0, 0, 100, 100, 255, 0);

    this.window.x += this._xDirection;
    this._player.x += this._xDirection;
    this.window.y += this._yDirection;
    if(f % 60 === 0) this._yDirection = -this._yDirection;
    if(this.window.x === 260 || this.window.x === 700 - this.window.width) this._xDirection = -this._xDirection;

for(var j = 0; j < this._a.length; j++) {
if(f === (25 * j)) {
    var temp = this.createAttack(1);
    temp.x = this.window.x;
    temp.xspeed = this._a[j];

    var temp = this.createAttack(1);
    temp.x = this.window.x + this.window.width;
    temp.xspeed = -this._a[j];
}}

if(f===1000) {
    $gameScreen.erasePicture(1);
}

</UTB Code>

<UTB Attack 1>
Destructible: true
Initial X: - 50
Initial Y: this.window.y - 100
Collision Type: Circle
X Speed: 0.1
Y Speed: 2
Radius: 3
Color: #FFFFFF
Spawn Rate: -1
Spawn Delay: 0
</UTB Attack 1>
