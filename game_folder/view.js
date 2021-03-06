import $ from 'jquery';
import 'jquery-ui';
import Game from './game';
import ProgressBar from './progress_bar';
import InventoryStore from './inventory_store';
import Canvas from './canvas';

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
    let canvas = new Canvas();
    let canvasInfo = {ctx: this.ctx, cups: this.game.cups, lemons: this.game.lemons,
                      sugar: this.game.sugar, ice: this.game.iceCubes};
    canvas.canvasPurchase(canvasInfo);
  }

  renderCanvas(){
    $("#canvas").removeClass("display-none");
  }

  canvasComment(gameObject){
    let gameInfo = {soldOut: this.game.soldOut, commentQueue: this.commentQueue};
    let canvas = new Canvas();
    canvas.canvasComment(gameObject, gameInfo);
  }

  canvasCommentRender(gameObject){
    if(this.commentRhythm % 15 === 0){
      this.canvasComment(gameObject);
    }
    if (this.commentQueue.length > 3){
      this.commentQueue.shift();
    }
    this.ctx.fillStyle = 'white';
    this.ctx.font = '36px Arial';
    this.ctx.fillText("Suggestions Box", 230, 40);

    if(this.commentQueue.length > 0){
      let xCoord = 200;
      let yCoord;

      let queue = this.commentQueue;
      queue.forEach((comment, index) => {
        this.ctx.font = '23px Arial';
        if(index === 0){
          yCoord = 65;
        } else if (index === 1){
          yCoord = 185;
        } else if (index === 2){
          yCoord = 305;
        }
        this.ctx.drawImage(comment.image, xCoord, yCoord);
        this.ctx.fillText(comment.comment, xCoord + 60, yCoord + 40);
      });
    }
  }

  renderStartButton(){
    let $div = '<div class="begin-game-holder" id="begin-game-holder">';
    let $section = '<section class="inner-begin-holder" id="inner-begin-holder">';
    let $span = '<span class="lemonade-legends">Lemonade Legends</span>';
    $section += $span;
    let $button = '<button id="begin-game-button" class="begin-game-button">Begin Game</button>';
    $section += $button;
    this.$el.append($section);
  }

  showInstructions(){
    $("#inner-begin-holder").remove();

    let $div = '<div class="instructions-holder" id="instructions-holder">';
    let $section = '<section class="inner-instructions">';
    let $span = '<span class="instructions">You have 7 days to master the lemonade business. Each morning, you buy what you need at the store (cups, lemons, sugar, ice cubes). Make sure to check the weather. That\'s how you\'ll know how many customers to expect. Set your recipe and your price carefully -- the neighbors can be picky. And some have tight pocketbooks. Good luck.</span>';
    $section += $span;
    let $button = '<button id="go-button" class="go-button">Go</button>';
    $section += $button;
    $div += $section;

    this.$el.append($div);
    this.bindEvents();
  }

  beginGame(){
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
    $("#dock-holder").remove();
    this.setupDock();
    $("#progress-bar").remove();
    this.setupProgressBar();
  }

  setupProgressBar(){
    let gameObject = {myCups: this.game.cups, myLemons: this.game.lemons,
                      mySugar: this.game.sugar, myIce: this.game.iceCubes,
                      soldOut: this.game.soldOut, hour: this.game.time.hour,
                      minutes: this.game.time.minutes, salesToday: this.game.salesToday };

    let $section = new ProgressBar(gameObject);
    this.$el.append($($section.setupProgressBar(gameObject)));
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

  setupStore(){
    let gameObject = {cups: this.game.cups, lemons: this.game.lemons,
                      sugar: this.game.sugar, ice: this.game.iceCubes };
    let $section = new InventoryStore(gameObject);
    this.$el.append($($section.setupStore(gameObject)));
  }
}

export default View;
