

class Canvas {
  constructor(){
    this.backgroundCanvas = document.getElementById("canvas-background");
    this.actionCanvas = document.getElementById("canvas");
    this.backgroundContext = this.backgroundCanvas.getContext("2d");
    this.actionContext = this.actionCanvas.getContext("2d");


  }

  render(ctx){
    
  }


}

export default Canvas;
