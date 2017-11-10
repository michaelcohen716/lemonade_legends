import $ from 'jquery';
import 'jquery-ui';
import Game from './game';
import React from 'react';

class View {
  constructor(game, $el){
    this.game = game;
    this.$el = $el;
    // this.$dock = $dock;
    // this.loadModal();
    // debugger
    this.render();
    this.bindEvents();
  }


  render(){
    this.$el.empty();
    let dock = this.setupDock();
    this.$el.append(dock);
  }

  setupView(){
    let dock = this.setupDock();
    this.$el.append(dock);

    this.setupForm();
    let form = this.setupForm();
    this.$el.append(form);
  }

  setupStore(){
    let $cups = this.setupViewCups();
    let $lemons = this.setupViewLemons();
    let $sugar = this.setupViewSugar();
    let $ice = this.setupViewIceCubes();

    // let $div = '<div class="store" id="store">';
    // $div += cups;
    // $div += lemons;
    // $div += sugar;
    // $div += ice;

    this.$el.append($cups);
    this.$el.append($lemons);
    this.$el.append($sugar);
    this.$el.append($ice);
  }

  bindEvents(){

    this.$el.on("click", "li", (e => {
      const $button = $(e.currentTarget);
      this.makePurchase($button);
      this.render();
    }));

    this.$el.on("submit","form",(e)=>{
      e.preventDefault();
      this.submitInfo();
    });

    // $("#begin-game-button").click((e)=>{
    //   e.preventDefault();
    //   this.beginGame();
    // });

  }

  beginGame(){
    this.setupStore();
    $("#begin-game-button").addClass("hidden");
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
      console.log("not enough money");
    }
  }

  setupForm(){
    var $form = '<form id="form" class="form-holder">';

    let price = '<div class="form-item">';
    price += '<span class="form-line">Price per Cup</span>';
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

    return $form;
  }

  submitInfo(){
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

    // debugger
    this.game.run(gameObject);
    setInterval(()=>{
      this.render();
    }, 200);

  }

  setupDock(){
    // debugger
    var $div = '<div class="dock-holder">';

    let day = this.game.day;
    $div += `<span class="dock-day">Day ${day}</span>`;

    let cash = this.game.cash.toFixed(2);
    $div += `<span class="dock-cash">Money: $${cash}</span>`;

    let weather = this.game.weather;
    let temperature = weather.temperature;
    $div += `<span class="dock-temp">Temperature: ${temperature} degrees</span>`;

    let forecast = weather.outlook;
    $div += `<span class="dock-forecast">Forecast: ${forecast}</span>`;

    $div += '<button id="begin-game-button">Begin Game</button>';

    return $div;

  }

  setupViewCups(){
    const $div = $("<div>");
    $div.addClass("inventory-holder");

    let cupsInventory = this.game.cups;
    let $span = $(`<span>You have ${cupsInventory} cups</span>`);
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
  }

  setupViewLemons(){
    const $div = $("<div>");
    $div.addClass("inventory-holder");

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
  }

  setupViewSugar(){
    const $div = $("<div>");
    $div.addClass("inventory-holder");

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
    return $div;
  }

  setupViewIceCubes(){
    const $div = $("<div>");
    $div.addClass("inventory-holder");

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
    return $div;
  }
}

export default View;
