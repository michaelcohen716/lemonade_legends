import $ from 'jquery';
import 'jquery-ui';
import Game from './game';
import React from 'react';

const cupImage = new Image();
cupImage.src = "assets/cup.png";
const lemonImage = new Image();
lemonImage.src = "assets/lemon.png";
const sugarImage = new Image();
sugarImage.src = "assets/sugar.png";
const iceImage = new Image();
iceImage.src = "assets/ice.png";

const meanLady = new Image();
meanLady.src = "assets/meanlady.png";
const happyGirl = new Image();
happyGirl.src = "assets/happygirl.png";
const chillGuy = new Image();
chillGuy.src = "assets/chillGuy.png";
const dumbGuy = new Image();
dumbGuy.src = "assets/dumbGuy.png";

class View {
  constructor(game, $el, canvas){
    this.game = game;
    this.$el = $el;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.renderStartButton();
    this.bindEvents();
    this.intervals = [];
    this.commentQueue = [];
    this.commentRhythm = 0;
  }

  bindEvents(){
    this.unbindEvents();
    this.$el.on("click", "li", (e => {
      const $button = $(e.currentTarget);
      this.makePurchase($button);
    }));

    this.$el.on("submit","form",(e)=>{
      e.preventDefault();
      this.submitInfo();
      this.rerenderCanvas();

    });

    $("#begin-game-button").click((e)=>{
      e.preventDefault();
      this.showInstructions();
    });

    $("#go-button").click((e)=>{
      e.preventDefault();
      this.beginGame();
      this.renderCanvas();
    });

    $("#go-shopping-button").click((e)=>{
      e.preventDefault();
      this.goShopping();
      this.rerenderCanvas();
      this.canvasPurchase();
    });

    $("#done-shopping-button").click((e)=>{
      e.preventDefault();
      this.setupForm();
    });

    $("#tomorrow-button").click((e)=>{
      e.preventDefault();
      this.advanceDay();
    });
  }

  unbindEvents(){
    $(document).add('*').off();
  }

  rerenderCanvas(){
    this.$el.append(this.canvas);
    $("#canvas").removeClass("display-none");
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  canvasPurchase(){
    this.ctx.fillStyle = 'white';
    this.ctx.font = '16px Arial';
    this.ctx.fillText('Cups', 20, 190);
    this.ctx.fillText('Lemons', 85, 190);
    this.ctx.fillText('Sugar', 165, 190);
    this.ctx.fillText('Ice', 245, 190);

    let numCupPics = Math.floor(this.game.cups / 20);
    let xCoord;
    let yCoord = 185;
    for (var i = 0; i < numCupPics; i++) {
      if (i % 2 == 0){
        xCoord = 17;
        yCoord -= 36;
      } else {
        xCoord = 42;
      }
      this.ctx.drawImage(cupImage, xCoord, yCoord);
    }

    let numLemonPics = Math.floor(this.game.lemons / 8);
    yCoord = 182;
    xCoord = 85;
    for (var j = 0; j < numLemonPics; j++) {
      if (j % 2 == 0){
        xCoord = 82;
        yCoord -= 32;
      } else {
        xCoord = 112;
      }
      this.ctx.drawImage(lemonImage, xCoord, yCoord);
    }

    let numSugarPics = Math.floor(this.game.sugar / 8);
    yCoord = 182;
    xCoord = 147;
    for (var k = 0; k < numSugarPics; k++) {
      if (k % 2 == 0){
        xCoord = 161;
        yCoord -= 32;
      } else {
        xCoord = 191;
      }
      this.ctx.drawImage(sugarImage, xCoord, yCoord);
    }

    let numIcePics = Math.floor(this.game.iceCubes / 50);
    yCoord = 182;
    xCoord = 228;
    for (var l = 0; l < numIcePics; l++) {
      if (l % 2 == 0){
        xCoord = 228;
        yCoord -= 32;
      } else {
        xCoord = 258;
      }
      this.ctx.drawImage(iceImage, xCoord, yCoord);
    }

  }

  renderCanvas(){
    $("#canvas").removeClass("display-none");
  }

  canvasComment(gameObject){
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

    let characters = [madLady, happyGirl, chillGuy, dumbGuy];

    let commentSample = [];

    if(this.game.soldOut){
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
    }

    const comment = commentSample[Math.floor(Math.random() * commentSample.length)];
    const image = characters[Math.floor(Math.random() * characters.length)];
    let commentObject = {comment: comment, image: image};

    if(commentObject.comment !== undefined){
      this.commentQueue.push(commentObject);
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
        // debugger
        this.ctx.fillText(comment.comment, xCoord + 40, yCoord + 20);
      });
    }

  }




  renderStartButton(){
    let $div = '<div class="begin-game-holder" id="begin-game-holder">';
    let $span = '<span class="lemonade-legends">Lemonade Legends</span>';
    $div += $span;
    let $button = '<button id="begin-game-button" class="begin-game-button">Begin Game</button>';
    $div += $button;
    this.$el.append($div);
    //onclick, this calls beginGame()
  }

  showInstructions(){
    $("#begin-game-holder").remove();
    let $div = '<div class="instructions-holder" id="instructions-holder">';
    let $span = '<span class="instructions">You have 7 days to master the lemonade business. Each morning, you buy what you need at the store (cups, lemons, sugar, ice cubes). Make sure to check the weather. That\'s how you\'ll know how many customers to expect. Set your recipe and your price carefully -- the neighbors can be picky. And some have tight pocketbooks. Good luck.</span>';
    $div += $span;
    let $button = '<button id="go-button" class="go-button">Go</button>';
    $div += $button;
    this.$el.append($div);
    this.bindEvents();
  }

  beginGame(){
    console.log("debugger here");
    $("#instructions-holder").remove();
    this.showInventory();
    this.setupDock();
    this.bindEvents();
  }

  render(){
    this.$el.empty();
    this.renderCanvas();
    this.setupDock();
    this.setupStore();
  }

  updateStatus(){
    // this.$el.empty();
    $("#dock-holder").remove();
    this.setupDock();
    $("#progress-bar").remove();
    this.setupProgressBar();
  }

  setupProgressBar(){
    let $section = '<section id="progress-bar" class="progress-bar">';
    let myCups = this.game.cups;
    let myLemons = this.game.lemons;
    let mySugar = this.game.sugar;
    let myIce = this.game.iceCubes;
    let text = "";

    if(this.game.soldOut == true){
      text = "SOLD OUT";
    }

    let $div = `<div class="inventory-figure-cups">${myCups} cups</div>`;
    $section += $div;
    $section += '<div></div>';

    $div = `<div class="inventory-figure">${myLemons} lemons</div>`;
    $section += $div;
    $section += '<div></div>';

    $div = `<div class="inventory-figure">${mySugar} cups of sugar</div>`;
    $section += $div;
    $section += '<div></div>';

    $div = `<div class="inventory-figure">${myIce} ice cubes</div>`;
    $section += $div;
    $section += '<div></div>';

    $div = `<div class="sold-out">${text}</div>`;
    $section += $div;

    let hours = ("0" + (this.game.time.hour)).slice(1, 3);
    let minutes = ("0" + (this.game.time.minutes).toFixed(0)).slice(-2);
    let ampm = null;
    if(hours < 12 && hours > 8){
      ampm = "am";
    } else {
      ampm = "pm";
    }

    $div = `<div class="time">${hours}:${minutes} ${ampm}</div>`;
    $section += $div;
    $section += '<div class="filler"></div>';

    $div = `<div class="sales-today">Sales: $${this.game.salesToday.toFixed(2)}</div>`;
    $section += $div;

    $section += '<div class="filler"></div>';

    this.$el.append($section);
  }

  setupStore(){
    let $cups = this.setupViewCups();
    let $lemons = this.setupViewLemons();
    let $sugar = this.setupViewSugar();
    let $ice = this.setupViewIceCubes();

    let $div = $('<div class="store" id="store">');
    let $button = $('<button class="done-shopping-button" id="done-shopping-button">Done Shopping</button>');
    $div.append($button);
    $div.append($cups);
    $div.append($lemons);
    $div.append($sugar);
    $div.append($ice);

    this.$el.append($div);
  }


  goShopping(){
    $("#my-inventory").remove();
    this.setupStore();
    this.unbindEvents();
    this.bindEvents();
  }

  makePurchase($button){
    const data = $button.data("data");
    const resource = data.resource;
    const units = data.units;
    const price = data.price;
    console.log(data);
    if(this.game.cash - price > 0){
      this.game.updateInventory(resource, units, price);
    }else {
      alert("Not enough money, dude");
    }
    this.game.totalExpenses += price;
    this.render();
    this.rerenderCanvas();
    this.canvasPurchase();
    this.bindEvents();
  }

  setupForm(){
    $("#store").remove();

    let $form = '<form id="form" class="form-holder" autocomplete="off">';
    let span = '<span class="form-header">Set Today\'s Recipe</span>';
    $form += span;
    $form += '<div> </div>';

    let price = '<span class="form-line">Price per Cup</span>';
    price += '<input id="price-units" type="text" value="25" class="form-input">';
    price += '<span class="form-line"> Cents</span>';
    $form += price;
    $form += '<div> </div>';

    let lemons = '<span class="form-line">Lemons per Pitcher</span>';
    lemons += '<input id="lemon-units" type="text" value="4" class="form-input">';
    lemons += '<span class="form-line"> Lemons</span>';
    $form += lemons;
    $form += '<div> </div>';

    let sugar = '<span class="form-line">Sugar per Pitcher</span>';
    sugar += '<input id="sugar-units" type="text" value="4" class="form-input">';
    sugar += '<span class="form-line"> Cups</span>';
    $form += sugar;
    $form += '<div> </div>';

    let ice = '<span class="form-line">Ice Cubes per Cup</span>';
    ice += '<input id="ice-units" type="text" value="4" class="form-input">';
    ice += '<span class="form-line"> Cubes</span>';
    $form += ice;
    $form += '<div> </div>';

    let submit = '<input class="form-submit" id="start-day" type="submit" value="Start Day"/>';
    $form += submit;
    this.$el.append($form);
    // this.bindEvents();
  }

  submitInfo(){
    let priceInfo = document.getElementById("price-units").value;
    let lemonInfo = document.getElementById("lemon-units").value;
    let sugarInfo = document.getElementById("sugar-units").value;
    let iceInfo = document.getElementById("ice-units").value;

    if(priceInfo == 0 || lemonInfo == 0 || sugarInfo == 0 || iceInfo == 0){
      alert("item can't be zero");
      return;
    }

    this.$el.empty();

    let gameObject = { price: priceInfo,
                       lemons: lemonInfo,
                       sugar: sugarInfo,
                       ice: iceInfo,
                       weather: this.game.weather};

    this.game.run(gameObject);

    let renderInterval = setInterval(()=>{
      this.updateStatus();
      // debugger
    }, 200);

    let dayInterval = setInterval(()=>{
      if (this.game.dayOver){
        let resultsObject = {
          potentialCustomers: this.game.customersToday.length,
          cupsSold: this.game.cupsSoldToday,
          salesToday: this.game.salesToday,
          weather: this.game.weather,
          resources: this.game.resources(),
          cash: this.game.cash
        };
        this.reset(resultsObject);
        clearInterval(dayInterval);
        clearInterval(renderInterval);
        $("#canvas").addClass("display-none");

      } else {
        // debugger
        this.rerenderCanvas();
        this.commentRhythm++;
        this.canvasCommentRender(gameObject);
      }
    }, 75);

  }
  reset(resultsObject){
    $("#progress-bar").remove();
    $("#store").remove();
    $("#dock-holder").remove();
    this.renderResults(resultsObject);
  }

  renderResults(resultsObject){
    let text = "Tomorrow";
    if(this.game.day == 7){
      text = "See Results";
    }
    let $div = '<div class="results-day" id="results-day">';
    let $span = `<span class"congrats">Congrats! You sold ${resultsObject.cupsSold} cups
        to ${resultsObject.potentialCustomers} potential customers. </span>`;
    $div += $span;
    $div += '<div></div>';

    $span = '<span class="ice-melted">Your remaining ice melted...</span>';
    $div += $span;
    $div += '<div></div>';

    let $button = `<button class="tomorrow-button" id="tomorrow-button">${text}</button>`;
    $div += $button;
    this.$el.append($div);
    this.bindEvents();
  }

  advanceDay(){
    $("#results-day").remove();
    if(this.game.day < 7){
      this.game.totalSales += this.game.salesToday;
      this.game.salesToday = 0;
      this.game.day += 1;
      this.game.iceCubes = 0;
      this.game.dayOver = false;
      this.game.cupsSoldToday = 0;
      this.game.customersToday = [];
      this.game.soldOut = false;
      this.game.weather = this.game.generateWeather();
      this.game.time.hour = 9;
      this.game.time.minutes = 0;
      this.commentQueue = [];
      this.commentRhythm = 0;
      this.showInventory();
      this.setupDock();
    } else if (this.game.day == 7){
      this.game.iceCubes = 0;
      this.completeGame();
    }

    this.bindEvents();
  }

  completeGame(){
    let $section = '<section class="final-results" id="final-results">';
    $section += '<div class="final-results-header">Final Results</div>';

    const totalSales = this.game.totalSales;
    let $div = `<div class="total-sales">Revenue: $${totalSales.toFixed(2)}</div>`;
    $section += $div;

    const totalExpenses = this.game.totalExpenses;
    $div = `<div class="total-expenses">Expenses: $${totalExpenses.toFixed(2)}</div>`;
    $section += $div;

    $div = `<div class="total-profit">Profit: $${(totalSales - totalExpenses).toFixed(2)}</div>`;
    $section += $div;

    this.$el.append($section);
  }

  setupDock(){
    var $div = '<div class="dock-holder" id="dock-holder">';

    let day = this.game.day;
    $div += `<span class="dock-day">Day ${day}</span>`;

    let cash = this.game.cash.toFixed(2);
    $div += `<span class="dock-cash">Money: $${cash}</span>`;

    let weather = this.game.weather;
    let temperature = weather.temperature;
    $div += `<span class="dock-temp">Temperature: ${temperature} degrees</span>`;

    let forecast = weather.outlook;
    $div += `<span class="dock-forecast">Forecast: ${forecast}</span>`;

    this.$el.append($div);
  }

  showInventory(){
    let $div = $('<div class="my-inventory" id="my-inventory">');
    let $span = $('<span class="my-inventory-header">My Inventory</span>');
    $div.append($span);

    let cupsInventory = this.game.cups;
    $span = $(`<span class="inventory-line">${cupsInventory} cups</span>`);
    $div.append($span);

    let lemonsInventory = this.game.lemons;
    $span = $(`<span class="inventory-line">${lemonsInventory} lemons</span>`);
    $div.append($span);

    let sugarInventory = this.game.sugar;
    $span = $(`<span class="inventory-line">${sugarInventory} cups of sugar</span>`);
    $div.append($span);

    let iceInventory = this.game.iceCubes;
    $span = $(`<span class="inventory-line">${iceInventory} ice cubes</span>`);
    $div.append($span);

    let $button = $('<button id="go-shopping-button" type="submit" class="go-shopping-button">Go Shopping</button>');
    $div.append($button);

    this.$el.append($div);
  }

  setupViewCups(){
    const $div = $("<div>");
    $div.addClass("inventory-holder");

    let cupsInventory = this.game.cups;
    let $span = $(`<span>You have ${cupsInventory} cups</span>`);
    $span.addClass("inventory-number-cups");
    $span.attr("id", "cups-counter");
    $div.append($span);

    //buy 25 cups
    let $li = $("<li>25 paper cups for $0.80</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "cups", units: 25, price: 0.80});
    $li.attr("id", "buy-25-cups");
    $div.append($li);

    //buy 50 cups
    $li = $("<li>50 paper cups for $1.55</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "cups", units: 50, price: 1.55});
    $li.attr("id", "buy-50-cups");
    $div.append($li);

    //buy 100 cups
    $li = $("<li>100 paper cups for $3.00</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "cups", units: 100, price: 3.00});
    $li.attr("id", "buy-100-cups");
    $div.append($li);
    return $div;
    // this.$el.append($div);
  }

  setupViewLemons(){
    const $div = $("<div>");
    $div.addClass("inventory-holder");

    let lemonsInventory = this.game.lemons;
    let $span = $(`<span>You have ${lemonsInventory} lemons</span>`);
    $span.addClass("inventory-number-lemons");
    $span.attr("id", "lemons-counter");
    $div.append($span);

    //buy 10 lemons
    let $li = $("<li>10 lemons for $0.50</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "lemons", units: 10, price: 0.50});
    $li.attr("id", "buy-10-lemons");
    $div.append($li);

    //buy 30 lemons
    $li = $("<li>30 lemons for $1.40</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "lemons", units: 30, price: 1.40});
    $li.attr("id", "buy-30-lemons");
    $div.append($li);

    //buy 75 lemons
    $li = $("<li>75 lemons for $3.00</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "lemons", units: 75, price: 3.00});
    $li.attr("id", "buy-75-lemons");
    $div.append($li);
    return $div;
    // this.$el.append($div);

  }

  setupViewSugar(){
    const $div = $("<div>");
    $div.addClass("inventory-holder");

    let sugarInventory = this.game.sugar;
    let $span = $(`<span>You have ${sugarInventory} cups of sugar</span>`);
    $span.addClass("inventory-number-sugar");
    $span.attr("id", "sugar-counter");
    $div.append($span);

    //buy 12 cups of sugar
    let $li = $("<li>12 cups of sugar for $0.80</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "sugar", units: 12, price: 0.80});
    $li.attr("id", "buy-12-sugar");
    $div.append($li);

    //buy 30 cups of sugar
    $li = $("<li>30 cups of sugar for $1.90</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "sugar", units: 30, price: 1.90});
    $li.attr("id", "buy-30-sugar");
    $div.append($li);

    //buy 50 cups of sugar
    $li = $("<li>50 cups of sugar for $3.05</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "sugar", units: 50, price: 3.05});
    $li.attr("id", "buy-50-sugar");
    $div.append($li);
    // this.$el.append($div);

    return $div;
  }

  setupViewIceCubes(){
    const $div = $("<div>");
    $div.addClass("inventory-holder");

    let iceInventory = this.game.iceCubes;
    let $span = $(`<span>You have ${iceInventory} ice cubes</span>`);
    $span.addClass("inventory-number-ice");
    $span.attr("id", "ice-counter");
    $div.append($span);

    //buy 100 ice cubes
    let $li = $("<li>100 ice cubes for $1.00</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "ice-cubes", units: 100, price: 1.00});
    $li.attr("id", "buy-100-ice");
    $div.append($li);

    //buy 250 ice cubes
    $li = $("<li>250 ice cubes for $2.35</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "ice-cubes", units: 250, price: 2.35});
    $li.attr("id", "buy-250-ice");
    $div.append($li);

    //buy 500 ice cubes
    $li = $("<li>500 ice cubes for $4.50</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "ice-cubes", units: 500, price: 4.50});
    $li.attr("id", "buy-500-ice");
    $div.append($li);
    // this.$el.append($div);

    return $div;
  }
}

export default View;
