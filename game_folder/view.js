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
    let $div = '<button id="begin-game-button" class="begin-game-button">Begin Game</button>';
    this.$el.append($div);
    //onclick, this calls beginGame()
  }

  beginGame(){
    this.showInventory();
    this.setupDock();
    $("#begin-game-button").remove();
    this.unbindEvents();
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
      console.log("not enough money");
    }
    this.render();
    this.unbindEvents();
    this.bindEvents();
  }

  setupForm(){
    $("#store").remove();
    // $("#done-shopping-button").remove();

    let $form = '<form id="form" class="form-holder">';
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
    let $span = `<span>Congrats! You sold ${resultsObject.cupsSold} cups
        to ${resultsObject.potentialCustomers} potential customers </span>`;
    $div += $span;
    $div += '<div></div>';

    $span = '<span class="ice-melted">Your remaining ice melted...</span>';
    $div += $span;
    $div += '<div></div>';

    let $button = `<button class="tomorrow-button" id="tomorrow-button">${text}</button>>`;
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
      this.game.weather = this.game.generateWeather();
      this.showInventory();
      this.setupDock();
    } else if (this.game.day == 7){
      this.game.iceCubes = 0;
      this.completeGame();
    }

    this.bindEvents();
  }

  completeGame(){
    let $section = '<section class="final-results id="final-results>';

    const totalSales = this.game.totalSales;
    let $div = `<div class="total-sales">You earned $${totalSales.toFixed(2)} in revenue</div>`;
    $section += $div;

    const totalExpenses = totalSales - this.game.cash;
    $div = `<div class="total-expenses">You spent $${totalExpenses.toFixed(2)}</div>`;
    $section += $div;

    $div = `<div class="total-profit">For a profit of $${(totalSales - totalExpenses).toFixed(2)}</div>`;
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
    $div.addClass("inventory-holder-cups");

    let cupsInventory = this.game.cups;
    let $span = $(`<span class="store-header">You have ${cupsInventory} cups</span>`);
    $span.addClass("inventory-number");
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
    $div.addClass("inventory-holder-lemons");

    let lemonsInventory = this.game.lemons;
    let $span = $(`<span>You have ${lemonsInventory} lemons</span>`);
    $span.addClass("inventory-number");
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
    $div.addClass("inventory-holder-sugar");

    let sugarInventory = this.game.sugar;
    let $span = $(`<span>You have ${sugarInventory} cups of sugar</span>`);
    $span.addClass("inventory-number");
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
    $div.addClass("inventory-holder-ice");

    let iceInventory = this.game.iceCubes;
    let $span = $(`<span>You have ${iceInventory} ice cubes</span>`);
    $span.addClass("inventory-number");
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
