import $ from 'jquery';
import 'jquery-ui';
import Game from './game';
import React from 'react';

class View {
  constructor(game, $el){
    this.game = game;
    this.$el = $el;

    this.renderStartButton();
    this.bindEvents();
    this.intervals = [];
  }

  renderStartButton(){
    let $div = '<div class="begin-game-holder" id="begin-game-holder">';
    let $span = '<span class="lemonade-legends">Lemonade Legends</span>';
    $div += $span;
    let $button = '<button id="begin-game-button" class="begin-game-button">Begin Game</button>';
    $div += $button;
    // $span = `<img class="pic" src="/assets/lemonade.jpg">`;
    // $div += $span;
    this.$el.append($div);
    //onclick, this calls beginGame()
  }

  showInstructions(){
    $("#begin-game-holder").remove();
    let $div = '<div class="instructions-holder" id="instructions-holder">';
    let $span = '<span class="instructions">You have 7 days to master the lemonade business. Each morning, you buy what you need at the store (cups, lemons, sugar, ice cubes). Make sure to check the weather. That\'s how you\'ll know how many customers to expect. Set your recipe and your price carefully -- each of the neighbors has a discerning palate. Some have tight pocketbooks. Now, you\'re open for business. Good luck.</span>';
    $div += $span;
    let $button = '<button id="go-button" class="go-button">Go</button>';
    $div += $button;
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
    this.setupDock();
    this.setupStore();
  }

  updateStatus(){
    this.$el.empty();
    this.setupDock();
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

    let hours = ("0" + (this.game.time.hour)).slice(1, 3);
    let minutes = ("0" + (this.game.time.minutes).toFixed(0)).slice(-2);
    let ampm = null;
    if(hours < 12 && hours > 8){
      ampm = "am";
    } else {
      ampm = "pm";
    }
    // debugger
    $div = `<div class="time">${hours}:${minutes} ${ampm}</div>`;
    $section += $div;
    $section += '<div class="filler"></div>';

    $div = `<div class="sales-today">Sales: $${this.game.salesToday.toFixed(2)}</div>`;
    $section += $div;

    $div = `<div class="sold-out">${text}</div>`;
    $section += $div;
    $section += '<div class="filler"></div>';

    this.$el.append($section);
  }

  setupView(){
    let dock = this.setupDock();
    this.$el.append(dock);

    this.setupForm();
    let form = this.setupForm();
    this.$el.append(form);
  }

  setupStore(){
    // debugger
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

  bindEvents(){
    // this.unbindEvents();
    this.$el.on("click", "li", (e => {
      const $button = $(e.currentTarget);
      this.makePurchase($button);
    }));

    this.$el.on("submit","form",(e)=>{
      e.preventDefault();
      this.submitInfo();
    });

    $("#begin-game-button").click((e)=>{
      e.preventDefault();
      // this.beginGame();
      this.showInstructions();
    });

    $("#go-button").click((e)=>{
      e.preventDefault();
      // this.beginGame();
      this.beginGame();
    });

    $("#go-shopping-button").click((e)=>{
      e.preventDefault();
      this.goShopping();
    });

    $("#done-shopping-button").click((e)=>{
      e.preventDefault();
      this.setupForm();
    });

    $("#tomorrow-button").click((e)=>{
      // debugger
      e.preventDefault();
      this.advanceDay();
    });
  }

  unbindEvents(){
    // debugger
    $(document).add('*').off();
  }

  goShopping(){
    $("#my-inventory").remove();
    this.setupStore();
    this.unbindEvents();
    this.bindEvents();
  }

  makePurchase($button){
    // debugger
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
    this.unbindEvents();
    this.bindEvents();
  }

  setupForm(){
    $("#store").remove();

    let $form = '<form id="form" class="form-holder" autocomplete="off">';
    let span = '<span class="form-header">Today\'s Recipe</span>';
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
    // debugger
    let priceInfo = document.getElementById("price-units").value;
    let lemonInfo = document.getElementById("lemon-units").value;
    let sugarInfo = document.getElementById("sugar-units").value;
    let iceInfo = document.getElementById("ice-units").value;

    if(priceInfo == 0 || lemonInfo == 0 || sugarInfo == 0 || iceInfo == 0){
      // debugger
      alert("item can't be zero");
      return;
    }
    let gameObject = { price: priceInfo,
                       lemons: lemonInfo,
                       sugar: sugarInfo,
                       ice: iceInfo,
                       weather: this.game.weather};

    // $("#store").remove();
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
        // console.log("sales$");
        // console.log(this.game.salesToday);
        // console.log("total customers");
        // console.log(this.game.customersToday);
        this.reset(resultsObject);
        clearInterval(dayInterval);
        clearInterval(renderInterval);
      }
    }, 200);

  }
  reset(resultsObject){
    // debugger
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

    $div = '<div class="initial-cash">Initial Cash: $20.00</div>';
    $section += $div;

    $div = `<div class="total-profit">Profit: $${(totalSales - totalExpenses - 20).toFixed(2)}</div>`;
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
