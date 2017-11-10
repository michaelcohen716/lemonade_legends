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
    this.today = null;
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
    return weather.weather();

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
    debugger
    const resources = this.resources();
    this.generateWeather();
    let potentialCustomers = this.potentialCustomers();
    let today = this.simulateDay(potentialCustomers);
    return today;
  }

  simulateDay(potentialCustomers){
    let resultArray = [];
    for (var i = 0; i < potentialCustomers; i++) {
      if(this.purchaseOrNot()){
        resultArray.push(true);
        this.cupsSold ++;
        this.sales += this.price;
        // this.updateInventory();
        //^need to write this
      }else {
        resultArray.push(false);
      }
    }
    console.log(resultArray);
    return resultArray;
  }



  potentialCustomers(){
    const weatherObject = this.weatherToday;

    const outlookQuotients = {
      "Sunny": 150,
      "Overcast": 110,
      "Rainy": 75
    };
    let outlookScore;
    const tempScore = weatherObject.temperature;

    if (weatherObject.outlook == "Sunny"){
      outlookScore = Math.floor(Math.random() * outlookQuotients.Sunny);
    } else if (weatherObject.outlook == "Overcast"){
      outlookScore = Math.floor(Math.random() * outlookQuotients.Overcast);
    } else {
      outlookScore = Math.floor(Math.random() * outlookQuotients.Overcast);
    }

    const potentialVisitors = tempScore + outlookScore;
    return potentialVisitors;
  }

  purchaseOrNot(){
    let likelihood = 100;

    const weatherDecrement = this.weatherPurchaseCalculus();
    likelihood -= weatherDecrement;
    //either a neutral or a decrement

    const ingredientsFactor = this.ingredientsPurchaseCalculus();
    likelihood += ingredientsFactor;
    //could be positive or negative

    const priceFactor = this.pricePurchaseCalculus();
    likelihood += priceFactor;
    //could be positive or negative

    if (likelihood >= 50){
      return true;
    } else {
      return false;
    }
  }

  ingredientsPurchaseCalculus(){
    const weatherObject = this.weatherToday;

    const iceCubes = this.iceCubes;
    const iceCubeEquilibrium = weatherObject.temperature / 20;
    const iceQuotient = (iceCubes - iceCubeEquilibrium) * 10;

    const lemons = this.lemonsPerPitcher;
    const lemonEquilibrium = 4;
    const lemonQuotient = (lemons - lemonEquilibrium) * 5;

    const sugar = this.sugarPerPitcher;
    const sugarEquilibrium = 4;
    const sugarQuotient = (sugar - sugarEquilibrium) * 5;

    return (iceQuotient + lemonQuotient + sugarQuotient);
  }


  pricePurchaseCalculus(){
    const price = this.price;

    const equilibriumPrice = 0.25;
    const priceQuotient = (equilibriumPrice - price) * 10;
    return priceQuotient;
  }

  weatherPurchaseCalculus(){
    const weatherObject = this.weatherToday;
    const outlookQuotients = {
      "Sunny": 0,
      "Overcast": 15,
      "Rainy": 30
    };

    let outlookDecrement = outlookQuotients[weatherObject.outlook];
    outlookDecrement *= Math.floor(Math.random() * outlookDecrement);

    const tempConstant = 0.25;
    const maxTemp = 100;
    const actualTemp = weatherObject.temperature;
    const temperatureDecrement = (maxTemp - actualTemp) * (tempConstant);

    return (outlookDecrement + temperatureDecrement);
  }




}

Game.DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default Game;
