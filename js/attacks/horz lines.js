<Use Undertale Attack>

<UTB Duration: 800>
<UTB Delete Outside Frame>

<UTB Code>
if(f % 80 === 0) {
  if(Math.random() > 0.5) {
    this.createAttack(1);
    this.createAttack(2);
  } else {
    this.createAttack(3);
    this.createAttack(4);
  }
}
</UTB Code>

============================================================

<UTB Attack 1>
Initial X: this.window.x + this.window.width/2 - this.window.width/4 
Initial Y: this.window.y
Y Speed: 1.5
Collision Type: Pixel
Width: this.window.width/2
Height: 12
Spawn Rate: -1
Opacity: 255
Image: Blue-Line
</UTB Attack 1>

<UTB Attack 2>
Initial X: this.window.x + this.window.width/2 + this.window.width/4
Initial Y: this.window.y + this.window.height
Y Speed: -1.5
Collision Type: Pixel
Width: this.window.width/2
Height: 12
Spawn Rate: -1
Opacity: 255
Image: Blue-Line
</UTB Attack 2>

<UTB Attack 3>
Initial X: this.window.x
Initial Y: this.window.y + (this.window.height/2) - this.window.width/4
X Speed: 1.5
Y Speed: 0
Collision Type: Pixel
Width: 12
Height: this.window.height/2
Spawn Rate: -1
Opacity: 255
Image: Blue-Line-Vertical
</UTB Attack 3>

<UTB Attack 4>
Initial X: this.window.x + this.window.width
Initial Y: this.window.y + (this.window.height/2) + this.window.width/4
X Speed: -1.5
Y Speed: 0
Collision Type: Pixel
Width: 12
Height: this.window.height/2
Spawn Rate: -1
Opacity: 255
Image: Blue-Line-Vertical
</UTB Attack 4>