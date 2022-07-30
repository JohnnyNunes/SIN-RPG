<Use Undertale Attack>

<UTB Duration: 400>

<UTB Code>

if(f % 44 === 0) {
    var atk = this.createAttack(1);
    var random = Math.randomInt(3);
    if(random === 0)atk.x = this.window.x + 30;
    else if(random === 1)atk.x = this.window.x + 90;
    else if(random === 2)atk.x = this.window.x + 150;
}

</UTB Code>

<UTB Attack 1>
Initial X: this.window.x + 30
Initial Y: this.window.y + this.window.height + 20
Spawn Rate: -1
Y Speed: -2
X Speed: 0
Collision Type: Pixel
Opacity: 255
Image: spikes

<Direct Code>
    if(frame === 17){
        this.yspeed = 0
    }
    if(frame === 70){
        this.yspeed = -10
    }
    if(frame === 88){
        this.delete();
    }
</Direct Code>
</UTB Attack 1>