import $ from 'jquery';
import 'jquery-ui';
const cupImage = new Image();
cupImage.src = "assets/cup2.png";
const lemonImage = new Image();
lemonImage.src = "assets/lemon2.png";
const sugarImage = new Image();
sugarImage.src = "assets/sugar2.png";
const iceImage = new Image();
iceImage.src = "assets/ice2.png";


const person1 = new Image();
person1.src = "assets/person1.png";
const person2 = new Image();
person2.src = "assets/person2b.png";
const person3 = new Image();
person3.src = "assets/person3.png";

class Canvas {
  canvasPurchase(canvasInfo){
    canvasInfo.ctx.fillStyle = 'white';
    canvasInfo.ctx.font = '40px Arial';
    canvasInfo.ctx.fillText('Cups', 44, 400);
    canvasInfo.ctx.fillText('Lemons', 204, 400);
    canvasInfo.ctx.fillText('Sugar', 424, 400);
    canvasInfo.ctx.fillText('Ice', 622, 400);

    let numCupPics = Math.floor(canvasInfo.cups / 20);
    let xCoord;
    let yCoord = 367;
    for (var i = 0; i < numCupPics; i++) {
      if (i % 2 == 0){
        xCoord = 11;
        yCoord -= 90;
      } else {
        xCoord = 84;
      }
      canvasInfo.ctx.drawImage(cupImage, xCoord, yCoord);
    }

    let numLemonPics = Math.floor(canvasInfo.lemons / 8);
    yCoord = 337;
    xCoord = 153;
    for (var j = 0; j < numLemonPics; j++) {
      if (j % 2 == 0){
        xCoord = 153;
        yCoord -= 72;
      } else {
        xCoord = 251;
      }
      canvasInfo.ctx.drawImage(lemonImage, xCoord, yCoord);
    }

    let numSugarPics = Math.floor(canvasInfo.sugar / 8);
    yCoord = 363;
    xCoord = 379;
    for (var k = 0; k < numSugarPics; k++) {
      if (k % 2 == 0){
        xCoord = 379;
        yCoord -= 74;
      } else {
        xCoord = 469;
      }
      canvasInfo.ctx.drawImage(sugarImage, xCoord, yCoord);
    }

    let numIcePics = Math.floor(canvasInfo.ice / 50);
    yCoord = 374;
    xCoord = 566;
    for (var l = 0; l < numIcePics; l++) {
      if (l % 2 == 0){
        xCoord = 566;
        yCoord -= 74;
      } else {
        xCoord = 653;
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

    let characters = [person1, person2, person3];

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

}

export default Canvas;
