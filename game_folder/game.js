import BusinessDay from './business_day';
import Weather from './weather';

class Game {
  constructor(){
    this.cups = 0;
    this.lemons = 0;
    this.sugar = 0;
    this.iceCubes = 0;
    this.cash = 20.00;
    this.day = 1;
    this.weather = this.generateWeather();
  }

  resources(){
    return {
      cups: this.cups,
      lemons: this.lemons,
      sugar: this.sugar,
      iceCubes: this.iceCubes,
      cash: this.cash,
      day: this.day,
    };
  }

  generateWeather(){
    let weather = new Weather();
  }

  updateInventory(resource, units, price){
    if (resource === "cups"){
      this.cups += units;
    } else if (resource === "lemons"){
      this.lemons += units;
    } else if (resource === "sugar"){
      this.sugar += units;
    } else if (resource === "ice-cubes"){
      this.iceCubes += units;
    }
    this.cash -= price;
  }

  run(){
    //intro, etc
    //new day
    Game.DAYS_OF_WEEK.forEach((day) => {
      const resources = this.resources();
      var newDay = new BusinessDay(resources);
    });
  }




}

Game.DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default Game;
