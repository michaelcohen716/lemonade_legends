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
    this.cupsSoldToday = 0;
    this.salesToday = 0;
    this.totalSales = 0;
    this.totalExpenses = 0;
    this.customersToday = [];
    this.weather = this.generateWeather();
    this.dayOver = false;
    this.soldOut = false;
    this.time = {hour: 9, minutes: 0};
  }

  resources(){
    return {
      cups: this.cups,
      lemons: this.lemons,
      sugar: this.sugar,
      iceCubes: this.iceCubes,
      cash: this.cash.toFixed(2),
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

  run(gameObject){
    //intro, etc

    const resources = this.resources();
    // this.generateWeather();
    let potentialCustomers = this.potentialCustomers();
    console.log("potentialCustomers");
    console.log(potentialCustomers);
    // debugger
    let today = this.simulateDay(potentialCustomers, gameObject);
    // debugger
    return today;
  }

  updateClock(timeIncrement){
    // debugger
    if(this.time.minutes + timeIncrement >= 60){
      this.time.minutes = this.time.minutes - 60 + timeIncrement;
      this.time.hour += 1;
      // this.time.minutes += timeIncrement;
    } else {
      this.time.minutes += timeIncrement;
    }
    if(this.time.hour == 13){
      this.time.hour = 1;
    }
    // debugger
  }

  simulateDay(potentialCustomers, gameObject){
    // debugger
    let pitcherCups = 0;
    let numPurchases = 0;
    let timeIncrement = ((8*60)/potentialCustomers);
    //8 hour day

    var iterator = 0;
    const runDay = () => {
      setTimeout(() => {
        this.updateClock(timeIncrement);

        if(this.customersToday.length == potentialCustomers - 1){
          console.log("numPurchases");
          console.log(numPurchases);
          this.dayOver = true;
          // debugger
          return;
        }

        iterator++;
        if(iterator < potentialCustomers){
          runDay();
          if(this.checkInventory(gameObject) == false && pitcherCups == 0){
            this.customersToday.push(false);
            console.log("sold out");
            this.soldOut = true;
            return;
          }

          if(this.iceCubes - gameObject.ice < 0 || this.cups == 0){
            this.customersToday.push(false);

            console.log("sold out");
            this.soldOut = true;

            return;
          }

          if(this.lemons - gameObject.lemons < 0 && pitcherCups==0){
            this.customersToday.push(false);
            console.log("sold out");
            this.soldOut = true;

            return;
          }

          if(this.sugar - gameObject.sugar < 0 && pitcherCups==0){
            this.customersToday.push(false);
            console.log("sold out");
            this.soldOut = true;

            return;
          }

          if(this.checkInventory(gameObject) == true && pitcherCups == 0){
            pitcherCups = this.makePitcher(gameObject);
            // debugger
            if (pitcherCups == false){
              this.customersToday.push(false);
              return;
            }
          }

          if(this.purchaseOrNot(gameObject) && this.iceCubes > 0 && this.cups > 0){
            this.customersToday.push(true);
            this.cupsSoldToday += 1;
            this.salesToday += (parseInt(gameObject.price)/100);
            this.cash += (parseInt(gameObject.price)/100);
            this.cups -=1;
            numPurchases +=1;
            pitcherCups -=1;
            this.iceCubes -= (parseInt(gameObject.ice));
          }else {
            this.customersToday.push(false);
          }

        }}, 80);
    };
    runDay();

    return;
  }

  makePitcher(gameObject){
    const lemonsPer = gameObject.lemons;
    const sugarPer = gameObject.sugar;
    // debugger
    if(this.lemons > lemonsPer && this.sugar > sugarPer){
      this.lemons -= lemonsPer;
      this.sugar -= sugarPer;
      // debugger
      return 10;
    } else {
      return false;
    }

  }

  checkInventory(gameObject){
    if(this.cups == 0){
      return false;
    }
    if(this.iceCubes - gameObject.ice < 0){
      return false;
    }
    if(this.lemons - gameObject.lemons < 0){
      return false;
    }
    if(this.sugar - gameObject.sugar < 0){
      return false;
    }

    return true;
  }

  potentialCustomers(){
    const weatherObject = this.weather;

    const outlookQuotients = {
      "Sunny": 100,
      "Overcast": 60,
      "Rainy": 15
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

  purchaseOrNot(gameObject){
    const price = gameObject.price;
    const lemons = gameObject.lemons;
    const sugar = gameObject.sugar;
    const ice = gameObject.ice;
    const weather = gameObject.weather;
    let likelihood = 100;

    const weatherDecrement = this.weatherPurchaseCalculus(weather);
    likelihood -= weatherDecrement;
    //either a neutral or a decrement

    const ingredientsFactor = this.ingredientsPurchaseCalculus(lemons, sugar, ice, weather);

    likelihood += ingredientsFactor;
    //could be positive or negative

    const priceFactor = this.pricePurchaseCalculus(price);
    likelihood += priceFactor;
    //could be positive or negative
    if (likelihood >= 50){
      return true;
    } else {
      return false;
    }
  }

  ingredientsPurchaseCalculus(lemons, sugar, ice, weather){
    const weatherObject = weather;

    // const iceCubes = this.iceCubes;
    const iceCubeEquilibrium = weatherObject.temperature / 16;
    const iceQuotient = (ice - iceCubeEquilibrium) * 10;

    // const lemons = this.lemonsPerPitcher;
    const lemonEquilibrium = 4;
    const lemonQuotient = (lemons - lemonEquilibrium) * 7;

    // const sugar = this.sugarPerPitcher;
    const sugarEquilibrium = 4;
    const sugarQuotient = (sugar - sugarEquilibrium) * 7;

    return (iceQuotient + lemonQuotient + sugarQuotient);
  }


  pricePurchaseCalculus(price, weather){
    let equilibriumPrice = 0.25;
    equilibriumPrice = Math.random() * 2 * equilibriumPrice;
    const priceQuotient = (equilibriumPrice - (price/100)) * 500;
    return priceQuotient;
  }

  weatherPurchaseCalculus(weather){
    const weatherObject = weather;
    const outlookQuotients = {
      "Sunny": 10,
      "Overcast": 45,
      "Rainy": 80
    };

    let outlookDecrement = outlookQuotients[weatherObject.outlook];
    outlookDecrement = Math.floor(Math.random() * outlookDecrement);

    const tempConstant = 0.65;
    const maxTemp = 100;
    const actualTemp = weatherObject.temperature;
    const temperatureDecrement = (maxTemp - actualTemp) * (tempConstant);
    return (outlookDecrement + temperatureDecrement);
  }

}


export default Game;
