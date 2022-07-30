<Use Undertale Attack>

<UTB Duration: 630>

<UTB Initial Code>
this._powerness = 30;
</UTB Initial Code>

<UTB Attack 1>
Initial X: 0;
Initial Y: 0;
Spawn Rate: -1
X Speed: 0
Y Speed: 0
Opacity: 1;
Collision Type: pixel
Image: teeth_up
Animation Frames: 1
Animation Speed: 1

<Direct Code>
    if(frame === 0){
        this.shape = "none";
        this.opacity = 255;
    }

    if(frame === 45){
        this.shape = "pixel";
        this.yspeed=2.5;
    }

    if(frame === 55){
        AudioManager.playSe({name: 'hit4', pan: 0, pitch: 150, volume: 15});
        this.yspeed=0;
    }

    if(frame === 60){
             this.delete();
        }
</Direct Code>
</UTB Attack 1>

<UTB Attack 2>
Initial X: 0;
Initial Y: 0;
Spawn Rate: -1
X Speed: 0
Y Speed: 0
Opacity: 1;
Collision Type: pixel
Image: teeth_down
Animation Frames: 1
Animation Speed: 1

<Direct Code>
    if(frame === 0){
        this.shape = "none";
        this.opacity = 255;
    }

    if(frame === 45){
        this.shape = "pixel";
        this.yspeed=-2.5;
    }

    if(frame === 55){
        AudioManager.playSe({name: 'hit4', pan: 0, pitch: 150, volume: 15});
        this.yspeed=0;
    }

    if(frame === 60){
             this.delete();
        }
</Direct Code>
</UTB Attack 2>

<UTB Code>
if(f===5) {
    $gameScreen.showPicture(1, "boss_a3", 0, 0, 0, 100, 100, 50, 0);
}
if(f===10) {
    $gameScreen.showPicture(1, "boss_a3", 0, 0, 0, 100, 100, 100, 0);
}
if(f===15) {
    $gameScreen.showPicture(1, "boss_a3", 0, 0, 0, 100, 100, 150, 0);
}
if(f===20) {
    $gameScreen.showPicture(1, "boss_a3", 0, 0, 0, 100, 100, 200, 0);
}
if(f===25) {
    $gameScreen.showPicture(1, "boss_a3", 0, 0, 0, 100, 100, 255, 0);
}

if(f % this._powerness === 0 && f <= 600) { 

        var atk = this.createAttack(1);
        atk.x = Math.randomInt(this.window.width) + this.window.x;
        atk.y = Math.randomInt(this.window.height) + this.window.y;

        var atk2 = this.createAttack(2);
        atk2.x = atk.x;
        atk2.y = atk.y + 50;
}

if(f===605) {
    $gameScreen.showPicture(1, "boss_a3", 0, 0, 0, 100, 100, 255, 0);
}
if(f===610) {
    $gameScreen.showPicture(1, "boss_a3", 0, 0, 0, 100, 100, 200, 0);
}
if(f===615) {
    $gameScreen.showPicture(1, "boss_a3", 0, 0, 0, 100, 100, 150, 0);
}
if(f===620) {
    $gameScreen.showPicture(1, "boss_a3", 0, 0, 0, 100, 100, 100, 0);
}
if(f===625) {
    $gameScreen.showPicture(1, "boss_a3", 0, 0, 0, 100, 100, 50, 0);
}

if(f===630) {
    $gameScreen.erasePicture(1);
}
</UTB Code>