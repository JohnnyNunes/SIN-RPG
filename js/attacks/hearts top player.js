<Use Undertale Attack>

<UTB Duration: 1000>
<UTB Delete Outside Frame>

============================================================

<UTB Code>
if(f === 1) {
    if(!$gameMessageBubble.hasSavedText()) {
        this.message("Face yourself.");
}
}

if(f % 20 === 0) {
    this.createAttack(1);
}
</UTB Code>

============================================================

<UTB Attack 1>
Initial X: this._player.x
Initial Y: this.window.y
X Speed: 0
Y Speed: 2
Collision Type: pixel
Color: #00FF00
Spawn Rate: -1
Image: heart_bullet
<Direct Code>
</Direct Code>
</UTB Attack 1>