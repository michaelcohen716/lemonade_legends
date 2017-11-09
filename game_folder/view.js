import $ from 'jquery';
import 'jquery-ui';
import Game from './game';

class View {
  constructor(game, $el){
    this.game = game;
    this.$el = $el;

    this.setupView();
    this.bindEvents();
  }

  bindEvents(){
    this.$el.on("click", "li", (e => {
      const $button = $(e.currentTarget);
      this.makePurchase($button);
    }));
  }

  makePurchase($button){
    const data = $button.data("data");
    const resource = data.resource;
    const units = data.units;
    const price = data.price;

  }

  setupView(){

    this.setupViewCups();


  }

  setupViewCups(){
    const $div = $("<div>");
    $div.addClass("inventory-cups");
    //buy 25 cups
    let $li = $("<li>25 Paper Cups for $0.80</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "cups", units: 25, price: 0.80});
    $li.attr("id", "buy-25-cups");
    $div.append($li);
    this.$el.append($div);

    //buy 50 cups
    $li = $("<li>50 Paper Cups for $1.55</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "cups", units: 50, price: 1.55});
    $li.attr("id", "buy-50-cups");
    $div.append($li);
    this.$el.append($div);

    //buy 100 cups
    $li = $("<li>100 Paper Cups for $3.00</li>");
    $li.addClass("inventory-buy-button");
    $li.data("data", {resource: "cups", units: 100, price: 3.00});
    $li.attr("id", "buy-100-cups");
    $div.append($li);
    this.$el.append($div);
  }

}

export default View;
