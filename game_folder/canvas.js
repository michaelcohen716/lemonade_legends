import $ from 'jquery';
import 'jquery-ui';
const cupImage = new Image();
cupImage.src = "assets/cup.png";
const lemonImage = new Image();
lemonImage.src = "assets/lemon.png";
const sugarImage = new Image();
sugarImage.src = "assets/sugar.png";
const iceImage = new Image();
iceImage.src = "assets/ice.png";

const meanLady = new Image();
meanLady.src = "assets/madlady.png";
const happyGirl = new Image();
happyGirl.src = "assets/happygirl.png";
const chillGuy = new Image();
chillGuy.src = "assets/chillGuy.png";
const dumbGuy = new Image();
dumbGuy.src = "assets/dumbGuy.png";

class Canvas {
  canvasPurchase(canvasInfo){
    canvasInfo.ctx.fillStyle = 'white';
    canvasInfo.ctx.font = '16px Arial';
    canvasInfo.ctx.fillText('Cups', 20, 190);
    canvasInfo.ctx.fillText('Lemons', 85, 190);
    canvasInfo.ctx.fillText('Sugar', 165, 190);
    canvasInfo.ctx.fillText('Ice', 245, 190);

    let numCupPics = Math.floor(canvasInfo.cups / 20);
    let xCoord;
    let yCoord = 185;
    for (var i = 0; i < numCupPics; i++) {
      if (i % 2 == 0){
        xCoord = 17;
        yCoord -= 36;
      } else {
        xCoord = 42;
      }
      canvasInfo.ctx.drawImage(cupImage, xCoord, yCoord);
    }

    let numLemonPics = Math.floor(canvasInfo.lemons / 8);
    yCoord = 182;
    xCoord = 85;
    for (var j = 0; j < numLemonPics; j++) {
      if (j % 2 == 0){
        xCoord = 82;
        yCoord -= 32;
      } else {
        xCoord = 112;
      }
      canvasInfo.ctx.drawImage(lemonImage, xCoord, yCoord);
    }

    let numSugarPics = Math.floor(canvasInfo.sugar / 8);
    yCoord = 182;
    xCoord = 147;
    for (var k = 0; k < numSugarPics; k++) {
      if (k % 2 == 0){
        xCoord = 161;
        yCoord -= 32;
      } else {
        xCoord = 191;
      }
      canvasInfo.ctx.drawImage(sugarImage, xCoord, yCoord);
    }

    let numIcePics = Math.floor(canvasInfo.ice / 50);
    yCoord = 182;
    xCoord = 228;
    for (var l = 0; l < numIcePics; l++) {
      if (l % 2 == 0){
        xCoord = 228;
        yCoord -= 32;
      } else {
        xCoord = 258;
      }
      canvasInfo.ctx.drawImage(iceImage, xCoord, yCoord);
    }

  }

  canvasComment(gameObject, gameInfo){
    let directComments = ['"Sold out? Pathetic"','"No more lemonade?!"','"Ice tea is better anyway"',
                          '"Not enough ice"', '"Too expensive"'];
    let generalComments = [
      '"Tasty!"',
      '"Meh, honestly"',
      '"Too bitter"',
      '"Just what I needed!"',
      '"Yummy in my tummy!"',
      '"Do you guys sell hot dogs?"',
      '"I like lemonade"',
      '"Just like grandma used to make it"'
    ];

    let characters = [meanLady, happyGirl, chillGuy, dumbGuy];

    let commentSample = [];

    if(gameInfo.soldOut){
      commentSample.push(directComments[0]);
      commentSample.push(directComments[1]);
      commentSample.push(directComments[2]);
    } else if (gameObject.weather.temperature / gameObject.ice < 16){
      commentSample.push(directComments[3]);
    } else if (gameObject.price > gameObject.weather.temperature / 3){
      commentSample.push(directComments[4]);
    }

    while(commentSample.length < 3){
      commentSample.push(generalComments[Math.floor(Math.random() * generalComments.length)]);
      commentSample.push(generalComments[Math.floor(Math.random() * generalComments.length)]);
    }

    const comment = commentSample[Math.floor(Math.random() * commentSample.length)];
    const image = characters[Math.floor(Math.random() * characters.length)];
    let commentObject = {comment: comment, image: image};

    if(commentObject.comment !== undefined){
      gameInfo.commentQueue.push(commentObject);
    }
  }

  canvasCommentRender(gameObject){
    if(this.commentRhythm % 15 === 0){
      this.canvasComment(gameObject);
    }
    if (this.commentQueue.length > 3){
      this.commentQueue.shift();
    }
    this.ctx.fillStyle = 'white';
    this.ctx.font = '16px Arial';
    this.ctx.fillText("Suggestions Box", 80, 20);

    if(this.commentQueue.length > 0){

      let xCoord = 40;
      let yCoord;

      let queue = this.commentQueue;


      queue.forEach((comment, index) => {
        this.ctx.font = '10px Arial';
        if(index === 0){
          yCoord = 30;
        } else if (index === 1){
          yCoord = 85;
        } else if (index === 2){
          yCoord = 140;
        }
        this.ctx.drawImage(comment.image, xCoord, yCoord);
        this.ctx.fillText(comment.comment, xCoord + 40, yCoord + 20);
      });
    }
  }

}

export default Canvas;
