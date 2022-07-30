<Use Undertale Attack>

<UTB Duration: 1800>
<UTB Mode: 0>
<UTB Delete Outside Frame>

============================================================

<UTB Initial Code>
this._a = [];
for(var i = 1; i < 14; i++) {
  this._a.push(Math.randomInt(6));
}
</UTB Initial Code>

============================================================

<UTB Code>
for(var j = 0; j < this._a.length; j++) {
    if(f === (100 * j)) {
        for(var i = 0; i < 6; i++) {
            if(i != this._a[j]) {
                var temp = this.createAttack(1);
                temp.x = this.window.x + ((30 * i) + 15);
                }}}}
</UTB Code>

<UTB Attack 1>
Destructible: true
Initial X: 0
Initial Y: this.window.y
X Speed: 0
Y Speed: 1.5
Color: #FFFFFF
Spawn Rate: -1
Spawn Delay: 0
Collision Type: Pixel
Opacity: 255
Image: entity_bullet
</UTB Attack 1>