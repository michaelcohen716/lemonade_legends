import $ from 'jquery';
import 'jquery-ui';

class ProgressBar {
  constructor(gameObject){

  }

  setupProgressBar(gameObject){
    let $section = '<section id="progress-bar" class="progress-bar">';
    // let myCups = this.game.cups;
    // let myLemons = this.game.lemons;
    // let mySugar = this.game.sugar;
    // let myIce = this.game.iceCubes;
    let text = "";

    if(gameObject.soldOut == true){
      text = "SOLD OUT";
    }

    let $div = `<div class="inventory-figure-cups">${gameObject.myCups} cups</div>`;
    $section += $div;
    $section += '<div></div>';

    $div = `<div class="inventory-figure">${gameObject.myLemons} lemons</div>`;
    $section += $div;
    $section += '<div></div>';

    $div = `<div class="inventory-figure">${gameObject.mySugar} cups of sugar</div>`;
    $section += $div;
    $section += '<div></div>';

    $div = `<div class="inventory-figure">${gameObject.myIce} ice cubes</div>`;
    $section += $div;
    $section += '<div></div>';

    $div = `<div class="sold-out">${text}</div>`;
    $section += $div;

    let hours = ("0" + (gameObject.hour)).slice(1, 3);
    let minutes = ("0" + (gameObject.minutes).toFixed(0)).slice(-2);
    let ampm = null;
    if(hours < 12 && hours > 8){
      ampm = "am";
    } else {
      ampm = "pm";
    }

    $div = `<div class="time">${hours}:${minutes} ${ampm}</div>`;
    $section += $div;
    $section += '<div class="filler"></div>';

    $div = `<div class="sales-today">Sales: $${gameObject.salesToday.toFixed(2)}</div>`;
    $section += $div;

    $section += '<div class="filler"></div>';
    debugger
    return $section;
  }

}

export default ProgressBar;
