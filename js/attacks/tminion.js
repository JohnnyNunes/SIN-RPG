<Use Undertale Attack>

<UTB Duration: 600>

<UTB Initial Code>
this._powerness = 60;
this._yDirection = 1;
</UTB Initial Code>

<UTB Attack 1>
Initial X: 0
Initial Y: this.window.y
Spawn Rate: -1
X Speed: 5
Y Speed: 0
Collision Type: Pixel
Image: tminion1_dash
Animation Frames: 3
Animation Speed: 3
</UTB Attack 1>

<UTB Attack 2>
Initial X: Graphics.boxWidth
Initial Y: this.window.y
Spawn Rate: -1
X Speed: -5
Y Speed: 0
Collision Type: Pixel
Image: tminion1_dashR
Animation Frames: 3
Animation Speed: 3
</UTB Attack 2>

<UTB Code>
if(f === 1) {
    if(!$gameMessageBubble.hasSavedText()) {
        this.message("CATCH HIM");
    }
}

if(f % this._powerness === 0) {
    AudioManager.playSe({name: 'engine_vehiclepass', pan: 0, pitch: 130, volume: 15});
    var atk = this.createAttack(Math.randomInt(2) + 1);
    var random = Math.randomInt(4);
    if(random === 0)atk.y += 30 + 3;
    else if(random === 1) atk.y += 70 + 3;
    else if(random === 2) atk.y += 110 + 3;
    else if(random === 3) atk.y += 150 + 3;
}
</UTB Code>

