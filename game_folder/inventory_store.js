import $ from 'jquery';
import 'jquery-ui';

class InventoryStore {
  constructor(gameObject){

  }

  setupStore(gameObject){
    let $cups = this.setupViewCups(gameObject);
    let $lemons = this.setupViewLemons(gameObject);
    let $sugar = this.setupViewSugar(gameObject);
    let $ice = this.setupViewIceCubes(gameObject);

    let $div = $('<div class="store" id="store">');
    let $section = $('<section class="store-header"> The Store </section>');
    $div.append($section);
    $div.append($cups);
    $div.append($lemons);
    $div.append($sugar);
    $div.append($ice);

    let $button = $('<button class="done-shopping-button" id="done-shopping-button">Done Shopping</button>');
    $div.append($button);
    return $div;
  }

  setupViewCups(gameObject){
    const $div = $("<div>");
    $div.addClass("inventory-holder");

    let cupsInventory = gameObject.cups;
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
  }

  setupViewLemons(gameObject){
    const $div = $("<div>");
    $div.addClass("inventory-holder");

    let lemonsInventory = gameObject.lemons;
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
  }

  setupViewSugar(gameObject){
    const $div = $("<div>");
    $div.addClass("inventory-holder");

    let sugarInventory = gameObject.sugar;
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

    return $div;
  }

  setupViewIceCubes(gameObject){
    const $div = $("<div>");
    $div.addClass("inventory-holder");

    let iceInventory = gameObject.ice;
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

    return $div;
  }
}




export default InventoryStore;
