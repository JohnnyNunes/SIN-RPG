<Use Undertale Attack>

<UTB Duration: 800>

<UTB Initial Code>
</UTB Initial Code>

<UTB Code>
if(f === 1) {
    this.createAttack(1);
}
</UTB Code>

============================================================

<UTB Attack 1>
Initial X: this.window.x + this.window.width/2 - 15
Initial Y: this.window.y + this.window.width - 168
Y Speed: 0
X Speed: 0
Collision Type: Rect
Width: 12
Height: this.window.width*2
Spawn Rate: -1
Opacity: 255
Rotation: Math.PI*2 - Math.PI/4
Image: vert_laser

<Direct Code>

    if(frame > 120){
        this.rotation += 0.01 //((Math.PI * 5)/40)
    }
</Direct Code></Use>
</UTB Attack 1>