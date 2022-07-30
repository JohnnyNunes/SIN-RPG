<Use Undertale Attack>
<UTB Duration: 600>

<UTB Initial Code>
this._powerness = 30;
</UTB Initial Code>

<UTB Code>

if(f % this._powerness === 0) {
    var random = Math.randomInt(6);
    if(random === 0) var atk = this.createAttack(1);
    else if(random === 1) var atk = this.createAttack(2);
    else if(random === 2) var atk = this.createAttack(3);
    else if(random === 3) var atk = this.createAttack(4);
    else if(random === 4) var atk = this.createAttack(5);
    else if(random === 5) var atk = this.createAttack(6);

    var random2 = Math.randomInt(3);
    if(random2 === 0) atk.y += 30 + 3;
    else if(random2 === 1) atk.y += 90 + 3;
    else if(random2 === 2) atk.y += 150 + 3;
}

</UTB Code>

============================================================

<UTB Attack 1>
Initial X: 0
Initial Y: this.window.y
Spawn Rate: -1
X Speed: 4
Y Speed: 0
Collision Type: Pixel
Image: tetris_L
</UTB Attack 1>

<UTB Attack 2>
Initial X: 0
Initial Y: this.window.y
Spawn Rate: -1
X Speed: 4
Y Speed: 0
Collision Type: Pixel
Image: tetris_J
</UTB Attack 2>

<UTB Attack 3>
Initial X: 0
Initial Y: this.window.y
Spawn Rate: -1
X Speed: 4
Y Speed: 0
Collision Type: Pixel
Image: tetris_I
</UTB Attack 3>

<UTB Attack 4>
Initial X: 0
Initial Y: this.window.y
Spawn Rate: -1
X Speed: 4
Y Speed: 0
Collision Type: Pixel
Image: tetris_Z
</UTB Attack 4>

<UTB Attack 5>
Initial X: 0
Initial Y: this.window.y
Spawn Rate: -1
X Speed: 4
Y Speed: 0
Collision Type: Pixel
Image: tetris_S
</UTB Attack 5>

<UTB Attack 6>
Initial X: 0
Initial Y: this.window.y
Spawn Rate: -1
X Speed: 4
Y Speed: 0
Collision Type: Pixel
Image: tetris_O
</UTB Attack 6>