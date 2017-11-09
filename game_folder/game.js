

class Game {
  constructor(){
    this.cups = 0;
    this.lemons = 0;
    this.sugar = 0;
    this.iceCubes = 0;
    this.cash = 20.00;
    this.day = 0;
    this.price = 0.25;
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


  //this should probably be part of a 'Day' class
  weather(){
    const maxTemp = 100;
    const minTemp = 50;
    let temperature = Math.floor(Math.random() * (maxTemp - minTemp) + minTemp);
    let outlookQuotient = Math.floor(Math.random() * 4);
    let outlook;
    if (outlookQuotient == 0 || outlookQuotient == 1){
      outlook = "Sunny";
    } else if (outlookQuotient == 2){
      outlook = "Overcast";
    } else {
      outlook = "Rainy";
    }

    return {
      temperature: temperature,
      outlook: outlook
    };
  }

  potentialCustomers(){
    const weatherObject = this.weather();

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

    // likelihood +=

    const price = this.price;
    // const equilibriumPrice =
    // let priceDecrement = price * 10;


    if (likelihood >= 50){
      return true;
    } else {
      return false;
    }
  }

  weatherPurchaseCalculus(){
    const weatherObject = this.weather();
    const outlookQuotients = {
      "Sunny": 0,
      "Overcast": -15,
      "Rainy": -30
    };

    let outlookDecrement = outlookQuotients[weatherObject.outlook];
    outlookDecrement *= Math.floor(Math.random() * outlookDecrement);

    const tempConstant = 0.25;
    const maxTemp = 100;
    const minTemp = 50;
    const actualTemp = weatherObject.temperature;


  }



}


const game = new Game();
