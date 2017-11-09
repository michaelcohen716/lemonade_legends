import BusinessDay from './business_day';


class Game {
  constructor(){
    this.cups = 0;
    this.lemons = 0;
    this.sugar = 0;
    this.iceCubes = 0;
    this.cash = 20.00;
    this.day = 0;
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
