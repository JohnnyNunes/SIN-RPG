<Use Undertale Attack>

<UTB Duration: 300>

<UTB Code>

if(f === 1 || f % 94 === 0) {
  AudioManager.playSe({name: 'zap_laser', pan: 0, pitch: 70, volume: 10});
  if(Math.random() > 0.5) {
    this.createAttack(1);
  } else {
    this.createAttack(2);
  }
}
</UTB Code>

<UTB Attack 1>
Initial X: this.window.x - 50
Initial Y: this.window.y + this.window.width - 168
Spawn Rate: -1
Y Speed: 0
X Speed: 0
Collision Type: Pixel
Opacity: 255
Image: vert_laser

<Direct Code>

    if(frame > 4){
        this.xspeed += 0.05
    }
    if(frame!= 0 && frame % 94 === 0){
        this.delete();
    }
</Direct Code>
</UTB Attack 1>

<UTB Attack 2>
Initial X: this.window.x + this.window.width + 50 //this.window.width 180
Initial Y: this.window.y + this.window.width - 168
Spawn Rate: -1
Y Speed: 0
X Speed: 0
Collision Type: Pixel
Opacity: 255
Image: vert_laser

<Direct Code>

    if(frame > 5){
        this.xspeed -= 0.05
    }
    if(frame!= 0 && frame % 94 === 0){
        this.delete();
    }
</Direct Code>
</UTB Attack 2>