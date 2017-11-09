import $ from 'jquery';
import 'jquery-ui';
import Game from './game';
import React from 'react';

class View {
  constructor(game, $el){
    this.game = game;
    this.$el = $el;

    this.render();
    this.bindEvents();
  }

  render(){
    this.$el.empty();
    this.setupView();
  }

  bindEvents(){

    this.$el.on("click", "li", (e => {
      const $button = $(e.currentTarget);
      this.makePurchase($button);
      this.render();
    })
  );

  }

  makePurchase($button){
    const data = $button.data("data");
    const resource = data.resource;
    const units = data.units;
    const price = data.price;
    console.log(data);
    this.game.updateInventory(resource, units, price);
  }

  setupView(){
    this.setupDock();
    this.setupViewCups();
    this.setupViewLemons();
    this.setupViewSugar();
    this.setupViewIceCubes();

  }

  setupDock(){
    const $div = $("<div>");
    $div.addClass("dock-holder");

    let day = this.game.day;
    let $span = $(`<span>Day ${day}</span>`);
    $span.addClass("dock-day");
    $div.append($span);

    let cash = this.game.cash;
    $span = $(`<span>Money: $${cash}</span>`);
    $span.addClass("dock-cash");


    let weather = this.game.weather;
    let temperature = weather.temperature;
    let $p = $(`<p>High Temperature: ${temperature} degrees</span>`);
    $div.append($p);

    let forecast = weather.outlook;

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
    this.$el.append($div);
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
    this.$el.append($div);
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
    this.$el.append($div);
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
    this.$el.append($div);
  }
}

export default View;
