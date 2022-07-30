<Use Undertale Attack>

<UTB Duration: 600>

<UTB Initial Code>
this._powerness = 60;
this._powerclaw = 30;
</UTB Initial Code>

<UTB Attack 1>
Initial X: this.window.x + this.window.width/2
Initial Y: this.window.y + this.window.height/2
Spawn Rate: -1
X Speed: 0
Y Speed: 0
Width: 360
Height: 180
Collision Type: none
Image: claw_diag_left_warn
Animation Frames: 2
Animation Speed: 5

<Direct Code>
    if(frame % 10 === 0 && frame < 30){
        AudioManager.playSe({name: 'blip_button', pan: 0, pitch: 140, volume: 5});
    }
    if(frame === 30){
        this.opacity = 0;
     }
</Direct Code>
</UTB Attack 1>

<UTB Attack 2>
Initial X: this.window.x + this.window.width/2
Initial Y: this.window.y + this.window.height/2
Spawn Rate: -1
X Speed: 0
Y Speed: 0
Width: 360
Height: 180
Collision Type: none
Image: claw_diag_right_warn
Animation Frames: 2
Animation Speed: 5

<Direct Code>
    if(frame % 10 === 0 && frame < 30){
        AudioManager.playSe({name: 'blip_button', pan: 0, pitch: 140, volume: 5});
    }
    if(frame === 30){
        this.opacity = 0;
     }
</Direct Code>
</UTB Attack 2>

<UTB Attack 3>
Initial X: this.window.x + this.window.width/2
Initial Y: this.window.y + this.window.height/2
Spawn Rate: -1
X Speed: 0
Y Speed: 0
Width: 360
Height: 180
Collision Type: none
Image: claw_vert_warn
Animation Frames: 2
Animation Speed: 5

<Direct Code>
    if(frame % 10 === 0 && frame < 30){
        AudioManager.playSe({name: 'blip_button', pan: 0, pitch: 140, volume: 5});
    }
    if(frame === 30){
        this.opacity = 0;
     }
</Direct Code>
</UTB Attack 3>

<UTB Attack 4>
Initial X: this.window.x + this.window.width/2
Initial Y: this.window.y + this.window.height/2
Spawn Rate: -1
X Speed: 0
Y Speed: 0
Width: 360
Height: 180
Collision Type: none
Image: claw_hor_warn
Animation Frames: 2
Animation Speed: 5

<Direct Code>
    if(frame % 10 === 0 && frame < 30){
        AudioManager.playSe({name: 'blip_button', pan: 0, pitch: 140, volume: 5});
    }
    if(frame === 30){
        this.opacity = 0;
     }
</Direct Code>
</UTB Attack 4>

<UTB Attack 5>
Initial X: this.window.x;
Initial Y: this.window.y;
Spawn Rate: -1
X Speed: 0
Y Speed: 0
Opacity: 1;
Collision Type: pixel
Image: Blue-Claw
Animation Frames: 1
Animation Speed: 1

<Direct Code>
    if(frame === 30){
        AudioManager.playSe({name: 'hit4', pan: 0, pitch: 150, volume: 15});
        this.opacity = 255;
        this.xspeed=10;
        this.yspeed=10;
    }
</Direct Code>
</UTB Attack 5>

<UTB Attack 6>
Initial X: this.window.x + this.window.width;
Initial Y: this.window.y;
Spawn Rate: -1
X Speed: 0
Y Speed: 0
Opacity: 1;
Collision Type: pixel
Image: Blue-Claw
Animation Frames: 1
Animation Speed: 1

<Direct Code>
    if(frame === 30){
        AudioManager.playSe({name: 'hit4', pan: 0, pitch: 150, volume: 15});
        this.opacity = 255;
        this.xspeed=-10;
        this.yspeed=10;
    }
</Direct Code>
</UTB Attack 6>

<UTB Attack 7>
Initial X: this.window.x + 30;
Initial Y: this.window.y + 30;
Spawn Rate: -1
X Speed: 0
Y Speed: 0
Opacity: 1;
Collision Type: pixel
Image: Blue-Claw
Animation Frames: 1
Animation Speed: 1

<Direct Code>
    if(frame === 30){
        AudioManager.playSe({name: 'hit4', pan: 0, pitch: 150, volume: 15});
        this.opacity = 255;
        this.yspeed=10;
    }
</Direct Code>
</UTB Attack 7>

<UTB Attack 8>
Initial X: this.window.x + 30;
Initial Y: this.window.y + 30;
Spawn Rate: -1
X Speed: 0
Y Speed: 0
Opacity: 1;
Collision Type: pixel
Image: Blue-Claw
Animation Frames: 1
Animation Speed: 1

<Direct Code>
    if(frame === 30){
        AudioManager.playSe({name: 'hit4', pan: 0, pitch: 150, volume: 15});
        this.opacity = 255;
        this.xspeed=10;
    }
</Direct Code>
</UTB Attack 8>

<UTB Code>
if(f % this._powerness === 0) { 
    var random = Math.randomInt(4);
    if(random === 0){
        
        this.createAttack(1);
        this.createAttack(5);
    }
    else if(random === 1){
        this.createAttack(2);
        this.createAttack(6);
    }
    else if(random === 2){
        this.createAttack(3);
        this.createAttack(7);
        var atk = this.createAttack(7);
        atk.x += (this.window.width - 60);
    }
    else if(random === 3){
        this.createAttack(4);
        this.createAttack(8);
        var atk = this.createAttack(8);
        atk.y += (this.window.height - 60);
    }
}
</UTB Code>