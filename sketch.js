var Render;
var gsize;
var psize;
var grid;
var x;
var y;
var s;
var stepsPerFrame=10;
const colors = [
  [220,220,220],
  [0, 0, 0],
  [255, 0, 0],
  [0, 255, 0],
  [0, 255, 255],
  [255, 255, 0],
  [255, 0, 255],
  [128, 128, 128],
  [128, 0, 0],
  [0, 128, 0],
  [0, 0, 255],
  [128,128,0],
  [128,0,128]
]
var Ants = []

class Ant {
  constructor(fx, fy, fd, code) {
    this.x = fx
    this.y = fy
    this.d = fd
    this.c = code
  }
  update() {
    //Change the ants's current cell color
    if (grid[this.y][this.x] == this.c.length - 1) {
      grid[this.y][this.x] = 0
    } else {
      grid[this.y][this.x]++
    }
    Render.push([this.x,this.y])

    //Rotate the ant  
    if (this.c[grid[this.y][this.x]] == "R") {
      if (this.d == 0) {
        this.d = 3
      } else {
        this.d--
      }
    } else if (this.c[grid[this.y][this.x]] == "L") {
      if (this.d == 3) {
        this.d = 0
      } else {
        this.d++
      }
    }
    //Move the ant
    if (this.d == 0) {
      this.y--
    } else if (this.d == 1) {
      this.x--
    } else if (this.d == 2) {
      this.y++
    } else if (this.d == 3) {
      this.x++
    }
    //World Wrapping
    if (this.x < 0) {
      this.x = gsize - 1
    } else if (this.x == gsize) {
      this.x = 0
    } else if (this.y < 0) {
      this.y = gsize - 1
    } else if (this.y == gsize) {
      this.y = 0
    }


  }
}

function setup() {
  createCanvas(500, 500);
  Tsteps = createElement("h2", "")
  Tsteps.position(5,-20)
  button = createButton("New Grid")
  button.mousePressed(restart)
  txt = createElement("p", "")
  Sfr = createSlider(1, 60, 60)
  Ssize = createSlider(50, 500, 150)
  
  Ispf=createInput(10)
  Bspf=createButton("Set Steps Per Frame")
  Bspf.mousePressed(Sspf)
  
  createElement("h2", "Click to add a new ant")
  createElement("p", "Enter code for your ant (with R=right and L=left)")
  inp = createInput("RL");
  restart()
}

function draw() {
  Tsteps.html(s)
  txt.html("Frame Rate: " + Sfr.value() + "/60 | Grid size: " + Ssize.value() + "/500")
  frameRate(Sfr.value())
  render()
  for (let steps = 0; steps < stepsPerFrame; steps++) {
    if (Ants.length > 0) {
      s++
    }
    for (let a of Ants) {
      a.update()
    }
  }

}

function render() {
  //background(220);
  for (let i of Render){
    noStroke()
    fill(colors[(grid [i[1]] [i[0]] )])
    rect(i[0] * psize, i[1] * psize, psize, psize)
  }
  Render=[]
}

function mousePressed() {
  if (mouseX <= width && mouseY <= height) {
    Ants.push(new Ant(int(mouseX / psize), int(mouseY / psize), 0, inp.value()))
  }
}

function restart() {
  background(220)
  Render=[]
  s = 0
  gsize = Ssize.value()
  grid = []
  psize = ceil(height / gsize);
  for (y = 0; y < gsize; y++) {
    grid[y] = []
    for (x = 0; x < gsize; x++) {
      grid[y][x] = 0
    }
  }
  Ants = []
  //Ants.push(new Ant(int(gsize / 2), int(gsize / 2), 0, inp.value()))
}

function Sspf(){
  stepsPerFrame=Ispf.value() 
}