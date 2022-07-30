<Use Undertale Attack>

<UTB Duration: 600>

<Initial Code>  
</Initial Code>

<UTB Attack 1>
Initial X: this.window.x + Math.randomInt(4)*40 + 30
Initial Y: this.window.y
X Speed: 0
Y Speed: 0
Collision Type: Pixel
Width: 48
Height: 48
Spawn Rate: 60
Image: Blue-Claw

<Direct Code>

    if(frame === 0){ this.playSe("Wind7"); }
    else if(frame === 51) {
        this.playSe("Wind7");
        this.yspeed = 15;
    }
</Direct Code>
</UTB Attack 1>

<UTB Code>
if(f === 1) {
     var random = Math.randomInt(1);
    if(random === 0) this.createAttack(1);
}
</UTB Code>